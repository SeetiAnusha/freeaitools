import Link from "next/link";
import { LucideIcon } from "lucide-react";

export interface Category {
  id:          string;
  slug:        string;
  name:        string;
  description: string | null;
  icon_name:   string | null;
  tool_count:  number;
}

interface CategoryCardProps {
  category: Category;
  index?:   number;
}

// Icon map — emoji icons for each category
const CATEGORY_ICONS: Record<string, string> = {
  "ai-agents":          "🤖",
  "video-generation":   "🎬",
  "video-editing":      "✂️",
  "voice-speech":       "🎙️",
  "text-content":       "✍️",
  "image-generation":   "🎨",
  "graphic-design":     "🖼️",
  "music-audio":        "🎵",
  "ai-coding":          "💻",
  "workflow-automation":"⚡",
  "translation":        "🌐",
  "pdf-documents":      "📄",
  "lead-generation":    "📈",
  "seo-marketing":      "📊",
  "chatbot-builders":   "💬",
  "data-analytics":     "📉",
  "presentations":      "🎯",
  "email-outreach":     "📧",
  "social-media":       "📱",
  "vision-ocr":         "👁️",
  "research-summarization": "🔬",
  "education-tutoring": "🎓",
  "health-wellness":    "🏥",
  "cybersecurity":      "🔒",
  "avatar-talking-head":"🧑‍💻",
  "developer-api":      "🛠️",
  "meeting-transcription": "📝",
  "prediction-forecasting": "🔮",
  "sustainability-climate": "🌿",
  "gaming-interactive": "🎮",
  "personal-finance":   "💰",
  "legal-ai":           "⚖️",
  "hr-recruitment":     "👥",
  "nonprofit-social":   "❤️",
  "customer-support":   "🎧",
  "knowledge-management":"🧠",
  "ecommerce-product":  "🛍️",
  "podcast-audio":      "🎙️",
  "science-research":   "🧪",
  "photo-editing":      "📷",
};

// Gradient color pairs for category cards
const GRADIENT_COLORS = [
  ["from-blue-500", "to-cyan-400"],
  ["from-violet-500", "to-purple-400"],
  ["from-rose-500", "to-pink-400"],
  ["from-amber-500", "to-yellow-400"],
  ["from-emerald-500", "to-teal-400"],
  ["from-orange-500", "to-red-400"],
  ["from-sky-500", "to-blue-400"],
  ["from-indigo-500", "to-violet-400"],
];

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const icon    = CATEGORY_ICONS[category.slug] || "🔧";
  const [from, to] = GRADIENT_COLORS[index % GRADIENT_COLORS.length];

  return (
    <Link
      href={`/category/${category.slug}`}
      id={`category-card-${category.slug}`}
      className="category-card block group"
      aria-label={`${category.name} — ${category.tool_count} free tools`}
    >
      {/* Icon */}
      <div
        className={`category-icon-wrapper bg-gradient-to-br ${from} ${to}
                    w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3
                    group-hover:scale-110 transition-all duration-300 shadow-md`}
      >
        <span role="img" aria-hidden="true">{icon}</span>
      </div>

      {/* Name */}
      <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1
                     group-hover:text-brand-600 dark:group-hover:text-brand-400
                     transition-colors leading-tight">
        {category.name}
      </h3>

      {/* Tool count */}
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
        {category.tool_count > 0
          ? `${category.tool_count} free tools`
          : "Coming soon"}
      </p>

      {/* Hover arrow */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100
                      transition-all duration-200 translate-x-1 group-hover:translate-x-0">
        <span className="text-brand-500 dark:text-brand-400 text-sm font-bold">→</span>
      </div>
    </Link>
  );
}
