import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Text } from '../elements/text'

/**
 * Centered hero using the Tailwind Plus "simple centered" *layout and spacing*
 * scaffold — a `max-w-2xl` column and the mb-8 / mt-8 / mt-10 stack — with this
 * site's own primitives for every visual decision (Heading, Text, brand tokens).
 *
 * Vertical rhythm matches the block exactly: symmetric `py-32 sm:py-48 lg:py-56`.
 * The block's extra `pt-14` offset is the one omission — it existed only to clear
 * an absolutely positioned header, and this site's navbar is `sticky` and in
 * normal flow, so keeping it would add 56px of dead space.
 *
 * Differs from `HeroCenteredWithDemo` only in spacing; that one uses the
 * standard `py-16` section rhythm.
 */
export function HeroCenteredTall({
  eyebrow,
  headline,
  subheadline,
  cta,
  demo,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  cta?: ReactNode
  /** Full-width visual below the copy column. */
  demo?: ReactNode
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('px-6 lg:px-8', className)} {...props}>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        {eyebrow && <div className="mb-8 flex justify-center">{eyebrow}</div>}

        <Heading className="text-center">{headline}</Heading>

        <Text size="lg" className="mt-8 flex flex-col gap-4 text-center">
          {subheadline}
        </Text>

        {cta && <div className="mt-10 flex flex-wrap items-center justify-center gap-3">{cta}</div>}
      </div>

      {/* Outside the max-w-2xl copy column so wide visuals are not squeezed. */}
      {demo && <Container className="pb-32">{demo}</Container>}
    </section>
  )
}
