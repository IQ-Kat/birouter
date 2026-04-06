# OmniRoute — Dashboard Features Gallery (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Visuell veiledning til hver del av OmniRoute-dashbordet.---

## 🔌 Providers

Administrer AI-leverandørtilkoblinger: OAuth-leverandører (Claude Code, Codex, Gemini CLI), API-nøkkelleverandører (Groq, DeepSeek, OpenRouter) og gratisleverandører (Qoder, Qwen, Kiro). Kiro-kontoer inkluderer sporing av kredittsaldo – gjenværende kreditter, total kvote og fornyelsesdato synlig i Dashboard → Bruk.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Lag modellrutingskombinasjoner med 6 strategier: prioritet, vektet, round-robin, tilfeldig, minst brukt og kostnadsoptimalisert. Hver kombinasjon kjeder flere modeller med automatisk fallback og inkluderer raske maler og beredskapskontroller.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Omfattende bruksanalyse med symbolforbruk, kostnadsestimater, aktivitetsvarmekart, ukentlige distribusjonsdiagrammer og sammenbrudd per leverandør.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Sanntidsovervåking: oppetid, minne, versjon, latenspersentiler (p50/p95/p99), hurtigbufferstatistikk og leverandørens strømbrytertilstander.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Fire moduser for feilsøking av API-oversettelser:**Lekeplass**(formatkonvertering),**Chattester**(liveforespørsler),**Testbenk**(batch-tester) og**Live Monitor**(sanntidsstrøm).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Test hvilken som helst modell direkte fra dashbordet. Velg leverandør, modell og endepunkt, skriv forespørsler med Monaco Editor, strøm svar i sanntid, avbryt midtstrøm og se tidsberegninger.---

## 🎨 Themes _(v2.0.5+)_

Tilpassbare fargetemaer for hele dashbordet. Velg mellom 7 forhåndsinnstilte farger (korall, blå, rød, grønn, fiolett, oransje, cyan) eller lag et tilpasset tema ved å velge en sekskantfarge. Støtter lys, mørk og systemmodus.---

## ⚙️ Settings

Omfattende innstillingspanel med faner:

-**Generelt**— Systemlagring, sikkerhetskopiering (eksport/import database) -**Utseende**— Temavelger (mørkt/lys/system), forhåndsinnstillinger for fargetema og egendefinerte farger, synlighet av helselogg, synlighetskontroller for sidefeltelementer -**Sikkerhet**— API-endepunktbeskyttelse, tilpasset leverandørblokkering, IP-filtrering, øktinformasjon -**Routing**— Modellaliaser, forringelse av bakgrunnsoppgaver -**Resiliens**— Utholdenhet for frekvensgrense, innstilling av strømbryter, automatisk deaktivering av utestengte kontoer, overvåking av leverandørens utløp -**Avansert**— Konfigurasjonsoverstyringer, konfigurasjonsrevisjonsspor, fallback-degraderingsmodus![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Ett-klikks konfigurasjon for AI-kodingsverktøy: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor og Factory Droid. Inneholder automatisk konfigurering/tilbakestilling, tilkoblingsprofiler og modellkartlegging.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Dashboard for å oppdage og administrere CLI-agenter. Viser et rutenett med 14 innebygde agenter (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) med:

-**Installasjonsstatus**— Installert / Ikke funnet med versjonsdeteksjon -**Protokollmerker**— stdio, HTTP osv. -**Egendefinerte agenter**- Registrer et hvilket som helst CLI-verktøy via skjema (navn, binær, versjonskommando, spawn args) -**CLI Fingerprint Matching**— Veksle per leverandør for å matche native CLI-forespørselssignaturer, reduserer utestengelsesrisikoen samtidig som proxy-IP bevares---

## 🖼️ Media _(v2.0.3+)_

Generer bilder, videoer og musikk fra dashbordet. Støtter OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open og MusicGen.---

## 📝 Request Logs

Forespørselslogging i sanntid med filtrering etter leverandør, modell, konto og API-nøkkel. Viser statuskoder, tokenbruk, ventetid og svardetaljer.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Ditt enhetlige API-endepunkt med funksjonsoversikt: Chatfullføringer, Responses API, Innebygginger, Bildegenerering, Omrangering, Lydtranskripsjon, Tekst-til-tale, Moderasjoner og registrerte API-nøkler. Cloudflare Quick Tunnel-integrasjon og cloud proxy-støtte for ekstern tilgang.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Opprett, omfang og tilbakekall API-nøkler. Hver nøkkel kan begrenses til spesifikke modeller/leverandører med full tilgang eller skrivebeskyttet tillatelse. Visuell nøkkelhåndtering med brukssporing.---

## 📋 Audit Log

Administrativ handlingssporing med filtrering etter handlingstype, aktør, mål, IP-adresse og tidsstempel. Full sikkerhetshendelseshistorikk.---

## 🖥️ Desktop Application

Native Electron desktop-app for Windows, macOS og Linux. Kjør OmniRoute som en frittstående applikasjon med systemstatusfeltintegrasjon, offline-støtte, automatisk oppdatering og ett-klikks installering.

Nøkkelfunksjoner:

- Avstemning av serverberedskap (ingen blank skjerm ved kaldstart)
- Systemstatusfelt med portadministrasjon
- Innholdssikkerhetspolicy
- Enkeltinstanslås
- Automatisk oppdatering ved omstart
- Plattformbetinget brukergrensesnitt (macOS trafikklys, Windows/Linux standard tittellinje)
- Herdet Electron build-emballasje – symboliserte "node_modules" i den frittstående pakken blir oppdaget og avvist før pakking, og forhindrer kjøretidsavhengighet av byggemaskinen (v2.5.5+)

📖 Se [`electron/README.md`](../electron/README.md) for full dokumentasjon.
