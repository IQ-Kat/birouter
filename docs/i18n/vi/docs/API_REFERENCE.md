# API Reference (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇮🇳 [in](../../in/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md)

---

Tham chiếu đầy đủ cho tất cả các điểm cuối API OmniRoute.---

## Table of Contents

- [Hoàn thành trò chuyện](#chat-completions)
- [Nhúng](#embeddings)
- [Tạo hình ảnh](#tạo hình ảnh)
- [Danh sách mô hình](#list-models)
- [Điểm cuối tương thích](#điểm cuối tương thích)
- [Bộ đệm ngữ nghĩa](#semantic-cache)
- [Trang tổng quan & Quản lý](#dashboard--management)
- [Xử lý yêu cầu](#request-processing)
- [Xác thực](#xác thực)---

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

| Tiêu đề                  | Hướng    | Mô tả                                                   |
| ------------------------ | -------- | ------------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Yêu cầu  | Đặt thành `true` để bỏ qua bộ đệm                       |
| `X-OmniRoute-Progress`   | Yêu cầu  | Đặt thành `true` cho các sự kiện tiến trình             |
| `Id phiên X`             | Yêu cầu  | Khóa phiên cố định cho mối quan hệ phiên bên ngoài      |
| `x_session_id`           | Yêu cầu  | Biến thể gạch dưới cũng được chấp nhận (HTTP trực tiếp) |
| `Idempotency-Key`        | Yêu cầu  | Khóa khấu trừ (cửa sổ 5s)                               |
| `X-Yêu cầu-Id`           | Yêu cầu  | Khóa khấu trừ thay thế                                  |
| `X-OmniRoute-Cache`      | Phản hồi | `HIT` hoặc `MISS` (không phát trực tuyến)               |
| `X-OmniRoute-Idempotent` | Phản hồi | `true` nếu được loại bỏ                                 |
| `X-OmniRoute-Progress`   | Phản hồi | `đã bật` nếu bật tính năng theo dõi tiến trình          |
| `X-OmniRoute-Phiên-Id`   | Phản hồi | ID phiên hiệu quả được OmniRoute sử dụng                |

> Lưu ý Nginx: nếu bạn dựa vào tiêu đề gạch dưới (ví dụ `x_session_id`), hãy bật `underscores_in_headers on;`.---

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

Các nhà cung cấp hiện có: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.```bash

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

Các nhà cung cấp hiện có: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.```bash

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

| Phương pháp | Đường dẫn                   | Định dạng              |
| ----------- | --------------------------- | ---------------------- | ----------------------------- |
| ĐĂNG        | `/v1/chat/hoàn thành`       | OpenAI                 |
| ĐĂNG        | `/v1/tin nhắn`              | Nhân chủng học         |
| ĐĂNG        | `/v1/phản hồi`              | Phản hồi OpenAI        |
| ĐĂNG        | `/v1/nhúng`                 | OpenAI                 |
| ĐĂNG        | `/v1/hình ảnh/thế hệ`       | OpenAI                 |
| NHẬN        | `/v1/model`                 | OpenAI                 |
| ĐĂNG        | `/v1/messages/count_tokens` | Nhân chủng học         |
| NHẬN        | `/v1beta/model`             | Song Tử                |
| ĐĂNG        | `/v1beta/models/{...path}`  | Gemini generateContent |
| ĐĂNG        | `/v1/api/chat`              | Olama                  | ### Dedicated Provider Routes |

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Tiền tố nhà cung cấp được tự động thêm vào nếu thiếu. Các mô hình không khớp trả về `400`.---

## Semantic Cache

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Ví dụ phản hồi:```json
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

| Điểm cuối | Phương pháp | Mô tả |
| ----------------------------- | ------- | --------------------- |
| `/api/auth/đăng nhập` | ĐĂNG | Đăng nhập |
| `/api/auth/logout` | ĐĂNG | Đăng xuất |
| `/api/settings/require-login` | NHẬN/ĐẶT | Chuyển đổi yêu cầu đăng nhập |### Provider Management

| Điểm cuối | Phương pháp | Mô tả |
| ---------------------------- | --------------- | ------------------------ |
| `/api/nhà cung cấp` | NHẬN/ĐĂNG | Liệt kê/tạo nhà cung cấp |
| `/api/nhà cung cấp/[id]` | NHẬN/ĐẶT/XÓA | Quản lý nhà cung cấp |
| `/api/providers/[id]/test` | ĐĂNG | Kết nối nhà cung cấp thử nghiệm |
| `/api/providers/[id]/models` | NHẬN | Liệt kê mô hình nhà cung cấp |
| `/api/nhà cung cấp/xác thực` | ĐĂNG | Xác thực cấu hình nhà cung cấp |
| `/api/provider-nodes*` | Khác nhau | Quản lý nút nhà cung cấp |
| `/api/nhà cung cấp-model` | NHẬN/ĐĂNG/XÓA | Mô hình tùy chỉnh |### OAuth Flows

| Điểm cuối | Phương pháp | Mô tả |
| -------------------------------- | ------- | -------------- |
| `/api/oauth/[nhà cung cấp]/[hành động]` | Khác nhau | OAuth dành riêng cho nhà cung cấp |### Routing & Config

| Điểm cuối | Phương pháp | Mô tả |
| --------------------- | -------- | ----------------------------- |
| `/api/model/bí danh` | NHẬN/ĐĂNG | Bí danh mẫu |
| `/api/model/catalog` | NHẬN | Tất cả các mô hình theo nhà cung cấp + loại |
| `/api/combos*` | Khác nhau | Quản lý kết hợp |
| `/api/keys*` | Khác nhau | Quản lý khóa API |
| `/api/giá` | NHẬN | Giá mẫu |### Usage & Analytics

| Điểm cuối | Phương pháp | Mô tả |
| ----------------------------- | ------ | -------------------- |
| `/api/usage/history` | NHẬN | Lịch sử sử dụng |
| `/api/usage/log` | NHẬN | Nhật ký sử dụng |
| `/api/usage/request-logs` | NHẬN | Nhật ký cấp yêu cầu |
| `/api/usage/[connectionId]` | NHẬN | Mức sử dụng trên mỗi kết nối |### Settings

| Điểm cuối | Phương pháp | Mô tả |
| ------------------------------- | ------------- | ---------------------- |
| `/api/settings` | NHẬN/PUT/PATCH | Cài đặt chung |
| `/api/settings/proxy` | NHẬN/ĐẶT | Cấu hình proxy mạng |
| `/api/settings/proxy/test` | ĐĂNG | Kiểm tra kết nối proxy |
| `/api/settings/ip-filter` | NHẬN/ĐẶT | Danh sách cho phép/danh sách chặn IP |
| `/api/settings/thinking-budget` | NHẬN/ĐẶT | Lập luận về ngân sách mã thông báo |
| `/api/settings/system-prompt` | NHẬN/ĐẶT | Lời nhắc hệ thống toàn cầu |### Monitoring

| Điểm cuối | Phương pháp | Mô tả |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------- |
| `/api/phiên` | NHẬN | Theo dõi phiên hoạt động |
| `/api/rate-giới hạn` | NHẬN | Giới hạn tỷ lệ cho mỗi tài khoản |
| `/api/giám sát/sức khỏe` | NHẬN | Kiểm tra sức khỏe + tóm tắt nhà cung cấp (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`) |
| `/api/cache/stats` | NHẬN/XÓA | Thống kê bộ nhớ đệm / xóa |### Backup & Export/Import

| Điểm cuối | Phương pháp | Mô tả |
| ----------------------------- | ------ | ------------------------------ |
| `/api/db-backups` | NHẬN | Liệt kê các bản sao lưu có sẵn |
| `/api/db-backups` | ĐƯA | Tạo bản sao lưu thủ công |
| `/api/db-backups` | ĐĂNG | Khôi phục từ bản sao lưu cụ thể |
| `/api/db-backups/export` | NHẬN | Tải xuống cơ sở dữ liệu dưới dạng tệp .sqlite |
| `/api/db-backups/import` | ĐĂNG | Tải lên tệp .sqlite để thay thế cơ sở dữ liệu |
| `/api/db-backups/exportAll` | NHẬN | Tải xuống bản sao lưu đầy đủ dưới dạng kho lưu trữ .tar.gz |### Cloud Sync

| Điểm cuối | Phương pháp | Mô tả |
| ---------------------- | ------- | --------------------- |
| `/api/sync/cloud` | Khác nhau | Hoạt động đồng bộ hóa đám mây |
| `/api/sync/khởi tạo` | ĐĂNG | Khởi tạo đồng bộ hóa |
| `/api/cloud/*` | Khác nhau | Quản lý đám mây |### Tunnels

| Điểm cuối | Phương pháp | Mô tả |
| -------------------------- | ------ | ----------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | NHẬN | Đọc trạng thái cài đặt/thời gian chạy của Cloudflare Quick Tunnel cho bảng điều khiển |
| `/api/tunnels/cloudflared` | ĐĂNG | Bật hoặc tắt Đường hầm nhanh Cloudflare (`action=enable/disable`) |### CLI Tools

| Điểm cuối | Phương pháp | Mô tả |
| ---------------------------------- | ------ | ------------------- |
| `/api/cli-tools/claude-settings` | NHẬN | Trạng thái Claude CLI |
| `/api/cli-tools/codex-settings` | NHẬN | Trạng thái CLI của Codex |
| `/api/cli-tools/droid-settings` | NHẬN | Trạng thái CLI của Droid |
| `/api/cli-tools/openclaw-settings` | NHẬN | Trạng thái CLI OpenClaw |
| `/api/cli-tools/runtime/[toolId]` | NHẬN | Thời gian chạy CLI chung |

Các phản hồi CLI bao gồm: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.### ACP Agents

| Điểm cuối | Phương pháp | Mô tả |
| ----------------- | ------ | -------------------------------------------------------- |
| `/api/acp/đại lý` | NHẬN | Liệt kê tất cả các tác nhân được phát hiện (tích hợp + tùy chỉnh) có trạng thái |
| `/api/acp/đại lý` | ĐĂNG | Thêm tác nhân tùy chỉnh hoặc bộ đệm phát hiện làm mới |
| `/api/acp/đại lý` | XÓA | Xóa tác nhân tùy chỉnh theo thông số truy vấn `id` |

Phản hồi NHẬN bao gồm `tác nhân[]` (id, tên, nhị phân, phiên bản, đã cài đặt, giao thức, isCustom) và `tóm tắt` (tổng cộng, đã cài đặt, notFound, tích hợp, tùy chỉnh).### Resilience & Rate Limits

| Điểm cuối | Phương pháp | Mô tả |
| -------------- | --------- | ------------------------------- |
| `/api/khả năng phục hồi` | NHẬN/PATCH | Nhận/cập nhật hồ sơ khả năng phục hồi |
| `/api/khả năng phục hồi/đặt lại` | ĐĂNG | Đặt lại bộ ngắt mạch |
| `/api/rate-giới hạn` | NHẬN | Trạng thái giới hạn tỷ lệ cho mỗi tài khoản |
| `/api/rate-giới hạn` | NHẬN | Cấu hình giới hạn tốc độ toàn cầu |### Evals

| Điểm cuối | Phương pháp | Mô tả |
| ------------ | -------- | --------------------------------- |
| `/api/eval` | NHẬN/ĐĂNG | Liệt kê các bộ đánh giá / đánh giá chạy |### Policies

| Điểm cuối | Phương pháp | Mô tả |
| --------------- | --------------- | -------------- |
| `/api/chính sách` | NHẬN/ĐĂNG/XÓA | Quản lý chính sách định tuyến |### Compliance

| Điểm cuối | Phương pháp | Mô tả |
| ----------------------------- | ------ | ----------------------------- |
| `/api/tuân thủ/nhật ký kiểm toán` | NHẬN | Nhật ký kiểm tra tuân thủ (N cuối cùng) |### v1beta (Gemini-Compatible)

| Điểm cuối | Phương pháp | Mô tả |
| -------------------------- | ------ | --------------------------------- |
| `/v1beta/model` | NHẬN | Liệt kê các mô hình ở định dạng Gemini |
| `/v1beta/models/{...path}` | ĐĂNG | Điểm cuối `generateContent` của Gemini |

Các điểm cuối này phản ánh định dạng API của Gemini dành cho những khách hàng mong đợi khả năng tương thích SDK Gemini gốc.### Internal / System APIs

| Điểm cuối | Phương pháp | Mô tả |
| --------------- | ------ | ------------------------------------------------------------------- |
| `/api/init` | NHẬN | Kiểm tra khởi tạo ứng dụng (được sử dụng trong lần chạy đầu tiên) |
| `/api/tag` | NHẬN | Thẻ mô hình tương thích với Ollama (dành cho khách hàng Ollama) |
| `/api/khởi động lại` | ĐĂNG | Kích hoạt khởi động lại máy chủ duyên dáng |
| `/api/tắt máy` | ĐĂNG | Kích hoạt tắt máy chủ duyên dáng |

>**Lưu ý:**Các điểm cuối này được hệ thống sử dụng nội bộ hoặc để tương thích với máy khách Ollama. Chúng thường không được người dùng cuối gọi.---

## Audio Transcription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
````

Phiên âm các tệp âm thanh bằng Deepgram hoặc AssemblyAI.

**Lời yêu cầu:**```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@recording.mp3" \
 -F "model=deepgram/nova-3"

````

**Phản ứng:**```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
````

**Các nhà cung cấp được hỗ trợ:**`deepgram/nova-3`, `assemblyai/best`.

**Các định dạng được hỗ trợ:**`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.---

## Ollama Compatibility

Đối với khách hàng sử dụng định dạng API của Ollama:```bash

# Chat endpoint (Ollama format)

POST /v1/api/chat

# Model listing (Ollama format)

GET /api/tags

````

Các yêu cầu được dịch tự động giữa Ollama và các định dạng nội bộ.---

## Telemetry

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
````

**Phản ứng:**```json
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

1. Client gửi yêu cầu tới `/v1/*`
2. Trình xử lý tuyến gọi `handleChat`, `handleEmbedding`, `handleAudioTranscription` hoặc `handleImageGeneration`
3. Mô hình đã được giải quyết (nhà cung cấp/mô hình trực tiếp hoặc bí danh/combo)
4. Thông tin xác thực được chọn từ DB cục bộ với tính năng lọc tính khả dụng của tài khoản
5. Để trò chuyện: `handleChatCore` — phát hiện định dạng, dịch thuật, kiểm tra bộ đệm, kiểm tra idempotency
6. Người thực thi nhà cung cấp gửi yêu cầu ngược dòng
7. Phản hồi được dịch trở lại định dạng máy khách (trò chuyện) hoặc trả về nguyên trạng (nhúng/hình ảnh/âm thanh)
8. Việc sử dụng/ghi nhật ký được ghi lại
9. Dự phòng áp dụng cho các lỗi theo quy tắc kết hợp

Tham khảo kiến trúc đầy đủ: [`ARCHITECTURE.md`](ARCHITECTURE.md)---

## Authentication

- Các tuyến bảng điều khiển (`/dashboard/*`) sử dụng cookie `auth_token`
- Đăng nhập sử dụng hàm băm mật khẩu đã lưu; dự phòng thành `INITIAL_PASSWORD`
- `requireLogin` có thể chuyển đổi thông qua `/api/settings/require-login`
- Các tuyến `/v1/*` tùy chọn yêu cầu khóa API Bearer khi `REQUIRE_API_KEY=true`
