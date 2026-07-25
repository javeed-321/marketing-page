import { ElTabGroup, ElTabList, ElTabPanels } from '@tailwindplus/elements/react'

import { AiAgentIcon } from '@/components/icons/framer/ai-agent-icon'
import { AiAssistantIcon } from '@/components/icons/framer/ai-assistant-icon'
import { AiWorkflowsIcon } from '@/components/icons/framer/ai-workflows-icon'
import { ApiReferenceIcon } from '@/components/icons/framer/api-reference-icon'
import { ChangelogIcon } from '@/components/icons/framer/changelog-icon'
import { HelpCenterIcon } from '@/components/icons/framer/help-center-icon'
import { ProductGuidesIcon } from '@/components/icons/framer/product-guides-icon'

const TABS = [
  { label: 'Product Guides', Icon: ProductGuidesIcon, src: '/img/tabs/product-guides.avif' },
  { label: 'API Reference', Icon: ApiReferenceIcon, src: '/img/tabs/api-reference.png' },
  { label: 'Help Center', Icon: HelpCenterIcon, src: '/img/tabs/help-center.avif' },
  { label: 'Changelog', Icon: ChangelogIcon, src: '/img/tabs/changelog.avif' },
  { label: 'AI Assistant', Icon: AiAssistantIcon, src: '/img/tabs/ai-assistant.png' },
  { label: 'AI Agent', Icon: AiAgentIcon, src: '/img/tabs/ai-agent.avif' },
  { label: 'AI Workflows', Icon: AiWorkflowsIcon, src: '/img/tabs/ai-workflows.avif' },
]

export function ProductTabs() {
  return (
    <ElTabGroup className="flex w-full flex-col items-center gap-8 rounded-4xl bg-card/50 p-4 sm:p-6 dark:bg-white/5">
      {/* Tab bar — below xl only the selected tab shows its label; tab 0 is pre-selected in SSR markup so there is no hydration flash */}
<div className="max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ElTabList role="tablist" className="flex items-center gap-1">
          {TABS.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={index === 0}
              tabIndex={index === 0 ? 0 : -1}
              className="group mb-2 inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap text-mauve-500 transition-colors hover:bg-white hover:text-mauve-950 aria-selected:bg-white aria-selected:text-mauve-950 aria-selected:shadow-sm xl:px-4 dark:text-mauve-400 dark:hover:bg-white/10 dark:hover:text-white dark:aria-selected:bg-mauve-800 dark:aria-selected:text-white"
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
