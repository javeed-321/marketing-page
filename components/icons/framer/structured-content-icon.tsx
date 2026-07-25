import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai Built for AI — Structured content.
// Exact reproduction of the site's Framer sprite (id 2607534107).
export function StructuredContentIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 1 18 C 0.448 18 0 17.552 0 17 L 0 1 C 0 0.448 0.448 0 1 0 L 6 0 C 6.552 0 7 0.448 7 1 L 7 17 C 7 17.552 6.552 18 6 18 Z" transform="translate(3 3)" />
      <path d="M 1 7 C 0.448 7 0 6.552 0 6 L 0 1 C 0 0.448 0.448 0 1 0 L 6 0 C 6.552 0 7 0.448 7 1 L 7 6 C 7 6.552 6.552 7 6 7 Z" transform="translate(14 3)" />
      <path d="M 1 7 C 0.448 7 0 6.552 0 6 L 0 1 C 0 0.448 0.448 0 1 0 L 6 0 C 6.552 0 7 0.448 7 1 L 7 6 C 7 6.552 6.552 7 6 7 Z" transform="translate(14 14)" />
    </svg>
  )
}
