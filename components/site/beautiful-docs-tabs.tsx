import { ElTabGroup, ElTabList, ElTabPanels } from '@tailwindplus/elements/react'
import type { ComponentProps } from 'react'

import { Section } from '@/components/elements/section'
import { LightingBoltIcon } from '@/components/icons/lighting-bolt-icon'
import { PhotoIcon } from '@/components/icons/photo-icon'
import { SlidersIcon } from '@/components/icons/sliders-icon'
import { UiLayoutIcon } from '@/components/icons/ui-layout-icon'

const TABS = [
  { label: 'Pixel-perfect', Icon: PhotoIcon, src: '/img/sections/pixel-perfect.avif' },
  { label: 'Fully customizable', Icon: SlidersIcon, src: '/img/sections/fully-customizable.avif' },
  { label: 'Templates & components', Icon: UiLayoutIcon, src: '/img/sections/templates-components.avif' },
  { label: 'Lightning Fast', Icon: LightingBoltIcon, src: '/img/sections/lightning-fast.avif' },
]

// Section 4 — tab switcher built on the template's ElTabGroup primitive (same as the hero tabs).
export function BeautifulDocsTabs(props: Omit<ComponentProps<typeof Section>, 'children'>) {
  return (
    <Section {...props}>
      <ElTabGroup className="flex w-full flex-col items-center gap-8">
        <div className="max-w-full overflow-x-auto">
          <ElTabList role="tablist" className="flex gap-1 rounded-full bg-mauve-950/5 p-1 dark:bg-white/5">
            {TABS.map((tab, index) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={index === 0}
                tabIndex={index === 0 ? 0 : -1}
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap text-mauve-500 transition-colors hover:text-mauve-950 aria-selected:bg-white aria-selected:text-mauve-950 aria-selected:shadow-sm dark:text-mauve-400 dark:hover:text-white dark:aria-selected:bg-mauve-800 dark:aria-selected:text-white"
              >
                <tab.Icon className="size-4" />
                {tab.label}
              </button>
            ))}
          </ElTabList>
        </div>
        <ElTabPanels className="block w-full">
          {TABS.map((tab, index) => (
            <div
              key={tab.label}
              hidden={index !== 0}
              className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-mauve-950/10 dark:ring-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tab.src} alt={`${tab.label} screenshot`} className="block w-full" />
            </div>
          ))}
        </ElTabPanels>
      </ElTabGroup>
    </Section>
  )
}
