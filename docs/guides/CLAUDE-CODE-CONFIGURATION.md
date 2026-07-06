---
title: "Claude Code CLI — Configuration with Birouter"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Claude Code CLI — Configuration with Birouter

Point the **Claude Code** CLI (`claude`) at Birouter — local or a remote VPS —
with per-model profiles, mirroring the Codex setup.

---

## Quick start

```bash
# Launch Claude Code against a local Birouter (auto-detects the active context)
birouter launch

# Against a remote Birouter (after `birouter connect <host>`, this is automatic)
birouter launch --remote http://192.168.0.15:2004 --api-key oma_live_xxx

# Generate per-model profiles, then launch one
birouter setup-claude            # writes ~/.claude/profiles/<name>/settings.json
birouter launch --profile glm52  # Claude Code using glm/glm-5.2 via Birouter
```

---

## How Claude Code connects to a gateway

Claude Code talks the **Anthropic Messages API** and is pointed at a custom
endpoint with environment variables (it has no `--base-url` flag):

| Variable                                     | Purpose                                                                                |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| `ANTHROPIC_BASE_URL`                         | Gateway root URL (Claude Code appends `/v1/messages`). **No `/v1` suffix.**            |
| `ANTHROPIC_AUTH_TOKEN`                       | Sent as `Authorization: Bearer …` — use your Birouter access token / API key           |
| `ANTHROPIC_API_KEY`                          | Alternative: sent as `x-api-key`. If both set, `ANTHROPIC_AUTH_TOKEN` wins             |
| `ANTHROPIC_MODEL`                            | Force a specific model (overrides the `/model` picker default)                         |
| `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` | `1` → the native `/model` picker lists `claude*`/`anthropic*` models from `/v1/models` |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS`              | Cap output tokens per response (e.g. `65536`)                                          |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW`            | Token threshold for auto-compaction                                                    |

> Env vars are read **once at startup** — restart Claude Code after changing them.

`birouter launch` sets all of these for you: it resolves the base URL + token
from the active context (so `birouter connect <vps>` then `birouter launch`
just works), health-checks the server, and execs `claude`.

---

## Profiles (`CLAUDE_CONFIG_DIR`)

Claude Code has **no native profile files** (unlike Codex's `~/.codex/<name>.config.toml`).
The idiomatic mechanism is `CLAUDE_CONFIG_DIR` — a separate config directory per
profile, each with its own `settings.json`, credentials, history and cache.

`birouter setup-claude` fetches the live `/v1/models` catalog and writes one
profile per model at `~/.claude/profiles/<name>/settings.json`, reusing the
**same names as `setup-codex`** (`glm52`, `kimi-k27`, `deepseek-pro`, …):

```jsonc
// ~/.claude/profiles/glm52/settings.json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "model": "glm/glm-5.2",
  "effortLevel": "xhigh",
  "env": {
    "ANTHROPIC_BASE_URL": "http://192.168.0.15:2004",
    "ANTHROPIC_MODEL": "glm/glm-5.2",
    "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1",
    "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "190000",
  },
}
```

> **The auth token is never written to the profile.** Launch with
> `birouter launch --profile <name>` (it injects `ANTHROPIC_AUTH_TOKEN` from the
> active context), or export `ANTHROPIC_AUTH_TOKEN` yourself and run
> `CLAUDE_CONFIG_DIR=~/.claude/profiles/<name> claude`.

**Auto-sync after model discovery (opt-in).** Birouter can regenerate these same
`~/.claude/profiles/<name>/settings.json` files automatically whenever a provider model
sync changes the live catalog — so new/renamed models get profiles without re-running the
command. It is **off by default**: toggle it from the **CLI Code dashboard** ("CLI profile
auto-sync" → Claude Code), or set `BIROUTER_AUTO_SYNC_CLAUDE_PROFILES=true` (it also honors
`CLI_ALLOW_CONFIG_WRITES`, on by default). When enabled it only writes profile files; it never
changes your active/default Claude config, auth, or the `~/.claude/settings.json`.

### Generating + using profiles

```bash
# Local Birouter
birouter setup-claude

# Remote VPS (bakes the VPS URL into every profile)
birouter setup-claude --remote http://192.168.0.15:2004 --api-key oma_live_xxx

# Only some providers
birouter setup-claude --only glm,kimi

# Preview without writing
birouter setup-claude --dry-run

# Launch a profile
birouter launch --profile kimi-k27
```

---

## Model tiers (optional)

Claude Code routes to capability tiers. Map each to an Birouter model via env /
settings if you want different providers per tier:

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL="glm/glm-5.2"
export ANTHROPIC_DEFAULT_SONNET_MODEL="kmc/kimi-k2.6"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="glm/glm-4.7-flash"
```

Otherwise a single `ANTHROPIC_MODEL` (what profiles set) is used for everything.

---

## Remote mode

Once you've run `birouter connect <host>` (see
[Remote Mode](./REMOTE-MODE.md)), `birouter launch` and `birouter setup-claude`
automatically target that remote server and use its scoped access token — no
extra flags needed. Override per-invocation with `--remote` / `--api-key`.

---

## Troubleshooting

**Claude Code ignores the gateway** — confirm `ANTHROPIC_BASE_URL` has **no
`/v1`** and restart `claude` (env is read once at startup). `birouter launch`
handles this for you.

**`/model` picker is empty / missing gateway models** — needs Claude Code
v2.1.129+ and `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1`. Only `claude*` /
`anthropic*` model IDs appear in the picker; force any other model with
`ANTHROPIC_MODEL=<id>` (this is what profiles do).

**Auth errors** — the profile holds no token. Use `birouter launch --profile`
(injects it) or export `ANTHROPIC_AUTH_TOKEN`.

**Profiles don't isolate** — each profile is a distinct `CLAUDE_CONFIG_DIR`;
verify `echo $CLAUDE_CONFIG_DIR` inside the session points at
`~/.claude/profiles/<name>`.
