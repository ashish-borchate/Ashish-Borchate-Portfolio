export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  companySlug: string;
  photo?: string;
  logo?: string;
};

/** Featured testimonial slots shown in the dedicated section. */
export const featuredTestimonialIds = [
  "koinx-ceo",
  "koinx-cto",
  "yellow-coo",
  "yellow-pm",
] as const;

export const testimonials: Testimonial[] = [
  {
    id: "koinx-ceo",
    quote: "[TESTIMONIAL TO BE ADDED]",
    name: "[NAME]",
    role: "CEO",
    company: "KoinX",
    companySlug: "koinx",
    logo: "/assets/companies/koinx.svg",
  },
  {
    id: "koinx-cto",
    quote: "[TESTIMONIAL TO BE ADDED]",
    name: "[NAME]",
    role: "CTO",
    company: "KoinX",
    companySlug: "koinx",
    logo: "/assets/companies/koinx.svg",
  },
  {
    id: "yellow-coo",
    quote: "[TESTIMONIAL TO BE ADDED]",
    name: "[NAME]",
    role: "COO",
    company: "Yellow.pro",
    companySlug: "yellow",
    logo: "/assets/companies/yellow.svg",
  },
  {
    id: "yellow-pm",
    quote: "[TESTIMONIAL TO BE ADDED]",
    name: "[NAME]",
    role: "Product Manager",
    company: "Yellow.pro",
    companySlug: "yellow",
    logo: "/assets/companies/yellow.svg",
  },
];

export function getFeaturedTestimonials() {
  return featuredTestimonialIds
    .map((id) => testimonials.find((t) => t.id === id))
    .filter((t): t is Testimonial => Boolean(t));
}
