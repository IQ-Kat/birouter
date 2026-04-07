# Release Checklist (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Sử dụng danh sách kiểm tra này trước khi gắn thẻ hoặc xuất bản bản phát hành OmniRoute mới.## Version and Changelog

1. Đưa phiên bản `package.json` (`x.y.z`) vào nhánh phát hành.
2. Di chuyển ghi chú phát hành từ `## [Chưa phát hành]` trong `CHANGELOG.md` sang phần ngày tháng:
   - `## [x.y.z] — YYYY-MM-DD`
3. Giữ `## [Chưa phát hành]` làm phần nhật ký thay đổi đầu tiên cho tác phẩm sắp tới.
4. Đảm bảo phần học kỳ mới nhất trong `CHANGELOG.md` bằng phiên bản `package.json`.## API Docs

5. Cập nhật `docs/openapi.yaml`:
   - `info.version` phải bằng phiên bản `pack.json`.
6. Xác thực các ví dụ điểm cuối nếu hợp đồng API thay đổi.## Runtime Docs

7. Xem lại `docs/ARCHITECTURE.md` để biết lỗi lưu trữ/thời gian chạy.
8. Xem lại `docs/TROUBLESHOOTING.md` để biết thông tin về env var và độ lệch hoạt động.
9. Cập nhật tài liệu đã bản địa hóa nếu tài liệu nguồn thay đổi đáng kể.## Automated Check

Chạy trình bảo vệ đồng bộ cục bộ trước khi mở PR:```bash
npm run check:docs-sync

```

CI cũng chạy kiểm tra này trong `.github/workflows/ci.yml` (lint job).
```
