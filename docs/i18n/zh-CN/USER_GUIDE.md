# 用户指南

🌐 **语言:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md) | 🇨🇿 [Čeština](../cs/USER_GUIDE.md)

配置提供商、创建 Combo、集成 CLI 工具以及部署 OmniRoute 的完整指南。

---

## 目录

- [价格概览](#-价格概览)
- [使用场景](#-使用场景)
- [提供商配置](#-提供商配置)
- [CLI 集成](#-cli-集成)
- [部署](#-部署)
- [可用模型](#-可用模型)
- [高级功能](#-高级功能)

---

## 💰 价格概览

| 层级                | 提供商            | 费用        | 配额重置         | 适用人群             |
| ------------------- | ----------------- | ----------- | ---------------- | -------------------- |
| **💳 订阅**         | Claude Code (Pro) | $20/月      | 5小时 + 每周     | 已订阅用户           |
|                     | Codex (Plus/Pro)  | $20-200/月  | 5小时 + 每周     | OpenAI 用户          |
|                     | Gemini CLI        | **免费**    | 18万/月 + 1千/天 | 所有人！             |
|                     | GitHub Copilot    | $10-19/月   | 每月             | GitHub 用户          |
| **🔑 API 密钥**     | DeepSeek          | 按量付费    | 无               | 低成本推理           |
|                     | Groq              | 按量付费    | 无               | 超快推理             |
|                     | xAI (Grok)        | 按量付费    | 无               | Grok 4 推理          |
|                     | Mistral           | 按量付费    | 无               | 欧盟托管模型         |
|                     | Perplexity        | 按量付费    | 无               | 搜索增强             |
|                     | Together AI       | 按量付费    | 无               | 开源模型             |
|                     | Fireworks AI      | 按量付费    | 无               | 快速 FLUX 图像       |
|                     | Cerebras          | 按量付费    | 无               | 晶圆级速度           |
|                     | Cohere            | 按量付费    | 无               | Command R+ RAG       |
|                     | NVIDIA NIM        | 按量付费    | 无               | 企业级模型           |
| **💰 低价**         | GLM-4.7           | $0.6/1M     | 每日上午10点     | 预算备用             |
|                     | MiniMax M2.1      | $0.2/1M     | 5小时滚动        | 最便宜选项           |
|                     | Kimi K2           | $9/月固定   | 1000万 token/月  | 可预测成本           |
| **🆓 免费**         | Qoder             | $0          | 无限制           | 8个免费模型          |
|                     | Qwen              | $0          | 无限制           | 3个免费模型          |
|                     | Kiro              | $0          | 无限制           | Claude 免费          |

**💡 专业提示：** 从 Gemini CLI（每月18万免费）+ Qoder（无限免费）组合开始 = $0 成本！

---

## 🎯 使用场景

### 场景 1："我有 Claude Pro 订阅"

**问题：** 配额过期未使用，高强度编码时遇到速率限制

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        （充分使用订阅）
  2. glm/glm-4.7               （配额用尽时的低价备用）
  3. if/kimi-k2-thinking       （免费紧急后备）

月费用：$20（订阅）+ ~$5（备用）= 总计 $25
对比：$20 + 触及限制 = 沮丧
```

### 场景 2："我想零成本"

**问题：** 负担不起订阅，但需要可靠的 AI 编程

```
Combo: "free-forever"
  1. gc/gemini-3-flash         （每月 18 万免费）
  2. if/kimi-k2-thinking       （无限免费）
  3. qw/qwen3-coder-plus       （无限免费）

月费用：$0
质量：生产级模型
```

### 场景 3："我需要 24/7 编程，不能中断"

**问题：** 截止日期紧迫，无法承受停机

```
Combo: "always-on"
  1. cc/claude-opus-4-6        （最佳质量）
  2. cx/gpt-5.2-codex          （第二订阅）
  3. glm/glm-4.7               （低价，每日重置）
  4. minimax/MiniMax-M2.1      （最便宜，5小时重置）
  5. if/kimi-k2-thinking       （免费无限）

结果：5 层后备 = 零停机
月费用：$20-200（订阅）+ $10-20（备用）
```

### 场景 4："我想在 OpenClaw 中使用免费 AI"

**问题：** 需要在聊天应用中使用 AI 助手，完全免费

```
Combo: "openclaw-free"
  1. if/glm-4.7                （无限免费）
  2. if/minimax-m2.1           （无限免费）
  3. if/kimi-k2-thinking       （无限免费）

月费用：$0
访问方式：WhatsApp、Telegram、Slack、Discord、iMessage、Signal...
```

---

## 📖 提供商配置

### 🔐 订阅类提供商

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth 登录 → 自动刷新 Token
→ 5 小时 + 每周配额追踪

模型：
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**专业提示：** 复杂任务使用 Opus，追求速度使用 Sonnet。OmniRoute 为每个模型追踪配额！

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth 登录（端口 1455）
→ 5 小时 + 每周重置

模型：
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI（每月 18 万免费！）

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 每月 18 万次补全 + 每日 1 千次

模型：
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**最佳性价比：** 超大免费额度！优先使用此提供商。

#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ 通过 GitHub OAuth
→ 每月重置（每月 1 日）

模型：
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 低价提供商

#### GLM-4.7（每日重置，$0.6/1M）

1. 注册：[智谱 AI](https://open.bigmodel.cn/)
2. 从 Coding Plan 获取 API 密钥
3. Dashboard → Add API Key：提供商：`glm`，API Key：`your-key`

**使用：** `glm/glm-4.7` — **专业提示：** Coding Plan 提供 3 倍配额，仅 1/7 成本！每日上午 10:00 重置。

#### MiniMax M2.1（5 小时重置，$0.20/1M）

1. 注册：[MiniMax](https://www.minimax.io/)
2. 获取 API 密钥 → Dashboard → Add API Key

**使用：** `minimax/MiniMax-M2.1` — **专业提示：** 长上下文（1M tokens）最便宜的选择！

#### Kimi K2（固定 $9/月）

1. 订阅：[Moonshot AI](https://platform.moonshot.ai/)
2. 获取 API 密钥 → Dashboard → Add API Key

**使用：** `kimi/kimi-latest` — **专业提示：** 固定 $9/月获得 1000 万 tokens = 有效成本 $0.90/1M！

### 🆓 免费提供商

#### Qoder（8 个免费模型）

```bash
Dashboard → Connect Qoder → OAuth 登录 → 无限使用

模型：if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen（3 个免费模型）

```bash
Dashboard → Connect Qwen → 设备码认证 → 无限使用

模型：qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro（免费 Claude）

```bash
Dashboard → Connect Kiro → AWS Builder ID 或 Google/GitHub → 无限

模型：kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combos

### 示例 1：最大化订阅 → 低价备用

```
Dashboard → Combos → Create New

名称：premium-coding
模型：
  1. cc/claude-opus-4-6（订阅主力）
  2. glm/glm-4.7（低价备用，$0.6/1M）
  3. minimax/MiniMax-M2.1（最便宜后备，$0.20/1M）

在 CLI 中使用：premium-coding
```

### 示例 2：仅免费（零成本）

```
名称：free-combo
模型：
  1. gc/gemini-3-flash-preview（每月 18 万免费）
  2. if/kimi-k2-thinking（无限）
  3. qw/qwen3-coder-plus（无限）

成本：永久 $0！
```

---

## 🔧 CLI 集成

### Cursor IDE

```
Settings → Models → Advanced：
  OpenAI API Base URL：http://localhost:20128/v1
  OpenAI API Key：[从 omniroute dashboard 获取]
  Model：cc/claude-opus-4-6
```

### Claude Code

编辑 `~/.claude/config.json`：

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/glm-4.7" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
```

**或使用 Dashboard：** CLI Tools → OpenClaw → Auto-config

### Cline / Continue / RooCode

```
Provider：OpenAI Compatible
Base URL：http://localhost:20128/v1
API Key：[从 dashboard 获取]
Model：cc/claude-opus-4-6
```

---

## 🚀 部署

### 全局 npm 安装（推荐）

```bash
npm install -g omniroute

# 创建配置目录
mkdir -p ~/.omniroute

# 创建 .env 文件（参见 .env.example）
cp .env.example ~/.omniroute/.env

# 启动服务器
omniroute
# 或指定端口：
omniroute --port 3000
```

CLI 自动从 `~/.omniroute/.env` 或 `./.env` 加载配置。

### VPS 部署

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# 或：pm2 start npm --name omniroute -- start
```

### PM2 部署（低内存）

对于内存有限的服务器，使用内存限制选项：

```bash
# 默认 512MB 限制
pm2 start npm --name omniroute -- start

# 或自定义内存限制
OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# 或使用 ecosystem.config.js
pm2 start ecosystem.config.js
```

创建 `ecosystem.config.js`：

```javascript
module.exports = {
  apps: [
    {
      name: "omniroute",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        OMNIROUTE_MEMORY_MB: "512",
        JWT_SECRET: "your-secret",
        INITIAL_PASSWORD: "your-password",
      },
      node_args: "--max-old-space-size=512",
      max_memory_restart: "300M",
    },
  ],
};
```

### Docker

```bash
# 构建镜像（默认 = runner-cli，预装 codex/claude/droid）
docker build -t omniroute:cli .

# 便携模式（推荐）
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

关于与主机集成的 CLI 二进制文件模式，请参阅主文档中的 Docker 部分。

### Void Linux (xbps-src)

Void Linux 用户可以使用 `xbps-src` 交叉编译框架原生打包和安装 OmniRoute。这将自动完成 Node.js standalone 构建以及所需的 `better-sqlite3` 原生绑定。

<details>
<summary><b>查看 xbps-src 模板</b></summary>

```bash
# 'omniroute' 模板文件
pkgname=omniroute
version=3.2.4
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
checksum=009400afee90a9f32599d8fe734145cfd84098140b7287990183dde45ae2245b
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	# Determine target CPU arch for node-gyp
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	# 1) Install all deps – skip scripts
	NODE_ENV=development npm ci --ignore-scripts

	# 2) Build the Next.js standalone bundle
	npm run build

	# 3) Copy static assets into standalone
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	# 4) Compile better-sqlite3 native binding
	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	# 5) Place the compiled binding into the standalone bundle
	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	# 6) Remove arch-specific sharp bundles
	rm -rf .next/standalone/node_modules/@img

	# 7) Copy pino runtime deps omitted by Next.js static analysis:
	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	# Prevent removal of empty Next.js app router dirs by the post-install hook
	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export LOG_TO_FILE="${LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

</details>

### 环境变量

| 变量                      | 默认值                               | 描述                                                    |
| ------------------------- | ------------------------------------ | ------------------------------------------------------- |
| `JWT_SECRET`              | `omniroute-default-secret-change-me` | JWT 签名密钥（**生产环境必须更改**）                    |
| `INITIAL_PASSWORD`        | `123456`                             | 首次登录密码                                            |
| `DATA_DIR`                | `~/.omniroute`                       | 数据目录（数据库、用量、日志）                          |
| `PORT`                    | 框架默认值                           | 服务端口（示例中为 `20128`）                            |
| `HOSTNAME`                | 框架默认值                           | 绑定主机（Docker 默认 `0.0.0.0`）                       |
| `NODE_ENV`                | 运行时默认值                         | 部署时设为 `production`                                 |
| `BASE_URL`                | `http://localhost:20128`             | 服务端内部基础 URL                                      |
| `CLOUD_URL`               | `https://omniroute.dev`              | 云同步端点基础 URL                                      |
| `API_KEY_SECRET`          | `endpoint-proxy-api-key-secret`      | 生成 API 密钥的 HMAC 密钥                               |
| `REQUIRE_API_KEY`         | `false`                              | 对 `/v1/*` 强制要求 Bearer API 密钥                     |
| `ALLOW_API_KEY_REVEAL`    | `false`                              | 允许 Api Manager 按需复制完整 API 密钥                  |
| `DISABLE_SQLITE_AUTO_BACKUP` | `false`                           | 在写入/导入/恢复前禁用自动 SQLite 快照；手动备份仍可用  |
| `ENABLE_REQUEST_LOGS`     | `false`                              | 启用请求/响应日志                                       |
| `AUTH_COOKIE_SECURE`      | `false`                              | 强制使用 `Secure` 认证 Cookie（HTTPS 反向代理后）       |
| `CLOUDFLARED_BIN`         | 未设置                               | 使用现有 `cloudflared` 二进制，而不是托管下载           |
| `OMNIROUTE_MEMORY_MB`     | `512`                                | Node.js 堆内存限制（MB）                                |
| `PROMPT_CACHE_MAX_SIZE`   | `50`                                 | 最大提示词缓存条目数                                    |
| `SEMANTIC_CACHE_MAX_SIZE` | `100`                                | 最大语义缓存条目数                                      |

完整环境变量参考请参见 [README](../README.md)。

---

## 📊 可用模型

<details>
<summary><b>查看所有可用模型</b></summary>

**Claude Code (`cc/`)** — Pro/Max：`cc/claude-opus-4-6`、`cc/claude-sonnet-4-5-20250929`、`cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro：`cx/gpt-5.2-codex`、`cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — 免费：`gc/gemini-3-flash-preview`、`gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**：`gh/gpt-5`、`gh/claude-4.5-sonnet`

**GLM (`glm/`)** — $0.6/1M：`glm/glm-4.7`

**MiniMax (`minimax/`)** — $0.2/1M：`minimax/MiniMax-M2.1`

**Qoder (`if/`)** — 免费：`if/kimi-k2-thinking`、`if/qwen3-coder-plus`、`if/deepseek-r1`

**Qwen (`qw/`)** — 免费：`qw/qwen3-coder-plus`、`qw/qwen3-coder-flash`

**Kiro (`kr/`)** — 免费：`kr/claude-sonnet-4.5`、`kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**：`ds/deepseek-chat`、`ds/deepseek-reasoner`

**Groq (`groq/`)**：`groq/llama-3.3-70b-versatile`、`groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**：`xai/grok-4`、`xai/grok-4-0709-fast-reasoning`、`xai/grok-code-mini`

**Mistral (`mistral/`)**：`mistral/mistral-large-2501`、`mistral/codestral-2501`

**Perplexity (`pplx/`)**：`pplx/sonar-pro`、`pplx/sonar`

**Together AI (`together/`)**：`together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**：`fireworks/accounts/fireworks/models/deepseek-v3p1`

**Cerebras (`cerebras/`)**：`cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**：`cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**：`nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 高级功能

### 自定义模型

无需等待应用更新即可为任何提供商添加任意模型 ID：

```bash
# 通过 API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# 列表：curl http://localhost:20128/api/provider-models?provider=openai
# 删除：curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

或使用 Dashboard：**Providers → [提供商] → Custom Models**。

说明：

- OpenRouter 和 OpenAI/Anthropic-compatible 提供商仅通过 **Available Models** 管理。手动添加、导入和自动同步都会写入同一份 available-model 列表，因此这些提供商没有单独的 Custom Models 区块。
- **Custom Models** 区块面向那些不提供托管 available-model 导入的提供商。

### 专用提供商路由

直接将请求路由到特定提供商并进行模型验证：

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

如果缺少提供商前缀则自动添加。模型不匹配时返回 `400`。

### 网络代理配置

```bash
# 设置全局代理
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# 按提供商代理
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# 测试代理
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**优先级：** 密钥级 → Combo 级 → 提供商级 → 全局 → 环境变量。

### 模型目录 API

```bash
curl http://localhost:20128/api/models/catalog
```

返回按提供商分组的模型及类型（`chat`、`embedding`、`image`）。

### 云同步

- 跨设备同步提供商、Combo 和设置
- 自动后台同步，带超时 + 快速失败
- 生产环境优先使用服务端 `BASE_URL`/`CLOUD_URL`

### Cloudflare Quick Tunnel

- 可在 **Dashboard → Endpoints** 中用于 Docker 和其他自托管部署
- 会创建一个临时的 `https://*.trycloudflare.com` URL，并转发到当前 OpenAI 兼容的 `/v1` 端点
- 首次启用时仅在需要时安装 `cloudflared`；之后重启会复用同一个托管二进制文件
- Tunnel URL 是临时的，每次停止/启动隧道都会变化
- 如果你更想使用预装的 `cloudflared`，可以设置 `CLOUDFLARED_BIN`

### LLM 网关智能（第 9 阶段）

- **语义缓存** — 自动缓存非流式、temperature=0 的响应（使用 `X-OmniRoute-No-Cache: true` 绕过）
- **请求幂等性** — 通过 `Idempotency-Key` 或 `X-Request-Id` 头在 5 秒内去重请求
- **进度追踪** — 通过 `X-OmniRoute-Progress: true` 头选择性启用 SSE `event: progress` 事件

---

### 翻译器实验场

通过 **Dashboard → Translator** 访问。调试和可视化 OmniRoute 如何在提供商之间翻译 API 请求。

| 模式             | 用途                                                                           |
| ---------------- | ------------------------------------------------------------------------------ |
| **Playground**   | 选择源/目标格式，粘贴请求，即时查看翻译输出                                    |
| **Chat Tester**  | 通过代理发送实时聊天消息，检查完整的请求/响应周期                              |
| **Test Bench**   | 在多种格式组合中运行批量测试，验证翻译正确性                                   |
| **Live Monitor** | 实时观察请求流经代理时的翻译过程                                               |

**使用场景：**

- 调试特定客户端/提供商组合失败的原因
- 验证 thinking 标签、工具调用和系统提示词是否正确翻译
- 比较 OpenAI、Claude、Gemini 和 Responses API 格式之间的差异

---

### 路由策略

通过 **Dashboard → Settings → Routing** 配置。

| 策略                           | 描述                                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------------------- |
| **Fill First**                 | 按优先级顺序使用账户 — 主账户处理所有请求直到不可用                                      |
| **Round Robin**                | 循环使用所有账户，可配置粘性限制（默认：每账户 3 次调用）                                |
| **P2C (Power of Two Choices)** | 随机选择 2 个账户并路由到更健康的那个 — 健康感知的负载均衡                               |
| **Random**                     | 使用 Fisher-Yates 洗牌为每个请求随机选择账户                                             |
| **Least Used**                 | 路由到 `lastUsedAt` 时间戳最旧的账户，均匀分配流量                                       |
| **Cost Optimized**             | 路由到优先级值最低的账户，优化成本最低的提供商                                           |

#### 外部粘性会话头

用于外部会话亲和性（例如，反向代理后的 Claude Code/Codex 代理），发送：

```http
X-Session-Id: your-session-key
```

OmniRoute 也接受 `x_session_id` 并在 `X-OmniRoute-Session-Id` 中返回有效的会话密钥。

如果使用 Nginx 发送下划线形式的头，需启用：

```nginx
underscores_in_headers on;
```

#### 通配符模型别名

创建通配符模式以重映射模型名称：

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

通配符支持 `*`（任意字符）和 `?`（单个字符）。

#### 后备链

定义适用于所有请求的全局后备链：

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### 弹性与熔断器

通过 **Dashboard → Settings → Resilience** 配置。

OmniRoute 实现了提供商级别的弹性保护，包含四个组件：

1. **提供商配置文件** — 每个提供商的配置：
   - 失败阈值（开启熔断前的失败次数）
   - 冷却持续时间
   - 速率限制检测灵敏度
   - 指数退避参数

2. **可编辑速率限制** — 可在 Dashboard 中配置的系统级默认值：
   - **每分钟请求数 (RPM)** — 每个账户每分钟最大请求数
   - **请求最小间隔** — 请求之间的最小间隔（毫秒）
   - **最大并发请求数** — 每个账户的最大并发请求数
   - 点击 **Edit** 修改，然后 **Save** 或 **Cancel**。值通过弹性 API 持久化。

3. **熔断器** — 按提供商追踪失败次数，达到阈值时自动开启熔断：
   - **CLOSED**（健康）— 请求正常流动
   - **OPEN** — 重复失败后提供商被临时阻止
   - **HALF_OPEN** — 测试提供商是否已恢复

4. **策略与锁定标识符** — 显示熔断器状态和锁定标识符，支持强制解锁。

5. **速率限制自动检测** — 监控 `429` 和 `Retry-After` 头，主动避免触及提供商速率限制。

**专业提示：** 当提供商从故障中恢复时，使用 **Reset All** 按钮清除所有熔断器和冷却状态。

---

### 数据库导出/导入

在 **Dashboard → Settings → System & Storage** 中管理数据库备份。

| 操作                     | 描述                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| **Export Database**      | 将当前 SQLite 数据库下载为 `.sqlite` 文件                                                              |
| **Export All (.tar.gz)** | 下载完整备份归档，包括：数据库、设置、Combo、提供商连接（无凭据）、API 密钥元数据                      |
| **Import Database**      | 上传 `.sqlite` 文件替换当前数据库。导入前会自动创建备份                                                |

```bash
# API：导出数据库
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API：导出全部（完整归档）
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API：导入数据库
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**导入验证：** 导入的文件会验证完整性（SQLite pragma 检查）、必需表（`provider_connections`、`provider_nodes`、`combos`、`api_keys`）和大小（最大 100MB）。

**使用场景：**

- 在机器之间迁移 OmniRoute
- 为灾难恢复创建外部备份
- 在团队成员之间共享配置（导出全部 → 分享归档）

---

### 设置仪表盘

设置页面分为 6 个标签页便于导航：

| 标签页         | 内容                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------- |
| **General**    | 系统存储工具、外观设置、主题控制，以及侧边栏项目的单项可见性                                   |
| **Security**   | 登录/密码设置、IP 访问控制、`/models` API 认证、提供商阻止                                     |
| **Routing**    | 全局路由策略（6 种选项）、通配符模型别名、后备链、Combo 默认值                                 |
| **Resilience** | 提供商配置文件、可编辑速率限制、熔断器状态、策略与锁定标识符                                   |
| **AI**         | Thinking 预算配置、全局系统提示词注入、提示词缓存统计                                          |
| **Advanced**   | 全局代理配置（HTTP/SOCKS5）                                                                    |

---

### 成本与预算管理

通过 **Dashboard → Costs** 访问。

| 标签页      | 用途                                                                             |
| ----------- | -------------------------------------------------------------------------------- |
| **Budget**  | 为每个 API 密钥设置消费限额，支持每日/每周/每月预算和实时追踪                    |
| **Pricing** | 查看和编辑模型定价条目 — 每提供商每 1K 输入/输出 token 的成本                    |

```bash
# API：设置预算
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API：获取当前预算状态
curl http://localhost:20128/api/usage/budget
```

**成本追踪：** 每个请求都会记录 token 用量并使用定价表计算成本。在 **Dashboard → Usage** 中按提供商、模型和 API 密钥查看明细。

---

### 音频转录

OmniRoute 通过 OpenAI 兼容端点支持音频转录：

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# 使用 curl 示例
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

可用提供商：**Deepgram** (`deepgram/`)、**AssemblyAI** (`assemblyai/`)。

支持的音频格式：`mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`。

---

### Combo 均衡策略

在 **Dashboard → Combos → Create/Edit → Strategy** 中配置每个 Combo 的均衡策略。

| 策略               | 描述                                                             |
| ------------------ | ---------------------------------------------------------------- |
| **Round-Robin**    | 按顺序轮流使用模型                                               |
| **Priority**       | 总是先尝试第一个模型；仅在出错时使用后备                         |
| **Random**         | 为每个请求从 Combo 中随机选择一个模型                            |
| **Weighted**       | 根据每个模型分配的权重按比例路由                                 |
| **Least-Used**     | 路由到最近请求最少的模型（使用 Combo 指标）                      |
| **Cost-Optimized** | 路由到最便宜的可用模型（使用定价表）                             |

全局 Combo 默认值可在 **Dashboard → Settings → Routing → Combo Defaults** 中设置。

---

### 健康仪表盘

通过 **Dashboard → Health** 访问。包含 6 张卡片的实时系统健康概览：

| 卡片                  | 显示内容                                                    |
| --------------------- | ----------------------------------------------------------- |
| **System Status**     | 运行时间、版本、内存用量、数据目录                          |
| **Provider Health**   | 每个提供商的熔断器状态（Closed/Open/Half-Open）             |
| **Rate Limits**       | 每个账户的活跃速率限制冷却及剩余时间                        |
| **Active Lockouts**   | 被锁定策略临时阻止的提供商                                  |
| **Signature Cache**   | 去重缓存统计（活跃密钥数、命中率）                          |
| **Latency Telemetry** | 每个提供商的 p50/p95/p99 延迟聚合                           |

**专业提示：** 健康页面每 10 秒自动刷新。使用熔断器卡片识别哪些提供商正在遇到问题。

---

## 🖥️ 桌面应用（Electron）

OmniRoute 提供适用于 Windows、macOS 和 Linux 的原生桌面应用。

### 安装

```bash
# 在 electron 目录中：
cd electron
npm install

# 开发模式（连接到运行中的 Next.js 开发服务器）：
npm run dev

# 生产模式（使用 standalone 构建）：
npm start
```

### 构建安装程序

```bash
cd electron
npm run build          # 当前平台
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

输出目录 → `electron/dist-electron/`

### 主要功能

| 功能                        | 描述                                                 |
| --------------------------- | ---------------------------------------------------- |
| **Server Readiness**        | 显示窗口前轮询服务器（无空白屏幕）                   |
| **System Tray**             | 最小化到托盘、更改端口、从托盘菜单退出               |
| **Port Management**         | 从托盘更改服务器端口（自动重启服务器）               |
| **Content Security Policy** | 通过会话头实现限制性 CSP                             |
| **Single Instance**         | 同一时间只能运行一个应用实例                         |
| **Offline Mode**            | 打包的 Next.js 服务器可离线工作                      |

### 环境变量

| 变量                  | 默认值  | 描述                             |
| --------------------- | ------- | -------------------------------- |
| `OMNIROUTE_PORT`      | `20128` | 服务器端口                       |
| `OMNIROUTE_MEMORY_MB` | `512`   | Node.js 堆内存限制（64–16384 MB）|

📖 完整文档：[`electron/README.md`](../electron/README.md)
