# Troubleshooting (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

OmniRouten yleisiä ongelmia ja ratkaisuja.---

## Quick Fixes

| Ongelma                            | Ratkaisu                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------- | --- |
| Ensimmäinen kirjautuminen ei toimi | Aseta 'INITIAL_PASSWORD' .env:ssä (ei kovakoodattua oletusarvoa)                |
| Kojelauta avautuu väärään porttiin | Aseta `PORT=20128` ja `NEXT_PUBLIC_BASE_URL=http://localhost:20128`             |
| Ei pyyntölokeja kohdassa "lokit/"  | Aseta ENABLE_REQUEST_LOGS=true                                                  |
| EACCES: lupa evätty                | Aseta "DATA_DIR=/polku/kirjoitettavaan/hakemistoon" ohittaaksesi "~/.omniroute" |
| Reititysstrategia ei tallennu      | Päivitys versioon 1.4.11+ (Zod-skeeman korjaus asetusten pysyvyyttä varten)     | --- |

## Provider Issues

### "Language model did not provide messages"

**Syy:**Palveluntarjoajan kiintiö käytetty.

**Korjaa:**

1. Tarkista kojelaudan kiintiöiden seuranta
2. Käytä yhdistelmää varatasoilla
3. Vaihda halvempaan/ilmaiseen tasoon### Rate Limiting

**Syy:**Tilauskiintiö käytetty.

**Korjaa:**

- Lisää vara: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Käytä GLM/MiniMaxia halvana varmuuskopiona### OAuth Token Expired

OmniRoute päivittää tunnukset automaattisesti. Jos ongelmat jatkuvat:

1. Kojelauta → Palveluntarjoaja → Yhdistä uudelleen
2. Poista ja lisää palveluntarjoajan yhteys uudelleen---

## Cloud Issues

### Cloud Sync Errors

1. Varmista, että BASE_URL osoittaa käynnissä olevaan esiintymääsi (esim. http://localhost:20128)
2. Varmista, että CLOUD_URL-osoite osoittaa pilvipäätepisteeseesi (esim. https://omniroute.dev).
3. Pidä NEXT*PUBLIC*\*-arvot kohdakkain palvelinpuolen arvojen kanssa### Cloud `stream=false` Returns 500

**Oire:**"Odottamaton tunnus "d"..." pilvipäätepisteessä ei-suoratoistopuheluille.

**Syy:**Upstream palauttaa SSE-hyötykuorman, kun asiakas odottaa JSONia.

**Ratkaisu:**Käytä "stream=true" pilvisuorapuheluissa. Paikallinen suoritusaika sisältää SSE→JSON-varavaihtoehdon.### Cloud Says Connected but "Invalid API key"

1. Luo uusi avain paikallisesta hallintapaneelista (`/api/keys`)
2. Suorita pilvisynkronointi: Ota pilvi käyttöön → Synkronoi nyt
3. Vanhat/synkronoimattomat avaimet voivat edelleen palauttaa 401:n pilvessä---

## Docker Issues

### CLI Tool Shows Not Installed

1. Tarkista ajonaikaiset kentät: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Kannettava tila: käytä kuvakohdetta "runner-cli" (niputetut CLI:t)
3. Isäntäliitostila: aseta CLI_EXTRA_PATHS ja liitä isäntäalustahakemisto vain luku -muotoiseksi
4. Jos "installed=true" ja "runnable=false": binaari löytyi, mutta kuntotarkastus epäonnistui### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Tarkista käyttötilastot kohdassa Dashboard → Usage
2. Vaihda ensisijaiseksi malliksi GLM/MiniMax
3. Käytä ilmaista tasoa (Gemini CLI, Qoder) ei-kriittisiin tehtäviin
4. Aseta kustannusbudjetit API-avainta kohti: Dashboard → API Keys → Budget---

## Debugging

### Enable Request Logs

Aseta ENABLE_REQUEST_LOGS=true .env-tiedostoosi. Lokit näkyvät lokit/hakemistossa.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Päätila: `${DATA_DIR}/storage.sqlite` (palveluntarjoajat, yhdistelmät, aliakset, avaimet, asetukset)
- Käyttö: SQLite-taulukot tiedostossa "storage.sqlite" ("usage_history", "call_logs", "proxy_logs") + valinnainen "${DATA_DIR}/log.txt" ja "${DATA_DIR}/call_logs/"
- Pyydä lokeja: `<repo>/logs/...` (kun `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Kun palveluntarjoajan katkaisija on AUKI, pyynnöt estetään, kunnes jäähdytys päättyy.

**Korjaa:**

1. Siirry kohtaan**Käyttöpaneeli → Asetukset → Resilience**
2. Tarkista asianomaisen palveluntarjoajan katkaisijakortti
3. Napsauta**Nollaa kaikki**tyhjentääksesi kaikki katkaisijat tai odota jäähdytysajan päättymistä
4. Varmista, että palveluntarjoaja on todella saatavilla, ennen kuin nollaat### Provider keeps tripping the circuit breaker

Jos palveluntarjoaja siirtyy toistuvasti OPEN-tilaan:

1. Tarkista vikakuvio kohdasta**Dashboard → Health → Provider Health**
2. Siirry kohtaan**Settings → Resilience → Provider Profiles**ja nosta vikakynnystä.
3. Tarkista, onko palveluntarjoaja muuttanut API-rajoja tai vaatiiko todennuksen uudelleen
4. Tarkista viiveen telemetria — korkea latenssi voi aiheuttaa aikakatkaisuun perustuvia virheitä---

## Audio Transcription Issues

### "Unsupported model" error

- Varmista, että käytät oikeaa etuliitettä: "deepgram/nova-3" tai "assemblyai/best"
- Varmista, että palveluntarjoaja on yhdistetty kohdassa**Dashboard → Providers**### Transcription returns empty or fails

- Tarkista tuetut äänimuodot: "mp3", "wav", "m4a", "flac", "ogg", "webm"
- Varmista, että tiedostokoko on palveluntarjoajan rajoissa (yleensä < 25 Mt)
- Tarkista palveluntarjoajan API-avaimen voimassaolo toimittajakortista---

## Translator Debugging

Käytä**Käyttöpaneeli → Kääntäjä**muotojen käännösongelmien korjaamiseen:

| Tila                      | Milloin käyttää                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Leikkikenttä**          | Vertaa syöttö-/tulostusmuotoja vierekkäin – liitä epäonnistunut pyyntö nähdäksesi, miten se käännetään  |
| **Pikaviestien testaaja** | Lähetä reaaliaikaisia ​​viestejä ja tarkasta koko pyynnön/vastauksen hyötykuorma, mukaan lukien otsikot |
| **Testipenkki**           | Suorita erätestejä muotoyhdistelmille selvittääksesi, mitkä käännökset ovat rikki                       |
| **Live Monitor**          | Tarkkaile reaaliaikaista pyyntövirtaa havaitaksesi ajoittaiset käännösongelmat                          | ### Common format issues |

-**Ajattelevat tunnisteet eivät näy**— Tarkista, tukeeko kohdetoimittaja ajattelua ja ajattelun budjettiasetusta -**Työkalukutsujen pudottaminen**— Jotkin muotokäännökset voivat poistaa ei-tuetut kentät. vahvista leikkikenttätilassa -**Järjestelmäkehote puuttuu**— Claude ja Gemini kahvajärjestelmä kehottaa eri tavalla; tarkista käännöstulos -**SDK palauttaa raakamerkkijonon objektin sijaan**— Korjattu versiossa 1.1.0: vastauspuhdistin poistaa nyt standardista poikkeavat kentät ("x_groq", "usage_breakdown" jne.), jotka aiheuttavat OpenAI SDK Pydantic -tarkistusvirheitä -**GLM/ERNIE hylkää "järjestelmän" roolin**- Korjattu versiossa 1.1.0: roolin normalisoija yhdistää automaattisesti järjestelmäviestit käyttäjäviesteiksi yhteensopimattomissa malleissa -**"kehittäjäroolia" ei tunnistettu**- Korjattu versiossa 1.1.0: muunnetaan automaattisesti "järjestelmäksi" muille kuin OpenAI-palveluntarjoajille -**`json_schema` ei toimi Geminin kanssa**— Korjattu versiossa 1.1.0: `response_format` muunnetaan nyt Geminin `responseMimeType` + `responseSchema` -muotoon.---

## Resilience Settings

### Auto rate-limit not triggering

- Automaattinen nopeusrajoitus koskee vain API-avainten toimittajia (ei OAuth-tilausta)
- Varmista, että**Asetukset → Resilienssi → Palveluntarjoajan profiilit**on automaattinen rajoitus käytössä
- Tarkista, palauttaako palveluntarjoaja "429"-tilakoodit tai "Retry-After"-otsikot### Tuning exponential backoff

Palveluntarjoajan profiilit tukevat näitä asetuksia:

-**Perusviive**— Ensimmäinen odotusaika ensimmäisen epäonnistumisen jälkeen (oletus: 1 s) -**Maksimiviive**- Odotusajan enimmäisraja (oletus: 30 s) -**Kerroin**— Kuinka paljon viivettä lisätään peräkkäistä vikaa kohti (oletus: 2x)### Anti-thundering herd

Kun monet samanaikaiset pyynnöt osuvat nopeusrajoitettuun palveluntarjoajaan, OmniRoute käyttää mutex + automaattista nopeuden rajoitusta sarjoittamaan pyynnöt ja estämään peräkkäiset epäonnistumiset. Tämä on automaattinen API-avainten tarjoajille.---

## Optional RAG / LLM failure taxonomy (16 problems)

Jotkut OmniRouten käyttäjät sijoittavat yhdyskäytävän RAG- tai agenttipinojen eteen. Näissä asetuksissa on tavallista nähdä outo kuvio: OmniRoute näyttää terveeltä (palveluntarjoajat valmiina, reititysprofiilit kunnossa, ei nopeusrajoitushälytyksiä), mutta lopullinen vastaus on silti väärä.

Käytännössä nämä tapaukset tulevat yleensä loppupään RAG-putkistosta, eivät itse yhdyskäytävästä.

Jos haluat jaetun sanaston kuvaamaan näitä vikoja, voit käyttää WFGY ProblemMapia, ulkoista MIT-lisenssitekstiresurssia, joka määrittelee kuusitoista toistuvaa RAG/LLM-vikamallia. Korkealla tasolla se kattaa:

- haun ajautuminen ja rikotut kontekstin rajat
- tyhjät tai vanhentuneet indeksit ja vektorivarastot
- upottaminen vs. semanttinen yhteensopivuus
- Nopeat kokoonpano- ja kontekstiikkuna-ongelmat
- logiikka romahtaa ja liian itsevarmat vastaukset
- pitkän ketjun ja agenttien koordinaatiohäiriöt
- monen agentin muisti ja roolien siirtyminen
- käyttöönotto- ja käynnistystilausongelmat

Idea on yksinkertainen:

1. Kun tutkit huonoa vastausta, tallenna:
   - käyttäjän tehtävä ja pyyntö
   - reitti- tai tarjoajayhdistelmä OmniRoutessa
   - mikä tahansa loppupäässä käytetty RAG-konteksti (haettu asiakirjat, työkalukutsut jne.)
2. Kartoita tapahtuma yhteen tai kahteen WFGY-ongelmakarttanumeroon (`No.1` … `No.16`).
3. Tallenna numero omaan kojelautaan, runbookiin tai tapahtumaseurantaan OmniRoute-lokien viereen.
4. Käytä vastaavaa WFGY-sivua päättääksesi, onko sinun muutettava RAG-pinoa, noutajaa tai reititysstrategiaa.

Koko teksti ja konkreettiset reseptit löytyvät täältä (MIT-lisenssi, vain teksti):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Voit jättää tämän osion huomioimatta, jos et käytä RAG- tai agenttiputkia OmniRouten takana.---

## Still Stuck?

-**GitHub-ongelmat**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Arkkitehtuuri**: Katso sisäiset tiedot osoitteesta [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) -**API-viite**: Katso [`docs/API_REFERENCE.md`](API_REFERENCE.md) kaikista päätepisteistä -**Health Dashboard**: Tarkista järjestelmän reaaliaikainen tila kohdasta**Dashboard → Health** -**Kääntäjä**: Käytä**Käyttöpaneeli → Kääntäjä**muotoongelmien korjaamiseen
