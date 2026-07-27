import type { ReactNode } from 'react'

import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { MinusIcon } from '@/components/icons/minus-icon'

/**
 * Pros & Cons — custom component.
 *
 * Tailwind Plus has no pros/cons block, so this is written to the site's own
 * tokens (mauve/card/red) rather than pasted from the kit. Two headed columns of
 * bullets, checkmarks on the left and minuses on the right; stacks below sm.
 */
export function ProsConsTwoColumn({
  heading,
  pros,
  cons,
  prosLabel = 'Pros',
  consLabel = 'Cons',
}: {
  heading?: ReactNode
  pros: string[]
  cons: string[]
  prosLabel?: string
  consLabel?: string
}) {
  return (
    <div className="flex flex-col gap-6">
      {heading && (
        <h2 className="font-display text-2xl/8 font-medium tracking-[-0.02em] text-mauve-950 dark:text-white">
          {heading}
        </h2>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-2xl bg-card p-6 dark:bg-white/5">
          <h3 className="text-sm/5 font-semibold text-mauve-950 dark:text-white">{prosLabel}</h3>
          <ul role="list" className="flex flex-col gap-3">
            {pros.map((item) => (
              <li key={item} className="flex gap-3 text-sm/5 text-mauve-700 dark:text-mauve-400">
                <CheckmarkIcon aria-hidden="true" className="mt-1 size-3.5 shrink-0 stroke-red-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-card p-6 dark:bg-white/5">
          <h3 className="text-sm/5 font-semibold text-mauve-950 dark:text-white">{consLabel}</h3>
          <ul role="list" className="flex flex-col gap-3">
            {cons.map((item) => (
              <li key={item} className="flex gap-3 text-sm/5 text-mauve-700 dark:text-mauve-400">
                <MinusIcon aria-hidden="true" className="mt-1 size-3.5 shrink-0 stroke-mauve-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
