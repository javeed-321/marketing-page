import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'

// Centered CTA inside a big rounded card (matches documentation.ai: headline,
// buttons row, then the mono fine-print note below the buttons).
export function CallToActionSimpleCentered({
  headline,
  subheadline,
  cta,
  className,
  ...props
}: {
  headline: ReactNode
  subheadline?: ReactNode
  cta?: ReactNode
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container>
        <div className="flex flex-col items-center gap-10 rounded-3xl bg-card px-6 py-20 ring-1 ring-card-border sm:px-16 dark:bg-white/5 dark:ring-white/10">
          <Subheading className="max-w-3xl text-center">{headline}</Subheading>
          <div className="flex flex-col items-center gap-5">
            {cta}
            {subheadline && (
              <Text className="flex max-w-3xl flex-col gap-4 text-center text-pretty">{subheadline}</Text>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
