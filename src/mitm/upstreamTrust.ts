/**
 * Upstream CA certificate configuration for corporate network environments.
 * Configures undici's global dispatcher to trust a custom CA when connecting
 * to upstream providers through a corporate MITM proxy.
 *
 * Source: plano 11 §4.7 (origin: llm-interceptor --upstream-ca-cert)
 * Hard Rule #12: error message is a safe literal — no stack trace exposed.
 */
import { Agent, setGlobalDispatcher } from "undici";
import { readFileSync, existsSync } from "node:fs";

/**
 * Configure undici's global dispatcher to trust a custom CA certificate.
 *
 * @param pemPath - Absolute path to the PEM file. If undefined/empty, no-op.
 * @throws {Error} With a safe error message (no stack trace) if pemPath is set
 *   but the file does not exist.
 */
export function configureUpstreamCa(pemPath?: string): void {
  if (!pemPath) return;

  if (!existsSync(pemPath)) {
    // Safe error: message only contains the user-supplied path (no stack trace).
    throw new Error(
      `AGENTBRIDGE_UPSTREAM_CA_CERT path does not exist: ${pemPath}`,
    );
  }

  const ca = readFileSync(pemPath, "utf8");
  setGlobalDispatcher(new Agent({ connect: { ca } }));
}
