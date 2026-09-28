export type ImpactMetric = {
  id: string;
  value: string;
  label: string;
  context: string;
  back: string;
};

export const impactMetrics: ImpactMetric[] = [
  {
    id: "binance-csat-personal",
    value: "98.5%",
    label: "Personal CSAT",
    context: "Binance · Target 92%",
    back: "Maintained 98.5% personal CSAT while handling 80–100 cases daily across 20+ crypto products.",
  },
  {
    id: "binance-csat-india",
    value: "96%",
    label: "India team CSAT",
    context: "Binance · Up from 90%",
    back: "Raised India team CSAT from 90% to 96% through DSAT analysis, coaching and clearer customer-facing communication.",
  },
  {
    id: "koinx-features",
    value: "70+",
    label: "Product features implemented",
    context: "KoinX · User feedback",
    back: "Turned recurring user feedback into 70+ implemented product features by working with Product and Engineering.",
  },
  {
    id: "koinx-automation",
    value: "40%",
    label: "Repetitive tasks automated",
    context: "KoinX · Intercom workflows",
    back: "Automated an estimated 40% of repetitive agent tasks with Intercom workflows, freeing the team to focus on more complex issues.",
  },
  {
    id: "yellow-uat",
    value: "20+",
    label: "Features & releases tested",
    context: "Yellow.pro · UAT & staging",
    back: "Ran end-to-end UAT and staging validation across 20+ features and releases, including trading, API, wallet and settlement workflows. This also included testing Yellow.pro's MCP-based AI trading agent, designed to let users perform trading activities and interact with the Yellow platform through natural-language prompts.",
  },
  {
    id: "yellow-resolution",
    value: "<24 HRS",
    label: "Standard-ticket resolution",
    context: "Yellow.pro · From 4 business days",
    back: "Reduced standard-ticket resolution from 4 business days to under 24 hours by building structured ticketing, escalation workflows and troubleshooting playbooks.",
  },
  {
    id: "bybit-frt",
    value: "30 SEC",
    label: "First response time",
    context: "Bybit · Target 2 min",
    back: "Achieved a 30-second average first response against a 2-minute target while handling 70–80 L2 cases daily.",
  },
  {
    id: "bybit-resolution",
    value: "4 HRS",
    label: "Average resolution time",
    context: "Bybit · Target 24 hrs",
    back: "Resolved cases in an average of 4 hours against a 24-hour target, including complex deposits, withdrawals and cross-chain issues.",
  },
];
