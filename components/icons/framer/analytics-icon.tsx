import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai Publishing — Analytics.
// Exact reproduction of the site's Framer sprite (id 3606813188).
export function AnalyticsIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 0 0 L 0 16 C 0 17.105 0.895 18 2 18 L 18 18" transform="translate(3 3)" />
      <path d="M 0 8 L 0 0" transform="translate(18 9)" />
      <path d="M 0 12 L 0 0" transform="translate(13 5)" />
      <path d="M 0 3 L 0 0" transform="translate(8 14)" />
    </svg>
  )
}
