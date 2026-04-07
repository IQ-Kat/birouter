import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-registry-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");

function resetRegistryState() {
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
}

async function resetStorage() {
  resetRegistryState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  resetRegistryState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("skillRegistry registers, lists, sorts and resolves versions", async () => {
  await skillRegistry.register({
    name: "echo",
    version: "1.0.0",
    description: "stable",
    schema: { input: { text: "string" }, output: { result: "string" } },
    handler: "echo-handler",
    apiKeyId: "key-a",
  });
  const latest = await skillRegistry.register({
    name: "echo",
    version: "1.2.0",
    description: "latest",
    schema: { input: { text: "string" }, output: { result: "string" } },
    handler: "echo-handler",
    apiKeyId: "key-a",
  });
  await skillRegistry.register({
    name: "summarize",
    description: "defaults version",
    schema: { input: {}, output: {} },
    handler: "summarize-handler",
    apiKeyId: "key-b",
  });

  assert.equal(skillRegistry.list("key-a").length, 2);
  assert.equal(skillRegistry.list().length, 3);
  assert.equal(skillRegistry.getSkill("echo@1.2.0").description, "latest");

  const versions = skillRegistry.getSkillVersions("echo").map((skill) => skill.version);
  assert.deepEqual(versions, ["1.2.0", "1.0.0"]);
  assert.equal(skillRegistry.resolveVersion("echo", "^1.1.0")?.id, latest.id);
  assert.equal(skillRegistry.resolveVersion("echo", "~1.0.0")?.version, "1.0.0");
  assert.equal(skillRegistry.resolveVersion("echo", "1.2.0")?.version, "1.2.0");
  assert.equal(skillRegistry.resolveVersion("missing", "^1.0.0"), undefined);
});

test("skillRegistry can reload persisted skills from SQLite", async () => {
  const first = await skillRegistry.register({
    name: "file-read",
    version: "2.0.0",
    description: "reads files",
    schema: { input: { path: "string" }, output: { content: "string" } },
    handler: "file-read-handler",
    apiKeyId: "key-a",
  });
  const second = await skillRegistry.register({
    name: "file-write",
    version: "1.0.0",
    description: "writes files",
    schema: { input: { path: "string", content: "string" }, output: { ok: true } },
    handler: "file-write-handler",
    apiKeyId: "key-b",
  });

  resetRegistryState();
  assert.equal(skillRegistry.list().length, 0);

  await skillRegistry.loadFromDatabase("key-a");
  assert.deepEqual(
    skillRegistry.list().map((skill) => skill.name),
    ["file-read"]
  );

  resetRegistryState();
  await skillRegistry.loadFromDatabase();
  const loadedNames = skillRegistry
    .list()
    .map((skill) => skill.name)
    .sort();

  assert.deepEqual(loadedNames, ["file-read", "file-write"]);
  assert.equal(skillRegistry.getSkill(`${first.name}@${first.version}`)?.apiKeyId, "key-a");
  assert.equal(skillRegistry.getSkill(`${second.name}@${second.version}`)?.apiKeyId, "key-b");
});

test("skillRegistry unregisters by version, by name/apiKey and by id", async () => {
  const exact = await skillRegistry.register({
    name: "translate",
    version: "1.0.0",
    description: "translate en to pt",
    schema: { input: { text: "string" }, output: { text: "string" } },
    handler: "translate-handler",
    apiKeyId: "key-a",
  });
  await skillRegistry.register({
    name: "translate",
    version: "1.1.0",
    description: "translate v2",
    schema: { input: { text: "string" }, output: { text: "string" } },
    handler: "translate-handler",
    apiKeyId: "key-a",
  });
  const otherKey = await skillRegistry.register({
    name: "translate",
    version: "2.0.0",
    description: "translate external",
    schema: { input: { text: "string" }, output: { text: "string" } },
    handler: "translate-handler",
    apiKeyId: "key-b",
  });

  assert.equal(await skillRegistry.unregister("translate", "1.0.0", "key-a"), true);
  assert.equal(skillRegistry.getSkill("translate@1.0.0"), undefined);
  assert.equal(await skillRegistry.unregister("translate", undefined, "key-a"), true);
  assert.deepEqual(
    skillRegistry.list().map((skill) => skill.id),
    [otherKey.id]
  );
  assert.equal(await skillRegistry.unregisterById(otherKey.id), true);
  assert.equal(await skillRegistry.unregisterById(exact.id), false);
  assert.equal(await skillRegistry.unregister("translate", undefined, "key-a"), false);
});

test("skillRegistry rejects invalid payloads from schema validation", async () => {
  await assert.rejects(
    skillRegistry.register({
      name: "bad-skill",
      version: "not-semver",
      description: "invalid version",
      schema: { input: {}, output: {} },
      handler: "bad-handler",
      apiKeyId: "key-a",
    }),
    /Invalid string/
  );

  await assert.rejects(
    skillRegistry.register({
      name: "",
      version: "1.0.0",
      description: "missing name",
      schema: { input: {}, output: {} },
      handler: "bad-handler",
      apiKeyId: "key-a",
    }),
    /Too small/
  );
});
