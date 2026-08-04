# The blog pipeline

How a blog post gets from a file on disk to pixels on a page.

---

## The one-sentence version

You write an `.mdx` file → **Velite** validates and compiles it at build time →
`lib/posts.ts` hands the result to the pages → `components/mdx.tsx` turns the
compiled body back into React, styled by Tailwind Typography.

---

## Stage 1 — Where the data comes from: files on disk

There is no CMS, no database, no API call. **The content _is_ the repo.**

```
content/
├── authors/
│   └── roop-reddy.yml                    one YAML file per author
└── blog/
    └── sample-post/
        ├── index.mdx                     the post
        └── cover.png                     its images, next to it
```

Two rules govern this folder:

1. **The folder name is the URL.** `content/blog/sample-post/` is served at
   `/blog/sample-post`. Nothing maps it — the slug is derived from the path.
   Rename the folder and you have renamed the URL.
2. **Images live beside the post that uses them**, referenced relatively
   (`cover: ./cover.png`). A post is a self-contained folder you can move, copy,
   or delete in one action.

A post file is **frontmatter + body**:

```mdx
---
title: "Sample Post: Blog Content Conventions"    ← the data
date: 2026-07-09
author: roop-reddy
cover: ./cover.png
---

## How a post is structured                       ← the content

Every post is a folder under `content/blog/`...
```

Frontmatter is the structured data the *site* needs (title, date, author,
cover). Everything below `---` is what the *reader* sees.

### What you can write in the body

Plain Markdown, plus anything MDX allows. There is **no component library to
learn** — the body renders as prose:

- headings, paragraphs, lists, links, bold/italic
- Markdown tables
- fenced code blocks
- inline SVG, which passes straight through (no asset step)

`content/blog/sample-post/index.mdx` exercises every one of these. Read it before
writing your first post; it is the conventions demo.

---

## Stage 2 — How it gets processed: Velite, at build time

Nothing about content is figured out at request time. It all happens once,
during `npm run dev` / `npm run build`.

`next.config.ts` runs Velite **before Next.js starts**:

```ts
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1'
  const { build } = await import('velite')
  await build({ watch: isDev, clean: !isDev })
}
```

(Why here and not as a build plugin? Turbopack has no webpack plugin hook. The
env guard stops it running twice when Next re-imports the config.)

Velite then reads `velite.config.ts` and does five things to every post:

| # | What it does | Why it matters to you |
|---|---|---|
| 1 | **Validates** frontmatter against a Zod schema | A typo'd field, a missing title, a 400-character description → **the build fails with a named error.** You cannot ship a broken post. |
| 2 | **Compiles** the MDX body to JavaScript | The body becomes executable React, not a string to parse later |
| 3 | **Processes images** — copies `./cover.png` to `public/static/cover-a1b2c3.png`, reads its real width/height, generates a blur placeholder | Hashed filenames = safe caching forever. Known dimensions = no layout shift. Identical files dedupe automatically. |
| 4 | **Computes** `slug`, `permalink`, `readingTime`, `wordCount`, `toc` | You never type reading time. It's measured, so it can't drift. |
| 5 | **Cross-checks** every post's `author` against the authors collection | `author: bob` with no `content/authors/bob.yml` fails the build, instead of 404ing in production |

Output lands in `.velite/` (gitignored — regenerated every build):

```
.velite/
├── posts.json      every post, validated and compiled
├── authors.json    every author
└── index.d.ts      TypeScript types, derived from the schema
```

That last file is the quiet win: **the schema generates the types.** Add a field
to `velite.config.ts` and it's immediately available and type-safe in every page,
with no interface to keep in sync by hand.

Here's the sample post after processing — note what you wrote versus what was
computed for you:

```jsonc
{
  "title": "Sample Post: Blog Content Conventions",   // you wrote
  "date": "2026-07-09T00:00:00.000Z",                 // you wrote
  "author": "roop-reddy",                             // you wrote
  "cover": {                                          // you wrote "./cover.png"
    "src": "/static/cover-9f2e11.png",                //   ↓ velite added
    "width": 1200, "height": 630,
    "blurDataURL": "data:image/webp;base64,UklGRi4AAA..."
  },
  "slug": "sample-post",                              // velite derived
  "permalink": "/blog/sample-post",                   // velite derived
  "metadata": { "readingTime": 2, "wordCount": 310 }, // velite measured
  "toc": [ … ],                                       // velite extracted
  "body": "const{Fragment:e,jsx:t,jsxs:n}=arguments[0];function…"  // velite compiled
}
```

---

## Stage 3 — How the pages read it: one seam

`.velite/` is reachable as `#site/content` (a path alias in `tsconfig.json`), but
**only one file in the codebase imports it** — `lib/posts.ts`:

```ts
import { authors, posts, type Author, type Post } from '#site/content'

export function getPublishedPosts(): Post[] { … }   // newest first, drafts stripped in prod
export function getPostBySlug(slug: string) { … }
export function getAuthorForPost(post: Post) { … }
export function getPostsByAuthor(slug: string) { … }
export function formatDate(date: string) { … }
```

Every page calls these **functions**, never the arrays. That's deliberate: it's a
seam. If content ever moves to a CMS, you rewrite this one file and not a single
route changes.

It's also where the draft rule lives — one line, applied everywhere:

```ts
.filter((post) => (isProd ? !post.draft : true))
```

`draft: true` → the post renders in `npm run dev`, and is absent from the
production build, the sitemap, and the RSS feed. One flag, no other bookkeeping.

---

## Stage 4 — How it gets displayed

Five routes consume that seam:

```
lib/posts.ts
   │
   ├──▶ app/blog/page.tsx                 listing — divided list, 180px cover thumb
   ├──▶ app/blog/[slug]/page.tsx          the post  →  MDXContent  ◀── the interesting one
   ├──▶ app/blog/authors/[slug]/page.tsx  profile + that author's posts
   ├──▶ app/blog/rss.xml/route.ts         the feed
   └──▶ app/sitemap.ts                    every post + author URL
```

`app/blog/[slug]/page.tsx` renders the header from frontmatter — date, reading
time, title, description, byline, cover — then hands the body off:

```tsx
<div className="prose prose-lg max-w-none">
  <MDXContent code={post.body} />
</div>
```

### How MDX becomes React

`post.body` is neither Markdown nor HTML. Velite compiled it into **the body of a
JavaScript function**. `components/mdx.tsx` calls that function with React's JSX
runtime and gets a component back:

```tsx
function getMDXComponent(code: string) {
  const fn = new Function(code)        // code is a function body
  return fn({ ...runtime }).default    // fed react/jsx-runtime → returns a component
}
```

That component accepts a `components` map, but the map here is deliberately
almost empty — **one override, for external links:**

```tsx
const defaultComponents: MDXComponents = {
  a: ({ href = '', children, ...props }) => { /* http → target="_blank" */ },
}
```

Everything else is plain HTML from Markdown, styled by Tailwind Typography.

### Where the article styling lives

`prose` classes, themed to the site's tokens in `app/globals.css`:

```css
.prose {
  --tw-prose-body: var(--color-mauve-700);
  --tw-prose-headings: var(--color-mauve-950);
  --tw-prose-links: var(--color-red-500);
  …
}
.prose h2, .prose h3, .prose h4 {
  font-family: var(--font-geist), sans-serif;
  scroll-margin-top: 5rem;    /* anchors land below the sticky navbar */
}
```

**To change how article bodies look, edit those variables — not the pages.** One
place governs every post.

The only MDX plugin is `rehype-slug`, which gives every heading an `id` so
`## Some heading` becomes linkable and the computed `toc` anchors resolve.

---

## The whole flow, end to end

```
content/blog/<slug>/index.mdx        ← 1. you write a file
content/blog/<slug>/cover.png
content/authors/<slug>.yml
        │
        ▼  next.config.ts fires velite before Next boots
   velite.config.ts                  ← 2. validate · compile · hash images · measure
        │                                  (a bad field fails the build here)
        ▼
   .velite/  ──alias──▶  #site/content
        │
        ▼  lib/posts.ts              ← 3. the only importer; drafts + sorting live here
        │
        ├──▶ /blog            divided list of posts
        ├──▶ /blog/[slug]     post ─▶ components/mdx.tsx ← 4. compiled MDX back to React
        │                                    └─▶ .prose in globals.css styles it
        ├──▶ /blog/authors/[slug]
        ├──▶ /blog/rss.xml
        └──▶ /sitemap.xml
```

**To publish a post, you do exactly one thing:** drop a folder into
`content/blog/`. Routing, the listing entry, the author page, the sitemap entry,
the RSS item, the OG image, and the JSON-LD all follow automatically — because
every one of them is derived from the same validated record.

---

## Things that will bite you

| Gotcha | Why |
|---|---|
| Keep post folders **flat** | `content/blog/a/b/index.mdx` produces the slug `a/b`, which the single-segment `/blog/[slug]` route cannot serve |
| A post can never be named `authors` or `rss.xml` | Both are real route segments under `/blog/` and would collide |
| `.velite/` and `public/static/` are gitignored | They regenerate on every build. If your editor reports "cannot find module '#site/content'", run `npx velite build` |
| Unknown `author` slug fails the **build**, not the request | Intentional. Add `content/authors/<slug>.yml` first |
| `readingTime` / `wordCount` are computed | Don't put them in frontmatter — they're measured from the body |
| Code blocks are unhighlighted | No syntax-highlighting plugin is installed. Add `rehype-pretty-code` to `velite.config.ts` if you want one |
| `toc` is computed but unused | A table of contents is a drop-in whenever you want it — the data is already there |
