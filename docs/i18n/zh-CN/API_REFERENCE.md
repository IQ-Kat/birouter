# API 参考

🌐 **语言:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md) | 🇨🇿 [Čeština](../cs/API_REFERENCE.md)

所有 OmniRoute API 端点的完整参考。

---

## 目录

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [图像生成](#图像生成)
- [模型列表](#模型列表)
- [兼容性端点](#兼容性端点)
- [语义缓存](#语义缓存)
- [Dashboard 与管理](#dashboard-与管理)
- [请求处理](#请求处理)
- [认证](#认证)

---

## Chat Completions

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### 自定义请求头

| 请求头                   | 方向   | 描述                                  |
| ------------------------ | ------ | ------------------------------------- |
| `X-OmniRoute-No-Cache`   | 请求   | 设为 `true` 绕过缓存                  |
| `X-OmniRoute-Progress`   | 请求   | 设为 `true` 启用进度事件              |
| `X-Session-Id`           | 请求   | 用于外部会话亲和性的粘性会话密钥      |
| `x_session_id`           | 请求   | 下划线变体也被接受（直接 HTTP）       |
| `Idempotency-Key`        | 请求   | 去重密钥（5秒窗口）                   |
| `X-Request-Id`           | 请求   | 备用去重密钥                          |
| `X-OmniRoute-Cache`      | 响应   | `HIT` 或 `MISS`（非流式）             |
| `X-OmniRoute-Idempotent` | 响应   | 如果已去重则为 `true`                 |
| `X-OmniRoute-Progress`   | 响应   | 如果启用进度追踪则为 `enabled`        |
| `X-OmniRoute-Session-Id` | 响应   | OmniRoute 使用的有效会话 ID           |

> **Nginx 注意**: 如果您依赖下划线请求头（例如 `x_session_id`），请启用 `underscores_in_headers on;`。

---

## Embeddings

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

可用提供商：Nebius、OpenAI、Mistral、Together AI、Fireworks、NVIDIA。

```bash
# 列出所有 Embedding 模型
GET /v1/embeddings
```

---

## 图像生成

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

可用提供商：OpenAI (DALL-E)、xAI (Grok Image)、Together AI (FLUX)、Fireworks AI。

```bash
# 列出所有图像模型
GET /v1/images/generations
```

---

## 模型列表

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ 以 OpenAI 格式返回所有 chat、embedding 和 image 模型 + combos
```

---

## 兼容性端点

| 方法 | 路径                        | 格式                 |
| ---- | --------------------------- | -------------------- |
| POST | `/v1/chat/completions`      | OpenAI               |
| POST | `/v1/messages`              | Anthropic            |
| POST | `/v1/responses`             | OpenAI Responses     |
| POST | `/v1/embeddings`            | OpenAI               |
| POST | `/v1/images/generations`    | OpenAI               |
| GET  | `/v1/models`                | OpenAI               |
| POST | `/v1/messages/count_tokens` | Anthropic            |
| GET  | `/v1beta/models`            | Gemini               |
| POST | `/v1beta/models/{...path}`  | Gemini generateContent |
| POST | `/v1/api/chat`              | Ollama               |

### 专用提供商路由

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

如果缺少提供商前缀则自动添加。模型不匹配时返回 `400`。

---

## 语义缓存

```bash
# 获取缓存统计
GET /api/cache/stats

# 清除所有缓存
DELETE /api/cache/stats
```

响应示例：

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## Dashboard 与管理

### 认证

| 端点                          | 方法    | 描述             |
| ----------------------------- | ------- | ---------------- |
| `/api/auth/login`             | POST    | 登录             |
| `/api/auth/logout`            | POST    | 登出             |
| `/api/settings/require-login` | GET/PUT | 切换是否需要登录 |

### 提供商管理

| 端点                         | 方法            | 描述             |
| ---------------------------- | --------------- | ---------------- |
| `/api/providers`             | GET/POST        | 列出/创建提供商  |
| `/api/providers/[id]`        | GET/PUT/DELETE  | 管理提供商       |
| `/api/providers/[id]/test`   | POST            | 测试提供商连接   |
| `/api/providers/[id]/models` | GET             | 列出提供商模型   |
| `/api/providers/validate`    | POST            | 验证提供商配置   |
| `/api/provider-nodes*`       | 多种            | 提供商节点管理   |
| `/api/provider-models`       | GET/POST/DELETE | 自定义模型       |

### OAuth 流程

| 端点                             | 方法  | 描述               |
| -------------------------------- | ----- | ------------------ |
| `/api/oauth/[provider]/[action]` | 多种  | 提供商特定的 OAuth |

### 路由与配置

| 端点                  | 方法     | 描述                       |
| --------------------- | -------- | -------------------------- |
| `/api/models/alias`   | GET/POST | 模型别名                   |
| `/api/models/catalog` | GET      | 按提供商 + 类型的所有模型  |
| `/api/combos*`        | 多种     | Combo 管理                 |
| `/api/keys*`          | 多种     | API 密钥管理               |
| `/api/pricing`        | GET      | 模型定价                   |

### 用量与分析

| 端点                        | 方法 | 描述             |
| --------------------------- | ---- | ---------------- |
| `/api/usage/history`        | GET  | 用量历史         |
| `/api/usage/logs`           | GET  | 用量日志         |
| `/api/usage/request-logs`   | GET  | 请求级别日志     |
| `/api/usage/[connectionId]` | GET  | 按连接的用量     |

### 设置

| 端点                            | 方法          | 描述               |
| ------------------------------- | ------------- | ------------------ |
| `/api/settings`                 | GET/PUT/PATCH | 常规设置           |
| `/api/settings/proxy`           | GET/PUT       | 网络代理配置       |
| `/api/settings/proxy/test`      | POST          | 测试代理连接       |
| `/api/settings/ip-filter`       | GET/PUT       | IP 白名单/黑名单   |
| `/api/settings/thinking-budget` | GET/PUT       | 推理 token 预算    |
| `/api/settings/system-prompt`   | GET/PUT       | 全局系统提示词     |

### 监控

| 端点                     | 方法       | 描述                                                        |
| ------------------------ | ---------- | ----------------------------------------------------------- |
| `/api/sessions`          | GET        | 活跃会话追踪                                                |
| `/api/rate-limits`       | GET        | 每账户速率限制                                              |
| `/api/monitoring/health` | GET        | 健康检查 + 提供商摘要（`catalogCount`、`configuredCount`、`activeCount`、`monitoredCount`） |
| `/api/cache/stats`       | GET/DELETE | 缓存统计 / 清除                                             |

### 备份与导出/导入

| 端点                        | 方法 | 描述                           |
| --------------------------- | ---- | ------------------------------ |
| `/api/db-backups`           | GET  | 列出可用备份                   |
| `/api/db-backups`           | PUT  | 创建手动备份                   |
| `/api/db-backups`           | POST | 从特定备份恢复                 |
| `/api/db-backups/export`    | GET  | 下载数据库为 .sqlite 文件      |
| `/api/db-backups/import`    | POST | 上传 .sqlite 文件替换数据库    |
| `/api/db-backups/exportAll` | GET  | 下载完整备份为 .tar.gz 归档    |

### 云同步

| 端点                   | 方法  | 描述         |
| ---------------------- | ----- | ------------ |
| `/api/sync/cloud`      | 多种  | 云同步操作   |
| `/api/sync/initialize` | POST  | 初始化同步   |
| `/api/cloud/*`         | 多种  | 云管理       |

### 隧道

| 端点                       | 方法 | 描述                                                        |
| -------------------------- | ---- | ----------------------------------------------------------- |
| `/api/tunnels/cloudflared` | GET  | 读取 Dashboard 使用的 Cloudflare Quick Tunnel 安装/运行状态 |
| `/api/tunnels/cloudflared` | POST | 启用或禁用 Cloudflare Quick Tunnel（`action=enable/disable`） |

### CLI 工具

| 端点                               | 方法 | 描述             |
| ---------------------------------- | ---- | ---------------- |
| `/api/cli-tools/claude-settings`   | GET  | Claude CLI 状态  |
| `/api/cli-tools/codex-settings`    | GET  | Codex CLI 状态   |
| `/api/cli-tools/droid-settings`    | GET  | Droid CLI 状态   |
| `/api/cli-tools/openclaw-settings` | GET  | OpenClaw CLI 状态|
| `/api/cli-tools/runtime/[toolId]`  | GET  | 通用 CLI 运行时  |

CLI 响应包括：`installed`、`runnable`、`command`、`commandPath`、`runtimeMode`、`reason`。

### ACP 代理

| 端点              | 方法   | 描述                                           |
| ----------------- | ------ | ---------------------------------------------- |
| `/api/acp/agents` | GET    | 列出所有检测到的代理（内置 + 自定义）及状态    |
| `/api/acp/agents` | POST   | 添加自定义代理或刷新检测缓存                   |
| `/api/acp/agents` | DELETE | 通过 `id` 查询参数删除自定义代理               |

GET 响应包括 `agents[]`（id、name、binary、version、installed、protocol、isCustom）和 `summary`（total、installed、notFound、builtIn、custom）。

### 弹性与速率限制

| 端点                    | 方法    | 描述                   |
| ----------------------- | ------- | ---------------------- |
| `/api/resilience`       | GET/PUT | 获取/更新弹性配置文件  |
| `/api/resilience/reset` | POST    | 重置熔断器             |
| `/api/rate-limits`      | GET     | 每账户速率限制状态     |
| `/api/rate-limit`       | GET     | 全局速率限制配置       |

### 评估

| 端点         | 方法     | 描述                     |
| ------------ | -------- | ------------------------ |
| `/api/evals` | GET/POST | 列出评估套件/运行评估    |

### 策略

| 端点            | 方法            | 描述           |
| --------------- | --------------- | -------------- |
| `/api/policies` | GET/POST/DELETE | 管理路由策略   |

### 合规

| 端点                        | 方法 | 描述                       |
| --------------------------- | ---- | -------------------------- |
| `/api/compliance/audit-log` | GET  | 合规审计日志（最后 N 条）  |

### v1beta（Gemini 兼容）

| 端点                       | 方法 | 描述                        |
| -------------------------- | ---- | --------------------------- |
| `/v1beta/models`           | GET  | 以 Gemini 格式列出模型      |
| `/v1beta/models/{...path}` | POST | Gemini `generateContent` 端点 |

这些端点镜像 Gemini 的 API 格式，用于期望原生 Gemini SDK 兼容性的客户端。

### 内部/系统 API

| 端点            | 方法 | 描述                                             |
| --------------- | ---- | ------------------------------------------------ |
| `/api/init`     | GET  | 应用初始化检查（首次运行时使用）                 |
| `/api/tags`     | GET  | Ollama 兼容的模型标签（用于 Ollama 客户端）      |
| `/api/restart`  | POST | 触发优雅的服务器重启                             |
| `/api/shutdown` | POST | 触发优雅的服务器关闭                             |

> **注意：** 这些端点由系统内部使用或用于 Ollama 客户端兼容性。终端用户通常不需要调用它们。

---

## 音频转录

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

使用 Deepgram 或 AssemblyAI 转录音频文件。

**请求：**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**响应：**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**支持的提供商：** `deepgram/nova-3`、`assemblyai/best`。

**支持的格式：** `mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`。

---

## Ollama 兼容性

用于使用 Ollama API 格式的客户端：

```bash
# Chat 端点（Ollama 格式）
POST /v1/api/chat

# 模型列表（Ollama 格式）
GET /api/tags
```

请求会自动在 Ollama 和内部格式之间转换。

---

## 遥测

```bash
# 获取延迟遥测摘要（每提供商的 p50/p95/p99）
GET /api/telemetry/summary
```

**响应：**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## 预算

```bash
# 获取所有 API 密钥的预算状态
GET /api/usage/budget

# 设置或更新预算
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## 模型可用性

```bash
# 获取所有提供商的实时模型可用性
GET /api/models/availability

# 检查特定模型的可用性
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## 请求处理

1. 客户端向 `/v1/*` 发送请求
2. 路由处理器调用 `handleChat`、`handleEmbedding`、`handleAudioTranscription` 或 `handleImageGeneration`
3. 解析模型（直接 provider/model 或 alias/combo）
4. 从本地数据库选择凭据，并过滤账户可用性
5. 对于 chat：`handleChatCore` — 格式检测、翻译、缓存检查、幂等性检查
6. 提供商执行器发送上游请求
7. 响应翻译回客户端格式（chat）或直接返回（embeddings/images/audio）
8. 记录用量/日志
9. 根据 combo 规则在错误时应用后备

完整架构参考：[`ARCHITECTURE.md`](ARCHITECTURE.md)

---

## 认证

- Dashboard 路由（`/dashboard/*`）使用 `auth_token` cookie
- 登录使用保存的密码哈希；回退到 `INITIAL_PASSWORD`
- `requireLogin` 可通过 `/api/settings/require-login` 切换
- 当 `REQUIRE_API_KEY=true` 时，`/v1/*` 路由可选地需要 Bearer API 密钥
