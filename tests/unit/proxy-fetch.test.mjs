import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

import proxyFetch, {
  runWithProxyContext,
  runWithTlsTracking,
  isTlsFingerprintActive,
} from "../../open-sse/utils/proxyFetch.ts";

async function withEnv(overrides, fn) {
  const previous = new Map();

  for (const [key, value] of Object.entries(overrides)) {
    previous.set(key, process.env[key]);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  try {
    return await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

async function withHttpServer(handler, fn) {
  const server = http.createServer(handler);

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  assert.ok(address && typeof address === "object");

  try {
    return await fn(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

test("proxy fetch bypasses environment proxy when NO_PROXY matches the target host", async () => {
  await withHttpServer(
    (_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("bypassed");
    },
    async (url) => {
      await withEnv(
        {
          HTTP_PROXY: "http://127.0.0.1:9",
          HTTPS_PROXY: "http://127.0.0.1:9",
          ALL_PROXY: undefined,
          NO_PROXY: "127.0.0.1",
        },
        async () => {
          const response = await proxyFetch(url);

          assert.equal(response.status, 200);
          assert.equal(await response.text(), "bypassed");
        }
      );
    }
  );
});

test("proxy fetch fails closed when an invalid environment proxy is configured", async () => {
  await withHttpServer(
    (_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("should-not-arrive");
    },
    async (url) => {
      await withEnv(
        {
          HTTP_PROXY: "http://127.0.0.1:9",
          HTTPS_PROXY: undefined,
          ALL_PROXY: undefined,
          NO_PROXY: undefined,
        },
        async () => {
          await assert.rejects(() => proxyFetch(url));
        }
      );
    }
  );
});

test("runWithProxyContext requires a callback function", async () => {
  await assert.rejects(
    runWithProxyContext(null, null),
    /runWithProxyContext requires a callback function/
  );
});

test("runWithTlsTracking reports direct executions without TLS fingerprint usage", async () => {
  await withEnv({ ENABLE_TLS_FINGERPRINT: undefined }, async () => {
    const tracked = await runWithTlsTracking(async () => "ok");

    assert.deepEqual(tracked, {
      result: "ok",
      tlsFingerprintUsed: false,
    });
    assert.equal(isTlsFingerprintActive(), false);
  });
});
