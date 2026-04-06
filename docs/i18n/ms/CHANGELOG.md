# Changelog (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Perisian Tengah:**Selesaikan gelung ubah hala tak terhingga pada papan pemuka untuk keadaan baharu apabila requireLogin dilumpuhkan.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Qoder API Native Integration:**Qoder Executor telah memfaktorkan semula sepenuhnya untuk memintas algoritma penyulitan COZY AES/RSA legasi, menghala terus ke URL asal yang serasi dengan DashScope OpenAi. Menghapuskan kebergantungan kompleks pada modul `crypto` Node sambil meningkatkan kesetiaan strim. -**Resilience Enjin Baik pulih:**Konteks bersepadu limpahan sandaran anggun, pengesanan token OAuth proaktif dan pencegahan pelepasan kandungan kosong (#990). -**Strategi Penghalaan Dioptimumkan Konteks:**Menambah keupayaan penghalaan pintar baharu untuk memaksimumkan tetingkap konteks secara asli dalam penggunaan kombo automatik (#990).### 🐛 Bug Fixes

-**Respons API Stream Corruption:**Memperbaiki rasuah pengklonan dalam yang mana sempadan terjemahan Anthropic/OpenAI melucutkan `respons.` awalan SSE tertentu daripada sempadan penstriman (#992). -**Penjajaran Laluan Cache Claude:**Penanda cache Serasi CC yang dijajarkan secara konsisten dengan mod Laluan Pelanggan huluan yang mengekalkan caching segera. -**Kebocoran Memori Turbopack:**Disematkan Next.js kepada `16.0.10` yang ketat menghalang kebocoran memori dan membina kebusukan daripada regresi modul cincang Turbopack hulu baru-baru ini (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Penyatuan Models.dev:**Models.dev bersepadu sebagai sumber masa jalan yang berwibawa untuk harga model, keupayaan dan spesifikasi, mengatasi harga kod keras. Termasuk UI tetapan untuk mengurus selang penyegerakan, rentetan terjemahan untuk semua 30 bahasa dan liputan ujian yang mantap. -**Keupayaan Asli Penyedia:**Menambah sokongan untuk mengisytiharkan dan menyemak ciri API asli (cth. `systemInstructions_supported`) menghalang kegagalan dengan membersihkan peranan yang tidak sah. Pada masa ini dikonfigurasikan untuk pembekal Gemini Base dan Antigravity OAuth. -**Tetapan Lanjutan Penyedia API:**Menambahkan penggantian tersuai `Ejen-Pengguna` setiap sambungan untuk sambungan pembekal kunci API. Penggantian disimpan dalam `providerSpecificData.customUserAgent` dan kini digunakan pada probe pengesahan dan permintaan pelaksanaan huluan.### 🐛 Bug Fixes

-**Kebolehpercayaan OAuth Qwen:**Menyelesaikan satu siri isu penyepaduan OAuth termasuk penyekat 400 Permintaan Buruk pada token yang telah tamat tempoh, penjanaan sandaran untuk menghuraikan sifat `access_token` OIDC apabila `id_token` ditinggalkan, ralat penemuan katalog model dan penapisan ketat `X-Dash0reject-compatible AI dari `X-Dash00000000000 dielakkan daripada-\*` titik akhir.## [3.5.0] — 2026-04-03

### ✨ New Features

-**AutoKombo & Penghalaan:**Menyelesaikan penyepaduan kitaran hayat CRUD asli untuk enjin Auto-Kombo termaju (#955). -**Operasi Teras:**Membetulkan terjemahan yang hilang untuk pilihan Auto-Kombo asli baharu (#955). -**Pengesahan Keselamatan:**Tugas auto-sandar SQLite dilumpuhkan secara asli semasa pelaksanaan CI ujian unit untuk menyelesaikan kebocoran memori gantung Node 22 Gelung Peristiwa (#956). -**Proksi Ekosistem:**Penjadual penyegerakan model pemetaan penyepaduan eksplisit yang lengkap, kitaran OAuth dan Semakan Token dimuat semula dengan selamat melalui proksi huluan sistem asli OmniRoute (#953). -**Kelanjutan MCP:**Menambah dan berjaya mendaftarkan alat rangka kerja MCP `omniroute_web_search` baharu daripada beta ke dalam skema pengeluaran (#951). -**Logik Penampan Token:**Menambah had konfigurasi masa jalan melanjutkan penimbal token input/output boleh dikonfigurasikan untuk metrik Penjejakan Penggunaan yang tepat (#959).### 🐛 Bug Fixes

-**Pemulihan CodeQL:**Operasi pengindeksan rentetan kritikal yang diselesaikan sepenuhnya dan terjamin menghalang Pemalsuan Permintaan Sisi Pelayan (SSRF) tatasusunan heuristik pengindeksan bersama pengesanan balik algoritma polinomial (ReDoS) di dalam modul penghantar proksi dalam. -**Crypto Hashes:**Menggantikan legasi OAuth 1.0 cincangan lemah yang tidak disahkan dengan primitif pengesahan standard HMAC-SHA-256 yang teguh memastikan kawalan akses yang ketat. -**Perlindungan Sempadan API:**Perlindungan laluan struktur yang disahkan dan dipetakan dengan betul yang menguatkuasakan logik perisian tengah `isAuthenticated()` yang ketat meliputi titik akhir dinamik baharu yang menyasarkan manipulasi tetapan dan pemuatan kemahiran asli. -**CLI Ecosystem Compat:**Menyelesaikan pengikatan penghurai masa jalan asli yang rosak ranap pengesan persekitaran `di mana` dengan ketat pada kes tepi `.cmd/.exe` dengan anggun untuk pemalam luaran (#969). -**Seni Bina Cache:**Struktur susun atur parameter papan pemuka Analitis dan Tetapan Sistem yang tepat difaktorkan semula untuk mengekalkan kitaran kegigihan penghidratan semula yang stabil menyelesaikan denyar keadaan tidak sejajar visual (#952). -**Piawaian Cache Claude:**Penanda blok ephemeral kritikal yang dinormalisasi dan dipelihara dengan ketat `ephemeral` caching pesanan TTL untuk nod hiliran yang menguatkuasakan pemetaan permintaan CC serasi standard dengan bersih tanpa metrik yang digugurkan (#948). -**Pengesahan Alias ​​Dalaman:**Pemetaan masa jalan dalaman yang dipermudahkan menormalkan carian muatan kelayakan Codex dalam parameter terjemahan global yang menyelesaikan 401 kejatuhan yang tidak disahkan (#958).### 🛠️ Maintenance

-**Kebolehtemuan UI:**Pengkategorian reka letak yang dilaraskan dengan betul memisahkan secara eksplisit pembekal peringkat percuma logik meningkatkan aliran pengisihan UX di dalam halaman pendaftaran API umum (#950). -**Topologi Penerapan:**Artifak penempatan Docker Disatukan yang memastikan akar `fly.toml` sepadan dengan parameter tika awan yang dijangkakan di luar kotak yang secara asli mengendalikan penyebaran automatik yang berskala dengan betul. -**Peralatan Pembangunan:**Menggabungkan parameter masa jalan `LKGP` ke dalam utiliti caching abstraksi lapisan DB yang eksplisit memastikan liputan pengasingan ujian yang ketat untuk lapisan caching teras dengan selamat.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Panel Auto-Kombo Papan Pemuka:**Memfaktorkan semula UI `/papan pemuka/auto-kombo` sepenuhnya untuk disepadukan dengan lancar dengan Kad Papan Pemuka asli dan pelapik/pengepala visual yang standard. Menambahkan bar kemajuan visual dinamik memetakan mekanisme berat pemilihan model. -**Penyegerakan Penghalaan Tetapan:**Pendedahan sepenuhnya penghalaan lanjutan `keutamaan` dan `diwajaran` menyasarkan secara dalaman dalam senarai sandaran tetapan global.### Bug Fixes

-**Nod Tempat Memori & Kemahiran:**Menyelesaikan teg pemaparan kosong untuk pilihan Memori dan Kemahiran terus dalam paparan tetapan global dengan mendawai semua `tetapan.*` nilai pemetaan secara dalaman ke dalam `en.json` (juga dipetakan secara tersirat untuk alat terjemahan silang).### Internal Integrations

- PR Bersepadu #946 — betulkan: kekalkan keserasian Kod Claude dalam penukaran respons
- PR Bersepadu #944 — fix(gemini): kekalkan tandatangan pemikiran merentas panggilan alat antigraviti
- PR Bersepadu #943 — betulkan: pulihkan badan Copilot GitHub
- PR Bersepadu #942 — Betulkan penanda cache serasi cc
- PR Bersepadu #941 — refactor(auth): tingkatkan carian alias NVIDIA + tambah pengelogan ralat LKGP
- PR Bersepadu #939 — Pulihkan pengendalian panggilan balik localhost Claude OAuth
- _(Nota: PR #934 telah ditinggalkan daripada kitaran 3.4.9 untuk mengelakkan regresi konflik teras)_---

## [3.4.8] — 2026-04-03

### Keselamatan

- Membaiki sepenuhnya semua penemuan Github Advanced Security (CodeQL) yang luar biasa dan makluman Dependabot.
- Memperbaiki kelemahan rawak yang tidak selamat dengan berhijrah daripada `Math.random` kepada `crypto.randomUUID()`.
- Perintah shell selamat dalam skrip automatik daripada suntikan rentetan.
- Memindahkan corak penghuraian RegEx pengesanan balik bencana yang terdedah dalam saluran paip sembang/terjemahan.
- Kawalan sanitasi output yang dipertingkatkan dalam komponen UI React dan suntikan teg Server Sent Events (SSE).---

## [3.4.7] — 2026-04-03

### Ciri-ciri

- Menambahkan nod `Cryptography` pada Pemantauan dan pemeriksaan kesihatan MCP (#798)
- Pemetaan kebenaran laluan katalog model yang dikeraskan (`/model`) (#781)### Bug Fixes

- Penyegaran semula token Claude OAuth yang gagal untuk mengekalkan konteks cache (#937)
- Memperbaiki ralat pembekal Serasi CC yang menyebabkan model cache tidak dapat dicapai (#937)
- Memperbaiki ralat Pelaksana GitHub yang berkaitan dengan tatasusunan konteks yang tidak sah (#937)
- Membetulkan kegagalan pemeriksaan kesihatan alatan CLI dipasang NPM pada Windows (#935)
- Terjemahan muatan tetap yang menjatuhkan kandungan yang sah disebabkan medan API yang tidak sah (#927)
- Membetulkan ranap masa jalan dalam Node 25 mengenai pelaksanaan kunci API (#867)
- Memperbaiki resolusi modul kendiri MCP (`ERR_MODULE_NOT_FOUND`) melalui `esbuild` (#936)
- Memperbaiki resolusi kelayakan penghalaan NVIDIA NIM alias ketidakpadanan (#931)### Keselamatan

- Menambahkan perlindungan sempadan input ketat yang selamat terhadap suntikan pelaksanaan kod jauh `shell: true` mentah.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Pembekal:**Mendaftarkan penyedia penjanaan imej, video dan audio baharu daripada senarai yang diminta komuniti (#926). -**UI Papan Pemuka:**Menambah navigasi bar sisi kendiri untuk modul Memori dan Kemahiran baharu (#926). -**i18n:**Menambah rentetan terjemahan dan pemetaan reka letak merentas 30 bahasa untuk ruang nama Memori dan Kemahiran.### 🐛 Bug Fixes

-**Ketahanan:**Menghalang Pemutus Litar proksi daripada tersekat dalam keadaan TERBUKA selama-lamanya dengan mengendalikan peralihan terus kepada keadaan TERTUTUP dalam laluan kombo sandaran (#930). -**Penterjemahan Protokol:**Menambal pengubah penstriman untuk membersihkan blok tindak balas berdasarkan protokol _sumber_ yang dijangka dan bukannya protokol _target_ pembekal, membetulkan model Anthropics yang dibalut dengan muatan OpenAI yang merempuh Kod Claude (#929). -**Spesifikasi API & Gemini:**Penghuraian `thought_signature` dalam penterjemah `openai-to-gemini` dan `claude-to-gemini` telah diperbaiki, menghalang ralat HTTP 400 merentas semua panggilan alat API Gemini 3. -**Pembekal:**Membersihkan titik akhir yang tidak serasi OpenAI yang menghalang sambungan huluan yang sah (#926). -**Aliran Cache:**Membetulkan ketidakpadanan data pemetaan harta yang tidak sah menyebabkan carta UI Trend Cache ranap dan mengekstrak widget metrik cache berlebihan (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**Penyepaduan Ekosistem CLIProxyAPI:**Menambah pelaksana `cliproxyapi` dengan cache peringkat modul terbina dalam dan penghalaan proksi. Memperkenalkan perkhidmatan Pengurus Versi yang komprehensif untuk menguji kesihatan secara automatik, memuat turun binari daripada GitHub, melahirkan proses latar belakang terpencil dan mengurus kitaran hayat alatan CLI luaran secara bersih secara terus melalui UI. Termasuk jadual DB untuk konfigurasi proksi untuk membolehkan penghalaan silang berpagar SSRF automatik permintaan OpenAI luaran melalui lapisan alat CLI setempat (#914, #915, #916). -**Sokongan Qoder PAT:**Sokongan Token Akses Peribadi Bersepadu (PAT) terus melalui pengangkutan `qodercli` tempatan dan bukannya konfigurasi penyemak imbas jauh `.cn` (#913). -**Gemini 3.1 Pro Pratonton (GitHub):**Menambahkan sokongan model eksplisit kanonik `gemini-3.1-pro-preview` secara asli ke dalam penyedia Copilot GitHub sambil mengekalkan alias penghalaan yang lebih lama (#924).### 🐛 Bug Fixes

-**Kestabilan Token Copilot GitHub:**Membaiki gelung muat semula token Copilot yang mana token lapuk tidak digabungkan dalam DB dan mengalih keluar medan `reasoning_text` yang merosakkan penukaran blok Anthropic hiliran untuk sembang berbilang pusingan (#923). -**Matriks Tamat Masa Global:**Tamat masa permintaan terpusat dan berparameter secara eksplisit daripada `REQUEST_TIMEOUT_MS` untuk mengelakkan penimbal pengambilan lalai tersembunyi (~300s) memotong lebih awal daripada respons penstriman SSE jangka panjang daripada model penaakulan berat (#918). -**Keadaan Terowong Pantas Cloudflare:**Memperbaiki ketidakkonsistenan keadaan yang teruk apabila kejadian OmniRoute yang dimulakan semula secara tersilap menunjukkan terowong yang musnah sebagai aktif, dan terowong cloudflared lalai kepada `HTTP/2` untuk menghapuskan spam log penimbal terima UDP (#925). -**Pembaikpulihan Terjemahan i18n (Czech & Hindi):**Kod Hindi tetap daripada DEPRECATED `in.json` kepada `hi.json` kanonik, pemetaan teks Czech yang dirombak, diekstrak `untranslatable-keys.json` untuk membetulkan pengesahan positif palsu CI/CD dan menjana penterjemah komprehensif `I18N.9md`2). -**Pemulihan Penyedia Token:**Memperbaiki Qwen kehilangan titik akhir `resourceUrl` tertentu selepas token pemeriksaan kesihatan automatik dimuat semula kerana tiada cantuman dalam DB (#917). -**UX & Penstriman Serasi CC:**Menyatukan tindakan serasi Tambah CC/OpenAI/Anthropic di sekitar rawatan UI Anthropic, permintaan hulu serasi CC yang dipaksa untuk menggunakan SSE sambil masih mengembalikan respons penstriman atau bukan penstriman berdasarkan permintaan pelanggan, dialih keluar konfigurasi senarai model/sokongan import CC yang memihak kepada cermin ralat tidak serasi CC yang jelas dan model yang tersedia. Senarai pendaftaran Kod Claude (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Respons API Token Reporting:**Pancarkan `response.completed` dengan medan `input_tokens`/`output_tokens` yang betul untuk klien Codex CLI, membetulkan paparan penggunaan token (#909 — terima kasih @christopher-s). -**SQLite WAL Checkpoint on Shutdown:**Flush WAL berubah ke dalam fail pangkalan data utama semasa penutupan/mulakan semula yang anggun, menghalang kehilangan data pada hentian kontena Docker (#905 — terima kasih @rdself). -**Isyarat Penutupan Anggun:**Menukar laluan `/api/restart` dan `/api/shutdown` daripada `process.exit(0)` kepada `process.kill(SIGTERM)`, memastikan pengendali penutupan berjalan sebelum keluar. -**Tempoh Ihsan Docker Stop:**Menambahkan `stop_grace_period: 40s` pada Docker Compose fail dan `--stop-timeout 40` pada contoh run Docker.### 🛠️ Maintenance

- Ditutup 5 isu diselesaikan/bukan-pepijat (#872, #814, #816, #890, #877).
- Mencuba 6 isu dengan permintaan maklumat keperluan (#892, #887, #886, #865, #895, #870).
- Menjawab isu penjejakan pengesanan CLI (#863) dengan panduan penyumbang.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Memori & Kemahiran Antigraviti:**Melengkapkan memori jauh dan suntikan kemahiran untuk pembekal Antigraviti di peringkat rangkaian proksi. -**Keserasian Kod Claude:**Membina jambatan keserasian tersembunyi asli untuk Kod Claude, menghantar alat dan memformat dengan bersih. -**MCP Carian Web:**Menambah alat `omniroute_web_search` dengan skop `execute:search`. -**Komponen Cache:**Komponen cache dinamik yang dilaksanakan menggunakan TDD. -**UI & Penyesuaian:**Menambah sokongan favicon tersuai, tab penampilan, pelabelan putih berwayar pada bar sisi dan menambahkan langkah panduan Luncur Angin merentas semua 33 bahasa. -**Pengekalan Log:**Pengekalan log permintaan bersatu dan artifak secara asli. -**Peningkatan Model:**Menambahkan `contextLength` eksplisit untuk semua model opencode-zen. -**i18n & terjemahan:**33 terjemahan bahasa bersepadu secara asli, termasuk pengesahan CI pemegang tempat dan kemas kini dokumentasi bahasa Cina (#873, #869).### 🐛 Bug Fixes

-**Pemetaan OAuth Qwen:**Membalikkan pergantungan `id_token` kepada `token_akses` dan mendayakan suntikan titik akhir API `resource_url` dinamik untuk penghalaan serantau yang betul (#900). -**Enjin Penyegerakan Model:**Menyimpan ID Pembekal dalaman yang ketat dalam rutin penyegerakan `getCustomModels()` dan bukannya format Alias ​​Saluran UI, menghalang kegagalan pemasukan katalog SQLite (#903). -**Kod Claude & Codex:**Respons kosong bukan penstriman standard kepada `(tindak balas kosong)` berformat Anthropic untuk mengelakkan ranap proksi CLI (#866). -**Penghalaan Serasi CC:**Menyelesaikan perlanggaran titik akhir pendua `/v1` semasa penggabungan laluan untuk get laluan Kod Claude generik (#904). -**Papan Pemuka Antigraviti:**Model kuota tanpa had disekat daripada mendaftar secara palsu sebagai keadaan had `100% Penggunaan` yang habis dalam UI Penggunaan Penyedia (#857). -**Laluan Imej Claude:**Model Claude tetap tiada laluan lalui blok imej (#898). -**Penghalaan Gemini CLI:**Menyelesaikan sekatan keizinan 403 dan isu pengumpulan kandungan dengan menyegarkan ID projek melalui `loadCodeAssist` (#868). -**Kestabilan Antigraviti:**Senarai akses model yang diperbetulkan, penguatkuasaan 404 kunci keluar, tetapkan 429 lata yang mengunci sambungan standard dan dihadkan token keluaran `gemini-3.1-pro` (#885). -**Kadens Penyegerakan Pembekal:**Membaiki kadens penyegerakan pembekal mengehadkan melalui penjadual dalaman (#888). -**Pengoptimuman Papan Pemuka:**Selesaikan pembekuan UI `/papan pemuka/had` apabila memproses 70+ akaun melalui selari ketulan (#784). -**Pengerasan SSRF:**Dikuatkuasakan penapisan julat IP SSRF yang ketat dan menyekat antara muka gelung balik `::1`. -**Jenis MIME:**`mime_type` kepada snake_case untuk dipadankan dengan spesifikasi API Gemini. -**Penstabilan CI:**Membetulkan analitis/tetapan yang gagal Pemilih Playwright dan meminta penegasan supaya GitHub Actions E2E berjalan dengan pasti merentas UI setempat dan kawalan berasaskan suis. -**Ujian Deterministik:**Mengalih keluar lekapan kuota sensitif tarikh daripada ujian penggunaan Copilot dan ujian katalog idempotensi/model yang sejajar dengan gelagat masa jalan yang digabungkan. -**Pengerasan Jenis MCP:**Mengalih keluar regresi `sebarang` eksplisit belanjawan sifar daripada laluan pendaftaran alat pelayan MCP. -**Enjin Penyegerakan Model:**`Penggantian' yang merosakkan memintas apabila penyegerakan automatik pembekal menghasilkan senarai model kosong, mengekalkan kestabilan untuk katalog dinamik (#899).### 🛠️ Maintenance

-**Pelogan Saluran Paip:**Artifak pembalakan saluran paip diperhalusi dan menguatkuasakan had pengekalan (#880). -**AGENTS.md Baik pulih:**Dipekatkan daripada 297→153 baris. Menambahkan garis panduan binaan/ujian/gaya, aliran kerja kod (Prettier, TypeScript, ESLint) dan jadual verbose yang dipangkas (#882). -**Penyepaduan Cawangan Keluaran:**Menyatukan cawangan ciri aktif menjadi `release/v3.4.2` di atas `utama` semasa dan mengesahkan cawangan dengan lint, unit, coverage, build dan CI-mod E2E runs. -**Ujian:**Menambah konfigurasi vitest untuk ujian komponen dan spesifikasi Playwright untuk togol tetapan. -**Kemas Kini Dokumen:**Pembacaan akar diperluaskan, menterjemah dokumen Cina secara asli dan membersihkan fail usang.## [3.4.1] - 2026-03-31

> [!AMARAN]
> **PERUBAHAN PECAH: permintaan pembalakan, pengekalan dan pembolehubah persekitaran pembalakan telah direka bentuk semula.**
> Pada permulaan pertama selepas menaik taraf, OmniRoute mengarkibkan log permintaan warisan daripada `DATA_DIR/log/`, `DATA_DIR/log_panggilan/` warisan dan `DATA_DIR/log.txt` ke dalam `DATA_DIR/log_archives/*.zip`, kemudian mengalih keluar reka letak baharu yang tidak digunakan dan tidak digunakan lagi. `DATA_DIR/log_panggilan/`.### ✨ New Features

-**.ENV Migration Utility:**Termasuk `scripts/migrate-env.mjs` untuk memindahkan konfigurasi `<v3.3` dengan lancar ke `v3.4.x` kekangan pengesahan keselamatan yang ketat (FASE-01), membaiki ranap permulaan yang disebabkan oleh kejadian `JWT_SECRET` yang singkat. -**Pengoptimuman Cache AI ​​Kiro:**Melaksanakan penjanaan `conversationId` deterministik (uuidv5) untuk mendayakan Caching Prompt ID Builder AWS dengan betul merentas seruan (#814). -**Pemulihan & Penyatuan UI Papan Pemuka:**Logik bar sisi diselesaikan dengan mengenepikan bahagian Nyahpepijat dan mengosongkan amaran penghalaan Nextjs dengan mengalihkan halaman `/papan pemuka/mcp` dan `/papan pemuka/a2a` kendiri secara eksplisit ke dalam komponen UI Endpoint Proxy yang dibenamkan. -**Artifak Log Permintaan Bersatu:**Pembalakan permintaan kini menyimpan satu baris indeks SQLite ditambah satu artifak JSON bagi setiap permintaan di bawah `DATA_DIR/log_panggilan/`, dengan tangkapan saluran paip pilihan dibenamkan dalam fail yang sama. -**Bahasa:**Terjemahan bahasa Cina dipertingkatkan (#855) -**Model Opencode-Zen:**Menambahkan 4 model percuma pada pendaftaran opencode-zen (#854) -**Ujian:**Menambahkan ujian unit dan E2E untuk togol tetapan dan pembetulan pepijat (#850)### 🐛 Bug Fixes

-**429 Penghuraian Kuota:**Menghuraikan masa tetapan semula kuota yang panjang daripada badan ralat untuk mengiktiraf pengunduran yang betul dan mencegah sekatan akaun terhad kadar (#859) -**Caching Prompt:**Pengepala `cache_control` klien yang dipelihara untuk semua penyedia protokol Claude (seperti Minimax, GLM dan Bailian), dengan betul mengenali sokongan caching (#856) -**Log Penyegerakan Model:**Mengurangkan spam log dengan merakam `model penyegerakan` hanya apabila saluran benar-benar mengubah suai senarai (#853) -**Kuota Penyedia & Penghuraian Token:**Menukar had Antigraviti untuk menggunakan `retrieveUserQuota` secara asli dan memetakan muatan muat semula token Claude dengan betul ke borang berkod URL (#862) -**Kestabilan Mengehadkan Kadar:**Menguniversalkan seni bina 429 Retry-After parsing untuk mengehadkan tempoh bertenang yang disebabkan oleh pembekal pada maksimum 24 jam (#862) -**Rendering Had Papan Pemuka:**Pemetaan kuota `/papan pemuka/had` yang direka bentuk semula untuk memaparkan serta-merta di dalam bongkah, membetulkan kelewatan pembekuan UI utama pada akaun yang melebihi 70 sambungan aktif (#784) -**Keizinan OAuth QWEN:**Memetakan `id_token` OIDC sebagai token Pembawa API utama untuk permintaan Dashscope, membetulkan ralat 401 Tanpa kebenaran serta-merta selepas menyambungkan akaun atau menyegarkan token (#864) -**Kestabilan API ZAI:**Pengkompil Peristiwa Dihantar Pelayan yang Dikeraskan untuk berundur dengan anggun kepada rentetan kosong apabila penyedia DeepSeek menstrim kandungan nol secara matematik semasa fasa penaakulan (#871) -**Terjemahan Kod Claude/Codex:**Penukaran muatan bukan penstriman yang dilindungi terhadap respons kosong daripada alatan Codex huluan, mengelakkan TypeErrors bencana (#866) -**Rendering NVIDIA NIM:**Awalan pembekal serupa yang dilucutkan bersyarat ditolak secara dinamik oleh model audio, menghapuskan struktur teg `nim/nim` pendua yang melemparkan 404 di Taman Permainan Media (#872)### ⚠️ Breaking Changes

-**Reka letak Log Permintaan:**Mengalih keluar sesi log permintaan berbilang fail `DATA_DIR/logs/` dan fail ringkasan `DATA_DIR/log.txt`. Permintaan baharu ditulis sebagai artifak JSON tunggal dalam `DATA_DIR/log_panggilan/YYYY-MM-DD/`. -**Pembolehubah Persekitaran Pengelogan:**Menggantikan `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE` dan `PROXY_LOG_MAX_ENTRIES` dengan model konfigurasi `APP_LOG_*` dan `CALL_LOG_SRE` yang baharu. -**Tetapan Togol Talian Paip:**Menggantikan tetapan `detailed_logs_enabled` legasi dengan `call_log_pipeline_enabled`. Butiran saluran paip baharu dibenamkan di dalam artifak permintaan dan bukannya disimpan sebagai rekod `request_detail_logs` yang berasingan.### 🛠️ Maintenance

-**Sandaran Naik Taraf Log Permintaan Warisan:**Naik taraf kini mengarkibkan `data/log/` lama, `data/log_panggilan/` dan reka letak `data/log.txt` ke dalam `DATA_DIR/log_archives/*.zip` sebelum mengalih keluar struktur yang tidak digunakan. -**Kegigihan Penggunaan Penstriman:**Permintaan penstriman kini menulis satu baris `usage_history` apabila selesai dan bukannya memancarkan baris penggunaan pendua dalam proses dengan metadata status kosong. -**Pembersihan Susulan Pengelogan:**Log saluran paip tidak lagi menangkap `SOURCE REQUEST`, minta entri artifak sekarang menghormati `CALL_LOG_MAX_ENTRIES` dan arkib log aplikasi kini menghormati `APP_LOG_MAX_FILES`.---

## [3.4.0] - 2026-03-31

### Ciri-ciri

-**Analitis Penggunaan Langganan:**Menambahkan petikan kuota siri masa penjejakan, Penggunaan Penyedia dan tab Combo Health dengan visualisasi carta semula dan titik akhir API yang sepadan (#847) -**Kawalan Sandaran SQLite:**Bendera env `OMNIROUTE_DISABLE_AUTO_BACKUP` baharu untuk melumpuhkan sandaran SQLite automatik (#846) -**Kemas Kini Pendaftaran Model:**Disuntikkan `gpt-5.4-mini` ke dalam tatasusunan model penyedia Codex (#756) -**Penjejakan Had Penyedia:**Jejaki dan paparkan apabila had kadar pembekal kali terakhir dimuat semula bagi setiap akaun (#843)### 🐛 Bug Fixes

-**Penghalaan Pengesahan Qwen:**Penghalaan semula Qwen OAuth daripada API DashScope ke API Inferens Web (`chat.qwen.ai`), menyelesaikan kegagalan kebenaran (#844, #807, #832) -**Gelung Auto-Cuba Semula Qwen:**Kuota 429 Kuota yang disasarkan ditambah Melebihi pengendalian mundur dalam `chatCore` melindungi permintaan pecah -**Codex OAuth Fallback:**Penyekatan pop timbul penyemak imbas moden tidak lagi memerangkap pengguna; ia secara automatik kembali ke entri URL manual (#808) -**Pemuatan Semula Token Claude:**Sempadan ketat `aplikasi/json` Anthropic kini dihormati semasa penjanaan token dan bukannya URL yang dikodkan (#836) -**Skema Mesej Codex:**`mesej` purist yang dilucutkan menyuntik daripada permintaan laluan asli untuk mengelakkan penolakan struktur daripada huluan ChatGPT (#806) -**Had Saiz Pengesanan CLI:**Mengimbas perduaan Nod sempadan atas dengan selamat daripada 100MB kepada 350MB, membolehkan alat kendiri berat seperti Kod Claude (229MB) dan OpenCode (153MB) dikesan dengan betul oleh masa jalan VPS (#809) -**Persekitaran Masa Jalan CLI:**Keupayaan dipulihkan untuk konfigurasi CLI untuk menghormati laluan ganti pengguna (`CLI_{PROVIDER}_BIN`) memintas peraturan penemuan terikat laluan yang ketat -**Konflik Pengepala Nvidia:**Mengalih keluar sifat `prompt_cache_key` daripada pengepala huluan apabila memanggil penyedia bukan Anthropic (#848) -**Togol Peringkat Pantas Codex:**Kontras togol peringkat perkhidmatan Codex yang dipulihkan dalam mod cahaya (#842) -**Infrastruktur Ujian:**Ujian `t28-model-catalog-updates` yang dikemas kini yang salah menjangkakan titik akhir DashScope yang lapuk untuk pendaftaran asli Qwen---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Putaran Penyedia Tersuai:**Bersepadu `getRotatingApiKey` secara dalaman di dalam DefaultExecutor, memastikan putaran `extraApiKeys` dicetuskan dengan betul untuk penyedia huluan tersuai dan serasi (#815)---

## [3.3.8] - 2026-03-30

### Ciri-ciri

-**Penapisan API Model:**Titik Akhir `/v1/models` kini menapis senarainya secara dinamik berdasarkan kebenaran yang terikat pada `Kebenaran: Pembawa <token>` apabila akses terhad dihidupkan (#781) -**Integrasi Qoder:**Penyepaduan asli untuk Qoder AI menggantikan pemetaan platform iFlow yang lama (#660) -**Penjejakan Cache Prompt:**Menambahkan keupayaan penjejakan dan visualisasi bahagian hadapan (kad Statistik) untuk caching semantik dan segera dalam UI Papan Pemuka### 🐛 Bug Fixes

-**Saiz Papan Pemuka Cache:**Memperbaik saiz reka letak UI dan pengepala konteks untuk halaman cache lanjutan (#835) -**Keterlihatan Bar Sisi Nyahpepijat:**Memperbaiki isu di mana togol nyahpepijat tidak akan menunjukkan/menyembunyikan butiran nyahpepijat bar sisi dengan betul (#834) -**Awalan Model Gemini:**Mengubah suai sandaran ruang nama untuk menghalakan dengan betul melalui `gemini-cli/` dan bukannya `gc/` untuk menghormati spesifikasi huluan (#831) -**Penyegerakan OpenRouter:**Penyegerakan keserasian yang dipertingkatkan untuk menyerap katalog model yang tersedia secara automatik dengan betul daripada OpenRouter (#830) -**Pemetaan Muatan Penstriman:**Pensirian semula medan penaakulan secara asli menyelesaikan laluan alias konflik apabila output distrim ke peranti tepi---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**`opencode.json` yang dijana semula untuk menggunakan skema berasaskan rekod `@ai-sdk/openai-compatible` dengan `options` dan `model` sebagai peta objek dan bukannya tatasusunan rata, membetulkan kegagalan pengesahan konfigurasi (#816) -**Kunci Hilang i18n:**Menambah kekunci terjemahan `cloudflaredUrlNotice` yang tiada merentas semua 30 fail bahasa untuk mengelakkan ralat konsol `MISSING_MESSAGE` dalam halaman Endpoint (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Perakaunan Token:**Termasuk token cache segera dengan selamat dalam pengiraan input penggunaan sejarah untuk potongan kuota yang betul (PR #822) -**Probe Ujian Kombo:**Membetulkan logik ujian kombo negatif palsu dengan menyelesaikan penghuraian untuk respons penaakulan sahaja dan mendayakan paralelisasi besar-besaran melalui Promise.all (PR #828) -**Terowong Pantas Docker:**Sijil-ca yang diperlukan dibenamkan di dalam bekas masa jalan asas untuk menyelesaikan kegagalan permulaan TLS Cloudflared dan ralat rangkaian stdout yang muncul menggantikan kod keluar generik (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Penjejakan Kuota Gemini:**Ditambah penjejakan kuota Gemini CLI masa nyata melalui API `retrieveUserQuota` (PR #825) -**Papan Pemuka Cache:**Mempertingkatkan Papan Pemuka Cache untuk memaparkan metrik cache segera, arah aliran 24j dan anggaran penjimatan kos (PR #824)### 🐛 Bug Fixes

-**Pengalaman Pengguna:**Mengalih keluar gelung modal OAuth pembukaan automatik invasif pada halaman terperinci pembekal yang tandus (PR #820) -**Kemas Kini Ketergantungan:**Kebergantungan yang dihalang dan dikunci untuk pokok pembangunan dan pengeluaran termasuk Next.js 16.2.1, Recharts dan TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**Aliran Kerja A2A:**Menambahkan pengatur FSM penentu untuk aliran kerja ejen berbilang langkah. -**Degradasi Anggun:**Menambah rangka kerja sandar berbilang lapisan baharu untuk mengekalkan fungsi teras semasa gangguan sistem separa. -**Audit Konfig:**Menambah jejak audit dengan pengesanan perbezaan untuk menjejak perubahan dan mendayakan rollback konfigurasi. -**Kesihatan Penyedia:**Menambahkan penjejakan tamat tempoh pembekal dengan makluman UI proaktif untuk kunci API tamat tempoh. -**Penghalaan Adaptif:**Menambahkan volum penyesuaian dan pengesan kerumitan untuk mengatasi strategi penghalaan secara dinamik berdasarkan beban. -**Kepelbagaian Penyedia:**Melaksanakan pemarkahan kepelbagaian penyedia melalui entropi Shannon untuk meningkatkan pengagihan beban. -**AutoLumpuhkan Sempadan:**Menambahkan togol tetapan Auto Lumpuhkan Akaun Diharamkan ke papan pemuka Resilience.### 🐛 Bug Fixes

-**Keserasian Codex & Claude:**Perbaikan sandaran UI, isu penyepaduan bukan penstriman Codex yang ditambal dan pengesanan masa jalan CLI yang diselesaikan pada Windows. -**Automasi Keluaran:**Kebenaran dikembangkan diperlukan untuk binaan Apl Elektron dalam Tindakan GitHub. -**Masa Jalan Cloudflare:**Mengatasi kod keluar pengasingan masa jalan yang betul untuk komponen terowong Cloudflared.### 🧪 Tests

-**Kemas Kini Suite Ujian:**Liputan ujian diperluaskan untuk pengesan volum, kepelbagaian pembekal, audit konfigurasi dan FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**Kebolehpercayaan CI/CD:**Tindakan GitHub yang ditambal kepada versi pergantungan yang stabil (`actions/checkout@v4`, `actions/upload-artifact@v4`) untuk mengurangkan penamatan persekitaran pembina yang tidak diumumkan. -**Fallback Imej:**Menggantikan rantai sandaran sewenang-wenangnya dalam `ProviderIcon.tsx` dengan pengesahan aset eksplisit untuk menghalang UI memuatkan komponen `<Imej>` untuk fail yang tidak wujud, menghapuskan ralat `404` dalam log konsol papan pemuka (#745). -**Pengemaskini Pentadbir:**Pengesanan pemasangan sumber dinamik untuk Pengemaskini papan pemuka. Lumpuhkan butang `Kemas Kini Sekarang` dengan selamat apabila OmniRoute dibina secara setempat dan bukannya melalui npm, menggesa untuk `git pull` (#743). -**Ralat ERESOLVE Kemas Kini:**Menyuntik `package.json` menimpa untuk `react`/`react-dom` dan mendayakan `--legacy-peer-deps` dalam skrip pengemas kini automatik dalaman untuk menyelesaikan konflik pepohon kebergantungan dengan `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Terowong Cloudflare:**Penyepaduan Terowong Pantas Cloudflare dengan kawalan papan pemuka (PR #772). -**Diagnostik:**Pintasan cache semantik untuk ujian langsung kombo (PR #773).### 🐛 Bug Fixes

-**Kestabilan Penstriman:**Gunakan `FETCH_TIMEOUT_MS` pada panggilan awal `fetch()` permintaan penstriman untuk mengelakkan tamat masa TCP Node.js 300s menyebabkan kegagalan tugas senyap (#769). -**i18n:**Tambahkan entri `windsurf` dan `copilot` yang tiada pada `toolDescriptions` merentas semua 33 fail setempat (#748). -**Audit Pengekodan GLM:**Audit pembekal lengkap membetulkan kelemahan ReDoS, saiz tetingkap konteks (128k/16k) dan penyegerakan pendaftaran model (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**Pembetulan pemprosesan sandaran untuk elemen `type: "text"` yang membawa set data kosong atau kosong yang menyebabkan 400 penolakan (#742). -**Opencode:**Kemas kini penjajaran skema kepada `penyedia` tunggal agar sepadan dengan spesifikasi rasmi (#774). -**Gemini CLI:**Suntikan pengepala kuota pengguna akhir yang tiada yang menghalang 403 penguncian kebenaran (#775). -**Pemulihan DB:**Memfaktorkan semula import muatan berbilang bahagian ke dalam tatasusunan penimbal binari mentah untuk memintas had badan maksimum proksi terbalik (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Penstabilan Pelepasan**— Keluaran v3.2.9 yang dimuktamadkan (diagnostik kombo, gerbang kualiti, pembetulan alat Gemini) dan mencipta teg git yang hilang. Menyatukan semua perubahan berperingkat menjadi komit pelepasan atom tunggal.### 🐛 Bug Fixes

-**Ujian Kemas Kini Auto**— Pernyataan ujian `buildDockerComposeUpdateScript` telah diperbaiki untuk memadankan rujukan pembolehubah shell yang tidak dikembangkan (`$TARGET_TAG`, `${TARGET_TAG#v}`) dalam skrip penggunaan yang dijana, sejajar dengan templat yang difaktorkan semula daripada v3.2.8. -**Ujian Pemutus Litar**— Keraskan `combo-circuit-breaker.test.mjs` dengan menyuntik `maxRetries: 0` untuk mengelakkan cuba semula inflasi daripada memesongkan pernyataan kiraan kegagalan semasa peralihan keadaan pemutus.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Diagnostik Kombo**— Memperkenalkan bendera pintasan ujian langsung (`forceLiveComboTest`) yang membolehkan pentadbir melaksanakan pemeriksaan kesihatan huluan sebenar yang memintas semua mekanisme keadaan pemutus litar dan keadaan bertenang tempatan, membolehkan diagnostik yang tepat semasa gangguan melancarkan (PR #759) -**Quality Gates**— Menambahkan pengesahan kualiti respons automatik untuk kombo dan sokongan model `claude-4.6` yang disepadukan secara rasmi ke dalam skema penghalaan teras (PR #762)### 🐛 Bug Fixes

-**Pengesahan Definisi Alat**— Penyepaduan API Gemini dibaiki dengan menormalkan jenis enum dalam definisi alat, menghalang ralat parameter HTTP 400 huluan (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**UI Kemas Kini Auto Docker**— Mengintegrasikan proses kemas kini latar belakang yang terpisah untuk penempatan Docker Compose. UI Papan Pemuka kini menjejaki peristiwa kitaran hayat kemas kini dengan lancar yang menggabungkan respons JSON REST dengan tindanan kemajuan penstriman SSE untuk kebolehpercayaan merentas persekitaran yang mantap. -**Analitis Cache**— Membaiki pemetaan visualisasi metrik sifar dengan memindahkan log telemetri Semantic Cache terus ke dalam modul SQLite penjejakan terpusat.### 🐛 Bug Fixes

-**Logik Pengesahan**— Memperbaiki pepijat yang gagal menyimpan tetapan papan pemuka atau menambah model dengan ralat 401 Tanpa Kebenaran apabila `requireLogin` telah dilumpuhkan. Titik akhir API kini menilai dengan betul togol pengesahan global. Selesaikan ubah hala global dengan mengaktifkan semula `src/middleware.ts`. -**Pengesanan Alat CLI (Windows)**— Mengelakkan pengecualian permulaan maut semasa pengesanan persekitaran CLI dengan menangkap ralat ENOENT `cross-spawn` dengan betul. Menambah laluan pengesanan eksplisit untuk `\AppData\Local\droid\droid.exe`. -**Laluan Asli Codex**— Parameter terjemahan model ternormal yang menghalang keracunan konteks dalam mod laluan lalu proksi, menguatkuasakan kekangan `store: false` generik secara eksplisit untuk semua permintaan yang berasal dari Codex. -**Pelaporan Token SSE**— Pengesanan `finish_reason` pengesanan `finish_reason` pembekal alat panggilan biasa, membetulkan 0% Analitis penggunaan untuk respons strim sahaja yang tiada penunjuk `<DONE>` yang ketat. -**Teg <think> DeepSeek**— Melaksanakan pemetaan pengekstrakan `<think>` eksplisit di dalam `responsesHandler.ts`, memastikan aliran penaakulan DeepSeek dipetakan setara dengan struktur Anthropic `<thinking>` asli.---

## [3.2.7] - 2026-03-29

### Fixed

-**Kemas Kini UI Lancar**: Ciri "Kemas Kini Sekarang" pada Papan Pemuka kini menyediakan maklum balas secara langsung dan telus menggunakan Acara Dihantar Pelayan (SSE). Ia melaksanakan pemasangan pakej, pembinaan semula modul asli (better-sqlite3), dan PM2 dimulakan semula dengan pasti sambil menunjukkan pemuat masa nyata dan bukannya tergantung secara senyap.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Pendedahan Kunci API (#740)**— Menambah aliran salinan kunci API berskop dalam Pengurus Api, dilindungi oleh pembolehubah persekitaran `ALLOW_API_KEY_REVEAL`. -**Kawalan Keterlihatan Bar Sisi (#739)**— Pentadbir kini boleh menyembunyikan sebarang pautan navigasi bar sisi melalui tetapan Penampilan untuk mengurangkan kekusutan visual. -**Ujian Kombo Ketat (#735)**— Mengeraskan titik akhir pemeriksaan kesihatan kombo untuk memerlukan respons teks langsung daripada model dan bukannya hanya isyarat kebolehcapaian lembut. -**Log Terperinci Distrim (#734)**— Mengelog permintaan terperinci bertukar untuk aliran SSE untuk membina semula muatan akhir, menjimatkan jumlah besar saiz pangkalan data SQLite dan membersihkan UI dengan ketara.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— Membetulkan logik pengepala pengesahan untuk model `minimax` pada OpenCode Go untuk menggunakan `x-api-key` dan bukannya token pembawa standard merentas protokol `/messages`.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**— Templat pembungkusan `xbps-src` bersepadu dan arahan untuk menyusun dan memasang OmniRoute secara asli dengan pengikatan `better-sqlite3` melalui sasaran kompilasi silang.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI Migration (#660)**— Menghijrahkan sepenuhnya penyedia teras `iFlow` legasi ke `Qoder AI` yang mengekalkan keupayaan penghalaan API yang stabil.### 🐛 Bug Fixes

-**Gemini Tools HTTP 400 Payload Invalid Argument (#731)**— Mencegah suntikan tatasusunan `thoughtSignature` di dalam jujukan `functionCall` Gemini standard yang menyekat aliran penghalaan agen.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**UI Kuota Had Penyedia (#728)**— Logik had kuota dinormalkan dan pelabelan data di dalam antara muka Had.### 🐛 Bug Fixes

-**Skema & Kebocoran Penghalaan Teras**— Memperluas `comboStrategySchema` untuk menyokong strategi `isi dahulu` dan `p2c` secara asli untuk menyahsekat penyuntingan kombo yang kompleks secara asli. -**Pengeluaran Teg Berfikir (CLI)**— Pembersih respons token CLI yang distruktur semula RegEx menangkap struktur penaakulan model di dalam strim mengelakkan pengekstrakan `<thinking>` yang rosak memecahkan format output teks respons. -**Penguatkuasaan Format Ketat**— Pelaksanaan sanitasi saluran paip yang mengeras menjadikannya digunakan secara universal pada sasaran mod terjemahan.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Paip Log Permintaan Empat Peringkat (#705)**— Kegigihan log yang difaktorkan semula untuk menyimpan muatan komprehensif pada empat peringkat saluran paip yang berbeza: Permintaan Pelanggan, Permintaan Penyedia Diterjemah, Respons Penyedia dan Respons Pelanggan yang Diterjemah. Memperkenalkan `streamPayloadCollector` untuk pemangkasan aliran SSE yang mantap dan siri muatan.### 🐛 Bug Fixes

-**Pembetulan UI Mudah Alih (#659)**— Menghalang komponen jadual pada papan pemuka daripada memecahkan reka letak pada port pandangan sempit dengan menambahkan penatalan mendatar yang betul dan pembendungan limpahan pada `DashboardLayout`. -**Pembetulan Cache Prompt Claude (#708)**— Memastikan blok `cache_control` dalam gelung sandaran Claude-to-Claude dipelihara dengan betul dan dihantar dengan selamat kembali ke model Anthropic. -**Definisi Alat Gemini (#725)**— Memperbaiki ralat terjemahan skema apabila mengisytiharkan jenis parameter `objek` mudah untuk panggilan fungsi Gemini.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Pembekal Saling Balik Global (#689)**— Apabila semua model kombo kehabisan (502/503), OmniRoute kini mencuba model sandaran global yang boleh dikonfigurasikan sebelum mengembalikan ralat. Tetapkan `globalFallbackModel` dalam tetapan untuk membolehkan.### 🐛 Bug Fixes

-**Betulkan #721**— Pintasan pin konteks tetap semasa respons panggilan alat. Pengetegan bukan penstriman menggunakan laluan JSON yang salah (`json.messages` → `json.choices[0].message`). Suntikan penstriman kini mencetuskan pada bahagian `finish_reason` untuk strim panggilan alat sahaja. `injectModelTag()` kini menambahkan mesej pin sintetik untuk kandungan bukan rentetan. -**Betulkan #709**— Disahkan sudah dibetulkan (v3.1.9) — `system-info.mjs` mencipta direktori secara rekursif. tertutup. -**Betulkan #707**— Disahkan sudah dibetulkan (v3.1.9) — sanitasi nama alat kosong dalam `chatCore.ts`. tertutup.### 🧪 Tests

- Menambahkan 6 ujian unit untuk penyematan konteks dengan respons panggilan alat (kandungan nol, kandungan tatasusunan, perjalanan pergi balik, suntikan semula)## [3.2.0] — 2026-03-28

### ✨ New Features

-**UI Pengurusan Cache**— Menambah papan pemuka caching semantik khusus pada \`/papan pemuka/cache\` dengan penolakan API disasarkan dan sokongan i18n 31 bahasa (PR #701 oleh @oyi77) -**Penjejakan Kuota GLM**— Ditambahkan penggunaan masa nyata dan penjejakan kuota sesi untuk pembekal Pengekodan GLM (Z.AI) (PR #698 oleh @christopher-s) -**Beban Log Terperinci**— Tangkapan muatan saluran paip empat peringkat penuh berwayar (asal, diterjemahkan, respons pembekal, delta terstrim) terus ke dalam UI (PR #705 oleh @rdself)### 🐛 Bug Fixes

-**Betulkan #708**— Menghalang pendarahan token untuk pengguna Claude Code yang menghalakan melalui OmniRoute dengan mengekalkan pengepala \`cache_control\` asli semasa laluan Claude-to-Claude (PR #708 oleh @tombii) -**Betulkan #719**— Sediakan sempadan pengesahan dalaman untuk \`ModelSyncScheduler\` untuk mengelakkan kegagalan daemon yang tidak disahkan semasa permulaan (PR #719 oleh @rdself) -**Betulkan #718**— Penyampaian lencana yang dibina semula dalam UI Had Penyedia yang menghalang pertindihan sempadan kuota buruk (PR #718 oleh @rdself) -**Betulkan #704**— Betulkan Combo Fallback yang pecah pada HTTP 400 ralat dasar kandungan yang menghalang penghalaan mati putaran model (PR #704 oleh @rdself)### 🔒 Security & Dependencies

- Melepasi \`path-to-regexp\` kepada \`8.4.0\` menyelesaikan kelemahan dependabot (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Betulkan #706**— Pembetulan pemaparan sandaran ikon yang disebabkan oleh penggantian `font-sans` Tailwind V4 dengan menggunakan `!penting` pada `.material-symbols-outlined`. -**Betulkan #703**— Membetulkan strim Copilot GitHub yang rosak dengan mendayakan `respons` kepada terjemahan format `openai` untuk mana-mana model tersuai yang memanfaatkan `apiFormat: "respons"`. -**Betulkan #702**— Menggantikan penjejakan penggunaan kadar rata dengan pengiraan harga DB yang tepat untuk kedua-dua respons penstriman dan bukan penstriman. -**Betulkan #716**— Membersihkan keadaan terjemahan panggilan alat Claude, menghuraikan argumen penstriman dengan betul dan menghalang cebisan `tool_calls` OpenAI daripada mengulangi medan `id`.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Paksa Skema**— Auto paksa rentetan yang dikodkan kekangan Skema JSON (cth. `"minimum": "1"`) kepada jenis yang betul, menghalang 400 ralat daripada Kursor, Cline dan pelanggan lain menghantar skema alat yang tidak betul. -**Pembersihan Perihalan Alat**— Pastikan perihalan alat sentiasa bertali; menukar perihalan `null`, `undefined` atau angka kepada rentetan kosong sebelum dihantar kepada pembekal. -**Butang Kosongkan Semua Model**— Menambah terjemahan i18n untuk tindakan pembekal "Kosongkan Semua Model" merentas semua 30 bahasa. -**Eksport Pengesahan Codex**— Menambahkan eksport Codex `auth.json` dan butang terapkan setempat untuk penyepaduan CLI yang lancar. -**Nota Windsurf BYOK**— Menambahkan amaran had rasmi pada kad alat Windsurf CLI yang mendokumentasikan kekangan BYOK.### 🐛 Bug Fixes

-**Betulkan #709**— `system-info.mjs` tidak lagi ranap apabila direktori output tidak wujud (ditambahkan `mkdirSync` dengan bendera rekursif). -**Betulkan #710**— A2A `TaskManager` singleton kini menggunakan `globalThis` untuk mengelakkan kebocoran keadaan merentas penyusunan semula laluan API Next.js dalam mod dev. Suite ujian E2E dikemas kini untuk mengendalikan 401 dengan anggun. -**Betulkan #711**— Menambah penguatkuasaan had `max_tokens` khusus pembekal untuk permintaan huluan. -**Betulkan #605 / #592**— Tanggalkan awalan `proksi_` daripada nama alat dalam respons Claude bukan penstriman; URL pengesahan LongCat tetap. -**Call Logs Max Cap**— Dinaik taraf `getMaxCallLogs()` dengan lapisan caching, env var support (`CALL_LOGS_MAX`), dan integrasi tetapan DB.### 🧪 Tests

- Suite ujian dikembangkan daripada 964 → 1027 ujian (63 ujian baharu)
- Menambahkan `schema-coercion.test.mjs` — 9 ujian untuk paksaan medan angka dan sanitasi perihalan alat
- Menambahkan `t40-opencode-cli-tools-integration.test.mjs` — Ujian integrasi OpenCode/Windsurf CLI
- Cawangan ujian ciri yang dipertingkatkan dengan alatan liputan yang komprehensif### 📁 New Files

| Fail                                                     | Tujuan                                            |
| -------------------------------------------------------- | ------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Paksaan skema dan perihalan alat utiliti sanitasi |
| `tests/unit/schema-coercion.test.mjs`                    | Ujian unit untuk paksaan skema                    |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | Ujian penyepaduan alat CLI                        |
| `COVERAGE_PLAN.md`                                       | Dokumen perancangan liputan ujian                 | ### 🐛 Bug Fixes |

-**Laluan Caching Prompt Claude**— Penanda cache_control tetap dilucutkan dalam mod laluan Claude (Claude → OmniRoute → Claude), yang menyebabkan pengguna Claude Code menghabiskan kuota API Anthropic mereka 5-10x lebih pantas daripada sambungan langsung. OmniRoute kini mengekalkan penanda cache_control klien apabila sourceFormat dan targetFormat adalah Claude, memastikan caching segera berfungsi dengan betul dan secara mendadak mengurangkan penggunaan token.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Teras Platform:**Melaksanakan pengendalian keadaan global untuk Model & Kombo Tersembunyi yang menghalangnya daripada mengacaukan katalog atau bocor ke dalam ejen MCP yang bersambung (#681). -**Kestabilan:**Ranap penstriman ditambal berkaitan dengan penyepaduan pembekal Antigraviti asli gagal disebabkan tatasusunan keadaan tidak ditentukan yang tidak dikendalikan (#684). -**Penyegerakan Penyetempatan:**Digunakan penyegerak `i18n` yang dibaik pulih sepenuhnya yang mengesan sifat JSON bersarang yang hilang dan 30 tempat pemadanan retro secara berurutan (#685).## [3.1.7] - 2026-03-27### 🐛 Bug Fixes

-**Kestabilan Penstriman:**Membetulkan `hasValuableContent` mengembalikan `undefined` untuk bahagian kosong dalam strim SSE (#676). -**Panggilan Alat:**Memperbaiki isu dalam `sseParser.ts` di mana respons Claude tidak menstrim dengan berbilang panggilan alat telah menggugurkan `id` panggilan alat berikutnya disebabkan penyahduplikasi berasaskan indeks yang salah (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Pemulihan Nama Alat Asli Claude**— Nama alat seperti `TodoWrite` tidak lagi diawali dengan `proksi_` dalam respons laluan Claude (kedua-dua penstriman dan bukan penstriman). Termasuk liputan ujian unit (PR #663 oleh @coobabm) -**Kosongkan Semua Model Alias Pembersihan**— Butang "Kosongkan Semua Model" kini turut mengalih keluar alias model yang berkaitan, menghalang model hantu dalam UI (PR #664 oleh @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Reput Automatik Berundur**— Akaun terhad kadar kini pulih secara automatik apabila tetingkap bertenangnya tamat tempoh, membetulkan kebuntuan apabila akaun `Tahap Belakang` yang tinggi dikurangkan keutamaan secara kekal (PR #657 oleh @brendandebeasi)### 🌍 i18n

-**Pembaharuan terjemahan bahasa Cina**— Penulisan semula menyeluruh `zh-CN.json` dengan ketepatan yang dipertingkatkan (PR #658 oleh @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Pembetulan Override Penstriman**— Eksplisit `strim: true` dalam kandungan permintaan kini diutamakan berbanding pengepala `Accept: application/json`. Pelanggan yang menghantar kedua-duanya akan menerima respons penstriman SSE dengan betul (#656)### 🌍 i18n

-**Penambahbaikan rentetan Czech**— Terminologi yang diperhalusi merentas `cs.json` (PR #655 oleh @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 kekunci terjemahan hilang**ditambahkan pada `en.json` dan 12 bahasa (PR #652 oleh @zen0bit) -**Dokumentasi Czech dikemas kini**— CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT panduan (PR #652) -**Skrip pengesahan terjemahan**— `check_translations.py` dan `validate_translation.py` untuk CI/QA (PR #651 oleh @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Kritikal: Regresi Panggilan Alat**— Membetulkan ralat `proxy_Bash` dengan melumpuhkan awalan nama alat `proxy_` dalam laluan laluan Claude. Alat seperti `Bash`, `Read`, `Write` telah dinamakan semula kepada `proxy_Bash`, `proxy_Read`, dsb., menyebabkan Claude menolaknya (#618) -**Dokumentasi Pengharaman Akaun Kiro**— Didokumentasikan sebagai positif palsu anti-penipuan AWS huluan, bukan isu OmniRoute (#649)### 🧪 Tests

-**936 ujian, 0 kegagalan**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Metadata Keupayaan Penglihatan**: Menambahkan entri `capabilities.vision`, `input_modalities` dan `output_modalities` kepada `/v1/models` untuk model berkebolehan penglihatan (PR #646) -**Model Gemini 3.1**: Menambahkan `gemini-3.1-pro-preview` dan `gemini-3.1-flash-lite-preview` kepada pembekal Antigravity (#645)### 🐛 Bug Fixes

-**Ollama Cloud 401 Ralat**: Membetulkan URL asas API yang salah — ditukar daripada `api.ollama.com` kepada `ollama.com/v1/chat/completions` rasmi (#643) -**Cuba Semula Token Tamat Tempoh**: Menambah percubaan semula terhad dengan mundur eksponen (5→10→20 min) untuk sambungan OAuth tamat tempoh dan bukannya melangkaunya secara kekal (PR #647)### 🧪 Tests

-**936 ujian, 0 kegagalan**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**Templat Isu GitHub**: Menambahkan laporan pepijat standard, permintaan ciri dan templat isu konfigurasi/proksi (#641) -**Kosongkan Semua Model**: Menambah butang "Kosongkan Semua Model" pada halaman butiran pembekal dengan sokongan i18n dalam 29 bahasa (#634)### 🐛 Bug Fixes

-**Konflik Tempatan (`in.json`)**: Menamakan semula fail tempatan Hindi daripada `in.json` (kod ISO Indonesia) kepada `hi.json` untuk membetulkan konflik terjemahan dalam Weblate (#642) -**Nama Alat Kosong Codex**: Pembersihan nama alat dialihkan sebelum laluan Codex asli, membetulkan 400 ralat daripada penyedia huluan apabila alat mempunyai nama kosong (#637) -**Penstriman Artifak Baris Baharu**: Menambahkan `collapseExcessiveNewlines` pada sanitizer tindak balas, meruntuhkan larian 3+ baris baharu berturut-turut daripada model pemikiran kepada baris baharu berganda standard (#638) -**Usaha Penaakulan Claude**: Menukar param `reasoning_effort` OpenAI kepada blok belanjawan `berfikir` asli Claude merentas semua laluan permintaan, termasuk pelarasan `maks_tokens` automatik (#627) -**Pemuatan Semula Token Qwen**: Melaksanakan penyegaran semula token OAuth pra-tamat tempoh proaktif (penampan 5 minit) untuk mengelakkan permintaan daripada gagal apabila menggunakan token jangka pendek (#631)### 🧪 Tests

-**936 ujian, 0 kegagalan**(+10 ujian sejak 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**Token NaN dalam Kod Claude / respons klien (#617):**

- `sanitizeUsage()` kini merentas peta `input_tokens`→`prompt_token` dan `output_tokens`→`completion_token` sebelum penapis senarai putih, membetulkan respons yang menunjukkan token NaN/0 dikira apabila pembekal mengembalikan nama medan penggunaan gaya Claude### Keselamatan

- Pakej `yaml` dikemas kini untuk membetulkan kerentanan limpahan tindanan (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Ditutup #613 (Codestral — diselesaikan dengan penyelesaian Penyedia Tersuai)
- Mengulas pada #615 (OpenCode dwi-titik akhir — penyelesaian yang disediakan, dijejaki sebagai permintaan ciri)
- Mengulas pada #618 (keterlihatan panggilan alat — meminta ujian v3.0.9)
- Mengulas pada #627 (tahap usaha — sudah disokong)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Kegagalan Terjemahan untuk Penyedia format OpenAI dalam Claude CLI (#632):**

- Mengendalikan format tatasusunan `reasoning_details[]` daripada StepFun/OpenRouter — tukar kepada `reasoning_content`
- Kendalikan alias medan `penaakulan` daripada sesetengah pembekal → dinormalkan kepada `kandungan_penaakulan`
- Nama medan penggunaan silang peta: `input_tokens`↔`prompt_tokens`, `output_token`↔`completion_tokens` dalam `filterUsageForFormat`
- Betulkan `extractUsage` untuk menerima kedua-dua `input_token`/`output_tokens` dan `prompt_token`/`completion_tokens` sebagai medan penggunaan yang sah
- Digunakan pada kedua-dua laluan penstriman (`sanitizeStreamingChunk`, penterjemah `openai-to-claude.ts`) dan bukan penstriman (`sanitizeMessage`)---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Pemuatan Semula Token Antigraviti:**Ralat `client_secret is missing` telah diperbaiki untuk pengguna yang dipasang npm — `clientSecretDefault` kosong dalam providerRegistry, menyebabkan Google menolak permintaan muat semula token (#588) -**Model Zen OpenCode:**Menambahkan `modelsUrl` pada entri pendaftaran OpenCode Zen supaya "Import daripada /model" berfungsi dengan betul (#612) -**Artifak Penstriman:**Membetulkan baris baharu berlebihan yang ditinggalkan dalam respons selepas pelucutan tandatangan tag pemikiran (#626) -**Proxy Fallback:**Menambah percubaan semula automatik tanpa proksi apabila geganti SOCKS5 gagal -**Ujian Proksi:**Titik akhir ujian kini menyelesaikan bukti kelayakan sebenar daripada DB melalui proxyId### ✨ New Features

-**Akaun Taman Permainan/Pemilih Kunci:**Jatuh turun yang berterusan, sentiasa kelihatan untuk memilih akaun/kunci penyedia tertentu untuk ujian — mengambil semua sambungan semasa permulaan dan penapis oleh pembekal terpilih -**Model Dinamik Alat CLI:**Pemilihan model kini diambil secara dinamik daripada API `/v1/models` — pembekal seperti Kiro kini menunjukkan katalog model penuh mereka -**Senarai Model Antigraviti:**Dikemas kini dengan Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; mendayakan `passthroughModels` untuk akses model dinamik (#628)### 🔧 Maintenance

- Gabungan PR #625 — Penyedia Had pembetulan latar belakang mod cahaya---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Had/Proksi:**Pengambilan had Codex tetap untuk akaun di sebalik proksi SOCKS5 — muat semula token kini dijalankan dalam konteks proksi -**CI:**Ujian integrasi tetap `v1/models` kegagalan penegasan dalam persekitaran CI tanpa sambungan pembekal -**Tetapan:**Butang ujian proksi kini menunjukkan keputusan kejayaan/gagal serta-merta (sebelum ini tersembunyi di sebalik data kesihatan)### ✨ New Features

-**Taman Permainan:**Menambahkan pemilih Akaun lungsur — menguji sambungan tertentu secara individu apabila pembekal mempunyai berbilang akaun### 🔧 Maintenance

- Gabungan PR #623 — Pembetulan laluan URL asas API LongCat---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Had UI:**Menambahkan ciri pengumpulan teg pada papan pemuka sambungan untuk menambah baik organisasi visual untuk akaun dengan teg tersuai.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Penstriman:**Membetulkan `TextDecoder` membetulkan kerosakan dalam kombo `sanitize` TransformStream yang menyebabkan output SSE bercelaru padanan aksara berbilangbait (PR #614) -**UI Penyedia:**Paparkan teg HTML dengan selamat di dalam petua alat ralat sambungan pembekal menggunakan `dangerouslySetInnerHTML` -**Tetapan Proksi:**Menambahkan sifat badan muatan `nama pengguna` dan `kata laluan` yang tiada yang membenarkan proksi yang disahkan berjaya disahkan daripada Papan Pemuka. -**API Penyedia:**Pengecualian lembut terikat kembali ke `getCodexUsage` menghalang kegagalan API HTTP 500 apabila pengambilan token gagal---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Model Auto-Segerak:**Menambah togol UI dan titik akhir `model-segerak` untuk menyegerakkan senarai model secara automatik bagi setiap pembekal menggunakan penjadual selang berjadual (PR #597)### 🐛 Bug Fixes

-**Masa tamat:**Proksi lalai `FETCH_TIMEOUT_MS` dan `STREAM_IDLE_TIMEOUT_MS` dinaikkan kepada 10 minit untuk menyokong model penaakulan mendalam dengan betul (seperti o1) tanpa membatalkan permintaan (Pembetulan #609) -**Pengesanan Alat CLI:**Pengesanan merentas platform yang mengendalikan laluan NVM, Windows `PATHEXT` (mencegah isu pembalut `.cmd`) dan awalan NPM tersuai (PR #598) -**Log Penstriman:**Melaksanakan pengumpulan delta `tool_calls` dalam log respons penstriman supaya panggilan fungsi dijejaki dan diteruskan dengan tepat dalam DB (PR #603) -**Katalog Model:**Pengecualian pengesahan dialih keluar, menyembunyikan model `comfyui` dan `sdwebui` dengan betul apabila tiada pembekal dikonfigurasikan secara eksplisit (PR #599)### 🌐 Translations

-**cs:**Rentetan terjemahan bahasa Czech yang dipertingkatkan merentas apl (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Menambah medan Tag/Kumpulan pada `EditConnectionModal` (disimpan dalam `providerSpecificData.tag`) tanpa memerlukan migrasi skema DB.
- Sambungan dalam paparan pembekal kini dikumpulkan secara dinamik mengikut teg dengan pembahagi visual.
- Sambungan tidak berteg muncul dahulu tanpa pengepala, diikuti oleh kumpulan yang ditag dalam susunan abjad.
- Pengumpulan teg secara automatik digunakan pada bahagian Codex/Copilot/Antigravity Had memandangkan togol wujud di dalam baris sambungan.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Lencana yang tiada pada kad sambungan:**Dibetulkan dengan menggunakan `resolveProxyForConnection()` dan bukannya pemetaan statik. -**Sambungan Ujian dilumpuhkan dalam mod disimpan:**Mendayakan butang Ujian dengan menyelesaikan konfigurasi proksi daripada senarai yang disimpan. -**Pembekuan Modal Config:**Menambahkan panggilan `onClose()` selepas simpan/kosongkan untuk mengelakkan UI daripada membeku. -**Pengiraan penggunaan dua kali:**`ProxyRegistryManager` kini memuatkan penggunaan dengan penuh semangat pada pelekap dengan penyahduplikasian oleh `skop` + `scopeId`. Kiraan penggunaan telah digantikan dengan butang Ujian yang memaparkan IP/kependaman sebaris.#### fix(translator): `function_call` prefix stripping

- Membaiki pembetulan yang tidak lengkap daripada PR #607 di mana hanya blok `tool_use` melucutkan awalan alat `proxy_` Claude. Kini, pelanggan yang menggunakan format OpenAI Responses API juga akan menerima alatan alat dengan betul tanpa awalan `proksi_`.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Tiga regresi kritikal yang dilaporkan oleh pengguna selepas pelancaran v3.0.0 telah diselesaikan.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Awalan `proksi_` yang ditambahkan oleh Claude OAuth hanya dilucutkan daripada**menstrim**respons. Dalam mod**bukan penstriman**, `translateNonStreamingResponse` tidak mempunyai akses kepada `toolNameMap`, menyebabkan pelanggan menerima nama alat yang rosak seperti `proxy_read_file` dan bukannya `read_file`.

**Betulkan:**Menambah parameter `toolNameMap` pada `translateNonStreamingResponse` dan menggunakan pelucutan awalan dalam pengendali blok `tool_use` Claude. `chatCore.ts` kini melalui peta.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI tidak mendedahkan `GET /v1/models`. Pengesah generik `validateOpenAICompatibleProvider` gagal untuk menyelesaikan sembang hanya jika `validationModelId` ditetapkan, yang tidak dikonfigurasi oleh LongCat. Ini menyebabkan pengesahan pembekal gagal dengan ralat yang mengelirukan pada tambah/simpan.

**Betulkan:**Menambahkan `longcat` pada peta pengesah khusus, meneliti `/chat/completions` secara langsung dan menganggap sebarang respons bukan pengesahan sebagai pas.#### fix(translator): normalize object tool schemas for Anthropic (#595)

Alat MCP (cth. `pensel`, `penggunaan_komputer`) takrifan alat hadapan dengan `{type:"object"}` tetapi tanpa medan `properties`. API Anthropic menolak ini dengan: `skema objek tiada sifat`.

**Betulkan:**Dalam `openai-to-claude.ts`, masukkan `properties: {}` sebagai lalai selamat apabila `type` ialah `"objek"` dan `properties` tiada.---

### 🔀 Community PRs Merged (2)

| PR       | Pengarang | Ringkasan                                                                       |
| -------- | --------- | ------------------------------------------------------------------------------- | --- |
| **#589** | @floba3   | docs(i18n): betulkan terjemahan bahasa Rusia untuk Playground dan Testbed       |
| **#591** | @rdself   | fix(ui): tingkatkan kontras mod cahaya Had Penyedia dan paparan peringkat pelan | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 ujian, 0 kegagalan**(tidak berubah daripada v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Keluaran terbesar yang pernah ada.**Daripada 36 pembekal dalam v2.9.5 kepada**67+ penyedia**dalam v3.0.0 — dengan Pelayan MCP, Protokol A2A, enjin kombo auto, Ikon Pembekal, API Kunci Berdaftar, ujian 926 dan sumbangan daripada**12 ahli komuniti**merentas**10 PR gabungan**.
>
> Disatukan daripada v3.0.0-rc.1 hingga rc.17 (17 calon pelepasan selama 3 hari pembangunan sengit).---

### 🆕 New Providers (+31 since v2.9.5)

| Pembekal                     | Alias ​​         | Peringkat        | Nota                                                                                 |
| ---------------------------- | ---------------- | ---------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **OpenCode Zen**             | `opencode-zen`   | Percuma          | 3 model melalui `opencode.ai/zen/v1` (PR #530 oleh @kang-heewon)                     |
| **OpenCode Go**              | `opencode-go`    | Dibayar          | 4 model melalui `opencode.ai/zen/go/v1` (PR #530 oleh @kang-heewon)                  |
| **LongCat AI**               | `lc`             | Percuma          | 50 juta token/hari (Flash-Lite) + 500K/hari (Sembang/Berfikir) semasa beta awam      |
| **Pendebungaan AI**          | `pol`            | Percuma          | Tiada kunci API diperlukan — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s) |
| **Cloudflare Workers AI**    | `cf`             | Percuma          | 10K Neuron/hari — ~150 respons LLM atau 500s Bisikan audio, inferens tepi            |
| **Scaleway AI**              | `scw`            | Percuma          | Token percuma 1 juta untuk akaun baharu — patuh EU/GDPR (Paris)                      |
| **AI/ML API**                | `tujuan`         | Percuma          | Kredit percuma $0.025/hari — 200+ model melalui titik akhir tunggal                  |
| **Puter AI**                 | `pu`             | Percuma          | 500+ model (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                 |
| **Awan Alibaba (DashScope)** | `ali`            | Dibayar          | Titik akhir Antarabangsa + China melalui `alicode`/`alicode-intl`                    |
| **Pelan Pengekodan Alibaba** | `bcp`            | Dibayar          | Studio Model Alibaba dengan API serasi Anthropic                                     |
| **Kimi Coding (API Key)**    | `kmca`           | Dibayar          | Akses Kimi berasaskan kunci API khusus (berasingan daripada OAuth)                   |
| **Pengekodan MiniMax**       | `minimaks`       | Dibayar          | Titik akhir antarabangsa                                                             |
| **MiniMax (China)**          | `minimax-cn`     | Dibayar          | Titik akhir khusus China                                                             |
| **Z.AI (GLM-5)**             | `zai`            | Dibayar          | Model GLM generasi seterusnya Zhipu AI                                               |
| **Vertex AI**                | `bucu`           | Dibayar          | Google Cloud — Akaun Perkhidmatan JSON atau OAuth access_token                       |
| **Awan Ollama**              | `ollamacloud`    | Dibayar          | Perkhidmatan API dihoskan Ollama                                                     |
| **Sintetik**                 | `sintetik`       | Dibayar          | Gerbang model laluan                                                                 |
| **Kilo Gateway**             | `kg`             | Dibayar          | Gerbang model laluan                                                                 |
| **Carian Kebingungan**       | `pplx-search`    | Dibayar          | Titik akhir berasaskan carian khusus                                                 |
| **Serper Search**            | `serper-search`  | Dibayar          | Penyepaduan API carian web                                                           |
| **Pencarian Berani**         | `berani-mencari` | Dibayar          | Penyepaduan API Carian Berani                                                        |
| **Carian Exa**               | `exa-search`     | Dibayar          | Penyepaduan API carian saraf                                                         |
| **Carian Tavily**            | `tavily-search`  | Dibayar          | Penyepaduan API carian AI                                                            |
| **NanoBanana**               | `nb`             | Dibayar          | API penjanaan imej                                                                   |
| **ElevenLabs**               | `el`             | Dibayar          | Sintesis suara teks ke pertuturan                                                    |
| **Cartesia**                 | `cartesia`       | Dibayar          | Sintesis suara TTS sangat pantas                                                     |
| **PlayHT**                   | `playht`         | Dibayar          | Pengklonan suara dan TTS                                                             |
| **Inworld**                  | `dunia`          | Dibayar          | Sembang suara watak AI                                                               |
| **SD WebUI**                 | `sdwebui`        | Dihoskan sendiri | Penjanaan imej tempatan Resapan Stabil                                               |
| **ComfyUI**                  | `comfyui`        | Dihoskan sendiri | ComfyUI aliran kerja tempatan penjanaan berasaskan nod                               |
| **Pengekodan GLM**           | `glm`            | Dibayar          | Titik akhir khusus pengekodan BigModel/Zhipu                                         | **Jumlah: 67+ pembekal**(4 Percuma, 8 OAuth, 55 API Key) + pembekal tersuai OpenAI/Anthropic-Compatible tanpa had.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Autojana dan keluarkan kunci API OmniRoute secara pengaturcaraan dengan penguatkuasaan kuota setiap penyedia dan setiap akaun.

| Titik akhir                     | Kaedah           | Penerangan                                                          |
| ------------------------------- | ---------------- | ------------------------------------------------------------------- |
| `/api/v1/kunci-berdaftar`       | `POST`           | Keluarkan kunci baharu — kunci mentah dikembalikan**sekali sahaja** |
| `/api/v1/kunci-berdaftar`       | `DAPAT`          | Senaraikan kunci berdaftar (bertopeng)                              |
| `/api/v1/registered-keys/{id}`  | `DAPATKAN/PADAM` | Dapatkan metadata / Batalkan                                        |
| `/api/v1/quotas/check`          | `DAPAT`          | Pra-sahkan kuota sebelum mengeluarkan                               |
| `/api/v1/providers/{id}/limits` | `DAPAT/LETAK`    | Konfigurasikan had pengeluaran setiap pembekal                      |
| `/api/v1/accounts/{id}/limits`  | `DAPAT/LETAK`    | Konfigurasikan had pengeluaran setiap akaun                         |
| `/api/v1/isu/laporan`           | `POST`           | Laporkan peristiwa kuota kepada Isu GitHub                          |

**Keselamatan:**Kunci disimpan sebagai cincang SHA-256. Kunci mentah ditunjukkan sekali pada penciptaan, tidak boleh diperolehi semula.#### 🎨 Provider Icons via @lobehub/icons (#529)

130+ logo pembekal menggunakan komponen React `@lobehub/icons` (SVG). Rantaian mundur:**Lobehub SVG → PNG sedia ada → ikon generik**. Digunakan merentas halaman Papan Pemuka, Pembekal dan Ejen dengan komponen `ProviderIcon` yang standard.#### 🔄 Model Auto-Sync Scheduler (#488)

Auto muat semula senarai model untuk pembekal yang disambungkan setiap**24 jam**. Berjalan pada permulaan pelayan. Boleh dikonfigurasikan melalui `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Petakan corak nama model (glob) kepada kombo khusus untuk penghalaan automatik:

- `claude-sonnet*` → kombo-kod, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Jadual `model_combo_mappings` baharu dengan padanan glob-to-regex
- Bahagian UI Papan Pemuka: "Peraturan Penghalaan Model" dengan tambah/edit/togol/padam sebaris#### 🧭 API Endpoints Dashboard

Katalog interaktif, pengurusan webhooks, pemapar OpenAPI — semuanya dalam satu halaman tab di `/papan pemuka/titik akhir`.#### 🔍 Web Search Providers

5 penyepaduan penyedia carian baharu:**Carian Perplexity**,**Serper**,**Brave Search**,**Exa**,**Tavily**— mendayakan respons AI berasaskan data web masa nyata.#### 📊 Search Analytics

Tab baharu dalam `/papan pemuka/analitik` — pecahan penyedia, kadar hit cache, penjejakan kos. API: `DAPATKAN /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Lajur `max_requests_per_day` dan `max_requests_per_minute` dengan penguatkuasaan tetingkap gelongsor dalam memori yang mengembalikan HTTP 429.#### 🎵 Media Playground

Taman permainan penjanaan media penuh di `/papan pemuka/media`: Penjanaan Imej, Video, Muzik, Transkripsi Audio (had muat naik 2GB) dan Teks ke Pertuturan.---

### 🔒 Security & CI/CD

-**Pemulihan CodeQL**— Memperbaiki 10+ makluman: 6 polinomial-redos, 1 tidak selamat-rawak (`Math.random()` → `crypto.randomUUID()`), 1 shell-command-injection -**Pengesahan laluan**— Skema Zod + `validateBody()` pada**laluan API 176/176**— CI dikuatkuasakan -**CVE fix**— dompurify XSS vulnerability (GHSA-v2wj-7wpq-c8vv) diselesaikan melalui npm overrides -**Diratakan**— Terlanggar 3.3.3 → 3.4.2 (pencemaran prototaip CWE-1321) -**Docker**— Dinaik taraf `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: jelaskan ralat yang boleh diambil tindakan apabila `GEMINI_OAUTH_CLIENT_SECRET` tiada dalam Docker -**#549**— Laluan tetapan CLI kini menyelesaikan kunci API sebenar daripada `keyId` (bukan rentetan bertopeng) -**#574**— Log masuk tidak lagi membeku selepas melangkau persediaan kata laluan wizard -**#506**— Cross-platform `machineId` ditulis semula (Windows REG.exe → macOS ioreg → Linux → nama hos sandaran)#### Providers & Routing

-**#536**— LongCat AI: `baseUrl` dan `authHeader` tetap -**#535**— Ganti model disemat: `body.model` ditetapkan dengan betul kepada `pinnedModel` -**#570**— Model Claude yang tidak ditetapkan kini diselesaikan kepada pembekal Anthropic -**#585**— teg dalaman `<omniModel>` tidak lagi bocor kepada pelanggan dalam penstriman SSE -**#493**— Penamaan model pembekal tersuai tidak lagi terjejas oleh pelucutan awalan -**#490**— Penstriman + perlindungan cache konteks melalui suntikan `TransformStream` -**#511**— Teg `<omniModel>` disuntik ke dalam bahagian kandungan pertama (bukan selepas `[SELESAI]`)#### CLI & Tools

-**#527**— Kod Claude + Gelung Codex: blok `tool_result` kini ditukar kepada teks -**#524**— Konfigurasi OpenCode disimpan dengan betul (XDG_CONFIG_HOME, format TOML) -**#522**— Pengurus API: mengalih keluar butang "Salin kunci bertopeng" yang mengelirukan -**#546**— `--version` mengembalikan `tidak diketahui` pada Windows (PR oleh @k0valik) -**#544**— Pengesanan alat CLI selamat melalui laluan pemasangan yang diketahui (PR oleh @k0valik) -**#510**— Laluan Windows MSYS2/Git-Bash dinormalkan secara automatik -**#492**— CLI mengesan `mise`/`nvm`-managed Node apabila `app/server.js` tiada#### Streaming & SSE

-**PR #587**— Balikkan import `resolveDataDir` dalam responsTransformer for Cloudflare Workers compat (@k0valik) -**PR #495**— Bottleneck 429 penantian tanpa had: berhenti kerja menunggu pada had kadar (@xandr0s) -**#483**— Berhenti mengekori `data: null` selepas isyarat `[DONE]` -**#473**— Strim Zombie SSE: tamat masa dikurangkan 300s → 120s untuk sandaran yang lebih pantas#### Media & Transcription

-**Transkripsi**— Deepgram `video/mp4` → `audio/mp4` pemetaan MIME, pengesanan bahasa automatik, tanda baca -**TTS**— Paparan ralat `[objek Objek]` dibetulkan untuk ralat bersarang gaya ElevenLabs -**Had muat naik**— Transkripsi media meningkat kepada 2GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— lajur `requested_model` dalam log panggilan (migrasi 009) -**T02**— Keluarkan blok teks kosong daripada `tool_result.content` bersarang -**T03**— Parse `x-codex-5h-*` / `x-codex-7d-*` pengepala kuota -**T04**— Pengepala `X-Session-Id` untuk penghalaan melekit luaran -**T05**— Kegigihan DB had kadar dengan API khusus -**T06**— Akaun dinyahaktifkan → blok kekal (bertenang 1 tahun) -**T07**— X-Forwarded-Untuk pengesahan IP (`extractClientIp()`) -**T08**— Had sesi setiap kunci API dengan penguatkuasaan tetingkap gelongsor -**T09**— Skop had kadar Codex lwn Spark (kumpulan berasingan) -**T10**— Kredit habis → sandaran bertenang 1j yang berbeza -**T11**— usaha penaakulan `maks` → 131072 token belanjawan -**T12**— Entri harga MiniMax M2.7 -**T13**— Pembetulan paparan kuota basi (kesedaran semula tetingkap) -**T14**— Pemeriksaan TCP cepat gagal proksi (≤2s, cache 30s) -**T15**— Normalisasi kandungan tatasusunan untuk Anthropic -**T23**— Saling balik set semula kuota pintar (pengeluaran pengepala) -**T24**— `503` cooldown + `406` pemetaan -**T25**— Sandaran pengesahan pembekal -**T29**— Vertex AI Service Account JWT auth -**T33**— Tahap pemikiran kepada penukaran belanjawan -**T36**— klasifikasi ralat `403` lwn `429` -**T38**— Spesifikasi model terpusat (`modelSpecs.ts`) -**T39**— Pengunduran titik akhir untuk `fetchAvailableModels` -**T41**— Ubah hala auto tugas latar belakang kepada model kilat -**T42**— Pemetaan nisbah aspek penjanaan imej#### Other Improvements

-**Pengepala tersuai huluan setiap model**— melalui UI konfigurasi (PR #575 oleh @zhangqiang8vip) -**Panjang konteks model**— boleh dikonfigurasikan dalam metadata model (PR #578 oleh @hijak) -**Pelucutan awalan model**— pilihan untuk mengalih keluar awalan pembekal daripada nama model (PR #582 oleh @jay77721) -**penamatan Gemini CLI**— ditandai sebagai tidak digunakan dengan amaran sekatan OAuth Google -**penghuraikan YAML**— menggantikan penghurai tersuai dengan `js-yaml` untuk penghuraian spesifikasi OpenAPI yang betul -**ZWS v5**— Pembetulan kebocoran HMR (sambungan 485 DB → 1, memori 2.4GB → 195MB) -**Eksport log**— Butang eksport JSON baharu pada papan pemuka dengan lungsur julat masa -**Kemas kini sepanduk pemberitahuan**— halaman utama papan pemuka menunjukkan apabila versi baharu tersedia---

### 🌐 i18n & Documentation

-**30 bahasa**pada pariti 100% — 2,788 kekunci hilang disegerakkan -**Czech**— Terjemahan penuh: 22 dokumen, 2,606 rentetan UI (PR oleh @zen0bit) -**Bahasa Cina (zh-CN)**— Terjemahan semula lengkap (PR oleh @only4copilot) -**Panduan Penggunaan VM**— Diterjemah ke Bahasa Inggeris sebagai dokumen sumber -**Rujukan API**— Menambah titik akhir `/v1/embeddings` dan `/v1/audio/speech` -**Bilangan pembekal**— Dikemas kini daripada 36+/40+/44+ kepada**67+**merentas README dan kesemua 30 i18n README---

### 🔀 Community PRs Merged (10)

| PR       | Pengarang       | Ringkasan                                                                  |
| -------- | --------------- | -------------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): kembalikan import resolveDataDir untuk Cloudflare Workers compat |
| **#582** | @jay77721       | feat(proksi): pilihan pelucutan awalan nama model                          |
| **#581** | @jay77721       | fix(npm): pautkan pelepasan elektron ke aliran kerja terbitan npm          |
| **#578** | @hijak          | prestasi: panjang konteks boleh dikonfigurasikan dalam metadata model      |
| **#575** | @zhangqiang8vip | prestasi: pengepala hulu setiap model, PATCH kompati, penjajaran sembang   |
| **#562** | @coobabm        | betulkan: pengurusan sesi MCP, laluan Claude, detectFormat                 |
| **#561** | @zen0bit        | fix(i18n): Pembetulan terjemahan bahasa Czech                              |
| **#555** | @k0valik        | fix(sse): `resolveDataDir()` terpusat untuk resolusi laluan                |
| **#546** | @k0valik        | fix(cli): `--version` mengembalikan `tidak diketahui` pada Windows         |
| **#544** | @k0valik        | fix(cli): selamat pengesanan alat CLI melalui laluan pemasangan            |
| **#542** | @rdself         | fix(ui): pembolehubah tema CSS kontras mod cahaya                          |
| **#530** | @kang-heewon    | feat: Pembekal OpenCode Zen + Go dengan `OpencodeExecutor`                 |
| **#512** | @zhangqiang8vip | prestasi: keserasian model per-protokol (`compatByProtocol`)               |
| **#497** | @zhangqiang8vip | betulkan: kebocoran sumber HMR mod dev (ZWS v5)                            |
| **#495** | @xandr0s        | betulkan: Bottleneck 429 menunggu tanpa had (lepas kerja menunggu)         |
| **#494** | @zhangqiang8vip | feat: pembangun MiniMax→pembetulan peranan sistem                          |
| **#480** | @prakersh       | betulkan: strim pengekstrakan penggunaan flush                             |
| **#479** | @prakersh       | prestasi: Codex 5.3/5.4 dan penyertaan harga Anthropic                     |
| **#475** | @only4copilot   | feat(i18n): terjemahan bahasa Cina yang dipertingkatkan                    |

**Terima kasih kepada semua penyumbang!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#491` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` ``#531` `#531` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 ujian, 0 kegagalan**(naik daripada 821 dalam v2.9.5)

- +105 ujian baharu meliputi: pemetaan model-kombo, kunci berdaftar, OpencodeExecutor, penyedia Bailian, pengesahan laluan, klasifikasi ralat, pemetaan nisbah aspek dan banyak lagi---

### 📦 Database Migrations

| Penghijrahan | Penerangan                                                        |
| ------------ | ----------------------------------------------------------------- | --- |
| **008**      | Jadual `kunci_berdaftar`, `had_kunci_pembekal`, `had_kunci_akaun` |
| **009**      | lajur `model_diminta` dalam `log_panggilan`                       |
| **010**      | Jadual `model_combo_mappings` untuk penghalaan kombo setiap model | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Perubahan pecah:**Tiada. Semua konfigurasi, kombo dan kunci API sedia ada dikekalkan.
> Penghijrahan pangkalan data 008-010 dijalankan secara automatik semasa permulaan.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**Pemulihan CodeQL**— Memperbaiki 10+ makluman:

- 6 polinomial-redos dalam `provider.ts` / `chatCore.ts` (menggantikan `(?:^|/)` corak seli dengan padanan berasaskan segmen)
- 1 rawak-tidak selamat dalam `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 shell-command-injection dalam `prepublish.mjs` (`JSON.stringify()` laluan melarikan diri) -**Pengesahan laluan**— Menambahkan skema Zod + `validateBody()` kepada 5 laluan yang tiada pengesahan:
- `model-combo-mappings` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` kini berlalu:**176/176 laluan disahkan**### 🐛 Bug Fixes

-**#585**— Teg dalaman `<omniModel>` tidak lagi bocor kepada pelanggan dalam respons SSE. Menambahkan sanitasi keluar `TransformStream` dalam `combo.ts`### ⚙️ Infrastructure

-**Docker**— Dinaik taraf `docker/setup-buildx-action` daripada v3 → v4 (Pembetulan penamatan Node.js 20) -**Pembersihan CI**— Memadamkan 150+ aliran kerja yang gagal/dibatalkan### 🧪 Tests

- Suite ujian:**926 ujian, 0 kegagalan**(+3 baharu)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Peningkatan had transkripsi media
- Menambahkan Panjang Konteks Model pada metadata pendaftaran
- Menambah pengepala tersuai huluan setiap model melalui UI konfigurasi
- Membetulkan berbilang pepijat, pengesahan Zod untuk tampung, dan menyelesaikan pelbagai isu komuniti.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Per-model Combo Routing: petakan corak nama model (glob) kepada kombo khusus untuk penghalaan automatik

- Jadual `model_combo_mappings` baharu (penghijrahan 010) dengan corak, kombo_id, keutamaan, didayakan
- Fungsi DB `resolveComboForModel()` dengan padanan glob-to-regex (kad bebas huruf besar-kecil, `*` dan `?`)
- `getComboForModel()` dalam `model.ts`: menambah `getCombo()` dengan model-pattern fallback
- `chat.ts`: keputusan penghalaan kini menyemak pemetaan model-kombo sebelum pengendalian model tunggal
- API: `DAPATKAN/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Papan pemuka: bahagian "Peraturan Penghalaan Model" ditambahkan pada halaman Kombo dengan tambah/edit/togol/padam sebaris
- Contoh: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Penyegerakan i18n Penuh**: 2,788 kekunci hilang ditambah merentas 30 fail bahasa — semua bahasa kini pada pariti 100% dengan `en.json` -**Halaman ejen i18n**: Bahagian Integrasi OpenCode diantarabangsakan sepenuhnya (tajuk, penerangan, pengimbasan, muat turun label) -**6 kunci baharu**ditambahkan pada ruang nama `agen` untuk bahagian OpenCode### 🎨 UI/UX

-**Ikon Pembekal**: 16 ikon pembekal hilang ditambah (3 disalin, 2 dimuat turun, 11 SVG dibuat) -**Sandaran SVG**: Komponen `ProviderIcon` dikemas kini dengan strategi 4 peringkat: Lobehub → PNG → SVG → Ikon generik -**Ejen cap jari**: Disegerakkan dengan alat CLI — menambahkan droid, openclaw, copilot, opencode pada senarai cap jari (14 jumlah)### Keselamatan

-**Pembetulan CVE**: Penyelesaian dompurify XSS kelemahan (GHSA-v2wj-7wpq-c8vv) melalui npm mengatasi memaksa `dompurify@^3.3.2`

- `audit npm` kini melaporkan**0 kelemahan**### 🧪 Tests

- Suite ujian:**923 ujian, 0 kegagalan**(+15 ujian pemetaan model-kombo baharu)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Pengarang | Ringkasan                                                                                   |
| -------- | --------- | ------------------------------------------------------------------------------------------- | ------------ |
| **#562** | @coobabm  | fix(ux): Pengurusan sesi MCP, penormalan laluan Claude, modal OAuth, detectFormat           |
| **#561** | @zen0bit  | fix(i18n): Pembetulan terjemahan bahasa Czech — Nama kaedah HTTP dan kemas kini dokumentasi | ### 🧪 Tests |

- Suite ujian:**908 ujian, 0 kegagalan**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**selesaikan kunci API sebenar daripada `keyId` dalam laluan tetapan CLI (`codex-settings`, `droid-settings`, `kilo-settings`) untuk mengelakkan menulis rentetan bertopeng (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Pengarang | Ringkasan                                                                                                                                                                          |
| -------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik  | fix(cli): `--version` mengembalikan `tidak diketahui` pada Windows — gunakan `JSON.parse(readFileSync)` dan bukannya import ESM                                                    |
| **#555** | @k0valik  | fix(sse): `resolveDataDir()` terpusat untuk resolusi laluan dalam kelayakan, autoCombo, logger respons dan logger permintaan                                                       |
| **#544** | @k0valik  | fix(cli): pengesanan alat CLI selamat melalui laluan pemasangan yang diketahui (8 alatan) dengan pengesahan symlink, semakan jenis fail, had saiz, env minimum dalam healthcheck   |
| **#542** | @rdself   | fix(ui): tingkatkan kontras mod cahaya — tambahkan pembolehubah tema CSS yang hilang (`bg-primary`, `bg-subtle`, `text-primary`) dan betulkan warna gelap sahaja dalam butiran log | ### 🔧 Bug Fixes |

-**Pembetulan TDZ dalam `cliRuntime.ts`**— `validateEnvPath` telah digunakan sebelum permulaan pada permulaan modul oleh `getExpectedParentPaths()`. Pengisytiharan disusun semula untuk membetulkan `ReferenceError`. -**Pembetulan binaan**— Menambahkan `pino` dan `pino-pretty` pada `serverExternalPackages` untuk menghalang Turbopack daripada memecahkan pemuatan pekerja dalaman Pino.### 🧪 Tests

- Suite ujian:**905 ujian, 0 kegagalan**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Regresi binaan elektron: diturunkan taraf Next.js daripada `16.1.x` kepada `16.0.10` untuk menghapuskan ketidakstabilan pencincangan modul Turbopack yang menyebabkan skrin kosong dalam berkas desktop Electron. -**Pembetulan ujian unit**— Membetulkan dua pernyataan ujian lapuk (nisbah/peleraian aspek `penangan-imej-nanobanana`, pemetaan medan `berfikir-belanjawan` Gemini `thinkingConfig`) yang telah hanyut selepas perubahan pelaksanaan baru-baru ini. -**#541**— Menjawab maklum balas pengguna tentang kerumitan pemasangan; tiada perubahan kod diperlukan.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: dilaksanakan menggunakan perpustakaan `jose` untuk mengendalikan pengesahan Akaun JWT/Service, bersama-sama dengan wilayah boleh dikonfigurasikan dalam UI dan pembinaan URL model rakan kongsi automatik. -**T42**— Pemetaan nisbah aspek penjanaan imej: mencipta logik `sizeMapper` untuk format OpenAI generik (`saiz`), menambahkan pengendalian `imagen3` asli dan titik akhir NanoBanana yang dikemas kini untuk menggunakan nisbah bidang yang dipetakan secara automatik. -**T38**— Spesifikasi model berpusat: `modelSpecs.ts` dicipta untuk had dan parameter setiap model.### 🔧 Improvements

-**T40**— Penyepaduan alatan OpenCode CLI: penyepaduan `opencode-zen` dan `opencode-go` asli yang dilengkapkan dalam PR terdahulu.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— `503` cooldown menunggu pembaikan + `406` pemetaan: dipetakan `406 Not Acceptable` kepada `503 Service Unavailable` dengan selang masa cooldown yang betul. -**T25**— Sandaran pengesahan pembekal: sandaran anggun kepada model pengesahan standard apabila `validationModelId` tertentu tidak ada. -**T36**— Pemurnian pengendalian pembekal `403` lwn `429`: diekstrak ke dalam `errorClassifier.ts` untuk mengasingkan kegagalan kebenaran keras dengan betul (`403`) daripada had kadar (`429`). -**T39**— Endpoint Fallback untuk `fetchAvailableModels`: melaksanakan mekanisme tiga peringkat (`/models` -> `/v1/models` -> katalog generik tempatan) + `list_models_catalog` kemas kini alat MCP untuk mencerminkan `sumber` dan `amaran`. -**T33**— Tahap pemikiran kepada penukaran belanjawan: menterjemah tahap pemikiran kualitatif kepada peruntukan belanjawan yang tepat. -**T41**— Ubah hala auto tugas latar belakang: laluan tugasan penilaian latar belakang yang berat kepada model berkelip/cekap secara automatik. -**T23**— Saling balik tetapan semula kuota pintar: mengekstrak nilai pengepala `x-ratelimit-reset` / `retry-after` secara tepat atau memetakan tempoh bertenang statik.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Naik taraf daripada v2.9.5:**16 isu diselesaikan · 2 PR komuniti digabungkan · 2 penyedia baharu · 7 titik akhir API baharu · 3 ciri baharu · Penghijrahan DB 008+009 · 832 ujian lulus · 15 peningkatan jurang sub2api (T01–T15 selesai).### 🆕 New Providers

| Pembekal         | Alias ​​       | Peringkat | Nota                                                                |
| ---------------- | -------------- | --------- | ------------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | Percuma   | 3 model melalui `opencode.ai/zen/v1` (PR #530 oleh @kang-heewon)    |
| **OpenCode Go**  | `opencode-go`  | Dibayar   | 4 model melalui `opencode.ai/zen/go/v1` (PR #530 oleh @kang-heewon) |

Kedua-dua pembekal menggunakan `OpencodeExecutor` baharu dengan penghalaan berbilang format (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Autojana dan keluarkan kunci API OmniRoute secara pengaturcaraan dengan penguatkuasaan kuota setiap penyedia dan setiap akaun.

| Titik akhir                           | Kaedah        | Penerangan                                                          |
| ------------------------------------- | ------------- | ------------------------------------------------------------------- |
| `/api/v1/kunci-berdaftar`             | `POST`        | Keluarkan kunci baharu — kunci mentah dikembalikan**sekali sahaja** |
| `/api/v1/kunci-berdaftar`             | `DAPAT`       | Senaraikan kunci berdaftar (bertopeng)                              |
| `/api/v1/registered-keys/{id}`        | `DAPAT`       | Dapatkan metadata utama                                             |
| `/api/v1/registered-keys/{id}`        | `PADAM`       | Batalkan kunci                                                      |
| `/api/v1/registered-keys/{id}/revoke` | `POST`        | Batal (untuk pelanggan tanpa DELETE sokongan)                       |
| `/api/v1/quotas/check`                | `DAPAT`       | Pra-sahkan kuota sebelum mengeluarkan                               |
| `/api/v1/providers/{id}/limits`       | `DAPAT/LETAK` | Konfigurasikan had pengeluaran setiap pembekal                      |
| `/api/v1/accounts/{id}/limits`        | `DAPAT/LETAK` | Konfigurasikan had pengeluaran setiap akaun                         |
| `/api/v1/isu/laporan`                 | `POST`        | Laporkan peristiwa kuota kepada Isu GitHub                          |

**DB — Migration 008:**Tiga jadual baharu: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Keselamatan:**Kunci disimpan sebagai cincang SHA-256. Kunci mentah ditunjukkan sekali pada penciptaan, tidak boleh diperolehi semula.
**Jenis kuota:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` setiap pembekal dan setiap akaun.
**Idempotensi:**Medan `idempotency_key` menghalang pengeluaran pendua. Mengembalikan `409 IDEMPOTENCY_CONFLICT` jika kunci telah digunakan.
**Belanjawan setiap kunci:**`Anggaran harian` / `Anggaran setiap jam` — mengehadkan bilangan permintaan yang boleh dihalakan oleh kunci setiap tetingkap.
**Pelaporan GitHub:**Pilihan. Tetapkan `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` untuk mencipta isu GitHub secara automatik apabila kuota melebihi kuota atau kegagalan pengeluaran.#### 🎨 Provider Icons — @lobehub/icons (#529)

Semua ikon penyedia dalam papan pemuka kini menggunakan komponen React `@lobehub/icons` (130+ pembekal dengan SVG).
Rantaian mundur:**Lobehub SVG → `/penyedia/{id}.png` sedia ada → ikon generik**. Menggunakan corak `ErrorBoundary` React yang betul.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute kini memuat semula senarai model secara automatik untuk pembekal yang disambungkan setiap**24 jam**.

- Berjalan pada permulaan pelayan melalui cangkuk `/api/sync/initialize` sedia ada
- Boleh dikonfigurasikan melalui pembolehubah persekitaran `MODEL_SYNC_INTERVAL_HOURS`
- Meliputi 16 pembekal utama
- Merekod masa penyegerakan terakhir dalam pangkalan data tetapan---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Kosongkan ralat yang boleh diambil tindakan apabila `GEMINI_OAUTH_CLIENT_SECRET` tiada dalam penempatan Docker/hos sendiri. Sebelum ini menunjukkan rahsia `client_secret is missing` daripada Google. Sekarang menyediakan arahan `docker-compose.yml` dan `~/.omniroute/.env` tertentu.#### Providers & Routing

-**#536 — LongCat AI:**Membetulkan `baseUrl` (`api.longcat.chat/openai`) dan `authHeader` (`Keizinan: Pembawa`). -**#535 — Pinned model override:**`body.model` kini ditetapkan dengan betul kepada `pinnedModel` apabila perlindungan konteks-cache aktif. -**#532 — Pengesahan kunci OpenCode Go:**Kini menggunakan titik akhir ujian `zen/v1` (`testKeyBaseUrl`) — kunci yang sama berfungsi untuk kedua-dua peringkat.#### CLI & Tools

-**#527 — Kod Claude + Gelung Codex:**Blok `tool_result` kini ditukar kepada teks dan bukannya digugurkan, menghentikan gelung hasil alat yang tidak terhingga. -**#524 — OpenCode config save:**Menambahkan pengendali `saveOpenCodeConfig()` (XDG_CONFIG_HOME sedar, menulis TOML). -**#521 — Log masuk tersekat:**Log masuk tidak lagi membeku selepas melangkau persediaan kata laluan — ubah hala dengan betul ke onboarding. -**#522 — Pengurus API:**Butang "Salin kekunci bertopeng" yang mengelirukan (digantikan dengan petua alat ikon kunci). -**#532 — Konfigurasi OpenCode Go:**Pengendali tetapan panduan kini mengendalikan toolId `opencode`.#### Developer Experience

-**#489 — Antigraviti:**`googleProjectId` yang tiada mengembalikan ralat 422 berstruktur dengan panduan penyambungan semula dan bukannya ranap rahsia. -**#510 — Laluan Windows:**Laluan MSYS2/Git-Bash (`/c/Program Files/...`) kini dinormalkan kepada `C:\Program Files\...` secara automatik. -**#492 — Permulaan CLI:**`omniroute` CLI kini mengesan `mise`/`nvm`-managed Node apabila `app/server.js` tiada dan menunjukkan arahan pembetulan yang disasarkan.---

### 📖 Documentation Updates

-**#513**— Tetapan semula kata laluan Docker: `INITIAL_PASSWORD` env var workaround didokumenkan -**#520**— pnpm: langkah `pnpm approve-builds better-sqlite3` didokumenkan---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` ``#535` `#535`---

### 🔀 Community PRs Merged

| PR       | Pengarang    | Ringkasan                                                                           |
| -------- | ------------ | ----------------------------------------------------------------------------------- | --- |
| **#530** | @kang-heewon | Pembekal OpenCode Zen + Go dengan `OpencodeExecutor` dan ujian yang dipertingkatkan | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Kegigihan DB had kadar: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` dalam `providers.ts`. Lajur `rate_limited_until` sedia ada kini terdedah sebagai API khusus — muat semula token OAuth TIDAK boleh menyentuh medan ini untuk mengelakkan gelung had kadar. -**T08**— Had sesi setiap kunci API: `max_sessions INTEGER DEFAULT 0` ditambahkan pada `api_keys` melalui auto-migrasi. `sessionManager.ts` memperoleh `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` dan `getActiveSessionCountForKey()`. Pemanggil dalam `chatCore.js` boleh menguatkuasakan had dan pengurangan pada `req.close`. -**T09**— Skop had kadar Codex lwn Spark: `getCodexModelScope()` dan `getCodexRateLimitKey()` dalam `codex.ts`. Model standard (`gpt-5.x-codex`, `codex-mini`) dapatkan skop `"codex"`; model percikan (`codex-spark*`) mendapat skop `"percikan"`. Kunci had kadar hendaklah `${accountId}:${scope}` jadi meletihkan satu kumpulan tidak menyekat yang lain. -**T13**— Pembetulan paparan kuota basi: `getEffectiveQuotaUsage(used, resetAt)` mengembalikan `0` apabila tetingkap set semula telah berlalu; `formatResetCountdown(resetAt)` mengembalikan rentetan kira detik yang boleh dibaca manusia (cth. `"2j 35m"`). Kedua-duanya dieksport daripada `providers.ts` + `localDb.ts` untuk penggunaan papan pemuka. -**T14**— Proksi cepat-gagal: `src/lib/proxyHealth.ts` baharu dengan `isProxyReachable(proxyUrl, timeoutMs=2000)` (semakan TCP, ≤2s dan bukannya tamat masa 30s), `getCachedProxyHealth()`, `invalidateProxy()`, `invalidate(Proxy)` `getAllProxyHealthStatuses()`. Keputusan dicache 30s secara lalai; boleh dikonfigurasikan melalui `PROXY_FAST_FAIL_TIMEOUT_MS` / `PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Suite ujian:**832 ujian, 0 kegagalan**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— lajur `requested_model` dalam `call_logs` (migration 009): jejak model mana yang diminta klien pada asalnya berbanding model yang dihalakan sebenar. Mendayakan analisis kadar sandaran. -**T02**— Keluarkan blok teks kosong daripada `tool_result.content` bersarang: menghalang ralat Anthropic 400 (`blok kandungan teks mestilah tidak kosong`) apabila Claude Code merantai hasil alat. -**T03**— Menghuraikan pengepala `x-codex-5h-*` / `x-codex-7d-*`: `parseCodexQuotaHeaders()` + `getCodexResetTime()` ekstrak tetingkap kuota Codex untuk penjadualan cooldown yang tepat dan bukannya sandaran 5 minit generik. -**T04**— Pengepala `X-Session-Id` untuk penghalaan melekit luaran: `extractExternalSessionId()` dalam `sessionManager.ts` membaca pengepala `x-session-id` / `x-omniroute-session` dengan awalan `ext:` sesi untuk mengelakkan perlanggaran dengan ID dalaman SHA-256. Serasi Nginx (pengepala sempang). -**T06**— Akaun dinyahaktifkan → blok kekal: `isAccountDeactivated()` dalam `accountFallback.ts` mengesan 401 isyarat penyahaktifan dan menggunakan tempoh bertenang 1 tahun untuk mengelakkan mencuba semula akaun mati secara kekal. -**T07**— Pengesahan IP X-Forwarded-For: baharu `src/lib/ipUtils.ts` dengan `extractClientIp()` dan `getClientIpFromRequest()` — melangkau entri `tidak diketahui`/bukan IP dalam rantaian `X-Forwarded-For` (permintaan Nginx/proxy-forwarded). -**T10**— Kredit habis → sandaran berbeza: `isCreditsExhausted()` dalam `accountFallback.ts` mengembalikan 1j bertenang dengan bendera `creditsExhausted`, berbeza daripada pengehadan kadar 429 generik. -**T11**— usaha penaakulan `maks` → 131072 token belanjawan: `EFFORT_BUDGETS` dan `THINKING_LEVEL_MAP` dikemas kini; pemetaan terbalik kini mengembalikan `"maks"` untuk respons bajet penuh. Ujian unit dikemas kini. -**T12**— Entri harga MiniMax M2.7 ditambahkan: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-speed tinggi` ditambahkan pada jadual harga (sub2api PR #1120). Harga M2.5/GLM-4.7/GLM-5/Kimi sudah wujud. -**T15**— Penormalan kandungan tatasusunan: pembantu `normalizeContentToString()` dalam `openai-to-claude.ts` meruntuhkan mesej sistem/alat berformat tatasusunan ke rentetan dengan betul sebelum dihantar ke Anthropic.### 🧪 Tests

- Suite ujian:**832 ujian, 0 kegagalan**(tidak berubah daripada rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— API Peruntukan Kunci Berdaftar: kunci API keluaran automatik dengan penguatkuasaan kuota setiap pembekal & setiap akaun

- `POST /api/v1/registered-keys` — keluarkan kunci dengan sokongan mati pucuk
- `GET /api/v1/registered-keys` — senaraikan kunci berdaftar (bertopeng)
- `GET /api/v1/registered-keys/{id}` — dapatkan metadata utama
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — batalkan kekunci
- `GET /api/v1/quotas/check` — pra-sahkan sebelum dikeluarkan
- `PUT /api/v1/providers/{id}/limits` — tetapkan had pengeluaran pembekal
- `PUT /api/v1/accounts/{id}/limits` — tetapkan had pengeluaran akaun
- `POST /api/v1/issues/report` — pelaporan isu GitHub pilihan
- DB migration 008: jadual `registered_keys`, `provider_key_limits`, `account_key_limits`---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— Penyedia OpenCode Zen dan OpenCode Go ditambah (oleh @kang-heewon)

- `OpencodeExecutor` baharu dengan penghalaan berbilang format (`/sembang/penyelesaian`, `/mesej`, `/respons`)
- 7 model merentasi kedua-dua peringkat---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Ikon penyedia kini menggunakan [@lobehub/icons](https://github.com/lobehub/lobe-icons) dengan sandaran PNG yang anggun dan komponen `ProviderIcon` (130+ penyedia disokong) -**#488**— Model kemas kini automatik menyenaraikan setiap 24 jam melalui `modelSyncScheduler` (boleh dikonfigurasikan melalui `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: kini menunjukkan ralat boleh tindakan yang jelas apabila `GEMINI_OAUTH_CLIENT_SECRET` tiada dalam penempatan Docker/hos sendiri---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— Pengesahan kunci LongCat AI: baseUrl tetap (`api.longcat.chat/openai`) dan authHeader (`Keizinan: Pembawa`) -**#535**— Model yang disematkan menimpa: `body.model` kini ditetapkan kepada `pinnedModel` apabila perlindungan cache konteks mengesan model yang disematkan -**#524**— Konfigurasi OpenCode kini disimpan dengan betul: menambah pengendali `saveOpenCodeConfig()` (XDG_CONFIG_HOME sedar, menulis TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Log masuk tidak lagi tersekat selepas melangkau persediaan kata laluan (ubah hala ke onboarding) -**#522**— Pengurus API: Butang "Salin kekunci bertopeng" yang mengelirukan dialih keluar (digantikan dengan petua alat ikon kunci) -**#527**— Kod Claude + Gelung kuasa besar Codex: blok `tool_result` kini ditukar kepada teks dan bukannya digugurkan -**#532**— Pengesahan kunci OpenCode GO API kini menggunakan titik akhir `zen/v1` yang betul (`testKeyBaseUrl`) -**#489**— Antigraviti: tiada `googleProjectId` mengembalikan ralat 422 berstruktur dengan panduan penyambungan semula -**#510**— Windows: Laluan MSYS2/Git-Bash (`/c/Program Files/...`) kini dinormalkan kepada `C:\Program Files\...` -**#492**— CLI `omniroute` kini mengesan `mise`/`nvm` apabila `app/server.js` tiada dan menunjukkan pembetulan yang disasarkan### Dokumentasi

-**#513**— Tetapan semula kata laluan Docker: `INITIAL_PASSWORD` env var workaround didokumenkan -**#520**— pnpm: `pnpm approve-builds better-sqlite3` didokumenkan### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Pembekal OpenCode baharu, pembetulan bukti kelayakan, pepijat kunci bertopeng CLI, pembetulan CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**Alat CLI menyimpan kunci API bertopeng untuk mengkonfigurasi fail**— laluan POST `claude-settings`, `cline-settings` dan `openclaw-settings` kini menerima param `keyId` dan menyelesaikan kunci API sebenar daripada DB sebelum menulis ke cakera. `ClaudeToolCard` dikemas kini untuk menghantar `keyId` dan bukannya rentetan paparan bertopeng. Membetulkan #523, #526. -**Pembekal benam tersuai: `Tiada bukti kelayakan` ralat**— `/v1/embeddings` kini menjejaki `credentialsProviderId` secara berasingan daripada awalan penghalaan, jadi bukti kelayakan diambil daripada ID nod pembekal yang sepadan dan bukannya rentetan awalan awam. Membetulkan regresi yang mana `google/gemini-embedding-001` dan model pembekal tersuai yang serupa akan sentiasa gagal dengan ralat bukti kelayakan. Pembetulan berkaitan #532. (PR #528 oleh @jacob2826) -**Rex perlindungan cache konteks terlepas `
` awalan**— `CACHE_TAG_PATTERN` dalam `comboAgentMiddleware.ts` dikemas kini agar sepadan dengan kedua-dua literal `
` (backslash-n) dan baris baharu U+000A sebenar yang penstriman `combo.ts` menyuntik sekitar teg `<omniModel>` selepas pembetulan #515. Pembetulan #531.### ✨ New Providers

-**OpenCode Zen**— Gerbang peringkat percuma di `opencode.ai/zen/v1` dengan 3 model: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Perkhidmatan langganan di `opencode.ai/zen/go/v1` dengan 4 model: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (format Claude), `minimax-m2.5` (format Claude)

- Kedua-dua pembekal menggunakan `OpencodeExecutor` baharu yang mengarahkan secara dinamik ke `/chat/completions`, `/messages`, `/responses` atau `/models/{model}:generateContent` berdasarkan model yang diminta. (PR #530 oleh @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Pembetulan pepijat — kekalkan kunci cache gesaan Codex, betulkan tagKandungan JSON melarikan diri, segerakkan status token tamat tempoh kepada DB.### 🐛 Bug Fixes

-**fix(penterjemah)**: Simpan `prompt_cache_key` dalam Responses API → Terjemahan Chat Completions (#517)
— Medan ialah isyarat perkaitan cache yang digunakan oleh Codex; menanggalkannya telah menghalang serangan cache segera.
Dibetulkan dalam `openai-responses.ts` dan `responsesApiHelper.ts`.

-**baiki(kombo)**: Melarikan diri `
` dalam `tagContent` jadi rentetan JSON yang disuntik adalah sah (#515)
— Baris baharu literal templat (U+000A) tidak dibenarkan dilepaskan dalam nilai rentetan JSON.
Digantikan dengan `\n` jujukan literal dalam `open-sse/services/combo.ts`.

-**pembetulan(penggunaan)**: Segerakkan status token tamat tempoh kembali ke DB apabila kegagalan pengesahan langsung (#491)
— Apabila semakan langsung Had & Kuota mengembalikan 401/403, sambungan `testStatus` kini dikemas kini
kepada `"tamat tempoh"` dalam pangkalan data supaya halaman Pembekal mencerminkan keadaan terdegradasi yang sama.
Dibetulkan dalam `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint: Tambah 5 penyedia AI percuma baharu — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)**: Tambahkan LongCat AI (`lc/`) — 50M token/hari percuma (Flash-Lite) + 500K/hari (Chat/Thinking) semasa beta awam. Serasi OpenAI, pengesahan Pembawa standard. -**feat(providers/pollinations)**: Add Pollinations AI (`pol/`) — tiada kunci API diperlukan. Proksi GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 req/15s percuma). Pelaksana tersuai mengendalikan pengesahan pilihan. -**feat(providers/cloudflare-ai)**: Tambah Cloudflare Workers AI (`cf/`) — 10K Neuron/hari percuma (~150 LLM respons atau 500s Whisper audio). 50+ model di kelebihan global. Pelaksana tersuai membina URL dinamik dengan `accountId` daripada bukti kelayakan. -**feat(providers/scaleway)**: Tambah Scaleway Generative APIs (`scw/`) — 1M token percuma untuk akaun baharu. patuh EU/GDPR (Paris). Qwen3 235B, Llama 3.1 70B, Mistral Small 3.2. -**feat(providers/aimlapi)**: Tambahkan AI/ML API (`aiml/`) — $0.025/hari kredit percuma, 200+ model (GPT-4o, Claude, Gemini, Llama) melalui titik akhir agregator tunggal.### 🔄 Provider Updates

-**feat(penyedia/bersama-sama)**: Tambahkan `hasFree: true` + 3 ID model percuma kekal: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free` -**feat(providers/gemini)**: Tambahkan `hasFree: true` + `freeNote` (1,500 req/hari, tiada kad kredit diperlukan, aistudio.google.com) -**tugas(penyedia/gemini)**: Namakan semula nama paparan kepada `Gemini (Google AI Studio)` untuk kejelasan### ⚙️ Infrastructure

-**feat(executors/pollinations)**: `PollinationsExecutor` baharu — meninggalkan pengepala `Authorization` apabila tiada kunci API disediakan -**feat(executors/cloudflare-ai)**: `CloudflareAIExecutor` baharu — pembinaan URL dinamik memerlukan `accountId` dalam kelayakan pembekal -**feat(executors)**: Daftarkan `pollinations`, `pol`, `cloudflare-ai`, `cf` pemetaan pelaksana### Dokumentasi

-**docs(readme)**: Timbunan kombo percuma diperluaskan kepada 11 pembekal ($0 selama-lamanya) -**docs(readme)**: Menambahkan 4 bahagian penyedia percuma baharu (LongCat, Pollinations, Cloudflare AI, Scaleway) dengan jadual model -**docs(readme)**: Jadual harga dikemas kini dengan 4 baris peringkat percuma baharu -**docs(i18n/pt-BR)**: Jadual harga dikemas kini + menambahkan bahagian LongCat/Pollination/Cloudflare AI/Scaleway dalam bahasa Portugis -**docs(new-features/ai)**: 10 fail spesifikasi tugas + pelan pelaksanaan induk dalam `docs/new-features/ai/`### 🧪 Tests

- Suite ujian:**821 ujian, 0 kegagalan**(tidak berubah)---

## [2.9.2] — 2026-03-21

> Sprint: Betulkan transkripsi media (Deepgram/HuggingFace Content-Type, pengesanan bahasa) dan paparan ralat TTS.### 🐛 Bug Fixes

-**fix(transcription)**: Transkripsi audio Deepgram dan HuggingFace kini memetakan dengan betul `video/mp4` → `audio/mp4` dan jenis MIME media lain melalui pembantu `resolveAudioContentType()` yang baharu. Sebelum ini, memuat naik fail `.mp4` secara konsisten mengembalikan "Tiada pertuturan dikesan" kerana Deepgram telah menerima `Jenis Kandungan: video/mp4`. -**fix(transcription)**: Menambahkan `detect_language=true` pada permintaan Deepgram — auto-mengesan bahasa audio (Portugis, Sepanyol, dll.) dan bukannya lalai kepada bahasa Inggeris. Membetulkan transkripsi bukan bahasa Inggeris yang mengembalikan hasil kosong atau sampah. -**pembetulan(transkripsi)**: Menambahkan `punctuate=true` pada permintaan Deepgram untuk output transkripsi berkualiti tinggi dengan tanda baca yang betul. -**fix(tts)**: Paparan ralat `[objek Objek]` dalam respons Text-to-Speech dibetulkan dalam kedua-dua `audioSpeech.ts` dan `audioTranscription.ts`. Fungsi `upstreamErrorResponse()` kini mengekstrak mesej rentetan bersarang dengan betul daripada pembekal seperti ElevenLabs yang mengembalikan `{ ralat: { mesej: "...", status_code: 401 } }` dan bukannya rentetan ralat rata.### 🧪 Tests

- Suite ujian:**821 ujian, 0 kegagalan**(tidak berubah)### Triaged Issues

-**#508**— Regresi format panggilan alat: log proksi yang diminta dan maklumat rangkaian pembekal (`keperluan-maklumat`) -**#510**— Laluan pemeriksaan kesihatan Windows CLI: maklumat versi shell/Node yang diminta (`keperluan-maklumat`) -**#485**— Panggilan alat MCP Kiro: ditutup sebagai isu Kiro luaran (bukan OmniRoute) -**#442**— Titik akhir Baseten /models: ditutup (penyelesaian manual yang didokumenkan) -**#464**— API peruntukan utama: diakui sebagai item peta jalan---

## [2.9.1] — 2026-03-21

> Sprint: Betulkan kehilangan data omniModel SSE, cantumkan keserasian model setiap protokol.### Bug Fixes

-**#511**— Kritikal: Teg `<omniModel>` telah dihantar selepas `finish_reason:stop` dalam strim SSE, menyebabkan kehilangan data. Teg kini disuntik ke dalam bahagian kandungan pertama yang tidak kosong, menjamin penghantaran sebelum SDK menutup sambungan.### Merged PRs

-**PR #512**(@zhangqiang8vip): Keserasian model setiap protokol — `normalizeToolCallId` dan `preserveOpenAIDeveloperRole` kini boleh dikonfigurasikan mengikut protokol klien (OpenAI, Claude, Responses API). Medan `compatByProtocol` baharu dalam konfigurasi model dengan pengesahan Zod.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: meminta maklumat PATH/versi -**#509**— Regresi Elektron Turbopack: upstream Next.js bug, penyelesaian yang didokumenkan -**#508**— skrin hitam macOS: mencadangkan penyelesaian `--disable-gpu`---

## [2.9.0] — 2026-03-20

> Sprint: Pembetulan machineId merentas platform, had kadar setiap kunci API, cache konteks penstriman, Alibaba DashScope, analitik carian, ZWS v5 dan 8 isu ditutup.### ✨ New Features

-**feat(search)**: Cari tab Analitis dalam `/papan pemuka/analitik` — pecahan penyedia, kadar capan cache, penjejakan kos. API Baharu: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**: Alibaba Cloud DashScope ditambah dengan pengesahan laluan titik akhir tersuai — boleh dikonfigurasikan `chatPath` dan `modelsPath` setiap nod (#feat/custom-endpoint-paths) -**feat(api)**: Had kiraan permintaan setiap kunci API — lajur `max_requests_per_day` dan `max_requests_per_minute` dengan penguatkuasaan tetingkap gelongsor dalam memori yang mengembalikan HTTP 429 (#452) -**feat(dev)**: ZWS v5 — Pembetulan kebocoran HMR (sambungan 485 DB → 1), memori 2.4GB → 195MB, singleton `globalThis`, Pembetulan amaran Edge Runtime (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: Cross-platform `machineId` — `getMachineIdRaw()` ditulis semula dengan try/catch waterfall (Windows REG.exe → macOS ioreg → Linux fail dibaca → nama hos → `os.hostname()`). Menghapuskan percabangan `process.platform` yang bundler Next.js dead-code-eliminated, membetulkan `'head' tidak dikenali` pada Windows. Juga membetulkan #466. -**fix(#493)**: Penamaan model pembekal tersuai — mengalih keluar pelucutan awalan yang salah dalam `DefaultExecutor.transformRequest()` yang merosakkan ID model skop org seperti `zai-org/GLM-5-FP8`. -**fix(#490)**: Penstriman + perlindungan cache konteks — `TransformStream` memintas SSE untuk menyuntik teg `<omniModel>` sebelum penanda `[DONE]`, membolehkan perlindungan cache konteks untuk respons penstriman. -**fix(#458)**: Pengesahan skema kombo — `system_message`, `tool_filter_regex`, medan `context_cache_protection` kini lulus pengesahan Zod pada simpan. -**fix(#487)**: Pembersihan kad KIRO MITM — mengalih keluar ZWS_README, menghasilkan `AntigravityToolCard` untuk menggunakan metadata alat dinamik.### 🧪 Tests

- Menambah ujian unit penapis alatan format Anthropic (PR #397) — 8 ujian regresi untuk `tool.name` tanpa pembalut `.function`
- Suite ujian:**821 ujian, 0 kegagalan**(naik daripada 813)### 📋 Issues Closed (8)

-**#506**— Windows machineId `head` tidak dikenali (tetap) -**#493**— Penamaan model pembekal tersuai (tetap) -**#490**— Cache konteks penstriman (tetap) -**#452**— Had permintaan setiap kunci API (dilaksanakan) -**#466**— Kegagalan log masuk Windows (punca yang sama seperti #506) -**#504**— MITM tidak aktif (kelakuan yang dijangkakan) -**#462**— Gemini CLI PSA (diselesaikan) -**#434**— Ranap aplikasi elektron (pendua #402)## [2.8.9] — 2026-03-20

> Sprint: Gabungkan PR komuniti, betulkan kad KIRO MITM, kemas kini pergantungan.### Merged PRs

-**PR #498**(@Sajid11194): Betulkan ranap ID mesin Windows (`undefined\REG.exe`). Menggantikan `node-machine-id` dengan pertanyaan pendaftaran OS asli.**Tutup #486.** -**PR #497**(@zhangqiang8vip): Betulkan kebocoran sumber HMR mod dev — 485 sambungan DB bocor → 1, memori 2.4GB → 195MB. Tunggal `globalThis`, Pembetulan amaran Edge Runtime, kestabilan ujian Windows. (+1168/-338 merentas 22 fail) -**PRs #499-503**(Dependabot): Kemas kini Tindakan GitHub — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `docker/4`, `docker/4`### Bug Fixes

-**#505**— Kad KIRO MITM kini memaparkan arahan khusus alat (`api.anthropic.com`) dan bukannya teks khusus Antigraviti. -**#504**— Dijawab dengan penjelasan UX (MITM "Tidak Aktif" dijangka gelagat apabila proksi tidak berjalan).---

## [2.8.8] — 2026-03-20

> Sprint: Betulkan ranap ujian kelompok OAuth, tambah butang "Uji Semua" pada halaman penyedia individu.### Bug Fixes

-**Ranap ujian kelompok OAuth**(ERR_CONNECTION_REFUSED): Menggantikan gelung berjujukan dengan had serentak 5 sambungan + tamat masa setiap sambungan 30s melalui `Promise.race()` + `Promise.allSettled()`. Menghalang ranap pelayan apabila menguji kumpulan pembekal OAuth yang besar (~30+ sambungan).### Ciri-ciri

-**Butang "Uji Semua" pada halaman pembekal**: Halaman pembekal individu (cth., `/penyedia/codex`) kini menunjukkan butang "Uji Semua" dalam pengepala Sambungan apabila terdapat 2+ sambungan. Menggunakan `POST /api/providers/test-batch` dengan `{mode: "provider", providerId}`. Keputusan dipaparkan dalam modal dengan ringkasan lulus/gagal dan diagnosis setiap sambungan.---

## [2.8.7] — 2026-03-20

> Sprint: Gabungkan PR #495 (Bottleneck 429 drop), betulkan #496 (penyedia benam tersuai), ciri triage.### Bug Fixes

-**Bottleneck 429 infinite wait**(PR #495 by @xandr0s): Pada 429, `limiter.stop({ dropWaitingJobs: true })` serta-merta gagal semua permintaan beratur supaya pemanggil huluan boleh mencetuskan sandaran. Penghad dipadamkan daripada Peta jadi permintaan seterusnya mencipta contoh baharu. -**Model benam tersuai tidak boleh diselesaikan**(#496): `POST /v1/embeddings` kini menyelesaikan model benam tersuai daripada SEMUA provider_nodes (bukan hanya localhost). Mendayakan model seperti `google/gemini-embedding-001` ditambahkan melalui papan pemuka.### Issues Responded

-**#452**— Had kiraan permintaan setiap kunci API (diakui, pada peta jalan) -**#464**— Autokeluaran kunci API dengan had pembekal/akaun (memerlukan lebih terperinci) -**#488**— Autokemas kini senarai model (diakui, pada peta jalan) -**#496**— Resolusi pembekal pembenaman tersuai (tetap)---

## [2.8.6] — 2026-03-20

> Pecut: Gabungkan PR #494 (Pembetulan peranan MiniMax), betulkan papan pemuka KIRO MITM, triaj 8 isu.### Ciri-ciri

-**Pembangun MiniMax→pembetulan peranan sistem**(PR #494 oleh @zhangqiang8vip): Togol `preserveDeveloperRole` setiap model. Menambah UI "Keserasian" dalam halaman pembekal. Membetulkan 422 "ralat param peranan" untuk MiniMax dan gerbang yang serupa. -**roleNormalizer**: `normalizeDeveloperRole()` kini menerima parameter `preserveDeveloperRole` dengan gelagat tiga keadaan (undefined=keep, true=keep, false=convert). -**DB**: Baharu `getModelPreserveOpenAIDeveloperRole()` dan `mergeModelCompatOverride()` dalam `models.ts`.### Bug Fixes

-**papan pemuka KIRO MITM**(#481/#487): `CLIToolsPageClient` kini mengarahkan mana-mana alat `configType: "mitm"` ke `AntigravityToolCard` (kawalan Mula/Henti MITM). Sebelum ini hanya Antigravity yang dikod keras. -**AntigravityToolCard generik**: Menggunakan `tool.image`, `tool.description`, `tool.id` dan bukannya nilai Antigraviti berkod keras. Melindungi daripada kehilangan `defaultModels`.### Cleanup

- Mengalih keluar `ZWS_README_V2.md` (dokumen pembangunan sahaja daripada PR #494).### Issues Triaged (8)

-**#487**— Ditutup (KIRO MITM ditetapkan dalam keluaran ini) -**#486**— keperluan-maklumat (isu Windows REG.exe PATH) -**#489**— keperluan-maklumat (Projek antigraviti tiada, OAuth perlu menyambung semula) -**#492**— keperluan-maklumat (apl/server.js tiada pada Node yang diuruskan secara salah) -**#490**— Diakui (penstriman + penyekatan cache konteks, pembaikan dirancang) -**#491**— Diakui (Ketidakkonsistenan keadaan pengesahan Codex) -**#493**— Diakui (Awalan nama model pembekal modal, penyelesaian disediakan) -**#488**— Tunggakan permintaan ciri (senarai model kemas kini automatik)---

## [2.8.5] — 2026-03-19

> Sprint: Betulkan strim zombie SSE, cache konteks pusingan pertama, KIRO MITM dan triage 5 isu luaran.### Bug Fixes

-**Strim Zombie SSE**(#473): Kurangkan `STREAM_IDLE_TIMEOUT_MS` daripada 300s → 120s untuk sandaran kombo yang lebih pantas apabila penyedia meletak pertengahan strim. Boleh dikonfigurasikan melalui env var. -**Teg Cache Konteks**(#474): Betulkan `injectModelTag()` untuk mengendalikan permintaan pusingan pertama (tiada mesej pembantu) — perlindungan cache konteks kini berfungsi daripada respons pertama. -**KIRO MITM**(#481): Tukar KIRO `configType` daripada `guide` → `mitm` supaya papan pemuka memaparkan kawalan Mula/Henti MITM. -**Ujian E2E**(CI): Betulkan `providers-bailian-coding-plan.spec.ts` — tolak tindanan modal sedia ada sebelum mengklik butang Tambah Kunci API.### Closed Issues

- #473 — Strim Zombie SSE memintas sandaran kombo
- #474 — Teg konteks cache `<omniModel>` hilang pada giliran pertama
- #481 — MITM untuk KIRO tidak boleh diaktifkan dari papan pemuka
- #468 — pelayan jauh Gemini CLI (digantikan oleh penamatan #462)
- #438 — Claude tidak dapat menulis fail (isu CLI luaran)
- #439 — AppImage tidak berfungsi (penyelesaian libfuse2 yang didokumenkan)
- #402 — ARM64 DMG "rosak" (penyelesaian xattr -cr yang didokumenkan)
- #460 — CLI tidak boleh dijalankan pada Windows (pembetulan PATH yang didokumenkan)---

## [2.8.4] — 2026-03-19

> Sprint: Penamatan Gemini CLI, pembaikan panduan VM i18n, pembaikan keselamatan dependabot, pengembangan skema penyedia.### Ciri-ciri

-**Penahentian Gemini CLI**(#462): Tandai penyedia `gemini-cli` sebagai ditamatkan dengan amaran — Google mengehadkan penggunaan OAuth pihak ketiga mulai Mac 2026 -**Skema Pembekal**(#462): Kembangkan pengesahan Zod dengan medan pilihan `ditamatkan`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint`### Bug Fixes

-**Panduan VM i18n**(#471): Tambahkan `VM_DEPLOYMENT_GUIDE.md` pada saluran terjemahan i18n, jana semula kesemua 30 terjemahan tempat daripada sumber Inggeris (telah tersekat dalam bahasa Portugis)### Keselamatan

-**deps**: Bonggol `diratakan` 3.3.3 → 3.4.2 — membetulkan pencemaran prototaip CWE-1321 (#484, @dependabot)### Closed Issues

- #472 — Regresi Alias Model (ditetapkan dalam v2.8.2)
- #471 — Terjemahan panduan VM rosak
- #483 — Mengekori `data: null` selepas `[DONE]` (ditetapkan dalam v2.8.3)### Merged PRs

- #484 — deps: bonggol diratakan daripada 3.3.3 kepada 3.4.2 (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: Czech i18n, pembetulan protokol SSE, terjemahan panduan VM.### Ciri-ciri

-**Bahasa Czech**(#482): Czech Penuh (cs) i18n — 22 dokumen, 2606 rentetan UI, kemas kini penukar bahasa (@zen0bit) -**Panduan Penggunaan VM**: Diterjemah daripada bahasa Portugis ke bahasa Inggeris sebagai dokumen sumber (@zen0bit)### Bug Fixes

-**SSE Protocol**(#483): Berhenti menghantar trailing `data: null` selepas isyarat `[DONE]` — membetulkan `AI_TypeValidationError` dalam klien AI SDK yang ketat (Pengesah berasaskan Zod)### Merged PRs

- #482 — Tambah bahasa Czech + Betulkan VM_DEPLOYMENT_GUIDE.md sumber Inggeris (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 PR gabungan, pembetulan penghalaan alias model, eksport log dan triage isu.### Ciri-ciri

-**Eksport Log**: Butang Eksport Baharu pada `/papan pemuka/log` dengan lungsur julat masa (1j, 6j, 12j, 24j). Memuat turun JSON log permintaan/proksi/panggilan melalui `/api/logs/export` API (#user-request)### Bug Fixes

-**Penghalaan Alias ​​Model**(#472): Tetapan → Alias ​​Model kini mempengaruhi penghalaan pembekal dengan betul, bukan hanya pengesanan format. Output `resolveModelAlias()` sebelum ini hanya digunakan untuk `getModelTargetFormat()` tetapi ID model asal telah dihantar kepada pembekal -**Penggunaan Siram Strim**(#480): Data penggunaan daripada peristiwa SSE terakhir dalam penimbal kini diekstrak dengan betul semasa siram strim (digabungkan daripada @prakersh)### Merged PRs

- #480 — Ekstrak penggunaan daripada baki penimbal dalam pengendali flush (@prakersh)
- #479 — Tambahkan entri harga Codex 5.3/5.4 dan ID model Anthropic (@prakersh) yang tiada---

## [2.8.1] — 2026-03-19

> Sprint: Lima PR komuniti — pembetulan log panggilan penstriman, keserasian Kiro, analitik token cache, terjemahan bahasa Cina dan ID panggilan alat boleh dikonfigurasikan.### Ciri-ciri

-**feat(logs)**: Kandungan respons log panggilan kini terkumpul dengan betul daripada bahagian pembekal mentah (OpenAI/Claude/Gemini) sebelum terjemahan, membetulkan muatan respons kosong dalam mod penstriman (#470, @zhangqiang8vip) -**feat(providers)**: Penormalan ID panggilan alat 9-char yang boleh dikonfigurasikan bagi setiap model (gaya Mistral) — hanya model dengan pilihan yang didayakan mendapat ID terpotong (#470) -**feat(api)**: API PATCH Kunci dikembangkan untuk menyokong medan `allowedConnections`, `name`, `autoResolve`, `isActive` dan `accessSchedule` (#470) -**feat(papan pemuka)**: Reka letak respon pertama dalam UI butiran log permintaan (#470) -**feat(i18n)**: Terjemahan Cina (zh-CN) yang dipertingkat — terjemahan semula lengkap (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Strip yang disuntik medan `model` daripada badan permintaan — Kiro API menolak medan peringkat atas yang tidak diketahui (#478, @prakersh) -**pembetulan(penggunaan)**: Sertakan cache baca + token penciptaan cache dalam jumlah input sejarah penggunaan untuk analitis yang tepat (#477, @prakersh) -**fix(callLogs)**: Sokong medan penggunaan format Claude (`input_tokens`/`output_tokens`) bersama format OpenAI, sertakan semua varian token cache (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: Penyedia Pelan Pengekodan Bailian dengan URL asas boleh diedit, serta sumbangan komuniti untuk Alibaba Cloud dan Kimi Coding.### Ciri-ciri

-**feat(penyedia)**: Menambahkan Pelan Pengekodan Bailian (`pelan pengekodan bailian`) — Studio Model Alibaba dengan API yang serasi dengan Anthropic. Katalog statik 8 model termasuk Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 dan Kimi K2.5. Termasuk pengesahan pengesahan tersuai (400=sah, 401/403=tidak sah) (#467, @Mind-Dragon) -**feat(admin)**: URL lalai boleh diedit dalam Pentadbiran Penyedia membuat/mengedit aliran — pengguna boleh mengkonfigurasi URL asas tersuai bagi setiap sambungan. Berkekalan dalam `providerSpecificData.baseUrl` dengan pengesahan skema Zod menolak skim bukan http (#467)### 🧪 Tests

- Menambahkan 30+ ujian unit dan 2 senario e2e untuk penyedia Pelan Pengekodan Bailian yang meliputi pengesahan pengesahan, pengerasan skema, tingkah laku peringkat laluan dan penyepaduan merentas lapisan---

## [2.7.10] — 2026-03-19

> Sprint: Dua penyedia sumbangan komuniti baharu (Pengekodan Awan Alibaba, kunci API Pengekodan Kimi) dan pembetulan pino Docker.### Ciri-ciri

-**feat(providers)**: Menambahkan sokongan Pelan Pengekodan Awan Alibaba dengan dua titik akhir serasi OpenAI — `alicode` (China) dan `alicode-intl` (Antarabangsa), masing-masing dengan 8 model (#465, @dtk1985) -**feat(providers)**: Menambah laluan pembekal `kimi-coding-apikey` khusus — Akses Kimi Coding berasaskan kunci API tidak lagi dipaksa melalui laluan `kimi-coding` OAuth sahaja. Termasuk pendaftaran, pemalar, model API, konfigurasi dan ujian pengesahan (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: Menambahkan kebergantungan `split2` yang tiada pada imej Docker — `pino-abstract-transport` memerlukannya pada masa jalan tetapi ia tidak disalin ke dalam bekas kendiri, menyebabkan ranap `Tidak dapat mencari modul 'split2'` (#459)---

## [2.7.9] — 2026-03-18

> Sprint: Sambutan Codex subpath passthrough disokong secara asli, ranap Windows MITM dibetulkan dan skema ejen Combo dilaraskan.### Ciri-ciri

-**feat(codex)**: Laluan sublaluan respons asli untuk Codex — laluan asli `POST /v1/responses/compact` ke hulu Codex, mengekalkan keserasian Kod Claude tanpa menanggalkan akhiran `/compact` (#457)### 🐛 Bug Fixes

-**fix(combos)**: Skema Zod (`updateComboSchema` dan `createComboSchema`) kini termasuk `system_message`, `tool_filter_regex` dan `context_cache_protection`. Membetulkan pepijat di mana tetapan khusus ejen yang dibuat melalui papan pemuka dibuang secara senyap oleh lapisan pengesahan bahagian belakang (#458) -**fix(mitm)**: Ranap profil Kiro MITM pada Windows dibetulkan — `node-machine-id` gagal kerana env `REG.exe` hilang, dan sandaran telah menyebabkan ralat `crypto is not defined` yang maut. Fallback kini mengimport kripto dengan selamat dan betul (#456)---

## [2.7.8] — 2026-03-18

> Sprint: Pepijat jimat belanjawan + ciri ejen kombo UI + pembetulan keselamatan teg omniModel.### 🐛 Bug Fixes

-**fix(budget)**: "Simpan Had" tidak lagi mengembalikan 422 — `warningThreshold` kini dihantar dengan betul sebagai pecahan (0–1) dan bukannya peratusan (0–100) (#451) -**fix(combos)**: `<omniModel>` teg cache dalaman kini dilucutkan sebelum memajukan permintaan kepada pembekal, menghalang pemecahan sesi cache (#454)### Ciri-ciri

-**feat(combos)**: Bahagian Ciri Ejen ditambahkan pada kombo cipta/edit modal — dedahkan `system_message` override, `tool_filter_regex` dan `context_cache_protection` terus daripada papan pemuka (#454)---

## [2.7.7] — 2026-03-18

> Sprint: Ranap pino Docker, pembaikan pekerja respons Codex CLI, penyegerakan kunci pakej.### 🐛 Bug Fixes

-**fix(docker)**: `pino-abstract-transport` dan `pino-pretty` kini disalin secara eksplisit dalam peringkat Docker runner — Next.js surih kendiri terlepas deps rakan sebaya ini, menyebabkan `Tidak dapat mencari modul pino-abstract-transport` ranap pada permulaan (#449) -**fix(responses)**: Alih keluar `initTranslators()` daripada laluan `/v1/responses` — sedang ranap pekerja Next.js dengan `pekerja telah keluar` uncaughtException pada permintaan Codex CLI (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` kini komited pada setiap bonjolan versi untuk memastikan Docker `npm ci` menggunakan versi kebergantungan yang tepat---

## [2.7.5] — 2026-03-18

> Sprint: Penambahbaikan UX dan pembetulan pemeriksaan kesihatan Windows CLI.### 🐛 Bug Fixes

-**fix(ux)**: Tunjukkan pembayang kata laluan lalai pada halaman log masuk — pengguna baharu kini melihat `"Kata laluan lalai: 123456"` di bawah input kata laluan (#437) -**fix(cli)**: Claude CLI dan alatan yang dipasang npm yang lain kini dikesan dengan betul sebagai boleh dijalankan pada Windows — spawn menggunakan `shell:true` untuk menyelesaikan pembalut `.cmd` melalui PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: Papan pemuka Alat Carian, pembetulan i18n, Had Copilot, Pembetulan pengesahan Serper.### Ciri-ciri

-**feat(search)**: Tambah Taman Permainan Carian (titik akhir ke-10), halaman Alat Carian dengan Bandingkan Penyedia/Saluran Paip Semula/Sejarah Carian, penghalaan kedudukan semula tempatan, pengawal auth pada API carian (#443 oleh @Regis-RCR)

- Laluan baharu: `/papan pemuka/alat-cari`
- Kemasukan bar sisi di bawah bahagian Nyahpepijat
- `GET /api/search/providers` dan `GET /api/search/stats` dengan pengawal auth
- Peruntukan nod_pembekal setempat untuk `/v1/rerank`
- 30+ kekunci i18n dalam ruang nama carian### 🐛 Bug Fixes

-**fix(search)**: Betulkan Brave news normalizer (telah mengembalikan 0 hasil), kuatkuasakan pemangkasan max_results post-normalization, betulkan Endpoints page fetch URL (#443 by @Regis-RCR) -**fix(analytics)**: Setempatkan label hari/tarikh analitik — gantikan rentetan Portugis berkod keras dengan `Intl.DateTimeFormat(locale)` (#444 oleh @hijak) -**pembetulan(copilot)**: Paparan jenis akaun Copilot GitHub yang betul, tapis baris kuota tanpa had yang mengelirukan daripada papan pemuka had (#445 oleh @hijak) -**fix(providers)**: Berhenti menolak kunci Serper API yang sah — layan respons bukan 4xx sebagai pengesahan yang sah (#446 oleh @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: Pembetulan sandaran kuota API langsung Codex.### 🐛 Bug Fixes

-**pembetulan(codex)**: Sekat akaun yang habis mingguan dalam sandaran API langsung (#440)

- Padanan awalan `resolveQuotaWindow()`: `"mingguan"` kini sepadan dengan kunci cache `"mingguan (7h)"`
- `applyCodexWindowPolicy()` menguatkuasakan togol `useWeekly`/`use5h` dengan betul
- 4 ujian regresi baharu (766 jumlah)---

## [2.7.2] — 2026-03-18

> Pecut: Pembetulan kontras UI mod cahaya.### 🐛 Bug Fixes

-**betulkan(log)**: Betulkan kontras mod cahaya dalam butang penapis log permintaan dan lencana kombo (#378)

- Butang penapis Ralat/Kejayaan/Kombo kini boleh dibaca dalam mod cahaya
- Lencana baris kombo menggunakan warna ungu yang lebih kuat dalam mod cahaya---

## [2.7.1] — 2026-03-17

> Sprint: Penghalaan carian web bersatu (POST /v1/search) dengan 5 pembekal + pembetulan keselamatan Next.js 16.1.7 (6 CVE).### ✨ New Features

-**feat(search)**: Penghalaan carian web bersatu — `POST /v1/search` dengan 5 pembekal (Serper, Brave, Perplexity, Exa, Tavily)

- Autofailover merentas pembekal, 6,500+ carian percuma/bulan
- Cache dalam memori dengan gabungan permintaan (TTL boleh dikonfigurasikan)
- Papan pemuka: Cari tab Analitis dalam `/papan pemuka/analitik` dengan pecahan penyedia, kadar hit cache, penjejakan kos
- API Baharu: `DAPATKAN /api/v1/search/analytics` untuk statistik permintaan carian
- Penghijrahan DB: lajur `request_type` pada `call_logs` untuk penjejakan permintaan bukan sembang
- Pengesahan Zod (`v1SearchSchema`), berpagar pengesahan, kos direkodkan melalui `recordCost()`### Keselamatan

-**deps**: Next.js 16.1.6 → 16.1.7 — membetulkan 6 CVE: -**Kritis**: CVE-2026-29057 (permintaan HTTP penyeludupan melalui http-proksi) -**Tinggi**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Tindakan Pelayan) -**Sederhana**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Fail                                                             | Tujuan                                         |
| ---------------------------------------------------------------- | ---------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                    | Pengendali carian dengan penghalaan 5 pembekal |
| `open-sse/config/searchRegistry.ts`                              | Pendaftaran pembekal (auth, kos, kuota, TTL)   |
| `open-sse/services/searchCache.ts`                               | Cache dalam memori dengan gabungan permintaan  |
| `src/app/api/v1/search/route.ts`                                 | Laluan Next.js (POST + GET)                    |
| `src/app/api/v1/search/analytics/route.ts`                       | API statistik carian                           |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Tab papan pemuka analitis                      |
| `src/lib/db/migrations/007_search_request_type.sql`              | Penghijrahan DB                                |
| `tests/unit/search-registry.test.mjs`                            | 277 baris ujian unit                           | --- |

## [2.7.0] — 2026-03-17

> Sprint: Ciri yang diilhamkan ClawRouter — bendera pemanggil alat, pengesanan niat berbilang bahasa, sandaran dipacu penanda aras, penyahduplikasi permintaan, Strategi Penghala boleh pasang, Grok-4 Fast + GLM-5 + harga MiniMax M2.5 + Kimi K2.5.### ✨ New Models & Pricing

-**feat(harga)**: xAI Grok-4 Fast — `$0.20/$0.50 setiap token 1M`, kependaman 1143ms p50, panggilan alat disokong -**pencapaian(harga)**: xAI Grok-4 (standard) — `$0.20/$1.50 setiap token 1M`, penaakulan perdana -**pencapaian(harga)**: GLM-5 melalui Z.AI — `$0.5/1J`, konteks output 128K -**feat(pricing)**: MiniMax M2.5 — `$0.30/1M input`, penaakulan + tugas agen -**feat(pricing)**: DeepSeek V3.2 — harga dikemas kini `$0.27/$1.10 setiap 1J` -**feat(harga)**: Kimi K2.5 melalui Moonshot API — akses terus Moonshot API -**feat(penyedia)**: Penyedia Z.AI ditambahkan (alias `zai`) — keluarga GLM-5 dengan output 128K### 🧠 Routing Intelligence

-**feat(registry)**: Bendera `toolCalling` setiap model dalam registry penyedia — kombo kini boleh memilih/memerlukan model yang mampu memanggil alat -**pencapaian(pemarkahan)**: Pengesanan niat berbilang bahasa untuk pemarkahan AutoCombo — Skrip PT/ZH/ES/AR/corak bahasa mempengaruhi pemilihan model setiap konteks permintaan -**feat(fallback)**: Rantai sandaran dipacu penanda aras — data kependaman sebenar (p50 daripada `comboMetrics`) digunakan untuk menyusun semula keutamaan sandaran secara dinamik -**feat(dedup)**: Minta penduaan melalui cincang kandungan — tetingkap idempotency 5 saat menghalang panggilan pembekal pendua daripada mencuba semula pelanggan -**feat(router)**: Antara muka `RouterStrategy` boleh pasang dalam `autoCombo/routerStrategy.ts` — logik penghalaan tersuai boleh disuntik tanpa mengubah teras### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 skema alat lanjutan baharu: `omniroute_get_provider_metrics` (p50/p95/p99 setiap pembekal) dan `omniroute_explain_route` (penjelasan keputusan penghalaan) -**feat(mcp)**: Skop pengesahan alat MCP dikemas kini — skop `metrik:baca` ditambahkan untuk alatan metrik pembekal -**feat(mcp)**: `omniroute_best_combo_for_task` kini menerima parameter `languageHint` untuk penghalaan berbilang bahasa### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` dilanjutkan dengan penjejakan persentil latency masa nyata bagi setiap pembekal/akaun -**feat(health)**: Health API (`/api/monitoring/health`) kini mengembalikan setiap penyedia medan `p50Latency` dan `errorRate` -**feat(usage)**: Penghijrahan sejarah penggunaan untuk penjejakan latensi setiap model### 🗄️ DB Migrations

-**feat(migration)**: Lajur baharu `latency_p50` dalam jadual `combo_metrics` — pecah sifar, selamat untuk pengguna sedia ada### 🐛 Bug Fixes / Closures

-**close(#411)**: peleraian modul cincang better-sqlite3 pada Windows — ditetapkan dalam v2.6.10 (f02c5b5) -**tutup(#409)**: Penyelesaian sembang Copilot GitHub gagal dengan model Claude apabila fail dilampirkan — ditetapkan dalam v2.6.9 (838f1d6) -**close(#405)**: Pendua #411 — diselesaikan## [2.6.10] — 2026-03-17

> Pembetulan Windows: muat turun terbina lebih baik-sqlite3 tanpa nod-gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: Pada Windows, `npm install -g omniroute` pernah gagal dengan `better_sqlite3.node bukan aplikasi Win32 yang sah` kerana binari asli yang digabungkan telah disusun untuk Linux. Menambah**Strategi 1.5**pada `scripts/postinstall.mjs`: menggunakan `@mapbox/node-pre-gyp install --fallback-to-build=false` (digabungkan dalam `better-sqlite3`) untuk memuat turun binari prabina yang betul untuk OS/arch semasa tanpa memerlukan sebarang alat binaan, tiada nod, nod gyp. Kembali ke `npm rebuild` hanya jika muat turun gagal. Menambahkan mesej ralat khusus platform dengan arahan pembetulan manual yang jelas.---

## [2.6.9] — 2026-03-17

> Pembetulan CI (sebarang belanjawan t11), pembetulan pepijat #409 (lampiran fail melalui Copilot+Claude), keluarkan pembetulan aliran kerja.### 🐛 Bug Fixes

-**fix(ci)**: Alih keluar perkataan "any" daripada ulasan dalam `openai-responses.ts` dan `chatCore.ts` yang gagal dalam t11 `any` semakan belanjawan (positif palsu daripada ulasan pengiraan regex) -**fix(chatCore)**: Normalkan jenis bahagian kandungan yang tidak disokong sebelum memajukan kepada pembekal (#409 — Kursor menghantar `{type:"file"}` apabila fail `.md` dilampirkan; Copilot dan pembekal OpenAI-compat lain menolak dengan "jenis mestilah sama ada 'image_url' atau 'text'"; betulkan menukar `fail teks` yang tidak diketahui)### 🔧 Workflow

-**tugas(jana-keluaran)**: Tambah ATOMIC COMMIT RULE — bonggol versi (`tampung versi npm`) MESTI berlaku sebelum melakukan fail ciri untuk memastikan teg sentiasa menghala ke komit yang mengandungi semua perubahan versi bersama-sama---

## [2.6.8] — 2026-03-17

> Pecut: Kombo sebagai Ejen (gesaan sistem + penapis alat), Perlindungan Caching Konteks, Kemas Kini Auto, Log Terperinci, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `UBAH JADUAL gabungan TAMBAH COLUMN system_message TEXT DEFAULT NULL`, `tool_filter_regex TEXT DEFAULT NULL`, `context_cache_protection INTEGER DEFAULT 0` -**006_detailed_request_logs.sql**: Jadual `request_detail_logs` baharu dengan pencetus penimbal cincin 500 kemasukan, ikut serta melalui togol tetapan### Ciri-ciri

-**feat(combo)**: System Message Override setiap Combo (#399 — medan `system_message` menggantikan atau menyuntik gesaan sistem sebelum memajukan kepada pembekal) -**feat(combo)**: Penapis Alat Regex setiap Kombo (#399 — `tool_filter_regex` hanya menyimpan corak padanan alatan; menyokong format OpenAI + Anthropic) -**feat(combo)**: Perlindungan Caching Konteks (#401 — respons teg `context_cache_protection` dengan `<omniModel>provider/model</omniModel>` dan model pin untuk kesinambungan sesi) -**feat(settings)**: Auto-Update melalui Settings (#320 — `GET /api/system/version` + `POST /api/system/update` — semak pendaftaran npm dan kemas kini di latar belakang dengan pm2 restart) -**feat(logs)**: Log Permintaan Terperinci (#378 — menangkap badan saluran paip penuh pada 4 peringkat: permintaan pelanggan, permintaan diterjemahkan, respons penyedia, respons pelanggan — togol ikut serta, trim 64KB, penimbal cincin 500 masuk) -**feat(mitm)**: Profil IDE MITM Kiro (#336 — `src/mitm/targets/kiro.ts` menyasarkan api.anthropic.com, menggunakan semula infrastruktur MITM sedia ada)---

## [2.6.7] — 2026-03-17

> Sprint: Penambahbaikan SSE, sambungan provider_nodes setempat, daftar proksi, pembetulan laluan Claude.### Ciri-ciri

-**feat(health)**: Pemeriksaan kesihatan latar belakang untuk `provider_nodes` setempat dengan backoff eksponen (30s→300s) dan `Promise.allSettled` untuk mengelakkan sekatan (#423, @Regis-RCR) -**feat(embeddings)**: Halakan `/v1/embeddings` ke `provider_nodes` setempat — `buildDynamicEmbeddingProvider()` dengan pengesahan nama hos (#422, @Regis-RCR) -**feat(audio)**: Halakan TTS/STT ke `provider_nodes` setempat — `buildDynamicAudioProvider()` dengan perlindungan SSRF (#416, @Regis-RCR) -**feat(proxy)**: Pendaftaran proksi, API pengurusan dan generalisasi had kuota (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Strip medan khusus Claude (`metadata`, `anthropic_version`) apabila sasaran ialah OpenAI-compat (#421, @prakersh) -**fix(sse)**: Ekstrak penggunaan Claude SSE (`input_tokens`, `output_tokens`, token cache) dalam mod strim laluan (#420, @prakersh) -**fix(sse)**: Jana sandaran `call_id` untuk panggilan alat dengan ID hilang/kosong (#419, @prakersh) -**fix(sse)**: Laluan Claude-to-Claude — badan hadapan tidak disentuh sepenuhnya, tiada terjemahan semula (#418, @prakersh) -**fix(sse)**: Tapis item `tool_result` yatim selepas pemadatan konteks Kod Claude untuk mengelakkan 400 ralat (#417, @prakersh) -**fix(sse)**: Langkau panggilan alat nama kosong dalam penterjemah API Respons untuk mengelakkan gelung tak terhingga `placeholder_tool` (#415, @prakersh) -**fix(sse)**: Keluarkan blok kandungan teks kosong sebelum terjemahan (#427, @prakersh) -**fix(api)**: Tambahkan `refreshable: true` pada konfigurasi ujian Claude OAuth (#428, @prakersh)### 📦 Dependencies

- Bump `vitest`, `@vitest/*` dan devDependencies yang berkaitan (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Pembetulan terkini: Keserasian Turbopack/Docker — alih keluar protokol `nod:` daripada semua import `src/`.### 🐛 Bug Fixes

-**fix(build)**: Mengalih keluar awalan protokol `nod:` daripada pernyataan `import` dalam 17 fail di bawah `src/`. Import `node:fs`, `node:path`, `node:url`, `node:os` dsb. menyebabkan `Fail Ecmascript mengalami ralat` pada binaan Turbopack (Next.js 15 Docker) dan pada peningkatan daripada pemasangan global npm yang lebih lama. Fail yang terjejas: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts` dan 12 yang lain dalam `src/app/api/` dan `src/lib/`. -**tugas(aliran kerja)**: Dikemas kini `generate-release.md` untuk menjadikan Docker Hub sync dan dwi-VPS menggunakan**mandatori**langkah dalam setiap keluaran.---

## [2.6.5] — 2026-03-17

> Sprint: penapisan param model penaakulan, pembetulan penyedia tempatan 404, pembekal Kilo Gateway, benjolan pergantungan.### ✨ New Features

-**feat(api)**: Menambah**Kilo Gateway**(`api.kilo.ai`) sebagai pembekal Kunci API baharu (alias `kg`) — 335+ model, 6 model percuma, 3 model penghalaan automatik (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Model laluan yang disokong melalui titik akhir `/api/gateway/models`. (PR #408 oleh @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Strip parameter yang tidak disokong untuk model penaakulan (o1, o1-mini, o1-pro, o3, o3-mini). Model dalam keluarga `o1`/`o3` menolak `suhu`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs` dan `n` dengan HTTP 400. Parameter kini dilucutkan pada lapisan `chatCore` sebelum ke hadapan. Menggunakan medan deklaratif `unsupportedParams` setiap model dan Peta O(1) prakiraan untuk carian. (PR #412 oleh @Regis-RCR) -**fix(sse)**: Penyedia tempatan 404 kini menghasilkan**kunci keluar model sahaja (5 saat)**dan bukannya kunci keluar peringkat sambungan (2 minit). Apabila hujung belakang inferens setempat (Ollama, LM Studio, oMLX) mengembalikan 404 untuk model yang tidak diketahui, sambungan kekal aktif dan model lain terus berfungsi serta-merta. Juga membetulkan pepijat sedia ada yang mana `model` tidak dihantar kepada `markAccountUnavailable()`. Pembekal setempat dikesan melalui nama hos (`localhost`, `127.0.0.1`, `::1`, boleh dilanjutkan melalui `LOCAL_HOSTNAMES` env var). (PR #410 oleh @Regis-RCR)### 📦 Dependencies

- `better-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proksi-ejen` 7 → 8
- `asas ejen` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**pembetulan(penyedia)**: Mengalih keluar nama model yang tidak wujud merentas 5 pembekal: -**gemini / gemini-cli**: dialih keluar `gemini-3.1-pro/flash` dan `gemini-3-*-preview` (tidak wujud dalam Google API v1beta); digantikan dengan `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**antigraviti**: dialih keluar `gemini-3.1-pro-high/low` dan `gemini-3-flash` (alias dalaman tidak sah); digantikan dengan model 2.x sebenar -**github (Copilot)**: dialih keluar `gemini-3-flash-preview` dan `gemini-3-pro-preview`; digantikan dengan `gemini-2.5-flash` -**nvidia**: diperbetulkan `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM menggunakan ruang nama `meta/` untuk model Meta); menambahkan `nvidia/llama-3.1-70b-instruct` dan `nvidia/llama-3.1-405b-instruct` -**fix(db/combo)**: Kombo `free-stack` yang dikemas kini pada DB jauh: dialih keluar `qw/qwen3-coder-plus` (token refresh tamat tempoh), dibetulkan `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct-mini`, corrected-minilash`1 → `gemini/gemini-2.5-flash`, ditambah `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint: jalur cincang zod/pino dimasukkan ke dalam saluran paip binaan, pembekal sintetik ditambah, laluan VPS PM2 diperbetulkan.### 🐛 Bug Fixes

-**fix(build)**: Turbopack hash-strip kini berjalan pada**compile time**untuk SEMUA pakej — bukan hanya `better-sqlite3`. Langkah 5.6 dalam `prepublish.mjs` berjalan setiap `.js` dalam `app/.next/server/` dan menanggalkan akhiran hex 16-char daripada mana-mana cincang `require()`. Membetulkan `zod-dcb22c...`, `pino-...`, dsb. MODULE_NOT_FOUND pada pemasangan npm global. Tutup #398 -**fix(deploy)**: PM2 pada kedua-dua VPS menunjuk ke direktori git-clone yang lapuk. Dikonfigurasikan semula kepada `app/server.js` dalam pakej global npm. Aliran kerja `/deploy-vps` dikemas kini untuk menggunakan `npm pack + scp` (pendaftaran npm menolak pakej 299MB).### Ciri-ciri

-**feat(provider)**: Synthetic ([synthetic.new](https://synthetic.new)) — inferens serasi OpenAI yang memfokuskan privasi. `passthroughModels: true` untuk katalog model HuggingFace dinamik. Model awal: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 oleh @Regis-RCR)### 📋 Issues Closed

-**tutup #398**: regresi cincang npm — ditetapkan oleh jalur cincang masa kompilasi dalam praterbit -**triage #324**: Tangkapan skrin pepijat tanpa langkah — meminta butiran pengeluaran semula---

## [2.6.2] — 2026-03-16

> Sprint: pencincangan modul ditetapkan sepenuhnya, 2 PR digabungkan (penapis alat Anthropic + laluan titik akhir tersuai), pembekal Alibaba Cloud DashScope ditambah, 3 isu lapuk ditutup.### 🐛 Bug Fixes

-**fix(build)**: Jalur cincang `luaran` webpack lanjutan untuk merangkumi SEMUA `serverExternalPackages`, bukan hanya `better-sqlite3`. Next.js 16 Turbopack mencincang `zod`, `pino` dan setiap pakej luar pelayan lain ke dalam nama seperti `zod-dcb22c6336e0bc69` yang tidak wujud dalam `node_modules` pada masa jalan. HASH_PATTERN regex catch-all kini menghapuskan akhiran 16-char dan kembali kepada nama pakej asas. Juga menambahkan `NEXT_PRIVATE_BUILD_WORKER=0` dalam `prepublish.mjs` untuk mengukuhkan mod webpack, serta imbasan pasca binaan yang melaporkan sebarang rujukan cincang yang tinggal. (#396, #398, PR #403) -**fix(chat)**: Nama alat format anthropic (`tool.name` tanpa pembalut `.function`) telah digugurkan secara senyap oleh penapis nama kosong yang diperkenalkan dalam #346. Proksi LiteLLM meminta dengan awalan `anthropic/` dalam format API Mesej Anthropic, menyebabkan semua alatan ditapis dan Anthropic mengembalikan `400: tool_choice.any hanya boleh ditentukan semasa menyediakan alatan`. Dibetulkan dengan kembali ke `tool.name` apabila `tool.function.name` tiada. Menambah 8 ujian unit regresi. (PR #397)### Ciri-ciri

-**feat(api)**: Laluan titik akhir tersuai untuk nod penyedia serasi OpenAI — konfigurasikan `chatPath` dan `modelsPath` setiap nod (cth. `/v4/chat/completions`) dalam UI sambungan pembekal. Termasuk migrasi DB (`003_provider_node_custom_paths.sql`) dan sanitasi laluan URL (tiada `..` traversal, mesti bermula dengan `/`). (PR #400) -**feat(provider)**: Alibaba Cloud DashScope ditambah sebagai penyedia serasi OpenAI. Titik akhir antarabangsa: `dashscope-intl.aliyuncs.com/compatible-mode/v1`. 12 model: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Pengesahan: Kunci API pembawa.### 📋 Issues Closed

-**tutup #323**: Ralat sambungan Cline `[objek objek]` — dibetulkan dalam v2.3.7; mengarahkan pengguna untuk menaik taraf daripada v2.2.9 -**tutup #337**: Penjejakan kredit Kiro — dilaksanakan dalam v2.5.5 (#381); menuding pengguna ke Papan Pemuka → Penggunaan -**triage #402**: ARM64 macOS DMG rosak — meminta versi macOS, ralat tepat dan menasihatkan penyelesaian `xattr -d com.apple.quarantine`---

## [2.6.1] — 2026-03-15

> Pembetulan permulaan kritikal: pemasangan npm global v2.6.0 ranap dengan ralat 500 disebabkan pepijat pencincang nama modul Turbopack/webpack dalam cangkuk instrumentasi Next.js 16.### 🐛 Bug Fixes

-**fix(build)**: Paksa `better-sqlite3` sentiasa dikehendaki oleh nama pakej tepatnya dalam bungkusan pelayan webpack. Next.js 16 menyusun cangkuk instrumentasi ke dalam ketulan berasingan dan mengeluarkan `require('better-sqlite3-<hash>')` — nama modul cincang yang tidak wujud dalam `node_modules` — walaupun pakej itu disenaraikan dalam `serverExternalPackages`. Menambahkan fungsi `luaran` eksplisit pada konfigurasi webpack pelayan supaya pengikat sentiasa mengeluarkan `require('better-sqlite3')`, menyelesaikan permulaan `500 Internal Server Error` pada pemasangan global yang bersih. (#394, PR #395)### 🔧 CI

-**ci**: Menambahkan `workflow_dispatch` pada `npm-publish.yml` dengan perlindungan penyegerakan versi untuk pencetus manual (#392) -**ci**: Menambahkan `workflow_dispatch` pada `docker-publish.yml`, mengemas kini Tindakan GitHub kepada versi terkini (#392)---

## [2.6.0] - 2026-03-15

> Pecutan penyelesaian isu: 4 pepijat diperbaiki, log UX dipertingkatkan, penjejakan kredit Kiro ditambah.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI dan SD WebUI tidak lagi muncul dalam senarai penyedia halaman Media apabila tidak dikonfigurasikan — mengambil `/api/providers` pada pelekap dan menyembunyikan penyedia tempatan tanpa sambungan (#390) -**fix(auth)**: Round-robin tidak lagi memilih semula akaun terhad kadar sejurus selepas cooldown — `backoffLevel` kini digunakan sebagai kunci isihan utama dalam putaran LRU (#340) -**fix(oauth)**: Qoder (dan pembekal lain yang mengubah hala ke UI mereka sendiri) tidak lagi membiarkan mod OAuth tersekat pada "Menunggu Keizinan" — peralihan automatik pengesan tertutup pop timbul ke mod input URL manual (#344) -**fix(logs)**: Jadual log permintaan kini boleh dibaca dalam mod terang — lencana status, kiraan token dan teg kombo menggunakan kelas warna `gelap:` adaptif (#378)### Ciri-ciri

-**feat(kiro)**: Penjejakan kredit Kiro ditambahkan pada pengambil penggunaan — pertanyaan `getUserCredits` daripada titik akhir AWS CodeWhisperer (#337)### 🛠 Chores

-**tugas(ujian)**: Dijajarkan `test:plan3`, `test:fixes`, `test:security` untuk menggunakan pemuat `tsx/esm` yang sama seperti `npm test` — menghapuskan negatif palsu resolusi modul dalam larian yang disasarkan (PR #386)---

## [2.5.9] - 2026-03-15

> Pembetulan laluan masuk asli Codex + pengerasan pengesahan badan laluan.### 🐛 Bug Fixes

-**fix(codex)**: Kekalkan laluan API Respons asli untuk klien Codex — mengelakkan mutasi terjemahan yang tidak perlu (PR #387) -**fix(api)**: Sahkan badan permintaan pada penetapan harga/penyegerakan dan laluan penghalaan tugas — menghalang ranap sistem daripada input yang tidak betul (PR #388) -**fix(auth)**: Rahsia JWT berterusan sepanjang permulaan semula melalui `src/lib/db/secrets.ts` — menghapuskan 401 ralat selepas pm2 dimulakan semula (PR #388)---

## [2.5.8] - 2026-03-15

> Pembetulan binaan: pulihkan sambungan VPS yang dipecahkan oleh penerbitan yang tidak lengkap v2.5.7.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` masih menggunakan bendera `--webpack` yang telah ditamatkan menyebabkan binaan kendiri Next.js gagal secara senyap — penerbitan npm selesai tanpa `app/server.js`, memecahkan penggunaan VPS---

## [2.5.7] - 2026-03-15

> Pembetulan pengendalian ralat taman permainan media.### 🐛 Bug Fixes

-**fix(media)**: Transkripsi "Kunci API Diperlukan" positif palsu apabila audio tidak mengandungi pertuturan (muzik, senyap) — kini menunjukkan "Tiada pertuturan dikesan" sebaliknya -**fix(media)**: `upstreamErrorResponse` dalam `audioTranscription.ts` dan `audioSpeech.ts` kini mengembalikan JSON yang betul (`{error:{message}}`), membolehkan pengesanan ralat kelayakan 401/403 yang betul dalam MediaPageClient -**fix(media)**: `parseApiError` kini mengendalikan medan `err_msg` Deepgram dan mengesan `"kunci api"` dalam mesej ralat untuk klasifikasi ralat kelayakan yang tepat---

## [2.5.6] - 2026-03-15

> Pembetulan keselamatan/auth kritikal: Antigraviti OAuth rosak + sesi JWT hilang selepas dimulakan semula.### 🐛 Bug Fixes

-**fix(oauth) #384**: Antigravity Google OAuth kini menghantar `client_secret` dengan betul ke titik akhir token. Sandaran untuk `ANTIGRAVITY_OAUTH_CLIENT_SECRET` ialah rentetan kosong, yang palsu — jadi `client_secret` tidak pernah disertakan dalam permintaan, menyebabkan ralat `"client_secret is missing"` untuk semua pengguna tanpa var env tersuai. Tutup #383. -**fix(auth) #385**: `JWT_SECRET` kini dikekalkan ke SQLite (`namespace='rahsia'`) pada generasi pertama dan dimuat semula pada permulaan berikutnya. Sebelum ini, rahsia rawak baharu telah dihasilkan setiap permulaan proses, membatalkan semua kuki/sesi sedia ada selepas sebarang permulaan semula atau peningkatan. Mempengaruhi kedua-dua `JWT_SECRET` dan `API_KEY_SECRET`. Tutup #382.---

## [2.5.5] - 2026-03-15

> Pembetulan pengurangan senarai model, pengerasan binaan kendiri Elektron, dan penjejakan kredit Kiro.### 🐛 Bug Fixes

-**fix(models) #380**: `GET /api/models` kini termasuk alias penyedia semasa membina penapis pembekal aktif — model untuk `claude` (alias `cc`) dan `github` (alias `gh`) sentiasa ditunjukkan tanpa mengira sama ada sambungan telah dikonfigurasikan, kerana `PROVIDER_MODELS` yang dikonfigurasikan adalah kekunci pembekal ID. Dibetulkan dengan mengembangkan setiap ID penyedia aktif untuk turut menyertakan aliasnya melalui `PROVIDER_ID_TO_ALIAS`. Tutup #353. -**fix(electron) #379**: `scripts/prepare-electron-standalone.mjs` baharu memperingkat satu bundle `/.next/electron-standalone` khusus sebelum pembungkusan Elektron. Dibatalkan dengan ralat yang jelas jika `node_modules` ialah symlink (pembina elektron akan menghantar kebergantungan masa jalan pada mesin binaan). Pembersihan laluan merentas platform melalui `path.basename`. Oleh @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Penjejakan baki kredit Kiro — titik akhir penggunaan kini mengembalikan data kredit untuk akaun Kiro dengan memanggil `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (titik akhir yang sama Kiro IDE menggunakan secara dalaman). Mengembalikan baki kredit, jumlah elaun, tarikh pembaharuan dan peringkat langganan. Tutup #337.## [2.5.4] - 2026-03-15

> Pembetulan permulaan logger, pembetulan keselamatan bootstrap log masuk dan peningkatan kebolehpercayaan HMR pembangun. Infrastruktur CI mengeras.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Pulihkan laluan logger pengangkutan pino — `formatters.level` digabungkan dengan `transport.targets` ditolak oleh pino. Konfigurasi yang disokong pengangkutan kini menghilangkan pemformat tahap melalui `getTransportCompatibleConfig()`. Juga membetulkan pemetaan peringkat angka dalam `/api/logs/console`: `30→maklumat, 40→amaran, 50→ralat` (telah dianjakkan oleh satu). -**fix(login) #375**: Halaman log masuk sekarang bootstraps daripada titik akhir `/api/settings/require-login` dan bukannya `/api/settings` yang dilindungi. Dalam persediaan yang dilindungi kata laluan, halaman pra-kebenaran telah menerima 401 dan kembali kepada lalai selamat tanpa perlu. Laluan awam kini mengembalikan semua metadata bootstrap (`requireLogin`, `hasPassword`, `setupComplete`) dengan sandaran 200 konservatif atas ralat. -**fix(dev) #374**: Tambahkan `localhost` dan `127.0.0.1` pada `allowedDevOrigins` dalam `next.config.mjs` — Soket web HMR telah disekat apabila mengakses apl melalui alamat gelung balik, menghasilkan amaran silang asal berulang.### 🔧 CI & Infrastructure

-**Pembetulan OOM ESLint**: `eslint.config.mjs` kini mengabaikan `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**`, dan `clipr/**` — ESLint telah ranap dengan timbunan JS OOM dengan mengimbas chunks dan kod binari VS. -**Pembetulan ujian unit**: Mengalih keluar `ALTER TABLE provider_connections yang lapuk TAMBAH COLUMN "kumpulan"` daripada 2 fail ujian — lajur kini merupakan sebahagian daripada skema asas (ditambah dalam #373), menyebabkan `SQLITE_ERROR: nama lajur pendua` pada setiap lajur CI. -**Pra-commit hook**: Menambahkan `npm run test:unit` kepada `.husky/pre-commit` — ujian unit kini menyekat komit yang rosak sebelum mencapai CI.## [2.5.3] - 2026-03-14

> Pembetulan pepijat kritikal: Penghijrahan skema DB, pemuatan env permulaan, pembersihan keadaan ralat penyedia dan pembetulan petua alat i18n. Peningkatan kualiti kod di atas setiap PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Tambahkan lajur `provider_connections.group` ke skema asas + migrasi pengisian semula untuk pangkalan data sedia ada — lajur telah digunakan dalam semua pertanyaan tetapi tiada dalam definisi skema -**fix(i18n) #371**: Gantikan kekunci `t("deleteConnection")` yang tidak wujud dengan kunci `providers.delete` sedia ada — betulkan `MISSING_MESSAGE: providers.deleteConnection` ralat masa jalan pada halaman butiran pembekal -**fix(auth) #372**: Kosongkan metadata ralat lapuk (`errorCode`, `lastErrorType`, `lastErrorSource`) daripada akaun pembekal selepas pemulihan tulen — sebelum ini, akaun yang dipulihkan terus dipaparkan sebagai gagal -**fix(startup) #369**: Satukan pemuatan env merentasi `npm run start`, `run-standalone.mjs` dan Electron untuk menghormati `DATA_DIR/.env → ~/.omniroute/.env → ./.env` keutamaan — menghalang penjanaan pangkalan data `STORAGE_ENCY `STORAGE_ENCY yang baharu### 🔧 Code Quality

- Corak `result.success` vs `response?.ok` yang didokumenkan dalam `auth.ts` (kedua-duanya disengajakan, kini dijelaskan)
- Dinormalkan `overridePath?.trim()` dalam `electron/main.js` untuk dipadankan dengan `bootstrap-env.mjs`
- Menambah ulasan pesanan gabungan `preferredEnv` dalam permulaan Electron

> Dasar kuota akaun Codex dengan penggiliran automatik, togol peringkat pantas, model gpt-5.4 dan pembetulan label analitis.### ✨ New Features (PRs #366, #367, #368)

-**Dasar Kuota Codex (PR #366)**: Tetingkap kuota 5j/mingguan setiap akaun bertukar-tukar dalam papan pemuka Penyedia. Akaun dilangkau secara automatik apabila tetingkap yang didayakan mencapai ambang 90% dan diterima semula selepas `resetAt`. Termasuk `quotaCache.ts` dengan pemeroleh status bebas kesan sampingan. -**Togol Peringkat Cepat Codex (PR #367)**: Papan Pemuka → Tetapan → Peringkat Perkhidmatan Codex. Togol mati lalai menyuntik `service_tier: "flex"` hanya untuk permintaan Codex, mengurangkan kos ~80%. Tindanan penuh: tab UI + titik akhir API + pelaksana + penterjemah + pemulihan permulaan. -**Model gpt-5.4 (PR #368)**: Menambahkan `cx/gpt-5.4` dan `codex/gpt-5.4` pada pendaftaran model Codex. Ujian regresi disertakan.### 🐛 Bug Fixes

-**pembetulan #356**: Carta analitis (Penyedia Teratas, Mengikut Akaun, Pecahan Penyedia) kini memaparkan nama/label pembekal yang boleh dibaca manusia dan bukannya ID dalaman mentah untuk penyedia yang serasi dengan OpenAI.

> Keluaran utama: strategi penghalaan rawak ketat, kawalan akses kunci API, kumpulan sambungan, penyegerakan harga luaran dan pembetulan pepijat kritikal untuk model pemikiran, ujian kombo dan pengesahan nama alat.### ✨ New Features (PRs #363 & #365)

-**Strategi Penghalaan Rawak Ketat**: dek shuffle Fisher-Yates dengan jaminan anti ulangan dan siri mutex untuk permintaan serentak. Dek bebas bagi setiap kombo dan setiap pembekal. -**Kawalan Akses Kunci API**: `allowedConnections` (menghadkan sambungan mana yang boleh digunakan oleh kunci), `is_active` (dayakan/lumpuhkan kunci dengan 403), `Jadual akses` (kawalan akses berasaskan masa), togol `autoResolve`, namakan semula kunci melalui PATCH. -**Kumpulan Sambungan**: Sambungan pembekal kumpulan mengikut persekitaran. Paparan akordion dalam halaman Had dengan kegigihan localStorage dan suis auto pintar. -**Penyegerakan Harga Luaran (LiteLLM)**: Resolusi harga 3 peringkat (pengguna menimpa → disegerakkan → lalai). Ikut serta melalui `PRICING_SYNC_ENABLED=true`. Alat MCP `omniroute_sync_pricing`. 23 ujian baharu. -**i18n**: 30 bahasa dikemas kini dengan strategi rawak ketat, rentetan pengurusan kunci API. pt-BR diterjemahkan sepenuhnya.### 🐛 Bug Fixes

-**pembetulan #355**: Tamat masa melahu strim meningkat daripada 60-an kepada 300-an — menghalang model pemikiran lanjutan (claude-opus-4-6, o3, dsb.) yang digugurkan semasa fasa penaakulan yang panjang. Boleh dikonfigurasikan melalui `STREAM_IDLE_TIMEOUT_MS`. -**fix #350**: Ujian kombo kini memintas `REQUIRE_API_KEY=true` menggunakan pengepala dalaman dan menggunakan format serasi OpenAI secara universal. Tamat masa dilanjutkan daripada 15s hingga 20s. -**pembetulan #346**: Alat dengan `function.name` kosong (dimajukan oleh Kod Claude) kini ditapis sebelum penyedia huluan menerimanya, menghalang ralat "Input [N] tidak sah: rentetan kosong".### 🗑️ Closed Issues

-**#341**: Bahagian nyahpepijat dialih keluar — penggantian ialah `/papan pemuka/log` dan `/papan pemuka/kesihatan`.

> Sokongan Round-Robin Kunci API untuk persediaan pembekal berbilang kunci, dan pengesahan penghalaan kad bebas dan tetingkap kuota yang telah disediakan.### ✨ New Features

-**Kekunci API Round-Robin (T07)**: Sambungan pembekal kini boleh memegang berbilang kunci API (Edit Sambungan → Kekunci API Tambahan). Permintaan memutarkan round-robin antara kunci utama + tambahan melalui `providerSpecificData.extraApiKeys[]`. Kekunci disimpan dalam memori diindeks setiap sambungan — tiada perubahan skema DB diperlukan.### 📝 Already Implemented (confirmed in audit)

-**Penghalaan Model Kad Liar (T13)**: `wildcardRouter.ts` dengan padanan kad bebas gaya glob (`gpt*`, `claude-?-sonnet`, dsb.) sudah pun disepadukan ke dalam `model.ts` dengan kedudukan kekhususan. -**Kuota Window Rolling (T08)**: `accountFallback.ts:isModelLocked()` sudah auto-majukan tetingkap — jika `Date.now() > entry.until`, kunci dipadamkan serta-merta (tiada sekatan basi).

> Pengilat UI, penambahan strategi penghalaan dan pengendalian ralat yang anggun untuk had penggunaan.### ✨ New Features

-**Strategi Penghalaan Isi-Dulu & P2C**: Ditambah `isi-dahulu` (kuota habis sebelum meneruskan) dan `p2c` (Pemilihan kependaman rendah Kuasa-Dua-Pilihan) kepada pemilih strategi kombo, dengan panel panduan penuh dan lencana berkod warna. -**Model Pratetap Tindanan Percuma**: Mencipta kombo dengan templat Tindanan Percuma kini mengisi secara automatik 7 model pembekal percuma terbaik dalam kelasnya (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Pengguna hanya mengaktifkan penyedia dan dapatkan kombo $0/bulan di luar kotak. -**Modal Kombo Lebih Luas**: Cipta/Edit modal kombo kini menggunakan `max-w-4xl` untuk pengeditan yang selesa bagi gabungan besar.### 🐛 Bug Fixes

-**Had halaman HTTP 500 untuk Codex & GitHub**: `getCodexUsage()` dan `getGitHubUsage()` kini mengembalikan mesej mesra pengguna apabila pembekal mengembalikan 401/403 (token tamat tempoh), bukannya membuang dan menyebabkan ralat 500 pada halaman Had. -**MaintenanceBanner positif palsu**: Sepanduk tidak lagi menunjukkan "Pelayan tidak dapat dicapai" secara palsu pada pemuatan halaman. Dibetulkan dengan memanggil `checkHealth()` serta-merta pada pelekap dan mengalih keluar penutupan keadaan `show` yang lapuk. -**Petua alat ikon penyedia**: Edit (pensel) dan padam butang ikon dalam baris sambungan pembekal kini mempunyai petua alat HTML asli — kesemua 6 ikon tindakan kini didokumenkan sendiri.

> Pelbagai peningkatan daripada analisis isu komuniti, sokongan pembekal baharu, pembetulan pepijat untuk penjejakan token, penghalaan model dan kebolehpercayaan penstriman.### ✨ New Features

-**Task-Aware Smart Routing (T05)**: Pemilihan model automatik berdasarkan jenis kandungan permintaan — pengekodan → deepseek-chat, analisis → gemini-2.5-pro, vision → gpt-4o, ringkasan → gemini-2.5-flash. Boleh dikonfigurasikan melalui Tetapan. API `GET/PUT/POST /api/settings/task-routing` baharu. -**Pembekal HuggingFace**: Menambah Penghala HuggingFace sebagai pembekal serasi OpenAI dengan Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Pembekal Vertex AI**: Menambahkan pembekal Vertex AI (Google Cloud) dengan Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude melalui Vertex. -**Muat Naik Fail Taman Permainan**: Muat naik audio untuk transkripsi, muat naik imej untuk model penglihatan (auto pengesan mengikut nama model), pemaparan imej sebaris untuk hasil penjanaan imej. -**Maklum Balas Visual Pilih Model**: Model yang sudah ditambah dalam pemilih kombo kini menunjukkan ✓ lencana hijau — menghalang kekeliruan pendua. -**Keserasian Qwen (PR #352)**: Tetapan Ejen Pengguna dan cap jari CLI yang dikemas kini untuk keserasian pembekal Qwen. -**Pengurusan Negeri Round-Robin (PR #349)**: Logik round-robin yang dipertingkatkan untuk mengendalikan akaun yang dikecualikan dan mengekalkan keadaan putaran dengan betul. -**Papan keratan UX (PR #360)**: Operasi papan keratan dikeraskan dengan sandaran untuk konteks tidak selamat; Penambahbaikan normalisasi alat Claude.### 🐛 Bug Fixes

-**Betulkan #302 — Strim OpenAI SDK=False drops tool_calls**: T01 Terima rundingan pengepala tidak lagi memaksa penstriman apabila `body.stream` secara eksplisit `palsu`. Telah menyebabkan tool_calls digugurkan secara senyap apabila menggunakan OpenAI Python SDK dalam mod bukan penstriman. -**Betulkan #73 — Claude Haiku dihalakan ke OpenAI tanpa awalan pembekal**: model `claude-*` yang dihantar tanpa awalan pembekal kini dihalakan dengan betul ke pembekal `antigravity` (Anthropic). Ditambahkan `gemini-*`/`gemma-*` → `gemini` heuristik juga. -**Betulkan #74 — Token dikira sentiasa 0 untuk penstriman Antigraviti/Claude**: Acara SSE `message_start` yang membawa `input_tokens` tidak dihuraikan oleh `extractUsage()`, menyebabkan semua kiraan token input menurun. Penjejakan token input/output kini berfungsi dengan betul untuk respons penstriman. -**Betulkan #180 — Pendua import model tanpa maklum balas**: `ModelSelectModal` kini menunjukkan ✓ sorotan hijau untuk model yang sudah ada dalam kombo, menjadikannya jelas bahawa ia telah ditambahkan. -**Ralat penjanaan halaman media**: Hasil imej kini dipaparkan sebagai teg `<img>` dan bukannya JSON mentah. Hasil transkripsi ditunjukkan sebagai teks yang boleh dibaca. Ralat kelayakan menunjukkan sepanduk ambar dan bukannya kegagalan senyap. -**Butang muat semula token pada halaman pembekal**: UI muat semula token manual ditambahkan untuk pembekal OAuth.### 🔧 Improvements

-**Registry Penyedia**: HuggingFace dan Vertex AI ditambahkan pada `providerRegistry.ts` dan `providers.ts` (frontend). -**Baca Cache**: `src/lib/db/readCache.ts` baharu untuk cache baca DB yang cekap. -**Cache Kuota**: Cache kuota dipertingkat dengan pengusiran berasaskan TTL.### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Fail                                          | Tujuan                                       |
| --------------------------------------------- | -------------------------------------------- | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Logik penghalaan sedar tugas (7 jenis tugas) |
| `src/app/api/settings/task-routing/route.ts`  | API konfigurasi penghalaan tugas             |
| `src/app/api/providers/[id]/refresh/route.ts` | Muat semula token OAuth manual               |
| `src/lib/db/readCache.ts`                     | Cache baca DB yang cekap                     |
| `src/shared/utils/clipboard.ts`               | Papan keratan dikeraskan dengan sandaran     | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Modal kombo: Tindanan Percuma boleh dilihat dan menonjol**— Templat Tindanan Percuma telah disembunyikan (ke-4 dalam grid 3 lajur). Dibetulkan: dialihkan ke kedudukan 1, ditukar kepada grid 2x2 supaya semua 4 templat kelihatan, jidar hijau + sorotan lencana PERCUMA.## [2.4.0] - 2026-03-13

> **Keluaran utama**— Ekosistem Stack Percuma, baik pulih taman permainan transkripsi, 44+ pembekal, dokumentasi peringkat percuma yang komprehensif dan penambahbaikan UI secara menyeluruh.### Ciri-ciri

-**Kombo: Templat Tindanan Percuma**— Templat ke-4 baharu "Timbunan Percuma ($0)" menggunakan round-robin merentas Kiro + Qoder + Qwen + Gemini CLI. Mencadangkan kombo kos sifar pra-bina pada penggunaan pertama. -**Media/Transkripsi: Deepgram sebagai lalai**— Deepgram (Nova 3, $200 percuma) kini merupakan pembekal transkripsi lalai. AssemblyAI ($50 percuma) dan Groq Whisper (percuma selamanya) ditunjukkan dengan lencana kredit percuma. -**README: Bahagian "Mula Percuma"**— Jadual 5 langkah awal-README baharu yang menunjukkan cara menyediakan AI kos sifar dalam beberapa minit. -**README: Kombo Transkripsi Percuma**— Bahagian baharu dengan cadangan kombo Deepgram/AssemblyAI/Groq dan butiran kredit percuma setiap pembekal. -**providers.ts: hasFree flag**— NVIDIA NIM, Cerebras dan Groq ditandai dengan hasFree lencana dan freeNote untuk UI penyedia. -**i18n: templateFreeStack keys**— Templat kombo Stack Percuma diterjemahkan dan disegerakkan ke semua 30 bahasa.## [2.3.16] - 2026-03-13

### Dokumentasi

-**README: 44+ Pembekal**— Mengemas kini kesemua 3 kejadian "36+ penyedia" kepada "44+" yang menggambarkan kiraan pangkalan kod sebenar (44 pembekal dalam providers.ts) -**README: Bahagian Baharu "🆓 Model Percuma — Apa Yang Anda Dapat Sebenarnya"**— Menambahkan jadual 7 pembekal dengan had kadar setiap model untuk: Kiro (Claude tanpa had melalui ID Builder AWS), Qoder (5 model tanpa had), Qwen (4 model tanpa had), Gemini CLI (180K~40), NVIDIA Cerebras (180K~40 tahun), NVIDIA Cereb NIM (selama-lamanya). tok/hari / 60K TPM), Groq (30 RPM / 14.4K RPD). Termasuk cadangan kombo \/usr/bin/bash Ultimate Free Stack. -**README: Jadual Harga Dikemas Kini**— Menambahkan Cerebras pada peringkat API KEY, NVIDIA tetap daripada "1000 kredit" kepada "percuma dev-forever", kiraan dan nama model Qoder/Qwen yang dikemas kini -**README: Qoder 8→5 model**(bernama: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**README: Qwen 3→4 model**(bernama: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Ciri-ciri

-**Papan Pemuka Auto-Kombo (Keutamaan Peringkat)**: Ditambahkan `🏷️ Peringkat` sebagai label faktor pemarkahan ke-7 dalam paparan pecahan faktor `/papan pemuka/kombo-auto` — kesemua 7 faktor pemarkahan Auto-Kombo kini boleh dilihat. -**i18n — bahagian autoCombo**: Menambah 20 kekunci terjemahan baharu untuk papan pemuka Auto-Kombo (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority`, dsb.) pada kesemua 30 fail bahasa.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Dipulihkan lalai `clientSecret` yang sah — sebelum ini adalah rentetan kosong, menyebabkan "Bukti kelayakan klien buruk" pada setiap percubaan sambungan. Bukti kelayakan awam kini menjadi sandaran lalai (boleh ditindih melalui env var `QODER_OAUTH_CLIENT_SECRET`). -**Pelayan MITM tidak ditemui (#335)**: `prepublish.mjs` kini menyusun `src/mitm/*.ts` kepada JavaScript menggunakan `tsc` sebelum menyalin ke himpunan npm. Sebelum ini hanya fail `.ts` mentah yang disalin — bermakna `server.js` tidak pernah wujud dalam pemasangan global npm/Volta. -**GeminiCLI tiada projectId (#338)**: Daripada membuang ralat 500 yang sukar apabila `projectId` tiada daripada bukti kelayakan yang disimpan (cth. selepas Docker dimulakan semula), OmniRoute kini merekodkan amaran dan mencuba permintaan itu — mengembalikan ralat pihak penyedia yang bermakna dan bukannya ranap OmniRoute. -**Versi elektron tidak padan (#323)**: Versi `electron/package.json` disegerakkan kepada `2.3.13` (adalah `2.0.13`) jadi versi binari desktop sepadan dengan pakej npm.### ✨ New Models (#334)

-**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Kod**: `gpt5.4`### 🔧 Improvements

-**Pemarkahan Peringkat (API + Pengesahan)**: Menambahkan `TierPriority` (berat `0.05`) pada skema Zod `ScoringWeights` dan laluan API `combos/auto` — faktor pemarkahan ke-7 kini diterima sepenuhnya oleh REST API dan disahkan pada input. berat `kestabilan` dilaraskan daripada `0.10` kepada `0.05` untuk mengekalkan jumlah keseluruhan = `1.0`.### ✨ New Features

-**Pemarkahan Kuota Berperingkat (Auto-Kombo)**: Ditambahkan `TierPriority` sebagai faktor pemarkahan ke-7 — akaun dengan peringkat Ultra/Pro kini diutamakan berbanding peringkat Percuma apabila faktor lain adalah sama. Medan pilihan baharu `accountTier` dan `quotaResetIntervalSecs` pada `ProviderCandidate`. Semua 4 pek mod dikemas kini (`cepat dihantar`, `penjimatan kos`, `kualiti-dahulukan`, `mesra luar talian`). -**Intra-Family Model Fallback (T5)**: Apabila model tidak tersedia (404/400/403), OmniRoute kini secara automatik kembali kepada model adik-beradik daripada keluarga yang sama sebelum mengembalikan ralat (`modelFamilyFallback.ts`). -**Tamat Masa Jambatan API Boleh Dikonfigurasikan**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var membolehkan operator menala tamat masa proksi (lalai 30s). Membetulkan ralat 504 pada respons huluan yang perlahan. (#332) -**Sejarah Bintang**: Menggantikan widget star-history.com dengan starchart.cc (`?variant=adaptive`) dalam kesemua 30 README — menyesuaikan diri dengan tema terang/gelap, kemas kini masa nyata.### 🐛 Bug Fixes

-**Auth — Kata laluan kali pertama**: `INITIAL_PASSWORD` env var kini diterima apabila menetapkan kata laluan papan pemuka pertama. Menggunakan `timingSafeEqual` untuk perbandingan masa tetap, menghalang serangan pemasaan. (#333) -**README Truncation**: Membetulkan teg penutup `</details>` yang hilang dalam bahagian Penyelesaian Masalah yang menyebabkan GitHub berhenti memaparkan segala-galanya di bawahnya (Tech Stack, Docs, Roadmap, Contributors). -**pnpm install**: Mengalih keluar override `@swc/helpers` berlebihan daripada `package.json` yang bercanggah dengan kebergantungan langsung, menyebabkan ralat `EOVERRIDE` pada pnpm. Menambahkan konfigurasi `pnpm.onlyBuiltDependencies`. -**CLI Path Injection (T12)**: Menambahkan pengesah `isSafePath()` dalam `cliRuntime.ts` untuk menyekat laluan traversal dan shell metacharacters dalam `CLI_*_BIN` env vars. -**CI**: Dijana semula `package-lock.json` selepas pengalihan keluar ganti untuk membetulkan kegagalan `npm ci` pada Tindakan GitHub.### 🔧 Improvements

-**Format Respons (T1)**: `format_respons` (json_schema/json_object) kini disuntik sebagai gesaan sistem untuk Claude, membolehkan keserasian output berstruktur. -**429 Cuba Semula (T2)**: Intra-URL cuba semula untuk 429 respons (2× percubaan dengan kelewatan 2s) sebelum kembali ke URL seterusnya. -**Pengepala Gemini CLI (T3)**: Menambah pengepala cap jari `Ejen-Pengguna` dan `X-Goog-Api-Client` untuk keserasian Gemini CLI. -**Katalog Harga (T9)**: Menambah entri harga `deepseek-3.1`, `deepseek-3.2` dan `qwen3-coder-next`.### 📁 New Files

| Fail                                       | Tujuan                                                    |
| ------------------------------------------ | --------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Model definisi keluarga dan logik sandaran dalam keluarga | ### Fixed |

-**KiloCode**: tamat masa pemeriksaan kesihatan kilocode sudah ditetapkan dalam v2.3.11 -**OpenCode**: Tambahkan kod terbuka pada pendaftaran cliRuntime dengan tamat masa pemeriksaan kesihatan 15s -**OpenClaw / Cursor**: Tingkatkan tamat masa pemeriksaan kesihatan kepada 15s untuk varian mula perlahan -**VPS**: Pasang pakej droid dan openclaw npm; aktifkan CLI_EXTRA_PATHS untuk kiro-cli -**cliRuntime**: Tambahkan pendaftaran alat kod terbuka dan tingkatkan tamat masa untuk meneruskan## [2.3.11] - 2026-03-12

### Fixed

-**Pemeriksaan kesihatan KiloCode**: Tingkatkan `healthcheckTimeoutMs` daripada 4000ms kepada 15000ms — kilocode memaparkan sepanduk logo ASCII semasa permulaan menyebabkan `healthcheck_failed` palsu pada persekitaran perlahan/mula sejuk## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Betulkan kegagalan `check:any-budget:t11` — gantikan `as any` dengan `as Record<string, unknown>` dalam OAuthModal.tsx (3 kejadian)### Docs

-**CLI-TOOLS.md**: Panduan lengkap untuk semua 11 alat CLI (claude, codex, gemini, opencode, cline, kilocode, continue, kiro-cli, cursor, droid, openclaw) -**i18n**: CLI-TOOLS.md disegerakkan kepada 30 bahasa dengan terjemahan tajuk + intro## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Titik tamat penyiapan OpenAI warisan baharu — menerima kedua-dua rentetan `prompt` dan tatasusunan `message`, menormalkan kepada format sembang secara automatik -**Halaman Akhir**: Kini menunjukkan kesemua 3 jenis titik akhir yang serasi dengan OpenAI: Penyelesaian Sembang, API Respons dan Penyelesaian Legasi -**i18n**: Menambahkan `completionsLegacy/completionsLegacyDesc` kepada 30 fail bahasa### Fixed

-**OAuthModal**: Betulkan `[objek Objek]` dipaparkan pada semua ralat sambungan OAuth — keluarkan dengan betul `.message` daripada objek tindak balas ralat dalam semua 3 panggilan `buang Ralat(data.error)` baharu (pertukaran, kod peranti, kebenaran)

- Mempengaruhi Cline, Codex, GitHub, Qwen, Kiro dan semua penyedia OAuth yang lain## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Tambahkan `decodeURIComponent` sebelum penyahkod base64 supaya kod pengesahan URL yang dikodkan daripada URL panggil balik dihuraikan dengan betul, membetulkan ralat "kod kebenaran tidak sah atau tamat tempoh" pada persediaan jauh (LAN IP) -**Cline OAuth**: `mapTokens` kini mengisi `name = firstName + lastName || e-mel` jadi akaun Cline menunjukkan nama pengguna sebenar dan bukannya "Account #ID" -**Nama akaun OAuth**: Semua aliran pertukaran OAuth (pertukaran, tinjauan pendapat, panggil balik tinjauan pendapat) kini menormalkan `nama = e-mel` apabila nama tiada, jadi setiap akaun OAuth menunjukkan e-melnya sebagai label paparan dalam papan pemuka Penyedia -**Nama akaun OAuth**: Mengalih keluar sandaran "Akaun N" berurutan dalam `db/providers.ts` — akaun tanpa e-mel/nama kini menggunakan label berasaskan ID yang stabil melalui `getAccountDisplayName()` dan bukannya nombor jujukan yang berubah apabila akaun dipadamkan## [2.3.6] - 2026-03-12

### Fixed

-**Batch ujian pembekal**: Skema Zod tetap untuk menerima `providerId: null` (frontend menghantar null untuk mod bukan penyedia); telah salah mengembalikan "Permintaan tidak sah" untuk semua ujian kelompok -**Mod ujian pembekal**: Paparan `[objek objek]` dengan menormalkan objek ralat API kepada rentetan sebelum dipaparkan dalam `setTestResults` dan `ProviderTestResultsView` -**i18n**: Menambahkan kekunci yang tiada `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` kepada `en.json` -**i18n**: 1111 kekunci hilang disegerakkan merentas semua 29 fail bukan bahasa Inggeris menggunakan nilai bahasa Inggeris sebagai sandaran## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Menambahkan tetapan `postinstall` tetap untuk menyalin `@swc/helpers` ke dalam `node_modules` apl kendiri — menghalang ranap MODULE_NOT_FOUND pada pemasangan npm global## [2.3.4] - 2026-03-10

### Added

- Penyepaduan berbilang pembekal dan penambahbaikan papan pemuka
