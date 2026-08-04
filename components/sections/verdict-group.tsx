import type { ReactNode } from 'react'

import { PostImage } from './post-image'

/**
 * Verdict group — custom component.
 *
 * The backbone of every `x-vs-y` post on documentation.ai, and roughly 60% of a
 * comparison article: one H2 question ("Which is easier to set up, Document360
 * or Mintlify?"), one H3 per product answering it — each usually followed by a
 * screenshot — then a bold verdict lead-in closing the section.
 *
 * Deliberately *not* a two-column card layout. The live posts run the products
 * sequentially down a single narrow column so each one can carry a full-width
 * screenshot underneath it, and the verdict reads as a sentence in the flow
 * rather than a callout. Side-by-side panels would break both.
 *
 * Written to the site's own tokens; the heading sizes match `Document`'s
 * `variant="article"` h2/h3 so a verdict group and a prose section are
 * indistinguishable in the body rhythm.
 */
export function VerdictGroup({
  heading,
  sides,
  verdictLabel = 'Verdict',
  verdict,
}: {
  heading: ReactNode
  sides: { label: string; paragraphs: string[]; image?: { src: string; alt: string; caption?: string } }[]
  verdictLabel?: string
  verdict: string
}) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-display text-2xl/8 font-medium tracking-[-0.02em] text-mauve-950 dark:text-white">
        {heading}
      </h2>

      {sides.map((side) => (
        <div key={side.label} className="flex flex-col gap-4">
          <h3 className="font-display text-lg/7 font-medium text-mauve-950 dark:text-white">{side.label}</h3>
          {side.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base/7 text-mauve-700 dark:text-mauve-400">
              {paragraph}
            </p>
          ))}
          {side.image && (
            <PostImage src={side.image.src} alt={side.image.alt} caption={side.image.caption} />
          )}
        </div>
      ))}

      <p className="text-base/7 text-mauve-700 dark:text-mauve-400">
        <strong className="font-semibold text-mauve-950 dark:text-white">{verdictLabel}:</strong> {verdict}
      </p>
    </div>
  )
}
