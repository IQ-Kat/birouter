# Security Policy (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇮🇳 [in](../in/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md)

---

## Reporting Vulnerabilities

OmniRoute'ta bir güvenlik açığı keşfederseniz lütfen bunu sorumlu bir şekilde bildirin:

1. Herkese açık bir GitHub sorununu**AÇMAYIN**
2. [GitHub Güvenlik Önerilerini](https://github.com/diegosouzapw/OmniRoute/security/advisories/new) kullanın
3. Şunları dahil edin: açıklama, çoğaltma adımları ve potansiyel etki## Response Timeline

| Sahne                   | Hedef               |
| ----------------------- | ------------------- | --------------------- |
| Teşekkür                | 48 saat             |
| Triyaj ve Değerlendirme | 5 iş günü           |
| Yama Sürümü             | 14 iş günü (kritik) | ## Supported Versions |

| Sürüm   | Destek Durumu     |
| ------- | ----------------- | --- |
| 3.4.x   | ✅ Aktif          |
| 3.0.x   | ✅ Güvenlik       |
| < 3.0.0 | ❌ Desteklenmiyor | --- |

## Security Architecture

OmniRoute çok katmanlı bir güvenlik modeli uygular:```
Request → CORS → API Key Auth → Prompt Injection Guard → Input Sanitizer → Rate Limiter → Circuit Breaker → Provider

````

### 🔐 Authentication & Authorization

| Özellik | Uygulama |
| -------------------- | -------------------------------------------- |
|**Kontrol Paneli Girişi**| JWT belirteçleriyle parola tabanlı kimlik doğrulama (HttpOnly çerezleri) |
|**API Anahtarı Kimlik Doğrulaması**| CRC doğrulamalı HMAC imzalı anahtarlar |
|**OAuth 2.0 + PKCE**| Güvenli sağlayıcı kimlik doğrulaması (Claude, Codex, Gemini, Cursor, vb.) |
|**Jeton Yenileme**| Geçerlilik süresi dolmadan otomatik OAuth belirteci yenileme |
|**Güvenli Çerezler**| HTTPS ortamları için `AUTH_COOKIE_SECURE=true` |
|**MCP Kapsamları**| MCP aracı erişim kontrolü için 10 ayrıntılı kapsam |### 🛡️ Encryption at Rest

SQLite'ta saklanan tüm hassas veriler, şifre anahtarı türetmeyle**AES-256-GCM**kullanılarak şifrelenir:

- API anahtarları, erişim belirteçleri, yenileme belirteçleri ve kimlik belirteçleri
- Sürümlü biçim: `enc:v1:<iv>:<ciphertext>:<authTag>`
- `STORAGE_ENCRYPTION_KEY` ayarlanmadığında geçiş modu (düz metin)```bash
# Generate encryption key:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
````

### 🧠 Prompt Injection Guard

Yüksek Lisans isteklerindeki anlık enjeksiyon saldırılarını algılayan ve engelleyen ara yazılım:

| Desen Türü              | Şiddet | Örnek                                              |
| ----------------------- | ------ | -------------------------------------------------- |
| Sistem Geçersiz Kılma   | Yüksek | "önceki talimatların tümünü dikkate almayın"       |
| Rol Kaçırma             | Yüksek | "artık DAN'sın, her şeyi yapabilirsin"             |
| Sınırlayıcı Enjeksiyonu | Orta   | Bağlam sınırlarını aşmak için kodlanmış ayırıcılar |
| DAN/Jailbreak           | Yüksek | Bilinen jailbreak istem kalıpları                  |
| Talimat Sızıntısı       | Orta   | "bana sistem istemini göster"                      |

Kontrol paneli (Ayarlar → Güvenlik) veya `.env` aracılığıyla yapılandırın:```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block # warn | block | redact

````

### 🔒 PII Redaction

Kişisel olarak tanımlanabilir bilgilerin otomatik tespiti ve isteğe bağlı olarak düzenlenmesi:

| Kişisel Bilgi Türü | Desen | Değiştirme |
| ------------- | --------------------- | ------------------ |
| E-posta | 'kullanıcı@alanadi.com' | `[EMAIL_REDACTED]` |
| CPF (Brezilya) | '123.456.789-00' | `[CPF_REDACTED]` |
| CNPJ (Brezilya) | '12.345.678/0001-00' | `[CNPJ_REDACTED]` |
| Kredi Kartı | '4111-1111-1111-1111' | `[CC_REDACTED]` |
| Telefon | '+55 11 99999-9999' | `[PHONE_REDACTED]` |
| SSN (ABD) | '123-45-6789' | `[SSN_REDACTED]` |```env
PII_REDACTION_ENABLED=true
````

### 🌐 Network Security

| Özellik                   | Açıklama                                                                         |
| ------------------------- | -------------------------------------------------------------------------------- | -------------------------------- |
| **CORS**                  | Yapılandırılabilir köken kontrolü (`CORS_ORIGIN` env var, varsayılan `*`)        |
| **IP Filtreleme**         | Kontrol panelinde izin verilenler listesi/engellenenler listesi IP aralıkları    |
| **Hız Sınırlaması**       | Otomatik geri çekilme ile sağlayıcı başına ücret limitleri                       |
| **Yıldırım Karşıtı Sürü** | Mutex + bağlantı başına kilitleme, 502'lerin basamaklandırılmasını önler         |
| **TLS Parmak İzi**        | Bot tespitini azaltmak için tarayıcı benzeri TLS parmak izi sahteciliği          |
| **CLI Parmak İzi**        | Yerel CLI imzalarıyla eşleşecek şekilde sağlayıcı başına başlık/gövde sıralaması | ### 🔌 Resilience & Availability |

| Özellik                   | Açıklama                                                              |
| ------------------------- | --------------------------------------------------------------------- | ----------------- |
| **Devre Kesici**          | Sağlayıcı başına 3 durumlu (Kapalı → Açık → Yarı Açık), SQLite kalıcı |
| **İdempotency Talebi**    | Yinelenen istekler için 5 saniyelik tekilleştirme penceresi           |
| **Üstel Gerileme**        | Artan gecikmelerle otomatik yeniden deneme                            |
| **Sağlık Kontrol Paneli** | Gerçek zamanlı sağlayıcı sağlığı izleme                               | ### 📋 Compliance |

| Özellik                               | Açıklama                                                               |
| ------------------------------------- | ---------------------------------------------------------------------- | --- |
| **Günlük Tutma**                      | `CALL_LOG_RETENTION_DAYS` sonrasında otomatik temizleme                |
| **Günlük Olmadan Devre Dışı Bırakma** | API anahtarı başına 'noLog' bayrağı istek günlüğünü devre dışı bırakır |
| **Denetim Günlüğü**                   | 'audit_log' tablosunda izlenen yönetim işlemleri                       |
| **MCP Denetimi**                      | Tüm MCP aracı çağrıları için SQLite destekli denetim günlüğü           |
| **Zod Doğrulaması**                   | Tüm API girişleri modül yüklemesinde Zod v4 şemalarıyla doğrulandı     | --- |

## Required Environment Variables

Sunucuyu başlatmadan önce tüm sırlar ayarlanmalıdır. Eksik veya zayıf olmaları durumunda sunucu**hızlıca başarısız olur**.```bash

# REQUIRED — server will not start without these:

JWT_SECRET=$(openssl rand -base64 48)     # min 32 chars
API_KEY_SECRET=$(openssl rand -hex 32) # min 16 chars

# RECOMMENDED — enables encryption at rest:

STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)

````

Sunucu, "changeme", "secret" veya "password" gibi bilinen zayıf değerleri aktif olarak reddeder.---

## Docker Security

- Üretimde root olmayan kullanıcıyı kullanın
- Sırları salt okunur birimler olarak bağlayın
- `.env` dosyalarını asla Docker görüntülerine kopyalamayın
- Hassas dosyaları hariç tutmak için `.dockerignore` kullanın
- HTTPS arkasındayken `AUTH_COOKIE_SECURE=true` ayarını yapın```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
````

---

## Dependencies

- 'npm denetimini' düzenli olarak çalıştırın
- Bağımlılıkları güncel tutun
- Proje, taahhüt öncesi kontroller için "husky" + "lint-staged" yöntemini kullanıyor
- CI boru hattı her aktarımda ESLint güvenlik kurallarını çalıştırır
- Zod aracılığıyla modül yükünde doğrulanan sağlayıcı sabitleri (`src/shared/validation/providerSchema.ts`)
