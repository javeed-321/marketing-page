import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'

/**
 * Chat assistant demo — custom component.
 *
 * Tailwind Plus has no mock-UI block, so this is written to the site's own
 * tokens rather than pasted from the kit — the same footing as
 * `pros-cons-two-column`. It is a still of an assistant answering inside the
 * docs: skeleton context, the user's question, the agent's reading trace, a
 * streaming answer, and the ask input.
 *
 * Every part is exported so a caller can reorder or drop one, and the composed
 * `ChatAssistantDemo` is the arrangement the homepage uses.
 *
 * Colours assume a **dark/red card behind it** (the `red` variant of
 * `bento-featured`): bars are white at low opacity, trace text is white/80. On a
 * light surface it will disappear.
 */

/** One skeleton line. Width comes from the caller so a stack can taper. */
export function ChatBar({ className, ...props }: ComponentProps<'span'>) {
  return <span className={clsx('block h-2.5 rounded-full bg-white/25', className)} {...props} />
}

/** The page content the assistant is reading, as tapering skeleton lines. */
export function ChatSkeleton({
  widths = ['w-full', 'w-4/5', 'w-2/3'],
  className,
  ...props
}: { widths?: string[] } & ComponentProps<'div'>) {
  return (
    <div className={clsx('flex flex-col gap-2', className)} {...props}>
      {widths.map((width, i) => (
        <ChatBar key={i} className={width} />
      ))}
    </div>
  )
}

/** The user's question, as a right-aligned bubble. */
export function ChatQuestion({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx('flex justify-end', className)} {...props}>
      <span className="rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-red-600">{children}</span>
    </div>
  )
}

function SearchGlyph() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx={11} cy={11} r={7} stroke="currentColor" strokeWidth={2} />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

/** The agent's "reading…" trace — one line per source it consults. */
export function ChatTrace({ steps, className, ...props }: { steps: string[] } & ComponentProps<'div'>) {
  return (
    <div className={clsx('flex flex-col gap-2 text-sm text-white/80', className)} {...props}>
      {steps.map((step, i) => (
        <span key={i} className="flex items-center gap-2">
          <SearchGlyph />
          {step}
        </span>
      ))}
    </div>
  )
}

/** The answer streaming back, still rendering. */
export function ChatAnswer({
  widths = ['w-full', 'w-5/6'],
  className,
  ...props
}: { widths?: string[] } & ComponentProps<'div'>) {
  return (
    <div className={clsx('flex items-start gap-2', className)} {...props}>
      <SparklesIcon className="mt-0.5 size-4 shrink-0 text-white/90" />
      <div className="flex flex-1 flex-col gap-2">
        {widths.map((width, i) => (
          <ChatBar key={i} className={width} />
        ))}
      </div>
    </div>
  )
}

/** The ask box at the foot of the panel. Decorative — not a real input. */
export function ChatAskInput({
  placeholder,
  className,
  ...props
}: { placeholder: string } & ComponentProps<'div'>) {
  return (
    <div
      className={clsx('flex items-center justify-between gap-3 rounded-full bg-white px-5 py-3', className)}
      {...props}
    >
      <span className="text-sm text-mauve-400">{placeholder}</span>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-mauve-950 text-white">
        <ArrowNarrowRightIcon className="size-4" />
      </span>
    </div>
  )
}

export function ChatAssistantDemo({
  question,
  steps,
  placeholder,
  className,
  ...props
}: {
  /** The user's question bubble. */
  question: string
  /** The agent's reading-trace lines, one per entry. */
  steps: string[]
  /** Placeholder text in the ask input. */
  placeholder: string
} & ComponentProps<'div'>) {
  return (
    <div className={clsx('flex flex-col gap-5 p-8 pb-0', className)} {...props}>
      <ChatSkeleton />
      <ChatQuestion>{question}</ChatQuestion>
      <ChatTrace steps={steps} />
      <ChatAnswer />
      <ChatAskInput placeholder={placeholder} className="mt-1" />
    </div>
  )
}
