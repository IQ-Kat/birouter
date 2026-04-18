# Feature: Reduce GPU Usage of the UI (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇪🇸 [es](../../../es/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇫🇷 [fr](../../../fr/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇩🇪 [de](../../../de/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇮🇹 [it](../../../it/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇷🇺 [ru](../../../ru/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇯🇵 [ja](../../../ja/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇰🇷 [ko](../../../ko/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇸🇦 [ar](../../../ar/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇮🇳 [hi](../../../hi/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇮🇳 [in](../../../in/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇹🇭 [th](../../../th/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇻🇳 [vi](../../../vi/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇮🇩 [id](../../../id/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇲🇾 [ms](../../../ms/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇳🇱 [nl](../../../nl/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇵🇱 [pl](../../../pl/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇸🇪 [sv](../../../sv/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇳🇴 [no](../../../no/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇩🇰 [da](../../../da/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇫🇮 [fi](../../../fi/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇵🇹 [pt](../../../pt/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇷🇴 [ro](../../../ro/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇭🇺 [hu](../../../hu/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇧🇬 [bg](../../../bg/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇸🇰 [sk](../../../sk/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇮🇱 [he](../../../he/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇵🇭 [phi](../../../phi/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇨🇿 [cs](../../../cs/_ideia/viable/1369-reduce-gpu-usage-ui.md) · 🇹🇷 [tr](../../../tr/_ideia/viable/1369-reduce-gpu-usage-ui.md)

---

> GitHub Issue: #1369 — opened by @sergedc on 2026-04-17
> Status: ✅ VIABLE | Priority: HIGH

## 📝 Original Request

When on `/dashboard/limits` or `/dashboard/logs`, the GPU usage (Nvidia RTX 3060 mobile) spikes to 30% in Windows 11 Task Manager. This only happens when the tab is active — switching to another tab drops GPU to 0%. Returning to those pages brings it back to 30%.

The root cause is the browser being forced to re-composite expensive `backdrop-filter: blur()` layers every time re-renders happen following the frequent API calls to update logs and limits data.

**Reproduction**: Requires a 4K screen with high DPI to observe the spike.

### Proposed Solutions (from author)

**A. Replace blurs with solid colors** (biggest impact):

- `Sidebar.tsx`: Remove `bg-vibrancy backdrop-blur-xl`, use opaque `bg-sidebar`
- `Header.tsx`: Remove `bg-bg/80 backdrop-blur-xl`, use opaque `bg-bg`

**B. Memoize data** to skip identical re-renders:

- In `RequestLoggerV2.tsx` and `ProxyLogger.tsx`, only call `setLogs` if data actually changed (JSON comparison)

**C. Add `content-visibility: auto`** to table rows to skip painting off-screen rows, limiting repaint blast radius.

## 💬 Community Discussion

### Participants

- @sergedc — Original requester, provided root cause analysis and 3 concrete solutions

### Key Points

- Issue is specific to pages with frequent data refresh cycles (logs, limits)
- GPU spike is caused by CSS `backdrop-filter: blur()` compositing on every React re-render
- All 3 proposed solutions are complementary and low-risk
- No other comments or objections

## 🎯 Refined Feature Description

Reduce unnecessary GPU utilization on dashboard pages that perform frequent data polling by eliminating expensive CSS compositing effects and preventing unnecessary React re-renders.

### What it solves

- 30% GPU spike on dashboard pages with frequent data refreshes (logs, limits)
- Browser forced to re-composite expensive backdrop-filter blur layers every re-render cycle
- Particularly impactful on high-DPI 4K displays where compositing cost is multiplied

### How it should work (high level)

1. Replace `backdrop-blur-xl` with opaque solid backgrounds in `Sidebar.tsx` and `Header.tsx`
2. Add data memoization in `RequestLoggerV2.tsx` and `ProxyLogger.tsx` — compare incoming data with previous state before triggering a re-render
3. Add `content-visibility: auto` CSS to log/limit table rows to skip painting off-screen content
4. Verify visual appearance is maintained (opaque backgrounds should still look good in both light/dark themes)

### Affected areas

- `src/shared/components/Sidebar.tsx` — replace blur with opaque background
- `src/shared/components/Header.tsx` — replace blur with opaque background
- `src/app/(dashboard)/dashboard/logs/` — memoize log data fetches
- `src/app/(dashboard)/dashboard/limits/` — memoize limit data fetches
- Global CSS / Tailwind — `content-visibility: auto` utility

## 📎 Attachments & References

- No external references; author provided inline analysis

## 🔗 Related Ideas

- No directly related ideas in the backlog
