import { isAuthRequired } from "@/shared/utils/apiAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

/**
 * Checks if the request is authenticated strictly via a Dashboard Session (JWT Cookie).
 * Standard Bearer API keys are rejected for management routes to prevent privilege escalation.
 */
async function isDashboardSessionAuthenticated(): Promise<boolean> {
  if (process.env.JWT_SECRET) {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("auth_token")?.value;
      if (token) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);
        return true;
      }
    } catch {
      // Invalid/expired token
    }
  }
  return false;
}

export async function requireManagementAuth(request: Request): Promise<Response | null> {
  if (!(await isAuthRequired())) {
    return null;
  }

  if (await isDashboardSessionAuthenticated()) {
    return null;
  }

  const authHeader = request.headers.get("authorization");
  const hasBearerToken =
    typeof authHeader === "string" && authHeader.trim().toLowerCase().startsWith("bearer ");

  return createErrorResponse({
    status: hasBearerToken ? 403 : 401,
    message: hasBearerToken ? "Invalid management token" : "Authentication required",
    type: "invalid_request",
  });
}
