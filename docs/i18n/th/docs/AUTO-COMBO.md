# OmniRoute Auto-Combo Engine (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> กลุ่มโมเดลการจัดการตนเองพร้อมการให้คะแนนแบบปรับได้## How It Works

Auto-Combo Engine จะเลือกผู้ให้บริการ/รุ่นที่ดีที่สุดแบบไดนามิกสำหรับแต่ละคำขอโดยใช้**ฟังก์ชันการให้คะแนน 6 ปัจจัย**:

| ปัจจัย     | น้ำหนัก | คำอธิบาย                                        |
| :--------- | :------ | :---------------------------------------------- | ------------- |
| โควต้า     | 0.20    | ความจุคงเหลือ [0..1]                            |
| สุขภาพ     | 0.25    | เซอร์กิตเบรกเกอร์: ปิด=1.0, ครึ่ง=0.5, เปิด=0.0 |
| ต้นทุนInv  | 0.20    | ต้นทุนผกผัน (ถูกกว่า = คะแนนสูงกว่า)            |
| LatencyInv | 0.15    | เวลาแฝง p95 ผกผัน (เร็วกว่า = สูงกว่า)          |
| ทาสก์ฟิต   | 0.10    | รุ่น x คะแนนฟิตเนสประเภทงาน                     |
| ความมั่นคง | 0.10    | ความแปรปรวนต่ำในเวลาแฝง/ข้อผิดพลาด              | ## Mode Packs |

| แพ็ค                     | โฟกัส            | น้ำหนักหลัก      |
| :----------------------- | :--------------- | :--------------- | --------------- |
| 🚀**จัดส่งด่วน**         | ความเร็ว         | เวลาแฝงInv: 0.35 |
| 💰**ประหยัดต้นทุน**      | เศรษฐกิจ         | ราคาInv: 0.40    |
| 🎯**คุณภาพต้องมาก่อน**   | โมเดลที่ดีที่สุด | ภารกิจพอดี: 0.40 |
| 📡**เป็นมิตรแบบออฟไลน์** | ห้องว่าง         | โควต้า: 0.40     | ## Self-Healing |

-**การยกเว้นชั่วคราว**: คะแนน < 0.2 → ยกเว้น 5 นาที (การถอยกลับแบบก้าวหน้า สูงสุด 30 นาที) -**การรับรู้เบรกเกอร์**: เปิด → ไม่รวมอัตโนมัติ HALF_OPEN → คำขอโพรบ -**โหมดเหตุการณ์**: >50% เปิด → ปิดใช้งานการสำรวจ เพิ่มความเสถียรสูงสุด -**การกู้คืนคูลดาวน์**: หลังจากการยกเว้น คำขอแรกคือ "โพรบ" โดยมีการหมดเวลาลดลง## Bandit Exploration

5% ของคำขอ (กำหนดค่าได้) ถูกส่งไปยังผู้ให้บริการแบบสุ่มเพื่อทำการสำรวจ ปิดใช้งานในโหมดเหตุการณ์## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

แบบจำลองมากกว่า 30 แบบได้คะแนนใน 6 ประเภทงาน (`การเขียนโค้ด`, `การตรวจสอบ`, `การวางแผน`, `การวิเคราะห์`, `การแก้ไขจุดบกพร่อง`, `เอกสาร`) รองรับรูปแบบไวด์การ์ด (เช่น `*-coder` → คะแนนการเข้ารหัสสูง)## Files

| ไฟล์                                         | วัตถุประสงค์                                  |
| :------------------------------------------- | :-------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | ฟังก์ชั่นการให้คะแนนและการทำให้พูลเป็นมาตรฐาน |
| `open-sse/services/autoCombo/taskFitness.ts` | โมเดล × การค้นหาความฟิตของงาน                 |
| `open-sse/services/autoCombo/engine.ts`      | ตรรกะการเลือก โจร ขีดจำกัดงบประมาณ            |
| `open-sse/services/autoCombo/selfHealing.ts` | การแยกออก การสอบสวน โหมดเหตุการณ์             |
| `open-sse/services/autoCombo/modePacks.ts`   | โปรไฟล์น้ำหนัก 4 แบบ                          |
| `src/app/api/combos/auto/route.ts`           | ส่วนที่เหลือ API                              |
