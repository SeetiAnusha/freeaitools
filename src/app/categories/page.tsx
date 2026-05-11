import { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, type Category } from '@/lib/supabase';
import CategoryCard from '@/components/CategoryCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Grid3X3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All 40 Free AI Tool Categories',
  description: 'Browse all 40 categories of free AI tools. Image generation, writing, coding, video, voice, design — all verified free.',
  alternates: { canonical: '/categories' },
};

const STATIC_CATEGORIES: Category[] = [
  { id:'1',  slug:'ai-agents',             name:'AI Agents',               description:'Autonomous AI agents',    icon_name:'robot',   tool_count:0, created_at:'' },
  { id:'2',  slug:'image-generation',      name:'Image Generation',         description:'AI image creators',      icon_name:'image',   tool_count:0, created_at:'' },
  { id:'3',  slug:'video-generation',      name:'Video Generation',         description:'AI video tools',         icon_name:'video',   tool_count:0, created_at:'' },
  { id:'4',  slug:'text-content',          name:'Text & Writing',           description:'AI writing assistants',  icon_name:'pen',     tool_count:0, created_at:'' },
  { id:'5',  slug:'ai-coding',             name:'AI Coding Tools',          description:'Code with AI',           icon_name:'code',    tool_count:0, created_at:'' },
  { id:'6',  slug:'voice-speech',          name:'Voice & Speech',           description:'AI voice tools',         icon_name:'mic',     tool_count:0, created_at:'' },
  { id:'7',  slug:'seo-marketing',         name:'SEO & Marketing',          description:'AI marketing tools',     icon_name:'chart',   tool_count:0, created_at:'' },
  { id:'8',  slug:'data-analytics',        name:'Data & Analytics',         description:'AI data tools',          icon_name:'data',    tool_count:0, created_at:'' },
  { id:'9',  slug:'workflow-automation',   name:'Workflow Automation',       description:'Automate with AI',       icon_name:'flow',    tool_count:0, created_at:'' },
  { id:'10', slug:'chatbot-builders',      name:'Chatbot Builders',         description:'Build AI chatbots',      icon_name:'chat',    tool_count:0, created_at:'' },
  { id:'11', slug:'research-summarization',name:'Research & Summarization', description:'AI research tools',      icon_name:'research',tool_count:0, created_at:'' },
  { id:'12', slug:'education-tutoring',    name:'Education & Tutoring',     description:'AI learning tools',      icon_name:'edu',     tool_count:0, created_at:'' },
  { id:'13', slug:'graphic-design',        name:'Graphic Design',           description:'AI design tools',        icon_name:'design',  tool_count:0, created_at:'' },
  { id:'14', slug:'music-audio',           name:'Music & Audio',            description:'AI music generation',    icon_name:'music',   tool_count:0, created_at:'' },
  { id:'15', slug:'pdf-documents',         name:'PDF & Documents',          description:'AI document tools',      icon_name:'pdf',     tool_count:0, created_at:'' },
  { id:'16', slug:'social-media',          name:'Social Media AI',          description:'AI for social media',    icon_name:'social',  tool_count:0, created_at:'' },
  { id:'17', slug:'email-outreach',        name:'Email & Outreach',         description:'AI email tools',         icon_name:'email',   tool_count:0, created_at:'' },
  { id:'18', slug:'meeting-transcription', name:'Meeting & Transcription',  description:'AI meeting tools',       icon_name:'meeting', tool_count:0, created_at:'' },
  { id:'19', slug:'translation',           name:'Translation AI',           description:'AI translation tools',   icon_name:'lang',    tool_count:0, created_at:'' },
  { id:'20', slug:'presentations',         name:'Presentations & Slides',   description:'AI slide tools',         icon_name:'slides',  tool_count:0, created_at:'' },
  { id:'21', slug:'lead-generation',       name:'Lead Generation',          description:'AI lead gen tools',      icon_name:'lead',    tool_count:0, created_at:'' },
  { id:'22', slug:'vision-ocr',            name:'Vision & OCR',             description:'AI vision tools',        icon_name:'eye',     tool_count:0, created_at:'' },
  { id:'23', slug:'health-wellness',       name:'Health & Wellness',        description:'AI health tools',        icon_name:'health',  tool_count:0, created_at:'' },
  { id:'24', slug:'cybersecurity',         name:'Cybersecurity AI',         description:'AI security tools',      icon_name:'lock',    tool_count:0, created_at:'' },
  { id:'25', slug:'avatar-talking-head',   name:'Avatar & Talking Head',    description:'AI avatar tools',        icon_name:'avatar',  tool_count:0, created_at:'' },
  { id:'26', slug:'developer-api',         name:'Developer & API Tools',    description:'AI dev tools',           icon_name:'api',     tool_count:0, created_at:'' },
  { id:'27', slug:'prediction-forecasting',name:'Prediction & Forecasting', description:'AI prediction tools',    icon_name:'predict', tool_count:0, created_at:'' },
  { id:'28', slug:'sustainability-climate',name:'Sustainability AI',         description:'AI climate tools',       icon_name:'eco',     tool_count:0, created_at:'' },
  { id:'29', slug:'gaming-interactive',    name:'Gaming & Interactive',     description:'AI gaming tools',        icon_name:'game',    tool_count:0, created_at:'' },
  { id:'30', slug:'personal-finance',      name:'Personal Finance',         description:'AI finance tools',       icon_name:'money',   tool_count:0, created_at:'' },
  { id:'31', slug:'legal-ai',              name:'Legal AI',                 description:'AI legal tools',         icon_name:'legal',   tool_count:0, created_at:'' },
  { id:'32', slug:'hr-recruitment',        name:'HR & Recruitment',         description:'AI HR tools',            icon_name:'hr',      tool_count:0, created_at:'' },
  { id:'33', slug:'nonprofit-social',      name:'Nonprofit AI',             description:'AI for nonprofits',      icon_name:'heart',   tool_count:0, created_at:'' },
  { id:'34', slug:'customer-support',      name:'Customer Support',         description:'AI support tools',       icon_name:'support', tool_count:0, created_at:'' },
  { id:'35', slug:'knowledge-management',  name:'Knowledge Management',     description:'AI knowledge tools',     icon_name:'brain',   tool_count:0, created_at:'' },
  { id:'36', slug:'ecommerce-product',     name:'E-commerce & Product',     description:'AI e-commerce tools',   icon_name:'shop',    tool_count:0, created_at:'' },
  { id:'37', slug:'podcast-audio',         name:'Podcast & Audio',          description:'AI podcast tools',       icon_name:'podcast', tool_count:0, created_at:'' },
  { id:'38', slug:'science-research',      name:'Science & Research',       description:'AI science tools',       icon_name:'science', tool_count:0, created_at:'' },
  { id:'39', slug:'photo-editing',         name:'Photo Editing',            description:'AI photo tools',         icon_name:'photo',   tool_count:0, created_at:'' },
  { id:'40', slug:'video-editing',         name:'Video Editing AI',         description:'AI video editing',       icon_name:'edit',    tool_count:0, created_at:'' },
];

export default async function CategoriesPage() {
  let categories: Category[] = STATIC_CATEGORIES;
  try {
    const dbCats = await getCategories();
    if (dbCats.length > 0) {
      const dbMap = new Map(dbCats.map((c) => [c.slug, c]));
      categories = STATIC_CATEGORIES.map((s) => dbMap.get(s.slug) ?? s);
    }
  } catch { /* Use static fallback */ }

  const withTools    = categories.filter((c) => c.tool_count > 0);
  const comingSoon   = categories.filter((c) => c.tool_count === 0);

  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-14 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Grid3X3 className="w-5 h-5 text-blue-200" />
              <span className="text-blue-200 font-medium text-sm">All Categories</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              40 Free AI Tool Categories
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Every AI use case covered — all tools verified free, no credit card needed.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
          {withTools.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
                Categories with Tools ({withTools.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {withTools.map((cat, i) => (
                  <CategoryCard key={cat.id} category={cat} index={i} />
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0" />
              {withTools.length > 0 ? `Coming Soon (${comingSoon.length})` : `All 40 Categories`}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              We add new tools weekly — check back soon.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {comingSoon.map((cat, i) => (
                <CategoryCard key={cat.id} category={cat} index={i + withTools.length} />
              ))}
            </div>
          </section>

          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-8 text-center border border-blue-100 dark:border-blue-900">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Know a free AI tool we&#39;re missing?
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-5 text-sm">
              Submit it and we&#39;ll verify and add it within 48 hours.
            </p>
            <Link href="/submit-tool" className="btn-primary px-8 py-3 rounded-xl">
              Submit a Free Tool
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
