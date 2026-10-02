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
  headline: "DIFFERENT PRODUCTS. SAME SKILLS",
  intro:
    "Throughout my career, I’ve worked across different industries, products, and types of users. I’ve been able to adapt because the product may change, but the skills needed to make it work well stay the same.",
  principles:
    "Understand the product. Understand how users use it. Diagnose the gaps. Analyze where things can go wrong. Connect the right teams. And build better ways of working.",
};
