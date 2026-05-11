"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Star, Bookmark, CheckCircle, Zap, TrendingUp } from "lucide-react";

export interface Tool {
  id:           string;
  slug:         string;
  name:         string;
  tagline:      string;
  description:  string;
  category_id:  string;
  categoryName?: string;
  categorySlug?: string;
  website_url:  string;
  affiliate_url?: string;
  is_free:      boolean;
  free_tier_limits?: string;
  pricing_detail?: string;
  logo_url?:    string;
  featured:     boolean;
  verified_free_date?: string;
  rating_avg?:  number;
  rating_count?: number;
  click_count?: number;
  tags?:        string[];
  isSaved?:     boolean;
  onSave?:      (id: string) => void;
}

interface ToolCardProps {
  tool:     Tool;
  compact?: boolean;
}

function StarRating({ rating, count }: { rating: number; count?: number }) {
  const stars = Math.round(rating);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`w-3 h-3 ${s <= stars ? "fill-amber-400 text-amber-400" : "text-gray-200 dark:text-gray-700"}`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
        {rating.toFixed(1)}{count ? ` (${count})` : ""}
      </span>
    </div>
  );
}

export default function ToolCard({ tool, compact = false }: ToolCardProps) {
  // Safely build logo fallback
  let logoFallback = "/favicon.ico";
  try {
    logoFallback = `https://www.google.com/s2/favicons?domain=${new URL(tool.website_url).hostname}&sz=64`;
  } catch { /* keep default */ }

  return (
    <article
      id={`tool-card-${tool.slug}`}
      className="tool-card group flex flex-col"
      aria-label={`${tool.name} — ${tool.tagline}`}
    >
      {/* Featured ribbon */}
      {tool.featured && (
        <div className="absolute top-0 right-0 z-10">
          <div className="badge-featured rounded-tl-none rounded-br-none rounded-tr-2xl rounded-bl-2xl px-2.5 py-1 text-[11px]">
            <TrendingUp className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

      {/* ── Card Header: Logo + Name + Save ── */}
      <div className="flex items-start gap-3 mb-3">
        {/* Logo */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-700">
            <Image
              src={tool.logo_url || logoFallback}
              alt={`${tool.name} logo`}
              width={48}
              height={48}
              className="w-10 h-10 object-contain"
              unoptimized
              onError={(e) => {
                (e.target as HTMLImageElement).src = logoFallback;
              }}
            />
          </div>
          {tool.verified_free_date && (
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full
                         flex items-center justify-center border-2 border-white dark:border-gray-800"
              title="Verified free"
            >
              <CheckCircle className="w-3 h-3 text-white fill-white" />
            </div>
          )}
        </div>

        {/* Name + tagline */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate group-hover:text-brand-600 transition-colors leading-tight">
            {tool.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5 leading-snug">
            {tool.tagline}
          </p>
        </div>

        {/* Save button */}
        <button
          id={`save-tool-${tool.slug}`}
          onClick={() => tool.onSave?.(tool.id)}
          className={`flex-shrink-0 p-1.5 rounded-lg transition-all duration-200 ${
            tool.isSaved
              ? "text-brand-600 bg-brand-50 dark:bg-brand-900/30"
              : "text-gray-300 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30"
          }`}
          aria-label={tool.isSaved ? `Remove ${tool.name}` : `Save ${tool.name}`}
        >
          <Bookmark className={`w-4 h-4 ${tool.isSaved ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* ── Description ── */}
      {!compact && (
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed flex-1">
          {tool.description}
        </p>
      )}

      {/* ── Tags ── */}
      {!compact && tool.tags && tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[11px] font-medium
                         bg-gray-100 text-gray-500
                         dark:bg-gray-700 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ── Rating ── */}
      {tool.rating_avg && tool.rating_avg > 0 && (
        <div className="mb-3">
          <StarRating rating={tool.rating_avg} count={tool.rating_count} />
        </div>
      )}

      {/* ── Footer: Free badge + buttons ── */}
      <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
        {/* Free tier info */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 flex-shrink-0">
            <Zap className="w-3 h-3" />
            Free
          </span>
          {tool.free_tier_limits && (
            <span className="text-[11px] text-gray-400 dark:text-gray-500 truncate">
              {tool.free_tier_limits}
            </span>
          )}
        </div>

        {/* Action buttons — full width row */}
        <div className="flex items-center gap-2">
          <Link
            href={`/tools/${tool.slug}`}
            id={`tool-card-details-${tool.slug}`}
            className="flex-1 text-center text-xs font-semibold py-1.5 px-2 rounded-lg
                       border border-gray-200 dark:border-gray-700
                       text-gray-700 dark:text-gray-300
                       hover:border-brand-400 hover:text-brand-600
                       dark:hover:border-brand-600 dark:hover:text-brand-400
                       transition-all duration-200"
          >
            Details
          </Link>
          <Link
            href={`/go/${tool.slug}`}
            id={`tool-card-visit-${tool.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold
                       py-1.5 px-2 rounded-lg
                       bg-brand-600 hover:bg-brand-700
                       text-white
                       transition-all duration-200"
            aria-label={`Visit ${tool.name} — opens in new tab`}
          >
            Try Free
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </Link>
        </div>
      </div>

      {/* Affiliate label */}
      {tool.affiliate_url && (
        <div className="absolute bottom-1 left-3">
          <span className="text-[10px] text-gray-300 dark:text-gray-700">#ad</span>
        </div>
      )}
    </article>
  );
}
