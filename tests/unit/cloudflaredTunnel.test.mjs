import test from "node:test";
import assert from "node:assert/strict";

import {
  buildCloudflaredChildEnv,
  extractTryCloudflareUrl,
  getCloudflaredAssetSpec,
} from "../../src/lib/cloudflaredTunnel.ts";

test("extractTryCloudflareUrl parses trycloudflare URL from log output", () => {
  const url = extractTryCloudflareUrl(
    "INF +------------------------------------------------------------+\nINF |  https://violet-sky-1234.trycloudflare.com                   |\nINF +------------------------------------------------------------+"
  );

  assert.equal(url, "https://violet-sky-1234.trycloudflare.com");
});

test("extractTryCloudflareUrl returns null when no tunnel URL is present", () => {
  assert.equal(extractTryCloudflareUrl("cloudflared starting without assigned URL"), null);
});

test("getCloudflaredAssetSpec resolves linux amd64 binary", () => {
  const spec = getCloudflaredAssetSpec("linux", "x64");

  assert.deepEqual(spec, {
    assetName: "cloudflared-linux-amd64",
    binaryName: "cloudflared",
    archive: "none",
    downloadUrl:
      "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64",
  });
});

test("getCloudflaredAssetSpec resolves darwin arm64 archive", () => {
  const spec = getCloudflaredAssetSpec("darwin", "arm64");

  assert.deepEqual(spec, {
    assetName: "cloudflared-darwin-arm64.tgz",
    binaryName: "cloudflared",
    archive: "tgz",
    downloadUrl:
      "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-arm64.tgz",
  });
});

test("getCloudflaredAssetSpec returns null for unsupported platforms", () => {
  assert.equal(getCloudflaredAssetSpec("freebsd", "x64"), null);
});

test("buildCloudflaredChildEnv keeps runtime essentials but drops secrets", () => {
  const env = buildCloudflaredChildEnv({
    PATH: "/usr/bin",
    HOME: "/tmp/home",
    HTTPS_PROXY: "http://proxy.internal:8080",
    JWT_SECRET: "top-secret",
    API_KEY_SECRET: "another-secret",
  });

  assert.deepEqual(env, {
    PATH: "/usr/bin",
    HOME: "/tmp/home",
    HTTPS_PROXY: "http://proxy.internal:8080",
  });
});
