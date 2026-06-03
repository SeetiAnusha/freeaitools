import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPrompts, getPromptCategories } from '@/lib/supabase';
import { Sparkles, Clock, TrendingUp, Copy, ChevronRight } from 'lucide-react';

// Enable ISR: revalidate every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = {
  title: '15 Free AI Prompts — Production-Ready for ChatGPT & Claude',
  description: 'Copy-paste ready AI prompts for marketing, coding, content creation, and more. All free, tested, and optimized for ChatGPT, Claude, and Gemini.',
  alternates: { canonical: '/prompts' },
};

export default async function PromptsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }> | { category?: string };
}) {
  const params = await Promise.resolve(searchParams);
  const selectedCategory = params.category ?? 'all';

  // Fetch all prompts and categories
  const [allPrompts, categories] = await Promise.all([
    getPrompts(true), // true = free only
    getPromptCategories(),
  ]);

  // Filter by category if selected
  const prompts = selectedCategory === 'all'
    ? allPrompts
    : allPrompts.filter(p => p.category === selectedCategory);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">15 Free Production-Quality Prompts</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              AI Prompts That Actually Work
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Copy-paste ready prompts for ChatGPT, Claude, and Gemini. Each prompt includes placeholders, quality controls, and clear instructions.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">
          
          {/* Category Filter */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/prompts"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-bule-900/30'
                }`}
              >
                All Prompts ({allPrompts.length})
              </Link>
              {categories.map(cat => {
                const count = allPrompts.filter(p => p.category === cat).length;
                return (
                  <Link
                    key={cat}
                    href={`/prompts?category=${encodeURIComponent(cat)}`}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                    }`}
                  >
                    {cat} ({count})
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Prompts Grid */}
          {prompts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400">No prompts found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.map((prompt) => (
                <Link
                  key={prompt.id}
                  href={`/prompts/${prompt.slug}`}
                  className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg transition-all duration-200"
                >
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-bule-400">
                      {prompt.category}
                    </span>
                    {prompt.featured && (
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                    {prompt.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {prompt.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Copy className="w-3 h-3" />
                        {prompt.usage_count} uses
                      </span>
                      <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800">
                        {prompt.difficulty_level}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/50 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Want More Premium Prompts?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
              We&apos;re adding new prompts every week. Subscribe to get notified when new prompts are published.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Subscribe to Newsletter
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
