"use client";

import Link from "next/link";
import { Zap, Twitter, Linkedin, Github, Mail, ExternalLink } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

const footerLinks = {
  Categories: [
    { label: "AI Agents",        href: "/category/ai-agents" },
    { label: "Image Generation", href: "/category/image-generation" },
    { label: "Video Generation", href: "/category/video-generation" },
    { label: "AI Coding Tools",  href: "/category/ai-coding" },
    { label: "Text & Writing",   href: "/category/text-content" },
    { label: "Voice & Speech",   href: "/category/voice-speech" },
    { label: "All 40 Categories",href: "/categories" },
  ],
  "Use Cases": [
    { label: "Free AI for Students",   href: "/free-ai-tools-for/students" },
    { label: "Free AI for Marketers",  href: "/free-ai-tools-for/marketers" },
    { label: "Free AI for Developers", href: "/free-ai-tools-for/developers" },
    { label: "Free AI for Designers",  href: "/free-ai-tools-for/designers" },
    { label: "Free AI for Writers",    href: "/free-ai-tools-for/writers" },
    { label: "Free AI for Business",   href: "/free-ai-tools-for/business" },
  ],
  Resources: [
    { label: "Blog",         href: "/blog" },
    { label: "Submit a Tool",href: "/submit-tool" },
    { label: "Saved Tools",  href: "/saved" },
    { label: "Compare Tools",href: "/compare" },
    { label: "Newsletter",   href: "/#newsletter" },
  ],
  Legal: [
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms of Service",  href: "/terms" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { label: "Sitemap",           href: "/sitemap.xml" },
    { label: "Contact",           href: "/contact" },
  ],
};

const socialLinks = [
  { label: "Twitter",  href: "https://twitter.com/FreeAIHub",  icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com/company/freeaihub", icon: Linkedin },
  { label: "GitHub",   href: "https://github.com/freeaihub",   icon: Github },
  { label: "Email",    href: "mailto:hello@freeaihub.io",       icon: Mail },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="footer">
      {/* Newsletter banner */}
      <div className="border-b border-brand-100 dark:border-brand-900/50 bg-gradient-to-r from-brand-50 to-blue-50 dark:from-brand-950 dark:to-gray-900">
        <div className="container-xl py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                🚀 Get new free AI tools weekly
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join 10,000+ subscribers. No spam, just the best free AI tools delivered to your inbox.
              </p>
            </div>
            <NewsletterForm
              id="footer-newsletter-form"
              className="flex gap-3 w-full md:w-auto"
              inputClassName="input max-w-xs"
              buttonLabel="Subscribe"
            />
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-xl py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" id="footer-logo" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center
                              shadow-glow group-hover:scale-110 transition-transform">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-black text-xl tracking-tight">
                <span className="text-brand-600">Free</span>
                <span className="text-gray-900 dark:text-white">AI</span>
                <span className="text-brand-500">Hub</span>
              </span>
            </Link>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed max-w-xs">
              The most comprehensive directory of free AI tools. Verified free, curated by experts, updated daily.
            </p>

            {/* Social links */}
            <div className="flex gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  id={`footer-social-${label.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center
                             text-gray-400 hover:text-brand-600 hover:bg-brand-50
                             dark:hover:text-brand-400 dark:hover:bg-brand-900/30
                             transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-4 mt-5">
              <div>
                <div className="text-2xl font-black text-brand-600">1000+</div>
                <div className="text-xs text-gray-500">AI Tools</div>
              </div>
              <div>
                <div className="text-2xl font-black text-brand-600">40</div>
                <div className="text-xs text-gray-500">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-black text-brand-600">100%</div>
                <div className="text-xs text-gray-500">Free</div>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3 tracking-wide uppercase">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      id={`footer-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-gray-500 dark:text-gray-400
                                 hover:text-brand-600 dark:hover:text-brand-400
                                 transition-colors duration-150 flex items-center gap-1 group"
                    >
                      {label}
                      {href.startsWith("http") && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 dark:border-gray-800">
        <div className="container-xl py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-600">
            <p>
              © {currentYear} FreeAIHub. All rights reserved.
            </p>
            <p className="text-center">
              <span className="text-amber-500">⚠️</span>{" "}
              <strong>Affiliate Disclosure:</strong> Some links on this site are affiliate links. We may earn a commission at no extra cost to you.{" "}
              <Link href="/affiliate-disclosure" className="underline hover:text-brand-500 transition-colors">
                Learn more
              </Link>
            </p>
            <p>
              Built with ❤️ for the AI community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
