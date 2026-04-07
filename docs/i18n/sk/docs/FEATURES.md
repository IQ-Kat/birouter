# OmniRoute — Dashboard Features Gallery (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Vizuálny sprievodca každou sekciou ovládacieho panela OmniRoute.---

## 🔌 Providers

Spravujte pripojenia poskytovateľov AI: poskytovatelia OAuth (Claude Code, Codex, Gemini CLI), poskytovatelia kľúčov API (Groq, DeepSeek, OpenRouter) a bezplatní poskytovatelia (Qoder, Qwen, Kiro). Účty Kiro zahŕňajú sledovanie zostatku kreditu – zostávajúce kredity, celkový príspevok a dátum obnovenia sú viditeľné v Dashboard → Použitie.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Vytvorte kombá smerovania modelov so 6 stratégiami: prioritná, vážená, obojstranná, náhodná, najmenej používaná a nákladovo optimalizovaná. Každé kombo spája viacero modelov s automatickým vrátením a obsahuje rýchle šablóny a kontroly pripravenosti.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Komplexná analýza používania so spotrebou tokenov, odhadmi nákladov, teplotnými mapami aktivít, týždennými distribučnými grafmi a rozpismi podľa poskytovateľov.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Monitorovanie v reálnom čase: dostupnosť, pamäť, verzia, percentily latencie (p50/p95/p99), štatistiky vyrovnávacej pamäte a stavy ističov poskytovateľa.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Štyri režimy ladenia prekladov API:**Playground**(konvertor formátov), ​​**Chat Tester**(živé požiadavky),**Test Bench**(dávkové testy) a**Live Monitor**(stream v reálnom čase).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Otestujte akýkoľvek model priamo z palubnej dosky. Vyberte poskytovateľa, model a koncový bod, píšte výzvy pomocou editora Monaco, streamujte odpovede v reálnom čase, rušte uprostred streamu a zobrazujte metriky časovania.---

## 🎨 Themes _(v2.0.5+)_

Prispôsobiteľné farebné motívy pre celý prístrojový panel. Vyberte si zo 7 prednastavených farieb (koralová, modrá, červená, zelená, fialová, oranžová, azúrová) alebo si vytvorte vlastný motív výberom ľubovoľnej šesťhrannej farby. Podporuje svetlý, tmavý a systémový režim.---

## ⚙️ Settings

Komplexný panel nastavení s kartami:

-**Všeobecné**— Systémové úložisko, správa zálohovania (export/import databázy) -**Vzhľad**— Výber motívu (tmavý/svetlý/systém), prednastavenia farebných motívov a vlastné farby, viditeľnosť zdravotného denníka, ovládacie prvky viditeľnosti položiek na bočnom paneli -**Bezpečnosť**— Ochrana koncového bodu API, blokovanie vlastného poskytovateľa, filtrovanie IP, informácie o relácii -**Routovanie**— Modelové aliasy, degradácia úloh na pozadí
–**Odolnosť**– Perzistencia rýchlostného limitu, ladenie ističa, automatické deaktivovanie zakázaných účtov, sledovanie uplynutia platnosti poskytovateľa -**Pokročilé**– Prepisy konfigurácie, záznam o audite konfigurácie, záložný režim degradácie![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Konfigurácia nástrojov na kódovanie AI jedným kliknutím: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor a Factory Droid. Obsahuje automatické použitie/resetovanie konfigurácie, profily pripojenia a mapovanie modelov.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Dashboard na vyhľadávanie a správu agentov CLI. Zobrazuje mriežku 14 vstavaných agentov (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) s:

-**Stav inštalácie**— Nainštalované / Nenájdené s detekciou verzie -**Odznaky protokolu**— stdio, HTTP atď. -**Vlastní agenti**— Zaregistrujte akýkoľvek nástroj CLI prostredníctvom formulára (názov, binárny súbor, príkaz verzie, spúšťacie argumenty) -**CLI Fingerprint Matching**– Prepínanie podľa jednotlivých poskytovateľov, aby sa zhodovali podpisy natívnych požiadaviek CLI, čím sa znižuje riziko zákazu pri zachovaní adresy IP proxy---

## 🖼️ Media _(v2.0.3+)_

Vytvárajte obrázky, videá a hudbu z ovládacieho panela. Podporuje OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open a MusicGen.---

## 📝 Request Logs

Protokolovanie požiadaviek v reálnom čase s filtrovaním podľa poskytovateľa, modelu, účtu a kľúča API. Zobrazuje stavové kódy, využitie tokenu, latenciu a podrobnosti o odozve.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Váš zjednotený koncový bod rozhrania API s rozdelením funkcií: Dokončenia rozhovoru, API odpovedí, vkladanie, generovanie obrázkov, zmena poradia, prepis zvuku, prevod textu na reč, moderovanie a registrované kľúče rozhrania API. Integrácia Cloudflare Quick Tunnel a podpora cloudového proxy pre vzdialený prístup.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Vytváranie, rozsah a odvolávanie kľúčov API. Každý kľúč môže byť obmedzený na konkrétne modely/poskytovateľov s plným prístupom alebo oprávneniami len na čítanie. Vizuálna správa kľúčov so sledovaním používania.---

## 📋 Audit Log

Sledovanie administratívnej akcie s filtrovaním podľa typu akcie, aktéra, cieľa, IP adresy a časovej pečiatky. Úplná história bezpečnostných udalostí.---

## 🖥️ Desktop Application

Natívna desktopová aplikácia Electron pre Windows, MacOS a Linux. Spustite OmniRoute ako samostatnú aplikáciu s integráciou na systémovej lište, offline podporou, automatickou aktualizáciou a inštaláciou jedným kliknutím.

Kľúčové vlastnosti:

- Dotazovanie pripravenosti servera (žiadna prázdna obrazovka pri studenom štarte)
- Systémová lišta so správou portov
- Zásady zabezpečenia obsahu
- Jednostupňový zámok
- Auto-update on restart
- Platformovo podmienené používateľské rozhranie (semafory pre macOS, predvolený nadpis systému Windows/Linux)
- Balenie zostavy zosilnených elektrónov – symbolicky prepojené `node_modules` v samostatnom balíku sa pred balením detegujú a odmietnu, čím sa zabráni závislosti spustenia od zostavovacieho stroja (v2.5.5+)

📖 Úplnú dokumentáciu nájdete v [`electron/README.md`](../electron/README.md).
