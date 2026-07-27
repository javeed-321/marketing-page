import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Paragraphs, Text, type Prose } from '@/components/elements/text'
import { FeatureThreeColumnWithDemos } from '@/components/sections/features-three-column-with-demos'

export type ImageFeature = {
  title: string
  desc: string
  img: string
}

/** Everything this section *says*. Plain data — no JSX, no styling. */
export type BeautifulDocsContent = {
  headline: string
  subheadline: Prose
  items: ImageFeature[]
}

/** Homepage copy for section 4 — the only place these words live. */
export const BEAUTIFUL_DOCS_CONTENT: BeautifulDocsContent = {
  headline: 'Beautiful, Lightning Fast Docs that Drive Adoption',
  subheadline:
    'Your docs double as a conversion engine, so we obsess over design and speed for you. Every page ships pixel-perfect, responsive, accessible and ridiculously fast.',
  items: [
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
  ],
}

// Section 4 — Beautiful, Lightning Fast Docs — 4-column card grid (same structure as Section 1).
// Presentational only: it owns layout and styling, `content` owns every word.
export function BeautifulDocs({
  content,
  className,
  ...props
}: { content: BeautifulDocsContent } & Omit<ComponentProps<'section'>, 'content'>) {
  const { headline, subheadline, items } = content

  return (
    <section id="beautiful-docs" className={clsx('py-16', className)} {...props}>
      <Container className="flex flex-col gap-8">
        <div className="flex max-w-2xl flex-col gap-6">
          <Subheading>{headline}</Subheading>
          <Text className="flex flex-col gap-4 text-pretty">
            <Paragraphs>{subheadline}</Paragraphs>
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <FeatureThreeColumnWithDemos
              key={item.title}
              className="rounded-3xl"
              demo={
                <div className="flex items-center justify-center px-6 pt-12 pb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt="" className="h-40 w-auto" />
                </div>
              }
              headline={item.title}
              subheadline={<p>{item.desc}</p>}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
