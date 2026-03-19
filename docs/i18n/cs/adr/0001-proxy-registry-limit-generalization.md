# ADR-0001: Zobecnění registru proxy serverů + kontroly využití

Datum: 17. 3. 2026 Stav: Přijato

## Kontext

OmniRoute je užitečný:

- Přiřazení proxy na základě konfigurační mapy ( `global` , `providers` , `combos` , `keys` ).
- Výběr s ohledem na kvóty poskytovatele khusus tertentu (zejména `codex` ).

Mezera utama:

- Proxy belum menjadi asset opakovaně použitelný jang bisa di-manage sebagai entitas (metadata, kde se používají, bezpečné smazání).
- Zásady použití belum konsisten lintas provider.
- Chybová smlouva API belum seragam untuk manajemen endpoint manajemen.

## Rozhodnutí

1. Tambah **Proxy Registry** sebegai domény baru di DB ( `proxy_registry` , `proxy_assignments` ).
2. Stálá kompatibilita přiřazení lama (záložní lama `proxyConfig` ).
3. Priority pakai runtime modulu Resolver:
    - účet -&gt; poskytovatel -&gt; globální (registr)
    - záložní ke legacy resolver jika registry belum ada přiřazení
4. Výchozí registr výstupního seznamu Wajib redaction kredensial di.
5. Standarkan error JSON unuk endpoint manajemen proxy agar konsisten dan punya `requestId` .

## Důsledky

Pozitivní:

- Opakovaně použitelný proxy server.
- Bezpečné odstranění bisa ditegakkan (409 saat masih dipakai).
- Migrasi bertahap tanpa prolomení runtime změn.

Negativní:

- Ada dual-source sementara (registr + starší konfigurace) sampai migrasi selesai.
- Ale přiřazení koncových bodů tambahan a pemetaan rozsah a rozsah.

## Následná opatření

- Poskytovatel uživatelského rozhraní Migrasi/účet umožňuje zadat nezpracovaný registr selektoru proxy serveru.
- Telemetrie zdraví Tambah na proxy a upozornění.
- Všeobecná kontrola používání ke poskytovateli lain melalui interface policy yang sama.
