/**
 * rateLimit.ts
 * ─────────────────────────────────────────────────────────
 * Simple in-memory sliding-window rate limiter.
 * Used by /go/[slug] to prevent affiliate click fraud.
 *
 * Default: 10 requests per IP per 60 seconds.
 *
 * Note: This resets on server restart (Edge/Serverless caveats apply).
 * For production at scale, replace `store` with an Upstash Redis client:
 *   https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
 */

type Entry = { count: number; resetAt: number };

// Module-level map — persists across requests within the same Node.js process
const store = new Map<string, Entry>();

interface RateLimitOptions {
  limit?: number;   // max requests in the window (default: 10)
  windowMs?: number; // window duration in ms (default: 60_000 = 1 min)
}

export function rateLimit(
  ip: string,
  options: RateLimitOptions = {}
): { allowed: boolean; remaining: number; resetAt: number } {
  const limit = options.limit ?? 10;
  const windowMs = options.windowMs ?? 60_000;
  const now = Date.now();

  let entry = store.get(ip);

  // No entry yet, or window has expired — create fresh
  if (!entry || now > entry.resetAt) {
    entry = { count: 1, resetAt: now + windowMs };
    store.set(ip, entry);
    return { allowed: true, remaining: limit - 1, resetAt: entry.resetAt };
  }

  // Within window
  if (entry.count < limit) {
    entry.count++;
    return { allowed: true, remaining: limit - entry.count, resetAt: entry.resetAt };
  }

  // Limit exceeded
  return { allowed: false, remaining: 0, resetAt: entry.resetAt };
}

/**
 * Hash an IP address using Web Crypto (available in Edge & Node 18+).
 * We never store the raw IP — only a one-way hash.
 */
export async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + (process.env.IP_HASH_SALT ?? 'freeaihub-salt'));
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Extract client IP from Next.js request headers.
 * Handles Vercel, Cloudflare, and plain Next.js.
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    '127.0.0.1'
  );
}
