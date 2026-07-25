import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai hero tab 1 — Product Guides (book-open).
// Exact reproduction of the site's Framer sprite (id 1915311583).
export function ProductGuidesIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 0 0 L 0 14" transform="translate(12 7)" />
      <path d="M 1 15 C 0.448 15 0 14.552 0 14 L 0 1 C 0 0.448 0.448 0 1 0 L 6 0 C 8.209 0 10 1.791 10 4 C 10 1.791 11.791 0 14 0 L 19 0 C 19.552 0 20 0.448 20 1 L 20 14 C 20 14.552 19.552 15 19 15 L 13 15 C 11.343 15 10 16.343 10 18 C 10 16.343 8.657 15 7 15 Z" transform="translate(2 3)" />
    </svg>
  )
}
