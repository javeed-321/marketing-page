'use client'

import { clsx } from 'clsx/lite'
import { useState, type ComponentProps, type ReactNode } from 'react'
import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Text } from '../elements/text'
import { PlusIcon } from '../icons/plus-icon'

/**
 * Four-tier pricing section in the divided layout — the tiers share one slab
 * split by 1px column rules rather than each sitting in its own tinted card
 * (which is what `pricing-multi-tier` and `pricing-hero-multi-tier` do).
 *
 * This is an approximation of the Tailwind Plus divided-pricing pattern rather
 * than a verified port of it: the block's own source is not in this repo, so the
 * `divide-y … lg:grid-cols-4 lg:divide-x lg:divide-y-0` column rules, the
 * per-tier `p-8` well and the `items-baseline` price row were written to match
 * documentation.ai's layout, not diffed against a Tailwind Plus file. Treat the
 * class lists as this repo's own, and restyle freely.
 *
 * Colours, type and spacing all come from the site's tokens and primitives
 * (`Container`, `Heading`, `Text`, `CheckmarkIcon`, and whatever button the page
 * passes as `cta`).
 */

export type Billing = 'monthly' | 'yearly'

/**
 * A numeric price gets the full display size. A worded one ("Custom Pricing")
 * needs `sm`, or it wraps to two lines and pushes that column's description and
 * button out of step with the other three.
 */
const PRICE_SIZES = {
  lg: 'text-[2.5rem]/[1.1]',
  sm: 'text-[1.75rem]/[1.15]',
}

export function Tier({
  name,
  price,
  priceSize = 'lg',
  period,
  note,
  subheadline,
  features,
  cta,
  className,
  ...props
}: {
  name: ReactNode
  price: ReactNode
  priceSize?: keyof typeof PRICE_SIZES
  /** Sits on the price baseline — "/month", "/forever". Omit for "Custom Pricing". */
  period?: ReactNode
  /** Fine print after the period, e.g. "(billed yearly)". Never wraps away from it. */
  note?: ReactNode
  subheadline: ReactNode
  features?: ReactNode[]
  cta: ReactNode
} & ComponentProps<'div'>) {
  return (
    // From `lg` the tier stops being its own flex column and becomes a subgrid
    // of the panel's five rows, so name / price / description / button / features
    // sit on one baseline across all four tiers no matter how tall each one's
    // copy runs. Below `lg` the tiers stack, and a plain flex column is correct.
    <div className={clsx('flex flex-col p-8 lg:row-span-5 lg:grid lg:grid-rows-subgrid lg:gap-0', className)} {...props}>
      <h3 className="text-base/7 text-mauve-950 dark:text-white">{name}</h3>

      <p className="mt-6 flex items-baseline gap-x-2">
        <span
          className={clsx(
            'font-display font-medium tracking-[-0.03em] text-mauve-950 dark:text-white',
            PRICE_SIZES[priceSize],
          )}
        >
          {price}
        </span>
        {/* `whitespace-nowrap` keeps "/month (billed yearly)" on the price line —
          * letting it wrap makes that column's price row a line taller than the
          * others, which the subgrid then applies to all four. */}
        {period && (
          <span className="text-sm/6 whitespace-nowrap text-mauve-500">
            {period}
            {note && <span className="ml-1 text-xs/6">{note}</span>}
          </span>
        )}
      </p>

      <div className="mt-6 flex flex-col gap-4 text-sm/6 text-mauve-700 dark:text-mauve-400">{subheadline}</div>

      {/* `*:w-full` makes the button fill the column without the page having to
        * know — the site's button components are `inline-flex shrink-0`.
        * `*:h-10` sets the height here rather than adding a size to
        * `elements/button.tsx`: `lg` (36px) is right everywhere else on the
        * site, and this card wants the 40px documentation.ai uses. The buttons
        * centre their label, so overriding height leaves the padding harmless. */}
      <div className="mt-8 flex flex-col self-start *:h-10 *:w-full">{cta}</div>

      {/* Always renders, even with no features: the subgrid above spans a fixed
        * five rows, so a missing child would shift this column off the baseline. */}
      {features && features.length > 0 ? (
        <ul className="mt-8 space-y-3 text-sm/6 text-mauve-700 dark:text-mauve-400">
          {features.map((feature, index) => (
            <li key={index} className="flex gap-3">
              <PlusIcon className="h-lh shrink-0 stroke-mauve-500 dark:stroke-mauve-400" />
              <p>{feature}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div />
      )}
    </div>
  )
}

function BillingSwitch({
  yearly,
  onChange,
  monthlyLabel,
  yearlyLabel,
  savingLabel,
}: {
  yearly: boolean
  onChange: (yearly: boolean) => void
  monthlyLabel: ReactNode
  yearlyLabel: ReactNode
  savingLabel?: ReactNode
}) {
  return (
    <div className="flex shrink-0 items-center gap-3 text-sm/6 font-medium">
      <span className={clsx(yearly ? 'text-mauve-500' : 'text-mauve-950 dark:text-white')}>{monthlyLabel}</span>

      <button
        type="button"
        role="switch"
        aria-checked={yearly}
        aria-label={`Bill ${yearly ? 'monthly' : 'yearly'}`}
        onClick={() => onChange(!yearly)}
        className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-mauve-300 transition-colors aria-checked:bg-mauve-950 dark:bg-white/20 dark:aria-checked:bg-white"
      >
        <span className="size-5 translate-x-0.5 rounded-full bg-white shadow-sm transition-transform group-aria-checked:translate-x-5.5 dark:group-aria-checked:bg-mauve-950" />
      </button>

      <span className={clsx(yearly ? 'text-mauve-950 dark:text-white' : 'text-mauve-500')}>
        {yearlyLabel}
        {savingLabel && <span className="ml-1.5 text-emerald-600 dark:text-emerald-400">{savingLabel}</span>}
      </span>
    </div>
  )
}

export function PricingFourTierDivided({
  eyebrow,
  headline,
  subheadline,
  tiers,
  monthlyLabel = 'Monthly',
  yearlyLabel = 'Yearly',
  savingLabel,
  footer,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  /**
   * Both billing periods, pre-rendered. Flipping the switch swaps which set is
   * returned, and because both are `<Tier>` elements in the same order React
   * reconciles them in place — only the price and period text change. Nothing
   * unmounts, so the section does not blink or reflow on toggle.
   */
  tiers: Record<Billing, ReactNode>
  monthlyLabel?: ReactNode
  yearlyLabel?: ReactNode
  /** Rendered in green after `yearlyLabel`, e.g. "(Save 20%)". */
  savingLabel?: ReactNode
  footer?: ReactNode
} & ComponentProps<'section'>) {
  const [yearly, setYearly] = useState(false)

  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container>
        {/* Headline left, switch right — documentation.ai splits the header
          * rather than stacking it centred. */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            {eyebrow}
            <Heading size="sm">{headline}</Heading>
            <Text className="flex max-w-4xl flex-col gap-4">{subheadline}</Text>
          </div>

          <BillingSwitch
            yearly={yearly}
            onChange={setYearly}
            monthlyLabel={monthlyLabel}
            yearlyLabel={yearlyLabel}
            savingLabel={savingLabel}
          />
        </div>
      </Container>

      {/* The horizontal rules run edge to edge while the vertical ones stop at
        * the content column, so the tiers read as one full-width slab. That is
        * why this wrapper sits outside Container and repeats its width classes
        * without the `lg` gutter — the outer `border-x` has to land on the
        * content edge, not inside the padding. */}
      <div className="mt-10 border-y border-mauve-950/10 sm:mt-16 dark:border-white/10">
        <div className="mx-auto w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-7xl lg:px-0">
          {/*
           * Three steps, matching documentation.ai: one column, then two from
           * `lg`, then all four from `xl`.
           *
           * The dividers only appear at the steps where they are correct.
           * `divide-*` walks DOM order, not grid position, so in the two-column
           * step `divide-x` would draw a rule down the left edge of the tier
           * that wraps to row two, and `divide-y` a rule through the middle of
           * row one. That step uses a gap instead; one and four columns lay out
           * in a single line each, where the rules behave.
           *
           * The five explicit rows are what each tier's `grid-rows-subgrid`
           * hooks into: name, price, description, button, features. At two
           * columns the second pair lands on implicit rows 6–10, which subgrid
           * tracks just the same, so buttons stay aligned per row.
           */}
          <div className="grid grid-cols-1 divide-y divide-mauve-950/10 sm:border-x sm:border-mauve-950/10 lg:grid-cols-2 lg:grid-rows-[auto_auto_auto_auto_auto] lg:gap-x-8 lg:gap-y-10 lg:divide-y-0 xl:grid-cols-4 xl:gap-0 xl:divide-x dark:divide-white/10 dark:sm:border-white/10">
            {yearly ? tiers.yearly : tiers.monthly}
          </div>
        </div>
      </div>

      {footer && <Container className="mt-10 sm:mt-16">{footer}</Container>}
    </section>
  )
}
