import type { Metadata } from 'next'

import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { PlanComparisonTable } from '@/components/sections/plan-comparison-table'
import { PricingFourTierDivided, Tier } from '@/components/sections/pricing-four-tier-divided'
import { TrustedBy, TRUSTED_BY_CONTENT } from '@/components/site/trusted-by'
import { siteConfig } from '@/lib/site'

const PRICING_SUBHEADLINE =
  'Simple, predictable pricing for teams that want to create, publish, search, and maintain better documentation with AI.'

export const metadata: Metadata = {
  title: `Pricing — ${siteConfig.name}`,
  description: PRICING_SUBHEADLINE,
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: `Pricing — ${siteConfig.name}`,
    description: PRICING_SUBHEADLINE,
    url: '/pricing',
    type: 'website',
  },
}

const DASHBOARD_URL = 'https://dashboard.documentation.ai/'
const DEMO_URL = '/get-a-demo'

/**
 * Every paid figure on the page, in one place.
 *
 * Both tabs quote a per-month figure: `monthly` is the list price, `yearly` is
 * the same plan billed annually (the 20% saving the toggle advertises). Starter
 * ($0) and Enterprise (Custom Pricing) read the same on both tabs, so they are
 * not listed here.
 */
const PRICES = {
  Standard: { monthly: '$69', yearly: '$55' },
  Pro: { monthly: '$199', yearly: '$159' },
} as const

function plans(billing: 'monthly' | 'yearly') {
  // Both tabs read "/month"; only the fine print after it changes.
  const billedYearly = billing === 'yearly' ? '(billed yearly)' : undefined

  return (
    <>
      <Tier
        name="Starter"
        price="$0"
        period="/forever"
        subheadline={<p>For individuals and early projects getting started with AI-powered documentation.</p>}
        features={[
          'Core documentation platform',
          '10,000 AI credits (Trial credits)',
          'Visual web editor, API playground, MCP server, Custom domain, AI Agent for Writing',
          'Self-updating AI workflows',
        ]}
        cta={
          <SoftButtonLink href={DASHBOARD_URL} size="lg">
            Get Started
          </SoftButtonLink>
        }
      />
      <Tier
        name="Standard"
        price={PRICES.Standard[billing]}
        period="/month"
        note={billedYearly}
        subheadline={<p>For startups and small teams that want professional documentation with AI built in.</p>}
        features={[
          'Everything in Starter',
          '10,000 AI credits per month',
          'Password-protected documentation',
          'External Sources for AI Assistant',
          'Embed AI Assistant outside docs',
          'PDF Export, Slack support',
        ]}
        cta={
          <SoftButtonLink href={DASHBOARD_URL} size="lg">
            Upgrade
          </SoftButtonLink>
        }
      />
      <Tier
        name="Pro"
        price={PRICES.Pro[billing]}
        period="/month"
        note={billedYearly}
        subheadline={<p>For growing teams using docs across product, support, onboarding, and AI workflows.</p>}
        features={[
          'Everything in Standard',
          '30,000 AI credits per month',
          'Private docs with user login (JWT/OAuth)',
          'Advanced analytics',
          'Role-based permissions',
          'Priority migration support',
          'Private Slack channel, Priority support',
        ]}
        cta={
          <ButtonLink href={DASHBOARD_URL} size="lg">
            Upgrade
          </ButtonLink>
        }
      />
      <Tier
        name="Enterprise"
        price="Custom Pricing"
        priceSize="sm"
        subheadline={<p>For teams needing advanced security, governance, custom AI usage, and dedicated support.</p>}
        features={[
          'Everything in Pro',
          'SSO with SAML/OIDC',
          'SCIM provisioning',
          'Security and legal review',
          'Custom SLAs',
          'Dedicated support',
          'White-glove migration support',
          'White-glove implementation support',
          'Custom contracts and invoicing',
          'Custom integrations',
        ]}
        cta={
          <SoftButtonLink href={DEMO_URL} size="lg">
            Get a Demo
          </SoftButtonLink>
        }
      />
    </>
  )
}

export default function Page() {
  return (
    <>
      {/* Pricing hero — four tiers split by column rules, monthly/yearly tabs */}
      <PricingFourTierDivided
        id="pricing"
        headline="Pricing"
        subheadline={<p>{PRICING_SUBHEADLINE}</p>}
        savingLabel="(Save 20%)"
        tiers={{ monthly: plans('monthly'), yearly: plans('yearly') }}
      />
      {/* Plan comparison — groups and rows follow the live pricing table */}
      <PlanComparisonTable
        id="compare"
        plans={['Starter', 'Standard', 'Pro', 'Enterprise']}
        features={[
          {
            title: 'Write & Publish',
            features: [
              {
                name: 'Editor seats',
                value: { Starter: '1', Standard: '3', Pro: '10', Enterprise: 'Custom' },
              },
              {
                name: 'Documentation Sites',
                value: { Starter: '1', Standard: '2', Pro: '4', Enterprise: 'Custom' },
              },
              { name: 'Visual web editor', value: true },
              { name: 'Docs as code', value: true },
              { name: 'Bidirectional git sync', value: true },
              { name: 'Live preview', value: true },
              { name: 'Auto-generated OpenAPI pages', value: true },
              { name: 'API playground', value: true },
              {
                name: 'PDF export',
                value: { Starter: false, Standard: true, Pro: true, Enterprise: true },
              },
              { name: 'Custom domain', value: true },
              { name: 'SEO optimizations', value: true },
              { name: 'LLM optimizations / llms.txt', value: true },
              { name: 'Subfolders', value: true },
            ],
          },
          {
            title: 'AI-powered writing and editing',
            features: [
              { name: 'AI-powered writing and editing', value: true },
              {
                name: 'AI credits',
                value: {
                  Starter: '10,000 (Trial)',
                  Standard: '10,000 / month',
                  Pro: '30,000 / month',
                  Enterprise: 'Custom',
                },
              },
              { name: 'AI Agent', value: true },
              { name: 'Authoring MCP Server', value: true },
            ],
          },
          {
            title: 'AI Assistant & Workflows',
            features: [
              { name: 'AI Assistant', value: true },
              { name: 'AI workflows for docs updates', value: true },
              { name: 'Docs MCP server', value: true },
              {
                name: 'Connect external sources (coming soon)',
                value: { Starter: false, Standard: true, Pro: true, Enterprise: true },
              },
              {
                name: 'Embed AI Assistant (coming soon)',
                value: { Starter: false, Standard: false, Pro: true, Enterprise: true },
              },
            ],
          },
          {
            title: 'Analytics & Insights',
            features: [
              {
                name: 'Standard analytics',
                value: { Starter: false, Standard: true, Pro: true, Enterprise: true },
              },
              {
                name: 'AI answer analytics',
                value: { Starter: false, Standard: false, Pro: true, Enterprise: true },
              },
              {
                name: 'User feedback',
                value: { Starter: false, Standard: false, Pro: true, Enterprise: true },
              },
            ],
          },
          {
            title: 'Customizations',
            features: [
              {
                name: 'Custom navigation',
                value: { Starter: false, Standard: false, Pro: true, Enterprise: true },
              },
              {
                name: 'Custom system CSS and JS',
                value: { Starter: false, Standard: false, Pro: true, Enterprise: true },
              },
              {
                name: 'Built-in components library',
                value: { Starter: false, Standard: false, Pro: true, Enterprise: true },
              },
              {
                name: 'Remove footer branding',
                value: { Starter: false, Standard: false, Pro: false, Enterprise: true },
              },
            ],
          },
          {
            title: 'Integrations',
            features: [
              {
                name: 'API keys',
                value: { Starter: false, Standard: true, Pro: true, Enterprise: true },
              },
              { name: 'OpenAPI import', value: true },
              {
                name: 'Third-party integrations',
                value: { Starter: false, Standard: true, Pro: true, Enterprise: true },
              },
            ],
          },
          {
            title: 'Authentication',
            features: [
              {
                name: 'Password-protected docs',
                value: { Starter: false, Standard: true, Pro: true, Enterprise: true },
              },
              {
                name: 'Private docs with user login (JWT/OAuth)',
                value: { Starter: false, Standard: false, Pro: true, Enterprise: true },
              },
              {
                name: 'Role-based permissions',
                value: { Starter: false, Standard: false, Pro: true, Enterprise: true },
              },
              {
                name: 'SSO with SAML/OIDC',
                value: { Starter: false, Standard: false, Pro: false, Enterprise: true },
              },
              {
                name: 'SCIM provisioning',
                value: { Starter: false, Standard: false, Pro: false, Enterprise: true },
              },
            ],
          },
          {
            title: 'Security, Support, Legal & Compliance',
            features: [
              {
                name: 'Community',
                value: { Starter: true, Standard: false, Pro: false, Enterprise: false },
              },
              {
                name: 'Slack support',
                value: { Starter: false, Standard: true, Pro: true, Enterprise: true },
              },
              {
                name: 'Private Slack channel',
                value: { Starter: false, Standard: false, Pro: true, Enterprise: true },
              },
              {
                name: 'Priority support',
                value: { Starter: false, Standard: false, Pro: true, Enterprise: true },
              },
              {
                name: 'Dedicated success support',
                value: { Starter: false, Standard: false, Pro: false, Enterprise: true },
              },
              {
                name: 'Migration services',
                value: { Starter: false, Standard: false, Pro: false, Enterprise: 'White-glove' },
              },
              {
                name: 'Implementation Services',
                value: { Starter: false, Standard: false, Pro: false, Enterprise: 'White-glove' },
              },
              {
                name: 'Security review',
                value: { Starter: false, Standard: false, Pro: false, Enterprise: true },
              },
              {
                name: 'Legal review',
                value: { Starter: false, Standard: false, Pro: false, Enterprise: true },
              },
              {
                name: 'Custom SLAs',
                value: { Starter: false, Standard: false, Pro: false, Enterprise: true },
              },
            ],
          },
        ]}
      />
      {/* Social proof */}
      <TrustedBy content={TRUSTED_BY_CONTENT} />
      {/* Call To Action */}
      <CallToActionSimpleCentered
        id="call-to-action"
        headline="Get started for free. No credit card required."
        subheadline={
          <>
            <p>
              Start with the full platform, publish your first documentation site, and upgrade when your team needs more
              seats, private docs, analytics, authentication, or higher AI usage.
            </p>
            <p className="font-mono text-sm/[21px] tracking-[-0.01em] text-mauve-500">
              Live in under 5 min · No credit card required
            </p>
          </>
        }
        cta={
          <>
            <ButtonLink href={DASHBOARD_URL} size="lg">
              Start for Free
            </ButtonLink>

            <PlainButtonLink href={DEMO_URL} size="lg">
              Book a Demo
            </PlainButtonLink>
          </>
        }
      />
    </>
  )
}
