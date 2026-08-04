import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

/**
 * `lg` is the homepage hero step. `sm` is for pages whose h1 is a single short
 * word ("Pricing") sitting above dense content rather than opening a hero — at
 * the `lg` step it dwarfs everything under it.
 */
const sizes = {
  lg: 'text-[2.5rem]/[1.2] sm:text-[3.5rem]/[1.1] lg:text-[4.5rem]/[1.1]',
  sm: 'text-[2rem]/[1.15] sm:text-[2.75rem]/[1.1] lg:text-[3.5rem]/[1.1]',
}

export function Heading({
  children,
  color = 'dark/light',
  size = 'lg',
  className,
  ...props
}: { color?: 'dark/light' | 'light'; size?: keyof typeof sizes } & ComponentProps<'h1'>) {
  return (
    <h1
      className={clsx(
        'font-display font-medium tracking-[-0.03em] text-balance',
        sizes[size],
        color === 'dark/light' && 'text-mauve-950 dark:text-white',
        color === 'light' && 'text-white',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}
