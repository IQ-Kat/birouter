# Release Checklist (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

ใช้รายการตรวจสอบนี้ก่อนที่จะแท็กหรือเผยแพร่ OmniRoute ใหม่## Version and Changelog

1. ชนเวอร์ชัน `package.json` (`x.y.z`) ในเวอร์ชัน release
2. ย้ายบันทึกประจำรุ่นจาก `## [Unreleased]` ใน `CHANGELOG.md` ไปยังส่วนที่ลงวันที่:
   - `## [x.y.z] — ปปปป-ดด-วว`
3. เก็บ `## [Unreleased]` ไว้เป็นส่วนบันทึกการเปลี่ยนแปลงแรกสำหรับงานที่กำลังจะมาถึง
4. ตรวจสอบให้แน่ใจว่าส่วน semver ล่าสุดใน `CHANGELOG.md` เท่ากับเวอร์ชัน `package.json`## API Docs

5. อัปเดต `docs/openapi.yaml`:
   - `info.version` ต้องเท่ากับเวอร์ชัน `package.json`
6. ตรวจสอบตัวอย่างตำแหน่งข้อมูลหากสัญญา API มีการเปลี่ยนแปลง## Runtime Docs

7. ตรวจสอบ `docs/ARCHITECTURE.md` สำหรับการจัดเก็บ/รันไทม์ดริฟท์
8. ตรวจสอบ `docs/TROUBLESHOOTING.md` สำหรับ env var และดริฟท์การปฏิบัติงาน
9. อัปเดตเอกสารที่แปลเป็นภาษาท้องถิ่นหากเอกสารต้นฉบับมีการเปลี่ยนแปลงอย่างมาก## Automated Check

เรียกใช้ตัวป้องกันการซิงค์ในเครื่องก่อนที่จะเปิด PR:```bash
npm run check:docs-sync

```

CI ยังรันการตรวจสอบนี้ใน `.github/workflows/ci.yml` (งานผ้าสำลี)
```
