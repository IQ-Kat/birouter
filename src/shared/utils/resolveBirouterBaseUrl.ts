const DEFAULT_BIROUTER_BASE_URL = "http://localhost:2004";

type BirouterBaseUrlEnv = {
  BIROUTER_BASE_URL?: string;
  BASE_URL?: string;
  NEXT_PUBLIC_BASE_URL?: string;
};

function normalizeBaseUrl(value?: string): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.replace(/\/+$/, "");
}

export function resolveBirouterBaseUrl(env: BirouterBaseUrlEnv = process.env): string {
  return (
    normalizeBaseUrl(env.BIROUTER_BASE_URL) ||
    normalizeBaseUrl(env.BASE_URL) ||
    normalizeBaseUrl(env.NEXT_PUBLIC_BASE_URL) ||
    DEFAULT_BIROUTER_BASE_URL
  );
}

export { DEFAULT_BIROUTER_BASE_URL };
