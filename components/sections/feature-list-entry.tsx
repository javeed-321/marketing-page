import type { ReactNode } from 'react'

import { CheckmarkIcon } from '@/components/icons/checkmark-icon'

/**
 * One entry in a listicle post ("7 Best GitBook Alternatives"), repeated per tool.
 *
 * Custom component: item 3 of the block list came through blank, and our nearest
 * kit block (`features-stacked-alternating-with-demos`) requires a `demo` node and
 * gives it half the width — these entries have no screenshots, so half the block
 * would render empty. Written to the site's own tokens.
 *
 * Shape mirrors documentation.ai's listicle entries exactly:
 * heading → intro → Key Features → "Use X if…" → pricing → Verdict.
 */
export function FeatureListEntry({
  heading,
  intro,
  keyFeatures,
  useIf,
  pricing,
  verdict,
}: {
  heading: ReactNode
  intro?: string
  keyFeatures: string[]
  useIf?: string
  pricing?: string[]
  verdict?: string
}) {
  return (
    <div className="flex flex-col gap-5 border-t border-card-border py-8 dark:border-white/10">
      <h3 className="font-display text-xl/7 font-medium tracking-[-0.02em] text-mauve-950 dark:text-white">
        {heading}
      </h3>

      {intro && <p className="text-base/7 text-mauve-700 dark:text-mauve-400">{intro}</p>}

      <div className="flex flex-col gap-3">
        <p className="text-sm/5 font-semibold text-mauve-950 dark:text-white">Key features</p>
        <ul role="list" className="flex flex-col gap-2">
          {keyFeatures.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm/5 text-mauve-700 dark:text-mauve-400">
              <CheckmarkIcon aria-hidden="true" className="mt-1 size-3.5 shrink-0 stroke-red-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {useIf && (
        <p className="text-sm/5 text-mauve-700 dark:text-mauve-400">
          <span className="font-semibold text-mauve-950 dark:text-white">Use it if</span> {useIf}
        </p>
      )}

      {pricing && pricing.length > 0 && (
        <p className="text-sm/5 text-mauve-700 dark:text-mauve-400">
          <span className="font-semibold text-mauve-950 dark:text-white">Pricing</span> {pricing.join(' · ')}
        </p>
      )}

      {verdict && (
        <p className="border-l-2 border-red-500 pl-4 text-sm/5 text-mauve-800 italic dark:text-mauve-300">{verdict}</p>
      )}
    </div>
  )
}
