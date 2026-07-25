import { FeedbackIcon } from '@/components/icons/framer/feedback-icon'
import { LightningFastIcon } from '@/components/icons/framer/lightning-fast-icon'
import { McpIcon } from '@/components/icons/framer/mcp-icon'
import { BentoFeaturedSection } from '@/components/sections/bento-featured'
import { AgenticAssistantCard } from '@/components/site/agentic-assistant-card'

// Section 5 — More Reasons Users Love Your Documentation — 2 image + 3 icon bento
export function MoreReasons() {
  return (
    <BentoFeaturedSection
      id="more-reasons"
      headline="More Reasons Users Love Your Documentation"
      featured={[
        {
          variant: 'red',
          media: <AgenticAssistantCard />,
          title: 'Agentic AI assistant',
          desc: 'Users ask questions and get instant, accurate, cited answers right where they read and work.',
        },
        {
          img: '/img/sections/api-playground.avif',
          title: 'Interactive API playground',
          desc: 'Test endpoints, tweak parameters, and copy ready-to-run code snippets directly from the docs.',
        },
      ]}
      cards={[
        {
          icon: <LightningFastIcon className="size-5" />,
          title: 'Lightning Fast',
          desc: 'Faster docs that hit 100/100 Lighthouse score across performance, accessibility and SEO.',
        },
        {
          icon: <McpIcon className="size-5" />,
          title: 'Model Context Protocol (MCP)',
          desc: 'Surface the same up-to-date docs in chatbots, coding agents, and in-product overlays.',
        },
        {
          icon: <FeedbackIcon className="size-5" />,
          title: 'Feedback',
          desc: 'Collect precise feedback from users directly on every page.',
        },
      ]}
    />
  )
}
