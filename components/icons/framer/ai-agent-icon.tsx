import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai hero tab 6 — AI Agent (bot); also "In-editor AI agent" card.
// Exact reproduction of the site's Framer sprite (id 2780554075).
export function AiAgentIcon({ className, ...props }: ComponentProps<'svg'>) {
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
      <path d="M 4 4 L 4 0 L 0 0" transform="translate(8 4)" />
      <path d="M 2 12 C 0.895 12 0 11.105 0 10 L 0 2 C 0 0.895 0.895 0 2 0 L 14 0 C 15.105 0 16 0.895 16 2 L 16 10 C 16 11.105 15.105 12 14 12 Z" transform="translate(4 8)" />
      <path d="M 0 0 L 2 0" transform="translate(2 14)" />
      <path d="M 0 0 L 2 0" transform="translate(20 14)" />
      <path d="M 0 0 L 0 2" transform="translate(15 13)" />
      <path d="M 0 0 L 0 2" transform="translate(9 13)" />
    </svg>
  )
}
