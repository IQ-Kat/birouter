# OmniRoute — Dashboard Features Gallery (中文（简体）)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

OmniRoute 仪表板每个部分的视觉指南。---

## 🔌 Providers

管理 AI 提供商连接：OAuth 提供商（Claude Code、Codex、Gemini CLI）、API 密钥提供商（Groq、DeepSeek、OpenRouter）和免费提供商（Qoder、Qwen、Kiro）。 Kiro 账户包括信用余额跟踪 — 剩余信用、总限额和续订日期可在仪表板 → 使用情况中查看。![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

使用 6 种策略创建模型路由组合：优先级、加权、循环、随机、最少使用和成本优化。每个组合都通过自动回退链接多个模型，并包括快速模板和准备情况检查。![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

全面的使用分析，包括代币消耗、成本估算、活动热图、每周分布图和每个提供商的细分。![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

实时监控：正常运行时间、内存、版本、延迟百分位数 (p50/p95/p99)、缓存统计数据和提供商断路器状态。![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

用于调试 API 翻译的四种模式：**Playground**（格式转换器）、**Chat Tester**（实时请求）、**Test Bench**（批量测试）和**Live Monitor**（实时流）。![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Test any model directly from the dashboard.选择提供商、模型和端点，使用 Monaco 编辑器编写提示、实时流式传输响应、中止中流以及查看计时指标。---

## 🎨 Themes _(v2.0.5+)_

整个仪表板的可定制颜色主题。从 7 种预设颜色（珊瑚色、蓝色、红色、绿色、紫色、橙色、青色）中进行选择，或通过选择任何十六进制颜色来创建自定义主题。支持浅色、深色和系统模式。---

## ⚙️ Settings

带选项卡的综合设置面板：

-**常规**— 系统存储、备份管理（导出/导入数据库）-**外观**- 主题选择器（深色/浅色/系统）、颜色主题预设和自定义颜色、运行状况日志可见性、侧边栏项目可见性控制 -**安全**— API 端点保护、自定义提供商阻止、IP 过滤、会话信息 -**路由**— 模型别名、后台任务降级 -**弹性**- 速率限制持久性、断路器调整、自动禁用被禁止的帐户、提供商到期监控 -**高级**— 配置覆盖、配置审计跟踪、回退降级模式![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

一键配置 AI 编码工具：Claude Code、Codex CLI、Gemini CLI、OpenClaw、Kilo Code、Antigravity、Cline、Continue、Cursor 和 Factory Droid。具有自动配置应用/重置、连接配置文件和模型映射功能。![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

用于发现和管理 CLI 代理的仪表板。显示 14 个内置代理（Codex、Claude、Goose、Gemini CLI、OpenClaw、Aider、OpenCode、Cline、Qwen Code、ForgeCode、Amazon Q、Open Interpreter、Cursor CLI、Warp）的网格，其中：

-**安装状态**— 已安装/未通过版本检测找到 -**协议徽章**— stdio、HTTP 等。-**自定义代理**— 通过表单注册任何 CLI 工具（名称、二进制文件、版本命令、spawn args）-**CLI 指纹匹配**— 每个提供商切换以匹配本机 CLI 请求签名，在保留代理 IP 的同时降低禁令风险---

## 🖼️ Media _(v2.0.3+)_

从仪表板生成图像、视频和音乐。支持 OpenAI、xAI、Together、Hyperbolic、SD WebUI、ComfyUI、AnimateDiff、Stable Audio Open 和 MusicGen。---

## 📝 Request Logs

实时请求记录，并按提供商、模型、帐户和 API 密钥进行过滤。显示状态代码、令牌使用情况、延迟和响应详细信息。![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

您的统一 API 端点具有功能细分：聊天完成、响应 API、嵌入、图像生成、重新排名、音频转录、文本转语音、审核和注册 API 密钥。 Cloudflare Quick Tunnel 集成和云代理支持远程访问。![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

创建、范围和撤销 API 密钥。每个密钥都可以限制为具有完全访问或只读权限的特定模型/提供商。具有使用跟踪功能的可视化密钥管理。---

## 📋 Audit Log

管理操作跟踪，可按操作类型、参与者、目标、IP 地址和时间戳进行过滤。完整的安全事件历史记录。---

## 🖥️ Desktop Application

适用于 Windows、macOS 和 Linux 的本机 Electron 桌面应用程序。将 OmniRoute 作为独立应用程序运行，具有系统托盘集成、离线支持、自动更新和一键安装功能。

主要特点：

- 服务器就绪轮询（冷启动时无空白屏幕）
- 带端口管理的系统托盘
- 内容安全政策
- 单实例锁
- 重启时自动更新
- 平台条件 UI（macOS 红绿灯、Windows/Linux 默认标题栏）
- 强化 Electron 构建打包 - 在打包之前检测并拒绝独立包中的符号链接“node_modules”，从而防止运行时对构建机器的依赖（v2.5.5+）

📖 请参阅 [`electron/README.md`](../electron/README.md) 以获取完整文档。
