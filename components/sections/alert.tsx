import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import type { ReactNode } from 'react'

/**
 * Tailwind Plus "Application UI — Alerts (with accent border)", used verbatim.
 *
 * Two changes from the shipped source, both forced rather than stylistic:
 *  - the hardcoded copy became a `children` slot
 *  - the inner `<p>` became a `<div>`, because a TL;DR carries a `<ul>` and a
 *    list is not valid inside a paragraph
 * Every class name is exactly as pasted — do not retokenize to mauve/card.
 */
export function Alert({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
      <div className="flex">
        <div className="shrink-0">
          <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <div className="text-sm text-yellow-700">{children}</div>
        </div>
      </div>
    </div>
  )
}
