import { AI_DOCUMENTATION_AGENT_CONTENT, AiDocumentationAgent } from '@/components/site/ai-documentation-agent'
import { BEAUTIFUL_DOCS_CONTENT, BeautifulDocs } from '@/components/site/beautiful-docs'
import { BUILT_FOR_AI_CONTENT, BuiltForAI } from '@/components/site/built-for-ai'
import { DOCS_THAT_KEEP_UP_CONTENT, DocsThatKeepUp } from '@/components/site/docs-that-keep-up'
import { FAQS_CONTENT, FaqsSection } from '@/components/site/faqs-section'
import { FINAL_CTA_CONTENT, FinalCta } from '@/components/site/final-cta'
import { HERO_CONTENT, HeroSection } from '@/components/site/hero-section'
import { MORE_REASONS_CONTENT, MoreReasons } from '@/components/site/more-reasons'
import { PRODUCT_TABS_CONTENT, ProductTabs } from '@/components/site/product-tabs'
import { PUBLISHING_EXPERIENCE_CONTENT, PublishingExperience } from '@/components/site/publishing-experience'
import { SITE_FOOTER_CONTENT, SiteFooter } from '@/components/site/site-footer'
import { TRUSTED_BY_CONTENT, TrustedBy } from '@/components/site/trusted-by'

// Homepage — section order lives here, the words live in each section's
// `*_CONTENT` object, and the components themselves hold only layout.
export default function Page() {
  return (
    <>
      <HeroSection content={HERO_CONTENT} demo={<ProductTabs content={PRODUCT_TABS_CONTENT} />} />
      {/* Vertical layout rails (1px, #F0EFEF) flanking the 75rem content column —
          matches documentation.ai, which runs them from below the hero to the FAQ. */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-300 -translate-x-1/2 border-x border-[#F0EFEF] lg:block dark:border-white/5"
        />
        <DocsThatKeepUp content={DOCS_THAT_KEEP_UP_CONTENT} />
        <AiDocumentationAgent content={AI_DOCUMENTATION_AGENT_CONTENT} />
        <BuiltForAI content={BUILT_FOR_AI_CONTENT} />
        <BeautifulDocs content={BEAUTIFUL_DOCS_CONTENT} />
        <MoreReasons content={MORE_REASONS_CONTENT} />
        <TrustedBy content={TRUSTED_BY_CONTENT} />
        <PublishingExperience content={PUBLISHING_EXPERIENCE_CONTENT} />
        <FinalCta content={FINAL_CTA_CONTENT} />
        <FaqsSection content={FAQS_CONTENT} />
      </div>
      <SiteFooter content={SITE_FOOTER_CONTENT} />
    </>
  )
}
