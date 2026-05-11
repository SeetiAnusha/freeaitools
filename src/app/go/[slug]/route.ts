import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { rateLimit, hashIp, getClientIp } from '@/lib/rateLimit';

/**
 * GET /go/[slug]
 * ─────────────────────────────────────────────────────────────
 * Affiliate redirect route.
 *
 * Flow:
 *  1. Rate-limit by IP (10 clicks / 60 s)
 *  2. Look up tool in Supabase by slug
 *  3. Log click (hashed IP + referrer + user-agent)
 *  4. 302 redirect to affiliate_url (or website_url as fallback)
 *
 * This runs on the Edge runtime for lowest latency globally.
 */
// Node.js runtime — required because our in-memory rate limiter uses Map
// (Edge runtime doesn't persist memory between requests on Vercel)
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> | { slug: string } }
) {
  const params = await Promise.resolve(context.params);
  const { slug } = params;
  const ip = getClientIp(request);

  // ── 1. Rate Limiting ──────────────────────────────────────
  const { allowed, remaining, resetAt } = rateLimit(ip, { limit: 10, windowMs: 60_000 });

  if (!allowed) {
    const retryAfterSecs = Math.ceil((resetAt - Date.now()) / 1000);
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': String(retryAfterSecs),
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(resetAt),
      },
    });
  }

  // ── 2. Fetch Tool ─────────────────────────────────────────
  const { data: toolData, error } = await supabase
    .from('tools')
    .select('id, website_url, affiliate_url')
    .eq('slug', slug)
    .single();

  const tool = toolData as { id: string; website_url: string | null; affiliate_url: string | null } | null;

  if (error || !tool) {
    // Redirect to homepage with an error param instead of showing a raw 404
    return NextResponse.redirect(new URL('/?ref=not-found', request.url));
  }

  // ── 3. Log Click (fire-and-forget, don't await) ───────────
  const ipHash = await hashIp(ip);
  supabase
    .from('clicks')
    .insert({
      tool_id: tool.id,
      ip_hash: ipHash,
      referrer: request.headers.get('referer') ?? null,
      user_agent: request.headers.get('user-agent') ?? null,
    })
    // PromiseLike only has .then() — use two-arg form: .then(onSuccess, onError)
    .then(() => {}, () => {});

  // ── 4. Redirect ───────────────────────────────────────────
  const destination = tool.affiliate_url ?? tool.website_url;

  if (!destination) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const redirectResponse = NextResponse.redirect(destination, { status: 302 });
  redirectResponse.headers.set('X-RateLimit-Remaining', String(remaining));
  redirectResponse.headers.set('Cache-Control', 'no-store');
  return redirectResponse;
}
