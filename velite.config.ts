import rehypeSlug from 'rehype-slug'
import { defineCollection, defineConfig, s } from 'velite'

/**
 * Build-time content layer for the blog.
 *
 * Posts are MDX folders under `content/blog/`; authors are YAML files under
 * `content/authors/`. On every `dev`/`build` (invoked from `next.config.ts`)
 * velite validates frontmatter against the schemas below, compiles each MDX
 * body to a JS function-body string, copies colocated images into
 * `public/static/` with hashed names, and writes the typed result to `.velite/`
 * — imported everywhere as `#site/content`.
 *
 * A schema violation fails the build with a precise error, which is what makes
 * MDX authoring safe: the pages downstream can assume every field is present
 * and well-formed.
 */

const authors = defineCollection({
  name: 'Author',
  pattern: 'authors/*.yml',
  schema: s
    .object({
      name: s.string(),
      slug: s.slug('authors'),
      role: s.string().optional(),
      bio: s.string().optional(),
      avatar: s.image().optional(),
      url: s.string().url().optional(),
      linkedin: s.string().url().optional(),
      twitter: s.string().url().optional(),
      knowsAbout: s.array(s.string()).optional(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/blog/authors/${data.slug}`,
    })),
})

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(120),
      description: s.string().max(300),
      date: s.isodate(),
      lastUpdated: s.isodate().optional(),
      author: s.string(), // slug of an entry in content/authors/
      tags: s.array(s.string()).default([]),
      cover: s.image().optional(),
      draft: s.boolean().default(false),
      canonical: s.string().url().optional(),
      path: s.path(),
      metadata: s.metadata(), // readingTime, wordCount
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform((data) => {
      // The URL slug is the post's folder name. Keep folders flat — a nested
      // `blog/a/b/index.mdx` would yield the slug `a/b`, which the
      // single-segment /blog/[slug] route cannot serve.
      const slug = data.path.replace(/^blog\//, '').replace(/\/index$/, '')
      return {
        ...data,
        slug,
        permalink: `/blog/${slug}`,
      }
    }),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, authors },
  prepare: ({ posts, authors }) => {
    const known = new Set(authors.map((a) => a.slug))
    for (const post of posts) {
      if (!known.has(post.author)) {
        throw new Error(
          `Post "${post.slug}" references unknown author "${post.author}". ` +
            `Known authors: ${[...known].join(', ') || '(none)'} — add content/authors/${post.author}.yml`,
        )
      }
    }
  },
  mdx: {
    // Heading ids, so `## Some heading` is linkable and the computed `toc`
    // anchors resolve.
    rehypePlugins: [rehypeSlug],
    // copyLinkedFiles (on by default) is what lets a post reference its own
    // images relatively — `![](./01.jpg)` is hashed into public/static like the
    // cover. It resolves *every* non-http target against the content directory,
    // though, so an internal page link written as `](/blog/foo)` fails the build
    // (ENOENT, or EISDIR once that post exists).
    //
    // Internal links are therefore written as absolute site URLs, which velite
    // leaves alone, and turned back into client-side routes by the `a` override
    // in components/mdx.tsx. Net effect: relative = an image in this folder,
    // absolute = a link.
  },
})
