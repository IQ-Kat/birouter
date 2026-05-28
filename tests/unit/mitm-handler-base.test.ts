import test from "node:test";
import assert from "node:assert/strict";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { AgentId } from "../../src/mitm/types.ts";
import { MitmHandlerBase } from "../../src/mitm/handlers/base.ts";

// Concrete subclass exposing the protected helpers for testing.
class TestHandler extends MitmHandlerBase {
  readonly agentId: AgentId = "antigravity";

  async intercept(): Promise<void> {
    // Not exercised in this suite.
  }

  publicExtract(buf: Buffer): string | null {
    return this.extractSourceModel(buf);
  }

  async publicHookStart(
    req: IncomingMessage,
    body: Buffer,
    mapped: string
  ): Promise<ReturnType<MitmHandlerBase["hookBufferStart"]>> {
    return this.hookBufferStart(req, body, mapped);
  }
}

function fakeReq(headers: Record<string, string> = {}): IncomingMessage {
  return {
    method: "POST",
    url: "/v1/chat/completions",
    headers: {
      host: "api.example.com",
      "user-agent": "ut",
      // 50-char opaque token — long enough to be masked by LONG_TOKEN rule.
      authorization: "Bearer abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKL",
      ...headers,
    },
  } as unknown as IncomingMessage;
}

test("base.extractSourceModel — reads body.model from JSON", () => {
  const h = new TestHandler();
  const buf = Buffer.from(JSON.stringify({ model: "gpt-4o", messages: [] }));
  assert.equal(h.publicExtract(buf), "gpt-4o");
});

test("base.extractSourceModel — non-JSON body returns null", () => {
  const h = new TestHandler();
  assert.equal(h.publicExtract(Buffer.from("not json")), null);
});

test("base.extractSourceModel — missing model field returns null", () => {
  const h = new TestHandler();
  const buf = Buffer.from(JSON.stringify({ messages: [] }));
  assert.equal(h.publicExtract(buf), null);
});

test("base.hookBufferStart — local stub returns InterceptedRequest with sanitized headers", async () => {
  const h = new TestHandler();
  const req = fakeReq();
  const body = Buffer.from(JSON.stringify({ model: "gpt-4o" }));
  const r = await h.publicHookStart(req, body, "claude-3.5-sonnet");

  assert.equal(r.agent, "antigravity");
  assert.equal(r.source, "agent-bridge");
  assert.equal(r.mappedModel, "claude-3.5-sonnet");
  assert.equal(r.sourceModel, "gpt-4o");
  assert.equal(r.host, "api.example.com");
  assert.equal(r.status, "in-flight");
  // sanitizeHeaders should mask the long opaque token in `authorization`.
  const auth = r.requestHeaders["authorization"];
  assert.ok(
    !auth ||
      (typeof auth === "string" &&
        !auth.includes("abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKL")),
    `sanitizeHeaders failed to mask authorization: ${JSON.stringify(auth)}`
  );
});

test("base.hookBufferStart — body is captured (default shouldCaptureBody=true)", async () => {
  const h = new TestHandler();
  const req = fakeReq();
  const body = Buffer.from(JSON.stringify({ model: "gpt-4o" }));
  const r = await h.publicHookStart(req, body, "x");
  assert.equal(r.requestSize, body.length);
  assert.ok(typeof r.requestBody === "string");
});

test("base.writeError — writes sanitized JSON error body", async () => {
  const h = new TestHandler();
  let status = 0;
  let payload = "";
  const res = {
    headersSent: false,
    writeHead(s: number) {
      status = s;
    },
    end(p: string) {
      payload = p;
    },
  } as unknown as ServerResponse;

  // Calling a protected method through `any` to avoid leaking it on
  // the production surface area.
  await (h as unknown as { writeError: MitmHandlerBase["writeError"] }).writeError(
    res,
    new Error("boom"),
    502
  );
  assert.equal(status, 502);
  const obj = JSON.parse(payload);
  assert.equal(obj.error.type, "mitm_error");
  assert.ok(typeof obj.error.message === "string");
});
