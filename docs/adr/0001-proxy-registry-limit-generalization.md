# ADR-0001: Proxy Registry + Usage Control Generalization

Date: 2026-03-17
Status: Accepted

## Context

OmniRoute sudah punya:

- Proxy assignment berbasis config-map (`global`, `providers`, `combos`, `keys`).
- Quota-aware selection khusus provider tertentu (notably `codex`).

Gap utama:

- Proxy belum menjadi aset reusable yang bisa di-manage sebagai entitas (metadata, where-used, safe delete).
- Usage policy belum konsisten lintas provider.
- Error contract API belum seragam untuk endpoint manajemen.

## Decision

1. Tambah **Proxy Registry** sebagai domain baru di DB (`proxy_registry`, `proxy_assignments`).
2. Pertahankan kompatibilitas assignment lama (fallback ke `proxyConfig` lama).
3. Resolver runtime pakai prioritas:
   - account -> provider -> global (registry)
   - fallback ke legacy resolver jika registry belum ada assignment
4. Wajib redaction kredensial di output list registry default.
5. Standarkan error JSON untuk endpoint manajemen proxy agar konsisten dan punya `requestId`.

## Consequences

Positif:

- Proxy reusable dan bisa dilacak pemakaiannya.
- Safe delete bisa ditegakkan (409 saat masih dipakai).
- Migrasi bertahap tanpa breaking change runtime.

Negatif:

- Ada dual-source sementara (registry + legacy config) sampai migrasi selesai.
- Butuh endpoint assignment tambahan dan pemetaan scope yang konsisten.

## Follow-up

- Migrasi UI provider/account dari input raw proxy ke selector registry.
- Tambah health telemetry per proxy dan alerting.
- Generalisasi usage control ke provider lain melalui interface policy yang sama.
