import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

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
