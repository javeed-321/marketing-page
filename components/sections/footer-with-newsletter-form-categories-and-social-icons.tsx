import Link from 'next/link'

import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { ArrowNarrowRightIcon } from '../icons/arrow-narrow-right-icon'

export function FooterCategory({ title, children, ...props }: { title: ReactNode } & ComponentProps<'div'>) {
  return (
    <div {...props}>
      <h3 className="font-normal text-mauve-500">{title}</h3>
      <ul role="list" className="mt-3 flex flex-col gap-2">
        {children}
      </ul>
    </div>
  )
}

export function FooterLink({ href, className, ...props }: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <li className={clsx('text-mauve-700 dark:text-mauve-400', className)}>
      <Link href={href} {...props} />
    </li>
  )
}

export function SocialLink({
  href,
  name,
  className,
  ...props
}: {
  href: string
  name: string
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      target="_blank"
      aria-label={name}
      className={clsx('text-mauve-500 transition-colors *:h-5 *:w-auto hover:text-mauve-950 dark:text-mauve-400 dark:hover:text-white', className)}
      {...props}
    />
  )
}

export function NewsletterForm({
  headline,
  subheadline,
  className,
  ...props
}: {
  headline: ReactNode
  subheadline: ReactNode
} & ComponentProps<'form'>) {
  return (
    <form className={clsx('flex max-w-sm flex-col gap-2', className)} {...props}>
      <p>{headline}</p>
      <div className="flex flex-col gap-4 text-mauve-700 dark:text-mauve-400">{subheadline}</div>
      <div className="flex items-center border-b border-mauve-950/20 py-2 has-[input:focus]:border-mauve-950 dark:border-white/20 dark:has-[input:focus]:border-white">
        <input
          type="email"
          placeholder="Email"
          aria-label="Email"
          className="flex-1 text-mauve-950 focus:outline-hidden dark:text-white"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="relative inline-flex size-7 items-center justify-center rounded-full after:absolute after:-inset-2 hover:bg-mauve-950/10 dark:hover:bg-white/10 after:pointer-fine:hidden"
        >
          <ArrowNarrowRightIcon />
        </button>
      </div>
    </form>
  )
}

export function FooterWithNewsletterFormCategoriesAndSocialIcons({
  cta,
  links,
  fineprint,
  socialLinks,
  watermark,
  className,
  ...props
}: {
  cta: ReactNode
  links: ReactNode
  fineprint?: ReactNode
  socialLinks?: ReactNode
  watermark?: ReactNode
} & ComponentProps<'footer'>) {
  return (
    <footer className={clsx('pt-16', className)} {...props}>
      <div className="overflow-hidden bg-mauve-950/2.5 py-16 text-mauve-950 dark:bg-white/5 dark:text-white">
        {/* Footer content spans a little wider than the body sections so the four link
          * columns sit next to the brand block with room to breathe (no wasted gap). */}
        <div className="mx-auto w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-352 lg:px-10">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 text-[13px]/5 sm:grid-cols-3 lg:grid-cols-[19rem_1fr_1fr_1fr_1fr]">
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">{cta}</div>
            {/* display:contents so each category becomes a column of the grid above */}
            <nav className="contents">{links}</nav>
          </div>
          {(fineprint || socialLinks) && (
            <div className="mt-16 flex items-center justify-between gap-10 text-[13px]/5">
              <div className="text-mauve-600 dark:text-mauve-500">{fineprint}</div>
              {socialLinks && <div className="flex items-center gap-4 sm:gap-10">{socialLinks}</div>}
            </div>
          )}
        </div>
        {watermark && (
          // Watermark kept narrower than the content so it reads as an inset background flourish.
          <div className="mx-auto mt-14 w-full max-w-2xl px-6 md:max-w-3xl lg:max-w-7xl lg:px-10">
            <div className="pointer-events-none overflow-hidden select-none">{watermark}</div>
          </div>
        )}
      </div>
    </footer>
  )
}
