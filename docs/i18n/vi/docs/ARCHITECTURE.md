# OmniRoute Architecture (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/ARCHITECTURE.md) · 🇪🇸 [es](../../es/docs/ARCHITECTURE.md) · 🇫🇷 [fr](../../fr/docs/ARCHITECTURE.md) · 🇩🇪 [de](../../de/docs/ARCHITECTURE.md) · 🇮🇹 [it](../../it/docs/ARCHITECTURE.md) · 🇷🇺 [ru](../../ru/docs/ARCHITECTURE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/ARCHITECTURE.md) · 🇯🇵 [ja](../../ja/docs/ARCHITECTURE.md) · 🇰🇷 [ko](../../ko/docs/ARCHITECTURE.md) · 🇸🇦 [ar](../../ar/docs/ARCHITECTURE.md) · 🇮🇳 [hi](../../hi/docs/ARCHITECTURE.md) · 🇮🇳 [in](../../in/docs/ARCHITECTURE.md) · 🇹🇭 [th](../../th/docs/ARCHITECTURE.md) · 🇻🇳 [vi](../../vi/docs/ARCHITECTURE.md) · 🇮🇩 [id](../../id/docs/ARCHITECTURE.md) · 🇲🇾 [ms](../../ms/docs/ARCHITECTURE.md) · 🇳🇱 [nl](../../nl/docs/ARCHITECTURE.md) · 🇵🇱 [pl](../../pl/docs/ARCHITECTURE.md) · 🇸🇪 [sv](../../sv/docs/ARCHITECTURE.md) · 🇳🇴 [no](../../no/docs/ARCHITECTURE.md) · 🇩🇰 [da](../../da/docs/ARCHITECTURE.md) · 🇫🇮 [fi](../../fi/docs/ARCHITECTURE.md) · 🇵🇹 [pt](../../pt/docs/ARCHITECTURE.md) · 🇷🇴 [ro](../../ro/docs/ARCHITECTURE.md) · 🇭🇺 [hu](../../hu/docs/ARCHITECTURE.md) · 🇧🇬 [bg](../../bg/docs/ARCHITECTURE.md) · 🇸🇰 [sk](../../sk/docs/ARCHITECTURE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/ARCHITECTURE.md) · 🇮🇱 [he](../../he/docs/ARCHITECTURE.md) · 🇵🇭 [phi](../../phi/docs/ARCHITECTURE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/ARCHITECTURE.md) · 🇨🇿 [cs](../../cs/docs/ARCHITECTURE.md) · 🇹🇷 [tr](../../tr/docs/ARCHITECTURE.md)

---

_Cập nhật lần cuối: 28-03-2026_## Executive Summary

OmniRoute là cổng định tuyến và bảng thông tin AI cục bộ được xây dựng trên Next.js.
Nó cung cấp một điểm cuối tương thích với OpenAI (`/v1/*`) và định tuyến lưu lượng truy cập trên nhiều nhà cung cấp ngược dòng với bản dịch, dự phòng, làm mới mã thông báo và theo dõi việc sử dụng.

Khả năng cốt lõi:

- Bề mặt API tương thích OpenAI cho CLI/công cụ (28 nhà cung cấp)
- Dịch yêu cầu/phản hồi trên các định dạng của nhà cung cấp
- Dự phòng kết hợp mô hình (chuỗi nhiều mô hình)
- Dự phòng cấp tài khoản (nhiều tài khoản cho mỗi nhà cung cấp)
- Quản lý kết nối nhà cung cấp khóa OAuth + API
- Tạo nhúng thông qua `/v1/embeddings` (6 nhà cung cấp, 9 mô hình)
- Tạo hình ảnh qua `/v1/images/thế hệ` (4 nhà cung cấp, 9 kiểu máy)
- Phân tích thẻ suy nghĩ (`<think>...</think>`) cho các mô hình suy luận
- Dọn dẹp phản hồi để tương thích nghiêm ngặt với OpenAI SDK
- Chuẩn hóa vai trò (nhà phát triển→hệ thống, hệ thống→người dùng) để tương thích giữa các nhà cung cấp
- Chuyển đổi đầu ra có cấu trúc (json_schema → GeminiResponseSchema)
- Tính bền vững cục bộ cho nhà cung cấp, khóa, bí danh, tổ hợp, cài đặt, giá cả
- Theo dõi việc sử dụng/chi phí và ghi nhật ký yêu cầu
- Đồng bộ hóa đám mây tùy chọn để đồng bộ hóa nhiều thiết bị/trạng thái
- Danh sách cho phép/danh sách chặn IP để kiểm soát truy cập API
- Tư duy quản lý ngân sách (passthrough/auto/custom/adaptive)
- Tiêm nhắc nhở hệ thống toàn cầu
- Theo dõi phiên và lấy dấu vân tay
- Giới hạn tỷ lệ nâng cao cho mỗi tài khoản với hồ sơ dành riêng cho nhà cung cấp
- Mô hình ngắt mạch cho khả năng phục hồi của nhà cung cấp
- Bảo vệ đàn chống sét bằng khóa mutex
- Bộ đệm chống trùng lặp yêu cầu dựa trên chữ ký
- Lớp miền: tính khả dụng của mô hình, quy tắc chi phí, chính sách dự phòng, chính sách khóa
- Tính bền vững của trạng thái miền (bộ đệm ghi SQLite dành cho dự phòng, ngân sách, khóa, bộ ngắt mạch)
- Công cụ chính sách để đánh giá yêu cầu tập trung (khóa → ngân sách → dự phòng)
- Yêu cầu đo từ xa với tổng hợp độ trễ p50/p95/p99
- ID tương quan (X-Request-Id) để theo dõi từ đầu đến cuối
- Ghi nhật ký kiểm tra tuân thủ với tính năng chọn không tham gia trên mỗi khóa API
- Khung đánh giá để đảm bảo chất lượng LLM
- Bảng điều khiển UI có khả năng phục hồi với trạng thái ngắt mạch theo thời gian thực
- Nhà cung cấp OAuth mô-đun (12 mô-đun riêng lẻ trong `src/lib/oauth/providers/`)

Mô hình thời gian chạy chính:

- Các tuyến ứng dụng Next.js trong `src/app/api/*` triển khai cả API bảng điều khiển và API tương thích
- Một lõi định tuyến/SSE được chia sẻ trong `src/sse/*` + `open-sse/*` xử lý việc thực thi, dịch thuật, phát trực tuyến, dự phòng và sử dụng của nhà cung cấp## Scope and Boundaries

### In Scope

- Thời gian chạy cổng cục bộ
- API quản lý bảng điều khiển
- Xác thực nhà cung cấp và làm mới mã thông báo
- Yêu cầu dịch và truyền phát SSE
- Trạng thái cục bộ + kiên trì sử dụng
- Phối hợp đồng bộ hóa đám mây tùy chọn### Out of Scope

- Triển khai dịch vụ đám mây đằng sau `NEXT_PUBLIC_CLOUD_URL`
- Nhà cung cấp SLA/mặt phẳng điều khiển bên ngoài quy trình cục bộ
- Bản thân các tệp nhị phân CLI bên ngoài (Claude CLI, Codex CLI, v.v.)## Dashboard Surface (Current)

Các trang chính trong `src/app/(dashboard)/dashboard/`:

- `/dashboard` — bắt đầu nhanh + tổng quan về nhà cung cấp
- `/dashboard/endpoint` — proxy điểm cuối + MCP + A2A + tab điểm cuối API
- `/dashboard/providers` — kết nối và thông tin đăng nhập của nhà cung cấp
- `/dashboard/combos` — chiến lược kết hợp, mẫu, quy tắc định tuyến mô hình
- `/dashboard/costs` — tổng hợp chi phí và khả năng hiển thị giá cả
- `/dashboard/analytics` — phân tích và đánh giá việc sử dụng
- `/dashboard/limits` — kiểm soát hạn ngạch/tỷ lệ
- `/dashboard/cli-tools` — Tích hợp CLI, phát hiện thời gian chạy, tạo cấu hình
- `/dashboard/agents` — các tác nhân ACP được phát hiện + đăng ký tác nhân tùy chỉnh
- `/dashboard/media` — sân chơi hình ảnh/video/âm nhạc
- `/dashboard/search-tools` — lịch sử và kiểm tra nhà cung cấp dịch vụ tìm kiếm
- `/dashboard/health` — thời gian hoạt động, ngắt mạch, giới hạn tốc độ
- `/dashboard/logs` — nhật ký yêu cầu/proxy/kiểm toán/bàn điều khiển
- `/dashboard/settings` — các tab cài đặt hệ thống (chung, định tuyến, mặc định kết hợp, v.v.)
- `/dashboard/api-manager` — Quyền đối với mô hình và vòng đời của khóa API## High-Level System Context

```mermaid
flowchart LR
    subgraph Clients[Developer Clients]
        C1[Claude Code]
        C2[Codex CLI]
        C3[OpenClaw / Droid / Cline / Continue / Roo]
        C4[Custom OpenAI-compatible clients]
        BROWSER[Browser Dashboard]
    end

    subgraph Router[OmniRoute Local Process]
        API[V1 Compatibility API\n/v1/*]
        DASH[Dashboard + Management API\n/api/*]
        CORE[SSE + Translation Core\nopen-sse + src/sse]
        DB[(storage.sqlite)]
        UDB[(usage tables + log artifacts)]
    end

    subgraph Upstreams[Upstream Providers]
        P1[OAuth Providers\nClaude/Codex/Gemini/Qwen/Qoder/GitHub/Kiro/Cursor/Antigravity]
        P2[API Key Providers\nOpenAI/Anthropic/OpenRouter/GLM/Kimi/MiniMax\nDeepSeek/Groq/xAI/Mistral/Perplexity\nTogether/Fireworks/Cerebras/Cohere/NVIDIA]
        P3[Compatible Nodes\nOpenAI-compatible / Anthropic-compatible]
    end

    subgraph Cloud[Optional Cloud Sync]
        CLOUD[Cloud Sync Endpoint\nNEXT_PUBLIC_CLOUD_URL]
    end

    C1 --> API
    C2 --> API
    C3 --> API
    C4 --> API
    BROWSER --> DASH

    API --> CORE
    DASH --> DB
    CORE --> DB
    CORE --> UDB

    CORE --> P1
    CORE --> P2
    CORE --> P3

    DASH --> CLOUD
```

## Core Runtime Components

## 1) API and Routing Layer (Next.js App Routes)

Các thư mục chính:

- `src/app/api/v1/*` và `src/app/api/v1beta/*` cho các API tương thích
- `src/app/api/*` dành cho API quản lý/cấu hình
- Tiếp theo viết lại trong `next.config.mjs` ánh xạ `/v1/*` thành `/api/v1/*`

Các tuyến tương thích quan trọng:

- `src/app/api/v1/chat/completions/route.ts`
- `src/app/api/v1/messages/route.ts`
- `src/app/api/v1/responses/route.ts`
- `src/app/api/v1/models/route.ts` — bao gồm các mô hình tùy chỉnh với `custom: true`
- `src/app/api/v1/embeddings/route.ts` — thế hệ nhúng (6 nhà cung cấp)
- `src/app/api/v1/images/Generations/route.ts` — tạo hình ảnh (4+ nhà cung cấp bao gồm AntiGravity/Nebius)
- `src/app/api/v1/messages/count_tokens/route.ts`
- `src/app/api/v1/providers/[provider]/chat/completions/route.ts` — trò chuyện dành riêng cho mỗi nhà cung cấp
- `src/app/api/v1/providers/[provider]/embeddings/route.ts` — phần nhúng dành riêng cho mỗi nhà cung cấp
- `src/app/api/v1/providers/[provider]/images/thế hệ/route.ts` — hình ảnh dành riêng cho mỗi nhà cung cấp
- `src/app/api/v1beta/models/route.ts`
- `src/app/api/v1beta/models/[...path]/route.ts`

Các miền quản lý:

- Xác thực/cài đặt: `src/app/api/auth/*`, `src/app/api/settings/*`
- Nhà cung cấp/kết nối: `src/app/api/providers*`
- Các nút của nhà cung cấp: `src/app/api/provider-nodes*`
- Model tùy chỉnh: `src/app/api/provider-models` (GET/POST/DELETE)
- Danh mục mô hình: `src/app/api/models/route.ts` (GET)
- Cấu hình proxy: `src/app/api/settings/proxy` (GET/PUT/DELETE) + `src/app/api/settings/proxy/test` (POST)
- OAuth: `src/app/api/oauth/*`
- Khóa/bí danh/combos/giá: `src/app/api/keys*`, `src/app/api/models/alias`, `src/app/api/combos*`, `src/app/api/pricing`
- Cách sử dụng: `src/app/api/usage/*`
- Đồng bộ/đám mây: `src/app/api/sync/*`, `src/app/api/cloud/*`
- Trình trợ giúp công cụ CLI: `src/app/api/cli-tools/*`
- Bộ lọc IP: `src/app/api/settings/ip-filter` (GET/PUT)
- Ngân sách tư duy: `src/app/api/settings/thinking-budget` (GET/PUT)
- Dấu nhắc hệ thống: `src/app/api/settings/system-prompt` (GET/PUT)
- Phiên: `src/app/api/sessions` (GET)
- Giới hạn tỷ lệ: `src/app/api/rate-limits` (GET)
- Khả năng phục hồi: `src/app/api/resilience` (GET/PATCH) — hồ sơ nhà cung cấp, bộ ngắt mạch, trạng thái giới hạn tốc độ
- Đặt lại khả năng phục hồi: `src/app/api/resilience/reset` (POST) — đặt lại bộ ngắt + thời gian hồi chiêu
- Thống kê bộ đệm: `src/app/api/cache/stats` (GET/DELETE)
- Tính khả dụng của mô hình: `src/app/api/models/availability` (GET/POST)
- Đo từ xa: `src/app/api/telemetry/summary` (GET)
- Ngân sách: `src/app/api/usage/budget` (GET/POST)
- Chuỗi dự phòng: `src/app/api/fallback/chains` (GET/POST/DELETE)
- Kiểm tra tuân thủ: `src/app/api/compliance/audit-log` (GET)
- Đánh giá: `src/app/api/evals` (GET/POST), `src/app/api/evals/[suiteId]` (GET)
- Chính sách: `src/app/api/policies` (GET/POST)## 2) SSE + Translation Core

Các mô-đun dòng chảy chính:

- Mục nhập: `src/sse/handlers/chat.ts`
- Điều phối cốt lõi: `open-sse/handlers/chatCore.ts`
- Bộ điều hợp thực thi của nhà cung cấp: `open-sse/executors/*`
- Phát hiện định dạng/cấu hình nhà cung cấp: `open-sse/services/provider.ts`
- Phân tích/giải quyết mô hình: `src/sse/services/model.ts`, `open-sse/services/model.ts`
- Logic dự phòng tài khoản: `open-sse/services/accountFallback.ts`
- Sổ đăng ký dịch: `open-sse/translator/index.ts`
- Chuyển đổi luồng: `open-sse/utils/stream.ts`, `open-sse/utils/streamHandler.ts`
- Trích xuất/chuẩn hóa cách sử dụng: `open-sse/utils/usageTracking.ts`
- Trình phân tích cú pháp thẻ Think: `open-sse/utils/thinkTagParser.ts`
- Trình xử lý nhúng: `open-sse/handlers/embeddings.ts`
- Đăng ký nhà cung cấp nhúng: `open-sse/config/embeddingRegistry.ts`
- Trình xử lý tạo hình ảnh: `open-sse/handlers/imageGeneration.ts`
- Sổ đăng ký nhà cung cấp hình ảnh: `open-sse/config/imageRegistry.ts`
- Làm sạch phản hồi: `open-sse/handlers/responseSanitizer.ts`
- Chuẩn hóa vai trò: `open-sse/services/roleNormalizer.ts`

Dịch vụ (logic nghiệp vụ):

- Lựa chọn/chấm điểm tài khoản: `open-sse/services/accountSelector.ts`
- Quản lý vòng đời bối cảnh: `open-sse/services/contextManager.ts`
- Thực thi bộ lọc IP: `open-sse/services/ipFilter.ts`
- Theo dõi phiên: `open-sse/services/sessionManager.ts`
- Yêu cầu loại bỏ trùng lặp: `open-sse/services/signatureCache.ts`
- Nội dung nhắc nhở của hệ thống: `open-sse/services/systemPrompt.ts`
- Tư duy quản lý ngân sách: `open-sse/services/thinkingBudget.ts`
- Định tuyến mô hình ký tự đại diện: `open-sse/services/wildcardRouter.ts`
- Quản lý giới hạn tỷ lệ: `open-sse/services/rateLimitManager.ts`
- Bộ ngắt mạch: `open-sse/services/ CircuitBreaker.ts`

Các mô-đun lớp miền:

- Tính khả dụng của mô hình: `src/lib/domain/modelAvailability.ts`
- Quy tắc chi phí/ngân sách: `src/lib/domain/costRules.ts`
- Chính sách dự phòng: `src/lib/domain/fallbackPolicy.ts`
- Trình phân giải kết hợp: `src/lib/domain/comboResolver.ts`
- Chính sách khóa: `src/lib/domain/lockoutPolicy.ts`
- Công cụ chính sách: `src/domain/policyEngine.ts` — khóa tập trung → ngân sách → đánh giá dự phòng
- Danh mục mã lỗi: `src/lib/domain/errorCodes.ts`
- ID yêu cầu: `src/lib/domain/requestId.ts`
- Thời gian chờ tìm nạp: `src/lib/domain/fetchTimeout.ts`
- Yêu cầu đo từ xa: `src/lib/domain/requestTelemetry.ts`
- Tuân thủ/kiểm toán: `src/lib/domain/compliance/index.ts`
- Người chạy đánh giá: `src/lib/domain/evalRunner.ts`
- Tính bền vững của trạng thái miền: `src/lib/db/domainState.ts` — SQLite CRUD dành cho chuỗi dự phòng, ngân sách, lịch sử chi phí, trạng thái khóa, bộ ngắt mạch

Mô-đun nhà cung cấp OAuth (12 tệp riêng lẻ trong `src/lib/oauth/providers/`):

- Chỉ mục đăng ký: `src/lib/oauth/providers/index.ts`
- Các nhà cung cấp cá nhân: `claude.ts`, `codex.ts`, `gemini.ts`, `antiGravity.ts`, `qoder.ts`, `qwen.ts`, `kimi-coding.ts`, `github.ts`, `kiro.ts`, `cursor.ts`, `kilocode.ts`, `cline.ts`
- Trình bao bọc mỏng: `src/lib/oauth/providers.ts` — tái xuất từ các mô-đun riêng lẻ## 3) Persistence Layer

DB trạng thái chính (SQLite):

- Cơ sở hạ tầng cốt lõi: `src/lib/db/core.ts` (tốt hơn-sqlite3, di chuyển, WAL)
- Mặt tiền tái xuất: `src/lib/localDb.ts` (lớp tương thích mỏng cho người gọi)
- tệp: `${DATA_DIR}/storage.sqlite` (hoặc `$XDG_CONFIG_HOME/omniroute/storage.sqlite` khi được đặt, nếu không thì `~/.omniroute/storage.sqlite`)
- thực thể (bảng + không gian tên KV): nhà cung cấpConnections, nhà cung cấpNodes, modelAliases, combo, apiKeys, cài đặt, giá cả,**customModels**,**proxyConfig**,**ipFilter**,**thinkingBudget**,**systemPrompt**

Kiên trì sử dụng:

- mặt tiền: `src/lib/usageDb.ts` (các mô-đun được phân tách trong `src/lib/usage/*`)
- Bảng SQLite trong `storage.sqlite`: `usage_history`, `call_logs`, `proxy_logs`
- các tạo phẩm tệp tùy chọn vẫn còn để tương thích/gỡ lỗi (`${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`, `<repo>/logs/...`)
- các tệp JSON kế thừa được di chuyển sang SQLite bằng cách di chuyển khởi động khi có mặt

Cơ sở dữ liệu trạng thái miền (SQLite):

- `src/lib/db/domainState.ts` — Hoạt động CRUD cho trạng thái miền
- Các bảng (được tạo trong `src/lib/db/core.ts`): `domain_fallback_chains`, `domain_budgets`, `domain_cost_history`, `domain_lockout_state`, `domain_circle_breakers`
- Mẫu bộ đệm ghi qua: Bản đồ trong bộ nhớ có thẩm quyền trong thời gian chạy; các đột biến được ghi đồng bộ vào SQLite; trạng thái được khôi phục từ DB khi khởi động nguội## 4) Auth + Security Surfaces

- Xác thực cookie bảng điều khiển: `src/proxy.ts`, `src/app/api/auth/login/route.ts`
- Tạo/xác minh khóa API: `src/shared/utils/apiKey.ts`
- Bí mật của nhà cung cấp vẫn tồn tại trong các mục `providerConnections`
- Hỗ trợ proxy gửi đi thông qua `open-sse/utils/proxyFetch.ts` (env vars) và `open-sse/utils/networkProxy.ts` (có thể định cấu hình cho mỗi nhà cung cấp hoặc toàn cầu)## 5) Cloud Sync

- Trình lập lịch biểu khởi tạo: `src/lib/initCloudSync.ts`, `src/shared/services/initializeCloudSync.ts`, `src/shared/services/modelSyncScheduler.ts`
- Nhiệm vụ định kỳ: `src/shared/services/cloudSyncScheduler.ts`
- Tác vụ định kỳ: `src/shared/services/modelSyncScheduler.ts`
- Tuyến điều khiển: `src/app/api/sync/cloud/route.ts`## Request Lifecycle (`/v1/chat/completions`)

```mermaid
sequenceDiagram
    autonumber
    participant Client as CLI/SDK Client
    participant Route as /api/v1/chat/completions
    participant Chat as src/sse/handlers/chat
    participant Core as open-sse/handlers/chatCore
    participant Model as Model Resolver
    participant Auth as Credential Selector
    participant Exec as Provider Executor
    participant Prov as Upstream Provider
    participant Stream as Stream Translator
    participant Usage as usageDb

    Client->>Route: POST /v1/chat/completions
    Route->>Chat: handleChat(request)
    Chat->>Model: parse/resolve model or combo

    alt Combo model
        Chat->>Chat: iterate combo models (handleComboChat)
    end

    Chat->>Auth: getProviderCredentials(provider)
    Auth-->>Chat: active account + tokens/api key

    Chat->>Core: handleChatCore(body, modelInfo, credentials)
    Core->>Core: detect source format
    Core->>Core: translate request to target format
    Core->>Exec: execute(provider, transformedBody)
    Exec->>Prov: upstream API call
    Prov-->>Exec: SSE/JSON response
    Exec-->>Core: response + metadata

    alt 401/403
        Core->>Exec: refreshCredentials()
        Exec-->>Core: updated tokens
        Core->>Exec: retry request
    end

    Core->>Stream: translate/normalize stream to client format
    Stream-->>Client: SSE chunks / JSON response

    Stream->>Usage: extract usage + persist history/log
```

## Combo + Account Fallback Flow

```mermaid
flowchart TD
    A[Incoming model string] --> B{Is combo name?}
    B -- Yes --> C[Load combo models sequence]
    B -- No --> D[Single model path]

    C --> E[Try model N]
    E --> F[Resolve provider/model]
    D --> F

    F --> G[Select account credentials]
    G --> H{Credentials available?}
    H -- No --> I[Return provider unavailable]
    H -- Yes --> J[Execute request]

    J --> K{Success?}
    K -- Yes --> L[Return response]
    K -- No --> M{Fallback-eligible error?}

    M -- No --> N[Return error]
    M -- Yes --> O[Mark account unavailable cooldown]
    O --> P{Another account for provider?}
    P -- Yes --> G
    P -- No --> Q{In combo with next model?}
    Q -- Yes --> E
    Q -- No --> R[Return all unavailable]
```

Các quyết định dự phòng được điều khiển bởi `open-sse/services/accountFallback.ts` bằng cách sử dụng mã trạng thái và phương pháp phỏng đoán thông báo lỗi. Định tuyến kết hợp bổ sung thêm một biện pháp bảo vệ: 400 lỗi trong phạm vi nhà cung cấp, chẳng hạn như lỗi xác thực vai trò và khối nội dung ngược dòng được coi là lỗi cục bộ mô hình để các mục tiêu kết hợp sau này vẫn có thể chạy.## OAuth Onboarding and Token Refresh Lifecycle

```mermaid
sequenceDiagram
    autonumber
    participant UI as Dashboard UI
    participant OAuth as /api/oauth/[provider]/[action]
    participant ProvAuth as Provider Auth Server
    participant DB as localDb
    participant Test as /api/providers/[id]/test
    participant Exec as Provider Executor

    UI->>OAuth: GET authorize or device-code
    OAuth->>ProvAuth: create auth/device flow
    ProvAuth-->>OAuth: auth URL or device code payload
    OAuth-->>UI: flow data

    UI->>OAuth: POST exchange or poll
    OAuth->>ProvAuth: token exchange/poll
    ProvAuth-->>OAuth: access/refresh tokens
    OAuth->>DB: createProviderConnection(oauth data)
    OAuth-->>UI: success + connection id

    UI->>Test: POST /api/providers/[id]/test
    Test->>Exec: validate credentials / optional refresh
    Exec-->>Test: valid or refreshed token info
    Test->>DB: update status/tokens/errors
    Test-->>UI: validation result
```

Làm mới trong khi lưu lượng truy cập trực tiếp được thực thi bên trong `open-sse/handlers/chatCore.ts` thông qua trình thực thi `refreshCredentials()`.## Cloud Sync Lifecycle (Enable / Sync / Disable)

```mermaid
sequenceDiagram
    autonumber
    participant UI as Endpoint Page UI
    participant Sync as /api/sync/cloud
    participant DB as localDb
    participant Cloud as External Cloud Sync
    participant Claude as ~/.claude/settings.json

    UI->>Sync: POST action=enable
    Sync->>DB: set cloudEnabled=true
    Sync->>DB: ensure API key exists
    Sync->>Cloud: POST /sync/{machineId} (providers/aliases/combos/keys)
    Cloud-->>Sync: sync result
    Sync->>Cloud: GET /{machineId}/v1/verify
    Sync-->>UI: enabled + verification status

    UI->>Sync: POST action=sync
    Sync->>Cloud: POST /sync/{machineId}
    Cloud-->>Sync: remote data
    Sync->>DB: update newer local tokens/status
    Sync-->>UI: synced

    UI->>Sync: POST action=disable
    Sync->>DB: set cloudEnabled=false
    Sync->>Cloud: DELETE /sync/{machineId}
    Sync->>Claude: switch ANTHROPIC_BASE_URL back to local (if needed)
    Sync-->>UI: disabled
```

Đồng bộ hóa định kỳ được kích hoạt bởi `CloudSyncScheduler` khi bật đám mây.## Data Model and Storage Map

```mermaid
erDiagram
    SETTINGS ||--o{ PROVIDER_CONNECTION : controls
    PROVIDER_NODE ||--o{ PROVIDER_CONNECTION : backs_compatible_provider
    PROVIDER_CONNECTION ||--o{ USAGE_ENTRY : emits_usage

    SETTINGS {
      boolean cloudEnabled
      number stickyRoundRobinLimit
      boolean requireLogin
      string password_hash
      string fallbackStrategy
      json rateLimitDefaults
      json providerProfiles
    }

    PROVIDER_CONNECTION {
      string id
      string provider
      string authType
      string name
      number priority
      boolean isActive
      string apiKey
      string accessToken
      string refreshToken
      string expiresAt
      string testStatus
      string lastError
      string rateLimitedUntil
      json providerSpecificData
    }

    PROVIDER_NODE {
      string id
      string type
      string name
      string prefix
      string apiType
      string baseUrl
    }

    MODEL_ALIAS {
      string alias
      string targetModel
    }

    COMBO {
      string id
      string name
      string[] models
    }

    API_KEY {
      string id
      string name
      string key
      string machineId
    }

    USAGE_ENTRY {
      string provider
      string model
      number prompt_tokens
      number completion_tokens
      string connectionId
      string timestamp
    }

    CUSTOM_MODEL {
      string id
      string name
      string providerId
    }

    PROXY_CONFIG {
      string global
      json providers
    }

    IP_FILTER {
      string mode
      string[] allowlist
      string[] blocklist
    }

    THINKING_BUDGET {
      string mode
      number customBudget
      string effortLevel
    }

    SYSTEM_PROMPT {
      boolean enabled
      string prompt
      string position
    }
```

Tệp lưu trữ vật lý:

- DB thời gian chạy chính: `${DATA_DIR}/storage.sqlite`
- dòng nhật ký yêu cầu: `${DATA_DIR}/log.txt` (tạo phẩm tương thích/gỡ lỗi)
- kho lưu trữ tải trọng cuộc gọi có cấu trúc: `${DATA_DIR}/call_logs/`
- phiên gỡ lỗi yêu cầu/trình dịch tùy chọn: `<repo>/logs/...`## Deployment Topology

```mermaid
flowchart LR
    subgraph LocalHost[Developer Host]
        CLI[CLI Tools]
        Browser[Dashboard Browser]
    end

    subgraph ContainerOrProcess[OmniRoute Runtime]
        Next[Next.js Server\nPORT=20128]
        Core[SSE Core + Executors]
        MainDB[(storage.sqlite)]
        UsageDB[(usage tables + log artifacts)]
    end

    subgraph External[External Services]
        Providers[AI Providers]
        SyncCloud[Cloud Sync Service]
    end

    CLI --> Next
    Browser --> Next
    Next --> Core
    Next --> MainDB
    Core --> MainDB
    Core --> UsageDB
    Core --> Providers
    Next --> SyncCloud
```

## Module Mapping (Decision-Critical)

### Route and API Modules

- `src/app/api/v1/*`, `src/app/api/v1beta/*`: các API tương thích
- `src/app/api/v1/providers/[provider]/*`: các tuyến dành riêng cho mỗi nhà cung cấp (trò chuyện, nhúng, hình ảnh)
- `src/app/api/providers*`: CRUD của nhà cung cấp, xác thực, kiểm tra
- `src/app/api/provider-nodes*`: quản lý nút tương thích tùy chỉnh
- `src/app/api/provider-models`: quản lý mô hình tùy chỉnh (CRUD)
- `src/app/api/models/route.ts`: API danh mục mô hình (bí danh + mô hình tùy chỉnh)
- `src/app/api/oauth/*`: Luồng OAuth/mã thiết bị
- `src/app/api/keys*`: vòng đời của khóa API cục bộ
- `src/app/api/models/alias`: quản lý bí danh
- `src/app/api/combos*`: quản lý kết hợp dự phòng
- `src/app/api/pricing`: ghi đè giá để tính chi phí
- `src/app/api/settings/proxy`: cấu hình proxy (GET/PUT/DELETE)
- `src/app/api/settings/proxy/test`: outbound proxy connectivity test (POST)
- `src/app/api/usage/*`: API sử dụng và nhật ký
- `src/app/api/sync/*` + `src/app/api/cloud/*`: đồng bộ hóa đám mây và trợ giúp đối mặt với đám mây
- `src/app/api/cli-tools/*`: trình soạn thảo/kiểm tra cấu hình CLI cục bộ
- `src/app/api/settings/ip-filter`: Danh sách cho phép/danh sách chặn IP (GET/PUT)
- `src/app/api/settings/thinking-budget`: cấu hình ngân sách mã thông báo suy nghĩ (GET/PUT)
- `src/app/api/settings/system-prompt`: dấu nhắc hệ thống toàn cầu (GET/PUT)
- `src/app/api/sessions`: danh sách phiên hoạt động (GET)
- `src/app/api/rate-limits`: trạng thái giới hạn tỷ lệ cho mỗi tài khoản (GET)### Routing and Execution Core

- `src/sse/handlers/chat.ts`: phân tích cú pháp yêu cầu, xử lý kết hợp, vòng lặp chọn tài khoản
- `open-sse/handlers/chatCore.ts`: dịch, gửi người thực thi, xử lý thử lại/làm mới, thiết lập luồng
- `open-sse/executors/*`: hành vi định dạng và mạng dành riêng cho nhà cung cấp### Translation Registry and Format Converters

- `open-sse/translator/index.ts`: đăng ký và điều phối dịch giả
- Yêu cầu người dịch: `open-sse/translator/request/*`
- Trình dịch phản hồi: `open-sse/translator/response/*`
- Hằng định dạng: `open-sse/translator/formats.ts`### Persistence

- `src/lib/db/*`: duy trì cấu hình/trạng thái và tên miền liên tục trên SQLite
- `src/lib/localDb.ts`: tái xuất khả năng tương thích cho các mô-đun DB
- `src/lib/usageDb.ts`: mặt tiền lịch sử sử dụng/nhật ký cuộc gọi ở đầu các bảng SQLite## Provider Executor Coverage (Strategy Pattern)

Mỗi nhà cung cấp có một trình thực thi chuyên biệt mở rộng `BaseExecutor` (trong `open-sse/executors/base.ts`), cung cấp việc xây dựng URL, xây dựng tiêu đề, thử lại với thời gian chờ theo cấp số nhân, móc làm mới thông tin xác thực và phương thức điều phối `execute()`.

| Người thi hành                  | (Các) nhà cung cấp                                                                                                                                           | Xử lý đặc biệt                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `Trình thực thi mặc định`       | OpenAI, Claude, Gemini, Qwen, Qoder, OpenRouter, GLM, Kimi, MiniMax, DeepSeek, Groq, xAI, Mistral, Perplexity, Together, Fireworks, Cerebras, Cohere, NVIDIA | Cấu hình URL/tiêu đề động cho mỗi nhà cung cấp                      |
| `Người thực thi phản trọng lực` | Google phản lực hấp dẫn                                                                                                                                      | ID dự án/phiên tùy chỉnh, Thử lại sau khi phân tích cú pháp         |
| `CodexExecutor`                 | OpenAI Codex                                                                                                                                                 | Đưa vào các hướng dẫn hệ thống, buộc nỗ lực suy luận                |
| `Người thực thi con trỏ`        | IDE con trỏ                                                                                                                                                  | Giao thức ConnectRPC, mã hóa Protobuf, ký yêu cầu qua tổng kiểm tra |
| `GithubExecutor`                | Phi công phụ GitHub                                                                                                                                          | Làm mới mã thông báo Copilot, tiêu đề bắt chước VSCode              |
| `KiroExecutor`                  | AWS CodeWhisperer/Kiro                                                                                                                                       | Định dạng nhị phân AWS EventStream → Chuyển đổi SSE                 |
| `GeminiCLIExecutor`             | Song Tử CLI                                                                                                                                                  | Chu kỳ làm mới mã thông báo Google OAuth                            |

Tất cả các nhà cung cấp khác (bao gồm các nút tương thích tùy chỉnh) đều sử dụng `DefaultExecutor`.## Provider Compatibility Matrix

| Nhà cung cấp        | Định dạng       | Xác thực                      | Truyền phát      | Không phát trực tuyến | Làm mới mã thông báo | API sử dụng                   |
| ------------------- | --------------- | ----------------------------- | ---------------- | --------------------- | -------------------- | ----------------------------- | ------------------------------ |
| Claude              | Claude          | Khóa API / OAuth              | ✅               | ✅                    | ✅                   | ⚠️ Chỉ dành cho quản trị viên |
| Song Tử             | song tử         | Khóa API / OAuth              | ✅               | ✅                    | ✅                   | ⚠️ Bảng điều khiển đám mây    |
| Song Tử CLI         | gemini-cli      | OAuth                         | ✅               | ✅                    | ✅                   | ⚠️ Bảng điều khiển đám mây    |
| Phản lực hấp dẫn    | phản trọng lực  | OAuth                         | ✅               | ✅                    | ✅                   | ✅ API hạn ngạch đầy đủ       |
| OpenAI              | mở              | Khóa API                      | ✅               | ✅                    | ❌                   | ❌                            |
| Codex               | phản hồi openai | OAuth                         | ✅ ép buộc       | ❌                    | ✅                   | ✅ Giới hạn tỷ lệ             |
| Phi công phụ GitHub | mở              | OAuth + Mã thông báo đồng lái | ✅               | ✅                    | ✅                   | ✅ Ảnh chụp nhanh hạn ngạch   |
| Con trỏ             | con trỏ         | Tổng kiểm tra tùy chỉnh       | ✅               | ✅                    | ❌                   | ❌                            |
| Kiro                | kiro            | AWS SSO OIDC                  | ✅ (EventStream) | ❌                    | ✅                   | ✅ Giới hạn sử dụng           |
| Qwen                | mở              | OAuth                         | ✅               | ✅                    | ✅                   | ⚠️ Theo yêu cầu               |
| Qoder               | mở              | OAuth (Cơ bản)                | ✅               | ✅                    | ✅                   | ⚠️ Theo yêu cầu               |
| OpenRouter          | mở              | Khóa API                      | ✅               | ✅                    | ❌                   | ❌                            |
| GLM/Kimi/MiniMax    | Claude          | Khóa API                      | ✅               | ✅                    | ❌                   | ❌                            |
| DeepSeek            | mở              | Khóa API                      | ✅               | ✅                    | ❌                   | ❌                            |
| Groq                | mở              | Khóa API                      | ✅               | ✅                    | ❌                   | ❌                            |
| xAI (Grok)          | mở              | Khóa API                      | ✅               | ✅                    | ❌                   | ❌                            |
| Mistral             | mở              | Khóa API                      | ✅               | ✅                    | ❌                   | ❌                            |
| Lúng túng           | mở              | Khóa API                      | ✅               | ✅                    | ❌                   | ❌                            |
| Cùng AI             | mở              | Khóa API                      | ✅               | ✅                    | ❌                   | ❌                            |
| Pháo hoa AI         | mở              | Khóa API                      | ✅               | ✅                    | ❌                   | ❌                            |
| Não                 | mở              | Khóa API                      | ✅               | ✅                    | ❌                   | ❌                            |
| Kết hợp             | mở              | Khóa API                      | ✅               | ✅                    | ❌                   | ❌                            |
| NVIDIA NIM          | mở              | Khóa API                      | ✅               | ✅                    | ❌                   | ❌                            | ## Format Translation Coverage |

Các định dạng nguồn được phát hiện bao gồm:

- `openai`
- `openai-phản hồi`
- `claudia`
- `song tử`

Các định dạng mục tiêu bao gồm:

- Trò chuyện/Phản hồi OpenAI
- Claude
- Phong bì Gemini/Gemini-CLI/Phản trọng lực
- Kiro
- Con trỏ

Các bản dịch sử dụng**OpenAI làm định dạng trung tâm**— tất cả các chuyển đổi đều thông qua OpenAI dưới dạng trung gian:```
Source Format → OpenAI (hub) → Target Format

````

Các bản dịch được chọn linh hoạt dựa trên hình dạng tải trọng nguồn và định dạng mục tiêu của nhà cung cấp.

Các lớp xử lý bổ sung trong quy trình dịch thuật:

-**Sạch hóa phản hồi**— Loại bỏ các trường không chuẩn khỏi phản hồi ở định dạng OpenAI (cả phát trực tuyến và không phát trực tuyến) để đảm bảo tuân thủ nghiêm ngặt SDK
-**Chuẩn hóa vai trò**— Chuyển đổi `developer` → `system` cho các mục tiêu không phải OpenAI; hợp nhất `system` → `user` cho các mô hình từ chối vai trò hệ thống (GLM, ERNIE)
-**Trích xuất thẻ Think**— Phân tích cú pháp `<think>...</think>` chặn nội dung vào trường `reasoning_content`
-**Đầu ra có cấu trúc**— Chuyển đổi `response_format.json_schema` của OpenAI thành `responseMimeType` + `responseSchema` của Gemini## Supported API Endpoints

| Điểm cuối | Định dạng | Người xử lý |
| -------------------------------------------------- | ------------------ | ------------------------------------------------------------------- |
| `POST /v1/chat/hoàn thành` | Trò chuyện OpenAI | `src/sse/handlers/chat.ts` |
| `POST /v1/tin nhắn` | Tin nhắn Claude | Trình xử lý tương tự (tự động phát hiện) |
| `POST /v1/phản hồi` | Phản hồi OpenAI | `open-sse/handlers/responsesHandler.ts` |
| `POST /v1/nhúng` | Nhúng OpenAI | `open-sse/handlers/embeddings.ts` |
| `NHẬN /v1/nhúng` | Danh sách mô hình | Tuyến đường API |
| `POST /v1/images/thế hệ` | Hình ảnh OpenAI | `open-sse/handlers/imageGeneration.ts` |
| `NHẬN /v1/hình ảnh/thế hệ` | Danh sách mô hình | Tuyến đường API |
| `POST /v1/providers/{provider}/chat/completions` | Trò chuyện OpenAI | Dành riêng cho mỗi nhà cung cấp với xác thực mô hình |
| `POST /v1/providers/{provider}/embeddings` | Nhúng OpenAI | Dành riêng cho mỗi nhà cung cấp với xác thực mô hình |
| `POST /v1/providers/{provider}/images/thế hệ` | Hình ảnh OpenAI | Dành riêng cho mỗi nhà cung cấp với xác thực mô hình |
| `POST /v1/messages/count_tokens` | Số lượng mã thông báo Claude | Tuyến đường API |
| `NHẬN /v1/model` | Danh sách mô hình OpenAI | Tuyến API (trò chuyện + nhúng + hình ảnh + mô hình tùy chỉnh) |
| `NHẬN /api/mô hình/danh mục` | Danh mục | Tất cả các mô hình được nhóm theo nhà cung cấp + loại |
| `POST /v1beta/models/*:streamGenerateContent` | Song Tử bản xứ | Tuyến đường API |
| `NHẬN/PUT/XÓA /api/settings/proxy` | Cấu hình proxy | Cấu hình proxy mạng |
| `POST /api/settings/proxy/test` | Kết nối proxy | Điểm cuối kiểm tra sức khỏe/kết nối proxy |
| `GET/POST/DELETE /api/provider-models` | Mô hình nhà cung cấp | Sao lưu siêu dữ liệu mô hình nhà cung cấp các mô hình có sẵn tùy chỉnh và được quản lý |## Bypass Handler

Trình xử lý bỏ qua (`open-sse/utils/bypassHandler.ts`) chặn các yêu cầu "loại bỏ" đã biết từ Claude CLI — ping khởi động, trích xuất tiêu đề và số lượng mã thông báo — và trả về**phản hồi giả**mà không tiêu tốn mã thông báo của nhà cung cấp ngược dòng. Điều này chỉ được kích hoạt khi `User-Agent` chứa `claude-cli`.## Request Logger Pipeline

Trình ghi nhật ký yêu cầu (`open-sse/utils/requestLogger.ts`) cung cấp quy trình ghi nhật ký gỡ lỗi 7 giai đoạn, bị tắt theo mặc định, được bật thông qua `ENABLE_REQUEST_LOGS=true`:```
1_req_client.json → 2_req_source.json → 3_req_openai.json → 4_req_target.json
→ 5_res_provider.txt → 6_res_openai.txt → 7_res_client.txt
````

Các tập tin được ghi vào `<repo>/logs/<session>/` cho mỗi phiên yêu cầu.## Failure Modes and Resilience

## 1) Account/Provider Availability

- thời gian hồi chiêu của tài khoản nhà cung cấp đối với các lỗi tạm thời/tỷ lệ/xác thực
- dự phòng tài khoản trước khi yêu cầu không thành công
- dự phòng mô hình kết hợp khi đường dẫn mô hình/nhà cung cấp hiện tại đã hết## 2) Token Expiry

- kiểm tra trước và làm mới bằng cách thử lại đối với các nhà cung cấp có thể làm mới
- Thử lại 401/403 sau lần thử làm mới trong đường dẫn lõi## 3) Stream Safety

- bộ điều khiển luồng nhận biết ngắt kết nối
- luồng dịch với tính năng xả cuối luồng và xử lý `[DONE]`
- dự phòng ước tính sử dụng khi thiếu siêu dữ liệu sử dụng của nhà cung cấp## 4) Cloud Sync Degradation

- lỗi đồng bộ hóa xuất hiện nhưng thời gian chạy cục bộ vẫn tiếp tục
- bộ lập lịch có logic có khả năng thử lại, nhưng việc thực thi định kỳ hiện gọi đồng bộ hóa một lần thử theo mặc định## 5) Data Integrity

- Di chuyển lược đồ SQLite và móc nâng cấp tự động khi khởi động
- JSON kế thừa → Đường dẫn tương thích di chuyển SQLite## Observability and Operational Signals

Nguồn hiển thị thời gian chạy:

- nhật ký bảng điều khiển từ `src/sse/utils/logger.ts`
- tổng hợp mức sử dụng theo yêu cầu trong SQLite (`usage_history`, `call_logs`, `proxy_logs`)
- Ghi lại tải trọng chi tiết bốn giai đoạn trong SQLite (`request_detail_logs`) khi `settings.detailed_logs_enabled=true`
- nhật ký trạng thái yêu cầu văn bản trong `log.txt` (tùy chọn/tương thích)
- nhật ký dịch/yêu cầu sâu tùy chọn trong `logs/` khi `ENABLE_REQUEST_LOGS=true`
- điểm cuối sử dụng bảng điều khiển (`/api/usage/*`) để sử dụng giao diện người dùng

Tính năng thu thập tải trọng yêu cầu chi tiết lưu trữ tối đa bốn giai đoạn tải trọng JSON cho mỗi cuộc gọi định tuyến:

- yêu cầu thô nhận được từ khách hàng
- yêu cầu đã dịch thực sự được gửi ngược dòng
- phản hồi của nhà cung cấp được xây dựng lại dưới dạng JSON; phản hồi theo luồng được nén thành bản tóm tắt cuối cùng cộng với siêu dữ liệu luồng
- phản hồi cuối cùng của khách hàng được OmniRoute trả về; các phản hồi theo luồng được lưu trữ ở cùng một dạng tóm tắt nhỏ gọn## Security-Sensitive Boundaries

- Bí mật JWT (`JWT_SECRET`) bảo mật việc xác minh/ký cookie phiên bảng điều khiển
- Khởi động mật khẩu ban đầu (`INITIAL_PASSWORD`) phải được định cấu hình rõ ràng để cung cấp lần đầu
- Khóa API Bí mật HMAC (`API_KEY_SECRET`) bảo mật định dạng khóa API cục bộ được tạo
- Bí mật của nhà cung cấp (khóa API/mã thông báo) được lưu giữ trong DB cục bộ và phải được bảo vệ ở cấp hệ thống tệp
- Điểm cuối đồng bộ hóa đám mây dựa vào ngữ nghĩa xác thực khóa API + id máy## Environment and Runtime Matrix

Các biến môi trường được mã sử dụng tích cực:

- Ứng dụng/xác thực: `JWT_SECRET`, `INITIAL_PASSWORD`
- Bộ nhớ: `DATA_DIR`
- Hành vi của nút tương thích: `ALLOW_MULTI_CONNECTIONS_PER_COMPAT_NODE`
- Ghi đè cơ sở lưu trữ tùy chọn (Linux/macOS khi không đặt `DATA_DIR`): `XDG_CONFIG_HOME`
- Băm bảo mật: `API_KEY_SECRET`, `MACHINE_ID_SALT`
- Ghi nhật ký: `ENABLE_REQUEST_LOGS`
- URL đồng bộ hóa/đám mây: `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_CLOUD_URL`
- Proxy gửi đi: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` và các biến thể chữ thường
- Cờ tính năng SOCKS5: `ENABLE_SOCKS5_PROXY`, `NEXT_PUBLIC_ENABLE_SOCKS5_PROXY`
- Trình trợ giúp nền tảng/thời gian chạy (không phải cấu hình dành riêng cho ứng dụng): `APPDATA`, `NODE_ENV`, `PORT`, `HOSTNAME`## Known Architectural Notes

1. `usageDb` và `localDb` chia sẻ cùng một chính sách thư mục cơ sở (`DATA_DIR` -> `XDG_CONFIG_HOME/omniroute` -> `~/.omniroute`) với việc di chuyển tệp kế thừa.
2. `/api/v1/route.ts` ủy quyền cho cùng một trình tạo danh mục hợp nhất được sử dụng bởi `/api/v1/models` (`src/app/api/v1/models/catalog.ts`) để tránh trôi dạt ngữ nghĩa.
3. Trình ghi yêu cầu ghi toàn bộ tiêu đề/nội dung khi được bật; coi thư mục nhật ký là nhạy cảm.
4. Hoạt động của đám mây phụ thuộc vào `NEXT_PUBLIC_BASE_URL` chính xác và khả năng tiếp cận điểm cuối của đám mây.
5. Thư mục `open-sse/` được xuất bản dưới dạng `@omniroute/open-sse`**gói không gian làm việc npm**. Mã nguồn nhập nó qua `@omniroute/open-sse/...` (được giải quyết bởi Next.js `transpilePackages`). Đường dẫn tệp trong tài liệu này vẫn sử dụng tên thư mục `open-sse/` để đảm bảo tính thống nhất.
6. Các biểu đồ trong trang tổng quan sử dụng**Recharts**(dựa trên SVG) để hiển thị trực quan hóa phân tích tương tác, có thể truy cập (biểu đồ thanh sử dụng mô hình, bảng phân tích nhà cung cấp với tỷ lệ thành công).
7. Kiểm thử E2E sử dụng**Playwright**(`tests/e2e/`), chạy qua `npm run test:e2e`. Kiểm thử đơn vị sử dụng**Trình chạy thử nghiệm Node.js**(`tests/unit/`), chạy qua `npm run test:unit`. Mã nguồn trong `src/` là**TypeScript**(`.ts`/`.tsx`); không gian làm việc `open-sse/` vẫn là JavaScript (`.js`).
8. Trang cài đặt được tổ chức thành 5 tab: Bảo mật, Định tuyến (6 chiến lược toàn cầu: điền trước, quay vòng, p2c, ngẫu nhiên, ít sử dụng nhất, tối ưu hóa chi phí), Khả năng phục hồi (giới hạn tốc độ có thể chỉnh sửa, ngắt mạch, chính sách), AI (ngân sách suy nghĩ, lời nhắc hệ thống, bộ nhớ đệm nhắc nhở), Nâng cao (proxy).## Operational Verification Checklist

- Build từ nguồn: `npm run build`
- Xây dựng hình ảnh Docker: `docker build -t omniroute .`
- Bắt đầu dịch vụ và xác minh:
- `NHẬN/api/cài đặt`
- `NHẬN /api/v1/model`
- URL cơ sở mục tiêu CLI phải là `http://<host>:20128/v1` khi `PORT=20128`
