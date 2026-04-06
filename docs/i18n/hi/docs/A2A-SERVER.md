# OmniRoute A2A Server Documentation (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/A2A-SERVER.md) · 🇪🇸 [es](../../es/docs/A2A-SERVER.md) · 🇫🇷 [fr](../../fr/docs/A2A-SERVER.md) · 🇩🇪 [de](../../de/docs/A2A-SERVER.md) · 🇮🇹 [it](../../it/docs/A2A-SERVER.md) · 🇷🇺 [ru](../../ru/docs/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/A2A-SERVER.md) · 🇯🇵 [ja](../../ja/docs/A2A-SERVER.md) · 🇰🇷 [ko](../../ko/docs/A2A-SERVER.md) · 🇸🇦 [ar](../../ar/docs/A2A-SERVER.md) · 🇮🇳 [hi](../../hi/docs/A2A-SERVER.md) · 🇮🇳 [in](../../in/docs/A2A-SERVER.md) · 🇹🇭 [th](../../th/docs/A2A-SERVER.md) · 🇻🇳 [vi](../../vi/docs/A2A-SERVER.md) · 🇮🇩 [id](../../id/docs/A2A-SERVER.md) · 🇲🇾 [ms](../../ms/docs/A2A-SERVER.md) · 🇳🇱 [nl](../../nl/docs/A2A-SERVER.md) · 🇵🇱 [pl](../../pl/docs/A2A-SERVER.md) · 🇸🇪 [sv](../../sv/docs/A2A-SERVER.md) · 🇳🇴 [no](../../no/docs/A2A-SERVER.md) · 🇩🇰 [da](../../da/docs/A2A-SERVER.md) · 🇫🇮 [fi](../../fi/docs/A2A-SERVER.md) · 🇵🇹 [pt](../../pt/docs/A2A-SERVER.md) · 🇷🇴 [ro](../../ro/docs/A2A-SERVER.md) · 🇭🇺 [hu](../../hu/docs/A2A-SERVER.md) · 🇧🇬 [bg](../../bg/docs/A2A-SERVER.md) · 🇸🇰 [sk](../../sk/docs/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/A2A-SERVER.md) · 🇮🇱 [he](../../he/docs/A2A-SERVER.md) · 🇵🇭 [phi](../../phi/docs/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/A2A-SERVER.md) · 🇨🇿 [cs](../../cs/docs/A2A-SERVER.md) · 🇹🇷 [tr](../../tr/docs/A2A-SERVER.md)

---

> एजेंट-टू-एजेंट प्रोटोकॉल v0.3 - एक बुद्धिमान रूटिंग एजेंट के रूप में ओमनीरूट## Agent Discovery

```bash
curl http://localhost:20128/.well-known/agent.json
```

ओमनीरूट की क्षमताओं, कौशल और प्रमाणीकरण आवश्यकताओं का वर्णन करने वाला एजेंट कार्ड लौटाता है।---

## Authentication

सभी `/a2a` अनुरोधों के लिए `प्राधिकरण` शीर्षलेख के माध्यम से एक एपीआई कुंजी की आवश्यकता होती है:```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY

````

यदि सर्वर पर कोई एपीआई कुंजी कॉन्फ़िगर नहीं की गई है, तो प्रमाणीकरण बायपास हो जाता है।---

## JSON-RPC 2.0 Methods

### `message/send` — Synchronous Execution

किसी कौशल को संदेश भेजता है और पूर्ण प्रतिक्रिया की प्रतीक्षा करता है।```bash
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
````

**प्रतिक्रिया:**```json
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
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}

````

### `tasks/get` — Query Task Status

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
````

### `tasks/cancel` — Cancel a Task

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Available Skills

| कौशल             | विवरण                                                                                                                                   |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `स्मार्ट-रूटिंग` | रूट्स ओमनीरूट की बुद्धिमान पाइपलाइन के माध्यम से संकेत देते हैं। रूटिंग स्पष्टीकरण, लागत और लचीलापन ट्रेस के साथ प्रतिक्रिया लौटाता है। |
| `कोटा-प्रबंधन`   | प्रदाता कोटा के बारे में प्राकृतिक भाषा में प्रश्नों का उत्तर देता है, मुफ़्त कॉम्बो का सुझाव देता है, और कोटा रैंकिंग प्रदान करता है।  | --- |

## Task Lifecycle

```
submitted → working → completed
                    → failed
                    → cancelled
```

- कार्य 5 मिनट के बाद समाप्त हो जाते हैं (कॉन्फ़िगर करने योग्य)
- टर्मिनल बताता है: `पूर्ण`, `असफल`, `रद्द`
- इवेंट लॉग प्रत्येक राज्य परिवर्तन को ट्रैक करता है---

## Error Codes

| कोड    | मतलब                       |
| :----- | :------------------------- | --- |
| -32700 | पार्स त्रुटि (अमान्य JSON) |
| -32600 | अमान्य अनुरोध/अनधिकृत      |
| -32601 | विधि या कौशल नहीं मिला     |
| -32602 | अमान्य पैरामीटर            |
| -32603 | आंतरिक त्रुटि              | --- |

## Integration Examples

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
