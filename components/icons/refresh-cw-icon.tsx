import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai "AI Documentation Agent" section — card 3 (monitors product changes & feedback).
// Two circular sync arrows; reproduced from the site's Framer icon (id 2876127492).
export function RefreshCwIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 18 9 C 18 4.029 13.971 0 9 0 C 6.484 0.009 4.069 0.991 2.26 2.74 L 0 5" transform="translate(3 3)" />
      <path d="M 0 0 L 0 5 L 5 5" transform="translate(3 3)" />
      <path
        d="M 0 0 C 0 4.971 4.029 9 9 9 C 11.516 8.991 13.931 8.009 15.74 6.26 L 18 4"
        transform="translate(3 12)"
      />
      <path d="M 0 0 L 5 0 L 5 5" transform="translate(16 16)" />
    </svg>
  )
}
