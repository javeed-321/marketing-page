import Link from 'next/link'

import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
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
      className={clsx('text-mauve-500 transition-colors *:size-5 hover:text-mauve-950 dark:text-mauve-400 dark:hover:text-white', className)}
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
      <div
        className={clsx(
          'overflow-hidden bg-mauve-950/2.5 pt-16 text-mauve-950 dark:bg-white/5 dark:text-white',
          !watermark && 'pb-16',
        )}
      >
        <Container className="flex flex-col gap-16">
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 text-sm/7 lg:grid-cols-2">
            {cta}
            <nav className="grid grid-cols-2 gap-6 sm:has-[>:last-child:nth-child(3)]:grid-cols-3 sm:has-[>:nth-child(5)]:grid-cols-3 md:has-[>:last-child:nth-child(4)]:grid-cols-4 lg:max-xl:has-[>:last-child:nth-child(4)]:grid-cols-2">
              {links}
            </nav>
          </div>
          {(fineprint || socialLinks) && (
            <div className="flex items-center justify-between gap-10 text-sm/7">
              <div className="text-mauve-600 dark:text-mauve-500">{fineprint}</div>
              {socialLinks && <div className="flex items-center gap-4 sm:gap-10">{socialLinks}</div>}
            </div>
          )}
        </Container>
        {watermark && (
          <div aria-hidden="true" className="pointer-events-none mt-12 overflow-hidden select-none">
            {/* SVG so the wordmark always scales to the container width (never overflows
              * horizontally) and is clipped along the bottom, matching documentation.ai. */}
            <svg viewBox="0 0 1120 62" width="100%" preserveAspectRatio="xMidYMin meet" className="block w-full">
              <text
                x="560"
                y="86"
                textAnchor="middle"
                textLength="1060"
                lengthAdjust="spacingAndGlyphs"
                style={{ fontSize: '120px' }}
                className="fill-mauve-950/6 font-display font-medium dark:fill-white/5"
              >
                {watermark}
              </text>
            </svg>
          </div>
        )}
      </div>
    </footer>
  )
}
