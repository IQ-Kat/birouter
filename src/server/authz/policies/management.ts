import { timingSafeEqual } from "node:crypto";
import { isModelSyncInternalRequest } from "../../../shared/services/modelSyncScheduler";
import { isAuthRequired, isDashboardSessionAuthenticated } from "../../../shared/utils/apiAuth";
import { getMachineTokenSync } from "../../../lib/machineToken";
import type { AuthOutcome, PolicyContext, RoutePolicy } from "../context";
import { allow, reject } from "../context";
import { CLI_TOKEN_HEADER } from "../headers";
import { isAlwaysProtectedPath, isLocalOnlyPath, isLoopbackHost } from "../routeGuard";

const MODEL_SYNC_MANAGEMENT_PATH = /^\/api\/providers\/[^/]+\/(sync-models|models)$/;

function isLoopbackRequest(headers: Headers): boolean {
  return isLoopbackHost(headers.get("host"));
}

function hasValidCliToken(headers: Headers): boolean {
  if (!isLoopbackRequest(headers)) return false;
  const provided = headers.get(CLI_TOKEN_HEADER);
  if (!provided) return false;
  const expected = getMachineTokenSync();
  if (expected === "" || provided.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
}

function hasBearerToken(headers: Headers): boolean {
  const authHeader = headers.get("authorization") ?? headers.get("Authorization");
  return typeof authHeader === "string" && authHeader.trim().toLowerCase().startsWith("bearer ");
}

function isInternalModelSyncRequest(ctx: PolicyContext): boolean {
  if (!MODEL_SYNC_MANAGEMENT_PATH.test(ctx.classification.normalizedPath)) return false;
  return isModelSyncInternalRequest(ctx.request);
}

export const managementPolicy: RoutePolicy = {
  routeClass: "MANAGEMENT",
  async evaluate(ctx: PolicyContext): Promise<AuthOutcome> {
    const path = ctx.classification.normalizedPath;

    // Tier 1: local-only gate — block spawn-capable routes from non-loopback.
    if (isLocalOnlyPath(path)) {
      if (!isLoopbackRequest(ctx.request.headers)) {
        return reject(403, "LOCAL_ONLY", "This endpoint requires localhost access");
      }
    }

    if (isInternalModelSyncRequest(ctx)) {
      return allow({ kind: "management_key", id: "model-sync", label: "internal-model-sync" });
    }

    if (hasValidCliToken(ctx.request.headers)) {
      return allow({ kind: "management_key", id: "cli", label: "local-cli-token" });
    }

    // Tier 2: always-protected routes skip the requireLogin=false bypass.
    if (!isAlwaysProtectedPath(path) && !(await isAuthRequired(ctx.request))) {
      return allow({ kind: "anonymous", id: "anonymous", label: "auth-disabled" });
    }

    if (await isDashboardSessionAuthenticated(ctx.request)) {
      return allow({ kind: "dashboard_session", id: "dashboard" });
    }

    const bearerPresent = hasBearerToken(ctx.request.headers);
    return reject(
      bearerPresent ? 403 : 401,
      "AUTH_001",
      bearerPresent ? "Invalid management token" : "Authentication required"
    );
  },
};
