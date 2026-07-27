'use client'

import { ElTabGroup, ElTabList, ElTabPanels } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import { useEffect, useRef, useState, type ComponentProps, type ComponentType } from 'react'

import { AiAgentIcon } from '@/components/icons/framer/ai-agent-icon'
import { AiAssistantIcon } from '@/components/icons/framer/ai-assistant-icon'
import { AiWorkflowsIcon } from '@/components/icons/framer/ai-workflows-icon'
import { ApiReferenceIcon } from '@/components/icons/framer/api-reference-icon'
import { ChangelogIcon } from '@/components/icons/framer/changelog-icon'
import { HelpCenterIcon } from '@/components/icons/framer/help-center-icon'
import { ProductGuidesIcon } from '@/components/icons/framer/product-guides-icon'

export type ProductTab = {
  /** Tab label — also the React key and the screenshot's alt text. */
  label: string
  /** Icon component itself, e.g. ApiReferenceIcon — rendered at size-4 by the block. */
  Icon: ComponentType<ComponentProps<'svg'>>
  /** Screenshot shown in the matching panel. */
  src: string
}

/** Everything this block *shows*. Plain data — no JSX, no styling. */
export type ProductTabsContent = {
  tabs: ProductTab[]
}

/** Homepage tab set — the only place these labels and screenshots live. */
export const PRODUCT_TABS_CONTENT: ProductTabsContent = {
  tabs: [
    { label: 'Product Guides', Icon: ProductGuidesIcon, src: '/img/tabs/product-guides.avif' },
    { label: 'API Reference', Icon: ApiReferenceIcon, src: '/img/tabs/api-reference.png' },
    { label: 'Help Center', Icon: HelpCenterIcon, src: '/img/tabs/help-center.avif' },
    { label: 'Changelog', Icon: ChangelogIcon, src: '/img/tabs/changelog.avif' },
    { label: 'AI Assistant', Icon: AiAssistantIcon, src: '/img/tabs/ai-assistant.png' },
    { label: 'AI Agent', Icon: AiAgentIcon, src: '/img/tabs/ai-agent.avif' },
    { label: 'AI Workflows', Icon: AiWorkflowsIcon, src: '/img/tabs/ai-workflows.avif' },
  ],
}

// Screenshot tab switcher used as the hero demo.
// Presentational only: it owns layout, styling and the rotation behaviour;
// `content` owns the tab set.
export function ProductTabs({
  content,
  /** Auto-advance delay in ms. Pass 0 to leave the tabs on manual control only. */
  interval = 4000,
  className,
}: {
  content: ProductTabsContent
  interval?: number
  className?: string
}) {
  const { tabs } = content
  const barRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  // Bumped whenever the visitor picks a tab, so the countdown restarts from their choice
  // instead of jumping away a fraction of a second later.
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (paused || interval <= 0 || tabs.length < 2) return
    // Someone who asked for less motion shouldn't get a panel that changes under them.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      const bar = barRef.current
      const buttons = Array.from(bar?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [])
      if (!bar || buttons.length < 2) return

      // Selection lives in the DOM (el-tab-group owns it), so read it back rather than
      // tracking a parallel index that keyboard/click selection could desync.
      const current = buttons.findIndex((b) => b.getAttribute('aria-selected') === 'true')
      const next = buttons[(current + 1) % buttons.length]
      next.click()

      // Below xl the bar scrolls horizontally — keep the newly selected tab centred in it.
      // Scrolling the bar directly (not scrollIntoView) so the page itself never moves.
      const barBox = bar.getBoundingClientRect()
      const tabBox = next.getBoundingClientRect()
      bar.scrollTo({
        left: bar.scrollLeft + (tabBox.left - barBox.left) - (barBox.width - tabBox.width) / 2,
        behavior: 'smooth',
      })
    }, interval)

    return () => clearInterval(id)
  }, [paused, interval, tabs.length, cycle])

  return (
    <ElTabGroup
      className={clsx(
        'flex w-full flex-col items-center gap-8 rounded-4xl bg-card/50 p-4 sm:p-6 dark:bg-white/5',
        className,
      )}
      // Keyboard users get a hard pause: once focus is inside the group, tabbing/arrowing
      // through the tabs shouldn't race a timer. Pointer users only pause over the tab bar
      // itself (below) — hovering the screenshot covers most of the hero, and pausing on
      // that would leave the rotation looking dead for anyone whose cursor sits there.
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Tab bar — below xl only the selected tab shows its label; tab 0 is pre-selected in SSR markup so there is no hydration flash */}
      <div
        ref={barRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        // isTrusted filters out the timer's own .click() — only a real click restarts the countdown.
        onClickCapture={(e) => e.nativeEvent.isTrusted && setCycle((c) => c + 1)}
        className="max-w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ElTabList role="tablist" className="flex items-center gap-1">
          {tabs.map((tab, index) => (
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
        {tabs.map((tab, index) => (
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



