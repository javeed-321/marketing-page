import type { ComponentProps, ComponentType } from 'react'

import { Paragraphs, type Prose } from '@/components/elements/text'
import { FolderSearchIcon } from '@/components/icons/folder-search-icon'
import { RefreshCwIcon } from '@/components/icons/refresh-cw-icon'
import { WorkflowIcon } from '@/components/icons/workflow-icon'
import { BentoCard, BentoThreeColumn } from '@/components/sections/bento-three-column'

export type IconFeature = {
  /** Icon component itself, e.g. WorkflowIcon — rendered at size-5 by the block. */
  Icon: ComponentType<ComponentProps<'svg'>>
  title: string
  desc: string
}

/** Everything this section *says*. Plain data — no JSX, no styling. */
export type AiDocumentationAgentContent = {
  headline: string
  subheadline: Prose
  cards: IconFeature[]
}

/** Homepage copy for section 2 — the only place these words live. */
export const AI_DOCUMENTATION_AGENT_CONTENT: AiDocumentationAgentContent = {
  headline: 'AI Documentation Agent to Keep Your Docs Up to Date',
  subheadline:
    'Keeping documentation and knowledge bases current is mission-critical yet notoriously tedious. Your AI Documentation Agent keeps everything in sync with minimal manual effort.',
  cards: [
    {
      Icon: WorkflowIcon,
      title: 'AI-assisted updates directly in the web editor',
      desc: 'The Documentation Agent suggests improvements, rewrites unclear sections, fixes structure, summarizes changes, and generates clean draft updates, making documentation updates fast and effortless.',
    },
    {
      Icon: FolderSearchIcon,
      title: 'Complements any coding agent via MCP',
      desc: 'Use Cursor, Windsurf, or Copilot. Our MCP server gives your coding agent live documentation context so it can suggest accurate updates directly from your code editor.',
    },
    {
      Icon: RefreshCwIcon,
      title: 'Monitors product changes, support signals, user feedback (coming soon)',
      desc: 'The agent will track Git commits, feature releases, support tickets, user feedback, and audit logs to surface when documentation is out of date, before your users ever encounter incorrect information.',
    },
  ],
}

// Section 2 — AI Documentation Agent — 3-column icon-card bento.
// Presentational only: it owns layout and styling, `content` owns every word.
export function AiDocumentationAgent({
  content,
  ...props
}: { content: AiDocumentationAgentContent } & Omit<
  ComponentProps<typeof BentoThreeColumn>,
  'content' | 'cards' | 'headline' | 'subheadline'
>) {
  const { headline, subheadline, cards } = content

  return (
    <BentoThreeColumn
      id="ai-documentation-agent"
      headline={headline}
      subheadline={<Paragraphs>{subheadline}</Paragraphs>}
      cards={cards.map((card) => (
        <BentoCard
          key={card.title}
          icon={<card.Icon className="size-5" />}
          headline={card.title}
          subheadline={<p>{card.desc}</p>}
        />
      ))}
      {...props}
    />
  )
}
