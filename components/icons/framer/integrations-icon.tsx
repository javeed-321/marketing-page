import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai Publishing — Integrations.
// Exact reproduction of the site's Framer sprite (id 1324862506).
export function IntegrationsIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 9 0 L 9 17 C 9 17.552 8.552 18 8 18 L 2 18 C 0.895 18 0 17.105 0 16 L 0 2 C 0 0.895 0.895 0 2 0 L 16 0 C 17.105 0 18 0.895 18 2 L 18 8 C 18 8.552 17.552 9 17 9 L 0 9" transform="translate(3 3)" />
      <path d="M 0 0 L 6 0" transform="translate(16 19)" />
      <path d="M 0 6 L 0 0" transform="translate(19 16)" />
    </svg>
  )
}
