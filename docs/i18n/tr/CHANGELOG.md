# Changelog (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Ara yazılım:**requireLogin devre dışı bırakıldığında yeni örnekler için kontrol panelindeki sonsuz yönlendirme döngüsü çözüldü.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Qoder API Yerel Entegrasyonu:**Qoder Yürütücüsü, eski COSY AES/RSA şifreleme algoritmasını atlayacak ve doğrudan yerel DashScope OpenAi uyumlu URL'ye yönlendirecek şekilde tamamen yeniden düzenlendi. Akış doğruluğunu artırırken Düğüm "kripto" modüllerine olan karmaşık bağımlılıkları ortadan kaldırır. -**Esneklik Motorunun Yenilenmesi:**Entegre içerik taşması, zarif geri dönüşler, proaktif OAuth belirteci algılama ve boş içerik emisyonunu önleme (#990). -**Bağlam İçin Optimize Edilmiş Yönlendirme Stratejisi:**Otomatik birleşik dağıtımlarda bağlam pencerelerini yerel olarak en üst düzeye çıkarmak için yeni akıllı yönlendirme özelliği eklendi (#990).### 🐛 Bug Fixes

-**Yanıt API Akışı Bozulması:**Antropik/OpenAI çeviri sınırlarının, akış sınırlarından (#992) belirli SSE öneklerini çıkardığı derin klonlama bozulması düzeltildi. -**Claude Önbellek Geçişi Hizalaması:**Hızlı önbelleğe almayı koruyan yukarı akış İstemci Geçişi moduyla tutarlı bir şekilde hizalanmış CC Uyumlu önbellek işaretleri. -**Turbopack Bellek Sızıntısı:**Next.js, bellek sızıntılarını önlemek ve yakın zamandaki yukarı akışlı Turbopack hashed modül regresyonlarından kaynaklanan bayatlamayı önlemek için sıkı bir şekilde '16.0.10'a sabitlendi (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Models.dev Entegrasyonu:**Sabit kodlanmış fiyatları geçersiz kılan, model fiyatlandırması, yetenekleri ve spesifikasyonları için yetkili çalışma zamanı kaynağı olarak entegre models.dev. Senkronizasyon aralıklarını, 30 dilin tümü için çeviri dizelerini ve güçlü test kapsamını yönetmek için bir ayarlar kullanıcı arayüzü içerir. -**Sağlayıcının Yerel Yetenekleri:**Geçersiz rolleri temizleyerek hataları önleyen yerel API özelliklerinin (ör. `systemInstructions_supported`) bildirilmesi ve kontrol edilmesi için destek eklendi. Şu anda Gemini Base ve Antigravity OAuth sağlayıcıları için yapılandırılmıştır. -**API Sağlayıcı Gelişmiş Ayarları:**API anahtarı sağlayıcı bağlantıları için bağlantı başına özel "Kullanıcı Aracısı" geçersiz kılmaları eklendi. Geçersiz kılma, 'providerSpecificData.customUserAgent'ta depolanır ve artık doğrulama araştırmaları ve yukarı akış yürütme istekleri için geçerlidir.### 🐛 Bug Fixes

-**Qwen OAuth Güvenilirliği:**Süresi dolmuş belirteçlerde 400 Hatalı İstek engelleyici, id_token atlandığında OIDC "access_token" özelliklerini ayrıştırmak için geri dönüş oluşturma, model kataloğu bulma hataları ve OpenAI uyumlu uç noktalardan 400 reddedilmeyi önlemek için "X-Dashscope-\*" başlıklarının sıkı filtrelenmesi dahil bir dizi OAuth entegrasyon sorunu çözüldü.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Otomatik Kombo ve Yönlendirme:**Gelişmiş Otomatik Kombo motoru (#955) için yerel CRUD yaşam döngüsü entegrasyonu tamamlandı. -**Temel İşlemler:**Yeni yerel Otomatik Kombinasyon seçeneklerindeki eksik çeviriler düzeltildi (#955). -**Güvenlik Doğrulaması:**Düğüm 22 Olay Döngüsü asılı bellek sızıntılarını açıkça çözmek için birim testi CI yürütmesi sırasında SQLite otomatik yedekleme görevleri yerel olarak devre dışı bırakıldı (#956). -**Ekosistem Proxy'leri:**Tamamlanmış açık entegrasyon eşleme modeli senkronizasyon zamanlayıcıları, OAuth döngüleri ve Token Check, OmniRoute'un yerel sistem yukarı akış proxy'leri (#953) aracılığıyla güvenli bir şekilde yenilenir. -**MCP Genişletilebilirliği:**Yeni `omniroute_web_search` MCP çerçeve aracı beta sürümünden üretim şemalarına (#951) eklendi ve başarıyla kaydedildi. -**Belirteç Arabelleği Mantığı:**Hassas Kullanım İzleme ölçümleri için yapılandırılabilir giriş/çıkış belirteç arabelleklerini genişleten çalışma zamanı yapılandırma sınırları eklendi (#959).### 🐛 Bug Fixes

-**CodeQL Düzeltme:**Derin proxy dağıtım modülleri içindeki polinom algoritmik geri izlemenin (ReDoS) yanı sıra Sunucu Tarafı İstek Sahteciliği (SSRF) dizilerinin indeksleme buluşsal yöntemlerini önleyen, tamamen çözümlenmiş ve güvenli kritik dize indeksleme işlemleri. -**Kripto Karmaları:**Zayıf, doğrulanmamış eski OAuth 1.0 karmaları, sıkı erişim kontrolleri sağlayan sağlam HMAC-SHA-256 standart doğrulama ilkelleriyle değiştirildi. -**API Sınır Koruması:**Ayarların değiştirilmesini ve yerel beceri yüklemeyi hedefleyen daha yeni dinamik uç noktaları kapsayan katı "isAuthenticated()" ara yazılım mantığını uygulayan, doğru şekilde doğrulanmış ve eşlenmiş yapısal rota korumaları. -**CLI Ekosistemi Uyumluluğu:**Harici eklentiler için ortam algılayıcılarının kesinlikle ".cmd/.exe" uç durumları üzerinde "nerede" kilitlendiği bozuk yerel çalışma zamanı ayrıştırıcı bağlamaları çözüldü (#969). -**Önbellek Mimarisi:**Görsel hizalanmamış durum flaşlarını çözen kararlı yeniden nemlendirme kalıcılık döngülerini sürdürmek için tam Analitik ve Sistem Ayarları kontrol paneli parametreleri düzen yapısı önbelleğe alma yeniden düzenlendi (#952). -**Claude Önbellekleme Standartları:**Normalleştirilmiş ve doğru şekilde sıkı bir şekilde korunan kritik geçici blok işaretleyicileri, standart uyumlu CC isteklerinin, metrikler düşürülmeden temiz bir şekilde haritalanmasını zorunlu kılan aşağı akış düğümleri için TTL siparişlerini önbelleğe alan "geçici" (#948). -**Dahili Takma Ad Kimlik Doğrulaması:**401 kimlik doğrulaması yapılmamış düşüşü çözümleyen global çeviri parametreleri içindeki Codex kimlik bilgisi veri yükü aramalarını normalleştiren basitleştirilmiş dahili çalışma zamanı eşlemeleri (#958).### 🛠️ Maintenance

-**Kullanıcı Arayüzü Keşfedilebilirliği:**Genel API kayıt sayfaları içindeki UX sıralama akışlarını iyileştiren, ücretsiz katman sağlayıcıların mantığını açıkça ayıran, doğru şekilde ayarlanmış düzen kategorizasyonları (#950). -**Dağıtım Topolojisi:**Kök `fly.toml' dosyasının, otomatik dağıtım ölçeklendirmesini yerel olarak yerel olarak yöneterek, kullanıma hazır beklenen bulut örneği parametreleriyle eşleşmesini sağlayan Birleşik Docker dağıtım yapıları. -**Geliştirme Araçları:**"LKGP" çalışma zamanı parametreleri, açık veritabanı katmanı soyutlama önbelleğe alma yardımcı programlarına ayrıştırılarak, çekirdek önbelleğe alma katmanları için katı test yalıtımı kapsamının güvenli bir şekilde sağlanması sağlandı.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Kontrol Paneli Otomatik Kombo Paneli:**Yerel Kontrol Paneli Kartları ve standartlaştırılmış görsel dolgu/başlıklar ile sorunsuz bir şekilde bütünleşmek için `/dashboard/auto-combo` kullanıcı arayüzünü tamamen yeniden düzenledi. Model seçimi ağırlık mekanizmalarını haritalayan dinamik görsel ilerleme çubukları eklendi. -**Ayarlar Yönlendirme Senkronizasyonu:**Genel ayarlar geri dönüş listelerinde dahili olarak tamamen kullanıma sunulan gelişmiş yönlendirme "önceliği" ve "ağırlıklı" şema hedefleri.### Bug Fixes

-**Bellek ve Beceriler Yerel Ayar Düğümleri:**Tüm "ayarlar*"ın dahili olarak "en.json"a eşlenmesi (ayrıca çapraz çeviri araçları için örtülü olarak eşleme) yoluyla tüm "ayarlar*" kablolanarak doğrudan genel ayarlar görünümleri içindeki Bellek ve Beceri seçenekleri için boş oluşturma etiketleri çözüldü.### Internal Integrations

- Entegre PR #946 — düzeltme: yanıt dönüşümünde Claude Kodu uyumluluğunu koruyun
- Entegre PR #944 — düzeltme(gemini): yerçekimine karşı araç çağrılarında düşünce imzalarını koruyun
- Entegre PR #943 — düzeltme: GitHub Copilot gövdesini geri yükleme
- Entegre PR #942 — Cc uyumlu önbellek işaretleyicilerini düzeltin
- Entegre PR #941 — refactor(auth): NVIDIA takma ad aramasını iyileştirin + LKGP hata günlüğü ekleyin
- Entegre PR #939 — Claude OAuth localhost geri arama işlemlerini geri yükleyin
- _(Not: PR #934, çekirdek çatışma regresyonlarını önlemek için 3.4.9 döngüsünden çıkarıldı)_---

## [3.4.8] — 2026-04-03

### Güvenlik

- Tüm olağanüstü Github Gelişmiş Güvenlik (CodeQL) bulguları ve Dependabot uyarıları tamamen iyileştirildi.
- 'Math.random'dan 'crypto.randomUUID()'ye geçiş yapılarak güvenli olmayan rastgelelik güvenlik açıkları düzeltildi.
- Dize enjeksiyonundan otomatik komut dosyalarındaki güvenli kabuk komutları.
- Sohbet/çeviri hatlarında hassas, yıkıcı geri izlemeli RegEx ayrıştırma kalıpları taşındı.
- React UI bileşenleri ve Sunucuya Gönderilen Olaylar (SSE) etiketi ekleme içindeki gelişmiş çıktı temizleme kontrolleri.---

## [3.4.7] — 2026-04-03

### Özellikler

- İzleme ve MCP durum kontrollerine 'Şifreleme' düğümü eklendi (#798)
- Sağlamlaştırılmış model kataloğu rota izinleri eşlemesi (`/models`) (#781)### Bug Fixes

- Claude OAuth belirteci yenilemelerinin önbellek bağlamlarını koruyamaması düzeltildi (#937)
- Önbelleğe alınmış modelleri erişilemez hale getiren CC Uyumlu sağlayıcı hataları düzeltildi (#937)
- Geçersiz bağlam dizileriyle ilgili GitHub Yürütücüsü hataları düzeltildi (#937)
- Windows'ta NPM yüklü CLI araçlarının durum kontrolü hataları düzeltildi (#935)
- Veri yükü çevirisinin geçersiz API alanları nedeniyle geçerli içeriği bırakması düzeltildi (#927)
- API anahtarının yürütülmesiyle ilgili olarak Düğüm 25'teki çalışma zamanı çökmesi düzeltildi (#867)
- 'esbuild' (#936) aracılığıyla MCP bağımsız modül çözünürlüğü ('ERR_MODULE_NOT_FOUND') düzeltildi
- NVIDIA NIM yönlendirme kimlik bilgisi çözümleme takma adı uyumsuzluğu düzeltildi (#931)### Güvenlik

- Ham "kabuk: doğru" uzaktan kod yürütme enjeksiyonlarına karşı güvenli, katı giriş sınırı koruması eklendi.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Sağlayıcılar:**Topluluğun talep ettiği listeden (#926) kayıtlı yeni görüntü, video ve ses oluşturma sağlayıcıları. -**Kontrol Paneli Kullanıcı Arayüzü:**Yeni Bellek ve Beceri modülleri (#926) için bağımsız kenar çubuğu gezinmesi eklendi. -**i18n:**Bellek ve Beceri ad alanları için 30 dilde çeviri dizeleri ve düzen eşlemeleri eklendi.### 🐛 Bug Fixes

-**Esneklik:**Geri dönüş birleşik yolları (#930) içinde KAPALI duruma doğrudan geçişleri işleyerek proxy Devre Kesicinin süresiz olarak AÇIK durumda takılı kalması önlendi. -**Protokol Çevirisi:**Yanıt bloklarını sağlayıcı _target_ protokolü yerine beklenen _source_ protokolüne göre temizlemek için akış transformatörüne yama uygulandı ve OpenAI yüklerine sarılmış Anthropics modellerinin Claude Code'u (#929) çökertmesi düzeltildi. -**API Özellikleri ve Gemini:**"openai-gemini" ve "claude-to-gemini" çeviricilerindeki "think_signature" ayrıştırması düzeltildi ve tüm Gemini 3 API araç çağrılarında HTTP 400 hataları önlendi. -**Sağlayıcılar:**Geçerli yukarı akış bağlantılarını önleyen OpenAI uyumlu olmayan uç noktalar temizlendi (#926). -**Önbellek Eğilimleri:**Önbellek Eğilimleri kullanıcı arayüzü grafiklerinin çökmesine neden olan geçersiz bir özellik eşleme verisi uyumsuzluğu düzeltildi ve gereksiz önbellek ölçüm widget'ları çıkarıldı (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**CLIProxyAPI Ekosistemi Entegrasyonu:**Yerleşik modül düzeyinde önbelleğe alma ve proxy yönlendirme özelliğine sahip "cliproxyapi" yürütücüsü eklendi. Sağlığı otomatik olarak test etmek, GitHub'dan ikili dosyalar indirmek, yalıtılmış arka plan işlemlerini oluşturmak ve harici CLI araçlarının yaşam döngüsünü doğrudan kullanıcı arayüzü aracılığıyla temiz bir şekilde yönetmek için kapsamlı bir Sürüm Yöneticisi hizmeti sunuldu. Harici OpenAI isteklerinin yerel CLI araç katmanı (#914, #915, #916) aracılığıyla otomatik SSRF geçitli çapraz yönlendirmesini etkinleştirmek için proxy yapılandırmasına yönelik veritabanı tabloları içerir. -**Qoder PAT Desteği:**Tümleşik Kişisel Erişim Belirteçleri (PAT), eski uzak ".cn" tarayıcı yapılandırmaları (#913) yerine doğrudan yerel "qodercli" aktarımı aracılığıyla desteklenir. -**Gemini 3.1 Pro Önizleme (GitHub):**Eski yönlendirme takma adlarını (#924) korurken GitHub Copilot sağlayıcısına yerel olarak "gemini-3.1-pro-preview" kanonik açık model desteği eklendi.### 🐛 Bug Fixes

-**GitHub Copilot Token Stabilitesi:**Eski tokenlerin DB ile derinlemesine birleştirilmediği Copilot token yenileme döngüsü onarıldı ve çok turlu sohbetler için aşağı akış Antropik blok dönüşümlerini ölümcül şekilde bozan `reasoning_text` alanları kaldırıldı (#923). -**Global Zaman Aşımı Matrisi:**Gizli (~300 saniye) varsayılan getirme arabelleklerinin, ağır muhakeme modellerinden gelen uzun ömürlü SSE akış yanıtlarını zamanından önce kesmesini önlemek için açıkça "REQUEST_TIMEOUT_MS"den gelen merkezi ve parametreli istek zaman aşımları (#918). -**Cloudflare Hızlı Tünel Durumu:**Yeniden başlatılan OmniRoute örneklerinin hatalı bir şekilde tahrip edilmiş tünelleri etkin olarak göstermesi ve UDP alma arabellek günlüğü spam'ini ortadan kaldırmak için bulut alevli tünellemenin varsayılan olarak "HTTP/2" olarak ayarlanmasıyla ortaya çıkan ciddi durum tutarsızlığı düzeltildi (#925). -**i18n Çeviri Yenilemesi (Çekçe ve Hintçe):**KALDIRILMIŞ "in.json"dan standart "hi.json"a Hintçe kod düzeltildi, Çekçe metin eşlemeleri elden geçirildi, CI/CD hatalı pozitif doğrulamalarını düzeltmek için "untranslatable-keys.json" çıkarıldı ve çevirmenlere rehberlik edecek kapsamlı "I18N.md" belgeleri oluşturuldu (#912). -**Belirteç Sağlayıcı Kurtarma:**Eksik DB derin birleştirmeleri (#917) nedeniyle otomatik durum denetimi belirteci yenilendikten sonra Qwen'in belirli "resourceUrl" uç noktalarını kaybetmesi düzeltildi. -**CC Uyumlu UX ve Akış:**Antropik UI tedavisi etrafında CC/OpenAI/Antropik uyumlu Ekleme eylemleri birleştirildi, istemci isteğine göre akışlı veya akışsız yanıtları döndürürken CC uyumlu yukarı akış isteklerini SSE kullanmaya zorladı, açık bir desteklenmeyen model listeleme hatası lehine CC model listesi yapılandırması/içe aktarma desteği kaldırıldı ve CC uyumlu Kullanılabilir Modeller, OAuth Claude Kodu kayıt listesini (#921) yansıtır hale getirildi.---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Yanıt API Token Raporlaması:**Codex CLI istemcileri için doğru "input_tokens"/"output_tokens" alanlarıyla "response.completed" yayınlayın ve jeton kullanım ekranını düzeltin (#909 — teşekkürler @christopher-s). -**Kapanma Sırasında SQLite WAL Denetim Noktası:**Sorunsuz kapatma/yeniden başlatma sırasında WAL değişikliklerini birincil veritabanı dosyasına aktarın ve Docker konteyner duraklarında veri kaybını önleyin (#905 — teşekkürler @rdself). -**Özenli Kapatma Sinyali:**`/api/restart` ve `/api/shutdown` rotaları `process.exit(0)` yerine `process.kill(SIGTERM)` olarak değiştirildi, böylece kapatma işleyicisinin çıkıştan önce çalışması sağlandı. -**Docker Stop Yetkisiz Kullanım Süresi:**Docker Compose dosyalarına `stop_grace_period: 40s` ve Docker çalıştırma örneklerine `--stop-timeout 40` eklendi.### 🛠️ Maintenance

- Çözülmüş/hata olmayan 5 sorun kapatıldı (#872, #814, #816, #890, #877).
- İhtiyaç bilgisi istekleriyle 6 sorun önceliklendirildi (#892, #887, #886, #865, #895, #870).
- Katkıda bulunanların rehberliğiyle CLI algılama izleme sorununa (#863) yanıt verildi.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Yerçekimi Önleme Hafızası ve Becerileri:**Yerçekimi Önleme sağlayıcısı için proxy ağ düzeyinde uzaktan bellek ve beceri ekleme tamamlandı. -**Claude Kod Uyumluluğu:**Claude Kodu için yerel olarak gizlenmiş bir uyumluluk köprüsü oluşturarak araçları ve biçimlendirmeyi temiz bir şekilde aktarın. -**Web Arama MCP'si:**`execute:search' kapsamıyla `omniroute_web_search` aracı eklendi. -**Önbellek Bileşenleri:**TDD kullanılarak uygulanan dinamik önbellek bileşenleri. -**Kullanıcı Arayüzü ve Özelleştirme:**Kenar çubuğuna özel site simgesi desteği, görünüm sekmeleri, kablolu beyaz etiketleme eklendi ve 33 dilin tamamında Rüzgar Sörfü kılavuzu adımları eklendi. -**Günlük Tutma:**Yerel olarak birleşik istek günlüğü tutma ve yapılar. -**Model Geliştirmeleri:**Tüm açık kodlu zen modelleri için açık bir "contextLength" eklendi. -**i18n ve çeviriler:**Yer tutucu CI doğrulamaları ve Çince belge güncellemeleri dahil olmak üzere yerel olarak entegre 33 dil çevirisi (#873, #869).### 🐛 Bug Fixes

-**Qwen OAuth Eşlemesi:**"id_token"in "access_token"e bağımlılığı geri alındı ​​ve uygun bölgesel yönlendirme için dinamik "resource_url" API uç noktası enjeksiyonu etkinleştirildi (#900). -**Model Senkronizasyon Motoru:**Kesin dahili Sağlayıcı Kimliğini, UI Kanal Takma Ad formatı yerine `getCustomModels()' senkronizasyon rutinlerinde depolayarak SQLite kataloğu ekleme hatalarını önledi (#903).
-**Claude Kodu ve Kodeksi:**CLI proxy çökmelerini önlemek için Antropik biçimli "(boş yanıt)"a standartlaştırılmış akışsız boş yanıtlar (#866).
-**CC Uyumlu Yönlendirme:**Genel Claude Code ağ geçitleri (#904) için yol birleştirme sırasında yinelenen '/v1' uç nokta çakışması çözüldü.
-**Yerçekimini Önleme Kontrol Panelleri:**Sınırsız kota modellerinin, Sağlayıcı Kullanımı Kullanıcı Arayüzünde (#857) tükenmiş "%100 Kullanım" sınırı durumları olarak yanlışlıkla kaydedilmesi engellendi.
-**Claude Görüntü Geçişi:**Claude modellerinde görüntü blok geçişlerinin eksik olması düzeltildi (#898).
-**Gemini CLI Yönlendirmesi:**Proje kimliğinin 'loadCodeAssist' (#868) aracılığıyla yenilenmesiyle 403 yetkilendirme kilitlenmesi ve içerik biriktirme sorunları çözüldü.
-**Yerçekimine Karşı Stabilite:**Model erişim listeleri düzeltildi, 404 kilitleme uygulandı, standart bağlantıları kilitleyen sabit 429 basamak ve "gemini-3.1-pro" çıkış jetonları (#885) kapatıldı.
-**Sağlayıcı Senkronizasyon Temposu:**Dahili planlayıcı (#888) aracılığıyla sağlayıcının senkronizasyon temposunu sınırlaması onarıldı.
-**Kontrol Paneli Optimizasyonu:**Öbek paralelleştirme yoluyla 70'ten fazla hesap işlenirken `/dashboard/limits' kullanıcı arayüzünün donması çözüldü (#784). -**SSRF Sertleştirme:**Zorunlu sıkı SSRF IP aralığı filtrelemesi uygulandı ve "::1" geri döngü arayüzü engellendi. -**MIME Türleri:**Gemini API spesifikasyonlarıyla eşleşmesi için `mime_type' ile yılan_durumu arasında standartlaştırılmıştır. -**CI Stabilizasyonu:**Başarısız analizler/ayarlar düzeltildi Oyun yazarı seçicileri ve istek iddiaları, GitHub Actions E2E çalıştırmalarının yerelleştirilmiş kullanıcı arayüzleri ve anahtar tabanlı kontroller arasında güvenilir bir şekilde geçmesini sağlar. -**Deterministik Testler:**Copilot kullanım testlerinden tarihe duyarlı kota fikstürleri kaldırıldı ve idempotency/model kataloğu testleri birleştirilmiş çalışma zamanı davranışıyla uyumlu hale getirildi. -**MCP Türü Sağlamlaştırma:**MCP sunucusu aracı kayıt yolundan sıfır bütçeli açık "herhangi bir" gerileme kaldırıldı. -**Model Senkronizasyon Motoru:**Sağlayıcının otomatik senkronizasyonu boş bir model listesi verdiğinde yıkıcı "değiştirme" geçersiz kılmaları atlandı ve dinamik kataloglar için kararlılık korundu (#899).### 🛠️ Maintenance

-**Ardışık Düzen Günlüğü:**Ardışık işlem hattı günlük kaydı yapıları iyileştirildi ve saklama sınırlarının uygulanması (#880). -**AGENTS.md Revizyonu:**297→153 satırdan özetlenmiştir. Derleme/test/stil yönergeleri, kod iş akışları (Prettier, TypeScript, ESLint) ve kısaltılmış ayrıntılı tablolar (#882) eklendi. -**Sürüm Şubesi Entegrasyonu:**Aktif özellik dalları mevcut "ana" sürüme ek olarak "sürüm/v3.4.2"de birleştirildi ve şube, tüysüz, birim, kapsam, derleme ve CI modu E2E çalıştırmalarıyla doğrulandı. -**Test:**Bileşen testleri için hız yapılandırması ve ayarlar arasında geçiş yapmak için Oyun Yazarı özellikleri eklendi. -**Belge Güncellemeleri:**Kök okuma dosyaları genişletildi, Çince belgeler yerel olarak çevrildi ve eski dosyalar temizlendi.## [3.4.1] - 2026-03-31

> [!UYARI]
> **KIRICI DEĞİŞİKLİK: istek günlüğe kaydetme, saklama ve günlüğe kaydetme ortamı değişkenleri yeniden tasarlandı.**
> Yükseltme sonrasındaki ilk başlangıçta OmniRoute, eski istek günlüklerini "DATA_DIR/logs/", eski "DATA_DIR/call_logs/" ve "DATA_DIR/log.txt" dosyasından "DATA_DIR/log_archives/\*.zip" dosyasına arşivler, ardından kullanımdan kaldırılan düzeni kaldırır ve altında yeni birleştirilmiş yapı biçimine geçer. 'DATA_DIR/call_logs/'.### ✨ New Features

-**.ENV Geçiş Yardımcı Programı:**"<v3.3" yapılandırmalarını "v3.4.x" sıkı güvenlik doğrulama kısıtlamalarına (FASE-01) sorunsuz bir şekilde geçirmek ve kısa "JWT_SECRET" örneklerinin neden olduğu başlangıç ​​çökmelerini onarmak için "scripts/migrate-env.mjs" dahil edilmiştir. -**Kiro AI Önbellek Optimizasyonu:**Çağrılar arasında AWS Builder ID İstemi Önbelleğe Almayı düzgün bir şekilde etkinleştirmek için deterministik "conversationId" oluşturma (uuidv5) uygulandı (#814). -**Kontrol Paneli Kullanıcı Arayüzü Restorasyonu ve Konsolidasyonu:**Hata Ayıklama bölümünün atlandığı kenar çubuğu mantığı çözüldü ve bağımsız "/dashboard/mcp" ve "/dashboard/a2a" sayfalarını açıkça yerleşik Uç Nokta Proxy Kullanıcı Arayüzü bileşenlerine taşıyarak Nextjs yönlendirme uyarılarını temizledi. -**Birleşik İstek Günlüğü Yapıları:**İstek günlüğü artık bir SQLite dizin satırını artı istek başına bir JSON yapıtını "DATA_DIR/call_logs/" altında saklıyor ve isteğe bağlı ardışık düzen yakalama aynı dosyaya gömülü durumda. -**Dil:**Çince çeviri geliştirildi (#855) -**Opencode-Zen Modelleri:**Opencode-zen kaydına 4 ücretsiz model eklendi (#854) -**Testler:**Ayarlar arasında geçiş yapmak ve hata düzeltmeleri için birim ve E2E testleri eklendi (#850)### 🐛 Bug Fixes

-**429 Kota Ayrıştırma:**Doğru geri çekilmeleri dikkate almak ve hız sınırlı hesap yasaklarını önlemek için hata gövdelerinden gelen uzun kota sıfırlama süreleri ayrıştırıldı (#859) -**İstemi Önbelleğe Alma:**Tüm Claude protokolü sağlayıcıları (Minimax, GLM ve Bailian gibi) için korunan istemci "cache_control" başlıkları, önbelleğe alma desteğini doğru şekilde tanır (#856) -**Model Senkronizasyon Günlükleri:**Yalnızca kanal listeyi gerçekten değiştirdiğinde "senkronizasyon modelleri" kaydedilerek günlük spam'ı azaltıldı (#853) -**Sağlayıcı Kotası ve Belirteç Ayrıştırma:**`RetrieveUserQuota'yı yerel olarak kullanmak için Antigravity sınırları değiştirildi ve Claude belirteci yenileme yüklerini URL kodlu formlara (#862) doğru bir şekilde eşledi
-**Hız Sınırlayıcı Kararlılık:**Sağlayıcının neden olduğu bekleme sürelerini maksimum 24 saatte sınırlamak için 429 Yeniden Deneme Sonrası ayrıştırma mimarisini evrenselleştirdi (#862)
-**Kontrol Paneli Sınırı Oluşturma:**Parçalar içinde hemen oluşturulacak şekilde yeniden tasarlanan `/dashboard/limits' kota eşlemesi, 70 etkin bağlantıyı aşan hesaplarda büyük kullanıcı arayüzü donma gecikmesini düzeltiyor (#784) -**QWEN OAuth Yetkilendirmesi:**OIDC "id_token", Dashscope istekleri için birincil API Taşıyıcı belirteci olarak eşlendi ve hesaplar bağlandıktan veya belirteçler yenilendikten sonra anında 401 Yetkisiz hatalar düzeltildi (#864) -**ZAI API Kararlılığı:**DeepSeek sağlayıcıları akıl yürütme aşamaları sırasında matematiksel olarak boş içerik akışı yaptığında, boş dizelere zarif bir şekilde geri dönmek için Sertleştirilmiş Sunucu Tarafından Gönderilen Olaylar derleyicisi (#871) -**Claude Code/Codex Çevirileri:**Akış yönündeki Codex araçlarından gelen boş yanıtlara karşı korumalı akış dışı veri yükü dönüşümleri, yıkıcı TypeErrors'lardan kaçınarak (#866) -**NVIDIA NIM Oluşturma:**Ses modelleri tarafından dinamik olarak gönderilen aynı sağlayıcı öneklerinin koşullu olarak çıkarılması, Medya Oyun Alanına 404 atan yinelenen "nim/nim" etiketi yapılarının ortadan kaldırılması (#872)### ⚠️ Breaking Changes

-**İstek Günlüğü Düzeni:**Eski çok dosyalı "DATA*DIR/logs/" istek günlüğü oturumları ve "DATA_DIR/log.txt" özet dosyası kaldırıldı. Yeni istekler "DATA_DIR/call_logs/YYYY-MM-DD/" dizinine tek JSON yapıları olarak yazılır. -**Günlüğe Kaydetme Ortamı Değişkenleri:**`LOG*_`, `ENABLE*REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE`ve`PROXY_LOG_MAX_ENTRIES`yeni`APP_LOG*_`ve`CALL_LOG_RETENTION_DAYS` yapılandırma modeliyle değiştirildi. -**Ardışık Düzen Geçiş Ayarı:**Eski "detailed_logs_enabled" ayarı "call_log_pipeline_enabled" ile değiştirildi. Yeni ardışık düzen ayrıntıları, ayrı "request_detail_logs" kayıtları olarak saklanmak yerine istek yapısının içine gömülür.### 🛠️ Maintenance

-**Eski İstek Günlüğü Yükseltme Yedeği:**Yükseltmeler artık kullanımdan kaldırılan yapıyı kaldırmadan önce eski "data/logs/", eski "data/call_logs/" ve "data/log.txt" düzenlerini "DATA_DIR/log_archives/\*.zip" dosyasında arşivliyor. -**Akış Kullanım Kalıcılığı:**Akış istekleri artık boş durum meta verileriyle devam eden bir kullanım satırının kopyasını yayınlamak yerine, tamamlandığında tek bir "usage_history" satırı yazıyor. -**Günlük İzleme Temizleme:**Ardışık düzen günlükleri artık "SOURCE REQUEST"i yakalamıyor, istek yapıt girişleri artık "CALL_LOG_MAX_ENTRIES"i dikkate alıyor ve uygulama günlüğü arşivleri artık "APP_LOG_MAX_FILES"ı dikkate alıyor.---

## [3.4.0] - 2026-03-31

### Özellikler

-**Abonelik Kullanımı Analizi:**Kota anlık görüntüsü zaman serisi takibi, yeniden çizelge görselleştirmeleri içeren Sağlayıcı Kullanımı ve Birleşik Sağlık sekmeleri ve karşılık gelen API uç noktaları eklendi (#847) -**SQLite Yedekleme Kontrolü:**Otomatik SQLite yedeklemelerini devre dışı bırakmak için yeni `OMNIROUTE_DISABLE_AUTO_BACKUP` env bayrağı (#846) -**Model Kayıt Defteri Güncellemesi:**Codex sağlayıcısının model dizisine (#756) `gpt-5.4-mini' enjekte edildi -**Sağlayıcı Sınırı Takibi:**Sağlayıcı ücret sınırlarının hesap başına en son ne zaman yenilendiğini takip edin ve görüntüleyin (#843)### 🐛 Bug Fixes

-**Qwen Kimlik Doğrulaması Yönlendirmesi:**Qwen OAuth tamamlamaları DashScope API'sinden Web Inference API'sine (`chat.qwen.ai`) yeniden yönlendirilerek yetkilendirme hataları çözüldü (#844, #807, #832) -**Qwen Otomatik Yeniden Deneme Döngüsü:**Ani istekleri koruyan "chatCore" içerisine hedeflenen 429 Kota Aşıldı geri çekilme işlemi eklendi -**Codex OAuth Geri Dönüşü:**Modern tarayıcı açılır pencerelerinin engellenmesi artık kullanıcıyı tuzağa düşürmüyor; otomatik olarak manuel URL girişine geri döner (#808) -**Claude Token Yenilemesi:**Anthropic'in katı "uygulama/json" sınırlarına artık simge oluşturma sırasında kodlanmış URL'ler yerine saygı duyulmaktadır (#836) -**Kodeks Mesajları Şeması:**ChatGPT yukarı akışından gelen yapısal reddetmeleri önlemek için yerel geçiş isteklerinden sadeleştirilmiş "mesajlar" enjekte edilir (#806) -**CLI Algılama Boyutu Sınırı:**Düğüm ikili tarama üst sınırını güvenli bir şekilde 100 MB'tan 350 MB'a çıkararak Claude Code (229 MB) ve OpenCode (153 MB) gibi ağır bağımsız araçların VPS çalışma zamanı (#809) tarafından doğru şekilde algılanmasına olanak tanır. -**CLI Çalışma Zamanı Ortamı:**CLI yapılandırmalarının, katı yola bağlı keşif kurallarını atlayarak kullanıcı geçersiz kılma yollarına (`CLI_{PROVIDER_BIN`) saygı duyma yeteneği geri yüklendi -**Nvidia Başlık Çakışmaları:**Antropik olmayan sağlayıcılar aranırken yukarı akış başlıklarından `prompt_cache_key` özellikleri kaldırıldı (#848) -**Codex Hızlı Katman Geçişi:**Işık modunda Codex hizmet katmanı geçiş kontrastı geri yüklendi (#842) -**Test Altyapısı:**Qwen yerel kayıt defteri için hatalı bir şekilde güncel olmayan DashScope uç noktası beklenen "t28-model-catalog-updates" testi güncellendi---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Özel Sağlayıcı Rotasyonu:**Dahili olarak DefaultExecutor'un içine entegre edilmiş `getRotatingApiKey', özel ve uyumlu yukarı akış sağlayıcıları için `extraApiKeys' rotasyonunun doğru şekilde tetiklenmesini sağlar (#815)---

## [3.3.8] - 2026-03-30

### Özellikler

-**Model API Filtreleme:**Uç nokta `/v1/models` artık kısıtlı erişim açıkken (#781) 'Yetkilendirme: Taşıyıcı <belirteç>'e bağlı izinlere göre listesini dinamik olarak filtreliyor -**Qoder Entegrasyonu:**Eski iFlow platformu eşlemelerinin yerini alan Qoder AI için yerel entegrasyon (#660) -**İstem Önbellek Takibi:**Kontrol Paneli kullanıcı arayüzünde anlamsal ve istemli önbelleğe alma için izleme özellikleri ve ön uç görselleştirme (İstatistik kartı) eklendi### 🐛 Bug Fixes

-**Önbellek Kontrol Paneli Boyutlandırması:**Gelişmiş önbellek sayfaları için kullanıcı arayüzü düzeni boyutları ve içerik başlıkları iyileştirildi (#835) -**Kenar Çubuğu Görünürlüğünde Hata Ayıklama:**Hata ayıklama geçişinin kenar çubuğu hata ayıklama ayrıntılarını doğru şekilde göstermemesi/gizlememesi sorunu düzeltildi (#834) -**Gemini Model Öneki:**Yukarı akış spesifikasyonlarına uymak için ad alanı geri dönüşü, 'gc/' yerine 'gemini-cli/' aracılığıyla düzgün şekilde yönlendirilecek şekilde değiştirildi (#831) -**OpenRouter Sync:**Mevcut model kataloğunun OpenRouter'dan doğru şekilde otomatik olarak alınması için geliştirilmiş uyumluluk senkronizasyonu (#830) -**Akış Verileri Eşlemesi:**Muhakeme alanlarının yeniden serileştirilmesi, çıktının uç cihazlara akışı sırasında çakışan takma ad yollarını yerel olarak çözer---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**Oluşturulan "opencode.json", düz diziler yerine nesne haritaları olarak "seçenekler" ve "modeller" ile "@ai-sdk/openai-uyumlu" kayıt tabanlı şemayı kullanacak şekilde yeniden yapılandırıldı ve yapılandırma doğrulama hataları düzeltildi (#816) -**i18n Eksik Anahtarlar:**Uç Nokta sayfasındaki (#823) "MISSING_MESSAGE" konsol hatalarını önlemek için 30 dil dosyasının tümüne eksik "cloudflaredUrlNotice" çeviri anahtarı eklendi---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Token Muhasebesi:**Doğru kota kesintileri için istem önbellek belirteçlerini geçmiş kullanım girdisi hesaplamalarına güvenli bir şekilde dahil etti (PR #822) -**Kombo Test Probları:**Yalnızca akıl yürütmeye yönelik yanıtlar için ayrıştırmayı çözümleyerek karma test mantığındaki yanlış negatifler düzeltildi ve Promise.all (PR #828) aracılığıyla büyük paralelleştirme etkinleştirildi -**Docker Hızlı Tünelleri:**Cloudflared TLS başlatma hatalarını çözmek için temel çalışma zamanı kapsayıcısının içine gerekli ca-sertifikaları yerleştirildi ve genel çıkış kodlarının yerini alan stdout ağ hataları ortaya çıktı (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Gemini Kota Takibi:**"retrieveUserQuota" API'si (PR #825) aracılığıyla gerçek zamanlı Gemini CLI kota takibi eklendi -**Önbellek Kontrol Paneli:**Önbellek Kontrol Paneli, anlık önbellek ölçümlerini, 24 saatlik eğilimleri ve tahmini maliyet tasarruflarını görüntüleyecek şekilde geliştirildi (PR #824)### 🐛 Bug Fixes

-**Kullanıcı Deneyimi:**Verimsiz sağlayıcının ayrıntılı sayfalarındaki istilacı otomatik açılan OAuth modal döngüleri kaldırıldı (PR #820) -**Bağımlılık Güncellemeleri:**Next.js 16.2.1, Recharts ve TailwindCSS 4.2.2 (PR #826, #827) dahil geliştirme ve üretim ağaçları için güçlendirilmiş ve kilitlenmiş bağımlılıklar---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**A2A İş Akışları:**Çok adımlı aracı iş akışları için deterministik FSM orkestratörü eklendi. -**Önemli Bozulma:**Kısmi sistem kesintileri sırasında temel işlevleri korumak için yeni, çok katmanlı bir geri dönüş çerçevesi eklendi. -**Yapılandırma Denetimi:**Değişiklikleri izlemek ve yapılandırma geri alma işlemlerini etkinleştirmek için fark algılamalı bir denetim izi eklendi. -**Sağlayıcı Sağlığı:**Süresi dolan API anahtarları için proaktif kullanıcı arayüzü uyarılarıyla sağlayıcı sona erme takibi eklendi. -**Uyarlanabilir Yönlendirme:**Yönlendirme stratejilerini yüke göre dinamik olarak geçersiz kılmak için uyarlanabilir bir hacim ve karmaşıklık algılayıcısı eklendi. -**Sağlayıcı Çeşitliliği:**Yük dağıtımını iyileştirmek için Shannon entropisi aracılığıyla sağlayıcı çeşitliliği puanlaması uygulandı. -**Sınırları Otomatik Devre Dışı Bırak:**Resilience kontrol paneline Yasaklı Hesapları Otomatik Devre Dışı Bırak ayarı seçeneği eklendi.### 🐛 Bug Fixes

-**Codex ve Claude Uyumluluğu:**Sabit kullanıcı arayüzü geri dönüşleri, Codex akış dışı entegrasyon sorunları düzeltildi ve Windows'ta CLI çalışma zamanı algılaması çözüldü. -**Sürüm Otomasyonu:**GitHub Eylemlerinde Electron Uygulaması derlemesi için gereken genişletilmiş izinler. -**Cloudflare Çalışma Zamanı:**Cloudflared tünel bileşenleri için doğru çalışma zamanı izolasyon çıkış kodları düzeltildi.### 🧪 Tests

-**Test Paketi Güncellemeleri:**Hacim dedektörleri, sağlayıcı çeşitliliği, konfigürasyon denetimi ve FSM için genişletilmiş test kapsamı.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**CI/CD Güvenilirliği:**Derleyici ortamının habersiz kullanımdan kaldırılmasını azaltmak için GitHub Eylemlerini kararlı bağımlılık sürümlerine ("actions/checkout@v4", "actions/upload-artifact@v4") yamalı. -**Görüntü Yedekleri:**Mevcut olmayan dosyalar için kullanıcı arayüzünün "<Image>" bileşenlerini yüklemesini önlemek için "ProviderIcon.tsx"teki rastgele geri dönüş zincirleri, açık varlık doğrulamayla değiştirildi ve kontrol paneli konsol günlüklerindeki "404" hataları (#745) ortadan kaldırıldı. -**Yönetici Güncelleyici:**Kontrol paneli Güncelleyicisi için dinamik kaynak yükleme algılaması. OmniRoute npm yerine yerel olarak oluşturulduğunda 'git pull' (#743) isteminde bulunarak 'Şimdi Güncelle' düğmesini güvenli bir şekilde devre dışı bırakır. -**ERESOLVE Güncelleme Hatası:**"@lobehub/ui" ile bozulan bağımlılık ağacı çakışmalarını çözmek için "react"/"react-dom" için "package.json" geçersiz kılmaları eklendi ve dahili otomatik güncelleyici komut dosyalarına "--legacy-peer-deps" etkinleştirildi.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Cloudflare Tünelleri:**Kontrol paneli kontrolleriyle Cloudflare Hızlı Tünel entegrasyonu (PR #772). -**Teşhis:**Birleşik canlı testler için anlamsal önbellek atlama (PR #773).### 🐛 Bug Fixes

-**Akış Kararlılığı:**Sessiz görev hatalarına neden olan 300 saniyelik Node.js TCP zaman aşımını önlemek için akış isteklerinin ilk "fetch()" çağrısına "FETCH_TIMEOUT_MS" uygulayın (#769). -**i18n:**33 yerel ayar dosyasının tamamında (#748) eksik "windsurf" ve "copilot" girişlerini "toolDescriptions"a ekleyin. -**GLM Kodlama Denetimi:**ReDoS güvenlik açıklarını, bağlam penceresi boyutlandırmasını (128k/16k) ve model kayıt defteri senkronizasyonunu (PR #778) düzelten eksiksiz sağlayıcı denetimi.---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI Codex:**400 reddine neden olan boş veya boş veri kümeleri taşıyan `type: "text"` öğeleri için geri dönüş işleme düzeltmesi (#742). -**Açık kod:**Resmi spesifikasyonla (#774) eşleşmesi için şema hizalamasını tekil "sağlayıcı" olarak güncelleyin. -**Gemini CLI:**Eksik son kullanıcı kota başlıklarını ekleyerek 403 yetkilendirme kilitlemesini önleyin (#775). -**Veritabanı Kurtarma:**Ters proxy maksimum gövde sınırlarını (#770) atlamak için çok parçalı veri aktarımını ham ikili arabelleğe alınmış dizilere yeniden düzenleyin.---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Sürüm Stabilizasyonu**— v3.2.9 sürümü sonlandırıldı (birleşik teşhisler, kalite geçitleri, Gemini araç düzeltmesi) ve eksik git etiketi oluşturuldu. Tüm aşamalı değişiklikleri tek bir atomik sürüm taahhüdü altında birleştirdi.### 🐛 Bug Fixes

-**Otomatik Güncelleme Testi**— `buildDockerComposeUpdateScript` test onayı, oluşturulan dağıtım komut dosyasındaki genişletilmemiş kabuk değişkeni referanslarıyla (`$TARGET_TAG`, `${TARGET_TAG#v}`) eşleşecek ve v3.2.8'den yeniden düzenlenen şablonla uyumlu olacak şekilde düzeltildi. -**Devre Kesici Testi**— Kesici durumu geçişleri sırasında başarısızlık sayım iddialarının çarpıtılmasından kaynaklanan yeniden deneme enflasyonunu önlemek için "maxRetries: 0" enjekte edilerek "combo-circuit-breaker.test.mjs" sağlamlaştırıldı.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Combo Diagnostics**— Yöneticilerin, tüm yerel devre kesici ve soğuma durumu mekanizmalarını atlayan gerçek yukarı akış durum kontrollerini yürütmesine olanak tanıyan ve kesintiler sırasında hassas tanılamayı mümkün kılan bir canlı test atlama bayrağı ("forceLiveComboTest") kullanıma sunuldu (PR #759) -**Kalite Kapıları**— Kombinasyonlar için otomatik yanıt kalitesi doğrulaması eklendi ve resmi olarak temel yönlendirme şemalarına "claude-4.6" model desteği entegre edildi (PR #762)### 🐛 Bug Fixes

-**Araç Tanımı Doğrulaması**— Araç tanımlarındaki numaralandırma türlerini normalleştirerek Gemini API entegrasyonu onarıldı ve yukarı akış HTTP 400 parametre hataları önlendi (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Docker Otomatik Güncelleme Kullanıcı Arayüzü**— Docker Compose dağıtımları için bağımsız bir arka plan güncelleme işlemi entegre edildi. Kontrol Paneli Kullanıcı Arayüzü artık, ortamlar arası sağlam güvenilirlik için JSON REST yanıtlarını SSE akış ilerleme katmanlarıyla birleştirerek güncelleme yaşam döngüsü olaylarını sorunsuz bir şekilde izliyor. -**Önbellek Analizi**— Anlamsal Önbellek telemetri günlüklerinin doğrudan merkezi izleme SQLite modülüne taşınmasıyla sıfır ölçümlü görselleştirme eşlemesi onarıldı.### 🐛 Bug Fixes

-**Kimlik Doğrulama Mantığı**— "requireLogin" devre dışı bırakıldığında kontrol paneli ayarlarını kaydetmenin veya model eklemenin 401 Yetkisiz hatasıyla başarısız olmasına neden olan bir hata düzeltildi. API uç noktaları artık genel kimlik doğrulama geçişini doğru şekilde değerlendiriyor. 'src/middleware.ts' yeniden etkinleştirilerek genel yeniden yönlendirme sorunu çözüldü. -**CLI Aracı Algılama (Windows)**— "çapraz ortaya çıkan" ENOENT hatalarını doğru şekilde yakalayarak CLI ortamı algılaması sırasında önemli başlatma istisnalarını önledi. `\AppData\Local\droid\droid.exe` için açık algılama yolları ekler. -**Codex Yerel Geçiş**— Proxy geçiş modunda bağlam zehirlenmesini önleyen normalleştirilmiş model çeviri parametreleri, tüm Codex kaynaklı istekler için genel "store: false" kısıtlamalarını açıkça zorunlu kılar. -**SSE Token Raporlaması**— Normalleştirilmiş sağlayıcı araç çağrısı öbeği "finish_reason" algılaması, %0 düzeltildi Yalnızca akış yanıtları için kesin "<BİTTİ>" göstergeleri eksik olan kullanım analitiği. -**DeepSeek <think> Etiketler**— "responsesHandler.ts" içinde açık bir "<think>" çıkarma eşlemesi uygulayarak DeepSeek muhakeme akışlarının yerel Antropik "<thinking>" yapılarıyla eşdeğer şekilde eşlenmesini sağladı.---

## [3.2.7] - 2026-03-29

### Fixed

-**Sorunsuz Kullanıcı Arayüzü Güncellemeleri**: Kontrol Panelindeki "Şimdi Güncelle" özelliği artık Sunucu Tarafından Gönderilen Olayları (SSE) kullanarak canlı, şeffaf geri bildirim sağlıyor. Paket kurulumunu gerçekleştirir, yerel modül yeniden oluşturur (better-sqlite3) ve PM2, sessizce takılmak yerine gerçek zamanlı yükleyicileri gösterirken güvenilir bir şekilde yeniden başlar.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API Anahtarı Ortaya Çıkarma (#740)**— Api Yöneticisine, "ALLOW_API_KEY_REVEAL" ortam değişkeni tarafından korunan kapsamlı bir API anahtarı kopyalama akışı eklendi. -**Kenar Çubuğu Görünürlük Denetimleri (#739)**— Yöneticiler artık görsel karışıklığı azaltmak için Görünüm ayarları aracılığıyla herhangi bir kenar çubuğu gezinme bağlantısını gizleyebilir. -**Sıkı Kombo Testi (#735)**— Kombo durum kontrolü uç noktası, modellerden yalnızca yumuşak erişilebilirlik sinyalleri yerine canlı metin yanıtları gerektirecek şekilde sağlamlaştırıldı. -**Akışlı Ayrıntılı Günlükler (#734)**— Son yükü yeniden oluşturmak için SSE akışları için ayrıntılı istek günlüğü değiştirildi, SQLite veritabanı boyutundan büyük miktarda tasarruf sağlandı ve kullanıcı arayüzü önemli ölçüde temizlendi.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— OpenCode Go'daki "minimax" modelleri için kimlik doğrulama başlığı mantığı, "/messages" protokolünde standart taşıyıcı belirteçleri yerine "x-api-key" kullanacak şekilde düzeltildi.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Dağıtım Desteği (#732)**— Çapraz derleme hedefi aracılığıyla OmniRoute'u "better-sqlite3" bağlamalarıyla yerel olarak derlemek ve yüklemek için entegre "xbps-src" paketleme şablonu ve talimatları.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI Migration (#660)**— Eski "iFlow" çekirdek sağlayıcısını, istikrarlı API yönlendirme yeteneklerini koruyarak tamamen "Qoder AI"ya taşıdı.### 🐛 Bug Fixes

-**Gemini Tools HTTP 400 Yükü Geçersiz Bağımsız Değişken (#731)**— Standart Gemini "functionCall" dizilerinin içine aracılı yönlendirme akışlarını engelleyen "thinkSignature" dizisi enjeksiyonları engellendi.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Sağlayıcı Limitleri Kota Kullanıcı Arayüzü (#728)**— Limitler arayüzünde normalleştirilmiş kota limiti mantığı ve veri etiketleme.### 🐛 Bug Fixes

-**Çekirdek Yönlendirme Şemaları ve Sızıntılar**— Karmaşık birleşik düzenlemenin yerel olarak engelini kaldırmak için "önce doldur" ve "p2c" stratejilerini yerel olarak destekleyecek şekilde genişletilmiş "comboStrategySchema". -**Düşünme Etiketleri Çıkarma (CLI)**— Yeniden yapılandırılmış CLI belirteç yanıtları, RegEx'i temizleyerek akışlar içindeki model akıl yürütme yapılarını yakalayarak yanıt metni çıktı formatını bozan bozuk "<düşünme>" çıkarmaları önler. -**Katı Format Yaptırımları**— Çeviri modu hedeflerine evrensel olarak uygulanmasını sağlayan güçlendirilmiş ardışık düzen temizleme uygulaması.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Dört Aşamalı İstek Günlüğü İşlem Hattı (#705)**— Dört farklı işlem hattı aşamasında kapsamlı yükleri kaydetmek için günlük kalıcılığı yeniden düzenlendi: Müşteri İsteği, Çevrilmiş Sağlayıcı İsteği, Sağlayıcı Yanıtı ve Çevrilmiş Müşteri Yanıtı. Güçlü SSE akışı kesme ve yük serileştirmesi için "streamPayloadCollector" tanıtıldı.### 🐛 Bug Fixes

-**Mobil Kullanıcı Arayüzü Düzeltmeleri (#659)**— "DashboardLayout"a uygun yatay kaydırma ve taşma koruması eklenerek, kontrol panelindeki tablo bileşenlerinin dar görünüm alanlarındaki düzeni bozması engellendi. -**Claude İstemi Önbellek Düzeltmeleri (#708)**— Claude-Claude geri dönüş döngülerindeki "cache_control" bloklarının aslına sadık kalınarak Anthropic modellerine güvenli bir şekilde geri aktarılması sağlandı. -**Gemini Araç Tanımları (#725)**— Gemini işlevi çağrısı için basit "nesne" parametre türlerini bildirirken oluşan şema çeviri hataları düzeltildi.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Global Geri Dönüş Sağlayıcısı (#689)**— Tüm birleşik modeller tükendiğinde (502/503), OmniRoute artık hatayı döndürmeden önce yapılandırılabilir bir genel geri dönüş modeli dener. Etkinleştirmek için ayarlarda "globalFallbackModel"i ayarlayın.### 🐛 Bug Fixes

-**Düzeltme #721**— Araç çağrısı yanıtları sırasında bağlam sabitlemenin atlanması düzeltildi. Akış dışı etiketlemede yanlış JSON yolu kullanıldı (`json.messages` → `json.choices[0].message`). Akış enjeksiyonu artık yalnızca araç çağrısı akışları için "finish_reason" parçalarında tetikleniyor. `injectModelTag()` artık dize olmayan içerik için sentetik pin mesajları ekliyor. -**Düzeltme #709**— Onaylandı zaten düzeltildi (v3.1.9) — `system-info.mjs` dizinleri yinelemeli olarak oluşturuyor. Kapalı. -**Düzeltme #707**— Onaylandı zaten düzeltildi (v3.1.9) — 'chatCore.ts'de boş araç adı temizliği. Kapalı.### 🧪 Tests

- Araç çağrısı yanıtlarıyla bağlam sabitleme için 6 birim test eklendi (boş içerik, dizi içeriği, gidiş dönüş, yeniden enjeksiyon)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Önbellek Yönetimi Kullanıcı Arayüzü**— \`/dashboard/cache\` adresine hedefli API geçersizleştirme ve 31 dilli i18n desteği ile özel bir anlamsal önbellekleme panosu eklendi (PR #701 by @oyi77) -**GLM Kota Takibi**— GLM Kodlama (Z.AI) sağlayıcısı için gerçek zamanlı kullanım ve oturum kotası takibi eklendi (PR #698 @christopher-s tarafından) -**Ayrıntılı Günlük Yükleri**— Doğrudan kullanıcı arayüzüne kablolu tam dört aşamalı ardışık düzen verisi yakalama (orijinal, çevrilmiş, sağlayıcı yanıtı, akışlı deltalar) (@rdself tarafından PR #705)### 🐛 Bug Fixes

-**Düzeltme #708**— Claude'dan Claude'a geçiş sırasında yerel \`cache_control\` başlıklarını doğru şekilde koruyarak OmniRoute aracılığıyla yönlendirme yapan Claude Code kullanıcıları için belirteç sızıntısı önlendi (PR #708 @tombii tarafından) -**Düzeltme #719**— Başlangıçta kimliği doğrulanmamış arka plan programı hatalarını önlemek için \`ModelSyncScheduler\` için dahili kimlik doğrulama sınırlarını ayarlayın (PR #719 @rdself tarafından) -**Düzeltme #718**— Sağlayıcı Sınırları kullanıcı arayüzünde hatalı kota sınırlarının çakışmasını önleyen yeniden oluşturulmuş rozet oluşturma (PR #718 @rdself tarafından) -**Düzeltme #704**— HTTP 400 içerik politikası hatalarında model rotasyonunun ölü yönlendirmesini önleyen Combo Fallback'lerin bozulması düzeltildi (PR #704, @rdself tarafından)### 🔒 Security & Dependencies

- Dependabot güvenlik açıklarını gidermek için \`regexp yolu\` \`8.4.0\`a yükseltildi (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Düzeltme #706**— Tailwind V4'te '!important'ın '.material-symbols-outlined'a uygulanmasıyla 'font-sans' geçersiz kılınmasının neden olduğu simge geri dönüş oluşturma sorunu düzeltildi. -**Düzeltme #703**— GitHub Copilot'un bozuk akışları, "apiFormat: "responses"'tan yararlanan tüm özel modeller için "responses"ın "openai" formatına çevrilmesini etkinleştirerek düzeltildi. -**Düzeltme #702**— Sabit oranlı kullanım takibi, hem akışlı hem de akışsız yanıtlar için doğru veritabanı fiyatlandırma hesaplamalarıyla değiştirildi. -**Düzeltme #716**— Claude araç çağrısı çeviri durumu temizlendi, akış bağımsız değişkenleri doğru şekilde ayrıştırıldı ve OpenAI "tool_calls" parçalarının "id" alanını tekrarlaması engellendi.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Şema Zorlaması**— Dize kodlu sayısal JSON Şeması kısıtlamalarını (ör. "minimum": "1"`) uygun türlere otomatik olarak zorlayarak İmleç, Cline ve hatalı biçimlendirilmiş araç şemaları gönderen diğer istemcilerden kaynaklanan 400 hatayı önler.
-**Araç Açıklaması Temizleme**— Araç açıklamalarının her zaman dize olduğundan emin olun; sağlayıcılara göndermeden önce "boş", "tanımsız" veya sayısal açıklamaları boş dizelere dönüştürür.
-**Tüm Modelleri Temizle Düğmesi**— "Tüm Modelleri Temizle" sağlayıcı işlemi için 30 dilin tamamında i18n çevirileri eklendi.
-**Codex Auth Export**— Kusursuz CLI entegrasyonu için Codex `auth.json` dışa aktarma ve yerel uygulama düğmeleri eklendi. -**Windsurf BYOK Notları**— Windsurf CLI araç kartına BYOK kısıtlamalarını belgeleyen resmi sınırlama uyarıları eklendi.### 🐛 Bug Fixes

-**Düzeltme #709**— `system-info.mjs` artık çıktı dizini mevcut olmadığında çökmüyor (yinelemeli bayrakla `mkdirSync` eklendi). -**Düzeltme #710**— A2A "TaskManager" singleton'u artık geliştirme modunda Next.js API rota yeniden derlemelerinde durum sızıntısını önlemek için "globalThis" kullanıyor. E2E test paketi 401'i sorunsuz şekilde işleyecek şekilde güncellendi. -**Düzeltme #711**— Yukarı akış istekleri için sağlayıcıya özel "max*tokens" üst sınır uygulaması eklendi. -**#605 / #592'yi düzeltin**— Akış dışı Claude yanıtlarındaki araç adlarından "proxy*" önekini çıkarın; LongCat doğrulama URL'si düzeltildi. -**Çağrı Günlükleri Maksimum Sınırı**— Önbellekleme katmanı, env var desteği (`CALL_LOGS_MAX`) ve Veritabanı ayarları entegrasyonu ile `getMaxCallLogs()` yükseltildi.### 🧪 Tests

- Test paketi 964 → 1027 testten genişletildi (63 yeni test)
- 'schema-coercion.test.mjs' eklendi - sayısal alan zorlaması ve araç açıklaması temizliği için 9 test
- 't40-opencode-cli-tools-integration.test.mjs' eklendi — OpenCode/Windsurf CLI entegrasyon testleri
- Kapsamlı kapsam araçlarıyla geliştirilmiş özellik testleri şubesi### 📁 New Files

| Dosya                                                    | Amaç                                                             |
| -------------------------------------------------------- | ---------------------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts'          | Şema zorlaması ve araç açıklaması temizleme yardımcı programları |
| 'tests/unit/schema-coercion.test.mjs'                    | Şema zorlaması için birim testleri                               |
| 'tests/unit/t40-opencode-cli-tools-integration.test.mjs' | CLI aracı entegrasyon testleri                                   |
| `COVERAGE_PLAN.md`                                       | Test kapsamı planlama belgesi                                    | ### 🐛 Bug Fixes |

-**Claude İstemi Önbelleğe Alma Geçişi**— Claude geçiş modunda (Claude → OmniRoute → Claude) önbellek_kontrol işaretleyicilerinin çıkarılması düzeltildi; bu durum, Claude Code kullanıcılarının Antropik API kotalarını doğrudan bağlantılardan 5-10 kat daha hızlı tüketmelerine neden oldu. OmniRoute artık sourceFormat ve targetFormat'ın her ikisi de Claude olduğunda istemcinin önbellek_kontrol işaretleyicilerini koruyarak hızlı önbelleğe almanın doğru şekilde çalışmasını sağlar ve belirteç tüketimini önemli ölçüde azaltır.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Platform Çekirdeği:**Gizli Modeller ve Kombinasyonlar için, katalogda karışıklık yaratmalarını veya bağlı MCP aracılarına sızmalarını önleyen küresel durum yönetimi uygulandı (#681). -**Kararlılık:**İşlenmeyen tanımsız durum dizileri nedeniyle yerel Antigravity sağlayıcı entegrasyonunun başarısız olmasıyla ilgili yamalı akış çökmeleri (#684). -**Yerelleştirme Senkronizasyonu:**Eksik iç içe JSON özelliklerini tespit eden ve 30 yerel ayarı sırayla (#685) yeniden düzenleyen tamamen yenilenmiş bir "i18n" eşitleyici dağıtıldı.## [3.1.7] - 2026-03-27### 🐛 Bug Fixes

-**Akış Kararlılığı:**"hasValuableContent"in SSE akışlarındaki boş parçalar için "tanımsız" döndürmesi düzeltildi (#676). -**Araç Çağırma:**`sseParser.ts'de, birden fazla araç çağrısına sahip akışsız Claude yanıtlarının hatalı dizin tabanlı tekilleştirme nedeniyle sonraki araç çağrılarının "kimliğini" düşürmesine neden olan sorun (#671) düzeltildi.---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Claude Yerel Araç Adı Geri Yükleme**— Claude geçiş yanıtlarında (hem akışlı hem de akışsız) "TodoWrite" gibi araç adlarının önüne artık "proxy\_" eklenmemektedir. Birim testi kapsamını içerir (PR #663, @coobabm) -**Tüm Modellerin Takma Adını Temizle**— "Tüm Modelleri Temizle" düğmesi artık ilişkili model takma adlarını da kaldırarak kullanıcı arayüzündeki hayalet modelleri önler (PR #664 by @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**— Hız sınırlamalı hesaplar artık bekleme süreleri sona erdiğinde otomatik olarak iyileşerek yüksek "backoffLevel"e sahip hesapların kalıcı olarak önceliklendirilmediği çıkmazı düzeltiyor (@brendandebeasi tarafından yazılan PR #657)### 🌍 i18n

-**Çince çeviri revizyonu**— `zh-CN.json`un geliştirilmiş doğrulukla kapsamlı yeniden yazılması (PR #658, @only4copilot tarafından)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Akış Geçersiz Kılma Düzeltmesi**— İstek gövdesindeki açık "stream: true" artık "Accept: application/json" başlığına göre önceliklidir. Her ikisini de gönderen istemciler, SSE akış yanıtlarını doğru şekilde alacaktır (#656)### 🌍 i18n

-**Çekçe dize iyileştirmeleri**— 'cs.json' genelinde iyileştirilmiş terminoloji (PR #655, @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 eksik çeviri anahtarı**"en.json"a ve 12 dile eklendi (PR #652 by @zen0bit) -**Çekçe belgeler güncellendi**— CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT kılavuzları (PR #652) -**Çeviri doğrulama komut dosyaları**— CI/QA için `check_translations.py` ve `validate_translation.py` (PR #651 by @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Kritik: Araç Çağırma Regresyon**— Claude geçiş yolundaki "proxy\_" araç adı önekini devre dışı bırakarak "proxy_Bash" hataları düzeltildi. 'Bash', 'Read', 'Write' gibi araçlar 'proxy_Bash', 'proxy_Read' vb. olarak yeniden adlandırılıyor ve bu da Claude'un bunları reddetmesine neden oluyor (#618) -**Kiro Hesabı Yasaklama Belgeleri**— OmniRoute sorunu değil, AWS dolandırıcılık karşıtı yanlış pozitif olarak belgelenmiştir (#649)### 🧪 Tests

-**936 test, 0 başarısızlık**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Görme Yeteneği Meta Verileri**: Görme özellikli modeller için `/v1/models` girişlerine `capaability.vision`, `input_modality` ve `output_modalite` eklendi (PR #646) -**Gemini 3.1 Modelleri**: Antigravity sağlayıcısına (#645) "gemini-3.1-pro-preview" ve "gemini-3.1-flash-lite-preview" eklendi### 🐛 Bug Fixes

-**Ollama Cloud 401 Hatası**: Yanlış API temel URL'si düzeltildi — "api.ollama.com" yerine resmi "ollama.com/v1/chat/completions" (#643) olarak değiştirildi -**Süresi Dolmuş Jeton Yeniden Denemesi**: Süresi dolmuş OAuth bağlantılarını kalıcı olarak atlamak yerine üstel gerileme (5→10→20 dakika) ile sınırlı yeniden deneme eklendi (PR #647)### 🧪 Tests

-**936 test, 0 başarısızlık**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**GitHub Sorun Şablonları**: Standartlaştırılmış hata raporu, özellik isteği ve yapılandırma/proxy sorun şablonları eklendi (#641) -**Tüm Modelleri Temizle**: 29 dilde i18n desteğiyle sağlayıcı ayrıntı sayfasına "Tüm Modelleri Temizle" düğmesi eklendi (#634)### 🐛 Bug Fixes

-**Yerel Ayar Çatışması ("in.json")**: Weblate'teki çeviri çakışmalarını düzeltmek için Hintçe yerel ayar dosyasının adı "in.json"dan (Endonezya ISO kodu) "hi.json"a değiştirildi (#642) -**Codex Boş Araç Adları**: Araç adı temizleme işlemi yerel Codex geçişinden önce taşındı ve araçların boş adları olduğunda yukarı akış sağlayıcılarından kaynaklanan 400 hata düzeltildi (#637) -**Yeni Satır Yapılarının Akışı**: Yanıt temizleyiciye `collapseExcessiveNewlines' eklendi, düşünme modellerinden ardışık 3'ten fazla yeni satır çalıştırması standart bir çift yeni satıra daraltıldı (#638)
-**Claude Reasoning Effort**: OpenAI `reasoning_effort`parametresi, otomatik`max_tokens`ayarlaması (#627) dahil olmak üzere tüm istek yollarında Claude'un yerel`düşünme' bütçe bloğuna dönüştürüldü -**Qwen Token Yenileme**: Kısa ömürlü belirteçler kullanıldığında isteklerin başarısız olmasını önlemek için proaktif geçerlilik süresi öncesi OAuth belirteci yenilemeleri (5 dakikalık arabellek) uygulandı (#631)### 🧪 Tests

-**936 test, 0 başarısızlık**(3.0.9'dan bu yana +10 test)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**Claude Kodundaki NaN belirteçleri / müşteri yanıtları (#617):**

- ``sanitizeUsage()` artık beyaz liste filtresinden önce `input_tokens`→`prompt_tokens` ve `output_tokens`→`completion_tokens`ı çapraz eşliyor ve sağlayıcılar Claude tarzı kullanım alanı adlarını döndürdüğünde NaN/0 jeton sayımlarını gösteren yanıtları düzeltiyor### Güvenlik

- Yığın taşması güvenlik açığını düzeltmek için "yaml" paketi güncellendi (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Kapalı #613 (Codestral — Özel Sağlayıcı geçici çözümüyle çözüldü)
- #615 hakkında yorum yapıldı (OpenCode çift uç noktası — geçici çözüm sağlandı, özellik isteği olarak izlendi)
- #618 hakkında yorum yapıldı (araç çağrısı görünürlüğü — v3.0.9 testi isteniyor)
- #627'ye yorum yapıldı (çaba seviyesi — zaten destekleniyor)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Claude CLI'deki OpenAI formatı Sağlayıcıları için Çeviri Hataları (#632):**

- StepFun/OpenRouter'dan `reasoning_details[]` dizi formatını yönetin — `reasoning_content`e dönüştürür
- Bazı sağlayıcıların "akıl yürütme" alanı takma adını yönetin → "akıl yürütme_içeriği" olarak normalleştirildi
- Haritalar arası kullanım alanı adları: `filterUsageForFormat`ta `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens`
- Hem `input_tokens`/`output_tokens` hem de `prompt_tokens`/`completion_tokens`ı geçerli kullanım alanları olarak kabul edecek şekilde `extractUsage`ı düzeltin
- Hem akışlı ("sanitizeStreamingChunk", "openai-to-claude.ts" çeviricisi) hem de akışsız ("sanitizeMessage") yollara uygulanır---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Antigravity Token Yenileme:**NPM yüklü kullanıcılar için "client_secret eksik" hatası düzeltildi — ProvidersRegistry'de "clientSecretDefault" boştu ve Google'ın jeton yenileme isteklerini reddetmesine neden oldu (#588) -**OpenCode Zen Modelleri:**OpenCode Zen kayıt girişine `modelsUrl' eklendi, böylece "/modellerden içe aktar" özelliğinin doğru şekilde çalışması (#612) -**Akış Yapıları:**Düşünme etiketi imzasının çıkarılmasından sonra yanıtlarda kalan aşırı yeni satırlar düzeltildi (#626) -**Proxy Geri Dönüşü:**SOCKS5 geçişi başarısız olduğunda proxy olmadan otomatik yeniden deneme eklendi -**Proxy Testi:**Test uç noktası artık proxyId aracılığıyla veritabanından gelen gerçek kimlik bilgilerini çözüyor### ✨ New Features

-**Oyun Alanı Hesabı/Anahtar Seçici:**Test için belirli sağlayıcı hesaplarını/anahtarlarını seçmek için kalıcı, her zaman görünür açılır menü — başlangıçta tüm bağlantıları getirir ve seçilen sağlayıcıya göre filtreler -**CLI Araçları Dinamik Modeller:**Model seçimi artık dinamik olarak `/v1/models` API'sinden getiriliyor — Kiro gibi sağlayıcılar artık tam model kataloğunu gösteriyor -**Yerçekimine Karşı Model Listesi:**Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini ile güncellendi; Dinamik model erişimi için "passthroughModels" etkinleştirildi (#628)### 🔧 Maintenance

- Birleştirilmiş PR #625 — Sağlayıcı Sınırları ışık modu arka plan düzeltmesi---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Limitler/Proxy:**SOCKS5 proxy'lerinin arkasındaki hesaplar için kodeks limitinin getirilmesi düzeltildi — belirteç yenileme artık proxy bağlamı içinde çalışıyor -**CI:**Sağlayıcı bağlantıları olmayan CI ortamlarında entegrasyon testi "v1/models" onaylama hatası düzeltildi -**Ayarlar:**Proxy testi düğmesi artık başarı/başarısızlık sonuçlarını anında gösteriyor (daha önce sağlık verilerinin arkasında gizliydi)### ✨ New Features

-**Oyun Alanı:**Hesap seçici açılır menüsü eklendi — bir sağlayıcının birden fazla hesabı olduğunda belirli bağlantıları ayrı ayrı test edin### 🔧 Maintenance

- Birleştirilmiş PR #623 — LongCat API temel URL yolu düzeltmesi---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Kullanıcı Arayüzü Sınırlamaları:**Özel etiketlere sahip hesapların görsel organizasyonunu iyileştirmek için bağlantı kontrol paneline etiket gruplandırma özelliği eklendi.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Akış:**SSE'nin çıktının çokbaytlı karakterlerle eşleşmesine neden olan "sanitize" TransformStream içindeki "TextDecoder" durumu bozulması düzeltildi (PR #614) -**Sağlayıcı Kullanıcı Arayüzü:**`dangerouslySetInnerHTML`yi kullanarak sağlayıcı bağlantı hatası ipuçları içindeki HTML etiketlerini güvenli bir şekilde oluşturun -**Proxy Ayarları:**Kimliği doğrulanmış proxy'lerin Kontrol Panelinden başarıyla doğrulanmasına olanak tanıyan eksik "kullanıcı adı" ve "şifre" veri gövdesi özellikleri eklendi. -**Sağlayıcı API'si:**Bağlı yazılım istisnası, belirteç getirme işlemi başarısız olduğunda API HTTP 500 hatalarını önleyerek "getCodexUsage"a döner---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Otomatik Senkronizasyon Modelleri:**Zamanlanmış bir aralık planlayıcı kullanarak sağlayıcı başına model listelerini otomatik olarak senkronize etmek için bir kullanıcı arayüzü geçişi ve "modelleri senkronize etme" uç noktası eklendi (PR #597)### 🐛 Bug Fixes

-**Zaman aşımları:**İstekleri iptal etmeden derin muhakeme modellerini (o1 gibi) düzgün bir şekilde desteklemek için varsayılan proxy'ler "FETCH_TIMEOUT_MS" ve "STREAM_IDLE_TIMEOUT_MS" 10 dakikaya yükseltildi (Düzeltme #609) -**CLI Aracı Algılama:**NVM yollarını, Windows `PATHEXT` (`.cmd` sarmalayıcı sorununu önler) ve özel NPM öneklerini (PR #598) işleyen iyileştirilmiş platformlar arası algılama -**Akış Günlükleri:**İşlev çağrılarının veritabanında doğru bir şekilde izlenmesi ve sürdürülmesi için akış yanıt günlüklerine "tool_calls" delta birikimi uygulandı (PR #603) -**Model Kataloğu:**Hiçbir sağlayıcı açıkça yapılandırılmadığında "comfyui" ve "sdwebui" modelleri düzgün bir şekilde gizlenerek kimlik doğrulama muafiyeti kaldırıldı (PR #599)### 🌐 Translations

-**cs:**Uygulama genelinde iyileştirilmiş Çekçe çeviri dizeleri (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Veritabanı şeması geçişlerine gerek kalmadan "EditConnectionModal"a ("providerSpecificData.tag"da saklanır) bir Etiket/Grup alanı eklendi.
- Sağlayıcı görünümündeki bağlantılar artık görsel bölücülerle dinamik olarak etikete göre gruplandırılıyor.
- Etiketsiz bağlantılar ilk önce başlık olmadan görünür, ardından etiketli gruplar alfabetik sırayla görüntülenir.
- Bağlantı satırlarının içinde geçişler mevcut olduğundan etiket gruplaması Codex/Yardımcı Pilot/AntiYerçekimi Sınırları bölümüne otomatik olarak uygulanır.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Bağlantı kartlarında eksik işaretler:**Statik eşleme yerine "resolveProxyForConnection()" kullanılarak düzeltildi. -**Kayıtlı modda Test Bağlantısı devre dışı bırakıldı:**Kaydedilen listeden proxy yapılandırmasını çözümleyerek Test düğmesini etkinleştirdi. -**Kipsel dondurma yapılandırması:**Kullanıcı arayüzünün donmasını önlemek için kaydet/temizledikten sonra `onClose()` çağrıları eklendi. -**Çift kullanım sayımı:**'ProxyRegistryManager' artık 'scope' + 'scopeId' ile tekilleştirme ile kullanımı montajda hızlı bir şekilde yüklüyor. Kullanım sayıları, satır içi IP/gecikme süresini görüntüleyen bir Test düğmesiyle değiştirildi.#### fix(translator): `function_call` prefix stripping

- PR #607'de, yalnızca "tool*use" bloklarının Claude'un "proxy*" araç önekini çıkardığı tamamlanmamış bir düzeltme onarıldı. Artık OpenAI Responses API formatını kullanan istemciler, araç araçlarını "proxy\_" öneki olmadan da doğru şekilde alacak.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

V3.0.0 lansmanından sonra kullanıcılar tarafından bildirilen üç kritik gerileme çözüldü.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Claude OAuth tarafından eklenen "proxy\_" öneki yalnızca**akış**yanıtlarından çıkarıldı.**akış dışı**modunda, "translateNonStreamingResponse"un "toolNameMap"e erişimi yoktu, bu da istemcilerin "read_file" yerine "proxy_read_file" gibi karışık araç adları almasına neden oluyordu.

**Düzeltme:**"translateNonStreamingResponse"a isteğe bağlı "toolNameMap" parametresi eklendi ve Claude "tool_use" blok işleyicisinde önek ayırma uygulandı. 'chatCore.ts' artık haritayı aktarıyor.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI, 'GET /v1/models'i açığa çıkarmaz. Genel "validateOpenAICompatibleProvider" doğrulayıcı, yalnızca LongCat'in yapılandırmadığı "validationModelId" ayarlanmışsa sohbet tamamlama geri dönüşüne düştü. Bu, sağlayıcı doğrulamasının ekleme/kaydetme sırasında yanıltıcı bir hatayla başarısız olmasına neden oldu.

**Düzeltme:**Özel doğrulayıcılar haritasına "longcat" eklendi, "/chat/tamamlamalar" doğrudan araştırılıyor ve kimlik doğrulaması olmayan yanıtlar geçiş olarak değerlendiriliyor.#### fix(translator): normalize object tool schemas for Anthropic (#595)

MCP araçları (ör. "pencil", "computer_use") araç tanımlarını "{type:"object"}" ile ancak "properties" alanı olmadan iletir. Anthropic'in API'si bunları şu şekilde reddediyor: 'nesne şeması eksik özellikler'.

**Düzeltme:**`openai-to-claude.ts`de, `type` `object` olduğunda ve `properties` bulunmadığında güvenli varsayılan olarak `properties: {}`ı enjekte edin.---

### 🔀 Community PRs Merged (2)

| halkla ilişkiler | Yazar   | Özet                                                                                       |
| ---------------- | ------- | ------------------------------------------------------------------------------------------ | --- |
| **#589**         | @flobo3 | docs(i18n): Oyun Alanı ve Test Alanı için Rusça çeviriyi düzeltin                          |
| **#591**         | @rdself | düzeltme(ui): Sağlayıcı Sınırlarını iyileştirin ışık modu kontrastı ve plan katmanı ekranı | --- |

### ✅ Issues Resolved

`#592``#595``#605`---

### 🧪 Tests

-**926 test, 0 hata**(v3.0.0'dan farklı değil)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Şimdiye kadarki en büyük sürüm.**V2.9.5'teki 36 sağlayıcıdan v3.0.0'daki**67+ sağlayıcıya**kadar — MCP Sunucusu, A2A Protokolü, otomatik birleşik motor, Sağlayıcı Simgeleri, Kayıtlı Anahtarlar API'si, 926 test ve**10 birleştirilmiş PR'de\*\***12 topluluk üyesinin\*\*katkılarıyla.
>
> v3.0.0-rc.1'den rc.17'ye kadar birleştirildi (3 günlük yoğun geliştirme sürecinde 17 sürüm adayı).---

### 🆕 New Providers (+31 since v2.9.5)

| Sağlayıcı                       | Takma Ad       | Seviye                     | Notlar                                                                                          |
| ------------------------------- | -------------- | -------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **OpenCode Zen**                | 'açık kod-zen' | Ücretsiz                   | `opencode.ai/zen/v1` aracılığıyla 3 model (PR #530, @kang-heewon)                               |
| **OpenCode'a Git**              | 'opencode-go'  | Ücretli                    | `opencode.ai/zen/go/v1` aracılığıyla 4 model (PR #530, @kang-heewon)                            |
| **LongCat AI**                  | 'lc'           | Ücretsiz                   | Herkese açık beta sırasında günde 50 milyon token (Flash-Lite) + günde 500 bin (Sohbet/Düşünme) |
| **Tozlaşma AI**                 | 'pol'          | Ücretsiz                   | API anahtarına gerek yok — GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 istek/15s)            |
| **Cloudflare Çalışanları AI**   | 'bkz.'         | Ücretsiz                   | 10.000 Nöron/gün — ~150 LLM yanıtı veya 500 sn Fısıltı sesi, uç çıkarım                         |
| **Scaleway AI**                 | 'scw'          | Ücretsiz                   | Yeni hesaplar için 1 milyon ücretsiz jeton — AB/GDPR uyumlu (Paris)                             |
| **AI/ML API'si**                | 'amaç'         | Ücretsiz                   | 0,025 USD/gün ücretsiz kredi — tek uç nokta aracılığıyla 200'den fazla model                    |
| **Bilgisayar AI**               | 'pu'           | Ücretsiz                   | 500'den fazla model (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                   |
| **Alibaba Bulutu (DashScope)**  | 'ali'          | Ücretli                    | Uluslararası + 'alicode'/'alicode-intl' yoluyla Çin uç noktaları                                |
| **Alibaba Kodlama Planı**       | 'bcp'          | Ücretli                    | Antropik uyumlu API'ye sahip Alibaba Model Studio                                               |
| **Kimi Kodlama (API Anahtarı)** | `kmca`         | Ücretli                    | Özel API anahtarı tabanlı Kimi erişimi (OAuth'tan ayrı)                                         |
| **MiniMax Kodlama**             | 'minimaks'     | Ücretli                    | Uluslararası uç nokta                                                                           |
| **MiniMax (Çin)**               | 'minimax-cn'   | Ücretli                    | Çin'e özgü uç nokta                                                                             |
| **Z.AI (GLM-5)**                | 'zai'          | Ücretli                    | Zhipu AI yeni nesil GLM modelleri                                                               |
| **Vertex AI**                   | 'köşe'         | Ücretli                    | Google Cloud — Hizmet Hesabı JSON veya OAuth erişim_token                                       |
| **Ollama Bulut**                | 'ollamacloud'  | Ücretli                    | Ollama'nın barındırılan API hizmeti                                                             |
| **Sentetik**                    | 'sentetik'     | Ücretli                    | Geçiş modelleri ağ geçidi                                                                       |
| **Kilo Ağ Geçidi**              | 'kg'           | Ücretli                    | Geçiş modelleri ağ geçidi                                                                       |
| **Şaşkınlık Arama**             | 'pplx-arama'   | Ücretli                    | Özel aramaya dayalı uç nokta                                                                    |
| **Serper Arama**                | `serper-arama' | Ücretli                    | Web arama API entegrasyonu                                                                      |
| **Cesur Arama**                 | 'cesur arama'  | Ücretli                    | Cesur Arama API entegrasyonu                                                                    |
| **Örnek Arama**                 | 'exa-arama'    | Ücretli                    | Sinirsel arama API entegrasyonu                                                                 |
| **Tavily Arama**                | 'tavily-arama' | Ücretli                    | AI arama API entegrasyonu                                                                       |
| **NanoMuz**                     | 'nb'           | Ücretli                    | Görüntü oluşturma API'si                                                                        |
| **ElevenLabs**                  | 'el'           | Ücretli                    | Metinden konuşmaya ses sentezi                                                                  |
| **Kartezya**                    | 'kartezya'     | Ücretli                    | Ultra hızlı TTS ses sentezi                                                                     |
| **HT'yi Oynat**                 | 'oynat'        | Ücretli                    | Ses klonlama ve TTS                                                                             |
| **Dünyada**                     | 'dünyada'      | Ücretli                    | AI karakter sesli sohbeti                                                                       |
| **SD WebUI**                    | 'sdwebui'      | Kendi kendine barındırılan | Kararlı Yayılım yerel görüntü üretimi                                                           |
| **Rahat kullanıcı arayüzü**     | 'rahat'        | Kendi kendine barındırılan | ComfyUI yerel iş akışı düğüm tabanlı oluşturma                                                  |
| **GLM Kodlaması**               | glm            | Ücretli                    | BigModel/Zhipu kodlamaya özgü uç nokta                                                          | **Toplam: 67+ sağlayıcı**(4 Ücretsiz, 8 OAuth, 55 API Anahtarı) + sınırsız OpenAI/Antropik Uyumlu özel sağlayıcılar.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Sağlayıcı başına ve hesap başına kota uygulamasıyla OmniRoute API anahtarlarını programlı bir şekilde otomatik olarak oluşturun ve yayınlayın.

| Uç nokta                        | Yöntem    | Açıklama                                                           |
| ------------------------------- | --------- | ------------------------------------------------------------------ |
| `/api/v1/kayıtlı anahtarlar`    | 'GÖNDERİ' | Yeni bir anahtar verin — ham anahtar**yalnızca bir kez**döndürüldü |
| `/api/v1/kayıtlı anahtarlar`    | 'AL'      | Kayıtlı anahtarları listele (maskeli)                              |
| `/api/v1/registered-keys/{id}`  | 'AL/SİL'  | Meta verileri al / İptal Et                                        |
| `/api/v1/quotas/check`          | 'AL'      | Kotayı yayınlamadan önce ön doğrulama yapın                        |
| `/api/v1/providers/{id}/limits` | 'AL/PUT'  | Sağlayıcı başına düzenleme limitlerini yapılandırın                |
| `/api/v1/accounts/{id}/limits`  | 'AL/PUT'  | Hesap bazında düzenleme limitlerini yapılandırın                   |
| `/api/v1/issues/report`         | 'GÖNDERİ' | Kota olaylarını GitHub'a bildirme Sorunları                        |

**Güvenlik:**SHA-256 karmaları olarak depolanan anahtarlar. Ham anahtar oluşturma sırasında bir kez gösterilir ve bir daha asla alınamaz.#### 🎨 Provider Icons via @lobehub/icons (#529)

`@lobehub/icons` React bileşenlerini (SVG) kullanan 130'dan fazla sağlayıcı logosu. Geri dönüş zinciri:**Lobehub SVG → mevcut PNG → genel simge**. Standartlaştırılmış 'ProviderIcon' bileşeniyle Kontrol Paneli, Sağlayıcılar ve Aracılar sayfalarında uygulanır.#### 🔄 Model Auto-Sync Scheduler (#488)

Bağlı sağlayıcıların model listelerini her**24 saatte**otomatik olarak yeniler. Sunucu başlangıcında çalışır. 'MODEL_SYNC_INTERVAL_HOURS' aracılığıyla yapılandırılabilir.#### 🔀 Per-Model Combo Routing (#563)

Otomatik yönlendirme için model adı modellerini (glob) belirli kombinasyonlarla eşleyin:

- `claude-sonnet*` → kod birleşimi, `gpt-4o*` → openai-kombo, `gemini-*` → google-kombo
- Glob-regex eşleşmesine sahip yeni "model_combo_mappings" tablosu
- Kontrol Paneli Kullanıcı Arayüzü bölümü: Satır içi ekleme/düzenleme/geçiş/silme ile "Model Yönlendirme Kuralları"#### 🧭 API Endpoints Dashboard

Etkileşimli katalog, web kancaları yönetimi, OpenAPI görüntüleyici — hepsi "/dashboard/endpoint" adresindeki sekmeli sayfada.#### 🔍 Web Search Providers

5 yeni arama sağlayıcı entegrasyonu:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**— gerçek zamanlı web verileriyle temelli yapay zeka yanıtlarına olanak tanır.#### 📊 Search Analytics

/ Dashboard/analytics'te yeni sekme — sağlayıcı dökümü, önbellek isabet oranı, maliyet takibi. API: 'GET /api/v1/search/analytics'.#### 🛡️ Per-API-Key Rate Limits (#452)

HTTP 429 döndüren bellek içi kayan pencere uygulamasına sahip "max_requests_per_day" ve "max_requests_per_minute" sütunları.#### 🎵 Media Playground

`/dashboard/media`da tam medya oluşturma oyun alanı: Görüntü Oluşturma, Video, Müzik, Ses Transkripsiyon (2 GB yükleme sınırı) ve Metinden Konuşmaya.---

### 🔒 Security & CI/CD

-**CodeQL düzeltmesi**— 10'dan fazla uyarı düzeltildi: 6 polinom yinelemesi, 1 güvensiz rastgelelik (`Math.random()` → `crypto.randomUUID()`), 1 kabuk komutu enjeksiyonu -**Rota doğrulama**— Zod şemaları +**176/176 API rotalarında**`validateBody()` — CI zorunlu kılındı -**CVE düzeltmesi**— npm geçersiz kılmaları yoluyla çözülen XSS güvenlik açığını (GHSA-v2wj-7wpq-c8vv) arındırma -**Düzleştirilmiş**— Çarpılmış 3.3.3 → 3.4.2 (CWE-1321 prototip kirliliği) -**Docker**— Yükseltilmiş "docker/setup-buildx-action" v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: Docker'da "GEMINI_OAUTH_CLIENT_SECRET" eksik olduğunda işlem yapılabilir hatayı temizle -**#549**— CLI ayarları rotaları artık gerçek API anahtarını "keyId"den çözüyor (maskeli dizeler değil) -**#574**— Sihirbaz parolası kurulumu atlandıktan sonra oturum açma işlemi artık donmuyor -**#506**— Platformlar arası "machineId" yeniden yazıldı (Windows REG.exe → macOS ioreg → Linux → ana bilgisayar adı geri dönüşü)#### Providers & Routing

-**#536**— LongCat AI: 'baseUrl' ve 'authHeader' düzeltildi -**#535**— Sabitlenmiş modeli geçersiz kılma: "body.model" doğru şekilde "pinnedModel" olarak ayarlandı -**#570**— Öneksiz Claude modelleri artık Antropik sağlayıcıya çözümleniyor -**#585**— `<omniModel>` dahili etiketleri artık SSE akışında istemcilere sızdırılmıyor -**#493**— Özel sağlayıcı model adlandırması artık önek çıkarma nedeniyle karıştırılmıyor -**#490**— "TransformStream" enjeksiyonu aracılığıyla akış + içerik önbellek koruması -**#511**— İlk içerik öbeğine "<omniModel>" etiketi eklendi ('[DONE]'dan sonra değil)#### CLI & Tools

-**#527**— Claude Code + Codex döngüsü: "tool_result" blokları artık metne dönüştürülüyor -**#524**— OpenCode yapılandırması doğru şekilde kaydedildi (XDG_CONFIG_HOME, TOML biçimi) -**#522**— API Yöneticisi: yanıltıcı "Maskeli anahtarı kopyala" düğmesi kaldırıldı -**#546**— Windows'ta "bilinmeyen" sonucunu döndüren "--version" (PR by @k0valik) -**#544**— Bilinen kurulum yolları aracılığıyla güvenli CLI aracı tespiti (@k0valik tarafından PR) -**#510**— Windows MSYS2/Git-Bash yolları otomatik olarak normalleştirildi -**#492**— CLI, 'app/server.js' eksik olduğunda 'mise'/'nvm' tarafından yönetilen Düğümü algılar#### Streaming & SSE

-**PR #587**— Revert `resolveDataDir` import in responsesTransformer for Cloudflare Workers compat (@k0valik) -**PR #495**— Darboğaz 429 sonsuz bekleme: hız sınırında bekleyen işleri bırakın (@xandr0s) -**#483**— "[DONE]" sinyalinden sonra "data: null" ifadesini izlemeyi durdur -**#473**— Zombi SSE akışları: Daha hızlı geri dönüş için zaman aşımı 300 saniye → 120 saniyeye düşürüldü#### Media & Transcription

-**Transkripsiyon**— Deepgram `video/mp4` → `audio/mp4` MIME eşleme, otomatik dil algılama, noktalama işaretleri -**TTS**— ElevenLabs tarzı iç içe geçmiş hatalar için "[object Object]" hata ekranı düzeltildi -**Yükleme sınırları**— Medya transkripsiyonu 2 GB'a yükseltildi (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— çağrı günlüklerindeki "requested_model" sütunu (geçiş 009) -**T02**— İç içe geçmiş `tool_result.content` öğesinden boş metin bloklarını çıkarın -**T03**— "x-codex-5h-_" / "x-codex-7d-_" kota başlıklarını ayrıştırın -**T04**— Harici yapışkan yönlendirme için "X-Session-Id" başlığı -**T05**— Özel API ile hız limitli veritabanı kalıcılığı -**T06**— Hesap devre dışı bırakıldı → kalıcı engelleme (1 yıllık bekleme süresi) -**T07**— X-İletilmiş-IP doğrulaması için (`extractClientIp()`) -**T08**— Kayan pencere uygulamasıyla API anahtarı başına oturum sınırları -**T09**— Codex ve Spark hız sınırı kapsamları (ayrı havuzlar) -**T10**— Krediler tükendi → belirgin 1 saatlik bekleme süresi geri dönüşü -**T11**— 'maksimum' akıl yürütme çabası → 131072 bütçe belirteci -**T12**— MiniMax M2.7 fiyatlandırma girişleri -**T13**— Eski kota ekranı düzeltmesi (pencere farkındalığını sıfırlama) -**T14**— Proxy hızlı başarısız TCP kontrolü (≤2 sn, önbelleğe alınmış 30 sn) -**T15**— Antropik için dizi içeriği normalleştirmesi -**T23**— Akıllı kota sıfırlama geri dönüşü (başlık çıkarma) -**T24**— '503' bekleme süresi + '406' eşlemesi -**T25**— Sağlayıcı doğrulama yedeği -**T29**— Vertex AI Hizmet Hesabı JWT kimlik doğrulaması -**T33**— Bütçe dönüşümüne yönelik düşünme düzeyi -**T36**— '403' ve '429' hata sınıflandırması -**T38**— Merkezi model özellikleri (`modelSpecs.ts`) -**T39**— "fetchAvailableModels" için uç nokta geri dönüşü -**T41**— Arka plan görevinin flaş modellerine otomatik olarak yönlendirilmesi -**T42**— Görüntü oluşturma en boy oranı eşlemesi#### Other Improvements

-**Model başına yukarı akış özel başlıkları**— yapılandırma kullanıcı arayüzü aracılığıyla (PR #575, @zhangqiang8vip) -**Model bağlam uzunluğu**— model meta verilerinde yapılandırılabilir (PR #578 by @hijak) -**Model öneki çıkarma**— model adlarından sağlayıcı önekini kaldırma seçeneği (PR #582 by @jay77721) -**Gemini CLI'nin kullanımdan kaldırılması**— Google OAuth kısıtlama uyarısıyla kullanımdan kaldırıldı olarak işaretlendi -**YAML ayrıştırıcı**— doğru OpenAPI spesifikasyon ayrıştırması için özel ayrıştırıcıyı "js-yaml" ile değiştirdi -**ZWS v5**— HMR sızıntısı düzeltmesi (485 DB bağlantısı → 1, bellek 2,4 GB → 195 MB) -**Günlüğü dışa aktarma**— Kontrol panelinde, zaman aralığı açılır menüsüne sahip yeni JSON dışa aktarma düğmesi -**Güncelleme bildirim başlığı**— yeni sürümler mevcut olduğunda kontrol paneli ana sayfası gösterilir---

### 🌐 i18n & Documentation

- %100 eşlikte**30 dil**— 2.788 eksik anahtar senkronize edildi -**Çekçe**— Tam çeviri: 22 belge, 2.606 kullanıcı arayüzü dizesi (@zen0bit tarafından PR) -**Çince (zh-CN)**— Tam yeniden çeviri (PR @only4copilot tarafından) -**VM Dağıtım Kılavuzu**— Kaynak belge olarak İngilizce'ye çevrildi -**API Referansı**— "/v1/embeddings" ve "/v1/audio/speech" uç noktaları eklendi -**Sağlayıcı sayısı**— README ve 30 i18n README'nin tamamında 36+/40+/44+'dan**67+**'ye güncellendi---

### 🔀 Community PRs Merged (10)

| halkla ilişkiler | Yazar           | Özet                                                                                           |
| ---------------- | --------------- | ---------------------------------------------------------------------------------------------- |
| **#587**         | @k0valik        | düzeltme (sse): Cloudflare Workers uyumluluğu için çözümVeriDir içe aktarma işlemini geri alma |
| **#582**         | @jay77721       | feat(proxy): model adı öneki çıkarma seçeneği                                                  |
| **#581**         | @jay77721       | düzeltme(npm): elektron salınımını npm-yayınlama iş akışına bağlayın                           |
| **#578**         | @hijak          | feat: model meta verilerinde yapılandırılabilir bağlam uzunluğu                                |
| **#575**         | @zhangqiang8vip | feat: model başına yukarı akış başlıkları, PATCH uyumluluğu, sohbet hizalaması                 |
| **#562**         | @coobabm        | düzeltme: MCP oturum yönetimi, Claude geçişi, tespitFormat                                     |
| **#561**         | @zen0bit        | düzeltme(i18n): Çekçe çeviri düzeltmeleri                                                      |
| **#555**         | @k0valik        | düzeltme(sse): yol çözümlemesi için merkezi `resolveDataDir()`                                 |
| **#546**         | @k0valik        | düzeltme(cli): Windows'ta 'bilinmeyen' döndüren `--version`                                    |
| **#544**         | @k0valik        | düzeltme(cli): kurulum yolları aracılığıyla güvenli CLI aracı tespiti                          |
| **#542**         | @rdself         | düzeltme(ui): ışık modu kontrastı CSS tema değişkenleri                                        |
| **#530**         | @kang-heewon    | feat: 'OpencodeExecutor' ile OpenCode Zen + Go sağlayıcıları                                   |
| **#512**         | @zhangqiang8vip | feat: protokol başına model uyumluluğu (`compatByProtocol`)                                    |
| **#497**         | @zhangqiang8vip | düzeltme: geliştirme modu HMR kaynak sızıntıları (ZWS v5)                                      |
| **#495**         | @xandr0s        | düzeltme: Darboğaz 429 sonsuz bekleme (bekleyen işleri bırakma)                                |
| **#494**         | @zhangqiang8vip | feat: MiniMax geliştiricisi→sistem rolü düzeltmesi                                             |
| **#480**         | @prakersh       | düzeltme: akış temizleme kullanımı çıkarma                                                     |
| **#479**         | @prakersh       | feat: Codex 5.3/5.4 ve Antropik fiyatlandırma girişleri                                        |
| **#475**         | @only4copilot   | feat(i18n): geliştirilmiş Çince çeviri                                                         |

**Tüm katkıda bulunanlara teşekkür ederiz!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 test, 0 hata**(v2.9.5'te 821 idi)

- +105 yeni test şunları kapsar: model birleşimi eşlemeleri, kayıtlı anahtarlar, OpencodeExecutor, Bailian sağlayıcısı, rota doğrulama, hata sınıflandırması, en boy oranı eşlemesi ve daha fazlası---

### 📦 Database Migrations

| Geçiş   | Açıklama                                                                 |
| ------- | ------------------------------------------------------------------------ | --- |
| **008** | `registered_keys`, `provider_key_limits`, `account_key_limits` tabloları |
| **009** | 'call_logs' içindeki 'requested_model' sütunu                            |
| **010** | model başına birleşik yönlendirme için "model_combo_mappings" tablosu    | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Önemli değişiklikler:**Yok. Mevcut tüm yapılandırmalar, kombinasyonlar ve API anahtarları korunur.
> 008-010 veritabanı geçişleri başlangıçta otomatik olarak yürütülür.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**CodeQL düzeltmesi**— 10'dan fazla uyarı düzeltildi:

- `provider.ts` / `chatCore.ts`de 6 polinom yinelemesi (segment bazlı eşleştirmeyle `(?:^|/)` alternatif kalıpları değiştirildi)
- `acp/manager.ts`de 1 güvensiz rastgelelik (`Math.random()` → `crypto.randomUUID()`)
- `prepublish.mjs`de 1 kabuk komut enjeksiyonu (`JSON.stringify()` yolundan kaçış) -**Rota doğrulama**— Doğrulaması eksik olan 5 rotaya Zod şemaları + `validateBody()` eklendi:
- "model-birleşik-eşlemeler" (POST, PUT), "web kancaları" (POST, PUT), "openapi/try" (POST)
- CI `check:route-validation:t06` artık geçiyor:**176/176 rota doğrulandı**### 🐛 Bug Fixes

-**#585**— `<omniModel>` dahili etiketleri artık SSE yanıtlarında istemcilere sızdırılmıyor. 'Combo.ts' dosyasına giden 'TransformStream' temizleme özelliği eklendi### ⚙️ Infrastructure

-**Docker**— "docker/setup-buildx-action" v3'ten v4'e yükseltildi (Node.js 20 kullanımdan kaldırma düzeltmesi) -**CI temizleme**— 150'den fazla başarısız/iptal edilen iş akışı çalıştırması silindi### 🧪 Tests

- Test paketi:**926 test, 0 hata**(+3 yeni)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Arttırılmış medya transkripsiyon limitleri
- Kayıt defteri meta verilerine Model Bağlam Uzunluğu eklendi
- Yapılandırma kullanıcı arayüzü aracılığıyla model başına yukarı akış özel başlıkları eklendi
- Birden fazla hata düzeltildi, yamalar için Zod doğrulaması yapıldı ve çeşitli topluluk sorunları çözüldü.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Model Başına Kombo Yönlendirme: otomatik yönlendirme için model adı modellerini (glob) belirli kombinasyonlarla eşleştirin

- Desen, açılan_kimlik, öncelik, etkinleştirilmiş yeni "model_combo_mappings" tablosu (geçiş 010)
- `resolveComboForModel()` Glob-regex eşleştirmeli DB işlevi (büyük/küçük harfe duyarlı değil, `*` ve `?` joker karakterleri)
- "model.ts" içindeki "getComboForModel()": model-pattern geri dönüşüyle "getCombo()"yu güçlendirir
- `chat.ts`: yönlendirme kararı artık tek modelin işlenmesinden önce model-kombo eşlemelerini kontrol ediyor
- API: 'GET/POST /api/model-combo-mappings', 'GET/PUT/DELETE /api/model-combo-mappings/:id'
- Kontrol Paneli: Kombinasyonlar sayfasına satır içi ekleme/düzenleme/geçiş/silme ile "Model Yönlendirme Kuralları" bölümü eklendi
- Örnekler: `claude-sonnet*` → kod kombinasyonu, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Tam i18n Senkronizasyonu**: 30 dil dosyasına 2.788 eksik anahtar eklendi — tüm diller artık "en.json" ile %100 eşitlikte -**Acenteler sayfası i18n**: OpenCode Entegrasyonu bölümü tamamen uluslararası hale getirildi (başlık, açıklama, tarama, indirme etiketleri)

- OpenCode bölümü için "aracıların" ad alanına**6 yeni anahtar**eklendi### 🎨 UI/UX

-**Sağlayıcı Simgeleri**: 16 eksik sağlayıcı simgesi eklendi (3 kopyalandı, 2 indirildi, 11 SVG oluşturuldu) -**SVG geri dönüşü**: "ProviderIcon" bileşeni 4 katmanlı stratejiyle güncellendi: Lobehub → PNG → SVG → Genel simge -**Ajanların parmak izi takibi**: CLI araçlarıyla senkronize edildi — parmak izi listesine droid, openclaw, copilot, opencode eklendi (toplam 14)### Güvenlik

-**CVE düzeltmesi**: `dompurify@^3.3.2' zorlamasını geçersiz kılan npm aracılığıyla dompurify XSS güvenlik açığı (GHSA-v2wj-7wpq-c8vv) çözüldü

- `npm denetimi' artık**0 güvenlik açığını**rapor ediyor### 🧪 Tests

- Test paketi:**923 test, 0 hata**(+15 yeni model-birleşik eşleme testi)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| halkla ilişkiler | Yazar    | Özet                                                                                         |
| ---------------- | -------- | -------------------------------------------------------------------------------------------- | ------------ |
| **#562**         | @coobabm | düzeltme(ux): MCP oturum yönetimi, Claude geçiş normalleştirmesi, OAuth modeli, tespitFormat |
| **#561**         | @zen0bit | fix(i18n): Çekçe çeviri düzeltmeleri — HTTP yöntem adları ve belge güncellemeleri            | ### 🧪 Tests |

- Test paketi:**908 test, 0 hata**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**maskeli dizelerin yazılmasını önlemek için CLI ayarları rotalarındaki ('codex-settings', 'droid-settings', 'kilo-settings') 'keyId'den gerçek API anahtarını çözümleyin (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| halkla ilişkiler | Yazar    | Özet                                                                                                                                                                                               |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546**         | @k0valik | düzeltme(cli): Windows'ta `bilinmeyen' döndüren `--version`— ESM içe aktarma yerine`JSON.parse(readFileSync)` kullanın                                                                             |
| **#555**         | @k0valik | düzeltme(sse): kimlik bilgileri, autoCombo, yanıt kaydedici ve istek kaydedicide yol çözümlemesi için merkezi `resolveDataDir()`                                                                   |
| **#544**         | @k0valik | düzeltme(cli): sembolik bağlantı doğrulama, dosya tipi kontrolleri, boyut sınırları, sağlık kontrolünde minimum env ile bilinen kurulum yolları (8 araç) aracılığıyla güvenli CLI aracı algılaması |
| **#542**         | @rdself  | fix(ui): ışık modu kontrastını iyileştirin — eksik CSS tema değişkenlerini ekleyin ("bg-primary", "bg-subtle", "text-primary") ve günlük ayrıntılarında yalnızca koyu renkleri düzeltin            | ### 🔧 Bug Fixes |

-**`cliRuntime.ts`deki TDZ düzeltmesi**— `validateEnvPath`, modül başlangıcında `getExpectedParentPaths()` tarafından başlatılmadan önce kullanıldı. 'ReferenceError' sorununu düzeltmek için bildirimler yeniden düzenlendi. -**Derleme düzeltmeleri**— Turbopack'in Pino'nun dahili çalışan yüklemesini bozmasını önlemek için "serverExternalPackages"e "pino" ve "pino-pretty" eklendi.### 🧪 Tests

- Test paketi:**905 test, 0 hata**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Elektron oluşturma regresyonu: Electron masaüstü paketinde boş ekranlara neden olan Turbopack modülü karma kararsızlığını ortadan kaldırmak için Next.js'nin sürümü "16.1.x"ten "16.0.10"a düşürüldü. -**Birim testi düzeltmeleri**— Son uygulama değişikliklerinden sonra sapan iki eski test iddiası ("nanobanana-image-handler" en boy oranı/çözünürlüğü, "thinking-budget" Gemini "thinkingConfig" alan eşlemesi) düzeltildi. -**#541**— Kurulum karmaşıklığıyla ilgili kullanıcı geri bildirimlerine yanıt verildi; kod değişikliği gerekmez.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Yürütücüsü: Kullanıcı arayüzündeki yapılandırılabilir bölgeler ve otomatik iş ortağı modeli URL oluşturma ile birlikte JWT/Hizmet Hesabı kimlik doğrulamasını yönetmek için "jose" kitaplığı kullanılarak uygulandı. -**T42**— Görüntü oluşturma en boy oranı eşleme: genel OpenAI formatları ("size") için "sizeMapper" mantığı oluşturuldu, yerel "imagen3" işleme eklendi ve eşlenen en boy oranlarını otomatik olarak kullanmak için NanoBanana uç noktaları güncellendi. -**T38**— Merkezi model spesifikasyonları: Model başına limitler ve parametreler için oluşturulan "modelSpecs.ts".### 🔧 Improvements

-**T40**— OpenCode CLI araçları entegrasyonu: yerel "opencode-zen" ve "opencode-go" entegrasyonu önceki PR'de tamamlandı.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— '503' soğuma süresi düzeltmeyi bekliyor + '406' eşlemesi: uygun soğuma aralıklarıyla '406 Kabul Edilemez' ile '503 Hizmet Kullanılamıyor' olarak eşlendi. -**T25**— Sağlayıcı doğrulama geri dönüşü: Belirli bir "validationModelId" mevcut olmadığında standart doğrulama modellerine zarif geri dönüş. -**T36**— "403" ve "429" sağlayıcı işleme iyileştirmesi: donanım izinleri hatalarını ('403') hız sınırlarından ('429') düzgün bir şekilde ayırmak için "errorClassifier.ts" dosyasına çıkarıldı. -**T39**— "fetchAvailableModels" için Uç Nokta Geri Dönüşü: "kaynak" ve "uyarı"yı yansıtacak şekilde üç katmanlı bir mekanizma ('/models' -> '/v1/models' -> yerel genel katalog) + 'list_models_catalog' MCP aracı güncellemeleri uygulandı. -**T33**— Düşünme düzeyinden bütçeye dönüşüm: Niteliksel düşünme düzeylerini kesin bütçe tahsislerine dönüştürür. -**T41**— Arka plan görevi otomatik yönlendirmesi: yoğun arka plan değerlendirme görevlerini otomatik olarak flash/verimli modellere yönlendirir. -**T23**— Akıllı kota sıfırlama geri dönüşü: "x-ratelimit-reset" / "retry-after" başlık değerlerini doğru şekilde çıkarır veya statik bekleme sürelerini eşler.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **V2.9.5'ten yükseltme:**16 sorun çözüldü · 2 topluluk PR'si birleştirildi · 2 yeni sağlayıcı · 7 yeni API uç noktası · 3 yeni özellik · Veritabanı geçişi 008+009 · 832 test başarıyla tamamlandı · 15 sub2api açığı iyileştirmesi (T01–T15 tamamlandı).### 🆕 New Providers

| Sağlayıcı          | Takma Ad       | Seviye   | Notlar                                                               |
| ------------------ | -------------- | -------- | -------------------------------------------------------------------- |
| **OpenCode Zen**   | 'açık kod-zen' | Ücretsiz | `opencode.ai/zen/v1` aracılığıyla 3 model (PR #530, @kang-heewon)    |
| **OpenCode'a Git** | 'opencode-go'  | Ücretli  | `opencode.ai/zen/go/v1` aracılığıyla 4 model (PR #530, @kang-heewon) |

Her iki sağlayıcı da çok formatlı yönlendirmeyle yeni 'OpencodeExecutor'u kullanıyor ("/chat/completions", "/messages", "/responses", "/models/{model}:generateContent").---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Sağlayıcı başına ve hesap başına kota uygulamasıyla OmniRoute API anahtarlarını programlı bir şekilde otomatik olarak oluşturun ve yayınlayın.

| Uç nokta                              | Yöntem    | Açıklama                                                           |
| ------------------------------------- | --------- | ------------------------------------------------------------------ |
| `/api/v1/kayıtlı anahtarlar`          | 'GÖNDERİ' | Yeni bir anahtar verin — ham anahtar**yalnızca bir kez**döndürüldü |
| `/api/v1/kayıtlı anahtarlar`          | 'AL'      | Kayıtlı anahtarları listele (maskeli)                              |
| `/api/v1/registered-keys/{id}`        | 'AL'      | Anahtar meta verileri alın                                         |
| `/api/v1/registered-keys/{id}`        | 'SİL'     | Anahtarı iptal etme                                                |
| `/api/v1/registered-keys/{id}/revoke` | 'GÖNDERİ' | İptal Et (DELETE desteği olmayan istemciler için)                  |
| `/api/v1/quotas/check`                | 'AL'      | Kotayı yayınlamadan önce ön doğrulama yapın                        |
| `/api/v1/providers/{id}/limits`       | 'AL/PUT'  | Sağlayıcı başına düzenleme limitlerini yapılandırın                |
| `/api/v1/accounts/{id}/limits`        | 'AL/PUT'  | Hesap bazında düzenleme limitlerini yapılandırın                   |
| `/api/v1/issues/report`               | 'GÖNDERİ' | Kota olaylarını GitHub'a bildirme Sorunları                        |

**DB — Geçiş 008:**Üç yeni tablo: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Güvenlik:**SHA-256 karmaları olarak depolanan anahtarlar. Ham anahtar oluşturma sırasında bir kez gösterilir ve bir daha asla alınamaz.
**Kota türleri:**Sağlayıcı ve hesap başına `maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit`.
**Idempotency:**`idempotency_key` alanı mükerrer düzenlemeyi önler. Anahtar zaten kullanılmışsa '409 IDEMPOTENCY_CONFLICT' değerini döndürür.
**Anahtar başına bütçe:**`dailyBudget` / `hourlyBudget` — bir anahtarın pencere başına yönlendirebileceği istek sayısını sınırlar.
**GitHub raporlaması:**İsteğe bağlı. Kota aşıldığında veya verme hatalarında GitHub sorunlarını otomatik olarak oluşturmak için `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN` ayarını yapın.#### 🎨 Provider Icons — @lobehub/icons (#529)

Kontrol panelindeki tüm sağlayıcı simgeleri artık `@lobehub/icons` React bileşenlerini kullanıyor (SVG'li 130'dan fazla sağlayıcı).
Geri dönüş zinciri:**Lobehub SVG → mevcut `/providers/{id}.png` → genel simge**. Uygun bir React `ErrorBoundary' modeli kullanır.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute artık bağlı sağlayıcıların model listelerini her**24 saatte**otomatik olarak yeniliyor.

- Mevcut '/api/sync/initialize' kancası aracılığıyla sunucu başlangıcında çalışır
- 'MODEL_SYNC_INTERVAL_HOURS' ortam değişkeni aracılığıyla yapılandırılabilir
- 16 büyük sağlayıcıyı kapsar
- Ayarlar veritabanındaki son senkronizasyon süresini kaydeder---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Docker/kendi kendine barındırılan dağıtımlarda "GEMINI_OAUTH_CLIENT_SECRET" eksik olduğunda işlem yapılabilir hatayı temizleyin. Daha önce Google'dan şifreli "client_secret eksik" gösterilmişti. Artık belirli 'docker-compose.yml' ve '~/.omniroute/.env' talimatlarını sağlıyor.#### Providers & Routing

-**#536 — LongCat AI:**'baseUrl' ('api.longcat.chat/openai') ve 'authHeader' ('Yetkilendirme: Taşıyıcı') düzeltildi. -**#535 — Sabitlenmiş modeli geçersiz kılma:**Bağlam önbellek koruması etkinken "body.model" artık doğru şekilde "pinnedModel" olarak ayarlanıyor. -**#532 — OpenCode Go anahtar doğrulaması:**Artık "zen/v1" test uç noktasını ("testKeyBaseUrl") kullanıyor — aynı anahtar her iki katman için de çalışıyor.#### CLI & Tools

-**#527 — Claude Code + Codex döngüsü:**'tool_result' blokları artık bırakılmak yerine metne dönüştürülüyor ve sonsuz araç-sonuç döngüleri durduruluyor. -**#524 — OpenCode yapılandırma kaydetme:**`saveOpenCodeConfig()' işleyicisi eklendi (XDG_CONFIG_HOME farkında, TOML yazıyor). -**#521 — Oturum açma işlemi sıkıştı:**Oturum açma artık parola ayarlama işlemi atlandıktan sonra donmuyor — katılıma doğru şekilde yönlendiriyor. -**#522 — API Yöneticisi:**Yanıltıcı "Maskeli anahtarı kopyala" düğmesi kaldırıldı (yerini kilit simgesi ipucuyla değiştirdi). -**#532 — OpenCode Go yapılandırması:**Kılavuz ayarları işleyicisi artık "opencode" toolId'yi yönetiyor.#### Developer Experience

-**#489 — Antigravity:**Eksik "googleProjectId", şifreli bir kilitlenme yerine yeniden bağlanma rehberliği içeren yapılandırılmış bir 422 hatası döndürüyor. -**#510 — Windows yolları:**MSYS2/Git-Bash yolları ('/c/Program Files/...') artık otomatik olarak 'C:\Program Files\...' olarak normalleştirildi. -**#492 — CLI başlangıcı:**`omniroute` CLI artık `app/server.js` eksik olduğunda `mise`/`nvm`-yönetilen Düğümü algılıyor ve hedeflenen düzeltme talimatlarını gösteriyor.---

### 📖 Documentation Updates

-**#513**— Docker parolası sıfırlama: `INITIAL_PASSWORD` env var geçici çözümü belgelendi -**#520**— pnpm: `pnpm onayla-daha iyi-sqlite3 oluşturur' adımı belgelendi---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| halkla ilişkiler | Yazar        | Özet                                                                               |
| ---------------- | ------------ | ---------------------------------------------------------------------------------- | --- |
| **#530**         | @kang-heewon | 'OpencodeExecutor' ve geliştirilmiş testlere sahip OpenCode Zen + Go sağlayıcıları | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Hız sınırı veritabanı kalıcılığı: `providers.ts'de `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()`. Mevcut "rate_limited_until" sütunu artık özel bir API olarak kullanıma sunuluyor; hız sınırı döngülerini önlemek için OAuth belirteci yenilemesinin bu alana DOKUNMAMASI gerekir.
-**T08**— API anahtarı başına oturum sınırı: otomatik geçiş yoluyla "api_keys"e "max_sessions INTEGER DEFAULT 0" eklendi. `sessionManager.ts`, `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()`ve`getActiveSessionCountForKey()`kazanır.`chatCore.js`yi arayanlar, `req.close`üzerinde limit ve azalma uygulayabilir.
-**T09**— Codex ve Spark hız sınırı kapsamları:`codex.ts'de `getCodexModelScope()` ve `getCodexRateLimitKey()`. Standart modeller ("gpt-5.x-codex", "codex-mini") "codex" kapsamını alır; spark modelleri (`codex-spark*`) 'spark' kapsamını alır. Hız sınırı anahtarları `${accountId}:${scope}` olmalıdır, böylece bir havuzun tüketilmesi diğerini engellemez. -**T13**— Eski kota ekranı düzeltmesi: "getEffectiveQuotaUsage(used, resetAt)", sıfırlama penceresi geçtiğinde "0" değerini döndürür; `formatResetCountdown(resetAt)`, insanların okuyabileceği bir geri sayım dizesi döndürür (ör. `"2h 35m"`). Her ikisi de kontrol paneli tüketimi için "providers.ts" + "localDb.ts"den dışa aktarıldı. -**T14**— Proxy hızlı başarısızlığı: "isProxyReachable(proxyUrl, timeoutMs=2000)" ile yeni "src/lib/proxyHealth.ts" (TCP kontrolü, 30 saniye zaman aşımı yerine ≤2 saniye), "getCachedProxyHealth()", "invalidateProxyHealth()" ve 'getAllProxyHealthStatuses()'. Sonuçlar varsayılan olarak 30 saniye önbelleğe alınır; 'PROXY_FAST_FAIL_TIMEOUT_MS' / 'PROXY_HEALTH_CACHE_TTL_MS' aracılığıyla yapılandırılabilir.### 🧪 Tests

- Test paketi:**832 test, 0 hata**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— 'call_logs'daki 'requested_model' sütunu (geçiş 009): istemcinin orijinal olarak hangi modeli istediğini ve gerçek yönlendirilen modeli karşılaştırın. Geri dönüş oranı analitiğini etkinleştirir. -**T02**— İç içe yerleştirilmiş "tool_result.content" öğesinden boş metin bloklarını çıkarın: Claude Code araç sonuçlarını zincirlediğinde Antropik 400 hatalarını ("metin içeriği blokları boş olmamalıdır") önler. -**T03**— `x-codex-5h-*` / `x-codex-7d-*` başlıklarını ayrıştırın: `parseCodexQuotaHeaders()` + `getCodexResetTime()` genel 5 dakikalık geri dönüş yerine hassas bekleme süresi planlaması için Codex kota pencerelerini çıkarın. -**T04**— Harici yapışkan yönlendirme için "X-Session-Id" başlığı: "sessionManager.ts" içindeki "extractExternalSessionId()", dahili SHA-256 oturum kimlikleriyle çakışmayı önlemek için "x-session-id" / "x-omniroute-session" başlıklarını "ext:" ön ekiyle okur. Nginx uyumlu (tirelenmiş başlık). -**T06**— Hesap devre dışı bırakıldı → kalıcı engelleme: `accountFallback.ts'deki `isAccountDeactivated()`, 401 devre dışı bırakma sinyalini algılar ve kalıcı olarak ölü hesapların yeniden denenmesini önlemek için 1 yıllık bir bekleme süresi uygular.
-**T07**— X-Forwarded-For IP doğrulaması: "extractClientIp()" ve "getClientIpFromRequest()" ile yeni "src/lib/ipUtils.ts" — "X-Forwarded-For" zincirlerindeki (Nginx/proxy ile iletilen istekler) "bilinmeyen"/IP olmayan girişleri atlar.
-**T10**— Krediler tükendi → ayrı bir geri dönüş: `accountFallback.ts' içindeki `isCreditsExhausted()', genel 429 hız sınırlamasından farklı olarak `creditsExhausted' bayrağıyla 1 saatlik bekleme süresi döndürüyor. -**T11**— `maksimum akıl yürütme çabası → 131072 bütçe belirteci: `EFFORT_BUDGETS`ve`THINKING_LEVEL_MAP` güncellendi; ters eşleme artık tam bütçeli yanıtlar için "maks" değerini döndürüyor. Birim testi güncellendi. -**T12**— MiniMax M2.7 fiyatlandırma girişleri eklendi: fiyatlandırma tablosuna "minimax-m2.7", "MiniMax-M2.7", "minimax-m2.7-highspeed" eklendi (sub2api PR #1120). M2.5/GLM-4.7/GLM-5/Kimi fiyatlandırması zaten mevcuttu. -**T15**— Dizi içeriği normalleştirme: 'openai-to-claude.ts' içindeki 'normalizeContentToString()' yardımcısı, dizi biçimli sistem/araç mesajlarını Anthropic'e göndermeden önce doğru şekilde dizeye daraltır.### 🧪 Tests

- Test paketi:**832 test, 0 hata**(rc.5'ten farklı değil)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— Kayıtlı Anahtar Hazırlama API'si: sağlayıcı başına ve hesap başına kota uygulamasıyla otomatik olarak API anahtarlarını yayınlama

- `POST /api/v1/registered-keys` — idempotency desteğiyle anahtarları yayınlayın
- `GET /api/v1/registered-keys` — kayıtlı anahtarları listele (maskeli)
- `GET /api/v1/registered-keys/{id}` — anahtar meta verilerini al
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — anahtarları iptal et
- `GET /api/v1/quotas/check` — yayınlamadan önce ön doğrulama yapın
- `PUT /api/v1/providers/{id}/limits` — sağlayıcı düzenleme sınırlarını ayarlayın
- `PUT /api/v1/accounts/{id}/limits` — hesap verme sınırlarını ayarlayın
- `POST /api/v1/issues/report` — isteğe bağlı GitHub sorun raporlaması
- Veritabanı geçişi 008: "registered_keys", "provider_key_limits", "account_key_limits" tabloları---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— OpenCode Zen ve OpenCode Go sağlayıcıları eklendi (@kang-heewon tarafından)

- Çok formatlı yönlendirmeye sahip yeni 'OpencodeExecutor' ('/chat/completions', '/messages', '/responses')
- Her iki seviyede de 7 model---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Sağlayıcı simgelerinde artık zarif PNG geri dönüşü ve bir "ProviderIcon" bileşeniyle [@lobehub/icons](https://github.com/lobehub/lobe-icons) kullanılıyor (130'dan fazla sağlayıcı destekleniyor) -**#488**— Model listeleri her 24 saatte bir "modelSyncScheduler" aracılığıyla otomatik güncellenir ('MODEL_SYNC_INTERVAL_HOURS' aracılığıyla yapılandırılabilir)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: Docker/kendi kendine barındırılan dağıtımlarda "GEMINI_OAUTH_CLIENT_SECRET" eksik olduğunda artık net bir şekilde işlem yapılabilir hata gösteriliyor---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— LongCat AI anahtar doğrulaması: baseUrl ('api.longcat.chat/openai') ve authHeader ('Yetkilendirme: Taşıyıcı') düzeltildi -**#535**— Sabitlenmiş modeli geçersiz kılma: Bağlam önbellek koruması sabitlenmiş bir model algıladığında "body.model" artık "pinnedModel" olarak ayarlanıyor -**#524**— OpenCode yapılandırması artık doğru şekilde kaydedildi: `saveOpenCodeConfig()' işleyicisi eklendi (XDG_CONFIG_HOME farkında, TOML yazıyor)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Oturum açma işlemi artık parola ayarlaması atlandıktan sonra takılıp kalmıyor (katılım sürecine yönlendiriyor) -**#522**— API Yöneticisi: Yanıltıcı "Maskeli anahtarı kopyala" düğmesi kaldırıldı (kilit simgesi ipucuyla değiştirildi) -**#527**— Claude Code + Codex süper güçler döngüsü: "tool_result" blokları artık bırakılmak yerine metne dönüştürülüyor -**#532**— OpenCode GO API anahtar doğrulaması artık doğru "zen/v1" uç noktasını ("testKeyBaseUrl") kullanıyor -**#489**— Antigravity: eksik "googleProjectId", yeniden bağlanma kılavuzuyla birlikte yapılandırılmış 422 hatası döndürüyor -**#510**— Windows: MSYS2/Git-Bash yolları ('/c/Program Files/...') artık 'C:\Program Files\...' olarak normalleştirildi -**#492**— "omniroute" CLI artık "app/server.js" eksik olduğunda "mise"/"nvm"yi algılıyor ve hedeflenen düzeltmeyi gösteriyor### Belgeler

-**#513**— Docker parolası sıfırlama: `INITIAL_PASSWORD` env var geçici çözümü belgelendi -**#520**— pnpm: `pnpm onayla-daha iyi-sqlite3 oluşturur'' belgelendi### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Yeni OpenCode sağlayıcıları, kimlik bilgileri düzeltmesi, CLI maskeli anahtar hatası, CACHE_TAG_PATTERN düzeltmesi.### 🐛 Bug Fixes

-**CLI araçları maskelenmiş API anahtarını yapılandırma dosyalarına kaydeder**- "claude-settings", "cline-settings" ve "openclaw-settings" POST rotaları artık bir "keyId" parametresini kabul eder ve diske yazmadan önce gerçek API anahtarını DB'den çözer. "ClaudeToolCard", maskelenmiş görüntüleme dizesi yerine "keyId" gönderecek şekilde güncellendi. #523, #526 düzeltildi. -**Özel yerleştirme sağlayıcıları: "Kimlik bilgisi yok" hatası**— "/v1/embeddings" artık "credentialsProviderId"yi yönlendirme önekinden ayrı olarak izliyor, böylece kimlik bilgileri genel önek dizesi yerine eşleşen sağlayıcı düğüm kimliğinden getiriliyor. 'google/gemini-embedding-001' ve benzeri özel sağlayıcı modellerinin her zaman kimlik bilgisi hatasıyla başarısız olduğu bir gerilemeyi düzeltir. #532 ile ilgili düzeltmeler. (PR #528, @jacob2826) -**Bağlam önbellek koruması normal ifadesini kaçırıyor `
` önek**— `comboAgentMiddleware.ts` içindeki `CACHE_TAG_PATTERN` her iki değişmez değerle eşleşecek şekilde güncellendi `
` (ters eğik çizgi-n) ve `combo.ts` akışının 515 numaralı düzeltmeden sonra `<omniModel>` etiketinin etrafına enjekte ettiği gerçek yeni satır U+000A. #531'i düzeltir.### ✨ New Providers

-**OpenCode Zen**— "opencode.ai/zen/v1" adresinde 3 modelle ücretsiz katmanlı ağ geçidi: "minimax-m2.5-free", "big-pickle", "gpt-5-nano" -**OpenCode Go**— "opencode.ai/zen/go/v1" adresinde 4 modelle abonelik hizmeti: "glm-5", "kimi-k2.5", "minimax-m2.7" (Claude formatı), "minimax-m2.5" (Claude formatı)

- Her iki sağlayıcı da, istenen modele göre dinamik olarak "/chat/completions", "/messages", "/responses" veya "/models/{model}:generateContent"e yönlendiren yeni "OpencodeExecutor"u kullanıyor. (PR #530 @kang-heewon tarafından)---

## [2.9.4] — 2026-03-21

> Sprint: Hata düzeltmeleri — Codex istemi önbellek anahtarını koruyun, tagContent JSON kaçışını düzeltin, süresi dolmuş belirteç durumunu DB ile senkronize edin.### 🐛 Bug Fixes

-**düzeltme(çevirmen)**: Yanıtlar API'sinde `prompt_cache_key'i koru → Sohbet Tamamlamaları çevirisi (#517)
— Alan, Codex tarafından kullanılan bir önbellek benzeşim sinyalidir; onu çıkarmak, hızlı önbellek isabetlerini engelliyordu.
'openai-responses.ts' ve 'responsesApiHelper.ts'de düzeltildi.

-**düzeltme(birleşik)**: Kaçış `
``tagContent`'e enjekte edilen JSON dizesi geçerli (#515)
— JSON dize değerlerinde şablon değişmez yeni satırlarının (U+000A) çıkışsız olarak kullanılmasına izin verilmez.
'open-sse/services/combo.ts' dosyasında '\n' değişmez dizilerle değiştirildi.

-**düzeltme(kullanım)**: Canlı kimlik doğrulama hatası durumunda süresi dolmuş belirteç durumunu tekrar DB'ye senkronize edin (#491)
— Limitler ve Kotalar canlı kontrolü 401/403 değerini döndürdüğünde, "testStatus" bağlantısı artık güncellenir
Sağlayıcılar sayfasının aynı bozulmuş durumu yansıtması için veritabanında "süresi doldu".
'src/app/api/usage/[connectionId]/route.ts' dosyasında düzeltildi.---

## [2.9.3] — 2026-03-21

> Sprint: 5 yeni ücretsiz AI sağlayıcısı ekleyin — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)**: LongCat AI (`lc/`) ekleyin — Herkese açık beta sırasında 50 milyon jeton/gün ücretsiz (Flash-Lite) + 500 bin/gün (Sohbet/Düşünme). OpenAI uyumlu, standart Taşıyıcı kimlik doğrulaması. -**feat(providers/pollinations)**: Pollinations AI (`pol/`) Ekle — API anahtarı gerekmez. Proxy'ler GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 istek/15 saniye ücretsiz). Özel yürütücü isteğe bağlı kimlik doğrulamayı yönetir. -**feat(providers/cloudflare-ai)**: Cloudflare Workers AI (`cf/`) ekleyin — 10.000 Nöron/gün ücretsiz (~150 LLM yanıtı veya 500 sn Whisper sesi). Küresel uçta 50'den fazla model. Özel yürütücü, kimlik bilgilerinden "accountId" ile dinamik URL oluşturur. -**feat(providers/scaleway)**: Scaleway Generative API'lerini ekleyin (`scw/`) — Yeni hesaplar için 1 milyon ücretsiz token. AB/GDPR uyumlu (Paris). Qwen3 235B, Lama 3.1 70B, Mistral Küçük 3.2. -**feat(providers/aimlapi)**: AI/ML API (`aiml/`) ekleyin — tek toplayıcı uç noktası aracılığıyla günlük 0,025 ABD doları ücretsiz kredi, 200'den fazla model (GPT-4o, Claude, Gemini, Llama).### 🔄 Provider Updates

-**feat(providers/together)**: `hasFree: true' + 3 kalıcı olarak ücretsiz model kimliği ekleyin: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free`-**feat(providers/gemini)**:`hasFree: true`+`freeNote` ekleyin (1.500 talep/gün, kredi kartına gerek yok, aistudio.google.com) -**chore(providers/gemini)**: Daha net olması açısından görünen adı "Gemini (Google AI Studio)" olarak yeniden adlandırın### ⚙️ Infrastructure

-**feat(executors/pollinations)**: Yeni `PollinationsExecutor` — API anahtarı sağlanmadığında `Authorization' başlığını atlıyor -**feat(executors/cloudflare-ai)**: Yeni "CloudflareAIExecutor" — dinamik URL oluşturma, sağlayıcı kimlik bilgilerinde "accountId" gerektirir -**feat(executors)**: "pollinations", "pol", "cloudflare-ai", "cf" yürütücü eşlemelerini kaydedin### Belgeler

-**docs(readme)**: Expanded free combo stack to 11 providers ($0 forever) -**docs(benioku)**: Model tablolarıyla birlikte 4 yeni ücretsiz sağlayıcı bölümü (LongCat, Pollinations, Cloudflare AI, Scaleway) eklendi -**belgeler(benioku)**: 4 yeni ücretsiz kullanım satırıyla güncellenmiş fiyatlandırma tablosu -**docs(i18n/pt-BR)**: Fiyat tablosu güncellendi + Portekizce LongCat/Pollinations/Cloudflare AI/Scaleway bölümleri eklendi -**docs(new-features/ai)**: 10 görev spesifikasyonu dosyası + 'docs/new-features/ai/' dosyasında ana uygulama planı### 🧪 Tests

- Test paketi:**821 test, 0 hata**(değişmedi)---

## [2.9.2] — 2026-03-21

> Sprint: Medya transkripsiyonunu (Deepgram/HuggingFace İçerik Türü, dil algılama) ve TTS hata görüntüsünü düzeltin.### 🐛 Bug Fixes

-**düzeltme(transkripsiyon)**: Deepgram ve HuggingFace ses transkripsiyonu artık yeni "resolveAudioContentType()" yardımcısıyla "video/mp4" → "audio/mp4" ve diğer medya MIME türlerini doğru bir şekilde eşliyor. Daha önce, Deepgram 'Content-Type: video/mp4' aldığından ".mp4" dosyalarının yüklenmesi sürekli olarak "Konuşma algılanmadı" sonucunu veriyordu. -**düzeltme(transkripsiyon)**: Deepgram isteklerine `detect_language=true' eklendi — varsayılan olarak İngilizce yerine ses dilini (Portekizce, İspanyolca vb.) otomatik olarak algılar. Boş veya çöp sonuçlar döndüren İngilizce olmayan transkripsiyonları düzeltir.
-**düzeltme(transkripsiyon)**: Doğru noktalama işaretleri ile daha yüksek kalitede transkripsiyon çıktısı için Deepgram isteklerine "punctuate=true" eklendi.
-**düzeltme(tts)**: Hem "audioSpeech.ts" hem de "audioTranscription.ts"de Metinden Konuşmaya yanıtlarındaki "[object Object]" hatası görüntüsü düzeltildi. `upstreamErrorResponse()`işlevi artık düz bir hata dizesi yerine`{ error: { message: "...", status_code: 401 } }` döndüren ElevenLabs gibi sağlayıcılardan iç içe geçmiş dize mesajlarını doğru bir şekilde çıkarıyor.### 🧪 Tests

- Test paketi:**821 test, 0 hata**(değişmedi)### Triaged Issues

-**#508**— Araç çağrısı biçimi regresyonu: istenen proxy günlükleri ve sağlayıcı zinciri bilgisi ("ihtiyaç bilgisi") -**#510**— Windows CLI durum denetimi yolu: istenen kabuk/Düğüm sürüm bilgisi ("bilgiye ihtiyaç var") -**#485**— Kiro MCP aracı çağrıları: harici Kiro sorunu olarak kapatıldı (OmniRoute değil) -**#442**— Baseten /models uç noktası: kapalı (belgelenen manuel geçici çözüm) -**#464**— Anahtar hazırlama API'si: yol haritası öğesi olarak kabul edildi---

## [2.9.1] — 2026-03-21

> Sprint: SSE omniModel veri kaybını düzeltin, protokol bazında model uyumluluğunu birleştirin.### Bug Fixes

-**#511**— Kritik: SSE akışlarında "finish_reason:stop"tan sonra "<omniModel>" etiketi gönderildi ve veri kaybına neden oldu. Etiket artık ilk boş olmayan içerik öbeğine enjekte ediliyor ve böylece SDK'lar bağlantıyı kapatmadan önce teslimat garanti ediliyor.### Merged PRs

-**PR #512**(@zhangqiang8vip): Protokol başına model uyumluluğu — `normalizeToolCallId` ve `preserveOpenAIDeveloperRole` artık istemci protokolüne (OpenAI, Claude, Responses API) göre yapılandırılabilir. Zod doğrulaması ile model yapılandırmasında yeni "compatByProtocol" alanı.### Triaged Issues

-**#510**— Windows CLI healthcheck_failed: istenen PATH/sürüm bilgisi -**#509**— Turbopack Electron regresyonu: yukarı akış Next.js hatası, belgelenmiş geçici çözümler -**#508**— macOS siyah ekranı: önerilen `--disable-gpu` geçici çözümü---

## [2.9.0] — 2026-03-20

> Sprint: Platformlar arası makine kimliği düzeltmesi, API anahtarı başına hız sınırları, akış bağlamı önbelleği, Alibaba DashScope, arama analitiği, ZWS v5 ve 8 sayı kapatıldı.### ✨ New Features

-**feat(search)**: `/dashboard/analytics`te Arama Analizi sekmesi — sağlayıcı dökümü, önbellek isabet oranı, maliyet takibi. Yeni API: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**: Özel uç nokta yolu doğrulamasıyla Alibaba Cloud DashScope eklendi — düğüm başına yapılandırılabilir 'chatPath' ve 'modelsPath' (#feat/custom-endpoint-paths) -**feat(api)**: API anahtarı başına istek sayısı sınırları — HTTP 429 (#452) döndüren bellek içi kayan pencere uygulamasına sahip "max_requests_per_day" ve "max_requests_per_dakika" sütunları -**feat(dev)**: ZWS v5 — HMR sızıntı düzeltmesi (485 DB bağlantısı → 1), bellek 2,4 GB → 195 MB, `globalThis` singleton'ları, Edge Runtime uyarı düzeltmesi (@zhangqiang8vip)### 🐛 Bug Fixes

-**düzeltme(#506)**: Platformlar arası `machineId` — `getMachineIdRaw()` try/catch şelalesi ile yeniden yazıldı (Windows REG.exe → macOS ioreg → Linux dosyası okuma → ana bilgisayar adı → `os.hostname()`). Next.js paketleyicisinin ölü kodu ortadan kaldırdığı "process.platform" dallanmasını ortadan kaldırır ve Windows'ta "kafa"nın tanınmaması sorununu düzeltir. Ayrıca #466'yı da düzeltir. -**düzeltme(#493)**: Özel sağlayıcı modeli adlandırma — 'zai-org/GLM-5-FP8' gibi kuruluş kapsamlı model kimliklerini bozan 'DefaultExecutor.transformRequest()' içindeki hatalı önek ayırma işlemi kaldırıldı. -**düzeltme(#490)**: Akış + bağlam önbellek koruması — "TransformStream", SSE'yi "[DONE]" işaretleyicisinden önce "<omniModel>" etiketini enjekte etmek üzere durdurur ve akış yanıtları için bağlam önbellek korumasını etkinleştirir. -**düzeltme(#458)**: Birleşik şema doğrulaması — `system_message`, `tool_filter_regex`, `context_cache_protection` alanları artık kaydetme sırasında Zod doğrulamasını geçiyor. -**düzeltme(#487)**: KIRO MITM kart temizleme — ZWS_README kaldırıldı, dinamik araç meta verilerini kullanmak için 'AntigravityToolCard' oluşturuldu.### 🧪 Tests

- Antropik formatlı araçlar filtre ünitesi testleri eklendi (PR #397) — ".function" sarmalayıcısı olmayan "tool.name" için 8 regresyon testi
- Test paketi:**821 test, 0 hata**(813'tü)### 📋 Issues Closed (8)

-**#506**— Windows makine kimliği 'başlığı' tanınmıyor (düzeltildi) -**#493**— Özel sağlayıcı modeli adlandırma (sabit) -**#490**— Akış bağlamı önbelleği (sabit) -**#452**— API anahtarı başına istek sınırları (uygulandı) -**#466**— Windows oturum açma hatası (#506 ile aynı temel neden) -**#504**— MITM etkin değil (beklenen davranış) -**#462**— Gemini CLI PSA (çözüldü) -**#434**— Electron uygulamasının çökmesi (#402'nin kopyası)## [2.8.9] — 2026-03-20

> Sprint: Topluluk PR'lerini birleştirin, KIRO MITM kartını düzeltin, bağımlılık güncellemelerini yapın.### Merged PRs

-**PR #498**(@Sajid11194): Windows makine kimliği çökmesini düzeltin ("tanımsız\REG.exe"). 'Düğüm-makine-kimliği'ni yerel işletim sistemi kayıt defteri sorgularıyla değiştirir.**#486'yı kapatır.** -**PR #497**(@zhangqiang8vip): Geliştirme modu HMR kaynak sızıntılarını düzeltin — 485 sızdırılmış veritabanı bağlantısı → 1, bellek 2,4 GB → 195 MB. 'globalThis' singleton'ları, Edge Runtime uyarı düzeltmesi, Windows test kararlılığı. (22 dosyada +1168/-338) -**PR'ler #499-503**(Dependabot): GitHub Eylemleri güncellemeleri — "docker/build-Push-action@7", "actions/checkout@6", "peter-evans/dockerhub-description@5", "docker/setup-qemu-action@4", "docker/login-action@4".### Bug Fixes

-**#505**— KIRO MITM kartı artık Antigravity'ye özel metin yerine araca özel talimatlar (`api.anthropic.com`) görüntülüyor. -**#504**— UX açıklamasıyla yanıt verildi (MITM "Etkin Değil", proxy çalışmadığında beklenen davranıştır).---

## [2.8.8] — 2026-03-20

> Sprint: OAuth toplu testi çökmesini düzeltin, ayrı ayrı sağlayıcı sayfalarına "Tümünü Test Et" düğmesini ekleyin.### Bug Fixes

-**OAuth toplu test hatası**(ERR_CONNECTION_REFUSED): 'Promise.race()' + 'Promise.allSettled()' yoluyla 5 bağlantı eşzamanlılık sınırı + bağlantı başına 30 saniye zaman aşımı ile sıralı for-döngüsü değiştirildi. Büyük OAuth sağlayıcı gruplarını (~30'dan fazla bağlantı) test ederken sunucunun çökmesini önler.### Özellikler

-**Sağlayıcı sayfalarındaki "Tümünü Test Et" düğmesi**: Bireysel sağlayıcı sayfaları (ör. `/providers/codex`) artık 2'den fazla bağlantı olduğunda Bağlantılar başlığında bir "Tümünü Test Et" düğmesi gösteriyor. `{mode: "provider", ProviderId}` ile `POST /api/providers/test-batch` kullanır. Sonuçlar, başarılı/başarısız özeti ve bağlantı başına teşhis içeren bir modda görüntülenir.---

## [2.8.7] — 2026-03-20

> Sprint: PR #495'i birleştir (Darboğaz 429 düşüşü), #496'yı düzelt (özel yerleştirme sağlayıcıları), önceliklendirme özellikleri.### Bug Fixes

-**Darboğaz 429 sonsuz bekleme**(PR #495 @xandr0s tarafından): 429'da, `limiter.stop({ dropWaitingJobs: true })` tüm sıraya alınmış istekleri hemen başarısız kılar, böylece yukarı akış arayanlar geri dönüşü tetikleyebilir. Sınırlayıcı Haritadan silinir, böylece bir sonraki istek yeni bir örnek oluşturur. -**Özel yerleştirme modelleri çözümlenemiyor**(#496): 'POST /v1/embeddings' artık TÜM sağlayıcı_düğümlerinden (yalnızca localhost'tan değil) özel yerleştirme modellerini çözüyor. Kontrol paneli aracılığıyla eklenen 'google/gemini-embedding-001' gibi modelleri etkinleştirir.### Issues Responded

-**#452**— API anahtarı başına istek sayısı sınırları (yol haritasında kabul edildi) -**#464**— API anahtarlarını sağlayıcı/hesap sınırlarıyla birlikte otomatik olarak yayınlayın (daha fazla ayrıntı gerekir) -**#488**— Model listelerini otomatik güncelle (yol haritasında onaylandı) -**#496**— Özel yerleştirme sağlayıcısı çözünürlüğü (sabit)---

## [2.8.6] — 2026-03-20

> Sprint: PR #494'ü birleştir (MiniMax rol düzeltmesi), KIRO MITM kontrol panelini düzeltin, 8 sorunu önceliklendirin.### Özellikler

-**MiniMax geliştirici→sistem rolü düzeltmesi**(@zhangqiang8vip tarafından yazılan PR #494): Model başına 'preserveDeveloperRole' geçişi. Sağlayıcılar sayfasına "Uyumluluk" kullanıcı arayüzünü ekler. MiniMax ve benzeri ağ geçitleri için 422 "rol parametre hatası" düzeltildi. -**roleNormalizer**: `normalizeDeveloperRole()` artık üç durumlu davranışa sahip `preserveDeveloperRole` parametresini kabul ediyor (tanımsız=keep, true=keep, false=convert). -**DB**: "models.ts" dosyasında yeni "getModelPreserveOpenAIDeveloperRole()" ve "mergeModelCompatOverride()".### Bug Fixes

-**KIRO MITM kontrol paneli**(#481/#487): 'CLIToolsPageClient' artık herhangi bir 'configType: "mitm" aracını "AntigravityToolCard"a (MITM Başlat/Durdur kontrolleri) yönlendiriyor. Daha önce yalnızca Antigravity sabit kodlanmıştı. -**AntigravityToolCard jenerik**: Sabit kodlanmış Antigravity değerleri yerine `tool.image`, `tool.description`, `tool.id`yi kullanır. Eksik 'defaultModels'a karşı koruma sağlar.### Cleanup

- `ZWS_README_V2.md` kaldırıldı (PR #494'ten yalnızca geliştirme amaçlı belgeler).### Issues Triaged (8)

-**#487**— Kapalı (KIRO MITM bu sürümde düzeltildi) -**#486**— bilgi ihtiyacı (Windows REG.exe PATH sorunu) -**#489**— bilgi ihtiyacı (Antigravity proje kimliği eksik, OAuth'un yeniden bağlanması gerekiyor) -**#492**— bilgi ihtiyacı (yanlış yönetilen Düğümde app/server.js eksik) -**#490**— Onaylandı (akış + bağlam önbelleği engelleme, düzeltme planlandı) -**#491**— Onaylandı (Kodeks kimlik doğrulama durumu tutarsızlığı) -**#493**— Onaylandı (Kip sağlayıcı model adı öneki, geçici çözüm sağlandı) -**#488**— Özellik isteği biriktirme listesi (model listelerini otomatik güncelleme)---

## [2.8.5] — 2026-03-19

> Sprint: Zombi SSE akışlarını, ilk dönüşte bağlam önbelleğini, KIRO MITM'i düzeltin ve 5 harici sorunun önceliklendirilmesini yapın.### Bug Fixes

-**Zombi SSE Akışları**(#473): Sağlayıcılar akışın ortasında kilitlendiğinde daha hızlı birleşik geri dönüş için `STREAM_IDLE_TIMEOUT_MS`yi 300 saniyeden 120 saniyeye düşürün. env var aracılığıyla yapılandırılabilir. -**Bağlam Önbellek Etiketi**(#474): İlk dönüş isteklerini işlemek için "injectModelTag()" sorununu düzeltin (yardımcı mesaj yok) — bağlam önbellek koruması artık ilk yanıttan itibaren çalışıyor. -**KIRO MITM**(#481): Kontrol panelinin MITM Başlat/Durdur kontrollerini oluşturması için KIRO `configType'ı 'guide' → 'mitm' olarak değiştirin. -**E2E Testi**(CI): 'providers-bailian-coding-plan.spec.ts' sorununu düzeltin — API Anahtarı Ekle düğmesini tıklamadan önce önceden var olan mod katmanını kapatın.### Closed Issues

- #473 — Zombi SSE akışları kombo geri dönüşü atlıyor
- #474 — Bağlam önbelleği "<omniModel>" etiketi ilk dönüşte eksik
- #481 — KIRO için MITM kontrol panelinden etkinleştirilemiyor
- #468 — Gemini CLI uzak sunucusu (#462'nin kullanımdan kaldırılmasıyla değiştirildi)
- #438 — Claude dosyaları yazamıyor (harici CLI sorunu)
- #439 — AppImage çalışmıyor (belgelenmiş libfuse2 geçici çözümü)
- #402 — ARM64 DMG "hasarlı" (belgelenmiş xattr -cr geçici çözümü)
- #460 — CLI Windows'ta çalıştırılamaz (belgelenen PATH düzeltmesi)---

## [2.8.4] — 2026-03-19

> Sprint: Gemini CLI'nin kullanımdan kaldırılması, VM kılavuzu i18n düzeltmesi, Dependabot güvenlik düzeltmesi, sağlayıcı şeması genişletmesi.### Özellikler

-**Gemini CLI'nin Kullanımdan Kaldırılması**(#462): "Gemini-cli" sağlayıcısını uyarıyla kullanımdan kaldırıldı olarak işaretleyin — Google, Mart 2026'dan itibaren üçüncü taraf OAuth kullanımını kısıtlıyor -**Sağlayıcı Şeması**(#462): "deprecated", "deprecationReason", "hasFree", "freeNote", "authHint", "apiHint" isteğe bağlı alanlarla Zod doğrulamasını genişletin### Bug Fixes

-**VM Kılavuzu i18n**(#471): i18n çeviri hattına `VM_DEPLOYMENT_GUIDE.md` ekleyin, İngilizce kaynaktan 30 yerel ayar çevirisinin tamamını yeniden oluşturun (Portekizce dilinde kaldı)### Güvenlik

-**deps**: Çarpma `düzleştirilmiş' 3.3.3 → 3.4.2 — CWE-1321 prototip kirliliğini düzeltir (#484, @dependabot)### Closed Issues

- #472 — Model Takma Adları regresyonu (v2.8.2'de düzeltildi)
- #471 — VM kılavuzu çevirileri bozuk
- #483 — "[DONE]"dan sonra gelen "data: null" (v2.8.3'te düzeltildi)### Merged PRs

- #484 — dips: tümsek 3.3.3'ten 3.4.2'ye düzleştirildi (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: Çekçe i18n, SSE protokolü düzeltmesi, VM kılavuzu çevirisi.### Özellikler

-**Çekçe Dili**(#482): Tam Çekçe (cs) i18n — 22 belge, 2606 kullanıcı arayüzü dizesi, dil değiştirici güncellemeleri (@zen0bit) -**VM Dağıtım Kılavuzu**: Kaynak belge olarak (@zen0bit) Portekizce'den İngilizce'ye çevrilmiştir.### Bug Fixes

-**SSE Protokolü**(#483): "[DONE]" sinyalinden sonra sondaki "data: null" göndermeyi durdurun — katı AI SDK istemcilerindeki (Zod tabanlı doğrulayıcılar) "AI_TypeValidationError" sorununu düzeltir### Merged PRs

- #482 — Çekçe dili ekleyin + VM_DEPLOYMENT_GUIDE.md İngilizce kaynağını düzeltin (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 birleştirilmiş PR, model takma ad yönlendirme düzeltmesi, günlük aktarımı ve sorun önceliklendirme.### Özellikler

-**Günlüğü Dışa Aktarma**: `/dashboard/logs'ta zaman aralığı açılır menüsüyle (1 saat, 6 saat, 12 saat, 24 saat) Yeni Dışa Aktarma düğmesi. '/api/logs/export' API (#user-request) aracılığıyla istek/proxy/çağrı günlüklerinin JSON'unu indirir### Bug Fixes

-**Model Takma Adları Yönlendirme**(#472): Ayarlar → Model Takma Adları artık yalnızca format algılamayı değil, sağlayıcı yönlendirmeyi de doğru şekilde etkiliyor. Daha önce `resolveModelAlias()` çıktısı yalnızca `getModelTargetFormat()` için kullanılıyordu ancak orijinal model kimliği sağlayıcıya gönderiliyordu -**Akış Temizleme Kullanımı**(#480): Arabellekteki son SSE olayından gelen kullanım verileri artık akış temizleme sırasında doğru bir şekilde çıkarılıyor (@prakersh ile birleştirildi)### Merged PRs

- #480 — Yıkama işleyicisinde (@prakersh) kalan arabellekten kullanımı çıkarın
- #479 — Eksik Codex 5.3/5.4 ve Antropik model kimliği fiyatlandırma girişlerini ekleyin (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Beş topluluk PR'si — çağrı kaydı düzeltmelerinin akışı, Kiro uyumluluğu, önbellek belirteci analitiği, Çince çeviri ve yapılandırılabilir araç çağrı kimlikleri.### Özellikler

-**feat(logs)**: Arama günlüğü yanıt içeriği artık çeviriden önce ham sağlayıcı parçalarından (OpenAI/Claude/Gemini) doğru bir şekilde toplanıyor ve akış modundaki boş yanıt yükleri düzeltiliyor (#470, @zhangqiang8vip) -**feat(providers)**: Model başına yapılandırılabilir 9 karakterli araç çağrısı kimliği normalleştirmesi (Mistral tarzı) — yalnızca seçeneğin etkin olduğu modeller kesilmiş kimlikler alır (#470) -**feat(api)**: Anahtar PATCH API, "allowedConnections", "name", "autoResolve", "isActive" ve "accessSchedule" alanlarını destekleyecek şekilde genişletildi (#470) -**feat(dashboard)**: İstek günlüğü ayrıntıları kullanıcı arayüzünde yanıt öncelikli düzen (#470) -**feat(i18n)**: Geliştirilmiş Çince (zh-CN) çeviri — tam yeniden çeviri (#475, @only4copilot)### 🐛 Bug Fixes

-**düzeltme(kiro)**: İstek gövdesinden enjekte edilen "model" alanını soyun — Kiro API, bilinmeyen üst düzey alanları reddeder (#478, @prakersh) -**düzeltme(kullanım)**: Doğru analizler için kullanım geçmişi giriş toplamlarına önbellek okuma + önbellek oluşturma belirteçlerini dahil edin (#477, @prakersh) -**düzeltme(callLogs)**: OpenAI formatının yanı sıra Claude formatı kullanım alanlarını (`input_tokens`/`output_tokens`) destekler, tüm önbellek jetonu çeşitlerini içerir (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: Düzenlenebilir temel URL'lere ve ayrıca Alibaba Cloud ve Kimi Coding için topluluk katkılarına sahip Bailian Kodlama Planı sağlayıcısı.### Özellikler

-**feat(providers)**: Bailian Kodlama Planı (`bailian-coding-plan`) eklendi — Antropik uyumlu API'ye sahip Alibaba Model Studio. Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 ve Kimi K2.5 dahil 8 modelden oluşan statik katalog. Özel kimlik doğrulama doğrulamasını içerir (400=geçerli, 401/403=geçersiz) (#467, @Mind-Dragon) -**feat(admin)**: Sağlayıcı Yöneticisi akışlarını oluşturma/düzenlemede düzenlenebilir varsayılan URL — kullanıcılar bağlantı başına özel temel URL'leri yapılandırabilir. http(s) olmayan şemaları reddeden Zod şema doğrulamasıyla "providerSpecificData.baseUrl"de ısrar edildi (#467)### 🧪 Tests

- Bailian Kodlama Planı sağlayıcısı için kimlik doğrulama, şema güçlendirme, rota düzeyinde davranış ve katmanlar arası entegrasyonu kapsayan 30'dan fazla birim testi ve 2 e2e senaryosu eklendi---

## [2.7.10] — 2026-03-19

> Sprint: Topluluğun katkıda bulunduğu iki yeni sağlayıcı (Alibaba Bulut Kodlama, Kimi Kodlama API anahtarı) ve Docker pino düzeltmesi.### Özellikler

-**feat(providers)**: OpenAI uyumlu iki uç noktayla Alibaba Bulut Kodlama Planı desteği eklendi — "alicode" (Çin) ve "alicode-intl" (Uluslararası), her biri 8 modelle (#465, @dtk1985) -**feat(providers)**: Özel "kimi-coding-apikey" sağlayıcı yolu eklendi — API anahtarı tabanlı Kimi Kodlama erişimi artık yalnızca OAuth'a yönelik "kimi-coding" yolu aracılığıyla zorunlu tutulmuyor. Kayıt defterini, sabitleri, model API'sini, yapılandırmayı ve doğrulama testini içerir (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**düzeltme(docker)**: Docker görüntüsüne eksik "split2" bağımlılığı eklendi — "pino-abstract-transport" bunu çalışma zamanında gerektiriyor ancak bağımsız konteynere kopyalanmıyordu, bu da "'split2 modülü bulunamıyor'' çökmelerine neden oluyordu (#459)---

## [2.7.9] — 2026-03-18

> Sprint: Codex yanıtları alt yolu geçişi yerel olarak desteklenir, Windows MITM çökmesi düzeltildi ve Combos aracı şemaları ayarlandı.### Özellikler

-**feat(codex)**: Codex için yerel yanıtlar alt yolu geçişi — 'POST /v1/responses/compact'ı yerel olarak Codex yukarı akışına yönlendirerek, '/compact' son ekini (#457) çıkarmadan Claude Kodu uyumluluğunu korur### 🐛 Bug Fixes

-**fix(combos)**: Zod şemaları ('updateComboSchema' ve 'createComboSchema') artık 'system_message', 'tool_filter_regex' ve 'context_cache_protection'ı içeriyor. Kontrol paneli aracılığıyla oluşturulan aracıya özel ayarların arka uç doğrulama katmanı tarafından sessizce atılmasına neden olan hatayı düzeltir (#458) -**düzeltme(mitm)**: Windows'ta Kiro MITM profil çökmesi düzeltildi — "node-machine-id", eksik "REG.exe" ortamı nedeniyle başarısız oldu ve geri dönüş, ölümcül bir "kripto tanımlanmadı" hatası verdi. Fallback artık kriptoyu güvenli ve doğru bir şekilde içe aktarıyor (#456)---

## [2.7.8] — 2026-03-18

> Sprint: Bütçe kaydetme hatası + birleşik aracı özellikleri kullanıcı arayüzü + omniModel etiketi güvenlik düzeltmesi.### 🐛 Bug Fixes

-**düzeltme(bütçe)**: "Kaydetme Sınırları" artık 422 değerini döndürmüyor — `warningThreshold' artık doğru bir şekilde yüzde (0-100) yerine kesir (0-1) olarak gönderiliyor (#451)
-**düzeltme(kombinasyonlar)**: `<omniModel>` dahili önbellek etiketi artık istekler sağlayıcılara iletilmeden önce çıkarılıyor ve önbellek oturumu kesintileri önleniyor (#454)### Özellikler

-**feat(combos)**: Kombine oluşturma/düzenleme kipine Ajan Özellikleri bölümü eklendi — `system_message` geçersiz kılma, `tool_filter_regex` ve `context_cache_protection`ı doğrudan kontrol panelinden gösterin (#454)---

## [2.7.7] — 2026-03-18

> Sprint: Docker pino çökmesi, Codex CLI yanıtları çalışan düzeltmesi, paket kilidi senkronizasyonu.### 🐛 Bug Fixes

-**düzeltme(docker)**: "pino-abstract-transport" ve "pino-pretty" artık Docker çalıştırıcı aşamasında açıkça kopyalanıyor — Next.js bağımsız izlemesi bu eş depolarını kaçırıyor ve başlangıçta "Modül pino-abstract-transport bulunamıyor" çökmesine neden oluyor (#449) -**düzeltme(yanıtlar)**: `/v1/responses` rotasından `initTranslators()`ı kaldırın — Next.js çalışanını Codex CLI isteklerinde `the Worker has Exeded` uncaughtException ile kilitliyordu (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` artık Docker `npm ci`nin tam bağımlılık sürümlerini kullandığından emin olmak için her sürüm artışında işleniyor---

## [2.7.5] — 2026-03-18

> Sprint: UX iyileştirmeleri ve Windows CLI sağlık kontrolü düzeltmesi.### 🐛 Bug Fixes

-**düzeltme(ux)**: Giriş sayfasında varsayılan şifre ipucunu göster — yeni kullanıcılar artık şifre girişinin altında (#437) `"Varsayılan şifre: 123456"` görüyor -**düzeltme(cli)**: Claude CLI ve diğer npm yüklü araçlar artık Windows'ta çalıştırılabilir olarak doğru bir şekilde algılanıyor — Spawn, PATHEXT (#447) aracılığıyla `.cmd` sarmalayıcılarını çözümlemek için `shell:true` kullanıyor---

## [2.7.4] — 2026-03-18

> Sprint: Arama Araçları kontrol paneli, i18n düzeltmeleri, Copilot sınırları, Serper doğrulama düzeltmesi.### Özellikler

-**feat(search)**: Arama Oyun Alanı Ekleme (10. uç nokta), Sağlayıcıları Karşılaştırma/Yeniden Sıralama Hattı/Arama Geçmişi içeren Arama Araçları sayfası, yerel yeniden sıralama yönlendirme, arama API'sinde kimlik doğrulama korumaları (#443 @Regis-RCR tarafından)

- Yeni rota: `/dashboard/search-tools`
- Hata Ayıklama bölümünün altındaki kenar çubuğu girişi
- Kimlik doğrulama korumalarıyla birlikte `GET /api/search/providers` ve `GET /api/search/stats`
- `/v1/rerank` için yerel Providers_nodes yönlendirmesi
- Arama ad alanında 30'dan fazla i18n anahtarı### 🐛 Bug Fixes

-**düzeltme(arama)**: Brave haber normalleştiricisini düzeltin (0 sonuç döndürüyordu), normalizasyon sonrası max_results kesmeyi zorunlu kılın, Uç Noktalar sayfası getirme URL'sini düzeltin (#443, @Regis-RCR) -**düzeltme(analitik)**: Analitik gün/tarih etiketlerini yerelleştirin — sabit kodlu Portekizce dizeleri `Intl.DateTimeFormat(locale)` ile değiştirin (#444 by @hijak) -**düzeltme(copilot)**: GitHub Copilot hesap türü görünümünü düzeltin, limitler panosundaki yanıltıcı sınırsız kota satırlarını filtreleyin (#445 by @hijak) -**düzeltme(sağlayıcılar)**: Geçerli Serper API anahtarlarını reddetmeyi durdurun — 4xx olmayan yanıtları geçerli kimlik doğrulama olarak değerlendirin (#446 @hijak tarafından)---

## [2.7.3] — 2026-03-18

> Sprint: Codex direct API kotası geri dönüş düzeltmesi.### 🐛 Bug Fixes

-**düzeltme(kodeks)**: Haftalık olarak tükenen hesapları doğrudan API geri dönüşünde engelleyin (#440)

- `resolveQuotaWindow()` önek eşleşmesi: `"haftalık"` artık "haftalık (7d)"" önbellek anahtarlarıyla eşleşiyor
- `applyCodexWindowPolicy()`, `useWeekly`/`use5h` geçişlerini doğru şekilde uygular
- 4 yeni regresyon testi (toplam 766)---

## [2.7.2] — 2026-03-18

> Sprint: Işık modu kullanıcı arayüzü kontrastı düzeltmeleri.### 🐛 Bug Fixes

-**düzeltme(günlükler)**: İstek günlükleri filtre düğmeleri ve birleşik rozetteki ışık modu kontrastını düzeltin (#378)

- Hata/Başarı/Birleşik filtre düğmeleri artık ışık modunda okunabiliyor
- Birleşik sıra rozeti, ışık modunda daha güçlü mor kullanır---

## [2.7.1] — 2026-03-17

> Sprint: 5 sağlayıcı + Next.js 16.1.7 güvenlik düzeltmeleri (6 CVE) ile birleştirilmiş web arama yönlendirmesi (POST /v1/search).### ✨ New Features

-**feat(search)**: Birleşik web arama yönlendirmesi — 5 sağlayıcıyla (Serper, Brave, Perplexity, Exa, Tavily) 'POST /v1/search'

- Sağlayıcılar arasında otomatik yük devretme, ayda 6.500'den fazla ücretsiz arama
- İstek birleştirmeli bellek içi önbellek (yapılandırılabilir TTL)
- Kontrol Paneli: Sağlayıcı dökümü, önbellek isabet oranı, maliyet takibi ile "/dashboard/analytics"te Arama Analizi sekmesi
- Yeni API: Arama isteği istatistikleri için "GET /api/v1/search/analytics"
- Veritabanı geçişi: sohbet dışı istek takibi için "call_logs"ta "request_type" sütunu
- Zod doğrulaması ("v1SearchSchema"), kimlik doğrulaması yapılmış, maliyet "recordCost()" aracılığıyla kaydedilmiştir### Güvenlik

-**deps**: Next.js 16.1.6 → 16.1.7 — 6 CVE'yi düzeltir: -**Kritik**: CVE-2026-29057 (http-proxy aracılığıyla HTTP isteği kaçakçılığı) -**Yüksek**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Sunucu Eylemleri) -**Orta**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Dosya                                                            | Amaç                                                   |
| ---------------------------------------------------------------- | ------------------------------------------------------ | --- |
| 'open-sse/handlers/search.ts'                                    | 5 sağlayıcı yönlendirmeli arama işleyicisi             |
| 'open-sse/config/searchRegistry.ts'                              | Sağlayıcı kaydı (kimlik doğrulama, maliyet, kota, TTL) |
| 'open-sse/services/searchCache.ts'                               | İstek birleştirmeli bellek içi önbellek                |
| `src/app/api/v1/search/route.ts`                                 | Next.js rotası (POST + GET)                            |
| `src/app/api/v1/search/analytics/route.ts`                       | Arama istatistikleri API'si                            |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Analitik kontrol paneli sekmesi                        |
| `src/lib/db/migrations/007_search_request_type.sql`              | Veritabanı geçişi                                      |
| 'tests/unit/search-registry.test.mjs'                            | 277 satır birim testi                                  | --- |

## [2.7.0] — 2026-03-17

> Sprint: ClawRouter'dan ilham alan özellikler — toolCalling bayrağı, çok dilli amaç tespiti, kıyaslama odaklı geri dönüş, istek tekilleştirme, takılabilir RouterStrategy, Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5 fiyatlandırması.### ✨ New Models & Pricing

-**feat(pricing)**: xAI Grok-4 Fast — `1 milyon token başına 0,20 ABD doları/0,50 ABD doları', 1143 ms p50 gecikme, araç çağırma desteği -**feat(pricing)**: xAI Grok-4 (standart) — "1 milyon token başına 0,20$/1,50$", mantık amiral gemisi -**feat(pricing)**: Z.AI aracılığıyla GLM-5 — "0,5$/1 milyon", 128K çıktı bağlamı
-**feat(pricing)**: MiniMax M2.5 — "0,30$/1 milyon giriş", muhakeme + aracılı görevler -**feat(pricing)**: DeepSeek V3.2 — güncellenmiş fiyatlandırma "1 milyon başına 0,27$/1,10$" -**feat(pricing)**: Kimi K2.5, Moonshot API aracılığıyla — doğrudan Moonshot API erişimi -**feat(providers)**: Z.AI sağlayıcı eklendi ('zai' takma adı) — 128K çıkışlı GLM-5 ailesi### 🧠 Routing Intelligence

-**feat(registry)**: Sağlayıcı kaydındaki model başına "toolCalling" bayrağı — kombinasyonlar artık araç çağırma özellikli modelleri tercih edebilir/gerektirebilir -**feat(puanlama)**: AutoCombo puanlama için çok dilli amaç algılama — PT/ZH/ES/AR komut dosyası/dil kalıpları, istek bağlamına göre model seçimini etkiler -**feat(fallback)**: Karşılaştırmalı geri dönüş zincirleri — geri dönüş önceliğini dinamik olarak yeniden sıralamak için kullanılan gerçek gecikme verileri ('comboMetrics'ten p50) -**feat(dedup)**: Content-hash yoluyla tekilleştirme isteği — 5 saniyelik etkisizlik penceresi, yinelenen sağlayıcı çağrılarının istemcileri yeniden denemesini önler -**feat(router)**: 'autoCombo/routerStrategy.ts' dosyasındaki takılabilir 'RouterStrategy' arayüzü — özel yönlendirme mantığı, çekirdek değiştirilmeden enjekte edilebilir### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 yeni gelişmiş araç şeması: `omniroute_get_provider_metrics` (sağlayıcı başına p50/p95/p99) ve `omniroute_explain_route` (yönlendirme kararı açıklaması) -**feat(mcp)**: MCP aracı kimlik doğrulama kapsamları güncellendi — sağlayıcı metrik araçları için `metrics:read' kapsamı eklendi
-**feat(mcp)**: `omniroute_best_combo_for_task`artık çok dilli yönlendirme için`languageHint` parametresini kabul ediyor### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts', sağlayıcı/hesap başına gerçek zamanlı gecikme yüzdelik takibiyle genişletildi -**feat(health)**: Sağlık API'si ('/api/monitoring/health') artık sağlayıcı başına 'p50Latency' ve 'errorRate' alanlarını döndürüyor -**feat(usage)**: Model bazında gecikme takibi için kullanım geçmişi geçişi### 🗄️ DB Migrations

-**feat(migrations)**: "combo_metrics" tablosunda yeni "latency_p50" sütunu — sıfır kırma, mevcut kullanıcılar için güvenli### 🐛 Bug Fixes / Closures

-**close(#411)**: Windows'ta Better-sqlite3 karma modül çözünürlüğü — v2.6.10'da (f02c5b5) düzeltildi -**close(#409)**: GitHub Copilot sohbet tamamlamaları, dosyalar eklendiğinde Claude modellerinde başarısız oluyor — v2.6.9'da (838f1d6) düzeltildi -**close(#405)**: #411'in kopyası — çözüldü## [2.6.10] — 2026-03-17

> Windows düzeltmesi: node-gyp/Python/MSVC olmadan Better-sqlite3 önceden oluşturulmuş indirme (#426).### 🐛 Bug Fixes

-**düzeltme(kurulum/#426)**: Windows'ta, birlikte verilen yerel ikili dosya Linux için derlendiğinden, Windows'ta "npm install -g omniroute", "better_sqlite3.node geçerli bir Win32 uygulaması değil" hatasıyla başarısız oluyordu. `scripts/postinstall.mjs` dosyasına**Strateji 1.5**ekler: herhangi bir derleme aracı gerektirmeden (node-gyp yok, Python yok, MSVC yok) mevcut işletim sistemi/arch için doğru önceden oluşturulmuş ikili dosyayı indirmek için `@mapbox/node-pre-gyp install --fallback-to-build=false` ("better-sqlite3" içinde paketlenmiştir) kullanır. Yalnızca indirme işlemi başarısız olursa "npm yeniden oluşturma" durumuna geri döner. Açık manuel düzeltme talimatlarıyla birlikte platforma özel hata mesajları ekler.---

## [2.6.9] — 2026-03-17

> CI düzeltmeleri (herhangi bir bütçe için t11), hata düzeltmesi #409 (Copilot+Claude aracılığıyla dosya ekleri), iş akışı düzeltmesini yayınlayın.### 🐛 Bug Fixes

-**düzeltme(ci)**: "openai-responses.ts" ve "chatCore.ts" içindeki t11 "herhangi bir" bütçe kontrolünde başarısız olan yorumlardan "herhangi" kelimesini kaldırın (normal ifade sayma yorumlarından hatalı pozitif) -**düzeltme(chatCore)**: Desteklenmeyen içerik parçası türlerini sağlayıcılara iletmeden önce normalleştirin (#409 — İmleç, `.md` dosyaları eklendiğinde `{type:"file"}` gönderir; Copilot ve diğer OpenAI uyumlu sağlayıcılar "türün ya 'image_url' ya da 'text' olması gerekir" diyerek reddeder; düzeltme `file`/`document` bloklarını `text`e dönüştürür ve bilinmeyen türleri bırakır)### 🔧 Workflow

-**chore(generate-release)**: ATOMIC COMMIT KURAL'ı ekleyin — sürüm yükseltme ('npm sürüm yaması'), etiketin her zaman tüm sürüm değişikliklerini bir arada içeren bir işleme işaret ettiğinden emin olmak için özellik dosyalarını işleme koymadan önce gerçekleşmesi ZORUNLUDUR---

## [2.6.8] — 2026-03-17

> Sprint: Aracı Olarak Kombo (sistem istemi + araç filtresi), Bağlam Önbelleğe Alma Koruması, Otomatik Güncelleme, Ayrıntılı Günlükler, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: 'ALTER TABLE kombinasyonları ADD COLUMN system_message METİN VARSAYILAN BOŞ', 'tool_filter_regex METİN VARSAYILAN BOŞ', 'context_cache_protection INTEGER VARSAYILAN 0' -**006_detailed_request_logs.sql**: 500 girişli halka arabellek tetikleyicili yeni "request_detail_logs" tablosu, ayarlar arasında geçiş yoluyla katılım### Özellikler

-**feat(combo)**: Kombine başına Sistem Mesajını Geçersiz Kılma (#399 — `system_message' alanı, sağlayıcıya iletmeden önce sistem isteminin yerini alır veya enjekte eder)
-**feat(combo)**: Combo başına Araç Filtresi Regex (#399 — `tool_filter_regex`yalnızca araçları eşleşen deseni tutar; OpenAI + Antropik formatları destekler)
-**feat(combo)**: Bağlam Önbelleğe Alma Koruması (#401 —`context_cache_protection`, yanıtları "<omniModel>provider/model</omniModel>" ile etiketler ve oturum sürekliliği için modeli pinler)
-**feat(settings)**: Ayarlar aracılığıyla Otomatik Güncelleme (#320 — `GET /api/system/version`+`POST /api/system/update`— pm2'nin yeniden başlatılmasıyla arka planda npm kayıt defterini ve güncellemeleri kontrol eder)
-**feat(logs)**: Ayrıntılı İstek Günlükleri (#378 — 4 aşamada tüm işlem hattı gövdelerini yakalar: müşteri isteği, çevrilmiş istek, sağlayıcı yanıtı, müşteri yanıtı — katılıma izin verme geçişi, 64 KB kırpma, 500 girişli halka arabelleği)
-**feat(mitm)**: MITM Kiro IDE profili (#336 —`src/mitm/targets/kiro.ts` api.anthropic.com'u hedefler, mevcut MITM altyapısını yeniden kullanır)---

## [2.6.7] — 2026-03-17

> Sprint: SSE iyileştirmeleri, yerel sağlayıcı_nodes uzantıları, proxy kaydı, Claude geçiş düzeltmeleri.### Özellikler

-**feat(health)**: Üstel geri çekilme (30s→300s) ve engellemeyi önlemek için `Promise.allSettled` ile yerel `provider_nodes` için arka plan sağlık kontrolü (#423, @Regis-RCR) -**feat(embeddings)**: `/v1/embeddings`i yerel `provider_nodes`a yönlendirin — ana bilgisayar adı doğrulamasıyla `buildDynamicEmbeddingProvider()` (#422, @Regis-RCR) -**feat(audio)**: TTS/STT'yi SSRF korumalı yerel `provider_nodes` — `buildDynamicAudioProvider()`a yönlendirin (#416, @Regis-RCR) -**feat(proxy)**: Proxy kaydı, yönetim API'leri ve kota sınırı genelleştirmesi (#429, @Regis-RCR)### 🐛 Bug Fixes

-**düzeltme(sse)**: Hedef OpenAI-compat (#421, @prakersh) olduğunda Claude'a özgü alanları ("meta veriler", "antropik_versiyon") soyun -**düzeltme(sse)**: Geçiş akış modunda Claude SSE kullanımını ("input_tokens", "output_tokens", önbellek belirteçleri) çıkarın (#420, @prakersh) -**düzeltme(sse)**: Eksik/boş kimliklere sahip araç çağrıları için yedek "call_id" oluştur (#419, @prakersh) -**düzeltme(sse)**: Claude'dan Claude'a geçiş — ileri gövdeye tamamen dokunulmamış, yeniden çeviri yok (#418, @prakersh) -**düzeltme(sse)**: 400 hatayı önlemek için Claude Kodu bağlam sıkıştırmasından sonra artık kullanılmayan "tool_result" öğelerini filtreleyin (#417, @prakersh) -**düzeltme(sse)**: 'placeholder_tool' sonsuz döngülerini önlemek için Responses API çeviricisinde boş ad aracı çağrılarını atlayın (#415, @prakersh) -**düzeltme(sse)**: Çeviriden önce boş metin içeriği bloklarını çıkarın (#427, @prakersh) -**düzeltme(api)**: Claude OAuth test yapılandırmasına `refreshable: true' ekleyin (#428, @prakersh)### 📦 Dependencies

- `vitest', `@vitest/\*` ve ilgili devDependencing'leri artırın (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Düzeltme: Turbopack/Docker uyumluluğu — tüm 'src/' içe aktarma işlemlerinden 'node:' protokolünü kaldırın.### 🐛 Bug Fixes

-**düzeltme(derleme)**: "src/" altındaki 17 dosyadaki "import" ifadelerinden "node:" protokol öneki kaldırıldı. `node:fs`, `node:path`, `node:url`, `node:os` vb. içe aktarma işlemleri, Turbopack derlemelerinde (Next.js 15 Docker) ve eski npm global yüklemelerinden yapılan yükseltmelerde `Ecmascript dosyasında hata oluşmasına' neden oldu. Etkilenen dosyalar: "migrationRunner.ts", "core.ts", "backup.ts", "prompts.ts", "dataPaths.ts" ve "src/app/api/" ve "src/lib/" içindeki diğer 12 dosya.
-**chore(workflow)**: Docker Hub senkronizasyonu ve çift VPS dağıtımını her sürümde**zorunlu**adımlar haline getirmek için `generate-release.md' güncellendi.---

## [2.6.5] — 2026-03-17

> Sprint: akıl yürütme modeli parametre filtrelemesi, yerel sağlayıcı 404 düzeltmesi, Kilo Ağ Geçidi sağlayıcısı, bağımlılık sorunları.### ✨ New Features

-**feat(api)**: Yeni bir API Anahtarı sağlayıcısı (takma adı `kg`) olarak**Kilo Gateway**(`api.kilo.ai`) eklendi — 335+ model, 6 ücretsiz model, 3 otomatik yönlendirme modeli (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`). Geçiş modelleri '/api/gateway/models' uç noktası aracılığıyla desteklenir. (PR #408 @Regis-RCR tarafından)### 🐛 Bug Fixes

-**düzeltme(sse)**: Akıl yürütme modelleri için desteklenmeyen parametreleri çıkarın (o1, o1-mini, o1-pro, o3, o3-mini). 'o1'/'o3' ailesindeki modeller, HTTP 400 ile 'temperature', 'top_p', 'frequency_penalty', 'presence_penalty', 'logprobs', 'top_logprobs' ve 'n'yi reddeder. Parametreler artık iletmeden önce 'chatCore' katmanında çıkarılır. Arama için model başına bildirimsel bir "unsupportedParams" alanı ve önceden hesaplanmış bir O(1) Haritası kullanır. (PR #412 @Regis-RCR tarafından) -**düzeltme(sse)**: Yerel sağlayıcı 404 artık bağlantı düzeyinde kilitleme (2 dakika) yerine**yalnızca modelde kilitleme (5 saniye)**ile sonuçlanıyor. Yerel çıkarım arka ucu (Ollama, LM Studio, oMLX) bilinmeyen bir model için 404 döndürdüğünde bağlantı etkin kalır ve diğer modeller hemen çalışmaya devam eder. Ayrıca, "model"in "markAccountUnavailable()"a aktarılmamasına neden olan önceden var olan bir hatayı da düzeltir. Ana makine adı aracılığıyla algılanan yerel sağlayıcılar ("localhost", "127.0.0.1", "::1", "LOCAL_HOSTNAMES" env var aracılığıyla genişletilebilir). (PR #410 @Regis-RCR tarafından)### 📦 Dependencies

- 'daha iyi-sqlite3' 12.6.2 → 12.8.0
- 'unici' 7.24.2 → 7.24.4
- 'https-proxy-agent' 7 → 8
- 'aracı tabanı' 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**düzeltme(sağlayıcılar)**: 5 sağlayıcıda var olmayan model adları kaldırıldı: -**gemini / gemini-cli**: 'gemini-3.1-pro/flash' ve 'gemini-3-\*-preview' kaldırıldı (Google API v1beta'da mevcut değil); "gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-pro/flash" ile değiştirildi -**antigravity**: 'gemini-3.1-pro-high/low' ve 'gemini-3-flash' kaldırıldı (geçersiz dahili takma adlar); gerçek 2.x modelleriyle değiştirildi -**github (Copilot)**: 'gemini-3-flash-preview' ve 'gemini-3-pro-preview' kaldırıldı; 'gemini-2,5-flash' ile değiştirildi -**nvidia**: düzeltilmiş `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM, Meta modelleri için `meta/` ad alanını kullanır); 'nvidia/llama-3.1-70b-instruct' ve 'nvidia/llama-3.1-405b-instruct' eklendi -**düzeltme(db/combo)**: Uzak veritabanındaki "free-stack" birleşimi güncellendi: "qw/qwen3-coder-plus" kaldırıldı (süresi dolmuş yenileme belirteci), "nvidia/llama-3.3-70b-instruct" düzeltildi → "nvidia/meta/llama-3.3-70b-instruct" düzeltildi, "gemini/gemini-3.1-flash" düzeltildi → "gemini/gemini-2.5-flash", "if/deepseek-v3.2" eklendi---

## [2.6.3] — 2026-03-16

> Sprint: zod/pino karma şeridi derleme hattına eklendi, Sentetik sağlayıcı eklendi, VPS PM2 yolu düzeltildi.### 🐛 Bug Fixes

-**düzeltme(derleme)**: Turbopack karma şeridi artık yalnızca "better-sqlite3" için değil, TÜM paketler için**derleme zamanında**çalışıyor. `prepublish.mjs`deki 5.6 adım, `app/.next/server/` içindeki her `.js`yi yürütür ve herhangi bir karma `require()`dan 16 karakterlik onaltılık son eki çıkarır. Global npm kurulumlarında `zod-dcb22c...`, `pino-...` vb. MODULE_NOT_FOUND'u düzeltir. #398'i kapatır -**düzeltme(konuşlandırma)**: Her iki VPS'deki PM2, eski git-clone dizinlerine işaret ediyordu. Npm genel paketinde "app/server.js" olarak yeniden yapılandırıldı. '/deploy-vps' iş akışı 'npm pack + scp'yi kullanacak şekilde güncellendi (npm kayıt defteri 299 MB'lık paketleri reddediyor).### Özellikler

-**feat(provider)**: Sentetik ([synthetic.new](https://synthetic.new)) — gizlilik odaklı OpenAI uyumlu çıkarım. Dinamik HuggingFace model kataloğu için "passthroughModels: true". İlk modeller: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 @Regis-RCR tarafından)### 📋 Issues Closed

-**kapat #398**: npm karma regresyonu — yayın öncesi derleme zamanı karma şeridi ile düzeltildi -**triyaj #324**: Adımsız hata ekran görüntüsü — istenen çoğaltma ayrıntıları---

## [2.6.2] — 2026-03-16

> Sprint: modül karması tamamen düzeltildi, 2 PR birleştirildi (Antropik araçlar filtresi + özel uç nokta yolları), Alibaba Cloud DashScope sağlayıcı eklendi, 3 eski sorun kapatıldı.### 🐛 Bug Fixes

-**düzeltme(derleme)**: Yalnızca "better-sqlite3"ü değil, TÜM "serverExternalPackages"ı kapsayacak şekilde genişletilmiş web paketi "externals" hash-strip'i. Next.js 16 Turbopack, "zod", "pino" ve diğer tüm sunucu harici paketlerini çalışma zamanında "node_modules"ta bulunmayan "zod-dcb22c6336e0bc69" gibi adlara hashler. HASH_PATTERN regex'in tümünü yakalama özelliği artık 16 karakterlik son eki çıkarır ve temel paket adına geri döner. Ayrıca, web paketi modunu güçlendirmek için "prepublish.mjs" dosyasına "NEXT_PRIVATE_BUILD_WORKER=0" ve ayrıca kalan karma ref'leri bildiren bir derleme sonrası tarama eklendi. (#396, #398, PR #403) -**düzeltme(sohbet)**: Antropik biçimli araç adları (".işlev" sarmalayıcısı olmayan "araç.adı") #346'da tanıtılan boş ad filtresi tarafından sessizce kaldırıldı. LiteLLM proxy istekleri, Antropik Mesajlar API formatındaki "antropik/" önekiyle tüm araçların filtrelenmesine ve Antropik'in "400: tool_choice.any" döndürmesine neden olur, yalnızca araçlar sağlanırken belirtilebilir. 'araç.işlev.adı' bulunmadığında 'araç.adı'na geri dönülerek düzeltildi. 8 regresyon birimi testi eklendi. (PR#397)### Özellikler

-**feat(api)**: OpenAI uyumlu sağlayıcı düğümleri için özel uç nokta yolları — sağlayıcı bağlantı kullanıcı arayüzünde düğüm başına "chatPath" ve "modelsPath"i (ör. "/v4/chat/completions") yapılandırın. Veritabanı geçişini (`003_provider_node_custom_paths.sql`) ve URL yolu temizlemeyi içerir (`..` geçişi yok, `/` ile başlamalıdır). (PR#400) -**feat(provider)**: Alibaba Cloud DashScope, OpenAI uyumlu sağlayıcı olarak eklendi. Uluslararası uç nokta: "dashscope-intl.aliyuncs.com/uyumlu-mode/v1". 12 model: "qwen-max", "qwen-plus", "qwen-turbo", "qwen3-coder-plus/flash", "qwq-plus", "qwq-32b", "qwen3-32b", "qwen3-235b-a22b". Yetkilendirme: Taşıyıcı API anahtarı.### 📋 Issues Closed

-**kapat #323**: Cline bağlantı hatası `[object Object]` — v2.3.7'de düzeltildi; kullanıcıya v2.2.9'dan yükseltme yapması talimatı verildi -**kapat #337**: Kiro kredi takibi — v2.5.5'te uygulandı (#381); kullanıcıyı Kontrol Paneline yönlendirdi → Kullanım -**triyaj #402**: ARM64 macOS DMG hasarlı — macOS sürümü istendi, tam hata ve "xattr -d com.apple.quarantine" geçici çözümü önerildi---

## [2.6.1] — 2026-03-15

> Kritik başlangıç ​​düzeltmesi: v2.6.0 global npm yüklemeleri, Next.js 16 enstrümantasyon kancasındaki Turbopack/webpack modül adı karma hatası nedeniyle 500 hatasıyla çöktü.### 🐛 Bug Fixes

-**düzeltme(derleme)**: `better-sqlite3'ü her zaman web paketi sunucu paketindeki tam paket adıyla zorunlu olmaya zorlayın. Next.js 16, enstrümantasyon kancasını ayrı bir yığın halinde derledi ve paket "serverExternalPackages" içinde listelenmiş olsa bile "node_modules"ta bulunmayan karma bir modül adı olan "require('better-sqlite3-<hash>')" yaydı. Sunucu web paketi yapılandırmasına açık bir "externals" işlevi eklendi, böylece paketleyici her zaman "require('better-sqlite3")" mesajı göndererek temiz genel kurulumlarda başlangıçtaki "500 Dahili Sunucu Hatası" sorununu çözdü. (#394, Halkla İlişkiler #395)### 🔧 CI

-**ci**: Manuel tetikleyiciler için sürüm senkronizasyon korumasıyla birlikte "npm-publish.yml" dosyasına "workflow_dispatch" eklendi (#392) -**ci**: "docker-publish.yml" dosyasına "workflow_dispatch" eklendi, GitHub Eylemleri en son sürümlere güncellendi (#392)---

## [2.6.0] - 2026-03-15

> Sorun çözümleme hızı: 4 hata düzeltildi, günlük kullanıcı deneyimi iyileştirildi, Kiro kredi takibi eklendi.### 🐛 Bug Fixes

-**düzeltme(medya)**: ComfyUI ve SD WebUI, yapılandırılmadığında artık Medya sayfası sağlayıcı listesinde görünmüyor — bağlantı sırasında `/api/providers`ı getirir ve bağlantısı olmayan yerel sağlayıcıları gizler (#390) -**düzeltme(auth)**: Round-robin artık bekleme süresinden hemen sonra oran sınırlı hesapları yeniden seçmiyor - "backoffLevel" artık LRU rotasyonunda birincil sıralama anahtarı olarak kullanılıyor (#340) -**düzeltme(oauth)**: Qoder (ve kendi kullanıcı arayüzlerine yönlendirme yapan diğer sağlayıcılar) artık OAuth modunu "Yetkilendirme Bekleniyor" konumunda takılı bırakmıyor — açılır pencere kapalı dedektörün manuel URL giriş moduna otomatik geçişleri (#344) -**düzeltme(günlükler)**: İstek günlüğü tablosu artık açık modda okunabilir — durum rozetleri, belirteç sayıları ve birleşik etiketler uyarlanabilir "koyu:" renk sınıflarını kullanır (#378)### Özellikler

-**feat(kiro)**: Kullanım alıcıya Kiro kredi takibi eklendi — AWS CodeWhisperer uç noktasından `getUserCredits'i sorguluyor (#337)### 🛠 Chores

-**chore(tests)**: "test:plan3", "test:fixes", "test:security", "npm testi" ile aynı "tsx/esm" yükleyiciyi kullanacak şekilde hizalandı — hedeflenen çalıştırmalarda modül çözümlemesindeki hatalı negatifleri ortadan kaldırır (PR #386)---

## [2.5.9] - 2026-03-15

> Codex yerel geçiş düzeltmesi + rota gövdesi doğrulamasını güçlendirme.### 🐛 Bug Fixes

-**düzeltme(kodeks)**: Codex istemcileri için yerel Responses API geçişini koruyun — gereksiz çeviri mutasyonlarını önler (PR #387) -**düzeltme(api)**: Fiyatlandırma/senkronizasyon ve görev yönlendirme yollarındaki istek gövdelerini doğrulayın — hatalı biçimlendirilmiş girişlerden kaynaklanan çökmeleri önler (PR #388) -**düzeltme(auth)**: JWT sırları `src/lib/db/secrets.ts' aracılığıyla yeniden başlatmalarda devam eder — pm2 yeniden başlatıldıktan sonra 401 hatasını ortadan kaldırır (PR #388)---

## [2.5.8] - 2026-03-15

> Derleme düzeltmesi: v2.5.7'nin eksik yayınlanması nedeniyle bozulan VPS bağlantısını geri yükleyin.### 🐛 Bug Fixes

-**düzeltme(derleme)**: `scripts/prepublish.mjs` hala kullanımdan kaldırılmış `--webpack` bayrağını kullanıyor ve Next.js bağımsız derlemesinin sessizce başarısız olmasına neden oluyor — npm yayınlama `app/server.js` olmadan tamamlandı ve VPS dağıtımını bozdu---

## [2.5.7] - 2026-03-15

> Medya oyun alanı hata işleme düzeltmeleri.### 🐛 Bug Fixes

-**düzeltme(medya)**: Ses konuşma içermediğinde (müzik, sessizlik) transkripsiyon "API Anahtarı Gerekli" hatalı pozitif - artık onun yerine "Konuşma algılanmadı" mesajı gösteriliyor -**fix(media)**: `audioTranscription.ts` ve `audioSpeech.ts` içindeki `upstreamErrorResponse` artık uygun JSON'u (`{error:{message}}`) döndürerek MediaPageClient'te doğru 401/403 kimlik bilgisi hatası algılamayı etkinleştiriyor -**fix(media)**: `parseApiError` artık Deepgram'ın `err_msg` alanını yönetiyor ve doğru kimlik bilgisi hatası sınıflandırması için hata mesajlarındaki `"api anahtarını" algılıyor---

## [2.5.6] - 2026-03-15

> Kritik güvenlik/kimlik doğrulama düzeltmeleri: Antigravity OAuth bozuldu + JWT oturumları yeniden başlatmanın ardından kaybedildi.### 🐛 Bug Fixes

-**düzeltme(oauth) #384**: Antigravity Google OAuth artık belirteç uç noktasına `client_secret'i doğru şekilde gönderiyor. 'ANTIGRAVITY_OAUTH_CLIENT_SECRET' için geri dönüş boş bir dizeydi ve bu sahteydi; dolayısıyla 'client_secret' hiçbir zaman isteğe dahil edilmedi ve özel env var'ı olmayan tüm kullanıcılar için 'client_secret eksik' hatalarına neden oldu. #383'ü kapatır.
-**düzeltme(auth) #385**: `JWT_SECRET` artık ilk nesilde SQLite'ta ("namespace='secrets'`) kalıcı hale getiriliyor ve sonraki başlatmalarda yeniden yükleniyor. Daha önce, her işlem başlangıcında yeni bir rastgele sır oluşturuluyor ve herhangi bir yeniden başlatma veya yükseltme sonrasında mevcut tüm çerezleri/oturumları geçersiz kılıyordu. Hem "JWT_SECRET" hem de "API_KEY_SECRET"i etkiler. #382'yi kapatır.---

## [2.5.5] - 2026-03-15

> Model listesi tekilleştirme düzeltmesi, Electron bağımsız yapı sağlamlaştırma ve Kiro kredi takibi.### 🐛 Bug Fixes

-**düzeltme(models) #380**: "GET /api/models" artık aktif sağlayıcı filtresini oluştururken sağlayıcı takma adlarını içeriyor - "PROVIDER_MODELS" anahtarları takma ad olduğundan ancak DB bağlantıları sağlayıcı kimlikleri altında saklandığından, "claude" (takma ad "cc") ve "github" (takma ad "gh") modelleri her zaman bir bağlantının yapılandırılıp yapılandırılmadığına bakılmaksızın gösterildi. Her etkin sağlayıcı kimliğinin "PROVIDER_ID_TO_ALIAS" yoluyla takma adını da içerecek şekilde genişletilmesiyle düzeltildi. #353'ü kapatır. -**fix(electron) #379**: Yeni `scripts/prepare-electron-standalone.mjs`, Electron paketlemeden önce özel bir `/.next/electron-standalone` paketini hazırlıyor. 'Node_modules' bir sembolik bağlantı ise (elektron oluşturucu, yapım makinesine bir çalışma zamanı bağımlılığı gönderir) açık bir hatayla iptal edilir. "path.basename" aracılığıyla platformlar arası yol temizleme. Yazan: @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Kiro kredi bakiyesi takibi — kullanım uç noktası artık Kiro hesapları için kredi verilerini 'codewhisperer.us-east-1.amazonaws.com/getUserCredits'i çağırarak döndürüyor (Kiro IDE'nin dahili olarak kullandığı uç noktanın aynısı). Kalan kredileri, toplam ödeneği, yenileme tarihini ve abonelik katmanını döndürür. #337'yi kapatır.## [2.5.4] - 2026-03-15

> Logger başlangıç ​​düzeltmesi, oturum açma önyükleme güvenliği düzeltmesi ve geliştirici HMR güvenilirliğinde iyileştirme. CI altyapısı güçlendirildi.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**düzeltme(logger) #376**: Pino taşıma günlüğü yolunu geri yükle — `transport.targets` ile birleştirilmiş `formatters.level` pino tarafından reddedildi. Aktarım destekli yapılandırmalar artık düzey biçimlendiriciyi `getTransportCompatibleConfig()` aracılığıyla kaldırıyor. Ayrıca `/api/logs/console` içindeki sayısal düzey eşlemesini de düzeltir: `30→info, 40→warn, 50→error` (bir birim kaydırıldı). -**düzeltme(giriş) #375**: Giriş sayfası artık korumalı '/api/settings' yerine genel '/api/settings/require-login' uç noktasından önyükleme yapıyor. Parola korumalı kurulumlarda, ön kimlik doğrulama sayfası 401 alıyordu ve gereksiz yere güvenli varsayılanlara geri dönüyordu. Genel rota artık tüm önyükleme meta verilerini ("requireLogin", "hasPassword", "setupComplete") hata durumunda muhafazakar bir 200 geri dönüşüyle ​​döndürüyor. -**düzeltme(dev) #374**: "next.config.mjs" dosyasındaki "allowedDevOrigins" dosyasına "localhost" ve "127.0.0.1" ekleyin — HMR websocket, uygulamaya geridöngü adresi aracılığıyla erişilirken engellendi ve tekrarlanan çapraz köken uyarılarına neden oldu.### 🔧 CI & Infrastructure

-**ESLint OOM düzeltmesi**: "eslint.config.mjs" artık "vscode-extension/**", "electron/**", "docs/**", "app/.next/**" ve "clipr/**" öğelerini yok sayıyor — ESLint, VS Code ikili bloblarını ve derlenmiş parçaları tarayarak bir JS yığın OOM'uyla çöküyordu. -**Birim testi düzeltmesi**: Eski `ALTER TABLE sağlayıcı_bağlantıları ADD COLUMN "grup"` 2 test dosyasından kaldırıldı — sütun artık temel şemanın bir parçası (#373'te eklendi), bu da her CI çalıştırmasında `SQLITE_ERROR: yinelenen sütun adı'na neden oluyor. -**Ön taahhüt kancası\*\*: ".husky/pre-commit" dosyasına "npm run test:unit" eklendi — birim testleri artık bozulan taahhütleri CI'ya ulaşmadan engelliyor.## [2.5.3] - 2026-03-14

> Kritik hata düzeltmeleri: Veritabanı şeması geçişi, başlangıç ​​ortamı yüklemesi, sağlayıcı hata durumunun temizlenmesi ve i18n araç ipucu düzeltmesi. Her PR'ye ek olarak kod kalitesinde iyileştirmeler.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**düzeltme(db) #373**: Temel şemaya "provider_connections.group" sütunu eklendi + mevcut veritabanları için dolgu geçişi — sütun tüm sorgularda kullanıldı ancak şema tanımında eksik -**düzeltme(i18n) #371**: Var olmayan `t("deleteConnection")` anahtarını mevcut `providers.delete` anahtarıyla değiştirin — sağlayıcı ayrıntıları sayfasındaki `MISSING_MESSAGE: Providers.deleteConnection` çalışma zamanı hatasını düzeltir -**düzeltme(auth) #372**: Gerçek kurtarma işleminden sonra sağlayıcı hesaplarından eski hata meta verilerini ("errorCode", "lastErrorType", "lastErrorSource") temizleyin - önceden, kurtarılan hesaplar başarısız olarak görünmeye devam ediyordu -**düzeltme(başlangıç) #369**: "npm run start", "run-standalone.mjs" ve Electron genelinde env yüklemesini "DATA_DIR/.env → ~/.omniroute/.env → ./.env" önceliğine uyacak şekilde birleştirin — mevcut şifrelenmiş bir veritabanı üzerinde yeni bir "STORAGE_ENCRYPTION_KEY" oluşturulmasını önler### 🔧 Code Quality

- 'auth.ts'de belgelenmiş 'result.success' ve 'response?.ok' kalıpları (her ikisi de kasıtlı, şimdi açıklandı)
- "electron/main.js" dosyasındaki "overridePath?.trim()", "bootstrap-env.mjs" ile eşleşecek şekilde normalleştirildi
- Electron başlangıcında 'preferredEnv' birleştirme sırası yorumu eklendi

> Otomatik döndürme, hızlı katman geçişi, gpt-5.4 modeli ve analiz etiketi düzeltme özelliklerine sahip Codex hesap kota politikası.### ✨ New Features (PRs #366, #367, #368)

-**Codex Kota Politikası (PR #366)**: Hesap başına 5 saatlik/haftalık kota penceresi Sağlayıcı kontrol panelinde geçiş yapar. Etkinleştirilen pencereler %90 eşiğine ulaştığında hesaplar otomatik olarak atlanır ve "resetAt" sonrasında yeniden kabul edilir. Yan etkisi olmayan durum alıcıya sahip "quotaCache.ts"yi içerir. -**Codex Hızlı Katman Geçişi (PR #367)**: Kontrol Paneli → Ayarlar → Codex Hizmet Katmanı. Varsayılan kapatma düğmesi, yalnızca Codex istekleri için `service_tier: "flex"`i enjekte ederek maliyeti ~%80 azaltır. Tam yığın: UI sekmesi + API uç noktası + yürütücü + çevirmen + başlangıç ​​geri yüklemesi. -**gpt-5.4 Modeli (PR #368)**: Codex model kaydına "cx/gpt-5.4" ve "codex/gpt-5.4"ü ekler. Regresyon testi dahil.### 🐛 Bug Fixes

-**356 numaralı düzeltme**: Analitik grafikleri (En İyi Sağlayıcı, Hesaba Göre, Sağlayıcı Dağılımı) artık OpenAI uyumlu sağlayıcılar için ham dahili kimlikler yerine insanlar tarafından okunabilen sağlayıcı adlarını/etiketlerini gösteriyor.

> Ana sürüm: katı rastgele yönlendirme stratejisi, API anahtar erişim kontrolleri, bağlantı grupları, harici fiyatlandırma senkronizasyonu ve düşünme modelleri için kritik hata düzeltmeleri, birleşik testler ve araç adı doğrulama.### ✨ New Features (PRs #363 & #365)

-**Katı Rastgele Yönlendirme Stratejisi**: Eşzamanlı istekler için tekrarlanmayı önleme garantisi ve muteks serileştirmesi ile Fisher-Yates karıştırma destesi. Kombo başına ve sağlayıcı başına bağımsız desteler. -**API Anahtar Erişim Kontrolleri**: "allowedConnections" (bir anahtarın kullanabileceği bağlantıları kısıtlayın), "is_active" (anahtarı 403 ile etkinleştirme/devre dışı bırakma), "accessSchedule" (zamana dayalı erişim kontrolü), "autoResolve" geçişi, anahtarları PATCH aracılığıyla yeniden adlandırma. -**Bağlantı Grupları**: Sağlayıcı bağlantılarını ortama göre gruplayın. LocalStorage kalıcılığı ve akıllı otomatik geçiş ile Sınırlar sayfasında akordeon görünümü. -**Harici Fiyatlandırma Senkronizasyonu (LiteLLM)**: 3 katmanlı fiyatlandırma çözümü (kullanıcı geçersiz kılmaları → senkronize edilmiş → varsayılanlar). 'PRICING_SYNC_ENABLED=true' aracılığıyla kaydolun. MCP aracı 'omniroute_sync_pricing'. 23 yeni test. -**i18n**: 30 dil, katı rastgele strateji ve API anahtar yönetimi dizeleriyle güncellendi. pt-BR tamamen çevrildi.### 🐛 Bug Fixes

-**düzeltme #355**: Akış boşta kalma zaman aşımı 60 saniyeden 300 saniyeye çıkarıldı — uzun akıl yürütme aşamaları sırasında genişletilmiş düşünme modellerinin (claude-opus-4-6, o3 vb.) iptal edilmesini önler. 'STREAM_IDLE_TIMEOUT_MS' aracılığıyla yapılandırılabilir. -**düzeltme #350**: Birleşik test artık dahili başlık kullanarak `REQUIRE_API_KEY=true` durumunu atlıyor ve evrensel olarak OpenAI uyumlu formatı kullanıyor. Zaman aşımı 15 saniyeden 20 saniyeye uzatıldı. -**düzeltme #346**: Boş "işlev.adı" (Claude Kodu tarafından iletilen) içeren araçlar artık yukarı akış sağlayıcıları bunları almadan önce filtreleniyor ve "Geçersiz giriş[N].ad: boş dize" hataları önleniyor.### 🗑️ Closed Issues

-**#341**: Hata ayıklama bölümü kaldırıldı — yerine "/dashboard/logs" ve "/dashboard/health" eklendi.

> Çok anahtarlı sağlayıcı kurulumları için API Key Round-Robin desteği ve joker karakter yönlendirmesinin ve kota penceresinin yuvarlanmasının onayı halihazırda mevcuttur.### ✨ New Features

-**API Key Round-Robin (T07)**: Sağlayıcı bağlantıları artık birden fazla API anahtarı tutabilir (Bağlantıyı Düzenle → Ekstra API Anahtarları). İstekler, "providerSpecificData.extraApiKeys[]" aracılığıyla birincil + ekstra anahtarlar arasında dönüşümlü olarak döner. Anahtarlar, bağlantı başına dizine eklenerek bellekte tutulur; veritabanı şeması değişikliği gerekmez.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Yönlendirme (T13)**: Glob tarzı joker karakter eşleştirmeli ('gpt\*', 'claude-?-sonnet', vb.) 'wildcardRouter.ts', özgüllük sıralamasıyla 'model.ts'ye zaten entegre edilmiştir. -**Kota Penceresi Döndürme (T08)**: `accountFallback.ts:isModelLocked()` pencereyi zaten otomatik olarak ilerletiyor — 'Date.now() > entry.until' ise kilit hemen silinir (eski engelleme yoktur).

> Kullanıcı arayüzü iyileştirmesi, yönlendirme stratejisi eklemeleri ve kullanım sınırları için hassas hata yönetimi.### ✨ New Features

-**Önce Doldur ve P2C Yönlendirme Stratejileri**: Tam kılavuz panelleri ve renk kodlu rozetlerle birlikte karma strateji seçiciye "önce doldur" (devam etmeden önce kotayı boşalt) ve "p2c" (İki Seçeneğin Gücü düşük gecikmeli seçim) eklendi. -**Ücretsiz Yığın Ön Ayar Modelleri**: Free Stack şablonuyla bir kombinasyon oluşturmak artık sınıfının en iyisi 7 ücretsiz sağlayıcı modelini (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq) otomatik olarak dolduruyor. Kullanıcılar yalnızca sağlayıcıları etkinleştirir ve kullanıma hazır olarak ayda 0 ABD doları değerinde bir kombinasyon elde ederler. -**Daha Geniş Kombo Modu**: Kombo Oluşturma/Düzenleme modu artık büyük kombinasyonların rahat bir şekilde düzenlenmesi için "max-w-4xl"yi kullanıyor.### 🐛 Bug Fixes

-**Codex ve GitHub için Sınırlar sayfası HTTP 500**: `getCodexUsage()` ve `getGitHubUsage()`, artık sağlayıcı 401/403 (süresi dolmuş jeton) döndürdüğünde, Limitler sayfasında 500 hatası oluşturup bunun yerine kullanıcı dostu bir mesaj döndürüyor. -**MaintenanceBanner yanlış pozitif**: Banner artık sayfa yüklemede sahte bir şekilde "Sunucuya erişilemiyor" ifadesini göstermiyor. Bağlama sırasında hemen `checkHealth()` çağrısı yapılarak ve eski `show` durumu kapatması kaldırılarak düzeltildi. -**Sağlayıcı simgesi araç ipuçları**: Sağlayıcı bağlantı satırındaki düzenleme (kalem) ve silme simgesi düğmeleri artık yerel HTML araç ipuçlarına sahip; 6 eylem simgesinin tümü artık kendi kendine belgeleniyor.

> Topluluk sorun analizi, yeni sağlayıcı desteği, belirteç takibi için hata düzeltmeleri, model yönlendirme ve akış güvenilirliğinden elde edilen çok sayıda iyileştirme.### ✨ New Features

-**Göreve Duyarlı Akıllı Yönlendirme (T05)**: İstek içerik türüne göre otomatik model seçimi — kodlama → derin arama-sohbet, analiz → gemini-2.5-pro, görme → gpt-4o, özetleme → gemini-2.5-flash. Ayarlar aracılığıyla yapılandırılabilir. Yeni 'GET/PUT/POST /api/settings/task-routing' API'si. -**HuggingFace Sağlayıcı**: Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini ile OpenAI uyumlu sağlayıcı olarak HuggingFace Router eklendi. -**Vertex AI Sağlayıcısı**: Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude ile Vertex aracılığıyla Vertex AI (Google Cloud) sağlayıcısı eklendi. -**Oyun Alanı Dosya Yüklemeleri**: Transkripsiyon için ses yükleme, görüş modelleri için görüntü yükleme (model adına göre otomatik algılama), görüntü oluşturma sonuçları için satır içi görüntü oluşturma. -**Model Seçimi Görsel Geri Bildirimi**: Birleşik seçicide önceden eklenmiş modeller artık ✓ yeşil rozeti gösteriyor — tekrarlanan karışıklıkları önlüyor. -**Qwen Uyumluluğu (PR #352)**: Qwen sağlayıcı uyumluluğu için Güncellenmiş Kullanıcı Aracısı ve CLI parmak izi ayarları. -**Round-Robin Durum Yönetimi (PR #349)**: Hariç tutulan hesapları yönetmek ve rotasyon durumunu doğru bir şekilde sürdürmek için geliştirilmiş round-robin mantığı. -**Pano UX (PR #360)**: Güvenli olmayan bağlamlar için geri dönüşlü güçlendirilmiş pano işlemleri; Claude aracı normalleştirme iyileştirmeleri.### 🐛 Bug Fixes

-**Düzeltme #302 — OpenAI SDK akışı=Yanlış tool_calls düşüşleri**: T01 Başlık anlaşmasını kabul et, artık "body.stream" açıkça "yanlış" olduğunda akışı zorlamaz. OpenAI Python SDK'yı akış dışı modda kullanırken tool_calls'ın sessizce bırakılmasına neden oluyordu. -**Düzeltme #73 — Claude Haiku, sağlayıcı öneki olmadan OpenAI'ye yönlendiriliyor**: Sağlayıcı öneki olmadan gönderilen "claude-_" modelleri artık "antigravity" (Antropik) sağlayıcıya doğru şekilde yönlendiriliyor. `Gemini-_`/`gemma-\*`→`gemini` buluşsal yöntemi de eklendi. -**Düzeltme #74 — Antigravity/Claude akışı için jeton sayımı her zaman 0'dır**: "input_tokens"ı taşıyan "message_start" SSE olayı "extractUsage()" tarafından ayrıştırılmıyordu ve tüm giriş jetonu sayımlarının düşmesine neden oluyordu. Giriş/çıkış belirteci izleme artık akış yanıtları için doğru şekilde çalışıyor. -**Düzeltme #180 — Geri bildirim olmadan model içe aktarma kopyaları**: "ModelSelectModal" artık komboda yer alan modeller için ✓ yeşil renkte vurgu gösteriyor ve bu da bunların zaten eklenmiş olduğunu açıkça gösteriyor. -**Medya sayfası oluşturma hataları**: Resim sonuçları artık ham JSON yerine "<img>" etiketleri olarak oluşturuluyor. Transkripsiyon sonuçları okunabilir metin olarak gösterilir. Kimlik bilgisi hataları, sessiz hata yerine sarı renkli bir banner gösterir. -**Sağlayıcı sayfasında belirteç yenileme düğmesi**: OAuth sağlayıcıları için manuel belirteç yenileme kullanıcı arayüzü eklendi.### 🔧 Improvements

-**Sağlayıcı Kaydı**: HuggingFace ve Vertex AI, "providerRegistry.ts" ve "providers.ts" (ön uç) dosyalarına eklendi. -**Okuma Önbelleği**: Verimli DB okuma önbelleği için yeni `src/lib/db/readCache.ts`. -**Kota Önbelleği**: TTL tabanlı tahliyeyle iyileştirilmiş kota önbelleği.### 📦 Dependencies

- "doyum arındırma" → 3.3.3 (PR #347)
- 'unici' → 7.24.2 (PR #348, #361)
- 'docker/setup-qemu-action' → v4 (PR #342)
- 'docker/setup-buildx-action' → v4 (PR #343)### 📁 New Files

| Dosya                                         | Amaç                                              |
| --------------------------------------------- | ------------------------------------------------- | ----------------------- |
| 'open-sse/services/taskAwareRouter.ts'        | Görev bilinçli yönlendirme mantığı (7 görev türü) |
| `src/app/api/settings/task-routing/route.ts`  | Görev yönlendirme yapılandırma API'si             |
| `src/app/api/providers/[id]/refresh/route.ts` | Manuel OAuth belirteci yenileme                   |
| `src/lib/db/readCache.ts`                     | Verimli DB okuma önbelleği                        |
| `src/shared/utils/clipboard.ts`               | Geri dönüşlü sertleştirilmiş pano                 | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Kombo modu: Serbest Yığın görünür ve belirgin**— Ücretsiz Yığın şablonu gizlendi (3 sütunlu kılavuzda 4. sırada). Düzeltildi: 1. konuma taşındı, 2x2 ızgaraya geçildi, böylece 4 şablonun tümü görünür hale geldi, yeşil kenarlık + ÜCRETSİZ rozet vurgulandı.## [2.4.0] - 2026-03-13

> **Büyük sürüm**— Ücretsiz Stack ekosistemi, transkripsiyon oyun alanı revizyonu, 44'ten fazla sağlayıcı, kapsamlı ücretsiz katman belgeleri ve her alanda kullanıcı arayüzü iyileştirmeleri.### Özellikler

-**Kombolar: Ücretsiz Yığın şablonu**— Kiro + Qoder + Qwen + Gemini CLI'da dönüşümlü olarak kullanılan yeni 4. şablon "Ücretsiz Yığın (0$)". İlk kullanımda önceden oluşturulmuş sıfır maliyetli kombinasyonu önerir.
-**Medya/Transkripsiyon: Varsayılan olarak Deepgram**— Deepgram (Nova 3, 200 $ ücretsiz) artık varsayılan transkripsiyon sağlayıcısıdır. AssemblyAI (50$ ücretsiz) ve Groq Whisper (sonsuza kadar ücretsiz) ücretsiz kredi rozetleriyle birlikte gösteriliyor. -**BENİOKU: "Ücretsiz Başlayın" bölümü**— Sıfır maliyetli yapay zekanın dakikalar içinde nasıl kurulacağını gösteren yeni erken README 5 adımlı tablo. -**BENİOKU: Ücretsiz Transkripsiyon Kombinasyonu**— Deepgram/AssemblyAI/Groq kombinasyon önerisi ve sağlayıcı başına ücretsiz kredi ayrıntıları içeren yeni bölüm. -**providers.ts: hasFree bayrağı**— NVIDIA NIM, Cerebras ve Groq, sağlayıcıların kullanıcı arayüzü için hasFree rozeti ve freeNote ile işaretlenmiştir. -**i18n: şablonFreeStack tuşları**— Ücretsiz Stack birleşik şablonu 30 dilin tümüne çevrildi ve senkronize edildi.## [2.3.16] - 2026-03-13

### Belgeler

-**BENİOKU: 44+ Sağlayıcı**— "36+ sağlayıcı" ifadesinin tüm 3 tekrarı, gerçek kod tabanı sayısını yansıtacak şekilde "44+" olarak güncellendi ( Providers.ts'de 44 sağlayıcı) -**BENİOKU: Yeni Bölüm "🆓 Ücretsiz Modeller — Gerçekte Ne Alırsınız"**— Şunlar için model başına hız limitlerine sahip 7 sağlayıcı tablosu eklendi: Kiro (AWS Builder ID aracılığıyla sınırsız Claude), Qoder (5 model sınırsız), Qwen (4 model sınırsız), Gemini CLI (180K/ay), NVIDIA NIM (sonsuza kadar ~40 RPM geliştirme), Cerebras (1M tok/gün / 60K TPM), Groq (30 RPM) / 14,4K RPD). \/usr/bin/bash Ultimate Free Stack kombo önerisini içerir. -**BENİOKU: Fiyatlandırma Tablosu Güncellendi**— API KEY katmanına Cerebras eklendi, NVIDIA'nın "1000 kredi"den "sonsuza kadar ücretsiz"e sabitlenmesi sağlandı, Qoder/Qwen model sayıları ve adları güncellendi -**BENİOKU: Qoder 8→5 modelleri**(adları: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**BENİOKU: Qwen 3→4 modelleri**(adları: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vizyon-modeli)## [2.3.15] - 2026-03-13

### Özellikler

-**Otomatik Kombo Kontrol Paneli (Kademe Önceliği)**: `/dashboard/auto-combo` faktör dökümü ekranına 7. puanlama faktörü etiketi olarak `🏷️ Tier' eklendi — 7 Otomatik Kombo puanlama faktörünün tümü artık görünür. -**i18n — autoCombo bölümü**: 30 dil dosyasının tümüne Otomatik Kombinasyon panosu için 20 yeni çeviri anahtarı ("başlık", "durum", "modePack", "providerScores", "factorTierPriority" vb.) eklendi.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Geçerli varsayılan "clientSecret" geri yüklendi; daha önce boş bir dizeydi ve her bağlantı denemesinde "Kötü istemci kimlik bilgilerine" neden oluyordu. Genel kimlik bilgisi artık varsayılan yedektir (`QODER_OAUTH_CLIENT_SECRET` env var aracılığıyla geçersiz kılınabilir). -**MITM sunucusu bulunamadı (#335)**: `prepublish.mjs` artık npm paketine kopyalamadan önce `src/mitm/*.ts`yi `tsc`yi kullanarak JavaScript'e derliyor. Daha önce yalnızca ham ".ts" dosyaları kopyalanıyordu; yani "server.js", npm/Volta global kurulumlarında hiçbir zaman mevcut değildi. -**GeminiCLI'de projectId (#338)**eksik: Saklanan kimlik bilgilerinde "projectId" eksik olduğunda (örneğin, Docker yeniden başlatıldıktan sonra) sabit bir 500 hatası atmak yerine, OmniRoute artık bir uyarıyı günlüğe kaydediyor ve isteği dener; OmniRoute çökmesi yerine anlamlı bir sağlayıcı tarafı hatası döndürüyor. -**Elektron sürümü uyuşmazlığı (#323)**: "Electron/package.json" sürümü "2.3.13" ile senkronize edildi ("2.0.13" idi), böylece masaüstü ikili sürümü npm paketiyle eşleşecek.### ✨ New Models (#334)

-**Kiro**: "claude-sonnet-4", "claude-opus-4.6", "deepseek-v3.2", "minimax-m2.1", "qwen3-coder-next", "auto" -**Kodeksi**: "gpt5.4"### 🔧 Improvements

-**Kademe Puanlaması (API + Doğrulama)**: "ScoringWeights" Zod şemasına ve "combos/auto" API rotasına "tierPriority" (ağırlık "0,05") eklendi — 7. puanlama faktörü artık REST API tarafından tamamen kabul ediliyor ve girişte doğrulanıyor. toplam toplamı = "1,0" tutmak için "kararlılık" ağırlığı "0,10"dan "0,05"e ayarlandı.### ✨ New Features

-**Kademeli Kota Puanlaması (Otomatik Kombo)**: 7. puanlama faktörü olarak "tierPriority" eklendi — diğer faktörler eşit olduğunda Ultra/Pro katmanlarına sahip hesaplar artık Ücretsiz katmanlara göre tercih ediliyor. 'ProviderCandidate' üzerinde yeni isteğe bağlı alanlar 'accountTier' ve 'quotaResetIntervalSecs'. 4 mod paketinin tümü güncellendi ("hızlı gönderim", "maliyet tasarrufu", "önce kalite", "çevrimdışı dostu"). -**Aile İçi Model Geri Dönüşü (T5)**: Bir model kullanılamadığında (404/400/403), OmniRoute artık bir hata döndürmeden önce otomatik olarak aynı ailedeki kardeş modellere geri dönüyor ("modelFamilyFallback.ts"). -**Yapılandırılabilir API Köprüsü Zaman Aşımı**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var, operatörlerin proxy zaman aşımını (varsayılan 30 saniye) ayarlamasına olanak tanır. Yavaş yukarı akış yanıtlarındaki 504 hatalarını düzeltir. (#332) -**Yıldız Geçmişi**: 30 README'nin tamamında star-history.com widget'ı star-history.com widget'ı (`?variant=adaptive`) ile değiştirildi — açık/koyu temaya ve gerçek zamanlı güncellemelere uyum sağlar.### 🐛 Bug Fixes

-**Auth — İlk şifre**: `INITIAL_PASSWORD` env var artık ilk kontrol paneli şifresi ayarlanırken kabul ediliyor. Sabit zamanlı karşılaştırma için "timingSafeEqual" özelliğini kullanarak zamanlama saldırılarını önler. (#333) -**BENİOKU Kısaltması**: Sorun Giderme bölümünde GitHub'un altındaki her şeyi (Teknik Yığın, Dokümanlar, Yol Haritası, Katkıda Bulunanlar) oluşturmayı durdurmasına neden olan eksik bir `</details>` kapatma etiketi düzeltildi. -**pnpm kurulumu**: "package.json" dosyasındaki, doğrudan bağımlılıkla çakışan ve pnpm'de "EOVERRIDE" hatalarına neden olan gereksiz "@swc/helpers" geçersiz kılma işlemi kaldırıldı. 'pnpm.onlyBuiltDependegency' yapılandırması eklendi. -**CLI Yol Ekleme (T12)**: "CLI\_\*\_BIN" env değişkenlerindeki yol geçişini ve kabuk meta karakterlerini engellemek için "cliRuntime.ts" dosyasına "isSafePath()" doğrulayıcı eklendi. -**CI**: GitHub Eylemlerindeki "npm ci" hatalarını düzeltmek için geçersiz kılma kaldırıldıktan sonra "package-lock.json" yeniden oluşturuldu.### 🔧 Improvements

-**Yanıt Formatı (T1)**: `response_format' (json_schema/json_object) artık Claude için bir sistem istemi olarak ekleniyor ve yapılandırılmış çıktı uyumluluğu sağlanıyor. -**429 Yeniden Deneme (T2)**: Bir sonraki URL'ye dönmeden önce 429 yanıt için URL içi yeniden deneme (2 saniye gecikmeli 2 kez deneme). -**Gemini CLI Başlıkları (T3)**: Gemini CLI uyumluluğu için "User-Agent" ve "X-Goog-Api-Client" parmak izi başlıkları eklendi. -**Fiyatlandırma Kataloğu (T9)**: "deepseek-3.1", "deepseek-3.2" ve "qwen3-coder-next" fiyatlandırma girişleri eklendi.### 📁 New Files

| Dosya                                      | Amaç                                                  |
| ------------------------------------------ | ----------------------------------------------------- | --------- |
| 'open-sse/services/modelFamilyFallback.ts' | Model ailesi tanımları ve aile içi geri dönüş mantığı | ### Fixed |

-**KiloCode**: kilokod sağlık kontrolü zaman aşımı v2.3.11'de zaten düzeltildi -**OpenCode**: 15 saniyelik durum denetimi zaman aşımı ile cliRuntime kayıt defterine açık kod ekleyin -**OpenClaw / Cursor**: Yavaş başlangıçlı değişkenler için sağlık kontrolü zaman aşımını 15 saniyeye çıkarın -**VPS**: Droid ve openclaw npm paketlerini yükleyin; kiro-cli için CLI_EXTRA_PATHS'yi etkinleştir -**cliRuntime**: Açık kod aracı kaydını ekleyin ve devam etmek için zaman aşımını artırın## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode sağlık kontrolü**: "healthcheckTimeoutMs"yi 4000 ms'den 15000 ms'ye yükseltin — kilocode, başlangıçta bir ASCII logo başlığı oluşturur ve yavaş/soğuk başlatma ortamlarında yanlış "healthcheck_failed" hatasına neden olur## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: "check:any-budget:t11" hatasını düzeltin — OAuthModal.tsx'te "as any" ifadesini "as Record<string, bilinmiyor>" ile değiştirin (3 olay)### Docs

-**CLI-TOOLS.md**: 11 CLI aracının tümü için eksiksiz kılavuz (claude, codex, gemini, opencode, cline, kilocode, devam, kiro-cli, imleç, droid, openclaw) -**i18n**: CLI-TOOLS.md, çevrilmiş başlık + giriş ile 30 dile senkronize edildi## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Yeni eski OpenAI tamamlama uç noktası — hem "prompt" dizesini hem de "messages" dizisini kabul eder, sohbet biçimine otomatik olarak normalleşir -**EndpointPage**: Artık OpenAI uyumlu 3 uç nokta türünün tamamını gösteriyor: Sohbet Tamamlamaları, Yanıtlar API'si ve Eski Tamamlamalar -**i18n**: 30 dil dosyasına `completionsLegacy/completionsLegacyDesc` eklendi### Fixed

-**OAuthModal**: Tüm OAuth bağlantı hatalarında görüntülenen "[object Object]" sorununu düzeltin — 3 "throw new Error(data.error)" çağrısının (exchange, cihaz kodu, yetkilendirme) tamamındaki hata yanıt nesnelerinden ".message"ı düzgün şekilde çıkarın

- Cline, Codex, GitHub, Qwen, Kiro ve diğer tüm OAuth sağlayıcılarını etkiler## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Base64 kod çözme işleminden önce `decodeURIComponent' ekleyin, böylece geri çağırma URL'sindeki URL kodlu kimlik doğrulama kodları doğru şekilde ayrıştırılır ve uzak (LAN IP) kurulumlarındaki "geçersiz veya süresi dolmuş yetkilendirme kodu" hataları düzeltilir
-**Cline OAuth**: `mapTokens`artık`name = name = name + lastName ||'i dolduruyor Cline hesaplarının "Hesap #Kimliği" yerine gerçek kullanıcı adlarını göstermesi için e-posta -**OAuth hesap adları**: Tüm OAuth değişim akışları (değişim, anket, anket-geri arama) artık ad eksik olduğunda "ad = e-posta"yı normalleştiriyor; böylece her OAuth hesabı, Sağlayıcılar kontrol panelinde ekran etiketi olarak kendi e-postasını gösteriyor -**OAuth hesap adları**: 'db/providers.ts'de sıralı "Hesap N" geri dönüşü kaldırıldı - e-postası/adı olmayan hesaplar artık hesaplar silindiğinde değişen sıralı bir sayı yerine "getAccountDisplayName()" aracılığıyla sabit bir kimlik tabanlı etiket kullanıyor## [2.3.6] - 2026-03-12

### Fixed

-**Sağlayıcı test grubu**: Zod şeması "providerId: null" kabul edecek şekilde düzeltildi (sağlayıcı olmayan modlar için ön uç null gönderir); tüm toplu testler için hatalı bir şekilde "Geçersiz istek" döndürüyordu -**Sağlayıcı test modu**: "setTestResults" ve "ProviderTestResultsView"da oluşturulmadan önce API hata nesnelerinin dizelere göre normalleştirilmesiyle "[object Object]" görüntüsü düzeltildi -**i18n**: `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` eksik anahtarları `en.json` dosyasına eklendi -**i18n**: İngilizce olmayan 29 dil dosyasının tamamında yedek olarak İngilizce değerleri kullanılarak 1111 eksik anahtar senkronize edildi## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: "@swc/helpers" dosyasını bağımsız uygulamanın "node_modules" dosyasına kopyalamak için kalıcı "postinstall" düzeltmesi eklendi — genel npm yüklemelerinde MODULE_NOT_FOUND çökmesini önler## [2.3.4] - 2026-03-10

### Added

- Çoklu sağlayıcı entegrasyonları ve kontrol paneli iyileştirmeleri
