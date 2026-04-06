# Contributing to OmniRoute (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

ขอขอบคุณที่สนใจร่วมให้ข้อมูล! คู่มือนี้ครอบคลุมทุกสิ่งที่คุณต้องการในการเริ่มต้น---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (แนะนำ: 22 LTS) -**npm**10+ -**กิต**### Clone & Install

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Environment Variables

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

ตัวแปรสำคัญสำหรับการพัฒนา:

| ตัวแปร                 | ค่าเริ่มต้นการพัฒนา      | คำอธิบาย                    |
| ---------------------- | ------------------------ | --------------------------- | ---------------------- |
| `พอร์ต`                | `20128`                  | พอร์ตเซิร์ฟเวอร์            |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | URL ฐานสำหรับส่วนหน้า       |
| `JWT_SECRET`           | (สร้างด้านบน)            | JWT ลงนามความลับ            |
| `INITIAL_PASSWORD`     | `การเปลี่ยนแปลง`         | รหัสผ่านเข้าสู่ระบบครั้งแรก |
| `APP_LOG_LEVEL`        | `ข้อมูล`                 | บันทึกระดับคำฟุ่มเฟือย      | ### Dashboard Settings |

แดชบอร์ดมีการสลับ UI สำหรับคุณสมบัติที่สามารถกำหนดค่าผ่านตัวแปรสภาพแวดล้อมได้:

| การตั้งค่าตำแหน่ง    | สลับ                  | คำอธิบาย                                 |
| -------------------- | --------------------- | ---------------------------------------- |
| การตั้งค่า → ขั้นสูง | โหมดแก้ไขข้อบกพร่อง   | เปิดใช้งานบันทึกคำขอแก้ไขข้อบกพร่อง (UI) |
| การตั้งค่า → ทั่วไป  | การมองเห็นแถบด้านข้าง | แสดง/ซ่อนส่วนของแถบด้านข้าง              |

การตั้งค่าเหล่านี้จะถูกเก็บไว้ในฐานข้อมูลและคงอยู่ตลอดการรีสตาร์ท โดยแทนที่ค่าเริ่มต้นของ env var เมื่อตั้งค่า### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

URL เริ่มต้น:

-**แดชบอร์ด**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**อย่าผูกมัดกับ `main` โดยตรง**ใช้สาขาฟีเจอร์เสมอ```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| คำนำหน้า | วัตถุประสงค์ |
| ----------- | ------------------------- |
| `feat/` | คุณสมบัติใหม่ |
| `แก้ไข/` | แก้ไขข้อผิดพลาด |
| `รีแฟคเตอร์/` | การปรับโครงสร้างรหัส |
| `เอกสาร/` | การเปลี่ยนแปลงเอกสาร |
| `ทดสอบ/` | ทดสอบเพิ่มเติม/แก้ไข |
| `งานบ้าน/` | การใช้เครื่องมือ, CI, การขึ้นต่อกัน |### Commit Messages

ปฏิบัติตาม [Conventional Commits](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

ขอบเขต: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`---

## Running Tests

```bash
# All tests (unit + vitest + ecosystem + e2e)
npm run test:all

# Single test file (Node.js native test runner — most tests use this)
node --import tsx/esm --test tests/unit/your-file.test.mjs

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E tests (requires Playwright)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility tests
npm run test:ecosystem

# Coverage (60% min statements/lines/functions/branches)
npm run test:coverage
npm run coverage:report

# Lint + format check
npm run lint
npm run check
```

หมายเหตุความคุ้มครอง:

- `npm run test:coverage` วัดความครอบคลุมของแหล่งที่มาสำหรับชุดการทดสอบหน่วยหลัก ไม่รวม `tests/**` และรวม `open-sse/**`
- คำขอดึงจะต้องคงประตูความครอบคลุมโดยรวมไว้ที่**60% หรือสูงกว่า**สำหรับใบแจ้งยอด บรรทัด ฟังก์ชัน และสาขา
- หาก PR เปลี่ยนรหัสการผลิตใน `src/`, `open-sse/`, `electron/` หรือ `bin/` จะต้องเพิ่มหรืออัปเดตการทดสอบอัตโนมัติใน PR เดียวกัน
- `npm run Coverage:report` พิมพ์รายงานโดยละเอียดแบบไฟล์ต่อไฟล์จากการรันความครอบคลุมล่าสุด
- `npm run test:coverage:legacy` จะรักษาเมตริกเก่าไว้สำหรับการเปรียบเทียบในอดีต
- ดู `docs/COVERAGE_PLAN.md` สำหรับแผนงานการปรับปรุงความครอบคลุมแบบเป็นขั้นตอน### Pull Request Requirements

ก่อนที่จะเปิดหรือรวม PR:

- รัน `npm run test:unit`
- รัน `npm run test:coverage`
- ตรวจสอบให้แน่ใจว่าประตูครอบคลุมอยู่ที่**60%+**สำหรับตัวชี้วัดทั้งหมด
- รวมไฟล์ทดสอบที่เปลี่ยนแปลงหรือเพิ่มไว้ในคำอธิบาย PR เมื่อรหัสการผลิตมีการเปลี่ยนแปลง
- ตรวจสอบผลลัพธ์ SonarQube บน PR เมื่อมีการกำหนดค่าความลับของโครงการใน CI

สถานะการทดสอบปัจจุบัน:**ไฟล์ทดสอบ 122 หน่วย**ครอบคลุมถึง:

- ผู้ให้บริการนักแปลและการแปลงรูปแบบ
- การจำกัดอัตรา เซอร์กิตเบรกเกอร์ และความยืดหยุ่น
- แคชความหมาย, idempotency, การติดตามความคืบหน้า
- การดำเนินงานฐานข้อมูลและสคีมา (21 โมดูล DB)
- กระแส OAuth และการรับรองความถูกต้อง
- การตรวจสอบจุดสิ้นสุด API (Zod v4)
- เครื่องมือเซิร์ฟเวอร์ MCP และการบังคับใช้ขอบเขต
- ระบบหน่วยความจำและทักษะ---

## Code Style

-**ESLint**— รัน `npm run lint` ก่อนที่จะคอมมิต -**Prettier**— จัดรูปแบบอัตโนมัติผ่าน `lint-staged` เมื่อคอมมิต (ช่องว่าง 2 ช่อง, อัฒภาค, เครื่องหมายคำพูดคู่, ความกว้าง 100 ตัวอักษร, เครื่องหมายจุลภาคต่อท้าย es5) -**TypeScript**— โค้ด `src/` ทั้งหมดใช้ `.ts`/`.tsx`; `open-sse/` ใช้ `.ts`/`.js`; เอกสารที่มี TSDoc (“@param`, `@returns`, `@throws`)
-**ไม่มี `eval()`**— ESLint บังคับใช้ `no-eval`, `no-implied-eval`, `no-new-func` -**การตรวจสอบความถูกต้องของ Zod**— ใช้สคีมาของ Zod v4 สำหรับการตรวจสอบความถูกต้องอินพุต API ทั้งหมด -**การตั้งชื่อ**: ไฟล์ = CamelCase/kebab-case, ส่วนประกอบ = PascalCase, ค่าคงที่ = UPPER_SNAKE---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (21 modules + 16 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (60+), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 14 provider-specific request executors
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (25 tools, 3 transports, 10 scopes)
├── services/               # 36+ services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (25 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Adding a New Provider

### Step 1: Register Provider Constants

เพิ่มใน `src/shared/constants/providers.ts` — ผ่านการตรวจสอบ Zod เมื่อโหลดโมดูล### Step 2: Add Executor (if custom logic needed)

สร้างตัวดำเนินการใน `open-sse/executors/your-provider.ts` เพื่อขยายตัวดำเนินการฐาน### Step 3: Add Translator (if non-OpenAI format)

สร้างนักแปลคำขอ/ตอบกลับใน `open-sse/translator/`### Step 4: Add OAuth Config (if OAuth-based)

เพิ่มข้อมูลรับรอง OAuth ใน `src/lib/oauth/constants/oauth.ts` และบริการใน `src/lib/oauth/services/`### Step 5: Register Models

เพิ่มคำจำกัดความของโมเดลใน `open-sse/config/providerRegistry.ts`### Step 6: Add Tests

เขียนการทดสอบหน่วยเป็น `tests/unit/` ครอบคลุมอย่างน้อย:

- การลงทะเบียนผู้ให้บริการ
- การแปลคำขอ/การตอบกลับ
- การจัดการข้อผิดพลาด---

## Pull Request Checklist

- [ ] การทดสอบผ่าน (`การทดสอบ npm`)
- [ ] Linting pass (`npm run lint`)
- [ ] สร้างสำเร็จ (`npm run build`)
- [ ] เพิ่มประเภท TypeScript สำหรับฟังก์ชั่นสาธารณะและอินเทอร์เฟซใหม่
- [ ] ไม่มีความลับแบบฮาร์ดโค้ดหรือค่าทางเลือก
- [ ] อินพุตทั้งหมดได้รับการตรวจสอบด้วย Zod schema
- [ ] CHANGELOG อัปเดตแล้ว (หากผู้ใช้พบการเปลี่ยนแปลง)
- [ ] อัปเดตเอกสารแล้ว (ถ้ามี)---

## Releasing

การเผยแพร่ได้รับการจัดการผ่านเวิร์กโฟลว์ `/generate-release` เมื่อมีการสร้าง GitHub Release ใหม่ แพ็คเกจจะถูก**เผยแพร่โดยอัตโนมัติเป็น npm**ผ่าน GitHub Actions---

## Getting Help

-**สถาปัตยกรรม**: ดู [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**การอ้างอิง API**: ดู [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**ปัญหา**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADRs**: ดู `docs/adr/` สำหรับบันทึกการตัดสินใจทางสถาปัตยกรรม
