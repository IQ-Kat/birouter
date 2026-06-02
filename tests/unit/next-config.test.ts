import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const modulePath = path.join(process.cwd(), "next.config.mjs");
const originalNextDistDir = process.env.NEXT_DIST_DIR;

async function loadNextConfig(label) {
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

test.afterEach(() => {
  if (originalNextDistDir === undefined) {
    delete process.env.NEXT_DIST_DIR;
  } else {
    process.env.NEXT_DIST_DIR = originalNextDistDir;
  }
});

test("next config exposes standalone build settings and canonical rewrites", async () => {
  process.env.NEXT_DIST_DIR = ".next-task607";
  const { default: nextConfig } = await loadNextConfig("distdir");

  const rewrites = await nextConfig.rewrites();
  const headers = await nextConfig.headers();
  const securityHeaders = Object.fromEntries(
    headers[0].headers.map(({ key, value }) => [key, value])
  );

  assert.equal(nextConfig.distDir, ".next-task607");
  assert.equal(nextConfig.output, "standalone");
  assert.equal(nextConfig.images.unoptimized, true);
  assert.deepEqual(nextConfig.transpilePackages, [
    "@omniroute/open-sse",
    "@lobehub/icons",
    "fumadocs-ui",
    "fumadocs-core",
  ]);
  assert.equal(headers[0].source, "/:path*");
  assert.match(securityHeaders["Content-Security-Policy"], /default-src 'self'/);
  assert.match(securityHeaders["Content-Security-Policy"], /frame-ancestors 'none'/);
  assert.equal(securityHeaders["X-Frame-Options"], "DENY");
  assert.equal(securityHeaders["X-Content-Type-Options"], "nosniff");
  assert.match(securityHeaders["Strict-Transport-Security"], /includeSubDomains/);
  assert.deepEqual(rewrites.slice(0, 4), [
    {
      source: "/chat/completions",
      destination: "/api/v1/chat/completions",
    },
    {
      source: "/responses",
      destination: "/api/v1/responses",
    },
    {
      source: "/responses/:path*",
      destination: "/api/v1/responses/:path*",
    },
    {
      source: "/models",
      destination: "/api/v1/models",
    },
  ]);
});

test("next config declares Turbopack aliases, runtime assets and server externals", async () => {
  const { default: nextConfig } = await loadNextConfig("runtime-assets");
  const serverExternalPackages = new Set(nextConfig.serverExternalPackages);
  const tracingIncludes = nextConfig.outputFileTracingIncludes["/*"];
  const tracingExcludes = nextConfig.outputFileTracingExcludes["/*"];

  assert.equal(nextConfig.turbopack.root, process.cwd());
  assert.equal(nextConfig.turbopack.resolveAlias["@/mitm/manager"], "./src/mitm/manager.stub.ts");
  assert.equal(nextConfig.outputFileTracingRoot, process.cwd());
  assert.ok(tracingIncludes.includes("./src/lib/db/migrations/**/*"));
  assert.ok(
    tracingIncludes.includes("./open-sse/services/compression/engines/rtk/filters/**/*.json")
  );
  assert.ok(tracingIncludes.includes("./open-sse/services/compression/rules/**/*.json"));
  assert.ok(tracingExcludes.includes("./_tasks/**/*"));
  assert.ok(tracingExcludes.includes("./tests/**/*"));

  for (const packageName of [
    "thread-stream",
    "better-sqlite3",
    // sqlite-vec ships a native vec0.so loaded at runtime; without externalizing it
    // the Turbopack build fails with "Unknown module type" on the .so (issue #3066).
    "sqlite-vec",
    "wreq-js",
    "fs",
    "path",
    "child_process",
    "crypto",
    "net",
    "tls",
  ]) {
    assert.ok(serverExternalPackages.has(packageName), `${packageName} should be externalized`);
  }
});

// ── manager.stub.ts must cover every static @/mitm/manager import (issue #3066) ──
//
// next.config aliases `@/mitm/manager` → `manager.stub.ts` for the Turbopack build
// (Docker uses Turbopack; the VM/webpack build uses the real module, which is why the
// VM validated while Docker's `npm run build` errored). Any route that statically
// imports a name the stub doesn't export breaks the Turbopack build with
// "Export X doesn't exist in target module". This guard fails on that drift — it is
// what would have caught the missing getAllAgentsStatus export in #3066.

test("manager.stub.ts exports every name statically imported from @/mitm/manager", async () => {
  const fs = await import("node:fs");
  const appDir = path.join(process.cwd(), "src", "app");

  // Collect named imports from `... from "@/mitm/manager"` (NOT manager.runtime, which
  // is loaded via dynamic import() and resolves to the real module at runtime).
  const collectImports = (dir: string, acc: Set<string>): void => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        collectImports(full, acc);
        continue;
      }
      if (!/\.(ts|tsx)$/.test(entry.name)) continue;
      const src = fs.readFileSync(full, "utf-8");
      const re = /import\s*\{([^}]*)\}\s*from\s*["']@\/mitm\/manager["']/g;
      let m: RegExpExecArray | null;
      while ((m = re.exec(src)) !== null) {
        for (const raw of m[1].split(",")) {
          const name = raw.trim().split(/\s+as\s+/)[0].trim();
          if (name) acc.add(name);
        }
      }
    }
  };

  const imported = new Set<string>();
  collectImports(appDir, imported);

  // Sanity: the suite is meaningless if it finds nothing to check.
  assert.ok(imported.size > 0, "expected at least one static @/mitm/manager import in src/app");
  assert.ok(imported.has("getAllAgentsStatus"), "fixture: agent-bridge/state imports getAllAgentsStatus");

  const stubSrc = fs.readFileSync(
    path.join(process.cwd(), "src", "mitm", "manager.stub.ts"),
    "utf-8"
  );
  const stubExports = new Set(
    [...stubSrc.matchAll(/export\s+(?:const|function|async\s+function)\s+([A-Za-z0-9_]+)/g)].map(
      (m) => m[1]
    )
  );

  const missing = [...imported].filter((name) => !stubExports.has(name));
  assert.deepEqual(
    missing,
    [],
    `manager.stub.ts is missing exports statically imported by routes: ${missing.join(", ")}`
  );
});

test("next-intl webpack hook preserves caller config and filters known extractor warnings", async () => {
  const { default: nextConfig } = await loadNextConfig("webpack-pass-through");
  const config: any = {
    context: process.cwd(),
    plugins: [],
    externals: [],
    ignoreWarnings: [],
    resolve: { fallback: { http: true } },
  };

  nextConfig.webpack(config, {
    isServer: false,
    defaultLoaders: { babel: {} } as any,
    webpack: {
      IgnorePlugin: class {
        options: any;

        constructor(options) {
          this.options = options;
        }
      },
    },
  });

  assert.deepEqual(config.plugins, []);
  assert.deepEqual(config.externals, []);
  assert.deepEqual(config.resolve.fallback, { http: true });
  assert.equal(config.ignoreWarnings.length, 1);
  assert.equal(
    config.ignoreWarnings[0]({
      message:
        "Parsing of /repo/node_modules/next-intl/dist/esm/production/extractor/format/index.js for build dependencies failed at 'import(t)'.",
      module: {
        resource: "/repo/node_modules/next-intl/dist/esm/production/extractor/format/index.js",
      },
    }),
    true
  );
  assert.equal(
    config.ignoreWarnings[0]({
      message:
        "Parsing of /repo/node_modules/next-intl/dist/esm/production/extractor/format/index.js for build dependencies failed at 'import(t)'.",
    }),
    false
  );
  assert.equal(
    config.ignoreWarnings[0]({
      message: "Critical dependency: the request of a dependency is an expression",
      module: {
        resource: "/repo/node_modules/next-intl/dist/esm/production/extractor/format/index.js",
      },
    }),
    true
  );
  assert.equal(
    config.ignoreWarnings[0]({ message: "Critical dependency: request is expression" }),
    false
  );
});
