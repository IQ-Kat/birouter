# OmniRoute — Dashboard Features Gallery (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Ghid vizual pentru fiecare secțiune a tabloului de bord OmniRoute.---

## 🔌 Providers

Gestionați conexiunile furnizorilor AI: furnizori OAuth (Claude Code, Codex, Gemini CLI), furnizori de chei API (Groq, DeepSeek, OpenRouter) și furnizori gratuiti (Qoder, Qwen, Kiro). Conturile Kiro includ urmărirea soldului creditului — creditele rămase, alocația totală și data de reînnoire sunt vizibile în Tabloul de bord → Utilizare.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Creați combinații de modele de rutare cu 6 strategii: prioritar, ponderat, round-robin, aleatoriu, cel mai puțin utilizat și optimizat din punct de vedere al costurilor. Fiecare combo înlănțuiește mai multe modele cu rezervă automată și include șabloane rapide și verificări de pregătire.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Analiză cuprinzătoare a utilizării cu consum de simboluri, estimări de costuri, hărți termice ale activității, diagrame de distribuție săptămânală și defalcări pentru fiecare furnizor.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Monitorizare în timp real: timp de funcționare, memorie, versiune, percentile de latență (p50/p95/p99), statistici cache și stări întrerupătoarelor furnizorului.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Patru moduri de depanare a traducerilor API:**Playground**(convertor de format),**Chat Tester**(cereri live),**Test Bench**(testare în lot) și**Live Monitor**(stream în timp real).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Testați orice model direct de pe tabloul de bord. Selectați furnizorul, modelul și punctul final, scrieți solicitări cu Editorul Monaco, transmiteți răspunsuri în timp real, anulați fluxul la mijloc și vizualizați valorile de sincronizare.---

## 🎨 Themes _(v2.0.5+)_

Teme de culoare personalizabile pentru întreg tabloul de bord. Alegeți dintre cele 7 culori prestabilite (Coral, Albastru, Roșu, Verde, Violet, Portocaliu, Cyan) sau creați o temă personalizată alegând orice culoare hexagonală. Acceptă modul de lumină, întuneric și sistem.---

## ⚙️ Settings

Panou cuprinzător de setări cu file:

-**General**— Stocare de sistem, management de backup (bază de date de export/import) -**Aspect**— Selector de teme (întuneric/luminos/sistem), presetări pentru teme de culoare și culori personalizate, vizibilitate jurnal de sănătate, comenzi pentru vizibilitatea elementelor din bara laterală -**Securitate**— protecție API finală, blocare personalizată a furnizorului, filtrare IP, informații despre sesiune -**Routing**— Aliasuri de model, degradarea sarcinilor de fundal -**Reziliență**— Persistența limitei ratei, reglarea întrerupătorului, dezactivarea automată a conturilor interzise, monitorizarea expirării furnizorului -**Avansat**— Modificari de configurare, urmărire de auditare a configurației, modul de degradare de rezervă![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Configurare cu un singur clic pentru instrumente de codare AI: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor și Factory Droid. Dispune de aplicare/resetare automată a configurației, profiluri de conexiune și mapare a modelului.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Tabloul de bord pentru descoperirea și gestionarea agenților CLI. Afișează o grilă de 14 agenți încorporați (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) cu:

-**Stare de instalare**— Instalat/Negăsit cu detectarea versiunii -**Insigne de protocol**— stdio, HTTP etc. -**Agenți personalizați**- Înregistrați orice instrument CLI prin formular (nume, binar, comandă de versiune, spawn args) -**Potrivirea amprentei CLI**— Comută pe furnizor pentru a potrivi semnăturile de solicitare CLI native, reducând riscul de interzicere, păstrând IP-ul proxy---

## 🖼️ Media _(v2.0.3+)_

Generați imagini, videoclipuri și muzică din tabloul de bord. Suportă OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open și MusicGen.---

## 📝 Request Logs

Înregistrare în timp real a cererilor cu filtrare în funcție de furnizor, model, cont și cheie API. Afișează codurile de stare, utilizarea simbolurilor, latența și detaliile răspunsului.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Punctul final API unificat cu defalcarea capacităților: Finalizări de chat, API de răspunsuri, încorporare, generare de imagini, reclasificare, transcriere audio, text-to-speech, moderări și chei API înregistrate. Integrare Cloudflare Quick Tunnel și suport proxy cloud pentru acces de la distanță.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

Creați, acoperiți și revocați cheile API. Fiecare cheie poate fi restricționată la anumite modele/furnizori cu acces complet sau permisiuni numai pentru citire. Gestionarea vizuală a cheilor cu urmărirea utilizării.---

## 📋 Audit Log

Urmărirea acțiunilor administrative cu filtrare după tip de acțiune, actor, țintă, adresă IP și marcaj de timp. Istoricul complet al evenimentelor de securitate.---

## 🖥️ Desktop Application

Aplicația desktop nativă Electron pentru Windows, macOS și Linux. Rulați OmniRoute ca aplicație autonomă cu integrare în bara de sistem, asistență offline, actualizare automată și instalare cu un singur clic.

Caracteristici cheie:

- Sondaj de pregătire a serverului (fără ecran gol la pornirea la rece)
- Tava de sistem cu management port
- Politica de securitate a conținutului
- Blocare cu o singură instanță
- Actualizare automată la repornire
- Interfață de utilizare condiționată de platformă (semafor macOS, bara de titlu implicită Windows/Linux)
- Hardened Electron build package — `node_modules` cu legături simbolice din pachetul autonom este detectat și respins înainte de împachetare, prevenind dependența de rulare de mașina de construire (v2.5.5+)

📖 Consultați [`electron/README.md`](../electron/README.md) pentru documentația completă.
