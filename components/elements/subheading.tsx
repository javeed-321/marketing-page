import { clsx } from 'clsx/lite'
import { type ComponentProps } from 'react'

export function Subheading({ children, className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      className={clsx(
        // Base step is sized for a ~320px phone: at 2rem a long word like
        // "Documentation.AI?" is wider than the padded card it sits in.
        'font-display text-[1.75rem]/[1.2] font-medium tracking-[-0.03em] text-pretty text-mauve-950 sm:text-[2.5rem]/[1.1] lg:text-[3rem]/[1.1] dark:text-white',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
