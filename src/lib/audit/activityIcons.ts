export interface ActivityIconSpec {
  /** Material Symbols icon name (e.g. "extension"). */
  icon: string;
  /** i18n key under namespace `activity.eventVerb.*` for the human verb. */
  i18nKeyVerb: string;
}

export const ACTIVITY_ICONS: Record<string, ActivityIconSpec> = {
  "provider.added": { icon: "extension", i18nKeyVerb: "providerAdded" },
  "provider.removed": { icon: "extension_off", i18nKeyVerb: "providerRemoved" },
  "provider.tested": { icon: "network_check", i18nKeyVerb: "providerTested" },
  "combo.created": { icon: "layers", i18nKeyVerb: "comboCreated" },
  "combo.updated": { icon: "tune", i18nKeyVerb: "comboUpdated" },
  "combo.deleted": { icon: "layers_clear", i18nKeyVerb: "comboDeleted" },
  "apikey.created": { icon: "vpn_key", i18nKeyVerb: "apiKeyCreated" },
  "apikey.revoked": { icon: "key_off", i18nKeyVerb: "apiKeyRevoked" },
  "apikey.rotated": { icon: "sync", i18nKeyVerb: "apiKeyRotated" },
  "budget.threshold_reached": { icon: "warning", i18nKeyVerb: "budgetThreshold" },
  "setting.updated": { icon: "settings", i18nKeyVerb: "settingUpdated" },
  "auth.login": { icon: "login", i18nKeyVerb: "authLogin" },
  "auth.logout": { icon: "logout", i18nKeyVerb: "authLogout" },
  "cloud_agent.session.created": { icon: "cloud", i18nKeyVerb: "cloudAgentSession" },
  "mcp.tool.registered": { icon: "hub", i18nKeyVerb: "mcpToolRegistered" },
  "webhook.created": { icon: "webhook", i18nKeyVerb: "webhookCreated" },
  "webhook.deleted": { icon: "webhook", i18nKeyVerb: "webhookDeleted" },
  "quota.pool.created": { icon: "pie_chart", i18nKeyVerb: "quotaPoolCreated" },
  "quota.pool.updated": { icon: "edit_note", i18nKeyVerb: "quotaPoolUpdated" },
  "quota.pool.deleted": { icon: "delete", i18nKeyVerb: "quotaPoolDeleted" },
  "quota.plan.updated": { icon: "fact_check", i18nKeyVerb: "quotaPlanUpdated" },
  "quota.store.driver_changed": { icon: "storage", i18nKeyVerb: "quotaStoreDriverChanged" },
  "update.applied": { icon: "system_update", i18nKeyVerb: "updateApplied" },
  "deploy.completed": { icon: "rocket_launch", i18nKeyVerb: "deployCompleted" },
  "skill.installed": { icon: "auto_fix_high", i18nKeyVerb: "skillInstalled" },
  "skill.removed": { icon: "auto_fix_off", i18nKeyVerb: "skillRemoved" },
};

export function getActivityIcon(action: string): ActivityIconSpec {
  return ACTIVITY_ICONS[action] ?? { icon: "info", i18nKeyVerb: "genericEvent" };
}
