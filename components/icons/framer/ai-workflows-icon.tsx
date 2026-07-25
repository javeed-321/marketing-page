import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai hero tab 7 — AI Workflows (org chart).
// Exact reproduction of the site's Framer sprite (id 1916995349).
export function AiWorkflowsIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 1 6 C 0.448 6 0 5.552 0 5 L 0 1 C 0 0.448 0.448 0 1 0 L 5 0 C 5.552 0 6 0.448 6 1 L 6 5 C 6 5.552 5.552 6 5 6 Z" transform="translate(16 16)" />
      <path d="M 1 6 C 0.448 6 0 5.552 0 5 L 0 1 C 0 0.448 0.448 0 1 0 L 5 0 C 5.552 0 6 0.448 6 1 L 6 5 C 6 5.552 5.552 6 5 6 Z" transform="translate(2 16)" />
      <path d="M 1 6 C 0.448 6 0 5.552 0 5 L 0 1 C 0 0.448 0.448 0 1 0 L 5 0 C 5.552 0 6 0.448 6 1 L 6 5 C 6 5.552 5.552 6 5 6 Z" transform="translate(9 2)" />
      <path d="M 0 4 L 0 1 C 0 0.448 0.448 0 1 0 L 13 0 C 13.552 0 14 0.448 14 1 L 14 4" transform="translate(5 12)" />
      <path d="M 0 4 L 0 0" transform="translate(12 8)" />
    </svg>
  )
}
