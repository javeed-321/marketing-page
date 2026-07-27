import type { ComponentProps } from 'react'

import { Paragraphs, type Prose } from '@/components/elements/text'
import { AiAgentIcon } from '@/components/icons/framer/ai-agent-icon'
import { AnalyticsIcon } from '@/components/icons/framer/analytics-icon'
import { IntegrationsIcon } from '@/components/icons/framer/integrations-icon'
import {
  BentoFeaturedSection,
  toIconCard,
  type Featured,
  type IconCardData,
} from '@/components/sections/bento-featured'

/** Everything this section *says*. The tuples are fixed-length: the grid only lays out at 2 + 3. */
export type PublishingExperienceContent = {
  headline: string
  subheadline: Prose
  /** Two half-width cards on the top row. */
  featured: [Featured, Featured]
  /** Three cards on the second row. */
  cards: [IconCardData, IconCardData, IconCardData]
}

/** Homepage copy for section 7 — the only place these words live. */
export const PUBLISHING_EXPERIENCE_CONTENT: PublishingExperienceContent = {
  headline: 'Great Publishing Experience',
  subheadline: 'Create, collaborate, and publish docs without leaving your flow.',
  featured: [
    {
      variant: 'red',
      media: (
        // eslint-disable-next-line @next/next/no-img-element -- local asset
        <img src="/img/sections/web-editor.avif" alt="" className="w-full flex-1 object-cover object-top" />
      ),
      title: 'Web Editor with AI Agent',
      desc: 'Notion-style editor with drag-and-drop blocks, slash commands, and a built-in AI Agent so anyone can create docs like a pro.',
    },
    {
      img: '/img/sections/docs-as-code.avif',
      title: 'Docs as code',
      desc: 'Write in Markdown/MDX, keep docs in Git, and use Cursor or other AI IDEs to draft or update them alongside your code.',
    },
  ],
  cards: [
    {
      Icon: AnalyticsIcon,
      title: 'Analytics',
      desc: 'See page views, search terms, and drop-offs to target improvements.',
    },
    {
      Icon: AiAgentIcon,
      title: 'In-editor AI agent',
      desc: 'Generate rewrites, summaries, and code samples inside editor.',
    },
    {
      Icon: IntegrationsIcon,
      title: 'Integrations',
      desc: 'Connect GitHub, Slack, Jira, Linear, and more in seconds.',
    },
  ],
}

// Section 7 — Great Publishing Experience — 2 image + 3 icon bento.
// Presentational only: it owns layout and styling, `content` owns every word.
export function PublishingExperience({
  content,
  ...props
}: { content: PublishingExperienceContent } & Omit<
  ComponentProps<typeof BentoFeaturedSection>,
  'content' | 'featured' | 'cards' | 'headline' | 'subheadline'
>) {
  const { headline, subheadline, featured, cards } = content
  const [first, second, third] = cards

  return (
    <BentoFeaturedSection
      id="publishing"
      headline={headline}
      subheadline={<Paragraphs>{subheadline}</Paragraphs>}
      featured={featured}
      cards={[toIconCard(first), toIconCard(second), toIconCard(third)]}
      {...props}
    />
  )
}
