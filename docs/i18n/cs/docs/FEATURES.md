# OmniRoute — Dashboard Features Gallery (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Vizuální průvodce každou částí řídicího panelu OmniRoute.---

## 🔌 Providers

Správa připojení poskytovatelů AI: poskytovatelé OAuth (Claude Code, Codex, Gemini CLI), poskytovatelé klíčů API (Groq, DeepSeek, OpenRouter) a bezplatní poskytovatelé (Qoder, Qwen, Kiro). Účty Kiro zahrnují sledování zůstatku kreditu – zbývající kredity, celkový příspěvek a datum obnovení jsou viditelné v Dashboard → Použití.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Vytvářejte komba směrování modelů se 6 strategiemi: prioritní, vážená, cyklická, náhodná, nejméně používaná a nákladově optimalizovaná. Každé kombo řetězí více modelů s automatickým nouzovým návratem a zahrnuje rychlé šablony a kontroly připravenosti.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Komplexní analýzy využití se spotřebou tokenů, odhady nákladů, teplotní mapy aktivit, týdenní distribuční grafy a rozpisy podle poskytovatelů.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Monitorování v reálném čase: doba provozuschopnosti, paměť, verze, percentily latence (p50/p95/p99), statistika mezipaměti a stavy jističe poskytovatele.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Čtyři režimy pro ladění překladů API:**Playground**(konvertor formátů),**Chat Tester**(živé požadavky),**Test Bench**(dávkové testy) a**Live Monitor**(stream v reálném čase).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Otestujte jakýkoli model přímo z palubní desky. Vyberte poskytovatele, model a koncový bod, pište výzvy pomocí editoru Monaco, streamujte odpovědi v reálném čase, rušte uprostřed streamu a zobrazujte metriky časování.---

## 🎨 Themes _(v2.0.5+)_

Přizpůsobitelné barevné motivy pro celý přístrojový panel. Vyberte si ze 7 přednastavených barev (korálová, modrá, červená, zelená, fialová, oranžová, azurová) nebo si vytvořte vlastní motiv výběrem libovolné šestihranné barvy. Podporuje světlý, tmavý a systémový režim.---

## ⚙️ Settings

Komplexní panel nastavení s kartami:

-**Obecné**— Systémové úložiště, správa zálohování (export/import databáze) -**Vzhled**— Volič motivu (tmavý/světlý/systém), přednastavení barevných motivů a vlastní barvy, viditelnost zdravotního deníku, ovládací prvky viditelnosti položek na postranním panelu -**Zabezpečení**— Ochrana koncových bodů API, blokování vlastního poskytovatele, filtrování IP, informace o relaci -**Směrování**— Modelové aliasy, degradace úloh na pozadí -**Odolnost**- Perzistence rychlostního limitu, ladění jističe, automatické deaktivace zakázaných účtů, sledování expirace poskytovatele -**Advanced**– Přepisy konfigurace, auditní záznam konfigurace, režim degradace záložního řešení![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Konfigurace jedním kliknutím pro nástroje pro kódování AI: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor a Factory Droid. Obsahuje automatické nastavení konfigurace/resetování, profily připojení a mapování modelu.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Dashboard pro zjišťování a správu agentů CLI. Zobrazuje mřížku 14 vestavěných agentů (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) s:

-**Stav instalace**— Instalováno / Nenalezeno s detekcí verze -**Odznaky protokolu**— stdio, HTTP atd. -**Vlastní agenti**— Zaregistrujte jakýkoli nástroj CLI prostřednictvím formuláře (název, binární soubor, příkaz verze, spawn args) -**CLI Fingerprint Matching**– Přepínání na jednotlivé poskytovatele, aby odpovídalo nativním podpisům požadavků CLI, čímž se snižuje riziko zákazu při zachování IP adresy proxy---

## 🖼️ Media _(v2.0.3+)_

Generujte obrázky, videa a hudbu z řídicího panelu. Podporuje OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open a MusicGen.---

## 📝 Request Logs

Protokolování požadavků v reálném čase s filtrováním podle poskytovatele, modelu, účtu a klíče API. Zobrazuje stavové kódy, využití tokenu, latenci a podrobnosti o odpovědi.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Váš sjednocený koncový bod API s rozdělením schopností: Dokončení chatu, API odpovědí, vkládání, generování obrázků, změna pořadí, přepis zvuku, převod textu na řeč, moderování a registrované klíče rozhraní API. Integrace Cloudflare Quick Tunnel a podpora cloudového proxy pro vzdálený přístup.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Vytvářejte, upravujte a rušte klíče API. Každý klíč může být omezen na konkrétní modely/poskytovatele s plným přístupem nebo oprávněním pouze pro čtení. Vizuální správa klíčů se sledováním využití.---

## 📋 Audit Log

Sledování administrativních akcí s filtrováním podle typu akce, aktéra, cíle, IP adresy a časového razítka. Úplná historie událostí zabezpečení.---

## 🖥️ Desktop Application

Nativní desktopová aplikace Electron pro Windows, macOS a Linux. Spusťte OmniRoute jako samostatnou aplikaci s integrací na systémové liště, offline podporou, automatickou aktualizací a instalací jedním kliknutím.

Klíčové vlastnosti:

- Dotazování připravenosti serveru (žádná prázdná obrazovka při studeném startu)
- Systémová lišta se správou portů
- Zásady zabezpečení obsahu
- Jednoinstanční zámek
- Automatická aktualizace při restartu
- Platformově podmíněné uživatelské rozhraní (semafory macOS, výchozí titulek Windows/Linux)
- Balení sestavení Hardened Electron – symbolicky propojené `node_modules` v samostatném balíčku jsou detekovány a odmítnuty před zabalením, čímž se zabrání závislosti běhu na sestavení (v2.5.5+)

📖 Úplnou dokumentaci naleznete v [`electron/README.md`](../electron/README.md).
