import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Section } from '../elements/section'

type Featured = {
  title: ReactNode
  desc: ReactNode
  img?: string
  media?: ReactNode
  variant?: 'default' | 'red'
}
type IconCard = { icon: ReactNode; title: ReactNode; desc: ReactNode }

// Themed adaptation of the Tailwind UI "two-row bento with three-column second row"
// block: 2 large image cards on top, 3 icon cards below. Neutral (mauve) theme.
export function BentoFeaturedSection({
  featured,
  cards,
  ...props
}: { featured: [Featured, Featured]; cards: [IconCard, IconCard, IconCard] } & Omit<
  ComponentProps<typeof Section>,
  'children'
>) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
        {featured.map((f, i) => {
          const red = f.variant === 'red'
          return (
            <div
              key={i}
              className={clsx(
                'flex flex-col overflow-hidden rounded-2xl ring-1 lg:col-span-3',
                red
                  ? 'bg-red-500 ring-red-600/20'
                  : 'bg-white ring-mauve-950/5 dark:bg-white/5 dark:ring-white/10',
              )}
            >
              {f.media ? (
                <div className="flex flex-1 flex-col">{f.media}</div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={f.img} alt="" className="h-72 w-full object-cover object-top-left" />
              )}
              <div className="flex flex-col gap-2 p-8">
                <h3 className={clsx('text-lg/8 font-medium', red ? 'text-white' : 'text-mauve-950 dark:text-white')}>
                  {f.title}
                </h3>
                <p className={clsx('text-base/7', red ? 'text-white/80' : 'text-mauve-700 dark:text-mauve-400')}>
                  {f.desc}
                </p>
              </div>
            </div>
          )
        })}
        {cards.map((c, i) => (
          <div
            key={i}
            className="flex flex-col gap-6 rounded-2xl bg-white p-8 ring-1 ring-mauve-950/5 lg:col-span-2 dark:bg-white/5 dark:ring-white/10"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-mauve-950/5 text-mauve-950 ring-1 ring-mauve-950/5 dark:bg-white/10 dark:text-white dark:ring-white/10">
              {c.icon}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg/8 font-medium text-mauve-950 dark:text-white">{c.title}</h3>
              <p className="text-base/7 text-mauve-700 dark:text-mauve-400">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
