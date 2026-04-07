# OmniRoute — Dashboard Features Gallery (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/FEATURES.md) · 🇪🇸 [es](../../es/docs/FEATURES.md) · 🇫🇷 [fr](../../fr/docs/FEATURES.md) · 🇩🇪 [de](../../de/docs/FEATURES.md) · 🇮🇹 [it](../../it/docs/FEATURES.md) · 🇷🇺 [ru](../../ru/docs/FEATURES.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/FEATURES.md) · 🇯🇵 [ja](../../ja/docs/FEATURES.md) · 🇰🇷 [ko](../../ko/docs/FEATURES.md) · 🇸🇦 [ar](../../ar/docs/FEATURES.md) · 🇮🇳 [hi](../../hi/docs/FEATURES.md) · 🇮🇳 [in](../../in/docs/FEATURES.md) · 🇹🇭 [th](../../th/docs/FEATURES.md) · 🇻🇳 [vi](../../vi/docs/FEATURES.md) · 🇮🇩 [id](../../id/docs/FEATURES.md) · 🇲🇾 [ms](../../ms/docs/FEATURES.md) · 🇳🇱 [nl](../../nl/docs/FEATURES.md) · 🇵🇱 [pl](../../pl/docs/FEATURES.md) · 🇸🇪 [sv](../../sv/docs/FEATURES.md) · 🇳🇴 [no](../../no/docs/FEATURES.md) · 🇩🇰 [da](../../da/docs/FEATURES.md) · 🇫🇮 [fi](../../fi/docs/FEATURES.md) · 🇵🇹 [pt](../../pt/docs/FEATURES.md) · 🇷🇴 [ro](../../ro/docs/FEATURES.md) · 🇭🇺 [hu](../../hu/docs/FEATURES.md) · 🇧🇬 [bg](../../bg/docs/FEATURES.md) · 🇸🇰 [sk](../../sk/docs/FEATURES.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/FEATURES.md) · 🇮🇱 [he](../../he/docs/FEATURES.md) · 🇵🇭 [phi](../../phi/docs/FEATURES.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/FEATURES.md) · 🇨🇿 [cs](../../cs/docs/FEATURES.md) · 🇹🇷 [tr](../../tr/docs/FEATURES.md)

---

Visuelle Anleitung zu jedem Abschnitt des OmniRoute-Dashboards.---

## 🔌 Providers

Verwalten Sie KI-Anbieterverbindungen: OAuth-Anbieter (Claude Code, Codex, Gemini CLI), API-Schlüsselanbieter (Groq, DeepSeek, OpenRouter) und kostenlose Anbieter (Qoder, Qwen, Kiro). Bei Kiro-Konten ist die Nachverfolgung des Guthabens möglich – verbleibende Guthaben, Gesamtguthaben und Verlängerungsdatum sind im Dashboard → Nutzung sichtbar.![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 Combos

Erstellen Sie Modell-Routing-Kombinationen mit 6 Strategien: Priorität, gewichtet, Round-Robin, zufällig, am wenigsten verwendet und kostenoptimiert. Jede Kombination verkettet mehrere Modelle mit automatischem Fallback und umfasst schnelle Vorlagen und Bereitschaftsprüfungen.![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 Analytics

Umfassende Nutzungsanalysen mit Token-Verbrauch, Kostenschätzungen, Aktivitäts-Heatmaps, wöchentlichen Verteilungsdiagrammen und Aufschlüsselungen pro Anbieter.![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 System Health

Echtzeitüberwachung: Betriebszeit, Speicher, Version, Latenzperzentile (p50/p95/p99), Cache-Statistiken und Leistungsschalterzustände des Anbieters.![Health Dashboard](screenshots/04-health.png)

---

## 🔧 Translator Playground

Vier Modi zum Debuggen von API-Übersetzungen:**Playground**(Formatkonverter),**Chat Tester**(Live-Anfragen),**Test Bench**(Batch-Tests) und**Live Monitor**(Echtzeit-Stream).![Translator Playground](screenshots/05-translator.png)

---

## 🎮 Model Playground _(v2.0.9+)_

Testen Sie jedes Modell direkt vom Dashboard aus. Wählen Sie Anbieter, Modell und Endpunkt aus, schreiben Sie Eingabeaufforderungen mit Monaco Editor, streamen Sie Antworten in Echtzeit, brechen Sie mitten im Stream ab und sehen Sie sich Timing-Metriken an.---

## 🎨 Themes _(v2.0.5+)_

Anpassbare Farbthemen für das gesamte Dashboard. Wählen Sie aus 7 voreingestellten Farben (Koralle, Blau, Rot, Grün, Violett, Orange, Cyan) oder erstellen Sie ein individuelles Design, indem Sie eine beliebige Hex-Farbe auswählen. Unterstützt Hell-, Dunkel- und Systemmodus.---

## ⚙️ Settings

Umfangreiches Einstellungsfeld mit Registerkarten:

-**Allgemein**– Systemspeicher, Backup-Management (Datenbank exportieren/importieren) -**Erscheinungsbild**– Themenauswahl (Dunkel/Hell/System), Voreinstellungen für Farbthemen und benutzerdefinierte Farben, Sichtbarkeit des Gesundheitsprotokolls, Steuerelemente für die Sichtbarkeit von Elementen in der Seitenleiste -**Sicherheit**– API-Endpunktschutz, benutzerdefinierte Anbieterblockierung, IP-Filterung, Sitzungsinformationen -**Routing**– Modellaliase, Verschlechterung der Hintergrundaufgabe -**Resilienz**– Persistenz der Ratenbegrenzung, Leistungsschalter-Optimierung, automatische Deaktivierung gesperrter Konten, Überwachung des Anbieterablaufs -**Erweitert**– Konfigurationsüberschreibungen, Konfigurations-Audit-Trail, Fallback-Verschlechterungsmodus![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI Tools

Ein-Klick-Konfiguration für KI-Codierungstools: Claude Code, Codex CLI, Gemini CLI, OpenClaw, Kilo Code, Antigravity, Cline, Continue, Cursor und Factory Droid. Bietet automatisches Anwenden/Zurücksetzen der Konfiguration, Verbindungsprofile und Modellzuordnung.![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 🤖 CLI Agents _(v2.0.11+)_

Dashboard zum Erkennen und Verwalten von CLI-Agenten. Zeigt ein Raster mit 14 integrierten Agenten (Codex, Claude, Goose, Gemini CLI, OpenClaw, Aider, OpenCode, Cline, Qwen Code, ForgeCode, Amazon Q, Open Interpreter, Cursor CLI, Warp) mit:

-**Installationsstatus**– Installiert/Nicht gefunden mit Versionserkennung -**Protokollabzeichen**– stdio, HTTP usw. -**Benutzerdefinierte Agents**– Registrieren Sie jedes CLI-Tool über ein Formular (Name, Binärdatei, Versionsbefehl, Spawn-Argumente). -**CLI-Fingerabdruck-Abgleich**– Umschalten pro Anbieter, um native CLI-Anfragesignaturen abzugleichen, wodurch das Verbotsrisiko verringert und gleichzeitig die Proxy-IP erhalten bleibt---

## 🖼️ Media _(v2.0.3+)_

Generieren Sie Bilder, Videos und Musik über das Dashboard. Unterstützt OpenAI, xAI, Together, Hyperbolic, SD WebUI, ComfyUI, AnimateDiff, Stable Audio Open und MusicGen.---

## 📝 Request Logs

Echtzeit-Anfrageprotokollierung mit Filterung nach Anbieter, Modell, Konto und API-Schlüssel. Zeigt Statuscodes, Token-Nutzung, Latenz und Antwortdetails an.![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API Endpoint

Ihr einheitlicher API-Endpunkt mit Aufschlüsselung der Funktionen: Chat-Abschlüsse, Antwort-API, Einbettungen, Bildgenerierung, Neuranking, Audiotranskription, Text-to-Speech, Moderationen und registrierte API-Schlüssel. Cloudflare Quick Tunnel-Integration und Cloud-Proxy-Unterstützung für Fernzugriff.![Endpoint Dashboard](screenshots/09-endpoint.png)

---

## 🔑 API Key Management

API-Schlüssel erstellen, festlegen und widerrufen. Jeder Schlüssel kann auf bestimmte Modelle/Anbieter mit Vollzugriff oder Nur-Lese-Berechtigungen beschränkt werden. Visuelle Schlüsselverwaltung mit Nutzungsverfolgung.---

## 📋 Audit Log

Verwaltungsaktionsverfolgung mit Filterung nach Aktionstyp, Akteur, Ziel, IP-Adresse und Zeitstempel. Vollständiger Sicherheitsereignisverlauf.---

## 🖥️ Desktop Application

Native Electron-Desktop-App für Windows, macOS und Linux. Führen Sie OmniRoute als eigenständige Anwendung mit Taskleistenintegration, Offline-Unterstützung, automatischer Aktualisierung und Installation mit einem Klick aus.

Hauptmerkmale:

- Abfrage der Serverbereitschaft (kein leerer Bildschirm beim Kaltstart)
- Taskleiste mit Portverwaltung
- Inhaltssicherheitsrichtlinie
- Einzelinstanzsperre
- Automatische Aktualisierung beim Neustart
- Plattformabhängige Benutzeroberfläche (Ampeln für macOS, Standardtitelleiste für Windows/Linux)
- Hardened Electron Build-Paketierung – symbolisch verknüpfte „node_modules“ im Standalone-Bundle werden vor dem Paketieren erkannt und abgelehnt, wodurch eine Laufzeitabhängigkeit von der Build-Maschine verhindert wird (v2.5.5+)

📖 Die vollständige Dokumentation finden Sie unter [`electron/README.md`](../electron/README.md).
