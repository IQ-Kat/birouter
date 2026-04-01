# OmniRoute — 仪表盘功能展示

🌐 **语言:** 🇺🇸 [English](../../FEATURES.md) · 🇧🇷 [pt-BR](../pt-BR/FEATURES.md) · 🇪🇸 [es](../es/FEATURES.md) · 🇫🇷 [fr](../fr/FEATURES.md) · 🇩🇪 [de](../de/FEATURES.md) · 🇮🇹 [it](../it/FEATURES.md) · 🇷🇺 [ru](../ru/FEATURES.md) · 🇨🇳 [zh-CN](../zh-CN/FEATURES.md) · 🇯🇵 [ja](../ja/FEATURES.md) · 🇰🇷 [ko](../ko/FEATURES.md) · 🇸🇦 [ar](../ar/FEATURES.md) · 🇮🇳 [in](../in/FEATURES.md) · 🇹🇭 [th](../th/FEATURES.md) · 🇻🇳 [vi](../vi/FEATURES.md) · 🇮🇩 [id](../id/FEATURES.md) · 🇲🇾 [ms](../ms/FEATURES.md) · 🇳🇱 [nl](../nl/FEATURES.md) · 🇵🇱 [pl](../pl/FEATURES.md) · 🇸🇪 [sv](../sv/FEATURES.md) · 🇳🇴 [no](../no/FEATURES.md) · 🇩🇰 [da](../da/FEATURES.md) · 🇫🇮 [fi](../fi/FEATURES.md) · 🇵🇹 [pt](../pt/FEATURES.md) · 🇷🇴 [ro](../ro/FEATURES.md) · 🇭🇺 [hu](../hu/FEATURES.md) · 🇧🇬 [bg](../bg/FEATURES.md) · 🇸🇰 [sk](../sk/FEATURES.md) · 🇺🇦 [uk-UA](../uk-UA/FEATURES.md) · 🇮🇱 [he](../he/FEATURES.md) · 🇵🇭 [phi](../phi/FEATURES.md) · 🇨🇿 [cs](../cs/FEATURES.md)

OmniRoute 仪表盘各部分的可视化指南。

---

## 🔌 服务商

管理 AI 服务商连接：OAuth 服务商（Claude Code、Codex、Gemini CLI）、API 密钥服务商（Groq、DeepSeek、OpenRouter）以及免费服务商（Qoder、Qwen、Kiro）。Kiro 账户包含额度余额跟踪 — 剩余额度、总配额和续期日期可在 Dashboard → Usage 中查看。

![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 组合

创建具有 6 种策略的模型路由组合：优先级、加权、轮询、随机、最少使用和成本优化。每个组合可链接多个模型并支持自动回退，还包括快速模板和就绪检查。

![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 分析

全面的使用分析，包括 token 消耗、成本估算、活动热力图、每周分布图表以及按服务商细分。

![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 系统健康

实时监控：运行时间、内存、版本、延迟百分位数（p50/p95/p99）、缓存统计和服务商熔断器状态。

![Health Dashboard](screenshots/04-health.png)

---

## 🔧 翻译器测试场

四种调试 API 翻译的模式：**Playground**（格式转换器）、**Chat Tester**（实时请求）、**Test Bench**（批量测试）和 **Live Monitor**（实时流）。

![Translator Playground](screenshots/05-translator.png)

---

## 🎮 模型测试场 _(v2.0.9+)_

直接从仪表盘测试任何模型。选择服务商、模型和端点，使用 Monaco Editor 编写提示，实时流式响应，可中途中止，并查看计时指标。

---

## 🎨 主题 _(v2.0.5+)_

整个仪表盘可自定义颜色主题。可从 7 种预设颜色（珊瑚色、蓝色、红色、绿色、紫罗兰色、橙色、青色）中选择，或通过选择任何十六进制颜色创建自定义主题。支持浅色、深色和跟随系统模式。

---

## ⚙️ 设置

全面的设置面板，包含以下标签页：

- **通用** — 系统存储、备份管理（导出/导入数据库）
- **外观** — 主题选择器（深色/浅色/跟随系统）、颜色主题预设和自定义颜色、健康日志可见性、侧边栏项目可见性控制
- **安全** — API 端点保护、自定义服务商屏蔽、IP 过滤、会话信息
- **路由** — 模型别名、后台任务降级
- **弹性** — 速率限制持久化、熔断器调优、自动禁用被封禁账户、服务商过期监控
- **高级** — 配置覆盖、配置审计追踪、回退降级模式

![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI 工具

一键配置 AI 编程工具：Claude Code、Codex CLI、Gemini CLI、OpenClaw、Kilo Code、Antigravity、Cline、Continue、Cursor 和 Factory Droid。具备自动化配置应用/重置、连接配置文件和模型映射功能。

![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI 代理 _(v2.0.11+)_

发现和管理 CLI 代理的仪表盘。显示 14 个内置代理（Codex、Claude、Goose、Gemini CLI、OpenClaw、Aider、OpenCode、Cline、Qwen Code、ForgeCode、Amazon Q、Open Interpreter、Cursor CLI、Warp）的网格视图，具有：

- **安装状态** — 已安装 / 未找到，带版本检测
- **协议徽章** — stdio、HTTP 等
- **自定义代理** — 通过表单注册任何 CLI 工具（名称、二进制文件、版本命令、启动参数）
- **CLI 指纹匹配** — 按服务商切换以匹配原生 CLI 请求签名，在保持代理 IP 的同时降低封禁风险

---

## 🖼️ 媒体 _(v2.0.3+)_

从仪表盘生成图像、视频和音乐。支持 OpenAI、xAI、Together、Hyperbolic、SD WebUI、ComfyUI、AnimateDiff、Stable Audio Open 和 MusicGen。

---

## 📝 请求日志

实时请求日志，支持按服务商、模型、账户和 API 密钥过滤。显示状态码、token 使用量、延迟和响应详情。

![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API 端点

您的统一 API 端点，包含能力分解：Chat Completions、Responses API、Embeddings、Image Generation、Reranking、Audio Transcription、Text-to-Speech、Moderations 以及已注册的 API 密钥。支持 Cloudflare Quick Tunnel 集成和云代理进行远程访问。

![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API 密钥管理

创建、限定范围和撤销 API 密钥。每个密钥可限制为特定模型/服务商，具有完全访问或只读权限。可视化密钥管理及使用跟踪。

---

## 📋 审计日志

管理操作跟踪，支持按操作类型、操作者、目标、IP 地址和时间戳过滤。完整的安全事件历史记录。

---

## 🖥️ 桌面应用

适用于 Windows、macOS 和 Linux 的原生 Electron 桌面应用。将 OmniRoute 作为独立应用运行，具有系统托盘集成、离线支持、自动更新和一键安装。

主要特性：

- 服务器就绪轮询（冷启动时无白屏）
- 带端口管理的系统托盘
- 内容安全策略
- 单实例锁定
- 重启时自动更新
- 平台条件化 UI（macOS 红绿灯、Windows/Linux 默认标题栏）
- 强化的 Electron 构建打包 — 独立包中的符号链接 `node_modules` 会在打包前被检测并拒绝，防止对构建机器的运行时依赖 (v2.5.5+)

📖 完整文档请参阅 [`electron/README.md`](../electron/README.md)。
