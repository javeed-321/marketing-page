import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai Built for AI — MCP server.
// Exact reproduction of the site's Framer sprite (id 3684946077).
export function McpServerIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 2 8 C 0.895 8 0 7.105 0 6 L 0 2 C 0 0.895 0.895 0 2 0 L 18 0 C 19.105 0 20 0.895 20 2 L 20 6 C 20 7.105 19.105 8 18 8 Z" transform="translate(2 2)" />
      <path d="M 2 8 C 0.895 8 0 7.105 0 6 L 0 2 C 0 0.895 0.895 0 2 0 L 18 0 C 19.105 0 20 0.895 20 2 L 20 6 C 20 7.105 19.105 8 18 8 Z" transform="translate(2 14)" />
      <path d="M 0 0 L 0.01 0" transform="translate(6 6)" />
      <path d="M 0 0 L 0.01 0" transform="translate(6 18)" />
    </svg>
  )
}
