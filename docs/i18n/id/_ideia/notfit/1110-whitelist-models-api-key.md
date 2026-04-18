# Feature: [Feature] whitelist models for specific API KEY (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/notfit/1110-whitelist-models-api-key.md) · 🇪🇸 [es](../../../es/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇫🇷 [fr](../../../fr/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇩🇪 [de](../../../de/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇮🇹 [it](../../../it/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇷🇺 [ru](../../../ru/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇯🇵 [ja](../../../ja/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇰🇷 [ko](../../../ko/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇸🇦 [ar](../../../ar/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇮🇳 [hi](../../../hi/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇮🇳 [in](../../../in/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇹🇭 [th](../../../th/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇻🇳 [vi](../../../vi/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇮🇩 [id](../../../id/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇲🇾 [ms](../../../ms/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇳🇱 [nl](../../../nl/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇵🇱 [pl](../../../pl/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇸🇪 [sv](../../../sv/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇳🇴 [no](../../../no/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇩🇰 [da](../../../da/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇫🇮 [fi](../../../fi/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇵🇹 [pt](../../../pt/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇷🇴 [ro](../../../ro/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇭🇺 [hu](../../../hu/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇧🇬 [bg](../../../bg/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇸🇰 [sk](../../../sk/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇮🇱 [he](../../../he/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇵🇭 [phi](../../../phi/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇨🇿 [cs](../../../cs/_ideia/notfit/1110-whitelist-models-api-key.md) · 🇹🇷 [tr](../../../tr/_ideia/notfit/1110-whitelist-models-api-key.md)

---

> GitHub Issue: #1110 — opened by @0xtbug on 2026-04-10T09:26:02Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

For better API KEY management, the system needs to support a customized model list (whitelist) for specific API KEYs. This is crucial for access control, cost limitation, and offering tiered services.

For example:

- api_key_1 (Admin/Pro): can access all models (\*).
- api_key_2 (Basic): can only access specific, perhaps cheaper, models like gpt-3.5-turbo, claude-3-haiku.
- api_key_3 (Vendor): can access all models from a specific provider alongside specific extra models (e.g., anthropic/\*, model_extra_1).

### Proposed Solution

1. Data Schema Update: Add a new optional property (e.g., allowed_models as an array of strings) to the API Key database/schema. Support wildcards or provider namespaces (e.g., _, openai/_, gpt-4).
2. Middleware / Validation Logic: Modify the authentication middleware. After validating the API Key, intercept the request payload to check if the requested model is within the key's allowed list.
3. Interception: If the requested model is not in the API Key's whitelist, reject the request with a 403 Forbidden status and a clear error message (e.g., "Model not allowed for this API key").
4. Admin Dashboard (If UI exists): Add a multi-select dropdown in the API Key creation interface so admins can easily configure permitted models for the new key.

### Alternatives Considered

- Using a Separate Reverse Proxy (API Gateway). Drawback: Adds infrastructure complexity.
- Deploying Different Instances. Drawback: Highly resource-intensive.

### Acceptance Criteria

- API keys with \* access (or no restrictions) can successfully call all available models (200 OK).
- API keys attempting to call unsupported models are rejected with 403 Forbidden.
- Support wildcard parsing logic (`openai/*`).
- No significant performance latency.

## 💬 Community Discussion

- @kilo-code-bot — Triaged this issue as a duplicate of #781 (Similarity score: 90%). Tagged `kilo-duplicate`.

## 🎯 Refined Feature Description

Allow administrators to restrict which specific models/combos an OmniRoute API Key can invoke. Currently, an OmniRoute key grants access to all configured combos. This feature would restrict that access at the routing layer (`chatCore.ts` or auth middleware).

### What it solves

Allows the creation of "cheap" keys for casual tools and "expensive" keys for priority workflows.

### Affected areas

- `src/lib/db/apiKeys.ts`
- `open-sse/handlers/chatCore.ts` (or the Auth plugin)
- Dashboard `ApiKeysView.tsx`

## 📎 Attachments & References

N/A

## 🔗 Related Ideas

> ℹ️ This feature is a duplicate of #781. Consider marking it as ALREADY EXISTS or NOT FIT depending on #781 status.
