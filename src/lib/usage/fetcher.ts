/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { GITHUB_CONFIG, GEMINI_CONFIG, ANTIGRAVITY_CONFIG } from "@/lib/oauth/constants/oauth";

/**
 * Get usage data for a provider connection
 * @param {Object} connection - Provider connection with accessToken
 * @returns {Object} Usage data with quotas
 */
export async function getUsageForProvider(connection) {
  const { provider, accessToken, providerSpecificData } = connection;

  switch (provider) {
    case "github":
      return await getGitHubUsage(accessToken, providerSpecificData);
    case "gemini-cli":
      return await getGeminiUsage(accessToken);
    case "antigravity":
      return await getAntigravityUsage(accessToken);
    case "claude":
      return await getClaudeUsage(accessToken);
    case "codex":
      return await getCodexUsage(accessToken, providerSpecificData);
    case "qwen":
      return await getQwenUsage(accessToken, providerSpecificData);
    case "iflow":
      return await getIflowUsage(accessToken);
    case "kiro":
      return await getKiroUsage(accessToken);
    default:
      return { message: `Usage API not implemented for ${provider}` };
  }
}

/**
 * GitHub Copilot Usage
 */
async function getGitHubUsage(accessToken, providerSpecificData) {
  try {
    // Use copilotToken for copilot_internal API, not GitHub OAuth accessToken
    const copilotToken = providerSpecificData?.copilotToken;
    if (!copilotToken) {
      throw new Error("Copilot token not found. Please refresh token first.");
    }

    const response = await fetch("https://api.github.com/copilot_internal/user", {
      headers: {
        Authorization: `Bearer ${copilotToken}`,
        Accept: "application/json",
        "X-GitHub-Api-Version": GITHUB_CONFIG.apiVersion,
        "User-Agent": GITHUB_CONFIG.userAgent,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`GitHub API error: ${error}`);
    }

    const data = await response.json();

    // Handle different response formats (paid vs free)
    if (data.quota_snapshots) {
      // Paid plan format
      const snapshots = data.quota_snapshots;
      return {
        plan: data.copilot_plan,
        resetDate: data.quota_reset_date,
        quotas: {
          chat: formatGitHubQuotaSnapshot(snapshots.chat),
          completions: formatGitHubQuotaSnapshot(snapshots.completions),
          premium_interactions: formatGitHubQuotaSnapshot(snapshots.premium_interactions),
        },
      };
    } else if (data.monthly_quotas || data.limited_user_quotas) {
      // Free/limited plan format
      const monthlyQuotas = data.monthly_quotas || {};
      const usedQuotas = data.limited_user_quotas || {};

      return {
        plan: data.copilot_plan || data.access_type_sku,
        resetDate: data.limited_user_reset_date,
        quotas: {
          chat: {
            used: usedQuotas.chat || 0,
            total: monthlyQuotas.chat || 0,
            unlimited: false,
          },
          completions: {
            used: usedQuotas.completions || 0,
            total: monthlyQuotas.completions || 0,
            unlimited: false,
          },
        },
      };
    }

    return { message: "GitHub Copilot connected. Unable to parse quota data." };
  } catch (error) {
    throw new Error(`Failed to fetch GitHub usage: ${error.message}`);
  }
}

function formatGitHubQuotaSnapshot(quota) {
  if (!quota) return { used: 0, total: 0, unlimited: true };

  return {
    used: quota.entitlement - quota.remaining,
    total: quota.entitlement,
    remaining: quota.remaining,
    unlimited: quota.unlimited || false,
  };
}

/**
 * Gemini CLI Usage (Google Cloud)
 */
async function getGeminiUsage(accessToken) {
  try {
    // Gemini CLI uses Google Cloud quotas
    // Try to get quota info from Cloud Resource Manager
    const response = await fetch(
      "https://cloudresourcemanager.googleapis.com/v1/projects?filter=lifecycleState:ACTIVE",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      // Quota API may not be accessible, return generic message
      return {
        message: "Gemini CLI uses Google Cloud quotas. Check Google Cloud Console for details.",
      };
    }

    return { message: "Gemini CLI connected. Usage tracked via Google Cloud Console." };
  } catch (error) {
    return { message: "Unable to fetch Gemini usage. Check Google Cloud Console." };
  }
}

/**
 * Antigravity Usage
 */
async function getAntigravityUsage(accessToken) {
  try {
    // Similar to Gemini, uses Google Cloud
    return { message: "Antigravity connected. Usage tracked via Google Cloud Console." };
  } catch (error) {
    return { message: "Unable to fetch Antigravity usage." };
  }
}

/**
 * Claude Usage (legacy fallback)
 * Real Claude OAuth quota windows are fetched in @omniroute/open-sse/services/usage.ts.
 */
async function getClaudeUsage() {
  try {
    return {
      message:
        "Claude connected. Detailed quota windows are handled by the open-sse usage service.",
    };
  } catch (error) {
    return { message: "Unable to fetch Claude usage." };
  }
}

/**
 * Codex (OpenAI) Usage
 * Note: Actual quota tracking is handled by open-sse/services/usage.ts
 * This fallback returns a message directing users to the dashboard.
 */
async function getCodexUsage(accessToken, providerSpecificData: Record<string, any> = {}) {
  try {
    // Check if workspace is bound
    const workspaceId = providerSpecificData?.workspaceId;
    if (workspaceId) {
      return {
        message: `Codex connected (workspace: ${workspaceId.slice(0, 8)}...). Check dashboard for quota.`,
      };
    }
    return { message: "Codex connected. Check OpenAI dashboard for usage." };
  } catch (error) {
    return { message: "Unable to fetch Codex usage." };
  }
}

/**
 * Qwen Usage
 */
async function getQwenUsage(accessToken, providerSpecificData) {
  try {
    const resourceUrl = providerSpecificData?.resourceUrl;
    if (!resourceUrl) {
      return { message: "Qwen connected. No resource URL available." };
    }

    // Qwen may have usage endpoint at resource URL
    return { message: "Qwen connected. Usage tracked per request." };
  } catch (error) {
    return { message: "Unable to fetch Qwen usage." };
  }
}

/**
 * iFlow Usage
 */
async function getIflowUsage(accessToken) {
  try {
    // iFlow may have usage endpoint
    return { message: "iFlow connected. Usage tracked per request." };
  } catch (error) {
    return { message: "Unable to fetch iFlow usage." };
  }
}

/**
 * Kiro Credits
 * Fetches credit balance from Kiro's AWS CodeWhisperer backend.
 * The endpoint mirrors what Kiro IDE uses internally for the credit badge.
 */
async function getKiroUsage(accessToken: string) {
  try {
    const response = await fetch("https://codewhisperer.us-east-1.amazonaws.com/getUserCredits", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "User-Agent": "AWS-SDK-JS/3.0.0 kiro-ide/1.0.0",
        "X-Amz-User-Agent": "aws-sdk-js/3.0.0 kiro-ide/1.0.0",
      },
    });

    if (!response.ok) {
      const errText = await response.text();
      // 401/403 = expired token, show user-friendly message
      if (response.status === 401 || response.status === 403) {
        return { message: "Kiro token expired. Please reconnect in Dashboard → Providers → Kiro." };
      }
      throw new Error(`Kiro credits API error (${response.status}): ${errText}`);
    }

    const data = await response.json();

    // Response shape: { remainingCredits, totalCredits, resetDate, subscriptionType }
    const remaining = data.remainingCredits ?? data.remaining_credits ?? null;
    const total = data.totalCredits ?? data.total_credits ?? null;
    const resetDate = data.resetDate ?? data.reset_date ?? null;
    const plan = data.subscriptionType ?? data.subscription_type ?? "unknown";

    if (remaining === null) {
      return { message: "Kiro connected. Credit data unavailable — check Kiro IDE for balance." };
    }

    return {
      plan,
      credits: {
        remaining,
        total: total ?? remaining,
        used: total != null ? total - remaining : 0,
        unlimited: total === null || total === 0,
        resetDate,
      },
    };
  } catch (error: any) {
    return { message: `Unable to fetch Kiro credits: ${error.message}` };
  }
}
