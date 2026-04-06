# OmniRoute Auto-Combo Engine (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Chuỗi mô hình tự quản lý với tính năng chấm điểm thích ứng## How It Works

Công cụ Tự động Kết hợp tự động chọn nhà cung cấp/mô hình tốt nhất cho mỗi yêu cầu bằng cách sử dụng**chức năng chấm điểm 6 yếu tố**:

| Yếu tố         | Cân nặng | Mô tả                                       |
| :------------- | :------- | :------------------------------------------ | ------------- |
| Hạn ngạch      | 0,20     | Dung lượng còn lại [0..1]                   |
| Sức khỏe       | 0,25     | Bộ ngắt mạch: ĐÓNG=1,0, HALF=0,5, MỞ=0,0    |
| Chi phí đầu tư | 0,20     | Chi phí nghịch đảo (rẻ hơn = điểm cao hơn)  |
| Độ trễInv      | 0,15     | Độ trễ nghịch đảo p95 (nhanh hơn = cao hơn) |
| Nhiệm vụFit    | 0,10     | Mô hình × điểm thể lực của loại nhiệm vụ    |
| Tính ổn định   | 0,10     | Phương sai thấp về độ trễ/lỗi               | ## Mode Packs |

| Gói                          | Tập trung        | Trọng lượng phím  |
| :--------------------------- | :--------------- | :---------------- | --------------- |
| 🚀**Giao hàng nhanh**        | Tốc độ           | độ trễInv: 0,35   |
| 💰**Tiết kiệm chi phí**      | Kinh tế          | chi phíInv: 0,40  |
| 🎯**Chất lượng là trên hết** | Mô hình tốt nhất | nhiệm vụFit: 0,40 |
| 📡**Thân thiện ngoại tuyến** | Sẵn có           | hạn ngạch: 0,40   | ## Self-Healing |

-**Loại trừ tạm thời**: Điểm < 0,2 → bị loại trong 5 phút (thời gian lùi lũy tiến, tối đa 30 phút) -**Nhận thức về cầu dao**: MỞ → tự động loại trừ; HALF_OPEN → yêu cầu thăm dò -**Chế độ sự cố**: >50% MỞ → tắt tính năng thăm dò, tối đa hóa độ ổn định -**Phục hồi thời gian hồi chiêu**: Sau khi loại trừ, yêu cầu đầu tiên là "thăm dò" với thời gian chờ giảm## Bandit Exploration

5% yêu cầu (có thể định cấu hình) được chuyển đến các nhà cung cấp ngẫu nhiên để khám phá. Bị vô hiệu hóa trong chế độ sự cố.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

Hơn 30 mô hình được chấm điểm trên 6 loại nhiệm vụ (`viết mã`, `đánh giá`, `lập kế hoạch`, `phân tích`, `gỡ lỗi`, `tài liệu`). Hỗ trợ các mẫu ký tự đại diện (ví dụ: `*-code` → điểm mã hóa cao).## Files

| Tập tin                                      | Mục đích                                    |
| :------------------------------------------- | :------------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts`     | Chức năng tính điểm & chuẩn hóa nhóm        |
| `open-sse/services/autoCombo/taskFitness.ts` | Mô hình × tra cứu thể lực nhiệm vụ          |
| `open-sse/services/autoCombo/engine.ts`      | Logic lựa chọn, kẻ cướp, giới hạn ngân sách |
| `open-sse/services/autoCombo/selfHealing.ts` | Loại trừ, thăm dò, chế độ sự cố             |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 hồ sơ trọng lượng                         |
| `src/app/api/combos/auto/route.ts`           | API REST                                    |
