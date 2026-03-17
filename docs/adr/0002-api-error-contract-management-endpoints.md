# ADR-0002: Error Contract for Management Endpoints

Date: 2026-03-17
Status: Accepted

## Decision

Management endpoints (proxy config, proxy registry, and proxy assignments) return a uniform error body:

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

## Status Mapping

- 400: invalid request / validation failure
- 404: resource not found
- 409: resource conflict (for example, proxy still assigned)
- 500: unexpected server error

## Notes

- `requestId` is mandatory for log correlation.
- `details` is optional and only used for safe validation details.
- Sensitive secrets (proxy credentials, tokens) must never appear in `message` or `details`.
