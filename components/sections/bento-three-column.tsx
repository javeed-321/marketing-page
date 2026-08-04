import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Section } from '../elements/section'

/**
 * `card` is the bento chrome — tinted panel, rounded, padded.
 * `bare` drops it for the same icon/heading/body stack on the page background,
 * which is what a feature flanking an illustration needs.
 */
export type BentoCardVariant = 'card' | 'bare'

const VARIANTS: Record<BentoCardVariant, string> = {
  card: 'gap-10 rounded-3xl bg-card p-8 dark:bg-white/5',
  bare: 'gap-8 py-8 lg:py-10',
}

export function BentoCard({
  icon,
  headline,
  subheadline,
  variant = 'card',
  className,
  ...props
}: {
  icon?: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  variant?: BentoCardVariant
} & ComponentProps<'div'>) {
  return (
    <div className={clsx('flex flex-col', VARIANTS[variant], className)} {...props}>
      {icon && (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-mauve-950 dark:bg-white/10 dark:text-white">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lg/normal font-normal text-mauve-950 dark:text-white">{headline}</h3>
        <div className="flex flex-col gap-4 text-sm/5 text-mauve-700 dark:text-mauve-400">{subheadline}</div>
      </div>
    </div>
  )
}

export function BentoThreeColumn({
  cards,
  ...props
}: {
  cards: ReactNode
} & Omit<ComponentProps<typeof Section>, 'children'>) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{cards}</div>
    </Section>
  )
}
