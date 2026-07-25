import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai More Reasons — Feedback.
// Exact reproduction of the site's Framer sprite (id 3251150059).
export function FeedbackIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 0 0 L 0 12" transform="translate(7 10)" />
      <path d="M 13 3.88 L 12 8 L 17.83 8 C 18.46 8 19.052 8.296 19.43 8.8 C 19.808 9.304 19.926 9.956 19.75 10.56 L 17.42 18.56 C 17.171 19.413 16.389 20 15.5 20 L 2 20 C 0.895 20 0 19.105 0 18 L 0 10 C 0 8.895 0.895 8 2 8 L 4.76 8 C 5.519 8 6.212 7.57 6.55 6.89 L 10 0 C 10.955 0.012 11.853 0.459 12.437 1.215 C 13.022 1.971 13.229 2.952 13 3.88 Z" transform="translate(2 2)" />
    </svg>
  )
}
