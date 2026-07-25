import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai "AI Documentation Agent" section — card 1 (AI-assisted updates in the web editor).
// Two connected panels; reproduced from the site's Framer icon (id 509073874).
export function WorkflowIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path
        d="M 2 8 C 0.895 8 0 7.105 0 6 L 0 2 C 0 0.895 0.895 0 2 0 L 6 0 C 7.105 0 8 0.895 8 2 L 8 6 C 8 7.105 7.105 8 6 8 Z"
        transform="translate(14 14)"
      />
      <path
        d="M 2 8 C 0.895 8 0 7.105 0 6 L 0 2 C 0 0.895 0.895 0 2 0 L 6 0 C 7.105 0 8 0.895 8 2 L 8 6 C 8 7.105 7.105 8 6 8 Z"
        transform="translate(2 2)"
      />
      <path d="M 0 0 L 0 1 C 0 2.105 0.895 3 2 3 L 3 3" transform="translate(7 14)" />
      <path d="M 0 0 L 1 0 C 2.105 0 3 0.895 3 2 L 3 3" transform="translate(14 7)" />
    </svg>
  )
}
