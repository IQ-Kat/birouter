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
// Statically imported by /api/tools/agent-bridge/state — the stub must export it or
// the Turbopack build fails ("Export getAllAgentsStatus doesn't exist"). MITM/agent
// bridge needs host-level access and is non-functional in the bundled build anyway,
// so this throws like the other heavy ops. See issue #3066.
export const getAllAgentsStatus = (): never => {
  throw new Error(STUB_ERROR);
};
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
