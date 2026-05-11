import { WINDSURF_CONFIG } from "../constants/oauth";

/**
 * Windsurf (Devin CLI / Codeium) OAuth Provider
 *
 * Supports two authentication methods:
 *
 * 1. **Token Import** (recommended, "link" integration):
 *    User visits windsurf.com/show-auth-token after signing into Windsurf,
 *    copies their Codeium API token, and pastes it here. The token is stored
 *    directly as `accessToken` and sent in gRPC request Metadata.api_key.
 *
 * 2. **Device-Code Flow** (via Codeium's gRPC ExtensionServerService):
 *    The executor calls StartDeviceFlow → user visits a verification URL →
 *    poll GetDeviceFlowState until the Firebase ID token is returned. The
 *    Firebase token is then exchanged for a Codeium API key via RegisterUser.
 *    This mirrors how `devin auth login` opens a browser link.
 *
 * Token lifetime:
 *   - Import tokens (Codeium API keys) are long-lived and do not expire.
 *   - Device-code Firebase tokens expire after ~1 hour; the refresh token is
 *     persisted and exchanged against Firebase STS for a new ID token when
 *     the existing one is near expiry.
 */
export const windsurf = {
  config: WINDSURF_CONFIG,
  flowType: "import_token",

  /**
   * Map imported/exchanged token data to OmniRoute connection fields.
   * Called after the user pastes their token or after a device-code exchange.
   */
  mapTokens: (tokens: {
    accessToken?: string;
    apiKey?: string;
    refreshToken?: string;
    expiresIn?: number;
    email?: string;
    authMethod?: string;
    firebaseToken?: string;
  }) => {
    // Accept either `accessToken` (UI import flow) or `apiKey` (device-code result)
    const token = tokens.accessToken || tokens.apiKey || "";
    const isFirebaseToken = tokens.authMethod === "device-code" || Boolean(tokens.firebaseToken);

    return {
      accessToken: token,
      refreshToken: tokens.refreshToken || null,
      expiresIn: tokens.expiresIn || (isFirebaseToken ? 3600 : 0),
      email: tokens.email || null,
      providerSpecificData: {
        authMethod: tokens.authMethod || "import",
        // If the original firebase ID token is separate from the API key, store it too
        firebaseToken: tokens.firebaseToken || null,
      },
    };
  },
};
