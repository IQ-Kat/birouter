# Troubleshooting (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Běžné problémy a řešení pro OmniRoute.---

## Quick Fixes

| Problém                                  | Řešení                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------- | --- |
| První přihlášení nefunguje               | Nastavit `INITIAL_PASSWORD` v `.env` (žádné napevno zakódované výchozí nastavení)     |
| Dashboard se otevírá na nesprávném portu | Nastavit `PORT=20128` a `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                 |
| Žádné záznamy požadavků pod `logs/`      | Nastavte `ENABLE_REQUEST_LOGS=true`                                                   |
| EACCES: povolení odepřeno                | Nastavte `DATA_DIR=/cesta/k/zapisovatelnému/adresáři` tak, aby přepsal `~/.omniroute` |
| Strategie směrování se neukládá          | Aktualizace na v1.4.11+ (oprava schématu Zod pro trvalost nastavení)                  | --- |

## Provider Issues

### "Language model did not provide messages"

**Příčina:**Kvóta poskytovatele je vyčerpána.

**Oprava:**

1. Zkontrolujte sledování kvót na řídicím panelu
2. Použijte kombinaci se záložními úrovněmi
3. Přejděte na levnější/bezplatnou úroveň### Rate Limiting

**Příčina:**Vyčerpaná kvóta předplatného.

**Oprava:**

– Přidejte záložní: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

- Použijte GLM/MiniMax jako levnou zálohu### OAuth Token Expired

OmniRoute automaticky obnovuje tokeny. Pokud problémy přetrvávají:

1. Ovládací panel → Poskytovatel → Znovu připojit
2. Odstraňte a znovu přidejte připojení poskytovatele---

## Cloud Issues

### Cloud Sync Errors

1. Ověřte, že `BASE_URL` odkazuje na vaši spuštěnou instanci (např. `http://localhost:20128`)
2. Ověřte, že `CLOUD_URL` odkazuje na váš koncový bod cloudu (např. `https://omniroute.dev`)
3. Udržujte hodnoty `NEXT_PUBLIC_*` zarovnané s hodnotami na straně serveru### Cloud `stream=false` Returns 500

**Příznak:**`Neočekávaný token 'd'...` na koncovém bodu cloudu pro nestreamovaná volání.

**Příčina:**Upstream vrací užitečné zatížení SSE, zatímco klient očekává JSON.

**Řešení:**Pro přímá cloudová volání použijte `stream=true`. Místní běhové prostředí zahrnuje záložní SSE→JSON.### Cloud Says Connected but "Invalid API key"

1. Vytvořte nový klíč z místního řídicího panelu (`/api/keys`)
2. Spusťte synchronizaci s cloudem: Povolte cloud → Synchronizovat nyní
3. Staré/nesynchronizované klíče mohou v cloudu stále vracet „401“.---

## Docker Issues

### CLI Tool Shows Not Installed

1. Zkontrolujte pole runtime: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Pro přenosný režim: použijte cíl obrazu `runner-cli` (přibalená rozhraní CLI)
3. Pro režim připojení hostitele: nastavte `CLI_EXTRA_PATHS` a připojte adresář hostitele bin jako pouze pro čtení
4. Pokud `installed=true` a `runnable=false`: binární soubor byl nalezen, ale neprošel zdravotní kontrolou### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Zkontrolujte statistiky využití v Dashboard → Usage
2. Přepněte primární model na GLM/MiniMax
3. Pro nekritické úkoly používejte bezplatnou vrstvu (Gemini CLI, Qoder).
4. Nastavte rozpočty nákladů na klíč API: Dashboard → API Keys → Budget---

## Debugging

### Enable Request Logs

V souboru `.env` nastavte `ENABLE_REQUEST_LOGS=true`. Protokoly se zobrazují v adresáři `logs/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Hlavní stav: `${DATA_DIR}/storage.sqlite` (poskytovatelé, komba, aliasy, klíče, nastavení)
- Použití: SQLite tabulky v `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + volitelné `${DATA_DIR}/log.txt` a `${DATA_DIR}/call_logs/`
- Protokoly požadavků: `<repo>/logs/...` (když `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Když je jistič poskytovatele OTEVŘENÝ, požadavky jsou blokovány, dokud nevyprší cooldown.

**Oprava:**

1. Přejděte na**Hlavní panel → Nastavení → Odolnost**
2. Zkontrolujte kartu jističe pro dotčeného poskytovatele
3. Kliknutím na**Resetovat vše**vymažete všechny jističe nebo počkejte, až vyprší cooldown
4. Před resetováním ověřte, zda je poskytovatel skutečně dostupný### Provider keeps tripping the circuit breaker

Pokud poskytovatel opakovaně přejde do stavu OTEVŘENO:

1. Zkontrolujte**Dashboard → Health → Provider Health**pro vzor selhání
2. Přejděte na**Nastavení → Odolnost → Profily poskytovatelů**a zvyšte práh selhání
3. Zkontrolujte, zda poskytovatel nezměnil limity API nebo vyžaduje opětovné ověření
4. Zkontrolujte telemetrii latence – vysoká latence může způsobit selhání na základě časového limitu---

## Audio Transcription Issues

### "Unsupported model" error

- Ujistěte se, že používáte správnou předponu: `deepgram/nova-3` nebo `assemblyai/best`
  – Ověřte, že je poskytovatel připojen v**Dashboard → Providers**### Transcription returns empty or fails

- Zkontrolujte podporované zvukové formáty: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Ověřte, zda je velikost souboru v rámci limitů poskytovatele (obvykle < 25 MB)
- Zkontrolujte platnost klíče API poskytovatele na kartě poskytovatele---

## Translator Debugging

K ladění problémů s překladem formátu použijte**Dashboard → Translator**:

| Režim                | Kdy použít                                                                                                  |
| -------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Hřiště**           | Porovnejte vstupní/výstupní formáty vedle sebe — vložte neúspěšný požadavek, abyste viděli, jak se překládá |
| **Chat Tester**      | Odesílejte živé zprávy a kontrolujte celý obsah požadavku/odpovědi včetně záhlaví                           |
| **Zkušební stolice** | Spusťte dávkové testy napříč kombinacemi formátů, abyste zjistili, které překlady jsou poškozené            |
| **Živý monitor**     | Sledujte tok požadavků v reálném čase, abyste zachytili občasné problémy s překladem                        | ### Common format issues |

-**Značky myšlení se nezobrazují**— Zkontrolujte, zda cílový poskytovatel podporuje myšlení a nastavení rozpočtu na myšlení -**Přerušení volání nástroje**— Některé překlady formátů mohou odstranit nepodporovaná pole; ověřit v režimu Playground -**Chybí systémová výzva**– Claude a Gemini zacházejí s výzvami systému odlišně; zkontrolovat překladový výstup
–**SDK vrací surový řetězec místo objektu**– Opraveno ve verzi 1.1.0: sanitizér odpovědi nyní odstraňuje nestandardní pole (`x_groq`, `usage_breakdown` atd.), která způsobují selhání ověření OpenAI SDK Pydantic -**GLM/ERNIE odmítá `systémovou` roli**— Opraveno ve verzi 1.1.0: normalizátor rolí automaticky spojuje systémové zprávy do uživatelských zpráv pro nekompatibilní modely

- Role**`vývojáře` nebyla rozpoznána**— Opraveno ve verzi 1.1.0: automaticky převedeno na `systém` pro poskytovatele mimo OpenAI -**`json_schema` nefunguje s Gemini**– Opraveno ve verzi 1.1.0: `response_format` je nyní převeden na Gemini `responseMimeType` + `responseSchema`---

## Resilience Settings

### Auto rate-limit not triggering

– Automatický limit sazby se vztahuje pouze na poskytovatele klíčů API (nikoli OAuth/předplatné)

- Ověřte, zda je v**Nastavení → Odolnost → Profily poskytovatelů**povolen automatický limit rychlosti
- Zkontrolujte, zda poskytovatel vrací stavové kódy `429` nebo záhlaví `Retry-After`### Tuning exponential backoff

Profily poskytovatelů podporují tato nastavení:

-**Základní zpoždění**— Počáteční doba čekání po prvním selhání (výchozí: 1s)
–**Max. zpoždění**– Maximální doba čekání (výchozí: 30 s) -**Multiplikátor**– o kolik se má prodloužit zpoždění při po sobě jdoucím selhání (výchozí: 2x)### Anti-thundering herd

Když mnoho souběžných požadavků zasáhne poskytovatele s omezenou rychlostí, OmniRoute použije mutex + automatické omezování rychlosti k serializaci požadavků a prevenci kaskádových selhání. To je automatické pro poskytovatele klíčů API.---

## Optional RAG / LLM failure taxonomy (16 problems)

Někteří uživatelé OmniRoute umístí bránu před RAG nebo zásobníky agentů. V těchto nastaveních je běžné vidět podivný vzorec: OmniRoute vypadá zdravě (poskytovatelé jsou v pořádku, směrovací profily jsou v pořádku, žádná upozornění na omezení rychlosti), ale konečná odpověď je stále špatná.

V praxi tyto incidenty obvykle pocházejí z navazujícího potrubí RAG, nikoli ze samotné brány.

Pokud chcete sdílený slovník pro popis těchto selhání, můžete použít WFGY ProblemMap, externí textový zdroj licence MIT, který definuje šestnáct opakujících se vzorců selhání RAG / LLM. Na vysoké úrovni pokrývá:

- posun vyhledávání a porušené hranice kontextu
- prázdné nebo zastaralé indexy a vektorová úložiště
- vkládání versus sémantický nesoulad
- rychlé sestavení a problémy s kontextovým oknem
- logický kolaps a příliš sebevědomé odpovědi
- selhání koordinace dlouhých řetězců a agentů
- multiagentní paměť a posun rolí
- problémy s nasazením a objednáním bootstrapu

Myšlenka je jednoduchá:

1. Když prozkoumáte špatnou odpověď, zachyťte:
   - uživatelský úkol a požadavek
   - kombinace trasy nebo poskytovatele v OmniRoute
   - jakýkoli kontext RAG použitý po proudu (načtené dokumenty, volání nástrojů atd.)
2. Namapujte incident na jedno nebo dvě čísla WFGY ProblemMap (`č.1` … `č.16`).
3. Uložte číslo na svůj vlastní řídicí panel, runbook nebo sledovač incidentů vedle protokolů OmniRoute.
4. Použijte příslušnou stránku WFGY k rozhodnutí, zda potřebujete změnit strategii zásobníku RAG, retrieveru nebo směrování.

Celý text a konkrétní recepty jsou k dispozici zde (licence MIT, pouze text):

[SOUBOR WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Tuto sekci můžete ignorovat, pokud za OmniRoute nespouštíte RAG nebo agenty.---

## Still Stuck?

–**Problémy s GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Architecture**: Interní podrobnosti viz [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) -**Reference API**: Všechny koncové body viz [`docs/API_REFERENCE.md`](API_REFERENCE.md) -**Health Dashboard**: Zkontrolujte**Dashboard → Health**pro stav systému v reálném čase -**Translator**: K ladění problémů s formátem použijte**Dashboard → Translator**
