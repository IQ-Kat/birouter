/**
 * Detailed Request Logs DB Layer (#378)
 *
 * Saves full request/response bodies at each pipeline stage.
 * Ring-buffer of 500 entries enforced by SQL trigger in migration 006.
 * Only active when settings.detailed_logs_enabled = "1".
 */
import { v4 as uuidv4 } from "uuid";
import { getDbInstance } from "./core";
import { getSettings } from "./settings";

export interface RequestDetailLog {
  id?: string;
  call_log_id?: string | null;
  timestamp?: string;
  client_request?: string | null;
  translated_request?: string | null;
  provider_response?: string | null;
  client_response?: string | null;
  provider?: string | null;
  model?: string | null;
  source_format?: string | null;
  target_format?: string | null;
  duration_ms?: number;
}

/** Returns true if detailed logging is enabled in settings */
export async function isDetailedLoggingEnabled(): Promise<boolean> {
  try {
    const settings = await getSettings();
    const val = settings.detailed_logs_enabled;
    return val === true || val === "1" || val === "true";
  } catch {
    return false;
  }
}

/** Save a detailed log entry — caller must verify isDetailedLoggingEnabled() first */
export function saveRequestDetailLog(entry: RequestDetailLog): void {
  const db = getDbInstance();
  const id = entry.id ?? uuidv4();
  const timestamp = entry.timestamp ?? new Date().toISOString();

  // Trim large bodies to avoid excessive disk usage (max 64KB each)
  const trim = (s: string | null | undefined, max = 65536): string | null => {
    if (!s) return null;
    return s.length > max ? s.slice(0, max) + "…[truncated]" : s;
  };

  db.prepare(
    `
    INSERT INTO request_detail_logs
      (id, call_log_id, timestamp, client_request, translated_request,
       provider_response, client_response, provider, model, source_format, target_format, duration_ms)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    id,
    entry.call_log_id ?? null,
    timestamp,
    trim(entry.client_request),
    trim(entry.translated_request),
    trim(entry.provider_response),
    trim(entry.client_response),
    entry.provider ?? null,
    entry.model ?? null,
    entry.source_format ?? null,
    entry.target_format ?? null,
    entry.duration_ms ?? 0
  );
}

/** Fetch detailed logs (latest first) */
export function getRequestDetailLogs(limit = 50, offset = 0): RequestDetailLog[] {
  const db = getDbInstance();
  return db
    .prepare(
      `
      SELECT * FROM request_detail_logs
      ORDER BY timestamp DESC
      LIMIT ? OFFSET ?
    `
    )
    .all(limit, offset) as RequestDetailLog[];
}

/** Get a single detailed log by ID */
export function getRequestDetailLogById(id: string): RequestDetailLog | null {
  const db = getDbInstance();
  return (db.prepare("SELECT * FROM request_detail_logs WHERE id = ?").get(id) ??
    null) as RequestDetailLog | null;
}

/** Get total count of detailed logs */
export function getRequestDetailLogCount(): number {
  const db = getDbInstance();
  const row = db.prepare("SELECT COUNT(*) as cnt FROM request_detail_logs").get() as {
    cnt: number;
  };
  return row?.cnt ?? 0;
}
