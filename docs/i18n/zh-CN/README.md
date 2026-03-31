# 🚀 OmniRoute — 免费 AI 网关

🌐 **语言:** 🇺🇸 [English](../../../README.md) · 🇪🇸 [es](../es/README.md) · 🇫🇷 [fr](../fr/README.md) · 🇩🇪 [de](../de/README.md) · 🇮🇹 [it](../it/README.md) · 🇷🇺 [ru](../ru/README.md) · 🇨🇳 [zh-CN](../zh-CN/README.md) · 🇯🇵 [ja](../ja/README.md) · 🇰🇷 [ko](../ko/README.md) · 🇸🇦 [ar](../ar/README.md) · 🇮🇳 [in](../in/README.md) · 🇹🇭 [th](../th/README.md) · 🇻🇳 [vi](../vi/README.md) · 🇮🇩 [id](../id/README.md) · 🇲🇾 [ms](../ms/README.md) · 🇳🇱 [nl](../nl/README.md) · 🇵🇱 [pl](../pl/README.md) · 🇸🇪 [sv](../sv/README.md) · 🇳🇴 [no](../no/README.md) · 🇩🇰 [da](../da/README.md) · 🇫🇮 [fi](../fi/README.md) · 🇵🇹 [pt](../pt/README.md) · 🇷🇴 [ro](../ro/README.md) · 🇭🇺 [hu](../hu/README.md) · 🇧🇬 [bg](../bg/README.md) · 🇸🇰 [sk](../sk/README.md) · 🇺🇦 [uk-UA](../uk-UA/README.md) · 🇮🇱 [he](../he/README.md) · 🇵🇭 [phi](../phi/README.md) · 🇧🇷 [pt-BR](../pt-BR/README.md)

---

### 永不停止编码。智能路由到**免费和低成本 AI 模型**，自动后备。

_您的通用 API 代理 — 一个端点，67+ 个提供商，零停机。现已支持 **MCP 和 A2A** 智能体编排。_

**聊天完成 • Embedding • 图像生成 • 视频 • 音乐 • 音频 • 重排序 • **Web 搜索** • MCP Server • A2A 协议 • 100% TypeScript**

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![npm downloads](https://img.shields.io/npm/dm/omniroute?color=cb3837&logo=npm&label=npm%20downloads)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?logo=docker&color=2496ED&label=docker%20pulls)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 网站](https://omniroute.online) • [🚀 快速开始](#-快速开始) • [💡 功能](#-主要功能) • [📖 文档](#-文档) • [💰 定价](#-定价一览) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **可用语言:** 🇺🇸 [English](../../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md) | 🇨🇿 [Čeština](../cs/README.md)

---

## 破坏性变更：统一日志升级

> [!WARNING]
> **此版本重新设计了磁盘上的请求日志布局以及日志相关环境变量。**
>
> 如果你正在升级现有实例：
>
> - 请求日志现在位于 `DATA_DIR/call_logs/YYYY-MM-DD/`，并以**每个请求一个 JSON artifact** 的形式存储。
> - 旧的 `DATA_DIR/logs/` 会话目录和 `DATA_DIR/log.txt` 汇总文件已被移除。
> - 升级后的首次启动时，OmniRoute 会先在 `DATA_DIR/log_archives/*.zip` 中创建安全备份，再删除旧日志布局。
> - 旧版日志环境变量如 `LOG_TO_FILE`、`LOG_FILE_PATH`、`LOG_MAX_FILE_SIZE`、`LOG_RETENTION_DAYS`、`LOG_LEVEL`、`LOG_FORMAT`、`ENABLE_REQUEST_LOGS`、`CALL_LOGS_MAX`、`CALL_LOG_PAYLOAD_MODE` 和 `PROXY_LOG_MAX_ENTRIES` 已不再支持。
> - 请改用新的环境变量模型：
>   - `APP_LOG_TO_FILE`
>   - `APP_LOG_FILE_PATH`
>   - `APP_LOG_MAX_FILE_SIZE`
>   - `APP_LOG_RETENTION_DAYS`
>   - `APP_LOG_LEVEL`
>   - `APP_LOG_FORMAT`
>   - `CALL_LOG_RETENTION_DAYS`
>
> 详细发布信息和升级说明请参阅 [CHANGELOG](../../../CHANGELOG.md)。

---

## 🆕 v3.0.0 新功能

> **从 v2.9.5 升级？** — 查看[完整更新日志](../../../CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main)了解所有更改。

| 领域                      | 更改                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 🔒 **CodeQL 安全**        | 修复了 10+ 个 CodeQL 警报：polynomial-redos、insecure-randomness、shell-injection 修复                                         |
| ✅ **路由验证**           | 所有 176 个 API 路由现已使用 Zod 模式 + `validateBody()` 验证 — CI `check:route-validation:t06` 通过                           |
| 🐛 **omniModel 标签泄露** | 内部 `<omniModel>` 标签不再泄露到 SSE 流式响应中的客户端 (#585)                                                                |
| 🔑 **注册密钥 API**       | 通过 `POST /api/v1/registered-keys` 自动配置 API 密钥，支持每提供商/账户配额执行、幂等性、SHA-256 存储和可选 GitHub issue 报告 |
| 🎨 **提供商图标**         | 通过 `@lobehub/icons` (SVG) 提供 130+ 个提供商 Logo，带 PNG → 通用后备链                                                       |
| 🔄 **模型自动同步**       | 24 小时调度器和手动 UI 切换，用于同步内置和自定义 OpenAI 兼容提供商的模型列表                                                  |
| 🌐 **OpenCode Zen/Go**    | 来自 @kang-heewon 通过 PR #530 的两个新提供商：免费层 + 订阅层，通过 `OpencodeExecutor`                                        |
| 🐛 **Gemini CLI OAuth**   | Docker 中缺少 `GEMINI_OAUTH_CLIENT_SECRET` 时的可操作错误（之前是晦涩的 Google 错误）                                          |
| 🐛 **OpenCode 配置**      | `saveOpenCodeConfig()` 现在正确写入 TOML 到 `XDG_CONFIG_HOME`                                                                  |
| 🐛 **固定模型覆盖**       | `body.model` 在上下文缓存保护时正确设置为 `pinnedModel`                                                                        |
| 🐛 **Codex/Claude 循环**  | `tool_result` 块现在转换为文本以停止无限循环                                                                                   |
| 🐛 **登录重定向**         | 跳过密码设置后登录不再冻结                                                                                                     |
| 🐛 **Windows 路径**       | MSYS2/Git-Bash 路径 (`/c/...`) 自动规范化为 `C:\...`                                                                           |

---

## 🖼️ 主仪表盘

<div align="center">
  <img src="../../../docs/screenshots/MainOmniRoute.png" alt="OmniRoute 仪表盘" width="800"/>
</div>

---

## 📸 仪表盘预览

<details>
<summary><b>点击查看仪表盘截图</b></summary>

| 页面         | 截图                                                    |
| ------------ | ------------------------------------------------------- |
| **提供商**   | ![提供商](../../../docs/screenshots/01-providers.png)   |
| **Combo**    | ![Combo](../../../docs/screenshots/02-combos.png)       |
| **分析**     | ![分析](../../../docs/screenshots/03-analytics.png)     |
| **健康**     | ![健康](../../../docs/screenshots/04-health.png)        |
| **翻译器**   | ![翻译器](../../../docs/screenshots/05-translator.png)  |
| **设置**     | ![设置](../../../docs/screenshots/06-settings.png)      |
| **CLI 工具** | ![CLI 工具](../../../docs/screenshots/07-cli-tools.png) |
| **使用日志** | ![使用](../../../docs/screenshots/08-usage.png)         |
| **端点**     | ![端点](../../../docs/screenshots/09-endpoint.png)      |

</details>

---

### 🤖 为您喜爱的编码智能体提供免费 AI 提供商

_通过 OmniRoute 连接任何 AI 驱动的 IDE 或 CLI 工具 — 无限编码的免费 API 网关。_

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
          <img src="../../../public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="../../../public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="../../../public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="../../../public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="../../../public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="../../../public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="../../../public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="../../../public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="../../../public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="../../../public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 所有智能体通过 <code>http://localhost:20128/v1</code> 或 <code>http://cloud.omniroute.online/v1</code> 连接 — 一个配置，无限模型和配额</sub>

---

## 🤔 为什么选择 OmniRoute？

**停止浪费金钱和碰到限制：**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> 订阅配额每月未使用就过期
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> 速率限制让你在编码中途停止
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> 昂贵的 API（每个提供商 $20-50/月）
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> 手动在提供商之间切换

**OmniRoute 解决这些问题：**

- ✅ **最大化订阅** - 追踪配额，在重置前用完每一点
- ✅ **自动后备** - 订阅 → API 密钥 → 便宜 → 免费，零停机
- ✅ **多账户** - 每个提供商多账户轮询
- ✅ **通用** - 适用于 Claude Code、Codex、Gemini CLI、Cursor、Cline、OpenClaw、任何 CLI 工具

---

## 📧 支持

> 💬 **加入我们的社区！** [WhatsApp 群组](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — 获取帮助、分享技巧并保持更新。

- **网站**：[omniroute.online](https://omniroute.online)
- **GitHub**：[github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Issues**：[github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**：[社区群组](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **贡献**：查看 [CONTRIBUTING.md](../../../CONTRIBUTING.md)，开启 PR，或选择一个 `good first issue`
- **原始项目**：[9router by decolua](https://github.com/decolua/9router)

### 🐛 报告 Bug？

开启 issue 时，请运行系统信息命令并附上生成的文件：

```bash
npm run system-info
```

这会生成一个 `system-info.txt`，包含你的 Node.js 版本、OmniRoute 版本、操作系统详情、已安装的 CLI 工具（iflow、gemini、claude、codex、antigravity、droid 等）、Docker/PM2 状态和系统包 — 我们快速重现问题所需的一切。直接将文件附加到你的 GitHub issue。

---

## 🔄 工作原理

```
┌─────────────┐
│  你的 CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│    工具     │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute（智能路由器）         │
│  • 格式翻译（OpenAI ↔ Claude）           │
│  • 配额追踪 + Embedding + 图像           │
│  • 自动 Token 刷新                       │
└──────┬──────────────────────────────────┘
       │
       ├─→ [层级 1：订阅] Claude Code, Codex, Gemini CLI
       │   ↓ 配额耗尽
       ├─→ [层级 2：API 密钥] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM 等
       │   ↓ 预算限制
       ├─→ [层级 3：便宜] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ 预算限制
       └─→ [层级 4：免费] Qoder、Qwen、Kiro（无限）

结果：永不停止编码，最小成本
```

---

## 🎯 OmniRoute 解决的问题 — 30 个真实痛点和用例

> **每个使用 AI 工具的开发者每天都面临这些问题。** OmniRoute 旨在解决所有问题 — 从成本超支到区域封锁，从损坏的 OAuth 流程到协议操作和企业可观测性。

<details>
<summary><b>💸 1. "我为昂贵的订阅付费，但仍然被限制打断"</b></summary>

开发者每月为 Claude Pro、Codex Pro 或 GitHub Copilot 支付 $20–200。即使付费，配额也有上限 — 5 小时使用、每周限制或每分钟速率限制。在编码会话中途，提供商停止响应，开发者失去心流和生产力。

**OmniRoute 如何解决：**

- **智能 4 层后备** — 如果订阅配额用完，自动重定向到 API 密钥 → 便宜 → 免费，零手动干预
- **实时配额追踪** — 显示实时 Token 消耗和重置倒计时（5h、每日、每周）
- **多账户支持** — 每个提供商多账户自动轮询 — 当一个用完时，切换到下一个
- **自定义 Combo** — 可自定义的后备链，6 种平衡策略（填充优先、轮询、P2C、随机、最少使用、成本优化）
- **Codex 商业配额** — 直接在仪表盘中监控商业/团队工作区配额

</details>

<details>
<summary><b>🔌 2. "我需要使用多个提供商，但每个都有不同的 API"</b></summary>

OpenAI 使用一种格式，Claude（Anthropic）使用另一种，Gemini 又是另一种。如果开发者想测试来自不同提供商的模型或在它们之间后备，他们需要重新配置 SDK、更改端点、处理不兼容的格式。自定义提供商（FriendLI、NIM）有非标准的模型端点。

**OmniRoute 如何解决：**

- **统一端点** — 单个 `http://localhost:20128/v1` 作为所有 67+ 个提供商的代理
- **格式翻译** — 自动且透明：OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **响应清理** — 剥离破坏 OpenAI SDK v1.83+ 的非标准字段（`x_groq`、`usage_breakdown`、`service_tier`）
- **角色规范化** — 为非 OpenAI 提供商转换 `developer` → `system`；为 GLM/ERNIE 转换 `system` → `user`
- **Think 标签提取** — 从 DeepSeek R1 等模型中提取 `<think>` 块到标准化的 `reasoning_content`
- **Gemini 结构化输出** — `json_schema` → `responseMimeType`/`responseSchema` 自动转换
- **`stream` 默认为 `false`** — 与 OpenAI 规范对齐，避免 Python/Rust/Go SDK 中意外的 SSE

</details>

<details>
<summary><b>🌐 3. "我的 AI 提供商封锁了我的地区/国家"</b></summary>

OpenAI/Codex 等提供商封锁来自某些地理区域的访问。用户在 OAuth 和 API 连接期间收到 `unsupported_country_region_territory` 等错误。这对来自发展中国家的开发者尤其令人沮丧。

**OmniRoute 如何解决：**

- **3 级代理配置** — 3 个级别的可配置代理：全局（所有流量）、每提供商（仅一个提供商）和每连接/密钥
- **颜色编码代理徽章** — 可视化指示器：🟢 全局代理、🟡 提供商代理、🔵 连接代理，始终显示 IP
- **通过代理的 OAuth Token 交换** — OAuth 流程也通过代理，解决 `unsupported_country_region_territory`
- **通过代理的连接测试** — 连接测试使用配置的代理（不再直接绕过）
- **SOCKS5 支持** — 完整的 SOCKS5 代理支持用于出站路由
- **TLS 指纹伪装** — 通过 `wreq-js` 实现类浏览器 TLS 指纹以绕过机器人检测
- **🔏 CLI 指纹匹配** — 重新排序请求头和请求体字段以匹配原生 CLI 二进制签名，大幅降低账户标记风险。代理 IP 被保留 — 你同时获得隐身**和** IP 掩蔽

</details>

<details>
<summary><b>🆓 4. "我想使用 AI 编码但没钱"</b></summary>

并非每个人都能每月支付 $20–200 的 AI 订阅费用。学生、来自新兴国家的开发者、业余爱好者和自由职业者需要以零成本访问优质模型。

**OmniRoute 如何解决：**

- **内置免费层提供商** — 原生支持 100% 免费提供商：Qoder（通过 OAuth 的 5 个无限模型：kimi-k2-thinking、qwen3-coder-plus、deepseek-r1、minimax-m2、kimi-k2）、Qwen（4 个无限模型：qwen3-coder-plus、qwen3-coder-flash、qwen3-coder-next、vision-model）、Kiro（免费的 Claude + AWS Builder ID）、Gemini CLI（每月 180K Token 免费）
- **Ollama Cloud** — `api.ollama.com` 上的云托管 Ollama 模型，带免费"轻度使用"层级；使用 `ollamacloud/<model>` 前缀
- **纯免费 Combo** — 链接 `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/月，零停机
- **NVIDIA NIM 免费访问** — 在 build.nvidia.com 上永久免费开发访问 70+ 个模型，约 40 RPM（从积分过渡到纯速率限制）
- **成本优化策略** — 自动选择最便宜可用提供商的路由策略

</details>

<details>
<summary><b>🔒 5. "我需要保护我的 AI 网关免受未授权访问"</b></summary>

将 AI 网关暴露到网络（LAN、VPS、Docker）时，任何有地址的人都可以消耗开发者的 Token/配额。没有保护，API 容易被滥用、提示词注入和滥用。

**OmniRoute 如何解决：**

- **API 密钥管理** — 在专用的 `/dashboard/api-manager` 页面按提供商生成、轮换和范围界定
- **模型级权限** — 将 API 密钥限制为特定模型（`openai/*`、通配符模式），带允许全部/限制切换
- **API 端点保护** — `/v1/models` 需要密钥，并从列表中阻止特定提供商
- **认证守卫 + CSRF 保护** — 所有 Dashboard 路由都使用 `withAuth` 中间件 + CSRF Token 保护
- **速率限制器** — 每 IP 速率限制，可配置时间窗口
- **IP 过滤** — 白名单/黑名单用于访问控制
- **提示词注入守卫** — 针对恶意提示词模式的清理
- **AES-256-GCM 加密** — 静态凭证加密

</details>

<details>
<summary><b>🛑 6. "我的提供商宕机，我失去了编码心流"</b></summary>

AI 提供商可能变得不稳定、返回 5xx 错误或达到临时速率限制。如果开发者依赖单个提供商，他们会被中断。没有熔断器，重复重试可能会使应用程序崩溃。

**OmniRoute 如何解决：**

- **每模型熔断器** — 使用可配置阈值和冷却自动打开/关闭（Closed/Open/Half-Open），按模型范围界定以避免级联阻塞
- **指数退避** — 渐进式重试延迟
- **防惊群** — 互斥锁 + 信号量保护，防止并发重试风暴
- **Combo 后备链** — 如果主提供商失败，自动通过链条后备，无需干预
- **Combo 熔断器** — 自动禁用 Combo 链中失败的提供商
- **健康仪表盘** — 正常运行时间监控、熔断器状态、锁定、缓存统计、p50/p95/p99 延迟

</details>

<details>
<summary><b>🔧 7. "配置每个 AI 工具既繁琐又重复"</b></summary>

开发者使用 Cursor、Claude Code、Codex CLI、OpenClaw、Gemini CLI、Kilo Code... 每个工具需要不同的配置（API 端点、密钥、模型）。切换提供商或模型时重新配置浪费时间。

**OmniRoute 如何解决：**

- **CLI 工具仪表盘** — 专用页面，一键设置 Claude Code、Codex CLI、OpenClaw、Kilo Code、Antigravity、Cline
- **GitHub Copilot 配置生成器** — 为 VS Code 生成 `chatLanguageModels.json`，批量选择模型
- **入门向导** — 为首次用户提供指导的 4 步设置
- **一个端点，所有模型** — 配置一次 `http://localhost:20128/v1`，访问 67+ 个提供商

</details>

<details>
<summary><b>🔑 8. "管理来自多个提供商的 OAuth Token 是地狱"</b></summary>

Claude Code、Codex、Gemini CLI、Copilot — 全部使用带过期 Token 的 OAuth 2.0。开发者需要不断重新认证，处理 `client_secret is missing`、`redirect_uri_mismatch` 和远程服务器上的失败。LAN/VPS 上的 OAuth 尤其成问题。

**OmniRoute 如何解决：**

- **自动 Token 刷新** — OAuth Token 在过期前在后台刷新
- **内置 OAuth 2.0（PKCE）** — Claude Code、Codex、Gemini CLI、Copilot、Kiro、Qwen、Qoder 的自动流程
- **多账户 OAuth** — 通过 JWT/ID Token 提取的每提供商多账户
- **OAuth LAN/远程修复** — `redirect_uri` 的私有 IP 检测 + 远程服务器的手动 URL 模式
- **Nginx 后的 OAuth** — 使用 `window.location.origin` 实现反向代理兼容性
- **远程 OAuth 指南** — VPS/Docker 上 Google Cloud 凭证的分步指南

</details>

<details>
<summary><b>📊 9. "我不知道花了多少钱或花在哪里"</b></summary>

开发者使用多个付费提供商但没有统一的支出视图。每个提供商都有自己的计费仪表盘，但没有合并视图。意外成本可能会累积。

**OmniRoute 如何解决：**

- **成本分析仪表盘** — 每提供商的每 Token 成本追踪和预算管理
- **每层级预算限制** — 每层级支出上限，触发自动后备
- **每模型定价配置** — 每模型可配置价格
- **每 API 密钥使用统计** — 每密钥的请求计数和最后使用时间戳
- **分析仪表盘** — 统计卡、模型使用图表、带成功率和延迟的提供商表

</details>

<details>
<summary><b>🐛 10. "我无法诊断 AI 调用中的错误和问题"</b></summary>

当调用失败时，开发者不知道是速率限制、过期 Token、错误格式还是提供商错误。不同终端的分散日志。没有可观测性，调试就是试错。

**OmniRoute 如何解决：**

- **统一日志仪表盘** — 4 个标签页：请求日志、代理日志、审计日志、控制台
- **控制台日志查看器** — 实时终端风格查看器，带颜色编码级别、自动滚动、搜索、过滤
- **SQLite 代理日志** — 持久化日志，在服务器重启后保留
- **翻译器游乐场** — 4 种调试模式：游乐场（格式翻译）、聊天测试器（往返）、测试台（批量）、实时监控（实时）
- **请求遥测** — p50/p95/p99 延迟 + X-Request-Id 追踪
- **基于文件的日志轮换** — 控制台拦截器捕获所有内容到 JSON 日志，基于大小轮换
- **系统信息报告** — `npm run system-info` 生成 `system-info.txt`，包含完整环境（Node 版本、OmniRoute 版本、操作系统、CLI 工具、Docker/PM2 状态）。报告问题时附上它以获得即时分类。

</details>

<details>
<summary><b>🏗️ 11. "部署和维护网关很复杂"</b></summary>

在不同环境（本地、VPS、Docker、云）中安装、配置和维护 AI 代理非常耗费人力。硬编码路径、目录上的 `EACCES`、端口冲突和跨平台构建等问题增加了摩擦。

**OmniRoute 如何解决：**

- **npm 全局安装** — `npm install -g omniroute && omniroute` — 完成
- **Docker 多平台** — AMD64 + ARM64 原生支持（Apple Silicon、AWS Graviton、Raspberry Pi）
- **Docker Compose Profiles** — `base`（无 CLI 工具）和 `cli`（带 Claude Code、Codex、OpenClaw）
- **Electron 桌面应用** — Windows/macOS/Linux 原生应用，带系统托盘、自动启动、离线模式
- **分离端口模式** — API 和 Dashboard 在不同端口上用于高级场景（反向代理、容器网络）
- **云同步** — 通过 Cloudflare Workers 跨设备配置同步
- **数据库备份** — 自动备份、恢复、导出和导入所有设置

</details>

<details>
<summary><b>🌍 12. "界面仅英文，我的团队不会说英语"</b></summary>

非英语国家的团队，尤其是拉丁美洲、亚洲和欧洲的团队，在纯英语界面上挣扎。语言障碍降低了采用率并增加了配置错误。

**OmniRoute 如何解决：**

- **Dashboard i18n — 30 种语言** — 所有 500+ 个键已翻译，包括阿拉伯语、保加利亚语、丹麦语、德语、西班牙语、芬兰语、法语、希伯来语、印地语、匈牙利语、印度尼西亚语、意大利语、日语、韩语、马来语、荷兰语、挪威语、波兰语、葡萄牙语（PT/BR）、罗马尼亚语、俄语、斯洛伐克语、瑞典语、泰语、乌克兰语、越南语、中文、菲律宾语、英语
- **RTL 支持** — 阿拉伯语和希伯来语的从右到左支持
- **多语言 README** — 30 个完整文档翻译
- **语言选择器** — 头部的地球图标可实时切换

</details>

<details>
<summary><b>🔄 13. "我需要的不仅是聊天 — 我需要嵌入、图像、音频"</b></summary>

AI 不仅仅是聊天补全。开发者需要生成图像、转录音频、为 RAG 创建嵌入、重新排序文档和审核内容。每个 API 都有不同的端点和格式。

**OmniRoute 如何解决：**

- **Embeddings** — `/v1/embeddings`，6 个提供商和 9+ 个模型
- **图像生成** — `/v1/images/generations`，10 个提供商和 20+ 个模型（OpenAI、xAI、Together、Fireworks、Nebius、Hyperbolic、NanoBanana、Antigravity、SD WebUI、ComfyUI）
- **文本转视频** — `/v1/videos/generations` — ComfyUI（AnimateDiff、SVD）和 SD WebUI
- **文本转音乐** — `/v1/music/generations` — ComfyUI（Stable Audio Open、MusicGen）
- **音频转录** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM、HuggingFace、Qwen3
- **文本转语音** — `/v1/audio/speech` — ElevenLabs、Nvidia NIM、HuggingFace、Coqui、Tortoise、Qwen3、**Inworld**、**Cartesia**、**PlayHT** + 现有提供商
- **Moderations** — `/v1/moderations` — 内容安全检查
- **Reranking** — `/v1/rerank` — 文档相关性重新排序
- **Responses API** — 完整的 `/v1/responses` 支持 Codex

</details>

<details>
<summary><b>🧪 14. "我无法测试和比较模型质量"</b></summary>

开发者想知道哪个模型最适合他们的用例 — 代码、翻译、推理 — 但手动比较很慢。不存在集成的评估工具。

**OmniRoute 如何解决：**

- **LLM 评估** — 黄金集测试，预加载 10 个案例，涵盖问候、数学、地理、代码生成、JSON 合规性、翻译、Markdown、安全拒绝
- **4 种匹配策略** — `exact`、`contains`、`regex`、`custom`（JS 函数）
- **翻译器游乐场测试台** — 批量测试多个输入和预期输出，跨提供商比较
- **聊天测试器** — 完整往返，带视觉响应渲染
- **实时监控** — 通过代理流动的所有请求的实时流

</details>

<details>
<summary><b>📈 15. "我需要在不损失性能的情况下扩展"</b></summary>

随着请求量增长，没有缓存，相同的问题会产生重复成本。没有幂等性，重复请求浪费处理。必须遵守每提供商的速率限制。

**OmniRoute 如何解决：**

- **语义缓存** — 两层缓存（签名 + 语义）降低成本和延迟
- **请求幂等性** — 5 秒去重窗口用于相同请求
- **速率限制检测** — 每提供商的 RPM、最小间隙和最大并发追踪
- **可编辑速率限制** — 设置 → 弹性中的可配置默认值，带持久化
- **API 密钥验证缓存** — 3 层缓存用于生产性能
- **健康仪表盘与遥测** — p50/p95/p99 延迟、缓存统计、正常运行时间

</details>

<details>
<summary><b>🤖 16. "我想全局控制模型行为"</b></summary>

希望所有响应都使用特定语言、特定语气或限制推理 Token 的开发者。在每个工具/请求中配置这些不切实际。

**OmniRoute 如何解决：**

- **系统提示词注入** — 应用于所有请求的全局提示词
- **思考预算验证** — 每请求的推理 Token 分配控制（直通、自动、自定义、自适应）
- **6 种路由策略** — 确定请求如何分发的全局策略
- **通配符路由器** — `provider/*` 模式动态路由到任何提供商
- **Combo 启用/禁用切换** — 直接从仪表盘切换 Combo
- **提供商切换** — 一键启用/禁用提供商的所有连接
- **被阻止的提供商** — 从 `/v1/models` 列表中排除特定提供商

</details>

<details>
<summary><b>🧰 17. "我需要 MCP 工具作为一级产品功能"</b></summary>

许多 AI 网关仅将 MCP 作为隐藏的实现细节公开。团队需要可见、可管理的操作层。

**OmniRoute 如何解决：**

- MCP 出现在仪表盘导航和端点协议标签中
- 专用 MCP 管理页面，带进程、工具、范围和审计
- `omniroute --mcp` 和客户端入门的内置快速启动

</details>

<details>
<summary><b>🧠 18. "我需要带同步 + 流任务路径的 A2A 编排"</b></summary>

代理工作流需要直接回复和带生命周期控制的长期流执行。

**OmniRoute 如何解决：**

- A2A JSON-RPC 端点（`POST /a2a`），带 `message/send` 和 `message/stream`
- SSE 流，带终端状态传播
- 任务生命周期 API：`tasks/get` 和 `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "我需要真实的 MCP 进程健康，而不是猜测的状态"</b></summary>

运营团队需要知道 MCP 是否真的活着，而不仅仅是 API 是否可达。

**OmniRoute 如何解决：**

- 运行时心跳文件，带 PID、时间戳、传输、工具计数和范围模式
- MCP 状态 API，结合心跳 + 最近活动
- UI 状态卡，用于进程/正常运行时间/心跳新鲜度

</details>

<details>
<summary><b>📋 20. "我需要可审计的 MCP 工具执行"</b></summary>

当工具改变配置或触发操作时，团队需要取证可追溯性。

**OmniRoute 如何解决：**

- 基于 SQLite 的 MCP 工具调用审计日志
- 按工具、成功/失败、API 密钥和分页过滤
- Dashboard 审计表 + 用于自动化的统计端点

</details>

<details>
<summary><b>🔐 21. "我需要每个集成的范围化 MCP 权限"</b></summary>

不同的客户端应该具有对工具类别的最小权限访问。

**OmniRoute 如何解决：**

- 9 个粒度化的 MCP 范围用于受控工具访问
- MCP 管理 UI 中的范围强制和可见性
- 用于操作工具的安全默认姿态

</details>

<details>
<summary><b>⚙️ 22. "我需要无需重新部署的操作控制"</b></summary>

团队在事件或成本事件期间需要快速运行时更改。

**OmniRoute 如何解决：**

- 直接从 MCP 仪表盘切换 Combo 激活
- 从预定义策略包应用弹性配置文件
- 从同一操作面板重置熔断器状态

</details>

<details>
<summary><b>🔄 23. "我需要实时 A2A 任务生命周期可见性和取消"</b></summary>

没有生命周期可见性，任务事件变得难以分类。

**OmniRoute 如何解决：**

- 按状态/技能列出/过滤任务，带分页
- 钻取任务元数据、事件和工件
- 任务取消端点和 UI 操作，带确认

</details>

<details>
<summary><b>🌊 24. "我需要 A2A 负载的活动流指标"</b></summary>

流工作流需要对并发和实时连接的操作洞察。

**OmniRoute 如何解决：**

- 活动流计数器集成到 A2A 状态中
- 最后任务时间戳和每状态计数
- A2A 仪表盘卡用于实时运维监控

</details>

<details>
<summary><b>🪪 25. "我需要客户端的标准代理发现"</b></summary>

外部客户端和编排器需要机器可读的元数据以进行入门。

**OmniRoute 如何解决：**

- 在 `/.well-known/agent.json` 公开代理卡
- 管理 UI 中显示的功能和技能
- A2A 状态 API 包括用于自动化的发现元数据

</details>

<details>
<summary><b>🧭 26. "我需要产品 UX 中的协议可发现性"</b></summary>

如果用户无法发现协议界面，采用率和支持质量会下降。

**OmniRoute 如何解决：**

- 合并的**端点**页面，带 Proxy、MCP、A2A 和 API 端点的标签页
- MCP 和 A2A 的内联服务状态切换（在线/离线）
- 从概览到专用管理标签的链接

</details>

<details>
<summary><b>🧪 27. "我需要使用真实客户端进行端到端协议验证"</b></summary>

模拟测试不足以在发布前验证协议兼容性。

**OmniRoute 如何解决：**

- E2E 套件启动应用并使用真实的 MCP SDK 客户端传输
- A2A 客户端测试，用于发现、发送、流、获取和取消流程
- 针对 MCP 审计和 A2A 任务 API 的交叉检查断言

</details>

<details>
<summary><b>📡 28. "我需要跨所有界面的统一可观测性"</b></summary>

按协议拆分可观测性会产生盲点并延长 MTTR。

**OmniRoute 如何解决：**

- 统一仪表盘/日志/分析在一个产品中
- OpenAI、MCP 和 A2A 层的健康 + 审计 + 请求遥测
- 用于状态和自动化的操作 API

</details>

<details>
<summary><b>💼 29. "我需要一个运行时用于代理 + 工具 + 代理编排"</b></summary>

运行许多单独的服务会增加操作成本和故障模式。

**OmniRoute 如何解决：**

- OpenAI 兼容代理、MCP 服务器和 A2A 服务器在一个堆栈中
- 共享认证、弹性、数据存储和可观测性
- 跨所有交互界面的一致策略模型

</details>

<details>
<summary><b>🚀 30. "我需要在没有胶水代码蔓延的情况下交付代理工作流"</b></summary>

团队在拼接多个临时服务和脚本时失去速度。

**OmniRoute 如何解决：**

- 为客户端和代理提供统一的端点策略
- 内置协议管理 UI 和冒烟验证路径
- 生产就绪的基础（安全、日志、弹性、备份）

</details>

### 示例行动手册（集成用例）

**行动手册 A：最大化付费订阅 + 便宜备份**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

每月成本：$20 + 小额备份支出
结果：更高质量，几乎零中断
```

**行动手册 B：零成本编码堆栈**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

每月成本：$0
结果：稳定的免费编码工作流
```

**行动手册 C：24/7 永久在线后备链**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

结果：对截止日期关键工作负载的深度后备深度
```

**行动手册 D：使用 MCP + A2A 的代理运维**

```txt
1) 启动 MCP 传输（`omniroute --mcp`）用于工具驱动的操作
2) 通过 `message/send` 和 `message/stream` 运行 A2A 任务
3) 通过 /dashboard/endpoint（MCP 和 A2A 标签页）观察
4) 通过内联状态控制切换服务
```

---

## 🆓 免费开始 — 零配置成本

> 在几分钟内以 **$0/月**设置 AI 编码。连接这些免费账户并使用内置的 **Free Stack** Combo。

| 步骤 | 操作                                           | 解锁的提供商                                                  |
| ---- | ---------------------------------------------- | ------------------------------------------------------------- |
| 1    | 连接 **Kiro**（AWS Builder ID OAuth）          | Claude Sonnet 4.5、Haiku 4.5 — **无限**                       |
| 2    | 连接 **Qoder**（Google OAuth）                 | kimi-k2-thinking、qwen3-coder-plus、deepseek-r1... — **无限** |
| 3    | 连接 **Qwen**（设备代码）                      | qwen3-coder-plus、qwen3-coder-flash... — **无限**             |
| 4    | 连接 **Gemini CLI**（Google OAuth）            | gemini-3-flash、gemini-2.5-pro — **180K/月免费**              |
| 5    | `/dashboard/combos` → **Free Stack ($0)** 模板 | 自动轮询所有免费提供商                                        |

**将任何 IDE/CLI 指向：** `http://localhost:20128/v1` · API Key: `any-string` · 完成。

> **可选额外覆盖（也免费）：** Groq API 密钥（30 RPM 免费）、NVIDIA NIM（40 RPM 免费，70+ 个模型）、Cerebras（1M token/天）、LongCat API 密钥（50M tokens/天！）、Cloudflare Workers AI（10K Neurons/天，50+ 个模型）。

## 快速开始

### 1) 安装并运行

```bash
npm install -g omniroute
omniroute
```

> **pnpm 用户：** 安装后运行 `pnpm approve-builds -g` 以启用 `better-sqlite3` 和 `@swc/core` 所需的原生构建脚本：
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # 选择所有包 → 批准
> omniroute
> ```

Dashboard 在 `http://localhost:20128` 打开，API 基础 URL 是 `http://localhost:20128/v1`。

| 命令                    | 描述                                                    |
| ----------------------- | ------------------------------------------------------- |
| `omniroute`             | 启动服务器（`PORT=20128`，API 和 Dashboard 在同一端口） |
| `omniroute --port 3000` | 将规范/API 端口设置为 3000                              |
| `omniroute --mcp`       | 启动 MCP 服务器（stdio 传输）                           |
| `omniroute --no-open`   | 不自动打开浏览器                                        |
| `omniroute --help`      | 显示帮助                                                |

可选的分离端口模式：

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) 连接提供商并创建你的 API 密钥

1. 打开 Dashboard → `Providers` 并连接至少一个提供商（OAuth 或 API 密钥）。
2. 打开 Dashboard → `Endpoints` 并创建一个 API 密钥。
3. （可选）打开 Dashboard → `Combos` 并设置你的后备链。

### 3) 将你的编码工具指向 OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [从端点页面复制]
Model:    if/kimi-k2-thinking（或任何 provider/model 前缀）
```

适用于 Claude Code、Codex CLI、Gemini CLI、Cursor、Cline、OpenClaw、OpenCode 和 OpenAI 兼容的 SDK。

### 4) 启用并验证协议（v2.0）

**MCP（用于工具驱动的操作）：**

```bash
omniroute --mcp
```

然后通过 `stdio` 连接你的 MCP 客户端并测试工具，例如：

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A（用于代理到代理工作流）：**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) 端到端验证一切（推荐）

```bash
npm run test:protocols:e2e
```

此套件针对正在运行的应用验证真实的 MCP 和 A2A 客户端流程。

### 替代方案：从源码运行

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

---

## 🐳 Docker

OmniRoute 在 [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute) 上作为公共 Docker 镜像提供。

**快速运行：**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**使用环境变量文件：**

```bash
# 先复制并编辑 .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**使用 Docker Compose：**

```bash
# 基础 profile（不含 CLI 工具）
docker compose --profile base up -d

# CLI profile（内置 Claude Code、Codex、OpenClaw）
docker compose --profile cli up -d
```

面向 Docker 部署的 Dashboard 现已在 `Dashboard → Endpoints` 中内置一键式 **Cloudflare Quick Tunnel**。首次启用时仅会在需要时下载 `cloudflared`，随后为当前 `/v1` 端点启动一个临时隧道，并将生成的 `https://*.trycloudflare.com/v1` URL 显示在普通公网 URL 下方。

说明：

- Quick Tunnel URL 是临时的，每次重启后都会变化。
- 托管安装当前支持 Linux、macOS 和 Windows 的 `x64` / `arm64`。
- Docker 镜像内置了系统 CA 根证书并将其传递给托管的 `cloudflared`，避免了隧道在容器内启动时的 TLS 信任失败问题。
- 如果你希望 OmniRoute 直接使用现有二进制而不是下载，可以设置 `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`。

**结合 Caddy 使用 Docker Compose（HTTPS 自动 TLS）：**

OmniRoute 可以通过 Caddy 的自动 SSL 配置安全对外暴露。请确保你的域名 DNS A 记录已指向服务器 IP。

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

| 镜像                     | 标签     | 大小   | 说明         |
| ------------------------ | -------- | ------ | ------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | 最新稳定版本 |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250MB | 当前版本     |

---

## 🖥️ Desktop App — 离线且常驻运行

> 🆕 **新功能！** OmniRoute 现已提供适用于 Windows、macOS 和 Linux 的**原生桌面应用**。

将 OmniRoute 作为独立桌面应用运行，无需终端、无需浏览器；对于本地模型也无需联网。基于 Electron 的应用包含：

- 🖥️ **Native Window** — 带系统托盘集成的专用应用窗口
- 🔄 **Auto-Start** — 在系统登录时启动 OmniRoute
- 🔔 **Native Notifications** — 在配额耗尽或提供商出现问题时收到提醒
- ⚡ **One-Click Install** — NSIS（Windows）、DMG（macOS）、AppImage（Linux）
- 🌐 **Offline Mode** — 使用内置服务器即可完全离线运行

### 快速开始

```bash
# 开发模式
npm run electron:dev

# 构建当前平台安装包
npm run electron:build         # 当前平台
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### 系统托盘

最小化后，OmniRoute 会驻留在系统托盘，并提供以下快捷操作：

- 打开 dashboard
- 修改服务端端口
- 退出应用

📖 完整文档：[`electron/README.md`](../../../electron/README.md)

---

## 💰 定价一览

| 层级                | 提供商                      | 成本                         | 配额重置         | 适用场景                           |
| ------------------- | --------------------------- | ---------------------------- | ---------------- | ---------------------------------- |
| **💳 SUBSCRIPTION** | Claude Code (Pro)           | $20/月                       | 5 小时 + 每周    | 已经订阅的用户                     |
|                     | Codex (Plus/Pro)            | $20-200/月                   | 5 小时 + 每周    | OpenAI 用户                        |
|                     | Gemini CLI                  | **免费**                     | 180K/月 + 1K/天  | 所有人                             |
|                     | GitHub Copilot              | $10-19/月                    | 每月             | GitHub 用户                        |
| **🔑 API KEY**      | NVIDIA NIM                  | **免费**（开发期永久）       | 约 40 RPM        | 70+ 个开源模型                     |
|                     | Cerebras                    | **免费**（100 万 tok/天）    | 60K TPM / 30 RPM | 全球最快之一                       |
|                     | Groq                        | **免费**（30 RPM）           | 14.4K RPD        | 超高速 Llama/Gemma                 |
|                     | DeepSeek V3.2               | 每 100 万 $0.27/$1.10        | 无               | 性价比最佳的推理                   |
|                     | xAI Grok-4 Fast             | **每 100 万 $0.20/$0.50** 🆕 | 无               | 最快速度 + tool calling，超低价    |
|                     | xAI Grok-4（standard）      | 每 100 万 $0.20/$1.50 🆕     | 无               | xAI 的旗舰推理模型                 |
|                     | Mistral                     | 免费试用 + 付费              | 有速率限制       | 欧洲 AI                            |
|                     | OpenRouter                  | 按量付费                     | 无               | 聚合 100+ 个模型                   |
| **💰 CHEAP**        | GLM-5（via Z.AI）🆕         | $0.5/100 万                  | 每天 10:00       | 128K 输出，最新旗舰                |
|                     | GLM-4.7                     | $0.6/100 万                  | 每天 10:00       | 预算型备选                         |
|                     | MiniMax M2.5 🆕             | 输入 $0.3/100 万             | 滚动 5 小时      | 推理 + agentic tasks               |
|                     | MiniMax M2.1                | $0.2/100 万                  | 滚动 5 小时      | 最便宜的选择                       |
|                     | Kimi K2.5 (Moonshot API) 🆕 | 按量付费                     | 无               | 直连 Moonshot API                  |
|                     | Kimi K2                     | $9/月固定                    | 1000 万 tok/月   | 成本可预测                         |
| **🆓 FREE**         | Qoder                       | **$0**                       | 无限制           | 5 个模型无限用                     |
|                     | Qwen                        | **$0**                       | 无限制           | 4 个模型无限用                     |
|                     | Kiro                        | **$0**                       | 无限制           | Claude Sonnet/Haiku（AWS Builder） |
|                     | LongCat Flash-Lite 🆕       | **$0**（5000 万 tok/天 🔥）  | 1 RPS            | 地球上最大的免费配额               |
|                     | Pollinations AI 🆕          | **$0**（无需 key）           | 1 次请求/15 秒   | GPT-5、Claude、DeepSeek、Llama 4   |
|                     | Cloudflare Workers AI 🆕    | **$0**（10K Neurons/天）     | 约 150 次响应/天 | 50+ 个模型，全球边缘               |
|                     | Scaleway AI 🆕              | **$0**（总计 100 万 tokens） | 有速率限制       | EU/GDPR，Qwen3 235B，Llama 70B     |

> 🆕 **新增模型（2026 年 3 月）：** Grok-4 Fast 系列价格低至 $0.20/$0.50 每百万 token（基准延迟 1143ms，比 Gemini 2.5 Flash 快约 30%），以及通过 Z.AI 提供、拥有 128K 输出能力的 GLM-5，面向推理的新 MiniMax M2.5，更新定价后的 DeepSeek V3.2，以及通过 Moonshot 直连 API 使用的 Kimi K2.5。

**💡 $0 Combo 栈：完整免费配置**

```
# 🆓 Ultimate Free Stack 2026 — 11 家提供商，永久免费
Kiro (kr/)             → Claude Sonnet/Haiku 无限使用
Qoder (if/)            → kimi-k2-thinking、qwen3-coder-plus、deepseek-r1 无限使用
LongCat Lite (lc/)     → LongCat-Flash-Lite — 每天 5000 万 tokens 🔥
Pollinations (pol/)    → GPT-5、Claude、DeepSeek、Llama 4 — 无需 key
Qwen (qw/)             → qwen3-coder-plus、qwen3-coder-flash、qwen3-coder-next 无限使用
Gemini (gemini/)       → Gemini 2.5 Flash — 每天免费 1500 次请求
Cloudflare AI (cf/)    → Llama 70B、Gemma 3、Mistral — 每天 10K Neurons
Scaleway (scw/)        → Qwen3 235B、Llama 70B — 100 万免费 tokens（EU）
Groq (groq/)           → 超高速 Llama/Gemma — 每天 14.4K 次请求
NVIDIA NIM (nvidia/)   → 70+ 开源模型 — 永久 40 RPM
Cerebras (cerebras/)   → 超高速 Llama/Qwen — 每天 100 万 tokens
```

**零成本，永不中断编码。** 将这些模型配置为一个 OmniRoute combo 后，所有回退都会自动进行，无需手动切换。

---

---

## 🆓 免费模型：你真正能用到的内容

> 以下所有模型都**100% 免费，且不需要信用卡**。当某个配额耗尽时，OmniRoute 会自动在它们之间切换路由，把它们组合起来就能得到一个几乎不会中断的 $0 combo。

### 🔵 CLAUDE MODELS（通过 Kiro 和 AWS Builder ID）

| 模型                | 前缀  | 限额       | 速率限制                  |
| ------------------- | ----- | ---------- | ------------------------- |
| `claude-sonnet-4.5` | `kr/` | **无限制** | 未报告每日上限            |
| `claude-haiku-4.5`  | `kr/` | **无限制** | 未报告每日上限            |
| `claude-opus-4.6`   | `kr/` | **无限制** | 通过 Kiro 使用最新的 Opus |

### 🟢 QODER MODELS（免费 OAuth — 无需信用卡）

| 模型               | 前缀  | 限额       | 速率限制   |
| ------------------ | ----- | ---------- | ---------- |
| `kimi-k2-thinking` | `if/` | **无限制** | 未报告上限 |
| `qwen3-coder-plus` | `if/` | **无限制** | 未报告上限 |
| `deepseek-r1`      | `if/` | **无限制** | 未报告上限 |
| `minimax-m2.1`     | `if/` | **无限制** | 未报告上限 |
| `kimi-k2`          | `if/` | **无限制** | 未报告上限 |

### 🟡 QWEN MODELS（设备码认证）

| 模型                | 前缀  | 限额       | 速率限制       |
| ------------------- | ----- | ---------- | -------------- |
| `qwen3-coder-plus`  | `qw/` | **无限制** | 未报告上限     |
| `qwen3-coder-flash` | `qw/` | **无限制** | 未报告上限     |
| `qwen3-coder-next`  | `qw/` | **无限制** | 未报告上限     |
| `vision-model`      | `qw/` | **无限制** | 多模态（图像） |

### 🟣 GEMINI CLI（Google OAuth）

| 模型                     | 前缀  | 限额                        | 速率限制   |
| ------------------------ | ----- | --------------------------- | ---------- |
| `gemini-3-flash-preview` | `gc/` | **每月 180K tok** + 每天 1K | 按月重置   |
| `gemini-2.5-pro`         | `gc/` | 每月 180K（共享池）         | 高质量模型 |

### ⚫ NVIDIA NIM（免费 API Key — build.nvidia.com）

| 层级        | 每日限额      | 速率限制      | 说明                                       |
| ----------- | ------------- | ------------- | ------------------------------------------ |
| Free（Dev） | 无 token 上限 | **约 40 RPM** | 70+ 个模型；计划在 2025 年中转为纯速率限制 |

热门免费模型：`moonshotai/kimi-k2.5`（Kimi K2.5）、`z-ai/glm4.7`（GLM 4.7）、`deepseek-ai/deepseek-v3.2`（DeepSeek V3.2）、`nvidia/llama-3.3-70b-instruct`、`deepseek/deepseek-r1`

### ⚪ CEREBRAS（免费 API Key — inference.cerebras.ai）

| 层级 | 每日限额               | 速率限制         | 说明                              |
| ---- | ---------------------- | ---------------- | --------------------------------- |
| Free | **每天 100 万 tokens** | 60K TPM / 30 RPM | 全球最快的 LLM 推理之一；每日重置 |

可用免费模型：`llama-3.3-70b`、`llama-3.1-8b`、`deepseek-r1-distill-llama-70b`

### 🔴 GROQ（免费 API Key — console.groq.com）

| 层级 | 每日限额      | 速率限制      | 说明                                 |
| ---- | ------------- | ------------- | ------------------------------------ |
| Free | **14.4K RPD** | 每模型 30 RPM | 无需信用卡；超限时返回 429，不会扣费 |

可用免费模型：`llama-3.3-70b-versatile`、`gemma2-9b-it`、`mixtral-8x7b`、`whisper-large-v3`

### 🔴 LONGCAT AI（免费 API Key — longcat.chat）🆕

| 模型                          | 前缀  | 每日免费额度          | 说明               |
| ----------------------------- | ----- | --------------------- | ------------------ |
| `LongCat-Flash-Lite`          | `lc/` | **5000 万 tokens** 💥 | 史上最大的免费额度 |
| `LongCat-Flash-Chat`          | `lc/` | 500K tokens           | 多轮对话           |
| `LongCat-Flash-Thinking`      | `lc/` | 500K tokens           | 推理 / CoT         |
| `LongCat-Flash-Thinking-2601` | `lc/` | 500K tokens           | 2026 年 1 月版本   |
| `LongCat-Flash-Omni-2603`     | `lc/` | 500K tokens           | 多模态             |

> 公测期间 100% 免费。可在 [longcat.chat](https://longcat.chat) 使用邮箱或手机号注册。每日 UTC 00:00 重置。

### 🟢 POLLINATIONS AI（无需 API Key）🆕

| 模型       | 前缀   | 速率限制   | 背后提供商         |
| ---------- | ------ | ---------- | ------------------ |
| `openai`   | `pol/` | 1 次/15 秒 | GPT-5              |
| `claude`   | `pol/` | 1 次/15 秒 | Anthropic Claude   |
| `gemini`   | `pol/` | 1 次/15 秒 | Google Gemini      |
| `deepseek` | `pol/` | 1 次/15 秒 | DeepSeek V3        |
| `llama`    | `pol/` | 1 次/15 秒 | Meta Llama 4 Scout |
| `mistral`  | `pol/` | 1 次/15 秒 | Mistral AI         |

> ✨ **零门槛：** 无需注册、无需 API key。添加 Pollinations 提供商时把 key 字段留空即可立即使用。

### 🟠 CLOUDFLARE WORKERS AI（免费 API Key — cloudflare.com）🆕

| 层级 | 每日 Neurons | 折算用量                                     | 说明                   |
| ---- | ------------ | -------------------------------------------- | ---------------------- |
| Free | **10,000**   | 约 150 次 LLM 响应 / 500 秒音频 / 15K embeds | 全球边缘网络，50+ 模型 |

热门免费模型：`@cf/meta/llama-3.3-70b-instruct`、`@cf/google/gemma-3-12b-it`、`@cf/openai/whisper-large-v3-turbo`（免费音频！）、`@cf/qwen/qwen2.5-coder-15b-instruct`

> 需要来自 [dash.cloudflare.com](https://dash.cloudflare.com) 的 API Token 和 Account ID。请在 provider settings 中保存 Account ID。

### 🟣 SCALEWAY AI（100 万免费 Tokens — scaleway.com）🆕

| 层级 | 免费额度          | 地区         | 说明               |
| ---- | ----------------- | ------------ | ------------------ |
| Free | **100 万 tokens** | 🇫🇷 Paris, EU | 在限额内无需信用卡 |

可用免费模型：`qwen3-235b-a22b-instruct-2507`（Qwen3 235B！）、`llama-3.1-70b-instruct`、`mistral-small-3.2-24b-instruct-2506`、`deepseek-v3-0324`

> 符合 EU/GDPR。可在 [console.scaleway.com](https://console.scaleway.com) 获取 API key。

> **💡 Ultimate Free Stack（11 家提供商，永久免费）：**
>
> ```
> Kiro (kr/)             → Claude Sonnet/Haiku 无限使用
> Qoder (if/)            → kimi-k2-thinking、qwen3-coder-plus、deepseek-r1 无限使用
> LongCat Lite (lc/)     → LongCat-Flash-Lite — 每天 5000 万 tokens 🔥
> Pollinations (pol/)    → GPT-5、Claude、DeepSeek、Llama 4 — 无需 key
> Qwen (qw/)             → qwen3-coder 系列模型无限使用
> Gemini (gemini/)       → Gemini 2.5 Flash — 每天免费 1500 次
> Cloudflare AI (cf/)    → 50+ 模型 — 每天 10K Neurons
> Scaleway (scw/)        → Qwen3 235B、Llama 70B — 100 万免费 tokens（EU）
> Groq (groq/)           → Llama/Gemma — 每天 14.4K 次超高速请求
> NVIDIA NIM (nvidia/)   → 70+ 开源模型 — 永久 40 RPM
> Cerebras (cerebras/)   → 超高速 Llama/Qwen — 每天 100 万 tokens
> ```

## 🎙️ 免费转录 Combo

> 将任意音频/视频转录为文本，成本 **$0**。Deepgram 提供 $200 免费额度作为主力，AssemblyAI 提供 $50 作为回退，Groq Whisper 则作为无限制的紧急备用。

| 提供商            | 免费额度              | 最佳模型                             | 速率限制              |
| ----------------- | --------------------- | ------------------------------------ | --------------------- |
| 🟢 **Deepgram**   | **免费 $200**（注册） | `nova-3` — 精度最佳，支持 30+ 种语言 | 免费额度下无 RPM 限制 |
| 🔵 **AssemblyAI** | **免费 $50**（注册）  | `universal-3-pro` — 章节、情绪、PII  | 免费额度下无 RPM 限制 |
| 🔴 **Groq**       | **永久免费**          | `whisper-large-v3` — OpenAI Whisper  | 30 RPM（有速率限制）  |

**在 `/dashboard/combos` 中建议这样配置 combo：**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3            → 优先使用 $200 免费额度
  [2] assemblyai/universal-3-pro → Deepgram 额度用尽时回退
  [3] groq/whisper-large-v3      → 永久免费，作为紧急备用
```

然后在 `/dashboard/media` → **Transcription** 标签页中上传音频或视频文件，选择你的 combo 端点，即可获得支持格式的转录结果。

## 💡 主要功能

OmniRoute v2.0 的定位是一个可运维的平台，而不只是一个转发代理。

### 🆕 新增：受 ClawRouter 启发的改进（2026 年 3 月）

| 功能                               | 作用                                                                                         |
| ---------------------------------- | -------------------------------------------------------------------------------------------- |
| ⚡ **Grok-4 Fast Family**          | xAI 模型价格低至 $0.20/$0.50 每百万 token，基准延迟 1143ms，比 Gemini 2.5 Flash 快约 30%     |
| 🧠 **GLM-5 via Z.AI**              | 128K 输出上下文，$0.5/1M，是 GLM 系列的新旗舰                                                |
| 🔮 **MiniMax M2.5**                | 推理与 agentic 任务仅需 $0.30/1M，相比 M2.1 有明显升级                                       |
| 🎯 **按模型配置 toolCalling 标志** | 在注册表中为每个模型单独设置 `toolCalling: true/false`，AutoCombo 会跳过不支持工具调用的模型 |
| 🌍 **多语言意图检测**              | 在 AutoCombo 打分中加入 PT/ZH/ES/AR 关键词，提升非英文内容的模型选择效果                     |
| 📊 **基准驱动的回退**              | 使用真实请求得到的 p95 延迟参与 combo 打分，AutoCombo 会从真实数据中学习                     |
| 🔁 **请求去重**                    | 基于内容哈希的去重窗口，多智能体安全，避免重复计费                                           |
| 🔌 **可插拔 RouterStrategy**       | 可扩展的 `RouterStrategy` 接口，可通过插件加入自定义路由逻辑                                 |

### 🚀 此前 v2.0.9+ 的能力：Playground、CLI 指纹与 ACP

| 功能                                       | 作用                                                                                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | 在 Dashboard 中直接测试任意模型，支持 provider/model/endpoint 选择器、Monaco Editor、流式输出、终止请求和耗时显示                                                               |
| 🔏 **CLI Fingerprint Matching**            | 按提供商匹配原生 CLI 的请求头和请求体顺序，可在 Settings > Security 中按提供商开关，且**保留你的代理 IP**                                                                       |
| 🤝 **ACP Support (Agent Client Protocol)** | 支持 CLI agent 发现（Codex、Claude、Goose、Gemini CLI、OpenClaw 等共 10+）、进程启动器以及 `/api/acp/agents` 端点                                                               |
| 🤖 **ACP Agents Dashboard**                | Debug › Agents 页面会以网格展示 14 个 agents 的安装状态、版本和自定义 agent 表单。**OpenCode** 用户还会获得“Download opencode.json”按钮，可自动生成包含全部可用模型的即用配置。 |
| 🔧 **自定义模型 `apiFormat` 路由**         | 带有 `apiFormat: "responses"` 的自定义模型现在可正确路由到 Responses API 翻译器                                                                                                 |
| 🏢 **Codex 工作区隔离**                    | 同一邮箱下支持多个 Codex workspace，OAuth 会按 workspace ID 正确区分连接                                                                                                        |
| 🔄 **Electron 自动更新**                   | 桌面应用会检查更新，并在重启时自动安装                                                                                                                                          |

### 🤖 Agent 与协议运维（v2.0）

| 功能                               | 作用                                                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 🔧 **MCP Server (16 tools)**       | 通过 3 种传输方式为 IDE/agent 提供工具：stdio、SSE（`/api/mcp/sse`）、Streamable HTTP（`/api/mcp/stream`） |
| 🤝 **A2A Server (JSON-RPC + SSE)** | 支持同步与流式流程的 agent-to-agent 任务执行                                                               |
| 🧭 **统一 Endpoints 页面**         | 以标签页形式管理 Endpoint Proxy、MCP、A2A 和 API Endpoints                                                 |
| 🎚️ **服务启用/停用开关**           | 为 MCP 和 A2A 提供 ON/OFF 开关并持久化设置（默认：OFF）                                                    |
| 🛰️ **MCP 运行时心跳**              | 展示真实进程状态（pid、运行时长、心跳年龄、传输方式、scope 模式）                                          |
| 📋 **MCP 审计轨迹**                | 可过滤的审计日志，包含成功/失败结果与 key 归属信息                                                         |
| 🔐 **MCP Scope 强制控制**          | 9 个细粒度 scope 权限，用于受控工具访问                                                                    |
| 📡 **A2A 任务生命周期管理**        | 列出/过滤任务，查看事件与 artifact，取消运行中的任务                                                       |
| 📋 **Agent Card 发现**             | 通过 `/.well-known/agent.json` 支持客户端自动发现                                                          |
| 🧪 **协议 E2E 测试框架**           | 在 `test:protocols:e2e` 中运行真实 MCP SDK + A2A 客户端流程                                                |
| ⚙️ **运维控制**                    | 在一个控制面统一切换 combo、应用 resilience profile、重置 breaker                                          |

### 🧠 路由与智能

| 功能                        | 作用                                                           |
| --------------------------- | -------------------------------------------------------------- |
| 🎯 **智能 4 层后备**        | 自动路由：Subscription → API Key → Cheap → Free                |
| 📊 **实时配额跟踪**         | 按提供商展示实时 token 计数与重置倒计时                        |
| 🔄 **格式翻译**             | OpenAI ↔ Claude ↔ Gemini ↔ Responses，带 schema-safe 转换      |
| 👥 **多账户支持**           | 每个提供商支持多个账户并进行智能选择                           |
| 🔄 **自动 Token 刷新**      | OAuth token 自动刷新并支持重试                                 |
| 🎨 **自定义 Combo**         | 6 种均衡策略 + 后备链控制                                      |
| 🌐 **通配符路由器**         | 支持 `provider/*` 动态路由                                     |
| 🧠 **Thinking 预算控制**    | 支持 passthrough、auto、custom 和 adaptive 推理限制            |
| 🔀 **模型别名**             | 内置 + 自定义模型别名与安全迁移                                |
| ⚡ **后台降级**             | 将低优先级后台任务路由到更便宜的模型                           |
| 🧪 **任务感知智能路由**     | 按内容类型自动选择模型（coding/vision/analysis/summarization） |
| 🔄 **A2A Agent 工作流**     | 面向有状态多步骤 agent 执行的确定性 FSM orchestrator           |
| 🔀 **自适应路由**           | 根据 token 体量与提示词复杂度动态覆盖策略                      |
| 🎲 **提供商多样性**         | 使用 Shannon entropy 评分平衡 auto-combo 流量分布              |
| 💬 **System Prompt 注入**   | 统一应用全局行为控制                                           |
| 📄 **Responses API 兼容性** | 为 Codex 和高级 agentic workflow 提供完整 `/v1/responses` 支持 |

### 🎵 多模态 API

| 功能                  | 作用                                                                                                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **图像生成**       | `/v1/images/generations`，支持 cloud 和本地后端                                                                                                                  |
| 📐 **Embeddings**     | `/v1/embeddings`，适用于搜索和 RAG pipeline                                                                                                                      |
| 🎤 **音频转录**       | `/v1/audio/transcriptions`，支持 7 家提供商（Deepgram Nova 3、AssemblyAI、Groq Whisper、HuggingFace、ElevenLabs、OpenAI、Azure），自动语言检测，支持 MP4/MP3/WAV |
| 🔊 **Text-to-Speech** | `/v1/audio/speech`，支持 10 家提供商（ElevenLabs、OpenAI、Deepgram、Cartesia、PlayHT、HuggingFace、Nvidia NIM、Inworld、Coqui、Tortoise），并返回正确错误信息    |
| 🎬 **视频生成**       | `/v1/videos/generations`（ComfyUI + SD WebUI workflows）                                                                                                         |
| 🎵 **音乐生成**       | `/v1/music/generations`（ComfyUI workflows）                                                                                                                     |
| 🛡️ **Moderations**    | `/v1/moderations` 安全检查                                                                                                                                       |
| 🔀 **重排序**         | `/v1/rerank` 用于相关性评分                                                                                                                                      |
| 🔍 **Web Search** 🆕  | `/v1/search`，支持 5 家提供商（Serper、Brave、Perplexity、Exa、Tavily），每月 6,500+ 免费额度，支持自动故障转移与缓存                                            |

### 🛡️ 弹性、安全与治理

| 功能                           | 作用                                                        |
| ------------------------------ | ----------------------------------------------------------- |
| 🔌 **熔断器**                  | 按模型进行熔断/恢复，并支持阈值控制                         |
| 🎯 **端点感知模型**            | 自定义模型可声明支持的端点与 API 格式                       |
| 🛡️ **防惊群**                  | 在重试/限流事件中使用 mutex + semaphore 保护                |
| 🧠 **语义 + 签名缓存**         | 通过两层缓存降低成本与延迟                                  |
| ⚡ **请求幂等性**              | 提供重复请求保护窗口                                        |
| 🔒 **TLS 指纹伪装**            | 类浏览器 TLS 指纹，**降低 bot detection 与账户标记风险**    |
| 🔏 **CLI 指纹匹配**            | 匹配原生 CLI 请求签名，**在保留代理 IP 的同时降低封禁风险** |
| 🌐 **IP 过滤**                 | 为暴露部署提供 allowlist/blocklist 控制                     |
| 📊 **可编辑速率限制**          | 支持全局/提供商级限制并持久化                               |
| 📉 **优雅降级**                | 多层能力后备，保护核心网关操作                              |
| 📜 **配置审计轨迹**            | 基于 diff 的变更跟踪，防止运维漂移并支持简单回滚            |
| ⏳ **提供商健康同步**          | 主动监控 token 过期，在认证失败前触发告警                   |
| 🚪 **自动禁用被封账户**        | 通过运维熔断器自动封存被永久阻止的 token 账户               |
| 🔑 **API 密钥管理 + 范围控制** | 安全地签发/轮换密钥，并控制模型/提供商范围                  |
| 👁️ **定向 API 密钥显示** 🆕    | 通过 `ALLOW_API_KEY_REVEAL` 进行可选的 API 密钥恢复         |
| 🛡️ **受保护的 `/models`**      | 为模型目录提供可选认证门控与提供商隐藏                      |

### 📊 可观测性与分析

| 功能                   | 作用                                        |
| ---------------------- | ------------------------------------------- |
| 📝 **请求 + 代理日志** | 完整的请求/响应与代理日志                   |
| 📉 **流式详细日志** 🆕 | 将 SSE payload 流在 UI 中干净地重建出来     |
| 📋 **统一日志仪表盘**  | 在同一页面查看请求、代理、审计与控制台视图  |
| 🔍 **请求遥测**        | p50/p95/p99 延迟与请求追踪                  |
| 🏥 **健康仪表盘**      | 运行时长、breaker 状态、锁定、缓存统计      |
| 💰 **成本跟踪**        | 预算控制与按模型定价可见性                  |
| 📈 **分析可视化**      | 模型/提供商用量洞察与趋势视图               |
| 🧪 **评估框架**        | 支持可配置匹配策略的 Golden Set 测试        |
| 📡 **实时诊断** 🆕     | 通过绕过语义缓存来进行准确的 combo 实时测试 |

### ☁️ 部署与平台

| 功能                        | 作用                                                 |
| --------------------------- | ---------------------------------------------------- |
| 🌐 **可部署到任意环境**     | 支持 Localhost、VPS、Docker、Cloud 环境              |
| 🚇 **Cloudflare Tunnel** 🆕 | 从仪表盘一键集成 Quick Tunnel                        |
| 🔑 **API 密钥模型过滤**     | 原生按分配的 Bearer 上下文角色过滤 `/v1/models` 响应 |
| ⚡ **智能缓存绕过**         | 支持可配置 TTL 启发式与强制重新抓取控制              |
| 🔄 **备份/恢复**            | 支持导出/导入与灾难恢复流程                          |
| 🧙 **入门向导**             | 首次运行引导配置                                     |
| 🔧 **CLI Tools 仪表盘**     | 为常见编程工具提供一键设置                           |
| 🎮 **模型 Playground**      | 直接从仪表盘测试任意 provider/model/endpoint         |
| 🔏 **CLI 指纹开关**         | 在 Settings > Security 中按提供商开启指纹匹配        |
| 🌐 **i18n（30 种语言）**    | 完整支持 Dashboard + docs 多语言，并覆盖 RTL         |
| 🧹 **清空全部模型**         | 在提供商详情中一键清空模型列表                       |
| 👁️ **侧边栏控制** 🆕        | 从 Appearance Settings 隐藏组件与集成                |
| 📋 **Issue 模板**           | 为 bug 和功能请求提供标准化 GitHub 模板              |
| 📂 **自定义数据目录**       | 使用 `DATA_DIR` 覆盖存储位置                         |

### 功能深度解析

#### 带实际成本控制的智能回退

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

当配额、速率限制或健康状态出现问题时，OmniRoute 会自动切换到下一个候选模型，无需手动干预。

#### 可见且可操作的协议管理

- MCP + A2A 会在 UI 和文档中明确展示，而不是隐藏功能
- 协议状态 API 会暴露实时运行数据（`/api/mcp/*`、`/api/a2a/*`）
- Dashboard 内包含运维常用操作，如 combo 开关、熔断器重置、任务取消

#### 翻译器与验证工作流

Translator 区域包含：

- **Playground**：检查请求转换效果
- **Chat Tester**：验证完整请求/响应往返
- **Test Bench**：一次运行多组测试用例
- **Live Monitor**：实时查看流量

此外，还可以通过 `npm run test:protocols:e2e` 使用真实客户端进行协议验证。

> 📖 **[MCP Server README](../../../open-sse/mcp-server/README.md)** — 工具参考、IDE 配置和客户端示例
>
> 📖 **[A2A Server README](../../../src/lib/a2a/README.md)** — Skills、JSON-RPC 方法、流式传输与任务生命周期

## 🧪 评估（Evals）

OmniRoute 内置了一个评估框架，可基于 golden set 测试 LLM 响应质量。可在 Dashboard 的 **Analytics → Evals** 中访问。

### 内置 Golden Set

预置的 “OmniRoute Golden Set” 包含以下测试用例：

- 问候语、数学、地理、代码生成
- JSON 格式合规性、翻译、Markdown 生成
- 安全拒答（有害内容）、计数、布尔逻辑

### 评估策略

| 策略       | 描述                                 | 示例                             |
| ---------- | ------------------------------------ | -------------------------------- |
| `exact`    | 输出必须完全一致                     | `"4"`                            |
| `contains` | 输出必须包含某个子串（不区分大小写） | `"Paris"`                        |
| `regex`    | 输出必须匹配某个正则表达式           | `"1.*2.*3"`                      |
| `custom`   | 自定义 JS 函数返回 true/false        | `(output) => output.length > 10` |

---

## 📖 配置指南

### 协议配置（MCP + A2A）

<details>
<summary><b>🧩 MCP 配置（Model Context Protocol）</b></summary>

以 stdio 模式启动 MCP transport：

```bash
omniroute --mcp
```

推荐验证流程：

1. 通过 stdio 连接你的 MCP client。
2. 运行 `omniroute_get_health`。
3. 运行 `omniroute_list_combos`。
4. 打开 `/dashboard/endpoint`，确认心跳、活动和审计信息。

适合自动化的 API：

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 A2A 配置（Agent2Agent）</b></summary>

发现 agent：

```bash
curl http://localhost:20128/.well-known/agent.json
```

发送任务：

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

管理生命周期：

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

运维 UI：

- `/dashboard/a2a`：用于任务/状态/流的可观测性以及基础 smoke 操作

</details>

<details>
<summary><b>🧪 端到端协议验证</b></summary>

使用真实客户端验证这两种协议：

```bash
npm run test:protocols:e2e
```

这会验证：

- MCP SDK 客户端的 connect/list/call
- A2A 的 discovery/send/stream/get/cancel
- 交叉核对 MCP 审计和 A2A 任务管理 API 中的数据

</details>

<details>
<summary><b>💳 订阅型提供商</b></summary>

### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth 登录 → 自动刷新 token
→ 跟踪 5 小时 + 每周配额

模型：
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**专业提示：** 复杂任务用 Opus，追求速度用 Sonnet。OmniRoute 会按模型跟踪配额。

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth 登录（端口 1455）
→ 每 5 小时 + 每周重置

模型：
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Codex 账户限额管理（5 小时 + 每周）

现在每个 Codex 账户在 `Dashboard -> Providers` 中都有策略开关：

- `5h`（开/关）：启用 5 小时窗口阈值策略。
- `Weekly`（开/关）：启用每周窗口阈值策略。
- 阈值行为：当已启用窗口的使用量达到 >=90% 时，该账户会被跳过。
- 轮换行为：OmniRoute 会自动路由到下一个符合条件的 Codex 账户。
- 重置行为：当提供商的 `resetAt` 时间到达后，该账户会自动重新变为可用。

场景：

- `5h ON` + `Weekly ON`：任一窗口达到阈值时，账户都会被跳过。
- `5h OFF` + `Weekly ON`：只有每周使用量会阻止该账户。
- `5h ON` + `Weekly OFF`：只有 5 小时使用量会阻止该账户。
- `resetAt` 已过：账户会自动重新进入轮换，无需手动重新启用。

### Gemini CLI（每月免费 180K！）

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 每月 180K completions + 每天 1K

模型：
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**最佳性价比：** 免费额度非常大！建议先用这个，再用付费层。

### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ 通过 GitHub OAuth
→ 每月重置（每月 1 日）

模型：
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 API Key 提供商</b></summary>

### NVIDIA NIM（免费开发者访问 — 70+ 个模型）

1. 注册：[build.nvidia.com](https://build.nvidia.com)
2. 获取免费 API key（包含 1000 个 inference credits）
3. Dashboard → Add Provider → NVIDIA NIM：
   - API Key：`nvapi-your-key`

**模型：** `nvidia/llama-3.3-70b-instruct`、`nvidia/mistral-7b-instruct`，以及另外 50+ 个模型

**专业提示：** 这是 OpenAI-compatible API，可与 OmniRoute 的格式翻译无缝配合。

### DeepSeek

1. 注册：[platform.deepseek.com](https://platform.deepseek.com)
2. 获取 API key
3. Dashboard → Add Provider → DeepSeek

**模型：** `deepseek/deepseek-chat`、`deepseek/deepseek-coder`

### Groq（提供免费层！）

1. 注册：[console.groq.com](https://console.groq.com)
2. 获取 API key（包含免费层）
3. Dashboard → Add Provider → Groq

**模型：** `groq/llama-3.3-70b`、`groq/mixtral-8x7b`

**专业提示：** 推理速度极快，非常适合实时编码。

### OpenRouter（100+ 个模型）

1. 注册：[openrouter.ai](https://openrouter.ai)
2. 获取 API key
3. Dashboard → Add Provider → OpenRouter

**模型：** 通过一个 API key 即可访问所有主流提供商的 100+ 个模型。

**Dashboard 行为：** OpenRouter 模型由 **Available Models** 统一管理。手动添加、导入和自动同步都会更新同一份列表。

</details>

<details>
<summary><b>💰 低价提供商（回退备用）</b></summary>

### GLM-4.7（每日重置，$0.6/100 万）

1. 注册：[Zhipu AI](https://open.bigmodel.cn/)
2. 从 Coding Plan 获取 API key
3. Dashboard → Add API Key：
   - Provider：`glm`
   - API Key：`your-key`

**使用：** `glm/glm-4.7`

**专业提示：** Coding Plan 能以 1/7 的成本提供 3 倍配额！每天 10:00 重置。

### MiniMax M2.1（5 小时重置，$0.20/100 万）

1. 注册：[MiniMax](https://www.minimax.io/)
2. 获取 API key
3. Dashboard → Add API Key

**使用：** `minimax/MiniMax-M2.1`

**专业提示：** 这是长上下文（100 万 tokens）场景中最便宜的选择！

### Kimi K2（固定 $9/月）

1. 订阅：[Moonshot AI](https://platform.moonshot.ai/)
2. 获取 API key
3. Dashboard → Add API Key

**使用：** `kimi/kimi-latest`

**专业提示：** 固定 $9/月即可获得 1000 万 tokens，相当于每 100 万 tokens 仅 $0.90！

</details>

<details>
<summary><b>🆓 免费提供商（紧急备用）</b></summary>

### Qoder（通过 OAuth 提供 5 个免费模型）

```bash
Dashboard → Connect Qoder
→ Qoder OAuth 登录
→ 无限使用

模型：
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen（通过设备码提供 4 个免费模型）

```bash
Dashboard → Connect Qwen
→ 设备码授权
→ 无限使用

模型：
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro（免费 Claude）

```bash
Dashboard → Connect Kiro
→ AWS Builder ID 或 Google/GitHub
→ 无限使用

模型：
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 创建 Combos</b></summary>

### 示例 1：最大化订阅 → 廉价备用

```
Dashboard → Combos → Create New

Name: premium-coding
模型：
  1. cc/claude-opus-4-6（订阅主力）
  2. glm/glm-4.7（廉价备用，$0.6/1M）
  3. minimax/MiniMax-M2.1（最便宜的回退，$0.20/1M）

在 CLI 中使用：premium-coding
```

### 示例 2：仅免费（零成本）

```
Name: free-combo
模型：
  1. gc/gemini-3-flash-preview（每月免费 180K）
  2. if/kimi-k2-thinking（无限）
  3. qw/qwen3-coder-plus（无限）

成本：永久免费！
```

</details>

<details>
<summary><b>🔧 CLI 集成</b></summary>

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [从 OmniRoute Dashboard 获取]
  Model: cc/claude-opus-4-6
```

### Claude Code

使用 Dashboard 中的 **CLI Tools** 页面进行一键配置，或手动编辑 `~/.claude/settings.json`。

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**方式 1：通过 Dashboard（推荐）**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**方式 2：手动配置** 编辑 `~/.openclaw/openclaw.json`：

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **注意：** OpenClaw 仅适用于本地 OmniRoute。请使用 `127.0.0.1` 而不是 `localhost`，以避免 IPv6 解析问题。

### Cline / Continue / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [从 OmniRoute Dashboard 获取]
  Model: if/kimi-k2-thinking
```

### OpenCode

**步骤 1：** 将 OmniRoute 添加为自定义 provider：

```bash
opencode
/connect
# 选择 “Other” → 输入 ID：“omniroute” → 输入你的 OmniRoute API key
```

**步骤 2：** 在项目根目录中创建或编辑 `opencode.json`：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1"
      },
      "models": {
        "cc/claude-sonnet-4-20250514": { "name": "Claude Sonnet 4" },
        "gg/gemini-2.5-pro": { "name": "Gemini 2.5 Pro" },
        "if/kimi-k2-thinking": { "name": "Kimi K2 (Free)" }
      }
    }
  }
}
```

**步骤 3：** 在 OpenCode 中选择模型：

```bash
/models
# 从列表中选择任意 OmniRoute 模型
```

> **提示：** 可将 OmniRoute `/v1/models` 端点中可见的任意模型添加到 `models` 段。请使用 OmniRoute Dashboard 中的 `provider/model-id` 格式。

</details>

---

## 故障排除

<details>
<summary><b>点击展开故障排除指南</b></summary>

**“Language model did not provide messages”**

- 提供商配额已耗尽 → 检查 Dashboard 中的配额跟踪器
- 解决方案：使用 combo 回退或切换到更便宜的层级

**速率限制**

- 订阅配额用尽 → 回退到 GLM/MiniMax
- 添加 combo：`cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**OAuth token 已过期**

- OmniRoute 会自动刷新
- 如果问题持续：Dashboard → Provider → Reconnect

**成本过高**

- 检查 Dashboard → Costs 中的用量统计
- 将主模型切换到 GLM/MiniMax
- 对非关键任务使用免费层（Gemini CLI、Qoder）

**Dashboard/API 端口不正确**

- `PORT` 是规范基础端口（默认也作为 API 端口）
- `API_PORT` 仅覆盖 OpenAI-compatible API 监听器
- `DASHBOARD_PORT` 仅覆盖 dashboard/Next.js 监听器
- 将 `NEXT_PUBLIC_BASE_URL` 设置为你的 Dashboard/公共 URL（用于 OAuth 回调）

**Cloud sync 错误**

- 确认 `BASE_URL` 指向正在运行的实例
- 确认 `CLOUD_URL` 指向你期望的 cloud endpoint
- 保持 `NEXT_PUBLIC_*` 的值与服务端配置一致

**首次登录无法使用**

- 检查 `.env` 中的 `INITIAL_PASSWORD`
- 如果未设置，后备密码为 `123456`

**没有请求日志**

- 请求 artifact 会以每请求一个 JSON 文件的形式写入 `DATA_DIR/call_logs/`
- 如果你需要按阶段查看详细 payload，请在 Dashboard → Logs → Request Logs 中启用 pipeline capture
- 如果还需要应用控制台日志，请设置 `APP_LOG_TO_FILE=true`，日志会写入 `logs/application/app.log`

**OpenAI-compatible 提供商的连接测试显示 “Invalid”**

- 许多提供商并不暴露 `/models` 端点
- OmniRoute v1.0.6+ 已包含基于 chat completions 的后备校验
- 确保 base URL 包含 `/v1` 后缀

### 🔐 远程服务器上的 OAuth

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ 适用于在 VPS、Docker 或任意远程服务器上运行 OmniRoute 的用户**

#### 为什么 Antigravity / Gemini CLI 的 OAuth 会在远程服务器上失败？

**Antigravity** 和 **Gemini CLI** 提供商使用 **Google OAuth 2.0**。Google 要求 OAuth 流程中的 `redirect_uri` 必须与应用在 Google Cloud Console 中预先注册的某个 URI **完全一致**。

OmniRoute 内置的 OAuth 凭证**仅为 `localhost` 注册**。当你通过远程服务器访问 OmniRoute（例如 `https://omniroute.myserver.com`）时，Google 会拒绝认证，并返回：

```
Error 400: redirect_uri_mismatch
```

#### 解决方案：配置你自己的 OAuth 凭证

你需要在 Google Cloud Console 中创建一个带有你服务器 URI 的 **OAuth 2.0 Client ID**。

#### 操作步骤

**1. 打开 Google Cloud Console**

访问：[https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. 创建新的 OAuth 2.0 Client ID**

- 点击 **"+ Create Credentials"** → **"OAuth client ID"**
- 应用类型：**"Web application"**
- 名称：可自定义（例如 `OmniRoute Remote`）

**3. 添加 Authorized Redirect URIs**

在 **"Authorized redirect URIs"** 字段中添加：

```
https://your-server.com/callback
```

> 将 `your-server.com` 替换为你的服务器域名或 IP（如有需要请包含端口，例如 `http://45.33.32.156:20128/callback`）。

**4. 保存并复制凭证**

创建完成后，Google 会显示 **Client ID** 和 **Client Secret**。

**5. 设置环境变量**

在 `.env`（或 Docker 环境变量）中添加：

```bash
# 用于 Antigravity：
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# 用于 Gemini CLI：
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. 重启 OmniRoute**

```bash
# npm：
npm run dev

# Docker：
docker restart omniroute
```

**7. 再次尝试连接**

Dashboard → Providers → Antigravity（或 Gemini CLI）→ OAuth

此时 Google 就会正确重定向到 `https://your-server.com/callback`。

---

#### 临时绕过方案（不配置自有凭证）

如果你暂时不想配置自己的凭证，仍然可以使用**手动 URL 流程**：

1. OmniRoute 打开 Google 授权 URL
2. 授权后，Google 会尝试重定向到 `localhost`（在远程服务器上这会失败）
3. 即使页面打不开，也请从浏览器地址栏**复制完整 URL**
4. 将该 URL 粘贴到 OmniRoute 连接弹窗中的输入框
5. 点击 **"Connect"**

> 之所以可行，是因为 URL 中的授权码无论重定向页面是否成功加载，都是有效的。

---

<details>
<summary><b>🇧🇷 葡萄牙语版本</b></summary>

#### 为什么 Antigravity / Gemini CLI 的 OAuth 会在远程服务器上失败？

**Antigravity** 和 **Gemini CLI** 提供商使用 **Google OAuth 2.0**。Google 要求 OAuth 流程中使用的 `redirect_uri` 必须与应用在 Google Cloud Console 中预先注册的 URI **完全一致**。

OmniRoute 内置的 OAuth 凭证**仅为 `localhost` 注册**。当你在远程服务器上访问 OmniRoute（例如 `https://omniroute.meuservidor.com`）时，Google 会拒绝认证，并返回：

```
Error 400: redirect_uri_mismatch
```

#### 解决方案：配置你自己的 OAuth 凭证

你需要在 Google Cloud Console 中创建一个带有你服务器 URI 的 **OAuth 2.0 Client ID**。

#### 操作步骤

**1. 打开 Google Cloud Console**

访问：[https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. 创建新的 OAuth 2.0 Client ID**

- 点击 **"+ Create Credentials"** → **"OAuth client ID"**
- 应用类型：**"Web application"**
- 名称：可自定义（例如 `OmniRoute Remote`）

**3. 添加 Authorized Redirect URIs**

在 **"Authorized redirect URIs"** 字段中添加：

```
https://seu-servidor.com/callback
```

> 将 `seu-servidor.com` 替换为你的服务器域名或 IP（如有需要请包含端口，例如 `http://45.33.32.156:20128/callback`）。

**4. 保存并复制凭证**

创建完成后，Google 会显示 **Client ID** 和 **Client Secret**。

**5. 配置环境变量**

在 `.env`（或 Docker 环境变量）中添加：

```bash
# 用于 Antigravity：
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# 用于 Gemini CLI：
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. 重启 OmniRoute**

```bash
# npm：
npm run dev

# Docker：
docker restart omniroute
```

**7. 再次尝试连接**

Dashboard → Providers → Antigravity（或 Gemini CLI）→ OAuth

此时 Google 就会正确重定向到 `https://seu-servidor.com/callback`。

---

#### 临时绕过方案（不配置自有凭证）

如果你暂时不想配置自己的凭证，仍然可以使用**手动 URL 流程**：

1. OmniRoute 会打开 Google 授权 URL
2. 在你授权之后，Google 会尝试重定向到 `localhost`（这在远程服务器上会失败）
3. 即使页面未加载，也请从浏览器地址栏**复制完整 URL**
4. 将该 URL 粘贴到 OmniRoute 连接弹窗中的输入框
5. 点击 **"Connect"**

> 之所以可行，是因为 URL 中的授权码无论重定向页面是否成功加载，都是有效的。

</details>

---

</details>

## 🛠️ 技术栈

<details>
<summary><b>点击展开技术栈详情</b></summary>

- **Runtime**: Node.js 18–22 LTS（⚠️ **不支持** Node.js 24+，因为 `better-sqlite3` 原生二进制不兼容）
- **Language**: TypeScript 5.9，`src/` 与 `open-sse/` 全面采用 **100% TypeScript**（自 v2.0 起核心模块中无 `any`）
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Database**: LowDB（JSON）+ SQLite（domain state + proxy logs + MCP audit + routing decisions）
- **Schemas**: Zod（MCP tool I/O validation、API contracts）
- **Protocols**: MCP（stdio/HTTP）+ A2A v0.3（JSON-RPC 2.0 + SSE）
- **Streaming**: Server-Sent Events（SSE）
- **Auth**: OAuth 2.0（PKCE）+ JWT + API Keys + MCP Scoped Authorization
- **Testing**: Node.js test runner + Vitest（900+ 项测试，涵盖 unit、integration、E2E）
- **CI/CD**: GitHub Actions（release 时自动 npm publish + Docker Hub）
- **Website**: [omniroute.online](https://omniroute.online)
- **Package**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resilience**: circuit breaker、exponential backoff、anti-thundering herd、TLS spoofing、auto-combo self-healing

</details>

---

## 文档

| 文档                                                 | 说明                                          |
| ---------------------------------------------------- | --------------------------------------------- |
| [用户指南](USER_GUIDE.md)                            | 提供商、combo、CLI 集成、部署                 |
| [API 参考](API_REFERENCE.md)                         | 所有端点及使用示例                            |
| [MCP Server](../../../open-sse/mcp-server/README.md) | 16 个 MCP 工具、IDE 配置、Python/TS/Go 客户端 |
| [A2A Server](../../../src/lib/a2a/README.md)         | JSON-RPC 2.0 协议、Skills、流式传输、任务管理 |
| [Auto-Combo 引擎](AUTO-COMBO.md)                     | 6 因子评分、模式包、自愈                      |
| [故障排除](TROUBLESHOOTING.md)                       | 常见问题及解决方案                            |
| [架构](ARCHITECTURE.md)                              | 系统架构与内部实现                            |
| [贡献指南](../../../CONTRIBUTING.md)                 | 开发环境与贡献规范                            |
| [OpenAPI 规范](../../../docs/openapi.yaml)           | OpenAPI 3.0 规范                              |
| [安全策略](../../../SECURITY.md)                     | 漏洞报告与安全实践                            |
| [VM 部署指南](VM_DEPLOYMENT_GUIDE.md)                | 完整指南：VM + nginx + Cloudflare 配置        |
| [功能画廊](FEATURES.md)                              | 带截图的仪表盘功能导览                        |
| [发布检查清单](RELEASE_CHECKLIST.md)                 | 发布前验证步骤                                |

---

## 🗺️ 路线图

OmniRoute 在多个开发阶段计划了 **210+ 个功能**。以下是关键领域：

| 类别              | 计划功能 | 亮点                                                       |
| ----------------- | -------- | ---------------------------------------------------------- |
| 🧠 **路由与智能** | 25+      | 最低延迟路由、基于标签路由、配额预检、P2C 账户选择         |
| 🔒 **安全与合规** | 20+      | SSRF 加固、凭证隐藏、每端点速率限制、管理密钥范围          |
| 📊 **可观测性**   | 15+      | OpenTelemetry 集成、实时配额监控、每模型成本追踪           |
| 🔄 **提供商集成** | 20+      | 动态模型注册表、提供商冷却、多账户 Codex、Copilot 配额解析 |
| ⚡ **性能**       | 15+      | 双层缓存、提示词缓存、响应缓存、流式 keepalive、批量 API   |
| 🌐 **生态系统**   | 10+      | WebSocket API、配置热重载、分布式配置存储、商业模式        |

### 🔜 即将推出

- 🔗 **OpenCode 集成** — OpenCode AI 编码 IDE 的原生提供商支持
- 🔗 **TRAE 集成** — TRAE AI 开发框架的完整支持
- 📦 **批量 API** — 批量请求的异步批处理
- 🎯 **基于标签路由** — 基于自定义标签和元数据路由请求
- 💰 **最低成本策略** — 自动选择最便宜的可用提供商

> 📝 完整功能规格在 [`docs/new-features/`](../../../docs/new-features/) 中可用（217 个详细规格）

---

## 👥 贡献者

[![贡献者](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### 如何贡献

1. Fork 仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 开启 Pull Request

详细指南请查看 [CONTRIBUTING.md](../../../CONTRIBUTING.md)。

### 发布新版本

```bash
# 创建发布 — npm 发布自动进行
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Star 历史

## 随时间变化的 Stargazers

## [![随时间变化的 Stargazers](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 致谢

特别感谢 **[decolua](https://github.com/decolua)** 的 **[9router](https://github.com/decolua/9router)** — 启发这个 fork 的原始项目。OmniRoute 在这个令人难以置信的基础上构建，增加了额外功能、多模态 API 和完整的 TypeScript 重写。

特别感谢 **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — 启发这个 JavaScript 移植的原始 Go 实现。

---

## 📝 许可证

MIT 许可证 - 详情请查看 [LICENSE](../../../LICENSE)。

---

<div align="center">
  <sub>为 24/7 编码的开发者用 ❤️ 构建</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
<!-- GitHub Discussions enabled for community Q&A -->
