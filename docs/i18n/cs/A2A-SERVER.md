# Dokumentace k serveru OmniRoute A2A

> Protokol Agent-to-Agent v0.3 — OmniRoute jako inteligentní směrovací agent

## Objevování agentů

```bash
curl http://localhost:20128/.well-known/agent.json
```

Vrátí kartu agenta popisující schopnosti, dovednosti a požadavky na ověřování OmniRoute.

---

## Ověřování

Všechny požadavky `/a2a` vyžadují klíč API zadaný prostřednictvím hlavičky `Authorization` :

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Pokud na serveru není nakonfigurován žádný klíč API, ověřování se obejde.

---

## Metody JSON-RPC 2.0

### `message/send` — synchronní spuštění

Odešle zprávu dovednosti a čeká na úplnou odpověď.

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

**Odpověď:**

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

### `message/stream` — SSE streamování

Stejné jako `message/send` , ale vrací události odeslané serverem pro streamování v reálném čase.

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

**Události SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Dotaz na stav úlohy

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Zrušit úkol

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Dostupné dovednosti

Dovednost | Popis
:-- | :--
`smart-routing` | Směruje výzvy prostřednictvím inteligentního kanálu OmniRoute. Vrací odpověď s vysvětlením směrování, náklady a trasou odolnosti.
`quota-management` | Odpovídá na dotazy v přirozeném jazyce týkající se kvót poskytovatelů, navrhuje bezplatné kombinace a poskytuje hodnocení kvót.

---

## Životní cyklus úkolu

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Úkoly vyprší po 5 minutách (konfigurovatelné)
- Stavy terminálu: `completed` , `failed` , `cancelled`
- Záznam událostí sleduje každý přechod stavu

---

## Chybové kódy

Kód | Význam
:-- | :--
-32700 | Chyba při analýze (neplatný JSON)
-32600 | Neplatný požadavek / Neautorizovaný
-32601 | Metoda nebo dovednost nenalezena
-32602 | Neplatné parametry
-32603 | Interní chyba

---

## Příklady integrace

### Python (požadavky)

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

### TypeScript (načtení)

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
