import { ElTabGroup, ElTabList, ElTabPanels } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { MinusIcon } from '@/components/icons/minus-icon'

export type ComparisonGroup = {
  title: string
  rows: { name: string; values: Record<string, string | boolean> }[]
}

/** A cell: a checkmark, a dash, or plain text — with the label screen readers need. */
function Value({ value, column }: { value: string | boolean | undefined; column: string }) {
  if (typeof value === 'string') {
    return (
      <>
        <span className="sr-only">{column} includes: </span>
        <span className="text-sm/6 text-mauve-950 dark:text-white">{value}</span>
      </>
    )
  }
  return (
    <>
      {value === true ? (
        <CheckmarkIcon aria-hidden="true" className="size-4 stroke-mauve-950 dark:stroke-white" />
      ) : (
        <MinusIcon aria-hidden="true" className="size-4 stroke-mauve-400 dark:stroke-mauve-600" />
      )}
      <span className="sr-only">{value === true ? `Included in ${column}` : `Not included in ${column}`}</span>
    </>
  )
}

/** Shared band that opens each group of rows. */
function GroupBand({ children, className }: { children: string } & ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'rounded-lg bg-card px-4 py-3 text-sm/6 font-semibold text-mauve-950 dark:bg-white/5 dark:text-white',
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * Feature comparison inside an article.
 *
 * Deliberately not `PlanComparisonTable` — that one is built for the pricing
 * page (sticky headers, full-bleed spacing) and reads as a second page banner
 * when dropped into prose. This is the quieter version: grouped rows under a
 * tinted band, hairline row rules, and below `sm` the table collapses into one
 * tab per column, since a 4-column table cannot shrink to a phone.
 */
export function ArticleComparisonTable({
  heading,
  columns,
  groups,
  className,
  ...props
}: {
  heading?: string
  columns: string[]
  groups: ComparisonGroup[]
} & ComponentProps<'div'>) {
  return (
    <div className={clsx('flex flex-col gap-6', className)} {...props}>
      {heading && (
        <h2 className="font-display text-2xl/8 font-medium tracking-[-0.02em] text-mauve-950 dark:text-white">
          {heading}
        </h2>
      )}

      {/* Desktop — one column per option */}
      <table className="w-full text-left max-sm:hidden">
        <caption className="sr-only">{heading ?? 'Feature comparison'}</caption>
        <colgroup>
          <col className="w-2/5" />
          {columns.map((column) => (
            <col key={column} style={{ width: `${60 / columns.length}%` }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <td className="p-0" />
            {columns.map((column) => (
              <th key={column} scope="col" className="p-0 pb-3">
                <div className="text-sm font-semibold text-red-500">{column}</div>
              </th>
            ))}
          </tr>
        </thead>
        {groups.map((group) => (
          <tbody key={group.title} className="group">
            <tr>
              <th scope="colgroup" colSpan={columns.length + 1} className="px-0 pt-10 pb-0 group-first-of-type:pt-2">
                <GroupBand className="-mx-4">{group.title}</GroupBand>
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.name} className="border-b border-mauve-950/5 last:border-none dark:border-white/10">
                <th scope="row" className="px-0 py-4 text-sm/6 font-normal text-mauve-700 dark:text-mauve-400">
                  {row.name}
                </th>
                {columns.map((column) => (
                  <td key={column} className="p-4 text-center">
                    <Value value={row.values[column]} column={column} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>

      {/* Mobile — one tab per option. Tab 0 is pre-selected in the SSR markup so
          there is no flash of every panel before hydration. */}
      <ElTabGroup className="block sm:hidden">
        <ElTabList role="tablist" className="flex">
          {columns.map((column, index) => (
            <button
              key={column}
              type="button"
              role="tab"
              aria-selected={index === 0}
              tabIndex={index === 0 ? 0 : -1}
              className="flex-1 border-b border-mauve-950/10 py-4 text-base/8 font-medium text-mauve-500 aria-selected:border-red-500 aria-selected:text-red-500 dark:border-white/10 dark:text-mauve-400"
            >
              {column}
            </button>
          ))}
        </ElTabList>
        <ElTabPanels className="block">
          {columns.map((column, index) => (
            <div key={column} hidden={index !== 0}>
              {groups.map((group) => (
                <div key={group.title}>
                  <GroupBand className="mt-8">{group.title}</GroupBand>
                  <dl>
                    {group.rows.map((row) => (
                      <div
                        key={row.name}
                        className="grid grid-cols-2 items-baseline border-b border-mauve-950/5 py-4 last:border-none dark:border-white/10"
                      >
                        <dt className="text-sm/6 font-normal text-mauve-700 dark:text-mauve-400">{row.name}</dt>
                        <dd className="text-center">
                          <Value value={row.values[column]} column={column} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          ))}
        </ElTabPanels>
      </ElTabGroup>
    </div>
  )
}
