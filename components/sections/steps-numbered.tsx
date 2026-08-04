import type { ReactNode } from 'react'

/**
 * Numbered steps — custom component.
 *
 * Explainer posts render process lists as "Step 1: AI gathers information"
 * followed by a paragraph. That is a bold lead-in inside the body flow, not a
 * timeline widget — the live articles are a single narrow prose column and
 * carry no ornamental chrome, so this adds none.
 *
 * Kept as its own component rather than folded into `prose` so the numbering
 * stays derived from array order instead of being typed into the copy, which
 * is what breaks when a step is inserted.
 */
export function StepsNumbered({
  heading,
  intro,
  steps,
  stepLabel = 'Step',
}: {
  heading?: ReactNode
  intro?: string
  steps: { title: string; body: string }[]
  stepLabel?: string
}) {
  return (
    <div className="flex flex-col gap-4">
      {heading && (
        <h2 className="font-display text-2xl/8 font-medium tracking-[-0.02em] text-mauve-950 dark:text-white">
          {heading}
        </h2>
      )}
      {intro && <p className="text-base/7 text-mauve-700 dark:text-mauve-400">{intro}</p>}

      <ol className="flex flex-col gap-4">
        {steps.map((step, i) => (
          <li key={step.title} className="text-base/7 text-mauve-700 dark:text-mauve-400">
            <strong className="font-semibold text-mauve-950 dark:text-white">
              {stepLabel} {i + 1}: {step.title}
            </strong>
            <br />
            {step.body}
          </li>
        ))}
      </ol>
    </div>
  )
}
