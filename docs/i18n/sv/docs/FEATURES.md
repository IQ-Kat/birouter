# OmniRoute — Dashboard Features Gallery (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Visuell guide till varje avsnitt av OmniRoute-instrumentpanelen.---

## 🔌 Providers

Hantera AI-leverantörsanslutningar: OAuth-leverantörer (Claude Code, Codex, Gemini CLI), API-nyckelleverantörer (Groq, DeepSeek, OpenRouter) och gratisleverantörer (Qoder, Qwen, Kiro). Kiro-konton inkluderar spårning av kreditsaldo – återstående krediter, total ersättning och förnyelsedatum synligt i Dashboard → Användning.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Skapa modellroutingkombinationer med 6 strategier: prioritet, viktad, round-robin, slumpmässig, minst använda och kostnadsoptimerad. Varje kombination kedjer flera modeller med automatisk reserv och inkluderar snabba mallar och beredskapskontroller.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Omfattande användningsanalys med tokenförbrukning, kostnadsberäkningar, aktivitetsvärmekartor, veckofördelningsdiagram och uppdelningar per leverantör.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Realtidsövervakning: drifttid, minne, version, latenspercentiler (p50/p95/p99), cachestatistik och leverantörs strömbrytartillstånd.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Fyra lägen för att felsöka API-översättningar:**Lekplats**(formatomvandlare),**Chatttestare**(liveförfrågningar),**Testbänk**(batchtester) och**Live Monitor**(strömning i realtid).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Testa valfri modell direkt från instrumentbrädan. Välj leverantör, modell och slutpunkt, skriv uppmaningar med Monaco Editor, strömma svar i realtid, avbryt mitt i strömmen och visa timingstatistik.---

## 🎨 Themes _(v2.0.5+)_

Anpassningsbara färgteman för hela instrumentpanelen. Välj mellan 7 förinställda färger (korall, blå, röd, grön, violett, orange, cyan) eller skapa ett anpassat tema genom att välja valfri hex-färg. Stöder ljus, mörk och systemläge.---

## ⚙️ Settings

Omfattande inställningspanel med flikar:

-**Allmänt**— Systemlagring, säkerhetskopieringshantering (export/import databas) -**Utseende**— Temaväljare (mörkt/ljus/system), förinställningar för färgtema och anpassade färger, synlighet i hälsologgar, synlighetskontroller för sidofältsobjekt -**Säkerhet**— API-ändpunktsskydd, anpassad leverantörsblockering, IP-filtrering, sessionsinformation -**Routing**— Modellalias, försämring av bakgrundsuppgifter -**Resiliens**— Frekvensgränsbeständighet, strömbrytarinställning, automatisk inaktivering av förbjudna konton, övervakning av leverantörens utgångsdatum -**Avancerat**— Konfigurationsförbidrag, konfigurationsrevisionsspår, reservförsämringsläge![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Konfiguration med ett klick för AI-kodningsverktyg: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor och Factory Droid. Har automatisk applicering/återställning av konfiguration, anslutningsprofiler och modellmappning.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Dashboard för att upptäcka och hantera CLI-agenter. Visar ett rutnät med 14 inbyggda agenter (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) med:

-**Installationsstatus**— Installerad/hittad ej med versionsdetektering -**Protokollmärken**— stdio, HTTP, etc. -**Anpassade agenter**— Registrera alla CLI-verktyg via formulär (namn, binär, versionskommando, spawn args) -**CLI Fingerprint Matching**— Växla per leverantör för att matcha inbyggda CLI-begäransignaturer, vilket minskar risken för avstängning samtidigt som proxy-IP bevaras---

## 🖼️ Media _(v2.0.3+)_

Generera bilder, videor och musik från instrumentpanelen. Stöder OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open och MusicGen.---

## 📝 Request Logs

Loggning av förfrågningar i realtid med filtrering efter leverantör, modell, konto och API-nyckel. Visar statuskoder, tokenanvändning, latens och svarsdetaljer.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Din enhetliga API-slutpunkt med kapacitetsuppdelning: Chattavslut, svars-API, inbäddningar, bildgenerering, omrankning, ljudtranskription, text-till-tal, moderering och registrerade API-nycklar. Cloudflare Quick Tunnel-integration och molnproxystöd för fjärråtkomst.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Skapa, omfång och återkalla API-nycklar. Varje nyckel kan begränsas till specifika modeller/leverantörer med full åtkomst eller skrivskyddad behörighet. Visuell nyckelhantering med användningsspårning.---

## 📋 Audit Log

Administrativ åtgärdsspårning med filtrering efter åtgärdstyp, aktör, mål, IP-adress och tidsstämpel. Fullständig säkerhetshändelsehistorik.---

## 🖥️ Desktop Application

Native Electron desktop app för Windows, macOS och Linux. Kör OmniRoute som en fristående applikation med systemfältsintegration, offlinesupport, automatisk uppdatering och installation med ett klick.

Nyckelfunktioner:

- Polling av serverberedskap (ingen tom skärm vid kallstart)
- Systembricka med porthantering
- Innehållssäkerhetspolicy
- Engångslås
- Automatisk uppdatering vid omstart
- Plattformsbetingat gränssnitt (macOS trafikljus, Windows/Linux standardtitelfält)
- Härdat Electron build-paketering — symboliska "node_modules" i det fristående paketet upptäcks och avvisas före paketering, vilket förhindrar körtidsberoende på byggmaskinen (v2.5.5+)

📖 Se [`electron/README.md`](../electron/README.md) för fullständig dokumentation.
