import {
  getStaticProviderCatalogGroup,
  resolveProviderCatalogEntry,
  type CompatibleProviderLabels,
  type CompatibleProviderNodeLike,
  type ProviderCatalogMetadata,
  type ResolvedProviderCatalogEntry,
  type StaticProviderCatalogCategory,
} from "@/lib/providers/catalog";

export interface ProviderStatsSnapshot {
  total?: number;
  [key: string]: unknown;
}

export interface ProviderEntry<TProvider = Record<string, unknown>> {
  providerId: string;
  provider: TProvider;
  stats: ProviderStatsSnapshot;
  displayAuthType: "oauth" | "apikey" | "compatible";
  toggleAuthType: "oauth" | "free" | "apikey";
}

type ProviderRecord<TProvider = Record<string, unknown>> = Record<string, TProvider>;

type GetProviderStats = (
  providerId: string,
  authType: "oauth" | "free" | "apikey"
) => ProviderStatsSnapshot;

export function buildProviderEntries<TProvider = Record<string, unknown>>(
  providers: ProviderRecord<TProvider>,
  displayAuthType: ProviderEntry["displayAuthType"],
  toggleAuthType: ProviderEntry["toggleAuthType"],
  getProviderStats: GetProviderStats
): ProviderEntry<TProvider>[] {
  return Object.entries(providers).map(([providerId, provider]) => ({
    providerId,
    provider,
    stats: getProviderStats(providerId, toggleAuthType),
    displayAuthType,
    toggleAuthType,
  }));
}

export function buildMergedOAuthProviderEntries<TProvider = Record<string, unknown>>(
  oauthProviders: ProviderRecord<TProvider>,
  freeProviders: ProviderRecord<TProvider>,
  getProviderStats: GetProviderStats
): ProviderEntry<TProvider>[] {
  return [
    ...buildProviderEntries(oauthProviders, "oauth", "oauth", getProviderStats),
    ...buildProviderEntries(freeProviders, "oauth", "free", getProviderStats),
  ];
}

export function buildStaticProviderEntries(
  category: StaticProviderCatalogCategory,
  getProviderStats: GetProviderStats
): ProviderEntry<ProviderCatalogMetadata>[] {
  const group = getStaticProviderCatalogGroup(category);
  return buildProviderEntries(
    group.providers,
    group.displayAuthType,
    group.toggleAuthType,
    getProviderStats
  );
}

export function filterConfiguredProviderEntries<TProvider>(
  entries: ProviderEntry<TProvider>[],
  showConfiguredOnly: boolean
): ProviderEntry<TProvider>[] {
  if (!showConfiguredOnly) return entries;

  return entries.filter((entry) => Number(entry.stats?.total || 0) > 0);
}

export function resolveDashboardProviderInfo(
  providerId: string,
  options?: {
    providerNode?: CompatibleProviderNodeLike | null;
    compatibleLabels?: CompatibleProviderLabels | null;
  }
): ResolvedProviderCatalogEntry | null {
  return resolveProviderCatalogEntry(providerId, options);
}
