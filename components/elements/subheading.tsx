import { clsx } from 'clsx/lite'
import { type ComponentProps } from 'react'

export function Subheading({ children, className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      className={clsx(
        'font-display text-[2rem]/[1.2] font-medium tracking-[-0.03em] text-pretty text-mauve-950 sm:text-[2.5rem]/[1.1] lg:text-[3rem]/[1.1] dark:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
