import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai footer social — YouTube.
// Exact reproduction of the site's Framer sprite (id svg-338188623_774).
export function SocialYouTubeIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      width={22}
      height={17}
      viewBox="0 0 22 17"
      fill="currentColor"
      role="image"
      className={clsx('inline-block', className)}
      {...props}
    >
      <path d="M 21.385 2.922 C 21.182 1.753 20.214 0.903 19.089 0.638 C 17.406 0.266 14.292 0 10.922 0 C 7.555 0 4.391 0.266 2.706 0.638 C 1.583 0.903 0.612 1.7 0.409 2.922 C 0.203 4.25 0 6.109 0 8.5 C 0 10.891 0.203 12.75 0.458 14.078 C 0.664 15.247 1.633 16.097 2.755 16.363 C 4.542 16.734 7.604 17 10.974 17 C 14.344 17 17.406 16.734 19.193 16.363 C 20.315 16.097 21.284 15.3 21.49 14.078 C 21.693 12.75 21.948 10.836 22 8.5 C 21.896 6.109 21.641 4.25 21.385 2.922 Z M 9.081 12.219 L 9.081 4.781 L 15.308 8.5 Z" />
    </svg>
  )
}
