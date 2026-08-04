import Link from 'next/link'

import { ElDialog, ElDialogPanel } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

import { ChevronIcon } from '../icons/chevron-icon'

export function NavbarLink({
  children,
  href,
  className,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      className={clsx(
        // px-3/py-1 + a 24px line-height keeps the hover pill snug around the label.
        // Font size stays 16px — only the box around it shrank.
        'inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-1 text-base/6 font-medium text-mauve-950 transition-colors',
        'hover:bg-mauve-950/5 dark:text-white dark:hover:bg-white/10',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export type NavDropdownGroup = {
  title: string
  links: { label: string; href: string }[]
}

/**
 * Nav item that reveals a grouped flyout on hover.
 *
 * Hover-driven, so it is pure CSS (`group-hover`) rather than the click-based
 * `ElPopover` — which keeps the whole navbar a server component. `group-focus-within`
 * gives keyboard users the same panel: focusing the trigger reveals it, after which
 * the links inside become focusable and Tab walks straight through them.
 *
 * Hover has no equivalent on touch, so below `lg` this renders as a plain link to
 * `href` and the groups are not shown at all.
 */
export function NavbarDropdown({
  label,
  href,
  groups,
  className,
  ...props
}: {
  label: ReactNode
  /** Where the label goes on mobile, where there is no flyout to open. */
  href: string
  groups: NavDropdownGroup[]
} & Omit<ComponentProps<'div'>, 'children'>) {
  return (
    <>
      {/*
        Mobile: a plain link, matching the other items in the menu.

        `links` renders twice — once in the header bar, once inside the mobile
        dialog — so a flyout whose open and closed states are expressed purely in
        `lg:` variants has no closed state below `lg`: every group renders inline
        and the menu becomes a wall of links. Rather than rebuild this as a
        collapsible (which would need client state), the small-screen menu drops
        the groups and links to the page that lists them.
      */}
      <NavbarLink href={href} className="lg:hidden">
        {label}
      </NavbarLink>

      <div className={clsx('group relative max-lg:hidden', className)} {...props}>
        <button
          type="button"
          aria-haspopup="true"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-3 py-1 text-base/6 font-medium text-mauve-950 transition-colors hover:bg-mauve-950/5 lg:group-hover:bg-mauve-950/5 dark:text-white dark:hover:bg-white/10 dark:lg:group-hover:bg-white/10"
        >
          {label}
          {/* Kit ships a right-pointing chevron: rotate-90 = down (closed), -rotate-90 = up (open). */}
          <ChevronIcon
            className="rotate-90 transition-transform lg:group-hover:-rotate-90 lg:group-focus-within:-rotate-90"
            aria-hidden="true"
          />
        </button>

        {/*
          `pt-3` rather than `mt-3` keeps the trigger and the panel touching, so the pointer
          can travel down into the panel through the visual gap without it closing.
        */}
        <div className="lg:invisible lg:absolute lg:top-full lg:left-1/2 lg:z-20 lg:w-max lg:-translate-x-1/2 lg:pt-3 lg:opacity-0 lg:transition lg:group-hover:visible lg:group-hover:opacity-100 lg:group-focus-within:visible lg:group-focus-within:opacity-100">
          <div className="flex flex-col gap-2 rounded-2xl p-2 lg:min-w-52 lg:bg-white lg:p-3 lg:shadow-lg lg:ring-1 lg:ring-mauve-950/5 dark:lg:bg-mauve-900 dark:lg:ring-white/10">
            {groups.map((group, i) => (
              <div
                key={group.title}
                className={clsx(
                  'flex flex-col gap-0.5',
                  // hairline between groups, never above the first
                  i > 0 && 'mt-1 border-t border-mauve-950/5 pt-3 dark:border-white/10',
                )}
              >
                {/* Same size as the links; hierarchy comes from weight + colour, not shrinking it. */}
                <p className="px-3 pb-1 text-sm/6 font-medium text-mauve-500 dark:text-mauve-400">{group.title}</p>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-lg px-3 py-1.5 text-sm/6 font-medium whitespace-nowrap text-mauve-950 transition-colors hover:bg-mauve-950/5 dark:text-white dark:hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export function NavbarLogo({ className, href, ...props }: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return <Link href={href} {...props} className={clsx('inline-flex items-stretch', className)} />
}

export function NavbarWithLogoActionsAndCenteredLinks({
  links,
  logo,
  actions,
  mobileActions,
  className,
  ...props
}: {
  links: ReactNode
  logo: ReactNode
  actions: ReactNode
  /**
   * Buttons stacked at the bottom of the mobile menu. Kept separate from `actions`
   * because the header-bar buttons carry their own responsive-hiding classes.
   */
  mobileActions?: ReactNode
} & ComponentProps<'header'>) {
  return (
    <header className={clsx('sticky top-0 z-10 bg-[#fcfcfc] dark:bg-mauve-950', className)} {...props}>
      <style>{`:root { --scroll-padding-top: 5.25rem }`}</style>
      <nav>
        <div className="mx-auto flex h-(--scroll-padding-top) max-w-7xl items-center gap-4 px-6 lg:px-10">
          <div className="flex flex-1 items-center">{logo}</div>
          {/* gap-1, not gap-8: the links carry their own px-4 hover pill padding now. */}
          <div className="flex items-center gap-1 max-lg:hidden">{links}</div>
          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="flex shrink-0 items-center gap-5">{actions}</div>

            <button
              command="show-modal"
              commandfor="mobile-menu"
              aria-label="Toggle menu"
              className="inline-flex rounded-full p-1.5 text-mauve-950 hover:bg-mauve-950/10 lg:hidden dark:text-white dark:hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path
                  fillRule="evenodd"
                  d="M3.748 8.248a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM3.748 15.75a.75.75 0 0 1 .75-.751h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/*
          Mobile menu: a top sheet sized to its content (not a full-screen overlay), so the
          page stays visible underneath. Mirrors the header bar — logo left, close right —
          then centred links and the full-width CTAs.
        */}
        <ElDialog className="lg:hidden">
          <dialog id="mobile-menu" className="backdrop:bg-transparent">
            <ElDialogPanel className="fixed inset-x-0 top-0 max-h-dvh overflow-y-auto bg-[#fcfcfc] px-6 pt-6 pb-8 dark:bg-mauve-950">
              <div className="flex items-center justify-between gap-4">
                {logo}
                <button
                  command="close"
                  commandfor="mobile-menu"
                  aria-label="Close menu"
                  className="inline-flex rounded-full p-1.5 text-mauve-950 hover:bg-mauve-950/10 dark:text-white dark:hover:bg-white/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-8 flex flex-col items-center gap-6">{links}</div>
              {mobileActions && <div className="mt-8 flex flex-col gap-3">{mobileActions}</div>}
            </ElDialogPanel>
          </dialog>
        </ElDialog>
      </nav>
    </header>
  )
}
