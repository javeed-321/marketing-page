import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { LlmsTxtIcon } from '@/components/icons/framer/llms-txt-icon'
import { McpServerIcon } from '@/components/icons/framer/mcp-server-icon'
import { StructuredContentIcon } from '@/components/icons/framer/structured-content-icon'
import { RefreshCwIcon } from '@/components/icons/refresh-cw-icon'

function FeatureItem({
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

export function BuiltForAI() {
  return (
    <section id="built-for-ai" className="py-16">
      <Container className="flex flex-col gap-10 sm:gap-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Subheading>Built for Humans, Optimized for AI</Subheading>
          <Text className="text-center text-pretty">
            Documentation that&rsquo;s cleanly structured so people, LLMs, and AI agents can read, navigate, and use it
            with pinpoint accuracy.
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
            <img
              src="/img/sections/built-for-humans.avif"
              alt="Documentation optimized for AI"
              className="w-full max-w-sm rounded-2xl"
            />
          </div>

          <FeatureItem
            className="lg:col-start-1 lg:row-start-1"
            icon={<StructuredContentIcon className="size-5" />}
            headline="Structured content"
            subheadline={
              <p>
                Headings, code blocks, parameters, and examples are structured for precise LLM chunking and high-quality
                retrieval, so AI tools surface the exact section users need instead of guessing across pages.
              </p>
            }
          />
          <FeatureItem
            className="lg:col-start-1 lg:row-start-2"
            icon={<LlmsTxtIcon className="size-5" />}
            headline="Auto-generated llms.txt"
            subheadline={
              <p>
                Creates a single source of truth for AI assistants and improves SEO discoverability by exposing clean,
                structured content.
              </p>
            }
          />
          <FeatureItem
            className="lg:col-start-3 lg:row-start-1"
            icon={<RefreshCwIcon className="size-5" />}
            headline="Up-to-date information for AI agents"
            subheadline={
              <p>
                LLMs have fixed training cutoffs and can miss new information. Your docs give AI agents real-time
                information, so they always see the latest updates, not outdated snapshots.
              </p>
            }
          />
          <FeatureItem
            className="lg:col-start-3 lg:row-start-2"
            icon={<McpServerIcon className="size-5" />}
            headline="MCP server"
            subheadline={
              <p>
                Stream real-time spec changes to any model that supports the MCP, ensuring your AI tools always work with
                the latest version.
              </p>
            }
          />
        </div>
      </Container>
    </section>
  )
}
