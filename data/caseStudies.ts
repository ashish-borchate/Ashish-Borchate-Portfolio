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
    context: "[FINAL COPY]",
    challenge: "[FINAL COPY]",
    outcome: "[FINAL COPY]",
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
    context: "[FINAL COPY]",
    challenge: "[FINAL COPY]",
    outcome: "[FINAL COPY]",
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
    context: "[FINAL COPY]",
    challenge: "[FINAL COPY]",
    outcome: "[FINAL COPY]",
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
    context: "[FINAL COPY]",
    challenge: "[FINAL COPY]",
    outcome: "[FINAL COPY]",
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
