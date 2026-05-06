import { BaseExecutor } from "./base.ts";
import { sleep } from "../utils/sleep.ts";

type KieTaskInput = {
  baseUrl: string;
  token: string;
  payload: unknown;
  endpoint?: string;
};

type KiePollInput = {
  statusUrl: string;
  taskId: string;
  token: string;
  timeoutMs: number;
  pollIntervalMs: number;
};

export type KieTaskState = "success" | "failed" | "pending";

export type KieTaskRecord = {
  data: any;
  state: KieTaskState;
};

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/$/, "");
}

export function normalizeKieTaskState(recordData: any): KieTaskState {
  const state = String(
    recordData?.data?.status ??
      recordData?.data?.state ??
      recordData?.data?.successFlag ??
      recordData?.msg ??
      "PENDING"
  ).toUpperCase();

  if (
    state === "SUCCESS" ||
    state === "1" ||
    state === "FINISHED" ||
    state === "COMPLETE" ||
    state === "COMPLETED" ||
    state === "FIRST_SUCCESS" ||
    state === "ALL_SUCCESS" ||
    state.includes("SUCCESS")
  ) {
    return "success";
  }

  if (
    state === "FAIL" ||
    state === "FAILED" ||
    state === "ERROR" ||
    state === "2" ||
    state === "3" ||
    state.includes("FAIL") ||
    state.includes("ERROR") ||
    state === "CREATE_TASK_FAILED" ||
    state === "GENERATE_FAILED"
  ) {
    return "failed";
  }

  return "pending";
}

export class KieExecutor extends BaseExecutor {
  constructor() {
    super("kie", { baseUrl: "https://api.kie.ai" });
  }

  getTaskCreateUrl(baseUrl: string, endpoint = "/api/v1/jobs/createTask"): string {
    return `${normalizeBaseUrl(baseUrl)}${endpoint}`;
  }

  getTaskStatusUrl(baseUrl: string): string {
    return `${normalizeBaseUrl(baseUrl)}/api/v1/jobs/recordInfo`;
  }

  async createTask({ baseUrl, token, payload, endpoint }: KieTaskInput): Promise<any> {
    const res = await fetch(this.getTaskCreateUrl(baseUrl, endpoint), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.text();
      throw Object.assign(new Error(error || `Kie createTask failed with status ${res.status}`), {
        status: res.status,
      });
    }

    return res.json();
  }

  async pollTask({
    statusUrl,
    taskId,
    token,
    timeoutMs,
    pollIntervalMs,
  }: KiePollInput): Promise<KieTaskRecord> {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      const pollUrl = new URL(statusUrl);
      pollUrl.searchParams.set("taskId", String(taskId));

      const res = await fetch(pollUrl.toString(), {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const error = await res.text();
        throw Object.assign(new Error(error || `Kie poll failed with status ${res.status}`), {
          status: res.status,
        });
      }

      const data = await res.json();
      const state = normalizeKieTaskState(data);
      if (state !== "pending") {
        return { data, state };
      }

      await sleep(pollIntervalMs);
    }

    throw Object.assign(new Error("Kie task timed out"), { status: 504 });
  }
}

export const kieExecutor = new KieExecutor();
