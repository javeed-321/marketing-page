import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={jsonLd} />

      <header className="mb-12">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-mauve-950">Blog</h1>
        <p className="mt-3 text-lg text-mauve-700">{siteConfig.blogDescription}</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-mauve-700">No posts published yet.</p>
      ) : (
        <div className="divide-y divide-card-border">
          {posts.map((post) => {
            const author = getAuthorForPost(post)
            return (
              <article key={post.slug} className="group py-8 first:pt-0">
                <div className="flex gap-6">
                  <div className="flex-1">
                    <Link href={post.permalink}>
                      <p className="text-sm text-mauve-500">
                        {formatDate(post.date)} · {post.metadata.readingTime} min read
                      </p>
                      <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-mauve-950 transition-colors group-hover:text-red-500">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-mauve-700">{post.description}</p>
                    </Link>
                    <p className="mt-3 text-sm text-mauve-500">
                      Written by{' '}
                      <Link href={author.permalink} className="font-medium transition-colors hover:text-red-500">
                        {author.name}
                      </Link>
                    </p>
                  </div>
                  {post.cover && (
                    <Link href={post.permalink} className="hidden shrink-0 sm:block">
                      <Image
                        src={post.cover.src}
                        alt=""
                        width={180}
                        height={101}
                        placeholder={post.cover.blurDataURL ? 'blur' : 'empty'}
                        blurDataURL={post.cover.blurDataURL}
                        className="rounded-lg border border-card-border object-cover"
                      />
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
