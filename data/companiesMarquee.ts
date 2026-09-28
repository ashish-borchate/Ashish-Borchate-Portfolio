export type MarqueeCompany = {
  id: string;
  name: string;
  logo: string;
  /** Tailwind classes for logo image sizing inside the card */
  logoClassName?: string;
};

/** Order for marquee (experience-focused showcase). */
export const marqueeCompanies: MarqueeCompany[] = [
  {
    id: "yellow",
    name: "Yellow.pro",
    logo: "/assets/companies/yellow.png",
    logoClassName: "w-[min(100%,10.25rem)]",
  },
  {
    id: "bybit",
    name: "Bybit",
    logo: "/assets/companies/bybit.png",
    logoClassName: "w-[min(100%,11.25rem)]",
  },
  {
    id: "koinx",
    name: "KoinX",
    logo: "/assets/companies/koinx.png",
    logoClassName: "w-[min(100%,11.75rem)]",
  },
  {
    id: "binance",
    name: "Binance",
    logo: "/assets/companies/binance.svg",
    logoClassName: "w-[min(100%,11.5rem)]",
  },
  {
    id: "cinepolis",
    name: "Cinépolis",
    logo: "/assets/companies/cinepolis.png",
    logoClassName: "w-[min(100%,11rem)] brightness-0 invert opacity-80",
  },
];
