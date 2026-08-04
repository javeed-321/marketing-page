import type { ComponentProps } from 'react'

import { ButtonLink, PlainButtonLink, type CtaLink } from '@/components/elements/button'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'

/** Everything this section *says*. Plain data — no JSX, no styling. */
export type FinalCtaContent = {
  headline: string
  /** Reassurance line under the headline, set in mono. */
  subheadline: string
  /** Solid button. Omit the key to hide it. */
  primaryCta?: CtaLink
  /** Text-only button. Omit the key to hide it. */
  secondaryCta?: CtaLink
}

/** Homepage copy for section 8 — the only place these words live. */
export const FINAL_CTA_CONTENT: FinalCtaContent = {
  headline: 'Ready to build docs that Humans and AI love with Documentation.AI?',
  subheadline: 'Live in under 5 min · No credit card required',
  primaryCta: { label: 'Start for Free', href: 'https://dashboard.documentation.ai/' },
  secondaryCta: { label: 'Book a Demo', href: '/get-a-demo' },
}

// Section 8 — Final CTA band.
// Presentational only: it owns layout and styling, `content` owns every word.
export function FinalCta({
  content,
  ...props
}: { content: FinalCtaContent } & Omit<
  ComponentProps<typeof CallToActionSimpleCentered>,
  'content' | 'cta' | 'headline' | 'subheadline'
>) {
  const { headline, subheadline, primaryCta, secondaryCta } = content

  return (
    <CallToActionSimpleCentered
      id="cta"
      headline={headline}
      subheadline={
        <p className="font-mono text-sm/[21px] tracking-[-0.01em] text-mauve-500">{subheadline}</p>
      }
      cta={
        (primaryCta || secondaryCta) && (
          <>
            {primaryCta && (
              <ButtonLink href={primaryCta.href} size="lg">
                {primaryCta.label}
              </ButtonLink>
            )}

            {secondaryCta && (
              <PlainButtonLink href={secondaryCta.href} size="lg">
                {secondaryCta.label}
              </PlainButtonLink>
            )}
          </>
        )
      }
      {...props}
    />
  )
}
