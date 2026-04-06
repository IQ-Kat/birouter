# Troubleshooting (中文（简体）)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

OmniRoute 的常见问题和解决方案。---

## Quick Fixes

| 问题                   | 解决方案                                                           |
| ---------------------- | ------------------------------------------------------------------ | --- |
| 首次登录无法使用       | 在`.env`中设置`INITIAL_PASSWORD`（无硬编码默认值）                 |
| 仪表板在错误端口上打开 | 设置 `PORT=20128` 和 `NEXT_PUBLIC_BASE_URL=http://localhost:20128` |
| `logs/` 下没有请求日志 | 设置`ENABLE_REQUEST_LOGS=true`                                     |
| EACCES：权限被拒绝     | 设置 `DATA_DIR=/path/to/writable/dir` 以覆盖 `~/.omniroute`        |
| 路由策略未保存         | 更新至 v1.4.11+（Zod 架构修复设置持久性）                          | --- |

## Provider Issues

### "Language model did not provide messages"

**原因：**提供商配额已用完。

**修复：**

1.检查仪表板配额跟踪器2. 使用具有后备层的组合3.切换到更便宜/免费的套餐### Rate Limiting

**原因：**订阅配额已用完。

**修复：**

- 添加后备：`cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- 使用 GLM/MiniMax 作为廉价备份### OAuth Token Expired

OmniRoute 自动刷新令牌。如果问题仍然存在：

1. 仪表板 → 提供商 → 重新连接 2.删除并重新添加提供商连接---

## Cloud Issues

### Cloud Sync Errors

1. 验证“BASE_URL”指向您正在运行的实例（例如“http://localhost:20128”）
2. 验证“CLOUD_URL”指向您的云端点（例如“https://omniroute.dev”）
3. 保持“NEXT*PUBLIC*\*”值与服务器端值一致### Cloud `stream=false` Returns 500

**症状：**“非流式调用的云端点上出现意外的令牌“d”...”。

**原因：**上游返回 SSE 负载，而客户端需要 JSON。

**解决方法：**使用 `stream=true` 进行云直接调用。本地运行时包括 SSE→JSON 回退。### Cloud Says Connected but "Invalid API key"

1. 从本地仪表板创建新密钥 (`/api/keys`)
2. 运行云同步：启用云→立即同步
3. 旧的/未同步的密钥仍然可以在云上返回“401”---

## Docker Issues

### CLI Tool Shows Not Installed

1. 检查运行时字段： `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. 对于便携模式：使用镜像目标“runner-cli”（捆绑的 CLI）
3. 对于主机挂载模式：设置 `CLI_EXTRA_PATHS` 并将主机 bin 目录挂载为只读
4. 如果“installed=true”且“runnable=false”：已找到二进制文件，但运行状况检查失败### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. 在 Dashboard → 使用情况中查看使用情况统计数据
2. 将主模型切换为GLM/MiniMax
3. Use free tier (Gemini CLI, Qoder) for non-critical tasks
4. Set cost budgets per API key: Dashboard → API Keys → Budget---

## Debugging

### Enable Request Logs

在“.env”文件中设置“ENABLE_REQUEST_LOGS=true”。日志显示在“logs/”目录下。### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- 主状态：`${DATA_DIR}/storage.sqlite`（提供程序、组合、别名、键、设置）
- 用法：`storage.sqlite` 中的 SQLite 表（`usage_history`、`call_logs`、`proxy_logs`）+ 可选的 `${DATA_DIR}/log.txt` 和 `${DATA_DIR}/call_logs/`
- 请求日志：`<repo>/logs/...`（当`ENABLE_REQUEST_LOGS=true`时）---

## Circuit Breaker Issues

### Provider stuck in OPEN state

当提供商的断路器打开时，请求将被阻止，直到冷却时间到期。

**修复：**

1. 转到**仪表板 → 设置 → 弹性**
2. 检查受影响提供商的断路器卡
3. 单击“**全部重置**”以清除所有断路器，或等待冷却时间到期
4. 重置前验证提供商是否确实可用### Provider keeps tripping the circuit breaker

如果提供者重复进入 OPEN 状态：

1. 检查**仪表板 → 运行状况 → 提供商运行状况**以了解故障模式
2. 转到**设置 → 恢复能力 → 提供商配置文件**并增加失败阈值
3. 检查提供商是否更改了 API 限制或需要重新身份验证
4. 检查延迟遥测 — 高延迟可能会导致基于超时的故障---

## Audio Transcription Issues

### "Unsupported model" error

- 确保您使用正确的前缀：“deepgram/nova-3”或“assembleai/best”
- 验证提供商是否已在**仪表板 → 提供商**中连接### Transcription returns empty or fails

- 检查支持的音频格式：`mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`
- 验证文件大小是否在提供商限制内（通常< 25MB）
- 检查提供商卡中提供商 API 密钥的有效性---

## Translator Debugging

使用**Dashboard → Translator**调试格式转换问题：

| 模式           | 何时使用                                               |
| -------------- | ------------------------------------------------------ | ------------------------ |
| **游乐场**     | 并排比较输入/输出格式 — 粘贴失败的请求以查看其如何翻译 |
| **聊天测试仪** | 发送实时消息并检查完整的请求/响应负载（包括标头）      |
| **测试台**     | 跨格式组合运行批量测试以查找哪些翻译被破坏             |
| **实时监控**   | 观看实时请求流以捕获间歇性翻译问题                     | ### Common format issues |

-**思维标签未出现**— 检查目标提供商是否支持思维以及思维预算设置 -**工具调用丢失**— 某些格式翻译可能会删除不支持的字段；在 Playground 模式下验证 -**系统提示缺失**— Claude 和 Gemini 处理系统提示的方式不同；检查翻译输出 -**SDK 返回原始字符串而不是对象**— 在 v1.1.0 中修复：响应清理程序现在会删除导致 OpenAI SDK Pydantic 验证失败的非标准字段（`x_groq`、`usage_breakdown` 等）-**GLM/ERNIE 拒绝 `system` 角色**— 在 v1.1.0 中修复：角色规范器自动将系统消息合并到不兼容模型的用户消息中 -**`开发人员`角色无法识别**— v1.1.0 中修复：对于非 OpenAI 提供商自动转换为`系统` -**`json_schema` 不适用于 Gemini**— 在 v1.1.0 中修复：`response_format` 现在转换为 Gemini 的 `responseMimeType` + `responseSchema`---

## Resilience Settings

### Auto rate-limit not triggering

- 自动速率限制仅适用于 API 密钥提供商（不适用于 OAuth/订阅）
- 验证**设置 → 弹性 → 提供商配置文件**已启用自动速率限制
- 检查提供商是否返回“429”状态代码或“Retry-After”标头### Tuning exponential backoff

提供商配置文件支持以下设置：

-**基本延迟**— 第一次失败后的初始等待时间（默认值：1 秒）-**最大延迟**— 最大等待时间上限（默认值：30 秒）-**乘数**— 每次连续失败增加多少延迟（默认值：2x）### Anti-thundering herd

当许多并发请求到达速率受限的提供程序时，OmniRoute 使用互斥锁 + 自动速率限制来序列化请求并防止级联故障。对于 API 密钥提供者来说，这是自动的。---

## Optional RAG / LLM failure taxonomy (16 problems)

一些 OmniRoute 用户将网关放置在 RAG 或代理堆栈前面。在这些设置中，经常会看到一种奇怪的模式：OmniRoute 看起来很健康（提供程序正常，路由配置文件正常，没有速率限制警报），但最终答案仍然是错误的。

实际上，这些事件通常来自下游 RAG 管道，而不是来自网关本身。

如果您想要一个共享词汇表来描述这些故障，您可以使用 WFGY ProblemMap，这是一个外部 MIT 许可证文本资源，定义了 16 种重复出现的 RAG / LLM 故障模式。从高层次来看，它涵盖：

- 检索漂移和打破上下文边界
- 空或过时的索引和向量存储
- 嵌入与语义不匹配
- 提示汇编和上下文窗口问题
- 逻辑崩溃和过于自信的答案
- 长链和代理协调失败
- 多代理记忆和角色漂移
- 部署和引导排序问题

这个想法很简单：

1. 当您调查不良响应时，捕获：
   - 用户任务和请求
   - OmniRoute 中的路线或提供商组合
   - 下游使用的任何 RAG 上下文（检索的文档、工具调用等）
2. 将事件映射到一两个 WFGY ProblemMap 编号（“No.1”…“No.16”）。
3. 将号码存储在您自己的仪表板、运行手册或 OmniRoute 日志旁边的事件跟踪器中。
4. 使用相应的 WFGY 页面来决定是否需要更改 RAG 堆栈、检索器或路由策略。

全文和具体食谱在这里（麻省理工学院许可证，仅限文本）：

[WFGY 问题地图自述文件](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

如果您不在 OmniRoute 后面运行 RAG 或代理管道，则可以忽略此部分。---

## Still Stuck?

-**GitHub 问题**：[github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**架构**：请参阅 [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) 了解内部详细信息 -**API 参考**：请参阅 [`docs/API_REFERENCE.md`](API_REFERENCE.md) 了解所有端点 -**健康仪表板**：检查**仪表板→健康**以获取实时系统状态 -**翻译器**：使用**仪表板→翻译器**来调试格式问题
