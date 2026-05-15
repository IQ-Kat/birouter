export const HIDEABLE_SIDEBAR_ITEM_IDS = [
  // Routing
  "home",
  "endpoints",
  "api-manager",
  "providers",
  "combos",
  "limits",
  // Protocols
  "mcp",
  "a2a",
  "api-endpoints",
  // Agents & AI
  "agents",
  "cloud-agents",
  "batch",
  "batch-files",
  // Cache & Context
  "cache",
  "context-caveman",
  "context-rtk",
  "context-combos",
  // Analytics
  "analytics",
  "analytics-evals",
  "analytics-search",
  "analytics-utilization",
  "analytics-combo-health",
  "analytics-compression",
  // Costs
  "costs",
  "costs-budget",
  "costs-pricing",
  // Monitoring
  "logs",
  "logs-proxy",
  "logs-console",
  "logs-activity",
  "health",
  // Audit & Security
  "audit",
  "audit-mcp",
  "webhooks",
  // Dev Tools
  "translator",
  "playground",
  "search-tools",
  // Configuration
  "settings",
  "settings-general",
  "settings-appearance",
  "settings-ai",
  "settings-security",
  "settings-routing",
  "settings-resilience",
  "settings-advanced",
  "proxy",
  // AI Features
  "memory",
  "skills",
  "agent-skills",
  "media",
  // Help
  "docs",
  "issues",
  "changelog",
] as const;

export type HideableSidebarItemId = (typeof HIDEABLE_SIDEBAR_ITEM_IDS)[number];
export type SidebarSectionId =
  | "routing"
  | "protocols"
  | "agents-ai"
  | "cache-context"
  | "analytics"
  | "costs"
  | "monitoring"
  | "audit-security"
  | "devtools"
  | "configuration"
  | "ai-features"
  | "help";

export interface SidebarItemDefinition {
  id: HideableSidebarItemId;
  href: string;
  i18nKey: string;
  icon: string;
  exact?: boolean;
  external?: boolean;
}

export interface SidebarSectionDefinition {
  id: SidebarSectionId;
  titleKey: string;
  titleFallback: string;
  items: readonly SidebarItemDefinition[];
  showTitleInSidebar?: boolean;
  visibility?: "always" | "debug";
}

const ROUTING_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "home", href: "/home", i18nKey: "home", icon: "home", exact: true },
  { id: "endpoints", href: "/dashboard/endpoint", i18nKey: "endpoints", icon: "api" },
  { id: "api-manager", href: "/dashboard/api-manager", i18nKey: "apiManager", icon: "vpn_key" },
  { id: "providers", href: "/dashboard/providers", i18nKey: "providers", icon: "dns" },
  { id: "combos", href: "/dashboard/combos", i18nKey: "combos", icon: "layers" },
  { id: "limits", href: "/dashboard/limits", i18nKey: "limits", icon: "tune" },
];

const PROTOCOLS_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "mcp", href: "/dashboard/mcp", i18nKey: "mcp", icon: "hub" },
  { id: "a2a", href: "/dashboard/a2a", i18nKey: "a2a", icon: "device_hub" },
  { id: "api-endpoints", href: "/dashboard/api-endpoints", i18nKey: "apiEndpoints", icon: "api" },
];

const AGENTS_AI_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "agents", href: "/dashboard/agents", i18nKey: "agents", icon: "smart_toy" },
  { id: "cloud-agents", href: "/dashboard/cloud-agents", i18nKey: "cloudAgents", icon: "cloud" },
  { id: "batch", href: "/dashboard/batch", i18nKey: "batch", icon: "view_list" },
  { id: "batch-files", href: "/dashboard/batch/files", i18nKey: "batchFiles", icon: "folder" },
];

const CACHE_CONTEXT_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "cache", href: "/dashboard/cache", i18nKey: "cache", icon: "cached" },
  {
    id: "context-caveman",
    href: "/dashboard/context/caveman",
    i18nKey: "contextCaveman",
    icon: "compress",
  },
  {
    id: "context-rtk",
    href: "/dashboard/context/rtk",
    i18nKey: "contextRtk",
    icon: "filter_alt",
  },
  {
    id: "context-combos",
    href: "/dashboard/context/combos",
    i18nKey: "contextCombos",
    icon: "hub",
  },
];

const ANALYTICS_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "analytics", href: "/dashboard/analytics", i18nKey: "analytics", icon: "analytics" },
  {
    id: "analytics-evals",
    href: "/dashboard/analytics/evals",
    i18nKey: "analyticsEvals",
    icon: "labs",
  },
  {
    id: "analytics-search",
    href: "/dashboard/analytics/search",
    i18nKey: "analyticsSearch",
    icon: "manage_search",
  },
  {
    id: "analytics-utilization",
    href: "/dashboard/analytics/utilization",
    i18nKey: "analyticsUtilization",
    icon: "bar_chart",
  },
  {
    id: "analytics-combo-health",
    href: "/dashboard/analytics/combo-health",
    i18nKey: "analyticsComboHealth",
    icon: "monitor_heart",
  },
  {
    id: "analytics-compression",
    href: "/dashboard/analytics/compression",
    i18nKey: "analyticsCompression",
    icon: "data_compression",
  },
];

const COSTS_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "costs", href: "/dashboard/costs", i18nKey: "costs", icon: "account_balance_wallet" },
  {
    id: "costs-budget",
    href: "/dashboard/costs/budget",
    i18nKey: "costsBudget",
    icon: "savings",
  },
  {
    id: "costs-pricing",
    href: "/dashboard/costs/pricing",
    i18nKey: "costsPricing",
    icon: "price_change",
  },
];

const MONITORING_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "logs", href: "/dashboard/logs", i18nKey: "logs", icon: "description" },
  {
    id: "logs-proxy",
    href: "/dashboard/logs/proxy",
    i18nKey: "logsProxy",
    icon: "lan",
  },
  {
    id: "logs-console",
    href: "/dashboard/logs/console",
    i18nKey: "logsConsole",
    icon: "terminal",
  },
  {
    id: "logs-activity",
    href: "/dashboard/logs/activity",
    i18nKey: "logsActivity",
    icon: "history",
  },
  { id: "health", href: "/dashboard/health", i18nKey: "health", icon: "health_and_safety" },
];

const AUDIT_SECURITY_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "audit", href: "/dashboard/audit", i18nKey: "auditLog", icon: "policy" },
  {
    id: "audit-mcp",
    href: "/dashboard/audit/mcp",
    i18nKey: "auditMcp",
    icon: "security",
  },
  { id: "webhooks", href: "/dashboard/webhooks", i18nKey: "webhooks", icon: "webhook" },
];

const DEVTOOLS_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "translator", href: "/dashboard/translator", i18nKey: "translator", icon: "translate" },
  { id: "playground", href: "/dashboard/playground", i18nKey: "playground", icon: "science" },
  {
    id: "search-tools",
    href: "/dashboard/search-tools",
    i18nKey: "searchTools",
    icon: "manage_search",
  },
];

const CONFIGURATION_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "settings", href: "/dashboard/settings", i18nKey: "settings", icon: "settings" },
  {
    id: "settings-general",
    href: "/dashboard/settings/general",
    i18nKey: "settingsGeneral",
    icon: "tune",
  },
  {
    id: "settings-appearance",
    href: "/dashboard/settings/appearance",
    i18nKey: "settingsAppearance",
    icon: "palette",
  },
  {
    id: "settings-ai",
    href: "/dashboard/settings/ai",
    i18nKey: "settingsAi",
    icon: "auto_awesome",
  },
  {
    id: "settings-security",
    href: "/dashboard/settings/security",
    i18nKey: "settingsSecurity",
    icon: "shield",
  },
  {
    id: "settings-routing",
    href: "/dashboard/settings/routing",
    i18nKey: "settingsRouting",
    icon: "route",
  },
  {
    id: "settings-resilience",
    href: "/dashboard/settings/resilience",
    i18nKey: "settingsResilience",
    icon: "health_and_safety",
  },
  {
    id: "settings-advanced",
    href: "/dashboard/settings/advanced",
    i18nKey: "settingsAdvanced",
    icon: "engineering",
  },
  { id: "proxy", href: "/dashboard/system/proxy", i18nKey: "proxy", icon: "dns" },
];

const AI_FEATURES_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "memory", href: "/dashboard/memory", i18nKey: "memory", icon: "psychology" },
  { id: "skills", href: "/dashboard/skills", i18nKey: "omniSkills", icon: "auto_fix_high" },
  {
    id: "agent-skills",
    href: "/dashboard/agent-skills",
    i18nKey: "agentSkills",
    icon: "share",
  },
  { id: "media", href: "/dashboard/cache/media", i18nKey: "media", icon: "perm_media" },
];

const HELP_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "docs", href: "/docs", i18nKey: "docs", icon: "menu_book", external: true },
  {
    id: "issues",
    href: "https://github.com/diegosouzapw/OmniRoute/issues",
    i18nKey: "issues",
    icon: "bug_report",
    external: true,
  },
  { id: "changelog", href: "/dashboard/changelog", i18nKey: "changelog", icon: "campaign" },
];

export const SIDEBAR_SECTIONS: readonly SidebarSectionDefinition[] = [
  {
    id: "routing",
    titleKey: "omniProxySection",
    titleFallback: "OmniProxy",
    items: ROUTING_SIDEBAR_ITEMS,
  },
  {
    id: "protocols",
    titleKey: "protocolsSection",
    titleFallback: "Protocols",
    items: PROTOCOLS_SIDEBAR_ITEMS,
  },
  {
    id: "agents-ai",
    titleKey: "agentsAiSection",
    titleFallback: "Agents & AI",
    items: AGENTS_AI_SIDEBAR_ITEMS,
  },
  {
    id: "cache-context",
    titleKey: "cacheContextSection",
    titleFallback: "Cache & Context",
    items: CACHE_CONTEXT_SIDEBAR_ITEMS,
  },
  {
    id: "analytics",
    titleKey: "analyticsSection",
    titleFallback: "Analytics",
    items: ANALYTICS_SIDEBAR_ITEMS,
  },
  {
    id: "costs",
    titleKey: "costsSection",
    titleFallback: "Costs",
    items: COSTS_SIDEBAR_ITEMS,
  },
  {
    id: "monitoring",
    titleKey: "monitoringSection",
    titleFallback: "Monitoring",
    items: MONITORING_SIDEBAR_ITEMS,
  },
  {
    id: "audit-security",
    titleKey: "auditSecuritySection",
    titleFallback: "Audit & Security",
    items: AUDIT_SECURITY_SIDEBAR_ITEMS,
  },
  {
    id: "devtools",
    titleKey: "devtoolsSection",
    titleFallback: "Dev Tools",
    items: DEVTOOLS_SIDEBAR_ITEMS,
    visibility: "debug",
  },
  {
    id: "configuration",
    titleKey: "configurationSection",
    titleFallback: "Configuration",
    items: CONFIGURATION_SIDEBAR_ITEMS,
  },
  {
    id: "ai-features",
    titleKey: "aiFeaturesSection",
    titleFallback: "AI Features",
    items: AI_FEATURES_SIDEBAR_ITEMS,
  },
  {
    id: "help",
    titleKey: "helpSection",
    titleFallback: "Help",
    items: HELP_SIDEBAR_ITEMS,
  },
] as const;

export const HIDDEN_SIDEBAR_ITEMS_SETTING_KEY = "hiddenSidebarItems";
export const SIDEBAR_SETTINGS_UPDATED_EVENT = "omniroute:settings-updated";

export function normalizeHiddenSidebarItems(value: unknown): HideableSidebarItemId[] {
  if (!Array.isArray(value)) return [];

  const hiddenItems = new Set<HideableSidebarItemId>();

  for (const item of value) {
    if (
      typeof item === "string" &&
      HIDEABLE_SIDEBAR_ITEM_IDS.includes(item as HideableSidebarItemId)
    ) {
      hiddenItems.add(item as HideableSidebarItemId);
    }
  }

  return HIDEABLE_SIDEBAR_ITEM_IDS.filter((item) => hiddenItems.has(item));
}
