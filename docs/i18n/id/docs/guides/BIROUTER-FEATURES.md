---
title: "Fitur Kustom & Watchdog Birouter"
version: 1.0.0
lastUpdated: 2026-07-04
---

# Panduan Fitur Kustom & Watchdog Birouter

Panduan ini mendokumentasikan fitur integrasi kustom yang ditambahkan ke **Birouter**, khususnya berfokus pada layanan watchdog terowongan otomatis (tunnel watchdog), kemampuan pemulihan otomatis (auto-resume), enkripsi/dekripsi terowongan MITM, dan integrasi baki sistem (system tray).

---

## 🛡️ Watchdog Terowongan & Pemulihan Otomatis

Birouter menyertakan layanan pemantau latar belakang (`tunnelWatchdog`) yang berjalan terus-menerus untuk memastikan terowongan jaringan dan lapisan penangkapan lalu lintas tetap aktif.

### Layanan yang Didukung

Watchdog memantau tiga komponen utama:

1. **Terowongan Tailscale**: Memantau status klien Tailscale lokal. Jika Tailscale diaktifkan di pengaturan tetapi terputus atau offline, watchdog secara otomatis mencoba menyambungkan kembali koneksi terowongan.
2. **Terowongan Cloudflare (`cloudflared`)**: Membaca status koneksi dari file persistensi (`quick-tunnel-state.json`). Jika terowongan Cloudflare sebelumnya berjalan tetapi berhenti karena crash atau gangguan layanan, sistem akan memulihkan konektor secara otomatis.
3. **Proxy Dekripsi MITM (Windows)**: Memeriksa status MITM dan memverifikasi proses `.mitm.pid` yang aktif. Di Windows, jika proxy crash atau mati secara tidak bersih, watchdog secara otomatis memulihkan dan memulai ulang server dekripsi.

### Perilaku Watchdog

- **Interval**: Berjalan setiap **60 detik**.
- **Eksekusi**: Dijalankan secara otomatis saat server dimulai (`src/server-init.ts`).
- **Log**: Kesalahan dan langkah pemulihan dicatat di bawah logger layanan `tunnel-watchdog`.

---

## 💻 Baki Sistem Desktop (System Tray)

Saat menjalankan Birouter sebagai aplikasi desktop, aplikasi ini terintegrasi langsung dengan baki sistem (berjalan di latar belakang OS):

- **Antarmuka Rebranded**: Tooltip, label menu, dan notifikasi disesuaikan dengan nama **Birouter**.
- **Tindakan Klik-Ganda**: Mengklik ganda ikon baki sistem akan membuka antarmuka utama aplikasi Birouter.
- **Pengalihan Port**: Anda dapat mengubah port server langsung dari menu baki sistem. Aplikasi desktop akan mematikan server yang sedang berjalan, membersihkan proses yang menggantung di Windows (tree-kill), dan mengikat server Next.js ke port baru dengan bersih.
- **Dukungan Autostart**: Di Windows dan Linux, aplikasi desktop mendukung peluncuran secara tersembunyi (minimized) di latar belakang.

---

## 🔑 Terowongan Dekripsi MITM

Proxy dekripsi HTTPS MITM (Man-in-the-Middle) memungkinkan Birouter memeriksa lalu lintas SSL/TLS, merutekan permintaan secara dinamis, dan menyisipkan atribut kustom.

- **Pemaksaan Versi IDE (Override)**: Proxy memaksakan pengaturan kompatibilitas `ideVersion=1.23.2` pada permintaan keluar untuk memastikan endpoint editor downstream (seperti Windsurf/Cursor) cocok dengan antarmuka API backend yang diharapkan tanpa modifikasi di sisi klien.
