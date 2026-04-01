# OmniRoute A2A 服务器文档

🌐 **语言:** 🇺🇸 [English](../../A2A-SERVER.md) · 🇧🇷 [pt-BR](../pt-BR/A2A-SERVER.md) · 🇪🇸 [es](../es/A2A-SERVER.md) · 🇫🇷 [fr](../fr/A2A-SERVER.md) · 🇩🇪 [de](../de/A2A-SERVER.md) · 🇮🇹 [it](../it/A2A-SERVER.md) · 🇷🇺 [ru](../ru/A2A-SERVER.md) · 🇨🇳 [zh-CN](../zh-CN/A2A-SERVER.md) · 🇯🇵 [ja](../ja/A2A-SERVER.md) · 🇰🇷 [ko](../ko/A2A-SERVER.md) · 🇸🇦 [ar](../ar/A2A-SERVER.md) · 🇮🇳 [in](../in/A2A-SERVER.md) · 🇹🇭 [th](../th/A2A-SERVER.md) · 🇻🇳 [vi](../vi/A2A-SERVER.md) · 🇮🇩 [id](../id/A2A-SERVER.md) · 🇲🇾 [ms](../ms/A2A-SERVER.md) · 🇳🇱 [nl](../nl/A2A-SERVER.md) · 🇵🇱 [pl](../pl/A2A-SERVER.md) · 🇸🇪 [sv](../sv/A2A-SERVER.md) · 🇳🇴 [no](../no/A2A-SERVER.md) · 🇩🇰 [da](../da/A2A-SERVER.md) · 🇫🇮 [fi](../fi/A2A-SERVER.md) · 🇵🇹 [pt](../pt/A2A-SERVER.md) · 🇷🇴 [ro](../ro/A2A-SERVER.md) · 🇭🇺 [hu](../hu/A2A-SERVER.md) · 🇧🇬 [bg](../bg/A2A-SERVER.md) · 🇸🇰 [sk](../sk/A2A-SERVER.md) · 🇺🇦 [uk-UA](../uk-UA/A2A-SERVER.md) · 🇮🇱 [he](../he/A2A-SERVER.md) · 🇵🇭 [phi](../phi/A2A-SERVER.md) · 🇨🇿 [cs](../cs/A2A-SERVER.md)

> Agent-to-Agent Protocol v0.3 — OmniRoute 作为智能路由代理

## 代理发现

```bash
curl http://localhost:20128/.well-known/agent.json
```

返回描述 OmniRoute 能力、技能和身份验证要求的 Agent Card。

---

## 身份验证

所有 `/a2a` 请求需要通过 `Authorization` 头部提供 API 密钥：

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

如果服务器未配置 API 密钥，则跳过身份验证。

---

## JSON-RPC 2.0 方法

### `message/send` — 同步执行

向技能发送消息并等待完整响应。

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**响应:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — SSE 流式传输

与 `message/send` 相同，但返回 Server-Sent Events 进行实时流式传输。

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**SSE 事件:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — 查询任务状态

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — 取消任务

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## 可用技能

| 技能               | 描述                                                                                            |
| :----------------- | :---------------------------------------------------------------------------------------------- |
| `smart-routing`    | 通过 OmniRoute 的智能管道路由提示。返回带有路由说明、成本和弹性追踪的响应。                      |
| `quota-management` | 回答关于服务商配额的自然语言查询，建议免费组合，并提供配额排名。                                 |

---

## 任务生命周期

```
submitted → working → completed
                    → failed
                    → cancelled
```

- 任务在 5 分钟后过期（可配置）
- 终止状态：`completed`、`failed`、`cancelled`
- 事件日志跟踪每个状态转换

---

## 错误代码

| 代码   | 含义                        |
| :----- | :-------------------------- |
| -32700 | 解析错误（无效 JSON）        |
| -32600 | 无效请求 / 未授权            |
| -32601 | 方法或技能未找到             |
| -32602 | 无效参数                     |
| -32603 | 内部错误                     |

---

## 集成示例

### Python (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
