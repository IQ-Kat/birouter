# Troubleshooting (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Masalah umum dan solusi untuk OmniRoute.---

## Quick Fixes

| Masalah                                   | Solusi                                                                  |
| ----------------------------------------- | ----------------------------------------------------------------------- | --- |
| Login pertama tidak berfungsi             | Setel `INITIAL_PASSWORD` di `.env` (tanpa hardcode default)             |
| Dasbor terbuka pada port yang salah       | Setel `PORT=20128` dan `NEXT_PUBLIC_BASE_URL=http://localhost:20128`    |
| Tidak ada log permintaan di bawah `logs/` | Setel `ENABLE_REQUEST_LOGS=true`                                        |
| EACCES: izin ditolak                      | Setel `DATA_DIR=/path/to/writable/dir` untuk mengganti `~/.omniroute`   |
| Strategi perutean tidak menyimpan         | Perbarui ke v1.4.11+ (perbaikan skema Zod untuk persistensi pengaturan) | --- |

## Provider Issues

### "Language model did not provide messages"

**Penyebab:**Kuota penyedia habis.

**Perbaikan:**

1. Periksa pelacak kuota dasbor
2. Gunakan kombo dengan tier fallback
3. Beralih ke tingkat yang lebih murah/gratis### Rate Limiting

**Penyebab:**Kuota berlangganan habis.

**Perbaikan:**

- Tambahkan cadangan: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Gunakan GLM/MiniMax sebagai cadangan murah### OAuth Token Expired

OmniRoute menyegarkan token secara otomatis. Jika masalah terus berlanjut:

1. Dasbor → Penyedia → Sambungkan kembali
2. Hapus dan tambahkan kembali koneksi penyedia---

## Cloud Issues

### Cloud Sync Errors

1. Verifikasikan `BASE_URL` menunjuk ke instance Anda yang sedang berjalan (misalnya, `http://localhost:20128`)
2. Verifikasikan titik `CLOUD_URL` ke titik akhir cloud Anda (misalnya, `https://omniroute.dev`)
3. Jaga agar nilai `NEXT_PUBLIC_*` selaras dengan nilai sisi server### Cloud `stream=false` Returns 500

**Gejala:**`Token 'd'...` tak terduga di titik akhir cloud untuk panggilan non-streaming.

**Penyebab:**Upstream mengembalikan payload SSE sementara klien mengharapkan JSON.

**Solusi:**Gunakan `stream=true` untuk panggilan cloud langsung. Waktu proses lokal mencakup penggantian SSE→JSON.### Cloud Says Connected but "Invalid API key"

1. Buat kunci baru dari dasbor lokal (`/api/keys`)
2. Jalankan sinkronisasi cloud: Aktifkan Cloud → Sinkronkan Sekarang
3. Kunci lama/tidak disinkronkan masih dapat mengembalikan `401` di cloud---

## Docker Issues

### CLI Tool Shows Not Installed

1. Periksa kolom runtime: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Untuk mode portabel: gunakan target gambar `runner-cli` (CLI yang dibundel)
3. Untuk mode pemasangan host: setel `CLI_EXTRA_PATHS` dan pasang direktori host bin sebagai hanya-baca
4. Jika `installed=true` dan `runnable=false`: biner ditemukan tetapi pemeriksaan kesehatan gagal### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Periksa statistik penggunaan di Dashboard → Penggunaan
2. Ganti model utama ke GLM/MiniMax
3. Gunakan tingkat gratis (Gemini CLI, Qoder) untuk tugas-tugas yang tidak penting
4. Tetapkan anggaran biaya per kunci API: Dasbor → Kunci API → Anggaran---

## Debugging

### Enable Request Logs

Setel `ENABLE_REQUEST_LOGS=true` di file `.env` Anda. Log muncul di bawah direktori `logs/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Status utama: `${DATA_DIR}/storage.sqlite` (penyedia, kombo, alias, kunci, pengaturan)
- Penggunaan: Tabel SQLite di `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + opsional `${DATA_DIR}/log.txt` dan `${DATA_DIR}/call_logs/`
- Log permintaan: `<repo>/logs/...` (bila `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Ketika pemutus arus penyedia TERBUKA, permintaan diblokir hingga cooldown berakhir.

**Perbaikan:**

1. Buka**Dasbor → Pengaturan → Ketahanan**
2. Periksa kartu pemutus arus untuk penyedia yang terpengaruh
3. Klik**Reset Semua**untuk menghapus semua pemutus, atau tunggu hingga cooldown berakhir
4. Pastikan penyedia benar-benar tersedia sebelum melakukan reset### Provider keeps tripping the circuit breaker

Jika penyedia berulang kali memasuki status OPEN:

1. Periksa**Dasbor → Kesehatan → Kesehatan Penyedia**untuk mengetahui pola kegagalannya
2. Buka**Pengaturan → Ketahanan → Profil Penyedia**dan tingkatkan ambang kegagalan
3. Periksa apakah penyedia telah mengubah batas API atau memerlukan autentikasi ulang
4. Tinjau telemetri latensi — latensi tinggi dapat menyebabkan kegagalan berbasis waktu habis---

## Audio Transcription Issues

### "Unsupported model" error

- Pastikan Anda menggunakan awalan yang benar: `deepgram/nova-3` atau `assemblyai/best`
- Verifikasi penyedia terhubung di**Dasbor → Penyedia**### Transcription returns empty or fails

- Periksa format audio yang didukung: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Pastikan ukuran file berada dalam batas penyedia (biasanya <25MB)
- Periksa validitas kunci API penyedia di kartu penyedia---

## Translator Debugging

Gunakan**Dasbor → Penerjemah**untuk men-debug masalah terjemahan format:

| Modus                | Kapan Menggunakan                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Taman Bermain**    | Bandingkan format masukan/keluaran secara berdampingan — tempelkan permintaan yang gagal untuk melihat terjemahannya |
| **Penguji Obrolan**  | Kirim pesan langsung dan periksa muatan permintaan/respons lengkap termasuk header                                   |
| **Bangku Tes**       | Jalankan pengujian batch di seluruh kombinasi format untuk menemukan terjemahan mana yang rusak                      |
| **Monitor Langsung** | Tonton alur permintaan waktu nyata untuk mengetahui masalah terjemahan yang terputus-putus                           | ### Common format issues |

-**Tag berpikir tidak muncul**— Periksa apakah penyedia target mendukung pemikiran dan pengaturan anggaran pemikiran -**Panggilan alat terputus**— Beberapa terjemahan format mungkin menghapus bidang yang tidak didukung; verifikasi dalam mode Taman Bermain -**Perintah sistem hilang**— Claude dan Gemini menangani perintah sistem secara berbeda; periksa keluaran terjemahan -**SDK mengembalikan string mentah, bukan objek**— Diperbaiki di v1.1.0: pembersih respons sekarang menghapus kolom non-standar (`x_groq`, `usage_breakdown`, dll.) yang menyebabkan kegagalan validasi OpenAI SDK Pydantic -**GLM/ERNIE menolak peran `sistem`**— Diperbaiki di v1.1.0: penormal peran secara otomatis menggabungkan pesan sistem ke dalam pesan pengguna untuk model yang tidak kompatibel -**`peran pengembang` tidak dikenali**— Diperbaiki di v1.1.0: otomatis dikonversi ke `sistem` untuk penyedia non-OpenAI -**`json_schema` tidak berfungsi dengan Gemini**— Diperbaiki di v1.1.0: `response_format` sekarang dikonversi ke `responseMimeType` + `responseSchema` Gemini---

## Resilience Settings

### Auto rate-limit not triggering

- Batas tarif otomatis hanya berlaku untuk penyedia kunci API (bukan OAuth/langganan)
- Verifikasi**Pengaturan → Ketahanan → Profil Penyedia**telah mengaktifkan batas tarif otomatis
- Periksa apakah penyedia mengembalikan kode status `429` atau header `Retry-After`### Tuning exponential backoff

Profil penyedia mendukung pengaturan berikut:

-**Penundaan dasar**— Waktu tunggu awal setelah kegagalan pertama (default: 1 detik) -**Penundaan maksimal**— Batas waktu tunggu maksimum (default: 30 detik) -**Pengganda**— Berapa banyak peningkatan penundaan per kegagalan berturut-turut (default: 2x)### Anti-thundering herd

Ketika banyak permintaan bersamaan mencapai penyedia dengan tarif terbatas, OmniRoute menggunakan mutex + pembatasan tarif otomatis untuk membuat serialisasi permintaan dan mencegah kegagalan berjenjang. Ini otomatis untuk penyedia kunci API.---

## Optional RAG / LLM failure taxonomy (16 problems)

Beberapa pengguna OmniRoute menempatkan gateway di depan tumpukan RAG atau agen. Dalam pengaturan tersebut, biasanya terlihat pola yang aneh: OmniRoute terlihat sehat (penyedia aktif, profil perutean baik-baik saja, tidak ada peringatan batas tarif) tetapi jawaban akhirnya masih salah.

Dalam praktiknya, insiden ini biasanya berasal dari pipeline RAG hilir, bukan dari gateway itu sendiri.

Jika Anda ingin kosakata bersama untuk menjelaskan kegagalan tersebut, Anda dapat menggunakan WFGY ProblemMap, sumber teks lisensi MIT eksternal yang mendefinisikan enam belas pola kegagalan RAG / LLM yang berulang. Pada tingkat tinggi mencakup:

- penyimpangan pengambilan dan batas konteks yang rusak
- indeks dan penyimpanan vektor kosong atau basi
- penyematan versus ketidakcocokan semantik
- masalah perakitan cepat dan jendela konteks
- logika runtuh dan jawaban terlalu percaya diri
- kegagalan koordinasi rantai panjang dan agen
- memori multi agen dan penyimpangan peran
- masalah penerapan dan pemesanan bootstrap

Idenya sederhana:

1. Saat Anda menyelidiki respons yang buruk, catatlah:
   - tugas dan permintaan pengguna
   - kombo rute atau penyedia di OmniRoute
   - konteks RAG apa pun yang digunakan di hilir (dokumen yang diambil, panggilan alat, dll)
2. Petakan kejadian ke satu atau dua nomor Peta Masalah WFGY (`No.1` … `No.16`).
3. Simpan nomor tersebut di dasbor, runbook, atau pelacak insiden Anda sendiri di samping log OmniRoute.
4. Gunakan halaman WFGY yang sesuai untuk memutuskan apakah Anda perlu mengubah tumpukan RAG, retriever, atau strategi perutean Anda.

Teks lengkap dan resep konkret ada di sini (lisensi MIT, hanya teks):

[README Peta Masalah WFGY](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Anda dapat mengabaikan bagian ini jika Anda tidak menjalankan RAG atau alur agen di belakang OmniRoute.---

## Still Stuck?

-**Masalah GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Arsitektur**: Lihat [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) untuk detail internal -**Referensi API**: Lihat [`docs/API_REFERENCE.md`](API_REFERENCE.md) untuk semua titik akhir -**Dasbor Kesehatan**: Periksa**Dasbor → Kesehatan**untuk status sistem waktu nyata -**Penerjemah**: Gunakan**Dasbor → Penerjemah**untuk men-debug masalah format
