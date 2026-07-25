import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { FeatureThreeColumnWithDemos } from '@/components/sections/features-three-column-with-demos'

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

// Section 1 — Docs that keep up — 4-column card grid
export function DocsThatKeepUp() {
  return (
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
              className="rounded-3xl"
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
  )
}
