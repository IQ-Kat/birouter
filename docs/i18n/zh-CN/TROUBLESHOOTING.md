🌐 **语言:** 🇺🇸 [English](../../TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../pt-BR/TROUBLESHOOTING.md) · 🇪🇸 [es](../es/TROUBLESHOOTING.md) · 🇫🇷 [fr](../fr/TROUBLESHOOTING.md) · 🇩🇪 [de](../de/TROUBLESHOOTING.md) · 🇮🇹 [it](../it/TROUBLESHOOTING.md) · 🇷🇺 [ru](../ru/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../zh-CN/TROUBLESHOOTING.md) · 🇯🇵 [ja](../ja/TROUBLESHOOTING.md) · 🇰🇷 [ko](../ko/TROUBLESHOOTING.md) · 🇸🇦 [ar](../ar/TROUBLESHOOTING.md) · 🇮🇳 [in](../in/TROUBLESHOOTING.md) · 🇹🇭 [th](../th/TROUBLESHOOTING.md) · 🇻🇳 [vi](../vi/TROUBLESHOOTING.md) · 🇮🇩 [id](../id/TROUBLESHOOTING.md) · 🇲🇾 [ms](../ms/TROUBLESHOOTING.md) · 🇳🇱 [nl](../nl/TROUBLESHOOTING.md) · 🇵🇱 [pl](../pl/TROUBLESHOOTING.md) · 🇸🇪 [sv](../sv/TROUBLESHOOTING.md) · 🇳🇴 [no](../no/TROUBLESHOOTING.md) · 🇩🇰 [da](../da/TROUBLESHOOTING.md) · 🇫🇮 [fi](../fi/TROUBLESHOOTING.md) · 🇵🇹 [pt](../pt/TROUBLESHOOTING.md) · 🇷🇴 [ro](../ro/TROUBLESHOOTING.md) · 🇭🇺 [hu](../hu/TROUBLESHOOTING.md) · 🇧🇬 [bg](../bg/TROUBLESHOOTING.md) · 🇸🇰 [sk](../sk/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../uk-UA/TROUBLESHOOTING.md) · 🇮🇱 [he](../he/TROUBLESHOOTING.md) · 🇵🇭 [phi](../phi/TROUBLESHOOTING.md)

---

# 故障排除

OmniRoute 常见问题及解决方案。

---

## 快速修复

| 问题                        | 解决方案                                                           |
| --------------------------- | ------------------------------------------------------------------ |
| 首次登录无法使用            | 在 `.env` 中设置 `INITIAL_PASSWORD`（无硬编码默认值）               |
| 仪表盘在错误端口打开        | 设置 `PORT=20128` 和 `NEXT_PUBLIC_BASE_URL=http://localhost:20128` |
| `logs/` 下无请求日志        | 设置 `ENABLE_REQUEST_LOGS=true`                                    |
| EACCES: 权限被拒绝          | 设置 `DATA_DIR=/path/to/writable/dir` 以覆盖 `~/.omniroute`        |
| 路由策略未保存              | 更新到 v1.4.11+（Zod schema 设置持久化修复）                       |

---

## 服务商问题

### "Language model did not provide messages"

**原因:** 服务商配额耗尽。

**解决方案:**

1. 检查仪表盘配额跟踪器
2. 使用带有回退层级的组合
3. 切换到更便宜/免费的层级

### 速率限制

**原因:** 订阅配额耗尽。

**解决方案:**

- 添加回退：`cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- 使用 GLM/MiniMax 作为廉价备份

### OAuth Token 过期

OmniRoute 会自动刷新 token。如果问题持续：

1. 仪表盘 → Provider → Reconnect
2. 删除并重新添加服务商连接

---

## 云端问题

### 云同步错误

1. 验证 `BASE_URL` 指向您的运行实例（例如 `http://localhost:20128`）
2. 验证 `CLOUD_URL` 指向您的云端点（例如 `https://omniroute.dev`）
3. 保持 `NEXT_PUBLIC_*` 值与服务器端值一致

### 云端 `stream=false` 返回 500

**症状:** 非流式调用在云端点返回 `Unexpected token 'd'...`。

**原因:** 上游返回 SSE 负载，而客户端期望 JSON。

**解决方法:** 对云端直接调用使用 `stream=true`。本地运行时包含 SSE→JSON 回退。

### 云端显示已连接但 "Invalid API key"

1. 从本地仪表盘创建新密钥 (`/api/keys`)
2. 运行云同步：启用云 → 立即同步
3. 旧的/未同步的密钥在云端仍可能返回 `401`

---

## Docker 问题

### CLI 工具显示未安装

1. 检查运行时字段：`curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. 便携模式：使用镜像目标 `runner-cli`（捆绑 CLI）
3. 主机挂载模式：设置 `CLI_EXTRA_PATHS` 并以只读方式挂载主机 bin 目录
4. 如果 `installed=true` 且 `runnable=false`：找到二进制文件但健康检查失败

### 快速运行时验证

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## 成本问题

### 高成本

1. 在 Dashboard → Usage 检查使用统计
2. 将主要模型切换到 GLM/MiniMax
3. 对非关键任务使用免费层（Gemini CLI、Qoder）
4. 为每个 API 密钥设置成本预算：Dashboard → API Keys → Budget

---

## 调试

### 启用请求日志

在 `.env` 文件中设置 `ENABLE_REQUEST_LOGS=true`。日志出现在 `logs/` 目录下。

### 检查服务商健康状态

```bash
# 健康仪表盘
http://localhost:20128/dashboard/health

# API 健康检查
curl http://localhost:20128/api/monitoring/health
```

### 运行时存储

- 主要状态：`${DATA_DIR}/storage.sqlite`（服务商、组合、别名、密钥、设置）
- 使用量：`storage.sqlite` 中的 SQLite 表（`usage_history`、`call_logs`、`proxy_logs`）+ 可选 `${DATA_DIR}/log.txt` 和 `${DATA_DIR}/call_logs/`
- 请求日志：`<repo>/logs/...`（当 `ENABLE_REQUEST_LOGS=true` 时）

---

## 熔断器问题

### 服务商卡在 OPEN 状态

当服务商的熔断器处于 OPEN 状态时，请求会被阻止直到冷却期结束。

**解决方案:**

1. 前往 **Dashboard → Settings → Resilience**
2. 检查受影响服务商的熔断器卡片
3. 点击 **Reset All** 清除所有熔断器，或等待冷却期结束
4. 重置前验证服务商确实可用

### 服务商反复触发熔断器

如果服务商反复进入 OPEN 状态：

1. 检查 **Dashboard → Health → Provider Health** 了解故障模式
2. 前往 **Settings → Resilience → Provider Profiles** 增加故障阈值
3. 检查服务商是否更改了 API 限制或需要重新认证
4. 查看延迟遥测 — 高延迟可能导致基于超时的故障

---

## 音频转录问题

### "Unsupported model" 错误

- 确保使用正确的前缀：`deepgram/nova-3` 或 `assemblyai/best`
- 在 **Dashboard → Providers** 验证服务商已连接

### 转录返回空或失败

- 检查支持的音频格式：`mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`
- 验证文件大小在服务商限制内（通常 < 25MB）
- 在服务商卡片中检查 API 密钥有效性

---

## 翻译器调试

使用 **Dashboard → Translator** 调试格式翻译问题：

| 模式              | 使用场景                                                                        |
| ----------------- | ------------------------------------------------------------------------------- |
| **Playground**    | 并排比较输入/输出格式 — 粘贴失败的请求查看其翻译结果                             |
| **Chat Tester**   | 发送实时消息并检查完整的请求/响应负载（包括头部）                                |
| **Test Bench**    | 跨格式组合运行批量测试以找出哪些翻译有问题                                       |
| **Live Monitor**  | 观察实时请求流以捕获间歇性翻译问题                                               |

### 常见格式问题

- **Thinking 标签未显示** — 检查目标服务商是否支持 thinking 及 thinking budget 设置
- **工具调用丢失** — 某些格式翻译可能剥离不支持的字段；在 Playground 模式验证
- **系统提示缺失** — Claude 和 Gemini 处理系统提示的方式不同；检查翻译输出
- **SDK 返回原始字符串而非对象** — v1.1.0 已修复：响应清理器现在会剥离导致 OpenAI SDK Pydantic 验证失败的非标准字段（`x_groq`、`usage_breakdown` 等）
- **GLM/ERNIE 拒绝 `system` 角色** — v1.1.0 已修复：角色归一化器自动将系统消息合并到不兼容模型的用户消息中
- **`developer` 角色不被识别** — v1.1.0 已修复：对非 OpenAI 服务商自动转换为 `system`
- **`json_schema` 对 Gemini 不起作用** — v1.1.0 已修复：`response_format` 现在会转换为 Gemini 的 `responseMimeType` + `responseSchema`

---

## 弹性设置

### 自动速率限制未触发

- 自动速率限制仅适用于 API 密钥服务商（不适用于 OAuth/订阅）
- 验证 **Settings → Resilience → Provider Profiles** 已启用自动速率限制
- 检查服务商是否返回 `429` 状态码或 `Retry-After` 头部

### 调整指数退避

服务商配置文件支持以下设置：

- **Base delay** — 首次失败后的初始等待时间（默认：1s）
- **Max delay** — 最大等待时间上限（默认：30s）
- **Multiplier** — 每次连续失败后延迟增加的倍数（默认：2x）

### 防惊群效应

当多个并发请求命中速率受限的服务商时，OmniRoute 使用互斥锁 + 自动速率限制来序列化请求并防止级联故障。这对 API 密钥服务商是自动的。

---

## 可选 RAG / LLM 故障分类（16 个问题）

一些 OmniRoute 用户将网关放在 RAG 或代理堆栈前面。在这些设置中，常见一种奇怪的模式：OmniRoute 看起来健康（服务商运行中、路由配置正常、无速率限制告警），但最终答案仍然是错误的。

实际上，这些事件通常来自下游 RAG 管道，而非网关本身。

如果您想要描述这些故障的共享词汇，可以使用 WFGY ProblemMap，这是一个外部 MIT 许可的文本资源，定义了十六种反复出现的 RAG / LLM 故障模式。在高层次上，它涵盖：

- 检索漂移和断裂的上下文边界
- 空的或过时的索引和向量存储
- 嵌入与语义不匹配
- 提示组装和上下文窗口问题
- 逻辑崩溃和过度自信的答案
- 长链和代理协调故障
- 多代理记忆和角色漂移
- 部署和启动顺序问题

想法很简单：

1. 当您调查错误响应时，记录：
   - 用户任务和请求
   - OmniRoute 中的路由或服务商组合
   - 下游使用的任何 RAG 上下文（检索的文档、工具调用等）
2. 将事件映射到一个或两个 WFGY ProblemMap 编号（`No.1` … `No.16`）。
3. 在您自己的仪表盘、运行手册或事件跟踪器中将该编号存储在 OmniRoute 日志旁边。
4. 使用相应的 WFGY 页面来决定是否需要更改您的 RAG 堆栈、检索器或路由策略。

完整文本和具体方案在此处（MIT 许可，仅文本）：

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

如果您不在 OmniRoute 后面运行 RAG 或代理管道，可以忽略此部分。

---

## 仍然卡住？

- **GitHub Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **架构**: 参见 [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) 了解内部细节
- **API 参考**: 参见 [`docs/API_REFERENCE.md`](API_REFERENCE.md) 了解所有端点
- **健康仪表盘**: 检查 **Dashboard → Health** 了解实时系统状态
- **翻译器**: 使用 **Dashboard → Translator** 调试格式问题
