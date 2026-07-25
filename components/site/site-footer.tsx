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

const FOOTER = {
  Resources: [
    { label: 'Documentation', href: 'https://docs.documentation.ai/' },
    { label: 'Change Log', href: 'https://docs.documentation.ai/changelog' },
    { label: 'Blogs', href: '#' },
    { label: 'Customers', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
  Comparisons: [
    { label: 'Documentation.AI vs Mintlify', href: '#' },
    { label: 'Documentation.AI vs Gitbook', href: '#' },
    { label: 'Documentation.AI vs Readme', href: '#' },
    { label: 'Documentation.AI vs Document360', href: '#' },
  ],
  Alternatives: [
    { label: 'Mintlify Alternatives', href: '#' },
    { label: 'Gitbook Alternatives', href: '#' },
    { label: 'Readme Alternatives', href: '#' },
    { label: 'Document360 Alternatives', href: '#' },
  ],
}

const SOCIALS = [
  { name: 'GitHub', href: 'https://github.com/documentation-ai', Icon: SocialGitHubIcon },
  { name: 'Slack', href: '#', Icon: SocialSlackIcon },
  { name: 'X', href: 'https://x.com/documentation_i', Icon: SocialXIcon },
  { name: 'LinkedIn', href: '#', Icon: SocialLinkedInIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/documentation_ai/', Icon: SocialInstagramIcon },
  { name: 'YouTube', href: 'https://www.youtube.com/@DocumentationAI', Icon: SocialYouTubeIcon },
]

// Section 10 — Footer
export function SiteFooter() {
  return (
    <FooterWithNewsletterFormCategoriesAndSocialIcons
      id="footer"
      cta={
        <div className="flex max-w-sm flex-col gap-6">
          <div className="flex flex-col gap-3">
            <LogoWordmark className="h-8 w-auto self-start" />
            <p className="text-[13px]/[18px] text-mauve-500">©2026 Documentation.AI</p>
            <p className="text-[13px]/5 text-mauve-700 dark:text-mauve-400">
              AI native documentation and knowledge platform to create and maintain world class documentation built
              for both humans and AI
            </p>
          </div>
          <div className="flex items-center gap-5">
            {SOCIALS.map(({ name, href, Icon }) => (
              <SocialLink key={name} href={href} name={name}>
                <Icon className="size-5" />
              </SocialLink>
            ))}
          </div>
        </div>
      }
      links={
        <>
          {Object.entries(FOOTER).map(([title, items]) => (
            <FooterCategory key={title} title={title}>
              {items.map((it) => (
                <FooterLink key={it.label} href={it.href}>
                  {it.label}
                </FooterLink>
              ))}
            </FooterCategory>
          ))}
        </>
      }
      watermark={<FooterWatermark />}
    />
  )
}
