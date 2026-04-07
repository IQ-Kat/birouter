# Troubleshooting (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Các vấn đề thường gặp và giải pháp cho OmniRoute.---

## Quick Fixes

| Vấn đề                                     | Giải pháp                                                         |
| ------------------------------------------ | ----------------------------------------------------------------- | --- |
| Đăng nhập lần đầu không hoạt động          | Set `INITIAL_PASSWORD` in `.env` (no hardcoded default)           |
| Bảng điều khiển mở sai cổng                | Đặt `PORT=20128` và `NEXT_PUBLIC_BASE_URL=http://localhost:20128` |
| Không có nhật ký yêu cầu nào trong `logs/` | Đặt `ENABLE_REQUEST_LOGS=true`                                    |
| EACCES: quyền bị từ chối                   | Đặt `DATA_DIR=/path/to/writable/dir` để ghi đè `~/.omniroute`     |
| Chiến lược định tuyến không tiết kiệm      | Cập nhật lên v1.4.11+ (Sửa lược đồ Zod để duy trì cài đặt)        | --- |

## Provider Issues

### "Language model did not provide messages"

**Nguyên nhân:**Đã hết hạn ngạch nhà cung cấp.

**Sửa chữa:**

1. Kiểm tra trình theo dõi hạn ngạch trên trang tổng quan
2. Sử dụng kết hợp với các tầng dự phòng
3. Chuyển sang cấp rẻ hơn/miễn phí### Rate Limiting

**Lý do:**Đã hết hạn mức đăng ký.

**Sửa chữa:**

- Thêm dự phòng: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Sử dụng GLM/MiniMax làm bản sao lưu giá rẻ### OAuth Token Expired

OmniRoute tự động làm mới mã thông báo. Nếu vấn đề vẫn tiếp diễn:

1. Bảng điều khiển → Nhà cung cấp → Kết nối lại
2. Xóa và thêm lại kết nối nhà cung cấp---

## Cloud Issues

### Cloud Sync Errors

1. Xác minh `BASE_URL` trỏ đến phiên bản đang chạy của bạn (ví dụ: `http://localhost:20128`)
2. Xác minh `CLOUD_URL` trỏ đến điểm cuối đám mây của bạn (ví dụ: `https://omniroute.dev`)
3. Giữ các giá trị `NEXT_PUBLIC_*` được căn chỉnh với các giá trị phía máy chủ### Cloud `stream=false` Returns 500

**Triệu chứng:**`Mã thông báo không mong đợi 'd'...` trên điểm cuối đám mây đối với các cuộc gọi không phát trực tuyến.

**Lý do:**Ngược dòng trả về tải trọng SSE trong khi khách hàng mong đợi JSON.

**Giải pháp:**Sử dụng `stream=true` cho cuộc gọi trực tiếp qua đám mây. Thời gian chạy cục bộ bao gồm dự phòng SSE→JSON.### Cloud Says Connected but "Invalid API key"

1. Tạo khóa mới từ bảng điều khiển cục bộ (`/api/keys`)
2. Chạy đồng bộ đám mây: Bật Đám mây → Đồng bộ hóa ngay
3. Khóa cũ/không được đồng bộ hóa vẫn có thể trả về `401` trên đám mây---

## Docker Issues

### CLI Tool Shows Not Installed

1. Kiểm tra các trường thời gian chạy: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Đối với chế độ di động: sử dụng mục tiêu hình ảnh `runner-cli` (CLS đi kèm)
3. Đối với chế độ gắn máy chủ: đặt `CLI_EXTRA_PATHS` và gắn thư mục bin máy chủ ở chế độ chỉ đọc
4. Nếu `installed=true` và `runnable=false`: đã tìm thấy nhị phân nhưng kiểm tra tình trạng không thành công### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Kiểm tra số liệu thống kê sử dụng trong Bảng điều khiển → Mức sử dụng
2. Chuyển model chính sang GLM/MiniMax
3. Sử dụng bậc miễn phí (Gemini CLI, Qoder) cho các tác vụ không quan trọng
4. Đặt ngân sách chi phí cho mỗi khóa API: Bảng điều khiển → Khóa API → Ngân sách---

## Debugging

### Enable Request Logs

Đặt `ENABLE_REQUEST_LOGS=true` trong tệp `.env` của bạn. Nhật ký xuất hiện trong thư mục `logs/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Trạng thái chính: `${DATA_DIR}/storage.sqlite` (nhà cung cấp, tổ hợp, bí danh, khóa, cài đặt)
- Cách sử dụng: Các bảng SQLite trong `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + tùy chọn `${DATA_DIR}/log.txt` và `${DATA_DIR}/call_logs/`
- Nhật ký yêu cầu: `<repo>/logs/...` (khi `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Khi cầu dao của nhà cung cấp MỞ, các yêu cầu sẽ bị chặn cho đến khi hết thời gian hồi chiêu.

**Sửa chữa:**

1. Đi tới**Bảng điều khiển → Cài đặt → Khả năng phục hồi**
2. Kiểm tra thẻ cầu dao của nhà cung cấp bị ảnh hưởng
3. Nhấp vào**Đặt lại tất cả**để xóa tất cả các bộ ngắt hoặc đợi hết thời gian hồi chiêu
4. Xác minh nhà cung cấp thực sự có sẵn trước khi đặt lại### Provider keeps tripping the circuit breaker

Nếu nhà cung cấp liên tục chuyển sang trạng thái MỞ:

1. Kiểm tra**Bảng điều khiển → Sức khỏe → Tình trạng nhà cung cấp**để biết kiểu lỗi
2. Đi tới**Cài đặt → Khả năng phục hồi → Hồ sơ nhà cung cấp**và tăng ngưỡng thất bại
3. Kiểm tra xem nhà cung cấp có thay đổi giới hạn API hay yêu cầu xác thực lại không
4. Xem lại phép đo từ xa về độ trễ - độ trễ cao có thể gây ra lỗi dựa trên thời gian chờ---

## Audio Transcription Issues

### "Unsupported model" error

- Đảm bảo bạn đang sử dụng đúng tiền tố: `deepgram/nova-3` hoặc `assemblyai/best`
- Xác minh nhà cung cấp được kết nối trong**Bảng điều khiển → Nhà cung cấp**### Transcription returns empty or fails

- Kiểm tra các định dạng âm thanh được hỗ trợ: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Xác minh kích thước tệp nằm trong giới hạn của nhà cung cấp (thường < 25 MB)
- Kiểm tra tính hợp lệ của khóa API nhà cung cấp trong thẻ nhà cung cấp---

## Translator Debugging

Sử dụng**Trang tổng quan → Trình dịch**để gỡ lỗi các vấn đề dịch định dạng:

| Chế độ                        | Khi nào nên sử dụng                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------ |
| **Sân chơi**                  | So sánh các định dạng đầu vào/đầu ra cạnh nhau — dán một yêu cầu không thành công để xem nó dịch như thế nào |
| **Người kiểm tra trò chuyện** | Gửi tin nhắn trực tiếp và kiểm tra toàn bộ tải trọng yêu cầu/phản hồi bao gồm các tiêu đề                    |
| **Bàn thử nghiệm**            | Chạy thử nghiệm hàng loạt trên các kết hợp định dạng để tìm ra bản dịch nào bị lỗi                           |
| **Màn hình trực tiếp**        | Xem luồng yêu cầu theo thời gian thực để nắm bắt các vấn đề dịch thuật không liên tục                        | ### Common format issues |

-**Thẻ tư duy không xuất hiện**— Kiểm tra xem nhà cung cấp mục tiêu có hỗ trợ tư duy và cài đặt ngân sách tư duy hay không -**Giảm cuộc gọi công cụ**— Một số bản dịch định dạng có thể loại bỏ các trường không được hỗ trợ; xác minh ở chế độ Playground -**Thiếu lời nhắc hệ thống**— Claude và Gemini xử lý lời nhắc hệ thống theo cách khác nhau; kiểm tra đầu ra bản dịch -**SDK trả về chuỗi thô thay vì đối tượng**— Đã sửa trong v1.1.0: trình khử trùng phản hồi hiện loại bỏ các trường không chuẩn (`x_groq`, `usage_breakdown`, v.v.) gây ra lỗi xác thực OpenAI SDK Pydantic -**GLM/ERNIE từ chối vai trò `system`**— Đã sửa trong v1.1.0: bộ chuẩn hóa vai trò tự động hợp nhất các thông báo hệ thống thành thông báo người dùng cho các kiểu máy không tương thích -**`vai trò nhà phát triển` không được nhận dạng**— Đã sửa trong v1.1.0: tự động chuyển đổi thành `system` cho các nhà cung cấp không phải OpenAI -**`json_schema` không hoạt động với Gemini**— Đã sửa trong v1.1.0: `response_format` hiện được chuyển đổi thành `responseMimeType` + `responseSchema` của Gemini---

## Resilience Settings

### Auto rate-limit not triggering

- Giới hạn tỷ lệ tự động chỉ áp dụng cho nhà cung cấp khóa API (không phải OAuth/đăng ký)
- Xác minh**Cài đặt → Khả năng phục hồi → Hồ sơ nhà cung cấp**đã bật giới hạn tỷ lệ tự động
- Kiểm tra xem nhà cung cấp có trả về mã trạng thái `429` hoặc tiêu đề `Thử lại sau` không### Tuning exponential backoff

Hồ sơ nhà cung cấp hỗ trợ các cài đặt này:

-**Độ trễ cơ bản**— Thời gian chờ ban đầu sau lần thất bại đầu tiên (mặc định: 1 giây) -**Độ trễ tối đa**— Giới hạn thời gian chờ tối đa (mặc định: 30 giây) -**Hệ số**— Độ trễ tăng lên bao nhiêu cho mỗi lần thất bại liên tiếp (mặc định: 2x)### Anti-thundering herd

Khi nhiều yêu cầu đồng thời gặp phải một nhà cung cấp có tốc độ giới hạn, OmniRoute sử dụng mutex + giới hạn tốc độ tự động để tuần tự hóa các yêu cầu và ngăn chặn lỗi xếp tầng. Điều này là tự động đối với các nhà cung cấp khóa API.---

## Optional RAG / LLM failure taxonomy (16 problems)

Một số người dùng OmniRoute đặt cổng phía trước RAG hoặc ngăn tác nhân. Trong các thiết lập đó, người ta thường thấy một mẫu lạ: OmniRoute có vẻ ổn (nhà cung cấp hoạt động, cấu hình định tuyến ổn, không có cảnh báo giới hạn tốc độ) nhưng câu trả lời cuối cùng vẫn sai.

Trong thực tế, những sự cố này thường đến từ đường ống RAG xuôi dòng chứ không phải từ chính cổng.

Nếu bạn muốn có một từ vựng chung để mô tả những lỗi đó, bạn có thể sử dụng Bản đồ vấn đề WFGY, một tài nguyên văn bản giấy phép MIT bên ngoài xác định mười sáu mẫu lỗi RAG / LLM định kỳ. Ở mức độ cao, nó bao gồm:

- thu hồi trôi dạt và ranh giới bối cảnh bị phá vỡ
- các chỉ mục và cửa hàng vector trống hoặc cũ
- nhúng và không khớp ngữ nghĩa
- các vấn đề về lắp ráp và ngữ cảnh nhanh chóng
- suy sụp logic và câu trả lời quá tự tin
- thất bại phối hợp chuỗi dài và đại lý
- bộ nhớ đa tác nhân và trôi dạt vai trò
- vấn đề về triển khai và đặt hàng bootstrap

Ý tưởng rất đơn giản:

1. Khi bạn điều tra một phản hồi không tốt, hãy nắm bắt:
   - nhiệm vụ và yêu cầu của người dùng
   - kết hợp tuyến đường hoặc nhà cung cấp trong OmniRoute
   - bất kỳ bối cảnh RAG nào được sử dụng ở phía dưới (tài liệu được truy xuất, lệnh gọi công cụ, v.v.)
2. Ánh xạ sự cố tới một hoặc hai số Bản đồ vấn đề WFGY (`No.1` … `No.16`).
3. Lưu số này vào bảng điều khiển, sổ ghi chép hoặc trình theo dõi sự cố của riêng bạn bên cạnh nhật ký OmniRoute.
4. Sử dụng trang WFGY tương ứng để quyết định xem bạn có cần thay đổi chiến lược ngăn xếp, truy xuất hoặc định tuyến RAG của mình hay không.

Toàn văn và công thức nấu ăn cụ thể có tại đây (giấy phép MIT, chỉ văn bản):

[ĐỌC Bản đồ vấn đề WFGY](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Bạn có thể bỏ qua phần này nếu bạn không chạy RAG hoặc đường dẫn tác nhân phía sau OmniRoute.---

## Still Stuck?

-**Vấn đề về GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Kiến trúc**: Xem [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) để biết chi tiết nội bộ -**Tham khảo API**: Xem [`docs/API_REFERENCE.md`](API_REFERENCE.md) để biết tất cả các điểm cuối -**Bảng điều khiển sức khỏe**: Kiểm tra**Bảng điều khiển → Sức khỏe**để biết trạng thái hệ thống theo thời gian thực -**Trình dịch**: Sử dụng**Bảng điều khiển → Trình dịch**để gỡ lỗi các vấn đề về định dạng
