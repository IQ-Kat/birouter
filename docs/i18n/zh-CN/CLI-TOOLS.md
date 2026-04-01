🌐 **语言:** 🇺🇸 [English](../../CLI-TOOLS.md) · 🇧🇷 [pt-BR](../pt-BR/CLI-TOOLS.md) · 🇪🇸 [es](../es/CLI-TOOLS.md) · 🇫🇷 [fr](../fr/CLI-TOOLS.md) · 🇩🇪 [de](../de/CLI-TOOLS.md) · 🇮🇹 [it](../it/CLI-TOOLS.md) · 🇷🇺 [ru](../ru/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../zh-CN/CLI-TOOLS.md) · 🇯🇵 [ja](../ja/CLI-TOOLS.md) · 🇰🇷 [ko](../ko/CLI-TOOLS.md) · 🇸🇦 [ar](../ar/CLI-TOOLS.md)

# CLI 工具配置指南 — OmniRoute

本指南说明如何安装和配置所有支持的 AI 编程 CLI 工具，以使用 **OmniRoute** 作为统一后端，为您提供集中化的密钥管理、成本跟踪、模型切换以及所有工具的请求日志记录。

---

## 工作原理

```
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Kiro / Cursor / Copilot
           │
           ▼  (所有工具指向 OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute 路由到正确的服务商)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...
```

**优势:**

- 一个 API 密钥管理所有工具
- 在仪表盘中跨所有 CLI 跟踪成本
- 无需重新配置每个工具即可切换模型
- 本地和远程服务器 (VPS) 均可使用

---

## 支持的工具（以仪表盘为准）

仪表盘中 `/dashboard/cli-tools` 的卡片由 `src/shared/constants/cliTools.ts` 生成。
当前列表 (v3.0.0-rc.16):

| 工具              | ID            | 命令         | 配置模式 | 安装方式     |
| ----------------- | ------------- | ------------ | -------- | ------------ |
| **Claude Code**   | `claude`      | `claude`     | env      | npm          |
| **OpenAI Codex**  | `codex`       | `codex`      | custom   | npm          |
| **Factory Droid** | `droid`       | `droid`      | custom   | 内置/CLI     |
| **OpenClaw**      | `openclaw`    | `openclaw`   | custom   | 内置/CLI     |
| **Cursor**        | `cursor`      | app          | guide    | 桌面应用     |
| **Cline**         | `cline`       | `cline`      | custom   | npm          |
| **Kilo Code**     | `kilo`        | `kilocode`   | custom   | npm          |
| **Continue**      | `continue`    | extension    | guide    | VS Code      |
| **Antigravity**   | `antigravity` | internal     | mitm     | OmniRoute    |
| **GitHub Copilot**| `copilot`     | extension    | custom   | VS Code      |
| **OpenCode**      | `opencode`    | `opencode`   | guide    | npm          |
| **Kiro AI**       | `kiro`        | app/cli      | mitm     | 桌面/CLI     |

### CLI 指纹同步（代理 + 设置）

`/dashboard/agents` 和 `Settings > CLI Fingerprint` 使用 `src/shared/constants/cliCompatProviders.ts`。
这确保服务商 ID 与 CLI 卡片和旧版 ID 保持一致。

| CLI ID | 指纹服务商 ID |
| ------ | ------------- |
| `kilo` | `kilocode`    |
| `copilot` | `github`   |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | 相同 ID |

为兼容性保留的旧版 ID：`copilot`、`kimi-coding`、`qwen`。

---

## 第 1 步 — 获取 OmniRoute API 密钥

1. 打开 OmniRoute 仪表盘 → **API Manager** (`/dashboard/api-manager`)
2. 点击 **Create API Key**
3. 命名（例如 `cli-tools`）并选择所有权限
4. 复制密钥 — 下面的每个 CLI 都需要使用

> 密钥格式类似：`sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

## 第 2 步 — 安装 CLI 工具

所有基于 npm 的工具需要 Node.js 18+：

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

# Kiro CLI (Amazon — 需要 curl + unzip)
apt-get install -y unzip   # Debian/Ubuntu
curl -fsSL https://cli.kiro.dev/install | bash
export PATH="$HOME/.local/bin:$PATH"   # 添加到 ~/.bashrc
```

**验证:**

```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (或: kilo --version)
kiro-cli --version   # 1.x.x
```

---

## 第 3 步 — 设置全局环境变量

添加到 `~/.bashrc`（或 `~/.zshrc`），然后运行 `source ~/.bashrc`：

```bash
# OmniRoute 统一端点
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> 对于**远程服务器**，将 `localhost:20128` 替换为服务器 IP 或域名，
> 例如 `http://192.168.0.15:20128`。

---

## 第 4 步 — 配置各工具

### Claude Code

```bash
# 通过 CLI:
claude config set --global api-base-url http://localhost:20128/v1

# 或创建 ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "apiBaseUrl": "http://localhost:20128/v1",
  "apiKey": "sk-your-omniroute-key"
}
EOF
```

**测试:** `claude "say hello"`

---

### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**测试:** `codex "what is 2+2?"`

---

### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/config.toml << EOF
[provider.openai]
base_url = "http://localhost:20128/v1"
api_key = "sk-your-omniroute-key"
EOF
```

**测试:** `opencode`

---

### Cline (CLI 或 VS Code)

**CLI 模式:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code 模式:**
Cline 扩展设置 → API Provider: `OpenAI Compatible` → Base URL: `http://localhost:20128/v1`

或使用 OmniRoute 仪表盘 → **CLI Tools → Cline → Apply Config**。

---

### KiloCode (CLI 或 VS Code)

**CLI 模式:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code 设置:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

或使用 OmniRoute 仪表盘 → **CLI Tools → KiloCode → Apply Config**。

---

### Continue (VS Code 扩展)

编辑 `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

编辑后重启 VS Code。

---

### Kiro CLI (Amazon)

```bash
# 登录您的 AWS/Kiro 账户:
kiro-cli login

# CLI 使用自有认证 — Kiro CLI 本身不需要 OmniRoute 作为后端。
# 将 kiro-cli 与其他工具的 OmniRoute 一起使用。
kiro-cli status
```

---

### Cursor (桌面应用)

> **注意:** Cursor 通过其云端路由请求。对于 OmniRoute 集成，
> 在 OmniRoute Settings 中启用 **Cloud Endpoint** 并使用您的公共域名 URL。

通过 GUI: **Settings → Models → OpenAI API Key**

- Base URL: `https://your-domain.com/v1`
- API Key: 您的 OmniRoute 密钥

---

## 仪表盘自动配置

OmniRoute 仪表盘可自动配置大多数工具：

1. 前往 `http://localhost:20128/dashboard/cli-tools`
2. 展开任意工具卡片
3. 从下拉菜单选择您的 API 密钥
4. 点击 **Apply Config**（如果检测到工具已安装）
5. 或手动复制生成的配置片段

---

## 内置代理：Droid & OpenClaw

**Droid** 和 **OpenClaw** 是直接内置于 OmniRoute 的 AI 代理 — 无需安装。
它们作为内部路由运行，自动使用 OmniRoute 的模型路由。

- 访问：`http://localhost:20128/dashboard/agents`
- 配置：与所有其他工具使用相同的组合和服务商
- 无需 API 密钥或 CLI 安装

---

## 可用 API 端点

| 端点                       | 描述                     | 用途                       |
| -------------------------- | ------------------------ | -------------------------- |
| `/v1/chat/completions`     | 标准聊天（所有服务商）   | 所有现代工具               |
| `/v1/responses`            | Responses API（OpenAI 格式）| Codex、代理工作流        |
| `/v1/completions`          | 旧版文本补全             | 使用 `prompt:` 的旧工具    |
| `/v1/embeddings`           | 文本嵌入                 | RAG、搜索                  |
| `/v1/images/generations`   | 图像生成                 | DALL-E、Flux 等            |
| `/v1/audio/speech`         | 文本转语音               | ElevenLabs、OpenAI TTS     |
| `/v1/audio/transcriptions` | 语音转文字               | Deepgram、AssemblyAI       |

---

## 故障排除

| 错误                      | 原因                  | 解决方案                                   |
| ------------------------- | --------------------- | ------------------------------------------ |
| `Connection refused`      | OmniRoute 未运行      | `pm2 start omniroute`                      |
| `401 Unauthorized`        | API 密钥错误          | 在 `/dashboard/api-manager` 检查          |
| `No combo configured`     | 无活动路由组合        | 在 `/dashboard/combos` 设置               |
| `invalid model`           | 模型不在目录中        | 使用 `auto` 或检查 `/dashboard/providers` |
| CLI 显示 "not installed"  | 二进制文件不在 PATH 中| 检查 `which <command>`                     |
| `kiro-cli: not found`     | 不在 PATH 中          | `export PATH="$HOME/.local/bin:$PATH"`     |

---

## 快速设置脚本（一条命令）

```bash
# 安装所有 CLI 并为 OmniRoute 配置（替换为您的密钥和服务器 URL）
OMNIROUTE_URL="http://localhost:20128/v1"
OMNIROUTE_KEY="sk-your-omniroute-key"

npm install -g @anthropic-ai/claude-code @openai/codex opencode-ai cline kilocode

# Kiro CLI
apt-get install -y unzip 2>/dev/null; curl -fsSL https://cli.kiro.dev/install | bash

# 写入配置
mkdir -p ~/.claude ~/.codex ~/.config/opencode ~/.continue

cat > ~/.claude/settings.json   <<< "{\"apiBaseUrl\":\"$OMNIROUTE_URL\",\"apiKey\":\"$OMNIROUTE_KEY\"}"
cat > ~/.codex/config.yaml      <<< "model: auto\napiKey: $OMNIROUTE_KEY\napiBaseUrl: $OMNIROUTE_URL"
cat >> ~/.bashrc << EOF
export OPENAI_BASE_URL="$OMNIROUTE_URL"
export OPENAI_API_KEY="$OMNIROUTE_KEY"
export ANTHROPIC_BASE_URL="$OMNIROUTE_URL"
export ANTHROPIC_API_KEY="$OMNIROUTE_KEY"
EOF

source ~/.bashrc
echo "✅ 所有 CLI 已安装并配置为使用 OmniRoute"
```
