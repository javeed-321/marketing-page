import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai hero tab 3 — Help Center (book).
// Exact reproduction of the site's Framer sprite (id 3400433898).
export function HelpCenterIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 0 17.5 L 0 2.5 C 0 1.119 1.119 0 2.5 0 L 15 0 C 15.552 0 16 0.448 16 1 L 16 19 C 16 19.552 15.552 20 15 20 L 2.5 20 C 1.119 20 0 18.881 0 17.5 C 0 16.119 1.119 15 2.5 15 L 16 15" transform="translate(4 2)" />
    </svg>
  )
}
