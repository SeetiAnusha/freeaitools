import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog — Free AI Tools News, Guides & Reviews',
  description: 'Expert guides, comparisons, and news about the best free AI tools. Learn how to use AI tools for free to boost your productivity.',
  alternates: { canonical: '/blog' },
};

const BLOG_POSTS = [
  {
    slug: '10-best-free-ai-writing-tools-2024',
    title: '10 Best Free AI Writing Tools in 2024 (Tested & Ranked)',
    excerpt: 'We tested 30+ AI writing tools and ranked the best ones with a genuine free tier. ChatGPT, Claude, and 8 others made the cut.',
    category: 'Guides',
    date: '2024-12-01',
    readTime: '8 min read',
    featured: true,
    color: 'from-blue-500 to-cyan-400',
  },
  {
    slug: 'chatgpt-vs-claude-free-tier-comparison',
    title: 'ChatGPT vs Claude: Which Free Tier is Better in 2024?',
    excerpt: 'A head-to-head comparison of ChatGPT and Claude free plans — limits, quality, use cases, and which one wins for your workflow.',
    category: 'Comparisons',
    date: '2024-11-28',
    readTime: '6 min read',
    featured: true,
    color: 'from-violet-500 to-purple-400',
  },
  {
    slug: 'free-ai-image-generators-no-signup',
    title: '7 Free AI Image Generators With No Sign-Up Required',
    excerpt: 'Generate AI images instantly without creating an account. We found 7 tools that work in your browser with zero friction.',
    category: 'Lists',
    date: '2024-11-22',
    readTime: '5 min read',
    featured: false,
    color: 'from-rose-500 to-pink-400',
  },
  {
    slug: 'best-free-ai-coding-tools-developers',
    title: 'Best Free AI Coding Tools for Developers in 2024',
    excerpt: 'GitHub Copilot Free, Cursor, Codeium, and more. A complete guide to AI coding assistants you can use for free.',
    category: 'Guides',
    date: '2024-11-18',
    readTime: '10 min read',
    featured: false,
    color: 'from-emerald-500 to-teal-400',
  },
  {
    slug: 'free-ai-video-tools-creators',
    title: 'Free AI Video Tools Every Creator Should Know',
    excerpt: 'Pika, Kling, InVideo AI and more — create professional videos for free with these AI-powered tools. Limits and tips included.',
    category: 'Lists',
    date: '2024-11-14',
    readTime: '7 min read',
    featured: false,
    color: 'from-amber-500 to-yellow-400',
  },
  {
    slug: 'how-to-use-ai-tools-for-free-guide',
    title: 'The Complete Guide to Using AI Tools for Free in 2024',
    excerpt: 'A beginner-friendly guide explaining how to find, evaluate, and get the most out of free AI tools without falling for fake "free" tiers.',
    category: 'Guides',
    date: '2024-11-10',
    readTime: '12 min read',
    featured: false,
    color: 'from-sky-500 to-blue-400',
  },
];

const CATEGORIES = ['All', 'Guides', 'Comparisons', 'Lists', 'News'];

function PostCard({ post, featured = false }: { post: typeof BLOG_POSTS[0]; featured?: boolean }) {
  return (
    <article className={`group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${featured ? 'md:col-span-2' : ''}`}>
      {/* Color bar */}
      <div className={`h-1.5 bg-gradient-to-r ${post.color}`} />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center gap-1">
            <Tag className="w-3 h-3" />{post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />{post.readTime}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className={`font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight ${featured ? 'text-xl' : 'text-base'}`}>
            {post.title}
          </h2>
        </Link>

        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-2.5 transition-all"
        >
          Read article <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-14 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">FreeAIHub Blog</h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              Expert guides, tool comparisons, and news about the best free AI tools. Updated weekly.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${cat === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <PostCard key={post.slug} post={post} featured={i === 0} />
            ))}
          </div>

          {/* Coming soon note */}
          <div className="mt-12 text-center bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
            <p className="text-2xl mb-3">✍️</p>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">More articles coming weekly</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Subscribe to get our best AI tool guides delivered to your inbox every week.
            </p>
            <Link href="/#newsletter" className="btn-primary px-8 py-3 rounded-xl">
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
