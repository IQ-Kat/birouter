# OmniRoute — Galerie funkcí řídicího panelu

🌐 **Jazyky:** 🇺🇸 [angličtina](FEATURES.md) | 🇧🇷 [Português (Brazílie)](i18n/pt-BR/FEATURES.md) | 🇪🇸 [Español](i18n/es/FEATURES.md) | 🇫🇷 [Français](i18n/fr/FEATURES.md) | 🇮🇹 [Italiano](i18n/it/FEATURES.md) | 🇷🇺 [Русский](i18n/ru/FEATURES.md) | 🇨🇳[中文 (简体)](i18n/zh-CN/FEATURES.md) | 🇩🇪 [Deutsch](i18n/de/FEATURES.md) | 🇮🇳 [हिन्दी](i18n/in/FEATURES.md) | 🇹🇭 [ไทย](i18n/th/FEATURES.md) | 🇺🇦 [Українська](i18n/uk-UA/FEATURES.md) | 🇸🇦 [العربية](i18n/ar/FEATURES.md) | 🇯🇵[日本語](i18n/ja/FEATURES.md)| 🇻🇳 [Tiếng Việt](i18n/vi/FEATURES.md) | 🇧🇬 [Български](i18n/bg/FEATURES.md) | 🇩🇰 [Dánsko](i18n/da/FEATURES.md) | 🇫🇮 [Suomi](i18n/fi/FEATURES.md) | 🇮🇱 [עברית](i18n/he/FEATURES.md) | 🇭🇺 [maďarština](i18n/hu/FEATURES.md) | 🇮🇩 [Bahasa Indonésie](i18n/id/FEATURES.md) | 🇰🇷 [한국어](i18n/ko/FEATURES.md) | 🇲🇾 [Bahasa Melayu](i18n/ms/FEATURES.md) | 🇳🇱 [Nizozemsko](i18n/nl/FEATURES.md) | 🇳🇴 [Norsk](i18n/no/FEATURES.md) | 🇵🇹 [Português (Portugalsko)](i18n/pt/FEATURES.md) | 🇷🇴 [Română](i18n/ro/FEATURES.md) | 🇵🇱 [Polski](i18n/pl/FEATURES.md) | 🇸🇰 [Slovenčina](i18n/sk/FEATURES.md) | 🇸🇪 [Svenska](i18n/sv/FEATURES.md) | 🇵🇭 [Filipínec](i18n/phi/FEATURES.md) | 🇨🇿 [Čeština](i18n/cs/FEATURES.md)

Vizuální průvodce všemi částmi ovládacího panelu OmniRoute.

---

## 🔌 Poskytovatelé

Spravujte připojení poskytovatelů AI: poskytovatelé OAuth (Claude Code, Codex, Gemini CLI), poskytovatelé klíčů API (Groq, DeepSeek, OpenRouter) a bezplatní poskytovatelé (iFlow, Qwen, Kiro). Účty Kiro zahrnují sledování zůstatku kreditů – zbývající kredity, celkový limit a datum obnovení jsou viditelné v Dashboard → Usage.

![Dashboard poskytovatelů](screenshots/01-providers.png)

---

## 🎨 Kombinace

Vytvářejte kombinace směrování modelů pomocí 6 strategií: prioritní, vážená, kruhová, náhodná, nejméně používaná a nákladově optimalizovaná. Každá kombinace řetězí více modelů s automatickým přepínáním mezi nimi a zahrnuje rychlé šablony a kontroly připravenosti.

![Dashboard kombinací](screenshots/02-combos.png)

---

## 📊 Analytika

Komplexní analýzy využití se spotřebou tokenů, odhady nákladů, mapami aktivit, týdenními distribučními grafy a rozpisy podle jednotlivých poskytovatelů.

![Analytický řídicí panel](screenshots/03-analytics.png)

---

## 🏥 Stav systému

Monitorování v reálném čase: dostupnost, paměť, verze, percentily latence (p50/p95/p99), statistiky mezipaměti a stavy jističů poskytovatelů.

![Dashboard zdraví](screenshots/04-health.png)

---

## 🔧 Překladatelské hřiště

Čtyři režimy pro ladění překladů API: **Playground** (převodník formátů), **Chat Tester** (živé požadavky), **Test Bench** (dávkové testy) a **Live Monitor** (stream v reálném čase).

![Hřiště překladatelů](screenshots/05-translator.png)

---

## 🎮 Modelové hřiště *(v2.0.9+)*

Otestujte libovolný model přímo z řídicího panelu. Vyberte poskytovatele, model a koncový bod, pište výzvy pomocí editoru Monaco, streamujte odpovědi v reálném čase, přerušte stream a zobrazte metriky časování.

---

## 🎨 Témata *(v2.0.5+)*

Přizpůsobitelná barevná témata pro celý dashboard. Vyberte si ze 7 přednastavených barev (korálová, modrá, červená, zelená, fialová, oranžová, azurová) nebo si vytvořte vlastní téma výběrem libovolné hexadecimální barvy. Podporuje světlý, tmavý a systémový režim.

---

## ⚙️ Nastavení

Komplexní panel nastavení s kartami:

- **Obecné** – Systémové úložiště, správa záloh (export/import databáze)
- **Vzhled** – Výběr motivu (tmavý/světlý/systémový), přednastavené barevné motivy a vlastní barvy, viditelnost protokolu stavu
- **Zabezpečení** — ochrana koncových bodů API, blokování vlastních poskytovatelů, filtrování IP adres, informace o relaci
- **Směrování** — Aliasy modelů, degradace úloh na pozadí
- **Odolnost** — Perzistence omezení rychlosti, ladění jističe
- **Pokročilé** – Přepsání konfigurace

![Ovládací panel nastavení](screenshots/06-settings.png)

---

## 🔧 Nástroje CLI

Konfigurace nástrojů pro kódování s umělou inteligencí jedním kliknutím: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor a Factory Droid. Nabízí automatické použití/resetování konfigurace, profily připojení a mapování modelů.

![Řídicí panel nástrojů CLI](screenshots/07-cli-tools.png)

---

## 🤖 Agenti CLI *(v2.0.11+)*

Ovládací panel pro vyhledávání a správu agentů CLI. Zobrazuje mřížku 14 vestavěných agentů (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) s:

- **Stav instalace** — Nainstalováno / Nenalezeno s detekcí verze
- **Odznaky protokolů** – stdio, HTTP atd.
- **Vlastní agenti** — Registrace libovolného nástroje CLI pomocí formuláře (název, binární soubor, verze příkazu, argumenty spawn)
- **Porovnávání otisků prstů v příkazovém řádku** – Přepínání pro jednotlivé poskytovatele pro porovnávání nativních podpisů požadavků v příkazovém řádku, čímž se snižuje riziko zablokování a zároveň se zachovává IP adresa proxy.

---

## 🖼️ Média *(v2.0.3+)*

Generujte obrázky, videa a hudbu z řídicího panelu. Podporuje OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open a MusicGen.

---

## 📝 Vyžádat si protokoly

Protokolování požadavků v reálném čase s filtrováním podle poskytovatele, modelu, účtu a klíče API. Zobrazuje stavové kódy, využití tokenů, latenci a podrobnosti o odpovědi.

![Protokoly používání](screenshots/08-usage.png)

---

## 🌐 Koncový bod API

Váš jednotný koncový bod API s rozpisem funkcí: Dokončování chatu, API odpovědí, vkládání, generování obrázků, změna pořadí, přepis zvuku, převod textu na řeč, moderování a registrované klíče API. Podpora cloudového proxy pro vzdálený přístup.

![Dashboard koncového bodu](screenshots/09-endpoint.png)

---

## 🔑 Správa klíčů API

Vytvářejte, upravujte rozsah a rušte klíče API. Každý klíč lze omezit na konkrétní modely/poskytovatele s plným přístupem nebo oprávněním pouze pro čtení. Vizuální správa klíčů se sledováním využití.

---

## 📋 Záznam auditu

Sledování administrativních akcí s filtrováním podle typu akce, aktéra, cíle, IP adresy a časového razítka. Úplná historie bezpečnostních událostí.

---

## 🖥️ Desktopová aplikace

Desktopová aplikace Native Electron pro Windows, macOS a Linux. Spouštějte OmniRoute jako samostatnou aplikaci s integrací do systémové lišty, podporou offline, automatickými aktualizacemi a instalací jedním kliknutím.

Klíčové vlastnosti:

- Dotazování připravenosti serveru (žádná prázdná obrazovka při studeném startu)
- Systémový panel se správou portů
- Zásady zabezpečení obsahu
- Jednoinstanční zámek
- Automatická aktualizace při restartu
- Podmíněné uživatelské rozhraní pro platformu (semafory pro macOS, výchozí záhlaví okna pro Windows/Linux)
- Zpevněné balení buildů Electron — symbolicky odkazované `node_modules` v samostatném balíčku jsou detekovány a odmítnuty před balením, čímž se zabrání závislosti na buildovacím stroji za běhu (v2.5.5+)

📖 Úplnou dokumentaci naleznete v [`electron/README.md`](../electron/README.md) .
