# OmniRoute — Dashboard 功能画廊

🌐 **语言：** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md)

---

OmniRoute 仪表盘各个页面的可视化导览。

---

## 🔌 提供商

管理 AI 提供商连接：包括 OAuth 提供商（Claude Code、Codex、Gemini CLI）、API Key 提供商（Groq、DeepSeek、OpenRouter）以及免费提供商（Qoder、Qwen、Kiro）。Kiro 账户还支持额度余额跟踪，可在 Dashboard → Usage 中查看剩余额度、总额度和续期日期。

![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

创建模型路由 Combo，支持 6 种策略：priority、weighted、round-robin、random、least-used 和 cost-optimized。每个 Combo 都可以串联多个模型并自动回退，同时提供快捷模板和就绪检查。

![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 分析

完整的用量分析能力，包括 token 消耗、成本估算、活动热力图、每周分布图和按提供商拆分的数据。

![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 系统健康

实时监控：运行时长、内存、版本、延迟分位数（p50/p95/p99）、缓存统计以及提供商熔断器状态。

![Health Dashboard](screenshots/04-health.png)

---

## 🔧 翻译器实验场

提供 4 种 API 翻译调试模式：**Playground**（格式转换器）、**Chat Tester**（实时请求）、**Test Bench**（批量测试）和 **Live Monitor**（实时流监视）。

![Translator Playground](screenshots/05-translator.png)

---

## 🎮 模型实验场 _(v2.0.9+)_

直接在仪表盘中测试任意模型。可以选择提供商、模型和端点，使用 Monaco Editor 编写提示词，实时流式查看响应、中途终止请求，并查看耗时指标。

---

## 🎨 主题 _(v2.0.5+)_

为整个仪表盘自定义颜色主题。可从 7 种预设颜色（Coral、Blue、Red、Green、Violet、Orange、Cyan）中选择，也可以通过任意 hex 颜色创建自定义主题。支持浅色、深色和跟随系统。

---

## ⚙️ 设置

完整的设置面板，包含以下标签页：

- **General** — 系统存储、备份管理（导出/导入数据库）
- **Appearance** — 主题选择器（dark/light/system）、颜色主题预设和自定义颜色、健康日志可见性、侧边栏项目可见性控制
- **Security** — API 端点保护、自定义提供商屏蔽、IP 过滤、会话信息
- **Routing** — 模型别名、后台任务降级
- **Resilience** — 速率限制持久化、熔断器调优、自动禁用被封账户、提供商过期监控
- **Advanced** — 配置覆盖、配置审计轨迹、回退降级模式

![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI 工具

为 AI 编程工具提供一键配置：Claude Code、Codex CLI、Gemini CLI、OpenClaw、Kilo Code、Antigravity、Cline、Continue、Cursor 和 Factory Droid。支持自动应用/重置配置、连接配置文件和模型映射。

![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI 代理 _(v2.0.11+)_

用于发现和管理 CLI agents 的仪表盘。会以网格展示 14 个内置 agent（Codex、Claude、Goose、Gemini CLI、OpenClaw、Aider、OpenCode、Cline、Qwen Code、ForgeCode、Amazon Q、Open Interpreter、Cursor CLI、Warp），包括：

- **安装状态** — Installed / Not Found，并带版本检测
- **协议徽标** — stdio、HTTP 等
- **自定义 agents** — 可通过表单注册任意 CLI 工具（名称、二进制、版本命令、启动参数）
- **CLI Fingerprint Matching** — 按提供商开关，以匹配原生 CLI 请求特征，在保留代理 IP 的同时降低封禁风险

---

## 🖼️ 媒体 _(v2.0.3+)_

从仪表盘生成图像、视频和音乐。支持 OpenAI、xAI、Together、Hyperbolic、SD WebUI、ComfyUI、AnimateDiff、Stable Audio Open 和 MusicGen。

---

## 📝 请求日志

实时请求日志，支持按提供商、模型、账户和 API Key 过滤。可查看状态码、token 用量、延迟和响应详情。

![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API 端点

统一 API 端点页面，按能力拆分展示：Chat Completions、Responses API、Embeddings、Image Generation、Reranking、Audio Transcription、Text-to-Speech、Moderations，以及已注册 API Keys。还集成了 Cloudflare Quick Tunnel 和云代理支持，方便远程访问。

![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API 密钥管理

创建、限定范围并撤销 API Keys。每个 key 都可以限制到特定模型或提供商，并支持 full access 或 read-only 权限。提供可视化密钥管理和用量跟踪。

---

## 📋 审计日志

用于跟踪管理操作，支持按操作类型、执行者、目标、IP 地址和时间戳过滤，可查看完整的安全事件历史。

---

## 🖥️ 桌面应用

适用于 Windows、macOS 和 Linux 的原生 Electron 桌面应用。可以将 OmniRoute 作为独立应用运行，支持系统托盘、离线模式、自动更新和一键安装。

主要特性：

- 服务器就绪轮询（冷启动时不再白屏）
- 带端口管理的系统托盘
- Content Security Policy
- 单实例锁
- 重启时自动更新
- 按平台适配的界面（macOS traffic lights、Windows/Linux 默认标题栏）
- 加固的 Electron 打包流程：会在打包前检测并拒绝 standalone bundle 中符号链接的 `node_modules`，防止运行时依赖构建机环境（v2.5.5+）

📖 完整文档见 [`electron/README.md`](../electron/README.md)。
