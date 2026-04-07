# Contributing to OmniRoute (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇮🇳 [in](../in/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md)

---

Cảm ơn bạn đã quan tâm đóng góp! Hướng dẫn này bao gồm mọi thứ bạn cần để bắt đầu.---

## Development Setup

### Prerequisites

-**Node.js**>= 18 < 24 (khuyến nghị: 22 LTS) -**npm**10+ -**Git**### Clone & Install

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

Các biến chính cho sự phát triển:

| Biến                   | Mặc định phát triển      | Mô tả                              |
| ---------------------- | ------------------------ | ---------------------------------- | ---------------------- |
| `CỔNG`                 | `20128`                  | Cổng máy chủ                       |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | URL cơ sở cho giao diện người dùng |
| `JWT_BÍ MẬT`           | (tạo ở trên)             | Bí mật ký kết JWT                  |
| `INITIAL_PASSWORD`     | `ĐỔI ĐỔI`                | Mật khẩu đăng nhập lần đầu         |
| `APP_LOG_LEVEL`        | `thông tin`              | Mức độ chi tiết của nhật ký        | ### Dashboard Settings |

Trang tổng quan cung cấp các chuyển đổi giao diện người dùng cho các tính năng cũng có thể được định cấu hình thông qua các biến môi trường:

| Cài đặt vị trí     | Chuyển đổi         | Mô tả                           |
| ------------------ | ------------------ | ------------------------------- |
| Cài đặt → Nâng cao | Chế độ gỡ lỗi      | Bật nhật ký yêu cầu gỡ lỗi (UI) |
| Cài đặt → Chung    | Hiển thị thanh bên | Hiển thị/ẩn các phần thanh bên  |

Các cài đặt này được lưu trữ trong cơ sở dữ liệu và tồn tại trong suốt quá trình khởi động lại, ghi đè các giá trị mặc định của env var khi được đặt.### Running Locally

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build
npm run start

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

URL mặc định:

-**Bảng điều khiển**: `http://localhost:20128/dashboard` -**API**: `http://localhost:20128/v1`---

## Git Workflow

> ⚠️**KHÔNG BAO GIỜ cam kết trực tiếp với `main`.**Luôn sử dụng các nhánh tính năng.```bash
> git checkout -b feat/your-feature-name

# ... make changes ...

git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name

# Open a Pull Request on GitHub

````

### Branch Naming

| Tiền tố | Mục đích |
| ----------- | ------------------------- |
| `chiến công/` | Tính năng mới |
| `sửa/` | Sửa lỗi |
| `tái cấu trúc/` | Tái cấu trúc mã |
| `tài liệu/` | Thay đổi tài liệu |
| `kiểm tra/` | Kiểm tra bổ sung/sửa lỗi |
| `việc vặt/` | Công cụ, CI, phụ thuộc |### Commit Messages

Thực hiện theo [Cam kết thông thường](https://www.conventionalcommits.org/):```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
````

Phạm vi: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`.---

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

Ghi chú bảo hiểm:

- `npm run test:coverage` đo mức độ bao phủ nguồn cho bộ thử nghiệm đơn vị chính, loại trừ `tests/**` và bao gồm `open-sse/**`
- Yêu cầu kéo phải giữ cổng bao phủ tổng thể ở mức**60% trở lên**cho các câu lệnh, dòng, chức năng và nhánh
- Nếu một PR thay đổi mã sản xuất trong `src/`, `open-sse/`, `electron/`, hoặc `bin/` thì phải thêm hoặc cập nhật các bài kiểm tra tự động trong cùng một PR
- `npm run cover: report` in báo cáo chi tiết theo từng tệp từ lần chạy bảo hiểm mới nhất
- `npm run test:coverage:legacy` giữ nguyên số liệu cũ hơn để so sánh lịch sử
- Xem `docs/COVERAGE_PLAN.md` để biết lộ trình cải thiện phạm vi bảo hiểm theo từng giai đoạn### Pull Request Requirements

Trước khi mở hoặc sáp nhập một PR:

- Chạy `npm run test:unit`
- Chạy `npm run test:coverage`
- Đảm bảo cổng phủ sóng luôn ở mức**60%+**cho tất cả các chỉ số
- Bao gồm các file test đã thay đổi hoặc bổ sung trong phần mô tả PR khi mã sản xuất thay đổi
- Kiểm tra kết quả SonarQube trên PR khi bí mật dự án được cấu hình trong CI

Trạng thái kiểm tra hiện tại:**122 tệp kiểm tra đơn vị**bao gồm:

- Nhà cung cấp dịch giả và chuyển đổi định dạng
- Giới hạn tốc độ, ngắt mạch và khả năng phục hồi
- Bộ nhớ đệm ngữ nghĩa, tính bình thường, theo dõi tiến trình
- Hoạt động cơ sở dữ liệu và lược đồ (21 mô-đun DB)
- Luồng OAuth và xác thực
- Xác thực điểm cuối API (Zod v4)
- Công cụ máy chủ MCP và thực thi phạm vi
- Hệ thống trí nhớ và kỹ năng---

## Code Style

-**ESLint**— Chạy `npm run lint` trước khi chuyển giao -**Đẹp hơn**— Được định dạng tự động thông qua `lint-staged` trên cam kết (2 dấu cách, dấu chấm phẩy, dấu ngoặc kép, chiều rộng 100 ký tự, dấu phẩy ở cuối es5) -**TypeScript**— Tất cả mã `src/` đều sử dụng `.ts`/`.tsx`; `open-sse/` sử dụng `.ts`/`.js`; tài liệu có TSDoc (`@param`, `@returns`, `@throws`) -**Không `eval()`**— ESLint thực thi `no-eval`, `no-implied-eval`, `no-new-func` -**Xác thực Zod**— Sử dụng lược đồ Zod v4 để xác thực tất cả thông tin đầu vào API -**Đặt tên**: Files = CamelCase/kebab-case, Components = PascalCase, constants = UPPER_SNAKE---

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

Thêm vào `src/shared/constants/providers.ts` — Được xác thực Zod khi tải mô-đun.### Step 2: Add Executor (if custom logic needed)

Tạo trình thực thi trong `open-sse/executors/your-provider.ts` mở rộng trình thực thi cơ sở.### Step 3: Add Translator (if non-OpenAI format)

Tạo trình dịch yêu cầu/phản hồi trong `open-sse/translator/`.### Step 4: Add OAuth Config (if OAuth-based)

Thêm thông tin xác thực OAuth trong `src/lib/oauth/constants/oauth.ts` và dịch vụ trong `src/lib/oauth/services/`.### Step 5: Register Models

Thêm định nghĩa mô hình trong `open-sse/config/providerRegistry.ts`.### Step 6: Add Tests

Viết bài kiểm tra đơn vị trong `tests/unit/` bao gồm tối thiểu:

- Đăng ký nhà cung cấp
- Request/response translation
- Xử lý lỗi---

## Pull Request Checklist

- [ ] Các bài kiểm tra đã vượt qua (`npm test`)
- [ ] Linting pass (`npm run lint`)
- [ ] Build thành công (`npm run build`)
- [] Các loại TypeScript được thêm vào cho các chức năng và giao diện công khai mới
- [] Không có bí mật hoặc giá trị dự phòng được mã hóa cứng
- [ ] Tất cả thông tin đầu vào được xác thực bằng lược đồ Zod
- [ ] CHANGELOG được cập nhật (nếu giao diện người dùng thay đổi)
- [ ] Tài liệu được cập nhật (nếu có)---

## Releasing

Các bản phát hành được quản lý thông qua quy trình làm việc `/generate-release`. Khi Bản phát hành GitHub mới được tạo, gói sẽ**tự động được xuất bản lên npm**thông qua GitHub Actions.---

## Getting Help

-**Kiến trúc**: Xem [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) -**Tham khảo API**: Xem [`docs/API_REFERENCE.md`](docs/API_REFERENCE.md) -**Vấn đề**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**ADRs**: Xem `docs/adr/` để biết hồ sơ quyết định kiến trúc
