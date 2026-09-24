export type HowIWorkStep = {
  id: string;
  number: string;
  title: string;
  items: string[];
};

export const howIWorkSteps: HowIWorkStep[] = [
  {
    id: "discover",
    number: "01",
    title: "DISCOVER",
    items: [
      "Listen to customers.",
      "Understand workflows.",
      "Find patterns.",
    ],
  },
  {
    id: "diagnose",
    number: "02",
    title: "DIAGNOSE",
    items: [
      "Identify root causes.",
      "Separate symptoms from system problems.",
    ],
  },
  {
    id: "build",
    number: "03",
    title: "BUILD",
    items: [
      "Processes.",
      "Documentation.",
      "Automation.",
      "Escalation systems.",
      "Product feedback loops.",
    ],
  },
  {
    id: "measure",
    number: "04",
    title: "MEASURE",
    items: [
      "CSAT.",
      "Resolution time.",
      "Backlog.",
      "Adoption.",
      "Efficiency.",
      "Customer experience.",
    ],
  },
];
