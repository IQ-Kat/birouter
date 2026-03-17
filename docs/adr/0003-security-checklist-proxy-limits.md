# ADR-0003: Security Checklist for Proxy Registry and Usage Controls

Date: 2026-03-17
Status: Accepted

## Checklist

- Validate all management payloads with Zod.
- Reject malformed scope assignment updates with status 400.
- Reject deleting an in-use proxy with status 409 unless forced.
- Never expose proxy username/password in list responses by default.
- Never log raw credentials or token values.
- Keep error responses free from internal stack traces.
- Protect management endpoints with existing auth middleware policy.
- Audit mutating operations: create/update/delete/assign/migrate.
- Ensure resolver fallback to legacy config while migration is in transition.
