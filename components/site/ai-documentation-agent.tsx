import { FolderSearchIcon } from '@/components/icons/folder-search-icon'
import { RefreshCwIcon } from '@/components/icons/refresh-cw-icon'
import { WorkflowIcon } from '@/components/icons/workflow-icon'
import { BentoCard, BentoThreeColumn } from '@/components/sections/bento-three-column'

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

// Section 2 — AI Documentation Agent — 3-column icon-card bento
export function AiDocumentationAgent() {
  return (
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
  )
}
