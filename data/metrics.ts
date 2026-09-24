export type MetricItem = {
  id: string;
  value: string;
  label: string;
  note?: string;
};

export const impactMetrics: MetricItem[] = [
  {
    id: "csat",
    value: "[VERIFY METRIC]",
    label: "CSAT",
    note: "[FINAL COPY]",
  },
  {
    id: "cases",
    value: "[VERIFY METRIC]",
    label: "Cases / day",
    note: "[FINAL COPY]",
  },
  {
    id: "products",
    value: "[VERIFY METRIC]",
    label: "Products supported",
    note: "[FINAL COPY]",
  },
  {
    id: "agents",
    value: "[VERIFY METRIC]",
    label: "Agents led",
    note: "[FINAL COPY]",
  },
  {
    id: "features",
    value: "[VERIFY METRIC]",
    label: "Feature requests implemented",
    note: "[FINAL COPY]",
  },
  {
    id: "resolution",
    value: "[VERIFY METRIC]",
    label: "Resolution time",
    note: "[FINAL COPY]",
  },
];
