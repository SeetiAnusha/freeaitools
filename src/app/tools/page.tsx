import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getToolsByCategory, type Tool, type Category } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import { Filter, Search, Layers } from 'lucide-react';

// Enable ISR: Revalidate this page every 60 seconds
// All tools list will update automatically when new tools are added!
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'All Free AI Tools — Browse 1000+ Verified Free AI Tools',
  description:
    'Browse all free AI tools across 40 categories. Every tool verified free — no hidden paywalls, no credit card required. Updated daily.',
  alternates: { canonical: '/tools' },
};

export default async function AllToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }> | { category?: string; q?: string };
}) {
  const params = await Promise.resolve(searchParams);
  const selectedSlug = params.category ?? null;
  const searchQuery  = params.q?.toLowerCase() ?? '';

  // Fetch all categories from DB (with live tool counts)
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch {
    // DB unreachable — page still renders with empty state
  }

  if (categories.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center text-gray-400 text-center px-4">
          <div>
            <p className="text-xl font-semibold">No categories found in the database.</p>
            <p className="text-sm mt-2">Run the seed SQL in your Supabase dashboard to populate data.</p>
            <Link href="/" className="mt-6 btn-primary inline-flex">← Back to Home</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Determine which category to show tools for
  const activeCategory = selectedSlug
    ? categories.find((c) => c.slug === selectedSlug) ?? null
    : null;

  // If slug was provided but not found → 404
  if (selectedSlug && !activeCategory) notFound();

  // Fetch tools for the active category (or the first category with tools if none selected)
  const displayCategory =
    activeCategory ??
    categories.find((c) => c.tool_count > 0) ??
    categories[0];

  let tools: Tool[] = [];
  try {
    if (displayCategory) {
      tools = await getToolsByCategory(displayCategory.slug);
    }
  } catch {
    // tools remains empty
  }

  // Filter by search query if provided
  const filteredTools = searchQuery
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery) ||
          (t.tagline ?? '').toLowerCase().includes(searchQuery) ||
          (t.tags ?? []).some((tag) => tag.toLowerCase().includes(searchQuery))
      )
    : tools;

  const totalToolsAcrossAll = categories.reduce((sum, c) => sum + c.tool_count, 0);

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-blue-200" />
              <span className="text-blue-200 font-medium text-sm">All Free AI Tools</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
              {totalToolsAcrossAll > 0 ? `${totalToolsAcrossAll}+` : '1,000+'} Free AI Tools
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-6">
              Every tool verified free across {categories.length} categories. No credit card needed.
            </p>

            {/* Search bar */}
            <form
              action="/tools"
              method="GET"
              className="max-w-xl mx-auto flex gap-2"
            >
              {selectedSlug && (
                <input type="hidden" name="category" value={selectedSlug} />
              )}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="tools-search-input"
                  type="search"
                  name="q"
                  defaultValue={searchQuery}
                  placeholder="Search tools..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20
                             text-white placeholder-blue-200 focus:outline-none focus:ring-2
                             focus:ring-white/30 text-sm"
                />
              </div>
              <button
                type="submit"
                id="tools-search-btn"
                className="btn-primary px-5 py-2.5 rounded-xl text-sm"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar: Category Filter ── */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-4">
              <div className="flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-300 font-semibold text-sm">
                <Filter className="w-4 h-4" />
                Filter by Category
              </div>

              <nav aria-label="Tool categories" className="space-y-1 max-h-[75vh] overflow-y-auto pr-1">
                {/* All tools link */}
                <Link
                  href="/tools"
                  id="filter-all"
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                    !selectedSlug
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>All Categories</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${!selectedSlug ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                    {totalToolsAcrossAll}
                  </span>
                </Link>

                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/tools?category=${cat.slug}`}
                    id={`filter-cat-${cat.slug}`}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedSlug === cat.slug
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ml-1 ${
                      selectedSlug === cat.slug
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      {cat.tool_count}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Main: Tools Grid ── */}
          <div className="flex-1 min-w-0">
            {/* Section header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {displayCategory ? displayCategory.name : 'All Tools'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>
              {displayCategory && (
                <Link
                  href={`/category/${displayCategory.slug}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline hidden sm:flex items-center gap-1"
                >
                  Category page →
                </Link>
              )}
            </div>

            {/* Tools grid */}
            {filteredTools.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={{
                      id:                tool.id,
                      slug:              tool.slug,
                      name:              tool.name,
                      tagline:           tool.tagline           ?? '',
                      description:       tool.description       ?? '',
                      category_id:       tool.category_id       ?? '',
                      categoryName:      (tool.categories as Category | null | undefined)?.name,
                      categorySlug:      (tool.categories as Category | null | undefined)?.slug,
                      website_url:       tool.website_url       ?? '#',
                      affiliate_url:     tool.affiliate_url     ?? undefined,
                      is_free:           tool.is_free,
                      free_tier_limits:  tool.free_tier_limits  ?? undefined,
                      pricing_detail:    tool.pricing_detail    ?? undefined,
                      logo_url:          tool.logo_url          ?? undefined,
                      featured:          tool.featured,
                      verified_free_date:tool.verified_free_date ?? undefined,
                      rating_avg:        tool.rating_avg,
                      rating_count:      tool.rating_count,
                      click_count:       tool.click_count,
                      tags:              tool.tags,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400 dark:text-gray-600">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                  {searchQuery ? `No tools found for "${searchQuery}"` : 'No tools in this category yet.'}
                </p>
                <p className="text-sm mt-2">
                  {searchQuery ? 'Try a different search term.' : 'Tools are being added — check back soon!'}
                </p>
                {searchQuery && (
                  <Link href="/tools" className="mt-4 btn-secondary text-sm">
                    Clear search
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
