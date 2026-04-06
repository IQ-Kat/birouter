# API Reference (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

ข้อมูลอ้างอิงที่สมบูรณ์สำหรับตำแหน่งข้อมูล OmniRoute API ทั้งหมด---

## Table of Contents

- [เสร็จสิ้นการแชท](#เสร็จสิ้นการแชท)
- [การฝัง](#การฝัง)
- [การสร้างภาพ](#การสร้างภาพ)
- [โมเดลรายการ](#list-models)
- [จุดสิ้นสุดความเข้ากันได้](#จุดสิ้นสุดความเข้ากันได้)
- [แคชความหมาย](#semantic-แคช)
- [แดชบอร์ดและการจัดการ](#dashboard--การจัดการ)
- [กำลังประมวลผลคำขอ](#กำลังประมวลผลคำขอ)
- [การรับรองความถูกต้อง](#การรับรองความถูกต้อง)---

## Chat Completions

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Custom Headers

| ส่วนหัว                   | ทิศทาง  | คำอธิบาย                                              |
| ------------------------- | ------- | ----------------------------------------------------- |
| `X-OmniRoute-ไม่มีแคช`    | ขอ      | ตั้งค่าเป็น "จริง" เพื่อข้ามแคช                       |
| `X-OmniRoute-ความคืบหน้า` | ขอ      | ตั้งค่าเป็น "จริง" สำหรับเหตุการณ์ความคืบหน้า         |
| `X-เซสชัน-Id`             | ขอ      | คีย์เซสชันที่ติดหนึบสำหรับความสัมพันธ์ของเซสชันภายนอก |
| `x_session_id`            | ขอ      | ยอมรับรูปแบบขีดล่างด้วย (HTTP โดยตรง)                 |
| `Idempotency-Key`         | ขอ      | ปุ่ม Dedup (หน้าต่าง 5s)                              |
| `X-คำขอ-Id`               | ขอ      | คีย์สำรองสำรอง                                        |
| `X-OmniRoute-แคช`         | ตอบกลับ | `HIT` หรือ `MISS` (ไม่สตรีมมิ่ง)                      |
| `X-OmniRoute-Idempotent`  | ตอบกลับ | `จริง` หากขจัดข้อมูลซ้ำซ้อน                           |
| `X-OmniRoute-ความคืบหน้า` | ตอบกลับ | `เปิดใช้งาน` หากการติดตามความคืบหน้าบน                |
| `X-OmniRoute-เซสชัน-Id`   | ตอบกลับ | รหัสเซสชันที่มีประสิทธิภาพที่ใช้โดย OmniRoute         |

> หมายเหตุ Nginx: หากคุณใช้ส่วนหัวขีดล่าง (เช่น `x_session_id`) ให้เปิดใช้งาน `underscores_in_headers on;`---

## Embeddings

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

ผู้ให้บริการที่มีอยู่: Nebius, OpenAI, Mistral, Together AI, ดอกไม้ไฟ, NVIDIA```bash

# List all embedding models

GET /v1/embeddings

````

---

## Image Generation

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
````

ผู้ให้บริการที่มีอยู่: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI```bash

# List all image models

GET /v1/images/generations

````

---

## List Models

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
````

---

## Compatibility Endpoints

| วิธีการ | เส้นทาง                       | รูปแบบ                |
| ------- | ----------------------------- | --------------------- | ----------------------------- |
| โพสต์   | `/v1/แชท/เสร็จสิ้น`           | OpenAI                |
| โพสต์   | `/v1/ข้อความ`                 | มานุษยวิทยา           |
| โพสต์   | `/v1/ตอบกลับ`                 | การตอบสนองของ OpenAI  |
| โพสต์   | `/v1/การฝัง`                  | OpenAI                |
| โพสต์   | `/v1/images/รุ่น`             | OpenAI                |
| รับ     | `/v1/รุ่น`                    | OpenAI                |
| โพสต์   | `/v1/messages/count_tokens`   | มานุษยวิทยา           |
| รับ     | `/v1beta/รุ่น`                | ราศีเมถุน             |
| โพสต์   | `/v1beta/models/{...เส้นทาง}` | ราศีเมถุนสร้างเนื้อหา |
| โพสต์   | `/v1/api/แชท`                 | โอลามา                | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

คำนำหน้าผู้ให้บริการจะถูกเพิ่มอัตโนมัติหากไม่มี โมเดลที่ไม่ตรงกันส่งคืน "400"---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

ตัวอย่างการตอบกลับ:```json
{
"semanticCache": {
"memorySize": 42,
"memoryMaxSize": 500,
"dbSize": 128,
"hitRate": 0.65
},
"idempotency": {
"activeKeys": 3,
"windowMs": 5000
}
}

````

---

## Dashboard & Management

### Authentication

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| --------------------------------- | ------- | --------------------- |
| `/api/auth/login` | โพสต์ | เข้าสู่ระบบ |
| `/api/auth/logout` | โพสต์ | ออกจากระบบ |
| `/api/settings/require-login` | รับ/ใส่ | ต้องสลับการเข้าสู่ระบบ |### Provider Management

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| ---------------------------- | --------------- | ------------------------ |
| `/api/ผู้ให้บริการ` | รับ/โพสต์ | รายชื่อ / สร้างผู้ให้บริการ |
| `/api/ผู้ให้บริการ/[id]` | รับ/วาง/ลบ | จัดการผู้ให้บริการ |
| `/api/ผู้ให้บริการ/[id]/test` | โพสต์ | การเชื่อมต่อผู้ให้บริการทดสอบ |
| `/api/ผู้ให้บริการ/[id]/models` | รับ | รายชื่อรุ่นของผู้ให้บริการ |
| `/api/ผู้ให้บริการ/ตรวจสอบ` | โพสต์ | ตรวจสอบการกำหนดค่าผู้ให้บริการ |
| `/api/ผู้ให้บริการโหนด*` | ต่างๆ | การจัดการโหนดผู้ให้บริการ |
| `/api/ผู้ให้บริการ-รุ่น` | รับ/โพสต์/ลบ | โมเดลที่กำหนดเอง |### OAuth Flows

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| -------------------------------- | ------- | ----------------------- |
| `/api/oauth/[ผู้ให้บริการ]/[การกระทำ]` | ต่างๆ | OAuth เฉพาะผู้ให้บริการ |### Routing & Config

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| --------------------- | -------- | --------------------------------- |
| `/api/models/นามแฝง` | รับ/โพสต์ | นามแฝงโมเดล |
| `/api/models/catalog` | รับ | ทุกรุ่นตามผู้ให้บริการ + ประเภท |
| `/api/คอมโบ*` | ต่างๆ | การจัดการคำสั่งผสม |
| `/api/keys*` | ต่างๆ | การจัดการคีย์ API |
| `/api/ราคา` | รับ | ราคารุ่น |### Usage & Analytics

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| ------------------------------- | ------ | -------------------- |
| `/api/การใช้งาน/ประวัติ` | รับ | ประวัติการใช้งาน |
| `/api/การใช้งาน/บันทึก` | รับ | บันทึกการใช้งาน |
| `/api/usage/request-logs` | รับ | บันทึกระดับคำขอ |
| `/api/usage/[รหัสการเชื่อมต่อ]` | รับ | การใช้งานต่อการเชื่อมต่อ |### Settings

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| ----------------------------------- | ------------- | ---------------------- |
| `/api/settings` | รับ/ใส่/แพทช์ | การตั้งค่าทั่วไป |
| `/api/settings/proxy` | รับ/ใส่ | การกำหนดค่าพร็อกซีเครือข่าย |
| `/api/settings/proxy/test` | โพสต์ | ทดสอบการเชื่อมต่อพร็อกซี |
| `/api/settings/ip-filter` | รับ/ใส่ | รายการ IP ที่อนุญาต/รายการบล็อก |
| `/api/settings/การคิดงบประมาณ` | รับ/ใส่ | งบประมาณโทเค็นการใช้เหตุผล |
| `/api/settings/system-prompt` | รับ/ใส่ | พร้อมท์ระบบโกลบอล |### Monitoring

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------- |
| `/api/เซสชัน` | รับ | การติดตามเซสชันที่ใช้งานอยู่ |
| `/api/จำกัดอัตรา` | รับ | ขีดจำกัดอัตราต่อบัญชี |
| `/api/การตรวจสอบ/สุขภาพ` | รับ | การตรวจสุขภาพ + สรุปผู้ให้บริการ (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/แคช/สถิติ` | รับ/ลบ | สถิติแคช / ล้าง |### Backup & Export/Import

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| ------------------------------- | ------ | --------------------------------------- |
| `/api/db-สำรอง` | รับ | แสดงรายการข้อมูลสำรองที่มีอยู่ |
| `/api/db-สำรอง` | ใส่ | สร้างการสำรองข้อมูลด้วยตนเอง |
| `/api/db-สำรอง` | โพสต์ | กู้คืนจากข้อมูลสำรองเฉพาะ |
| `/api/db-backups/export` | รับ | ดาวน์โหลดฐานข้อมูลเป็นไฟล์ .sqlite |
| `/api/db-backups/import` | โพสต์ | อัปโหลดไฟล์ .sqlite เพื่อแทนที่ฐานข้อมูล |
| `/api/db-backups/exportAll` | รับ | ดาวน์โหลดข้อมูลสำรองแบบเต็มเป็นไฟล์ .tar.gz |### Cloud Sync

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| ---------------------- | ------- | --------------------- |
| `/api/sync/cloud` | ต่างๆ | การดำเนินการซิงค์บนคลาวด์ |
| `/api/sync/เริ่มต้น` | โพสต์ | เริ่มต้นการซิงค์ |
| `/api/cloud/*` | ต่างๆ | การจัดการคลาวด์ |### Tunnels

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| -------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | รับ | อ่านสถานะการติดตั้ง/รันไทม์ Cloudflare Quick Tunnel สำหรับแดชบอร์ด |
| `/api/tunnels/cloudflared` | โพสต์ | เปิดหรือปิดใช้งาน Cloudflare Quick Tunnel (`action=enable/disable`) |### CLI Tools

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings` | รับ | สถานะ Claude CLI |
| `/api/cli-tools/codex-settings` | รับ | สถานะ Codex CLI |
| `/api/cli-tools/droid-settings` | รับ | สถานะ Droid CLI |
| `/api/cli-tools/openclaw-settings` | รับ | สถานะ OpenClaw CLI |
| `/api/cli-tools/runtime/[toolId]` | รับ | รันไทม์ CLI ทั่วไป |

การตอบสนองของ CLI ได้แก่: `ติดตั้ง`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`### ACP Agents

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| ----------------- | ------ | ------------------------------------------------------------ |
| `/api/acp/ตัวแทน` | รับ | แสดงรายการตัวแทนที่ตรวจพบทั้งหมด (ในตัว + กำหนดเอง) พร้อมสถานะ |
| `/api/acp/ตัวแทน` | โพสต์ | เพิ่มเอเจนต์ที่กำหนดเองหรือแคชการตรวจจับการรีเฟรช |
| `/api/acp/ตัวแทน` | ลบ | ลบตัวแทนที่กำหนดเองโดยพารามิเตอร์แบบสอบถาม `id` |

การตอบสนองของ GET ประกอบด้วย `ตัวแทน[]` (id, ชื่อ, ไบนารี, เวอร์ชัน, ติดตั้งแล้ว, โปรโตคอล, isCustom) และ `สรุป` (ทั้งหมด, ติดตั้งแล้ว, notFound, บิวท์อิน, กำหนดเอง)### Resilience & Rate Limits

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| ----------------------- | --------- | ----------------------------------- |
| `/api/ความยืดหยุ่น` | รับ/แพทช์ | รับ/อัปเดตโปรไฟล์ความยืดหยุ่น |
| `/api/ความยืดหยุ่น/รีเซ็ต` | โพสต์ | รีเซ็ตเบรกเกอร์วงจร |
| `/api/จำกัดอัตรา` | รับ | สถานะขีดจำกัดอัตราต่อบัญชี |
| `/api/จำกัดอัตรา` | รับ | การกำหนดค่าขีดจำกัดอัตราทั่วโลก |### Evals

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| ------------ | -------- | --------------------------------- |
| `/api/evals` | รับ/โพสต์ | แสดงรายการชุด eval / ดำเนินการประเมินผล |### Policies

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| --------------- | --------------- | ----------------------- |
| `/api/นโยบาย` | รับ/โพสต์/ลบ | จัดการนโยบายการกำหนดเส้นทาง |### Compliance

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| ------------------------------- | ------ | --------------------------------- |
| `/api/compliance/บันทึกการตรวจสอบ` | รับ | บันทึกการตรวจสอบการปฏิบัติตามข้อกำหนด (N สุดท้าย) |### v1beta (Gemini-Compatible)

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| -------------------------- | ------ | --------------------------------- |
| `/v1beta/รุ่น` | รับ | รายการรุ่นในรูปแบบราศีเมถุน |
| `/v1beta/models/{...เส้นทาง}` | โพสต์ | จุดสิ้นสุด `สร้างเนื้อหา` ของราศีเมถุน |

ตำแหน่งข้อมูลเหล่านี้สะท้อนรูปแบบ API ของ Gemini สำหรับไคลเอนต์ที่คาดหวังความเข้ากันได้ของ Gemini SDK ดั้งเดิม### Internal / System APIs

| จุดสิ้นสุด | วิธีการ | คำอธิบาย |
| --------------- | ------ | --------------------------------------------------- |
| `/api/init` | รับ | การตรวจสอบการเริ่มต้นแอปพลิเคชัน (ใช้ในการรันครั้งแรก) |
| `/api/tags` | รับ | แท็กโมเดลที่เข้ากันได้กับ Ollama (สำหรับลูกค้า Ollama) |
| `/api/รีสตาร์ท` | โพสต์ | ทริกเกอร์การรีสตาร์ทเซิร์ฟเวอร์อย่างสง่างาม |
| `/api/ปิดระบบ` | โพสต์ | ทริกเกอร์การปิดระบบเซิร์ฟเวอร์อย่างสง่างาม |

>**หมายเหตุ:**ตำแหน่งข้อมูลเหล่านี้ถูกใช้ภายในโดยระบบหรือเพื่อความเข้ากันได้กับไคลเอ็นต์ Ollama โดยทั่วไปแล้วจะไม่ถูกเรียกโดยผู้ใช้ปลายทาง---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

ถอดเสียงไฟล์เสียงโดยใช้ Deepgram หรือ AssemblyAI

**ขอ:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**การตอบสนอง:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**ผู้ให้บริการที่รองรับ:**`deepgram/nova-3`, `assemblyai/best`

**รูปแบบที่รองรับ:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`---

## Ollama Compatibility

สำหรับลูกค้าที่ใช้รูปแบบ API ของ Ollama:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

คำขอจะได้รับการแปลโดยอัตโนมัติระหว่าง Ollama และรูปแบบภายใน---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**การตอบสนอง:**```json
{
"providers": {
"claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
"github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
}
}

````

---

## Budget

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
````

---

## Model Availability

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Request Processing

1. ลูกค้าส่งคำขอไปที่ `/v1/*`
2. ตัวจัดการเส้นทางเรียก `handleChat`, `handleEmbedding`, `handleAudioTranscription` หรือ `handleImageGeneration`
3. โมเดลได้รับการแก้ไขแล้ว (ผู้ให้บริการโดยตรง/โมเดลหรือนามแฝง/คอมโบ)
4. ข้อมูลรับรองที่เลือกจากฐานข้อมูลท้องถิ่นพร้อมการกรองความพร้อมใช้งานของบัญชี
5. สำหรับการแชท: `handleChatCore` — การตรวจจับรูปแบบ การแปล การตรวจสอบแคช การตรวจสอบค่าเดิม
6. ผู้ดำเนินการของผู้ให้บริการส่งคำขออัปสตรีม
7. การตอบสนองถูกแปลกลับเป็นรูปแบบไคลเอนต์ (แชท) หรือส่งคืนตามสภาพ (การฝัง/รูปภาพ/เสียง)
8. บันทึกการใช้งาน/การบันทึก
9. การใช้ทางเลือกสำรองจะมีผลกับข้อผิดพลาดตามกฎคอมโบ

การอ้างอิงสถาปัตยกรรมแบบเต็ม: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- เส้นทางแดชบอร์ด (`/dashboard/*`) ใช้คุกกี้ `auth_token`
- การเข้าสู่ระบบใช้แฮชรหัสผ่านที่บันทึกไว้ สำรองไปที่ `INITIAL_PASSWORD`
- `requireLogin` สลับได้ผ่าน `/api/settings/require-login`
- เส้นทาง `/v1/*` เป็นทางเลือกที่ต้องใช้คีย์ Bearer API เมื่อ `REQUIRE_API_KEY=true`
