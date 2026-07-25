import { GitHubIcon } from '@/components/icons/social/github-icon'
import { InstagramIcon } from '@/components/icons/social/instagram-icon'
import { LinkedInIcon } from '@/components/icons/social/linkedin-icon'
import { SlackIcon } from '@/components/icons/social/slack-icon'
import { XIcon } from '@/components/icons/social/x-icon'
import { YouTubeIcon } from '@/components/icons/social/youtube-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'

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

// Section 10 — Footer
export function SiteFooter() {
  return (
    <FooterWithNewsletterFormCategoriesAndSocialIcons
      id="footer"
      cta={
        <div className="flex max-w-sm flex-col gap-6">
          <div className="flex flex-col gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- static brand svg */}
            <img src="/img/documentation-logo.svg" alt="Documentation.AI" className="h-8 w-auto self-start" />
            <p className="text-sm/7 text-mauve-500">©2026 Documentation.AI</p>
            <p className="text-sm/7 text-mauve-700 dark:text-mauve-400">
              AI native documentation and knowledge platform to create and maintain world class documentation built
              for both humans and AI
            </p>
          </div>
          <div className="flex items-center gap-5">
            <SocialLink href="https://github.com/documentation-ai" name="GitHub" className="text-mauve-500 hover:text-mauve-950">
              <GitHubIcon />
            </SocialLink>
            <SocialLink href="#" name="Slack" className="text-mauve-500 hover:text-mauve-950">
              <SlackIcon />
            </SocialLink>
            <SocialLink href="https://x.com/documentation_i" name="X" className="text-mauve-500 hover:text-mauve-950">
              <XIcon />
            </SocialLink>
            <SocialLink href="#" name="LinkedIn" className="text-mauve-500 hover:text-mauve-950">
              <LinkedInIcon />
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/documentation_ai/"
              name="Instagram"
              className="text-mauve-500 hover:text-mauve-950"
            >
              <InstagramIcon />
            </SocialLink>
            <SocialLink
              href="https://www.youtube.com/@DocumentationAI"
              name="YouTube"
              className="text-mauve-500 hover:text-mauve-950"
            >
              <YouTubeIcon />
            </SocialLink>
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
      watermark="Documentation.AI"
    />
  )
}
