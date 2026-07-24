import { ElTabGroup, ElTabList, ElTabPanels } from '@tailwindplus/elements/react'

import { AiWorkflowsIcon } from '@/components/icons/ai-workflows-icon'
import { BookOpenIcon } from '@/components/icons/book-open-icon'
import { ClockIcon } from '@/components/icons/clock-icon'
import { CodeSquareIcon } from '@/components/icons/code-square-icon'
import { CpuIcon } from '@/components/icons/cpu-icon'
import { DocumentIcon } from '@/components/icons/document-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'

const TABS = [
  { label: 'Product Guides', Icon: BookOpenIcon, src: '/img/tabs/product-guides.avif' },
  { label: 'API Reference', Icon: CodeSquareIcon, src: '/img/tabs/api-reference.png' },
  { label: 'Help Center', Icon: DocumentIcon, src: '/img/tabs/help-center.avif' },
  { label: 'Changelog', Icon: ClockIcon, src: '/img/tabs/changelog.avif' },
  { label: 'AI Assistant', Icon: SparklesIcon, src: '/img/tabs/ai-assistant.png' },
  { label: 'AI Agent', Icon: CpuIcon, src: '/img/tabs/ai-agent.avif' },
  { label: 'AI Workflows', Icon: AiWorkflowsIcon, src: '/img/tabs/ai-workflows.avif' },
]

export function ProductTabs() {
  return (
    <ElTabGroup className="flex w-full flex-col items-center">
      {/* Tab bar — native template tabs; the web component toggles aria-selected + panels */}
      <div className="max-w-full overflow-x-auto">
        <ElTabList className="flex gap-1 rounded-full bg-mauve-950/5 p-1 dark:bg-white/5">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap text-mauve-500 transition-colors hover:text-mauve-950 aria-selected:bg-white aria-selected:text-mauve-950 aria-selected:shadow-sm dark:text-mauve-400 dark:hover:text-white dark:aria-selected:bg-mauve-800 dark:aria-selected:text-white"
            >
              <tab.Icon className="size-4" />
              {tab.label}
            </button>
          ))}
        </ElTabList>
      </div>

      {/* Panels — one per tab, matched by order */}
      <ElTabPanels className="mt-8 w-full">
        {TABS.map((tab) => (
          <div
            key={tab.label}
            className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-mauve-950/10 dark:ring-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- local asset; keeps it simple, no next/image sizing */}
            <img src={tab.src} alt={`${tab.label} screenshot`} className="block w-full" />
          </div>
        ))}
      </ElTabPanels>
    </ElTabGroup>
  )
}
