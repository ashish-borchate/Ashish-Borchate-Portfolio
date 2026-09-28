export type CaseStudySection = {
  id: string;
  company: string;
  companySlug: string;
  theme: string;
  role: string;
  period: string;
  context: string;
  challenge: string;
  outcome: string;
  howIAchieved: string[];
};

export const caseStudies: CaseStudySection[] = [
  {
    id: "yellow",
    company: "Yellow.pro",
    companySlug: "yellow",
    theme: "BUILDING SUPPORT FROM ZERO",
    role: "Community and Support Operations Manager",
    period: "April 2026 – September 2026",
    context:
      "Yellow.pro needed customer support for the trading portal before the function existed as a system — not just replies, but documentation, workflows, and a bridge to Product and Engineering.",
    challenge:
      "Stand up support with no Help Center, SLAs, escalation paths, or release-validation process while the product and integrations were still moving quickly.",
    outcome:
      "A support operating layer — Help Center, internal docs, SLAs, escalations, UAT and bug reporting, and tooling across Intercom, Discord, Telegram, Jira, GitBook, Notion, and Confluence.",
    howIAchieved: [
      "Help Center",
      "SOPs",
      "SLAs",
      "Escalations",
      "UAT",
      "Bug Reporting",
      "Product Feedback",
    ],
  },
  {
    id: "binance",
    company: "Binance",
    companySlug: "binance",
    theme: "OPERATING AT SCALE",
    role: "L2 Customer Support Team Leader",
    period: "December 2022 – February 2025",
    context:
      "Institutional and high-value B2B users across 20+ crypto products — onboarding, account management, security, fraud, KYB, and transaction-related work at L2 depth.",
    challenge:
      "Lead a 10+ person team, keep quality high on complex cases, and keep SOPs and training aligned as products and workflows changed.",
    outcome:
      "Strong personal CSAT (98.5% vs 92% target), high daily case volume (80–100/day), and clearer feedback loops into Product and Engineering.",
    howIAchieved: [
      "Team leadership",
      "SOPs & knowledge base",
      "Escalation management",
      "Product & Engineering feedback",
    ],
  },
  {
    id: "koinx",
    company: "KoinX",
    companySlug: "koinx",
    theme: "FROM SUPPORT TO PRODUCT FEEDBACK",
    role: "Customer Support & Operations Manager",
    period: "July 2025 – October 2025",
    context:
      "Support sat close to the product — customer conversations and ticket data needed to become actionable input for Product and Engineering, not a separate queue.",
    challenge:
      "Build feedback loops, documentation, and automation while features shipped and internal teams needed training on what changed.",
    outcome:
      "Structured feedback into product and ops improvements, customer-facing guides and SOPs, Intercom workflow optimization (estimated ~40% automation of repetitive tasks), and CSAT monitoring.",
    howIAchieved: [
      "Feedback loops",
      "Product guides & FAQs",
      "SOPs",
      "Copilot automation",
      "CSAT monitoring",
    ],
  },
  {
    id: "bybit",
    company: "Bybit",
    companySlug: "bybit",
    theme: "SPEED UNDER PRESSURE",
    role: "L4 Senior Client Service Analyst",
    period: "October 2025 – April 2026",
    context:
      "Escalation point for the India client services team — trading, deposits, withdrawals, cross-chain transfers, and account issues at high volume.",
    challenge:
      "70–80 cases per day with strict response and resolution targets, including fraud, security, KYC/AML, and high-risk situations.",
    outcome:
      "4.8/5 CSAT with ~4 hour average resolution against a 24 hour target — accurate decisions when customer impact and risk overlap.",
    howIAchieved: [
      "Team escalation support",
      "High-volume case handling",
      "Fraud & security investigation",
      "SLA & CSAT targets",
    ],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.companySlug === slug);
}
