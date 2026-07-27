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

const SOLUTIONS: NavDropdownGroup[] = [
  {
    title: 'By Teams',
    links: [
      { label: 'For Product Owners', href: '#' },
      { label: 'For Developers', href: '#' },
      { label: 'For Support Teams', href: '#' },
    ],
  },
  {
    title: 'By Use Case',
    links: [
      { label: 'Developer Documentation', href: '#' },
      { label: 'Knowledge Base', href: '#' },
      { label: 'Product Documentation', href: '#' },
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
                <LogoWordmark className="h-8 w-auto" />
              </NavbarLogo>
            }
            links={
              <>
                <NavbarLink href="#">Documentation</NavbarLink>
                <NavbarDropdown label="Solutions" groups={SOLUTIONS} />
                <NavbarLink href="/blog">Blog</NavbarLink>
                <NavbarLink href="#">Pricing</NavbarLink>
                <NavbarLink href="#" className="sm:hidden">
                  Login
                </NavbarLink>
              </>
            }
            actions={
              <>
                <PlainButtonLink href="#" className="max-sm:hidden">
                  Login
                </PlainButtonLink>
                <SoftButtonLink href="https://documentation.ai/get-a-demo" className="max-sm:hidden">
                  Book a Demo
                </SoftButtonLink>
                <ButtonLink href="https://dashboard.documentation.ai/">Start for Free</ButtonLink>
              </>
            }
            mobileActions={
              <>
                <SoftButtonLink href="https://documentation.ai/get-a-demo" size="lg" className="h-12 w-full">
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
