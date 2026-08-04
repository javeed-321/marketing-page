<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Documentation.AI marketing site

Next.js 16 (App Router, Turbopack) + Tailwind CSS v4 + Velite content layer.

## Blog

Posts are MDX folders under `content/blog/<slug>/`, images colocated and
referenced relatively (`cover: ./01.jpg`). Velite validates frontmatter against a
Zod schema at build time, compiles the MDX, hashes images into `public/static/`,
and computes `slug`, `permalink`, `readingTime`, `wordCount`, and `toc`. Typed
content is imported from `#site/content` (generated into `.velite/`, gitignored).

**Read [`docs/blog-pipeline.md`](docs/blog-pipeline.md) before touching anything
under `content/`, `lib/posts.ts`, `components/mdx*.tsx`, or `app/blog/`.** It
explains the full flow — where data comes from, how it's processed, how it's
rendered — and the gotchas.

Frontmatter (`velite.config.ts` is the source of truth):

```yaml
title: string (max 120)        # required
description: string (max 300)  # required — also the deck and the listing blurb
date: YYYY-MM-DD               # required
lastUpdated: YYYY-MM-DD        # optional — set on freshness updates
author: author-slug            # required — must match a file in content/authors/
tags: [string]                 # optional
cover: ./cover.png             # optional, relative path
draft: boolean                 # true = visible in dev, excluded from prod
canonical: url                 # optional override
```

Do not put `slug`, `permalink`, `readingTime`, `wordCount`, or `toc` in
frontmatter — Velite computes them.

Post bodies are **plain MDX** — headings, paragraphs, lists, Markdown tables,
code fences, inline SVG — styled by Tailwind Typography (`.prose`, themed in
`app/globals.css`). The single custom tag is `<YouTube id="…" title="…" />`,
which renders a click-to-play thumbnail rather than a live iframe; write that
instead of an `<iframe>` (see `docs/blog-pipeline.md` for why).
`content/blog/sample-post/` demonstrates every supported element — it is a
placeholder to delete before launch.

### What's already wired (don't rebuild)

- `/blog`, `/blog/[slug]`, `/blog/authors/[slug]` — `app/blog/`
- MDX rendering — `components/mdx.tsx` (one override: external links open in a
  new tab). Article styling lives in `.prose` in `app/globals.css`, not in the
  pages — edit it there to restyle every post at once.
- JSON-LD: BlogPosting + BreadcrumbList per post, Blog on the listing,
  ProfilePage + Person on author pages (`components/json-ld.tsx`)
- OG cards generated per request from frontmatter —
  `app/blog/[slug]/opengraph-image.tsx`, no per-post files needed
- RSS `/blog/rss.xml`, `sitemap.xml`, `robots.txt`
- Site constants (name, URL, blog title) — `lib/site.ts`

### Conventions

- Velite runs from `next.config.ts` on `dev`/`build`; standalone check:
  `npx velite build`
- Verify content changes with `npm run build` — schema violations fail the build
  with precise errors
- Video or files >5MB: do not commit — use Vercel Blob or embeds
