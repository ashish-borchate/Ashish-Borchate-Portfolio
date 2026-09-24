export type SkillPhase = {
  id: string;
  number: string;
  title: string;
  items: string[];
};

export const transferablePhases: SkillPhase[] = [
  {
    id: "understand",
    number: "01",
    title: "UNDERSTAND",
    items: ["Learn the product", "Understand customers", "Identify friction"],
  },
  {
    id: "diagnose",
    number: "02",
    title: "DIAGNOSE",
    items: [
      "Find root causes",
      "Analyze recurring issues",
      "Identify system problems",
    ],
  },
  {
    id: "connect",
    number: "03",
    title: "CONNECT",
    items: ["Support", "Product", "Engineering"],
  },
  {
    id: "build",
    number: "04",
    title: "BUILD",
    items: [
      "Implement changes",
      "Create documentation",
      "Improve processes",
    ],
  },
];

export const transferableCopy = {
  headline: "THE PRODUCT CAN CHANGE. THE SKILL DOESN'T.",
  lines: [
    "The product can change.",
    "The industry can change.",
    "The operating mindset stays the same.",
  ],
};
