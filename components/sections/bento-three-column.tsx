import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Section } from '../elements/section'

export function BentoCard({
  icon,
  headline,
  subheadline,
  className,
  ...props
}: {
  icon?: ReactNode
  headline: ReactNode
  subheadline: ReactNode
} & ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-10 rounded-3xl bg-card p-8 ring-1 ring-card-border dark:bg-white/5 dark:ring-white/10',
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-mauve-950 ring-1 ring-card-border dark:bg-white/10 dark:text-white dark:ring-white/10">
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
