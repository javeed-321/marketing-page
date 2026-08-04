import type { Metadata } from 'next'
import Link from 'next/link'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { JsonLd } from '@/components/json-ld'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { BentoCard, BentoThreeColumn } from '@/components/sections/bento-three-column'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'
import { solutions } from '@/lib/solutions'
import { absoluteUrl, siteConfig } from '@/lib/site'

const DASHBOARD_URL = 'https://dashboard.documentation.ai/'
const DEMO_URL = 'https://documentation.ai/get-a-demo'

const HUB_HEADLINE = 'Documentation that works the way your team does'
const HUB_SUBHEADLINE =
  'Whether you own the roadmap, the codebase, the support queue, or the internal knowledge base, Documentation.AI keeps the docs behind it accurate and easy to find.'

export const metadata: Metadata = {
  title: `Solutions — ${siteConfig.name}`,
  description: HUB_SUBHEADLINE,
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: `Solutions — ${siteConfig.name}`,
    description: HUB_SUBHEADLINE,
    url: '/solutions',
    type: 'website',
  },
}

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl('/solutions')}/#collection`,
    name: `Solutions — ${siteConfig.name}`,
    description: HUB_SUBHEADLINE,
    url: absoluteUrl('/solutions'),
    inLanguage: 'en',
    hasPart: solutions.map((solution) => ({
      '@type': 'WebPage',
      '@id': `${absoluteUrl(`/solutions/${solution.slug}`)}/#page`,
      name: solution.metaTitle,
      description: solution.metaDescription,
      url: absoluteUrl(`/solutions/${solution.slug}`),
    })),
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <HeroSimpleCentered
        id="hero"
        eyebrow="Solutions"
        headline={HUB_HEADLINE}
        subheadline={<p>{HUB_SUBHEADLINE}</p>}
        cta={
          <>
            <ButtonLink href={DASHBOARD_URL} size="lg">
              Start for Free
            </ButtonLink>

            <PlainButtonLink href={DEMO_URL} size="lg">
              Book a Demo
            </PlainButtonLink>
          </>
        }
      />

      {/* One card per solution. Four cards in a three-column grid wrap 3 + 1,
        * which is the block's own behaviour — kept rather than forking it. */}
      <BentoThreeColumn
        id="solutions"
        cards={solutions.map((solution) => (
          <Link
            key={solution.slug}
            href={`/solutions/${solution.slug}`}
            className="group rounded-3xl transition-opacity hover:opacity-80"
          >
            <BentoCard
              headline={solution.label}
              subheadline={
                <>
                  <p>{solution.cardSummary}</p>
                  <ul className="flex flex-col gap-2">
                    {solution.cardBullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <CheckmarkIcon className="h-lh shrink-0 stroke-mauve-950 dark:stroke-white" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-medium text-mauve-950 group-hover:text-red-500 dark:text-white">
                    Explore {solution.label} →
                  </p>
                </>
              }
              className="h-full"
            />
          </Link>
        ))}
      />

      {/* Call To Action */}
      <CallToActionSimpleCentered
        id="call-to-action"
        headline="Ready to build docs that Humans and AI love with Documentation.AI?"
        subheadline={
          <p className="font-mono text-sm/[21px] tracking-[-0.01em] text-mauve-500">
            Live in under 5 min · No credit card required
          </p>
        }
        cta={
          <>
            <ButtonLink href={DASHBOARD_URL} size="lg">
              Start for Free
            </ButtonLink>

            <PlainButtonLink href={DEMO_URL} size="lg">
              Book a Demo
            </PlainButtonLink>
          </>
        }
      />
    </>
  )
}
