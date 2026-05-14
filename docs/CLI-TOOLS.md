# CLI Tools Setup Guide — OmniRoute

This guide explains how to install and configure all supported AI coding CLI tools
to use **OmniRoute** as the unified backend, giving you centralized key management,
cost tracking, model switching, and request logging across every tool.

---

## How It Works

```
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Kiro / Cursor / Copilot
           │
           ▼  (all point to OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute routes to the right provider)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...
```

**Benefits:**

- One API key to manage all tools
- Cost tracking across all CLIs in the dashboard
- Model switching without reconfiguring every tool
- Works locally and on remote servers (VPS)

---

## Supported Tools (Dashboard Source of Truth)

The dashboard cards in `/dashboard/cli-tools` are generated from `src/shared/constants/cliTools.ts`.
Current list (v3.0.0-rc.16):

| Tool               | ID            | Command    | Setup Mode | Install Method |
| ------------------ | ------------- | ---------- | ---------- | -------------- |
| **Claude Code**    | `claude`      | `claude`   | env        | npm            |
| **OpenAI Codex**   | `codex`       | `codex`    | custom     | npm            |
| **Factory Droid**  | `droid`       | `droid`    | custom     | bundled/CLI    |
| **OpenClaw**       | `openclaw`    | `openclaw` | custom     | bundled/CLI    |
| **Cursor**         | `cursor`      | app        | guide      | desktop app    |
| **Cline**          | `cline`       | `cline`    | custom     | npm            |
| **Kilo Code**      | `kilo`        | `kilocode` | custom     | npm            |
| **Continue**       | `continue`    | extension  | guide      | VS Code        |
| **Antigravity**    | `antigravity` | internal   | mitm       | OmniRoute      |
| **GitHub Copilot** | `copilot`     | extension  | custom     | VS Code        |
| **OpenCode**       | `opencode`    | `opencode` | guide      | npm            |
| **Kiro AI**        | `kiro`        | app/cli    | mitm       | desktop/CLI    |
| **Qwen Code**      | `qwen`        | `qwen`     | custom     | npm            |

### CLI fingerprint sync (Agents + Settings)

`/dashboard/agents` and `Settings > CLI Fingerprint` use `src/shared/constants/cliCompatProviders.ts`.
This keeps provider IDs aligned with CLI cards and legacy IDs.

| CLI ID                                                                                               | Fingerprint Provider ID |
| ---------------------------------------------------------------------------------------------------- | ----------------------- |
| `kilo`                                                                                               | `kilocode`              |
| `copilot`                                                                                            | `github`                |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | same ID                 |

Legacy IDs still accepted for compatibility: `copilot`, `kimi-coding`, `qwen`.

---

## Step 1 — Get an OmniRoute API Key

1. Open the OmniRoute dashboard → **API Manager** (`/dashboard/api-manager`)
2. Click **Create API Key**
3. Give it a name (e.g. `cli-tools`) and select all permissions
4. Copy the key — you'll need it for every CLI below

> Your key looks like: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

## Step 2 — Install CLI Tools

All npm-based tools require Node.js 18+:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Kiro CLI (Amazon — requires curl + unzip)
apt-get install -y unzip   # on Debian/Ubuntu
curl -fsSL https://cli.kiro.dev/install | bash
export PATH="$HOME/.local/bin:$PATH"   # add to ~/.bashrc
```

**Verify:**

```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
```

---

## Step 3 — Set Global Environment Variables

Add to `~/.bashrc` (or `~/.zshrc`), then run `source ~/.bashrc`:

```bash
# OmniRoute Universal Endpoint
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> For a **remote server** replace `localhost:20128` with the server IP or domain,
> e.g. `http://192.168.0.15:20128`.

---

## Step 4 — Configure Each Tool

### Claude Code

```bash
# Create ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Use the unified Anthropic gateway root for Claude Code. Do not append `/v1` here.

**Test:** `claude "say hello"`

---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:** `codex "what is 2+2?"`

---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**Test:** `opencode`

---

### Cline (CLI or VS Code)

**CLI mode:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code mode:**
Cline extension settings → API Provider: `OpenAI Compatible` → Base URL: `http://localhost:20128/v1`

Or use the OmniRoute dashboard → **CLI Tools → Cline → Apply Config**.

---

### KiloCode (CLI or VS Code)

**CLI mode:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code settings:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Or use the OmniRoute dashboard → **CLI Tools → KiloCode → Apply Config**.

---

### Continue (VS Code Extension)

Edit `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Restart VS Code after editing.

---

### Kiro CLI (Amazon)

```bash
# Login to your AWS/Kiro account:
kiro-cli login

# The CLI uses its own auth — OmniRoute is not needed as backend for Kiro CLI itself.
# Use kiro-cli alongside OmniRoute for other tools.
kiro-cli status
```

---

### Qwen Code (Alibaba)

Qwen Code supports OpenAI-compatible API endpoints via environment variables or `settings.json`.

**Option 1: Environment variables (`~/.qwen/.env`)**

```bash
mkdir -p ~/.qwen && cat > ~/.qwen/.env << EOF
OPENAI_API_KEY="sk-your-omniroute-key"
OPENAI_BASE_URL="http://localhost:20128/v1"
OPENAI_MODEL="auto"
EOF
```

**Option 2: `settings.json` with model providers**

```json
// ~/.qwen/settings.json
{
  "env": {
    "OPENAI_API_KEY": "sk-your-omniroute-key",
    "OPENAI_BASE_URL": "http://localhost:20128/v1"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "omniroute-default",
        "name": "OmniRoute (Auto)",
        "envKey": "OPENAI_API_KEY",
        "baseUrl": "http://localhost:20128/v1"
      }
    ]
  }
}
```

**Option 3: Inline CLI flags**

```bash
OPENAI_BASE_URL="http://localhost:20128/v1" \
OPENAI_API_KEY="sk-your-omniroute-key" \
OPENAI_MODEL="auto" \
qwen
```

> For a **remote server** replace `localhost:20128` with the server IP or domain.

**Test:** `qwen "say hello"`

### Cursor (Desktop App)

> **Note:** Cursor routes requests through its cloud. For OmniRoute integration,
> enable **Cloud Endpoint** in OmniRoute Settings and use your public domain URL.

Via GUI: **Settings → Models → OpenAI API Key**

- Base URL: `https://your-domain.com/v1`
- API Key: your OmniRoute key

---

## Dashboard Auto-Configuration

The OmniRoute dashboard automates configuration for most tools:

1. Go to `http://localhost:20128/dashboard/cli-tools`
2. Expand any tool card
3. Select your API key from the dropdown
4. Click **Apply Config** (if tool is detected as installed)
5. Or copy the generated config snippet manually

---

## Built-in Agents: Droid & OpenClaw

**Droid** and **OpenClaw** are AI agents built directly into OmniRoute — no installation needed.
They run as internal routes and use OmniRoute's model routing automatically.

- Access: `http://localhost:20128/dashboard/agents`
- Configure: same combos and providers as all other tools
- No API key or CLI install required

---

## Available API Endpoints

| Endpoint                   | Description                   | Use For                     |
| -------------------------- | ----------------------------- | --------------------------- |
| `/v1/chat/completions`     | Standard chat (all providers) | All modern tools            |
| `/v1/responses`            | Responses API (OpenAI format) | Codex, agentic workflows    |
| `/v1/completions`          | Legacy text completions       | Older tools using `prompt:` |
| `/v1/embeddings`           | Text embeddings               | RAG, search                 |
| `/v1/images/generations`   | Image generation              | GPT-Image, Flux, etc.       |
| `/v1/audio/speech`         | Text-to-speech                | ElevenLabs, OpenAI TTS      |
| `/v1/audio/transcriptions` | Speech-to-text                | Deepgram, AssemblyAI        |

### CLI Tools API (New in v3.8)

| Endpoint                        | Method | Description                                      |
| ------------------------------- | ------ | ------------------------------------------------ |
| `/api/cli-tools/detect`         | GET    | Detect all installed CLI tools and config status |
| `/api/cli-tools/detect?tool=ID` | GET    | Detect a specific tool by ID                     |
| `/api/cli-tools/config`         | GET    | List generated configs for all tools             |
| `/api/cli-tools/config`         | POST   | Generate config for a specific tool              |
| `/api/cli-tools/apply`          | POST   | Apply config to a tool (with backup)             |

---

## CLI Commands Reference (New in v3.8)

### `omniroute config`

Manage CLI tool configurations directly from the terminal.

```bash
omniroute config list                    # List all tools and config status
omniroute config get <tool>              # Show config for a specific tool
omniroute config set <tool> \            # Generate and write config
  --api-key sk-your-key \
  [--base-url http://localhost:20128/v1] \
  [--model auto]
omniroute config validate <tool>         # Validate config without writing
```

**Options:** `--base-url`, `--api-key`, `--model`, `--json`, `--non-interactive`, `--yes`, `--help`

### `omniroute status`

Show offline status dashboard with version, database, and tool info.

```bash
omniroute status              # Human-readable status
omniroute status --json       # JSON output
omniroute status --verbose    # Include tool detection details
```

### `omniroute logs`

Stream usage logs from the API endpoint.

```bash
omniroute logs                        # Fetch last 100 log lines
omniroute logs --follow               # Stream in real-time
omniroute logs --filter error,warn    # Filter by level
omniroute logs --lines 500            # Fetch more lines
omniroute logs --base-url http://localhost:20128
```

**Options:** `--follow`, `--filter`, `--lines`, `--timeout`, `--base-url`, `--json`, `--help`

### `omniroute update`

Check for or apply OmniRoute updates.

```bash
omniroute update --check              # Check for updates only
omniroute update --dry-run            # Preview update without applying
omniroute update --yes                # Apply update without prompt
omniroute update --no-backup          # Skip backup creation
```

**Options:** `--check`, `--dry-run`, `--backup`, `--no-backup`, `--yes`, `--help`

### `omniroute provider`

Manage provider connections from the CLI.

```bash
omniroute provider add openai --api-key sk-xxx    # Add a provider
omniroute provider list                            # List all providers
omniroute provider remove <name|id>                # Remove a provider
omniroute provider test <name|id>                  # Test connectivity
omniroute provider default <name|id>               # Set default provider
```

**Options:** `--provider`, `--api-key`, `--provider-name`, `--default-model`, `--base-url`, `--json`, `--yes`, `--help`

---

## Quick Setup Script (One Command)

Set up all CLI tools and configure for OmniRoute:

```bash
OMNIROUTE_URL="http://localhost:20128/v1"
OMNIROUTE_ANTHROPIC_URL="http://localhost:20128"
OMNIROUTE_KEY="sk-your-omniroute-key"

npm install -g @anthropic-ai/claude-code @openai/codex opencode-ai cline kilocode @qwen-code/qwen-code

# Kiro CLI
apt-get install -y unzip 2>/dev/null; curl -fsSL https://cli.kiro.dev/install | bash

# Write configs
mkdir -p ~/.claude ~/.codex ~/.config/opencode ~/.continue

cat > ~/.claude/settings.json   <<< "{\"env\":{\"ANTHROPIC_BASE_URL\":\"$OMNIROUTE_ANTHROPIC_URL\",\"ANTHROPIC_AUTH_TOKEN\":\"$OMNIROUTE_KEY\"}}"
cat > ~/.codex/config.yaml      <<< "model: auto\napiKey: $OMNIROUTE_KEY\napiBaseUrl: $OMNIROUTE_URL"
cat >> ~/.bashrc << EOF
export OPENAI_BASE_URL="$OMNIROUTE_URL"
export OPENAI_API_KEY="$OMNIROUTE_KEY"
export ANTHROPIC_BASE_URL="$OMNIROUTE_ANTHROPIC_URL"
export ANTHROPIC_AUTH_TOKEN="$OMNIROUTE_KEY"
EOF

source ~/.bashrc
echo "✅ All CLIs installed and configured for OmniRoute"
```

```bash
# Install all CLIs and configure for OmniRoute (replace with your key and server URL)
OMNIROUTE_URL="http://localhost:20128/v1"
OMNIROUTE_ANTHROPIC_URL="http://localhost:20128"
OMNIROUTE_KEY="sk-your-omniroute-key"

npm install -g @anthropic-ai/claude-code @openai/codex opencode-ai cline kilocode @qwen-code/qwen-code

# Kiro CLI
apt-get install -y unzip 2>/dev/null; curl -fsSL https://cli.kiro.dev/install | bash

# Write configs
mkdir -p ~/.claude ~/.codex ~/.config/opencode ~/.continue

cat > ~/.claude/settings.json   <<< "{\"env\":{\"ANTHROPIC_BASE_URL\":\"$OMNIROUTE_ANTHROPIC_URL\",\"ANTHROPIC_AUTH_TOKEN\":\"$OMNIROUTE_KEY\"}}"
cat > ~/.codex/config.yaml      <<< "model: auto\napiKey: $OMNIROUTE_KEY\napiBaseUrl: $OMNIROUTE_URL"
cat >> ~/.bashrc << EOF
export OPENAI_BASE_URL="$OMNIROUTE_URL"
export OPENAI_API_KEY="$OMNIROUTE_KEY"
export ANTHROPIC_BASE_URL="$OMNIROUTE_ANTHROPIC_URL"
export ANTHROPIC_AUTH_TOKEN="$OMNIROUTE_KEY"
EOF

source ~/.bashrc
echo "✅ All CLIs installed and configured for OmniRoute"
```
