# CLI Tools Setup Guide — OmniRoute (中文（简体）)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLI-TOOLS.md) · 🇪🇸 [es](../../es/docs/CLI-TOOLS.md) · 🇫🇷 [fr](../../fr/docs/CLI-TOOLS.md) · 🇩🇪 [de](../../de/docs/CLI-TOOLS.md) · 🇮🇹 [it](../../it/docs/CLI-TOOLS.md) · 🇷🇺 [ru](../../ru/docs/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLI-TOOLS.md) · 🇯🇵 [ja](../../ja/docs/CLI-TOOLS.md) · 🇰🇷 [ko](../../ko/docs/CLI-TOOLS.md) · 🇸🇦 [ar](../../ar/docs/CLI-TOOLS.md) · 🇮🇳 [hi](../../hi/docs/CLI-TOOLS.md) · 🇮🇳 [in](../../in/docs/CLI-TOOLS.md) · 🇹🇭 [th](../../th/docs/CLI-TOOLS.md) · 🇻🇳 [vi](../../vi/docs/CLI-TOOLS.md) · 🇮🇩 [id](../../id/docs/CLI-TOOLS.md) · 🇲🇾 [ms](../../ms/docs/CLI-TOOLS.md) · 🇳🇱 [nl](../../nl/docs/CLI-TOOLS.md) · 🇵🇱 [pl](../../pl/docs/CLI-TOOLS.md) · 🇸🇪 [sv](../../sv/docs/CLI-TOOLS.md) · 🇳🇴 [no](../../no/docs/CLI-TOOLS.md) · 🇩🇰 [da](../../da/docs/CLI-TOOLS.md) · 🇫🇮 [fi](../../fi/docs/CLI-TOOLS.md) · 🇵🇹 [pt](../../pt/docs/CLI-TOOLS.md) · 🇷🇴 [ro](../../ro/docs/CLI-TOOLS.md) · 🇭🇺 [hu](../../hu/docs/CLI-TOOLS.md) · 🇧🇬 [bg](../../bg/docs/CLI-TOOLS.md) · 🇸🇰 [sk](../../sk/docs/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLI-TOOLS.md) · 🇮🇱 [he](../../he/docs/CLI-TOOLS.md) · 🇵🇭 [phi](../../phi/docs/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLI-TOOLS.md) · 🇨🇿 [cs](../../cs/docs/CLI-TOOLS.md) · 🇹🇷 [tr](../../tr/docs/CLI-TOOLS.md)

---

本指南介绍了如何安装和配置所有受支持的 AI 编码 CLI 工具
使用**OmniRoute**作为统一后端，为您提供集中密钥管理，
跨每个工具的成本跟踪、模型切换和请求日志记录。---

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

**好处：**

- 一个 API 密钥可管理所有工具
- 仪表板中所有 CLI 的成本跟踪
- 模型切换无需重新配置每个工具
- 在本地和远程服务器（VPS）上工作---

## Supported Tools (Dashboard Source of Truth)

“/dashboard/cli-tools”中的仪表板卡是从“src/shared/constants/cliTools.ts”生成的。
当前列表（v3.0.0-rc.16）：

| 工具              | 身份证     | 命令         | 设置模式 | 安装方法     |
| ----------------- | ---------- | ------------ | -------- | ------------ | -------------------------------------------- |
| **克劳德·代码**   | '克劳德'   | '克劳德'     | 环境     | npm          |
| **OpenAI 法典**   | `法典`     | `法典`       | 定制     | npm          |
| **工厂机器人**    | `机器人`   | `机器人`     | 定制     | 捆绑/CLI     |
| **张开爪**        | `张开爪`   | `张开爪`     | 定制     | 捆绑/CLI     |
| **光标**          | `光标`     | 应用程序     | 指南     | 桌面应用程序 |
| **克莱因**        | `克莱因`   | `克莱因`     | 定制     | npm          |
| **公斤代码**      | `公斤`     | `千码`       | 定制     | npm          |
| **继续**          | `继续`     | 延伸         | 指南     | VS 代码      |
| **反重力**        | `反重力`   | 内部         | 中间人   | 全方位路线   |
| **GitHub 副驾驶** | `副驾驶`   | 延伸         | 定制     | VS 代码      |
| **开放代码**      | `开放代码` | `开放代码`   | 指南     | npm          |
| **基罗人工智能**  | `基罗`     | 应用程序/cli | 中间人   | 桌面/CLI     | ### CLI fingerprint sync (Agents + Settings) |

`/dashboard/agents` 和 `Settings > CLI Fingerprint` 使用 `src/shared/constants/cliCompatProviders.ts`。
这使得提供商 ID 与 CLI 卡和旧 ID 保持一致。

| CLI ID                                                                                               | 指纹提供者 ID |
| ---------------------------------------------------------------------------------------------------- | ------------- |
| `公斤`                                                                                               | `千码`        |
| `副驾驶`                                                                                             | `github`      |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `cline` / `opencode` / `droid` / `openclaw` | 相同 ID       |

为了兼容，仍接受旧版 ID：“copilot”、“kimi-coding”、“qwen”。---

## Step 1 — Get an OmniRoute API Key

1. 打开 OmniRoute 仪表板 →**API Manager**(`/dashboard/api-manager`)
2. 点击**创建 API 密钥**
3. 为其命名（例如 `cli-tools`）并选择所有权限
4. 复制密钥 — 下面的每个 CLI 都需要它

> 您的密钥如下所示：`sk-xxxxxxxxxxxxxxx-xxxxxxxxx`---

## Step 2 — Install CLI Tools

所有基于 npm 的工具都需要 Node.js 18+：```bash

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

apt-get install -y unzip # on Debian/Ubuntu
curl -fsSL https://cli.kiro.dev/install | bash
export PATH="$HOME/.local/bin:$PATH" # add to ~/.bashrc

````

**核实：**```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
kiro-cli --version   # 1.x.x
````

---

## Step 3 — Set Global Environment Variables

添加到`~/.bashrc`（或`~/.zshrc`），然后运行`source ~/.bashrc`：```bash

# OmniRoute Universal Endpoint

export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_API_KEY="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"

````

> 对于**远程服务器**将 `localhost:20128` 替换为服务器 IP 或域，
> 例如`http://192.168.0.15:20128`。---

## Step 4 — Configure Each Tool

### Claude Code

```bash
# Via CLI:
claude config set --global api-base-url http://localhost:20128/v1

# Or create ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "apiBaseUrl": "http://localhost:20128/v1",
  "apiKey": "sk-your-omniroute-key"
}
EOF
````

**测试：**`克劳德“打个招呼”`---

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

**测试：**`opencode`---

### Cline (CLI or VS Code)

**命令行模式：**```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
"apiProvider": "openai",
"openAiBaseUrl": "http://localhost:20128/v1",
"openAiApiKey": "sk-your-omniroute-key"
}
EOF

````

**VS 代码模式：**
Cline 扩展设置 → API 提供程序：`OpenAI Compatible` → 基本 URL：`http://localhost:20128/v1`

或者使用 OmniRoute 仪表板 →**CLI 工具 → Cline → 应用配置**。---

### KiloCode (CLI or VS Code)

**命令行模式：**```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
````

**VS 代码设置：**```json
{
"kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
"kilo-code.apiKey": "sk-your-omniroute-key"
}

````

或者使用 OmniRoute 仪表板 →**CLI 工具 → KiloCode → 应用配置**。---

### Continue (VS Code Extension)

编辑`~/.continue/config.yaml`：```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
````

编辑完成后重启VS Code。---

### Kiro CLI (Amazon)

```bash
# Login to your AWS/Kiro account:
kiro-cli login

# The CLI uses its own auth — OmniRoute is not needed as backend for Kiro CLI itself.
# Use kiro-cli alongside OmniRoute for other tools.
kiro-cli status
```

---

### Cursor (Desktop App)

> **注意：**Cursor 通过其云路由请求。对于 OmniRoute 集成，
> 在 OmniRoute 设置中启用**Cloud Endpoint**并使用您的公共域 URL。

通过 GUI：**设置 → 模型 → OpenAI API 密钥**

- 基本 URL：`https://your-domain.com/v1`
- API 密钥：您的 OmniRoute 密钥---

## Dashboard Auto-Configuration

OmniRoute 仪表板可自动配置大多数工具：

1. 转到“http://localhost:20128/dashboard/cli-tools” 2.展开任意工具卡
2. 从下拉列表中选择您的 API 密钥
3. 单击**Apply Config**（如果检测到已安装工具）5.或者手动复制生成的配置片段---

## Built-in Agents: Droid & OpenClaw

**Droid**和**OpenClaw**是直接内置于 OmniRoute 中的 AI 代理 - 无需安装。
它们作为内部路由运行并自动使用 OmniRoute 的模型路由。

- 访问：`http://localhost:20128/dashboard/agents`
- 配置：与所有其他工具相同的组合和提供程序
- 无需安装 API 密钥或 CLI---

## Available API Endpoints

|端点|描述 |用于 |
| -------------------------- | -------------------------------------- | ------------------------ | |
| `/v1/chat/completions` |标准聊天（所有提供商）|所有现代工具|
| `/v1/response` |响应 API（OpenAI 格式）| Codex、代理工作流程 |
| `/v1/completions` |旧版文本补全 |使用“提示：”的旧工具 |
| `/v1/embeddings` |文本嵌入 | RAG，搜索|
| `/v1/images/Generations` |图像生成| DALL-E、助焊剂等 |
| `/v1/音频/语音` |文字转语音 | ElevenLabs、OpenAI TTS |
| `/v1/音频/转录` |语音转文字 | Deepgram、AssemblyAI |---

## 故障排除

| 错误               | 原因                   | 修复                                      |
| ------------------ | ---------------------- | ----------------------------------------- | --- |
| `连接被拒绝`       | OmniRoute 未运行       | `pm2 启动全向`                            |
| `401 未经授权`     | API 密钥错误           | 检查`/dashboard/api-manager`              |
| `没有配置组合`     | 没有活动的路由组合     | 在 `/dashboard/combos` 中设置             |
| `无效模型`         | 型号不在目录中         | 使用 `auto` 或检查 `/dashboard/providers` |
| CLI 显示“未安装”   | 二进制文件不在 PATH 中 | 检查 `which <命令>`                       |
| `kiro-cli：未找到` | 不在路径中             | `导出 PATH="$HOME/.local/bin:$PATH"`      | --- |

## Quick Setup Script (One Command)

```bash
# Install all CLIs and configure for OmniRoute (replace with your key and server URL)
OMNIROUTE_URL="http://localhost:20128/v1"
OMNIROUTE_KEY="sk-your-omniroute-key"

npm install -g @anthropic-ai/claude-code @openai/codex opencode-ai cline kilocode

# Kiro CLI
apt-get install -y unzip 2>/dev/null; curl -fsSL https://cli.kiro.dev/install | bash

# Write configs
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
echo "✅ All CLIs installed and configured for OmniRoute"
```
