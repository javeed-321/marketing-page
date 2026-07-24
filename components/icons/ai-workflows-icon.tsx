import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function AiWorkflowsIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      role="image"
      className={clsx('inline-block', className)}
      {...props}
    >
      <rect x="9" y="3" width="6" height="5" rx="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2.5" y="16" width="6" height="5" rx="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="15.5" y="16" width="6" height="5" rx="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8v5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 16v-3h13v3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
