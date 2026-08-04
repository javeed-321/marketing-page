import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

/**
 * Tailwind Plus "Two row bento grid" — structure kept verbatim.
 *
 * Unchanged from the block: the `lg:grid-cols-6 lg:grid-rows-2` grid, the
 * 4/2/2/4 column spans, the `flex p-px` cell wrapper, the `h-80 object-cover`
 * image well, the `p-10` text well, and the per-cell `rounded-[2rem]` outer
 * corners. Cell order is fixed because the corner rounding depends on position.
 *
 * Changed: colours mapped to this site's tokens (gray-50 → card, gray-900 →
 * mauve-950, gray-600 → mauve-700, gray-500 → mauve-500, indigo-600 → red-500),
 * and two Tailwind v3 → v4 corrections — `outline outline-1` → `outline-1`
 * (v4 implies outline-style once a width is set) and `shadow` → `shadow-sm`
 * (v4 renamed the shadow scale a step down).
 */

export type BentoTwoRowCell = {
  /** Small label above the title. Omit to hide it. */
  eyebrow?: string
  title: string
  desc: string
  img: string
  /** The block anchors the wide cells' art to the left edge. */
  objectLeft?: boolean
}

// Position-dependent: spans and outer corners are what make the 2×2 block read
// as one rounded slab, so they travel together.
const CELLS = [
  { span: 'lg:col-span-4', corner: 'max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]' },
  { span: 'lg:col-span-2', corner: 'lg:rounded-tr-[2rem]' },
  { span: 'lg:col-span-2', corner: 'lg:rounded-bl-[2rem]' },
  { span: 'lg:col-span-4', corner: 'max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]' },
]

export function BentoTwoRow({
  eyebrow,
  headline,
  cells,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  /** Exactly four, in grid order — spans and corners are positional. */
  cells: [BentoTwoRowCell, BentoTwoRowCell, BentoTwoRowCell, BentoTwoRowCell]
} & Omit<ComponentProps<'div'>, 'children'>) {
  return (
    <div className={clsx('bg-card py-24 sm:py-32 dark:bg-white/5', className)} {...props}>
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        {eyebrow && <h2 className="text-base/7 font-semibold text-red-500">{eyebrow}</h2>}
        <p className="mt-2 max-w-lg font-display text-4xl font-semibold tracking-tight text-pretty text-mauve-950 sm:text-5xl dark:text-white">
          {headline}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {cells.map((cell, i) => (
            <div key={cell.title} className={clsx('flex p-px', CELLS[i].span)}>
              <div
                className={clsx(
                  'w-full overflow-hidden rounded-lg bg-white shadow-sm outline-1 outline-black/5 dark:bg-mauve-950 dark:outline-white/10',
                  CELLS[i].corner,
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- art is pre-sized and decorative */}
                <img
                  alt=""
                  src={cell.img}
                  className={clsx('h-80 w-full object-cover', cell.objectLeft && 'object-left')}
                />
                <div className="p-10">
                  {cell.eyebrow && <h3 className="text-sm/4 font-semibold text-mauve-500">{cell.eyebrow}</h3>}
                  <p className="mt-2 font-display text-lg font-medium tracking-tight text-mauve-950 dark:text-white">
                    {cell.title}
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-mauve-700 dark:text-mauve-400">{cell.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
