import { companyLogoAssets } from "@/data/companyLogos";

export type TestimonialQuoteStatus = "sample" | "verified";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  /** Shorter or tighter role line on narrow viewports (optional). */
  roleMobile?: string;
  company: string;
  companySlug: "koinx" | "yellow";
  /** Expanded: HOW WE WORKED TOGETHER — shown as `{workingTogether} - {relationship}` */
  workingTogether: string;
  relationship: string;
  previewQuote: string;
  /** Paragraphs separated by blank lines (`\n\n`). */
  fullQuote: string;
  quoteStatus: TestimonialQuoteStatus;
  photo?: string;
  logo: string;
  profileUrl?: string;
};

export const testimonialsSection = {
  eyebrow: "IN THEIR WORDS",
  title: "Testimonials",
  subtitle:
    "Feedback from the founders, executives and product leaders I've worked with.",
} as const;

export const featuredTestimonialIds = [
  "punit-agarwal",
  "guna-shekar",
  "louis-benassy",
  "joris-colleret",
] as const;

export const testimonials: Testimonial[] = [
  {
    id: "punit-agarwal",
    name: "Punit Agarwal",
    role: "CEO & Founder",
    company: "KoinX",
    companySlug: "koinx",
    workingTogether: "Support Operations",
    relationship: "Direct manager",
    previewQuote:
      "Ashish played an important role in building and strengthening our support operations at KoinX...",
    fullQuote: `Ashish played an important role in building and strengthening our support operations at KoinX. As the primary point of contact for support-related matters, he brought structure to the team’s workflows, improved documentation, and consistently looked for ways to make our processes more efficient. He was also proactive in identifying product gaps and sharing actionable feedback, much of which was quickly taken forward and implemented.

Beyond day-to-day support, Ashish consistently looked for ways to contribute to revenue growth by working closely with high-value users, understanding their needs, supporting discount and pricing discussions, and taking one-on-one calls to help users better understand the product and its value. He worked closely with Product and Engineering to address customer pain points, while also helping create structured training materials and onboarding documentation to strengthen the team’s product knowledge.

His ownership, adaptability, and willingness to take on responsibilities beyond traditional support made him a valuable part of the team.`,
    quoteStatus: "verified",
    photo: "/assets/testimonials/punit-agarwal.jpg",
    logo: companyLogoAssets.koinx,
    profileUrl: "https://www.linkedin.com/in/iampunit/",
  },
  {
    id: "guna-shekar",
    name: "Guna Proddaturi",
    role: "CTO & Co-founder",
    company: "KoinX",
    companySlug: "koinx",
    workingTogether: "Product",
    relationship: "Worked closely on product feedbacks and implementations",
    previewQuote:
      "Ashish was a strong partner in helping us understand how users were actually experiencing and using the KoinX product...",
    fullQuote: `Ashish was a strong partner in helping us understand how users were actually experiencing and using the KoinX product. We worked closely together to identify potential issues from the user's perspective, and he consistently brought actionable product feedback that helped us improve the product and was often taken forward for implementation quickly.

His strong background in crypto and blockchain gave him a particularly good understanding of the product and the complexities behind crypto transactions and their possible tax treatment. He was regularly involved in discussions around blockchain integrations, transaction classifications, and how different product changes could impact users. Although his primary role was within the Support team, Ashish consistently contributed well beyond that scope and played a significant role on the Product side through his product understanding, feedback, and close collaboration with the team.`,
    quoteStatus: "verified",
    photo: "/assets/testimonials/guna-shekar.jpg",
    logo: companyLogoAssets.koinx,
    profileUrl: "https://www.linkedin.com/in/guna-shekar-proddaturi/",
  },
  {
    id: "louis-benassy",
    name: "Louis Benassy",
    role: "COO | Head of Exchange",
    roleMobile: "COO | Head of Exchange",
    company: "Yellow.pro",
    companySlug: "yellow",
    workingTogether: "Support Operations",
    relationship: "Direct manager",
    previewQuote:
      "Ashish was the primary point of contact for support operations at Yellow.pro from day one and consistently took ownership beyond his core responsibilities...",
    fullQuote: `Ashish was the primary point of contact for support operations at Yellow.pro from day one and consistently took ownership beyond his core responsibilities. He looked for ways to improve operational efficiency, including exploring better alternatives for the tools and services we used. He also played an important role in user education, creating product guides and documentation and helping simplify complex concepts around Yellow.pro’s MCP-based AI trading agent for users. What stood out was his willingness to go beyond his assigned responsibilities. With no prior experience in development QA, he took the initiative to learn the testing process and contributed to staging validation, regression testing, issue reproduction, and release testing. His ability to learn quickly and contribute across Support, Product, and QA made him a valuable contributor to the team.`,
    quoteStatus: "verified",
    photo: "/assets/testimonials/louis-benassy.jpg",
    logo: companyLogoAssets.yellow,
    profileUrl: "https://www.linkedin.com/in/louisbenassy/",
  },
  {
    id: "joris-colleret",
    name: "Joris Colleret",
    role: "Sr Product Manager",
    company: "Yellow.pro",
    companySlug: "yellow",
    workingTogether: "Product",
    relationship:
      "Worked closely on Dev QA, UAT, and regression testing across new product releases",
    previewQuote:
      "Ashish has a strong understanding of crypto and Web3 products, with hands-on knowledge across trading, DeFi, wallets, blockchain transactions and APIs...",
    fullQuote:
      "Ashish has a strong understanding of crypto and Web3 products, with hands-on knowledge of trading, DeFi, wallets, blockchain transactions, APIs and the broader crypto ecosystem. What stands out is that he consistently goes beyond his assigned responsibilities to understand the product in depth and identify areas that need attention. He has also taken an active role in QA and UAT, including staging, regression and end-to-end testing, reproducing issues and validating fixes across complex product workflows. He has a strong focus on documentation as well, turning complex product knowledge and findings into clear, useful documentation and processes for both users and internal teams. His combination of strong domain knowledge, product understanding, operational thinking and ownership makes him a valuable contributor beyond the traditional support function.",
    quoteStatus: "verified",
    photo: "/assets/testimonials/joris-colleret.jpg",
    logo: companyLogoAssets.yellow,
    profileUrl: "https://www.linkedin.com/in/joris-colleret-web3-xyz/",
  },
];

export function getFeaturedTestimonials(): Testimonial[] {
  return featuredTestimonialIds
    .map((id) => testimonials.find((t) => t.id === id))
    .filter((t): t is Testimonial => Boolean(t));
}
