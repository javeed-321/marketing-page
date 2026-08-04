import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/json-ld'
import { MDXContent } from '@/components/mdx'
import { formatDate, getAuthorForPost, getPostBySlug, getPublishedPosts } from '@/lib/posts'
import { absoluteUrl, organizationId, siteConfig, websiteId } from '@/lib/site'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const author = getAuthorForPost(post)

  return {
    title: `${post.title} — ${siteConfig.name}`,
    description: post.description,
    authors: [{ name: author.name, url: absoluteUrl(author.permalink) }],
    alternates: { canonical: post.canonical ?? post.permalink },
    openGraph: {
      title: post.title,
      description: post.description,
      url: post.permalink,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.lastUpdated ?? post.date,
      authors: [author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  const author = getAuthorForPost(post)

  const postUrl = absoluteUrl(post.permalink)
  const authorUrl = absoluteUrl(author.permalink)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${postUrl}/#article`,
        headline: post.title,
        description: post.description,
        url: postUrl,
        datePublished: post.date,
        dateModified: post.lastUpdated ?? post.date,
        author: {
          '@type': 'Person',
          '@id': `${authorUrl}#person`,
          name: author.name,
          url: authorUrl,
          ...(author.role && { jobTitle: author.role }),
        },
        publisher: { '@id': organizationId },
        isPartOf: { '@id': websiteId },
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
        ...(post.cover && { image: absoluteUrl(post.cover.src) }),
        wordCount: post.metadata.wordCount,
        keywords: post.tags.join(', '),
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${postUrl}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
          { '@type': 'ListItem', position: 3, name: post.title },
        ],
      },
    ],
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={jsonLd} />

      <header className="mb-10">
        <Link href="/blog" className="text-sm font-medium text-mauve-500 transition-colors hover:text-red-500">
          ← Blog
        </Link>
        <p className="mt-6 text-sm text-mauve-500">
          {formatDate(post.date)} · {post.metadata.readingTime} min read
        </p>
        {/* 40px / weight 500 / -0.02em, measured from the live article h1 —
            Tailwind's text-4xl + font-semibold read heavier than the original. */}
        <h1 className="mt-3 font-display text-[2.25rem]/[1.2] font-medium tracking-[-0.02em] text-mauve-950 sm:text-[2.5rem]/[1.2]">
          {post.title}
        </h1>
        <p className="mt-4 text-[1.0625rem]/[1.6] tracking-[-0.01em] text-mauve-700">{post.description}</p>
        <p className="mt-4 text-sm text-mauve-500">
          Written by{' '}
          <Link href={author.permalink} className="font-medium text-mauve-700 transition-colors hover:text-red-500">
            {author.name}
          </Link>
          {post.lastUpdated && <> · Updated {formatDate(post.lastUpdated)}</>}
        </p>
      </header>

      {post.cover && (
        // Velite reads the intrinsic size and a blur placeholder off the file at
        // build time, so the cover reserves its exact space before load.
        <Image
          src={post.cover.src}
          alt={post.title}
          width={post.cover.width}
          height={post.cover.height}
          placeholder={post.cover.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={post.cover.blurDataURL}
          priority
          className="mb-10 rounded-xl border border-card-border"
        />
      )}

      {/* Plain `prose`, not `prose-lg` — sizes are set explicitly in globals.css
          to the live site's measurements, and prose-lg's em scales would
          compound on top of them. */}
      <div className="prose max-w-none">
        <MDXContent code={post.body} />
      </div>
    </article>
  )
}
