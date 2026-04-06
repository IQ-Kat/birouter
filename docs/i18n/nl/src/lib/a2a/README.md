# OmniRoute A2A Server (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../../../src/lib/a2a/README.md) · 🇪🇸 [es](../../../../es/src/lib/a2a/README.md) · 🇫🇷 [fr](../../../../fr/src/lib/a2a/README.md) · 🇩🇪 [de](../../../../de/src/lib/a2a/README.md) · 🇮🇹 [it](../../../../it/src/lib/a2a/README.md) · 🇷🇺 [ru](../../../../ru/src/lib/a2a/README.md) · 🇨🇳 [zh-CN](../../../../zh-CN/src/lib/a2a/README.md) · 🇯🇵 [ja](../../../../ja/src/lib/a2a/README.md) · 🇰🇷 [ko](../../../../ko/src/lib/a2a/README.md) · 🇸🇦 [ar](../../../../ar/src/lib/a2a/README.md) · 🇮🇳 [hi](../../../../hi/src/lib/a2a/README.md) · 🇮🇳 [in](../../../../in/src/lib/a2a/README.md) · 🇹🇭 [th](../../../../th/src/lib/a2a/README.md) · 🇻🇳 [vi](../../../../vi/src/lib/a2a/README.md) · 🇮🇩 [id](../../../../id/src/lib/a2a/README.md) · 🇲🇾 [ms](../../../../ms/src/lib/a2a/README.md) · 🇳🇱 [nl](../../../../nl/src/lib/a2a/README.md) · 🇵🇱 [pl](../../../../pl/src/lib/a2a/README.md) · 🇸🇪 [sv](../../../../sv/src/lib/a2a/README.md) · 🇳🇴 [no](../../../../no/src/lib/a2a/README.md) · 🇩🇰 [da](../../../../da/src/lib/a2a/README.md) · 🇫🇮 [fi](../../../../fi/src/lib/a2a/README.md) · 🇵🇹 [pt](../../../../pt/src/lib/a2a/README.md) · 🇷🇴 [ro](../../../../ro/src/lib/a2a/README.md) · 🇭🇺 [hu](../../../../hu/src/lib/a2a/README.md) · 🇧🇬 [bg](../../../../bg/src/lib/a2a/README.md) · 🇸🇰 [sk](../../../../sk/src/lib/a2a/README.md) · 🇺🇦 [uk-UA](../../../../uk-UA/src/lib/a2a/README.md) · 🇮🇱 [he](../../../../he/src/lib/a2a/README.md) · 🇵🇭 [phi](../../../../phi/src/lib/a2a/README.md) · 🇧🇷 [pt-BR](../../../../pt-BR/src/lib/a2a/README.md) · 🇨🇿 [cs](../../../../cs/src/lib/a2a/README.md) · 🇹🇷 [tr](../../../../tr/src/lib/a2a/README.md)

---

> **Agent-to-Agent Protocol v0.3**— Hiermee kan elke AI-agent OmniRoute gebruiken als een intelligente routeringsagent via JSON-RPC 2.0.

De A2A Server presenteert OmniRoute als een**eersteklas agent**die andere agenten kunnen ontdekken, taken kunnen delegeren en waarmee kunnen samenwerken met behulp van het [A2A Protocol](https://google.github.io/A2A/).---

## Architectuur

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

## Snel starten

### Agent Discovery

Elke A2A-compatibele agent stelt een**Agent Card**beschikbaar op `/.well-known/agent.json`:```bash
curl http://localhost:20128/.well-known/agent.json

````

**Antwoord:**```json
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

Stuur een bericht naar een vaardigheid en ontvang het volledige antwoord.```bash
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

**Antwoord:**```json
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

Hetzelfde als 'bericht/verzenden', maar retourneert door de server verzonden gebeurtenissen voor realtime streaming.```bash
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

**SSE-evenementen:**```
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

Routes vragen via de intelligente pijplijn van OmniRoute met volledige waarneembaarheid.

**Parameters (in `metagegevens`):**

| Parameter    | Typ          | Standaard       | Beschrijving                                                                         |
| ------------ | ------------ | --------------- | ------------------------------------------------------------------------------------ |
| `model`      | `tekenreeks` | `"automatisch"` | Doelmodel (bijv. `claude-sonnet-4`, `gpt-4o`, `auto`)                                |
| `combinatie` | `tekenreeks` | actieve combo   | Specifieke combo om doorheen te rijden                                               |
| `begroting`  | `nummer`     | geen            | Maximale kosten in USD voor dit verzoek                                              |
| `rol`        | `tekenreeks` | geen            | Taakrolhint: `coderen`, `review`, `planning`, `analyse`, `debugging`, `documentatie` |

**Retourzendingen:**

| Veld                           | Beschrijving                                                       |
| ------------------------------ | ------------------------------------------------------------------ | ---------------------- |
| `artefacten[].inhoud`          | De LLM-antwoordtekst                                               |
| `metadata.routing_explanation` | Voor mensen leesbare uitleg van routeringsbeslissing               |
| `metadata.kosten_envelop`      | Geschatte versus werkelijke kosten met valuta                      |
| `metadata.resilience_trace`    | Array van gebeurtenissen (primary_selected, fallback_needed, etc.) |
| `metadata.policy_verdict`      | Of het verzoek is toegestaan ​​en waarom                           | ### `quota-management` |

Beantwoordt vragen in natuurlijke taal over providerquota.

**Querytypen (afgeleid uit berichtinhoud):**

| Zoekpatroon                                    | Reactietype                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------- | --- |
| Bevat `"ranking"`, `"meeste quota"`, `"beste"` | Aanbieders gerangschikt op resterende quota                               |
| Bevat `"gratis"`, `"suggesteren"`              | Geeft gratis combo's weer of stelt gratis aanbieders voor                 |
| Standaard                                      | Volledig quotaoverzicht met waarschuwingen voor aanbieders met lage quota | --- |

## Task Lifecycle

```
submitted ──→ working ──→ completed
                       ──→ failed
              ──────────→ cancelled
```

| Staat         | Beschrijving                                                   |
| ------------- | -------------------------------------------------------------- |
| `ingediend`   | Taak gemaakt, in wachtrij geplaatst voor uitvoering            |
| `werken`      | Vaardigheidshandler voert                                      |
| `voltooid`    | Uitvoering geslaagd, artefacten beschikbaar                    |
| `mislukt`     | Uitvoering mislukt of taak verlopen (TTL: standaard 5 minuten) |
| `geannuleerd` | Geannuleerd door klant via `taken/annuleren`                   |

- Terminalstatussen: `voltooid`, `mislukt`, `geannuleerd` (geen verdere overgangen)
- Verlopen taken in 'ingediend' of 'werkend' worden automatisch gemarkeerd als 'mislukt'
- Taken worden verzameld na 2× TTL---

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

Een Orchestrator-agent delegeert het genereren van code aan OmniRoute en geeft de uitvoer vervolgens door aan een beoordelingsagent.```python
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

Meerdere agenten delen quota via OmniRoute, waarbij ze de quotavaardigheid gebruiken om te coördineren.```python
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

Een monitoringagent streamt reacties en geeft de voortgang in realtime weer.```typescript
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

Voor langlopende taken kunt u de taakstatus opvragen in plaats van synchroon te wachten.```python
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

| Code   | Constante                | Betekenis                                        |
| ------ | ------------------------ | ------------------------------------------------ | --- |
| -32700 | —                        | Parseerfout (ongeldige JSON)                     |
| -32600 | `INVALID_REQUEST`        | Ongeldig JSON-RPC-verzoek of ongeautoriseerd     |
| -32601 | `METHOD_NOT_FOUND`       | Onbekende methode of vaardigheid                 |
| -32602 | `INVALID_PARAMS`         | Ontbrekende of ongeldige parameters              |
| -32603 | `INTERNAL_ERROR`         | Uitvoering van vaardigheden mislukt              |
| -32001 | `TASK_NOT_FOUND`         | Taak-ID niet gevonden                            |
| -32002 | `TASK_ALREADY_COMPLETED` | Kan een voltooide taak niet wijzigen             |
| -32003 | `ONGEAUTORISEERD`        | Ongeldige of ontbrekende API-sleutel             |
| -32004 | `BUDGET_OVERSCHREDEN`    | Aanvraag overschrijdt het geconfigureerde budget |
| -32005 | `PROVIDER_UNAVAILABLE`   | Geen beschikbare providers                       | --- |

## Authentication

Alle `/a2a`-verzoeken vereisen een Bearer-token via de `Authorization`-header:```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY

```

Als er geen API-sleutel op de server is geconfigureerd (`OMNIROUTE_API_KEY` is leeg), wordt de authenticatie omzeild.---

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

| Kenmerk | MCP-server | A2A-server |
| ----------------- | -------------------------- | -------------------------------------------- |
|**Protocol**| Modelcontextprotocol | Agent-naar-agent-protocol v0.3 |
|**Vervoer**| stdio / HTTP | HTTP (JSON-RPC 2.0) |
|**Ontdekking**| Gereedschapslijst via MCP | `/.bekend/agent.json` |
|**Granulariteit**| 16 individuele gereedschappen | 2 vaardigheden op hoog niveau |
|**Beste voor**| IDE-agents (Cursor, VS-code) | Multi-agentsystemen (LangChain, CrewAI) |
|**Streamen**| Niet ondersteund | SSE via `bericht/stream` |
|**Taakregistratie**| Nee | Volledige levenscyclus (ingediend → voltooid) |
|**Waarneembaarheid**| Auditlogboek per tooloproep | Kostenenvelop + veerkrachtspoor + beleidsoordeel |---

## Licentie

Onderdeel van [OmniRoute](https://github.com/diegosouzapw/OmniRoute) — MIT-licentie.
```
