/**
 * Placeholder blog data.
 *
 * Two dummy posts defined inline so the /blog routes render without any content
 * pipeline. Swap this module for a real data source later — the pages only use
 * the exported functions below, not the array itself.
 */

/**
 * One rendered section of an article.
 *
 * The three post shapes on the site (comparison / listicle / explainer) are not
 * three templates — they are three orderings of these same kinds. A post that
 * needs Pros & Cons includes a `prosCons` entry; one that doesn't, omits it. No
 * flags, no per-type layouts. `components/site/article-section.tsx` maps each
 * `kind` to its block, and its switch is exhaustive: adding a kind here without
 * a renderer there is a compile error.
 */
export type ArticleSection =
  /** Highlighted decision box every post opens with. */
  | { kind: 'tldr'; items: string[]; bottomLine?: string }
  /** Body copy under an optional H2. */
  | { kind: 'prose'; heading?: string; paragraphs: string[] }
  /** One tool in a listicle post, repeated per entry. */
  | {
      kind: 'featureList'
      heading: string
      intro?: string
      keyFeatures: string[]
      useIf?: string
      pricing?: string[]
      verdict?: string
    }
  /** Two headed columns of bullets. */
  | { kind: 'prosCons'; heading: string; pros: string[]; cons: string[] }
  /** Category-grouped table. `columns` are the platform names. */
  | {
      kind: 'comparisonTable'
      heading: string
      columns: string[]
      groups: { title: string; rows: { name: string; values: Record<string, string | boolean> }[] }[]
    }
  /** Migration / Slack band. */
  | { kind: 'cta'; headline: string; body: string; label: string; href: string }
  /** Accordion of question-and-answer pairs. */
  | { kind: 'faq'; heading: string; items: { q: string; a: string }[] }


export type Post = {
  slug: string
  permalink: string
  title: string
  description: string
  excerpt: string
  date: string
  lastUpdated?: string
  author: string
  tags: string[]
  cover?: string
  readingTime: number
  wordCount: number
  sections: ArticleSection[]
}

export type Author = {
  slug: string
  permalink: string
  name: string
  role?: string
  bio?: string
  avatar?: string
  url?: string
  linkedin?: string
  twitter?: string
  knowsAbout?: string[]
}

const authors: Author[] = [
  {
    slug: 'roopreddy',
    permalink: '/blog/authors/roopreddy',
    name: 'Roop Reddy',
    role: 'Co-Founder, Documentation.AI',
    bio: 'Building Documentation.AI — the AI-native documentation and knowledge platform. Writes about documentation workflows, docs-as-code, and AI-native content.',
    knowsAbout: ['Documentation workflows', 'Docs-as-code', 'AI-native content'],
  },
]

const posts: Post[] = [
  {
    slug: 'api-documentation-tools',
    permalink: '/blog/api-documentation-tools',
    title: '7 Best API Documentation Tools in 2026',
    description:
      'The API documentation tools worth shortlisting in 2026, compared on reference generation, examples that actually run, and how well each keeps pace with a changing spec.',
    excerpt:
      'Generated reference is a starting point, not a finished doc. These seven tools are compared on how well they turn a spec into something developers keep open.',
    date: '2026-07-16',
    author: 'roopreddy',
    tags: ['API Reference'],
    cover: '/img/blog/api-documentation-tools/01.jpg',
    readingTime: 11,
    wordCount: 2140,
    sections: [
      {
        kind: 'tldr',
        items: [
          'Pick Documentation.AI if you want reference, guides, and an AI assistant in one place, kept current by an agent.',
          'Pick Stoplight if design-first OpenAPI authoring and governance matter more than the published experience.',
          'Pick Redocly if you already live in OpenAPI and want the cleanest generated reference available.',
          'Pick Postman if your team already runs collections there and docs are a by-product of testing.',
        ],
        bottomLine:
          'Generated reference is table stakes. The differentiator in 2026 is whether examples stay correct as the API changes.',
      },
      {
        kind: 'prose',
        heading: 'How to evaluate an API documentation tool',
        paragraphs: [
          'Most shortlists compare feature grids. That predicts very little, because every tool in this category can render an OpenAPI file. What separates them is what happens on the second and hundredth change to that file.',
          'Three questions surface the difference quickly: how much hand-written context can sit alongside generated reference, whether examples are tested or merely written, and what the workflow costs when the spec changes without warning.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Why generated reference is not documentation',
        paragraphs: [
          'A schema tells a reader what a field is called and what type it holds. It does not tell them why the field exists, which combinations are valid, or what happens when they get it wrong.',
          'That gap is where integration time is actually spent. The tools below are ranked on how well they let you close it without abandoning generation entirely.',
        ],
      },
      {
        kind: 'featureList',
        heading: '1. Documentation.AI',
        intro:
          'An AI-native platform that treats reference, guides, and the in-docs assistant as one surface rather than three products stitched together.',
        keyFeatures: [
          'Reference generated from OpenAPI, with hand-written context alongside it',
          'Documentation Agent that drafts updates when the spec moves',
          'In-docs AI assistant answering from your content with citations',
          'MCP server and auto-generated llms.txt for AI tooling',
          'Web editor and docs-as-code, usable by the same team',
        ],
        useIf:
          'you want one platform for reference and narrative docs, and you want the maintenance burden to fall on an agent rather than a person.',
        pricing: ['Free tier', 'Paid plans from $30/mo'],
        verdict:
          'The strongest fit when documentation has to serve AI agents and humans equally well, not just render a spec.',
      },
      {
        kind: 'featureList',
        heading: '2. Stoplight',
        intro: 'Design-first OpenAPI tooling with a visual editor and real governance controls.',
        keyFeatures: [
          'Visual OpenAPI editor for non-YAML authors',
          'Spectral linting and style-guide enforcement',
          'Mock servers generated from the spec',
          'Git-backed workflow with review gates',
        ],
        useIf: 'your bottleneck is spec quality and consistency across many teams, not the published site.',
        pricing: ['Free tier', 'Paid plans from $39/user/mo'],
        verdict: 'Best-in-class for authoring and governance; the published output is functional rather than beautiful.',
      },
      {
        kind: 'featureList',
        heading: '3. Redocly',
        intro: 'The cleanest generated API reference available, aimed squarely at OpenAPI-native teams.',
        keyFeatures: [
          'Three-column reference layout with inline examples',
          'Full docs-as-code pipeline with CI validation',
          'Multi-version and multi-spec support',
          'Extensive theming',
        ],
        useIf: 'OpenAPI is already the source of truth and you want reference output with no rough edges.',
        pricing: ['Free for open source', 'Paid plans from $10/user/mo'],
        verdict: 'Excellent reference, thinner story for the guides and tutorials that surround it.',
      },
      {
        kind: 'featureList',
        heading: '4. Postman',
        intro: 'Documentation as a by-product of the collections your team already maintains for testing.',
        keyFeatures: [
          'Docs generated directly from collections',
          'Examples that are real saved requests',
          'Public workspaces for external consumers',
          'Built-in mock servers and monitors',
        ],
        useIf: 'your team lives in Postman and you want published docs without a second system.',
        pricing: ['Free tier', 'Paid plans from $14/user/mo'],
        verdict: 'Unbeatable if collections are already your source of truth; limited as a general docs platform.',
      },
      {
        kind: 'featureList',
        heading: '5. ReadMe',
        intro: 'A hosted API documentation product with strong personalisation and usage analytics.',
        keyFeatures: [
          'Interactive API explorer with real keys',
          'Per-user personalised examples',
          'Request logs and usage metrics',
          'Changelog and discussion features',
        ],
        useIf: 'the developer portal experience is the product and you want analytics on how it is used.',
        pricing: ['Free tier', 'Paid plans from $99/mo'],
        verdict: 'Strong published experience; the editing model can frustrate teams who prefer plain Git.',
      },
      {
        kind: 'featureList',
        heading: '6. Mintlify',
        intro: 'Developer-first docs with a fast, modern published site and MDX authoring.',
        keyFeatures: [
          'MDX authoring with a component library',
          'API playground generated from OpenAPI',
          'Git-based workflow with preview deploys',
          'AI writing assistance',
        ],
        useIf: 'your writers are comfortable in Git and you want a polished site with minimal setup.',
        pricing: ['Free tier', 'Paid plans from $150/mo'],
        verdict: 'Fast to stand up and pleasant to read; less suited to non-technical contributors.',
      },
      {
        kind: 'featureList',
        heading: '7. Swagger UI',
        intro: 'The open-source default that ships with countless API projects.',
        keyFeatures: [
          'Renders any valid OpenAPI file',
          'Try-it-out request execution',
          'Self-hosted with no vendor involved',
          'Free and unrestricted',
        ],
        useIf: 'you need reference rendered today with zero budget and no requirement for surrounding guides.',
        pricing: ['Free and open source'],
        verdict: 'Still the fastest path to a rendered spec, and still nobody’s idea of a documentation platform.',
      },
      {
        kind: 'comparisonTable',
        heading: 'How the top API documentation tools compare',
        columns: ['Documentation.AI', 'Stoplight', 'Redocly'],
        groups: [
          {
            title: 'Fit',
            rows: [
              {
                name: 'Best for',
                values: {
                  'Documentation.AI': 'Reference + guides + AI',
                  Stoplight: 'Spec design & governance',
                  Redocly: 'OpenAPI-native reference',
                },
              },
              {
                name: 'Primary users',
                values: {
                  'Documentation.AI': 'Mixed teams',
                  Stoplight: 'API designers',
                  Redocly: 'Developers',
                },
              },
              {
                name: 'Non-technical friendly',
                values: { 'Documentation.AI': true, Stoplight: true, Redocly: false },
              },
            ],
          },
          {
            title: 'Authoring',
            rows: [
              { name: 'Docs-as-code', values: { 'Documentation.AI': true, Stoplight: true, Redocly: true } },
              { name: 'Web editor', values: { 'Documentation.AI': true, Stoplight: true, Redocly: false } },
              { name: 'Narrative guides alongside reference', values: { 'Documentation.AI': true, Stoplight: false, Redocly: true } },
            ],
          },
          {
            title: 'AI',
            rows: [
              { name: 'AI maintenance agent', values: { 'Documentation.AI': true, Stoplight: false, Redocly: false } },
              { name: 'In-docs assistant', values: { 'Documentation.AI': true, Stoplight: false, Redocly: false } },
              { name: 'MCP server', values: { 'Documentation.AI': true, Stoplight: false, Redocly: false } },
              { name: 'llms.txt', values: { 'Documentation.AI': true, Stoplight: false, Redocly: false } },
            ],
          },
          {
            title: 'Commercials',
            rows: [
              {
                name: 'Entry price',
                values: { 'Documentation.AI': '$30/mo', Stoplight: '$39/user/mo', Redocly: '$10/user/mo' },
              },
              { name: 'Free tier', values: { 'Documentation.AI': true, Stoplight: true, Redocly: true } },
            ],
          },
        ],
      },
      {
        kind: 'cta',
        headline: 'Thinking about migrating your API docs?',
        body: 'We help teams move reference and guides across without losing URLs or search rankings. Ask us in Slack — no pitch, just the migration path.',
        label: 'Talk to us',
        href: 'https://documentation.ai/get-a-demo',
      },
      {
        kind: 'prose',
        heading: 'Final verdict',
        paragraphs: [
          'If your API is the product, the published experience matters more than the authoring convenience, and ReadMe or Documentation.AI will serve you better than a pure generator.',
          'If the spec itself is the problem — inconsistent, undocumented, drifting — fix that first with Stoplight, then choose where to publish.',
        ],
      },
      {
        kind: 'faq',
        heading: 'Frequently asked questions',
        items: [
          {
            q: 'What is the best API documentation tool in 2026?',
            a: 'There is no single answer. Documentation.AI fits teams who need reference, guides, and AI access in one place; Redocly fits OpenAPI-native teams who only need reference.',
          },
          {
            q: 'Can API documentation be generated automatically?',
            a: 'Reference can. Guides, tutorials, and error explanations cannot — those need authoring, which is why the surrounding tooling matters.',
          },
          {
            q: 'Do I need OpenAPI to use these tools?',
            a: 'For most of them, yes. Postman is the exception, working from collections instead.',
          },
          {
            q: 'How do I keep examples from going stale?',
            a: 'Test them the same way you test the endpoints. Tools that let examples live in Git make this practical; tools that store them in a proprietary editor generally do not.',
          },
          {
            q: 'What does llms.txt do for API docs?',
            a: 'It exposes a clean, structured index of your content so AI assistants can retrieve accurate answers instead of guessing from a rendered page.',
          },
          {
            q: 'Is Swagger UI still worth using?',
            a: 'For rendering a spec quickly at no cost, yes. As a documentation platform it has never been the right tool.',
          },
        ],
      },
    ],
  },
  {
    slug: 'gitbook-alternatives',
    permalink: '/blog/gitbook-alternatives',
    title: '7 Best GitBook Alternatives for Documentation in 2026',
    description:
      'GitBook alternatives compared for teams who have outgrown it — on editing model, docs-as-code support, AI capability, and what migration actually costs.',
    excerpt:
      'Teams leave GitBook for predictable reasons: pricing at scale, editor limits, and weak AI support. These seven alternatives are compared on each.',
    date: '2026-07-13',
    author: 'roopreddy',
    tags: ['Alternatives'],
    cover: '/img/blog/gitbook-alternatives/01.jpg',
    readingTime: 10,
    wordCount: 1980,
    sections: [
      {
        kind: 'tldr',
        items: [
          'Pick Documentation.AI if you want GitBook’s ease of editing plus docs-as-code and an AI agent that maintains content.',
          'Pick Mintlify if your team is developer-heavy and happy working entirely in Git.',
          'Pick Document360 if governance, workflows, and approvals matter more than developer ergonomics.',
          'Pick Docusaurus if you want full control and have engineering time to spend on it.',
        ],
        bottomLine: 'Most teams leave GitBook over the editing model, not the price. Solve that first.',
      },
      {
        kind: 'prose',
        heading: 'What is GitBook and why do teams look elsewhere?',
        paragraphs: [
          'GitBook is a hosted documentation platform built around a block editor with optional Git sync. It is genuinely pleasant for small teams and gets people publishing quickly.',
          'The friction appears at scale: Git sync that works in one direction more reliably than the other, per-seat costs that climb, and an AI story that has lagged the market.',
        ],
      },
      {
        kind: 'prose',
        heading: 'How to evaluate a GitBook alternative',
        paragraphs: [
          'Start with who writes. If half your contributors will never open a terminal, a pure docs-as-code tool will quietly fail no matter how good it looks.',
          'Then check what the platform exposes to AI. In 2026 that means structured content, an llms.txt, and ideally an MCP server — not a chatbot bolted onto a search box.',
        ],
      },
      {
        kind: 'prosCons',
        heading: 'GitBook — pros and cons',
        pros: [
          'Excellent block editor that non-technical contributors adopt quickly',
          'Fast to set up with sensible defaults',
          'Clean published site with good search',
          'Reasonable free tier for small teams',
        ],
        cons: [
          'Git sync is bidirectional in name more than in practice',
          'Per-seat pricing escalates as contributor count grows',
          'Limited AI capability compared with newer platforms',
          'Customisation stops well short of full control',
        ],
      },
      {
        kind: 'featureList',
        heading: '1. Documentation.AI',
        intro: 'AI-native platform combining a web editor, docs-as-code, and an agent that keeps content current.',
        keyFeatures: [
          'Notion-style editor and Git workflow, both first-class',
          'Documentation Agent that drafts and formats updates',
          'In-docs assistant with cited answers',
          'MCP server and auto-generated llms.txt',
          '100+ components for callouts, tabs, and code',
        ],
        useIf: 'you want to keep GitBook’s editing experience without giving up Git or AI readiness.',
        pricing: ['Free tier', 'Paid plans from $30/mo'],
        verdict: 'The closest replacement for teams who liked GitBook but outgrew it.',
      },
      {
        kind: 'featureList',
        heading: '2. Mintlify',
        intro: 'Developer-first docs with MDX authoring and a polished published site.',
        keyFeatures: ['MDX with a component library', 'Git-based workflow with previews', 'API playground', 'AI writing assistance'],
        useIf: 'everyone who writes docs is already comfortable in a code editor.',
        pricing: ['Free tier', 'Paid plans from $150/mo'],
        verdict: 'A strong upgrade for engineering teams; a downgrade for everyone else.',
      },
      {
        kind: 'featureList',
        heading: '3. Document360',
        intro: 'Knowledge-base platform built around workflow, approvals, and governance.',
        keyFeatures: ['Review and approval workflows', 'Granular role-based permissions', 'Category-driven structure', 'Analytics and search reporting'],
        useIf: 'documentation passes through compliance or a formal review before publishing.',
        pricing: ['Paid plans from $149/mo'],
        verdict: 'The right answer when process is the requirement; heavier than most product teams need.',
      },
      {
        kind: 'featureList',
        heading: '4. ReadMe',
        intro: 'Hosted developer portal with personalisation and usage analytics.',
        keyFeatures: ['Interactive API explorer', 'Personalised examples per user', 'Request logs', 'Changelog features'],
        useIf: 'your docs are primarily an API portal rather than product documentation.',
        pricing: ['Free tier', 'Paid plans from $99/mo'],
        verdict: 'Excellent for API-first companies, mismatched for general product docs.',
      },
      {
        kind: 'featureList',
        heading: '5. Docusaurus',
        intro: 'Open-source React static site generator maintained by Meta.',
        keyFeatures: ['Full control over markup and theme', 'Versioning and i18n built in', 'Large plugin ecosystem', 'Free, self-hosted'],
        useIf: 'you have engineering time to invest and want no vendor in the path.',
        pricing: ['Free and open source'],
        verdict: 'Maximum control at the cost of owning hosting, search, and every upgrade.',
      },
      {
        kind: 'featureList',
        heading: '6. Archbee',
        intro: 'Product documentation platform with a block editor and developer-oriented features.',
        keyFeatures: ['Block editor with custom components', 'API reference support', 'Collaboration and comments', 'Multi-space organisation'],
        useIf: 'you want something close to GitBook with more room to customise.',
        pricing: ['Paid plans from $50/mo'],
        verdict: 'A sensible lateral move rather than a step change.',
      },
      {
        kind: 'featureList',
        heading: '7. Confluence',
        intro: 'Atlassian’s wiki, still the default for internal documentation in large organisations.',
        keyFeatures: ['Deep Jira integration', 'Mature permissions model', 'Templates and macros', 'Ubiquitous in enterprise'],
        useIf: 'the audience is internal and already lives in the Atlassian suite.',
        pricing: ['Free for small teams', 'Paid plans from $6/user/mo'],
        verdict: 'Fine for internal knowledge, wrong for public product documentation.',
      },
      {
        kind: 'comparisonTable',
        heading: 'How the top GitBook alternatives compare',
        columns: ['Documentation.AI', 'Mintlify', 'Document360'],
        groups: [
          {
            title: 'Fit',
            rows: [
              {
                name: 'Best for',
                values: {
                  'Documentation.AI': 'Mixed teams, AI-ready docs',
                  Mintlify: 'Developer-first teams',
                  Document360: 'Governed knowledge bases',
                },
              },
              { name: 'Non-technical friendly', values: { 'Documentation.AI': true, Mintlify: false, Document360: true } },
            ],
          },
          {
            title: 'Authoring',
            rows: [
              { name: 'Web editor', values: { 'Documentation.AI': true, Mintlify: false, Document360: true } },
              { name: 'Docs-as-code', values: { 'Documentation.AI': true, Mintlify: true, Document360: false } },
              { name: 'Approval workflows', values: { 'Documentation.AI': false, Mintlify: false, Document360: true } },
            ],
          },
          {
            title: 'AI',
            rows: [
              { name: 'AI maintenance agent', values: { 'Documentation.AI': true, Mintlify: false, Document360: false } },
              { name: 'In-docs assistant', values: { 'Documentation.AI': true, Mintlify: true, Document360: true } },
              { name: 'MCP server', values: { 'Documentation.AI': true, Mintlify: false, Document360: false } },
            ],
          },
          {
            title: 'Commercials',
            rows: [
              {
                name: 'Entry price',
                values: { 'Documentation.AI': '$30/mo', Mintlify: '$150/mo', Document360: '$149/mo' },
              },
              { name: 'Free tier', values: { 'Documentation.AI': true, Mintlify: true, Document360: false } },
            ],
          },
        ],
      },
      {
        kind: 'cta',
        headline: 'Thinking about migrating off GitBook?',
        body: 'We move content, structure, and redirects across so URLs and rankings survive. Ask us in Slack — no pitch, just the migration path.',
        label: 'Talk to us',
        href: 'https://documentation.ai/get-a-demo',
      },
      {
        kind: 'prose',
        heading: 'Final verdict',
        paragraphs: [
          'If GitBook’s editor is what kept your team writing, do not replace it with a tool that only speaks Git. Replace it with one that speaks both.',
          'If you are leaving over price alone, run the numbers on contributor count first — per-seat models punish exactly the behaviour you want to encourage.',
        ],
      },
      {
        kind: 'faq',
        heading: 'Frequently asked questions',
        items: [
          {
            q: 'Why do teams look for GitBook alternatives?',
            a: 'Most commonly the editing model at scale, per-seat pricing as contributor count grows, and limited AI capability relative to newer platforms.',
          },
          {
            q: 'What is the best GitBook alternative for non-technical writers?',
            a: 'Documentation.AI or Document360 — both keep a full web editor rather than assuming everyone works in Git.',
          },
          {
            q: 'Can I migrate my GitBook content without losing SEO?',
            a: 'Yes, provided you map old URLs to new ones with permanent redirects before switching DNS.',
          },
          {
            q: 'Is Docusaurus a realistic replacement?',
            a: 'Only if you have engineering capacity. You inherit hosting, search, and upgrades along with the control.',
          },
          {
            q: 'Do these tools support docs-as-code?',
            a: 'Documentation.AI, Mintlify, Docusaurus, and Redocly do. Document360 and Confluence do not in any meaningful sense.',
          },
          {
            q: 'Which alternative is best for AI agents?',
            a: 'Look for structured content, an auto-generated llms.txt, and an MCP server. Documentation.AI is the only option here with all three.',
          },
        ],
      },
    ],
  },
  {
    slug: 'mintlify-vs-readme',
    permalink: '/blog/mintlify-vs-readme',
    title: 'Mintlify vs ReadMe: How These Documentation Platforms Compare in 2026',
    description:
      'Compare Mintlify and ReadMe to understand how each documentation platform supports real-world workflows, from first setup to long-term maintenance.',
    excerpt:
      'Compare Mintlify and ReadMe to understand how each documentation platform supports real-world workflows. This hands-on comparison explores differences in setup, editing, AI, and cost.',
    date: '2026-04-18',
    author: 'roopreddy',
    tags: ['Comparisons'],
    cover: '/img/photos/1.webp',
    readingTime: 12,
    wordCount: 2380,
    sections: [
      {
        kind: 'tldr',
        items: [
          'Choose Mintlify if your writers work in Git and you want a fast, polished published site with minimal configuration.',
          'Choose ReadMe if your API is the product and you need personalisation, request logs, and usage analytics.',
          'Neither is a strong fit if non-technical contributors need to publish without a developer in the loop.',
        ],
        bottomLine:
          'Mintlify optimises for the people writing docs. ReadMe optimises for the people reading them. Pick the constraint that actually binds you.',
      },
      {
        kind: 'prose',
        heading: 'How these platforms were compared',
        paragraphs: [
          'Both platforms were set up from scratch with the same OpenAPI file and the same set of five guides, then maintained through three rounds of spec changes.',
          'The questions were practical: how long to first publish, what breaks when the spec changes, who can contribute without help, and what the bill looks like at twenty contributors.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Which is easier to set up: Mintlify or ReadMe?',
        paragraphs: [
          'Mintlify is faster to a working site if you already have a repository. Point it at your Git provider, drop in a config file, and previews build on every branch.',
          'ReadMe front-loads more configuration but hands you a working developer portal with an API explorer without additional wiring. The verdict depends on whether a repository already exists.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Writing and maintaining documentation over time',
        paragraphs: [
          'For developers, Mintlify is the more natural home: MDX in the repo, reviewed in the same pull request as the code it describes.',
          'For non-technical contributors, both platforms struggle. ReadMe’s editor is more approachable, but content still sits behind a model that assumes API familiarity.',
        ],
      },
      {
        kind: 'prose',
        heading: 'AI capabilities in real usage',
        paragraphs: [
          'Mintlify offers AI writing assistance during authoring and a reader-facing assistant on the published site. Both are useful, and both stop at the page boundary.',
          'ReadMe’s AI features lean toward search and summarisation. Neither platform ships an agent that notices when the product has changed and the docs have not.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Published documentation experience',
        paragraphs: [
          'Mintlify’s output is the better-looking of the two and measurably faster, with sensible defaults for typography, navigation, and search.',
          'ReadMe wins on interactivity. Real API keys in the explorer, personalised examples, and visible request logs matter more to an integrating developer than typography does.',
        ],
      },
      {
        kind: 'prose',
        heading: 'How much do Mintlify and ReadMe cost?',
        paragraphs: [
          'Mintlify starts at $150/month for teams, with pricing driven by editors and advanced features rather than readers.',
          'ReadMe starts at $99/month and scales by project and feature tier. At twenty contributors the two land closer together than the entry prices suggest.',
        ],
      },
      {
        kind: 'prosCons',
        heading: 'Pros and cons',
        pros: [
          'Mintlify: fastest path from repository to polished published site',
          'Mintlify: MDX and components make complex pages straightforward',
          'ReadMe: interactive explorer with real keys is genuinely useful',
          'ReadMe: request logs and analytics show how docs are actually used',
        ],
        cons: [
          'Mintlify: non-technical contributors are effectively locked out',
          'Mintlify: entry price is high relative to the category',
          'ReadMe: editing model frustrates teams who prefer plain Git',
          'ReadMe: weaker for narrative product documentation',
        ],
      },
      {
        kind: 'comparisonTable',
        heading: 'Mintlify vs ReadMe — final comparison',
        columns: ['Mintlify', 'ReadMe'],
        groups: [
          {
            title: 'Fit',
            rows: [
              { name: 'Best for', values: { Mintlify: 'Developer-first docs', ReadMe: 'API-first products' } },
              { name: 'Primary users', values: { Mintlify: 'Engineers', ReadMe: 'DevRel & support' } },
              { name: 'Non-technical friendly', values: { Mintlify: false, ReadMe: true } },
              { name: 'Onboarding speed', values: { Mintlify: 'Fast with a repo', ReadMe: 'Moderate' } },
            ],
          },
          {
            title: 'Authoring',
            rows: [
              { name: 'Docs-as-code', values: { Mintlify: true, ReadMe: false } },
              { name: 'Web editor', values: { Mintlify: false, ReadMe: true } },
              { name: 'MDX / components', values: { Mintlify: true, ReadMe: false } },
              { name: 'Preview deploys', values: { Mintlify: true, ReadMe: false } },
              { name: 'Version control', values: { Mintlify: 'Git', ReadMe: 'Built-in' } },
            ],
          },
          {
            title: 'API features',
            rows: [
              { name: 'OpenAPI reference', values: { Mintlify: true, ReadMe: true } },
              { name: 'Interactive playground', values: { Mintlify: true, ReadMe: true } },
              { name: 'Real keys in explorer', values: { Mintlify: false, ReadMe: true } },
              { name: 'Personalised examples', values: { Mintlify: false, ReadMe: true } },
              { name: 'Request logs', values: { Mintlify: false, ReadMe: true } },
            ],
          },
          {
            title: 'AI',
            rows: [
              { name: 'AI writing assistance', values: { Mintlify: true, ReadMe: true } },
              { name: 'Reader-facing assistant', values: { Mintlify: true, ReadMe: true } },
              { name: 'Maintenance agent', values: { Mintlify: false, ReadMe: false } },
              { name: 'MCP server', values: { Mintlify: false, ReadMe: false } },
            ],
          },
          {
            title: 'Commercials',
            rows: [
              { name: 'Entry price', values: { Mintlify: '$150/mo', ReadMe: '$99/mo' } },
              { name: 'Free tier', values: { Mintlify: true, ReadMe: true } },
            ],
          },
        ],
      },
      {
        kind: 'cta',
        headline: 'Evaluating a third option?',
        body: 'Documentation.AI covers both workflows — Git and web editor — with an agent that keeps content current. Ask us in Slack how a migration would work.',
        label: 'Talk to us',
        href: 'https://documentation.ai/get-a-demo',
      },
      {
        kind: 'prose',
        heading: 'How teams use AI documentation platforms in 2026',
        paragraphs: [
          'The manual effort in documentation has moved. Writing a page was never the expensive part; noticing that a page is now wrong is.',
          'Platforms that only assist with authoring solve the cheap problem. The structural limitation of both tools here is that neither watches the product.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Final take',
        paragraphs: [
          'Mintlify and ReadMe are both good at what they were designed for, and those designs point in different directions.',
          'If you are choosing between them, the deciding question is not which has more features. It is whether your documentation lives closer to your code or closer to your customers.',
        ],
      },
      {
        kind: 'faq',
        heading: 'Frequently asked questions',
        items: [
          {
            q: 'Which is better for API documentation, Mintlify or ReadMe?',
            a: 'ReadMe, if the API is the product. Its explorer, personalised examples, and request logs are built for integrating developers in a way Mintlify’s playground is not.',
          },
          {
            q: 'What is the main workflow difference between them?',
            a: 'Mintlify assumes docs live in Git and move through pull requests. ReadMe assumes docs live in its own editor and are managed by a documentation owner.',
          },
          {
            q: 'Can non-technical teammates contribute?',
            a: 'On ReadMe, with effort. On Mintlify, not really — contributing means working in a repository.',
          },
          {
            q: 'How do their AI features compare?',
            a: 'Both offer authoring assistance and a reader-facing assistant. Neither has an agent that detects drift between the product and the docs.',
          },
          {
            q: 'Which is cheaper?',
            a: 'ReadMe starts lower at $99/month against $150/month, but the gap narrows once contributor count and feature tiers are factored in.',
          },
          {
            q: 'Do both support docs-as-code?',
            a: 'Mintlify does, fully. ReadMe offers sync options but is not a docs-as-code platform in practice.',
          },
          {
            q: 'Can AI keep documentation up to date automatically?',
            a: 'Not on either platform. That requires an agent watching commits, releases, and support signals — the category Documentation.AI is built around.',
          },
          {
            q: 'Which scales better for a large team?',
            a: 'Mintlify, if everyone writes in Git. Otherwise contribution bottlenecks appear on both, just in different places.',
          },
        ],
      },
    ],
  },
  {
    slug: 'document360-vs-mintlify',
    permalink: '/blog/document360-vs-mintlify',
    title: 'Document360 vs Mintlify: Knowledge Base vs Docs-as-Code Compared (2026)',
    description:
      'Document360 and Mintlify approach documentation from opposite ends. This hands-on comparison explains how managed knowledge bases differ from docs-as-code platforms.',
    excerpt:
      'Document360 and Mintlify approach documentation from opposite ends. This hands-on comparison explains how managed knowledge bases differ from docs-as-code platforms in practice.',
    date: '2026-04-10',
    author: 'roopreddy',
    tags: ['Comparisons'],
    cover: '/img/photos/1.webp',
    readingTime: 10,
    wordCount: 1920,
    sections: [
      {
        kind: 'tldr',
        items: [
          'Choose Document360 if documentation passes through review, approval, or compliance before it publishes.',
          'Choose Mintlify if documentation ships in the same pull request as the code it describes.',
          'The choice is about who owns publishing, not about which has more features.',
        ],
        bottomLine: 'These are not competitors so much as answers to different organisational questions.',
      },
      {
        kind: 'prose',
        heading: 'How were these platforms compared?',
        paragraphs: [
          'Both were configured with the same twenty-page knowledge base and run through a month of realistic edits, including two structural reorganisations.',
          'The evaluation focused on who could make a change unaided, how long it took to reach production, and what governance existed along the way.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Which is easier to set up, Document360 or Mintlify?',
        paragraphs: [
          'Document360 is faster for a team with no repository. Categories, articles, and permissions are configured in a browser and the site is live the same day.',
          'Mintlify is faster for a team that already has a repository and a CI pipeline, because it slots into machinery that already exists.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Writing and maintaining documentation',
        paragraphs: [
          'Document360’s editor is built for people whose job is writing. Drafts, reviews, scheduled publishing, and role-based permissions are all first-class.',
          'Mintlify’s model assumes the writer is also the engineer. That collapses the review cycle, which is an advantage right up until a non-engineer needs to fix a typo.',
        ],
      },
      {
        kind: 'prose',
        heading: 'How do their AI features compare?',
        paragraphs: [
          'Document360 offers AI search and article suggestions oriented toward support deflection.',
          'Mintlify offers AI writing assistance and a reader-facing assistant. Both are authoring or retrieval aids; neither maintains content on its own.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Publishing and public documentation experience',
        paragraphs: [
          'Mintlify produces the faster and better-looking site, with stronger defaults for navigation and search.',
          'Document360’s output is more utilitarian but includes the category structure, feedback widgets, and analytics that support teams rely on.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Pricing',
        paragraphs: [
          'Document360 starts at $149/month with pricing driven by team accounts and feature tier.',
          'Mintlify starts at $150/month driven by editor count. At the entry point they are near-identical; they diverge as contributor counts grow.',
        ],
      },
      {
        kind: 'comparisonTable',
        heading: 'Document360 vs Mintlify — final comparison',
        columns: ['Document360', 'Mintlify'],
        groups: [
          {
            title: 'Fit',
            rows: [
              { name: 'Best for', values: { Document360: 'Governed knowledge bases', Mintlify: 'Developer-first docs' } },
              { name: 'Primary users', values: { Document360: 'Support & content teams', Mintlify: 'Engineers' } },
              { name: 'Non-technical friendly', values: { Document360: true, Mintlify: false } },
            ],
          },
          {
            title: 'Workflow',
            rows: [
              { name: 'Docs-as-code', values: { Document360: false, Mintlify: true } },
              { name: 'Web editor', values: { Document360: true, Mintlify: false } },
              { name: 'Approval workflows', values: { Document360: true, Mintlify: false } },
              { name: 'Scheduled publishing', values: { Document360: true, Mintlify: false } },
            ],
          },
          {
            title: 'Platform',
            rows: [
              { name: 'API reference', values: { Document360: 'Basic', Mintlify: 'Full playground' } },
              { name: 'Analytics', values: { Document360: true, Mintlify: 'Limited' } },
              { name: 'Entry price', values: { Document360: '$149/mo', Mintlify: '$150/mo' } },
            ],
          },
        ],
      },
      {
        kind: 'cta',
        headline: 'Need both workflows at once?',
        body: 'Documentation.AI runs a web editor and docs-as-code side by side, so writers and engineers use the same source. Ask us in Slack how teams set it up.',
        label: 'Talk to us',
        href: 'https://documentation.ai/get-a-demo',
      },
      {
        kind: 'prose',
        heading: 'How teams use AI documentation platforms in 2026',
        paragraphs: [
          'Both platforms treat AI as a feature inside the editor or the search box. That framing is already dated.',
          'The work that consumes teams is detecting drift, and neither tool watches the product to catch it.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Final take',
        paragraphs: [
          'Document360 and Mintlify solve the same problem for different companies. Choosing between them is really choosing who is accountable for publishing.',
          'If the honest answer is "both engineers and writers", neither will fit comfortably for long.',
        ],
      },
      {
        kind: 'faq',
        heading: 'Frequently asked questions',
        items: [
          {
            q: 'What is the core difference between Document360 and Mintlify?',
            a: 'Document360 is a managed knowledge base with workflow and approvals. Mintlify is a docs-as-code platform where content lives in Git.',
          },
          {
            q: 'Which is better for a support knowledge base?',
            a: 'Document360, comfortably. Categories, feedback widgets, and analytics are built for exactly that use case.',
          },
          {
            q: 'Which is better for developer documentation?',
            a: 'Mintlify, because docs move through the same review process as the code they describe.',
          },
          {
            q: 'Can non-technical writers use Mintlify?',
            a: 'Only with a developer alongside them. Contributing means working in a repository.',
          },
          {
            q: 'Do either support approval workflows?',
            a: 'Document360 does natively. Mintlify inherits whatever your Git provider’s review process gives you.',
          },
          {
            q: 'Which has better AI features?',
            a: 'They are comparable and both limited — retrieval and authoring aids rather than maintenance.',
          },
          {
            q: 'Is there a platform that does both?',
            a: 'Documentation.AI is built around running a web editor and docs-as-code against the same content.',
          },
          {
            q: 'How do the costs compare at scale?',
            a: 'Near-identical at entry. Document360 scales by team account, Mintlify by editor, so the crossover depends on how many people write.',
          },
        ],
      },
    ],
  },
  {
    slug: 'what-is-ai-documentation',
    permalink: '/blog/what-is-ai-documentation',
    title: 'What Is AI Documentation and Why It Matters Today',
    description:
      'AI documentation is content structured so that both people and machines can use it. Here is what that means in practice, how it works, and the risks worth planning for.',
    excerpt:
      'AI documentation is content structured so that both people and machines can use it. Here is what that actually means, how it works, and which guardrails matter.',
    date: '2026-02-16',
    author: 'roopreddy',
    tags: ['AI Documentation'],
    cover: '/img/photos/1.webp',
    readingTime: 9,
    wordCount: 1740,
    sections: [
      {
        kind: 'tldr',
        items: [
          'AI documentation means content structured for retrieval by machines as well as reading by people.',
          'The practical markers are clean chunking, an auto-generated llms.txt, and an MCP server.',
          'The payoff is fewer support tickets and AI assistants that answer from your content instead of guessing.',
        ],
        bottomLine: 'If an AI agent cannot retrieve your docs accurately, your docs are invisible to a growing share of your users.',
      },
      {
        kind: 'prose',
        heading: 'What is AI documentation?',
        paragraphs: [
          'AI documentation is not documentation written by AI. It is documentation structured so that a retrieval system can find the right passage and quote it without distortion.',
          'In practice that means predictable headings, self-contained sections, explicit parameters, and examples that do not depend on surrounding prose to make sense.',
        ],
      },
      {
        kind: 'prose',
        heading: 'How does AI documentation work?',
        paragraphs: [
          'A retrieval system splits your content into chunks, embeds them, and matches a question against those embeddings. Chunk boundaries therefore decide answer quality.',
          'Content with clear heading hierarchy chunks cleanly. Content that relies on visual layout or long unbroken narrative does not, and the assistant hallucinates to fill the gap.',
        ],
      },
      {
        kind: 'prose',
        heading: 'Why does AI documentation matter?',
        paragraphs: [
          'Models have fixed training cutoffs. Anything released after that date exists for them only if they can retrieve it at query time.',
          'That makes your documentation the live interface between your product and every assistant your customers use.',
        ],
      },
      {
        kind: 'comparisonTable',
        heading: 'Traditional docs vs AI-ready docs',
        columns: ['Traditional', 'AI-ready'],
        groups: [
          {
            title: 'Structure',
            rows: [
              { name: 'Predictable heading hierarchy', values: { Traditional: 'Sometimes', 'AI-ready': true } },
              { name: 'Self-contained sections', values: { Traditional: false, 'AI-ready': true } },
              { name: 'Explicit parameters and types', values: { Traditional: 'Sometimes', 'AI-ready': true } },
            ],
          },
          {
            title: 'Machine access',
            rows: [
              { name: 'llms.txt', values: { Traditional: false, 'AI-ready': true } },
              { name: 'MCP server', values: { Traditional: false, 'AI-ready': true } },
              { name: 'Structured metadata', values: { Traditional: false, 'AI-ready': true } },
            ],
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'How do AI agents use your documentation?',
        paragraphs: [
          'Coding agents pull documentation into context while writing code against your API. Support assistants quote it back to customers. Search engines summarise it.',
          'All three fail the same way: given ambiguous or poorly chunked content, they produce confident and wrong answers attributed to you.',
        ],
      },
      {
        kind: 'prose',
        heading: 'What are the risks and guardrails?',
        paragraphs: [
          'The main risk is confident inaccuracy. An assistant that cites a stale page does more damage than one that finds nothing at all.',
          'The guardrails are unglamorous: keep a single source of truth, date your content, remove superseded pages rather than leaving them, and require citations in any reader-facing assistant.',
        ],
      },
      {
        kind: 'prose',
        heading: 'A starter workflow for teams new to AI documentation',
        paragraphs: [
          'Start by fixing structure on your twenty highest-traffic pages rather than rewriting everything. Consistent headings and self-contained sections deliver most of the retrieval gain.',
          'Then publish an llms.txt, connect an MCP server, and measure whether assistant answers improve before expanding further.',
        ],
      },
      {
        kind: 'comparisonTable',
        heading: 'Which metrics track AI documentation impact?',
        columns: ['Metric', 'Target'],
        groups: [
          {
            title: 'Retrieval quality',
            rows: [
              { name: 'Assistant answers with a citation', values: { Metric: 'Citation rate', Target: '> 90%' } },
              { name: 'Questions with no confident answer', values: { Metric: 'Deflection gap', Target: '< 10%' } },
            ],
          },
          {
            title: 'Business impact',
            rows: [
              { name: 'Tickets answered by docs first', values: { Metric: 'Support deflection', Target: 'Trending up' } },
              { name: 'Time to first successful API call', values: { Metric: 'Onboarding time', Target: 'Trending down' } },
            ],
          },
        ],
      },
      {
        kind: 'cta',
        headline: 'Want docs your AI agents can actually read?',
        body: 'Documentation.AI structures content for retrieval and ships llms.txt and an MCP server by default. Ask us in Slack what that looks like for your stack.',
        label: 'Talk to us',
        href: 'https://documentation.ai/get-a-demo',
      },
      {
        kind: 'prose',
        heading: 'The vision behind Documentation.AI',
        paragraphs: [
          'Documentation has been treated as a publishing problem for thirty years. It is now an interface problem, because most consumption is mediated by a machine.',
          'That is the bet behind the platform: make knowledge equally legible to a person reading a page and an agent retrieving a passage.',
        ],
      },
      {
        kind: 'faq',
        heading: 'FAQs',
        items: [
          {
            q: 'Is AI documentation the same as AI-generated documentation?',
            a: 'No. AI-generated means a model wrote it. AI documentation means it is structured so machines can retrieve it accurately, regardless of who wrote it.',
          },
          {
            q: 'What is llms.txt?',
            a: 'A single file exposing a clean, structured index of your content so AI assistants can find authoritative source material instead of scraping rendered pages.',
          },
          {
            q: 'What does an MCP server add?',
            a: 'It lets any model supporting the Model Context Protocol pull your current documentation into context at query time, rather than relying on training data.',
          },
          {
            q: 'Do I need to rewrite all my documentation?',
            a: 'No. Fixing structure on your highest-traffic pages captures most of the retrieval benefit.',
          },
          {
            q: 'How do I stop an assistant citing stale pages?',
            a: 'Remove superseded content rather than leaving it published, date what remains, and require citations so wrong answers are traceable.',
          },
          {
            q: 'How do I measure whether it is working?',
            a: 'Track citation rate, the share of questions with no confident answer, support deflection, and time to first successful API call.',
          },
        ],
      },
    ],
  },
]

export function getPublishedPosts(): Post[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function getAuthors(): Author[] {
  return [...authors]
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug)
}

export function getAuthorForPost(post: Post): Author {
  const author = getAuthorBySlug(post.author)
  if (!author) throw new Error(`Unknown author "${post.author}" in post "${post.slug}"`)
  return author
}

export function getPostsByAuthor(slug: string): Post[] {
  return getPublishedPosts().filter((post) => post.author === slug)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
