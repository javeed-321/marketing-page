import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { FolderIcon } from '@/components/icons/folder-icon'
import { RepeatIcon } from '@/components/icons/repeat-icon'
import { Squares2StackedIcon } from '@/components/icons/squares-2-stacked-icon'
import { BentoCard, BentoThreeColumn } from '@/components/sections/bento-three-column'
import { FeatureThreeColumnWithDemos } from '@/components/sections/features-three-column-with-demos'
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo'
import { ProductTabs } from '@/components/site/product-tabs'

const AI_WORKFLOWS = [
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
]

const AI_DOCUMENTATION_AGENT = [
  {
    Icon: Squares2StackedIcon,
    title: 'AI-assisted updates directly in the web editor',
    desc: 'The Documentation Agent suggests improvements, rewrites unclear sections, fixes structure, summarizes changes, and generates clean draft updates, making documentation updates fast and effortless.',
  },
  {
    Icon: FolderIcon,
    title: 'Complements any coding agent via MCP',
    desc: 'Use Cursor, Windsurf, or Copilot. Our MCP server gives your coding agent live documentation context so it can suggest accurate updates directly from your code editor.',
  },
  {
    Icon: RepeatIcon,
    title: 'Monitors product changes, support signals, user feedback (coming soon)',
    desc: 'The agent will track Git commits, feature releases, support tickets, user feedback, and audit logs to surface when documentation is out of date, before your users ever encounter incorrect information.',
  },
]

export default function Page() {
  return (
    <>
      <HeroLeftAlignedWithDemo
        id="hero"
        eyebrow={<AnnouncementBadge href="#" text="Knowledge Infrastructure For AI Agents And Humans" />}
        headline="The AI Documentation Platform"
        subheadline={
          <p>
            Create self-updating product docs, knowledge bases, API references, and help centers. Make knowledge easy
            for AI agents and humans to access. Reduce support and accelerate onboarding.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="https://dashboard.documentation.ai/" size="lg">
              Start for Free
            </ButtonLink>

            <PlainButtonLink href="https://documentation.ai/get-a-demo" size="lg">
              Book a Demo <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
        demo={<ProductTabs />}
      />

      {/* Section 1 — Docs that keep up — 4-column card grid (no eyebrow, tightened header gap) */}
      <section id="ai-workflows" className="py-16">
        <Container className="flex flex-col gap-8">
          <div className="flex max-w-2xl flex-col gap-6">
            <Subheading>Docs that keep up with your product</Subheading>
            <Text className="text-pretty">
              <p>
                The documentation platform built for the AI era. Beautiful for humans, structured for LLMs, and kept
                fresh by an agent that writes alongside your product.
              </p>
            </Text>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AI_WORKFLOWS.map((f) => (
              <FeatureThreeColumnWithDemos
                key={f.n}
                className="rounded-2xl"
                demo={
                  <div className="flex items-center justify-center px-6 pt-12 pb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.img} alt="" className="h-40 w-auto" />
                  </div>
                }
                headline={
                  <>
                    <span className="mb-2 block text-xs font-semibold tabular-nums text-red-500">{f.n}</span>
                    {f.title}
                  </>
                }
                subheadline={<p>{f.desc}</p>}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Section 2 — AI Documentation Agent — 3-column icon-card bento */}
      <BentoThreeColumn
        id="ai-documentation-agent"
        headline="AI Documentation Agent to Keep Your Docs Up to Date"
        subheadline={
          <p>
            Keeping documentation and knowledge bases current is mission-critical yet notoriously tedious. Your AI
            Documentation Agent keeps everything in sync with minimal manual effort.
          </p>
        }
        cards={AI_DOCUMENTATION_AGENT.map((c) => (
          <BentoCard key={c.title} icon={<c.Icon className="size-5" />} headline={c.title} subheadline={<p>{c.desc}</p>} />
        ))}
      />
    </>
  )
}
