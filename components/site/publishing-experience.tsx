import { ChartBarIcon } from '@/components/icons/chart-bar-icon'
import { SparklesIcon } from '@/components/icons/sparkles-icon'
import { Squares2StackedIcon } from '@/components/icons/squares-2-stacked-icon'
import { BentoFeaturedSection } from '@/components/sections/bento-featured'

// Section 7 — Great Publishing Experience — 2 image + 3 icon bento
export function PublishingExperience() {
  return (
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
  )
}
