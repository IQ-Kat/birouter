# OmniRoute — Dashboard Features Gallery (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Wizualny przewodnik po każdej sekcji pulpitu nawigacyjnego OmniRoute.---

## 🔌 Providers

Zarządzaj połączeniami dostawców AI: dostawcami OAuth (Claude Code, Codex, Gemini CLI), dostawcami kluczy API (Groq, DeepSeek, OpenRouter) i bezpłatnymi dostawcami (Qoder, Qwen, Kiro). Konta Kiro umożliwiają śledzenie salda kredytu — pozostałe środki, całkowity limit i datę odnowienia widoczne w Panelu → Wykorzystanie.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Twórz kombinacje routingu modeli z 6 strategiami: priorytetową, ważoną, okrężną, losową, najrzadziej używaną i zoptymalizowaną pod względem kosztów. Każda kombinacja łączy wiele modeli z automatycznym przywracaniem i zawiera szybkie szablony oraz kontrole gotowości.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Kompleksowa analiza użytkowania obejmująca zużycie tokenów, szacunki kosztów, mapy cieplne aktywności, tygodniowe wykresy dystrybucji i zestawienia poszczególnych dostawców.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Monitorowanie w czasie rzeczywistym: czas pracy, pamięć, wersja, percentyle opóźnień (p50/p95/p99), statystyki pamięci podręcznej i stany wyłączników automatycznych dostawcy.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Cztery tryby debugowania tłumaczeń API:**Playground**(konwerter formatów),**Chat Tester**(żądania na żywo),**Test Bench**(testy wsadowe) i**Live Monitor**(strumień w czasie rzeczywistym).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Przetestuj dowolny model bezpośrednio z pulpitu nawigacyjnego. Wybierz dostawcę, model i punkt końcowy, pisz podpowiedzi za pomocą edytora Monaco, przesyłaj strumieniowo odpowiedzi w czasie rzeczywistym, przerwij transmisję w połowie i przeglądaj metryki czasu.---

## 🎨 Themes _(v2.0.5+)_

Konfigurowalne motywy kolorystyczne dla całego pulpitu nawigacyjnego. Wybierz jeden z 7 gotowych kolorów (koralowy, niebieski, czerwony, zielony, fioletowy, pomarańczowy, cyjan) lub utwórz własny motyw, wybierając dowolny kolor szesnastkowy. Obsługuje tryb jasny, ciemny i systemowy.---

## ⚙️ Settings

Rozbudowany panel ustawień z zakładkami:

-**Ogólne**— Pamięć systemowa, zarządzanie kopiami zapasowymi (baza danych eksportu/importu) -**Wygląd**— Selektor motywu (ciemny/jasny/system), ustawienia motywu kolorów i kolory niestandardowe, widoczność dziennika stanu, elementy sterujące widocznością elementów na pasku bocznym -**Bezpieczeństwo**— ochrona punktu końcowego API, niestandardowe blokowanie dostawców, filtrowanie IP, informacje o sesji -**Routing**— Aliasy modeli, degradacja zadań w tle -**Odporność**— Utrzymywanie limitów szybkości, dostrajanie wyłączników automatycznych, automatyczne wyłączanie zbanowanych kont, monitorowanie wygaśnięcia ważności dostawcy -**Zaawansowane**— Zastąpienie konfiguracji, ścieżka audytu konfiguracji, awaryjny tryb degradacji![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Konfiguracja narzędzi do kodowania AI za pomocą jednego kliknięcia: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Kontynuuj, Cursor i Factory Droid. Zawiera automatyczne stosowanie/resetowanie konfiguracji, profile połączeń i mapowanie modeli.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Panel do wyszukiwania agentów CLI i zarządzania nimi. Pokazuje siatkę 14 wbudowanych agentów (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) z:

-**Stan instalacji**— Zainstalowano / Nie znaleziono z wykrywaniem wersji -**Identyfikatory protokołów**— stdio, HTTP itp. -**Niestandardowi agenci**— Zarejestruj dowolne narzędzie CLI za pomocą formularza (nazwa, plik binarny, polecenie wersji, argumenty spawnu) -**Dopasowanie odcisków palców CLI**— Przełącznik dla poszczególnych dostawców w celu dopasowania natywnych podpisów żądań CLI, zmniejszając ryzyko bana przy jednoczesnym zachowaniu adresu IP serwera proxy---

## 🖼️ Media _(v2.0.3+)_

Generuj obrazy, filmy i muzykę z poziomu pulpitu nawigacyjnego. Obsługuje OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open i MusicGen.---

## 📝 Request Logs

Rejestrowanie żądań w czasie rzeczywistym z filtrowaniem według dostawcy, modelu, konta i klucza API. Pokazuje kody stanu, użycie tokenu, opóźnienie i szczegóły odpowiedzi.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Twój ujednolicony punkt końcowy interfejsu API z podziałem możliwości: uzupełnianie czatu, interfejs API odpowiedzi, osadzanie, generowanie obrazu, zmiana rankingu, transkrypcja audio, zamiana tekstu na mowę, moderacje i zarejestrowane klucze API. Integracja z Cloudflare Quick Tunnel i obsługa proxy w chmurze dla zdalnego dostępu.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Twórz, ustalaj zakres i unieważniaj klucze API. Każdy klucz może być ograniczony do określonych modeli/dostawców z pełnym dostępem lub uprawnieniami tylko do odczytu. Wizualne zarządzanie kluczami ze śledzeniem użycia.---

## 📋 Audit Log

Śledzenie działań administracyjnych z filtrowaniem według typu działania, aktora, celu, adresu IP i znacznika czasu. Pełna historia zdarzeń związanych z bezpieczeństwem.---

## 🖥️ Desktop Application

Natywna aplikacja komputerowa Electron dla systemów Windows, macOS i Linux. Uruchom OmniRoute jako samodzielną aplikację z integracją z zasobnikiem systemowym, obsługą offline, automatyczną aktualizacją i instalacją jednym kliknięciem.

Kluczowe cechy:

- Odpytywanie o gotowość serwera (bez pustego ekranu przy zimnym starcie)
- Taca systemowa z zarządzaniem portami
- Polityka bezpieczeństwa treści
- Blokada jednoinstancyjna
- Automatyczna aktualizacja po ponownym uruchomieniu
- Interfejs użytkownika zależny od platformy (sygnalizacja świetlna macOS, domyślny pasek tytułowy Windows/Linux)
- Ulepszone pakowanie kompilacji Electron — dowiązania symboliczne „node_modules” w samodzielnym pakiecie są wykrywane i odrzucane przed pakowaniem, zapobiegając uzależnieniu środowiska wykonawczego od maszyny budującej (wersja 2.5.5+)

📖 Zobacz [`electron/README.md`](../electron/README.md), aby uzyskać pełną dokumentację.
