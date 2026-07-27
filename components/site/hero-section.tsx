import type { ComponentProps, ReactNode } from 'react'

import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, SoftButtonLink, type CtaLink } from '@/components/elements/button'
import { Paragraphs, type Prose } from '@/components/elements/text'
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo'

/** Everything the hero *says*. Plain data — no JSX, no styling. */
export type HeroContent = {
  /** Announcement pill above the headline. Omit the key to hide it. */
  badge?: { text: string; href?: string }
  headline: string
  subheadline: Prose
  /** Solid button. Omit the key to hide it. */
  primaryCta?: CtaLink
  /** Soft (light-filled) button. Omit the key to hide it. */
  secondaryCta?: CtaLink
}

/** Homepage hero copy — the only place these words live. */
export const HERO_CONTENT: HeroContent = {
  badge: {
    text: 'Knowledge Infrastructure For AI Agents And Humans',
    href: '#',
  },
  headline: 'The AI Documentation Platform',
  subheadline:
    'Create self-updating product docs, knowledge bases, API references, and help centers. Make knowledge easy for AI agents and humans to access. Reduce support and accelerate onboarding.',
  primaryCta: { label: 'Start for Free', href: 'https://dashboard.documentation.ai/' },
  secondaryCta: { label: 'Book a Demo', href: 'https://documentation.ai/get-a-demo' },
}

// Section 0 — Hero.
// Presentational only: it owns layout and styling, `content` owns every word.
// To use it on another page, pass that page's content object — don't edit this file.
export function HeroSection({
  content,
  demo,
  ...props
}: {
  content: HeroContent
  /** Visual below the copy, e.g. `<ProductTabs />`. Omit for a copy-only hero. */
  demo?: ReactNode
} & Omit<
  ComponentProps<typeof HeroLeftAlignedWithDemo>,
  'content' | 'eyebrow' | 'headline' | 'subheadline' | 'cta' | 'demo'
>) {
  const { badge, headline, subheadline, primaryCta, secondaryCta } = content

  return (
    <HeroLeftAlignedWithDemo
      id="hero"
      eyebrow={badge && <AnnouncementBadge text={badge.text} href={badge.href} />}
      headline={headline}
      subheadline={<Paragraphs>{subheadline}</Paragraphs>}
      cta={
        (primaryCta || secondaryCta) && (
          <div className="flex items-center gap-3">
            {primaryCta && (
              <ButtonLink href={primaryCta.href} size="lg">
                {primaryCta.label}
              </ButtonLink>
            )}

            {secondaryCta && (
              <SoftButtonLink href={secondaryCta.href} size="lg">
                {secondaryCta.label}
              </SoftButtonLink>
            )}
          </div>
        )
      }
      demo={demo}
      {...props}
    />
  )
}
