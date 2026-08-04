import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/json-ld'
import { formatDate, getAuthorBySlug, getAuthors, getPostsByAuthor } from '@/lib/posts'
import { absoluteUrl, organizationId, siteConfig } from '@/lib/site'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAuthors().map((author) => ({ slug: author.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthorBySlug(slug)
  if (!author) return {}

  const description = author.bio ?? `Articles by ${author.name} on the ${siteConfig.name} blog.`

  return {
    title: `${author.name} — ${siteConfig.name}`,
    description,
    alternates: { canonical: author.permalink },
    openGraph: {
      title: author.name,
      description,
      url: author.permalink,
      type: 'profile',
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const author = getAuthorBySlug(slug)
  if (!author) notFound()

  const posts = getPostsByAuthor(slug)
  const authorUrl = absoluteUrl(author.permalink)
  const sameAs = [author.url, author.linkedin, author.twitter].filter(Boolean)

  const oldestPost = posts.at(-1)
  const newestPost = posts[0]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${authorUrl}#profile`,
    ...(oldestPost && { dateCreated: oldestPost.date }),
    ...(newestPost && { dateModified: newestPost.lastUpdated ?? newestPost.date }),
    mainEntity: {
      '@type': 'Person',
      '@id': `${authorUrl}#person`,
      name: author.name,
      url: authorUrl,
      ...(author.role && { jobTitle: author.role }),
      ...(author.bio && { description: author.bio }),
      ...(author.avatar && { image: absoluteUrl(author.avatar.src) }),
      ...(sameAs.length > 0 && { sameAs }),
      ...(author.knowsAbout?.length && { knowsAbout: author.knowsAbout }),
      worksFor: { '@id': organizationId },
    },
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={jsonLd} />

      <Link href="/blog" className="text-sm font-medium text-mauve-500 transition-colors hover:text-red-500">
        ← Blog
      </Link>

      <header className="mt-6 mb-12 flex items-start gap-6">
        {author.avatar && (
          <Image
            src={author.avatar.src}
            alt={author.name}
            width={80}
            height={80}
            className="rounded-full border border-card-border"
          />
        )}
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-mauve-950">{author.name}</h1>
          {author.role && <p className="mt-1 text-mauve-700">{author.role}</p>}
          {author.bio && <p className="mt-3 max-w-xl text-mauve-700">{author.bio}</p>}
        </div>
      </header>

      <h2 className="mb-6 font-display text-xl font-semibold text-mauve-950">Articles by {author.name}</h2>

      {posts.length === 0 ? (
        <p className="text-mauve-700">No published articles yet.</p>
      ) : (
        <div className="divide-y divide-card-border">
          {posts.map((post) => (
            <article key={post.slug} className="group py-6 first:pt-0">
              <Link href={post.permalink}>
                <p className="text-sm text-mauve-500">
                  {formatDate(post.date)} · {post.metadata.readingTime} min read
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-mauve-950 transition-colors group-hover:text-red-500">
                  {post.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-mauve-700">{post.description}</p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
