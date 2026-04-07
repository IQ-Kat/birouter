# Changelog (中文（简体）)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**中间件：**解决了禁用 requireLogin 时仪表板上新实例的无限重定向循环问题。---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Qoder API 本机集成：**完全重构了 Qoder Executor，以绕过旧版 COZY AES/RSA 加密算法，直接路由到本机 DashScope OpenAi 兼容 URL。消除对节点“加密”模块的复杂依赖，同时提高流保真度。-**弹性引擎大修：**集成上下文溢出优雅回退、主动 OAuth 令牌检测和空内容排放预防 (#990)。-**上下文优化的路由策略：**添加了新的智能路由功能，可以在自动组合部署中本机最大化上下文窗口（#990）。### 🐛 Bug Fixes

-**响应 API 流损坏：**修复了深度克隆损坏，其中 Anthropic/OpenAI 翻译边界从流边界中剥离了“响应”特定的 SSE 前缀（#992）。-**Claude 缓存直通对齐：**与上游客户端直通模式保持一致的对齐 CC 兼容缓存标记，保留提示缓存。-**Turbopack 内存泄漏：**将 Next.js 固定到严格的“16.0.10”，防止内存泄漏并从最近的上游 Turbopack 哈希模块回归中构建陈旧性 (#987)。---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Models.dev 集成：**集成 models.dev 作为模型定价、功能和规格的权威运行时源，覆盖硬编码的价格。包括用于管理同步间隔的设置 UI、所有 30 种语言的翻译字符串以及强大的测试覆盖范围。-**提供程序本机功能：**添加了对声明和检查本机 API 功能（例如“systemInstructions_supported”）的支持，通过清理无效角色来防止失败。当前配置为 Gemini Base 和 Antigravity OAuth 提供商。-**API 提供商高级设置：**为 API 密钥提供商连接添加了每个连接自定义“用户代理”覆盖。覆盖存储在“providerSpecificData.customUserAgent”中，现在适用于验证探针和上游执行请求。### 🐛 Bug Fixes

-**Qwen OAuth 可靠性：**解决了一系列 OAuth 集成问题，包括过期令牌上的 400 错误请求阻止程序、省略“id_token”时解析 OIDC“access_token”属性的回退生成、模型目录发现错误以及严格过滤“X-Dashscope-\*”标头以避免 OpenAI 兼容端点的 400 拒绝。## [3.5.0] — 2026-04-03

### ✨ New Features

-**自动组合和路由：**完成了高级自动组合引擎的本机 CRUD 生命周期集成 (#955)。-**核心操作：**修复了新的本机自动组合选项缺失的翻译（#955）。-**安全验证：**在单元测试 CI 执行期间本机禁用 SQLite 自动备份任务，以显式解决 Node 22 事件循环挂起内存泄漏 (#956)。-**生态系统代理：**通过 OmniRoute 的本机系统上游代理完成显式集成映射模型同步调度程序、OAuth 周期和令牌检查安全刷新 (#953)。-**MCP 扩展性：**添加并成功注册了新的“omniroute_web_search”MCP 框架工具（从测试版到生产模式）（#951）。-**令牌缓冲区逻辑：**添加了运行时配置限制，扩展了可配置的输入/输出令牌缓冲区，以实现精确的使用跟踪指标（#959）。### 🐛 Bug Fixes

-**CodeQL 修复：**完全解决并保护关键字符串索引操作，防止服务器端请求伪造 (SSRF) 数组索引启发式以及深度代理调度程序模块内的多项式算法回溯 (ReDoS)。-**加密哈希：**使用强大的 HMAC-SHA-256 标准验证原语替换了弱的未经验证的旧版 OAuth 1.0 哈希，确保严格的访问控制。-**API 边界保护：**正确验证和映射结构路由保护，强制执行严格的“isAuthenticated()”中间件逻辑，涵盖针对设置操作和本机技能加载的较新动态端点。-**CLI 生态系统兼容性：**解决了损坏的本机运行时解析器绑定，使外部插件的“where”环境检测器严格地在“.cmd/.exe”边缘情况下崩溃（#969）。-**缓存架构：**重构了准确的分析和系统设置仪表板参数布局结构缓存，以维持稳定的再水合持久性周期，解决视觉未对齐状态闪烁问题（#952）。-**Claude 缓存标准：**规范化并准确地严格保留关键的临时块标记“临时”缓存 TTL 订单，用于下游节点强制执行标准兼容的 CC 请求，干净地映射而不会丢失指标 (#948)。-**内部别名验证：**简化的内部运行时映射规范了全局翻译参数内的 Codex 凭证有效负载查找，解决了 401 个未经身份验证的删除问题 (#958)。### 🛠️ Maintenance

-**UI 可发现性：**正确调整布局分类，明确分离免费层提供商逻辑，改进通用 API 注册表页面内的 UX 排序流程 (#950)。-**部署拓扑：**统一的 Docker 部署工件确保根 `fly.toml` 与开箱即用的预期云实例参数匹配，正确处理自动部署扩展。-**开发工具：**将“LKGP”运行时参数解耦到显式数据库层抽象缓存实用程序中，确保安全地对核心缓存层进行严格的测试隔离覆盖。---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**仪表板自动组合面板：**完全重构了 `/dashboard/auto-combo` UI，以与本机仪表板卡和标准化视觉填充/标题无缝集成。添加了动态视觉进度条映射模型选择权重机制。-**设置路由同步：**在全局设置后备列表内部完全公开高级路由“优先级”和“加权”模式目标。### Bug Fixes

-**内存和技能区域设置节点：**通过将所有“settings.\*”映射值内部连接到“en.json”（也为交叉翻译工具隐式映射），直接在全局设置视图内解决了内存和技能选项的空渲染标签。### Internal Integrations

- 集成 PR #946 — 修复：在响应转换中保留克劳德代码兼容性
- 集成 PR #944 — 修复（gemini）：在反重力工具调用中保留思想签名
- 集成 PR #943 — 修复：恢复 GitHub Copilot 主体
- 集成 PR #942 — 修复 cc 兼容的缓存标记
- 集成 PR #941 — 重构（auth）：改进 NVIDIA 别名查找 + 添加 LKGP 错误日志记录
- 集成 PR #939 — 恢复 Claude OAuth 本地主机回调处理
- _（注意：3.4.9 周期中省略了 PR #934，以防止核心冲突回归）_---

## [3.4.8] — 2026-04-03

### 安全

- Fully remediated all outstanding Github Advanced Security (CodeQL) findings and Dependabot alerts.
- Fixed insecure randomness vulnerabilities by migrating from `Math.random` to `crypto.randomUUID()`.
- Secured shell commands in automated scripts from string injection.
- Migrated vulnerable catastrophic backtracking RegEx parsing patterns in chat/translation pipelines.
- Enhanced output sanitization controls inside React UI components and Server Sent Events (SSE) tag injection.

---

## [3.4.7] — 2026-04-03

### 功能特点

- 在监控和 MCP 健康检查中添加了“加密”节点 (#798)
- 强化模型目录路由权限映射（`/models`）（#781）### Bug Fixes

- 修复了 Claude OAuth 令牌刷新无法保留缓存上下文的问题 (#937)
- 修复了 CC 兼容提供程序错误，导致缓存模型无法访问 (#937)
- 修复了与无效上下文数组相关的 GitHub Executor 错误 (#937)
- 修复了 Windows 上 NPM 安装的 CLI 工具运行状况检查失败的问题 (#935)
- 修复了由于无效 API 字段而导致有效内容翻译丢失的问题 (#927)
- 修复了 Node 25 中有关 API 密钥执行的运行时崩溃 (#867)
- 通过 `esbuild` 修复了 MCP 独立模块解析 (`ERR_MODULE_NOT_FOUND`) (#936)
- 修复了 NVIDIA NIM 路由凭证解析别名不匹配的问题 (#931)### 安全

- 添加了针对原始“shell: true”远程代码执行注入的安全严格的输入边界保护。---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**提供商：**从社区请求的列表中注册了新的图像、视频和音频生成提供商 (#926)。-**仪表板用户界面：**为新的内存和技能模块添加了独立的侧边栏导航（#926）。-**i18n：**为 Memory 和 Skills 命名空间添加了跨 30 种语言的翻译字符串和布局映射。### 🐛 Bug Fixes

-**弹性：**通过处理回退组合路径内到 CLOSED 状态的直接转换，防止代理断路器无​​限期地陷入 OPEN 状态 (#930)。-**协议翻译：**修补流转换器以根据预期的 _source_ 协议而不是提供者 _target_ 协议清理响应块，修复 OpenAI 有效负载中封装的 Anthropics 模型导致 Claude Code 崩溃 (#929)。-**API 规范和 Gemini：**修复了“openai-to-gemini”和“claude-to-gemini”转换器中的“thought_signature”解析，防止所有 Gemini 3 API 工具调用中出现 HTTP 400 错误。-**提供商：**清理了阻止有效上游连接的非 OpenAI 兼容端点 (#926)。-**缓存趋势：**修复了无效的属性映射数据不匹配导致缓存趋势 UI 图表崩溃的问题，并提取了冗余的缓存指标小部件 (#926)。---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**CLIProxyAPI 生态系统集成：**添加了带有内置模块级缓存和代理路由的 `cliproxyapi` 执行器。引入了全面的 Version Manager 服务，用于自动测试运行状况、从 GitHub 下载二进制文件、生成隔离的后台进程，以及直接通过 UI 干净地管理外部 CLI 工具的生命周期。包括用于代理配置的数据库表，以通过本地 CLI 工具层启用外部 OpenAI 请求的自动 SSRF 门控交叉路由（#914、#915、#916）。-**Qoder PAT 支持：**直接通过本地 `qodercli` 传输而不是传统的远程 `.cn` 浏览器配置支持集成个人访问令牌 (PAT) (#913)。-**Gemini 3.1 Pro Preview (GitHub)：**在 GitHub Copilot 提供程序中添加了“gemini-3.1-pro-preview”规范显式模型支持，同时保留旧的路由别名 (#924)。### 🐛 Bug Fixes

-**GitHub Copilot 令牌稳定性：**修复了 Copilot 令牌刷新循环，其中陈旧令牌未深度合并到数据库中，并删除了严重破坏多轮聊天的下游 Anthropic 块转换的 `reasoning_text` 字段 (#923)。-**全局超时矩阵：**来自“REQUEST_TIMEOUT_MS”的集中化和参数化请求超时，以防止隐藏（约 300 秒）默认获取缓冲区过早地切断来自繁重推理模型的长期 SSE 流响应（#918）。-**Cloudflare 快速隧道状态：**修复了严重的状态不一致问题，即重新启动的 OmniRoute 实例错误地将已损坏的隧道显示为活动隧道，并默认将 cloudflare 隧道连接到“HTTP/2”以消除 UDP 接收缓冲区日志垃圾邮件 (#925)。-**i18n 翻译大修（捷克语和印地语）：**将印地语代码从已弃用的 `in.json` 修复为规范的 `hi.json`，彻底检查捷克语文本映射，提取 `untranslatable-keys.json` 来修复 CI/CD 误报验证，并生成全面的 `I18N.md` 文档来指导翻译人员 (#912)。-**令牌提供程序恢复：**修复了 Qwen 在自动运行状况检查令牌刷新后由于缺少数据库深度合并而丢失特定“resourceUrl”端点的问题（#917）。-**CC 兼容 UX 和流媒体：**围绕 Anthropic UI 处理统一添加 CC/OpenAI/Anthropic 兼容操作，强制 CC 兼容上游请求使用 SSE，同时仍根据客户端请求返回流或非流响应，删除 CC 模型列表配置/导入支持以支持显式不支持模型列表错误，并使 CC 兼容可用模型镜像 OAuth Claude 代码注册表列表 (#921)。---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**响应 API 令牌报告：**使用 Codex CLI 客户端的正确“input_tokens”/“output_tokens”字段发出“response.completed”，修复令牌使用情况显示（#909 - 感谢 @christopher-s）。-**关闭时的 SQLite WAL 检查点：**在正常关闭/重新启动期间将 WAL 更改刷新到主数据库文件中，防止 Docker 容器停止时的数据丢失（#905 — 感谢 @rdself）。-**正常关闭信号：**将 `/api/restart` 和 `/api/shutdown` 路由从 `process.exit(0)` 更改为 `process.kill(SIGTERM)`，确保关闭处理程序在退出之前运行。-**Docker 停止宽限期：**在 Docker Compose 文件中添加了 `stop_grace_period: 40s`，在 Docker 运行示例中添加了 `--stop-timeout 40`。### 🛠️ Maintenance

- 关闭了 5 个已解决/非 bug 的问题（#872、#814、#816、#890、#877）。
- 对需求信息请求的 6 个问题进行分类（#892、#887、#886、#865、#895、#870）。
- 在贡献者指导下响应了 CLI 检测跟踪问题 (#863)。---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**反重力记忆和技能：**在代理网络级别完成了反重力提供商的远程记忆和技能注入。-**Claude 代码兼容性：**为 Claude 代码构建了一个原生隐藏的兼容性桥梁，干净利落地传递工具和格式化。-**Web 搜索 MCP：**添加了具有“execute:search”范围的“omniroute_web_search”工具。-**缓存组件：**利用 TDD 实现动态缓存组件。-**UI 和自定义：**添加了自定义图标支持、外观选项卡、侧边栏有线白色标签，并添加了跨所有 33 种语言的 Windsurf 指南步骤。-**日志保留：**统一的请求日志保留和本机工件。-**模型增强：**为所有 opencode-zen 模型添加了显式的 `contextLength`。-**i18n 和翻译：**原生集成 33 种语言翻译，包括占位符 CI 验证和中文文档更新（#873、#869）。### 🐛 Bug Fixes

-**Qwen OAuth 映射：**将 `id_token` 依赖恢复为 `access_token` 并启用动态 `resource_url` API 端点注入以实现正确的区域路由 (#900)。-**模型同步引擎：**在 `getCustomModels()` 同步例程中存储严格的内部提供程序 ID，而不是 UI 通道别名格式，防止 SQLite 目录插入失败 (#903)。-**Claude Code & Codex：**对 Anthropic 格式的“（空响应）”进行标准化非流式空白响应，以防止 CLI 代理崩溃 (#866)。-**CC 兼容路由：**解决了通用 Claude Code 网关的路径串联期间的重复“/v1”端点冲突 (#904)。-**反重力仪表板：**阻止无限配额模型在提供商使用 UI 中错误注册为用尽的“100% 使用”限制状态 (#857)。-**Claude 图像直通：**修复了 Claude 模型缺少图像块直通的问题 (#898)。-**Gemini CLI 路由：**通过 `loadCodeAssist` 刷新项目 ID 解决了 403 授权锁定和内容累积问题 (#868)。-**反重力稳定性：**更正了模型访问列表，强制执行 404 锁定，修复了锁定标准连接的 429 级联，并限制了“gemini-3.1-pro”输出令牌（#885）。-**提供程序同步节奏：**通过内部调度程序修复了提供程序限制同步节奏（#888）。-**仪表板优化：**通过块并行化处理 70 多个帐户时解决了 `/dashboard/limits` UI 冻结问题 (#784)。-**SSRF 强化：**强制执行严格的 SSRF IP 范围过滤并阻止 `::1` 环回接口。-**MIME 类型：**将`mime_type`标准化为snake_case，以匹配Gemini API 规范。-**CI 稳定：**修复了失败的分析/设置 Playwright 选择器和请求断言，以便 GitHub Actions E2E 跨本地化 UI 和基于开关的控件可靠地运行。-**确定性测试：**从 Copilot 使用测试中删除了日期敏感的配额固定装置，并将幂等性/模型目录测试与合并的运行时行为保持一致。-**MCP 类型强化：**从 MCP 服务器工具注册路径中删除了零预算显式“任何”回归。-**模型同步引擎：**当提供程序的自动同步产生空模型列表时，绕过破坏性的“替换”覆盖，从而保持动态目录的稳定性（#899）。### 🛠️ Maintenance

-**管道日志记录：**精炼管道日志记录工件并强制保留上限 (#880)。-**AGENTS.md 大修：**由 297→153 行压缩而成。添加了构建/测试/样式指南、代码工作流程（Prettier、TypeScript、ESLint）和修剪的详细表（#882）。-**发布分支集成：**将活动功能分支合并到当前“main”之上的“release/v3.4.2”，并通过 lint、单元、覆盖率、构建和 CI 模式 E2E 运行验证分支。-**测试：**添加了用于组件测试的 vitest 配置和用于设置切换的 Playwright 规范。-**文档更新：**扩展了根自述文件，本地翻译了中文文档，并清理了过时的文件。## [3.4.1] - 2026-03-31

> [!警告]
> **重大更改：请求日志记录、保留和日志记录环境变量已重新设计。**
> 升级后首次启动时，OmniRoute 会将“DATA_DIR/logs/”、“DATA_DIR/call_logs/”和“DATA_DIR/log.txt”中的旧请求日志存档到“DATA_DIR/log_archives/\*.zip”，然后删除已弃用的布局并切换到“DATA_DIR/call_logs/”下的新统一工件格式。### ✨ New Features

-**.ENV 迁移实用程序：**包含 `scripts/migrate-env.mjs`，可将 `<v3.3` 配置无缝迁移到 `v3.4.x` 严格安全验证约束 (FASE-01)，修复由短 `JWT_SECRET` 实例导致的启动崩溃。-**Kiro AI 缓存优化：**实现了确定性“conversationId”生成 (uuidv5)，以在调用之间正确启用 AWS Builder ID 提示缓存 (#814)。-**仪表板 UI 恢复和整合：**解决了省略调试部分的侧边栏逻辑，并通过将独立的“/dashboard/mcp”和“/dashboard/a2a”页面明确移动到嵌入式端点代理 UI 组件中来清除 Nextjs 路由警告。-**统一请求日志工件：**请求日志记录现在在“DATA_DIR/call_logs/”下存储一个 SQLite 索引行以及每个请求一个 JSON 工件，并在同一文件中嵌入可选的管道捕获。-**语言：**改进了中文翻译 (#855) -**Opencode-Zen 模型：**在 opencode-zen 注册表中添加了 4 个免费模型 (#854) -**测试：**添加了用于设置切换和错误修复的单元和 E2E 测试 (#850)### 🐛 Bug Fixes

-**429 配额解析：**从错误主体解析长配额重置时间，以遵守正确的退避并防止速率受限的帐户禁令 (#859) -**提示缓存：**为所有 Claude 协议提供者（如 Minimax、GLM 和 Bailian）保留客户端 `cache_control` 标头，正确识别缓存支持 (#856) -**模型同步日志：**仅在通道实际修改列表时记录“sync-models”，从而减少日志垃圾邮件 (#853) -**提供者配额和令牌解析：**切换反重力限制以本地使用 `retrieveUserQuota` 并将 Claude 令牌刷新有效负载正确映射到 URL 编码表单 (#862) -**速率限制稳定性：**通用化 429 Retry-After 解析架构，以将提供商引起的冷却时间限制在最多 24 小时 (#862) -**仪表板限制渲染：**重新设计了`/dashboard/limits`配额映射以立即在块内渲染，修复了超过 70 个活动连接的帐户上的主要 UI 冻结延迟 (#784) -**QWEN OAuth 授权：**将 OIDC `id_token` 映射为 Dashscope 请求的主要 API Bearer 令牌，修复连接帐户或刷新令牌后立即出现的 401 未经授权错误 (#864) -**ZAI API 稳定性：**强化服务器发送事件编译器，当 DeepSeek 提供程序在推理阶段流式传输数学空内容时，可以优雅地回退到空字符串 (#871) -**Claude Code/Codex 翻译：**保护非流有效负载转换，防止来自上游 Codex 工具的空响应，避免灾难性的类型错误 (#866) -**NVIDIA NIM 渲染：**有条件地剥离音频模型动态推送的相同提供商前缀，消除重复的“nim/nim”标签结构，从而在媒体游乐场上抛出 404 (#872)### ⚠️ Breaking Changes

-**请求日志布局：**删除了旧的多文件“DATA*DIR/logs/”请求日志会话和“DATA_DIR/log.txt”摘要文件。新请求将作为单个 JSON 工件写入“DATA_DIR/call_logs/YYYY-MM-DD/”中。-**日志记录环境变量：**使用新的“APP_LOG*_”和“CALL*LOG_RETENTION_DAYS”配置模型替换了“LOG*_”、“ENABLE_REQUEST_LOGS”、“CALL_LOGS_MAX”、“CALL_LOG_PAYLOAD_MODE”和“PROXY_LOG_MAX_ENTRIES”。-**管道切换设置：**将旧的“detailed_logs_enabled”设置替换为“call_log_pipeline_enabled”。新的管道详细信息嵌入在请求工件中，而不是存储为单独的“request_detail_logs”记录。### 🛠️ Maintenance

-**旧版请求日志升级备份：**在删除已弃用的结构之前，升级现在会将旧的“data/logs/”、旧版“data/call_logs/”和“data/log.txt”布局存档到“DATA_DIR/log_archives/\*.zip”中。-**流式使用持久性：**流式请求现在在完成时写入单个“usage_history”行，而不是发出带有空状态元数据的重复的正在进行的使用行。-**日志记录后续清理：**管道日志不再捕获“SOURCE REQUEST”，请求工件条目现在遵循“CALL_LOG_MAX_ENTRIES”，应用程序日志存档现在遵循“APP_LOG_MAX_FILES”。---

## [3.4.0] - 2026-03-31

### 功能特点

-**订阅利用率分析：**添加了配额快照时间序列跟踪、提供者利用率和组合运行状况选项卡以及图表可视化以及相应的 API 端点 (#847) -**SQLite 备份控制：**新的 `OMNIROUTE_DISABLE_AUTO_BACKUP` env 标志用于禁用自动 SQLite 备份 (#846) -**模型注册表更新：**将 `gpt-5.4-mini` 注入 Codex 提供商的模型数组中 (#756) -**提供商限制跟踪：**跟踪并显示每个帐户上次刷新提供商速率限制的时间 (#843)### 🐛 Bug Fixes

-**Qwen Auth 路由：**将 Qwen OAuth 完成从 DashScope API 重新路由到 Web Inference API (`chat.qwen.ai`)，解决授权失败问题 (#844、#807、#832) -**Qwen 自动重试循环：**在“chatCore”内添加了目标 429 配额超出退避处理，保护突发请求 -**Codex OAuth Fallback：**现代浏览器弹出窗口阻止不再困住用户；它会自动退回到手动 URL 输入 (#808) -**Claude 令牌刷新：**Anthropic 严格的“application/json”边界现在在令牌生成过程中受到尊重，而不是编码的 URL (#836) -**Codex 消息架构：**从本机直通请求中剥离纯粹的“消息”注入，以避免来自 ChatGPT 上游的结构性拒绝 (#806) -**CLI 检测大小限制：**将节点二进制扫描上限从 100MB 安全地提高到 350MB，允许 VPS 运行时正确检测 Claude Code (229MB) 和 OpenCode (153MB) 等重型独立工具 (#809) -**CLI 运行时环境：**恢复了 CLI 配置尊重用户覆盖路径 (`CLI_{PROVIDER}_BIN`) 绕过严格路径绑定发现规则的能力 -**Nvidia 标头冲突：**在调用非 Anthropic 提供程序时从上游标头中删除了 `prompt_cache_key` 属性 (#848) -**Codex 快速层切换：**恢复了 Light 模式下的 Codex 服务层切换对比度 (#842) -**测试基础设施：**更新了“t28-model-catalog-updates”测试，该测试错误地预期 Qwen 本机注册表的过时 DashScope 端点---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**自定义提供程序轮换：**在 DefaultExecutor 内部集成 `getRotatingApiKey`，确保自定义和兼容的上游提供程序正确触发 `extraApiKeys` 轮换 (#815)---

## [3.3.8] - 2026-03-30

### 功能特点

-**模型 API 过滤：**端点 `/v1/models` 现在在受限访问开启时根据与 `Authorization: Bearer <token>` 绑定的权限动态过滤其列表 (#781) -**Qoder 集成：**Qoder AI 的本机集成本机替换旧版 iFlow 平台映射 (#660) -**提示缓存跟踪：**添加了跟踪功能和前端可视化（统计卡），用于仪表板 UI 中的语义和提示缓存### 🐛 Bug Fixes

-**缓存仪表板大小调整：**改进了高级缓存页面的 UI 布局大小和上下文标题 (#835) -**调试侧边栏可见性：**修复了调试切换无法正确显示/隐藏侧边栏调试详细信息的问题 (#834) -**Gemini 模型前缀：**修改了命名空间后备，以通过 `gemini-cli/` 而不是 `gc/` 正确路由，以尊重上游规范 (#831) -**OpenRouter 同步：**改进了兼容性同步，以自动从 OpenRouter 正确提取可用模型目录 (#830) -**流式有效负载映射：**当输出流式传输到边缘设备时，推理字段的重新序列化可以本机解决冲突别名路径---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config：**重构生成的 `opencode.json` 以使用 `@ai-sdk/openai-company` 基于记录的模式，将 `options` 和 `models` 作为对象映射而不是平面数组，修复配置验证失败 (#816) -**i18n 缺少密钥：**在所有 30 种语言文件中添加了缺少的 `cloudflaredUrlNotice` 翻译密钥，以防止 Endpoint 页面中出现 `MISSING_MESSAGE` 控制台错误 (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**令牌会计：**在历史使用输入计算中安全地包含提示缓存令牌，以实现正确的配额扣除（PR #822）-**组合测试探针：**通过解析仅推理响应来修复组合测试逻辑漏报，并通过 Promise.all 启用大规模并行化（PR #828）-**Docker 快速隧道：**在基本运行时容器内嵌入所需的 ca 证书，以解决 Cloudflared TLS 启动故障，并显示标准输出网络错误，替换通用退出代码 (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Gemini 配额跟踪：**通过“retrieveUserQuota” API 添加了实时 Gemini CLI 配额跟踪（PR #825）-**缓存仪表板：**增强了缓存仪表板以显示提示缓存指标、24 小时趋势和估计成本节省（PR #824）### 🐛 Bug Fixes

-**用户体验：**删除了贫瘠的提供商详细页面上的侵入性自动打开 OAuth 模式循环（PR #820）-**依赖项更新：**增加并锁定了开发和生产树的依赖项，包括 Next.js 16.2.1、Recharts 和 TailwindCSS 4.2.2（PR #826、#827）---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**A2A 工作流程：**为多步骤代理工作流程添加了确定性 FSM 协调器。-**优雅降级：**添加了新的多层回退框架，以在部分系统中断期间保留核心功能。-**配置审核：**添加了具有差异检测的审核跟踪，以跟踪更改并启用配置回滚。-**提供程序运行状况：**添加了提供程序过期跟踪，并针对过期 API 密钥发出主动 UI 警报。-**自适应路由：**添加了自适应容量和复杂性检测器，以根据负载动态覆盖路由策略。-**提供商多样性：**通过香农熵实施提供商多样性评分，以改善负载分配。-**自动禁用边界：**在弹性仪表板中添加了自动禁用禁止帐户设置切换。### 🐛 Bug Fixes

-**Codex 和 Claude 兼容性：**修复了 UI 回退，修补了 Codex 非流集成问题，并解决了 Windows 上的 CLI 运行时检测。-**发布自动化：**在 GitHub Actions 中构建 Electron 应用程序所需的扩展权限。-**Cloudflare 运行时：**解决了 Cloudflare 隧道组件的正确运行时隔离退出代码。### 🧪 Tests

-**测试套件更新：**扩大了容量检测器、提供商多样性、配置审核和 FSM 的测试覆盖范围。---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**CI/CD 可靠性：**将 GitHub Actions 修补到稳定的依赖版本（`actions/checkout@v4`、`actions/upload-artifact@v4`），以减少未宣布的构建器环境弃用。-**图像回退：**使用显式资产验证替换了“ProviderIcon.tsx”中的任意回退链，以防止 UI 加载不存在的文件的“<Image>”组件，从而消除仪表板控制台日志中的“404”错误 (#745)。-**管理更新程序：**仪表板更新程序的动态源安装检测。当 OmniRoute 在本地构建而不是通过 npm 构建时，安全地禁用“立即更新”按钮，提示“git pull”(#743)。-**更新 ERESOLVE 错误：**注入了 `react`/`react-dom` 的 `package.json` 覆盖，并在内部自动更新程序脚本中启用了 `--legacy-peer-deps`，以解决与 `@lobehub/ui` 的破坏性依赖树冲突。---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Cloudflare Tunnels：**Cloudflare Quick Tunnel 与仪表板控件集成（PR #772）。-**诊断：**用于组合实时测试的语义缓存旁路（PR #773）。### 🐛 Bug Fixes

-**流稳定性：**将 `FETCH_TIMEOUT_MS` 应用于流请求的初始 `fetch()` 调用，以防止 300 秒 Node.js TCP 超时导致静默任务失败 (#769)。-**i18n:**将缺失的 `windsurf` 和 `copilot` 条目添加到所有 33 个语言环境文件中的 `toolDescriptions` 中 (#748)。-**GLM 编码审计：**完整的提供商审计修复 ReDoS 漏洞、上下文窗口大小 (128k/16k) 和模型注册表同步 (PR #778)。---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex：**针对携带 null 或空数据集的“type:“text””元素进行回退处理修复，导致 400 拒绝 (#742)。-**Opencode：**将模式对齐更新为单数“provider”以匹配官方规范（#774）。-**Gemini CLI：**注入缺失的最终用户配额标头，防止 403 授权锁定 (#775)。-**数据库恢复：**将多部分有效负载导入重构为原始二进制缓冲数组，以绕过反向代理最大主体限制（#770）。---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**版本稳定**— 最终 v3.2.9 版本（组合诊断、质量门、Gemini 工具修复）并创建了缺失的 git 标签。将所有分阶段的更改合并到单个原子发布提交中。### 🐛 Bug Fixes

-**自动更新测试**— 修复了“buildDockerComposeUpdateScript”测试断言，以匹配生成的部署脚本中未展开的 shell 变量引用（“$TARGET_TAG”、“${TARGET_TAG#v}”），与 v3.2.8 中的重构模板保持一致。-**断路器测试**— 通过注入 `maxRetries: 0` 来强化 `combo-Circuit-breaker.test.mjs`，以防止在断路器状态转换期间重试膨胀导致故障计数断言出现偏差。---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**组合诊断**- 引入了实时测试旁路标志（“forceLiveComboTest”），允许管理员执行真正的上游运行状况检查，绕过所有本地断路器和冷却状态机制，从而在滚动中断期间实现精确诊断（PR＃759）-**质量门**- 添加了组合的自动响应质量验证，并将“claude-4.6”模型支持正式集成到核心路由模式中（PR #762）### 🐛 Bug Fixes

-**工具定义验证**- 通过规范工具定义内的枚举类型修复了 Gemini API 集成，防止上游 HTTP 400 参数错误（PR #760）---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Docker 自动更新 UI**— 为 Docker Compose 部署集成了独立的后台更新过程。仪表板 UI 现在无缝跟踪更新生命周期事件，将 JSON REST 响应与 SSE 流式进度覆盖相结合，以实现强大的跨环境可靠性。-**缓存分析**— 通过将语义缓存遥测日志直接迁移到集中式跟踪 SQLite 模块中，修复了零指标可视化映射。### 🐛 Bug Fixes

-**身份验证逻辑**— 修复了禁用“requireLogin”时保存仪表板设置或添加模型失败并出现 401 未经授权错误的错误。 API 端点现在可以正确评估全局身份验证切换。通过重新激活“src/middleware.ts”解决了全局重定向问题。-**CLI 工具检测 (Windows)**— 通过正确捕获“cross-spawn”ENOENT 错误，防止 CLI 环境检测期间发生致命初始化异常。添加“\AppData\Local\droid\droid.exe”的显式检测路径。-**Codex Native Passthrough**- 规范化模型转换参数可防止代理传递模式中的上下文中毒，对所有 Codex 发起的请求显式强制执行通用“store: false”约束。-**SSE 令牌报告**— 标准化提供商工具调用块“finish_reason”检测，修复了缺少严格“<DONE>”指标的纯流响应的 0% 使用情况分析。-**DeepSeek <think> 标签**— 在 `responsesHandler.ts` 内实现了显式的 `<think>` 提取映射，确保 DeepSeek 推理流等效地映射到本机 Anthropic `<thinking>` 结构。---

## [3.2.7] - 2026-03-29

### Fixed

-**无缝 UI 更新**：仪表板上的“立即更新”功能现在使用服务器发送事件 (SSE) 提供实时、透明的反馈。它执行包安装、本机模块重建 (better-sqlite3) 和 PM2 可靠地重新启动，同时显示实时加载程序而不是静默挂起。---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API Key Reveal (#740)**— 在 Api Manager 中添加了范围内的 API 密钥复制流程，受“ALLOW_API_KEY_REVEAL”环境变量的保护。-**侧边栏可见性控制 (#739)**— 管理员现在可以通过外观设置隐藏任何侧边栏导航链接，以减少视觉混乱。-**严格的组合测试 (#735)**- 强化组合运行状况检查端点，要求模型提供实时文本响应，而不仅仅是软可达性信号。-**流式详细日志 (#734)**— 切换 SSE 流的详细请求日志记录以重建最终有效负载，节省大量 SQLite 数据库大小并显着清理 UI。### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— 更正了 OpenCode Go 上“minimax”模型的身份验证标头逻辑，以使用“x-api-key”而不是跨“/messages”协议的标准承载令牌。---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux 部署支持 (#732)**— 集成 `xbps-src` 打包模板和说明，用于通过交叉编译目标使用 `better-sqlite3` 绑定本地编译和安装 OmniRoute。## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI 迁移 (#660)**— 将旧版“iFlow”核心提供商完全迁移到“Qoder AI”，保持稳定的 API 路由功能。### 🐛 Bug Fixes

-**Gemini Tools HTTP 400 Payload Invalid Argument (#731)**— 阻止标准 Gemini `functionCall` 序列内的 `thoughtSignature` 数组注入，从而阻止代理路由流。---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**提供商限制配额 UI (#728)**— 限制界面内的规范化配额限制逻辑和数据标签。### 🐛 Bug Fixes

-**核心路由架构和泄漏**- 扩展了“comboStrategySchema”，以原生支持“fill-first”和“p2c”策略，以原生解锁复杂的组合编辑。-**思维标签提取 (CLI)**— 重构 CLI 令牌响应清理器 RegEx 捕获流内的模型推理结构，避免损坏的“<thinking>”提取破坏响应文本输出格式。-**严格的格式执行**- 强化的管道清理执行使其普遍适用于翻译模式目标。---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**四阶段请求日志管道 (#705)**— 重构日志持久性，以在四个不同的管道阶段保存全面的有效负载：客户端请求、翻译的提供程序请求、提供程序响应和翻译的客户端响应。引入了“streamPayloadCollector”以实现强大的 SSE 流截断和有效负载序列化。### 🐛 Bug Fixes

-**移动 UI 修复 (#659)**— 通过向“DashboardLayout”添加适当的水平滚动和溢出遏制，防止仪表板上的表格组件破坏窄视口上的布局。-**Claude 提示缓存修复 (#708)**— 确保 Claude-to-Claude 后备循环中的“cache_control”块被忠实保留并安全地传递回人类模型。-**Gemini 工具定义 (#725)**— 修复了为 Gemini 函数调用声明简单“对象”参数类型时的模式转换错误。## [3.2.1] — 2026-03-29

### ✨ New Features

-**全局回退提供程序 (#689)**— 当所有组合模型都用尽 (502/503) 时，OmniRoute 现在会在返回错误之前尝试可配置的全局回退模型。在设置中将 `globalFallbackModel` 设置为启用。### 🐛 Bug Fixes

-**修复#721**- 修复了工具调用响应期间的上下文固定绕过。非流式标记使用了错误的 JSON 路径（`json.messages`→`json.choices[0].message`）。流注入现在会在仅工具调用流的“finish_reason”块上触发。 `injectModelTag()` 现在为非字符串内容附加合成 pin 消息。-**修复 #709**— 确认已修复 (v3.1.9) — `system-info.mjs` 递归创建目录。关闭。-**修复 #707**— 确认已修复 (v3.1.9) — `chatCore.ts` 中的空工具名称清理。关闭。### 🧪 Tests

- 添加了 6 个单元测试，用于通过工具调用响应进行上下文固定（空内容、数组内容、往返、重新注入）## [3.2.0] — 2026-03-28

### ✨ New Features

-**缓存管理 UI**— 在 \`/dashboard/cache\` 添加了专用的语义缓存仪表板，具有目标 API 失效和 31 种语言 i18n 支持（PR #701 by @oyi77）-**GLM 配额跟踪**— 为 GLM 编码 (Z.AI) 提供商添加了实时使用情况和会话配额跟踪（PR #698 by @christopher-s）-**详细的日志有效负载**- 将完整的四阶段管道有效负载捕获（原始、翻译、提供者响应、流式增量）直接连接到 UI（PR #705 by @rdself）### 🐛 Bug Fixes

-**修复 #708**— 通过在 Claude 到 Claude 直通期间正确保留本机 \`cache_control\` 标头，防止 Claude 代码用户通过 OmniRoute 路由的令牌泄漏（@tombii 的 PR #708）-**修复 #719**— 为 ModelSyncScheduler 设置内部身份验证边界，以防止启动时未经身份验证的守护进程失败（@rdself 的 PR #719）-**修复 #718**— 在提供商限制 UI 中重建徽章渲染，防止不良配额边界重叠（PR #718 by @rdself）-**修复 #704**— 修复了 HTTP 400 内容策略错误导致的组合回退，防止模型旋转死路由（PR #704 by @rdself）### 🔒 Security & Dependencies

- 将“正则表达式路径”更改为“8.4.0”，解决了 dependentabot 漏洞（PR #715）## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**修复 #706**— 通过将 `!important` 应用于 `.material-symbols-outlined` 修复了由 Tailwind V4 `font-sans` 覆盖导致的图标回退渲染。-**修复#703**— 通过为任何利用“apiFormat：“responses””的自定义模型启用“响应”到“openai”格式转换，修复了 GitHub Copilot 损坏的流。-**修复 #702**— 将固定费率使用跟踪替换为流式和非流式响应的准确数据库定价计算。-**修复 #716**— 清理了 Claude 工具调用翻译状态，正确解析流参数并防止 OpenAI `tool_calls` 块重复 `id` 字段。## [3.1.9] — 2026-03-28

### ✨ New Features

-**模式强制**— 自动将字符串编码的数字 JSON 模式约束（例如 `"minimum": "1"`）强制转换为正确的类型，防止 Cursor、Cline 和其他发送格式错误的工具模式的客户端出现 400 错误。-**工具描述清理**— 确保工具描述始终是字符串；在发送给提供者之前将“null”、“undefined”或数字描述转换为空字符串。-**清除所有模型按钮**— 为所有 30 种语言的“清除所有模型”提供商操作添加了 i18n 翻译。-**Codex Auth Export**— 添加了 Codex `auth.json` 导出和应用本地按钮，以实现无缝 CLI 集成。-**Windsurf BYOK 注释**— 在记录 BYOK 限制的 Windsurf CLI 工具卡中添加了官方限制警告。### 🐛 Bug Fixes

-**修复 #709**— 当输出目录不存在时，`system-info.mjs` 不再崩溃（添加了带有递归标志的 `mkdirSync`）。-**修复 #710**— A2A `TaskManager` 单例现在使用 `globalThis` 来防止开发模式下 Next.js API 路由重新编译中的状态泄漏。 E2E 测试套件已更新，可以优雅地处理 401。-**修复 #711**— 为上游请求添加了特定于提供商的“max*tokens”上限强制执行。-**修复 #605 / #592**— 从非流式 Claude 响应中的工具名称中去除“proxy*”前缀；修复了 LongCat 验证 URL。-**呼叫日志最大上限**— 升级了 `getMaxCallLogs()`，具有缓存层、环境变量支持 (`CALL_LOGS_MAX`) 和数据库设置集成。### 🧪 Tests

- 测试套件从 964 个测试扩展到 1027 个测试（63 个新测试）
- 添加了 `schema-coercion.test.mjs` — 9 个数字字段强制和工具描述清理测试
- 添加了 `t40-opencode-cli-tools-integration.test.mjs` — OpenCode/Windsurf CLI 集成测试
- 具有全面覆盖工具的增强功能测试分支### 📁 New Files

| 文件                                                    | 目的                           |
| ------------------------------------------------------- | ------------------------------ | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`         | 模式强制和工具描述清理实用程序 |
| `测试/单元/schema-coercion.test.mjs`                    | 模式强制的单元测试             |
| `测试/单元/t40-opencode-cli-tools-integration.test.mjs` | CLI 工具集成测试               |
| `COVERAGE_PLAN.md`                                      | 测试覆盖率规划文档             | ### 🐛 Bug Fixes |

-**Claude 提示缓存直通**- 修复了在 Claude 直通模式（Claude → OmniRoute → Claude）中被剥离的 cache_control 标记，这导致 Claude Code 用户耗尽其 Anthropic API 配额的速度比直接连接快 5-10 倍。现在，当 sourceFormat 和 targetFormat 均为 Claude 时，OmniRoute 会保留客户端的 cache_control 标记，从而确保提示缓存正常工作并显着减少令牌消耗。## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**平台核心：**为隐藏模型和组合实现了全局状态处理，防止它们弄乱目录或泄漏到连接的 MCP 代理中 (#681)。-**稳定性：**修补了与本机反重力提供程序集成由于未处理的未定义状态数组而失败相关的流崩溃（#684）。-**本地化同步：**部署了全面检修的“i18n”同步器，检测缺失的嵌套 JSON 属性并按顺序改造 30 个语言环境 (#685)。## [3.1.7] - 2026-03-27### 🐛 Bug Fixes

-**流稳定性：**修复了“hasValuableContent”为 SSE 流中的空块返回“undefined”的问题 (#676)。-**工具调用：**修复了 `sseParser.ts` 中的一个问题，即由于基于索引的重复数据删除不正确，具有多个工具调用的非流 Claude 响应丢弃了后续工具调用的 `id` (#671)。---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Claude 本机工具名称恢复**— 像 `TodoWrite` 这样的工具名称在 Claude 直通响应（流式和非流式）中不再以 `proxy_` 为前缀。包括单元测试覆盖率（PR #663 by @coobabm）-**清除所有模型别名清理**- “清除所有模型”按钮现在还会删除关联的模型别名，防止 UI 中出现幽灵模型（PR #664 by @rdself）---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**退避自动衰减**- 速率受限的帐户现在会在冷却窗口到期时自动恢复，解决了高“backoffLevel”永久降低帐户优先级的死锁（PR #657 by @brendandebeasi）### 🌍 i18n

-**中文翻译大修**— 全面重写 `zh-CN.json` 并提高准确性（PR #658 by @only4copilot）---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**流覆盖修复**- 请求正文中的显式“stream: true”现在优先于“Accept: application/json”标头。发送两者的客户端将正确接收 SSE 流响应 (#656)### 🌍 i18n

-**捷克语字符串改进**— 改进了 `cs.json` 中的术语（PR #655 by @zen0bit）---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 个缺失翻译键**添加到 `en.json` 和 12 种语言（PR #652 by @zen0bit）-**更新捷克语文档**— CLI-TOOLS、API_REFERENCE、VM_DEPLOYMENT 指南 (PR #652) -**翻译验证脚本**— 用于 CI/QA 的 `check_translations.py` 和 `validate_translation.py`（PR #651 by @zen0bit）---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**关键：工具调用回归**— 通过禁用 Claude 直通路径中的 `proxy_` 工具名称前缀修复了 `proxy_Bash` 错误。 “Bash”、“Read”、“Write”等工具被重命名为“proxy_Bash”、“proxy_Read”等，导致 Claude 拒绝它们 (#618) -**Kiro 账户禁令文档**— 记录为上游 AWS 反欺诈误报，而不是 OmniRoute 问题 (#649)### 🧪 Tests

-**936 次测试，0 次失败**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**视觉能力元数据**：为具有视觉功能的模型在“/v1/models”条目中添加了“capability.vision”、“input_modalities”和“output_modalities”（PR #646）-**Gemini 3.1 型号**：向反重力提供程序添加了 `gemini-3.1-pro-preview` 和 `gemini-3.1-flash-lite-preview` (#645)### 🐛 Bug Fixes

-**Ollama Cloud 401 错误**：修复了不正确的 API 基本 URL — 从 `api.ollama.com` 更改为官方的 `ollama.com/v1/chat/completions` (#643) -**过期令牌重试**：为过期的 OAuth 连接添加具有指数退避（5→10→20 分钟）的有界重试，而不是永久跳过它们（PR #647）### 🧪 Tests

-**936 次测试，0 次失败**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**GitHub 问题模板**：添加了标准化错误报告、功能请求和配置/代理问题模板 (#641) -**清除所有型号**：在提供商详细信息页面添加了“清除所有型号”按钮，并支持 29 种语言的 i18n (#634)### 🐛 Bug Fixes

-**区域设置冲突 (`in.json`)**：将印地语区域设置文件从 `in.json` （印度尼西亚 ISO 代码）重命名为 `hi.json` 以修复 Weblate 中的翻译冲突 (#642) -**Codex 空工具名称**：在本机 Codex 直通之前移动了工具名称清理，修复了工具名称为空时来自上游提供商的 400 错误 (#637) -**流式换行符**：在响应清理器中添加了 `collapseExcessiveNewlines`，将思维模型中的 3 个以上连续换行符折叠为标准双换行符 (#638) -**Claude Reasoning Effort**：将 OpenAI `reasoning_effort` 参数转换为 Claude 在所有请求路径上的原生 `thinking` 预算块，包括自动 `max_tokens` 调整 (#627) -**Qwen 令牌刷新**：实施主动到期前 OAuth 令牌刷新（5 分钟缓冲），以防止使用短期令牌时请求失败 (#631)### 🧪 Tests

-**936 次测试，0 次失败**（自 3.0.9 起+10 次测试）---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**Claude 代码/客户端响应中的 NaN 标记 (#617):**

- “sanitizeUsage()”现在在白名单过滤器之前交叉映射“input_tokens”→“prompt_tokens”和“output_tokens”→“completion_tokens”，修复了当提供程序返回 Claude 风格的使用字段名称时显示 NaN/0 令牌计数的响应### 安全

- 更新了`yaml`包以修复堆栈溢出漏洞（GHSA-48c2-rrv3-qjmp）### 📋 Issue Triage

- 已关闭 #613（Codestral — 使用自定义提供程序解决方法解决）
- 对 #615 进行了评论（OpenCode 双端点 — 提供了解决方法，作为功能请求进行跟踪）
- 评论#618（工具调用可见性 - 请求 v3.0.9 测试）
- 对 #627 发表评论（努力程度 — 已支持）---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Claude CLI 中 OpenAI 格式提供程序的翻译失败 (#632)：**

- 处理来自 StepFun/OpenRouter 的 `reasoning_details[]` 数组格式 — 转换为 `reasoning_content`
- 处理来自某些提供商的“reasoning”字段别名→标准化为“reasoning_content”
- 跨映射使用字段名称：`filterUsageForFormat` 中的 `input_tokens`↔`prompt_tokens`、`output_tokens`↔`completion_tokens`
- 修复“extractUsage”以接受“input_tokens”/“output_tokens”和“prompt_tokens”/“completion_tokens”作为有效的使用字段
- 适用于流式传输（`sanitizeStreamingChunk`、`openai-to-claude.ts` 转换器）和非流式传输（`sanitizeMessage`）路径---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**反重力令牌刷新：**修复了安装 npm 的用户的“client_secret ismissing”错误 -providerRegistry 中的“clientSecretDefault”为空，导致 Google 拒绝令牌刷新请求 (#588) -**OpenCode Zen 模型：**将 `modelsUrl` 添加到 OpenCode Zen 注册表项，以便“从 /models 导入”正常工作 (#612) -**流媒体工件：**修复了思考标签签名剥离后响应中留下的过多换行符（#626）-**代理回退：**添加了当 SOCKS5 中继失败时无需代理的自动重试 -**代理测试：**测试端点现在通过 proxyId 解析来自数据库的真实凭据### ✨ New Features

-**Playground 帐户/密钥选择器：**持久且始终可见的下拉菜单，用于选择特定提供商帐户/密钥进行测试 - 在启动时获取所有连接并按所选提供商进行过滤 -**CLI 工具动态模型：**模型选择现在从 `/v1/models` API 动态获取 - 像 Kiro 这样的提供商现在显示他们的完整模型目录 -**反重力模型列表：**更新了 Claude Sonnet 4.5、Claude Sonnet 4、GPT 5、GPT 5 Mini；启用“passthroughModels”以进行动态模型访问（#628）### 🔧 Maintenance

- 合并 PR #625 — 提供商限制灯光模式背景修复---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**限制/代理：**修复了 SOCKS5 代理后面帐户的 Codex 限制获取 — 令牌刷新现在在代理上下文中运行 -**CI：**修复了在没有提供者连接的 CI 环境中集成测试 `v1/models` 断言失败的问题 -**设置：**代理测试按钮现在立即显示成功/失败结果（之前隐藏在健康数据后面）### ✨ New Features

-**Playground：**添加了帐户选择器下拉列表 - 当提供商拥有多个帐户时单独测试特定连接### 🔧 Maintenance

- 合并 PR #623 — LongCat API 基本 URL 路径修正---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**限制 UI：**在连接仪表板中添加了标签分组功能，以改进具有自定义标签的帐户的视觉组织。---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**流：**修复了组合“sanitize” TransformStream 内的“TextDecoder”状态损坏，导致 SSE 乱码输出匹配多字节字符（PR #614）-**提供程序 UI：**使用 `dangerouslySetInnerHTML` 在提供程序连接错误工具提示中安全地呈现 HTML 标签 -**代理设置：**添加了缺少的“用户名”和“密码”有效负载主体属性，允许从仪表板成功验证经过身份验证的代理。-**提供商 API：**绑定软异常返回到 `getCodexUsage`，防止令牌获取失败时 API HTTP 500 失败---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**自动同步模型：**添加了 UI 切换和“sync-models”端点，以使用预定的间隔调度程序自动同步每个提供程序的模型列表（PR #597）### 🐛 Bug Fixes

-**超时：**将默认代理 `FETCH_TIMEOUT_MS` 和 `STREAM_IDLE_TIMEOUT_MS` 提高到 10 分钟，以正确支持深度推理模型（如 o1），而不会中止请求（修复 #609）-**CLI 工具检测：**改进了跨平台检测处理 NVM 路径、Windows `PATHEXT`（防止 `.cmd` 包装器问题）和自定义 NPM 前缀（PR #598）-**流日志：**在流响应日志中实现了“tool_calls”增量累积，以便在数据库中准确跟踪和保留函数调用（PR #603）-**模型目录：**删除了身份验证豁免，在没有显式配置提供程序时正确隐藏“comfyui”和“sdwebui”模型（PR＃599）### 🌐 Translations

-**cs:**改进了应用程序中的捷克语翻译字符串（PR #601）## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Added a Tag/Group field to `EditConnectionModal` (stored in `providerSpecificData.tag`) without requiring DB schema migrations.
- Connections in the provider view now dynamically group by tag with visual dividers.
- Untagged connections appear first without a header, followed by tagged groups in alphabetical order.
- The tag grouping automatically applies to the Codex/Copilot/Antigravity Limits section since toggles exist inside connection rows.

### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**连接卡上缺少徽章：**通过使用 `resolveProxyForConnection()` 而不是静态映射来修复。-**在保存模式下禁用测试连接：**通过从保存的列表解析代理配置来启用“测试”按钮。-**配置模态冻结：**在保存/清除后添加了 `onClose()` 调用以防止 UI 冻结。-**双重使用计数：**`ProxyRegistryManager` 现在在挂载时急切地加载使用情况，并通过 `scope` + `scopeId` 进行重复数据删除。使用计数已替换为内联显示 IP/延迟的测试按钮。#### fix(translator): `function_call` prefix stripping

- 修复了 PR #607 中的一个不完整修复，其中只有“tool*use”块剥离了 Claude 的“proxy*”工具前缀。现在，使用 OpenAI Responses API 格式的客户端也将正确接收不带“proxy\_”前缀的工具工具。---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

v3.0.0 发布后用户报告的三个关键问题已得到解决。#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Claude OAuth 添加的“proxy\_”前缀仅从**流**响应中删除。在**非流**模式下，“translateNonStreamingResponse”无法访问“toolNameMap”，导致客户端收到损坏的工具名称，例如“proxy_read_file”而不是“read_file”。

**修复：**在“translateNonStreamingResponse”中添加了可选的“toolNameMap”参数，并在 Claude “tool_use”块处理程序中应用了前缀剥离。 `chatCore.ts` 现在传递地图。#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI 不会公开`GET /v1/models`。仅当设置了“validationModelId”（LongCat 未配置）时，通用“validateOpenAICompatibleProvider”验证器才会陷入聊天完成回退。这导致提供程序验证失败，并在添加/保存时出现误导性错误。

**修复：**将“longcat”添加到专业验证器映射中，直接探测“/chat/completions”并将任何非身份验证响应视为通过。#### fix(translator): normalize object tool schemas for Anthropic (#595)

MCP 工具（例如 `pencil`、`computer_use`）使用 `{type:"object"}` 转发工具定义，但没有 `properties` 字段。 Anthropic 的 API 拒绝这些：“对象模式缺少属性”。

**修复：**在 `openai-to-claude.ts` 中，当 `type` 为 `"object"` 并且 `properties` 不存在时，注入 `properties: {}` 作为安全默认值。---

### 🔀 Community PRs Merged (2)

| 公关     | 作者    | 总结                                                 |
| -------- | ------- | ---------------------------------------------------- | --- |
| **#589** | @flobo3 | docs(i18n)：修复 Playground 和 Testbed 的俄语翻译    |
| **#591** | @rdself | 修复（ui）：改进提供商限制灯光模式对比度和计划层显示 | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 次测试，0 次失败**（与 v3.0.0 相比没有变化）---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **有史以来最大的版本。**从 v2.9.5 中的 36 个提供程序到 v3.0.0 中的**67 个以上提供程序**— 包括 MCP 服务器、A2A 协议、自动组合引擎、提供程序图标、注册密钥 API、926 项测试以及来自**12 名社区成员**在**10 个合并 PR**中的贡献。
>
> 从 v3.0.0-rc.1 到 rc.17 进行了整合（经过 3 天的紧张开发，有 17 个候选版本）。---

### 🆕 New Providers (+31 since v2.9.5)

| 供应商                    | 别名           | 等级   | 笔记                                                                          |
| ------------------------- | -------------- | ------ | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **OpenCode Zen**          | `opencode-zen` | 免费   | 3 个模型来自 `opencode.ai/zen/v1`（PR #530 by @kang-heewon）                  |
| **OpenCode Go**           | `opencode-go`  | 付费   | 4 个模型来自 `opencode.ai/zen/go/v1`（PR #530 by @kang-heewon）               |
| **长猫AI**                | `lc`           | 免费   | 公开测试期间 50M 代币/天（Flash-Lite）+ 500K/天（聊天/思考）                  |
| **授粉人工智能**          | `波尔`         | 免费   | 无需 API 密钥 — GPT-5、Claude、Gemini、DeepSeek V3、Llama 4（1 个请求/15 秒） |
| **Cloudflare Workers AI** | `cf`           | 免费   | 10K 神经元/天 — ~150 个 LLM 响应或 500 秒 Whisper 音频、边缘推理              |
| **Scaleway 人工智能**     | `scw`          | 免费   | 新账户可获得 100 万个免费代币 — 符合 EU/GDPR（巴黎）                          |
| **人工智能/机器学习API**  | `目标`         | 免费   | 0.025 美元/天免费积分 — 通过单一端点提供 200 多个模型                         |
| **计算机人工智能**        | `pu`           | 免费   | 500 多个模型（GPT-5、Claude Opus 4、Gemini 3 Pro、Grok 4、DeepSeek V3）       |
| **阿里云（DashScope）**   | `阿里`         | 付费   | 通过 `alicode`/`alicode-intl` 的国际 + 中国端点                               |
| **阿里巴巴编码计划**      | `bcp`          | 付费   | 具有 Anthropic 兼容 API 的阿里巴巴 Model Studio                               |
| **Kimi 编码（API 密钥）** | `kmca`         | 付费   | 基于专用 API 密钥的 Kimi 访问（独立于 OAuth）                                 |
| **极小极大编码**          | `极小极大`     | 付费   | 国际终点                                                                      |
| **MiniMax（中国）**       | `minimax-cn`   | 付费   | 中国特定端点                                                                  |
| **Z.AI (GLM-5)**          | `在`           | 付费   | 智普AI下一代GLM模型                                                           |
| **顶点人工智能**          | `顶点`         | 付费   | Google Cloud — 服务帐户 JSON 或 OAuth access_token                            |
| **奥拉马云**              | `ollamacloud`  | 付费   | Ollama 的托管 API 服务                                                        |
| **合成**                  | `合成`         | 付费   | 直通模型网关                                                                  |
| **基洛网关**              | `公斤`         | 付费   | 直通模型网关                                                                  |
| **困惑搜索**              | `pplx-搜索`    | 付费   | 基于搜索的专用端点                                                            |
| **Serper 搜索**           | `serper-搜索`  | 付费   | 网络搜索 API 集成                                                             |
| **勇敢寻找**              | ‘勇敢的探索’   | 付费   | Brave Search API 集成                                                         |
| **Exa 搜索**              | `exa-搜索`     | 付费   | 神经搜索 API 集成                                                             |
| **泰维利搜索**            | `tavily-搜索`  | 付费   | AI搜索API集成                                                                 |
| **纳米香蕉**              | `nb`           | 付费   | 图像生成API                                                                   |
| **十一实验室**            | `el`           | 付费   | 文字转语音语音合成                                                            |
| **笛卡尔**                | `笛卡尔`       | 付费   | 超快速 TTS 语音合成                                                           |
| **玩HT**                  | `玩`           | 付费   | 语音克隆和 TTS                                                                |
| **在世界**                | '在世界里'     | 付费   | AI人物语音聊天                                                                |
| **SD WebUI**              | `sdwebui`      | 自托管 | 稳定扩散局部图像生成                                                          |
| **舒适的用户界面**        | `舒适`         | 自托管 | ComfyUI本地工作流基于节点生成                                                 |
| **GLM 编码**              | `glm`          | 付费   | BigModel/Zhipu 编码特定端点                                                   | **总计：67+ 提供商**（4 个免费、8 个 OAuth、55 个 API 密钥）+ 无限的 OpenAI/Anthropic 兼容自定义提供商。--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

通过按提供商和按帐户实施配额，以编程方式自动生成和颁发 OmniRoute API 密钥。

| 端点                            | 方法        | 描述                                |
| ------------------------------- | ----------- | ----------------------------------- |
| `/api/v1/registered-keys`       | `发布`      | 发出新密钥 - 原始密钥返回**仅一次** |
| `/api/v1/registered-keys`       | `获取`      | 列出已注册的密钥（屏蔽）            |
| `/api/v1/registered-keys/{id}`  | `获取/删除` | 获取元数据/撤销                     |
| `/api/v1/quotas/check`          | `获取`      | 发放前预先验证配额                  |
| `/api/v1/providers/{id}/limits` | `获取/放置` | 配置每个提供商的发行限制            |
| `/api/v1/accounts/{id}/limits`  | `获取/放置` | 配置每个账户的发行限额              |
| `/api/v1/issues/report`         | `发布`      | 向 GitHub 报告配额事件              |

**安全性：**以 SHA-256 哈希值存储的密钥。原始密钥在创建时显示一次，再也无法检索。#### 🎨 Provider Icons via @lobehub/icons (#529)

使用 `@lobehub/icons` React 组件 (SVG) 的 130 多个提供商徽标。后备链：**Lobehub SVG → 现有 PNG → 通用图标**。使用标准化的“ProviderIcon”组件应用于仪表板、提供商和代理页面。#### 🔄 Model Auto-Sync Scheduler (#488)

每**24 小时**自动刷新已连接提供商的模型列表。在服务器启动时运行。可通过“MODEL_SYNC_INTERVAL_HOURS”进行配置。#### 🔀 Per-Model Combo Routing (#563)

将模型名称模式（glob）映射到特定组合以进行自动路由：

- `claude-sonnet*` → 代码组合、`gpt-4o*` → openai-组合、`gemini-*` → google-组合
- 新的“model_combo_mappings”表，具有全局到正则表达式匹配
- 仪表板 UI 部分：“模型路由规则”，具有内联添加/编辑/切换/删除功能#### 🧭 API Endpoints Dashboard

交互式目录、webhooks 管理、OpenAPI 查看器 — 所有这些都在“/dashboard/endpoint”的一个选项卡页面中。#### 🔍 Web Search Providers

5 个新的搜索提供商集成：**Perplexity Search**、**Serper**、**Brave Search**、**Exa**、**Tavily**— 通过实时网络数据实现基于 AI 响应。#### 📊 Search Analytics

“/dashboard/analytics”中的新选项卡 — 提供商细分、缓存命中率、成本跟踪。 API：`GET /api/v1/search/analytics`。#### 🛡️ Per-API-Key Rate Limits (#452)

`max_requests_per_day` 和 `max_requests_per_million` 列，内存中滑动窗口强制返回 HTTP 429。#### 🎵 Media Playground

完整的媒体生成游乐场位于“/dashboard/media”：图像生成、视频、音乐、音频转录（2GB 上传限制）和文本转语音。---

### 🔒 Security & CI/CD

-**CodeQL 修复**— 修复了 10 多个警报：6 个多项式重做、1 个不安全随机性（`Math.random()` → `crypto.randomUUID()`）、1 个 shell 命令注入 -**路由验证**— Zod 架构 +**176/176 API 路由**上的 `validateBody()` — CI 强制执行 -**CVE 修复**— dompurify XSS 漏洞 (GHSA-v2wj-7wpq-c8vv) 通过 npm 覆盖解决 -**扁平**— 碰撞 3.3.3 → 3.4.2（CWE-1321 原型污染）-**Docker**— 升级 `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth：当 Docker 中缺少 `GEMINI_OAUTH_CLIENT_SECRET` 时清除可操作错误 -**#549**— CLI 设置路由现在从 `keyId` 解析真实的 API 密钥（不是屏蔽字符串）-**#574**— 跳过向导密码设置后登录不再冻结 -**#506**— 跨平台 `machineId` 重写（Windows REG.exe → macOS ioreg → Linux → 主机名回退）#### Providers & Routing

-**#536**— LongCat AI：修复了 `baseUrl` 和 `authHeader` -**#535**— 固定模型覆盖：“body.model”正确设置为“pinnedModel” -**#570**— 无前缀的 Claude 模型现在解析为 Anthropic 提供者 -**#585**— `<omniModel>` 内部标签不再泄露给 SSE 流中的客户端 -**#493**— 自定义提供程序模型命名不再因前缀剥离而损坏 -**#490**— 通过“TransformStream”注入进行流+上下文缓存保护 -**#511**— `<omniModel>` 标签注入到第一个内容块中（不在 `[DONE]` 之后）#### CLI & Tools

-**#527**— Claude Code + Codex 循环：`tool_result` 块现已转换为文本 -**#524**— OpenCode 配置正确保存（XDG_CONFIG_HOME，TOML 格式）-**#522**— API 管理器：删除了误导性的“复制屏蔽密钥”按钮 -**#546**— `--version` 在 Windows 上返回 `unknown` （PR by @k0valik）-**#544**— 通过已知安装路径进行安全 CLI 工具检测（PR by @k0valik）-**#510**— Windows MSYS2/Git-Bash 路径自动规范化 -**#492**— 当 `app/server.js` 缺失时，CLI 检测到 `mise`/`nvm` 托管节点#### Streaming & SSE

-**PR #587**— 在responseTransformer 中恢复 Cloudflare Workers 兼容的 `resolveDataDir` 导入 (@k0valik) -**PR #495**— 瓶颈 429 无限等待：在速率限制上放弃等待作业 (@xandr0s) -**#483**— 在“[DONE]”信号之后停止尾随“data: null” -**#473**— Zombie SSE 流：超时减少 300 秒 → 120 秒以实现更快的回退#### Media & Transcription

-**转录**— Deepgram `video/mp4` → `audio/mp4` MIME 映射、自动语言检测、标点符号 -**TTS**— 针对 ElevenLabs 风格的嵌套错误修复了“[object Object]”错误显示 -**上传限制**— 媒体转录增加至 2GB（nginx `client_max_body_size 2g` + `maxDuration=300`）---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— 调用日志中的“requested_model”列（迁移 009）-**T02**— 从嵌套的 `tool_result.content` 中去除空文本块 -**T03**— 解析 `x-codex-5h-*` / `x-codex-7d-*` 配额标头 -**T04**— 用于外部粘性路由的“X-Session-Id”标头 -**T05**— 使用专用 API 限制数据库持久性的速率 -**T06**— 帐户已停用 → 永久封锁（1 年冷却时间）-**T07**— X-Forwarded-用于 IP 验证 (`extractClientIp()`) -**T08**— 每个 API 密钥会话限制以及滑动窗口强制执行 -**T09**— Codex 与 Spark 速率限制范围（单独的池）-**T10**— 积分耗尽 → 明显的 1 小时冷却时间回退 -**T11**— `max` 推理工作 → 131072 预算代币 -**T12**— MiniMax M2.7 定价条目 -**T13**— 过时的配额显示修复（重置窗口感知）-**T14**— 代理快速失败 TCP 检查（≤2 秒，缓存 30 秒）-**T15**— Anthropic 的数组内容标准化 -**T23**— 智能配额重置回退（标头提取）-**T24**— `503` 冷却时间 + `406` 映射 -**T25**— 提供商验证回退 -**T29**— Vertex AI 服务帐户 JWT 身份验证 -**T33**— 思维水平到预算的转换 -**T36**— `403` 与 `429` 错误分类 -**T38**— 集中模型规范 (`modelSpecs.ts`) -**T39**— `fetchAvailableModels` 的端点回退 -**T41**— 后台任务自动重定向到 Flash 型号 -**T42**— 图像生成纵横比映射#### Other Improvements

-**每个模型上游自定义标头**— 通过配置 UI（PR #575 by @zhangqiang8vip）-**模型上下文长度**— 在模型元数据中可配置（PR #578 by @hijak）-**模型前缀剥离**— 从模型名称中删除提供程序前缀的选项（PR #582 by @jay77721）-**Gemini CLI 弃用**— 标记为弃用，并带有 Google OAuth 限制警告 -**YAML 解析器**— 使用 `js-yaml` 替换自定义解析器，以实现正确的 OpenAPI 规范解析 -**ZWS v5**— HMR 泄漏修复（485 个数据库连接 → 1，内存 2.4GB → 195MB）-**日志导出**— 仪表板上带有时间范围下拉列表的新 JSON 导出按钮 -**更新通知横幅**— 仪表板主页显示新版本可用时---

### 🌐 i18n & Documentation

-**30 种语言**100% 奇偶校验 — 2,788 个缺失密钥已同步 -**捷克语**— 完整翻译：22 个文档，2,606 个 UI 字符串（PR by @zen0bit）-**中文 (zh-CN)**— 完全重新翻译（PR by @only4copilot）-**虚拟机部署指南**— 翻译成英文作为源文档 -**API 参考**— 添加了 `/v1/embeddings` 和 `/v1/audio/speech` 端点 -**提供商数量**— 自述文件和所有 30 个 i18n 自述文件中从 36+/40+/44+ 更新到**67+**---

### 🔀 Community PRs Merged (10)

| 公关     | 作者            | 总结                                                           |
| -------- | --------------- | -------------------------------------------------------------- |
| **#587** | @k0valik        | 修复(sse)：恢复 Cloudflare Workers 兼容性的resolveDataDir 导入 |
| **#582** | @jay77721       | feat(proxy)：模型名称前缀剥离选项                              |
| **#581** | @jay77721       | 修复（npm）：将 electro-release 链接到 npm-publish 工作流程    |
| **#578** | @hijak          | 壮举：模型元数据中的可配置上下文长度                           |
| **#575** | @zhangqiang8vip | feat：每个模型的上游标头、compat PATCH、聊天对齐               |
| **#562** | @coobabm        | 修复：MCP 会话管理、Claude 直通、DetectFormat                  |
| **#561** | @zen0bit        | 修复（i18n）：捷克语翻译更正                                   |
| **#555** | @k0valik        | 修复（sse）：用于路径解析的集中式“resolveDataDir（）”          |
| **#546** | @k0valik        | 修复（cli）：“--version”在 Windows 上返回“unknown”             |
| **#544** | @k0valik        | 修复(cli)：通过安装路径进行安全 CLI 工具检测                   |
| **#542** | @rdself         | 修复（ui）：灯光模式对比 CSS 主题变量                          |
| **#530** | @kang-heewon    | 壮举：带有“OpencodeExecutor”的 OpenCode Zen + Go 提供商        |
| **#512** | @zhangqiang8vip | 壮举：每个协议模型兼容性（`compatByProtocol`）                 |
| **#497** | @zhangqiang8vip | 修复：开发模式 HMR 资源泄漏 (ZWS v5)                           |
| **#495** | @xandr0s        | 修复：瓶颈 429 无限等待（放弃等待作业）                        |
| **#494** | @zhangqiang8vip | 壮举：MiniMax 开发者→系统角色修复                              |
| **#480** | @prakersh       | 修复：流刷新使用提取                                           |
| **#479** | @prakersh       | 壮举：Codex 5.3/5.4 和 Anthropic 定价条目                      |
| **#475** | @only4copilot   | feat(i18n)：改进的中文翻译                                     |

**感谢所有贡献者！**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 次测试，0 次失败**（高于 v2.9.5 中的 821 次）

- +105 个新测试，涵盖：模型组合映射、注册密钥、OpencodeExecutor、Bailian 提供程序、路由验证、错误分类、宽高比映射等---

### 📦 Database Migrations

| 移民    | 描述                                                              |
| ------- | ----------------------------------------------------------------- |
| **008** | `registered_keys`、`provider_key_limits`、`account_key_limits` 表 |
| **009** | `call_logs` 中的 `requested_model` 列                             |
| **010** | 每个模型组合路由的“model_combo_mappings”表---                     |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **重大变更：**无。所有现有配置、组合和 API 密钥都会保留。
> 数据库迁移 008-010 在启动时自动运行。---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**CodeQL 修复**— 修复了 10 多个警报：

- `provider.ts` / `chatCore.ts` 中的 6 个多项式重做（用基于段的匹配替换了 `(?:^|/)` 交替模式）
- `acp/manager.ts` 中的 1 个不安全随机性（`Math.random()` → `crypto.randomUUID()`）
- `prepublish.mjs` 中的 1 个 shell 命令注入（`JSON.stringify()` 路径转义）-**路由验证**— 添加了 Zod 模式 + `validateBody()` 到 5 个缺少验证的路由：
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` 现在通过：**176/176 条路由已验证**### 🐛 Bug Fixes

-**#585**— `<omniModel>` 内部标签不再在 SSE 响应中泄漏给客户端。在“combo.ts”中添加了出站清理“TransformStream”### ⚙️ Infrastructure

-**Docker**— 从 v3 → v4 升级了 `docker/setup-buildx-action`（Node.js 20 弃用修复）-**CI 清理**— 删除了 150 多个失败/取消的工作流程运行### 🧪 Tests

- 测试套件：**926 次测试，0 次失败**（+3 新）---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- 增加媒体转录限制
- 将模型上下文长度添加到注册表元数据中
- 通过配置 UI 添加了每个模型的上游自定义标头
- 修复了多个错误、Zod 补丁验证，并解决了各种社区问题。## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— 每个模型组合路由：将模型名称模式（glob）映射到特定组合以进行自动路由

- 新的“model_combo_mappings”表（迁移010），具有模式、combo_id、优先级、已启用
- `resolveComboForModel()` 具有全局到正则表达式匹配的数据库函数（不区分大小写，`*` 和 `?` 通配符）
- “model.ts”中的“getComboForModel()”：通过模型模式回退增强“getCombo()”
- `chat.ts`：路由决策现在在单模型处理之前检查模型组合映射
- API：`GET/POST /api/model-combo-mappings`、`GET/PUT/DELETE /api/model-combo-mappings/:id`
- 仪表板：“模型路由规则”部分添加到组合页面，并具有内联添加/编辑/切换/删除功能
- 示例：`claude-sonnet*` → code-combo、`gpt-4o*` → openai-combo、`gemini-*` → google-combo### 🌐 i18n

-**完全 i18n 同步**：在 30 种语言文件中添加了 2,788 个缺失键 — 所有语言现在与 `en.json` 100% 同等 -**代理页面 i18n**：OpenCode 集成部分完全国际化（标题、描述、扫描、下载标签）-**6 个新密钥**添加到 OpenCode 部分的“agents”命名空间### 🎨 UI/UX

-**提供商图标**：添加了 16 个缺失的提供商图标（3 个复制、2 个下载、11 个 SVG 创建）-**SVG 后备**：`ProviderIcon` 组件更新为 4 层策略：Lobehub → PNG → SVG → 通用图标 -**代理指纹识别**：与 CLI 工具同步 — 添加了 droid、openclaw、copilot、opencode 到指纹列表（总共 14 个）### 安全

-**CVE 修复**：通过 npm 覆盖强制“dompurify@^3.3.2”解决了 dompurify XSS 漏洞 (GHSA-v2wj-7wpq-c8vv)

- `npmaudit` 现在报告**0 个漏洞**### 🧪 Tests

- 测试套件：**923 次测试，0 次失败**（+15 个新模型组合映射测试）---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| 公关     | 作者     | 总结                                                                |
| -------- | -------- | ------------------------------------------------------------------- | ------------ |
| **#562** | @coobabm | 修复(ux)：MCP 会话管理、Claude 直通标准化、OAuth 模式、DetectFormat |
| **#561** | @zen0bit | 修复（i18n）：捷克语翻译更正 - HTTP 方法名称和文档更新              | ### 🧪 Tests |

- 测试套件：**908 次测试，0 次失败**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**从 CLI 设置路由（`codex-settings`、`droid-settings`、`kilo-settings`）中的 `keyId` 解析真实 API 密钥，以防止写入屏蔽字符串 (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| 公关     | 作者     | 总结                                                                                                                                  |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik | 修复（cli）：`--version` 在 Windows 上返回 `unknown` — 使用 `JSON.parse(readFileSync)` 而不是 ESM 导入                                |
| **#555** | @k0valik | 修复（sse）：用于凭证、autoCombo、响应记录器和请求记录器中路径解析的集中式“resolveDataDir（）”                                        |
| **#544** | @k0valik | 修复（cli）：通过已知安装路径（8个工具）进行安全CLI工具检测，包括符号链接验证、文件类型检查、大小限制、健康检查中的最小环境           |
| **#542** | @rdself  | 修复（ui）：改善浅色模式对比度 - 添加缺少的 CSS 主题变量（`bg-primary`、`bg-subtle`、`text-primary`）并修复日志详细信息中的仅深色颜色 | ### 🔧 Bug Fixes |

-**`cliRuntime.ts`中的 TDZ 修复**— 在模块启动时通过 `getExpectedParentPaths()` 进行初始化之前使用了 `validateEnvPath`。重新排序声明以修复“ReferenceError”。-**构建修复**— 在“serverExternalPackages”中添加了“pino”和“pino-pretty”，以防止 Turbopack 破坏 Pino 的内部工作加载。### 🧪 Tests

- 测试套件：**905 次测试，0 次失败**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Electron 构建回归：将 Next.js 从“16.1.x”降级到“16.0.10”，以消除 Turbopack 模块哈希不稳定导致 Electron 桌面包中出现黑屏。-**单元测试修复**- 更正了最近实施更改后发生漂移的两个过时的测试断言（“nanobanana-image-handler”纵横比/分辨率、“thinking-budget”Gemini“thinkingConfig”字段映射）。-**#541**— 回应了用户关于安装复杂性的反馈；无需更改代码。---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON 执行器：使用 `jose` 库实现来处理 JWT/服务帐户身份验证，以及 UI 中的可配置区域和自动合作伙伴模型 URL 构建。-**T42**— 图像生成宽高比映射：为通用 OpenAI 格式（“size”）创建了“sizeMapper”逻辑，添加了本机“imagen3”处理，并更新了 NanoBanana 端点以自动利用映射的宽高比。-**T38**— 集中模型规范：为每个模型的限制和参数创建的“modelSpecs.ts”。### 🔧 Improvements

-**T40**— OpenCode CLI 工具集成：本机“opencode-zen”和“opencode-go”集成已在早期 PR 中完成。---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**—“503”冷却等待修复+“406”映射：以适当的冷却时间间隔将“406 不可接受”映射到“503 服务不可用”。-**T25**— 提供者验证回退：当特定的“validationModelId”不存在时，优雅地回退到标准验证模型。-**T36**— `403` 与 `429` 提供程序处理细化：提取到 `errorClassifier.ts` 中，以正确地将硬权限失败 (`403`) 与速率限制 (`429`) 分开。-**T39**— `fetchAvailableModels` 的端点回退：实现了三层机制（`/models` -> `/v1/models` -> 本地通用目录）+ `list_models_catalog` MCP 工具更新以反映 `source` 和 `warning`。-**T33**— 思维水平到预算的转换：将定性思维水平转化为精确的预算分配。-**T41**— 后台任务自动重定向：自动将繁重的后台评估任务路由到闪存/高效模型。-**T23**— 智能配额重置后备：准确提取“x-ratelimit-reset”/“retry-after”标头值或映射静态冷却时间。---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **从 v2.9.5 升级：**解决了 16 个问题 · 合并了 2 个社区 PR · 2 个新提供者 · 7 个新 API 端点 · 3 个新功能 · 数据库迁移 008+009 · 通过 832 项测试 · 15 个 sub2api 差距改进（T01–T15 完成）。### 🆕 New Providers

| 供应商           | 别名           | 等级 | 笔记                                                            |
| ---------------- | -------------- | ---- | --------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | 免费 | 3 个模型来自 `opencode.ai/zen/v1`（PR #530 by @kang-heewon）    |
| **OpenCode Go**  | `opencode-go`  | 付费 | 4 个模型来自 `opencode.ai/zen/go/v1`（PR #530 by @kang-heewon） |

两个提供商都使用新的“OpencodeExecutor”和多格式路由（“/chat/completions”、“/messages”、“/responses”、“/models/{model}:generateContent”）。---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

通过按提供商和按帐户实施配额，以编程方式自动生成和颁发 OmniRoute API 密钥。

| 端点                                  | 方法        | 描述                                |
| ------------------------------------- | ----------- | ----------------------------------- |
| `/api/v1/registered-keys`             | `发布`      | 发出新密钥 - 原始密钥返回**仅一次** |
| `/api/v1/registered-keys`             | `获取`      | 列出已注册的密钥（屏蔽）            |
| `/api/v1/registered-keys/{id}`        | `获取`      | 获取关键元数据                      |
| `/api/v1/registered-keys/{id}`        | `删除`      | 撤销密钥                            |
| `/api/v1/registered-keys/{id}/revoke` | `发布`      | 撤销（对于不支持 DELETE 的客户端）  |
| `/api/v1/quotas/check`                | `获取`      | 发放前预先验证配额                  |
| `/api/v1/providers/{id}/limits`       | `获取/放置` | 配置每个提供商的发行限制            |
| `/api/v1/accounts/{id}/limits`        | `获取/放置` | 配置每个账户的发行限额              |
| `/api/v1/issues/report`               | `发布`      | 向 GitHub 报告配额事件              |

**数据库 — 迁移 008：**三个新表：`registered_keys`、`provider_key_limits`、`account_key_limits`。
**安全性：**以 SHA-256 哈希值存储的密钥。原始密钥在创建时显示一次，再也无法检索。
**配额类型：**每个提供商和每个帐户的“maxActiveKeys”、“dailyIssueLimit”、“hourlyIssueLimit”。
**幂等性：**`idempotency_key` 字段防止重复颁发。如果密钥已被使用，则返回“409 IDEMPOTENCY_CONFLICT”。
**每个键的预算：**`dailyBudget` / `hourlyBudget` — 限制一个键可以在每个窗口路由的请求数量。
**GitHub 报告：**可选。设置 `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` 以在超出配额或发布失败时自动创建 GitHub 问题。#### 🎨 Provider Icons — @lobehub/icons (#529)

仪表板中的所有提供程序图标现在都使用“@lobehub/icons”React 组件（130 多个具有 SVG 的提供程序）。
后备链：**Lobehub SVG → 现有 `/providers/{id}.png` → 通用图标**。使用正确的 React `ErrorBoundary` 模式。#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute 现在每**24 小时**自动刷新连接提供商的模型列表。

- 通过现有的`/api/sync/initialize`钩子在服务器启动时运行
- 可通过“MODEL_SYNC_INTERVAL_HOURS”环境变量进行配置
- 涵盖16家主要提供商
- 在设置数据库中记录上次同步时间---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth：**当 Docker/自托管部署中缺少“GEMINI_OAUTH_CLIENT_SECRET”时，清除可操作错误。之前曾展示过 Google 神秘的“client_secret 丢失”。现在提供特定的“docker-compose.yml”和“~/.omniroute/.env”指令。#### Providers & Routing

-**#536 — LongCat AI：**修复了 `baseUrl` (`api.longcat.chat/openai`) 和 `authHeader` (`Authorization: Bearer`)。-**#535 — 固定模型覆盖：**当上下文缓存保护处于活动状态时，“body.model”现在可以正确设置为“pinnedModel”。-**#532 — OpenCode Go 密钥验证：**现在使用 `zen/v1` 测试端点 (`testKeyBaseUrl`) — 相同的密钥适用于两个层。#### CLI & Tools

-**#527 — Claude Code + Codex 循环：**`tool_result` 块现在转换为文本而不是删除，从而停止无限的工具结果循环。-**#524 — OpenCode 配置保存：**添加了 `saveOpenCodeConfig()` 处理程序（XDG_CONFIG_HOME 感知，写入 TOML）。-**#521 — 登录卡住：**跳过密码设置后登录不再冻结 — 正确重定向到入门。-**#522 — API 管理器：**删除了误导性的“复制屏蔽密钥”按钮（替换为锁定图标工具提示）。-**#532 — OpenCode Go 配置：**指南设置处理程序现在处理 `opencode` toolId。#### Developer Experience

-**#489 — 反重力：**缺少 `googleProjectId` 返回结构化 422 错误并重新连接指导，而不是神秘的崩溃。-**#510 — Windows 路径：**MSYS2/Git-Bash 路径 (`/c/Program Files/...`) 现在自动标准化为 `C:\Program Files\...`。-**#492 — CLI 启动：**`omniroute` CLI 现在可以在 `app/server.js` 丢失时检测到 `mise`/`nvm` 托管节点，并显示有针对性的修复指令。---

### 📖 Documentation Updates

-**#513**— Docker 密码重置：记录了 `INITIAL_PASSWORD` env var 解决方法 -**#520**— pnpm：记录了“pnpmapprove-builds better-sqlite3”步骤---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| 公关     | 作者         | 总结                                                        |
| -------- | ------------ | ----------------------------------------------------------- | --- |
| **#530** | @kang-heewon | 具有“OpencodeExecutor”和改进测试的 OpenCode Zen + Go 提供商 | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— 速率限制数据库持久性：“providers.ts”中的“setConnectionRateLimitUntil()”、“isConnectionRateLimited()”、“getRateLimitedConnections()”。现有的“rate_limited_until”列现在作为专用 API 公开 - OAuth 令牌刷新不得触及此字段以防止速率限制循环。-**T08**— 每个 API 密钥会话限制：通过自动迁移将 `max_sessions INTEGER DEFAULT 0` 添加到 `api_keys`。 `sessionManager.ts` 获得 `registerKeySession()`、`unregisterKeySession()`、`checkSessionLimit()` 和 `getActiveSessionCountForKey()`。 `chatCore.js` 中的调用者可以对 `req.close` 强制执行限制和递减。-**T09**— Codex 与 Spark 速率限制范围：“codex.ts”中的“getCodexModelScope()”和“getCodexRateLimitKey()”。标准模型（`gpt-5.x-codex`、`codex-mini`）获取范围`"codex"`； Spark 模型（`codex-spark*`）获取范围“spark”。速率限制键应该是“${accountId}:${scope}”，这样耗尽一个池就不会阻塞另一个池。-**T13**— 过时配额显示修复：重置窗口过去后，`getEffectiveQuotaUsage(used, resetAt)` 返回 `0`； `formatResetCountdown(resetAt)` 返回一个人类可读的倒计时字符串（例如 `"2h 35m"`）。两者都从“providers.ts”+“localDb.ts”导出以供仪表板使用。-**T14**— 代理快速失败：新的 `src/lib/proxyHealth.ts` 带有 `isProxyReachable(proxyUrl, timeoutMs=2000)`（TCP 检查，≤2 秒而不是 30 秒超时）、`getCachedProxyHealth()`、`invalidateProxyHealth()` 和 `getAllProxyHealthStatuses()`。结果默认缓存30秒；可通过“PROXY_FAST_FAIL_TIMEOUT_MS”/“PROXY_HEALTH_CACHE_TTL_MS”进行配置。### 🧪 Tests

- 测试套件：**832 次测试，0 次失败**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— `call_logs` 中的 `requested_model` 列（迁移 009）：跟踪客户端最初请求的模型与实际路由的模型。启用回退率分析。-**T02**— 从嵌套的“tool_result.content”中去除空文本块：当 Claude Code 链接工具结果时，防止 Anthropic 400 错误（“文本内容块必须非空”）。-**T03**— 解析 `x-codex-5h-*` / `x-codex-7d-*` 标头：`parseCodexQuotaHeaders()` + `getCodexResetTime()` 提取 Codex 配额窗口以实现精确的冷却时间安排，而不是通用的 5 分钟回退。-**T04**— 用于外部粘性路由的“X-Session-Id”标头：“sessionManager.ts”中的“extractExternalSessionId()”读取带有“ext:”前缀的“x-session-id”/“x-omniroute-session”标头，以避免与内部 SHA-256 会话 ID 发生冲突。 Nginx 兼容（连字符标头）。-**T06**— 帐户停用→永久阻止：`accountFallback.ts` 中的 `isAccountDeactivated()` 检测到 401 停用信号并应用 1 年冷却时间以防止重试永久死亡帐户。-**T07**— X-Forwarded-For IP 验证：带有 `extractClientIp()` 和 `getClientIpFromRequest()` 的新 `src/lib/ipUtils.ts` — 跳过 `X-Forwarded-For` 链中的`未知`/非 IP 条目（Nginx/代理转发请求）。-**T10**— 积分耗尽 → 明显的回退：“accountFallback.ts”中的“isCreditsExhausted()”返回 1 小时冷却时间并带有“creditsExhausted”标志，与通用 429 速率限制不同。-**T11**— `max` 推理工作 → 131072 个预算代币：更新了 `EFFORT_BUDGETS` 和 `THINKING_LEVEL_MAP`；反向映射现在为完整预算响应返回“最大”。单元测试已更新。-**T12**— 添加了 MiniMax M2.7 定价条目：`minimax-m2.7`、`MiniMax-M2.7`、`minimax-m2.7-highspeed` 添加到定价表中 (sub2api PR #1120)。 M2.5/GLM-4.7/GLM-5/Kimi 定价已存在。-**T15**— 数组内容规范化：“openai-to-claude.ts”中的“normalizeContentToString()”帮助程序在发送到 Anthropic 之前正确地将数组格式的系统/工具消息折叠为字符串。### 🧪 Tests

- 测试套件：**832 次测试，0 次失败**（与 rc.5 相比没有变化）---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— 注册密钥配置 API：自动颁发 API 密钥，并强制执行每个提供商和每个帐户的配额

- `POST /api/v1/registered-keys` — 发布具有幂等性支持的密钥
- `GET /api/v1/registered-keys` — 列出（屏蔽）注册密钥
- `GET /api/v1/registered-keys/{id}` — 获取密钥元数据
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — 撤销密钥
- `GET /api/v1/quotas/check` — 发布前预验证
- `PUT /api/v1/providers/{id}/limits` — 设置提供商发行限制
- `PUT /api/v1/accounts/{id}/limits` — 设置账户发行限额
- `POST /api/v1/issues/report` — 可选的 GitHub 问题报告
- 数据库迁移 008：`registered_keys`、`provider_key_limits`、`account_key_limits` 表---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— 添加了 OpenCode Zen 和 OpenCode Go 提供程序（由 @kang-heewon）

- 具有多格式路由的新“OpencodeExecutor”（“/chat/completions”、“/messages”、“/responses”）
- 两个级别都有 7 个型号---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— 提供程序图标现在使用 [@lobehub/icons](https://github.com/lobehub/lobe-icons) 以及优雅的 PNG 回退和 `ProviderIcon` 组件（支持 130 多个提供程序）-**#488**— 通过 `modelSyncScheduler` 每 24 小时自动更新一次模型列表（可通过 `MODEL_SYNC_INTERVAL_HOURS` 配置）### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth：当 Docker/自托管部署中缺少 `GEMINI_OAUTH_CLIENT_SECRET` 时，现在会显示明显的可操作错误---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— LongCat AI 密钥验证：修复了 baseUrl (`api.longcat.chat/openai`) 和 authHeader (`Authorization: Bearer`) -**#535**— 固定模型覆盖：当上下文缓存保护检测到固定模型时，“body.model”现在设置为“pinnedModel” -**#524**— OpenCode 配置现已正确保存：添加 `saveOpenCodeConfig()` 处理程序（XDG_CONFIG_HOME 感知，写入 TOML）---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— 跳过密码设置后登录不再卡住（重定向到入门）-**#522**— API 管理器：删除了误导性的“复制屏蔽密钥”按钮（替换为锁定图标工具提示）-**#527**— Claude Code + Codex 超能力循环：`tool_result` 块现在转换为文本而不是丢弃 -**#532**— OpenCode GO API 密钥验证现在使用正确的 `zen/v1` 端点 (`testKeyBaseUrl`) -**#489**— 反重力：缺少 `googleProjectId` 返回结构化 422 错误并重新连接指导 -**#510**— Windows：MSYS2/Git-Bash 路径 (`/c/Program Files/...`) 现在标准化为 `C:\Program Files\...` -**#492**— `omniroute` CLI 现在可以在 `app/server.js` 丢失时检测到 `mise`/`nvm` 并显示有针对性的修复### 文档

-**#513**— Docker 密码重置：记录了 `INITIAL_PASSWORD` env var 解决方法 -**#520**— pnpm：记录了“pnpmapprove-builds better-sqlite3”### ✅ Closed Issues

#489、#492、#510、#513、#520、#521、#522、#525、#527、#532---

## [2.9.5] — 2026-03-22

> Sprint：新的 OpenCode 提供程序、嵌入凭据修复、CLI 屏蔽密钥错误、CACHE_TAG_PATTERN 修复。### 🐛 Bug Fixes

-**CLI 工具将屏蔽的 API 密钥保存到配置文件**— `claude-settings`、`cline-settings` 和 `openclaw-settings` POST 路由现在接受 `keyId` 参数，并在写入磁盘之前从数据库解析真实的 API 密钥。 “ClaudeToolCard”更新为发送“keyId”而不是屏蔽显示字符串。修复#523、#526。-**自定义嵌入提供程序：“无凭证”错误**- “/v1/embeddings”现在与路由前缀分开跟踪“credentialsProviderId”，因此凭证是从匹配的提供程序节点 ID 而不是公共前缀字符串中获取的。修复了“google/gemini-embedding-001”和类似的自定义提供程序模型始终会因凭据错误而失败的回归。修复#532 相关问题。 （公关#528，@jacob2826）-**上下文缓存保护正则表达式遗漏`
` prefix**- `comboAgentMiddleware.ts` 中的 `CACHE_TAG_PATTERN` 已更新以匹配两个文字 `
` (反斜杠-n) 和修复 #515 后 `combo.ts` 流在 `<omniModel>` 标记周围注入的实际换行符 U+000A。修复#531。### ✨ New Providers

-**OpenCode Zen**— `opencode.ai/zen/v1` 上的免费层网关，具有 3 个模型：`minimax-m2.5-free`、`big-pickle`、`gpt-5-nano` -**OpenCode Go**— 订阅服务位于 `opencode.ai/zen/go/v1`，有 4 个模型：`glm-5`、`kimi-k2.5`、`minimax-m2.7`（Claude 格式）、`minimax-m2.5`（Claude 格式）

- 两个提供商都使用新的“OpencodeExecutor”，它根据请求的模型动态路由到“/chat/completions”、“/messages”、“/responses”或“/models/{model}:generateContent”。 （PR #530 @kang-heewon）---

## [2.9.4] — 2026-03-21

> Sprint：错误修复 - 保留 Codex 提示缓存密钥、修复 tagContent JSON 转义、将过期令牌状态同步到数据库。### 🐛 Bug Fixes

-**修复（翻译器）**：在响应 API → 聊天完成翻译中保留 `prompt_cache_key` (#517)
— 该字段是 Codex 使用的缓存亲和性信号；剥离它会阻止快速缓存命中。
已在“openai-responses.ts”和“responsesApiHelper.ts”中修复。

-**修复（组合）**：转义`
` 在 `tagContent` 中，因此注入的 JSON 字符串是有效的 (#515)
— 模板文字换行符 (U+000A) 不允许在 JSON 字符串值内进行未转义。
替换为“open-sse/services/combo.ts”中的“\n”文字序列。

-**修复（用法）**：在实时身份验证失败时将过期的令牌状态同步回数据库（#491）
— 当限制和配额实时检查返回 401/403 时，连接“testStatus”现已更新
数据库中的“已过期”，因此“提供者”页面反映相同的降级状态。
已在 `src/app/api/usage/[connectionId]/route.ts` 中修复。---

## [2.9.3] — 2026-03-21

> Sprint：添加 5 个新的免费 AI 提供商 — LongCat、Polminations、Cloudflare AI、Scaleway、AI/ML API。### ✨ New Providers

-**feat(providers/longcat)**：添加 LongCat AI (`lc/`) — 公开测试期间每天免费 5000 万代币 (Flash-Lite) + 每天 500K (聊天/思考)。兼容 OpenAI 的标准 Bearer 身份验证。-**feat(providers/pollinations)**：添加 Pollinations AI (`pol/`) — 无需 API 密钥。代理 GPT-5、Claude、Gemini、DeepSeek V3、Llama 4（1 个请求/15 秒免费）。自定义执行器处理可选的身份验证。-**feat(providers/cloudflare-ai)**：添加 Cloudflare Workers AI (`cf/`) — 10K 神经元/天免费（约 150 个 LLM 响应或 500 秒 Whisper 音频）。全球边缘 50 多个型号。自定义执行器使用凭证中的“accountId”构建动态 URL。-**feat(providers/scaleway)**：添加 Scaleway 生成 API (`scw/`) — 为新帐户提供 100 万个免费代币。符合 EU/GDPR 要求（巴黎）。 Qwen3 235B、Llama 3.1 70B、Mistral Small 3.2。-**feat(providers/aimlapi)**：添加 AI/ML API (`aiml/`) — 通过单个聚合器端点添加 0.025 美元/天的免费积分、200 多个模型（GPT-4o、Claude、Gemini、Llama）。### 🔄 Provider Updates

-**feat(providers/together)**：添加 `hasFree: true` + 3 个永久免费模型 ID：`Llama-3.3-70B-Instruct-Turbo-Free`、`Llama-Vision-Free`、`DeepSeek-R1-Distill-Llama-70B-Free` -**feat(providers/gemini)**：添加 `hasFree: true` + `freeNote` （每天 1,500 个请求，无需信用卡，aistudio.google.com）-**chore(providers/gemini)**：为了清晰起见，将显示名称重命名为“Gemini (Google AI Studio)”### ⚙️ Infrastructure

-**feat(executors/pollinations)**：新的 `PollinationsExecutor` — 在未提供 API 密钥时省略 `Authorization` 标头 -**feat(executors/cloudflare-ai)**：新的 `CloudflareAIExecutor` — 动态 URL 构造需要提供者凭证中的 `accountId` -**feat(executors)**：注册 `pollinations`、`pol`、`cloudflare-ai`、`cf` 执行器映射### 文档

-**文档（自述文件）**：将免费组合堆栈扩展到 11 个提供商（永远为 0 美元）-**文档（自述文件）**：添加了 4 个新的免费提供商部分（LongCat、Polminations、Cloudflare AI、Scaleway）以及模型表 -**文档（自述文件）**：更新了定价表，包含 4 个新的免费套餐行 -**docs(i18n/pt-BR)**：更新了定价表 + 添加了葡萄牙语的 LongCat/Pollinations/Cloudflare AI/Scaleway 部分 -**docs(new-features/ai)**：`docs/new-features/ai/` 中的 10 个任务规范文件 + 主实施计划### 🧪 Tests

- 测试套件：**821 次测试，0 次失败**（不变）---

## [2.9.2] — 2026-03-21

> Sprint：修复媒体转录（Deepgram/HuggingFace Content-Type、语言检测）和 TTS 错误显示。### 🐛 Bug Fixes

-**修复（转录）**：Deepgram 和 HuggingFace 音频转录现在可以通过新的 `resolveAudioContentType()` 帮助器正确映射 `video/mp4` → `audio/mp4` 和其他媒体 MIME 类型。以前，上传“.mp4”文件始终返回“未检测到语音”，因为 Deepgram 正在接收“内容类型：视频/mp4”。-**修复（转录）**：在 Deepgram 请求中添加了 `detect_language=true` — 自动检测音频语言（葡萄牙语、西班牙语等），而不是默认为英语。修复非英语转录返回空或垃圾结果。-**修复（转录）**：在 Deepgram 请求中添加了 `punctuate=true`，以获取具有正确标点符号的更高质量的转录输出。-**修复（tts）**：在“audioSpeech.ts”和“audioTranscription.ts”中修复的文本转语音响应中显示“[object Object]”错误。 `upstreamErrorResponse()` 函数现在可以正确地从 ElevenLabs 等提供者中提取嵌套字符串消息，这些消息返回 `{ error: { message: "...", status_code: 401 } }` 而不是平面错误字符串。### 🧪 Tests

- 测试套件：**821 次测试，0 次失败**（不变）### Triaged Issues

-**#508**— 工具调用格式回归：请求的代理日志和提供商链信息（`needs-info`）-**#510**— Windows CLI 运行状况检查路径：请求的 shell/节点版本信息（`needs-info`）-**#485**— Kiro MCP 工具调用：作为外部 Kiro 问题关闭（不是 OmniRoute）-**#442**— Baseten /models 端点：已关闭（已记录的手动解决方法）-**#464**— 密钥配置 API：确认为路线图项目---

## [2.9.1] — 2026-03-21

> Sprint：修复 SSEomniModel 数据丢失，合并每个协议模型的兼容性。### Bug Fixes

-**#511**— 严重：在 SSE 流中的“finish_reason:stop”之后发送“<omniModel>”标记，导致数据丢失。标签现在被注入到第一个非空内容块中，保证在 SDK 关闭连接之前进行交付。### Merged PRs

-**PR #512**(@zhangqiang8vip)：每个协议模型兼容性 - 现在可以根据客户端协议（OpenAI、Claude、Responses API）配置“normalizeToolCallId”和“preserveOpenAIDeveloperRole”。模型配置中带有 Zod 验证的新“compatByProtocol”字段。### Triaged Issues

-**#510**— Windows CLI healthcheck_failed：请求的路径/版本信息 -**#509**— Turbopack Electron 回归：上游 Next.js 错误，记录的解决方法 -**#508**— macOS 黑屏：建议的“--disable-gpu”解决方法---

## [2.9.0] — 2026-03-20

> Sprint：跨平台 machineId 修复、每个 API 密钥速率限制、流上下文缓存、阿里巴巴 DashScope、搜索分析、ZWS v5 和已关闭的 8 个问题。### ✨ New Features

-**feat(search)**：“/dashboard/analytics”中的搜索分析选项卡 — 提供商细分、缓存命中率、成本跟踪。新 API：`GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**：阿里云 DashScope 添加了自定义端点路径验证 - 每个节点可配置 `chatPath` 和 `modelsPath` (#feat/custom-endpoint-paths) -**feat(api)**：每个 API 密钥请求计数限制 — `max_requests_per_day` 和 `max_requests_per_million` 列，内存中滑动窗口强制返回 HTTP 429 (#452) -**feat(dev)**：ZWS v5 — HMR 泄漏修复（485 个数据库连接 → 1），内存 2.4GB → 195MB，`globalThis` 单例，Edge 运行时警告修复 (@zhangqiang8vip)### 🐛 Bug Fixes

-**修复（#506）**：跨平台 `machineId` — `getMachineIdRaw()` 使用 try/catch 瀑布重写（Windows REG.exe → macOS ioreg → Linux 文件读取 → 主机名 → `os.hostname()`）。消除了 Next.js 捆绑器死代码消除的“process.platform”分支，修复了 Windows 上的“无法识别”“head”。还修复了#466。-**修复（#493）**：自定义提供程序模型命名 - 删除了“DefaultExecutor.transformRequest()”中不正确的前缀剥离，该前缀剥离破坏了组织范围的模型 ID，例如“zai-org/GLM-5-FP8”。-**修复（#490）**：流+上下文缓存保护 - `TransformStream` 拦截 SSE 以在 `[DONE]` 标记之前注入 `<omniModel>` 标记，从而为流响应启用上下文缓存保护。-**修复（#458）**：组合模式验证 - `system_message`、`tool_filter_regex`、`context_cache_protection` 字段现在可以在保存时通过 Zod 验证。-**修复（#487）**：KIRO MITM 卡清理 — 删除了 ZWS_README，通用化“AntigravityToolCard”以使用动态工具元数据。### 🧪 Tests

- 添加了人类格式工具过滤器单元测试（PR #397） - 没有“.function”包装器的“tool.name”的 8 个回归测试
- 测试套件：**821 次测试，0 次失败**（高于 813 次）### 📋 Issues Closed (8)

-**#506**— Windows machineId `head` 无法识别（已修复）-**#493**— 自定义提供程序模型命名（已修复）-**#490**— 流上下文缓存（已修复）-**#452**— 每个 API 密钥请求限制（已实现）-**#466**— Windows 登录失败（与#506 相同的根本原因）-**#504**— MITM 不活动（预期行为）-**#462**— Gemini CLI PSA（已解决）-**#434**— Electron 应用程序崩溃（#402 的重复）## [2.8.9] — 2026-03-20

> Sprint：合并社区 PR、修复 KIRO MITM 卡、依赖项更新。### Merged PRs

-**PR #498**(@Sajid11194)：修复 Windows 计算机 ID 崩溃（`undefined\REG.exe`）。用本机操作系统注册表查询替换“node-machine-id”。**关闭#486。** -**PR #497**(@zhangqiang8vip)：修复开发模式 HMR 资源泄漏 — 485 个泄漏的数据库连接 → 1，内存 2.4GB → 195MB。 `globalThis` 单例、Edge 运行时警告修复、Windows 测试稳定性。 （22 个文件+1168/-338）-**PR #499-503**(Dependabot)：GitHub Actions 更新 — `docker/build-push-action@7`、`actions/checkout@6`、`peter-evans/dockerhub-description@5`、`docker/setup-qemu-action@4`、`docker/login-action@4`。### Bug Fixes

-**#505**— KIRO MITM 卡现在显示特定于工具的指令 (`api.anthropic.com`)，而不是特定于反重力的文本。-**#504**— 回复了 UX 说明（MITM“非活动”是代理未运行时的预期行为）。---

## [2.8.8] — 2026-03-20

> Sprint：修复 OAuth 批量测试崩溃问题，向各个提供商页面添加“测试全部”按钮。### Bug Fixes

-**OAuth 批量测试崩溃**(ERR_CONNECTION_REFUSED)：通过 `Promise.race()` + `Promise.allSettled()` 将顺序 for 循环替换为 5 个连接并发限制 + 每个连接 30 秒超时。测试大型 OAuth 提供程序组（约 30 个以上连接）时防止服务器崩溃。### 功能特点

-**提供程序页面上的“测试全部”按钮**：当有 2 个以上连接时，各个提供程序页面（例如`/providers/codex`）现在在连接标题中显示“测试全部”按钮。将 `POST /api/providers/test-batch` 与 `{mode: "provider",providerId}` 一起使用。结果显示在带有通过/失败摘要和每个连接诊断的模式中。---

## [2.8.7] — 2026-03-20

> Sprint：合并 PR #495（瓶颈 429 下降），修复 #496（自定义嵌入提供程序），分类功能。### Bug Fixes

-**瓶颈 429 无限等待**（@xandr0s 的 PR #495）：在 429 上，`limiter.stop({ dropWaitingJobs: true })` 立即失败所有排队的请求，因此上游调用者可以触发回退。 Limiter 已从 Map 中删除，因此下一个请求将创建一个新实例。-**自定义嵌入模型无法解析**(#496)：`POST /v1/embeddings` 现在可以解析来自所有provider_nodes（不仅仅是本地主机）的自定义嵌入模型。启用通过仪表板添加的“google/gemini-embedding-001”等模型。### Issues Responded

-**#452**— 每个 API 密钥请求计数限制（已在路线图上确认）-**#464**— 自动颁发具有提供商/帐户限制的 API 密钥（需要更多详细信息）-**#488**— 自动更新模型列表（已确认，在路线图上）-**#496**— 自定义嵌入提供程序解析（已修复）---

## [2.8.6] — 2026-03-20

> Sprint：合并 PR #494（MiniMax 角色修复），修复 KIRO MITM 仪表板，分类 8 个问题。### 功能特点

-**MiniMax 开发人员→系统角色修复**（PR #494 by @zhangqiang8vip）：每个模型“preserveDeveloperRole”切换。在提供商页面中添加“兼容性”UI。修复了 MiniMax 和类似网关的 422“角色参数错误”。-**roleNormalizer**：“normalizeDeveloperRole()”现在接受具有三态行为的“preserveDeveloperRole”参数（undefined=keep、true=keep、false=convert）。-**DB**：“models.ts”中新的“getModelPreserveOpenAIDeveloperRole()”和“mergeModelCompatOverride()”。### Bug Fixes

-**KIRO MITM 仪表板**(#481/#487)： `CLIToolsPageClient` 现在将任何 `configType: "mitm"` 工具路由到 `AntigravityToolCard` （MITM 启动/停止控件）。以前只有反重力是硬编码的。-**AntigravityToolCard generic**: Uses `tool.image`, `tool.description`, `tool.id` instead of hardcoded Antigravity values.防止丢失“defaultModels”。### Cleanup

- 删除了“ZWS_README_V2.md”（PR #494 中的仅开发文档）。### Issues Triaged (8)

-**#487**— 已关闭（在此版本中修复了 KIRO MITM）-**#486**— 需求信息（Windows REG.exe 路径问题）-**#489**— 需求信息（缺少反重力项目 ID，需要 OAuth 重新连接）-**#492**— 需求信息（mise 托管节点上缺少 app/server.js）-**#490**— 已确认（流+上下文缓存阻塞，已计划修复）-**#491**— 已确认（法典授权状态不一致）-**#493**— 已确认（模态提供程序模型名称前缀，提供解决方法）-**#488**— 功能请求积压（自动更新型号列表）---

## [2.8.5] — 2026-03-19

> Sprint：修复僵尸 SSE 流、上下文缓存首轮、KIRO MITM 和分类 5 个外部问题。### Bug Fixes

-**Zombie SSE Streams**(#473)：将 `STREAM_IDLE_TIMEOUT_MS` 从 300 秒减少到 120 秒，以便在提供者中途挂起时实现更快的组合回退。可通过环境变量进行配置。-**上下文缓存标签**(#474)：修复“injectModelTag()”以处理首轮请求（无辅助消息）——上下文缓存保护现在从第一个响应开始起作用。-**KIRO MITM**(#481)：将 KIRO `configType` 从 `guide` → `mitm` 更改为仪表板呈现 MITM 启动/停止控件。-**E2E 测试**(CI)：修复 `providers-bailian-coding-plan.spec.ts` — 在单击“添加 API 密钥”按钮之前消除预先存在的模式叠加。### Closed Issues

- #473 — 僵尸 SSE 流绕过组合回退
- #474 — 第一回合缺少上下文缓存 `<omniModel>` 标签
- #481 — KIRO 的 MITM 无法从仪表板激活
- #468 — Gemini CLI 远程服务器（已被 #462 弃用取代）
- #438 — Claude 无法写入文件（外部 CLI 问题）
- #439 — AppImage 不起作用（记录了 libfuse2 解决方法）
- #402 — ARM64 DMG“损坏”（已记录的 xattr -cr 解决方法）
- #460 — CLI 无法在 Windows 上运行（已记录的 PATH 修复）---

## [2.8.4] — 2026-03-19

> Sprint：Gemini CLI 弃用、VM 指南 i18n 修复、dependabot 安全修复、提供程序架构扩展。### 功能特点

-**Gemini CLI 弃用**(#462)：将 `gemini-cli` 提供商标记为弃用并带有警告 - Google 从 2026 年 3 月起限制第三方 OAuth 使用 -**Provider Schema**(#462)：使用 `deprecated`、`deprecationReason`、`hasFree`、`freeNote`、`authHint`、`apiHint` 可选字段扩展 Zod 验证### Bug Fixes

-**VM Guide i18n**(#471)：将 `VM_DEPLOYMENT_GUIDE.md` 添加到 i18n 翻译管道，从英语源重新生成所有 30 个语言环境翻译（卡在葡萄牙语中）### 安全

-**deps**：Bump `flatted` 3.3.3 → 3.4.2 — 修复了 CWE-1321 原型污染（#484，@dependabot）### Closed Issues

- #472 — 模型别名回归（在 v2.8.2 中修复）
- #471 — VM 指南翻译已损坏
- #483 — 在“[DONE]”之后尾随“data: null”（在 v2.8.3 中修复）### Merged PRs

- #484 — deps：从 3.3.3 升级到 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint：捷克语 i18n、SSE 协议修复、VM 指南翻译。### 功能特点

-**捷克语**(#482)：完整捷克语 (cs) i18n — 22 个文档、2606 个 UI 字符串、语言切换器更新 (@zen0bit) -**VM 部署指南**：从葡萄牙语翻译成英语作为源文档 (@zen0bit)### Bug Fixes

-**SSE 协议**(#483)：在“[DONE]”信号后停止发送尾随“data: null”——修复严格 AI SDK 客户端（基于 Zod 的验证器）中的“AI_TypeValidationError”### Merged PRs

- #482 — 添加捷克语 + 修复 VM_DEPLOYMENT_GUIDE.md 英文源 (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint：2 个合并 PR、模型别名路由修复、日志导出和问题分类。### 功能特点

-**日志导出**：`/dashboard/logs` 上的新导出按钮，带有时间范围下拉菜单（1 小时、6 小时、12 小时、24 小时）。通过 `/api/logs/export` API 下载请求/代理/调用日志的 JSON (#user-request)### Bug Fixes

-**模型别名路由**(#472)：设置 → 模型别名现在可以正确影响提供者路由，而不仅仅是格式检测。以前 `resolveModelAlias()` 输出仅用于 `getModelTargetFormat()`，但原始模型 ID 已发送给提供者 -**流刷新用法**(#480)：现在可以在流刷新期间正确提取缓冲区中最后一个 SSE 事件的使用数据（从 @prakersh 合并）### Merged PRs

- #480 — 从刷新处理程序中的剩余缓冲区中提取使用情况（@prakersh）
- #479 — 添加缺失的 Codex 5.3/5.4 和 Anthropic 模型 ID 定价条目 (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint：五个社区 PR — 流式调用日志修复、Kiro 兼容性、缓存令牌分析、中文翻译和可配置工具调用 ID。### 功能特点

-**feat(logs)**：现在在翻译之前从原始提供程序块（OpenAI/Claude/Gemini）正确累积调用日志响应内容，修复流模式下的空响应负载（#470，@zhangqiang8vip）-**feat(providers)**：每个模型可配置的 9 字符工具调用 ID 规范化（Mistral 风格）——只有启用了该选项的模型才会得到截断的 ID (#470) -**feat(api)**：关键 PATCH API 扩展为支持 `allowedConnections`、`name`、`autoResolve`、`isActive` 和 `accessSchedule` 字段 (#470) -**feat(dashboard)**：请求日志详细信息 UI 中的响应优先布局 (#470) -**feat(i18n)**：改进的中文 (zh-CN) 翻译 — 完全重新翻译 (#475, @only4copilot)### 🐛 Bug Fixes

-**修复（kiro）**：从请求正文中删除注入的“model”字段 - Kiro API 拒绝未知的顶级字段（#478，@prakersh）-**修复（使用）**：在使用历史输入总计中包含缓存读取 + 缓存创建令牌，以进行准确分析（#477，@prakersh）-**修复（callLogs）**：支持 Claude 格式使用字段（`input_tokens`/`output_tokens`）以及 OpenAI 格式，包括所有缓存令牌变体（#476，@prakersh）---

## [2.8.0] — 2026-03-19

> Sprint：具有可编辑基本 URL 的 Bailian Coding Plan 提供商，以及对阿里云和 Kimi Coding 的社区贡献。### 功能特点

-**feat(providers)**：添加了 Bailian Coding Plan (`bailian-coding-plan`) — 具有 Anthropic 兼容 API 的阿里巴巴模型工作室。 Qwen3.5 Plus、Qwen3 Coder、MiniMax M2.5、GLM 5、Kimi K2.5等8个型号的静态目录。包括自定义身份验证（400=有效，401/403=无效）（#467，@Mind-Dragon）-**feat(admin)**：提供商管理创建/编辑流程中的可编辑默认 URL — 用户可以为每个连接配置自定义基本 URL。保留在 `providerSpecificData.baseUrl` 中，Zod 架构验证拒绝非 http(s) 方案 (#467)### 🧪 Tests

- 为百联编码计划提供商添加了 30 多个单元测试和 2 个 e2e 场景，涵盖身份验证、模式强化、路由级行为和跨层集成---

## [2.7.10] — 2026-03-19

> Sprint：两个新的社区贡献提供商（阿里巴巴云编码、Kimi Coding API-key）和 Docker pino 修复。### 功能特点

-**feat(providers)**：添加了阿里云编码计划支持，具有两个兼容 OpenAI 的端点 — `alicode`（中国）和 `alicode-intl`（国际），每个端点都有 8 个模型（#465，@dtk1985）-**feat(providers)**：添加了专用的“kimi-coding-apikey”提供程序路径 - 不再强制通过仅限 OAuth 的“kimi-coding”路由进行基于 API 密钥的 Kimi 编码访问。包括注册表、常量、模型 API、配置和验证测试（#463，@Mind-Dragon）### 🐛 Bug Fixes

-**修复（docker）**：向 Docker 镜像添加了缺少的 `split2` 依赖项 — `pino-abstract-transport` 在运行时需要它，但它没有被复制到独立容器中，导致 `Cannot find module 'split2'` 崩溃 (#459)---

## [2.7.9] — 2026-03-18

> Sprint：原生支持 Codex 响应子路径直通，修复 Windows MITM 崩溃，并调整 Combos 代理架构。### 功能特点

-**feat(codex)**：Codex 的本机响应子路径直通 — 本机将 `POST /v1/responses/compact` 路由到 Codex 上游，保持 Claude Code 兼容性，而不剥离 `/compact` 后缀 (#457)### 🐛 Bug Fixes

-**修复（组合）**：Zod 模式（“updateComboSchema”和“createComboSchema”）现在包括“system_message”、“tool_filter_regex”和“context_cache_protection”。修复了通过仪表板创建的特定于代理的设置被后端验证层默默丢弃的错误 (#458) -**修复（mitm）**：修复了 Windows 上的 Kiro MITM 配置文件崩溃 — 由于缺少“REG.exe”环境，“node-machine-id”失败，并且回退引发了致命的“加密未定义”错误。 Fallback 现在可以安全、正确地导入加密货币 (#456)---

## [2.7.8] — 2026-03-18

> Sprint：预算保存错误+组合代理功能UI+omniModel标签安全修复。### 🐛 Bug Fixes

-**修复（预算）**：“保存限制”不再返回 422 — `warningThreshold` 现在正确发送为分数 (0–1)，而不是百分比 (0–100) (#451) -**修复（组合）**：`<omniModel>` 内部缓存标记现在在将请求转发给提供者之前被剥离，以防止缓存会话中断 (#454)### 功能特点

-**feat(combos)**：代理功能部分添加到组合创建/编辑模式中 - 直接从仪表板公开 `system_message` 覆盖、`tool_filter_regex` 和 `context_cache_protection` (#454)---

## [2.7.7] — 2026-03-18

> Sprint：Docker pino 崩溃、Codex CLI 响应工作修复、包锁定同步。### 🐛 Bug Fixes

-**修复（docker）**：“pino-abstract-transport”和“pino-pretty”现在显式复制到 Docker 运行程序阶段 - Next.js 独立跟踪会错过这些对等 deps，导致“无法找到模块 pino-abstract-transport”在启动时崩溃 (#449) -**修复（响应）**：从 `/v1/responses` 路由中删除 `initTranslators()` — 在 Codex CLI 请求上导致 Next.js 工作线程崩溃，并出现“工作线程已退出” uncaughtException (#450)### 🔧 Maintenance

-**chore(deps)**：`package-lock.json` 现在在每个版本更新上提交，以确保 Docker `npm ci` 使用准确的依赖版本---

## [2.7.5] — 2026-03-18

> Sprint：UX 改进和 Windows CLI 运行状况检查修复。### 🐛 Bug Fixes

-**修复（ux）**：在登录页面上显示默认密码提示 - 新用户现在可以在密码输入下方看到“默认密码：123456”（#437）-**修复（cli）**：Claude CLI 和其他 npm 安装的工具现在可以正确检测为可在 Windows 上运行 - spawn 使用 `shell:true` 通过 PATHEXT 解析 `.cmd` 包装器 (#447)---

## [2.7.4] — 2026-03-18

> Sprint：搜索工具仪表板、i18n 修复、Copilot 限制、Serper 验证修复。### 功能特点

-**feat(search)**：添加搜索游乐场（第 10 个端点）、具有比较提供商/重新排名管道/搜索历史记录的搜索工具页面、本地重新排名路由、搜索 API 上的身份验证防护（@Regis-RCR 的 #443）

- 新路线：`/dashboard/search-tools`
- 调试部分下的侧边栏条目
- 具有身份验证保护的“GET /api/search/providers”和“GET /api/search/stats”
- `/v1/rerank` 的本地provider_nodes路由
- 搜索命名空间中有 30 多个 i18n 键### 🐛 Bug Fixes

-**修复（搜索）**：修复 Brave 新闻标准化器（返回 0 个结果），强制执行 max_results 截断后标准化，修复 Endpoints 页面获取 URL（#443 by @Regis-RCR）-**修复（分析）**：本地化分析日/日期标签 - 用“Intl.DateTimeFormat(locale)”替换硬编码的葡萄牙语字符串（#444 by @hijak）-**修复（copilot）**：正确的 GitHub Copilot 帐户类型显示，从限制仪表板中过滤误导性的无限配额行（#445 by @hijak）-**修复（提供者）**：停止拒绝有效的 Serper API 密钥 — 将非 4xx 响应视为有效身份验证（#446 by @hijak）---

## [2.7.3] — 2026-03-18

> Sprint：Codex 直接 API 配额回退修复。### 🐛 Bug Fixes

-**修复（codex）**：在直接 API 回退中阻止每周耗尽的帐户（#440）

- `resolveQuotaWindow()` 前缀匹配：`"weekly"` 现在匹配 `"weekly (7d)"` 缓存键
- `applyCodexWindowPolicy()` 强制正确切换 `useWeekly`/`use5h`
- 4 个新的回归测试（总共 766 个）---

## [2.7.2] — 2026-03-18

> Sprint：修复了灯光模式 UI 对比度。### 🐛 Bug Fixes

-**修复（日志）**：修复请求日志过滤器按钮和组合徽章中的灯光模式对比度（＃378）

- 错误/成功/组合过滤器按钮现在在浅色模式下可读
- 组合行徽章在灯光模式下使用更强的紫色---

## [2.7.1] — 2026-03-17

> Sprint：具有 5 个提供商的统一 Web 搜索路由 (POST /v1/search) + Next.js 16.1.7 安全修复程序（6 个 CVE）。### ✨ New Features

-**feat(search)**：统一网络搜索路由 — `POST /v1/search` 包含 5 个提供商（Serper、Brave、Perplexity、Exa、Tavily）

- 跨提供商自动故障转移，每月 6,500 多次免费搜索
- 具有请求合并功能的内存缓存（可配置 TTL）
- 仪表板：“/dashboard/analytics”中的“搜索分析”选项卡，包含提供商细分、缓存命中率、成本跟踪
- 新 API：用于搜索请求统计的“GET /api/v1/search/analytics”
- 数据库迁移：“call_logs”上的“request_type”列用于非聊天请求跟踪
- Zod 验证（`v1SearchSchema`），身份验证门控，通过 `recordCost()` 记录成本### 安全

-**deps**：Next.js 16.1.6 → 16.1.7 — 修复了 6 个 CVE：-**严重**：CVE-2026-29057（通过 http 代理进行 HTTP 请求走私）-**高**：CVE-2026-27977、CVE-2026-27978（WebSocket + 服务器操作）-**中**：CVE-2026-27979、CVE-2026-27980、CVE-2026-jcc7### 📁 New Files

| 文件                                                       | 目的                                      |
| ---------------------------------------------------------- | ----------------------------------------- | --- |
| `open-sse/handlers/search.ts`                              | 具有 5 个提供商路由的搜索处理程序         |
| `open-sse/config/searchRegistry.ts`                        | 提供商注册表（身份验证、成本、配额、TTL） |
| `open-sse/services/searchCache.ts`                         | 具有请求合并功能的内存缓存                |
| `src/app/api/v1/search/route.ts`                           | Next.js 路由 (POST + GET)                 |
| `src/app/api/v1/search/analytics/route.ts`                 | 搜索统计API                               |
| `src/app/(仪表板)/仪表板/analytics/SearchAnalyticsTab.tsx` | 分析仪表板选项卡                          |
| `src/lib/db/migrations/007_search_request_type.sql`        | 数据库迁移                                |
| `测试/单元/search-registry.test.mjs`                       | 277 行单元测试                            | --- |

## [2.7.0] — 2026-03-17

> Sprint：受 ClawRouter 启发的功能 — 工具调用标志、多语言意图检测、基准驱动的回退、请求重复数据删除、可插入 RouterStrategy、Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5 定价。### ✨ New Models & Pricing

-**壮举（定价）**：xAI Grok-4 Fast — “每 1M 代币 0.20 美元/0.50 美元”，1143 毫秒 p50 延迟，支持工具调用 -**壮举（定价）**：xAI Grok-4（标准）——“每 100 万代币 0.20 美元/1.50 美元”，推理旗舰 -**壮举（定价）**：通过 Z.AI 的 GLM-5 — `$0.5/1M`，128K 输出上下文 -**壮举（定价）**：MiniMax M2.5 — `$0.30/1M 输入`，推理 + 代理任务 -**壮举（定价）**：DeepSeek V3.2 — 更新定价“每 100 万美元 0.27 美元/1.10 美元” -**壮举（定价）**：Kimi K2.5 通过 Moonshot API — 直接 Moonshot API 访问 -**feat(providers)**：添加了 Z.AI 提供程序（`zai` 别名）- 具有 128K 输出的 GLM-5 系列### 🧠 Routing Intelligence

-**feat(registry)**：提供程序注册表中每个模型的“toolCalling”标志 - 组合现在可以更喜欢/需要具有工具调用能力的模型 -**feat(scoring)**：用于 AutoCombo 评分的多语言意图检测 - PT/ZH/ES/AR 脚本/语言模式影响每个请求上下文的模型选择 -**feat(fallback)**：基准驱动的回退链 — 真实延迟数据（来自 `comboMetrics` 的 p50）用于动态重新排序回退优先级 -**feat(dedup)**：通过内容哈希请求重复数据删除 — 5 秒幂等窗口可防止重试客户端的重复提供程序调用 -**feat(router)**：`autoCombo/routerStrategy.ts` 中的可插入 `RouterStrategy` 接口 - 可以在不修改核心的情况下注入自定义路由逻辑### 🔧 MCP Server Improvements

-**feat(mcp)**：2 个新的高级工具模式：`omniroute_get_provider_metrics` （每个提供商 p50/p95/p99）和 `omniroute_explain_route` （路由决策解释）-**feat(mcp)**：更新了 MCP 工具身份验证范围 - 为提供商指标工具添加了“metrics:read”范围 -**feat(mcp)**：`omniroute_best_combo_for_task` 现在接受用于多语言路由的 `languageHint` 参数### 📊 Observability

-**feat(metrics)**：`comboMetrics.ts` 扩展了每个提供商/帐户的实时延迟百分位数跟踪 -**feat(health)**：Health API (`/api/monitoring/health`) 现在返回每个提供商的 `p50Latency` 和 `errorRate` 字段 -**feat(usage)**：用于每个模型延迟跟踪的使用历史记录迁移### 🗄️ DB Migrations

-**feat(migrations)**：“combo_metrics”表中的新列“latency_p50”——零破坏，对现有用户安全### 🐛 Bug Fixes / Closures

-**close(#411)**：Windows 上的 better-sqlite3 哈希模块解析 — 在 v2.6.10 (f02c5b5) 中修复 -**close(#409)**：附加文件时，Claude 模型的 GitHub Copilot 聊天完成失败 — 在 v2.6.9 (838f1d6) 中修复 -**close(#405)**：#411 的重复 — 已解决## [2.6.10] — 2026-03-17

> Windows 修复：better-sqlite3 预构建下载，无需 node-gyp/Python/MSVC (#426)。### 🐛 Bug Fixes

-**修复（安装/#426）**：在 Windows 上，“npm install -gomniroute”过去常常失败，并显示“better_sqlite3.node 不是有效的 Win32 应用程序”，因为捆绑的本机二进制文件是针对 Linux 编译的。将**策略 1.5**添加到 `scripts/postinstall.mjs`：使用 `@mapbox/node-pre-gyp install --fallback-to-build=false` （捆绑在 `better-sqlite3` 中）为当前 OS/arch 下载正确的预构建二进制文件，而不需要任何构建工具（无 node-gyp、无 Python、无 MSVC）。仅当下载失败时才回退到“npm重建”。添加特定于平台的错误消息以及清晰的手动修复说明。---

## [2.6.9] — 2026-03-17

> CI 修复（t11 任何预算）、错误修复 #409（通过 Copilot+Claude 的文件附件）、发布工作流程修正。### 🐛 Bug Fixes

-**修复（ci）**：从`openai-responses.ts`和`chatCore.ts`中的评论中删除单词“any”，这些词未通过t11`any`预算检查（正则表达式计数评论的误报）-**fix(chatCore)**：在转发到提供程序之前规范化不支持的内容部分类型（#409 — 当附加 `.md` 文件时，光标发送 `{type:"file"}`；Copilot 和其他 OpenAI 兼容提供程序拒绝“类型必须是 'image_url' 或 'text'”；修复将 `file`/`document` 块转换为 `text` 并删除未知类型）### 🔧 Workflow

-**chore(generate-release)**：添加原子提交规则 - 版本提升（`npm 版本补丁`）必须在提交功能文件之前发生，以确保标记始终指向包含所有版本更改的提交---

## [2.6.8] — 2026-03-17

> Sprint：组合作为代理（系统提示+工具过滤器）、上下文缓存保护、自动更新、详细日志、MITM Kiro IDE。### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**：`ALTER TABLE 组合添加列 system_message TEXT DEFAULT NULL`，`tool_filter_regex TEXT DEFAULT NULL`，`context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**：新的“request_detail_logs”表，具有 500 个条目的环形缓冲区触发器，通过设置切换选择加入### 功能特点

-**feat(combo)**：每个组合的系统消息覆盖（#399 - `system_message` 字段在转发给提供商之前替换或注入系统提示）-**feat(combo)**：每个组合的工具过滤器正则表达式（#399 - `tool_filter_regex` 仅保留工具匹配模式；支持 OpenAI + Anthropic 格式）-**feat(combo)**：上下文缓存保护（#401 - `context_cache_protection` 使用 `<omniModel>provider/model</omniModel>` 标记响应并固定模型以实现会话连续性）-**feat(settings)**：通过设置自动更新（#320 — `GET /api/system/version` + `POST /api/system/update` — 检查 npm 注册表并在 pm2 重启时在后台更新）-**feat(logs)**：详细的请求日志（#378 — 捕获 4 个阶段的完整管道主体：客户端请求、翻译请求、提供商响应、客户端响应 — 选择加入切换、64KB 修剪、500 条目环形缓冲区）-**feat(mitm)**：MITM Kiro IDE 配置文件（#336 — `src/mitm/targets/kiro.ts` 目标为 api.anthropic.com，重用现有的 MITM 基础设施）---

## [2.6.7] — 2026-03-17

> Sprint：SSE 改进、本地provider_nodes 扩展、代理注册表、Claude 直通修复。### 功能特点

-**feat(health)**：对本地“provider_nodes”进行后台健康检查，具有指数退避（30s→300s）和“Promise.allSettled”以避免阻塞（#423，@Regis-RCR）-**feat(embeddings)**：将 `/v1/embeddings` 路由到本地 `provider_nodes` — `buildDynamicEmbeddingProvider()` 并进行主机名验证（#422，@Regis-RCR）-**feat(audio)**：将 TTS/STT 路由到本地 `provider_nodes` — 带 SSRF 保护的 `buildDynamicAudioProvider()` (#416，@Regis-RCR) -**feat(proxy)**：代理注册、管理 API 和配额限制泛化（#429，@Regis-RCR）### 🐛 Bug Fixes

-**修复（sse）**：当目标是 OpenAI 兼容时，剥离 Claude 特定的字段（`metadata`、`anthropic_version`）（#421、@prakersh）-**修复（sse）**：在直通流模式下提取 Claude SSE 用法（`input_tokens`、`output_tokens`、缓存令牌）（#420，@prakersh）-**修复（sse）**：为缺少/空 ID 的工具调用生成后备“call_id”（#419，@prakersh）-**修复（sse）**：Claude-to-Claude passthrough - 前向身体完全未受影响，无需重新翻译（#418，@prakersh）-**修复（sse）**：在 Claude 代码上下文压缩后过滤孤立的“tool_result”项目以避免 400 错误（#417，@prakersh）-**修复（sse）**：在响应 API 转换器中跳过空名称工具调用以防止 `placeholder_tool` 无限循环（#415，@prakersh）-**修复（sse）**：翻译前去除空文本内容块（#427，@prakersh）-**修复（api）**：将 `refreshable: true` 添加到 Claude OAuth 测试配置（#428，@prakersh）### 📦 Dependencies

- 增加 `vitest`、`@vitest/*` 和相关的 devDependency (#414，@dependabot)---

## [2.6.6] — 2026-03-17

> 修补程序：Turbopack/Docker 兼容性 — 从所有 `src/` 导入中删除 `node:` 协议。### 🐛 Bug Fixes

-**修复（构建）**：从 `src/` 下 17 个文件的 `import` 语句中删除了 `node:` 协议前缀。 `node:fs`、`node:path`、`node:url`、`node:os` 等导入导致 Turbopack 构建 (Next.js 15 Docker) 以及从较旧的 npm 全局安装升级时出现 `Ecmascript file had an error`。受影响的文件：“migrationRunner.ts”、“core.ts”、“backup.ts”、“prompts.ts”、“dataPaths.ts”以及“src/app/api/”和“src/lib/”中的其他 12 个文件。-**杂务（工作流程）**：更新了 `generate-release.md` 以使 Docker Hub 同步和双 VPS 部署在每个版本中都是**强制**步骤。---

## [2.6.5] — 2026-03-17

> Sprint：推理模型参数过滤、本地提供商 404 修复、Kilo 网关提供商、依赖项碰撞。### ✨ New Features

-**feat(api)**：添加**Kilo Gateway**(`api.kilo.ai`) 作为新的 API 密钥提供程序（别名 `kg`） — 335 多个模型、6 个免费模型、3 个自动路由模型（`kilo-auto/frontier`、`kilo-auto/balanced`、`kilo-auto/free`）。通过“/api/gateway/models”端点支持的直通模型。 （@Regis-RCR 的 PR #408）### 🐛 Bug Fixes

-**修复(sse)**：删除推理模型不支持的参数（o1、o1-mini、o1-pro、o3、o3-mini）。 `o1`/`o3` 系列中的模型拒绝使用 HTTP 400 的 `Temperature`、`top_p`、`Frequency_penalty`、`presence_penalty`、`logprobs`、`top_logprobs` 和 `n`。现在在转发之前在 `chatCore` 层剥离参数。每个模型使用声明性“unsupportedParams”字段和预先计算的 O(1) Map 进行查找。 （@Regis-RCR 的 PR #412）-**修复（sse）**：本地提供程序 404 现在导致**仅模型锁定（5 秒）**，而不是连接级锁定（2 分钟）。当本地推理后端（Ollama、LM Studio、oMLX）针对未知模型返回 404 时，连接保持活动状态，其他模型立即继续工作。还修复了一个预先存在的错误，即“model”未传递给“markAccountUnavailable()”。通过主机名检测到的本地提供程序（`localhost`、`127.0.0.1`、`::1`，可通过 `LOCAL_HOSTNAMES` env var 扩展）。 （@Regis-RCR 的 PR #410）### 📦 Dependencies

- `better-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `代理基地` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**修复（提供商）**：删除了 5 个提供商中不存在的模型名称：-**gemini / gemini-cli**：删除了`gemini-3.1-pro/flash`和`gemini-3-*-preview`（Google API v1beta中不存在）；替换为 `gemini-2.5-pro`、`gemini-2.5-flash`、`gemini-2.0-flash`、`gemini-1.5-pro/flash` -**反重力**：删除了`gemini-3.1-pro-high/low`和`gemini-3-flash`（无效的内部别名）；替换为真正的 2.x 型号 -**github (Copilot)**：删除了 `gemini-3-flash-preview` 和 `gemini-3-pro-preview`；替换为“gemini-2.5-flash” -**nvidia**：更正了“nvidia/llama-3.3-70b-instruct”→“meta/llama-3.3-70b-instruct”（NVIDIA NIM 对元模型使用“meta/”命名空间）；添加了“nvidia/llama-3.1-70b-instruct”和“nvidia/llama-3.1-405b-instruct” -**修复（db/combo）**：更新了远程数据库上的“free-stack”组合：删除了“qw/qwen3-coder-plus”（过期的刷新令牌），更正了“nvidia/llama-3.3-70b-instruct”→“nvidia/meta/llama-3.3-70b-instruct”，更正了“gemini/gemini-3.1-flash”→ `gemini/gemini-2.5-flash`，添加了 `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint：zod/pino 哈希条已纳入构建管道，添加了合成提供程序，更正了 VP​​S PM2 路径。### 🐛 Bug Fixes

-**修复（构建）**：Turbopack hash-strip 现在在所有包的**编译时**运行 - 不仅仅是“better-sqlite3”。 `prepublish.mjs` 中的步骤 5.6 遍历 `app/.next/server/` 中的每个 `.js`，并从任何散列的 `require()` 中删除 16 个字符的十六进制后缀。修复了全局 npm 安装上的 `zod-dcb22c...`、`pino-...` 等 MODULE_NOT_FOUND。关闭 #398 -**修复（部署）**：两个 VPS 上的 PM2 都指向过时的 git-clone 目录。重新配置为 npm 全局包中的 `app/server.js`。更新了“/deploy-vps”工作流程以使用“npm pack + scp”（npm 注册表拒绝 299MB 包）。### 功能特点

-**feat(provider)**：Synthetic ([synthetic.new](https://synthetic.new)) — 注重隐私的 OpenAI 兼容推理。 `passthroughModels: true` 用于动态 HuggingFace 模型目录。初始型号：Kimi K2.5、MiniMax M2.5、GLM 4.7、DeepSeek V3.2。 （@Regis-RCR 的 PR #404）### 📋 Issues Closed

-**close #398**：npm 哈希回归 — 通过预发布中的编译时哈希条修复 -**分类#324**：没有步骤的错误屏幕截图 - 请求重现详细信息---

## [2.6.2] — 2026-03-16

> Sprint：模块哈希完全修复，合并 2 个 PR（人类工具过滤器 + 自定义端点路径），添加阿里云 DashScope 提供商，解决了 3 个陈旧问题。### 🐛 Bug Fixes

-**修复（构建）**：扩展了 webpack `externals` 哈希条以覆盖所有 `serverExternalPackages`，而不仅仅是 `better-sqlite3`。 Next.js 16 Turbopack 将“zod”、“pino”和所有其他服务器外部包哈希为“zod-dcb22c6336e0bc69”等运行时在“node_modules”中不存在的名称。 HASH_PATTERN 正则表达式包罗万象现在会去除 16 个字符的后缀并回退到基本包名称。还在“prepublish.mjs”中添加了“NEXT_PRIVATE_BUILD_WORKER=0”以加强 webpack 模式，以及报告任何剩余哈希引用的构建后扫描。 （#396、#398、公关#403）-**修复（聊天）**：人类格式的工具名称（没有“.function”包装器的“tool.name”）被#346中引入的空名称过滤器悄悄删除。 LiteLLM 以 Anthropic Messages API 格式代理带有“anthropic/”前缀的请求，导致所有工具被过滤并且 Anthropic 返回“400：tool_choice.any 只能在提供工具时指定”。当“tool.function.name”不存在时，通过回退到“tool.name”来修复。添加了 8 个回归单元测试。 （公关＃397）### 功能特点

-**feat(api)**：与 OpenAI 兼容的提供程序节点的自定义端点路径 - 在提供程序连接 UI 中为每个节点配置 `chatPath` 和 `modelsPath`（例如 `/v4/chat/completions`）。包括数据库迁移（`003_provider_node_custom_paths.sql`）和 URL 路径清理（无 `..` 遍历，必须以 `/` 开头）。 （公关＃400）-**feat(provider)**：阿里云 DashScope 添加为 OpenAI 兼容提供商。国际端点：`dashscope-in​​tl.aliyuncs.com/兼容模式/v1`。 12 个型号：`qwen-max`、`qwen-plus`、`qwen-turbo`、`qwen3-coder-plus/flash`、`qwq-plus`、`qwq-32b`、`qwen3-32b`、`qwen3-235b-a22b`。 Auth：承载 API 密钥。### 📋 Issues Closed

-**close #323**：Cline 连接错误 `[object Object]` — 在 v2.3.7 中修复；指示用户从 v2.2.9 升级 -**close #337**：Kiro 信用跟踪 — 在 v2.5.5 (#381) 中实现；将用户引导至仪表板 → 用法 -**分类#402**：ARM64 macOS DMG 损坏 - 请求 macOS 版本、确切错误，并建议“xattr -d com.apple.quarantine”解决方法---

## [2.6.1] — 2026-03-15

> 关键启动修复：由于 Next.js 16 检测挂钩中的 Turbopack/webpack 模块名称哈希错误，v2.6.0 全局 npm 安装崩溃并出现 500 错误。### 🐛 Bug Fixes

-**修复（构建）**：强制 `better-sqlite3` 始终需要 webpack 服务器包中的确切包名称。 Next.js 16 将检测钩子编译成一个单独的块并发出 `require('better-sqlite3-<hash>')` — 一个在 `node_modules` 中不存在的哈希模块名称 — 即使该包列在 `serverExternalPackages` 中。在服务器 webpack 配置中添加了显式的“externals”函数，以便捆绑器始终发出“require('better-sqlite3')”，解决了干净全局安装时启动“500 内部服务器错误”的问题。 （#394，公关#395）### 🔧 CI

-**ci**：将“workflow_dispatch”添加到“npm-publish.yml”，并为手动触发器提供版本同步保护（#392）-**ci**：将“workflow_dispatch”添加到“docker-publish.yml”，将 GitHub Actions 更新到最新版本 (#392)---

## [2.6.0] - 2026-03-15

> 问题解决冲刺：修复了 4 个错误，改进了日志用户体验，添加了 Kiro 信用跟踪。### 🐛 Bug Fixes

-**修复（媒体）**：未配置时，ComfyUI 和 SD WebUI 不再出现在媒体页面提供程序列表中 — 在挂载时获取 `/api/providers` 并隐藏没有连接的本地提供程序 (#390) -**修复（auth）**：循环不再在冷却后立即重新选择速率受限的帐户 - `backoffLevel` 现在用作 LRU 轮换中的主要排序键 (#340) -**修复（oauth）**：Qoder（以及重定向到自己的 UI 的其他提供商）不再让 OAuth 模式停留在“等待授权”——弹出窗口关闭的检测器自动转换为手动 URL 输入模式 (#344) -**修复（日志）**：请求日志表现在在浅色模式下可读 - 状态徽章、令牌计数和组合标签使用自适应“深色：”颜色类别（#378）### 功能特点

-**feat(kiro)**：Kiro 信用跟踪添加到使用获取器中 — 从 AWS CodeWhisperer 端点查询 `getUserCredits` (#337)### 🛠 Chores

-**chore(tests)**：对齐 `test:plan3`、`test:fixes`、`test:security` 以使用与 `npm test` 相同的 `tsx/esm` 加载器 — 消除目标运行中的模块解析漏报 (PR #386)---

## [2.5.9] - 2026-03-15

> Codex 原生直通修复 + 路由主体验证强化。### 🐛 Bug Fixes

-**修复（codex）**：为 Codex 客户端保留本机响应 API 直通 — 避免不必要的翻译突变（PR #387）-**修复（api）**：验证定价/同步和任务路由路由上的请求主体 - 防止因格式错误的输入而崩溃（PR＃388）-**修复（auth）**：JWT 机密在通过 `src/lib/db/secrets.ts` 重新启动后仍然存在 - 消除 pm2 重新启动后的 401 错误（PR #388）---

## [2.5.8] - 2026-03-15

> 构建修复：恢复因 v2.5.7 不完整发布而中断的 VPS 连接。### 🐛 Bug Fixes

-**修复（构建）**：“scripts/prepublish.mjs”仍然使用已弃用的“--webpack”标志，导致 Next.js 独立构建无提示地失败 - npm 发布在没有“app/server.js”的情况下完成，破坏了 VPS 部署---

## [2.5.7] - 2026-03-15

> 媒体游乐场错误处理修复。### 🐛 Bug Fixes

-**修复（媒体）**：当音频不包含语音（音乐、静音）时，转录“需要 API 密钥”误报 — 现在显示“未检测到语音” -**修复（媒体）**：“audioTranscription.ts”和“audioSpeech.ts”中的“upstreamErrorResponse”现在返回正确的 JSON（“{error:{message}}”），从而在 MediaPageClient 中启用正确的 401/403 凭据错误检测 -**修复（媒体）**：“parseApiError”现在处理 Deepgram 的“err_msg”字段并检测错误消息中的“api key”，以实现准确的凭证错误分类---

## [2.5.6] - 2026-03-15

> 关键安全/身份验证修复：反重力 OAuth 损坏 + JWT 会话在重启后丢失。### 🐛 Bug Fixes

-**修复(oauth) #384**：反重力 Google OAuth 现在可以正确地将 `client_secret` 发送到令牌端点。 `ANTIGRAVITY_OAUTH_CLIENT_SECRET` 的后备是一个空字符串，这是虚假的 - 因此 `client_secret` 从未包含在请求中，导致所有没有自定义环境变量的用户出现 `"client_secret is Missing"` 错误。关闭#383。-**fix(auth) #385**：`JWT_SECRET` 现在在第一代时持久保存到 SQLite (`namespace='secrets'`)，并在后续启动时重新加载。以前，每次进程启动时都会生成一个新的随机密钥，从而在任何重新启动或升级后使所有现有的 cookie/会话失效。影响“JWT_SECRET”和“API_KEY_SECRET”。关闭#382。---

## [2.5.5] - 2026-03-15

> 模型列表重复数据删除修复、Electron 独立构建强化和 Kiro 信用跟踪。### 🐛 Bug Fixes

-**fix(models) #380**：`GET /api/models` 现在在构建活动提供者过滤器时包含提供者别名 - 无论是否配置连接，始终显示`claude`（别名`cc`）和`github`（别名`gh`）模型，因为`PROVIDER_MODELS`键是别名，但数据库连接存储在提供者ID下。通过扩展每个活动提供商 ID 以通过“PROVIDER_ID_TO_ALIAS”也包含其别名来修复。关闭#353。-**修复（电子）#379**：新的 `scripts/prepare-electron-standalone.mjs` 在 Electron 打包之前会暂存一个专用的 `/.next/electron-standalone` 包。如果“node_modules”是符号链接，则中止并出现明显错误（电子构建器将在构建机器上提供运行时依赖项）。通过“path.basename”进行跨平台路径清理。作者：@kfiramar。### ✨ New Features

-**feat(kiro) #381**：Kiro 信用余额跟踪 — 使用端点现在通过调用“codewhisperer.us-east-1.amazonaws.com/getUserCredits”返回 Kiro 帐户的信用数据（与 Kiro IDE 内部使用的端点相同）。返回剩余积分、总限额、续订日期和订阅级别。关闭#337。## [2.5.4] - 2026-03-15

> 记录器启动修复、登录引导安全修复和开发 HMR 可靠性改进。 CI 基础设施得到强化。### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**：恢复 pino 传输记录器路径 — `formatters.level` 与 `transport.targets` 结合被 pino 拒绝。支持传输的配置现在通过“getTransportCompatibleConfig()”剥离级别格式化程序。还更正了“/api/logs/console”中的数字级别映射：“30→info、40→warn、50→error”（移动了一位）。-**修复（登录）#375**：登录页面现在从公共“/api/settings/require-login”端点引导，而不是受保护的“/api/settings”。在受密码保护的设置中，预身份验证页面会收到 401 并不必要地回退到安全默认值。公共路由现在返回所有引导元数据（“requireLogin”、“hasPassword”、“setupComplete”），并在错误时保守地返回 200。-**fix(dev) #374**：将 `localhost` 和 `127.0.0.1` 添加到 `next.config.mjs` 中的 `allowedDevOrigins` — 通过环回地址访问应用程序时，HMR websocket 被阻止，产生重复的跨源警告。### 🔧 CI & Infrastructure

-**ESLint OOM 修复**：`eslint.config.mjs` 现在忽略 `vscode-extension/**`、` Electron/**`、`docs/**`、`app/.next/**` 和 `clipr/**` — ESLint 通过扫描 VS Code 二进制 blob 和编译块而因 JS 堆 OOM 崩溃。-**单元测试修复**：从 2 个测试文件中删除了陈旧的 `ALTER TABLE provider_connections ADD COLUMN "group"` — 列现在是基本架构的一部分（在 #373 中添加），导致每次 CI 运行时出现 `SQLITE_ERROR: 重复的列名称`。-**预提交挂钩**：将 `npm run test:unit` 添加到 `.husky/pre-commit` — 单元测试现在会在到达 CI 之前阻止损坏的提交。## [2.5.3] - 2026-03-14

> 关键错误修复：数据库架构迁移、启动环境加载、提供程序错误状态清除和 i18n 工具提示修复。每个 PR 之上的代码质量改进。### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**：将 `provider_connections.group` 列添加到基本架构 + 现有数据库的回填迁移 - 列已在所有查询中使用，但在架构定义中缺失 -**fix(i18n) #371**：用现有的 `providers.delete` 键替换不存在的 `t("deleteConnection")` 键 — 修复提供程序详细信息页面上的 `MISSING_MESSAGE:providers.deleteConnection` 运行时错误 -**修复（auth）＃372**：在真正恢复后从提供商帐户中清除过时的错误元数据（`errorCode`，`lastErrorType`，`lastErrorSource`） - 以前，恢复的帐户一直显示为失败 -**fix(startup) #369**：统一 `npm run start`、`run-standalone.mjs` 和 Electron 之间的 env 加载，以尊重 `DATA_DIR/.env → ~/.omniroute/.env → ./.env` 优先级 — 防止在现有加密数据库上生成新的 `STORAGE_ENCRYPTION_KEY`### 🔧 Code Quality

- 在“auth.ts”中记录了“result.success”与“response?.ok”模式（都是有意为之，现在进行了解释）
- 在“electron/main.js”中标准化“overridePath?.trim()”以匹配“bootstrap-env.mjs”
- 在 Electron 启动中添加了 `preferredEnv` 合并顺序注释

> Codex 帐户配额策略，具有自动轮换、快速层切换、gpt-5.4 模型和分析标签修复功能。### ✨ New Features (PRs #366, #367, #368)

-**Codex 配额政策 (PR #366)**：每个账户 5 小时/每周配额窗口在提供商仪表板中切换。当启用的窗口达到 90% 阈值时，帐户会自动跳过，并在“resetAt”后重新接纳。包括带有无副作用状态获取器的“quotaCache.ts”。-**Codex 快速层切换 (PR #367)**：仪表板 → 设置 → Codex 服务层。默认关闭切换仅针对 Codex 请求注入 `service_tier: "flex"`，从而降低了约 80% 的成本。完整堆栈：UI 选项卡 + API 端点 + 执行器 + 转换器 + 启动恢复。-**gpt-5.4 模型（PR #368）**：将 `cx/gpt-5.4` 和 `codex/gpt-5.4` 添加到 Codex 模型注册表。包括回归测试。### 🐛 Bug Fixes

-**修复#356**：分析图表（顶级提供商、按帐户、提供商细分）现在显示人类可读的提供商名称/标签，而不是 OpenAI 兼容提供商的原始内部 ID。

> 主要版本：严格随机路由策略、API 密钥访问控制、连接组、外部定价同步以及思维模型、组合测试和工具名称验证的关键错误修复。### ✨ New Features (PRs #363 & #365)

-**严格随机路由策略**：Fisher-Yates 洗牌甲板具有防重复保证和并发请求的互斥序列化。每个组合和每个提供商都有独立的套牌。-**API密钥访问控制**：`allowedConnections`（限制密钥可以使用哪些连接），`is_active`（使用403启用/禁用密钥），`accessSchedule`（基于时间的访问控制），`autoResolve`切换，通过PATCH重命名密钥。-**连接组**：按环境对提供商连接进行分组。限制页面中的手风琴视图具有本地存储持久性和智能自动切换功能。-**外部定价同步 (LiteLLM)**：3 层定价解决方案（用户覆盖→同步→默认）。通过“PRICING_SYNC_ENABLED=true”选择加入。 MCP 工具“omniroute_sync_pricing”。 23 个新测试。-**i18n**：30 种语言更新为严格随机策略、API 密钥管理字符串。 pt-BR 已完全翻译。### 🐛 Bug Fixes

-**修复 #355**：流空闲超时从 60 秒增加到 300 秒 — 防止在长时间推理阶段中止扩展思维模型（claude-opus-4-6、o3 等）。可通过“STREAM_IDLE_TIMEOUT_MS”进行配置。-**修复#350**：组合测试现在使用内部标头绕过“REQUIRE_API_KEY=true”，并普遍使用 OpenAI 兼容格式。超时时间从 15 秒延长至 20 秒。-**修复#346**：带有空 `function.name` 的工具（由 Claude Code 转发）现在会在上游提供者收到它们之前进行过滤，从而防止“无效输入[N].name：空字符串”错误。### 🗑️ Closed Issues

- **#341**: Debug section removed — replacement is `/dashboard/logs` and `/dashboard/health`.

> API Key Round-Robin support for multi-key provider setups, and confirmation of wildcard routing and quota window rolling already in place.

### ✨ New Features

-**API 密钥循环 (T07)**：提供商连接现在可以保存多个 API 密钥（编辑连接 → 额外 API 密钥）。请求通过“providerSpecificData.extraApiKeys[]”在主键和额外键之间循环轮换。键保存在内存中并为每个连接建立索引 - 无需更改数据库架构。### 📝 Already Implemented (confirmed in audit)

-**通配符模型路由（T13）**：具有 glob 样式通配符匹配（`gpt*`、`claude-?-sonnet` 等）的 `wildcardRouter.ts` 已集成到具有特异性排名的 `model.ts` 中。-**配额窗口滚动 (T08)**：`accountFallback.ts:isModelLocked()` 已经自动推进窗口 — 如果 `Date.now() > entry.until`，锁定将立即删除（没有陈旧阻塞）。

> UI 优化、路由策略添加以及针对使用限制的优雅错误处理。### ✨ New Features

-**填充优先和 P2C 路由策略**：向组合策略选择器添加了“填充优先”（继续之前耗尽配额）和“p2c”（双选择低延迟选择），并带有完整的指导面板和颜色编码徽章。-**免费堆栈预设模型**：使用免费堆栈模板创建组合现在会自动填充 7 个一流的免费提供商模型（Gemini CLI、Kiro、Qoder×2、Qwen、NVIDIA NIM、Groq）。用户只需激活提供商即可获得每月 0 美元的开箱即用组合。-**更宽的组合模式**：创建/编辑组合模式现在使用“max-w-4xl”来舒适地编辑大型组合。### 🐛 Bug Fixes

-**Codex 和 GitHub 的限制页面 HTTP 500**：当提供程序返回 401/403（过期令牌）时，`getCodexUsage()` 和 `getGitHubUsage()` 现在会返回用户友好的消息，而不是在限制页面上抛出并导致 500 错误。-**MaintenanceBanner 误报**：横幅不再在页面加载时虚假显示“服务器无法访问”。通过在挂载时立即调用“checkHealth()”并删除陈旧的“show”状态关闭来修复。-**提供程序图标工具提示**：提供程序连接行中的编辑（铅笔）和删除图标按钮现在具有本机 HTML 工具提示 - 所有 6 个操作图标现在都是自记录的。

> 来自社区问题分析、新提供商支持、令牌跟踪错误修复、模型路由和流可靠性的多项改进。### ✨ New Features

-**任务感知智能路由（T05）**：根据请求内容类型自动选择模型——编码→ deepseek-chat，分析→ Gemini-2.5-pro，视觉→ gpt-4o，摘要→ Gemini-2.5-flash。可通过“设置”进行配置。新的 `GET/PUT/POST /api/settings/task-routing` API。-**HuggingFace 提供商**：添加 HuggingFace 路由器作为与 Llama 3.1 70B/8B、Qwen 2.5 72B、Mistral 7B、Phi-3.5 Mini 兼容的 OpenAI 提供商。-**Vertex AI 提供商**：通过 Vertex 添加了包含 Gemini 2.5 Pro/Flash、Gemma 2 27B、Claude 的 Vertex AI (Google Cloud) 提供商。-**Playground 文件上传**：用于转录的音频上传、视觉模型的图像上传（按模型名称自动检测）、用于图像生成结果的内联图像渲染。-**模型选择视觉反馈**：组合选择器中已添加的模型现在显示 ✓ 绿色徽章 - 防止重复混淆。-**Qwen 兼容性（PR #352）**：更新了用户代理和 CLI 指纹设置，以实现 Qwen 提供商兼容性。-**循环状态管理（PR #349）**：增强循环逻辑以处理排除的帐户并正确维护轮换状态。-**剪贴板用户体验 (PR #360)**：强化剪贴板操作，并针对非安全上下文进行回退； Claude 工具标准化改进。### 🐛 Bug Fixes

-**修复 #302 — OpenAI SDK stream=False 删除 tool_calls**：当“body.stream”显式为“false”时，T01 接受标头协商不再强制进行流式传输。在非流模式下使用 OpenAI Python SDK 时，导致 tool_calls 被静默丢弃。-**修复 #73 — Claude Haiku 在没有提供商前缀的情况下路由到 OpenAI**：在没有提供商前缀的情况下发送的“claude-_”模型现在可以正确路由到“反重力”（人类）提供商。还添加了 `gemini-_`/`gemma-\*`→`gemini`启发式。
-**修复 #74 — Antigravity/Claude 流的令牌计数始终为 0**：携带`input_tokens`的`message_start`SSE 事件未被`extractUsage()` 解析，导致所有输入令牌计数下降。输入/输出令牌跟踪现在可以正确用于流响应。
-**修复 #180 — 模型导入重复且没有反馈**：`ModelSelectModal` 现在显示 ✓ 组合中已有模型的绿色突出显示，表明它们已被添加。-**媒体页面生成错误**：图像结果现在呈现为“<img>”标签而不是原始 JSON。转录结果显示为可读文本。凭据错误显示琥珀色横幅，而不是静默失败。-**提供商页面上的令牌刷新按钮**：为 OAuth 提供商添加了手动令牌刷新 UI。### 🔧 Improvements

-**提供商注册表**：HuggingFace 和 Vertex AI 添加到“providerRegistry.ts”和“providers.ts”（前端）。-**读取缓存**：新的 `src/lib/db/readCache.ts` 用于高效的数据库读取缓存。-**配额缓存**：通过基于 TTL 的驱逐改进了配额缓存。### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| 文件                                          | 目的                             |
| --------------------------------------------- | -------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | 任务感知路由逻辑（7 种任务类型） |
| `src/app/api/settings/task-routing/route.ts`  | 任务路由配置API                  |
| `src/app/api/providers/[id]/refresh/route.ts` | 手动 OAuth 令牌刷新              |
| `src/lib/db/readCache.ts`                     | 高效的数据库读缓存               |
| `src/shared/utils/clipboard.ts`               | 具有后备功能的硬化剪贴板         | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**组合模式：自由堆栈可见且突出**- 自由堆栈模板被隐藏（3 列网格中的第四个）。已修复：移至位置 1，切换至 2x2 网格，以便所有 4 个模板均可见，绿色边框 + 免费徽章突出显示。## [2.4.0] - 2026-03-13

> **主要版本**— Free Stack 生态系统、转录游乐场大修、超过 44 个提供商、全面的免费层文档以及全面的 UI 改进。### 功能特点

-**组合：免费堆栈模板**— 新的第四个模板“免费堆栈 ($0)”在 Kiro + Qoder + Qwen + Gemini CLI 中使用循环。建议首次使用时使用预构建的零成本组合。-**媒体/转录：默认为 Deepgram**— Deepgram（Nova 3，免费 200 美元）现在是默认转录提供商。 AssemblyAI（50 美元免费）和 Groq Whisper（永久免费）带有免费信用徽章。-**自述文件：“免费开始”部分**— 新的早期自述文件 5 步骤表显示如何在几分钟内设置零成本人工智能。-**自述文件：免费转录组合**- 新部分包含 Deepgram/AssemblyAI/Groq 组合建议和每个提供商的免费信用详细信息。-**providers.ts：hasFree 标志**— NVIDIA NIM、Cerebras 和 Groq 标记有 hasFree 徽章和提供者 UI 的 freeNote。-**i18n：templateFreeStack 键**— 免费 Stack 组合模板已翻译并同步到所有 30 种语言。## [2.3.16] - 2026-03-13

### 文档

-**自述文件：44+ 提供商**— 将所有 3 次出现的“36+ 提供商”更新为“44+”，反映实际代码库计数（providers.ts 中为 44 个提供商）-**自述文件：新部分“🆓 免费模型 — 您实际获得的内容”**— 添加了 7 个提供商表，其中包含每个模型的速率限制：Kiro（Claude 通过 AWS Builder ID 无限制）、Qoder（无限制 5 个模型）、Qwen（无限制 4 个模型）、Gemini CLI (180K/月)、NVIDIA NIM (~40 RPM dev-forever)、Cerebras (1M tok/天/60K) TPM)、Groq (30 RPM / 14.4K RPD)。包括 \/usr/bin/bash Ultimate Free Stack 组合推荐。-**自述文件：更新了定价表**— 将 Cerebras 添加到 API KEY 层，将 NVIDIA 从“1000 积分”修复为“开发人员永久免费”，更新了 Qoder/Qwen 模型数量和名称 -**自述文件：Qoder 8→5 模型**（命名为：kimi-k2-thinking、qwen3-coder-plus、deepseek-r1、minimax-m2、kimi-k2）-**自述文件：Qwen 3→4 模型**（命名为：qwen3-coder-plus、qwen3-coder-flash、qwen3-coder-next、vision-model）## [2.3.15] - 2026-03-13

### 功能特点

-**自动组合仪表板（层级优先级）**：在 `/dashboard/auto-combo` 因素细分显示中添加了 `🏷️ Tier` 作为第 7 个评分因素标签 — 所有 7 个自动组合评分因素现在都可见。-**i18n — autoCombo 部分**：为所有 30 种语言文件添加了 Auto-Combo 仪表板的 20 个新翻译键（“title”、“status”、“modePack”、“providerScores”、“factorTierPriority”等）。## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**：恢复了有效的默认 `clientSecret` — 以前是一个空字符串，导致每次连接尝试时出现“错误的客户端凭据”。公共凭证现在是默认后备（可通过“QODER_OAUTH_CLIENT_SECRET”环境变量覆盖）。-**未找到 MITM 服务器 (#335)**：`prepublish.mjs` 现在使用 `tsc` 将 `src/mitm/*.ts` 编译为 JavaScript，然后再复制到 npm 包。以前只复制原始的“.ts”文件——这意味着“server.js”在 npm/Volta 全局安装中从来不存在。-**GeminiCLI 缺少 projectId (#338)**：当存储的凭据中缺少“projectId”时（例如，在 Docker 重新启动后），OmniRoute 现在会记录警告并尝试请求，而不是抛出硬 500 错误 - 返回有意义的提供程序端错误，而不是 OmniRoute 崩溃。-**Electron 版本不匹配 (#323)**：将 ` Electron/package.json` 版本同步到 `2.3.13` （是 `2.0.13`），因此桌面二进制版本与 npm 包匹配。### ✨ New Models (#334)

-**Kiro**：`claude-sonnet-4`、`claude-opus-4.6`、`deepseek-v3.2`、`minimax-m2.1`、`qwen3-coder-next`、`auto` -**法典**：`gpt5.4`### 🔧 Improvements

-**等级评分（API + 验证）**：将“tierPriority”（权重“0.05”）添加到“ScoringWeights” Zod 模式和“combos/auto” API 路径 - 第 7 个评分因素现在已被 REST API 完全接受，并在输入时进行验证。 “稳定性”权重从“0.10”调整为“0.05”，以保持总和=“1.0”。### ✨ New Features

-**分层配额评分（自动组合）**：添加了“tierPriority”作为第七个评分因素 - 当其他因素相同时，具有 Ultra/Pro 级别的帐户现在优先于免费级别。 “ProviderCandidate”上的新可选字段“accountTier”和“quotaResetIntervalSecs”。所有 4 个模式包均已更新（“快速发货”、“成本节约”、“质量第一”、“离线友好”）。-**系列内模型回退 (T5)**：当模型不可用 (404/400/403) 时，OmniRoute 现在会在返回错误之前自动回退到同一系列的兄弟模型 (`modelFamilyFallback.ts`)。-**可配置的 API 桥超时**：“API_BRIDGE_PROXY_TIMEOUT_MS”环境变量允许操作员调整代理超时（默认 30 秒）。修复了上游响应缓慢时出现的 504 错误。 （＃332）-**Star History**：在所有 30 个自述文件中用 starart.cc (`?variant=adaptive`) 替换了 star-history.com 小部件 — 适应浅色/深色主题，实时更新。### 🐛 Bug Fixes

-**身份验证 — 首次密码**：设置第一个仪表板密码时现在接受 `INITIAL_PASSWORD` env var。使用“timingSafeEqual”进行恒定时间比较，防止定时攻击。 （＃333）-**README 截断**：修复了“故障排除”部分中缺少的“</details>”结束标记，该标记导致 GitHub 停止呈现其下方的所有内容（技术堆栈、文档、路线图、贡献者）。-**pnpm install**：从与直接依赖项冲突的“package.json”中删除了多余的“@swc/helpers”覆盖，导致 pnpm 上出现“EOVERRIDE”错误。添加了“pnpm.onlyBuiltDependency”配置。-**CLI 路径注入 (T12)**：在 `cliRuntime.ts` 中添加了 `isSafePath()` 验证器，以阻止 `CLI_*_BIN` 环境变量中的路径遍历和 shell 元字符。-**CI**：覆盖删除后重新生成 `package-lock.json` 以修复 GitHub Actions 上的 `npm ci` 失败。### 🔧 Improvements

-**响应格式 (T1)**：`response_format` (json_schema/json_object) 现在作为 Claude 的系统提示注入，从而实现结构化输出兼容性。-**429 重试 (T2)**：在回退到下一个 URL 之前，URL 内重试 429 次响应（2 次尝试，延迟 2 秒）。-**Gemini CLI 标头 (T3)**：添加了 `User-Agent` 和 `X-Goog-Api-Client` 指纹标头，以实现 Gemini CLI 兼容性。-**定价目录 (T9)**：添加了“deepseek-3.1”、“deepseek-3.2”和“qwen3-coder-next”定价条目。### 📁 New Files

| 文件                                       | 目的                     |
| ------------------------------------------ | ------------------------ | --------- |
| `open-sse/services/modelFamilyFallback.ts` | 模型族定义和族内后备逻辑 | ### Fixed |

-**KiloCode**：kilocode 健康检查超时已在 v2.3.11 中修复 -**OpenCode**：将 opencode 添加到 cliRuntime 注册表，并设置 15 秒健康检查超时 -**OpenClaw / Cursor**：将慢启动变体的健康检查超时时间增加到 15 秒 -**VPS**：安装 droid 和 openclaw npm 软件包；为 kiro-cli 激活 CLI_EXTRA_PATHS -**cliRuntime**：添加开放代码工具注册并增加继续超时## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**：将“healthcheckTimeoutMs”从 4000 毫秒增加到 15000 毫秒 — kilocode 在启动时呈现 ASCII 徽标横幅，导致在慢速/冷启动环境中出现错误的“healthcheck_failed”## [2.3.10] - 2026-03-12

### Fixed

-**Lint**：修复 `check:any-budget:t11` 失败 — 将 OAuthModal.tsx 中的 `as any` 替换为 `as Record<string,known>` （出现 3 次）### Docs

-**CLI-TOOLS.md**：所有 11 个 CLI 工具的完整指南（claude、codex、gemini、opencode、cline、kilocode、 continue、kiro-cli、cursor、droid、openclaw）-**i18n**：CLI-TOOLS.md 同步到 30 种语言，并带有翻译的标题 + 简介## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**：新的旧版 OpenAI 完成端点 — 接受“prompt”字符串和“messages”数组，自动标准化为聊天格式 -**EndpointPage**：现在显示所有 3 种与 OpenAI 兼容的端点类型：聊天完成、响应 API 和旧版完成 -**i18n**：将 `completionsLegacy/completionsLegacyDesc` 添加到 30 种语言文件### Fixed

-**OAuthModal**：修复所有 OAuth 连接错误上显示的“[object Object]” — 在所有 3 个“抛出新错误（data.error）”调用（交换、设备代码、授权）中从错误响应对象中正确提取“.message”

- 影响 Cline、Codex、GitHub、Qwen、Kiro 和所有其他 OAuth 提供商## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**：在 base64 解码之前添加 `decodeURIComponent`，以便正确解析来自回调 URL 的 URL 编码的授权代码，修复远程 (LAN IP) 设置上的“无效或过期的授权代码”错误 -**Cline OAuth**：`mapTokens` 现在填充 `name = firstName + lastName || email`，以便 Cline 帐户显示真实用户名而不是“帐户#ID” -**OAuth 帐户名称**：所有 OAuth 交换流（交换、轮询、轮询回调）现在在名称缺失时标准化“名称 = 电子邮件”，因此每个 OAuth 帐户都会将其电子邮件显示为提供商仪表板中的显示标签 -**OAuth 帐户名称**：删除了“db/providers.ts”中的顺序“帐户 N”后备 — 没有电子邮件/名称的帐户现在通过“getAccountDisplayName()”使用基于 ID 的稳定标签，而不是删除帐户时会更改的序列号## [2.3.6] - 2026-03-12

### Fixed

-**提供商测试批次**：修复了 Zod 架构以接受 `providerId: null`（前端为非提供商模式发送 null）；为所有批量测试错误地返回“无效请求” -**提供程序测试模式**：通过在“setTestResults”和“ProviderTestResultsView”中渲染之前将 API 错误对象标准化为字符串来修复“[object Object]”显示 -**i18n**：添加了缺失的键 `cliTools.toolDescriptions.opencode`、`cliTools.toolDescriptions.kiro`、`cliTools.guides.opencode`、`cliTools.guides.kiro` 到 `en.json` -**i18n**：使用英语值作为后备，同步所有 29 个非英语语言文件中的 1111 个缺失键## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**：添加了永久性的“postinstall”修复，以将“@swc/helpers”复制到独立应用程序的“node_modules”中 - 防止全局 npm 安装时 MODULE_NOT_FOUND 崩溃## [2.3.4] - 2026-03-10

### Added

- 多个提供商集成和仪表板改进
