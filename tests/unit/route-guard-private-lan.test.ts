import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isPrivateLanHost, isLoopbackHost, isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";

test("isPrivateLanHost: accepts RFC1918 IPv4 (incl. :port and ::ffff: mapped)", () => {
  for (const h of [
    "192.168.0.15",
    "192.168.0.15:54321",
    "10.0.0.5",
    "172.16.0.9",
    "172.31.255.254",
    "::ffff:192.168.1.20",
  ]) {
    assert.equal(isPrivateLanHost(h), true, `expected private-LAN: ${h}`);
  }
});

test("isPrivateLanHost: accepts IPv6 ULA / link-local", () => {
  assert.equal(isPrivateLanHost("fd12:3456::1"), true);
  assert.equal(isPrivateLanHost("fe80::1"), true);
});

test("isPrivateLanHost: rejects public IPs, loopback and junk", () => {
  for (const h of [
    "8.8.8.8",
    "69.164.221.35", // public VPS
    "172.32.0.1", // just outside 172.16/12
    "127.0.0.1",
    "::1",
    "example.com",
    "",
    null,
  ]) {
    assert.equal(isPrivateLanHost(h), false, `expected NOT private-LAN: ${h}`);
  }
});

test("isLoopbackHost stays loopback-only (unchanged)", () => {
  assert.equal(isLoopbackHost("127.0.0.1"), true);
  assert.equal(isLoopbackHost("localhost:20128"), true);
  assert.equal(isLoopbackHost("192.168.0.15"), false);
});

test("services + traffic-inspector remain LOCAL_ONLY paths", () => {
  assert.equal(isLocalOnlyPath("/api/services/9router/status"), true);
  assert.equal(isLocalOnlyPath("/api/tools/traffic-inspector/sessions"), true);
});

test("management policy derives locality from the Host header (middleware socket is null)", () => {
  const src = readFileSync(
    join(import.meta.dirname, "../../src/server/authz/policies/management.ts"),
    "utf8"
  );
  assert.ok(src.includes('headers?.get?.("host")'), "requestPeerAddress must read the Host header");
});
