import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'

// Section 8 — Final CTA band
export function FinalCta() {
  return (
    <CallToActionSimpleCentered
      id="cta"
      headline="Ready to build docs that Humans and AI love with Documentation.AI?"
      subheadline={<p>Live in under 5 min · No credit card required</p>}
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
    />
  )
}
