# OmniRoute A2A Server Documentation (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/A2A-SERVER.md) · 🇪🇸 [es](../../es/docs/A2A-SERVER.md) · 🇫🇷 [fr](../../fr/docs/A2A-SERVER.md) · 🇩🇪 [de](../../de/docs/A2A-SERVER.md) · 🇮🇹 [it](../../it/docs/A2A-SERVER.md) · 🇷🇺 [ru](../../ru/docs/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/A2A-SERVER.md) · 🇯🇵 [ja](../../ja/docs/A2A-SERVER.md) · 🇰🇷 [ko](../../ko/docs/A2A-SERVER.md) · 🇸🇦 [ar](../../ar/docs/A2A-SERVER.md) · 🇮🇳 [hi](../../hi/docs/A2A-SERVER.md) · 🇮🇳 [in](../../in/docs/A2A-SERVER.md) · 🇹🇭 [th](../../th/docs/A2A-SERVER.md) · 🇻🇳 [vi](../../vi/docs/A2A-SERVER.md) · 🇮🇩 [id](../../id/docs/A2A-SERVER.md) · 🇲🇾 [ms](../../ms/docs/A2A-SERVER.md) · 🇳🇱 [nl](../../nl/docs/A2A-SERVER.md) · 🇵🇱 [pl](../../pl/docs/A2A-SERVER.md) · 🇸🇪 [sv](../../sv/docs/A2A-SERVER.md) · 🇳🇴 [no](../../no/docs/A2A-SERVER.md) · 🇩🇰 [da](../../da/docs/A2A-SERVER.md) · 🇫🇮 [fi](../../fi/docs/A2A-SERVER.md) · 🇵🇹 [pt](../../pt/docs/A2A-SERVER.md) · 🇷🇴 [ro](../../ro/docs/A2A-SERVER.md) · 🇭🇺 [hu](../../hu/docs/A2A-SERVER.md) · 🇧🇬 [bg](../../bg/docs/A2A-SERVER.md) · 🇸🇰 [sk](../../sk/docs/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/A2A-SERVER.md) · 🇮🇱 [he](../../he/docs/A2A-SERVER.md) · 🇵🇭 [phi](../../phi/docs/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/A2A-SERVER.md) · 🇨🇿 [cs](../../cs/docs/A2A-SERVER.md) · 🇹🇷 [tr](../../tr/docs/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute เป็นตัวแทนการกำหนดเส้นทางอัจฉริยะ## Agent Discovery

```bash
curl http://localhost:20128/.well-known/agent.json
```

ส่งคืนบัตรตัวแทนที่อธิบายความสามารถ ทักษะ และข้อกำหนดการรับรองความถูกต้องของ OmniRoute---

## Authentication

คำขอ `/a2a` ทั้งหมดต้องใช้คีย์ API ผ่านส่วนหัว 'การอนุญาต':```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY

````

หากไม่มีการกำหนดค่าคีย์ API บนเซิร์ฟเวอร์ การรับรองความถูกต้องจะถูกข้าม---

## JSON-RPC 2.0 Methods

### `message/send` — Synchronous Execution

ส่งข้อความถึงทักษะและรอการตอบกลับที่สมบูรณ์```bash
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

**การตอบสนอง:**```json
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

เหมือนกับ `ข้อความ/ส่ง` แต่ส่งคืนเหตุการณ์ที่เซิร์ฟเวอร์ส่งสำหรับการสตรีมแบบเรียลไทม์```bash
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

**เหตุการณ์ SSE:**```
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

| ทักษะ                     | คำอธิบาย                                                                                                         |
| :------------------------ | :--------------------------------------------------------------------------------------------------------------- | --- |
| `การกำหนดเส้นทางอัจฉริยะ` | บอกเส้นทางผ่านไปป์ไลน์อัจฉริยะของ OmniRoute ส่งคืนการตอบกลับพร้อมคำอธิบายเส้นทาง ต้นทุน และการติดตามความยืดหยุ่น |
| `การจัดการโควต้า`         | ตอบคำถามที่เป็นภาษาธรรมชาติเกี่ยวกับโควต้าของผู้ให้บริการ แนะนำคอมโบฟรี และจัดอันดับโควต้า                       | --- |

## Task Lifecycle

```
submitted → working → completed
                    → failed
                    → cancelled
```

- งานหมดอายุหลังจาก 5 นาที (กำหนดค่าได้)
- สถานะเทอร์มินัล: `เสร็จสมบูรณ์`, `ล้มเหลว`, `ยกเลิก'
- บันทึกเหตุการณ์ติดตามทุกการเปลี่ยนแปลงสถานะ---

## Error Codes

| รหัส   | ความหมาย                                      |
| :----- | :-------------------------------------------- | --- |
| -32700 | ข้อผิดพลาดในการแยกวิเคราะห์ (JSON ไม่ถูกต้อง) |
| -32600 | คำขอไม่ถูกต้อง / ไม่ได้รับอนุญาต              |
| -32601 | ไม่พบวิธีการหรือทักษะ                         |
| -32602 | พารามิเตอร์ไม่ถูกต้อง                         |
| -32603 | ข้อผิดพลาดภายใน                               | --- |

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
