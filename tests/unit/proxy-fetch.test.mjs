import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

import proxyFetch, {
  runWithProxyContext,
  runWithTlsTracking,
  isTlsFingerprintActive,
} from "../../open-sse/utils/proxyFetch.ts";
import { getDefaultDispatcher } from "../../open-sse/utils/proxyDispatcher.ts";
import tlsClient from "../../open-sse/utils/tlsClient.ts";

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

const originalTlsAvailable = tlsClient.available;
const originalTlsFetch = tlsClient.fetch.bind(tlsClient);

test.afterEach(() => {
  tlsClient.available = originalTlsAvailable;
  tlsClient.fetch = originalTlsFetch;
});

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

test("proxy fetch honors suffix-and-port NO_PROXY patterns", async () => {
  await withHttpServer(
    (_req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("suffix-bypassed");
    },
    async (url) => {
      const parsed = new URL(url);

      await withEnv(
        {
          HTTP_PROXY: "http://127.0.0.1:9",
          HTTPS_PROXY: undefined,
          ALL_PROXY: undefined,
          NO_PROXY: `.0.0.1:${parsed.port}`,
        },
        async () => {
          const response = await proxyFetch(url);

          assert.equal(response.status, 200);
          assert.equal(await response.text(), "suffix-bypassed");
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

test("proxy fetch respects an explicit dispatcher override", async () => {
  await withHttpServer(
    (req, res) => {
      assert.equal(req.method, "POST");
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("dispatcher");
    },
    async (url) => {
      const response = await proxyFetch(
        new Request(url, {
          method: "POST",
          body: "payload",
        }),
        { dispatcher: getDefaultDispatcher() }
      );

      assert.equal(response.status, 200);
      assert.equal(await response.text(), "dispatcher");
    }
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

test("proxy fetch uses TLS fingerprint transport when enabled and available", async () => {
  await withEnv(
    {
      ENABLE_TLS_FINGERPRINT: "true",
      HTTP_PROXY: undefined,
      HTTPS_PROXY: undefined,
      ALL_PROXY: undefined,
      NO_PROXY: undefined,
    },
    async () => {
      tlsClient.available = true;
      tlsClient.fetch = async (url, options = {}) => {
        assert.equal(url, "https://omniroute.example.test/hello");
        assert.equal(options.method, "POST");
        return Response.json({ via: "tls-client" });
      };

      const tracked = await runWithTlsTracking(() =>
        proxyFetch("https://omniroute.example.test/hello", {
          method: "POST",
          headers: { "x-test": "1" },
        })
      );

      assert.equal(isTlsFingerprintActive(), true);
      assert.equal(tracked.tlsFingerprintUsed, true);
      assert.deepEqual(await tracked.result.json(), { via: "tls-client" });
    }
  );
});

test("proxy fetch falls back to native fetch when TLS fingerprint transport throws", async () => {
  await withHttpServer(
    (_req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ via: "native-fetch" }));
    },
    async (url) => {
      await withEnv(
        {
          ENABLE_TLS_FINGERPRINT: "true",
          HTTP_PROXY: undefined,
          HTTPS_PROXY: undefined,
          ALL_PROXY: undefined,
          NO_PROXY: undefined,
        },
        async () => {
          tlsClient.available = true;
          tlsClient.fetch = async () => {
            throw new Error("tls fingerprint unavailable");
          };

          const tracked = await runWithTlsTracking(() => proxyFetch(url));

          assert.equal(tracked.tlsFingerprintUsed, false);
          assert.deepEqual(await tracked.result.json(), { via: "native-fetch" });
        }
      );
    }
  );
});

test("runWithProxyContext accepts reachable HTTP proxy endpoints and returns callback result", async () => {
  await withHttpServer(
    (_req, res) => res.end("proxy-ok"),
    async (url) => {
      const parsed = new URL(url);
      const result = await runWithProxyContext(
        {
          type: "http",
          host: parsed.hostname,
          port: parsed.port,
        },
        async () => "ok"
      );

      assert.equal(result, "ok");
    }
  );
});
