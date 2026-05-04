// ... existing imports ...

export const databaseSettingsSchema = z.object(
  {
    // Logs settings
    logs: z.object({
      detailedLogsEnabled: z.boolean(),
      callLogPipelineEnabled: z.boolean(),
      maxDetailSizeKb: z.number().int().nonnegative(),
      ringBufferSize: z.number().int().min(100).max(10000),
    }),

    // Backup settings
    backup: z.object({
      autoBackupEnabled: z.boolean(),
      autoBackupFrequency: z
        .literal("never")
        .or(z.literal("daily"))
        .or(z.literal("weekly"))
        .or(z.literal("monthly")),
      keepLastNBackups: z.number().int().min(1).max(100),
    }),

    // Cache settings
    cache: z.object({
      semanticCacheEnabled: z.boolean(),
      semanticCacheMaxSize: z.number().int().min(10).max(1000),
      semanticCacheTTL: z.number().int().min(60000),
      promptCacheEnabled: z.boolean(),
      promptCacheStrategy: z.literal("auto").or(z.literal("system-only")).or(z.literal("manual")),
      alwaysPreserveClientCache: z.literal("auto").or(z.literal("always")).or(z.literal("never")),
    }),

    // Retention settings
    retention: z.object({
      quotaSnapshots: z.number().int().min(1).max(3650), // Max 10 years
      compressionAnalytics: z.number().int().min(1).max(365),
      mcpAudit: z.number().int().min(1).max(365),
      a2aEvents: z.number().int().min(1).max(365),
      callLogs: z.number().int().min(1).max(3650),
      usageHistory: z.number().int().min(1).max(3650),
      memoryEntries: z.number().int().min(1).max(3650),
      autoCleanupEnabled: z.boolean(),
    }),

    // Aggregation settings
    aggregation: z.object({
      enabled: z.boolean(),
      rawDataRetentionDays: z.number().int().min(1).max(90),
      granularity: z.literal("hourly").or(z.literal("daily")).or(z.literal("weekly")),
    }),

    // Optimization settings
    optimization: z.object({
      autoVacuumMode: z.literal("NONE").or(z.literal("FULL")).or(z.literal("INCREMENTAL")),
      scheduledVacuum: z
        .literal("never")
        .or(z.literal("daily"))
        .or(z.literal("weekly"))
        .or(z.literal("monthly")),
      pageSize: z.number().multipleOf(512).min(512).max(16384),
      cacheSize: z.number().int().min(1000).max(1000000),
      mmapSize: z.number().int().min(0),
    }),

    // Skip location and stats as they're read-only
  },
  { strict: true }
);

export type DatabaseSettingsSchema = z.infer<typeof databaseSettingsSchema>;

// ... rest of the file ...
