import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import ToolCard from "@/components/ToolCard";
import NewsletterForm from "@/components/NewsletterForm";
import {
  Search, Zap, Shield, TrendingUp, Star, ArrowRight, CheckCircle,
} from "lucide-react";
import { getCategories, getFeaturedTools } from "@/lib/supabase";
import type { Tool as DBTool, Category as DBCategory } from "@/lib/supabase";
import type { Category } from "@/components/CategoryCard";
import type { Tool } from "@/components/ToolCard";

// Enable ISR: Revalidate this page every 60 seconds
// This means new tools will appear automatically within 1 minute!
export const revalidate = 60;

export const metadata: Metadata = {
  title: "FreeAIHub — Discover 1000+ Free AI Tools Directory",
  description:
    "Find the best free AI tools across 40 categories. All tools verified free — image generation, writing, coding, video, voice, and more. Updated daily.",
  openGraph: {
    title: "FreeAIHub — 1000+ Free AI Tools Directory",
    description: "Discover 1000+ free AI tools across 40 categories. Verified free.",
  },
};

const TRUST_BADGES = [
  "Verified Free Daily",
  "No Hidden Paywalls",
  "Expert Curated",
  "Updated 24/7",
];

// ── Page Component ──────────────────────────────────────────────────
export default async function HomePage() {
  // ── Fetch everything from the database — no hardcoding ──
  let categories: Category[] = [];
  let featuredTools: Tool[]  = [];
  let totalCategories        = 0;

  try {
    const [dbCats, dbTools] = await Promise.all([
      getCategories(),
      getFeaturedTools(6),
    ]);

    // Map DB categories → CategoryCard shape
    categories = (dbCats as DBCategory[]).map((c) => ({
      id:          c.id,
      slug:        c.slug,
      name:        c.name,
      description: c.description ?? "",
      icon_name:   c.icon_name ?? "",
      tool_count:  c.tool_count,
    }));

    totalCategories = categories.length;

    // Map DB tools → ToolCard shape
    featuredTools = (dbTools as DBTool[]).map((t) => ({
      id:                t.id,
      slug:              t.slug,
      name:              t.name,
      tagline:           t.tagline          ?? "",
      description:       t.description      ?? "",
      category_id:       t.category_id      ?? "",
      categoryName:      (t.categories as DBCategory | null | undefined)?.name,
      categorySlug:      (t.categories as DBCategory | null | undefined)?.slug,
      website_url:       t.website_url      ?? "#",
      affiliate_url:     t.affiliate_url    ?? undefined,
      is_free:           t.is_free,
      free_tier_limits:  t.free_tier_limits ?? undefined,
      pricing_detail:    t.pricing_detail   ?? undefined,
      logo_url:          t.logo_url         ?? undefined,
      featured:          t.featured,
      verified_free_date:t.verified_free_date ?? undefined,
      rating_avg:        t.rating_avg,
      rating_count:      t.rating_count,
      click_count:       t.click_count,
      tags:              t.tags,
    }));
  } catch (err) {
    console.error("[HomePage] DB fetch failed:", err);
    // categories and featuredTools remain empty arrays — page still renders
  }

  // Dynamically compute total tools count from DB data
  const totalTools = categories.reduce((sum, c) => sum + c.tool_count, 0);

  const STATS = [
    { value: totalTools > 0 ? `${totalTools.toLocaleString()}+` : "1,000+", label: "Free AI Tools",   icon: Zap },
    { value: totalCategories > 0 ? String(totalCategories)      : "40",     label: "Categories",       icon: TrendingUp },
    { value: "100%",                                                          label: "Verified Free",    icon: Shield },
    { value: "4.8★",                                                          label: "Avg Rating",       icon: Star },
  ];

  return (
    <>
      <Header />
      <main id="main-content">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section id="hero" className="hero-section min-h-[580px] flex items-center">
          <div className="hero-grid" aria-hidden="true" />

          <div className="container-xl relative z-10 py-20 text-center">

            {/* Trust pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                            bg-white/10 backdrop-blur-sm border border-white/20
                            text-white/90 text-sm font-medium mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Trusted by 500,000+ AI enthusiasts worldwide
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white
                           leading-[1.1] mb-6 animate-slide-up">
              Discover{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text
                                 bg-gradient-to-r from-yellow-300 to-amber-300">
                  {totalTools > 0 ? `${totalTools.toLocaleString()}+ Free AI Tools` : "1000+ Free AI Tools"}
                </span>
              </span>
              <br className="hidden sm:block" />
              — All Verified Free
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8
                          animate-slide-up stagger-2 leading-relaxed">
              The most comprehensive directory of free AI tools across{" "}
              <strong className="text-white">{totalCategories > 0 ? totalCategories : 40} categories</strong>. No credit card needed.
              No hidden paywalls. Just free AI tools.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-fade-in stagger-3">
              {TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 text-sm text-blue-100"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  {badge}
                </span>
              ))}
            </div>

            {/* Search bar */}
            <div className="max-w-2xl mx-auto animate-slide-up stagger-4">
              <form
                id="hero-search-form"
                action="/search"
                method="GET"
                role="search"
                className="search-wrapper"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <input
                    id="hero-search-input"
                    type="search"
                    name="q"
                    placeholder="Search free AI tools..."
                    className="search-input"
                    aria-label="Search free AI tools"
                  />
                  <button
                    id="hero-search-btn"
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary text-sm px-5 py-2.5"
                    aria-label="Search"
                  >
                    Search
                  </button>
                </div>

                {/* Popular searches */}
                <div className="flex flex-wrap items-center gap-2 mt-3 justify-center">
                  <span className="text-blue-200 text-xs">Popular:</span>
                  {["ChatGPT", "Image Generator", "AI Writer", "Code AI", "Video AI"].map((q) => (
                    <a
                      key={q}
                      href={`/search?q=${encodeURIComponent(q)}`}
                      id={`popular-search-${q.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20
                                 text-white/80 hover:text-white transition-all duration-200 border border-white/10"
                    >
                      {q}
                    </a>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ──────────────────────────────────────── */}
        <section id="stats-bar" className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="container-xl py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30
                                  flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-gray-900 dark:text-white">{value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Tools ─────────────────────────────────── */}
        <section id="featured-tools" className="section bg-gray-50 dark:bg-gray-950">
          <div className="container-xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge-featured">
                    <TrendingUp className="w-3 h-3" />
                    Editor&apos;s Pick
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                  Top Free AI Tools Right Now
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Handpicked by our team — all verified free, all exceptional
                </p>
              </div>
              <Link
                href="/tools"
                id="view-all-tools-btn"
                className="hidden sm:flex btn-secondary items-center gap-2"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {featuredTools.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400 dark:text-gray-600">
                <p className="text-lg font-medium">No featured tools yet.</p>
                <p className="text-sm mt-1">Add tools in the database and mark them as featured.</p>
              </div>
            )}

            <div className="mt-6 text-center sm:hidden">
              <Link href="/tools" id="view-all-tools-mobile" className="btn-secondary">
                View All Tools <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── All Categories ──────────────────────────────────── */}
        <section id="all-categories" className="section bg-white dark:bg-gray-900">
          <div className="container-xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3">
                Browse All{" "}
                <span className="gradient-text">
                  {totalCategories > 0 ? totalCategories : ""} AI Tool Categories
                </span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                From image generation to cybersecurity — find free AI tools for every use case
              </p>
            </div>

            {categories.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {categories.map((cat, i) => (
                  <CategoryCard key={cat.id} category={cat} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400 dark:text-gray-600">
                <p className="text-lg font-medium">No categories found.</p>
                <p className="text-sm mt-1">Run the seed SQL in your Supabase dashboard to populate categories.</p>
              </div>
            )}

            {categories.length > 0 && (
              <div className="mt-8 text-center">
                <Link
                  href="/categories"
                  id="view-all-categories-btn"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  View All {totalCategories} Categories
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ── Use Cases CTA strip ────────────────────────────── */}
        <section id="use-cases" className="section-sm bg-brand-50 dark:bg-brand-950/40 border-y border-brand-100 dark:border-brand-900/50">
          <div className="container-xl">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Free AI tools for:
              </span>
              {[
                { label: "Students",    slug: "students" },
                { label: "Marketers",   slug: "marketers" },
                { label: "Developers",  slug: "developers" },
                { label: "Designers",   slug: "designers" },
                { label: "Writers",     slug: "writers" },
                { label: "Business",    slug: "business" },
                { label: "Teachers",    slug: "teachers" },
                { label: "Freelancers", slug: "freelancers" },
              ].map(({ label, slug }) => (
                <Link
                  key={slug}
                  href={`/free-ai-tools-for/${slug}`}
                  id={`use-case-${slug}`}
                  className="px-4 py-2 rounded-full text-sm font-medium border
                             bg-white dark:bg-gray-800
                             text-brand-700 dark:text-brand-400
                             border-brand-200 dark:border-brand-800
                             hover:bg-brand-600 hover:text-white hover:border-brand-600
                             dark:hover:bg-brand-700 dark:hover:text-white
                             transition-all duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why FreeAIHub ──────────────────────────────────── */}
        <section id="why-freeaihub" className="section bg-white dark:bg-gray-950">
          <div className="container-xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3">
                Why Trust FreeAIHub?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                We&apos;re the only AI directory that manually verifies every tool is genuinely free before listing it.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔍",
                  title: "Manually Verified",
                  desc: "Every tool is tested by our team to confirm it has a genuine free tier — no misleading \"free trials\" without credit card.",
                },
                {
                  icon: "⚡",
                  title: "Updated Daily",
                  desc: "We monitor 1000+ tools daily. When a tool changes its pricing, we update or remove it within 24 hours.",
                },
                {
                  icon: "🏆",
                  title: "Expert Curated",
                  desc: "Tools are ranked by community ratings, usage data, and expert reviews — not by who pays us to rank higher.",
                },
                {
                  icon: "📊",
                  title: "Detailed Comparisons",
                  desc: "Side-by-side tool comparisons, honest pros/cons, and real user reviews to help you choose the right tool.",
                },
                {
                  icon: "🎯",
                  title: `${totalCategories > 0 ? totalCategories : 40} Categories`,
                  desc: "From AI agents to science research — we cover every AI use case with dedicated category pages optimized for SEO.",
                },
                {
                  icon: "🔓",
                  title: "Always Free to Use",
                  desc: "FreeAIHub itself is free. We earn through affiliate commissions — but only from tools we genuinely recommend.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="card p-6 hover:border-brand-200 dark:hover:border-brand-800 transition-colors"
                >
                  <div className="text-3xl mb-3" role="img" aria-label={title}>{icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Newsletter CTA ──────────────────────────────────── */}
        <section id="newsletter" className="section bg-gradient-to-br from-brand-600 to-brand-800">
          <div className="container-xl text-center">
            <div className="max-w-2xl mx-auto">
              <div className="text-5xl mb-4">📬</div>
              <h2 className="text-3xl font-black text-white mb-3">
                Get the Best Free AI Tools Weekly
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                10,000+ subscribers get our curated list of the newest and best free AI tools every week.
                No spam. Unsubscribe anytime.
              </p>
              <NewsletterForm
                id="hero-newsletter-form"
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                inputClassName="input flex-1 bg-white/10 border-white/20 text-white placeholder-blue-200 focus:bg-white/20 focus:border-white/40"
                buttonLabel="Subscribe Free"
              />
              <p className="text-blue-200 text-xs mt-3">
                No spam. Unsubscribe anytime. Read by 10,000+ AI enthusiasts.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
