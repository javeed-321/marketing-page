import type { MetadataRoute } from 'next'

import { getAuthors, getPublishedPosts } from '@/lib/posts'
import { absoluteUrl } from '@/lib/site'
import { solutions } from '@/lib/solutions'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '/', priority: 1.0 },
    { path: '/pricing', priority: 0.8 },
    { path: '/solutions', priority: 0.8 },
    { path: '/about', priority: 0.5 },
    { path: '/blog', priority: 0.9 },
    { path: '/privacy-policy', priority: 0.3 },
  ].map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }))

  const postRoutes: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: absoluteUrl(post.permalink),
    lastModified: new Date(post.lastUpdated ?? post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const authorRoutes: MetadataRoute.Sitemap = getAuthors().map((author) => ({
    url: absoluteUrl(author.permalink),
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  return [...staticRoutes, ...postRoutes, ...authorRoutes]
}
