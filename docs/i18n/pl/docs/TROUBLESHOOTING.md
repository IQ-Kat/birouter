# Troubleshooting (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/TROUBLESHOOTING.md) · 🇪🇸 [es](../../es/docs/TROUBLESHOOTING.md) · 🇫🇷 [fr](../../fr/docs/TROUBLESHOOTING.md) · 🇩🇪 [de](../../de/docs/TROUBLESHOOTING.md) · 🇮🇹 [it](../../it/docs/TROUBLESHOOTING.md) · 🇷🇺 [ru](../../ru/docs/TROUBLESHOOTING.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/TROUBLESHOOTING.md) · 🇯🇵 [ja](../../ja/docs/TROUBLESHOOTING.md) · 🇰🇷 [ko](../../ko/docs/TROUBLESHOOTING.md) · 🇸🇦 [ar](../../ar/docs/TROUBLESHOOTING.md) · 🇮🇳 [hi](../../hi/docs/TROUBLESHOOTING.md) · 🇮🇳 [in](../../in/docs/TROUBLESHOOTING.md) · 🇹🇭 [th](../../th/docs/TROUBLESHOOTING.md) · 🇻🇳 [vi](../../vi/docs/TROUBLESHOOTING.md) · 🇮🇩 [id](../../id/docs/TROUBLESHOOTING.md) · 🇲🇾 [ms](../../ms/docs/TROUBLESHOOTING.md) · 🇳🇱 [nl](../../nl/docs/TROUBLESHOOTING.md) · 🇵🇱 [pl](../../pl/docs/TROUBLESHOOTING.md) · 🇸🇪 [sv](../../sv/docs/TROUBLESHOOTING.md) · 🇳🇴 [no](../../no/docs/TROUBLESHOOTING.md) · 🇩🇰 [da](../../da/docs/TROUBLESHOOTING.md) · 🇫🇮 [fi](../../fi/docs/TROUBLESHOOTING.md) · 🇵🇹 [pt](../../pt/docs/TROUBLESHOOTING.md) · 🇷🇴 [ro](../../ro/docs/TROUBLESHOOTING.md) · 🇭🇺 [hu](../../hu/docs/TROUBLESHOOTING.md) · 🇧🇬 [bg](../../bg/docs/TROUBLESHOOTING.md) · 🇸🇰 [sk](../../sk/docs/TROUBLESHOOTING.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/TROUBLESHOOTING.md) · 🇮🇱 [he](../../he/docs/TROUBLESHOOTING.md) · 🇵🇭 [phi](../../phi/docs/TROUBLESHOOTING.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/TROUBLESHOOTING.md) · 🇨🇿 [cs](../../cs/docs/TROUBLESHOOTING.md) · 🇹🇷 [tr](../../tr/docs/TROUBLESHOOTING.md)

---

Typowe problemy i rozwiązania dla OmniRoute.---

## Quick Fixes

| Problem                                    | Rozwiązanie                                                                            |
| ------------------------------------------ | -------------------------------------------------------------------------------------- | --- |
| Pierwsze logowanie nie działa              | Ustaw `INITIAL_PASSWORD` w `.env` (brak wartości domyślnej)                            |
| Panel kontrolny otwiera się na złym porcie | Ustaw `PORT=20128` i `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                     |
| Brak logów żądań w `logs/`                 | Ustaw `ENABLE_REQUEST_LOGS=true`                                                       |
| EACCES: odmowa pozwolenia                  | Ustaw `DATA_DIR=/ścieżka/do/zapisu/katalog`, aby zastąpić `~/.omniroute`               |
| Strategia routingu nie jest zapisywana     | Aktualizacja do wersji 1.4.11+ (poprawka schematu Zoda zapewniająca trwałość ustawień) | --- |

## Provider Issues

### "Language model did not provide messages"

**Przyczyna:**Wyczerpany limit dostawcy.

**Poprawka:**

1. Sprawdź moduł śledzenia limitów na pulpicie nawigacyjnym
2. Użyj kombinacji z poziomami rezerwowymi
3. Przejdź na tańszy/bezpłatny poziom### Rate Limiting

**Przyczyna:**Wyczerpany limit subskrypcji.

**Poprawka:**

- Dodaj rezerwę: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Użyj GLM/MiniMax jako taniej kopii zapasowej### OAuth Token Expired

OmniRoute automatycznie odświeża tokeny. Jeśli problemy nadal występują:

1. Panel kontrolny → Dostawca → Połącz ponownie
2. Usuń i ponownie dodaj połączenie dostawcy---

## Cloud Issues

### Cloud Sync Errors

1. Sprawdź, czy `BASE_URL` wskazuje na działającą instancję (np. `http://localhost:20128`)
2. Sprawdź, czy `CLOUD_URL` wskazuje na punkt końcowy Twojej chmury (np. `https://omniroute.dev`)
3. Zachowaj wyrównanie wartości `NEXT_PUBLIC_*` z wartościami po stronie serwera### Cloud `stream=false` Returns 500

**Objaw:**`Nieoczekiwany token „d”...` na punkcie końcowym chmury dla połączeń innych niż przesyłanie strumieniowe.

**Przyczyna:**Upstream zwraca ładunek SSE, podczas gdy klient oczekuje JSON.

**Rozwiązanie:**użyj parametru „stream=true” w przypadku bezpośrednich połączeń w chmurze. Lokalne środowisko wykonawcze obejmuje rezerwę SSE → JSON.### Cloud Says Connected but "Invalid API key"

1. Utwórz nowy klucz z lokalnego pulpitu nawigacyjnego (`/api/keys`)
2. Uruchom synchronizację z chmurą: Włącz chmurę → Synchronizuj teraz
3. Stare/niezsynchronizowane klucze nadal mogą zwracać „401” w chmurze---

## Docker Issues

### CLI Tool Shows Not Installed

1. Sprawdź pola wykonawcze: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. W trybie przenośnym: użyj docelowego obrazu `runner-cli` (w pakiecie CLI)
3. W trybie montowania hosta: ustaw `CLI_EXTRA_PATHS` i zamontuj katalog bin hosta jako tylko do odczytu
4. Jeśli `installed=true` i `runnable=false`: znaleziono plik binarny, ale kontrola stanu nie powiodła się### Quick Runtime Validation

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Cost Issues

### High Costs

1. Sprawdź statystyki użytkowania w Panelu → Użycie
2. Zmień model podstawowy na GLM/MiniMax
3. Używaj bezpłatnej warstwy (Gemini CLI, Qoder) do zadań niekrytycznych
4. Ustaw budżety kosztów według klucza API: Panel → Klucze API → Budżet---

## Debugging

### Enable Request Logs

Ustaw `ENABLE_REQUEST_LOGS=true` w swoim pliku `.env`. Dzienniki pojawiają się w katalogu `logs/`.### Check Provider Health

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Runtime Storage

- Stan główny: `${DATA_DIR}/storage.sqlite` (dostawcy, kombinacje, aliasy, klucze, ustawienia)
- Użycie: tabele SQLite w `storage.sqlite` (`usage_history`, `call_logs`, `proxy_logs`) + opcjonalnie `${DATA_DIR}/log.txt` i `${DATA_DIR}/call_logs/`
- Żądaj logów: `<repo>/logs/...` (gdy `ENABLE_REQUEST_LOGS=true`)---

## Circuit Breaker Issues

### Provider stuck in OPEN state

Gdy wyłącznik automatyczny dostawcy jest OTWARTY, żądania są blokowane do czasu upłynięcia czasu odnowienia.

**Poprawka:**

1. Przejdź do**Panel sterowania → Ustawienia → Odporność**
2. Sprawdź kartę wyłącznika dla odpowiedniego dostawcy
3. Kliknij**Resetuj wszystko**, aby wyczyścić wszystkie wyłączniki, lub poczekaj, aż upłynie czas odnowienia
4. Przed zresetowaniem sprawdź, czy dostawca jest rzeczywiście dostępny### Provider keeps tripping the circuit breaker

Jeśli dostawca wielokrotnie wchodzi w stan OPEN:

1. Sprawdź**Panel kontrolny → Kondycja → Kondycja dostawcy**pod kątem wzorca awarii
2. Przejdź do**Ustawienia → Odporność → Profile dostawców**i zwiększ próg awarii
3. Sprawdź, czy dostawca zmienił limity API lub wymaga ponownego uwierzytelnienia
4. Sprawdź dane telemetryczne dotyczące opóźnień — duże opóźnienia mogą powodować awarie wynikające z przekroczenia limitu czasu---

## Audio Transcription Issues

### "Unsupported model" error

- Upewnij się, że używasz prawidłowego przedrostka: `deepgram/nova-3` lub `assemblyai/best`
- Sprawdź, czy dostawca jest podłączony w**Panelu → Dostawcy**### Transcription returns empty or fails

- Sprawdź obsługiwane formaty audio: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Sprawdź, czy rozmiar pliku mieści się w granicach dostawcy (zwykle < 25 MB)
- Sprawdź ważność klucza API dostawcy na karcie dostawcy---

## Translator Debugging

Użyj**Panel kontrolny → Tłumacz**, aby debugować problemy z tłumaczeniem formatu:

| Tryb                      | Kiedy stosować                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **Plac zabaw**            | Porównaj formaty wejścia/wyjścia obok siebie — wklej nieudane żądanie, aby zobaczyć, jak zostanie przetłumaczone |
| **Tester czatu**          | Wysyłaj wiadomości na żywo i sprawdzaj pełny ładunek żądania/odpowiedzi, w tym nagłówki                          |
| **Stolik testowy**        | Przeprowadź testy wsadowe dla kombinacji formatów, aby dowiedzieć się, które tłumaczenia są uszkodzone           |
| **Monitorowanie na żywo** | Obserwuj przepływ żądań w czasie rzeczywistym, aby wykryć sporadyczne problemy z tłumaczeniem                    | ### Common format issues |

-**Tagi myślenia nie pojawiają się**— Sprawdź, czy dostawca docelowy obsługuje myślenie i ustawienie budżetu na myślenie -**Porzucanie wywołań narzędzi**— Niektóre tłumaczenia formatów mogą usuwać nieobsługiwane pola; sprawdź w trybie placu zabaw -**Brak podpowiedzi systemowej**— Claude i Gemini inaczej obsługują podpowiedzi systemowe; sprawdź wynik tłumaczenia -**SDK zwraca nieprzetworzony ciąg znaków zamiast obiektu**— Naprawiono w wersji 1.1.0: narzędzie do czyszczenia odpowiedzi usuwa teraz niestandardowe pola (`x_groq`, `usage_breakdown` itp.), które powodują błędy sprawdzania poprawności OpenAI SDK Pydantic -**GLM/ERNIE odrzuca rolę „systemową”**— Naprawiono w wersji 1.1.0: normalizator ról automatycznie łączy komunikaty systemowe z komunikatami użytkownika w przypadku niekompatybilnych modeli -**Rola „programisty” nie została rozpoznana**— Naprawiono w wersji 1.1.0: automatycznie konwertowana na „system” dla dostawców innych niż OpenAI -**`json_schema` nie działa z Gemini**— Naprawiono w wersji 1.1.0: `response_format` jest teraz konwertowany na `responseMimeType` + `responseSchema` Gemini---

## Resilience Settings

### Auto rate-limit not triggering

- Automatyczne ograniczenie szybkości dotyczy tylko dostawców kluczy API (nie OAuth/subskrypcja)
- Sprawdź, czy**Ustawienia → Odporność → Profile dostawców**ma włączone automatyczne ograniczenie stawek
- Sprawdź, czy dostawca zwraca kody stanu „429” lub nagłówki „Retry-After”.### Tuning exponential backoff

Profile dostawców obsługują następujące ustawienia:

-**Opóźnienie bazowe**— Początkowy czas oczekiwania po pierwszej awarii (domyślnie: 1 s) -**Maks. opóźnienie**— Maksymalny limit czasu oczekiwania (domyślnie: 30 s) -**Mnożnik**— O ile zwiększyć opóźnienie przy kolejnej awarii (domyślnie: 2x)### Anti-thundering herd

Gdy wiele jednoczesnych żądań trafia do dostawcy z ograniczoną szybkością, OmniRoute używa mutexu i automatycznego ograniczania szybkości, aby serializować żądania i zapobiegać kaskadowym błędom. Jest to automatyczne w przypadku dostawców kluczy API.---

## Optional RAG / LLM failure taxonomy (16 problems)

Niektórzy użytkownicy OmniRoute umieszczają bramę przed stosami RAG lub agentów. W takich konfiguracjach często można zaobserwować dziwny wzór: OmniRoute wygląda na w porządku (dostawcy działają, profile routingu w porządku, brak alertów o limitach szybkości), ale ostateczna odpowiedź nadal jest błędna.

W praktyce zdarzenia te zwykle mają miejsce w dalszym rurociągu RAG, a nie w samej bramie.

Jeśli chcesz, aby wspólne słownictwo opisało te awarie, możesz użyć WFGY ProblemMap, zewnętrznego zasobu tekstowego licencji MIT, który definiuje szesnaście powtarzających się wzorców awarii RAG/LLM. Na wysokim poziomie obejmuje:

- dryf wyszukiwania i zerwanie granic kontekstu
- puste lub nieaktualne indeksy i magazyny wektorów
- osadzanie a niedopasowanie semantyczne
- szybkie problemy z montażem i oknem kontekstowym
- załamanie logiki i zbytnia pewność siebie w odpowiedziach
- błędy w długim łańcuchu i koordynacji agentów
- pamięć wieloagentowa i dryf ról
- problemy z wdrażaniem i porządkowaniem ładowania początkowego

Pomysł jest prosty:

1. Kiedy sprawdzasz złą reakcję, przechwyć:
   - zadanie i żądanie użytkownika
   - kombinacja tras lub dostawców w OmniRoute
   - dowolny kontekst RAG używany w dalszej części procesu (pobrane dokumenty, wywołania narzędzi itp.)
2. Przypisz incydent do jednego lub dwóch numerów WFGY ProblemMap („Nr 1” … „Nr 16”).
3. Zapisz numer na swoim własnym pulpicie nawigacyjnym, elemencie Runbook lub narzędziu do śledzenia zdarzeń obok dzienników OmniRoute.
4. Użyj odpowiedniej strony WFGY, aby zdecydować, czy musisz zmienić stos RAG, aporter lub strategię routingu.

Pełny tekst i konkretne przepisy znajdują się tutaj (licencja MIT, tylko tekst):

[Plik README ProblemMap WFGY](https://github.com/onestardao/WFGY/blob/main/ProblemMap/README.md)

Możesz zignorować tę sekcję, jeśli nie uruchamiasz potoków RAG ani agentów za OmniRoute.---

## Still Stuck?

-**Problemy z GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues) -**Architektura**: Zobacz [`docs/ARCHITECTURE.md`](ARCHITECTURE.md), aby uzyskać szczegółowe informacje wewnętrzne -**Dokumentacja API**: Zobacz [`docs/API_REFERENCE.md`](API_REFERENCE.md) dla wszystkich punktów końcowych -**Panel stanu**: Sprawdź**Panel kontrolny → Zdrowie**, aby sprawdzić stan systemu w czasie rzeczywistym -**Tłumacz**: Użyj**Panel kontrolny → Tłumacz**, aby debugować problemy z formatem
