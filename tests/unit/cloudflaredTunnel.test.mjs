import test from "node:test";
import assert from "node:assert/strict";

import {
  buildCloudflaredChildEnv,
  extractCloudflaredErrorMessage,
  extractTryCloudflareUrl,
  getDefaultCloudflaredCertEnv,
  getCloudflaredStartArgs,
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

test("extractCloudflaredErrorMessage keeps the actionable stderr line", () => {
  const error = extractCloudflaredErrorMessage(
    '2026-03-30T19:56:12Z INF Requesting new quick Tunnel on trycloudflare.com...\n2026-03-30T19:56:12Z ERR failed to request quick Tunnel: Post "https://api.trycloudflare.com/tunnel": tls: failed to verify certificate: x509: certificate signed by unknown authority'
  );

  assert.equal(
    error,
    'failed to request quick Tunnel: Post "https://api.trycloudflare.com/tunnel": tls: failed to verify certificate: x509: certificate signed by unknown authority'
  );
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

test("buildCloudflaredChildEnv keeps runtime essentials, isolates runtime dirs, and drops secrets", () => {
  const env = buildCloudflaredChildEnv(
    {
      PATH: "/usr/bin",
      HTTPS_PROXY: "http://proxy.internal:8080",
      JWT_SECRET: "top-secret",
      API_KEY_SECRET: "another-secret",
    },
    {
      runtimeRoot: "/managed/runtime",
      homeDir: "/managed/runtime/home",
      configDir: "/managed/runtime/config",
      cacheDir: "/managed/runtime/cache",
      dataDir: "/managed/runtime/data",
      tempDir: "/managed/runtime/tmp",
      userProfileDir: "/managed/runtime/userprofile",
      appDataDir: "/managed/runtime/userprofile/AppData/Roaming",
      localAppDataDir: "/managed/runtime/userprofile/AppData/Local",
    },
    {}
  );

  assert.deepEqual(env, {
    PATH: "/usr/bin",
    HTTPS_PROXY: "http://proxy.internal:8080",
    HOME: "/managed/runtime/home",
    XDG_CONFIG_HOME: "/managed/runtime/config",
    XDG_CACHE_HOME: "/managed/runtime/cache",
    XDG_DATA_HOME: "/managed/runtime/data",
    USERPROFILE: "/managed/runtime/userprofile",
    APPDATA: "/managed/runtime/userprofile/AppData/Roaming",
    LOCALAPPDATA: "/managed/runtime/userprofile/AppData/Local",
    TMPDIR: "/managed/runtime/tmp",
    TMP: "/managed/runtime/tmp",
    TEMP: "/managed/runtime/tmp",
  });
});

test("getDefaultCloudflaredCertEnv detects common CA bundle paths", () => {
  const env = getDefaultCloudflaredCertEnv((candidate) =>
    ["/etc/ssl/certs/ca-certificates.crt", "/etc/ssl/certs"].includes(candidate)
  );

  assert.deepEqual(env, {
    SSL_CERT_FILE: "/etc/ssl/certs/ca-certificates.crt",
    SSL_CERT_DIR: "/etc/ssl/certs",
  });
});

test("buildCloudflaredChildEnv injects discovered CA paths when the parent env omits them", () => {
  const env = buildCloudflaredChildEnv(
    { PATH: "/usr/bin" },
    {
      runtimeRoot: "/managed/runtime",
      homeDir: "/managed/runtime/home",
      configDir: "/managed/runtime/config",
      cacheDir: "/managed/runtime/cache",
      dataDir: "/managed/runtime/data",
      tempDir: "/managed/runtime/tmp",
      userProfileDir: "/managed/runtime/userprofile",
      appDataDir: "/managed/runtime/userprofile/AppData/Roaming",
      localAppDataDir: "/managed/runtime/userprofile/AppData/Local",
    },
    {
      SSL_CERT_FILE: "/etc/ssl/certs/ca-certificates.crt",
      SSL_CERT_DIR: "/etc/ssl/certs",
    }
  );

  assert.equal(env.SSL_CERT_FILE, "/etc/ssl/certs/ca-certificates.crt");
  assert.equal(env.SSL_CERT_DIR, "/etc/ssl/certs");
});

test("getCloudflaredStartArgs relies on cloudflared protocol auto-negotiation", () => {
  assert.deepEqual(getCloudflaredStartArgs("http://127.0.0.1:20128"), [
    "tunnel",
    "--url",
    "http://127.0.0.1:20128",
    "--no-autoupdate",
  ]);
});
