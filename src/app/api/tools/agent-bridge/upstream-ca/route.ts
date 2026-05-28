/**
 * GET  /api/tools/agent-bridge/upstream-ca   — returns current upstream CA path
 * POST /api/tools/agent-bridge/upstream-ca   — validates + persists a new path
 * LOCAL_ONLY: registered in routeGuard.ts
 *
 * Persistence: <dataDir>/mitm/upstream-ca.path  (one-line text file)
 * At runtime, calling configureUpstreamCa() with the stored path activates it.
 */
import { AgentBridgeUpstreamCaPostSchema } from "@/shared/schemas/agentBridge";
import { resolveMitmDataDir } from "@/mitm/dataDir";
import path from "path";
import fs from "fs";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";

const CA_PATH_FILE = path.join(resolveMitmDataDir(), "mitm", "upstream-ca.path");

function readStoredCaPath(): string | null {
  try {
    if (!fs.existsSync(CA_PATH_FILE)) return null;
    const raw = fs.readFileSync(CA_PATH_FILE, "utf8").trim();
    return raw || null;
  } catch {
    return null;
  }
}

function writeStoredCaPath(caPath: string): void {
  const dir = path.dirname(CA_PATH_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CA_PATH_FILE, caPath + "\n");
}

export async function GET(): Promise<Response> {
  try {
    const stored = readStoredCaPath();
    // Prefer env var; file is secondary
    const active = process.env.AGENTBRIDGE_UPSTREAM_CA_CERT || stored || null;
    return Response.json({ path: active });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const parsed = AgentBridgeUpstreamCaPostSchema.safeParse(body);
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid request body",
      details: parsed.error.flatten(),
    });
  }

  const { path: caPath } = parsed.data;

  // Validate the file actually exists (plan 11 §4.7)
  if (!fs.existsSync(caPath)) {
    return createErrorResponse({
      status: 400,
      message: `Upstream CA file not found: ${caPath}`,
    });
  }

  try {
    writeStoredCaPath(caPath);
    return Response.json({ ok: true, path: caPath });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
