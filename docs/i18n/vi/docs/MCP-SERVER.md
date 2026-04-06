# OmniRoute MCP Server Documentation (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/MCP-SERVER.md) · 🇪🇸 [es](../../es/docs/MCP-SERVER.md) · 🇫🇷 [fr](../../fr/docs/MCP-SERVER.md) · 🇩🇪 [de](../../de/docs/MCP-SERVER.md) · 🇮🇹 [it](../../it/docs/MCP-SERVER.md) · 🇷🇺 [ru](../../ru/docs/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/MCP-SERVER.md) · 🇯🇵 [ja](../../ja/docs/MCP-SERVER.md) · 🇰🇷 [ko](../../ko/docs/MCP-SERVER.md) · 🇸🇦 [ar](../../ar/docs/MCP-SERVER.md) · 🇮🇳 [hi](../../hi/docs/MCP-SERVER.md) · 🇮🇳 [in](../../in/docs/MCP-SERVER.md) · 🇹🇭 [th](../../th/docs/MCP-SERVER.md) · 🇻🇳 [vi](../../vi/docs/MCP-SERVER.md) · 🇮🇩 [id](../../id/docs/MCP-SERVER.md) · 🇲🇾 [ms](../../ms/docs/MCP-SERVER.md) · 🇳🇱 [nl](../../nl/docs/MCP-SERVER.md) · 🇵🇱 [pl](../../pl/docs/MCP-SERVER.md) · 🇸🇪 [sv](../../sv/docs/MCP-SERVER.md) · 🇳🇴 [no](../../no/docs/MCP-SERVER.md) · 🇩🇰 [da](../../da/docs/MCP-SERVER.md) · 🇫🇮 [fi](../../fi/docs/MCP-SERVER.md) · 🇵🇹 [pt](../../pt/docs/MCP-SERVER.md) · 🇷🇴 [ro](../../ro/docs/MCP-SERVER.md) · 🇭🇺 [hu](../../hu/docs/MCP-SERVER.md) · 🇧🇬 [bg](../../bg/docs/MCP-SERVER.md) · 🇸🇰 [sk](../../sk/docs/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/MCP-SERVER.md) · 🇮🇱 [he](../../he/docs/MCP-SERVER.md) · 🇵🇭 [phi](../../phi/docs/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/MCP-SERVER.md) · 🇨🇿 [cs](../../cs/docs/MCP-SERVER.md) · 🇹🇷 [tr](../../tr/docs/MCP-SERVER.md)

---

> Máy chủ Giao thức bối cảnh mô hình với 16 công cụ thông minh## Cài đặt

OmniRoute MCP được tích hợp sẵn. Bắt đầu nó với:```bash
omniroute --mcp

````

Hoặc thông qua vận tải open-sse:```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
````

## IDE Configuration

Xem [Cấu hình IDE](integrations/ide-configs.md) để biết cách thiết lập AntiGravity, Cursor, Copilot và Claude Desktop.---

## Essential Tools (8)

| Công cụ                         | Mô tả                                                      |
| :------------------------------ | :--------------------------------------------------------- | --------------------- |
| `omniroute_get_health`          | Tình trạng cổng, ngắt mạch, thời gian hoạt động            |
| `omniroute_list_combos`         | Tất cả các combo được cấu hình với các mô hình             |
| `omniroute_get_combo_metrics`   | Số liệu hiệu suất cho một kết hợp cụ thể                   |
| `omniroute_switch_combo`        | Chuyển combo hoạt động theo ID/tên                         |
| `omniroute_check_quota`         | Trạng thái hạn ngạch cho mỗi nhà cung cấp hoặc tất cả      |
| `omniroute_route_request`       | Gửi thông báo hoàn tất cuộc trò chuyện thông qua OmniRoute |
| `omniroute_cost_report`         | Phân tích chi phí trong một khoảng thời gian               |
| `omniroute_list_models_catalog` | Danh mục mô hình đầy đủ với các khả năng                   | ## Advanced Tools (8) |

| Công cụ                            | Mô tả                                                                                       |
| :--------------------------------- | :------------------------------------------------------------------------------------------ | ----------------- |
| `omniroute_simulate_route`         | Mô phỏng định tuyến chạy thử với cây dự phòng                                               |
| `omniroute_set_budget_guard`       | Ngân sách phiên với các hành động xuống cấp/chặn/cảnh báo                                   |
| `omniroute_set_resilience_profile` | Áp dụng cài đặt trước thận trọng/cân bằng/tích cực                                          |
| `omniroute_test_combo`             | Kiểm tra trực tiếp tất cả các mô hình trong một tổ hợp thông qua yêu cầu ngược dòng thực sự |
| `omniroute_get_provider_metrics`   | Số liệu chi tiết cho một nhà cung cấp                                                       |
| `omniroute_best_combo_for_task`    | Khuyến nghị về nhiệm vụ phù hợp với các lựa chọn thay thế                                   |
| `omniroute_explain_route`          | Giải thích quyết định định tuyến trong quá khứ                                              |
| `omniroute_get_session_snapshot`   | Trạng thái phiên đầy đủ: chi phí, mã thông báo, lỗi                                         | ## Authentication |

Các công cụ MCP được xác thực thông qua phạm vi khóa API. Mỗi công cụ yêu cầu phạm vi cụ thể:

| Phạm vi            | Công cụ                                             |
| :----------------- | :-------------------------------------------------- | ---------------- |
| `đọc:sức khỏe`     | get_health, get_provider_metrics                    |
| `đọc:combo`        | list_combos, get_combo_metrics                      |
| `viết:combo`       | switch_combo                                        |
| `đọc:hạn ngạch`    | kiểm tra_quota                                      |
| `viết:tuyến đường` | Route_request, mô phỏng_route, test_combo           |
| `đọc:cách sử dụng` | cost_report, get_session_snapshot, giải thích_route |
| `viết:config`      | set_budget_guard, set_resilience_profile            |
| `đọc:mô hình`      | list_models_catalog, best_combo_for_task            | ## Audit Logging |

Mọi lệnh gọi công cụ đều được ghi vào `mcp_tool_audit` bằng:

- Tên công cụ, đối số, kết quả
- Thời lượng (ms), thành công/thất bại
- Băm khóa API, dấu thời gian## Files

| Tập tin                                      | Mục đích                              |
| :------------------------------------------- | :------------------------------------ |
| `open-sse/mcp-server/server.ts`              | Tạo máy chủ MCP + 16 đăng ký công cụ  |
| `open-sse/mcp-server/transport.ts`           | Vận chuyển Stdio + HTTP               |
| `open-sse/mcp-server/auth.ts`                | Khóa API + xác thực phạm vi           |
| `open-sse/mcp-server/audit.ts`               | Ghi nhật ký kiểm tra cuộc gọi công cụ |
| `open-sse/mcp-server/tools/advancedTools.ts` | 8 trình xử lý công cụ nâng cao        |
