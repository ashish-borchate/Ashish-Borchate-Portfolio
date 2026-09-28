export type CaseStudySection = {
  id: string;
  company: string;
  companySlug: string;
  theme: string;
  collapsedDescription: string;
  role: string;
  period: string;
  context: string;
  challenge: string;
  action: string[];
  outcome: string;
};

export const caseStudies: CaseStudySection[] = [
  {
    id: "yellow",
    company: "Yellow.pro",
    companySlug: "yellow",
    theme: "BUILDING SUPPORT FROM ZERO",
    collapsedDescription:
      "Building support infrastructure, documentation, and release-validation processes from the ground up.",
    role: "Community and Support Operations Manager",
    period: "April 2026 – September 2026",
    context:
      "Yellow.pro was scaling its Trading Portal, with users navigating trading workflows, APIs, settlements, and platform integrations. The product needed a structured support function to help users and work closely with internal teams.",
    challenge:
      "Support processes were largely unstructured. There was no established Help Center, defined SLAs, consistent escalation paths, or formal release-validation process. The challenge was to build these foundations while the product and its integrations continued to evolve.",
    action: [
      "Built the Help Center, FAQs, and internal knowledge base.",
      "Established support workflows, SLAs, and escalation paths.",
      "Set up the support stack across Intercom, Discord, Telegram, Jira, GitBook, Notion, and Confluence.",
      "Worked with Product and Engineering to investigate recurring issues and user pain points.",
      "Conducted UAT and staging tests, reproduced bugs, and validated fixes across trading workflows and integrations.",
    ],
    outcome:
      "Established a structured support operation from the ground up, giving users clearer documentation and support pathways while creating a more consistent process for handling issues, validating releases, and sharing feedback with Product and Engineering.",
  },
  {
    id: "binance",
    company: "Binance",
    companySlug: "binance",
    theme: "OPERATING AT SCALE",
    collapsedDescription:
      "Managing customer experience, team performance, and complex support operations across a global crypto platform.",
    role: "L2 Customer Support Team Leader",
    period: "December 2022 – February 2025",
    context:
      "Binance support covered more than 20 crypto products, serving retail, institutional, and high-value B2B users across onboarding, account management, trading, and transaction-related workflows.",
    challenge:
      "Maintaining service quality at scale required consistent team performance, accurate handling of complex escalations, and up-to-date processes as products and customer needs evolved.",
    action: [
      "Led and coached a team of 10+ support agents.",
      "Managed complex onboarding, account, security, fraud, KYB, and transaction-related escalations.",
      "Improved SOPs, knowledge-base content, and training materials.",
      "Analyzed customer feedback and DSAT trends to identify recurring product issues.",
      "Worked with Product and Engineering to communicate customer pain points and support improvements.",
    ],
    outcome:
      "Maintained **98.5% personal CSAT against a 92% target**, while handling 80–100 cases per day. Strengthened team processes and established clearer feedback loops between customer support and internal product teams.",
  },
  {
    id: "koinx",
    company: "KoinX",
    companySlug: "koinx",
    theme: "FROM SUPPORT TO PRODUCT FEEDBACK",
    collapsedDescription:
      "Turning customer conversations into product improvements, better documentation, and more efficient support workflows.",
    role: "Customer Support & Operations Manager",
    period: "July 2025 – October 2025",
    context:
      "At KoinX, customer support was closely connected to the product. Conversations and ticket data offered valuable insight into user friction, feature gaps, and opportunities to improve the crypto-tax experience.",
    challenge:
      "Customer feedback needed to move beyond individual tickets and become actionable input for Product and Engineering. At the same time, new features required clear documentation, internal training, and efficient support workflows.",
    action: [
      "Built structured feedback loops between Support, Product, and Engineering.",
      "Collected and organized feature requests and recurring customer pain points.",
      "Created customer-facing product guides, FAQs, and internal SOPs.",
      "Trained support teams on new features and product changes.",
      "Optimized Intercom Copilot workflows to automate an estimated 40% of repetitive support tasks.",
      "Monitored CSAT and customer feedback to identify areas for improvement.",
    ],
    outcome:
      "Made customer feedback a more structured input for product and operational improvements, strengthened documentation and team readiness, and reduced repetitive support work through automation.",
  },
  {
    id: "bybit",
    company: "Bybit",
    companySlug: "bybit",
    theme: "SPEED UNDER PRESSURE",
    collapsedDescription:
      "Balancing response speed, complex escalations, customer experience, and risk controls in a high-volume environment.",
    role: "L4 Senior Client Service Analyst (Managed India CS Team)",
    period: "October 2025 – April 2026",
    context:
      "Bybit's India Client Services team supported users across Spot, Derivatives, API trading, blockchain transfers, and account-related issues. The role combined frontline customer support with team coordination and complex case management.",
    challenge:
      "Maintaining fast response and resolution times while handling high volumes of customer queries, complex transaction issues, and sensitive fraud and account-security cases. Each case required balancing customer experience, technical investigation, and risk controls.",
    action: [
      "Managed day-to-day support operations for a six-person India team.",
      "Handled 70–80 customer cases daily and served as the escalation point for 12–15 complex, high-priority cases.",
      "Investigated deposit, withdrawal, and cross-chain transfer issues end to end.",
      "Worked with Product, Engineering, and Risk teams to identify root causes and resolve platform issues.",
      "Investigated 4–5 fraud and account-security cases daily, alongside KYC verification, account reviews, and transaction monitoring.",
    ],
    outcome:
      "Maintained **4.8/5 CSAT against a team target of 4.2**, achieved a **30-second first response against a two-minute target**, and brought average resolution time to approximately **four hours against a 24-hour target**.",
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.companySlug === slug);
}
