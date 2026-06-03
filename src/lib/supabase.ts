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

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_name: string;
  published_date: string;
  read_time: string;
  featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  views_count: number;
  shares_count: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Prompt = {
  id: string;
  slug: string;
  title: string;
  prompt_text: string;
  description: string;
  category: string;
  use_case: string | null;
  ai_tool: string;
  tags: string[];
  is_free: boolean;
  price: number | null;
  difficulty_level: string;
  example_input: string | null;
  example_output: string | null;
  instructions: string | null;
  usage_count: number;
  rating_avg: number;
  rating_count: number;
  seo_title: string | null;
  seo_description: string | null;
  status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type PromptRating = {
  id: string;
  prompt_id: string;
  ip_hash: string;
  rating: number;
  comment: string | null;
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

// ============================================================
// BLOG POST QUERIES
// ============================================================

/** Get all published blog posts, ordered by date */
export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_date', { ascending: false });
  
  if (limit) query = query.limit(limit);
  
  const { data, error } = await query;
  if (error) throw new Error(`getBlogPosts: ${error.message}`);
  return (data ?? []) as BlogPost[];
}

/** Get single blog post by slug */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  
  if (error) return null;
  
  // Increment view count (fire and forget)
  supabase.rpc('increment_blog_views', { post_slug: slug }).then();
  
  return data as BlogPost;
}

/** Get all blog post slugs for static generation */
export async function getAllBlogPostSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published');
  return ((data ?? []) as { slug: string }[]).map((p) => p.slug);
}

/** Get featured blog posts */
export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_date', { ascending: false })
    .limit(limit);
  
  if (error) throw new Error(`getFeaturedBlogPosts: ${error.message}`);
  return (data ?? []) as BlogPost[];
}

/** Get blog posts by category */
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .order('published_date', { ascending: false });
  
  if (error) throw new Error(`getBlogPostsByCategory: ${error.message}`);
  return (data ?? []) as BlogPost[];
}

/** Search blog posts */
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const { data, error } = await supabase.rpc('search_blog_posts', { query });
  if (error) {
    // Fallback search
    const { data: fallback } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .ilike('title', `%${query}%`)
      .limit(20);
    return (fallback ?? []) as BlogPost[];
  }
  return (data ?? []) as BlogPost[];
}

// ============================================================
// PROMPT QUERIES
// ============================================================

/** Get all prompts (free + paid) */
export async function getPrompts(freeOnly = false, limit?: number): Promise<Prompt[]> {
  let query = supabase
    .from('prompts')
    .select('*')
    .eq('status', 'published')
    .order('featured', { ascending: false })
    .order('rating_avg', { ascending: false });
  
  if (freeOnly) query = query.eq('is_free', true);
  if (limit) query = query.limit(limit);
  
  const { data, error } = await query;
  if (error) throw new Error(`getPrompts: ${error.message}`);
  return (data ?? []) as Prompt[];
}

/** Get single prompt by slug */
export async function getPromptBySlug(slug: string): Promise<Prompt | null> {
  const { data, error} = await supabase
    .from('prompts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  
  if (error) return null;
  
  // Increment usage count (fire and forget)
  supabase.rpc('increment_prompt_usage', { prompt_slug: slug }).then();
  
  return data as Prompt;
}

/** Get all prompt slugs for static generation */
export async function getAllPromptSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from('prompts')
    .select('slug')
    .eq('status', 'published');
  return ((data ?? []) as { slug: string }[]).map((p) => p.slug);
}

/** Get prompts by category */
export async function getPromptsByCategory(category: string): Promise<Prompt[]> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .order('rating_avg', { ascending: false });
  
  if (error) throw new Error(`getPromptsByCategory: ${error.message}`);
  return (data ?? []) as Prompt[];
}

/** Get featured prompts */
export async function getFeaturedPrompts(limit = 6): Promise<Prompt[]> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('rating_avg', { ascending: false })
    .limit(limit);
  
  if (error) throw new Error(`getFeaturedPrompts: ${error.message}`);
  return (data ?? []) as Prompt[];
}

/** Search prompts */
export async function searchPrompts(query: string): Promise<Prompt[]> {
  const { data, error } = await supabase.rpc('search_prompts', { query });
  if (error) {
    // Fallback search
    const { data: fallback } = await supabase
      .from('prompts')
      .select('*')
      .eq('status', 'published')
      .ilike('title', `%${query}%`)
      .limit(50);
    return (fallback ?? []) as Prompt[];
  }
  return (data ?? []) as Prompt[];
}

/** Get unique prompt categories */
export async function getPromptCategories(): Promise<string[]> {
  const { data } = await supabase
    .from('prompts')
    .select('category')
    .eq('status', 'published');
  
  const uniqueCategories = new Set((data ?? []).map((p: any) => p.category));
  const categories = Array.from(uniqueCategories);
  return categories.sort();
}
