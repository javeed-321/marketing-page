/**
 * Placeholder blog data.
 *
 * Two dummy posts defined inline so the /blog routes render without any content
 * pipeline. Swap this module for a real data source later — the pages only use
 * the exported functions below, not the array itself.
 */

export type Section = {
  heading?: string
  paragraphs: string[]
}

export type Post = {
  slug: string
  permalink: string
  title: string
  description: string
  excerpt: string
  date: string
  lastUpdated?: string
  author: string
  tags: string[]
  cover?: string
  readingTime: number
  wordCount: number
  sections: Section[]
}

export type Author = {
  slug: string
  permalink: string
  name: string
  role?: string
  bio?: string
  avatar?: string
  url?: string
  linkedin?: string
  twitter?: string
  knowsAbout?: string[]
}

const authors: Author[] = [
  {
    slug: 'roopreddy',
    permalink: '/blog/authors/roopreddy',
    name: 'Roop Reddy',
    role: 'Co-Founder, Documentation.AI',
    bio: 'Building Documentation.AI — the AI-native documentation and knowledge platform. Writes about documentation workflows, docs-as-code, and AI-native content.',
    knowsAbout: ['Documentation workflows', 'Docs-as-code', 'AI-native content'],
  },
]

const posts: Post[] = [
  {
    slug: 'writing-docs-that-stay-current',
    permalink: '/blog/writing-docs-that-stay-current',
    title: 'Writing Docs That Stay Current',
    description:
      'A placeholder post. Documentation drifts the moment it ships — here is how teams keep it aligned with the product without doubling their workload.',
    excerpt:
      'Documentation drifts the moment it ships. This placeholder post sketches how teams keep docs aligned with the product without doubling their workload.',
    date: '2026-07-14',
    lastUpdated: '2026-07-21',
    author: 'roopreddy',
    tags: ['Workflows'],
    cover: '/img/photos/1.webp',
    readingTime: 6,
    wordCount: 1180,
    sections: [
      {
        paragraphs: [
          'This is placeholder copy. Every sentence here exists so the layout can be reviewed with realistic line lengths, paragraph rhythm, and heading spacing before real content arrives.',
          'Replace this post once the content source is decided. Nothing on this page is fetched — the text lives in lib/posts.ts.',
        ],
      },
      {
        heading: 'Why documentation drifts',
        paragraphs: [
          'Product surfaces change faster than the pages describing them. The gap opens quietly: a renamed field here, a removed setting there, and within a quarter the guide is quietly wrong.',
          'The fix is rarely more writing. It is shorter feedback loops between the people changing the product and the pages describing it.',
        ],
      },
      {
        heading: 'What good looks like',
        paragraphs: [
          'Teams that keep docs current treat them as part of the change, not a follow-up task. The page moves in the same review as the code.',
          'That only works when publishing is cheap. If updating a page takes a ticket and a handoff, it will not happen at the speed the product moves.',
        ],
      },
    ],
  },
  {
    slug: 'structuring-a-knowledge-base',
    permalink: '/blog/structuring-a-knowledge-base',
    title: 'Structuring a Knowledge Base People Actually Use',
    description:
      'A placeholder post. Most knowledge bases fail on navigation rather than content — a look at the structures that hold up as the library grows.',
    excerpt:
      'Most knowledge bases fail on navigation, not content. This placeholder post looks at the structures that hold up as the library grows past a hundred pages.',
    date: '2026-06-28',
    author: 'roopreddy',
    tags: ['Knowledge Base'],
    cover: '/img/photos/1.webp',
    readingTime: 4,
    wordCount: 820,
    sections: [
      {
        paragraphs: [
          'This is placeholder copy used to check the reading experience at a shorter length than the first post.',
          'Both posts are defined in the same file and render through the same template.',
        ],
      },
      {
        heading: 'Navigation is the product',
        paragraphs: [
          'Readers do not browse a knowledge base; they arrive mid-way through it from a search result and look for a single answer.',
          'Structure should therefore optimise for orientation — where am I, what is next — rather than for a tidy table of contents nobody opens.',
        ],
      },
      {
        heading: 'Growing past a hundred pages',
        paragraphs: [
          'Flat structures work until they do not. The failure point is usually the moment two sections could plausibly hold the same page.',
          'At that point the taxonomy needs a rule, not a judgement call, or every future page becomes a small debate.',
        ],
      },
    ],
  },
]

export function getPublishedPosts(): Post[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAuthors(): Author[] {
  return [...authors]
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug)
}

export function getAuthorForPost(post: Post): Author {
  const author = getAuthorBySlug(post.author)
  if (!author) throw new Error(`Unknown author "${post.author}" in post "${post.slug}"`)
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
