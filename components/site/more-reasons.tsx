import type { ComponentProps } from 'react'

import { FeedbackIcon } from '@/components/icons/framer/feedback-icon'
import { LightningFastIcon } from '@/components/icons/framer/lightning-fast-icon'
import { McpIcon } from '@/components/icons/framer/mcp-icon'
import {
  BentoFeaturedSection,
  toIconCard,
  type Featured,
  type IconCardData,
} from '@/components/sections/bento-featured'
import { AGENTIC_ASSISTANT_CONTENT, AgenticAssistantCard } from '@/components/site/agentic-assistant-card'

/** Everything this section *says*. The tuples are fixed-length: the grid only lays out at 2 + 3. */
export type MoreReasonsContent = {
  headline: string
  /** Two half-width cards on the top row. */
  featured: [Featured, Featured]
  /** Three cards on the second row. */
  cards: [IconCardData, IconCardData, IconCardData]
}

/** Homepage copy for section 5 — the only place these words live. */
export const MORE_REASONS_CONTENT: MoreReasonsContent = {
  headline: 'More Reasons Users Love Your Documentation',
  featured: [
    {
      variant: 'red',
      media: <AgenticAssistantCard content={AGENTIC_ASSISTANT_CONTENT} />,
      title: 'Agentic AI assistant',
      desc: 'Users ask questions and get instant, accurate, cited answers right where they read and work.',
    },
    {
      img: '/img/sections/api-playground.avif',
      title: 'Interactive API playground',
      desc: 'Test endpoints, tweak parameters, and copy ready-to-run code snippets directly from the docs.',
    },
  ],
  cards: [
    {
      Icon: LightningFastIcon,
      title: 'Lightning Fast',
      desc: 'Faster docs that hit 100/100 Lighthouse score across performance, accessibility and SEO.',
    },
    {
      Icon: McpIcon,
      title: 'Model Context Protocol (MCP)',
      desc: 'Surface the same up-to-date docs in chatbots, coding agents, and in-product overlays.',
    },
    {
      Icon: FeedbackIcon,
      title: 'Feedback',
      desc: 'Collect precise feedback from users directly on every page.',
    },
  ],
}

// Section 5 — More Reasons Users Love Your Documentation — 2 image + 3 icon bento.
// Presentational only: it owns layout and styling, `content` owns every word.
export function MoreReasons({
  content,
  ...props
}: { content: MoreReasonsContent } & Omit<
  ComponentProps<typeof BentoFeaturedSection>,
  'content' | 'featured' | 'cards' | 'headline'
>) {
  const { headline, featured, cards } = content
  const [first, second, third] = cards

  return (
    <BentoFeaturedSection
      id="more-reasons"
      headline={headline}
      featured={featured}
      cards={[toIconCard(first), toIconCard(second), toIconCard(third)]}
      {...props}
    />
  )
}
