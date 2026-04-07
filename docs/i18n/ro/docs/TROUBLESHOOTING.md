# Troubleshooting (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Probleme și soluții comune pentru OmniRoute.---

## Quick Fixes

| Problemă                                     | Soluție                                                                       |
| -------------------------------------------- | ----------------------------------------------------------------------------- | --- |
| Prima conectare nu funcționează              | Setați `INITIAL_PASSWORD` în `.env` (fără cod implicit implicit)              |
| Tabloul de bord se deschide pe portul greșit | Setați `PORT=20128` și `NEXT_PUBLIC_BASE_URL=http://localhost:20128`          |
| Niciun jurnal de solicitare sub `logs/`      | Setați `ENABLE_REQUEST_LOGS=true`                                             |
| EACCES: permisiunea refuzată                 | Setați `DATA_DIR=/path/to/writable/dir` pentru a înlocui `~/.omniroute`       |
| Strategia de rutare nu se salvează           | Actualizare la v1.4.11+ (remedierea schemei Zod pentru persistența setărilor) | --- |

## Provider Issues

### "Language model did not provide messages"

**Cauza:**Cota de furnizor a fost epuizată.

**Remediere:**

1. Verificați instrumentul de urmărire a cotelor din tabloul de bord
2. Utilizați un combo cu niveluri de rezervă
3. Treceți la nivelul mai ieftin/gratuit### Rate Limiting

**Cauza:**Cota de abonament epuizată.

**Remediere:**

- Adăugați alternativă: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Utilizați GLM/MiniMax ca rezervă ieftină### OAuth Token Expired

OmniRoute reîmprospătează automat jetoanele. Dacă problemele persistă:

1. Tabloul de bord → Furnizor → Reconectare
2. Ștergeți și adăugați din nou conexiunea la furnizor---

## Cloud Issues

### Cloud Sync Errors

1. Verificați `BASE_URL` punctele către instanța dvs. care rulează (de ex., `http://localhost:20128`)
2. Verificați `CLOUD_URL` punctele către punctul final de cloud (de exemplu, `https://omniroute.dev`)
3. Păstrați valorile `NEXT_PUBLIC_*` aliniate cu valorile de pe partea serverului### Cloud `stream=false` Returns 500

**Simptom:**`Token neașteptat 'd'...` pe punctul final de cloud pentru apeluri care nu sunt transmise în flux.

**Cauza:**Upstream returnează sarcina utilă SSE în timp ce clientul așteaptă JSON.

**Soluție:**Folosiți `stream=true` pentru apelurile directe în cloud. Timpul de rulare local include SSE→JSON fallback.### Cloud Says Connected but "Invalid API key"

1. Creați o cheie nouă din tabloul de bord local (`/api/keys`)
2. Rulați sincronizarea în cloud: Activați Cloud → Sincronizare acum
3. Cheile vechi/nesincronizate pot returna în continuare `401` pe cloud---

## Docker Issues

### CLI Tool Shows Not Installed

1. Verificați câmpurile runtime: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Pentru modul portabil: utilizați imaginea țintă „runner-cli” (CLI-uri incluse)
3. Pentru modul de montare a gazdei: setați `CLI_EXTRA_PATHS` și montați directorul bin gazdă ca doar pentru citire
4. Dacă `installed=true` și `runnable=false`: binarul a fost găsit, dar verificarea de sănătate a eșuat### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Verificați statisticile de utilizare în Tabloul de bord → Utilizare
2. Comutați modelul principal la GLM/MiniMax
3. Utilizați nivelul gratuit (Gemini CLI, Qoder) pentru sarcini non-critice
4. Setați bugete de cost pentru fiecare cheie API: Tabloul de bord → Chei API → Buget---

## Debugging

### Enable Request Logs

Setați `ENABLE_REQUEST_LOGS=true` în fișierul dvs. `.env`. Jurnalele apar în directorul `logs/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Stare principală: `${DATA_DIR}/storage.sqlite` (furnizori, combo-uri, aliasuri, chei, setări)
- Utilizare: tabele SQLite în `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + opțional `${DATA_DIR}/log.txt` și `${DATA_DIR}/call_logs/`
- Jurnalele de solicitare: `<repo>/logs/...` (când `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Când întrerupătorul unui furnizor este DESCHIS, cererile sunt blocate până la expirarea perioadei de răcire.

**Remediere:**

1. Accesați**Tabloul de bord → Setări → Reziliență**
2. Verificați cardul întreruptorului pentru furnizorul afectat
3. Faceți clic pe**Reset All**pentru a șterge toate întrerupătoarele sau așteptați ca perioada de răcire să expire
4. Verificați că furnizorul este efectiv disponibil înainte de resetare### Provider keeps tripping the circuit breaker

Dacă un furnizor intră în mod repetat în starea DESCHIS:

1. Verificați**Tabloul de bord → Sănătate → Sănătatea furnizorului**pentru modelul de eșec
2. Accesați**Setări → Reziliență → Profiluri furnizor**și creșteți pragul de eșec
3. Verificați dacă furnizorul a modificat limitele API sau dacă necesită re-autentificare
4. Examinați telemetria latenței — latența mare poate cauza eșecuri bazate pe timeout---

## Audio Transcription Issues

### "Unsupported model" error

- Asigurați-vă că utilizați prefixul corect: `deepgram/nova-3` sau `assemblyai/best`
- Verificați că furnizorul este conectat în**Tabloul de bord → Furnizori**### Transcription returns empty or fails

- Verificați formatele audio acceptate: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Verificați că dimensiunea fișierului este în limitele furnizorului (de obicei < 25 MB)
- Verificați valabilitatea cheii API a furnizorului în cardul furnizorului---

## Translator Debugging

Utilizați**Tabloul de bord → Traducător**pentru a depana problemele de traducere de format:

| Modul               | Când să utilizați                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Teren de joacă**  | Comparați formatele de intrare/ieșire una lângă alta — inserați o solicitare eșuată pentru a vedea cum se traduce |
| **Tester de chat**  | Trimiteți mesaje live și inspectați întreaga sarcină de solicitare/răspuns, inclusiv antetele                     |
| **Banc de testare** | Rulați teste în loturi în combinații de formate pentru a afla ce traduceri sunt întrerupte                        |
| **Monitor live**    | Urmăriți fluxul de solicitări în timp real pentru a detecta problemele intermitente de traducere                  | ### Common format issues |

-**Nu apar etichete de gândire**— Verificați dacă furnizorul țintă acceptă gândirea și setarea bugetului de gândire -**Scăderea apelurilor de instrumente**— Unele traduceri în format pot elimina câmpurile neacceptate; verificați în modul Playground -**Lipsește promptul de sistem**— Claude și Gemini gestionează prompturile în mod diferit; verificați rezultatul traducerii -**SDK returnează șir brut în loc de obiect**— Remediat în v1.1.0: dezinfectantul de răspuns acum elimină câmpurile nestandard (`x_groq`, `usage_breakdown`, etc.) care cauzează eșecuri de validare OpenAI SDK Pydantic -**GLM/ERNIE respinge rolul „sistemului”**— Remediat în v1.1.0: normalizatorul de rol îmbină automat mesajele de sistem în mesajele utilizatorului pentru modele incompatibile -**Rolul `dezvoltator` nu este recunoscut**— Remediat în v1.1.0: convertit automat în `sistem` pentru furnizorii non-OpenAI -**`json_schema` nu funcționează cu Gemini**— Remediat în v1.1.0: `response_format` este acum convertit în `responseMimeType` + `responseSchema`---

## Resilience Settings

### Auto rate-limit not triggering

- Limita automată a ratei se aplică numai furnizorilor de chei API (nu OAuth/abonament)
- Verificați că**Setări → Reziliență → Profiluri furnizorului**are limita de rata automată activată
- Verificați dacă furnizorul returnează codurile de stare `429` sau anteturile `Retry-After`### Tuning exponential backoff

Profilurile furnizorilor acceptă aceste setări:

-**Întârziere de bază**— Timp de așteptare inițial după prima defecțiune (implicit: 1s) -**Întârziere maximă**— Limită maximă a timpului de așteptare (implicit: 30s) -**Multiplicator**— Cât de mult se mărește întârzierea pentru fiecare defecțiune consecutivă (implicit: 2x)### Anti-thundering herd

Când multe solicitări concurente ajung la un furnizor cu o rată limitată, OmniRoute folosește mutex + limitarea automată a ratei pentru a serializa cererile și a preveni eșecurile în cascadă. Acest lucru este automat pentru furnizorii de chei API.---

## Optional RAG / LLM failure taxonomy (16 problems)

Unii utilizatori OmniRoute plasează gateway-ul în fața RAG sau a stivelor de agenți. În acele setări este obișnuit să vezi un model ciudat: OmniRoute arată sănătos (furnizorii sus, profiluri de rutare ok, alerte fără limită de rată), dar răspunsul final este încă greșit.

În practică, aceste incidente provin de obicei de la conducta RAG din aval, nu de la gateway în sine.

Dacă doriți un vocabular comun pentru a descrie acele defecțiuni, puteți utiliza WFGY ProblemMap, o resursă text externă a licenței MIT care definește șaisprezece modele de eșec RAG / LLM recurente. La un nivel înalt acoperă:

- deriva de regăsire și granițele de context rupte
- indexuri goale sau învechite și depozite de vectori
- încorporare versus nepotrivire semantică
- probleme de asamblare promptă și ferestre de context
- colaps logic și răspunsuri prea încrezătoare
- eșecuri de coordonare a lanțului lung și a agenților
- memorie multi-agent și deriva de rol
- probleme de implementare și comanda bootstrap

Ideea este simpla:

1. Când investigați un răspuns prost, capturați:
   - sarcina și cererea utilizatorului
   - combo rută sau furnizor în OmniRoute
   - orice context RAG utilizat în aval (documente preluate, apeluri de instrumente etc.)
2. Harta incidentul la unul sau două numere WFGY ProblemMap (`Nr.1` … `Nr.16`).
3. Stocați numărul în propriul tablou de bord, runbook sau instrument de urmărire a incidentelor lângă jurnalele OmniRoute.
4. Utilizați pagina WFGY corespunzătoare pentru a decide dacă trebuie să vă schimbați stiva RAG, retriever sau strategia de rutare.

Text complet și rețete concrete live aici (licență MIT, doar text):

[WFGY ProblemMap README](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Puteți ignora această secțiune dacă nu rulați RAG sau conducte de agenți în spatele OmniRoute.---

## Still Stuck?

-**Probleme GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Arhitectura**: Vezi [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) pentru detalii interne -**Referință API**: Consultați [`docs/API_REFERENCE.md`](API_REFERENCE.md) pentru toate punctele finale -**Tabloul de bord pentru sănătate**: verificați**Tabloul de bord → Sănătate**pentru starea sistemului în timp real -**Translator**: utilizați**Tabloul de bord → Translator**pentru a depana problemele de format
