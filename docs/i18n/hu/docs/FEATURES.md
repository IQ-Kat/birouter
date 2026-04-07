# OmniRoute — Dashboard Features Gallery (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Vizuális útmutató az OmniRoute irányítópult minden részéhez.---

## 🔌 Providers

AI-szolgáltatói kapcsolatok kezelése: OAuth-szolgáltatók (Claude Code, Codex, Gemini CLI), API-kulcs-szolgáltatók (Groq, DeepSeek, OpenRouter) és ingyenes szolgáltatók (Qoder, Qwen, Kiro). A Kiro-számlák tartalmazzák a hitelegyenleg nyomon követését – a fennmaradó kreditek, a teljes juttatás és a megújítási dátum látható az Irányítópult → Használat menüpontban.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Hozzon létre modell-útválasztási kombókat 6 stratégiával: prioritás, súlyozott, kör-robin, véletlenszerű, legkevésbé használt és költségoptimalizált. Mindegyik kombó több modellt láncol össze automatikus visszaállítással, valamint gyors sablonokat és készenléti ellenőrzéseket tartalmaz.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Átfogó használati elemzés token-fogyasztással, költségbecslésekkel, tevékenységi hőtérképekkel, heti elosztási diagramokkal és szolgáltatónkénti lebontásokkal.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Valós idejű megfigyelés: üzemidő, memória, verzió, késleltetési százalékok (p50/p95/p99), gyorsítótár-statisztika és szolgáltatói megszakító állapotok.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Négy mód az API-fordítások hibakeresésére:**Playground**(formátum-átalakító),**Chat Tester**(élő kérések),**Test Bench**(kötegelt tesztek) és**Élő figyelő**(valós idejű adatfolyam).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Teszteljen bármely modellt közvetlenül a műszerfalról. Válassza ki a szolgáltatót, a modellt és a végpontot, írjon promptokat a Monaco Editor segítségével, streamelje a válaszokat valós időben, szakítsa meg a streamelést, és tekintse meg az időzítési mutatókat.---

## 🎨 Themes _(v2.0.5+)_

Testreszabható színtémák a teljes műszerfalhoz. Válasszon a 7 előre beállított szín közül (korall, kék, piros, zöld, ibolya, narancs, cián), vagy hozzon létre egyéni témát bármilyen hatszögletű szín kiválasztásával. Támogatja a világos, sötét és rendszermódot.---

## ⚙️ Settings

Átfogó beállítási panel fülekkel:

-**Általános**- Rendszertárolás, biztonsági mentések kezelése (export/import adatbázis) -**Megjelenés**- Témaválasztó (sötét/világos/rendszer), színtéma előre beállított és egyéni színek, állapotnapló láthatósága, oldalsáv elemláthatósági vezérlői -**Biztonság**– API-végpont védelem, egyéni szolgáltatói blokkolás, IP-szűrés, munkamenet-információk -**Útválasztás**— Modellálnevek, háttérfeladat-romlás -**Rugalmasság**- Díjkorlátok fennmaradása, megszakító hangolása, letiltott fiókok automatikus letiltása, szolgáltató lejáratának figyelése -**Speciális**— Konfiguráció felülbírálása, konfigurációs ellenőrzési nyomvonal, tartalék rontási mód![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Egy kattintással konfigurálható mesterséges intelligencia kódoló eszközök: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor és Factory Droid. Automatikus konfigurációs alkalmazás/visszaállítás, csatlakozási profilok és modellleképezés.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Irányítópult a CLI-ügynökök felfedezéséhez és kezeléséhez. 14 beépített ügynökből álló rácsot jelenít meg (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) a következőkkel:

-**Telepítés állapota**- Telepítve / Nem található verzióérzékeléssel -**Protokoll jelvények**— stdio, HTTP stb. -**Egyéni ügynökök**— Regisztráljon bármilyen CLI-eszközt űrlapon keresztül (név, bináris, verzióparancs, spawn args) -**CLI ujjlenyomat-egyeztetés**– szolgáltatónkénti váltás a natív CLI-kérés aláírásainak egyeztetésére, csökkentve a kitiltási kockázatot, miközben megőrzi a proxy IP-címét---

## 🖼️ Media _(v2.0.3+)_

Hozzon létre képeket, videókat és zenét az irányítópultról. Támogatja az OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open és MusicGen alkalmazásokat.---

## 📝 Request Logs

Valós idejű kérések naplózása szolgáltató, modell, fiók és API kulcs szerinti szűréssel. Megjeleníti az állapotkódokat, a tokenhasználatot, a várakozási időt és a válasz részleteit.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Az Ön egységes API-végpontja a képességek lebontásával: csevegés befejezése, válaszok API, beágyazások, képgenerálás, átsorolás, hangátírás, szövegfelolvasó, moderálás és regisztrált API-kulcsok. Cloudflare Quick Tunnel integráció és felhőproxy támogatás a távoli eléréshez.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

API-kulcsok létrehozása, hatóköre és visszavonása. Minden kulcs korlátozható meghatározott modellekre/szolgáltatókra teljes hozzáféréssel vagy csak olvasási engedéllyel. Vizuális kulcskezelés a használat nyomon követésével.---

## 📋 Audit Log

Adminisztratív műveletek követése művelettípus, szereplő, cél, IP-cím és időbélyeg szerinti szűréssel. Teljes biztonsági eseménytörténet.---

## 🖥️ Desktop Application

Native Electron asztali alkalmazás Windows, macOS és Linux rendszerhez. Futtassa az OmniRoute-ot önálló alkalmazásként rendszertálca-integrációval, offline támogatással, automatikus frissítéssel és egy kattintással történő telepítéssel.

Főbb jellemzők:

- Szerver készenléti lekérdezés (hidegindításkor nincs üres képernyő)
- Rendszertálca portkezeléssel
- Tartalombiztonsági szabályzat
- Egypéldányos zár
- Automatikus frissítés újraindításkor
- Platform-feltételes felhasználói felület (macOS közlekedési lámpák, Windows/Linux alapértelmezett címsor)
- Megerősített Electron összeállítási csomagolás – az önálló csomagban lévő szimbolizált "csomópont_modulok" felismerése és elutasítása a csomagolás előtt, megakadályozva a futásidejű függőséget az összeállítási géptől (v2.5.5+)

📖 Lásd: [`electron/README.md`](../electron/README.md) a teljes dokumentációért.
