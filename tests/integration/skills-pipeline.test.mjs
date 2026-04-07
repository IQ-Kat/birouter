import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "./_chatPipelineHarness.mjs";

const harness = await createChatPipelineHarness("skills-pipeline");
const {
  BaseExecutor,
  buildOpenAIResponse,
  buildOpenAIToolCallResponse,
  buildRequest,
  builtinsModule,
  handleChat,
  resetStorage,
  sandboxModule,
  seedApiKey,
  seedConnection,
  settingsDb,
  skillByIdRouteModule,
  skillExecutor,
  skillRegistry,
  skillsRouteModule,
} = harness;

const { registerBuiltinSkills } = builtinsModule;
const { sandboxRunner } = sandboxModule;

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = harness.originalRetryDelayMs;
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

async function enableSkills() {
  await settingsDb.updateSettings({ skillsEnabled: true });
}

async function registerSkill({
  apiKeyId,
  name,
  version = "1.0.0",
  handler,
  enabled = true,
  description = "Test skill",
}) {
  return skillRegistry.register({
    apiKeyId,
    name,
    version,
    description,
    schema: {
      input: {
        type: "object",
        properties: {
          location: { type: "string" },
          path: { type: "string" },
        },
      },
      output: {
        type: "object",
      },
    },
    handler,
    enabled,
  });
}

test("skills API lists registered skills", async () => {
  const apiKey = await seedApiKey();
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    handler: "weather-handler-list",
  });

  const response = await skillsRouteModule.GET();
  const json = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(json.skills));
  assert.ok(json.skills.some((skill) => skill.name === "lookupWeather"));
});

test("enabling a disabled skill makes it available in the request pipeline", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-skill-enable" });
  const apiKey = await seedApiKey();
  await enableSkills();

  const skill = await registerSkill({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    handler: "weather-handler-enable",
    enabled: false,
  });

  const updateResponse = await skillByIdRouteModule.PUT(
    new Request("http://localhost/api/skills/id", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: true }),
    }),
    { params: Promise.resolve({ id: skill.id }) }
  );

  const fetchBodies = [];
  globalThis.fetch = async (_url, init = {}) => {
    fetchBodies.push(init.body ? JSON.parse(String(init.body)) : null);
    return buildOpenAIResponse("Skill enabled");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "What tools do you have?" }],
      },
    })
  );

  assert.equal(updateResponse.status, 200);
  assert.equal(response.status, 200);
  assert.ok(Array.isArray(fetchBodies[0].tools));
  assert.ok(fetchBodies[0].tools.some((tool) => tool.function.name === "lookupWeather@1.0.0"));
});

test("matching tool calls execute the registered skill and return tool results", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-skill-exec" });
  const apiKey = await seedApiKey();
  await enableSkills();

  skillExecutor.registerHandler("weather-handler-exec", async (input) => ({
    forecast: `Sunny in ${input.location}`,
  }));
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    handler: "weather-handler-exec",
  });

  globalThis.fetch = async () =>
    buildOpenAIToolCallResponse({
      toolName: "lookupWeather@1.0.0",
      argumentsObject: { location: "Recife" },
    });

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Check the weather" }],
      },
    })
  );
  const json = await response.json();

  assert.equal(response.status, 200);
  assert.equal(json.choices[0].finish_reason, "tool_calls");
  assert.equal(json.tool_results[0].tool_call_id, "call_weather");
  assert.equal(JSON.parse(json.tool_results[0].output).forecast, "Sunny in Recife");
});

test("non-matching responses fall through the pipeline normally", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-skill-pass" });
  const apiKey = await seedApiKey();
  await enableSkills();

  skillExecutor.registerHandler("noop-handler", async () => ({ ok: true }));
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "noopSkill",
    handler: "noop-handler",
  });

  globalThis.fetch = async () => buildOpenAIResponse("Normal pipeline response");

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Just answer normally" }],
      },
    })
  );
  const json = await response.json();

  assert.equal(response.status, 200);
  assert.equal(json.choices[0].message.content, "Normal pipeline response");
  assert.equal(json.tool_results, undefined);
});

test("sandbox-backed skill execution can be mocked through the executor", async () => {
  const apiKey = await seedApiKey();
  const originalRun = sandboxRunner.run.bind(sandboxRunner);

  skillExecutor.registerHandler("sandbox-handler", async () => {
    const result = await sandboxRunner.run("alpine", ["echo", "sandbox"], {});
    return { stdout: result.stdout, exitCode: result.exitCode };
  });
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "sandboxedSkill",
    handler: "sandbox-handler",
  });

  sandboxRunner.run = async () => ({
    id: "sandbox-1",
    exitCode: 0,
    stdout: "sandbox ok",
    stderr: "",
    duration: 12,
    killed: false,
  });

  const execution = await skillExecutor.execute(
    "sandboxedSkill@1.0.0",
    { command: "echo sandbox" },
    { apiKeyId: apiKey.id, sessionId: "sandbox-session" }
  );

  sandboxRunner.run = originalRun;

  assert.equal(execution.status, "success");
  assert.equal(execution.output.stdout, "sandbox ok");
  assert.equal(execution.output.exitCode, 0);
});

test("skill execution errors are returned gracefully in tool results", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-skill-error" });
  const apiKey = await seedApiKey();
  await enableSkills();

  skillExecutor.registerHandler("broken-handler", async () => {
    throw new Error("sandbox policy denied execution");
  });
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "brokenSkill",
    handler: "broken-handler",
  });

  globalThis.fetch = async () =>
    buildOpenAIToolCallResponse({
      toolName: "brokenSkill@1.0.0",
      toolCallId: "call_broken",
    });

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Run the protected tool" }],
      },
    })
  );
  const json = await response.json();

  assert.equal(response.status, 200);
  assert.equal(json.tool_results[0].tool_call_id, "call_broken");
  assert.match(JSON.parse(json.tool_results[0].output).error, /sandbox policy denied/);
});

test("disabling a skill removes it from request tool injection", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-skill-disable" });
  const apiKey = await seedApiKey();
  await enableSkills();

  const skill = await registerSkill({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    handler: "weather-handler-disable",
  });

  const updateResponse = await skillByIdRouteModule.PUT(
    new Request("http://localhost/api/skills/id", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: false }),
    }),
    { params: Promise.resolve({ id: skill.id }) }
  );

  const fetchBodies = [];
  globalThis.fetch = async (_url, init = {}) => {
    fetchBodies.push(init.body ? JSON.parse(String(init.body)) : null);
    return buildOpenAIResponse("Skill disabled");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "What tools do you have now?" }],
      },
    })
  );

  assert.equal(updateResponse.status, 200);
  assert.equal(response.status, 200);
  assert.ok(!fetchBodies[0].tools || fetchBodies[0].tools.length === 0);
});

test("builtin and custom skills coexist in the injected tool list", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-skill-builtin" });
  const apiKey = await seedApiKey();
  await enableSkills();

  registerBuiltinSkills(skillExecutor);
  skillExecutor.registerHandler("custom-weather-handler", async () => ({
    forecast: "Cloudy",
  }));

  await registerSkill({
    apiKeyId: apiKey.id,
    name: "webSearch",
    handler: "web_search",
  });
  await registerSkill({
    apiKeyId: apiKey.id,
    name: "lookupWeather",
    handler: "custom-weather-handler",
  });

  const fetchBodies = [];
  globalThis.fetch = async (_url, init = {}) => {
    fetchBodies.push(init.body ? JSON.parse(String(init.body)) : null);
    return buildOpenAIResponse("Both skills available");
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "List my tools" }],
      },
    })
  );

  const toolNames = (fetchBodies[0].tools || []).map((tool) => tool.function.name).sort();

  assert.equal(response.status, 200);
  assert.deepEqual(toolNames, ["lookupWeather@1.0.0", "webSearch@1.0.0"]);
});
