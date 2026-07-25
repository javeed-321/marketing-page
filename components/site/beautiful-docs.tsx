import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { FeatureThreeColumnWithDemos } from '@/components/sections/features-three-column-with-demos'

const BEAUTIFUL_DOCS = [
  {
    title: 'Pixel-perfect',
    desc: 'Crisp typography, accessible colors, dark-mode ready.',
    img: '/img/sections/pixel-perfect.avif',
  },
  {
    title: 'Fully customizable',
    desc: 'Swap colors, fonts, layouts, or inject your own CSS & JS.',
    img: '/img/sections/fully-customizable.avif',
  },
  {
    title: 'Templates & components',
    desc: '100+ reusable blocks for every need, from callouts to code tabs.',
    img: '/img/sections/templates-components.avif',
  },
  {
    title: 'Lightning Fast',
    desc: '100/100 across Performance, Accessibility and SEO.',
    img: '/img/sections/lightning-fast.avif',
  },
]

// Section 4 — Beautiful, Lightning Fast Docs — 4-column card grid (same structure as Section 1)
export function BeautifulDocs() {
  return (
    <section id="beautiful-docs" className="py-16">
      <Container className="flex flex-col gap-8">
        <div className="flex max-w-xl flex-col gap-6">
          <Subheading>Beautiful, Lightning Fast Docs that Drive Adoption</Subheading>
          <Text className="text-pretty">
            <p>
              Your docs double as a conversion engine, so we obsess over design and speed for you. Every page ships
              pixel-perfect, responsive, accessible and ridiculously fast.
            </p>
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BEAUTIFUL_DOCS.map((f) => (
            <FeatureThreeColumnWithDemos
              key={f.title}
              className="rounded-2xl"
              demo={
                <div className="flex items-center justify-center px-6 pt-12 pb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.img} alt="" className="h-40 w-auto" />
                </div>
              }
              headline={f.title}
              subheadline={<p>{f.desc}</p>}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
