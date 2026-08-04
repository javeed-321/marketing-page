/**
 * The blog's data seam.
 *
 * Every page imports the functions below and never the underlying arrays, so
 * the content source can change without touching a single route. Today that
 * source is velite: `content/blog/<slug>/index.mdx` + `content/authors/*.yml`
 * are validated and compiled at build time (see `velite.config.ts`) into
 * `.velite/`, imported here through the `#site/content` alias.
 *
 * `post.body` is compiled MDX — a JS function-body string, not HTML — rendered
 * by `<MDXContent>` in `components/mdx.tsx` inside a `prose` wrapper.
 */

import { authors, posts, type Author, type Post } from '#site/content'

export type { Author, Post }

const isProd = process.env.NODE_ENV === 'production'

/** Newest first. Drafts render in `next dev`, and are stripped from production. */
export function getPublishedPosts(): Post[] {
  return posts
    .filter((post) => (isProd ? !post.draft : true))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find((post) => post.slug === slug)
}

export function getAuthors(): Author[] {
  return [...authors]
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug)
}

export function getAuthorForPost(post: Post): Author {
  const author = getAuthorBySlug(post.author)
  if (!author) {
    // velite.config.ts prepare() already guards this at build time
    throw new Error(`Unknown author "${post.author}" in post "${post.slug}"`)
  }
  return author
}

export function getPostsByAuthor(slug: string): Post[] {
  return getPublishedPosts().filter((post) => post.author === slug)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
