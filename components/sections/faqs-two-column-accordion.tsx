import { clsx } from 'clsx/lite'
import { type ComponentProps, type ReactNode } from 'react'
import { Container } from '../elements/container'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { MinusIcon } from '../icons/minus-icon'
import { PlusIcon } from '../icons/plus-icon'

// Native <details> so open AND close both animate: the .faq-disclosure rules in
// globals.css transition ::details-content's height between 0 and auto (via
// `interpolate-size: allow-keywords`). Unlike a hidden-attribute disclosure, the
// browser keeps the content rendered while the close transition plays.
export function Faq({
  question,
  answer,
  ...props
}: { question: ReactNode; answer: ReactNode } & ComponentProps<'details'>) {
  return (
    <details className="faq-disclosure group" {...props}>
      <summary className="flex w-full cursor-pointer list-none items-start justify-between gap-6 py-4 text-left text-base/6 text-mauve-950 select-none dark:text-white [&::-webkit-details-marker]:hidden">
        {question}
        <PlusIcon className="h-lh group-open:hidden" />
        <MinusIcon className="h-lh not-group-open:hidden" />
      </summary>
      <div className="flex flex-col gap-2 pr-12 pb-4 text-sm/5 text-mauve-700 dark:text-mauve-400">{answer}</div>
    </details>
  )
}

export function FAQsTwoColumnAccordion({
  headline,
  subheadline,
  className,
  children,
  ...props
}: {
  headline?: ReactNode
  subheadline?: ReactNode
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('py-16', className)} {...props}>
      {/* Centered heading + a single centered question column — matches documentation.ai */}
      <Container className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <Subheading>{headline}</Subheading>
          {subheadline && <Text className="flex flex-col gap-4 text-pretty">{subheadline}</Text>}
        </div>
        <div className="w-full max-w-3xl divide-y divide-card-border dark:divide-white/10">{children}</div>
      </Container>
    </section>
  )
}
