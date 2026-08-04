import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation.AI Pricing – AI Documentation Software Plans",
  description:
    "Start free with Documentation.AI. Compare plans for AI documentation, private docs, analytics, authentication, team seats, and higher AI usage.",
};

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "For individuals and small projects",
    features: [
      "1 project",
      "1 user",
      "Unlimited pages",
      "Basic analytics",
      "Community support",
    ],
    cta: "Start for Free",
    ctaHref: "https://dashboard.documentation.ai/",
    ctaExternal: true,
    variant: "primary" as const,
    featured: false,
  },
  {
    name: "Starter",
    price: "$55",
    period: "/month",
    description: "For growing teams",
    features: [
      "3 projects",
      "5 users",
      "Custom domain",
      "Advanced analytics",
      "Email support",
      "AI search",
    ],
    cta: "Start for Free",
    ctaHref: "https://dashboard.documentation.ai/",
    ctaExternal: true,
    variant: "primary" as const,
    featured: false,
  },
  {
    name: "Pro",
    price: "$159",
    period: "/month",
    description: "For professional teams",
    features: [
      "Unlimited projects",
      "15 users",
      "Custom branding",
      "Priority support",
      "AI documentation agent",
      "API access",
    ],
    cta: "Start for Free",
    ctaHref: "https://dashboard.documentation.ai/",
    ctaExternal: true,
    variant: "primary" as const,
    featured: true,
  },
  {
    name: "Custom Pricing",
    price: "Let's talk",
    period: "",
    description: "For enterprise",
    features: [
      "Unlimited everything",
      "Dedicated support",
      "SSO / SAML",
      "Custom integrations",
      "SLA",
    ],
    cta: "Book a Demo",
    ctaHref: "/get-a-demo",
    ctaExternal: false,
    variant: "secondary" as const,
    featured: false,
  },
];

type FeatureValue = boolean | string;

interface ComparisonFeature {
  name: string;
  free: FeatureValue;
  starter: FeatureValue;
  pro: FeatureValue;
  custom: FeatureValue;
}

interface ComparisonCategory {
  category: string;
  features: ComparisonFeature[];
}

const comparisonData: ComparisonCategory[] = [
  {
    category: "Essentials",
    features: [
      { name: "Documentation site", free: true, starter: true, pro: true, custom: true },
      { name: "Pages", free: "Unlimited", starter: "Unlimited", pro: "Unlimited", custom: "Unlimited" },
      { name: "Custom domain", free: false, starter: true, pro: true, custom: true },
      { name: "SSL", free: true, starter: true, pro: true, custom: true },
      { name: "Versioning", free: true, starter: true, pro: true, custom: true },
    ],
  },
  {
    category: "AI Features",
    features: [
      { name: "AI Search", free: false, starter: true, pro: true, custom: true },
      { name: "AI Documentation Agent", free: false, starter: false, pro: true, custom: true },
      { name: "AI Assistant", free: false, starter: true, pro: true, custom: true },
    ],
  },
  {
    category: "Customization",
    features: [
      { name: "Custom branding", free: false, starter: false, pro: true, custom: true },
      { name: "Custom CSS", free: false, starter: false, pro: true, custom: true },
      { name: "White labeling", free: false, starter: false, pro: false, custom: true },
    ],
  },
  {
    category: "Collaboration",
    features: [
      { name: "Team members", free: "1", starter: "5", pro: "15", custom: "Unlimited" },
      { name: "Roles & permissions", free: false, starter: false, pro: true, custom: true },
      { name: "Review workflows", free: false, starter: false, pro: true, custom: true },
    ],
  },
  {
    category: "Analytics & Insights",
    features: [
      { name: "Basic analytics", free: true, starter: true, pro: true, custom: true },
      { name: "Advanced analytics", free: false, starter: true, pro: true, custom: true },
      { name: "Search analytics", free: false, starter: false, pro: true, custom: true },
    ],
  },
  {
    category: "Security",
    features: [
      { name: "SSO / SAML", free: false, starter: false, pro: false, custom: true },
      { name: "Authentication", free: false, starter: false, pro: true, custom: true },
      { name: "Private docs", free: false, starter: false, pro: true, custom: true },
    ],
  },
];

const tierColumns = ["Free", "Starter", "Pro", "Custom"] as const;
const tierKeys = ["free", "starter", "pro", "custom"] as const;

function FeatureCell({ value }: { value: FeatureValue }) {
  if (typeof value === "string") {
    return <span className="text-sm text-foreground">{value}</span>;
  }
  if (value) {
    return (
      <svg
        className="mx-auto h-5 w-5 text-foreground"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        aria-label="Included"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    );
  }
  return <span className="text-sm text-black-tertiary" aria-label="Not included">&mdash;</span>;
}

const logoCompanies = [
  "Acme Corp",
  "TechFlow",
  "Buildspace",
  "Datawise",
  "CloudStack",
  "DevForge",
];

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      {/* ------------------------------------------------------------------ */}
      {/* Section 1 – Header                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Pricing
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-secondary-text sm:text-lg">
            Start with the full platform, publish your first documentation site,
            and upgrade when your team needs more seats, private docs, analytics,
            authentication, or higher AI usage.
          </p>
          <p className="mt-4 font-mono text-sm tracking-tight text-black-secondary">
            Live in under 5 min &middot; No credit card required
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 2 – Pricing Cards                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border bg-surface p-8 ${
                tier.featured
                  ? "border-accent ring-1 ring-accent"
                  : "border-border"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-medium text-white">
                  Popular
                </span>
              )}

              <h3 className="font-heading text-lg font-medium text-foreground">
                {tier.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-semibold tracking-tight text-foreground">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm text-black-secondary">
                    {tier.period}
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-secondary-text">
                {tier.description}
              </p>

              <ul className="mt-8 flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-secondary-text"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                {tier.ctaExternal ? (
                  <a
                    href={tier.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-medium transition-colors ${
                      tier.variant === "primary"
                        ? "bg-foreground text-surface hover:bg-secondary-text"
                        : "border border-border text-foreground hover:bg-muted-bg"
                    }`}
                  >
                    {tier.cta}
                  </a>
                ) : (
                  <Link
                    href={tier.ctaHref}
                    className={`inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-medium transition-colors ${
                      tier.variant === "primary"
                        ? "bg-foreground text-surface hover:bg-secondary-text"
                        : "border border-border text-foreground hover:bg-muted-bg"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 3 – Feature Comparison Banner                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-foreground px-8 py-16 text-center sm:px-16 sm:py-20">
            <h2 className="font-heading text-3xl font-medium tracking-tight text-surface sm:text-4xl">
              Get started for free. No credit card required.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-black-tertiary">
              Start with the full platform, publish your first documentation
              site, and upgrade when your team needs more seats, private docs,
              analytics, authentication, or higher AI usage.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://dashboard.documentation.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-surface px-6 text-sm font-medium text-foreground transition-colors hover:bg-ui-1"
              >
                Start for Free
              </a>
              <Link
                href="/get-a-demo"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-medium text-surface transition-colors hover:bg-white/10"
              >
                Book a Demo
              </Link>
            </div>
            <p className="mt-4 font-mono text-sm tracking-tight text-black-tertiary">
              Live in under 5 min &middot; No credit card required
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 4 – Feature Comparison Table                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              {/* Sticky tier header row */}
              <thead>
                <tr className="border-b border-border">
                  <th className="sticky top-0 bg-background py-4 pr-4 text-left text-sm font-medium text-foreground" />
                  {tierColumns.map((col) => (
                    <th
                      key={col}
                      className="sticky top-0 bg-background px-4 py-4 text-center text-sm font-medium text-foreground"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((group) => (
                  <Fragment key={group.category}>
                    {/* Category header */}
                    <tr>
                      <td
                        colSpan={5}
                        className="pt-10 pb-3 text-xs font-semibold uppercase tracking-wider text-black-secondary"
                      >
                        {group.category}
                      </td>
                    </tr>
                    {group.features.map((feature, idx) => (
                      <tr
                        key={feature.name}
                        className={
                          idx % 2 === 0 ? "bg-background" : "bg-muted-bg"
                        }
                      >
                        <td className="py-3 pr-4 text-sm text-secondary-text">
                          {feature.name}
                        </td>
                        {tierKeys.map((key) => (
                          <td
                            key={key}
                            className="px-4 py-3 text-center"
                          >
                            <FeatureCell value={feature[key]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 5 – Social Proof                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-heading text-sm font-medium tracking-wide text-black-secondary">
            The world&apos;s best product teams trust Documentation.AI
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {logoCompanies.map((company) => (
              <div
                key={company}
                className="flex h-8 items-center rounded bg-ui-1 px-5 text-xs font-medium text-black-tertiary"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Section 6 – Bottom CTA                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-foreground px-8 py-16 text-center sm:px-16 sm:py-20">
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-medium tracking-tight text-surface sm:text-4xl">
              Ready to build documentation people and AI agents love?
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://dashboard.documentation.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-surface px-6 text-sm font-medium text-foreground transition-colors hover:bg-ui-1"
              >
                Start for Free
              </a>
              <Link
                href="/get-a-demo"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-medium text-surface transition-colors hover:bg-white/10"
              >
                Book a Demo
              </Link>
            </div>
            <p className="mt-4 font-mono text-sm tracking-tight text-black-tertiary">
              Live in under 5 min &middot; No credit card required
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
