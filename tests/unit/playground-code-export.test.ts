import test from "node:test";
import assert from "node:assert/strict";

const { exportCode, exportAllLanguages, endpointToPath, API_KEY_PLACEHOLDER } = await import(
  "../../src/lib/playground/codeExport.ts"
);

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Assert security invariants on every generated snippet. */
function assertSecurityInvariants(generated: string, label: string) {
  assert.ok(generated.includes(API_KEY_PLACEHOLDER), `${label}: must include $OMNIROUTE_API_KEY`);
  assert.ok(generated.length > 0, `${label}: must not be empty`);
  assert.doesNotMatch(
    generated,
    /sk-[A-Za-z0-9_\-]{16,}/,
    `${label}: must not contain real API keys`,
  );
  assert.doesNotMatch(
    generated,
    /Bearer\s+[A-Za-z0-9_\-]{20,}\s/,
    `${label}: must not contain real Bearer tokens`,
  );
}

// ── endpointToPath ─────────────────────────────────────────────────────────────

test("endpointToPath: maps all 10 endpoints correctly", () => {
  assert.equal(endpointToPath("chat.completions"), "/v1/chat/completions");
  assert.equal(endpointToPath("completions"), "/v1/completions");
  assert.equal(endpointToPath("embeddings"), "/v1/embeddings");
  assert.equal(endpointToPath("images"), "/v1/images/generations");
  assert.equal(endpointToPath("audio.transcriptions"), "/v1/audio/transcriptions");
  assert.equal(endpointToPath("audio.speech"), "/v1/audio/speech");
  assert.equal(endpointToPath("moderations"), "/v1/moderations");
  assert.equal(endpointToPath("rerank"), "/v1/rerank");
  assert.equal(endpointToPath("search"), "/v1/search");
  assert.equal(endpointToPath("web.fetch"), "/v1/web/fetch");
});

// ── API_KEY_PLACEHOLDER ───────────────────────────────────────────────────────

test("API_KEY_PLACEHOLDER is $OMNIROUTE_API_KEY", () => {
  assert.equal(API_KEY_PLACEHOLDER, "$OMNIROUTE_API_KEY");
});

// ── Table-driven tests for chat.completions ────────────────────────────────────

const baseState = {
  endpoint: "chat.completions" as const,
  baseUrl: "http://localhost:20128",
  model: "gpt-4o-mini",
  stream: false,
};

test("chat.completions × curl: contains required elements", () => {
  const generated = exportCode(baseState, "curl");
  assertSecurityInvariants(generated, "chat.completions/curl");
  assert.ok(generated.includes("/v1/chat/completions"), "path present");
  assert.ok(generated.includes("Authorization: Bearer"), "auth header present");
  assert.ok(generated.includes("gpt-4o-mini"), "model present");
});

test("chat.completions × python: contains required elements", () => {
  const generated = exportCode(baseState, "python");
  assertSecurityInvariants(generated, "chat.completions/python");
  assert.ok(generated.includes("import requests"), "imports requests");
  assert.ok(generated.includes('os.environ["OMNIROUTE_API_KEY"]'), "uses os.environ");
  assert.ok(generated.includes("gpt-4o-mini"), "model present");
});

test("chat.completions × typescript: contains required elements", () => {
  const generated = exportCode(baseState, "typescript");
  assertSecurityInvariants(generated, "chat.completions/typescript");
  assert.ok(generated.includes("await fetch("), "uses fetch");
  assert.ok(generated.includes("process.env.OMNIROUTE_API_KEY"), "uses process.env");
  assert.ok(generated.includes("gpt-4o-mini"), "model present");
});

// ── chat.completions with systemPrompt ────────────────────────────────────────

test("chat.completions: uses systemPrompt when messages is empty", () => {
  const state = { ...baseState, systemPrompt: "You are helpful.", messages: [] };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assert.ok(generated.includes("You are helpful."), `${lang}: systemPrompt in output`);
  }
});

test("chat.completions: uses messages when provided", () => {
  const state = {
    ...baseState,
    messages: [
      { role: "user" as const, content: "My custom message" },
    ],
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assert.ok(generated.includes("My custom message"), `${lang}: message in output`);
  }
});

// ── completions ────────────────────────────────────────────────────────────────

test("completions × all languages: security + path", () => {
  const state = {
    endpoint: "completions" as const,
    baseUrl: "http://localhost:20128",
    model: "gpt-3.5-turbo-instruct",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `completions/${lang}`);
    assert.ok(generated.includes("/v1/completions"), `${lang}: correct path`);
  }
});

// ── embeddings ─────────────────────────────────────────────────────────────────

test("embeddings × all languages: security + path", () => {
  const state = {
    endpoint: "embeddings" as const,
    baseUrl: "http://localhost:20128",
    model: "text-embedding-3-small",
    prompt: "Hello world",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `embeddings/${lang}`);
    assert.ok(generated.includes("/v1/embeddings"), `${lang}: correct path`);
  }
});

// ── images ─────────────────────────────────────────────────────────────────────

test("images × all languages: security + path", () => {
  const state = {
    endpoint: "images" as const,
    baseUrl: "http://localhost:20128",
    model: "dall-e-3",
    prompt: "A beautiful sunset",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `images/${lang}`);
    assert.ok(generated.includes("/v1/images/generations"), `${lang}: correct path`);
  }
});

// ── search ─────────────────────────────────────────────────────────────────────

test("search × all languages: security + path + query", () => {
  const state = {
    endpoint: "search" as const,
    baseUrl: "http://localhost:20128",
    query: "AI news today",
    searchProvider: "tavily",
    searchType: "web" as const,
    maxResults: 5,
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `search/${lang}`);
    assert.ok(generated.includes("/v1/search"), `${lang}: correct path`);
    assert.ok(generated.includes("AI news today"), `${lang}: query present`);
  }
});

// ── web.fetch ─────────────────────────────────────────────────────────────────

test("web.fetch × all languages: security + path + url", () => {
  const state = {
    endpoint: "web.fetch" as const,
    baseUrl: "http://localhost:20128",
    url: "https://example.com",
    fetchProvider: "firecrawl" as const,
    fetchFormat: "markdown" as const,
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `web.fetch/${lang}`);
    assert.ok(generated.includes("/v1/web/fetch"), `${lang}: correct path`);
    assert.ok(generated.includes("https://example.com"), `${lang}: url present`);
  }
});

// ── rerank ─────────────────────────────────────────────────────────────────────

test("rerank × all languages: security + path + query", () => {
  const state = {
    endpoint: "rerank" as const,
    baseUrl: "http://localhost:20128",
    query: "find relevant docs",
    rerankModel: "rerank-english-v3.0",
    documents: ["Doc 1", "Doc 2"],
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `rerank/${lang}`);
    assert.ok(generated.includes("/v1/rerank"), `${lang}: correct path`);
  }
});

// ── audio.transcriptions ──────────────────────────────────────────────────────

test("audio.transcriptions × all languages: security + path", () => {
  const state = {
    endpoint: "audio.transcriptions" as const,
    baseUrl: "http://localhost:20128",
    model: "whisper-1",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `audio.transcriptions/${lang}`);
    assert.ok(generated.includes("/v1/audio/transcriptions"), `${lang}: correct path`);
  }
});

// ── audio.speech ──────────────────────────────────────────────────────────────

test("audio.speech × all languages: security + path", () => {
  const state = {
    endpoint: "audio.speech" as const,
    baseUrl: "http://localhost:20128",
    model: "tts-1",
    prompt: "Hello world",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `audio.speech/${lang}`);
    assert.ok(generated.includes("/v1/audio/speech"), `${lang}: correct path`);
  }
});

// ── moderations ───────────────────────────────────────────────────────────────

test("moderations × all languages: security + path", () => {
  const state = {
    endpoint: "moderations" as const,
    baseUrl: "http://localhost:20128",
    model: "text-moderation-latest",
    prompt: "Hello world",
  };
  for (const lang of ["curl", "python", "typescript"] as const) {
    const generated = exportCode(state, lang);
    assertSecurityInvariants(generated, `moderations/${lang}`);
    assert.ok(generated.includes("/v1/moderations"), `${lang}: correct path`);
  }
});

// ── exportAllLanguages ─────────────────────────────────────────────────────────

test("exportAllLanguages returns all 3 snippets with valid content", () => {
  const state = { ...baseState, model: "gpt-4o" };
  const result = exportAllLanguages(state);

  assert.ok(typeof result.curl === "string" && result.curl.length > 0, "curl non-empty");
  assert.ok(typeof result.python === "string" && result.python.length > 0, "python non-empty");
  assert.ok(
    typeof result.typescript === "string" && result.typescript.length > 0,
    "typescript non-empty",
  );

  for (const [lang, snippet] of Object.entries(result)) {
    assertSecurityInvariants(snippet, `exportAll/${lang}`);
  }
});

// ── JSON formatting (pretty-printed bodies) ───────────────────────────────────

test("curl: body is present (JSON.stringify used)", () => {
  const state = {
    endpoint: "embeddings" as const,
    baseUrl: "http://localhost:20128",
    model: "text-embedding-3-small",
    prompt: "Test input",
  };
  const generated = exportCode(state, "curl");
  // The body should contain the model name in JSON form
  assert.ok(generated.includes("text-embedding-3-small"), "model in JSON body");
});

test("python: body uses json.loads for JSON parsing", () => {
  const state = {
    endpoint: "embeddings" as const,
    baseUrl: "http://localhost:20128",
    model: "text-embedding-3-small",
    prompt: "Test input",
  };
  const generated = exportCode(state, "python");
  assert.ok(generated.includes("json.loads"), "uses json.loads");
});

test("typescript: body uses JSON object literal", () => {
  const state = {
    endpoint: "embeddings" as const,
    baseUrl: "http://localhost:20128",
    model: "text-embedding-3-small",
    prompt: "Test input",
  };
  const generated = exportCode(state, "typescript");
  assert.ok(generated.includes("const body ="), "uses const body =");
});
