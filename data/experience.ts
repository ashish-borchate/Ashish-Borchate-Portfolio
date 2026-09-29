import { companyLogoAssets } from "@/data/companyLogos";

export type ExperienceDetail = {
  workedOn: string[];
  learned: string;
};

export type ExperienceEntry = {
  id: string;
  company: string;
  companySlug: string;
  role: string;
  period: string;
  emphasis: "primary" | "compressed";
  logo: string;
  /** When `text-only`, no logo image is rendered (verified assets only). */
  logoDisplay?: "image" | "text-only";
  detail?: ExperienceDetail;
};

export const experienceTimeline: ExperienceEntry[] = [
  {
    id: "cinepolis",
    company: "Cinépolis",
    companySlug: "cinepolis",
    role: "Operations Supervisor",
    period: "October 2019 – October 2020",
    emphasis: "compressed",
    logo: companyLogoAssets.cinepolis,
    logoDisplay: "text-only",
  },
  {
    id: "arsh",
    company: "Arsh Infoservices",
    companySlug: "arsh",
    role: "Customer Service Manager",
    period: "December 2020 – November 2022",
    emphasis: "compressed",
    logo: companyLogoAssets.arsh,
    logoDisplay: "text-only",
  },
  {
    id: "binance",
    company: "Binance",
    companySlug: "binance",
    role: "L2 Customer Support Team Leader",
    period: "December 2022 – February 2025",
    emphasis: "primary",
    logo: companyLogoAssets.binance,
    detail: {
      workedOn: [
        "Led a 10+ member support team serving institutional clients and high-value B2B users across 20+ crypto products.",
        "Managed complex onboarding, account management, security, fraud, KYB and transaction-related escalations.",
        "Improved SOPs, knowledge bases and training materials as products and workflows evolved.",
        "Used customer feedback and DSAT patterns to identify product issues and worked with Product & Engineering on improvements.",
      ],
      learned:
        "How to operate customer support at scale — combining people leadership, product knowledge, customer feedback, risk awareness and cross-team coordination.",
    },
  },
  {
    id: "koinx",
    company: "KoinX",
    companySlug: "koinx",
    role: "Customer Support & Operations Manager",
    period: "July 2025 – October 2025",
    emphasis: "primary",
    logo: companyLogoAssets.koinx,
    detail: {
      workedOn: [
        "Built structured feedback loops between Support, Product and Engineering.",
        "Turned customer conversations and support data into actionable product and operational improvements.",
        "Created customer-facing FAQs, Product Guides and internal SOPs across product changes.",
        "Trained internal teams on new features and optimized Intercom workflows to automate an estimated 40% of repetitive agent tasks.",
        "Monitored product satisfaction and usage signals to identify friction and improve the customer experience.",
      ],
      learned:
        "How to turn Support into a source of product intelligence — connecting customer conversations to product decisions, documentation and automation.",
    },
  },
  {
    id: "bybit",
    company: "Bybit",
    companySlug: "bybit",
    role: "L4 Senior Client Service Analyst",
    period: "October 2025 – April 2026",
    emphasis: "primary",
    logo: companyLogoAssets.bybit,
    detail: {
      workedOn: [
        "Supported the India client services team as an escalation point for complex customer cases.",
        "Handled 70–80 cases per day across trading, deposits, withdrawals, cross-chain transfers and account issues.",
        "Investigated fraud and security cases alongside KYC/AML-related issues and high-risk customer situations.",
        "Worked against strict response and resolution targets while maintaining a 4.8/5 CSAT.",
      ],
      learned:
        "How to make fast, accurate decisions when customer impact, product complexity and operational risk all matter at the same time.",
    },
  },
  {
    id: "yellow",
    company: "Yellow.pro",
    companySlug: "yellow",
    role: "Community & Support Manager",
    period: "April 2026 – September 2026",
    emphasis: "primary",
    logo: companyLogoAssets.yellow,
    detail: {
      workedOn: [
        "Built the support function from the ground up for the Yellow.pro Trading Portal.",
        "Created the Help Center, FAQs, internal documentation, SLAs, workflows and escalation processes.",
        "Worked closely with Product and Engineering on complex issues, recurring pain points and product improvements.",
        "Performed end-to-end UAT, staging and regression testing across trading workflows, integrations and user journeys.",
        "Reproduced and documented bugs, edge cases and unexpected behaviour before production releases.",
        "Set up and managed the support stack across Intercom, Discord, Telegram, Jira, GitBook, Notion and Confluence.",
      ],
      learned:
        "How to build the system behind support — connecting users, documentation, workflows, testing, Product and Engineering into one operating function.",
    },
  },
];
