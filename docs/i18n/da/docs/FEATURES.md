# OmniRoute — Dashboard Features Gallery (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Visuel guide til hver sektion af OmniRoute-dashboardet.---

## 🔌 Providers

Administrer AI-udbyderforbindelser: OAuth-udbydere (Claude Code, Codex, Gemini CLI), API-nøgleudbydere (Groq, DeepSeek, OpenRouter) og gratis udbydere (Qoder, Qwen, Kiro). Kiro-konti inkluderer sporing af kreditsaldo - resterende kreditter, samlet godtgørelse og fornyelsesdato synlig i Dashboard → Brug.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Opret modelrouting-kombinationer med 6 strategier: prioritet, vægtet, round-robin, tilfældig, mindst brugt og omkostningsoptimeret. Hver combo kæder flere modeller med automatisk fallback og inkluderer hurtige skabeloner og klarhedstjek.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Omfattende brugsanalyse med token-forbrug, omkostningsestimater, aktivitetsvarmekort, ugentlige distributionsdiagrammer og opdelinger pr. udbyder.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Overvågning i realtid: oppetid, hukommelse, version, latency percentiler (p50/p95/p99), cache-statistik og udbyderens afbrydertilstande.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Fire tilstande til fejlfinding af API-oversættelser:**Playground**(formatkonverter),**Chat Tester**(live-anmodninger),**Test Bench**(batchtest) og**Live Monitor**(streaming i realtid).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Test enhver model direkte fra instrumentbrættet. Vælg udbyder, model og slutpunkt, skriv prompts med Monaco Editor, stream svar i realtid, afbryd midt-stream, og se timing-metrics.---

## 🎨 Themes _(v2.0.5+)_

Brugerdefinerbare farvetemaer til hele dashboardet. Vælg mellem 7 forudindstillede farver (koral, blå, rød, grøn, violet, orange, cyan) eller opret et brugerdefineret tema ved at vælge en hex-farve. Understøtter lys, mørk og systemtilstand.---

## ⚙️ Settings

Omfattende indstillingspanel med faner:

-**Generelt**— Systemlagring, backupstyring (eksport/importdatabase) -**Udseende**— Temavælger (mørke/lys/system), forudindstillinger af farvetema og brugerdefinerede farver, synlighed i sundhedslog, synlighedskontrol for sidebjælkeelementer -**Sikkerhed**— API-endepunktsbeskyttelse, tilpasset udbyderblokering, IP-filtrering, sessionsoplysninger -**Routing**— Modelaliaser, forringelse af baggrundsopgaver -**Resiliens**— Frekvensgrænsevedholdenhed, tuning af strømafbryder, automatisk deaktivering af forbudte konti, overvågning af udbyderens udløb -**Avanceret**— Konfigurationstilsidesættelser, konfigurationsrevisionsspor, fallback-forringelsestilstand![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Et-klik-konfiguration til AI-kodningsværktøjer: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor og Factory Droid. Indeholder automatiseret konfigurationsanvendelse/nulstilling, forbindelsesprofiler og modelkortlægning.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Dashboard til at opdage og administrere CLI-agenter. Viser et gitter med 14 indbyggede agenter (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) med:

-**Installationsstatus**— Installeret / Ikke fundet med versionsregistrering -**Protokolmærker**— stdio, HTTP osv. -**Tilpassede agenter**- Registrer ethvert CLI-værktøj via formular (navn, binær, versionskommando, spawn args) -**CLI Fingerprint Matching**— Skift pr. udbyder for at matche native CLI-anmodningssignaturer, hvilket reducerer risikoen for forbud, mens proxy-IP bevares---

## 🖼️ Media _(v2.0.3+)_

Generer billeder, videoer og musik fra dashboardet. Understøtter OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open og MusicGen.---

## 📝 Request Logs

Anmodningslogning i realtid med filtrering efter udbyder, model, konto og API-nøgle. Viser statuskoder, tokenbrug, latenstid og svardetaljer.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Dit forenede API-slutpunkt med kapacitetsopdeling: Chatfuldførelser, Responses API, indlejringer, billedgenerering, omrangering, lydtransskription, tekst-til-tale, modereringer og registrerede API-nøgler. Cloudflare Quick Tunnel integration og cloud proxy support til fjernadgang.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Opret, omfang og tilbagekald API-nøgler. Hver nøgle kan begrænses til specifikke modeller/udbydere med fuld adgang eller skrivebeskyttet tilladelse. Visuel nøglestyring med brugssporing.---

## 📋 Audit Log

Administrativ handlingssporing med filtrering efter handlingstype, aktør, mål, IP-adresse og tidsstempel. Fuld historik for sikkerhedshændelser.---

## 🖥️ Desktop Application

Native Electron desktop-app til Windows, macOS og Linux. Kør OmniRoute som et selvstændigt program med systembakkeintegration, offline support, automatisk opdatering og installation med ét klik.

Nøglefunktioner:

- Afstemning af serverberedskab (ingen tom skærm ved koldstart)
- Systembakke med portstyring
- Indholdssikkerhedspolitik
- Engangslås
- Automatisk opdatering ved genstart
- Platform-betinget UI (macOS trafiklys, Windows/Linux standard titellinje)
- Hærdet Electron build-emballage — symlinkede 'node_modules' i den selvstændige bundt detekteres og afvises før pakning, hvilket forhindrer runtime-afhængighed af build-maskinen (v2.5.5+)

📖 Se [`electron/README.md`](../electron/README.md) for fuld dokumentation.
