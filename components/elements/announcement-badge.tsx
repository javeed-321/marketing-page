import Link from 'next/link'

import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

export function AnnouncementBadge({
  text,
  href,
  className,
  ...props
}: {
  text: ReactNode
  href?: string
} & Omit<ComponentProps<'a'>, 'href' | 'children'>) {
  const classes = clsx(
    // Geist Mono 12px — matches the original badge (Framer: 12px mono, +0.01em).
    // Radius is responsive like the template's: `rounded-full` clamps to half the box
    // height, so once the text wraps to two lines a pill turns into a 26px-radius oval.
    // Below sm — where wrapping starts — it is a rectangle instead, with looser padding.
    'inline-flex max-w-full items-center gap-x-2 rounded-md bg-red-500/10 px-3.5 py-2 font-mono text-xs/[18px] tracking-[0.01em] text-mauve-950 sm:rounded-full sm:px-3 sm:py-1.5 dark:text-white',
    href && 'transition-colors hover:bg-red-500/15',
    className,
  )

  const content = (
    <>
      <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-red-500" />
      {/* Wraps on mobile, single-line from sm up — the template's behaviour. Plain
        * `truncate` sets white-space:nowrap, whose min-content width becomes the whole
        * string; that floors the flex item's `min-width:auto` and overrides max-w-full,
        * stretching the hero column past the viewport (Main's overflow-clip then cuts it). */}
      <span className="text-pretty sm:truncate">{text}</span>
    </>
  )

  if (!href) return <span className={classes}>{content}</span>

  return (
    <Link href={href} {...props} className={classes}>
      {content}
    </Link>
  )
}
