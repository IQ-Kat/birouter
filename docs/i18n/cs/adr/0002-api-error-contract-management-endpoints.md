# ADR-0002: Chybová smlouva pro koncové body správy

Datum: 17. 3. 2026 Stav: Přijato

## Rozhodnutí

Koncové body správy (konfigurace proxy, registr proxy a přiřazení proxy) vracejí jednotné tělo chyby:

```json
{
  "error": {
    "message": "Human-readable summary",
    "type": "invalid_request | not_found | conflict | server_error",
    "details": {}
  },
  "requestId": "uuid"
}
```

## Mapování stavu

- 400: neplatný požadavek / selhání ověření
- 404: zdroj nenalezen
- 409: konflikt zdrojů (například proxy stále přiřazen)
- 500: neočekávaná chyba serveru

## Poznámky

- `requestId` je povinný pro korelaci protokolů.
- `details` je volitelné a používá se pouze pro bezpečné ověření detailů.
- Citlivé tajné informace (přihlašovací údaje proxy, tokeny) se nikdy nesmí objevit ve `message` ani v `details` .
