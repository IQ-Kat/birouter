# Gemini Model Metadata — Design Spec

## Problem

When Gemini models are synced, `sync-models/route.ts` strips API response data down to `{id, name, source}`, discarding token limits, capabilities, and other metadata the Google API provides. This means:

- `supportedEndpoints` is never populated from the API, so embedding/image/audio models aren't routed correctly
- Token limits fall back to hardcoded values (e.g. v1beta route returns `inputTokenLimit: 128000` for everything)
- Dashboard has no description or capability info for synced models

## Approach

Extend the existing `customModels` JSON blob with additional fields. The key-value store already holds arbitrary JSON, and all consumers read the full model object. No new DB namespace or migration needed.

## Field Mapping

Gemini API field → stored field → consumer

| Gemini API field | Stored as | Used by |
|---|---|---|
| `supportedGenerationMethods` | `supportedEndpoints` (mapped) | Routing: `/v1/embeddings`, `/v1/images/generations`, catalog type detection |
| `inputTokenLimit` | `inputTokenLimit` | Catalog `context_length`, v1beta models endpoint |
| `outputTokenLimit` | `outputTokenLimit` | v1beta models endpoint, thinking budget |
| `description` | `description` | Dashboard model display |
| `thinking` | `supportsThinking` | Model specs, thinking budget logic |
| `maxTemperature` | `maxTemperature` | Request validation |

### supportedGenerationMethods → supportedEndpoints mapping

```
generateContent           → "chat"
embedContent              → "embeddings"
predict                   → "images"
predictLongRunning        → "images"
bidiGenerateContent       → "audio"
generateAnswer            → "chat"
countTokens               → (ignored — utility method, not an endpoint)
createCachedContent       → (ignored)
batchGenerateContent      → (ignored — batch variant of chat)
asyncBatchEmbedContent    → (ignored — batch variant of embeddings)
```

If a model has no mappable methods, default to `["chat"]`.

## Changes

### 1. Gemini parseResponse — `src/app/api/providers/[id]/models/route.ts`

Add metadata extraction to the existing `gemini.parseResponse`. After the current `id`/`name` mapping, also extract `inputTokenLimit`, `outputTokenLimit`, `description`, `thinking`, `maxTemperature`, and compute `supportedEndpoints` from `supportedGenerationMethods`.

### 2. Sync route — `src/app/api/providers/[id]/sync-models/route.ts`

Lines 186-192: Carry through the new metadata fields instead of only `{id, name, source}`. The DB's `replaceCustomModels` already stores whatever fields are on the model object.

### 3. replaceCustomModels — `src/lib/db/models.ts`

Add the new fields to the TypeScript parameter type (lines 380-386) so they're explicitly recognized. Also preserve them during merge the same way compat flags are preserved.

### 4. Catalog — `src/app/api/v1/models/catalog.ts`

In the custom models section (~line 443), use stored `inputTokenLimit` for `context_length` when available, instead of relying only on registry defaults.

### 5. v1beta models — `src/app/api/v1beta/models/route.ts`

Replace hardcoded `inputTokenLimit: 128000` / `outputTokenLimit: 8192` with stored values from custom models when available. Also include `description` and `thinking` support fields in the Gemini-format response.

## Files Changed

1. `src/app/api/providers/[id]/models/route.ts` — Gemini parseResponse metadata extraction
2. `src/app/api/providers/[id]/sync-models/route.ts` — Carry metadata through sync
3. `src/lib/db/models.ts` — Extend replaceCustomModels parameter type and merge logic
4. `src/app/api/v1/models/catalog.ts` — Use stored token limits for custom models
5. `src/app/api/v1beta/models/route.ts` — Use stored limits instead of hardcoded defaults

## What We're Not Doing

- Not changing built-in model registry or its hardcoded specs
- Not adding UI changes for metadata display (dashboard already shows `supportedEndpoints` badges)
- Not adding request validation against `maxTemperature` (future work)
- Not creating a separate metadata store — keeping it in `customModels`
