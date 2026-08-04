import { ChatAssistantDemo } from '@/components/sections/chat-assistant-demo'

/** Everything the mockup *says*. Plain data — no JSX, no styling. */
export type AgenticAssistantContent = {
  /** The user's question bubble. */
  question: string
  /** The agent's "reading…" trace lines, one per entry. */
  steps: string[]
  /** Placeholder text in the ask input. */
  placeholder: string
}

/** Homepage copy for the mockup — the only place these words live. */
export const AGENTIC_ASSISTANT_CONTENT: AgenticAssistantContent = {
  question: 'How do I manage active workflows?',
  steps: ['Reading documentation...', 'Reading workflows page...'],
  placeholder: 'Ask about these docs...',
}

// Chat mockup shown inside the red "Agentic AI assistant" featured card on the
// "More Reasons Users Love Your Documentation" section — mirrors documentation.ai.
// All markup lives in the `chat-assistant-demo` block; this file is only copy.
export function AgenticAssistantCard({ content }: { content: AgenticAssistantContent }) {
  return <ChatAssistantDemo {...content} />
}
