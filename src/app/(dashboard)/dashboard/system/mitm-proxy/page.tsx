import { redirect } from "next/navigation";

/**
 * MITM Proxy page — moved to AgentBridge (plan 11).
 * Redirects to the new location at /dashboard/tools/agent-bridge.
 */
export default function MitmProxyPage() {
  redirect("/dashboard/tools/agent-bridge");
}
