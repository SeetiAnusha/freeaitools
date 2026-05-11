/**
 * schema.ts
 * Centralised JSON-LD schema markup helpers.
 * Import and call these in any Server Component page.
 */

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://freeaihub.io';

/* ── Types (reuse from supabase.ts to avoid circular deps) ── */
interface SchemaTool {
  slug: string;
  name: string;
  description?: string | null;
  tagline?: string | null;
  website_url?: string | null;
  free_tier_limits?: string | null;
  rating_avg?: number;
  rating_count?: number;
  tags?: string[];
}

interface SchemaCategory {
  slug: string;
  name: string;
}

/* ── SoftwareApplication ─────────────────────────────────── */
export function softwareAppSchema(tool: SchemaTool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    applicationCategory: 'AIApplication',
    operatingSystem: 'Web',
    description: tool.description ?? tool.tagline ?? undefined,
    url: tool.website_url ?? `${BASE}/tools/${tool.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: tool.free_tier_limits ?? 'Free tier available',
    },
    ...(tool.rating_count && tool.rating_count > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: tool.rating_avg,
        reviewCount: tool.rating_count,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    keywords: tool.tags?.join(', '),
  };
}

/* ── BreadcrumbList ──────────────────────────────────────── */
export function breadcrumbSchema(
  crumbs: { name: string; href?: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.href && { item: `${BASE}${c.href}` }),
    })),
  };
}

/* ── ItemList (category page) ────────────────────────────── */
export function itemListSchema(
  categoryName: string,
  tools: { slug: string; name: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Free ${categoryName} Tools`,
    numberOfItems: tools.length,
    itemListElement: tools.slice(0, 10).map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      url: `${BASE}/tools/${t.slug}`,
    })),
  };
}

/* ── FAQPage ─────────────────────────────────────────────── */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/* ── WebSite (for homepage) ──────────────────────────────── */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FreeAIHub',
    url: BASE,
    description: 'Discover 1000+ free AI tools across 40 categories.',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

/* ── Organization ────────────────────────────────────────── */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FreeAIHub',
    url: BASE,
    logo: `${BASE}/logo.png`,
    sameAs: ['https://twitter.com/FreeAIHub'],
  };
}

/* ── Helper: render any schema as inline <script> string ── */
export function schemaTag(data: object): string {
  return JSON.stringify(data);
}
