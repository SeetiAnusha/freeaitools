import Link from 'next/link';
import { Search, Home, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  const suggestions = [
    { label: 'Browse All Categories', href: '/#categories' },
    { label: 'Featured AI Tools', href: '/#featured' },
    { label: 'AI Writing Tools', href: '/category/text-content' },
    { label: 'AI Image Generators', href: '/category/image-generation' },
    { label: 'AI Coding Tools', href: '/category/ai-coding' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg mx-auto">
          {/* 404 graphic */}
          <div className="text-[120px] font-black text-blue-100 dark:text-blue-950 leading-none select-none mb-2">
            404
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            The page you&#39;re looking for doesn&#39;t exist or may have been moved.
            Try searching or browsing our categories.
          </p>

          {/* Search */}
          <form action="/search" method="GET" className="flex gap-2 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                name="q"
                placeholder="Search free AI tools..."
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="btn-primary px-5 py-3 rounded-xl"
            >
              Search
            </button>
          </form>

          {/* Suggestions */}
          <div className="text-left space-y-2 mb-8">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Popular pages
            </p>
            {suggestions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400
                           hover:underline text-sm py-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {s.label}
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl"
          >
            <Home className="w-4 h-4" /> Back to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
