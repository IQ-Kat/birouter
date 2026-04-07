# OmniRoute — Dashboard Features Gallery (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Panduan visual untuk setiap bagian dasbor OmniRoute.---

## 🔌 Providers

Kelola koneksi penyedia AI: Penyedia OAuth (Claude Code, Codex, Gemini CLI), penyedia kunci API (Groq, DeepSeek, OpenRouter), dan penyedia gratis (Qoder, Qwen, Kiro). Akun Kiro mencakup pelacakan saldo kredit — sisa kredit, total penyisihan, dan tanggal perpanjangan yang terlihat di Dasbor → Penggunaan.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Buat kombo perutean model dengan 6 strategi: prioritas, berbobot, round-robin, acak, paling jarang digunakan, dan hemat biaya. Setiap kombo merangkai beberapa model dengan fallback otomatis dan mencakup templat cepat serta pemeriksaan kesiapan.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Analisis penggunaan yang komprehensif dengan konsumsi token, perkiraan biaya, peta panas aktivitas, grafik distribusi mingguan, dan perincian per penyedia.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Pemantauan waktu nyata: waktu aktif, memori, versi, persentil latensi (p50/p95/p99), statistik cache, dan status pemutus sirkuit penyedia.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Empat mode untuk men-debug terjemahan API:**Playground**(konverter format),**Chat Tester**(permintaan langsung),**Test Bench**(pengujian batch), dan**Live Monitor**(streaming real-time).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Uji model apa pun langsung dari dasbor. Pilih penyedia, model, dan titik akhir, tulis perintah dengan Monaco Editor, streaming respons secara real-time, batalkan mid-stream, dan lihat metrik waktu.---

## 🎨 Themes _(v2.0.5+)_

Tema warna yang dapat disesuaikan untuk seluruh dasbor. Pilih dari 7 warna preset (Coral, Blue, Red, Green, Violet, Orange, Cyan) atau buat tema khusus dengan memilih warna hex apa pun. Mendukung mode terang, gelap, dan sistem.---

## ⚙️ Settings

Panel pengaturan komprehensif dengan tab:

-**Umum**— Penyimpanan sistem, manajemen cadangan (database ekspor/impor) -**Penampilan**— Pemilih tema (gelap/terang/sistem), preset tema warna dan warna khusus, visibilitas log kesehatan, kontrol visibilitas item sidebar -**Keamanan**— Perlindungan titik akhir API, pemblokiran penyedia khusus, pemfilteran IP, info sesi -**Perutean**— Alias model, degradasi tugas latar belakang -**Ketahanan**— Persistensi batas nilai, penyetelan pemutus sirkuit, penonaktifan otomatis akun yang diblokir, pemantauan kedaluwarsa penyedia -**Lanjutan**— Penggantian konfigurasi, jejak audit konfigurasi, mode degradasi fallback![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Konfigurasi sekali klik untuk alat pengkodean AI: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor, dan Factory Droid. Menampilkan penerapan/reset konfigurasi otomatis, profil koneksi, dan pemetaan model.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Dasbor untuk menemukan dan mengelola agen CLI. Menampilkan kisi 14 agen bawaan (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) dengan:

-**Status instalasi**— Terpasang / Tidak Ditemukan dengan deteksi versi -**Lencana protokol**— stdio, HTTP, dll. -**Agen khusus**— Daftarkan alat CLI apa pun melalui formulir (nama, biner, perintah versi, argumen spawn) -**Pencocokan Sidik Jari CLI**— Tombol per penyedia untuk mencocokkan tanda tangan permintaan CLI asli, mengurangi risiko larangan sekaligus mempertahankan IP proxy---

## 🖼️ Media _(v2.0.3+)_

Generate images, videos, and music from the dashboard. Mendukung OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open, dan MusicGen.---

## 📝 Request Logs

Pencatatan permintaan secara real-time dengan pemfilteran berdasarkan penyedia, model, akun, dan kunci API. Menampilkan kode status, penggunaan token, latensi, dan detail respons.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Titik akhir API terpadu Anda dengan perincian kemampuan: Penyelesaian Obrolan, API Respons, Penyematan, Pembuatan Gambar, Pemeringkatan Ulang, Transkripsi Audio, Text-to-Speech, Moderasi, dan kunci API terdaftar. Integrasi Cloudflare Quick Tunnel dan dukungan proxy cloud untuk akses jarak jauh.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Membuat, mencakup, dan mencabut kunci API. Setiap kunci dapat dibatasi untuk model/penyedia tertentu dengan akses penuh atau izin hanya baca. Manajemen kunci visual dengan pelacakan penggunaan.---

## 📋 Audit Log

Pelacakan tindakan administratif dengan pemfilteran berdasarkan jenis tindakan, aktor, target, alamat IP, dan stempel waktu. Riwayat peristiwa keamanan penuh.---

## 🖥️ Desktop Application

Aplikasi desktop Native Electron untuk Windows, macOS, dan Linux. Jalankan OmniRoute sebagai aplikasi mandiri dengan integrasi baki sistem, dukungan offline, pembaruan otomatis, dan instalasi sekali klik.

Fitur utama:

- Polling kesiapan server (tidak ada layar kosong saat cold start)
- Baki sistem dengan manajemen port
- Kebijakan Keamanan Konten
- Kunci instans tunggal
- Pembaruan otomatis saat restart
- UI bersyarat platform (lampu lalu lintas macOS, bilah judul default Windows/Linux)
- Pengemasan build Hardened Electron — `node_modules` yang disinkronkan dalam bundel mandiri terdeteksi dan ditolak sebelum pengemasan, mencegah ketergantungan runtime pada mesin build (v2.5.5+)

📖 Lihat [`electron/README.md`](../electron/README.md) untuk dokumentasi lengkap.
