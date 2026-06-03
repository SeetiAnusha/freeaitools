import { MetadataRoute } from 'next';
import { getAllToolSlugs, getAllCategorySlugs, getAllBlogPostSlugs, getAllPromptSlugs } from '@/lib/supabase';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aifreetoolshub.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [toolSlugs, categorySlugs, blogSlugs, promptSlugs] = await Promise.all([
    getAllToolSlugs(),
    getAllCategorySlugs(),
    getAllBlogPostSlugs(),
    getAllPromptSlugs(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/prompts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const promptPages: MetadataRoute.Sitemap = promptSlugs.map((slug) => ({
    url: `${BASE_URL}/prompts/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...blogPages, ...promptPages];
}
