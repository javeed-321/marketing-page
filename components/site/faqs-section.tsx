import type { ComponentProps } from 'react'

import { Paragraphs, type Prose } from '@/components/elements/text'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'

export type FaqItem = {
  /** Question — the always-visible summary line. */
  q: string
  /** Answer — revealed on open. */
  a: string
}

/** Everything this section *says*. Plain data — no JSX, no styling. */
export type FaqsContent = {
  headline: string
  subheadline: Prose
  faqs: FaqItem[]
}

/** Homepage copy for section 9 — the only place these words live. */
export const FAQS_CONTENT: FaqsContent = {
  headline: 'Frequently Asked Questions (FAQs)',
  subheadline: 'Find quick answers to the most asked questions about Documentation.AI.',
  faqs: [
    {
      q: 'What is an AI documentation platform?',
      a: 'An AI documentation platform helps you create, maintain, and publish docs that are structured for both humans and AI — with an agent that keeps content fresh and an assistant that answers questions inside your docs.',
    },
    {
      q: 'How is Documentation.AI different from other AI documentation software?',
      a: 'Documentation.AI is built AI-native from the ground up: docs are cleanly structured for LLM retrieval, an agent writes alongside your product, and everything is exposed to AI tools via llms.txt and MCP.',
    },
    {
      q: 'Do you support Git and docs-as-code workflows?',
      a: 'Yes. Write in Markdown/MDX, keep your docs in Git, and draft or update them from your code editor with Cursor, Windsurf, or Copilot.',
    },
    {
      q: 'Do you support Markdown/MDX and components (callouts, tabs, and code blocks)?',
      a: 'Yes. You get 100+ reusable components — callouts, tabs, code blocks, and more — that render pixel-perfect and stay accessible.',
    },
    {
      q: 'What features should I look for when choosing AI documentation tools?',
      a: 'Look for structured content for LLM retrieval, an AI writing/maintenance agent, an in-docs assistant, MCP support, analytics, and fast, accessible, customizable publishing.',
    },
    {
      q: 'Can AI documentation tools automatically create and update technical content?',
      a: 'Yes. The Documentation Agent drafts, rewrites, and formats content, and monitors product changes to surface docs that are out of date before your users notice.',
    },
  ],
}

// Section 9 — FAQ.
// Presentational only: it owns layout and styling, `content` owns every word.
export function FaqsSection({
  content,
  ...props
}: { content: FaqsContent } & Omit<
  ComponentProps<typeof FAQsTwoColumnAccordion>,
  'content' | 'children' | 'headline' | 'subheadline'
>) {
  const { headline, subheadline, faqs } = content

  return (
    <FAQsTwoColumnAccordion
      id="faqs"
      headline={headline}
      subheadline={<Paragraphs>{subheadline}</Paragraphs>}
      {...props}
    >
      {faqs.map((faq) => (
        <Faq key={faq.q} question={faq.q} answer={<p>{faq.a}</p>} />
      ))}
    </FAQsTwoColumnAccordion>
  )
}
