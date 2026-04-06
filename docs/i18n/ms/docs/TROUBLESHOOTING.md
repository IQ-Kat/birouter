# Troubleshooting (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Masalah dan penyelesaian biasa untuk OmniRoute.---

## Quick Fixes

| Masalah                                  | Penyelesaian                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------ | --- |
| Log masuk pertama tidak berfungsi        | Tetapkan `INITIAL_PASSWORD` dalam `.env` (tiada lalai berkod keras)      |
| Papan pemuka dibuka pada port yang salah | Tetapkan `PORT=20128` dan `NEXT_PUBLIC_BASE_URL=http://localhost:20128`  |
| Tiada log permintaan di bawah `log/`     | Tetapkan `ENABLE_REQUEST_LOGS=true`                                      |
| EACCES: kebenaran ditolak                | Tetapkan `DATA_DIR=/path/to/writable/dir` untuk mengatasi `~/.omniroute` |
| Strategi penghalaan tidak menyimpan      | Kemas kini kepada v1.4.11+ (Pembetulan skema Zod untuk tetapan tetapan)  | --- |

## Provider Issues

### "Language model did not provide messages"

**Punca:**Kuota pembekal habis.

**Betulkan:**

1. Semak penjejak kuota papan pemuka
2. Gunakan kombo dengan peringkat sandaran
3. Tukar kepada peringkat yang lebih murah/percuma### Rate Limiting

**Punca:**Kuota langganan habis.

**Betulkan:**

- Tambahkan sandaran: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Gunakan GLM/MiniMax sebagai sandaran murah### OAuth Token Expired

Token auto-refresh OmniRoute. Jika isu berterusan:

1. Papan pemuka → Pembekal → Sambung semula
2. Padam dan tambah semula sambungan pembekal---

## Cloud Issues

### Cloud Sync Errors

1. Sahkan mata `BASE_URL` pada contoh larian anda (cth., `http://localhost:20128`)
2. Sahkan titik `CLOUD_URL` ke titik akhir awan anda (cth., `https://omniroute.dev`)
3. Pastikan nilai `NEXT_PUBLIC_*` sejajar dengan nilai sebelah pelayan### Cloud `stream=false` Returns 500

**Simptom:**`Token 'd' yang tidak dijangka...` pada titik akhir awan untuk panggilan bukan penstriman.

**Punca:**Hulu mengembalikan muatan SSE sementara pelanggan menjangkakan JSON.

**Penyelesaian:**Gunakan `strim=true` untuk panggilan terus awan. Masa jalan tempatan termasuk SSE→JSON sandaran.### Cloud Says Connected but "Invalid API key"

1. Cipta kunci baharu daripada papan pemuka setempat (`/api/keys`)
2. Jalankan penyegerakan awan: Dayakan Awan → Segerakkan Sekarang
3. Kekunci lama/tidak disegerakkan masih boleh mengembalikan `401` pada awan---

## Docker Issues

### CLI Tool Shows Not Installed

1. Semak medan masa jalan: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Untuk mod mudah alih: gunakan sasaran imej `runner-cli` (CLI yang digabungkan)
3. Untuk mod lekap hos: tetapkan `CLI_EXTRA_PATHS` dan lekapkan direktori bin hos sebagai baca sahaja
4. Jika `installed=true` dan `runnable=false`: binari ditemui tetapi gagal pemeriksaan kesihatan### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Semak statistik penggunaan dalam Papan Pemuka → Penggunaan
2. Tukar model utama kepada GLM/MiniMax
3. Gunakan peringkat percuma (Gemini CLI, Qoder) untuk tugasan yang tidak kritikal
4. Tetapkan belanjawan kos setiap kunci API: Papan Pemuka → Kunci API → Belanjawan---

## Debugging

### Enable Request Logs

Tetapkan `ENABLE_REQUEST_LOGS=true` dalam fail `.env` anda. Log muncul di bawah direktori `log/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Keadaan utama: `${DATA_DIR}/storage.sqlite` (penyedia, kombo, alias, kunci, tetapan)
- Penggunaan: Jadual SQLite dalam `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + pilihan `${DATA_DIR}/log.txt` dan `${DATA_DIR}/call_logs/`
- Log permintaan: `<repo>/logs/...` (apabila `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Apabila pemutus litar pembekal DIBUKA, permintaan disekat sehingga tempoh bertenang tamat.

**Betulkan:**

1. Pergi ke**Papan Pemuka → Tetapan → Ketahanan**
2. Periksa kad pemutus litar untuk pembekal yang terjejas
3. Klik**Tetapkan Semula Semua**untuk mengosongkan semua pemutus, atau tunggu sehingga tempoh bertenang tamat
4. Sahkan pembekal sebenarnya tersedia sebelum menetapkan semula### Provider keeps tripping the circuit breaker

Jika pembekal berulang kali memasuki keadaan OPEN:

1. Semak**Papan Pemuka → Kesihatan → Kesihatan Pembekal**untuk corak kegagalan
2. Pergi ke**Tetapan → Ketahanan → Profil Pembekal**dan tingkatkan ambang kegagalan
3. Semak sama ada pembekal telah menukar had API atau memerlukan pengesahan semula
4. Semak telemetri kependaman — kependaman tinggi boleh menyebabkan kegagalan berdasarkan tamat masa---

## Audio Transcription Issues

### "Unsupported model" error

- Pastikan anda menggunakan awalan yang betul: `deepgram/nova-3` atau `assemblyai/best`
- Sahkan pembekal disambungkan dalam**Papan Pemuka → Pembekal**### Transcription returns empty or fails

- Semak format audio yang disokong: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Sahkan saiz fail berada dalam had pembekal (biasanya < 25MB)
- Semak kesahihan kunci API pembekal dalam kad pembekal---

## Translator Debugging

Gunakan**Papan Pemuka → Penterjemah**untuk menyahpepijat isu terjemahan format:

| Mod                   | Bila Menggunakan                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| **Taman Permainan**   | Bandingkan format input/output sebelah menyebelah — tampal permintaan yang gagal untuk melihat cara ia menterjemah |
| **Penguji Sembang**   | Hantar mesej langsung dan periksa muatan penuh permintaan/tindak balas termasuk pengepala                          |
| **Bangku Ujian**      | Jalankan ujian kelompok merentas gabungan format untuk mencari terjemahan yang rosak                               |
| **Pemantau Langsung** | Tonton aliran permintaan masa nyata untuk menangkap isu terjemahan terputus-putus                                  | ### Common format issues |

-**Teg pemikiran tidak muncul**— Semak sama ada pembekal sasaran menyokong pemikiran dan tetapan belanjawan pemikiran -**Panggilan alat terputus**— Sesetengah terjemahan format mungkin menanggalkan medan yang tidak disokong; sahkan dalam mod Taman Permainan -**Gesaan sistem tiada**— Gesaan sistem pengendalian Claude dan Gemini secara berbeza; semak output terjemahan -**SDK mengembalikan rentetan mentah dan bukannya objek**— Ditetapkan dalam v1.1.0: sanitizer respons kini menanggalkan medan bukan standard (`x_groq`, `penggunaan_pecahan`, dsb.) yang menyebabkan kegagalan pengesahan OpenAI SDK Pydantic -**GLM/ERNIE menolak peranan `sistem`**— Ditetapkan dalam v1.1.0: penormal peranan secara automatik menggabungkan mesej sistem ke dalam mesej pengguna untuk model yang tidak serasi -**peranan `pembangun` tidak dikenali**— Ditetapkan dalam v1.1.0: ditukar secara automatik kepada `sistem` untuk penyedia bukan OpenAI -**`json_schema` tidak berfungsi dengan Gemini**— Dibetulkan dalam v1.1.0: `response_format` kini ditukar kepada `responseMimeType` + `responseSchema` Gemini---

## Resilience Settings

### Auto rate-limit not triggering

- Had kadar automatik hanya digunakan untuk penyedia kunci API (bukan OAuth/langganan)
- Sahkan**Tetapan → Ketahanan → Profil Pembekal**telah didayakan had kadar automatik
- Semak sama ada pembekal mengembalikan kod status `429` atau pengepala `Cuba-Selepas`### Tuning exponential backoff

Profil pembekal menyokong tetapan ini:

-**Kelewatan asas**— Masa menunggu awal selepas kegagalan pertama (lalai: 1s) -**Lengah maksimum**— Had masa menunggu maksimum (lalai: 30s) -**Pendarab**— Berapa banyak untuk meningkatkan kelewatan setiap kegagalan berturut-turut (lalai: 2x)### Anti-thundering herd

Apabila banyak permintaan serentak melanda penyedia terhad kadar, OmniRoute menggunakan mutex + pengehadan kadar automatik untuk menyerikan permintaan dan mencegah kegagalan berlatarkan. Ini adalah automatik untuk pembekal kunci API.---

## Optional RAG / LLM failure taxonomy (16 problems)

Sesetengah pengguna OmniRoute meletakkan get laluan di hadapan RAG atau susunan ejen. Dalam persediaan tersebut adalah perkara biasa untuk melihat corak pelik: OmniRoute kelihatan sihat (penyedia, profil penghalaan ok, tiada makluman had kadar) tetapi jawapan akhir masih salah.

Dalam praktiknya, kejadian ini biasanya datang dari saluran paip RAG hiliran, bukan dari pintu masuk itu sendiri.

Jika anda mahukan perbendaharaan kata yang dikongsi untuk menerangkan kegagalan tersebut, anda boleh menggunakan WFGY ProblemMap, sumber teks lesen MIT luaran yang mentakrifkan enam belas corak kegagalan RAG / LLM berulang. Pada peringkat tinggi ia meliputi:

- dapatan semula hanyut dan sempadan konteks yang pecah
- indeks kosong atau basi dan kedai vektor
- pembenaman berbanding ketidakpadanan semantik
- isu tetingkap pemasangan dan konteks segera
- logik runtuh dan jawapan terlalu yakin
- rantai panjang dan kegagalan koordinasi ejen
- memori pelbagai ejen dan hanyut peranan
- masalah penempatan dan pesanan bootstrap

Ideanya mudah:

1. Apabila anda menyiasat respons yang tidak baik, tangkap:
   - tugas dan permintaan pengguna
   - kombo laluan atau pembekal dalam OmniRoute
   - sebarang konteks RAG yang digunakan di hiliran (dokumen yang diambil, panggilan alat, dll)
2. Petakan kejadian kepada satu atau dua nombor Peta Masalah WFGY (`No.1` … `No.16`).
3. Simpan nombor dalam papan pemuka, buku jalanan atau penjejak insiden anda sendiri di sebelah log OmniRoute.
4. Gunakan halaman WFGY yang sepadan untuk memutuskan sama ada anda perlu menukar strategi susunan RAG, retriever atau penghalaan anda.

Teks penuh dan resipi konkrit hidup di sini (lesen MIT, teks sahaja):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Anda boleh mengabaikan bahagian ini jika anda tidak menjalankan saluran paip RAG atau ejen di belakang OmniRoute.---

## Still Stuck?

-**Isu GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Seni Bina**: Lihat [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) untuk mendapatkan butiran dalaman -**Rujukan API**: Lihat [`docs/API_REFERENCE.md`](API_REFERENCE.md) untuk semua titik akhir -**Papan Pemuka Kesihatan**: Semak**Papan Pemuka → Kesihatan**untuk status sistem masa nyata -**Penterjemah**: Gunakan**Papan Pemuka → Penterjemah**untuk menyahpepijat isu format
