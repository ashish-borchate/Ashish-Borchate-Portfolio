export type MetricItem = {
  id: string;
  value: string;
  label: string;
  note?: string;
};

export const impactMetrics: MetricItem[] = [
  {
    id: "csat",
    value: "98.5%",
    label: "Personal CSAT",
    note: "Binance · target 92%",
  },
  {
    id: "cases",
    value: "80–100",
    label: "Cases / day",
    note: "Binance L2 volume",
  },
  {
    id: "products",
    value: "20+",
    label: "Products supported",
    note: "Binance crypto products",
  },
  {
    id: "agents",
    value: "8–10",
    label: "Agents led",
    note: "Binance India team",
  },
  {
    id: "features",
    value: "70+",
    label: "Product features shipped",
    note: "From user feedback · KoinX",
  },
  {
    id: "resolution",
    value: "4 hr",
    label: "Avg resolution",
    note: "Bybit · target 24 hr",
  },
];
