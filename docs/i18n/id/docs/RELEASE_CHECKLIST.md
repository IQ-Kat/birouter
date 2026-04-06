# Release Checklist (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../es/docs/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../fr/docs/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../de/docs/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../it/docs/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../ru/docs/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../ja/docs/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../ko/docs/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../ar/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../hi/docs/RELEASE_CHECKLIST.md) · 🇮🇳 [in](../../in/docs/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../th/docs/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../vi/docs/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../id/docs/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../ms/docs/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../nl/docs/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../pl/docs/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../sv/docs/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../no/docs/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../da/docs/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../fi/docs/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../pt/docs/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../ro/docs/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../hu/docs/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../bg/docs/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../sk/docs/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../he/docs/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../phi/docs/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../cs/docs/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../tr/docs/RELEASE_CHECKLIST.md)

---

Gunakan daftar periksa ini sebelum memberi tag atau menerbitkan rilis OmniRoute baru.## Version and Changelog

1. Bump versi `package.json` (`x.y.z`) di cabang rilis.
2. Pindahkan catatan rilis dari `## [Belum Dirilis]` di `CHANGELOG.md` ke bagian bertanggal:
   - `## [x.y.z] — YYYY-MM-DD`
3. Simpan `## [Belum Dirilis]` sebagai bagian log perubahan pertama untuk pekerjaan berikutnya.
4. Pastikan bagian semver terbaru di `CHANGELOG.md` sama dengan versi `package.json`.## API Docs

5. Perbarui `docs/openapi.yaml`:
   - `info.version` harus sama dengan versi `package.json`.
6. Validasi contoh titik akhir jika kontrak API berubah.## Runtime Docs

7. Tinjau `docs/ARCHITECTURE.md` untuk penyimpangan penyimpanan/runtime.
8. Tinjau `docs/TROUBLESHOOTING.md` untuk env var dan penyimpangan operasional.
9. Perbarui dokumen yang dilokalkan jika dokumen sumber berubah secara signifikan.## Automated Check

Jalankan penjaga sinkronisasi secara lokal sebelum membuka PR:```bash
npm run check:docs-sync

```

CI juga menjalankan pemeriksaan ini di `.github/workflows/ci.yml` (lint job).
```
