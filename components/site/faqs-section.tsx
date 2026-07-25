import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'

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

// Section 9 — FAQ
export function FaqsSection() {
  return (
    <FAQsTwoColumnAccordion
      id="faqs"
      headline="Frequently Asked Questions (FAQs)"
      subheadline={<p>Find quick answers to the most asked questions about Documentation.AI.</p>}
    >
      {FAQS.map((f, i) => (
        <Faq key={i} question={f.q} answer={<p>{f.a}</p>} />
      ))}
    </FAQsTwoColumnAccordion>
  )
}
