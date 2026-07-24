import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLogoActionsAndCenteredLinks,
} from '@/components/sections/navbar-with-logo-actions-and-centered-links'
import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
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
