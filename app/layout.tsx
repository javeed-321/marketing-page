import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLogoActionsAndCenteredLinks,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'

// Self-hosted fonts (no runtime Google Fonts dependency, no flash).
// Geist headings + Geist Mono badge + Inter body → matches documentation.ai.
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
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
                {/* eslint-disable-next-line @next/next/no-img-element -- static brand svg */}
                <img src="/img/documentation-logo.svg" alt="Documentation.AI" className="h-10 w-auto" />
              </NavbarLogo>
            }
            links={
              <>
                <NavbarLink href="#">Documentation</NavbarLink>
                <NavbarLink href="#">Solutions</NavbarLink>
                <NavbarLink href="#">Blog</NavbarLink>
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
          />

          <Main>{children}</Main>
        </>
      </body>
    </html>
  )
}
