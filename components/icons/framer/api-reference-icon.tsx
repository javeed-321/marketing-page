import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai hero tab 2 — API Reference (code brackets).
// Exact reproduction of the site's Framer sprite (id 1912074499).
export function ApiReferenceIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 0 8 L 4 4 L 0 0" transform="translate(18 8)" />
      <path d="M 4 0 L 0 4 L 4 8" transform="translate(2 8)" />
      <path d="M 5 0 L 0 16" transform="translate(9.5 4)" />
    </svg>
  )
}
