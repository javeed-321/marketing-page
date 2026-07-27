import { ButtonLink } from '@/components/elements/button'
import { Document } from '@/components/elements/document'
import { Alert } from '@/components/sections/alert'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { FeatureListEntry } from '@/components/sections/feature-list-entry'
import { PlanComparisonTable } from '@/components/sections/plan-comparison-table'
import { ProsConsTwoColumn } from '@/components/sections/pros-cons-two-column'
import type { ArticleSection } from '@/lib/posts'

/** Compile-time guarantee that every `kind` in the union has a renderer below. */
function assertNever(value: never): never {
  throw new Error(`Unhandled article section: ${JSON.stringify(value)}`)
}

/**
 * Maps one {@link ArticleSection} to the block that renders it.
 *
 * This is the whole "three post types" mechanism: a comparison post and a
 * listicle are different *arrays*, not different components. Adding a `kind` to
 * the union without a case here fails the build on `assertNever`.
 *
 * Note each section owns its own styling — `Document` is applied per prose
 * section rather than wrapping the whole article, because its descendant
 * selectors (`[&_table]`, `[&_a]:underline`, `[&_ul]:list-[square]`) would
 * otherwise restyle the internals of every block below.
 */
function Section({ section }: { section: ArticleSection }) {
  switch (section.kind) {
    case 'tldr':
      return (
        <Alert>
          <ul role="list" className="flex list-disc flex-col gap-2 pl-4">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {section.bottomLine && (
            <p className="mt-3 font-medium">
              <strong>Bottom line:</strong> {section.bottomLine}
            </p>
          )}
        </Alert>
      )

    case 'prose':
      return (
        <Document variant="article">
          {section.heading && <h2>{section.heading}</h2>}
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Document>
      )

    case 'featureList':
      return (
        <FeatureListEntry
          heading={section.heading}
          intro={section.intro}
          keyFeatures={section.keyFeatures}
          useIf={section.useIf}
          pricing={section.pricing}
          verdict={section.verdict}
        />
      )

    case 'prosCons':
      return <ProsConsTwoColumn heading={section.heading} pros={section.pros} cons={section.cons} />

    case 'comparisonTable':
      return (
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-2xl/8 font-medium tracking-[-0.02em] text-mauve-950 dark:text-white">
            {section.heading}
          </h2>
          {/* The block is named for pricing plans but is generic: `plans` are the
            * column headers and `features` are the category-grouped rows. */}
          <PlanComparisonTable
            className="py-0"
            plans={section.columns}
            features={section.groups.map((group) => ({
              title: group.title,
              features: group.rows.map((row) => ({ name: row.name, value: row.values })),
            }))}
          />
        </div>
      )

    case 'cta':
      return (
        <CallToActionSimpleCentered
          className="py-0"
          headline={section.headline}
          subheadline={<p>{section.body}</p>}
          cta={
            <ButtonLink href={section.href} size="lg">
              {section.label}
            </ButtonLink>
          }
        />
      )

    case 'faq':
      return (
        <FAQsTwoColumnAccordion className="py-0" headline={section.heading}>
          {section.items.map((item) => (
            <Faq key={item.q} question={item.q} answer={<p>{item.a}</p>} />
          ))}
        </FAQsTwoColumnAccordion>
      )

    default:
      return assertNever(section)
  }
}

/** Renders an article body: every section through its own block, in order. */
export function ArticleSections({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="flex flex-col gap-12">
      {sections.map((section, i) => (
        <Section key={i} section={section} />
      ))}
    </div>
  )
}
