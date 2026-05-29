import { WINDSURF_CONFIG } from "../constants/oauth";

/**
 * Windsurf / Devin CLI OAuth Provider — import-token only (Phase 1 hotfix, 2026-05-29).
 *
 * The previous PKCE Authorization Code flow targeting `https://app.devin.ai/editor/signin`
 * stopped working post-rebrand: that endpoint now returns 404. Until Phase 2 ports the
 * Firebase OAuth + RegisterUser flow (see docs/superpowers/specs/2026-05-29-windsurf-login-fix-design.md),
 * the only supported login path is import-token:
 *
 *   1. User opens https://windsurf.com/show-auth-token in a browser
 *   2. Copies the displayed Windsurf API key (`sk-ws-...` style)
 *   3. Pastes it into OmniRoute via /api/oauth/windsurf/import-token
 *
 * The pasted token is stored as `accessToken` and used directly by `WindsurfExecutor`
 * (open-sse/executors/windsurf.ts) as the `Authorization: Bearer ...` header against
 * the inference server (`server.self-serve.windsurf.com`).
 */
export const windsurf = {
  config: WINDSURF_CONFIG,
  flowType: "import_token" as const,

  /**
   * Validate a pasted Windsurf API key. Accepts the `sk-ws-...` format issued by
   * windsurf.com/show-auth-token and the legacy raw-token format. Empty or
   * whitespace-only tokens are rejected.
   */
  validateImportToken(token: string): { valid: boolean; reason?: string } {
    const trimmed = (token ?? "").trim();
    if (!trimmed) {
      return { valid: false, reason: "Token is empty" };
    }
    if (trimmed.length < 16) {
      return { valid: false, reason: "Token is too short" };
    }
    return { valid: true };
  },

  /**
   * Map a pasted import token onto the connection record. The token IS the
   * Windsurf API key; there is no exchange step.
   */
  mapTokens(token: string) {
    return {
      accessToken: token,
      refreshToken: null,
      expiresAt: null,
    };
  },
};
