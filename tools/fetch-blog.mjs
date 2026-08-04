/**
 * Fetch documentation.ai blog posts into content/blog/<slug>/.
 *
 *   node tools/fetch-blog.mjs                  # every post in the sitemap
 *   node tools/fetch-blog.mjs <url> [<url>…]   # specific posts
 *
 * Two sources, because neither alone is complete:
 *   - `Accept: text/markdown` → the prose. Kept byte-for-byte.
 *   - the HTML page           → images, videos and tables, which the markdown
 *                               endpoint drops or flattens.
 *
 * What is changed, and only this:
 *   1. site chrome removed — nav above the <h1>, the <h1>/byline/date block the
 *      page template re-renders, and the footer from "Next Article" onward
 *   2. internal links rewritten to absolute site URLs (velite's copyLinkedFiles
 *      resolves anything else as an on-disk file and fails the build; the `a`
 *      override in components/mdx.tsx strips the origin back off at render time)
 *   3. tables rebuilt from the HTML — the markdown export flattens them lossily
 *   4. images and YouTube embeds re-inserted at their original positions
 *   5. malformed emphasis repaired (`**text **` is not a valid closer)
 *
 * Everything a post owns lives in its own folder:
 *   cover  → content/blog/<slug>/cover.<ext>   (velite s.image(): hashed + blur)
 *   body   → content/blog/<slug>/NN.<ext>      (velite copyLinkedFiles)
 *   avatar → content/authors/<author>.<ext>
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://documentation.ai'
const AUTHOR = 'roopreddy'
const MONTHS = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' }

const curl = (args) => execFileSync('curl', ['-s', '-L', '-m', '60', ...args], { maxBuffer: 64 * 1024 * 1024 })
const fetchText = (url, headers = []) => curl([...headers.flatMap((h) => ['-H', h]), url]).toString('utf8')

const stripTags = (s) =>
  s
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/** Compare text across HTML and markdown: letters and digits only. */
const key = (s) => s.replace(/[*_`#]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '')

/** Trust magic bytes — the author avatar is served as .jpeg but is a PNG. */
function sniff(buf) {
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png'
  if (buf[0] === 0xff && buf[1] === 0xd8) return 'jpg'
  if (buf.subarray(0, 4).toString() === 'RIFF' && buf.subarray(8, 12).toString() === 'WEBP') return 'webp'
  if (buf.subarray(0, 4).toString().startsWith('GIF8')) return 'gif'
  return 'bin'
}

function download(url, dir, base) {
  const buf = curl([url])
  if (buf.length < 100) throw new Error(`empty download: ${url}`)
  const name = `${base}.${sniff(buf)}`
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, name), buf)
  return name
}

// ─── media ──────────────────────────────────────────────────────────────────

/**
 * Images and YouTube embeds, each tagged with where it belongs.
 *
 * Position is recorded as the *text of the paragraph directly before it*, not
 * as an offset from the heading. The live posts place media inconsistently —
 * sometimes straight after the heading, sometimes after the second paragraph of
 * the section — so an anchor is the only thing that survives the round trip
 * through markdown.
 *
 * `occ` disambiguates repeated heading text: "Mintlify" and "ReadMe" each
 * appear as an h3 under several h2 sections.
 */
function mediaFromHtml(fullHtml) {
  const cover = (fullHtml.match(/<meta[^>]*property="og:image"[^>]*content="([^"?]+)/) || [])[1] ?? null
  // Cut the footer first, or the "next article" card's thumbnail attaches to
  // the last FAQ heading.
  const cut = fullHtml.search(/>Next Article</)
  const html = cut > 0 ? fullHtml.slice(0, cut) : fullHtml

  const re =
    /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>|<p[^>]*class="framer-text[^"]*"[^>]*>([\s\S]*?)<\/p>|<img[^>]+src="(https:\/\/framerusercontent\.com\/images\/[^"?]+)[^"]*"([^>]*)>|<iframe[^>]+src="https:\/\/www\.youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{6,})/g

  const occurrences = new Map()
  const seen = new Set()
  const items = []
  let avatar = null
  let heading = null
  let occ = 0
  let anchor = null

  for (let m; (m = re.exec(html)); ) {
    if (m[1]) {
      heading = stripTags(m[2])
      occ = (occurrences.get(key(heading)) ?? 0) + 1
      occurrences.set(key(heading), occ)
      anchor = null // media before any paragraph belongs to the heading itself
      continue
    }
    if (m[3] !== undefined) {
      const text = stripTags(m[3])
      if (text) anchor = text
      continue
    }
    if (m[6]) {
      if (seen.has(m[6]) || !heading) continue
      seen.add(m[6])
      items.push({ heading, occ, anchor, kind: 'video', id: m[6] })
      continue
    }
    const url = m[4]
    const alt = ((m[5].match(/alt="([^"]*)"/) || [])[1] ?? '').trim()
    if (/author image/i.test(alt)) {
      avatar ??= url
      continue
    }
    if (url === cover || seen.has(url)) continue
    seen.add(url)
    if (heading) items.push({ heading, occ, anchor, kind: 'image', url, alt })
  }
  return { cover, avatar, items }
}

// ─── tables ─────────────────────────────────────────────────────────────────

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

/** The markdown export flattens tables lossily; the HTML keeps real <tr>/<td>. */
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

/**
 * Replace each flattened table block with a real one.
 *
 * The export uses at least three shapes — one cell per line, several cells
 * joined with "|,", and a trailing "|" that may or may not be present — and it
 * drops cells outright, so neither counting nor positional matching works. A
 * line belongs to the table when every "|,"-separated part of it matches one of
 * that table's own cells. Any non-cell line inside the span aborts the rewrite:
 * a mangled table is better than a deleted paragraph.
 */
function repairTables(body, tables, slug) {
  let fixed = 0
  for (const { heading, rows } of tables) {
    const at = body.findIndex((l) => /^#{2,4} /.test(l) && key(l) === key(heading ?? ''))
    if (at < 0) continue
    let stop = body.findIndex((l, i) => i > at && /^#{1,6} /.test(l))
    if (stop < 0) stop = body.length

    // Separators are unreliable — the export joins cells with "|,", with a bare
    // ",", with a trailing "|", or with nothing at all, and it drops cells
    // outright. So ignore separators entirely: strip everything except letters
    // and digits, then walk the table's own cells through that stream in order.
    // A block is the table only if it is consumed *exactly* — any leftover text
    // means real prose is in the span, and the rewrite is abandoned.
    const cellKeys = rows.flat().map(key).filter(Boolean)

    /** Consumed length of `text` if it is nothing but this table's cells, else -1. */
    const consume = (text) => {
      let pos = 0
      let ci = 0
      while (pos < text.length && ci < cellKeys.length) {
        if (text.startsWith(cellKeys[ci], pos)) pos += cellKeys[ci].length
        ci++ // a cell that does not match here was dropped by the export
      }
      return pos === text.length ? ci : -1
    }

    const lines = []
    for (let i = at + 1; i < stop; i++) if (body[i].trim() !== '') lines.push(i)

    // Start at the first line that opens with the first header cell.
    const from = lines.find((i) => key(body[i]).startsWith(cellKeys[0]))
    if (from === undefined) continue

    // Extend while the span still consumes cleanly; the last good line ends it.
    let end = -1
    let text = ''
    let usedCells = 0
    for (const i of lines.filter((i) => i >= from)) {
      const next = text + key(body[i])
      const n = consume(next)
      if (n < 0) break
      text = next
      end = i
      usedCells = n
    }

    if (end < 0 || usedCells < rows[0].length * 2) {
      console.log(`  ! ${slug}: "${heading}" — could not match the flattened block, left as-is`)
      continue
    }
    body.splice(from, end - from + 1, gfm(rows))
    fixed++
  }
  return fixed
}

// ─── markdown ───────────────────────────────────────────────────────────────

const parseDate = (s) => {
  const m = s.match(/([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})/)
  return m ? `${m[3]}-${MONTHS[m[1]]}-${String(m[2]).padStart(2, '0')}` : null
}

/**
 * Repair malformed emphasis from the export.
 *
 * `**text **` is not a valid closer in CommonMark, so it renders as literal
 * asterisks. The trap: `**A**, **B**` is valid but contains `**, **`, which
 * looks identical — so the opening `**` must be proven an opener (start of
 * line, whitespace, `[` or `(`) before anything is rewritten.
 */
function normalizeEmphasis(lines) {
  let fence = false
  return lines.map((line) => {
    if (/^\s*```/.test(line)) {
      fence = !fence
      return line
    }
    if (fence) return line
    return line
      .replace(/\*\*\s+\*\*/g, ' ')
      .replace(/(^|[\s[(])\*\*(?=\S)([^*\n]*?)[ \t]+\*\*/g, '$1**$2** ')
      .replace(/\*\* +\]/g, '**]')
      .replace(/\*\* {2,}/g, '** ')
      .replace(/(\]\([^)\s]+\))(?=[A-Za-z])/g, '$1 ')
      .replace(/[ \t]+$/, '')
  })
}

/**
 * Reattach blockquote bodies to their marker.
 *
 * The export emits the marker and the quoted text as separate blocks:
 *
 *     >
 *                       ← blank line ends the blockquote
 *     📌 **Update:** …  ← so this renders outside it
 *
 * CommonMark terminates a blockquote at the blank line, so the result is an
 * empty `<blockquote>` followed by a loose paragraph — the live page has the
 * text inside the quote. Re-prefix the next block and drop the bare marker.
 */
function reattachBlockquotes(lines) {
  const out = []
  for (let i = 0; i < lines.length; i++) {
    if (/^>\s*$/.test(lines[i])) {
      let j = i + 1
      while (j < lines.length && lines[j].trim() === '') j++
      if (j < lines.length && !/^#{1,6} /.test(lines[j])) {
        while (j < lines.length && lines[j].trim() !== '') out.push('> ' + lines[j++])
        i = j - 1
        continue
      }
    }
    out.push(lines[i])
  }
  return out
}

function extractMarkdown(raw, slug) {
  const lines = raw.split('\n')
  if (lines[0].trim() !== '---') throw new Error(`${slug}: no frontmatter`)
  const fmEnd = lines.indexOf('---', 1)
  const fm = {}
  for (const line of lines.slice(1, fmEnd)) {
    const m = line.match(/^(\w+):\s*(.*)$/)
    if (m) fm[m[1]] = m[2].replace(/^"(.*)"$/, '$1').trim()
  }

  const h1 = lines.findIndex((l, i) => i > fmEnd && /^# \S/.test(l))
  if (h1 < 0) throw new Error(`${slug}: no <h1>`)

  let i = h1 + 1
  let visibleDate = null
  for (let guard = 0; i < lines.length && guard < 20; guard++) {
    const l = lines[i].trim()
    if (l === '') { i++; continue }
    if (/^Written by/.test(l)) { i++; continue }
    if (l === 'Published') { i++; continue }
    if (parseDate(l) && l.length < 30) { visibleDate = parseDate(l); i++; continue }
    if (!visibleDate && lines.slice(i, i + 6).some((x) => /^Written by/.test(x.trim()))) { i++; continue }
    break
  }

  const FOOTER = /^(Next Article|Comments|©\d{4} Documentation\.AI)\s*$/
  let end = lines.findIndex((l, j) => j > i && FOOTER.test(l.trim()))
  if (end < 0) end = lines.length

  return { fm, date: visibleDate ?? parseDate(fm.published ?? ''), body: lines.slice(i, end) }
}

// ─── placement ──────────────────────────────────────────────────────────────

const sameStart = (a, b, n = 40) => {
  const ka = key(a)
  const kb = key(b)
  const len = Math.min(n, ka.length, kb.length)
  return len > 8 && ka.slice(0, len) === kb.slice(0, len)
}

/** The occ-th body heading whose text matches — headings repeat across sections. */
function findHeading(body, text, occ) {
  let n = 0
  for (let i = 0; i < body.length; i++) {
    if (/^#{2,4} /.test(body[i]) && key(body[i]) === key(text) && ++n === occ) return i
  }
  return -1
}

/**
 * Insert media where the live page has it: after its anchor paragraph, or
 * directly under the heading when it had none.
 */
function placeMedia(body, items, slug, contentDir) {
  // Group by (heading, occ, anchor) so several items sharing one anchor keep
  // their document order instead of being reversed by repeated splices.
  const groups = new Map()
  for (const item of items) {
    const k = `${item.heading} ${item.occ} ${item.anchor ?? ''}`
    if (!groups.has(k)) groups.set(k, { ...item, items: [] })
    groups.get(k).items.push(item)
  }

  let placed = 0
  let missed = 0
  let n = 0
  for (const group of groups.values()) {
    const at = findHeading(body, group.heading, group.occ)
    if (at < 0) continue // heading not in the article body → chrome media

    let stop = body.findIndex((l, i) => i > at && /^#{1,6} /.test(l))
    if (stop < 0) stop = body.length

    let insertAfter = at
    if (group.anchor) {
      const hit = body.findIndex((l, i) => i > at && i < stop && l.trim() !== '' && sameStart(l, group.anchor))
      if (hit >= 0) insertAfter = hit
      else missed++
    }

    const block = []
    for (const item of group.items) {
      if (item.kind === 'video') {
        const title = stripTags(group.heading).replace(/"/g, '')
        block.push(
          '',
          `<iframe\n  src="https://www.youtube.com/embed/${item.id}"\n  title="${title}"\n  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"\n  allowFullScreen\n></iframe>`,
        )
      } else {
        const name = download(item.url, contentDir, String(++n).padStart(2, '0'))
        block.push('', `![${item.alt || stripTags(group.heading)}](./${name})`)
      }
      placed++
    }
    body.splice(insertAfter + 1, 0, ...block)
  }
  if (missed) console.log(`  ~ ${slug}: ${missed} anchor(s) not found in the prose — fell back to the heading`)
  return placed
}

// ─── main ───────────────────────────────────────────────────────────────────

const yaml = (s) => `"${String(s).replace(/"/g, '\\"')}"`

let urls = process.argv.slice(2).filter((a) => a.startsWith('http'))
if (!urls.length) {
  const sitemap = fetchText(`${SITE}/sitemap.xml`)
  urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => /\/blog\/.+/.test(u))
  console.log(`sitemap: ${urls.length} posts`)
}

const failures = []
for (const url of urls) {
  const slug = url.replace(/\/+$/, '').split('/').pop()
  try {
    const { fm, date, body } = extractMarkdown(fetchText(url, ['Accept: text/markdown']), slug)
    if (!date) throw new Error('no date')
    const html = fetchText(url)
    const { cover, avatar, items } = mediaFromHtml(html)
    const contentDir = join(REPO, 'content/blog', slug)

    let coverRef = null
    if (cover) coverRef = './' + download(cover, contentDir, 'cover')

    if (avatar && !existsSync(join(REPO, 'content/authors', `${AUTHOR}.png`))) {
      const name = download(avatar, join(REPO, 'content/authors'), AUTHOR)
      const yml = join(REPO, 'content/authors', `${AUTHOR}.yml`)
      const src = readFileSync(yml, 'utf8')
      if (!/^avatar:/m.test(src)) writeFileSync(yml, src.replace(/^(slug: .*)$/m, `$1\navatar: ./${name}`))
    }

    const quoted = reattachBlockquotes(body)
    body.length = 0
    body.push(...quoted)

    const tablesFixed = repairTables(body, tablesFromHtml(html), slug)

    for (let i = 0; i < body.length; i++) {
      body[i] = body[i]
        .replace(/\]\(\.\/([^)]*)\)/g, `](${SITE}/blog/$1)`)
        .replace(/\]\(\.\.\/authors\/([^)]*)\)/g, `](${SITE}/blog/authors/$1)`)
        .replace(/\]\(\.\.\/\)/g, `](${SITE})`)
        .replace(/\]\(\.\.\/([^)]*)\)/g, `](${SITE}/$1)`)
    }

    const placed = placeMedia(body, items, slug, contentDir)
    const text = normalizeEmphasis(body).join('\n').trim()

    const frontmatter = [
      '---',
      `title: ${yaml(fm.title)}`,
      `description: ${yaml(fm.description)}`,
      `date: ${date}`,
      `author: ${AUTHOR}`,
      ...(coverRef ? [`cover: ${coverRef}`] : []),
      '---',
      '',
    ].join('\n')

    mkdirSync(contentDir, { recursive: true })
    writeFileSync(join(contentDir, 'index.mdx'), frontmatter + text + '\n')
    console.log(`${slug}\n  date=${date}  media=${placed}/${items.length}  tables-rebuilt=${tablesFixed}`)
  } catch (err) {
    failures.push({ slug, error: err.message })
    console.log(`  x ${slug}: FAILED — ${err.message}`)
  }
}

if (failures.length) {
  console.log(`\n${failures.length} post(s) failed:`)
  for (const f of failures) console.log(`  ${f.slug}: ${f.error}`)
}
