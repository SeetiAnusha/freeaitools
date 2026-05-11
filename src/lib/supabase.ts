import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ============================================================
// Shared TypeScript types (match schema.sql exactly)
// ============================================================
export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon_name: string | null;
  tool_count: number;
  created_at: string;
};

export type Tool = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  category_id: string | null;
  website_url: string | null;
  affiliate_url: string | null;
  affiliate_commission: number;
  is_free: boolean;
  free_tier_limits: string | null;
  pricing_detail: string | null;
  logo_url: string | null;
  screenshot_url: string | null;
  featured: boolean;
  verified_free_date: string | null;
  rating_avg: number;
  rating_count: number;
  click_count: number;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
  // populated when joined with .select('*, categories(*)')
  categories?: Category | null;
};

export type Rating = {
  id: string;
  tool_id: string;
  ip_hash: string;
  rating: number;
  review_text: string | null;
  created_at: string;
};

export type Click = {
  id: string;
  tool_id: string;
  ip_hash: string | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};

export type SavedTool = {
  id: string;
  session_id: string;
  tool_id: string;
  created_at: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  confirmed: boolean;
  source: string;
  created_at: string;
};

// ============================================================
// Supabase client — untyped generic to avoid "never" inference
// issues with manually-written Database types. Each helper
// function casts its own return value explicitly.
// (Run `supabase gen types typescript` later to get auto types)
// ============================================================
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-anon-key';

if (
  supabaseUrl === 'https://placeholder.supabase.co' ||
  supabaseAnonKey === 'placeholder-anon-key'
) {
  console.warn(
    '\n⚠️  [FreeAIHub] Supabase env vars not set.\n' +
    '   Copy .env.example → .env.local and fill in your credentials.\n' +
    '   Get them from: https://supabase.com → Project Settings → API\n'
  );
}

export const supabase: SupabaseClient<any> = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================
// Helper queries
// ============================================================

/** All categories ordered by name, with real-time tool_count calculated from the tools table */
export async function getCategories(): Promise<Category[]> {
  // Fetch categories with a live count of their tools using Supabase's related-table count
  const { data, error } = await supabase
    .from('categories')
    .select('*, tools(count)')
    .order('name');

  if (error) throw new Error(`getCategories: ${error.message}`);

  // Map the result: Supabase returns tools as [{ count: N }]
  return ((data ?? []) as any[]).map((c) => ({
    id:          c.id,
    slug:        c.slug,
    name:        c.name,
    description: c.description,
    icon_name:   c.icon_name,
    // Prefer the live count from the join; fall back to stored tool_count
    tool_count:  Array.isArray(c.tools) && c.tools.length > 0
                   ? Number(c.tools[0].count)
                   : (c.tool_count ?? 0),
    created_at:  c.created_at,
  })) as Category[];
}

/** Single category by slug */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data as Category;
}

/** Featured tools (default limit 6) */
export async function getFeaturedTools(limit = 6): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*, categories(*)')
    .eq('featured', true)
    .order('rating_avg', { ascending: false })
    .limit(limit);
  if (error) throw new Error(`getFeaturedTools: ${error.message}`);
  return (data ?? []) as Tool[];
}

/** Tools belonging to a category slug */
export async function getToolsByCategory(categorySlug: string): Promise<Tool[]> {
  // Step 1: resolve category slug → id
  const { data: cat, error: catErr } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();
  if (catErr || !cat) return [];

  // Step 2: fetch tools by category_id
  const { data, error } = await supabase
    .from('tools')
    .select('*, categories(*)')
    .eq('category_id', (cat as { id: string }).id)
    .order('featured', { ascending: false })
    .order('rating_avg', { ascending: false });
  if (error) throw new Error(`getToolsByCategory: ${error.message}`);
  return (data ?? []) as Tool[];
}

/** Single tool by slug */
export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const { data, error } = await supabase
    .from('tools')
    .select('*, categories(*)')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data as Tool;
}

/** Full-text search via RPC (falls back gracefully if fn missing) */
export async function searchTools(query: string): Promise<Tool[]> {
  const { data, error } = await supabase.rpc('search_tools', { query });
  if (error) {
    // Fallback: basic ilike search if RPC not yet deployed
    const { data: fallback } = await supabase
      .from('tools')
      .select('*, categories(*)')
      .ilike('name', `%${query}%`)
      .limit(20);
    return (fallback ?? []) as Tool[];
  }
  return (data ?? []) as Tool[];
}

/** All tool slugs for generateStaticParams */
export async function getAllToolSlugs(): Promise<string[]> {
  const { data } = await supabase.from('tools').select('slug');
  return ((data ?? []) as { slug: string }[]).map((t) => t.slug);
}

/** All category slugs for generateStaticParams */
export async function getAllCategorySlugs(): Promise<string[]> {
  const { data } = await supabase.from('categories').select('slug');
  return ((data ?? []) as { slug: string }[]).map((c) => c.slug);
}

/** Subscribe to newsletter */
export async function subscribeToNewsletter(
  email: string,
  source = 'homepage'
): Promise<{ success: boolean; message: string }> {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email, source });

  if (error) {
    if (error.code === '23505') {
      return { success: false, message: 'You are already subscribed!' };
    }
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
  return { success: true, message: 'Welcome! You are now subscribed.' };
}
