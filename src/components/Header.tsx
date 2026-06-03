"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  Zap,
  ChevronDown,
  Moon,
  Sun,
  Bookmark,
  Grid3X3,
} from "lucide-react";

const categories = [
  { name: "AI Agents", slug: "ai-agents" },
  { name: "Image Generation", slug: "image-generation" },
  { name: "Video Generation", slug: "video-generation" },
  { name: "Text & Writing", slug: "text-content" },
  { name: "AI Coding", slug: "ai-coding" },
  { name: "Voice & Speech", slug: "voice-speech" },
  { name: "SEO & Marketing", slug: "seo-marketing" },
  { name: "Data & Analytics", slug: "data-analytics" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [scrolled, setScrolled]         = useState(false);
  const [catOpen, setCatOpen]           = useState(false);
  const [dark, setDark]                 = useState(false);
  const router    = useRouter();
  const pathname  = usePathname();
  const catRef    = useRef<HTMLDivElement>(null);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Dark mode */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  /* Close mobile menu on nav */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      id="main-header"
      className={`header ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link
            href="/"
            id="header-logo"
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center
                            shadow-glow group-hover:scale-110 transition-transform duration-200">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-black text-xl tracking-tight">
              <span className="text-brand-600">Free</span>
              <span className="text-gray-900 dark:text-white">AI</span>
              <span className="text-brand-500">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">

            {/* Categories dropdown */}
            <div ref={catRef} className="relative">
              <button
                id="categories-dropdown-btn"
                onClick={() => setCatOpen(!catOpen)}
                className="btn-ghost flex items-center gap-1.5"
                aria-expanded={catOpen}
                aria-haspopup="true"
              >
                <Grid3X3 className="w-4 h-4" />
                Categories
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`}
                />
              </button>

              {catOpen && (
                <div
                  id="categories-dropdown-menu"
                  className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900
                             rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800
                             p-2 z-50 animate-slide-up"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      id={`nav-cat-${cat.slug}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
                                 text-gray-700 dark:text-gray-300
                                 hover:bg-brand-50 hover:text-brand-700
                                 dark:hover:bg-brand-900/30 dark:hover:text-brand-400
                                 transition-colors duration-150"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 dark:border-gray-800 my-2" />
                  <Link
                    href="/categories"
                    id="nav-all-categories"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold
                               text-brand-600 dark:text-brand-400
                               hover:bg-brand-50 dark:hover:bg-brand-900/30
                               transition-colors duration-150"
                  >
                    View All 40 Categories →
                  </Link>
                </div>
              )}
            </div>

            <Link href="/blog" id="nav-blog" className="btn-ghost">Blog</Link>
            <Link href="/prompts" id="nav-prompts" className="btn-ghost">Prompts</Link>
            <Link href="/submit-tool" id="nav-submit" className="btn-ghost">Submit Tool</Link>
          </nav>

          {/* Search bar (desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-xs"
            role="search"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="header-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI tools..."
                className="input pl-10 py-2 text-sm"
                aria-label="Search AI tools"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              id="dark-mode-toggle"
              onClick={toggleDark}
              className="btn-ghost p-2 rounded-xl"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark
                ? <Sun  className="w-4 h-4 text-amber-500" />
                : <Moon className="w-4 h-4 text-gray-600" />
              }
            </button>

            <Link
              href="/saved"
              id="saved-tools-btn"
              className="hidden sm:flex btn-ghost p-2 rounded-xl"
              aria-label="Saved tools"
            >
              <Bookmark className="w-4 h-4" />
            </Link>

            <Link
              href="/submit-tool"
              id="submit-tool-btn"
              className="hidden lg:flex btn-primary text-xs px-4 py-2"
            >
              + Submit Tool
            </Link>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden btn-ghost p-2 rounded-xl"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen
                ? <X    className="w-5 h-5" />
                : <Menu className="w-5 h-5" />
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-gray-100 dark:border-gray-800 py-4 space-y-1 animate-slide-up"
          >
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="px-1 mb-3" role="search">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="mobile-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search AI tools..."
                  className="input pl-10 text-sm"
                />
              </div>
            </form>

            {[
              { href: "/categories", label: "All Categories" },
              { href: "/blog", label: "Blog" },
              { href: "/prompts", label: "Prompts" },
              { href: "/submit-tool", label: "Submit Tool" },
              { href: "/saved", label: "Saved Tools" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                id={`mobile-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
                className="block px-3 py-2.5 rounded-xl text-sm font-medium
                           text-gray-700 dark:text-gray-300
                           hover:bg-gray-50 dark:hover:bg-gray-800
                           transition-colors"
              >
                {label}
              </Link>
            ))}

            <div className="pt-2">
              <Link
                href="/submit-tool"
                id="mobile-submit-btn"
                className="btn-primary w-full justify-center"
              >
                + Submit Your Tool
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
