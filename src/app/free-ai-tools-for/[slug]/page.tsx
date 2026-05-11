import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getToolsByCategory, type Tool, type Category } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import { Users, ArrowRight, Sparkles } from 'lucide-react';

// ── Use case definitions ─────────────────────────────────────────────
const USE_CASES: Record<string, {
  label:       string;
  emoji:       string;
  headline:    string;
  description: string;
  categorySlugs: string[];          // DB slugs to pull tools from
  metaTitle:   string;
  metaDesc:    string;
}> = {
  students: {
    label:      'Students',
    emoji:      '🎓',
    headline:   'Best Free AI Tools for Students',
    description:'Ace your assignments, summarise research papers, build study plans, and learn faster with these verified-free AI tools built for academic success.',
    categorySlugs: ['research-summarization','education-tutoring','text-content','pdf-documents','translation'],
    metaTitle:  'Free AI Tools for Students — Research, Study & Writing AI',
    metaDesc:   'Discover the best free AI tools for students. Summarise papers, write essays, and study smarter — no credit card needed.',
  },
  marketers: {
    label:      'Marketers',
    emoji:      '📈',
    headline:   'Best Free AI Tools for Marketers',
    description:'Drive more traffic, automate campaigns, write converting copy, and analyse performance with these free AI marketing tools used by top growth teams.',
    categorySlugs: ['seo-marketing','text-content','social-media','email-outreach','graphic-design'],
    metaTitle:  'Free AI Tools for Marketers — SEO, Copywriting & Social Media AI',
    metaDesc:   'Discover free AI tools for marketers. SEO, copywriting, social media, and email marketing — all verified free.',
  },
  developers: {
    label:      'Developers',
    emoji:      '💻',
    headline:   'Best Free AI Tools for Developers',
    description:'Write better code faster, automate repetitive dev tasks, access powerful AI APIs, and ship production-ready products with these free AI developer tools.',
    categorySlugs: ['ai-coding','developer-api','workflow-automation','ai-agents','data-analytics'],
    metaTitle:  'Free AI Tools for Developers — Code, APIs & Automation AI',
    metaDesc:   'Discover free AI tools for developers. AI coding assistants, APIs, and workflow automation — all free.',
  },
  designers: {
    label:      'Designers',
    emoji:      '🎨',
    headline:   'Best Free AI Tools for Designers',
    description:'Create stunning visuals, generate images, remove backgrounds, and speed up your creative workflow with these free AI design tools loved by creatives.',
    categorySlugs: ['graphic-design','image-generation','photo-editing','avatar-talking-head','presentations'],
    metaTitle:  'Free AI Tools for Designers — Image Generation, Design & Photo AI',
    metaDesc:   'Discover free AI tools for designers. Image generation, graphic design, and photo editing — all verified free.',
  },
  writers: {
    label:      'Writers',
    emoji:      '✍️',
    headline:   'Best Free AI Tools for Writers',
    description:'Draft articles, overcome writer\'s block, research topics, check grammar, and repurpose content across formats with these free AI writing tools.',
    categorySlugs: ['text-content','research-summarization','seo-marketing','translation','podcast-audio'],
    metaTitle:  'Free AI Tools for Writers — AI Writing, Research & Grammar Tools',
    metaDesc:   'Discover free AI tools for writers. Writing assistants, research tools, and grammar checkers — all free.',
  },
  business: {
    label:      'Business',
    emoji:      '💼',
    headline:   'Best Free AI Tools for Business',
    description:'Automate operations, generate leads, support customers, analyse data, and manage HR with these free AI business tools trusted by startups and enterprises alike.',
    categorySlugs: ['workflow-automation','customer-support','lead-generation','data-analytics','knowledge-management'],
    metaTitle:  'Free AI Tools for Business — Automation, CRM & Analytics AI',
    metaDesc:   'Discover free AI tools for business. Workflow automation, customer support, and data analytics — all verified free.',
  },
  teachers: {
    label:      'Teachers',
    emoji:      '📚',
    headline:   'Best Free AI Tools for Teachers',
    description:'Create lesson plans, generate quizzes, summarise content, translate materials, and personalise learning for every student with these free AI education tools.',
    categorySlugs: ['education-tutoring','text-content','research-summarization','translation','presentations'],
    metaTitle:  'Free AI Tools for Teachers — Lesson Plans, Quizzes & AI Education',
    metaDesc:   'Discover free AI tools for teachers. Lesson planning, quiz generation, and personalised learning — all free.',
  },
  freelancers: {
    label:      'Freelancers',
    emoji:      '🚀',
    headline:   'Best Free AI Tools for Freelancers',
    description:'Win more clients, deliver faster, and scale your freelance business with these free AI tools for writing, design, video editing, and client communication.',
    categorySlugs: ['text-content','graphic-design','video-editing','social-media','workflow-automation'],
    metaTitle:  'Free AI Tools for Freelancers — Writing, Design & Productivity AI',
    metaDesc:   'Discover free AI tools for freelancers. Writing, design, video editing, and automation — all verified free.',
  },
};

// ── Static params for prerendering ───────────────────────────────────
export function generateStaticParams() {
  return Object.keys(USE_CASES).map((slug) => ({ slug }));
}

// ── Metadata ─────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const useCase = USE_CASES[slug];
  if (!useCase) return { title: 'Not Found' };
  return {
    title:       useCase.metaTitle,
    description: useCase.metaDesc,
    alternates:  { canonical: `/free-ai-tools-for/${slug}` },
  };
}

// ── Page ─────────────────────────────────────────────────────────────
export default async function UseCasePage(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  const { slug } = await Promise.resolve(params);
  const useCase = USE_CASES[slug];

  // Unknown slug → 404
  if (!useCase) notFound();

  // Fetch all categories so we can display names/counts
  let allCategories: Category[] = [];
  try { allCategories = await getCategories(); } catch { /* ignore */ }

  // Build map: slug → category object
  const catMap = new Map(allCategories.map((c) => [c.slug, c]));

  // For each relevant category, fetch its tools
  const toolsByCat: { category: Category; tools: Tool[] }[] = [];
  for (const catSlug of useCase.categorySlugs) {
    const category = catMap.get(catSlug);
    if (!category) continue;
    try {
      const tools = await getToolsByCategory(catSlug);
      if (tools.length > 0) {
        toolsByCat.push({ category, tools });
      }
    } catch { /* skip category */ }
  }

  const totalTools = toolsByCat.reduce((n, g) => n + g.tools.length, 0);

  // All use case links for the "Also explore" strip
  const otherUseCases = Object.entries(USE_CASES).filter(([s]) => s !== slug);

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-14 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="text-5xl mb-4">{useCase.emoji}</div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-100 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Free AI Tools for {useCase.label}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              {useCase.headline}
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-6">
              {useCase.description}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              {totalTools > 0 ? `${totalTools} verified free tools` : 'All tools verified free — no credit card needed'}
            </div>
          </div>
        </section>

        {/* ── Tools by Category ── */}
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-14">
          {toolsByCat.length > 0 ? (
            toolsByCat.map(({ category, tools }) => (
              <section key={category.id} id={`section-${category.slug}`}>
                {/* Section header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {tools.length} free tool{tools.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <Link
                    href={`/tools?category=${category.slug}`}
                    className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    See all <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Tools grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools.slice(0, 6).map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={{
                        id:                tool.id,
                        slug:              tool.slug,
                        name:              tool.name,
                        tagline:           tool.tagline          ?? '',
                        description:       tool.description      ?? '',
                        category_id:       tool.category_id      ?? '',
                        categoryName:      (tool.categories as Category | null | undefined)?.name,
                        categorySlug:      (tool.categories as Category | null | undefined)?.slug,
                        website_url:       tool.website_url      ?? '#',
                        affiliate_url:     tool.affiliate_url    ?? undefined,
                        is_free:           tool.is_free,
                        free_tier_limits:  tool.free_tier_limits ?? undefined,
                        pricing_detail:    tool.pricing_detail   ?? undefined,
                        logo_url:          tool.logo_url         ?? undefined,
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
              </section>
            ))
          ) : (
            /* Empty state — tools not yet seeded for this use case */
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔧</div>
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                Tools coming soon!
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto text-sm">
                We&apos;re adding the best free AI tools for {useCase.label} right now.
                Browse all categories in the meantime.
              </p>
              <Link href="/tools" className="btn-primary inline-flex items-center gap-2">
                Browse All Free AI Tools <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* ── Also Explore strip ── */}
          <section className="border-t border-gray-100 dark:border-gray-800 pt-10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Also explore free AI tools for:
            </h2>
            <div className="flex flex-wrap gap-3">
              {otherUseCases.map(([s, uc]) => (
                <Link
                  key={s}
                  href={`/free-ai-tools-for/${s}`}
                  id={`use-case-related-${s}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                             border border-gray-200 dark:border-gray-700
                             bg-white dark:bg-gray-800
                             text-gray-700 dark:text-gray-300
                             hover:border-blue-400 hover:text-blue-600
                             dark:hover:border-blue-600 dark:hover:text-blue-400
                             transition-all duration-200"
                >
                  <span>{uc.emoji}</span>
                  {uc.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
