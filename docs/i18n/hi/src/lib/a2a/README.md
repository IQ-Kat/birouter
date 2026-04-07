# OmniRoute A2A Server (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../../../src/lib/a2a/README.md) · 🇪🇸 [es](../../../../es/src/lib/a2a/README.md) · 🇫🇷 [fr](../../../../fr/src/lib/a2a/README.md) · 🇩🇪 [de](../../../../de/src/lib/a2a/README.md) · 🇮🇹 [it](../../../../it/src/lib/a2a/README.md) · 🇷🇺 [ru](../../../../ru/src/lib/a2a/README.md) · 🇨🇳 [zh-CN](../../../../zh-CN/src/lib/a2a/README.md) · 🇯🇵 [ja](../../../../ja/src/lib/a2a/README.md) · 🇰🇷 [ko](../../../../ko/src/lib/a2a/README.md) · 🇸🇦 [ar](../../../../ar/src/lib/a2a/README.md) · 🇮🇳 [hi](../../../../hi/src/lib/a2a/README.md) · 🇮🇳 [in](../../../../in/src/lib/a2a/README.md) · 🇹🇭 [th](../../../../th/src/lib/a2a/README.md) · 🇻🇳 [vi](../../../../vi/src/lib/a2a/README.md) · 🇮🇩 [id](../../../../id/src/lib/a2a/README.md) · 🇲🇾 [ms](../../../../ms/src/lib/a2a/README.md) · 🇳🇱 [nl](../../../../nl/src/lib/a2a/README.md) · 🇵🇱 [pl](../../../../pl/src/lib/a2a/README.md) · 🇸🇪 [sv](../../../../sv/src/lib/a2a/README.md) · 🇳🇴 [no](../../../../no/src/lib/a2a/README.md) · 🇩🇰 [da](../../../../da/src/lib/a2a/README.md) · 🇫🇮 [fi](../../../../fi/src/lib/a2a/README.md) · 🇵🇹 [pt](../../../../pt/src/lib/a2a/README.md) · 🇷🇴 [ro](../../../../ro/src/lib/a2a/README.md) · 🇭🇺 [hu](../../../../hu/src/lib/a2a/README.md) · 🇧🇬 [bg](../../../../bg/src/lib/a2a/README.md) · 🇸🇰 [sk](../../../../sk/src/lib/a2a/README.md) · 🇺🇦 [uk-UA](../../../../uk-UA/src/lib/a2a/README.md) · 🇮🇱 [he](../../../../he/src/lib/a2a/README.md) · 🇵🇭 [phi](../../../../phi/src/lib/a2a/README.md) · 🇧🇷 [pt-BR](../../../../pt-BR/src/lib/a2a/README.md) · 🇨🇿 [cs](../../../../cs/src/lib/a2a/README.md) · 🇹🇷 [tr](../../../../tr/src/lib/a2a/README.md)

---

> **एजेंट-टू-एजेंट प्रोटोकॉल v0.3**- किसी भी AI एजेंट को JSON-RPC 2.0 के माध्यम से एक बुद्धिमान रूटिंग एजेंट के रूप में ओमनीरूट का उपयोग करने में सक्षम बनाता है।

A2A सर्वर ओमनीरूट को एक**प्रथम श्रेणी एजेंट**के रूप में प्रदर्शित करता है जिसे अन्य एजेंट खोज सकते हैं, कार्य सौंप सकते हैं और [A2A प्रोटोकॉल](https://google.github.io/A2A/) का उपयोग करके सहयोग कर सकते हैं।---

## आर्किटेक्चर

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

## त्वरित प्रारंभ

### Agent Discovery

प्रत्येक A2A-संगत एजेंट `/.well-known/agent.json` पर एक**एजेंट कार्ड**प्रदर्शित करता है:```bash
curl http://localhost:20128/.well-known/agent.json

````

**प्रतिक्रिया:**```json
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

किसी कौशल को संदेश भेजें और पूर्ण प्रतिक्रिया प्राप्त करें।```bash
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

**प्रतिक्रिया:**```json
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

`संदेश/भेजें` के समान लेकिन वास्तविक समय स्ट्रीमिंग के लिए सर्वर-भेजे गए ईवेंट लौटाता है।```bash
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

**एसएसई घटनाक्रम:**```
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

रूट पूर्ण अवलोकन के साथ ओमनीरूट की बुद्धिमान पाइपलाइन के माध्यम से संकेत देता है।

**पैरामीटर ('मेटाडेटा' में):**

| पैरामीटर | प्रकार     | डिफ़ॉल्ट      | विवरण                                                                                    |
| -------- | ---------- | ------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------- |
| 'मॉडल'   | `स्ट्रिंग` | `"auto"`      | लक्ष्य मॉडल (जैसे, `क्लाउड-सॉनेट-4`, `जीपीटी-4ओ`, `ऑटो`)                                 |
| `कॉम्बो` | `स्ट्रिंग` | सक्रिय कॉम्बो |                                                                                          | के माध्यम से रूट करने के लिए विशिष्ट कॉम्बो |
| `बजट`    | 'संख्या'   | कोई नहीं      | इस अनुरोध के लिए अधिकतम लागत USD में                                                     |
| 'भूमिका' | `स्ट्रिंग` | कोई नहीं      | कार्य भूमिका संकेत: `कोडिंग`, `समीक्षा`, `योजना`, `विश्लेषण`, `डीबगिंग`, `दस्तावेज़ीकरण` |

**रिटर्न:**

| फ़ील्ड                       | विवरण                                                    |
| ---------------------------- | -------------------------------------------------------- | ---------------------- |
| `कलाकृतियाँ[].सामग्री`       | एलएलएम प्रतिक्रिया पाठ                                   |
| `मेटाडेटा.रूटिंग_स्पष्टीकरण` | रूटिंग निर्णय की मानव-पठनीय व्याख्या                     |
| `metadata.cost_envelope`     | मुद्रा के साथ अनुमानित बनाम वास्तविक लागत                |
| `मेटाडेटा.रेसिलिएन्स_ट्रेस`  | घटनाओं की श्रृंखला (प्राथमिक*चयनित, फ़ॉलबैक*आवश्यक, आदि) |
| `मेटाडेटा.पॉलिसी_वरडिक्ट`    | क्या अनुरोध की अनुमति दी गई थी और क्यों                  | ### `quota-management` |

प्रदाता कोटा के बारे में प्राकृतिक भाषा में प्रश्नों का उत्तर देता है।

**क्वेरी प्रकार (संदेश सामग्री से अनुमानित):**

| क्वेरी पैटर्न                                                   | प्रतिक्रिया प्रकार                                                             |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------ | --- |
| इसमें ''रैंकिंग'', ''सबसे अधिक कोटा'', ''सर्वश्रेष्ठ'' शामिल है | प्रदाताओं को शेष कोटा के आधार पर क्रमबद्ध किया गया                             |
| `"मुफ़्त"`, `"सुझाव"` शामिल है                                  | निःशुल्क कॉम्बो सूचीबद्ध करता है या निःशुल्क स्तरीय प्रदाताओं का सुझाव देता है |
| डिफ़ॉल्ट                                                        | कम कोटा प्रदाताओं के लिए चेतावनियों के साथ पूर्ण कोटा सारांश                   | --- |

## Task Lifecycle

```
submitted ──→ working ──→ completed
                       ──→ failed
              ──────────→ cancelled
```

| राज्य      | विवरण                                                              |
| ---------- | ------------------------------------------------------------------ | -------------------------- |
| `प्रस्तुत` | कार्य बनाया गया, निष्पादन के लिए कतारबद्ध                          |
| `कार्यरत`  | स्किल हैंडलर निष्पादित कर रहा है                                   |
| `पूर्ण`    | निष्पादन सफल, कलाकृतियाँ उपलब्ध                                    |
| 'विफल'     | निष्पादन विफल रहा या कार्य समाप्त हो गया (टीटीएल: 5 मिनट डिफ़ॉल्ट) |
| 'रद्द'     | क्लाइंट द्वारा `कार्य/रद्द करें`                                   | के माध्यम से रद्द किया गया |

- टर्मिनल बताता है: `पूर्ण`, `असफल`, `रद्द` (कोई और परिवर्तन नहीं)
- `सबमिट' या `वर्किंग' में समाप्त हो चुके कार्यों को `विफल' के रूप में स्वतः-चिह्नित किया जाता है
- कार्य 2× टीटीएल के बाद कचरा एकत्र किया जाता है---

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

एक ऑर्केस्ट्रेटर एजेंट कोड जनरेशन को ओमनीरूट को सौंपता है, फिर आउटपुट को एक समीक्षा एजेंट को भेजता है।```python
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

समन्वय के लिए कोटा कौशल का उपयोग करते हुए, कई एजेंट ओमनीरूट के माध्यम से कोटा साझा करते हैं।```python
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

एक निगरानी एजेंट प्रतिक्रियाएँ स्ट्रीम करता है और वास्तविक समय में प्रगति प्रदर्शित करता है।```typescript
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

लंबे समय तक चलने वाले कार्यों के लिए, समकालिक रूप से प्रतीक्षा करने के बजाय कार्य स्थिति का सर्वेक्षण करें।```python
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

| कोड    | लगातार                  | मतलब                                              |
| ------ | ----------------------- | ------------------------------------------------- | --- |
| -32700 | —                       | पार्स त्रुटि (अमान्य JSON)                        |
| -32600 | `अमान्य_अनुरोध`         | अमान्य JSON-RPC अनुरोध या अनधिकृत                 |
| -32601 | `विधि_नहीं_मिला`        | अज्ञात विधि या कौशल                               |
| -32602 | `अमान्य_PARAMS`         | गुम या अमान्य पैरामीटर                            |
| -32603 | `आंतरिक_त्रुटि`         | कौशल निष्पादन विफल                                |
| -32001 | `कार्य_नहीं_मिला`       | कार्य आईडी नहीं मिली                              |
| -32002 | `कार्य*पहले से ही*पूरा' | पूर्ण किये गये कार्य को संशोधित नहीं किया जा सकता |
| -32003 | 'अनधिकृत'               | अमान्य या अनुपलब्ध API कुंजी                      |
| -32004 | `बजट_अधिक`              | अनुरोध कॉन्फ़िगर बजट से अधिक है                   |
| -32005 | `प्रदाता_अनुपलब्ध`      | कोई उपलब्ध प्रदाता नहीं                           | --- |

## Authentication

सभी `/a2a` अनुरोधों के लिए `प्राधिकरण` शीर्षलेख के माध्यम से एक बियरर टोकन की आवश्यकता होती है:```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY

```

यदि सर्वर पर कोई एपीआई कुंजी कॉन्फ़िगर नहीं की गई है (`OMNIROUTE_API_KEY` खाली है), तो प्रमाणीकरण बायपास हो जाता है।---

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

| फ़ीचर | एमसीपी सर्वर | A2A सर्वर |
| ----------------- | -------------------------------- | ------------------------------------------------- |
|**प्रोटोकॉल**| मॉडल संदर्भ प्रोटोकॉल | एजेंट-टू-एजेंट प्रोटोकॉल v0.3 |
|**परिवहन**| stdio / HTTP | HTTP (JSON-RPC 2.0) |
|**खोज**| एमसीपी के माध्यम से टूल लिस्टिंग | `/.well-known/agent.json` |
|**विस्तृतता**| 16 व्यक्तिगत उपकरण | 2 उच्च स्तरीय कौशल |
|**के लिए सर्वश्रेष्ठ**| आईडीई एजेंट (कर्सर, वीएस कोड) | मल्टी-एजेंट सिस्टम (लैंगचेन, क्रूएआई) |
|**स्ट्रीमिंग**| समर्थित नहीं | `संदेश/स्ट्रीम' के माध्यम से एसएसई |
|**कार्य ट्रैकिंग**| नहीं | पूर्ण जीवनचक्र (प्रस्तुत → पूर्ण) |
|**अवलोकनशीलता**| प्रति टूल कॉल ऑडिट लॉग | लागत लिफ़ाफ़ा + लचीलापन ट्रेस + नीति निर्णय |---

## लाइसेंस

[OmniRoute](https://github.com/diegosouzapw/OmniRoute) का भाग - MIT लाइसेंस।
```
