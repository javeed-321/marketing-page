import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo'
import { ProductTabs } from '@/components/site/product-tabs'

export default function Page() {
  return (
    <HeroLeftAlignedWithDemo
      id="hero"
      eyebrow={<AnnouncementBadge href="#" text="Knowledge Infrastructure For AI Agents And Humans" cta="Learn more" />}
      headline="The AI Documentation Platform"
      subheadline={
        <p>
          Create self-updating product docs, knowledge bases, API references, and help centers. Make knowledge easy for
          AI agents and humans to access. Reduce support and accelerate onboarding.
        </p>
      }
      cta={
        <div className="flex items-center gap-4">
          <ButtonLink href="https://dashboard.documentation.ai/" size="lg">
            Start for Free
          </ButtonLink>

          <PlainButtonLink href="https://documentation.ai/get-a-demo" size="lg">
            Book a Demo <ArrowNarrowRightIcon />
          </PlainButtonLink>
        </div>
      }
      demo={<ProductTabs />}
    />
  )
}
