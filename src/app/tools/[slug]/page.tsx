import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ExternalLink, ChevronRight, Star, CheckCircle,
  Zap, Tag, Globe, Clock, TrendingUp, ArrowRight,
} from 'lucide-react';
import {
  getToolBySlug,
  getAllToolSlugs,
  getToolsByCategory,
  type Tool,
  type Category,
} from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';

/* ── Static Params ──────────────────────────────────────────── */
export async function generateStaticParams() {
  const slugs = await getAllToolSlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ── Metadata ───────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const tool = await getToolBySlug(slug);
  if (!tool) return { title: 'Tool Not Found' };

  const title = tool.meta_title ?? `${tool.name} — Free AI Tool Review & Alternatives`;
  const description = tool.meta_description ??
    `${tool.name}: ${tool.tagline ?? ''}. ${tool.free_tier_limits ? `Free tier: ${tool.free_tier_limits}.` : ''} Read our full review, features, pricing, and best alternatives.`;

  return {
    title,
    description,
    alternates: { canonical: `/tools/${slug}` },
    openGraph: {
      title,
      description,
      url: `/tools/${slug}`,
      images: tool.screenshot_url ? [{ url: tool.screenshot_url }] : [],
    },
  };
}

/* ── Star rating component ──────────────────────────────────── */
function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`w-5 h-5 ${s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
          />
        ))}
      </div>
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        {rating.toFixed(1)}
      </span>
      {count ? <span className="text-sm text-gray-400">({count} reviews)</span> : null}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default async function ToolPage(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  const { slug } = await Promise.resolve(params);
  const tool = await getToolBySlug(slug);
  if (!tool) notFound();

  const category = tool.categories as Category | null | undefined;
  const relatedTools = category
    ? (await getToolsByCategory(category.slug)).filter((t: Tool) => t.slug !== slug).slice(0, 3)
    : [];

  const logoFallback = tool.website_url
    ? `https://www.google.com/s2/favicons?domain=${new URL(tool.website_url).hostname}&sz=128`
    : '/placeholder-logo.png';

  const outboundUrl = `/go/${tool.slug}`;

  /* JSON-LD schemas */
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    applicationCategory: 'AIApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: tool.free_tier_limits ?? 'Free tier available',
    },
    aggregateRating: tool.rating_count && tool.rating_count > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: tool.rating_avg,
      reviewCount: tool.rating_count,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    url: tool.website_url,
    description: tool.description,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://freeaihub.io' },
      ...(category ? [{ '@type': 'ListItem', position: 2, name: category.name, item: `https://freeaihub.io/category/${category.slug}` }] : []),
      { '@type': 'ListItem', position: category ? 3 : 2, name: tool.name, item: `https://freeaihub.io/tools/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-blue-200 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              {category && (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <Link href={`/category/${category.slug}`} className="hover:text-white transition-colors">
                    {category.name}
                  </Link>
                </>
              )}
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-medium">{tool.name}</span>
            </nav>

            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Logo */}
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur p-2 flex items-center justify-center">
                <Image
                  src={tool.logo_url ?? logoFallback}
                  alt={`${tool.name} logo`}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-xl object-cover"
                  unoptimized
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-extrabold">{tool.name}</h1>
                  {tool.verified_free_date && (
                    <span className="flex items-center gap-1 bg-green-400/20 text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5" /> Verified Free
                    </span>
                  )}
                  {tool.featured && (
                    <span className="flex items-center gap-1 bg-amber-400/20 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5" /> Featured
                    </span>
                  )}
                </div>

                <p className="text-blue-100 text-lg mb-4">{tool.tagline}</p>

                {/* Rating */}
                {tool.rating_avg > 0 && (
                  <div className="mb-4">
                    <StarRating rating={tool.rating_avg} count={tool.rating_count} />
                  </div>
                )}

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={outboundUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`tool-page-try-${tool.slug}`}
                    className="btn-primary flex items-center gap-2 px-6 py-3 text-base rounded-xl"
                  >
                    Try {tool.name} Free
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  {tool.website_url && (
                    <a
                      href={tool.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex items-center gap-2 px-6 py-3 text-base rounded-xl
                                 border-white/30 text-white hover:bg-white/10"
                    >
                      <Globe className="w-4 h-4" /> Official Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main column */}
          <div className="lg:col-span-2 space-y-10">

            {/* About */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                What is {tool.name}?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                {tool.description}
              </p>
            </section>

            {/* Free tier */}
            {tool.free_tier_limits && (
              <section className="bg-green-50 dark:bg-green-950/30 rounded-2xl p-6 border border-green-100 dark:border-green-900">
                <h2 className="text-xl font-bold text-green-800 dark:text-green-300 flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5" /> Free Plan Details
                </h2>
                <p className="text-green-700 dark:text-green-400 font-medium">{tool.free_tier_limits}</p>
                {tool.pricing_detail && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                    Full pricing: {tool.pricing_detail}
                  </p>
                )}
              </section>
            )}

            {/* Tags */}
            {tool.tags && tool.tags.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-blue-500" /> Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full text-sm font-medium
                                 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Why use it */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Why Use {tool.name}?
              </h2>
              <div className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  {tool.name} stands out in the {category?.name ?? 'AI tools'} space by offering
                  a generous free tier that lets users {tool.free_tier_limits?.toLowerCase() ?? 'get started at no cost'}.
                  This makes it accessible to students, freelancers, and small teams who need
                  professional-grade AI capabilities without a subscription.
                </p>
                <p>
                  Whether you&apos;re just getting started with AI tools or looking to replace an expensive
                  paid solution, {tool.name} is worth exploring. The tool is continuously updated and
                  has an active user community.
                </p>
              </div>
            </section>

            {/* How to get started */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                How to Get Started with {tool.name} for Free
              </h2>
              <ol className="space-y-3 text-gray-600 dark:text-gray-300">
                {[
                  `Visit the official ${tool.name} website using the button below`,
                  'Sign up with your email address (no credit card required for the free plan)',
                  `Start using ${tool.name} immediately — ${tool.free_tier_limits ?? 'the free tier is available right away'}`,
                  'Explore the features and upgrade only if you need more capacity',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              <Link
                href={outboundUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl"
              >
                Get Started with {tool.name} Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick info card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Quick Info</h3>

              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Pricing</dt>
                  <dd className="font-medium text-gray-900 dark:text-white text-right max-w-[60%]">
                    {tool.pricing_detail ?? (tool.is_free ? 'Free' : 'Paid')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Free Tier</dt>
                  <dd className="font-medium text-gray-900 dark:text-white text-right max-w-[60%]">
                    {tool.free_tier_limits ?? (tool.is_free ? 'Yes' : 'No')}
                  </dd>
                </div>
                {category && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Category</dt>
                    <dd className="font-medium">
                      <Link
                        href={`/category/${category.slug}`}
                        className="text-blue-600 hover:underline dark:text-blue-400"
                      >
                        {category.name}
                      </Link>
                    </dd>
                  </div>
                )}
                {tool.verified_free_date && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Verified Free</dt>
                    <dd className="font-medium text-green-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(tool.verified_free_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </dd>
                  </div>
                )}
              </dl>

              <Link
                href={outboundUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl mt-2"
              >
                Try Free <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            {/* Related tools */}
            {relatedTools.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Related {category?.name} Tools
                </h3>
                <div className="space-y-4">
                  {relatedTools.map((related: Tool) => (
                    <ToolCard
                      key={related.id}
                      compact
                      tool={{
                        ...related,
                        tagline: related.tagline ?? '',
                        description: related.description ?? '',
                        website_url: related.website_url ?? '#',
                      }}
                    />
                  ))}
                </div>
                {category && (
                  <Link
                    href={`/category/${category.slug}`}
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium mt-4 hover:underline"
                  >
                    See all {category.name} tools <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
