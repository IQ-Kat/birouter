export const HIGH_LEVEL_ACTIONS = [
  // providers / providers connections
  "provider.added",
  "provider.removed",
  "provider.tested",
  // combos
  "combo.created",
  "combo.updated",
  "combo.deleted",
  // api keys
  "apikey.created",
  "apikey.revoked",
  "apikey.rotated",
  // budgets
  "budget.threshold_reached",
  // settings (relevantes — não TODO `setting.updated`)
  "setting.updated",
  // auth
  "auth.login",
  "auth.logout",
  // cloud agents / MCP
  "cloud_agent.session.created",
  "mcp.tool.registered",
  // webhooks
  "webhook.created",
  "webhook.deleted",
  // quota share (B26)
  "quota.pool.created",
  "quota.pool.updated",
  "quota.pool.deleted",
  "quota.plan.updated",
  "quota.store.driver_changed",
  // platform
  "update.applied",
  "deploy.completed",
  // skills
  "skill.installed",
  "skill.removed",
] as const;

export type HighLevelAction = (typeof HIGH_LEVEL_ACTIONS)[number];

const SET: ReadonlySet<string> = new Set<string>(HIGH_LEVEL_ACTIONS);

export function isHighLevelAction(action: string): boolean {
  return SET.has(action);
}
