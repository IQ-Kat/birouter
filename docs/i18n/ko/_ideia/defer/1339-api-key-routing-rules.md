# Feature: API Key Routing Rules for Custom Endpoints (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/defer/1339-api-key-routing-rules.md) · 🇪🇸 [es](../../../es/_ideia/defer/1339-api-key-routing-rules.md) · 🇫🇷 [fr](../../../fr/_ideia/defer/1339-api-key-routing-rules.md) · 🇩🇪 [de](../../../de/_ideia/defer/1339-api-key-routing-rules.md) · 🇮🇹 [it](../../../it/_ideia/defer/1339-api-key-routing-rules.md) · 🇷🇺 [ru](../../../ru/_ideia/defer/1339-api-key-routing-rules.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/defer/1339-api-key-routing-rules.md) · 🇯🇵 [ja](../../../ja/_ideia/defer/1339-api-key-routing-rules.md) · 🇰🇷 [ko](../../../ko/_ideia/defer/1339-api-key-routing-rules.md) · 🇸🇦 [ar](../../../ar/_ideia/defer/1339-api-key-routing-rules.md) · 🇮🇳 [hi](../../../hi/_ideia/defer/1339-api-key-routing-rules.md) · 🇮🇳 [in](../../../in/_ideia/defer/1339-api-key-routing-rules.md) · 🇹🇭 [th](../../../th/_ideia/defer/1339-api-key-routing-rules.md) · 🇻🇳 [vi](../../../vi/_ideia/defer/1339-api-key-routing-rules.md) · 🇮🇩 [id](../../../id/_ideia/defer/1339-api-key-routing-rules.md) · 🇲🇾 [ms](../../../ms/_ideia/defer/1339-api-key-routing-rules.md) · 🇳🇱 [nl](../../../nl/_ideia/defer/1339-api-key-routing-rules.md) · 🇵🇱 [pl](../../../pl/_ideia/defer/1339-api-key-routing-rules.md) · 🇸🇪 [sv](../../../sv/_ideia/defer/1339-api-key-routing-rules.md) · 🇳🇴 [no](../../../no/_ideia/defer/1339-api-key-routing-rules.md) · 🇩🇰 [da](../../../da/_ideia/defer/1339-api-key-routing-rules.md) · 🇫🇮 [fi](../../../fi/_ideia/defer/1339-api-key-routing-rules.md) · 🇵🇹 [pt](../../../pt/_ideia/defer/1339-api-key-routing-rules.md) · 🇷🇴 [ro](../../../ro/_ideia/defer/1339-api-key-routing-rules.md) · 🇭🇺 [hu](../../../hu/_ideia/defer/1339-api-key-routing-rules.md) · 🇧🇬 [bg](../../../bg/_ideia/defer/1339-api-key-routing-rules.md) · 🇸🇰 [sk](../../../sk/_ideia/defer/1339-api-key-routing-rules.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/defer/1339-api-key-routing-rules.md) · 🇮🇱 [he](../../../he/_ideia/defer/1339-api-key-routing-rules.md) · 🇵🇭 [phi](../../../phi/_ideia/defer/1339-api-key-routing-rules.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/defer/1339-api-key-routing-rules.md) · 🇨🇿 [cs](../../../cs/_ideia/defer/1339-api-key-routing-rules.md) · 🇹🇷 [tr](../../../tr/_ideia/defer/1339-api-key-routing-rules.md)

---

> GitHub Issue: #1339 — opened by @uwuclxdy on 2026-04-16
> Status: ⏭️ DEFER | Priority: Medium

## 📝 Original Request

When using a custom OpenAI endpoint with multiple API keys, the only available routing option is "round-robin". The user wants the ability to configure routing strategies per-provider (e.g., "exhaust first key before using second"), similar to how combo-level strategies already work.

The user included a screenshot of the API key popup in the dashboard, highlighting that there's no strategy selector available at the provider/connection level.

## 💬 Community Discussion

### Participants

- @uwuclxdy — Original requester, active contributor (also opened #1364, #1182)

### Key Points

- Currently, routing strategies (priority, weighted, fill-first, round-robin, etc.) are only configurable at the combo level
- Provider-level multi-key rotation is hardcoded to round-robin
- User wants "fill-first" (exhaust first key before next) for cost optimization
- Affects custom OpenAI-compatible and Anthropic-compatible providers

## 🎯 Refined Feature Description

Extend the provider connection management to allow per-provider API key routing strategy selection, mirroring the 13 strategies already available at the combo level.

### What it solves

- Users with multiple API keys for the same provider cannot control which key is used first
- Round-robin wastes quota evenly across keys instead of exhausting free/cheaper tiers first
- No parity between combo-level routing flexibility and provider-level key management

### How it should work (high level)

1. Add a "Key Routing Strategy" dropdown to the provider detail page's connection/key management popup
2. Support at minimum: `round-robin`, `priority`, `fill-first`, `random`
3. Store the per-provider strategy in the `provider_connections` table or a new column
4. The combo routing engine respects per-provider key strategy when dispatching requests

### Affected areas

- `open-sse/services/combo.ts` — key selection within a provider target
- `src/lib/db/providers.ts` — store per-provider key strategy
- `src/app/(dashboard)/dashboard/providers/[id]/page.tsx` — UI for strategy selection
- `src/shared/validation/schemas.ts` — new schema for provider key strategy

## 📎 Attachments & References

- Screenshot of API key popup: https://github.com/user-attachments/assets/d26049ba-0dba-4c64-8ed4-8f68e8c00252

## 🔗 Related Ideas

- Related to combo routing engine strategies in `open-sse/services/combo.ts`
