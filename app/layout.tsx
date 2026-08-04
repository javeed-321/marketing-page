import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import {
  NavbarDropdown,
  NavbarLink,
  NavbarLogo,
  NavbarWithLogoActionsAndCenteredLinks,
  type NavDropdownGroup,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'
import { LogoWordmark } from '@/components/site/logo-wordmark'
import { siteConfig } from '@/lib/site'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'

// Self-hosted fonts (no runtime Google Fonts dependency, no flash).
// Geist headings + Geist Mono badge + Inter body → matches documentation.ai.
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

// One entry per page that actually exists under `app/solutions/`. Adding a link
// here without a matching slug in `lib/solutions.ts` is a 404 — `dynamicParams`
// is off on that route.
const SOLUTIONS: NavDropdownGroup[] = [
  {
    title: 'By Team',
    links: [
      { label: 'For Product Owners', href: '/solutions/product-owners' },
      { label: 'For Developers', href: '/solutions/developers' },
      { label: 'For Support Teams', href: '/solutions/support-teams' },
    ],
  },
  {
    title: 'By Use Case',
    links: [
      { label: 'Internal Knowledge Base', href: '/solutions/internal-knowledge' },
      { label: 'All Solutions', href: '/solutions' },
    ],
  },
]

export const metadata: Metadata = {
  // Resolves the relative openGraph/canonical URLs the blog routes declare.
  metadataBase: new URL(siteConfig.url),
  title: 'Documentation.AI — The AI Documentation Platform',
  description:
    'Create self-updating product docs, knowledge bases, API references, and help centers. Make knowledge easy for AI agents and humans to access.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable} ${geistMono.variable}`}>
      <body>
        <>
          <NavbarWithLogoActionsAndCenteredLinks
            id="navbar"
            logo={
              <NavbarLogo href="/" className="items-center">
                {/* 176x32 wordmark — at h-8 it claims 176px, more than half of a 336px
                  * viewport's content box, which pushed the actions row into it.
                  * h-6 = 132px on mobile; full size from sm up. */}
                <LogoWordmark className="h-6 w-auto sm:h-8" />
              </NavbarLogo>
            }
            links={
              <>
                <NavbarLink href="/docs">Documentation</NavbarLink>
                <NavbarDropdown label="Solutions" groups={SOLUTIONS} />
                <NavbarLink href="/blog">Blog</NavbarLink>
                <NavbarLink href="/pricing">Pricing</NavbarLink>
                <NavbarLink href="/login" className="sm:hidden">
                  Login
                </NavbarLink>
              </>
            }
            actions={
              <>
                <PlainButtonLink href="/login" className="max-sm:hidden">
                  Login
                </PlainButtonLink>
                <SoftButtonLink href="/get-a-demo" className="max-sm:hidden">
                  Book a Demo
                </SoftButtonLink>
                {/* Hidden on mobile like Login and Book a Demo above — even at h-6 the
                  * wordmark leaves too little room. All three live in `mobileActions`. */}
                <ButtonLink href="https://dashboard.documentation.ai/" className="max-sm:hidden">
                  Start for Free
                </ButtonLink>
              </>
            }
            mobileActions={
              <>
                <SoftButtonLink href="/get-a-demo" size="lg" className="h-12 w-full">
                  Book a Demo
                </SoftButtonLink>
                <ButtonLink href="https://dashboard.documentation.ai/" size="lg" className="h-12 w-full">
                  Start for Free
                </ButtonLink>
              </>
            }
          />

          <Main>{children}</Main>
        </>
      </body>
    </html>
  )
}
