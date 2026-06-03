import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CopyButton from '@/components/CopyButton';
import { getPromptBySlug, getAllPromptSlugs, getPrompts } from '@/lib/supabase';
import { Copy, ChevronRight, Tag, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';

// Enable ISR
export const revalidate = 60;

// Generate static params for all prompts
export async function generateStaticParams() {
  const slugs = await getAllPromptSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const prompt = await getPromptBySlug(slug);
  
  if (!prompt) {
    return { title: 'Prompt Not Found' };
  }

  return {
    title: prompt.seo_title || prompt.title,
    description: prompt.seo_description || prompt.description,
    alternates: { canonical: `/prompts/${slug}` },
  };
}

export default async function PromptDetailPage(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  const { slug } = await Promise.resolve(params);
  const prompt = await getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  // Get related prompts from same category
  const relatedPrompts = (await getPrompts(true))
    .filter(p => p.category === prompt.category && p.id !== prompt.id)
    .slice(0, 3);

  // Structured data for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: prompt.title,
    description: prompt.description,
    author: { '@type': 'Organization', name: 'FreeAIHub' },
    publisher: {
      '@type': 'Organization',
      name: 'FreeAIHub',
      logo: { '@type': 'ImageObject', url: 'https://aifreetoolshub.com/logo.png' },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main>
        {/* Breadcrumbs */}
        <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-4 px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/prompts" className="hover:text-blue-600 dark:hover:text-blue-400">Prompts</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={`/prompts?category=${encodeURIComponent(prompt.category)}`} className="hover:text-blue-600 dark:hover:text-blue-400">{prompt.category}</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-900 dark:text-white font-medium truncate max-w-xs">{prompt.title}</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-white/10 backdrop-blur">
                {prompt.category}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur">
                {prompt.difficulty_level}
              </span>
              {prompt.featured && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-400/20 backdrop-blur flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
              {prompt.title}
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-6">
              {prompt.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200">
              <span className="flex items-center gap-1.5">
                <Copy className="w-4 h-4" />
                {prompt.usage_count} uses
              </span>
              <span>•</span>
              <span>Best for: {prompt.ai_tool}</span>
              <span>•</span>
              <span>Use case: {prompt.use_case}</span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          
          {/* The Prompt */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-12">
            <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Copy className="w-5 h-5 text-blue-600" />
                The Prompt
              </h2>
              <CopyButton promptText={prompt.prompt_text} />
            </div>
            <div className="p-6">
              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-950 p-6 rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto">
                {prompt.prompt_text}
              </pre>
            </div>
          </div>

          {/* Instructions */}
          {prompt.instructions && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                How to Use This Prompt
              </h2>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-900/50 p-6">
                <ol className="space-y-3">
                  {prompt.instructions.split('\n').map((line, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-sm flex items-center justify-center font-semibold">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Tags */}
          {prompt.tags && prompt.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Prompts
            </Link>
          </div>
        </article>

        {/* Related Prompts */}
        {relatedPrompts.length > 0 && (
          <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                More {prompt.category} Prompts
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPrompts.map(related => (
                  <Link
                    key={related.id}
                    href={`/prompts/${related.slug}`}
                    className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg transition-all"
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                      {related.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
