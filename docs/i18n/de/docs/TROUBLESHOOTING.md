# Troubleshooting (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Häufige Probleme und Lösungen für OmniRoute.---

## Quick Fixes

| Problem                                    | Lösung                                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------- | --- |
| Erster Login funktioniert nicht            | Legen Sie „INITIAL_PASSWORD“ in „.env“ fest (keine fest codierte Standardeinstellung) |
| Dashboard wird am falschen Port geöffnet   | Setzen Sie „PORT=20128“ und „NEXT_PUBLIC_BASE_URL=http://localhost:20128“             |
| Keine Anforderungsprotokolle unter „logs/“ | Setzen Sie „ENABLE_REQUEST_LOGS=true“                                                 |
| EACCES: Berechtigung verweigert            | Setzen Sie „DATA_DIR=/path/to/writable/dir“, um „~/.omniroute“ zu überschreiben       |
| Routing-Strategie wird nicht gespeichert   | Update auf v1.4.11+ (Zod-Schema-Korrektur für Einstellungspersistenz)                 | --- |

## Provider Issues

### "Language model did not provide messages"

**Ursache:**Anbieterkontingent erschöpft.

**Fix:**

1. Überprüfen Sie den Quoten-Tracker im Dashboard
2. Verwenden Sie eine Kombination mit Fallback-Stufen
3. Wechseln Sie zum günstigeren/kostenlosen Tarif### Rate Limiting

**Ursache:**Das Abonnementkontingent ist erschöpft.

**Fix:**

- Fallback hinzufügen: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Verwenden Sie GLM/MiniMax als günstiges Backup### OAuth Token Expired

OmniRoute aktualisiert Token automatisch. Wenn die Probleme weiterhin bestehen:

1. Dashboard → Anbieter → Erneut verbinden
2. Löschen Sie die Provider-Verbindung und fügen Sie sie erneut hinzu---

## Cloud Issues

### Cloud Sync Errors

1. Überprüfen Sie, ob „BASE_URL“ auf Ihre laufende Instanz verweist (z. B. „http://localhost:20128“).
2. Überprüfen Sie, ob „CLOUD_URL“ auf Ihren Cloud-Endpunkt verweist (z. B. „https://omniroute.dev“).
3. Halten Sie die Werte von „NEXT*PUBLIC*\*“ an den serverseitigen Werten ausgerichtet### Cloud `stream=false` Returns 500

**Symptom:**„Unerwartetes Token „d“...“ auf dem Cloud-Endpunkt für Nicht-Streaming-Aufrufe.

**Ursache:**Upstream gibt SSE-Nutzdaten zurück, während der Client JSON erwartet.

**Problemumgehung:**Verwenden Sie „stream=true“ für Cloud-Direktaufrufe. Die lokale Laufzeit umfasst SSE→JSON-Fallback.### Cloud Says Connected but "Invalid API key"

1. Erstellen Sie einen neuen Schlüssel aus dem lokalen Dashboard („/api/keys“).
2. Führen Sie die Cloud-Synchronisierung aus: Cloud aktivieren → Jetzt synchronisieren
3. Alte/nicht synchronisierte Schlüssel können in der Cloud immer noch „401“ zurückgeben---

## Docker Issues

### CLI Tool Shows Not Installed

1. Überprüfen Sie die Laufzeitfelder: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Für den tragbaren Modus: Verwenden Sie das Image-Ziel „runner-cli“ (gebündelte CLIs).
3. Für den Host-Mount-Modus: Legen Sie „CLI_EXTRA_PATHS“ fest und mounten Sie das Host-Bin-Verzeichnis als schreibgeschützt
4. Wenn „installed=true“ und „runnable=false“: Binärdatei wurde gefunden, aber die Integritätsprüfung ist fehlgeschlagen### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Überprüfen Sie die Nutzungsstatistiken im Dashboard → Nutzung
2. Primärmodell auf GLM/MiniMax umstellen
3. Nutzen Sie den kostenlosen Tarif (Gemini CLI, Qoder) für unkritische Aufgaben
4. Legen Sie Kostenbudgets pro API-Schlüssel fest: Dashboard → API-Schlüssel → Budget---

## Debugging

### Enable Request Logs

Setzen Sie „ENABLE_REQUEST_LOGS=true“ in Ihrer „.env“-Datei. Protokolle werden im Verzeichnis „logs/“ angezeigt.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Hauptstatus: „${DATA_DIR}/storage.sqlite“ (Anbieter, Kombinationen, Aliase, Schlüssel, Einstellungen)
- Verwendung: SQLite-Tabellen in „storage.sqlite“ („usage_history“, „call_logs“, „proxy_logs“) + optional „${DATA_DIR}/log.txt“ und „${DATA_DIR}/call_logs/“.
- Protokolle anfordern: `<repo>/logs/...` (wenn `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Wenn der Leistungsschalter eines Anbieters OFFEN ist, werden Anfragen blockiert, bis die Abklingzeit abgelaufen ist.

**Fix:**

1. Gehen Sie zu**Dashboard → Einstellungen → Resilienz**
2. Überprüfen Sie die Leistungsschalterkarte des betroffenen Anbieters
3. Klicken Sie auf**Alle zurücksetzen**, um alle Unterbrecher zu löschen, oder warten Sie, bis die Abklingzeit abgelaufen ist
4. Stellen Sie vor dem Zurücksetzen sicher, dass der Anbieter tatsächlich verfügbar ist### Provider keeps tripping the circuit breaker

Wenn ein Anbieter wiederholt in den OPEN-Zustand wechselt:

1. Überprüfen Sie**Dashboard → Health → Provider Health**auf das Fehlermuster
2. Gehen Sie zu**Einstellungen → Ausfallsicherheit → Anbieterprofile**und erhöhen Sie den Fehlerschwellenwert
3. Überprüfen Sie, ob der Anbieter die API-Grenzwerte geändert hat oder eine erneute Authentifizierung erfordert
4. Überprüfen Sie die Latenz-Telemetrie – hohe Latenz kann zu zeitüberschreitungsbedingten Fehlern führen---

## Audio Transcription Issues

### "Unsupported model" error

- Stellen Sie sicher, dass Sie das richtige Präfix verwenden: „deepgram/nova-3“ oder „assemblyai/best“.
- Überprüfen Sie, ob der Anbieter unter**Dashboard → Anbieter**verbunden ist.### Transcription returns empty or fails

- Überprüfen Sie die unterstützten Audioformate: „mp3“, „wav“, „m4a“, „flac“, „ogg“, „webm“.
- Stellen Sie sicher, dass die Dateigröße innerhalb der Anbietergrenzen liegt (normalerweise < 25 MB).
- Überprüfen Sie die Gültigkeit des API-Schlüssels des Anbieters auf der Anbieterkarte---

## Translator Debugging

Verwenden Sie**Dashboard → Übersetzer**, um Formatübersetzungsprobleme zu beheben:

| Modus            | Wann zu verwenden                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Spielplatz**   | Vergleichen Sie Eingabe-/Ausgabeformate nebeneinander – fügen Sie eine fehlgeschlagene Anfrage ein, um zu sehen, wie sie übersetzt wird |
| **Chat-Tester**  | Senden Sie Live-Nachrichten und überprüfen Sie die vollständige Anfrage-/Antwort-Nutzlast einschließlich Header                         |
| **Prüfstand**    | Führen Sie Stapeltests über Formatkombinationen hinweg durch, um herauszufinden, welche Übersetzungen fehlerhaft sind                   |
| **Live-Monitor** | Beobachten Sie den Anfragefluss in Echtzeit, um zeitweise auftretende Übersetzungsprobleme zu erkennen                                  | ### Common format issues |

-**Thinking-Tags werden nicht angezeigt**– Überprüfen Sie, ob der Zielanbieter Thinking und die Einstellung des Thinking-Budgets unterstützt -**Tool-Aufrufe löschen**– Bei einigen Formatübersetzungen werden möglicherweise nicht unterstützte Felder entfernt. im Playground-Modus überprüfen -**Systemaufforderung fehlt**– Claude und Gemini gehen unterschiedlich mit Systemaufforderungen um; Überprüfen Sie die Übersetzungsausgabe -**SDK gibt Rohzeichenfolge statt Objekt zurück**– In Version 1.1.0 behoben: Antwortbereinigung entfernt jetzt nicht standardmäßige Felder (`x_groq`, `usage_breakdown` usw.), die zu OpenAI SDK Pydantic-Validierungsfehlern führen -**GLM/ERNIE lehnt „System“-Rolle ab**– In Version 1.1.0 behoben: Der Rollennormalisierer führt automatisch Systemmeldungen in Benutzermeldungen für inkompatible Modelle zusammen -**Rolle „Entwickler“ nicht erkannt**– In Version 1.1.0 behoben: Für Nicht-OpenAI-Anbieter automatisch in „System“ konvertiert -**`json_schema` funktioniert nicht mit Gemini**– In v1.1.0 behoben: `response_format` wird jetzt in Geminis `responseMimeType` + `responseSchema` konvertiert---

## Resilience Settings

### Auto rate-limit not triggering

– Die automatische Ratenbegrenzung gilt nur für API-Schlüsselanbieter (nicht OAuth/Abonnement).

- Überprüfen Sie, ob in**Einstellungen → Ausfallsicherheit → Anbieterprofile**die automatische Ratenbegrenzung aktiviert ist
- Überprüfen Sie, ob der Anbieter „429“-Statuscodes oder „Retry-After“-Header zurückgibt### Tuning exponential backoff

Anbieterprofile unterstützen diese Einstellungen:

-**Basisverzögerung**– Anfängliche Wartezeit nach dem ersten Fehler (Standard: 1 s) -**Max. Verzögerung**– Maximale Wartezeitobergrenze (Standard: 30 s) -**Multiplikator**– Wie viel Verzögerung pro aufeinanderfolgendem Fehler erhöht werden soll (Standard: 2x)### Anti-thundering herd

Wenn viele gleichzeitige Anfragen einen Anbieter mit begrenzter Rate treffen, verwendet OmniRoute Mutex + automatische Ratenbegrenzung, um Anfragen zu serialisieren und kaskadierende Fehler zu verhindern. Dies geschieht automatisch für API-Schlüsselanbieter.---

## Optional RAG / LLM failure taxonomy (16 problems)

Einige OmniRoute-Benutzer platzieren das Gateway vor RAG- oder Agent-Stacks. In diesen Setups ist es üblich, ein seltsames Muster zu erkennen: OmniRoute sieht fehlerfrei aus (Anbieter aktiv, Routing-Profile in Ordnung, keine Ratenbegrenzungswarnungen), aber die endgültige Antwort ist immer noch falsch.

In der Praxis gehen diese Vorfälle meist von der nachgelagerten RAG-Pipeline aus, nicht vom Gateway selbst.

Wenn Sie ein gemeinsames Vokabular zur Beschreibung dieser Fehler wünschen, können Sie die WFGY ProblemMap verwenden, eine externe MIT-Lizenztextressource, die sechzehn wiederkehrende RAG-/LLM-Fehlermuster definiert. Auf hohem Niveau umfasst es:

- Abrufdrift und gebrochene Kontextgrenzen
- leere oder veraltete Indizes und Vektorspeicher
- Einbettung versus semantische Nichtübereinstimmung
- Probleme mit der Eingabeaufforderung und dem Kontextfenster
- Zusammenbruch der Logik und übertriebene Antworten
- Fehler bei der Koordinierung langer Ketten und Agenten
- Multiagentengedächtnis und Rollendrift
- Probleme bei der Bereitstellung und Bootstrap-Reihenfolge

Die Idee ist einfach:

1. Wenn Sie eine schlechte Antwort untersuchen, erfassen Sie Folgendes:
   - Benutzeraufgabe und -anfrage
   - Routen- oder Anbieterkombination in OmniRoute
   - jeglicher RAG-Kontext, der nachgelagert verwendet wird (abgerufene Dokumente, Tool-Aufrufe usw.)
2. Ordnen Sie den Vorfall einer oder zwei WFGY ProblemMap-Nummern („Nr. 1“ … „Nr. 16“) zu.
3. Speichern Sie die Nummer in Ihrem eigenen Dashboard, Runbook oder Incident-Tracker neben den OmniRoute-Protokollen.
4. Verwenden Sie die entsprechende WFGY-Seite, um zu entscheiden, ob Sie Ihren RAG-Stack, Retriever oder Ihre Routing-Strategie ändern müssen.

Volltext und konkrete Rezepte gibt es hier (MIT-Lizenz, nur Text):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Sie können diesen Abschnitt ignorieren, wenn Sie keine RAG- oder Agent-Pipelines hinter OmniRoute ausführen.---

## Still Stuck?

-**GitHub-Probleme**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Architektur**: Interne Details finden Sie unter [`docs/ARCHITECTURE.md`](ARCHITECTURE.md). -**API-Referenz**: Siehe [`docs/API_REFERENCE.md`](API_REFERENCE.md) für alle Endpunkte -**Gesundheits-Dashboard**: Überprüfen Sie**Dashboard → Gesundheit**auf den Echtzeit-Systemstatus -**Übersetzer**: Verwenden Sie**Dashboard → Übersetzer**, um Formatprobleme zu beheben
