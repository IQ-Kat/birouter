# Troubleshooting (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Bežné problémy a riešenia pre OmniRoute.---

## Quick Fixes

| Problém                                         | Riešenie                                                                    |
| ----------------------------------------------- | --------------------------------------------------------------------------- | --- |
| Prvé prihlásenie nefunguje                      | Nastaviť `INITIAL_PASSWORD` v `.env` (žiadne napevno zakódované predvolené) |
| Prístrojová doska sa otvára na nesprávnom porte | Nastaviť `PORT=20128` a `NEXT_PUBLIC_BASE_URL=http://localhost:20128`       |
| Žiadne záznamy žiadostí pod `logs/`             | Nastavte `ENABLE_REQUEST_LOGS=true`                                         |
| EACCES: povolenie zamietnuté                    | Nastavte `DATA_DIR=/path/to/writable/dir` na prepísanie `~/.omniroute`      |
| Stratégia smerovania sa neukladá                | Aktualizácia na v1.4.11+ (Oprava schémy Zod pre pretrvávanie nastavení)     | --- |

## Provider Issues

### "Language model did not provide messages"

**Príčina:**Kvóta poskytovateľa je vyčerpaná.

**Oprava:**

1. Skontrolujte sledovanie kvót palubnej dosky
2. Použite kombináciu so záložnými vrstvami
3. Prejdite na lacnejšiu/bezplatnú úroveň### Rate Limiting

**Príčina:**Kvóta odberov je vyčerpaná.

**Oprava:**

– Pridajte záložný kód: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

- Použite GLM/MiniMax ako lacnú zálohu### OAuth Token Expired

OmniRoute automaticky obnovuje tokeny. Ak problémy pretrvávajú:

1. Dashboard → Provider → Reconnect
2. Odstráňte a znova pridajte pripojenie poskytovateľa---

## Cloud Issues

### Cloud Sync Errors

1. Overte, či „BASE_URL“ odkazuje na vašu spustenú inštanciu (napr. „http://localhost:20128“)
2. Overte, že `CLOUD_URL` odkazuje na váš koncový bod cloudu (napr. `https://omniroute.dev`)
3. Ponechajte hodnoty „NEXT*PUBLIC*\*“ zarovnané s hodnotami na strane servera### Cloud `stream=false` Returns 500

**Príznak:**`Neočakávaný token 'd'...` na koncovom bode cloudu pre hovory bez streamovania.

**Príčina:**Upstream vracia užitočné zaťaženie SSE, zatiaľ čo klient očakáva JSON.

**Náhradné riešenie:**Pre priame hovory v cloude použite `stream=true`. Lokálne prostredie runtime zahŕňa záložnú verziu SSE→JSON.### Cloud Says Connected but "Invalid API key"

1. Vytvorte nový kľúč z miestneho informačného panela (`/api/keys`)
2. Spustite synchronizáciu s cloudom: Povoliť cloud → Synchronizovať teraz
3. Staré/nesynchronizované kľúče môžu v cloude stále vrátiť „401“.---

## Docker Issues

### CLI Tool Shows Not Installed

1. Skontrolujte runtime polia: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Pre prenosný režim: použite image target `runner-cli` (pribalené CLI)
3. Pre režim pripojenia hostiteľa: nastavte `CLI_EXTRA_PATHS` a pripojte adresár bin hostiteľa ako iba na čítanie
4. Ak `installed=true` a `runnable=false`: binárny súbor bol nájdený, ale zlyhala kontrola stavu### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Skontrolujte štatistiky používania v Dashboard → Usage
2. Prepnite primárny model na GLM/MiniMax
3. Na nekritické úlohy používajte bezplatnú vrstvu (Gemini CLI, Qoder).
4. Nastavte rozpočty nákladov na kľúč API: Dashboard → API Keys → Budget---

## Debugging

### Enable Request Logs

Vo svojom súbore .env nastavte hodnotu `ENABLE_REQUEST_LOGS=true`. Protokoly sa zobrazujú v adresári `logs/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Hlavný stav: `${DATA_DIR}/storage.sqlite` (poskytovatelia, kombá, aliasy, kľúče, nastavenia)
- Použitie: tabuľky SQLite v `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + voliteľné `${DATA_DIR}/log.txt` a `${DATA_DIR}/call_logs/`
- Denníky žiadostí: `<repo>/logs/...` (keď `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Keď je istič poskytovateľa OTVORENÝ, požiadavky sú zablokované, kým nevyprší cooldown.

**Oprava:**

1. Prejdite na**Hlavný panel → Nastavenia → Odolnosť**
2. Skontrolujte kartu ističa príslušného poskytovateľa
3. Kliknite na**Reset All**, aby ste vymazali všetky ističe, alebo počkajte, kým uplynie cooldown
4. Pred resetovaním skontrolujte, či je poskytovateľ skutočne dostupný### Provider keeps tripping the circuit breaker

Ak poskytovateľ opakovane prejde do stavu OTVORENÉ:

1. Vzor zlyhania nájdete v**Dashboard → Health → Provider Health**
2. Prejdite na**Nastavenia → Odolnosť → Profily poskytovateľa**a zvýšte prah zlyhania
3. Skontrolujte, či poskytovateľ zmenil limity API alebo či nevyžaduje opätovné overenie
4. Skontrolujte telemetriu latencie – vysoká latencia môže spôsobiť zlyhania súvisiace s časovým limitom---

## Audio Transcription Issues

### "Unsupported model" error

- Uistite sa, že používate správnu predponu: `deepgram/nova-3` alebo `assemblyai/best`
  – Overte, či je poskytovateľ pripojený v**Dashboard → Providers**### Transcription returns empty or fails

- Skontrolujte podporované zvukové formáty: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Overte, či je veľkosť súboru v rámci limitov poskytovateľa (zvyčajne < 25 MB)
- Skontrolujte platnosť kľúča API poskytovateľa na karte poskytovateľa---

## Translator Debugging

Na ladenie problémov s prekladom formátu použite**Dashboard → Translator**:

| Režim                 | Kedy použiť                                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Ihrisko**           | Porovnajte vstupné/výstupné formáty vedľa seba — prilepte neúspešnú požiadavku, aby ste videli, ako sa prekladá |
| **Tester chatu**      | Posielajte živé správy a skontrolujte celý obsah žiadosti/odpovede vrátane hlavičiek                            |
| **Testovacia lavica** | Spustite dávkové testy kombinácií formátov, aby ste zistili, ktoré preklady sú poškodené                        |
| **Živý monitor**      | Sledujte tok žiadostí v reálnom čase, aby ste zachytili občasné problémy s prekladom                            | ### Common format issues |

-**Značky myslenia sa nezobrazujú**— Skontrolujte, či cieľový poskytovateľ podporuje myslenie a nastavenie rozpočtu na myslenie -**Volania nástrojov klesajú**– Niektoré preklady formátov môžu odstrániť nepodporované polia; overiť v režime Playground -**Chýba systémová výzva**– Claude a Gemini riešia výzvy systému odlišne; skontrolujte výstup prekladu
–**SDK vracia nespracovaný reťazec namiesto objektu**– Opravené vo verzii 1.1.0: nástroj na dezinfekciu odpovede teraz odstraňuje neštandardné polia (`x_groq`, `usage_breakdown` atď.), ktoré spôsobujú zlyhania overenia OpenAI SDK Pydantic -**GLM/ERNIE odmieta `systémovú` rolu**— Opravené vo verzii 1.1.0: normalizátor rolí automaticky spája systémové správy do užívateľských správ pre nekompatibilné modely

- Rola**`vývojára` nie je rozpoznaná**— Opravené vo verzii 1.1.0: automaticky prevedené na `systém` pre poskytovateľov, ktorí nie sú OpenAI -**`json_schema` nefunguje s Gemini**– Opravené vo verzii 1.1.0: `response_format` je teraz skonvertovaný na `responseMimeType` + `responseSchema` Gemini---

## Resilience Settings

### Auto rate-limit not triggering

- Automatický limit sadzby sa vzťahuje len na poskytovateľov kľúčov API (nie OAuth/predplatné)
- Skontrolujte, či je v**Nastaveniach → Odolnosť → Profily poskytovateľov**povolený automatický limit rýchlosti
- Skontrolujte, či poskytovateľ vracia stavové kódy `429` alebo hlavičky `Retry-After`### Tuning exponential backoff

Profily poskytovateľov podporujú tieto nastavenia:

-**Základné oneskorenie**— Počiatočná doba čakania po prvom zlyhaní (predvolené: 1 s)
–**Maximálne oneskorenie**– Obmedzenie maximálnej doby čakania (predvolené: 30 s) -**Násobiteľ**– o koľko sa má predĺžiť oneskorenie pri následnom zlyhaní (predvolené: 2x)### Anti-thundering herd

Keď mnoho súbežných požiadaviek zasiahne poskytovateľa s obmedzenou rýchlosťou, OmniRoute použije mutex + automatické obmedzenie rýchlosti na serializáciu požiadaviek a zabránenie kaskádovým zlyhaniam. Toto je automatické pre poskytovateľov kľúčov API.---

## Optional RAG / LLM failure taxonomy (16 problems)

Niektorí používatelia OmniRoute umiestňujú bránu pred zásobníky RAG alebo agentov. V týchto nastaveniach je bežné vidieť zvláštny vzor: OmniRoute vyzerá zdravo (poskytovatelia sú v poriadku, smerovacie profily sú v poriadku, žiadne upozornenia na obmedzenie rýchlosti), ale konečná odpoveď je stále nesprávna.

V praxi tieto incidenty zvyčajne pochádzajú z dolného potrubia RAG, nie zo samotnej brány.

Ak chcete mať zdieľaný slovník na popis týchto zlyhaní, môžete použiť WFGY ProblemMap, externý textový zdroj licencie MIT, ktorý definuje šestnásť opakujúcich sa vzorov porúch RAG / LLM. Na vysokej úrovni pokrýva:

- posun pri vyhľadávaní a narušené hranice kontextu
- prázdne alebo zastarané indexy a vektorové sklady
- vkladanie verzus sémantický nesúlad
- rýchle zostavenie a problémy s kontextovým oknom
- logický kolaps a príliš sebavedomé odpovede
- zlyhanie koordinácie dlhých reťazcov a agentov
- multiagentová pamäť a posun rolí
- problémy s nasadením a objednávaním bootstrapu

Myšlienka je jednoduchá:

1. Keď preskúmate zlú odpoveď, zaznamenajte:
   - užívateľská úloha a požiadavka
   - kombinácia trasy alebo poskytovateľa v OmniRoute
   - akýkoľvek kontext RAG použitý nadol (získané dokumenty, volania nástrojov atď.)
2. Priraďte incident k jednému alebo dvom číslam WFGY ProblemMap (`č.1` … `č.16`).
3. Uložte si číslo na svoj vlastný informačný panel, runbook alebo sledovač incidentov vedľa protokolov OmniRoute.
4. Pomocou príslušnej stránky WFGY sa rozhodnite, či potrebujete zmeniť stratégiu zásobníka RAG, retrievera alebo smerovania.

Celý text a konkrétne recepty nájdete tu (licencia MIT, len text):

[README WFGY ProblemMap](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Túto sekciu môžete ignorovať, ak za OmniRoute nespúšťate RAG alebo agentov.---

## Still Stuck?

–**Problémy s GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Architektúra**: Interné podrobnosti nájdete v [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) -**Referencia API**: Všetky koncové body nájdete v [`docs/API_REFERENCE.md`](API_REFERENCE.md) -**Hlavný panel zdravia**: Skontrolujte stav systému v reálnom čase v**Hlavnom paneli → Zdravie** -**Prekladač**: Na ladenie problémov s formátom použite**Dashboard → Translator**
