import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Container({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx('mx-auto w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-300 lg:px-10', className)} {...props}>
      {children}
    </div>
  )
}
