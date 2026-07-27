import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { JsonLd } from '@/components/json-ld'
import { ArticleSections } from '@/components/site/article-sections'
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
    alternates: { canonical: post.permalink },
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
        ...(post.cover && { image: absoluteUrl(post.cover) }),
        wordCount: post.wordCount,
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
    <Container className="py-16 sm:py-24">
      <JsonLd data={jsonLd} />

      <article className="mx-auto w-full max-w-3xl">
        <header className="flex flex-col gap-4">
          <Link href="/blog" className="text-sm/6 font-medium text-mauve-500 transition-colors hover:text-red-500">
            ← Blog
          </Link>
          <p className="mt-2 text-sm/6 text-mauve-500">
            {formatDate(post.date)} · {post.readingTime} min read
          </p>
          <Heading className="text-[2.25rem]/[1.15] sm:text-[2.75rem]/[1.1] lg:text-[3.25rem]/[1.1]">
            {post.title}
          </Heading>
          <Text size="lg" className="text-pretty">
            {post.excerpt}
          </Text>
          <p className="text-sm/6 text-mauve-500">
            Written by{' '}
            <Link href={author.permalink} className="font-medium transition-colors hover:text-red-500">
              {author.name}
            </Link>
            {post.lastUpdated && <> · Updated {formatDate(post.lastUpdated)}</>}
          </p>
        </header>

        {post.cover && (
          <Image
            src={post.cover}
            alt={post.title}
            width={1800}
            height={945}
            priority
            className="mt-10 w-full rounded-xl border border-card-border bg-card"
          />
        )}

        {/* No `Document` wrapper here — each section applies its own styling, and
            Document's descendant selectors would restyle every block's internals. */}
        <div className="mt-10">
          <ArticleSections sections={post.sections} />
        </div>
      </article>
    </Container>
  )
}
