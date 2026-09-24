export type CareerStage =
  | "customer"
  | "support"
  | "leadership"
  | "operations"
  | "product"
  | "systems";

export type ExperienceEntry = {
  id: string;
  company: string;
  companySlug: string;
  role: string;
  period: string;
  stage: CareerStage;
  emphasis: "primary" | "compressed";
  oneLiner: string;
  logo: string;
  /** When `text-only`, no logo image is rendered (verified assets only). */
  logoDisplay?: "image" | "text-only";
};

export const experienceTimeline: ExperienceEntry[] = [
  {
    id: "cinepolis",
    company: "Cinépolis",
    companySlug: "cinepolis",
    role: "[ROLE — VERIFY]",
    period: "[PERIOD — VERIFY]",
    stage: "customer",
    emphasis: "compressed",
    oneLiner: "[FINAL COPY — one-line contribution]",
    logo: "/assets/companies/cinepolis.svg",
  },
  {
    id: "arsh",
    company: "Arsh Infoservices",
    companySlug: "arsh",
    role: "[ROLE — VERIFY]",
    period: "[PERIOD — VERIFY]",
    stage: "support",
    emphasis: "compressed",
    oneLiner: "[FINAL COPY — one-line contribution]",
    logo: "/assets/companies/arsh.svg",
    logoDisplay: "text-only",
  },
  {
    id: "binance",
    company: "Binance",
    companySlug: "binance",
    role: "[ROLE — VERIFY]",
    period: "[PERIOD — VERIFY]",
    stage: "leadership",
    emphasis: "primary",
    oneLiner: "[FINAL COPY]",
    logo: "/assets/companies/binance.svg",
  },
  {
    id: "bybit",
    company: "Bybit",
    companySlug: "bybit",
    role: "[ROLE — VERIFY]",
    period: "[PERIOD — VERIFY]",
    stage: "operations",
    emphasis: "primary",
    oneLiner: "[FINAL COPY]",
    logo: "/assets/companies/bybit.svg",
  },
  {
    id: "koinx",
    company: "KoinX",
    companySlug: "koinx",
    role: "[ROLE — VERIFY]",
    period: "[PERIOD — VERIFY]",
    stage: "product",
    emphasis: "primary",
    oneLiner: "[FINAL COPY]",
    logo: "/assets/companies/koinx.svg",
  },
  {
    id: "yellow",
    company: "Yellow.pro",
    companySlug: "yellow",
    role: "[ROLE — VERIFY]",
    period: "[PERIOD — VERIFY]",
    stage: "systems",
    emphasis: "primary",
    oneLiner: "[FINAL COPY]",
    logo: "/assets/companies/yellow.svg",
  },
];
