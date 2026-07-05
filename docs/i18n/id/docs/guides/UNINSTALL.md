# Birouter — Panduan Mencopot Pemasangan (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/UNINSTALL.md) · 🇸🇦 [ar](../../ar/docs/UNINSTALL.md) · 🇧🇬 [bg](../../bg/docs/UNINSTALL.md) · 🇧🇩 [bn](../../bn/docs/UNINSTALL.md) · 🇨🇿 [cs](../../cs/docs/UNINSTALL.md) · 🇩🇰 [da](../../da/docs/UNINSTALL.md) · 🇩🇪 [de](../../de/docs/UNINSTALL.md) · 🇪🇸 [es](../../es/docs/UNINSTALL.md) · 🇮🇷 [fa](../../fa/docs/UNINSTALL.md) · 🇫🇮 [fi](../../fi/docs/UNINSTALL.md) · 🇫🇷 [fr](../../fr/docs/UNINSTALL.md) · 🇮🇳 [gu](../../gu/docs/UNINSTALL.md) · 🇮🇱 [he](../../he/docs/UNINSTALL.md) · 🇮🇳 [hi](../../hi/docs/UNINSTALL.md) · 🇭🇺 [hu](../../hu/docs/UNINSTALL.md) · 🇮🇩 [id](../../id/docs/UNINSTALL.md) · 🇮🇹 [it](../../it/docs/UNINSTALL.md) · 🇯🇵 [ja](../../ja/docs/UNINSTALL.md) · 🇰🇷 [ko](../../ko/docs/UNINSTALL.md) · 🇮🇳 [mr](../../mr/docs/UNINSTALL.md) · 🇲🇾 [ms](../../ms/docs/UNINSTALL.md) · 🇳🇱 [nl](../../nl/docs/UNINSTALL.md) · 🇳🇴 [no](../../no/docs/UNINSTALL.md) · 🇵🇭 [phi](../../phi/docs/UNINSTALL.md) · 🇵🇱 [pl](../../pl/docs/UNINSTALL.md) · 🇵🇹 [pt](../../pt/docs/UNINSTALL.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/UNINSTALL.md) · 🇷🇴 [ro](../../ro/docs/UNINSTALL.md) · 🇷🇺 [ru](../../ru/docs/UNINSTALL.md) · 🇸🇰 [sk](../../sk/docs/UNINSTALL.md) · 🇸🇪 [sv](../../sv/docs/UNINSTALL.md) · 🇰🇪 [sw](../../sw/docs/UNINSTALL.md) · 🇮🇳 [ta](../../ta/docs/UNINSTALL.md) · 🇮🇳 [te](../../te/docs/UNINSTALL.md) · 🇹🇭 [th](../../th/docs/UNINSTALL.md) · 🇹🇷 [tr](../../tr/docs/UNINSTALL.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/UNINSTALL.md) · 🇵🇰 [ur](../../ur/docs/UNINSTALL.md) · 🇻🇳 [vi](../../vi/docs/UNINSTALL.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/UNINSTALL.md)

---

Panduan ini menjelaskan cara mencopot pemasangan Birouter dari sistem Anda secara bersih.

---

## Mencopot Pemasangan dengan Cepat (v3.6.2+)

Birouter menyediakan dua skrip bawaan untuk penghapusan yang bersih:

### Pertahankan Data Anda

```bash
npm run uninstall
```

Perintah ini menghapus aplikasi Birouter tetapi **mempertahankan** basis data, konfigurasi, kunci API, dan pengaturan penyedia Anda di `~/.birouter/`. Gunakan ini jika Anda berencana memasang ulang nanti dan ingin menyimpan pengaturan yang ada.

### Penghapusan Penuh

```bash
npm run uninstall:full
```

Perintah ini menghapus aplikasi **dan menghapus secara permanen** semua data:

- Basis data (`storage.sqlite`)
- Konfigurasi penyedia dan kunci API
- Berkas cadangan
- Berkas log
- Semua berkas di direktori `~/.birouter/`

> ⚠️ **Peringatan:** `npm run uninstall:full` tidak dapat dibatalkan. Semua koneksi penyedia, combo, kunci API, dan riwayat penggunaan Anda akan dihapus secara permanen.

---

## Mencopot Pemasangan Secara Manual

### Instalasi Global NPM

```bash
# Remove the global package
npm uninstall -g birouter

# (Optional) Remove data directory
rm -rf ~/.birouter
```

### Instalasi Global pnpm

```bash
pnpm uninstall -g birouter
rm -rf ~/.birouter
```

### Docker

```bash
# Stop and remove the container
docker stop birouter
docker rm birouter

# Remove the volume (deletes all data)
docker volume rm birouter-data

# (Optional) Remove the image
docker rmi IQ-Kat/birouter:latest
```

### Docker Compose

```bash
# Stop and remove containers
docker compose down

# Also remove volumes (deletes all data)
docker compose down -v
```

### Aplikasi Desktop Electron

**Windows:**

- Buka `Settings → Apps → Birouter → Uninstall`
- Atau jalankan uninstaller NSIS dari direktori instalasi

**macOS:**

- Seret `Birouter.app` dari `/Applications` ke Trash
- Hapus data: `rm -rf ~/Library/Application Support/birouter`

**Linux:**

- Hapus berkas AppImage
- Hapus data: `rm -rf ~/.birouter`

### Instalasi dari Sumber (git clone)

```bash
# Remove the cloned directory
rm -rf /path/to/birouter

# (Optional) Remove data directory
rm -rf ~/.birouter
```

---

## Direktori Data

Birouter menyimpan data di lokasi-lokasi berikut secara default:

| Platform      | Jalur Default                 | Pengganti                 |
| ------------- | ----------------------------- | ------------------------- |
| Linux         | `~/.birouter/`                | `DATA_DIR` env var        |
| macOS         | `~/.birouter/`                | `DATA_DIR` env var        |
| Windows       | `%APPDATA%/birouter/`         | `DATA_DIR` env var        |
| Docker        | `/app/data/` (mounted volume) | `DATA_DIR` env var        |
| XDG-compliant | `$XDG_CONFIG_HOME/birouter/`  | `XDG_CONFIG_HOME` env var |

### Berkas di dalam direktori data

| Berkas/Direktori     | Deskripsi                                             |
| -------------------- | ----------------------------------------------------- |
| `storage.sqlite`     | Basis data utama (penyedia, combo, pengaturan, kunci) |
| `storage.sqlite-wal` | Write-ahead log SQLite (sementara)                    |
| `storage.sqlite-shm` | Shared memory SQLite (sementara)                      |
| `call_logs/`         | Arsip payload permintaan                              |
| `backups/`           | Cadangan basis data otomatis                          |
| `log.txt`            | Log permintaan lama (opsional)                        |

---

## Verifikasi Penghapusan Lengkap

Setelah mencopot pemasangan, verifikasi bahwa tidak ada berkas yang tersisa:

```bash
# Check for global npm package
npm list -g birouter 2>/dev/null

# Check for data directory
ls -la ~/.birouter/ 2>/dev/null

# Check for running processes
pgrep -f birouter
```

Jika ada proses yang masih berjalan, hentikan dengan perintah berikut:

```bash
pkill -f birouter
```
