import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { JsonLd } from '@/components/json-ld'
import { formatDate, getAuthorForPost, getPublishedPosts } from '@/lib/posts'
import { absoluteUrl, organizationId, siteConfig, websiteId } from '@/lib/site'

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

  return (
    <Container className="py-16 sm:py-24">
      <JsonLd data={jsonLd} />

      <header className="flex max-w-2xl flex-col gap-6">
        <Heading>Blog</Heading>
        <Text size="lg" className="text-pretty">
          {siteConfig.blogDescription}
        </Text>
      </header>

      {posts.length === 0 ? (
        <Text className="mt-16">No posts published yet.</Text>
      ) : (
        <div className="mt-12 divide-y divide-card-border border-t border-card-border sm:mt-16">
          {posts.map((post) => {
            const author = getAuthorForPost(post)
            return (
              <article key={post.slug} className="group grid gap-6 py-8 sm:grid-cols-[1fr_auto] sm:gap-10">
                <div className="flex flex-col gap-3">
                  <Link href={post.permalink} className="flex flex-col gap-3">
                    <p className="text-sm/6 text-mauve-500">
                      {formatDate(post.date)} · {post.readingTime} min read
                    </p>
                    <h2 className="font-display text-xl/7 font-medium tracking-[-0.02em] text-balance text-mauve-950 transition-colors group-hover:text-red-500 dark:text-white">
                      {post.title}
                    </h2>
                    <Text className="line-clamp-2 text-pretty">{post.excerpt}</Text>
                  </Link>
                  <p className="text-sm/6 text-mauve-500">
                    Written by{' '}
                    <Link href={author.permalink} className="font-medium transition-colors hover:text-red-500">
                      {author.name}
                    </Link>
                  </p>
                </div>

                {post.cover && (
                  <Link href={post.permalink} className="max-sm:hidden">
                    <Image
                      src={post.cover}
                      alt=""
                      width={200}
                      height={112}
                      className="aspect-video w-50 rounded-lg border border-card-border bg-card object-cover"
                    />
                  </Link>
                )}
              </article>
            )
          })}
        </div>
      )}
    </Container>
  )
}
