# Server OmniRoute MCP

> **Server protokolu modelového kontextu** , který zpřístupňuje inteligenci brány OmniRoute jako **16 nástrojů** pro agenty umělé inteligence.

Server MCP umožňuje libovolnému agentovi umělé inteligence (Claude Desktop, Cursor, VS Code Copilot, vlastním agentům) programově **monitorovat, řídit a optimalizovat** bránu umělé inteligence OmniRoute.

---

## Architektura

```
┌──────────────────────────────────────────────────────────────────┐
│                         AI Agent / IDE                           │
│          (Claude Desktop, Cursor, VS Code, Custom)               │
└──────────────────────┬───────────────────────────────────────────┘
                       │  MCP Protocol (stdio or HTTP)
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                      OmniRoute MCP Server                        │
│  ┌──────────────┐  ┌─────────────────┐  ┌────────────────────┐  │
│  │ Scope        │  │  16 MCP Tools   │  │   Audit Logger     │  │
│  │ Enforcement  │──│  (Phase 1 + 2)  │──│   (SHA-256/SQLite) │  │
│  └──────────────┘  └────────┬────────┘  └────────────────────┘  │
└─────────────────────────────┼────────────────────────────────────┘
                              │  HTTP (internal)
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                    OmniRoute Gateway (port 20128)                 │
│        /v1/chat/completions  /api/combos  /api/usage  ...        │
└──────────────────────────────────────────────────────────────────┘
```

---

## Rychlý start

### 1. Proměnné prostředí

```bash
# Required: OmniRoute base URL
export OMNIROUTE_BASE_URL="http://localhost:20128"

# Optional: API key for authenticated access
export OMNIROUTE_API_KEY="your-api-key"

# Optional: Scope enforcement (default: disabled)
export OMNIROUTE_MCP_ENFORCE_SCOPES="true"
export OMNIROUTE_MCP_SCOPES="read:health,read:combos,read:quota,read:usage,read:models,execute:completions,write:combos,write:budget,write:resilience"
```

### 2. Transport stdio (integrace IDE)

Přidejte do konfigurace klienta MCP:

**Claude Desktop** ( `claude_desktop_config.json` ):

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "node",
      "args": ["path/to/9router/open-sse/mcp-server/server.ts"],
      "env": {
        "OMNIROUTE_BASE_URL": "http://localhost:20128",
        "OMNIROUTE_API_KEY": "your-key"
      }
    }
  }
}
```

**Cursor** ( `.cursor/mcp.json` ):

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "npx",
      "args": ["tsx", "open-sse/mcp-server/server.ts"],
      "env": {
        "OMNIROUTE_BASE_URL": "http://localhost:20128"
      }
    }
  }
}
```

**VS Code** ( `.vscode/settings.json` ):

```json
{
  "mcp": {
    "servers": {
      "omniroute": {
        "command": "npx",
        "args": ["tsx", "open-sse/mcp-server/server.ts"],
        "env": {
          "OMNIROUTE_BASE_URL": "http://localhost:20128"
        }
      }
    }
  }
}
```

### 3. Spuštění přes CLI

```bash
# Direct start (stdio)
npx tsx open-sse/mcp-server/server.ts

# Or via OmniRoute CLI
omniroute --mcp
```

---

## Referenční informace o nástrojích

### Fáze 1: Základní nástroje (8)

# | Nástroj | Rozsahy | Popis
--- | --- | --- | ---
1 | `omniroute_get_health` | `read:health` | Stav brány, dostupnost, paměť, jističe, limity rychlosti, statistiky mezipaměti
2 | `omniroute_list_combos` | `read:combos` | Vypsat všechny kombinace (modelové řetězce) se strategiemi a volitelnými metrikami
3 | `omniroute_get_combo_metrics` | `read:combos` | Metriky výkonu pro konkrétní kombinaci
4 | `omniroute_switch_combo` | `write:combos` | Aktivace nebo deaktivace komba pro směrování
5 | `omniroute_check_quota` | `read:quota` | Zbývající kvóta API na poskytovatele se stavem tokenu
6 | `omniroute_route_request` | `execute:completions` | Odeslat dokončení chatu pomocí inteligentního směrování
7 | `omniroute_cost_report` | `read:usage` | Zpráva o nákladech podle období (relace/den/týden/měsíc) s rozpisem podle poskytovatele
8 | `omniroute_list_models_catalog` | `read:models` | Seznam všech dostupných modelů od různých poskytovatelů s funkcemi a cenami

### Fáze 2: Pokročilé nástroje (8)

# | Nástroj | Rozsahy | Popis
--- | --- | --- | ---
9 | `omniroute_simulate_route` | `read:health` , `read:combos` | Simulace trasy na dryru zobrazující záložní strom a odhadované náklady
10 | `omniroute_set_budget_guard` | `write:budget` | Nastavit rozpočet relace s akcí při překročení: `degrade` , `block` nebo `alert`
11 | `omniroute_set_resilience_profile` | `write:resilience` | Použijte profil odolnosti: `aggressive` , `balanced` nebo `conservative`
12 | `omniroute_test_combo` | `execute:completions` , `read:combos` | Otestujte každého poskytovatele v kombinaci se skutečným výzvou a nahlaste latenci/náklady
13 | `omniroute_get_provider_metrics` | `read:health` | Metriky pro jednotlivé poskytovatele s percentily latence (p50/p95/p99), jistič
14 | `omniroute_best_combo_for_task` | `read:combos` , `read:health` | Doporučení kombinací podle typu úkolu s využitím umělé inteligence s omezeními rozpočtu/latence
15 | `omniroute_explain_route` | `read:health` , `read:usage` | Vysvětlete, proč byl požadavek směrován k poskytovateli (faktory hodnocení, záložní metody)
16 | `omniroute_get_session_snapshot` | `read:usage` | Snímek celého relace: náklady, tokeny, top modely, chyby, stav rozpočtu

---

## Příklady klientů

### Python — Kompletní pracovní postup agenta

```python
"""
OmniRoute MCP Client — Python example using the mcp SDK.
Install: pip install mcp
"""
import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def main():
    server = StdioServerParameters(
        command="npx",
        args=["tsx", "open-sse/mcp-server/server.ts"],
        env={
            "OMNIROUTE_BASE_URL": "http://localhost:20128",
            "OMNIROUTE_API_KEY": "your-key",
        },
    )

    async with stdio_client(server) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # 1. Check gateway health
            health = await session.call_tool("omniroute_get_health", {})
            print("Health:", health.content[0].text)

            # 2. List available combos with metrics
            combos = await session.call_tool("omniroute_list_combos", {
                "includeMetrics": True
            })
            print("Combos:", combos.content[0].text)

            # 3. Find the best combo for a coding task
            best = await session.call_tool("omniroute_best_combo_for_task", {
                "taskType": "coding",
                "budgetConstraint": 0.50,
                "latencyConstraint": 5000,
            })
            print("Best combo:", best.content[0].text)

            # 4. Set a session budget guard
            budget = await session.call_tool("omniroute_set_budget_guard", {
                "maxCost": 1.00,
                "action": "degrade",
                "degradeToTier": "cheap",
            })
            print("Budget guard:", budget.content[0].text)

            # 5. Route a request through intelligent pipeline
            response = await session.call_tool("omniroute_route_request", {
                "model": "claude-sonnet-4",
                "messages": [
                    {"role": "user", "content": "Write a Python hello world"}
                ],
                "role": "coding",
            })
            print("Response:", response.content[0].text)

            # 6. Get the session snapshot
            snapshot = await session.call_tool("omniroute_get_session_snapshot", {})
            print("Session:", snapshot.content[0].text)

asyncio.run(main())
```

### TypeScript — Programový agent

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["tsx", "open-sse/mcp-server/server.ts"],
    env: {
      OMNIROUTE_BASE_URL: "http://localhost:20128",
      OMNIROUTE_API_KEY: "your-key",
    },
  });

  const client = new Client({ name: "my-agent", version: "1.0.0" });
  await client.connect(transport);

  // Check quota before deciding which model to use
  const quota = await client.callTool({
    name: "omniroute_check_quota",
    arguments: { provider: "claude" },
  });
  console.log("Claude quota:", quota.content);

  // Simulate the route before actually calling
  const simulation = await client.callTool({
    name: "omniroute_simulate_route",
    arguments: {
      model: "claude-sonnet-4",
      promptTokenEstimate: 2000,
    },
  });
  console.log("Route simulation:", simulation.content);

  // Send the actual request
  const result = await client.callTool({
    name: "omniroute_route_request",
    arguments: {
      model: "claude-sonnet-4",
      messages: [{ role: "user", content: "Explain async/await" }],
    },
  });
  console.log("Result:", result.content);

  // Cost report
  const costs = await client.callTool({
    name: "omniroute_cost_report",
    arguments: { period: "session" },
  });
  console.log("Costs:", costs.content);

  await client.close();
}

main();
```

### Go — HTTP klient

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

// Simplified direct-API approach (bypass MCP, hit OmniRoute APIs directly)
// Useful if you don't need MCP protocol framing.

func callTool(baseURL, tool string, args map[string]any) (string, error) {
    // MCP tools map to OmniRoute APIs:
    endpoints := map[string]string{
        "health": "/api/monitoring/health",
        "combos": "/api/combos",
        "quota":  "/api/usage/quota",
        "models": "/v1/models",
    }

    url := baseURL + endpoints[tool]
    resp, err := http.Get(url)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    body, _ := io.ReadAll(resp.Body)
    return string(body), nil
}

func routeRequest(baseURL, model, prompt string) (string, error) {
    payload := map[string]any{
        "model": model,
        "messages": []map[string]string{
            {"role": "user", "content": prompt},
        },
        "stream": false,
    }
    data, _ := json.Marshal(payload)

    resp, err := http.Post(
        baseURL+"/v1/chat/completions",
        "application/json",
        bytes.NewReader(data),
    )
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    body, _ := io.ReadAll(resp.Body)
    return string(body), nil
}

func main() {
    base := "http://localhost:20128"

    health, _ := callTool(base, "health", nil)
    fmt.Println("Health:", health)

    result, _ := routeRequest(base, "auto", "Hello from Go!")
    fmt.Println("Result:", result)
}
```

---

## Případy použití

### 🔄 Případ použití 1: Agent pro automatické ozdravování

Agent, který monitoruje stav OmniRoute a automaticky přepíná kombinace, když se stav poskytovatelů zhorší.

```python
async def auto_healing_loop(session):
    """Monitor health and react to provider issues."""
    while True:
        # Check health
        health = await session.call_tool("omniroute_get_health", {})
        data = json.loads(health.content[0].text)

        # Find providers with open circuit breakers
        broken = [
            cb for cb in data["circuitBreakers"]
            if cb["state"] == "OPEN"
        ]

        if broken:
            # Switch to a different resilience profile
            await session.call_tool("omniroute_set_resilience_profile", {
                "profile": "conservative"
            })

            # Find best alternative combo
            best = await session.call_tool("omniroute_best_combo_for_task", {
                "taskType": "coding"
            })
            best_data = json.loads(best.content[0].text)
            combo_id = best_data["recommendedCombo"]["id"]

            # Activate it
            await session.call_tool("omniroute_switch_combo", {
                "comboId": combo_id, "active": True
            })
            print(f"⚠️ Auto-healed: switched to {combo_id}")

        await asyncio.sleep(30)  # Check every 30 seconds
```

### 💰 Případ užití 2: Programovací agent s ohledem na rozpočet

Agent, který sleduje náklady v reálném čase a při blížícím se vyčerpání rozpočtu přechází na levnější modely.

```python
async def budget_aware_coding(session, task: str, max_budget: float):
    """Complete a coding task within a budget."""
    # Set budget guard
    await session.call_tool("omniroute_set_budget_guard", {
        "maxCost": max_budget,
        "action": "degrade",
        "degradeToTier": "cheap",
    })

    # Simulate first to estimate cost
    sim = await session.call_tool("omniroute_simulate_route", {
        "model": "claude-sonnet-4",
        "promptTokenEstimate": len(task.split()) * 2,
    })
    sim_data = json.loads(sim.content[0].text)
    estimated_cost = sim_data["fallbackTree"]["bestCaseCost"]
    print(f"Estimated cost: ${estimated_cost:.4f}")

    # Send request
    result = await session.call_tool("omniroute_route_request", {
        "model": "claude-sonnet-4",
        "messages": [{"role": "user", "content": task}],
        "role": "coding",
    })

    # Check remaining budget
    snapshot = await session.call_tool("omniroute_get_session_snapshot", {})
    snap_data = json.loads(snapshot.content[0].text)
    print(f"Session cost: ${snap_data['costTotal']:.4f}")
    if snap_data.get("budgetGuard"):
        print(f"Budget remaining: ${snap_data['budgetGuard']['remaining']:.4f}")

    return json.loads(result.content[0].text)["response"]["content"]
```

### 🧪 Případ použití 3: Kombinovaný benchmarkingový agent

Agent, který pravidelně porovnává všechna komba a hlásí nejrychlejší/nejlevnější.

```python
async def benchmark_combos(session):
    """Benchmark all enabled combos and rank them."""
    combos = await session.call_tool("omniroute_list_combos", {
        "includeMetrics": True,
    })
    combo_list = json.loads(combos.content[0].text)["combos"]

    results = []
    for combo in combo_list:
        if not combo["enabled"]:
            continue

        test = await session.call_tool("omniroute_test_combo", {
            "comboId": combo["id"],
            "testPrompt": "Return the number 42.",
        })
        test_data = json.loads(test.content[0].text)
        results.append({
            "combo": combo["name"],
            "fastest": test_data["summary"]["fastestProvider"],
            "cheapest": test_data["summary"]["cheapestProvider"],
            "success_rate": f'{test_data["summary"]["successful"]}/{test_data["summary"]["totalProviders"]}',
        })

    print("📊 Combo Benchmark Results:")
    for r in results:
        print(f"  {r['combo']}: fastest={r['fastest']}, cheapest={r['cheapest']}, success={r['success_rate']}")
```

### 🔍 Případ použití 4: Agent pro ladění po smrti

Agent, který vysvětluje, proč byl požadavek směrován ke konkrétnímu poskytovateli.

```typescript
async function debugRouting(client: Client, requestId: string) {
  // Explain the routing decision
  const explanation = await client.callTool({
    name: "omniroute_explain_route",
    arguments: { requestId },
  });
  const data = JSON.parse(explanation.content[0].text);

  console.log(`Request ${requestId}:`);
  console.log(`  Provider: ${data.decision.providerSelected}`);
  console.log(`  Model: ${data.decision.modelUsed}`);
  console.log(`  Score: ${data.decision.score}`);
  console.log(`  Factors:`);
  for (const factor of data.decision.factors) {
    console.log(`    ${factor.name}: ${factor.value} (weight: ${factor.weight})`);
  }
  if (data.decision.fallbacksTriggered.length > 0) {
    console.log(`  Fallbacks triggered:`);
    for (const fb of data.decision.fallbacksTriggered) {
      console.log(`    ${fb.provider}: ${fb.reason}`);
    }
  }
}
```

### 📋 Případ použití 5: Agent pro vyhledávání modelů

Agent, který vyhledává nejlevnější modely pro danou funkci.

```python
async def find_cheapest_models(session, capability="chat"):
    """Find the cheapest available models for a capability."""
    catalog = await session.call_tool("omniroute_list_models_catalog", {
        "capability": capability,
    })
    models = json.loads(catalog.content[0].text)["models"]

    # Filter available models with pricing
    priced = [
        m for m in models
        if m["status"] == "available" and m.get("pricing")
    ]
    priced.sort(key=lambda m: m["pricing"]["inputPerMillion"] or float("inf"))

    print(f"💡 Cheapest {capability} models:")
    for m in priced[:5]:
        input_cost = m["pricing"]["inputPerMillion"] or 0
        output_cost = m["pricing"]["outputPerMillion"] or 0
        print(f"  {m['id']} ({m['provider']}): ${input_cost}/M in, ${output_cost}/M out")
```

---

## Zabezpečení a vynucování rozsahu

Server MCP podporuje **detailní vynucování rozsahu** pro prostředí s více klienty:

Rozsah | Nástroje
--- | ---
`read:health` | `get_health` , `simulate_route` , `get_provider_metrics` , `best_combo_for_task` , `explain_route`
`read:combos` | `list_combos` , `get_combo_metrics` , `simulate_route` , `best_combo_for_task` , `test_combo`
`read:quota` | `check_quota`
`read:usage` | `cost_report` , `explain_route` , `get_session_snapshot`
`read:models` | `list_models_catalog`
`write:combos` | `switch_combo`
`write:budget` | `set_budget_guard`
`write:resilience` | `set_resilience_profile`
`execute:completions` | `route_request` , `test_combo`

**Rozsahy zástupných znaků:** Použijte `read:*` pro udělení všech rozsahů pro čtení nebo `*` pro plný přístup.

---

## Protokolování auditu

Každé volání nástroje je zaznamenáno do tabulky SQLite `mcp_tool_audit` :

- **Vstup:** SHA-256 hash (nikdy neukládá nezpracované výzvy)
- **Výstup:** Zkráceno na 200 znaků
- **Metadata:** Název nástroje, doba trvání, úspěch/chyba, ID klíče API

Přístup k auditním datům prostřednictvím:

```typescript
import { getRecentAuditEntries, getAuditStats } from "./audit";

const entries = await getRecentAuditEntries(50);
const stats = await getAuditStats();
// stats: { totalCalls, successRate, avgDurationMs, topTools }
```

---

## Struktura souboru

```
mcp-server/
├── server.ts              # MCP server setup, essential tool handlers, entry point
├── index.ts               # Barrel export
├── audit.ts               # SQLite audit logger (SHA-256 input hashing)
├── scopeEnforcement.ts    # Fine-grained scope enforcement
├── schemas/
│   ├── tools.ts           # Zod schemas for all 16 tools (input/output/scopes)
│   ├── a2a.ts             # A2A protocol types (Agent Card, Task, JSON-RPC)
│   ├── audit.ts           # Audit & routing decision types + hash helpers
│   └── index.ts           # Schema barrel export
├── tools/
│   └── advancedTools.ts   # Phase 2 tool handlers (8 advanced tools)
└── __tests__/
    ├── essentialTools.test.ts
    ├── advancedTools.test.ts
    └── a2aLifecycle.test.ts
```

---

## Licence

Součást [OmniRoute](https://github.com/diegosouzapw/OmniRoute) — licence MIT.
