import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { JsonLd } from '@/components/json-ld'
import { BentoCard, BentoThreeColumn } from '@/components/sections/bento-three-column'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { Feature, FeaturesThreeColumn } from '@/components/sections/features-three-column'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { getSolutionBySlug, solutions, type FeatureSectionData } from '@/lib/solutions'
import { absoluteUrl, siteConfig } from '@/lib/site'

const DASHBOARD_URL = 'https://dashboard.documentation.ai/'
const DEMO_URL = 'https://documentation.ai/get-a-demo'

type Props = {
  params: Promise<{ slug: string }>
}

// The four solutions are fixed content, not a CMS collection — an unknown slug
// is a broken link, so 404 rather than trying to render it on demand.
export const dynamicParams = false

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const solution = getSolutionBySlug(slug)
  if (!solution) return {}

  return {
    title: `${solution.metaTitle} — ${siteConfig.name}`,
    description: solution.metaDescription,
    alternates: { canonical: `/solutions/${solution.slug}` },
    openGraph: {
      title: solution.metaTitle,
      description: solution.metaDescription,
      url: `/solutions/${solution.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: solution.metaTitle,
      description: solution.metaDescription,
    },
  }
}

/** Lead, bullet list and closing note for one `sections[]` entry. */
function SectionBody({ section }: { section: FeatureSectionData }) {
  return (
    <>
      <p>{section.lead}</p>
      <ul className="flex flex-col gap-2">
        {section.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <CheckmarkIcon className="h-lh shrink-0 stroke-mauve-950 dark:stroke-white" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      {section.note && <p className="text-mauve-500">{section.note}</p>}
    </>
  )
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const solution = getSolutionBySlug(slug)
  if (!solution) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(`/solutions/${solution.slug}`)}/#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: absoluteUrl('/solutions') },
      { '@type': 'ListItem', position: 3, name: solution.label },
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <HeroSimpleCentered
        id="hero"
        eyebrow="Solutions"
        headline={solution.hero.title}
        subheadline={<p>{solution.hero.subtitle}</p>}
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

      {/* The three "what it does" blocks */}
      <BentoThreeColumn
        id="capabilities"
        headline={`How Documentation.AI works for ${solution.label}`}
        cards={solution.sections.map((section) => (
          <BentoCard key={section.title} headline={section.title} subheadline={<SectionBody section={section} />} />
        ))}
      />

      {/* Use cases */}
      <FeaturesThreeColumn
        id="use-cases"
        headline="What You Can Build"
        subheadline={<p>{solution.useCases.lead}</p>}
        features={solution.useCases.items.map((item) => (
          <Feature key={item.title} headline={item.title} subheadline={<p>{item.description}</p>} />
        ))}
      />

      {/* Pain points */}
      <FeaturesThreeColumn
        id="pain-points"
        headline="Pain Points We Solve"
        subheadline={<p>{solution.pains.lead}</p>}
        features={solution.pains.items.map((item) => (
          <Feature key={item.title} headline={item.title} subheadline={<p>{item.description}</p>} />
        ))}
      />

      {/* Call To Action */}
      <CallToActionSimpleCentered
        id="call-to-action"
        headline={solution.ctaHeading}
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
