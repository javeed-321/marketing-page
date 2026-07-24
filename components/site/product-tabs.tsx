import { ElTabGroup, ElTabList, ElTabPanels } from '@tailwindplus/elements/react'

import { AiWorkflowsIcon } from '@/components/icons/ai-workflows-icon'
import { BookIcon } from '@/components/icons/book-icon'
import { BookOpenIcon } from '@/components/icons/book-open-icon'
import { ClockIcon } from '@/components/icons/clock-icon'
import { CodeSquareIcon } from '@/components/icons/code-square-icon'
import { CpuIcon } from '@/components/icons/cpu-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'

const TABS = [
  { label: 'Product Guides', Icon: BookOpenIcon, src: '/img/tabs/product-guides.avif' },
  { label: 'API Reference', Icon: CodeSquareIcon, src: '/img/tabs/api-reference.png' },
  { label: 'Help Center', Icon: BookIcon, src: '/img/tabs/help-center.avif' },
  { label: 'Changelog', Icon: ClockIcon, src: '/img/tabs/changelog.avif' },
  { label: 'AI Assistant', Icon: SparklesIcon, src: '/img/tabs/ai-assistant.png' },
  { label: 'AI Agent', Icon: CpuIcon, src: '/img/tabs/ai-agent.avif' },
  { label: 'AI Workflows', Icon: AiWorkflowsIcon, src: '/img/tabs/ai-workflows.avif' },
]

export function ProductTabs() {
  return (
    <ElTabGroup className="flex w-full flex-col items-center gap-8 rounded-3xl bg-mauve-950/2.5 p-4 ring-1 ring-mauve-950/5 sm:p-6 dark:bg-white/5 dark:ring-white/10">
      {/* Tab bar — below xl only the selected tab shows its label; tab 0 is pre-selected in SSR markup so there is no hydration flash */}
      <div className="max-w-full overflow-x-auto">
        <ElTabList role="tablist" className="flex gap-1">
          {TABS.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={index === 0}
              tabIndex={index === 0 ? 0 : -1}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap text-mauve-500 transition-colors hover:text-mauve-950 aria-selected:bg-white aria-selected:text-mauve-950 aria-selected:shadow-sm xl:px-4 dark:text-mauve-400 dark:hover:text-white dark:aria-selected:bg-mauve-800 dark:aria-selected:text-white"
            >
              <tab.Icon className="size-4" />
              <span className="hidden group-aria-selected:inline xl:inline">{tab.label}</span>
            </button>
          ))}
        </ElTabList>
      </div>

      {/* Panels — one per tab, matched by order; panels 1..n start hidden to match the pre-selected tab */}
      <ElTabPanels className="block w-full">
        {TABS.map((tab, index) => (
          <div
            key={tab.label}
            hidden={index !== 0}
            className="overflow-hidden rounded-2xl mask-[linear-gradient(to_bottom,#000_70%,transparent)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- local asset; keeps it simple, no next/image sizing */}
            <img src={tab.src} alt={`${tab.label} screenshot`} className="block w-full" />
          </div>
        ))}
      </ElTabPanels>
    </ElTabGroup>
  )
}
