export type MarqueeCompany = {
  id: string;
  name: string;
  logo: string;
};

/** Order for marquee (experience-focused showcase). */
export const marqueeCompanies: MarqueeCompany[] = [
  { id: "yellow", name: "Yellow.pro", logo: "/assets/companies/yellow.svg" },
  { id: "bybit", name: "Bybit", logo: "/assets/companies/bybit.svg" },
  { id: "koinx", name: "KoinX", logo: "/assets/companies/koinx.svg" },
  { id: "binance", name: "Binance", logo: "/assets/companies/binance.svg" },
  { id: "cinepolis", name: "Cinépolis", logo: "/assets/companies/cinepolis.svg" },
];
