import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Paragraphs, Text, type Prose } from '@/components/elements/text'
import { FeatureThreeColumnWithDemos } from '@/components/sections/features-three-column-with-demos'

export type NumberedFeature = {
  /** Index badge shown above the title, e.g. '01'. Also used as the React key. */
  n: string
  title: string
  desc: string
  img: string
}

/** Everything this section *says*. Plain data — no JSX, no styling. */
export type DocsThatKeepUpContent = {
  headline: string
  subheadline: Prose
  items: NumberedFeature[]
}

/** Homepage copy for section 1 — the only place these words live. */
export const DOCS_THAT_KEEP_UP_CONTENT: DocsThatKeepUpContent = {
  headline: 'Docs that keep up with your product',
  subheadline:
    'The documentation platform built for the AI era. Beautiful for humans, structured for LLMs, and kept fresh by an agent that writes alongside your product.',
  items: [
    {
      n: '01',
      title: 'AI agent keeps docs fresh',
      desc: 'The AI agent that suggests, writes, and formats so your docs evolve with your product.',
      img: '/img/features/ai-agent-fresh.avif',
    },
    {
      n: '02',
      title: 'AI assistant in your docs',
      desc: 'Users can ask questions directly inside your docs and get instant, accurate, cited answers.',
      img: '/img/features/ai-assistant-docs.avif',
    },
    {
      n: '03',
      title: 'Flexible publishing',
      desc: 'Use the web editor or update through your code editor with docs-as-code.',
      img: '/img/features/flexible-publishing.avif',
    },
    {
      n: '04',
      title: 'AI-ready out of the box',
      desc: 'Structured so that LLMs, AI agents and search engines can read and use your docs instantly.',
      img: '/img/features/ai-ready.avif',
    },
  ],
}

// Section 1 — Docs that keep up — 4-column numbered card grid.
// Presentational only: it owns layout and styling, `content` owns every word.
export function DocsThatKeepUp({
  content,
  className,
  ...props
}: { content: DocsThatKeepUpContent } & Omit<ComponentProps<'section'>, 'content'>) {
  const { headline, subheadline, items } = content

  return (
    <section id="ai-workflows" className={clsx('py-16', className)} {...props}>
      <Container className="flex flex-col gap-10 sm:gap-16">
        <div className="flex max-w-2xl flex-col gap-6">
          <Subheading>{headline}</Subheading>
          <Text className="flex flex-col gap-4 text-pretty">
            <Paragraphs>{subheadline}</Paragraphs>
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <FeatureThreeColumnWithDemos
              key={item.n}
              className="rounded-3xl"
              demo={
                <div className="flex items-center justify-center px-6 pt-12 pb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt="" className="h-40 w-auto" />
                </div>
              }
              headline={
                <>
                  <span className="mb-2 block text-xs font-semibold tabular-nums text-red-500">{item.n}</span>
                  {item.title}
                </>
              }
              subheadline={<p>{item.desc}</p>}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
