# OmniRoute — Dashboard Features Gallery (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Panduan visual untuk setiap bahagian papan pemuka OmniRoute.---

## 🔌 Providers

Urus sambungan pembekal AI: penyedia OAuth (Claude Code, Codex, Gemini CLI), penyedia kunci API (Groq, DeepSeek, OpenRouter) dan penyedia percuma (Qoder, Qwen, Kiro). Akaun Kiro termasuk penjejakan baki kredit — baki kredit, jumlah elaun dan tarikh pembaharuan boleh dilihat dalam Papan Pemuka → Penggunaan.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Cipta gabungan penghalaan model dengan 6 strategi: keutamaan, wajaran, round-robin, rawak, paling kurang digunakan dan dioptimumkan kos. Setiap kombo merangkai berbilang model dengan sandaran automatik dan termasuk templat pantas dan semakan kesediaan.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Analitis penggunaan komprehensif dengan penggunaan token, anggaran kos, peta haba aktiviti, carta pengedaran mingguan dan pecahan setiap pembekal.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Pemantauan masa nyata: masa aktif, memori, versi, persentil kependaman (p50/p95/p99), statistik cache dan keadaan pemutus litar pembekal.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Empat mod untuk penyahpepijatan terjemahan API:**Taman Permainan**(penukar format),**Penguji Sembang**(permintaan langsung),**Bangku Ujian**(ujian kelompok) dan**Monitor Langsung**(strim masa nyata).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Uji mana-mana model terus dari papan pemuka. Pilih pembekal, model dan titik akhir, tulis gesaan dengan Editor Monaco, strim respons dalam masa nyata, batalkan pertengahan strim dan lihat metrik pemasaan.---

## 🎨 Themes _(v2.0.5+)_

Tema warna yang boleh disesuaikan untuk keseluruhan papan pemuka. Pilih daripada 7 warna pratetap (Coral, Biru, Merah, Hijau, Violet, Jingga, Cyan) atau buat tema tersuai dengan memilih mana-mana warna heks. Menyokong mod terang, gelap dan sistem.---

## ⚙️ Settings

Panel tetapan komprehensif dengan tab:

-**Umum**— Storan sistem, pengurusan sandaran (pangkalan data eksport/import) -**Penampilan**— Pemilih tema (gelap/cahaya/sistem), pratetap tema warna dan warna tersuai, keterlihatan log kesihatan, kawalan keterlihatan item bar sisi -**Keselamatan**— Perlindungan titik akhir API, penyekatan pembekal tersuai, penapisan IP, maklumat sesi -**Penghalaan**— Alias model, kemerosotan tugas latar belakang -**Ketahanan**— Kegigihan had kadar, penalaan pemutus litar, nyahdaya automatik akaun terlarang, pemantauan tamat tempoh pembekal -**Lanjutan**— Penggantian konfigurasi, jejak audit konfigurasi, mod degradasi sandaran![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Konfigurasi satu klik untuk alat pengekodan AI: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor dan Factory Droid. Menampilkan penggunaan/set semula konfigurasi automatik, profil sambungan dan pemetaan model.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Papan pemuka untuk menemui dan mengurus ejen CLI. Menunjukkan grid 14 ejen terbina dalam (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) dengan:

-**Status pemasangan**— Dipasang / Tidak Ditemui dengan pengesanan versi -**Lencana protokol**— stdio, HTTP, dsb. -**Ejen tersuai**— Daftar mana-mana alat CLI melalui borang (nama, binari, arahan versi, pertikaian spawn) -**Padanan Cap Jari CLI**— Togol setiap pembekal untuk memadankan tandatangan permintaan CLI asli, mengurangkan risiko larangan sambil mengekalkan IP proksi---

## 🖼️ Media _(v2.0.3+)_

Hasilkan imej, video dan muzik daripada papan pemuka. Menyokong OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open dan MusicGen.---

## 📝 Request Logs

Pengelogan permintaan masa nyata dengan penapisan mengikut pembekal, model, akaun dan kunci API. Menunjukkan kod status, penggunaan token, kependaman dan butiran respons.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Titik akhir API bersatu anda dengan pecahan keupayaan: Pelengkapan Sembang, API Respons, Pembenaman, Penjanaan Imej, Kedudukan Semula, Transkripsi Audio, Teks-ke-Pertuturan, Penyederhanaan dan kunci API berdaftar. Penyepaduan Cloudflare Quick Tunnel dan sokongan proksi awan untuk akses jauh.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Buat, skop dan batalkan kunci API. Setiap kunci boleh dihadkan kepada model/penyedia tertentu dengan akses penuh atau kebenaran baca sahaja. Pengurusan kunci visual dengan penjejakan penggunaan.---

## 📋 Audit Log

Penjejakan tindakan pentadbiran dengan penapisan mengikut jenis tindakan, pelakon, sasaran, alamat IP dan cap masa. Sejarah peristiwa keselamatan penuh.---

## 🖥️ Desktop Application

Apl desktop Native Electron untuk Windows, macOS dan Linux. Jalankan OmniRoute sebagai aplikasi kendiri dengan penyepaduan dulang sistem, sokongan luar talian, kemas kini automatik dan pemasangan satu klik.

ciri utama:

- Undian kesediaan pelayan (tiada skrin kosong pada permulaan sejuk)
- Dulang sistem dengan pengurusan port
- Dasar Keselamatan Kandungan
- Kunci satu contoh
- Kemas kini automatik semasa dimulakan semula
- UI bersyarat platform (lampu isyarat macOS, bar tajuk lalai Windows/Linux)
- Pembungkusan binaan Elektron yang dikeraskan — `node_modules` yang dipautkan dalam himpunan kendiri dikesan dan ditolak sebelum pembungkusan, menghalang pergantungan masa jalan pada mesin binaan (v2.5.5+)

📖 Lihat [`electron/README.md`](../electron/README.md) untuk dokumentasi penuh.
