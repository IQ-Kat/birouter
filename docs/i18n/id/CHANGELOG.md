# Changelog (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Middleware:**Menyelesaikan loop pengalihan tak terbatas di dasbor untuk instance baru ketika requireLogin dinonaktifkan.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Qoder API Native Integration:**Memfaktorkan ulang Qoder Executor sepenuhnya untuk melewati algoritma enkripsi COSY AES/RSA lama, mengarahkan langsung ke URL asli yang kompatibel dengan DashScope OpenAi. Menghilangkan ketergantungan kompleks pada modul Node `crypto` sekaligus meningkatkan fidelitas aliran. -**Perbaikan Mesin Ketahanan:**Konteks terpadu overflow fallback yang anggun, deteksi token OAuth yang proaktif, dan pencegahan emisi konten kosong (#990). -**Strategi Perutean yang Dioptimalkan Konteks:**Menambahkan kemampuan perutean cerdas baru untuk memaksimalkan jendela konteks secara asli dalam penerapan kombo otomatis (#990).### 🐛 Bug Fixes

-**Korupsi Aliran API Respons:**Memperbaiki kerusakan kloning mendalam di mana batasan terjemahan Anthropic/OpenAI menghapus awalan SSE spesifik `response.` dari batas streaming (#992). -**Claude Cache Passthrough Alignment:**Menyelaraskan penanda cache yang Kompatibel dengan CC secara konsisten dengan mode Client Passthrough upstream yang menjaga cache cepat. -**Kebocoran Memori Turbopack:**Disematkan Next.js ke `16.0.10` yang ketat untuk mencegah kebocoran memori dan membuat staleness dari regresi modul hash Turbopack hulu baru-baru ini (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Integrasi Models.dev:**Models.dev terintegrasi sebagai sumber runtime resmi untuk harga model, kemampuan, dan spesifikasi, menggantikan harga hardcode. Termasuk UI pengaturan untuk mengelola interval sinkronisasi, string terjemahan untuk 30 bahasa, dan cakupan pengujian yang kuat. -**Kemampuan Asli Penyedia:**Menambahkan dukungan untuk mendeklarasikan dan memeriksa fitur API asli (misalnya `systemInstructions_supported`) yang mencegah kegagalan dengan membersihkan peran yang tidak valid. Saat ini dikonfigurasi untuk penyedia Gemini Base dan Antigravity OAuth. -**Pengaturan Lanjutan Penyedia API:**Menambahkan penggantian `Agen-Pengguna` khusus per koneksi untuk koneksi penyedia kunci API. Penggantian disimpan di `providerSpecificData.customUserAgent` dan sekarang berlaku untuk pemeriksaan validasi dan permintaan eksekusi upstream.### 🐛 Bug Fixes

-**Keandalan Qwen OAuth:**Menyelesaikan serangkaian masalah integrasi OAuth termasuk pemblokir 400 Permintaan Buruk pada token yang kedaluwarsa, pembuatan cadangan untuk menguraikan properti `access_token` OIDC ketika `id_token` dihilangkan, kesalahan penemuan katalog model, dan pemfilteran ketat header `X-Dashscope-*` untuk menghindari 400 penolakan dari titik akhir yang kompatibel dengan OpenAI.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Kombo-Otomatis & Perutean:**Menyelesaikan integrasi siklus hidup CRUD asli untuk mesin Kombo Otomatis tingkat lanjut (#955). -**Operasi Inti:**Memperbaiki terjemahan yang hilang untuk opsi Kombo Otomatis asli yang baru (#955). -**Validasi Keamanan:**Menonaktifkan tugas pencadangan otomatis SQLite secara asli selama eksekusi CI pengujian unit untuk secara eksplisit mengatasi kebocoran memori Node 22 Event Loop yang tergantung (#956). -**Proksi Ekosistem:**Menyelesaikan penjadwal sinkronisasi model pemetaan integrasi eksplisit, siklus OAuth, dan Penyegaran Pemeriksaan Token dengan aman melalui proksi hulu sistem asli OmniRoute (#953). -**Perluasan MCP:**Ditambahkan dan berhasil mendaftarkan alat kerangka kerja MCP `omniroute_web_search` baru dari versi beta ke dalam skema produksi (#951). -**Logika Penyangga Token:**Menambahkan batas konfigurasi waktu proses yang memperluas buffer token masukan/keluaran yang dapat dikonfigurasi untuk metrik Pelacakan Penggunaan yang tepat (#959).### 🐛 Bug Fixes

-**Remediasi CodeQL:**Operasi pengindeksan string penting yang terselesaikan dan diamankan sepenuhnya mencegah heuristik pengindeksan array Pemalsuan Permintaan Sisi Server (SSRF) bersama dengan pelacakan balik algoritmik polinomial (ReDoS) di dalam modul operator proxy dalam. -**Hash Kripto:**Mengganti hash OAuth 1.0 lama yang belum terverifikasi dengan primitif validasi standar HMAC-SHA-256 yang kuat untuk memastikan kontrol akses yang ketat. -**Perlindungan Batas API:**Perlindungan rute struktural yang diverifikasi dan dipetakan dengan benar menerapkan logika middleware `isAuthenticated()` yang ketat yang mencakup manipulasi pengaturan penargetan titik akhir dinamis yang lebih baru dan pemuatan keterampilan asli. -**Kompatibel dengan Ekosistem CLI:**Menyelesaikan kerusakan pengikatan parser waktu proses asli yang membuat detektor lingkungan `where` mogok secara ketat pada kasus tepi `.cmd/.exe` dengan baik untuk plugin eksternal (#969). -**Arsitektur Cache:**Memfaktorkan ulang struktur tata letak parameter dasbor Analisis dan Pengaturan Sistem yang tepat untuk mempertahankan siklus persistensi hidrasi ulang yang stabil menyelesaikan kilatan status visual yang tidak selaras (#952). -**Standar Caching Claude:**Penanda blok ephemeral kritis yang dinormalisasi dan dipelihara secara akurat dan disimpan secara ketat `ephemeral` menyimpan pesanan TTL dalam cache untuk node hilir yang menerapkan pemetaan permintaan CC standar yang kompatibel dengan rapi tanpa menjatuhkan metrik (#948). -**Autentikasi Alias ​​Internal:**Pemetaan runtime internal yang disederhanakan yang menormalkan pencarian muatan kredensial Codex di dalam parameter terjemahan global menyelesaikan 401 penurunan yang tidak diautentikasi (#958).### 🛠️ Maintenance

-**Kemampuan Menemukan UI:**Kategorisasi tata letak yang disesuaikan dengan benar secara eksplisit memisahkan logika penyedia tingkat gratis yang meningkatkan alur penyortiran UX di dalam halaman registri API umum (#950). -**Topologi Penerapan:**Artefak penerapan Docker terpadu yang memastikan root `fly.toml` cocok dengan parameter instance cloud yang diharapkan dan langsung menangani penskalaan penerapan otomatis dengan benar. -**Peralatan Pengembangan:**Memisahkan parameter runtime `LKGP` ke dalam utilitas caching abstraksi lapisan DB eksplisit yang memastikan cakupan isolasi pengujian yang ketat untuk lapisan caching inti dengan aman.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Panel Kombo Otomatis Dasbor:**Memfaktorkan ulang sepenuhnya UI `/dasbor/kombo otomatis` agar dapat berintegrasi secara mulus dengan Kartu Dasbor asli dan padding/header visual standar. Menambahkan mekanisme bobot pemilihan model pemetaan bilah kemajuan visual dinamis. -**Sinkronisasi Perutean Setelan:**Target skema `prioritas` dan `tertimbang` perutean lanjutan yang terekspos sepenuhnya secara internal di dalam daftar cadangan setelan global.### Bug Fixes

-**Node Lokal Memori & Keterampilan:**Menyelesaikan tag rendering kosong untuk opsi Memori dan Keterampilan langsung di dalam tampilan pengaturan global dengan menghubungkan semua `settings.*` nilai pemetaan secara internal ke `en.json` (juga dipetakan secara implisit untuk alat terjemahan silang).### Internal Integrations

- PR Terintegrasi #946 — perbaikan: menjaga kompatibilitas Kode Claude dalam konversi respons
- PR Terintegrasi #944 — fix(gemini): pertahankan tanda pikiran di seluruh panggilan alat antigravitasi
- PR Terintegrasi #943 — perbaikan: pulihkan badan Kopilot GitHub
- PR Terintegrasi #942 — Memperbaiki penanda cache yang kompatibel dengan cc
- PR Terintegrasi #941 — refactor(auth): meningkatkan pencarian alias NVIDIA + menambahkan logging kesalahan LKGP
- PR Terintegrasi #939 — Memulihkan penanganan callback localhost Claude OAuth
- _(Catatan: PR #934 dihilangkan dari siklus 3.4.9 untuk mencegah regresi konflik inti)_---

## [3.4.8] — 2026-04-03

### Keamanan

- Memperbaiki sepenuhnya semua temuan Github Advanced Security (CodeQL) dan peringatan Dependabot yang luar biasa.
- Memperbaiki kerentanan keacakan yang tidak aman dengan bermigrasi dari `Math.random` ke `crypto.randomUUID()`.
- Perintah shell aman dalam skrip otomatis dari injeksi string.
- Memigrasikan pola penguraian RegEx yang rentan dan rentan bencana dalam saluran obrolan/terjemahan.
- Kontrol sanitasi keluaran yang ditingkatkan di dalam komponen React UI dan injeksi tag Server Sent Events (SSE).---

## [3.4.7] — 2026-04-03

### Fitur

- Ditambahkan node `Kriptografi` ke Pemantauan dan pemeriksaan kesehatan MCP (#798)
- Pemetaan izin rute katalog model yang diperkeras (`/models`) (#781)### Bug Fixes

- Memperbaiki penyegaran token Claude OAuth yang gagal mempertahankan konteks cache (#937)
- Memperbaiki kesalahan penyedia yang Kompatibel dengan CC yang membuat model yang di-cache tidak dapat dijangkau (#937)
- Memperbaiki kesalahan GitHub Executor yang berkaitan dengan susunan konteks yang tidak sah (#937)
- Memperbaiki kegagalan pemeriksaan kesehatan alat CLI yang diinstal NPM pada Windows (#935)
- Memperbaiki terjemahan payload yang menghilangkan konten valid karena bidang API tidak valid (#927)
- Memperbaiki kerusakan runtime di Node 25 mengenai eksekusi kunci API (#867)
- Memperbaiki resolusi modul mandiri MCP (`ERR_MODULE_NOT_FOUND`) melalui `esbuild` (#936)
- Memperbaiki resolusi kredensial perutean NVIDIA NIM alias ketidakcocokan (#931)### Keamanan

- Menambahkan perlindungan batas masukan yang aman dan ketat terhadap injeksi eksekusi kode jarak jauh `shell: true` mentah.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Penyedia:**Mendaftarkan penyedia pembuatan gambar, video, dan audio baru dari daftar yang diminta komunitas (#926). -**UI Dasbor:**Menambahkan navigasi sidebar mandiri untuk modul Memori dan Keterampilan baru (#926). -**i18n:**Menambahkan string terjemahan dan pemetaan tata letak dalam 30 bahasa untuk namespace Memori dan Keterampilan.### 🐛 Bug Fixes

-**Ketahanan:**Mencegah Pemutus Sirkuit proksi terjebak dalam keadaan TERBUKA tanpa batas waktu dengan menangani transisi langsung ke keadaan TERTUTUP di dalam jalur kombo cadangan (#930). -**Terjemahan Protokol:**Menambal trafo streaming untuk membersihkan blok respons berdasarkan protokol _source_ yang diharapkan, bukan protokol _target_ penyedia, memperbaiki model Anthropics yang dibungkus dengan payload OpenAI yang membuat Claude Code (#929) mogok. -**Spesifikasi API & Gemini:**Memperbaiki penguraian ` thought_signature` pada penerjemah `openai-to-gemini` dan `claude-to-gemini`, mencegah kesalahan HTTP 400 di semua panggilan alat API Gemini 3. -**Penyedia:**Membersihkan titik akhir yang tidak kompatibel dengan OpenAI yang mencegah koneksi upstream yang valid (#926). -**Tren Cache:**Memperbaiki ketidakcocokan data pemetaan properti yang tidak valid yang menyebabkan bagan UI Tren Cache mogok, dan mengekstraksi widget metrik cache yang berlebihan (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**Integrasi Ekosistem CLIProxyAPI:**Menambahkan eksekutor `cliproxyapi` dengan caching tingkat modul dan perutean proxy bawaan. Memperkenalkan layanan Manajer Versi yang komprehensif untuk menguji kesehatan secara otomatis, mengunduh binari dari GitHub, menjalankan proses latar belakang yang terisolasi, dan mengelola siklus hidup alat CLI eksternal secara langsung melalui UI. Termasuk tabel DB untuk konfigurasi proksi guna mengaktifkan perutean silang otomatis dengan gerbang SSRF untuk permintaan OpenAI eksternal melalui lapisan alat CLI lokal (#914, #915, #916). -**Dukungan Qoder PAT:**Dukungan Token Akses Pribadi (PAT) Terpadu secara langsung melalui transport `qodercli` lokal alih-alih konfigurasi browser `.cn` jarak jauh yang lama (#913). -**Pratinjau Gemini 3.1 Pro (GitHub):**Menambahkan dukungan model eksplisit kanonik `gemini-3.1-pro-preview` secara asli ke dalam penyedia GitHub Copilot sambil mempertahankan alias perutean lama (#924).### 🐛 Bug Fixes

-**Stabilitas Token Copilot GitHub:**Memperbaiki loop penyegaran token Copilot di mana token lama tidak digabungkan secara mendalam ke dalam DB, dan menghapus kolom `reasoning_text` yang secara fatal merusak konversi blok Antropik hilir untuk obrolan multi-putaran (#923). -**Matriks Batas Waktu Global:**Batas waktu permintaan yang terpusat dan terparameterisasi secara eksplisit dari `REQUEST_TIMEOUT_MS` untuk mencegah buffer pengambilan bawaan yang tersembunyi (~300 detik) secara prematur memotong respons streaming SSE yang berumur panjang dari model penalaran yang berat (#918). -**Status Terowongan Cepat Cloudflare:**Memperbaiki ketidakkonsistenan status yang parah ketika instans OmniRoute yang dimulai ulang secara keliru menunjukkan terowongan yang dihancurkan sebagai aktif, dan menetapkan terowongan cloudflared ke `HTTP/2` secara default untuk menghilangkan UDP yang menerima spam log buffer (#925). -**Perbaikan Terjemahan i18n (Ceko & Hindi):**Memperbaiki kode Hindi dari `in.json` yang sudah tidak digunakan lagi menjadi `hi.json` kanonik, merombak pemetaan teks Ceko, mengekstraksi `untranslatable-keys.json` untuk memperbaiki validasi positif palsu CI/CD, dan menghasilkan dokumen `I18N.md` yang komprehensif untuk memandu penerjemah (#912). -**Pemulihan Penyedia Token:**Memperbaiki Qwen yang kehilangan titik akhir `resourceUrl` tertentu setelah token pemeriksaan kesehatan otomatis disegarkan karena penggabungan mendalam DB yang hilang (#917). -**UX & Streaming yang Kompatibel dengan CC:**Menyatukan tindakan Tambahkan CC/OpenAI/Anthropic yang kompatibel di sekitar perlakuan UI Antropik, memaksa permintaan upstream yang kompatibel dengan CC untuk menggunakan SSE sambil tetap mengembalikan respons streaming atau non-streaming berdasarkan permintaan klien, menghapus konfigurasi daftar model CC/dukungan impor demi kesalahan daftar model yang tidak didukung secara eksplisit, dan membuat Model Tersedia yang kompatibel dengan CC mencerminkan daftar registri Kode OAuth Claude (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Responses API Token Reporting:**Keluarkan `response.completed` dengan kolom `input_tokens`/`output_tokens` yang benar untuk klien Codex CLI, memperbaiki tampilan penggunaan token (#909 — terima kasih @christopher-s). -**SQLite WAL Checkpoint saat Shutdown:**Flush perubahan WAL ke dalam file database utama selama shutdown/restart dengan baik, mencegah hilangnya data pada penghentian kontainer Docker (#905 — terima kasih @rdself). -**Sinyal Shutdown yang Anggun:**Mengubah rute `/api/restart` dan `/api/shutdown` dari `process.exit(0)` menjadi `process.kill(SIGTERM)`, memastikan pengendali shutdown berjalan sebelum keluar. -**Docker Stop Grace Period:**Menambahkan `stop_grace_period: 40s` ke file Docker Compose dan `--stop-timeout 40` ke contoh menjalankan Docker.### 🛠️ Maintenance

- Menutup 5 masalah terselesaikan/bukan bug (#872, #814, #816, #890, #877).
- Memprioritaskan 6 masalah dengan permintaan info kebutuhan (#892, #887, #886, #865, #895, #870).
- Menanggapi masalah pelacakan deteksi CLI (#863) dengan panduan kontributor.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Memori & Keterampilan Antigravitasi:**Menyelesaikan injeksi memori jarak jauh dan keterampilan untuk penyedia Antigravitasi di tingkat jaringan proxy. -**Kompatibilitas Kode Claude:**Membangun jembatan kompatibilitas asli yang tersembunyi untuk Kode Claude, meneruskan alat dan memformat dengan rapi. -**MCP Penelusuran Web:**Menambahkan alat `omniroute_web_search` dengan cakupan `execute:search`. -**Komponen Cache:**Menerapkan komponen cache dinamis menggunakan TDD. -**UI & Penyesuaian:**Menambahkan dukungan favicon khusus, tab tampilan, label putih berkabel ke sidebar, dan menambahkan langkah-langkah panduan Selancar Angin dalam 33 bahasa. -**Retensi Log:**Retensi log permintaan terpadu dan artefak secara asli. -**Peningkatan Model:**Menambahkan `contextLength` eksplisit untuk semua model opencode-zen. -**i18n & terjemahan:**Terintegrasi dengan 33 terjemahan bahasa asli, termasuk validasi CI placeholder dan pembaruan dokumentasi bahasa Mandarin (#873, #869).### 🐛 Bug Fixes

-**Qwen OAuth Mapping:**Mengembalikan ketergantungan `id_token` ke `access_token` dan mengaktifkan injeksi endpoint API `resource_url` dinamis untuk perutean regional yang tepat (#900). -**Mesin Sinkronisasi Model:**Menyimpan ID Penyedia internal yang ketat dalam rutinitas sinkronisasi `getCustomModels()` alih-alih format Alias ​​Saluran UI, mencegah kegagalan penyisipan katalog SQLite (#903). -**Claude Code & Codex:**Respons kosong non-streaming terstandardisasi terhadap `(respon kosong)` berformat Antropis untuk mencegah kerusakan proksi CLI (#866). -**Perutean Kompatibel CC:**Menyelesaikan tabrakan titik akhir `/v1` duplikat selama penggabungan jalur untuk gerbang Kode Claude generik (#904). -**Dasbor Antigravitasi:**Memblokir model kuota tak terbatas agar tidak salah mendaftar sebagai status batas `100% Penggunaan` yang telah habis di UI Penggunaan Penyedia (#857). -**Claude Image Passthrough:**Memperbaiki model Claude yang kehilangan passthrough blok gambar (#898). -**Perutean CLI Gemini:**Menyelesaikan masalah penguncian otorisasi 403 dan akumulasi konten dengan menyegarkan ID proyek melalui `loadCodeAssist` (#868). -**Stabilitas Antigravitasi:**Daftar akses model yang diperbaiki, pemberlakuan penguncian 404, perbaikan kaskade 429 yang mengunci koneksi standar, dan membatasi token keluaran `gemini-3.1-pro` (#885). -**Irama Sinkronisasi Penyedia:**Memperbaiki irama sinkronisasi batas penyedia melalui penjadwal internal (#888). -**Optimasi Dasbor:**Mengatasi pembekuan UI `/dashboard/limits` saat memproses 70+ akun melalui paralelisasi potongan (#784). -**Pengerasan SSRF:**Menerapkan pemfilteran rentang IP SSRF yang ketat dan memblokir antarmuka loopback `::1`. -**Jenis MIME:**`mime_type` terstandarisasi menjadi serpent_case agar sesuai dengan spesifikasi API Gemini. -**Stabilisasi CI:**Memperbaiki analisis/pengaturan yang gagal Pemilih penulis naskah dan pernyataan permintaan sehingga GitHub Actions E2E berjalan dengan andal di seluruh UI yang dilokalkan dan kontrol berbasis sakelar. -**Pengujian Deterministik:**Menghapus perlengkapan kuota yang sensitif terhadap tanggal dari pengujian penggunaan Copilot dan menyelaraskan pengujian idempotensi/katalog model dengan perilaku runtime yang digabungkan. -**Pengerasan Jenis MCP:**Menghapus regresi `apa pun` eksplisit tanpa anggaran dari jalur pendaftaran alat server MCP. -**Mesin Sinkronisasi Model:**Melewati penggantian `ganti` yang merusak ketika sinkronisasi otomatis penyedia menghasilkan daftar model kosong, menjaga stabilitas untuk katalog dinamis (#899).### 🛠️ Maintenance

-**Logging Jalur Pipa:**Menyempurnakan artefak logging jalur pipa dan menerapkan batas retensi (#880). -**Perombakan AGEN.md:**Diringkas dari 297→153 baris. Ditambahkan pedoman pembangunan/pengujian/gaya, alur kerja kode (Prettier, TypeScript, ESLint), dan tabel verbose yang dipangkas (#882). -**Release Branch Integration:**Mengonsolidasikan cabang fitur aktif ke dalam `release/v3.4.2` di atas `main` saat ini dan memvalidasi cabang dengan pengoperasian E2E lint, unit, coverage, build, dan mode CI. -**Pengujian:**Menambahkan konfigurasi vitest untuk pengujian komponen dan spesifikasi Penulis Drama untuk pengaturan matikan. -**Pembaruan Dokumen:**Memperluas root readmes, menerjemahkan dokumen berbahasa Mandarin secara asli, dan membersihkan file usang.## [3.4.1] - 2026-03-31

> [!PERINGATAN]
> **PERUBAHAN YANG TERPECAHKAN: variabel lingkungan logging permintaan, retensi, dan logging telah didesain ulang.**
> Pada permulaan pertama setelah peningkatan, OmniRoute mengarsipkan log permintaan lama dari `DATA_DIR/logs/`, `DATA_DIR/call_logs/` lama, dan `DATA_DIR/log.txt` ke dalam `DATA_DIR/log_archives/*.zip`, lalu menghapus tata letak yang tidak digunakan lagi dan beralih ke format artefak terpadu baru di bawah `DATA_DIR/call_logs/`.### ✨ New Features

-**.ENV Migration Utility:**Menyertakan `scripts/migrate-env.mjs` untuk memigrasikan konfigurasi `<v3.3` dengan lancar ke `v3.4.x` batasan validasi keamanan yang ketat (FASE-01), memperbaiki kerusakan startup yang disebabkan oleh instance `JWT_SECRET` yang pendek. -**Kiro AI Cache Optimization:**Mengimplementasikan pembuatan `conversationId` deterministik (uuidv5) untuk mengaktifkan AWS Builder ID Prompt Caching dengan benar di seluruh pemanggilan (#814). -**Restorasi & Konsolidasi UI Dasbor:**Menyelesaikan logika sidebar yang menghilangkan bagian Debug, dan menghapus peringatan perutean Nextjs dengan memindahkan halaman `/dashboard/mcp` dan `/dashboard/a2a` yang berdiri sendiri secara eksplisit ke dalam komponen UI Proksi Endpoint yang tertanam. -**Artefak Log Permintaan Terpadu:**Pencatatan log permintaan kini menyimpan satu baris indeks SQLite ditambah satu artefak JSON per permintaan pada `DATA_DIR/call_logs/`, dengan pengambilan alur opsional yang disematkan dalam file yang sama. -**Bahasa:**Peningkatan terjemahan bahasa Mandarin (#855) -**Model Opencode-Zen:**Menambahkan 4 model gratis ke registri opencode-zen (#854) -**Tes:**Menambahkan pengujian unit dan E2E untuk peralihan pengaturan dan perbaikan bug (#850)### 🐛 Bug Fixes

-**429 Penguraian Kuota:**Mengurai waktu penyetelan ulang kuota yang lama dari badan kesalahan untuk memenuhi backoff yang benar dan mencegah pemblokiran akun dengan tarif terbatas (#859) -**Caching Cepat:**Header `cache_control` klien yang dipertahankan untuk semua penyedia protokol Claude (seperti Minimax, GLM, dan Bailian), mengenali dukungan caching dengan benar (#856) -**Log Sinkronisasi Model:**Mengurangi spam log dengan mencatat `model sinkronisasi` hanya ketika saluran benar-benar mengubah daftar (#853) -**Kuota Penyedia & Penguraian Token:**Mengubah batas Antigravitasi untuk menggunakan `retrieveUserQuota` secara asli dan memetakan muatan penyegaran token Claude dengan benar ke formulir yang dikodekan URL (#862) -**Stabilitas Pembatas Kecepatan:**Menguniversalkan arsitektur penguraian 429 Retry-After untuk membatasi cooldown yang disebabkan oleh penyedia pada maksimal 24 jam (#862) -**Rendering Batas Dasbor:**Pemetaan kuota `/dashboard/limits` dirancang ulang untuk segera dirender di dalam potongan, memperbaiki penundaan pembekuan UI yang besar pada akun yang melebihi 70 koneksi aktif (#784) -**Otorisasi OAuth QWEN:**Memetakan `id_token` OIDC sebagai token Pembawa API utama untuk permintaan Dashscope, segera memperbaiki kesalahan 401 Tidak Sah setelah menghubungkan akun atau menyegarkan token (#864) -**Stabilitas API ZAI:**Kompiler Peristiwa Terkirim Server yang diperkeras untuk melakukan fallback dengan baik ke string kosong ketika penyedia DeepSeek mengalirkan konten yang secara matematis nol selama fase penalaran (#871) -**Terjemahan Kode/Codex Claude:**Konversi payload non-streaming terlindungi dari respons kosong dari alat Codex hulu, menghindari TypeErrors yang membawa bencana (#866) -**NVIDIA NIM Rendering:**Menghapus awalan penyedia identik yang secara kondisional didorong secara dinamis oleh model audio, menghilangkan struktur tag `nim/nim` duplikat yang menghasilkan 404 di Media Playground (#872)### ⚠️ Breaking Changes

-**Tata Letak Log Permintaan:**Menghapus sesi log permintaan `DATA_DIR/logs/` multi-file lama dan file ringkasan `DATA_DIR/log.txt`. Permintaan baru ditulis sebagai artefak JSON tunggal di `DATA_DIR/call_logs/YYYY-MM-DD/`. -**Variabel Lingkungan Logging:**Mengganti `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE`, dan `PROXY_LOG_MAX_ENTRIES` dengan model konfigurasi `APP_LOG_*` dan `CALL_LOG_RETENTION_DAYS` yang baru. -**Setelan Toggle Pipeline:**Mengganti setelan `detailed_logs_enabled` lama dengan `call_log_pipeline_enabled`. Detail alur baru disematkan di dalam artefak permintaan alih-alih disimpan sebagai catatan `request_detail_logs` yang terpisah.### 🛠️ Maintenance

-**Cadangan Peningkatan Log Permintaan Lama:**Peningkatan sekarang mengarsipkan tata letak `data/logs/` lama, `data/call_logs/` lama, dan `data/log.txt` ke dalam `DATA_DIR/log_archives/*.zip` sebelum menghapus struktur yang tidak digunakan lagi. -**Persistensi Penggunaan Streaming:**Permintaan streaming kini menulis satu baris `usage_history` setelah selesai alih-alih mengeluarkan duplikat baris penggunaan yang sedang berlangsung dengan metadata status kosong. -**Pembersihan Tindak Lanjut Logging:**Log alur tidak lagi mencatat `SOURCE REQUEST`, entri artefak permintaan kini menggunakan `CALL_LOG_MAX_ENTRIES`, dan arsip log aplikasi kini menggunakan `APP_LOG_MAX_FILES`.---

## [3.4.0] - 2026-03-31

### Fitur

-**Analisis Pemanfaatan Langganan:**Menambahkan pelacakan rangkaian waktu snapshot kuota, tab Pemanfaatan Penyedia dan Kesehatan Kombo dengan visualisasi bagan ulang, dan titik akhir API yang sesuai (#847) -**Kontrol Cadangan SQLite:**Bendera env `OMNIROUTE_DISABLE_AUTO_BACKUP` baru untuk menonaktifkan cadangan SQLite otomatis (#846) -**Pembaruan Registri Model:**Memasukkan `gpt-5.4-mini` ke dalam rangkaian model penyedia Codex (#756) -**Pelacakan Batas Penyedia:**Melacak dan menampilkan kapan batas tarif penyedia terakhir kali diperbarui per akun (#843)### 🐛 Bug Fixes

-**Qwen Auth Routing:**Merutekan ulang penyelesaian Qwen OAuth dari DashScope API ke Web Inference API (`chat.qwen.ai`), mengatasi kegagalan otorisasi (#844, #807, #832) -**Qwen Auto-Retry Loop:**Menambahkan 429 Kuota yang ditargetkan Melebihi penanganan backoff di dalam `chatCore` yang melindungi permintaan burst -**Codex OAuth Fallback:**Pemblokiran popup browser modern tidak lagi menjebak pengguna; secara otomatis kembali ke entri URL manual (#808) -**Penyegaran Token Claude:**Batasan `aplikasi/json` Anthropic yang ketat kini dipatuhi selama pembuatan token alih-alih URL yang dikodekan (#836) -**Skema Pesan Codex:**`pesan` murni yang dilucuti dimasukkan dari permintaan passthrough asli untuk menghindari penolakan struktural dari upstream ChatGPT (#806) -**Batas Ukuran Deteksi CLI:**Meningkatkan batas atas pemindaian biner Node dengan aman dari 100MB menjadi 350MB, memungkinkan alat mandiri yang berat seperti Claude Code (229MB) dan OpenCode (153MB) dideteksi dengan benar oleh runtime VPS (#809) -**Lingkungan Waktu Proses CLI:**Pemulihan kemampuan konfigurasi CLI untuk mematuhi jalur penggantian pengguna (`CLI_{PROVIDER}_BIN`) dengan melewati aturan penemuan terikat jalur yang ketat -**Konflik Header Nvidia:**Menghapus properti `prompt_cache_key` dari header upstream saat memanggil penyedia non-Anthropic (#848) -**Codex Fast Tier Toggle:**Kontras peralihan tingkat layanan Codex yang dipulihkan dalam mode ringan (#842) -**Infrastruktur Uji:**Pengujian `t28-model-catalog-updates` yang diperbarui yang salah mengharapkan titik akhir DashScope yang sudah ketinggalan zaman untuk registri asli Qwen---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Rotasi Penyedia Khusus:**`getRotatingApiKey` terintegrasi secara internal di dalam DefaultExecutor, memastikan rotasi `extraApiKeys` terpicu dengan benar untuk penyedia upstream khusus dan kompatibel (#815)---

## [3.3.8] - 2026-03-30

### Fitur

-**Pemfilteran API Model:**Titik Akhir `/v1/models` sekarang memfilter daftarnya secara dinamis berdasarkan izin yang terkait dengan `Otorisasi: Pembawa <token>` ketika akses terbatas diaktifkan (#781) -**Integrasi Qoder:**Integrasi asli untuk AI Qoder yang secara asli menggantikan pemetaan platform iFlow lama (#660) -**Pelacakan Cache Cepat:**Menambahkan kemampuan pelacakan dan visualisasi frontend (kartu Statistik) untuk cache semantik dan cepat di UI Dasbor### 🐛 Bug Fixes

-**Ukuran Dasbor Cache:**Memperbaiki ukuran tata letak UI dan header konteks untuk halaman cache tingkat lanjut (#835) -**Visibilitas Bilah Sisi Debug:**Memperbaiki masalah di mana pengalih debug tidak menampilkan/menyembunyikan rincian debug bilah sisi dengan benar (#834) -**Awalan Model Gemini:**Memodifikasi penggantian namespace agar merutekan dengan benar melalui `gemini-cli/` alih-alih `gc/` agar sesuai dengan spesifikasi upstream (#831) -**Sinkronisasi OpenRouter:**Peningkatan sinkronisasi kompatibilitas untuk secara otomatis menyerap katalog model yang tersedia dengan benar dari OpenRouter (#830) -**Streaming Payloads Mapping:**Reserialisasi kolom penalaran secara asli menyelesaikan jalur alias konflik ketika output dialirkan ke perangkat edge---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**Konfigurasi OpenCode:**Merestrukturisasi `opencode.json` yang dihasilkan untuk menggunakan skema berbasis rekaman `@ai-sdk/openai-kompatibel` dengan `options` dan `models` sebagai peta objek alih-alih array datar, memperbaiki kegagalan validasi konfigurasi (#816) -**i18n Kunci Hilang:**Menambahkan kunci terjemahan `cloudflaredUrlNotice` yang hilang pada seluruh 30 berkas bahasa untuk mencegah kesalahan konsol `MISSING_MESSAGE` di laman Titik Akhir (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Akuntansi Token:**Menyertakan token cache cepat dengan aman dalam perhitungan input penggunaan historis untuk pengurangan kuota yang benar (PR #822) -**Combo Test Probe:**Memperbaiki logika pengujian kombo negatif palsu dengan menyelesaikan penguraian untuk respons yang hanya bersifat penalaran dan mengaktifkan paralelisasi besar-besaran melalui Promise.all (PR #828) -**Docker Quick Tunnels:**Menyematkan sertifikat ca yang diperlukan di dalam container runtime dasar untuk mengatasi kegagalan startup Cloudflared TLS, dan memunculkan kesalahan jaringan stdout yang menggantikan kode keluar umum (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Pelacakan Kuota Gemini:**Menambahkan pelacakan kuota Gemini CLI real-time melalui API `retrieveUserQuota` (PR #825) -**Dasbor Cache:**Menyempurnakan Dasbor Cache untuk menampilkan metrik cache yang cepat, tren 24 jam, dan perkiraan penghematan biaya (PR #824)### 🐛 Bug Fixes

-**Pengalaman Pengguna:**Menghapus loop modal OAuth pembukaan otomatis yang invasif pada halaman detail penyedia yang tandus (PR #820) -**Pembaruan Ketergantungan:**Menghentikan dan mengunci dependensi untuk pohon pengembangan dan produksi termasuk Next.js 16.2.1, Recharts, dan TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**Alur Kerja A2A:**Menambahkan orkestrator FSM deterministik untuk alur kerja agen multi-langkah. -**Degradasi yang Anggun:**Menambahkan kerangka kerja fallback multi-lapisan baru untuk mempertahankan fungsionalitas inti selama pemadaman sebagian sistem. -**Audit Konfigurasi:**Menambahkan jejak audit dengan deteksi perbedaan untuk melacak perubahan dan mengaktifkan pengembalian konfigurasi. -**Kesehatan Penyedia:**Menambahkan pelacakan masa berlaku penyedia dengan peringatan UI proaktif untuk kunci API yang masa berlakunya habis. -**Perutean Adaptif:**Menambahkan detektor volume dan kompleksitas adaptif untuk mengganti strategi perutean secara dinamis berdasarkan beban. -**Keberagaman Penyedia:**Menerapkan penilaian keragaman penyedia melalui entropi Shannon untuk meningkatkan distribusi beban. -**Batas Nonaktifkan Otomatis:**Menambahkan pengaturan Nonaktifkan Otomatis Akun yang Diblokir ke dasbor Ketahanan.### 🐛 Bug Fixes

-**Kompatibilitas Codex & Claude:**Memperbaiki fallback UI, menambal masalah integrasi non-streaming Codex, dan menyelesaikan deteksi runtime CLI pada Windows. -**Otomasi Rilis:**Izin yang diperluas diperlukan untuk build Aplikasi Electron di GitHub Actions. -**Cloudflare Runtime:**Mengatasi kode keluar isolasi runtime yang benar untuk komponen terowongan Cloudflared.### 🧪 Tests

-**Pembaruan Test Suite:**Cakupan pengujian yang diperluas untuk detektor volume, keragaman penyedia, audit konfigurasi, dan FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**Keandalan CI/CD:**Menambal Tindakan GitHub ke versi ketergantungan yang stabil (`actions/checkout@v4`, `actions/upload-artifact@v4`) untuk mengurangi penghentian lingkungan pembuat yang tidak diumumkan sebelumnya. -**Image Fallbacks:**Mengganti rantai fallback sewenang-wenang di `ProviderIcon.tsx` dengan validasi aset eksplisit untuk mencegah UI memuat komponen `<Image>` untuk file yang tidak ada, menghilangkan kesalahan `404` di log konsol dasbor (#745). -**Pembaru Admin:**Deteksi penginstalan sumber dinamis untuk Pembaruan dasbor. Menonaktifkan tombol `Perbarui Sekarang` dengan aman ketika OmniRoute dibuat secara lokal dan bukan melalui npm, yang meminta `git pull` (#743). -**Perbarui Kesalahan ERESOLVE:**Menyuntikkan penggantian `package.json` untuk `react`/`react-dom` dan mengaktifkan `--legacy-peer-deps` dalam skrip pembaru otomatis internal untuk mengatasi konflik pohon ketergantungan yang terputus dengan `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Cloudflare Tunnels:**Integrasi Cloudflare Quick Tunnel dengan kontrol dasbor (PR #772). -**Diagnostik:**Bypass cache semantik untuk pengujian langsung kombo (PR #773).### 🐛 Bug Fixes

-**Stabilitas Streaming:**Terapkan `FETCH_TIMEOUT_MS` ke panggilan `fetch()` awal permintaan streaming untuk mencegah batas waktu TCP Node.js 300 detik yang menyebabkan kegagalan tugas senyap (#769). -**i18n:**Tambahkan entri `windsurf` dan `copilot` yang hilang ke `toolDescriptions` pada seluruh 33 berkas lokal (#748). -**Audit Pengkodean GLM:**Menyelesaikan audit penyedia yang memperbaiki kerentanan ReDoS, ukuran jendela konteks (128k/16k), dan sinkronisasi registri model (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Perbaikan pemrosesan cadangan untuk elemen `type: "text"` yang membawa kumpulan data null atau kosong yang menyebabkan 400 penolakan (#742). -**Kode Terbuka:**Perbarui penyelarasan skema ke `penyedia` tunggal agar sesuai dengan spesifikasi resmi (#774). -**Gemini CLI:**Menyuntikkan header kuota pengguna akhir yang hilang untuk mencegah penguncian otorisasi 403 (#775). -**Pemulihan DB:**Memfaktorkan ulang impor payload multipart ke dalam array buffer biner mentah untuk melewati batas isi maksimal proksi terbalik (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Stabilisasi Rilis**— Rilis v3.2.9 yang diselesaikan (diagnostik kombo, gerbang kualitas, perbaikan alat Gemini) dan membuat tag git yang hilang. Menggabungkan semua perubahan bertahap menjadi satu penerapan rilis atom.### 🐛 Bug Fixes

-**Uji Pembaruan Otomatis**— Memperbaiki pernyataan pengujian `buildDockerComposeUpdateScript` agar cocok dengan referensi variabel shell yang tidak diperluas (`$TARGET_TAG`, `${TARGET_TAG#v}`) dalam skrip penerapan yang dihasilkan, selaras dengan templat yang difaktorkan ulang dari v3.2.8. -**Circuit Breaker Test**— Memperkeras `combo-circir-breaker.test.mjs` dengan memasukkan `maxRetries: 0` untuk mencegah percobaan ulang inflasi agar tidak mengubah pernyataan jumlah kegagalan selama transisi status pemutus.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Combo Diagnostics**— Memperkenalkan tanda bypass pengujian langsung (`forceLiveComboTest`) yang memungkinkan administrator untuk menjalankan pemeriksaan kesehatan upstream nyata yang melewati semua mekanisme pemutus sirkuit dan status cooldown lokal, memungkinkan diagnostik yang tepat selama pemadaman peluncuran (PR #759) -**Gerbang Kualitas**— Menambahkan validasi kualitas respons otomatis untuk kombo dan dukungan model `claude-4.6` yang terintegrasi secara resmi ke dalam skema perutean inti (PR #762)### 🐛 Bug Fixes

-**Validasi Definisi Alat**— Memperbaiki integrasi API Gemini dengan menormalkan tipe enum di dalam definisi alat, mencegah kesalahan parameter HTTP 400 upstream (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Pembaruan Otomatis Docker UI**— Mengintegrasikan proses pembaruan latar belakang terpisah untuk penerapan Docker Compose. UI Dasbor kini dengan mulus melacak peristiwa siklus hidup pembaruan yang menggabungkan respons JSON REST dengan hamparan kemajuan streaming SSE untuk keandalan lintas lingkungan yang kuat. -**Analisis Cache**— Memperbaiki pemetaan visualisasi nol-metrik dengan memigrasikan log telemetri Cache Semantik langsung ke modul SQLite pelacakan terpusat.### 🐛 Bug Fixes

-**Logika Otentikasi**— Memperbaiki bug ketika penyimpanan pengaturan dasbor atau penambahan model gagal dengan kesalahan 401 Tidak Sah saat `requireLogin` dinonaktifkan. Titik akhir API kini mengevaluasi tombol autentikasi global dengan benar. Mengatasi pengalihan global dengan mengaktifkan kembali `src/middleware.ts`. -**Deteksi Alat CLI (Windows)**— Mencegah pengecualian inisialisasi fatal selama deteksi lingkungan CLI dengan menangkap kesalahan ENOENT `cross-spawn` dengan benar. Menambahkan jalur deteksi eksplisit untuk `\AppData\Local\droid\droid.exe`. -**Codex Native Passthrough**— Parameter terjemahan model yang dinormalisasi mencegah keracunan konteks dalam mode pass-through proxy, menerapkan batasan `store: false` umum secara eksplisit untuk semua permintaan yang berasal dari Codex. -**Pelaporan Token SSE**— Deteksi `finish_reason` potongan panggilan alat penyedia yang dinormalisasi, memperbaiki 0% analisis Penggunaan untuk respons streaming saja yang tidak memiliki indikator `<DONE>` yang ketat. -**Tag <think> DeepSeek**— Mengimplementasikan pemetaan ekstraksi `<think>` eksplisit di dalam `responsesHandler.ts`, memastikan aliran penalaran DeepSeek dipetakan secara setara dengan struktur `<thinking>` Antropis asli.---

## [3.2.7] - 2026-03-29

### Fixed

-**Pembaruan UI yang Mulus**: Fitur "Perbarui Sekarang" di Dasbor kini memberikan umpan balik langsung dan transparan menggunakan Server-Sent Events (SSE). Ia melakukan instalasi paket, pembangunan kembali modul asli (lebih baik-sqlite3), dan PM2 memulai ulang dengan andal sambil menampilkan pemuat waktu nyata alih-alih menggantung secara diam-diam.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API Key Reveal (#740)**— Menambahkan alur penyalinan kunci API tercakup di Api Manager, dilindungi oleh variabel lingkungan `ALLOW_API_KEY_REVEAL`. -**Kontrol Visibilitas Sidebar (#739)**— Admin kini dapat menyembunyikan tautan navigasi sidebar apa pun melalui pengaturan Penampilan untuk mengurangi kekacauan visual. -**Pengujian Kombo Ketat (#735)**— Memperkuat titik akhir pemeriksaan kesehatan kombo agar memerlukan respons teks langsung dari model, bukan hanya sinyal keterjangkauan lembut. -**Streaming Log Terperinci (#734)**— Mengganti logging permintaan terperinci untuk aliran SSE guna merekonstruksi payload akhir, menghemat sejumlah besar ukuran database SQLite dan membersihkan UI secara signifikan.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— Memperbaiki logika header autentikasi untuk model `minimax` di OpenCode Go agar menggunakan `x-api-key` alih-alih token pembawa standar di seluruh protokol `/messages`.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Templat pengemasan `xbps-src` terintegrasi dan instruksi untuk mengompilasi dan menginstal OmniRoute secara asli dengan pengikatan `better-sqlite3` melalui target kompilasi silang.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI Migration (#660)**— Memigrasikan sepenuhnya penyedia inti `iFlow` lama ke `Qoder AI` dengan mempertahankan kemampuan perutean API yang stabil.### 🐛 Bug Fixes

-**Gemini Tools HTTP 400 Payload Argument Tidak Valid (#731)**— Mencegah injeksi array ` thoughtSignature` di dalam rangkaian `functionCall` Gemini standar yang memblokir aliran perutean agen.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**UI Batas Kuota Penyedia (#728)**— Logika batas kuota dan pelabelan data yang dinormalisasi di dalam antarmuka Batas.### 🐛 Bug Fixes

-**Skema & Kebocoran Perutean Inti**— `comboStrategySchema` yang diperluas untuk mendukung strategi `isi-pertama` dan `p2c` secara asli untuk membuka blokir pengeditan kombo yang rumit secara asli. -**Thinking Tag Extraction (CLI)**— Pembersih respons token CLI yang direstrukturisasi, RegEx yang menangkap struktur penalaran model di dalam aliran, menghindari ekstraksi `<thinking>` yang rusak dan merusak format output teks respons. -**Penegakan Format Ketat**— Eksekusi sanitasi saluran pipa yang diperkeras sehingga diterapkan secara universal pada target mode terjemahan.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Saluran Log Permintaan Empat Tahap (#705)**— Persistensi log yang difaktorkan ulang untuk menyimpan muatan komprehensif pada empat tahap alur yang berbeda: Permintaan Klien, Permintaan Penyedia yang Diterjemahkan, Respons Penyedia, dan Respons Klien yang Diterjemahkan. Memperkenalkan `streamPayloadCollector` untuk pemotongan aliran SSE dan serialisasi payload yang tangguh.### 🐛 Bug Fixes

-**Perbaikan UI Seluler (#659)**— Mencegah komponen tabel di dasbor merusak tata letak pada area pandang yang sempit dengan menambahkan pengguliran horizontal yang tepat dan penahan luapan ke `DashboardLayout`. -**Claude Prompt Cache Fixes (#708)**— Memastikan blok `cache_control` dalam loop fallback Claude-ke-Claude dipertahankan dengan setia dan diteruskan dengan aman kembali ke model Anthropic. -**Definisi Alat Gemini (#725)**— Memperbaiki kesalahan terjemahan skema saat mendeklarasikan tipe parameter `objek` sederhana untuk pemanggilan fungsi Gemini.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Penyedia Penggantian Global (#689)**— Ketika semua model kombo habis (502/503), OmniRoute kini mencoba model cadangan global yang dapat dikonfigurasi sebelum mengembalikan kesalahan. Setel `globalFallbackModel` dalam pengaturan untuk mengaktifkan.### 🐛 Bug Fixes

-**Perbaikan #721**— Memperbaiki pintasan penyematan konteks selama respons panggilan alat. Pemberian tag non-streaming menggunakan jalur JSON yang salah (`json.messages` → `json.choices[0].message`). Injeksi streaming kini terpicu pada potongan `finish_reason` untuk streaming khusus panggilan alat. `injectModelTag()` sekarang menambahkan pesan pin sintetis untuk konten non-string. -**Perbaikan #709**— Dikonfirmasi sudah diperbaiki (v3.1.9) — `system-info.mjs` membuat direktori secara rekursif. Tertutup. -**Perbaikan #707**— Dikonfirmasi sudah diperbaiki (v3.1.9) — sanitasi nama alat kosong di `chatCore.ts`. Tertutup.### 🧪 Tests

- Menambahkan 6 pengujian unit untuk penyematan konteks dengan respons panggilan alat (konten nol, konten array, bolak-balik, injeksi ulang)## [3.2.0] — 2026-03-28

### ✨ New Features

-**UI Manajemen Cache**— Menambahkan dasbor cache semantik khusus di \`/dashboard/cache\` dengan pembatalan API yang ditargetkan dan dukungan i18n 31 bahasa (PR #701 oleh @oyi77) -**Pelacakan Kuota GLM**— Menambahkan penggunaan real-time dan pelacakan kuota sesi untuk penyedia GLM Coding (Z.AI) (PR #698 oleh @christopher-s) -**Muatan Log Terperinci**— Pengambilan muatan pipa empat tahap penuh berkabel (asli, terjemahan, respons penyedia, streaming-delta) langsung ke UI (PR #705 oleh @rdself)### 🐛 Bug Fixes

-**Perbaikan #708**— Mencegah pendarahan token bagi pengguna Claude Code yang merutekan melalui OmniRoute dengan mempertahankan header \`cache_control\` asli dengan benar selama passthrough Claude-to-Claude (PR #708 oleh @tombii) -**Perbaikan #719**— Siapkan batas autentikasi internal untuk \`ModelSyncScheduler\` untuk mencegah kegagalan daemon yang tidak diautentikasi saat startup (PR #719 oleh @rdself) -**Perbaikan #718**— Membuat ulang rendering lencana di UI Batas Penyedia untuk mencegah tumpang tindih batas kuota yang buruk (PR #718 oleh @rdself) -**Perbaikan #704**— Memperbaiki Combo Fallback yang melanggar kesalahan kebijakan konten HTTP 400 yang mencegah perutean mati rotasi model (PR #704 oleh @rdself)### 🔒 Security & Dependencies

- Menabrak \`path-to-regexp\` ke \`8.4.0\` menyelesaikan kerentanan dependabot (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Perbaikan #706**— Memperbaiki rendering penggantian ikon yang disebabkan oleh penggantian `font-sans` Tailwind V4 dengan menerapkan `!important` ke `.material-symbols-outlined`. -**Perbaiki #703**— Memperbaiki aliran rusak GitHub Copilot dengan mengaktifkan terjemahan format `responses` ke `openai` untuk model kustom apa pun yang memanfaatkan `apiFormat: "responses"`. -**Perbaikan #702**— Mengganti pelacakan penggunaan tarif tetap dengan penghitungan harga DB yang akurat untuk respons streaming dan non-streaming. -**Perbaikan #716**— Membersihkan status terjemahan panggilan alat Claude, menguraikan argumen streaming dengan benar dan mencegah potongan `tool_calls` OpenAI mengulangi bidang `id`.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Pemaksaan Skema**— Pemaksaan otomatis batasan Skema JSON numerik yang dikodekan string (misalnya `"minimum": "1"`) ke jenis yang tepat, mencegah 400 kesalahan dari Kursor, Cline, dan klien lain yang mengirimkan skema alat yang salah format. -**Sanitasi Deskripsi Alat**— Pastikan deskripsi alat selalu berupa string; mengonversi deskripsi `null`, `undefinisi`, atau numerik menjadi string kosong sebelum dikirim ke penyedia. -**Tombol Hapus Semua Model**— Menambahkan terjemahan i18n untuk tindakan penyedia "Hapus Semua Model" dalam 30 bahasa. -**Codex Auth Ekspor**— Menambahkan tombol ekspor Codex `auth.json` dan apply-local untuk integrasi CLI yang lancar. -**Catatan BYOK Windsurf**— Menambahkan peringatan batasan resmi ke kartu alat Windsurf CLI yang mendokumentasikan batasan BYOK.### 🐛 Bug Fixes

-**Perbaikan #709**— `system-info.mjs` tidak lagi mogok ketika direktori keluaran tidak ada (menambahkan `mkdirSync` dengan tanda rekursif). -**Perbaikan #710**— Singleton `TaskManager` A2A sekarang menggunakan `globalThis` untuk mencegah kebocoran status di seluruh kompilasi ulang rute API Next.js dalam mode pengembangan. Rangkaian pengujian E2E diperbarui untuk menangani 401 dengan baik. -**Perbaikan #711**— Menambahkan penerapan batas `max_tokens` khusus penyedia untuk permintaan upstream. -**Perbaiki #605 / #592**— Hapus awalan `proxy_` dari nama alat dalam respons Claude non-streaming; memperbaiki URL validasi LongCat. -**Batas Maks Log Panggilan**— `getMaxCallLogs()` yang ditingkatkan dengan lapisan caching, dukungan env var (`CALL_LOGS_MAX`), dan integrasi pengaturan DB.### 🧪 Tests

- Rangkaian pengujian diperluas dari 964 → 1027 pengujian (63 pengujian baru)
- Menambahkan `schema-coercion.test.mjs` — 9 tes untuk pemaksaan bidang numerik dan sanitasi deskripsi alat
- Menambahkan `t40-opencode-cli-tools-integration.test.mjs` — pengujian integrasi OpenCode/Windsurf CLI
- Cabang pengujian fitur yang ditingkatkan dengan peralatan cakupan yang komprehensif### 📁 New Files

| Berkas                                                 | Tujuan                                               |
| ------------------------------------------------------ | ---------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`        | Pemaksaan skema dan deskripsi alat utilitas sanitasi |
| `tes/unit/schema-coercion.test.mjs`                    | Tes unit untuk pemaksaan skema                       |
| `tes/unit/t40-opencode-cli-tools-integration.test.mjs` | Tes integrasi alat CLI                               |
| `CAKUPAN_PLAN.md`                                      | Dokumen perencanaan cakupan uji                      | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**— Memperbaiki penanda cache_control yang dihapus dalam mode passthrough Claude (Claude → OmniRoute → Claude), yang menyebabkan pengguna Claude Code menghabiskan kuota Anthropic API mereka 5-10x lebih cepat daripada koneksi langsung. OmniRoute sekarang mempertahankan penanda cache_control klien ketika sourceFormat dan targetFormat keduanya Claude, memastikan cache cepat berfungsi dengan benar dan secara signifikan mengurangi konsumsi token.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Inti Platform:**Menerapkan penanganan keadaan global untuk Model & Kombo Tersembunyi yang mencegahnya mengacaukan katalog atau bocor ke agen MCP yang terhubung (#681). -**Stabilitas:**Kegagalan streaming yang ditambal terkait dengan integrasi penyedia Antigravitasi asli gagal karena susunan keadaan tidak terdefinisi yang tidak tertangani (#684). -**Sinkronisasi Pelokalan:**Menerapkan sinkronisasi `i18n` yang telah dirombak sepenuhnya untuk mendeteksi properti JSON bertingkat yang hilang dan melakukan retrofitting 30 lokal secara berurutan (#685).## [3.1.7] - 27-03-2026### 🐛 Bug Fixes

-**Stabilitas Streaming:**Memperbaiki `hasValuableContent` yang mengembalikan `tidak terdefinisi` untuk potongan kosong di aliran SSE (#676). -**Pemanggilan Alat:**Memperbaiki masalah dalam `sseParser.ts` di mana respons Claude non-streaming dengan beberapa panggilan alat menghilangkan `id` dari panggilan alat berikutnya karena deduplikasi berbasis indeks yang salah (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Pemulihan Nama Alat Asli Claude**— Nama alat seperti `TodoWrite` tidak lagi diawali dengan `proxy_` dalam respons passthrough Claude (baik streaming maupun non-streaming). Termasuk cakupan pengujian unit (PR #663 oleh @coobabm) -**Pembersihan Alias Semua Model**— Tombol "Hapus Semua Model" kini juga menghapus alias model terkait, mencegah model hantu di UI (PR #664 oleh @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**— Akun dengan rate terbatas kini pulih secara otomatis ketika masa cooldownnya berakhir, memperbaiki kebuntuan saat `backoffLevel` tinggi menurunkan prioritas akun secara permanen (PR #657 oleh @brendandebeasi)### 🌍 i18n

-**Perombakan terjemahan bahasa Mandarin**— Penulisan ulang `zh-CN.json` secara komprehensif dengan akurasi yang ditingkatkan (PR #658 oleh @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Perbaikan Pengabaian Streaming**— `stream: true` eksplisit di isi permintaan kini lebih diprioritaskan daripada header `Terima: application/json`. Klien yang mengirimkan keduanya akan menerima respons streaming SSE dengan benar (#656)### 🌍 i18n

-**Peningkatan string Ceko**— Penyempurnaan terminologi di `cs.json` (PR #655 oleh @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 kunci terjemahan hilang**ditambahkan ke `en.json` dan 12 bahasa (PR #652 oleh @zen0bit) -**Czech documentation updated**— CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT guides (PR #652) -**Skrip validasi terjemahan**— `check_translations.py` dan `validate_translation.py` untuk CI/QA (PR #651 oleh @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Kritis: Regresi Pemanggilan Alat**— Memperbaiki kesalahan `proxy_Bash` dengan menonaktifkan awalan nama alat `proxy_` di jalur passthrough Claude. Peralatan seperti `Bash`, `Read`, `Write` diganti namanya menjadi `proxy_Bash`, `proxy_Read`, dll., menyebabkan Claude menolaknya (#618) -**Dokumentasi Larangan Akun Kiro**— Didokumentasikan sebagai positif palsu anti-penipuan AWS hulu, bukan masalah OmniRoute (#649)### 🧪 Tests

-**936 pengujian, 0 kegagalan**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Metadata Kemampuan Visi**: Menambahkan `capabilities.vision`, `input_modalities`, dan `output_modalities` ke entri `/v1/models` untuk model berkemampuan vision (PR #646) -**Model Gemini 3.1**: Menambahkan `gemini-3.1-pro-preview` dan `gemini-3.1-flash-lite-preview` ke penyedia Antigravity (#645)### 🐛 Bug Fixes

-**Kesalahan Ollama Cloud 401**: Memperbaiki URL dasar API yang salah — diubah dari `api.ollama.com` menjadi `ollama.com/v1/chat/completions` resmi (#643) -**Percobaan Ulang Token yang Kedaluwarsa**: Menambahkan percobaan ulang terbatas dengan backoff eksponensial (5→10→20 mnt) untuk koneksi OAuth yang kedaluwarsa alih-alih melewatkannya secara permanen (PR #647)### 🧪 Tests

-**936 pengujian, 0 kegagalan**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**Templat Masalah GitHub**: Menambahkan laporan bug terstandardisasi, permintaan fitur, dan templat masalah konfigurasi/proksi (#641) -**Hapus Semua Model**: Menambahkan tombol "Hapus Semua Model" ke halaman detail penyedia dengan dukungan i18n dalam 29 bahasa (#634)### 🐛 Bug Fixes

-**Konflik Lokal (`in.json`)**: Mengganti nama file lokal Hindi dari `in.json` (kode ISO Indonesia) menjadi `hi.json` untuk memperbaiki konflik terjemahan di Weblate (#642) -**Nama Alat Kosong Codex**: Memindahkan sanitasi nama alat sebelum passthrough Codex asli, memperbaiki 400 kesalahan dari penyedia hulu ketika alat memiliki nama kosong (#637) -**Streaming Artefak Baris Baru**: Menambahkan `collapseExcessiveNewlines` ke pembersih respons, menciutkan proses 3+ baris baru berturut-turut dari model pemikiran menjadi baris baru ganda standar (#638) -**Claude Reasoning Effort**: Mengonversi parameter `reasoning_effort` OpenAI menjadi blok anggaran `thinking` asli Claude di semua jalur permintaan, termasuk penyesuaian `max_tokens` otomatis (#627) -**Penyegaran Token Qwen**: Menerapkan penyegaran token OAuth pra-kedaluwarsa yang proaktif (buffer 5 menit) untuk mencegah permintaan gagal saat menggunakan token berumur pendek (#631)### 🧪 Tests

-**936 pengujian, 0 kegagalan**(+10 pengujian sejak 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**Token NaN dalam Kode Claude / tanggapan klien (#617):**

- `sanitizeUsage()` sekarang memetakan `input_tokens`→`prompt_tokens` dan `output_tokens`→`completion_tokens` sebelum filter daftar putih, memperbaiki respons yang menunjukkan jumlah token NaN/0 ketika penyedia mengembalikan nama bidang penggunaan gaya Claude### Keamanan

- Memperbarui paket `yaml` untuk memperbaiki kerentanan stack overflow (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Ditutup #613 (Codestral — diselesaikan dengan solusi Penyedia Kustom)
- Mengomentari #615 (titik akhir ganda OpenCode — solusi disediakan, dilacak sebagai permintaan fitur)
- Mengomentari #618 (visibilitas panggilan alat — meminta tes v3.0.9)
- Mengomentari #627 (tingkat upaya — sudah didukung)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Kegagalan Terjemahan untuk Penyedia format OpenAI di Claude CLI (#632):**

- Menangani format array `reasoning_details[]` dari StepFun/OpenRouter — mengonversi menjadi `reasoning_content`
- Menangani alias kolom `reasoning` dari beberapa penyedia → dinormalisasi menjadi `reasoning_content`
- Nama bidang penggunaan lintas peta: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` di `filterUsageForFormat`
- Perbaiki `extractUsage` untuk menerima `input_tokens`/`output_tokens` dan `prompt_tokens`/`completion_tokens` sebagai kolom penggunaan yang valid
- Diterapkan pada jalur streaming (`sanitizeStreamingChunk`, `openai-to-claude.ts`) dan jalur non-streaming (`sanitizeMessage`)---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Penyegaran Token Antigravitasi:**Memperbaiki kesalahan `client_secret is missing` untuk pengguna yang menginstal npm — `clientSecretDefault` kosong di providerRegistry, menyebabkan Google menolak permintaan penyegaran token (#588) -**Model OpenCode Zen:**Menambahkan `modelsUrl` ke entri registri OpenCode Zen sehingga "Impor dari /models" berfungsi dengan benar (#612) -**Streaming Artefak:**Memperbaiki baris baru yang tersisa dalam respons setelah penghapusan tanda tangan tag pemikiran (#626) -**Proxy Fallback:**Menambahkan percobaan ulang otomatis tanpa proxy ketika relai SOCKS5 gagal -**Uji Proxy:**Titik akhir pengujian sekarang menyelesaikan kredensial nyata dari DB melalui proxyId### ✨ New Features

-**Akun Playground/Pemilih Kunci:**Dropdown yang persisten dan selalu terlihat untuk memilih akun/kunci penyedia tertentu untuk pengujian — mengambil semua koneksi saat startup dan memfilter berdasarkan penyedia yang dipilih -**Model Dinamis Alat CLI:**Pemilihan model kini diambil secara dinamis dari API `/v1/models` — penyedia seperti Kiro kini menampilkan katalog model lengkapnya -**Daftar Model Antigravitasi:**Diperbarui dengan Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; mengaktifkan `passthroughModels` untuk akses model dinamis (#628)### 🔧 Maintenance

- Penggabungan PR #625 — Penyedia Membatasi perbaikan latar belakang mode cahaya---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Batas/Proksi:**Pengambilan batas Codex tetap untuk akun di belakang proksi SOCKS5 — penyegaran token sekarang berjalan dalam konteks proksi -**CI:**Memperbaiki kegagalan pernyataan `v1/models` pengujian integrasi di lingkungan CI tanpa koneksi penyedia -**Pengaturan:**Tombol tes proxy sekarang langsung menampilkan hasil keberhasilan/kegagalan (sebelumnya tersembunyi di balik data kesehatan)### ✨ New Features

-**Taman Bermain:**Menambahkan tarik-turun pemilih Akun — menguji koneksi tertentu satu per satu saat penyedia memiliki banyak akun### 🔧 Maintenance

- Penggabungan PR #623 — Koreksi jalur URL dasar LongCat API---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Batas UI:**Menambahkan fitur pengelompokan tag ke dasbor koneksi untuk meningkatkan organisasi visual untuk akun dengan tag khusus.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streaming:**Memperbaiki kerusakan status `TextDecoder` di dalam kombo `sanitize` TransformStream yang menyebabkan output SSE kacau yang cocok dengan karakter multibyte (PR #614) -**UI Penyedia:**Merender tag HTML dengan aman di dalam tooltip kesalahan koneksi penyedia menggunakan `dangerouslySetInnerHTML` -**Pengaturan Proksi:**Menambahkan properti isi muatan `nama pengguna` dan `kata sandi` yang hilang sehingga memungkinkan proksi yang diautentikasi berhasil diverifikasi dari Dasbor. -**API Penyedia:**Pengecualian lunak terikat kembali ke `getCodexUsage` yang mencegah kegagalan API HTTP 500 ketika pengambilan token gagal---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Model Sinkronisasi Otomatis:**Menambahkan tombol alih UI dan titik akhir `model sinkronisasi` untuk secara otomatis menyinkronkan daftar model per penyedia menggunakan penjadwal interval terjadwal (PR #597)### 🐛 Bug Fixes

-**Waktu habis:**Peningkatan proxy default `FETCH_TIMEOUT_MS` dan `STREAM_IDLE_TIMEOUT_MS` menjadi 10 menit untuk mendukung model penalaran mendalam (seperti o1) dengan baik tanpa membatalkan permintaan (Perbaikan #609) -**Deteksi Alat CLI:**Peningkatan deteksi lintas platform yang menangani jalur NVM, `PATHEXT` Windows (mencegah masalah pembungkus `.cmd`), dan awalan NPM khusus (PR #598) -**Log Streaming:**Menerapkan akumulasi delta `tool_calls` dalam log respons streaming sehingga panggilan fungsi dilacak dan dipertahankan secara akurat di DB (PR #603) -**Katalog Model:**Menghapus pengecualian autentikasi, menyembunyikan model `comfyui` dan `sdwebui` dengan benar ketika tidak ada penyedia yang dikonfigurasi secara eksplisit (PR #599)### 🌐 Translations

-**cs:**Peningkatan string terjemahan bahasa Ceko di seluruh aplikasi (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Menambahkan bidang Tag/Grup ke `EditConnectionModal` (disimpan di `providerSpecificData.tag`) tanpa memerlukan migrasi skema DB.
- Koneksi dalam tampilan penyedia sekarang dikelompokkan secara dinamis berdasarkan tag dengan pemisah visual.
- Koneksi yang tidak diberi tag muncul pertama kali tanpa header, diikuti oleh grup yang diberi tag dalam urutan abjad.
- Pengelompokan tag secara otomatis diterapkan ke bagian Batas Codex/Copilot/Antigravitasi karena tombol mati ada di dalam baris koneksi.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Lencana yang hilang pada kartu koneksi:**Diperbaiki dengan menggunakan `resolveProxyForConnection()`, bukan pemetaan statis. -**Tes Koneksi dinonaktifkan dalam mode tersimpan:**Mengaktifkan tombol Uji dengan menyelesaikan konfigurasi proxy dari daftar yang disimpan. -**Config Modal freeze:**Menambahkan panggilan `onClose()` setelah simpan/hapus untuk mencegah UI membeku. -**Penghitungan penggunaan ganda:**`ProxyRegistryManager` sekarang memuat penggunaan dengan penuh semangat saat dipasang dengan deduplikasi berdasarkan `scope` + `scopeId`. Jumlah penggunaan diganti dengan tombol Uji yang menampilkan IP/latensi sebaris.#### fix(translator): `function_call` prefix stripping

- Memperbaiki perbaikan yang tidak lengkap dari PR #607 di mana hanya blok `tool_use` yang menghapus awalan alat `proxy_` Claude. Sekarang, klien yang menggunakan format OpenAI Responses API juga akan menerima alat dengan benar tanpa awalan `proxy_`.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Tiga regresi kritis yang dilaporkan oleh pengguna setelah peluncuran v3.0.0 telah diselesaikan.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Awalan `proxy_` yang ditambahkan oleh Claude OAuth hanya dihapus dari tanggapan**streaming**. Dalam mode**non-streaming**, `translateNonStreamingResponse` tidak memiliki akses ke `toolNameMap`, menyebabkan klien menerima nama alat yang rusak seperti `proxy_read_file` alih-alih `read_file`.

**Perbaikan:**Menambahkan parameter opsional `toolNameMap` ke `translateNonStreamingResponse` dan menerapkan penghapusan awalan di pengendali blok `tool_use` Claude. `chatCore.ts` sekarang melewati peta.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI tidak mengekspos `GET /v1/models`. Validator `validateOpenAICompatibleProvider` generik dimasukkan ke dalam fallback penyelesaian obrolan hanya jika `validationModelId` disetel, yang tidak dikonfigurasi oleh LongCat. Hal ini menyebabkan validasi penyedia gagal dengan kesalahan menyesatkan saat menambah/menyimpan.

**Perbaikan:**Menambahkan `longcat` ke peta validator khusus, menyelidiki `/chat/completions` secara langsung dan menganggap respons non-auth sebagai izin.#### fix(translator): normalize object tool schemas for Anthropic (#595)

Alat MCP (misalnya `pensil`, `computer_use`) meneruskan definisi alat dengan `{type:"object"}` tetapi tanpa kolom `properties`. API Anthropic menolak ini dengan: `properti skema objek hilang`.

**Perbaikan:**Di `openai-to-claude.ts`, masukkan `properties: {}` sebagai default yang aman ketika `type` adalah `"object"` dan `properties` tidak ada.---

### 🔀 Community PRs Merged (2)

| PR       | Penulis | Ringkasan                                                                                  |
| -------- | ------- | ------------------------------------------------------------------------------------------ | --- |
| **#589** | @flobo3 | docs(i18n): memperbaiki terjemahan bahasa Rusia untuk Playground dan Testbed               |
| **#591** | @rdself | fix(ui): meningkatkan kontras mode cahaya Batas Penyedia dan merencanakan tampilan tingkat | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 pengujian, 0 kegagalan**(tidak berubah dari v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Rilis terbesar yang pernah ada.**Dari 36 penyedia di v2.9.5 hingga**67+ penyedia**di v3.0.0 — dengan Server MCP, Protokol A2A, mesin kombo otomatis, Ikon Penyedia, API Kunci Terdaftar, 926 pengujian, dan kontribusi dari**12 anggota komunitas**di**10 PR gabungan**.
>
> Konsolidasi dari v3.0.0-rc.1 hingga rc.17 (17 kandidat rilis selama 3 hari pengembangan intensif).---

### 🆕 New Providers (+31 since v2.9.5)

| Penyedia                      | Alias ​​             | Tingkat           | Catatan                                                                                        |
| ----------------------------- | -------------------- | ----------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Kode Terbuka Zen**          | `opencode-zen`       | Gratis            | 3 model melalui `opencode.ai/zen/v1` (PR #530 oleh @kang-heewon)                               |
| **OpenCode Buka**             | `opencode-pergi`     | Berbayar          | 4 model melalui `opencode.ai/zen/go/v1` (PR #530 oleh @kang-heewon)                            |
| **AI Kucing Panjang**         | `lc`                 | Gratis            | 50 juta token/hari (Flash-Lite) + 500 ribu/hari (Obrolan/Berpikir) selama beta publik          |
| **Penyerbukan AI**            | `pol`                | Gratis            | Tidak diperlukan kunci API — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 persyaratan/15dtk) |
| **AI Pekerja Cloudflare**     | `lih`                | Gratis            | 10K Neuron/hari — ~150 respons LLM atau audio Bisikan 500 detik, inferensi tepi                |
| **AI Skalabilitas**           | `scw`                | Gratis            | 1 juta token gratis untuk akun baru — Sesuai dengan UE/GDPR (Paris)                            |
| **API AI/ML**                 | `tujuan`             | Gratis            | Kredit gratis $0,025/hari — 200+ model melalui satu titik akhir                                |
| **Puter AI**                  | `pu`                 | Gratis            | 500+ model (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                           |
| **Alibaba Cloud (DashScope)** | `ali`                | Berbayar          | Titik akhir Internasional + Tiongkok melalui `alicode`/`alicode-intl`                          |
| **Paket Pengkodean Alibaba**  | `bcp`                | Berbayar          | Alibaba Model Studio dengan API yang kompatibel dengan Antropik                                |
| **Kimi Coding (Kunci API)**   | `kmca`               | Berbayar          | Akses Kimi berbasis kunci API khusus (terpisah dari OAuth)                                     |
| **Pengkodean MiniMax**        | `minimaks`           | Berbayar          | Titik akhir internasional                                                                      |
| **MiniMax (Tiongkok)**        | `minimax-cn`         | Berbayar          | Titik akhir khusus Tiongkok                                                                    |
| **Z.AI (GLM-5)**              | `zai`                | Berbayar          | Model GLM generasi berikutnya Zhipu AI                                                         |
| **Verteks AI**                | `puncak`             | Berbayar          | Google Cloud — Akun Layanan JSON atau OAuth access_token                                       |
| **Awan Ollama**               | `ollamacloud`        | Berbayar          | Layanan API yang dihosting Ollama                                                              |
| **Sintetis**                  | `sintetis`           | Berbayar          | Gerbang model passthrough                                                                      |
| **Gerbang Kilo**              | `kg`                 | Berbayar          | Gerbang model passthrough                                                                      |
| **Pencarian Kebingungan**     | `pencarian pplx`     | Berbayar          | Titik akhir berbasis pencarian khusus                                                          |
| **Pencarian Serper**          | `pencarian serper`   | Berbayar          | Integrasi API pencarian web                                                                    |
| **Pencarian Berani**          | `pencarian berani`   | Berbayar          | Integrasi API Penelusuran Berani                                                               |
| **Penelusuran Eksa**          | `penelusuran exa`    | Berbayar          | Integrasi API pencarian saraf                                                                  |
| **Pencarian Tavily**          | `penelusuran-tavily` | Berbayar          | Integrasi API pencarian AI                                                                     |
| **NanoPisang**                | `nb`                 | Berbayar          | API pembuatan gambar                                                                           |
| **SebelasLabs**               | `el`                 | Berbayar          | Sintesis suara teks-ke-ucapan                                                                  |
| **Kartesia**                  | `kartesia`           | Berbayar          | Sintesis suara TTS ultra-cepat                                                                 |
| **BermainHT**                 | `bermain`            | Berbayar          | Kloning Suara dan TTS                                                                          |
| **Dalam Dunia**               | `di dunia`           | Berbayar          | Obrolan suara karakter AI                                                                      |
| **SD WebUI**                  | `sdwebui`            | Dihosting sendiri | Pembuatan gambar lokal Difusi Stabil                                                           |
| **UI Nyaman**                 | `nyaman`             | Dihosting sendiri | Pembuatan berbasis simpul alur kerja lokal ComfyUI                                             |
| **Pengkodean GLM**            | `glm`                | Berbayar          | Titik akhir khusus pengkodean BigModel/Zhipu                                                   | **Total: 67+ penyedia**(4 Gratis, 8 OAuth, 55 Kunci API) + penyedia khusus yang Kompatibel dengan OpenAI/Antropik tanpa batas.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Buat secara otomatis dan terbitkan kunci API OmniRoute secara terprogram dengan penerapan kuota per penyedia dan per akun.

| Titik akhir                    | Metode              | Deskripsi                                                        |
| ------------------------------ | ------------------- | ---------------------------------------------------------------- |
| `/api/v1/kunci-terdaftar`      | `POSTING`           | Keluarkan kunci baru — kunci mentah dikembalikan**hanya sekali** |
| `/api/v1/kunci-terdaftar`      | `DAPATKAN`          | Daftar kunci terdaftar (bertopeng)                               |
| `/api/v1/kunci-terdaftar/{id}` | `DAPATKAN/HAPUS`    | Dapatkan metadata / Cabut                                        |
| `/api/v1/kuota/periksa`        | `DAPATKAN`          | Pra-validasi kuota sebelum diterbitkan                           |
| `/api/v1/providers/{id}/batas` | `DAPATKAN/MASUKKAN` | Konfigurasikan batas penerbitan per penyedia                     |
| `/api/v1/akun/{id}/batas`      | `DAPATKAN/MASUKKAN` | Konfigurasikan batas penerbitan per akun                         |
| `/api/v1/masalah/laporan`      | `POSTING`           | Laporkan kejadian kuota ke GitHub Issues                         |

**Keamanan:**Kunci disimpan sebagai hash SHA-256. Kunci mentah ditampilkan sekali pada pembuatan, tidak dapat diambil lagi.#### 🎨 Provider Icons via @lobehub/icons (#529)

130+ logo penyedia menggunakan `@lobehub/icons` Komponen React (SVG). Rantai cadangan:**Lobehub SVG → PNG yang ada → ikon umum**. Diterapkan di seluruh halaman Dasbor, Penyedia, dan Agen dengan komponen `ProviderIcon` standar.#### 🔄 Model Auto-Sync Scheduler (#488)

Menyegarkan daftar model secara otomatis untuk penyedia yang terhubung setiap**24 jam**. Berjalan pada startup server. Dapat dikonfigurasi melalui `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Memetakan pola nama model (glob) ke kombo tertentu untuk perutean otomatis:

- `claude-sonnet*` → kode-kombo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Tabel `model_combo_mappings` baru dengan pencocokan glob-ke-regex
- Bagian UI Dasbor: "Aturan Perutean Model" dengan tambah/edit/alihkan/hapus sebaris#### 🧭 API Endpoints Dashboard

Katalog interaktif, manajemen webhook, penampil OpenAPI — semuanya dalam satu halaman bertab di `/dashboard/endpoint`.#### 🔍 Web Search Providers

5 integrasi penyedia pencarian baru:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**— memungkinkan respons AI yang membumi dengan data web real-time.#### 📊 Search Analytics

Tab baru di `/dashboard/analytics` — rincian penyedia, tingkat cache hit, pelacakan biaya. API: `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Kolom `max_requests_per_day` dan `max_requests_per_ Minute` dengan penerapan jendela geser dalam memori yang mengembalikan HTTP 429.#### 🎵 Media Playground

Taman bermain pembuatan media lengkap di `/dashboard/media`: Pembuatan Gambar, Video, Musik, Transkripsi Audio (batas unggahan 2 GB), dan Text-to-Speech.---

### 🔒 Security & CI/CD

-**Remediasi CodeQL**— Memperbaiki 10+ peringatan: 6 pengulangan polinomial, 1 keacakan tidak aman (`Math.random()` → `crypto.randomUUID()`), 1 injeksi perintah shell -**Validasi rute**— Skema Zod + `validateBody()` pada**176/176 rute API**— CI diterapkan -**Perbaikan CVE**— kerentanan dompurify XSS (GHSA-v2wj-7wpq-c8vv) diselesaikan melalui npm override -**Datar**— Terbentur 3.3.3 → 3.4.2 (polusi prototipe CWE-1321) -**Docker**— `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: menghapus kesalahan yang dapat ditindaklanjuti ketika `GEMINI_OAUTH_CLIENT_SECRET` hilang di Docker -**#549**— Rute pengaturan CLI kini menyelesaikan kunci API sebenarnya dari `keyId` (bukan string bertopeng) -**#574**— Login tidak lagi terhenti setelah melewati pengaturan kata sandi wizard -**#506**— `machineId` lintas platform ditulis ulang (Windows REG.exe → macOS ioreg → Linux → penggantian nama host)#### Providers & Routing

-**#536**— LongCat AI: memperbaiki `baseUrl` dan `authHeader` -**#535**— Penggantian model yang disematkan: `body.model` disetel dengan benar ke `pinnedModel` -**#570**— Model Claude tanpa awalan kini diselesaikan ke penyedia Anthropic -**#585**— Tag internal `<omniModel>` tidak lagi bocor ke klien di streaming SSE -**#493**— Penamaan model penyedia khusus tidak lagi terkotori oleh penghapusan awalan -**#490**— Streaming + perlindungan cache konteks melalui injeksi `TransformStream` -**#511**— Tag `<omniModel>` dimasukkan ke dalam potongan konten pertama (bukan setelah `[DONE]`)#### CLI & Tools

-**#527**— Kode Claude + Loop Codex: blok `tool_result` sekarang dikonversi menjadi teks -**#524**— Konfigurasi OpenCode disimpan dengan benar (XDG_CONFIG_HOME, format TOML) -**#522**— Manajer API: menghapus tombol "Salin kunci bertopeng" yang menyesatkan -**#546**— `--version` mengembalikan `unknown` di Windows (PR oleh @k0valik) -**#544**— Deteksi alat CLI yang aman melalui jalur instalasi yang diketahui (PR oleh @k0valik) -**#510**— Jalur Windows MSYS2/Git-Bash dinormalisasi secara otomatis -**#492**— CLI mendeteksi Node yang dikelola `mise`/`nvm` ketika `app/server.js` hilang#### Streaming & SSE

-**PR #587**— Mengembalikan impor `resolveDataDir` di tanggapanTransformer untuk kompat Cloudflare Workers (@k0valik) -**PR #495**— Kemacetan 429 penantian tak terbatas: batalkan pekerjaan menunggu pada batas tarif (@xandr0s) -**#483**— Berhenti mengikuti `data: null` setelah sinyal `[DONE]` -**#473**— Streaming Zombie SSE: batas waktu dikurangi 300 detik → 120 detik untuk fallback yang lebih cepat#### Media & Transcription

-**Transkripsi**— Deepgram `video/mp4` → `audio/mp4` pemetaan MIME, deteksi bahasa otomatis, tanda baca -**TTS**— tampilan kesalahan `[Objek Objek]` diperbaiki untuk kesalahan bertumpuk gaya ElevenLabs -**Batas unggahan**— Transkripsi media ditingkatkan menjadi 2 GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— kolom `requested_model` di log panggilan (migrasi 009) -**T02**— Menghapus blok teks kosong dari `tool_result.content` yang disarangkan -**T03**— Mengurai header kuota `x-codex-5h-*` / `x-codex-7d-*` -**T04**— Header `X-Session-Id` untuk perutean tempel eksternal -**T05**— Persistensi DB dengan batas nilai dengan API khusus -**T06**— Akun dinonaktifkan → blok permanen (cooldown 1 tahun) -**T07**— X-Forwarded-Untuk validasi IP (`extractClientIp()`) -**T08**— Batas sesi per kunci API dengan penerapan jendela geser -**T09**— Cakupan batas kecepatan Codex vs Spark (kumpulan terpisah) -**T10**— Kredit habis → penggantian cooldown 1 jam yang berbeda -**T11**— upaya penalaran `maks` → 131072 token anggaran -**T12**— Entri harga MiniMax M2.7 -**T13**— Perbaikan tampilan kuota basi (setel ulang kesadaran jendela) -**T14**— Pemeriksaan TCP gagal cepat proxy (≤2 detik, cache 30 detik) -**T15**— Normalisasi konten array untuk Anthropic -**T23**— Penggantian pengaturan ulang kuota yang cerdas (ekstraksi header) -**T24**— `503` cooldown + `406` pemetaan -**T25**— Penggantian validasi penyedia -**T29**— Akun Layanan Vertex AI JWT autentikasi -**T33**— Tingkat pemikiran terhadap konversi anggaran -**T36**— klasifikasi kesalahan `403` vs `429` -**T38**— Spesifikasi model terpusat (`modelSpecs.ts`) -**T39**— Penggantian titik akhir untuk `fetchAvailableModels` -**T41**— Pengalihan otomatis tugas latar belakang ke model flash -**T42**— Pemetaan rasio aspek pembuatan gambar#### Other Improvements

-**Header khusus upstream per model**— melalui UI konfigurasi (PR #575 oleh @zhangqiang8vip) -**Panjang konteks model**— dapat dikonfigurasi dalam metadata model (PR #578 oleh @hijak) -**Pengupasan awalan model**— opsi untuk menghapus awalan penyedia dari nama model (PR #582 oleh @jay77721) -**Penghentian CLI Gemini**— ditandai tidak berlaku lagi dengan peringatan pembatasan Google OAuth -**YAML parser**— mengganti parser khusus dengan `js-yaml` untuk parsing spesifikasi OpenAPI yang benar -**ZWS v5**— Perbaikan kebocoran HMR (koneksi 485 DB → 1, memori 2,4 GB → 195 MB) -**Ekspor log**— Tombol ekspor JSON baru di dasbor dengan tarik-turun rentang waktu -**Perbarui spanduk pemberitahuan**— beranda dasbor menunjukkan kapan versi baru tersedia---

### 🌐 i18n & Documentation

-**30 bahasa**dengan paritas 100% — 2.788 kunci hilang disinkronkan -**Ceko**— Terjemahan lengkap: 22 dokumen, 2.606 string UI (PR oleh @zen0bit) -**Bahasa Mandarin (zh-CN)**— Terjemahan ulang lengkap (PR oleh @only4copilot) -**Panduan Penerapan VM**— Diterjemahkan ke bahasa Inggris sebagai dokumen sumber -**Referensi API**— Menambahkan titik akhir `/v1/embeddings` dan `/v1/audio/speech` -**Jumlah penyedia**— Diperbarui dari 36+/40+/44+ menjadi**67+**di README dan seluruh 30 README i18n---

### 🔀 Community PRs Merged (10)

| PR       | Penulis         | Ringkasan                                                                                 |
| -------- | --------------- | ----------------------------------------------------------------------------------------- |
| **#587** | @k0valik        | perbaikan (sse): kembalikan impor resolusiDataDir untuk kompatibilitas Cloudflare Workers |
| **#582** | @ jay77721      | feat(proxy): opsi pengupasan awalan nama model                                            |
| **#581** | @ jay77721      | fix(npm): tautkan pelepasan elektron ke alur kerja npm-publish                            |
| **#578** | @hijak          | prestasi: panjang konteks yang dapat dikonfigurasi dalam metadata model                   |
| **#575** | @zhangqiang8vip | prestasi: header upstream per model, PATCH yang kompatibel, penyelarasan obrolan          |
| **#562** | @coobabm        | perbaikan: Manajemen sesi MCP, passthrough Claude, deteksiFormat                          |
| **#561** | @zen0bit        | fix(i18n): koreksi terjemahan bahasa Ceko                                                 |
| **#555** | @k0valik        | fix(sse): `resolveDataDir()` terpusat untuk resolusi jalur                                |
| **#546** | @k0valik        | fix(cli): `--version` mengembalikan `unknown` di Windows                                  |
| **#544** | @k0valik        | fix(cli): deteksi alat CLI yang aman melalui jalur instalasi                              |
| **#542** | @rdself         | fix(ui): mode cahaya kontras variabel tema CSS                                            |
| **#530** | @kang-heewon    | feat: Penyedia OpenCode Zen + Go dengan `OpencodeExecutor`                                |
| **#512** | @zhangqiang8vip | prestasi: kompatibilitas model per protokol (`compatByProtocol`)                          |
| **#497** | @zhangqiang8vip | perbaikan: kebocoran sumber daya HMR mode dev (ZWS v5)                                    |
| **#495** | @xandr0s        | perbaikan: Bottleneck 429 menunggu tak terbatas (jatuhkan pekerjaan menunggu)             |
| **#494** | @zhangqiang8vip | prestasi: Pengembang MiniMax→perbaikan peran sistem                                       |
| **#480** | @prakersh       | perbaikan: ekstraksi penggunaan stream flush                                              |
| **#479** | @prakersh       | prestasi: Codex 5.3/5.4 dan entri harga Antropis                                          |
| **#475** | @only4copilot   | feat(i18n): terjemahan bahasa Mandarin yang ditingkatkan                                  |

**Terima kasih kepada semua kontributor!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 pengujian, 0 kegagalan**(naik dari 821 di v2.9.5)

- +105 pengujian baru yang mencakup: pemetaan kombo model, kunci terdaftar, OpencodeExecutor, penyedia Bailian, validasi rute, klasifikasi kesalahan, pemetaan rasio aspek, dan banyak lagi---

### 📦 Database Migrations

| Migrasi | Deskripsi                                                           |
| ------- | ------------------------------------------------------------------- | --- |
| **008** | tabel `kunci_terdaftar`, `batas_kunci_penyedia`, `batas_kunci_akun` |
| **009** | kolom `requested_model` di `call_logs`                              |
| **010** | Tabel `model_combo_mappings` untuk perutean kombo per model         | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Perubahan yang dapat menyebabkan gangguan:**Tidak ada. Semua konfigurasi, kombo, dan kunci API yang ada dipertahankan.
> Migrasi database 008-010 dijalankan secara otomatis saat startup.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**Remediasi CodeQL**— Memperbaiki 10+ peringatan:

- 6 pengulangan polinomial di `provider.ts` / `chatCore.ts` (mengganti pola pergantian `(?:^|/)` dengan pencocokan berbasis segmen)
- 1 keacakan tidak aman di `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 shell-command-injection in `prepublish.mjs` (`JSON.stringify()` path escaping) -**Validasi rute**— Menambahkan skema Zod + `validateBody()` ke 5 rute yang tidak ada validasi:
- `pemetaan kombo-model` (POST, PUT), `webhook` (POST, PUT), `openapi/coba` (POST)
- CI `check:route-validation:t06` sekarang lolos:**176/176 rute divalidasi**### 🐛 Bug Fixes

-**#585**— Tag internal `<omniModel>` tidak lagi bocor ke klien dalam respons SSE. Menambahkan sanitasi keluar `TransformStream` di `combo.ts`### ⚙️ Infrastructure

-**Docker**— `docker/setup-buildx-action` yang ditingkatkan dari v3 → v4 (perbaikan penghentian penggunaan Node.js 20) -**Pembersihan CI**— Menghapus 150+ alur kerja yang gagal/dibatalkan### 🧪 Tests

- Rangkaian pengujian:**926 pengujian, 0 kegagalan**(+3 baru)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Peningkatan batas transkripsi media
- Menambahkan Panjang Konteks Model ke metadata registri
- Menambahkan header kustom upstream per model melalui UI konfigurasi
- Memperbaiki beberapa bug, validasi Zod untuk patch, dan menyelesaikan berbagai masalah komunitas.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Perutean Kombo Per-model: memetakan pola nama model (glob) ke kombo tertentu untuk perutean otomatis

- Tabel `model_combo_mappings` baru (migrasi 010) dengan pola, combo_id, prioritas, diaktifkan
- Fungsi DB `resolveComboForModel()` dengan pencocokan glob-ke-regex (tidak peka huruf besar-kecil, `*` dan `?` wildcard)
- `getComboForModel()` di `model.ts`: menambah `getCombo()` dengan fallback model-pola
- `chat.ts`: keputusan perutean sekarang memeriksa pemetaan kombo model sebelum penanganan model tunggal
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Dasbor: bagian "Aturan Perutean Model" ditambahkan ke halaman Kombo dengan tambah/edit/alihkan/hapus sebaris
- Contoh: `claude-sonnet*` → kode-kombo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Sinkronisasi i18n Penuh**: 2.788 kunci yang hilang ditambahkan pada 30 file bahasa — semua bahasa kini memiliki paritas 100% dengan `en.json` -**Halaman agen i18n**: Bagian Integrasi OpenCode sepenuhnya diinternasionalkan (judul, deskripsi, pemindaian, label unduhan) -**6 kunci baru**ditambahkan ke namespace `agen` untuk bagian OpenCode### 🎨 UI/UX

-**Ikon Penyedia**: 16 ikon penyedia hilang ditambahkan (3 disalin, 2 diunduh, 11 SVG dibuat) -**Penggantian SVG**: Komponen `ProviderIcon` diperbarui dengan strategi 4 tingkat: Lobehub → PNG → SVG → Ikon generik -**Sidik jari agen**: Disinkronkan dengan alat CLI — menambahkan droid, openclaw, kopilot, kode terbuka ke daftar sidik jari (total 14)### Keamanan

-**Perbaikan CVE**: Mengatasi kerentanan dompurify XSS (GHSA-v2wj-7wpq-c8vv) melalui penggantian npm yang memaksa `dompurify@^3.3.2`

- `npm audit` sekarang melaporkan**0 kerentanan**### 🧪 Tests

- Rangkaian pengujian:**923 pengujian, 0 kegagalan**(+15 pengujian pemetaan kombo model baru)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Penulis  | Ringkasan                                                                               |
| -------- | -------- | --------------------------------------------------------------------------------------- | ------------ |
| **#562** | @coobabm | fix(ux): Manajemen sesi MCP, normalisasi passthrough Claude, modal OAuth, deteksiFormat |
| **#561** | @zen0bit | fix(i18n): Koreksi terjemahan bahasa Ceko — nama metode HTTP dan pembaruan dokumentasi  | ### 🧪 Tests |

- Rangkaian pengujian:**908 pengujian, 0 kegagalan**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**menyelesaikan kunci API asli dari `keyId` di rute pengaturan CLI (`codex-settings`, `droid-settings`, `kilo-settings`) untuk mencegah penulisan string bertopeng (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Penulis  | Ringkasan                                                                                                                                                                        |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik | fix(cli): `--version` mengembalikan `unknown` di Windows — gunakan `JSON.parse(readFileSync)` alih-alih ESM import                                                               |
| **#555** | @k0valik | fix(sse): `resolveDataDir()` terpusat untuk resolusi jalur dalam kredensial, autoCombo, logger respons, dan logger permintaan                                                    |
| **#544** | @k0valik | fix(cli): deteksi alat CLI yang aman melalui jalur instalasi yang diketahui (8 alat) dengan validasi symlink, pemeriksaan jenis file, batasan ukuran, env minimal di healthcheck |
| **#542** | @rdself  | fix(ui): tingkatkan kontras mode terang — tambahkan variabel tema CSS yang hilang (`bg-primary`, `bg-subtle`, `text-primary`) dan perbaiki warna gelap saja di detail log        | ### 🔧 Bug Fixes |

-**Perbaikan TDZ di `cliRuntime.ts`**— `validateEnvPath` digunakan sebelum inisialisasi saat startup modul oleh `getExpectedParentPaths()`. Menyusun ulang deklarasi untuk memperbaiki `ReferenceError`. -**Perbaikan build**— Menambahkan `pino` dan `pino-pretty` ke `serverExternalPackages` untuk mencegah Turbopack merusak pemuatan pekerja internal Pino.### 🧪 Tests

- Rangkaian pengujian:**905 pengujian, 0 kegagalan**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Regresi pembuatan elektron: menurunkan versi Next.js dari `16.1.x` menjadi `16.0.10` untuk menghilangkan ketidakstabilan hashing modul Turbopack yang menyebabkan layar kosong di bundel desktop Electron. -**Perbaikan pengujian unit**— Memperbaiki dua pernyataan pengujian yang sudah usang (rasio/resolusi `nanobanana-image-handler`, pemetaan bidang `thinking-budget` Gemini `thinkingConfig`) yang menyimpang setelah perubahan implementasi baru-baru ini. -**#541**— Menanggapi masukan pengguna tentang kompleksitas instalasi; tidak diperlukan perubahan kode.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: diimplementasikan menggunakan pustaka `jose` untuk menangani autentikasi JWT/Akun Layanan, bersama dengan wilayah yang dapat dikonfigurasi di UI dan pembuatan URL model mitra otomatis. -**T42**— Pemetaan rasio aspek pembuatan gambar: membuat logika `sizeMapper` untuk format OpenAI generik (`size`), menambahkan penanganan `imagen3` asli, dan memperbarui titik akhir NanoBanana untuk memanfaatkan rasio aspek yang dipetakan secara otomatis. -**T38**— Spesifikasi model terpusat: `modelSpecs.ts` dibuat untuk batas dan parameter per model.### 🔧 Improvements

-**T40**— Integrasi alat OpenCode CLI: integrasi asli `opencode-zen` dan `opencode-go` diselesaikan di PR sebelumnya.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— `503` cooldown menunggu perbaikan + `406` pemetaan: memetakan `406 Not Acceptable` ke `503 Service Unavailable` dengan interval cooldown yang tepat. -**T25**— Penggantian validasi penyedia: penggantian yang baik ke model validasi standar ketika `validationModelId` tertentu tidak ada. -**T36**— Penyempurnaan penanganan penyedia `403` vs `429`: diekstraksi ke `errorClassifier.ts` untuk memisahkan dengan benar kegagalan izin keras (`403`) dari batas kapasitas (`429`). -**T39**— Penggantian Endpoint untuk `fetchAvailableModels`: menerapkan mekanisme tri-tier (`/models` -> `/v1/models` -> katalog generik lokal) + `list_models_catalog` pembaruan alat MCP untuk mencerminkan `sumber` dan `peringatan`. -**T33**— Tingkat pemikiran ke konversi anggaran: menerjemahkan tingkat pemikiran kualitatif menjadi alokasi anggaran yang tepat. -**T41**— Pengalihan otomatis tugas latar belakang: merutekan tugas evaluasi latar belakang yang berat ke model flash/efisien secara otomatis. -**T23**— Penggantian pengaturan ulang kuota yang cerdas: secara akurat mengekstrak nilai header `x-ratelimit-reset` / `retry-after` atau memetakan cooldown statis.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Peningkatan dari v2.9.5:**16 masalah terselesaikan · 2 PR komunitas digabungkan · 2 penyedia baru · 7 titik akhir API baru · 3 fitur baru · Migrasi DB 008+009 · 832 pengujian lulus · 15 perbaikan kesenjangan sub2api (T01–T15 selesai).### 🆕 New Providers

| Penyedia             | Alias ​​         | Tingkat  | Catatan                                                             |
| -------------------- | ---------------- | -------- | ------------------------------------------------------------------- |
| **Kode Terbuka Zen** | `opencode-zen`   | Gratis   | 3 model melalui `opencode.ai/zen/v1` (PR #530 oleh @kang-heewon)    |
| **OpenCode Buka**    | `opencode-pergi` | Berbayar | 4 model melalui `opencode.ai/zen/go/v1` (PR #530 oleh @kang-heewon) |

Kedua penyedia menggunakan `OpencodeExecutor` baru dengan perutean multi-format (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Buat secara otomatis dan terbitkan kunci API OmniRoute secara terprogram dengan penerapan kuota per penyedia dan per akun.

| Titik akhir                          | Metode              | Deskripsi                                                        |
| ------------------------------------ | ------------------- | ---------------------------------------------------------------- |
| `/api/v1/kunci-terdaftar`            | `POSTING`           | Keluarkan kunci baru — kunci mentah dikembalikan**hanya sekali** |
| `/api/v1/kunci-terdaftar`            | `DAPATKAN`          | Daftar kunci terdaftar (bertopeng)                               |
| `/api/v1/kunci-terdaftar/{id}`       | `DAPATKAN`          | Dapatkan metadata kunci                                          |
| `/api/v1/kunci-terdaftar/{id}`       | `HAPUS`             | Cabut kunci                                                      |
| `/api/v1/registered-keys/{id}/cabut` | `POSTING`           | Cabut (untuk klien tanpa dukungan DELETE)                        |
| `/api/v1/kuota/periksa`              | `DAPATKAN`          | Pra-validasi kuota sebelum diterbitkan                           |
| `/api/v1/providers/{id}/batas`       | `DAPATKAN/MASUKKAN` | Konfigurasikan batas penerbitan per penyedia                     |
| `/api/v1/akun/{id}/batas`            | `DAPATKAN/MASUKKAN` | Konfigurasikan batas penerbitan per akun                         |
| `/api/v1/masalah/laporan`            | `POSTING`           | Laporkan kejadian kuota ke GitHub Issues                         |

**DB — Migrasi 008:**Tiga tabel baru: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Keamanan:**Kunci disimpan sebagai hash SHA-256. Kunci mentah ditampilkan sekali pada pembuatan, tidak dapat diambil lagi.
**Jenis kuota:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` per penyedia dan per akun.
**Idempotency:**Bidang `idempotency_key` mencegah penerbitan duplikat. Mengembalikan `409 IDEMPOTENCY_CONFLICT` jika kunci sudah digunakan.
**Budget per key:**`dailyBudget` / `hourlyBudget` — membatasi berapa banyak permintaan yang dapat dirutekan oleh suatu kunci per jendela.
**Pelaporan GitHub:**Opsional. Setel `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` untuk membuat masalah GitHub secara otomatis jika kuota terlampaui atau kegagalan penerbitan.#### 🎨 Provider Icons — @lobehub/icons (#529)

Semua ikon penyedia di dasbor sekarang menggunakan komponen React `@lobehub/icons` (130+ penyedia dengan SVG).
Rantai cadangan:**Lobehub SVG → `/providers/{id}.png` yang ada → ikon umum**. Menggunakan pola React `ErrorBoundary` yang tepat.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute kini secara otomatis menyegarkan daftar model untuk penyedia yang terhubung setiap**24 jam**.

- Berjalan saat startup server melalui hook `/api/sync/initialize` yang ada
- Dapat dikonfigurasi melalui variabel lingkungan `MODEL_SYNC_INTERVAL_HOURS`
- Meliputi 16 penyedia utama
- Merekam waktu sinkronisasi terakhir dalam database pengaturan---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Hapus kesalahan yang dapat ditindaklanjuti ketika `GEMINI_OAUTH_CLIENT_SECRET` hilang di Docker/penerapan yang dihosting sendiri. Sebelumnya menunjukkan `client_secret is missing` samar dari Google. Sekarang memberikan instruksi `docker-compose.yml` dan `~/.omniroute/.env` yang spesifik.#### Providers & Routing

-**#536 — LongCat AI:**Memperbaiki `baseUrl` (`api.longcat.chat/openai`) dan `authHeader` (`Otorisasi: Bearer`). -**#535 — Penggantian model yang disematkan:**`body.model` kini disetel dengan benar ke `pinnedModel` ketika perlindungan cache konteks aktif. -**#532 — Validasi kunci OpenCode Go:**Sekarang menggunakan titik akhir pengujian `zen/v1` (`testKeyBaseUrl`) — kunci yang sama berfungsi untuk kedua tingkatan.#### CLI & Tools

-**#527 — Kode Claude + Perulangan Codex:**Blok `tool_result` kini dikonversi menjadi teks alih-alih dihilangkan, sehingga menghentikan perulangan hasil alat yang tak terbatas. -**#524 — Penyimpanan konfigurasi OpenCode:**Menambahkan pengendali `saveOpenCodeConfig()` (sadar XDG_CONFIG_HOME, tulis TOML). -**#521 — Proses masuk terhenti:**Proses masuk tidak lagi macet setelah melewati penyiapan kata sandi — dialihkan dengan benar ke orientasi. -**#522 — Manajer API:**Menghapus tombol "Salin kunci bertopeng" yang menyesatkan (diganti dengan tooltip ikon gembok). -**#532 — Konfigurasi OpenCode Go:**Pengendali pengaturan panduan sekarang menangani `opencode` toolId.#### Developer Experience

-**#489 — Antigravitasi:**`googleProjectId` yang hilang menampilkan error 422 terstruktur dengan panduan penyambungan kembali, bukan error yang samar-samar. -**#510 — Jalur Windows:**Jalur MSYS2/Git-Bash (`/c/Program Files/...`) kini dinormalisasi ke `C:\Program Files\...` secara otomatis. -**#492 — Startup CLI:**`omniroute` CLI sekarang mendeteksi Node yang dikelola `mise`/`nvm` ketika `app/server.js` hilang dan menampilkan instruksi perbaikan yang ditargetkan.---

### 📖 Documentation Updates

-**#513**— Penyetelan ulang kata sandi Docker: `INITIAL_PASSWORD` env var solusi didokumentasikan -**#520**— pnpm: `pnpm menyetujui-membangun lebih baik-sqlite3` langkah didokumentasikan---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| PR       | Penulis      | Ringkasan                                                                            |
| -------- | ------------ | ------------------------------------------------------------------------------------ | --- |
| **#530** | @kang-heewon | Penyedia OpenCode Zen + Go dengan `OpencodeExecutor` dan pengujian yang ditingkatkan | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Persistensi DB batas tarif: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` di `providers.ts`. Kolom `rate_limited_until` yang ada sekarang diekspos sebagai API khusus — Penyegaran token OAuth TIDAK boleh menyentuh bidang ini untuk mencegah loop batas kecepatan. -**T08**— Batas sesi per kunci API: `max_sessions INTEGER DEFAULT 0` ditambahkan ke `api_keys` melalui migrasi otomatis. `sessionManager.ts` mendapatkan `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()`, dan `getActiveSessionCountForKey()`. Penelepon di `chatCore.js` dapat menerapkan batas dan pengurangan pada `req.close`. -**T09**— Cakupan batas kecepatan Codex vs Spark: `getCodexModelScope()` dan `getCodexRateLimitKey()` di `codex.ts`. Model standar (`gpt-5.x-codex`, `codex-mini`) mendapatkan cakupan `"codex"`; model percikan (`codex-spark*`) mendapatkan cakupan `"spark"`. Kunci batas kapasitas harus berupa `${accountId}:${scope}` sehingga menghabiskan satu kumpulan tidak akan memblokir kumpulan lainnya. -**T13**— Perbaikan tampilan kuota basi: `getEffectiveQuotaUsage(used, resetAt)` mengembalikan `0` ketika jendela reset telah berlalu; `formatResetCountdown(resetAt)` mengembalikan string hitung mundur yang dapat dibaca manusia (misalnya `"2h 35m"`). Keduanya diekspor dari `providers.ts` + `localDb.ts` untuk konsumsi dasbor. -**T14**— Kegagalan cepat proksi: `src/lib/proxyHealth.ts` baru dengan `isProxyReachable(proxyUrl, timeoutMs=2000)` (pemeriksaan TCP, ≤2 detik, bukan batas waktu 30 detik), `getCachedProxyHealth()`, `invalidateProxyHealth()`, dan `getAllProxyHealthStatus()`. Hasil di-cache 30 detik secara default; dapat dikonfigurasi melalui `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Rangkaian pengujian:**832 pengujian, 0 kegagalan**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— kolom `requested_model` di `call_logs` (migrasi 009): melacak model mana yang awalnya diminta klien vs model yang dirutekan sebenarnya. Mengaktifkan analisis tingkat penggantian. -**T02**— Hapus blok teks kosong dari `tool_result.content` yang disarangkan: mencegah kesalahan Anthropic 400 (`blok konten teks harus tidak kosong`) saat alat rantai Claude Code menghasilkan hasil. -**T03**— Parsing header `x-codex-5h-*` / `x-codex-7d-*`: `parseCodexQuotaHeaders()` + `getCodexResetTime()` ekstrak jendela kuota Codex untuk penjadwalan cooldown yang tepat, bukan fallback 5 menit yang umum. -**T04**— Header `X-Session-Id` untuk perutean tempel eksternal: `extractExternalSessionId()` di `sessionManager.ts` membaca header `x-session-id` / `x-omniroute-session` dengan awalan `ext:` untuk menghindari tabrakan dengan ID sesi SHA-256 internal. Kompatibel dengan Nginx (header dengan tanda penghubung). -**T06**— Akun dinonaktifkan → pemblokiran permanen: `isAccountDeactivated()` di `accountFallback.ts` mendeteksi 401 sinyal penonaktifan dan menerapkan cooldown 1 tahun untuk mencegah percobaan ulang akun yang mati secara permanen. -**T07**— Validasi IP X-Forwarded-For: `src/lib/ipUtils.ts` baru dengan `extractClientIp()` dan `getClientIpFromRequest()` — melewati entri `unknown`/non-IP dalam rantai `X-Forwarded-For` (permintaan Nginx/proxy-forwarded). -**T10**— Kredit habis → penggantian yang berbeda: `isCreditsExhausted()` di `accountFallback.ts` mengembalikan cooldown 1 jam dengan tanda `creditsExhausted`, berbeda dari pembatasan tarif 429 umum. -**T11**— upaya penalaran `maks` → 131072 token anggaran: `EFFORT_BUDGETS` dan `THINKING_LEVEL_MAP` diperbarui; pemetaan terbalik kini menampilkan `"maks"` untuk respons anggaran penuh. Tes unit diperbarui. -**T12**— Entri harga MiniMax M2.7 ditambahkan: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` ditambahkan ke tabel harga (sub2api PR #1120). Harga M2.5/GLM-4.7/GLM-5/Kimi sudah ada. -**T15**— Normalisasi konten array: pembantu `normalizeContentToString()` di `openai-to-claude.ts` dengan benar menciutkan pesan sistem/alat berformat array ke string sebelum dikirim ke Anthropic.### 🧪 Tests

- Rangkaian pengujian:**832 pengujian, 0 kegagalan**(tidak berubah dari rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— API Penyediaan Kunci Terdaftar: kunci API yang diterbitkan secara otomatis dengan penerapan kuota per penyedia & per akun

- `POST /api/v1/registered-keys` — mengeluarkan kunci dengan dukungan idempotensi
- `GET /api/v1/registered-keys` — mencantumkan kunci terdaftar (yang disamarkan).
- `GET /api/v1/registered-keys/{id}` — dapatkan metadata kunci
- `HAPUS /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — mencabut kunci
- `GET /api/v1/quotas/check` — pra-validasi sebelum diterbitkan
- `PUT /api/v1/providers/{id}/limits` — menetapkan batas penerbitan penyedia
- `PUT /api/v1/accounts/{id}/limits` — menetapkan batas penerbitan akun
- `POST /api/v1/issues/report` — pelaporan masalah GitHub opsional
- Migrasi DB 008: tabel `registered_keys`, `provider_key_limits`, `account_key_limits`---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— Penyedia OpenCode Zen dan OpenCode Go ditambahkan (oleh @kang-heewon)

- `OpencodeExecutor` baru dengan perutean multi-format (`/chat/completions`, `/messages`, `/responses`)
- 7 model di kedua tingkatan---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Ikon penyedia kini menggunakan [@lobehub/icons](https://github.com/lobehub/lobe-icons) dengan fallback PNG yang anggun dan komponen `ProviderIcon` (mendukung 130+ penyedia) -**#488**— Perbarui daftar model secara otomatis setiap 24 jam melalui `modelSyncScheduler` (dapat dikonfigurasi melalui `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: sekarang menampilkan kesalahan jelas yang dapat ditindaklanjuti ketika `GEMINI_OAUTH_CLIENT_SECRET` tidak ada di Docker/penerapan yang dihosting sendiri---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— Validasi kunci LongCat AI: baseUrl tetap (`api.longcat.chat/openai`) dan authHeader (`Otorisasi: Bearer`) -**#535**— Penggantian model yang disematkan: `body.model` kini disetel ke `pinnedModel` ketika perlindungan cache konteks mendeteksi model yang disematkan -**#524**— Konfigurasi OpenCode sekarang disimpan dengan benar: menambahkan pengendali `saveOpenCodeConfig()` (sadar XDG_CONFIG_HOME, tulis TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Login tidak lagi macet setelah melewatkan pengaturan kata sandi (dialihkan ke orientasi) -**#522**— Manajer API: Menghapus tombol "Salin kunci bertopeng" yang menyesatkan (diganti dengan tooltip ikon kunci) -**#527**— Claude Code + Codex superpowers loop: blok `tool_result` sekarang dikonversi menjadi teks, bukan dihilangkan -**#532**— Validasi kunci OpenCode GO API sekarang menggunakan titik akhir `zen/v1` yang benar (`testKeyBaseUrl`) -**#489**— Antigravitasi: `googleProjectId` yang hilang menghasilkan kesalahan 422 terstruktur dengan panduan penyambungan kembali -**#510**— Windows: Jalur MSYS2/Git-Bash (`/c/Program Files/...`) kini dinormalisasi ke `C:\Program Files\...` -**#492**— `omniroute` CLI sekarang mendeteksi `mise`/`nvm` ketika `app/server.js` hilang dan menunjukkan perbaikan yang ditargetkan### Dokumentasi

-**#513**— Penyetelan ulang kata sandi Docker: `INITIAL_PASSWORD` env var solusi didokumentasikan -**#520**— pnpm: `pnpm menyetujui-membangun lebih baik-sqlite3` didokumentasikan### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Penyedia OpenCode baru, penyematan perbaikan kredensial, bug kunci bertopeng CLI, perbaikan CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**Alat CLI menyimpan kunci API bertopeng ke file konfigurasi**— `claude-settings`, `cline-settings`, dan `openclaw-settings` Rute POST sekarang menerima param `keyId` dan menyelesaikan kunci API sebenarnya dari DB sebelum menulis ke disk. `ClaudeToolCard` diperbarui untuk mengirim `keyId` alih-alih string tampilan yang disamarkan. Perbaikan #523, #526. -**Penyedia penyematan khusus: `Tidak ada kesalahan kredensial`**— `/v1/embeddings` kini melacak `credentialsProviderId` secara terpisah dari awalan perutean, sehingga kredensial diambil dari ID simpul penyedia yang cocok, bukan dari string awalan publik. Memperbaiki regresi yang menyebabkan `google/gemini-embedding-001` dan model penyedia khusus serupa selalu gagal dengan kesalahan kredensial. Perbaikan terkait #532. (PR #528 oleh @jacob2826) -**Regex perlindungan cache konteks tidak ada`
` prefix**— `CACHE_TAG_PATTERN` di `comboAgentMiddleware.ts` diperbarui agar cocok dengan `literal` (backslash-n) dan baris baru aktual U+000A yang dimasukkan streaming `combo.ts` di sekitar tag `<omniModel>` setelah perbaikan #515. Perbaikan #531.### ✨ New Providers

-**OpenCode Zen**— Gerbang tingkat gratis di `opencode.ai/zen/v1` dengan 3 model: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Layanan berlangganan di `opencode.ai/zen/go/v1` dengan 4 model: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (format Claude), `minimax-m2.5` (format Claude)

- Kedua penyedia menggunakan `OpencodeExecutor` baru yang merutekan secara dinamis ke `/chat/completions`, `/messages`, `/responses`, atau `/models/{model}:generateContent` berdasarkan model yang diminta. (PR #530 oleh @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Perbaikan bug — pertahankan kunci cache prompt Codex, perbaiki pelolosan tagContent JSON, sinkronkan status token yang kedaluwarsa ke DB.### 🐛 Bug Fixes

-**fix(penerjemah)**: Pertahankan `prompt_cache_key` di API Responses → Terjemahan Penyelesaian Obrolan (#517)
— Bidang ini adalah sinyal afinitas cache yang digunakan oleh Codex; menghapusnya mencegah cache langsung ditemukan.
Diperbaiki di `openai-responses.ts` dan `responsesApiHelper.ts`.

-**perbaiki(kombo)**: Escape `
` di `tagContent` jadi string JSON yang dimasukkan valid (#515)
— Baris baru literal template (U+000A) tidak boleh dihilangkan di dalam nilai string JSON.
Diganti dengan `\n` urutan literal di `open-sse/services/combo.ts`.

-**perbaikan(penggunaan)**: Menyinkronkan status token yang kedaluwarsa kembali ke DB pada kegagalan autentikasi langsung (#491)
— Ketika pemeriksaan langsung Batas & Kuota mengembalikan 401/403, koneksi `testStatus` sekarang diperbarui
ke `"kedaluwarsa"` dalam database sehingga halaman Penyedia mencerminkan kondisi terdegradasi yang sama.
Diperbaiki di `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint: Tambahkan 5 penyedia AI gratis baru — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)**: Tambahkan LongCat AI (`lc/`) — 50 juta token/hari gratis (Flash-Lite) + 500 ribu/hari (Chat/Thinking) selama beta publik. Otentikasi Bearer standar yang kompatibel dengan OpenAI. -**feat(penyedia/penyerbukan)**: Tambahkan AI Penyerbukan (`pol/`) — tidak diperlukan kunci API. Proksi GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (gratis 1 persyaratan/15 detik). Pelaksana khusus menangani autentikasi opsional. -**feat(providers/cloudflare-ai)**: Tambahkan Cloudflare Workers AI (`cf/`) — 10K Neuron/hari gratis (~150 respons LLM atau audio Whisper 500 detik). 50+ model di keunggulan global. Pelaksana khusus membuat URL dinamis dengan `accountId` dari kredensial. -**feat(providers/scaleway)**: Tambahkan API Generatif Scaleway (`scw/`) — 1 juta token gratis untuk akun baru. Sesuai dengan UE/GDPR (Paris). Qwen3 235B, Llama 3.1 70B, Mistral Kecil 3.2. -**feat(providers/aimlapi)**: Tambahkan AI/ML API (`aiml/`) — kredit gratis $0,025/hari, 200+ model (GPT-4o, Claude, Gemini, Llama) melalui titik akhir agregator tunggal.### 🔄 Provider Updates

-**feat(penyedia/bersama)**: Tambahkan `hasFree: true` + 3 ID model gratis permanen: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free` -**feat(providers/gemini)**: Tambahkan `hasFree: true` + `freeNote` (1.500 permintaan/hari, tidak perlu kartu kredit, aistudio.google.com) -**tugas(penyedia/gemini)**: Ganti nama tampilan menjadi `Gemini (Google AI Studio)` untuk kejelasan### ⚙️ Infrastructure

-**feat(executors/pollinations)**: `PollinationsExecutor` baru — menghilangkan header `Authorization` ketika tidak ada kunci API yang disediakan -**feat(executors/cloudflare-ai)**: `CloudflareAIExecutor` baru — konstruksi URL dinamis memerlukan `accountId` dalam kredensial penyedia -**prestasi(pelaksana)**: Daftarkan pemetaan eksekutor `penyerbukan`, `pol`, `cloudflare-ai`, `cf`### Dokumentasi

-**docs(readme)**: Memperluas tumpukan kombo gratis ke 11 penyedia ($0 selamanya) -**docs(readme)**: Menambahkan 4 bagian penyedia gratis baru (LongCat, Pollinations, Cloudflare AI, Scaleway) dengan tabel model -**docs(readme)**: Tabel harga diperbarui dengan 4 baris tingkat gratis baru -**docs(i18n/pt-BR)**: Tabel harga diperbarui + menambahkan bagian LongCat/Pollination/Cloudflare AI/Scaleway dalam bahasa Portugis -**docs(new-features/ai)**: 10 file spesifikasi tugas + rencana implementasi induk di `docs/new-features/ai/`### 🧪 Tests

- Rangkaian pengujian:**821 pengujian, 0 kegagalan**(tidak berubah)---

## [2.9.2] — 2026-03-21

> Sprint: Memperbaiki transkripsi media (Tipe Konten Deepgram/HuggingFace, deteksi bahasa) dan tampilan kesalahan TTS.### 🐛 Bug Fixes

-**perbaikan(transkripsi)**: Transkripsi audio Deepgram dan HuggingFace kini memetakan `video/mp4` → `audio/mp4` dan jenis MIME media lainnya dengan benar melalui helper `resolveAudioContentType()` baru. Sebelumnya, mengunggah file `.mp4` secara konsisten menghasilkan "Tidak ada ucapan terdeteksi" karena Deepgram menerima `Tipe Konten: video/mp4`. -**perbaikan(transkripsi)**: Menambahkan `detect_lingual=true` ke permintaan Deepgram — secara otomatis mendeteksi bahasa audio (Portugis, Spanyol, dll.) alih-alih menggunakan bahasa Inggris secara default. Memperbaiki transkripsi non-Inggris yang mengembalikan hasil kosong atau sampah. -**fix(transkripsi)**: Menambahkan `tanda baca=true` ke permintaan Deepgram untuk keluaran transkripsi berkualitas lebih tinggi dengan tanda baca yang benar. -**fix(tts)**: tampilan kesalahan `[Objek Objek]` dalam respons Text-to-Speech diperbaiki di `audioSpeech.ts` dan `audioTranscription.ts`. Fungsi `upstreamErrorResponse()` sekarang dengan benar mengekstrak pesan string bertingkat dari penyedia seperti ElevenLabs yang mengembalikan `{ error: { message: "...", status_code: 401 } }` alih-alih string kesalahan datar.### 🧪 Tests

- Rangkaian pengujian:**821 pengujian, 0 kegagalan**(tidak berubah)### Triaged Issues

-**#508**— Regresi format panggilan alat: log proksi yang diminta dan info rantai penyedia (`info kebutuhan`) -**#510**— Jalur pemeriksaan kesehatan Windows CLI: meminta info versi shell/Node (`info kebutuhan`) -**#485**— Panggilan alat Kiro MCP: ditutup sebagai masalah Kiro eksternal (bukan OmniRoute) -**#442**— Titik akhir Baseten /models: ditutup (solusi manual terdokumentasi) -**#464**— API penyediaan kunci: diakui sebagai item peta jalan---

## [2.9.1] — 2026-03-21

> Sprint: Perbaiki kehilangan data omniModel SSE, gabungkan kompatibilitas model per protokol.### Bug Fixes

-**#511**— Penting: Tag `<omniModel>` dikirim setelah `finish_reason:stop` di aliran SSE, sehingga menyebabkan kehilangan data. Tag kini dimasukkan ke dalam potongan konten pertama yang tidak kosong, menjamin pengiriman sebelum SDK menutup koneksi.### Merged PRs

-**PR #512**(@zhangqiang8vip): Kompatibilitas model per protokol — `normalizeToolCallId` dan `preserveOpenAIDeveloperRole` kini dapat dikonfigurasi per protokol klien (OpenAI, Claude, Responses API). Bidang `compatByProtocol` baru dalam konfigurasi model dengan validasi Zod.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: meminta info PATH/versi -**#509**— Regresi Turbopack Electron: bug Next.js upstream, solusi yang terdokumentasi -**#508**— layar hitam macOS: solusi `--disable-gpu` yang disarankan---

## [2.9.0] — 2026-03-20

> Sprint: Perbaikan machineId lintas platform, batas kecepatan per kunci API, cache konteks streaming, Alibaba DashScope, analisis pencarian, ZWS v5, dan 8 masalah telah diselesaikan.### ✨ New Features

-**feat(search)**: Tab Analisis Penelusuran di `/dasbor/analytics` — perincian penyedia, tingkat cache hit, pelacakan biaya. API baru: `GET /api/v1/search/analytics` (#feat/routing-penyedia pencarian) -**feat(provider)**: Alibaba Cloud DashScope ditambahkan dengan validasi jalur endpoint kustom — `chatPath` dan `modelsPath` yang dapat dikonfigurasi per node (#feat/custom-endpoint-paths) -**feat(api)**: Batas jumlah permintaan per kunci API — kolom `max_requests_per_day` dan `max_requests_per_menit` dengan penerapan jendela geser dalam memori yang mengembalikan HTTP 429 (#452) -**feat(dev)**: ZWS v5 — Perbaikan kebocoran HMR (485 koneksi DB → 1), memori 2,4GB → 195MB, lajang `globalThis`, perbaikan peringatan Edge Runtime (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: `machineId` lintas platform — `getMachineIdRaw()` ditulis ulang dengan air terjun coba/tangkap (Windows REG.exe → macOS ioreg → Pembacaan file Linux → nama host → `os.hostname()`). Menghilangkan percabangan `process.platform` yang menghilangkan kode mati bundler Next.js, memperbaiki `'head' tidak dikenali` di Windows. Juga perbaikan #466. -**fix(#493)**: Penamaan model penyedia khusus — menghapus penghapusan awalan yang salah di `DefaultExecutor.transformRequest()` yang merusak ID model cakupan organisasi seperti `zai-org/GLM-5-FP8`. -**fix(#490)**: Streaming + perlindungan cache konteks — `TransformStream` mencegat SSE untuk memasukkan tag `<omniModel>` sebelum penanda `[DONE]`, sehingga mengaktifkan perlindungan cache konteks untuk respons streaming. -**fix(#458)**: Validasi skema kombo — kolom `system_message`, `tool_filter_regex`, `context_cache_protection` kini lolos validasi Zod saat disimpan. -**fix(#487)**: pembersihan kartu KIRO MITM — menghapus ZWS_README, menghasilkan `AntigravityToolCard` untuk menggunakan metadata alat dinamis.### 🧪 Tests

- Menambahkan pengujian unit filter alat berformat Antropik (PR #397) — 8 pengujian regresi untuk `tool.name` tanpa pembungkus `.function`
- Rangkaian pengujian:**821 pengujian, 0 kegagalan**(naik dari 813)### 📋 Issues Closed (8)

-**#506**— ID mesin Windows `head` tidak dikenali (diperbaiki) -**#493**— Penamaan model penyedia khusus (tetap) -**#490**— Cache konteks streaming (tetap) -**#452**— Batas permintaan per kunci API (diterapkan) -**#466**— Kegagalan login Windows (akar penyebab yang sama dengan #506) -**#504**— MITM tidak aktif (perilaku yang diharapkan) -**#462**— Gemini CLI PSA (terselesaikan) -**#434**— Aplikasi elektron mogok (duplikat #402)## [2.8.9] — 2026-03-20

> Sprint: Gabungkan PR komunitas, perbaiki kartu KIRO MITM, pembaruan ketergantungan.### Merged PRs

-**PR #498**(@Sajid11194): Memperbaiki kerusakan ID mesin Windows (`tidak terdefinisi\REG.exe`). Menggantikan `node-machine-id` dengan kueri registri OS asli.**Tutup #486.** -**PR #497**(@zhangqiang8vip): Memperbaiki kebocoran sumber daya HMR mode dev — 485 koneksi DB bocor → 1, memori 2,4 GB → 195 MB. Lajang `globalThis`, perbaikan peringatan Edge Runtime, stabilitas pengujian Windows. (+1168/-338 di 22 file) -**PR #499-503**(Dependabot): Pembaruan Tindakan GitHub — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `docker/login-action@4`.### Bug Fixes

-**#505**— Kartu KIRO MITM sekarang menampilkan instruksi khusus alat (`api.anthropic.com`) dan bukan teks khusus Antigravitasi. -**#504**— Ditanggapi dengan klarifikasi UX (MITM "Tidak aktif" adalah perilaku yang diharapkan ketika proxy tidak berjalan).---

## [2.8.8] — 2026-03-20

> Sprint: Perbaiki kerusakan pengujian batch OAuth, tambahkan tombol "Uji Semua" ke halaman penyedia individual.### Bug Fixes

-**Kerusakan uji batch OAuth**(ERR_CONNECTION_REFUSED): Mengganti for-loop berurutan dengan batas konkurensi 5 koneksi + batas waktu per koneksi 30 detik melalui `Promise.race()` + `Promise.allSettled()`. Mencegah kerusakan server saat menguji grup penyedia OAuth besar (~30+ koneksi).### Fitur

-**Tombol "Uji Semua" di halaman penyedia**: Halaman penyedia individual (misalnya, `/penyedia/codex`) sekarang menampilkan tombol "Uji Semua" di header Koneksi ketika ada 2+ koneksi. Menggunakan `POST /api/providers/test-batch` dengan `{mode: "provider", providerId}`. Hasil ditampilkan dalam modal dengan ringkasan lulus/gagal dan diagnosis per koneksi.---

## [2.8.7] — 2026-03-20

> Sprint: Gabungkan PR #495 (Bottleneck 429 drop), perbaiki #496 (penyedia penyematan khusus), fitur triase.### Bug Fixes

-**Bottleneck 429 penantian tak terbatas**(PR #495 oleh @xandr0s): Pada 429, `limiter.stop({ dropWaitingJobs: true })` segera menggagalkan semua permintaan antrean sehingga penelepon upstream dapat memicu fallback. Pembatas dihapus dari Peta sehingga permintaan berikutnya membuat instance baru. -**Model penyematan khusus tidak dapat diselesaikan**(#496): `POST /v1/embeddings` sekarang menyelesaikan model penyematan khusus dari SEMUA node_penyedia (bukan hanya localhost). Mengaktifkan model seperti `google/gemini-embedding-001` yang ditambahkan melalui dasbor.### Issues Responded

-**#452**— Batas jumlah permintaan per kunci API (diakui, pada peta jalan) -**#464**— Menerbitkan kunci API secara otomatis dengan batas penyedia/akun (membutuhkan detail lebih lanjut) -**#488**— Perbarui daftar model secara otomatis (diakui, pada peta jalan) -**#496**— Resolusi penyedia penyematan khusus (tetap)---

## [2.8.6] — 2026-03-20

> Sprint: Gabungkan PR #494 (perbaikan peran MiniMax), perbaiki dasbor KIRO MITM, triase 8 masalah.### Fitur

-**Pengembang MiniMax→perbaikan peran sistem**(PR #494 oleh @zhangqiang8vip): Tombol `preserveDeveloperRole` per model. Menambahkan UI "Kompatibilitas" di halaman penyedia. Memperbaiki 422 "kesalahan param peran" untuk MiniMax dan gateway serupa. -**roleNormalizer**: `normalizeDeveloperRole()` sekarang menerima parameter `preserveDeveloperRole` dengan perilaku tri-state (undefinisi=keep, true=keep, false=convert). -**DB**: `getModelPreserveOpenAIDeveloperRole()` dan `mergeModelCompatOverride()` baru di `models.ts`.### Bug Fixes

-**Dasbor KIRO MITM**(#481/#487): `CLIToolsPageClient` sekarang merutekan alat `configType: "mitm"` apa pun ke `AntigravityToolCard` (kontrol Mulai/Berhenti MITM). Sebelumnya hanya Antigravitasi yang di-hardcode. -**AntigravityToolCard generik**: Menggunakan `tool.image`, `tool.description`, `tool.id` alih-alih nilai Antigravity yang dikodekan secara hardcode. Melindungi terhadap `defaultModels` yang hilang.### Cleanup

- Menghapus `ZWS_README_V2.md` (dokumen khusus pengembangan dari PR #494).### Issues Triaged (8)

-**#487**— Tertutup (KIRO MITM diperbaiki dalam rilis ini) -**#486**— info kebutuhan (masalah PATH Windows REG.exe) -**#489**— info kebutuhan (ProjectId antigravitasi hilang, OAuth perlu disambungkan kembali) -**#492**— info kebutuhan (aplikasi/server.js tidak ada pada Node yang dikelola secara salah) -**#490**— Diakui (streaming + pemblokiran cache konteks, rencana perbaikan) -**#491**— Diakui (ketidakkonsistenan status autentikasi Codex) -**#493**— Diakui (Awalan nama model penyedia modal, solusi tersedia) -**#488**— Simpanan permintaan fitur (daftar model pembaruan otomatis)---

## [2.8.5] — 2026-03-19

> Sprint: Memperbaiki aliran SSE zombie, cache konteks putaran pertama, KIRO MITM, dan triase 5 masalah eksternal.### Bug Fixes

-**Zombie SSE Streams**(#473): Kurangi `STREAM_IDLE_TIMEOUT_MS` dari 300 detik → 120 detik untuk penggantian kombo yang lebih cepat saat penyedia terhenti di tengah streaming. Dapat dikonfigurasi melalui env var. -**Tag Cache Konteks**(#474): Perbaiki `injectModelTag()` untuk menangani permintaan putaran pertama (tidak ada pesan asisten) — perlindungan cache konteks kini berfungsi sejak respons pertama. -**KIRO MITM**(#481): Ubah KIRO `configType` dari `guide` → `mitm` sehingga dasbor menampilkan kontrol Start/Stop MITM. -**Uji E2E**(CI): Perbaiki `providers-bailian-coding-plan.spec.ts` — tutup modal overlay yang sudah ada sebelum mengeklik tombol Tambahkan Kunci API.### Closed Issues

- #473 — Aliran Zombie SSE melewati combo fallback
- #474 — Tag `<omniModel>` cache konteks hilang pada giliran pertama
- #481 — MITM untuk KIRO tidak dapat diaktifkan dari dashboard
- #468 — Server jarak jauh Gemini CLI (digantikan oleh penghentian #462)
- #438 — Claude tidak dapat menulis file (masalah CLI eksternal)
- #439 — AppImage tidak berfungsi (solusi libfuse2 terdokumentasi)
- #402 — ARM64 DMG "rusak" (solusi xattr -cr terdokumentasi)
- #460 — CLI tidak dapat dijalankan di Windows (perbaikan PATH terdokumentasi)---

## [2.8.4] — 2026-03-19

> Sprint: Penghentian CLI Gemini, perbaikan panduan VM i18n, perbaikan keamanan dependabot, perluasan skema penyedia.### Fitur

-**Penghentian CLI Gemini**(#462): Tandai penyedia `gemini-cli` sebagai tidak digunakan lagi dengan peringatan — Google membatasi penggunaan OAuth pihak ketiga mulai Maret 2026 -**Skema Penyedia**(#462): Perluas validasi Zod dengan bidang opsional `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint`### Bug Fixes

-**VM Guide i18n**(#471): Tambahkan `VM_DEPLOYMENT_GUIDE.md` ke pipeline terjemahan i18n, buat ulang 30 terjemahan lokal dari sumber bahasa Inggris (terjebak dalam bahasa Portugis)### Keamanan

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — memperbaiki polusi prototipe CWE-1321 (#484, @dependabot)### Closed Issues

- #472 — Regresi Model Alias (diperbaiki di v2.8.2)
- #471 — Terjemahan panduan VM rusak
- #483 — Mengikuti `data: null` setelah `[SELESAI]` (diperbaiki di v2.8.3)### Merged PRs

- #484 — deps: perubahan diratakan dari 3.3.3 ke 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: Czech i18n, perbaikan protokol SSE, terjemahan panduan VM.### Fitur

-**Bahasa Ceko**(#482): Ceko Penuh (cs) i18n — 22 dokumen, 2606 string UI, pembaruan pengalih bahasa (@zen0bit) -**Panduan Penerapan VM**: Diterjemahkan dari bahasa Portugis ke bahasa Inggris sebagai dokumen sumber (@zen0bit)### Bug Fixes

-**Protokol SSE**(#483): Berhenti mengirim `data: null` tambahan setelah sinyal `[SELESAI]` — memperbaiki `AI_TypeValidationError` di klien AI SDK yang ketat (validator berbasis Zod)### Merged PRs

- #482 — Tambahkan bahasa Ceko + Perbaiki VM_DEPLOYMENT_GUIDE.md sumber bahasa Inggris (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 PR gabungan, perbaikan perutean alias model, ekspor log, dan triase masalah.### Fitur

-**Ekspor Log**: Tombol Ekspor baru di `/dashboard/logs` dengan dropdown rentang waktu (1 jam, 6 jam, 12 jam, 24 jam). Mengunduh JSON dari log permintaan/proxy/panggilan melalui `/api/logs/export` API (#permintaan pengguna)### Bug Fixes

-**Perutean Alias ​​Model**(#472): Pengaturan → Model Alias ​​sekarang memengaruhi perutean penyedia dengan benar, bukan hanya deteksi format. Sebelumnya keluaran `resolveModelAlias()` hanya digunakan untuk `getModelTargetFormat()` tetapi ID model asli dikirim ke penyedia -**Stream Flush Usage**(#480): Data penggunaan dari kejadian SSE terakhir di buffer kini diekstraksi dengan benar selama stream flush (digabung dari @prakersh)### Merged PRs

- #480 — Ekstrak penggunaan dari sisa buffer di flush handler (@prakersh)
- #479 — Tambahkan entri harga Codex 5.3/5.4 dan ID model Antropik yang hilang (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Lima PR komunitas — perbaikan log panggilan streaming, kompatibilitas Kiro, analisis token cache, terjemahan bahasa Mandarin, dan ID panggilan alat yang dapat dikonfigurasi.### Fitur

-**feat(logs)**: Konten respons log panggilan sekarang diakumulasikan dengan benar dari potongan penyedia mentah (OpenAI/Claude/Gemini) sebelum penerjemahan, memperbaiki muatan respons kosong dalam mode streaming (#470, @zhangqiang8vip) -**feat(penyedia)**: Normalisasi ID panggilan alat 9 karakter yang dapat dikonfigurasi per model (gaya Mistral) — hanya model dengan opsi diaktifkan yang mendapatkan ID terpotong (#470) -**feat(api)**: API PATCH Kunci diperluas untuk mendukung bidang `allowedConnections`, `name`, `autoResolve`, `isActive`, dan `accessSchedule` (#470) -**feat(dashboard)**: Tata letak respons pertama di UI detail log permintaan (#470) -**feat(i18n)**: Terjemahan bahasa Mandarin yang ditingkatkan (zh-CN) — terjemahan ulang lengkap (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Menghapus bidang `model` yang dimasukkan dari isi permintaan — Kiro API menolak bidang tingkat atas yang tidak diketahui (#478, @prakersh) -**perbaikan(penggunaan)**: Sertakan pembacaan cache + token pembuatan cache dalam total masukan riwayat penggunaan untuk analisis yang akurat (#477, @prakersh) -**fix(callLogs)**: Mendukung bidang penggunaan format Claude (`input_tokens`/`output_tokens`) bersama format OpenAI, mencakup semua varian token cache (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: Penyedia Bailian Coding Plan dengan URL dasar yang dapat diedit, ditambah kontribusi komunitas untuk Alibaba Cloud dan Kimi Coding.### Fitur

-**prestasi(penyedia)**: Menambahkan Paket Pengkodean Bailian (`rencana-pengkodean-bailian`) — Alibaba Model Studio dengan API yang kompatibel dengan Antropis. Katalog statis 8 model termasuk Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5, dan Kimi K2.5. Termasuk validasi autentikasi khusus (400=valid, 401/403=tidak valid) (#467, @Mind-Dragon) -**feat(admin)**: URL default yang dapat diedit di alur pembuatan/edit Admin Penyedia — pengguna dapat mengonfigurasi URL dasar khusus per koneksi. Bertahan di `providerSpecificData.baseUrl` dengan validasi skema Zod yang menolak skema non-http(s) (#467)### 🧪 Tests

- Menambahkan 30+ pengujian unit dan 2 skenario e2e untuk penyedia Bailian Coding Plan yang mencakup validasi autentikasi, pengerasan skema, perilaku tingkat rute, dan integrasi lintas lapisan---

## [2.7.10] — 2026-03-19

> Sprint: Dua penyedia kontribusi komunitas baru (Alibaba Cloud Coding, Kimi Coding API-key) dan perbaikan pino Docker.### Fitur

-**prestasi(penyedia)**: Menambahkan dukungan Alibaba Cloud Coding Plan dengan dua endpoint yang kompatibel dengan OpenAI — `alicode` (Tiongkok) dan `alicode-intl` (Internasional), masing-masing dengan 8 model (#465, @dtk1985) -**prestasi(penyedia)**: Menambahkan jalur penyedia `kimi-coding-apikey` khusus — akses Kimi Coding berbasis kunci API tidak lagi dipaksa melalui rute `kimi-coding` khusus OAuth. Termasuk registri, konstanta, model API, konfigurasi, dan uji validasi (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: Menambahkan ketergantungan `split2` yang hilang ke image Docker — `pino-abstract-transport` memerlukannya pada saat runtime namun tidak disalin ke dalam kontainer mandiri, menyebabkan `Tidak dapat menemukan modul 'split2'` mogok (#459)---

## [2.7.9] — 2026-03-18

> Sprint: Passthrough subjalur respons Codex didukung secara asli, kerusakan Windows MITM diperbaiki, dan skema agen Kombo disesuaikan.### Fitur

-**feat(codex)**: Passthrough subjalur tanggapan asli untuk Codex — merutekan `POST /v1/responses/compact` secara asli ke hulu Codex, mempertahankan kompatibilitas Claude Code tanpa menghapus akhiran `/compact` (#457)### 🐛 Bug Fixes

-**fix(combos)**: Skema Zod (`updateComboSchema` dan `createComboSchema`) kini menyertakan `system_message`, `tool_filter_regex`, dan `context_cache_protection`. Memperbaiki bug di mana pengaturan khusus agen yang dibuat melalui dasbor secara diam-diam dibuang oleh lapisan validasi backend (#458) -**fix(mitm)**: Profil Kiro MITM mogok di Windows diperbaiki — `node-machine-id` gagal karena env `REG.exe` hilang, dan fallback menimbulkan kesalahan `crypto is not defined` yang fatal. Penggantian sekarang mengimpor kripto dengan aman dan benar (#456)---

## [2.7.8] — 2026-03-18

> Sprint: Bug penghematan anggaran + fitur agen kombo UI + perbaikan keamanan tag omniModel.### 🐛 Bug Fixes

-**fix(budget)**: "Batas Penyimpanan" tidak lagi menghasilkan 422 — `warningThreshold` sekarang dikirim dengan benar sebagai pecahan (0–1) dan bukan persentase (0–100) (#451) -**fix(combos)**: `<omniModel>` tag cache internal sekarang dihapus sebelum meneruskan permintaan ke penyedia, mencegah jeda sesi cache (#454)### Fitur

-**feat(combos)**: Bagian Fitur Agen ditambahkan ke modal buat/edit kombo — mengekspos `system_message` override, `tool_filter_regex`, dan `context_cache_protection` langsung dari dasbor (#454)---

## [2.7.7] — 2026-03-18

> Sprint: Docker pino crash, perbaikan pekerja respons Codex CLI, sinkronisasi kunci paket.### 🐛 Bug Fixes

-**fix(buruh pelabuhan)**: `pino-abstract-transport` dan `pino-pretty` sekarang disalin secara eksplisit di tahap runner Docker — Jejak mandiri Next.js melewatkan deps rekan ini, menyebabkan `Tidak dapat menemukan modul pino-abstract-transport` mogok saat startup (#449) -**fix(responses)**: Hapus `initTranslators()` dari rute `/v1/responses` — membuat pekerja Next.js mogok dengan `pekerja telah keluar` uncaughtException pada permintaan Codex CLI (#450)### 🔧 Maintenance

-**tugas(deps)**: `package-lock.json` sekarang dikomit pada setiap versi tambahan untuk memastikan Docker `npm ci` menggunakan versi ketergantungan yang tepat---

## [2.7.5] — 2026-03-18

> Sprint: peningkatan UX dan perbaikan pemeriksaan kesehatan Windows CLI.### 🐛 Bug Fixes

-**fix(ux)**: Tampilkan petunjuk kata sandi default di halaman login — pengguna baru sekarang melihat `"Kata sandi default: 123456"` di bawah masukan kata sandi (#437) -**fix(cli)**: Claude CLI dan alat lain yang terinstal npm sekarang terdeteksi dengan benar sebagai dapat dijalankan di Windows — spawn menggunakan `shell:true` untuk menyelesaikan wrapper `.cmd` melalui PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: Dasbor Alat Pencarian, perbaikan i18n, batas Copilot, perbaikan validasi Serper.### Fitur

-**feat(pencarian)**: Tambahkan Search Playground (titik akhir ke-10), halaman Alat Pencarian dengan Penyedia Bandingkan/Pipa Pemeringkatan Ulang/Riwayat Penelusuran, perutean pemeringkatan lokal, penjaga autentikasi pada API pencarian (#443 oleh @Regis-RCR)

- Rute baru: `/dashboard/search-tools`
- Entri sidebar di bawah bagian Debug
- `GET /api/search/providers` dan `GET /api/search/stats` dengan penjaga autentikasi
- Perutean node_penyedia lokal untuk `/v1/rerank`
- 30+ kunci i18n di namespace pencarian### 🐛 Bug Fixes

-**perbaiki(pencarian)**: Perbaiki normalizer berita Brave (mengembalikan 0 hasil), terapkan pemotongan max_results pasca-normalisasi, perbaiki URL pengambilan halaman Endpoint (#443 oleh @Regis-RCR) -**fix(analytics)**: Melokalkan label hari/tanggal analisis — ganti string Portugis yang dikodekan secara hardcode dengan `Intl.DateTimeFormat(locale)` (#444 oleh @hijak) -**fix(copilot)**: Memperbaiki tampilan jenis akun GitHub Copilot, memfilter baris kuota tak terbatas yang menyesatkan dari dasbor batas (#445 oleh @hijak) -**perbaikan(penyedia)**: Berhenti menolak kunci API Serper yang valid — perlakukan respons non-4xx sebagai autentikasi yang valid (#446 oleh @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: Perbaikan penggantian kuota API langsung Codex.### 🐛 Bug Fixes

-**fix(codex)**: Blokir akun yang habis mingguan di fallback API langsung (#440)

- pencocokan awalan `resolveQuotaWindow()`: `"weekly"` sekarang cocok dengan kunci cache `"weekly (7d)"`
- `applyCodexWindowPolicy()` menerapkan peralihan `useWeekly`/`use5h` dengan benar
- 4 tes regresi baru (total 766)---

## [2.7.2] — 2026-03-18

> Sprint: Perbaikan kontras UI mode ringan.### 🐛 Bug Fixes

-**fix(logs)**: Memperbaiki kontras mode cahaya di tombol filter log permintaan dan lencana kombo (#378)

- Tombol filter Error/Success/Combo kini dapat dibaca dalam mode ringan
- Lencana baris kombo menggunakan warna ungu yang lebih kuat dalam mode terang---

## [2.7.1] — 2026-03-17

> Sprint: Perutean pencarian web terpadu (POST /v1/search) dengan 5 penyedia + perbaikan keamanan Next.js 16.1.7 (6 CVE).### ✨ New Features

-**feat(search)**: Perutean pencarian web terpadu — `POST /v1/search` dengan 5 penyedia (Serper, Brave, Perplexity, Exa, Tavily)

- Failover otomatis di seluruh penyedia, 6.500+ pencarian gratis/bulan
- Cache dalam memori dengan penggabungan permintaan (TTL yang dapat dikonfigurasi)
- Dasbor: Tab Analisis Penelusuran di `/dasbor/analytics` dengan perincian penyedia, tingkat cache hit, pelacakan biaya
- API baru: `GET /api/v1/search/analytics` untuk statistik permintaan pencarian
- Migrasi DB: kolom `request_type` pada `call_logs` untuk pelacakan permintaan non-obrolan
- Validasi Zod (`v1SearchSchema`), auth-gated, biaya dicatat melalui `recordCost()`### Keamanan

-**deps**: Next.js 16.1.6 → 16.1.7 — memperbaiki 6 CVE: -**Critical**: CVE-2026-29057 (HTTP request smuggling via http-proxy) -**Tinggi**: CVE-2026-27977, CVE-2026-27978 (Tindakan WebSocket + Server) -**Sedang**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Berkas                                                           | Tujuan                                            |
| ---------------------------------------------------------------- | ------------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Penangan pencarian dengan perutean 5 penyedia     |
| `open-sse/config/searchRegistry.ts`                              | Registri penyedia (auth, biaya, kuota, TTL)       |
| `open-sse/services/searchCache.ts`                               | Cache dalam memori dengan penggabungan permintaan |
| `src/app/api/v1/search/route.ts`                                 | Rute Next.js (POST + GET)                         |
| `src/app/api/v1/search/analytics/route.ts`                       | API statistik penelusuran                         |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Tab dasbor analitik                               |
| `src/lib/db/migrasi/007_search_request_type.sql`                 | Migrasi DB                                        |
| `tes/unit/pencarian-registry.test.mjs`                           | 277 baris pengujian unit                          | --- |

## [2.7.0] — 2026-03-17

> Sprint: Fitur yang terinspirasi dari ClawRouter — toolCalling flag, deteksi maksud multibahasa, fallback berbasis benchmark, deduplikasi permintaan, RouterStrategy yang dapat dicolokkan, harga Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5.### ✨ New Models & Pricing

-**feat(harga)**: xAI Grok-4 Fast — `$0,20/$0,50 per 1 juta token`, latensi p50 1143ms, panggilan alat didukung -**feat(harga)**: xAI Grok-4 (standar) — `$0,20/$1,50 per 1 juta token`, dengan alasan unggulan -**feat(harga)**: GLM-5 melalui Z.AI — `$0,5/1M`, konteks keluaran 128 ribu -**feat(harga)**: MiniMax M2.5 — `$0,30/1 juta input`, penalaran + tugas agen -**feat(harga)**: DeepSeek V3.2 — harga diperbarui `$0,27/$1,10 per 1 juta` -**prestasi(harga)**: Kimi K2.5 melalui Moonshot API — akses langsung Moonshot API -**feat(penyedia)**: Penyedia Z.AI ditambahkan (`zai` alias) — rangkaian GLM-5 dengan output 128K### 🧠 Routing Intelligence

-**feat(registry)**: tanda `toolCalling` per model di registri penyedia — kombo kini dapat memilih/memerlukan model yang mampu memanggil alat -**feat(scoring)**: Deteksi niat multibahasa untuk penilaian AutoCombo — skrip/pola bahasa PT/ZH/ES/AR memengaruhi pemilihan model per konteks permintaan -**feat(fallback)**: Rantai fallback berbasis benchmark — data latensi nyata (p50 dari `comboMetrics`) digunakan untuk mengurutkan ulang prioritas fallback secara dinamis -**feat(dedup)**: Meminta deduplikasi melalui content-hash — jendela idempotensi 5 detik mencegah panggilan penyedia duplikat mencoba ulang klien -**feat(router)**: Antarmuka `RouterStrategy` yang dapat dicolokkan di `autoCombo/routerStrategy.ts` — logika perutean khusus dapat dimasukkan tanpa memodifikasi inti### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 skema alat canggih baru: `omniroute_get_provider_metrics` (p50/p95/p99 per penyedia) dan `omniroute_explain_route` (penjelasan keputusan perutean) -**feat(mcp)**: cakupan autentikasi alat MCP diperbarui — cakupan `metrik:baca` ditambahkan untuk alat metrik penyedia -**feat(mcp)**: `omniroute_best_combo_for_task` sekarang menerima parameter `lingualHint` untuk perutean multibahasa### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` diperluas dengan pelacakan persentil latensi real-time per penyedia/akun -**feat(health)**: Health API (`/api/monitoring/health`) kini mengembalikan kolom `p50Latency` dan `errorRate` per penyedia -**feat(usage)**: Migrasi riwayat penggunaan untuk pelacakan latensi per model### 🗄️ DB Migrations

-**prestasi(migrasi)**: Kolom baru `latency_p50` di tabel `combo_metrics` — tidak ada habisnya, aman bagi pengguna yang sudah ada### 🐛 Bug Fixes / Closures

-**close(#411)**: resolusi modul hash sqlite3 yang lebih baik di Windows — diperbaiki di v2.6.10 (f02c5b5) -**close(#409)**: Penyelesaian obrolan GitHub Copilot gagal dengan model Claude ketika file dilampirkan — diperbaiki di v2.6.9 (838f1d6) -**close(#405)**: Duplikat #411 — terselesaikan## [2.6.10] — 2026-03-17

> Perbaikan Windows: unduhan bawaan sqlite3 yang lebih baik tanpa node-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: Di Windows, `npm install -g omniroute` biasanya gagal dengan `better_sqlite3.node bukan aplikasi Win32 yang valid` karena biner asli yang dibundel dikompilasi untuk Linux. Menambahkan**Strategi 1.5**ke `scripts/postinstall.mjs`: menggunakan `@mapbox/node-pre-gyp install --fallback-to-build=false` (dipaketkan dalam `better-sqlite3`) untuk mengunduh biner bawaan yang benar untuk OS/arch saat ini tanpa memerlukan alat pembangunan apa pun (tanpa node-gyp, tanpa Python, tanpa MSVC). Kembali ke `npm rebuild` hanya jika pengunduhan gagal. Menambahkan pesan kesalahan khusus platform dengan instruksi perbaikan manual yang jelas.---

## [2.6.9] — 2026-03-17

> Perbaikan CI (t11 anggaran apa pun), perbaikan bug #409 (lampiran file melalui Copilot+Claude), rilis koreksi alur kerja.### 🐛 Bug Fixes

-**fix(ci)**: Hapus kata "any" dari komentar di `openai-responses.ts` dan `chatCore.ts` yang gagal dalam pemeriksaan anggaran t11 `any` (positif palsu dari komentar penghitungan regex) -**fix(chatCore)**: Menormalkan tipe bagian konten yang tidak didukung sebelum meneruskan ke penyedia (#409 — Kursor mengirimkan `{type:"file"}` ketika file `.md` dilampirkan; Copilot dan penyedia kompatibel OpenAI lainnya menolak dengan "tipe harus berupa 'image_url' atau 'text'"; fix mengonversi blok `file`/`document` menjadi `text` dan menghapus tipe yang tidak diketahui)### 🔧 Workflow

-**tugas(hasilkan-rilis)**: Tambahkan ATOMIC COMMIT RULE — perubahan versi (`npm version patch`) HARUS terjadi sebelum melakukan file fitur untuk memastikan tag selalu mengarah ke komit yang berisi semua perubahan versi secara bersamaan---

## [2.6.8] — 2026-03-17

> Sprint: Kombo sebagai Agen (prompt sistem + filter alat), Perlindungan Caching Konteks, Pembaruan Otomatis, Log Terperinci, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ALTER TABLE kombo ADD COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: Tabel `request_detail_logs` baru dengan pemicu ring-buffer 500 entri, ikut serta melalui pengaturan beralih### Fitur

-**feat(combo)**: System Message Override per Combo (#399 — kolom `system_message` menggantikan atau memasukkan perintah sistem sebelum meneruskan ke penyedia) -**feat(combo)**: Tool Filter Regex per Combo (#399 — `tool_filter_regex` hanya menyimpan pola alat yang cocok; mendukung format OpenAI + Anthropic) -**feat(combo)**: Perlindungan Caching Konteks (#401 — respons tag `context_cache_protection` dengan `<omniModel>penyedia/model</omniModel>` dan model pin untuk kontinuitas sesi) -**feat(settings)**: Pembaruan Otomatis melalui Pengaturan (#320 — `GET /api/system/version` + `POST /api/system/update` — memeriksa registri npm dan pembaruan di latar belakang dengan restart pm2) -**feat(logs)**: Log Permintaan Terperinci (#378 — menangkap seluruh isi pipeline dalam 4 tahap: permintaan klien, permintaan yang diterjemahkan, respons penyedia, respons klien — tombol opt-in, trim 64KB, ring-buffer 500 entri) -**feat(mitm)**: Profil MITM Kiro IDE (#336 — `src/mitm/targets/kiro.ts` menargetkan api.anthropic.com, menggunakan kembali infrastruktur MITM yang ada)---

## [2.6.7] — 2026-03-17

> Sprint: Peningkatan SSE, ekstensi provider_nodes lokal, registri proxy, perbaikan passthrough Claude.### Fitur

-**feat(health)**: Pemeriksaan kesehatan latar belakang untuk `provider_nodes` lokal dengan backoff eksponensial (30d→300s) dan `Promise.allSettled` untuk menghindari pemblokiran (#423, @Regis-RCR) -**feat(embeddings)**: Rutekan `/v1/embeddings` ke `provider_nodes` lokal — `buildDynamicEmbeddingProvider()` dengan validasi nama host (#422, @Regis-RCR) -**feat(audio)**: Rutekan TTS/STT ke `provider_nodes` lokal — `buildDynamicAudioProvider()` dengan perlindungan SSRF (#416, @Regis-RCR) -**feat(proxy)**: Registri proxy, API pengelolaan, dan generalisasi batas kuota (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Hapus kolom khusus Claude (`metadata`, `anthropic_version`) ketika targetnya kompatibel dengan OpenAI (#421, @prakersh) -**fix(sse)**: Ekstrak penggunaan Claude SSE (`input_tokens`, `output_tokens`, token cache) dalam mode aliran passthrough (#420, @prakersh) -**fix(sse)**: Menghasilkan `call_id` cadangan untuk panggilan alat dengan ID yang hilang/kosong (#419, @prakersh) -**fix(sse)**: Passthrough Claude-to-Claude — badan depan sama sekali tidak tersentuh, tidak ada terjemahan ulang (#418, @prakersh) -**fix(sse)**: Filter item `tool_result` yang tidak ada lagi setelah pemadatan konteks Kode Claude untuk menghindari 400 kesalahan (#417, @prakersh) -**fix(sse)**: Lewati panggilan alat dengan nama kosong di penerjemah Responses API untuk mencegah pengulangan tak terbatas `placeholder_tool` (#415, @prakersh) -**fix(sse)**: Hapus blok konten teks kosong sebelum terjemahan (#427, @prakersh) -**fix(api)**: Tambahkan `refreshable: true` ke konfigurasi pengujian Claude OAuth (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` dan devDependencies terkait (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Perbaikan terbaru: Kompatibilitas Turbopack/Docker — menghapus protokol `node:` dari semua impor `src/`.### 🐛 Bug Fixes

-**fix(build)**: Menghapus awalan protokol `node:` dari pernyataan `import` dalam 17 file di bawah `src/`. Impor `node:fs`, `node:path`, `node:url`, `node:os` dll. menyebabkan `file Ecmascript mengalami kesalahan` pada build Turbopack (Next.js 15 Docker) dan pada peningkatan dari instalasi global npm yang lebih lama. File yang terpengaruh: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts`, dan 12 lainnya di `src/app/api/` dan `src/lib/`. -**tugas(alur kerja)**: Memperbarui `generate-release.md` untuk membuat sinkronisasi Docker Hub dan penerapan dual-VPS**langkah wajib**di setiap rilis.---

## [2.6.5] — 2026-03-17

> Sprint: pemfilteran param model penalaran, perbaikan 404 penyedia lokal, penyedia Kilo Gateway, gangguan ketergantungan.### ✨ New Features

-**feat(api)**: Menambahkan**Kilo Gateway**(`api.kilo.ai`) sebagai penyedia Kunci API baru (alias `kg`) — 335+ model, 6 model gratis, 3 model perutean otomatis (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Model passthrough didukung melalui titik akhir `/api/gateway/models`. (PR #408 oleh @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Hapus parameter yang tidak didukung untuk model penalaran (o1, o1-mini, o1-pro, o3, o3-mini). Model dalam kelompok `o1`/`o3` menolak `temperature`, `top_p`, `frekuensi_penalty`, `presence_penalty`, `logprobs`, `top_logprobs`, dan `n` dengan HTTP 400. Parameter kini dihapus di lapisan `chatCore` sebelum meneruskan. Menggunakan bidang deklaratif `unsupportedParams` per model dan Peta O(1) yang telah dihitung sebelumnya untuk pencarian. (PR #412 oleh @Regis-RCR) -**fix(sse)**: Penyedia lokal 404 kini menghasilkan**penguncian khusus model (5 detik)**dan bukan penguncian tingkat koneksi (2 menit). Ketika backend inferensi lokal (Ollama, LM Studio, oMLX) mengembalikan 404 untuk model yang tidak diketahui, koneksi tetap aktif dan model lain langsung berfungsi. Juga memperbaiki bug yang sudah ada di mana `model` tidak diteruskan ke `markAccountUnavailable()`. Penyedia lokal terdeteksi melalui nama host (`localhost`, `127.0.0.1`, `::1`, dapat diperluas melalui `LOCAL_HOSTNAMES` env var). (PR #410 oleh @Regis-RCR)### 📦 Dependencies

- `lebih baik-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `basis agen` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(penyedia)**: Menghapus nama model yang tidak ada di 5 penyedia: -**gemini / gemini-cli**: menghapus `gemini-3.1-pro/flash` dan `gemini-3-*-preview` (tidak ada di Google API v1beta); diganti dengan `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**antigravitasi**: menghapus `gemini-3.1-pro-high/low` dan `gemini-3-flash` (alias internal tidak valid); diganti dengan model 2.x asli -**github (Copilot)**: menghapus `gemini-3-flash-preview` dan `gemini-3-pro-preview`; diganti dengan `gemini-2.5-flash` -**nvidia**: memperbaiki `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM menggunakan namespace `meta/` untuk model Meta); menambahkan `nvidia/llama-3.1-70b-instruct` dan `nvidia/llama-3.1-405b-instruct` -**fix(db/combo)**: Kombo `free-stack` yang diperbarui pada DB jarak jauh: menghapus `qw/qwen3-coder-plus` (token penyegaran kedaluwarsa), memperbaiki `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct`, memperbaiki `gemini/gemini-3.1-flash` → `gemini/gemini-2.5-flash`, ditambahkan `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint: hash-strip zod/pino dimasukkan ke dalam pipeline build, penyedia Sintetis ditambahkan, jalur VPS PM2 diperbaiki.### 🐛 Bug Fixes

-**fix(build)**: Hash-strip Turbopack sekarang berjalan pada**waktu kompilasi**untuk SEMUA paket — bukan hanya `better-sqlite3`. Langkah 5.6 di `prepublish.mjs` menelusuri setiap `.js` di `app/.next/server/` dan menghapus akhiran hex 16 karakter dari `require()` yang di-hash. Memperbaiki `zod-dcb22c...`, `pino-...`, dll. MODULE_NOT_FOUND pada instalasi npm global. Menutup #398 -**fix(deploy)**: PM2 di kedua VPS menunjuk ke direktori git-clone yang sudah basi. Dikonfigurasi ulang ke `app/server.js` dalam paket global npm. Alur kerja `/deploy-vps` diperbarui untuk menggunakan `npm pack + scp` (registrasi npm menolak paket 299MB).### Fitur

-**feat(provider)**: Sintetis ([synthetic.new](https://synthetic.new)) — inferensi kompatibel OpenAI yang berfokus pada privasi. `passthroughModels: true` untuk katalog model HuggingFace yang dinamis. Model awal: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 oleh @Regis-RCR)### 📋 Issues Closed

-**close #398**: regresi hash npm — diperbaiki oleh hash-strip waktu kompilasi di pra-publikasi -**triage #324**: Tangkapan layar bug tanpa langkah — meminta detail reproduksi---

## [2.6.2] — 2026-03-16

> Sprint: hashing modul telah diperbaiki sepenuhnya, 2 PR digabungkan (Filter alat antropik + jalur titik akhir khusus), penyedia Alibaba Cloud DashScope ditambahkan, 3 masalah lama ditutup.### 🐛 Bug Fixes

-**fix(build)**: Hash-strip `externals` webpack yang diperluas untuk mencakup SEMUA `serverExternalPackages`, bukan hanya `better-sqlite3`. Next.js 16 Turbopack hash `zod`, `pino`, dan setiap paket eksternal server lainnya menjadi nama seperti `zod-dcb22c6336e0bc69` yang tidak ada di `node_modules` saat runtime. Regex catch-all HASH_PATTERN sekarang menghapus akhiran 16 karakter dan kembali ke nama paket dasar. Juga menambahkan `NEXT_PRIVATE_BUILD_WORKER=0` di `prepublish.mjs` untuk memperkuat mode webpack, ditambah pemindaian pasca-pembuatan yang melaporkan sisa referensi hash. (#396, #398, PR #403) -**fix(chat)**: Nama alat berformat antropik (`tool.name` tanpa pembungkus `.function`) dihilangkan secara diam-diam oleh filter nama kosong yang diperkenalkan di #346. Permintaan proxy LiteLLM dengan awalan `anthropic/` dalam format API Pesan Anthropic, menyebabkan semua alat difilter dan Anthropic mengembalikan `400: tool_choice.any hanya dapat ditentukan saat menyediakan alat`. Diperbaiki dengan kembali ke `tool.name` ketika `tool.function.name` tidak ada. Menambahkan 8 pengujian unit regresi. (PR #397)### Fitur

-**feat(api)**: Jalur endpoint khusus untuk node penyedia yang kompatibel dengan OpenAI — konfigurasikan `chatPath` dan `modelsPath` per node (misalnya `/v4/chat/completions`) di UI koneksi penyedia. Termasuk migrasi DB (`003_provider_node_custom_paths.sql`) dan sanitasi jalur URL (tidak ada traversal `..`, harus dimulai dengan `/`). (PR#400) -**feat(penyedia)**: Alibaba Cloud DashScope ditambahkan sebagai penyedia yang kompatibel dengan OpenAI. Titik akhir internasional: `dashscope-intl.aliyuncs.com/compatibel-mode/v1`. 12 model: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Otentikasi: Kunci API pembawa.### 📋 Issues Closed

-**close #323**: Kesalahan koneksi Cline `[Objek Objek]` — diperbaiki di v2.3.7; menginstruksikan pengguna untuk meningkatkan dari v2.2.9 -**close #337**: Pelacakan kredit Kiro — diterapkan di v2.5.5 (#381); mengarahkan pengguna ke Dasbor → Penggunaan -**triage #402**: ARM64 macOS DMG rusak — meminta versi macOS, kesalahan sebenarnya, dan menyarankan solusi `xattr -d com.apple.quarantine`---

## [2.6.1] — 2026-03-15

> Perbaikan startup penting: instalasi npm global v2.6.0 mogok dengan kesalahan 500 karena bug hashing nama modul Turbopack/webpack di kait instrumentasi Next.js 16.### 🐛 Bug Fixes

-**fix(build)**: Memaksa `better-sqlite3` untuk selalu diwajibkan dengan nama paket persisnya di bundel server webpack. Next.js 16 mengkompilasi hook instrumentasi ke dalam potongan terpisah dan mengeluarkan `require('better-sqlite3-<hash>')` — nama modul yang di-hash yang tidak ada di `node_modules` — meskipun paket tersebut terdaftar di `serverExternalPackages`. Menambahkan fungsi `eksternal` eksplisit ke konfigurasi webpack server sehingga bundler selalu mengeluarkan `require('better-sqlite3')`, menyelesaikan startup `500 Internal Server Error` pada instalasi global yang bersih. (#394, PR #395)### 🔧 CI

-**ci**: Menambahkan `workflow_dispatch` ke `npm-publish.yml` dengan perlindungan sinkronisasi versi untuk pemicu manual (#392) -**ci**: Menambahkan `workflow_dispatch` ke `docker-publish.yml`, memperbarui Aksi GitHub ke versi terbaru (#392)---

## [2.6.0] - 2026-03-15

> Sprint resolusi masalah: 4 bug diperbaiki, log UX ditingkatkan, pelacakan kredit Kiro ditambahkan.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI dan SD WebUI tidak lagi muncul di daftar penyedia halaman Media ketika tidak dikonfigurasi — mengambil `/api/providers` saat dipasang dan menyembunyikan penyedia lokal yang tidak memiliki koneksi (#390) -**fix(auth)**: Round-robin tidak lagi memilih ulang akun dengan tarif terbatas segera setelah cooldown — `backoffLevel` sekarang digunakan sebagai kunci pengurutan utama dalam rotasi LRU (#340) -**fix(oauth)**: Qoder (dan penyedia lain yang mengalihkan ke UI mereka sendiri) tidak lagi membiarkan modal OAuth tertahan di "Menunggu Otorisasi" — detektor tertutup popup melakukan transisi otomatis ke mode masukan URL manual (#344) -**fix(logs)**: Tabel log permintaan sekarang dapat dibaca dalam mode terang — lencana status, jumlah token, dan tag kombo menggunakan kelas warna `gelap:` adaptif (#378)### Fitur

-**feat(kiro)**: Pelacakan kredit Kiro ditambahkan ke pengambil penggunaan — kueri `getUserCredits` dari titik akhir AWS CodeWhisperer (#337)### 🛠 Chores

-**tugas(tes)**: Menyelaraskan `test:plan3`, `test:fixes`, `test:security` untuk menggunakan loader `tsx/esm` yang sama dengan `npm test` — menghilangkan resolusi modul negatif palsu dalam proses yang ditargetkan (PR #386)---

## [2.5.9] - 2026-03-15

> Perbaikan passthrough asli Codex + pengerasan validasi badan rute.### 🐛 Bug Fixes

-**fix(codex)**: Mempertahankan passthrough API Responses asli untuk klien Codex — menghindari mutasi terjemahan yang tidak perlu (PR #387) -**fix(api)**: Validasi badan permintaan pada rute penetapan harga/sinkronisasi dan perutean tugas — mencegah error dari input yang salah (PR #388) -**fix(auth)**: Rahasia JWT tetap ada saat restart melalui `src/lib/db/secrets.ts` — menghilangkan kesalahan 401 setelah pm2 restart (PR #388)---

## [2.5.8] - 2026-03-15

> Perbaikan versi: pulihkan konektivitas VPS yang rusak karena publikasi v2.5.7 yang tidak lengkap.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` masih menggunakan tanda `--webpack` yang tidak digunakan lagi sehingga menyebabkan build mandiri Next.js gagal secara diam-diam — npm publikasi selesai tanpa `app/server.js`, sehingga mengganggu penerapan VPS---

## [2.5.7] - 2026-03-15

> Perbaikan penanganan kesalahan taman bermain media.### 🐛 Bug Fixes

-**fix(media)**: Transkripsi "Kunci API Diperlukan" positif palsu ketika audio tidak berisi ucapan (musik, senyap) — kini menampilkan "Tidak ada ucapan terdeteksi" -**fix(media)**: `upstreamErrorResponse` di `audioTranscription.ts` dan `audioSpeech.ts` kini mengembalikan JSON yang tepat (`{error:{message}}`), memungkinkan deteksi kesalahan kredensial 401/403 yang benar di MediaPageClient -**fix(media)**: `parseApiError` sekarang menangani kolom `err_msg` Deepgram dan mendeteksi `"api key"` dalam pesan kesalahan untuk klasifikasi kesalahan kredensial yang akurat---

## [2.5.6] - 2026-03-15

> Perbaikan keamanan/auth penting: Antigravity OAuth rusak + sesi JWT hilang setelah restart.### 🐛 Bug Fixes

-**fix(oauth) #384**: Google OAuth Antigravitasi kini mengirimkan `client_secret` dengan benar ke titik akhir token. Penggantian untuk `ANTIGRAVITY_OAUTH_CLIENT_SECRET` adalah string kosong, yang salah — jadi `client_secret` tidak pernah disertakan dalam permintaan, menyebabkan kesalahan `"client_secret hilang"` untuk semua pengguna tanpa env var khusus. Menutup #383. -**fix(auth) #385**: `JWT_SECRET` sekarang disimpan ke SQLite (`namespace='secrets'`) pada generasi pertama dan dimuat ulang pada permulaan berikutnya. Sebelumnya, rahasia acak baru dibuat setiap proses dimulai, membuat semua cookie/sesi yang ada menjadi tidak valid setelah memulai ulang atau meningkatkan apa pun. Mempengaruhi `JWT_SECRET` dan `API_KEY_SECRET`. Menutup #382.---

## [2.5.5] - 2026-03-15

> Perbaikan dedup daftar model, pengerasan build mandiri elektron, dan pelacakan kredit Kiro.### 🐛 Bug Fixes

-**fix(models) #380**: `GET /api/models` sekarang menyertakan alias penyedia saat membuat filter penyedia aktif — model untuk `claude` (alias `cc`) dan `github` (alias `gh`) selalu ditampilkan terlepas dari apakah koneksi dikonfigurasi, karena kunci `PROVIDER_MODELS` adalah alias tetapi koneksi DB disimpan di bawah ID penyedia. Diperbaiki dengan memperluas setiap ID penyedia aktif untuk menyertakan aliasnya melalui `PROVIDER_ID_TO_ALIAS`. Menutup #353. -**fix(electron) #379**: `scripts/prepare-electron-standalone.mjs` baru menampilkan bundel `/.next/electron-standalone` khusus sebelum pengemasan Electron. Dibatalkan dengan kesalahan yang jelas jika `node_modules` adalah symlink (pembuat elektron akan mengirimkan ketergantungan runtime pada mesin build). Sanitasi jalur lintas platform melalui `path.basename`. Oleh @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Pelacakan saldo kredit Kiro — titik akhir penggunaan kini mengembalikan data kredit untuk akun Kiro dengan menelepon `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (titik akhir yang sama yang digunakan IDE Kiro secara internal). Mengembalikan sisa kredit, total tunjangan, tanggal perpanjangan, dan tingkat berlangganan. Menutup #337.## [2.5.4] - 2026-03-15

> Perbaikan startup logger, perbaikan keamanan bootstrap login, dan peningkatan keandalan dev HMR. Infrastruktur CI diperkeras.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Memulihkan jalur logger transport pino — `formatters.level` dikombinasikan dengan `transport.targets` ditolak oleh pino. Transport-backed configs now strip the level formatter via `getTransportCompatibleConfig()`. Juga mengoreksi pemetaan tingkat numerik di `/api/logs/console`: `30→info, 40→warn, 50→error` (digeser satu). -**fix(login) #375**: Halaman login sekarang di-bootstrap dari endpoint `/api/settings/require-login` publik, bukan `/api/settings` yang dilindungi. Dalam pengaturan yang dilindungi kata sandi, halaman pra-autentikasi menerima 401 dan kembali ke default aman jika tidak perlu. Rute publik sekarang mengembalikan semua metadata bootstrap (`requireLogin`, `hasPassword`, `setupComplete`) dengan 200 fallback konservatif pada kesalahan. -**fix(dev) #374**: Tambahkan `localhost` dan `127.0.0.1` ke `allowedDevOrigins` di `next.config.mjs` — soket web HMR diblokir saat mengakses aplikasi melalui alamat loopback, sehingga menghasilkan peringatan lintas asal yang berulang.### 🔧 CI & Infrastructure

-**Perbaikan ESLint OOM**: `eslint.config.mjs` sekarang mengabaikan `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**`, dan `clipr/**` — ESLint mogok dengan JS heap OOM dengan memindai gumpalan biner VS Code dan potongan yang dikompilasi. -**Perbaikan pengujian unit**: Menghapus `ALTER TABLE provider_connections ADD COLUMN "group"` yang basi dari 2 file pengujian — kolom sekarang menjadi bagian dari skema dasar (ditambahkan di #373), menyebabkan `SQLITE_ERROR: nama kolom duplikat` pada setiap proses CI. -**Pre-commit hook**: Menambahkan `npm run test:unit` ke `.husky/pre-commit` — pengujian unit kini memblokir commit yang rusak sebelum mencapai CI.## [2.5.3] - 2026-03-14

> Perbaikan bug penting: migrasi skema DB, pemuatan env startup, pembersihan status kesalahan penyedia, dan perbaikan tooltip i18n. Peningkatan kualitas kode di atas setiap PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Tambahkan kolom `provider_connections.group` ke skema dasar + migrasi pengisian ulang untuk database yang ada — kolom digunakan di semua kueri tetapi tidak ada dalam definisi skema -**fix(i18n) #371**: Ganti kunci `t("deleteConnection")` yang tidak ada dengan kunci `providers.delete` yang ada — memperbaiki `MISSING_MESSAGE: kesalahan runtime penyedia.deleteConnection` pada halaman detail penyedia -**fix(auth) #372**: Hapus metadata kesalahan lama (`errorCode`, `lastErrorType`, `lastErrorSource`) dari akun penyedia setelah pemulihan asli — sebelumnya, akun yang dipulihkan terus muncul sebagai gagal -**fix(startup) #369**: Menyatukan pemuatan env di `npm run start`, `run-standalone.mjs`, dan Electron untuk menghormati prioritas `DATA_DIR/.env → ~/.omniroute/.env → ./.env` — mencegah pembuatan `STORAGE_ENCRYPTION_KEY` baru melalui database terenkripsi yang sudah ada### 🔧 Code Quality

- Pola `result.success` vs `response?.ok` yang terdokumentasi di `auth.ts` (keduanya disengaja, sekarang dijelaskan)
- `overridePath?.trim()` yang dinormalisasi di `electron/main.js` agar cocok dengan `bootstrap-env.mjs`
- Menambahkan komentar pesanan penggabungan `preferredEnv` di startup Electron

> Kebijakan kuota akun Codex dengan rotasi otomatis, peralihan tingkat cepat, model gpt-5.4, dan perbaikan label analitik.### ✨ New Features (PRs #366, #367, #368)

-**Kebijakan Kuota Codex (PR #366)**: Jendela kuota 5 jam/mingguan per akun diaktifkan di dasbor Penyedia. Akun secara otomatis dilewati ketika jendela yang diaktifkan mencapai ambang batas 90% dan diterima kembali setelah `resetAt`. Termasuk `quotaCache.ts` dengan pengambil status bebas efek samping. -**Pengalih Tingkat Cepat Codex (PR #367)**: Dasbor → Pengaturan → Tingkat Layanan Codex. Pengalih default-off memasukkan `service_tier: "flex"` hanya untuk permintaan Codex, sehingga mengurangi biaya ~80%. Tumpukan penuh: tab UI + titik akhir API + pelaksana + penerjemah + pemulihan startup. -**gpt-5.4 Model (PR #368)**: Menambahkan `cx/gpt-5.4` dan `codex/gpt-5.4` ke registri model Codex. Termasuk uji regresi.### 🐛 Bug Fixes

-**perbaikan #356**: Bagan Analytics (Penyedia Teratas, Berdasarkan Akun, Perincian Penyedia) kini menampilkan nama/label penyedia yang dapat dibaca manusia, bukan ID internal mentah untuk penyedia yang kompatibel dengan OpenAI.

> Rilis besar: strategi perutean acak ketat, kontrol akses kunci API, grup koneksi, sinkronisasi harga eksternal, dan perbaikan bug penting untuk model pemikiran, pengujian kombo, dan validasi nama alat.### ✨ New Features (PRs #363 & #365)

-**Strategi Perutean Acak Ketat**: Dek acak Fisher-Yates dengan jaminan anti-pengulangan dan serialisasi mutex untuk permintaan bersamaan. Dek independen per kombo dan per penyedia. -**Kontrol Akses Kunci API**: `allowedConnections` (membatasi koneksi mana yang dapat digunakan oleh kunci), `is_active` (mengaktifkan/menonaktifkan kunci dengan 403), `accessSchedule` (kontrol akses berbasis waktu), tombol `autoResolve`, mengganti nama kunci melalui PATCH. -**Grup Koneksi**: Mengelompokkan koneksi penyedia berdasarkan lingkungan. Tampilan akordeon di halaman Batas dengan persistensi Penyimpanan lokal dan peralihan otomatis cerdas. -**Sinkronisasi Harga Eksternal (LiteLLM)**: resolusi harga 3 tingkat (penggantian pengguna → disinkronkan → default). Ikut serta melalui `PRICING_SYNC_ENABLED=true`. Alat MCP `omniroute_sync_pricing`. 23 tes baru. -**i18n**: 30 bahasa diperbarui dengan strategi acak ketat, string manajemen kunci API. pt-BR diterjemahkan sepenuhnya.### 🐛 Bug Fixes

-**perbaikan #355**: Waktu tunggu streaming meningkat dari 60 detik menjadi 300 detik — mencegah pembatalan model dengan pemikiran luas (claude-opus-4-6, o3, dll.) selama fase penalaran yang panjang. Dapat dikonfigurasi melalui `STREAM_IDLE_TIMEOUT_MS`. -**perbaikan #350**: Uji kombo sekarang melewati `REQUIRE_API_KEY=true` menggunakan header internal, dan menggunakan format yang kompatibel dengan OpenAI secara universal. Batas waktu diperpanjang dari 15 detik menjadi 20 detik. -**fix #346**: Alat dengan `function.name` yang kosong (diteruskan oleh Claude Code) kini difilter sebelum penyedia upstream menerimanya, sehingga mencegah kesalahan "Input[N].name: string kosong" tidak valid.### 🗑️ Closed Issues

-**#341**: Bagian debug dihapus — penggantinya adalah `/dashboard/logs` dan `/dashboard/health`.

> Dukungan API Key Round-Robin untuk pengaturan penyedia multi-kunci, dan konfirmasi perutean wildcard dan jendela kuota sudah ada.### ✨ New Features

-**API Key Round-Robin (T07)**: Koneksi penyedia kini dapat menyimpan beberapa kunci API (Edit Koneksi → Kunci API Ekstra). Permintaan dirotasi secara round-robin antara kunci utama + tambahan melalui `providerSpecificData.extraApiKeys[]`. Kunci disimpan dalam memori yang diindeks per koneksi — tidak diperlukan perubahan skema DB.### 📝 Already Implemented (confirmed in audit)

-**Perutean Model Wildcard (T13)**: `wildcardRouter.ts` dengan pencocokan wildcard gaya glob (`gpt*`, `claude-?-sonnet`, dll.) sudah diintegrasikan ke dalam `model.ts` dengan peringkat kekhususan. -**Quota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` sudah memajukan jendela secara otomatis — jika `Date.now() > entry.until`, kunci akan segera dihapus (tidak ada pemblokiran basi).

> Penyempurnaan UI, penambahan strategi perutean, dan penanganan kesalahan yang baik untuk batas penggunaan.### ✨ New Features

-**Strategi Perutean Isi-Pertama & P2C**: Menambahkan `isi-pertama` (habiskan kuota sebelum melanjutkan) dan `p2c` (pemilihan latensi rendah Kekuatan Dua Pilihan) ke pemilih strategi kombo, dengan panel panduan lengkap dan lencana berkode warna. -**Model Preset Stack Gratis**: Membuat kombo dengan template Free Stack sekarang akan mengisi otomatis 7 model penyedia gratis terbaik di kelasnya (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Pengguna cukup mengaktifkan penyedia dan mendapatkan kombo $0/bulan langsung. -**Modal Kombo Lebih Luas**: Modal kombo Buat/Edit sekarang menggunakan `max-w-4xl` untuk kenyamanan mengedit kombo besar.### 🐛 Bug Fixes

-**Batas halaman HTTP 500 untuk Codex & GitHub**: `getCodexUsage()` dan `getGitHubUsage()` kini menampilkan pesan yang mudah digunakan ketika penyedia mengembalikan 401/403 (token kedaluwarsa), alih-alih memunculkan dan menyebabkan kesalahan 500 pada halaman Batas. -**MaintenanceBanner positif palsu**: Spanduk tidak lagi menampilkan "Server tidak dapat dijangkau" secara palsu saat pemuatan halaman. Diperbaiki dengan memanggil `checkHealth()` segera saat dipasang dan menghapus penutupan `show`-state yang basi. -**Keterangan alat ikon penyedia**: Tombol ikon edit (pensil) dan hapus di baris koneksi penyedia kini memiliki keterangan alat HTML asli — keenam ikon tindakan kini didokumentasikan sendiri.

> Berbagai perbaikan dari analisis masalah komunitas, dukungan penyedia baru, perbaikan bug untuk pelacakan token, perutean model, dan keandalan streaming.### ✨ New Features

-**Perutean Cerdas Sadar Tugas (T05)**: Pemilihan model otomatis berdasarkan jenis konten permintaan — pengkodean → obrolan mendalam, analisis → gemini-2.5-pro, visi → gpt-4o, ringkasan → gemini-2.5-flash. Dapat dikonfigurasi melalui Pengaturan. API `GET/PUT/POST /api/settings/task-routing` baru. -**Penyedia HuggingFace**: Menambahkan Router HuggingFace sebagai penyedia yang kompatibel dengan OpenAI dengan Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Penyedia Vertex AI**: Menambahkan penyedia Vertex AI (Google Cloud) dengan Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude melalui Vertex. -**Unggahan File Taman Bermain**: Unggahan audio untuk transkripsi, unggahan gambar untuk model vision (deteksi otomatis berdasarkan nama model), rendering gambar sebaris untuk hasil pembuatan gambar. -**Masukan Visual Pilihan Model**: Model yang sudah ditambahkan di pemilih kombo kini menampilkan ✓ lencana hijau — mencegah kebingungan duplikat. -**Kompatibilitas Qwen (PR #352)**: Pembaruan pengaturan sidik jari Agen-Pengguna dan CLI untuk kompatibilitas penyedia Qwen. -**Manajemen Status Round-Robin (PR #349)**: Logika round-robin yang ditingkatkan untuk menangani akun yang dikecualikan dan mempertahankan status rotasi dengan benar. -**Clipboard UX (PR #360)**: Operasi clipboard yang diperkeras dengan fallback untuk konteks yang tidak aman; Peningkatan normalisasi alat Claude.### 🐛 Bug Fixes

-**Perbaikan #302 — OpenAI SDK stream=False drop tool_calls**: T01 Menerima negosiasi header tidak lagi memaksa streaming ketika `body.stream` secara eksplisit `false`. Menyebabkan tool_calls dihentikan secara diam-diam saat menggunakan OpenAI Python SDK dalam mode non-streaming. -**Perbaikan #73 — Claude Haiku dialihkan ke OpenAI tanpa awalan penyedia**: model `claude-*` yang dikirim tanpa awalan penyedia sekarang dirutekan dengan benar ke penyedia `antigravitasi` (Antropik). Menambahkan `gemini-*`/`gemma-*` → `gemini` heuristik juga. -**Perbaikan #74 — Jumlah token selalu 0 untuk streaming Antigravity/Claude**: Peristiwa SSE `message_start` yang membawa `input_tokens` tidak diuraikan oleh `extractUsage()`, sehingga menyebabkan semua jumlah token input turun. Pelacakan token input/output sekarang berfungsi dengan benar untuk respons streaming. -**Perbaikan #180 — Impor model duplikat tanpa masukan**: `ModelSelectModal` sekarang menampilkan ✓ sorotan hijau untuk model yang sudah ada dalam kombo, membuatnya jelas bahwa model tersebut sudah ditambahkan. -**Kesalahan pembuatan laman media**: Hasil gambar kini dirender sebagai tag `<img>`, bukan JSON mentah. Hasil transkripsi ditampilkan sebagai teks yang dapat dibaca. Kesalahan kredensial menunjukkan spanduk kuning, bukan kegagalan diam-diam. -**Tombol penyegaran token di halaman penyedia**: UI penyegaran token manual ditambahkan untuk penyedia OAuth.### 🔧 Improvements

-**Provider Registry**: HuggingFace dan Vertex AI ditambahkan ke `providerRegistry.ts` dan `providers.ts` (frontend). -**Baca Cache**: `src/lib/db/readCache.ts` baru untuk cache baca DB yang efisien. -**Cache Kuota**: Peningkatan cache kuota dengan penggusuran berbasis TTL.### 📦 Dependencies

- `mendominasi` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `buruh pelabuhan/setup-qemu-action` → v4 (PR #342)
- `buruh pelabuhan/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Berkas                                        | Tujuan                                      |
| --------------------------------------------- | ------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Logika perutean sadar tugas (7 jenis tugas) |
| `src/app/api/settings/task-routing/route.ts`  | API konfigurasi perutean tugas              |
| `src/app/api/providers/[id]/refresh/route.ts` | Penyegaran token OAuth manual               |
| `src/lib/db/readCache.ts`                     | Cache baca DB yang efisien                  |
| `src/shared/utils/clipboard.ts`               | Papan klip yang diperkeras dengan fallback  | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Modal kombo: Tumpukan Gratis terlihat dan menonjol**— Templat Tumpukan Gratis disembunyikan (urutan ke-4 dalam kisi 3 kolom). Memperbaiki: dipindahkan ke posisi 1, dialihkan ke kisi 2x2 sehingga keempat templat terlihat, batas hijau + sorotan lencana GRATIS.## [2.4.0] - 2026-03-13

> **Rilis besar**— Ekosistem Stack Gratis, perombakan taman bermain transkripsi, 44+ penyedia, dokumentasi tingkat gratis yang komprehensif, dan penyempurnaan UI secara menyeluruh.### Fitur

-**Kombo: Templat Tumpukan Gratis**— Templat ke-4 baru "Tumpukan Gratis ($0)" menggunakan round-robin di Kiro + Qoder + Qwen + Gemini CLI. Menyarankan kombo tanpa biaya bawaan pada penggunaan pertama. -**Media/Transkripsi: Deepgram sebagai default**— Deepgram (Nova 3, gratis $200) kini menjadi penyedia transkripsi default. AssemblyAI ($50 gratis) dan Groq Whisper (gratis selamanya) ditampilkan dengan lencana kredit gratis. -**README: bagian "Mulai Gratis"**— Tabel 5 langkah README awal baru yang menunjukkan cara menyiapkan AI tanpa biaya dalam hitungan menit. -**README: Kombo Transkripsi Gratis**— Bagian baru dengan saran kombo Deepgram/AssemblyAI/Groq dan detail kredit gratis per penyedia. -**providers.ts: hasFree flag**— NVIDIA NIM, Cerebras, dan Groq ditandai dengan lencana hasFree dan freeNote untuk UI penyedia. -**i18n: kunci templateFreeStack**— Template kombo Stack gratis diterjemahkan dan disinkronkan ke 30 bahasa.## [2.3.16] - 2026-03-13

### Dokumentasi

-**README: 44+ Penyedia**— Memperbarui semua 3 kemunculan "36+ penyedia" menjadi "44+" yang mencerminkan jumlah basis kode sebenarnya (44 penyedia di penyedia.ts) -**README: Bagian Baru "🆓 Model Gratis — Apa yang Sebenarnya Anda Dapatkan"**— Menambahkan tabel 7 penyedia dengan batas tarif per model untuk: Kiro (Claude tidak terbatas melalui AWS Builder ID), Qoder (5 model tidak terbatas), Qwen (4 model tidak terbatas), Gemini CLI (180K/bln), NVIDIA NIM (~40 RPM dev-forever), Cerebras (1 juta tok/hari / 60 ribu TPM), Groq (30 RPM/14.4K RPD). Termasuk rekomendasi kombo \/usr/bin/bash Ultimate Free Stack. -**README: Tabel Harga Diperbarui**— Menambahkan Cerebras ke tingkat API KEY, memperbaiki NVIDIA dari "1000 kredit" menjadi "bebas dev-selamanya", memperbarui jumlah dan nama model Qoder/Qwen -**README: Qoder 8→5 model**(bernama: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**README: Qwen 3→4 model**(bernama: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Fitur

-**Dasbor Kombo Otomatis (Prioritas Tingkat)**: Menambahkan `🏷️ Tingkat` sebagai label faktor penilaian ke-7 di tampilan perincian faktor `/dasbor/kombo otomatis` — ketujuh faktor penilaian Kombo Otomatis kini terlihat. -**i18n — bagian autoCombo**: Menambahkan 20 kunci terjemahan baru untuk dasbor Auto-Combo (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority`, dll.) ke seluruh 30 file bahasa.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Memulihkan `clientSecret` default yang valid — yang sebelumnya merupakan string kosong, menyebabkan "Kredensial klien buruk" pada setiap upaya koneksi. Kredensial publik sekarang menjadi cadangan default (dapat diganti melalui `QODER_OAUTH_CLIENT_SECRET` env var). -**Server MITM tidak ditemukan (#335)**: `prepublish.mjs` sekarang mengkompilasi `src/mitm/*.ts` ke JavaScript menggunakan `tsc` sebelum menyalin ke bundel npm. Sebelumnya hanya file `.ts` mentah yang disalin — artinya `server.js` tidak pernah ada di instalasi global npm/Volta. -**GeminiCLI kehilangan projectId (#338)**: Daripada memunculkan kesalahan 500 saat `projectId` hilang dari kredensial yang disimpan (misalnya setelah Docker dimulai ulang), OmniRoute kini mencatat peringatan dan mencoba permintaan — mengembalikan kesalahan sisi penyedia yang berarti, bukan crash OmniRoute. -**Ketidakcocokan versi elektron (#323)**: Versi `electron/package.json` disinkronkan ke `2.3.13` (sebelumnya `2.0.13`) sehingga versi biner desktop cocok dengan paket npm.### ✨ New Models (#334)

-**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Kodeks**: `gpt5.4`### 🔧 Improvements

-**Tier Scoring (API + Validation)**: Menambahkan `tierPriority` (bobot `0,05`) ke skema Zod `ScoringWeights` dan rute API `combos/auto` — faktor penilaian ke-7 kini sepenuhnya diterima oleh REST API dan divalidasi pada input. bobot `stabilitas` disesuaikan dari `0,10` menjadi `0,05` untuk menjaga jumlah total = `1,0`.### ✨ New Features

-**Penilaian Kuota Bertingkat (Kombo Otomatis)**: Menambahkan `tierPriority` sebagai faktor penilaian ke-7 — akun dengan tingkatan Ultra/Pro kini lebih disukai daripada tingkatan Gratis jika faktor lainnya setara. Bidang opsional baru `accountTier` dan `quotaResetIntervalSecs` di `ProviderCandidate`. Semua 4 paket mode diperbarui (`pengiriman cepat`, `penghemat biaya`, `mengutamakan kualitas`, `ramah offline`). -**Penggantian Model Intra-Keluarga (T5)**: Saat model tidak tersedia (404/400/403), OmniRoute kini secara otomatis melakukan fallback ke model saudara dari keluarga yang sama sebelum menampilkan kesalahan (`modelFamilyFallback.ts`). -**Batas Waktu Jembatan API yang Dapat Dikonfigurasi**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var memungkinkan operator menyetel waktu tunggu proxy (default 30 detik). Memperbaiki kesalahan 504 pada respons upstream yang lambat. (#332) -**Star History**: Mengganti widget star-history.com dengan Starart.cc (`?variant=adaptive`) di seluruh 30 README — beradaptasi dengan tema terang/gelap, pembaruan waktu nyata.### 🐛 Bug Fixes

-**Auth — Kata sandi pertama kali**: `INITIAL_PASSWORD` env var kini diterima saat menyetel kata sandi dasbor pertama. Menggunakan `timingSafeEqual` untuk perbandingan waktu konstan, mencegah serangan pengaturan waktu. (#333) -**README Truncation**: Memperbaiki tag penutup `</details>` yang hilang di bagian Pemecahan Masalah yang menyebabkan GitHub berhenti merender semua yang ada di bawahnya (Tech Stack, Docs, Roadmap, Contributors). -**pnpm install**: Menghapus override `@swc/helpers` yang berlebihan dari `package.json` yang bertentangan dengan ketergantungan langsung, menyebabkan kesalahan `EOVERRIDE` pada pnpm. Menambahkan konfigurasi `pnpm.onlyBuiltDependencies`. -**CLI Path Injection (T12)**: Menambahkan validator `isSafePath()` di `cliRuntime.ts` untuk memblokir traversal jalur dan metakarakter shell di `CLI_*_BIN` env vars. -**CI**: `package-lock.json` dibuat ulang setelah penghapusan override untuk memperbaiki kegagalan `npm ci` pada GitHub Actions.### 🔧 Improvements

-**Format Respons (T1)**: `response_format` (json_schema/json_object) kini dimasukkan sebagai prompt sistem untuk Claude, memungkinkan kompatibilitas keluaran terstruktur. -**429 Coba Ulang (T2)**: Coba ulang intra-URL untuk 429 tanggapan (2× percobaan dengan penundaan 2 detik) sebelum kembali ke URL berikutnya. -**Gemini CLI Header (T3)**: Menambahkan header sidik jari `User-Agent` dan `X-Goog-Api-Client` untuk kompatibilitas Gemini CLI. -**Katalog Harga (T9)**: Menambahkan entri harga `deepseek-3.1`, `deepseek-3.2`, dan `qwen3-coder-next`.### 📁 New Files

| Berkas                                     | Tujuan                                                     |
| ------------------------------------------ | ---------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Definisi keluarga model dan logika fallback intra-keluarga | ### Fixed |

-**KiloCode**: batas waktu pemeriksaan kesehatan kilocode sudah diperbaiki di v2.3.11 -**OpenCode**: Tambahkan opencode ke registri cliRuntime dengan batas waktu pemeriksaan kesehatan 15 detik -**OpenClaw / Cursor**: Tingkatkan batas waktu pemeriksaan kesehatan hingga 15 detik untuk varian yang dimulai dengan lambat -**VPS**: Instal paket droid dan openclaw npm; aktifkan CLI_EXTRA_PATHS untuk kiro-cli -**cliRuntime**: Tambahkan registrasi alat opencode dan tambah waktu tunggu untuk melanjutkan## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**: Meningkatkan `healthcheckTimeoutMs` dari 4000 md menjadi 15000 md — kilocode merender spanduk logo ASCII saat startup menyebabkan `healthcheck_failed` palsu pada lingkungan mulai lambat/dingin## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Perbaiki kegagalan `check:any-budget:t11` — ganti `as any` dengan `as Record<string, unknown>` di OAuthModal.tsx (3 kemunculan)### Docs

-**CLI-TOOLS.md**: Panduan lengkap untuk 11 alat CLI (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, kursor, droid, openclaw) -**i18n**: CLI-TOOLS.md disinkronkan ke 30 bahasa dengan judul terjemahan + intro## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Titik akhir penyelesaian OpenAI lama yang baru — menerima string `prompt` dan larik `pesan`, dinormalisasi ke format obrolan secara otomatis -**EndpointPage**: Kini menampilkan ketiga jenis endpoint yang kompatibel dengan OpenAI: Penyelesaian Obrolan, API Respons, dan Penyelesaian Lama -**i18n**: Menambahkan `completionsLegacy/completionsLegacyDesc` ke 30 file bahasa### Fixed

-**OAuthModal**: Perbaiki `[Objek Objek]` yang ditampilkan pada semua kesalahan koneksi OAuth — ekstrak `.message` dengan benar dari objek respons kesalahan di ketiga panggilan `lempar Error(data.error)` yang baru (pertukaran, kode perangkat, otorisasi)

- Mempengaruhi Cline, Codex, GitHub, Qwen, Kiro, dan semua penyedia OAuth lainnya## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Tambahkan `decodeURIComponent` sebelum dekode base64 sehingga kode autentikasi yang dikodekan URL dari URL panggilan balik diurai dengan benar, memperbaiki kesalahan "kode otorisasi tidak valid atau kedaluwarsa" pada pengaturan jarak jauh (IP LAN) -**Cline OAuth**: `mapTokens` sekarang mengisi `name = firstName + lastName || email` sehingga akun Cline menampilkan nama pengguna asli, bukan "Akun #ID" -**Nama akun OAuth**: Semua alur pertukaran OAuth (pertukaran, polling, polling-callback) sekarang menormalkan `nama = email` ketika nama tidak ada, sehingga setiap akun OAuth menampilkan emailnya sebagai label tampilan di dasbor Penyedia -**Nama akun OAuth**: Menghapus fallback "Akun N" berurutan di `db/providers.ts` — akun tanpa email/nama kini menggunakan label berbasis ID stabil melalui `getAccountDisplayName()` alih-alih nomor urut yang berubah ketika akun dihapus## [2.3.6] - 2026-03-12

### Fixed

-**Batch pengujian penyedia**: Memperbaiki skema Zod untuk menerima `providerId: null` (frontend mengirimkan null untuk mode non-penyedia); salah mengembalikan "Permintaan tidak valid" untuk semua pengujian batch -**Modal pengujian penyedia**: Memperbaiki tampilan `[Objek Objek]` dengan menormalkan objek kesalahan API menjadi string sebelum dirender dalam `setTestResults` dan `ProviderTestResultsView` -**i18n**: Menambahkan kunci yang hilang `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` ke `en.json` -**i18n**: Menyinkronkan 1111 kunci yang hilang di 29 file berbahasa non-Inggris menggunakan nilai bahasa Inggris sebagai cadangan## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Menambahkan perbaikan `postinstall` permanen untuk menyalin `@swc/helpers` ke `node_modules` aplikasi mandiri — mencegah kerusakan MODULE_NOT_FOUND pada instalasi npm global## [2.3.4] - 2026-03-10

### Added

- Integrasi beberapa penyedia dan peningkatan dasbor
