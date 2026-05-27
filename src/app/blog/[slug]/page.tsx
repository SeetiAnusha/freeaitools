import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, ChevronRight, ArrowLeft, Tag } from 'lucide-react';

/* ── Static blog post data (replace with CMS/DB later) ─────── */
const POSTS: Record<string, {
  title: string; excerpt: string; date: string; readTime: string;
  category: string; content: string[];
}> = {
  '10-best-free-ai-writing-tools-2026': {
    title: '10 Best Free AI Writing Tools in 2026 (Tested & Ranked)',
    excerpt: 'We tested 30+ AI writing tools and ranked the best ones with a genuine free tier.',
    date: '2026-05-20', readTime: '8 min read', category: 'Guides',
    content: [
      'AI writing tools continue to evolve rapidly in 2026. But most charge after a short trial. We tested 30+ tools and found 10 with a genuinely free tier — no credit card, no tricks.',
      '## 1. ChatGPT (Free — GPT-3.5)\nOpenAI\'s ChatGPT remains the gold standard for free AI writing. The free plan gives unlimited access to GPT-3.5, which handles most writing tasks with ease. It\'s excellent for drafting emails, blog posts, social captions, and more.',
      '## 2. Claude by Anthropic (Free — Claude 3 Haiku)\nAnthropic\'s Claude offers free access to Claude 3 Haiku. It excels at long-form writing, nuanced analysis, and maintaining consistent tone across long documents.',
      '## 3. Google Gemini (Free — Gemini Flash)\nGemini is Google\'s answer to ChatGPT. The free tier uses Gemini 1.5 Flash and integrates with Google Docs and Gmail for a seamless writing experience.',
      '## 4. Rytr (Free — 10,000 chars/month)\nRytr is purpose-built for marketing copy. The free plan gives 10,000 characters per month and 20+ writing tones — enough for several blog posts or email campaigns.',
      '## 5. Copy.ai (Free — 2,000 words/month)\nCopy.ai is popular with marketing teams. The free plan includes 2,000 words per month and 90+ copywriting templates for ads, product descriptions, and social media.',
      '## Which Should You Use?\nFor general-purpose writing, **ChatGPT** or **Claude** are your best bets — both are highly capable and free without limits on the basic tier. For marketing copy specifically, **Rytr** or **Copy.ai** offer better templates.',
    ],
  },
  'chatgpt-vs-claude-free-tier-comparison': {
    title: 'ChatGPT vs Claude: Which Free Tier is Better in 2026?',
    excerpt: 'A head-to-head comparison of ChatGPT and Claude free plans.',
    date: '2026-05-15', readTime: '6 min read', category: 'Comparisons',
    content: [
      'Both ChatGPT and Claude are excellent free AI assistants — but they have different strengths. Here\'s an honest comparison to help you choose.',
      '## Free Tier Limits\n**ChatGPT Free:** Unlimited GPT-3.5, limited GPT-4o messages per day.\n**Claude Free:** Unlimited Claude 3 Haiku, limited Claude 3.5 Sonnet messages per day.',
      '## Writing Quality\nClaude generally produces more nuanced, human-like writing. ChatGPT is faster and more direct. For creative writing, Claude wins. For factual summaries, they\'re roughly equal.',
      '## Code Generation\nChatGPT has a slight edge for code due to its training data and the ability to execute code in the Pro tier. But Claude 3 Haiku handles most coding tasks well on the free plan.',
      '## Verdict\nUse **ChatGPT** if you need fast, versatile assistance and occasional GPT-4o access.\nUse **Claude** if you prefer more thoughtful, longer-form writing with a safety-focused approach.',
    ],
  },
};

/* ── Generate static params for known posts ─────────────────── */
export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

/* ── Metadata ───────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const post = POSTS[slug];
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  };
}

/* ── Render markdown-lite content ───────────────────────────── */
function renderContent(paragraphs: string[]) {
  return paragraphs.map((p, i) => {
    if (p.startsWith('## ')) {
      const [heading, ...rest] = p.split('\n');
      return (
        <div key={i}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">
            {heading.replace('## ', '')}
          </h2>
          {rest.length > 0 && (
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {rest.join('\n')}
            </p>
          )}
        </div>
      );
    }
    return (
      <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {p}
      </p>
    );
  });
}

/* ── Page ───────────────────────────────────────────────────── */
export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> | { slug: string } }
) {
  const { slug } = await Promise.resolve(params);
  const post = POSTS[slug];
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'FreeAIHub' },
    publisher: {
      '@type': 'Organization',
      name: 'FreeAIHub',
      logo: { '@type': 'ImageObject', url: 'https://freeaihub.io/logo.png' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <nav className="flex items-center gap-1.5 text-blue-200 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white truncate max-w-[200px]">{post.title.slice(0, 40)}…</span>
            </nav>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-blue-100">
                <Tag className="w-3 h-3" />{post.category}
              </span>
              <span className="flex items-center gap-1 text-blue-200 text-sm">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1 text-blue-200 text-sm">
                <Clock className="w-3.5 h-3.5" />{post.readTime}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{post.title}</h1>
            <p className="text-blue-100 text-lg mt-4">{post.excerpt}</p>
          </div>
        </section>

        {/* Article body */}
        <article className="max-w-3xl mx-auto px-4 py-12">
          <div className="space-y-5">
            {renderContent(post.content)}
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
