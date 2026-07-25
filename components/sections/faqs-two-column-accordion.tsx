import { ElDisclosure } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import { type ComponentProps, type ReactNode, useId } from 'react'
import { Container } from '../elements/container'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { MinusIcon } from '../icons/minus-icon'
import { PlusIcon } from '../icons/plus-icon'

export function Faq({
  id,
  question,
  answer,
  ...props
}: { question: ReactNode; answer: ReactNode } & ComponentProps<'div'>) {
  const autoId = useId()
  id = id || autoId

  return (
    <div id={id} {...props}>
      <button
        type="button"
        id={`${id}-question`}
        command="--toggle"
        commandfor={`${id}-answer`}
        className="flex w-full items-start justify-between gap-6 py-4 text-left text-base/6 text-mauve-950 dark:text-white"
      >
        {question}
        <PlusIcon className="h-lh in-aria-expanded:hidden" />
        <MinusIcon className="h-lh not-in-aria-expanded:hidden" />
      </button>
      {/* Smooth open/close: the elements runtime toggles data-closed during the
        * transition; `interpolate-size: allow-keywords` (globals.css) lets height
        * animate from 0 to auto in Chromium. Other engines animate opacity only. */}
      <ElDisclosure
        id={`${id}-answer`}
        hidden
        className="block h-auto overflow-hidden transition-[height,opacity] duration-300 ease-out data-closed:h-0 data-closed:opacity-0"
      >
        <div className="-mt-2 flex flex-col gap-2 pr-12 pb-4 text-sm/5 text-mauve-700 dark:text-mauve-400">{answer}</div>
      </ElDisclosure>
    </div>
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
