export type CoreArea = {
  label: string;
  accent?: boolean;
};

export const careerDirection = {
  headline: "WHAT I'M LOOKING FOR",
  intro:
    "I work best in roles where I can connect customer experience, support, operations, and product — understanding what users need, finding what isn’t working, and helping teams improve it.",
  coreAreasLabel: "CORE AREAS",
  coreAreas: [
    { label: "Support Operations" },
    { label: "Customer Experience" },
    { label: "Product Ops" },
    { label: "QA & UAT" },
    { label: "Web3", accent: true },
  ] satisfies CoreArea[],
  closing:
    "I’m open to both Web3 and non-Web3 companies where the role involves understanding products, solving customer and operational problems, and working closely with Product and Engineering.",
};
