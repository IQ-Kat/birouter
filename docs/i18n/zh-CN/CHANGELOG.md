# 更新日志

🌐 **语言:** 🇺🇸 [English](../../../CHANGELOG.md) | 🇧🇷 [Português (Brasil)](../pt-BR/CHANGELOG.md) | 🇪🇸 [Español](../es/CHANGELOG.md) | 🇫🇷 [Français](../fr/CHANGELOG.md) | 🇮🇹 [Italiano](../it/CHANGELOG.md) | 🇷🇺 [Русский](../ru/CHANGELOG.md) | 🇨🇳 [中文 (简体)](../zh-CN/CHANGELOG.md) | 🇩🇪 [Deutsch](../de/CHANGELOG.md) | 🇮🇳 [हिन्दी](../in/CHANGELOG.md) | 🇹🇭 [ไทย](../th/CHANGELOG.md) | 🇺🇦 [Українська](../uk-UA/CHANGELOG.md) | 🇸🇦 [العربية](../ar/CHANGELOG.md) | 🇯🇵 [日本語](../ja/CHANGELOG.md) | 🇻🇳 [Tiếng Việt](../vi/CHANGELOG.md) | 🇧🇬 [Български](../bg/CHANGELOG.md) | 🇩🇰 [Dansk](../da/CHANGELOG.md) | 🇫🇮 [Suomi](../fi/CHANGELOG.md) | 🇮🇱 [עברית](../he/CHANGELOG.md) | 🇭🇺 [Magyar](../hu/CHANGELOG.md) | 🇮🇩 [Bahasa Indonesia](../id/CHANGELOG.md) | 🇰🇷 [한국어](../ko/CHANGELOG.md) | 🇲🇾 [Bahasa Melayu](../ms/CHANGELOG.md) | 🇳🇱 [Nederlands](../nl/CHANGELOG.md) | 🇳🇴 [Norsk](../no/CHANGELOG.md) | 🇵🇹 [Português (Portugal)](../pt/CHANGELOG.md) | 🇷🇴 [Română](../ro/CHANGELOG.md) | 🇵🇱 [Polski](../pl/CHANGELOG.md) | 🇸🇰 [Slovenčina](../sk/CHANGELOG.md) | 🇸🇪 [Svenska](../sv/CHANGELOG.md) | 🇵🇭 [Filipino](../phi/CHANGELOG.md) | 🇨🇿 [Čeština](../cs/CHANGELOG.md)

---

## [未发布]

> [!WARNING]
> **破坏性变更：请求日志、保留策略以及日志环境变量已经重新设计。**
> 升级后的首次启动时，OmniRoute 会将 `DATA_DIR/logs/`、旧版 `DATA_DIR/call_logs/` 以及 `DATA_DIR/log.txt` 中的历史请求日志归档到 `DATA_DIR/log_archives/*.zip`，随后移除旧布局并切换到 `DATA_DIR/call_logs/` 下新的统一 artifact 格式。

### ✨ 新特性

- **统一请求日志 Artifact：** 请求日志现在会在 `DATA_DIR/call_logs/` 下为每个请求保存一条 SQLite 索引记录和一个 JSON artifact，并可将可选的流水线捕获内容嵌入同一文件。
- **语言：** 改进了中文翻译（#855）
- **Opencode-Zen Models：** 为 opencode-zen 注册表新增了 4 个免费模型（#854）
- **测试：** 为设置开关和 bug 修复新增了单元测试与 E2E 测试（#850）

### 🐛 Bug 修复

- **429 配额解析：** 从错误响应体中解析较长的配额重置时间，以便应用正确的回退等待，避免因限流导致账户被封（#859）
- **提示词缓存：** 为所有 Claude 协议提供商（如 Minimax、GLM、Bailian）保留客户端 `cache_control` 头，正确识别缓存能力（#856）
- **模型同步日志：** 仅在 `sync-models` 通道确实修改列表时记录日志，减少日志噪声（#853）
- **提供商配额与 token 解析：** 将 Antigravity 限额逻辑切换为原生使用 `retrieveUserQuota`，并正确将 Claude token 刷新负载映射为 URL-encoded 表单（#862）
- **限流稳定性：** 将 429 `Retry-After` 的解析架构统一化，把提供商导致的冷却时间上限限制为 24 小时（#862）
- **Dashboard 限额渲染：** 重构 `/dashboard/limits` 的配额映射逻辑，使其可在 chunk 内立即渲染，修复当账户超过 70 个活跃连接时 UI 严重卡顿的问题（#784）

### ⚠️ 破坏性变更

- **请求日志布局：** 移除了旧的多文件 `DATA_DIR/logs/` 请求日志会话目录和 `DATA_DIR/log.txt` 汇总文件。新请求会以单个 JSON artifact 的形式写入 `DATA_DIR/call_logs/YYYY-MM-DD/`。
- **日志环境变量：** 用新的 `APP_LOG_*` 与 `CALL_LOG_RETENTION_DAYS` 配置模型，替换了 `LOG_*`、`ENABLE_REQUEST_LOGS`、`CALL_LOGS_MAX`、`CALL_LOG_PAYLOAD_MODE` 和 `PROXY_LOG_MAX_ENTRIES`。
- **流水线开关设置：** 用 `call_log_pipeline_enabled` 取代旧的 `detailed_logs_enabled`。新的流水线详情会直接嵌入请求 artifact 中，而不再以单独的 `request_detail_logs` 记录保存。

### 🛠️ 维护

- **旧请求日志升级备份：** 升级时会先将旧的 `data/logs/`、旧版 `data/call_logs/` 和 `data/log.txt` 归档到 `DATA_DIR/log_archives/*.zip`，再删除已废弃的结构。
- **流式用量持久化：** 流式请求完成后现在只会写入一条 `usage_history` 记录，不再额外写入带空状态元数据的重复 in-progress 记录。

---

## [3.3.11] - 2026-03-31

### 🚀 新特性

- **订阅使用率分析：** 新增配额快照时间序列跟踪、Provider Utilization 和 Combo Health 标签页，并接入相应的 recharts 可视化与 API 端点（#847）
- **SQLite 备份控制：** 新增 `OMNIROUTE_DISABLE_AUTO_BACKUP` 环境变量，用于禁用自动 SQLite 备份（#846）
- **模型注册表更新：** 将 `gpt-5.4-mini` 注入到 Codex 提供商的模型数组中（#756）
- **提供商限额跟踪：** 跟踪并展示每个账户的 provider rate limit 最后刷新时间（#843）

### 🐛 Bug 修复

- **Qwen 认证路由：** 将 Qwen OAuth completions 从 DashScope API 重新路由到 Web Inference API（`chat.qwen.ai`），修复认证失败问题（#844、#807、#832）
- **Qwen 自动重试循环：** 在 `chatCore` 中加入针对 429 Quota Exceeded 的定向回退处理，保护突发请求
- **Codex OAuth 回退：** 现代浏览器的弹窗拦截不再让用户卡死，现已自动回退为手动 URL 输入（#808）
- **Claude token 刷新：** 在生成 token 时遵守 Anthropic 严格的 `application/json` 边界，而不再错误使用 URL 编码（#836）
- **Codex messages Schema：** 从原生透传请求中移除过于严格的 `messages` 注入，避免被 ChatGPT 上游以结构错误拒绝（#806）
- **CLI 检测体积限制：** 将 Node 二进制扫描上限从 100MB 安全提升到 350MB，使 Claude Code（229MB）和 OpenCode（153MB）等大型独立工具可在 VPS 运行时中被正确检测（#809）
- **CLI 运行时环境：** 恢复 CLI 配置对用户覆盖路径（`CLI_{PROVIDER}_BIN`）的支持，不再被严格的路径发现规则阻断
- **Nvidia 头部冲突：** 调用非 Anthropic 提供商时移除上游头中的 `prompt_cache_key` 字段（#848）
- **Codex Fast 档位开关：** 恢复 Codex service tier 开关在浅色模式下的对比度（#842）
- **测试基础设施：** 更新 `t28-model-catalog-updates` 测试，修复其仍错误期望旧 DashScope 端点的问题

---

## [3.3.9] - 2026-03-31

### 🐛 Bug 修复

- **自定义服务商轮换：** 在 DefaultExecutor 内部集成了 `getRotatingApiKey`，确保自定义和兼容的上游服务商的 `extraApiKeys` 轮换正确触发 (#815)

---

## [3.3.8] - 2026-03-30

### 🚀 新特性

- **Models API 过滤：** 端点 `/v1/models` 现在根据绑定到 `Authorization: Bearer <token>` 的权限动态过滤其列表（当启用访问限制时） (#781)
- **Qoder 集成：** 原生集成 Qoder AI，原生替换传统的 iFlow 平台映射 (#660)
- **提示词缓存追踪：** 添加了追踪功能和前端可视化（统计卡片），用于仪表盘界面中的语义和提示词缓存

### 🐛 Bug 修复

- **缓存仪表盘大小：** 改进了高级缓存页面的界面布局大小和上下文标题 (#835)
- **调试侧边栏可见性：** 修复了一个问题：调试开关无法正确显示/隐藏侧边栏调试详情 (#834)
- **Gemini 模型前缀：** 修改了命名空间回退，以通过 `gemini-cli/` 而不是 `gc/` 正确路由，从而遵守上游规范 (#831)
- **OpenRouter 同步：** 改进了兼容性同步，以正确地自动从 OpenRouter 获取可用模型目录 (#830)
- **流式传输负载映射：** 当输出流式传输到边缘设备时，推理字段的重新序列化可原生解决冲突别名路径

---

## [3.3.7] - 2026-03-30

### 🐛 Bug 修复

- **OpenCode 配置：** 重构生成的 `opencode.json`，使用 `@ai-sdk/openai-compatible` 基于记录的架构，将 `options` 和 `models` 作为对象映射而不是扁平数组，修复了配置验证失败的问题 (#816)
- **i18n 缺失键：** 在所有 30 个语言文件中添加了缺失的 `cloudflaredUrlNotice` 翻译键，以防止 Endpoint 页面中的 `MISSING_MESSAGE` 控制台错误 (#823)

---

## [3.3.6] - 2026-03-30

### 🐛 Bug 修复

- **Token 计费：** 在历史用量输入计算中安全地包含了提示词缓存 token，以实现正确的配额扣除 (PR #822)
- **Combo 测试探针：** 通过解析仅推理响应并通过 Promise.all 实现大规模并行化，修复了 combo 测试逻辑的误报问题 (PR #828)
- **Docker 快速隧道：** 在基础运行时容器中嵌入了所需的 ca-certificates 以解决 Cloudflared TLS 启动失败，并显示 stdout 网络错误以替换通用退出代码 (PR #829)

---

## [3.3.5] - 2026-03-30

### ✨ 新特性

- **Gemini 配额追踪：** 通过 `retrieveUserQuota` API 添加了实时 Gemini CLI 配额追踪 (PR #825)
- **缓存仪表盘：** 增强了缓存仪表盘，可显示提示词缓存指标、24小时趋势和预估成本节省 (PR #824)

### 🐛 Bug 修复

- **用户体验：** 移除了在空白服务商详情页面上侵入性的自动打开 OAuth 模态框循环 (PR #820)
- **依赖更新：** 更新并锁定了开发和生产依赖树，包括 Next.js 16.2.1、Recharts 和 TailwindCSS 4.2.2 (PR #826, #827)

---

## [3.3.4] - 2026-03-30

### ✨ 新特性

- **A2A 工作流：** 添加了用于多步骤代理工作流的确定性 FSM 编排器
- **优雅降级：** 添加了新的多层回退框架，以在部分系统故障期间保持核心功能
- **配置审计：** 添加了带 diff 检测的审计追踪，以追踪变更并启用配置回滚
- **服务商健康状态：** 添加了服务商过期追踪，并为即将过期的 API 密钥提供主动 UI 警报
- **自适应路由：** 添加了自适应流量和复杂度检测器，可根据负载动态覆盖路由策略
- **服务商多样性：** 通过香农熵实现了服务商多样性评分，以改善负载分配
- **自动禁用边界：** 在弹性仪表盘中添加了自动禁用被封禁账户的设置开关

### 🐛 Bug 修复

- **Codex 和 Claude 兼容性：** 修复了 UI 回退，修补了 Codex 非流式传输集成问题，并解决了 Windows 上的 CLI 运行时检测问题
- **发布自动化：** 扩展了 GitHub Actions 中 Electron App 构建所需的权限
- **Cloudflare 运行时：** 处理了 Cloudflared 隧道组件的正确运行时隔离退出代码

### 🧪 测试

- **测试套件更新：** 扩展了流量检测器、服务商多样性、配置审计和 FSM 的测试覆盖率

---

## [3.3.3] - 2026-03-29

### 🐛 Bug 修复

- **CI/CD 可靠性：** 修补了 GitHub Actions 使用稳定的依赖版本（`actions/checkout@v4`、`actions/upload-artifact@v4`），以缓解未公告的构建环境弃用问题。
- **图片回退：** 替换了 `ProviderIcon.tsx` 中的任意回退链，改用显式资源验证来防止 UI 加载不存在文件的 `<Image>` 组件，从而消除仪表盘控制台日志中的 `404` 错误（#745）。
- **管理员更新器：** 为仪表盘更新器添加了动态源安装检测。当 OmniRoute 是本地构建而非通过 npm 安装时，安全地禁用 `立即更新` 按钮，并提示使用 `git pull`（#743）。
- **更新 ERESOLVE 错误：** 在内部自动更新脚本中注入了 `package.json` 覆盖配置（用于 `react`/`react-dom`）并启用了 `--legacy-peer-deps`，以解决与 `@lobehub/ui` 的破坏性依赖树冲突。

---

## [3.3.2] - 2026-03-29

### ✨ 新特性

- **Cloudflare Tunnels:** Cloudflare Quick Tunnel 集成，带有仪表盘控制功能（PR #772）。
- **Diagnostics:** 为组合实时测试添加了语义缓存绕过功能（PR #773）。

### 🐛 Bug 修复

- **Streaming Stability:** 将 `FETCH_TIMEOUT_MS` 应用于流式请求的初始 `fetch()` 调用，以防止 300 秒 Node.js TCP 超时导致的静默任务失败（#769）。
- **i18n:** 在所有 33 个语言文件的 `toolDescriptions` 中添加了缺失的 `windsurf` 和 `copilot` 条目（#748）。
- **GLM Coding Audit:** 完成了服务商审计，修复了 ReDoS 漏洞、上下文窗口大小（128k/16k）以及模型注册表同步（PR #778）。

---

## [3.3.1] - 2026-03-29

### 🐛 Bug 修复

- **OpenAI Codex:** 修复了回退处理中 `type: "text"` 元素携带 null 或空数据集导致 400 拒绝的问题（#742）。
- **Opencode:** 更新架构对齐，使用单数 `provider` 以匹配官方规范（#774）。
- **Gemini CLI:** 注入缺失的终端用户配额头，防止 403 授权锁定（#775）。
- **DB Recovery:** 将多部分负载导入重构为原始二进制缓冲数组，以绕过反向代理的最大正文限制（#770）。

---

## [3.3.0] - 2026-03-29

### ✨ 增强与重构

- **Release Stabilization** — 完成了 v3.2.9 版本发布（组合诊断、质量检测、Gemini 工具修复）并创建了缺失的 git 标签。将所有暂存的更改整合到单个原子发布提交中。

### 🐛 Bug 修复

- **Auto-Update Test** — 修复了 `buildDockerComposeUpdateScript` 测试断言，以匹配生成的部署脚本中未展开的 shell 变量引用（`$TARGET_TAG`、`${TARGET_TAG#v}`），与 v3.2.8 的重构模板对齐。
- **Circuit Breaker Test** — 通过注入 `maxRetries: 0` 强化了 `combo-circuit-breaker.test.mjs`，以防止在断路器状态转换期间重试膨胀扭曲失败计数断言。

---

## [3.2.9] - 2026-03-29

### ✨ 增强与重构

- **Combo Diagnostics** — 引入了实时测试绕过标志（`forceLiveComboTest`），允许管理员执行真实的上游健康检查，绕过所有本地断路器和冷却状态机制，在滚动中断期间实现精确诊断（PR #759）
- **Quality Gates** — 添加了组合的自动响应质量验证，并正式将 `claude-4.6` 模型支持集成到核心路由架构中（PR #762）

### 🐛 Bug 修复

- **Tool Definition Validation** — 通过标准化工具定义中的枚举类型修复了 Gemini API 集成，防止上游 HTTP 400 参数错误（PR #760）

---

## [3.2.8] - 2026-03-29

### ✨ 增强与重构

- **Docker Auto-Update UI** — 集成了后台独立更新进程，用于 Docker Compose 部署。Dashboard UI 现在可以无缝跟踪更新生命周期事件，结合 JSON REST 响应和 SSE 流式传输进度覆盖层，实现强大的跨环境可靠性。
- **Cache Analytics** — 修复了零指标可视化映射问题，将 Semantic Cache 遥测日志直接迁移到集中追踪 SQLite 模块中。

### 🐛 Bug 修复

- **Authentication Logic** — 修复了在禁用 `requireLogin` 时保存仪表板设置或添加模型失败并返回 401 Unauthorized 错误的问题。API 端点现在正确评估全局认证开关。通过重新激活 `src/middleware.ts` 解决了全局重定向问题。
- **CLI Tool Detection (Windows)** — 通过正确捕获 `cross-spawn` ENOENT 错误，防止 CLI 环境检测期间的致命初始化异常。添加了 `\AppData\Local\droid\droid.exe` 的显式检测路径。
- **Codex Native Passthrough** — 规范化模型翻译参数以防止代理透传模式下的上下文污染，对所有 Codex 发起的请求显式强制执行通用的 `store: false` 约束。
- **SSE Token Reporting** — 规范化服务商工具调用块的 `finish_reason` 检测，修复了缺少严格 `<DONE>` 指示符的纯流式响应导致使用率分析为 0% 的问题。
- **DeepSeek <think> Tags** — 在 `responsesHandler.ts` 中实现了显式的 `<think>` 提取映射，确保 DeepSeek 推理流能等价映射到原生 Anthropic `<thinking>` 结构。

---

## [3.2.7] - 2026-03-29

### 修复

- **Seamless UI Updates**：Dashboard 上的"立即更新"功能现在使用 Server-Sent Events (SSE) 提供实时透明反馈。它可靠地执行包安装、原生模块重建（better-sqlite3）和 PM2 重启，同时显示实时加载器而不是静默挂起。

---

## [3.2.6] — 2026-03-29

### ✨ 增强与重构

- **API Key Reveal (#740)** — 在 API Manager 中添加了范围限定的 API 密钥复制流程，受 `ALLOW_API_KEY_REVEAL` 环境变量保护。
- **Sidebar Visibility Controls (#739)** — 管理员现在可以通过外观设置隐藏任何侧边栏导航链接，以减少视觉杂乱。
- **Strict Combo Testing (#735)** — 加固了 combo 健康检查端点，要求模型返回实时文本响应，而不仅仅是软可达性信号。
- **Streamed Detailed Logs (#734)** — 将 SSE 流的详细请求日志切换为重建最终负载，节省了大量 SQLite 数据库空间并显著清理了 UI。

### 🐛 Bug 修复

- **OpenCode Go MiniMax Auth (#733)** — 修正了 OpenCode Go 中 `minimax` 模型的认证头逻辑，在 `/messages` 协议中使用 `x-api-key` 而不是标准 bearer token。

---

## [3.2.5] — 2026-03-29

### ✨ 增强与重构

- **Void Linux Deployment Support (#732)** — 集成了 `xbps-src` 打包模板和说明，通过交叉编译目标原生编译和安装带有 `better-sqlite3` 绑定的 OmniRoute。

## [3.2.4] — 2026-03-29

### ✨ 增强与重构

- **Qoder AI Migration (#660)** — 完全将传统的 `iFlow` 核心服务商迁移到 `Qoder AI`，保持稳定的 API 路由能力。

### 🐛 Bug 修复

- **Gemini Tools HTTP 400 Payload Invalid Argument (#731)** — 阻止标准 Gemini `functionCall` 序列中注入 `thoughtSignature` 数组，从而避免 agentic routing 流程被阻塞。

---

## [3.2.3] — 2026-03-29

### ✨ 增强与重构

- **Provider Limits Quota UI (#728)** — 统一了 Limits 界面中的配额限制逻辑和数据标注。

### 🐛 Bug 修复

- **Core Routing Schemas & Leaks** — 扩展了 `comboStrategySchema`，原生支持 `fill-first` 和 `p2c` 策略，解除复杂 combo 编辑的阻塞。
- **Thinking Tags Extraction (CLI)** — 重构了 CLI token 响应清理的正则逻辑，可在流中正确捕获模型推理结构，避免损坏的 `<thinking>` 提取影响响应文本输出格式。
- **Strict Format Enforcements** — 强化了流水线清理执行逻辑，使其能够统一应用到 translation mode 的目标格式上。

---

## [3.2.2] — 2026-03-29

### ✨ 新特性

- **Four-Stage Request Log Pipeline (#705)** — 重构了日志持久化逻辑，可在四个不同流水线阶段保存完整负载：Client Request、Translated Provider Request、Provider Response 和 Translated Client Response。同时引入了 `streamPayloadCollector`，用于更稳健的 SSE 流截断和负载序列化。

### 🐛 Bug 修复

- **Mobile UI Fixes (#659)** — 通过为 `DashboardLayout` 添加正确的水平滚动和溢出约束，避免 dashboard 中的表格组件在窄视口下破坏布局。
- **Claude Prompt Cache Fixes (#708)** — 确保 Claude-to-Claude 回退循环中的 `cache_control` 块被完整保留，并安全地传回 Anthropic 模型。
- **Gemini Tool Definitions (#725)** — 修复 Gemini function calling 在声明简单 `object` 参数类型时出现的 schema 翻译错误。

## [3.2.1] — 2026-03-29

### ✨ 新特性

- **Global Fallback Provider (#689)** — 当所有 combo 模型都已耗尽（502/503）时，OmniRoute 现在会在返回错误之前尝试一个可配置的全局回退模型。可在 settings 中设置 `globalFallbackModel` 以启用此功能。

### 🐛 Bug 修复

- **Fix #721** — 修复 tool-call 响应期间绕过 context pinning 的问题。非流式标记使用了错误的 JSON 路径（`json.messages` → `json.choices[0].message`）。流式注入现在会在仅包含 tool-call 的流中的 `finish_reason` chunk 上触发。`injectModelTag()` 现在也会为非字符串内容追加合成的 pin 消息。
- **Fix #709** — 确认已在 v3.1.9 中修复：`system-info.mjs` 现在会递归创建目录。问题已关闭。
- **Fix #707** — 确认已在 v3.1.9 中修复：`chatCore.ts` 中的空工具名清理。问题已关闭。

### 🧪 测试

- 添加了 6 个 unit tests，用于覆盖带 tool-call 响应的 context pinning 场景（null content、array content、roundtrip、re-injection）。

## [3.2.0] — 2026-03-28

### ✨ 新特性

- **Cache Management UI** — 在 `/dashboard/cache` 新增专用的 semantic cache dashboard，支持定向 API 失效和 31 种语言的 i18n（PR #701 by @oyi77）。
- **GLM Quota Tracking** — 为 GLM Coding（Z.AI）提供商新增实时 usage 和 session 配额跟踪（PR #698 by @christopher-s）。
- **Detailed Log Payloads** — 将完整的四阶段流水线负载捕获（original、translated、provider-response、streamed-deltas）直接接入 UI（PR #705 by @rdself）。

### 🐛 Bug 修复

- **Fix #708** — 在 Claude-to-Claude passthrough 过程中正确保留原生 `cache_control` 头，防止通过 OmniRoute 路由的 Claude Code 用户发生 token 泄漏（PR #708 by @tombii）。
- **Fix #719** — 为 `ModelSyncScheduler` 建立内部认证边界，防止未认证守护进程在启动时失败（PR #719 by @rdself）。
- **Fix #718** — 重建 Provider Limits UI 中的 badge 渲染，避免错误的配额边界重叠（PR #718 by @rdself）。
- **Fix #704** — 修复 Combo Fallbacks 在 HTTP 400 content-policy 错误下失效、导致模型轮转路由卡死的问题（PR #704 by @rdself）。

### 🔒 安全与依赖

- 将 `path-to-regexp` 升级到 `8.4.0`，以修复 dependabot 报告的漏洞（PR #715）。

## [3.1.10] — 2026-03-28

### 🐛 Bug 修复

- **Fix #706** — 通过对 `.material-symbols-outlined` 应用 `!important`，修复了由 Tailwind V4 `font-sans` 覆盖导致的图标回退渲染问题。
- **Fix #703** — 通过为任何使用 `apiFormat: "responses"` 的自定义模型启用 `responses` → `openai` 格式翻译，修复 GitHub Copilot 流损坏的问题。
- **Fix #702** — 用准确的数据库定价计算替换 flat-rate usage 跟踪，适用于流式和非流式响应。
- **Fix #716** — 清理 Claude tool-call 翻译状态，正确解析流式参数，并防止 OpenAI `tool_calls` chunk 重复 `id` 字段。

## [3.1.9] — 2026-03-28

### ✨ 新特性

- **Schema Coercion** — 自动将字符串编码的数字型 JSON Schema 约束（例如 `"minimum": "1"`）强制转换为正确类型，防止 Cursor、Cline 等客户端发送畸形工具 schema 时触发 400 错误。
- **Tool Description Sanitization** — 确保工具描述始终为字符串；在发送给提供商之前，会把 `null`、`undefined` 或数字型描述转换为空字符串。
- **Clear All Models Button** — 为 “Clear All Models” 提供商操作补齐全部 30 种语言的 i18n 翻译。
- **Codex Auth Export** — 新增 Codex `auth.json` 导出和 apply-local 按钮，以实现无缝 CLI 集成。
- **Windsurf BYOK Notes** — 在 Windsurf CLI 工具卡片中补充官方限制说明，记录 BYOK 约束。

### 🐛 Bug 修复

- **Fix #709** — `system-info.mjs` 在输出目录不存在时不再崩溃（新增带 recursive 标志的 `mkdirSync`）。
- **Fix #710** — A2A `TaskManager` 单例现在使用 `globalThis`，以防止开发模式下 Next.js API 路由重新编译时发生状态泄漏。E2E 测试套件也已更新，可优雅处理 401。
- **Fix #711** — 为上游请求新增提供商级别的 `max_tokens` 上限强制限制。
- **Fix #605 / #592** — 在非流式 Claude 响应中去除工具名称的 `proxy_` 前缀；同时修复 LongCat 验证 URL。
- **Call Logs Max Cap** — 升级 `getMaxCallLogs()`，增加缓存层、环境变量支持（`CALL_LOGS_MAX`）以及数据库设置集成。

### 🧪 测试

- 测试套件从 964 扩展到 1027 个测试（新增 63 个）。
- 添加了 `schema-coercion.test.mjs` —— 9 个测试，用于验证数字字段强制转换和工具描述清理。
- 添加了 `t40-opencode-cli-tools-integration.test.mjs` —— OpenCode/Windsurf CLI 集成测试。
- 使用全面的覆盖率工具增强了 feature-tests 分支。

### 📁 新增文件

| 文件                                                     | 目的                                                  |
| -------------------------------------------------------- | ----------------------------------------------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Schema coercion 和 tool description sanitization 工具 |
| `tests/unit/schema-coercion.test.mjs`                    | 用于 schema coercion 的单元测试                       |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | CLI 工具集成测试                                      |
| `COVERAGE_PLAN.md`                                       | 测试覆盖率规划文档                                    |

### 🐛 Bug 修复

- **Claude Prompt Caching Passthrough** — 修复了 Claude passthrough 模式（Claude → OmniRoute → Claude）下 `cache_control` 标记被移除的问题；此前这会导致 Claude Code 用户比直连更快地耗尽 Anthropic API 配额，速度高出 5-10 倍。现在，当 `sourceFormat` 和 `targetFormat` 都是 Claude 时，OmniRoute 会保留客户端的 `cache_control` 标记，确保 prompt caching 正常工作，并显著降低 token 消耗。

## [3.1.8] - 2026-03-27

### 🐛 Bug 修复与新特性

- **Platform Core:** 为 Hidden Models 和 Combos 实现全局状态处理，防止它们污染目录或泄漏到已连接的 MCP agents 中（#681）。
- **Stability:** 修补了与原生 Antigravity 提供商集成相关的流式崩溃问题，其根因是未处理的 undefined 状态数组（#684）。
- **Localization Sync:** 部署了全新重构的 `i18n` 同步器，可检测缺失的嵌套 JSON 属性，并按顺序为 30 个 locale 回填内容（#685）。

## [3.1.7] - 2026-03-27

### 🐛 Bug 修复

- **Streaming Stability:** 修复了 `hasValuableContent` 在 SSE 流中的空 chunk 上返回 `undefined` 的问题（#676）。
- **Tool Calling:** 修复 `sseParser.ts` 中的一个问题：非流式 Claude 响应在包含多个工具调用时，会因错误的基于索引去重而丢失后续工具调用的 `id`（#671）。

---

## [3.1.6] — 2026-03-27

### 🐛 Bug 修复

- **Claude Native Tool Name Restoration** — 像 `TodoWrite` 这样的工具名称在 Claude passthrough 响应中不再被加上 `proxy_` 前缀（适用于流式和非流式）。包含对应的单元测试覆盖（PR #663 by @coobabm）。
- **Clear All Models Alias Cleanup** — “Clear All Models” 按钮现在也会移除关联的模型 alias，防止 UI 中出现幽灵模型（PR #664 by @rdself）。

---

## [3.1.5] — 2026-03-27

### 🐛 Bug 修复

- **Backoff Auto-Decay** — 当冷却窗口到期时，受速率限制的账户现在会自动恢复，修复了高 `backoffLevel` 会永久降低账户优先级的死锁问题（PR #657 by @brendandebeasi）。

### 🌍 i18n

- **Chinese translation overhaul** — 对 `zh-CN.json` 进行了全面重写，提高了翻译准确性（PR #658 by @only4copilot）。

---

## [3.1.4] — 2026-03-27

### 🐛 Bug 修复

- **Streaming Override Fix** — 请求体中的显式 `stream: true` 现在优先于 `Accept: application/json` 请求头。两者同时发送时，客户端将正确收到 SSE 流式响应（#656）。

### 🌍 i18n

- **Czech string improvements** — 精炼了 `cs.json` 中的术语用法（PR #655 by @zen0bit）。

---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

- **~70 missing translation keys** — 向 `en.json` 和 12 种语言中补充了约 70 个缺失的翻译键（PR #652 by @zen0bit）。
- **Czech documentation updated** — 更新了 CLI-TOOLS、API_REFERENCE、VM_DEPLOYMENT 指南的捷克语文档（PR #652）。
- **Translation 验证 scripts** — 新增 `check_translations.py` 和 `validate_translation.py`，用于 CI/QA（PR #651 by @zen0bit）。

---

## [3.1.2] — 2026-03-26

### 🐛 Bug 修复

- **Critical: Tool Calling Regression** — 通过在 Claude passthrough 路径中禁用 `proxy_` 工具名前缀，修复了 `proxy_Bash` 错误。此前 `Bash`、`Read`、`Write` 等工具会被重命名为 `proxy_Bash`、`proxy_Read` 等，导致 Claude 拒绝这些工具（#618）。
- **Kiro Account Ban Documentation** — 将其记录为上游 AWS 反欺诈误判，而不是 OmniRoute 本身的问题（#649）。

### 🧪 测试

- **936 tests, 0 failures**

---

## [3.1.1] — 2026-03-26

### ✨ 新特性

- **Vision Capability Metadata**：为支持视觉的模型，在 `/v1/models` 条目中新增 `capabilities.vision`、`input_modalities` 和 `output_modalities`（PR #646）。
- **Gemini 3.1 Models**：为 Antigravity 提供商新增 `gemini-3.1-pro-preview` 和 `gemini-3.1-flash-lite-preview`（#645）。

### 🐛 Bug 修复

- **Ollama Cloud 401 Error**：修复错误的 API base URL —— 已从 `api.ollama.com` 改为官方 `ollama.com/v1/chat/completions`（#643）。
- **Expired Token Retry**：为过期的 OAuth 连接新增带指数退避（5→10→20 分钟）的有界重试，而不是永久跳过它们（PR #647）。

### 🧪 测试

- **936 tests, 0 failures**

---

## [3.1.0] — 2026-03-26

### ✨ 新特性

- **GitHub Issue Templates**：新增标准化的 bug report、feature request 和 config/proxy issue 模板（#641）。
- **Clear All Models**：在提供商详情页新增 “Clear All Models” 按钮，并为 29 种语言提供 i18n 支持（#634）。

### 🐛 Bug 修复

- **Locale Conflict (`in.json`)**：将印地语 locale 文件从 `in.json`（实际是印尼语 ISO code）重命名为 `hi.json`，以修复 Weblate 中的翻译冲突（#642）。
- **Codex Empty Tool Names**：将工具名清理逻辑提前到原生 Codex passthrough 之前，修复当工具名为空时上游提供商返回 400 错误的问题（#637）。
- **Streaming Newline Artifacts**：在响应清理器中新增 `collapseExcessiveNewlines`，把 thinking 模型产生的连续 3 个及以上换行折叠为标准双换行（#638）。
- **Claude Reasoning Effort**：将 OpenAI 的 `reasoning_effort` 参数转换为 Claude 原生的 `thinking` budget block，并在所有请求路径中自动调整 `max_tokens`（#627）。
- **Qwen Token Refresh**：实现了过期前主动刷新 OAuth token（5 分钟缓冲），防止使用短生命周期 token 时请求失败（#631）。

### 🧪 测试

- **936 tests, 0 failures** (+10 tests since 3.0.9)

---

## [3.0.9] — 2026-03-26

### 🐛 Bug 修复

- **Claude Code / 客户端响应中的 NaN tokens（#617）:**
  - `sanitizeUsage()` 现在会在白名单过滤之前交叉映射 `input_tokens`→`prompt_tokens` 和 `output_tokens`→`completion_tokens`，修复当提供商返回 Claude 风格 usage 字段时，响应中 token 计数显示为 NaN/0 的问题。

### 🔒 安全

- 更新 `yaml` 包以修复栈溢出漏洞（GHSA-48c2-rrv3-qjmp）。

### 📋 Issue 分流

- 关闭 #613（Codestral —— 已通过 Custom Provider workaround 解决）
- 在 #615 中回复（OpenCode dual-endpoint —— 已提供 workaround，并作为 feature request 跟踪）
- 在 #618 中回复（tool call visibility —— 请求用户测试 v3.0.9）
- 在 #627 中回复（effort level —— 已经支持）

---

## [3.0.8] — 2026-03-25

### 🐛 Bug 修复

- **Claude CLI 中 OpenAI-format Providers 的翻译失败（#632）:**
  - 处理来自 StepFun/OpenRouter 的 `reasoning_details[]` 数组格式，并转换为 `reasoning_content`
  - 处理某些提供商返回的 `reasoning` 字段别名，并规范化为 `reasoning_content`
  - 在 `filterUsageForFormat` 中交叉映射 usage 字段名：`input_tokens`↔`prompt_tokens`、`output_tokens`↔`completion_tokens`
  - 修复 `extractUsage`，使其同时接受 `input_tokens`/`output_tokens` 和 `prompt_tokens`/`completion_tokens` 作为合法 usage 字段
  - 同时应用于流式路径（`sanitizeStreamingChunk`、`openai-to-claude.ts` translator）和非流式路径（`sanitizeMessage`）

---

## [3.0.7] — 2026-03-25

### 🐛 Bug 修复

- **Antigravity Token Refresh:** 修复了 npm 安装用户遇到的 `client_secret is missing` 错误；此前 `providerRegistry` 中的 `clientSecretDefault` 为空，导致 Google 拒绝 token 刷新请求（#588）。
- **OpenCode Zen Models:** 为 OpenCode Zen 的 registry 条目新增 `modelsUrl`，使 “Import from /models” 能正确工作（#612）。
- **Streaming Artifacts:** 修复了移除 thinking-tag 签名后响应中残留过多换行的问题（#626）。
- **Proxy Fallback:** 当 SOCKS5 relay 失败时，新增自动重试且不走代理的回退逻辑。
- **Proxy Test:** Test 端点现在会通过 `proxyId` 从数据库中解析真实凭证。

### ✨ 新特性

- **Playground Account/Key Selector:** 新增一个常驻且始终可见的下拉框，可在测试时选择特定的提供商账户/密钥；启动时会抓取所有连接，并按所选提供商过滤。
- **CLI Tools Dynamic Models:** 模型选择现在会动态从 `/v1/models` API 获取；像 Kiro 这样的提供商会显示完整模型目录。
- **Antigravity Model List:** 更新为包含 Claude Sonnet 4.5、Claude Sonnet 4、GPT 5、GPT 5 Mini；并启用 `passthroughModels` 以支持动态模型访问（#628）。

### 🔧 维护

- 合并 PR #625 —— 修复 Provider Limits 在浅色模式下的背景问题

---

## [3.0.6] — 2026-03-25

### 🐛 Bug 修复

- **Limits/Proxy:** 修复了位于 SOCKS5 代理后的账户无法获取 Codex 限额的问题；token 刷新现在会在代理上下文中运行。
- **CI:** 修复在没有提供商连接的 CI 环境中，集成测试 `v1/models` 的断言失败问题。
- **Settings:** Proxy test 按钮现在会立即显示成功/失败结果，不再隐藏在健康数据之后。

### ✨ 新特性

- **Playground:** 新增 Account selector 下拉框；当某个提供商有多个账户时，可分别测试特定连接。

### 🔧 维护

- 合并 PR #623 —— 修正 LongCat API base URL 路径

---

## [3.0.5] — 2026-03-25

### ✨ 新特性

- **Limits UI:** 在 connections dashboard 中新增标签分组功能，以改善带自定义标签账户的视觉组织方式。

---

## [3.0.4] — 2026-03-25

### 🐛 Bug 修复

- **Streaming:** 修复 combo `sanitize` TransformStream 中 `TextDecoder` 状态损坏的问题；此前它会在遇到多字节字符时导致 SSE 输出乱码（PR #614）。
- **Providers UI:** 使用 `dangerouslySetInnerHTML`，安全地在提供商连接错误提示中渲染 HTML 标签。
- **Proxy Settings:** 补充缺失的 `username` 和 `password` 请求体字段，使认证代理可以从 Dashboard 正常验证。
- **Provider API:** 将软异常返回绑定到 `getCodexUsage`，防止 token 获取失败时 API 触发 HTTP 500。

---

## [3.0.3] — 2026-03-25

### ✨ 新特性

- **Auto-Sync Models:** 新增 UI 开关和 `sync-models` 端点，可通过定时调度器按提供商自动同步模型列表（PR #597）。

### 🐛 Bug 修复

- **Timeouts:** 将默认代理的 `FETCH_TIMEOUT_MS` 和 `STREAM_IDLE_TIMEOUT_MS` 提升到 10 分钟，以便正确支持像 o1 这样的深度推理模型，而不会中途终止请求（Fixes #609）。
- **CLI Tool Detection:** 改进跨平台检测逻辑，支持 NVM 路径、Windows `PATHEXT`（防止 `.cmd` 包装器问题）以及自定义 NPM 前缀（PR #598）。
- **Streaming Logs:** 在流式响应日志中实现 `tool_calls` delta 累积，使函数调用能在数据库中被准确跟踪和持久化（PR #603）。
- **Model Catalog:** 移除 auth exemption；当没有显式配置提供商时，能正确隐藏 `comfyui` 和 `sdwebui` 模型（PR #599）。

### 🌐 翻译

- **cs:** 改进了整个应用中的捷克语翻译字符串（PR #601）。

## [3.0.2] — 2026-03-25

### 🚀 增强与特性

#### feat(ui): Connection Tag Grouping

- 在 `EditConnectionModal` 中新增 Tag/Group 字段（存储于 `providerSpecificData.tag`），且无需数据库 schema migration。
- 提供商视图中的连接现在会按标签动态分组，并带有可视化分隔线。
- 未打标签的连接会优先显示且不带标题，其后是按字母顺序排列的已打标签分组。
- 该标签分组会自动应用到 Codex/Copilot/Antigravity Limits 区域，因为相关开关位于连接行内部。

### 🐛 Bug 修复

#### fix(ui): Proxy Management UI Stabilization

- **连接卡片缺少徽章：** 改为使用 `resolveProxyForConnection()`，而不是静态映射。
- **保存模式下 Test Connection 被禁用：** 通过从已保存列表中解析 proxy 配置，重新启用 Test 按钮。
- **Config Modal 卡死：** 在保存/清除后调用 `onClose()`，防止 UI 卡死。
- **使用量重复统计：** `ProxyRegistryManager` 现在会在挂载时主动加载 usage，并按 `scope` + `scopeId` 去重。原来的 usage 计数已替换为一个内联显示 IP/延迟的 Test 按钮。

#### fix(translator): `function_call` prefix stripping

- 修复了 PR #607 中一个不完整的问题：此前只有 `tool_use` 块会移除 Claude 的 `proxy_` 工具前缀。现在，使用 OpenAI Responses API 格式的客户端也能正确收到不带 `proxy_` 前缀的工具名称。

---

## [3.0.1] — 2026-03-25

### 🔧 热修复补丁 — 关键 Bug 修复

v3.0.0 发布后，用户报告的 3 个关键回归问题现已全部修复。

#### fix(translator): 在非流式 Claude 响应中去除 `proxy_` 前缀（#605）

Claude OAuth 添加的 `proxy_` 前缀此前只会在**流式**响应中被去除。在**非流式**模式下，`translateNonStreamingResponse` 无法访问 `toolNameMap`，导致客户端收到被破坏的工具名，例如 `proxy_read_file`，而不是 `read_file`。

**修复方式：** 为 `translateNonStreamingResponse` 新增可选的 `toolNameMap` 参数，并在 Claude `tool_use` 块处理器中应用前缀去除逻辑。`chatCore.ts` 现在也会把该映射继续传递下去。

#### fix(validation): 为 LongCat 添加专用验证器以跳过 `/models` 探测（#592）

LongCat AI 不提供 `GET /v1/models`。通用的 `validateOpenAICompatibleProvider` 验证器只有在设置了 `validationModelId` 时才会回退到 chat-completions，而 LongCat 并未配置该字段。这会导致在新增/保存时，提供商验证以误导性的错误信息失败。

**修复方式：** 在专用验证器映射中新增 `longcat`，直接探测 `/chat/completions`，并将任何非认证错误的响应视为通过。

#### fix(translator): 为 Anthropic 规范化 object 工具 schema（#595）

MCP 工具（例如 `pencil`、`computer_use`）转发的工具定义中会出现 `{type:"object"}`，但没有 `properties` 字段。Anthropic API 会因此拒绝请求，并报错：`object schema missing properties`。

**修复方式：** 在 `openai-to-claude.ts` 中，当 `type` 为 `"object"` 且缺少 `properties` 时，注入安全默认值 `properties: {}`。

---

### 🔀 已合并的社区 PR（2）

| PR       | 作者    | 摘要                                                       |
| -------- | ------- | ---------------------------------------------------------- |
| **#589** | @flobo3 | docs(i18n): 修复 Playground 和 Testbed 的俄语翻译          |
| **#591** | @rdself | fix(ui): 改善 Provider Limits 浅色模式对比度和计划层级显示 |

---

### ✅ 已解决问题

`#592` `#595` `#605`

---

### 🧪 测试

- **926 个测试，0 失败**（与 v3.0.0 持平）

---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — 免费 AI 网关，现已支持 67+ 个提供商

> **史上最大版本。** 从 v2.9.5 的 36 个提供商扩展到 v3.0.0 的 **67+ 个提供商**，并带来 MCP Server、A2A Protocol、auto-combo engine、Provider Icons、Registered Keys API、926 个测试，以及来自 **12 位社区成员** 的 **10 个已合并 PR** 贡献。
>
> 整合自 v3.0.0-rc.1 到 rc.17（3 天高强度开发中的 17 个发布候选版本）。

---

### 🆕 新提供商（较 v2.9.5 增加 31 个）

| 提供商                        | 别名            | 层级   | 说明                                                                      |
| ----------------------------- | --------------- | ------ | ------------------------------------------------------------------------- |
| **OpenCode Zen**              | `opencode-zen`  | 免费   | 通过 `opencode.ai/zen/v1` 提供 3 个模型（PR #530 by @kang-heewon）        |
| **OpenCode Go**               | `opencode-go`   | 付费   | 通过 `opencode.ai/zen/go/v1` 提供 4 个模型（PR #530 by @kang-heewon）     |
| **LongCat AI**                | `lc`            | 免费   | 公测期间每天 5000 万 tokens（Flash-Lite）+ 50 万/天（Chat/Thinking）      |
| **Pollinations AI**           | `pol`           | 免费   | 无需 API key —— GPT-5、Claude、Gemini、DeepSeek V3、Llama 4（1 次/15 秒） |
| **Cloudflare Workers AI**     | `cf`            | 免费   | 每天 10K Neurons —— 约 150 次 LLM 响应或 500 秒 Whisper 音频，边缘推理    |
| **Scaleway AI**               | `scw`           | 免费   | 新账户提供 100 万免费 tokens —— 符合 EU/GDPR（巴黎）                      |
| **AI/ML API**                 | `aiml`          | 免费   | 每天 $0.025 免费额度 —— 通过单一端点访问 200+ 个模型                      |
| **Puter AI**                  | `pu`            | 免费   | 500+ 个模型（GPT-5、Claude Opus 4、Gemini 3 Pro、Grok 4、DeepSeek V3）    |
| **Alibaba Cloud (DashScope)** | `ali`           | 付费   | 通过 `alicode`/`alicode-intl` 提供国际与中国端点                          |
| **Alibaba Coding Plan**       | `bcp`           | 付费   | Alibaba Model Studio，提供 Anthropic-compatible API                       |
| **Kimi Coding (API Key)**     | `kmca`          | 付费   | 基于 API key 的独立 Kimi 接入（与 OAuth 分离）                            |
| **MiniMax Coding**            | `minimax`       | 付费   | 国际端点                                                                  |
| **MiniMax (China)**           | `minimax-cn`    | 付费   | 中国区端点                                                                |
| **Z.AI (GLM-5)**              | `zai`           | 付费   | 智谱 AI 新一代 GLM 模型                                                   |
| **Vertex AI**                 | `vertex`        | 付费   | Google Cloud —— Service Account JSON 或 OAuth access_token                |
| **Ollama Cloud**              | `ollamacloud`   | 付费   | Ollama 托管 API 服务                                                      |
| **Synthetic**                 | `synthetic`     | 付费   | Passthrough 模型网关                                                      |
| **Kilo Gateway**              | `kg`            | 付费   | Passthrough 模型网关                                                      |
| **Perplexity Search**         | `pplx-search`   | 付费   | 专用搜索增强端点                                                          |
| **Serper Search**             | `serper-search` | 付费   | Web search API 集成                                                       |
| **Brave Search**              | `brave-search`  | 付费   | Brave Search API 集成                                                     |
| **Exa Search**                | `exa-search`    | 付费   | Neural search API 集成                                                    |
| **Tavily Search**             | `tavily-search` | 付费   | AI search API 集成                                                        |
| **NanoBanana**                | `nb`            | 付费   | 图像生成 API                                                              |
| **ElevenLabs**                | `el`            | 付费   | 文本转语音语音合成                                                        |
| **Cartesia**                  | `cartesia`      | 付费   | 超高速 TTS 语音合成                                                       |
| **PlayHT**                    | `playht`        | 付费   | 语音克隆与 TTS                                                            |
| **Inworld**                   | `inworld`       | 付费   | AI 角色语音聊天                                                           |
| **SD WebUI**                  | `sdwebui`       | 自托管 | Stable Diffusion 本地图像生成                                             |
| **ComfyUI**                   | `comfyui`       | 自托管 | ComfyUI 本地工作流节点式生成                                              |
| **GLM Coding**                | `glm`           | 付费   | BigModel/Zhipu 专用编码端点                                               |

**总计：67+ 个提供商**（4 个免费、8 个 OAuth、55 个 API Key）+ 无限数量的 OpenAI/Anthropic-Compatible 自定义提供商。

---

### ✨ 主要功能

#### 🔑 Registered Keys Provisioning API (#464)

可通过编程方式自动生成并签发 OmniRoute API key，支持按提供商和账户进行配额限制。

| 端点                            | 方法         | 说明                                  |
| ------------------------------- | ------------ | ------------------------------------- |
| `/api/v1/registered-keys`       | `POST`       | 签发新 key —— 原始 key **只返回一次** |
| `/api/v1/registered-keys`       | `GET`        | 列出已注册 key（脱敏）                |
| `/api/v1/registered-keys/{id}`  | `GET/DELETE` | 获取元数据 / 吊销                     |
| `/api/v1/quotas/check`          | `GET`        | 签发前预检配额                        |
| `/api/v1/providers/{id}/limits` | `GET/PUT`    | 配置按提供商的签发限制                |
| `/api/v1/accounts/{id}/limits`  | `GET/PUT`    | 配置按账户的签发限制                  |
| `/api/v1/issues/report`         | `POST`       | 向 GitHub Issues 报告配额事件         |

**安全性：** key 以 SHA-256 哈希存储。原始 key 只在创建时展示一次，之后不可再取回。

#### 🎨 Provider Icons via @lobehub/icons (#529)

130+ 个提供商 Logo 现使用 `@lobehub/icons` React 组件（SVG）。回退链为：**Lobehub SVG → 现有 PNG → 通用图标**。已统一应用到 Dashboard、Providers 和 Agents 页面，使用标准化的 `ProviderIcon` 组件。

#### 🔄 Model Auto-Sync Scheduler (#488)

每 **24 小时**自动刷新已连接提供商的模型列表。会在服务器启动时运行，并可通过 `MODEL_SYNC_INTERVAL_HOURS` 配置。

#### 🔀 Per-Model Combo Routing (#563)

可将模型名称模式（glob）映射到特定 combo，实现自动路由：

- `claude-sonnet*` → code-combo，`gpt-4o*` → openai-combo，`gemini-*` → google-combo
- 新增 `model_combo_mappings` 表，支持 glob 转 regex 匹配
- Dashboard UI 新增 “Model Routing Rules” 区域，支持内联新增/编辑/开关/删除

#### 🧭 API Endpoints Dashboard

交互式目录、webhooks 管理与 OpenAPI 查看器，全部集中在 `/dashboard/endpoint` 的单一标签页页面中。

#### 🔍 Web Search Providers

新增 5 个搜索提供商集成：**Perplexity Search**、**Serper**、**Brave Search**、**Exa**、**Tavily**，让 AI 响应可结合实时 Web 数据进行 grounded 回答。

#### 📊 Search Analytics

`/dashboard/analytics` 中新增标签页，展示提供商拆分、缓存命中率和成本跟踪。API：`GET /api/v1/search/analytics`。

#### 🛡️ Per-API-Key Rate Limits (#452)

新增 `max_requests_per_day` 和 `max_requests_per_minute` 字段，并通过内存滑动窗口强制限制，返回 HTTP 429。

#### 🎵 Media Playground

`/dashboard/media` 提供完整的多媒体生成 playground：图像生成、视频、音乐、音频转录（2GB 上传限制）和文本转语音。

---

### 🔒 安全与 CI/CD

- **CodeQL remediation** —— 修复 10+ 个警报：6 个 polynomial-redos、1 个 insecure-randomness（`Math.random()` → `crypto.randomUUID()`）、1 个 shell-command-injection
- **Route validation** —— 为 **176/176 个 API 路由**加入 Zod schema + `validateBody()`，并由 CI 强制执行
- **CVE fix** —— 通过 npm overrides 修复 dompurify XSS 漏洞（GHSA-v2wj-7wpq-c8vv）
- **Flatted** —— 从 3.3.3 升级到 3.4.2（CWE-1321 prototype pollution）
- **Docker** —— 将 `docker/setup-buildx-action` 从 v3 升级到 v4

---

### 🐛 Bug 修复（40+）

#### OAuth 与认证

- **#537** —— 在 Docker 中缺少 `GEMINI_OAUTH_CLIENT_SECRET` 时，Gemini CLI OAuth 现在会给出清晰且可操作的错误提示
- **#549** —— CLI 设置路由现在会从 `keyId` 解析真实 API key（而不是脱敏字符串）
- **#574** —— 跳过向导密码设置后，登录不再卡死
- **#506** —— 重写跨平台 `machineId` 逻辑（Windows REG.exe → macOS ioreg → Linux → hostname 回退）

#### 提供商与路由

- **#536** —— 修复 LongCat AI 的 `baseUrl` 和 `authHeader`
- **#535** —— 修复固定模型覆盖：`body.model` 现在会正确设置为 `pinnedModel`
- **#570** —— 未带前缀的 Claude 模型现在会正确解析到 Anthropic 提供商
- **#585** —— `<omniModel>` 内部标签不再泄露到 SSE 流式客户端
- **#493** —— 自定义提供商模型命名不再被前缀剥离破坏
- **#490** —— 通过 `TransformStream` 注入实现流式 + context cache protection
- **#511** —— `<omniModel>` 标签现在会注入到首个内容 chunk 中（而不是 `[DONE]` 之后）

#### CLI 与工具

- **#527** —— Claude Code + Codex 循环问题：`tool_result` 块现在会被转换为文本
- **#524** —— OpenCode 配置可正确保存（XDG_CONFIG_HOME、TOML 格式）
- **#522** —— API Manager 移除具有误导性的 “Copy masked key” 按钮
- **#546** —— 修复 Windows 上 `--version` 返回 `unknown` 的问题（PR by @k0valik）
- **#544** —— 通过已知安装路径实现安全的 CLI 工具检测（PR by @k0valik）
- **#510** —— Windows MSYS2/Git-Bash 路径现在会自动规范化
- **#492** —— 当 `app/server.js` 缺失时，CLI 可检测由 `mise`/`nvm` 管理的 Node

#### Streaming 与 SSE

- **PR #587** —— 回滚 responsesTransformer 中对 `resolveDataDir` 的导入，以兼容 Cloudflare Workers（@k0valik）
- **PR #495** —— 修复 Bottleneck 429 无限等待：在限流时丢弃等待中的任务（@xandr0s）
- **#483** —— 在 `[DONE]` 信号后停止附加 `data: null`
- **#473** —— Zombie SSE 流超时从 300 秒降到 120 秒，以实现更快回退

#### 媒体与转录

- **Transcription** —— Deepgram `video/mp4` → `audio/mp4` MIME 映射，自动语言检测和标点
- **TTS** —— 修复 ElevenLabs 风格嵌套错误中的 `[object Object]` 显示问题
- **Upload limits** —— 媒体转录上限提升到 2GB（nginx `client_max_body_size 2g` + `maxDuration=300`）

---

### 🔧 基础设施与改进

#### Sub2api Gap Analysis（T01–T15 + T23–T42）

- **T01** —— 在 call logs 中新增 `requested_model` 列（migration 009）
- **T02** —— 从嵌套的 `tool_result.content` 中剥离空文本块
- **T03** —— 解析 `x-codex-5h-*` / `x-codex-7d-*` 配额头
- **T04** —— 为外部粘性路由增加 `X-Session-Id` 请求头
- **T05** —— 通过专用 API 持久化 rate-limit 数据
- **T06** —— 账户停用 → 永久封锁（1 年冷却）
- **T07** —— `X-Forwarded-For` IP 校验（`extractClientIp()`）
- **T08** —— 基于滑动窗口的 Per-API-key 会话限制
- **T09** —— Codex 与 Spark 的限流范围分离（独立池）
- **T10** —— 积分耗尽 → 独立的 1 小时冷却回退
- **T11** —— `max` reasoning effort → 131072 budget tokens
- **T12** —— 新增 MiniMax M2.7 定价条目
- **T13** —— 修复过期配额显示（感知重置窗口）
- **T14** —— 代理快速失败 TCP 检查（≤2 秒，缓存 30 秒）
- **T15** —— 为 Anthropic 规范化数组内容
- **T23** —— 智能配额重置回退（从 header 提取）
- **T24** —— `503` 冷却 + `406` 映射
- **T25** —— Provider 验证回退
- **T29** —— Vertex AI Service Account JWT 认证
- **T33** —— Thinking level 到 budget 的转换
- **T36** —— `403` 与 `429` 错误分类
- **T38** —— 集中化模型规格定义（`modelSpecs.ts`）
- **T39** —— `fetchAvailableModels` 的端点回退
- **T41** —— 后台任务自动重定向到 flash 模型
- **T42** —— 图像生成长宽比映射

#### 其他改进

- **Per-model upstream custom headers** —— 通过配置 UI 设置（PR #575 by @zhangqiang8vip）
- **Model context length** —— 可在模型元数据中配置（PR #578 by @hijak）
- **Model prefix stripping** —— 可选移除模型名称中的提供商前缀（PR #582 by @jay77721）
- **Gemini CLI deprecation** —— 因 Google OAuth 限制警告而标记为 deprecated
- **YAML parser** —— 用 `js-yaml` 替换自定义解析器，以正确解析 OpenAPI spec
- **ZWS v5** —— HMR 泄漏修复（数据库连接 485 → 1，内存 2.4GB → 195MB）
- **Log export** —— Dashboard 新增带时间范围下拉框的 JSON 导出按钮
- **Update notification banner** —— Dashboard 首页现在会显示新版本可用提醒

---

### 🌐 i18n 与文档

- **30 种语言** 达到 100% 同步 —— 已补齐 2,788 个缺失键
- **Czech** —— 完整翻译：22 份文档，2,606 条 UI 字符串（PR by @zen0bit）
- **Chinese (zh-CN)** —— 完整重译（PR by @only4copilot）
- **VM Deployment Guide** —— 已翻译为英文源文档
- **API Reference** —— 新增 `/v1/embeddings` 和 `/v1/audio/speech` 端点
- **Provider count** —— 将 README 和全部 30 份 i18n README 中的提供商数量从 36+/40+/44+ 更新为 **67+**

---

### 🔀 已合并的社区 PR（10）

| PR       | 作者            | 摘要                                                          |
| -------- | --------------- | ------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): 回滚 `resolveDataDir` 导入以兼容 Cloudflare Workers |
| **#582** | @jay77721       | feat(proxy): 模型名前缀剥离选项                               |
| **#581** | @jay77721       | fix(npm): 将 electron-release 接入 npm-publish 工作流         |
| **#578** | @hijak          | feat: 可配置的模型上下文长度元数据                            |
| **#575** | @zhangqiang8vip | feat: 按模型设置上游请求头、compat PATCH、chat 对齐           |
| **#562** | @coobabm        | fix: MCP 会话管理、Claude passthrough、detectFormat           |
| **#561** | @zen0bit        | fix(i18n): 捷克语翻译修正                                     |
| **#555** | @k0valik        | fix(sse): 集中化 `resolveDataDir()` 用于路径解析              |
| **#546** | @k0valik        | fix(cli): Windows 上 `--version` 返回 `unknown`               |
| **#544** | @k0valik        | fix(cli): 基于安装路径的安全 CLI 工具检测                     |
| **#542** | @rdself         | fix(ui): 浅色模式对比度 CSS 主题变量                          |
| **#530** | @kang-heewon    | feat: 使用 `OpencodeExecutor` 的 OpenCode Zen + Go 提供商     |
| **#512** | @zhangqiang8vip | feat: 按协议定义模型兼容性（`compatByProtocol`）              |
| **#497** | @zhangqiang8vip | fix: 开发模式 HMR 资源泄漏（ZWS v5）                          |
| **#495** | @xandr0s        | fix: Bottleneck 429 无限等待（丢弃等待中的任务）              |
| **#494** | @zhangqiang8vip | feat: MiniMax developer→system 角色修复                       |
| **#480** | @prakersh       | fix: 流式 flush usage 提取                                    |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 和 Anthropic 定价条目                     |
| **#475** | @only4copilot   | feat(i18n): 改进中文翻译                                      |

**感谢所有贡献者！**

---

### 📋 已解决问题（50+）

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`

---

### 🧪 测试

- **926 个测试，0 失败**（相比 v2.9.5 的 821 个有所增加）
- 新增 105 个测试，覆盖 model-combo mappings、registered keys、OpencodeExecutor、Bailian 提供商、route validation、error classification、aspect ratio mapping 等内容

---

### 📦 数据库迁移

| 迁移编号 | 说明                                                              |
| -------- | ----------------------------------------------------------------- |
| **008**  | `registered_keys`、`provider_key_limits`、`account_key_limits` 表 |
| **009**  | `call_logs` 中新增 `requested_model` 列                           |
| **010**  | 用于按模型 combo 路由的 `model_combo_mappings` 表                 |

---

### ⬆️ 从 v2.9.5 升级

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# 首次启动时会自动运行迁移
```

> **破坏性变更：** 无。所有现有配置、combo 和 API key 都会被保留。
> 数据库迁移 008-010 会在启动时自动运行。

---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 安全与 CI/CD

- **CodeQL remediation** —— 修复 10+ 个警报：
  - `provider.ts` / `chatCore.ts` 中的 6 个 polynomial-redos（将 `(?:^|/)` 交替模式替换为基于片段的匹配）
  - `acp/manager.ts` 中的 1 个 insecure-randomness（`Math.random()` → `crypto.randomUUID()`）
  - `prepublish.mjs` 中的 1 个 shell-command-injection（`JSON.stringify()` 路径转义）
- **Route validation** —— 为 5 个缺少验证的路由新增 Zod schema + `validateBody()`：
  - `model-combo-mappings`（POST、PUT）、`webhooks`（POST、PUT）、`openapi/try`（POST）
  - CI `check:route-validation:t06` 现已通过：**176/176 个路由全部完成验证**

### 🐛 Bug 修复

- **#585** —— `<omniModel>` 内部标签不再泄露给 SSE 客户端响应。已在 `combo.ts` 中添加出站清理 `TransformStream`

### ⚙️ 基础设施

- **Docker** —— 将 `docker/setup-buildx-action` 从 v3 升级到 v4（修复 Node.js 20 弃用问题）
- **CI cleanup** —— 删除 150+ 个失败/已取消的 workflow 运行

### 🧪 测试

- 测试套件：**926 个测试，0 失败**（新增 3 个）

---

## [3.0.0-rc.16] — 2026-03-24

### ✨ 新特性

- 提高了媒体转录限制
- 为 registry metadata 添加了模型上下文长度
- 通过配置 UI 添加了每模型上游自定义请求头
- 修复了多个 bug，使用 Zod 验证进行补丁，并解决了各种社区问题

## [3.0.0-rc.15] — 2026-03-24

### ✨ 新特性

- **#563** — 每模型 Combo 路由：将模型名称模式（glob）映射到特定 combo，实现自动路由
  - 新增 `model_combo_mappings` 表（migration 010），包含 pattern、combo_id、priority、enabled 字段
  - `resolveComboForModel()` 数据库函数，使用 glob 到正则匹配（不区分大小写，支持 `*` 和 `?` 通配符）
  - `getComboForModel()` 在 `model.ts` 中：增强 `getCombo()`，使用模型模式回退
  - `chat.ts`：路由决策现在在处理单模型之前检查模型-combo 映射
  - API：`GET/POST /api/model-combo-mappings`、`GET/PUT/DELETE /api/model-combo-mappings/:id`
  - 仪表盘：在 Combos 页面新增 "Model Routing Rules" 区域，支持内联新增/编辑/开关/删除
  - 示例：`claude-sonnet*` → code-combo、`gpt-4o*` → openai-combo、`gemini-*` → google-combo

### 🌐 i18n

- **完整 i18n 同步**：在 30 个语言文件中新增 2,788 个缺失键 — 所有语言现在与 `en.json` 达到 100% 一致
- **代理页面 i18n**：OpenCode 集成部分完全国际化（标题、描述、扫描、下载标签）
- **新增 6 个键**到 `agents` 命名空间，用于 OpenCode 部分

### 🎨 界面/体验

- **提供商图标**：新增 16 个缺失的提供商图标（3 个复制、2 个下载、11 个 SVG 创建）
- **SVG 回退**：`ProviderIcon` 组件更新为 4 层策略：Lobehub → PNG → SVG → 通用图标
- **代理指纹识别**：与 CLI 工具同步 — 将 droid、openclaw、copilot、opencode 添加到指纹列表（共 14 个）

### 🔒 安全

- **CVE 修复**：通过 npm 强制使用 `dompurify@^3.3.2` 解决了 dompurify XSS 漏洞（GHSA-v2wj-7wpq-c8vv）
- `npm audit` 现在报告 **0 个漏洞**

### 🧪 测试

- 测试套件：**923 个测试，0 失败**（新增 15 个模型-combo 映射测试）

---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 已合并的社区 PR

| PR       | 作者     | 摘要                                                                 |
| -------- | -------- | -------------------------------------------------------------------- |
| **#562** | @coobabm | fix(ux): MCP 会话管理、Claude 透传规范化、OAuth 模态框、detectFormat |
| **#561** | @zen0bit | fix(i18n): 捷克语翻译修正 — HTTP 方法名称和文档更新                  |

### 🧪 测试

- 测试套件：**908 个测试，0 失败**

---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug 修复

- **config:** 在 CLI 设置路由（`codex-settings`、`droid-settings`、`kilo-settings`）中从 `keyId` 解析真实 API key，防止写入脱敏字符串 (#549)

---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 已合并的社区 PR

| PR       | 作者     | 摘要                                                                                                                              |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **#546** | @k0valik | fix(cli): Windows 上 `--version` 返回 `unknown` — 使用 `JSON.parse(readFileSync)` 替代 ESM import                                 |
| **#555** | @k0valik | fix(sse): 集中化 `resolveDataDir()` 用于路径解析，包括 credentials、autoCombo、响应 logger 和请求 logger                          |
| **#544** | @k0valik | fix(cli): 通过已知安装路径（8 个工具）进行安全的 CLI 工具检测，包括符号链接验证、文件类型检查、大小边界、健康检查中的最小环境检测 |
| **#542** | @rdself  | fix(ui): 改善浅色模式对比度 — 添加缺失的 CSS 主题变量（`bg-primary`、`bg-subtle`、`text-primary`）并修复日志详情中仅暗色的颜色    |

### 🔧 Bug 修复

- **TDZ 修复（`cliRuntime.ts`）** — `validateEnvPath` 在模块启动时被 `getExpectedParentPaths()` 使用前未初始化。重新排序声明以修复 `ReferenceError`。
- **构建修复** — 将 `pino` 和 `pino-pretty` 添加到 `serverExternalPackages` 以防止 Turbopack 破坏 Pino 的内部 worker 加载。

### 🧪 测试

- 测试套件：**905 个测试，0 失败**

---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug 修复

- **#509 / #508** — Electron 构建回归：将 Next.js 从 `16.1.x` 降级到 `16.0.10` 以消除 Turbopack 模块哈希不稳定问题，该问题导致 Electron 桌面包出现白屏。
- **单元测试修复** — 修正了两个过时的测试断言（`nanobanana-image-handler` 宽高比/分辨率、`thinking-budget` Gemini `thinkingConfig` 字段映射），这些在最近的实现变更后已偏离。
- **#541** — 回复了用户关于安装复杂度的反馈；无需代码变更。

---

## [3.0.0-rc.9] — 2026-03-23

### ✨ 新特性

- **T29** — Vertex AI 服务账户 JSON 执行器：使用 `jose` 库处理 JWT/服务账户认证，以及 UI 中可配置的区域和自动伙伴模型 URL 构建。
- **T42** — 图像生成长宽比映射：为通用 OpenAI 格式（`size`）创建了 `sizeMapper` 逻辑，添加了原生 `imagen3` 处理，并更新 NanoBanana 端点以自动使用映射的长宽比。
- **T38** — 集中化模型规格定义：创建 `modelSpecs.ts` 用于每个模型的限额和参数。

### 🔧 改进

- **T40** — OpenCode CLI 工具集成：在之前的 PR 中已完成原生 `opencode-zen` 和 `opencode-go` 集成。

---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug 修复与改进（回退、配额与预算）

- **T24** — `503` 冷却等待修复 + `406` 映射：将 `406 Not Acceptable` 映射为 `503 Service Unavailable`，并设置适当的冷却间隔。
- **T25** — 提供商验证回退：当不存在特定的 `validationModelId` 时，优雅回退到标准验证模型。
- **T36** — `403` 与 `429` 提供商处理优化：提取到 `errorClassifier.ts` 以正确隔离硬性权限失败（`403`）和速率限制（`429`）。
- **T39** — `fetchAvailableModels` 端点回退：实现了三层机制（`/models` → `/v1/models` → 本地通用目录）+ 更新 `list_models_catalog` MCP 工具以反映 `source` 和 `warning`。
- **T33** — Thinking 级别到预算转换：将定性 thinking 级别转换为精确的预算分配。
- **T41** — 后台任务自动重定向：自动将沉重的后台评估任务路由到快速/高效模型。
- **T23** — 智能配额重置回退：准确提取 `x-ratelimit-reset` / `retry-after` 请求头值或映射静态冷却时间。

---

## [3.0.0-rc.7] — 2026-03-23 _（相比 v2.9.5 的新增内容 — 将作为 v3.0.0 发布）_

> **从 v2.9.5 升级：** 16 个问题已解决 · 2 个社区 PR 已合并 · 2 个新提供商 · 7 个新 API 端点 · 3 个新功能 · 数据库迁移 008+009 · 832 个测试通过 · 15 项 sub2api 差距改进（T01–T15 完成）。

### 🆕 新提供商

| 提供商           | 别名           | 层级 | 说明                                                                  |
| ---------------- | -------------- | ---- | --------------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | 免费 | 通过 `opencode.ai/zen/v1` 提供 3 个模型（PR #530 by @kang-heewon）    |
| **OpenCode Go**  | `opencode-go`  | 付费 | 通过 `opencode.ai/zen/go/v1` 提供 4 个模型（PR #530 by @kang-heewon） |

两个提供商都使用新的 `OpencodeExecutor`，支持多格式路由（`/chat/completions`、`/messages`、`/responses`、`/models/{model}:generateContent`）。

---

### ✨ 新特性

#### 🔑 Registered Keys Provisioning API (#464)

可通过编程方式自动生成并签发 OmniRoute API key，支持按提供商和账户进行配额限制。

| 端点                                  | 方法      | 说明                                  |
| ------------------------------------- | --------- | ------------------------------------- |
| `/api/v1/registered-keys`             | `POST`    | 签发新 key —— 原始 key **只返回一次** |
| `/api/v1/registered-keys`             | `GET`     | 列出已注册 key（脱敏）                |
| `/api/v1/registered-keys/{id}`        | `GET`     | 获取元数据                            |
| `/api/v1/registered-keys/{id}`        | `DELETE`  | 吊销 key                              |
| `/api/v1/registered-keys/{id}/revoke` | `POST`    | 吊销（适用于不支持 DELETE 的客户端）  |
| `/api/v1/quotas/check`                | `GET`     | 签发前预检配额                        |
| `/api/v1/providers/{id}/limits`       | `GET/PUT` | 配置按提供商的签发限制                |
| `/api/v1/accounts/{id}/limits`        | `GET/PUT` | 配置按账户的签发限制                  |
| `/api/v1/issues/report`               | `POST`    | 向 GitHub Issues 报告配额事件         |

**数据库 — 迁移 008：** 三个新表：`registered_keys`、`provider_key_limits`、`account_key_limits`。
**安全性：** key 以 SHA-256 哈希存储。原始 key 只在创建时展示一次，之后不可再取回。
**配额类型：** 每个提供商和账户的 `maxActiveKeys`、`dailyIssueLimit`、`hourlyIssueLimit`。
**幂等性：** `idempotency_key` 字段防止重复签发。如果 key 已被使用，返回 `409 IDEMPOTENCY_CONFLICT`。
**每个 key 的预算：** `dailyBudget` / `hourlyBudget` —— 限制每个时间窗口内 key 可路由的请求数。
**GitHub 报告：** 可选。设置 `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` 可在配额超出或签发失败时自动创建 GitHub issue。

#### 🎨 提供商图标 — @lobehub/icons (#529)

仪表盘中所有提供商图标现在使用 `@lobehub/icons` React 组件（130+ 个提供商，SVG 格式）。
回退链：**Lobehub SVG → 现有 `/providers/{id}.png` → 通用图标**。使用标准的 React `ErrorBoundary` 模式。

#### 🔄 模型自动同步调度器 (#488)

OmniRoute 现在每 **24 小时**自动刷新已连接提供商的模型列表。

- 通过现有的 `/api/sync/initialize` 钩子在服务器启动时运行
- 可通过 `MODEL_SYNC_INTERVAL_HOURS` 环境变量配置
- 覆盖 16 个主要提供商
- 在设置数据库中记录最后同步时间

---

### 🔧 Bug 修复

#### OAuth 与认证

- **#537 — Gemini CLI OAuth：** 在 Docker/自托管部署中缺少 `GEMINI_OAUTH_CLIENT_SECRET` 时，现在会给出清晰且可操作的错误提示。此前会显示来自 Google 的神秘 `client_secret is missing` 错误。现在提供具体的 `docker-compose.yml` 和 `~/.omniroute/.env` 配置说明。

#### 提供商与路由

- **#536 — LongCat AI：** 修复了 `baseUrl`（`api.longcat.chat/openai`）和 `authHeader`（`Authorization: Bearer`）。
- **#535 — 固定模型覆盖：** 当 context-cache 保护激活时，`body.model` 现在会正确设置为 `pinnedModel`。
- **#532 — OpenCode Go key 验证：** 现在使用 `zen/v1` 测试端点（`testKeyBaseUrl`）—— 同一个 key 适用于两个层级。

#### CLI 与工具

- **#527 — Claude Code + Codex 循环：** `tool_result` 块现在会被转换为文本而不是被丢弃，从而阻止无限工具结果循环。
- **#524 — OpenCode 配置保存：** 添加了 `saveOpenCodeConfig()` 处理器（XDG_CONFIG_HOME 感知，写入 TOML 格式）。
- **#521 — 登录卡死：** 跳过密码设置后登录不再卡死 —— 现在正确重定向到引导页面。
- **#522 — API Manager：** 移除了具有误导性的 "Copy masked key" 按钮（替换为锁图标提示）。
- **#532 — OpenCode Go 配置：** 引导设置处理器现在处理 `opencode` toolId。

#### 开发者体验

- **#489 — Antigravity：** 缺少 `googleProjectId` 时返回结构化的 422 错误，附带重新连接指导，而不是神秘崩溃。
- **#510 — Windows 路径：** MSYS2/Git-Bash 路径（`/c/Program Files/...`）现在会自动规范化为 `C:\\Program Files\\...`。
- **#492 — CLI 启动：** 当 `app/server.js` 缺失时，`omniroute` CLI 现在能检测由 `mise`/`nvm` 管理的 Node，并显示针对性的修复说明。

---

### 📖 文档更新

- **#513** —— Docker 密码重置：记录了 `INITIAL_PASSWORD` 环境变量解决方案
- **#520** —— pnpm：记录了 `pnpm approve-builds better-sqlite3` 步骤

---

### ✅ 在 v3.0.0 中解决的问题

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`

---

### 🔀 已合并的社区 PR

| PR       | 作者         | 摘要                                                            |
| -------- | ------------ | --------------------------------------------------------------- |
| **#530** | @kang-heewon | 使用 `OpencodeExecutor` 的 OpenCode Zen + Go 提供商，改进了测试 |

---

## [3.0.0-rc.7] - 2026-03-23

### 🔧 改进（sub2api 差距分析 — T05, T08, T09, T13, T14）

- **T05** — 限流数据库持久化：`setConnectionRateLimitUntil()`、`isConnectionRateLimited()`、`getRateLimitedConnections()` 在 `providers.ts` 中。现有的 `rate_limited_until` 列现在作为专用 API 公开 — OAuth token 刷新绝不能触碰此字段，以防止限流循环。
- **T08** — 每 API key 会话限制：通过自动迁移在 `api_keys` 中新增 `max_sessions INTEGER DEFAULT 0`。`sessionManager.ts` 新增 `registerKeySession()`、`unregisterKeySession()`、`checkSessionLimit()` 和 `getActiveSessionCountForKey()`。`chatCore.js` 中的调用方可以强制执行该限制并在 `req.close` 时递减。
- **T09** — Codex 与 Spark 限流范围分离：`codex.ts` 中的 `getCodexModelScope()` 和 `getCodexRateLimitKey()`。标准模型（`gpt-5.x-codex`、`codex-mini`）获得范围 `"codex"`；spark 模型（`codex-spark*`）获得范围 `"spark"`。限流 key 应为 `${accountId}:${scope}`，这样耗尽一个池不会阻塞另一个。
- **T13** — 过期配额显示修复：当重置窗口已过时，`getEffectiveQuotaUsage(used, resetAt)` 返回 `0`；`formatResetCountdown(resetAt)` 返回人类可读的倒计时字符串（例如 `"2h 35m"`）。两者都从 `providers.ts` + `localDb.ts` 导出，供仪表盘使用。
- **T14** — 代理快速失败：新增 `src/lib/proxyHealth.ts`，包含 `isProxyReachable(proxyUrl, timeoutMs=2000)`（TCP 检查，≤2 秒而非 30 秒超时）、`getCachedProxyHealth()`、`invalidateProxyHealth()` 和 `getAllProxyHealthStatuses()`。结果默认缓存 30 秒；可通过 `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS` 配置。

### 🧪 测试

- 测试套件：**832 个测试，0 失败**

---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug 修复与改进（sub2api 差距分析 — T01–T15）

- **T01** — `call_logs` 中的 `requested_model` 列（迁移 009）：跟踪客户端最初请求的模型与实际路由的模型。启用回退速率分析。
- **T02** — 从嵌套的 `tool_result.content` 中剥离空文本块：防止 Claude Code 链式工具结果时出现 Anthropic 400 错误（`text content blocks must be non-empty`）。
- **T03** — 解析 `x-codex-5h-*` / `x-codex-7d-*` 请求头：`parseCodexQuotaHeaders()` + `getCodexResetTime()` 提取 Codex 配额窗口，用于精确冷却调度，而非通用的 5 分钟回退。
- **T04** — 用于外部粘性路由的 `X-Session-Id` 请求头：`sessionManager.ts` 中的 `extractExternalSessionId()` 读取 `x-session-id` / `x-omniroute-session` 请求头，使用 `ext:` 前缀以避免与内部 SHA-256 会话 ID 冲突。兼容 Nginx（连字符请求头）。
- **T06** — 账户停用 → 永久封锁：`accountFallback.ts` 中的 `isAccountDeactivated()` 检测 401 停用信号并应用 1 年冷却，以防止重试永久失效的账户。
- **T07** — X-Forwarded-For IP 验证：新增 `src/lib/ipUtils.ts`，包含 `extractClientIp()` 和 `getClientIpFromRequest()` — 跳过 `X-Forwarded-For` 链中的 `unknown`/非 IP 条目（Nginx/代理转发的请求）。
- **T10** — 积分耗尽 → 独立的回退：`accountFallback.ts` 中的 `isCreditsExhausted()` 返回 1 小时冷却，带有 `creditsExhausted` 标志，区别于通用的 429 限流。
- **T11** — `max` 推理努力 → 131072 预算 token：更新了 `EFFORT_BUDGETS` 和 `THINKING_LEVEL_MAP`；反向映射现在为全预算响应返回 `"max"`。单元测试已更新。
- **T12** — 新增 MiniMax M2.7 定价条目：`minimax-m2.7`、`MiniMax-M2.7`、`minimax-m2.7-highspeed` 已添加到定价表（sub2api PR #1120）。M2.5/GLM-4.7/GLM-5/Kimi 定价已存在。
- **T15** — 数组内容规范化：`openai-to-claude.ts` 中的 `normalizeContentToString()` 辅助函数正确地将数组格式化的系统/工具消息折叠为字符串，然后再发送给 Anthropic。

### 🧪 测试

- 测试套件：**832 个测试，0 失败**（与 rc.5 持平）

---

## [3.0.0-rc.5] - 2026-03-22

### ✨ 新特性

- **#464** — Registered Keys Provisioning API：自动签发 API key，支持按提供商和账户进行配额限制
  - `POST /api/v1/registered-keys` — 签发 key，支持幂等性
  - `GET /api/v1/registered-keys` — 列出已注册 key（脱敏）
  - `GET /api/v1/registered-keys/{id}` — 获取 key 元数据
  - `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — 吊销 key
  - `GET /api/v1/quotas/check` — 签发前预检
  - `PUT /api/v1/providers/{id}/limits` — 设置提供商签发限制
  - `PUT /api/v1/accounts/{id}/limits` — 设置账户签发限制
  - `POST /api/v1/issues/report` — 可选的 GitHub issue 报告
  - 数据库迁移 008：`registered_keys`、`provider_key_limits`、`account_key_limits` 表

---

## [3.0.0-rc.4] - 2026-03-22

### ✨ 新特性

- **#530 (PR)** — 新增 OpenCode Zen 和 OpenCode Go 提供商（by @kang-heewon）
  - 新的 `OpencodeExecutor`，支持多格式路由（`/chat/completions`、`/messages`、`/responses`）
  - 两个层级共 7 个模型

---

## [3.0.0-rc.3] - 2026-03-22

### ✨ 新特性

- **#529** — 提供商图标现在使用 [@lobehub/icons](https://github.com/lobehub/lobe-icons)，支持优雅的 PNG 回退和 `ProviderIcon` 组件（支持 130+ 个提供商）
- **#488** — 每 24 小时通过 `modelSyncScheduler` 自动更新模型列表（可通过 `MODEL_SYNC_INTERVAL_HOURS` 配置）

### 🔧 Bug 修复

- **#537** — Gemini CLI OAuth：在 Docker/自托管部署中缺少 `GEMINI_OAUTH_CLIENT_SECRET` 时，现在会显示清晰且可操作的错误提示

---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug 修复

- **#536** — LongCat AI key 验证：修复了 baseUrl（`api.longcat.chat/openai`）和 authHeader（`Authorization: Bearer`）
- **#535** — 固定模型覆盖：当 context-cache 保护检测到固定模型时，`body.model` 现在设置为 `pinnedModel`
- **#524** — OpenCode 配置现在正确保存：添加了 `saveOpenCodeConfig()` 处理器（XDG_CONFIG_HOME 感知，写入 TOML 格式）

---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug 修复

- **#521** — 跳过密码设置后登录不再卡死（重定向到引导页面）
- **#522** — API Manager：移除了具有误导性的 "Copy masked key" 按钮（替换为锁图标提示）
- **#527** — Claude Code + Codex 超级能力循环：`tool_result` 块现在转换为文本而不是被丢弃
- **#532** — OpenCode GO API key 验证现在使用正确的 `zen/v1` 端点（`testKeyBaseUrl`）
- **#489** — Antigravity：缺少 `googleProjectId` 时返回结构化的 422 错误，附带重新连接指导
- **#510** — Windows：MSYS2/Git-Bash 路径（`/c/Program Files/...`）现在自动规范化为 `C:\\Program Files\\...`
- **#492** — `omniroute` CLI 现在在 `app/server.js` 缺失时能检测 `mise`/`nvm`，并显示针对性的修复说明

### 📖 文档

- **#513** —— Docker 密码重置：记录了 `INITIAL_PASSWORD` 环境变量解决方案
- **#520** —— pnpm：记录了 `pnpm approve-builds better-sqlite3` 步骤

### ✅ 已关闭的问题

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532

---

## [2.9.5] — 2026-03-22

> Sprint：新增 OpenCode 提供商、embedding 凭证修复、CLI 脱敏 key bug、CACHE_TAG_PATTERN 修复。

### 🐛 Bug 修复

- **CLI 工具将脱敏 API key 保存到配置文件** — `claude-settings`、`cline-settings` 和 `openclaw-settings` POST 路由现在接受 `keyId` 参数，并在写入磁盘前从数据库解析真实 API key。`ClaudeToolCard` 更新为发送 `keyId` 而不是脱敏显示字符串。修复 #523、#526。
- **自定义 embedding 提供商：`No credentials` 错误** — `/v1/embeddings` 现在将 `credentialsProviderId` 与路由前缀分开跟踪，因此凭证从匹配的提供商节点 ID 获取，而不是从公开前缀字符串获取。修复了一个回归问题：`google/gemini-embedding-001` 和类似的自定义提供商模型总是会因凭证错误而失败。修复 #532 相关问题。（PR #528 by @jacob2826）
- **Context 缓存保护正则表达式遗漏 `\n` 前缀** — `comboAgentMiddleware.ts` 中的 `CACHE_TAG_PATTERN` 更新为同时匹配字面量 `\n`（反斜杠-n）和实际的换行符 U+000A，`combo.ts` 流式传输在修复 #515 后会在 `<omniModel>` 标签周围注入这些字符。修复 #531。

### ✨ 新提供商

- **OpenCode Zen** — 免费层网关位于 `opencode.ai/zen/v1`，提供 3 个模型：`minimax-m2.5-free`、`big-pickle`、`gpt-5-nano`
- **OpenCode Go** — 订阅服务位于 `opencode.ai/zen/go/v1`，提供 4 个模型：`glm-5`、`kimi-k2.5`、`minimax-m2.7`（Claude 格式）、`minimax-m2.5`（Claude 格式）
- 两个提供商都使用新的 `OpencodeExecutor`，根据请求的模型动态路由到 `/chat/completions`、`/messages`、`/responses` 或 `/models/{model}:generateContent`。（PR #530 by @kang-heewon）

---

## [2.9.4] — 2026-03-21

> Sprint：Bug 修复 — 保留 Codex prompt 缓存 key、修复 tagContent JSON 转义、将过期 token 状态同步回数据库。

### 🐛 Bug 修复

- **fix(translator)**：在 Responses API → Chat Completions 翻译中保留 `prompt_cache_key`（#517）
  — 该字段是 Codex 使用的缓存亲和性信号；剥离它会阻止 prompt 缓存命中。
  在 `openai-responses.ts` 和 `responsesApiHelper.ts` 中修复。

- **fix(combo)**：转义 `tagContent` 中的 `\n`，使注入的 JSON 字符串有效（#515）
  — 模板字面量换行符（U+000A）不允许在 JSON 字符串值中不转义使用。
  在 `open-sse/services/combo.ts` 中替换为 `\\n` 字面量序列。

- **fix(usage)**：在实时认证失败时将过期 token 状态同步回数据库（#491）
  — 当 Limits & Quotas 实时检查返回 401/403 时，连接的 `testStatus` 现在会更新
  为数据库中的 `"expired"`，以便提供商页面反映相同的降级状态。
  在 `src/app/api/usage/[connectionId]/route.ts` 中修复。

---

## [2.9.3] — 2026-03-21

> Sprint：新增 5 个免费 AI 提供商 — LongCat、Pollinations、Cloudflare AI、Scaleway、AI/ML API。

### ✨ 新提供商

- **feat(providers/longcat)**：新增 LongCat AI（`lc/`）— 公测期间每天 5000 万 tokens 免费（Flash-Lite）+ 50 万/天（Chat/Thinking）。OpenAI 兼容，标准 Bearer 认证。
- **feat(providers/pollinations)**：新增 Pollinations AI（`pol/`）— 无需 API key。代理 GPT-5、Claude、Gemini、DeepSeek V3、Llama 4（1 次/15 秒免费）。自定义执行器处理可选认证。
- **feat(providers/cloudflare-ai)**：新增 Cloudflare Workers AI（`cf/`）— 每天 10K Neurons 免费（约 150 次 LLM 响应或 500 秒 Whisper 音频）。全球边缘 50+ 模型。自定义执行器从凭证中构建带 `accountId` 的动态 URL。
- **feat(providers/scaleway)**：新增 Scaleway 生成式 API（`scw/`）— 新账户 100 万免费 tokens。符合 EU/GDPR（巴黎）。Qwen3 235B、Llama 3.1 70B、Mistral Small 3.2。
- **feat(providers/aimlapi)**：新增 AI/ML API（`aiml/`）— 每天 $0.025 免费额度，200+ 模型（GPT-4o、Claude、Gemini、Llama），通过单一聚合端点。

### 🔄 提供商更新

- **feat(providers/together)**：新增 `hasFree: true` + 3 个永久免费模型 ID：`Llama-3.3-70B-Instruct-Turbo-Free`、`Llama-Vision-Free`、`DeepSeek-R1-Distill-Llama-70B-Free`
- **feat(providers/gemini)**：新增 `hasFree: true` + `freeNote`（每天 1500 次请求，无需信用卡，aistudio.google.com）
- **chore(providers/gemini)**：将显示名称重命名为 `Gemini (Google AI Studio)` 以提高清晰度

### ⚙️ 基础设施

- **feat(executors/pollinations)**：新增 `PollinationsExecutor` — 未提供 API key 时省略 `Authorization` 请求头
- **feat(executors/cloudflare-ai)**：新增 `CloudflareAIExecutor` — 动态 URL 构建需要提供商凭证中的 `accountId`
- **feat(executors)**：注册 `pollinations`、`pol`、`cloudflare-ai`、`cf` 执行器映射

### 📝 文档

- **docs(readme)**：将免费 combo 栈扩展到 11 个提供商（永久 $0）
- **docs(readme)**：新增 4 个免费提供商部分（LongCat、Pollinations、Cloudflare AI、Scaleway），附带模型表
- **docs(readme)**：更新定价表，新增 4 个免费层行
- **docs(i18n/pt-BR)**：更新定价表 + 新增葡萄牙语的 LongCat/Pollinations/Cloudflare AI/Scaleway 部分
- **docs(new-features/ai)**：10 个任务规范文件 + 主实现计划，位于 `docs/new-features/ai/`

### 🧪 测试

- 测试套件：**821 个测试，0 失败**（不变）

---

## [2.9.2] — 2026-03-21

> Sprint：修复媒体转录（Deepgram/HuggingFace Content-Type、语言检测）和 TTS 错误显示。

### 🐛 Bug 修复

- **fix(transcription)**：Deepgram 和 HuggingFace 音频转录现在通过新的 `resolveAudioContentType()` 辅助函数正确映射 `video/mp4` → `audio/mp4` 及其他媒体 MIME 类型。此前上传 `.mp4` 文件始终返回 "No speech detected"，因为 Deepgram 收到的是 `Content-Type: video/mp4`。
- **fix(transcription)**：向 Deepgram 请求添加了 `detect_language=true` —— 自动检测音频语言（葡萄牙语、西班牙语等），而不是默认使用英语。修复了非英语转录返回空或垃圾结果的问题。
- **fix(transcription)**：向 Deepgram 请求添加了 `punctuate=true`，用于更高质量的转录输出，带有正确的标点符号。
- **fix(tts)**：修复了 `audioSpeech.ts` 和 `audioTranscription.ts` 中 Text-to-Speech 响应的 `[object Object]` 错误显示。`upstreamErrorResponse()` 函数现在正确地从 ElevenLabs 等提供商返回的嵌套错误消息（如 `{ error: { message: "...", status_code: 401 } }`）中提取字符串消息，而不是扁平错误字符串。

### 🧪 测试

- 测试套件：**821 个测试，0 失败**（不变）

### 问题分类

- **#508** — 工具调用格式回归：请求代理日志和提供商链信息（`needs-info`）
- **#510** — Windows CLI 健康检查路径：请求 shell/Node 版本信息（`needs-info`）
- **#485** — Kiro MCP 工具调用：作为外部 Kiro 问题关闭（非 OmniRoute）
- **#442** — Baseten /models 端点：已关闭（记录了手动解决方案）
- **#464** — Key provisioning API：确认为路线图项目

---

## [2.9.1] — 2026-03-21

> Sprint：修复 SSE omniModel 数据丢失，合并每协议模型兼容性。

### Bug 修复

- **#511** — 关键问题：`<omniModel>` 标签在 SSE 流中在 `finish_reason:stop` 之后发送，导致数据丢失。现在标签会注入到首个非空内容 chunk 中，确保在 SDK 关闭连接之前完成交付。

### 已合并的 PR

- **PR #512**（@zhangqiang8vip）：每协议模型兼容性 — `normalizeToolCallId` 和 `preserveOpenAIDeveloperRole` 现在可以按客户端协议（OpenAI、Claude、Responses API）配置。模型配置中新增 `compatByProtocol` 字段，带 Zod 验证。

### 问题分类

- **#510** — Windows CLI healthcheck_failed：请求 PATH/version 信息
- **#509** — Turbopack Electron 回归：上游 Next.js bug，已记录解决方案
- **#508** — macOS 黑屏：建议 `--disable-gpu` 解决方案

---

## [2.9.0] — 2026-03-20

> Sprint：跨平台 machineId 修复、每 API key 限流、流式 context 缓存、Alibaba DashScope、搜索分析、ZWS v5 以及 8 个问题已关闭。

### ✨ 新特性

- **feat(search)**：`/dashboard/analytics` 中的搜索分析标签页 —— 提供商拆分、缓存命中率、成本跟踪。新 API：`GET /api/v1/search/analytics`（#feat/search-provider-routing）
- **feat(provider)**：新增 Alibaba Cloud DashScope，带自定义端点路径验证 —— 每个节点可配置 `chatPath` 和 `modelsPath`（#feat/custom-endpoint-paths）
- **feat(api)**：每 API key 请求数限制 —— `max_requests_per_day` 和 `max_requests_per_minute` 列，通过内存滑动窗口强制执行，返回 HTTP 429（#452）
- **feat(dev)**：ZWS v5 —— HMR 泄漏修复（485 个数据库连接 → 1），内存 2.4GB → 195MB，`globalThis` 单例，Edge Runtime 警告修复（@zhangqiang8vip）

### 🐛 Bug 修复

- **fix(#506)**：跨平台 `machineId` —— `getMachineIdRaw()` 使用 try/catch 瀑布重写（Windows REG.exe → macOS ioreg → Linux 文件读取 → hostname → `os.hostname()`）。消除了 Next.js 打包器死代码消除的 `process.platform` 分支，修复了 Windows 上的 `'head' is not recognized` 问题。同时修复 #466。
- **fix(#493)**：自定义提供商模型命名 —— 移除了 `DefaultExecutor.transformRequest()` 中不正确的前缀剥离，该问题破坏了 `zai-org/GLM-5-FP8` 等组织范围的模型 ID。
- **fix(#490)**：流式 + context 缓存保护 —— `TransformStream` 拦截 SSE 以在 `[DONE]` 标记之前注入 `<omniModel>` 标签，实现流式响应的 context 缓存保护。
- **fix(#458)**：Combo schema 验证 —— `system_message`、`tool_filter_regex`、`context_cache_protection` 字段现在在保存时通过 Zod 验证。
- **fix(#487)**：KIRO MITM 卡片清理 —— 移除 ZWS_README，将 `AntigravityToolCard` 泛化以使用动态工具元数据。

### 🧪 测试

- 添加了 Anthropic 格式工具过滤器单元测试（PR #397）—— 8 个回归测试，用于不带 `.function` 包装的 `tool.name`
- 测试套件：**821 个测试，0 失败**（从 813 增加）

### 📋 已关闭的问题（8 个）

- **#506** —— Windows machineId `head` 无法识别（已修复）
- **#493** —— 自定义提供商模型命名（已修复）
- **#490** —— 流式 context 缓存（已修复）
- **#452** —— 每 API key 请求限制（已实现）
- **#466** —— Windows 登录失败（与 #506 相同根因）
- **#504** —— MITM 未激活（预期行为）
- **#462** —— Gemini CLI PSA（已解决）
- **#434** —— Electron 应用崩溃（#402 的重复）

## [2.8.9] — 2026-03-20

> Sprint：合并社区 PR、修复 KIRO MITM 卡片、依赖更新。

### 已合并的 PR

- **PR #498**（@Sajid11194）：修复 Windows 机器 ID 崩溃（`undefined\REG.exe`）。使用原生 OS 注册表查询替换 `node-machine-id`。**关闭 #486。**
- **PR #497**（@zhangqiang8vip）：修复开发模式 HMR 资源泄漏 —— 485 个泄漏的数据库连接 → 1，内存 2.4GB → 195MB。`globalThis` 单例、Edge Runtime 警告修复、Windows 测试稳定性。（22 个文件，+1168/-338）
- **PR #499-503**（Dependabot）：GitHub Actions 更新 —— `docker/build-push-action@7`、`actions/checkout@6`、`peter-evans/dockerhub-description@5`、`docker/setup-qemu-action@4`、`docker/login-action@4`。

### Bug 修复

- **#505** —— KIRO MITM 卡片现在显示特定工具的说明（`api.anthropic.com`），而不是 Antigravity 特定的文本。
- **#504** —— 回复了 UX 澄清说明（当代理未运行时，MITM "Inactive" 是预期行为）。

---

## [2.8.8] — 2026-03-20

> Sprint：修复 OAuth 批量测试崩溃，为各个提供商页面添加 "Test All" 按钮。

### Bug 修复

- **OAuth 批量测试崩溃**（ERR_CONNECTION_REFUSED）：将顺序 for-loop 替换为 5 连接并发限制 + 每个连接 30 秒超时，通过 `Promise.race()` + `Promise.allSettled()` 实现。防止在测试大型 OAuth 提供商组（约 30+ 连接）时服务器崩溃。

### 新特性

- **各提供商页面的 "Test All" 按钮**：各个提供商页面（如 `/providers/codex`）现在有 2+ 连接时会在 Connections 标题处显示 "Test All" 按钮。使用 `POST /api/providers/test-batch` 和 `{mode: "provider", providerId}`。结果在模态框中显示，包含通过/失败摘要和每个连接的诊断信息。

---

## [2.8.7] — 2026-03-20

> Sprint：合并 PR #495（Bottleneck 429 丢弃）、修复 #496（自定义 embedding 提供商）、分类功能。

### Bug 修复

- **Bottleneck 429 无限等待**（PR #495 by @xandr0s）：收到 429 时，`limiter.stop({ dropWaitingJobs: true })` 立即使所有排队的请求失败，以便上游调用方可以触发回退。Limiter 从 Map 中删除，以便下一个请求创建新实例。
- **自定义 embedding 模型无法解析**（#496）：`POST /v1/embeddings` 现在从所有提供商节点解析自定义 embedding 模型（而不仅仅是 localhost）。支持通过仪表盘添加的 `google/gemini-embedding-001` 等模型。

### 已回复的问题

- **#452** —— 每 API key 请求数限制（已确认，在路线图中）
- **#464** —— 自动签发 API key，带提供商/账户限制（需要更多细节）
- **#488** —— 自动更新模型列表（已确认，在路线图中）
- **#496** —— 自定义 embedding 提供商解析（已修复）

---

## [2.8.6] — 2026-03-20

> Sprint：合并 PR #494（MiniMax 角色修复）、修复 KIRO MITM 仪表盘、分类 8 个问题。

### 新特性

- **MiniMax developer→system 角色修复**（PR #494 by @zhangqiang8vip）：每模型 `preserveDeveloperRole` 开关。在提供商页面新增 "Compatibility" UI。修复 MiniMax 和类似网关的 422 "role param error"。
- **roleNormalizer**：`normalizeDeveloperRole()` 现在接受 `preserveDeveloperRole` 参数，支持三态行为（undefined=保持、true=保持、false=转换）。
- **数据库**：在 `models.ts` 中新增 `getModelPreserveOpenAIDeveloperRole()` 和 `mergeModelCompatOverride()`。

### Bug 修复

- **KIRO MITM 仪表盘**（#481/#487）：`CLIToolsPageClient` 现在将任何 `configType: "mitm"` 工具路由到 `AntigravityToolCard`（MITM 开始/停止控制）。此前只有 Antigravity 是硬编码的。
- **AntigravityToolCard 泛化**：使用 `tool.image`、`tool.description`、`tool.id` 而不是硬编码的 Antigravity 值。防止缺少 `defaultModels` 时出错。

### 清理

- 移除了 `ZWS_README_V2.md`（PR #494 中的仅开发文档）。

### 已分类的问题（8 个）

- **#487** —— 已关闭（KIRO MITM 在此版本中修复）
- **#486** —— 需要信息（Windows REG.exe PATH 问题）
- **#489** —— 需要信息（Antigravity projectId 缺失，需要 OAuth 重新连接）
- **#492** —— 需要信息（缺少 app/server.js，在 mise 管理的 Node 中）
- **#490** —— 已确认（流式 + context 缓存阻塞，计划修复）
- **#491** —— 已确认（Codex 认证状态不一致）
- **#493** —— 已确认（模态框提供商模型名称前缀，已提供解决方案）
- **#488** —— 功能请求待办（自动更新模型列表）

---

## [2.8.5] — 2026-03-19

> Sprint：修复僵尸 SSE 流、context 缓存首轮、KIRO MITM 以及分类 5 个外部问题。

### Bug 修复

- **僵尸 SSE 流**（#473）：将 `STREAM_IDLE_TIMEOUT_MS` 从 300 秒降低到 120 秒，以便在提供商中途挂起时更快回退。可通过环境变量配置。
- **Context 缓存标签**（#474）：修复 `injectModelTag()` 以处理首轮请求（无助手消息）—— context 缓存保护现在从第一个响应开始就生效。
- **KIRO MITM**（#481）：将 KIRO `configType` 从 `guide` 改为 `mitm`，以便仪表盘渲染 MITM 开始/停止控制。
- **E2E 测试**（CI）：修复 `providers-bailian-coding-plan.spec.ts` —— 在点击添加 API Key 按钮之前关闭预先存在的模态框覆盖层。

### 已关闭的问题

- #473 —— 僵尸 SSE 流绕过 combo 回退
- #474 —— Context 缓存 `<omniModel>` 标签在首轮缺失
- #481 —— KIRO 的 MITM 无法从仪表盘激活
- #468 —— Gemini CLI 远程服务器（已被 #462 弃用取代）
- #438 —— Claude 无法写入文件（外部 CLI 问题）
- #439 —— AppImage 无法工作（已记录 libfuse2 解决方案）
- #402 —— ARM64 DMG "损坏"（已记录 xattr -cr 解决方案）
- #460 —— CLI 在 Windows 上无法运行（已记录 PATH 修复方案）

---

## [2.8.4] — 2026-03-19

> Sprint：Gemini CLI 弃用、VM 指南 i18n 修复、dependabot 安全修复、提供商 schema 扩展。

### 新特性

- **Gemini CLI 弃用**（#462）：将 `gemini-cli` 提供商标记为已弃用，附带警告 —— Google 从 2026 年 3 月起限制第三方 OAuth 使用
- **提供商 Schema**（#462）：扩展 Zod 验证，新增 `deprecated`、`deprecationReason`、`hasFree`、`freeNote`、`authHint`、`apiHint` 可选字段

### Bug 修复

- **VM 指南 i18n**（#471）：将 `VM_DEPLOYMENT_GUIDE.md` 添加到 i18n 翻译流水线，从英文源重新生成所有 30 个语言的翻译（此前卡在葡萄牙语版本）

### 安全

- **deps**：将 `flatted` 从 3.3.3 升级到 3.4.2 —— 修复 CWE-1321 原型污染（#484，@dependabot）

### 已关闭的问题

- #472 —— Model Aliases 回归（已在 v2.8.2 修复）
- #471 —— VM 指南翻译损坏
- #483 —— `[DONE]` 后尾随 `data: null`（已在 v2.8.3 修复）

### 已合并的 PR

- #484 —— deps: 将 flatted 从 3.3.3 升级到 3.4.2（@dependabot）

---

## [2.8.3] — 2026-03-19

> Sprint：捷克语 i18n、SSE 协议修复、VM 指南翻译。

### 新特性

- **捷克语**（#482）：完整捷克语（cs）i18n —— 22 份文档，2606 条 UI 字符串，语言切换器更新（@zen0bit）
- **VM 部署指南**：从葡萄牙语翻译为英文作为源文档（@zen0bit）

### Bug 修复

- **SSE 协议**（#483）：停止在 `[DONE]` 信号后发送尾随的 `data: null` —— 修复严格 AI SDK 客户端（基于 Zod 的验证器）中的 `AI_TypeValidationError`

### 已合并的 PR

- #482 —— 新增捷克语 + 修复 VM_DEPLOYMENT_GUIDE.md 英文源（@zen0bit）

---

## [2.8.2] — 2026-03-19

> Sprint：2 个已合并 PR、模型 aliases 路由修复、日志导出和问题分类。

### 新特性

- **日志导出**：`/dashboard/logs` 中新增导出按钮，带时间范围下拉（1h、6h、12h、24h）。通过 `/api/logs/export` API 下载请求/代理/call 日志的 JSON（#user-request）

### Bug 修复

- **Model Aliases 路由**（#472）：设置 → Model Aliases 现在正确影响提供商路由，而不仅仅是格式检测。此前 `resolveModelAlias()` 的输出仅用于 `getModelTargetFormat()`，但原始模型 ID 被发送给提供商
- **Stream Flush 用量**（#480）：缓冲区中最后一个 SSE 事件的用量数据现在在流刷新期间正确提取（合并自 @prakersh）

### 已合并的 PR

- #480 —— 在 flush handler 中从剩余缓冲区提取用量（@prakersh）
- #479 —— 添加缺失的 Codex 5.3/5.4 和 Anthropic 模型 ID 定价条目（@prakersh）

---

## [2.8.1] — 2026-03-19

> Sprint：5 个社区 PR —— 流式 call log 修复、Kiro 兼容性、缓存 token 分析、中文翻译和可配置工具调用 ID。

### ✨ 新特性

- **feat(logs)**：Call log 响应内容现在在翻译前正确从原始提供商 chunk（OpenAI/Claude/Gemini）累积，修复流式模式下空响应负载的问题（#470，@zhangqiang8vip）
- **feat(providers)**：每模型可配置的 9 字符工具调用 ID 规范化（Mistral 风格）—— 只有启用该选项的模型才会获得截断 ID（#470）
- **feat(api)**：Key PATCH API 扩展以支持 `allowedConnections`、`name`、`autoResolve`、`isActive` 和 `accessSchedule` 字段（#470）
- **feat(dashboard)**：请求日志详情 UI 采用响应优先布局（#470）
- **feat(i18n)**：改进了中文（zh-CN）翻译 —— 完整重译（#475，@only4copilot）

### 🐛 Bug 修复

- **fix(kiro)**：从请求体中剥离注入的 `model` 字段 —— Kiro API 拒绝未知的顶级字段（#478，@prakersh）
- **fix(usage)**：在用量历史输入总计中包含缓存读取 + 缓存创建 token，用于准确的分析（#477，@prakersh）
- **fix(callLogs)**：支持 Claude 格式用量字段（`input_tokens`/`output_tokens`）以及 OpenAI 格式，包含所有缓存 token 变体（#476，@prakersh）

---

## [2.8.0] — 2026-03-19

> Sprint：Bailian Coding Plan 提供商，带可编辑基础 URL，以及 Alibaba Cloud 和 Kimi Coding 的社区贡献。

### ✨ 新特性

- **feat(providers)**：新增 Bailian Coding Plan（`bailian-coding-plan`）—— Alibaba Model Studio，使用 Anthropic 兼容 API。8 个模型的静态目录，包括 Qwen3.5 Plus、Qwen3 Coder、MiniMax M2.5、GLM 5 和 Kimi K2.5。包含自定义认证验证（400=有效，401/403=无效）（#467，@Mind-Dragon）
- **feat(admin)**：提供商管理员创建/编辑流程中可编辑的默认 URL —— 用户可以为每个连接配置自定义基础 URL。持久化到 `providerSpecificData.baseUrl`，使用 Zod schema 验证拒绝非 http(s) 方案（#467）

### 🧪 测试

- 为 Bailian Coding Plan 提供商添加了 30+ 单元测试和 2 个 e2e 场景，覆盖认证验证、schema 强化、路由级行为和跨层集成

---

## [2.7.10] — 2026-03-19

> Sprint：两个社区贡献的提供商（Alibaba Cloud Coding、Kimi Coding API-key）和 Docker pino 修复。

### ✨ 新特性

- **feat(providers)**：新增 Alibaba Cloud Coding Plan 支持，使用两个 OpenAI 兼容端点 —— `alicode`（中国）和 `alicode-intl`（国际），每个端点 8 个模型（#465，@dtk1985）
- **feat(providers)**：新增专用的 `kimi-coding-apikey` 提供商路径 —— 基于 API key 的 Kimi Coding 访问不再强制通过仅 OAuth 的 `kimi-coding` 路由。包括注册表、常量、模型 API、配置和验证测试（#463，@Mind-Dragon）

### 🐛 Bug 修复

- **fix(docker)**：为 Docker 镜像添加了缺失的 `split2` 依赖 —— `pino-abstract-transport` 在运行时需要它，但未被复制到独立容器中，导致 `Cannot find module 'split2'` 崩溃（#459）

---

## [2.7.9] — 2026-03-18

> Sprint：Codex 响应子路径透传原生支持、Windows MITM 崩溃修复和 Combos agent schema 调整。

### ✨ 新特性

- **feat(codex)**：Codex 原生响应子路径透传 —— 原生将 `POST /v1/responses/compact` 路由到 Codex 上游，在不剥离 `/compact` 后缀的情况下保持 Claude Code 兼容性（#457）

### 🐛 Bug 修复

- **fix(combos)**：Zod schema（`updateComboSchema` 和 `createComboSchema`）现在包含 `system_message`、`tool_filter_regex` 和 `context_cache_protection`。修复了通过仪表盘创建的代理特定设置被后端验证层静默丢弃的 bug（#458）
- **fix(mitm)**：修复 Windows 上 Kiro MITM 配置崩溃 —— `node-machine-id` 因缺少 `REG.exe` 环境失败，且回退抛出了致命的 `crypto is not defined` 错误。回退现在安全正确地导入 crypto（#456）

---

## [2.7.8] — 2026-03-18

> Sprint：预算保存 bug + combo agent 功能 UI + omniModel 标签安全修复。

### 🐛 Bug 修复

- **fix(budget)**："Save Limits" 不再返回 422 —— `warningThreshold` 现在正确作为分数（0–1）发送，而不是百分比（0–100）（#451）
- **fix(combos)**：`<omniModel>` 内部缓存标签现在在转发请求给提供商之前被剥离，防止缓存会话中断（#454）

### ✨ 新特性

- **feat(combos)**：在 combo 创建/编辑模态框中新增 Agent Features 部分 —— 直接从仪表盘暴露 `system_message` 覆盖、`tool_filter_regex` 和 `context_cache_protection`（#454）

---

## [2.7.7] — 2026-03-18

> Sprint：Docker pino 崩溃、Codex CLI 响应 worker 修复、package-lock 同步。

### 🐛 Bug 修复

- **fix(docker)**：`pino-abstract-transport` 和 `pino-pretty` 现在在 Docker runner 阶段显式复制 —— Next.js 独立跟踪遗漏这些对等依赖，导致启动时 `Cannot find module pino-abstract-transport` 崩溃（#449）
- **fix(responses)**：从 `/v1/responses` 路由中移除 `initTranslators()` —— 导致 Next.js worker 崩溃，出现 `the worker has exited` 未捕获异常，在 Codex CLI 请求中（#450）

### 🔧 维护

- **chore(deps)**：`package-lock.json` 现在在每次版本升级时提交，以确保 Docker `npm ci` 使用精确的依赖版本

---

## [2.7.5] — 2026-03-18

> Sprint：UX 改进和 Windows CLI 健康检查修复。

### 🐛 Bug 修复

- **fix(ux)**：在登录页面显示默认密码提示 —— 新用户现在会在密码输入框下方看到 `"Default password: 123456"`（#437）
- **fix(cli)**：Claude CLI 和其他 npm 安装的工具现在在 Windows 上正确检测为可运行 —— spawn 使用 `shell:true` 以解决通过 PATHEXT 的 `.cmd` 包装器问题（#447）

---

## [2.7.4] — 2026-03-18

> Sprint：搜索工具仪表盘、i18n 修复、Copilot 限制、Serper 验证修复。

### 🚀 新特性

- **feat(search)**：新增搜索游乐场（第 10 个端点）、搜索工具页面，包含提供商比较/重排序流水线/搜索历史、本地重排序路由、搜索 API 认证守卫（#443 by @Regis-RCR）
  - 新路由：`/dashboard/search-tools`
  - 调试部分下的侧边栏条目
  - `GET /api/search/providers` 和 `GET /api/search/stats`，带认证守卫
  - 本地提供商节点路由，用于 `/v1/rerank`
  - 搜索命名空间中 30+ i18n 键

### 🐛 Bug 修复

- **fix(search)**：修复 Brave 新闻规范化器（此前返回 0 个结果），在规范化后强制执行 max_results 截断，修复端点页面获取 URL（#443 by @Regis-RCR）
- **fix(analytics)**：本地化分析日/期标签 —— 用 `Intl.DateTimeFormat(locale)` 替换硬编码的葡萄牙语字符串（#444 by @hijak）
- **fix(copilot)**：修正 GitHub Copilot 账户类型显示，从限制仪表盘过滤误导性的无限配额行（#445 by @hijak）
- **fix(providers)**：停止拒绝有效的 Serper API key —— 将非 4xx 响应视为有效认证（#446 by @hijak）

---

## [2.7.3] — 2026-03-18

> Sprint：Codex 直接 API 配额回退修复。

### 🐛 Bug 修复

- **fix(codex)**：在直接 API 回退中阻止每周已耗尽的账户（#440）
  - `resolveQuotaWindow()` 前缀匹配：`"weekly"` 现在匹配 `"weekly (7d)"` 缓存键
  - `applyCodexWindowPolicy()` 正确强制执行 `useWeekly`/`use5h` 开关
  - 4 个新回归测试（共 766 个）

---

## [2.7.2] — 2026-03-18

> Sprint：浅色模式 UI 对比度修复。

### 🐛 Bug 修复

- **fix(logs)**：修复请求日志过滤按钮和 combo 徽章的浅色模式对比度（#378）
  - 错误/成功/Combo 过滤按钮现在在浅色模式下可读
  - Combo 行徽章在浅色模式下使用更强的紫色

---

## [2.7.1] — 2026-03-17

> Sprint：统一 Web 搜索路由（POST /v1/search），使用 5 个提供商 + Next.js 16.1.7 安全修复（6 个 CVE）。

### ✨ 新特性

- **feat(search)**：统一 Web 搜索路由 —— `POST /v1/search`，使用 5 个提供商（Serper、Brave、Perplexity、Exa、Tavily）
  - 跨提供商自动故障转移，每月 6500+ 次免费搜索
  - 内存缓存，带请求合并（可配置 TTL）
  - 仪表盘：`/dashboard/analytics` 中的搜索分析标签页，包含提供商拆分、缓存命中率、成本跟踪
  - 新 API：`GET /api/v1/search/analytics`，用于搜索请求统计
  - 数据库迁移：`call_logs` 中的 `request_type` 列，用于非聊天请求追踪
  - Zod 验证（`v1SearchSchema`）、认证门控、通过 `recordCost()` 记录成本

### 🔒 安全

- **deps**：Next.js 16.1.6 → 16.1.7 —— 修复 6 个 CVE：
  - **严重**：CVE-2026-29057（通过 http-proxy 的 HTTP 请求走私）
  - **高**：CVE-2026-27977、CVE-2026-27978（WebSocket + Server Actions）
  - **中**：CVE-2026-27979、CVE-2026-27980、CVE-2026-jcc7

### 📁 新增文件

| 文件                                                             | 目的                                  |
| ---------------------------------------------------------------- | ------------------------------------- |
| `open-sse/handlers/search.ts`                                    | 搜索处理器，5 提供商路由              |
| `open-sse/config/searchRegistry.ts`                              | 提供商注册表（认证、成本、配额、TTL） |
| `open-sse/services/searchCache.ts`                               | 内存缓存，带请求合并                  |
| `src/app/api/v1/search/route.ts`                                 | Next.js 路由（POST + GET）            |
| `src/app/api/v1/search/analytics/route.ts`                       | 搜索统计 API                          |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | 分析仪表盘标签页                      |
| `src/lib/db/migrations/007_search_request_type.sql`              | 数据库迁移                            |
| `tests/unit/search-registry.test.mjs`                            | 277 行单元测试                        |

---

## [2.7.0] — 2026-03-17

> Sprint：受 ClawRouter 启发的功能 —— toolCalling 标志、多语言意图检测、基准驱动回退、请求去重、可插拔 RouterStrategy、Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5 定价。

### ✨ 新模型与定价

- **feat(pricing)**：xAI Grok-4 Fast —— `$0.20/$0.50 per 1M tokens`，1143ms p50 延迟，支持工具调用
- **feat(pricing)**：xAI Grok-4（标准）—— `$0.20/$1.50 per 1M tokens`，推理旗舰
- **feat(pricing)**：GLM-5（通过 Z.AI）—— `$0.5/1M`，128K 输出上下文
- **feat(pricing)**：MiniMax M2.5 —— `$0.30/1M input`，推理 + 代理任务
- **feat(pricing)**：DeepSeek V3.2 —— 更新定价 `$0.27/$1.10 per 1M`
- **feat(pricing)**：Kimi K2.5（通过 Moonshot API）—— 直接 Moonshot API 访问
- **feat(providers)**：新增 Z.AI 提供商（`zai` 别名）—— GLM-5 系列，使用 128K 输出

### 🧠 路由智能

- **feat(registry)**：提供商注册表中每模型的 `toolCalling` 标志 —— combo 现在可以偏好/要求支持工具调用的模型
- **feat(scoring)**：多语言意图检测，用于 AutoCombo 评分 —— PT/ZH/ES/AR 脚本/语言模式根据请求上下文影响模型选择
- **feat(fallback)**：基准驱动的回退链 —— 使用真实延迟数据（来自 `comboMetrics` 的 p50）动态重新排序回退优先级
- **feat(dedup)**：通过内容哈希的请求去重 —— 5 秒幂等窗口防止重复客户端重试导致的提供商调用
- **feat(router)**：`autoCombo/routerStrategy.ts` 中可插拔的 `RouterStrategy` 接口 —— 可以注入自定义路由逻辑，无需修改核心

### 🔧 MCP 服务器改进

- **feat(mcp)**：2 个新的高级工具 schema：`omniroute_get_provider_metrics`（每提供商 p50/p95/p99）和 `omniroute_explain_route`（路由决策解释）
- **feat(mcp)**：MCP 工具认证范围更新 —— 新增 `metrics:read` 范围，用于提供商指标工具
- **feat(mcp)**：`omniroute_best_combo_for_task` 现在接受 `languageHint` 参数，用于多语言路由

### 📊 可观测性

- **feat(metrics)**：扩展 `comboMetrics.ts`，使用每提供商/账户的实时延迟百分位追踪
- **feat(health)**：健康 API（`/api/monitoring/health`）现在返回每提供商的 `p50Latency` 和 `errorRate` 字段
- **feat(usage)**：用量历史迁移，用于每模型延迟追踪

### 🗄️ 数据库迁移

- **feat(migrations)**：`combo_metrics` 表中新增 `latency_p50` 列 —— 零破坏性，对现有用户安全

### 🐛 Bug 修复 / 关闭

- **close(#411)**：Windows 上 better-sqlite3 哈希模块解析 —— 已在 v2.6.10（f02c5b5）修复
- **close(#409)**：附加文件时 GitHub Copilot 聊天补全使用 Claude 模型失败 —— 已在 v2.6.9（838f1d6）修复
- **close(#405)**：#411 的重复 —— 已解决

## [2.6.10] — 2026-03-17

> Windows 修复：无需 node-gyp/Python/MSVC 的 better-sqlite3 预构建下载（#426）。

### 🐛 Bug 修复

- **fix(install/#426)**：在 Windows 上，`npm install -g omniroute` 此前会失败，报错 `better_sqlite3.node is not a valid Win32 application`，因为捆绑的原生二进制文件是为 Linux 编译的。在 `scripts/postinstall.mjs` 中新增 **策略 1.5**：使用 `@mapbox/node-pre-gyp install --fallback-to-build=false`（捆绑在 `better-sqlite3` 中）下载当前 OS/arch 的正确预构建二进制文件，无需任何构建工具（无需 node-gyp、Python、MSVC）。仅在下载失败时回退到 `npm rebuild`。新增平台特定的错误消息，附带清晰的手动修复说明。

---

## [2.6.9] — 2026-03-17

> CI 修复（t11 any-budget）、bug 修复 #409（通过 Copilot+Claude 的文件附件）、发布工作流修正。

### 🐛 Bug 修复

- **fix(ci)**：从 `openai-responses.ts` 和 `chatCore.ts` 的注释中移除单词 "any"，这些注释导致 t11 `\bany\b` 预算检查失败（正则计数注释时的误报）
- **fix(chatCore)**：在转发给提供商之前规范化不支持的内容部分类型（#409 —— Cursor 在附加 `.md` 文件时发送 `{type:"file"}`；Copilot 和其他 OpenAI 兼容提供商拒绝，报错 "type has to be either 'image_url' or 'text'"；修复将 `file`/`document` 块转换为 `text` 并丢弃未知类型）

### 🔧 工作流

- **chore(generate-release)**：新增原子提交规则 —— 版本升级（`npm version patch`）必须在提交功能文件之前发生，以确保标签始终指向包含所有版本变更的提交

---

## [2.6.8] — 2026-03-17

> Sprint：Combo 作为 Agent（系统提示词 + 工具过滤）、Context 缓存保护、自动更新、详细日志、MITM Kiro IDE。

### 🗄️ 数据库迁移（零破坏性 —— 对现有用户安全）

- **005_combo_agent_fields.sql**：`ALTER TABLE combos ADD COLUMN system_message TEXT DEFAULT NULL`，`tool_filter_regex TEXT DEFAULT NULL`，`context_cache_protection INTEGER DEFAULT 0`
- **006_detailed_request_logs.sql**：新增 `request_detail_logs` 表，使用 500 条目环形缓冲区触发器，通过设置开关选择加入

### ✨ 新特性

- **feat(combo)**：每 Combo 系统消息覆盖（#399 —— `system_message` 字段在转发给提供商之前替换或注入系统提示词）
- **feat(combo)**：每 Combo 工具过滤正则表达式（#399 —— `tool_filter_regex` 仅保留匹配模式的工具；支持 OpenAI + Anthropic 格式）
- **feat(combo)**：Context 缓存保护（#401 —— `context_cache_protection` 使用 `<omniModel>provider/model</omniModel>` 标记响应，并为会话连续性固定模型）
- **feat(settings)**：通过设置自动更新（#320 —— `GET /api/system/version` + `POST /api/system/update` —— 检查 npm 注册表并在后台更新，使用 pm2 重启）
- **feat(logs)**：详细请求日志（#378 —— 在 4 个阶段捕获完整的流水线体：客户端请求、翻译后的请求、提供商响应、客户端响应 —— 选择加入开关，64KB 裁剪，500 条目环形缓冲区）
- **feat(mitm)**：MITM Kiro IDE 配置（#336 —— `src/mitm/targets/kiro.ts` 目标为 api.anthropic.com，复用现有 MITM 基础设施）

---

## [2.6.7] — 2026-03-17

> Sprint：SSE 改进、本地提供商节点扩展、代理注册表、Claude 透传修复。

### ✨ 新特性

- **feat(health)**：本地 `provider_nodes` 的后台健康检查，使用指数退避（30s→300s）和 `Promise.allSettled` 以避免阻塞（#423，@Regis-RCR）
- **feat(embeddings)**：将 `/v1/embeddings` 路由到本地 `provider_nodes` —— `buildDynamicEmbeddingProvider()` 带主机名验证（#422，@Regis-RCR）
- **feat(audio)**：将 TTS/STT 路由到本地 `provider_nodes` —— `buildDynamicAudioProvider()` 带 SSRF 保护（#416，@Regis-RCR）
- **feat(proxy)**：代理注册表、管理 API 和配额限制泛化（#429，@Regis-RCR）

### 🐛 Bug 修复

- **fix(sse)**：当目标为 OpenAI 兼容时剥离 Claude 特定字段（`metadata`、`anthropic_version`）（#421，@prakersh）
- **fix(sse)**：在透传流模式中提取 Claude SSE 用量（`input_tokens`、`output_tokens`、缓存 token）（#420，@prakersh）
- **fix(sse)**：为工具调用生成回退 `call_id`，用于缺失/空 ID（#419，@prakersh）
- **fix(sse)**：Claude 到 Claude 透传 —— 完全未经修改地转发请求体，不重新翻译（#418，@prakersh）
- **fix(sse)**：在 Claude Code 上下文压缩后过滤孤立的 `tool_result` 项，以避免 400 错误（#417，@prakersh）
- **fix(sse)**：在 Responses API 翻译器中跳过空名称工具调用，以防止 `placeholder_tool` 无限循环（#415，@prakersh）
- **fix(sse)**：在翻译之前剥离空文本内容块（#427，@prakersh）
- **fix(api)**：为 Claude OAuth 测试配置添加 `refreshable: true`（#428，@prakersh）

### 📦 依赖

- 升级 `vitest`、`@vitest/*` 和相关 devDependencies（#414，@dependabot）

---

## [2.6.6] — 2026-03-17

> 热修复：Turbopack/Docker 兼容性 —— 从所有 `src/` 导入中移除 `node:` 协议。

### 🐛 Bug 修复

- **fix(build)**：从 `src/` 下 17 个文件的 `import` 语句中移除了 `node:` 协议前缀。`node:fs`、`node:path`、`node:url`、`node:os` 等导入在 Turbopack 构建（Next.js 15 Docker）中导致 `Ecmascript file had an error`，以及从较旧的 npm 全局安装升级时。受影响文件：`migrationRunner.ts`、`core.ts`、`backup.ts`、`prompts.ts`、`dataPaths.ts` 以及 `src/app/api/` 和 `src/lib/` 中的其他 12 个文件。
- **chore(workflow)**：更新了 `generate-release.md`，使 Docker Hub 同步和双 VPS 部署成为每次发布的 **强制** 步骤。

---

## [2.6.5] — 2026-03-17

> Sprint：推理模型参数过滤、本地提供商 404 修复、Kilo Gateway 提供商、依赖升级。

### ✨ 新特性

- **feat(api)**：新增 **Kilo Gateway**（`api.kilo.ai`）作为新的 API Key 提供商（别名 `kg`）—— 335+ 模型，6 个免费模型，3 个自动路由模型（`kilo-auto/frontier`、`kilo-auto/balanced`、`kilo-auto/free`）。透传模型通过 `/api/gateway/models` 端点支持。（PR #408 by @Regis-RCR）

### 🐛 Bug 修复

- **fix(sse)**：为推理模型（o1、o1-mini、o1-pro、o3、o3-mini）剥离不支持的参数。`o1`/`o3` 系列模型拒绝 `temperature`、`top_p`、`frequency_penalty`、`presence_penalty`、`logprobs`、`top_logprobs` 和 `n`，返回 HTTP 400。参数现在在转发前在 `chatCore` 层被剥离。使用每模型的声明式 `unsupportedParams` 字段和预计算的 O(1) Map 进行查找。（PR #412 by @Regis-RCR）
- **fix(sse)**：本地提供商 404 现在导致 **仅模型锁定（5 秒）**，而不是连接级锁定（2 分钟）。当本地推理后端（Ollama、LM Studio、oMLX）对未知模型返回 404 时，连接保持活跃，其他模型立即继续工作。同时修复了一个预先存在的 bug：`model` 未传递给 `markAccountUnavailable()`。通过主机名（`localhost`、`127.0.0.1`、`::1`，可通过 `LOCAL_HOSTNAMES` 环境变量扩展）检测本地提供商。（PR #410 by @Regis-RCR）

### 📦 依赖

- `better-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `agent-base` 7 → 8

---

## [2.6.4] — 2026-03-17

### 🐛 Bug 修复

- **fix(providers)**：移除了 5 个提供商中不存在的模型名称：
  - **gemini / gemini-cli**：移除了 `gemini-3.1-pro/flash` 和 `gemini-3-*-preview`（在 Google API v1beta 中不存在）；替换为 `gemini-2.5-pro`、`gemini-2.5-flash`、`gemini-2.0-flash`、`gemini-1.5-pro/flash`
  - **antigravity**：移除了 `gemini-3.1-pro-high/low` 和 `gemini-3-flash`（无效的内部别名）；替换为真实的 2.x 模型
  - **github (Copilot)**：移除了 `gemini-3-flash-preview` 和 `gemini-3-pro-preview`；替换为 `gemini-2.5-flash`
  - **nvidia**：修正了 `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct`（NVIDIA NIM 对 Meta 模型使用 `meta/` 命名空间）；新增了 `nvidia/llama-3.1-70b-instruct` 和 `nvidia/llama-3.1-405b-instruct`
- **fix(db/combo)**：更新了远程数据库中的 `free-stack` combo：移除了 `qw/qwen3-coder-plus`（刷新 token 过期），修正了 `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct`，修正了 `gemini/gemini-3.1-flash` → `gemini/gemini-2.5-flash`，新增了 `if/deepseek-v3.2`

---

## [2.6.3] — 2026-03-16

> Sprint：zod/pino hash-strip 烘焙到构建流水线中，新增 Synthetic 提供商，修正 VPS PM2 路径。

### 🐛 Bug 修复

- **fix(build)**：Turbopack hash-strip 现在在 **编译时** 对所有包运行 —— 不仅仅是 `better-sqlite3`。`prepublish.mjs` 中的步骤 5.6 遍历 `app/.next/server/` 中的每个 `.js` 文件，并从任何哈希化的 `require()` 中剥离 16 字符十六进制后缀。修复了全局 npm 安装中的 `zod-dcb22c...`、`pino-...` 等 MODULE_NOT_FOUND 问题。关闭 #398
- **fix(deploy)**：两个 VPS 上的 PM2 指向了过时的 git-clone 目录。重新配置为 npm 全局包中的 `app/server.js`。更新了 `/deploy-vps` 工作流，使用 `npm pack + scp`（npm 注册表拒绝 299MB 的包）。

### ✨ 新特性

- **feat(provider)**：Synthetic（[synthetic.new](https://synthetic.new)）—— 注重隐私的 OpenAI 兼容推理。`passthroughModels: true`，用于动态 HuggingFace 模型目录。初始模型：Kimi K2.5、MiniMax M2.5、GLM 4.7、DeepSeek V3.2。（PR #404 by @Regis-RCR）

### 📋 已关闭的问题

- **close #398**：npm hash 回归 —— 通过编译时 hash-strip 在 prepublish 中修复
- **triage #324**：没有步骤的 bug 截图 —— 请求重现详情

---

## [2.6.2] — 2026-03-16

> Sprint：模块哈希完全修复，合并 2 个 PR（Anthropic 工具过滤 + 自定义端点路径），新增 Alibaba Cloud DashScope 提供商，关闭 3 个陈旧问题。

### 🐛 Bug 修复

- **fix(build)**：扩展 webpack `externals` hash-strip 以覆盖所有 `serverExternalPackages`，而不仅仅是 `better-sqlite3`。Next.js 16 Turbopack 将 `zod`、`pino` 和其他服务器外部包哈希化为类似 `zod-dcb22c6336e0bc69` 的名称，这些名称在运行时不存在于 `node_modules` 中。HASH_PATTERN 正则捕获所有情况现在剥离 16 字符后缀并回退到基础包名。还在 `prepublish.mjs` 中添加了 `NEXT_PRIVATE_BUILD_WORKER=0` 以加强 webpack 模式，以及构建后扫描报告任何剩余的哈希引用。（#396、#398、PR #403）
- **fix(chat)**：Anthropic 格式的工具名称（不带 `.function` 包装的 `tool.name`）被 #346 引入的空名称过滤器静默丢弃。LiteLLM 代理请求在 Anthropic Messages API 格式中使用 `anthropic/` 前缀，导致所有工具被过滤，Anthropic 返回 `400: tool_choice.any may only be specified while providing tools`。通过在 `tool.function.name` 缺失时回退到 `tool.name` 修复。添加了 8 个回归单元测试。（PR #397）

### ✨ 新特性

- **feat(api)**：OpenAI 兼容提供商节点的自定义端点路径 —— 在提供商连接 UI 中为每个节点配置 `chatPath` 和 `modelsPath`（例如 `/v4/chat/completions`）。包括数据库迁移（`003_provider_node_custom_paths.sql`）和 URL 路径清理（无 `..` 遍历，必须以 `/` 开头）。（PR #400）
- **feat(provider)**：新增 Alibaba Cloud DashScope 作为 OpenAI 兼容提供商。国际端点：`dashscope-intl.aliyuncs.com/compatible-mode/v1`。12 个模型：`qwen-max`、`qwen-plus`、`qwen-turbo`、`qwen3-coder-plus/flash`、`qwq-plus`、`qwq-32b`、`qwen3-32b`、`qwen3-235b-a22b`。认证：Bearer API key。

### 📋 已关闭的问题

- **close #323**：Cline 连接错误 `[object Object]` —— 已在 v2.3.7 修复；指导用户从 v2.2.9 升级
- **close #337**：Kiro 积分追踪 —— 已在 v2.5.5（#381）实现；引导用户查看 Dashboard → Usage
- **triage #402**：ARM64 macOS DMG 损坏 —— 请求 macOS 版本、具体错误，并建议 `xattr -d com.apple.quarantine` 解决方案

---

## [2.6.1] — 2026-03-15

> 关键启动修复：v2.6.0 全局 npm 安装崩溃，出现 500 错误，原因是 Next.js 16 instrumentation hook 中的 Turbopack/webpack 模块名哈希 bug。

### 🐛 Bug 修复

- **fix(build)**：强制 `better-sqlite3` 在 webpack 服务器包中始终以其精确的包名被 require。Next.js 16 将 instrumentation hook 编译到单独的 chunk 中，并发出 `require('better-sqlite3-<hash>')` —— 一个不存在的哈希模块名在 `node_modules` 中 —— 即使该包列在 `serverExternalPackages` 中。为服务器 webpack 配置添加了显式的 `externals` 函数，使打包器始终发出 `require('better-sqlite3')`，解决了干净全局安装中的启动 `500 Internal Server Error`。（#394，PR #395）

### 🔧 CI

- **ci**：为 `npm-publish.yml` 添加了 `workflow_dispatch`，带版本同步保护，用于手动触发（#392）
- **ci**：为 `docker-publish.yml` 添加了 `workflow_dispatch`，将 GitHub Actions 更新到最新版本（#392）

---

## [2.6.0] - 2026-03-15

> 问题解决冲刺：4 个 bug 修复、日志 UX 改进、新增 Kiro 积分追踪。

### 🐛 Bug 修复

- **fix(media)**：未配置时 ComfyUI 和 SD WebUI 不再出现在媒体页面的提供商列表中 —— 挂载时获取 `/api/providers` 并隐藏没有连接的本地提供商（#390）
- **fix(auth)**：Round-robin 不再在冷却后立即重新选择受限账户 —— `backoffLevel` 现在用作 LRU 轮换中的主要排序键（#340）
- **fix(oauth)**：Qoder（和其他重定向到自己 UI 的提供商）不再让 OAuth 模态框卡在 "Waiting for Authorization" —— 弹窗关闭检测器自动切换到手动 URL 输入模式（#344）
- **fix(logs)**：请求日志表现在在浅色模式下可读 —— 状态徽章、token 计数和 combo 标签使用自适应 `dark:` 颜色类（#378）

### ✨ 新特性

- **feat(kiro)**：用量抓取器中新增 Kiro 积分追踪 —— 从 AWS CodeWhisperer 端点查询 `getUserCredits`（#337）

### 🛠 杂项

---

## [2.5.9] - 2026-03-15

> Codex 原生透传修复 + 路由体验证强化。

### 🐛 Bug 修复

- **fix(codex)**：为 Codex 客户端保留原生 Responses API 透传 —— 避免不必要的翻译变更（PR #387）
- **fix(api)**：验证 pricing/sync 和 task-routing 路由中的请求体 —— 防止畸形输入导致崩溃（PR #388）
- **fix(auth)**：JWT 密钥在重启间持久化，通过 `src/lib/db/secrets.ts` —— 消除 pm2 重启后的 401 错误（PR #388）

---

## [2.5.8] - 2026-03-15

> 构建修复：恢复因 v2.5.7 不完整发布而中断的 VPS 连接。

### 🐛 Bug 修复

- **fix(build)**：`scripts/prepublish.mjs` 仍使用已弃用的 `--webpack` 标志，导致 Next.js 独立构建静默失败 —— npm 发布时缺少 `app/server.js`，破坏了 VPS 部署

---

## [2.5.7] - 2026-03-15

> 媒体游乐场错误处理修复。

### 🐛 Bug 修复

- **fix(media)**：当音频不包含语音（音乐、静音）时，转录显示 "API Key Required" 误报 —— 现在显示 "No speech detected"
- **fix(media)**：`audioTranscription.ts` 和 `audioSpeech.ts` 中的 `upstreamErrorResponse` 现在返回正确的 JSON（`{error:{message}}`），使 MediaPageClient 能够正确检测 401/403 凭证错误
- **fix(media)**：`parseApiError` 现在处理 Deepgram 的 `err_msg` 字段，并在错误消息中检测 `"api key"`，用于准确的凭证错误分类

---

## [2.5.6] - 2026-03-15

> 关键安全/认证修复：Antigravity OAuth 损坏 + 重启后 JWT 会话丢失。

### 🐛 Bug 修复

- **fix(oauth) #384**：Antigravity Google OAuth 现在正确向 token 端点发送 `client_secret`。`ANTIGRAVITY_OAUTH_CLIENT_SECRET` 的回退是空字符串，为假值 —— 因此 `client_secret` 从未包含在请求中，导致所有没有自定义环境变量的用户出现 `"client_secret is missing"` 错误。关闭 #383。
- **fix(auth) #385**：`JWT_SECRET` 现在在首次生成时持久化到 SQLite（`namespace='secrets'`），并在后续启动时重新加载。此前，每次进程启动时都会生成新的随机密钥，导致任何重启或升级后所有现有 cookie/会话失效。影响 `JWT_SECRET` 和 `API_KEY_SECRET`。关闭 #382。

---

## [2.5.5] - 2026-03-15

> 模型列表去重修复、Electron 独立构建强化和 Kiro 积分追踪。

### 🐛 Bug 修复

- **fix(models) #380**：`GET /api/models` 现在在构建活跃提供商过滤器时包含提供商别名 —— `claude`（别名 `cc`）和 `github`（别名 `gh`）的模型始终显示，无论是否配置了连接，因为 `PROVIDER_MODELS` 键是别名，但数据库连接存储在提供商 ID 下。通过扩展每个活跃提供商 ID 以通过 `PROVIDER_ID_TO_ALIAS` 包含其别名来修复。关闭 #353。
- **fix(electron) #379**：新增 `scripts/prepare-electron-standalone.mjs`，在 Electron 打包前准备专用的 `/.next/electron-standalone` 包。如果 `node_modules` 是符号链接则中止并显示清晰错误（electron-builder 会将构建机器上的运行时依赖打包）。通过 `path.basename` 进行跨平台路径清理。By @kfiramar。

### ✨ 新特性

- **feat(kiro) #381**：Kiro 积分余额追踪 —— 通过调用 `codewhisperer.us-east-1.amazonaws.com/getUserCredits`（与 Kiro IDE 内部使用的端点相同），用量端点现在为 Kiro 账户返回积分数据。返回剩余积分、总额度、续订日期和订阅层级。关闭 #337。

## [2.5.4] - 2026-03-15

> 日志器启动修复、登录引导安全修复和开发 HMR 可靠性改进。CI 基础设施强化。

### 🐛 Bug 修复（PRs #374, #375, #376 by @kfiramar）

- **fix(logger) #376**：恢复 pino 传输日志器路径 —— pino 拒绝 `formatters.level` 与 `transport.targets` 组合使用。传输支持的配置现在通过 `getTransportCompatibleConfig()` 剥离级别格式化器。同时修正了 `/api/logs/console` 中的数字级别映射：`30→info, 40→warn, 50→error`（此前偏移了一位）。
- **fix(login) #375**：登录页面现在从公共 `/api/settings/require-login` 端点引导，而不是受保护的 `/api/settings`。在密码保护设置中，预认证页面收到 401 并不必要地回退到安全默认值。公共路由现在返回所有引导元数据（`requireLogin`、`hasPassword`、`setupComplete`），错误时使用保守的 200 回退。
- **fix(dev) #374**：在 `next.config.mjs` 中将 `localhost` 和 `127.0.0.1` 添加到 `allowedDevOrigins` —— 通过回环地址访问应用时 HMR websocket 被阻塞，产生重复的跨域警告。

### 🔧 CI 与基础设施

- **ESLint OOM 修复**：`eslint.config.mjs` 现在忽略 `vscode-extension/**`、`electron/**`、`docs/**`、`app/.next/**` 和 `clipr/**` —— ESLint 因扫描 VS Code 二进制 blob 和编译块导致 JS 堆 OOM 崩溃。
- **单元测试修复**：从 2 个测试文件中移除了过时的 `ALTER TABLE provider_connections ADD COLUMN "group"` —— 该列现在是基础 schema 的一部分（在 #373 中添加），导致每次 CI 运行出现 `SQLITE_ERROR: duplicate column name`。
- **Pre-commit 钩子**：在 `.husky/pre-commit` 中添加了 `npm run test:unit` —— 单元测试现在在到达 CI 之前阻止损坏的提交。

## [2.5.3] - 2026-03-14

> 关键 bug 修复：数据库 schema 迁移、启动环境加载、提供商错误状态清除和 i18n 工具提示修复。每个 PR 顶部的代码质量改进。

### 🐛 Bug 修复（PRs #369, #371, #372, #373 by @kfiramar）

- **fix(db) #373**：为基础 schema 添加 `provider_connections.group` 列 + 回填迁移，用于现有数据库 —— 该列在所有查询中使用，但在 schema 定义中缺失
- **fix(i18n) #371**：用现有的 `providers.delete` 键替换不存在的 `t("deleteConnection")` 键 —— 修复提供商详情页面的 `MISSING_MESSAGE: providers.deleteConnection` 运行时错误
- **fix(auth) #372**：在真正恢复后清除提供商账户中的陈旧错误元数据（`errorCode`、`lastErrorType`、`lastErrorSource`）—— 此前，恢复的账户继续显示为失败
- **fix(startup) #369**：统一 `npm run start`、`run-standalone.mjs` 和 Electron 中的环境加载，遵循 `DATA_DIR/.env → ~/.omniroute/.env → ./.env` 优先级 —— 防止在现有加密数据库上生成新的 `STORAGE_ENCRYPTION_KEY`

### 🔧 代码质量

- 记录了 `auth.ts` 中 `result.success` 与 `response?.ok` 模式（两者都是有意为之，现已说明）
- 在 `electron/main.js` 中规范化了 `overridePath?.trim()` 以匹配 `bootstrap-env.mjs`
- 在 Electron 启动中添加了 `preferredEnv` 合并顺序注释

> Codex 账户配额策略，带自动轮换、快速层级切换、gpt-5.4 模型和分析标签修复。

### ✨ 新特性（PRs #366, #367, #368）

- **Codex 配额策略（PR #366）**：提供商仪表盘中的每账户 5h/每周配额窗口开关。当启用的窗口达到 90% 阈值时自动跳过账户，并在 `resetAt` 后重新接纳。包括 `quotaCache.ts`，带无副作用的状态获取器。
- **Codex 快速层级切换（PR #367）**：Dashboard → Settings → Codex Service Tier。默认关闭的开关仅为 Codex 请求注入 `service_tier: "flex"`，降低成本约 80%。全栈：UI 标签页 + API 端点 + 执行器 + 翻译器 + 启动恢复。
- **gpt-5.4 模型（PR #368）**：为 Codex 模型注册表添加 `cx/gpt-5.4` 和 `codex/gpt-5.4`。包含回归测试。

### 🐛 Bug 修复

- **fix #356**：分析图表（顶级提供商、按账户、提供商拆分）现在为 OpenAI 兼容提供商显示人类可读的提供商名称/标签，而不是原始内部 ID。

> 主要发布：strict-random 路由策略、API key 访问控制、连接组、外部定价同步和 thinking 模型、combo 测试、工具名称验证的关键 bug 修复。

### ✨ 新特性（PRs #363 & #365）

- **Strict-Random 路由策略**：Fisher-Yates 洗牌牌组，带防重复保证和并发请求的互斥序列化。每个 combo 和每个提供商独立的牌组。
- **API Key 访问控制**：`allowedConnections`（限制 key 可使用的连接）、`is_active`（启用/禁用 key，返回 403）、`accessSchedule`（基于时间的访问控制）、`autoResolve` 开关、通过 PATCH 重命名 key。
- **连接组**：按环境分组提供商连接。Limits 页面中的手风琴视图，使用 localStorage 持久化和智能自动切换。
- **外部定价同步（LiteLLM）**：3 层定价解析（用户覆盖 → 同步 → 默认）。通过 `PRICING_SYNC_ENABLED=true` 选择加入。MCP 工具 `omniroute_sync_pricing`。23 个新测试。
- **i18n**：30 种语言更新，使用 strict-random 策略、API key 管理字符串。pt-BR 完全翻译。

### 🐛 Bug 修复

- **fix #355**：流空闲超时从 60 秒增加到 300 秒 —— 防止在长时间推理阶段中止扩展 thinking 模型（claude-opus-4-6、o3 等）。可通过 `STREAM_IDLE_TIMEOUT_MS` 配置。
- **fix #350**：Combo 测试现在使用内部头绕过 `REQUIRE_API_KEY=true`，并普遍使用 OpenAI 兼容格式。超时从 15 秒延长到 20 秒。
- **fix #346**：使用空 `function.name` 的工具（由 Claude Code 转发）现在在到达上游提供商之前被过滤，防止 "Invalid input[N].name: empty string" 错误。

### 🗑️ 已关闭的问题

- **#341**：调试部分已移除 —— 替换为 `/dashboard/logs` 和 `/dashboard/health`。

> API Key Round-Robin 支持，用于多 key 提供商设置，以及确认通配符路由和配额窗口滚动已就位。

### ✨ 新特性

- **API Key Round-Robin (T07)**：提供商连接现在可以持有多个 API key（编辑连接 → 额外 API key）。请求在主 key + 额外 key 之间轮转，通过 `providerSpecificData.extraApiKeys[]`。key 按连接在内存中索引持有 —— 无需数据库 schema 变更。

### 📝 已实现（审计确认）

- **通配符模型路由 (T13)**：`wildcardRouter.ts` 使用 glob 风格通配符匹配（`gpt*`、`claude-?-sonnet` 等）已集成到 `model.ts` 中，带特异性排名。
- **配额窗口滚动 (T08)**：`accountFallback.ts:isModelLocked()` 已自动推进窗口 —— 如果 `Date.now() > entry.until`，锁立即删除（无陈旧阻塞）。

> UI 打磨、路由策略补充和用量限制的优雅错误处理。

### ✨ 新特性

- **Fill-First & P2C 路由策略**：为 combo 策略选择器添加了 `fill-first`（在继续之前排空配额）和 `p2c`（Power-of-Two-Choices 低延迟选择），带完整指导面板和颜色编码徽章。
- **Free Stack 预设模型**：使用 Free Stack 模板创建 combo 时，现在自动填充 7 个最佳免费提供商模型（Gemini CLI、Kiro、Qoder×2、Qwen、NVIDIA NIM、Groq）。用户只需激活提供商即可获得开箱即用的 $0/月 combo。
- **更宽的 Combo 模态框**：创建/编辑 combo 模态框现在使用 `max-w-4xl`，以便舒适地编辑大型 combo。

### 🐛 Bug 修复

- **Limits 页面 HTTP 500（用于 Codex & GitHub）**：当提供商返回 401/403（过期 token）时，`getCodexUsage()` 和 `getGitHubUsage()` 现在返回用户友好的消息，而不是抛出异常导致 Limits 页面出现 500 错误。
- **MaintenanceBanner 误报**：横幅不再在页面加载时虚假显示 "Server is unreachable"。通过在挂载时立即调用 `checkHealth()` 并移除陈旧的 `show` 状态闭包来修复。
- **提供商图标工具提示**：提供商连接行中的编辑（铅笔）和删除图标按钮现在有原生 HTML 工具提示 —— 所有 6 个操作图标现在都有自文档说明。

> 来自社区问题分析的多项改进、新提供商支持、token 追踪、模型路由和流式传输可靠性的 bug 修复。

### ✨ 新特性

- **任务感知智能路由 (T05)**：基于请求内容类型的自动模型选择 —— 编码 → deepseek-chat，分析 → gemini-2.5-pro，视觉 → gpt-4o，摘要 → gemini-2.5-flash。可通过设置配置。新增 `GET/PUT/POST /api/settings/task-routing` API。
- **HuggingFace 提供商**：新增 HuggingFace Router 作为 OpenAI 兼容提供商，使用 Llama 3.1 70B/8B、Qwen 2.5 72B、Mistral 7B、Phi-3.5 Mini。
- **Vertex AI 提供商**：新增 Vertex AI (Google Cloud) 提供商，使用 Gemini 2.5 Pro/Flash、Gemma 2 27B、Claude（通过 Vertex）。
- **游乐场文件上传**：用于转录的音频上传、用于视觉模型的图像上传（按模型名称自动检测）、用于图像生成结果的内联图像渲染。
- **模型选择视觉反馈**：已在 combo 选择器中添加的模型现在显示 ✓ 绿色徽章 —— 防止重复混淆。
- **Qwen 兼容性 (PR #352)**：更新了 User-Agent 和 CLI 指纹设置，用于 Qwen 提供商兼容性。
- **Round-Robin 状态管理 (PR #349)**：增强了 round-robin 逻辑以处理排除的账户并正确维护轮换状态。
- **剪贴板 UX (PR #360)**：加固了剪贴板操作，带非安全上下文的回退；Claude 工具规范化改进。

### 🐛 Bug 修复

- **Fix #302 — OpenAI SDK stream=False 丢弃 tool_calls**：T01 Accept 头协商不再在 `body.stream` 显式为 `false` 时强制流式传输。此前导致使用 OpenAI Python SDK 非流式模式时 tool_calls 被静默丢弃。
- **Fix #73 — Claude Haiku 在没有提供商前缀的情况下路由到 OpenAI**：不带提供商前缀发送的 `claude-*` 模型现在正确路由到 `antigravity` (Anthropic) 提供商。还添加了 `gemini-*`/`gemma-*` → `gemini` 启发式规则。
- **Fix #74 — Antigravity/Claude 流式传输的 Token 计数始终为 0**：携带 `input_tokens` 的 `message_start` SSE 事件未被 `extractUsage()` 解析，导致所有输入 token 计数丢失。输入/输出 token 追踪现在对流式响应正确工作。
- **Fix #180 — 模型导入重复，无反馈**：`ModelSelectModal` 现在为已在 combo 中的模型显示 ✓ 绿色高亮，使其明显已被添加。
- **媒体页面生成错误**：图像结果现在渲染为 `<img>` 标签，而不是原始 JSON。转录结果显示为可读文本。凭证错误显示琥珀色横幅，而不是静默失败。
- **提供商页面的 Token 刷新按钮**：为 OAuth 提供商添加了手动 token 刷新 UI。

### 🔧 改进

- **提供商注册表**：HuggingFace 和 Vertex AI 添加到 `providerRegistry.ts` 和 `providers.ts`（前端）。
- **读取缓存**：新增 `src/lib/db/readCache.ts`，用于高效的数据库读取缓存。
- **配额缓存**：改进了配额缓存，使用基于 TTL 的驱逐。

### 📦 依赖

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)

### 📁 新增文件

| 文件                                          | 目的                             |
| --------------------------------------------- | -------------------------------- |
| `open-sse/services/taskAwareRouter.ts`        | 任务感知路由逻辑（7 种任务类型） |
| `src/app/api/settings/task-routing/route.ts`  | 任务路由配置 API                 |
| `src/app/api/providers/[id]/refresh/route.ts` | 手动 OAuth token 刷新            |
| `src/lib/db/readCache.ts`                     | 高效的数据库读取缓存             |
| `src/shared/utils/clipboard.ts`               | 加固的剪贴板，带回退             |

## [2.4.1] - 2026-03-13

### 🐛 修复

- **Combos 模态框：Free Stack 可见且突出** —— Free Stack 模板被隐藏（3 列网格中的第 4 个）。修复：移动到位置 1，切换为 2x2 网格，使所有 4 个模板可见，绿色边框 + FREE 徽章高亮。

## [2.4.0] - 2026-03-13

> **主要发布** —— Free Stack 生态系统、转录游乐场 overhaul、44+ 提供商、全面的免费层文档和全面的 UI 改进。

### ✨ 新特性

- **Combos: Free Stack 模板** —— 新增第 4 个模板 "Free Stack ($0)"，使用 Kiro + Qoder + Qwen + Gemini CLI 的轮转。首次使用时建议预构建的零成本 combo。
- **Media/Transcription: Deepgram 作为默认** —— Deepgram (Nova 3, $200 免费) 现在是默认转录提供商。AssemblyAI ($50 免费) 和 Groq Whisper (永久免费) 显示免费积分徽章。
- **README: "Start Free" 部分** —— 新增早期 README 5 步表格，展示如何在几分钟内设置零成本 AI。
- **README: Free Transcription Combo** —— 新增部分，使用 Deepgram/AssemblyAI/Groq combo 建议和每提供商免费积分详情。
- **providers.ts: hasFree 标志** —— NVIDIA NIM、Cerebras 和 Groq 标记 hasFree 徽章和 freeNote，用于提供商 UI。
- **i18n: templateFreeStack 键** —— Free Stack combo 模板翻译并同步到所有 30 种语言。

## [2.3.16] - 2026-03-13

### 📖 文档

- **README: 44+ 提供商** —— 将所有 3 处 "36+ 提供商" 更新为 "44+"，反映实际代码库计数（providers.ts 中 44 个提供商）
- **README: 新部分 "🆓 Free Models — What You Actually Get"** —— 添加了 7 提供商表格，使用每模型速率限制：Kiro（通过 AWS Builder ID 的 Claude 无限）、Qoder（5 个模型无限）、Qwen（4 个模型无限）、Gemini CLI（180K/月）、NVIDIA NIM（~40 RPM 永久开发）、Cerebras（1M tok/天 / 60K TPM）、Groq（30 RPM / 14.4K RPD）。包含 Ultimate Free Stack combo 推荐。
- **README: 定价表更新** —— 为 API KEY 层级添加了 Cerebras，修复 NVIDIA 从 "1000 credits" 到 "dev-forever free"，更新了 Qoder/Qwen 模型计数和名称
- **README: Qoder 8→5 模型**（命名：kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2）
- **README: Qwen 3→4 模型**（命名：qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model）

## [2.3.15] - 2026-03-13

### ✨ 新特性

- **Auto-Combo 仪表盘（层级优先级）**：在 `/dashboard/auto-combo` 因子分解显示中添加了 `🏷️ Tier` 作为第 7 个评分因子标签 —— 所有 7 个 Auto-Combo 评分因子现在可见。
- **i18n — autoCombo 部分**：为所有 30 个语言文件添加了 20 个新翻译键，用于 Auto-Combo 仪表盘（`title`、`status`、`modePack`、`providerScores`、`factorTierPriority` 等）。

## [2.3.14] - 2026-03-13

### 🐛 Bug 修复

- **Qoder OAuth (#339)**：恢复了有效的默认 `clientSecret` —— 此前是空字符串，导致每次连接尝试都出现 "Bad client credentials"。公共凭体现在是默认回退（可通过 `QODER_OAUTH_CLIENT_SECRET` 环境变量覆盖）。
- **MITM server not found (#335)**：`prepublish.mjs` 现在在复制到 npm 包之前使用 `tsc` 将 `src/mitm/*.ts` 编译为 JavaScript。此前只复制原始 `.ts` 文件 —— 意味着 `server.js` 在 npm/Volta 全局安装中从未存在过。
- **GeminiCLI missing projectId (#338)**：当存储的凭证中缺少 `projectId` 时（例如 Docker 重启后），OmniRoute 现在记录警告并尝试请求 —— 返回有意义的提供商端错误，而不是 OmniRoute 崩溃。
- **Electron 版本不匹配 (#323)**：将 `electron/package.json` 版本同步到 `2.3.13`（此前是 `2.0.13`），使桌面二进制版本与 npm 包匹配。

### ✨ 新模型 (#334)

- **Kiro**：`claude-sonnet-4`、`claude-opus-4.6`、`deepseek-v3.2`、`minimax-m2.1`、`qwen3-coder-next`、`auto`
- **Codex**：`gpt5.4`

### 🔧 改进

- **层级评分（API + 验证）**：为 `ScoringWeights` Zod schema 和 `combos/auto` API 路由添加了 `tierPriority`（权重 `0.05`）—— 第 7 个评分因子现在完全被 REST API 接受并在输入时验证。`stability` 权重从 `0.10` 调整到 `0.05`，以保持总和 = `1.0`。

### ✨ 新特性

- **分层配额评分（Auto-Combo）**：添加了 `tierPriority` 作为第 7 个评分因子 —— 当其他因素相同时，现在优先选择 Ultra/Pro 层级的账户，而不是 Free 层级。`ProviderCandidate` 中新增可选字段 `accountTier` 和 `quotaResetIntervalSecs`。所有 4 个模式包已更新（`ship-fast`、`cost-saver`、`quality-first`、`offline-friendly`）。
- **家族内模型回退 (T5)**：当模型不可用时（404/400/403），OmniRoute 现在在返回错误之前自动回退到同家族的兄弟模型（`modelFamilyFallback.ts`）。
- **可配置的 API 桥接超时**：`API_BRIDGE_PROXY_TIMEOUT_MS` 环境变量允许操作员调整代理超时（默认 30 秒）。修复慢速上游响应的 504 错误。（#332）
- **Star History**：将所有 30 个 README 中的 star-history.com 小部件替换为 starchart.cc（`?variant=adaptive`）—— 适应浅色/深色主题，实时更新。

### 🐛 Bug 修复

- **认证 —— 首次密码**：设置首个仪表盘密码时现在接受 `INITIAL_PASSWORD` 环境变量。使用 `timingSafeEqual` 进行恒定时间比较，防止时序攻击。（#333）
- **README 截断**：修复了 Troubleshooting 部分缺失的 `</details>` 闭合标签，该标签导致 GitHub 停止渲染其下方的所有内容（技术栈、文档、路线图、贡献者）。
- **pnpm install**：从 `package.json` 中移除了冗余的 `@swc/helpers` 覆盖，该覆盖与直接依赖冲突，导致 pnpm 出现 `EOVERRIDE` 错误。添加了 `pnpm.onlyBuiltDependencies` 配置。
- **CLI 路径注入 (T12)**：在 `cliRuntime.ts` 中添加了 `isSafePath()` 验证器，以阻止路径遍历和 `CLI_*_BIN` 环境变量中的 shell 元字符。
- **CI**：在覆盖移除后重新生成 `package-lock.json`，以修复 GitHub Actions 中的 `npm ci` 失败。

### 🔧 改进

- **响应格式 (T1)**：`response_format`（json_schema/json_object）现在作为系统提示词注入 Claude，实现结构化输出兼容性。
- **429 重试 (T2)**：URL 内重试用于 429 响应（2 次尝试，2 秒延迟），然后回退到下一个 URL。
- **Gemini CLI 请求头 (T3)**：添加了 `User-Agent` 和 `X-Goog-Api-Client` 指纹请求头，用于 Gemini CLI 兼容性。
- **定价目录 (T9)**：添加了 `deepseek-3.1`、`deepseek-3.2` 和 `qwen3-coder-next` 定价条目。

### 📁 新增文件

| 文件                                       | 目的                         |
| ------------------------------------------ | ---------------------------- |
| `open-sse/services/modelFamilyFallback.ts` | 模型家族定义和家族内回退逻辑 |

### 修复

- **KiloCode**：kilocode 健康检查超时已在 v2.3.11 修复
- **OpenCode**：将 opencode 添加到 cliRuntime 注册表，使用 15 秒健康检查超时
- **OpenClaw / Cursor**：将健康检查超时增加到 15 秒，用于慢启动变体
- **VPS**：安装 droid 和 openclaw npm 包；为 kiro-cli 激活 CLI_EXTRA_PATHS
- **cliRuntime**：添加 opencode 工具注册并增加 continue 的超时

## [2.3.11] - 2026-03-12

### 修复

- **KiloCode healthcheck**：将 `healthcheckTimeoutMs` 从 4000ms 增加到 15000ms —— kilocode 在启动时渲染 ASCII 标志横幅，在慢/冷启动环境中导致虚假的 `healthcheck_failed`

## [2.3.10] - 2026-03-12

### 修复

- **Lint**：修复 `check:any-budget:t11` 失败 —— 在 OAuthModal.tsx 中将 `as any` 替换为 `as Record<string, unknown>`（3 处）

### Docs

- **CLI-TOOLS.md**：所有 11 个 CLI 工具的完整指南（claude、codex、gemini、opencode、cline、kilocode、continue、kiro-cli、cursor、droid、openclaw）
- **i18n**：CLI-TOOLS.md 同步到 30 种语言，带翻译的标题和介绍

## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

- **/v1/completions**：新增传统 OpenAI completions 端点 —— 接受 `prompt` 字符串和 `messages` 数组，自动规范化为聊天格式
- **EndpointPage**：现在显示所有 3 种 OpenAI 兼容端点类型：Chat Completions、Responses API 和 Legacy Completions
- **i18n**：为 30 个语言文件添加了 `completionsLegacy/completionsLegacyDesc`

### 修复

- **OAuthModal**：修复所有 OAuth 连接错误中显示的 `[object Object]` —— 正确从错误响应对象中提取 `.message`，在所有 3 个 `throw new Error(data.error)` 调用中（exchange、device-code、authorize）
- 影响 Cline、Codex、GitHub、Qwen、Kiro 和所有其他 OAuth 提供商

## [2.3.7] - 2026-03-12

### 修复

- **Cline OAuth**：在 base64 解码之前添加 `decodeURIComponent`，以便正确解析来自回调 URL 的 URL 编码认证码，修复远程（LAN IP）设置中的 "invalid or expired 授权 code" 错误
- **Cline OAuth**：`mapTokens` 现在填充 `name = firstName + lastName || email`，使 Cline 账户显示真实用户名，而不是 "Account #ID"
- **OAuth 账户名称**：所有 OAuth 交换流程（exchange、poll、poll-callback）现在在名称缺失时规范化 `name = email`，使每个 OAuth 账户在提供商仪表盘上显示其电子邮件作为显示标签
- **OAuth 账户名称**：移除了 `db/providers.ts` 中顺序的 "Account N" 回退 —— 没有电子邮件/名称的账户现在使用基于稳定 ID 的标签，通过 `getAccountDisplayName()`，而不是删除账户时会变化的顺序号

## [2.3.6] - 2026-03-12

### 修复

- **Provider test batch**：修复了 Zod schema 以接受 `providerId: null`（前端为非提供商模式发送 null）；此前对所有批量测试错误地返回 "Invalid 请求"
- **Provider test modal**：通过在 `setTestResults` 和 `ProviderTestResultsView` 中渲染之前将 API 错误对象规范化为字符串，修复了 `[object Object]` 显示
- **i18n**：为 `en.json` 添加了缺失的键 `cliTools.toolDescriptions.opencode`、`cliTools.toolDescriptions.kiro`、`cliTools.guides.opencode`、`cliTools.guides.kiro`
- **i18n**：在所有 29 个非英语语言文件中同步了 1111 个缺失的键，使用英语值作为回退

## [2.3.5] - 2026-03-11

### 修复

- **@swc/helpers**：添加了永久的 `postinstall` 修复，将 `@swc/helpers` 复制到独立应用的 `node_modules` 中 —— 防止全局 npm 安装中的 MODULE_NOT_FOUND 崩溃

## [2.3.4] - 2026-03-10

### Added

- 多个提供商集成和仪表盘改进
