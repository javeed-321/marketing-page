import type { ReactNode } from 'react'

import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { MinusIcon } from '@/components/icons/minus-icon'
import type { PricingItem, TermItem } from '@/lib/article-types'

/**
 * One entry in a listicle post ("7 Best GitBook Alternatives"), repeated per tool.
 *
 * Custom component: item 3 of the block list came through blank, and our nearest
 * kit block (`features-stacked-alternating-with-demos`) requires a `demo` node and
 * gives it half the width — these entries have no screenshots, so half the block
 * would render empty. Written to the site's own tokens.
 *
 * Shape mirrors documentation.ai's listicle entries exactly:
 * heading → intro → body → Key Features → "Use X if…" → pricing tiers → note →
 * pros/cons → Verdict. Everything after the heading is optional, because the
 * incumbent teardown at the top of a listicle carries pros/cons while the
 * ranked entries below often carry only features and a verdict.
 *
 * `TermItem` and `PricingItem` are unions with a plain `string` arm so the two
 * bullet styles the live posts mix — plain, and **bold lead-in** plus
 * description — share one list without a second component.
 */

function TermList({ items, tone = 'pro' }: { items: TermItem[]; tone?: 'pro' | 'con' }) {
  const Icon = tone === 'pro' ? CheckmarkIcon : MinusIcon

  return (
    <ul role="list" className="flex flex-col gap-2">
      {items.map((item) => {
        const key = typeof item === 'string' ? item : item.term
        return (
          <li key={key} className="flex gap-3 text-base/7 text-mauve-700 dark:text-mauve-400">
            <Icon
              aria-hidden="true"
              className={tone === 'pro' ? 'mt-1 size-3.5 shrink-0 stroke-red-500' : 'mt-1 size-3.5 shrink-0 stroke-mauve-500'}
            />
            {typeof item === 'string' ? (
              <span>{item}</span>
            ) : (
              <span>
                <span className="font-semibold text-mauve-950 dark:text-white">{item.term}:</span> {item.desc}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-base/7 font-semibold text-mauve-950 dark:text-white">{label}</p>
      {children}
    </div>
  )
}

export function FeatureListEntry({
  heading,
  intro,
  paragraphs,
  keyFeaturesLabel = 'Key features',
  keyFeatures,
  useIf,
  useIfItems,
  pricing,
  note,
  pros,
  cons,
  verdict,
}: {
  heading: ReactNode
  intro?: string
  paragraphs?: string[]
  keyFeaturesLabel?: string
  keyFeatures: TermItem[]
  useIf?: string
  useIfItems?: string[]
  pricing?: PricingItem[]
  note?: string
  pros?: string[]
  cons?: string[]
  verdict?: string
}) {
  return (
    <div className="flex flex-col gap-5 border-t border-card-border py-8 dark:border-white/10">
      <h3 className="font-display text-xl/7 font-medium tracking-[-0.02em] text-mauve-950 dark:text-white">
        {heading}
      </h3>

      {intro && <p className="text-base/7 text-mauve-700 dark:text-mauve-400">{intro}</p>}
      {paragraphs?.map((paragraph) => (
        <p key={paragraph} className="text-base/7 text-mauve-700 dark:text-mauve-400">
          {paragraph}
        </p>
      ))}

      {keyFeatures.length > 0 && (
        <Field label={keyFeaturesLabel}>
          <TermList items={keyFeatures} />
        </Field>
      )}

      {useIfItems && useIfItems.length > 0 && (
        <Field label="Use it if you want">
          <TermList items={useIfItems} />
        </Field>
      )}

      {useIf && (
        <p className="text-base/7 text-mauve-700 dark:text-mauve-400">
          <span className="font-semibold text-mauve-950 dark:text-white">Use it if</span> {useIf}
        </p>
      )}

      {pricing && pricing.length > 0 && (
        <Field label="Pricing">
          {/* Named tiers get their own line; free-text pricing stays inline, as
            * the shorter entries on the live site do. */}
          {pricing.every((tier) => typeof tier === 'string') ? (
            <p className="text-base/7 text-mauve-700 dark:text-mauve-400">{pricing.join(' · ')}</p>
          ) : (
            <ul role="list" className="flex flex-col gap-2">
              {pricing.map((tier) => {
                const name = typeof tier === 'string' ? tier : tier.name
                return (
                  <li key={name} className="text-base/7 text-mauve-700 dark:text-mauve-400">
                    {typeof tier === 'string' ? (
                      tier
                    ) : (
                      <>
                        <span className="font-semibold text-mauve-950 dark:text-white">{tier.name}:</span> {tier.detail}
                      </>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </Field>
      )}

      {note && <p className="text-base/7 text-mauve-700 dark:text-mauve-400">{note}</p>}

      {((pros && pros.length > 0) || (cons && cons.length > 0)) && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pros && pros.length > 0 && (
            <Field label="Pros">
              <TermList items={pros} />
            </Field>
          )}
          {cons && cons.length > 0 && (
            <Field label="Cons">
              <TermList items={cons} tone="con" />
            </Field>
          )}
        </div>
      )}

      {verdict && (
        <p className="border-l-2 border-red-500 pl-4 text-base/7 text-mauve-700 dark:text-mauve-400">{verdict}</p>
      )}
    </div>
  )
}
