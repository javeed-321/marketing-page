import Link from 'next/link'

import { ElDropdown, ElMenu } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'

const GROUPS: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: 'By Teams',
    items: [
      { label: 'For Product Owners', href: '#' },
      { label: 'For Developers', href: '#' },
      { label: 'For Support Teams', href: '#' },
    ],
  },
  {
    title: 'By Use Case',
    items: [
      { label: 'Developer Documentation', href: '#' },
      { label: 'Knowledge Base', href: '#' },
      { label: 'Product Documentation', href: '#' },
    ],
  },
]

export function SolutionsMenu() {
  return (
    <ElDropdown className="contents">
      <button
        type="button"
        className="group inline-flex items-center gap-2 text-3xl/10 font-medium text-mauve-950 lg:text-sm/7 dark:text-white"
      >
        Solutions
        <svg
          viewBox="0 0 12 12"
          fill="currentColor"
          aria-hidden="true"
          className="size-3 transition-transform group-aria-expanded:rotate-180"
        >
          <path d="M3.22 4.47a.75.75 0 0 1 1.06 0L6 6.19l1.72-1.72a.75.75 0 1 1 1.06 1.06L6.53 7.78a.75.75 0 0 1-1.06 0L3.22 5.53a.75.75 0 0 1 0-1.06Z" />
        </svg>
      </button>

      <ElMenu
        anchor="bottom start"
        popover="auto"
        className="m-0 w-64 rounded-2xl bg-white p-3 shadow-lg ring-1 ring-mauve-950/5 [--anchor-gap:0.5rem] dark:bg-mauve-900 dark:ring-white/10"
      >
        {GROUPS.map((group) => (
          <div key={group.title} className="py-1 first:pt-1 last:pb-1">
            <p className="px-2 pt-1 pb-1.5 text-xs font-medium text-mauve-500 dark:text-mauve-400">{group.title}</p>
            {group.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={clsx(
                  'block rounded-lg px-2 py-1.5 text-sm font-medium text-mauve-950 hover:bg-mauve-950/5',
                  'dark:text-white dark:hover:bg-white/10',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </ElMenu>
    </ElDropdown>
  )
}
