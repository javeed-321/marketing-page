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
      {/* Vertical layout rails (1px, #F0EFEF) flanking the 75rem content column —
          matches documentation.ai, which runs them from below the hero to the FAQ. */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-300 -translate-x-1/2 border-x border-[#F0EFEF] lg:block dark:border-white/5"
        />
        <DocsThatKeepUp />
        <AiDocumentationAgent />
        <BuiltForAI />
        <BeautifulDocs />
        <MoreReasons />
        <TrustedBy />
        <PublishingExperience />
        <FinalCta />
        <FaqsSection />
      </div>
      <SiteFooter />
    </>
  )
}
