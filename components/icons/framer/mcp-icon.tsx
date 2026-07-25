import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai More Reasons — Model Context Protocol (MCP).
// Exact reproduction of the site's Framer sprite (id 1020840647).
export function McpIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 0 6.35 L 0 2 C 0 0.896 0.895 0 2 0 L 5.9 0 C 6.58 -0.007 7.216 0.332 7.59 0.9 L 8.4 2.1 C 8.77 2.662 9.397 3 10.07 3 L 18 3 C 19.105 3 20 3.896 20 5 L 20 15 C 20 16.105 19.105 17 18 17 L 2 17 C 0.895 17 0 16.105 0 15 L 0 12 C 0 10.896 0.895 10 2 10 L 9 10" transform="translate(2 3)" />
      <path d="M 0 6 L 3 3 L 0 0" transform="translate(8 10)" />
    </svg>
  )
}
