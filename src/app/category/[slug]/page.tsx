import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Grid3X3, SlidersHorizontal } from 'lucide-react';
import {
  getCategoryBySlug,
  getToolsByCategory,
  getAllCategorySlugs,
  type Tool,
  type Category,
} from '@/lib/supabase';
import ToolCard from '@/components/ToolCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Enable ISR: Revalidate this page every 60 seconds
// New tools added to this category will appear automatically within 1 minute!
export const revalidate = 60;

/* ── Static Params ──────────────────────────────────────────── */
export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ── Metadata ───────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `Best Free ${category.name} Tools (${new Date().getFullYear()})`,
    description: `Discover the best free ${category.name.toLowerCase()} tools. All tools verified free with no hidden paywalls. Updated ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.`,
    alternates: { canonical: `/category/${slug}` },
    openGraph: {
      title: `Best Free ${category.name} Tools`,
      description: category.description ?? `Top free ${category.name.toLowerCase()} tools, verified and ranked.`,
      url: `/category/${slug}`,
    },
  };
}

/* ── Page ───────────────────────────────────────────────────── */
export default async function CategoryPage(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  const { slug } = await Promise.resolve(params);
  const [category, tools] = await Promise.all([
    getCategoryBySlug(slug),
    getToolsByCategory(slug),
  ]);

  if (!category) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aifreetoolshub.com' },
      { '@type': 'ListItem', position: 2, name: 'Categories', item: 'https://aifreetoolshub.com/#categories' },
      { '@type': 'ListItem', position: 3, name: category.name, item: `https://aifreetoolshub.com/category/${slug}` },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Free ${category.name} Tools`,
    numberOfItems: tools.length,
    itemListElement: tools.slice(0, 10).map((tool: Tool, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tool.name,
      url: `https://aifreetoolshub.com/tools/${tool.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-14 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-blue-200 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-medium">{category.name}</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Best Free {category.name} Tools
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mb-6">
              {category.description ?? `Discover the top free ${category.name.toLowerCase()} tools — all verified free, ranked by quality and popularity.`}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-medium">
                <Grid3X3 className="w-4 h-4 text-blue-200" />
                {tools.length} Free Tools
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-medium">
                <SlidersHorizontal className="w-4 h-4 text-blue-200" />
                Verified Free
              </div>
            </div>
          </div>
        </section>

        {/* Tools grid */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          {tools.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No tools found in this category yet.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon — we add new tools weekly.</p>
              <Link href="/" className="btn-primary mt-6 inline-flex">Browse All Categories</Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {tools.length} Free {category.name} Tools
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool: Tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={{
                      ...tool,
                      tagline: tool.tagline ?? '',
                      description: tool.description ?? '',
                      website_url: tool.website_url ?? '#',
                      categoryName: (tool.categories as Category | undefined)?.name,
                      categorySlug: (tool.categories as Category | undefined)?.slug,
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {/* SEO content block */}
        <section className="bg-blue-50 dark:bg-blue-950/30 py-12 px-4">
          <div className="max-w-3xl mx-auto prose prose-blue dark:prose-invert prose-sm">
            <h2>About Free {category.name} Tools</h2>
            <p>
              {category.name} tools powered by artificial intelligence are transforming the way
              individuals and teams work. Our directory lists only tools that offer a genuine free tier,
              free trial, or open-source licence — so you can start immediately with no credit card.
            </p>
            <p>
              Every tool in this list has been manually reviewed to confirm the free tier is real and
              accessible. We update this list monthly to reflect pricing changes, new launches, and
              tool shutdowns.
            </p>
            <h3>How We Rank {category.name} Tools</h3>
            <ul>
              <li><strong>Generosity of free tier</strong> — unlimited usage scores higher than heavily limited trials</li>
              <li><strong>User ratings</strong> — community ratings from verified users</li>
              <li><strong>Popularity</strong> — click-through rate and user saves</li>
              <li><strong>Feature set</strong> — breadth of what you can do on the free plan</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
