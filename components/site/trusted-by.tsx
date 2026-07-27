import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

import { Container } from '@/components/elements/container'
import { LogoMarquee } from '@/components/site/logo-marquee'

export type CustomerLogo = {
  src: string
  /** Company name — used for the alt text. */
  name: string
  /** Rendered width in px. Each logo is optically sized so the wordmarks read evenly. */
  width: number
}

/** Everything this section *says*. Plain data — no JSX, no styling. */
export type TrustedByContent = {
  headline: string
  /** Second line, rendered in brand red at the same size as the headline. */
  subheadline: string
  logos: CustomerLogo[]
}

/**
 * Homepage copy for section 6 — the only place these words live.
 * Logos are in the same order (and at the same optical widths) as documentation.ai.
 */
export const TRUSTED_BY_CONTENT: TrustedByContent = {
  headline: "The world's best product teams trust Documentation.AI",
  subheadline: 'From next-gen start-ups to established enterprises.',
  logos: [
    { name: 'ContaSimples', src: '/img/logos/customers/1.png', width: 96 },
    { name: 'Transfi', src: '/img/logos/customers/2.png', width: 116 },
    { name: 'Lendermarket', src: '/img/logos/customers/3.png', width: 146 },
    { name: 'CoachPilot', src: '/img/logos/customers/4.png', width: 126 },
    { name: 'Dolphine', src: '/img/logos/customers/5.png', width: 116 },
    { name: 'Datafiniti', src: '/img/logos/customers/6.png', width: 126 },
    { name: 'Protecto', src: '/img/logos/customers/7.png', width: 126 },
    { name: 'Videograph', src: '/img/logos/customers/8.png', width: 96 },
    { name: 'Osprey Measurement', src: '/img/logos/customers/9.png', width: 106 },
    { name: 'POSIMYTH Innovations', src: '/img/logos/customers/10.png', width: 116 },
    { name: 'TexAu', src: '/img/logos/customers/11.png', width: 106 },
    { name: 'Sotatek', src: '/img/logos/customers/12.png', width: 126 },
  ],
}

// Section 6 — customer logo marquee.
// Both headline lines are the same 24px/120% display type (only the colour differs), which is
// what makes the pair read as one calm two-line statement rather than heading + caption.
// Presentational only: it owns layout and styling, `content` owns every word.
export function TrustedBy({
  content,
  className,
  ...props
}: { content: TrustedByContent } & Omit<ComponentProps<'section'>, 'content'>) {
  const { headline, subheadline, logos } = content

  return (
    <section id="trusted-by" className={clsx('py-16', className)} {...props}>
      <Container className="flex flex-col gap-10 sm:gap-16">
        <div className="flex flex-col text-center font-display text-2xl/[1.2] font-normal tracking-[-0.02em] text-pretty">
          <h2 className="text-mauve-950 dark:text-white">{headline}</h2>
          <p className="text-red-500">{subheadline}</p>
        </div>

        <LogoMarquee logos={logos} />
      </Container>
    </section>
  )
}
