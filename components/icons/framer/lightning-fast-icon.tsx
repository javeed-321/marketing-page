import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai More Reasons — Lightning Fast.
// Exact reproduction of the site's Framer sprite (id 4251929840).
export function LightningFastIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 13.621 0.68 C 9.213 -1.033 4.208 0.577 1.624 4.538 C -0.959 8.499 -0.415 13.728 2.929 17.072 C 6.273 20.416 11.502 20.96 15.463 18.377 C 19.424 15.793 21.034 10.788 19.321 6.38" transform="translate(1.979 2.02)" />
      <path d="M 0 2 C 0 0.895 0.895 0 2 0 C 3.105 0 4 0.895 4 2 C 4 3.105 3.105 4 2 4 C 0.895 4 0 3.105 0 2 Z" transform="translate(10 10)" />
      <path d="M 0 5.6 L 5.6 0" transform="translate(13.4 5)" />
    </svg>
  )
}
