import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai footer social — LinkedIn.
// Exact reproduction of the site's Framer sprite (id svg11540612870).
export function SocialLinkedInIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 18.096 0.5 C 18.871 0.5 19.5 1.11 19.5 1.861 L 19.5 18.14 C 19.5 18.891 18.871 19.5 18.096 19.5 L 1.904 19.5 C 1.129 19.5 0.5 18.891 0.5 18.14 L 0.5 1.861 C 0.5 1.11 1.129 0.5 1.904 0.5 Z M 3.43 16.4 L 6.274 16.4 L 6.274 7.846 L 3.43 7.846 Z M 13.253 7.646 C 11.745 7.646 11.069 8.475 10.691 9.058 L 10.691 7.847 L 7.848 7.847 C 7.885 8.648 7.848 16.334 7.848 16.4 L 10.691 16.4 L 10.691 11.624 C 10.691 11.369 10.709 11.113 10.784 10.93 C 10.989 10.419 11.457 9.891 12.243 9.891 C 13.271 9.891 13.683 10.675 13.683 11.825 L 13.683 16.4 L 16.527 16.4 L 16.527 11.496 C 16.527 8.869 15.123 7.646 13.253 7.646 Z M 4.872 3.723 C 3.899 3.723 3.264 4.361 3.263 5.201 C 3.263 6.021 3.881 6.679 4.835 6.679 L 4.853 6.679 C 5.844 6.679 6.462 6.021 6.462 5.201 C 6.443 4.361 5.844 3.723 4.872 3.723 Z" />
    </svg>
  )
}
