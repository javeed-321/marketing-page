import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Heading({
  children,
  color = 'dark/light',
  className,
  ...props
}: { color?: 'dark/light' | 'light' } & ComponentProps<'h1'>) {
  return (
    <h1
      className={clsx(
        'font-display text-[2.5rem]/[1.2] font-medium tracking-[-0.03em] text-balance sm:text-[3.5rem]/[1.1] lg:text-[4.5rem]/[1.1]',
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
