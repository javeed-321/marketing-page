import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai footer social — X.
// Exact reproduction of the site's Framer sprite (id svg9732032607).
export function SocialXIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="currentColor"
      role="image"
      className={clsx('inline-block', className)}
      {...props}
    >
      <path d="M 3.667 0.5 C 1.918 0.5 0.5 1.918 0.5 3.667 L 0.5 16.333 C 0.5 18.082 1.918 19.5 3.667 19.5 L 16.333 19.5 C 18.082 19.5 19.5 18.082 19.5 16.333 L 19.5 3.667 C 19.5 1.918 18.082 0.5 16.333 0.5 Z M 4.61 4.571 L 8.201 4.571 L 10.751 8.195 L 13.845 4.571 L 14.976 4.571 L 11.262 8.92 L 15.842 15.429 L 12.252 15.429 L 9.293 11.225 L 5.702 15.429 L 4.571 15.429 L 8.782 10.499 Z M 6.342 5.476 L 12.724 14.524 L 14.11 14.524 L 7.728 5.476 Z" />
    </svg>
  )
}
