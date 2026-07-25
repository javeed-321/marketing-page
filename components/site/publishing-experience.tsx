import { AiAgentIcon } from '@/components/icons/framer/ai-agent-icon'
import { AnalyticsIcon } from '@/components/icons/framer/analytics-icon'
import { IntegrationsIcon } from '@/components/icons/framer/integrations-icon'
import { BentoFeaturedSection } from '@/components/sections/bento-featured'

// Section 7 — Great Publishing Experience — 2 image + 3 icon bento.
// Card set and copy mirror documentation.ai exactly.
export function PublishingExperience() {
  return (
    <BentoFeaturedSection
      id="publishing"
      headline="Great Publishing Experience"
      subheadline={<p>Create, collaborate, and publish docs without leaving your flow.</p>}
      featured={[
        {
          variant: 'red',
          media: (
            // eslint-disable-next-line @next/next/no-img-element -- local asset
            <img src="/img/sections/web-editor.avif" alt="" className="w-full flex-1 object-cover object-top" />
          ),
          title: 'Web Editor with AI Agent',
          desc: 'Notion-style editor with drag-and-drop blocks, slash commands, and a built-in AI Agent so anyone can create docs like a pro.',
        },
        {
          img: '/img/sections/docs-as-code.avif',
          title: 'Docs as code',
          desc: 'Write in Markdown/MDX, keep docs in Git, and use Cursor or other AI IDEs to draft or update them alongside your code.',
        },
      ]}
      cards={[
        {
          icon: <AnalyticsIcon className="size-5" />,
          title: 'Analytics',
          desc: 'See page views, search terms, and drop-offs to target improvements.',
        },
        {
          icon: <AiAgentIcon className="size-5" />,
          title: 'In-editor AI agent',
          desc: 'Generate rewrites, summaries, and code samples inside editor.',
        },
        {
          icon: <IntegrationsIcon className="size-5" />,
          title: 'Integrations',
          desc: 'Connect GitHub, Slack, Jira, Linear, and more in seconds.',
        },
      ]}
    />
  )
}
