# Test Coverage Plan (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Cập nhật lần cuối: 28-03-2026## Baseline

Có nhiều số bảo hiểm tùy thuộc vào cách tính toán báo cáo. Để lập kế hoạch, chỉ một trong số chúng là hữu ích.

| Số liệu                  | Phạm vi                                                               | Báo cáo / Dòng | Chi nhánh | Chức năng | Ghi chú                                               |
| ------------------------ | --------------------------------------------------------------------- | -------------: | --------: | --------: | ----------------------------------------------------- |
| Di sản                   | `Kiểm tra chạy npm cũ: vùng phủ sóng`                                 |         79,42% |    75,15% |    67,94% | Tăng cao: đếm các tệp kiểm tra và loại trừ `open-sse` |
| Chẩn đoán                | Chỉ nguồn, không bao gồm các bài kiểm tra và không bao gồm `open-sse` |         68,16% |    63,55% |    64,06% | Chỉ hữu ích để cô lập `src/**`                        |
| Đường cơ sở được đề xuất | Chỉ nguồn, không bao gồm các bài kiểm tra và bao gồm `open-sse`       |         56,95% |    66,05% |    57,80% | Đây là đường cơ sở để cải thiện toàn bộ dự án         |

Đường cơ sở được đề xuất là con số cần tối ưu hóa.## Rules

- Mục tiêu phạm vi áp dụng cho các tệp nguồn, không áp dụng cho `tests/**`.
- `open-sse/**` là một phần của sản phẩm và phải nằm trong phạm vi.
- Mã mới không làm giảm phạm vi phủ sóng ở các khu vực bị chạm.
- Ưu tiên hành vi thử nghiệm và kết quả chi nhánh hơn là chi tiết triển khai.
- Ưu tiên cơ sở dữ liệu SQLite tạm thời và các thiết bị cố định nhỏ hơn các mô hình rộng cho `src/lib/db/**`.## Current command set

- `npm run test:coverage`
  - Cổng bao phủ nguồn chính cho bộ kiểm tra đơn vị
  - Tạo `tóm tắt văn bản`, `html`, `json-tóm tắt` và `lcov`
- `phạm vi chạy npm: báo cáo`
  - Báo cáo chi tiết từng tập tin từ lần chạy mới nhất
- `npm run test:coverage:legacy`
  - Chỉ so sánh lịch sử## Milestones

| Giai đoạn   |          Mục tiêu | Tập trung                                                 |
| ----------- | ----------------: | --------------------------------------------------------- |
| Giai đoạn 1 | 60% câu lệnh/dòng | Chiến thắng nhanh chóng và bảo hiểm tiện ích rủi ro thấp  |
| Giai đoạn 2 | 65% câu lệnh/dòng | Nền tảng DB và tuyến đường                                |
| Giai đoạn 3 | 70% câu lệnh/dòng | Phân tích sử dụng và xác thực nhà cung cấp                |
| Giai đoạn 4 | 75% câu lệnh/dòng | người dịch và người trợ giúp `open-sse`                   |
| Giai đoạn 5 | 80% câu lệnh/dòng | các nhánh xử lý và thực thi `open-sse`                    |
| Giai đoạn 6 | 85% câu lệnh/dòng | Các trường hợp khó khăn hơn, nợ chi nhánh, bộ hồi quy     |
| Giai đoạn 7 | 90% câu lệnh/dòng | Quét cuối cùng, thu hẹp khoảng cách, bánh cóc nghiêm ngặt |

Các nhánh và chức năng sẽ tăng dần theo từng giai đoạn, nhưng mục tiêu chính là các câu lệnh/dòng.## Priority hotspots

Các tệp hoặc khu vực này mang lại lợi nhuận tốt nhất cho các giai đoạn tiếp theo:

1. `open-sse/trình xử lý`
   - `chatCore.ts` ở mức 7,57%
   - Tổng danh mục ở mức 29,07%
2. `open-sse/người dịch/yêu cầu`
   - Tổng thư mục ở mức 36,39%
   - Nhiều dịch giả vẫn chưa đạt được phạm vi bao phủ một chữ số
3. `open-sse/người dịch/phản hồi`
   - Tổng danh mục ở mức 8,07%
4. `open-sse/người thi hành`
   - Tổng thư mục ở mức 36,62%
5. `src/lib/db`
   - `model.ts` ở mức 20,66%
   - `đã đăng kýKeys.ts` ở mức 34,46%
   - `modelComboMappings.ts` ở mức 36,25%
   - `settings.ts` ở mức 46,40%
   - `webhooks.ts` ở mức 33,33%
6. `src/lib/sử dụng`
   - `usageHistory.ts` ở mức 21,12%
   - `usageStats.ts` ở mức 9,56%
   - `costCalculator.ts` ở mức 30,00%
7. `src/lib/nhà cung cấp`
   - `xác thực.ts` ở mức 41,16%
8. Các tệp API và tiện ích có rủi ro thấp để đạt được lợi nhuận sớm
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Sửa số liệu bảo hiểm để nó phản ánh mã nguồn thay vì tệp thử nghiệm
- [x] Giữ lại tập lệnh đưa tin cũ để so sánh
- [x] Ghi lại đường cơ sở và điểm nóng trong repo
- [ ] Thêm các bài kiểm tra tập trung cho các tiện ích có rủi ro thấp:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Thêm các bài kiểm tra lộ trình cho:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Thêm các bài kiểm tra được DB hỗ trợ cho:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Bao gồm hành vi của nhánh trong:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Thêm các bài kiểm tra phân tích sử dụng cho:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [] Mở rộng phạm vi phủ sóng tuyến đường cho các nhánh cài đặt và quản lý proxy### Phase 4: 70% -> 75%

- [ ] Bao gồm người trợ giúp dịch thuật và đường dẫn dịch thuật trung tâm:
  - `open-sse/translator/index.ts`
  - `open-sse/người dịch/người trợ giúp/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`### Phase 5: 75% -> 80%

- [ ] Thêm các bài kiểm tra cấp độ xử lý cho:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [] Thêm phạm vi chi nhánh của người thực thi để xác thực, thử lại và ghi đè điểm cuối dành riêng cho nhà cung cấp### Phase 6: 80% -> 85%

- [ ] Hợp nhất nhiều bộ trường hợp cạnh hơn vào đường dẫn bao phủ chính
- [ ] Tăng phạm vi bao phủ chức năng cho các mô-đun DB có phạm vi bao phủ của hàm tạo/trợ giúp yếu
- [ ] Đóng các khoảng trống nhánh trong `settings.ts`, `registeredKeys.ts`, `validation.ts` và trình trợ giúp dịch thuật### Phase 7: 85% -> 90%

- [ ] Coi các tệp có mức độ phù hợp thấp còn lại là trình chặn
- [] Thêm các bài kiểm tra hồi quy cho mọi lỗi sản xuất chưa được phát hiện đã được sửa trong quá trình đẩy lên 90%
- [ ] Chỉ nâng cổng bao phủ trong CI sau khi đường cơ sở cục bộ ổn định trong ít nhất hai lần chạy liên tiếp## Ratchet policy

Chỉ cập nhật ngưỡng `npm run test:coverage` sau khi dự án thực sự vượt qua cột mốc tiếp theo với bộ đệm thoải mái.

Trình tự ratchet được đề xuất:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Thứ tự là `dòng câu lệnh/nhánh/hàm`.## Known gap

Lệnh bảo hiểm hiện tại đo lường bộ đơn vị Node chính và bao gồm nguồn đạt được từ nó, bao gồm cả `open-sse`. Nó chưa hợp nhất phạm vi bảo hiểm của Vitest thành một báo cáo thống nhất. Việc hợp nhất đó đáng để thực hiện sau này, nhưng nó không phải là công cụ chặn để bắt đầu tăng 60% -> 80%.
