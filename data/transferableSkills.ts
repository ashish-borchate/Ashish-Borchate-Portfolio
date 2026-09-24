export type SkillPhase = {
  id: string;
  title: string;
  items: string[];
};

export const transferablePhases: SkillPhase[] = [
  {
    id: "understand",
    title: "UNDERSTAND",
    items: [
      "Learn the product",
      "Understand customers",
      "Map workflows",
      "Identify friction",
    ],
  },
  {
    id: "diagnose",
    title: "DIAGNOSE",
    items: [
      "Find root causes",
      "Identify bottlenecks",
      "Analyze recurring issues",
    ],
  },
  {
    id: "build",
    title: "BUILD",
    items: [
      "Processes",
      "SOPs",
      "Documentation",
      "Automation",
      "Escalation frameworks",
    ],
  },
  {
    id: "connect",
    title: "CONNECT",
    items: ["Customer", "Support", "Operations", "Product", "Engineering"],
  },
  {
    id: "improve",
    title: "IMPROVE",
    items: [
      "Experience",
      "Efficiency",
      "Resolution",
      "Self-service",
      "Product feedback",
    ],
  },
];

export const transferableCopy = {
  headline: "THE PRODUCT CAN CHANGE. THE SKILL DOESN'T.",
  paragraphs: [
    "[FINAL COPY — Web3 domain expertise without limiting to one industry]",
    "[FINAL COPY — transferable operating mindset]",
    "The product can change.",
    "The operating mindset stays the same.",
  ],
};
