import { companyLogoAssets } from "@/data/companyLogos";

export type TestimonialQuoteStatus = "sample" | "verified";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  companySlug: "koinx" | "yellow";
  /** Shown on card front, e.g. WORKED TOGETHER · SUPPORT OPERATIONS */
  contextLine: string;
  /** Expanded: HOW WE WORKED TOGETHER body */
  workingTogether: string;
  relationship: string;
  previewQuote: string;
  fullQuote: string;
  quoteStatus: TestimonialQuoteStatus;
  photo?: string;
  logo: string;
  profileUrl?: string;
};

export const testimonialsSection = {
  title: "WHAT THEY SAW",
  subtitle: "A few words from people I've worked with along the way.",
} as const;

export const featuredTestimonialIds = [
  "punit-agarwal",
  "guna-shekar",
  "louis-benassy",
  "joris-colleret",
] as const;

/** Replace sample `fullQuote` values in this file only — UI reads from here. */
export const testimonials: Testimonial[] = [
  {
    id: "punit-agarwal",
    name: "Punit Agarwal",
    role: "CEO & Founder",
    company: "KoinX",
    companySlug: "koinx",
    contextLine: "WORKED TOGETHER · SUPPORT OPERATIONS",
    workingTogether: "Support Operations",
    relationship: "Direct manager · Support Operations",
    previewQuote:
      "Ashish played an important role in building and improving the support operation...",
    fullQuote:
      "[SAMPLE FEEDBACK — TO BE REPLACED WITH PUNIT'S FINAL TESTIMONIAL]",
    quoteStatus: "sample",
    photo: "/assets/testimonials/punit-agarwal.jpg",
    logo: companyLogoAssets.koinx,
  },
  {
    id: "guna-shekar",
    name: "Guna Shekar Proddaturi",
    role: "CTO & Co-founder",
    company: "KoinX",
    companySlug: "koinx",
    contextLine: "WORKED TOGETHER · PRODUCT",
    workingTogether: "Product",
    relationship: "Worked closely on product issues and implementations",
    previewQuote:
      "Ashish was consistently involved in understanding product issues and helping move implementations forward...",
    fullQuote:
      "[SAMPLE FEEDBACK — TO BE REPLACED WITH GUNA'S FINAL TESTIMONIAL]",
    quoteStatus: "sample",
    photo: "/assets/testimonials/guna-shekar.jpg",
    logo: companyLogoAssets.koinx,
  },
  {
    id: "louis-benassy",
    name: "Louis Benassy",
    role: "COO | Head of Exchange · Yellow.pro",
    company: "Yellow.pro",
    companySlug: "yellow",
    contextLine: "WORKED TOGETHER · SUPPORT OPERATIONS",
    workingTogether: "Support Operations",
    relationship: "Direct manager · Support Operations",
    previewQuote:
      "Ashish took ownership of the support operation and consistently worked to improve how the team handled users and issues...",
    fullQuote:
      "[SAMPLE FEEDBACK — TO BE REPLACED WITH LOUIS'S FINAL TESTIMONIAL]",
    quoteStatus: "sample",
    photo: "/assets/testimonials/louis-benassy.jpg",
    logo: companyLogoAssets.yellow,
  },
  {
    id: "joris-colleret",
    name: "Joris Colleret",
    role: "Senior Product Manager",
    company: "Yellow.pro",
    companySlug: "yellow",
    contextLine: "WORKED TOGETHER · PRODUCT · QA · UAT",
    workingTogether: "Product · QA · UAT",
    relationship: "Product feedback · QA · UAT · Product collaboration",
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
