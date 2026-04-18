# Feature: Add TPS (Tokens Per Second) Metric (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/defer/1182-tps-metric.md) · 🇪🇸 [es](../../../es/_ideia/defer/1182-tps-metric.md) · 🇫🇷 [fr](../../../fr/_ideia/defer/1182-tps-metric.md) · 🇩🇪 [de](../../../de/_ideia/defer/1182-tps-metric.md) · 🇮🇹 [it](../../../it/_ideia/defer/1182-tps-metric.md) · 🇷🇺 [ru](../../../ru/_ideia/defer/1182-tps-metric.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/defer/1182-tps-metric.md) · 🇯🇵 [ja](../../../ja/_ideia/defer/1182-tps-metric.md) · 🇰🇷 [ko](../../../ko/_ideia/defer/1182-tps-metric.md) · 🇸🇦 [ar](../../../ar/_ideia/defer/1182-tps-metric.md) · 🇮🇳 [hi](../../../hi/_ideia/defer/1182-tps-metric.md) · 🇮🇳 [in](../../../in/_ideia/defer/1182-tps-metric.md) · 🇹🇭 [th](../../../th/_ideia/defer/1182-tps-metric.md) · 🇻🇳 [vi](../../../vi/_ideia/defer/1182-tps-metric.md) · 🇮🇩 [id](../../../id/_ideia/defer/1182-tps-metric.md) · 🇲🇾 [ms](../../../ms/_ideia/defer/1182-tps-metric.md) · 🇳🇱 [nl](../../../nl/_ideia/defer/1182-tps-metric.md) · 🇵🇱 [pl](../../../pl/_ideia/defer/1182-tps-metric.md) · 🇸🇪 [sv](../../../sv/_ideia/defer/1182-tps-metric.md) · 🇳🇴 [no](../../../no/_ideia/defer/1182-tps-metric.md) · 🇩🇰 [da](../../../da/_ideia/defer/1182-tps-metric.md) · 🇫🇮 [fi](../../../fi/_ideia/defer/1182-tps-metric.md) · 🇵🇹 [pt](../../../pt/_ideia/defer/1182-tps-metric.md) · 🇷🇴 [ro](../../../ro/_ideia/defer/1182-tps-metric.md) · 🇭🇺 [hu](../../../hu/_ideia/defer/1182-tps-metric.md) · 🇧🇬 [bg](../../../bg/_ideia/defer/1182-tps-metric.md) · 🇸🇰 [sk](../../../sk/_ideia/defer/1182-tps-metric.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/defer/1182-tps-metric.md) · 🇮🇱 [he](../../../he/_ideia/defer/1182-tps-metric.md) · 🇵🇭 [phi](../../../phi/_ideia/defer/1182-tps-metric.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/defer/1182-tps-metric.md) · 🇨🇿 [cs](../../../cs/_ideia/defer/1182-tps-metric.md) · 🇹🇷 [tr](../../../tr/_ideia/defer/1182-tps-metric.md)

---

> GitHub Issue: #1182 — opened by @uwuclxdy on 2026-04-12
> Status: ⏭️ DEFER | Priority: Medium

## 📝 Original Request

Add a Tokens Per Second (TPS) metric to the OmniRoute dashboard to measure and display the speed of model responses. This would help users compare provider/model performance and make informed routing decisions.

## 💬 Community Discussion

### Participants

- @uwuclxdy — Original requester, active contributor (also opened #1339, #1364)
- 3 comments in discussion thread

### Key Points

- TPS is a key metric for comparing streaming performance across providers
- Would require measuring token output rate during streaming responses
- Useful for both real-time display (per-request) and historical aggregation
- Could feed into routing decisions (e.g., prefer faster providers for interactive use)

## 🎯 Refined Feature Description

Instrument the streaming response pipeline to measure and display Tokens Per Second (TPS) — the rate at which tokens are generated — per request, per model, and per provider.

### What it solves

- No visibility into streaming response speed across providers/models
- Cannot compare provider performance objectively
- Cannot make routing decisions based on throughput

### How it should work (high level)

1. During streaming responses, track the time between the first and last token
2. Count output tokens from the response `usage` field or chunk count
3. Calculate TPS = total_output_tokens / (last_token_time - first_token_time)
4. Display TPS on: individual request logs, provider metrics, combo metrics
5. Optionally expose TPS via the MCP server `get_provider_metrics` tool
6. Store historical TPS data for trend analysis in the dashboard

### Affected areas

- `open-sse/handlers/chatCore.ts` — instrument streaming for timing
- `open-sse/services/usage.ts` — store TPS alongside existing usage metrics
- `src/lib/db/detailedLogs.ts` — add TPS column to detailed logs
- `src/app/(dashboard)/dashboard/logs/` — display TPS in log entries
- `src/app/(dashboard)/dashboard/endpoint/` — display TPS in provider/combo metrics
- DB migrations — new `tps` column in relevant tables

## 📎 Attachments & References

- No external references

## 🔗 Related Ideas

- TPS data could feed into [1041-smart-auto-combos](./1041-smart-auto-combos.md) scoring
- Related to [980-lkgp-routing](./980-lkgp-routing.md) — throughput as routing signal
