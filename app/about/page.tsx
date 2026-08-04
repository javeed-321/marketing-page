import type { Metadata } from 'next'

import { Feature, FeaturesThreeColumn } from '@/components/sections/features-three-column'
import { HeroSimpleLeftAligned } from '@/components/sections/hero-simple-left-aligned'
import { FINAL_CTA_CONTENT, FinalCta } from '@/components/site/final-cta'
import { TrustedBy, TRUSTED_BY_CONTENT } from '@/components/site/trusted-by'
import { siteConfig } from '@/lib/site'

const ABOUT_INTRO =
  'Documentation.AI is an AI native documentation platform. We centralize specs, guides, and API docs, use AI to keep them current, and give teams workflows that make docs part of every release not an afterthought.'

export const metadata: Metadata = {
  title: `About — ${siteConfig.name}`,
  description: ABOUT_INTRO,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About — ${siteConfig.name}`,
    description: ABOUT_INTRO,
    url: '/about',
    type: 'website',
  },
}

export default function Page() {
  return (
    <>
      {/* Hero */}
      <HeroSimpleLeftAligned
        id="hero"
        headline="About Documentation.AI"
        subheadline={
          <>
            <p>{ABOUT_INTRO}</p>
            <p>
              We help product teams ship clearer features, onboard users faster, and cut support load with docs that
              stay accurate and easy to find.
            </p>
          </>
        }
      />
      {/* Mission */}
      <FeaturesThreeColumn
        id="mission"
        headline="Our mission is to help every team build great documentation."
        features={
          <Feature
            headline="How we work"
            subheadline={
              <p>
                We&rsquo;re a small team with fast feedback loops and a bias for shipping, pairing careful engineering
                with thoughtful design.
              </p>
            }
          />
        }
      />
      {/* Social proof */}
      <TrustedBy content={TRUSTED_BY_CONTENT} />
      {/* Call To Action */}
      <FinalCta content={FINAL_CTA_CONTENT} />
    </>
  )
}
