import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

// documentation.ai "AI Documentation Agent" section — card 2 (complements any coding agent via MCP).
// Folder with a magnifying glass; reproduced from the site's Framer icon (id 381018789).
export function FolderSearchIcon({ className, ...props }: ComponentProps<'svg'>) {
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
        d="M 0 2 C 0 0.895 0.895 0 2 0 C 3.105 0 4 0.895 4 2 C 4 3.105 3.105 4 2 4 C 0.895 4 0 3.105 0 2 Z"
        transform="translate(14 18)"
      />
      <path
        d="M 8 17 L 2 17 C 0.895 17 0 16.105 0 15 L 0 2 C 0 0.896 0.895 0 2 0 L 5.9 0 C 6.58 -0.007 7.216 0.332 7.59 0.9 L 8.4 2.1 C 8.77 2.662 9.397 3 10.07 3 L 18 3 C 19.105 3 20 3.896 20 5 L 20 7"
        transform="translate(2 3)"
      />
      <path d="M 4.5 0 L 0 4.5" transform="translate(17.5 14)" />
      <path d="M 0 0 L 1 1" transform="translate(21 15)" />
    </svg>
  )
}
