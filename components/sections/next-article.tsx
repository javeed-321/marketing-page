import Link from 'next/link'

import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'

/**
 * Next article — custom component.
 *
 * Every documentation.ai post closes with a single teaser link to the next one.
 * The kit's `blog-three-column-with-images` is the nearest block but renders a
 * three-card grid on its own white section background, which is far too heavy
 * to end an article on and would need cover art this link does not have.
 *
 * Written to the site's tokens: one full-width card, the label as an eyebrow,
 * the whole card clickable via the stretched-link pattern the kit blocks use.
 */
export function NextArticle({
  label = 'Next article',
  title,
  href,
  description,
}: {
  label?: string
  title: string
  href: string
  description?: string
}) {
  return (
    <div className="group relative flex items-center gap-6 rounded-2xl border border-card-border bg-card p-6 transition-colors hover:border-red-500/40 dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-col gap-1">
        <p className="text-sm/5 font-semibold text-mauve-500">{label}</p>
        <h2 className="font-display text-lg/7 font-medium text-mauve-950 transition-colors group-hover:text-red-500 dark:text-white">
          <Link href={href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {title}
          </Link>
        </h2>
        {description && <p className="text-base/7 text-mauve-700 dark:text-mauve-400">{description}</p>}
      </div>
      {/* The icon strokes `currentColor`, so it is coloured by `text-*`, not `stroke-*`. */}
      <ArrowNarrowRightIcon
        aria-hidden="true"
        className="ml-auto shrink-0 text-mauve-500 transition-colors group-hover:text-red-500"
      />
    </div>
  )
}
