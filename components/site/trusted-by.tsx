import { Container } from '@/components/elements/container'

// Neutral placeholder wordmarks for the logo cloud (swap for real customer logos later).
function PlaceholderLogo() {
  return (
    <span className="flex items-center gap-2 text-mauve-400">
      <span className="size-5 rounded-full bg-current opacity-40" />
      <span className="h-2.5 w-16 rounded-full bg-current opacity-40" />
    </span>
  )
}

// Section 6 — Logo cloud (placeholder logos)
export function TrustedBy() {
  return (
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
  )
}
