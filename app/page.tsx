import { AiDocumentationAgent } from '@/components/site/ai-documentation-agent'
import { BeautifulDocs } from '@/components/site/beautiful-docs'
import { BuiltForAI } from '@/components/site/built-for-ai'
import { DocsThatKeepUp } from '@/components/site/docs-that-keep-up'
import { FaqsSection } from '@/components/site/faqs-section'
import { FinalCta } from '@/components/site/final-cta'
import { HeroSection } from '@/components/site/hero-section'
import { MoreReasons } from '@/components/site/more-reasons'
import { PublishingExperience } from '@/components/site/publishing-experience'
import { SiteFooter } from '@/components/site/site-footer'
import { TrustedBy } from '@/components/site/trusted-by'

export default function Page() {
  return (
    <>
      <HeroSection />
      <DocsThatKeepUp />
      <AiDocumentationAgent />
      <BuiltForAI />
      <BeautifulDocs />
      <MoreReasons />
      <TrustedBy />
      <PublishingExperience />
      <FinalCta />
      <FaqsSection />
      <SiteFooter />
    </>
  )
}
