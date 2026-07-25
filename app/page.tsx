import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChartBarIcon } from '@/components/icons/chart-bar-icon'
import { ChatBubbleCircleIcon } from '@/components/icons/chat-bubble-circle-icon'
import { FolderSearchIcon } from '@/components/icons/folder-search-icon'
import { HardDriveIcon } from '@/components/icons/hard-drive-icon'
import { LightingBoltIcon } from '@/components/icons/lighting-bolt-icon'
import { RefreshCwIcon } from '@/components/icons/refresh-cw-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { Squares2StackedIcon } from '@/components/icons/squares-2-stacked-icon'
import { WorkflowIcon } from '@/components/icons/workflow-icon'
import { GitHubIcon } from '@/components/icons/social/github-icon'
import { InstagramIcon } from '@/components/icons/social/instagram-icon'
import { LinkedInIcon } from '@/components/icons/social/linkedin-icon'
import { SlackIcon } from '@/components/icons/social/slack-icon'
import { XIcon } from '@/components/icons/social/x-icon'
import { YouTubeIcon } from '@/components/icons/social/youtube-icon'
import { BentoCard, BentoThreeColumn } from '@/components/sections/bento-three-column'
import { BentoFeaturedSection } from '@/components/sections/bento-featured'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { FeatureThreeColumnWithDemos } from '@/components/sections/features-three-column-with-demos'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import { HeroCenteredWithDemo } from '@/components/sections/hero-centered-with-demo'
import { AgenticAssistantCard } from '@/components/site/agentic-assistant-card'
import { BuiltForAI } from '@/components/site/built-for-ai'
import { ProductTabs } from '@/components/site/product-tabs'

const AI_WORKFLOWS = [
  {
    n: '01',
    title: 'AI agent keeps docs fresh',
    desc: 'The AI agent that suggests, writes, and formats so your docs evolve with your product.',
    img: '/img/features/ai-agent-fresh.avif',
  },
  {
    n: '02',
    title: 'AI assistant in your docs',
    desc: 'Users can ask questions directly inside your docs and get instant, accurate, cited answers.',
    img: '/img/features/ai-assistant-docs.avif',
  },
  {
    n: '03',
    title: 'Flexible publishing',
    desc: 'Use the web editor or update through your code editor with docs-as-code.',
    img: '/img/features/flexible-publishing.avif',
  },
  {
    n: '04',
    title: 'AI-ready out of the box',
    desc: 'Structured so that LLMs, AI agents and search engines can read and use your docs instantly.',
    img: '/img/features/ai-ready.avif',
  },
]

const BEAUTIFUL_DOCS = [
  {
    title: 'Pixel-perfect',
    desc: 'Crisp typography, accessible colors, dark-mode ready.',
    img: '/img/sections/pixel-perfect.avif',
  },
  {
    title: 'Fully customizable',
    desc: 'Swap colors, fonts, layouts, or inject your own CSS & JS.',
    img: '/img/sections/fully-customizable.avif',
  },
  {
    title: 'Templates & components',
    desc: '100+ reusable blocks for every need, from callouts to code tabs.',
    img: '/img/sections/templates-components.avif',
  },
  {
    title: 'Lightning Fast',
    desc: '100/100 across Performance, Accessibility and SEO.',
    img: '/img/sections/lightning-fast.avif',
  },
]

const AI_DOCUMENTATION_AGENT = [
  {
    Icon: WorkflowIcon,
    title: 'AI-assisted updates directly in the web editor',
    desc: 'The Documentation Agent suggests improvements, rewrites unclear sections, fixes structure, summarizes changes, and generates clean draft updates, making documentation updates fast and effortless.',
  },
  {
    Icon: FolderSearchIcon,
    title: 'Complements any coding agent via MCP',
    desc: 'Use Cursor, Windsurf, or Copilot. Our MCP server gives your coding agent live documentation context so it can suggest accurate updates directly from your code editor.',
  },
  {
    Icon: RefreshCwIcon,
    title: 'Monitors product changes, support signals, user feedback (coming soon)',
    desc: 'The agent will track Git commits, feature releases, support tickets, user feedback, and audit logs to surface when documentation is out of date, before your users ever encounter incorrect information.',
  },
]

const FAQS = [
  {
    q: 'What is an AI documentation platform?',
    a: 'An AI documentation platform helps you create, maintain, and publish docs that are structured for both humans and AI — with an agent that keeps content fresh and an assistant that answers questions inside your docs.',
  },
  {
    q: 'How is Documentation.AI different from other AI documentation software?',
    a: 'Documentation.AI is built AI-native from the ground up: docs are cleanly structured for LLM retrieval, an agent writes alongside your product, and everything is exposed to AI tools via llms.txt and MCP.',
  },
  {
    q: 'Do you support Git and docs-as-code workflows?',
    a: 'Yes. Write in Markdown/MDX, keep your docs in Git, and draft or update them from your code editor with Cursor, Windsurf, or Copilot.',
  },
  {
    q: 'Do you support Markdown/MDX and components (callouts, tabs, and code blocks)?',
    a: 'Yes. You get 100+ reusable components — callouts, tabs, code blocks, and more — that render pixel-perfect and stay accessible.',
  },
  {
    q: 'What features should I look for when choosing AI documentation tools?',
    a: 'Look for structured content for LLM retrieval, an AI writing/maintenance agent, an in-docs assistant, MCP support, analytics, and fast, accessible, customizable publishing.',
  },
  {
    q: 'Can AI documentation tools automatically create and update technical content?',
    a: 'Yes. The Documentation Agent drafts, rewrites, and formats content, and monitors product changes to surface docs that are out of date before your users notice.',
  },
]

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

// Neutral placeholder wordmarks for the logo cloud (swap for real customer logos later).
function PlaceholderLogo() {
  return (
    <span className="flex items-center gap-2 text-mauve-400">
      <span className="size-5 rounded-full bg-current opacity-40" />
      <span className="h-2.5 w-16 rounded-full bg-current opacity-40" />
    </span>
  )
}

export default function Page() {
  return (
    <>
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

      {/* Section 1 — Docs that keep up — 4-column card grid */}
      <section id="ai-workflows" className="py-16">
        <Container className="flex flex-col gap-8">
          <div className="flex max-w-xl flex-col gap-6">
            <Subheading>Docs that keep up with your product</Subheading>
            <Text className="text-pretty">
              <p>
                The documentation platform built for the AI era. Beautiful for humans, structured for LLMs, and kept
                fresh by an agent that writes alongside your product.
              </p>
            </Text>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AI_WORKFLOWS.map((f) => (
              <FeatureThreeColumnWithDemos
                key={f.n}
                className="rounded-2xl"
                demo={
                  <div className="flex items-center justify-center px-6 pt-12 pb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.img} alt="" className="h-40 w-auto" />
                  </div>
                }
                headline={
                  <>
                    <span className="mb-2 block text-xs font-semibold tabular-nums text-red-500">{f.n}</span>
                    {f.title}
                  </>
                }
                subheadline={<p>{f.desc}</p>}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Section 2 — AI Documentation Agent — 3-column icon-card bento */}
      <BentoThreeColumn
        id="ai-documentation-agent"
        headline="AI Documentation Agent to Keep Your Docs Up to Date"
        subheadline={
          <p>
            Keeping documentation and knowledge bases current is mission-critical yet notoriously tedious. Your AI
            Documentation Agent keeps everything in sync with minimal manual effort.
          </p>
        }
        cards={AI_DOCUMENTATION_AGENT.map((c) => (
          <BentoCard key={c.title} icon={<c.Icon className="size-5" />} headline={c.title} subheadline={<p>{c.desc}</p>} />
        ))}
      />

      {/* Section 3 — Built for Humans, Optimized for AI — illustration split */}
      <BuiltForAI />

      {/* Section 4 — Beautiful, Lightning Fast Docs — 4-column card grid (same structure as Section 1) */}
      <section id="beautiful-docs" className="py-16">
        <Container className="flex flex-col gap-8">
          <div className="flex max-w-xl flex-col gap-6">
            <Subheading>Beautiful, Lightning Fast Docs that Drive Adoption</Subheading>
            <Text className="text-pretty">
              <p>
                Your docs double as a conversion engine, so we obsess over design and speed for you. Every page ships
                pixel-perfect, responsive, accessible and ridiculously fast.
              </p>
            </Text>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BEAUTIFUL_DOCS.map((f) => (
              <FeatureThreeColumnWithDemos
                key={f.title}
                className="rounded-2xl"
                demo={
                  <div className="flex items-center justify-center px-6 pt-12 pb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.img} alt="" className="h-40 w-auto" />
                  </div>
                }
                headline={f.title}
                subheadline={<p>{f.desc}</p>}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Section 5 — More Reasons Users Love Your Documentation — 2 image + 3 icon bento */}
      <BentoFeaturedSection
        id="more-reasons"
        headline="More Reasons Users Love Your Documentation"
        featured={[
          {
            variant: 'red',
            media: <AgenticAssistantCard />,
            title: 'Agentic AI assistant',
            desc: 'Users ask questions and get instant, accurate, cited answers right where they read and work.',
          },
          {
            img: '/img/sections/api-playground.avif',
            title: 'Interactive API playground',
            desc: 'Test endpoints, tweak parameters, and copy ready-to-run code snippets directly from the docs.',
          },
        ]}
        cards={[
          {
            icon: <LightingBoltIcon className="size-5" />,
            title: 'Lightning Fast',
            desc: 'Faster docs that hit 100/100 Lighthouse score across performance, accessibility and SEO.',
          },
          {
            icon: <HardDriveIcon className="size-5" />,
            title: 'Model Context Protocol (MCP)',
            desc: 'Surface the same up-to-date docs in chatbots, coding agents, and in-product overlays.',
          },
          {
            icon: <ChatBubbleCircleIcon className="size-5" />,
            title: 'Feedback',
            desc: 'Collect precise feedback from users directly on every page.',
          },
        ]}
      />

      {/* Section 6 — Logo cloud (placeholder logos) */}
      <section id="trusted-by" className="py-16">
        <Container className="flex flex-col gap-10 sm:gap-12">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-display text-2xl/9 font-medium tracking-[-0.02em] text-pretty text-mauve-950 sm:text-[1.75rem]/10 dark:text-white">
              The world&apos;s best product teams trust Documentation.AI
            </h2>
            <p className="text-base/7 text-red-500">From next-gen start-ups to established enterprises.</p>
          </div>
          <div className="grid grid-cols-2 place-items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <PlaceholderLogo key={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Section 7 — Great Publishing Experience — 2 image + 3 icon bento */}
      <BentoFeaturedSection
        id="publishing"
        headline="Great Publishing Experience"
        subheadline={<p>Create, collaborate, and publish docs without leaving your flow.</p>}
        featured={[
          {
            img: '/img/sections/docs-as-code.avif',
            title: 'Docs as code',
            desc: 'Write in Markdown/MDX, keep docs in Git, and use Cursor or other AI IDEs to draft or update them alongside your code.',
          },
          {
            img: '/img/sections/web-editor.avif',
            title: 'In-editor AI agent',
            desc: 'Generate rewrites, summaries, and code samples inside the editor.',
          },
        ]}
        cards={[
          {
            icon: <ChartBarIcon className="size-5" />,
            title: 'Analytics',
            desc: 'See page views, search terms, and drop-offs to target improvements.',
          },
          {
            icon: <Squares2StackedIcon className="size-5" />,
            title: 'Integrations',
            desc: 'Connect GitHub, Slack, Jira, Linear, and more in seconds.',
          },
          {
            icon: <SparklesIcon className="size-5" />,
            title: 'Pixel-perfect',
            desc: 'Crisp typography, accessible colors, dark-mode ready.',
          },
        ]}
      />

      {/* Section 8 — Final CTA band */}
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

      {/* Section 9 — FAQ */}
      <FAQsTwoColumnAccordion
        id="faqs"
        headline="Frequently Asked Questions (FAQs)"
        subheadline={<p>Find quick answers to the most asked questions about Documentation.AI.</p>}
      >
        {FAQS.map((f, i) => (
          <Faq key={i} question={f.q} answer={<p>{f.a}</p>} />
        ))}
      </FAQsTwoColumnAccordion>

      {/* Section 10 — Footer */}
      <FooterWithNewsletterFormCategoriesAndSocialIcons
        id="footer"
        cta={
          <div className="flex max-w-sm flex-col gap-6">
            <div className="flex flex-col gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- static brand svg */}
              <img src="/img/documentation-logo.svg" alt="Documentation.AI" className="h-8 w-auto" />
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
    </>
  )
}
