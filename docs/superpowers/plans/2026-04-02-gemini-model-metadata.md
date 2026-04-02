# Gemini Model Metadata Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve Gemini API model metadata (token limits, capabilities, descriptions) when syncing models into OmniRoute's custom model store.

**Architecture:** Extend the existing `customModels` JSON blob with new optional fields. The Gemini `parseResponse` extracts metadata, the sync route carries it through, the DB stores it, and consumers (catalog, v1beta) read it with fallbacks.

**Tech Stack:** TypeScript, Next.js API routes, SQLite (key-value), existing model sync infrastructure.

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `src/app/api/providers/[id]/models/route.ts` | Modify | Extract metadata in Gemini parseResponse |
| `src/app/api/providers/[id]/sync-models/route.ts` | Modify | Carry metadata fields through sync |
| `src/lib/db/models.ts` | Modify | Extend replaceCustomModels type + merge |
| `src/app/api/v1/models/catalog.ts` | Modify | Use stored inputTokenLimit for context_length |
| `src/app/api/v1beta/models/route.ts` | Modify | Use stored limits instead of hardcoded defaults |

---

### Task 1: Extract metadata in Gemini parseResponse

**Files:**
- Modify: `src/app/api/providers/[id]/models/route.ts:129-140`

- [ ] **Step 1: Update the Gemini parseResponse to extract metadata fields**

Replace lines 134-139 with:

```typescript
    parseResponse: (data) => {
      const METHOD_TO_ENDPOINT: Record<string, string> = {
        generateContent: "chat",
        embedContent: "embeddings",
        predict: "images",
        predictLongRunning: "images",
        bidiGenerateContent: "audio",
        generateAnswer: "chat",
      };
      const IGNORED_METHODS = new Set([
        "countTokens",
        "countTextTokens",
        "createCachedContent",
        "batchGenerateContent",
        "asyncBatchEmbedContent",
      ]);

      return (data.models || []).map((m: Record<string, unknown>) => {
        const methods: string[] = Array.isArray(m.supportedGenerationMethods)
          ? m.supportedGenerationMethods
          : [];
        const endpoints = [
          ...new Set(
            methods
              .filter((method) => !IGNORED_METHODS.has(method))
              .map((method) => METHOD_TO_ENDPOINT[method] || "chat")
          ),
        ];
        if (endpoints.length === 0) endpoints.push("chat");

        return {
          ...m,
          id: ((m.name as string) || (m.id as string) || "").replace(/^models\//, ""),
          name: (m.displayName as string) || ((m.name as string) || "").replace(/^models\//, ""),
          supportedEndpoints: endpoints,
          ...(typeof m.inputTokenLimit === "number"
            ? { inputTokenLimit: m.inputTokenLimit }
            : {}),
          ...(typeof m.outputTokenLimit === "number"
            ? { outputTokenLimit: m.outputTokenLimit }
            : {}),
          ...(typeof m.description === "string" ? { description: m.description } : {}),
          ...(m.thinking === true ? { supportsThinking: true } : {}),
        };
      });
    },
```

- [ ] **Step 2: Build to verify no type errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors related to the modified file.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/providers/[id]/models/route.ts
git commit -m "feat(gemini): extract metadata from models API response"
```

---

### Task 2: Carry metadata through sync route

**Files:**
- Modify: `src/app/api/providers/[id]/sync-models/route.ts:186-192`

- [ ] **Step 1: Update the sync route to preserve metadata fields**

Replace lines 186-192 with:

```typescript
    const models = fetchedModels
      .map((m: any) => ({
        id: m.id || m.name || m.model,
        name: m.name || m.displayName || m.id || m.model,
        source: "auto-sync",
        ...(Array.isArray(m.supportedEndpoints) && m.supportedEndpoints.length > 0
          ? { supportedEndpoints: m.supportedEndpoints }
          : {}),
        ...(typeof m.inputTokenLimit === "number" ? { inputTokenLimit: m.inputTokenLimit } : {}),
        ...(typeof m.outputTokenLimit === "number" ? { outputTokenLimit: m.outputTokenLimit } : {}),
        ...(typeof m.description === "string" ? { description: m.description } : {}),
        ...(m.supportsThinking === true ? { supportsThinking: true } : {}),
      }))
      .filter((m: any) => m.id && !registryIds.has(m.id));
```

- [ ] **Step 2: Build to verify no type errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors related to the modified file.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/providers/[id]/sync-models/route.ts
git commit -m "feat(sync): carry Gemini metadata through model sync"
```

---

### Task 3: Extend replaceCustomModels to handle new fields

**Files:**
- Modify: `src/lib/db/models.ts:378-428`

- [ ] **Step 1: Update the TypeScript parameter type for replaceCustomModels**

Replace the parameter type at lines 380-386:

```typescript
  models: Array<{
    id: string;
    name?: string;
    source?: string;
    apiFormat?: string;
    supportedEndpoints?: string[];
    inputTokenLimit?: number;
    outputTokenLimit?: number;
    description?: string;
    supportsThinking?: boolean;
  }>,
```

- [ ] **Step 2: Preserve new metadata fields during merge**

In the merge block (lines 407-428), after the existing `supportedEndpoints` line (line 414), add preservation of the new fields. Replace lines 414-428 with:

```typescript
      supportedEndpoints: m.supportedEndpoints || (prev as any)?.supportedEndpoints || ["chat"],
      // Preserve metadata from provider API (or previous sync)
      ...(m.inputTokenLimit != null
        ? { inputTokenLimit: m.inputTokenLimit }
        : (prev as any)?.inputTokenLimit != null
        ? { inputTokenLimit: (prev as any).inputTokenLimit }
        : {}),
      ...(m.outputTokenLimit != null
        ? { outputTokenLimit: m.outputTokenLimit }
        : (prev as any)?.outputTokenLimit != null
        ? { outputTokenLimit: (prev as any).outputTokenLimit }
        : {}),
      ...(m.description != null
        ? { description: m.description }
        : (prev as any)?.description != null
        ? { description: (prev as any).description }
        : {}),
      ...(m.supportsThinking != null
        ? { supportsThinking: m.supportsThinking }
        : (prev as any)?.supportsThinking != null
        ? { supportsThinking: (prev as any).supportsThinking }
        : {}),
      // Preserve existing compat flags
      ...(prev && (prev as any).normalizeToolCallId !== undefined
        ? { normalizeToolCallId: (prev as any).normalizeToolCallId }
        : {}),
      ...(prev && (prev as any).preserveOpenAIDeveloperRole !== undefined
        ? { preserveOpenAIDeveloperRole: (prev as any).preserveOpenAIDeveloperRole }
        : {}),
      ...(prev && (prev as any).compatByProtocol
        ? { compatByProtocol: (prev as any).compatByProtocol }
        : {}),
      ...(prev && (prev as any).upstreamHeaders
        ? { upstreamHeaders: (prev as any).upstreamHeaders }
        : {}),
```

- [ ] **Step 3: Build to verify no type errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/db/models.ts
git commit -m "feat(db): extend replaceCustomModels with metadata fields"
```

---

### Task 4: Use stored token limits in catalog

**Files:**
- Modify: `src/app/api/v1/models/catalog.ts:443-458`

- [ ] **Step 1: Add context_length from stored inputTokenLimit for custom models**

In the custom models section, add `context_length` to the first `models.push` (around line 443). After the existing `...(visionFields || {}),` line, add:

The full replacement for lines 443-458:

```typescript
          models.push({
            id: aliasId,
            object: "model",
            created: timestamp,
            owned_by: canonicalProviderId,
            permission: [],
            root: modelId,
            parent: null,
            custom: true,
            ...(modelType ? { type: modelType } : {}),
            ...(apiFormat !== "chat-completions" ? { api_format: apiFormat } : {}),
            ...(endpoints.length > 1 || !endpoints.includes("chat")
              ? { supported_endpoints: endpoints }
              : {}),
            ...(typeof (model as any).inputTokenLimit === "number"
              ? { context_length: (model as any).inputTokenLimit }
              : {}),
            ...(visionFields || {}),
          });
```

- [ ] **Step 2: Build to verify no type errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/v1/models/catalog.ts
git commit -m "feat(catalog): use stored inputTokenLimit for custom model context_length"
```

---

### Task 5: Use stored limits in v1beta models endpoint

**Files:**
- Modify: `src/app/api/v1beta/models/route.ts`

- [ ] **Step 1: Import getCustomModels and extend the v1beta route**

Replace the entire file content with:

```typescript
import { CORS_ORIGIN } from "@/shared/utils/cors";
import { PROVIDER_MODELS } from "@/shared/constants/models";
import { getAllCustomModels } from "@/lib/db/models";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": CORS_ORIGIN,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * GET /v1beta/models - Gemini compatible models list
 * Returns models in Gemini API format with real token limits when available.
 */
export async function GET() {
  try {
    const models = [];

    // Built-in models (hardcoded defaults)
    for (const [provider, providerModels] of Object.entries(PROVIDER_MODELS)) {
      for (const model of providerModels) {
        models.push({
          name: `models/${provider}/${model.id}`,
          displayName: model.name || model.id,
          description: `${provider} model: ${model.name || model.id}`,
          supportedGenerationMethods: ["generateContent"],
          inputTokenLimit: 128000,
          outputTokenLimit: 8192,
        });
      }
    }

    // Custom models (use stored metadata from provider APIs)
    try {
      const customModelsMap = (await getAllCustomModels()) as Record<string, unknown>;
      for (const [providerId, rawModels] of Object.entries(customModelsMap)) {
        if (!Array.isArray(rawModels)) continue;
        for (const model of rawModels) {
          if (!model || typeof model !== "object" || typeof (model as any).id !== "string") continue;
          const m = model as Record<string, unknown>;
          if (m.isHidden === true) continue;
          models.push({
            name: `models/${providerId}/${m.id}`,
            displayName: m.name || m.id,
            ...(typeof m.description === "string" ? { description: m.description } : {}),
            supportedGenerationMethods: ["generateContent"],
            inputTokenLimit:
              typeof m.inputTokenLimit === "number" ? m.inputTokenLimit : 128000,
            outputTokenLimit:
              typeof m.outputTokenLimit === "number" ? m.outputTokenLimit : 8192,
            ...(m.supportsThinking === true ? { thinking: true } : {}),
          });
        }
      }
    } catch {
      // Custom models are optional — skip on error
    }

    return Response.json({ models });
  } catch (error: any) {
    console.log("Error fetching models:", error);
    return Response.json({ error: { message: error.message } }, { status: 500 });
  }
}
```

- [ ] **Step 2: Build to verify no type errors**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/v1beta/models/route.ts
git commit -m "feat(v1beta): use stored token limits and metadata in Gemini models endpoint"
```

---

### Task 6: Build and smoke test

- [ ] **Step 1: Full production build**

Run: `npm run build 2>&1 | tail -10`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Restart the production server on port 20130**

Stop the running server, then:
```bash
PORT=20130 DASHBOARD_PORT=20130 npm run start &
```

- [ ] **Step 3: Trigger a model sync for the Gemini provider via the dashboard**

In the browser at `http://localhost:20130/dashboard`, navigate to the Gemini provider and trigger a model sync. Then verify the custom models in the DB have the new fields by checking the provider's model list in the dashboard — models should show endpoint badges (chat, embeddings, images, audio) based on their actual capabilities.

- [ ] **Step 4: Verify v1beta endpoint returns real limits**

```bash
curl -s http://localhost:20130/api/v1beta/models | python3 -c "
import json, sys
data = json.load(sys.stdin)
for m in data.get('models', []):
    if 'gemini' in m.get('name', '') and 'inputTokenLimit' in m:
        if m['inputTokenLimit'] != 128000:
            print(f'{m[\"name\"]}: input={m[\"inputTokenLimit\"]}, output={m[\"outputTokenLimit\"]}')
            break
"
```

Expected: Should show at least one Gemini model with `input=1048576` (the real value from the API, not the hardcoded 128000).

- [ ] **Step 5: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: address build/smoke test issues"
```
