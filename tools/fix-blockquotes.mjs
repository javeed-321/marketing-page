/**
 * Add `>` to the blocks the live page renders as blockquotes.
 *
 *   node tools/fix-blockquotes.mjs [--dry] [slug…]
 *
 * The markdown export emits at most a bare `>` marker and then loses the rest:
 * a blockquote that wraps three paragraphs on the live page comes through as a
 * lone marker followed by plain text. So the extent is taken from the HTML —
 * each <blockquote> gives its list of paragraphs, and those paragraphs are
 * re-quoted in the MDX.
 *
 * Only `>` prefixes are added. No other text is touched, and running it twice
 * changes nothing.
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
const key = (s) => s.replace(/^>\s*/, '').replace(/[*_`#[\]()]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '')
const sameStart = (a, b, n = 44) => {
  const A = key(a)
  const B = key(b)
  const l = Math.min(n, A.length, B.length)
  return l > 10 && A.slice(0, l) === B.slice(0, l)
}

/** Every <blockquote> on the page, as its list of paragraph texts. */
function quotesFromHtml(html) {
  const cut = html.search(/>Next Article</)
  const s = cut > 0 ? html.slice(0, cut) : html
  return [...s.matchAll(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g)]
    .map((m) => [...m[1].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((p) => stripTags(p[1])).filter(Boolean))
    .filter((paras) => paras.length > 0)
}

const slugs = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const targets = slugs.length ? slugs : readdirSync(BLOG)

let totalAdded = 0
for (const slug of targets) {
  const file = join(BLOG, slug, 'index.mdx')
  let src
  try {
    src = readFileSync(file, 'utf8')
  } catch {
    continue
  }

  const html = execFileSync('curl', ['-s', '-L', '-m', '60', `${SITE}/blog/${slug}`], { maxBuffer: 64 * 1024 * 1024 }).toString()
  const quotes = quotesFromHtml(html)
  if (!quotes.length) continue

  const lines = src.split('\n')
  let added = 0

  for (const paras of quotes) {
    // Find the first paragraph, then walk the rest forward from there.
    const start = lines.findIndex((l) => l.trim() !== '' && sameStart(l, paras[0]))
    if (start < 0) continue

    const hits = [start]
    let i = start + 1
    for (const para of paras.slice(1)) {
      while (i < lines.length && lines[i].trim() === '') i++
      if (i >= lines.length || !sameStart(lines[i], para)) break
      hits.push(i++)
    }
    if (hits.length !== paras.length) continue // partial match — leave it alone

    for (const h of hits) {
      if (!/^>\s/.test(lines[h])) {
        lines[h] = '> ' + lines[h].replace(/^>\s*/, '')
        added++
      }
    }
    // Blank lines *inside* a blockquote must carry the marker too, or the
    // quote ends at the first one and only the opening paragraph is quoted.
    for (let j = hits[0]; j < hits.at(-1); j++) if (lines[j].trim() === '') lines[j] = '>'
  }

  const out = lines.join('\n')
  if (out !== src) {
    if (!DRY) writeFileSync(file, out)
    totalAdded += added
    console.log(`  ${slug.padEnd(46)} +${added} quoted line(s)`)
  }
}

console.log(`\n${totalAdded} line(s) quoted${DRY ? '  (dry run)' : ''}`)
