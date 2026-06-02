// Build-time stub for @/mitm/manager
// Used by Turbopack during next build to avoid native module resolution errors.
// Dynamic import() in route handlers should load the REAL manager at runtime.
// If this stub is reached at runtime, the build alias is incorrectly applied.

const STUB_ERROR =
  "MITM manager stub reached at runtime — build alias applied incorrectly. " +
  "Use --webpack for production builds or verify Turbopack is not aliasing at runtime.";

export const getCachedPassword = () => null;
export const setCachedPassword = (_pwd: string) => {};
export const clearCachedPassword = () => {};
export const getMitmStatus = async () => {
  throw new Error(STUB_ERROR);
};
// Statically imported by /api/tools/agent-bridge/state, so the stub MUST export it or
// the Turbopack build fails ("Export getAllAgentsStatus doesn't exist"). Unlike the
// heavy ops above (dynamic-import paths that should never hit the stub at runtime), a
// static import IS baked into the bundled build, so this is legitimately reached at
// runtime there — it returns the truthful "no agents" state (an empty list) instead of
// throwing. MITM/agent bridge needs host-level access and is otherwise non-functional
// in a bundled/container build. See issue #3066.
export const getAllAgentsStatus = (): never[] => [];
export const startMitm = async (
  _apiKey: string,
  _sudoPassword: string,
  _options: { port?: number } = {}
): Promise<never> => {
  throw new Error(STUB_ERROR);
};
export const stopMitm = async (_sudoPassword: string): Promise<never> => {
  throw new Error(STUB_ERROR);
};
