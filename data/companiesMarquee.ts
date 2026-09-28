export type MarqueeCompany = {
  id: string;
  name: string;
  logo: string;
};

/** Order for marquee (experience-focused showcase). */
export const marqueeCompanies: MarqueeCompany[] = [
  { id: "yellow", name: "Yellow.pro", logo: "/assets/companies/yellow.png" },
  { id: "bybit", name: "Bybit", logo: "/assets/companies/bybit.png" },
  { id: "koinx", name: "KoinX", logo: "/assets/companies/koinx.png" },
  { id: "binance", name: "Binance", logo: "/assets/companies/binance.png" },
  { id: "cinepolis", name: "Cinépolis", logo: "/assets/companies/cinepolis.png" },
];
