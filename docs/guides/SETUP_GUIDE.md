---
title: "📖 Setup Guide — Birouter"
version: 3.8.40
lastUpdated: 2026-06-28
---

# 📖 Setup Guide — Birouter

> Complete setup reference for Birouter. For the quick version, see the [Quick Start in README](../README.md#-quick-start).

## Table of Contents

- [Install Methods](#install-methods)
- [CLI Tool Configuration](#cli-tool-configuration)
- [Protocol Setup (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Timeout Configuration](#timeout-configuration)
- [Split-Port Mode](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Uninstalling](#uninstalling)

---

## Install Methods

### npm (recommended)

```bash
npm install -g birouter
birouter
```

Dashboard opens at `http://localhost:2004` and API base URL is `http://localhost:2004/v1`.

### pnpm

```bash
pnpm add -g birouter@latest --allow-build=better-sqlite3 --allow-build=@swc/core
birouter
```

> **pnpm users:** the `--allow-build` flag is required to enable native build scripts for `better-sqlite3` and `@swc/core`. The `pnpm approve-builds -g` command is not supported for global installs on pnpm v11.

### Arch Linux (AUR)

```bash
yay -S birouter-bin
systemctl --user enable --now birouter.service
```

The [AUR package](https://aur.archlinux.org/packages/birouter-bin) installs Birouter and provides a systemd user service.

### From Source

```bash
npm install
PORT=2004 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Note:** `npm install` auto-generates `.env` from `.env.example` on first run. Subsequent installs will not overwrite an existing `.env`, so customizations are preserved. To re-seed, delete `.env` before re-running.

### Docker

See the [Docker Guide](./DOCKER_GUIDE.md) for complete Docker setup including Compose profiles and Caddy HTTPS.

### Desktop App (Electron)

Birouter ships a desktop wrapper built on Electron 41 + electron-builder 26.10. Available scripts (workspace root):

```bash
npm run electron:dev          # Run desktop with hot-reload
npm run electron:build        # Build for current OS (auto-detected)
npm run electron:build:win    # Windows installer (NSIS + portable)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Smoke-test packaged build
```

Releases of the desktop installers are attached to GitHub Releases. For the full Electron deep-dive (signing, IPC bridge, distros), see [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(criado em fase posterior)_.

### Headless server (CI/automation)

For unattended setups (Docker, Kubernetes, CI), use:

```bash
birouter setup --non-interactive
birouter providers test-batch
```

Combined with env vars (`INITIAL_PASSWORD`, `BIROUTER_WS_BRIDGE_SECRET`, etc.), this lets you spin up an Birouter instance fully scriptable.

### CLI Options

| Command                | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `birouter`             | Start server (`PORT=2004`, API and dashboard on same port)     |
| `birouter setup`       | Guided CLI onboarding for password and first provider          |
| `birouter doctor`      | Run local health checks without starting the server            |
| `birouter providers`   | Discover, list, validate, and test providers from CLI          |
| `birouter config`      | CLI tool configuration — list, get, set, validate configs      |
| `birouter status`      | Offline status dashboard — version, DB, tools, config          |
| `birouter logs`        | Stream usage logs from the API (supports `--follow`)           |
| `birouter update`      | Check for or apply Birouter updates                            |
| `birouter provider`    | Manage provider connections — add, list, remove, test, default |
| `birouter --port 3000` | Set canonical/API port to 3000                                 |
| `birouter --mcp`       | Start MCP server (stdio transport)                             |
| `birouter --no-open`   | Don't auto-open browser                                        |
| `birouter --help`      | Show help                                                      |

Headless setup can be scripted with flags or environment variables:

```bash
birouter setup --non-interactive --password "$BIROUTER_PASSWORD"
birouter setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
birouter setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Run local diagnostics without opening the dashboard:

```bash
birouter doctor
birouter doctor --json
birouter doctor --no-liveness
```

Manage providers from SSH or scripts without opening the dashboard:

```bash
birouter providers available
birouter providers available --search openai
birouter providers available --category api-key
birouter providers list
birouter providers test <id-or-name>
birouter providers test-all
birouter providers validate
```

---

## CLI Tool Configuration

### 1) Connect Providers and Create API Key

1. Open Dashboard → `Providers` and connect at least one provider (OAuth or API key).
2. Open Dashboard → `Endpoints` and create an API key.
3. (Optional) Open Dashboard → `Combos` and set your fallback chain.

### 2) Point Your Coding Tool

```txt
Base URL: http://localhost:2004/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

If your editor cannot send `Authorization: Bearer ...`, use the tokenized compatibility base instead:

```txt
Base URL: http://localhost:2004/api/v1/vscode/YOUR_KEY/
Models URL: http://localhost:2004/api/v1/vscode/YOUR_KEY/models
Chat URL: http://localhost:2004/api/v1/vscode/YOUR_KEY/chat/completions
Ollama Tags URL: http://localhost:2004/api/v1/vscode/YOUR_KEY/api/tags
```

Works with Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode, and OpenAI-compatible SDKs.

#### Auto-configure with `setup-*`

Instead of pasting the base URL and key by hand, let Birouter write each tool's
own config from the live model catalog. One command per tool:

```bash
birouter setup-codex        # ~/.codex/<name>.config.toml profiles
birouter setup-claude       # ~/.claude/profiles/<name>/settings.json
birouter setup-opencode     # ~/.config/opencode/opencode.json (openai-compatible)
birouter setup-cline        # Cline CLI + VS Code extension settings
birouter setup-kilo         # Kilo Code
birouter setup-continue     # ~/.continue/config.yaml (Continue / cn)
birouter setup-cursor       # prints Cursor's in-app steps
birouter setup-roo          # Roo Code import + autoImport pointer
birouter setup-crush        # ~/.config/crush/crush.json
birouter setup-goose        # ~/.config/goose/config.yaml
birouter setup-qwen         # ~/.qwen/settings.json
birouter setup-aider        # ~/.aider.conf.yml
```

Each accepts `--remote <url> --api-key <key>` to configure a local tool against a
**remote** Birouter, plus `--dry-run` to preview. The launchers
`birouter launch` (Claude Code) and `birouter launch-codex` (Codex) spawn the CLI
with the right env injected, writing no config at all.

For the full table (what each command writes, every flag, local vs remote, base-URL
`/v1` conventions), see **[CLI Integrations](./CLI-INTEGRATIONS.md)**.

For detailed per-tool configuration (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot, and more), see the dedicated **[CLI Tools Guide](../reference/CLI-TOOLS.md)**.

---

## Protocol Setup (MCP + A2A)

### MCP Setup (Model Context Protocol)

Start MCP transport in stdio mode:

```bash
birouter --mcp
```

Recommended validation flow:

```bash
# 1. Start MCP server
birouter --mcp

# 2. From your MCP client, call:
birouter_get_health        # Should return system health
birouter_list_combos       # Should return active combos

# 3. Or run the full E2E suite:
npm run test:protocols:e2e
```

#### MCP Client Configuration

**Claude Code:**

```bash
claude mcp add-server birouter --type http --url http://localhost:2004/api/mcp/stream
```

**Cursor / Cline:**

Add to your MCP settings:

```json
{
  "mcpServers": {
    "birouter": {
      "command": "birouter",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

**Full MCP documentation:** [MCP Server README](../../open-sse/mcp-server/README.md) — 87 tools, IDE configs, Python/TS/Go clients.

### A2A Setup (Agent-to-Agent Protocol)

Verify the Agent Card:

```bash
curl http://localhost:2004/.well-known/agent.json
```

Send a task:

```bash
curl -X POST http://localhost:2004/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Full A2A documentation:** [A2A Server README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, skills, streaming, task lifecycle.

---

## Timeout Configuration

### Basic Timeouts

For most deployments, you only need these two variables:

| Variable                 | Default                       | Purpose                                                                                                                                      |
| ------------------------ | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                      | Shared baseline for upstream response-start timeout, hidden Undici timeouts, TLS fingerprint requests, and API bridge request/proxy timeouts |
| `STREAM_IDLE_TIMEOUT_MS` | inherits `REQUEST_TIMEOUT_MS` | Maximum gap between streaming chunks before Birouter aborts the SSE stream                                                                   |

Backward compatibility is preserved: existing `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS`, and other per-layer timeout vars still work and override the shared baseline.

### Provider-Specific Notes

For Claude Code-compatible upstreams (`anthropic-compatible-cc-*`), Birouter derives the outbound `X-Stainless-Timeout` header from the resolved fetch timeout so provider-side read timeouts stay aligned with your env configuration.

For third-party Claude Code-compatible reverse proxies, Birouter keeps the default `anthropic-beta` set conservative and, when `Client Cache Control` is left on `Auto`, only forwards client-provided `cache_control` markers. Enable the per-connection "Enable redact-thinking beta" toggle only when the upstream specifically requires redacted Claude thinking streams.

### Advanced Timeout Overrides

| Variable                                 | Default                                    | Purpose                                                              |
| ---------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | inherits `REQUEST_TIMEOUT_MS`              | Upstream response-start timeout used until response headers arrive   |
| `FETCH_HEADERS_TIMEOUT_MS`               | inherits `FETCH_TIMEOUT_MS`                | Undici time limit for receiving upstream response headers            |
| `FETCH_BODY_TIMEOUT_MS`                  | inherits `FETCH_TIMEOUT_MS`                | Undici time limit between upstream body chunks (`0` disables it)     |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Undici TCP connect timeout                                           |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Undici idle keep-alive socket timeout                                |
| `TLS_CLIENT_TIMEOUT_MS`                  | inherits `FETCH_TIMEOUT_MS`                | Timeout for TLS fingerprint requests made through `wreq-js`          |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | inherits `REQUEST_TIMEOUT_MS` or `600000`  | Timeout for `/v1` proxy forwarding from API port to dashboard port   |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | Incoming request timeout on the API bridge server                    |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | Incoming header timeout on the API bridge server                     |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | Keep-alive timeout on the API bridge server                          |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | Socket inactivity timeout on the API bridge server (`0` disables it) |

> **Note:** For streaming requests, `FETCH_TIMEOUT_MS` only covers connection setup / waiting for the first upstream response. Once the stream is active, Birouter will only abort on an actual stall (`STREAM_IDLE_TIMEOUT_MS`) or Undici body inactivity (`FETCH_BODY_TIMEOUT_MS`).

### Reverse Proxy Compatibility

If you run Birouter behind Nginx, Caddy, Cloudflare, or another reverse proxy, make sure the proxy timeouts are also higher than your Birouter stream/fetch timeouts.

---

## Split-Port Mode

Run API and Dashboard on separate ports for advanced scenarios (reverse proxy, container networking):

```bash
PORT=2004 DASHBOARD_PORT=20129 birouter
# API:       http://localhost:2004/v1
# Dashboard: http://localhost:20129
```

---

## Void Linux (xbps-src) Template

For Void Linux users, you can build a native package using `xbps-src`. Save this block as `srcpkgs/birouter/template`:

```bash
# Template file for 'birouter'
pkgname=birouter
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/IQ-Kat/birouter"
distfiles="https://github.com/IQ-Kat/birouter/archive/refs/tags/v${version}.tar.gz"
# Regenerate the checksum for each release with:
#   curl -L -o /tmp/birouter.tar.gz "https://github.com/IQ-Kat/birouter/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/birouter.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_birouter"
birouter_homedir="/var/lib/birouter"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/birouter/.next
	vcopy .next/standalone/. usr/lib/birouter/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/birouter/${_d}/.keep"
	done

	cat > "${WRKDIR}/birouter" <<'EOF'
#!/bin/sh
export PORT="${PORT:-2004}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/birouter}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/birouter/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/birouter"
}

post_install() {
	vlicense LICENSE
}
```

---

## Uninstalling

| Command                  | Action                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `npm run uninstall`      | Removes the system app but **keeps your DB and configurations** in `~/.birouter`.   |
| `npm run uninstall:full` | Removes the app AND permanently **erases all configurations, keys, and databases**. |

> For detailed uninstall instructions across all methods, see [UNINSTALL.md](./UNINSTALL.md).
