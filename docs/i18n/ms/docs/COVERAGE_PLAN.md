# Test Coverage Plan (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/COVERAGE_PLAN.md) · 🇪🇸 [es](../../es/docs/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../fr/docs/COVERAGE_PLAN.md) · 🇩🇪 [de](../../de/docs/COVERAGE_PLAN.md) · 🇮🇹 [it](../../it/docs/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../ru/docs/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../ja/docs/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../ko/docs/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../ar/docs/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../hi/docs/COVERAGE_PLAN.md) · 🇮🇳 [in](../../in/docs/COVERAGE_PLAN.md) · 🇹🇭 [th](../../th/docs/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../vi/docs/COVERAGE_PLAN.md) · 🇮🇩 [id](../../id/docs/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../ms/docs/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../nl/docs/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../pl/docs/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../sv/docs/COVERAGE_PLAN.md) · 🇳🇴 [no](../../no/docs/COVERAGE_PLAN.md) · 🇩🇰 [da](../../da/docs/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../fi/docs/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../pt/docs/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../ro/docs/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../hu/docs/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../bg/docs/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../sk/docs/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/COVERAGE_PLAN.md) · 🇮🇱 [he](../../he/docs/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../phi/docs/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../cs/docs/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../tr/docs/COVERAGE_PLAN.md)

---

Kemas kini terakhir: 2026-03-28## Baseline

Terdapat berbilang nombor liputan bergantung pada cara laporan dikira. Untuk perancangan, hanya satu daripada mereka yang berguna.

| Metrik                     | Skop                                                              | Kenyataan / Baris | Cawangan | Fungsi | Nota                                                        |
| -------------------------- | ----------------------------------------------------------------- | ----------------: | -------: | -----: | ----------------------------------------------------------- |
| Legasi                     | Lama `npm run test:coverage`                                      |            79.42% |   75.15% | 67.94% | Dilambung: mengira fail ujian dan tidak termasuk `open-sse` |
| Diagnostik                 | Sumber sahaja, tidak termasuk ujian dan tidak termasuk `open-sse` |            68.16% |   63.55% | 64.06% | Berguna hanya untuk mengasingkan `src/**`                   |
| Garis dasar yang disyorkan | Sumber sahaja, tidak termasuk ujian dan termasuk `open-sse`       |            56.95% |   66.05% | 57.80% | Ini ialah garis dasar seluruh projek untuk menambah baik    |

Garis dasar yang disyorkan ialah nombor untuk dioptimumkan.## Rules

- Sasaran liputan digunakan pada fail sumber, bukan untuk `ujian/**`.
- `open-sse/**` ialah sebahagian daripada produk dan mesti kekal dalam skop.
- Kod baharu tidak seharusnya mengurangkan liputan di kawasan yang disentuh.
- Lebih suka gelagat ujian dan hasil cawangan daripada butiran pelaksanaan.
- Lebih suka pangkalan data SQLite temp dan lekapan kecil berbanding olok-olok luas untuk `src/lib/db/**`.## Current command set

- `npm run test:coverage`
  - Pintu liputan sumber utama untuk suite ujian unit
  - Menghasilkan `text-summary`, `html`, `json-summary` dan `lcov`
- `liputan larian npm:laporan`
  - Laporan fail demi fail terperinci daripada larian terkini
- `npm run test:coverage:legacy`
  - Perbandingan sejarah sahaja## Milestones

| Fasa   |               Sasaran | Fokus                                                          |
| ------ | --------------------: | -------------------------------------------------------------- |
| Fasa 1 | 60% kenyataan / baris | Kemenangan cepat dan liputan utiliti berisiko rendah           |
| Fasa 2 |   65% penyata / baris | DB dan asas laluan                                             |
| Fasa 3 | 70% kenyataan / baris | Pengesahan pembekal dan analitis penggunaan                    |
| Fasa 4 | 75% kenyataan / baris | penterjemah dan pembantu `open-sse`                            |
| Fasa 5 | 80% kenyataan / baris | `open-sse` pengendali dan cawangan pelaksana                   |
| Fasa 6 | 85% kenyataan / baris | Kes kelebihan yang lebih sukar, hutang cawangan, suite regresi |
| Fasa 7 | 90% kenyataan / baris | Sapuan akhir, penutupan jurang, ratchet ketat                  |

Cawangan dan fungsi harus naik ke atas dengan setiap fasa, tetapi sasaran keras utama ialah pernyataan / baris.## Priority hotspots

Fail atau kawasan ini menawarkan pulangan terbaik untuk fasa seterusnya:

1. `open-sse/pengendali`
   - `chatCore.ts` pada 7.57%
   - Direktori keseluruhan pada 29.07%
2. `open-sse/penterjemah/permintaan`
   - Direktori keseluruhan pada 36.39%
   - Ramai penterjemah masih menghampiri liputan satu digit
3. `open-sse/penterjemah/respon`
   - Direktori keseluruhan pada 8.07%
4. `open-sse/executors`
   - Direktori keseluruhan pada 36.62%
5. `src/lib/db`
   - `models.ts` pada 20.66%
   - `registeredKeys.ts` pada 34.46%
   - `modelComboMappings.ts` pada 36.25%
   - `settings.ts` pada 46.40%
   - `webhooks.ts` pada 33.33%
6. `src/lib/usage`
   - `usageHistory.ts` pada 21.12%
   - `usageStats.ts` pada 9.56%
   - `costCalculator.ts` pada 30.00%
7. `src/lib/penyedia`
   - `validation.ts` pada 41.16%
8. Fail utiliti dan API berisiko rendah untuk keuntungan awal
   - `src/shared/utils/upstreamError.ts`
   - `src/shared/utils/apiAuth.ts`
   - `src/lib/api/errorResponse.ts`
   - `src/app/api/settings/require-login/route.ts`
   - `src/app/api/providers/[id]/models/route.ts`## Execution checklist

### Phase 1: 56.95% -> 60%

- [x] Betulkan metrik liputan supaya ia mencerminkan kod sumber dan bukannya fail ujian
- [x] Simpan skrip liputan lama untuk perbandingan
- [x] Rakam garis dasar dan tempat liputan dalam repo
- [ ] Tambah ujian tertumpu untuk utiliti berisiko rendah:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Tambah ujian laluan untuk:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`### Phase 2: 60% -> 65%

- [ ] Tambah ujian yang disokong DB untuk:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Tutup gelagat cawangan dalam:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`### Phase 3: 65% -> 70%

- [ ] Tambah ujian analitis penggunaan untuk:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Kembangkan liputan laluan untuk pengurusan proksi dan cawangan tetapan### Phase 4: 70% -> 75%

- [ ] Penutup pembantu penterjemah dan laluan terjemahan pusat:
  - `open-sse/translator/index.ts`
  - `open-sse/penterjemah/pembantu/*`
  - `open-sse/penterjemah/permintaan/*`
  - `open-sse/penterjemah/respons/*`### Phase 5: 75% -> 80%

- [ ] Tambah ujian peringkat pengendali untuk:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Tambah liputan cawangan pelaksana untuk pengesahan, percubaan semula dan penggantian titik akhir khusus pembekal### Phase 6: 80% -> 85%

- [ ] Gabungkan lebih banyak suite sarung tepi ke dalam laluan liputan utama
- [ ] Tingkatkan liputan fungsi untuk modul DB dengan liputan pembina/pembantu yang lemah
- [ ] Tutup jurang cawangan dalam `settings.ts`, `registeredKeys.ts`, `validation.ts` dan pembantu penterjemah### Phase 7: 85% -> 90%

- [ ] Anggap baki fail liputan rendah sebagai penyekat
- [ ] Tambah ujian regresi untuk setiap pepijat pengeluaran yang ditemui diperbaiki semasa tolakan kepada 90%
- [ ] Naikkan pintu liputan dalam CI hanya selepas garis dasar tempatan stabil untuk sekurang-kurangnya dua larian berturut-turut## Ratchet policy

Kemas kini ambang `npm run test:coverage` hanya selepas projek benar-benar melebihi pencapaian seterusnya dengan penimbal yang selesa.

Urutan ratchet yang disyorkan:

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72
6. 80/75/78
7. 85/80/84
8. 90/85/88

Susunan ialah `garis-garis penyata / cawangan / fungsi`.## Known gap

Perintah liputan semasa mengukur suite unit Nod utama dan termasuk sumber yang dicapai daripadanya, termasuk `open-sse`. Ia belum lagi menggabungkan liputan Vitest ke dalam satu laporan bersatu. Gabungan itu patut dilakukan kemudian, tetapi ia bukan penghalang untuk memulakan pendakian 60% -> 80%.
