import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack config: redirect native modules to stubs at build time
  turbopack: {
    resolveAlias: {
      // Point mitm/manager to a stub during build (native child_process/fs can't be bundled)
      "@/mitm/manager": "./src/mitm/manager.stub.ts",
    },
  },
  output: "standalone",
  serverExternalPackages: [
    "better-sqlite3",
    "zod",
    "child_process",
    "fs",
    "path",
    "os",
    "crypto",
    "net",
    "tls",
    "http",
    "https",
    "stream",
    "buffer",
    "util",
  ],
  transpilePackages: ["@omniroute/open-sse"],
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.*"],
  typescript: {
    // TODO: Re-enable after fixing all sub-component useTranslations scope issues
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Force better-sqlite3 to always be required by its exact package name.
      //
      // Next.js 16 webpack compiles the instrumentation hook into a separate
      // chunk ([root-of-the-server]__<hash>.js) and can emit a hashed require
      // such as `require('better-sqlite3-90e2652d1716b047')` even when the
      // package is listed in `serverExternalPackages`. That hashed name doesn't
      // exist in node_modules, causing the 500 error reported in issue #394.
      //
      // Adding an explicit `externals` function overrides the bundler's default
      // handling and always emits `require('better-sqlite3')`, which resolves
      // correctly in the published standalone build.
      const prev = config.externals ?? [];
      const prevArr = Array.isArray(prev) ? prev : [prev];
      config.externals = [
        ...prevArr,
        ({ request }, callback) => {
          if (request === "better-sqlite3") {
            return callback(null, `commonjs ${request}`);
          }
          callback();
        },
      ];
    } else {
      // Ignore native Node.js modules in browser bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        child_process: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/chat/completions",
        destination: "/api/v1/chat/completions",
      },
      {
        source: "/responses",
        destination: "/api/v1/responses",
      },
      {
        source: "/models",
        destination: "/api/v1/models",
      },
      {
        source: "/v1/v1/:path*",
        destination: "/api/v1/:path*",
      },
      {
        source: "/v1/v1",
        destination: "/api/v1",
      },
      {
        source: "/codex/:path*",
        destination: "/api/v1/responses",
      },
      {
        source: "/v1/:path*",
        destination: "/api/v1/:path*",
      },
      {
        source: "/v1",
        destination: "/api/v1",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
