import type { ComponentProps, ComponentType } from 'react'

import { SocialGitHubIcon } from '@/components/icons/framer/social-github-icon'
import { SocialInstagramIcon } from '@/components/icons/framer/social-instagram-icon'
import { SocialLinkedInIcon } from '@/components/icons/framer/social-linkedin-icon'
import { SocialSlackIcon } from '@/components/icons/framer/social-slack-icon'
import { SocialXIcon } from '@/components/icons/framer/social-x-icon'
import { SocialYouTubeIcon } from '@/components/icons/framer/social-youtube-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import { FooterWatermark } from '@/components/site/footer-watermark'
import { LogoWordmark } from '@/components/site/logo-wordmark'

export type FooterLinkItem = { label: string; href: string }
/** One footer column: a heading plus its links. */
export type FooterCategoryItem = { title: string; links: FooterLinkItem[] }
export type SocialItem = {
  name: string
  href: string
  /** Icon component itself, e.g. SocialGitHubIcon — rendered at size-5 by the block. */
  Icon: ComponentType<ComponentProps<'svg'>>
}

/** Everything the footer *says*. Plain data — no JSX, no styling. */
export type SiteFooterContent = {
  copyright: string
  tagline: string
  categories: FooterCategoryItem[]
  socials: SocialItem[]
}

/** Homepage copy for section 10 — the only place these words live. */
export const SITE_FOOTER_CONTENT: SiteFooterContent = {
  copyright: '©2026 Documentation.AI',
  tagline:
    'AI native documentation and knowledge platform to create and maintain world class documentation built for both humans and AI',
  categories: [
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: 'https://docs.documentation.ai/' },
        { label: 'Change Log', href: 'https://docs.documentation.ai/changelog' },
        { label: 'Blogs', href: '#' },
        { label: 'Customers', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ],
    },
    {
      title: 'Comparisons',
      links: [
        { label: 'Documentation.AI vs Mintlify', href: '#' },
        { label: 'Documentation.AI vs Gitbook', href: '#' },
        { label: 'Documentation.AI vs Readme', href: '#' },
        { label: 'Documentation.AI vs Document360', href: '#' },
      ],
    },
    {
      title: 'Alternatives',
      links: [
        { label: 'Mintlify Alternatives', href: '#' },
        { label: 'Gitbook Alternatives', href: '#' },
        { label: 'Readme Alternatives', href: '#' },
        { label: 'Document360 Alternatives', href: '#' },
      ],
    },
  ],
  socials: [
    { name: 'GitHub', href: 'https://github.com/documentation-ai', Icon: SocialGitHubIcon },
    { name: 'Slack', href: 'https://documentationai.slack.com/', Icon: SocialSlackIcon },
    { name: 'X', href: 'https://x.com/documentation_i', Icon: SocialXIcon },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/documentation-ai/', Icon: SocialLinkedInIcon },
    { name: 'Instagram', href: 'https://www.instagram.com/documentation_ai/', Icon: SocialInstagramIcon },
    { name: 'YouTube', href: 'https://www.youtube.com/@DocumentationAI', Icon: SocialYouTubeIcon },
  ],
}

// Section 10 — Footer.
// Presentational only: it owns layout, styling and the brand marks (logo, watermark);
// `content` owns every word.
export function SiteFooter({
  content,
  ...props
}: { content: SiteFooterContent } & Omit<
  ComponentProps<typeof FooterWithNewsletterFormCategoriesAndSocialIcons>,
  'content' | 'cta' | 'links' | 'watermark'
>) {
  const { copyright, tagline, categories, socials } = content

  return (
    <FooterWithNewsletterFormCategoriesAndSocialIcons
      id="footer"
      cta={
        <div className="flex max-w-sm flex-col gap-6">
          <div className="flex flex-col gap-3">
            <LogoWordmark className="h-8 w-auto self-start" />
            <p className="text-[13px]/[18px] text-mauve-500">{copyright}</p>
            <p className="text-[13px]/5 text-mauve-700 dark:text-mauve-400">{tagline}</p>
          </div>
          <div className="flex items-center gap-5">
            {socials.map(({ name, href, Icon }) => (
              <SocialLink key={name} href={href} name={name}>
                <Icon className="size-5" />
              </SocialLink>
            ))}
          </div>
        </div>
      }
      links={
        <>
          {categories.map((category) => (
            <FooterCategory key={category.title} title={category.title}>
              {category.links.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterCategory>
          ))}
        </>
      }
      watermark={<FooterWatermark />}
      {...props}
    />
  )
}
