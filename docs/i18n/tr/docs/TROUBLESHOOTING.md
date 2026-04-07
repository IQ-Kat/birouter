# Troubleshooting (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

OmniRoute için yaygın sorunlar ve çözümler.---

## Quick Fixes

| Sorun                                              | Çözüm                                                                              |
| -------------------------------------------------- | ---------------------------------------------------------------------------------- | --- |
| İlk giriş çalışmıyor                               | `.env`de `INITIAL_PASSWORD`u ayarlayın (sabit kodlanmış varsayılan yok)            |
| Kontrol paneli yanlış bağlantı noktasında açılıyor | `PORT=20128` ve `NEXT_PUBLIC_BASE_URL=http://localhost:20128` ayarını yapın        |
| 'logs/' altında istek günlüğü yok                  | 'ENABLE_REQUEST_LOGS=true' olarak ayarlayın                                        |
| EACCES: izin reddedildi                            | `~/.omniroute` geçersiz kılmak için `DATA_DIR=/path/to/writable/dir` ayarını yapın |
| Yönlendirme stratejisi kaydedilmiyor               | v1.4.11+ Güncellemesi (Ayarların kalıcılığı için Zod şeması düzeltmesi)            | --- |

## Provider Issues

### "Language model did not provide messages"

**Neden:**Sağlayıcı kotası doldu.

**Düzeltme:**

1. Kontrol paneli kota izleyicisini kontrol edin
2. Geri dönüş katmanlarına sahip bir kombinasyon kullanın
3. Daha ucuz/ücretsiz seviyeye geçin### Rate Limiting

**Neden:**Abonelik kotası tükendi.

**Düzeltme:**

- Geri dönüş ekleyin: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- GLM/MiniMax'ı ucuz yedekleme olarak kullanın### OAuth Token Expired

OmniRoute belirteçleri otomatik olarak yeniler. Sorunlar devam ederse:

1. Kontrol Paneli → Sağlayıcı → Yeniden Bağlan
2. Sağlayıcı bağlantısını silin ve yeniden ekleyin---

## Cloud Issues

### Cloud Sync Errors

1. "BASE_URL"nin çalışan örneğinize işaret ettiğini doğrulayın (ör. "http://localhost:20128")
2. "CLOUD_URL"nin bulut uç noktanıza işaret ettiğini doğrulayın (ör. "https://omniroute.dev")
3. `NEXT_PUBLIC_*` değerlerini sunucu tarafı değerleriyle uyumlu tutun### Cloud `stream=false` Returns 500

**Belirti:**Akış dışı aramalar için bulut uç noktasında "Beklenmeyen belirteç 'd'...'.

**Neden:**İstemci JSON beklerken yukarı akış SSE yükünü döndürüyor.

**Geçici çözüm:**Buluttan doğrudan çağrılar için "stream=true" seçeneğini kullanın. Yerel çalışma zamanı SSE→JSON geri dönüşünü içerir.### Cloud Says Connected but "Invalid API key"

1. Yerel kontrol panelinden yeni bir anahtar oluşturun (`/api/keys`)
2. Bulut senkronizasyonunu çalıştırın: Bulutu Etkinleştir → Şimdi Senkronize Et
3. Eski/senkronize edilmemiş anahtarlar bulutta hâlâ '401'i döndürebilir---

## Docker Issues

### CLI Tool Shows Not Installed

1. Çalışma zamanı alanlarını kontrol edin: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Taşınabilir mod için: "runner-cli" görüntü hedefini kullanın (birlikte verilen CLI'ler)
3. Ana bilgisayar bağlama modu için: `CLI_EXTRA_PATHS`yi ayarlayın ve ana bilgisayar bin dizinini salt okunur olarak bağlayın
4. "Kurulu=doğru" ve "çalıştırılabilir=yanlış" ise: ikili dosya bulundu ancak durum denetimi başarısız oldu### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Kontrol Paneli → Kullanım bölümünden kullanım istatistiklerini kontrol edin
2. Birincil modeli GLM/MiniMax'a değiştirin
3. Kritik olmayan görevler için ücretsiz kullanımı (Gemini CLI, Qoder) kullanın
4. API anahtarı başına maliyet bütçelerini ayarlayın: Kontrol Paneli → API Anahtarları → Bütçe---

## Debugging

### Enable Request Logs

`.env` dosyanızda `ENABLE_REQUEST_LOGS=true` değerini ayarlayın. Günlükler 'logs/' dizini altında görünür.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Ana durum: `${DATA_DIR}/storage.sqlite` (sağlayıcılar, kombinasyonlar, takma adlar, anahtarlar, ayarlar)
- Kullanım: `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) içindeki SQLite tabloları + isteğe bağlı `${DATA_DIR}/log.txt` ve `${DATA_DIR}/call_logs/`
- İstek günlükleri: `<repo>/logs/...` (`ENABLE_REQUEST_LOGS=true` olduğunda)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Sağlayıcının devre kesicisi AÇIK olduğunda, bekleme süresi dolana kadar istekler engellenir.

**Düzeltme:**

1.**Kontrol Paneli → Ayarlar → Dayanıklılık**'a gidin 2. Etkilenen sağlayıcının devre kesici kartını kontrol edin 3. Tüm kesicileri temizlemek için**Tümünü Sıfırla**'ya tıklayın veya bekleme süresinin dolmasını bekleyin 4. Sıfırlamadan önce sağlayıcının gerçekten kullanılabilir durumda olduğunu doğrulayın### Provider keeps tripping the circuit breaker

Bir sağlayıcı sürekli olarak AÇIK durumuna girerse:

1. Arıza modeli için**Kontrol Paneli → Sağlık → Sağlayıcı Sağlığı**'nı kontrol edin 2.**Ayarlar → Dayanıklılık → Sağlayıcı Profilleri**'ne gidin ve hata eşiğini artırın
2. Sağlayıcının API sınırlarını değiştirip değiştirmediğini veya yeniden kimlik doğrulama gerektirip gerektirmediğini kontrol edin
3. Gecikme telemetrisini gözden geçirin — yüksek gecikme, zaman aşımı temelli hatalara neden olabilir---

## Audio Transcription Issues

### "Unsupported model" error

- Doğru öneki kullandığınızdan emin olun: `deepgram/nova-3` veya `assemblyai/best`
- Sağlayıcının**Kontrol Paneli → Sağlayıcılar**'a bağlı olduğunu doğrulayın### Transcription returns empty or fails

- Desteklenen ses formatlarını kontrol edin: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Dosya boyutunun sağlayıcı sınırları dahilinde olduğunu doğrulayın (genellikle < 25MB)
- Sağlayıcı kartındaki sağlayıcı API anahtarının geçerliliğini kontrol edin---

## Translator Debugging

Biçim çeviri sorunlarının hatalarını ayıklamak için**Kontrol Paneli → Çevirmen**'i kullanın:

| Modu                  | Ne Zaman Kullanılmalı                                                                                           |
| --------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Oyun Alanı**        | Giriş/çıkış formatlarını yan yana karşılaştırın; nasıl çevrildiğini görmek için başarısız bir isteği yapıştırın |
| **Sohbet Test Aracı** | Canlı mesajlar gönderin ve başlıklar dahil tüm istek/yanıt yükünü inceleyin                                     |
| **Test Tezgahı**      | Hangi çevirilerin bozuk olduğunu bulmak için format kombinasyonlarında toplu testler çalıştırın                 |
| **Canlı Monitör**     | Aralıklı çeviri sorunlarını yakalamak için gerçek zamanlı istek akışını izleyin                                 | ### Common format issues |

-**Düşünme etiketleri görünmüyor**— Hedef sağlayıcının düşünmeyi ve düşünme bütçesi ayarını destekleyip desteklemediğini kontrol edin -**Araç çağrıları bırakılıyor**— Bazı biçim çevirileri desteklenmeyen alanları kaldırabilir; Oyun Alanı modunda doğrula -**Sistem istemi eksik**— Claude ve Gemini sistemi istemleri farklı şekilde yönetir; çeviri çıktısını kontrol et -**SDK, nesne yerine ham dize döndürür**— V1.1.0'da düzeltildi: yanıt temizleyici artık OpenAI SDK Pydantic doğrulama hatalarına neden olan standart olmayan alanları ('x_groq', 'usage_breakdown' vb.) kaldırıyor -**GLM/ERNIE "sistem" rolünü reddediyor**— v1.1.0'da düzeltildi: rol normalleştirici, uyumsuz modeller için sistem mesajlarını otomatik olarak kullanıcı mesajlarıyla birleştiriyor -**'geliştirici' rolü tanınmıyor**- v1.1.0'da düzeltildi: OpenAI olmayan sağlayıcılar için otomatik olarak 'sistem'e dönüştürüldü -**`json_schema` Gemini ile çalışmıyor**— v1.1.0'da düzeltildi: `response_format` artık Gemini'nin `responseMimeType` + `responseSchema` biçimine dönüştürüldü---

## Resilience Settings

### Auto rate-limit not triggering

- Otomatik hız sınırı yalnızca API anahtarı sağlayıcıları için geçerlidir (OAuth/abonelik için geçerli değildir) -**Ayarlar → Dayanıklılık → Sağlayıcı Profilleri**'nde otomatik hız sınırının etkin olduğunu doğrulayın
- Sağlayıcının '429' durum kodlarını mı yoksa 'Sonra Yeniden Dene' başlıklarını mı döndürdüğünü kontrol edin### Tuning exponential backoff

Sağlayıcı profilleri şu ayarları destekler:

-**Temel gecikme**— İlk arızadan sonraki ilk bekleme süresi (varsayılan: 1 saniye) -**Maksimum gecikme**— Maksimum bekleme süresi sınırı (varsayılan: 30 sn) -**Çarpan**— Ardışık arıza başına gecikmenin ne kadar artırılacağı (varsayılan: 2x)### Anti-thundering herd

Çok sayıda eşzamanlı istek, hızı sınırlı bir sağlayıcıya ulaştığında, OmniRoute, istekleri serileştirmek ve basamaklı hataları önlemek için mutex + otomatik hız sınırlamayı kullanır. Bu, API anahtarı sağlayıcıları için otomatiktir.---

## Optional RAG / LLM failure taxonomy (16 problems)

Bazı OmniRoute kullanıcıları ağ geçidini RAG veya aracı yığınlarının önüne yerleştirir. Bu kurulumlarda garip bir model görmek yaygındır: OmniRoute sağlıklı görünüyor (sağlayıcılar çalışıyor, yönlendirme profilleri iyi, hız sınırı uyarısı yok) ancak son yanıt hâlâ yanlış.

Uygulamada bu olaylar genellikle ağ geçidinin kendisinden değil, aşağı yöndeki RAG boru hattından kaynaklanır.

Bu arızaları açıklamak için ortak bir kelime dağarcığı istiyorsanız, on altı yinelenen RAG / LLM arıza modelini tanımlayan harici bir MIT lisans metin kaynağı olan WFGY ProblemMap'i kullanabilirsiniz. Yüksek düzeyde şunları kapsar:

- sürüklenmeyi ve bozulmuş bağlam sınırlarını geri getirme
- boş veya eski dizinler ve vektör depoları
- anlamsal uyumsuzluğa karşı yerleştirme
- hızlı derleme ve bağlam penceresi sorunları
- Mantık çöküşü ve kendine aşırı güvenen cevaplar
- uzun zincir ve temsilci koordinasyon hataları
- çoklu ajan hafızası ve rol kayması
- dağıtım ve önyükleme sıralama sorunları

Fikir basit:

1. Kötü bir yanıtı araştırırken şunları yakalayın:
   - kullanıcı görevi ve isteği
   - OmniRoute'ta rota veya sağlayıcı birleşimi
   - aşağı yönde kullanılan herhangi bir RAG bağlamı (alınan belgeler, araç çağrıları vb.)
2. Map the incident to one or two WFGY ProblemMap numbers (`No.1` … `No.16`).
3. Numarayı kendi kontrol panelinizde, runbook'unuzda veya olay izleyicinizde OmniRoute günlüklerinin yanında saklayın.
4. RAG yığınınızı, alıcınızı veya yönlendirme stratejinizi değiştirmeniz gerekip gerekmediğine karar vermek için ilgili WFGY sayfasını kullanın.

Tam metin ve somut tarifler burada yayınlanmaktadır (MIT lisansı, yalnızca metin):

[WFGY ProblemMap BENİ OKU](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

OmniRoute'un arkasında RAG veya aracı işlem hatlarını çalıştırmıyorsanız bu bölümü göz ardı edebilirsiniz.---

## Still Stuck?

-**GitHub Sorunları**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Mimarlık**: Dahili ayrıntılar için bkz. [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) -**API Referansı**: Tüm uç noktalar için bkz. [`docs/API_REFERENCE.md`](API_REFERENCE.md) -**Sağlık Kontrol Paneli**: Gerçek zamanlı sistem durumu için**Kontrol Paneli → Sağlık**'ı kontrol edin -**Çevirmen**: Biçim sorunlarının hatalarını ayıklamak için**Kontrol Paneli → Çevirmen**'i kullanın
