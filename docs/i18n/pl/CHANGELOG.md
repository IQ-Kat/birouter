# Changelog (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Oprogramowanie pośrednie:**Rozwiązano nieskończoną pętlę przekierowań na pulpicie nawigacyjnym dla nowych instancji, gdy opcja requireLogin jest wyłączona.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Natywna integracja Qoder API:**Całkowicie przebudowano Qoder Executor, aby ominąć starszy algorytm szyfrowania COSY AES/RSA, kierując bezpośrednio do natywnego adresu URL zgodnego z DashScope OpenAi. Eliminuje złożone zależności od modułów „krypto” Node, poprawiając jednocześnie wierność strumienia. -**Przebudowa mechanizmu odporności:**Zintegrowane funkcje awaryjne związane z przepełnieniem kontekstu, proaktywne wykrywanie tokenów OAuth i zapobieganie emisji pustych treści (#990). -**Strategia routingu zoptymalizowana pod kątem kontekstu:**Dodano nową funkcję inteligentnego routingu, aby natywnie maksymalizować okna kontekstowe w zautomatyzowanych wdrożeniach combo (nr 990).### 🐛 Bug Fixes

-**Uszkodzenie strumienia interfejsu API odpowiedzi:**Naprawiono uszkodzenie głębokiego klonowania, w którym granice translacji Anthropic/OpenAI usuwały prefiksy SSE specyficzne dla „odpowiedzi” z granic przesyłania strumieniowego (#992). -**Wyrównanie przekazywania pamięci podręcznej Claude:**Wyrównane znaczniki pamięci podręcznej zgodne z CC zgodnie z trybem przekazywania klienta nadrzędnego, zachowując buforowanie podpowiedzi. -**Wyciek pamięci Turbopack:**Przypięty Next.js do ścisłej wersji `16.0.10`, aby zapobiec wyciekom pamięci i tworzeniu się nieaktualnych danych z powodu niedawnych regresji modułu mieszającego Turbopack (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Integracja Models.dev:**Zintegrowana models.dev jako wiarygodne źródło środowiska uruchomieniowego dotyczące cen, możliwości i specyfikacji modeli, zastępując ceny zakodowane na stałe. Zawiera interfejs ustawień umożliwiający zarządzanie interwałami synchronizacji, ciągami tłumaczeń dla wszystkich 30 języków i solidnym zakresem testów. -**Natywne możliwości dostawcy:**Dodano obsługę deklarowania i sprawdzania natywnych funkcji API (np. `systemInstructions_supported`), zapobiegając awariom poprzez oczyszczanie nieprawidłowych ról. Obecnie skonfigurowany dla dostawców Gemini Base i Antigravity OAuth. -**Zaawansowane ustawienia dostawcy API:**Dodano niestandardowe zastąpienia „User-Agent” dla połączeń dostawcy klucza API dla poszczególnych połączeń. Zastąpienie jest przechowywane w `providerSpecificData.customUserAgent` i teraz ma zastosowanie do sond sprawdzających i żądań wykonania nadrzędnego.### 🐛 Bug Fixes

-**Niezawodność Qwen OAuth:**rozwiązano szereg problemów z integracją OAuth, w tym blokadę 400 złych żądań dla wygasłych tokenów, generowanie awaryjne do analizowania właściwości OIDC „access_token” w przypadku pominięcia „id_token”, błędy odkrywania katalogu modeli i ścisłe filtrowanie nagłówków „X-Dashscope-\*”, aby uniknąć odrzucenia 400 z punktów końcowych zgodnych z OpenAI.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo i routing:**Zakończono natywną integrację cyklu życia CRUD dla zaawansowanego silnika Auto-Combo (nr 955). -**Podstawowe operacje:**Naprawiono brakujące tłumaczenia nowych natywnych opcji automatycznych kombinacji (#955). -**Weryfikacja bezpieczeństwa:**Wyłączono natywnie zadania automatycznego tworzenia kopii zapasowych SQLite podczas wykonywania testu jednostkowego CI, aby jawnie rozwiązać wycieki pamięci zawieszającej się w pętli zdarzeń węzła 22 (#956). -**Proxy ekosystemu:**Ukończono harmonogramy synchronizacji modelu mapowania jawnej integracji, cykle OAuth i bezpieczne odświeżanie tokenu za pośrednictwem natywnych serwerów proxy nadrzędnych systemu OmniRoute (nr 953). -**Rozszerzalność MCP:**Dodano i pomyślnie zarejestrowano nowe narzędzie frameworka MCP `omniroute_web_search` z wersji beta do schematów produkcyjnych (nr 951). -**Logika bufora tokenów:**Dodano limity konfiguracji środowiska wykonawczego, rozszerzając konfigurowalne bufory tokenów wejścia/wyjścia w celu uzyskania precyzyjnych metryk śledzenia użycia (#959).### 🐛 Bug Fixes

-**Naprawa CodeQL:**W pełni rozwiązane i zabezpieczone operacje indeksowania ciągów krytycznych zapobiegające fałszowaniu żądań po stronie serwera (SSRF) tablic indeksujących heurystykę wraz z wielomianowym algorytmicznym śledzeniem wstecznym (ReDoS) w modułach dyspozytora głębokiego proxy. -**Crypto Hashe:**Zastąpiono słabe, niezweryfikowane starsze skróty OAuth 1.0 solidnymi standardowymi metodami sprawdzania poprawności HMAC-SHA-256, zapewniającymi ścisłą kontrolę dostępu. -**Ochrona granic API:**Prawidłowo zweryfikowane i zmapowane zabezpieczenia tras strukturalnych wymuszające ścisłą logikę oprogramowania pośredniego `isAuthenticated()` obejmującą nowsze dynamiczne punkty końcowe ukierunkowane na manipulację ustawieniami i ładowanie natywnych umiejętności. -**Zgodność z ekosystemem CLI:**Naprawiono uszkodzone powiązania natywnego parsera środowiska wykonawczego, które powodowały awarie detektorów środowiska `where` ściśle w przypadkach brzegowych `.cmd/.exe` z wdziękiem dla wtyczek zewnętrznych (#969). -**Architektura pamięci podręcznej:**Dokładna refaktoryzacja parametrów panelu analitycznego i ustawień systemowych, buforowanie struktury układu w celu utrzymania stabilnych cykli trwałości ponownego nawodnienia, rozwiązując wizualne miganie niewyrównanego stanu (nr 952). -**Standardy buforowania Claude'a:**Znormalizowane i ściśle zachowane krytyczne znaczniki bloków efemerycznych. `Efemeryczne` buforowanie poleceń TTL dla dalszych węzłów wymuszające standardowe, zgodne z nimi żądania CC, czyste mapowanie bez utraty metryk (nr 948). -**Uwierzytelnianie aliasów wewnętrznych:**Uproszczone wewnętrzne mapowania środowiska wykonawczego, normalizujące wyszukiwanie danych uwierzytelniających Codexu w globalnych parametrach translacji, rozwiązujące problem 401 nieuwierzytelnionych upadków (#958).### 🛠️ Maintenance

-**Wykrywalność interfejsu użytkownika:**Poprawnie dostosowane kategoryzacje układu wyraźnie oddzielające logikę dostawców bezpłatnej warstwy, poprawiające przepływy sortowania UX na ogólnych stronach rejestru API (#950). -**Topologia wdrożenia:**Ujednolicone artefakty wdrożenia Dockera zapewniające, że plik główny `fly.toml` odpowiada oczekiwanym parametrom instancji w chmurze, od razu po wyjęciu z pudełka natywnie obsługują automatyczne skalowanie wdrożeń. -**Narzędzia programistyczne:**Oddzielono parametry wykonawcze `LKGP` od jawnych narzędzi buforujących abstrakcję warstwy DB, zapewniając bezpieczną izolację testową dla podstawowych warstw buforujących.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Panel automatycznego kombinowania pulpitu nawigacyjnego:**Całkowicie przebudowano interfejs użytkownika `/dashboard/auto-combo`, aby bezproblemowo zintegrować się z natywnymi kartami pulpitu nawigacyjnego i ustandaryzowanymi wizualnymi dopełnieniami/nagłówkami. Dodano dynamiczne wizualne paski postępu odwzorowujące mechanizmy wagi wyboru modelu. -**Synchronizacja ustawień routingu:**W pełni ujawnione zaawansowane cele schematu „priorytetu” i „ważonego” routingu wewnętrznie na listach rezerwowych ustawień globalnych.### Bug Fixes

-**Węzły regionalne pamięci i umiejętności:**Rozwiązano puste znaczniki renderowania dla opcji pamięci i umiejętności bezpośrednio w widokach ustawień globalnych, łącząc wszystkie `ustawienia.*` mapując wewnętrznie wartości do `en.json` (również mapowane niejawnie dla narzędzi do wzajemnego tłumaczenia).### Internal Integrations

- Zintegrowany PR #946 — poprawka: zachowanie zgodności z Claude Code przy konwersji odpowiedzi
- Zintegrowany PR #944 — fix(gemini): zachowanie sygnatur myślowych podczas wywołań narzędzi antygrawitacyjnych
- Zintegrowany PR #943 — poprawka: przywróć treść GitHub Copilot
- Zintegrowany PR #942 — Naprawiono znaczniki pamięci podręcznej kompatybilne z CC
- Zintegrowany PR #941 — refaktoryzacja (auth): popraw wyszukiwanie aliasów NVIDIA + dodaj rejestrowanie błędów LKGP
  — Zintegrowany PR #939 — Przywróć obsługę wywołań zwrotnych Claude OAuth localhost
- _(Uwaga: PR #934 został pominięty w cyklu 3.4.9, aby zapobiec regresji konfliktu podstawowego)_---

## [3.4.8] — 2026-04-03

### Bezpieczeństwo

— Całkowicie naprawiono wszystkie zaległe ustalenia dotyczące zabezpieczeń Github Advanced Security (CodeQL) i alerty zależnego robota.

- Naprawiono luki w zabezpieczeniach związane z niepewną losowością poprzez migrację z `Math.random` do `crypto.randomUUID()`.
- Zabezpieczone polecenia powłoki w zautomatyzowanych skryptach z wstrzykiwania ciągu.
  — Przeniesiono podatne na katastrofalne wzorce analizowania RegEx w procesach czatu/tłumaczenia.
  — Ulepszone kontrole oczyszczania danych wyjściowych w komponentach interfejsu użytkownika React i wstrzykiwanie tagów zdarzeń wysłanych przez serwer (SSE).---

## [3.4.7] — 2026-04-03

### Funkcje

- Dodano węzeł „Kryptografia” do kontroli stanu monitorowania i MCP (#798)
- Ulepszone mapowanie uprawnień tras w katalogu modeli (`/models`) (#781)### Bug Fixes

- Naprawiono odświeżanie tokena Claude OAuth, które nie zachowywało kontekstów pamięci podręcznej (#937)
  — Naprawiono błędy dostawcy zgodnego z CC, które powodowały, że modele w pamięci podręcznej były nieosiągalne (#937)
- Naprawiono błędy GitHub Executor związane z nieprawidłowymi tablicami kontekstu (#937)
  — Naprawiono błędy sprawdzania stanu narzędzi CLI zainstalowanych za pomocą NPM w systemie Windows (#935)
- Naprawiono tłumaczenie ładunku powodujące utratę prawidłowej zawartości z powodu nieprawidłowych pól API (#927)
  — Naprawiono awarię środowiska wykonawczego w węźle 25 dotyczącą wykonania klucza API (#867)
- Naprawiono rozdzielczość samodzielnego modułu MCP (`ERR_MODULE_NOT_FOUND`) poprzez `esbuild` (#936)
  — Naprawiono niezgodność aliasu rozdzielczości routingu NVIDIA NIM (#931)### Bezpieczeństwo

- Dodano bezpieczną, ścisłą ochronę granic wejściowych przed wstrzyknięciami surowego kodu `Shell: true`.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Dostawcy:**Zarejestrowani nowi dostawcy generowania obrazów, wideo i audio z listy wymaganej przez społeczność (nr 926). -**Interfejs pulpitu nawigacyjnego:**Dodano samodzielną nawigację na pasku bocznym dla nowych modułów Pamięć i Umiejętności (#926). -**i18n:**Dodano ciągi tłumaczeń i mapowania układu w 30 językach dla przestrzeni nazw Pamięć i Umiejętności.### 🐛 Bug Fixes

-**Odporność:**Zapobiegnięto utknięciu wyłącznika zastępczego w stanie OTWARTYM na czas nieokreślony, obsługując bezpośrednie przejścia do stanu ZAMKNIĘTEGO w rezerwowych ścieżkach kombinacji (#930). -**Tłumaczenie protokołu:**Poprawiono transformator przesyłania strumieniowego, aby oczyścić bloki odpowiedzi w oparciu o oczekiwany protokół _source_, a nie protokół dostawcy _target_, naprawiając modele Anthropics opakowane w ładunki OpenAI powodujące awarię Claude Code (#929). -**Specyfikacje API i Gemini:**Naprawiono parsowanie `thought_signature` w tłumaczach `openai-to-gemini` i `claude-to-gemini`, zapobiegając błędom HTTP 400 we wszystkich wywołaniach narzędzi API Gemini 3. -**Dostawcy:**Usunięto punkty końcowe niezgodne z OpenAI, uniemożliwiające prawidłowe połączenia wychodzące (#926). -**Trendy pamięci podręcznej:**Naprawiono niedopasowanie danych mapowania nieprawidłowej właściwości powodujące awarię wykresów interfejsu użytkownika Trendów pamięci podręcznej i wyodrębniono nadmiarowe widżety metryk pamięci podręcznej (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**Integracja z ekosystemem CLIProxyAPI:**Dodano moduł wykonawczy `cliproxyapi` z wbudowanym buforowaniem na poziomie modułu i routingiem proxy. Wprowadzono kompleksową usługę Menedżera wersji, która umożliwia automatyczne testowanie kondycji, pobieranie plików binarnych z GitHub, uruchamianie izolowanych procesów w tle i przejrzyste zarządzanie cyklem życia zewnętrznych narzędzi CLI bezpośrednio poprzez interfejs użytkownika. Zawiera tabele DB do konfiguracji proxy w celu umożliwienia automatycznego routingu krzyżowego bramkowanego przez SSRF zewnętrznych żądań OpenAI za pośrednictwem lokalnej warstwy narzędzi CLI (#914, #915, #916). -**Obsługa Qoder PAT:**Zintegrowana obsługa tokenów dostępu osobistego (PAT) bezpośrednio poprzez lokalny transport `qodercli` zamiast starszych konfiguracji zdalnej przeglądarki `.cn` (#913). -**Gemini 3.1 Pro Preview (GitHub):**Dodano obsługę jawnego modelu kanonicznego `gemini-3.1-pro-preview` natywnie w dostawcy GitHub Copilot, zachowując jednocześnie starsze aliasy routingu (#924).### 🐛 Bug Fixes

-**Stabilność tokena drugiego pilota w GitHub:**Naprawiono pętlę odświeżania tokenu drugiego pilota, w której nieaktualne tokeny nie były głęboko łączone z bazą danych, i usunięto pola „reasoning_text”, które fatalnie zakłócały dalsze konwersje bloków antropicznych dla czatów wieloturowych (#923). -**Globalna macierz limitów czasu:**Scentralizowane i sparametryzowane limity czasu żądań jawnie z `REQUEST_TIMEOUT_MS`, aby zapobiec przedwczesnemu odcinaniu przez ukryte (~300 s) domyślne bufory pobierania długotrwałych odpowiedzi przesyłania strumieniowego SSE od ciężkich modeli wnioskowania (#918). -**Stan szybkich tuneli Cloudflare:**Naprawiono poważną niespójność stanu, w wyniku której zrestartowane instancje OmniRoute błędnie pokazywały zniszczone tunele jako aktywne i domyślnie tunelowanie Cloudflared do `HTTP/2`, aby wyeliminować spam w dziennikach bufora odbiorczego UDP (#925). -**Przeróbka tłumaczenia i18n (czeski i hindi):**Naprawiono kod w języku hindi z przestarzałego `in.json` na kanoniczny `hi.json`, przerobiono mapowania tekstu w języku czeskim, wyodrębniono plik `untranslatable-keys.json` w celu naprawienia fałszywie pozytywnych walidacji CI/CD i wygenerowano kompleksową dokumentację `I18N.md` dla tłumaczy (nr 912). -**Odzyskiwanie dostawcy tokenów:**Naprawiono utratę przez Qwen określonych punktów końcowych `resourceUrl` po automatycznym odświeżeniu tokena kontroli stanu z powodu brakujących głębokich połączeń DB (#917). -**UX i przesyłanie strumieniowe zgodne z CC:**Ujednolicono działania zgodne z dodawaniem CC/OpenAI/Anthropic w obrębie interfejsu użytkownika Anthropic, zmuszono żądania przesyłania danych zgodne z CC do korzystania z SSE przy jednoczesnym zwracaniu odpowiedzi przesyłanych strumieniowo lub nie przesyłanych strumieniowo w oparciu o żądanie klienta, usunięto obsługę konfiguracji/importu listy modeli CC na rzecz wyraźnego błędu w wykazie nieobsługiwanych modeli i sprawiono, że dostępne modele zgodne z CC odzwierciedlają listę rejestru OAuth Claude Code (nr 921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Raportowanie tokenów API odpowiedzi:**Emituj `response.completed` z poprawnymi polami `input_tokens`/`output_tokens` dla klientów Codex CLI, naprawianie wyświetlania użycia tokena (#909 — dzięki @christopher-s). -**Punkt kontrolny SQLite WAL przy zamykaniu:**Opróżnia zmiany WAL do podstawowego pliku bazy danych podczas płynnego zamykania/restartu, zapobiegając utracie danych przy zatrzymywaniu kontenera Docker (#905 — dzięki @rdself). -**Sygnał płynnego zamknięcia:**Zmieniono trasy `/api/restart` i `/api/shutdown` z `process.exit(0)` na `process.kill(SIGTERM)`, zapewniając, że procedura obsługi zamknięcia zostanie uruchomiona przed wyjściem. -**Okres prolongaty zatrzymania Dockera:**Dodano `stop_grace_period: 40s` do plików Docker Compose i `--stop-timeout 40` do przykładów uruchomienia Dockera.### 🛠️ Maintenance

- Zamknięto 5 rozwiązanych/niebędących błędami problemów (#872, #814, #816, #890, #877).
- Sprawdzono 6 problemów z żądaniami informacji o potrzebach (#892, #887, #886, #865, #895, #870).
  — Odpowiedziano na problem ze śledzeniem wykrywania CLI (nr 863), korzystając ze wskazówek dla współautora.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Pamięć i umiejętności antygrawitacyjne:**Ukończono zdalny zastrzyk pamięci i umiejętności dla dostawcy antygrawitacji na poziomie sieci proxy. -**Zgodność z Claude Code:**Zbudowano natywnie ukryty mostek kompatybilności dla Claude Code, czysto przekazując narzędzia i formatując. -**Wyszukiwarka internetowa MCP:**Dodano narzędzie `omniroute_web_search` z zakresem `execute:search`. -**Komponenty pamięci podręcznej:**Zaimplementowano dynamiczne komponenty pamięci podręcznej wykorzystujące TDD. -**Interfejs użytkownika i dostosowywanie:**Dodano obsługę niestandardowych ikon ulubionych, zakładki wyglądu, białe etykiety przewodowe na pasku bocznym i dodano kroki przewodnika po windsurfingu we wszystkich 33 językach. -**Przechowywanie dziennika:**Ujednolicone przechowywanie dziennika żądań i artefaktów natywnie. -**Ulepszenia modelu:**Dodano wyraźną wartość „contextLength” dla wszystkich modeli opencode-zen. -**i18n i tłumaczenia:**Zintegrowane natywnie tłumaczenia na 33 języki, w tym zastępcze walidacje CI i aktualizacje dokumentacji w języku chińskim (#873, #869).### 🐛 Bug Fixes

-**Mapowanie Qwen OAuth:**Przywrócono zależność `id_token` od `access_token` i włączono dynamiczne wstrzykiwanie punktu końcowego API `resource_url` w celu prawidłowego routingu regionalnego (#900). -**Model Sync Engine:**Przechowywano ścisły wewnętrzny identyfikator dostawcy w procedurach synchronizacji `getCustomModels()` zamiast w formacie aliasu kanału interfejsu użytkownika, zapobiegając błędom wstawiania katalogu SQLite (#903). -**Kod i Kodeks Claude'a:**Standaryzowane, niestrumieniowe, puste odpowiedzi na „(pustą odpowiedź)” w formacie Anthropic, aby zapobiec awariom proxy CLI (#866). -**Routing zgodny z CC:**Rozwiązano zduplikowaną kolizję punktu końcowego `/v1` podczas łączenia ścieżek dla ogólnych bramek Claude Code (#904). -**Panele antygrawitacyjne:**Zablokowano modele z nieograniczoną liczbą przydziałów przed fałszywą rejestracją jako wyczerpane stany limitów „100% wykorzystania” w interfejsie użytkownika użycia dostawcy (nr 857). -**Przekazywanie obrazu Claude'a:**Naprawiono brakujące przejścia bloków obrazu w modelach Claude'a (#898). -**Routing Gemini CLI:**Rozwiązano problemy z blokadą autoryzacji 403 i gromadzeniem treści poprzez odświeżenie identyfikatora projektu za pomocą `loadCodeAssist` (#868). -**Stabilność antygrawitacyjna:**Poprawione listy dostępu do modeli, wymuszone blokady 404, naprawione kaskady 429 blokujące standardowe połączenia i ograniczone tokeny wyjściowe `gemini-3.1-pro` (nr 885). -**Kadencja synchronizacji dostawcy:**Naprawiono ograniczenie częstotliwości synchronizacji dostawcy za pośrednictwem wewnętrznego harmonogramu (#888). -**Optymalizacja pulpitu nawigacyjnego:**Rozwiązano problem zawieszania się interfejsu użytkownika `/dashboard/limits` podczas przetwarzania ponad 70 kont poprzez równoległość fragmentów (#784). -**Wzmocnienie SSRF:**Wymuszone ścisłe filtrowanie zakresu adresów IP SSRF i zablokowanie interfejsu pętli zwrotnej `::1`. -**Typy MIME:**Standaryzowane `mime_type` na Snake_case w celu dopasowania do specyfikacji Gemini API. -**Stabilizacja CI:**Naprawiono błędne analizy/ustawienia Playwright i potwierdzenia żądań, dzięki czemu działania GitHub Actions E2E przebiegają niezawodnie przez zlokalizowane interfejsy użytkownika i elementy sterujące oparte na przełącznikach. -**Testy deterministyczne:**Usunięto elementy przydziału wrażliwe na datę z testów użycia Copilot i dostosowano testy idempotencji/katalogu modelu do połączonego zachowania środowiska wykonawczego. -**Wzmocnienie typu MCP:**Usunięto jawne „dowolne” regresje o zerowym budżecie ze ścieżki rejestracji narzędzia serwerowego MCP. -**Model Sync Engine:**Pominięto destrukcyjne zastąpienie „zamień”, gdy automatyczna synchronizacja dostawcy daje pustą listę modeli, zachowując stabilność katalogów dynamicznych (#899).### 🛠️ Maintenance

-**Logowanie potoku:**Udoskonalono artefakty rejestrowania potoku i wymusza ograniczenia przechowywania (#880). -**Przeróbka AGENTS.md:**Skondensowane z 297 → 153 linii. Dodano wytyczne dotyczące kompilacji/testowania/stylu, przepływy pracy związane z kodem (Prettier, TypeScript, ESLint) i przycięte szczegółowe tabele (#882). -**Integracja gałęzi wydania:**Skonsolidowano aktywne gałęzie funkcji w wersji „release/v3.4.2” na podstawie bieżącej gałęzi „main” i zweryfikowano gałąź za pomocą lint, jednostek, pokrycia, kompilacji i uruchomień E2E w trybie CI. -**Testowanie:**Dodano konfigurację Vitest do testowania komponentów i specyfikacje Playwright do przełączania ustawień. -**Aktualizacje dokumentów:**Rozszerzone pliki readme root, natywnie przetłumaczone dokumenty z języka chińskiego i wyczyszczone przestarzałe pliki.## [3.4.1] - 2026-03-31

> [!OSTRZEŻENIE]
> **WAŻNA ZMIANA: przeprojektowano zmienne środowiskowe rejestrowania, przechowywania i rejestrowania żądań.**
> Przy pierwszym uruchomieniu po aktualizacji OmniRoute archiwizuje starsze logi żądań z `DATA_DIR/logs/`, starszych `DATA_DIR/call_logs/` i `DATA_DIR/log.txt` w `DATA_DIR/log_archives/*.zip`, następnie usuwa przestarzały układ i przełącza na nowy, ujednolicony format artefaktu w ramach `DATA_DIR/dzienniki_połączeń/`.### ✨ New Features

-**.ENV Migration Utility:**Zawiera plik `scripts/migrate-env.mjs` w celu bezproblemowej migracji konfiguracji `<v3.3` do ścisłych ograniczeń sprawdzania poprawności bezpieczeństwa `v3.4.x` (FASE-01), naprawiając awarie uruchamiania spowodowane krótkimi instancjami `JWT_SECRET`. -**Optymalizacja pamięci podręcznej Kiro AI:**Zaimplementowano deterministyczne generowanie `conversationId` (uuidv5), aby umożliwić prawidłowe buforowanie identyfikatora AWS Builder między wywołaniami (#814). -**Przywrócenie i konsolidacja interfejsu użytkownika pulpitu nawigacyjnego:**Rozwiązano logikę paska bocznego pomijającą sekcję debugowania i wyczyszczono ostrzeżenia o routingu Nextjs, przenosząc samodzielne strony `/dashboard/mcp` i `/dashboard/a2a` bezpośrednio do osadzonych komponentów interfejsu użytkownika Endpoint Proxy. -**Artefakty ujednoliconego dziennika żądań:**rejestrowanie żądań przechowuje teraz jeden wiersz indeksu SQLite i jeden artefakt JSON na żądanie w katalogu `DATA_DIR/call_logs/`, z opcjonalnym przechwytywaniem potoku osadzonym w tym samym pliku. -**Język:**Poprawiono tłumaczenie chińskie (nr 855) -**Modele Opencode-Zen:**Dodano 4 bezpłatne modele do rejestru opencode-zen (nr 854) -**Testy:**Dodano testy jednostkowe i E2E dla przełączników ustawień i poprawek błędów (#850)### 🐛 Bug Fixes

-**Przetwarzanie przydziałów 429:**Przeanalizowano czasy resetowania długich przydziałów z ciał błędów, aby uwzględnić prawidłowe wycofania i zapobiec blokadom kont z ograniczoną szybkością (#859) -**Szybkie buforowanie:**Zachowane nagłówki `cache_control` klienta dla wszystkich dostawców protokołu Claude (takich jak Minimax, GLM i Bailian), poprawnie rozpoznające obsługę buforowania (#856) -**Dzienniki synchronizacji modelu:**Zmniejszono spam w dziennikach poprzez zapisywanie „modeli synchronizacji” tylko wtedy, gdy kanał faktycznie modyfikuje listę (#853) -**Przydział dostawcy i analiza tokenów:**Przełączono limity antygrawitacyjne, aby natywnie używać `retrieveUserQuota` i poprawnie mapować ładunki odświeżania tokenów Claude do formularzy zakodowanych w adresie URL (#862) -**Stabilność ograniczająca szybkość:**Uuniwersalizowano architekturę 429 Retry-After parsing, aby ograniczyć czasy odnowienia wywołane przez dostawcę do maksymalnie 24 godzin (#862) -**Renderowanie limitów pulpitu nawigacyjnego:**Przeprojektowano mapowanie przydziałów `/dashboard/limits`, aby renderować natychmiast wewnątrz fragmentów, naprawiając główne opóźnienie zawieszania interfejsu użytkownika na kontach przekraczających 70 aktywnych połączeń (#784) -**Autoryzacja QWEN OAuth:**Zmapowano „id_token” OIDC jako podstawowy token nośnika API dla żądań Dashscope, naprawiając natychmiastowe nieautoryzowane błędy 401 po podłączeniu kont lub odświeżeniu tokenów (#864) -**Stabilność API ZAI:**Wzmocniony kompilator zdarzeń wysyłanych przez serwer, umożliwiający płynne powrót do pustych ciągów, gdy dostawcy DeepSeek przesyłają strumieniowo matematycznie zerową treść podczas faz rozumowania (#871) -**Tłumaczenia Claude Code/Codex:**Chronione konwersje ładunku niestrumieniowego przed pustymi odpowiedziami z wcześniejszych narzędzi Codex, unikając katastrofalnych błędów TypeErrors (#866) -**Renderowanie NVIDIA NIM:**Warunkowo usunięte prefiksy identycznych dostawców dynamicznie wypychane przez modele audio, eliminując zduplikowane struktury znaczników `nim/nim` rzucające 404 na Media Playground (nr 872)### ⚠️ Breaking Changes

-**Układ dziennika żądań:**Usunięto stare, wieloplikowe sesje dziennika żądań `DATA_DIR/logs/` i plik podsumowania `DATA_DIR/log.txt`. Nowe żądania są zapisywane jako pojedyncze artefakty JSON w `DATA_DIR/call_logs/YYYY-MM-DD/`. -**Zmienne środowiskowe rejestrowania:**Zastąpiono `LOG_*`, `ENABLE_REQUEST_LOGS`, `CALL_LOGS_MAX`, `CALL_LOG_PAYLOAD_MODE` i `PROXY_LOG_MAX_ENTRIES` na nowy model konfiguracji `APP_LOG_*` i `CALL_LOG_RETENTION_DAYS`. -**Ustawienie przełączania potoku:**Zastąpiono starsze ustawienie `detailed_logs_enabled` na `call_log_pipeline_enabled`. Nowe szczegóły potoku są osadzone w artefakcie żądania, zamiast być przechowywane jako oddzielne rekordy „request_detail_logs”.### 🛠️ Maintenance

-**Kopia zapasowa starszej wersji dziennika żądań aktualizacji:**Uaktualnienia archiwizują teraz stare układy `data/logs/`, starsze `data/call_logs/` i `data/log.txt` w `DATA_DIR/log_archives/*.zip` przed usunięciem przestarzałej struktury. -**Trwałość wykorzystania przesyłania strumieniowego:**Żądania przesyłania strumieniowego zapisują teraz pojedynczy wiersz „historia_użycia” po zakończeniu zamiast emitować zduplikowany wiersz użycia w toku z pustymi metadanymi stanu. -**Porządkowanie po logowaniu:**Dzienniki potoków nie przechwytują już „ŻĄDANIA ŹRÓDŁA”, wpisy artefaktów żądań honorują teraz „CALL_LOG_MAX_ENTRIES”, a archiwa dzienników aplikacji honorują teraz „APP_LOG_MAX_FILES”.---

## [3.4.0] - 2026-03-31

### Funkcje

-**Analiza wykorzystania subskrypcji:**Dodano śledzenie szeregów czasowych migawek przydziałów, karty Wykorzystanie dostawcy i Combo Health z wizualizacjami ponownych wykresów i odpowiednimi punktami końcowymi API (#847) -**Kontrola kopii zapasowych SQLite:**Nowa flaga env `OMNIROUTE_DISABLE_AUTO_BACKUP` wyłączająca automatyczne kopie zapasowe SQLite (#846) -**Aktualizacja rejestru modeli:**Wstrzyknięto `gpt-5.4-mini` do tablicy modeli dostawcy Kodeksu (nr 756) -**Śledzenie limitów dostawcy:**Śledź i wyświetlaj, kiedy limity stawek dostawcy zostały ostatnio odświeżone na konto (#843)### 🐛 Bug Fixes

-**Qwen Auth Routing:**Przekierowano uzupełnienia Qwen OAuth z interfejsu API DashScope do interfejsu API Web Inference (`chat.qwen.ai`), rozwiązując błędy autoryzacji (#844, #807, #832) -**Pętla Qwen Auto-Retry:**Dodano ukierunkowaną obsługę przekroczenia limitu 429 w `chatCore` chroniącą żądania seryjne -**Codex OAuth Fallback:**Nowoczesne blokowanie wyskakujących okienek przeglądarki nie powoduje już uwięzienia użytkownika; automatycznie powraca do ręcznego wprowadzania adresu URL (#808) -**Odświeżenie tokena Claude'a:**Ścisłe granice Anthropic dotyczące „aplikacji/json” są teraz przestrzegane podczas generowania tokena zamiast zakodowanych adresów URL (#836) -**Schemat wiadomości Kodeksu:**Usunięto purystyczne „wiadomości” wprowadzane z natywnych żądań przejścia, aby uniknąć odrzuceń strukturalnych ze strony nadrzędnej ChatGPT (nr 806) -**Limit rozmiaru wykrywania CLI:**Bezpiecznie podniesiono górną granicę skanowania binarnego węzła ze 100MB do 350MB, umożliwiając prawidłowe wykrycie ciężkich, samodzielnych narzędzi, takich jak Claude Code (229MB) i OpenCode (153MB) przez środowisko wykonawcze VPS (nr 809) -**Środowisko wykonawcze CLI:**Przywrócono zdolność konfiguracji CLI do respektowania ścieżek zastępowania użytkownika (`CLI_{PROVIDER}_BIN`) z pominięciem ścisłych reguł wykrywania związanych ze ścieżkami -**Konflikty nagłówków Nvidia:**Usunięto właściwości `prompt_cache_key` z nagłówków nadrzędnych podczas wywoływania dostawców innych niż Anthropic (#848) -**Przełączanie szybkiego poziomu Codexu:**Przywrócono przełączanie poziomu usługi Codex w trybie jasnym (nr 842) -**Infrastruktura testowa:**Zaktualizowano test „t28-model-catalog-updates”, który błędnie oczekiwał nieaktualnego punktu końcowego DashScope dla natywnego rejestru Qwen---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Rotacja dostawców niestandardowych:**Zintegrowane wewnętrznie narzędzie „getRotatingApiKey” w DefaultExecutor, zapewniające prawidłowe wyzwalanie rotacji „extraApiKeys” dla niestandardowych i kompatybilnych dostawców wyższego szczebla (#815)---

## [3.3.8] - 2026-03-30

### Funkcje

-**Filtrowanie API modeli:**Punkt końcowy `/v1/models` teraz dynamicznie filtruje swoją listę w oparciu o uprawnienia powiązane z `Autoryzacja: Nośnik <token>`, gdy włączony jest ograniczony dostęp (#781) -**Integracja z Qoder:**Natywna integracja z Qoder AI natywnie zastępująca starsze mapowania platformy iFlow (nr 660) -**Śledzenie szybkiej pamięci podręcznej:**Dodano możliwości śledzenia i wizualizację frontonu (karta Statystyki) dla buforowania semantycznego i podpowiedzi w interfejsie pulpitu nawigacyjnego### 🐛 Bug Fixes

-**Rozmiar panelu pamięci podręcznej:**Poprawiono rozmiary układu interfejsu użytkownika i nagłówki kontekstu dla zaawansowanych stron pamięci podręcznej (#835) -**Widoczność paska bocznego debugowania:**Naprawiono problem polegający na tym, że przełącznik debugowania nie wyświetlał/nie ukrywał szczegółów debugowania paska bocznego (#834) -**Prefiks modelu Gemini:**Zmodyfikowano rezerwową przestrzeń nazw, aby prawidłowo kierować przez `gemini-cli/` zamiast `gc/`, aby zachować zgodność ze specyfikacjami nadrzędnymi (#831) -**OpenRouter Sync:**Ulepszona synchronizacja zgodności w celu automatycznego prawidłowego pobierania katalogu dostępnych modeli z OpenRouter (#830) -**Mapowanie ładunków strumieniowych:**Ponowna serializacja pól rozumowania natywnie rozwiązuje konflikt ścieżek aliasów, gdy dane wyjściowe są przesyłane strumieniowo do urządzeń brzegowych---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**Konfiguracja OpenCode:**Zrestrukturyzowano wygenerowany plik `opencode.json`, aby używać schematu opartego na rekordach `@ai-sdk/openai-kompatybilny` z `opcjami` i `modelami` jako mapami obiektów zamiast płaskich tablic, naprawiając błędy sprawdzania poprawności konfiguracji (#816) -**Brakujące klucze i18n:**Dodano brakujący klucz tłumaczenia `cloudflaredUrlNotice` we wszystkich 30 plikach językowych, aby zapobiec błędom konsoli `MISSING_MESSAGE` na stronie Punkt końcowy (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Rozliczanie tokenów:**Bezpieczne uwzględnianie tokenów pamięci podręcznej monitów w obliczeniach danych wejściowych dotyczących historycznego użycia w celu poprawnych odliczeń przydziałów (PR #822)
—**Sondy testowe typu Combo:**Naprawiono fałszywe negatywne wyniki logiki testów kombinacyjnych poprzez rozwiązanie analizy składniowej w celu uzyskania odpowiedzi zawierających wyłącznie rozumowanie i włączenie masowej równoległości za pośrednictwem Promise.all (PR #828) -**Szybkie tunele Docker:**Wbudowane wymagane certyfikaty ca w podstawowym kontenerze środowiska wykonawczego w celu rozwiązania problemów z uruchamianiem Cloudflared TLS i pojawiających się standardowych błędów sieciowych zastępujących ogólne kody zakończenia (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Śledzenie przydziałów Gemini:**Dodano śledzenie przydziałów w interfejsie Gemini w czasie rzeczywistym za pośrednictwem interfejsu API „retrieveUserQuota” (PR #825) -**Panel pamięci podręcznej:**Ulepszono panel pamięci podręcznej, aby wyświetlał natychmiastowe dane dotyczące pamięci podręcznej, trendy 24-godzinne i szacowane oszczędności (PR #824)### 🐛 Bug Fixes

-**Doświadczenie użytkownika:**Usunięto inwazyjne, automatycznie otwierające się pętle modalne OAuth na stronach szczegółowych informacji o jałowym dostawcy (PR #820) -**Aktualizacje zależności:**Naprawiono i zablokowano zależności dla drzew programistycznych i produkcyjnych, w tym Next.js 16.2.1, Recharts i TailwindCSS 4.2.2 (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**Przepływy pracy A2A:**Dodano deterministyczny orkiestrator FSM dla wieloetapowych przepływów pracy agentów. -**Łagodna degradacja:**Dodano nową wielowarstwową strukturę awaryjną, aby zachować podstawową funkcjonalność podczas częściowych przestojów systemu. -**Audyt konfiguracji:**Dodano ścieżkę audytu z wykrywaniem różnic w celu śledzenia zmian i umożliwienia przywracania konfiguracji. -**Kondycja dostawcy:**Dodano śledzenie wygaśnięcia dostawcy z proaktywnymi alertami interfejsu użytkownika dotyczącymi wygasających kluczy API. -**Trasowanie adaptacyjne:**Dodano adaptacyjny detektor wolumenu i złożoności, aby dynamicznie zastępować strategie routingu w oparciu o obciążenie. -**Różnorodność dostawców:**Wdrożono punktację różnorodności dostawców za pomocą entropii Shannona w celu poprawy dystrybucji obciążenia. -**Automatyczne wyłączanie granic:**Dodano przełącznik automatycznego wyłączania zbanowanych kont do panelu Odporność.### 🐛 Bug Fixes

-**Zgodność z Codex i Claude:**Naprawiono błędy interfejsu użytkownika, poprawiono problemy z integracją Codexu bez przesyłania strumieniowego i rozwiązano wykrywanie środowiska wykonawczego CLI w systemie Windows. -**Automatyzacja wydań:**Rozszerzone uprawnienia wymagane do kompilacji aplikacji Electron w GitHub Actions.
—**Środowisko wykonawcze Cloudflare:**naprawiono prawidłowe kody wyjścia izolacji środowiska wykonawczego dla komponentów tunelu Cloudflared.### 🧪 Tests

-**Aktualizacje pakietu testów:**Rozszerzony zakres testów dla detektorów objętości, różnorodności dostawców, audytu konfiguracji i FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**Niezawodność CI/CD:**Poprawione akcje GitHub do stabilnych wersji zależności (`actions/checkout@v4`, `actions/upload-artifact@v4`) w celu ograniczenia niezapowiedzianych wycofań środowiska konstruktora. -**Obrazki zastępcze obrazu:**Zastąpiono dowolne łańcuchy rezerwowe w `ProviderIcon.tsx` jawną walidacją zasobów, aby zapobiec ładowaniu przez interfejs użytkownika komponentów `<Image>` dla plików, które nie istnieją, eliminując błędy `404` w dziennikach konsoli dashboardu (#745). -**Admin Updater:**Dynamiczne wykrywanie instalacji źródłowej dla narzędzia Updater na pulpicie nawigacyjnym. Bezpiecznie wyłącza przycisk „Aktualizuj teraz”, gdy OmniRoute jest budowany lokalnie, a nie przez npm, wyświetlając monit o „git pull” (#743). -**Błąd aktualizacji ERESOLVE:**Wstrzyknięto plik `package.json` zastępując `react`/`react-dom` i włączono `--legacy-peer-deps` w wewnętrznych skryptach automatycznego aktualizatora, aby rozwiązać konflikty drzewa zależności z `@lobehub/ui`.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Tunele Cloudflare:**Integracja szybkiego tunelu Cloudflare ze sterowaniem na pulpicie nawigacyjnym (PR #772). -**Diagnostyka:**Semantyczne obejście pamięci podręcznej na potrzeby testów kombi na żywo (PR #773).### 🐛 Bug Fixes

-**Stabilność przesyłania strumieniowego:**Zastosuj wartość `FETCH_TIMEOUT_MS` do początkowego wywołania `fetch()` żądań przesyłania strumieniowego, aby zapobiec 300-sekundowemu przekroczeniu limitu czasu TCP Node.js powodującemu awarie cichych zadań (#769). -**i18n:**Dodaj brakujące wpisy `windsurf` i `copilot` do `toolDescriptions` we wszystkich 33 plikach ustawień regionalnych (nr 748). -**Audyt kodowania GLM:**Kompletny audyt dostawców naprawiający luki w zabezpieczeniach ReDoS, zmianę rozmiaru okna kontekstu (128k/16k) i synchronizację rejestru modeli (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**Kodeks OpenAI:**Poprawka przetwarzania zastępczego dla elementów „typ: „tekst” zawierających zerowe lub puste zestawy danych, które spowodowały odrzucenie 400 (#742). -**Opencode:**Zaktualizuj wyrównanie schematu do pojedynczego „dostawcy”, aby dopasować je do oficjalnej specyfikacji (#774). -**Gemini CLI:**Wstrzyknij brakujące nagłówki przydziałów użytkownika końcowego, zapobiegając blokadom autoryzacji 403 (#775). -**Odzyskiwanie bazy danych:**Refaktoryzuj wieloczęściowe importy ładunku do surowych binarnych buforowanych tablic, aby ominąć limity maksymalnej treści odwrotnego proxy (nr 770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Stabilizacja wydania**— Sfinalizowano wersję 3.2.9 (diagnostyka kombinacji, bramki jakości, poprawka narzędzia Gemini) i utworzono brakujący tag git. Skonsolidowano wszystkie etapowe zmiany w jednym niepodzielnym zatwierdzeniu wydania.### 🐛 Bug Fixes

-**Test automatycznej aktualizacji**— Naprawiono asercję testową `buildDockerComposeUpdateScript`, aby dopasować nierozwinięte odniesienia do zmiennych powłoki (`$TARGET_TAG`, `${TARGET_TAG#v}`) w wygenerowanym skrypcie wdrażania, dopasowując się do refaktoryzowanego szablonu z wersji 3.2.8. -**Test wyłącznika**— Wzmocniono `combo-circuit-breaker.test.mjs` poprzez wstrzyknięcie `maxRetries: 0`, aby zapobiec zniekształcaniu liczby awarii podczas ponownych prób podczas zmian stanu wyłącznika.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

—**Diagnostyka Combo**— Wprowadzono flagę obejścia testu na żywo („forceLiveComboTest”) umożliwiającą administratorom przeprowadzanie rzeczywistych kontroli stanu poprzedzającego, które omijają wszystkie lokalne mechanizmy wyłącznika automatycznego i stanu przestygnięcia, umożliwiając precyzyjną diagnostykę podczas przestojów w fazie wdrażania (PR #759) -**Bramy jakości**— Dodano automatyczną weryfikację jakości odpowiedzi dla kombinacji i oficjalnie zintegrowano obsługę modelu `claude-4.6` z podstawowymi schematami routingu (PR #762)### 🐛 Bug Fixes

-**Weryfikacja definicji narzędzia**— Naprawiono integrację z interfejsem API Gemini poprzez normalizację typów wyliczeniowych w definicjach narzędzi, zapobiegając błędom parametrów protokołu HTTP 400 na wejściu (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Interfejs użytkownika Docker Auto-Update**— Zintegrowano proces aktualizacji w tle w przypadku wdrożeń Docker Compose. Interfejs użytkownika pulpitu nawigacyjnego teraz płynnie śledzi zdarzenia cyklu życia aktualizacji, łącząc odpowiedzi JSON REST z nakładkami postępu przesyłania strumieniowego SSE, co zapewnia niezawodność w różnych środowiskach. -**Cache Analytics**— Naprawiono mapowanie wizualizacji z zerowymi wskaźnikami poprzez migrację dzienników telemetrycznych Semantic Cache bezpośrednio do scentralizowanego modułu śledzenia SQLite.### 🐛 Bug Fixes

-**Logika uwierzytelniania**— Naprawiono błąd, który powodował, że zapisywanie ustawień panelu kontrolnego lub dodawanie modeli kończyło się niepowodzeniem z powodu błędu 401 Nieautoryzowane, gdy opcja „requireLogin” była wyłączona. Punkty końcowe API teraz poprawnie oceniają przełącznik globalnego uwierzytelniania. Rozwiązano globalne przekierowanie poprzez ponowną aktywację `src/middleware.ts`. -**Wykrywanie narzędzia CLI (Windows)**— Zapobiegnięto krytycznym wyjątkom inicjalizacji podczas wykrywania środowiska CLI poprzez prawidłowe wychwytywanie błędów ENOENT „cross-spawn”. Dodaje jawne ścieżki wykrywania dla `\AppData\Local\droid\droid.exe`. -**Codex Native Passthrough**— Znormalizowane parametry translacji modelu zapobiegające zatruwaniu kontekstu w trybie przekazywania proxy, wymuszające ogólne ograniczenia „store: false” jawnie dla wszystkich żądań pochodzących z Codexu. -**Raportowanie tokenu SSE**— Znormalizowane wykrywanie fragmentu wywołania narzędzia dostawcy „powód_zakończenia”, naprawianie 0% Analityka użycia dla odpowiedzi tylko w strumieniu, w przypadku których brakuje ścisłych wskaźników „<DONE>”. -**Tagi DeepSeek <think>**— Zaimplementowano jawne mapowanie ekstrakcji „<think>” w pliku „responsesHandler.ts”, zapewniając, że strumienie rozumowania DeepSeek są mapowane równoważnie natywnym antropicznym strukturom „<myślenie>”.---

## [3.2.7] - 2026-03-29

### Fixed

-**Bezproblemowe aktualizacje interfejsu użytkownika**: Funkcja „Aktualizuj teraz” w panelu kontrolnym zapewnia teraz przejrzyste informacje zwrotne na żywo za pomocą zdarzeń wysyłanych przez serwer (SSE). Wykonuje instalację pakietów, natywną przebudowę modułów (better-sqlite3), a PM2 uruchamia się ponownie niezawodnie, pokazując programy ładujące w czasie rzeczywistym, zamiast cicho się zawieszać.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API Key Reveal (#740)**— Dodano przepływ kopiowania klucza API o ograniczonym zakresie w Menedżerze Api, chroniony zmienną środowiskową `ALLOW_API_KEY_REVEAL`. -**Kontrola widoczności paska bocznego (#739)**— Administratorzy mogą teraz ukryć dowolne łącze nawigacyjne paska bocznego za pomocą ustawień wyglądu, aby zmniejszyć bałagan wizualny.
—**Ścisłe testowanie kombinacji (#735)**— Ulepszono punkt końcowy kontroli stanu kombinacji, aby wymagał od modeli odpowiedzi tekstowych na żywo, a nie tylko miękkich sygnałów dostępności. -**Szczegółowe dzienniki przesyłane strumieniowo (#734)**— Przełączono szczegółowe rejestrowanie żądań dla strumieni SSE w celu zrekonstruowania ostatecznego ładunku, oszczędzając ogromne ilości rozmiaru bazy danych SQLite i znacząco oczyszczając interfejs użytkownika.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**— Poprawiono logikę nagłówka uwierzytelniania dla modeli `minimax` w OpenCode Go, aby używać `x-api-key` zamiast standardowych tokenów nośnika w protokole `/messages`.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Brak wsparcia dla wdrażania systemu Linux (#732)**— Zintegrowany szablon pakietu `xbps-src` i instrukcje do natywnej kompilacji i instalacji OmniRoute z powiązaniami `better-sqlite3` poprzez cel kompilacji krzyżowej.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Migracja Qoder AI (nr 660)**— Całkowicie przeniesiono starszego głównego dostawcę `iFlow` na `Qoder AI`, zachowując stabilne możliwości routingu API.### 🐛 Bug Fixes

-**Nieprawidłowy argument HTTP 400 ładunku Gemini Tools (#731)**— Zapobiegnięto wstrzykiwaniu tablicy `thoughtSignature` do standardowych sekwencji `functionCall` Gemini blokujących przepływy routingu agentów.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Interfejs użytkownika limitów dostawcy (nr 728)**— Znormalizowana logika limitów przydziałów i etykietowanie danych w interfejsie Limitów.### 🐛 Bug Fixes

-**Podstawowe schematy routingu i wycieki**— Rozszerzony `comboStrategySchema`, aby natywnie wspierać strategie ``pierwsze wypełnienie'' i `p2c`, aby natywnie odblokować złożoną edycję kombinacji.
-**Wyodrębnianie tagów Thinking (CLI)**— Zrestrukturyzowany moduł czyszczenia odpowiedzi tokenów CLI RegEx przechwytujący struktury rozumowania modelu wewnątrz strumieni, co pozwala uniknąć zepsutych ekstrakcji `<thinking>` łamiących format wyjściowy tekstu odpowiedzi. -**Ścisłe egzekwowanie formatu**— Ulepszone wykonywanie czyszczenia potoku, dzięki czemu ma uniwersalne zastosowanie do celów trybu tłumaczenia.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Czteroetapowy potok dziennika żądań (nr 705)**— Zrefaktoryzowana trwałość logów w celu zapisywania kompleksowych ładunków na czterech różnych etapach potoku: żądanie klienta, żądanie przetłumaczonego dostawcy, odpowiedź dostawcy i przetłumaczona odpowiedź klienta. Wprowadzono `streamPayloadCollector` do niezawodnego obcinania strumienia SSE i serializacji ładunku.### 🐛 Bug Fixes

-**Poprawki interfejsu użytkownika mobilnego (#659)**— Zapobiegnięto zakłócaniu układu komponentów tabeli na pulpicie nawigacyjnym w wąskich rzutniach poprzez dodanie odpowiedniego przewijania w poziomie i ograniczenia przepełnienia do `DashboardLayout`. -**Poprawki pamięci podręcznej Claude Prompt (#708)**— Zapewniono, że bloki „cache_control” w pętlach awaryjnych Claude-to-Claude są wiernie zachowywane i bezpiecznie przekazywane z powrotem do modeli Anthropic. -**Definicje narzędzia Gemini (#725)**— Naprawiono błędy translacji schematu podczas deklarowania prostych typów parametrów „obiektu” dla wywoływania funkcji Gemini.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Globalny dostawca zastępczy (#689)**— Kiedy wszystkie modele łączone zostaną wyczerpane (502/503), OmniRoute spróbuje teraz zastosować konfigurowalny globalny model zastępczy, zanim zwróci błąd. Ustaw `globalFallbackModel` w ustawieniach, aby włączyć.### 🐛 Bug Fixes

-**Poprawka nr 721**— Naprawiono pomijanie przypinania kontekstu podczas odpowiedzi na wywołanie narzędzia. W tagach innych niż strumieniowe użyto nieprawidłowej ścieżki JSON (`json.messages` → `json.choices[0].message`). Wstrzykiwanie strumieniowe jest teraz wyzwalane w fragmentach „powód_zakończenia” w przypadku strumieni zawierających tylko wywołanie narzędzi. `injectModelTag()` dołącza teraz syntetyczne komunikaty PIN dla treści innych niż ciągi znaków. -**Poprawka nr 709**— Potwierdzono, że została już naprawiona (wersja 3.1.9) — `system-info.mjs` tworzy katalogi rekurencyjnie. Zamknięte. -**Poprawka nr 707**— Potwierdzono, że została już naprawiona (wersja 3.1.9) — czyszczenie pustych nazw narzędzi w `chatCore.ts`. Zamknięte.### 🧪 Tests

- Dodano 6 testów jednostkowych do przypinania kontekstu z odpowiedziami na wywołania narzędzi (zawartość null, zawartość tablicy, podróż w obie strony, ponowne wstrzyknięcie)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Interfejs zarządzania pamięcią podręczną**— Dodano dedykowany panel semantycznego buforowania pod adresem \`/dashboard/cache\` z ukierunkowanym unieważnianiem interfejsu API i obsługą 31 języków i18n (PR #701 autorstwa @oyi77) -**Śledzenie przydziału GLM**— Dodano śledzenie wykorzystania w czasie rzeczywistym i przydziału sesji dla dostawcy GLM Coding (Z.AI) (PR nr 698 autorstwa @christopher-s) -**Szczegółowe ładunki dziennika**— Przewodowe, pełne, czteroetapowe przechwytywanie ładunku potokowego (oryginalnego, przetłumaczonego, odpowiedzi dostawcy, delt przesyłanych strumieniowo) bezpośrednio do interfejsu użytkownika (PR #705 autorstwa @rdself)### 🐛 Bug Fixes

-**Poprawka nr 708**— Zapobiegnięto krwawieniu tokenów dla użytkowników Claude Code przekierowujących przez OmniRoute poprzez prawidłowe zachowanie natywnych nagłówków \`cache_control\` podczas przekazywania Claude-to-Claude (PR #708 autorstwa @tombii) -**Poprawka nr 719**— Skonfiguruj wewnętrzne granice uwierzytelniania dla \`ModelSyncScheduler\`, aby zapobiec awariom nieuwierzytelnionego demona podczas uruchamiania (PR #719 autorstwa @rdself) -**Poprawka nr 718**— Przebudowane renderowanie plakietek w interfejsie użytkownika Limity dostawcy, zapobiegające nakładaniu się nieprawidłowych granic przydziałów (PR nr 718 autorstwa @rdself) -**Poprawka nr 704**— Naprawiono psucie się funkcji awaryjnych Combo w przypadku błędów polityki treści HTTP 400 uniemożliwiających martwe trasowanie rotacji modelu (PR #704 autor: @rdself)### 🔒 Security & Dependencies

— Zmieniono opcję „ścieżka do wyrażenia regularnego” na „8.4.0” w celu usunięcia luk w zabezpieczeniach robota zależnego (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Poprawka nr 706**— Naprawiono zastępcze renderowanie ikon spowodowane przez zastąpienie „font-sans” Tailwind V4 poprzez zastosowanie „!important” do „.material-symbols-outlined”. -**Poprawka nr 703**— Naprawiono uszkodzone strumienie GitHub Copilot, włączając tłumaczenie „odpowiedzi” na format „openai” dla dowolnych niestandardowych modeli wykorzystujących „apiFormat: „responses””. -**Poprawka nr 702**— Zastąpiono śledzenie zryczałtowanej stawki dokładnymi kalkulacjami cen DB zarówno dla odpowiedzi przesyłanych strumieniowo, jak i nie przesyłanych strumieniowo. -**Poprawka nr 716**— Poprawiono stan translacji wywołań narzędzi Claude, poprawnie analizując argumenty przesyłane strumieniowo i zapobiegając powtarzaniu pola `id` przez fragmenty `tool_calls` OpenAI.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Wymuszenie schematu**— Automatyczne wymuszanie numerycznych ograniczeń schematu JSON w postaci ciągów znaków (np. „minimum”: „1”) do odpowiednich typów, zapobiegając 400 błędom ze strony Cursor, Cline i innych klientów wysyłających zniekształcone schematy narzędzi. -**Opis narzędzia Odkażanie**— Upewnij się, że opisy narzędzi są zawsze ciągami znaków; konwertuje opisy „null”, „niezdefiniowane” lub numeryczne na puste ciągi znaków przed wysłaniem do dostawców. -**Przycisk Wyczyść wszystkie modele**— Dodano tłumaczenia i18n dla akcji dostawcy „Wyczyść wszystkie modele” we wszystkich 30 językach. -**Eksport uwierzytelniania Codex**— Dodano przyciski eksportu „auth.json” Codexu i przyciski Apply-Local dla bezproblemowej integracji z CLI. -**Uwagi dotyczące Windsurf BYOK**— Dodano oficjalne ostrzeżenia o ograniczeniach do karty narzędzi Windsurf CLI dokumentującej ograniczenia BYOK.### 🐛 Bug Fixes

-**Poprawka nr 709**— `system-info.mjs` nie ulega już awarii, gdy katalog wyjściowy nie istnieje (dodano `mkdirSync` z flagą rekurencyjną). -**Poprawka nr 710**— Singleton `TaskManager` A2A używa teraz `globalThis`, aby zapobiec wyciekom stanu podczas rekompilacji tras API Next.js w trybie deweloperskim. Zaktualizowano zestaw testów E2E, aby z wdziękiem obsługiwać 401. -**Poprawka nr 711**— Dodano specyficzne dla dostawcy egzekwowanie limitu `max_tokens` dla żądań nadrzędnych. -**Poprawka #605 / #592**— Usuń przedrostek `proxy_` z nazw narzędzi w odpowiedziach Claude'a nie przesyłanych strumieniowo; naprawiono adres URL sprawdzający LongCat. -**Maksymalny limit dzienników połączeń**— Ulepszona funkcja `getMaxCallLogs()` z warstwą buforowania, obsługą env var (`CALL_LOGS_MAX`) i integracją ustawień DB.### 🧪 Tests

- Rozszerzono zestaw testów z 964 → 1027 testów (63 nowe testy)
- Dodano `schema-coercion.test.mjs` — 9 testów dla wymuszenia pola numerycznego i oczyszczania opisu narzędzia
- Dodano `t40-opencode-cli-tools-integration.test.mjs` — testy integracji OpenCode/Windsurf CLI
  — Ulepszona gałąź testów funkcji z kompleksowymi narzędziami pokrycia### 📁 New Files

| Plik                                                     | Cel                                                       |
| -------------------------------------------------------- | --------------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Schemat przymusu i opis narzędzi narzędzia do sanityzacji |
| `testy/jednostka/schemat-coercion.test.mjs`              | Testy jednostkowe pod kątem przymusu schematu             |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | Testy integracji narzędzia CLI                            |
| `PLAN_POKRYCIA.md`                                       | Dokument dotyczący planowania zasięgu testów              | ### 🐛 Bug Fixes |

-**Przekazywanie buforowania Claude Prompt**— Naprawiono usuwanie znaczników cache_control w trybie przekazywania Claude (Claude → OmniRoute → Claude), co powodowało, że użytkownicy Claude Code wyczerpywali swój limit interfejsu API Anthropic 5–10 razy szybciej niż w przypadku połączeń bezpośrednich. OmniRoute zachowuje teraz znaczniki cache_control klienta, gdy zarówno sourceFormat, jak i targetFormat mają wartość Claude, zapewniając prawidłowe działanie szybkiego buforowania i radykalnie zmniejszając zużycie tokenów.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Rdzeń platformy:**Wdrożono globalną obsługę stanu ukrytych modeli i kombinacji, zapobiegając zaśmiecaniu katalogu lub wyciekom do podłączonych agentów MCP (#681). -**Stabilność:**Poprawione awarie przesyłania strumieniowego związane z niepowodzeniem integracji natywnego dostawcy oprogramowania antygrawitacyjnego z powodu nieobsłużonych tablic stanu niezdefiniowanego (#684). -**Synchronizacja lokalizacji:**Wdrożono całkowicie przebudowany synchronizator „i18n” wykrywający brakujące zagnieżdżone właściwości JSON i dopasowujący kolejno 30 ustawień regionalnych (#685).## [3.1.7] - 27.03.2026 r.### 🐛 Bug Fixes

-**Stabilność przesyłania strumieniowego:**Naprawiono zwracanie przez „hasValuableContent” wartości „niezdefiniowany” dla pustych fragmentów w strumieniach SSE (#676). -**Wywoływanie narzędzi:**Naprawiono problem w `sseParser.ts`, w wyniku którego niestrumieniowe odpowiedzi Claude z wieloma wywołaniami narzędzi powodowały utratę `id` kolejnych wywołań narzędzi z powodu nieprawidłowej deduplikacji opartej na indeksie (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Przywrócenie natywnej nazwy narzędzia Claude**— Nazwy narzędzi takie jak „TodoWrite” nie są już poprzedzane przedrostkiem „proxy\_” w odpowiedziach przekazujących Claude (zarówno przesyłanych strumieniowo, jak i nie przesyłanych strumieniowo). Obejmuje pokrycie testów jednostkowych (PR nr 663 autorstwa @coobabm) -**Wyczyść czyszczenie aliasów wszystkich modeli**— Przycisk „Wyczyść wszystkie modele” usuwa teraz także powiązane aliasy modeli, zapobiegając powstawaniu modeli duchów w interfejsie użytkownika (PR #664 autorstwa @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Automatyczne zanikanie wycofywania**— Konta z ograniczoną szybkością są teraz automatycznie odzyskiwane po wygaśnięciu okna odnowienia, naprawiając impas, w którym wysoki poziom „backoffLevel” trwale pozbawiał priorytety kont (PR #657 autorstwa @brendandebeasi)### 🌍 i18n

-**Przeróbka tłumaczenia na język chiński**— Kompleksowe przepisanie `zh-CN.json` z poprawioną dokładnością (PR nr 658 autorstwa @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Poprawka zastąpienia przesyłania strumieniowego**— Wyraźne „strumień: prawda” w treści żądania ma teraz priorytet nad nagłówkiem „Akceptuj: aplikacja/json”. Klienci wysyłający oba będą poprawnie otrzymywać odpowiedzi przesyłane strumieniowo SSE (#656)### 🌍 i18n

-**Ulepszenia czeskich ciągów**— Udoskonalona terminologia w pliku `cs.json` (PR nr 655 autorstwa @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 brakujących kluczy tłumaczeniowych**dodano do `en.json` i 12 języków (PR #652 autorstwa @zen0bit) -**Zaktualizowano dokumentację w języku czeskim**— przewodniki CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT (PR #652) -**Skrypty sprawdzające tłumaczenie**— `check_translations.py` i `validate_translation.py` dla CI/QA (PR #651 autorstwa @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Krytyczny: Regresja wywołań narzędzi**— Naprawiono błędy `proxy_Bash` poprzez wyłączenie przedrostka nazwy narzędzia `proxy_` w ścieżce przejścia Claude. Nazwy narzędzi takich jak `Bash`, `Read`, `Write` zostały zmienione na `proxy_Bash`, `proxy_Read` itp., co spowodowało, że Claude je odrzucił (#618) -**Dokumentacja blokady konta Kiro**— Udokumentowana jako fałszywie pozytywna w zakresie zapobiegania oszustwom AWS, a nie problem z OmniRoute (nr 649)### 🧪 Tests

-**936 testów, 0 niepowodzeń**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Metadane możliwości widzenia**: Dodano `capabilities.vision`, `input_modalities` i `output_modalities` do wpisów `/v1/models` dla modeli z funkcją widzenia (PR #646) -**Modele Gemini 3.1**: Dodano `gemini-3.1-pro-preview` i `gemini-3.1-flash-lite-preview` do dostawcy antygrawitacji (nr 645)### 🐛 Bug Fixes

-**Błąd Ollama Cloud 401**: Naprawiono nieprawidłowy podstawowy adres URL API — zmieniono z `api.ollama.com` na oficjalny `ollama.com/v1/chat/completions` (#643) -**Ponowna próba wygasłego tokenu**: Dodano ograniczoną ponowną próbę z wykładniczym wycofywaniem (5 → 10 → 20 min) dla wygasłych połączeń OAuth zamiast ich stałego pomijania (PR #647)### 🧪 Tests

-**936 testów, 0 niepowodzeń**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**Szablony problemów z GitHub**: Dodano ustandaryzowane raporty o błędach, prośby o funkcje i szablony problemów z konfiguracją/proxy (nr 641) -**Wyczyść wszystkie modele**: Dodano przycisk „Wyczyść wszystkie modele” do strony szczegółów dostawcy z obsługą i18n w 29 językach (#634)### 🐛 Bug Fixes

-**Konflikt ustawień regionalnych (`in.json`)**: Zmieniono nazwę pliku ustawień regionalnych w języku hindi z `in.json` (indonezyjski kod ISO) na `hi.json`, aby naprawić konflikty w tłumaczeniu w Weblate (#642) -**Kodeks pustych nazw narzędzi**: Przeniesiono oczyszczanie nazw narzędzi przed natywnym przejściem Kodeksu, naprawiając 400 błędów od dostawców zewnętrznych, gdy narzędzia miały puste nazwy (#637) -**Artefakty nowej linii podczas przesyłania strumieniowego**: Dodano opcję „collapseExcessiveNewlines” do narzędzia oczyszczania odpowiedzi, zwijającego ciągi ponad 3 kolejnych znaków nowej linii z myślących modeli w standardowy podwójny znak nowej linii (#638) -**Claude Reasoning Effort**: Przekonwertowano parametr OpenAI „reasoning_effort” na natywny blok budżetowy Claude’a „thinking” we wszystkich ścieżkach żądań, łącznie z automatyczną korektą „max_tokens” (#627) -**Qwen Token Refresh**: Zaimplementowano proaktywne odświeżanie tokenów OAuth przed wygaśnięciem (bufor 5-minutowy), aby zapobiec niepowodzeniu żądań w przypadku korzystania z tokenów krótkotrwałych (#631)### 🧪 Tests

-**936 testów, 0 awarii**(+10 testów od wersji 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**Tokeny NaN w kodzie Claude'a / odpowiedziach klientów (#617):**

- `sanitizeUsage()` odwzorowuje teraz krzyżowo `input_tokens` → `prompt_tokens` i `output_tokens` → `completion_tokens` przed filtrem białej listy, naprawiając odpowiedzi pokazujące liczbę tokenów NaN/0, gdy dostawcy zwracają nazwy pól użycia w stylu Claude### Bezpieczeństwo

- Zaktualizowano pakiet `yaml` w celu naprawienia luki w zabezpieczeniach związanej z przepełnieniem stosu (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

— Zamknięto #613 (Codestral — rozwiązano za pomocą obejścia dostawcy niestandardowego)
— Skomentowano #615 (podwójny punkt końcowy OpenCode — zapewniono obejście, śledzone jako żądanie funkcji)
— Skomentowano #618 (widoczność wywołań narzędzi — żądanie testu v3.0.9)
— Skomentowano #627 (poziom wysiłku — już obsługiwany)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Błędy tłumaczenia dla dostawców formatu OpenAI w Claude CLI (#632):**

- Obsługa formatu tablicy `reasoning_details[]` z StepFun/OpenRouter — konwertuje do `reasoning_content`
- Obsługa aliasu pola „reasoning” od niektórych dostawców → znormalizowane do „reasoning_content”
- Nazwy pól użycia między mapami: `input_tokens`↔`prompt_tokens`, `output_tokens`↔`completion_tokens` w `filterUsageForFormat`
- Napraw `extractUsage`, aby akceptować zarówno `input_tokens`/`output_tokens`, jak i `prompt_tokens`/`completion_tokens` jako prawidłowe pola użycia
- Dotyczy zarówno ścieżek strumieniowych (`sanitizeStreamingChunk`, tłumacz `openai-to-claude.ts`), jak i ścieżek niestrumieniowych (`sanitizeMessage`).---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Odświeżanie tokena antygrawitacyjnego:**Naprawiono błąd „brak_sekret_klienta” dla użytkowników z zainstalowanym npm — wpis „clientSecretDefault” był pusty w rejestrze dostawców, co powodowało, że Google odrzucał żądania odświeżenia tokena (#588) -**Modele OpenCode Zen:**Dodano `modelsUrl` do wpisu rejestru OpenCode Zen, aby funkcja „Importuj z /models” działała poprawnie (#612) -**Artefakty podczas przesyłania strumieniowego:**Naprawiono nadmierne znaki nowej linii pozostawione w odpowiedziach po usunięciu podpisu znacznika myślenia (#626) -**Zastępczy serwer proxy:**Dodano automatyczną ponowną próbę bez serwera proxy w przypadku awarii przekaźnika SOCKS5 -**Test proxy:**Testowy punkt końcowy rozpoznaje teraz prawdziwe poświadczenia z bazy danych za pośrednictwem proxyId### ✨ New Features

-**Wybór konta/klucza placu zabaw:**Stałe, zawsze widoczne menu rozwijane umożliwiające wybór kont/kluczy konkretnego dostawcy do testów — pobiera wszystkie połączenia przy uruchomieniu i filtruje według wybranego dostawcy -**Modele dynamiczne narzędzi CLI:**Wybór modelu jest teraz dynamicznie pobierany z API `/v1/models` — dostawcy tacy jak Kiro pokazują teraz pełny katalog modeli -**Lista modeli antygrawitacyjnych:**Zaktualizowano o Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; włączono „passthroughModels” dla dynamicznego dostępu do modelu (#628)### 🔧 Maintenance

— Połączony PR #625 — Dostawca ogranicza poprawkę tła w trybie jasnym---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Limity/Proxy:**Naprawiono limit pobierania Kodeksu dla kont za serwerami proxy SOCKS5 — odświeżanie tokena odbywa się teraz w kontekście proxy -**CI:**Naprawiono błąd potwierdzenia testu integracji „v1/models” w środowiskach CI bez połączeń z dostawcami -**Ustawienia:**Przycisk testu proxy wyświetla teraz natychmiastowe wyniki sukcesu/porażki (wcześniej ukryty za danymi o stanie zdrowia)### ✨ New Features

-**Plac zabaw:**Dodano menu wyboru konta — testuj poszczególne połączenia indywidualnie, jeśli dostawca ma wiele kont### 🔧 Maintenance

— Połączono PR #623 — korekta ścieżki podstawowego adresu URL interfejsu API LongCat---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Interfejs z ograniczeniami:**Dodano funkcję grupowania tagów do panelu połączeń, aby poprawić organizację wizualną kont z niestandardowymi tagami.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Przesyłanie strumieniowe:**Naprawiono uszkodzenie stanu `TextDecoder` w kombinacji `sanitize` TransformStream, które powodowało zniekształcenie sygnału wyjściowego SSE odpowiadającego znakom wielobajtowym (PR #614) -**Interfejs dostawcy:**Bezpiecznie renderuj znaczniki HTML w podpowiedziach błędów połączenia dostawcy za pomocą `dangerouslySetInnerHTML` -**Ustawienia proxy:**Dodano brakujące właściwości treści ładunku „nazwa użytkownika” i „hasło”, umożliwiające pomyślną weryfikację uwierzytelnionych serwerów proxy z poziomu pulpitu nawigacyjnego. -**API dostawcy:**Powiązany wyjątek programowy powraca do `getCodexUsage`, zapobiegając błędom API HTTP 500 w przypadku niepowodzenia pobierania tokenu---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Modele automatycznej synchronizacji:**Dodano przełącznik interfejsu użytkownika i punkt końcowy „synchronizacji modeli”, aby automatycznie synchronizować listy modeli według dostawcy przy użyciu harmonogramu zaplanowanych interwałów (PR #597)### 🐛 Bug Fixes

-**Przekroczenia czasu:**Podwyższono domyślne proxy `FETCH_TIMEOUT_MS` i `STREAM_IDLE_TIMEOUT_MS` do 10 minut, aby prawidłowo obsługiwać modele głębokiego rozumowania (takie jak o1) bez przerywania żądań (Poprawka nr 609) -**Wykrywanie narzędzia CLI:**Ulepszone wykrywanie między platformami obsługujące ścieżki NVM, Windows `PATHEXT` (zapobieganie problemom z opakowaniami `.cmd`) i niestandardowe prefiksy NPM (PR #598) -**Dzienniki przesyłania strumieniowego:**Zaimplementowano akumulację delta `tool_calls` w dziennikach odpowiedzi przesyłania strumieniowego, dzięki czemu wywołania funkcji są dokładnie śledzone i utrwalane w bazie danych (PR #603) -**Katalog modeli:**Usunięto zwolnienie z autoryzacji, prawidłowo ukrywając modele `comfyui` i `sdwebui`, gdy żaden dostawca nie jest jawnie skonfigurowany (PR #599)### 🌐 Translations

-**cs:**Poprawione ciągi tłumaczeń na język czeski w całej aplikacji (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

- Dodano pole Tag/Grupa do `EditConnectionModal` (przechowywanego w `providerSpecificData.tag`) bez konieczności migracji schematu bazy danych.
- Połączenia w widoku dostawcy są teraz dynamicznie grupowane według tagów z wizualnymi podziałami.
- Połączenia nieoznaczone pojawiają się jako pierwsze bez nagłówka, a po nich następują oznaczone grupy w kolejności alfabetycznej.
- Grupowanie znaczników jest automatycznie stosowane do sekcji Limity Kodeksu/Pilotu/Antygrawitacji, ponieważ przełączniki znajdują się w wierszach połączeń.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Brakujące plakietki na kartach połączeń:**Naprawiono poprzez użycie `resolveProxyForConnection()` zamiast mapowania statycznego. -**Połączenie testowe wyłączone w trybie zapisanym:**Włączono przycisk Testuj, sprawdzając konfigurację proxy z zapisanej listy. -**Zamrażanie modalne konfiguracji:**Dodano wywołania `onClose()` po zapisaniu/wyczyszczeniu, aby zapobiec zawieszaniu się interfejsu użytkownika. -**Liczenie podwójnego użycia:**`ProxyRegistryManager` teraz chętnie ładuje użycie podczas montowania z deduplikacją według `scope` + `scopeId`. Liczniki użycia zostały zastąpione przyciskiem Test, wyświetlającym wbudowany adres IP/opóźnienie.#### fix(translator): `function_call` prefix stripping

- Naprawiono niekompletną poprawkę z PR #607, w której tylko bloki `tool_use` usuwały przedrostek narzędzia `proxy_` Claude'a. Teraz klienci korzystający z formatu API OpenAI Responses będą również poprawnie otrzymywać narzędzia narzędziowe bez przedrostka `proxy_`.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Naprawiono trzy krytyczne regresje zgłoszone przez użytkowników po uruchomieniu wersji 3.0.0.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Prefiks „proxy\_” dodany przez Claude'a OAuth został usunięty jedynie z odpowiedzi**streamingu**. W trybie**bez przesyłania strumieniowego**`translateNonStreamingResponse` nie miał dostępu do `toolNameMap`, co powodowało, że klienci otrzymywali zniekształcone nazwy narzędzi, takie jak `proxy_read_file` zamiast `read_file`.

**Poprawka:**Dodano opcjonalny parametr „toolNameMap” do „translateNonStreamingResponse” i zastosowano usuwanie prefiksów w procedurze obsługi bloku Claude „tool_use”. `chatCore.ts` przechodzi teraz przez mapę.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI nie udostępnia `GET /v1/models`. Ogólny walidator `validateOpenAICompatibleProvider` przeszedł do awaryjnego uzupełniania czatu tylko wtedy, gdy ustawiono `validationModelId`, czego LongCat nie konfiguruje. Spowodowało to niepowodzenie weryfikacji dostawcy i wyświetlenie wprowadzającego w błąd błędu podczas dodawania/zapisywania.

**Poprawka:**Dodano `longcat` do mapy specjalistycznych walidatorów, sprawdzając bezpośrednio `/chat/completions` i traktując każdą odpowiedź inną niż uwierzytelniona jako przepustkę.#### fix(translator): normalize object tool schemas for Anthropic (#595)

Narzędzia MCP (np. `pencil`, `computer_use`) przekazują definicje narzędzi z `{type:"object"}`, ale bez pola `właściwości`. Interfejs API Anthropic odrzuca je z powodu: „brakujących właściwości schematu obiektu”.

**Poprawka:**W `openai-to-claude.ts` wstrzyknij `properties: {}` jako bezpieczne ustawienie domyślne, gdy `type` to ``obiekt'' i `właściwości` jest nieobecne.---

### 🔀 Community PRs Merged (2)

| PR       | Autor   | Podsumowanie                                                                                      |
| -------- | ------- | ------------------------------------------------------------------------------------------------- | --- |
| **#589** | @flobo3 | docs(i18n): popraw tłumaczenie rosyjskie dla Playground i Testbed                                 |
| **#591** | @rdself | fix(ui): popraw kontrast trybu jasnego w trybie limitów dostawcy i wyświetlanie na poziomie planu | --- |

### ✅ Issues Resolved

`#592` `#595` `#605`---

### 🧪 Tests

-**926 testów, 0 niepowodzeń**(bez zmian od wersji 3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Największa wersja w historii.**Od 36 dostawców w wersji 2.9.5 do**ponad 67 dostawców**w wersji 3.0.0 — z serwerem MCP, protokołem A2A, silnikiem automatycznego łączenia, ikonami dostawców, interfejsem API Registered Keys, 926 testami i wkładem**12 członków społeczności**w**10 połączonych PR**.
>
> Skonsolidowane od wersji 3.0.0-rc.1 do rc.17 (17 wersji kandydatów do wydania w ciągu 3 dni intensywnego rozwoju).---

### 🆕 New Providers (+31 since v2.9.5)

| Dostawca                                         | Alias ​​               | Poziom         | Notatki                                                                                                      |
| ------------------------------------------------ | ---------------------- | -------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **OpenCode Zen**                                 | `opencode-zen`         | Bezpłatne      | 3 modele poprzez `opencode.ai/zen/v1` (PR #530 autorstwa @kang-heewon)                                       |
| **OpenCode Go**                                  | `opencode-go`          | Płatne         | 4 modele za pośrednictwem `opencode.ai/zen/go/v1` (PR nr 530 autorstwa @kang-heewon)                         |
| **Sztuczna inteligencja LongCata**               | `LC`                   | Bezpłatne      | 50 mln tokenów/dzień (Flash-Lite) + 500 tys./dzień (czat/myślenie) podczas publicznej wersji beta            |
| **Zapylanie AI**                                 | `pol`                  | Bezpłatne      | Nie jest potrzebny klucz API — GPT-5, Claude, Gemini, DeepSeek V3, Lama 4 (1 żądanie/15 s)                   |
| **Sztuczna inteligencja pracowników Cloudflare** | `cf`                   | Bezpłatne      | 10 tys. neuronów dziennie — ~150 odpowiedzi LLM lub 500 s Dźwięk szeptu, wnioskowanie krawędziowe            |
| **Skalowana sztuczna inteligencja**              | `scw`                  | Bezpłatne      | 1 mln darmowych tokenów dla nowych kont — zgodny z UE/RODO (Paryż)                                           |
| **API AI/ML**                                    | `cel`                  | Bezpłatne      | Bezpłatne kredyty o wartości 0,025 USD dziennie — ponad 200 modeli za pośrednictwem jednego punktu końcowego |
| **Puter AI**                                     | `pu`                   | Bezpłatne      | Ponad 500 modeli (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                                   |
| **Chmura Alibaba (DashScope)**                   | `ali`                  | Płatne         | Międzynarodowe + Chiny punkty końcowe poprzez `alicode`/`alicode-intl`                                       |
| **Plan kodowania Alibaba**                       | `bcp`                  | Płatne         | Alibaba Model Studio z interfejsem API zgodnym z Anthropic                                                   |
| **Kodowanie Kimi (klucz API)**                   | `kmca`                 | Płatne         | Dedykowany dostęp Kimi oparty na kluczu API (niezależny od OAuth)                                            |
| **Kodowanie MiniMax**                            | `minimax`              | Płatne         | Międzynarodowy punkt końcowy                                                                                 |
| **MiniMax (Chiny)**                              | `minimax-cn`           | Płatne         | Punkt końcowy specyficzny dla Chin                                                                           |
| **Z.AI (GLM-5)**                                 | `zai`                  | Płatne         | Modele GLM nowej generacji Zhipu AI                                                                          |
| **Sztuczna inteligencja wierzchołków**           | `wierzchołek`          | Płatne         | Google Cloud — konto usługi JSON lub OAuth access_token                                                      |
| **Chmura Ollama**                                | `ollamacloud`          | Płatne         | Hostowana usługa API Ollama                                                                                  |
| **Syntetyczny**                                  | „syntetyczny”          | Płatne         | Brama modeli przejściowych                                                                                   |
| **Kilowa bramka**                                | `kg`                   | Płatne         | Brama modeli przejściowych                                                                                   |
| **Wyszukiwanie w zakłopotaniu**                  | `wyszukiwanie pplx`    | Płatne         | Dedykowany punkt końcowy oparty na wyszukiwaniu                                                              |
| **Wyszukiwanie Serpera**                         | `serper-wyszukiwanie`  | Płatne         | Integracja API wyszukiwania internetowego                                                                    |
| **Odważne poszukiwania**                         | `odważne wyszukiwanie` | Płatne         | Integracja API Brave Search                                                                                  |
| **Wyszukiwanie egzaminu**                        | `exa-wyszukiwanie`     | Płatne         | Integracja API wyszukiwania neuronowego                                                                      |
| **Wyszukiwanie Tavily**                          | `tavily-search`        | Płatne         | Integracja API wyszukiwania AI                                                                               |
| **NanoBanan**                                    | `nb`                   | Płatne         | API generowania obrazu                                                                                       |
| **JedenaścieLab**                                | `el`                   | Płatne         | Synteza głosu z tekstu na mowę                                                                               |
| **Kartezja**                                     | „kartezja”             | Płatne         | Ultraszybka synteza głosu TTS                                                                                |
| **Graj HT**                                      | `zabawa`               | Płatne         | Klonowanie głosu i TTS                                                                                       |
| **Świat**                                        | „w świecie”            | Płatne         | Czat głosowy postaci AI                                                                                      |
| **WebUI SD**                                     | `sdwebui`              | Własny hosting | Lokalne generowanie obrazu ze stabilną dyfuzją                                                               |
| **Wygodny interfejs**                            | `wygodny`              | Własny hosting | Generowanie oparte na węzłach lokalnego przepływu pracy ComfyUI                                              |
| **Kodowanie GLM**                                | `glm`                  | Płatne         | Punkt końcowy specyficzny dla kodowania BigModel/Zhipu                                                       | **Łącznie: ponad 67 dostawców**(4 bezpłatne, 8 OAuth, 55 kluczy API) + nieograniczona liczba niestandardowych dostawców zgodnych z OpenAI/Anthropic-Compatible.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Programowo generuj i wydawaj klucze API OmniRoute z egzekwowaniem limitów dla poszczególnych dostawców i kont.

| Punkt końcowy                   | Metoda         | Opis                                                     |
| ------------------------------- | -------------- | -------------------------------------------------------- |
| `/api/v1/zarejestrowane-klucze` | `POST`         | Wydaj nowy klucz — surowy klucz zwrócony**tylko raz**    |
| `/api/v1/zarejestrowane-klucze` | `DOBIERZ`      | Lista zarejestrowanych kluczy (zamaskowanych)            |
| `/api/v1/registered-keys/{id}`  | `POBIERZ/USUŃ` | Uzyskaj metadane / Odwołaj                               |
| `/api/v1/quotas/check`          | `DOBIERZ`      | Wstępna weryfikacja kwoty przed wydaniem                 |
| `/api/v1/providers/{id}/limits` | `POBIERZ/PUT`  | Skonfiguruj limity wydawania dla dostawcy                |
| `/api/v1/accounts/{id}/limits`  | `POBIERZ/PUT`  | Skonfiguruj limity wydawania dla konta                   |
| `/api/v1/problemy/raport`       | `POST`         | Zgłaszaj zdarzenia dotyczące limitów do GitHub. Problemy |

**Bezpieczeństwo:**Klucze przechowywane jako skróty SHA-256. Surowy klucz pokazany raz przy tworzeniu, nigdy więcej nie można go odzyskać.#### 🎨 Provider Icons via @lobehub/icons (#529)

Ponad 130 logo dostawców korzystających z komponentów React (SVG) `@lobehub/icons`. Łańcuch zastępczy:**Lobehub SVG → istniejący PNG → ikona ogólna**. Stosowane na stronach Panelu sterowania, Dostawców i Agentów ze standardowym komponentem „ProviderIcon”.#### 🔄 Model Auto-Sync Scheduler (#488)

Automatyczne odświeżanie list modeli dla podłączonych dostawców co**24 godziny**. Uruchamia się podczas uruchamiania serwera. Konfigurowalne poprzez `MODEL_SYNC_INTERVAL_HOURS`.#### 🔀 Per-Model Combo Routing (#563)

Mapuj wzorce nazw modeli (glob) na określone kombinacje w celu automatycznego wyznaczania tras:

- `claude-sonnet*` → kombinacja kodów, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Nowa tabela `model_combo_mappings` z dopasowaniem globu do wyrażenia regularnego
- Sekcja interfejsu użytkownika pulpitu nawigacyjnego: „Reguły routingu modelu” z wbudowanym dodawaniem/edycją/przełączaniem/usuwaniem#### 🧭 API Endpoints Dashboard

Interaktywny katalog, zarządzanie webhookami, przeglądarka OpenAPI – wszystko na jednej stronie z zakładkami w `/dashboard/endpoint`.#### 🔍 Web Search Providers

5 nowych integracji dostawców wyszukiwania:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**— umożliwiając oparte na odpowiedziach sztucznej inteligencji dane internetowe w czasie rzeczywistym.#### 📊 Search Analytics

Nowa zakładka w `/dashboard/analytics` — zestawienie dostawców, współczynnik trafień w pamięci podręcznej, śledzenie kosztów. API: `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Kolumny „max_requests_per_day” i „max_requests_per_minutę” z wymuszaniem przesuwania okna w pamięci zwracają HTTP 429.#### 🎵 Media Playground

Pełny plac zabaw do generowania multimediów w `/dashboard/media`: generowanie obrazu, wideo, muzyka, transkrypcja audio (limit przesyłania 2 GB) i zamiana tekstu na mowę.---

### 🔒 Security & CI/CD

-**Naprawa CodeQL**— Naprawiono ponad 10 alertów: 6 powtórzeń wielomianów, 1 niepewna losowość (`Math.random()` → `crypto.randomUUID()`), 1 wstrzyknięcie polecenia powłoki -**Weryfikacja tras**— schematy ZOD + `validateBody()` na**trasach API 176/176**— wymuszenie CI -**Naprawa CVE**— luka w zabezpieczeniach Dompurify XSS (GHSA-v2wj-7wpq-c8vv) naprawiona poprzez zastąpienie npm -**Spłaszczony**— Zderzony 3.3.3 → 3.4.2 (zanieczyszczenie prototypu CWE-1321) -**Docker**— Ulepszono `docker/setup-buildx-action` v3 → v4---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**— Gemini CLI OAuth: usuń możliwy do usunięcia błąd, gdy w Dockerze brakuje `GEMINI_OAUTH_CLIENT_SECRET` -**#549**— Trasy ustawień CLI rozpoznają teraz prawdziwy klucz API z `keyId` (ciągi niemaskowane) -**#574**— Logowanie nie zawiesza się już po pominięciu konfiguracji hasła kreatora -**#506**— Przepisano wieloplatformowy `machineId` (Windows REG.exe → macOS ioreg → Linux → rezerwowa nazwa hosta)#### Providers & Routing

-**#536**— LongCat AI: naprawiono `baseUrl` i `authHeader` -**#535**— Nadpisanie przypiętego modelu: `body.model` poprawnie ustawione na `pinnedModel` -**#570**— Modele Claude bez prefiksu są teraz rozpatrywane jako dostawcy antropijni -**#585**— Tagi wewnętrzne `<omniModel>` nie wyciekają już do klientów podczas przesyłania strumieniowego SSE -**#493**— Niestandardowe nazewnictwo modeli dostawców nie jest już zniekształcane przez usuwanie prefiksów -**#490**— Ochrona transmisji strumieniowej + pamięci podręcznej kontekstu poprzez zastrzyk `TransformStream` -**#511**— Znacznik `<omniModel>` wstrzyknięty do pierwszego fragmentu treści (nie po `[DONE]`)#### CLI & Tools

-**#527**— Kod Claude'a + pętla Kodeksu: bloki `tool_result` są teraz konwertowane na tekst -**#524**— Konfiguracja OpenCode została zapisana poprawnie (XDG_CONFIG_HOME, format TOML) -**#522**— Menedżer API: usunięto mylący przycisk „Kopiuj zamaskowany klucz”. -**#546**— `--version` zwracający `unknown` w systemie Windows (PR: @k0valik) -**#544**— Bezpieczne wykrywanie narzędzia CLI za pomocą znanych ścieżek instalacji (PR autorstwa @k0valik) -**#510**— Ścieżki Windows MSYS2/Git-Bash są normalizowane automatycznie -**#492**— CLI wykrywa węzeł zarządzany przez `mise`/`nvm`, gdy brakuje `app/server.js`#### Streaming & SSE

-**PR #587**— Przywróć import `resolveDataDir` w odpowiedziTransformer dla kompatybilności Cloudflare Workers (@k0valik) -**PR #495**— Nieskończone oczekiwanie na wąskie gardło 429: porzuć oczekujące zadania po przekroczeniu limitu szybkości (@xandr0s) -**#483**— Zatrzymaj końcowe „dane: null” po sygnale „[DONE]” -**#473**— Strumienie Zombie SSE: limit czasu zmniejszony do 300 s → 120 s w celu szybszego powrotu#### Media & Transcription

-**Transkrypcja**— Deepgram `video/mp4` → `audio/mp4` Mapowanie MIME, automatyczne wykrywanie języka, interpunkcja -**TTS**— Naprawiono wyświetlanie błędu „[obiekt obiektu]” dla zagnieżdżonych błędów w stylu ElevenLabs -**Limity przesyłania**— Transkrypcja multimediów zwiększona do 2 GB (nginx `client_max_body_size 2g` + `maxDuration=300`)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**— kolumna `requested_model` w logach połączeń (migracja 009) -**T02**— Usuń puste bloki tekstu z zagnieżdżonego pliku `tool_result.content` -**T03**— Analizuj nagłówki kwot `x-codex-5h-*` / `x-codex-7d-*` -**T04**— Nagłówek `X-Session-Id` dla zewnętrznego routingu trwałego -**T05**— Trwałość bazy danych z limitem szybkości dzięki dedykowanemu API -**T06**— Konto dezaktywowane → trwała blokada (1 rok odnowienia) -**T07**— Walidacja X-Forwarded-For IP (`extractClientIp()`) -**T08**— Limity sesji na klucz API z wymuszaniem przesuwanego okna -**T09**— Zakresy limitów szybkości Codex i Spark (oddzielne pule) -**T10**— Kredyty wyczerpane → wyraźny 1-godzinny powrót czasu odnowienia -**T11**— `max` wysiłek rozumowania → 131072 żetonów budżetu -**T12**— wpisy cenowe MiniMax M2.7 -**T13**— Poprawka wyświetlania nieaktualnych przydziałów (resetuj świadomość okna) -**T14**— Szybka awaryjna kontrola TCP proxy (≤2 s, buforowanie 30 s) -**T15**— Normalizacja zawartości tablicy dla Anthropic -**T23**— Inteligentne przywracanie wartości przydziału (ekstrakcja nagłówka) -**T24**— Czas odnowienia „503” + mapowanie „406”. -**T25**— Awaryjna walidacja dostawcy -**T29**— Autoryzacja konta usługi Vertex AI JWT -**T33**— Konwersja poziomu myślenia na budżet -**T36**— klasyfikacja błędów „403” vs „429”. -**T38**— Scentralizowane specyfikacje modelu („modelSpecs.ts”) -**T39**— Rezerwowy punkt końcowy dla `fetchAvailableModels` -**T41**— Automatyczne przekierowanie zadań w tle do modeli flash -**T42**— Mapowanie proporcji generowania obrazu#### Other Improvements

-**Niestandardowe nagłówki przesyłania danych dla poszczególnych modeli**— poprzez interfejs konfiguracyjny (PR nr 575 autorstwa @zhangqiang8vip) -**Długość kontekstu modelu**— konfigurowalna w metadanych modelu (PR #578 autorstwa @hijak) -**Usuwanie prefiksu modelu**— opcja usuwania prefiksu dostawcy z nazw modeli (PR #582 autor: @jay77721) -**Wycofanie interfejsu Gemini CLI**— oznaczenie jako przestarzałe z ostrzeżeniem o ograniczeniach Google OAuth -**Parser YAML**— zastąpiono niestandardowy parser przez `js-yaml` w celu poprawnego analizowania specyfikacji OpenAPI -**ZWS v5**— naprawa wycieków HMR (485 połączeń DB → 1, pamięć 2,4 GB → 195 MB) -**Eksport dziennika**— Nowy przycisk eksportu JSON na pulpicie nawigacyjnym z rozwijanym zakresem czasu -**Baner z powiadomieniem o aktualizacji**— strona główna panelu pokazuje, kiedy dostępne są nowe wersje---

### 🌐 i18n & Documentation

-**30 języków**przy 100% parzystości — zsynchronizowano 2788 brakujących kluczy -**Czeski**— Pełne tłumaczenie: 22 dokumenty, 2606 ciągów interfejsu użytkownika (PR: @zen0bit) -**Chiński (zh-CN)**— Pełne ponowne tłumaczenie (PR autorstwa @only4copilot) -**Przewodnik po wdrażaniu maszyn wirtualnych**— przetłumaczony na język angielski jako dokument źródłowy -**Odniesienie do interfejsu API**— Dodano punkty końcowe `/v1/embeddings` i `/v1/audio/mowa` -**Liczba dostawców**— zaktualizowano z 36+/40+/44+ do**67+**w plikach README i wszystkich 30 plikach README i18n---

### 🔀 Community PRs Merged (10)

| PR       | Autor           | Podsumowanie                                                                             |
| -------- | --------------- | ---------------------------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): przywróć import ResolveDataDir dla Cloudflare Workers compat                   |
| **#582** | @jay77721       | feat(proxy): opcja usuwania prefiksów nazwy modelu                                       |
| **#581** | @jay77721       | fix(npm): połącz uwalnianie elektronów z przepływem pracy npm-publish                    |
| **#578** | @hijak          | atut: konfigurowalna długość kontekstu w metadanych modelu                               |
| **#575** | @zhangqiang8vip | wyczyn: nagłówki nadrzędne dla poszczególnych modeli, zgodność z PATCH, wyrównanie czatu |
| **#562** | @coobabm        | poprawka: zarządzanie sesjami MCP, przekazywanie Claude, DetectFormat                    |
| **#561** | @zen0bit        | fix(i18n): Korekty w tłumaczeniu na język czeski                                         |
| **#555** | @k0valik        | fix(sse): scentralizowane `resolveDataDir()` do rozpoznawania ścieżek                    |
| **#546** | @k0valik        | fix(cli): `--version` zwracający `nieznany` w systemie Windows                           |
| **#544** | @k0valik        | fix(cli): bezpieczne wykrywanie narzędzia CLI poprzez ścieżki instalacji                 |
| **#542** | @rdself         | fix(ui): kontrast trybu jasnego, zmienne motywu CSS                                      |
| **#530** | @kang-heewon    | wyczyn: dostawcy OpenCode Zen + Go z `OpencodeExecutor`                                  |
| **#512** | @zhangqiang8vip | wyczyn: zgodność modelu według protokołu (`compatByProtocol`)                            |
| **#497** | @zhangqiang8vip | poprawka: wycieki zasobów HMR w trybie deweloperskim (ZWS v5)                            |
| **#495** | @xandr0s        | poprawka: Wąskie gardło 429 nieskończone oczekiwanie (upuszczanie zadań oczekujących)    |
| **#494** | @zhangqiang8vip | wyczyn: programista MiniMax → poprawka roli systemowej                                   |
| **#480** | @prakersh       | poprawka: ekstrakcja użycia spłukiwania strumienia                                       |
| **#479** | @prakersh       | wyczyn: Kodeks 5.3/5.4 i wpisy cenowe Anthropic                                          |
| **#475** | @only4copilot   | feat(i18n): ulepszone tłumaczenie na język chiński                                       |

**Dziękujemy wszystkim współtwórcom!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 testów, 0 niepowodzeń**(w porównaniu z 821 w wersji 2.9.5)

- +105 nowych testów obejmujących: mapowania kombinacji modeli, zarejestrowane klucze, OpencodeExecutor, dostawca Bailian, walidację tras, klasyfikację błędów, mapowanie współczynników proporcji i wiele więcej---

### 📦 Database Migrations

| Migracja | Opis                                                                            |
| -------- | ------------------------------------------------------------------------------- | --- |
| **008**  | tabele `klucze_zarejestrowane`, `limity_kluczy_dostawcy`, `limity_kluczy_konta` |
| **009**  | Kolumna `requested_model` w `call_logs`                                         |
| **010**  | Tabela `model_combo_mappings` dla routingu combo według modelu                  | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Przełomowe zmiany:**Brak. Wszystkie istniejące konfiguracje, kombinacje i klucze API zostaną zachowane.
> Migracje baz danych 008-010 uruchamiają się automatycznie przy uruchomieniu.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**Naprawa CodeQL**— Naprawiono ponad 10 alertów:

- 6 powtórzeń wielomianów w `provider.ts` / `chatCore.ts` (zastąpione wzorce przemienności `(?:^|/)` dopasowywaniem opartym na segmentach)
- 1 niepewna losowość w `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 zastrzyk polecenia powłoki w `prepublish.mjs` (ucieczka ścieżki `JSON.stringify()`) -**Weryfikacja trasy**— Dodano schematy Zod + `validateBody()` do 5 tras, których brakuje:
- `mapowania kombinacji modeli` (POST, PUT), `webhooks` (POST, PUT), `openapi/try` (POST)
- CI `check:route-validation:t06` teraz przechodzi:**Zatwierdzono 176/176 tras**### 🐛 Bug Fixes

-**#585**— Tagi wewnętrzne `<omniModel>` nie wyciekają już do klientów w odpowiedziach SSE. Dodano oczyszczanie wychodzące `TransformStream` w `combo.ts`### ⚙️ Infrastructure

-**Docker**— Ulepszono `docker/setup-buildx-action` z wersji 3 → v4 (poprawka dotycząca wycofania Node.js 20) -**Oczyszczanie CI**— Usunięto ponad 150 nieudanych/anulowanych przebiegów przepływu pracy### 🧪 Tests

- Zestaw testów:**926 testów, 0 niepowodzeń**(+3 nowe)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Zwiększone limity transkrypcji multimediów
  — Dodano długość kontekstu modelu do metadanych rejestru
  — Dodano niestandardowe nagłówki dla poszczególnych modeli za pośrednictwem interfejsu konfiguracyjnego
- Naprawiono wiele błędów, weryfikację Zoda pod kątem poprawek i rozwiązano różne problemy społeczności.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**— Routing kombinowany na model: mapuje wzorce nazw modeli (glob) na określone kombinacje w celu automatycznego wyznaczania tras

- Nowa tabela `model_combo_mappings` (migracja 010) ze wzorcem, combo_id, priorytetem, włączona
- `resolveComboForModel()` Funkcja DB z dopasowaniem globu do wyrażenia regularnego (wielkość liter nie ma znaczenia, symbole wieloznaczne `*` i `?`)
- `getComboForModel()` w `model.ts`: rozszerza `getCombo()` o rezerwę wzorca modelu
- `chat.ts`: decyzja o routingu sprawdza teraz mapowania kombinacji modeli przed obsługą pojedynczego modelu
- API: `GET/POST /api/model-combo-mappings`, `GET/PUT/DELETE /api/model-combo-mappings/:id`
- Panel: Dodano sekcję „Reguły routingu modelu” do strony Combo z wbudowanym dodawaniem/edycją/przełączaniem/usuwaniem
- Przykłady: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Pełna synchronizacja i18n**: dodano 2788 brakujących kluczy w 30 plikach językowych — wszystkie języki mają teraz 100% parzystości z `en.json` -**Strona agentów i18n**: Sekcja integracji OpenCode w pełni umiędzynarodowiona (tytuł, opis, skanowanie, etykiety do pobrania) -**6 nowych kluczy**dodano do przestrzeni nazw `agentów` dla sekcji OpenCode### 🎨 UI/UX

-**Ikony dostawców**: dodano 16 brakujących ikon dostawców (3 skopiowane, 2 pobrane, 11 utworzonych plików SVG) -**SVG fallback**: Komponent `ProviderIcon` zaktualizowany o strategię 4-warstwową: Lobehub → PNG → SVG → Ikona ogólna -**Odciski palców agentów**: Zsynchronizowane z narzędziami CLI — dodano droida, openclaw, drugiego pilota, kod opencode do listy odcisków palców (łącznie 14)### Bezpieczeństwo

-**Poprawka CVE**: Rozwiązano lukę w zabezpieczeniach Dompurify XSS (GHSA-v2wj-7wpq-c8vv) poprzez zastąpienie npm wymuszając `dompurify@^3.3.2`

- `npm audyt` raportuje teraz**0 luk**### 🧪 Tests

- Zestaw testów:**923 testów, 0 niepowodzeń**(+15 nowych testów mapowania kombinacji modeli)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Autor    | Podsumowanie                                                                                     |
| -------- | -------- | ------------------------------------------------------------------------------------------------ | ------------ |
| **#562** | @coobabm | fix(ux): zarządzanie sesjami MCP, normalizacja przekazywania Claude, modal OAuth, DetectFormat   |
| **#561** | @zen0bit | fix(i18n): Poprawki w tłumaczeniu na język czeski — nazwy metod HTTP i aktualizacje dokumentacji | ### 🧪 Tests |

- Zestaw testów:**908 testów, 0 niepowodzeń**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**rozwiązuje prawdziwy klucz API z `keyId` w trasach ustawień CLI (`codex-settings`, `droid-settings`, `kilo-settings`), aby zapobiec zapisywaniu zamaskowanych ciągów znaków (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Autor    | Podsumowanie                                                                                                                                                                                                                 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik | fix(cli): `--version` zwracający `unknown` w systemie Windows — użyj `JSON.parse(readFileSync)` zamiast importu ESM                                                                                                          |
| **#555** | @k0valik | fix(sse): scentralizowane `resolveDataDir()` do rozpoznawania ścieżek w danych uwierzytelniających, autoCombo, rejestratorze odpowiedzi i rejestratorze żądań                                                                |
| **#544** | @k0valik | fix(cli): bezpieczne wykrywanie narzędzi CLI za pomocą znanych ścieżek instalacji (8 narzędzi) z walidacją dowiązań symbolicznych, sprawdzaniem typu pliku, ograniczaniem rozmiaru, minimalnym środowiskiem w kontroli stanu |
| **#542** | @rdself  | fix(ui): popraw kontrast trybu jasnego — dodaj brakujące zmienne motywu CSS („bg-primary”, „bg-subtle”, „text-primary”) i napraw tylko ciemne kolory w szczegółach dziennika                                                 | ### 🔧 Bug Fixes |

-**Poprawka TDZ w `cliRuntime.ts`**— `validateEnvPath` zostało użyte przed inicjalizacją przy uruchomieniu modułu przez `getExpectedParentPaths()`. Zmieniono kolejność deklaracji, aby naprawić błąd „ReferenceError”. -**Poprawki kompilacji**— Dodano `pino` i `pino-pretty` do `serverExternalPackages`, aby zapobiec przerwaniu przez Turbopack wewnętrznego ładowania procesu roboczego Pino.### 🧪 Tests

- Zestaw testów:**905 testów, 0 niepowodzeń**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**— Regresja kompilacji Electron: obniżono wersję Next.js z `16.1.x` do `16.0.10`, aby wyeliminować niestabilność mieszania modułów Turbopack, która powodowała puste ekrany w pakiecie Electron na komputery stacjonarne. -**Poprawki testów jednostkowych**— Poprawiono dwa nieaktualne twierdzenia testowe (proporcje/rozdzielczość „nanobanana-image-handler”, mapowanie pól „thinking-budget” Gemini „thinkingConfig”), które uległy zmianie po ostatnich zmianach w implementacji. -**#541**— Odpowiedziano na opinie użytkowników dotyczące złożoności instalacji; nie są wymagane żadne zmiany kodu.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**— Vertex AI SA JSON Executor: zaimplementowano przy użyciu biblioteki `jose` do obsługi uwierzytelniania JWT/konta usługi, wraz z konfigurowalnymi regionami w interfejsie użytkownika i automatycznym budowaniem adresów URL modelu partnera. -**T42**— Mapowanie proporcji generowania obrazu: utworzono logikę `sizeMapper` dla ogólnych formatów OpenAI (`size`), dodano natywną obsługę `imagen3` i zaktualizowano punkty końcowe NanoBanana, aby automatycznie wykorzystywać odwzorowane współczynniki proporcji. -**T38**— Scentralizowana specyfikacja modelu: `modelSpecs.ts` utworzona dla limitów i parametrów dla każdego modelu.### 🔧 Improvements

-**T40**— Integracja narzędzi OpenCode CLI: natywna integracja `opencode-zen` i `opencode-go` zakończona we wcześniejszym PR.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**— Czas odnowienia „503” w oczekiwaniu na naprawę + mapowanie „406”: zmapowano „406 Niedopuszczalne” na „503 Usługa niedostępna” z odpowiednimi interwałami odnowienia. -**T25**— Awaryjna walidacja dostawcy: płynny powrót do standardowych modeli walidacji, gdy nie ma określonego `validationModelId`. -**T36**— Udoskonalenie obsługi dostawcy `403` w porównaniu z `429`: wyodrębnione do `errorClassifier.ts` w celu prawidłowego oddzielenia błędów twardych uprawnień (`403`) od limitów szybkości (`429`). -**T39**— Powrót do punktu końcowego dla `fetchAvailableModels`: zaimplementowano trójpoziomowy mechanizm (`/models` -> `/v1/models` -> lokalny katalog ogólny) + `list_models_catalog` Aktualizacje narzędzi MCP w celu odzwierciedlenia `źródła` i `ostrzeżenia`. -**T33**— Konwersja poziomu myślenia na budżet: przekłada jakościowe poziomy myślenia na precyzyjną alokację budżetu. -**T41**— Automatyczne przekierowanie zadań w tle: automatycznie kieruje ciężkie zadania oceny w tle do flashowanych/wydajnych modeli. -**T23**— Inteligentne przywracanie resetu przydziału: dokładnie wyodrębnia wartości nagłówka „x-ratelimit-reset” / „retry-after” lub mapuje statyczne czasy odnowienia.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Aktualizacja z wersji 2.9.5:**16 problemów rozwiązanych · 2 połączone PR społeczności · 2 nowych dostawców · 7 nowych punktów końcowych API · 3 nowe funkcje · Migracja bazy danych 008+009 · 832 testów zakończonych pozytywnie · 15 ulepszeń luk sub2api (ukończono T01–T15).### 🆕 New Providers

| Dostawca         | Alias ​​       | Poziom    | Notatki                                                                              |
| ---------------- | -------------- | --------- | ------------------------------------------------------------------------------------ |
| **OpenCode Zen** | `opencode-zen` | Bezpłatne | 3 modele za pośrednictwem `opencode.ai/zen/v1` (PR #530 autorstwa @kang-heewon)      |
| **OpenCode Go**  | `opencode-go`  | Płatne    | 4 modele za pośrednictwem `opencode.ai/zen/go/v1` (PR nr 530 autorstwa @kang-heewon) |

Obaj dostawcy używają nowego `OpencodeExecutor` z wieloformatowym routingiem (`/chat/completions`, `/messages`, `/responses`, `/models/{model}:generateContent`).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Programowo generuj i wydawaj klucze API OmniRoute z egzekwowaniem limitów dla poszczególnych dostawców i kont.

| Punkt końcowy                         | Metoda        | Opis                                                     |
| ------------------------------------- | ------------- | -------------------------------------------------------- |
| `/api/v1/zarejestrowane-klucze`       | `POST`        | Wydaj nowy klucz — surowy klucz zwrócony**tylko raz**    |
| `/api/v1/zarejestrowane-klucze`       | `DOBIERZ`     | Lista zarejestrowanych kluczy (zamaskowanych)            |
| `/api/v1/registered-keys/{id}`        | `DOBIERZ`     | Uzyskaj kluczowe metadane                                |
| `/api/v1/registered-keys/{id}`        | `USUŃ`        | Unieważnij klucz                                         |
| `/api/v1/registered-keys/{id}/revoke` | `POST`        | Odwołaj (dla klientów bez obsługi DELETE)                |
| `/api/v1/quotas/check`                | `DOBIERZ`     | Wstępna weryfikacja kwoty przed wydaniem                 |
| `/api/v1/providers/{id}/limits`       | `POBIERZ/PUT` | Skonfiguruj limity wydawania dla dostawcy                |
| `/api/v1/accounts/{id}/limits`        | `POBIERZ/PUT` | Skonfiguruj limity wydawania dla konta                   |
| `/api/v1/problemy/raport`             | `POST`        | Zgłaszaj zdarzenia dotyczące limitów do GitHub. Problemy |

**DB — Migracja 008:**Trzy nowe tabele: `registered_keys`, `provider_key_limits`, `account_key_limits`.
**Bezpieczeństwo:**Klucze przechowywane jako skróty SHA-256. Surowy klucz pokazany raz przy tworzeniu, nigdy więcej nie można go odzyskać.
**Typy kwot:**`maxActiveKeys`, `dailyIssueLimit`, `hourlyIssueLimit` na dostawcę i na konto.
**Idempotentność:**Pole `idempotency_key` zapobiega podwójnemu wydaniu. Zwraca `409 IDEMPOTENCY_CONFLICT` jeśli klucz był już używany.
**Budżet na klucz:**`dailyBudget` / `hourlyBudget` — ogranicza liczbę żądań, które klucz może skierować na okno.
**Raportowanie w GitHubie:**Opcjonalne. Ustaw `GITHUB_ISSUES_REPO` + `GITHUB_ISSUES_TOKEN`, aby automatycznie tworzyć problemy z GitHubem w przypadku przekroczenia limitu lub niepowodzenia wydania.#### 🎨 Provider Icons — @lobehub/icons (#529)

Wszystkie ikony dostawców na pulpicie nawigacyjnym korzystają teraz z komponentów React `@lobehub/icons` (ponad 130 dostawców z SVG).
Łańcuch awaryjny:**Lobehub SVG → istniejący `/providers/{id}.png` → ikona ogólna**. Używa odpowiedniego wzorca React `ErrorBoundary`.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute teraz automatycznie odświeża listy modeli podłączonych dostawców co**24 godziny**.

- Działa podczas uruchamiania serwera poprzez istniejący hak `/api/sync/initialize`
- Konfigurowalne za pomocą zmiennej środowiskowej `MODEL_SYNC_INTERVAL_HOURS`
- Obejmuje 16 głównych dostawców
- Rejestruje czas ostatniej synchronizacji w bazie danych ustawień---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 — Gemini CLI OAuth:**Usuń możliwy do usunięcia błąd, gdy brakuje `GEMINI_OAUTH_CLIENT_SECRET` we wdrożeniach Dockera/samohostowanych. Poprzednio pokazywano tajemniczy komunikat „Brak sekretu klienta” od Google. Teraz udostępnia szczegółowe instrukcje `docker-compose.yml` i `~/.omniroute/.env`.#### Providers & Routing

-**#536 — LongCat AI:**Naprawiono `baseUrl` (`api.longcat.chat/openai`) i `authHeader` (`Autoryzacja: Bearer`). -**#535 — Nadpisanie przypiętego modelu:**`body.model` jest teraz poprawnie ustawione na `pinnedModel`, gdy aktywna jest ochrona pamięci podręcznej kontekstu. -**#532 — Sprawdzanie poprawności klucza OpenCode Go:**Teraz używa testowego punktu końcowego `zen/v1` (`testKeyBaseUrl`) — ten sam klucz działa na obu poziomach.#### CLI & Tools

-**#527 — Kod Claude'a + pętla Kodeksu:**Bloki `tool_result` są teraz konwertowane na tekst zamiast upuszczać, zatrzymując nieskończone pętle wyników narzędzi. -**#524 — Zapisywanie konfiguracji OpenCode:**Dodano procedurę obsługi `saveOpenCodeConfig()` (obsługuje XDG_CONFIG_HOME, zapisuje TOML). -**#521 — Logowanie zablokowane:**Logowanie nie zawiesza się już po pominięciu konfiguracji hasła — poprawnie przekierowuje do wejścia na pokład. -**#522 — Menedżer API:**Usunięto mylący przycisk „Kopiuj zamaskowany klucz” (zastąpiony etykietą ikony kłódki). -**#532 — Konfiguracja OpenCode Go:**Program obsługi ustawień przewodnika obsługuje teraz identyfikator narzędzia `opencode`.#### Developer Experience

-**#489 — Antygrawitacja:**brak `googleProjectId` powoduje zwrócenie uporządkowanego błędu 422 ze wskazówkami dotyczącymi ponownego połączenia zamiast tajemniczej awarii. -**#510 — Ścieżki Windows:**Ścieżki MSYS2/Git-Bash (`/c/Program Files/...`) są teraz automatycznie normalizowane do `C:\Program Files\...`. -**#492 — Uruchamianie CLI:**Interfejs CLI `omniroute` wykrywa teraz węzeł zarządzany przez `mise`/`nvm`, gdy brakuje `app/server.js` i wyświetla instrukcje dotyczące ukierunkowanej naprawy.---

### 📖 Documentation Updates

-**#513**— Resetowanie hasła Dockera: `INITIAL_PASSWORD` env var udokumentowane obejście -**#520**— pnpm: udokumentowano krok „pnpm zatwierdza-buduje lepszy sqlite3”---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| PR       | Autor        | Podsumowanie                                                          |
| -------- | ------------ | --------------------------------------------------------------------- | --- |
| **#530** | @kang-heewon | Dostawcy OpenCode Zen + Go z `OpencodeExecutor` i ulepszonymi testami | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**— Trwałość bazy danych z limitem szybkości: `setConnectionRateLimitUntil()`, `isConnectionRateLimited()`, `getRateLimitedConnections()` w `providers.ts`. Istniejąca kolumna „rate_limited_until” jest teraz udostępniana jako dedykowany interfejs API — odświeżanie tokenu OAuth NIE może dotykać tego pola, aby zapobiec pętlom z limitami szybkości. -**T08**— Limit sesji na klucz API: `max_sessions INTEGER DEFAULT 0` dodano do `api_keys` poprzez automatyczną migrację. `sessionManager.ts` zyskuje `registerKeySession()`, `unregisterKeySession()`, `checkSessionLimit()` i `getActiveSessionCountForKey()`. Osoby wywołujące w `chatCore.js` mogą egzekwować limit i zmniejszać w `req.close`. -**T09**— Zakresy limitów szybkości Codex vs Spark: `getCodexModelScope()` i `getCodexRateLimitKey()` w `codex.ts`. Modele standardowe (`gpt-5.x-codex`, `codex-mini`) otrzymują zakres `"codex"`; modele iskrowe (`codex-spark*`) uzyskują zakres ``spark''. Klucze limitu szybkości powinny mieć wartość `${accountId}:${scope}`, aby wyczerpanie jednej puli nie blokowało drugiej.
-**T13**— Poprawka dotycząca wyświetlania nieaktualnych przydziałów: `getEffectiveQuotaUsage(used, resetAt)`zwraca`0`po upływie okna resetowania;`formatResetCountdown(resetAt)`zwraca czytelny dla człowieka ciąg odliczający (np.`"2h 35m"`). Obydwa wyeksportowane z `providers.ts`+`localDb.ts`do wykorzystania w panelu kontrolnym.
-**T14**— Szybka awaria serwera proxy: nowy plik`src/lib/proxyHealth.ts`z`isProxyReachable(proxyUrl, timeoutMs=2000)`(kontrola TCP, limit czasu ≤2 s zamiast 30 s),`getCachedProxyHealth()`, `invalidateProxyHealth()`i`getAllProxyHealthStatuses()`. Wyniki domyślnie buforowane są w ciągu 30 sekund; konfigurowalne poprzez `PROXY_FAST_FAIL_TIMEOUT_MS`/`PROXY_HEALTH_CACHE_TTL_MS`.### 🧪 Tests

- Zestaw testów:**832 testów, 0 niepowodzeń**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**— kolumna `requested_model` w `call_logs` (migracja 009): śledź, który model pierwotnie zażądał klient w porównaniu z rzeczywistym modelem trasowanym. Umożliwia analizę współczynnika powrotów. -**T02**— Usuń puste bloki tekstu z zagnieżdżonego pliku `tool_result.content`: zapobiega błędom Anthropic 400 („bloki treści tekstowej muszą być niepuste”), gdy Claude Code łączy wyniki narzędzia. -**T03**— Analizuj nagłówki `x-codex-5h-*` / `x-codex-7d-*`: `parseCodexQuotaHeaders()` + `getCodexResetTime()` wyodrębnij okna przydziałów Codexu w celu precyzyjnego planowania czasu odnowienia zamiast typowego 5-minutowego powrotu. -**T04**— Nagłówek `X-Session-Id` dla zewnętrznego routingu trwałego: `extractExternalSessionId()` w `sessionManager.ts` odczytuje nagłówki `x-session-id` / `x-omniroute-session` z przedrostkiem `ext:`, aby uniknąć kolizji z wewnętrznymi identyfikatorami sesji SHA-256. Kompatybilny z Nginx (nagłówek z łącznikami). -**T06**— Konto dezaktywowane → trwała blokada: `isAccountDeactivated()` w `accountFallback.ts` wykrywa 401 sygnałów dezaktywacji i stosuje roczny okres odnowienia, aby zapobiec ponownym próbom trwale martwych kont. -**T07**— Walidacja X-Forwarded-For IP: nowy `src/lib/ipUtils.ts` z `extractClientIp()` i `getClientIpFromRequest()` — pomija wpisy `unknown`/in-IP w łańcuchach `X-Forwarded-For` (żądania przekazywane przez Nginx/proxy). -**T10**— Kredyty wyczerpane → wyraźne rozwiązanie awaryjne: `isCreditsExhausted()` w `accountFallback.ts` zwraca 1h czasu odnowienia z flagą `creditsExhausted`, w odróżnieniu od ogólnego ograniczenia szybkości 429. -**T11**— `max` wysiłek rozumowania → 131072 tokenów budżetu: `EFFORT_BUDGETS` i `THINKING_LEVEL_MAP` zaktualizowano; odwrotne mapowanie zwraca teraz „max” w przypadku odpowiedzi obejmujących pełny budżet. Zaktualizowano test jednostkowy. -**T12**— Do tabeli cen dodano wpisy cenowe MiniMax M2.7: `minimax-m2.7`, `MiniMax-M2.7`, `minimax-m2.7-highspeed` dodane do tabeli cen (sub2api PR #1120). Ceny M2.5/GLM-4.7/GLM-5/Kimi już istniały. -**T15**— Normalizacja zawartości tablicy: Pomocnik `normalizeContentToString()` w `openai-to-claude.ts` poprawnie zwija wiadomości systemowe/narzędzia w formacie tablicy do łańcucha przed wysłaniem do Anthropic.### 🧪 Tests

- Zestaw testów:**832 testów, 0 niepowodzeń**(bez zmian w stosunku do wersji rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**— Interfejs API do udostępniania kluczy zarejestrowanych: automatyczne wydawanie kluczy API z egzekwowaniem limitów dla każdego dostawcy i konta

- `POST /api/v1/registered-keys` — wydawaj klucze z obsługą idempotencji
- `GET /api/v1/registered-keys` — lista (zamaskowana) zarejestrowanych kluczy
- `GET /api/v1/registered-keys/{id}` — pobierz kluczowe metadane
- `DELETE /api/v1/registered-keys/{id}` / `POST ../{id}/revoke` — unieważnij klucze
- `GET /api/v1/quotas/check` — wstępna weryfikacja przed wydaniem
- `PUT /api/v1/providers/{id}/limits` — ustaw limity wydawania dostawcy
- `PUT /api/v1/accounts/{id}/limits` — ustaw limity wydawania kont
- `POST /api/v1/issues/report` — opcjonalne raportowanie problemów z GitHubem
- Migracja bazy danych 008: tabele `registered_keys`, `provider_key_limits`, `account_key_limits`---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**— dodano dostawców OpenCode Zen i OpenCode Go (autor: @kang-heewon)

- Nowy `OpencodeExecutor` z routingiem w wielu formatach (`/chat/completions`, `/messages`, `/responses`)
- 7 modeli na obu poziomach---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**— Ikony dostawców używają teraz [@lobehub/icons](https://github.com/lobehub/lobe-icons) z eleganckim zastępczym formatem PNG i komponentem „ProviderIcon” (obsługiwanych jest ponad 130 dostawców) -**#488**— Automatyczna aktualizacja list modeli co 24 godziny za pomocą `modelSyncScheduler` (konfigurowalne za pomocą `MODEL_SYNC_INTERVAL_HOURS`)### 🔧 Bug Fixes

-**#537**— Gemini CLI OAuth: teraz pokazuje wyraźny błąd, który można podjąć, gdy brakuje `GEMINI_OAUTH_CLIENT_SECRET` we wdrożeniach Dockera/samodzielnie hostowanych---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**— Walidacja klucza LongCat AI: naprawiono baseUrl (`api.longcat.chat/openai`) i authHeader (`Authorization: Bearer`) -**#535**— Zastąpienie przypiętego modelu: `body.model` jest teraz ustawione na `pinnedModel`, gdy ochrona pamięci podręcznej kontekstu wykryje przypięty model -**#524**— Konfiguracja OpenCode jest teraz zapisana poprawnie: dodano procedurę obsługi `saveOpenCodeConfig()` (obsługuje XDG_CONFIG_HOME, zapisuje TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**— Logowanie nie blokuje się już po pominięciu konfiguracji hasła (przekierowuje do wejścia) -**#522**— Menedżer API: Usunięto wprowadzający w błąd przycisk „Kopiuj zamaskowany klucz” (zastąpiony etykietką ikony kłódki) -**#527**— Pętla supermocy Claude Code + Codex: bloki „tool_result” są teraz konwertowane na tekst, a nie upuszczane -**#532**— Weryfikacja klucza OpenCode GO API wykorzystuje teraz poprawny punkt końcowy `zen/v1` (`testKeyBaseUrl`) -**#489**— Antygrawitacja: brak `googleProjectId` zwraca ustrukturyzowany błąd 422 ze wskazówkami dotyczącymi ponownego połączenia -**#510**— Windows: Ścieżki MSYS2/Git-Bash (`/c/Program Files/...`) są teraz znormalizowane do `C:\Program Files\...` -**#492**— Interfejs CLI `omniroute` wykrywa teraz `mise`/`nvm`, gdy brakuje `app/server.js` i wyświetla ukierunkowaną poprawkę### Dokumentacja

-**#513**— Resetowanie hasła Dockera: `INITIAL_PASSWORD` env var udokumentowane obejście -**#520**— pnpm: udokumentowano „pnpm zatwierdza-buduje lepszy-sqlite3”### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Nowi dostawcy OpenCode, poprawka dotycząca osadzania poświadczeń, błąd zamaskowanego klucza CLI, poprawka CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**Narzędzia CLI zapisują zamaskowany klucz API w plikach konfiguracyjnych**— Trasy POST `claude-settings`, `cline-settings` i `openclaw-settings` akceptują teraz parametr `keyId` i rozpoznają prawdziwy klucz API z bazy danych przed zapisem na dysk. Zaktualizowano `ClaudeToolCard`, aby wysyłać `keyId` zamiast zamaskowanego wyświetlanego ciągu. Poprawki #523, #526. -**Niestandardowi dostawcy osadzania: błąd „Brak poświadczeń”**— `/v1/embeddings` śledzi teraz `credentialsProviderId` oddzielnie od prefiksu routingu, więc poświadczenia są pobierane z pasującego identyfikatora węzła dostawcy, a nie z publicznego ciągu prefiksu. Naprawia regresję, w wyniku której `google/gemini-embedding-001` i podobne modele dostawców niestandardowych zawsze kończyły się niepowodzeniem z powodu błędu danych uwierzytelniających. Poprawki związane z numerem 532. (PR nr 528 autorstwa @jacob2826) -**Brak wyrażenia regularnego ochrony pamięci podręcznej kontekstu `
` przedrostek**— `CACHE_TAG_PATTERN` w `comboAgentMiddleware.ts` zaktualizowano tak, aby pasował do obu literałów `
` (ukośnik odwrotny-n) i rzeczywisty znak nowej linii U+000A, który strumieniowanie `combo.ts` wstrzykuje wokół znacznika `<omniModel>` po poprawce #515. Poprawki #531.### ✨ New Providers

-**OpenCode Zen**— Bezpłatna bramka poziomu w `opencode.ai/zen/v1` z 3 modelami: `minimax-m2.5-free`, `big-pickle`, `gpt-5-nano` -**OpenCode Go**— Usługa subskrypcji pod adresem `opencode.ai/zen/go/v1` obejmująca 4 modele: `glm-5`, `kimi-k2.5`, `minimax-m2.7` (format Claude), `minimax-m2.5` (format Claude)

- Obaj dostawcy używają nowego `OpencodeExecutor`, który dynamicznie kieruje do `/chat/completions`, `/messages`, `/responses` lub `/models/{model}:generateContent` w zależności od żądanego modelu. (PR #530 autorstwa @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Poprawki błędów — zachowaj klucz pamięci podręcznej Codexu, napraw ucieczkę tagContent JSON, zsynchronizuj status wygasłego tokena z bazą danych.### 🐛 Bug Fixes

-**fix(translator)**: Zachowaj `prompt_cache_key` w API odpowiedzi → Tłumaczenie uzupełnień czatu (#517)
— Pole to sygnał powinowactwa pamięci podręcznej używany przez Codex; jego usunięcie zapobiegało natychmiastowym trafieniom w pamięć podręczną.
Naprawiono w `openai-responses.ts` i `responsesApiHelper.ts`.

-**fix(combo)**: Ucieczka `
` w `tagContent`, więc wstrzyknięty ciąg JSON jest prawidłowy (#515)
— Dosłowne znaki nowej linii szablonu (U+000A) nie mogą zawierać znaków zmiany znaczenia wewnątrz wartości ciągu JSON.
Zastąpione sekwencjami dosłownymi `\n` w `open-sse/services/combo.ts`.

-**fix(usage)**: Synchronizuj status wygasłego tokena z powrotem do bazy danych w przypadku niepowodzenia uwierzytelnienia na żywo (#491)
— Kiedy sprawdzanie limitów i przydziałów na żywo zwraca 401/403, połączenie „testStatus” jest teraz aktualizowane
na „wygasły” w bazie danych, aby strona Dostawcy odzwierciedlała ten sam zdegradowany stan.
Naprawiono w `src/app/api/usage/[connectionId]/route.ts`.---

## [2.9.3] — 2026-03-21

> Sprint: Dodaj 5 nowych bezpłatnych dostawców AI — LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)**: Dodaj LongCat AI (`lc/`) — 50 mln tokenów dziennie za darmo (Flash-Lite) + 500 tys. dziennie (czat/myślenie) podczas publicznej wersji beta. Kompatybilny z OpenAI, standardowe uwierzytelnianie nośnika. -**feat(providers/pollinations)**: Dodaj AI zapyleń (`pol/`) — nie jest wymagany żaden klucz API. Serwery proxy GPT-5, Claude, Gemini, DeepSeek V3, Lama 4 (1 żądanie/15 s za darmo). Niestandardowy moduł wykonawczy obsługuje opcjonalne uwierzytelnianie. -**feat(providers/cloudflare-ai)**: Dodaj AI Cloudflare Workers (`cf/`) — 10 tys. neuronów dziennie za darmo (~150 odpowiedzi LLM lub dźwięk szeptu 500s). Ponad 50 modeli na całym świecie. Niestandardowy moduł wykonawczy tworzy dynamiczny adres URL z „accountId” na podstawie poświadczeń. -**feat(providers/scaleway)**: Dodaj generatywne API Scaleway (`scw/`) — 1 milion darmowych tokenów dla nowych kont. Zgodny z UE/RODO (Paryż). Qwen3 235B, Lama 3.1 70B, Mistral Mały 3.2. -**feat(providers/aimlapi)**: Dodaj API AI/ML (`aiml/`) — darmowe środki w wysokości 0,025 USD dziennie, ponad 200 modeli (GPT-4o, Claude, Gemini, Lama) za pośrednictwem pojedynczego punktu końcowego agregatora.### 🔄 Provider Updates

-**feat(dostawcy/razem)**: Dodaj `hasFree: true` + 3 stale bezpłatne identyfikatory modeli: `Llama-3.3-70B-Instruct-Turbo-Free`, `Llama-Vision-Free`, `DeepSeek-R1-Distill-Llama-70B-Free` -**feat(providers/gemini)**: Dodaj `hasFree: true` + `freeNote` (1500 wymagań dziennie, bez karty kredytowej, aistudio.google.com) -**chore(providers/gemini)**: Zmień nazwę wyświetlaną na `Gemini (Google AI Studio)` dla przejrzystości### ⚙️ Infrastructure

-**feat(executors/pollinations)**: Nowy `PollinationsExecutor` — pomija nagłówek `Authorization`, gdy nie podano klucza API -**feat(executors/cloudflare-ai)**: Nowy `CloudflareAIExecutor` — dynamiczna konstrukcja adresu URL wymaga `accountId` w danych uwierzytelniających dostawcy -**feat(executors)**: Zarejestruj mapowania executorów `pollinations`, `pol`, `cloudflare-ai`, `cf`### Dokumentacja

-**docs(readme)**: Rozszerzony darmowy stos combo do 11 dostawców (0 $ na zawsze) -**docs(readme)**: Dodano 4 nowe sekcje bezpłatnych dostawców (LongCat, Pollinations, Cloudflare AI, Scaleway) z tabelami modeli -**docs(readme)**: Zaktualizowana tabela cen z 4 nowymi wierszami bezpłatnych poziomów -**docs(i18n/pt-BR)**: Zaktualizowana tabela cen + dodane sekcje LongCat/Pollinations/Cloudflare AI/Scaleway w języku portugalskim -**docs(new-features/ai)**: 10 plików specyfikacji zadań + główny plan wdrożenia w `docs/new-features/ai/`### 🧪 Tests

- Zestaw testów:**821 testów, 0 niepowodzeń**(bez zmian)---

## [2.9.2] — 2026-03-21

> Sprint: Napraw transkrypcję multimediów (typ zawartości Deepgram/HuggingFace, wykrywanie języka) i wyświetlanie błędów TTS.### 🐛 Bug Fixes

-**fix(transkrypcja)**: Transkrypcja audio Deepgram i HuggingFace teraz poprawnie mapuje typy MIME `video/mp4` → `audio/mp4` i inne media za pomocą nowego pomocnika `resolveAudioContentType()`. Poprzednio przesyłanie plików `.mp4` zawsze zwracało komunikat „Nie wykryto mowy”, ponieważ Deepgram otrzymywał `Content-Type: video/mp4`. -**fix(transkrypcja)**: Dodano `detect_language=true` do żądań Deepgram — automatycznie wykrywa język audio (portugalski, hiszpański itp.) zamiast domyślnego angielskiego. Naprawiono transkrypcje w językach innych niż angielskie, które zwracały puste lub śmieciowe wyniki. -**fix(transkrypcja)**: Dodano `puntuate=true` do żądań Deepgram w celu uzyskania wyższej jakości wyników transkrypcji z poprawną interpunkcją. -**fix(tts)**: Naprawiono wyświetlanie błędu `[obiekt obiektu]` w odpowiedziach zamiany tekstu na mowę w plikach `audioSpeech.ts` i `audioTranscription.ts`. Funkcja `upstreamErrorResponse()` poprawnie wyodrębnia teraz zagnieżdżone komunikaty tekstowe od dostawców takich jak ElevenLabs, które zwracają `{ error: { message: "...", status_code: 401 } }` zamiast zwykłego ciągu błędów.### 🧪 Tests

- Zestaw testów:**821 testów, 0 niepowodzeń**(bez zmian)### Triaged Issues

-**#508**— Regresja formatu wywołania narzędzia: żądane logi proxy i informacje o łańcuchu dostawców (`needs-info`) -**#510**— Ścieżka sprawdzania stanu interfejsu CLI systemu Windows: żądana informacja o wersji powłoki/węzła (`needs-info`) -**#485**— Wywołania narzędzia Kiro MCP: zamknięte z powodu zewnętrznego problemu z Kiro (nie OmniRoute) -**#442**— Punkt końcowy Baseten/models: zamknięty (udokumentowane ręczne obejście) -**#464**— API udostępniania kluczy: potwierdzone jako element planu działania---

## [2.9.1] — 2026-03-21

> Sprint: Napraw utratę danych SSE omniModel, scal zgodność modelu według protokołu.### Bug Fixes

-**#511**— Krytyczny: Znacznik `<omniModel>` został wysłany po `finish_reason:stop` w strumieniach SSE, powodując utratę danych. Tag jest teraz wstrzykiwany do pierwszego niepustego fragmentu treści, co gwarantuje dostarczenie, zanim pakiety SDK zamkną połączenie.### Merged PRs

-**PR #512**(@zhangqiang8vip): Zgodność modelu według protokołu — `normalizeToolCallId` i `preserveOpenAIDeveloperRole` można teraz skonfigurować dla każdego protokołu klienta (OpenAI, Claude, Responses API). Nowe pole „compatByProtocol” w konfiguracji modelu z walidacją Zoda.### Triaged Issues

-**#510**— Healthcheck_failed interfejsu wiersza polecenia systemu Windows: zażądano informacji o ŚCIEŻCE/wersji -**#509**— Regresja elektronów Turbopacka: błąd źródłowy Next.js, udokumentowane obejścia -**#508**— Czarny ekran macOS: sugerowane obejście `--disable-gpu`---

## [2.9.0] — 2026-03-20

> Sprint: poprawka międzyplatformowego identyfikatora maszyny, limity szybkości dla klucza API, pamięć podręczna kontekstu przesyłania strumieniowego, Alibaba DashScope, analityka wyszukiwania, ZWS v5 i 8 zamkniętych problemów.### ✨ New Features

-**feat(search)**: zakładka Analityka wyszukiwania w `/dashboard/analytics` — zestawienie dostawców, współczynnik trafień w pamięci podręcznej, śledzenie kosztów. Nowe API: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**: Dodano Alibaba Cloud DashScope z niestandardową walidacją ścieżki punktu końcowego — konfigurowalne `chatPath` i `modelsPath` na węzeł (#feat/custom-endpoint-paths) -**feat(api)**: Limity liczby żądań na klucz API — kolumny `max_requests_per_day` i `max_requests_per_minutę` z wymuszaniem przesuwanego okna w pamięci, zwracającym HTTP 429 (#452) -**feat(dev)**: ZWS v5 — naprawa wycieków HMR (485 połączeń DB → 1), pamięć 2,4 GB → 195 MB, singletony `globalThis`, poprawka ostrzeżeń Edge Runtime (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: Wieloplatformowy `machineId` — `getMachineIdRaw()` przepisany z wodospadem try/catch (Windows REG.exe → macOS ioreg → odczyt pliku Linux → nazwa hosta → `os.hostname()`). Eliminuje rozgałęzienia `process.platform`, które wyeliminowało martwy kod pakietu Next.js, naprawianie ``głowy'' nie jest rozpoznawana` w systemie Windows. Naprawiono także #466. -**fix(#493)**: Niestandardowe nazewnictwo modeli dostawców — usunięto nieprawidłowe usuwanie prefiksów w `DefaultExecutor.transformRequest()`, które zniekształcało identyfikatory modeli o zasięgu organizacji, takie jak `zai-org/GLM-5-FP8`. -**fix(#490)**: Ochrona pamięci podręcznej przesyłania strumieniowego + kontekstu — `TransformStream` przechwytuje SSE w celu wstrzyknięcia znacznika `<omniModel>` przed znacznikiem `[DONE]`, włączając ochronę pamięci podręcznej kontekstu dla odpowiedzi przesyłanych strumieniowo. -**fix(#458)**: Sprawdzanie poprawności schematu kombi — pola `system_message`, `tool_filter_regex`, `context_cache_protection` przechodzą teraz weryfikację Zoda przy zapisie. -**fix(#487)**: Czyszczenie karty KIRO MITM — usunięto ZWS_README, wygenerowano `AntigravityToolCard` w celu użycia dynamicznych metadanych narzędzi.### 🧪 Tests

- Dodano testy jednostkowe filtrów narzędzi w formacie antropicznym (PR #397) — 8 testów regresji dla `tool.name` bez opakowania `.function`
- Zestaw testów:**821 testów, 0 niepowodzeń**(w porównaniu z 813)### 📋 Issues Closed (8)

-**#506**— Identyfikator komputera Windows `head` nie został rozpoznany (naprawiono) -**#493**— Niestandardowe nazewnictwo modeli dostawców (naprawiono) -**#490**— Pamięć podręczna kontekstu przesyłania strumieniowego (naprawiono) -**#452**— Limity żądań dla klucza API (zaimplementowane) -**#466**— Błąd logowania do systemu Windows (ta sama podstawowa przyczyna co w przypadku #506) -**#504**— MITM nieaktywny (oczekiwane zachowanie) -**#462**— Gemini CLI PSA (rozwiązane) -**#434**— Awaria aplikacji Electron (duplikat #402)## [2.8.9] — 2026-03-20

> Sprint: Połącz PR społeczności, napraw kartę KIRO MITM, aktualizacje zależności.### Merged PRs

-**PR #498**(@Sajid11194): Napraw awarię identyfikatora komputera z systemem Windows (`unknown\REG.exe`). Zastępuje „identyfikator-komputera węzła” zapytaniami rejestru natywnego systemu operacyjnego.**Zamyka #486.** -**PR #497**(@zhangqiang8vip): Napraw wycieki zasobów HMR w trybie deweloperskim — 485 wyciekających połączeń DB → 1, pamięć 2,4 GB → 195 MB. Singletony `globalThis`, poprawka ostrzegawcza Edge Runtime, test stabilności systemu Windows. (+1168/-338 w 22 plikach) -**PRs #499-503**(Dependabot): Aktualizacje GitHub Actions — `docker/build-push-action@7`, `actions/checkout@6`, `peter-evans/dockerhub-description@5`, `docker/setup-qemu-action@4`, `docker/login-action@4`.### Bug Fixes

-**#505**— Karta KIRO MITM wyświetla teraz instrukcje specyficzne dla narzędzia (`api.anthropic.com`) zamiast tekstu dotyczącego Antygrawitacji. -**#504**— Odpowiedź zawiera wyjaśnienie UX (oczekiwane zachowanie MITM „Inactive”, gdy serwer proxy nie jest uruchomiony).---

## [2.8.8] — 2026-03-20

> Sprint: Napraw awarię testu wsadowego OAuth, dodaj przycisk „Testuj wszystko” do stron poszczególnych dostawców.### Bug Fixes

-**Awaria testu wsadowego OAuth**(ERR_CONNECTION_REFUSED): Zastąpiono sekwencyjną pętlę for limitem współbieżności 5 połączeń + 30 s limitu czasu na połączenie poprzez `Promise.race()` + `Promise.allSettled()`. Zapobiega awariom serwera podczas testowania dużych grup dostawców OAuth (ponad 30 połączeń).### Funkcje

-**Przycisk „Testuj wszystko” na stronach dostawców**: Na stronach poszczególnych dostawców (np. `/providers/codex`) wyświetla się teraz przycisk „Testuj wszystko” w nagłówku Połączenia, gdy istnieje ponad 2 połączenia. Używa `POST /api/providers/test-batch` z `{mode: "provider", ProviderId}`. Wyniki wyświetlane w trybie modalnym z podsumowaniem pass/fail i diagnostyką poszczególnych połączeń.---

## [2.8.7] — 2026-03-20

> Sprint: Scal PR #495 (spadek wąskiego gardła 429), poprawka #496 (dostawcy niestandardowego osadzania), funkcje selekcji.### Bug Fixes

-**Wąskie gardło 429 nieskończone oczekiwanie**(PR #495 autorstwa @xandr0s): W przypadku 429, `limiter.stop({ dropWaitingJobs: true })` natychmiast kończy się niepowodzeniem dla wszystkich żądań w kolejce, więc osoby wywołujące na górze strony mogą wywołać powrót. Limiter został usunięty z mapy, więc następne żądanie tworzy nową instancję. -**Nierozwiązywalne niestandardowe modele osadzania**(#496): `POST /v1/embeddings` rozwiązuje teraz niestandardowe modele osadzania ze WSZYSTKICH dostawców_nodes (nie tylko localhost). Umożliwia dodawanie modeli takich jak `google/gemini-embedding-001` za pośrednictwem pulpitu nawigacyjnego.### Issues Responded

-**#452**— Limity liczby żądań na klucz API (potwierdzone, w planie działania) -**#464**— Automatyczne wydawanie kluczy API z limitami dostawcy/konta (wymaga więcej szczegółów) -**#488**— Automatyczna aktualizacja list modeli (potwierdzona, w planie działania) -**#496**— Niestandardowa rozdzielczość dostawcy osadzania (stała)---

## [2.8.6] — 2026-03-20

> Sprint: Scal PR #494 (poprawka roli MiniMax), napraw pulpit nawigacyjny KIRO MITM, segreguj 8 problemów.### Funkcje

-**Programista MiniMax → poprawka roli systemowej**(PR nr 494 autorstwa @zhangqiang8vip): Przełącznik „preserveDeveloperRole” dla poszczególnych modeli. Dodaje interfejs użytkownika „Zgodność” na stronie dostawców. Naprawiono „błąd parametru roli” 422 dla MiniMax i podobnych bramek. -**roleNormalizer**: `normalizeDeveloperRole()` akceptuje teraz parametr `preserveDeveloperRole` z zachowaniem trójstanowym (niezdefiniowane=zachowaj, prawda=zachowaj, fałsz=konwertuj). -**DB**: Nowe funkcje `getModelPreserveOpenAIDeveloperRole()` i `mergeModelCompatOverride()` w `models.ts`.### Bug Fixes

-**Deska rozdzielcza KIRO MITM**(#481/#487): `CLIToolsPageClient` kieruje teraz dowolne narzędzie `configType: "mitm"` do `AntigravityToolCard` (kontrolki MITM Start/Stop). Wcześniej tylko Antygrawitacja była zakodowana na stałe. -**AntigravityToolCard ogólna**: Używa `tool.image`, `tool.description`, `tool.id` zamiast zakodowanych na stałe wartości antygrawitacyjnych. Chroni przed brakującymi `defaultModels`.### Cleanup

- Usunięto `ZWS_README_V2.md` (dokumentacja tylko dla programistów z PR #494).### Issues Triaged (8)

-**#487**— Zamknięte (naprawiono KIRO MITM w tej wersji) -**#486**— informacje o potrzebach (problem Windows REG.exe PATH) -**#489**— informacje o potrzebach (brak identyfikatora projektu antygrawitacyjnego, konieczne jest ponowne połączenie OAuth) -**#492**— informacje o potrzebach (brak pliku app/server.js w węźle źle zarządzanym) -**#490**— Potwierdzono (streaming + blokowanie pamięci podręcznej kontekstu, planowana naprawa) -**#491**— Potwierdzono (niespójność stanu autoryzacji w Kodeksie) -**#493**— Potwierdzono (przedrostek nazwy modelu dostawcy modalnego, zapewniono obejście) -**#488**— Lista żądań funkcji (automatyczna aktualizacja list modeli)---

## [2.8.5] — 2026-03-19

> Sprint: Napraw strumienie zombie SSE, pamięć podręczną kontekstu w pierwszej turze, KIRO MITM i segreguj 5 problemów zewnętrznych.### Bug Fixes

-**Strumienie Zombie SSE**(#473): Zmniejsz `STREAM_IDLE_TIMEOUT_MS` z 300 s → 120 s, aby przyspieszyć cofanie się kombinacji, gdy dostawcy zawieszają się w połowie strumienia. Konfigurowalne poprzez env var. -**Znacznik kontekstowej pamięci podręcznej**(#474): Naprawiono `injectModelTag()`, aby obsługiwać żądania pierwszego rzutu (bez komunikatów asystenta) — ochrona pamięci podręcznej kontekstu działa teraz od pierwszej odpowiedzi. -**KIRO MITM**(#481): Zmień KIRO `configType` z `guide` → `mitm`, aby deska rozdzielcza renderowała elementy sterujące MITM Start/Stop. -**Test E2E**(CI): Napraw `providers-bailian-coding-plan.spec.ts` — odrzuć istniejącą wcześniej nakładkę modalną przed kliknięciem przycisku Dodaj klucz API.### Closed Issues

- #473 — Strumienie Zombie SSE omijają awaryjną kombinację
- #474 — Brak znacznika pamięci kontekstowej `<omniModel>` w pierwszej turze
- #481 — MITM dla KIRO nie można aktywować z poziomu deski rozdzielczej
- #468 — zdalny serwer Gemini CLI (zastąpiony przez wycofanie #462)
- #438 — Claude nie może zapisać plików (zewnętrzny problem z CLI)
- #439 — AppImage nie działa (udokumentowane obejście libfuse2)
- #402 — ARM64 DMG „uszkodzony” (udokumentowane obejście xattr -cr)
- #460 — Interfejs CLI nie działa w systemie Windows (udokumentowana poprawka PATH)---

## [2.8.4] — 2026-03-19

> Sprint: wycofanie interfejsu Gemini CLI, poprawka i18n przewodnika po maszynach wirtualnych, poprawka bezpieczeństwa zależności bota, rozszerzenie schematu dostawcy.### Funkcje

–**Wycofanie interfejsu Gemini CLI**(#462): Oznacz dostawcę `gemini-cli` jako przestarzałego za pomocą ostrzeżenia — Google ogranicza użycie protokołu OAuth przez strony trzecie od marca 2026 r. -**Schemat dostawcy**(#462): Rozszerz weryfikację Zoda o opcjonalne pola `deprecated`, `deprecationReason`, `hasFree`, `freeNote`, `authHint`, `apiHint`### Bug Fixes

-**VM Guide i18n**(#471): Dodaj `VM_DEPLOYMENT_GUIDE.md` do potoku tłumaczenia i18n, zregeneruj wszystkie 30 tłumaczeń regionalnych ze źródła angielskiego (utknęły w języku portugalskim)### Bezpieczeństwo

-**deps**: Bump `flatted` 3.3.3 → 3.4.2 — naprawia zanieczyszczenie prototypu CWE-1321 (#484, @dependentabot)### Closed Issues

- #472 — Regresja aliasów modeli (naprawiona w wersji 2.8.2)
- #471 — Uszkodzone tłumaczenia przewodników VM
- #483 — Końcowe `data: null` po `[DONE]` (naprawiono w wersji 2.8.3)### Merged PRs

- #484 — deps: guz spłaszczony z 3.3.3 do 3.4.2 (@dependentabot)---

## [2.8.3] — 2026-03-19

> Sprint: czeski i18n, poprawka protokołu SSE, tłumaczenie przewodnika VM.### Funkcje

-**Język czeski**(#482): pełny czeski (cs) i18n — 22 dokumenty, 2606 ciągów interfejsu użytkownika, aktualizacje przełącznika języka (@zen0bit) -**Przewodnik po wdrażaniu maszyn wirtualnych**: Przetłumaczony z języka portugalskiego na angielski jako dokument źródłowy (@zen0bit)### Bug Fixes

-**Protokół SSE**(#483): Przestań wysyłać końcowe `data: null` po sygnale `[DONE]` — naprawia błąd `AI_TypeValidationError` w klientach AI SDK (walidatory oparte na ZOD)### Merged PRs

- #482 — Dodaj język czeski + Napraw VM_DEPLOYMENT_GUIDE.md Angielskie źródło (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 połączone PR, poprawka routingu aliasów modeli, eksport dzienników i segregacja problemów.### Funkcje

-**Eksport dziennika**: Nowy przycisk eksportu w `/dashboard/logs` z rozwijanym zakresem czasu (1h, 6h, 12h, 24h). Pobiera JSON dzienników żądań/proxy/połączeń poprzez API `/api/logs/export` (#user-request)### Bug Fixes

-**Trasowanie aliasów modelu**(#472): Ustawienia → Aliasy modeli teraz poprawnie wpływają na routing dostawcy, a nie tylko na wykrywanie formatu. Poprzednio dane wyjściowe `resolveModelAlias()` były używane tylko dla `getModelTargetFormat()`, ale oryginalny identyfikator modelu był wysyłany do dostawcy -**Wykorzystanie opróżniania strumienia**(#480): Dane użycia z ostatniego zdarzenia SSE w buforze są teraz poprawnie wyodrębniane podczas opróżniania strumienia (połączone z @prakersh)### Merged PRs

- #480 — Wyodrębnij użycie z pozostałego bufora w procedurze obsługi opróżniania (@prakersh)
- #479 — Dodaj brakujące wpisy cenowe Kodeksu 5.3/5.4 i Anthropic model ID (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: pięć PR społeczności — poprawki dziennika połączeń przesyłanych strumieniowo, zgodność z Kiro, analiza tokenów pamięci podręcznej, tłumaczenie na język chiński i konfigurowalne identyfikatory wywołań narzędzi.### Funkcje

-**feat(logs)**: Treść odpowiedzi dziennika połączeń jest teraz poprawnie gromadzona z surowych fragmentów dostawcy (OpenAI/Claude/Gemini) przed tłumaczeniem, naprawianie pustych ładunków odpowiedzi w trybie przesyłania strumieniowego (#470, @zhangqiang8vip) -**feat(providers)**: Konfigurowalna dla każdego modelu 9-znakowa normalizacja identyfikatora wywołania narzędzia (w stylu Mistral) — tylko modele z włączoną opcją otrzymują skrócone identyfikatory (#470) -**feat(api)**: Rozszerzono API Key PATCH o obsługę pól `allowedConnections`, `name`, `autoResolve`, `isActive` i `accessSchedule` (#470) -**feat(pulpit nawigacyjny)**: Układ oparty na odpowiedzi w interfejsie szczegółów dziennika żądań (#470) -**feat(i18n)**: Poprawione tłumaczenie na język chiński (zh-CN) — pełne ponowne tłumaczenie (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Usuń wstrzyknięte pole `model` z treści żądania — Kiro API odrzuca nieznane pola najwyższego poziomu (#478, @prakersh) -**fix(usage)**: Uwzględnij tokeny odczytu pamięci podręcznej i utworzenia pamięci podręcznej w sumie danych wejściowych historii użytkowania w celu uzyskania dokładnych analiz (#477, @prakersh) -**fix(callLogs)**: Obsługa pól użycia formatu Claude (`input_tokens`/`output_tokens`) wraz z formatem OpenAI, obejmuje wszystkie warianty tokenów pamięci podręcznej (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: dostawca planu kodowania Bailian z edytowalnymi podstawowymi adresami URL oraz wkładami społeczności w Alibaba Cloud i Kimi Coding.### Funkcje

-**feat(providers)**: Dodano plan kodowania Bailian („bailian-coding-plan”) — Alibaba Model Studio z interfejsem API zgodnym z Anthropic. Statyczny katalog 8 modeli, w tym Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 i Kimi K2.5. Zawiera niestandardową weryfikację uwierzytelnienia (400=prawidłowy, 401/403=nieprawidłowy) (#467, @Mind-Dragon) -**feat(admin)**: Edytowalny domyślny adres URL w przepływach tworzenia/edycji administratora dostawcy — użytkownicy mogą konfigurować niestandardowe podstawowe adresy URL dla każdego połączenia. Trwałe w `providerSpecificData.baseUrl` z walidacją schematu ZOD odrzucającą schematy inne niż http(s) (nr 467)### 🧪 Tests

— Dodano ponad 30 testów jednostkowych i 2 scenariusze e2e dla dostawcy planu kodowania Bailian obejmujące weryfikację uwierzytelniania, wzmacnianie schematu, zachowanie na poziomie trasy i integrację między warstwami---

## [2.7.10] — 2026-03-19

> Sprint: Dwóch nowych dostawców współtworzonych przez społeczność (Alibaba Cloud Coding, klucz API Kimi Coding) i poprawka Docker pino.### Funkcje

-**feat(providers)**: Dodano obsługę planu Alibaba Cloud Coding Plan z dwoma punktami końcowymi kompatybilnymi z OpenAI — „alicode” (Chiny) i „alicode-intl” (międzynarodowe), każdy z 8 modelami (#465, @dtk1985) -**feat(providers)**: Dodano dedykowaną ścieżkę dostawcy `kimi-coding-apikey` — dostęp do Kimi Coding oparty na kluczu API nie jest już wymuszany poprzez trasę `kimi-coding` wyłącznie OAuth. Obejmuje rejestr, stałe, modele API, konfigurację i test walidacyjny (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: Dodano brakującą zależność `split2` do obrazu Dockera — `pino-abstract-transport` wymaga tego w czasie wykonywania, ale nie był kopiowany do samodzielnego kontenera, powodując awarię `Nie można znaleźć modułu 'split2'' (#459)---

## [2.7.9] — 2026-03-18

> Sprint: natywnie obsługiwane przekazywanie podścieżek odpowiedzi Codexu, naprawiona awaria Windows MITM i dostosowane schematy agentów Combo.### Funkcje

-**feat(codex)**: Natywne przekazywanie podścieżek odpowiedzi dla Codexu — natywnie kieruje `POST /v1/responses/compact` do wcześniejszego Codexu, zachowując zgodność z Claude Code bez usuwania sufiksu `/compact` (#457)### 🐛 Bug Fixes

-**fix(combos)**: Schematy Zoda („updateComboSchema” i „createComboSchema”) zawierają teraz „system_message”, „tool_filter_regex” i „context_cache_protection”. Naprawia błąd, w wyniku którego ustawienia specyficzne dla agenta utworzone za pośrednictwem panelu kontrolnego były dyskretnie odrzucane przez warstwę walidacji zaplecza (#458) -**fix(mitm)**: Naprawiono awarię profilu Kiro MITM w systemie Windows — błąd `node-machine-id` nie powiódł się z powodu braku środowiska `REG.exe`, a powrót spowodował krytyczny błąd ``krypto nie jest zdefiniowane''. Rozwiązanie awaryjne teraz bezpiecznie i poprawnie importuje kryptowaluty (#456)---

## [2.7.8] — 2026-03-18

> Sprint: błąd oszczędzania budżetu + interfejs użytkownika z funkcjami agenta kombi + poprawka bezpieczeństwa tagu omniModel.### 🐛 Bug Fixes

-**fix(budżet)**: „Zapisz limity” nie zwraca już wartości 422 — „warningThreshold” jest teraz poprawnie wysyłany jako ułamek (0–1) zamiast wartości procentowej (0–100) (#451) -**fix(combos)**: Wewnętrzny znacznik pamięci podręcznej `<omniModel>` jest teraz usuwany przed przekazaniem żądań do dostawców, co zapobiega przerwom sesji pamięci podręcznej (#454)### Funkcje

-**feat(combos)**: Dodano sekcję Funkcje agenta do modalnego tworzenia/edycji kombinacji — eksponuj zastąpienie `system_message`, `tool_filter_regex` i `context_cache_protection` bezpośrednio z panelu kontrolnego (#454)---

## [2.7.7] — 2026-03-18

> Sprint: awaria Docker pino, poprawka procesu roboczego odpowiedzi Codex CLI, synchronizacja blokady pakietów.### 🐛 Bug Fixes

-**fix(docker)**: `pino-abstract-transport` i `pino-pretty` są teraz jawnie kopiowane w fazie uruchamiania Dockera — samodzielne śledzenie Next.js pomija te równorzędne deps, powodując awarię `Nie można znaleźć modułu pino-abstract-transport` przy uruchomieniu (#449) -**fix(responses)**: Usuń `initTranslators()` z trasy `/v1/responses` — zawieszał się proces roboczy Next.js z komunikatem `the worker has exit` uncaughtException na żądaniach Codex CLI (#450)### 🔧 Maintenance

-**chore(deps)**: `package-lock.json` jest teraz wykonywany przy każdym podbiciu wersji, aby mieć pewność, że Docker `npm ci` używa dokładnych wersji zależności---

## [2.7.5] — 2026-03-18

> Sprint: ulepszenia UX i poprawka kontroli stanu interfejsu CLI systemu Windows.### 🐛 Bug Fixes

-**fix(ux)**: Pokaż wskazówkę dotyczącą domyślnego hasła na stronie logowania — nowi użytkownicy widzą teraz „Domyślne hasło: 123456” pod wprowadzanym hasłem (#437) -**fix(cli)**: Claude CLI i inne narzędzia zainstalowane przez npm są teraz poprawnie wykrywane jako działające w systemie Windows — spawn używa `shell:true` do rozwiązywania opakowań `.cmd` za pomocą PATHEXT (#447)---

## [2.7.4] — 2026-03-18

> Sprint: Panel narzędzi wyszukiwania, poprawki i18n, limity Copilot, poprawka sprawdzania poprawności Serpera.### Funkcje

-**feat(search)**: Dodaj plac zabaw dla wyszukiwania (10. punkt końcowy), stronę narzędzi wyszukiwania z porównaniem dostawców/potokiem zmiany rankingu/historią wyszukiwania, lokalnym routingiem zmiany rankingu, ochroną autoryzacji w interfejsie API wyszukiwania (nr 443 autorstwa @Regis-RCR)

- Nowa trasa: `/dashboard/search-tools`
- Wpis na pasku bocznym w sekcji Debugowanie
- `GET /api/search/providers` i `GET /api/search/stats` ze strażnikami autoryzacji
- Routing lokalnych węzłów dostawcy dla `/v1/rerank`
- Ponad 30 kluczy i18n w przestrzeni nazw wyszukiwania### 🐛 Bug Fixes

-**fix(search)**: Napraw normalizator Brave news (zwracał 0 wyników), wymuś obcięcie max_results po normalizacji, napraw adres URL pobierania strony punktów końcowych (#443 autorstwa @Regis-RCR) -**fix(analytics)**: Zlokalizuj etykiety dnia/dat analityki — zamień zakodowane na stałe portugalskie ciągi na `Intl.DateTimeFormat(locale)` (#444 autorstwa @hijak) -**fix(copilot)**: Popraw wyświetlanie typu konta GitHub Copilot, filtruj wprowadzające w błąd wiersze nieograniczonego przydziału z panelu limitów (#445 autorstwa @hijak) -**fix(providers)**: Przestań odrzucać ważne klucze Serper API — traktuj odpowiedzi inne niż 4xx jako prawidłowe uwierzytelnienie (#446 autorstwa @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: Poprawka zastępcza przydziału limitu API Codex Direct.### 🐛 Bug Fixes

-**fix(codex)**: Blokuj cotygodniowe wyczerpane konta w bezpośrednim zastępczym interfejsie API (#440)

- dopasowanie przedrostka `resolveQuotaWindow()`: `"tygodniowe" teraz pasuje do kluczy pamięci podręcznej `"tygodniowych (7d)"
- `applyCodexWindowPolicy()` wymusza poprawne przełączanie `useWeekly`/`use5h`
- 4 nowe testy regresyjne (łącznie 766)---

## [2.7.2] — 2026-03-18

> Sprint: Poprawki kontrastu interfejsu użytkownika w trybie jasnym.### 🐛 Bug Fixes

-**fix(logs)**: Naprawiono kontrast trybu jasnego w przyciskach filtrów dzienników żądań i plakietce kombinacji (#378)

- Przyciski filtra błędu/sukcesu/kombo są teraz czytelne w trybie jasnym
- Odznaka wiersza Combo używa silniejszego fioletu w trybie oświetlenia---

## [2.7.1] — 2026-03-17

> Sprint: Ujednolicony routing wyszukiwania w sieci (POST /v1/search) z 5 dostawcami + poprawki bezpieczeństwa Next.js 16.1.7 (6 CVE).### ✨ New Features

-**feat(search)**: Ujednolicony routing wyszukiwania w sieci — `POST /v1/search` z 5 dostawcami (Serper, Brave, Perplexity, Exa, Tavily)

- Automatyczne przełączanie awaryjne między dostawcami, ponad 6500 bezpłatnych wyszukiwań miesięcznie
- Pamięć podręczna w pamięci z łączeniem żądań (konfigurowalne TTL)
- Pulpit nawigacyjny: zakładka Analityka wyszukiwania w `/dashboard/analytics` z podziałem dostawców, współczynnikiem trafień w pamięci podręcznej, śledzeniem kosztów
- Nowe API: `GET /api/v1/search/analytics` dla statystyk żądań wyszukiwania
- Migracja bazy danych: kolumna `request_type` w `call_logs` do śledzenia żądań innych niż czat
- Walidacja ZOD (`v1SearchSchema`), uwierzytelnianie, koszt rejestrowany za pomocą `recordCost()`### Bezpieczeństwo

-**deps**: Next.js 16.1.6 → 16.1.7 — naprawia 6 CVE: -**Krytyczny**: CVE-2026-29057 (przemyt żądań HTTP za pośrednictwem serwera proxy http) -**Wysoki**: CVE-2026-27977, CVE-2026-27978 (WebSocket + akcje serwera) -**Średni**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Plik                                                                         | Cel                                                     |
| ---------------------------------------------------------------------------- | ------------------------------------------------------- | --- |
| `open-sse/handlers/search.ts`                                                | Moduł obsługi wyszukiwania z routingiem dla 5 dostawców |
| `open-sse/config/searchRegistry.ts`                                          | Rejestr dostawców (autoryzacja, koszt, limit, TTL)      |
| `open-sse/services/searchCache.ts`                                           | Pamięć podręczna w pamięci z łączeniem żądań            |
| `src/app/api/v1/search/route.ts`                                             | Trasa Next.js (POST + GET)                              |
| `src/app/api/v1/search/analytics/route.ts`                                   | API statystyk wyszukiwania                              |
| `src/app/(panel kontrolny)/panel kontrolny/analytics/SearchAnalyticsTab.tsx` | Zakładka panelu analitycznego                           |
| `src/lib/db/migrations/007_search_request_type.sql`                          | Migracja bazy danych                                    |
| `testy/jednostka/rejestr-wyszukiwań.test.mjs`                                | 277 linii testów jednostkowych                          | --- |

## [2.7.0] — 2026-03-17

> Sprint: funkcje inspirowane ClawRouterem — flaga ToolCalling, wielojęzyczne wykrywanie zamiarów, powrót awaryjny oparty na testach porównawczych, deduplikacja żądań, podłączany RouterStrategy, ceny Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5.### ✨ New Models & Pricing

-**wyczyn (cena)**: xAI Grok-4 Fast — `0,20 USD/0,50 USD za 1 milion tokenów`, opóźnienie 1143 ms p50, obsługiwane wywoływanie narzędzi -**wyczyn (cena)**: xAI Grok-4 (standard) — „0,20 USD/1,50 USD za 1 milion tokenów”, rozumowanie flagowe -**wyczyn (cena)**: GLM-5 przez Z.AI — „0,5 $/1 mln”, kontekst wyjściowy 128 tys. -**wyczyn (cena)**: MiniMax M2.5 — „0,30 USD/1 mln danych wejściowych”, rozumowanie + zadania agentowe -**feat(ceny)**: DeepSeek V3.2 — zaktualizowano ceny „0,27 USD/1,10 USD za 1M” -**feat(ceny)**: Kimi K2.5 poprzez Moonshot API — bezpośredni dostęp do Moonshot API -**feat(providers)**: Dodano dostawcę Z.AI (alias `zai`) — rodzina GLM-5 z wyjściem 128K### 🧠 Routing Intelligence

-**feat(registry)**: flaga `toolCalling` na model w rejestrze dostawców — kombinacje mogą teraz preferować/wymagać modeli obsługujących wywoływanie narzędzi -**feat(scoring)**: Wielojęzyczne wykrywanie intencji dla punktacji AutoCombo — wzorce skryptów/języków PT/ZH/ES/AR wpływają na wybór modelu w zależności od kontekstu żądania -**feat(fallback)**: Łańcuchy awaryjne oparte na testach porównawczych — dane dotyczące rzeczywistych opóźnień (p50 z `comboMetrics`) używane do dynamicznej zmiany kolejności priorytetów awaryjnych -**feat(dedup)**: Żądaj deduplikacji poprzez skrót treści — 5-sekundowe okno idempotencji zapobiega ponawianiu prób klientów przez zduplikowane wywołania dostawcy -**feat(router)**: Podłączany interfejs `RouterStrategy` w `autoCombo/routerStrategy.ts` — można wprowadzić niestandardową logikę routingu bez modyfikowania rdzenia### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 nowe zaawansowane schematy narzędzi: `omniroute_get_provider_metrics` (p50/p95/p99 na dostawcę) i `omniroute_explain_route` (objaśnienie decyzji o routingu) -**feat(mcp)**: Zaktualizowano zakresy uwierzytelniania narzędzia MCP — dodano zakres `metrics:read` dla narzędzi metryk dostawcy -**feat(mcp)**: `omniroute_best_combo_for_task` akceptuje teraz parametr `languageHint` dla routingu wielojęzycznego### 📊 Observability

-**feat(metrics)**: `comboMetrics.ts` rozszerzony o śledzenie procentów opóźnień w czasie rzeczywistym dla każdego dostawcy/konta -**feat(health)**: Health API (`/api/monitoring/health`) zwraca teraz pola „p50Latency” i „errorRate” dla każdego dostawcy -**feat(usage)**: migracja historii użytkowania w celu śledzenia opóźnień dla poszczególnych modeli### 🗄️ DB Migrations

-**feat(migrations)**: Nowa kolumna `latency_p50` w tabeli `combo_metrics` — łamanie zer, bezpieczne dla istniejących użytkowników### 🐛 Bug Fixes / Closures

-**close(#411)**: lepsza rozdzielczość modułu mieszanego sqlite3 w systemie Windows — naprawiono w wersji 2.6.10 (f02c5b5) -**close(#409)**: Zakończenie czatu GitHub Copilot kończy się niepowodzeniem w przypadku modeli Claude, gdy dołączone są pliki — naprawiono w wersji 2.6.9 (838f1d6) -**close(#405)**: Duplikat #411 — rozwiązany## [2.6.10] — 2026-03-17

> Poprawka dla systemu Windows: wstępnie skompilowana wersja Better-sqlite3 bez węzła-gyp/Python/MSVC (nr 426).### 🐛 Bug Fixes

-**fix(install/#426)**: W systemie Windows polecenie `npm install -g omniroute` kończyło się niepowodzeniem z komunikatem `better_sqlite3.node nie jest prawidłową aplikacją dla systemu Win32`, ponieważ dołączony natywny plik binarny został skompilowany dla systemu Linux. Dodaje**Strategię 1.5**do `scripts/postinstall.mjs`: używa `@mapbox/node-pre-gyp install --fallback-to-build=false` (dołączonego do `better-sqlite3`) do pobrania poprawnego, prekompilowanego pliku binarnego dla bieżącego systemu operacyjnego/arch bez konieczności stosowania jakichkolwiek narzędzi do kompilacji (bez node-gyp, bez Pythona, bez MSVC). Powrót do `npm build` tylko w przypadku niepowodzenia pobierania. Dodaje komunikaty o błędach specyficzne dla platformy z przejrzystymi instrukcjami ręcznej naprawy.---

## [2.6.9] — 2026-03-17

> Poprawki CI (t11 any-budget), poprawka błędu nr 409 (pliki załączników poprzez Copilot+Claude), korekta przepływu pracy wydania.### 🐛 Bug Fixes

-**fix(ci)**: Usuń słowo „any” z komentarzy w `openai-responses.ts` i `chatCore.ts`, które nie przeszły kontroli budżetu t11 `any ` (fałszywie dodatnie z komentarzy zliczających wyrażenia regularne) -**fix(chatCore)**: Normalizuj nieobsługiwane typy części treści przed przesłaniem do dostawców (#409 — Kursor wysyła `{type:"file"}`, gdy dołączone są pliki `.md`; Copilot i inni dostawcy kompatybilni z OpenAI odrzucają, stwierdzając, że „typ musi być albo„ image_url ”lub„ tekst ”; poprawka konwertuje bloki `file`/`document` na `text` i usuwa nieznane typy)### 🔧 Workflow

-**chore(generate-release)**: Dodaj ATOMIC COMMIT RULE — zmiana wersji (`npm wersja patch`) MUSI nastąpić przed zatwierdzeniem plików funkcji, aby mieć pewność, że tag zawsze wskazuje na zatwierdzenie zawierające wszystkie zmiany wersji razem---

## [2.6.8] — 2026-03-17

> Sprint: Combo jako agent (podpowiedź systemowa + filtr narzędzi), ochrona buforowania kontekstu, automatyczna aktualizacja, szczegółowe dzienniki, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: `ZMIŃ TABELĘ combo DODAJ KOLUMNĘ komunikat_systemowy TEKST DOMYŚLNY NULL`, `tool_filter_regex TEKST DOMYŚLNY NULL`, `context_cache_protection INTEGER DOMYŚLNY 0` -**006_detailed_request_logs.sql**: Nowa tabela `request_detail_logs` z wyzwalaczem bufora pierścieniowego na 500 wpisów, możliwość wyrażenia zgody poprzez przełącznik ustawień### Funkcje

-**feat(combo)**: Zastąpienie komunikatu systemowego na kombinację (#399 — pole `system_message` zastępuje lub wstawia monit systemowy przed przesłaniem do dostawcy) -**feat(combo)**: Filtr narzędzi Regex na kombinację (#399 — `tool_filter_regex` przechowuje tylko narzędzia pasujące do wzorca; obsługuje formaty OpenAI + Anthropic) -**feat(combo)**: Ochrona buforowania kontekstu (#401 — `context_cache_protection` taguje odpowiedzi z `<omniModel>dostawcą/modelem</omniModel>` i przypina model dla ciągłości sesji) -**feat(settings)**: Automatyczna aktualizacja poprzez Ustawienia (#320 — `GET /api/system/version` + `POST /api/system/update` — sprawdza rejestr npm i aktualizacje w tle przy ponownym uruchomieniu PM2) -**feat(logs)**: Szczegółowe dzienniki żądań (#378 — przechwytuje pełną treść potoku na 4 etapach: żądanie klienta, przetłumaczone żądanie, odpowiedź dostawcy, odpowiedź klienta — przełącznik zgody, przycięcie 64 KB, bufor pierścieniowy na 500 wpisów) -**feat(mitm)**: profil MITM Kiro IDE (nr 336 — `src/mitm/targets/kiro.ts` targetuje api.anthropic.com, ponownie wykorzystuje istniejącą infrastrukturę MITM)---

## [2.6.7] — 2026-03-17

> Sprint: ulepszenia SSE, rozszerzenia lokalnych dostawców_nodes, rejestr proxy, poprawki przekazywania Claude.### Funkcje

-**feat(health)**: Sprawdzanie stanu tła dla lokalnych „węzłów_dostawcy” z wykładniczym wycofywaniem (30 s → 300 s) i „Promise.allSettled”, aby uniknąć blokowania (#423, @Regis-RCR) -**feat(embeddings)**: Trasa `/v1/embeddings` do lokalnych `provider_nodes` — `buildDynamicEmbeddingProvider()` z walidacją nazwy hosta (#422, @Regis-RCR) -**feat(audio)**: Kieruj TTS/STT do lokalnych `provider_nodes` — `buildDynamicAudioProvider()` z zabezpieczeniem SSRF (#416, @Regis-RCR) -**feat(proxy)**: rejestr proxy, interfejsy API zarządzania i uogólnienie limitów przydziałów (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Usuń pola specyficzne dla Claude'a (`metadata`, `anthropic_version`), gdy cel jest zgodny z OpenAI (#421, @prakersh) -**fix(sse)**: Wyodrębnij użycie Claude'a SSE (`input_tokens`, `output_tokens`, tokeny pamięci podręcznej) w trybie strumienia przekazującego (#420, @prakersh) -**fix(sse)**: Generuje rezerwowy `call_id` dla wywołań narzędzi z brakującymi/pustymi identyfikatorami (#419, @prakersh) -**fix(sse)**: Przejście od Claude do Claude'a — część przednia całkowicie nietknięta, bez ponownego tłumaczenia (#418, @prakersh) -**fix(sse)**: Filtruj osierocone elementy `tool_result` po zagęszczeniu kontekstu Claude Code, aby uniknąć błędów 400 (#417, @prakersh) -**fix(sse)**: Pomiń wywołania narzędzi o pustej nazwie w tłumaczu Responses API, aby zapobiec nieskończonym pętlom `placeholder_tool` (#415, @prakersh) -**fix(sse)**: Usuń puste bloki treści tekstowej przed tłumaczeniem (#427, @prakersh) -**fix(api)**: Dodaj `refreshable: true` do konfiguracji testowej Claude OAuth (#428, @prakersh)### 📦 Dependencies

- Podbijanie `vitest`, `@vitest/*` i powiązanych zależności dev (#414, @dependentabot)---

## [2.6.6] — 2026-03-17

> Poprawka: kompatybilność Turbopack/Docker — usuń protokół `node:` ze wszystkich importów `src/`.### 🐛 Bug Fixes

-**fix(build)**: Usunięto przedrostek protokołu `node:` z instrukcji `import` w 17 plikach w `src/`. Importy `node:fs`, `node:path`, `node:url`, `node:os` itp. powodowały, że `plik Ecmascript zawierał błąd` w kompilacjach Turbopack (Next.js 15 Docker) i aktualizacjach ze starszych instalacji globalnych npm. Dotknięte pliki: `migrationRunner.ts`, `core.ts`, `backup.ts`, `prompts.ts`, `dataPaths.ts` i 12 innych w `src/app/api/` i `src/lib/`. -**chore(workflow)**: Zaktualizowano plik `generate-release.md`, aby synchronizacja Docker Hub i podwójny VPS wdrażały**obowiązkowe**kroki w każdej wersji.---

## [2.6.5] — 2026-03-17

> Sprint: filtrowanie parametrów modelu rozumowania, poprawka 404 lokalnego dostawcy, dostawca Kilo Gateway, guzy zależności.### ✨ New Features

-**feat(api)**: Dodano**Kilo Gateway**(`api.kilo.ai`) jako nowego dostawcę klucza API (alias `kg`) — ponad 335 modeli, 6 darmowych modeli, 3 modele z automatycznym routingiem (`kilo-auto/frontier`, `kilo-auto/balanced`, `kilo-auto/free`. Modele przejściowe obsługiwane przez punkt końcowy `/api/gateway/models`. (PR nr 408 autorstwa @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Usuń nieobsługiwane parametry z modeli wnioskowania (o1, o1-mini, o1-pro, o3, o3-mini). Modele z rodziny `o1`/`o3` odrzucają `temperature`, `top_p`, `frequency_penalty`, `presence_penalty`, `logprobs`, `top_logprobs` i `n` przy użyciu protokołu HTTP 400. Parametry są teraz usuwane w warstwie `chatCore` przed przesłaniem. Używa deklaratywnego pola „unsupportedParams” dla każdego modelu i wstępnie obliczonej mapy O(1) do wyszukiwania. (PR nr 412 autorstwa @Regis-RCR) -**fix(sse)**: Lokalny dostawca 404 powoduje teraz**blokadę tylko modelu (5 sekund)**zamiast blokady na poziomie połączenia (2 minuty). Gdy lokalny moduł wnioskowania (Ollama, LM Studio, oMLX) zwróci 404 dla nieznanego modelu, połączenie pozostaje aktywne, a inne modele natychmiast kontynuują pracę. Naprawia również istniejący błąd, w wyniku którego `model` nie został przekazany do `markAccountUnavailable()`. Lokalni dostawcy wykryci poprzez nazwę hosta (`localhost`, `127.0.0.1`, `::1`, rozszerzalne poprzez `LOCAL_HOSTNAMES` env var). (PR nr 410 autorstwa @Regis-RCR)### 📦 Dependencies

- `lepszy-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- `baza agentów` 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**fix(providers)**: Usunięto nieistniejące nazwy modeli u 5 dostawców: -**gemini / gemini-cli**: usunięto `gemini-3.1-pro/flash` i `gemini-3-*-preview` (nie istnieją w Google API v1beta); zastąpione przez `gemini-2.5-pro`, `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro/flash` -**antygrawitacja**: usunięto `gemini-3.1-pro-high/low` i `gemini-3-flash` (nieprawidłowe aliasy wewnętrzne); zastąpione prawdziwymi modelami 2.x -**github (Copilot)**: usunięto `gemini-3-flash-preview` i `gemini-3-pro-preview`; zastąpiony przez „gemini-2.5-flash”. -**nvidia**: poprawiono `nvidia/llama-3.3-70b-instruct` → `meta/llama-3.3-70b-instruct` (NVIDIA NIM używa przestrzeni nazw `meta/` dla modeli Meta); dodano `nvidia/llama-3.1-70b-instruct` i `nvidia/llama-3.1-405b-instruct` -**fix(db/combo)**: Zaktualizowano kombinację `free-stack` na zdalnej bazie danych: usunięto `qw/qwen3-coder-plus` (wygasł token odświeżania), poprawiono `nvidia/llama-3.3-70b-instruct` → `nvidia/meta/llama-3.3-70b-instruct`, poprawiono `gemini/gemini-3.1-flash` → `gemini/gemini-2.5-flash`, dodano `if/deepseek-v3.2`---

## [2.6.3] — 2026-03-16

> Sprint: pasek skrótu zod/pino wstawiony do potoku kompilacji, dodano dostawcę syntetycznego, poprawiona ścieżka VPS PM2.### 🐛 Bug Fixes

-**fix(build)**: Pasek mieszający Turbopacka działa teraz w**czasie kompilacji**dla WSZYSTKICH pakietów — nie tylko `better-sqlite3`. Krok 5.6 w `prepublish.mjs` przegląda wszystkie `.js` w `app/.next/server/` i usuwa 16-znakowy sufiks szesnastkowy z dowolnego skrótu `require()`. Naprawia `zod-dcb22c...`, `pino-...` itp. MODULE_NOT_FOUND w globalnych instalacjach npm. Zamyka #398 -**fix(deploy)**: PM2 na obu VPS wskazywał na nieaktualne katalogi git-clone. Zmieniono konfigurację na `app/server.js` w pakiecie globalnym npm. Zaktualizowano przepływ pracy `/deploy-vps`, aby używać `npm pack + scp` (rejestr npm odrzuca pakiety 299 MB).### Funkcje

-**feat(provider)**: Syntetyczny ([synthetic.new](https://synthetic.new)) — wnioskowanie zgodne z OpenAI zorientowane na prywatność. `passthroughModels: true` dla dynamicznego katalogu modeli HuggingFace. Początkowe modele: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR nr 404 autorstwa @Regis-RCR)### 📋 Issues Closed

-**close #398**: regresja skrótu npm — naprawiona przez pasek mieszający w czasie kompilacji w fazie przed publikacją -**triage #324**: Zrzut ekranu błędu bez kroków — żądano szczegółów reprodukcji---

## [2.6.2] — 2026-03-16

> Sprint: w pełni naprawiono mieszanie modułów, połączono 2 PR (filtr narzędzi Anthropic + niestandardowe ścieżki punktów końcowych), dodano dostawcę Alibaba Cloud DashScope, 3 nieaktualne problemy zostały zamknięte.### 🐛 Bug Fixes

-**fix(build)**: Rozszerzony pasek skrótu `externals` pakietu internetowego obejmujący WSZYSTKIE `serverExternalPackages`, a nie tylko `better-sqlite3`. Next.js 16 Turbopack miesza `zod`, `pino` i każdy inny pakiet zewnętrzny serwera do nazw takich jak `zod-dcb22c6336e0bc69`, które nie istnieją w `node_modules` w czasie wykonywania. Wyrażenie regularne HASH_PATTERN usuwa teraz 16-znakowy sufiks i powraca do podstawowej nazwy pakietu. Dodano także `NEXT_PRIVATE_BUILD_WORKER=0` w `prepublish.mjs`, aby wzmocnić tryb pakietu internetowego, a także skanowanie po kompilacji, które zgłasza wszelkie pozostałe zahaszowane referencje. (#396, #398, PR #403) -**fix(chat)**: Nazwy narzędzi w formacie antropicznym („nazwa.narzędzia” bez opakowania „.funkcja”) zostały po cichu usunięte przez filtr pustych nazw wprowadzony w #346. LiteLLM przesyła żądania proxy z przedrostkiem `anthropic/` w formacie API Anthropic Messages, powodując filtrowanie wszystkich narzędzi i zwrócenie przez Anthropic wartości `400: wybór_narzędzia.any można określić tylko podczas udostępniania narzędzi`. Naprawiono przez powrót do `nazwy.narzędzia`, gdy nie ma `nazwy.funkcji narzędzia`. Dodano 8 testów jednostkowych regresji. (PR nr 397)### Funkcje

-**feat(api)**: Niestandardowe ścieżki punktów końcowych dla węzłów dostawcy zgodnych z OpenAI — skonfiguruj `chatPath` i `modelsPath` na każdy węzeł (np. `/v4/chat/completions`) w interfejsie użytkownika połączenia dostawcy. Obejmuje migrację bazy danych (`003_provider_node_custom_paths.sql`) i oczyszczanie ścieżki URL (bez przechodzenia przez `..`, musi zaczynać się od `/`). (PR#400) -**feat(provider)**: Alibaba Cloud DashScope dodano jako dostawcę kompatybilnego z OpenAI. Międzynarodowy punkt końcowy: `dashscope-intl.aliyuncs.com/kompatybilny-mode/v1`. 12 modeli: `qwen-max`, `qwen-plus`, `qwen-turbo`, `qwen3-coder-plus/flash`, `qwq-plus`, `qwq-32b`, `qwen3-32b`, `qwen3-235b-a22b`. Uwierzytelnianie: klucz API nośnika.### 📋 Issues Closed

-**zamknij #323**: Błąd połączenia Cline `[obiekt obiektu]` — naprawiony w wersji 2.3.7; poinstruował użytkownika, aby dokonał aktualizacji z wersji 2.2.9 -**zamknij #337**: Śledzenie kredytów Kiro — zaimplementowano w wersji 2.5.5 (#381); wskazał użytkownikowi Pulpit → Użycie -**triage #402**: Uszkodzony ARM64 macOS DMG — zażądano wersji macOS, dokładny błąd i zalecono obejście `xattr -d com.apple.quarantine`---

## [2.6.1] — 2026-03-15

> Krytyczna poprawka podczas uruchamiania: globalne instalacje npm w wersji 2.6.0 ulegały awarii z powodu błędu 500 z powodu błędu mieszania nazwy modułu Turbopack/webpack w haku oprzyrządowania Next.js 16.### 🐛 Bug Fixes

-**fix(build)**: Wymuś, aby `better-sqlite3` było zawsze wymagane na podstawie dokładnej nazwy pakietu w pakiecie serwera webpack. Next.js 16 skompilował hak instrumentacji w oddzielny fragment i wyemitował `require('better-sqlite3-<hash>')` — zaszyfrowaną nazwę modułu, która nie istnieje w `node_modules` — mimo że pakiet był wymieniony w `serverExternalPackages`. Dodano wyraźną funkcję „externals” do konfiguracji pakietu internetowego serwera, dzięki czemu program pakujący zawsze emituje „require('better-sqlite3')`, rozwiązując uruchamiający się błąd „500 Internal Server Error” w przypadku czystych instalacji globalnych. (nr 394, PR nr 395)### 🔧 CI

-**ci**: Dodano `workflow_dispatch` do `npm-publish.yml` z zabezpieczeniem synchronizacji wersji dla wyzwalaczy ręcznych (#392) -**ci**: Dodano `workflow_dispatch` do `docker-publish.yml`, zaktualizowano akcje GitHub do najnowszych wersji (#392)---

## [2.6.0] - 2026-03-15

> Sprint rozwiązywania problemów: naprawiono 4 błędy, poprawiono UX logów, dodano śledzenie kredytów Kiro.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI i SD WebUI nie pojawiają się już na liście dostawców strony Media, gdy są nieskonfigurowane — pobiera `/api/providers` na montowaniu i ukrywa lokalnych dostawców bez połączeń (#390) -**fix(auth)**: Działanie okrężne nie powoduje już ponownego wyboru kont z ograniczoną stawką natychmiast po odnowieniu — `backoffLevel` jest teraz używany jako podstawowy klucz sortowania w rotacji LRU (#340) -**fix(oauth)**: Qoder (i inni dostawcy, którzy przekierowują do własnego interfejsu użytkownika) nie pozostawiają już modalu OAuth zablokowanego w stanie „Oczekiwanie na autoryzację” — detektor z zamkniętym wyskakującym okienkiem automatycznie przechodzi do trybu ręcznego wprowadzania adresu URL (#344) -**fix(logs)**: Tabela dzienników żądań jest teraz czytelna w trybie jasnym — plakietki stanu, liczba tokenów i znaczniki combo korzystają z adaptacyjnych klas kolorów „dark:” (#378)### Funkcje

-**feat(kiro)**: Dodano śledzenie kredytów Kiro do modułu pobierania użycia — zapytania `getUserCredits` z punktu końcowego AWS CodeWhisperer (nr 337)### 🛠 Chores

-**chore(tests)**: Dostosowano `test:plan3`, `test:fixes`, `test:security` tak, aby korzystały z tego samego modułu ładującego `tsx/esm` co `npm test` — eliminuje fałszywe negatywne wyniki rozdzielczości modułu w docelowych uruchomieniach (PR #386)---

## [2.5.9] - 2026-03-15

> Natywna poprawka przejścia Kodeksu + wzmocnienie sprawdzania poprawności treści trasy.### 🐛 Bug Fixes

-**fix(codex)**: Zachowaj natywne przejście API Responses dla klientów Codex — pozwala uniknąć niepotrzebnych mutacji w tłumaczeniu (PR #387) -**fix(api)**: Sprawdzaj treść żądań w przypadku tras ustalania cen/synchronizacji i routingu zadań — zapobiega awariom spowodowanym zniekształconymi danymi wejściowymi (PR #388) -**fix(auth)**: Sekrety JWT utrzymują się po ponownym uruchomieniu poprzez `src/lib/db/secrets.ts` — eliminuje błędy 401 po ponownym uruchomieniu PM2 (PR #388)---

## [2.5.8] - 2026-03-15

> Poprawka do kompilacji: przywróć łączność VPS zerwaną przez niekompletną publikację wersji 2.5.7.### 🐛 Bug Fixes

-**fix(build)**: `scripts/prepublish.mjs` nadal korzysta z przestarzałej flagi `--webpack`, powodując ciche niepowodzenie samodzielnej kompilacji Next.js — publikacja npm zakończona bez `app/server.js`, co zakłóca wdrożenie VPS---

## [2.5.7] - 2026-03-15

> Poprawki obsługi błędów na placu zabaw dla mediów.### 🐛 Bug Fixes

-**fix(media)**: Transkrypcja „Wymagany klucz API” jest fałszywie dodatnia, gdy dźwięk nie zawiera mowy (muzyki, ciszy) — zamiast tego wyświetla się teraz komunikat „Nie wykryto mowy” -**fix(media)**: `upstreamErrorResponse` w `audioTranscription.ts` i `audioSpeech.ts` zwraca teraz prawidłowy JSON (`{error:{message}}`), umożliwiając prawidłowe wykrywanie błędów uwierzytelniania 401/403 w MediaPageClient -**fix(media)**: `parseApiError` obsługuje teraz pole `err_msg` Deepgram i wykrywa ``klucz API'' w komunikatach o błędach w celu dokładnej klasyfikacji błędów poświadczeń---

## [2.5.6] - 2026-03-15

> Krytyczne poprawki bezpieczeństwa/audycji: zerwane antygrawitacyjne OAuth + utracone sesje JWT po ponownym uruchomieniu.### 🐛 Bug Fixes

-**fix(oauth) #384**: Antygrawitacyjny Google OAuth teraz poprawnie wysyła `client_secret` do punktu końcowego tokena. Alternatywą dla `ANTIGRAVITY_OAUTH_CLIENT_SECRET` był pusty ciąg znaków, który jest fałszywy — więc `client_secret` nigdy nie został uwzględniony w żądaniu, powodując błędy ``Brak sekretu_klienta'' dla wszystkich użytkowników bez niestandardowej zmiennej env. Zamyka #383.
-**fix(auth) #385**: `JWT_SECRET` jest teraz utrwalany w SQLite (`namespace='secrets'`) przy pierwszej generacji i ładowany ponownie przy kolejnych uruchomieniach. Wcześniej przy każdym uruchomieniu procesu generowany był nowy losowy sekret, unieważniający wszystkie istniejące pliki cookie/sesje po każdym ponownym uruchomieniu lub aktualizacji. Wpływa zarówno na `JWT_SECRET`, jak i `API_KEY_SECRET`. Zamyka #382.---

## [2.5.5] - 2026-03-15

> Poprawka deduplikacji listy modeli, wzmocnienie samodzielnej kompilacji Electron i śledzenie kredytów Kiro.### 🐛 Bug Fixes

-**fix(models) #380**: `GET /api/models` uwzględnia teraz aliasy dostawców podczas budowania filtra aktywnego dostawcy — modele `claude` (alias `cc`) i `github` (alias `gh`) były zawsze pokazywane niezależnie od tego, czy połączenie zostało skonfigurowane, ponieważ klucze `PROVIDER_MODELS` są aliasami, ale połączenia DB są przechowywane pod identyfikatorami dostawców. Naprawiono poprzez rozszerzenie każdego aktywnego identyfikatora dostawcy, aby uwzględnić także jego alias poprzez `PROVIDER_ID_TO_ALIAS`. Zamyka #353. -**fix(electron) #379**: Nowy `scripts/prepare-electron-standalone.mjs` przygotowuje dedykowany pakiet `/.next/electron-standalone` przed pakowaniem Electron. Przerywa z wyraźnym błędem, jeśli „moduły_węzła” jest dowiązaniem symbolicznym (konstruktor elektronów dostarczyłby zależność środowiska wykonawczego od maszyny budującej). Wieloplatformowe oczyszczanie ścieżek za pomocą `path.basename`. Autor: @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Śledzenie salda kredytu Kiro — punkt końcowy użycia zwraca teraz dane kredytowe dla kont Kiro, wywołując `codewhisperer.us-east-1.amazonaws.com/getUserCredits` (ten sam punkt końcowy, którego Kiro IDE używa wewnętrznie). Zwraca pozostałe środki, całkowity limit, datę odnowienia i poziom subskrypcji. Zamyka #337.## [2.5.4] - 2026-03-15

> Poprawka uruchamiania rejestratora, poprawka bezpieczeństwa ładowania początkowego logowania i poprawa niezawodności deweloperskiego HMR. Wzmocniona infrastruktura CI.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Przywróć ścieżkę rejestratora transportu pino — `formatters.level` w połączeniu z `transport.targets` jest odrzucany przez pino. Konfiguracje wspierane przez transport usuwają teraz formater poziomów za pomocą `getTransportCompatibleConfig()`. Poprawia także mapowanie poziomów numerycznych w `/api/logs/console`: `30 → info, 40 → ostrzegaj, 50 → błąd` (został przesunięty o jeden). -**fix(login) #375**: Strona logowania jest teraz uruchamiana z publicznego punktu końcowego `/api/settings/require-login` zamiast chronionego `/api/settings`. W konfiguracjach chronionych hasłem strona przed uwierzytelnieniem otrzymywała błąd 401 i niepotrzebnie wracała do bezpiecznych ustawień domyślnych. Trasa publiczna zwraca teraz wszystkie metadane ładowania początkowego („requireLogin”, „hasPassword”, „setupComplete”) z konserwatywną rezerwą 200 w przypadku błędu. -**fix(dev) #374**: Dodaj `localhost` i `127.0.0.1` do `allowedDevOrigins` w `next.config.mjs` — websocket HMR został zablokowany podczas dostępu do aplikacji poprzez adres sprzężenia zwrotnego, powodując powtarzające się ostrzeżenia o różnych źródłach.### 🔧 CI & Infrastructure

-**Poprawka ESLint OOM**: `eslint.config.mjs` ignoruje teraz `vscode-extension/**`, `electron/**`, `docs/**`, `app/.next/**` i `clipr/**` — ESLint zawieszał się z OOM sterty JS poprzez skanowanie binarnych obiektów BLOB VS Code i skompilowanych fragmentów. -**Poprawka do testu jednostkowego**: Usunięto przestarzałą opcję „ALTER TABLE połączenia_dostawcy ADD KOLUMN „grupa” z 2 plików testowych — kolumna jest teraz częścią podstawowego schematu (dodana w #373), powodując „SQLITE_ERROR: zduplikowana nazwa kolumny” przy każdym uruchomieniu CI. -**Przechwytywanie przed zatwierdzeniem**: Dodano `npm run test:unit` do `.husky/pre-commit` — testy jednostkowe blokują teraz zepsute zatwierdzenia, zanim dotrą do CI.## [2.5.3] - 2026-03-14

> Krytyczne poprawki błędów: migracja schematu bazy danych, ładowanie środowiska startowego, usuwanie stanu błędu dostawcy i poprawka podpowiedzi i18n. Ulepszenia jakości kodu oprócz każdego PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

-**fix(db) #373**: Dodano kolumnę `provider_connections.group` do schematu podstawowego + migracja zapasowa dla istniejących baz danych — kolumna była używana we wszystkich zapytaniach, ale brakowało jej w definicji schematu -**fix(i18n) #371**: Zastąp nieistniejący klucz `t("deleteConnection")` istniejącym kluczem `providers.delete` — naprawia błąd wykonania `MISSING_MESSAGE: Providers.deleteConnection` na stronie szczegółów dostawcy -**fix(auth) #372**: Usuń nieaktualne metadane błędów (`errorCode`, `lastErrorType`, `lastErrorSource`) z kont dostawców po rzeczywistym odzyskaniu — wcześniej odzyskane konta nadal pojawiały się jako nieudane -**fix(startup) #369**: Ujednolicenie ładowania env pomiędzy `npm run start`, `run-standalone.mjs` i Electron, aby szanować priorytet `DATA_DIR/.env → ~/.omniroute/.env → ./.env` — zapobiega generowaniu nowego `STORAGE_ENCRYPTION_KEY` w istniejącej zaszyfrowanej bazie danych### 🔧 Code Quality

- Udokumentowane wzorce „result.success” i „response?.ok” w „auth.ts” (oba zamierzone, teraz wyjaśnione)
- Znormalizowane `overridePath?.trim()` w `electron/main.js`, aby dopasować `bootstrap-env.mjs`
- Dodano komentarz dotyczący kolejności scalania „preferredEnv” podczas uruchamiania Electrona

> Polityka limitów konta Codex z automatyczną rotacją, szybkim przełączaniem poziomów, modelem gpt-5.4 i poprawką etykiety analitycznej.### ✨ New Features (PRs #366, #367, #368)

-**Zasady dotyczące przydziałów Kodeksu (PR #366)**: Okno przydziału na konto na 5 godzin/tydzień przełącza się w panelu dostawcy. Konta są automatycznie pomijane, gdy włączone okna osiągną próg 90% i ponownie akceptowane po „resetAt”. Zawiera plik „quotaCache.ts” z modułem pobierającym stan bez skutków ubocznych. -**Przełącznik szybkiego poziomu Codexu (PR #367)**: Panel kontrolny → Ustawienia → Poziom usług Codex. Domyślnie wyłączony przełącznik dodaje `service_tier: "flex"` tylko dla żądań Kodeksu, redukując koszt o ~80%. Pełny stos: zakładka interfejsu użytkownika + punkt końcowy API + executor + tłumacz + przywracanie po uruchomieniu. -**Model gpt-5.4 (PR #368)**: Dodaje `cx/gpt-5.4` i `codex/gpt-5.4` do rejestru modeli Codex. Test regresji wliczony w cenę.### 🐛 Bug Fixes

-**poprawka nr 356**: Wykresy analityczne (Najlepszy dostawca, Według konta, Podział dostawców) wyświetlają teraz czytelne dla człowieka nazwy/etykiety dostawców zamiast nieprzetworzonych wewnętrznych identyfikatorów w przypadku dostawców zgodnych z OpenAI.

> Wydanie główne: strategia routingu ściśle losowego, kontrola dostępu do kluczy API, grupy połączeń, zewnętrzna synchronizacja cen i krytyczne poprawki błędów dla modeli myślących, testowania kombinacji i sprawdzania poprawności nazw narzędzi.### ✨ New Features (PRs #363 & #365)

-**Strategia ścisłego losowego routingu**: Talia tasowania Fisher-Yates z gwarancją zapobiegania powtórzeniom i serializacją mutex dla jednoczesnych żądań. Niezależne talie na kombinację i na dostawcę. -**Kontrola dostępu do kluczy API**: `allowedConnections` (ogranicza połączenia, których może używać klucz), `is_active` (włącz/wyłącz klucz za pomocą 403), `accessSchedule` (kontrola dostępu oparta na czasie), przełącznik `autoResolve`, zmień nazwy kluczy za pomocą PATCH. -**Grupy połączeń**: Grupuj połączenia dostawców według środowiska. Widok harmonijkowy na stronie Limity z trwałością localStorage i inteligentnym automatycznym przełączaniem. -**Zewnętrzna synchronizacja cen (LiteLLM)**: 3-poziomowe ustalanie cen (nadpisania użytkownika → zsynchronizowane → wartości domyślne). Zgłoś się poprzez „PRICING_SYNC_ENABLED=true”. Narzędzie MCP „omniroute_sync_pricing”. 23 nowe testy. -**i18n**: 30 języków zaktualizowanych o strategię ściśle losową, ciągi zarządzania kluczami API. pt-BR w pełni przetłumaczony.### 🐛 Bug Fixes

-**poprawka #355**: Zwiększono limit czasu bezczynności strumienia z 60 s do 300 s — zapobiega przerywaniu modeli myślenia rozszerzonego (claude-opus-4-6, o3 itp.) podczas długich faz wnioskowania. Konfigurowalne poprzez `STREAM_IDLE_TIMEOUT_MS`. -**poprawka nr 350**: Test Combo omija teraz `REQUIRE_API_KEY=true` przy użyciu wewnętrznego nagłówka i uniwersalnie używa formatu kompatybilnego z OpenAI. Limit czasu wydłużony z 15 s do 20 s. -**poprawka #346**: Narzędzia z pustą nazwą funkcji.nazwa (przekazywane przez Claude Code) są teraz filtrowane przed otrzymaniem ich przez dostawców zewnętrznych, co zapobiega błędom „Nieprawidłowe dane wejściowe[N].nazwa: pusty ciąg znaków”.### 🗑️ Closed Issues

-**#341**: Usunięto sekcję debugowania — zastąpiono ją `/dashboard/logs` i `/dashboard/health`.

> Obsługa funkcji API Key Round-Robin dla konfiguracji dostawców z wieloma kluczami oraz potwierdzenie routingu z użyciem symboli wieloznacznych i zmiany okna przydziału.### ✨ New Features

-**Okrężne działanie klucza API (T07)**: Połączenia dostawcy mogą teraz przechowywać wiele kluczy API (Edytuj połączenie → Dodatkowe klucze API). Żądania zmieniają się cyklicznie między kluczami podstawowymi i dodatkowymi za pośrednictwem `providerSpecificData.extraApiKeys[]`. Klucze są przechowywane w pamięci i indeksowane dla każdego połączenia — nie są wymagane żadne zmiany schematu bazy danych.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: `wildcardRouter.ts` z dopasowywaniem wieloznacznych w stylu glob (`gpt*`, `claude-?-sonnet` itp.) jest już zintegrowany z `model.ts` z rankingiem specyficzności. -**Zwijanie okna kwot (T08)**: `accountFallback.ts:isModelLocked()` już automatycznie przesuwa okno — jeśli `Date.now() > wpis.until”, blokada jest natychmiast usuwana (bez przestarzałego blokowania).

> Udoskonalenie interfejsu użytkownika, dodanie strategii routingu i płynna obsługa błędów w przypadku limitów użytkowania.### ✨ New Features

-**Strategie routingu Fill-First i P2C**: Dodano opcję „First fill-first” (opróżnij limit przed przejściem dalej) i „p2c” (wybór Power-of-Two-Choices z niskim opóźnieniem) do wyboru strategii kombinacji, z pełnymi panelami wskazówek i kolorowymi plakietkami. -**Presetowe modele Free Stack**: Tworzenie kombinacji przy użyciu szablonu Free Stack powoduje teraz automatyczne wypełnienie 7 najlepszych w swojej klasie bezpłatnych modeli dostawców (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Użytkownicy po prostu aktywują dostawców i od razu otrzymują kombinację 0 USD miesięcznie. -**Szerszy moduł kombinacji**: Tryb tworzenia/edycji kombinacji używa teraz `max-w-4xl` do wygodnej edycji dużych kombinacji.### 🐛 Bug Fixes

-**Strona limitów HTTP 500 dla Codex i GitHub**: `getCodexUsage()` i `getGitHubUsage()` zwracają teraz przyjazny dla użytkownika komunikat, gdy dostawca zwróci 401/403 (wygasły token), zamiast wyrzucać i powodować błąd 500 na stronie Limity. -**MaintenanceBanner fałszywie dodatni**: Baner nie wyświetla już fałszywie komunikatu „Serwer jest nieosiągalny” podczas ładowania strony. Naprawiono przez wywołanie `checkHealth()` natychmiast po zamontowaniu i usunięcie przestarzałego zamknięcia stanu `show`. -**Podpowiedzi ikon dostawcy**: Przyciski edycji (ołówkiem) i usuwania ikon w wierszu połączenia dostawcy mają teraz natywne podpowiedzi w formacie HTML — wszystkie 6 ikon akcji jest teraz samodokumentowanych.

> Wiele ulepszeń wynikających z analizy problemów społeczności, obsługi nowych dostawców, poprawek błędów dotyczących śledzenia tokenów, routingu modeli i niezawodności przesyłania strumieniowego.### ✨ New Features

-**Task-Aware Smart Routing (T05)**: Automatyczny wybór modelu na podstawie typu treści żądania — kodowanie → deepseek-chat, analiza → gemini-2.5-pro, wizja → gpt-4o, podsumowanie → gemini-2.5-flash. Konfigurowalne w Ustawieniach. Nowe API `GET/PUT/POST /api/settings/task-routing`. -**Dostawca HuggingFace**: Dodano router HuggingFace jako dostawcę kompatybilnego z OpenAI z Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini. -**Dostawca Vertex AI**: Dodano dostawcę Vertex AI (Google Cloud) z Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude przez Vertex. -**Przesyłanie plików z placu zabaw**: przesyłanie dźwięku do transkrypcji, przesyłanie obrazów dla modeli wizyjnych (automatyczne wykrywanie według nazwy modelu), wbudowane renderowanie obrazów w celu uzyskania wyników generowania obrazów. -**Wizualna informacja zwrotna o wyborze modelu**: Już dodane modele w selektorze kombinacji wyświetlają się teraz ✓ zieloną plakietką — zapobiegają pomyłkom związanym z powielaniem. -**Zgodność z Qwen (PR #352)**: Zaktualizowano ustawienia linii papilarnych User-Agent i CLI w celu zapewnienia zgodności z dostawcą Qwen. -**Zarządzanie stanem metodą okrężną (PR #349)**: Ulepszona logika działania okrężnego do obsługi wykluczonych kont i prawidłowego utrzymywania stanu rotacji. -**UX schowka (PR #360)**: Ulepszone operacje schowka z możliwością powrotu do niezabezpieczonych kontekstów; Ulepszenia normalizacji narzędzia Claude.### 🐛 Bug Fixes

-**Poprawka nr 302 — OpenAI SDK stream=False usuwa wywołania narzędzi**: T01 Zaakceptuj negocjację nagłówka nie wymusza już przesyłania strumieniowego, gdy `body.stream` ma jawną wartość `false`. Powoduje ciche odrzucanie wywołań narzędziowych podczas korzystania z pakietu SDK OpenAI Python w trybie innym niż przesyłanie strumieniowe. -**Poprawka nr 73 — Claude Haiku kierowany do OpenAI bez prefiksu dostawcy**: Modele `claude-*` wysłane bez prefiksu dostawcy są teraz poprawnie kierowane do dostawcy `antygrawitacji` (antropijnego). Dodano także heurystykę `gemini-*`/`gemma-*` → `gemini`. -**Poprawka nr 74 — Liczba tokenów zawsze wynosi 0 w przypadku przesyłania strumieniowego Antigravity/Claude**: Zdarzenie SSE `message_start`, które przenosi `input_tokens`, nie było analizowane przez `extractUsage()`, co spowodowało spadek liczby wszystkich tokenów wejściowych. Śledzenie tokenów wejścia/wyjścia działa teraz poprawnie w przypadku odpowiedzi przesyłanych strumieniowo. -**Poprawka nr 180 — Duplikaty importu modelu bez informacji zwrotnej**: `ModelSelectModal` pokazuje teraz ✓ zielone podświetlenie modeli już znajdujących się w kombinacji, dzięki czemu jest oczywiste, że zostały już dodane. -**Błędy generowania stron multimediów**: Wyniki obrazów są teraz renderowane jako znaczniki `<img>` zamiast surowego JSON. Wyniki transkrypcji pokazane jako czytelny tekst. Błędy poświadczeń wyświetlają bursztynowy baner zamiast cichej awarii. -**Przycisk odświeżania tokena na stronie dostawcy**: Dodano interfejs ręcznego odświeżania tokenu dla dostawców OAuth.### 🔧 Improvements

-**Rejestr dostawców**: HuggingFace i Vertex AI dodano do `providerRegistry.ts` i `providers.ts` (frontend). -**Read Cache**: Nowy `src/lib/db/readCache.ts` dla wydajnego buforowania odczytu DB. -**Pamięci podręcznej przydziałów**: Ulepszona pamięć podręczna przydziałów z eksmisją w oparciu o TTL.### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- `docker/setup-qemu-action` → v4 (PR #342)
- `docker/setup-buildx-action` → v4 (PR #343)### 📁 New Files

| Plik                                          | Cel                                                    |
| --------------------------------------------- | ------------------------------------------------------ | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Logika routingu uwzględniająca zadania (7 typów zadań) |
| `src/app/api/settings/task-routing/route.ts`  | API konfiguracji routingu zadań                        |
| `src/app/api/providers/[id]/refresh/route.ts` | Ręczne odświeżanie tokena OAuth                        |
| `src/lib/db/readCache.ts`                     | Wydajna pamięć podręczna odczytu bazy danych           |
| `src/shared/utils/clipboard.ts`               | Utwardzony schowek z rezerwą                           | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Kombinacje modalne: Widoczny i widoczny darmowy stos**— Szablon darmowego stosu został ukryty (4. miejsce w siatce 3-kolumnowej). Naprawiono: przesunięto na pozycję 1, przełączono na siatkę 2x2, dzięki czemu wszystkie 4 szablony są widoczne, zielona ramka + DARMOWE podświetlenie odznaki.## [2.4.0] - 2026-03-13

> **Wersja główna**— Ekosystem Free Stack, przegląd placu zabaw transkrypcji, ponad 44 dostawców, kompleksowa dokumentacja bezpłatnego poziomu i ogólne ulepszenia interfejsu użytkownika.### Funkcje

-**Kombinacje: szablon Free Stack**— Nowy czwarty szablon „Free Stack (0 $)” wykorzystujący działanie okrężne w Kiro + Qoder + Qwen + Gemini CLI. Sugeruje gotową kombinację o zerowym koszcie przy pierwszym użyciu. -**Media/transkrypcja: domyślnie Deepgram**— Deepgram (Nova 3, 200 USD za darmo) jest teraz domyślnym dostawcą transkrypcji. AssemblyAI (50 USD za darmo) i Groq Whisper (za darmo na zawsze) pokazane z bezpłatnymi odznakami kredytowymi. -**README: Sekcja „Rozpocznij bezpłatnie”**— Nowa, 5-etapowa tabela wczesnego README pokazująca, jak skonfigurować sztuczną inteligencję o zerowych kosztach w ciągu kilku minut. -**CZYTAJ: Zestaw bezpłatnej transkrypcji**— Nowa sekcja z sugestiami kombinacji Deepgram/AssemblyAI/Groq i szczegółami bezpłatnego kredytu dla każdego dostawcy. -**providers.ts: flaga hasFree**— NVIDIA NIM, Cerebras i Groq oznaczone plakietką hasFree i bezpłatną notatką dla interfejsu dostawcy. -**i18n: klucze templateFreeStack**— Szablon combo Free Stack przetłumaczony i zsynchronizowany ze wszystkimi 30 językami.## [2.3.16] - 2026-03-13

### Dokumentacja

-**README: 44+ Providers**— Zaktualizowano wszystkie 3 wystąpienia „36+ dostawców” na „44+” odzwierciedlające rzeczywistą liczbę baz kodu (44 dostawców w Providers.ts) -**CZYTAJ: Nowa sekcja „🆓 Darmowe modele — co właściwie otrzymujesz”**— Dodano tabelę 7 dostawców z limitami stawek dla poszczególnych modeli dla: Kiro (Claude bez ograniczeń przez AWS Builder ID), Qoder (5 modeli bez ograniczeń), Qwen (4 modele bez ograniczeń), Gemini CLI (180 tys./mies.), NVIDIA NIM (~40 obr./min programowanie na zawsze), Cerebras (1 mln tok/dzień / 60 tys. TPM), Groq (30 obr./min / 14,4 tys. obr./min). Zawiera rekomendację kombinacji \/usr/bin/bash Ultimate Free Stack. -**CZYTAJ: Zaktualizowano tabelę cen**— Dodano Cerebras do poziomu API KEY, poprawiono NVIDIA z „1000 kredytów” na „za darmo dla programistów”, zaktualizowano liczbę i nazwy modeli Qoder/Qwen -**CZYTAJ: Qoder 8 → 5 modeli**(nazwane: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**CZYTAJ: Qwen 3 → 4 modele**(nazwane: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, Vision-model)## [2.3.15] - 2026-03-13

### Funkcje

-**Pulpit nawigacyjny Auto-Combo (priorytet poziomów)**: Dodano „🏷️ Poziom” jako 7. etykietę współczynnika punktacji na ekranie podziału współczynników `/dashboard/auto-combo` — wszystkie 7 czynników punktacji Auto-Combo jest teraz widocznych. -**i18n — sekcja autoCombo**: Dodano 20 nowych kluczy tłumaczeń dla panelu Auto-Combo (`title`, `status`, `modePack`, `providerScores`, `factorTierPriority` itp.) do wszystkich 30 plików językowych.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Przywrócono prawidłowy domyślny parametr „clientSecret” — poprzednio był to pusty ciąg znaków, powodujący „Złe dane uwierzytelniające klienta” przy każdej próbie połączenia. Poświadczenie publiczne jest teraz domyślnym zabezpieczeniem rezerwowym (można je zastąpić za pomocą `QODER_OAUTH_CLIENT_SECRET` env var). -**Nie znaleziono serwera MITM (#335)**: `prepublish.mjs` kompiluje teraz `src/mitm/*.ts` do JavaScript przy użyciu `tsc` przed skopiowaniem do pakietu npm. Wcześniej kopiowano tylko surowe pliki `.ts` — co oznaczało, że `server.js` nigdy nie istniał w globalnych instalacjach npm/Volta. -**GeminiCLI brakujący identyfikator projektu (#338)**: Zamiast zgłaszać twardy błąd 500, gdy w przechowywanych danych uwierzytelniających brakuje `projectId` (np. po ponownym uruchomieniu Dockera), OmniRoute rejestruje teraz ostrzeżenie i próbuje wykonać żądanie — zwracając znaczący błąd po stronie dostawcy zamiast awarii OmniRoute. -**Niezgodność wersji Electron (#323)**: Zsynchronizowano wersję `electron/package.json` z `2.3.13` (było `2.0.13`), więc wersja binarna na komputer stacjonarny jest zgodna z pakietem npm.### ✨ New Models (#334)

-**Kiro**: `claude-sonnet-4`, `claude-opus-4.6`, `deepseek-v3.2`, `minimax-m2.1`, `qwen3-coder-next`, `auto` -**Kodeks**: `gpt5.4`### 🔧 Improvements

-**Tier Scoring (API + Walidacja)**: Dodano `tierPriority` (waga `0,05`) do schematu Zod `ScoringWeights` i trasy API `combos/auto` — 7. współczynnik punktacji jest teraz w pełni akceptowany przez API REST i sprawdzany na wejściu. waga „stabilności” dostosowana od „0,10” do „0,05”, aby suma całkowita = „1,0”.### ✨ New Features

-**Wielopoziomowa punktacja przydziału (automatyczne połączenie)**: Dodano „tierPriority” jako siódmy czynnik punktacji — konta z poziomami Ultra/Pro są teraz preferowane w stosunku do poziomów Free, gdy inne czynniki są równe. Nowe opcjonalne pola `accountTier` i `quotaResetIntervalSecs` w `ProviderCandidate`. Zaktualizowano wszystkie 4 pakiety trybów („szybka wysyłka”, „oszczędność kosztów”, „na pierwszym miejscu jakość”, „przyjazny tryb offline”). -**Zastępczy model wewnątrzrodzinny (T5)**: Gdy model jest niedostępny (404/400/403), OmniRoute teraz automatycznie powraca do modeli rodzeństwa z tej samej rodziny przed zwróceniem błędu („modelFamilyFallback.ts”). -**Konfigurowalny limit czasu mostu API**: `API_BRIDGE_PROXY_TIMEOUT_MS` env var pozwala operatorom dostosować limit czasu proxy (domyślnie 30 s). Naprawia błędy 504 dotyczące powolnych odpowiedzi przesyłanych dalej. (#332) -**Star History**: Zastąpiono widget star-history.com przez starchart.cc (`?variant=adaptive`) we wszystkich 30 plikach README — dostosowuje się do jasnego/ciemnego motywu, aktualizacje w czasie rzeczywistym.### 🐛 Bug Fixes

-**Auth — Hasło pierwszego użycia**: `INITIAL_PASSWORD` env var jest teraz akceptowane podczas ustawiania pierwszego hasła panelu kontrolnego. Używa `timingSafeEqual` do porównywania w stałym czasie, zapobiegając atakom związanym z synchronizacją. (#333) -**Obcięcie README**: Naprawiono brakujący tag zamykający `</details>` w sekcji rozwiązywania problemów, który powodował, że GitHub przestał renderować wszystko poniżej (stos technologiczny, dokumenty, plan działania, współautorzy). -**instalacja pnpm**: Usunięto zbędne zastąpienie `@swc/helpers` z `package.json`, które kolidowało z bezpośrednią zależnością, powodując błędy `EOVERRIDE` na pnpm. Dodano konfigurację `pnpm.onlyBuiltDependency`. -**Wstrzykiwanie ścieżki CLI (T12)**: Dodano walidator `isSafePath()` w `cliRuntime.ts`, aby blokować przechodzenie ścieżki i metaznaki powłoki w `CLI_*_BIN` env vars. -**CI**: Zregenerowano plik `package-lock.json` po usunięciu zastąpienia w celu naprawienia błędów `npm ci` w akcjach GitHub.### 🔧 Improvements

-**Format odpowiedzi (T1)**: `format_odpowiedzi` (json_schema/json_object) teraz wstrzykiwany jako zachęta systemowa dla Claude, umożliwiając zgodność ze strukturalnymi wynikami. -**429 Retry (T2)**: Ponowna próba w obrębie adresu URL dla 429 odpowiedzi (2× próby z 2-sekundowym opóźnieniem) przed powrotem do następnego adresu URL. -**Nagłówki Gemini CLI (T3)**: Dodano nagłówki linii papilarnych „User-Agent” i „X-Goog-Api-Client” w celu zapewnienia zgodności z interfejsem Gemini CLI. -**Katalog cenowy (T9)**: Dodano wpisy cenowe „deepseek-3.1”, „deepseek-3.2” i „qwen3-coder-next”.### 📁 New Files

| Plik                                       | Cel                                                          |
| ------------------------------------------ | ------------------------------------------------------------ | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Definicje rodziny modeli i wewnątrzrodzinna logika rezerwowa | ### Fixed |

-**KiloCode**: limit czasu sprawdzania stanu kilokodu został już naprawiony w wersji 2.3.11 -**OpenCode**: Dodaj opencode do rejestru cliRuntime z 15-sekundowym limitem czasu sprawdzania stanu -**OpenClaw / Kursor**: Zwiększ limit czasu sprawdzania stanu do 15 s dla wariantów o wolnym uruchomieniu -**VPS**: Zainstaluj pakiety Droid i Openclaw npm; aktywuj CLI_EXTRA_PATHS dla kiro-cli -**cliRuntime**: Dodaj rejestrację narzędzia opencode i zwiększ limit czasu na kontynuację## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode healthcheck**: Zwiększ `healthcheckTimeoutMs` z 4000ms do 15000ms — kilocode renderuje baner z logo ASCII przy uruchomieniu, powodując fałszywy `healthcheck_failed` w środowiskach o wolnym/zimnym starcie## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: Napraw błąd `check:any-budget:t11` — zamień `jak dowolny` na `as Record<string, nieznany>` w OAuthModal.tsx (3 wystąpienia)### Docs

-**CLI-TOOLS.md**: Kompletny przewodnik po wszystkich 11 narzędziach CLI (claude, codex, gemini, opencode, cline, kilocode, kontynuuj, kiro-cli, kursor, droid, openclaw) -**i18n**: CLI-TOOLS.md zsynchronizowany z 30 językami z przetłumaczonym tytułem + wprowadzeniem## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Nowy, starszy punkt końcowy uzupełniania OpenAI — akceptuje zarówno ciąg znaków `prompt`, jak i tablicę `messages`, automatycznie normalizuje się do formatu czatu -**EndpointPage**: teraz pokazuje wszystkie 3 typy punktów końcowych zgodnych z OpenAI: uzupełnienia czatu, interfejs API odpowiedzi i uzupełnienia starszego typu -**i18n**: Dodano `completionsLegacy/completionsLegacyDesc` do 30 plików językowych### Fixed

-**OAuthModal**: Naprawiono „[obiekt obiektu]” wyświetlany we wszystkich błędach połączenia OAuth — prawidłowo wyodrębnij „.message” z obiektów odpowiedzi na błąd we wszystkich 3 wywołaniach „throw new Error(data.error)” (wymiana, kod urządzenia, autoryzacja)

- Wpływa na Cline, Codex, GitHub, Qwen, Kiro i wszystkich innych dostawców OAuth## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Dodaj `decodeURIComponent` przed dekodowaniem base64, aby kody autoryzacji zakodowane w adresie URL z adresu URL wywołania zwrotnego były poprawnie analizowane, co naprawiało błędy „nieprawidłowego lub wygasłego kodu autoryzacyjnego” w konfiguracjach zdalnych (IP LAN) -**Cline OAuth**: `mapTokens` wypełnia teraz `name = imię + nazwisko || e-mail”, aby konta Cline wyświetlały prawdziwe nazwy użytkowników zamiast „Numer konta”
-**Nazwy kont OAuth**: Wszystkie przepływy wymiany OAuth (wymiana, ankieta, wywołanie zwrotne) normalizują teraz „nazwa = e-mail”, gdy brakuje nazwy, więc każde konto OAuth wyświetla swój adres e-mail jako etykietę wyświetlaną w panelu dostawcy
-**Nazwy kont OAuth**: Usunięto rezerwowe sekwencyjne „Konto N” w `db/providers.ts`— konta bez adresu e-mail/nazwy używają teraz stabilnej etykiety opartej na identyfikatorze za pośrednictwem`getAccountDisplayName()` zamiast numeru kolejnego, który zmienia się po usunięciu konta## [2.3.6] - 2026-03-12

### Fixed

-**Partia testowa dostawcy**: Naprawiono schemat Zoda, aby akceptował `providerId: null` (frontend wysyła wartość null dla trybów innych niż dostawca); błędnie zwracał „Nieprawidłowe żądanie” dla wszystkich testów wsadowych -**Modal testu dostawcy**: Naprawiono wyświetlanie `[obiekt obiektu]` poprzez normalizację obiektów błędów API do ciągów znaków przed renderowaniem w `setTestResults` i `ProviderTestResultsView` -**i18n**: Dodano brakujące klucze `cliTools.toolDescriptions.opencode`, `cliTools.toolDescriptions.kiro`, `cliTools.guides.opencode`, `cliTools.guides.kiro` do `en.json` -**i18n**: Zsynchronizowano 1111 brakujących kluczy we wszystkich 29 plikach w języku innym niż angielski, używając wartości angielskich jako wartości rezerwowych## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Dodano stałą poprawkę `postinstall`, która kopiuje `@swc/helpers` do `node_modules` samodzielnej aplikacji — zapobiega awarii MODULE_NOT_FOUND podczas globalnych instalacji npm## [2.3.4] - 2026-03-10

### Added

- Integracja wielu dostawców i ulepszenia pulpitu nawigacyjnego
