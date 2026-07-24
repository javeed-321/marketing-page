import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// Lucide `book` — matches the closed-book icon used on documentation.ai's Help Center tab
export function BookIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2}
      role="image"
      className={clsx('inline-block', className)}
      {...props}
    >
      <path
        d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
