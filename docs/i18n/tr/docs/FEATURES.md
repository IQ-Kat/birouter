# OmniRoute — Dashboard Features Gallery (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

OmniRoute panosunun her bölümüne yönelik görsel kılavuz.---

## 🔌 Providers

Yapay zeka sağlayıcı bağlantılarını yönetin: OAuth sağlayıcıları (Claude Code, Codex, Gemini CLI), API anahtarı sağlayıcıları (Groq, DeepSeek, OpenRouter) ve ücretsiz sağlayıcılar (Qoder, Qwen, Kiro). Kiro hesapları, kredi bakiyesi takibini içerir; kalan krediler, toplam ödenek ve Kontrol Paneli → Kullanım bölümünde görünen yenileme tarihi.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

6 stratejiyle model yönlendirme kombinasyonları oluşturun: öncelikli, ağırlıklı, hepsini bir kez deneme, rastgele, en az kullanılan ve maliyet açısından optimize edilmiş. Her bir kombinasyon birden fazla modeli otomatik geri dönüşle zincirler ve hızlı şablonlar ve hazırlık kontrolleri içerir.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Belirteç tüketimi, maliyet tahminleri, etkinlik ısı haritaları, haftalık dağıtım grafikleri ve sağlayıcı başına dökümler içeren kapsamlı kullanım analitiği.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Gerçek zamanlı izleme: çalışma süresi, bellek, sürüm, gecikme yüzdeleri (p50/p95/p99), önbellek istatistikleri ve sağlayıcı devre kesici durumları.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

API çevirilerinde hata ayıklamaya yönelik dört mod:**Oyun Alanı**(format dönüştürücü),**Sohbet Test Aracı**(canlı istekler),**Test Bench**(toplu testler) ve**Canlı Monitör**(gerçek zamanlı akış).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Herhangi bir modeli doğrudan kontrol panelinden test edin. Sağlayıcıyı, modeli ve uç noktayı seçin, Monaco Düzenleyici ile istemler yazın, yanıtları gerçek zamanlı olarak yayınlayın, akışın ortasında iptal edin ve zamanlama ölçümlerini görüntüleyin.---

## 🎨 Themes _(v2.0.5+)_

Kontrol panelinin tamamı için özelleştirilebilir renk temaları. 7 ön ayarlı renk arasından seçim yapın (Mercan, Mavi, Kırmızı, Yeşil, Menekşe, Turuncu, Camgöbeği) veya altıgen renklerden herhangi birini seçerek özel bir tema oluşturun. Açık, karanlık ve sistem modunu destekler.---

## ⚙️ Settings

Sekmeli kapsamlı ayarlar paneli:

-**Genel**— Sistem depolama, yedekleme yönetimi (veritabanını dışa/içe aktarma) -**Görünüm**— Tema seçici (koyu/açık/sistem), renk teması ön ayarları ve özel renkler, sağlık günlüğü görünürlüğü, kenar çubuğu öğesi görünürlük kontrolleri -**Güvenlik**— API uç nokta koruması, özel sağlayıcı engelleme, IP filtreleme, oturum bilgileri -**Yönlendirme**— Model takma adları, arka plan görevinin bozulması -**Esneklik**— Hız sınırı kalıcılığı, devre kesici ayarı, yasaklı hesapları otomatik olarak devre dışı bırakma, sağlayıcının son kullanma tarihi izleme -**Gelişmiş**— Yapılandırma geçersiz kılmaları, yapılandırma denetim takibi, geri dönüş bozulma modu![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Yapay zeka kodlama araçları için tek tıklamayla yapılandırma: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor ve Factory Droid. Otomatik yapılandırma uygulama/sıfırlama, bağlantı profilleri ve model eşleme özelliklerine sahiptir.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

CLI aracılarını keşfetmeye ve yönetmeye yönelik kontrol paneli. Aşağıdakilerle birlikte 14 yerleşik aracıdan (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) oluşan bir tabloyu gösterir:

-**Yükleme durumu**— Sürüm algılamayla Kurulu / Bulunamadı -**Protokol rozetleri**— stdio, HTTP vb. -**Özel aracılar**— Herhangi bir CLI aracını form aracılığıyla kaydedin (ad, ikili dosya, sürüm komutu, ortaya çıkan argümanlar) -**CLI Parmak İzi Eşleştirme**— Sağlayıcı başına yerel CLI istek imzalarını eşleştirmek için geçiş yaparak proxy IP'yi korurken yasak riskini azaltır---

## 🖼️ Media _(v2.0.3+)_

Kontrol panelinden resimler, videolar ve müzik oluşturun. OpenAI, xAI, Together, Hyperbolik, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open ve MusicGen'i destekler.---

## 📝 Request Logs

Sağlayıcıya, modele, hesaba ve API anahtarına göre filtrelemeyle gerçek zamanlı istek günlüğü kaydı. Durum kodlarını, belirteç kullanımını, gecikmeyi ve yanıt ayrıntılarını gösterir.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Yetenek dökümüyle birleştirilmiş API uç noktanız: Sohbet Tamamlamalar, Yanıtlar API'si, Yerleştirmeler, Görüntü Oluşturma, Yeniden Sıralama, Ses Transkripsiyon, Metinden Konuşmaya, Denetlemeler ve kayıtlı API anahtarları. Uzaktan erişim için Cloudflare Hızlı Tünel entegrasyonu ve bulut proxy desteği.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

API anahtarlarını oluşturun, kapsamını belirleyin ve iptal edin. Her anahtar, tam erişime veya salt okunur izinlere sahip belirli modellerle/sağlayıcılarla sınırlandırılabilir. Kullanım takibi ile görsel anahtar yönetimi.---

## 📋 Audit Log

Eylem türüne, aktöre, hedefe, IP adresine ve zaman damgasına göre filtrelemeyle idari işlem takibi. Tam güvenlik olayı geçmişi.---

## 🖥️ Desktop Application

Windows, macOS ve Linux için Native Electron masaüstü uygulaması. OmniRoute'u sistem tepsisi entegrasyonu, çevrimdışı destek, otomatik güncelleme ve tek tıklamayla kurulum özellikleriyle bağımsız bir uygulama olarak çalıştırın.

Temel özellikler:

- Sunucu hazırlığı yoklaması (soğuk başlangıçta boş ekran yok)
- Bağlantı noktası yönetimine sahip sistem tepsisi
- İçerik Güvenliği Politikası
- Tek örnekli kilit
- Yeniden başlatıldığında otomatik güncelleme
- Platform koşullu kullanıcı arayüzü (macOS trafik ışıkları, Windows/Linux varsayılan başlık çubuğu)
- Sertleştirilmiş Elektron yapı paketlemesi — bağımsız paketteki sembolik bağlantılı "node_modules" paketlemeden önce algılanır ve reddedilir, böylece çalışma zamanının yapı makinesine bağımlılığı önlenir (v2.5.5+)

📖 Belgelerin tamamı için [`electron/README.md`](../electron/README.md) adresine bakın.
