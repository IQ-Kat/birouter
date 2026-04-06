# OmniRoute A2A Server (中文（简体）)

🌐 **Languages:** 🇺🇸 [English](../../../../../../src/lib/a2a/README.md) · 🇪🇸 [es](../../../../es/src/lib/a2a/README.md) · 🇫🇷 [fr](../../../../fr/src/lib/a2a/README.md) · 🇩🇪 [de](../../../../de/src/lib/a2a/README.md) · 🇮🇹 [it](../../../../it/src/lib/a2a/README.md) · 🇷🇺 [ru](../../../../ru/src/lib/a2a/README.md) · 🇨🇳 [zh-CN](../../../../zh-CN/src/lib/a2a/README.md) · 🇯🇵 [ja](../../../../ja/src/lib/a2a/README.md) · 🇰🇷 [ko](../../../../ko/src/lib/a2a/README.md) · 🇸🇦 [ar](../../../../ar/src/lib/a2a/README.md) · 🇮🇳 [hi](../../../../hi/src/lib/a2a/README.md) · 🇮🇳 [in](../../../../in/src/lib/a2a/README.md) · 🇹🇭 [th](../../../../th/src/lib/a2a/README.md) · 🇻🇳 [vi](../../../../vi/src/lib/a2a/README.md) · 🇮🇩 [id](../../../../id/src/lib/a2a/README.md) · 🇲🇾 [ms](../../../../ms/src/lib/a2a/README.md) · 🇳🇱 [nl](../../../../nl/src/lib/a2a/README.md) · 🇵🇱 [pl](../../../../pl/src/lib/a2a/README.md) · 🇸🇪 [sv](../../../../sv/src/lib/a2a/README.md) · 🇳🇴 [no](../../../../no/src/lib/a2a/README.md) · 🇩🇰 [da](../../../../da/src/lib/a2a/README.md) · 🇫🇮 [fi](../../../../fi/src/lib/a2a/README.md) · 🇵🇹 [pt](../../../../pt/src/lib/a2a/README.md) · 🇷🇴 [ro](../../../../ro/src/lib/a2a/README.md) · 🇭🇺 [hu](../../../../hu/src/lib/a2a/README.md) · 🇧🇬 [bg](../../../../bg/src/lib/a2a/README.md) · 🇸🇰 [sk](../../../../sk/src/lib/a2a/README.md) · 🇺🇦 [uk-UA](../../../../uk-UA/src/lib/a2a/README.md) · 🇮🇱 [he](../../../../he/src/lib/a2a/README.md) · 🇵🇭 [phi](../../../../phi/src/lib/a2a/README.md) · 🇧🇷 [pt-BR](../../../../pt-BR/src/lib/a2a/README.md) · 🇨🇿 [cs](../../../../cs/src/lib/a2a/README.md) · 🇹🇷 [tr](../../../../tr/src/lib/a2a/README.md)

---

> **代理到代理协议 v0.3**— 使任何 AI 代理能够通过 JSON-RPC 2.0 使用 OmniRoute 作为智能路由代理。

A2A 服务器将 OmniRoute 公开为**一流代理**，其他代理可以使用 [A2A 协议](https://google.github.io/A2A/) 发现、委派任务并与之协作。---

## 架构

```
┌──────────────────────────────────────────────────────────────────┐
│                    Orchestrator Agent                             │
│        (LangChain, CrewAI, AutoGen, Custom Agent)                │
└──────────────────────┬───────────────────────────────────────────┘
                       │  1. GET /.well-known/agent.json  (discover)
                       │  2. POST /a2a  (JSON-RPC 2.0)
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                     OmniRoute A2A Server                         │
│  ┌────────────────┐  ┌────────────────┐  ┌───────────────────┐  │
│  │  Task Manager  │  │  Skill Engine  │  │  SSE Streaming    │  │
│  │  (lifecycle)   │──│  (registry)    │──│  (real-time)      │  │
│  └────────────────┘  └────────┬───────┘  └───────────────────┘  │
│                               │                                  │
│  Skills:                      │                                  │
│    ├─ smart-routing ──────────┤  ┌────────────────────────────┐  │
│    └─ quota-management ───────┘  │  Routing Decision Logger   │  │
│                                  └────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
                       │
                       ▼  OmniRoute Gateway (internal)
              /v1/chat/completions, /api/combos, /api/usage/quota
```

---

## 快速开始

### Agent Discovery

每个 A2A 兼容代理都会在“/.well-known/agent.json”处公开一个**代理卡**：```bash
curl http://localhost:20128/.well-known/agent.json

````

**回复：**```json
{
  "name": "OmniRoute",
  "description": "Intelligent AI gateway with auto-routing across 50+ providers",
  "url": "http://localhost:20128/a2a",
  "version": "1.8.1",
  "capabilities": {
    "streaming": true,
    "pushNotifications": false
  },
  "skills": [
    {
      "id": "smart-routing",
      "name": "Smart Routing",
      "description": "Routes prompts through OmniRoute intelligent pipeline",
      "tags": ["routing", "llm", "multi-provider", "cost-optimization"],
      "examples": [
        "Write a hello world in Python",
        "Explain quantum computing using the cheapest provider"
      ]
    },
    {
      "id": "quota-management",
      "name": "Quota Management",
      "description": "Natural-language queries about provider quotas",
      "tags": ["quota", "analytics", "cost"],
      "examples": [
        "Which provider has the most quota remaining?",
        "Suggest a free combo for coding"
      ]
    }
  ],
  "authentication": {
    "schemes": ["bearer"],
    "apiKeyHeader": "Authorization"
  }
}
````

---

## JSON-RPC 2.0 Methods

### `message/send` — Synchronous Execution

向技能发送消息并接收完整回复。```bash
curl -X POST http://localhost:20128/a2a \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer YOUR_KEY" \
 -d '{
"jsonrpc": "2.0",
"id": "1",
"method": "message/send",
"params": {
"skill": "smart-routing",
"messages": [{"role": "user", "content": "Write a Python hello world"}],
"metadata": {"model": "auto", "combo": "fast-coding"}
}
}'

````

**回复：**```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "a1b2c3d4-...", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "print('Hello, World!')" }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.0030)",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "2026-03-04T..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
````

### `message/stream` — SSE Streaming

与“消息/发送”相同，但返回服务器发送的事件以进行实时流处理。```bash
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

````

**上交所活动：**```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"Quantum computing..."}}}

: heartbeat 2026-03-04T21:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
````

### `tasks/get` — Query Task Status

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Cancel a Running Task

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Skills Reference

### `smart-routing`

路由通过具有完全可观察性的 OmniRoute 智能管道进行提示。

**参数（在“元数据”中）：**

| 参数   | 类型     | 默认     | 描述                                                         |
| ------ | -------- | -------- | ------------------------------------------------------------ |
| `模型` | `字符串` | `“自动”` | 目标模型（例如“claude-sonnet-4”、“gpt-4o”、“auto”）          |
| `组合` | `字符串` | 主动组合 | 特定组合路线                                                 |
| `预算` | `数字`   | 无       | 此请求的最高费用（美元）                                     |
| `角色` | `字符串` | 无       | 任务角色提示：`编码`、`审阅`、`规划`、`分析`、`调试`、`文档` |

**退货：**

| 领域                           | 描述                                             |
| ------------------------------ | ------------------------------------------------ | ---------------------- |
| `工件[].内容`                  | LLM 回复文本                                     |
| `metadata.routing_explanation` | 路由决策的人类可读解释                           |
| `metadata.cost_envelope`       | 预计成本与实际成本（以货币计算）                 |
| `metadata.resilience_trace`    | 事件数组（primary_selected、fallback_needed 等） |
| `metadata.policy_verdict`      | 请求是否被允许以及原因                           | ### `quota-management` |

回答有关提供商配额的自然语言查询。

**查询类型（从消息内容推断）：**

| 查询模式                            | 响应类型                               |
| ----------------------------------- | -------------------------------------- | --- |
| 包含`“排名”`、`“最多名额”`、“最佳”` | 按剩余配额排名的提供商                 |
| 包含“免费”、“建议”                  | 列出免费组合或建议免费套餐提供商       |
| 默认                                | 完整配额摘要，并对低配额供应商发出警告 | --- |

## Task Lifecycle

```
submitted ──→ working ──→ completed
                       ──→ failed
              ──────────→ cancelled
```

| 状态     | 描述                                   |
| -------- | -------------------------------------- |
| `已提交` | 任务已创建，排队等待执行               |
| `工作`   | 技能处理程序正在执行                   |
| `已完成` | 执行成功，工件可用                     |
| `失败`   | 执行失败或任务过期（TTL：默认 5 分钟） |
| `已取消` | 客户端通过“tasks/cancel”取消           |

- 终端状态：“已完成”、“失败”、“已取消”（无进一步转换）
- “已提交”或“正在处理”中过期的任务会自动标记为“失败”
- 任务在 2× TTL 后被垃圾收集---

## Client Examples

### Python — Orchestrator Agent

```python
"""
A2A Client — Python example.
Discovers OmniRoute agent, sends a task, and processes the result.
"""
import requests
import json

BASE_URL = "http://localhost:20128"
API_KEY = "your-api-key"
HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}",
}

# 1. Discover agent capabilities
agent_card = requests.get(f"{BASE_URL}/.well-known/agent.json").json()
print(f"Agent: {agent_card['name']} v{agent_card['version']}")
print(f"Skills: {[s['id'] for s in agent_card['skills']]}")

# 2. Send a smart-routing task
response = requests.post(f"{BASE_URL}/a2a", headers=HEADERS, json={
    "jsonrpc": "2.0",
    "id": "task-1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Write a Python quicksort implementation"}],
        "metadata": {
            "model": "auto",
            "combo": "fast-coding",
            "budget": 0.10,
        }
    }
})
result = response.json()["result"]
print(f"\n📝 Response: {result['artifacts'][0]['content'][:200]}...")
print(f"🔀 Routing: {result['metadata']['routing_explanation']}")
print(f"💰 Cost: ${result['metadata']['cost_envelope']['actual']}")
print(f"🛡️ Policy: {result['metadata']['policy_verdict']['reason']}")

# 3. Query quota status
quota_resp = requests.post(f"{BASE_URL}/a2a", headers=HEADERS, json={
    "jsonrpc": "2.0",
    "id": "task-2",
    "method": "message/send",
    "params": {
        "skill": "quota-management",
        "messages": [{"role": "user", "content": "Which provider has the most quota remaining?"}],
    }
})
quota_result = quota_resp.json()["result"]
print(f"\n📊 Quota: {quota_result['artifacts'][0]['content']}")
```

### TypeScript — Multi-Agent Orchestrator

```typescript
/**
 * A2A Client — TypeScript example.
 * Shows agent discovery, task delegation, and streaming.
 */

const BASE_URL = "http://localhost:20128";
const API_KEY = "your-api-key";

interface JsonRpcResponse<T = any> {
  jsonrpc: "2.0";
  id: string | number;
  result?: T;
  error?: { code: number; message: string };
}

async function a2aCall<T>(method: string, params: Record<string, any>): Promise<T> {
  const resp = await fetch(`${BASE_URL}/a2a`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: `${method}-${Date.now()}`,
      method,
      params,
    }),
  });
  const json: JsonRpcResponse<T> = await resp.json();
  if (json.error) throw new Error(`[${json.error.code}] ${json.error.message}`);
  return json.result!;
}

// ── Agent Discovery ──
const agentCard = await fetch(`${BASE_URL}/.well-known/agent.json`).then((r) => r.json());
console.log(`Connected to: ${agentCard.name} (${agentCard.skills.length} skills)`);

// ── Smart Routing: Send a coding task ──
const routingResult = await a2aCall("message/send", {
  skill: "smart-routing",
  messages: [{ role: "user", content: "Implement a Redis cache wrapper in TypeScript" }],
  metadata: { model: "claude-sonnet-4", role: "coding" },
});
console.log("Response:", routingResult.artifacts[0].content);
console.log("Provider:", routingResult.metadata.routing_explanation);

// ── Quota Management: Find free alternatives ──
const quotaResult = await a2aCall("message/send", {
  skill: "quota-management",
  messages: [{ role: "user", content: "Suggest free combos for documentation" }],
});
console.log("Free combos:", quotaResult.artifacts[0].content);

// ── Streaming: Real-time response ──
const streamResp = await fetch(`${BASE_URL}/a2a`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "stream-1",
    method: "message/stream",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Explain microservices architecture" }],
    },
  }),
});

const reader = streamResp.body!.getReader();
const decoder = new TextDecoder();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const chunk = decoder.decode(value);
  for (const line of chunk.split("\n")) {
    if (line.startsWith("data: ")) {
      const event = JSON.parse(line.slice(6));
      if (event.params.chunk) {
        process.stdout.write(event.params.chunk.content);
      }
      if (event.params.task.state === "completed") {
        console.log("\n✅ Stream completed");
      }
    }
  }
}
```

### Python — LangChain A2A Integration

```python
"""
LangChain integration — Use OmniRoute A2A as a custom LLM.
"""
from langchain.llms.base import BaseLLM
from langchain.schema import LLMResult, Generation
import requests
from typing import List, Optional

class OmniRouteA2A(BaseLLM):
    base_url: str = "http://localhost:20128"
    api_key: str = ""
    model: str = "auto"
    combo: Optional[str] = None

    @property
    def _llm_type(self) -> str:
        return "omniroute-a2a"

    def _call(self, prompt: str, stop: Optional[List[str]] = None, **kwargs) -> str:
        response = requests.post(
            f"{self.base_url}/a2a",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.api_key}",
            },
            json={
                "jsonrpc": "2.0",
                "id": "langchain-1",
                "method": "message/send",
                "params": {
                    "skill": "smart-routing",
                    "messages": [{"role": "user", "content": prompt}],
                    "metadata": {
                        "model": self.model,
                        **({"combo": self.combo} if self.combo else {}),
                    },
                },
            },
        )
        result = response.json()["result"]
        return result["artifacts"][0]["content"]

    def _generate(self, prompts: List[str], stop=None, **kwargs) -> LLMResult:
        return LLMResult(
            generations=[[Generation(text=self._call(p, stop))] for p in prompts]
        )

# Usage
llm = OmniRouteA2A(
    base_url="http://localhost:20128",
    api_key="your-key",
    model="auto",
    combo="fast-coding",
)
result = llm("Write a Python function to merge two sorted lists")
print(result)
```

### Go — A2A Client

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

const baseURL = "http://localhost:20128"
const apiKey = "your-api-key"

type JsonRpcRequest struct {
	Jsonrpc string      `json:"jsonrpc"`
	ID      string      `json:"id"`
	Method  string      `json:"method"`
	Params  interface{} `json:"params"`
}

type JsonRpcResponse struct {
	Jsonrpc string      `json:"jsonrpc"`
	ID      string      `json:"id"`
	Result  interface{} `json:"result"`
	Error   *struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	} `json:"error"`
}

func a2aCall(method string, params interface{}) (*JsonRpcResponse, error) {
	body, _ := json.Marshal(JsonRpcRequest{
		Jsonrpc: "2.0",
		ID:      "go-1",
		Method:  method,
		Params:  params,
	})

	req, _ := http.NewRequest("POST", baseURL+"/a2a", bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	data, _ := io.ReadAll(resp.Body)

	var result JsonRpcResponse
	json.Unmarshal(data, &result)
	return &result, nil
}

func main() {
	// Discover agent
	resp, _ := http.Get(baseURL + "/.well-known/agent.json")
	defer resp.Body.Close()
	body, _ := io.ReadAll(resp.Body)
	fmt.Println("Agent Card:", string(body))

	// Send smart-routing task
	result, _ := a2aCall("message/send", map[string]interface{}{
		"skill":    "smart-routing",
		"messages": []map[string]string{{"role": "user", "content": "Hello from Go!"}},
		"metadata": map[string]interface{}{"model": "auto"},
	})
	out, _ := json.MarshalIndent(result.Result, "", "  ")
	fmt.Println("Result:", string(out))
}
```

---

## Use Cases

### 🤖 Use Case 1: Multi-Agent Coding Pipeline

协调器代理将代码生成委托给 OmniRoute，然后将输出传递给审核代理。```python
def coding_pipeline(task: str): # Step 1: Generate code via OmniRoute A2A
code_result = a2a_send("smart-routing", [
{"role": "user", "content": f"Write production-quality code: {task}"}
], metadata={"model": "auto", "role": "coding"})
code = code_result["artifacts"][0]["content"]

    # Step 2: Review the code via OmniRoute A2A (different model)
    review_result = a2a_send("smart-routing", [
        {"role": "user", "content": f"Review this code for bugs and improvements:\n\n{code}"}
    ], metadata={"model": "auto", "role": "review"})
    review = review_result["artifacts"][0]["content"]

    # Step 3: Check costs
    print(f"Code cost: ${code_result['metadata']['cost_envelope']['actual']}")
    print(f"Review cost: ${review_result['metadata']['cost_envelope']['actual']}")

    return {"code": code, "review": review}

````

### 💡 Use Case 2: Quota-Aware Agent Swarm

多个代理通过 OmniRoute 共享配额，使用配额技能进行协调。```python
async def quota_aware_agent(agent_name: str, task: str):
    # Check quota before starting
    quota = a2a_send("quota-management", [
        {"role": "user", "content": "Which provider has the most quota remaining?"}
    ])
    print(f"[{agent_name}] {quota['artifacts'][0]['content']}")

    # Send request with budget constraint
    result = a2a_send("smart-routing", [
        {"role": "user", "content": task}
    ], metadata={"budget": 0.05})

    policy = result["metadata"]["policy_verdict"]
    if not policy["allowed"]:
        print(f"[{agent_name}] ⚠️ Budget exceeded: {policy['reason']}")
        # Fall back to free combo
        quota = a2a_send("quota-management", [
            {"role": "user", "content": "Suggest free combos"}
        ])
        print(f"[{agent_name}] Free alternatives: {quota['artifacts'][0]['content']}")

    return result
````

### 📊 Use Case 3: Real-Time Streaming Dashboard

监控代理实时传输响应并显示进度。```typescript
async function streamingDashboard(prompt: string) {
  const response = await fetch(`${BASE_URL}/a2a`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
body: JSON.stringify({
jsonrpc: "2.0",
id: "dash-1",
method: "message/stream",
params: { skill: "smart-routing", messages: [{ role: "user", content: prompt }] },
}),
});

let totalChunks = 0;
const reader = response.body!.getReader();
const decoder = new TextDecoder();

while (true) {
const { done, value } = await reader.read();
if (done) break;

    for (const line of decoder.decode(value).split("\n")) {
      if (line.startsWith("data: ")) {
        const event = JSON.parse(line.slice(6));
        const state = event.params.task.state;

        if (state === "working" && event.params.chunk) {
          totalChunks++;
          process.stdout.write(
            `\r[Chunk ${totalChunks}] ${event.params.chunk.content.slice(0, 50)}...`
          );
        }
        if (state === "completed") {
          const meta = event.params.metadata;
          console.log(
            `\n✅ Done | Cost: $${meta?.cost_envelope?.actual || 0} | Route: ${meta?.routing_explanation || "N/A"}`
          );
        }
        if (state === "failed") {
          console.error(`\n❌ Failed: ${event.params.metadata?.error}`);
        }
      }
    }

}
}

````

### 🔁 Use Case 4: Task Polling Pattern

对于长时间运行的任务，轮询任务状态而不是同步等待。```python
import time

def poll_task(task_id: str, timeout: int = 60):
    """Poll task status until completion or timeout."""
    start = time.time()
    while time.time() - start < timeout:
        result = requests.post(f"{BASE_URL}/a2a", headers=HEADERS, json={
            "jsonrpc": "2.0",
            "id": "poll-1",
            "method": "tasks/get",
            "params": {"taskId": task_id},
        }).json()

        task = result["result"]["task"]
        state = task["state"]
        print(f"  Task {task_id[:8]}... state={state}")

        if state in ("completed", "failed", "cancelled"):
            return task
        time.sleep(2)

    # Timeout — cancel the task
    requests.post(f"{BASE_URL}/a2a", headers=HEADERS, json={
        "jsonrpc": "2.0",
        "id": "cancel-1",
        "method": "tasks/cancel",
        "params": {"taskId": task_id},
    })
    raise TimeoutError(f"Task {task_id} timed out after {timeout}s")
````

---

## Error Codes

| 代码   | 恒定                     | 意义                           |
| ------ | ------------------------ | ------------------------------ | --- |
| -32700 | -32700 —                 | 解析错误（无效 JSON）          |
| -32600 | -32600 `INVALID_REQUEST` | 无效的 JSON-RPC 请求或未经授权 |
| -32601 | `METHOD_NOT_FOUND`       | 未知的方法或技巧               |
| -32602 | -32602 `INVALID_PARAMS`  | 参数缺失或无效                 |
| -32603 | -32603 `内部错误`        | 技能执行失败                   |
| -32001 | `任务未找到`             | 未找到任务 ID                  |
| -32002 | `任务已完成`             | 无法修改已完成的任务           |
| -32003 | `未经授权`               | API 密钥无效或丢失             |
| -32004 | `预算_超出`              | 请求超出配置的预算             |
| -32005 | `PROVIDER_UNAVAILABLE`   | 没有可用的提供商               | --- |

## Authentication

所有“/a2a”请求都需要通过“Authorization”标头获得承载令牌：```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY

```

如果服务器上未配置 API 密钥（“OMNIROUTE_API_KEY”为空），则会绕过身份验证。---

## File Structure

```

src/lib/a2a/
├── taskManager.ts # Task lifecycle (create/update/cancel/list), TTL, cleanup
├── taskExecution.ts # Generic task executor with state management
├── streaming.ts # SSE stream formatting, heartbeat, chunk/completion events
├── routingLogger.ts # Routing decision logger (stats, history, retention)
└── skills/
├── smartRouting.ts # Smart routing skill (routes via /v1/chat/completions)
└── quotaManagement.ts # Quota management skill (natural-language quota queries)

src/app/a2a/
└── route.ts # Next.js API route handler (JSON-RPC 2.0 dispatch)

open-sse/mcp-server/
└── schemas/a2a.ts # Zod schemas (AgentCard, Task, JSON-RPC, SSE events)

```

---

## Comparison: MCP vs A2A

|特色 | MCP Server                   | A2A服务器|
| ----------------- | ---------------------------- | ------------------------------------------------- |
|**协议**| Model Context Protocol       |代理间协议 v0.3 |
|**交通**| stdio / HTTP                 | HTTP（JSON-RPC 2.0）|
|**发现**| Tool listing via MCP         | `/.well-known/agent.json` |
|**粒度**| 16 individual tools          | 2 高级技能 |
|**最适合**| IDE agents (Cursor, VS Code) |多智能体系统（LangChain、CrewAI）|
|**流媒体**| Not supported                |通过“消息/流”的 SSE |
|**任务跟踪**| No                           |完整生命周期（已提交→已完成）|
|**可观察性**| Audit log per tool call      |成本包络+弹性轨迹+政策判决|---

## 许可证

[OmniRoute](https://github.com/diegosouzapw/OmniRoute) 的一部分 — MIT 许可证。
```
