import type { Metadata } from 'next'

import { Document } from '@/components/elements/document'
import { Section } from '@/components/elements/section'
import { JsonLd } from '@/components/json-ld'
import { CalBooking } from '@/components/site/cal-booking'
import { absoluteUrl, siteConfig } from '@/lib/site'

/*
 * Copy scraped verbatim from https://documentation.ai/get-a-demo on 2026-08-04.
 * The Cal.com link and embed settings come from that page's own embed snippet.
 */

const HEADLINE = 'Book a 30-minute chat to see if Documentation.AI is a good fit'
const INTRO =
  'We’ll learn about your documentation setup and show you how Documentation.AI works and helps you evaluate whether it fits your team, workflow, and goals.'

/** The live "product demo" link points at /view-demo, which this site does not host yet. */
const PRODUCT_DEMO_URL = 'https://documentation.ai/view-demo'
const CAL_LINK = 'documentation.ai/demo'
const CONTACT_EMAIL = 'hello@documentation.ai'

const AGENDA = [
  'a live walkthrough of Documentation.AI',
  'how Ask AI works on top of your docs',
  'integrations and workflows relevant to your setup',
  'whether Documentation.AI is the right fit for your needs',
  'your current documentation workflow and challenges',
]

export const metadata: Metadata = {
  title: `Get a demo — ${siteConfig.name}`,
  description: INTRO,
  alternates: { canonical: '/get-a-demo' },
  openGraph: {
    title: `Get a demo — ${siteConfig.name}`,
    description: INTRO,
    url: '/get-a-demo',
    type: 'website',
  },
}

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl('/get-a-demo')}/#page`,
    name: HEADLINE,
    description: INTRO,
    url: absoluteUrl('/get-a-demo'),
    inLanguage: 'en',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: 'Get a demo' },
      ],
    },
  }

  return (
    <>
      <JsonLd data={jsonLd} />

      {/*
       * One centred column for the whole page.
       *
       * The width is set by the widget, not the prose. Cal's `month_view` drops
       * to its stacked mobile layout below a breakpoint somewhere under 1000px
       * — at a blog column's `max-w-3xl` (~690px of widget) it stacks, at
       * `max-w-6xl` (~1070px) it does not. `max-w-5xl` leaves the widget about
       * 940px: narrower, and still on the three-column side of that line.
       *
       * If it ever stacks again, this is the value to raise.
       *
       * The prose does not stretch with it. `Section` clamps its own header to
       * `max-w-2xl`, so the intro keeps a reading measure inside the wider
       * column, exactly as it does on the live page.
       */}
      <div className="mx-auto w-full max-w-5xl">
        {/*
         * `Section` rather than a hero block: every `sections/hero-*` renders
         * the 72px `Heading`, which swamps a headline this long. `Section` uses
         * `Subheading` instead, and it is the same element the bento, features
         * and FAQ blocks already build on — so nothing had to be modified and
         * no other page is affected.
         */}
        <Section
          id="hero"
          // `Section`'s `py-16` leaves 64px between the navbar and the headline,
          // which reads as dead space on a phone where the headline is already
          // the first thing below the logo. Mobile only — the desktop rhythm is
          // unchanged, and this is scoped to this page's instance.
          className="max-sm:pt-4"
          headline={HEADLINE}
          subheadline={
            <>
              <p>{INTRO}</p>
              <p>
                You can also view the{' '}
                <a
                  href={PRODUCT_DEMO_URL}
                  className="font-semibold text-mauve-950 underline underline-offset-4 dark:text-white"
                >
                  product demo
                </a>{' '}
                before the call to get a quick overview.
              </p>
              <p>Choose a time below to book your demo.</p>
            </>
          }
        >
          {/*
           * The widget is this section's children rather than a section of its
           * own. Two separate sections stacked ~128px of dead space above it:
           * the intro's own `pb-16`, plus the Container's `gap-16` landing
           * against the empty children `<div>` that `Section` always renders.
           * As children there is one gap, and the `-mt-*` closes that too.
           */}
          {/* Fixed height + `overflow-scroll`: the widget scrolls inside this box
            * instead of growing to Cal's full content height, which ran several
            * screens long. `scroll` rather than `auto` so the track is always
            * visible — it is what the live embed sets, and it also stops the
            * widget reflowing when the bar appears. `overscroll-contain` keeps
            * that scroll from handing off to the page at either end. */}
          <CalBooking calLink={CAL_LINK} className="-mt-10 h-125 overflow-scroll overscroll-contain sm:-mt-16" />
        </Section>

        {/* Agenda — `pt-0` so the widget above it has no trailing space either */}
        <Section id="agenda" className="pt-0">
          <Document variant="article" className="max-w-2xl">
            <h3>In this 30-minute chat, we’ll cover:</h3>
            <ul>
              {AGENDA.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Prefer to reach out first? Drop us a line at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
          </Document>
        </Section>
      </div>
    </>
  )
}
