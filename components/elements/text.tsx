import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

/**
 * Body copy authored as data — one string per paragraph.
 * Lets section content objects stay plain data instead of carrying JSX.
 */
export type Prose = string | string[]

/** Renders {@link Prose} as one `<p>` per entry. */
export function Paragraphs({ children }: { children: Prose }) {
  const paragraphs = Array.isArray(children) ? children : [children]

  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </>
  )
}

export function Text({ children, className, size = 'md', ...props }: ComponentProps<'div'> & { size?: 'md' | 'lg' }) {
  return (
    <div
      className={clsx(
        size === 'md' && 'text-base/6',
        size === 'lg' && 'text-lg/normal',
        'text-mauve-700 dark:text-mauve-400',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
