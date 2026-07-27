import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Document({
  children,
  variant = 'legal',
  className,
  ...props
}: { variant?: 'legal' | 'article' } & ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'space-y-4 text-mauve-700 dark:text-mauve-400 [&_a]:font-semibold [&_a]:text-mauve-950 [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-white [&_li]:pl-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:font-semibold [&_strong]:text-mauve-950 dark:[&_strong]:text-white [&_ul]:list-[square] [&_ul]:pl-6 [&_ul]:marker:text-mauve-400 dark:[&_ul]:marker:text-mauve-600',

        // Legal pages: dense, uniform, one heading level.
        variant === 'legal' &&
          'text-sm/7 [&_h2]:text-base/8 [&_h2]:font-medium [&_h2]:text-mauve-950 [&_h2]:not-first:mt-8 dark:[&_h2]:text-white',

        // Long-form posts: larger body, a real heading hierarchy, plus the
        // tables, quotes, and code blocks the legal variant never needs.
        variant === 'article' && [
          'text-base/7',
          '[&_h2]:font-display [&_h2]:text-2xl/8 [&_h2]:font-medium [&_h2]:tracking-[-0.02em] [&_h2]:text-mauve-950 [&_h2]:not-first:mt-12 dark:[&_h2]:text-white',
          '[&_h3]:font-display [&_h3]:text-lg/7 [&_h3]:font-medium [&_h3]:text-mauve-950 [&_h3]:not-first:mt-8 dark:[&_h3]:text-white',
          '[&_h4]:text-base/7 [&_h4]:font-semibold [&_h4]:text-mauve-950 [&_h4]:not-first:mt-6 dark:[&_h4]:text-white',
          '[&_blockquote]:border-l-2 [&_blockquote]:border-red-500 [&_blockquote]:pl-5 [&_blockquote]:text-mauve-800 [&_blockquote]:italic dark:[&_blockquote]:text-mauve-300',
          '[&_hr]:my-10 [&_hr]:border-card-border',
          '[&_img]:rounded-xl [&_img]:border [&_img]:border-card-border',
          '[&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm/6',
          '[&_th]:border-b [&_th]:border-card-border [&_th]:px-3 [&_th]:py-2.5 [&_th]:font-semibold [&_th]:text-mauve-950 dark:[&_th]:text-white',
          '[&_td]:border-b [&_td]:border-card-border [&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top',
          '[&_code]:rounded [&_code]:bg-card [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.875em] [&_code]:text-mauve-950 dark:[&_code]:text-white',
          '[&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-card-border [&_pre]:bg-card [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0',
        ],

        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
