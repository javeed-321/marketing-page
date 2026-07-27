import Link from 'next/link'

import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

/** A call-to-action button authored as data: the visible label and where it points. */
export type CtaLink = { label: string; href: string }

const sizes = {
  md: 'px-3 py-1',
  lg: 'px-4 py-2',
}

const alignments = {
  start: 'justify-start',
  center: 'justify-center',
}

/**
 * The row a section's call-to-action buttons sit in. Sections compose this
 * instead of hand-rolling a flex div, so every CTA row wraps the same way
 * instead of overflowing its card on narrow viewports (the buttons themselves
 * are `shrink-0`, so wrapping is what keeps them inside their container).
 */
export function ButtonGroup({
  align = 'start',
  className,
  ...props
}: { align?: keyof typeof alignments } & ComponentProps<'div'>) {
  return (
    <div className={clsx('flex flex-wrap items-center gap-x-4 gap-y-3', alignments[align], className)} {...props} />
  )
}

export function Button({
  size = 'md',
  type = 'button',
  color = 'dark/light',
  className,
  ...props
}: {
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-[15px]/5 font-medium',
        color === 'dark/light' &&
          'bg-mauve-950 text-white hover:bg-mauve-800 dark:bg-mauve-300 dark:text-mauve-950 dark:hover:bg-mauve-200',
        color === 'light' && 'hover bg-white text-mauve-950 hover:bg-mauve-100 dark:bg-mauve-100 dark:hover:bg-white',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function ButtonLink({
  size = 'md',
  color = 'dark/light',
  className,
  href,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-[15px]/5 font-medium',
        color === 'dark/light' &&
          'bg-mauve-950 text-white hover:bg-mauve-800 dark:bg-mauve-300 dark:text-mauve-950 dark:hover:bg-mauve-200',
        color === 'light' && 'hover bg-white text-mauve-950 hover:bg-mauve-100 dark:bg-mauve-100 dark:hover:bg-white',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function SoftButton({
  size = 'md',
  type = 'button',
  className,
  ...props
}: {
  size?: keyof typeof sizes
} & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-card text-[15px]/5 font-medium text-mauve-950 hover:bg-[#eceae7] dark:bg-white/10 dark:text-white dark:hover:bg-white/20',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function SoftButtonLink({
  size = 'md',
  href,
  className,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-card text-[15px]/5 font-medium text-mauve-950 hover:bg-[#eceae7] dark:bg-white/10 dark:text-white dark:hover:bg-white/20',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function PlainButton({
  size = 'md',
  color = 'dark/light',
  type = 'button',
  className,
  ...props
}: {
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-[15px]/5 font-medium',
        color === 'dark/light' && 'text-mauve-950 hover:bg-mauve-950/10 dark:text-white dark:hover:bg-white/10',
        color === 'light' && 'text-white hover:bg-white/15 dark:hover:bg-white/10',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function PlainButtonLink({
  size = 'md',
  color = 'dark/light',
  href,
  className,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-[15px]/5 font-medium',
        color === 'dark/light' && 'text-mauve-950 hover:bg-mauve-950/10 dark:text-white dark:hover:bg-white/10',
        color === 'light' && 'text-white hover:bg-white/15 dark:hover:bg-white/10',
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
