import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
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
      ...(author.avatar && { image: absoluteUrl(author.avatar) }),
      ...(sameAs.length > 0 && { sameAs }),
      ...(author.knowsAbout?.length && { knowsAbout: author.knowsAbout }),
      worksFor: { '@id': organizationId },
    },
  }

  return (
    <Container className="py-16 sm:py-24">
      <JsonLd data={jsonLd} />

      <div className="mx-auto w-full max-w-3xl">
        <Link href="/blog" className="text-sm/6 font-medium text-mauve-500 transition-colors hover:text-red-500">
          ← Blog
        </Link>

        <header className="mt-6 flex flex-col items-start gap-6 sm:flex-row">
          {author.avatar && (
            <Image
              src={author.avatar}
              alt={author.name}
              width={80}
              height={80}
              className="size-20 shrink-0 rounded-full border border-card-border bg-card object-cover"
            />
          )}
          <div className="flex flex-col gap-3">
            <Heading className="text-[2rem]/[1.15] sm:text-[2.5rem]/[1.1] lg:text-[3rem]/[1.1]">{author.name}</Heading>
            {author.role && <p className="text-sm/6 text-mauve-500">{author.role}</p>}
            {author.bio && (
              <Text className="max-w-xl text-pretty">{author.bio}</Text>
            )}
          </div>
        </header>

        <h2 className="mt-12 font-display text-xl/7 font-medium tracking-[-0.02em] text-mauve-950 dark:text-white">
          Articles by {author.name}
        </h2>

        {posts.length === 0 ? (
          <Text className="mt-6">No published articles yet.</Text>
        ) : (
          <div className="mt-6 divide-y divide-card-border border-t border-card-border">
            {posts.map((post) => (
              <article key={post.slug} className="group py-6">
                <Link href={post.permalink} className="flex flex-col gap-2">
                  <p className="text-sm/6 text-mauve-500">
                    {formatDate(post.date)} · {post.readingTime} min read
                  </p>
                  <h3 className="font-display text-lg/7 font-medium tracking-[-0.02em] text-balance text-mauve-950 transition-colors group-hover:text-red-500 dark:text-white">
                    {post.title}
                  </h3>
                  <Text className="line-clamp-2 text-pretty">{post.excerpt}</Text>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}
