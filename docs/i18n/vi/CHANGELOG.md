# Changelog (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Phần mềm trung gian:**Đã giải quyết vòng lặp chuyển hướng vô hạn trên trang tổng quan cho các phiên bản mới khi requireLogin bị tắt.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Tích hợp gốc API Qoder:**Đã tái cấu trúc hoàn toàn Qoder Executor để bỏ qua thuật toán mã hóa COZY AES/RSA cũ, định tuyến trực tiếp vào URL tương thích DashScope OpenAi gốc. Loại bỏ sự phụ thuộc phức tạp vào các mô-đun Node `crypto` đồng thời cải thiện độ trung thực của luồng. -**Đại tu công cụ phục hồi:**Dự phòng duyên dáng tràn ngữ cảnh tích hợp, phát hiện mã thông báo OAuth chủ động và ngăn chặn phát tán nội dung trống (#990). -**Chiến lược định tuyến được tối ưu hóa theo ngữ cảnh:**Đã thêm khả năng định tuyến thông minh mới để tối đa hóa các cửa sổ ngữ cảnh một cách tự nhiên trong quá trình triển khai kết hợp tự động (#990).### 🐛 Bug Fixes

-**Tham nhũng luồng API phản hồi:**Đã sửa lỗi hỏng nhân bản sâu trong đó ranh giới dịch thuật Anthropic/OpenAI đã loại bỏ tiền tố SSE cụ thể của `response.` khỏi ranh giới phát trực tuyến (#992). -**Căn chỉnh truyền qua bộ nhớ đệm của Claude:**Các điểm đánh dấu bộ nhớ đệm tương thích CC được căn chỉnh nhất quán với chế độ Truyền qua máy khách ngược dòng duy trì bộ nhớ đệm nhanh chóng. -**Rò rỉ bộ nhớ Turbopack:**Đã ghim Next.js vào `16.0.10` nghiêm ngặt để ngăn chặn rò rỉ bộ nhớ và xây dựng tình trạng cũ kỹ từ các lần hồi quy mô-đun băm Turbopack ngược dòng gần đây (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Tích hợp Models.dev:**Tích hợp models.dev làm nguồn thời gian chạy có thẩm quyền để định giá, chức năng và thông số kỹ thuật của mô hình, ghi đè giá được mã hóa cứng. Bao gồm giao diện người dùng cài đặt để quản lý khoảng thời gian đồng bộ hóa, chuỗi dịch cho tất cả 30 ngôn ngữ và phạm vi kiểm tra mạnh mẽ. -**Khả năng gốc của nhà cung cấp:**Đã thêm hỗ trợ để khai báo và kiểm tra các tính năng API gốc (ví dụ: `systemInstructions_supported`) ngăn ngừa lỗi bằng cách loại bỏ các vai trò không hợp lệ. Hiện được định cấu hình cho các nhà cung cấp OAuth của Gemini Base và AntiGravity. -**Cài đặt nâng cao của nhà cung cấp API:**Đã thêm ghi đè `Tác nhân người dùng` tùy chỉnh trên mỗi kết nối cho các kết nối của nhà cung cấp khóa API. Phần ghi đè được lưu trữ trong `providerSpecificData.customUserAgent` và hiện áp dụng cho các thăm dò xác thực và yêu cầu thực thi ngược dòng.### 🐛 Bug Fixes

-**Độ tin cậy của Qwen OAuth:**Đã giải quyết một loạt sự cố tích hợp OAuth, bao gồm trình chặn 400 Yêu cầu xấu trên mã thông báo đã hết hạn, tạo dự phòng để phân tích cú pháp các thuộc tính `access_token` OIDC khi `id_token` bị bỏ qua, lỗi khám phá danh mục mô hình và lọc nghiêm ngặt các tiêu đề `X-Dashscope-*` để tránh bị từ chối 400 từ các điểm cuối tương thích với OpenAI.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Tự động kết hợp & định tuyến:**Đã hoàn thành tích hợp vòng đời CRUD gốc cho công cụ Tự động kết hợp tiên tiến (#955). -**Hoạt động cốt lõi:**Đã sửa lỗi bản dịch bị thiếu cho các tùy chọn Tự động kết hợp gốc mới (#955). -**Xác thực bảo mật:**Đã tắt các tác vụ tự động sao lưu SQLite nguyên bản trong quá trình thực thi CI kiểm tra đơn vị để giải quyết rõ ràng rò rỉ bộ nhớ treo Vòng lặp sự kiện Nút 22 (#956). -**Proxy hệ sinh thái:**Đã hoàn thành bộ lập lịch đồng bộ hóa mô hình ánh xạ tích hợp rõ ràng, chu trình OAuth và Kiểm tra mã thông báo làm mới một cách an toàn thông qua proxy ngược dòng hệ thống gốc của OmniRoute (#953). -**Khả năng mở rộng MCP:**Đã thêm và đăng ký thành công công cụ khung MCP `omniroute_web_search` mới từ phiên bản beta vào các lược đồ sản xuất (#951). -**Logic bộ đệm mã thông báo:**Đã thêm giới hạn cấu hình thời gian chạy mở rộng bộ đệm mã thông báo đầu vào/đầu ra có thể định cấu hình để có số liệu Theo dõi sử dụng chính xác (#959).### 🐛 Bug Fixes

-**Khắc phục CodeQL:**Các hoạt động lập chỉ mục chuỗi quan trọng được giải quyết đầy đủ và bảo mật ngăn chặn các mảng Giả mạo yêu cầu phía máy chủ (SSRF) lập chỉ mục chẩn đoán cùng với việc quay lui thuật toán đa thức (ReDoS) bên trong các mô-đun bộ điều phối proxy sâu. -**Băm tiền điện tử:**Đã thay thế các hàm băm OAuth 1.0 cũ chưa được xác minh yếu bằng các hàm băm xác thực tiêu chuẩn HMAC-SHA-256 mạnh mẽ đảm bảo kiểm soát truy cập chặt chẽ. -**Bảo vệ ranh giới API:**Các biện pháp bảo vệ tuyến cấu trúc được xác minh và ánh xạ chính xác thực thi logic phần mềm trung gian `isAuthenticated()` nghiêm ngặt bao gồm thao tác cài đặt nhắm mục tiêu điểm cuối động mới hơn và tải kỹ năng gốc. -**Tương thích hệ sinh thái CLI:**Đã giải quyết các ràng buộc của trình phân tích cú pháp thời gian chạy gốc bị hỏng, khiến trình phát hiện môi trường `where` hoàn toàn vượt quá các trường hợp cạnh `.cmd/.exe` một cách duyên dáng cho các plugin bên ngoài (#969). -**Kiến trúc bộ nhớ đệm:**Đã tái cấu trúc chính xác các tham số bố cục bảng thông số Cài đặt hệ thống và phân tích trong bộ nhớ đệm để duy trì chu kỳ duy trì quá trình bù nước ổn định, giải quyết tình trạng nhấp nháy trạng thái không được căn chỉnh trực quan (#952). -**Tiêu chuẩn bộ đệm của Claude:**Được chuẩn hóa và bảo quản nghiêm ngặt một cách chính xác các điểm đánh dấu khối phù du quan trọng `phù du` trong bộ nhớ đệm Lệnh TTL cho các nút hạ lưu thực thi ánh xạ các yêu cầu CC tương thích tiêu chuẩn một cách rõ ràng mà không bị bỏ số liệu (#948). -**Xác thực bí danh nội bộ:**Ánh xạ thời gian chạy nội bộ được đơn giản hóa, chuẩn hóa việc tra cứu tải trọng thông tin xác thực Codex bên trong các tham số dịch thuật toàn cầu, giải quyết 401 lần giảm không được xác thực (#958).### 🛠️ Maintenance

-**Khả năng khám phá giao diện người dùng:**Các phân loại bố cục được điều chỉnh chính xác tách biệt rõ ràng logic của nhà cung cấp cấp miễn phí, cải thiện luồng sắp xếp UX bên trong các trang đăng ký API chung (#950). -**Cấu trúc liên kết triển khai:**Các tạo phẩm triển khai Docker hợp nhất đảm bảo `fly.toml` gốc khớp với các tham số phiên bản đám mây dự kiến ​​ngay lập tức xử lý nguyên bản việc triển khai tự động mở rộng quy mô một cách chính xác. -**Công cụ phát triển:**Tách các tham số thời gian chạy `LKGP` thành các tiện ích bộ nhớ đệm trừu tượng hóa lớp DB rõ ràng, đảm bảo phạm vi cách ly kiểm tra nghiêm ngặt cho các lớp bộ nhớ đệm lõi một cách an toàn.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Bảng điều khiển tự động kết hợp bảng điều khiển:**Đã tái cấu trúc hoàn toàn giao diện người dùng `/dashboard/auto-combo` để tích hợp liền mạch với Thẻ bảng điều khiển gốc và phần đệm/tiêu đề trực quan được tiêu chuẩn hóa. Đã thêm cơ chế trọng số lựa chọn mô hình ánh xạ thanh tiến trình trực quan động. -**Đồng bộ hóa định tuyến cài đặt:**Hiển thị đầy đủ các mục tiêu lược đồ định tuyến nâng cao `ưu tiên` và `có trọng số` bên trong danh sách dự phòng cài đặt chung.### Bug Fixes

-**Nút ngôn ngữ bộ nhớ & kỹ năng:**Đã giải quyết các thẻ kết xuất trống cho các tùy chọn Bộ nhớ và Kỹ năng trực tiếp bên trong chế độ xem cài đặt chung bằng cách nối tất cả các giá trị `settings.*` ánh xạ nội bộ vào `en.json` (cũng được ánh xạ ngầm cho các công cụ dịch chéo).### Internal Integrations

- Tích hợp PR #946 — sửa lỗi: duy trì tính tương thích của Mã Claude trong chuyển đổi phản hồi
- Tích hợp PR #944 — fix(gemini): lưu giữ các dấu hiệu suy nghĩ trong các lệnh gọi công cụ phản trọng lực
- Tích hợp PR #943 — sửa: khôi phục nội dung GitHub Copilot
- Tích hợp PR #942 — Sửa các điểm đánh dấu bộ đệm tương thích với cc
- Tích hợp PR #941 — refactor(auth): cải thiện việc tra cứu bí danh NVIDIA + thêm tính năng ghi lỗi LKGP
- Tích hợp PR #939 — Khôi phục xử lý gọi lại localhost Claude OAuth
- _(Lưu ý: PR #934 đã bị bỏ qua trong chu kỳ 3.4.9 để ngăn ngừa xung đột cốt lõi hồi quy)_---

## [3.4.8] — 2026-04-03

### Bảo mật

- Đã khắc phục hoàn toàn tất cả các phát hiện nổi bật về Github Advanced Security (CodeQL) và cảnh báo Dependabot.
- Đã sửa các lỗ hổng ngẫu nhiên không an toàn bằng cách di chuyển từ `Math.random` sang `crypto.randomUUID()`.
- Các lệnh shell được bảo mật trong các tập lệnh tự động từ việc chèn chuỗi.
- Đã di chuyển các mẫu phân tích cú pháp RegEx quay lui thảm khốc dễ bị tổn thương trong quy trình trò chuyện/dịch thuật.
- Các biện pháp kiểm soát dọn dẹp đầu ra nâng cao bên trong các thành phần React UI và tính năng chèn thẻ Sự kiện gửi máy chủ (SSE).---

## [3.4.7] — 2026-04-03

### Tính năng

- Đã thêm nút `Mật mã` vào Giám sát và kiểm tra tình trạng MCP (#798)
- Ánh xạ quyền định tuyến danh mục mô hình được tăng cường (`/models`) (#781)### Bug Fixes

- Đã sửa lỗi làm mới mã thông báo Claude OAuth không bảo toàn được bối cảnh bộ đệm (#937)
- Đã sửa lỗi nhà cung cấp Tương thích CC khiến các mô hình được lưu trong bộ nhớ đệm không thể truy cập được (#937)
- Đã sửa lỗi GitHub Executor liên quan đến mảng ngữ cảnh không hợp lệ (#937)
- Đã sửa lỗi kiểm tra sức khỏe của công cụ CLI do NPM cài đặt trên Windows (#935)
- Đã sửa lỗi dịch tải trọng làm mất nội dung hợp lệ do các trường API không hợp lệ (#927)
- Đã khắc phục sự cố thời gian chạy ở Nút 25 liên quan đến việc thực thi khóa API (#867)
- Đã sửa lỗi độ phân giải mô-đun độc lập MCP (`ERR_MODULE_NOT_FOUND`) qua `esbuild` (#936)
- Đã sửa lỗi bí danh độ phân giải thông tin xác thực định tuyến NVIDIA NIM không khớp (#931)### Bảo mật

- Đã thêm tính năng bảo vệ ranh giới đầu vào nghiêm ngặt, an toàn chống lại việc tiêm thực thi mã từ xa `shell: true` thô.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Nhà cung cấp:**Đã đăng ký nhà cung cấp hình ảnh, video và âm thanh mới từ danh sách do cộng đồng yêu cầu (#926). -**Giao diện người dùng bảng điều khiển:**Đã thêm điều hướng thanh bên độc lập cho các mô-đun Bộ nhớ và Kỹ năng mới (#926). -**i18n:**Đã thêm chuỗi dịch và ánh xạ bố cục trên 30 ngôn ngữ cho không gian tên Bộ nhớ và Kỹ năng.### 🐛 Bug Fixes

-**Khả năng phục hồi:**Đã ngăn chặn Bộ ngắt mạch proxy bị kẹt ở trạng thái MỞ vô thời hạn bằng cách xử lý các chuyển đổi trực tiếp sang trạng thái ĐÓNG bên trong các đường dẫn kết hợp dự phòng (#930). -**Dịch giao thức:**Đã vá bộ biến áp phát trực tuyến để vệ sinh các khối phản hồi dựa trên giao thức _source_ dự kiến ​​thay vì giao thức _target_ của nhà cung cấp, sửa các mô hình Anthropics được gói trong tải trọng OpenAI làm hỏng Mã Claude (#929). -**Thông số API & Gemini:**Đã sửa lỗi phân tích cú pháp `thought_signature` trong trình dịch `openai-to-gemini` và `claude-to-gemini`, ngăn lỗi HTTP 400 trên tất cả lệnh gọi công cụ API Gemini 3. -**Nhà cung cấp:**Đã dọn sạch các điểm cuối không tương thích với OpenAI, ngăn chặn các kết nối ngược dòng hợp lệ (#926). -**Xu hướng bộ đệm:**Đã sửa lỗi dữ liệu ánh xạ thuộc tính không khớp không hợp lệ khiến biểu đồ UI Xu hướng bộ đệm bị lỗi và trích xuất các tiện ích chỉ số bộ nhớ đệm dư thừa (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**Tích hợp hệ sinh thái CLIProxyAPI:**Đã thêm trình thực thi `cliproxyapi` với bộ đệm ẩn cấp mô-đun và định tuyến proxy tích hợp sẵn. Đã giới thiệu dịch vụ Trình quản lý phiên bản toàn diện để tự động kiểm tra tình trạng, tải xuống các tệp nhị phân từ GitHub, tạo ra các quy trình nền biệt lập và quản lý rõ ràng vòng đời của các công cụ CLI bên ngoài trực tiếp thông qua giao diện người dùng. Bao gồm các bảng DB để cấu hình proxy nhằm cho phép tự động định tuyến chéo qua cổng SSRF của các yêu cầu OpenAI bên ngoài thông qua lớp công cụ CLI cục bộ (#914, #915, #916). -**Hỗ trợ Qoder PAT:**Hỗ trợ Mã truy cập cá nhân (PAT) tích hợp trực tiếp thông qua truyền tải `qodercli` cục bộ thay vì cấu hình trình duyệt `.cn` từ xa cũ (#913). -**Bản xem trước Gemini 3.1 Pro (GitHub):**Đã thêm hỗ trợ mô hình rõ ràng chuẩn mực `gemini-3.1-pro-preview` vào nhà cung cấp GitHub Copilot trong khi vẫn giữ nguyên các bí danh định tuyến cũ hơn (#924).### 🐛 Bug Fixes

-**Độ ổn định của mã thông báo GitHub Copilot:**Đã sửa chữa vòng lặp làm mới mã thông báo Copilot trong đó các mã thông báo cũ không được hợp nhất sâu vào DB và xóa các trường `reasoning_text` đã phá vỡ nghiêm trọng các chuyển đổi khối Anthropic xuôi dòng cho cuộc trò chuyện nhiều lượt (#923). -**Ma trận thời gian chờ toàn cầu:**Thời gian chờ yêu cầu được tham số hóa và tập trung hóa rõ ràng từ `REQUEST_TIMEOUT_MS` để ngăn bộ đệm tìm nạp mặc định bị ẩn (~300 giây) cắt sớm các phản hồi phát trực tuyến SSE tồn tại lâu dài từ các mô hình lý luận nặng (#918). -**Trạng thái đường hầm nhanh của Cloudflare:**Đã khắc phục sự không nhất quán trạng thái nghiêm trọng trong đó các phiên bản OmniRoute được khởi động lại hiển thị sai các đường hầm bị phá hủy là đang hoạt động và đặt mặc định đường hầm đám mây thành `HTTP/2` để loại bỏ thư rác nhật ký bộ đệm nhận UDP (#925). -**Đại tu bản dịch i18n (tiếng Séc và tiếng Hindi):**Đã sửa mã tiếng Hindi từ KHÔNG DÙNG `in.json` thành `hi.json` chuẩn, sửa lại ánh xạ văn bản tiếng Séc, trích xuất `untranslatable-keys.json` để sửa lỗi xác thực CI/CD dương tính giả và tạo tài liệu `I18N.md` toàn diện để hướng dẫn người dịch (#912). -**Khôi phục nhà cung cấp mã thông báo:**Đã sửa lỗi Qwen mất các điểm cuối `resourceUrl` cụ thể sau khi làm mới mã thông báo kiểm tra tình trạng tự động do thiếu hợp nhất sâu DB (#917). -**Trải nghiệm phát trực tuyến và trải nghiệm người dùng tương thích CC:**Hợp nhất các hành động Thêm CC/OpenAI/Anthropic xung quanh việc xử lý Anthropic UI, buộc các yêu cầu ngược dòng tương thích với CC sử dụng SSE trong khi vẫn trả về các phản hồi phát trực tuyến hoặc không phát trực tuyến dựa trên yêu cầu của khách hàng, loại bỏ hỗ trợ nhập/cấu hình danh sách mô hình CC do lỗi liệt kê mô hình không được hỗ trợ rõ ràng và làm cho các Mô hình có sẵn tương thích với CC phản ánh danh sách đăng ký Mã OAuth Claude (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Báo cáo mã thông báo API phản hồi:**Phát ra `response.completed` với các trường `input_tokens`/`output_tokens` chính xác cho máy khách Codex CLI, sửa lỗi hiển thị mức sử dụng mã thông báo (#909 - cảm ơn @christopher-s). -**SQLite WAL Checkpoint on Shutdown:**Flush WAL changes into the primary database file during graceful shutdown/restart, preventing data loss on Docker container stops (#905 — thanks @rdself). -**Tín hiệu tắt máy dễ dàng:**Đã thay đổi tuyến `/api/restart` và `/api/shutdown` từ `process.exit(0)` thành `process.kill(SIGTERM)`, đảm bảo trình xử lý tắt máy chạy trước khi thoát. -**Thời gian gia hạn dừng Docker:**Đã thêm `stop_grace_ Period: 40s` vào các tệp Docker Compose và `--stop-timeout 40` vào các ví dụ chạy Docker.### 🛠️ Maintenance

- Đóng 5 vấn đề đã được giải quyết/không có lỗi (#872, #814, #816, #890, #877).
- Đã xử lý 6 vấn đề về yêu cầu thông tin nhu cầu (#892, #887, #886, #865, #895, #870).
- Đã phản hồi vấn đề theo dõi phát hiện CLI (#863) với hướng dẫn của cộng tác viên.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Kỹ năng & Ký ức Chống Trọng lực:**Đã hoàn tất quá trình tiêm kỹ năng và bộ nhớ từ xa cho nhà cung cấp Chống Trọng lực ở cấp độ mạng proxy. -**Khả năng tương thích với Mã Claude:**Đã xây dựng một cầu nối tương thích ẩn vốn có cho Mã Claude, chuyển các công cụ và định dạng một cách rõ ràng. -**MCP tìm kiếm trên web:**Đã thêm công cụ `omniroute_web_search` với phạm vi `execute:search`. -**Thành phần bộ nhớ đệm:**Triển khai các thành phần bộ nhớ đệm động sử dụng TDD. -**Giao diện người dùng & Tùy chỉnh:**Đã thêm hỗ trợ biểu tượng yêu thích tùy chỉnh, các tab giao diện, gắn nhãn trắng có dây vào thanh bên và thêm các bước hướng dẫn Lướt ván buồm trên tất cả 33 ngôn ngữ. -**Lưu giữ nhật ký:**Lưu giữ nhật ký yêu cầu thống nhất và các tạo phẩm nguyên bản. -**Cải tiến mô hình:**Đã thêm `contextLength` rõ ràng cho tất cả các mô hình opencode-zen. -**i18n & bản dịch:**Tích hợp 33 bản dịch ngôn ngữ nguyên bản, bao gồm xác thực CI giữ chỗ và cập nhật tài liệu tiếng Trung (#873, #869).### 🐛 Bug Fixes

-**Ánh xạ Qwen OAuth:**Đã hoàn nguyên sự phụ thuộc của `id_token` thành `access_token` và bật tính năng chèn điểm cuối API `resource_url` động để định tuyến khu vực thích hợp (#900). -**Công cụ đồng bộ hóa mô hình:**Đã lưu trữ ID nhà cung cấp nội bộ nghiêm ngặt trong quy trình đồng bộ hóa `getCustomModels()` thay vì định dạng Bí danh kênh giao diện người dùng, ngăn ngừa lỗi chèn danh mục SQLite (#903). -**Claude Code & Codex:**Các phản hồi trống không phát trực tuyến được chuẩn hóa cho `(phản hồi trống)` được định dạng Anthropic để ngăn chặn sự cố proxy CLI (#866). -**Định tuyến tương thích CC:**Đã giải quyết xung đột điểm cuối `/v1` trùng lặp trong quá trình nối đường dẫn cho các cổng Mã Claude chung (#904). -**Bảng điều khiển chống trọng lực:**Đã chặn các mô hình hạn ngạch không giới hạn đăng ký sai ở trạng thái giới hạn `100% mức sử dụng` đã cạn kiệt trong Giao diện người dùng sử dụng của nhà cung cấp (#857). -**Truyền qua hình ảnh Claude:**Đã sửa lỗi mô hình Claude thiếu khả năng truyền qua khối hình ảnh (#898). -**Định tuyến Gemini CLI:**Đã giải quyết 403 vấn đề khóa ủy quyền và tích lũy nội dung bằng cách làm mới ID dự án thông qua `loadCodeAssist` (#868). -**Độ ổn định chống trọng lực:**Đã sửa danh sách truy cập mô hình, thực thi khóa 404, sửa lỗi 429 tầng khóa các kết nối tiêu chuẩn và giới hạn mã thông báo đầu ra `gemini-3.1-pro` (#885). -**Nhịp đồng bộ hóa của nhà cung cấp:**Đã sửa chữa nhịp đồng bộ hóa giới hạn của nhà cung cấp thông qua bộ lập lịch nội bộ (#888). -**Tối ưu hóa trang tổng quan:**Đã giải quyết tình trạng đóng băng giao diện người dùng `/dashboard/limits` khi xử lý hơn 70 tài khoản thông qua song song hóa đoạn (#784). -**Làm cứng SSRF:**Đã thực thi lọc phạm vi IP SSRF nghiêm ngặt và chặn giao diện loopback `::1`. -**Loại MIME:**Đã chuẩn hóa `mime_type` thành snake_case để phù hợp với thông số kỹ thuật của API Gemini. -**Ổn định CI:**Đã sửa lỗi phân tích/cài đặt không thành công Bộ chọn Playwright và yêu cầu xác nhận để GitHub Actions E2E chạy vượt qua một cách đáng tin cậy trên các giao diện người dùng được bản địa hóa và các điều khiển dựa trên công tắc. -**Thử nghiệm xác định:**Đã xóa hạn mức hạn ngạch nhạy cảm với ngày khỏi các thử nghiệm sử dụng Copilot và các thử nghiệm danh mục mô hình/idempotency được căn chỉnh với hành vi thời gian chạy đã hợp nhất. -**Củng cố loại MCP:**Đã xóa hồi quy `bất kỳ` rõ ràng không có ngân sách khỏi đường dẫn đăng ký công cụ máy chủ MCP. -**Công cụ đồng bộ hóa mô hình:**Đã bỏ qua ghi đè `thay thế` mang tính hủy diệt khi tính năng tự động đồng bộ hóa của nhà cung cấp mang lại danh sách mô hình trống, duy trì tính ổn định cho danh mục động (#899).### 🛠️ Maintenance

-**Ghi nhật ký đường ống:**Tạo các tạo phẩm ghi nhật ký đường ống được tinh chỉnh và thực thi giới hạn lưu giữ (#880). -**Đại tu AGENTS.md:**Được cô đọng từ 297→153 dòng. Đã thêm các nguyên tắc xây dựng/kiểm tra/kiểu, quy trình làm việc mã (Prettier, TypeScript, ESLint) và các bảng dài dòng được cắt bớt (#882). -**Tích hợp nhánh phát hành:**Hợp nhất các nhánh tính năng đang hoạt động thành `release/v3.4.2` bên trên `main` hiện tại và xác thực nhánh bằng các lần chạy lint, unit, cover, build và CI-mode E2E. -**Kiểm tra:**Đã thêm cấu hình vitest để kiểm tra thành phần và thông số kỹ thuật của Nhà viết kịch cho các nút bật tắt cài đặt. -**Cập nhật tài liệu:**Mở rộng các bản đọc gốc, dịch các tài liệu tiếng Trung nguyên bản và dọn dẹp các tệp lỗi thời.## [3.4.1] - 2026-03-31

> [!CẢNH BÁO]
> **THAY ĐỔI MỚI NHẤT: các biến môi trường ghi nhật ký, lưu giữ và ghi nhật ký yêu cầu đã được thiết kế lại.**
> Trong lần khởi động đầu tiên sau khi nâng cấp, OmniRoute lưu trữ nhật ký yêu cầu cũ từ `DATA_DIR/logs/`, `DATA_DIR/call_logs/` cũ và `DATA_DIR/log.txt` vào `DATA_DIR/log_archives/*.zip`, sau đó xóa bố cục không được dùng nữa và chuyển sang định dạng tạo phẩm hợp nhất mới trong `DATA_DIR/call_logs/`.### ✨ New Features

-**.ENV Migration Utility:**Bao gồm `scripts/migrate-env.mjs` để di chuyển liền mạch các cấu hình `<v3.3` sang các ràng buộc xác thực bảo mật nghiêm ngặt `v3.4.x` (FASE-01), sửa chữa các sự cố khởi động do các phiên bản `JWT_SECRET` ngắn gây ra. -**Tối ưu hóa bộ nhớ đệm Kiro AI:**Đã triển khai quá trình tạo `conversationId` (uuidv5) xác định để bật Bộ nhớ đệm nhắc ID AWS Builder đúng cách trên các lệnh gọi (#814). -**Khôi phục & Hợp nhất giao diện người dùng bảng điều khiển:**Đã giải quyết logic thanh bên bỏ qua phần Gỡ lỗi và xóa cảnh báo định tuyến Nextjs bằng cách di chuyển các trang `/dashboard/mcp` và `/dashboard/a2a` độc lập một cách rõ ràng vào các thành phần UI Proxy điểm cuối được nhúng. -**Cấu phần nhật ký yêu cầu thống nhất:**Ghi nhật ký yêu cầu hiện lưu trữ một hàng chỉ mục SQLite cộng với một cấu phần phần mềm JSON cho mỗi yêu cầu trong `DATA_DIR/call_logs/`, với tính năng chụp quy trình tùy chọn được nhúng trong cùng một tệp. -**Ngôn ngữ:**Cải thiện bản dịch tiếng Trung (#855) -**Mô hình Opencode-Zen:**Đã thêm 4 mô hình miễn phí vào sổ đăng ký opencode-zen (#854) -**Thử nghiệm:**Đã thêm thử nghiệm đơn vị và E2E để chuyển đổi cài đặt và sửa lỗi (#850)### 🐛 Bug Fixes

-**Phân tích hạn ngạch 429:**Đã phân tích cú pháp thời gian đặt lại hạn ngạch dài từ các phần lỗi để khắc phục lỗi lùi và ngăn chặn lệnh cấm tài khoản có giới hạn tỷ lệ (#859) -**Bộ nhớ đệm nhanh:**Các tiêu đề `cache_control` của máy khách được giữ nguyên cho tất cả các nhà cung cấp giao thức Claude (như Minimax, GLM và Bailian), nhận dạng chính xác hỗ trợ bộ nhớ đệm (#856) -**Nhật ký đồng bộ hóa mô hình:**Giảm spam nhật ký bằng cách chỉ ghi `mô hình đồng bộ hóa` khi kênh thực sự sửa đổi danh sách (#853) -**Phân tích cú pháp mã thông báo và hạn ngạch của nhà cung cấp:**Đã chuyển đổi giới hạn Chống trọng lực để sử dụng `retrieveUserQuota` một cách nguyên bản và ánh xạ chính xác tải trọng làm mới mã thông báo Claude sang các biểu mẫu được mã hóa URL (#862) -**Độ ổn định giới hạn tỷ lệ:**Phổ cập kiến trúc phân tích cú pháp 429 Thử lại sau khi giới hạn thời gian hồi chiêu do nhà cung cấp gây ra ở mức tối đa 24 giờ (#862) -**Hiển thị giới hạn bảng điều khiển:**Ánh xạ hạn ngạch `/dashboard/limits` được kiến trúc lại để hiển thị ngay bên trong các khối, khắc phục độ trễ đóng băng giao diện người dùng chính trên các tài khoản vượt quá 70 kết nối đang hoạt động (#784) -**Ủy quyền QWEN OAuth:**Đã ánh xạ `id_token` OIDC làm mã thông báo Người mang API chính cho các yêu cầu Dashscope, sửa lỗi 401 trái phép ngay lập tức sau khi kết nối tài khoản hoặc làm mới mã thông báo (#864) -**Tính ổn định của API ZAI:**Trình biên dịch Sự kiện do máy chủ gửi được tăng cường để dự phòng một cách duyên dáng các chuỗi trống khi nhà cung cấp DeepSeek truyền phát nội dung rỗng về mặt toán học trong các giai đoạn suy luận (#871) -**Bản dịch mã Claude/Codex:**Chuyển đổi tải trọng không phát trực tuyến được bảo vệ chống lại các phản hồi trống từ các công cụ Codex ngược dòng, tránh các lỗi TypeError thảm khốc (#866) -**Kết xuất NVIDIA NIM:**Loại bỏ có điều kiện các tiền tố nhà cung cấp giống hệt nhau được các mô hình âm thanh đẩy động, loại bỏ các cấu trúc thẻ `nim/nim` trùng lặp gây ra lỗi 404 trên Media Playground (#872)### ⚠️ Breaking Changes

-**Bố cục nhật ký yêu cầu:**Đã xóa phiên nhật ký yêu cầu `DATA_DIR/logs/` nhiều tệp cũ và tệp tóm tắt `DATA_DIR/log.txt`. Các yêu cầu mới được viết dưới dạng các tạo phẩm JSON đơn lẻ trong `DATA_DIR/call_logs/YYYY-MM-DD/`. -**Biến môi trường ghi nhật ký:**Đã thay thế `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE` và `PROXY_LOG_MAX_ENTRIES` bằng mô hình cấu hình `APP_LOG_*` và `CALL_LOG_RETENTION_DAYS` mới. -**Cài đặt chuyển đổi đường ống:**Đã thay thế cài đặt `detailed_logs_enabled` cũ bằng `call_log_pipeline_enabled`. Chi tiết quy trình mới được nhúng bên trong cấu phần phần mềm yêu cầu thay vì được lưu trữ dưới dạng bản ghi `request_detail_logs` riêng biệt.### 🛠️ Maintenance

-**Sao lưu nâng cấp nhật ký yêu cầu cũ:**Giờ đây, các bản nâng cấp sẽ lưu trữ bố cục `data/logs/`, `data/call_logs/` cũ và `data/log.txt` thành `DATA_DIR/log_archives/*.zip` trước khi xóa cấu trúc không còn được dùng nữa. -**Tính liên tục sử dụng tính năng phát trực tuyến:**Giờ đây, các yêu cầu phát trực tuyến ghi một hàng `usage_history` khi hoàn thành thay vì phát ra một hàng sử dụng trùng lặp đang diễn ra với siêu dữ liệu trạng thái trống. -**Dọn dẹp theo dõi nhật ký:**Nhật ký quy trình không còn ghi lại `SOURCE REQUEST` nữa, yêu cầu các mục nhập giả hiện vinh danh `CALL_LOG_MAX_ENTRIES` và kho lưu trữ nhật ký ứng dụng hiện vinh danh `APP_LOG_MAX_FILES`.---

## [3.4.0] - 2026-03-31

### Tính năng

-**Phân tích mức sử dụng đăng ký:**Đã thêm tính năng theo dõi chuỗi thời gian chụp nhanh hạn ngạch, tab Mức sử dụng nhà cung cấp và Tình trạng kết hợp với hình ảnh trực quan hóa biểu đồ lại và điểm cuối API tương ứng (#847) -**Kiểm soát sao lưu SQLite:**Cờ env `OMNIROUTE_DISABLE_AUTO_BACKUP` mới để tắt sao lưu SQLite tự động (#846) -**Cập nhật sổ đăng ký mô hình:**Đã đưa `gpt-5.4-mini` vào mảng mô hình của nhà cung cấp Codex (#756) -**Theo dõi giới hạn nhà cung cấp:**Theo dõi và hiển thị thời điểm giới hạn tỷ lệ nhà cung cấp được làm mới lần cuối trên mỗi tài khoản (#843)### 🐛 Bug Fixes

-**Định tuyến xác thực Qwen:**Đã định tuyến lại các lần hoàn thành Qwen OAuth từ API DashScope sang API suy luận web (`chat.qwen.ai`), giải quyết các lỗi ủy quyền (#844, #807, #832) -**Vòng lặp tự động thử lại Qwen:**Đã thêm mục tiêu 429 Hạn ngạch vượt quá xử lý thời gian chờ bên trong các yêu cầu bảo vệ cụm `chatCore` -**Codex OAuth Fallback:**Việc chặn cửa sổ bật lên của trình duyệt hiện đại không còn bẫy người dùng nữa; nó tự động quay trở lại mục nhập URL thủ công (#808) -**Làm mới mã thông báo Claude:**Các ranh giới `application/json` nghiêm ngặt của Anthropic hiện được tôn trọng trong quá trình tạo mã thông báo thay vì các URL được mã hóa (#836) -**Lược đồ tin nhắn Codex:**Các `tin nhắn` thuần túy được loại bỏ khỏi các yêu cầu chuyển qua gốc để tránh bị từ chối cấu trúc từ thượng nguồn ChatGPT (#806) -**Giới hạn kích thước phát hiện CLI:**Đã vượt qua giới hạn trên của quá trình quét nhị phân Node một cách an toàn từ 100 MB đến 350 MB, cho phép các công cụ độc lập nặng như Claude Code (229 MB) và OpenCode (153 MB) được phát hiện chính xác bởi thời gian chạy VPS (#809) -**Môi trường thời gian chạy CLI:**Đã khôi phục khả năng cấu hình CLI tôn trọng các đường dẫn ghi đè của người dùng (`CLI_{PROVIDER__BIN`) bỏ qua các quy tắc khám phá giới hạn đường dẫn nghiêm ngặt -**Xung đột tiêu đề Nvidia:**Đã xóa thuộc tính `prompt_cache_key` khỏi tiêu đề ngược dòng khi gọi các nhà cung cấp không phải của Anthropic (#848) -**Chuyển đổi cấp độ nhanh Codex:**Đã khôi phục độ tương phản chuyển đổi cấp độ dịch vụ Codex ở chế độ ánh sáng (#842) -**Cơ sở hạ tầng thử nghiệm:**Đã cập nhật thử nghiệm `t28-model-catalog-updates` dự kiến không chính xác điểm cuối DashScope đã lỗi thời cho sổ đăng ký gốc Qwen---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Xoay vòng nhà cung cấp tùy chỉnh:**Tích hợp `getRotatingApiKey` bên trong DefaultExecutor, đảm bảo kích hoạt xoay vòng `extraApiKeys` một cách chính xác cho các nhà cung cấp ngược dòng tương thích và tùy chỉnh (#815)---

## [3.3.8] - 2026-03-30

### Tính năng

-**Lọc API mô hình:**Điểm cuối `/v1/models` hiện tự động lọc danh sách của nó dựa trên các quyền được gắn với `Ủy quyền: Bearer <token>` khi bật quyền truy cập hạn chế (#781) -**Tích hợp Qoder:**Tích hợp gốc cho Qoder AI thực sự thay thế ánh xạ nền tảng iFlow cũ (#660) -**Theo dõi bộ nhớ đệm nhanh chóng:**Đã thêm khả năng theo dõi và trực quan hóa giao diện người dùng (thẻ Thống kê) để lưu vào bộ đệm ẩn ngữ nghĩa và kịp thời trong giao diện người dùng Trang tổng quan### 🐛 Bug Fixes

-**Kích thước bảng điều khiển bộ đệm:**Đã cải thiện kích thước bố cục giao diện người dùng và tiêu đề ngữ cảnh cho các trang bộ đệm nâng cao (#835) -**Khả năng hiển thị thanh bên gỡ lỗi:**Đã khắc phục sự cố trong đó nút chuyển đổi gỡ lỗi không hiển thị/ẩn chi tiết gỡ lỗi thanh bên một cách chính xác (#834) -**Tiền tố mô hình Gemini:**Đã sửa đổi dự phòng vùng tên để định tuyến chính xác thông qua `gemini-cli/` thay vì `gc/` để tôn trọng các thông số kỹ thuật ngược dòng (#831) -**OpenRouter Sync:**Cải thiện khả năng đồng bộ hóa khả năng tương thích để tự động nhập danh mục mô hình có sẵn một cách chính xác từ OpenRouter (#830) -**Ánh xạ tải trọng trực tuyến:**Việc tuần tự hóa lại các trường lý luận về cơ bản sẽ giải quyết các đường dẫn bí danh xung đột khi đầu ra đang truyền tới các thiết bị biên---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**Cấu hình OpenCode:**Đã tái cấu trúc `opencode.json` được tạo để sử dụng lược đồ dựa trên bản ghi `@ai-sdk/openai-tương thích` với `options` và `models` làm bản đồ đối tượng thay vì mảng phẳng, sửa lỗi xác thực cấu hình (#816) -**i18n Thiếu khóa:**Đã thêm khóa dịch `cloudflaredUrlNotice` bị thiếu trên tất cả 30 tệp ngôn ngữ để ngăn lỗi bảng điều khiển `MISSING_MESSAGE` trong trang Điểm cuối (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Kế toán mã thông báo:**Bao gồm mã thông báo bộ nhớ đệm nhắc nhở một cách an toàn trong tính toán đầu vào sử dụng lịch sử để khấu trừ hạn ngạch chính xác (PR #822) -**Thăm dò kết hợp:**Đã sửa lỗi âm tính sai logic kiểm tra kết hợp bằng cách giải quyết phân tích cú pháp cho các phản hồi chỉ có lý do và cho phép song song hóa lớn thông qua Promise.all (PR #828) -**Đường hầm nhanh của Docker:**Đã nhúng các chứng chỉ ca bắt buộc bên trong vùng chứa thời gian chạy cơ sở để giải quyết các lỗi khởi động TLS của Cloudflared và các lỗi mạng xuất chuẩn xuất hiện thay thế các mã thoát chung (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Theo dõi hạn ngạch Gemini:**Đã thêm tính năng theo dõi hạn ngạch Gemini CLI theo thời gian thực thông qua API `retrieveUserQuota` (PR #825) -**Bảng điều khiển bộ đệm:**Đã cải tiến Bảng điều khiển bộ đệm để hiển thị số liệu bộ đệm nhanh chóng, xu hướng 24 giờ và mức tiết kiệm chi phí ước tính (PR #824)### 🐛 Bug Fixes

-**Trải nghiệm người dùng:**Đã xóa các vòng lặp phương thức OAuth tự động mở xâm lấn trên các trang chi tiết của nhà cung cấp cằn cỗi (PR #820) -**Cập nhật phần phụ thuộc:**Đã sửa đổi và khóa các phần phụ thuộc cho cây phát triển và sản xuất, bao gồm Next.js 16.2.1, Recharts và TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**Quy trình làm việc A2A:**Đã thêm trình điều phối FSM xác định cho quy trình làm việc của tổng đài viên gồm nhiều bước. -**Sự xuống cấp nhanh chóng:**Đã thêm khung dự phòng nhiều lớp mới để duy trì chức năng cốt lõi trong thời gian hệ thống ngừng hoạt động một phần. -**Kiểm tra cấu hình:**Đã thêm dấu vết kiểm tra với tính năng phát hiện khác biệt để theo dõi các thay đổi và cho phép khôi phục cấu hình. -**Tình trạng nhà cung cấp:**Đã thêm tính năng theo dõi hết hạn của nhà cung cấp với cảnh báo giao diện người dùng chủ động về các khóa API sắp hết hạn. -**Định tuyến thích ứng:**Đã thêm trình phát hiện độ phức tạp và khối lượng thích ứng để ghi đè động các chiến lược định tuyến dựa trên tải. -**Đa dạng nhà cung cấp:**Đã triển khai tính điểm đa dạng nhà cung cấp thông qua entropy Shannon để cải thiện khả năng phân bổ tải. -**Giới hạn tự động vô hiệu hóa:**Đã thêm nút chuyển đổi cài đặt Tự động vô hiệu hóa tài khoản bị cấm vào bảng điều khiển Khả năng phục hồi.### 🐛 Bug Fixes

-**Khả năng tương thích với Codex & Claude:**Đã sửa lỗi dự phòng giao diện người dùng, vá các sự cố tích hợp không phát trực tuyến Codex và giải quyết vấn đề phát hiện thời gian chạy CLI trên Windows. -**Tự động phát hành:**Các quyền mở rộng cần thiết cho bản dựng Ứng dụng Electron trong GitHub Actions. -**Thời gian chạy Cloudflare:**Đã xác định đúng mã thoát cách ly thời gian chạy cho các thành phần đường hầm Cloudflare.### 🧪 Tests

-**Cập nhật bộ thử nghiệm:**Phạm vi thử nghiệm mở rộng cho bộ phát hiện khối lượng, tính đa dạng của nhà cung cấp, kiểm tra cấu hình và FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**Độ tin cậy của CI/CD:**Đã vá các hành động GitHub thành các phiên bản phụ thuộc ổn định (`actions/checkout@v4`, `actions/upload-artifact@v4`) để giảm thiểu việc ngừng sử dụng môi trường trình tạo không báo trước. -**Dự phòng hình ảnh:**Đã thay thế chuỗi dự phòng tùy ý trong `ProviderIcon.tsx` bằng xác thực nội dung rõ ràng để ngăn giao diện người dùng tải các thành phần `<Image>` cho các tệp không tồn tại, loại bỏ lỗi `404` trong nhật ký bảng điều khiển trang tổng quan (#745). -**Trình cập nhật dành cho quản trị viên:**Phát hiện cài đặt nguồn động cho Trình cập nhật trang tổng quan. Vô hiệu hóa một cách an toàn nút `Cập nhật ngay` khi OmniRoute được xây dựng cục bộ thay vì thông qua npm, nhắc nhở `git pull` (#743). -**Cập nhật lỗi ERESSOLVE:**Đã chèn `package.json` ghi đè cho `react`/`react-dom` và bật `--legacy-peer-deps` trong tập lệnh cập nhật tự động nội bộ để giải quyết xung đột phá vỡ cây phụ thuộc với `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Đường hầm Cloudflare:**Tích hợp Đường hầm nhanh Cloudflare với các điều khiển bảng điều khiển (PR #772). -**Chẩn đoán:**Bỏ qua bộ nhớ đệm ngữ nghĩa cho các thử nghiệm trực tiếp kết hợp (PR #773).### 🐛 Bug Fixes

-**Tính ổn định của luồng phát:**Áp dụng `FETCH_TIMEOUT_MS` cho lệnh gọi `tìm nạp()` ban đầu của yêu cầu phát trực tuyến để ngăn thời gian chờ 300 giây của Node.js TCP gây ra lỗi tác vụ im lặng (#769). -**i18n:**Thêm các mục `windsurf` và `copilot` bị thiếu vào `toolDescriptions` trên tất cả 33 tệp ngôn ngữ (#748). -**Kiểm tra mã hóa GLM:**Hoàn thành kiểm tra nhà cung cấp, sửa các lỗ hổng ReDoS, định cỡ cửa sổ ngữ cảnh (128k/16k) và đồng bộ hóa sổ đăng ký mô hình (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Sửa lỗi xử lý dự phòng cho các phần tử `type: "text"` mang tập dữ liệu rỗng hoặc rỗng gây ra lỗi từ chối 400 (#742). -**Mã mở:**Cập nhật căn chỉnh lược đồ thành `nhà cung cấp` số ít để khớp với thông số kỹ thuật chính thức (#774). -**Gemini CLI:**Chèn các tiêu đề hạn ngạch của người dùng cuối bị thiếu để ngăn chặn khóa ủy quyền 403 (#775). -**Phục hồi DB:**Tái cấu trúc nhập tải trọng nhiều phần vào mảng đệm nhị phân thô để vượt qua giới hạn nội dung tối đa của proxy ngược (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Ổn định bản phát hành**— Bản phát hành v3.2.9 đã hoàn thiện (chẩn đoán kết hợp, cổng chất lượng, sửa lỗi công cụ Gemini) và tạo thẻ git bị thiếu. Hợp nhất tất cả các thay đổi theo giai đoạn thành một cam kết phát hành nguyên tử duy nhất.### 🐛 Bug Fixes

-**Kiểm tra tự động cập nhật**— Đã sửa lỗi xác nhận kiểm tra `buildDockerComposeUpdateScript` để khớp với các tham chiếu biến shell chưa được mở rộng (`$TARGET_TAG`, `${TARGET_TAG#v}`) trong tập lệnh triển khai đã tạo, căn chỉnh với mẫu được tái cấu trúc từ v3.2.8. -**Kiểm tra bộ ngắt mạch**— `combo- Circuit-breaker.test.mjs` được tăng cường bằng cách chèn `maxRetries: 0` để ngăn chặn việc thử lại lạm phát do làm sai lệch số lượng xác nhận lỗi trong quá trình chuyển đổi trạng thái bộ ngắt.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Chẩn đoán kết hợp**— Đã giới thiệu cờ bỏ qua kiểm tra trực tiếp (`forceLiveComboTest`) cho phép quản trị viên thực hiện kiểm tra tình trạng ngược dòng thực tế mà bỏ qua tất cả các cơ chế trạng thái ngắt mạch và thời gian hồi chiêu cục bộ, cho phép chẩn đoán chính xác trong thời gian ngừng hoạt động (PR #759) -**Cổng chất lượng**— Đã thêm xác thực chất lượng phản hồi tự động cho các tổ hợp và hỗ trợ mô hình `claude-4.6` được tích hợp chính thức vào các lược đồ định tuyến cốt lõi (PR #762)### 🐛 Bug Fixes

-**Xác thực định nghĩa công cụ**— Đã sửa lỗi tích hợp API Gemini bằng cách chuẩn hóa các loại enum bên trong định nghĩa công cụ, ngăn ngừa lỗi tham số HTTP 400 ngược dòng (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Giao diện người dùng tự động cập nhật Docker**— Tích hợp quy trình cập nhật nền tách rời để triển khai Docker Compose. Giao diện người dùng Bảng điều khiển hiện theo dõi liền mạch các sự kiện cập nhật trong vòng đời kết hợp các phản hồi JSON REST với lớp phủ tiến trình phát trực tuyến SSE để có độ tin cậy mạnh mẽ trong nhiều môi trường. -**Phân tích bộ nhớ đệm**— Đã sửa lỗi ánh xạ trực quan hóa số liệu bằng 0 bằng cách di chuyển nhật ký đo từ xa của Bộ nhớ đệm ngữ nghĩa trực tiếp vào mô-đun SQLite theo dõi tập trung.### 🐛 Bug Fixes

-**Logic xác thực**— Đã sửa lỗi lưu cài đặt trang tổng quan hoặc thêm mô hình không thành công với lỗi 401 trái phép khi `requireLogin` bị tắt. Điểm cuối API hiện đánh giá chính xác chuyển đổi xác thực toàn cầu. Đã giải quyết vấn đề chuyển hướng toàn cầu bằng cách kích hoạt lại `src/middleware.ts`. -**Phát hiện công cụ CLI (Windows)**— Ngăn chặn các trường hợp ngoại lệ khởi tạo nghiêm trọng trong quá trình phát hiện môi trường CLI bằng cách phát hiện chính xác các lỗi ENOENT `cross-spawn`. Thêm đường dẫn phát hiện rõ ràng cho `\AppData\Local\droid\droid.exe`. -**Truyền qua Codex gốc**— Các tham số dịch mô hình được chuẩn hóa ngăn ngừa ngộ độc ngữ cảnh trong chế độ truyền qua proxy, thực thi các ràng buộc `store: false` chung một cách rõ ràng đối với tất cả các yêu cầu bắt nguồn từ Codex. -**Báo cáo mã thông báo SSE**— Phát hiện đoạn lệnh gọi công cụ của nhà cung cấp đã chuẩn hóa `finish_reason`, sửa lỗi phân tích sử dụng 0% cho các phản hồi chỉ phát trực tuyến thiếu chỉ báo `<DONE>` nghiêm ngặt. -**Thẻ DeepSeek <think>**— Đã triển khai ánh xạ trích xuất `<think>` rõ ràng bên trong `responsesHandler.ts`, đảm bảo các luồng lý luận DeepSeek ánh xạ tương đương với các cấu trúc `<thinking>` Anthropic gốc.---

## [3.2.7] - 2026-03-29

### Fixed

-**Cập nhật giao diện người dùng liền mạch**: Tính năng "Cập nhật ngay" trên Trang tổng quan hiện cung cấp phản hồi trực tiếp, minh bạch bằng cách sử dụng Sự kiện do máy chủ gửi (SSE). Nó thực hiện cài đặt gói, xây dựng lại mô-đun gốc (tốt hơn-sqlite3) và PM2 khởi động lại một cách đáng tin cậy trong khi hiển thị các trình tải thời gian thực thay vì treo âm thầm.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Hiển thị khóa API (#740)**— Đã thêm luồng sao chép khóa API có phạm vi trong Trình quản lý Api, được bảo vệ bởi biến môi trường `ALLOW_API_KEY_REVEAL`. -**Điều khiển hiển thị thanh bên (#739)**— Quản trị viên hiện có thể ẩn bất kỳ liên kết điều hướng thanh bên nào thông qua cài đặt Giao diện để giảm sự lộn xộn về mặt hình ảnh. -**Kiểm tra kết hợp nghiêm ngặt (#735)**— Tăng cường điểm cuối kiểm tra tình trạng kết hợp để yêu cầu phản hồi bằng văn bản trực tiếp từ các mô hình thay vì chỉ các tín hiệu khả năng tiếp cận mềm. -**Nhật ký chi tiết được truyền trực tuyến (#734)**— Ghi nhật ký yêu cầu chi tiết đã chuyển đổi cho các luồng SSE để xây dựng lại tải trọng cuối cùng, tiết kiệm lượng lớn kích thước cơ sở dữ liệu SQLite và làm sạch đáng kể giao diện người dùng.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— Đã sửa logic tiêu đề xác thực cho các mô hình `minimax` trên OpenCode Go để sử dụng `x-api-key` thay vì mã thông báo mang tiêu chuẩn trên giao thức `/messages`.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Hỗ trợ triển khai Linux Void (#732)**— Mẫu đóng gói `xbps-src` tích hợp và hướng dẫn để biên dịch và cài đặt OmniRoute nguyên bản với các ràng buộc `better-sqlite3` thông qua mục tiêu biên dịch chéo.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI Migration (#660)**— Đã di chuyển hoàn toàn nhà cung cấp cốt lõi `iFlow` kế thừa sang `Qoder AI` để duy trì khả năng định tuyến API ổn định.### 🐛 Bug Fixes

-**Đối số không hợp lệ về tải trọng HTTP 400 của Công cụ Gemini (#731)**— Đã ngăn chặn việc chèn mảng `thoughtSignature` bên trong các chuỗi `functionCall` tiêu chuẩn của Gemini chặn các luồng định tuyến tác nhân.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Giao diện người dùng hạn ngạch giới hạn nhà cung cấp (#728)**— Logic giới hạn hạn ngạch chuẩn hóa và ghi nhãn dữ liệu bên trong giao diện Giới hạn.### 🐛 Bug Fixes

-**Lược đồ định tuyến cốt lõi & Rò rỉ**— `comboStrategySchema` được mở rộng để hỗ trợ nguyên bản các chiến lược `fill-first` và `p2c` nhằm bỏ chặn việc chỉnh sửa kết hợp phức tạp một cách nguyên bản. -**Trích xuất thẻ suy nghĩ (CLI)**— Trình khử trùng phản hồi mã thông báo CLI được cấu trúc lại RegEx ghi lại các cấu trúc lý luận mô hình bên trong luồng để tránh các trích xuất `<thinking>` bị hỏng định dạng đầu ra văn bản phản hồi. -**Thực thi định dạng nghiêm ngặt**— Việc thực thi vệ sinh đường ống được tăng cường giúp áp dụng rộng rãi cho các mục tiêu chế độ dịch.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Đường dẫn nhật ký yêu cầu bốn giai đoạn (#705)**— Tính bền vững của nhật ký được tái cấu trúc để lưu tải trọng toàn diện ở bốn giai đoạn đường ống riêng biệt: Yêu cầu của khách hàng, Yêu cầu của nhà cung cấp được dịch, Phản hồi của nhà cung cấp và Phản hồi của khách hàng được dịch. Đã giới thiệu `streamPayloadCollector` để cắt bớt luồng SSE mạnh mẽ và tuần tự hóa tải trọng.### 🐛 Bug Fixes

-**Sửa lỗi giao diện người dùng di động (#659)**— Đã ngăn các thành phần bảng trên trang tổng quan phá vỡ bố cục trên các khung nhìn hẹp bằng cách thêm chức năng cuộn ngang và ngăn tràn thích hợp vào `DashboardLayout`. -**Bản sửa lỗi bộ nhớ đệm Claude Nhắc (#708)**— Các khối `cache_control` được đảm bảo trong vòng lặp dự phòng Claude-to-Claude được bảo tồn một cách trung thực và chuyển trở lại mô hình Anthropic một cách an toàn. -**Định nghĩa công cụ Gemini (#725)**— Đã sửa lỗi dịch lược đồ khi khai báo các loại tham số `đối tượng` đơn giản để gọi hàm Gemini.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Nhà cung cấp dự phòng toàn cầu (#689)**— Khi tất cả các mô hình kết hợp đã hết (502/503), OmniRoute hiện thử mô hình dự phòng toàn cầu có thể định cấu hình trước khi trả về lỗi. Đặt `globalFallbackModel` trong cài đặt để bật.### 🐛 Bug Fixes

-**Fix #721**— Đã sửa lỗi bỏ qua ghim ngữ cảnh trong khi phản hồi lệnh gọi công cụ. Việc gắn thẻ không phát trực tuyến đã sử dụng đường dẫn JSON sai (`json.messages` → `json.choices[0].message`). Giờ đây, tính năng chèn trực tuyến sẽ kích hoạt các đoạn `finish_reason` cho các luồng chỉ gọi công cụ. `injectModelTag()` hiện thêm các thông báo ghim tổng hợp cho nội dung không phải chuỗi. -**Fix #709**— Xác nhận đã sửa (v3.1.9) — `system-info.mjs` tạo các thư mục theo cách đệ quy. Đã đóng cửa. -**Fix #707**— Xác nhận đã sửa (v3.1.9) — dọn dẹp tên công cụ trống trong `chatCore.ts`. Đã đóng cửa.### 🧪 Tests

- Đã thêm 6 bài kiểm tra đơn vị để ghim ngữ cảnh với phản hồi lệnh gọi công cụ (nội dung rỗng, nội dung mảng, khứ hồi, tiêm lại)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Giao diện người dùng quản lý bộ nhớ đệm**— Đã thêm bảng điều khiển bộ nhớ đệm ngữ nghĩa chuyên dụng tại \`/dashboard/cache\` với chức năng vô hiệu hóa API được nhắm mục tiêu và hỗ trợ i18n 31 ngôn ngữ (PR #701 của @oyi77) -**Theo dõi hạn ngạch GLM**— Đã thêm tính năng theo dõi hạn mức phiên và mức sử dụng theo thời gian thực cho nhà cung cấp Mã hóa GLM (Z.AI) (PR #698 của @christopher-s) -**Tải trọng nhật ký chi tiết**— Ghi lại tải trọng đường ống bốn giai đoạn đầy đủ có dây (bản gốc, bản dịch, phản hồi của nhà cung cấp, vùng đồng bằng phát trực tuyến) trực tiếp vào giao diện người dùng (PR #705 của @rdself)### 🐛 Bug Fixes

-**Khắc phục #708**— Ngăn chặn việc chảy mã thông báo cho người dùng Mã Claude định tuyến qua OmniRoute bằng cách bảo toàn chính xác các tiêu đề \`cache_control\` gốc trong quá trình chuyển Claude-to-Claude (PR #708 của @tombii) -**Khắc phục #719**— Thiết lập ranh giới xác thực nội bộ cho \`ModelSyncScheduler\` để ngăn chặn lỗi daemon không được xác thực khi khởi động (PR #719 của @rdself) -**Khắc phục #718**— Hiển thị huy hiệu được xây dựng lại trong Giao diện người dùng Giới hạn nhà cung cấp ngăn chặn sự chồng chéo ranh giới hạn ngạch xấu (PR #718 của @rdself) -**Khắc phục #704**— Đã sửa lỗi phá vỡ Dự phòng kết hợp trên các lỗi chính sách nội dung HTTP 400 ngăn chặn định tuyến chết xoay vòng mô hình (PR #704 của @rdself)### 🔒 Security & Dependencies

- Đã chuyển đổi \`path-to-regexp\` thành \`8.4.0\` giải quyết các lỗ hổng phụ thuộc (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Khắc phục #706**— Đã sửa lỗi hiển thị dự phòng biểu tượng do ghi đè `font-sans` của Tailwind V4 bằng cách áp dụng `!important` cho `.material-symbols-outline`. -**Khắc phục #703**— Đã sửa lỗi luồng GitHub Copilot bị hỏng bằng cách bật dịch định dạng `responses` sang `openai` cho bất kỳ mô hình tùy chỉnh nào tận dụng `apiFormat: "responses"`. -**Khắc phục #702**— Đã thay thế tính năng theo dõi mức sử dụng cố định bằng tính toán giá DB chính xác cho cả phản hồi phát trực tuyến và không phát trực tuyến. -**Fix #716**— Làm sạch trạng thái dịch lệnh gọi công cụ Claude, phân tích cú pháp chính xác các đối số phát trực tuyến và ngăn các đoạn `tool_calls` của OpenAI lặp lại trường `id`.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Schema Coercion**— Tự động ép buộc các ràng buộc Lược đồ JSON số được mã hóa chuỗi (ví dụ: `"tối thiểu": "1"`) thành các loại thích hợp, ngăn chặn 400 lỗi từ Cursor, Cline và các ứng dụng khách khác gửi lược đồ công cụ không đúng định dạng. -**Vệ sinh mô tả công cụ**— Đảm bảo mô tả công cụ luôn ở dạng chuỗi; chuyển đổi mô tả `null`, `không xác định` hoặc số thành chuỗi trống trước khi gửi đến nhà cung cấp. -**Nút Xóa tất cả mô hình**— Đã thêm bản dịch i18n cho hành động của nhà cung cấp "Xóa tất cả mô hình" trên tất cả 30 ngôn ngữ. -**Xuất xác thực Codex**— Đã thêm các nút xuất Codex `auth.json` và áp dụng cục bộ để tích hợp CLI liền mạch. -**Ghi chú về Windsurf BYOK**— Đã thêm các cảnh báo giới hạn chính thức vào thẻ công cụ Windsurf CLI ghi lại các ràng buộc BYOK.### 🐛 Bug Fixes

-**Fix #709**— `system-info.mjs` không còn gặp sự cố khi thư mục đầu ra không tồn tại (đã thêm `mkdirSync` bằng cờ đệ quy). -**Khắc phục #710**— A2A `TaskManager` singleton hiện sử dụng `globalThis` để ngăn rò rỉ trạng thái trên quá trình biên dịch lại tuyến API Next.js ở chế độ nhà phát triển. Bộ thử nghiệm E2E được cập nhật để xử lý 401 một cách linh hoạt. -**Khắc phục #711**— Đã thêm tính năng thực thi giới hạn `max_tokens` dành riêng cho nhà cung cấp cho các yêu cầu ngược dòng. -**Fix #605 / #592**— Loại bỏ tiền tố `proxy_` khỏi tên công cụ trong các phản hồi Claude không phát trực tuyến; URL xác thực LongCat đã sửa. -**Giới hạn tối đa của nhật ký cuộc gọi**— Đã nâng cấp `getMaxCallLogs()` với lớp bộ nhớ đệm, hỗ trợ env var (`CALL_LOGS_MAX`) và tích hợp cài đặt DB.### 🧪 Tests

- Bộ test mở rộng từ 964 → 1027 test (63 test mới)
- Đã thêm `schema-coercion.test.mjs` — 9 bài kiểm tra về ép buộc trường số và làm sạch mô tả công cụ
- Đã thêm `t40-opencode-cli-tools-integration.test.mjs` — Kiểm tra tích hợp OpenCode/Windsurf CLI
- Nhánh kiểm tra tính năng nâng cao với công cụ bao quát toàn diện### 📁 New Files

| Tập tin                                                  | Mục đích                                          |
| -------------------------------------------------------- | ------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Tiện ích dọn dẹp mô tả công cụ và ép buộc lược đồ |
| `tests/unit/schema-coercion.test.mjs`                    | Kiểm tra đơn vị để ép buộc lược đồ                |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | kiểm tra tích hợp công cụ CLI                     |
| `COVERAGE_PLAN.md`                                       | Tài liệu lập kế hoạch bảo hiểm thử nghiệm         | ### 🐛 Bug Fixes |

-**Chuyển qua bộ nhớ đệm nhanh chóng của Claude**— Đã sửa lỗi các điểm đánh dấu cache_control bị xóa trong chế độ chuyển qua Claude (Claude → OmniRoute → Claude), khiến người dùng Mã Claude cạn kiệt hạn ngạch API Anthropic của họ nhanh hơn 5-10 lần so với kết nối trực tiếp. OmniRoute hiện bảo toàn các điểm đánh dấu cache_control của máy khách khi sourceFormat và targetFormat đều là Claude, đảm bảo bộ nhớ đệm nhanh chóng hoạt động chính xác và giảm đáng kể mức tiêu thụ mã thông báo.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Lõi nền tảng:**Đã triển khai xử lý trạng thái toàn cầu cho các Mô hình & Combo ẩn, ngăn chúng làm lộn xộn danh mục hoặc rò rỉ vào các tác nhân MCP được kết nối (#681). -**Tính ổn định:**Đã vá các sự cố phát trực tuyến liên quan đến việc tích hợp nhà cung cấp AntiGravity gốc không thành công do mảng trạng thái không xác định chưa được xử lý (#684). -**Đồng bộ hóa bản địa hóa:**Đã triển khai bộ đồng bộ hóa `i18n` được đại tu hoàn toàn để phát hiện các thuộc tính JSON lồng nhau bị thiếu và điều chỉnh tuần tự 30 ngôn ngữ cổ điển (#685).## [3.1.7] - 27-03-2026### 🐛 Bug Fixes

-**Độ ổn định khi phát trực tuyến:**Đã sửa lỗi `hasValuableContent` trả về `không xác định` cho các đoạn trống trong luồng SSE (#676). -**Gọi công cụ:**Đã khắc phục sự cố trong `sseParser.ts` trong đó các phản hồi Claude không phát trực tuyến với nhiều lệnh gọi công cụ đã loại bỏ `id` của các lệnh gọi công cụ tiếp theo do trùng lặp dựa trên chỉ mục không chính xác (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Khôi phục tên công cụ gốc của Claude**— Các tên công cụ như `TodoWrite` không còn có tiền tố `proxy_` trong các phản hồi chuyển qua Claude (cả phát trực tuyến và không phát trực tuyến). Bao gồm phạm vi kiểm tra đơn vị (PR #663 của @coobabm) -**Xóa tất cả các bí danh của mô hình**- Nút "Xóa tất cả các mô hình" giờ đây cũng xóa các bí danh mô hình được liên kết, ngăn chặn các mô hình ma trong giao diện người dùng (PR #664 của @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Tự động phân rã Backoff**— Các tài khoản bị giới hạn tỷ lệ hiện tự động phục hồi khi hết thời gian hồi chiêu, khắc phục tình trạng bế tắc trong đó các tài khoản có `backoffLevel` cao bị mất ưu tiên vĩnh viễn (PR #657 của @brendandebeasi)### 🌍 i18n

-**Kiểm tra lại bản dịch tiếng Trung**— Viết lại toàn diện `zh-CN.json` với độ chính xác được cải thiện (PR #658 bởi @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Sửa lỗi ghi đè phát trực tuyến**— `stream: true` rõ ràng trong nội dung yêu cầu hiện được ưu tiên hơn tiêu đề `Accept: application/json`. Khách hàng gửi cả hai sẽ nhận được phản hồi phát trực tuyến SSE một cách chính xác (#656)### 🌍 i18n

-**Cải tiến chuỗi tiếng Séc**— Thuật ngữ được tinh chỉnh trên `cs.json` (PR #655 của @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 phím dịch bị thiếu**được thêm vào `en.json` và 12 ngôn ngữ (PR #652 của @zen0bit) -**Đã cập nhật tài liệu tiếng Séc**— Hướng dẫn CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT (PR #652) -**Tập lệnh xác thực bản dịch**— `check_translations.py` và `validate_translation.py` cho CI/QA (PR #651 của @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Quan trọng: Hồi quy lệnh gọi công cụ**— Đã sửa lỗi `proxy_Bash` bằng cách vô hiệu hóa tiền tố tên công cụ `proxy_` trong đường dẫn chuyển qua Claude. Các công cụ như `Bash`, `Read`, `Write` bị đổi tên thành `proxy_Bash`, `proxy_Read`, v.v., khiến Claude từ chối chúng (#618) -**Tài liệu cấm tài khoản Kiro**— Được ghi nhận là dương tính giả chống gian lận AWS ngược tuyến, không phải vấn đề OmniRoute (#649)### 🧪 Tests

-**936 lần kiểm tra, 0 lần thất bại**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Siêu dữ liệu về khả năng thị giác**: Đã thêm `capabilities.vision`, `input_modalities` và `output_modalities` vào các mục nhập `/v1/models` cho các mô hình có khả năng thị giác (PR #646) -**Mô hình Gemini 3.1**: Đã thêm `gemini-3.1-pro-preview` và `gemini-3.1-flash-lite-preview` vào nhà cung cấp Anti Gravity (#645)### 🐛 Bug Fixes

-**Lỗi Ollama Cloud 401**: Đã sửa lỗi URL cơ sở API không chính xác — đã thay đổi từ `api.ollama.com` thành `ollama.com/v1/chat/completions` chính thức (#643) -**Thử lại mã thông báo đã hết hạn**: Đã thêm thử lại có giới hạn với thời gian chờ theo cấp số nhân (5→10→20 phút) cho các kết nối OAuth đã hết hạn thay vì bỏ qua chúng vĩnh viễn (PR #647)### 🧪 Tests

-**936 lần kiểm tra, 0 lần thất bại**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**Mẫu sự cố GitHub**: Đã thêm báo cáo lỗi được tiêu chuẩn hóa, yêu cầu tính năng và mẫu sự cố cấu hình/proxy (#641) -**Xóa tất cả kiểu máy**: Đã thêm nút "Xóa tất cả kiểu máy" vào trang chi tiết nhà cung cấp với hỗ trợ i18n bằng 29 ngôn ngữ (#634)### 🐛 Bug Fixes

-**Xung đột ngôn ngữ (`in.json`)**: Đã đổi tên tệp ngôn ngữ Hindi từ `in.json` (mã ISO tiếng Indonesia) thành `hi.json` để khắc phục xung đột dịch thuật trong Weblate (#642) -**Tên công cụ trống Codex**: Đã di chuyển quá trình dọn dẹp tên công cụ trước khi chuyển qua Codex gốc, sửa 400 lỗi từ các nhà cung cấp ngược dòng khi công cụ có tên trống (#637) -**Truyền phát các tạo phẩm dòng mới**: Đã thêm `collapseExcessiveNewlines` vào trình khử trùng phản hồi, thu gọn các lần chạy hơn 3 dòng mới liên tiếp từ các mô hình tư duy thành một dòng mới kép tiêu chuẩn (#638) -**Nỗ lực lý luận của Claude**: Đã chuyển đổi thông số `reasoning_effort` của OpenAI thành khối ngân sách `tư duy` gốc của Claude trên tất cả các đường dẫn yêu cầu, bao gồm cả điều chỉnh `max_tokens` tự động (#627) -**Làm mới mã thông báo Qwen**: Đã triển khai chủ động làm mới mã thông báo OAuth trước khi hết hạn (bộ đệm 5 phút) để ngăn yêu cầu không thành công khi sử dụng mã thông báo tồn tại trong thời gian ngắn (#631)### 🧪 Tests

-**936 bài kiểm tra, 0 lần thất bại**(+10 bài kiểm tra kể từ phiên bản 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**Mã thông báo NaN trong Mã Claude / phản hồi của khách hàng (#617):**

- `sanitizeUsage()` giờ đây liên kết chéo `input_tokens`→`prompt_tokens` và `output_tokens`→`completion_tokens` trước bộ lọc danh sách trắng, sửa các phản hồi hiển thị số lượng mã thông báo NaN/0 khi nhà cung cấp trả về tên trường sử dụng kiểu Claude### Bảo mật

- Cập nhật gói `yaml` để khắc phục lỗ hổng tràn ngăn xếp (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Đã đóng #613 (Codestral — được giải quyết bằng cách giải quyết của Nhà cung cấp Tùy chỉnh)
- Đã nhận xét về #615 (Điểm cuối kép OpenCode - cung cấp giải pháp thay thế, được theo dõi dưới dạng yêu cầu tính năng)
- Đã nhận xét về #618 (khả năng hiển thị cuộc gọi công cụ - yêu cầu kiểm tra v3.0.9)
- Đã nhận xét về #627 (mức nỗ lực - đã được hỗ trợ)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Lỗi dịch đối với các nhà cung cấp định dạng OpenAI trong Claude CLI (#632):**

- Xử lý định dạng mảng `reasoning_details[]` từ StepFun/OpenRouter — chuyển đổi thành `reasoning_content`
- Xử lý bí danh trường `reasoning` từ một số nhà cung cấp → chuẩn hóa thành `reasoning_content`
- Tên trường sử dụng trên nhiều bản đồ: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` in `filterUsageForFormat`
- Sửa `extractUsage` để chấp nhận cả `input_tokens`/`output_tokens` và `prompt_tokens`/`completion_tokens` làm trường sử dụng hợp lệ
- Áp dụng cho cả đường dẫn phát trực tuyến (`sanitizeStreamingChunk`, `openai-to-claude.ts`) và không phát trực tuyến (`sanitizeMessage`)---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Làm mới mã thông báo chống trọng lực:**Đã sửa lỗi `client_secret bị thiếu` đối với người dùng đã cài đặt npm — `clientSecretDefault` trống trong ProviderRegistry, khiến Google từ chối yêu cầu làm mới mã thông báo (#588) -**Mô hình OpenCode Zen:**Đã thêm `modelsUrl` vào mục đăng ký OpenCode Zen để "Nhập từ /models" hoạt động chính xác (#612) -**Tạo tác trực tuyến:**Đã sửa lỗi quá nhiều dòng mới còn sót lại trong phản hồi sau khi xóa chữ ký thẻ suy nghĩ (#626) -**Dự phòng proxy:**Đã thêm tính năng thử lại tự động mà không cần proxy khi chuyển tiếp SOCKS5 không thành công -**Kiểm tra proxy:**Điểm cuối kiểm tra hiện phân giải thông tin xác thực thực từ DB thông qua proxyId### ✨ New Features

-**Tài khoản Playground/Bộ chọn khóa:**Trình đơn thả xuống liên tục, luôn hiển thị để chọn tài khoản/khóa nhà cung cấp cụ thể để thử nghiệm — tìm nạp tất cả kết nối khi khởi động và lọc theo nhà cung cấp đã chọn -**Mô hình động của Công cụ CLI:**Lựa chọn mô hình giờ đây được tìm nạp động từ API `/v1/models` — các nhà cung cấp như Kiro hiện hiển thị danh mục mô hình đầy đủ của họ -**Danh sách mẫu phản trọng lực:**Đã cập nhật với Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; đã bật `passthroughModels` để truy cập mô hình động (#628)### 🔧 Maintenance

- Đã hợp nhất PR #625 — Nhà cung cấp giới hạn sửa lỗi nền chế độ ánh sáng---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Giới hạn/Proxy:**Đã sửa lỗi tìm nạp giới hạn Codex cho các tài khoản đằng sau proxy SOCKS5 — làm mới mã thông báo hiện chạy bên trong ngữ cảnh proxy -**CI:**Đã sửa lỗi xác nhận `v1/models` kiểm tra tích hợp trong môi trường CI không có kết nối với nhà cung cấp -**Cài đặt:**Nút kiểm tra proxy hiện hiển thị kết quả thành công/thất bại ngay lập tức (trước đây bị ẩn sau dữ liệu sức khỏe)### ✨ New Features

-**Sân chơi:**Đã thêm trình đơn thả xuống của bộ chọn Tài khoản — kiểm tra từng kết nối cụ thể khi nhà cung cấp có nhiều tài khoản### 🔧 Maintenance

- Đã hợp nhất PR #623 — Chỉnh sửa đường dẫn URL cơ sở API LongCat---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Giới hạn giao diện người dùng:**Đã thêm tính năng nhóm thẻ vào bảng điều khiển kết nối để cải thiện cách tổ chức trực quan cho các tài khoản có thẻ tùy chỉnh.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Truyền phát:**Đã sửa lỗi hỏng trạng thái `TextDecoding` bên trong combo `sanitize` TransformStream khiến đầu ra SSE bị cắt xén khớp với các ký tự nhiều byte (PR #614) -**Giao diện người dùng của nhà cung cấp:**Hiển thị an toàn các thẻ HTML bên trong chú giải công cụ lỗi kết nối của nhà cung cấp bằng cách sử dụng `nguy hiểmSetInnerHTML` -**Cài đặt proxy:**Đã thêm các thuộc tính nội dung tải trọng `tên người dùng` và `mật khẩu` bị thiếu cho phép xác thực thành công các proxy đã xác thực từ Trang tổng quan. -**API nhà cung cấp:**Ngoại lệ mềm bị ràng buộc quay trở lại `getCodexUsage` ngăn ngừa lỗi API HTTP 500 khi tìm nạp mã thông báo không thành công---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Mô hình tự động đồng bộ hóa:**Đã thêm chuyển đổi giao diện người dùng và điểm cuối `mô hình đồng bộ hóa` để tự động đồng bộ hóa danh sách mô hình cho mỗi nhà cung cấp bằng cách sử dụng bộ lập lịch theo khoảng thời gian đã lên lịch (PR #597)### 🐛 Bug Fixes

-**Hết thời gian chờ:**Đã nâng proxy mặc định `FETCH_TIMEOUT_MS` và `STREAM_IDLE_TIMEOUT_MS` lên 10 phút để hỗ trợ chính xác các mô hình lý luận sâu (như o1) mà không hủy bỏ yêu cầu (Bản sửa lỗi #609) -**Phát hiện công cụ CLI:**Cải thiện khả năng xử lý phát hiện đa nền tảng với đường dẫn NVM, Windows `PATHEXT` (ngăn chặn sự cố trình bao bọc `.cmd`) và tiền tố NPM tùy chỉnh (PR #598) -**Nhật ký phát trực tuyến:**Đã triển khai tích lũy delta `tool_calls` trong nhật ký phản hồi phát trực tuyến để các lệnh gọi hàm được theo dõi và duy trì chính xác trong DB (PR #603) -**Danh mục mô hình:**Đã xóa tính năng miễn trừ xác thực, ẩn chính xác các mô hình `comfyui` và `sdwebui` khi không có nhà cung cấp nào được định cấu hình rõ ràng (PR #599)### 🌐 Translations

-**cs:**Cải thiện chuỗi dịch tiếng Séc trên ứng dụng (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Đã thêm trường Thẻ/Nhóm vào `EditConnectionModal` (được lưu trữ trong `providerSpecificData.tag`) mà không yêu cầu di chuyển lược đồ DB.
- Các kết nối trong chế độ xem nhà cung cấp giờ đây được nhóm động theo thẻ với các dải phân cách trực quan.
- Các kết nối không được gắn thẻ xuất hiện đầu tiên mà không có tiêu đề, tiếp theo là các nhóm được gắn thẻ theo thứ tự bảng chữ cái.
- Nhóm thẻ tự động áp dụng cho phần Codex/Copilot/Giới hạn phản trọng lực do các nút chuyển đổi tồn tại bên trong các hàng kết nối.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Thiếu huy hiệu trên thẻ kết nối:**Đã sửa lỗi bằng cách sử dụng `resolveProxyForConnection()` thay vì ánh xạ tĩnh. -**Kiểm tra kết nối bị tắt ở chế độ đã lưu:**Đã bật nút Kiểm tra bằng cách phân giải cấu hình proxy từ danh sách đã lưu. -**Cấu hình Đóng băng phương thức:**Đã thêm lệnh gọi `onClose()` sau khi lưu/xóa để ngăn giao diện người dùng bị đóng băng. -**Tính mức sử dụng gấp đôi:**`ProxyRegistryManager` hiện tải mức sử dụng một cách háo hức khi gắn kết với tính năng loại bỏ trùng lặp theo `scope` + `scopeId`. Số lượng sử dụng đã được thay thế bằng nút Kiểm tra hiển thị nội tuyến IP/độ trễ.#### fix(translator): `function_call` prefix stripping

- Đã sửa bản sửa lỗi chưa hoàn chỉnh từ PR #607 trong đó chỉ các khối `tool_use` đã loại bỏ tiền tố công cụ `proxy_` của Claude. Giờ đây, các máy khách sử dụng định dạng API Phản hồi OpenAI cũng sẽ nhận được chính xác các công cụ công cụ mà không cần tiền tố `proxy_`.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Ba lỗi hồi quy quan trọng được người dùng báo cáo sau khi ra mắt phiên bản v3.0.0 đã được giải quyết.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Tiền tố `proxy_` do Claude OAuth thêm vào chỉ bị loại bỏ khỏi các phản hồi**phát trực tuyến**. Ở chế độ**không phát trực tuyến**, `translateNonStreamingResponse` không có quyền truy cập vào `toolNameMap`, khiến ứng dụng khách nhận được tên công cụ bị đọc sai như `proxy_read_file` thay vì `read_file`.

**Khắc phục:**Đã thêm tham số `toolNameMap` tùy chọn vào `translateNonStreamingResponse` và áp dụng tính năng loại bỏ tiền tố trong trình xử lý khối Claude `tool_use`. `chatCore.ts` hiện đã chuyển bản đồ qua.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI không hiển thị `GET /v1/models`. Trình xác thực `validateOpenAICompatibleProvider` chung chỉ chuyển sang dự phòng hoàn thành cuộc trò chuyện nếu `validationModelId` được đặt mà LongCat không định cấu hình. Điều này khiến việc xác thực nhà cung cấp không thành công kèm theo lỗi sai khi thêm/lưu.

**Khắc phục:**Đã thêm `longcat` vào bản đồ trình xác thực đặc biệt, thăm dò trực tiếp `/chat/completions` và coi mọi phản hồi không xác thực là đã vượt qua.#### fix(translator): normalize object tool schemas for Anthropic (#595)

Các công cụ MCP (ví dụ: `pencil`, `computer_use`) chuyển tiếp các định nghĩa công cụ có `{type:"object"}` nhưng không có trường `properties`. API của Anthropic từ chối những thứ này bằng: `thuộc tính thiếu lược đồ đối tượng`.

**Khắc phục:**Trong `openai-to-claude.ts`, thêm `properties: {}` làm mặc định an toàn khi `type` là `"object"` và `properties` không có.---

### 🔀 Community PRs Merged (2)

| PR       | Tác giả | Tóm tắt                                                                                        |
| -------- | ------- | ---------------------------------------------------------------------------------------------- | --- |
| **#589** | @flobo3 | docs(i18n): sửa bản dịch tiếng Nga cho Playground và Testbed                                   |
| **#591** | @rdself | fix(ui): cải thiện độ tương phản của chế độ ánh sáng Giới hạn nhà cung cấp và hiển thị cấp gói | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 lần kiểm tra, 0 lần thất bại**(không thay đổi so với v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Bản phát hành lớn nhất từ ​​trước đến nay.**Từ 36 nhà cung cấp trong phiên bản 2.9.5 đến**67+ nhà cung cấp**trong phiên bản 3.0.0 — với Máy chủ MCP, Giao thức A2A, công cụ tự động kết hợp, Biểu tượng nhà cung cấp, API khóa đã đăng ký, 926 bài kiểm tra và đóng góp từ**12 thành viên cộng đồng**trên**10 PR đã hợp nhất**.
>
> Hợp nhất từ v3.0.0-rc.1 đến RC.17 (17 ứng cử viên phát hành trong 3 ngày phát triển mạnh mẽ).---

### 🆕 New Providers (+31 since v2.9.5)

| Provider                           | Bí danh             | Bậc         | Ghi chú                                                                                           |
| ---------------------------------- | ------------------- | ----------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mã mở Zen**                      | `opencode-zen`      | Miễn phí    | 3 mô hình qua `opencode.ai/zen/v1` (PR #530 của @kang-heewon)                                     |
| **Mã mở đi**                       | `opencode-go`       | Đã trả tiền | 4 mô hình qua `opencode.ai/zen/go/v1` (PR #530 của @kang-heewon)                                  |
| **LongCat AI**                     | `lc`                | Miễn phí    | 50 triệu token/ngày (Flash-Lite) + 500K/ngày (Trò chuyện/Suy nghĩ) trong phiên bản beta công khai |
| **Thụ phấn AI**                    | `pol`               | Miễn phí    | Không cần khóa API — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s)                      |
| **Công nhân Cloudflare AI**        | `cf`                | Miễn phí    | 10K nơ-ron/ngày - ~150 phản hồi LLM hoặc 500 giây Âm thanh thì thầm, suy luận biên                |
| **Quy mô AI**                      | `scw`               | Miễn phí    | 1 triệu token miễn phí cho tài khoản mới — tuân thủ EU/GDPR (Paris)                               |
| **API AI/ML**                      | `aiml`              | Miễn phí    | Tín dụng miễn phí 0,025 USD/ngày — Hơn 200 mô hình thông qua một điểm cuối duy nhất               |
| **Puter AI**                       | `pu`                | Miễn phí    | Hơn 500 mẫu (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                             |
| **Đám mây Alibaba (DashScope)**    | `ali`               | Đã trả tiền | Điểm cuối quốc tế + Trung Quốc thông qua `alicode`/`alicode-intl`                                 |
| **Kế hoạch mã hóa Alibaba**        | `bcp`               | Đã trả tiền | Alibaba Model Studio với API tương thích với con người                                            |
| **Mã hóa Kimi (Khóa API)**         | `kmca`              | Đã trả tiền | Truy cập Kimi dựa trên khóa API chuyên dụng (tách biệt với OAuth)                                 |
| **Mã hóa MiniMax**                 | `minimax`           | Đã trả tiền | Điểm cuối quốc tế                                                                                 |
| **MiniMax (Trung Quốc)**           | `minimax-cn`        | Đã trả tiền | Điểm cuối dành riêng cho Trung Quốc                                                               |
| **Z.AI (GLM-5)**                   | `zai`               | Đã trả tiền | Các mẫu GLM thế hệ tiếp theo của Zhipu AI                                                         |
| **Vertex AI**                      | `đỉnh`              | Đã trả tiền | Google Cloud — Tài khoản dịch vụ JSON hoặc OAuth access_token                                     |
| **Đám mây Olama**                  | `ollamacloud`       | Đã trả tiền | Dịch vụ API được lưu trữ của Ollama                                                               |
| **Synthetic**                      | `tổng hợp`          | Đã trả tiền | Cổng mô hình truyền qua                                                                           |
| **Cổng Kilo**                      | `kg`                | Đã trả tiền | Cổng mô hình truyền qua                                                                           |
| **Tìm kiếm bối rối**               | `pplx-tìm kiếm`     | Đã trả tiền | Điểm cuối dựa trên tìm kiếm chuyên dụng                                                           |
| **Tìm kiếm Serper**                | `serper-tìm kiếm`   | Đã trả tiền | Tích hợp API tìm kiếm trên web                                                                    |
| **Tìm kiếm dũng cảm**              | `tìm kiếm dũng cảm` | Đã trả tiền | Tích hợp API tìm kiếm dũng cảm                                                                    |
| **Tìm kiếm Exa**                   | `tìm kiếm exa`      | Đã trả tiền | Tích hợp API tìm kiếm thần kinh                                                                   |
| **Tìm kiếm Tavily**                | `tavily-tìm kiếm`   | Đã trả tiền | Tích hợp API tìm kiếm AI                                                                          |
| **NanoBanana**                     | `nb`                | Đã trả tiền | API tạo hình ảnh                                                                                  |
| **ElevenLabs**                     | `el`                | Đã trả tiền | Tổng hợp giọng nói chuyển văn bản thành giọng nói                                                 |
| **Cartesia**                       | `cartesia`          | Đã trả tiền | Tổng hợp giọng nói TTS cực nhanh                                                                  |
| **ChơiHT**                         | `chơi`              | Đã trả tiền | Nhân bản giọng nói và TTS                                                                         |
| **Thế giới trong**                 | `trong thế giới`    | Đã trả tiền | Trò chuyện bằng giọng nói nhân vật AI                                                             |
| **SD WebUI**                       | `sdwebui`           | Tự lưu trữ  | Tạo hình ảnh cục bộ khuếch tán ổn định                                                            |
| **Giao diện người dùng thoải mái** | `thoải mái`         | Tự lưu trữ  | Tạo dựa trên nút quy trình làm việc cục bộ của ComfyUI                                            |
| **Mã hóa GLM**                     | `glm`               | Đã trả tiền | Điểm cuối dành riêng cho mã hóa BigModel/Zhipu                                                    | **Tổng cộng: hơn 67 nhà cung cấp**(4 miễn phí, 8 OAuth, 55 khóa API) + nhà cung cấp tùy chỉnh OpenAI/Anthropic-Compatible không giới hạn.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Tự động tạo và cấp khóa API OmniRoute theo chương trình với việc thực thi hạn ngạch cho mỗi nhà cung cấp và mỗi tài khoản.

| Điểm cuối                       | Phương pháp | Mô tả                                                 |
| ------------------------------- | ----------- | ----------------------------------------------------- |
| `/api/v1/khóa đã đăng ký`       | `ĐĂNG`      | Cấp khóa mới — khóa thô được trả về**chỉ một lần**    |
| `/api/v1/khóa đã đăng ký`       | `NHẬN`      | Liệt kê các khóa đã đăng ký (bị che)                  |
| `/api/v1/registered-keys/{id}`  | `NHẬN/XÓA`  | Nhận siêu dữ liệu / Thu hồi                           |
| `/api/v1/quotas/check`          | `NHẬN`      | Xác thực trước hạn ngạch trước khi phát hành          |
| `/api/v1/providers/{id}/limits` | `NHẬN/PUT`  | Định cấu hình giới hạn phát hành cho mỗi nhà cung cấp |
| `/api/v1/accounts/{id}/limits`  | `NHẬN/PUT`  | Định cấu hình giới hạn phát hành cho mỗi tài khoản    |
| `/api/v1/issues/báo cáo`        | `ĐĂNG`      | Báo cáo các sự kiện hạn ngạch cho Vấn đề GitHub       |

**Bảo mật:**Khóa được lưu trữ dưới dạng hàm băm SHA-256. Khóa thô được hiển thị một lần khi tạo và không bao giờ có thể truy xuất lại được.#### 🎨 Provider Icons via @lobehub/icons (#529)

Hơn 130 logo nhà cung cấp sử dụng các thành phần React `@lobehub/icons` (SVG). Chuỗi dự phòng:**Lobehub SVG → PNG hiện có → biểu tượng chung**. Được áp dụng trên các trang Bảng điều khiển, Nhà cung cấp và Đại lý với thành phần `ProviderIcon` được tiêu chuẩn hóa.#### 🔄 Model Auto-Sync Scheduler (#488)

Tự động làm mới danh sách mô hình cho các nhà cung cấp được kết nối**24 giờ**. Chạy khi khởi động máy chủ. Có thể định cấu hình thông qua `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Ánh xạ các mẫu tên mẫu (toàn cầu) thành các tổ hợp cụ thể để định tuyến tự động:

- `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Bảng `model_combo_mappings` mới có tính năng khớp toàn cục với biểu thức chính quy
- Phần giao diện người dùng bảng điều khiển: "Quy tắc định tuyến mô hình" với tính năng thêm/chỉnh sửa/chuyển đổi/xóa nội tuyến#### 🧭 API Endpoints Dashboard

Danh mục tương tác, quản lý webhook, trình xem OpenAPI — tất cả đều có trong một trang dạng thẻ tại `/dashboard/endpoint`.#### 🔍 Web Search Providers

5 tích hợp mới của nhà cung cấp dịch vụ tìm kiếm:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**— cho phép phản hồi AI căn cứ với dữ liệu web theo thời gian thực.#### 📊 Search Analytics

Tab mới trong `/dashboard/analytics` — phân tích nhà cung cấp, tỷ lệ truy cập bộ đệm, theo dõi chi phí. API: `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Các cột `max_requests_per_day` và `max_requests_per_ Minute` có tính năng thực thi cửa sổ trượt trong bộ nhớ trả về HTTP 429.#### 🎵 Media Playground

Sân chơi tạo đa phương tiện đầy đủ tại `/dashboard/media`: Tạo hình ảnh, Video, Âm nhạc, Phiên âm âm thanh (giới hạn tải lên 2GB) và Chuyển văn bản thành giọng nói.---

### 🔒 Security & CI/CD

-**Khắc phục CodeQL**— Đã sửa hơn 10 cảnh báo: 6 lần lặp lại đa thức, 1 lần ngẫu nhiên không an toàn (`Math.random()` → `crypto.randomUUID()`), 1 lần tiêm lệnh shell -**Xác thực tuyến đường**— Lược đồ Zod + `validateBody()` trên**176/176 tuyến đường API**— CI được thực thi -**Sửa lỗi CVE**— thống trị lỗ hổng XSS (GHSA-v2wj-7wpq-c8vv) được giải quyết thông qua ghi đè npm -**Flatted**— Bumped 3.3.3 → 3.4.2 (ô nhiễm nguyên mẫu CWE-1321) -**Docker**— Đã nâng cấp `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: xóa lỗi có thể xử lý khi thiếu `GEMINI_OAUTH_CLIENT_SECRET` trong Docker -**#549**— Các tuyến cài đặt CLI hiện phân giải khóa API thực từ `keyId` (không phải chuỗi bị che) -**#574**— Đăng nhập không còn bị treo sau khi bỏ qua thiết lập mật khẩu thuật sĩ -**#506**— Viết lại `machineId` đa nền tảng (Windows REG.exe → macOS ioreg → Linux → dự phòng tên máy chủ)#### Providers & Routing

-**#536**— LongCat AI: đã sửa `baseUrl` và `authHeader` -**#535**— Ghi đè mô hình đã ghim: `body.model` được đặt chính xác thành `pinnedModel` -**#570**— Các mô hình Claude chưa được sửa đổi hiện được phân giải thành nhà cung cấp Anthropic -**#585**— Các thẻ nội bộ `<omniModel>` không còn bị rò rỉ tới máy khách trong quá trình phát trực tuyến SSE -**#493**— Việc đặt tên mô hình nhà cung cấp tùy chỉnh không còn bị sai lệch do tước bỏ tiền tố -**#490**— Phát trực tuyến + bảo vệ bộ đệm ngữ cảnh thông qua tính năng chèn `TransformStream` -**#511**— Thẻ `<omniModel>` được chèn vào đoạn nội dung đầu tiên (không phải sau `[DONE]`)#### CLI & Tools

-**#527**— Vòng lặp Claude Code + Codex: các khối `tool_result` hiện được chuyển đổi thành văn bản -**#524**— Cấu hình OpenCode được lưu chính xác (XDG_CONFIG_HOME, định dạng TOML) -**#522**— Trình quản lý API: đã xóa nút "Sao chép khóa bị che" gây hiểu lầm -**#546**— `--version` trả về `unknown` trên Windows (PR by @k0valik) -**#544**— Phát hiện công cụ CLI an toàn thông qua các đường dẫn cài đặt đã biết (PR by @k0valik) -**#510**— Đường dẫn Windows MSYS2/Git-Bash được chuẩn hóa tự động -**#492**— CLI phát hiện Nút do `mise`/`nvm` quản lý khi thiếu `app/server.js`#### Streaming & SSE

-**PR #587**— Hoàn nguyên việc nhập `resolveDataDir` trongresponseTransformer dành cho Cloudflare Workers tương thích (@k0valik) -**PR #495**— Nút cổ chai 429 chờ vô hạn: bỏ các công việc đang chờ ở giới hạn tốc độ (@xandr0s) -**#483**— Dừng theo dõi `data: null` sau tín hiệu `[DONE]` -**#473**— Luồng Zombie SSE: thời gian chờ giảm 300 giây → 120 giây để dự phòng nhanh hơn#### Media & Transcription

-**Phiên âm**— Deepgram `video/mp4` → `audio/mp4` Ánh xạ MIME, tự động phát hiện ngôn ngữ, dấu câu -**TTS**— `[object Object]` error display fixed for ElevenLabs-style nested errors -**Giới hạn tải lên**— Phiên âm phương tiện đã tăng lên 2GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— cột `requested_model` trong nhật ký cuộc gọi (migration 009) -**T02**— Loại bỏ các khối văn bản trống khỏi `tool_result.content` lồng nhau -**T03**— Phân tích các tiêu đề hạn ngạch `x-codex-5h-*` / `x-codex-7d-*` -**T04**— Tiêu đề `X-Session-Id` để định tuyến cố định bên ngoài -**T05**— Khả năng duy trì DB có giới hạn tốc độ với API chuyên dụng -**T06**— Tài khoản bị vô hiệu hóa → bị chặn vĩnh viễn (thời gian hồi chiêu là 1 năm) -**T07**— Xác thực X-Forwarded-For IP (`extractClientIp()`) -**T08**— Giới hạn phiên trên mỗi khóa API với việc thực thi cửa sổ trượt -**T09**— Phạm vi giới hạn tốc độ Codex và Spark (nhóm riêng biệt) -**T10**— Tín dụng đã cạn kiệt → dự phòng thời gian hồi chiêu 1 giờ rõ ràng -**T11**— `max` nỗ lực lý luận → 131072 mã thông báo ngân sách -**T12**— Mục định giá MiniMax M2.7 -**T13**— Sửa lỗi hiển thị hạn ngạch cũ (đặt lại nhận thức về cửa sổ) -**T14**— Kiểm tra TCP bị lỗi nhanh của proxy (dưới 2 giây, được lưu trong bộ nhớ đệm 30 giây) -**T15**— Chuẩn hóa nội dung mảng cho Anthropic -**T23**— Dự phòng đặt lại hạn ngạch thông minh (trích xuất tiêu đề) -**T24**— thời gian hồi chiêu `503` + ánh xạ `406` -**T25**— Dự phòng xác thực nhà cung cấp -**T29**— Tài khoản dịch vụ Vertex AI Xác thực JWT -**T33**— Cấp độ tư duy để chuyển đổi ngân sách -**T36**— Phân loại lỗi `403` so với `429` -**T38**— Thông số kỹ thuật mô hình tập trung (`modelSpecs.ts`) -**T39**— Dự phòng điểm cuối cho `fetchAvailableModels` -**T41**— Tự động chuyển hướng tác vụ nền sang các kiểu máy flash -**T42**— Ánh xạ tỷ lệ khung hình tạo hình ảnh#### Other Improvements

-**Tiêu đề tùy chỉnh ngược dòng trên mỗi mô hình**— thông qua giao diện người dùng cấu hình (PR #575 của @zhangqiang8vip) -**Độ dài ngữ cảnh của mô hình**— có thể định cấu hình trong siêu dữ liệu mô hình (PR #578 của @hijak) -**Tước bỏ tiền tố mô hình**— tùy chọn xóa tiền tố nhà cung cấp khỏi tên mô hình (PR #582 của @jay77721) -**Không dùng Gemini CLI**— được đánh dấu là không dùng nữa với cảnh báo hạn chế OAuth của Google -**Trình phân tích cú pháp YAML**— đã thay thế trình phân tích cú pháp tùy chỉnh bằng `js-yaml` để phân tích cú pháp thông số OpenAPI chính xác -**ZWS v5**— Sửa lỗi rò rỉ HMR (485 kết nối DB → 1, bộ nhớ 2,4GB → 195 MB) -**Xuất nhật ký**— Nút xuất JSON mới trên trang tổng quan với danh sách thả xuống phạm vi thời gian -**Biểu ngữ thông báo cập nhật**— trang chủ bảng điều khiển hiển thị khi có phiên bản mới---

### 🌐 i18n & Documentation

-**30 ngôn ngữ**ở mức chẵn lẻ 100% — đã đồng bộ hóa 2.788 khóa bị thiếu -**Tiếng Séc**— Bản dịch đầy đủ: 22 tài liệu, 2.606 chuỗi giao diện người dùng (PR by @zen0bit) -**Tiếng Trung (zh-CN)**— Bản dịch lại hoàn chỉnh (PR by @only4copilot) -**Hướng dẫn triển khai VM**— Được dịch sang tiếng Anh dưới dạng tài liệu nguồn -**Tham khảo API**— Đã thêm điểm cuối `/v1/embeddings` và `/v1/audio/speech` -**Số lượng nhà cung cấp**— Đã cập nhật từ 36+/40+/44+ thành**67+**trên README và tất cả 30 i18n README---

### 🔀 Community PRs Merged (10)

| PR       | Tác giả         | Tóm tắt                                                                               |
| -------- | --------------- | ------------------------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): hoàn nguyên việc nhập ResolveDataDir cho tương thích Cloudflare Workers     |
| **#582** | @jay77721       | feat(proxy): tùy chọn tước bỏ tiền tố tên mẫu                                         |
| **#581** | @jay77721       | fix(npm): liên kết phát hành điện tử với quy trình công việc xuất bản npm             |
| **#578** | @hijak          | kỳ tích: độ dài ngữ cảnh có thể định cấu hình trong siêu dữ liệu mô hình              |
| **#575** | @zhangqiang8vip | kỳ tích: tiêu đề ngược dòng trên mỗi mô hình, PATCH tương thích, căn chỉnh trò chuyện |
| **#562** | @coobabm        | sửa lỗi: Quản lý phiên MCP, chuyển tiếp Claude, detectFormat                          |
| **#561** | @zen0bit        | fix(i18n): Sửa bản dịch tiếng Séc                                                     |
| **#555** | @k0valik        | fix(sse): `resolveDataDir()` tập trung để phân giải đường dẫn                         |
| **#546** | @k0valik        | fix(cli): `--version` trả về `unknown` trên Windows                                   |
| **#544** | @k0valik        | fix(cli): phát hiện công cụ CLI an toàn thông qua đường dẫn cài đặt                   |
| **#542** | @rdself         | fix(ui): các biến chủ đề CSS tương phản chế độ ánh sáng                               |
| **#530** | @kang-heewon    | kỳ tích: Nhà cung cấp OpenCode Zen + Go với `OpencodeExecutor`                        |
| **#512** | @zhangqiang8vip | kỳ công: khả năng tương thích mô hình trên mỗi giao thức (`compatByProtocol`)         |
| **#497** | @zhangqiang8vip | sửa lỗi: rò rỉ tài nguyên HMR ở chế độ dev (ZWS v5)                                   |
| **#495** | @xandr0s        | sửa lỗi: Nút cổ chai 429 chờ vô hạn (bỏ công việc chờ)                                |
| **#494** | @zhangqiang8vip | kỳ công: Nhà phát triển MiniMax→sửa lỗi vai trò hệ thống                              |
| **#480** | @prakersh       | sửa lỗi: trích xuất sử dụng luồng tuôn ra                                             |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 và các mục định giá của Anthropic                                 |
| **#475** | @only4copilot   | feat(i18n): bản dịch tiếng Trung cải tiến                                             |

**Cảm ơn tất cả những người đóng góp!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 lần kiểm tra, 0 lần thất bại**(tăng từ 821 trong v2.9.5)

- +105 thử nghiệm mới bao gồm: ánh xạ kết hợp mô hình, khóa đã đăng ký, OpencodeExecutor, nhà cung cấp Bailian, xác thực tuyến đường, phân loại lỗi, ánh xạ tỷ lệ khung hình, v.v.---

### 📦 Database Migrations

| Di chuyển | Mô tả                                                               |
| --------- | ------------------------------------------------------------------- | --- |
| **008**   | bảng `registered_keys`, `provider_key_limits`, `account_key_limits` |
| **009**   | cột `requested_model` trong `call_logs`                             |
| **010**   | bảng `model_combo_mappings` để định tuyến kết hợp theo từng mô hình | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Thay đổi đáng chú ý:**Không có. Tất cả các cấu hình, tổ hợp và khóa API hiện có đều được giữ nguyên.
> Di chuyển cơ sở dữ liệu 008-010 tự động chạy khi khởi động.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**Khắc phục CodeQL**— Đã sửa hơn 10 cảnh báo:

- 6 redos đa thức trong `provider.ts` / `chatCore.ts` (đã thay thế các mẫu xen kẽ `(?:^|/)` bằng cách so khớp dựa trên phân đoạn)
- 1 ngẫu nhiên không an toàn trong `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 shell-command-injection trong đường dẫn `prepublish.mjs` (thoát đường dẫn`JSON.stringify()`) -**Xác thực tuyến đường**— Đã thêm lược đồ Zod + `validateBody()` vào 5 tuyến đường bị thiếu xác thực:
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` hiện đã vượt qua:**176/176 tuyến được xác thực**### 🐛 Bug Fixes

-**#585**— thẻ nội bộ `<omniModel>` không còn bị rò rỉ tới máy khách trong phản hồi SSE nữa. Đã thêm tính năng dọn dẹp gửi đi `TransformStream` trong `combo.ts`### ⚙️ Infrastructure

-**Docker**— Đã nâng cấp `docker/setup-buildx-action` từ v3 → v4 (Bản sửa lỗi không dùng nữa của Node.js 20) -**Dọn dẹp CI**— Đã xóa hơn 150 lần chạy quy trình làm việc không thành công/bị hủy### 🧪 Tests

- Bộ thử nghiệm:**926 thử nghiệm, 0 thất bại**(+3 mới)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Tăng giới hạn sao chép phương tiện truyền thông
- Đã thêm Độ dài bối cảnh mô hình vào siêu dữ liệu đăng ký
- Đã thêm tiêu đề tùy chỉnh ngược dòng cho mỗi mô hình thông qua giao diện người dùng cấu hình
- Đã sửa nhiều lỗi, xác thực Zod cho các bản vá và giải quyết các vấn đề cộng đồng khác nhau.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Định tuyến kết hợp trên mỗi mô hình: ánh xạ các mẫu tên mô hình (toàn cầu) thành các kết hợp cụ thể để định tuyến tự động

- Bảng `model_combo_mappings` mới (di chuyển 010) với mẫu, combo_id, mức độ ưu tiên, đã bật
- Hàm DB `resolveComboForModel()` có khớp toàn cầu với biểu thức chính quy (ký tự đại diện `*` và `?` không phân biệt chữ hoa chữ thường)
- `getComboForModel()` trong `model.ts`: tăng cường `getCombo()` với dự phòng mẫu-mô hình
- `chat.ts`: quyết định định tuyến hiện kiểm tra ánh xạ kết hợp mô hình trước khi xử lý một mô hình
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Bảng điều khiển: Phần "Quy tắc định tuyến mô hình" được thêm vào trang Combo với tính năng thêm/chỉnh sửa/chuyển đổi/xóa nội tuyến
- Ví dụ: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Đồng bộ hóa i18n đầy đủ**: 2.788 khóa bị thiếu được thêm vào trên 30 tệp ngôn ngữ — tất cả các ngôn ngữ hiện ở mức tương đương 100% với `en.json` -**Trang đại lý i18n**: Phần Tích hợp OpenCode được quốc tế hóa hoàn toàn (tiêu đề, mô tả, quét, nhãn tải xuống) -**6 khóa mới**được thêm vào không gian tên `agent` cho phần OpenCode### 🎨 UI/UX

-**Biểu tượng nhà cung cấp**: Đã thêm 16 biểu tượng nhà cung cấp bị thiếu (3 sao chép, 2 tải xuống, 11 SVG được tạo) -**Dự phòng SVG**: Thành phần `ProviderIcon` được cập nhật với chiến lược 4 tầng: Lobehub → PNG → SVG → Generic icon -**Lấy dấu vân tay của đại lý**: Được đồng bộ hóa với các công cụ CLI - đã thêm droid, openclaw, phi công phụ, mã mở vào danh sách dấu vân tay (tổng cộng 14)### Bảo mật

-**Sửa lỗi CVE**: Đã giải quyết lỗ hổng Dompurify XSS (GHSA-v2wj-7wpq-c8vv) thông qua ghi đè npm buộc `dompurify@^3.3.2`

- `npm Audit` hiện báo cáo**0 lỗ hổng**### 🧪 Tests

- Bộ thử nghiệm:**923 thử nghiệm, 0 lỗi**(+15 thử nghiệm ánh xạ kết hợp mô hình mới)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Tác giả  | Tóm tắt                                                                                 |
| -------- | -------- | --------------------------------------------------------------------------------------- | ------------ |
| **#562** | @coobabm | fix(ux): quản lý phiên MCP, chuẩn hóa thông qua Claude, phương thức OAuth, detectFormat |
| **#561** | @zen0bit | fix(i18n): Sửa bản dịch tiếng Séc — tên phương thức HTTP và cập nhật tài liệu           | ### 🧪 Tests |

- Bộ thử nghiệm:**908 thử nghiệm, 0 thất bại**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**giải quyết khóa API thực từ `keyId` trong các tuyến cài đặt CLI (`codex-settings`, `droid-settings`, `kilo-settings`) để ngăn việc ghi các chuỗi bị che (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Tác giả  | Tóm tắt                                                                                                                                                                                                    |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik | fix(cli): `--version` trả về `unknown` trên Windows — sử dụng `JSON.parse(readFileSync)` thay vì nhập ESM                                                                                                  |
| **#555** | @k0valik | fix(sse): `resolveDataDir()` tập trung để phân giải đường dẫn trong thông tin xác thực, autoCombo, trình ghi phản hồi và trình ghi yêu cầu                                                                 |
| **#544** | @k0valik | fix(cli): phát hiện công cụ CLI an toàn thông qua các đường dẫn cài đặt đã biết (8 công cụ) với xác thực liên kết tượng trưng, ​​​​kiểm tra loại tệp, giới hạn kích thước, env tối thiểu trong healthcheck |
| **#542** | @rdself  | fix(ui): cải thiện độ tương phản của chế độ ánh sáng — thêm các biến chủ đề CSS bị thiếu (`bg-primary`, `bg-subtle`, `text-primary`) và sửa các màu chỉ tối trong chi tiết nhật ký                         | ### 🔧 Bug Fixes |

-**Sửa lỗi TDZ trong `cliRuntime.ts`**— `validateEnvPath` đã được sử dụng trước khi khởi tạo khi khởi động mô-đun bởi `getExpectedParentPaths()`. Đã sắp xếp lại các khai báo để sửa `ReferenceError`. -**Bản sửa lỗi bản dựng**— Đã thêm `pino` và `pino-pretty` vào `serverExternalPackages` để ngăn Turbopack phá vỡ quá trình tải nhân viên nội bộ của Pino.### 🧪 Tests

- Bộ thử nghiệm:**905 thử nghiệm, 0 thất bại**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Hồi quy bản dựng Electron: đã hạ cấp Next.js từ `16.1.x` xuống `16.0.10` để loại bỏ tính không ổn định khi băm mô-đun Turbopack gây ra màn hình trống trong gói máy tính để bàn Electron. -**Sửa lỗi kiểm thử đơn vị**— Đã sửa hai xác nhận kiểm tra cũ (tỷ lệ/độ phân giải `nanobanana-image-handler`, ánh xạ trường `thinking-budget` Gemini `thinkingConfig`) đã bị sai lệch sau những thay đổi triển khai gần đây. -**#541**— Trả lời phản hồi của người dùng về độ phức tạp của quá trình cài đặt; không cần thay đổi mã.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: được triển khai bằng thư viện `jose` để xử lý xác thực JWT/Tài khoản dịch vụ, cùng với các vùng có thể định cấu hình trong giao diện người dùng và xây dựng URL mô hình đối tác tự động. -**T42**— Ánh xạ tỷ lệ khung hình tạo hình ảnh: đã tạo logic `sizeMapper` cho các định dạng OpenAI chung (`size`), thêm khả năng xử lý `imagen3` gốc và cập nhật điểm cuối NanoBanana để tự động sử dụng tỷ lệ khung hình được ánh xạ. -**T38**— Thông số kỹ thuật mô hình tập trung: `modelSpecs.ts` được tạo cho các giới hạn và tham số cho mỗi mô hình.### 🔧 Improvements

-**T40**— Tích hợp công cụ OpenCode CLI: tích hợp `opencode-zen` và `opencode-go` gốc đã hoàn thành trong PR trước đó.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— Thời gian hồi chiêu của `503` đang chờ sửa + ánh xạ `406`: ánh xạ `406 Không được chấp nhận` thành `503 Dịch vụ không khả dụng` với khoảng thời gian hồi chiêu thích hợp. -**T25**— Dự phòng xác thực nhà cung cấp: dự phòng linh hoạt cho các mô hình xác thực tiêu chuẩn khi không có `validationModelId` cụ thể. -**T36**— sàng lọc xử lý nhà cung cấp `403` so với `429`: được trích xuất vào `errorClassifier.ts` để phân tách chính xác các lỗi cấp quyền cứng (`403`) khỏi giới hạn tốc độ (`429`). -**T39**— Dự phòng điểm cuối cho `fetchAvailableModels`: đã triển khai cơ chế ba cấp (`/models` -> `/v1/models` -> danh mục chung cục bộ) + `list_models_catalog` MCP cập nhật công cụ để phản ánh `nguồn` và `cảnh báo`. -**T33**— Cấp độ tư duy để chuyển đổi ngân sách: chuyển các cấp độ tư duy định tính thành phân bổ ngân sách chính xác. -**T41**— Tự động chuyển hướng tác vụ nền: tự động định tuyến các tác vụ đánh giá nền nặng tới các mô hình flash/hiệu quả. -**T23**— Dự phòng đặt lại hạn ngạch thông minh: trích xuất chính xác các giá trị tiêu đề `x-ratelimit-reset` / `retry-after` hoặc ánh xạ thời gian hồi chiêu tĩnh.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Nâng cấp từ v2.9.5:**Đã giải quyết 16 vấn đề · Hợp nhất 2 PR cộng đồng · 2 nhà cung cấp mới · 7 điểm cuối API mới · 3 tính năng mới · Di chuyển DB 008+009 · 832 bài kiểm tra đã vượt qua · 15 cải tiến về khoảng cách sub2api (hoàn thành T01–T15).### 🆕 New Providers

| Nhà cung cấp  | Bí danh        | Bậc         | Ghi chú                                                          |
| ------------- | -------------- | ----------- | ---------------------------------------------------------------- |
| **Mã mở Zen** | `opencode-zen` | Miễn phí    | 3 mô hình qua `opencode.ai/zen/v1` (PR #530 của @kang-heewon)    |
| **Mã mở đi**  | `opencode-go`  | Đã trả tiền | 4 mô hình qua `opencode.ai/zen/go/v1` (PR #530 của @kang-heewon) |

Cả hai nhà cung cấp đều sử dụng `OpencodeExecutor` mới với định tuyến đa định dạng (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Tự động tạo và cấp khóa API OmniRoute theo chương trình với việc thực thi hạn ngạch cho mỗi nhà cung cấp và mỗi tài khoản.

| Điểm cuối                             | Phương pháp | Mô tả                                                 |
| ------------------------------------- | ----------- | ----------------------------------------------------- |
| `/api/v1/khóa đã đăng ký`             | `ĐĂNG`      | Cấp khóa mới — khóa thô được trả về**chỉ một lần**    |
| `/api/v1/khóa đã đăng ký`             | `NHẬN`      | Liệt kê các khóa đã đăng ký (bị che)                  |
| `/api/v1/registered-keys/{id}`        | `NHẬN`      | Nhận siêu dữ liệu chính                               |
| `/api/v1/registered-keys/{id}`        | `XÓA`       | Thu hồi chìa khóa                                     |
| `/api/v1/registered-keys/{id}/revoke` | `ĐĂNG`      | Thu hồi (đối với khách hàng không hỗ trợ XÓA)         |
| `/api/v1/quotas/check`                | `NHẬN`      | Xác thực trước hạn ngạch trước khi phát hành          |
| `/api/v1/providers/{id}/limits`       | `NHẬN/PUT`  | Định cấu hình giới hạn phát hành cho mỗi nhà cung cấp |
| `/api/v1/accounts/{id}/limits`        | `NHẬN/PUT`  | Định cấu hình giới hạn phát hành cho mỗi tài khoản    |
| `/api/v1/issues/báo cáo`              | `ĐĂNG`      | Báo cáo các sự kiện hạn ngạch cho Vấn đề GitHub       |

**DB — Di chuyển 008:**Ba bảng mới: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Bảo mật:**Khóa được lưu trữ dưới dạng hàm băm SHA-256. Khóa thô được hiển thị một lần khi tạo và không bao giờ có thể truy xuất lại được.
**Loại hạn ngạch:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` cho mỗi nhà cung cấp và mỗi tài khoản.
**Idempotency:**Trường `idempotency_key` ngăn chặn việc phát hành trùng lặp. Trả về `409 IDEMPOTENCY_CONFLICT` nếu khóa đã được sử dụng.
**Ngân sách cho mỗi khóa:**`dailyBudget` / `hourlyBudget` — giới hạn số lượng yêu cầu mà một khóa có thể định tuyến trên mỗi cửa sổ.
**Báo cáo GitHub:**Tùy chọn. Đặt `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` để tự động tạo các vấn đề GitHub khi vượt quá hạn ngạch hoặc phát hành không thành công.#### 🎨 Provider Icons — @lobehub/icons (#529)

Tất cả các biểu tượng nhà cung cấp trong bảng điều khiển hiện sử dụng các thành phần React `@lobehub/icons` (hơn 130 nhà cung cấp có SVG).
Chuỗi dự phòng:**Lobehub SVG → `/providers/{id}.png` hiện có → biểu tượng chung**. Sử dụng mẫu React `ErrorBoundary` thích hợp.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute giờ đây tự động làm mới danh sách mô hình cho các nhà cung cấp được kết nối**24 giờ**.

- Chạy khi khởi động máy chủ thông qua hook `/api/sync/initialize` hiện có
- Có thể định cấu hình thông qua biến môi trường `MODEL_SYNC_INTERVAL_HOURS`
- Bao gồm 16 nhà cung cấp lớn
- Ghi lại thời gian đồng bộ hóa lần cuối trong cơ sở dữ liệu cài đặt---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Xóa lỗi có thể xử lý khi thiếu `GEMINI_OAUTH_CLIENT_SECRET` trong quá trình triển khai Docker/tự lưu trữ. Trước đây đã hiển thị thông tin khó hiểu `client_secret` bị thiếu`trên Google. Bây giờ cung cấp các hướng dẫn cụ thể`docker-compose.yml`và`~/.omniroute/.env`.#### Providers & Routing

-**#536 — LongCat AI:**Đã sửa lỗi `baseUrl` (`api.longcat.chat/openai`) và `authHeader` (`Ủy quyền: Bearer`). -**#535 — Ghi đè mô hình đã ghim:**`body.model` hiện được đặt chính xác thành `pinnedModel` khi tính năng bảo vệ bộ nhớ đệm ngữ cảnh được kích hoạt. -**#532 — Xác thực khóa OpenCode Go:**Hiện sử dụng điểm cuối kiểm tra `zen/v1` (`testKeyBaseUrl`) — cùng một khóa hoạt động cho cả hai cấp.#### CLI & Tools

-**#527 — Vòng lặp Claude Code + Codex:**các khối `tool_result` hiện được chuyển đổi thành văn bản thay vì bị loại bỏ, dừng các vòng lặp kết quả công cụ vô hạn. -**#524 — Lưu cấu hình OpenCode:**Đã thêm trình xử lý `saveOpenCodeConfig()` (nhận biết XDG_CONFIG_HOME, ghi TOML). -**#521 — Đăng nhập bị kẹt:**Đăng nhập không còn bị treo sau khi bỏ qua thiết lập mật khẩu — chuyển hướng chính xác đến quá trình đăng nhập. -**#522 — Trình quản lý API:**Đã xóa nút "Sao chép khóa bị che" gây hiểu lầm (được thay thế bằng chú giải công cụ biểu tượng khóa). -**#532 — Cấu hình OpenCode Go:**Trình xử lý cài đặt hướng dẫn hiện xử lý `opencode` toolId.#### Developer Experience

-**#489 — Phản trọng lực:**Thiếu `googleProjectId` trả về lỗi có cấu trúc 422 kèm theo hướng dẫn kết nối lại thay vì sự cố khó hiểu. -**#510 — Đường dẫn Windows:**Đường dẫn MSYS2/Git-Bash (`/c/Program Files/...`) hiện được chuẩn hóa thành `C:\Program Files\...` một cách tự động. -**#492 — Khởi động CLI:**`omniroute` CLI hiện phát hiện Nút do `mise`/`nvm` quản lý khi thiếu `app/server.js` và hiển thị hướng dẫn sửa lỗi được nhắm mục tiêu.---

### 📖 Documentation Updates

-**#513**— Đặt lại mật khẩu Docker: `INITIAL_PASSWORD` ghi lại cách giải quyết của env var -**#520**— pnpm: bước `pnpm phê duyệt-xây dựng tốt hơn-sqlite3` được ghi lại---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| PR       | Tác giả      | Tóm tắt                                                                            |
| -------- | ------------ | ---------------------------------------------------------------------------------- | --- |
| **#530** | @kang-heewon | Nhà cung cấp OpenCode Zen + Go với `OpencodeExecutor` và các bài kiểm tra cải tiến | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Tính duy trì DB giới hạn tốc độ: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` trong `providers.ts`. Cột `rate_limited_until` hiện có hiện được hiển thị dưới dạng API chuyên dụng — việc làm mới mã thông báo OAuth KHÔNG được chạm vào trường này để ngăn các vòng lặp giới hạn tốc độ. -**T08**— Giới hạn phiên trên mỗi khóa API: `max_sessions INTEGER DEFAULT 0` được thêm vào `api_keys` thông qua tính năng tự động di chuyển. `sessionManager.ts` nhận được `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` và `getActiveSessionCountForKey()`. Người gọi trong `chatCore.js` có thể thực thi giới hạn và giảm dần trên `req.close`. -**T09**— Phạm vi giới hạn tốc độ của Codex và Spark: `getCodexModelScope()` và `getCodexRateLimitKey()` trong `codex.ts`. Các mẫu tiêu chuẩn (`gpt-5.x-codex`, `codex-mini`) có phạm vi `"codex"`; mô hình spark (`codex-spark*`) nhận phạm vi `"spark"`. Khóa giới hạn tỷ lệ phải là `${accountId}:${scope}` để việc sử dụng hết một nhóm không chặn nhóm kia. -**T13**— Sửa lỗi hiển thị hạn ngạch cũ: `getEffectiveQuotaUsage(used, resetAt)` trả về `0` khi hết thời gian đặt lại; `formatResetCountdown(resetAt)` trả về chuỗi đếm ngược mà con người có thể đọc được (ví dụ: `"2h 35m"`). Cả hai đều được xuất từ ​​`providers.ts` + `localDb.ts` để sử dụng trên trang tổng quan. -**T14**— Proxy nhanh bị lỗi: `src/lib/proxyHealth.ts` mới với `isProxyReachable(proxyUrl, timeoutMs=2000)` (Kiểm tra TCP, 2 giây thay vì thời gian chờ 30 giây), `getCachedProxyHealth()`, `invalidateProxyHealth()` và `getAllProxyHealthStatuses()`. Kết quả được lưu trong bộ nhớ đệm 30 giây theo mặc định; có thể định cấu hình thông qua `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Bộ thử nghiệm:**832 thử nghiệm, 0 thất bại**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— cột `requested_model` trong `call_logs` (migration 009): theo dõi mô hình mà khách hàng yêu cầu ban đầu so với mô hình được định tuyến thực tế. Cho phép phân tích tỷ lệ dự phòng. -**T02**— Loại bỏ các khối văn bản trống khỏi `tool_result.content` lồng nhau: ngăn ngừa lỗi Anthropic 400 (`các khối nội dung văn bản phải không trống`) khi công cụ chuỗi Claude Code tạo ra kết quả. -**T03**— Phân tích cú pháp các tiêu đề `x-codex-5h-*` / `x-codex-7d-*`: `parseCodexQuotaHeaders()` + `getCodexResetTime()` trích xuất các cửa sổ hạn ngạch Codex để lên lịch thời gian hồi chiêu chính xác thay vì dự phòng 5 phút chung chung. -**T04**— Tiêu đề `X-Session-Id` để định tuyến cố định bên ngoài: `extractExternalSessionId()` trong `sessionManager.ts` đọc tiêu đề `x-session-id` / `x-omniroute-session` với tiền tố `ext:` để tránh xung đột với ID phiên SHA-256 nội bộ. Tương thích với Nginx (tiêu đề có gạch nối). -**T06**— Tài khoản đã bị vô hiệu hóa → chặn vĩnh viễn: `isAccountDeactivated()` trong `accountFallback.ts` phát hiện 401 tín hiệu hủy kích hoạt và áp dụng thời gian hồi chiêu 1 năm để ngăn việc thử lại các tài khoản đã chết vĩnh viễn. -**T07**— Xác thực X-Forwarded-For IP: `src/lib/ipUtils.ts` mới với `extractClientIp()` và `getClientIpFromRequest()` — bỏ qua các mục nhập `không xác định`/không phải IP trong chuỗi `X-Forwarded-For` (yêu cầu Nginx/proxy-forwarded). -**T10**— Hết tín dụng → dự phòng riêng biệt: `isCreditsExhaused()` trong `accountFallback.ts` trả về thời gian hồi chiêu là 1 giờ với cờ `creditsExhausted`, khác với giới hạn tỷ lệ chung 429. -**T11**— `nỗ lực suy luận tối đa` → 131072 mã thông báo ngân sách: `EFFORT_BUDGETS` và `THINKING_LEVEL_MAP` đã được cập nhật; ánh xạ ngược bây giờ trả về `"max"` cho các phản hồi toàn bộ ngân sách. Đã cập nhật bài kiểm tra đơn vị. -**T12**— Đã thêm các mục định giá MiniMax M2.7: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` được thêm vào bảng giá (sub2api PR #1120). Giá M2.5/GLM-4.7/GLM-5/Kimi đã tồn tại. -**T15**— Chuẩn hóa nội dung mảng: trình trợ giúp `normalizeContentToString()` trong `openai-to-claude.ts` thu gọn chính xác các thông báo hệ thống/công cụ có định dạng mảng thành chuỗi trước khi gửi tới Anthropic.### 🧪 Tests

- Bộ thử nghiệm:**832 thử nghiệm, 0 lỗi**(không thay đổi so với RC.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— API cấp phép khóa đã đăng ký: tự động cấp khóa API với việc thực thi hạn ngạch cho mỗi nhà cung cấp và mỗi tài khoản

- `POST /api/v1/registered-keys` — phát hành khóa có hỗ trợ idempotency
- `GET /api/v1/registered-keys` — liệt kê các khóa đã đăng ký (bị che)
- `GET /api/v1/registered-keys/{id}` — lấy siêu dữ liệu khóa
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — thu hồi khóa
- `GET /api/v1/quotas/check` — xác thực trước khi phát hành
- `PUT /api/v1/providers/{id}/limits` — đặt giới hạn phát hành của nhà cung cấp
- `PUT /api/v1/accounts/{id}/limits` — đặt giới hạn cấp tài khoản
- `POST /api/v1/issues/report` — báo cáo sự cố GitHub tùy chọn
- Di chuyển DB 008: các bảng `registered_keys`, `provider_key_limits`, `account_key_limits`---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— Đã thêm nhà cung cấp OpenCode Zen và OpenCode Go (bởi @kang-heewon)

- `OpencodeExecutor` mới với định tuyến đa định dạng (`/chat/completions`, `/messages`, `/responses`)
- 7 mô hình trên cả hai tầng---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Biểu tượng nhà cung cấp hiện sử dụng [@lobehub/icons](https://github.com/lobehub/lobe-icons) với tính năng dự phòng PNG duyên dáng và thành phần `ProviderIcon` (hỗ trợ hơn 130 nhà cung cấp) -**#488**— Danh sách mô hình tự động cập nhật cứ sau 24 giờ thông qua `modelSyncScheduler` (có thể định cấu hình qua `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: hiện hiển thị lỗi rõ ràng có thể khắc phục được khi thiếu `GEMINI_OAUTH_CLIENT_SECRET` trong quá trình triển khai Docker/tự lưu trữ---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— Xác thực khóa LongCat AI: baseUrl cố định (`api.longcat.chat/openai`) và authHeader (`Ủy quyền: Bearer`) -**#535**— Ghi đè mô hình được ghim: `body.model` hiện được đặt thành `pinnedModel` khi tính năng bảo vệ bộ nhớ đệm ngữ cảnh phát hiện mô hình được ghim -**#524**— Cấu hình OpenCode hiện đã được lưu chính xác: đã thêm trình xử lý `saveOpenCodeConfig()` (nhận biết XDG_CONFIG_HOME, ghi TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Đăng nhập không còn bị kẹt sau khi bỏ qua thiết lập mật khẩu (chuyển hướng đến phần đăng nhập) -**#522**— Trình quản lý API: Đã xóa nút "Sao chép khóa bị che" gây hiểu lầm (được thay thế bằng chú giải công cụ biểu tượng khóa) -**#527**— Vòng lặp siêu năng lực Claude Code + Codex: các khối `tool_result` hiện được chuyển đổi thành văn bản thay vì bị loại bỏ -**#532**— Xác thực khóa API OpenCode GO hiện sử dụng điểm cuối `zen/v1` chính xác (`testKeyBaseUrl`) -**#489**— Phản lực hấp dẫn: thiếu `googleProjectId` trả về lỗi cấu trúc 422 kèm theo hướng dẫn kết nối lại -**#510**— Windows: Đường dẫn MSYS2/Git-Bash (`/c/Program Files/...`) hiện được chuẩn hóa thành `C:\Program Files\...` -**#492**— `omniroute` CLI hiện phát hiện `mise`/`nvm` khi thiếu `app/server.js` và hiển thị bản sửa lỗi được nhắm mục tiêu### Tài liệu

-**#513**— Đặt lại mật khẩu Docker: `INITIAL_PASSWORD` ghi lại cách giải quyết của env var -**#520**— pnpm: `pnpm phê duyệt-xây dựng tốt hơn-sqlite3` được ghi lại### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Chạy nước rút: Nhà cung cấp OpenCode mới, sửa lỗi thông tin xác thực nhúng, lỗi khóa bị che CLI, sửa lỗi CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**Công cụ CLI lưu khóa API bị che vào tệp cấu hình**— `claude-settings`, `cline-settings` và `openclaw-settings` Các tuyến POST hiện chấp nhận thông số `keyId` và phân giải khóa API thực từ DB trước khi ghi vào đĩa. `ClaudeToolCard` được cập nhật để gửi `keyId` thay vì chuỗi hiển thị bị che. Sửa #523, #526. -**Nhà cung cấp dịch vụ nhúng tùy chỉnh: `Lỗi không có thông tin xác thực`**— `/v1/embeddings` hiện theo dõi `credentialsProviderId` riêng biệt với tiền tố định tuyến, do đó thông tin xác thực được tìm nạp từ ID nút nhà cung cấp phù hợp thay vì chuỗi tiền tố công khai. Khắc phục lỗi hồi quy trong đó `google/gemini-embedding-001` và các mô hình nhà cung cấp tùy chỉnh tương tự luôn bị lỗi do lỗi thông tin xác thực. Sửa lỗi liên quan đến #532. (PR #528 của @jacob2826) -**regex bảo vệ bộ nhớ đệm bối cảnh bị thiếu `
` tiền tố**— `CACHE_TAG_PATTERN` trong `comboAgentMiddleware.ts` được cập nhật để khớp với cả hai chữ `
` (dấu gạch chéo ngược-n) và dòng mới thực tế U+000A mà luồng `combo.ts` chèn vào xung quanh thẻ `<omniModel>` sau bản sửa lỗi #515. Sửa lỗi #531.### ✨ New Providers

-**OpenCode Zen**— Cổng cấp miễn phí tại `opencode.ai/zen/v1` với 3 mô hình: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Dịch vụ đăng ký tại `opencode.ai/zen/go/v1` với 4 model: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (định dạng Claude), `minimax-m2.5` (định dạng Claude)

- Cả hai nhà cung cấp đều sử dụng `OpencodeExecutor` mới tự động định tuyến đến `/chat/completions`, `/messages`, `/responses` hoặc `/models/{model}:generateContent` dựa trên mô hình được yêu cầu. (PR #530 của @kang-heewon)---

## [2.9.4] — 2026-03-21

> Chạy nước rút: Sửa một số lỗi — giữ lại khóa bộ đệm nhắc nhở của Codex, sửa lỗi thoát JSON của thẻ, đồng bộ hóa trạng thái mã thông báo đã hết hạn với DB.### 🐛 Bug Fixes

-**sửa(người phiên dịch)**: Giữ nguyên `prompt_cache_key` trong API phản hồi → Bản dịch hoàn thành trò chuyện (#517)
— Trường này là tín hiệu liên quan đến bộ đệm được Codex sử dụng; việc loại bỏ nó đã ngăn chặn các lần truy cập bộ nhớ đệm nhanh chóng.
Đã sửa lỗi trong `openai-responses.ts` và `responsesApiHelper.ts`.

-**sửa(combo)**: Thoát `
` trong `tagContent` nên chuỗi JSON được chèn là hợp lệ (#515)
— Dòng mới theo nghĩa đen của mẫu (U+000A) không được phép bỏ thoát bên trong các giá trị chuỗi JSON.
Được thay thế bằng chuỗi ký tự `\n` trong `open-sse/services/combo.ts`.

-**sửa (cách sử dụng)**: Đồng bộ hóa trạng thái mã thông báo đã hết hạn trở lại DB khi xác thực trực tiếp không thành công (#491)
— Khi kiểm tra trực tiếp Giới hạn & Hạn ngạch trả về 401/403, kết nối `testStatus` hiện đã được cập nhật
thành `"hết hạn"` trong cơ sở dữ liệu để trang Nhà cung cấp phản ánh trạng thái xuống cấp tương tự.
Đã sửa lỗi trong `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Chạy nước rút: Thêm 5 nhà cung cấp AI miễn phí mới — LongCat, Pollinations, Cloudflare AI, Scalway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)**: Thêm LongCat AI (`lc/`) — 50 triệu token/ngày miễn phí (Flash-Lite) + 500K/ngày (Trò chuyện/Suy nghĩ) trong phiên bản beta công khai. Xác thực Bearer tiêu chuẩn, tương thích với OpenAI. -**feat(providers/pollinations)**: Thêm Pollinations AI (`pol/`) — không cần khóa API. Proxy GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (miễn phí 1 yêu cầu/15 giây). Trình thực thi tùy chỉnh xử lý xác thực tùy chọn. -**feat(providers/cloudflare-ai)**: Thêm Cloudflare Workers AI (`cf/`) — miễn phí 10K nơ-ron/ngày (~150 phản hồi LLM hoặc âm thanh Whisper 500 giây). Hơn 50 mô hình trên toàn cầu. Trình thực thi tùy chỉnh tạo URL động với `accountId` từ thông tin xác thực. -**feat(providers/scaleway)**: Thêm API tạo quy mô (`scw/`) — 1 triệu mã thông báo miễn phí cho tài khoản mới. Tuân thủ EU/GDPR (Paris). Qwen3 235B, Llama 3.1 70B, Mistral Nhỏ 3.2. -**feat(providers/aimlapi)**: Thêm API AI/ML (`aiml/`) — tín dụng miễn phí 0,025 USD/ngày, hơn 200 mô hình (GPT-4o, Claude, Gemini, Llama) thông qua một điểm cuối tổng hợp duy nhất.### 🔄 Provider Updates

-**feat(providers/ together)**: Thêm `hasFree: true` + 3 ID mẫu miễn phí vĩnh viễn: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free` -**feat(providers/gemini)**: Thêm `hasFree: true` + `freeNote` (1.500 req/ngày, không cần thẻ tín dụng, aistudio.google.com) -**chore(providers/gemini)**: Đổi tên hiển thị thành `Gemini (Google AI Studio)` cho rõ ràng### ⚙️ Infrastructure

-**feat(executors/pollinations)**: `PollinationsExecutor` mới — bỏ qua tiêu đề `Authorization` khi không cung cấp khóa API -**feat(executors/cloudflare-ai)**: `CloudflareAIExecutor` mới — cấu trúc URL động yêu cầu `accountId` trong thông tin xác thực của nhà cung cấp -**feat(executors)**: Đăng ký `pollinations`, `pol`, `cloudflare-ai`, `cf` ánh xạ thực thi### Tài liệu

-**docs(readme)**: Mở rộng combo miễn phí cho 11 nhà cung cấp ($0 mãi mãi) -**docs(readme)**: Đã thêm 4 phần nhà cung cấp miễn phí mới (LongCat, Pollinations, Cloudflare AI, Scalway) với các bảng mô hình -**docs(readme)**: Cập nhật bảng giá với 4 hàng cấp miễn phí mới -**docs(i18n/pt-BR)**: Cập nhật bảng giá + thêm phần LongCat/Pollinations/Cloudflare AI/Scaleway bằng tiếng Bồ Đào Nha -**docs(new-features/ai)**: 10 file thông số nhiệm vụ + kế hoạch triển khai tổng thể trong `docs/new-features/ai/`### 🧪 Tests

- Bộ thử nghiệm:**821 thử nghiệm, 0 lỗi**(không thay đổi)---

## [2.9.2] — 2026-03-21

> Chạy nước rút: Sửa lỗi sao chép phương tiện (Loại nội dung Deepgram/HuggingFace, phát hiện ngôn ngữ) và hiển thị lỗi TTS.### 🐛 Bug Fixes

-**sửa (phiên âm)**: Phiên âm âm thanh Deepgram và HuggingFace hiện ánh xạ chính xác `video/mp4` → `audio/mp4` và các loại MIME đa phương tiện khác thông qua trình trợ giúp `resolveAudioContentType()` mới. Trước đây, việc tải tệp `.mp4` lên thường xuyên trả về "Không phát hiện thấy giọng nói" vì Deepgram đang nhận được `Loại nội dung: video/mp4`. -**sửa (phiên âm)**: Đã thêm ` detect_ngôn ngữ=true` vào yêu cầu Deepgram — tự động phát hiện ngôn ngữ âm thanh (tiếng Bồ Đào Nha, tiếng Tây Ban Nha, v.v.) thay vì mặc định là tiếng Anh. Sửa các bản phiên âm không phải tiếng Anh trả về kết quả trống hoặc rác. -**sửa (phiên âm)**: Đã thêm `punctuate=true` vào các yêu cầu Deepgram để có đầu ra bản chép lời chất lượng cao hơn với dấu câu chính xác. -**fix(tts)**: Lỗi hiển thị `[object Object]` trong phản hồi Chuyển văn bản thành giọng nói đã được sửa trong cả `audioSpeech.ts` và `audioTranscription.ts`. Hàm `upstreamErrorResponse()` giờ đây trích xuất chính xác các thông báo chuỗi lồng nhau từ các nhà cung cấp như ElevenLabs trả về `{ error: { message: "...", status_code: 401 } }` thay vì một chuỗi lỗi phẳng.### 🧪 Tests

- Bộ thử nghiệm:**821 thử nghiệm, 0 lỗi**(không thay đổi)### Triaged Issues

-**#508**— Hồi quy định dạng cuộc gọi công cụ: nhật ký proxy được yêu cầu và thông tin chuỗi nhà cung cấp (`needs-info`) -**#510**— Đường dẫn kiểm tra tình trạng Windows CLI: thông tin phiên bản shell/Node được yêu cầu (`needs-info`) -**#485**— Lệnh gọi công cụ Kiro MCP: đã đóng do sự cố Kiro bên ngoài (không phải OmniRoute) -**#442**— Điểm cuối Baseten /models: đã đóng (cách giải quyết thủ công được ghi lại) -**#464**— API cấp phép chính: được xác nhận là mục lộ trình---

## [2.9.1] — 2026-03-21

> Chạy nước rút: Khắc phục tình trạng mất dữ liệu SSE omniModel, hợp nhất khả năng tương thích của mô hình theo giao thức.### Bug Fixes

-**#511**— Nghiêm trọng: Thẻ `<omniModel>` được gửi sau `finish_reason:stop` trong luồng SSE, gây mất dữ liệu. Thẻ hiện được đưa vào đoạn nội dung không trống đầu tiên, đảm bảo phân phối trước khi SDK đóng kết nối.### Merged PRs

-**PR #512**(@zhangqiang8vip): Khả năng tương thích với mô hình trên mỗi giao thức — `normalizeToolCallId` và `preserveOpenAIDeveloperRole` hiện có thể được định cấu hình cho mỗi giao thức máy khách (OpenAI, Claude, Responses API). Trường `compatByProtocol` mới trong cấu hình mô hình có xác thực Zod.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: yêu cầu thông tin PATH/phiên bản -**#509**— Hồi quy Turbopack Electron: lỗi Next.js ngược dòng, cách giải quyết được ghi lại -**#508**— màn hình đen macOS: cách giải quyết được đề xuất `--disable-gpu`---

## [2.9.0] — 2026-03-20

> Chạy nước rút: Sửa lỗi machineId trên nhiều nền tảng, giới hạn tốc độ trên mỗi khóa API, bộ nhớ đệm ngữ cảnh phát trực tuyến, Alibaba DashScope, phân tích tìm kiếm, ZWS v5 và 8 vấn đề đã được khắc phục.### ✨ New Features

-**feat(search)**: tab Phân tích tìm kiếm trong `/dashboard/analytics` — phân tích nhà cung cấp, tỷ lệ truy cập bộ đệm, theo dõi chi phí. API mới: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**: Alibaba Cloud DashScope được bổ sung tính năng xác thực đường dẫn điểm cuối tùy chỉnh — `chatPath` và `modelsPath` có thể định cấu hình trên mỗi nút (#feat/custom-endpoint-paths) -**feat(api)**: Giới hạn số lượng yêu cầu trên mỗi khóa API — các cột `max_requests_per_day` và `max_requests_per_ Minute` có tính năng thực thi cửa sổ trượt trong bộ nhớ trả về HTTP 429 (#452) -**feat(dev)**: ZWS v5 — Sửa lỗi rò rỉ HMR (485 kết nối DB → 1), bộ nhớ 2,4GB → 195 MB, singletons `globalThis`, sửa lỗi cảnh báo Edge Runtime (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: `machineId` đa nền tảng — `getMachineIdRaw()` được viết lại bằng thác try/catch (Windows REG.exe → macOS ioreg → Đọc tệp Linux → tên máy chủ → `os.hostname()`). Loại bỏ phân nhánh `process.platform` mà trình đóng gói Next.js đã loại bỏ mã chết, sửa lỗi `'head' không được nhận dạng` trên Windows. Đồng thời sửa lỗi #466. -**fix(#493)**: Đặt tên mô hình nhà cung cấp tùy chỉnh — đã loại bỏ phần loại bỏ tiền tố không chính xác trong `DefaultExecutor.transformRequest()` làm sai lệch các ID mô hình trong phạm vi tổ chức như `zai-org/GLM-5-FP8`. -**fix(#490)**: Phát trực tuyến + bảo vệ bộ nhớ đệm ngữ cảnh — `TransformStream` chặn SSE để đưa thẻ `<omniModel>` vào trước điểm đánh dấu `[DONE]`, bật tính năng bảo vệ bộ nhớ đệm ngữ cảnh cho các phản hồi truyền phát. -**fix(#458)**: Xác thực lược đồ kết hợp — các trường `system_message`, `tool_filter_regex`, `context_cache_protection` giờ đây đã vượt qua xác thực Zod khi lưu. -**sửa (#487)**: Dọn dẹp thẻ KIRO MITM — đã xóa ZWS_README, tạo ra `AntiGravityToolCard` để sử dụng siêu dữ liệu công cụ động.### 🧪 Tests

- Đã thêm các bài kiểm tra đơn vị bộ lọc công cụ định dạng Anthropic (PR #397) — 8 bài kiểm tra hồi quy cho `tool.name` không có trình bao bọc `.function`
- Bộ thử nghiệm:**821 thử nghiệm, 0 lỗi**(tăng từ 813)### 📋 Issues Closed (8)

-**#506**— Windows machineId `head` không được nhận dạng (đã sửa) -**#493**— Đặt tên mô hình nhà cung cấp tùy chỉnh (đã sửa) -**#490**— Bộ đệm ngữ cảnh phát trực tuyến (đã sửa) -**#452**— Giới hạn yêu cầu trên mỗi khóa API (đã triển khai) -**#466**— Lỗi đăng nhập Windows (cùng nguyên nhân như #506) -**#504**— MITM không hoạt động (hành vi dự kiến) -**#462**— Gemini CLI PSA (đã giải quyết) -**#434**— Sự cố ứng dụng Electron (trùng lặp với #402)## [2.8.9] — 2026-03-20

> Chạy nước rút: Hợp nhất PR cộng đồng, sửa thẻ KIRO MITM, cập nhật phụ thuộc.### Merged PRs

-**PR #498**(@Sajid11194): Khắc phục sự cố ID máy Windows (`không xác định\REG.exe`). Thay thế `node-machine-id` bằng các truy vấn đăng ký hệ điều hành gốc.**Đóng #486.** -**PR #497**(@zhangqiang8vip): Khắc phục rò rỉ tài nguyên HMR ở chế độ nhà phát triển — 485 kết nối DB bị rò rỉ → 1, bộ nhớ 2,4GB → 195MB. Singletons `globalThis`, bản sửa lỗi cảnh báo Edge Runtime, kiểm tra độ ổn định của Windows. (+1168/-338 trên 22 tệp) -**PRs #499-503**(Dependabot): Cập nhật GitHub Actions — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `docker/login-action@4`.### Bug Fixes

-**#505**— Thẻ KIRO MITM hiện hiển thị hướng dẫn dành riêng cho công cụ (`api.anthropic.com`) thay vì văn bản dành riêng cho Chống hấp dẫn. -**#504**— Đã phản hồi bằng cách làm rõ về UX (MITM "Không hoạt động" là hành vi được mong đợi khi proxy không chạy).---

## [2.8.8] — 2026-03-20

> Chạy nước rút: Khắc phục sự cố kiểm tra hàng loạt OAuth, thêm nút "Kiểm tra tất cả" vào các trang nhà cung cấp riêng lẻ.### Bug Fixes

-**Sự cố kiểm tra hàng loạt OAuth**(ERR_CONNECTION_REFUSED): Vòng lặp for tuần tự được thay thế bằng giới hạn đồng thời 5 kết nối + thời gian chờ 30 giây cho mỗi kết nối thông qua `Promise.race()` + `Promise.allSettled()`. Ngăn chặn sự cố máy chủ khi kiểm tra các nhóm nhà cung cấp OAuth lớn (~30+ kết nối).### Tính năng

-**Nút "Kiểm tra tất cả" trên các trang của nhà cung cấp**: Các trang của nhà cung cấp riêng lẻ (ví dụ: `/providers/codex`) hiện hiển thị nút "Kiểm tra tất cả" trong tiêu đề Kết nối khi có hơn 2 kết nối. Sử dụng `POST /api/providers/test-batch` với `{mode: "provider", ProviderId}`. Kết quả được hiển thị theo phương thức có tóm tắt đạt/không đạt và chẩn đoán trên mỗi kết nối.---

## [2.8.7] — 2026-03-20

> Chạy nước rút: Hợp nhất PR #495 (Thả nút cổ chai 429), sửa lỗi #496 (nhà cung cấp dịch vụ nhúng tùy chỉnh), tính năng phân loại.### Bug Fixes

-**Chờ đợi vô hạn nút thắt cổ chai 429**(PR #495 của @xandr0s): Vào ngày 429, `limiter.stop({ dropWaitingJobs: true })` ngay lập tức không thực hiện được tất cả các yêu cầu được xếp hàng đợi để người gọi ngược dòng có thể kích hoạt dự phòng. Bộ giới hạn bị xóa khỏi Bản đồ nên yêu cầu tiếp theo sẽ tạo một phiên bản mới. -**Không thể phân giải các mô hình nhúng tùy chỉnh**(#496): `POST /v1/embeddings` hiện giải quyết các mô hình nhúng tùy chỉnh từ TẤT CẢ các nút nhà cung cấp (không chỉ localhost). Cho phép các mô hình như `google/gemini-embedding-001` được thêm qua trang tổng quan.### Issues Responded

-**#452**— Giới hạn số lượng yêu cầu trên mỗi khóa API (đã được xác nhận, theo lộ trình) -**#464**— Tự động cấp khóa API với giới hạn tài khoản/nhà cung cấp (cần thêm chi tiết) -**#488**— Tự động cập nhật danh sách model (đã được xác nhận, theo lộ trình) -**#496**— Độ phân giải của nhà cung cấp dịch vụ nhúng tùy chỉnh (đã sửa)---

## [2.8.6] — 2026-03-20

> Chạy nước rút: Hợp nhất PR #494 (sửa lỗi vai trò MiniMax), sửa bảng điều khiển KIRO MITM, phân loại 8 vấn đề.### Tính năng

-**Nhà phát triển MiniMax→sửa lỗi vai trò hệ thống**(PR #494 của @zhangqiang8vip): Chuyển đổi `preserveDeveloperRole` trên mỗi mô hình. Thêm giao diện người dùng "Tương thích" trong trang nhà cung cấp. Khắc phục "lỗi thông số vai trò" 422 cho MiniMax và các cổng tương tự. -**roleNormalizer**: `normalizeDeveloperRole()` hiện chấp nhận tham số `preserveDeveloperRole` với hành vi ba trạng thái (không xác định=keep, true=keep, false=convert). -**DB**: `getModelPreserveOpenAIDeveloperRole()` và `mergeModelCompatOverride()` mới trong `models.ts`.### Bug Fixes

-**Bảng thông tin KIRO MITM**(#481/#487): `CLIToolsPageClient` hiện định tuyến bất kỳ công cụ `configType: "mitm"` nào tới `AntiGrityToolCard` (điều khiển Bắt đầu/Dừng MITM). Trước đây chỉ có AntiGravity được mã hóa cứng. -**Chung AntiGravityToolCard**: Sử dụng `tool.image`, `tool.description`, `tool.id` thay vì các giá trị AntiGravity được mã hóa cứng. Bảo vệ chống lại việc thiếu `defaultModels`.### Cleanup

- Đã xóa `ZWS_README_V2.md` (tài liệu chỉ dành cho phát triển từ PR #494).### Issues Triaged (8)

-**#487**— Đã đóng (KIRO MITM đã được sửa trong bản phát hành này) -**#486**— cần-thông tin (vấn đề PATH của Windows REG.exe) -**#489**— cần-thông tin (Thiếu Id dự án chống trọng lực, cần kết nối lại OAuth) -**#492**— Need-info (thiếu app/server.js trên Node được quản lý sai) -**#490**— Đã xác nhận (phát trực tuyến + chặn bộ nhớ đệm ngữ cảnh, đã lên kế hoạch sửa lỗi) -**#491**— Đã xác nhận (không nhất quán trạng thái xác thực Codex) -**#493**— Đã được xác nhận (Tiền tố tên mô hình của nhà cung cấp phương thức, đã cung cấp giải pháp thay thế) -**#488**— Tồn đọng yêu cầu tính năng (danh sách mô hình tự động cập nhật)---

## [2.8.5] — 2026-03-19

> Chạy nước rút: Khắc phục các luồng SSE zombie, bộ nhớ đệm ngữ cảnh lần đầu, KIRO MITM và phân loại 5 sự cố bên ngoài.### Bug Fixes

-**Luồng SSE Zombie**(#473): Giảm `STREAM_IDLE_TIMEOUT_MS` từ 300 giây → 120 giây để dự phòng kết hợp nhanh hơn khi nhà cung cấp treo giữa luồng. Có thể cấu hình thông qua env var. -**Thẻ bộ nhớ đệm ngữ cảnh**(#474): Sửa `injectModelTag()` để xử lý các yêu cầu ở lượt đầu tiên (không có thông báo hỗ trợ) — tính năng bảo vệ bộ nhớ đệm ngữ cảnh hiện hoạt động ngay từ phản hồi đầu tiên. -**KIRO MITM**(#481): Thay đổi KIRO `configType` từ `guide` → `mitm` để bảng điều khiển hiển thị các điều khiển Bắt đầu/Dừng MITM. -**Thử nghiệm E2E**(CI): Khắc phục `providers-bailian-coding-plan.spec.ts` — loại bỏ lớp phủ phương thức hiện có trước khi nhấp vào nút Thêm khóa API.### Closed Issues

- #473 — Dự phòng kết hợp bỏ qua luồng Zombie SSE
- #474 — Thiếu thẻ `<omniModel>` trong bộ nhớ đệm ngữ cảnh ở lượt đầu tiên
- #481 — MITM cho KIRO không thể kích hoạt được từ bảng điều khiển
- #468 — Máy chủ từ xa Gemini CLI (được thay thế bằng việc ngừng sử dụng #462)
- #438 — Claude không thể ghi tập tin (vấn đề CLI bên ngoài)
- #439 — AppImage không hoạt động (cách giải quyết libfuse2 được ghi lại)
- #402 — ARM64 DMG "bị hỏng" (đã ghi lại cách giải quyết xattr -cr)
- #460 — CLI không thể chạy được trên Windows (bản sửa lỗi PATH được ghi lại)---

## [2.8.4] — 2026-03-19

> Chạy nước rút: Ngừng sử dụng Gemini CLI, sửa lỗi hướng dẫn VM i18n, sửa lỗi bảo mật phụ thuộc, mở rộng lược đồ nhà cung cấp.### Tính năng

-**Ngưng sử dụng Gemini CLI**(#462): Đánh dấu nhà cung cấp `gemini-cli` là không được dùng nữa kèm theo cảnh báo — Google hạn chế việc sử dụng OAuth của bên thứ ba từ tháng 3 năm 2026 -**Lược đồ nhà cung cấp**(#462): Mở rộng xác thực Zod với các trường tùy chọn `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint`### Bug Fixes

-**VM Guide i18n**(#471): Thêm `VM_DEPLOYMENT_GUIDE.md` vào đường dẫn dịch i18n, tạo lại tất cả 30 bản dịch ngôn ngữ từ nguồn tiếng Anh (bị kẹt ở tiếng Bồ Đào Nha)### Bảo mật

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — khắc phục lỗi nguyên mẫu CWE-1321 (#484, @dependabot)### Closed Issues

- #472 — Hồi quy bí danh mô hình (đã sửa trong v2.8.2)
- #471 — Bản dịch hướng dẫn VM bị hỏng
- #483 — Trailing `data: null` sau `[DONE]` (đã sửa trong v2.8.3)### Merged PRs

- #484 — deps: tăng dần từ 3.3.3 lên 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Chạy nước rút: Tiếng Séc i18n, sửa giao thức SSE, dịch hướng dẫn VM.### Tính năng

-**Ngôn ngữ Séc**(#482): Tiếng Séc đầy đủ (cs) i18n — 22 tài liệu, 2606 chuỗi giao diện người dùng, cập nhật trình chuyển đổi ngôn ngữ (@zen0bit) -**Hướng dẫn triển khai VM**: Được dịch từ tiếng Bồ Đào Nha sang tiếng Anh dưới dạng tài liệu nguồn (@zen0bit)### Bug Fixes

-**Giao thức SSE**(#483): Dừng gửi dấu vết `data: null` sau tín hiệu `[DONE]` — sửa `AI_TypeValidationError` trong các ứng dụng khách SDK AI nghiêm ngặt (trình xác thực dựa trên Zod)### Merged PRs

- #482 — Thêm tiếng Séc + Sửa nguồn tiếng Anh VM_DEPLOYMENT_GUIDE.md (@zen0bit)---

## [2.8.2] — 2026-03-19

> Chạy nước rút: 2 PR đã hợp nhất, sửa lỗi định tuyến bí danh mô hình, xuất nhật ký và phân loại vấn đề.### Tính năng

-**Xuất nhật ký**: Nút Xuất mới trên `/dashboard/logs` với phạm vi thời gian thả xuống (1h, 6h, 12h, 24h). Tải xuống JSON của nhật ký yêu cầu/proxy/cuộc gọi thông qua API `/api/logs/export` (#user-request)### Bug Fixes

-**Định tuyến bí danh mô hình**(#472): Cài đặt → Bí danh mô hình hiện ảnh hưởng chính xác đến việc định tuyến nhà cung cấp, không chỉ phát hiện định dạng. Đầu ra `resolveModelAlias()` trước đây chỉ được sử dụng cho `getModelTargetFormat()` nhưng ID mô hình ban đầu đã được gửi đến nhà cung cấp -**Sử dụng xả luồng**(#480): Dữ liệu sử dụng từ sự kiện SSE cuối cùng trong bộ đệm hiện được trích xuất chính xác trong quá trình xả luồng (được hợp nhất từ @prakersh)### Merged PRs

- #480 — Trích xuất mức sử dụng từ bộ đệm còn lại trong trình xử lý xả (@prakersh)
- #479 — Thêm các mục nhập giá Codex 5.3/5.4 và ID mô hình Anthropic bị thiếu (@prakersh)---

## [2.8.1] — 2026-03-19

> Chạy nước rút: Năm PR cộng đồng — sửa lỗi nhật ký cuộc gọi trực tuyến, khả năng tương thích Kiro, phân tích mã thông báo bộ đệm, bản dịch tiếng Trung và ID cuộc gọi công cụ có thể định cấu hình.### Tính năng

-**feat(logs)**: Nội dung phản hồi nhật ký cuộc gọi hiện được tích lũy chính xác từ các khối nhà cung cấp thô (OpenAI/Claude/Gemini) trước khi dịch, sửa lỗi tải trọng phản hồi trống ở chế độ phát trực tuyến (#470, @zhangqiang8vip) -**feat(providers)**: Chuẩn hóa ID cuộc gọi công cụ 9 ký tự có thể định cấu hình trên mỗi mô hình (kiểu Mistral) — chỉ những mô hình có tùy chọn được bật mới có ID bị cắt ngắn (#470) -**feat(api)**: Key PATCH API được mở rộng để hỗ trợ các trường `allowedConnections`, `name`, `autoResolve`, `isActive` và `accessSchedule` (#470) -**feat(dashboard)**: Bố cục phản hồi đầu tiên trong giao diện người dùng chi tiết nhật ký yêu cầu (#470) -**feat(i18n)**: Bản dịch tiếng Trung (zh-CN) được cải tiến — bản dịch lại hoàn chỉnh (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Tách trường `model` được chèn khỏi nội dung yêu cầu — API Kiro từ chối các trường cấp cao nhất không xác định (#478, @prakersh) -**sửa (cách sử dụng)**: Bao gồm mã thông báo đọc bộ đệm + tạo bộ đệm trong tổng dữ liệu đầu vào lịch sử sử dụng để phân tích chính xác (#477, @prakersh) -**fix(callLogs)**: Hỗ trợ các trường sử dụng định dạng Claude (`input_tokens`/`output_tokens`) cùng với định dạng OpenAI, bao gồm tất cả các biến thể mã thông báo bộ đệm (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: Nhà cung cấp Gói mã hóa Bailian với các URL cơ sở có thể chỉnh sửa, cùng với sự đóng góp của cộng đồng cho Đám mây Alibaba và Mã hóa Kimi.### Tính năng

-**feat(providers)**: Đã thêm Kế hoạch mã hóa Bailian (`bailian-coding-plan`) — Alibaba Model Studio với API tương thích với Anthropic. Danh mục tĩnh gồm 8 model gồm Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 và Kimi K2.5. Bao gồm xác thực xác thực tùy chỉnh (400=valid, 401/403=invalid) (#467, @Mind-Dragon) -**feat(admin)**: URL mặc định có thể chỉnh sửa trong luồng tạo/chỉnh sửa Quản trị nhà cung cấp — người dùng có thể định cấu hình URL cơ sở tùy chỉnh cho mỗi kết nối. Vẫn tồn tại trong `providerSpecificData.baseUrl` với việc xác thực lược đồ Zod từ chối các lược đồ không phải http(s) (#467)### 🧪 Tests

- Đã thêm hơn 30 bài kiểm tra đơn vị và 2 kịch bản e2e cho nhà cung cấp Kế hoạch mã hóa Bailian bao gồm xác thực xác thực, tăng cường lược đồ, hành vi cấp tuyến đường và tích hợp nhiều lớp---

## [2.7.10] — 2026-03-19

> Chạy nước rút: Hai nhà cung cấp mới do cộng đồng đóng góp (Alibaba Cloud Coding, Kimi Coding API-key) và Docker pino fix.### Tính năng

-**feat(providers)**: Đã thêm hỗ trợ Kế hoạch mã hóa đám mây của Alibaba với hai điểm cuối tương thích với OpenAI — `alicode` (Trung Quốc) và `alicode-intl` (Quốc tế), mỗi điểm có 8 mẫu (#465, @dtk1985) -**feat(providers)**: Đã thêm đường dẫn nhà cung cấp `kimi-coding-apikey` chuyên dụng — Quyền truy cập Kimi Coding dựa trên khóa API không còn bị ép buộc thông qua tuyến `kimi-coding` chỉ OAuth nữa. Bao gồm đăng ký, hằng số, API mô hình, cấu hình và kiểm tra xác thực (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: Đã thêm phụ thuộc `split2` bị thiếu vào hình ảnh Docker — `pino-abstract-transport` yêu cầu nó trong thời gian chạy nhưng nó không được sao chép vào vùng chứa độc lập, khiến `Không thể tìm thấy mô-đun 'split2'` gặp sự cố (#459)---

## [2.7.9] — 2026-03-18

> Chạy nước rút: Hỗ trợ nguyên bản tính năng chuyển qua đường dẫn con phản hồi Codex, khắc phục sự cố Windows MITM và điều chỉnh lược đồ tác nhân Combos.### Tính năng

-**feat(codex)**: Truyền qua đường dẫn phụ phản hồi gốc cho Codex — định tuyến nguyên bản `POST /v1/responses/compact` tới Codex ngược dòng, duy trì khả năng tương thích với Mã Claude mà không loại bỏ hậu tố `/compact` (#457)### 🐛 Bug Fixes

-**fix(combos)**: Lược đồ Zod (`updateComboSchema` và `createComboSchema`) hiện bao gồm `system_message`, `tool_filter_regex` và `context_cache_protection`. Sửa lỗi trong đó các cài đặt dành riêng cho tác nhân được tạo qua bảng điều khiển bị lớp xác thực phụ trợ âm thầm loại bỏ (#458) -**fix(mitm)**: Đã sửa lỗi cấu hình Kiro MITM trên Windows — `node-machine-id` không thành công do thiếu `REG.exe` env và dự phòng đã gây ra lỗi nghiêm trọng `crypto is not known`. Dự phòng bây giờ nhập tiền điện tử một cách an toàn và chính xác (#456)---

## [2.7.8] — 2026-03-18

> Chạy nước rút: Lỗi tiết kiệm ngân sách + tính năng đại lý kết hợp UI + sửa lỗi bảo mật thẻ omniModel.### 🐛 Bug Fixes

-**fix(ngân sách)**: "Save Limits" không còn trả về 422 — `warningThreshold` hiện được gửi chính xác dưới dạng phân số (0–1) thay vì phần trăm (0–100) (#451) -**fix(combos)**: Thẻ bộ đệm nội bộ `<omniModel>` hiện đã bị xóa trước khi chuyển tiếp yêu cầu đến nhà cung cấp, ngăn chặn việc ngắt phiên bộ đệm (#454)### Tính năng

-**feat(combos)**: Phần Tính năng tác nhân được thêm vào phương thức tạo/chỉnh sửa kết hợp — hiển thị ghi đè `system_message`, `tool_filter_regex` và `context_cache_protection` trực tiếp từ bảng điều khiển (#454)---

## [2.7.7] — 2026-03-18

> Chạy nước rút: Sự cố pino của Docker, sửa lỗi nhân viên phản hồi Codex CLI, đồng bộ hóa khóa gói.### 🐛 Bug Fixes

-**fix(docker)**: `pino-abstract-transport` và `pino-pretty` hiện được sao chép rõ ràng trong giai đoạn chạy Docker — Dấu vết độc lập của Next.js bỏ lỡ các phần mềm ngang hàng này, gây ra lỗi `Không thể tìm thấy mô-đun pino-abstract-transport` khi khởi động (#449) -**fix(responses)**: Xóa `initTranslators()` khỏi tuyến `/v1/responses` — đã làm hỏng nhân viên Next.js với `nhân viên đã thoát` uncaughtException trên các yêu cầu Codex CLI (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` hiện đã được cam kết trên mọi phiên bản để đảm bảo Docker `npm ci` sử dụng các phiên bản phụ thuộc chính xác---

## [2.7.5] — 2026-03-18

> Sprint: Cải tiến UX và sửa lỗi kiểm tra tình trạng Windows CLI.### 🐛 Bug Fixes

-**fix(ux)**: Hiển thị gợi ý mật khẩu mặc định trên trang đăng nhập — người dùng mới hiện thấy `"Mật khẩu mặc định: 123456"` bên dưới phần nhập mật khẩu (#437) -**fix(cli)**: Claude CLI và các công cụ cài đặt npm khác hiện được phát hiện chính xác là có thể chạy được trên Windows — spawn sử dụng `shell:true` để phân giải các trình bao bọc `.cmd` thông qua PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Chạy nước rút: Trang tổng quan Công cụ tìm kiếm, bản sửa lỗi i18n, giới hạn Copilot, bản sửa lỗi xác thực Serper.### Tính năng

-**feat(tìm kiếm)**: Thêm Sân chơi tìm kiếm (điểm cuối thứ 10), trang Công cụ tìm kiếm với So sánh nhà cung cấp/Đường dẫn xếp hạng lại/Lịch sử tìm kiếm, định tuyến xếp hạng lại cục bộ, bảo vệ xác thực trên API tìm kiếm (#443 của @Regis-RCR)

- Tuyến mới: `/dashboard/search-tools`
- Mục nhập thanh bên trong phần Gỡ lỗi
- `GET /api/search/providers` và `GET /api/search/stats` với bộ bảo vệ xác thực
- Định tuyến nhà cung cấp cục bộ_nodes cho `/v1/rerank`
- Hơn 30 khóa i18n trong không gian tên tìm kiếm### 🐛 Bug Fixes

-**sửa (tìm kiếm)**: Sửa lỗi trình chuẩn hóa tin tức Brave (trả về 0 kết quả), thực thi việc cắt bớt max_results sau chuẩn hóa, sửa URL tìm nạp trang Điểm cuối (#443 của @Regis-RCR) -**fix(analytics)**: Bản địa hóa nhãn ngày/ngày phân tích — thay thế các chuỗi tiếng Bồ Đào Nha được mã hóa cứng bằng `Intl.DateTimeFormat(locale)` (#444 bởi @hijak) -**fix(copilot)**: Hiển thị đúng loại tài khoản GitHub Copilot, lọc các hàng hạn ngạch không giới hạn gây hiểu lầm từ bảng điều khiển giới hạn (#445 bởi @hijak) -**fix(providers)**: Dừng từ chối các khóa API Serper hợp lệ - coi các phản hồi không phải 4xx là xác thực hợp lệ (#446 bởi @hijak)---

## [2.7.3] — 2026-03-18

> Chạy nước rút: Bản sửa lỗi dự phòng hạn ngạch API trực tiếp của Codex.### 🐛 Bug Fixes

-**fix(codex)**: Chặn các tài khoản cạn kiệt hàng tuần trong dự phòng API trực tiếp (#440)

- Khớp tiền tố `resolveQuotaWindow()`: `"weekly"` hiện khớp với các khóa bộ đệm `"weekly (7d)"`
- `applyCodexWindowPolicy()` thực thi chuyển đổi `useWeekly`/`use5h` một cách chính xác
- 4 bài kiểm tra hồi quy mới (tổng cộng 766)---

## [2.7.2] — 2026-03-18

> Chạy nước rút: Sửa lỗi tương phản giao diện người dùng ở chế độ ánh sáng.### 🐛 Bug Fixes

-**fix(logs)**: Sửa độ tương phản của chế độ ánh sáng trong các nút bộ lọc nhật ký yêu cầu và huy hiệu kết hợp (#378)

- Các nút bộ lọc Lỗi/Thành công/Combo hiện có thể đọc được ở chế độ ánh sáng
- Huy hiệu hàng combo sử dụng màu tím mạnh hơn ở chế độ ánh sáng---

## [2.7.1] — 2026-03-17

> Sprint: Định tuyến tìm kiếm trên web hợp nhất (POST /v1/search) với 5 nhà cung cấp + Bản sửa lỗi bảo mật Next.js 16.1.7 (6 CVE).### ✨ New Features

-**feat(search)**: Định tuyến tìm kiếm trên web hợp nhất — `POST /v1/search` với 5 nhà cung cấp (Serper, Brave, Perplexity, Exa, Tavily)

- Tự động chuyển đổi dự phòng giữa các nhà cung cấp, hơn 6.500 lượt tìm kiếm miễn phí/tháng
- Bộ nhớ đệm trong bộ nhớ có yêu cầu kết hợp (TTL có thể định cấu hình)
- Bảng điều khiển: tab Phân tích tìm kiếm trong `/dashboard/analytics` với thông tin chi tiết về nhà cung cấp, tỷ lệ truy cập bộ đệm, theo dõi chi phí
- API mới: `GET /api/v1/search/analytics` để thống kê yêu cầu tìm kiếm
- Di chuyển cơ sở dữ liệu: cột `request_type` trên `call_logs` để theo dõi yêu cầu không phải trò chuyện
- Xác thực Zod (`v1SearchSchema`), kiểm soát xác thực, chi phí được ghi lại qua `recordCost()`### Bảo mật

-**deps**: Next.js 16.1.6 → 16.1.7 — sửa 6 CVE: -**Nghiêm trọng**: CVE-2026-29057 (Chuyển lậu yêu cầu HTTP qua http-proxy) -**Cao**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Hành động máy chủ) -**Trung bình**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Tập tin                                                          | Mục đích                                             |
| ---------------------------------------------------------------- | ---------------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Trình xử lý tìm kiếm với định tuyến 5 nhà cung cấp   |
| `open-sse/config/searchRegistry.ts`                              | Đăng ký nhà cung cấp (auth, chi phí, hạn ngạch, TTL) |
| `open-sse/services/searchCache.ts`                               | Bộ nhớ đệm trong bộ nhớ có yêu cầu kết hợp           |
| `src/app/api/v1/search/route.ts`                                 | Tuyến đường Next.js (POST + GET)                     |
| `src/app/api/v1/search/analytics/route.ts`                       | API thống kê tìm kiếm                                |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Tab trang tổng quan phân tích                        |
| `src/lib/db/migrations/007_search_request_type.sql`              | Di chuyển cơ sở dữ liệu                              |
| `tests/unit/search-registry.test.mjs`                            | 277 dòng bài kiểm tra đơn vị                         | --- |

## [2.7.0] — 2026-03-17

> Sprint: Các tính năng lấy cảm hứng từ ClawRouter — cờ gọi công cụ, phát hiện ý định đa ngôn ngữ, dự phòng dựa trên điểm chuẩn, loại bỏ trùng lặp yêu cầu, RouterStrategy có thể cắm thêm, định giá Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5.### ✨ New Models & Pricing

-**feat(giá)**: xAI Grok-4 Fast — `$0,20/$0,50 cho mỗi 1M token`, độ trễ 1143ms p50, hỗ trợ gọi công cụ -**feat(giá)**: xAI Grok-4 (tiêu chuẩn) — `$0,20/$1,50 cho mỗi 1M token`, lý do hàng đầu -**feat(giá)**: GLM-5 qua Z.AI — `$0,5/1M`, bối cảnh đầu ra 128K -**feat(giá)**: MiniMax M2.5 — `$0,30/1 triệu đầu vào`, lý luận + nhiệm vụ tác nhân -**feat(giá)**: DeepSeek V3.2 — giá cập nhật `$0,27/$1,10 mỗi 1 triệu` -**feat(giá)**: Kimi K2.5 via Moonshot API — truy cập trực tiếp Moonshot API -**feat(providers)**: Z.AI provider added (`zai` alias) — GLM-5 family with 128K output### 🧠 Routing Intelligence

-**feat(registry)**: cờ `toolCalling` cho mỗi mô hình trong sổ đăng ký nhà cung cấp — các combo giờ đây có thể ưu tiên/yêu cầu các mô hình có khả năng gọi công cụ -**feat(ghi điểm)**: Phát hiện ý định đa ngôn ngữ để chấm điểm AutoCombo — tập lệnh/mẫu ngôn ngữ PT/ZH/ES/AR ảnh hưởng đến việc lựa chọn mô hình theo ngữ cảnh yêu cầu -**feat(dự phòng)**: Chuỗi dự phòng dựa trên điểm chuẩn — dữ liệu độ trễ thực (p50 từ `comboMetrics`) được sử dụng để sắp xếp lại mức độ ưu tiên dự phòng một cách linh hoạt -**feat(dedup)**: Yêu cầu loại bỏ trùng lặp thông qua hàm băm nội dung — Cửa sổ tạm thời 5 giây ngăn các cuộc gọi trùng lặp của nhà cung cấp khỏi việc thử lại máy khách -**feat(router)**: Giao diện `RouterStrategy` có thể cắm được trong `autoCombo/routerStrategy.ts` — logic định tuyến tùy chỉnh có thể được đưa vào mà không cần sửa đổi lõi### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 lược đồ công cụ nâng cao mới: `omniroute_get_provider_metrics` (p50/p95/p99 cho mỗi nhà cung cấp) và `omniroute_explain_route` (giải thích quyết định định tuyến) -**feat(mcp)**: Đã cập nhật phạm vi xác thực của công cụ MCP — đã thêm phạm vi `metrics:read` cho các công cụ chỉ số của nhà cung cấp -**feat(mcp)**: `omniroute_best_combo_for_task` hiện chấp nhận tham số `linguHint` để định tuyến đa ngôn ngữ### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` extended with real-time latency percentile tracking per provider/account -**feat(health)**: Health API (`/api/monitoring/health`) hiện trả về các trường `p50Latency` và `errorRate` của mỗi nhà cung cấp -**feat(usage)**: Di chuyển lịch sử sử dụng để theo dõi độ trễ trên mỗi mô hình### 🗄️ DB Migrations

-**feat(migrations)**: Cột mới `latency_p50` trong bảng `combo_metrics` — không phá vỡ, an toàn cho người dùng hiện tại### 🐛 Bug Fixes / Closures

-**đóng(#411)**: độ phân giải mô-đun băm tốt hơn-sqlite3 trên Windows — đã sửa trong v2.6.10 (f02c5b5) -**đóng(#409)**: Việc hoàn thành trò chuyện Copilot của GitHub không thành công với mô hình Claude khi tệp được đính kèm — đã được sửa trong v2.6.9 (838f1d6) -**đóng(#405)**: Bản sao của #411 — đã giải quyết## [2.6.10] — 2026-03-17

> Sửa lỗi Windows: tải xuống dựng sẵn tốt hơn-sqlite3 mà không cần nút-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: Trên Windows, `npm install -g omniroute` từng bị lỗi với `better_sqlite3.node không phải là ứng dụng Win32 hợp lệ` vì tệp nhị phân gốc đi kèm được biên dịch cho Linux. Thêm**Chiến lược 1.5**vào `scripts/postinstall.mjs`: sử dụng `@mapbox/node-pre-gyp install --fallback-to-build=false` (được gói trong `better-sqlite3`) để tải xuống tệp nhị phân dựng sẵn chính xác cho OS/arch hiện tại mà không yêu cầu bất kỳ công cụ xây dựng nào (không có nút-gyp, không có Python, không có MSVC). Chỉ quay lại `npm xây dựng lại` nếu quá trình tải xuống không thành công. Thêm thông báo lỗi dành riêng cho nền tảng với hướng dẫn sửa lỗi thủ công rõ ràng.---

## [2.6.9] — 2026-03-17

> Sửa lỗi CI (t11 với mọi ngân sách), sửa lỗi #409 (tệp đính kèm qua Copilot+Claude), phát hành bản sửa lỗi quy trình làm việc.### 🐛 Bug Fixes

-**fix(ci)**: Xóa từ "bất kỳ" khỏi các nhận xét trong `openai-responses.ts` và `chatCore.ts` không đạt được t11 `bất kỳ` kiểm tra ngân sách nào (dương tính giả từ các nhận xét tính toán bằng biểu thức chính quy) -**fix(chatCore)**: Chuẩn hóa các loại phần nội dung không được hỗ trợ trước khi chuyển tiếp đến nhà cung cấp (#409 — Con trỏ gửi `{type:"file"}` khi tệp `.md` được đính kèm; Copilot và các nhà cung cấp tương thích OpenAI khác từ chối với "loại phải là 'image_url' hoặc 'text'"; fix chuyển đổi các khối `file`/`document` thành `text` và loại bỏ các loại không xác định)### 🔧 Workflow

-**việc vặt(tạo-phát hành)**: Thêm QUY TẮC CAM KẾT ATOMIC — phiên bản gập (`bản vá phiên bản npm`) PHẢI xảy ra trước khi cam kết các tệp tính năng để đảm bảo thẻ luôn trỏ đến một cam kết chứa tất cả các thay đổi phiên bản cùng nhau---

## [2.6.8] — 2026-03-17

> Chạy nước rút: Kết hợp dưới dạng Tác nhân (lời nhắc hệ thống + bộ lọc công cụ), Bảo vệ bộ nhớ đệm theo ngữ cảnh, Tự động cập nhật, Nhật ký chi tiết, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE combo THÊM CỘT system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: Bảng `request_detail_logs` mới với trình kích hoạt bộ đệm vòng 500 mục nhập, chọn tham gia thông qua chuyển đổi cài đặt### Tính năng

-**feat(combo)**: Ghi đè tin nhắn hệ thống trên mỗi Combo (#399 — trường `system_message` thay thế hoặc đưa vào lời nhắc hệ thống trước khi chuyển tiếp đến nhà cung cấp) -**feat(combo)**: Tool Filter Regex per Combo (#399 — `tool_filter_regex` chỉ giữ lại các công cụ khớp với mẫu; hỗ trợ các định dạng OpenAI + Anthropic) -**feat(combo)**: Bảo vệ bộ nhớ đệm bối cảnh (#401 — phản hồi thẻ `context_cache_protection` với `<omniModel>nhà cung cấp/mô hình</omniModel>` và mô hình ghim để đảm bảo tính liên tục của phiên) -**feat(settings)**: Tự động cập nhật qua Cài đặt (#320 — `GET /api/system/version` + `POST /api/system/update` — kiểm tra sổ đăng ký npm và cập nhật trong nền khi khởi động lại pm2) -**feat(logs)**: Nhật ký yêu cầu chi tiết (#378 — ghi lại toàn bộ nội dung quy trình ở 4 giai đoạn: yêu cầu của khách hàng, yêu cầu được dịch, phản hồi của nhà cung cấp, phản hồi của khách hàng — chuyển đổi chọn tham gia, cắt 64KB, bộ đệm vòng 500 mục nhập) -**feat(mitm)**: Hồ sơ MITM Kiro IDE (#336 — `src/mitm/targets/kiro.ts` nhắm mục tiêu api.anthropic.com, sử dụng lại cơ sở hạ tầng MITM hiện có)---

## [2.6.7] — 2026-03-17

> Chạy nước rút: Cải tiến SSE, tiện ích mở rộng nhà cung cấp_nodes cục bộ, đăng ký proxy, sửa lỗi chuyển tiếp Claude.### Tính năng

-**feat(health)**: Kiểm tra tình trạng nền cho `provider_nodes` cục bộ với thời gian chờ theo cấp số nhân (30s→300s) và `Promise.allSettled` để tránh bị chặn (#423, @Regis-RCR) -**feat(embeddings)**: Định tuyến `/v1/embeddings` tới `provider_nodes` cục bộ — `buildDynamicEmbeddingProvider()` với xác thực tên máy chủ (#422, @Regis-RCR) -**feat(audio)**: Định tuyến TTS/STT tới `provider_nodes` cục bộ — `buildDynamicAudioProvider()` với bảo vệ SSRF (#416, @Regis-RCR) -**feat(proxy)**: Đăng ký proxy, API quản lý và khái quát hóa giới hạn hạn ngạch (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Loại bỏ các trường dành riêng cho Claude (`siêu dữ liệu`, `anthropic_version`) khi mục tiêu là OpenAI-compat (#421, @prakersh) -**fix(sse)**: Trích xuất việc sử dụng Claude SSE (`input_tokens`, `output_tokens`, cache token) ở chế độ truyền qua (#420, @prakersh) -**fix(sse)**: Tạo `call_id` dự phòng cho các lệnh gọi công cụ có ID bị thiếu/trống (#419, @prakersh) -**fix(sse)**: Chuyển tiếp Claude-to-Claude — phần thân phía trước hoàn toàn nguyên vẹn, không dịch lại (#418, @prakersh) -**fix(sse)**: Lọc các mục `tool_result` mồ côi sau khi nén bối cảnh Mã Claude để tránh 400 lỗi (#417, @prakersh) -**fix(sse)**: Bỏ qua lệnh gọi công cụ tên trống trong trình dịch API Phản hồi để ngăn vòng lặp vô hạn `placeholder_tool` (#415, @prakersh) -**fix(sse)**: Loại bỏ các khối nội dung văn bản trống trước khi dịch (#427, @prakersh) -**fix(api)**: Thêm `refreshable: true` vào cấu hình thử nghiệm Claude OAuth (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` và các devDependency liên quan (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Hotfix: Khả năng tương thích Turbopack/Docker — xóa giao thức `node:` khỏi tất cả các lần nhập `src/`.### 🐛 Bug Fixes

-**fix(build)**: Đã xóa tiền tố giao thức `node:` khỏi câu lệnh `import` trong 17 tệp trong `src/`. Việc nhập `node:fs`, `node:path`, `node:url`, `node:os`, v.v. đã gây ra `tệp Ecmascript có lỗi` trên các bản dựng Turbopack (Next.js 15 Docker) và trên các bản nâng cấp từ các bản cài đặt toàn cầu npm cũ hơn. Các tệp bị ảnh hưởng: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts` và 12 tệp khác trong `src/app/api/` và `src/lib/`. -**việc vặt(quy trình công việc)**: Đã cập nhật `generate-release.md` để thực hiện các bước đồng bộ hóa Docker Hub và triển khai VPS kép**bắt buộc**trong mỗi bản phát hành.---

## [2.6.5] — 2026-03-17

> Sprint: lọc thông số mô hình lý luận, sửa lỗi 404 của nhà cung cấp cục bộ, nhà cung cấp Kilo Gateway, các vấn đề phụ thuộc.### ✨ New Features

-**feat(api)**: Đã thêm**Kilo Gateway**(`api.kilo.ai`) làm nhà cung cấp Khóa API mới (bí danh `kg`) — hơn 335 mô hình, 6 mô hình miễn phí, 3 mô hình định tuyến tự động (`kilo-auto/frontier`, `kilo-auto/balance`, `kilo-auto/free`). Các mô hình chuyển tiếp được hỗ trợ thông qua điểm cuối `/api/gateway/models`. (PR #408 của @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Loại bỏ các tham số không được hỗ trợ cho các mô hình lý luận (o1, o1-mini, o1-pro, o3, o3-mini). Các mô hình trong họ `o1`/`o3` từ chối `nhiệt độ`, `top_p`, `tần số_penalty`, `hiện diện_penalty`, `logprobs`, `top_logprobs` và `n` với HTTP 400. Các tham số hiện bị loại bỏ ở lớp `chatCore` trước khi chuyển tiếp. Sử dụng trường `unsupportedParams` khai báo cho mỗi mô hình và Bản đồ O(1) được tính toán trước để tra cứu. (PR #412 của @Regis-RCR) -**sửa(sse)**: Nhà cung cấp địa phương 404 hiện dẫn đến**khóa chỉ dành cho kiểu máy (5 giây)**thay vì khóa ở cấp độ kết nối (2 phút). Khi một chương trình phụ trợ suy luận cục bộ (Ollama, LM Studio, oMLX) trả về 404 cho một mô hình không xác định, kết nối vẫn hoạt động và các mô hình khác tiếp tục hoạt động ngay lập tức. Đồng thời sửa lỗi tồn tại từ trước trong đó `model` không được chuyển đến `markAccountUnavailable()`. Các nhà cung cấp địa phương được phát hiện qua tên máy chủ (`localhost`, `127.0.0.1`, `::1`, có thể mở rộng qua `LOCAL_HOSTNAMES` env var). (PR #410 của @Regis-RCR)### 📦 Dependencies

- `tốt hơn-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `cơ sở tác nhân` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(providers)**: Đã xóa tên mẫu máy không tồn tại trên 5 nhà cung cấp: -**gemini / gemini-cli**: đã xóa `gemini-3.1-pro/flash` và `gemini-3-*-preview` (không tồn tại trong Google API v1beta); được thay thế bằng `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**phản trọng lực**: đã xóa `gemini-3.1-pro-high/low` và `gemini-3-flash` (bí danh nội bộ không hợp lệ); được thay thế bằng mô hình 2.x thực -**github (Copilot)**: đã xóa `gemini-3-flash-preview` và `gemini-3-pro-preview`; được thay thế bằng `gemini-2.5-flash` -**nvidia**: đã sửa `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM sử dụng không gian tên `meta/` cho các mô hình Meta); đã thêm `nvidia/llama-3.1-70b-instruct` và `nvidia/llama-3.1-405b-instruct` -**fix(db/combo)**: Đã cập nhật tổ hợp `free-stack` trên DB từ xa: đã xóa `qw/qwen3-code-plus` (mã thông báo làm mới đã hết hạn), đã sửa `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct`, đã sửa `gemini/gemini-3.1-flash` → `gemini/gemini-2.5-flash`, đã thêm `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Chạy nước rút: dải băm zod/pino được đưa vào quy trình xây dựng, Đã thêm nhà cung cấp tổng hợp, đường dẫn VPS PM2 đã được sửa.### 🐛 Bug Fixes

-**sửa (xây dựng)**: Dải băm Turbopack hiện chạy ở**thời gian biên dịch**cho TẤT CẢ các gói — không chỉ `better-sqlite3`. Bước 5.6 trong `prepublish.mjs` duyệt từng `.js` trong `app/.next/server/` và loại bỏ hậu tố hex 16 ký tự khỏi bất kỳ `require()` băm nào. Sửa `zod-dcb22c...`, `pino-...`, v.v. MODULE_NOT_FOUND khi cài đặt npm toàn cầu. Đóng #398 -**sửa (triển khai)**: PM2 trên cả hai VPS đều trỏ đến các thư mục git-clone cũ. Được định cấu hình lại thành `app/server.js` trong gói toàn cầu npm. Đã cập nhật quy trình làm việc `/deploy-vps` để sử dụng `npm pack + scp` (đăng ký npm từ chối các gói 299MB).### Tính năng

-**feat(provider)**: Tổng hợp ([synthetic.new](https://synthetic.new)) — suy luận tương thích với OpenAI tập trung vào quyền riêng tư. `passthroughModels: true` dành cho danh mục mô hình HuggingFace động. Các model ban đầu: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 của @Regis-RCR)### 📋 Issues Closed

-**đóng #398**: hồi quy băm npm — được sửa bằng dải băm thời gian biên dịch trong bản xuất bản trước -**phân loại #324**: Ảnh chụp màn hình lỗi không có bước — chi tiết sao chép được yêu cầu---

## [2.6.2] — 2026-03-16

> Chạy nước rút: đã sửa lỗi băm mô-đun hoàn toàn, hợp nhất 2 PR (bộ lọc công cụ Anthropic + đường dẫn điểm cuối tùy chỉnh), nhà cung cấp Alibaba Cloud DashScope đã được thêm vào, 3 vấn đề cũ đã được giải quyết.### 🐛 Bug Fixes

-**fix(build)**: dải băm webpack `externals` mở rộng để bao gồm TẤT CẢ `serverExternalPackages`, không chỉ `better-sqlite3`. Next.js 16 Turbopack băm `zod`, `pino` và mọi gói bên ngoài máy chủ khác thành các tên như `zod-dcb22c6336e0bc69` không tồn tại trong `node_modules` khi chạy. Giờ đây, tất cả các biểu thức chính quy HASH_PATTERN sẽ loại bỏ hậu tố 16 ký tự và quay trở lại tên gói cơ sở. Đồng thời đã thêm `NEXT_PRIVATE_BUILD_WORKER=0` trong `prepublish.mjs` để củng cố chế độ webpack, cộng với tính năng quét sau xây dựng để báo cáo mọi giới thiệu đã băm còn lại. (#396, #398, PR #403) -**sửa(trò chuyện)**: Tên công cụ có định dạng nhân loại (`tool.name` không có trình bao bọc `.function`) đã bị bộ lọc tên trống được giới thiệu trong #346 âm thầm loại bỏ. LiteLLM proxy yêu cầu có tiền tố `anthropic/` ở định dạng API Thông báo Anthropic, khiến tất cả các công cụ bị lọc và Anthropic trả về `400: tool_choice.any chỉ có thể được chỉ định khi cung cấp công cụ`. Đã sửa lỗi bằng cách quay lại `tool.name` khi không có `tool.function.name`. Đã thêm 8 bài kiểm tra đơn vị hồi quy. (PR #397)### Tính năng

-**feat(api)**: Đường dẫn điểm cuối tùy chỉnh cho các nút nhà cung cấp tương thích với OpenAI — định cấu hình `chatPath` và `modelsPath` cho mỗi nút (ví dụ: `/v4/chat/completions`) trong giao diện người dùng kết nối nhà cung cấp. Bao gồm di chuyển DB (`003_provider_node_custom_paths.sql`) và dọn dẹp đường dẫn URL (không truyền tải `..`, phải bắt đầu bằng `/`). (PR #400) -**feat(provider)**: Alibaba Cloud DashScope được thêm làm nhà cung cấp tương thích với OpenAI. Điểm cuối quốc tế: `dashscope-intl.aliyuncs.com/compire-mode/v1`. 12 mẫu: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-code-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Xác thực: Khóa API Bearer.### 📋 Issues Closed

-**đóng #323**: Lỗi kết nối Cline `[object Object]` — đã sửa trong v2.3.7; hướng dẫn người dùng nâng cấp từ v2.2.9 -**đóng #337**: Theo dõi tín dụng Kiro — được triển khai trong v2.5.5 (#381); trỏ người dùng tới Bảng điều khiển → Cách sử dụng -**phân loại #402**: ARM64 macOS DMG bị hỏng — yêu cầu phiên bản macOS, lỗi chính xác và đưa ra lời khuyên về cách giải quyết `xattr -d com.apple.quarantine`---

## [2.6.1] — 2026-03-15

> Sửa lỗi khởi động quan trọng: Các lượt cài đặt npm toàn cầu v2.6.0 gặp lỗi 500 do lỗi băm tên mô-đun Turbopack/webpack trong hook công cụ Next.js 16.### 🐛 Bug Fixes

-**fix(build)**: Buộc `better-sqlite3` luôn được yêu cầu theo tên gói chính xác của nó trong gói máy chủ webpack. Next.js 16 đã biên dịch móc đo lường thành một đoạn riêng biệt và phát ra `require('better-sqlite3-<hash>')` — một tên mô-đun băm không tồn tại trong `node_modules` — mặc dù gói đã được liệt kê trong `serverExternalPackages`. Đã thêm chức năng `externals` rõ ràng vào cấu hình webpack của máy chủ để gói luôn phát ra `require('better-sqlite3')`, giải quyết lỗi khởi động `500 Internal Server Error` khi cài đặt sạch toàn cầu. (#394, PR #395)### 🔧 CI

-**ci**: Đã thêm `workflow_dispatch` vào `npm-publish.yml` với tính năng bảo vệ đồng bộ hóa phiên bản cho trình kích hoạt thủ công (#392) -**ci**: Đã thêm `workflow_dispatch` vào `docker-publish.yml`, cập nhật GitHub Actions lên phiên bản mới nhất (#392)---

## [2.6.0] - 2026-03-15

> Chạy nước rút giải quyết vấn đề: Đã sửa 4 lỗi, cải thiện trải nghiệm người dùng nhật ký, thêm tính năng theo dõi tín dụng Kiro.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI và SD WebUI không còn xuất hiện trong danh sách nhà cung cấp trang Media khi chưa được định cấu hình — tìm nạp `/api/providers` khi gắn kết và ẩn các nhà cung cấp cục bộ không có kết nối (#390) -**fix(auth)**: Vòng quay không còn chọn lại các tài khoản bị giới hạn tỷ lệ ngay sau khi hồi chiêu — `backoffLevel` hiện được sử dụng làm khóa sắp xếp chính trong vòng quay LRU (#340) -**fix(oauth)**: Qoder (và các nhà cung cấp khác chuyển hướng đến giao diện người dùng của riêng họ) không còn để phương thức OAuth bị kẹt ở "Đang chờ ủy quyền" — trình phát hiện đóng cửa sổ bật lên tự động chuyển sang chế độ nhập URL thủ công (#344) -**sửa (nhật ký)**: Bảng nhật ký yêu cầu hiện có thể đọc được ở chế độ sáng - huy hiệu trạng thái, số lượng mã thông báo và thẻ kết hợp sử dụng các lớp màu `tối:` thích ứng (#378)### Tính năng

-**feat(kiro)**: Đã thêm tính năng theo dõi tín dụng Kiro vào trình tìm nạp mức sử dụng — truy vấn `getUserCredits` từ điểm cuối AWS CodeWhisperer (#337)### 🛠 Chores

-**việc vặt(kiểm tra)**: Đã căn chỉnh `test:plan3`, `test:fixes`, `test:security` để sử dụng cùng một trình tải `tsx/esm` như `npm test` — loại bỏ các kết quả âm tính giả về độ phân giải mô-đun trong các lần chạy mục tiêu (PR #386)---

## [2.5.9] - 2026-03-15

> Sửa lỗi thông qua gốc Codex + tăng cường xác thực nội dung tuyến đường.### 🐛 Bug Fixes

-**fix(codex)**: Giữ nguyên khả năng truyền API phản hồi gốc cho máy khách Codex — tránh các đột biến dịch không cần thiết (PR #387) -**fix(api)**: Xác thực các nội dung yêu cầu trên các tuyến định giá/đồng bộ hóa và định tuyến tác vụ — ngăn chặn sự cố từ các đầu vào không đúng định dạng (PR #388) -**fix(auth)**: Bí mật JWT vẫn tồn tại khi khởi động lại thông qua `src/lib/db/secrets.ts` — loại bỏ lỗi 401 sau khi khởi động lại pm2 (PR #388)---

## [2.5.8] - 2026-03-15

> Sửa lỗi bản dựng: khôi phục kết nối VPS bị hỏng do xuất bản v2.5.7 chưa hoàn chỉnh.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` vẫn sử dụng cờ `--webpack` không được dùng nữa khiến bản dựng độc lập Next.js âm thầm thất bại — npm xuất bản hoàn tất mà không có `app/server.js`, phá vỡ quá trình triển khai VPS---

## [2.5.7] - 2026-03-15

> Sửa lỗi xử lý lỗi sân chơi phương tiện.### 🐛 Bug Fixes

-**fix(media)**: Bản chép lời "Yêu cầu khóa API" dương tính giả khi âm thanh không có lời nói (âm nhạc, im lặng) — thay vào đó hiện hiển thị "Không phát hiện thấy lời nói" -**fix(media)**: `upstreamErrorResponse` trong `audioTranscription.ts` và `audioSpeech.ts` hiện trả về JSON thích hợp (`{error:{message}}`), cho phép phát hiện lỗi thông tin xác thực 401/403 chính xác trong MediaPageClient -**fix(media)**: `parseApiError` hiện xử lý trường `err_msg` của Deepgram và phát hiện `"api key"` trong các thông báo lỗi để phân loại lỗi thông tin xác thực chính xác---

## [2.5.6] - 2026-03-15

> Sửa lỗi bảo mật/xác thực quan trọng: OAuth chống trọng lực bị hỏng + Phiên JWT bị mất sau khi khởi động lại.### 🐛 Bug Fixes

-**fix(oauth) #384**: Anti Gravity Google OAuth hiện gửi chính xác `client_secret` tới điểm cuối mã thông báo. Dự phòng cho `ANTIGRAVITY_OAUTH_CLIENT_SECRET` là một chuỗi trống, là chuỗi giả — vì vậy, `client_secret` chưa bao giờ được đưa vào yêu cầu, gây ra lỗi `"client_secret bị thiếu"` cho tất cả người dùng không có biến env tùy chỉnh. Đóng #383. -**fix(auth) #385**: `JWT_SECRET` hiện được lưu giữ ở SQLite (`namespace='secrets'`) ở thế hệ đầu tiên và được tải lại vào những lần khởi động tiếp theo. Trước đây, một bí mật ngẫu nhiên mới được tạo ra mỗi lần khởi động quy trình, làm mất hiệu lực tất cả các cookie/phiên hiện có sau bất kỳ lần khởi động lại hoặc nâng cấp nào. Ảnh hưởng đến cả `JWT_SECRET` và `API_KEY_SECRET`. Đóng #382.---

## [2.5.5] - 2026-03-15

> Sửa lỗi trùng lặp danh sách mô hình, tăng cường độ cứng bản dựng độc lập của Electron và theo dõi tín dụng Kiro.### 🐛 Bug Fixes

-**fix(models) #380**: `GET /api/models` hiện bao gồm các bí danh của nhà cung cấp khi xây dựng bộ lọc nhà cung cấp đang hoạt động — các mô hình cho `claude` (bí danh `cc`) và `github` (bí danh `gh`) luôn được hiển thị bất kể kết nối có được định cấu hình hay không, vì khóa `PROVIDER_MODELS` là bí danh nhưng các kết nối DB được lưu trữ dưới ID nhà cung cấp. Đã sửa lỗi bằng cách mở rộng từng ID nhà cung cấp đang hoạt động để bao gồm cả bí danh của nó thông qua `PROVIDER_ID_TO_ALIAS`. Đóng #353. -**fix(electron) #379**: `scripts/prepare-electron-standalone.mjs` mới tạo ra một gói `/.next/electron-standalone` chuyên dụng trước khi đóng gói Electron. Hủy bỏ với lỗi rõ ràng nếu `node_modules` là một liên kết tượng trưng (trình xây dựng điện tử sẽ gửi phần phụ thuộc thời gian chạy trên máy xây dựng). Dọn dẹp đường dẫn đa nền tảng thông qua `path.basename`. Bởi @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Theo dõi số dư tín dụng Kiro — điểm cuối sử dụng hiện trả về dữ liệu tín dụng cho tài khoản Kiro bằng cách gọi `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (cùng điểm cuối Kiro IDE sử dụng nội bộ). Trả về các khoản tín dụng còn lại, tổng trợ cấp, ngày gia hạn và cấp đăng ký. Đóng #337.## [2.5.4] - 2026-03-15

> Sửa lỗi khởi động trình ghi nhật ký, sửa lỗi bảo mật khởi động đăng nhập và cải thiện độ tin cậy của HMR dành cho nhà phát triển. Cơ sở hạ tầng CI được củng cố.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Khôi phục đường dẫn logger vận chuyển pino — `formatters.level` kết hợp với `transport.targets` bị pino từ chối. Các cấu hình được vận chuyển hỗ trợ hiện loại bỏ trình định dạng cấp độ thông qua `getTransportCompatibleConfig()`. Đồng thời sửa lỗi ánh xạ mức số trong `/api/logs/console`: `30→info, 40→warn, 50→error` (đã được dịch chuyển một). -**fix(đăng nhập) #375**: Trang đăng nhập hiện khởi động từ điểm cuối `/api/settings/require-login` công khai thay vì `/api/settings` được bảo vệ. Trong các thiết lập được bảo vệ bằng mật khẩu, trang xác thực trước đã nhận được lỗi 401 và quay trở lại mặc định an toàn một cách không cần thiết. Tuyến công cộng hiện trả về tất cả siêu dữ liệu bootstrap (`requireLogin`, `hasPassword`, `setupComplete`) với lỗi dự phòng 200. -**fix(dev) #374**: Thêm `localhost` và `127.0.0.1` vào `allowedDevOrigins` trong `next.config.mjs` — Websocket HMR đã bị chặn khi truy cập ứng dụng qua địa chỉ loopback, tạo ra các cảnh báo nhiều nguồn gốc lặp đi lặp lại.### 🔧 CI & Infrastructure

-**Sửa lỗi ESLint OOM**: `eslint.config.mjs` hiện bỏ qua `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**`, và `clipr/**` — ESLint đã gặp sự cố với OOM heap JS bằng cách quét các đốm màu nhị phân VS Code và các đoạn được biên dịch. -**Sửa lỗi kiểm tra đơn vị**: Đã xóa `ALTER TABLE Provider_connections ADD COLUMN "group"` khỏi 2 tệp kiểm tra — cột hiện là một phần của lược đồ cơ sở (được thêm vào #373), gây ra `SQLITE_ERROR: tên cột trùng lặp` trên mỗi lần chạy CI. -**Pre-commit hook**: Đã thêm `npm run test:unit` vào `.husky/pre-commit` — các bài kiểm tra đơn vị hiện chặn các lần xác nhận bị hỏng trước khi chúng đạt đến CI.## [2.5.3] - 2026-03-14

> Critical bugfixes: DB schema migration, startup env loading, provider error state clearing, and i18n tooltip fix. Cải thiện chất lượng mã trên mỗi PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Thêm cột `provider_connections.group` vào lược đồ cơ sở + di chuyển chèn lấp cho cơ sở dữ liệu hiện có — cột đã được sử dụng trong tất cả các truy vấn nhưng bị thiếu trong định nghĩa lược đồ -**fix(i18n) #371**: Thay thế khóa `t("deleteConnection")` không tồn tại bằng khóa `providers.delete` hiện có — sửa lỗi `MISSING_MESSAGE: lỗi thời gian chạy của nhà cung cấp.deleteConnection` trên trang chi tiết về nhà cung cấp -**fix(auth) #372**: Xóa siêu dữ liệu lỗi cũ (`errorCode`, `lastErrorType`, `lastErrorSource`) khỏi tài khoản nhà cung cấp sau khi khôi phục chính hãng — trước đó, các tài khoản được khôi phục tiếp tục xuất hiện dưới dạng không thành công -**fix(startup) #369**: Thống nhất tải env trên `npm run start`, `run-standalone.mjs` và Electron để tôn trọng `DATA_DIR/.env → ~/.omniroute/.env → ..env` ưu tiên — ngăn việc tạo `STORAGE_ENCRYPTION_KEY` mới trên cơ sở dữ liệu được mã hóa hiện có### 🔧 Code Quality

- Đã ghi lại các mẫu `result.success` và `response?.ok` trong `auth.ts` (cả hai đều có chủ ý, hiện đã được giải thích)
- Chuẩn hóa `overridePath?.trim()` trong `electron/main.js` để khớp với `bootstrap-env.mjs`
- Đã thêm nhận xét thứ tự hợp nhất `preferredEnv` khi khởi động Electron

> Chính sách hạn ngạch tài khoản Codex với tính năng tự động xoay vòng, chuyển đổi cấp độ nhanh, mô hình gpt-5.4 và sửa nhãn phân tích.### ✨ New Features (PRs #366, #367, #368)

-**Chính sách hạn ngạch Codex (PR #366)**: Chuyển đổi cửa sổ hạn ngạch 5 giờ/hàng tuần cho mỗi tài khoản trong trang tổng quan Nhà cung cấp. Tài khoản sẽ tự động bị bỏ qua khi cửa sổ kích hoạt đạt đến ngưỡng 90% và được chấp nhận lại sau `resetAt`. Bao gồm `quotaCache.ts` với trình nhận trạng thái không có tác dụng phụ. -**Chuyển đổi cấp độ nhanh Codex (PR #367)**: Bảng điều khiển → Cài đặt → Cấp dịch vụ Codex. Nút bật tắt mặc định chỉ thêm `service_tier: "flex"` cho các yêu cầu Codex, giảm chi phí ~80%. Ngăn xếp đầy đủ: tab UI + điểm cuối API + trình thực thi + trình dịch + khôi phục khởi động. -**Mẫu gpt-5.4 (PR #368)**: Thêm `cx/gpt-5.4` và `codex/gpt-5.4` vào sổ đăng ký mô hình Codex. Kiểm tra hồi quy bao gồm.### 🐛 Bug Fixes

-**sửa lỗi #356**: Biểu đồ phân tích (Nhà cung cấp hàng đầu, Theo tài khoản, Phân tích nhà cung cấp) hiện hiển thị tên/nhãn nhà cung cấp mà con người có thể đọc được thay vì ID nội bộ thô cho các nhà cung cấp tương thích với OpenAI.

> Bản phát hành chính: chiến lược định tuyến ngẫu nhiên nghiêm ngặt, kiểm soát truy cập khóa API, nhóm kết nối, đồng bộ hóa giá bên ngoài và sửa các lỗi quan trọng đối với mô hình tư duy, thử nghiệm kết hợp và xác thực tên công cụ.### ✨ New Features (PRs #363 & #365)

-**Chiến lược định tuyến ngẫu nhiên nghiêm ngặt**: Fisher-Yates shuffle deck với bảo đảm chống lặp lại và tuần tự hóa mutex cho các yêu cầu đồng thời. Bộ bài độc lập cho mỗi combo và mỗi nhà cung cấp. -**Kiểm soát truy cập khóa API**: `allowedConnections` (hạn chế những kết nối mà khóa có thể sử dụng), `is_active` (bật/tắt khóa với 403), `accessSchedule` (kiểm soát truy cập dựa trên thời gian), chuyển đổi `autoResolve`, đổi tên khóa thông qua PATCH. -**Nhóm kết nối**: Nhóm kết nối nhà cung cấp theo môi trường. Chế độ xem Accordion trong trang Giới hạn với tính bền bỉ của localStorage và tính năng tự động chuyển đổi thông minh. -**Đồng bộ hóa giá bên ngoài (LiteLLM)**: Giải pháp định giá 3 cấp (ghi đè của người dùng → được đồng bộ hóa → mặc định). Chọn tham gia thông qua `PRICING_SYNC_ENABLED=true`. Công cụ MCP `omniroute_sync_pricing`. 23 bài kiểm tra mới. -**i18n**: 30 ngôn ngữ được cập nhật với chiến lược nghiêm ngặt ngẫu nhiên, chuỗi quản lý khóa API. pt-BR được dịch đầy đủ.### 🐛 Bug Fixes

-**sửa lỗi #355**: Thời gian chờ của luồng không hoạt động tăng từ 60 giây lên 300 giây — ngăn chặn việc hủy bỏ các mô hình tư duy mở rộng (claude-opus-4-6, o3, v.v.) trong các giai đoạn lý luận dài. Có thể định cấu hình qua `STREAM_IDLE_TIMEOUT_MS`. -**sửa lỗi #350**: Kiểm tra kết hợp hiện bỏ qua `REQUIRE_API_KEY=true` bằng cách sử dụng tiêu đề nội bộ và sử dụng định dạng tương thích với OpenAI trên toàn cầu. Thời gian chờ kéo dài từ 15 giây đến 20 giây. -**sửa #346**: Các công cụ có `function.name` trống (được chuyển tiếp bởi Claude Code) hiện được lọc trước khi các nhà cung cấp tuyến trên nhận được chúng, ngăn ngừa lỗi "Đầu vào không hợp lệ[N].name: chuỗi trống".### 🗑️ Closed Issues

-**#341**: Đã xóa phần gỡ lỗi — thay thế là `/dashboard/logs` và `/dashboard/health`.

> Hỗ trợ xoay vòng khóa API để thiết lập nhà cung cấp nhiều khóa cũng như xác nhận định tuyến ký tự đại diện và giới hạn hạn ngạch đã có sẵn.### ✨ New Features

-**Quay vòng khóa API (T07)**: Các kết nối của nhà cung cấp hiện có thể chứa nhiều khóa API (Chỉnh sửa kết nối → Khóa API bổ sung). Các yêu cầu xoay vòng giữa các khóa chính + khóa phụ thông qua `providerSpecificData.extraApiKeys[]`. Các khóa được giữ trong bộ nhớ được lập chỉ mục cho mỗi kết nối — không cần thay đổi lược đồ DB.### 📝 Already Implemented (confirmed in audit)

-**Định tuyến mô hình ký tự đại diện (T13)**: `wildcardRouter.ts` với kết hợp ký tự đại diện kiểu toàn cầu (`gpt*`, `claude-?-sonnet`, v.v.) đã được tích hợp vào `model.ts` với xếp hạng độ đặc hiệu. -**Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` đã tự động nâng cấp cửa sổ — nếu `Date.now() > entry.until`, khóa sẽ bị xóa ngay lập tức (không bị chặn cũ).

> Cải thiện giao diện người dùng, bổ sung chiến lược định tuyến và xử lý lỗi nhẹ nhàng theo giới hạn sử dụng.### ✨ New Features

-**Chiến lược định tuyến P2C và điền đầu tiên**: Đã thêm `fill-first` (rút hết hạn ngạch trước khi tiếp tục) và `p2c` (Lựa chọn có độ trễ thấp theo sức mạnh của hai lựa chọn) vào bộ chọn chiến lược kết hợp, với bảng hướng dẫn đầy đủ và huy hiệu được mã hóa màu. -**Mô hình cài sẵn ngăn xếp miễn phí**: Việc tạo kết hợp với mẫu Free Stack hiện tự động điền vào 7 mô hình nhà cung cấp miễn phí tốt nhất trong lớp (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Người dùng chỉ cần kích hoạt các nhà cung cấp và nhận ngay combo $0/tháng. -**Phương thức kết hợp rộng hơn**: Phương thức kết hợp Tạo/Chỉnh sửa hiện sử dụng `max-w-4xl` để chỉnh sửa thoải mái các kết hợp lớn.### 🐛 Bug Fixes

-**Giới hạn trang HTTP 500 cho Codex & GitHub**: `getCodexUsage()` và `getGitHubUsage()` hiện trả về thông báo thân thiện với người dùng khi nhà cung cấp trả về 401/403 (mã thông báo đã hết hạn), thay vì ném và gây ra lỗi 500 trên trang Giới hạn. -**MaintenanceBanner dương tính giả**: Biểu ngữ không còn hiển thị "Máy chủ không thể truy cập" một cách giả tạo khi tải trang. Đã sửa lỗi bằng cách gọi `checkHealth()` ngay lập tức khi gắn kết và loại bỏ việc đóng trạng thái `show` cũ. -**Chú giải công cụ biểu tượng nhà cung cấp**: Các nút biểu tượng chỉnh sửa (bút chì) và xóa trong hàng kết nối nhà cung cấp hiện có chú giải công cụ HTML gốc — tất cả 6 biểu tượng hành động hiện đều được tự ghi lại.

> Nhiều cải tiến từ phân tích vấn đề của cộng đồng, hỗ trợ nhà cung cấp mới, sửa lỗi theo dõi mã thông báo, định tuyến mô hình và độ tin cậy phát trực tuyến.### ✨ New Features

-**Định tuyến thông minh nhận biết tác vụ (T05)**: Lựa chọn mô hình tự động dựa trên loại nội dung yêu cầu — mã hóa → trò chuyện sâu, phân tích → gemini-2.5-pro, tầm nhìn → gpt-4o, tóm tắt → gemini-2.5-flash. Có thể định cấu hình thông qua Cài đặt. API `GET/PUT/POST /api/settings/task-routing` mới. -**Nhà cung cấp HuggingFace**: Đã thêm Bộ định tuyến HuggingFace làm nhà cung cấp tương thích OpenAI với Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Nhà cung cấp AI của Vertex**: Đã thêm nhà cung cấp Vertex AI (Google Cloud) với Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude qua Vertex. -**Tải lên tệp sân chơi**: Tải lên âm thanh để phiên âm, tải lên hình ảnh cho các mô hình thị giác (tự động phát hiện theo tên mô hình), hiển thị hình ảnh nội tuyến cho kết quả tạo hình ảnh. -**Phản hồi trực quan về lựa chọn mẫu**: Các mô hình đã được thêm vào trong bộ chọn kết hợp hiện hiển thị ✓ huy hiệu màu xanh lá cây — ngăn ngừa sự nhầm lẫn trùng lặp. -**Khả năng tương thích Qwen (PR #352)**: Đã cập nhật cài đặt dấu vân tay CLI và Tác nhân người dùng để tương thích với nhà cung cấp Qwen. -**Quản lý trạng thái vòng tròn (PR #349)**: Logic vòng tròn nâng cao để xử lý các tài khoản bị loại trừ và duy trì trạng thái xoay vòng một cách chính xác. -**Clipboard UX (PR #360)**: Tăng cường hoạt động của bảng nhớ tạm với tính năng dự phòng cho các bối cảnh không an toàn; Cải tiến chuẩn hóa công cụ Claude.### 🐛 Bug Fixes

-**Khắc phục #302 — OpenAI SDK streaming=False drop tool_calls**: T01 Chấp nhận thương lượng tiêu đề không còn buộc phát trực tuyến khi `body.stream` rõ ràng là `false`. Đã khiến tool_calls bị loại bỏ âm thầm khi sử dụng OpenAI Python SDK ở chế độ không phát trực tuyến. -**Khắc phục số 73 — Claude Haiku được định tuyến đến OpenAI mà không có tiền tố nhà cung cấp**: các mô hình `claude-*` được gửi mà không có tiền tố nhà cung cấp hiện định tuyến chính xác đến nhà cung cấp `phản trọng lực` (Anthropic). Đã thêm `gemini-*`/`gemma-*` → `gemini` heuristic. -**Khắc phục số 74 — Số lượng mã thông báo luôn bằng 0 khi phát trực tuyến AntiGravity/Claude**: Sự kiện `message_start` SSE mang `input_tokens` không được phân tích cú pháp bởi `extractUsage()`, khiến tất cả số lượng mã thông báo đầu vào bị giảm. Theo dõi mã thông báo đầu vào/đầu ra hiện hoạt động chính xác để truyền phản hồi. -**Khắc phục #180 — Nhập mô hình trùng lặp không có phản hồi**: `ModelSelectModal` hiện hiển thị ✓ đánh dấu màu xanh lục cho các mô hình đã có trong kết hợp, làm cho rõ ràng là chúng đã được thêm vào. -**Lỗi tạo trang phương tiện**: Kết quả hình ảnh hiện hiển thị dưới dạng thẻ `<img>` thay vì JSON thô. Kết quả phiên âm được hiển thị dưới dạng văn bản có thể đọc được. Lỗi thông tin xác thực hiển thị biểu ngữ màu hổ phách thay vì lỗi im lặng. -**Nút làm mới mã thông báo trên trang nhà cung cấp**: Đã thêm giao diện người dùng làm mới mã thông báo thủ công cho nhà cung cấp OAuth.### 🔧 Improvements

-**Đăng ký nhà cung cấp**: HuggingFace và Vertex AI được thêm vào `providerRegistry.ts` và `providers.ts` (frontend). -**Đọc bộ đệm**: `src/lib/db/readCache.ts` mới để lưu vào bộ nhớ đệm đọc DB hiệu quả. -**Bộ nhớ đệm hạn ngạch**: Cải thiện bộ nhớ đệm hạn ngạch bằng tính năng trục xuất dựa trên TTL.### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Tập tin                                       | Mục đích                                          |
| --------------------------------------------- | ------------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Logic định tuyến nhận biết tác vụ (7 loại tác vụ) |
| `src/app/api/settings/task-routing/route.ts`  | API cấu hình định tuyến tác vụ                    |
| `src/app/api/providers/[id]/refresh/route.ts` | Làm mới mã thông báo OAuth thủ công               |
| `src/lib/db/readCache.ts`                     | Bộ đệm đọc DB hiệu quả                            |
| `src/shared/utils/clipboard.ts`               | Clipboard cứng với dự phòng                       | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Chế độ kết hợp: Ngăn xếp miễn phí hiển thị và nổi bật**— Mẫu Ngăn xếp miễn phí đã bị ẩn (thứ 4 trong lưới 3 cột). Đã sửa: di chuyển đến vị trí 1, chuyển sang lưới 2x2 để hiển thị cả 4 mẫu, đường viền màu xanh lá cây + đánh dấu huy hiệu MIỄN PHÍ.## [2.4.0] - 2026-03-13

> **Bản phát hành chính**— Hệ sinh thái ngăn xếp miễn phí, cải tiến sân chơi phiên âm, hơn 44 nhà cung cấp, tài liệu toàn diện về cấp miễn phí và các cải tiến giao diện người dùng trên diện rộng.### Tính năng

-**Combos: Mẫu ngăn xếp miễn phí**— Mẫu thứ 4 mới "Ngăn xếp miễn phí ($0)" sử dụng luân phiên trên Kiro + Qoder + Qwen + Gemini CLI. Đề xuất gói kết hợp không tốn chi phí được xây dựng sẵn trong lần sử dụng đầu tiên. -**Phương tiện/Phiên âm: Deepgram làm mặc định**— Deepgram (Nova 3, miễn phí $200) hiện là nhà cung cấp phiên âm mặc định. AssemblyAI ($50 miễn phí) và Groq Whisper (miễn phí mãi mãi) được hiển thị cùng với huy hiệu tín dụng miễn phí. -**README: Phần "Bắt đầu miễn phí"**— Bảng 5 bước README sớm mới hiển thị cách thiết lập AI không tốn phí trong vài phút. -**README: Combo phiên âm miễn phí**— Phần mới với đề xuất kết hợp Deepgram/AssemblyAI/Groq và chi tiết tín dụng miễn phí cho mỗi nhà cung cấp. -**providers.ts: hasFree flag**— NVIDIA NIM, Cerebras và Groq được đánh dấu bằng huy hiệu hasFree và freeNote dành cho giao diện người dùng của nhà cung cấp. -**i18n: phím templateFreeStack**— Mẫu kết hợp Free Stack được dịch và đồng bộ hóa sang tất cả 30 ngôn ngữ.## [2.3.16] - 2026-03-13

### Tài liệu

-**README: 44+ Nhà cung cấp**— Đã cập nhật tất cả 3 lần xuất hiện của "36+ nhà cung cấp" thành "44+" phản ánh số lượng cơ sở mã thực tế (44 nhà cung cấp trong nhà cung cấp.ts) -**README: Phần mới "🆓 Mô hình miễn phí — Những gì bạn thực sự nhận được"**— Đã thêm bảng 7 nhà cung cấp với giới hạn tốc độ cho mỗi mô hình cho: Kiro (Claude không giới hạn thông qua AWS Builder ID), Qoder (5 mô hình không giới hạn), Qwen (4 mô hình không giới hạn), Gemini CLI (180K/tháng), NVIDIA NIM (~40 RPM dev-forever), Cerebras (1 triệu tok/ngày / 60K TPM), Groq (30 RPM / 14,4K RPD). Bao gồm đề xuất kết hợp \/usr/bin/bash Ultimate Free Stack. -**README: Đã cập nhật bảng giá**— Đã thêm Cerebras vào bậc API KEY, sửa NVIDIA từ "1000 tín dụng" thành "miễn phí vĩnh viễn cho nhà phát triển", cập nhật số lượng và tên mô hình Qoder/Qwen -**README: Qoder 8→5 model**(có tên: kimi-k2-thinking, qwen3-code-plus, deepseek-r1, minimax-m2, kimi-k2) -**README: Qwen 3→4 models**(có tên: qwen3-code-plus, qwen3-code-flash, qwen3-code-next, Vision-model)## [2.3.15] - 2026-03-13

### Tính năng

-**Trang tổng quan kết hợp tự động (Ưu tiên cấp độ)**: Đã thêm `🏷️ Cấp` làm nhãn hệ số tính điểm thứ 7 trong màn hình phân tích hệ số `/dashboard/auto-combo` — hiện tại tất cả 7 hệ số tính điểm Tự động kết hợp đều hiển thị. -**i18n — phần autoCombo**: Đã thêm 20 khóa dịch mới cho bảng điều khiển Auto-Combo (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority`, v.v.) cho tất cả 30 tệp ngôn ngữ.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Đã khôi phục `clientSecret` mặc định hợp lệ — trước đây là một chuỗi trống, gây ra "Thông tin xác thực ứng dụng khách không hợp lệ" trong mỗi lần thử kết nối. Thông tin xác thực công khai hiện là thông tin dự phòng mặc định (có thể ghi đè thông qua `QODER_OAUTH_CLIENT_SECRET` env var). -**Không tìm thấy máy chủ MITM (#335)**: `prepublish.mjs` hiện biên dịch `src/mitm/*.ts` sang JavaScript bằng cách sử dụng `tsc` trước khi sao chép vào gói npm. Trước đây chỉ có các tệp `.ts` thô được sao chép — nghĩa là `server.js` chưa bao giờ tồn tại trong các bản cài đặt toàn cầu npm/Volta. -**GeminiCLI thiếu projectId (#338)**: Thay vì đưa ra lỗi cứng 500 khi thiếu `projectId` trong thông tin đăng nhập được lưu trữ (ví dụ: sau khi khởi động lại Docker), OmniRoute hiện ghi lại cảnh báo và thử yêu cầu — trả về lỗi có ý nghĩa phía nhà cung cấp thay vì sự cố OmniRoute. -**Phiên bản điện tử không khớp (#323)**: Đã đồng bộ hóa phiên bản `electron/package.json` thành `2.3.13` (là `2.0.13`) nên phiên bản nhị phân trên máy tính để bàn khớp với gói npm.### ✨ New Models (#334)

-**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-code-next`, `auto` -**Codex**: `gpt5.4`### 🔧 Improvements

-**Chấm điểm cấp độ (API + xác thực)**: Đã thêm `tierPriority` (trọng lượng `0,05`) vào lược đồ Zod `ScoringWeights` và lộ trình API `combos/auto` — hệ số tính điểm thứ 7 hiện đã được API REST chấp nhận hoàn toàn và được xác thực trên dữ liệu đầu vào. Trọng số `ổn định` được điều chỉnh từ `0,10` thành `0,05` để giữ tổng số tiền = `1,0`.### ✨ New Features

-**Tính điểm hạn ngạch theo cấp độ (Tự động kết hợp)**: Đã thêm `tierPriority` làm hệ số tính điểm thứ 7 — các tài khoản có cấp độ Ultra/Pro hiện được ưu tiên hơn cấp độ Miễn phí khi các yếu tố khác bằng nhau. Các trường tùy chọn mới `accountTier` và `quotaResetIntervalSecs` trên `ProviderCandidate`. Đã cập nhật tất cả 4 gói chế độ (`ship-fast`, `cost-saver`, `quality-first`, `offline-thân thiện`). -**Dự phòng mô hình nội bộ gia đình (T5)**: Khi một mô hình không có sẵn (404/400/403), OmniRoute hiện tự động quay trở lại các mô hình anh chị em trong cùng một gia đình trước khi trả về lỗi (`modelFamilyFallback.ts`). -**Hết thời gian chờ của cầu API có thể định cấu hình**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var cho phép người vận hành điều chỉnh thời gian chờ của proxy (30 giây mặc định). Sửa lỗi 504 khi phản hồi ngược dòng chậm. (#332) -**Lịch sử ngôi sao**: Đã thay thế tiện ích star-history.com bằng starchart.cc (`?variant=adaptive`) trong tất cả 30 README — thích ứng với chủ đề sáng/tối, cập nhật theo thời gian thực.### 🐛 Bug Fixes

-**Xác thực — Mật khẩu lần đầu**: `INITIAL_PASSWORD` env var hiện được chấp nhận khi đặt mật khẩu trang tổng quan đầu tiên. Sử dụng `timingSafeEqual` để so sánh thời gian liên tục, ngăn chặn các cuộc tấn công về thời gian. (#333) -**README Truncation**: Fixed a missing `</details>` closing tag in the Troubleshooting section that caused GitHub to stop rendering everything below it (Tech Stack, Docs, Roadmap, Contributors). -**pnpm install**: Đã xóa ghi đè `@swc/helpers` dư thừa khỏi `package.json` vốn xung đột với phần phụ thuộc trực tiếp, gây ra lỗi `EOVERRIDE` trên pnpm. Đã thêm cấu hình `pnpm.onlyBuiltDependency`. -**Chèn đường dẫn CLI (T12)**: Đã thêm trình xác thực `isSafePath()` trong `cliRuntime.ts` để chặn truyền tải đường dẫn và siêu ký tự shell trong `CLI_*_BIN` env vars. -**CI**: Đã tạo lại `package-lock.json` sau khi xóa ghi đè để sửa lỗi `npm ci` trên GitHub Actions.### 🔧 Improvements

-**Định dạng phản hồi (T1)**: `response_format` (json_schema/json_object) hiện được đưa vào dưới dạng lời nhắc hệ thống cho Claude, cho phép khả năng tương thích đầu ra có cấu trúc. -**429 Thử lại (T2)**: Thử lại URL nội bộ cho 429 phản hồi (2× lần thử với độ trễ 2 giây) trước khi quay lại URL tiếp theo. -**Tiêu đề Gemini CLI (T3)**: Đã thêm tiêu đề vân tay `User-Agent` và `X-Goog-Api-Client` để tương thích với Gemini CLI. -**Danh mục giá (T9)**: Đã thêm các mục định giá `deepseek-3.1`, `deepseek-3.2` và `qwen3-code-next`.### 📁 New Files

| Tập tin                                    | Mục đích                                            |
| ------------------------------------------ | --------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Định nghĩa họ mẫu và logic dự phòng trong nội bộ họ | ### Fixed |

-**KiloCode**: thời gian chờ kiểm tra sức khỏe của kilocode đã được sửa trong v2.3.11 -**OpenCode**: Thêm mã mở vào sổ đăng ký cliRuntime với thời gian chờ kiểm tra tình trạng 15 giây -**OpenClaw / Cursor**: Tăng thời gian chờ kiểm tra tình trạng lên 15 giây đối với các biến thể khởi động chậm -**VPS**: Cài đặt gói npm droid và openclaw; kích hoạt CLI_EXTRA_PATHS cho kiro-cli -**cliRuntime**: Thêm đăng ký công cụ mã mở và tăng thời gian chờ để tiếp tục## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**: Tăng `healthcheckTimeoutMs` từ 4000 mili giây lên 15000 mili giây — kilocode hiển thị biểu ngữ biểu tượng ASCII khi khởi động gây ra `healthcheck_failed` sai trên môi trường khởi động chậm/nghỉ## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Khắc phục lỗi `check:any-budget:t11` — thay thế `as Any` bằng `as Record<string, known>` trong OAuthModal.tsx (3 lần xuất hiện)### Docs

-**CLI-TOOLS.md**: Hướng dẫn đầy đủ cho tất cả 11 công cụ CLI (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, con trỏ, droid, openclaw) -**i18n**: CLI-TOOLS.md được đồng bộ hóa sang 30 ngôn ngữ với tiêu đề + phần giới thiệu được dịch## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Điểm cuối hoàn thành OpenAI cũ mới — chấp nhận cả mảng `prompt` và `messages`, tự động chuẩn hóa thành định dạng trò chuyện -**EndpointPage**: Hiện hiển thị tất cả 3 loại điểm cuối tương thích với OpenAI: Hoàn thành trò chuyện, API phản hồi và Hoàn thành kế thừa -**i18n**: Đã thêm `completionsLegacy/completionsLegacyDesc` vào 30 tệp ngôn ngữ### Fixed

-**OAuthModal**: Sửa lỗi `[object Object]` hiển thị trên tất cả các lỗi kết nối OAuth — trích xuất chính xác `.message` từ các đối tượng phản hồi lỗi trong cả 3 lệnh gọi `throw new Error(data.error)` (trao đổi, mã thiết bị, ủy quyền)

- Ảnh hưởng đến Cline, Codex, GitHub, Qwen, Kiro và tất cả các nhà cung cấp OAuth khác## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Thêm `decodeURIComponent` trước khi giải mã base64 để mã xác thực được mã hóa URL từ URL gọi lại được phân tích cú pháp chính xác, sửa lỗi "mã ủy quyền không hợp lệ hoặc hết hạn" trên thiết lập từ xa (LAN IP) -**Cline OAuth**: `mapTokens` hiện đã điền `name = firstName + LastName || email` để tài khoản Cline hiển thị tên người dùng thực thay vì "Tài khoản #ID" -**Tên tài khoản OAuth**: Tất cả các luồng trao đổi OAuth (trao đổi, thăm dò ý kiến, gọi lại thăm dò ý kiến) hiện bình thường hóa `name = email` khi thiếu tên, vì vậy mọi tài khoản OAuth đều hiển thị email của mình dưới dạng nhãn hiển thị trong trang tổng quan Nhà cung cấp -**Tên tài khoản OAuth**: Đã xóa dự phòng "Tài khoản N" tuần tự trong `db/providers.ts` — các tài khoản không có email/tên hiện sử dụng nhãn dựa trên ID ổn định thông qua `getAccountDisplayName()` thay vì số tuần tự thay đổi khi tài khoản bị xóa## [2.3.6] - 2026-03-12

### Fixed

-**Lô thử nghiệm nhà cung cấp**: Đã sửa lỗi lược đồ Zod để chấp nhận `providerId: null` (giao diện người dùng gửi null cho các chế độ không phải nhà cung cấp); đã trả về không chính xác "Yêu cầu không hợp lệ" cho tất cả các bài kiểm tra hàng loạt -**Phương thức kiểm tra nhà cung cấp**: Đã sửa lỗi hiển thị `[object Object]` bằng cách chuẩn hóa các đối tượng lỗi API thành chuỗi trước khi hiển thị trong `setTestResults` và `ProviderTestResultsView` -**i18n**: Đã thêm các khóa bị thiếu `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` vào `en.json` -**i18n**: Đồng bộ hóa 1111 khóa bị thiếu trên tất cả 29 tệp ngôn ngữ không phải tiếng Anh, sử dụng các giá trị tiếng Anh làm dự phòng## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Đã thêm bản sửa lỗi `postinstall` vĩnh viễn để sao chép `@swc/helpers` vào `node_modules` của ứng dụng độc lập — ngăn chặn sự cố MODULE_NOT_FOUND khi cài đặt npm toàn cầu## [2.3.4] - 2026-03-10

### Added

- Tích hợp nhiều nhà cung cấp và cải tiến bảng điều khiển
