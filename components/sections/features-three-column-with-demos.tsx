import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Section } from '../elements/section'

export function FeatureThreeColumnWithDemos({
  demo,
  headline,
  subheadline,
  className,
  ...props
}: {
  demo: ReactNode
  headline: ReactNode
  subheadline: ReactNode
} & ComponentProps<'div'>) {
  return (
    <div className={clsx('rounded-3xl bg-card p-2 ring-1 ring-card-border dark:bg-white/5 dark:ring-white/10', className)} {...props}>
      <div className="relative overflow-hidden rounded-sm dark:after:absolute dark:after:inset-0 dark:after:rounded-sm dark:after:outline-1 dark:after:-outline-offset-1 dark:after:outline-white/10">
        {demo}
      </div>
      <div className="p-6 sm:p-10 lg:p-6">
        <h3 className="font-display text-lg/normal font-normal text-mauve-950 dark:text-white">{headline}</h3>
        <div className="mt-2 flex flex-col gap-4 text-sm/5 text-mauve-700 dark:text-mauve-400">{subheadline}</div>
      </div>
    </div>
  )
}

export function Features({
  features,
  ...props
}: { features: ReactNode } & Omit<ComponentProps<typeof Section>, 'children'>) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">{features}</div>
    </Section>
  )
}
