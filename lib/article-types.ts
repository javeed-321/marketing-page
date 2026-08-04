/**
 * Shared prop types for the article blocks.
 *
 * These live outside `lib/posts.ts` because they describe *rendering*, not
 * content storage. Post bodies are MDX now — the blocks are invoked as tags
 * from inside `content/blog/<slug>/index.mdx` (see `components/mdx-blocks.tsx`)
 * — so nothing about them depends on where posts come from.
 */

/** A bullet that may carry a bold lead-in term, as the live listicles do. */
export type TermItem = string | { term: string; desc: string }

/** A pricing line: free text, or a named tier with its detail. */
export type PricingItem = string | { name: string; detail: string }

/** An inline article screenshot. Nearly every H3 in a comparison post has one. */
export type PostImageRef = { src: string; alt: string; caption?: string }
