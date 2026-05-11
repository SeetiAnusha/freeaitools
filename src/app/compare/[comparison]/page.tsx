import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle, XCircle, ChevronRight, Star, ExternalLink, ArrowRight } from 'lucide-react';
import { getToolBySlug, type Tool } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props = { params: Promise<{ comparison: string }> | { comparison: string } };

/* ── Parse slug like "chatgpt-vs-claude" ───────────────────── */
function parseSlugs(comparison: string): [string, string] | null {
  const match = comparison.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return [match[1], match[2]];
}

/* ── Metadata ───────────────────────────────────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comparison } = await Promise.resolve(params);
  const slugs = parseSlugs(comparison);
  if (!slugs) return { title: 'Comparison Not Found' };

  const [toolA, toolB] = await Promise.all([
    getToolBySlug(slugs[0]),
    getToolBySlug(slugs[1]),
  ]);

  if (!toolA || !toolB) return { title: 'Comparison Not Found' };

  return {
    title: `${toolA.name} vs ${toolB.name} — Which Free AI Tool is Better?`,
    description: `Compare ${toolA.name} vs ${toolB.name} — pricing, free tier, features, and ratings. Find out which free AI tool is right for you.`,
    alternates: { canonical: `/compare/${comparison}` },
  };
}

/* ── Comparison row ─────────────────────────────────────────── */
function CompareRow({ label, a, b }: { label: string; a: React.ReactNode; b: React.ReactNode }) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-800">
      <td className="py-4 pr-4 text-sm font-semibold text-gray-600 dark:text-gray-400 w-[22%]">{label}</td>
      <td className="py-4 pr-4 text-sm text-gray-800 dark:text-gray-200 w-[39%]">{a}</td>
      <td className="py-4 text-sm text-gray-800 dark:text-gray-200 w-[39%]">{b}</td>
    </tr>
  );
}

function ToolHeader({ tool }: { tool: Tool }) {
  const logoFallback = tool.website_url
    ? `https://www.google.com/s2/favicons?domain=${new URL(tool.website_url).hostname}&sz=128`
    : '';

  return (
    <div className="text-center p-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-3 overflow-hidden">
        <Image
          src={tool.logo_url ?? logoFallback}
          alt={`${tool.name} logo`}
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded-xl"
          unoptimized
        />
      </div>
      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{tool.name}</h3>
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tool.tagline}</p>
      {tool.rating_avg > 0 && (
        <div className="flex items-center justify-center gap-1 mt-2">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {tool.rating_avg.toFixed(1)}
          </span>
        </div>
      )}
      <Link
        href={`/go/${tool.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm mt-4"
      >
        Try Free <ExternalLink className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default async function ComparePage({ params }: Props) {
  const { comparison } = await Promise.resolve(params);
  const slugs = parseSlugs(comparison);
  if (!slugs) notFound();

  const [toolA, toolB] = await Promise.all([
    getToolBySlug(slugs[0]),
    getToolBySlug(slugs[1]),
  ]);

  if (!toolA || !toolB) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is ${toolA.name} better than ${toolB.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${toolA.name} (rated ${toolA.rating_avg.toFixed(1)}/5) and ${toolB.name} (rated ${toolB.rating_avg.toFixed(1)}/5) both have free plans. ${toolA.name} offers ${toolA.free_tier_limits ?? 'a free tier'} while ${toolB.name} offers ${toolB.free_tier_limits ?? 'a free tier'}. The best choice depends on your use case.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is ${toolA.name} free?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, ${toolA.name} is free. Free tier: ${toolA.free_tier_limits ?? 'available'}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is ${toolB.name} free?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, ${toolB.name} is free. Free tier: ${toolB.free_tier_limits ?? 'available'}.`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="flex items-center justify-center gap-1.5 text-blue-200 text-sm mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Compare</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
              {toolA.name} vs {toolB.name}
            </h1>
            <p className="text-blue-100 text-lg">
              Compare features, pricing, and free tier to find the best free AI tool for your needs.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Tool headers */}
          <div className="grid grid-cols-3 mb-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="py-6 flex items-center justify-center">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Comparing</span>
            </div>
            <ToolHeader tool={toolA} />
            <ToolHeader tool={toolB} />
          </div>

          {/* Comparison table */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Feature</th>
                  <th className="pb-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">{toolA.name}</th>
                  <th className="pb-3 text-left text-xs font-bold text-blue-600 uppercase tracking-wider">{toolB.name}</th>
                </tr>
              </thead>
              <tbody>
                <CompareRow
                  label="Free Tier"
                  a={toolA.free_tier_limits ?? <span className="text-gray-400">—</span>}
                  b={toolB.free_tier_limits ?? <span className="text-gray-400">—</span>}
                />
                <CompareRow
                  label="Pricing"
                  a={toolA.pricing_detail ?? (toolA.is_free ? 'Free' : '—')}
                  b={toolB.pricing_detail ?? (toolB.is_free ? 'Free' : '—')}
                />
                <CompareRow
                  label="Rating"
                  a={toolA.rating_avg > 0
                    ? <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{toolA.rating_avg.toFixed(1)}</span>
                    : <span className="text-gray-400">No ratings yet</span>}
                  b={toolB.rating_avg > 0
                    ? <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{toolB.rating_avg.toFixed(1)}</span>
                    : <span className="text-gray-400">No ratings yet</span>}
                />
                <CompareRow
                  label="Verified Free"
                  a={toolA.verified_free_date
                    ? <span className="flex items-center gap-1 text-green-600"><CheckCircle className="w-4 h-4" /> Yes</span>
                    : <span className="flex items-center gap-1 text-gray-400"><XCircle className="w-4 h-4" /> Unverified</span>}
                  b={toolB.verified_free_date
                    ? <span className="flex items-center gap-1 text-green-600"><CheckCircle className="w-4 h-4" /> Yes</span>
                    : <span className="flex items-center gap-1 text-gray-400"><XCircle className="w-4 h-4" /> Unverified</span>}
                />
                <CompareRow
                  label="Tags"
                  a={toolA.tags?.slice(0, 3).join(', ') ?? '—'}
                  b={toolB.tags?.slice(0, 3).join(', ') ?? '—'}
                />
              </tbody>
            </table>
          </div>

          {/* FAQ */}
          <div className="mt-10 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            {[
              {
                q: `Is ${toolA.name} better than ${toolB.name}?`,
                a: `Both tools are excellent for different reasons. ${toolA.name} offers ${toolA.free_tier_limits ?? 'a free plan'}, while ${toolB.name} offers ${toolB.free_tier_limits ?? 'a free plan'}. If you need [specific use case], choose ${toolA.name}. For [other use case], ${toolB.name} is the better pick.`,
              },
              {
                q: `Can I use ${toolA.name} and ${toolB.name} together?`,
                a: `Yes! Many users combine multiple AI tools. You could use ${toolA.name} for [one task] and ${toolB.name} for [another task].`,
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
                <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer flex justify-between items-center">
                  {faq.q}
                  <ArrowRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {[toolA, toolB].map((tool) => (
              <Link
                key={tool.slug}
                href={`/go/${tool.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2 py-4 rounded-2xl text-base"
              >
                Try {tool.name} Free <ExternalLink className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
