import type { Metadata } from 'next'

import { Text } from '@/components/elements/text'
import { JsonLd } from '@/components/json-ld'
import { BlogThreeColumnWithImages, type BlogPostCard } from '@/components/sections/blog-three-column-with-images'
import { formatDate, getAuthorForPost, getPublishedPosts } from '@/lib/posts'
import { absoluteUrl, organizationId, siteConfig, websiteId } from '@/lib/site'

// Used when a post has no `cover` / an author has no `avatar` — the block's <img>
// tags have no empty-src branch, so both fields must always resolve to something.
const FALLBACK_COVER = '/img/photos/1.webp'
const FALLBACK_AVATAR = '/img/avatars/10-size-160.webp'

export const metadata: Metadata = {
  title: `Blog — ${siteConfig.name}`,
  description: siteConfig.blogDescription,
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': '/blog/rss.xml' },
  },
  openGraph: {
    title: `Blog — ${siteConfig.name}`,
    description: siteConfig.blogDescription,
    url: '/blog',
    type: 'website',
  },
}

export default function Page() {
  const posts = getPublishedPosts()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${absoluteUrl('/blog')}/#blog`,
    name: siteConfig.blogTitle,
    description: siteConfig.blogDescription,
    url: absoluteUrl('/blog'),
    publisher: { '@id': organizationId },
    isPartOf: { '@id': websiteId },
    inLanguage: 'en',
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${absoluteUrl(post.permalink)}/#article`,
      headline: post.title,
      url: absoluteUrl(post.permalink),
      datePublished: post.date,
    })),
  }

  // Map our Post/Author records onto the block's expected card shape.
  const cards: BlogPostCard[] = posts.map((post) => {
    const author = getAuthorForPost(post)
    return {
      id: post.slug,
      title: post.title,
      href: post.permalink,
      description: post.excerpt,
      imageUrl: post.cover ?? FALLBACK_COVER,
      date: formatDate(post.date),
      datetime: post.date,
      category: { title: post.tags[0] ?? 'Documentation', href: '/blog' },
      author: {
        name: author.name,
        role: author.role ?? '',
        href: author.permalink,
        imageUrl: author.avatar ?? FALLBACK_AVATAR,
      },
    }
  })

  return (
    <>
      <JsonLd data={jsonLd} />

      {posts.length === 0 ? (
        <Text className="py-24 text-center">No posts published yet.</Text>
      ) : (
        <BlogThreeColumnWithImages headline="From the blog" subheadline={siteConfig.blogDescription} posts={cards} />
      )}
    </>
  )
}
