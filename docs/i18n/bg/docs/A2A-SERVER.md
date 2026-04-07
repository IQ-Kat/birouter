# OmniRoute A2A Server Documentation (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/A2A-SERVER.md) · 🇪🇸 [es](../../es/docs/A2A-SERVER.md) · 🇫🇷 [fr](../../fr/docs/A2A-SERVER.md) · 🇩🇪 [de](../../de/docs/A2A-SERVER.md) · 🇮🇹 [it](../../it/docs/A2A-SERVER.md) · 🇷🇺 [ru](../../ru/docs/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/A2A-SERVER.md) · 🇯🇵 [ja](../../ja/docs/A2A-SERVER.md) · 🇰🇷 [ko](../../ko/docs/A2A-SERVER.md) · 🇸🇦 [ar](../../ar/docs/A2A-SERVER.md) · 🇮🇳 [hi](../../hi/docs/A2A-SERVER.md) · 🇮🇳 [in](../../in/docs/A2A-SERVER.md) · 🇹🇭 [th](../../th/docs/A2A-SERVER.md) · 🇻🇳 [vi](../../vi/docs/A2A-SERVER.md) · 🇮🇩 [id](../../id/docs/A2A-SERVER.md) · 🇲🇾 [ms](../../ms/docs/A2A-SERVER.md) · 🇳🇱 [nl](../../nl/docs/A2A-SERVER.md) · 🇵🇱 [pl](../../pl/docs/A2A-SERVER.md) · 🇸🇪 [sv](../../sv/docs/A2A-SERVER.md) · 🇳🇴 [no](../../no/docs/A2A-SERVER.md) · 🇩🇰 [da](../../da/docs/A2A-SERVER.md) · 🇫🇮 [fi](../../fi/docs/A2A-SERVER.md) · 🇵🇹 [pt](../../pt/docs/A2A-SERVER.md) · 🇷🇴 [ro](../../ro/docs/A2A-SERVER.md) · 🇭🇺 [hu](../../hu/docs/A2A-SERVER.md) · 🇧🇬 [bg](../../bg/docs/A2A-SERVER.md) · 🇸🇰 [sk](../../sk/docs/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/A2A-SERVER.md) · 🇮🇱 [he](../../he/docs/A2A-SERVER.md) · 🇵🇭 [phi](../../phi/docs/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/A2A-SERVER.md) · 🇨🇿 [cs](../../cs/docs/A2A-SERVER.md) · 🇹🇷 [tr](../../tr/docs/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute като интелигентен агент за маршрутизиране## Agent Discovery```bash
> curl http://localhost:20128/.well-known/agent.json

````

Връща картата на агента, описваща възможностите, уменията и изискванията за удостоверяване в OmniRoute.---## Authentication

Всички заявки `/a2a` изискват API ключ чрез заглавката `Authorization`:```
Упълномощаване: Носител YOUR_OMNIROUTE_API_KEY```

Ако на сървъра не е конфигуриран API ключ, удостоверяването се заобикаля.---

## JSON-RPC 2.0 Methods

### `message/send` — Synchronous Execution

Изпраща съобщение до умение и изчаква пълния отговор.```bash
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

**Отговор:**`json
{
  "jsonrpc": "2.0",
  "id": "1",
  "резултат": {
    "task": { "id": "uuid", "state": "completed" },
    "артефакти": [{ "тип": "текст", "съдържание": "..." }],
    "метаданни": {
      "routing_explanation": "Избран клод-сонет чрез доставчик \"anthropic\" (закъснение: 1200ms, цена: $0,003)",
      "cost_envelope": { "estimated": 0,005, "actual": 0,003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "в рамките на бюджета и квотите" }
    }
  }
}`

### `message/stream` — SSE Streaming

Същото като `message/send`, но връща изпратени от сървъра събития за поточно предаване в реално време.```bash
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

**SSE събития:**```
данни: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: сърдечен ритъм 2026-03-03T17:00:00Z

данни: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}```

### `tasks/get` — Query Task Status

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Тип съдържание: приложение/json" \
  -H "Упълномощаване: Носител YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'```

### `tasks/cancel` — Cancel a Task

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Тип съдържание: приложение/json" \
  -H "Упълномощаване: Носител YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'```

---

## Available Skills

| Умение | Описание |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `интелигентно маршрутизиране` | Подкани за маршрути чрез интелигентния тръбопровод на OmniRoute. Връща отговор с обяснение на маршрута, цена и проследяване на устойчивостта. |
| `управление на квоти` | Отговаря на запитвания на естествен език относно квотите на доставчика, предлага безплатни комбинации и предоставя класиране на квотите.                      |---

## Task Lifecycle

````

изпратен → работи → завършен
→ неуспешно
→ отменен```

- Задачите изтичат след 5 минути (може да се конфигурира)
- Състояния на терминала: `завършено`, `неуспешно`, `отменено`
- Дневникът на събитията проследява всеки преход на състояние---

## Error Codes

| Код    | Значение                            |
| :----- | :---------------------------------- | --- |
| -32700 | Грешка при анализа (невалиден JSON) |
| -32600 | Невалидна заявка / Неоторизирана    |
| -32601 | Методът или умението не са намерени |
| -32602 | Невалидни параметри                 |
| -32603 | Вътрешна грешка                     | --- |

## Integration Examples

### Python (requests)

````python
заявки за импортиране

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "метод": "съобщение/изпращане",
    "параметри": {
        "умение": "интелигентно маршрутизиране",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Упълномощаване": "Носител YOUR_KEY"})

резултат = resp.json()["резултат"]
печат (резултат["артефакти"][0]["съдържание"])
print(result["metadata"]["routing_explanation"])```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  метод: "POST",
  заглавки: {
    "Content-Type": "приложение/json",
    Упълномощаване: "Носител YOUR_KEY",
  },
  тяло: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    метод: "съобщение/изпрати",
    параметри: {
      умение: "интелигентно маршрутизиране",
      съобщения: [{ роля: "потребител", съдържание: "Здравей" }],
    },
  }),
});
const {резултат} = изчакайте resp.json();
console.log(result.metadata.routing_explanation);```
````
