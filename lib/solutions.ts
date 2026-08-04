/**
 * Content for /solutions. Data only — no JSX, no styling. `app/solutions/`
 * renders it through the shared section blocks, the same way `components/site/*`
 * feeds the homepage.
 *
 * Scraped verbatim from https://documentation.ai/solutions on 2026-08-04. Every
 * string here is the live copy — do not reword it.
 *
 * The live site is a SINGLE page with three audience sections, so there is no
 * `/solutions/<slug>` route and the navbar links to `#`-anchors on this page.
 * An earlier build of this repo had four sub-pages driven by older copy that no
 * longer matches the live site; both the routes and that data were removed.
 */

/** A bullet on an audience section. `comingSoon` renders the live italic tag. */
export type SolutionBullet = { text: string; comingSoon?: boolean };

export type SolutionAudience = {
  /** Anchor id, also the illustration's filename stem. */
  id: string;
  title: string;
  lead: string;
  /** Downloaded from the live page into public/img/solutions/. 960×960. */
  image: string;
  bullets: SolutionBullet[];
  note: string;
};

export const SOLUTIONS_HERO = {
  headline: "Solutions for Every Team",
  subheadline:
    "Create, manage, and publish beautiful, AI-optimized documentation for product teams, developers, and support teams—all on one platform.",
};

export const SOLUTION_AUDIENCES: SolutionAudience[] = [
  {
    id: "product-owners",
    title: "For Product Owners",
    lead: "Ship products with clear, accurate, user-ready documentation—without depending on engineering.",
    image: "/img/solutions/product-owners.png",
    bullets: [
      { text: "Improve product adoption with clear, structured guides" },
      { text: "Deliver faster onboarding for users and internal teams" },
      { text: "Reduce dependency on developers for every documentation update" },
      { text: "Keep docs always up-to-date with the AI Documentation Agent" },
      { text: "Ensure your product surfaces in AI-powered search engines" },
      { text: "Create feature overviews, release notes, and change logs effortlessly" },
    ],
    note: "Product teams get fast, reliable documentation that stays fresh throughout every release cycle — without the usual maintenance burden.",
  },
  {
    id: "developers",
    title: "For Developers",
    lead: "Build documentation the same way you build software.",
    image: "/img/solutions/developers.png",
    bullets: [
      { text: "Docs-as-code with Markdown + MDX" },
      { text: "Full Git workflows, branches, PRs, and versioning" },
      { text: "API docs auto-generated from schemas" },
      { text: "Automatic change detection for doc drift", comingSoon: true },
      { text: "Works alongside any coding agent via MCP" },
      { text: "IDE-assisted updates and suggestions" },
      { text: "Perfect Lighthouse scores out-of-the-box" },
    ],
    note: "Developers stay in flow with a documentation system that works inside their editor, supports CI pipelines, and auto-updates when code changes.",
  },
  {
    id: "support-teams",
    title: "For Support Teams",
    lead: "Build a knowledge base that actually reduces tickets.",
    image: "/img/solutions/support-teams.png",
    bullets: [
      { text: "Beautiful, fast, searchable knowledge base" },
      { text: "AI search that delivers instant answers" },
      { text: "Reduce support load with self-serve help" },
      { text: "Keep support articles aligned with product changes" },
      { text: "Surface accurate answers with the embedded AI Assistant" },
      { text: "Internal and external knowledge sharing" },
      { text: "Remove outdated content automatically", comingSoon: true },
    ],
    note: "Support teams deliver faster, more accurate answers—while the AI Documentation Agent keeps content fresh, consistent, and always aligned with product updates.",
  },
];

export const SOLUTIONS_BUILD = {
  headline: "What You Can Build",
  lead: "Documentation.AI adapts to any team and any kind of content—from API docs to customer-facing help centers.",
  items: [
    {
      title: "Developer Documentation",
      description:
        "API references, SDK docs, tutorials, and engineering guides—powered by Markdown/MDX, versioning, and AI-assisted updates to keep docs fast, structured, and current.",
    },
    {
      title: "Customer Knowledge Base",
      description:
        "Help centers, FAQs, troubleshooting guides, and product tutorials—with AI search for instant, accurate answers so customers find what they need faster and support teams get fewer tickets.",
    },
    {
      title: "Product Documentation",
      description:
        "Feature overviews, onboarding flows, changelogs, and release notes—created and updated by the AI Documentation Agent for product managers and cross-functional teams.",
    },
  ],
};

export const SOLUTIONS_PAINS = {
  headline: "Pain Points We Solve",
  lead: "We eliminate the most frustrating documentation problems—with AI doing the heavy lifting.",
  items: [
    {
      title: "Docs constantly go stale",
      description:
        "The Documentation Agent detects changes, drafts updates, and helps teams maintain accuracy effortlessly.",
    },
    {
      title: "Developers hate writing docs",
      description:
        "Docs-as-code, IDE workflows, MCP integration—documentation gets done where code gets written.",
    },
    {
      title: "Knowledge bases are hard to maintain",
      description:
        "AI search, structured content, and agent-assisted updates keep everything fresh and consistent.",
    },
    {
      title: "Too many support tickets",
      description:
        "A great knowledge base + embedded AI Assistant = fewer repetitive questions and faster resolutions.",
    },
  ],
};

export const SOLUTIONS_CTA = {
  headline: "Ready to build documentation people and AI agents love?",
  note: "Live in under 5 min · No credit card required",
  primaryLabel: "Start for Free",
  secondaryLabel: "View Demo",
};
