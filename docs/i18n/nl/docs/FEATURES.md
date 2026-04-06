# OmniRoute — Dashboard Features Gallery (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Visuele gids voor elke sectie van het OmniRoute-dashboard.---

## 🔌 Providers

Beheer AI-providerverbindingen: OAuth-providers (Claude Code, Codex, Gemini CLI), API-sleutelproviders (Groq, DeepSeek, OpenRouter) en gratis providers (Qoder, Qwen, Kiro). Kiro-accounts omvatten het bijhouden van het kredietsaldo: resterende tegoeden, totaalbedrag en verlengingsdatum zichtbaar in Dashboard → Gebruik.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Creëer modelrouteringscombinaties met 6 strategieën: prioriteit, gewogen, round-robin, willekeurig, minst gebruikt en kostengeoptimaliseerd. Elke combo koppelt meerdere modellen met automatische fallback en bevat snelle sjablonen en gereedheidscontroles.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Uitgebreide gebruiksanalyses met tokenverbruik, kostenramingen, activiteiten-heatmaps, wekelijkse distributiegrafieken en uitsplitsingen per provider.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Realtime monitoring: uptime, geheugen, versie, latentiepercentielen (p50/p95/p99), cachestatistieken en status van stroomonderbrekers van de provider.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Vier modi voor het debuggen van API-vertalingen:**Playground**(formaatconverter),**Chat Tester**(live verzoeken),**Test Bench**(batchtests) en**Live Monitor**(realtime stream).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Test elk model rechtstreeks vanaf het dashboard. Selecteer provider, model en eindpunt, schrijf prompts met Monaco Editor, stream reacties in realtime, beëindig halverwege de stream en bekijk timingstatistieken.---

## 🎨 Themes _(v2.0.5+)_

Aanpasbare kleurthema's voor het hele dashboard. Kies uit 7 vooraf ingestelde kleuren (koraal, blauw, rood, groen, violet, oranje, cyaan) of creëer een aangepast thema door een willekeurige hex-kleur te kiezen. Ondersteunt lichte, donkere en systeemmodus.---

## ⚙️ Settings

Uitgebreid instellingenpaneel met tabbladen:

-**Algemeen**— Systeemopslag, back-upbeheer (database exporteren/importeren) -**Uiterlijk**: themakiezer (donker/licht/systeem), voorinstellingen voor kleurthema's en aangepaste kleuren, zichtbaarheid van gezondheidslogboeken, bedieningselementen voor zichtbaarheid van items in de zijbalk -**Beveiliging**— API-eindpuntbescherming, aangepaste providerblokkering, IP-filtering, sessie-informatie -**Routing**— Modelaliassen, verslechtering van achtergrondtaak -**Veerkracht**— persistentie van tarieflimieten, afstemming van stroomonderbrekers, automatische uitschakeling van geblokkeerde accounts, monitoring van de vervaldatum van de provider -**Geavanceerd**— Configuratieoverschrijvingen, configuratie-audittraject, terugvaldegradatiemodus![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Configuratie met één klik voor AI-coderingstools: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor en Factory Droid. Beschikt over geautomatiseerde configuratie-toepas/reset, verbindingsprofielen en modeltoewijzing.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Dashboard voor het ontdekken en beheren van CLI-agents. Toont een raster van 14 ingebouwde agenten (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) met:

-**Installatiestatus**— Geïnstalleerd/niet gevonden met versiedetectie -**Protocolbadges**— stdio, HTTP, etc. -**Aangepaste agenten**— Registreer elke CLI-tool via een formulier (naam, binair bestand, versieopdracht, spawn-args) -**CLI Fingerprint Matching**— Schakel per provider om de handtekeningen van native CLI-verzoeken te matchen, waardoor het verbodsrisico wordt verminderd terwijl het proxy-IP behouden blijft---

## 🖼️ Media _(v2.0.3+)_

Genereer afbeeldingen, video's en muziek vanaf het dashboard. Ondersteunt OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open en MusicGen.---

## 📝 Request Logs

Realtime logboekregistratie van verzoeken met filtering op provider, model, account en API-sleutel. Toont statuscodes, tokengebruik, latentie en responsdetails.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Uw uniforme API-eindpunt met uitsplitsing van de mogelijkheden: chatvoltooiingen, respons-API, insluitingen, het genereren van afbeeldingen, herrangschikking, audiotranscriptie, tekst-naar-spraak, moderaties en geregistreerde API-sleutels. Cloudflare Quick Tunnel-integratie en cloudproxy-ondersteuning voor externe toegang.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

API-sleutels maken, bereiken en intrekken. Elke sleutel kan worden beperkt tot specifieke modellen/providers met volledige toegang of alleen-lezen-rechten. Visueel sleutelbeheer met gebruiksregistratie.---

## 📋 Audit Log

Administratieve actietracking met filtering op actietype, actor, doel, IP-adres en tijdstempel. Volledige geschiedenis van beveiligingsgebeurtenissen.---

## 🖥️ Desktop Application

Native Electron desktop-app voor Windows, macOS en Linux. Voer OmniRoute uit als een zelfstandige toepassing met systeemvakintegratie, offline ondersteuning, automatische updates en installatie met één klik.

Belangrijkste kenmerken:

- Polling van servergereedheid (geen leeg scherm bij koude start)
- Systeemvak met poortbeheer
- Inhoudsbeveiligingsbeleid
- Vergrendeling met één exemplaar
- Automatische update bij opnieuw opstarten
- Platform-voorwaardelijke gebruikersinterface (macOS-verkeerslichten, standaardtitelbalk van Windows/Linux)
- Hardened Electron build-verpakking - symlinked `node_modules` in de stand-alone bundel wordt gedetecteerd en afgewezen vóór het verpakken, waardoor runtime-afhankelijkheid van de build-machine wordt voorkomen (v2.5.5+)

📖 Zie [`electron/README.md`](../electron/README.md) voor volledige documentatie.
