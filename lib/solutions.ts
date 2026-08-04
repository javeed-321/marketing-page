/**
 * Content for the four /solutions pages. Data only — no JSX, no styling.
 * `app/solutions/` renders it through the shared section blocks, the same way
 * `components/site/*` feeds the homepage.
 *
 * Ported verbatim from the previous site build. The two shape types below were
 * imported from a `shared.tsx` of hand-rolled section components there; this
 * repo renders through `components/sections/*` instead, so they live here.
 */

/** One "title + lead + bullets" block on a solution page. */
export type FeatureSectionData = {
  title: string;
  lead: string;
  bullets: string[];
  note?: string;
  /** Alt text for the illustration slot. No art commissioned yet. */
  imageLabel: string;
};

/** A use case or pain point. */
export type TitledItem = {
  title: string;
  description: string;
};

/* ------------------------------------------------------------------ */
/*  The live /solutions page                                          */
/*                                                                    */
/*  Scraped verbatim from https://documentation.ai/solutions on        */
/*  2026-08-04. Every string below is the live copy — do not reword.   */
/*  The live page is a single page with three audience sections; the   */
/*  `solutions[]` array further down drives the deeper /solutions/     */
/*  <slug> pages, which have their own (older) copy.                   */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  The deeper /solutions/<slug> pages                                */
/* ------------------------------------------------------------------ */

export type Solution = {
  slug: string;
  /** Short label used on hub cards and breadcrumbs, e.g. "Product Owners" */
  label: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    title: string;
    subtitle: string;
  };
  sections: FeatureSectionData[];
  useCases: {
    lead: string;
    items: TitledItem[];
  };
  pains: {
    lead: string;
    items: TitledItem[];
  };
  ctaHeading: string;
  /** One-liner shown on the /solutions hub card */
  cardSummary: string;
  /** Three highlight bullets shown on the /solutions hub card */
  cardBullets: string[];
};

export const solutions: Solution[] = [
  /* ---------------------------------------------------------------- */
  /*  Product Owners                                                  */
  /* ---------------------------------------------------------------- */
  {
    slug: "product-owners",
    label: "Product Owners",
    metaTitle: "Documentation for Product Owners",
    metaDescription:
      "Ship clear, accurate, user-ready product documentation without depending on engineering. The AI Documentation Agent keeps guides, release notes, and changelogs fresh through every release.",
    hero: {
      title: "Documentation for Product Owners",
      subtitle:
        "Ship products with clear, accurate, user-ready documentation, without depending on engineering for every update.",
    },
    sections: [
      {
        title: "Ship docs without engineering",
        lead: "Create and publish product guides, feature overviews, release notes, and changelogs yourself. No tickets, no waiting on a deploy.",
        bullets: [
          "Write and edit in a clean editor, no code required",
          "Create feature overviews, release notes, and changelogs effortlessly",
          "Publish updates instantly, without an engineering ticket",
          "Beautiful, branded docs with custom domains and custom styling",
        ],
        note: "Product teams own the full documentation lifecycle, from first draft to published page, at the pace of the release cycle.",
        imageLabel: "Product editor illustration",
      },
      {
        title: "Docs that stay fresh through every release",
        lead: "The AI Documentation Agent works alongside your product development, so documentation never falls behind the product.",
        bullets: [
          "AI Documentation Agent detects product changes and drafts updates",
          "Suggestions come to you for review, nothing publishes on its own",
          "Stale content is surfaced before your users find it",
          "Onboarding guides stay aligned with the product as it evolves",
        ],
        note: "You keep editorial control. The AI removes the maintenance burden, not the human oversight.",
        imageLabel: "AI Documentation Agent illustration",
      },
      {
        title: "Drive adoption and get found by AI",
        lead: "Clear, structured documentation improves product adoption, and AI-optimized content makes sure your product shows up where users ask questions.",
        bullets: [
          "Improve product adoption with clear, structured guides",
          "Deliver faster onboarding for users and internal teams",
          "Auto-generated llms.txt makes your product visible to AI search engines",
          "Structured content that ChatGPT, Claude, and Perplexity can cite",
        ],
        imageLabel: "AI discoverability illustration",
      },
    ],
    useCases: {
      lead: "Everything a product team publishes, on one platform.",
      items: [
        {
          title: "Product Guides",
          description:
            "Feature walkthroughs and how-to tutorials that stay in sync as the product evolves.",
        },
        {
          title: "Release Notes & Changelogs",
          description:
            "Keep users informed of every release with structured, searchable changelogs.",
        },
        {
          title: "Onboarding Flows",
          description:
            "Step-by-step getting-started guides that shorten time-to-value for new users.",
        },
      ],
    },
    pains: {
      lead: "The documentation problems product owners tell us about most.",
      items: [
        {
          title: "Docs go stale after every release",
          description:
            "No one owns updates, so documentation drifts from reality and erodes user trust.",
        },
        {
          title: "Every update needs engineering",
          description:
            "Simple copy changes wait in a sprint backlog while users read outdated guides.",
        },
        {
          title: "Users can't find answers",
          description:
            "Poor structure and search mean users give up on docs and file tickets instead.",
        },
        {
          title: "Invisible in AI search",
          description:
            "AI assistants answer questions about your product from stale training data, not your docs.",
        },
      ],
    },
    ctaHeading: "Ready to ship docs without waiting on engineering?",
    cardSummary:
      "Ship user-ready documentation without depending on engineering, and keep it fresh through every release cycle.",
    cardBullets: [
      "Release notes and changelogs without tickets",
      "AI Documentation Agent keeps guides current",
      "Surface your product in AI-powered search",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Developers                                                      */
  /* ---------------------------------------------------------------- */
  {
    slug: "developers",
    label: "Developers",
    metaTitle: "Documentation for Developers",
    metaDescription:
      "Build documentation the same way you build software. Docs-as-code with Git workflows and MDX, API references auto-generated from OpenAPI schemas, and a built-in MCP server for AI coding agents.",
    hero: {
      title: "Documentation for Developers",
      subtitle:
        "Build documentation the same way you build software. Git workflows, Markdown, and automation that keeps docs in sync with your code.",
    },
    sections: [
      {
        title: "Docs-as-code, end to end",
        lead: "Write in Markdown and MDX, review in pull requests, and ship through the same workflows you already use for code.",
        bullets: [
          "Docs-as-code with Markdown + MDX",
          "Full Git workflows, branches, PRs, and versioning",
          "IDE-assisted updates and suggestions",
          "CI pipeline integration for automated checks",
          "Perfect Lighthouse scores out-of-the-box",
        ],
        note: "No self-hosting, no static-site plumbing to maintain. You get the docs-as-code workflow without the infrastructure burden.",
        imageLabel: "Git workflow illustration",
      },
      {
        title: "API references that write themselves",
        lead: "Point Documentation.AI at your OpenAPI schema and get accurate, interactive API documentation that updates with your spec.",
        bullets: [
          "API docs auto-generated from OpenAPI schemas",
          "Interactive API playground for every endpoint",
          "Versioned endpoints and authentication guides",
          "Code samples and per-language tabs for SDK docs",
        ],
        imageLabel: "API reference illustration",
      },
      {
        title: "Native to the AI agent ecosystem",
        lead: "Your docs become knowledge infrastructure that coding agents can query directly, so AI tools answer questions about your product correctly.",
        bullets: [
          "Built-in MCP server, included from the Free tier",
          "Works alongside any coding agent, including Cursor, Windsurf, and Claude Code",
          "Auto-generated llms.txt for AI discoverability",
          "Structured content optimized for precise LLM chunking and retrieval",
          "Automatic change detection for doc drift (coming soon)",
        ],
        note: "Developers stay in flow with a documentation system that works inside their editor and speaks the same protocols as their tools.",
        imageLabel: "MCP integration illustration",
      },
    ],
    useCases: {
      lead: "From quickstarts to full developer portals.",
      items: [
        {
          title: "API Reference",
          description:
            "Auto-generated, always-accurate API docs with interactive examples and schemas.",
        },
        {
          title: "Developer Portals",
          description:
            "A unified hub for SDKs, quickstarts, code samples, CLI references, and changelogs.",
        },
        {
          title: "SDK & Library Docs",
          description:
            "Per-language references with code tabs, install snippets, and versioned API surfaces.",
        },
      ],
    },
    pains: {
      lead: "The documentation problems engineers tell us about most.",
      items: [
        {
          title: "Writing docs competes with shipping code",
          description:
            "Documentation is a chore that always loses to the sprint, so it never gets written or updated.",
        },
        {
          title: "Docs drift from the code",
          description:
            "Every merge widens the gap between what the docs say and what the API actually does.",
        },
        {
          title: "Self-hosted frameworks are a tax",
          description:
            "Docusaurus and friends mean self-hosting, manual upkeep, and zero AI capabilities.",
        },
        {
          title: "AI agents can't read your docs",
          description:
            "Coding agents rely on stale training data because there is no structured, real-time feed.",
        },
      ],
    },
    ctaHeading: "Ready for docs that work like your codebase?",
    cardSummary:
      "Docs-as-code with Git workflows, auto-generated API references, and a built-in MCP server for coding agents.",
    cardBullets: [
      "Markdown + MDX with branches, PRs, and versioning",
      "API docs auto-generated from OpenAPI schemas",
      "MCP server included from the Free tier",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Support Teams                                                   */
  /* ---------------------------------------------------------------- */
  {
    slug: "support-teams",
    label: "Support Teams",
    metaTitle: "Documentation for Support Teams",
    metaDescription:
      "Build a knowledge base that actually reduces tickets. AI search and an embedded AI Assistant deliver instant, cited answers while the AI Documentation Agent keeps every article accurate.",
    hero: {
      title: "Documentation for Support Teams",
      subtitle:
        "Build a knowledge base that actually reduces tickets, with AI-powered answers your customers can trust.",
    },
    sections: [
      {
        title: "Deflect tickets with self-serve answers",
        lead: "Give customers instant, accurate answers so the questions your docs can handle never reach the queue.",
        bullets: [
          "Beautiful, fast, searchable knowledge base",
          "AI search that delivers instant answers",
          "Embedded AI Assistant with cited answers from your content",
          "Reduce support load with self-serve help",
        ],
        note: "Every answer cites its source article, so customers can verify and dig deeper on their own.",
        imageLabel: "AI Assistant illustration",
      },
      {
        title: "Content that stays accurate at scale",
        lead: "Growing knowledge bases decay without constant gardening. The AI Documentation Agent does the gardening for you.",
        bullets: [
          "Keep support articles aligned with product changes",
          "AI Documentation Agent flags stale content for review",
          "Consistent structure and tone across hundreds of articles",
          "Remove outdated content automatically (coming soon)",
        ],
        imageLabel: "Content freshness illustration",
      },
      {
        title: "Know what your customers are asking",
        lead: "Analytics on search queries, AI Assistant conversations, and article feedback show you exactly where the content gaps are.",
        bullets: [
          "Traffic, feedback, and AI Assistant usage analytics",
          "Spot content gaps from real customer questions",
          "Internal and external knowledge sharing from one platform",
          "Prioritize new articles by actual demand, not guesswork",
        ],
        note: "Support teams deliver faster, more accurate answers while the content improves itself with every product update.",
        imageLabel: "Analytics dashboard illustration",
      },
    ],
    useCases: {
      lead: "Self-serve support content that scales with your customers.",
      items: [
        {
          title: "Help Centers",
          description:
            "Self-service help centers with AI answers that reduce ticket volume and delight customers.",
        },
        {
          title: "Customer Knowledge Base",
          description:
            "Structured articles, guides, and FAQs that make every answer findable in seconds.",
        },
        {
          title: "Troubleshooting Guides",
          description:
            "Step-by-step resolution paths that get customers unstuck without opening a ticket.",
        },
      ],
    },
    pains: {
      lead: "The documentation problems support leaders tell us about most.",
      items: [
        {
          title: "Tickets for documented questions",
          description:
            "Users file tickets for answers that already exist because they can't find them or don't trust them.",
        },
        {
          title: "Outdated articles pile up",
          description:
            "Content drifts and duplicates accumulate, and no one knows what is safe to delete.",
        },
        {
          title: "Knowledge bases don't scale",
          description:
            "Manual maintenance falls behind as the article count grows, so quality decays over time.",
        },
        {
          title: "Docs lag behind the product",
          description:
            "Every release quietly invalidates support articles, and customers find out before you do.",
        },
      ],
    },
    ctaHeading: "Ready to build a knowledge base that cuts ticket volume?",
    cardSummary:
      "A knowledge base that reduces tickets, with AI answers for customers and AI maintenance for your content.",
    cardBullets: [
      "AI Assistant delivers instant, cited answers",
      "Articles stay aligned with product changes",
      "Analytics reveal content gaps from real queries",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Internal Knowledge (Team / Operations Leads)                    */
  /* ---------------------------------------------------------------- */
  {
    slug: "internal-knowledge",
    label: "Internal Knowledge",
    metaTitle: "Internal Knowledge Base for Teams",
    metaDescription:
      "Turn tribal knowledge into a searchable, maintained internal knowledge base. SOPs, runbooks, onboarding guides, and policies that stay current and answer questions instantly.",
    hero: {
      title: "One Source of Truth for Your Team",
      subtitle:
        "Turn tribal knowledge into a searchable, maintained internal knowledge base. SOPs, runbooks, onboarding guides, and policies that stay current.",
    },
    sections: [
      {
        title: "Centralize your tribal knowledge",
        lead: "Move the knowledge living in Slack threads, Google Docs, and people's heads into one structured, private knowledge base.",
        bullets: [
          "SOPs, runbooks, design systems, and policies in one place",
          "Access controls keep internal content private to your team",
          "Structured organization instead of scattered wikis",
          "One platform for internal and external documentation",
        ],
        note: "When knowledge lives in one maintained place, it stops walking out the door with departing teammates.",
        imageLabel: "Internal knowledge base illustration",
      },
      {
        title: "Answers your team finds instantly",
        lead: "AI search and the embedded AI Assistant answer internal questions with citations, so nobody has to interrupt a teammate to find a process.",
        bullets: [
          "AI search across every SOP, runbook, and guide",
          "AI Assistant gives instant, cited answers to team questions",
          'Eliminate repeated "where do I find X?" questions',
          "Accelerate new-hire ramp with self-serve onboarding docs",
        ],
        imageLabel: "AI search illustration",
      },
      {
        title: "Internal docs that stay current",
        lead: "Internal wikis usually die of neglect. The AI Documentation Agent keeps yours alive by surfacing what needs attention.",
        bullets: [
          "AI Documentation Agent flags stale SOPs and runbooks for review",
          "Drafted updates come to owners for approval",
          "Content stays searchable by your team and your AI tools",
          "Docs accessible to AI agents via the built-in MCP server",
        ],
        note: "Operations teams get a knowledge base that maintains itself, instead of another wiki that goes stale in six months.",
        imageLabel: "Content review illustration",
      },
    ],
    useCases: {
      lead: "Every kind of internal knowledge, structured and searchable.",
      items: [
        {
          title: "Internal Knowledge Bases",
          description:
            "Private team wikis with access controls that keep institutional knowledge searchable.",
        },
        {
          title: "SOPs & Runbooks",
          description:
            "Standard procedures and incident runbooks that stay accurate and easy to follow.",
        },
        {
          title: "Onboarding Guides",
          description:
            "Self-serve ramp-up paths that get new hires productive in days, not weeks.",
        },
      ],
    },
    pains: {
      lead: "The knowledge problems operations leaders tell us about most.",
      items: [
        {
          title: "Knowledge lives in people's heads",
          description:
            "Critical processes exist only in Slack threads and memory, and leave when people do.",
        },
        {
          title: "New hires take weeks to ramp",
          description:
            "Without a searchable, maintained knowledge base, onboarding means shadowing and asking around.",
        },
        {
          title: "Scattered wikis go stale",
          description:
            "Every team keeps its own Notion pages and Google Docs, and none of them stay accurate.",
        },
        {
          title: "The same questions, every week",
          description:
            'Senior teammates lose hours answering repeated "where do I find X?" interruptions.',
        },
      ],
    },
    ctaHeading: "Ready to give your team one source of truth?",
    cardSummary:
      "A private, searchable knowledge base for SOPs, runbooks, and onboarding that stays current instead of going stale.",
    cardBullets: [
      "Centralize tribal knowledge with access controls",
      "AI answers eliminate repeated internal questions",
      "New hires ramp with self-serve onboarding docs",
    ],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((solution) => solution.slug === slug);
}
