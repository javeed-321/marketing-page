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
    <div className="mx-auto max-w-6xl px-6 lg:px-10">
      <JsonLd data={jsonLd} />

      {/* 40px / weight 500 / -0.02em, measured from the live /blog heading. */}
      <header className="border-b border-card-border py-16 sm:py-20">
        <h1 className="font-display text-[2.25rem]/[1.2] font-medium tracking-[-0.02em] text-mauve-950 sm:text-[2.5rem]/[1.2]">
          {siteConfig.blogTitle}
        </h1>
      </header>

      {posts.length === 0 ? (
        <p className="py-24 text-center text-mauve-700">No posts published yet.</p>
      ) : (
        // Two per row from `sm` up, matching the live grid.
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 py-16 sm:grid-cols-2">
          {posts.map((post) => {
            const author = getAuthorForPost(post)
            return (
              <article key={post.slug} className="group flex flex-col gap-5">
                {post.cover && (
                  <Link href={post.permalink} className="block overflow-hidden rounded-xl">
                    <Image
                      src={post.cover.src}
                      alt=""
                      width={post.cover.width}
                      height={post.cover.height}
                      placeholder={post.cover.blurDataURL ? 'blur' : 'empty'}
                      blurDataURL={post.cover.blurDataURL}
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </Link>
                )}

                <div className="flex flex-col gap-3">
                  {/* Card title: 20px / weight 500 / -0.01em / 1.3, no underline. */}
                  <h2 className="font-display text-[1.25rem]/[1.3] font-medium tracking-[-0.01em] text-mauve-950">
                    <Link href={post.permalink} className="transition-colors group-hover:text-red-500">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="line-clamp-2 text-[0.875rem]/[1.4286] text-mauve-700">{post.description}</p>
                </div>

                {/* Byline block: two labelled columns, as on the live cards. */}
                <div className="mt-auto grid grid-cols-2 gap-4 pt-1">
                  <div className="flex flex-col gap-2">
                    <p className="text-[0.875rem]/[1.4286] text-mauve-700">Written by</p>
                    <div className="flex items-center gap-2">
                      {author.avatar && (
                        <Image
                          src={author.avatar.src}
                          alt=""
                          width={24}
                          height={24}
                          className="size-6 shrink-0 rounded-full object-cover"
                        />
                      )}
                      <Link href={author.permalink} className="text-base/[1.5] text-mauve-700 hover:text-red-500">
                        {author.name}
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[0.875rem]/[1.4286] text-mauve-700">Published</p>
                    <time dateTime={post.date} className="text-base/[1.5] text-mauve-700">
                      {formatDate(post.date)}
                    </time>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
