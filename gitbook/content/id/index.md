# Selamat Datang di Birouter

**Gunakan Claude, Codex, Gemini secara GRATIS • Alternatif ultra-murah mulai dari $0.20/1jt token**

Birouter adalah AI model router yang memaksimalkan nilai langganan Anda dan meminimalkan biaya melalui routing cerdas dan fallback otomatis.

---

## Apa itu Birouter?

Birouter adalah proxy cerdas yang berada di antara alat coding Anda (Cursor, Cline, Claude Desktop) dan penyedia AI. Birouter secara otomatis mengarahkan permintaan ke model terbaik yang tersedia berdasarkan kuota, biaya, dan ketersediaan.

**Berhenti membuang uang:**
- ❌ Kuota langganan kedaluwarsa tidak terpakai setiap bulan
- ❌ Rate limit menghentikan Anda di tengah coding
- ❌ API mahal ($20-50/bulan per penyedia)
- ❌ Harus berpindah penyedia secara manual

**Mulai maksimalkan nilai:**
- ✅ **Maksimalkan Langganan** - Lacak dan gunakan setiap bit kuota Claude Code, Codex, Gemini
- ✅ **Tersedia GRATIS** - Akses model iFlow, Qwen, Kiro melalui CLI
- ✅ **Backup Ultra-Murah** - GLM ($0.6/1jt), MiniMax M2.1 ($0.20/1jt)
- ✅ **Fallback Cerdas** - Langganan → Murah → Gratis, pergantian otomatis

---

## Fitur Utama

### 🔄 Smart 3-Tier Fallback

```
Setup sekali, coding tanpa henti:

Tier 1 (LANGGANAN): Claude Code → Codex → Gemini
  ↓ kuota habis
Tier 2 (MURAH): GLM-4.7 → MiniMax M2.1 → Kimi
  ↓ batas budget
Tier 3 (GRATIS): iFlow → Qwen → Kiro

→ Pergantian otomatis, tanpa downtime!
```

### 📊 Pelacakan Kuota

- Konsumsi token real-time per penyedia
- Hitung mundur reset (5 jam, harian, mingguan, bulanan)
- Estimasi biaya untuk tier berbayar
- Laporan pengeluaran bulanan

### 🎯 Dukungan CLI Universal

Bekerja dengan alat apa pun yang mendukung endpoint OpenAI kustom:

✅ **Cursor** • **Cline** • **Claude Desktop** • **Codex** • **RooCode** • **Continue** • **Alat apa pun yang kompatibel dengan OpenAI**

### 💰 Optimasi Biaya

**Contoh nyata (100jt token/bulan):**
```
60jt melalui Gemini CLI: $0 (free tier)
30jt melalui Claude Code: $0 (langganan yang sudah Anda punya)
8jt melalui GLM: $4.80
2jt melalui MiniMax: $0.40
Total: $5.20/bulan vs $2000 di API ChatGPT!
```

---

## Mengapa Memilih Birouter?

### Maksimalkan Langganan

Sudah membayar untuk Claude Code ($20-100/bulan) atau Codex ($20-200/bulan)? Dapatkan nilai penuh:

- Lacak penggunaan kuota secara real-time
- Auto-switch saat kuota reset (5 jam, mingguan)
- Gunakan setiap token sebelum kedaluwarsa
- Gemini CLI: 180rb completion/bulan **GRATIS**

### Backup Ultra-Murah

Saat kuota langganan habis, bayar hanya recehan:

| Penyedia | Biaya per 1jt token | Reset |
|----------|-------------------|-------|
| **GLM-4.7** | $0.60 input / $2.20 output | Harian 10:00 AM |
| **MiniMax M2.1** | $0.20 input / $1.00 output | 5 jam rolling |
| **Kimi K2** | $9/bulan (10jt token) | Bulanan |

**~90% lebih murah daripada API ChatGPT ($20/1jt)!**

### Fallback Gratis Selamanya

Backup darurat saat yang lain terkena limit:

- **iFlow**: 8 model (Kimi K2, Qwen3 Coder Plus, GLM 4.7, MiniMax M2)
- **Qwen**: 3 model (Qwen3 Coder Plus/Flash, Vision)
- **Kiro**: Claude Sonnet 4.5, Haiku 4.5 (AWS Builder ID)

---

## Mulai Cepat

Mulai dalam 2 menit:

```bash
# Instal secara global
npm install -g birouter

# Jalankan (dashboard akan terbuka otomatis)
birouter
```

🎉 **Dashboard terbuka** → Hubungkan penyedia → Mulai coding!

**Gunakan di alat CLI Anda:**

```
Endpoint: http://localhost:2004/v1
API Key: [dari dashboard]
Model: kr/claude-sonnet-4.5
```

---

## Kasus Penggunaan

### Untuk Pengembang Individu

- Maksimalkan langganan Claude Code/Codex Anda
- Gunakan free tier Gemini CLI (180rb/bulan)
- Fallback ke model ultra-murah ($0.20/1jt)
- Coding 24/7 tanpa rate limit

### Untuk Tim

- Deploy di VPS/Cloud untuk akses bersama
- Lacak pengeluaran tim secara real-time
- Atur batas anggaran per tier
- Manajemen penyedia terpusat

---

<div align="center">
  <sub>Dibuat dengan ❤️ untuk pengembang yang memaksimalkan nilai AI</sub>
</div>
