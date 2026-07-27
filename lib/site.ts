export const siteConfig = {
  name: 'Documentation.AI',
  url: 'https://documentation.ai',
  description:
    'Create and maintain world-class documentation built for both humans and AI. The AI native documentation and knowledge platform.',
  blogTitle: 'Documentation.AI Blog',
  blogDescription:
    'Guides, comparisons, and best practices on documentation, knowledge management, and AI-native content workflows.',
  logo: '/logo.svg',
  socials: [
    'https://x.com/documentation_i',
    'https://www.linkedin.com/company/108715959',
    'https://www.youtube.com/@DocumentationAI',
  ],
} as const

export const organizationId = `${siteConfig.url}/#organization`
export const websiteId = `${siteConfig.url}/#website`

export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path}`
}
