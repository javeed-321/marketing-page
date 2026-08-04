import type { Metadata } from 'next'
import Image from 'next/image'

import { ButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Section } from '@/components/elements/section'
import { JsonLd } from '@/components/json-ld'
import { BookOpenIcon } from '@/components/icons/book-open-icon'
import { ChatBubbleCircleStackedIcon } from '@/components/icons/chat-bubble-circle-stacked-icon'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { ClipboardIcon } from '@/components/icons/clipboard-icon'
import { CodeSquareIcon } from '@/components/icons/code-square-icon'
import { DocumentIcon } from '@/components/icons/document-icon'
import { FolderIcon } from '@/components/icons/folder-icon'
import { LightingBoltIcon } from '@/components/icons/lighting-bolt-icon'
import { BentoCard, BentoThreeColumn } from '@/components/sections/bento-three-column'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'
import { StatsFourColumns } from '@/components/sections/stats-four-columns'
import { absoluteUrl, siteConfig } from '@/lib/site'
import {
  SOLUTIONS_BUILD,
  SOLUTIONS_CTA,
  SOLUTIONS_HERO,
  SOLUTIONS_PAINS,
  SOLUTION_AUDIENCES,
} from '@/lib/solutions'

const DASHBOARD_URL = 'https://dashboard.documentation.ai/'
const DEMO_URL = '/get-a-demo'

// The live page shows no icons on these cards — the illustrations there are
// Framer SVGs. These come from this repo's icon kit, in the same reading order.
const BUILD_ICONS = [CodeSquareIcon, BookOpenIcon, ClipboardIcon]
const PAIN_ICONS = [LightingBoltIcon, DocumentIcon, FolderIcon, ChatBubbleCircleStackedIcon]

export const metadata: Metadata = {
  title: `Solutions — ${siteConfig.name}`,
  description: SOLUTIONS_HERO.subheadline,
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: `Solutions — ${siteConfig.name}`,
    description: SOLUTIONS_HERO.subheadline,
    url: '/solutions',
    type: 'website',
  },
}

function Ctas() {
  return (
    <>
      <ButtonLink href={DASHBOARD_URL} size="lg">
        {SOLUTIONS_CTA.primaryLabel}
      </ButtonLink>

      <SoftButtonLink href={DEMO_URL} size="lg">
        {SOLUTIONS_CTA.secondaryLabel}
      </SoftButtonLink>
    </>
  )
}

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl('/solutions')}/#page`,
    name: SOLUTIONS_HERO.headline,
    description: SOLUTIONS_HERO.subheadline,
    url: absoluteUrl('/solutions'),
    inLanguage: 'en',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Solutions' },
      ],
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <HeroSimpleCentered
        id="hero"
        headline={SOLUTIONS_HERO.headline}
        subheadline={<p>{SOLUTIONS_HERO.subheadline}</p>}
        cta={<Ctas />}
      />

      {/* One section per audience — illustration left, checklist right */}
      {SOLUTION_AUDIENCES.map((audience) => (
        // `scroll-mt-20` clears the sticky navbar when the navbar's own dropdown
        // jumps here — the global `--scroll-padding-top` is 0, and raising it
        // would move the pricing comparison table's sticky header too.
        <Section
          key={audience.id}
          id={audience.id}
          className="scroll-mt-20"
          headline={audience.title}
          subheadline={<p>{audience.lead}</p>}
        >
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Image
              src={audience.image}
              alt=""
              width={960}
              height={960}
              className="w-full rounded-3xl"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />

            <div className="flex flex-col gap-8">
              <ul className="flex flex-col gap-5 text-lg/7 text-mauve-950 dark:text-white">
                {audience.bullets.map((bullet) => (
                  <li key={bullet.text} className="flex gap-3">
                    <CheckmarkIcon className="h-lh shrink-0 stroke-mauve-950 dark:stroke-white" />
                    <span>
                      {bullet.text}
                      {bullet.comingSoon && <em className="ml-1.5 text-mauve-500">(coming soon)</em>}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-lg/7 text-mauve-500">{audience.note}</p>
            </div>
          </div>
        </Section>
      ))}

      {/* What You Can Build */}
      <BentoThreeColumn
        // `use-case`, not `what-you-can-build`: all three "By Use Case" items in
        // the navbar dropdown land on this one section.
        id="use-case"
        className="scroll-mt-20"
        headline={SOLUTIONS_BUILD.headline}
        subheadline={<p>{SOLUTIONS_BUILD.lead}</p>}
        cards={SOLUTIONS_BUILD.items.map((item, index) => {
          const Icon = BUILD_ICONS[index]
          return (
            <BentoCard
              key={item.title}
              icon={<Icon className="size-5" />}
              headline={item.title}
              subheadline={<p>{item.description}</p>}
            />
          )
        })}
      />

      {/* Pain Points We Solve — four across, no card chrome, like the live page */}
      <StatsFourColumns id="pain-points" headline={SOLUTIONS_PAINS.headline} subheadline={<p>{SOLUTIONS_PAINS.lead}</p>}>
        {SOLUTIONS_PAINS.items.map((item, index) => {
          const Icon = PAIN_ICONS[index]
          return (
            <BentoCard
              key={item.title}
              variant="bare"
              icon={<Icon className="size-5" />}
              headline={item.title}
              subheadline={<p>{item.description}</p>}
            />
          )
        })}
      </StatsFourColumns>

      {/* Call To Action */}
      <CallToActionSimpleCentered
        id="call-to-action"
        headline={SOLUTIONS_CTA.headline}
        subheadline={
          <p className="font-mono text-sm/[21px] tracking-[-0.01em] text-mauve-500">{SOLUTIONS_CTA.note}</p>
        }
        cta={<Ctas />}
      />
    </>
  )
}
