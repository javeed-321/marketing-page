import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai hero tab 4 — Changelog (history clock).
// Exact reproduction of the site's Framer sprite (id 1965149704).
export function ChangelogIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="image"
      className={clsx('inline-block', className)}
      {...props}
    >
      <path d="M 0 9 C 0 13.971 4.029 18 9 18 C 13.971 18 18 13.971 18 9 C 18 4.029 13.971 0 9 0 C 6.484 0.009 4.069 0.991 2.26 2.74 L 0 5" transform="translate(3 3)" />
      <path d="M 0 0 L 0 5 L 5 5" transform="translate(3 3)" />
      <path d="M 0 0 L 0 5 L 4 7" transform="translate(12 7)" />
    </svg>
  )
}
