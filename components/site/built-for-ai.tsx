import { clsx } from 'clsx/lite'
import type { ComponentProps, ComponentType, ReactNode } from 'react'

import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Paragraphs, Text, type Prose } from '@/components/elements/text'
import { LlmsTxtIcon } from '@/components/icons/framer/llms-txt-icon'
import { McpServerIcon } from '@/components/icons/framer/mcp-server-icon'
import { StructuredContentIcon } from '@/components/icons/framer/structured-content-icon'
import { RefreshCwIcon } from '@/components/icons/refresh-cw-icon'

export function FeatureItem({
  icon,
  headline,
  subheadline,
  className,
}: { icon: ReactNode; headline: ReactNode; subheadline: ReactNode } & ComponentProps<'div'>) {
  return (
    <div className={clsx('flex flex-col gap-8 py-8 lg:py-10', className)}>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-mauve-950 dark:bg-white/10 dark:text-white">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lg/normal font-normal text-mauve-950 dark:text-white">{headline}</h3>
        <div className="flex flex-col gap-4 text-sm/5 text-mauve-700 dark:text-mauve-400">{subheadline}</div>
      </div>
    </div>
  )
}

export type IconFeature = {
  /** Icon component itself, e.g. McpServerIcon — rendered at size-5 by the block. */
  Icon: ComponentType<ComponentProps<'svg'>>
  title: string
  desc: string
}

/** Everything this section *says*. Plain data — no JSX, no styling. */
export type BuiltForAiContent = {
  headline: string
  subheadline: Prose
  image: string
  imageAlt: string
  /** Four features — two flank each side of the centre image. */
  features: IconFeature[]
}

/** Homepage copy for section 3 — the only place these words live. */
export const BUILT_FOR_AI_CONTENT: BuiltForAiContent = {
  headline: 'Built for Humans, Optimized for AI',
  subheadline:
    'Documentation that’s cleanly structured so people, LLMs, and AI agents can read, navigate, and use it with pinpoint accuracy.',
  image: '/img/sections/built-for-humans.avif',
  imageAlt: 'Documentation optimized for AI',
  features: [
    {
      Icon: StructuredContentIcon,
      title: 'Structured content',
      desc: 'Headings, code blocks, parameters, and examples are structured for precise LLM chunking and high-quality retrieval, so AI tools surface the exact section users need instead of guessing across pages.',
    },
    {
      Icon: LlmsTxtIcon,
      title: 'Auto-generated llms.txt',
      desc: 'Creates a single source of truth for AI assistants and improves SEO discoverability by exposing clean, structured content.',
    },
    {
      Icon: RefreshCwIcon,
      title: 'Up-to-date information for AI agents',
      desc: 'LLMs have fixed training cutoffs and can miss new information. Your docs give AI agents real-time information, so they always see the latest updates, not outdated snapshots.',
    },
    {
      Icon: McpServerIcon,
      title: 'MCP server',
      desc: 'Stream real-time spec changes to any model that supports the MCP, ensuring your AI tools always work with the latest version.',
    },
  ],
}

// Grid placement is layout, not content, so it stays owned by the block and is applied
// positionally: features 1-2 fill the left column, 3-4 the right, around the centre image.
// Extra features beyond the fourth simply flow into the grid unplaced.
const POSITIONS = [
  'lg:col-start-1 lg:row-start-1',
  'lg:col-start-1 lg:row-start-2',
  'lg:col-start-3 lg:row-start-1',
  'lg:col-start-3 lg:row-start-2',
]

// Section 3 — Built for Humans, Optimized for AI — 4 features flanking a centre image.
// Presentational only: it owns layout and styling, `content` owns every word.
export function BuiltForAI({
  content,
  className,
  ...props
}: { content: BuiltForAiContent } & Omit<ComponentProps<'section'>, 'content'>) {
  const { headline, subheadline, image, imageAlt, features } = content

  return (
    <section id="built-for-ai" className={clsx('py-16', className)} {...props}>
      <Container className="flex flex-col gap-10 sm:gap-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Subheading>{headline}</Subheading>
          <Text className="flex flex-col gap-4 text-center text-pretty">
            <Paragraphs>{subheadline}</Paragraphs>
          </Text>
        </div>

        {/*
          Responsive placement:
          - mobile: illustration on top, then the 4 features stacked
          - sm: illustration full-width on top, features in a 2-column grid below
          - lg: 2 features (col 1) | illustration (center, spans both rows) | 2 features (col 3)
        */}
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:items-center">
          <div className="flex items-center justify-center sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- image already includes its own background */}
            <img src={image} alt={imageAlt} className="w-full max-w-sm rounded-2xl" />
          </div>

          {features.map((feature, i) => (
            <FeatureItem
              key={feature.title}
              className={POSITIONS[i]}
              icon={<feature.Icon className="size-5" />}
              headline={feature.title}
              subheadline={<p>{feature.desc}</p>}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
