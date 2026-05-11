import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import { searchTools, getCategories, type Tool, type Category } from '@/lib/supabase';
import { Search, ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Search Free AI Tools — FreeAIHub',
  description: 'Search 1000+ verified free AI tools. Find the best free AI for writing, coding, image generation, video, and more.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }> | { q?: string };
}) {
  const params  = await Promise.resolve(searchParams);
  const query   = (params.q ?? '').trim();

  let results: Tool[]       = [];
  let categories: Category[] = [];

  if (query) {
    try {
      [results, categories] = await Promise.all([
        searchTools(query),
        getCategories(),
      ]);
    } catch { /* show empty state */ }
  }

  // Popular searches to show when no query
  const POPULAR = [
    'ChatGPT', 'Image Generator', 'AI Writer', 'Code AI',
    'Video AI', 'Voice Clone', 'PDF Chat', 'AI SEO',
  ];

  const catMap = new Map(categories.map((c) => [c.id, c]));

  return (
    <>
      <Header />
      <main>
        {/* Search hero */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              {query ? `Results for "${query}"` : 'Search Free AI Tools'}
            </h1>

            {/* Search form */}
            <form action="/search" method="GET" className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="search-input"
                  type="search"
                  name="q"
                  defaultValue={query}
                  placeholder="Search 1000+ free AI tools..."
                  autoFocus
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-gray-900
                             text-gray-900 dark:text-white placeholder-gray-400
                             border-0 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                />
              </div>
              <button
                id="search-submit-btn"
                type="submit"
                className="bg-white text-blue-700 font-semibold px-5 py-3 rounded-xl
                           hover:bg-blue-50 transition-colors text-sm flex-shrink-0"
              >
                Search
              </button>
            </form>

            {/* Popular searches */}
            {!query && (
              <div className="flex flex-wrap items-center gap-2 mt-4 justify-center">
                <span className="text-blue-200 text-xs">Popular:</span>
                {POPULAR.map((q) => (
                  <a
                    key={q}
                    href={`/search?q=${encodeURIComponent(q)}`}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20
                               text-white/80 hover:text-white transition-all border border-white/10"
                  >
                    {q}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <div className="max-w-6xl mx-auto px-4 py-10">
          {query ? (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {results.length > 0
                  ? `Found ${results.length} free AI tool${results.length !== 1 ? 's' : ''} for "${query}"`
                  : `No results found for "${query}"`}
              </p>

              {results.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {results.map((tool) => {
                    const cat = tool.category_id ? catMap.get(tool.category_id) : undefined;
                    return (
                      <ToolCard
                        key={tool.id}
                        tool={{
                          id:                 tool.id,
                          slug:               tool.slug,
                          name:               tool.name,
                          tagline:            tool.tagline          ?? '',
                          description:        tool.description      ?? '',
                          category_id:        tool.category_id      ?? '',
                          categoryName:       (tool.categories as Category | null | undefined)?.name ?? cat?.name,
                          categorySlug:       (tool.categories as Category | null | undefined)?.slug ?? cat?.slug,
                          website_url:        tool.website_url      ?? '#',
                          affiliate_url:      tool.affiliate_url    ?? undefined,
                          is_free:            tool.is_free,
                          free_tier_limits:   tool.free_tier_limits ?? undefined,
                          pricing_detail:     tool.pricing_detail   ?? undefined,
                          logo_url:           tool.logo_url         ?? undefined,
                          featured:           tool.featured,
                          verified_free_date: tool.verified_free_date ?? undefined,
                          rating_avg:         tool.rating_avg,
                          rating_count:       tool.rating_count,
                          click_count:        tool.click_count,
                          tags:               tool.tags,
                        }}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">🔍</div>
                  <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                    No tools found for &ldquo;{query}&rdquo;
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    Try a different search term or browse by category.
                  </p>
                  <Link href="/tools" className="btn-primary inline-flex items-center gap-2">
                    Browse All Tools <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </>
          ) : (
            /* No query — show categories CTA */
            <div className="text-center py-16">
              <div className="text-5xl mb-4"><Sparkles className="w-12 h-12 mx-auto text-blue-500" /></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Discover Free AI Tools
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Search above or browse all 40 categories of verified-free AI tools.
              </p>
              <Link href="/tools" className="btn-primary inline-flex items-center gap-2 mr-3">
                Browse All Tools <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/categories" className="btn-secondary inline-flex items-center gap-2">
                All Categories
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
