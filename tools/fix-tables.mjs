/**
 * Repair the comparison tables the markdown export flattened, in place.
 *
 *   node tools/fix-tables.mjs [--dry] [slug…]
 *
 * Only the table block is touched — prose, images, videos and frontmatter are
 * left exactly as they are. The page HTML is fetched because the flattened
 * markdown keeps the cell *text* but loses every row and column boundary, so
 * the structure has to come from the real <tr>/<td>.
 *
 * Matching ignores separators entirely. The export joins cells with "|,", with
 * a bare ",", with a trailing "|", or with nothing, and drops cells outright —
 * so the block is reduced to letters and digits and the table's own cells are
 * walked through that stream in order. The block is replaced only if it is
 * consumed exactly; leftover text means prose is in the span, and it is left
 * alone rather than risk deleting a paragraph.
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..')
const BLOG = join(REPO, 'content/blog')
const SITE = 'https://documentation.ai'
const DRY = process.argv.includes('--dry')

const stripTags = (s) =>
  s.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
const key = (s) => s.replace(/[*_`#]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '')

function cellText(html) {
  return stripTags(
    html
      .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, t) => `[${stripTags(t)}](${href})`)
      .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/g, (_, __, t) => `**${stripTags(t)}**`)
      .replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/g, (_, __, t) => `*${stripTags(t)}*`)
      .replace(/<\/(p|br|div)>/g, ' '),
  )
    .replace(/\*\*\s*\*\*/g, '')
    .replace(/\|/g, '\\|')
    .trim()
}

function tablesFromHtml(html) {
  const out = []
  let heading = null
  const re = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>|<table[^>]*>([\s\S]*?)<\/table>/g
  for (let m; (m = re.exec(html)); ) {
    if (m[1]) {
      heading = stripTags(m[2])
      continue
    }
    const rows = [...m[3].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((r) =>
      [...r[1].matchAll(/<(td|th)[^>]*>([\s\S]*?)<\/\1>/g)].map((c) => cellText(c[2])),
    )
    if (rows.length > 1) out.push({ heading, rows })
  }
  return out
}

const gfm = (rows) => {
  const cols = Math.max(...rows.map((r) => r.length))
  const pad = (r) => [...r, ...Array(cols - r.length).fill('')]
  const [head, ...rest] = rows
  return [`| ${pad(head).join(' | ')} |`, `| ${Array(cols).fill('---').join(' | ')} |`, ...rest.map((r) => `| ${pad(r).join(' | ')} |`)].join('\n')
}

/** A line that is already part of a rendered GFM table. */
const isGfm = (l) => /^\s*\|/.test(l)

function repair(lines, tables, slug) {
  let fixed = 0
  for (const { heading, rows } of tables) {
    const at = lines.findIndex((l) => /^#{2,4} /.test(l) && key(l) === key(heading ?? ''))
    if (at < 0) continue
    let stop = lines.findIndex((l, i) => i > at && /^#{1,6} /.test(l))
    if (stop < 0) stop = lines.length

    const cellKeys = rows.flat().map(key).filter(Boolean)
    if (!cellKeys.length) continue

    const consume = (text) => {
      let pos = 0
      let ci = 0
      while (pos < text.length && ci < cellKeys.length) {
        if (text.startsWith(cellKeys[ci], pos)) pos += cellKeys[ci].length
        ci++ // a cell that does not match here was dropped by the export
      }
      return pos === text.length ? ci : -1
    }

    const candidates = []
    for (let i = at + 1; i < stop; i++) if (lines[i].trim() !== '' && !isGfm(lines[i])) candidates.push(i)

    const from = candidates.find((i) => key(lines[i]).startsWith(cellKeys[0]))
    if (from === undefined) continue

    let end = -1
    let text = ''
    let used = 0
    for (const i of candidates.filter((i) => i >= from)) {
      const next = text + key(lines[i])
      const n = consume(next)
      if (n < 0) break
      text = next
      end = i
      used = n
    }

    // Require at least the header plus one full row, so a stray line that
    // happens to equal one cell cannot trigger a rewrite.
    if (end < 0 || used < rows[0].length * 2) {
      console.log(`  ! ${slug}: "${heading}" — no clean match, left as-is`)
      continue
    }
    lines.splice(from, end - from + 1, gfm(rows))
    fixed++
  }
  return fixed
}

/** Leftover cell debris: a line with pipes that is not part of a GFM table. */
const debrisCount = (text) =>
  text.split('\n').filter((l) => l.includes('|') && !isGfm(l) && !/^\s*$/.test(l)).length

const slugs = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const targets = (slugs.length ? slugs : readdirSync(BLOG)).filter((s) => {
  try {
    return debrisCount(readFileSync(join(BLOG, s, 'index.mdx'), 'utf8')) > 0
  } catch {
    return false
  }
})

console.log(`${targets.length} post(s) with table debris\n`)

let totalBefore = 0
let totalAfter = 0
for (const slug of targets) {
  const file = join(BLOG, slug, 'index.mdx')
  const src = readFileSync(file, 'utf8')
  const html = execFileSync('curl', ['-s', '-L', '-m', '60', `${SITE}/blog/${slug}`], { maxBuffer: 64 * 1024 * 1024 }).toString()

  const lines = src.split('\n')
  const fixed = repair(lines, tablesFromHtml(html), slug)
  const out = lines.join('\n')

  const before = debrisCount(src)
  const after = debrisCount(out)
  totalBefore += before
  totalAfter += after
  if (!DRY && out !== src) writeFileSync(file, out)
  console.log(`  ${slug.padEnd(46)} tables=${fixed}  debris ${before} → ${after}`)
}

console.log(`\ndebris total ${totalBefore} → ${totalAfter}${DRY ? '  (dry run)' : ''}`)
