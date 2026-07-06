export const PROVIDER_PLUGIN_MANIFEST_HEADER = "X-Birouter-Provider-Manifest-Url";
export const PROVIDER_PLUGIN_MANIFEST_PATH = "/api/v1/provider-plugin-manifest";

function trimTrailingSlash(value: string): string {
  return value.replace(/\/$/, "");
}

export function resolveProviderPluginManifestUrl(origin?: string | null): string {
  const configured = process.env.BIROUTER_PROVIDER_MANIFEST_URL?.trim();
  if (configured) return configured;

  if (origin) {
    return `${trimTrailingSlash(origin)}${PROVIDER_PLUGIN_MANIFEST_PATH}`;
  }

  const host = process.env.HOST || "127.0.0.1";
  const port = process.env.PORT || process.env.DASHBOARD_PORT || process.env.API_PORT || "20128";
  const protocol = process.env.BIROUTER_PUBLIC_PROTOCOL || "http";
  return `${protocol}://${host}:${port}${PROVIDER_PLUGIN_MANIFEST_PATH}`;
}

export function getProviderPluginManifestHeader(origin?: string | null): Record<string, string> {
  return {
    [PROVIDER_PLUGIN_MANIFEST_HEADER]: resolveProviderPluginManifestUrl(origin),
  };
}
