# Test Coverage Plan (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Terakhir diperbarui: 28-03-2026## Baseline

Ada beberapa nomor cakupan tergantung pada bagaimana laporan dihitung. Untuk perencanaan, hanya satu yang berguna.

| Metrik                            | Ruang Lingkup                                                        | Pernyataan / Baris | Cabang | Fungsi | Catatan                                                           |
| --------------------------------- | -------------------------------------------------------------------- | -----------------: | -----: | -----: | ----------------------------------------------------------------- |
| Warisan                           | `npm run test:coverage` lama                                         |             79,42% | 75,15% | 67,94% | Meningkat: menghitung file pengujian dan mengecualikan `open-sse` |
| Diagnostik                        | Hanya sumber, tidak termasuk pengujian dan tidak termasuk `open-sse` |             68,16% | 63,55% | 64,06% | Hanya berguna untuk mengisolasi `src/**`                          |
| Garis dasar yang direkomendasikan | Hanya sumber, tidak termasuk pengujian dan menyertakan `open-sse`    |             56,95% | 66,05% | 57,80% | Ini adalah dasar proyek untuk meningkatkan                        |

Garis dasar yang direkomendasikan adalah angka yang akan dioptimalkan.## Rules

- Target cakupan berlaku untuk file sumber, bukan untuk `tes/**`.
- `open-sse/**` adalah bagian dari produk dan harus tetap berada dalam cakupan.
- Kode baru tidak boleh mengurangi cakupan di area yang disentuh.
- Lebih memilih perilaku pengujian dan hasil cabang daripada detail implementasi.
- Lebih memilih database SQLite sementara dan perlengkapan kecil daripada tiruan luas untuk `src/lib/db/**`.## Current command set

- `npm menjalankan tes: cakupan`
  - Gerbang cakupan sumber utama untuk rangkaian pengujian unit
  - Menghasilkan `ringkasan teks`, `html`, `ringkasan json`, dan `lcov`
- `npm menjalankan cakupan:laporan`
  - Laporan rinci file demi file dari proses terakhir
- `npm menjalankan tes:cakupan:legacy`
  - Perbandingan historis saja## Milestones

| Fase   |              Sasaran | Fokus                                                         |
| ------ | -------------------: | ------------------------------------------------------------- |
| Fase 1 | 60% pernyataan/baris | Kemenangan cepat dan cakupan utilitas berisiko rendah         |
| Fase 2 | 65% pernyataan/baris | DB dan fondasi rute                                           |
| Fase 3 | 70% pernyataan/baris | Validasi penyedia dan analisis penggunaan                     |
| Fase 4 | 75% pernyataan/baris | penerjemah dan pembantu `open-sse`                            |
| Fase 5 | 80% pernyataan/baris | penangan `open-sse` dan cabang pelaksana                      |
| Fase 6 | 85% pernyataan/baris | Kasus-kasus yang lebih sulit, utang cabang, rangkaian regresi |
| Fase 7 | 90% pernyataan/baris | Sapuan terakhir, penutupan celah, ratchet yang ketat          |

Cabang dan fungsi harus meningkat pada setiap fase, tetapi sasaran utama adalah pernyataan/garis.## Priority hotspots

File atau area ini menawarkan keuntungan terbaik untuk tahap berikutnya:

1. `open-sse/handler`
   - `chatCore.ts` sebesar 7,57%
   - Direktori keseluruhan sebesar 29,07%
2. `open-sse/penerjemah/permintaan`
   - Direktori keseluruhan sebesar 36,39%
   - Banyak penerjemah yang masih mendekati cakupan satu digit
3. `open-sse/penerjemah/respons`
   - Direktori keseluruhan sebesar 8,07%
4. `open-sse/eksekutor`
   - Direktori keseluruhan sebesar 36,62%
5. `src/lib/db`
   - `model.ts` pada 20,66%
   - `registeredKeys.ts` pada 34,46%
   - `modelComboMappings.ts` pada 36,25%
   - `pengaturan.ts` pada 46,40%
   - `webhook.ts` sebesar 33,33%
6. `src/lib/penggunaan`
   - `usageHistory.ts` pada 21,12%
   - `usageStats.ts` pada 9,56%
   - `costCalculator.ts` sebesar 30,00%
7. `src/lib/penyedia`
   - `validasi.ts` pada 41,16%
8. Utilitas berisiko rendah dan file API untuk keuntungan awal
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Memperbaiki metrik cakupan sehingga mencerminkan kode sumber dan bukan file pengujian
- [x] Simpan skrip liputan lama untuk perbandingan
- [x] Catat baseline dan hotspot di-repo
- [ ] Tambahkan tes terfokus untuk utilitas berisiko rendah:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Tambahkan tes rute untuk:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Tambahkan tes yang didukung DB untuk:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Meliputi perilaku cabang di:
  - `src/lib/penyedia/validasi.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Tambahkan tes analisis penggunaan untuk:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/penggunaan/costCalculator.ts`
- [ ] Perluas cakupan rute untuk manajemen proxy dan cabang pengaturan### Phase 4: 70% -> 75%

- [ ] Mencakup pembantu penerjemah dan jalur terjemahan pusat:
  - `open-sse/translator/index.ts`
  - `open-sse/penerjemah/pembantu/*`
  - `open-sse/penerjemah/permintaan/*`
  - `open-sse/penerjemah/respons/*`### Phase 5: 75% -> 80%

- [ ] Tambahkan pengujian tingkat penangan untuk:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Tambahkan cakupan cabang pelaksana untuk autentikasi, percobaan ulang, dan penggantian titik akhir khusus penyedia### Phase 6: 80% -> 85%

- [ ] Gabungkan lebih banyak rangkaian kasus tepi ke dalam jalur cakupan utama
- [ ] Meningkatkan cakupan fungsi untuk modul DB dengan cakupan konstruktor/pembantu yang lemah
- [ ] Tutup celah cabang di `settings.ts`, `registeredKeys.ts`, `validation.ts`, dan pembantu penerjemah### Phase 7: 85% -> 90%

- [ ] Perlakukan sisa file dengan cakupan rendah sebagai pemblokir
- [ ] Tambahkan pengujian regresi untuk setiap bug produksi yang ditemukan dan diperbaiki selama push hingga 90%
- [ ] Naikkan gerbang cakupan di CI hanya setelah garis dasar lokal stabil selama setidaknya dua kali berturut-turut## Ratchet policy

Perbarui ambang batas `npm run test:coverage` hanya setelah proyek benar-benar melampaui pencapaian berikutnya dengan buffer yang nyaman.

Urutan ratchet yang disarankan:

1.55/60/55
2.60/62/58
3.65/64/62
4.70/66/66
5.75/70/72
6.80/75/78
7.85/80/84
8.90/85/88

Urutannya adalah `garis pernyataan / cabang / fungsi`.## Known gap

Perintah cakupan saat ini mengukur rangkaian unit Node utama dan mencakup sumber yang dijangkau darinya, termasuk `open-sse`. Itu belum menggabungkan cakupan Vitest menjadi satu laporan terpadu. Penggabungan itu layak dilakukan nanti, tapi ini bukan penghalang untuk memulai pendakian 60% -> 80%.
