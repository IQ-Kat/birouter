# Troubleshooting (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Veelvoorkomende problemen en oplossingen voor OmniRoute.---

## Quick Fixes

| Probleem                            | Oplossing                                                                   |
| ----------------------------------- | --------------------------------------------------------------------------- | --- |
| Eerste login werkt niet             | Stel `INITIAL_PASSWORD` in `.env` in (geen hardgecodeerde standaard)        |
| Dashboard opent op verkeerde poort  | Stel `PORT=20128` en `NEXT_PUBLIC_BASE_URL=http://localhost:20128`          |
| Geen verzoeklogboeken onder `logs/` | Stel `ENABLE_REQUEST_LOGS=true`                                             | in  |
| EACCES: toestemming geweigerd       | Stel `DATA_DIR=/path/to/writable/dir` in om `~/.omniroute` te overschrijven |
| Routeringsstrategie bespaart niet   | Update naar v1.4.11+ (Zod-schemafix voor persistentie van instellingen)     | --- |

## Provider Issues

### "Language model did not provide messages"

**Oorzaak:**Providerquotum is opgebruikt.

**Opgelost:**

1. Controleer de dashboardquotatracker
2. Gebruik een combo met fallback-lagen
3. Schakel over naar het goedkopere/gratis niveau### Rate Limiting

**Oorzaak:**Abonnementsquota zijn opgebruikt.

**Opgelost:**

- Terugval toevoegen: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Gebruik GLM/MiniMax als goedkope back-up### OAuth Token Expired

OmniRoute vernieuwt tokens automatisch. Als de problemen aanhouden:

1. Dashboard → Provider → Opnieuw verbinden
2. Verwijder de providerverbinding en voeg deze opnieuw toe---

## Cloud Issues

### Cloud Sync Errors

1. Controleer of `BASE_URL` verwijst naar uw actieve exemplaar (bijvoorbeeld `http://localhost:20128`)
2. Controleer of `CLOUD_URL` verwijst naar uw cloudeindpunt (bijvoorbeeld `https://omniroute.dev`)
3. Zorg ervoor dat de waarden van `NEXT_PUBLIC_*` uitgelijnd zijn met de waarden op de server### Cloud `stream=false` Returns 500

**Symptoom:**`Onverwacht token 'd'...` op cloudeindpunt voor niet-streaming oproepen.

**Oorzaak:**Upstream retourneert SSE-payload terwijl de client JSON verwacht.

**Oplossing:**Gebruik `stream=true` voor directe cloudoproepen. Lokale runtime omvat SSE → JSON-fallback.### Cloud Says Connected but "Invalid API key"

1. Maak een nieuwe sleutel vanuit het lokale dashboard (`/api/keys`)
2. Voer cloudsynchronisatie uit: Schakel Cloud in → Nu synchroniseren
3. Oude/niet-gesynchroniseerde sleutels kunnen nog steeds '401' retourneren in de cloud---

## Docker Issues

### CLI Tool Shows Not Installed

1. Controleer runtimevelden: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Voor draagbare modus: gebruik afbeeldingsdoel `runner-cli` (gebundelde CLI's)
3. Voor host-aankoppelmodus: stel `CLI_EXTRA_PATHS` in en koppel de hostbin-directory aan als alleen-lezen
4. Indien `geïnstalleerd=true` en `runnable=false`: binair bestand is gevonden maar de gezondheidscontrole is mislukt### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Controleer gebruiksstatistieken in Dashboard → Gebruik
2. Schakel het primaire model over naar GLM/MiniMax
3. Gebruik de gratis laag (Gemini CLI, Qoder) voor niet-kritieke taken
4. Stel kostenbudgetten per API-sleutel in: Dashboard → API-sleutels → Budget---

## Debugging

### Enable Request Logs

Stel `ENABLE_REQUEST_LOGS=true` in uw `.env`-bestand in. Logboeken verschijnen onder de map `logs/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Hoofdstatus: `${DATA_DIR}/storage.sqlite` (providers, combo's, aliassen, sleutels, instellingen)
- Gebruik: SQLite-tabellen in `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + optioneel `${DATA_DIR}/log.txt` en `${DATA_DIR}/call_logs/`
- Logboeken aanvragen: `<repo>/logs/...` (wanneer `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Wanneer de stroomonderbreker van een provider OPEN is, worden verzoeken geblokkeerd totdat de cooldown is verstreken.

**Opgelost:**

1. Ga naar**Dashboard → Instellingen → Veerkracht**
2. Controleer de stroomonderbrekerkaart van de betreffende provider
3. Klik op**Alles resetten**om alle onderbrekers te wissen, of wacht tot de cooldown is verstreken
4. Controleer of de provider daadwerkelijk beschikbaar is voordat u reset### Provider keeps tripping the circuit breaker

Als een aanbieder herhaaldelijk in de OPEN-status komt:

1. Controleer**Dashboard → Gezondheid → Providergezondheid**voor het foutpatroon
2. Ga naar**Instellingen → Veerkracht → Providerprofielen**en verhoog de foutdrempel
3. Controleer of de provider de API-limieten heeft gewijzigd of herauthenticatie vereist
4. Controleer latentie-telemetrie: hoge latentie kan op time-outs gebaseerde fouten veroorzaken---

## Audio Transcription Issues

### "Unsupported model" error

- Zorg ervoor dat u het juiste voorvoegsel gebruikt: `deepgram/nova-3` of `assemblyai/best`
- Controleer of de provider is verbonden in**Dashboard → Providers**### Transcription returns empty or fails

- Controleer ondersteunde audioformaten: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Controleer of de bestandsgrootte binnen de limieten van de provider ligt (doorgaans < 25 MB)
- Controleer de geldigheid van de API-sleutel van de provider op de providerkaart---

## Translator Debugging

Gebruik**Dashboard → Vertaler**om problemen met de vertaling van formaten op te lossen:

| Modus           | Wanneer gebruiken                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Speeltuin**   | Vergelijk invoer-/uitvoerformaten naast elkaar - plak een mislukt verzoek om te zien hoe het zich vertaalt |
| **Chattester**  | Verzend live berichten en inspecteer de volledige payload van verzoeken/antwoorden, inclusief headers      |
| **Proefbank**   | Voer batchtests uit voor indelingscombinaties om te ontdekken welke vertalingen niet werken                |
| **Livemonitor** | Bekijk de realtime aanvraagstroom om intermitterende vertaalproblemen op te sporen                         | ### Common format issues |

-**Thinking-tags verschijnen niet**— Controleer of de doelaanbieder het denken en de instelling van het denkbudget ondersteunt -**Tooloproepen vervallen**— Bij sommige formaatvertalingen kunnen niet-ondersteunde velden worden verwijderd; verifiëren in Speeltuinmodus -**Systeemprompt ontbreekt**— Claude en Gemini behandelen de systeemprompts anders; controleer de vertalingsuitvoer -**SDK retourneert onbewerkte tekenreeks in plaats van object**— Opgelost in v1.1.0: respons sanitizer verwijdert nu niet-standaard velden (`x_groq`, `usage_breakdown`, enz.) die OpenAI SDK Pydantic-validatiefouten veroorzaken -**GLM/ERNIE wijst de `systeem`-rol af**— Opgelost in v1.1.0: de rolnormalizer voegt systeemberichten automatisch samen met gebruikersberichten voor incompatibele modellen -**`rol van ontwikkelaar` wordt niet herkend**— Opgelost in v1.1.0: automatisch geconverteerd naar `systeem` voor niet-OpenAI-providers -**`json_schema` werkt niet met Gemini**— Opgelost in v1.1.0: `response_format` wordt nu geconverteerd naar Gemini's `responseMimeType` + `responseSchema`---

## Resilience Settings

### Auto rate-limit not triggering

- Automatische tarieflimiet is alleen van toepassing op API-sleutelproviders (niet op OAuth/abonnement)
- Controleer of bij Instellingen → Veerkracht → Providerprofielen\*\*automatische tarieflimiet is ingeschakeld
- Controleer of de provider statuscodes '429' of headers 'Retry-After' retourneert### Tuning exponential backoff

Providerprofielen ondersteunen deze instellingen:

-**Basisvertraging**— Initiële wachttijd na eerste storing (standaard: 1s) -**Max. vertraging**— Maximale wachttijdlimiet (standaard: 30s) -**Vermenigvuldiger**— Hoeveel vertraging per opeenvolgende fout moet worden vergroot (standaard: 2x)### Anti-thundering herd

Wanneer veel gelijktijdige verzoeken een provider met een beperkte snelheid bereiken, gebruikt OmniRoute mutex + automatische snelheidsbeperking om verzoeken te serialiseren en trapsgewijze fouten te voorkomen. Dit gebeurt automatisch voor API-sleutelproviders.---

## Optional RAG / LLM failure taxonomy (16 problems)

Sommige OmniRoute-gebruikers plaatsen de gateway vóór RAG- of agentstacks. In deze instellingen is het gebruikelijk om een ​​vreemd patroon te zien: OmniRoute ziet er gezond uit (providers actief, routeringsprofielen ok, geen waarschuwingen over de snelheidslimiet), maar het uiteindelijke antwoord is nog steeds verkeerd.

In de praktijk komen deze incidenten meestal van de stroomafwaartse RAG-pijpleiding en niet van de gateway zelf.

Als u een gedeelde woordenschat wilt om deze fouten te beschrijven, kunt u de WFGY ProblemMap gebruiken, een externe MIT-licentietekstbron die zestien terugkerende RAG / LLM-foutpatronen definieert. Op een hoog niveau omvat het:

- retrieval drift en verbroken contextgrenzen
- lege of verouderde indexen en vectorwinkels
- inbedding versus semantische mismatch
- problemen met snelle montage en contextvensters
- logische ineenstorting en overmoedige antwoorden
- mislukkingen in de lange keten en de coördinatie van agenten
- Multi-agentgeheugen en rolafwijking
- implementatie- en bootstrap-bestellingsproblemen

Het idee is simpel:

1. Wanneer je een slechte reactie onderzoekt, leg dan vast:
   - gebruikerstaak en -verzoek
   - route- of providercombinatie in OmniRoute
   - elke RAG-context die stroomafwaarts wordt gebruikt (opgehaalde documenten, tooloproepen, enz.)
2. Wijs het incident toe aan een of twee WFGY ProblemMap-nummers (`No.1` … `No.16`).
3. Bewaar het nummer in uw eigen dashboard, runbook of incidenttracker naast de OmniRoute-logboeken.
4. Gebruik de bijbehorende WFGY-pagina om te beslissen of u uw RAG-stack, retriever of routeringsstrategie moet wijzigen.

Volledige tekst en concrete recepten staan hier (MIT-licentie, alleen tekst):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

U kunt deze sectie negeren als u geen RAG- of agentpijplijnen achter OmniRoute uitvoert.---

## Still Stuck?

-**GitHub-problemen**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Architectuur**: zie [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) voor interne details -**API-referentie**: zie [`docs/API_REFERENCE.md`](API_REFERENCE.md) voor alle eindpunten -**Gezondheidsdashboard**: controleer**Dashboard → Gezondheid**voor de realtime systeemstatus -**Vertaler**: gebruik**Dashboard → Vertaler**om formaatproblemen op te lossen
