/**
 * MCP Authorization Scopes — Defines permission scopes for each MCP tool.
 *
 * Each tool requires specific scopes to execute. API keys can be configured
 * with a subset of scopes to limit tool access (least-privilege).
 */

// ============ Scope Definitions ============

/** All available MCP scopes */
export const MCP_SCOPE_LIST = [
  "read:health",
  "read:combos",
  "write:combos",
  "read:quota",
  "read:usage",
  "read:models",
  "execute:completions",
  "execute:search",
  "write:budget",
  "write:resilience",
  "pricing:write",
  "read:cache",
  "write:cache",
  "read:compression",
  "write:compression",
  "read:proxies",
] as const;

export type McpScope = (typeof MCP_SCOPE_LIST)[number];

// ============ Tool → Scope Mapping ============

/** Maps each MCP tool to its required scopes */
export const MCP_TOOL_SCOPES: Record<string, readonly McpScope[]> = {
  // Phase 1: Essential Tools
  birouter_get_health: ["read:health"],
  birouter_list_combos: ["read:combos"],
  birouter_get_combo_metrics: ["read:combos"],
  birouter_switch_combo: ["write:combos"],
  birouter_check_quota: ["read:quota"],
  birouter_route_request: ["execute:completions"],
  birouter_web_search: ["execute:search"],
  birouter_web_fetch: ["execute:search"],
  birouter_cost_report: ["read:usage"],
  birouter_list_models_catalog: ["read:models"],

  // Phase 2: Advanced Tools
  birouter_simulate_route: ["read:health", "read:combos"],
  birouter_set_budget_guard: ["write:budget"],
  birouter_set_resilience_profile: ["write:resilience"],
  birouter_test_combo: ["execute:completions", "read:combos"],
  birouter_get_provider_metrics: ["read:health"],
  birouter_best_combo_for_task: ["read:combos", "read:health"],
  birouter_explain_route: ["read:health", "read:usage"],
  birouter_get_session_snapshot: ["read:usage"],
  birouter_db_health_check: ["read:health", "write:resilience"],
  birouter_sync_pricing: ["pricing:write"],
  birouter_cache_stats: ["read:cache"],
  birouter_cache_flush: ["write:cache"],
  birouter_compression_status: ["read:compression"],
  birouter_compression_configure: ["write:compression"],
  birouter_set_compression_engine: ["write:compression"],
  birouter_list_compression_combos: ["read:compression"],
  birouter_compression_combo_stats: ["read:compression"],
  birouter_oneproxy_fetch: ["read:proxies"],
  birouter_oneproxy_rotate: ["read:proxies"],
  birouter_oneproxy_stats: ["read:proxies"],

  // Web-session pool observability (read) + lifecycle (write)
  birouter_pool_status: ["read:health"],
  birouter_pool_sessions: ["read:health"],
  birouter_pool_health: ["read:health"],
  birouter_pool_reset: ["write:resilience"],
  birouter_pool_warm: ["write:resilience"],
  // Stealth browser pool observability (#3368 PR7)
  birouter_browser_pool_status: ["read:health"],
} as const;
