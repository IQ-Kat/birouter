# Release Checklist (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Gunakan senarai semak ini sebelum menandai atau menerbitkan keluaran OmniRoute baharu.## Version and Changelog

1. Bump versi `package.json` (`x.y.z`) dalam cawangan keluaran.
2. Alihkan nota keluaran daripada `## [Tidak Dikeluarkan]` dalam `CHANGELOG.md` ke bahagian bertarikh:
   - `## [x.y.z] — YYYY-MM-DD`
3. Kekalkan `## [Tidak Dikeluarkan]` sebagai bahagian log perubahan pertama untuk kerja akan datang.
4. Pastikan bahagian semver terkini dalam `CHANGELOG.md` sama dengan versi `package.json`.## API Docs

5. Kemas kini `docs/openapi.yaml`:
   - `info.version` mestilah sama dengan versi `package.json`.
6. Sahkan contoh titik akhir jika kontrak API berubah.## Runtime Docs

7. Semak `docs/ARCHITECTURE.md` untuk penyimpanan/runtime drift.
8. Semak `docs/TROUBLESHOOTING.md` untuk env var dan drift operasi.
9. Kemas kini dokumen setempat jika dokumen sumber berubah dengan ketara.## Automated Check

Jalankan pengawal penyegerakan secara setempat sebelum membuka PR:```bash
npm run check:docs-sync

```

CI juga menjalankan semakan ini dalam `.github/workflows/ci.yml` (lint job).
```
