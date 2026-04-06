# OmniRoute Auto-Combo Engine (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Rantai model yang dikelola sendiri dengan penilaian adaptif## How It Works

Mesin Kombo Otomatis secara dinamis memilih penyedia/model terbaik untuk setiap permintaan menggunakan**fungsi penilaian 6 faktor**:

| Faktor           | Berat | Deskripsi                                             |
| :--------------- | :---- | :---------------------------------------------------- | ------------- |
| Kuota            | 0,20  | Kapasitas tersisa [0..1]                              |
| Kesehatan        | 0,25  | Pemutus arus: TERTUTUP=1,0, SETENGAH=0,5, TERBUKA=0,0 |
| BiayaInv         | 0,20  | Biaya terbalik (lebih murah = skor lebih tinggi)      |
| LatensiInv       | 0,15  | Latensi p95 terbalik (lebih cepat = lebih tinggi)     |
| Kesesuaian Tugas | 0,10  | Model × skor kebugaran jenis tugas                    |
| Stabilitas       | 0,10  | Varians rendah dalam latensi/kesalahan                | ## Mode Packs |

| Paket                 | Fokus         | Berat Kunci            |
| :-------------------- | :------------ | :--------------------- | --------------- |
| 🚀**Kirim Cepat**     | Kecepatan     | latensiInv: 0,35       |
| 💰**Penghemat Biaya** | Ekonomi       | biayaInv: 0,40         |
| 🎯**Kualitas Utama**  | Model terbaik | Kesesuaian tugas: 0,40 |
| 📡**Ramah Offline**   | Ketersediaan  | kuota: 0,40            | ## Self-Healing |

-**Pengecualian sementara**: Skor < 0,2 → dikecualikan selama 5 menit (backoff progresif, maks 30 menit) -**Kewaspadaan pemutus sirkuit**: BUKA → dikecualikan secara otomatis; HALF_OPEN → permintaan penyelidikan -**Mode insiden**: >50% TERBUKA → nonaktifkan eksplorasi, maksimalkan stabilitas -**Pemulihan masa jeda**: Setelah pengecualian, permintaan pertama adalah "pemeriksaan" dengan batas waktu yang dikurangi## Bandit Exploration

5% permintaan (dapat dikonfigurasi) dialihkan ke penyedia acak untuk eksplorasi. Dinonaktifkan dalam mode insiden.## API

```bash
# Create auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# List auto-combos
curl http://localhost:20128/api/combos/auto
```

## Task Fitness

30+ model mendapat skor dalam 6 jenis tugas (`coding`, `review`, `planning`, `lysis`, `debugging`, `documentation`). Mendukung pola wildcard (misalnya, `*-coder` → skor pengkodean tinggi).## Files

| Berkas                                       | Tujuan                                   |
| :------------------------------------------- | :--------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Fungsi penilaian & normalisasi kumpulan  |
| `open-sse/services/autoCombo/taskFitness.ts` | Pencarian kebugaran model × tugas        |
| `open-sse/services/autoCombo/engine.ts`      | Logika seleksi, bandit, batasan anggaran |
| `open-sse/services/autoCombo/selfHealing.ts` | Pengecualian, penyelidikan, mode insiden |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 profil berat                           |
| `src/app/api/combos/auto/route.ts`           | API REST                                 |
