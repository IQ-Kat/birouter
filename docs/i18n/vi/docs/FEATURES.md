# OmniRoute — Dashboard Features Gallery (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Hướng dẫn trực quan cho mọi phần của bảng điều khiển OmniRoute.---

## 🔌 Providers

Quản lý kết nối của nhà cung cấp AI: Nhà cung cấp OAuth (Claude Code, Codex, Gemini CLI), nhà cung cấp khóa API (Groq, DeepSeek, OpenRouter) và nhà cung cấp miễn phí (Qoder, Qwen, Kiro). Tài khoản Kiro bao gồm theo dõi số dư tín dụng — các khoản tín dụng còn lại, tổng trợ cấp và ngày gia hạn hiển thị trong Bảng điều khiển → Mức sử dụng.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Tạo các tổ hợp định tuyến mô hình với 6 chiến lược: ưu tiên, có trọng số, quay vòng, ngẫu nhiên, ít được sử dụng nhất và tối ưu hóa chi phí. Mỗi tổ hợp kết hợp nhiều mô hình với tính năng dự phòng tự động và bao gồm các mẫu nhanh cũng như kiểm tra mức độ sẵn sàng.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Phân tích sử dụng toàn diện với mức tiêu thụ mã thông báo, ước tính chi phí, bản đồ nhiệt hoạt động, biểu đồ phân phối hàng tuần và phân tích theo từng nhà cung cấp.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Giám sát thời gian thực: thời gian hoạt động, bộ nhớ, phiên bản, phần trăm độ trễ (p50/p95/p99), thống kê bộ đệm và trạng thái ngắt mạch của nhà cung cấp.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Bốn chế độ để gỡ lỗi các bản dịch API:**Playground**(trình chuyển đổi định dạng),**Chat Test**(yêu cầu trực tiếp),**Test Bench**(kiểm tra hàng loạt) và**Live Monitor**(luồng thời gian thực).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Kiểm tra bất kỳ mô hình nào trực tiếp từ bảng điều khiển. Chọn nhà cung cấp, mô hình và điểm cuối, viết lời nhắc bằng Trình soạn thảo Monaco, truyền phát phản hồi trong thời gian thực, hủy bỏ giữa chừng và xem số liệu thời gian.---

## 🎨 Themes _(v2.0.5+)_

Chủ đề màu sắc có thể tùy chỉnh cho toàn bộ bảng điều khiển. Chọn từ 7 màu cài sẵn (San hô, Xanh lam, Đỏ, Xanh lục, Tím, Cam, Lục lam) hoặc tạo chủ đề tùy chỉnh bằng cách chọn bất kỳ màu lục giác nào. Hỗ trợ chế độ sáng, tối và hệ thống.---

## ⚙️ Settings

Bảng cài đặt toàn diện với các tab:

-**Chung**— Lưu trữ hệ thống, quản lý sao lưu (xuất/nhập cơ sở dữ liệu) -**Giao diện**— Bộ chọn chủ đề (tối/sáng/hệ thống), cài đặt trước chủ đề màu và màu tùy chỉnh, khả năng hiển thị nhật ký tình trạng, kiểm soát khả năng hiển thị mục thanh bên -**Bảo mật**— Bảo vệ điểm cuối API, chặn nhà cung cấp tùy chỉnh, lọc IP, thông tin phiên -**Định tuyến**— Bí danh mô hình, xuống cấp tác vụ nền -**Khả năng phục hồi**— Duy trì giới hạn tỷ lệ, điều chỉnh ngắt mạch, tự động vô hiệu hóa tài khoản bị cấm, giám sát hết hạn của nhà cung cấp -**Nâng cao**— Ghi đè cấu hình, quá trình kiểm tra cấu hình, chế độ xuống cấp dự phòng![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Cấu hình bằng một cú nhấp chuột cho các công cụ mã hóa AI: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, AntiGravity, Cline, Continue, Cursor và Factory Droid. Tính năng áp dụng/đặt lại cấu hình tự động, cấu hình kết nối và ánh xạ mô hình.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Bảng điều khiển để khám phá và quản lý các tác nhân CLI. Hiển thị một lưới gồm 14 tác nhân tích hợp (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) với:

-**Trạng thái cài đặt**— Đã cài đặt / Không tìm thấy khi phát hiện phiên bản -**Huy hiệu giao thức**— stdio, HTTP, v.v. -**Tác nhân tùy chỉnh**— Đăng ký bất kỳ công cụ CLI nào thông qua biểu mẫu (tên, nhị phân, lệnh phiên bản, đối số sinh sản) -**Khớp dấu vân tay CLI**— Chuyển đổi theo nhà cung cấp để khớp với chữ ký yêu cầu CLI gốc, giảm rủi ro bị cấm trong khi vẫn bảo toàn IP proxy---

## 🖼️ Media _(v2.0.3+)_

Tạo hình ảnh, video và nhạc từ bảng điều khiển. Hỗ trợ OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open và MusicGen.---

## 📝 Request Logs

Ghi nhật ký yêu cầu theo thời gian thực với tính năng lọc theo nhà cung cấp, kiểu máy, tài khoản và khóa API. Hiển thị mã trạng thái, mức sử dụng mã thông báo, độ trễ và chi tiết phản hồi.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Điểm cuối API hợp nhất của bạn với phân tích chức năng: Hoàn thành cuộc trò chuyện, API phản hồi, Nhúng, Tạo hình ảnh, Xếp hạng lại, Phiên âm âm thanh, Chuyển văn bản thành giọng nói, Kiểm duyệt và khóa API đã đăng ký. Tích hợp Cloudflare Quick Tunnel và hỗ trợ proxy đám mây để truy cập từ xa.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Tạo, xác định phạm vi và thu hồi các khóa API. Mỗi khóa có thể được giới hạn ở những kiểu máy/nhà cung cấp cụ thể có quyền truy cập đầy đủ hoặc quyền chỉ đọc. Quản lý khóa trực quan với tính năng theo dõi việc sử dụng.---

## 📋 Audit Log

Theo dõi hành động quản trị bằng cách lọc theo loại hành động, tác nhân, mục tiêu, địa chỉ IP và dấu thời gian. Lịch sử sự kiện bảo mật đầy đủ.---

## 🖥️ Desktop Application

Ứng dụng máy tính để bàn Electron gốc dành cho Windows, macOS và Linux. Chạy OmniRoute dưới dạng một ứng dụng độc lập có tích hợp khay hệ thống, hỗ trợ ngoại tuyến, tự động cập nhật và cài đặt chỉ bằng một cú nhấp chuột.

Các tính năng chính:

- Thăm dò mức độ sẵn sàng của máy chủ (không có màn hình trống khi khởi động nguội)
- Khay hệ thống có quản lý cổng
- Chính sách bảo mật nội dung
- Khóa đơn
- Tự động cập nhật khi khởi động lại
- Giao diện người dùng có điều kiện nền tảng (đèn giao thông macOS, thanh tiêu đề mặc định của Windows/Linux)
- Đóng gói bản dựng Hardened Electron — `node_modules` được liên kết tượng trưng trong gói độc lập được phát hiện và từ chối trước khi đóng gói, ngăn chặn sự phụ thuộc thời gian chạy vào máy bản dựng (v2.5.5+)

📖 Xem [`electron/README.md`](../electron/README.md) để biết tài liệu đầy đủ.
