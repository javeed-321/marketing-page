import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, SoftButtonLink } from '@/components/elements/button'
import { HeroCenteredWithDemo } from '@/components/sections/hero-centered-with-demo'
import { ProductTabs } from '@/components/site/product-tabs'

export function HeroSection() {
  return (
    <HeroCenteredWithDemo
      id="hero"
      eyebrow={<AnnouncementBadge href="#" text="Knowledge Infrastructure For AI Agents And Humans" />}
      headline="The AI Documentation Platform"
      subheadline={
        <p>
          Create self-updating product docs, knowledge bases, API references, and help centers. Make knowledge easy
          for AI agents and humans to access. Reduce support and accelerate onboarding.
        </p>
      }
      cta={
        <div className="flex items-center justify-center gap-3">
          <ButtonLink href="https://dashboard.documentation.ai/" size="lg">
            Start for Free
          </ButtonLink>

          <SoftButtonLink href="https://documentation.ai/get-a-demo" size="lg">
            Book a Demo
          </SoftButtonLink>
        </div>
      }
      demo={<ProductTabs />}
    />
  )
}
