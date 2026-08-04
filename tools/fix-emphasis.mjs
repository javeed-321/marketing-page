/**
 * Repair malformed `**` emphasis from the markdown export.
 *
 *   node tools/fix-emphasis.mjs [--dry] [slug…]
 *
 * CommonMark will not open a `**` that is followed by whitespace, and will not
 * close one that is preceded by whitespace. The export produces both, so the
 * asterisks end up rendered as literal text:
 *
 *   alternatives like** Documentation.AI** or ReadMe   ← opener glued to "like"
 *   **Documentation.AI Slack channel: **[Join here]    ← closer after a space
 *   the** best API documentation platform**** in 2026  ← both, plus an empty pair
 *
 * Whether a given `**` is an opener or a closer depends on the ones before it,
 * so they are paired left to right rather than pattern-matched. That matters:
 * `**A**, **B**` contains `**, **`, which looks like a broken closer to a naive
 * regex but is simply the join between two valid spans.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const BLOG = join(dirname(fileURLToPath(import.meta.url)), '..', 'content/blog')
const DRY = process.argv.includes('--dry')

function fixLine(line) {
  // Empty pairs first — they carry no text and only confuse the pairing below.
  let s = line.replace(/\*\*\s*\*\*/g, ' ').replace(/\*{4,}/g, '**')

  const out = []
  let i = 0
  let open = false
  while (i < s.length) {
    if (s[i] === '*' && s[i + 1] === '*') {
      const before = out.at(-1) ?? ''
      const after = s[i + 2] ?? ''
      if (!open) {
        // An opener may not be followed by whitespace. Push the space in front.
        if (/\s/.test(after) && /\S/.test(before)) {
          if (!/\s/.test(before)) out.push(' ')
          out.push('**')
          i += 3 // skip the '**' and the space after it
          open = true
          continue
        }
      } else {
        // A closer may not be preceded by whitespace. Pull the space out.
        if (/\s/.test(before)) {
          while (/\s/.test(out.at(-1) ?? '')) out.pop()
          out.push('**')
          if (/\S/.test(after)) out.push(' ')
          i += 2
          open = false
          continue
        }
      }
      out.push('**')
      i += 2
      open = !open
      continue
    }
    out.push(s[i++])
  }
  return out.join('').replace(/[ \t]+$/, '')
}

/** A `**` that cannot open or close where it sits — i.e. renders literally. */
function brokenCount(text) {
  let n = 0
  for (const line of text.split('\n')) {
    if (/^\s*\|/.test(line) || /^\s*```/.test(line)) continue
    let open = false
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== '*' || line[i + 1] !== '*') continue
      const before = line[i - 1] ?? ''
      const after = line[i + 2] ?? ''
      if (!open && /\s/.test(after) && /\S/.test(before)) n++
      if (open && /\s/.test(before) && /\S/.test(after)) n++
      open = !open
      i++
    }
  }
  return n
}

const slugs = process.argv.slice(2).filter((a) => !a.startsWith('--'))
let before = 0
let after = 0
let changed = 0

for (const slug of slugs.length ? slugs : readdirSync(BLOG)) {
  const file = join(BLOG, slug, 'index.mdx')
  let src
  try {
    src = readFileSync(file, 'utf8')
  } catch {
    continue
  }

  let fence = false
  const out = src
    .split('\n')
    .map((line) => {
      if (/^\s*```/.test(line)) {
        fence = !fence
        return line
      }
      // Table rows are left alone — pipes and bold interact badly, and the
      // tables were rebuilt from the HTML already.
      return fence || /^\s*\|/.test(line) ? line : fixLine(line)
    })
    .join('\n')

  const b = brokenCount(src)
  const a = brokenCount(out)
  before += b
  after += a
  if (out !== src) {
    changed++
    if (!DRY) writeFileSync(file, out)
    console.log(`  ${slug.padEnd(46)} ${b} → ${a}`)
  }
}

console.log(`\n${changed} file(s) ${DRY ? 'would change' : 'rewritten'} — broken emphasis ${before} → ${after}`)
