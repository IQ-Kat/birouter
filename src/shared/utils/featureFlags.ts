export function isCcCompatibleProviderEnabled() {
  return process.env.NEXT_PUBLIC_ENABLE_CC_COMPATIBLE_PROVIDER === "true";
}

export const CC_COMPATIBLE_PROVIDER_ENABLED = isCcCompatibleProviderEnabled();
