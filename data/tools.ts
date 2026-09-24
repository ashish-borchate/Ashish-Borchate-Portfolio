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
      { id: "slack", name: "Slack", uses: ["[USE CASE — VERIFY]"], verified: false },
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
        uses: ["[USE CASE — VERIFY]"],
        verified: false,
      },
      {
        id: "jira",
        name: "Jira",
        uses: ["Bug tracking", "Engineering collaboration", "Product requests"],
        verified: true,
      },
      { id: "gitbook", name: "GitBook", uses: ["[USE CASE — VERIFY]"], verified: false },
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
        uses: ["Transaction investigation", "[VERIFY]"],
        verified: false,
      },
      {
        id: "exchange-systems",
        name: "Crypto exchange systems",
        uses: ["[USE CASE — VERIFY]"],
        verified: false,
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
        uses: ["[USE CASE — VERIFY]"],
        verified: false,
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
        uses: ["[USE CASE — VERIFY]"],
        verified: false,
      },
    ],
  },
];
