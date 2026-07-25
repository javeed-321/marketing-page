Marketing-site clone of [documentation.ai](https://documentation.ai), built with Next.js (App Router), Tailwind CSS v4, and the Tailwind Plus "Oatmeal" template. All components are React **server components** (no `'use client'`).

## Project structure — where to change what

```
app/
  page.tsx            Homepage — just stacks the section components (order lives here)
  layout.tsx          Navbar + footer shell, fonts (Geist / Geist Mono / Inter)
  globals.css         Design tokens (colors, fonts), FAQ animation, light-mode lock
  about|pricing|privacy-policy|404/   Secondary pages (template blocks)

components/
  site/               ★ THE PAGE — one file per homepage section, top-to-bottom:
                      hero-section, product-tabs (hero tabs), docs-that-keep-up,
                      ai-documentation-agent, built-for-ai, beautiful-docs,
                      more-reasons (+agentic-assistant-card), trusted-by,
                      publishing-experience, final-cta, faqs-section, site-footer
                      (+ logo-wordmark, footer-watermark)
  sections/           Reusable template blocks (bento grids, hero, FAQ, footer…)
                      shared by all pages — edit these only for cross-page changes
  elements/           Primitives: Button, Container, Heading, Subheading, Text…
  icons/
    framer/           ★ EXACT icons extracted from documentation.ai (tabs, cards,
                      socials). Add new site icons here.
    *.tsx             Generic template icon library (mostly unused, kept as a kit)

public/img/           Screenshots & illustrations per section (tabs/, sections/, features/)
```

Conventions worth knowing before editing:

- **Colors** are tokens in `app/globals.css`: `bg-card` (#F5F3F1), `ring-card-border`
  (#E3E1DF), brand red `red-500` (#EC5B5B), warm-gray text scale `mauve-*`.
  Change them there, not per-component.
- **Type scale** matches the real site: h1 72px, section h2 48px/1.1, card titles
  18px Geist w400, card body 14px — set in `elements/heading.tsx`,
  `elements/subheading.tsx`, `elements/text.tsx` and the card components.
- The FAQ uses native `<details>` + the `.faq-disclosure` rules in `globals.css`
  for its smooth open/close animation.
- `dark:` classes exist but are inert — light mode is forced in `globals.css`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
