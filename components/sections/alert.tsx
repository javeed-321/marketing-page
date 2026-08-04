import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  LightBulbIcon,
} from '@heroicons/react/20/solid'
import { clsx } from 'clsx/lite'
import type { ComponentType, ReactNode, SVGProps } from 'react'

/**
 * Tailwind Plus "Application UI — Alerts (with accent border)".
 *
 * Two changes from the shipped source, both forced rather than stylistic:
 *  - the hardcoded copy became a `children` slot
 *  - the inner `<p>` became a `<div>`, because a TL;DR carries a `<ul>` and a
 *    list is not valid inside a paragraph
 *
 * The kit ships this block in several accent colours; `tone` selects between
 * them rather than inventing a new look. `neutral` is the one addition — the
 * kit has no gray variant, and a TL;DR is a summary rather than a warning, so
 * it takes the site's own card/mauve tokens. Every other tone's class names
 * are exactly as pasted — do not retokenize those to mauve/card.
 */

export type AlertTone = 'neutral' | 'info' | 'success' | 'warning'

const TONES: Record<
  AlertTone,
  { box: string; icon: string; title: string; body: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }
> = {
  // The live posts' inline notes are a plain light panel — no accent bar, no
  // icon — so `neutral` drops both rather than borrowing the kit's yellow.
  neutral: {
    box: 'rounded-xl border border-card-border bg-card dark:border-white/10 dark:bg-white/5',
    icon: 'hidden',
    title: 'text-mauve-950 dark:text-white',
    body: 'text-mauve-700 dark:text-mauve-400',
    Icon: LightBulbIcon,
  },
  info: {
    box: 'rounded-r-xl border-l-4 border-blue-400 bg-blue-50',
    icon: 'text-blue-400',
    title: 'text-blue-800',
    body: 'text-blue-700',
    Icon: InformationCircleIcon,
  },
  success: {
    box: 'rounded-r-xl border-l-4 border-green-400 bg-green-50',
    icon: 'text-green-400',
    title: 'text-green-800',
    body: 'text-green-700',
    Icon: CheckCircleIcon,
  },
  warning: {
    box: 'rounded-r-xl border-l-4 border-yellow-400 bg-yellow-50',
    icon: 'text-yellow-400',
    title: 'text-yellow-800',
    body: 'text-yellow-700',
    Icon: ExclamationTriangleIcon,
  },
}

export function Alert({
  children,
  tone = 'neutral',
  title,
}: {
  children: ReactNode
  tone?: AlertTone
  title?: ReactNode
}) {
  const tokens = TONES[tone]

  const hasIcon = tone !== 'neutral'

  return (
    <div className={clsx('p-5', tokens.box)}>
      <div className="flex">
        {hasIcon && (
          <div className="shrink-0">
            <tokens.Icon aria-hidden="true" className={clsx('size-5', tokens.icon)} />
          </div>
        )}
        <div className={clsx(hasIcon && 'ml-3')}>
          {title && <p className={clsx('text-base/7 font-semibold', tokens.title)}>{title}</p>}
          <div className={clsx('text-base/7', tokens.body, title && 'mt-2')}>{children}</div>
        </div>
      </div>
    </div>
  )
}
