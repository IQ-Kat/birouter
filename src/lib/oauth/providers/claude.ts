import { CLAUDE_CONFIG } from "../constants/oauth";

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function firstNonEmptyString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value !== "string") {
      continue;
    }

    const trimmed = value.trim();
    if (trimmed) {
      return trimmed;
    }
  }

  return undefined;
}

function extractPlanFromPayload(payload: unknown): string | undefined {
  const data = toRecord(payload);
  const billing = toRecord(data.billing);

  return firstNonEmptyString(data.account_tier, data.plan, data.subscription_type, billing.plan);
}

function extractClaudePlan(tokens: unknown, extra: unknown): string | undefined {
  const extraData = toRecord(extra);

  return firstNonEmptyString(
    extractPlanFromPayload(tokens),
    extractPlanFromPayload(extraData.userInfo),
    extractPlanFromPayload(extra)
  );
}

export const claude = {
  config: CLAUDE_CONFIG,
  flowType: "authorization_code_pkce",
  buildAuthUrl: (config, _redirectUri, state, codeChallenge) => {
    const params = new URLSearchParams({
      code: "true",
      client_id: config.clientId,
      response_type: "code",
      redirect_uri: config.redirectUri,
      scope: config.scopes.join(" "),
      code_challenge: codeChallenge,
      code_challenge_method: config.codeChallengeMethod,
      state: state,
    });
    return `${config.authorizeUrl}?${params.toString()}`;
  },
  exchangeToken: async (config, code, _redirectUri, codeVerifier, state) => {
    let authCode = code;
    let codeState = "";
    if (authCode.includes("#")) {
      const parts = authCode.split("#");
      authCode = parts[0];
      codeState = parts[1] || "";
    }

    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        code: authCode,
        state: codeState || state,
        grant_type: "authorization_code",
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token exchange failed: ${error}`);
    }

    return await response.json();
  },
  mapTokens: (tokens, extra) => {
    const plan = extractClaudePlan(tokens, extra);

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn: tokens.expires_in,
      scope: tokens.scope,
      providerSpecificData: plan ? { plan } : undefined,
    };
  },
};
