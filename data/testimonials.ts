export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  companySlug: string;
  context: string;
  photo?: string;
  logo?: string;
  validates: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "koinx-ceo",
    quote: "[TESTIMONIAL TO BE ADDED]",
    name: "[NAME]",
    role: "CEO",
    company: "KoinX",
    companySlug: "koinx",
    context: "[CONTEXT — VERIFY]",
    validates: "Leadership / ownership / business impact",
    logo: "/assets/companies/koinx.svg",
  },
  {
    id: "koinx-cto",
    quote: "[TESTIMONIAL TO BE ADDED]",
    name: "[NAME]",
    role: "CTO",
    company: "KoinX",
    companySlug: "koinx",
    context: "[CONTEXT — VERIFY]",
    validates: "Product thinking / Engineering collaboration",
    logo: "/assets/companies/koinx.svg",
  },
  {
    id: "yellow-coo",
    quote: "[TESTIMONIAL TO BE ADDED]",
    name: "[NAME]",
    role: "COO",
    company: "Yellow.pro",
    companySlug: "yellow",
    context: "[CONTEXT — VERIFY]",
    validates: "Operations / building systems",
    logo: "/assets/companies/yellow.svg",
  },
  {
    id: "yellow-pm",
    quote: "[TESTIMONIAL TO BE ADDED]",
    name: "[NAME]",
    role: "Product Manager",
    company: "Yellow.pro",
    companySlug: "yellow",
    context: "[CONTEXT — VERIFY]",
    validates: "UAT / product feedback / collaboration",
    logo: "/assets/companies/yellow.svg",
  },
  {
    id: "bybit-manager",
    quote: "[TESTIMONIAL TO BE ADDED]",
    name: "[NAME]",
    role: "Manager",
    company: "Bybit",
    companySlug: "bybit",
    context: "[CONTEXT — VERIFY]",
    validates: "High-pressure support / execution",
    logo: "/assets/companies/bybit.svg",
  },
  {
    id: "binance-manager",
    quote: "[TESTIMONIAL TO BE ADDED]",
    name: "[NAME]",
    role: "Manager",
    company: "Binance",
    companySlug: "binance",
    context: "[CONTEXT — VERIFY]",
    validates: "Scale / leadership / quality",
    logo: "/assets/companies/binance.svg",
  },
];

export function getTestimonialById(id: string) {
  return testimonials.find((t) => t.id === id);
}

export function getTestimonialsByIds(ids: string[]) {
  return ids
    .map((id) => getTestimonialById(id))
    .filter((t): t is Testimonial => Boolean(t));
}
