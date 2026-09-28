export type ToolCategory = {
  id: string;
  title: string;
  tools: ToolItem[];
};

export type ToolItem = {
  id: string;
  name: string;
  uses: string[];
  verified: boolean;
};

export const toolCategories: ToolCategory[] = [
  {
    id: "support",
    title: "Support & CX",
    tools: [
      {
        id: "intercom",
        name: "Intercom",
        uses: ["Workflows", "Automation", "Copilot", "Ticketing", "Help Center"],
        verified: true,
      },
      {
        id: "zendesk",
        name: "Zendesk",
        uses: ["[USE CASE — VERIFY]"],
        verified: false,
      },
      {
        id: "salesforce",
        name: "Salesforce",
        uses: ["[USE CASE — VERIFY]"],
        verified: false,
      },
    ],
  },
  {
    id: "ops",
    title: "Operations & Collaboration",
    tools: [
      {
        id: "slack",
        name: "Slack",
        uses: ["Internal coordination", "[DETAIL — VERIFY]"],
        verified: false,
      },
      {
        id: "discord",
        name: "Discord",
        uses: ["Community support", "Yellow.pro stack"],
        verified: true,
      },
      {
        id: "telegram",
        name: "Telegram",
        uses: ["Community support", "Yellow.pro stack"],
        verified: true,
      },
      { id: "lark", name: "Lark", uses: ["[USE CASE — VERIFY]"], verified: false },
      {
        id: "notion",
        name: "Notion",
        uses: ["SOPs", "Trackers", "Documentation", "Knowledge management"],
        verified: true,
      },
      {
        id: "confluence",
        name: "Confluence",
        uses: ["Internal documentation", "Yellow.pro stack"],
        verified: true,
      },
      {
        id: "jira",
        name: "Jira",
        uses: ["Bug tracking", "Engineering collaboration", "Product requests"],
        verified: true,
      },
      {
        id: "gitbook",
        name: "GitBook",
        uses: ["Help Center / docs", "Yellow.pro stack"],
        verified: true,
      },
    ],
  },
  {
    id: "web3",
    title: "Web3 / Risk",
    tools: [
      {
        id: "chainalysis",
        name: "Chainalysis",
        uses: ["[USE CASE — VERIFY]"],
        verified: false,
      },
      {
        id: "explorers",
        name: "Blockchain explorers",
        uses: ["Transaction investigation", "Deposit / withdrawal cases"],
        verified: true,
      },
      {
        id: "exchange-systems",
        name: "Crypto exchange systems",
        uses: ["Spot", "Futures", "Wallet", "P2P workflows"],
        verified: true,
      },
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    tools: [
      {
        id: "intercom-copilot",
        name: "Intercom Copilot",
        uses: ["Agent assist", "Workflow automation", "KoinX optimization"],
        verified: true,
      },
      {
        id: "ai-agents",
        name: "AI agents",
        uses: ["[USE CASE — VERIFY]"],
        verified: false,
      },
      { id: "haptik", name: "Haptik", uses: ["[USE CASE — VERIFY]"], verified: false },
      {
        id: "mcp",
        name: "MCP-based tools",
        uses: ["[USE CASE — VERIFY]"],
        verified: false,
      },
      {
        id: "support-automation",
        name: "Support automation",
        uses: ["Intercom workflows", "Repetitive task reduction"],
        verified: true,
      },
    ],
  },
];
