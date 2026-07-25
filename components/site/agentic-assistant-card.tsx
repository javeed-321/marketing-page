import { ArrowNarrowRightIcon } from '../icons/arrow-narrow-right-icon'
import { SparklesIcon } from '../icons/sparkles-icon'

// Chat mockup shown inside the red "Agentic AI assistant" featured card on the
// "More Reasons Users Love Your Documentation" section — mirrors documentation.ai.
function SearchGlyph() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx={11} cy={11} r={7} stroke="currentColor" strokeWidth={2} />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

function Bar({ className }: { className?: string }) {
  return <span className={`block h-2.5 rounded-full bg-white/25 ${className ?? ''}`} />
}

export function AgenticAssistantCard() {
  return (
    <div className="flex flex-col gap-5 p-8 pb-0">
      {/* skeleton context the assistant is reading */}
      <div className="flex flex-col gap-2">
        <Bar className="w-full" />
        <Bar className="w-4/5" />
        <Bar className="w-2/3" />
      </div>

      {/* user question bubble */}
      <div className="flex justify-end">
        <span className="rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-red-600">
          How do I manage active workflows?
        </span>
      </div>

      {/* agent reading trace */}
      <div className="flex flex-col gap-2 text-sm text-white/80">
        <span className="flex items-center gap-2">
          <SearchGlyph />
          Reading documentation...
        </span>
        <span className="flex items-center gap-2">
          <SearchGlyph />
          Reading workflows page...
        </span>
      </div>

      {/* streaming answer */}
      <div className="flex items-start gap-2">
        <SparklesIcon className="mt-0.5 size-4 shrink-0 text-white/90" />
        <div className="flex flex-1 flex-col gap-2">
          <Bar className="w-full" />
          <Bar className="w-5/6" />
        </div>
      </div>

      {/* ask input */}
      <div className="mt-1 flex items-center justify-between gap-3 rounded-full bg-white px-5 py-3">
        <span className="text-sm text-mauve-400">Ask about these docs...</span>
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-mauve-950 text-white">
          <ArrowNarrowRightIcon className="size-4" />
        </span>
      </div>
    </div>
  )
}
