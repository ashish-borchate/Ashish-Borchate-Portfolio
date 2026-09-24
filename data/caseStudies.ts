export type CaseStudyMetric = {
  label: string;
  value: string;
};

export type CaseStudySection = {
  id: string;
  company: string;
  companySlug: string;
  theme: string;
  role: string;
  period: string;
  context: string;
  challenge: string;
  actions: string[];
  systemsCreated: string[];
  productInvolvement: string[];
  tools: string[];
  metrics: CaseStudyMetric[];
  outcome: string;
  flowSteps: string[];
  testimonialIds: string[];
};

export const caseStudies: CaseStudySection[] = [
  {
    id: "yellow",
    company: "Yellow.pro",
    companySlug: "yellow",
    theme: "BUILDING SUPPORT FROM ZERO",
    role: "[ROLE — VERIFY]",
    period: "[PERIOD — VERIFY]",
    context: "[FINAL COPY]",
    challenge: "[FINAL COPY]",
    actions: ["[FINAL COPY]", "[FINAL COPY]"],
    systemsCreated: [
      "Ticketing",
      "Help Center",
      "SLAs",
      "Escalation system",
      "Automation",
      "UAT",
      "Product feedback",
      "Support operating system",
    ],
    productInvolvement: [
      "UAT",
      "Release validation",
      "Product feedback",
      "Bug reproduction",
    ],
    tools: ["[TOOL — VERIFY]"],
    metrics: [
      { label: "Resolution time", value: "[VERIFY METRIC]" },
      { label: "Help Center size", value: "[VERIFY METRIC]" },
      { label: "UAT / release validations", value: "[VERIFY METRIC]" },
    ],
    outcome: "[FINAL COPY]",
    flowSteps: [
      "Ad-hoc support",
      "Ticketing",
      "Help Center",
      "SLAs",
      "Escalation system",
      "Automation",
      "UAT",
      "Product feedback",
      "Support operating system",
    ],
    testimonialIds: ["yellow-coo", "yellow-pm"],
  },
  {
    id: "binance",
    company: "Binance",
    companySlug: "binance",
    theme: "OPERATING AT SCALE",
    role: "[ROLE — VERIFY]",
    period: "[PERIOD — VERIFY]",
    context: "[FINAL COPY]",
    challenge: "[FINAL COPY]",
    actions: ["[FINAL COPY]", "[FINAL COPY]"],
    systemsCreated: ["[FINAL COPY]"],
    productInvolvement: [
      "Escalation to Product / Engineering",
      "QA",
      "Coaching",
    ],
    tools: ["[TOOL — VERIFY]"],
    metrics: [
      { label: "Cases / day", value: "[VERIFY METRIC]" },
      { label: "Products supported", value: "[VERIFY METRIC]" },
      { label: "Agents led", value: "[VERIFY METRIC]" },
      { label: "CSAT", value: "[VERIFY METRIC]" },
    ],
    outcome: "[FINAL COPY]",
    flowSteps: [
      "Customer",
      "Support",
      "Escalation",
      "Product / Engineering",
      "Resolution",
    ],
    testimonialIds: ["binance-manager"],
  },
  {
    id: "koinx",
    company: "KoinX",
    companySlug: "koinx",
    theme: "FROM SUPPORT → PRODUCT FEEDBACK",
    role: "[ROLE — VERIFY]",
    period: "[PERIOD — VERIFY]",
    context: "[FINAL COPY]",
    challenge: "[FINAL COPY]",
    actions: ["[FINAL COPY]", "[FINAL COPY]"],
    systemsCreated: ["Product feedback loops", "[FINAL COPY]"],
    productInvolvement: [
      "Feature requests",
      "Customer insights",
      "Engineering collaboration",
    ],
    tools: ["[TOOL — VERIFY]"],
    metrics: [
      {
        label: "Implemented feature requests",
        value: "[VERIFY METRIC]",
      },
    ],
    outcome: "[FINAL COPY]",
    flowSteps: [
      "Customer conversation",
      "Recurring problem",
      "Insight",
      "Feature request",
      "Product / Engineering",
      "Feature shipped",
    ],
    testimonialIds: ["koinx-ceo", "koinx-cto"],
  },
  {
    id: "bybit",
    company: "Bybit",
    companySlug: "bybit",
    theme: "SPEED UNDER PRESSURE",
    role: "[ROLE — VERIFY]",
    period: "[PERIOD — VERIFY]",
    context: "[FINAL COPY]",
    challenge: "[FINAL COPY]",
    actions: ["[FINAL COPY]", "[FINAL COPY]"],
    systemsCreated: ["[FINAL COPY]"],
    productInvolvement: ["Complex escalations", "[FINAL COPY]"],
    tools: ["[TOOL — VERIFY]"],
    metrics: [
      { label: "First response (actual)", value: "[VERIFY METRIC]" },
      { label: "First response (target)", value: "[VERIFY METRIC]" },
      { label: "Avg resolution (actual)", value: "[VERIFY METRIC]" },
      { label: "Avg resolution (target)", value: "[VERIFY METRIC]" },
    ],
    outcome: "[FINAL COPY]",
    flowSteps: [
      "Complex escalations",
      "Fraud / security",
      "Deposits / withdrawals",
      "Cross-chain transfers",
      "KYC / AML",
    ],
    testimonialIds: ["bybit-manager"],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.companySlug === slug);
}
