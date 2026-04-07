# Changelog (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../CHANGELOG.md) · 🇪🇸 [es](../es/CHANGELOG.md) · 🇫🇷 [fr](../fr/CHANGELOG.md) · 🇩🇪 [de](../de/CHANGELOG.md) · 🇮🇹 [it](../it/CHANGELOG.md) · 🇷🇺 [ru](../ru/CHANGELOG.md) · 🇨🇳 [zh-CN](../zh-CN/CHANGELOG.md) · 🇯🇵 [ja](../ja/CHANGELOG.md) · 🇰🇷 [ko](../ko/CHANGELOG.md) · 🇸🇦 [ar](../ar/CHANGELOG.md) · 🇮🇳 [hi](../hi/CHANGELOG.md) · 🇮🇳 [in](../in/CHANGELOG.md) · 🇹🇭 [th](../th/CHANGELOG.md) · 🇻🇳 [vi](../vi/CHANGELOG.md) · 🇮🇩 [id](../id/CHANGELOG.md) · 🇲🇾 [ms](../ms/CHANGELOG.md) · 🇳🇱 [nl](../nl/CHANGELOG.md) · 🇵🇱 [pl](../pl/CHANGELOG.md) · 🇸🇪 [sv](../sv/CHANGELOG.md) · 🇳🇴 [no](../no/CHANGELOG.md) · 🇩🇰 [da](../da/CHANGELOG.md) · 🇫🇮 [fi](../fi/CHANGELOG.md) · 🇵🇹 [pt](../pt/CHANGELOG.md) · 🇷🇴 [ro](../ro/CHANGELOG.md) · 🇭🇺 [hu](../hu/CHANGELOG.md) · 🇧🇬 [bg](../bg/CHANGELOG.md) · 🇸🇰 [sk](../sk/CHANGELOG.md) · 🇺🇦 [uk-UA](../uk-UA/CHANGELOG.md) · 🇮🇱 [he](../he/CHANGELOG.md) · 🇵🇭 [phi](../phi/CHANGELOG.md) · 🇧🇷 [pt-BR](../pt-BR/CHANGELOG.md) · 🇨🇿 [cs](../cs/CHANGELOG.md) · 🇹🇷 [tr](../tr/CHANGELOG.md)

---

## [Unreleased]

---

## [3.5.3] - 2026-04-05

### Fixed

-**Middleware:**Endlosumleitungsschleife im Dashboard für neue Instanzen behoben, wenn requireLogin deaktiviert ist.---

## [3.5.2] — 2026-04-05

### ✨ New Features

-**Native Qoder API-Integration:**Der Qoder Executor wurde komplett überarbeitet, um den alten COSY AES/RSA-Verschlüsselungsalgorithmus zu umgehen und direkt in die native DashScope OpenAi-kompatible URL weiterzuleiten. Beseitigt komplexe Abhängigkeiten von Node-Kryptomodulen und verbessert gleichzeitig die Stream-Wiedergabetreue. -**Resilience Engine-Überarbeitung:**Integrierte kontextüberlauffreundliche Fallbacks, proaktive OAuth-Token-Erkennung und Verhinderung der Emission leerer Inhalte (#990). -**Kontextoptimierte Routing-Strategie:**Neue intelligente Routing-Funktion hinzugefügt, um Kontextfenster in automatisierten Kombinationsbereitstellungen nativ zu maximieren (#990).### 🐛 Bug Fixes

-**Responses-API-Stream-Beschädigung:**Deep-Cloning-Beschädigung behoben, bei der Anthropic/OpenAI-Übersetzungsgrenzen „response.“-spezifische SSE-Präfixe von Streaming-Grenzen entfernt haben (#992). -**Claude-Cache-Passthrough-Ausrichtung:**CC-kompatible Cache-Marker wurden konsistent mit dem Upstream-Client-Passthrough-Modus ausgerichtet, um das Prompt-Caching beizubehalten. -**Turbopack-Speicherleck:**Next.js wurde an strikt „16.0.10“ angeheftet, um Speicherlecks und Build-Veraltung aufgrund der jüngsten Regressionen des Upstream-Turbopack-Hash-Moduls zu verhindern (#987).---

## [3.5.1] — 2026-04-04

### ✨ New Features

-**Models.dev-Integration:**Integriert models.dev als maßgebliche Laufzeitquelle für Modellpreise, Funktionen und Spezifikationen und überschreibt fest codierte Preise. Enthält eine Benutzeroberfläche für Einstellungen zur Verwaltung von Synchronisierungsintervallen, Übersetzungszeichenfolgen für alle 30 Sprachen und eine robuste Testabdeckung. -**Native Funktionen des Anbieters:**Unterstützung für die Deklaration und Überprüfung nativer API-Funktionen (z. B. „systemInstructions_supported“) hinzugefügt, um Fehler durch Bereinigung ungültiger Rollen zu verhindern. Derzeit für Gemini Base- und Antigravity-OAuth-Anbieter konfiguriert. -**Erweiterte API-Provider-Einstellungen:**Benutzerdefinierte „User-Agent“-Überschreibungen pro Verbindung für API-Schlüssel-Provider-Verbindungen hinzugefügt. Die Überschreibung wird in „providerSpecificData.customUserAgent“ gespeichert und gilt jetzt für Validierungstests und Upstream-Ausführungsanforderungen.### 🐛 Bug Fixes

-**Qwen OAuth-Zuverlässigkeit:**Es wurden eine Reihe von OAuth-Integrationsproblemen behoben, darunter ein 400-Bad-Request-Blocker für abgelaufene Token, eine Fallback-Generierung für das Parsen von OIDC-Access_token-Eigenschaften, wenn „id_token“ weggelassen wird, Modellkatalog-Erkennungsfehler und eine strikte Filterung von „X-Dashscope-\*“-Headern, um eine 400-Ablehnung von OpenAI-kompatiblen Endpunkten zu vermeiden.## [3.5.0] — 2026-04-03

### ✨ New Features

-**Auto-Combo & Routing:**Native CRUD-Lebenszyklusintegration für die erweiterte Auto-Combo-Engine abgeschlossen (#955). -**Kernoperationen:**Fehlende Übersetzungen für neue native Auto-Combos-Optionen behoben (#955). -**Sicherheitsvalidierung:**SQLite-Auto-Backup-Aufgaben wurden nativ während der CI-Ausführung des Komponententests deaktiviert, um hängende Speicherlecks in der Knoten-22-Ereignisschleife explizit zu beheben (#956). -**Ökosystem-Proxys:**Explizite Integrationszuordnungsmodell-Synchronisierungsplaner, OAuth-Zyklen und Token-Check-Aktualisierungen wurden sicher über die nativen System-Upstream-Proxys von OmniRoute abgeschlossen (#953). -**MCP-Erweiterbarkeit:**Das neue MCP-Framework-Tool „omniroute_web_search“ wurde aus der Betaphase in Produktionsschemata hinzugefügt und erfolgreich registriert (#951). -**Token-Pufferlogik:**Laufzeitkonfigurationsgrenzen hinzugefügt, die konfigurierbare Eingabe-/Ausgabe-Token-Puffer für präzise Nutzungsverfolgungsmetriken erweitern (#959).### 🐛 Bug Fixes

-**CodeQL-Remediation:**Vollständig aufgelöste und gesicherte kritische String-Indizierungsvorgänge verhindern Server-Side Request Forgery (SSRF)-Arrays, die Heuristiken zusammen mit polynomialem algorithmischem Backtracking (ReDoS) in Deep-Proxy-Dispatcher-Modulen indizieren. -**Krypto-Hashes:**Schwache, nicht verifizierte Legacy-OAuth-1.0-Hashes wurden durch robuste HMAC-SHA-256-Standard-Validierungsprimitive ersetzt, um strenge Zugriffskontrollen zu gewährleisten. -**API-Grenzschutz:**Korrekt überprüfte und zugeordnete strukturelle Routenschutzmaßnahmen, die die strikte „isAuthenticated()“-Middleware-Logik durchsetzen, die neuere dynamische Endpunkte abdeckt und auf die Manipulation von Einstellungen und das Laden nativer Fähigkeiten abzielt. -**CLI-Ökosystemkompatibilität:**Defekte native Laufzeit-Parser-Bindungen behoben, die „where“-Umgebungsdetektoren ausschließlich über „.cmd/.exe“-Randfällen ordnungsgemäß zum Absturz brachten, für externe Plugins (#969). -**Cache-Architektur:**Das Caching der Layoutstruktur des Dashboards für genaue Analyse- und Systemeinstellungen wurde überarbeitet, um stabile Rehydrations-Persistenzzyklen aufrechtzuerhalten und visuelle, nicht ausgerichtete Zustandsblitze zu beheben (#952). -**Claude-Caching-Standards:**Normalisierte und genau strikt erhaltene kritische ephemere Blockmarkierungen „ephemere“ Caching-TTL-Aufträge für Downstream-Knoten, die eine saubere Zuordnung standardkompatibler CC-Anfragen ohne verlorene Metriken erzwingen (#948). -**Interne Aliase-Authentifizierung:**Vereinfachte interne Laufzeitzuordnungen, die Codex-Anmeldeinformations-Payload-Suchen innerhalb globaler Übersetzungsparameter normalisieren und 401 nicht authentifizierte Drops beheben (#958).### 🛠️ Maintenance

-**UI-Erkennbarkeit:**Korrekt angepasste Layout-Kategorisierungen, die die Logik der Free-Tier-Anbieter explizit trennen und die UX-Sortierabläufe innerhalb der allgemeinen API-Registrierungsseiten verbessern (#950). -**Bereitstellungstopologie:**Einheitliche Docker-Bereitstellungsartefakte, die sicherstellen, dass das Stammverzeichnis „fly.toml“ sofort mit den erwarteten Cloud-Instanzparametern übereinstimmt und automatisch automatisierte Bereitstellungen ordnungsgemäß skaliert. -**Entwicklungstools:**Entkoppelte „LKGP“-Laufzeitparameter in explizite DB-Layer-Abstraktions-Caching-Dienstprogramme, um eine strikte Testisolationsabdeckung für Kern-Caching-Layer sicher zu gewährleisten.---

## [3.4.9] — 2026-04-03

### Features & Refactoring

-**Dashboard Auto-Combo Panel:**Die Benutzeroberfläche „/dashboard/auto-combo“ wurde komplett überarbeitet, um eine nahtlose Integration mit nativen Dashboard-Karten und standardisierten visuellen Auffüllungen/Kopfzeilen zu ermöglichen. Dynamische visuelle Fortschrittsbalken hinzugefügt, die die Gewichtungsmechanismen der Modellauswahl abbilden. -**Synchronisierung der Routing-Einstellungen:**Vollständig verfügbar gemachte erweiterte Routing-„Prioritäts“- und „gewichtete“ Schema-Ziele intern innerhalb der Fallback-Listen für globale Einstellungen.### Bug Fixes

-**Memory & Skills Locale Nodes:**Leere Rendering-Tags für Memory- und Skills-Optionen direkt in globalen Einstellungsansichten behoben, indem alle „settings.\*“-Zuordnungswerte intern mit „en.json“ verbunden wurden (auch implizit für Kreuzübersetzungstools zugeordnet).### Internal Integrations

- Integrierter PR #946 – Fix: Claude-Code-Kompatibilität bei der Antwortkonvertierung beibehalten
- Integrierte PR #944 – fix(gemini): Gedankensignaturen bei Antigravitations-Tool-Aufrufen beibehalten
  – Integrierter PR #943 – Fix: GitHub Copilot-Körper wiederherstellen
- Integrierter PR #942 – CC-kompatible Cache-Marker reparieren
  – Integrierter PR #941 – Refactor(auth): NVIDIA-Alias-Suche verbessern + LKGP-Fehlerprotokollierung hinzufügen
- Integrierter PR #939 – Wiederherstellung der Claude OAuth Localhost-Callback-Verarbeitung
- _(Hinweis: PR #934 wurde im 3.4.9-Zyklus weggelassen, um Kernkonfliktregressionen zu verhindern)_---

## [3.4.8] — 2026-04-03

### Sicherheit

- Alle ausstehenden Github Advanced Security (CodeQL)-Ergebnisse und Dependabot-Warnungen wurden vollständig behoben.
  – Behebung unsicherer Zufallsschwachstellen durch Migration von „Math.random“ zu „crypto.randomUUID()“.
- Gesicherte Shell-Befehle in automatisierten Skripten durch String-Injection.
  – Anfällige, katastrophale Backtracking-RegEx-Parsingmuster in Chat-/Übersetzungspipelines wurden migriert.
  – Verbesserte Ausgabebereinigungskontrollen innerhalb der React-UI-Komponenten und der SSE-Tag-Injektion (Server Sent Events).---

## [3.4.7] — 2026-04-03

### Funktionen

- Knoten „Kryptografie“ zu Überwachung und MCP-Gesundheitsprüfungen hinzugefügt (#798)
- Gehärtete Modell-Katalog-Routenberechtigungszuordnung (`/models`) (#781)### Bug Fixes

– Behoben: Claude OAuth-Token-Aktualisierungen führten dazu, dass Cache-Kontexte nicht erhalten blieben (#937)
– Fehler bei CC-kompatiblen Anbietern behoben, die dazu führten, dass zwischengespeicherte Modelle nicht erreichbar waren (#937)
– GitHub Executor-Fehler im Zusammenhang mit ungültigen Kontext-Arrays behoben (#937)
– Fehler bei der Integritätsprüfung der NPM-installierten CLI-Tools unter Windows behoben (#935)
– Problem behoben, bei dem bei der Payload-Übersetzung gültige Inhalte aufgrund ungültiger API-Felder verloren gingen (#927)
– Laufzeitabsturz in Knoten 25 bezüglich der API-Schlüsselausführung behoben (#867)

- MCP-Standalone-Modulauflösung („ERR_MODULE_NOT_FOUND“) über „esbuild“ behoben (#936)
- Nicht übereinstimmende Alias-Auflösung für NVIDIA NIM-Routing-Anmeldeinformationen behoben (#931)### Sicherheit

– Sicherer, strikter Schutz der Eingabegrenzen gegen rohe „Shell: True“-Remotecode-Ausführungsinjektionen hinzugefügt.---

## [3.4.6] - 2026-04-02

### ✨ New Features

-**Anbieter:**Registrierte neue Bild-, Video- und Audio-Generierungsanbieter aus der von der Community angeforderten Liste (#926). -**Dashboard-Benutzeroberfläche:**Eigenständige Seitenleistennavigation für die neuen Module „Speicher“ und „Fähigkeiten“ hinzugefügt (#926). -**i18n:**Übersetzungszeichenfolgen und Layoutzuordnungen in 30 Sprachen für die Namespaces „Memory“ und „Skills“ hinzugefügt.### 🐛 Bug Fixes

-**Belastbarkeit:**Es wurde verhindert, dass der Proxy-Leistungsschalter auf unbestimmte Zeit im OFFEN-Zustand hängen bleibt, indem direkte Übergänge in den GESCHLOSSEN-Zustand innerhalb von Fallback-Kombinationspfaden verarbeitet wurden (#930). -**Protokollübersetzung:**Der Streaming-Transformer wurde gepatcht, um Antwortblöcke basierend auf dem erwarteten _Quell_-Protokoll und nicht auf dem _Ziel_-Protokoll des Anbieters zu bereinigen. Dadurch wurde behoben, dass in OpenAI-Nutzlasten verpackte Anthropics-Modelle Claude Code abstürzen ließen (#929). -**API-Spezifikationen und Gemini:**Das Parsen von „thought_signature“ in den „openai-to-gemini“- und „claude-to-gemini“-Übersetzern wurde korrigiert, wodurch HTTP 400-Fehler bei allen Gemini 3 API-Toolaufrufen verhindert wurden. -**Anbieter:**Nicht OpenAI-kompatible Endpunkte wurden bereinigt, wodurch gültige Upstream-Verbindungen verhindert wurden (#926). -**Cache-Trends:**Eine ungültige Datenübereinstimmung bei der Eigenschaftszuordnung wurde behoben, die zum Absturz von Cache-Trends-UI-Diagrammen führte, und es wurden redundante Cache-Metrik-Widgets extrahiert (#926).---

## [3.4.5] - 2026-04-02

### ✨ New Features

-**Integration des CLIProxyAPI-Ökosystems:**Der „cliproxyapi“-Executor mit integriertem Caching und Proxy-Routing auf Modulebene hinzugefügt. Einführung eines umfassenden Versionsmanager-Dienstes, um den Zustand automatisch zu testen, Binärdateien von GitHub herunterzuladen, isolierte Hintergrundprozesse zu erzeugen und den Lebenszyklus externer CLI-Tools direkt über die Benutzeroberfläche sauber zu verwalten. Enthält DB-Tabellen für die Proxy-Konfiguration, um das automatische SSRF-gesteuerte Cross-Routing externer OpenAI-Anfragen über die lokale CLI-Tool-Ebene zu ermöglichen (#914, #915, #916). -**Qoder PAT-Unterstützung:**Unterstützung für integrierte Personal Access Tokens (PAT) direkt über den lokalen „qodercli“-Transport anstelle von alten Remote-„.cn“-Browserkonfigurationen (#913). -**Gemini 3.1 Pro Preview (GitHub):**Unterstützung des kanonischen expliziten Modells „gemini-3.1-pro-preview“ nativ im GitHub Copilot-Anbieter hinzugefügt, während ältere Routing-Aliase erhalten bleiben (#924).### 🐛 Bug Fixes

-**GitHub Copilot-Token-Stabilität:**Die Copilot-Token-Aktualisierungsschleife wurde repariert, in der veraltete Token nicht tief in die Datenbank eingebunden wurden, und „reasoning_text“-Felder wurden entfernt, die nachgelagerte Anthropic-Blockkonvertierungen für Multi-Turn-Chats schwerwiegend unterbrachen (#923). -**Globale Timeout-Matrix:**Zentralisierte und parametrisierte Anforderungs-Timeouts explizit von „REQUEST_TIMEOUT_MS“, um zu verhindern, dass versteckte (~300 s) Standard-Abrufpuffer vorzeitig langlebige SSE-Streaming-Antworten von Heavy Reasoning-Modellen abschneiden (#918). -**Cloudflare Quick Tunnels-Status:**Es wurde eine schwerwiegende Statusinkonsistenz behoben, bei der neu gestartete OmniRoute-Instanzen zerstörte Tunnel fälschlicherweise als aktiv anzeigten und das Cloudflared-Tunneling standardmäßig auf „HTTP/2“ setzte, um UDP-Empfangspufferprotokoll-Spam zu verhindern (#925). -**Überarbeitung der i18n-Übersetzung (Tschechisch und Hindi):**Hindi-Code von VERALTET „in.json“ in kanonisches „hi.json“ korrigiert, tschechische Textzuordnungen überarbeitet, „untranslatable-keys.json“ extrahiert, um CI/CD-Falsch-Positiv-Validierungen zu korrigieren, und umfassende „I18N.md“-Dokumente als Leitfaden für Übersetzer erstellt (#912). -**Wiederherstellung des Token-Anbieters:**Behoben, dass Qwen bestimmte „resourceUrl“-Endpunkte nach der automatischen Aktualisierung von Integritätsprüfungs-Token aufgrund fehlender DB-Deep-Merges verlor (#917). -**CC-kompatibles UX & Streaming:**Die Aktionen „CC/OpenAI/Anthropic-kompatibel hinzufügen“ rund um die Anthropic-UI-Behandlung wurden vereinheitlicht, CC-kompatible Upstream-Anfragen zur Verwendung von SSE gezwungen, während weiterhin Streaming- oder Nicht-Streaming-Antworten basierend auf der Client-Anfrage zurückgegeben wurden, die CC-Modelllistenkonfiguration/-importunterstützung wurde zugunsten eines expliziten Fehlers bei der Auflistung nicht unterstützter Modelle entfernt und CC-kompatible verfügbare Modelle wurden so gestaltet, dass sie die OAuth-Claude-Code-Registrierungsliste widerspiegeln (#921).---

## [3.4.4] - 2026-04-02

### 🐛 Bug Fixes

-**Responses API Token Reporting:**Gibt „response.completed“ mit korrekten „input_tokens“/„output_tokens“-Feldern für Codex-CLI-Clients aus, wodurch die Anzeige der Token-Nutzung korrigiert wird (#909 – danke @christopher-s). -**SQLite WAL-Prüfpunkt beim Herunterfahren:**Flush WAL-Änderungen in der primären Datenbankdatei während des ordnungsgemäßen Herunterfahrens/Neustarts, um Datenverlust beim Stoppen des Docker-Containers zu verhindern (#905 – danke @rdself). -**Graceful Shutdown Signal:**Die Routen „/api/restart“ und „/api/shutdown“ wurden von „process.exit(0)“ in „process.kill(SIGTERM)“ geändert, um sicherzustellen, dass der Shutdown-Handler vor dem Beenden ausgeführt wird. -**Docker Stop Grace Period:**„stop_grace_period: 40s“ zu Docker Compose-Dateien und „--stop-timeout 40“ zu Docker-Ausführungsbeispielen hinzugefügt.### 🛠️ Maintenance

- 5 gelöste/keine Fehler behobene Probleme (Nr. 872, Nr. 814, Nr. 816, Nr. 890, Nr. 877).
- 6 Probleme mit Bedarfsinformationsanfragen untersucht (Nr. 892, Nr. 887, Nr. 886, Nr. 865, Nr. 895, Nr. 870).
  – Auf das CLI-Erkennungs-Tracking-Problem (#863) mit Anleitung für Mitwirkende reagiert.---

## [3.4.3] - 2026-04-02

### ✨ New Features

-**Antigravity Memory & Skills:**Remote-Speicher- und Skills-Injektion für den Antigravity-Anbieter auf Proxy-Netzwerkebene abgeschlossen. -**Claude Code-Kompatibilität:**Eine nativ versteckte Kompatibilitätsbrücke für Claude Code erstellt, die Tools und Formatierungen sauber weiterleitet. -**Web Search MCP:**Das Tool „omniroute_web_search“ mit dem Bereich „execute:search“ hinzugefügt. -**Cache-Komponenten:**Dynamische Cache-Komponenten mithilfe von TDD implementiert. -**Benutzeroberfläche und Anpassung:**Unterstützung für benutzerdefinierte Favicons, Registerkarten für das Erscheinungsbild, kabelgebundenes Whitelabeling in der Seitenleiste und hinzugefügte Windsurf-Anleitungsschritte in allen 33 Sprachen hinzugefügt. -**Protokollaufbewahrung:**Native einheitliche Aufbewahrung von Anforderungsprotokollen und Artefakten. -**Modellverbesserungen:**Explizite „contextLength“ für alle Opencode-Zen-Modelle hinzugefügt. -**i18n & Übersetzungen:**33 Sprachübersetzungen nativ integriert, einschließlich Platzhalter-CI-Validierungen und chinesischer Dokumentationsaktualisierungen (#873, #869).### 🐛 Bug Fixes

-**Qwen OAuth-Zuordnung:**Die Abhängigkeit von „id_token“ wurde auf „access_token“ zurückgesetzt und die dynamische API-Endpunktinjektion „resource_url“ für ordnungsgemäßes regionales Routing aktiviert (#900). -**Modellsynchronisierungs-Engine:**Die strenge interne Anbieter-ID wurde in den Synchronisierungsroutinen „getCustomModels()“ anstelle des UI-Kanal-Alias-Formats gespeichert, um Fehler beim Einfügen des SQLite-Katalogs zu verhindern (#903). -**Claude Code & Codex:**Standardisierte Nicht-Streaming-Leerantworten auf Anthropic-formatierte „(leere Antwort)“, um CLI-Proxy-Abstürze zu verhindern (#866). -**CC-kompatibles Routing:**Doppelte „/v1“-Endpunktkollision während der Pfadverkettung für generische Claude-Code-Gateways behoben (#904). -**Antigravity-Dashboards:**Modelle mit unbegrenztem Kontingent wurden daran gehindert, sich fälschlicherweise als ausgeschöpfte „100 %-Nutzung“-Grenzzustände in der Benutzeroberfläche der Anbieternutzung zu registrieren (#857). -**Claude Image Passthrough:**Problem behoben, bei dem bei Claude-Modellen Bildblock-Passthroughs fehlten (#898). -**Gemini-CLI-Routing:**403-Autorisierungssperren und Probleme mit der Anhäufung von Inhalten wurden durch Aktualisieren der Projekt-ID über „loadCodeAssist“ behoben (#868). -**Antigravitationsstabilität:**Modellzugriffslisten korrigiert, 404-Sperrungen erzwungen, 429-Kaskaden behoben, die Standardverbindungen sperren, und „gemini-3.1-pro“-Ausgabetokens begrenzt (#885). -**Provider-Synchronisierungsrhythmus:**Der Provider begrenzt den Synchronisierungsrhythmus über den internen Planer (#888). -**Dashboard-Optimierung:**Das Einfrieren der Benutzeroberfläche „/dashboard/limits“ bei der Verarbeitung von mehr als 70 Konten über Chunk-Parallelisierung wurde behoben (#784). -**SSRF-Härtung:**Strenge SSRF-IP-Bereichsfilterung erzwungen und die Loopback-Schnittstelle „::1“ blockiert. -**MIME-Typen:**„mime_type“ wurde auf „snake_case“ standardisiert, um den Gemini-API-Spezifikationen zu entsprechen. -**CI-Stabilisierung:**Fehler bei Analyse-/Einstellungen-Playwright-Selektoren und Anforderungszusicherungen wurden behoben, sodass GitHub Actions E2E-Ausführungen zuverlässig über lokalisierte Benutzeroberflächen und schalterbasierte Steuerelemente laufen. -**Deterministische Tests:**Datumsabhängige Kontingentfixierungen wurden aus Copilot-Nutzungstests entfernt und Idempotenz-/Modellkatalogtests an das zusammengeführte Laufzeitverhalten angepasst. -**MCP-Typhärtung:**Explizite Null-Budget-Regressionen „beliebig“ aus dem MCP-Server-Tool-Registrierungspfad entfernt. -**Modellsynchronisierungs-Engine:**Destruktive „Ersetzen“-Überschreibungen wurden umgangen, wenn die automatische Synchronisierung des Anbieters eine leere Modellliste ergibt, wodurch die Stabilität für dynamische Kataloge gewahrt bleibt (#899).### 🛠️ Maintenance

-**Pipeline-Protokollierung:**Pipeline-Protokollierungsartefakte verfeinert und Aufbewahrungsobergrenzen erzwungen (#880). -**AGENTS.md Überarbeitung:**Komprimiert von 297→153 Zeilen. Build-/Test-/Stilrichtlinien, Code-Workflows (Prettier, TypeScript, ESLint) und gekürzte ausführliche Tabellen hinzugefügt (#882). -**Release-Branch-Integration:**Konsolidierte die aktiven Feature-Branches in „Release/v3.4.2“ über dem aktuellen „Main“ und validierte den Branch mit Lint-, Unit-, Coverage-, Build- und CI-Modus-E2E-Läufen. -**Testen:**Vitest-Konfiguration für Komponententests und Playwright-Spezifikationen für das Umschalten von Einstellungen hinzugefügt. -**Dokumentaktualisierungen:**Root-Readmes erweitert, chinesische Dokumente nativ übersetzt und veraltete Dateien bereinigt.## [3.4.1] - 2026-03-31

> [!WARNUNG]
> **BRECHENDE ÄNDERUNG: Anforderungsprotokollierung, Aufbewahrung und Protokollierungsumgebungsvariablen wurden neu gestaltet.**
> Beim ersten Start nach dem Upgrade archiviert OmniRoute Legacy-Anforderungsprotokolle aus „DATA_DIR/logs/“, Legacy „DATA_DIR/call_logs/“ und „DATA_DIR/log.txt“ in „DATA_DIR/log_archives/\*.zip“, entfernt dann das veraltete Layout und wechselt zum neuen einheitlichen Artefaktformat unter „DATA_DIR/call_logs/“.### ✨ New Features

-**.ENV-Migrationsdienstprogramm:**Enthält „scripts/migrate-env.mjs“, um „<v3.3“-Konfigurationen nahtlos zu den strengen Sicherheitsvalidierungseinschränkungen „v3.4.x“ (FASE-01) zu migrieren und Startabstürze zu reparieren, die durch kurze „JWT_SECRET“-Instanzen verursacht werden. -**Kiro AI Cache-Optimierung:**Deterministische „conversationId“-Generierung (uuidv5) implementiert, um das AWS Builder-ID-Prompt-Caching ordnungsgemäß über alle Aufrufe hinweg zu ermöglichen (#814). -**Wiederherstellung und Konsolidierung der Dashboard-Benutzeroberfläche:**Die Seitenleistenlogik wurde behoben, wodurch der Debug-Abschnitt weggelassen wurde, und Nextjs-Routing-Warnungen wurden gelöscht, indem die eigenständigen Seiten „/dashboard/mcp“ und „/dashboard/a2a“ explizit in eingebettete Endpoint-Proxy-Benutzeroberflächenkomponenten verschoben wurden. -**Einheitliche Anforderungsprotokollartefakte:**Die Anforderungsprotokollierung speichert jetzt eine SQLite-Indexzeile plus ein JSON-Artefakt pro Anforderung unter „DATA_DIR/call_logs/“, mit optionaler Pipeline-Erfassung, die in derselben Datei eingebettet ist. -**Sprache:**Die chinesische Übersetzung wurde verbessert (#855) -**Opencode-Zen-Modelle:**4 kostenlose Modelle zur Opencode-Zen-Registrierung hinzugefügt (#854) -**Tests:**Unit- und E2E-Tests für Einstellungsumschaltungen und Fehlerbehebungen hinzugefügt (#850)### 🐛 Bug Fixes

-**429-Kontingentanalyse:**Lange Quotenrücksetzungszeiten aus Fehlerkörpern wurden analysiert, um korrekte Backoffs zu berücksichtigen und ratenbegrenzte Kontosperrungen zu verhindern (#859) -**Prompt-Caching:**Client-Header „cache_control“ für alle Claude-Protokollanbieter (wie Minimax, GLM und Bailian) bleiben erhalten, wodurch die Caching-Unterstützung korrekt erkannt wird (#856) -**Modell-Synchronisierungsprotokolle:**Reduzierter Protokoll-Spam, indem „Sync-Modelle“ nur dann aufgezeichnet werden, wenn der Kanal die Liste tatsächlich ändert (#853) -**Anbieterkontingent und Token-Parsing:**Antigravity-Grenzwerte wurden geändert, um „retrieveUserQuota“ nativ zu verwenden und Claude-Token-Aktualisierungsnutzlasten korrekt auf URL-codierte Formulare abzubilden (#862) -**Ratenbegrenzende Stabilität:**Die 429 Retry-After-Parsing-Architektur wurde universalisiert, um vom Anbieter verursachte Abklingzeiten auf maximal 24 Stunden zu begrenzen (#862) -**Dashboard-Limit-Rendering:**Die Kontingentzuordnung „/dashboard/limits“ wurde neu gestaltet, um sofort innerhalb von Chunks zu rendern. Dadurch wurde eine erhebliche Verzögerung beim Einfrieren der Benutzeroberfläche bei Konten mit mehr als 70 aktiven Verbindungen behoben (#784) -**QWEN OAuth-Autorisierung:**Das OIDC „id_token“ wurde als primäres API-Bearer-Token für Dashscope-Anfragen zugeordnet, wodurch sofortige 401-Unauthorized-Fehler nach dem Verbinden von Konten oder dem Aktualisieren von Tokens behoben wurden (#864) -**ZAI-API-Stabilität:**Gehärteter Compiler für vom Server gesendete Ereignisse, um ordnungsgemäß auf leere Zeichenfolgen zurückzugreifen, wenn DeepSeek-Anbieter während der Argumentationsphasen mathematisch Nullinhalte streamen (#871) -**Claude Code/Codex-Übersetzungen:**Nicht-Streaming-Nutzlastkonvertierungen vor leeren Antworten von Upstream-Codex-Tools geschützt, wodurch katastrophale TypeErrors vermieden werden (#866) -**NVIDIA NIM Rendering:**Bedingt entfernte identische Anbieterpräfixe, die dynamisch von Audiomodellen gepusht werden, wodurch doppelte „nim/nim“-Tag-Strukturen vermieden werden, die 404 auf dem Media Playground auslösen (#872)### ⚠️ Breaking Changes

-**Layout des Anforderungsprotokolls:**Die alten Mehrdatei-Anforderungsprotokollsitzungen „DATA*DIR/logs/“ und die Zusammenfassungsdatei „DATA_DIR/log.txt“ wurden entfernt. Neue Anfragen werden als einzelne JSON-Artefakte in „DATA_DIR/call_logs/YYYY-MM-DD/“ geschrieben. -**Protokollierungsumgebungsvariablen:**„LOG*_“, „ENABLE*REQUEST_LOGS“, „CALL_LOGS_MAX“, „CALL_LOG_PAYLOAD_MODE“ und „PROXY_LOG_MAX_ENTRIES“ durch das neue Konfigurationsmodell „APP_LOG*_“ und „CALL_LOG_RETENTION_DAYS“ ersetzt. -**Pipeline-Umschalteinstellung:**Die alte Einstellung „detailed_logs_enabled“ wurde durch „call_log_pipeline_enabled“ ersetzt. Neue Pipelinedetails werden in das Anforderungsartefakt eingebettet, anstatt als separate „request_detail_logs“-Datensätze gespeichert zu werden.### 🛠️ Maintenance

-**Legacy Request Log Upgrade Backup:**Upgrades archivieren jetzt alte „data/logs/“, Legacy „data/call_logs/“ und „data/log.txt“-Layouts in „DATA_DIR/log_archives/\*.zip“, bevor die veraltete Struktur entfernt wird. -**Persistenz der Streaming-Nutzung:**Streaming-Anfragen schreiben jetzt nach Abschluss eine einzelne „usage_history“-Zeile, anstatt eine doppelte Zeile für die laufende Nutzung mit leeren Statusmetadaten auszugeben. -**Nachfolgebereinigung der Protokollierung:**Pipeline-Protokolle erfassen „SOURCE REQUEST“ nicht mehr, Anforderungsartefakteinträge berücksichtigen jetzt „CALL_LOG_MAX_ENTRIES“ und Anwendungsprotokollarchive berücksichtigen jetzt „APP_LOG_MAX_FILES“.---

## [3.4.0] - 2026-03-31

### Funktionen

-**Analyse der Abonnementauslastung:**Kontingent-Snapshot-Zeitreihenverfolgung, Registerkarten „Anbieterauslastung“ und „Combo Health“ mit Recharts-Visualisierungen und entsprechenden API-Endpunkten hinzugefügt (#847) -**SQLite-Sicherungssteuerung:**Neues Umgebungsflag „OMNIROUTE_DISABLE_AUTO_BACKUP“, um automatische SQLite-Sicherungen zu deaktivieren (#846) -**Update der Modellregistrierung:**„gpt-5.4-mini“ in die Modellpalette des Codex-Anbieters eingefügt (#756) -**Verfolgung von Anbieterlimits:**Verfolgen und anzeigen, wann die Tariflimits der Anbieter zuletzt pro Konto aktualisiert wurden (#843)### 🐛 Bug Fixes

-**Qwen Auth Routing:**Qwen OAuth-Vervollständigungen wurden von der DashScope-API zur Web-Inferenz-API („chat.qwen.ai“) umgeleitet, wodurch Autorisierungsfehler behoben wurden (#844, #807, #832) -**Qwen Auto-Retry-Schleife:**Zielgerichtete 429-Kontingentüberschreitung-Backoff-Behandlung in „chatCore“ zum Schutz von Burst-Anfragen hinzugefügt -**Codex OAuth Fallback:**Das Blockieren moderner Browser-Popups fängt den Benutzer nicht mehr ein; es greift automatisch auf die manuelle URL-Eingabe zurück (#808) -**Claude Token Refresh:**Anthropics strikte „application/json“-Grenzen werden jetzt bei der Token-Generierung statt bei codierten URLs respektiert (#836) -**Codex-Nachrichtenschema:**Puristische „Nachrichten“-Injektionen aus nativen Passthrough-Anfragen entfernt, um strukturelle Ablehnungen vom ChatGPT-Upstream zu vermeiden (#806) -**CLI-Erkennungsgrößenbeschränkung:**Die Obergrenze für das Binärscannen des Knotens wurde sicher von 100 MB auf 350 MB erhöht, sodass schwere eigenständige Tools wie Claude Code (229 MB) und OpenCode (153 MB) von der VPS-Laufzeit korrekt erkannt werden können (#809) -**CLI-Laufzeitumgebung:**Die Möglichkeit für CLI-Konfigurationen wurde wiederhergestellt, Benutzerüberschreibungspfade (`CLI_{PROVIDER}_BIN`) zu berücksichtigen und strenge pfadgebundene Erkennungsregeln zu umgehen -**Nvidia-Header-Konflikte:**„prompt_cache_key“-Eigenschaften aus Upstream-Headern entfernt, wenn Nicht-Anthropic-Anbieter aufgerufen werden (#848) -**Codex Fast Tier Toggle:**Wiederhergestellter Codex-Dienststufen-Umschaltkontrast im Lichtmodus (#842) -**Testinfrastruktur:**Aktualisierter „t28-model-catalog-updates“-Test, der fälschlicherweise den veralteten DashScope-Endpunkt für die native Qwen-Registrierung erwartete---

## [3.3.9] - 2026-03-31

### 🐛 Bug Fixes

-**Benutzerdefinierte Anbieterrotation:**„getRotatingApiKey“ intern in DefaultExecutor integriert, um sicherzustellen, dass die „extraApiKeys“-Rotation für benutzerdefinierte und kompatible Upstream-Anbieter korrekt ausgelöst wird (#815)---

## [3.3.8] - 2026-03-30

### Funktionen

-**Modell-API-Filterung:**Der Endpunkt „/v1/models“ filtert seine Liste jetzt dynamisch basierend auf den Berechtigungen, die an „Autorisierung: Bearer <token>“ gebunden sind, wenn der eingeschränkte Zugriff aktiviert ist (#781) -**Qoder-Integration:**Native Integration für Qoder AI, die die alten iFlow-Plattformzuordnungen nativ ersetzt (#660) -**Prompt-Cache-Tracking:**Tracking-Funktionen und Frontend-Visualisierung (Statistikkarte) für semantisches und promptes Caching in der Dashboard-Benutzeroberfläche hinzugefügt### 🐛 Bug Fixes

-**Cache-Dashboard-Größe:**Die UI-Layoutgrößen und Kontext-Header für die erweiterten Cache-Seiten wurden verbessert (#835) -**Sichtbarkeit der Debug-Seitenleiste:**Es wurde ein Problem behoben, bei dem der Debug-Schalter die Debug-Details der Seitenleiste nicht korrekt anzeigte/ausblendete (#834) -**Präfix des Gemini-Modells:**Der Namespace-Fallback wurde geändert, um ordnungsgemäß über „gemini-cli/“ statt „gc/“ weiterzuleiten, um die Upstream-Spezifikationen zu berücksichtigen (#831) -**OpenRouter-Synchronisierung:**Verbesserte Kompatibilitätssynchronisierung, um den verfügbaren Modellkatalog automatisch korrekt von OpenRouter zu übernehmen (#830) -**Zuordnung von Streaming-Nutzlasten:**Durch die Reserialisierung von Begründungsfeldern werden Konflikt-Aliaspfade nativ aufgelöst, wenn die Ausgabe an Edge-Geräte gestreamt wird---

## [3.3.7] - 2026-03-30

### 🐛 Bug Fixes

-**OpenCode Config:**Generierte „opencode.json“ wurde umstrukturiert, um das datensatzbasierte Schema „@ai-sdk/openai-kompatible“ mit „Optionen“ und „Modellen“ als Objektzuordnungen anstelle von flachen Arrays zu verwenden, wodurch Fehler bei der Konfigurationsvalidierung behoben wurden (#816) -**i18n Fehlende Schlüssel:**Fehlender Übersetzungsschlüssel „cloudflaredUrlNotice“ in allen 30 Sprachdateien hinzugefügt, um Konsolenfehler „MISSING_MESSAGE“ auf der Endpunktseite zu verhindern (#823)---

## [3.3.6] - 2026-03-30

### 🐛 Bug Fixes

-**Token-Buchhaltung:**Eingebundene Prompt-Cache-Tokens sicher in die Berechnungen der historischen Nutzungseingaben für korrekte Kontingentabzüge (PR #822) -**Combo-Test-Probes:**Fehlnegative Ergebnisse der Combo-Testlogik wurden behoben, indem das Parsing für Antworten, die nur auf Begründungen basieren, aufgelöst wurde, und eine massive Parallelisierung über Promise.all wurde ermöglicht (PR #828). -**Docker Quick Tunnels:**Eingebettete erforderliche CA-Zertifikate in den Basis-Laufzeitcontainer, um Cloudflared-TLS-Startfehler zu beheben und aufgetretene Standardausgabe-Netzwerkfehler zu ersetzen, die generische Exit-Codes ersetzen (PR #829)---

## [3.3.5] - 2026-03-30

### ✨ New Features

-**Gemini-Kontingentverfolgung:**Gemini-CLI-Kontingentverfolgung in Echtzeit über die „retrieveUserQuota“-API hinzugefügt (PR #825) -**Cache-Dashboard:**Das Cache-Dashboard wurde erweitert, um sofortige Cache-Metriken, 24-Stunden-Trends und geschätzte Kosteneinsparungen anzuzeigen (PR #824)### 🐛 Bug Fixes

-**Benutzererfahrung:**Aufdringliche, automatisch öffnende OAuth-Modalschleifen auf unfruchtbaren Anbieterdetailseiten entfernt (PR #820) -**Abhängigkeitsaktualisierungen:**Abhängigkeiten für Entwicklungs- und Produktionsbäume, einschließlich Next.js 16.2.1, Recharts und TailwindCSS 4.2.2, wurden verschoben und gesperrt (PR #826, #827)---

## [3.3.4] - 2026-03-30

### ✨ New Features

-**A2A-Workflows:**Deterministischer FSM-Orchestrator für mehrstufige Agent-Workflows hinzugefügt. -**Graceful Degradation:**Ein neues mehrschichtiges Fallback-Framework hinzugefügt, um die Kernfunktionalität bei teilweisen Systemausfällen aufrechtzuerhalten. -**Config Audit:**Ein Audit-Trail mit Diff-Erkennung hinzugefügt, um Änderungen zu verfolgen und Konfigurations-Rollbacks zu ermöglichen. -**Anbieterstatus:**Anbieterablaufverfolgung mit proaktiven UI-Benachrichtigungen für ablaufende API-Schlüssel hinzugefügt. -**Adaptives Routing:**Ein adaptiver Volumen- und Komplexitätsdetektor wurde hinzugefügt, um Routing-Strategien dynamisch basierend auf der Auslastung zu überschreiben. -**Anbietervielfalt:**Anbieterdiversitätsbewertung über Shannon-Entropie implementiert, um die Lastverteilung zu verbessern. -**Grenzen für die automatische Deaktivierung:**Dem Resilienz-Dashboard wurde ein Einstellungsschalter für die automatische Deaktivierung gesperrter Konten hinzugefügt.### 🐛 Bug Fixes

-**Codex- und Claude-Kompatibilität:**UI-Fallbacks behoben, Codex-Nicht-Streaming-Integrationsprobleme gepatcht und CLI-Laufzeiterkennung unter Windows behoben. -**Release-Automatisierung:**Erweiterte Berechtigungen für den Electron App-Build in GitHub Actions erforderlich. -**Cloudflare Runtime:**Korrekte Laufzeitisolations-Exit-Codes für Cloudflared-Tunnelkomponenten wurden behoben.### 🧪 Tests

-**Updates der Testsuite:**Erweiterte Testabdeckung für Volumendetektoren, Anbietervielfalt, Konfigurationsprüfung und FSM.---

## [3.3.3] - 2026-03-29

### 🐛 Bug Fixes

-**CI/CD-Zuverlässigkeit:**GitHub-Aktionen wurden auf stabile Abhängigkeitsversionen („actions/checkout@v4“, „actions/upload-artifact@v4“) gepatcht, um unangekündigte veraltete Builder-Umgebungen abzumildern. -**Image-Fallbacks:**Beliebige Fallback-Ketten in „ProviderIcon.tsx“ wurden durch explizite Asset-Validierung ersetzt, um zu verhindern, dass die Benutzeroberfläche „<Image>“-Komponenten für nicht vorhandene Dateien lädt, wodurch „404“-Fehler in Dashboard-Konsolenprotokollen beseitigt wurden (#745). -**Admin Updater:**Dynamische Quellinstallationserkennung für den Dashboard-Updater. Deaktiviert sicher die Schaltfläche „Jetzt aktualisieren“, wenn OmniRoute lokal und nicht über npm erstellt wird, und fordert zu „git pull“ auf (#743). -**Eresolve-Fehler aktualisieren:**„package.json“-Überschreibungen für „react“/„react-dom“ eingefügt und „--legacy-peer-deps“ in den internen automatischen Updater-Skripten aktiviert, um störende Abhängigkeitsbaumkonflikte mit „@lobehub/ui“ zu lösen.---

## [3.3.2] - 2026-03-29

### ✨ New Features

-**Cloudflare Tunnels:**Cloudflare Quick Tunnel-Integration mit Dashboard-Steuerelementen (PR #772). -**Diagnose:**Semantische Cache-Umgehung für kombinierte Live-Tests (PR #773).### 🐛 Bug Fixes

-**Streaming-Stabilität:**Wenden Sie „FETCH_TIMEOUT_MS“ auf den ersten „fetch()“-Aufruf von Streaming-Anfragen an, um zu verhindern, dass ein Node.js-TCP-Timeout von 300 Sekunden zu Fehlern bei stillen Aufgaben führt (#769). -**i18n:**Fehlende „windsurf“- und „copilot“-Einträge zu „toolDescriptions“ in allen 33 Gebietsschemadateien hinzugefügt (#748). -**GLM-Coding-Audit:**Vollständige Anbieterprüfung zur Behebung von ReDoS-Schwachstellen, Kontextfenstergröße (128.000/16.000) und Modellregistrierungssynchronisierung (PR #778).---

## [3.3.1] - 2026-03-29

### 🐛 Bug Fixes

-**OpenAI-Codex:**Korrektur der Fallback-Verarbeitung für „type: „text““-Elemente mit Null- oder leeren Datensätzen, die eine 400-Zurückweisung verursachten (#742). -**Opencode:**Schemaausrichtung auf singulären „Anbieter“ aktualisieren, um der offiziellen Spezifikation zu entsprechen (#774). -**Gemini CLI:**Fügen Sie fehlende Endbenutzer-Kontingent-Header ein, um 403-Autorisierungssperren zu verhindern (#775). -**DB-Wiederherstellung:**Mehrteilige Nutzlastimporte in unformatierte binär gepufferte Arrays umgestalten, um die maximalen Body-Grenzwerte des Reverse-Proxys zu umgehen (#770).---

## [3.3.0] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Release-Stabilisierung**– Finalisierte Version 3.2.9 (Combo-Diagnose, Quality Gates, Gemini-Tool-Korrektur) und fehlendes Git-Tag erstellt. Alle bereitgestellten Änderungen wurden in einem einzigen atomaren Release-Commit konsolidiert.### 🐛 Bug Fixes

-**Auto-Update-Test**– Die Testzusicherung „buildDockerComposeUpdateScript“ wurde so korrigiert, dass sie mit nicht erweiterten Shell-Variablenreferenzen („$TARGET_TAG“, „${TARGET_TAG#v}“) im generierten Bereitstellungsskript übereinstimmt und mit der überarbeiteten Vorlage aus Version 3.2.8 übereinstimmt. -**Leistungsschaltertest**– „combo-Circuit-breaker.test.mjs“ wurde durch Einfügen von „maxRetries: 0“ gehärtet, um zu verhindern, dass die Wiederholungsinflation die Fehleranzahlzusicherungen während Leistungsschalterzustandsübergängen verzerrt.---

## [3.2.9] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Combo-Diagnose**– Einführung eines Live-Test-Bypass-Flags („forceLiveComboTest“), das es Administratoren ermöglicht, echte Upstream-Gesundheitsprüfungen durchzuführen, die alle lokalen Leistungsschalter- und Cooldown-Statusmechanismen umgehen und so eine präzise Diagnose während der Einführung von Ausfällen ermöglichen (PR #759) -**Quality Gates**– Automatische Validierung der Antwortqualität für Combos hinzugefügt und offiziell integrierte „Claude-4.6“-Modellunterstützung in die Kern-Routing-Schemata (PR #762)### 🐛 Bug Fixes

-**Tool-Definitionsvalidierung**– Die Gemini-API-Integration wurde durch Normalisierung von Enum-Typen innerhalb von Tool-Definitionen repariert, wodurch Upstream-HTTP-400-Parameterfehler verhindert wurden (PR #760)---

## [3.2.8] - 2026-03-29

### ✨ Enhancements & Refactoring

-**Docker Auto-Update UI**– Integriert einen separaten Hintergrundaktualisierungsprozess für Docker Compose-Bereitstellungen. Die Dashboard-Benutzeroberfläche verfolgt jetzt nahtlos Aktualisierungslebenszyklusereignisse und kombiniert JSON-REST-Antworten mit SSE-Streaming-Fortschrittsüberlagerungen für robuste umgebungsübergreifende Zuverlässigkeit. -**Cache-Analyse**– Die Null-Metrik-Visualisierungszuordnung wurde durch die direkte Migration von Semantic-Cache-Telemetrieprotokollen direkt in das zentralisierte Tracking-SQLite-Modul repariert.### 🐛 Bug Fixes

-**Authentifizierungslogik**– Es wurde ein Fehler behoben, bei dem das Speichern von Dashboard-Einstellungen oder das Hinzufügen von Modellen mit dem Fehler 401 Unauthorized fehlschlug, wenn „requireLogin“ deaktiviert war. API-Endpunkte werten den globalen Authentifizierungsschalter jetzt korrekt aus. Die globale Umleitung wurde durch erneute Aktivierung von „src/middleware.ts“ behoben. -**CLI-Tool-Erkennung (Windows)**– Schwerwiegende Initialisierungsausnahmen während der CLI-Umgebungserkennung wurden verhindert, indem „Cross-Spawn“-ENOENT-Fehler korrekt abgefangen wurden. Fügt explizite Erkennungspfade für „\AppData\Local\droid\droid.exe“ hinzu. -**Codex Native Passthrough**– Normalisierte Modellübersetzungsparameter verhindern Kontextvergiftung im Proxy-Passthrough-Modus und erzwingen explizit generische „store: false“-Einschränkungen für alle von Codex stammenden Anforderungen. -**SSE-Token-Reporting**– Normalisierte Erkennung des Provider-Tool-Aufrufblocks „finish_reason“, Behebung von 0 % Nutzungsanalyse für reine Stream-Antworten, denen strenge „<DONE>“-Indikatoren fehlen. -**DeepSeek <think>-Tags**– Eine explizite „<think>“-Extraktionszuordnung in „responsesHandler.ts“ implementiert, um sicherzustellen, dass DeepSeek-Argumentationsströme äquivalent zu nativen Anthropic-„<thinking>“-Strukturen abgebildet werden.---

## [3.2.7] - 2026-03-29

### Fixed

-**Nahtlose UI-Updates**: Die Funktion „Jetzt aktualisieren“ im Dashboard bietet jetzt transparentes Live-Feedback mithilfe von Server-Sent Events (SSE). Es führt die Paketinstallation, die Neuerstellung nativer Module (better-sqlite3) und PM2-Neustarts zuverlässig durch und zeigt Echtzeit-Loader an, anstatt stillschweigend hängen zu bleiben.---

## [3.2.6] — 2026-03-29

### ✨ Enhancements & Refactoring

-**API Key Reveal (#740)**– Im Api Manager wurde ein bereichsbezogener API-Schlüsselkopierablauf hinzugefügt, der durch die Umgebungsvariable „ALLOW_API_KEY_REVEAL“ geschützt ist. -**Sichtbarkeitskontrollen in der Seitenleiste (#739)**– Administratoren können jetzt alle Navigationslinks in der Seitenleiste über die Darstellungseinstellungen ausblenden, um die visuelle Unordnung zu reduzieren. -**Strenge Combo-Tests (#735)**– Der Combo-Health-Check-Endpunkt wurde gehärtet, um Live-Text-Antworten von Modellen statt nur weichen Erreichbarkeitssignalen zu erfordern. -**Gestreamte detaillierte Protokolle (#734)**– Die detaillierte Anforderungsprotokollierung für SSE-Streams wurde geändert, um die endgültige Nutzlast zu rekonstruieren, wodurch enorme Mengen an SQLite-Datenbankgröße eingespart und die Benutzeroberfläche erheblich bereinigt werden.### 🐛 Bug Fixes

-**OpenCode Go MiniMax Auth (#733)**– Die Authentifizierungs-Header-Logik für „Minimax“-Modelle auf OpenCode Go wurde korrigiert, um „x-api-key“ anstelle von Standard-Bearer-Tokens im gesamten „/messages“-Protokoll zu verwenden.---

## [3.2.5] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Void Linux Deployment Support (#732)**– Integrierte „xbps-src“-Paketvorlage und Anweisungen zum nativen Kompilieren und Installieren von OmniRoute mit „better-sqlite3“-Bindungen über ein Cross-Compilation-Ziel.## [3.2.4] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Qoder AI-Migration (#660)**– Vollständige Migration des alten „iFlow“-Kernanbieters auf „Qoder AI“ unter Beibehaltung stabiler API-Routing-Funktionen.### 🐛 Bug Fixes

-**Gemini Tools HTTP 400 Payload Ungültiges Argument (#731)**– Es wurde verhindert, dass „thoughtSignature“-Array-Injektionen in standardmäßige „functionCall“-Sequenzen von Gemini Agenten-Routing-Abläufe blockieren.---

## [3.2.3] — 2026-03-29

### ✨ Enhancements & Refactoring

-**Benutzeroberfläche für Anbieterlimit-Kontingente (#728)**– Normalisierte Kontingentlimit-Logik und Datenbeschriftung innerhalb der Limits-Schnittstelle.### 🐛 Bug Fixes

-**Kern-Routing-Schemas und -Lecks**– „comboStrategySchema“ wurde erweitert, um „Fill-First“- und „P2C“-Strategien nativ zu unterstützen und komplexe Combo-Bearbeitung nativ freizugeben. -**Thinking Tags Extraction (CLI)**– Umstrukturiertes CLI-Token-Antwort-Desinfektionsmittel RegEx erfasst Modellbegründungsstrukturen innerhalb von Streams und vermeidet fehlerhafte „<thinking>“-Extraktionen, die das Antworttext-Ausgabeformat beeinträchtigen. -**Strenge Formatdurchsetzungen**– Gehärtete Ausführung der Pipeline-Bereinigung, sodass sie universell für Ziele im Übersetzungsmodus gilt.---

## [3.2.2] — 2026-03-29

### ✨ New Features

-**Vierstufige Anforderungsprotokoll-Pipeline (#705)**– Die Protokollpersistenz wurde überarbeitet, um umfassende Nutzlasten in vier verschiedenen Pipeline-Stufen zu speichern: Client-Anfrage, übersetzte Anbieteranforderung, Anbieter-Antwort und übersetzte Client-Antwort. Einführung von „streamPayloadCollector“ für robuste SSE-Stream-Kürzung und Payload-Serialisierung.### 🐛 Bug Fixes

-**Korrekturen für die mobile Benutzeroberfläche (#659)**– Es wurde verhindert, dass Tabellenkomponenten im Dashboard das Layout in schmalen Ansichtsfenstern unterbrechen, indem korrektes horizontales Scrollen und Überlaufeindämmung zu „DashboardLayout“ hinzugefügt wurden. -**Claude Prompt Cache Fixes (#708)**– Sichergestellt, dass „cache_control“-Blöcke in Claude-to-Claude-Fallback-Schleifen originalgetreu erhalten bleiben und sicher an Anthropic-Modelle zurückgegeben werden. -**Gemini-Tool-Definitionen (#725)**– Schemaübersetzungsfehler beim Deklarieren einfacher „Objekt“-Parametertypen für Gemini-Funktionsaufrufe behoben.## [3.2.1] — 2026-03-29

### ✨ New Features

-**Globaler Fallback-Anbieter (#689)**– Wenn alle Combo-Modelle erschöpft sind (502/503), versucht OmniRoute nun ein konfigurierbares globales Fallback-Modell, bevor der Fehler zurückgegeben wird. Stellen Sie „globalFallbackModel“ in den Einstellungen ein, um es zu aktivieren.### 🐛 Bug Fixes

-**Fix #721**– Die Umgehung der Kontextfixierung während der Antworten auf Toolaufrufe wurde behoben. Beim Nicht-Streaming-Tagging wurde der falsche JSON-Pfad verwendet („json.messages“ → „json.choices[0].message“). Die Streaming-Injektion wird jetzt auf „finish_reason“-Blöcken für Streams, die nur Tool-Aufrufe umfassen, ausgelöst. „injectModelTag()“ hängt jetzt synthetische Pin-Nachrichten für Nicht-String-Inhalte an. -**Fix #709**– Bestätigt, bereits behoben (v3.1.9) – „system-info.mjs“ erstellt Verzeichnisse rekursiv. Geschlossen. -**Fix #707**– Bestätigt, bereits behoben (v3.1.9) – Leere Tool-Namensbereinigung in „chatCore.ts“. Geschlossen.### 🧪 Tests

– 6 Unit-Tests für Kontext-Pinning mit Tool-Call-Antworten hinzugefügt (Nullinhalt, Array-Inhalt, Roundtrip, Neuinjektion)## [3.2.0] — 2026-03-28

### ✨ New Features

-**Cache-Management-UI**– Ein dediziertes semantisches Caching-Dashboard unter \`/dashboard/cache\` mit gezielter API-Invalidierung und 31-Sprachen-i18n-Unterstützung hinzugefügt (PR #701 von @oyi77) -**GLM-Kontingentverfolgung**– Echtzeit-Nutzungs- und Sitzungskontingentverfolgung für den GLM Coding (Z.AI)-Anbieter hinzugefügt (PR #698 von @christopher-s) -**Detaillierte Protokollnutzlasten**– Verdrahtete vollständige vierstufige Pipeline-Nutzlasterfassung (Original, übersetzt, Anbieter-Antwort, gestreamte Deltas) direkt in die Benutzeroberfläche (PR #705 von @rdself)### 🐛 Bug Fixes

–**Fix #708**– Verhinderung von Token-Bleeding für Claude-Code-Benutzer, die über OmniRoute weiterleiten, indem native \`cache_control\`-Header während des Claude-zu-Claude-Passthrough korrekt beibehalten werden (PR #708 von @tombii) -**Fix #719**– Richten Sie interne Authentifizierungsgrenzen für „ModelSyncScheduler“ ein, um nicht authentifizierte Daemon-Fehler beim Start zu verhindern (PR #719 von @rdself) -**Fix #718**– Neu erstellte Badge-Darstellung in der Benutzeroberfläche für Anbieterlimits, um eine Überlappung fehlerhafter Kontingentgrenzen zu verhindern (PR #718 von @rdself) -**Fix #704**– Combo-Fallbacks, die bei HTTP 400-Inhaltsrichtlinienfehlern kaputt gingen und ein Dead-Routing bei der Modellrotation verhinderten, wurden behoben (PR #704 von @rdself)### 🔒 Security & Dependencies

- „Path-to-regexp“ wurde auf „8.4.0“ verschoben, um Abhängigkeits-Schwachstellen zu beheben (PR #715)## [3.1.10] — 2026-03-28

### 🐛 Bug Fixes

-**Fix #706**– Symbol-Fallback-Rendering behoben, das durch Tailwind V4 „font-sans“-Überschreibung durch Anwenden von „!important“ auf „.material-symbols-outlined“ verursacht wurde. -**Fix #703**– Defekte GitHub Copilot-Streams wurden behoben, indem „Antworten“ auf die „openai“-Formatübersetzung für alle benutzerdefinierten Modelle aktiviert wurden, die „apiFormat: „responses““ nutzen. -**Fix Nr. 702**– Flatrate-Nutzungsverfolgung durch genaue DB-Preisberechnungen für Streaming- und Nicht-Streaming-Antworten ersetzt. -**Fix #716**– Claude-Tool-Call-Übersetzungsstatus bereinigt, Streaming-Argumente korrekt analysiert und verhindert, dass OpenAI-„tool_calls“-Chunks das „id“-Feld wiederholen.## [3.1.9] — 2026-03-28

### ✨ New Features

-**Schema-Zwang**– Zwingt string-codierte numerische JSON-Schema-Einschränkungen (z. B. „Minimum“: „1“) automatisch in die richtigen Typen um und verhindert so 400-Fehler von Cursor, Cline und anderen Clients, die fehlerhafte Tool-Schemata senden. -**Bereinigung von Werkzeugbeschreibungen**– Stellen Sie sicher, dass Werkzeugbeschreibungen immer Zeichenfolgen sind; Konvertiert „null“, „undefiniert“ oder numerische Beschreibungen in leere Zeichenfolgen, bevor es an Anbieter gesendet wird. -**Schaltfläche „Alle Modelle löschen“**– i18n-Übersetzungen für die Anbieteraktion „Alle Modelle löschen“ in allen 30 Sprachen hinzugefügt. -**Codex Auth-Export**– Codex „auth.json“-Export- und Apply-Local-Schaltflächen für eine nahtlose CLI-Integration hinzugefügt. -**Windsurf BYOK-Hinweise**– Der Windsurf CLI-Toolkarte wurden offizielle Einschränkungswarnungen hinzugefügt, die BYOK-Einschränkungen dokumentieren.### 🐛 Bug Fixes

-**Fix #709**– „system-info.mjs“ stürzt nicht mehr ab, wenn das Ausgabeverzeichnis nicht existiert (hinzugefügt „mkdirSync“ mit rekursivem Flag). -**Fix #710**– A2A „TaskManager“-Singleton verwendet jetzt „globalThis“, um Statusverluste bei Next.js-API-Routen-Neukompilierungen im Entwicklungsmodus zu verhindern. E2E-Testsuite wurde aktualisiert, um 401 ordnungsgemäß zu verarbeiten. -**Fix #711**– Anbieterspezifische Durchsetzung der Obergrenze „max*tokens“ für Upstream-Anfragen hinzugefügt. -**Fix #605 / #592**– Entfernen Sie das Präfix „proxy*“ aus den Toolnamen in Nicht-Streaming-Claude-Antworten; Die LongCat-Validierungs-URL wurde korrigiert. -**Max. Obergrenze für Anrufprotokolle**– „getMaxCallLogs()“ wurde mit Caching-Ebene, Unterstützung für Umgebungsvariablen („CALL_LOGS_MAX“) und Integration von DB-Einstellungen aktualisiert.### 🧪 Tests

- Testsuite von 964 auf 1027 Tests erweitert (63 neue Tests)
- „schema-coercion.test.mjs“ hinzugefügt – 9 Tests für numerische Feldumsetzung und Tool-Beschreibungsbereinigung
- „t40-opencode-cli-tools-integration.test.mjs“ hinzugefügt – OpenCode/Windsurf CLI-Integrationstests
- Erweiterter Feature-Tests-Zweig mit umfassenden Abdeckungstools### 📁 New Files

| Datei                                                    | Zweck                                                                |
| -------------------------------------------------------- | -------------------------------------------------------------------- | ---------------- |
| `open-sse/translator/helpers/schemaCoercion.ts`          | Dienstprogramme zur Schema-Zwangs- und Tool-Beschreibungsbereinigung |
| `tests/unit/schema-coercion.test.mjs`                    | Unit-Tests für Schemazwang                                           |
| `tests/unit/t40-opencode-cli-tools-integration.test.mjs` | CLI-Tool-Integrationstests                                           |
| `COVERAGE_PLAN.md`                                       | Planungsdokument zur Testabdeckung                                   | ### 🐛 Bug Fixes |

-**Claude Prompt Caching Passthrough**– Das Entfernen von Cache_Control-Markern im Claude-Passthrough-Modus (Claude → OmniRoute → Claude) wurde behoben, was dazu führte, dass Claude Code-Benutzer ihr Anthropic API-Kontingent 5-10x schneller erschöpften als bei direkten Verbindungen. OmniRoute behält jetzt die „cache_control“-Marker des Clients bei, wenn „sourceFormat“ und „targetFormat“ beide „Claude“ sind. Dadurch wird sichergestellt, dass das Prompt-Caching korrekt funktioniert und der Tokenverbrauch drastisch reduziert wird.## [3.1.8] - 2026-03-27

### 🐛 Bug Fixes & Features

-**Plattformkern:**Globale Statusbehandlung für versteckte Modelle und Kombinationen implementiert, um zu verhindern, dass sie den Katalog überladen oder in verbundene MCP-Agenten eindringen (#681). -**Stabilität:**Gepatchte Streaming-Abstürze im Zusammenhang mit der fehlgeschlagenen Integration des nativen Antigravity-Anbieters aufgrund nicht behandelter undefinierter Zustands-Arrays (#684). -**Lokalisierungssynchronisierung:**Ein vollständig überarbeiteter „i18n“-Synchronizer wurde bereitgestellt, der fehlende verschachtelte JSON-Eigenschaften erkennt und 30 Gebietsschemata nacheinander nachrüstet (#685).## [3.1.7] – 27.03.2026### 🐛 Bug Fixes

-**Streaming-Stabilität:**Problem behoben, bei dem „hasValuableContent“ „undefiniert“ für leere Blöcke in SSE-Streams zurückgab (#676). -**Tool-Aufruf:**Es wurde ein Problem in „sseParser.ts“ behoben, bei dem bei nicht gestreamten Claude-Antworten mit mehreren Tool-Aufrufen die „id“ nachfolgender Tool-Aufrufe aufgrund einer falschen indexbasierten Deduplizierung verloren gingen (#671).---

## [3.1.6] — 2026-03-27

### 🐛 Bug Fixes

-**Wiederherstellung des nativen Tool-Namens von Claude**– Tool-Namen wie „TodoWrite“ wird in Claude-Passthrough-Antworten (sowohl Streaming als auch Nicht-Streaming) nicht mehr das Präfix „proxy\_“ vorangestellt. Beinhaltet Unit-Test-Abdeckung (PR #663 von @coobabm) -**Bereinigung des Aliasnamens „Alle Modelle löschen“**– Die Schaltfläche „Alle Modelle löschen“ entfernt jetzt auch zugehörige Modellaliase und verhindert so Geistermodelle in der Benutzeroberfläche (PR #664 von @rdself)---

## [3.1.5] — 2026-03-27

### 🐛 Bug Fixes

-**Backoff Auto-Decay**– Konten mit eingeschränkter Rate werden jetzt automatisch wiederhergestellt, wenn ihr Abklingzeitfenster abläuft. Dadurch wird ein Deadlock behoben, bei dem ein hohes „BackoffLevel“ Konten dauerhaft depriorisierte (PR #657 von @brendandebeasi)### 🌍 i18n

-**Überarbeitung der chinesischen Übersetzung**– Umfassende Neufassung von „zh-CN.json“ mit verbesserter Genauigkeit (PR #658 von @only4copilot)---

## [3.1.4] — 2026-03-27

### 🐛 Bug Fixes

-**Streaming Override Fix**– Explizites „stream: true“ im Anfragetext hat jetzt Priorität vor dem Header „Accept: application/json“. Clients, die beide senden, erhalten korrekt SSE-Streaming-Antworten (#656)### 🌍 i18n

-**Verbesserungen der tschechischen Zeichenfolge**– Verfeinerte Terminologie in „cs.json“ (PR #655 von @zen0bit)---

## [3.1.3] — 2026-03-26

### 🌍 i18n & Community

-**~70 fehlende Übersetzungsschlüssel**zu „en.json“ und 12 Sprachen hinzugefügt (PR #652 von @zen0bit) -**Tschechische Dokumentation aktualisiert**– CLI-TOOLS, API_REFERENCE, VM_DEPLOYMENT-Anleitungen (PR #652) -**Übersetzungsvalidierungsskripts**– „check_translations.py“ und „validate_translation.py“ für CI/QA (PR #651 von @zen0bit)---

## [3.1.2] — 2026-03-26

### 🐛 Bug Fixes

-**Kritisch: Tool-Aufruf-Regression**– „proxy*Bash“-Fehler wurden behoben, indem das Präfix „proxy*“-Toolnamen im Claude-Passthrough-Pfad deaktiviert wurde. Tools wie „Bash“, „Read“, „Write“ wurden in „proxy_Bash“, „proxy_Read“ usw. umbenannt, was dazu führte, dass Claude sie ablehnte (#618) -**Kiro-Kontosperrungsdokumentation**– Dokumentiert als falsch positives Upstream-AWS-Anti-Betrugs-Ereignis, kein OmniRoute-Problem (#649)### 🧪 Tests

-**936 Tests, 0 Fehler**---

## [3.1.1] — 2026-03-26

### ✨ New Features

-**Metadaten zur Visionsfähigkeit**: „capabilities.vision“, „input_modalities“ und „output_modalities“ zu „/v1/models“-Einträgen für visionfähige Modelle hinzugefügt (PR #646) -**Gemini 3.1-Modelle**: „gemini-3.1-pro-preview“ und „gemini-3.1-flash-lite-preview“ zum Antigravity-Anbieter hinzugefügt (#645)### 🐛 Bug Fixes

-**Ollama Cloud 401-Fehler**: Falsche API-Basis-URL behoben – geändert von „api.ollama.com“ in offiziell „ollama.com/v1/chat/completions“ (#643) -**Wiederholung abgelaufener Token**: Begrenzter Wiederholungsversuch mit exponentiellem Backoff (5→10→20 Minuten) für abgelaufene OAuth-Verbindungen hinzugefügt, anstatt sie dauerhaft zu überspringen (PR #647)### 🧪 Tests

-**936 Tests, 0 Fehler**---

## [3.1.0] — 2026-03-26

### ✨ New Features

-**GitHub-Problemvorlagen**: Standardisierte Fehlerberichts-, Funktionsanfrage- und Konfigurations-/Proxy-Problemvorlagen hinzugefügt (#641) -**Alle Modelle löschen**: Schaltfläche „Alle Modelle löschen“ zur Anbieterdetailseite mit i18n-Unterstützung in 29 Sprachen hinzugefügt (#634)### 🐛 Bug Fixes

-**Gebietsschemakonflikt (`in.json`)**: Die Hindi-Gebietsschemadatei wurde von „in.json“ (indonesischer ISO-Code) in „hi.json“ umbenannt, um Übersetzungskonflikte in Weblate zu beheben (#642) -**Codex Empty Tool Names**: Die Bereinigung von Toolnamen wurde vor dem nativen Codex-Passthrough verschoben, wodurch 400 Fehler von Upstream-Anbietern behoben wurden, wenn Tools leere Namen hatten (#637) -**Streaming von Newline-Artefakten**: „collapseExcessiveNewlines“ wurde zur Antwortbereinigung hinzugefügt, wodurch Läufe von mehr als 3 aufeinanderfolgenden Newline-Artefakten aus Denkmodellen in einen standardmäßigen doppelten Newline-Vorgang reduziert werden (#638) -**Claude Reasoning Effort**: OpenAI-Parameter „reasoning_effort“ in Claudes nativen „Thinking“-Budgetblock über alle Anforderungspfade hinweg konvertiert, einschließlich automatischer „max_tokens“-Anpassung (#627) -**Qwen-Token-Aktualisierung**: Proaktive OAuth-Token-Aktualisierungen vor Ablauf (5-Minuten-Puffer) implementiert, um zu verhindern, dass Anfragen fehlschlagen, wenn kurzlebige Token verwendet werden (#631)### 🧪 Tests

-**936 Tests, 0 Fehler**(+10 Tests seit 3.0.9)---

## [3.0.9] — 2026-03-26

### 🐛 Bug Fixes

-**NaN-Tokens in Claude Code / Client-Antworten (#617):**

- „sanitizeUsage()“ ordnet jetzt „input_tokens“ → „prompt_tokens“ und „output_tokens“ → „completion_tokens“ vor dem Whitelist-Filter übergreifend zu und korrigiert Antworten, die NaN/0-Token-Zählungen anzeigen, wenn Anbieter Verwendungsfeldnamen im Claude-Stil zurückgeben### Sicherheit

– Aktualisiertes „yaml“-Paket zur Behebung der Stapelüberlauf-Schwachstelle (GHSA-48c2-rrv3-qjmp)### 📋 Issue Triage

- Geschlossen Nr. 613 (Codestral – mit Problemumgehung für benutzerdefinierte Anbieter behoben)
  – Kommentiert zu #615 (OpenCode Dual-Endpoint – Problemumgehung bereitgestellt, als Funktionsanfrage verfolgt)
- Kommentiert zu #618 (Sichtbarkeit von Toolaufrufen – Anforderung von v3.0.9-Test)
- Kommentiert zu #627 (Aufwandsgrad – bereits unterstützt)---

## [3.0.8] — 2026-03-25

### 🐛 Bug Fixes

-**Übersetzungsfehler für OpenAI-Format-Anbieter in Claude CLI (#632):**

- Behandelt das Array-Format „reasoning_details[]“ von StepFun/OpenRouter – konvertiert in „reasoning_content“.
- Behandeln Sie den Feldalias „reasoning“ einiger Anbieter → normalisiert auf „reasoning_content“.
- Feldnamen für kartenübergreifende Verwendung: „input_tokens“↔„prompt_tokens“, „output_tokens“↔„completion_tokens“ in „filterUsageForFormat“.
- Korrigieren Sie „extractUsage“, um sowohl „input_tokens“/„output_tokens“ als auch „prompt_tokens“/„completion_tokens“ als gültige Nutzungsfelder zu akzeptieren
  – Wird sowohl auf Streaming- („sanitizeStreamingChunk“, „openai-to-claude.ts“-Übersetzer) als auch auf Nicht-Streaming- („sanitizeMessage“) Pfade angewendet---

## [3.0.7] — 2026-03-25

### 🐛 Bug Fixes

-**Antigravity-Token-Aktualisierung:**Fehler „client_secret fehlt“ für npm-installierte Benutzer behoben – „clientSecretDefault“ war in der ProviderRegistry leer, was dazu führte, dass Google Token-Aktualisierungsanfragen ablehnte (#588) -**OpenCode Zen-Modelle:**„modelsUrl“ zum OpenCode Zen-Registrierungseintrag hinzugefügt, damit „Importieren aus /models“ korrekt funktioniert (#612) -**Streaming-Artefakte:**Überschüssige Zeilenumbrüche in Antworten nach dem Entfernen der Thinking-Tag-Signatur behoben (#626) -**Proxy-Fallback:**Automatischer Wiederholungsversuch ohne Proxy hinzugefügt, wenn das SOCKS5-Relay fehlschlägt -**Proxy-Test:**Der Testendpunkt löst jetzt echte Anmeldeinformationen aus der Datenbank über die Proxy-ID auf### ✨ New Features

-**Playground-Konto-/Schlüsselauswahl:**Permanentes, immer sichtbares Dropdown-Menü zur Auswahl bestimmter Anbieterkonten/Schlüssel zum Testen – ruft alle Verbindungen beim Start ab und filtert nach ausgewähltem Anbieter -**Dynamische Modelle der CLI-Tools:**Die Modellauswahl wird jetzt dynamisch von der API „/v1/models“ abgerufen – Anbieter wie Kiro zeigen jetzt ihren vollständigen Modellkatalog an -**Antigravity-Modellliste:**Aktualisiert mit Claude Sonnet 4.5, Claude Sonnet 4, GPT 5, GPT 5 Mini; „passthroughModels“ für dynamischen Modellzugriff aktiviert (#628)### 🔧 Maintenance

- Zusammengeführte PR Nr. 625 – Anbieter schränkt die Hintergrundkorrektur im Lichtmodus ein---

## [3.0.6] — 2026-03-25

### 🐛 Bug Fixes

-**Limits/Proxy:**Das Abrufen des Codex-Limits für Konten hinter SOCKS5-Proxys wurde korrigiert – die Token-Aktualisierung wird jetzt im Proxy-Kontext ausgeführt -**CI:**Fehler bei der Assertion des Integrationstests „v1/models“ in CI-Umgebungen ohne Anbieterverbindungen behoben -**Einstellungen:**Die Schaltfläche „Proxy-Test“ zeigt nun sofort Erfolgs-/Fehlerergebnisse an (bisher hinter Gesundheitsdaten verborgen)### ✨ New Features

-**Playground:**Dropdown-Liste zur Kontoauswahl hinzugefügt – testen Sie bestimmte Verbindungen einzeln, wenn ein Anbieter über mehrere Konten verfügt### 🔧 Maintenance

- Zusammengeführte PR #623 – Korrektur des Basis-URL-Pfads der LongCat-API---

## [3.0.5] — 2026-03-25

### ✨ New Features

-**Einschränkungen der Benutzeroberfläche:**Tag-Gruppierungsfunktion zum Verbindungs-Dashboard hinzugefügt, um die visuelle Organisation für Konten mit benutzerdefinierten Tags zu verbessern.---

## [3.0.4] — 2026-03-25

### 🐛 Bug Fixes

-**Streaming:**Die Statusbeschädigung von „TextDecoder“ in der Combo „sanitize“ TransformStream wurde behoben, was zu einer verstümmelten SSE-Ausgabe führte, die mit Multibyte-Zeichen übereinstimmte (PR #614) -**Anbieter-Benutzeroberfläche:**Rendern Sie HTML-Tags sicher in den Tooltips für Anbieterverbindungsfehler mit „dangerouslySetInnerHTML“. -**Proxy-Einstellungen:**Fehlende Payload-Körpereigenschaften „Benutzername“ und „Passwort“ hinzugefügt, sodass authentifizierte Proxys erfolgreich über das Dashboard überprüft werden können. -**Anbieter-API:**Die gebundene Soft-Ausnahme kehrt zu „getCodexUsage“ zurück und verhindert API-HTTP-500-Fehler, wenn der Token-Abruf fehlschlägt---

## [3.0.3] — 2026-03-25

### ✨ New Features

-**Auto-Sync-Modelle:**Ein UI-Schalter und ein „Sync-Models“-Endpunkt hinzugefügt, um Modelllisten pro Anbieter mithilfe eines geplanten Intervallplaners automatisch zu synchronisieren (PR #597)### 🐛 Bug Fixes

-**Zeitüberschreitungen:**Die Standard-Proxys „FETCH_TIMEOUT_MS“ und „STREAM_IDLE_TIMEOUT_MS“ wurden auf 10 Minuten erhöht, um Deep Reasoning-Modelle (wie o1) ordnungsgemäß zu unterstützen, ohne dass Anfragen abgebrochen werden müssen (Fixes #609) -**CLI-Tool-Erkennung:**Verbesserte plattformübergreifende Erkennung bei der Verarbeitung von NVM-Pfaden, Windows „PATHEXT“ (verhindert Probleme mit „.cmd“-Wrappern) und benutzerdefinierten NPM-Präfixen (PR #598) -**Streaming-Protokolle:**Delta-Akkumulation von „tool_calls“ in Streaming-Antwortprotokollen implementiert, damit Funktionsaufrufe genau verfolgt und in der Datenbank gespeichert werden (PR #603) -**Modellkatalog:**Authentifizierungsausnahme entfernt, wodurch die Modelle „comfyui“ und „sdwebui“ ordnungsgemäß ausgeblendet werden, wenn kein Anbieter explizit konfiguriert ist (PR #599)### 🌐 Translations

-**cs:**Verbesserte tschechische Übersetzungszeichenfolgen in der gesamten App (PR #601)## [3.0.2] — 2026-03-25

### 🚀 Enhancements & Features

#### feat(ui): Connection Tag Grouping

– Ein Tag-/Gruppenfeld zu „EditConnectionModal“ hinzugefügt (gespeichert in „providerSpecificData.tag“), ohne dass DB-Schemamigrationen erforderlich sind.
– Verbindungen in der Anbieteransicht werden jetzt dynamisch nach Tag mit visuellen Trennlinien gruppiert.

- Nicht getaggte Verbindungen erscheinen zuerst ohne Kopfzeile, gefolgt von getaggten Gruppen in alphabetischer Reihenfolge.
  – Die Tag-Gruppierung gilt automatisch für den Abschnitt „Codex/Copilot/Antigravity Limits“, da in den Verbindungszeilen Umschalter vorhanden sind.### 🐛 Bug Fixes

#### fix(ui): Proxy Management UI Stabilization

-**Fehlende Abzeichen auf Verbindungskarten:**Behoben durch die Verwendung von „resolveProxyForConnection()“ anstelle der statischen Zuordnung. -**Testverbindung im gespeicherten Modus deaktiviert:**Die Schaltfläche „Testen“ wurde durch Auflösen der Proxy-Konfiguration aus der gespeicherten Liste aktiviert. -**Modales Einfrieren der Konfiguration:**„onClose()“-Aufrufe nach dem Speichern/Löschen hinzugefügt, um ein Einfrieren der Benutzeroberfläche zu verhindern. -**Doppelte Nutzungszählung:**„ProxyRegistryManager“ lädt die Nutzung jetzt eifrig beim Mounten mit Deduplizierung durch „scope“ + „scopeId“. Nutzungszählungen wurden durch eine Testschaltfläche ersetzt, die IP/Latenz inline anzeigt.#### fix(translator): `function_call` prefix stripping

– Es wurde ein unvollständiger Fix von PR #607 repariert, bei dem nur „tool*use“-Blöcke Claudes „proxy*“-Tool-Präfix entfernten. Jetzt erhalten Clients, die das OpenAI Responses API-Format verwenden, auch korrekt Tool-Tools ohne das Präfix „proxy\_“.---

## [3.0.1] — 2026-03-25

### 🔧 Hotfix Patch — Critical Bug Fixes

Drei kritische Regressionen, die von Benutzern nach dem Start von v3.0.0 gemeldet wurden, wurden behoben.#### fix(translator): strip `proxy_` prefix in non-streaming Claude responses (#605)

Das von Claude OAuth hinzugefügte Präfix „proxy\_“ wurde nur aus**Streaming**-Antworten entfernt. Im**Nicht-Streaming**-Modus hatte „translateNonStreamingResponse“ keinen Zugriff auf die „toolNameMap“, was dazu führte, dass Clients entstellte Toolnamen wie „proxy_read_file“ anstelle von „read_file“ erhielten.

**Fix:**Optionaler Parameter „toolNameMap“ zu „translateNonStreamingResponse“ hinzugefügt und Präfixentfernung im Claude-Blockhandler „tool_use“ angewendet. „chatCore.ts“ leitet nun die Karte weiter.#### fix(validation): add LongCat specialty validator to skip /models probe (#592)

LongCat AI stellt „GET /v1/models“ nicht zur Verfügung. Der generische „validateOpenAICompatibleProvider“-Validator fiel nur dann auf einen Chat-Completions-Fallback durch, wenn „validationModelId“ festgelegt war, was LongCat nicht konfiguriert. Dies führte dazu, dass die Anbietervalidierung mit einem irreführenden Fehler beim Hinzufügen/Speichern fehlschlug.

**Fix:**„Longcat“ zur Karte der Spezialvalidatoren hinzugefügt, um „/chat/completions“ direkt zu prüfen und jede nicht authentifizierte Antwort als bestanden zu behandeln.#### fix(translator): normalize object tool schemas for Anthropic (#595)

MCP-Tools (z. B. „pencil“, „computer_use“) leiten Tooldefinitionen mit „{type:“object“}“ weiter, jedoch ohne ein „properties“-Feld. Die API von Anthropic lehnt diese mit „Objektschema fehlende Eigenschaften“ ab.

**Fix:**Fügen Sie in „openai-to-claude.ts“ „properties: {}“ als sicheren Standard ein, wenn „type“ „object“ ist und „properties“ fehlt.---

### 🔀 Community PRs Merged (2)

| PR       | Autor   | Zusammenfassung                                                                  |
| -------- | ------- | -------------------------------------------------------------------------------- | --- |
| **#589** | @flobo3 | docs(i18n): Korrigieren Sie die russische Übersetzung für Playground und Testbed |
| **#591** | @rdself | fix(ui): Provider Limits-Lichtmoduskontrast und Planstufenanzeige verbessern     | --- |

### ✅ Issues Resolved

„#592“ „#595“ „#605“.---

### 🧪 Tests

-**926 Tests, 0 Fehler**(unverändert gegenüber v3.0.0)---

## [3.0.0] — 2026-03-24

### 🎉 OmniRoute v3.0.0 — The Free AI Gateway, Now with 67+ Providers

> **Die größte Veröffentlichung aller Zeiten.**Von 36 Anbietern in Version 2.9.5 auf**67+ Anbieter**in Version 3.0.0 – mit MCP-Server, A2A-Protokoll, Auto-Combo-Engine, Anbietersymbolen, API für registrierte Schlüssel, 926 Tests und Beiträgen von**12 Community-Mitgliedern**in**10 zusammengeführten PRs**.
>
> Konsolidiert von v3.0.0-rc.1 bis rc.17 (17 Release-Kandidaten in 3 Tagen intensiver Entwicklung).---

### 🆕 New Providers (+31 since v2.9.5)

| Anbieter                           | Alias ​​        | Stufe          | Notizen                                                                                               |
| ---------------------------------- | --------------- | -------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **OpenCode Zen**                   | `opencode-zen`  | Kostenlos      | 3 Modelle über `opencode.ai/zen/v1` (PR #530 von @kang-heewon)                                        |
| **OpenCode Go**                    | `opencode-go`   | Bezahlt        | 4 Modelle über `opencode.ai/zen/go/v1` (PR #530 von @kang-heewon)                                     |
| **LongCat AI**                     | `lc`            | Kostenlos      | 50 Mio. Token/Tag (Flash-Lite) + 500.000/Tag (Chat/Thinking) während der öffentlichen Beta            |
| **Bestäubungs-KI**                 | `pol`           | Kostenlos      | Kein API-Schlüssel erforderlich – GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 Anforderung/15 Sek.) |
| **Cloudflare Workers AI**          | `cf`            | Kostenlos      | 10.000 Neuronen/Tag – ~150 LLM-Antworten oder 500 Sekunden Whisper-Audio, Kanteninferenz              |
| **Scaleway AI**                    | `scw`           | Kostenlos      | 1 Million kostenlose Token für neue Konten – EU/DSGVO-konform (Paris)                                 |
| **AI/ML-API**                      | `aiml`          | Kostenlos      | 0,025 $/Tag kostenloses Guthaben – 200+ Modelle über einen einzigen Endpunkt                          |
| **Computer-KI**                    | `pu`            | Kostenlos      | Über 500 Modelle (GPT-5, Claude Opus 4, Gemini 3 Pro, Grok 4, DeepSeek V3)                            |
| **Alibaba Cloud (DashScope)**      | `ali`           | Bezahlt        | Internationale + China-Endpunkte über `alicode`/`alicode-intl`                                        |
| **Alibaba-Codierungsplan**         | `bcp`           | Bezahlt        | Alibaba Model Studio mit Anthropic-kompatibler API                                                    |
| **Kimi-Codierung (API-Schlüssel)** | `kmca`          | Bezahlt        | Dedizierter Kimi-Zugriff auf API-Schlüsselbasis (getrennt von OAuth)                                  |
| **MiniMax-Codierung**              | `minimax`       | Bezahlt        | Internationaler Endpunkt                                                                              |
| **MiniMax (China)**                | `minimax-cn`    | Bezahlt        | China-spezifischer Endpunkt                                                                           |
| **Z.AI (GLM-5)**                   | `zai`           | Bezahlt        | Zhipu AI GLM-Modelle der nächsten Generation                                                          |
| **Vertex AI**                      | `Scheitelpunkt` | Bezahlt        | Google Cloud – Dienstkonto JSON oder OAuth access_token                                               |
| **Ollama-Wolke**                   | `ollamacloud`   | Bezahlt        | Ollamas gehosteter API-Dienst                                                                         |
| **Synthetisch**                    | „synthetisch“   | Bezahlt        | Gateway für Passthrough-Modelle                                                                       |
| **Kilo-Gateway**                   | `kg`            | Bezahlt        | Gateway für Passthrough-Modelle                                                                       |
| **Perplexitätssuche**              | `pplx-search`   | Bezahlt        | Dedizierter suchbasierter Endpunkt                                                                    |
| **Serper-Suche**                   | `serper-search` | Bezahlt        | Websuche-API-Integration                                                                              |
| **Mutige Suche**                   | `brave-search`  | Bezahlt        | Brave Search API-Integration                                                                          |
| **Exa-Suche**                      | `exa-suche`     | Bezahlt        | Integration der neuronalen Such-API                                                                   |
| **Tavily-Suche**                   | `tavily-search` | Bezahlt        | AI-Such-API-Integration                                                                               |
| **NanoBanane**                     | `nb`            | Bezahlt        | Bildgenerierungs-API                                                                                  |
| **ElevenLabs**                     | `el`            | Bezahlt        | Text-zu-Sprache-Sprachsynthese                                                                        |
| **Kartesia**                       | „Kartesie“      | Bezahlt        | Ultraschnelle TTS-Sprachsynthese                                                                      |
| **PlayHT**                         | `playht`        | Bezahlt        | Sprachklonen und TTS                                                                                  |
| **Inworld**                        | `inworld`       | Bezahlt        | KI-Charakter-Voice-Chat                                                                               |
| **SD-WebUI**                       | `sdwebui`       | Selbstgehostet | Lokale Bilderzeugung mit stabiler Diffusion                                                           |
| **ComfyUI**                        | `comfyui`       | Selbstgehostet | ComfyUI lokale Workflow-Knoten-basierte Generierung                                                   |
| **GLM-Codierung**                  | `glm`           | Bezahlt        | BigModel/Zhipu-codierungsspezifischer Endpunkt                                                        | **Gesamt: 67+ Anbieter**(4 kostenlos, 8 OAuth, 55 API-Schlüssel) + unbegrenzte OpenAI/Anthropic-kompatible benutzerdefinierte Anbieter.--- |

### ✨ Major Features

#### 🔑 Registered Keys Provisioning API (#464)

Automatische Generierung und Ausgabe von OmniRoute-API-Schlüsseln programmgesteuert mit Kontingentdurchsetzung pro Anbieter und pro Konto.

| Endpunkt                        | Methode      | Beschreibung                                                                       |
| ------------------------------- | ------------ | ---------------------------------------------------------------------------------- | ------ |
| `/api/v1/registered-keys`       | `POST`       | Geben Sie einen neuen Schlüssel aus – Rohschlüssel wird**nur einmal**zurückgegeben |
| `/api/v1/registered-keys`       | `GET`        | Registrierte Schlüssel auflisten (maskiert)                                        |
| `/api/v1/registered-keys/{id}`  | `GET/DELETE` | Metadaten abrufen / widerrufen                                                     |
| `/api/v1/quotas/check`          | `GET`        | Kontingent vor der Ausstellung vorab validieren                                    |
| `/api/v1/providers/{id}/limits` | `GET/PUT`    | Konfigurieren Sie die Ausgabelimits pro Anbieter                                   |
| `/api/v1/accounts/{id}/limits`  | `GET/PUT`    | Konfigurieren Sie die Ausgabelimits pro Konto                                      |
| `/api/v1/issues/report`         | `POST`       | Kontingentereignisse an GitHub Issues                                              | melden |

**Sicherheit:**Schlüssel werden als SHA-256-Hashes gespeichert. Der Rohschlüssel wird bei der Erstellung einmal angezeigt und ist nie wieder abrufbar.#### 🎨 Provider Icons via @lobehub/icons (#529)

Über 130 Anbieterlogos mit „@lobehub/icons“ React-Komponenten (SVG). Fallback-Kette:**Lobehub SVG → vorhandenes PNG → generisches Symbol**. Wird auf Dashboard-, Anbieter- und Agentenseiten mit der standardisierten „ProviderIcon“-Komponente angewendet.#### 🔄 Model Auto-Sync Scheduler (#488)

Aktualisiert die Modelllisten für verbundene Anbieter automatisch alle**24 Stunden**. Wird beim Serverstart ausgeführt. Konfigurierbar über „MODEL_SYNC_INTERVAL_HOURS“.#### 🔀 Per-Model Combo Routing (#563)

Ordnen Sie Modellnamensmuster (Glob) bestimmten Kombinationen für die automatische Weiterleitung zu:

- `claude-sonnet*` → Code-Combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo
- Neue „model_combo_mappings“-Tabelle mit Glob-zu-Regex-Abgleich
- Abschnitt der Dashboard-Benutzeroberfläche: „Modell-Routing-Regeln“ mit Inline-Hinzufügen/Bearbeiten/Umschalten/Löschen#### 🧭 API Endpoints Dashboard

Interaktiver Katalog, Webhooks-Verwaltung, OpenAPI-Viewer – alles auf einer Seite mit Registerkarten unter „/dashboard/endpoint“.#### 🔍 Web Search Providers

5 neue Suchanbieter-Integrationen:**Perplexity Search**,**Serper**,**Brave Search**,**Exa**,**Tavily**– ermöglichen fundierte KI-Antworten mit Echtzeit-Webdaten.#### 📊 Search Analytics

Neuer Tab in „/dashboard/analytics“ – Anbieteraufschlüsselung, Cache-Trefferquote, Kostenverfolgung. API: `GET /api/v1/search/analytics`.#### 🛡️ Per-API-Key Rate Limits (#452)

Spalten „max_requests_per_day“ und „max_requests_per_minute“ mit In-Memory-Slide-Window-Erzwingung, die HTTP 429 zurückgibt.#### 🎵 Media Playground

Vollständiger Spielplatz zur Mediengenerierung unter „/dashboard/media“: Bildgenerierung, Video, Musik, Audiotranskription (Upload-Limit 2 GB) und Text-to-Speech.---

### 🔒 Security & CI/CD

-**CodeQL-Remediation**– Über 10 Warnungen behoben: 6 Polynom-Wiederholungen, 1 unsichere Zufälligkeit (`Math.random()` → `crypto.randomUUID()`), 1 Shell-Befehlsinjektion -**Routenvalidierung**– Zod-Schemas + „validateBody()“ auf**176/176 API-Routen**– CI erzwungen
–**CVE-Fix**– dompurify XSS-Schwachstelle (GHSA-v2wj-7wpq-c8vv) über NPM-Überschreibungen behoben -**Abgeflacht**– Beulen 3.3.3 → 3.4.2 (CWE-1321-Prototypverschmutzung) -**Docker**– „docker/setup-buildx-action“ v3 → v4 aktualisiert---

### 🐛 Bug Fixes (40+)

#### OAuth & Auth

-**#537**– Gemini CLI OAuth: Umsetzbarer Fehler löschen, wenn „GEMINI_OAUTH_CLIENT_SECRET“ in Docker fehlt -**#549**– CLI-Einstellungsrouten lösen jetzt echten API-Schlüssel aus „keyId“ auf (keine maskierten Zeichenfolgen) -**#574**– Die Anmeldung friert nicht mehr ein, nachdem die Passworteinrichtung des Assistenten übersprungen wurde -**#506**– Plattformübergreifende „machineId“ neu geschrieben (Windows REG.exe → macOS ioreg → Linux → Hostname-Fallback)#### Providers & Routing

-**#536**– LongCat AI: „baseUrl“ und „authHeader“ korrigiert -**#535**– Überschreibung des angehefteten Modells: „body.model“ wurde korrekt auf „pinnedModel“ gesetzt -**#570**– Claude-Modelle ohne Präfix werden jetzt zum Anthropic-Anbieter aufgelöst -**#585**– Interne Tags „<omniModel>“ werden im SSE-Streaming nicht mehr an Clients weitergegeben -**#493**– Die Benennung benutzerdefinierter Anbietermodelle wird nicht mehr durch das Entfernen von Präfixen beeinträchtigt -**#490**– Streaming + Kontext-Cache-Schutz über „TransformStream“-Injection -**#511**– „<omniModel>“-Tag in den ersten Inhaltsblock eingefügt (nicht nach „[FERTIG]“)#### CLI & Tools

-**#527**– Claude Code + Codex-Schleife: „tool_result“-Blöcke werden jetzt in Text umgewandelt -**#524**– OpenCode-Konfiguration korrekt gespeichert (XDG_CONFIG_HOME, TOML-Format) -**#522**– API Manager: Die irreführende Schaltfläche „Maskierten Schlüssel kopieren“ wurde entfernt -**#546**– „--version“ gibt unter Windows „unbekannt“ zurück (PR von @k0valik) -**#544**– Sichere CLI-Tool-Erkennung über bekannte Installationspfade (PR von @k0valik) -**#510**– Windows MSYS2/Git-Bash-Pfade werden automatisch normalisiert -**#492**– CLI erkennt einen von „mise“/„nvm“ verwalteten Knoten, wenn „app/server.js“ fehlt#### Streaming & SSE

-**PR #587**– „resolveDataDir“-Import in ResponsesTransformer für Cloudflare Workers-Kompatibilität zurücksetzen (@k0valik)
–**PR #495**– Engpass 429, unendliches Warten: Wartende Jobs bei Ratenbegrenzung abbrechen (@xandr0s) -**#483**– Schluss mit „data: null“ nach dem „[DONE]“-Signal -**#473**– Zombie-SSE-Streams: Timeout auf 300 → 120 Sekunden reduziert, um einen schnelleren Fallback zu ermöglichen#### Media & Transcription

-**Transkription**– Deepgram „video/mp4“ → „audio/mp4“ MIME-Zuordnung, automatische Spracherkennung, Zeichensetzung -**TTS**– Fehleranzeige „[object Object]“ für verschachtelte Fehler im ElevenLabs-Stil behoben -**Upload-Limits**– Medientranskription auf 2 GB erhöht (nginx „client_max_body_size 2g“ + „maxDuration=300“)---

### 🔧 Infrastructure & Improvements

#### Sub2api Gap Analysis (T01–T15 + T23–T42)

-**T01**– Spalte „requested_model“ in Anrufprotokollen (Migration 009) -**T02**– Leere Textblöcke aus verschachtelten „tool_result.content“ entfernen -**T03**– Kontingent-Header „x-codex-5h-_“ / „x-codex-7d-_“ analysieren -**T04**– „X-Session-Id“-Header für externes Sticky-Routing -**T05**– Ratenbegrenzte DB-Persistenz mit dedizierter API -**T06**– Konto deaktiviert → permanente Sperre (1 Jahr Abklingzeit) -**T07**– X-Forwarded-For IP-Validierung (`extractClientIp()`) -**T08**– Sitzungslimits pro API-Schlüssel mit Sliding-Window-Erzwingung -**T09**– Codex vs. Spark-Ratenbegrenzungsbereiche (separate Pools) -**T10**– Credits erschöpft → deutlicher 1-stündiger Abklingzeit-Fallback -**T11**– „maximaler“ Argumentationsaufwand → 131072 Budget-Tokens -**T12**– Preisangaben für MiniMax M2.7 -**T13**– Fehlerbehebung bei der Anzeige veralteter Kontingente (Fenstererkennung zurücksetzen) -**T14**– Proxy-Fast-Fail-TCP-Prüfung (≤2 s, zwischengespeichert 30 s) -**T15**– Array-Inhaltsnormalisierung für Anthropic -**T23**– Intelligenter Quoten-Reset-Fallback (Header-Extraktion) -**T24**– Abklingzeit „503“ + Zuordnung „406“. -**T25**– Anbietervalidierungs-Fallback -**T29**– JWT-Authentifizierung des Vertex AI-Dienstkontos -**T33**– Umrechnung von Denkebene in Budget -**T36**– Fehlerklassifizierung „403“ vs. „429“. -**T38**– Zentralisierte Modellspezifikationen („modelSpecs.ts“) -**T39**– Endpunkt-Fallback für „fetchAvailableModels“. -**T41**– Automatische Umleitung von Hintergrundaufgaben auf Flash-Modelle -**T42**– Zuordnung des Seitenverhältnisses zur Bildgenerierung#### Other Improvements

-**Benutzerdefinierte Upstream-Header pro Modell**– über die Konfigurations-Benutzeroberfläche (PR #575 von @zhangqiang8vip) -**Modellkontextlänge**– konfigurierbar in Modellmetadaten (PR #578 von @hijak)
–**Entfernen des Modellpräfixes**– Option zum Entfernen des Anbieterpräfixes aus Modellnamen (PR #582 von @jay77721)
–**Gemini-CLI-Veraltung**– als veraltet markiert, mit Google-OAuth-Einschränkungswarnung -**YAML-Parser**– benutzerdefinierter Parser durch „js-yaml“ für korrektes Parsen der OpenAPI-Spezifikation ersetzt -**ZWS v5**– HMR-Leck-Fix (485 DB-Verbindungen → 1, Speicher 2,4 GB → 195 MB) -**Protokollexport**– Neue JSON-Exportschaltfläche im Dashboard mit Dropdown-Liste für den Zeitraum -**Update-Benachrichtigungsbanner**– Auf der Dashboard-Startseite wird angezeigt, wenn neue Versionen verfügbar sind---

### 🌐 i18n & Documentation

-**30 Sprachen**bei 100 % Parität – 2.788 fehlende Schlüssel synchronisiert -**Tschechisch**– Vollständige Übersetzung: 22 Dokumente, 2.606 UI-Strings (PR von @zen0bit) -**Chinesisch (zh-CN)**– Vollständige Neuübersetzung (PR von @only4copilot) -**VM-Bereitstellungshandbuch**– Als Quelldokument ins Englische übersetzt -**API-Referenz**– Endpunkte „/v1/embeddings“ und „/v1/audio/speech“ hinzugefügt -**Anzahl der Anbieter**– Aktualisiert von 36+/40+/44+ auf**67+**in der gesamten README-Datei und allen 30 i18n-READMEs---

### 🔀 Community PRs Merged (10)

| PR       | Autor           | Zusammenfassung                                                                    |
| -------- | --------------- | ---------------------------------------------------------------------------------- |
| **#587** | @k0valik        | fix(sse): ResolveDataDir-Import für Cloudflare Workers-Kompatibilität zurücksetzen |
| **#582** | @jay77721       | feat(proxy): Option zum Entfernen des Modellnamenpräfixes                          |
| **#581** | @jay77721       | fix(npm): Elektronenfreigabe mit npm-publish-Workflow verknüpfen                   |
| **#578** | @hijak          | feat: konfigurierbare Kontextlänge in Modellmetadaten                              |
| **#575** | @zhangqiang8vip | feat: Upstream-Header pro Modell, kompatibler PATCH, Chat-Ausrichtung              |
| **#562** | @coobabm        | Fix: MCP-Sitzungsverwaltung, Claude-Passthrough, discoverFormat                    |
| **#561** | @zen0bit        | fix(i18n): Korrekturen der tschechischen Übersetzung                               |
| **#555** | @k0valik        | fix(sse): zentralisiertes „resolveDataDir()“ für die Pfadauflösung                 |
| **#546** | @k0valik        | fix(cli): „--version“ gibt unter Windows „unbekannt“ zurück                        |
| **#544** | @k0valik        | fix(cli): sichere CLI-Tool-Erkennung über Installationspfade                       |
| **#542** | @rdself         | fix(ui): CSS-Designvariablen für den Kontrast im Lichtmodus                        |
| **#530** | @kang-heewon    | feat: OpenCode Zen + Go-Anbieter mit „OpencodeExecutor“                            |
| **#512** | @zhangqiang8vip | feat: Pro-Protokoll-Modellkompatibilität (`compatByProtocol`)                      |
| **#497** | @zhangqiang8vip | Fix: HMR-Ressourcenlecks im Entwicklungsmodus (ZWS v5)                             |
| **#495** | @xandr0s        | Fix: Engpass 429 unendliches Warten (wartende Jobs löschen)                        |
| **#494** | @zhangqiang8vip | feat: MiniMax-Entwickler→Systemrollenkorrektur                                     |
| **#480** | @prakersh       | Fix: Extraktion der Stream-Flush-Nutzung                                           |
| **#479** | @prakersh       | feat: Codex 5.3/5.4 und Anthropic-Preiseinträge                                    |
| **#475** | @only4copilot   | feat(i18n): verbesserte chinesische Übersetzung                                    |

**Vielen Dank an alle Mitwirkenden!**🙏---

### 📋 Issues Resolved (50+)

`#452` `#458` `#462` `#464` `#466` `#473` `#474` `#481` `#483` `#487` `#488` `#489` `#490` `#491` `#492` `#493` `#506` `#508` `#509` `#510` `#511` `#513` `#520` `#521` `#522` `#524` `#525` `#527` `#529` `#531` `#532` `#535` `#536` `#537` `#541` `#546` `#549` `#563` `#570` `#574` `#585`---

### 🧪 Tests

-**926 Tests, 0 Fehler**(von 821 in Version 2.9.5)

- +105 neue Tests, die Folgendes abdecken: Modell-Kombinationszuordnungen, registrierte Schlüssel, OpencodeExecutor, Bailian-Anbieter, Routenvalidierung, Fehlerklassifizierung, Seitenverhältniszuordnung und mehr---

### 📦 Database Migrations

| Migration | Beschreibung                                                            |
| --------- | ----------------------------------------------------------------------- | --- |
| **008**   | Tabellen „registered_keys“, „provider_key_limits“, „account_key_limits“ |
| **009**   | Spalte „requested_model“ in „call_logs“                                 |
| **010**   | „model_combo_mappings“-Tabelle für modellspezifisches Combo-Routing     | --- |

### ⬆️ Upgrading from v2.9.5

```bash
# npm
npm install -g omniroute@3.0.0

# Docker
docker pull diegosouzapw/omniroute:3.0.0

# Migrations run automatically on first startup
```

> **Wichtige Änderungen:**Keine. Alle vorhandenen Konfigurationen, Kombinationen und API-Schlüssel bleiben erhalten.
> Datenbankmigrationen 008-010 werden beim Start automatisch ausgeführt.---

## [3.0.0-rc.17] — 2026-03-24

### 🔒 Security & CI/CD

-**CodeQL-Korrektur**– Über 10 Warnungen behoben:

- 6 Polynom-Redos in „provider.ts“ / „chatCore.ts“ (alternierende Muster „(?:^|/)“ durch segmentbasiertes Matching ersetzt)
- 1 unsichere Zufälligkeit in `acp/manager.ts` (`Math.random()` → `crypto.randomUUID()`)
- 1 Shell-Befehlsinjektion in „prepublish.mjs“ (Pfad-Escape von „JSON.stringify()“) -**Routenvalidierung**– Zod-Schemas + „validateBody()“ zu 5 Routen ohne Validierung hinzugefügt:
- „model-combo-mappings“ (POST, PUT), „webhooks“ (POST, PUT), „openapi/try“ (POST)
- CI „check:route-validation:t06“ besteht jetzt Folgendes:**176/176 Routen validiert**### 🐛 Bug Fixes

-**#585**– Interne Tags „<omniModel>“ werden in SSE-Antworten nicht mehr an Clients weitergegeben. Ausgehende Bereinigung „TransformStream“ in „combo.ts“ hinzugefügt### ⚙️ Infrastructure

-**Docker**– „docker/setup-buildx-action“ von v3 → v4 aktualisiert (Node.js 20-Veraltungskorrektur) -**CI-Bereinigung**– Über 150 fehlgeschlagene/abgebrochene Workflow-Ausführungen wurden gelöscht### 🧪 Tests

- Testsuite:**926 Tests, 0 Fehler**(+3 neu)---

## [3.0.0-rc.16] — 2026-03-24

### ✨ New Features

- Erhöhte Medientranskriptionslimits
  – Modellkontextlänge zu Registrierungsmetadaten hinzugefügt
  – Über die Konfigurations-Benutzeroberfläche wurden benutzerdefinierte Upstream-Header pro Modell hinzugefügt
- Mehrere Fehler behoben, Zod-Validierung für Patches durchgeführt und verschiedene Community-Probleme behoben.## [3.0.0-rc.15] — 2026-03-24

### ✨ New Features

-**#563**– Combo-Routing pro Modell: Ordnen Sie Modellnamensmuster (Glob) bestimmten Combos für automatisches Routing zu
– Neue Tabelle „model_combo_mappings“ (Migration 010) mit Muster, Combo_ID, Priorität, aktiviert

- „resolveComboForModel()“ DB-Funktion mit Glob-zu-Regex-Abgleich (Groß-/Kleinschreibung wird nicht beachtet, „\*“- und „?“-Platzhalter)
- „getComboForModel()“ in „model.ts“: erweitert „getCombo()“ um einen Modellmuster-Fallback
- „chat.ts“: Die Routing-Entscheidung prüft jetzt Modell-Kombinationszuordnungen vor der Verarbeitung einzelner Modelle
- API: „GET/POST /api/model-combo-mappings“, „GET/PUT/DELETE /api/model-combo-mappings/:id“.
- Dashboard: Abschnitt „Modell-Routing-Regeln“ zur Combos-Seite mit Inline-Hinzufügen/Bearbeiten/Umschalten/Löschen hinzugefügt
- Beispiele: `claude-sonnet*` → code-combo, `gpt-4o*` → openai-combo, `gemini-*` → google-combo### 🌐 i18n

-**Vollständige i18n-Synchronisierung**: 2.788 fehlende Schlüssel in 30 Sprachdateien hinzugefügt – alle Sprachen jetzt bei 100 % Parität mit „en.json“. -**Agentenseite i18n**: Abschnitt „OpenCode-Integration“ vollständig internationalisiert (Titel, Beschreibung, Scannen, Download-Labels) -**6 neue Schlüssel**zum Namespace „agents“ für den OpenCode-Abschnitt hinzugefügt### 🎨 UI/UX

-**Anbietersymbole**: 16 fehlende Anbietersymbole hinzugefügt (3 kopiert, 2 heruntergeladen, 11 SVG erstellt) -**SVG-Fallback**: „ProviderIcon“-Komponente mit 4-Stufen-Strategie aktualisiert: Lobehub → PNG → SVG → Generisches Symbol -**Fingerabdrücke von Agenten**: Synchronisiert mit CLI-Tools – Droid, Openclaw, Copilot, Opencode zur Fingerabdruckliste hinzugefügt (insgesamt 14)### Sicherheit

-**CVE-Fix**: Die dompurify XSS-Schwachstelle (GHSA-v2wj-7wpq-c8vv) über npm-Überschreibungen, die „dompurify@^3.3.2“ erzwingen, wurde behoben

- „npm audit“ meldet jetzt**0 Schwachstellen**### 🧪 Tests

- Testsuite:**923 Tests, 0 Fehler**(+15 neue Modell-Combo-Mapping-Tests)---

## [3.0.0-rc.14] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Autor    | Zusammenfassung                                                                                              |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------ | ------------ |
| **#562** | @coobabm | fix(ux): MCP-Sitzungsverwaltung, Claude-Passthrough-Normalisierung, OAuth-Modal, discoverFormat              |
| **#561** | @zen0bit | fix(i18n): Korrekturen der tschechischen Übersetzung – HTTP-Methodennamen und Dokumentationsaktualisierungen | ### 🧪 Tests |

- Testsuite:**908 Tests, 0 Fehler**---

## [3.0.0-rc.13] — 2026-03-23

### 🔧 Bug Fixes

-**config:**echten API-Schlüssel aus „keyId“ in CLI-Einstellungsrouten („codex-settings“, „droid-settings“, „kilo-settings“) auflösen, um das Schreiben maskierter Zeichenfolgen zu verhindern (#549)---

## [3.0.0-rc.12] — 2026-03-23

### 🔀 Community PRs Merged

| PR       | Autor    | Zusammenfassung                                                                                                                                                                           |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **#546** | @k0valik | fix(cli): „--version“ gibt „unknown“ unter Windows zurück – verwenden Sie „JSON.parse(readFileSync)“ anstelle von ESM import                                                              |
| **#555** | @k0valik | fix(sse): zentralisiertes „resolveDataDir()“ für die Pfadauflösung in Anmeldeinformationen, AutoCombo, Antwort-Logger und Anforderungs-Logger                                             |
| **#544** | @k0valik | fix(cli): sichere CLI-Tool-Erkennung über bekannte Installationspfade (8 Tools) mit Symlink-Validierung, Dateitypprüfungen, Größenbeschränkungen, minimaler Umgebung im Healthcheck       |
| **#542** | @rdself  | fix(ui): Kontrast im Hellmodus verbessern – fehlende CSS-Designvariablen („bg-primary“, „bg-subtle“, „text-primary“) hinzufügen und nur dunkle Farben in den Protokolldetails korrigieren | ### 🔧 Bug Fixes |

-**TDZ-Korrektur in „cliRuntime.ts“**– „validateEnvPath“ wurde vor der Initialisierung beim Modulstart durch „getExpectedParentPaths()“ verwendet. Neugeordnete Deklarationen, um „ReferenceError“ zu beheben. -**Build-Korrekturen**– „Pino“ und „Pino-pretty“ zu „serverExternalPackages“ hinzugefügt, um zu verhindern, dass Turbopack Pinos internes Worker-Laden unterbricht.### 🧪 Tests

- Testsuite:**905 Tests, 0 Fehler**---

## [3.0.0-rc.10] — 2026-03-23

### 🔧 Bug Fixes

-**#509 / #508**– Electron-Build-Regression: Next.js wurde von „16.1.x“ auf „16.0.10“ heruntergestuft, um die Instabilität des Turbopack-Modul-Hashings zu beseitigen, die zu leeren Bildschirmen im Electron-Desktop-Bundle führte. -**Unit-Test-Korrekturen**– Zwei veraltete Testaussagen („Nanobanana-Image-Handler“-Seitenverhältnis/-Auflösung, „Thinking-Budget“-Gemini-Feldzuordnung „ThinkingConfig“), die nach kürzlichen Implementierungsänderungen abgedriftet waren, wurden korrigiert. -**#541**– Auf Benutzerfeedback zur Installationskomplexität reagiert; Keine Codeänderungen erforderlich.---

## [3.0.0-rc.9] — 2026-03-23

### ✨ New Features

-**T29**– Vertex AI SA JSON Executor: implementiert unter Verwendung der „jose“-Bibliothek zur Verwaltung der JWT-/Dienstkonto-Authentifizierung, zusammen mit konfigurierbaren Regionen in der Benutzeroberfläche und automatischer Partnermodell-URL-Erstellung. -**T42**– Bildgenerierungs-Seitenverhältniszuordnung: „sizeMapper“-Logik für generische OpenAI-Formate („Größe“) erstellt, native „imagen3“-Verarbeitung hinzugefügt und NanoBanana-Endpunkte aktualisiert, um zugeordnete Seitenverhältnisse automatisch zu verwenden. -**T38**– Zentralisierte Modellspezifikationen: „modelSpecs.ts“ wurde für Grenzwerte und Parameter pro Modell erstellt.### 🔧 Improvements

-**T40**– Integration der OpenCode CLI-Tools: native „Opencode-zen“- und „Opencode-go“-Integration in früherer PR abgeschlossen.---

## [3.0.0-rc.8] — 2026-03-23

### 🔧 Bug Fixes & Improvements (Fallback, Quota & Budget)

-**T24**– „503“-Abklingzeit wartet auf Korrektur + „406“-Zuordnung: „406 nicht akzeptabel“ wurde auf „503-Dienst nicht verfügbar“ mit korrekten Abklingzeitintervallen abgebildet. -**T25**– Anbietervalidierungs-Fallback: eleganter Fallback auf Standardvalidierungsmodelle, wenn eine bestimmte „validationModelId“ nicht vorhanden ist. -**T36**– Verfeinerung der Anbieterhandhabung „403“ vs. „429“: Extrahiert in „errorClassifier.ts“, um harte Berechtigungsfehler („403“) ordnungsgemäß von Ratenbegrenzungen („429“) zu trennen. -**T39**– Endpoint-Fallback für „fetchAvailableModels“: Implementierung eines dreistufigen Mechanismus („/models“ -> „/v1/models“ -> lokaler generischer Katalog) + „list_models_catalog“ MCP-Tool-Updates, um „Quelle“ und „Warnung“ widerzuspiegeln. -**T33**– Umrechnung von Denkebene in Budget: Übersetzt qualitative Denkebenen in präzise Budgetzuweisungen. -**T41**– Automatische Umleitung von Hintergrundaufgaben: Leitet umfangreiche Hintergrundauswertungsaufgaben automatisch an Flash-/effiziente Modelle weiter. -**T23**– Intelligenter Quoten-Reset-Fallback: Extrahiert präzise „x-ratelimit-reset“-/„retry-after“-Header-Werte oder ordnet statische Abklingzeiten zu.---

## [3.0.0-rc.7] — 2026-03-23 _(What's New vs v2.9.5 — will be released as v3.0.0)_

> **Upgrade von v2.9.5:**16 Probleme behoben · 2 Community-PRs zusammengeführt · 2 neue Anbieter · 7 neue API-Endpunkte · 3 neue Funktionen · DB-Migration 008+009 · 832 Tests bestanden · 15 Sub2API-Lückenverbesserungen (T01–T15 abgeschlossen).### 🆕 New Providers

| Anbieter         | Alias ​​       | Stufe     | Notizen                                                           |
| ---------------- | -------------- | --------- | ----------------------------------------------------------------- |
| **OpenCode Zen** | `opencode-zen` | Kostenlos | 3 Modelle über `opencode.ai/zen/v1` (PR #530 von @kang-heewon)    |
| **OpenCode Go**  | `opencode-go`  | Bezahlt   | 4 Modelle über `opencode.ai/zen/go/v1` (PR #530 von @kang-heewon) |

Beide Anbieter nutzen den neuen „OpencodeExecutor“ mit Multiformat-Routing („/chat/completions“, „/messages“, „/responses“, „/models/{model}:generateContent“).---

### ✨ New Features

#### 🔑 Registered Keys Provisioning API (#464)

Automatische Generierung und Ausgabe von OmniRoute-API-Schlüsseln programmgesteuert mit Kontingentdurchsetzung pro Anbieter und pro Konto.

| Endpunkt                              | Methode   | Beschreibung                                                                       |
| ------------------------------------- | --------- | ---------------------------------------------------------------------------------- | ------ |
| `/api/v1/registered-keys`             | `POST`    | Geben Sie einen neuen Schlüssel aus – Rohschlüssel wird**nur einmal**zurückgegeben |
| `/api/v1/registered-keys`             | `GET`     | Registrierte Schlüssel auflisten (maskiert)                                        |
| `/api/v1/registered-keys/{id}`        | `GET`     | Schlüsselmetadaten abrufen                                                         |
| `/api/v1/registered-keys/{id}`        | „LÖSCHEN“ | Einen Schlüssel widerrufen                                                         |
| `/api/v1/registered-keys/{id}/revoke` | `POST`    | Widerrufen (für Clients ohne DELETE-Unterstützung)                                 |
| `/api/v1/quotas/check`                | `GET`     | Kontingent vor der Ausstellung vorab validieren                                    |
| `/api/v1/providers/{id}/limits`       | `GET/PUT` | Konfigurieren Sie die Ausgabelimits pro Anbieter                                   |
| `/api/v1/accounts/{id}/limits`        | `GET/PUT` | Konfigurieren Sie die Ausgabelimits pro Konto                                      |
| `/api/v1/issues/report`               | `POST`    | Kontingentereignisse an GitHub Issues                                              | melden |

**DB – Migration 008:**Drei neue Tabellen: „registered_keys“, „provider_key_limits“, „account_key_limits“.
**Sicherheit:**Schlüssel werden als SHA-256-Hashes gespeichert. Der Rohschlüssel wird bei der Erstellung einmal angezeigt und ist nie wieder abrufbar.
**Kontingenttypen:**„maxActiveKeys“, „dailyIssueLimit“, „hourlyIssueLimit“ pro Anbieter und pro Konto.
**Idempotency:**Das Feld „idempotency_key“ verhindert die doppelte Ausgabe. Gibt „409 IDEMPOTENCY_CONFLICT“ zurück, wenn der Schlüssel bereits verwendet wurde.
**Budget pro Schlüssel:**„dailyBudget“ / „hourlyBudget“ – begrenzt, wie viele Anfragen ein Schlüssel pro Fenster weiterleiten kann.
**GitHub-Berichterstellung:**Optional. Legen Sie „GITHUB_ISSUES_REPO“ + „GITHUB_ISSUES_TOKEN“ fest, um bei Kontingentüberschreitung oder Ausgabefehlern automatisch GitHub-Probleme zu erstellen.#### 🎨 Provider Icons — @lobehub/icons (#529)

Alle Anbietersymbole im Dashboard verwenden jetzt „@lobehub/icons“ React-Komponenten (über 130 Anbieter mit SVG).
Fallback-Kette:**Lobehub SVG → vorhandenes „/providers/{id}.png“ → generisches Symbol**. Verwendet ein geeignetes React-„ErrorBoundary“-Muster.#### 🔄 Model Auto-Sync Scheduler (#488)

OmniRoute aktualisiert jetzt automatisch alle**24 Stunden**die Modelllisten für verbundene Anbieter.

– Wird beim Serverstart über den vorhandenen Hook „/api/sync/initialize“ ausgeführt

- Konfigurierbar über die Umgebungsvariable „MODEL_SYNC_INTERVAL_HOURS“.
- Deckt 16 große Anbieter ab
- Zeichnet die letzte Synchronisierungszeit in der Einstellungsdatenbank auf---

### 🔧 Bug Fixes

#### OAuth & Auth

-**#537 – Gemini CLI OAuth:**Umsetzbarer Fehler löschen, wenn „GEMINI_OAUTH_CLIENT_SECRET“ in Docker-/selbstgehosteten Bereitstellungen fehlt. Zuvor wurde bei Google der kryptische Hinweis „client_secret fehlt“ angezeigt. Bietet jetzt spezifische Anweisungen für „docker-compose.yml“ und „~/.omniroute/.env“.#### Providers & Routing

-**#536 – LongCat AI:**`baseUrl` (`api.longcat.chat/openai`) und `authHeader` (`Authorization: Bearer`) korrigiert. -**#535 – Überschreibung des angehefteten Modells:**„body.model“ ist jetzt korrekt auf „pinnedModel“ gesetzt, wenn der Kontext-Cache-Schutz aktiv ist. -**#532 – OpenCode Go-Schlüsselvalidierung:**Verwendet jetzt den „zen/v1“-Testendpunkt („testKeyBaseUrl“) – der gleiche Schlüssel funktioniert für beide Ebenen.#### CLI & Tools

-**#527 – Claude Code + Codex-Schleife:**„tool_result“-Blöcke werden jetzt in Text konvertiert statt gelöscht, wodurch endlose Tool-Ergebnisschleifen gestoppt werden. -**#524 – OpenCode-Konfiguration speichern:**`saveOpenCodeConfig()`-Handler hinzugefügt (XDG_CONFIG_HOME-fähig, schreibt TOML). -**#521 – Anmeldung bleibt hängen:**Die Anmeldung friert nicht mehr ein, nachdem die Passworteinrichtung übersprungen wurde – leitet korrekt zum Onboarding weiter. -**#522 – API Manager:**Die irreführende Schaltfläche „Maskierten Schlüssel kopieren“ wurde entfernt (ersetzt durch einen Tooltip mit einem Schlosssymbol). -**#532 – OpenCode Go-Konfiguration:**Der Guide-Einstellungshandler verarbeitet jetzt die „Opencode“-ToolId.#### Developer Experience

-**#489 – Antigravity:**Das Fehlen von „googleProjectId“ gibt einen strukturierten 422-Fehler mit Anleitung zum erneuten Verbinden anstelle eines kryptischen Absturzes zurück. -**#510 – Windows-Pfade:**MSYS2/Git-Bash-Pfade („/c/Program Files/...“) werden jetzt automatisch auf „C:\Program Files\...“ normalisiert. -**#492 – CLI-Start:**Die „omniroute“-CLI erkennt jetzt den von „mise“/„nvm“ verwalteten Knoten, wenn „app/server.js“ fehlt, und zeigt gezielte Korrekturanweisungen an.---

### 📖 Documentation Updates

-**#513**– Zurücksetzen des Docker-Passworts: „INITIAL_PASSWORD“ env var Workaround dokumentiert -**#520**– pnpm: Schritt „pnpm genehmigt-builds-besser-sqlite3“ dokumentiert---

### ✅ Issues Resolved in v3.0.0

`#464` `#488` `#489` `#492` `#510` `#513` `#520` `#521` `#522` `#524` `#527` `#529` `#532` `#535` `#536` `#537`---

### 🔀 Community PRs Merged

| PR       | Autor        | Zusammenfassung                                                          |
| -------- | ------------ | ------------------------------------------------------------------------ | --- |
| **#530** | @kang-heewon | OpenCode Zen + Go-Anbieter mit „OpencodeExecutor“ und verbesserten Tests | --- |

## [3.0.0-rc.7] - 2026-03-23

### 🔧 Improvements (sub2api Gap Analysis — T05, T08, T09, T13, T14)

-**T05**– Ratenlimit-DB-Persistenz: „setConnectionRateLimitUntil()“, „isConnectionRateLimited()“, „getRateLimitedConnections()“ in „providers.ts“. Die vorhandene Spalte „rate_limited_until“ wird jetzt als dedizierte API bereitgestellt – die Aktualisierung des OAuth-Tokens darf dieses Feld NICHT berühren, um Ratenbegrenzungsschleifen zu verhindern. -**T08**– Sitzungslimit pro API-Schlüssel: „max_sessions INTEGER DEFAULT 0“ wurde über automatische Migration zu „api_keys“ hinzugefügt. „sessionManager.ts“ erhält „registerKeySession()“, „unregisterKeySession()“, „checkSessionLimit()“ und „getActiveSessionCountForKey()“. Aufrufer in „chatCore.js“ können das Limit erzwingen und bei „req.close“ verringern. -**T09**– Codex vs. Spark-Ratenbegrenzungsbereiche: „getCodexModelScope()“ und „getCodexRateLimitKey()“ in „codex.ts“. Standardmodelle („gpt-5.x-codex“, „codex-mini“) erhalten den Gültigkeitsbereich „codex“; Spark-Modelle („codex-spark\*“) erhalten den Gültigkeitsbereich „spark“. Ratenbegrenzungsschlüssel sollten „${accountId}:${scope}“ lauten, damit die Erschöpfung eines Pools nicht den anderen blockiert. -**T13**– Fehlerbehebung bei der Anzeige veralteter Kontingente: „getEffectiveQuotaUsage(used, resetAt)“ gibt „0“ zurück, wenn das Rücksetzfenster verstrichen ist; „formatResetCountdown(resetAt)“ gibt eine für Menschen lesbare Countdown-Zeichenfolge zurück (z. B. „2h 35m“). Beide wurden aus „providers.ts“ + „localDb.ts“ für die Dashboard-Nutzung exportiert. -**T14**– Proxy-Fast-Fail: neues „src/lib/proxyHealth.ts“ mit „isProxyReachable(proxyUrl, timeoutMs=2000)“ (TCP-Prüfung, ≤2s statt 30s Timeout), „getCachedProxyHealth()“, „invalidateProxyHealth()“ und „getAllProxyHealthStatuses()“. Ergebnisse werden standardmäßig 30 Sekunden lang zwischengespeichert; konfigurierbar über „PROXY_FAST_FAIL_TIMEOUT_MS“ / „PROXY_HEALTH_CACHE_TTL_MS“.### 🧪 Tests

- Testsuite:**832 Tests, 0 Fehler**---

## [3.0.0-rc.6] - 2026-03-23

### 🔧 Bug Fixes & Improvements (sub2api Gap Analysis — T01–T15)

-**T01**– Spalte „requested_model“ in „call_logs“ (Migration 009): Verfolgen Sie, welches Modell der Client ursprünglich angefordert hat, im Vergleich zum tatsächlich gerouteten Modell. Ermöglicht die Analyse der Fallback-Rate. -**T02**– Leere Textblöcke aus verschachtelten „tool_result.content“ entfernen: verhindert Anthropic 400-Fehler („Textinhaltsblöcke dürfen nicht leer sein“), wenn Claude Code Toolergebnisse verkettet. -**T03**– „x-codex-5h-_“ / „x-codex-7d-_“-Header analysieren: „parseCodexQuotaHeaders()“ + „getCodexResetTime()“ extrahieren Codex-Kontingentfenster für eine präzise Abklingzeitplanung anstelle eines generischen 5-Minuten-Fallbacks. -**T04**– „X-Session-Id“-Header für externes Sticky-Routing: „extractExternalSessionId()“ in „sessionManager.ts“ liest „x-session-id“-/„x-omniroute-session“-Header mit „ext:“-Präfix, um Kollisionen mit internen SHA-256-Sitzungs-IDs zu vermeiden. Nginx-kompatibel (Kopfzeile mit Bindestrich). -**T06**– Konto deaktiviert → dauerhafte Sperre: „isAccountDeactivated()“ in „accountFallback.ts“ erkennt 401-Deaktivierungssignale und wendet eine Abklingzeit von einem Jahr an, um zu verhindern, dass dauerhaft deaktivierte Konten erneut versucht werden. -**T07**– X-Forwarded-For IP-Validierung: neues „src/lib/ipUtils.ts“ mit „extractClientIp()“ und „getClientIpFromRequest()“ – überspringt „unbekannte“/Nicht-IP-Einträge in „X-Forwarded-For“-Ketten (über Nginx/Proxy weitergeleitete Anfragen). -**T10**– Credits erschöpft → deutlicher Fallback: „isCreditsExhausted()“ in „accountFallback.ts“ gibt 1 Stunde Abklingzeit mit „creditsExhausted“-Flag zurück, anders als die generische 429-Ratenbegrenzung. -**T11**– „maximaler“ Argumentationsaufwand → 131072 Budget-Tokens: „EFFORT_BUDGETS“ und „THINKING_LEVEL_MAP“ aktualisiert; Die umgekehrte Zuordnung gibt jetzt „max“ für Antworten mit vollem Budget zurück. Unit-Test aktualisiert. -**T12**– Preiseinträge für MiniMax M2.7 hinzugefügt: „minimax-m2.7“, „MiniMax-M2.7“, „minimax-m2.7-highspeed“ zur Preistabelle hinzugefügt (sub2api PR #1120). Die Preise für M2.5/GLM-4.7/GLM-5/Kimi waren bereits vorhanden. -**T15**– Array-Inhaltsnormalisierung: Der Helfer „normalizeContentToString()“ in „openai-to-claude.ts“ fasst Array-formatierte System-/Tool-Nachrichten korrekt zu einem String zusammen, bevor er an Anthropic gesendet wird.### 🧪 Tests

- Testsuite:**832 Tests, 0 Fehler**(unverändert gegenüber rc.5)---

## [3.0.0-rc.5] - 2026-03-22

### ✨ New Features

-**#464**– API zur Bereitstellung registrierter Schlüssel: Automatische Ausgabe von API-Schlüsseln mit Kontingentdurchsetzung pro Anbieter und pro Konto

- „POST /api/v1/registered-keys“ – Schlüssel mit Idempotenzunterstützung ausgeben
- „GET /api/v1/registered-keys“ – (maskierte) registrierte Schlüssel auflisten
- „GET /api/v1/registered-keys/{id}“ – Schlüsselmetadaten abrufen
- „DELETE /api/v1/registered-keys/{id}“ / „POST ../{id}/revoke“ – Schlüssel widerrufen
- „GET /api/v1/quotas/check“ – vor der Ausgabe vorab validieren
- „PUT /api/v1/providers/{id}/limits“ – Provider-Ausgabelimits festlegen
- „PUT /api/v1/accounts/{id}/limits“ – Kontoausstellungslimits festlegen
- „POST /api/v1/issues/report“ – optionale GitHub-Problemberichterstattung
- DB-Migration 008: Tabellen „registered_keys“, „provider_key_limits“, „account_key_limits“.---

## [3.0.0-rc.4] - 2026-03-22

### ✨ New Features

-**#530 (PR)**– OpenCode Zen- und OpenCode Go-Anbieter hinzugefügt (von @kang-heewon)

- Neuer „OpencodeExecutor“ mit Multiformat-Routing („/chat/completions“, „/messages“, „/responses“)
- 7 Modelle auf beiden Ebenen---

## [3.0.0-rc.3] - 2026-03-22

### ✨ New Features

-**#529**– Anbietersymbole verwenden jetzt [@lobehub/icons](https://github.com/lobehub/lobe-icons) mit elegantem PNG-Fallback und einer „ProviderIcon“-Komponente (mehr als 130 Anbieter werden unterstützt) -**#488**– Modelllisten automatisch alle 24 Stunden über „modelSyncScheduler“ aktualisieren (konfigurierbar über „MODEL_SYNC_INTERVAL_HOURS“)### 🔧 Bug Fixes

-**#537**– Gemini CLI OAuth: Zeigt jetzt einen klar umsetzbaren Fehler an, wenn „GEMINI_OAUTH_CLIENT_SECRET“ in Docker-/selbstgehosteten Bereitstellungen fehlt---

## [3.0.0-rc.2] - 2026-03-22

### 🔧 Bug Fixes

-**#536**– LongCat AI-Schlüsselvalidierung: baseUrl (`api.longcat.chat/openai`) und authHeader (`Authorization: Bearer`) korrigiert -**#535**– Überschreibung des angehefteten Modells: „body.model“ wird jetzt auf „pinnedModel“ gesetzt, wenn der Kontext-Cache-Schutz ein angeheftetes Modell erkennt -**#524**– OpenCode-Konfiguration jetzt korrekt gespeichert: `saveOpenCodeConfig()`-Handler hinzugefügt (XDG_CONFIG_HOME-bewusst, schreibt TOML)---

## [3.0.0-rc.1] - 2026-03-22

### 🔧 Bug Fixes

-**#521**– Die Anmeldung bleibt nicht mehr hängen, nachdem die Passworteinrichtung übersprungen wurde (Weiterleitung zum Onboarding) -**#522**– API Manager: Irreführende Schaltfläche „Maskierten Schlüssel kopieren“ entfernt (ersetzt durch Tooltip mit Schlosssymbol) -**#527**– Claude Code + Codex Superpowers-Schleife: „tool_result“-Blöcke werden jetzt in Text umgewandelt, anstatt gelöscht zu werden -**#532**– Die OpenCode GO API-Schlüsselvalidierung verwendet jetzt den richtigen „zen/v1“-Endpunkt („testKeyBaseUrl“) -**#489**– Antigravity: Fehlende „googleProjectId“ gibt einen strukturierten 422-Fehler mit Anleitung zum erneuten Verbinden zurück -**#510**– Windows: MSYS2/Git-Bash-Pfade (`/c/Program Files/...`) werden jetzt auf `C:\Program Files\...` normalisiert -**#492**– „Omniroute“-CLI erkennt jetzt „mise“/„nvm“, wenn „app/server.js“ fehlt, und zeigt die gezielte Korrektur an### Dokumentation

-**#513**– Zurücksetzen des Docker-Passworts: „INITIAL_PASSWORD“ env var Workaround dokumentiert -**#520**– pnpm: „pnpm genehmigt-builds-besser-sqlite3“ dokumentiert### ✅ Closed Issues

#489, #492, #510, #513, #520, #521, #522, #525, #527, #532---

## [2.9.5] — 2026-03-22

> Sprint: Neue OpenCode-Anbieter, Korrektur der Einbettung von Anmeldeinformationen, CLI-maskierter Schlüsselfehler, Korrektur von CACHE_TAG_PATTERN.### 🐛 Bug Fixes

-**CLI-Tools speichern maskierte API-Schlüssel in Konfigurationsdateien**– POST-Routen „claude-settings“, „cline-settings“ und „openclaw-settings“ akzeptieren jetzt einen „keyId“-Parameter und lösen den echten API-Schlüssel aus der Datenbank auf, bevor er auf die Festplatte geschrieben wird. „ClaudeToolCard“ wurde aktualisiert, um „keyId“ anstelle der maskierten Anzeigezeichenfolge zu senden. Behebt #523, #526. -**Benutzerdefinierte Einbettungsanbieter: Fehler „Keine Anmeldeinformationen“**– „/v1/embeddings“ verfolgt „credentialsProviderId“ jetzt getrennt vom Routing-Präfix, sodass Anmeldeinformationen von der passenden Anbieterknoten-ID und nicht von der öffentlichen Präfixzeichenfolge abgerufen werden. Behebt eine Regression, bei der „google/gemini-embedding-001“ und ähnliche benutzerdefinierte Anbietermodelle immer mit einem Anmeldeinformationsfehler fehlschlugen. Behebt Fehler im Zusammenhang mit #532. (PR #528 von @jacob2826) -**Kontext-Cache-Schutz-Regex fehlt `
` Präfix**– `CACHE_TAG_PATTERN` in `comboAgentMiddleware.ts` aktualisiert, damit es mit beiden Literalen übereinstimmt `
` (Backslash-n) und tatsächlicher Zeilenumbruch U+000A, den „combo.ts“-Streaming nach Fix Nr. 515 um das „<omniModel>“-Tag herum einfügt. Behebt #531.### ✨ New Providers

-**OpenCode Zen**– Kostenloses Tier-Gateway unter „opencode.ai/zen/v1“ mit 3 Modellen: „minimax-m2.5-free“, „big-pickle“, „gpt-5-nano“. -**OpenCode Go**– Abonnementdienst unter „opencode.ai/zen/go/v1“ mit 4 Modellen: „glm-5“, „kimi-k2.5“, „minimax-m2.7“ (Claude-Format), „minimax-m2.5“ (Claude-Format)

- Beide Anbieter verwenden den neuen „OpencodeExecutor“, der basierend auf dem angeforderten Modell dynamisch an „/chat/completions“, „/messages“, „/responses“ oder „/models/{model}:generateContent“ weiterleitet. (PR #530 von @kang-heewon)---

## [2.9.4] — 2026-03-21

> Sprint: Fehlerbehebungen – Codex-Eingabeaufforderungs-Cache-Schlüssel beibehalten, tagContent-JSON-Escape behoben, abgelaufener Token-Status mit DB synchronisieren.### 🐛 Bug Fixes

-**fix(translator)**: „prompt_cache_key“ in der Antwort-API → Chat-Abschlüsse-Übersetzung beibehalten (#517)
– Das Feld ist ein Cache-Affinitätssignal, das von Codex verwendet wird; Durch das Entfernen wurden sofortige Cache-Treffer verhindert.
In „openai-responses.ts“ und „responsesApiHelper.ts“ behoben.

-**fix(combo)**: Escape `
` in `tagContent`, sodass die eingefügte JSON-Zeichenfolge gültig ist (#515)
– Zeilenumbrüche im Vorlagenliteral (U+000A) sind ohne Escapezeichen innerhalb von JSON-Zeichenfolgenwerten nicht zulässig.
Ersetzt durch „\n“-Literalsequenzen in „open-sse/services/combo.ts“.

-**Fix(Nutzung)**: Synchronisieren Sie den Status des abgelaufenen Tokens bei einem Live-Authentifizierungsfehler wieder mit der Datenbank (#491)
— Wenn die Live-Überprüfung der Grenzwerte und Kontingente 401/403 zurückgibt, wird die Verbindung „testStatus“ jetzt aktualisiert
in der Datenbank auf „abgelaufen“ gesetzt, sodass auf der Anbieterseite derselbe verschlechterte Status angezeigt wird.
Behoben in „src/app/api/usage/[connectionId]/route.ts“.---

## [2.9.3] — 2026-03-21

> Sprint: Fügen Sie 5 neue kostenlose KI-Anbieter hinzu – LongCat, Pollinations, Cloudflare AI, Scaleway, AI/ML API.### ✨ New Providers

-**feat(providers/longcat)**: LongCat AI (`lc/`) hinzufügen – 50 Mio. Token/Tag kostenlos (Flash-Lite) + 500.000/Tag (Chat/Thinking) während der öffentlichen Beta. OpenAI-kompatibel, Standard-Bearer-Authentifizierung. -**feat(providers/pollinations)**: Pollinations AI („pol/“) hinzufügen – kein API-Schlüssel erforderlich. Proxys GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 (1 Anforderung/15 Sek. kostenlos). Der benutzerdefinierte Executor übernimmt die optionale Authentifizierung. -**feat(providers/cloudflare-ai)**: Cloudflare Workers AI hinzufügen (`cf/`) – 10.000 Neuronen/Tag kostenlos (~150 LLM-Antworten oder 500 Sekunden Whisper-Audio). Über 50 Modelle am globalen Rand. Der benutzerdefinierte Executor erstellt aus den Anmeldeinformationen eine dynamische URL mit „accountId“. -**feat(providers/scaleway)**: Scaleway Generative APIs hinzufügen („scw/“) – 1 Million kostenlose Token für neue Konten. EU/DSGVO-konform (Paris). Qwen3 235B, Lama 3.1 70B, Mistral Small 3.2. -**feat(providers/aimlapi)**: KI/ML-API hinzufügen („aiml/“) – 0,025 $/Tag kostenloses Guthaben, 200+ Modelle (GPT-4o, Claude, Gemini, Llama) über einen einzigen Aggregator-Endpunkt.### 🔄 Provider Updates

-**feat(providers/together)**: „hasFree: true“ + 3 dauerhaft kostenlose Modell-IDs hinzufügen: „Llama-3.3-70B-Instruct-Turbo-Free“, „Llama-Vision-Free“, „DeepSeek-R1-Distill-Llama-70B-Free“. -**feat(providers/gemini)**: „hasFree: true“ + „freeNote“ hinzufügen (1.500 req/Tag, keine Kreditkarte erforderlich, aistudio.google.com) -**chore(providers/gemini)**: Benennen Sie den Anzeigenamen aus Gründen der Übersichtlichkeit in „Gemini (Google AI Studio)“ um### ⚙️ Infrastructure

-**feat(executors/pollinations)**: Neuer „PollinationsExecutor“ – lässt den „Authorization“-Header weg, wenn kein API-Schlüssel bereitgestellt wird -**feat(executors/cloudflare-ai)**: Neuer „CloudflareAIExecutor“ – dynamische URL-Konstruktion erfordert „accountId“ in den Provider-Anmeldeinformationen -**feat(executors)**: Registrieren Sie die Executor-Zuordnungen „pollinations“, „pol“, „cloudflare-ai“ und „cf“.### Dokumentation

-**docs(readme)**: Kostenloser Combo-Stack auf 11 Anbieter erweitert (für immer 0 $) -**docs(readme)**: 4 neue kostenlose Anbieterabschnitte (LongCat, Pollinations, Cloudflare AI, Scaleway) mit Modelltabellen hinzugefügt -**docs(readme)**: Aktualisierte Preistabelle mit 4 neuen Zeilen für kostenlose Kontingente -**docs(i18n/pt-BR)**: Aktualisierte Preistabelle + Abschnitte „LongCat/Pollinations/Cloudflare AI/Scaleway“ auf Portugiesisch hinzugefügt -**docs(new-features/ai)**: 10 Aufgabenspezifikationsdateien + Master-Implementierungsplan in „docs/new-features/ai/“.### 🧪 Tests

- Testsuite:**821 Tests, 0 Fehler**(unverändert)---

## [2.9.2] — 2026-03-21

> Sprint: Medientranskription (Deepgram/HuggingFace Content-Type, Spracherkennung) und TTS-Fehleranzeige behoben.### 🐛 Bug Fixes

-**Fix(Transkription)**: Die Audiotranskription von Deepgram und HuggingFace ordnet jetzt „video/mp4“ → „audio/mp4“ und andere Medien-MIME-Typen über den neuen „resolveAudioContentType()“-Helfer korrekt zu. Bisher wurde beim Hochladen von „.mp4“-Dateien immer die Meldung „Keine Sprache erkannt“ zurückgegeben, da Deepgram „Content-Type: video/mp4“ empfing. -**Fix(Transkription)**: „detect_lingual=true“ zu Deepgram-Anfragen hinzugefügt – erkennt automatisch die Audiosprache (Portugiesisch, Spanisch usw.), anstatt standardmäßig Englisch zu verwenden. Behebt, dass nicht-englische Transkriptionen leere oder fehlerhafte Ergebnisse zurückgeben. -**fix(transcription)**: „punctuate=true“ zu Deepgram-Anfragen hinzugefügt, um eine qualitativ hochwertigere Transkriptionsausgabe mit korrekter Interpunktion zu ermöglichen. -**fix(tts)**: Fehleranzeige „[object Object]“ in Text-to-Speech-Antworten sowohl in „audioSpeech.ts“ als auch in „audioTranscription.ts“ behoben. Die Funktion „upstreamErrorResponse()“ extrahiert jetzt korrekt verschachtelte Zeichenfolgenmeldungen von Anbietern wie ElevenLabs, die „{ error: { message: „...“, status_code: 401 } }“ anstelle einer flachen Fehlerzeichenfolge zurückgeben.### 🧪 Tests

- Testsuite:**821 Tests, 0 Fehler**(unverändert)### Triaged Issues

-**#508**– Regression des Tool-Aufrufformats: angeforderte Proxy-Protokolle und Provider-Chain-Informationen („needs-info“) -**#510**– Windows CLI-Integritätsprüfungspfad: angeforderte Shell-/Knotenversionsinformationen („needs-info“) -**#485**– Kiro MCP-Tool-Aufrufe: als externes Kiro-Problem geschlossen (nicht OmniRoute) -**#442**– Baseten /models-Endpunkt: geschlossen (dokumentierte manuelle Problemumgehung) -**#464**– Schlüsselbereitstellungs-API: als Roadmap-Element anerkannt---

## [2.9.1] — 2026-03-21

> Sprint: SSE-OmniModel-Datenverlust beheben, protokollspezifische Modellkompatibilität zusammenführen.### Bug Fixes

-**#511**– Kritisch: Das Tag „<omniModel>“ wurde nach „finish_reason:stop“ in SSE-Streams gesendet, was zu Datenverlust führte. Das Tag wird jetzt in den ersten nicht leeren Inhaltsblock eingefügt und garantiert so die Zustellung, bevor SDKs die Verbindung schließen.### Merged PRs

-**PR #512**(@zhangqiang8vip): Pro-Protokoll-Modellkompatibilität – „normalizeToolCallId“ und „preserveOpenAIDeveloperRole“ können jetzt pro Client-Protokoll konfiguriert werden (OpenAI, Claude, Responses API). Neues Feld „compatByProtocol“ in der Modellkonfiguration mit Zod-Validierung.### Triaged Issues

-**#510**– Windows CLI healthcheck_failed: PATH/Versionsinformationen angefordert -**#509**– Turbopack Electron-Regression: Upstream-Next.js-Fehler, dokumentierte Problemumgehungen -**#508**– macOS schwarzer Bildschirm: vorgeschlagene Problemumgehung „--disable-gpu“.---

## [2.9.0] — 2026-03-20

> Sprint: Plattformübergreifender MachineId-Fix, Ratenbegrenzungen pro API-Schlüssel, Streaming-Kontext-Cache, Alibaba DashScope, Suchanalyse, ZWS v5 und 8 Probleme behoben.### ✨ New Features

-**feat(search)**: Registerkarte „Suchanalyse“ in „/dashboard/analytics“ – Anbieteraufschlüsselung, Cache-Trefferquote, Kostenverfolgung. Neue API: `GET /api/v1/search/analytics` (#feat/search-provider-routing) -**feat(provider)**: Alibaba Cloud DashScope mit benutzerdefinierter Endpunktpfadvalidierung hinzugefügt – konfigurierbarer „chatPath“ und „modelsPath“ pro Knoten (#feat/custom-endpoint-paths) -**feat(api)**: Grenzwerte für die Anforderungsanzahl pro API-Schlüssel – Spalten „max_requests_per_day“ und „max_requests_per_minute“ mit In-Memory-Slide-Window-Erzwingung, die HTTP 429 zurückgibt (#452) -**feat(dev)**: ZWS v5 – HMR-Leck-Fix (485 DB-Verbindungen → 1), Speicher 2,4 GB → 195 MB, „globalThis“-Singletons, Edge Runtime-Warnungsfix (@zhangqiang8vip)### 🐛 Bug Fixes

-**fix(#506)**: Plattformübergreifende „machineId“ – „getMachineIdRaw()“ mit Try/Catch-Wasserfall neu geschrieben (Windows REG.exe → macOS ioreg → Linux-Datei lesen → Hostname → „os.hostname()“). Beseitigt die „process.platform“-Verzweigung, die durch den Dead-Code des Next.js-Bundlers eliminiert wurde, und behebt, dass „head“ unter Windows nicht erkannt wird. Behebt auch #466. -**Fix(#493)**: Benutzerdefinierte Benennung von Anbietermodellen – falsche Präfixentfernung in „DefaultExecutor.transformRequest()“ entfernt, die organisationsbezogene Modell-IDs wie „zai-org/GLM-5-FP8“ verstümmelte. -**fix(#490)**: Streaming + Kontext-Cache-Schutz – „TransformStream“ fängt SSE ab, um das Tag „<omniModel>“ vor der Markierung „[DONE]“ einzufügen, wodurch der Kontext-Cache-Schutz für Streaming-Antworten aktiviert wird. -**fix(#458)**: Kombinierte Schemavalidierung – Die Felder „system_message“, „tool_filter_regex“, „context_cache_protection“ bestehen jetzt beim Speichern die Zod-Validierung. -**fix(#487)**: Bereinigung der KIRO MITM-Karte – ZWS_README entfernt, „AntigravityToolCard“ generiert, um dynamische Werkzeugmetadaten zu verwenden.### 🧪 Tests

- Filtereinheitstests für Tools im Anthropic-Format hinzugefügt (PR #397) – 8 Regressionstests für „tool.name“ ohne „.function“-Wrapper
- Testsuite:**821 Tests, 0 Fehler**(von 813)### 📋 Issues Closed (8)

-**#506**– Windows-Maschinen-ID „head“ nicht erkannt (behoben) -**#493**– Benutzerdefinierte Benennung des Anbietermodells (behoben) -**#490**– Streaming-Kontext-Cache (behoben) -**#452**– Anforderungslimits pro API-Schlüssel (implementiert) -**#466**– Windows-Anmeldefehler (gleiche Grundursache wie #506) -**#504**– MITM inaktiv (erwartetes Verhalten) -**#462**– Gemini CLI PSA (behoben) -**#434**– Absturz der Electron-App (Duplikat von #402)## [2.8.9] — 2026-03-20

> Sprint: Community-PRs zusammenführen, KIRO MITM-Karte reparieren, Abhängigkeitsaktualisierungen.### Merged PRs

-**PR #498**(@Sajid11194): Absturz der Windows-Maschinen-ID behoben (`undefiniert\REG.exe`). Ersetzt „node-machine-id“ durch native Betriebssystem-Registrierungsabfragen.**Schließt #486.** -**PR #497**(@zhangqiang8vip): Behebung von HMR-Ressourcenlecks im Entwicklungsmodus – 485 geleakte DB-Verbindungen → 1, Speicher 2,4 GB → 195 MB. „globalThis“-Singletons, Edge Runtime-Warnungskorrektur, Windows-Teststabilität. (+1168/-338 über 22 Dateien) -**PRs #499-503**(Dependabot): GitHub Actions-Updates – „docker/build-push-action@7“, „actions/checkout@6“, „peter-evans/dockerhub-description@5“, „docker/setup-qemu-action@4“, „docker/login-action@4“.### Bug Fixes

-**#505**– Die KIRO MITM-Karte zeigt jetzt werkzeugspezifische Anweisungen („api.anthropic.com“) anstelle von Antigravity-spezifischem Text an.
–**#504**– Antwort mit UX-Klarstellung (MITM „Inaktiv“ ist das erwartete Verhalten, wenn der Proxy nicht ausgeführt wird).---

## [2.8.8] — 2026-03-20

> Sprint: Absturz des OAuth-Batch-Tests behoben, Schaltfläche „Alle testen“ zu einzelnen Anbieterseiten hinzugefügt.### Bug Fixes

-**OAuth-Batch-Test-Absturz**(ERR_CONNECTION_REFUSED): Sequentielle For-Schleife durch 5-Verbindungs-Parallelitätsbeschränkung + 30 Sekunden Zeitüberschreitung pro Verbindung über „Promise.race()“ + „Promise.allSettled()“ ersetzt. Verhindert Serverabstürze beim Testen großer OAuth-Anbietergruppen (ca. 30+ Verbindungen).### Funktionen

-**Schaltfläche „Alle testen“ auf Anbieterseiten**: Auf einzelnen Anbieterseiten (z. B. „/providers/codex“) wird jetzt die Schaltfläche „Alle testen“ in der Kopfzeile „Verbindungen“ angezeigt, wenn mehr als zwei Verbindungen vorhanden sind. Verwendet „POST /api/providers/test-batch“ mit „{mode: „provider“,providerId}“. Die Ergebnisse werden modal mit Gut/Schlecht-Zusammenfassung und Diagnose pro Verbindung angezeigt.---

## [2.8.7] — 2026-03-20

> Sprint: PR Nr. 495 zusammenführen (Flaschenhals 429 fallen lassen), Nr. 496 beheben (Anbieter benutzerdefinierter Einbettung), Triage-Funktionen.### Bug Fixes

-**Engpass 429 unendliches Warten**(PR #495 von @xandr0s): Bei 429 schlägt `limiter.stop({ dropWaitingJobs: true })` alle in der Warteschlange befindlichen Anfragen sofort fehl, sodass Upstream-Aufrufer einen Fallback auslösen können. Der Limiter wird aus der Karte gelöscht, sodass bei der nächsten Anfrage eine neue Instanz erstellt wird. -**Benutzerdefinierte Einbettungsmodelle nicht auflösbar**(#496): „POST /v1/embeddings“ löst jetzt benutzerdefinierte Einbettungsmodelle von ALLEN Anbieterknoten auf (nicht nur von localhost). Ermöglicht das Hinzufügen von Modellen wie „google/gemini-embedding-001“ über das Dashboard.### Issues Responded

-**#452**– Grenzwerte für die Anzahl der Anfragen pro API-Schlüssel (bestätigt, auf Roadmap) -**#464**– Automatische Ausgabe von API-Schlüsseln mit Anbieter-/Kontobeschränkungen (benötigt weitere Details) -**#488**– Modelllisten automatisch aktualisieren (bestätigt, auf Roadmap) -**#496**– Benutzerdefinierte Auflösung des Einbettungsanbieters (behoben)---

## [2.8.6] — 2026-03-20

> Sprint: PR #494 zusammenführen (MiniMax-Rollenkorrektur), KIRO MITM-Dashboard reparieren, 8 Probleme prüfen.### Funktionen

-**MiniMax-Entwickler→Systemrollenkorrektur**(PR #494 von @zhangqiang8vip): Umschalten zwischen „preserveDeveloperRole“ pro Modell. Fügt die Benutzeroberfläche „Kompatibilität“ auf der Anbieterseite hinzu. Behebt 422 „Rollenparam-Fehler“ für MiniMax und ähnliche Gateways. -**roleNormalizer**: „normalizeDeveloperRole()“ akzeptiert jetzt den Parameter „preserveDeveloperRole“ mit Tri-State-Verhalten (undefiniert=behalten, wahr=behalten, falsch=konvertieren). -**DB**: Neues „getModelPreserveOpenAIDeveloperRole()“ und „mergeModelCompatOverride()“ in „models.ts“.### Bug Fixes

-**KIRO MITM-Dashboard**(#481/#487): „CLIToolsPageClient“ leitet jetzt jedes „configType: „mitm““-Tool an „AntigravityToolCard“ weiter (MITM-Start-/Stopp-Steuerelemente). Bisher war nur Antigravity fest codiert. -**AntigravityToolCard generisch**: Verwendet „tool.image“, „tool.description“, „tool.id“ anstelle von fest codierten Antigravity-Werten. Schützt vor fehlenden „defaultModels“.### Cleanup

- „ZWS_README_V2.md“ entfernt (nur Entwicklungsdokumente aus PR #494).### Issues Triaged (8)

-**#487**– Geschlossen (KIRO MITM in dieser Version behoben) -**#486**– Needs-Info (Windows REG.exe PATH-Problem) -**#489**– Needs-Info (Antigravity-Projekt-ID fehlt, OAuth-Neuverbindung erforderlich) -**#492**– Needs-Info (app/server.js fehlt auf schlecht verwaltetem Knoten) -**#490**– Bestätigt (Streaming + Kontext-Cache-Blockierung, Korrektur geplant) -**#491**– Bestätigt (Inkonsistenz des Codex-Authentifizierungsstatus) -**#493**– Bestätigt (Präfix für den Modellnamen des modalen Anbieters, Problemumgehung bereitgestellt) -**#488**– Rückstand bei Funktionsanfragen (Modelllisten automatisch aktualisieren)---

## [2.8.5] — 2026-03-19

> Sprint: Behebung von Zombie-SSE-Streams, Kontext-Cache-First-Turn, KIRO MITM und Triage 5 externer Probleme.### Bug Fixes

-**Zombie SSE Streams**(#473): Reduzieren Sie „STREAM_IDLE_TIMEOUT_MS“ von 300 → 120 Sekunden für einen schnelleren Combo-Fallback, wenn Anbieter mitten im Stream hängen bleiben. Konfigurierbar über env var. -**Context-Cache-Tag**(#474): „injectModelTag()“ wurde korrigiert, um First-Turn-Anfragen zu verarbeiten (keine Assistentenmeldungen) – der Kontext-Cache-Schutz funktioniert jetzt ab der allerersten Antwort. -**KIRO MITM**(#481): KIRO `configType` von `guide` → `mitm` ändern, damit das Dashboard MITM-Start/Stopp-Steuerelemente darstellt. -**E2E-Test**(CI): Korrigieren Sie „providers-bailian-coding-plan.spec.ts“ – schließen Sie die bereits vorhandene modale Überlagerung, bevor Sie auf die Schaltfläche „API-Schlüssel hinzufügen“ klicken.### Closed Issues

- #473 – Zombie-SSE-Streams umgehen Combo-Fallback
- #474 – Kontext-Cache-Tag „<omniModel>“ fehlt beim ersten Durchgang
- #481 – MITM für KIRO kann nicht über das Dashboard aktiviert werden
- #468 – Gemini-CLI-Remoteserver (ersetzt durch #462 veraltet)
- #438 – Claude kann keine Dateien schreiben (externes CLI-Problem)
- #439 – AppImage funktioniert nicht (dokumentierte Problemumgehung für libfuse2)
- #402 – ARM64 DMG „beschädigt“ (dokumentierte xattr -cr Problemumgehung)
- #460 – CLI kann unter Windows nicht ausgeführt werden (dokumentierter PATH-Fix)---

## [2.8.4] — 2026-03-19

> Sprint: Abschaffung der Gemini-CLI, Korrektur des VM-Leitfadens i18n, Korrektur der Abhängigkeitssicherheit, Erweiterung des Anbieterschemas.### Funktionen

-**Gemini CLI-Veraltung**(#462): Markieren Sie den Anbieter „gemini-cli“ als veraltet mit Warnung – Google schränkt die OAuth-Nutzung durch Drittanbieter ab März 2026 ein -**Anbieterschema**(#462): Erweitern Sie die Zod-Validierung mit den optionalen Feldern „deprecated“, „deprecationReason“, „hasFree“, „freeNote“, „authHint“, „apiHint“.### Bug Fixes

-**VM Guide i18n**(#471): „VM_DEPLOYMENT_GUIDE.md“ zur i18n-Übersetzungspipeline hinzufügen, alle 30 Gebietsschemaübersetzungen aus der englischen Quelle neu generieren (blieben auf Portugiesisch hängen)### Sicherheit

-**deps**: Bump „abgeflacht“ 3.3.3 → 3.4.2 – behebt CWE-1321-Prototypverschmutzung (#484, @dependabot)### Closed Issues

- #472 – Modell-Aliase-Regression (behoben in Version 2.8.2)
- #471 – Übersetzungen des VM-Leitfadens fehlerhaft
- #483 – Nachgestelltes „data: null“ nach „[DONE]“ (behoben in v2.8.3)### Merged PRs

- #484 – deps: Beule von 3.3.3 auf 3.4.2 abgeflacht (@dependabot)---

## [2.8.3] — 2026-03-19

> Sprint: Tschechisch i18n, Korrektur des SSE-Protokolls, Übersetzung des VM-Leitfadens.### Funktionen

-**Tschechische Sprache**(#482): Vollständiges Tschechisch (cs) i18n – 22 Dokumente, 2606 UI-Strings, Sprachumschalter-Updates (@zen0bit) -**VM-Bereitstellungshandbuch**: Vom Portugiesischen ins Englische als Quelldokument übersetzt (@zen0bit)### Bug Fixes

-**SSE-Protokoll**(#483): Nach dem Signal „[DONE]“ kein nachgestelltes „data: null“ senden – behebt „AI_TypeValidationError“ in strikten AI SDK-Clients (Zod-basierte Validatoren)### Merged PRs

- #482 – Tschechische Sprache hinzufügen + VM_DEPLOYMENT_GUIDE.md englische Quelle korrigieren (@zen0bit)---

## [2.8.2] — 2026-03-19

> Sprint: 2 zusammengeführte PRs, Korrektur des Modell-Aliase-Routings, Protokollexport und Problemtriage.### Funktionen

-**Protokollexport**: Neue Schaltfläche „Exportieren“ unter „/dashboard/logs“ mit Dropdown-Liste für den Zeitbereich (1 Std., 6 Std., 12 Std., 24 Std.). Lädt JSON von Anfrage-/Proxy-/Anrufprotokollen über die API „/api/logs/export“ herunter (#user-request)### Bug Fixes

-**Modell-Aliase-Routing**(#472): Einstellungen → Modell-Aliase wirken sich jetzt korrekt auf das Provider-Routing aus, nicht nur auf die Formaterkennung. Bisher wurde die Ausgabe von „resolveModelAlias()“ nur für „getModelTargetFormat()“ verwendet, aber die ursprüngliche Modell-ID wurde an den Anbieter gesendet -**Stream-Flush-Nutzung**(#480): Nutzungsdaten vom letzten SSE-Ereignis im Puffer werden jetzt während des Stream-Flush korrekt extrahiert (zusammengeführt von @prakersh)### Merged PRs

- #480 – Nutzung aus verbleibendem Puffer im Flush-Handler extrahieren (@prakersh)
- #479 – Fehlende Preiseinträge für Codex 5.3/5.4 und Anthropic-Modell-ID hinzufügen (@prakersh)---

## [2.8.1] — 2026-03-19

> Sprint: Fünf Community-PRs – Fehlerbehebungen für Streaming-Anrufprotokolle, Kiro-Kompatibilität, Cache-Token-Analyse, chinesische Übersetzung und konfigurierbare Tool-Anruf-IDs.### Funktionen

-**feat(logs)**: Anrufprotokoll-Antwortinhalte werden jetzt vor der Übersetzung korrekt aus rohen Anbieterblöcken (OpenAI/Claude/Gemini) akkumuliert, wodurch leere Antwortnutzlasten im Streaming-Modus behoben werden (#470, @zhangqiang8vip) -**feat(providers)**: Pro Modell konfigurierbare 9-Zeichen-Tool-Aufruf-ID-Normalisierung (Mistral-Stil) – nur Modelle mit aktivierter Option erhalten abgeschnittene IDs (#470) -**feat(api)**: Schlüssel-PATCH-API erweitert, um die Felder „allowedConnections“, „name“, „autoResolve“, „isActive“ und „accessSchedule“ zu unterstützen (#470) -**feat(dashboard)**: Response-First-Layout in der Benutzeroberfläche für Anforderungsprotokolldetails (#470) -**feat(i18n)**: Verbesserte chinesische (zh-CN) Übersetzung – vollständige Neuübersetzung (#475, @only4copilot)### 🐛 Bug Fixes

-**fix(kiro)**: Eingefügtes „Modell“-Feld aus Anforderungstext entfernen – Kiro-API lehnt unbekannte Felder der obersten Ebene ab (#478, @prakersh) -**Fix(Nutzung)**: Beziehen Sie Cache-Lese- und Cache-Erstellungs-Tokens in die Eingabesummen des Nutzungsverlaufs ein, um eine genaue Analyse zu ermöglichen (#477, @prakersh) -**fix(callLogs)**: Unterstützt Claude-Format-Nutzungsfelder („input_tokens“/„output_tokens“) neben dem OpenAI-Format und schließt alle Cache-Token-Varianten ein (#476, @prakersh)---

## [2.8.0] — 2026-03-19

> Sprint: Bailian Coding Plan-Anbieter mit bearbeitbaren Basis-URLs sowie Community-Beiträgen für Alibaba Cloud und Kimi Coding.### Funktionen

-**feat(providers)**: Bailian Coding Plan („bailian-coding-plan“) hinzugefügt – Alibaba Model Studio mit Anthropic-kompatibler API. Statischer Katalog mit 8 Modellen, darunter Qwen3.5 Plus, Qwen3 Coder, MiniMax M2.5, GLM 5 und Kimi K2.5. Beinhaltet eine benutzerdefinierte Authentifizierungsvalidierung (400=gültig, 401/403=ungültig) (#467, @Mind-Dragon) -**feat(admin)**: Bearbeitbare Standard-URL im Provider Admin zum Erstellen/Bearbeiten von Flows – Benutzer können benutzerdefinierte Basis-URLs pro Verbindung konfigurieren. Bleibt in „providerSpecificData.baseUrl“ bestehen, wobei die Zod-Schemavalidierung Nicht-http(s)-Schemata ablehnt (#467)### 🧪 Tests

– Über 30 Unit-Tests und 2 E2E-Szenarien für den Bailian Coding Plan-Anbieter hinzugefügt, die Authentifizierungsvalidierung, Schema-Härtung, Verhalten auf Routenebene und schichtübergreifende Integration abdecken---

## [2.7.10] — 2026-03-19

> Sprint: Zwei neue von der Community bereitgestellte Anbieter (Alibaba Cloud Coding, Kimi Coding API-Key) und Docker-Pino-Fix.### Funktionen

-**feat(providers)**: Unterstützung für Alibaba Cloud Coding Plan mit zwei OpenAI-kompatiblen Endpunkten hinzugefügt – „alicode“ (China) und „alicode-intl“ (International), jeweils mit 8 Modellen (#465, @dtk1985) -**feat(providers)**: Dedizierter Anbieterpfad „kimi-coding-apikey“ hinzugefügt – API-schlüsselbasierter Kimi-Coding-Zugriff wird nicht mehr über die reine OAuth-Route „kimi-coding“ erzwungen. Beinhaltet Registrierung, Konstanten, Modell-API, Konfiguration und Validierungstest (#463, @Mind-Dragon)### 🐛 Bug Fixes

-**fix(docker)**: Fehlende „split2“-Abhängigkeit zum Docker-Image hinzugefügt – „pino-abstract-transport“ benötigt sie zur Laufzeit, wurde aber nicht in den eigenständigen Container kopiert, was zu Abstürzen mit „Modul „split2“ kann nicht gefunden werden“ führt (#459)---

## [2.7.9] — 2026-03-18

> Sprint: Subpfad-Passthrough für Codex-Antworten wird nativ unterstützt, Windows MITM-Absturz behoben und Combos-Agent-Schemata angepasst.### Funktionen

-**feat(codex)**: Subpath-Passthrough für native Antworten für Codex – leitet „POST /v1/responses/compact“ nativ an den Codex-Upstream weiter, wobei die Claude-Code-Kompatibilität gewahrt bleibt, ohne das Suffix „/compact“ zu entfernen (#457)### 🐛 Bug Fixes

-**fix(combos)**: Zod-Schemas („updateComboSchema“ und „createComboSchema“) enthalten jetzt „system_message“, „tool_filter_regex“ und „context_cache_protection“. Behebt einen Fehler, bei dem agentenspezifische Einstellungen, die über das Dashboard erstellt wurden, stillschweigend von der Backend-Validierungsschicht verworfen wurden (#458) -**fix(mitm)**: Absturz des Kiro MITM-Profils unter Windows behoben – „node-machine-id“ schlug aufgrund fehlender „REG.exe“-Umgebung fehl und der Fallback löste einen schwerwiegenden „Krypto ist nicht definiert“-Fehler aus. Fallback importiert Krypto jetzt sicher und korrekt (#456)---

## [2.7.8] — 2026-03-18

> Sprint: Budgetsparfehler + Combo-Agent-Funktionen UI + OmniModel-Tag-Sicherheitskorrektur.### 🐛 Bug Fixes

-**fix(budget)**: „Save Limits“ gibt nicht mehr 422 zurück – „warningThreshold“ wird jetzt korrekt als Bruch (0–1) statt als Prozentsatz (0–100) gesendet (#451) -**fix(combos)**: Das interne Cache-Tag „<omniModel>“ wird jetzt entfernt, bevor Anfragen an Anbieter weitergeleitet werden, wodurch Cache-Sitzungsunterbrechungen verhindert werden (#454)### Funktionen

-**feat(combos)**: Abschnitt „Agent-Funktionen“ zum Combo-Erstellungs-/Bearbeitungsmodal hinzugefügt – „system_message“-Override, „tool_filter_regex“ und „context_cache_protection“ direkt über das Dashboard verfügbar machen (#454)---

## [2.7.7] — 2026-03-18

> Sprint: Docker-Pino-Absturz, Codex-CLI-Antwort-Worker-Fix, Paketsperrsynchronisierung.### 🐛 Bug Fixes

-**fix(docker)**: „pino-abstract-transport“ und „pino-pretty“ werden jetzt explizit in der Docker-Runner-Phase kopiert – Next.js Standalone-Trace verfehlt diese Peer-Deps, was beim Start zum Absturz „Modul pino-abstract-transport kann nicht gefunden werden“ führt (#449) -**fix(responses)**: „initTranslators()“ aus der Route „/v1/responses“ entfernen – stürzte den Next.js-Worker mit der uncaughtException „der Worker wurde beendet“ bei Codex-CLI-Anfragen ab (#450)### 🔧 Maintenance

-**chore(deps)**: „package-lock.json“ wird jetzt bei jeder Versionserhöhung festgeschrieben, um sicherzustellen, dass Docker „npm ci“ genaue Abhängigkeitsversionen verwendet---

## [2.7.5] — 2026-03-18

> Sprint: UX-Verbesserungen und Fehlerbehebung bei der Windows CLI-Gesundheitsprüfung.### 🐛 Bug Fixes

-**fix(ux)**: Hinweis zum Standardpasswort auf der Anmeldeseite anzeigen – neue Benutzer sehen jetzt „Standardpasswort: 123456“ unter der Passworteingabe (#437) -**fix(cli)**: Claude CLI und andere von npm installierte Tools werden jetzt korrekt als ausführbar unter Windows erkannt – Spawn verwendet „shell:true“, um „.cmd“-Wrapper über PATHEXT aufzulösen (#447)---

## [2.7.4] — 2026-03-18

> Sprint: Suchtools-Dashboard, i18n-Korrekturen, Copilot-Grenzwerte, Serper-Validierungskorrektur.### Funktionen

-**feat(search)**: Search Playground hinzufügen (10. Endpunkt), Suchtools-Seite mit Anbieter vergleichen/Reranking-Pipeline/Suchverlauf, lokales Reranking-Routing, Auth Guards auf der Such-API (#443 von @Regis-RCR)

- Neue Route: „/dashboard/search-tools“.
  – Seitenleisteneintrag im Abschnitt „Debuggen“.
- „GET /api/search/providers“ und „GET /api/search/stats“ mit Authentifizierungsschutz
- Lokales Provider_Nodes-Routing für „/v1/rerank“.
- Über 30 i18n-Schlüssel im Such-Namespace### 🐛 Bug Fixes

-**fix(search)**: Brave News Normalizer reparieren (gab 0 Ergebnisse zurück), max_results-Kürzung nach der Normalisierung erzwingen, Endpoints-Seitenabruf-URL korrigieren (#443 von @Regis-RCR) -**fix(analytics)**: Analysetags-/Datumsbezeichnungen lokalisieren – hartcodierte portugiesische Zeichenfolgen durch „Intl.DateTimeFormat(locale)“ ersetzen (#444 von @hijak) -**fix(copilot)**: Korrekte Anzeige des GitHub Copilot-Kontotyps, irreführende unbegrenzte Kontingentzeilen aus dem Limits-Dashboard filtern (#445 von @hijak) -**Fix(Anbieter)**: Keine gültigen Serper-API-Schlüssel mehr ablehnen – Nicht-4xx-Antworten als gültige Authentifizierung behandeln (#446 von @hijak)---

## [2.7.3] — 2026-03-18

> Sprint: Codex Direct API-Kontingent-Fallback-Fix.### 🐛 Bug Fixes

-**fix(codex)**: Wöchentlich erschöpfte Konten im direkten API-Fallback blockieren (#440)

- „resolveQuotaWindow()“-Präfixübereinstimmung: „weekly“ stimmt jetzt mit „weekly (7d)“-Cache-Schlüsseln überein
- „applyCodexWindowPolicy()“ erzwingt die korrekte Umschaltung von „useWeekly“/„use5h“.
- 4 neue Regressionstests (insgesamt 766)---

## [2.7.2] — 2026-03-18

> Sprint: Korrekturen des UI-Kontrasts im Lichtmodus.### 🐛 Bug Fixes

-**fix(logs)**: Kontrast des Lichtmodus in den Filterschaltflächen und dem Combo-Badge für Anforderungsprotokolle korrigiert (#378)

- Die Filterschaltflächen „Fehler/Erfolg/Kombination“ sind jetzt im Lichtmodus lesbar
- Das Combo-Reihenabzeichen verwendet im Lichtmodus ein stärkeres Violett---

## [2.7.1] — 2026-03-17

> Sprint: Einheitliches Websuchrouting (POST /v1/search) mit 5 Anbietern + Next.js 16.1.7-Sicherheitsfixes (6 CVEs).### ✨ New Features

-**feat(search)**: Einheitliches Web-Suchrouting – „POST /v1/search“ mit 5 Anbietern (Serper, Brave, Perplexity, Exa, Tavily)

- Automatisches Failover zwischen Anbietern, über 6.500 kostenlose Suchvorgänge pro Monat
- In-Memory-Cache mit Anforderungszusammenführung (konfigurierbare TTL)
- Dashboard: Registerkarte „Suchanalyse“ in „/dashboard/analytics“ mit Anbieteraufschlüsselung, Cache-Trefferquote und Kostenverfolgung
- Neue API: `GET /api/v1/search/analytics` für Suchanfragenstatistiken
- DB-Migration: Spalte „request_type“ in „call_logs“ für die Verfolgung von Nicht-Chat-Anfragen
- Zod-Validierung (`v1SearchSchema`), authentifiziert, Kosten erfasst über `recordCost()`### Sicherheit

-**deps**: Next.js 16.1.6 → 16.1.7 – behebt 6 CVEs: -**Kritisch**: CVE-2026-29057 (Schmuggel von HTTP-Anfragen über http-Proxy) -**Hoch**: CVE-2026-27977, CVE-2026-27978 (WebSocket + Serveraktionen) -**Mittel**: CVE-2026-27979, CVE-2026-27980, CVE-2026-jcc7### 📁 New Files

| Datei                                                            | Zweck                                                              |
| ---------------------------------------------------------------- | ------------------------------------------------------------------ | --- |
| `open-sse/handlers/search.ts`                                    | Suchhandler mit 5-Provider-Routing                                 |
| `open-sse/config/searchRegistry.ts`                              | Anbieterregistrierung (Authentifizierung, Kosten, Kontingent, TTL) |
| `open-sse/services/searchCache.ts`                               | In-Memory-Cache mit Anforderungszusammenführung                    |
| `src/app/api/v1/search/route.ts`                                 | Next.js-Route (POST + GET)                                         |
| `src/app/api/v1/search/analytics/route.ts`                       | Suchstatistik-API                                                  |
| `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` | Registerkarte „Analyse-Dashboard“                                  |
| `src/lib/db/migrations/007_search_request_type.sql`              | DB-Migration                                                       |
| `tests/unit/search-registry.test.mjs`                            | 277 Zeilen Unit-Tests                                              | --- |

## [2.7.0] — 2026-03-17

> Sprint: Von ClawRouter inspirierte Funktionen – ToolCalling-Flag, mehrsprachige Absichtserkennung, Benchmark-gesteuerter Fallback, Anforderungsdeduplizierung, steckbare RouterStrategy, Preise für Grok-4 Fast + GLM-5 + MiniMax M2.5 + Kimi K2.5.### ✨ New Models & Pricing

-**Feature(Preise)**: xAI Grok-4 Fast – „0,20 $/0,50 $ pro 1 Mio. Token“, 1143 ms p50-Latenz, Tool-Aufruf unterstützt -**Leistung(Preis)**: xAI Grok-4 (Standard) – „0,20 $/1,50 $ pro 1 Mio. Token“, logisches Flaggschiff -**feat(pricing)**: GLM-5 über Z.AI – „0,5 $/1 Mio.“, 128.000 Ausgabekontext -**Leistung(Preise)**: MiniMax M2.5 – „Eingabe von 0,30 $/1 Mio.“, Argumentation + Agentenaufgaben -**feat(pricing)**: DeepSeek V3.2 – aktualisierter Preis „0,27 $/1,10 $ pro 1 Mio.“ -**Feature(Preise)**: Kimi K2.5 über Moonshot API – direkter Moonshot API-Zugriff -**feat(providers)**: Z.AI-Anbieter hinzugefügt (`zai`-Alias) – GLM-5-Familie mit 128K-Ausgabe### 🧠 Routing Intelligence

-**feat(registry)**: „toolCalling“-Flag pro Modell in der Provider-Registrierung – Combos können jetzt Modelle bevorzugen/erfordern, die Tool-Calling-fähig sind -**feat(scoring)**: Mehrsprachige Absichtserkennung für AutoCombo-Scoring – PT/ZH/ES/AR-Skript-/Sprachmuster beeinflussen die Modellauswahl pro Anforderungskontext -**feat(fallback)**: Benchmark-gesteuerte Fallback-Ketten – echte Latenzdaten (S. 50 von „comboMetrics“), die zur dynamischen Neuordnung der Fallback-Priorität verwendet werden -**feat(dedup)**: Deduplizierung über Content-Hash anfordern – 5-Sekunden-Idempotenzfenster verhindert, dass doppelte Anbieteraufrufe Clients erneut versuchen -**feat(router)**: Pluggable „RouterStrategy“-Schnittstelle in „autoCombo/routerStrategy.ts“ – benutzerdefinierte Routing-Logik kann ohne Änderung des Kerns eingefügt werden### 🔧 MCP Server Improvements

-**feat(mcp)**: 2 neue erweiterte Tool-Schemata: „omniroute_get_provider_metrics“ (p50/p95/p99 pro Anbieter) und „omniroute_explain_route“ (Erklärung der Routing-Entscheidung)
–**feat(mcp)**: MCP-Tool-Authentifizierungsbereiche aktualisiert – „metrics:read“-Bereich für Anbietermetrik-Tools hinzugefügt -**feat(mcp)**: „omniroute_best_combo_for_task“ akzeptiert jetzt den Parameter „LanguageHint“ für mehrsprachiges Routing### 📊 Observability

-**feat(metrics)**: „comboMetrics.ts“ erweitert um Echtzeit-Latenzperzentilverfolgung pro Anbieter/Konto -**feat(health)**: Die Health-API („/api/monitoring/health“) gibt jetzt die Felder „p50Latency“ und „errorRate“ pro Anbieter zurück -**feat(usage)**: Migration des Nutzungsverlaufs für die Latenzverfolgung pro Modell### 🗄️ DB Migrations

-**feat(migrations)**: Neue Spalte „latency_p50“ in der Tabelle „combo_metrics“ – null-brechend, sicher für bestehende Benutzer### 🐛 Bug Fixes / Closures

-**close(#411)**: bessere Auflösung des SQLite3-Hash-Moduls unter Windows – behoben in v2.6.10 (f02c5b5) -**close(#409)**: GitHub Copilot-Chat-Abschlüsse schlagen mit Claude-Modellen fehl, wenn Dateien angehängt werden – behoben in v2.6.9 (838f1d6) -**close(#405)**: Duplikat von #411 – behoben## [2.6.10] — 2026-03-17

> Windows-Fix: Better-SQLite3 vorgefertigter Download ohne Node-Gyp/Python/MSVC (#426).### 🐛 Bug Fixes

-**fix(install/#426)**: Unter Windows schlug „npm install -g omniroute“ mit „better_sqlite3.node ist keine gültige Win32-Anwendung“ fehl, da die gebündelte native Binärdatei für Linux kompiliert wurde. Fügt**Strategie 1.5**zu „scripts/postinstall.mjs“ hinzu: verwendet „@mapbox/node-pre-gyp install --fallback-to-build=false“ (gebündelt in „better-sqlite3“), um die richtige vorgefertigte Binärdatei für das aktuelle Betriebssystem/Arch herunterzuladen, ohne dass Build-Tools erforderlich sind (kein Node-Gyp, kein Python, kein MSVC). Fällt nur dann auf „npm rebuild“ zurück, wenn der Download fehlschlägt. Fügt plattformspezifische Fehlermeldungen mit klaren Anweisungen zur manuellen Fehlerbehebung hinzu.---

## [2.6.9] — 2026-03-17

> CI-Korrekturen (t11 Any-Budget), Bugfix #409 (Dateianhänge über Copilot+Claude), Korrektur des Release-Workflows.### 🐛 Bug Fixes

-**fix(ci)**: Wort „any“ aus Kommentaren in „openai-responses.ts“ und „chatCore.ts“ entfernen, die die t11-Budgetüberprüfung „any“ nicht bestanden haben (falsch positiv aus Kommentaren zur Regex-Zählung) -**fix(chatCore)**: Nicht unterstützte Inhaltsteiltypen vor der Weiterleitung an Anbieter normalisieren (#409 – Cursor sendet „{type:“file“}`, wenn „.md“-Dateien angehängt sind; Copilot und andere OpenAI-kompatible Anbieter lehnen mit „Typ muss entweder ‚image_url‘ oder ‚text‘ sein“ ab; Fix konvertiert „Datei“-/„Dokument“-Blöcke in „Text“ und löscht unbekannte Typen)### 🔧 Workflow

-**chore(generate-release)**: ATOMIC-COMMIT-REGEL hinzufügen – Versionsupgrade („npm-Versionspatch“) MUSS vor dem Commit von Feature-Dateien erfolgen, um sicherzustellen, dass das Tag immer auf einen Commit verweist, der alle Versionsänderungen zusammen enthält---

## [2.6.8] — 2026-03-17

> Sprint: Combo als Agent (Systemeingabeaufforderung + Toolfilter), Kontext-Caching-Schutz, automatische Aktualisierung, detaillierte Protokolle, MITM Kiro IDE.### 🗄️ DB Migrations (zero-breaking — safe for existing users)

-**005_combo_agent_fields.sql**: „ALTER TABLE Combos ADD COLUMN system_message TEXT DEFAULT NULL“, „tool_filter_regex TEXT DEFAULT NULL“, „context_cache_protection INTEGER DEFAULT 0“. -**006_detailed_request_logs.sql**: Neue Tabelle „request_detail_logs“ mit Ringpuffer-Trigger mit 500 Einträgen, Opt-in über Einstellungsumschaltung### Funktionen

-**feat(combo)**: Überschreiben von Systemnachrichten per Combo (#399 – Das Feld „system_message“ ersetzt oder fügt eine Systemaufforderung vor der Weiterleitung an den Anbieter ein) -**feat(combo)**: Tool Filter Regex per Combo (#399 – „tool_filter_regex“ behält nur Tools bei, die mit Mustern übereinstimmen; unterstützt OpenAI + Anthropic-Formate) -**feat(combo)**: Kontext-Caching-Schutz (#401 – „context_cache_protection“ markiert Antworten mit „<omniModel>provider/model</omniModel>“ und pinnt das Modell für Sitzungskontinuität) -**feat(settings)**: Automatische Aktualisierung über Einstellungen (#320 – „GET /api/system/version“ + „POST /api/system/update“ – prüft die NPM-Registrierung und aktualisiert im Hintergrund mit dem Neustart von PM2) -**feat(logs)**: Detaillierte Anforderungsprotokolle (#378 – erfasst vollständige Pipeline-Körper in 4 Phasen: Client-Anfrage, übersetzte Anfrage, Anbieter-Antwort, Client-Antwort – Opt-in-Umschaltung, 64-KB-Kürzung, Ringpuffer mit 500 Einträgen) -**feat(mitm)**: MITM Kiro IDE-Profil (#336 – „src/mitm/targets/kiro.ts“ zielt auf api.anthropic.com ab und verwendet die vorhandene MITM-Infrastruktur wieder)---

## [2.6.7] — 2026-03-17

> Sprint: SSE-Verbesserungen, lokale Provider_Nodes-Erweiterungen, Proxy-Registrierung, Claude-Passthrough-Korrekturen.### Funktionen

-**feat(health)**: Hintergrund-Gesundheitsprüfung für lokale „provider_nodes“ mit exponentiellem Backoff (30s→300s) und „Promise.allSettled“, um Blockierungen zu vermeiden (#423, @Regis-RCR) -**feat(embeddings)**: „/v1/embeddings“ an lokale „provider_nodes“ weiterleiten – „buildDynamicEmbeddingProvider()“ mit Hostnamen-Validierung (#422, @Regis-RCR) -**feat(audio)**: TTS/STT an lokale „provider_nodes“ weiterleiten – „buildDynamicAudioProvider()“ mit SSRF-Schutz (#416, @Regis-RCR) -**feat(proxy)**: Proxy-Registrierung, Verwaltungs-APIs und Kontingentlimit-Generalisierung (#429, @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Claude-spezifische Felder („metadata“, „anthropic_version“) entfernen, wenn das Ziel OpenAI-kompatibel ist (#421, @prakersh) -**fix(sse)**: Claude SSE-Nutzung („input_tokens“, „output_tokens“, Cache-Tokens) im Passthrough-Stream-Modus extrahieren (#420, @prakersh) -**fix(sse)**: Fallback „call_id“ für Toolaufrufe mit fehlenden/leeren IDs generieren (#419, @prakersh) -**fix(sse)**: Claude-zu-Claude-Passthrough – vorderer Körper völlig unberührt, keine Neuübersetzung (#418, @prakersh) -**fix(sse)**: Filtern Sie verwaiste „tool_result“-Elemente nach der Claude-Code-Kontextkomprimierung, um 400-Fehler zu vermeiden (#417, @prakersh) -**fix(sse)**: Toolaufrufe mit leeren Namen im Responses-API-Übersetzer überspringen, um „placeholder_tool“-Endlosschleifen zu verhindern (#415, @prakersh) -**fix(sse)**: Leere Textinhaltsblöcke vor der Übersetzung entfernen (#427, @prakersh) -**fix(api)**: „refreshable: true“ zur Claude OAuth-Testkonfiguration hinzufügen (#428, @prakersh)### 📦 Dependencies

- Bump „vitest“, „@vitest/\*“ und verwandte devDependencies (#414, @dependabot)---

## [2.6.6] — 2026-03-17

> Hotfix: Turbopack/Docker-Kompatibilität – Entfernen Sie das „node:“-Protokoll aus allen „src/“-Importen.### 🐛 Bug Fixes

-**fix(build)**: Protokollpräfix „node:“ aus „import“-Anweisungen in 17 Dateien unter „src/“ entfernt. Die Importe „node:fs“, „node:path“, „node:url“, „node:os“ usw. führten bei Turbopack-Builds (Next.js 15 Docker) und bei Upgrades von älteren globalen npm-Installationen zu „Die Ecmascript-Datei hatte einen Fehler“. Betroffene Dateien: „migrationRunner.ts“, „core.ts“, „backup.ts“, „prompts.ts“, „dataPaths.ts“ und 12 weitere in „src/app/api/“ und „src/lib/“. -**Aufgabe (Arbeitsablauf)**: „generate-release.md“ wurde aktualisiert, um die Synchronisierung von Docker Hub und die Bereitstellung von Dual-VPS in jeder Version zu**obligatorischen**Schritten zu machen.---

## [2.6.5] — 2026-03-17

> Sprint: Argumentationsmodell-Parameterfilterung, lokaler Anbieter 404-Fix, Kilo-Gateway-Anbieter, Abhängigkeitsbumps.### ✨ New Features

-**feat(api)**:**Kilo Gateway**(`api.kilo.ai`) als neuer API-Schlüsselanbieter (alias `kg`) hinzugefügt – 335+ Modelle, 6 kostenlose Modelle, 3 Autorouting-Modelle („kilo-auto/frontier“, „kilo-auto/balanced“, „kilo-auto/free“). Passthrough-Modelle werden über den Endpunkt „/api/gateway/models“ unterstützt. (PR #408 von @Regis-RCR)### 🐛 Bug Fixes

-**fix(sse)**: Nicht unterstützte Parameter für Argumentationsmodelle (o1, o1-mini, o1-pro, o3, o3-mini) entfernen. Modelle in der Familie „o1“/„o3“ lehnen „temperature“, „top_p“, „frequenz_penalty“, „presence_penalty“, „logprobs“, „top_logprobs“ und „n“ mit HTTP 400 ab. Parameter werden jetzt vor der Weiterleitung auf der Ebene „chatCore“ entfernt. Verwendet ein deklaratives „unsupportedParams“-Feld pro Modell und eine vorberechnete O(1)-Map für die Suche. (PR #412 von @Regis-RCR) -**fix(sse)**: Der lokale Anbieter 404 führt jetzt zu einer**modellspezifischen Sperre (5 Sekunden)**anstelle einer Sperrung auf Verbindungsebene (2 Minuten). Wenn ein lokales Inferenz-Backend (Ollama, LM Studio, oMLX) 404 für ein unbekanntes Modell zurückgibt, bleibt die Verbindung aktiv und andere Modelle arbeiten sofort weiter. Behebt außerdem einen bereits bestehenden Fehler, bei dem „model“ nicht an „markAccountUnavailable()“ übergeben wurde. Lokale Anbieter werden über den Hostnamen erkannt („localhost“, „127.0.0.1“, „::1“, erweiterbar über die Umgebungsvariable „LOCAL_HOSTNAMES“). (PR #410 von @Regis-RCR)### 📦 Dependencies

- `better-sqlite3` 12.6.2 → 12.8.0
- `undici` 7.24.2 → 7.24.4
- `https-proxy-agent` 7 → 8
- „Agentenbasis“ 7 → 8---

## [2.6.4] — 2026-03-17

### 🐛 Bug Fixes

-**Fix(Anbieter)**: Nicht vorhandene Modellnamen bei 5 Anbietern entfernt: -**gemini / gemini-cli**: „gemini-3.1-pro/flash“ und „gemini-3-\*-preview“ entfernt (existieren nicht in Google API v1beta); ersetzt durch „gemini-2.5-pro“, „gemini-2.5-flash“, „gemini-2.0-flash“, „gemini-1.5-pro/flash“. -**Antigravitation**: „gemini-3.1-pro-high/low“ und „gemini-3-flash“ entfernt (ungültige interne Aliase); durch echte 2.x-Modelle ersetzt -**github (Copilot)**: „gemini-3-flash-preview“ und „gemini-3-pro-preview“ entfernt; ersetzt durch „gemini-2.5-flash“. -**nvidia**: „nvidia/llama-3.3-70b-instruct“ → „meta/llama-3.3-70b-instruct“ korrigiert (NVIDIA NIM verwendet den Namensraum „meta/“ für Meta-Modelle); „nvidia/llama-3.1-70b-instruct“ und „nvidia/llama-3.1-405b-instruct“ hinzugefügt -**fix(db/combo)**: „Free-Stack“-Combo auf Remote-DB aktualisiert: „qw/qwen3-coder-plus“ (abgelaufenes Aktualisierungstoken) entfernt, „nvidia/llama-3.3-70b-instruct“ korrigiert → „nvidia/meta/llama-3.3-70b-instruct“, korrigiert „gemini/gemini-3.1-flash“ → „gemini/gemini-2.5-flash“, hinzugefügt „if/deepseek-v3.2“.---

## [2.6.3] — 2026-03-16

> Sprint: Zod/Pino-Hash-Strip in Build-Pipeline integriert, synthetischer Anbieter hinzugefügt, VPS PM2-Pfad korrigiert.### 🐛 Bug Fixes

-**fix(build)**: Turbopack-Hash-Strip läuft jetzt zur**Kompilierungszeit**für ALLE Pakete – nicht nur „better-sqlite3“. Schritt 5.6 in „prepublish.mjs“ geht alle „.js“ in „app/.next/server/“ durch und entfernt das 16-stellige Hex-Suffix aus jedem gehashten „require()“. Behebt „zod-dcb22c...“, „pino-...“ usw. MODULE_NOT_FOUND bei globalen npm-Installationen. Schließt #398 -**fix(deploy)**: PM2 zeigte auf beiden VPS auf veraltete Git-Clone-Verzeichnisse. Im globalen npm-Paket auf „app/server.js“ umkonfiguriert. Aktualisierter „/deploy-vps“-Workflow zur Verwendung von „npm pack + scp“ (npm-Registrierung lehnt 299-MB-Pakete ab).### Funktionen

-**feat(provider)**: Synthetic ([synthetic.new](https://synthetic.new)) – datenschutzorientierte OpenAI-kompatible Inferenz. „passthroughModels: true“ für den dynamischen HuggingFace-Modellkatalog. Erste Modelle: Kimi K2.5, MiniMax M2.5, GLM 4.7, DeepSeek V3.2. (PR #404 von @Regis-RCR)### 📋 Issues Closed

-**Schließen #398**: NPM-Hash-Regression – durch Hash-Strip zur Kompilierungszeit in der Vorveröffentlichung behoben -**Triage #324**: Fehler-Screenshot ohne Schritte – Reproduktionsdetails angefordert---

## [2.6.2] — 2026-03-16

> Sprint: Modul-Hashing vollständig behoben, 2 PRs zusammengeführt (Anthropic-Tools-Filter + benutzerdefinierte Endpunktpfade), Alibaba Cloud DashScope-Anbieter hinzugefügt, 3 veraltete Probleme geschlossen.### 🐛 Bug Fixes

-**fix(build)**: Webpack-„Externals“-Hash-Strip erweitert, um ALLE „serverExternalPackages“ abzudecken, nicht nur „better-sqlite3“. Next.js 16 Turbopack hasht „zod“, „pino“ und jedes andere serverexterne Paket in Namen wie „zod-dcb22c6336e0bc69“, die zur Laufzeit nicht in „node_modules“ vorhanden sind. Ein HASH_PATTERN-Regex-Catch-All entfernt jetzt das 16-Zeichen-Suffix und greift auf den Basispaketnamen zurück. Außerdem wurde „NEXT_PRIVATE_BUILD_WORKER=0“ in „prepublish.mjs“ hinzugefügt, um den Webpack-Modus zu verstärken, sowie einen Post-Build-Scan, der alle verbleibenden Hash-Refs meldet. (#396, #398, PR #403) -**fix(chat)**: Toolnamen im Anthropic-Format („tool.name“ ohne „.function“-Wrapper) wurden durch den in #346 eingeführten Filter für leere Namen stillschweigend gelöscht. LiteLLM leitet Anfragen mit dem Präfix „anthropic/“ im Anthropic Messages API-Format weiter, wodurch alle Tools gefiltert werden und Anthropic „400: tool_choice.any darf nur bei der Bereitstellung von Tools angegeben werden“ zurückgibt. Behoben durch Zurückgreifen auf „tool.name“, wenn „tool.function.name“ fehlt. 8 Regressions-Unit-Tests hinzugefügt. (PR #397)### Funktionen

-**feat(api)**: Benutzerdefinierte Endpunktpfade für OpenAI-kompatible Anbieterknoten – konfigurieren Sie „chatPath“ und „modelsPath“ pro Knoten (z. B. „/v4/chat/completions“) in der Benutzeroberfläche der Anbieterverbindung. Beinhaltet eine DB-Migration (`003_provider_node_custom_paths.sql`) und URL-Pfadbereinigung (kein „..“-Durchlauf, muss mit „/“ beginnen). (PR #400) -**feat(provider)**: Alibaba Cloud DashScope als OpenAI-kompatibler Anbieter hinzugefügt. Internationaler Endpunkt: „dashscope-intl.aliyuncs.com/kompatible-mode/v1“. 12 Modelle: „qwen-max“, „qwen-plus“, „qwen-turbo“, „qwen3-coder-plus/flash“, „qwq-plus“, „qwq-32b“, „qwen3-32b“, „qwen3-235b-a22b“. Auth: Inhaber-API-Schlüssel.### 📋 Issues Closed

-**close #323**: Cline-Verbindungsfehler „[object Object]“ – behoben in v2.3.7; Der Benutzer wurde angewiesen, ein Upgrade von Version 2.2.9 durchzuführen -**schließen #337**: Kiro-Kreditverfolgung – implementiert in v2.5.5 (#381); hat den Benutzer auf Dashboard → Nutzung verwiesen -**Triage #402**: ARM64 macOS DMG beschädigt – macOS-Version angefordert, genauer Fehler und empfohlene Problemumgehung „xattr -d com.apple.quarantine“.---

## [2.6.1] — 2026-03-15

> Kritischer Startup-Fix: Globale NPM-Installationen in Version 2.6.0 stürzten mit einem 500-Fehler aufgrund eines Turbopack/Webpack-Modulnamen-Hashing-Fehlers im Next.js 16-Instrumentierungs-Hook ab.### 🐛 Bug Fixes

-**fix(build)**: Erzwingen Sie, dass „better-sqlite3“ immer mit seinem genauen Paketnamen im Webpack-Server-Bundle erforderlich ist. Next.js 16 hat den Instrumentierungs-Hook in einen separaten Block kompiliert und „require('better-sqlite3-<hash>')“ ausgegeben – einen gehashten Modulnamen, der in „node_modules“ nicht existiert – obwohl das Paket in „serverExternalPackages“ aufgeführt war. Der Server-Webpack-Konfiguration wurde eine explizite „Externals“-Funktion hinzugefügt, sodass der Bundler immer „require('better-sqlite3')“ ausgibt und den Startfehler „500 Internal Server Error“ bei sauberen globalen Installationen behebt. (#394, PR #395)### 🔧 CI

-**ci**: „workflow_dispatch“ zu „npm-publish.yml“ mit Versionssynchronisierungsschutz für manuelle Trigger hinzugefügt (#392) -**ci**: „workflow_dispatch“ zu „docker-publish.yml“ hinzugefügt, GitHub-Aktionen auf die neuesten Versionen aktualisiert (#392)---

## [2.6.0] - 2026-03-15

> Problemlösungssprint: 4 Fehler behoben, Protokolle UX verbessert, Kiro-Kreditverfolgung hinzugefügt.### 🐛 Bug Fixes

-**fix(media)**: ComfyUI und SD WebUI erscheinen nicht mehr in der Anbieterliste der Medienseite, wenn sie nicht konfiguriert sind – ruft „/api/providers“ beim Mounten ab und blendet lokale Anbieter ohne Verbindungen aus (#390) -**fix(auth)**: Round-Robin wählt ratenbegrenzte Konten nicht mehr unmittelbar nach der Abklingzeit erneut aus – „backoffLevel“ wird jetzt als primärer Sortierschlüssel in der LRU-Rotation verwendet (#340) -**fix(oauth)**: Qoder (und andere Anbieter, die auf ihre eigene Benutzeroberfläche umleiten) lassen das OAuth-Modal nicht mehr bei „Warten auf Autorisierung“ hängen – der Popup-geschlossene Detektor wechselt automatisch in den manuellen URL-Eingabemodus (#344) -**fix(logs)**: Die Anforderungsprotokolltabelle ist jetzt im hellen Modus lesbar – Status-Badges, Token-Zählungen und Combo-Tags verwenden adaptive „dark:“-Farbklassen (#378)### Funktionen

-**feat(kiro)**: Kiro-Credit-Tracking zum Nutzungsabrufer hinzugefügt – fragt „getUserCredits“ vom AWS CodeWhisperer-Endpunkt ab (#337)### 🛠 Chores

-**chore(tests)**: `test:plan3`, `test:fixes`, `test:security` so ausgerichtet, dass sie denselben `tsx/esm`-Loader wie `npm test` verwenden – eliminiert falsch negative Ergebnisse bei der Modulauflösung in gezielten Läufen (PR #386)---

## [2.5.9] - 2026-03-15

> Codex native Passthrough-Korrektur + Routenkörper-Validierungshärtung.### 🐛 Bug Fixes

-**Fix(Codex)**: Native Responses API-Passthrough für Codex-Clients beibehalten – vermeidet unnötige Übersetzungsmutationen (PR #387) -**fix(api)**: Anforderungstexte auf Preis-/Synchronisierungs- und Aufgabenrouting-Routen validieren – verhindert Abstürze durch fehlerhafte Eingaben (PR #388) -**fix(auth)**: JWT-Geheimnisse bleiben über „src/lib/db/secrets.ts“ über Neustarts hinweg bestehen – beseitigt 401-Fehler nach dem PM2-Neustart (PR #388)---

## [2.5.8] - 2026-03-15

> Build-Fix: Wiederherstellung der VPS-Konnektivität, die durch die unvollständige Veröffentlichung von v2.5.7 unterbrochen wurde.### 🐛 Bug Fixes

-**fix(build)**: „scripts/prepublish.mjs“ verwendete immer noch das veraltete „--webpack“-Flag, was dazu führte, dass der eigenständige Build von Next.js stillschweigend fehlschlug – npm-Veröffentlichung wurde ohne „app/server.js“ abgeschlossen, wodurch die VPS-Bereitstellung unterbrochen wurde---

## [2.5.7] - 2026-03-15

> Fehlerbehebungen bei der Fehlerbehandlung im Media Playground.### 🐛 Bug Fixes

-**fix(media)**: Transkription „API-Schlüssel erforderlich“ falsch positiv, wenn Audio keine Sprache enthält (Musik, Stille) – zeigt jetzt stattdessen „Keine Sprache erkannt“ an -**fix(media)**: `upstreamErrorResponse` in `audioTranscription.ts` und `audioSpeech.ts` gibt jetzt den richtigen JSON zurück (`{error:{message}}`), was die korrekte Erkennung von 401/403-Anmeldeinformationsfehlern im MediaPageClient ermöglicht -**fix(media)**: „parseApiError“ verarbeitet jetzt das „err_msg“-Feld von Deepgram und erkennt „api key“ in Fehlermeldungen für eine genaue Klassifizierung von Anmeldeinformationsfehlern---

## [2.5.6] - 2026-03-15

> Kritische Sicherheits-/Authentifizierungskorrekturen: Antigravity OAuth defekt + JWT-Sitzungen nach Neustart verloren.### 🐛 Bug Fixes

-**fix(oauth) #384**: Antigravity Google OAuth sendet jetzt korrekt „client_secret“ an den Token-Endpunkt. Der Fallback für „ANTIGRAVITY_OAUTH_CLIENT_SECRET“ war eine leere Zeichenfolge, was falsch ist – „client_secret“ war also nie in der Anfrage enthalten, was bei allen Benutzern ohne eine benutzerdefinierte Umgebungsvariable zu der Fehlermeldung „client_secret fehlt“ führte. Schließt #383. -**fix(auth) #385**: „JWT_SECRET“ wird jetzt bei der ersten Generation in SQLite („namespace='secrets‘‘) beibehalten und bei nachfolgenden Starts neu geladen. Zuvor wurde bei jedem Prozessstart ein neues zufälliges Geheimnis generiert, das alle vorhandenen Cookies/Sitzungen nach jedem Neustart oder Upgrade ungültig machte. Betrifft sowohl „JWT_SECRET“ als auch „API_KEY_SECRET“. Schließt #382.---

## [2.5.5] - 2026-03-15

> Modelllisten-Dedup-Korrektur, Electron-Standalone-Build-Hardening und Kiro-Kreditverfolgung.### 🐛 Bug Fixes

-**fix(models) #380**: „GET /api/models“ schließt jetzt Anbieter-Aliase ein, wenn der Filter für aktive Anbieter erstellt wird – Modelle für „claude“ (Alias ​​„cc“) und „github“ (Alias ​​„gh“) wurden immer angezeigt, unabhängig davon, ob eine Verbindung konfiguriert wurde, da „PROVIDER_MODELS“-Schlüssel Aliase sind, DB-Verbindungen jedoch unter Anbieter-IDs gespeichert werden. Behoben durch Erweiterung jeder aktiven Anbieter-ID, um auch ihren Alias ​​über „PROVIDER_ID_TO_ALIAS“ einzuschließen. Schließt #353. -**fix(electron) #379**: Neues „scripts/prepare-electron-standalone.mjs“ stellt ein dediziertes „/.next/electron-standalone“-Bundle vor der Electron-Verpackung bereit. Bricht mit einem eindeutigen Fehler ab, wenn „node_modules“ ein symbolischer Link ist (Electron-Builder würde eine Laufzeitabhängigkeit von der Build-Maschine ausliefern). Plattformübergreifende Pfadbereinigung über „path.basename“. Von @kfiramar.### ✨ New Features

-**feat(kiro) #381**: Kiro-Guthabenverfolgung – Nutzungsendpunkt gibt jetzt Kreditdaten für Kiro-Konten zurück, indem er „codewhisperer.us-east-1.amazonaws.com/getUserCredits“ aufruft (derselbe Endpunkt, den Kiro IDE intern verwendet). Gibt verbleibende Credits, Gesamtguthaben, Verlängerungsdatum und Abonnementstufe zurück. Schließt #337.## [2.5.4] - 2026-03-15

> Logger-Startup-Fix, Login-Bootstrap-Sicherheitsfix und Verbesserung der Entwicklungs-HMR-Zuverlässigkeit. CI-Infrastruktur gehärtet.### 🐛 Bug Fixes (PRs #374, #375, #376 by @kfiramar)

-**fix(logger) #376**: Pino-Transport-Logger-Pfad wiederherstellen – „formatters.level“ in Kombination mit „transport.targets“ wird von Pino abgelehnt. Transportgestützte Konfigurationen entfernen jetzt den Ebenenformatierer über „getTransportCompatibleConfig()“. Korrigiert außerdem die numerische Ebenenzuordnung in „/api/logs/console“: „30→info, 40→warn, 50→error“ (wurde um eins verschoben). -**fix(login) #375**: Die Anmeldeseite startet jetzt vom öffentlichen „/api/settings/require-login“-Endpunkt statt vom geschützten „/api/settings“. In passwortgeschützten Setups erhielt die Vorauthentifizierungsseite einen 401-Fehler und fiel unnötigerweise auf sichere Standardeinstellungen zurück. Die öffentliche Route gibt jetzt alle Bootstrap-Metadaten („requireLogin“, „hasPassword“, „setupComplete“) mit einem konservativen 200-Fallback bei Fehler zurück. -**fix(dev) #374**: „localhost“ und „127.0.0.1“ zu „allowedDevOrigins“ in „next.config.mjs“ hinzugefügt – HMR-Websocket wurde beim Zugriff auf die App über die Loopback-Adresse blockiert, was zu wiederholten Cross-Origin-Warnungen führte.### 🔧 CI & Infrastructure

-**ESLint OOM-Korrektur**: „eslint.config.mjs“ ignoriert jetzt „vscode-extension/**“, „electron/**“, „docs/**“, „app/.next/**“ und „clipr/**“ – ESLint stürzte mit einem JS-Heap-OOM ab, indem VS-Code-Binärblobs und kompilierte Blöcke gescannt wurden. -**Unit-Test-Korrektur**: Veraltetes „ALTER TABLEprovider_connections ADD COLUMN „group““ aus 2 Testdateien entfernt – Spalte ist jetzt Teil des Basisschemas (hinzugefügt in #373), was bei jedem CI-Lauf zu „SQLITE_ERROR: doppelter Spaltenname“ führt. -**Pre-Commit-Hook\*\*: „npm run test:unit“ zu „.husky/pre-commit“ hinzugefügt – Unit-Tests blockieren jetzt fehlerhafte Commits, bevor sie CI erreichen.## [2.5.3] - 2026-03-14

> Kritische Fehlerbehebungen: DB-Schema-Migration, Laden der Startumgebung, Behebung des Provider-Fehlerstatus und i18n-Tooltip-Korrektur. Verbesserungen der Codequalität zusätzlich zu jeder PR.### 🐛 Bug Fixes (PRs #369, #371, #372, #373 by @kfiramar)

–**fix(db) #373**: Spalte „provider_connections.group“ zum Basisschema + Backfill-Migration für vorhandene Datenbanken hinzufügen – Spalte wurde in allen Abfragen verwendet, fehlte jedoch in der Schemadefinition -**fix(i18n) #371**: Ersetzen Sie den nicht vorhandenen Schlüssel „t("deleteConnection")“ durch den vorhandenen Schlüssel „providers.delete“ – behebt den Laufzeitfehler „MISSING_MESSAGE: issues.deleteConnection“ auf der Anbieterdetailseite -**fix(auth) #372**: Veraltete Fehlermetadaten („errorCode“, „lastErrorType“, „lastErrorSource“) aus Anbieterkonten nach einer echten Wiederherstellung löschen – zuvor wurden wiederhergestellte Konten immer als fehlgeschlagen angezeigt -**fix(startup) #369**: Env-Laden über „npm run start“, „run-standalone.mjs“ und Electron vereinheitlichen, um die Priorität „DATA_DIR/.env → ~/.omniroute/.env → ./.env“ zu berücksichtigen – verhindert die Generierung eines neuen „STORAGE_ENCRYPTION_KEY“ über eine vorhandene verschlüsselte Datenbank### 🔧 Code Quality

- Dokumentierte Muster „result.success“ vs. „response?.ok“ in „auth.ts“ (beide beabsichtigt, jetzt erklärt)
- „overridePath?.trim()“ in „electron/main.js“ normalisiert, um mit „bootstrap-env.mjs“ übereinzustimmen
- Kommentar zur Zusammenführungsreihenfolge „preferredEnv“ beim Start von Electron hinzugefügt

> Kontingentrichtlinie für Codex-Konten mit automatischer Rotation, schneller Stufenumschaltung, GPT-5.4-Modell und Analyse-Label-Korrektur.### ✨ New Features (PRs #366, #367, #368)

-**Codex-Kontingentrichtlinie (PR #366)**: Das Kontingentfenster für 5 Stunden/Woche pro Konto wird im Anbieter-Dashboard umgeschaltet. Konten werden automatisch übersprungen, wenn aktivierte Fenster den Schwellenwert von 90 % erreichen, und nach „resetAt“ wieder zugelassen. Enthält „quotaCache.ts“ mit nebenwirkungsfreiem Status-Getter. -**Codex Fast Tier Toggle (PR #367)**: Dashboard → Einstellungen → Codex Service Tier. Durch die standardmäßige Deaktivierung wird „service_tier: „flex““ nur für Codex-Anfragen eingefügt, wodurch die Kosten um etwa 80 % gesenkt werden. Vollständiger Stack: UI-Registerkarte + API-Endpunkt + Executor + Übersetzer + Startwiederherstellung. -**gpt-5.4-Modell (PR #368)**: Fügt „cx/gpt-5.4“ und „codex/gpt-5.4“ zur Codex-Modellregistrierung hinzu. Regressionstest inklusive.### 🐛 Bug Fixes

-**Fix #356**: Analytics-Diagramme (Top-Anbieter, Nach Konto, Anbieteraufschlüsselung) zeigen jetzt für OpenAI-kompatible Anbieter menschenlesbare Anbieternamen/-bezeichnungen anstelle von rohen internen IDs an.

> Hauptversion: Strategie für strikt zufälliges Routing, Zugriffskontrollen für API-Schlüssel, Verbindungsgruppen, externe Preissynchronisierung und wichtige Fehlerbehebungen für Denkmodelle, Kombinationstests und Validierung von Toolnamen.### ✨ New Features (PRs #363 & #365)

-**Streng-zufällige Routing-Strategie**: Fisher-Yates-Shuffle-Deck mit Anti-Repeat-Garantie und Mutex-Serialisierung für gleichzeitige Anfragen. Unabhängige Decks pro Combo und pro Anbieter. -**API-Schlüsselzugriffskontrollen**: „allowedConnections“ (beschränkt, welche Verbindungen ein Schlüssel verwenden kann), „is_active“ (Schlüssel mit 403 aktivieren/deaktivieren), „accessSchedule“ (zeitbasierte Zugriffskontrolle), „autoResolve“-Umschaltung, Schlüssel über PATCH umbenennen. -**Verbindungsgruppen**: Gruppieren Sie Anbieterverbindungen nach Umgebung. Akkordeonansicht auf der Seite „Limits“ mit LocalStorage-Persistenz und intelligentem automatischen Wechsel. -**Externe Preissynchronisierung (LiteLLM)**: 3-stufige Preisauflösung (Benutzerüberschreibungen → synchronisiert → Standardeinstellungen). Melden Sie sich über „PRICING_SYNC_ENABLED=true“ an. MCP-Tool „omniroute_sync_pricing“. 23 neue Tests. -**i18n**: 30 Sprachen mit strikter Zufallsstrategie und API-Schlüsselverwaltungszeichenfolgen aktualisiert. pt-BR vollständig übersetzt.### 🐛 Bug Fixes

-**Fix #355**: Stream-Leerlauf-Timeout von 60 Sekunden auf 300 Sekunden erhöht – verhindert den Abbruch erweiterter Denkmodelle (claude-opus-4-6, o3 usw.) während langer Argumentationsphasen. Konfigurierbar über „STREAM_IDLE_TIMEOUT_MS“. -**Fix #350**: Der Combo-Test umgeht jetzt „REQUIRE_API_KEY=true“ mithilfe des internen Headers und verwendet universell das OpenAI-kompatible Format. Timeout von 15 auf 20 Sekunden verlängert. -**Fix #346**: Tools mit leerem „function.name“ (weitergeleitet von Claude Code) werden jetzt gefiltert, bevor Upstream-Anbieter sie erhalten, wodurch Fehler „Ungültige Eingabe[N].name: leere Zeichenfolge“ verhindert werden.### 🗑️ Closed Issues

-**#341**: Debug-Abschnitt entfernt – Ersatz ist „/dashboard/logs“ und „/dashboard/health“.

> API-Key-Round-Robin-Unterstützung für Multi-Key-Anbieter-Setups und Bestätigung von Wildcard-Routing und Quotenfenster-Rolling, das bereits vorhanden ist.### ✨ New Features

-**API-Schlüssel-Round-Robin (T07)**: Anbieterverbindungen können jetzt mehrere API-Schlüssel enthalten (Verbindung bearbeiten → Zusätzliche API-Schlüssel). Anfragen rotieren im Round-Robin-Verfahren zwischen Primär- und Zusatzschlüsseln über „providerSpecificData.extraApiKeys[]“. Schlüssel werden pro Verbindung indiziert im Speicher gehalten – es sind keine Änderungen am DB-Schema erforderlich.### 📝 Already Implemented (confirmed in audit)

-**Wildcard Model Routing (T13)**: „wildcardRouter.ts“ mit Wildcard-Matching im Glob-Stil („gpt\*“, „claude-?-sonnet“ usw.) ist bereits in „model.ts“ mit Spezifitätsranking integriert. -**Quota Window Rolling (T08)**: „accountFallback.ts:isModelLocked()“ erweitert das Fenster bereits automatisch – wenn „Date.now() > enter.until“, wird die Sperre sofort gelöscht (keine veraltete Blockierung).

> Verfeinerung der Benutzeroberfläche, Ergänzungen der Routing-Strategie und elegante Fehlerbehandlung für Nutzungsbeschränkungen.### ✨ New Features

-**Fill-First- und P2C-Routing-Strategien**: „Fill-First“ (Kontingent entleeren, bevor es weitergeht) und „P2C“ (Power-of-Two-Choices-Auswahl mit geringer Latenz) zur Combo-Strategie-Auswahl hinzugefügt, mit vollständigen Anleitungsfeldern und farbcodierten Abzeichen. -**Kostenlose Stack-Voreinstellungsmodelle**: Beim Erstellen einer Kombination mit der Free Stack-Vorlage werden jetzt automatisch 7 erstklassige kostenlose Anbietermodelle ausgefüllt (Gemini CLI, Kiro, Qoder×2, Qwen, NVIDIA NIM, Groq). Benutzer aktivieren einfach die Anbieter und erhalten sofort eine Kombination von 0 $/Monat. -**Breiteres Combo-Modal**: Das Combo-Modal zum Erstellen/Bearbeiten verwendet jetzt „max-w-4xl“ für die komfortable Bearbeitung großer Combos.### 🐛 Bug Fixes

-**Limits-Seite HTTP 500 für Codex & GitHub**: „getCodexUsage()“ und „getGitHubUsage()“ geben jetzt eine benutzerfreundliche Meldung zurück, wenn der Anbieter 401/403 (abgelaufenes Token) zurückgibt, anstatt einen 500-Fehler auf der Limits-Seite auszulösen und zu verursachen. -**MaintenanceBanner falsch positiv**: Das Banner zeigt beim Laden der Seite nicht mehr fälschlicherweise „Server ist nicht erreichbar“ an. Behoben durch Aufruf von „checkHealth()“ direkt beim Mounten und Entfernen veralteter „show“-State-Abschlüsse. -**Tooltips für Anbietersymbole**: Die Symbolschaltflächen „Bearbeiten“ (Bleistift) und „Löschen“ in der Anbieterverbindungszeile verfügen jetzt über native HTML-Tooltips – alle 6 Aktionssymbole sind jetzt selbstdokumentiert.

> Mehrere Verbesserungen durch Community-Problemanalyse, Unterstützung neuer Anbieter, Fehlerbehebungen für Token-Tracking, Modellrouting und Streaming-Zuverlässigkeit.### ✨ New Features

-**Task-Aware Smart Routing (T05)**: Automatische Modellauswahl basierend auf dem Inhaltstyp der Anfrage – Codierung → Deepseek-Chat, Analyse → Gemini-2.5-Pro, Vision → GPT-4o, Zusammenfassung → Gemini-2.5-Flash. Konfigurierbar über Einstellungen. Neue API „GET/PUT/POST /api/settings/task-routing“. -**HuggingFace-Anbieter**: HuggingFace Router als OpenAI-kompatibler Anbieter mit Llama 3.1 70B/8B, Qwen 2.5 72B, Mistral 7B, Phi-3.5 Mini hinzugefügt. -**Vertex AI-Anbieter**: Vertex AI (Google Cloud)-Anbieter mit Gemini 2.5 Pro/Flash, Gemma 2 27B, Claude über Vertex hinzugefügt. -**Playground-Datei-Uploads**: Audio-Upload für die Transkription, Bild-Upload für Vision-Modelle (automatische Erkennung anhand des Modellnamens), Inline-Bildrendering für Ergebnisse der Bildgenerierung. -**Visuelles Feedback zur Modellauswahl**: Bereits hinzugefügte Modelle in der Kombinationsauswahl zeigen jetzt ✓ grünes Abzeichen – verhindert doppelte Verwirrung. -**Qwen-Kompatibilität (PR #352)**: Aktualisierte User-Agent- und CLI-Fingerabdruckeinstellungen für die Kompatibilität mit Qwen-Anbietern. -**Round-Robin-Statusverwaltung (PR #349)**: Verbesserte Round-Robin-Logik zur Handhabung ausgeschlossener Konten und zur korrekten Aufrechterhaltung des Rotationsstatus. -**Clipboard UX (PR #360)**: Gehärtete Zwischenablageoperationen mit Fallback für nicht sichere Kontexte; Verbesserungen bei der Normalisierung des Claude-Tools.### 🐛 Bug Fixes

-**Fix #302 – OpenAI SDK stream=False löscht tool_calls**: T01 Accept-Header-Aushandlung erzwingt kein Streaming mehr, wenn „body.stream“ explizit „false“ ist. Hat dazu geführt, dass „tool_calls“ stillschweigend gelöscht wurden, wenn das OpenAI Python SDK im Nicht-Streaming-Modus verwendet wurde. -**Fix #73 – Claude Haiku wurde ohne Provider-Präfix an OpenAI weitergeleitet**: „claude-_“-Modelle, die ohne Provider-Präfix gesendet wurden, leiten jetzt korrekt an den „Antigravity“-Anbieter (Anthropic) weiter. Auch die Heuristik „gemini-_“/„gemma-\*“ → „gemini“ hinzugefügt. -**Fix #74 – Token-Zählungen immer 0 für Antigravity/Claude-Streaming**: Das SSE-Ereignis „message_start“, das „input_tokens“ trägt, wurde von „extractUsage()“ nicht analysiert, was dazu führte, dass alle Eingabe-Token-Zählungen abfielen. Die Verfolgung von Eingabe-/Ausgabe-Tokens funktioniert jetzt korrekt für Streaming-Antworten. -**Fix #180 – Modellimport-Duplikate ohne Rückmeldung**: „ModelSelectModal“ zeigt jetzt eine ✓ grüne Hervorhebung für Modelle an, die sich bereits in der Kombination befinden, wodurch deutlich wird, dass sie bereits hinzugefügt wurden. -**Fehler bei der Generierung von Medienseiten**: Bildergebnisse werden jetzt als „<img>“-Tags statt als rohes JSON gerendert. Transkriptionsergebnisse werden als lesbarer Text angezeigt. Bei Anmeldeinformationsfehlern wird anstelle eines stillen Fehlers ein gelbes Banner angezeigt. -**Schaltfläche zur Token-Aktualisierung auf der Anbieterseite**: Benutzeroberfläche zur manuellen Token-Aktualisierung für OAuth-Anbieter hinzugefügt.### 🔧 Improvements

-**Provider Registry**: HuggingFace und Vertex AI zu „providerRegistry.ts“ und „providers.ts“ (Frontend) hinzugefügt. -**Lese-Cache**: Neues „src/lib/db/readCache.ts“ für effizientes DB-Lese-Caching. -**Kontingent-Cache**: Verbesserter Kontingent-Cache mit TTL-basierter Räumung.### 📦 Dependencies

- `dompurify` → 3.3.3 (PR #347)
- `undici` → 7.24.2 (PR #348, #361)
- „docker/setup-qemu-action“ → v4 (PR #342)
- „docker/setup-buildx-action“ → v4 (PR #343)### 📁 New Files

| Datei                                         | Zweck                                            |
| --------------------------------------------- | ------------------------------------------------ | ----------------------- |
| `open-sse/services/taskAwareRouter.ts`        | Aufgabenbewusste Routing-Logik (7 Aufgabentypen) |
| `src/app/api/settings/task-routing/route.ts`  | Task-Routing-Konfigurations-API                  |
| `src/app/api/providers/[id]/refresh/route.ts` | Manuelle Aktualisierung des OAuth-Tokens         |
| `src/lib/db/readCache.ts`                     | Effizienter DB-Lese-Cache                        |
| `src/shared/utils/clipboard.ts`               | Gehärtete Zwischenablage mit Fallback            | ## [2.4.1] - 2026-03-13 |

### 🐛 Fix

-**Combos modal: Free Stack sichtbar und hervorgehoben**– Free Stack-Vorlage wurde ausgeblendet (4. im 3-Spalten-Raster). Behoben: Auf Position 1 verschoben, auf 2x2-Raster umgestellt, sodass alle 4 Vorlagen sichtbar sind, grüner Rand + KOSTENLOSE Badge-Hervorhebung.## [2.4.0] - 2026-03-13

> **Hauptversion**– Free-Stack-Ökosystem, Überarbeitung des Transkriptionsspielplatzes, mehr als 44 Anbieter, umfassende kostenlose Dokumentation und allgemeine Verbesserungen der Benutzeroberfläche.### Funktionen

-**Combos: Free Stack-Vorlage**– Neue 4. Vorlage „Free Stack ($0)“ mit Round-Robin über Kiro + Qoder + Qwen + Gemini CLI. Schlägt bei der ersten Verwendung die vorgefertigte Null-Kosten-Kombination vor. -**Medien/Transkription: Deepgram als Standard**– Deepgram (Nova 3, 200 $ kostenlos) ist jetzt der Standard-Transkriptionsanbieter. AssemblyAI (50 $ kostenlos) und Groq Whisper (für immer kostenlos) werden mit kostenlosen Guthabenabzeichen angezeigt. -**README: Abschnitt „Kostenlos starten“**– Neue frühe README-5-Schritte-Tabelle, die zeigt, wie man in wenigen Minuten kostenlose KI einrichtet. -**README: Kostenlose Transkriptionskombination**– Neuer Abschnitt mit Deepgram/AssemblyAI/Groq-Kombinationsvorschlägen und kostenlosen Kreditdetails pro Anbieter. -**providers.ts: hasFree-Flag**– NVIDIA NIM, Cerebras und Groq sind mit dem hasFree-Logo und freeNote für die Benutzeroberfläche des Anbieters gekennzeichnet. -**i18n: templateFreeStack-Schlüssel**– Kostenlose Stack-Kombinationsvorlage übersetzt und in alle 30 Sprachen synchronisiert.## [2.3.16] - 2026-03-13

### Dokumentation

-**README: 44+ Providers**– Alle drei Vorkommen von „36+ Providers“ wurden auf „44+“ aktualisiert, was die tatsächliche Codebasisanzahl widerspiegelt (44 Provider in Providers.ts). -**README: Neuer Abschnitt „🆓 Kostenlose Modelle – Was Sie tatsächlich bekommen“**– 7-Anbieter-Tabelle mit Ratenbegrenzungen pro Modell hinzugefügt für: Kiro (Claude unbegrenzt über AWS Builder ID), Qoder (5 Modelle unbegrenzt), Qwen (4 Modelle unbegrenzt), Gemini CLI (180.000/Monat), NVIDIA NIM (~40 RPM dev-forever), Cerebras (1 Mio. Token/Tag / 60.000 TPM), Groq (30 RPM). / 14,4K RPD). Enthält die \/usr/bin/bash Ultimate Free Stack-Kombinationsempfehlung. -**README: Preistabelle aktualisiert**– Cerebras zur API KEY-Stufe hinzugefügt, NVIDIA von „1000 Credits“ auf „Dev-forever free“ korrigiert, Anzahl und Namen der Qoder/Qwen-Modelle aktualisiert -**README: Qoder 8→5 Modelle**(benannt: kimi-k2-thinking, qwen3-coder-plus, deepseek-r1, minimax-m2, kimi-k2) -**README: Qwen 3→4 Modelle**(benannt: qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next, vision-model)## [2.3.15] - 2026-03-13

### Funktionen

-**Auto-Combo-Dashboard (Stufenpriorität)**: „🏷️ Tier“ als 7. Bewertungsfaktorbezeichnung in der Faktoraufschlüsselungsanzeige „/dashboard/auto-combo“ hinzugefügt – alle 7 Auto-Combo-Bewertungsfaktoren sind jetzt sichtbar. -**i18n – AutoCombo-Abschnitt**: 20 neue Übersetzungsschlüssel für das Auto-Combo-Dashboard („title“, „status“, „modePack“, „providerScores“, „factorTierPriority“ usw.) zu allen 30 Sprachdateien hinzugefügt.## [2.3.14] - 2026-03-13

### 🐛 Bug Fixes

-**Qoder OAuth (#339)**: Der gültige Standard „clientSecret“ wurde wiederhergestellt – war zuvor eine leere Zeichenfolge, was bei jedem Verbindungsversuch zu „Ungültige Client-Anmeldeinformationen“ führte. Die öffentlichen Anmeldeinformationen sind jetzt der Standard-Fallback (überschreibbar über die Umgebungsvariable „QODER_OAUTH_CLIENT_SECRET“). -**MITM-Server nicht gefunden (#335)**: „prepublish.mjs“ kompiliert jetzt „src/mitm/\*.ts“ mit „tsc“ in JavaScript, bevor es in das npm-Bundle kopiert wird. Bisher wurden nur rohe „.ts“-Dateien kopiert – was bedeutet, dass „server.js“ in globalen npm/Volta-Installationen nie existierte. -**GeminiCLI fehlt projectId (#338)**: Anstatt einen harten 500-Fehler auszulösen, wenn „projectId“ in gespeicherten Anmeldeinformationen fehlt (z. B. nach einem Docker-Neustart), protokolliert OmniRoute jetzt eine Warnung und versucht die Anfrage auszuführen – es wird ein aussagekräftiger anbieterseitiger Fehler anstelle eines OmniRoute-Absturzes zurückgegeben. -**Electron-Versionskonflikt (#323)**: Die Version „electron/package.json“ wurde mit „2.3.13“ synchronisiert (war „2.0.13“), sodass die Desktop-Binärversion mit dem npm-Paket übereinstimmt.### ✨ New Models (#334)

-**Kiro**: „claude-sonnet-4“, „claude-opus-4.6“, „deepseek-v3.2“, „minimax-m2.1“, „qwen3-coder-next“, „auto“. -**Codex**: `gpt5.4`### 🔧 Improvements

-**Tier-Scoring (API + Validierung)**: „tierPriority“ (Gewichtung „0,05“) zum Zod-Schema „ScoringWeights“ und zur API-Route „combos/auto“ hinzugefügt – der 7. Scoring-Faktor wird jetzt vollständig von der REST-API akzeptiert und bei der Eingabe validiert. Das „Stabilitäts“-Gewicht wurde von „0,10“ auf „0,05“ angepasst, um die Gesamtsumme = „1,0“ beizubehalten.### ✨ New Features

-**Gestaffelte Kontingentbewertung (Auto-Combo)**: „TierPriority“ als 7. Bewertungsfaktor hinzugefügt – Konten mit Ultra/Pro-Stufen werden jetzt gegenüber kostenlosen Stufen bevorzugt, wenn andere Faktoren gleich sind. Neue optionale Felder „accountTier“ und „quotaResetIntervalSecs“ auf „ProviderCandidate“. Alle 4 Moduspakete aktualisiert („Schnell versenden“, „Kostensparend“, „Qualität geht vor“, „Offline-freundlich“). -**Intra-Family Model Fallback (T5)**: Wenn ein Modell nicht verfügbar ist (404/400/403), greift OmniRoute jetzt automatisch auf Geschwistermodelle aus derselben Familie zurück, bevor ein Fehler zurückgegeben wird („modelFamilyFallback.ts“). -**Konfigurierbares API-Bridge-Timeout**: Mit der Umgebungsvariable „API_BRIDGE_PROXY_TIMEOUT_MS“ können Bediener das Proxy-Timeout optimieren (Standard 30 Sekunden). Behebt 504-Fehler bei langsamen Upstream-Antworten. (#332) -**Star History**: Das star-history.com-Widget wurde in allen 30 READMEs durch starchart.cc („?variant=adaptive“) ersetzt – passt sich dem Hell-/Dunkel-Thema an und wird in Echtzeit aktualisiert.### 🐛 Bug Fixes

-**Auth – Erstmaliges Passwort**: Die Umgebungsvariable „INITIAL*PASSWORD“ wird jetzt beim Festlegen des ersten Dashboard-Passworts akzeptiert. Verwendet „timingSafeEqual“ für einen konstanten Zeitvergleich und verhindert so Timing-Angriffe. (#333) -**README-Kürzung**: Ein fehlendes schließendes Tag „</details>“ im Abschnitt „Fehlerbehebung“ wurde behoben, das dazu führte, dass GitHub nicht mehr alles darunter renderte (Tech Stack, Dokumente, Roadmap, Mitwirkende). -**pnpm-Installation**: Redundante „@swc/helpers“-Überschreibung aus „package.json“ entfernt, die mit der direkten Abhängigkeit in Konflikt stand und „EOVERRIDE“-Fehler auf pnpm verursachte. Konfiguration „pnpm.onlyBuiltDependencies“ hinzugefügt. -**CLI Path Injection (T12)**: „isSafePath()“-Validator in „cliRuntime.ts“ hinzugefügt, um Pfaddurchquerung und Shell-Metazeichen in „CLI*\*\_BIN“-Umgebungsvariablen zu blockieren. -**CI**: „package-lock.json“ wurde nach dem Entfernen des Overrides neu generiert, um „npm ci“-Fehler in GitHub-Aktionen zu beheben.### 🔧 Improvements

-**Antwortformat (T1)**: „response_format“ (json_schema/json_object) wird jetzt als Systemeingabeaufforderung für Claude eingefügt, wodurch die Kompatibilität mit strukturierten Ausgaben ermöglicht wird. -**429-Wiederholung (T2)**: Intra-URL-Wiederholungsversuch für 429 Antworten (2× Versuche mit 2 Sekunden Verzögerung), bevor auf die nächste URL zurückgegriffen wird. -**Gemini-CLI-Header (T3)**: Fingerabdruck-Header „User-Agent“ und „X-Goog-Api-Client“ für Gemini-CLI-Kompatibilität hinzugefügt. -**Preiskatalog (T9)**: Preiseinträge für „deepseek-3.1“, „deepseek-3.2“ und „qwen3-coder-next“ hinzugefügt.### 📁 New Files

| Datei                                      | Zweck                                                         |
| ------------------------------------------ | ------------------------------------------------------------- | --------- |
| `open-sse/services/modelFamilyFallback.ts` | Modellfamiliendefinitionen und familieninterne Fallback-Logik | ### Fixed |

-**KiloCode**: Zeitüberschreitung bei Kilocode-Gesundheitsprüfung bereits in Version 2.3.11 behoben -**OpenCode**: Fügen Sie Opencode zur cliRuntime-Registrierung mit einem Zeitlimit von 15 Sekunden für die Integritätsprüfung hinzu -**OpenClaw / Cursor**: Erhöhen Sie das Timeout für die Gesundheitsprüfung auf 15 Sekunden für Varianten mit langsamem Start -**VPS**: Droid- und Openclaw-NPM-Pakete installieren; Aktivieren Sie CLI_EXTRA_PATHS für kiro-cli -**cliRuntime**: Opencode-Tool-Registrierung hinzufügen und Timeout für die Fortsetzung erhöhen## [2.3.11] - 2026-03-12

### Fixed

-**KiloCode-Gesundheitscheck**: „healthcheckTimeoutMs“ von 4000 ms auf 15000 ms erhöhen – Kilocode rendert beim Start ein ASCII-Logo-Banner, was in Umgebungen mit langsamem/Kaltstart zu einem falschen „healthcheck_failed“ führt## [2.3.10] - 2026-03-12

### Fixed

-**Lint**: „check:any-budget:t11“-Fehler behoben – „as any“ durch „as Record<string, unbekannt>“ in OAuthModal.tsx ersetzen (3 Vorkommen)### Docs

-**CLI-TOOLS.md**: Vollständige Anleitung für alle 11 CLI-Tools (Claude, Codex, Gemini, Opencode, Cline, Kilocode, Continue, Kiro-Cli, Cursor, Droid, Openclaw) -**i18n**: CLI-TOOLS.md mit 30 Sprachen synchronisiert, mit übersetztem Titel + Intro## [2.3.8] - 2026-03-12

## [2.3.9] - 2026-03-12

### Added

-**/v1/completions**: Neuer Legacy-OpenAI-Abschlussendpunkt – akzeptiert sowohl die Zeichenfolge „prompt“ als auch das Array „messages“ und normalisiert sich automatisch auf das Chat-Format -**EndpointPage**: Zeigt jetzt alle drei OpenAI-kompatiblen Endpunkttypen an: Chat-Abschlüsse, Antwort-API und Legacy-Abschlüsse -**i18n**: „completionsLegacy/completionsLegacyDesc“ zu 30 Sprachdateien hinzugefügt### Fixed

-**OAuthModal**: Korrigieren Sie „[object Object]“, das bei allen OAuth-Verbindungsfehlern angezeigt wird – extrahieren Sie „.message“ ordnungsgemäß aus Fehlerantwortobjekten in allen drei „throw new Error(data.error)“-Aufrufen (Exchange, Device-Code, Authorize).
– Betrifft Cline, Codex, GitHub, Qwen, Kiro und alle anderen OAuth-Anbieter## [2.3.7] - 2026-03-12

### Fixed

-**Cline OAuth**: Fügen Sie „decodeURIComponent“ vor der Base64-Dekodierung hinzu, damit URL-codierte Authentifizierungscodes aus der Rückruf-URL korrekt analysiert werden, wodurch Fehler „Ungültiger oder abgelaufener Autorisierungscode“ bei Remote-Einrichtungen (LAN-IP) behoben werden -**Cline OAuth**: „mapTokens“ füllt jetzt „name = firstName + lastName ||“ aus email`, damit Cline-Konten echte Benutzernamen anstelle von „Konto-ID“ anzeigen -**OAuth-Kontonamen**: Alle OAuth-Austauschströme (Exchange, Poll, Poll-Callback) normalisieren jetzt „Name = E-Mail“, wenn der Name fehlt, sodass jedes OAuth-Konto seine E-Mail-Adresse als Anzeigebezeichnung im Anbieter-Dashboard anzeigt -**OAuth-Kontonamen**: Sequentielles „Konto N“-Fallback in „db/providers.ts“ entfernt – Konten ohne E-Mail/Name verwenden jetzt über „getAccountDisplayName()“ eine stabile ID-basierte Bezeichnung anstelle einer fortlaufenden Nummer, die sich ändert, wenn Konten gelöscht werden## [2.3.6] - 2026-03-12

### Fixed

-**Provider-Testbatch**: Das Zod-Schema wurde so korrigiert, dass es „providerId: null“ akzeptiert (Frontend sendet null für Nicht-Provider-Modi); gab fälschlicherweise für alle Batch-Tests „Ungültige Anfrage“ zurück -**Provider-Testmodal**: Die Anzeige von „[object Object]“ wurde korrigiert, indem API-Fehlerobjekte vor dem Rendern in „setTestResults“ und „ProviderTestResultsView“ in Strings normalisiert wurden -**i18n**: Fehlende Schlüssel „cliTools.toolDescriptions.opencode“, „cliTools.toolDescriptions.kiro“, „cliTools.guides.opencode“, „cliTools.guides.kiro“ zu „en.json“ hinzugefügt -**i18n**: 1111 fehlende Schlüssel in allen 29 nicht-englischsprachigen Dateien synchronisiert, wobei englische Werte als Fallbacks verwendet wurden## [2.3.5] - 2026-03-11

### Fixed

-**@swc/helpers**: Permanenter „Postinstall“-Fix hinzugefügt, um „@swc/helpers“ in die „node_modules“ der eigenständigen App zu kopieren – verhindert MODULE_NOT_FOUND-Absturz bei globalen npm-Installationen## [2.3.4] - 2026-03-10

### Added

- Mehrere Anbieterintegrationen und Dashboard-Verbesserungen
