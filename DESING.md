# Birouter — Design System & Visual Identity

> **Status:** analysis + standardization plan (no code applied yet — this doc is the spec to approve before implementation).
> **Date:** 2026-06-16 · **Scope:** unify the Birouter dashboard (`src/`) with the marketing site (`_mono_repo/birouterSite/`) into **one visual identity** — same graph-paper grid background, same color tokens, standardized components.

---

## 1. Purpose

The marketing site (`viral.omniroute.online`, `why.omniroute.online`, `omniroute.online`) and the product dashboard should look like **one product**. The site already borrowed its palette from the dashboard — its `css/tokens.css` even says _"Palette mirrors the Birouter dashboard (src/app/globals.css)"_. So the two are already ~80% aligned at the color level. What's missing on the dashboard:

1. The **graph-paper grid wallpaper** the site uses on every page.
2. A handful of **shared design tokens** the site has but the dashboard lacks (radius scale, brand gradient, `surface-2`, mono font).
3. **Component-level consistency** — a number of dashboard components bypass the theme tokens with hardcoded hex/rgba.

This document is the analysis and the plan. **Nothing is changed until approved.**

---

## 2. Principles

- **Single source of truth = `src/app/globals.css`.** The site mirrors the dashboard, never the other way around. New tokens land in `globals.css` first.
- **Tokens, never literals.** Components consume semantic tokens (`bg-surface`, `text-primary`, `border-border`), never raw `#hex`.
- **Subtle, not loud.** The grid is a faint wallpaper that sits behind content — it must never reduce text contrast or fight the UI.
- **Theme-aware.** Everything works in both `.dark` (default-ish, the product's signature look) and light.
- **Surgical rollout.** Ship the grid + tokens first (low risk, high visibility), then component cleanups in waves.

---

## 3. Current state — what's already aligned vs. what's not

### 3.1 Colors — already unified ✅

Every brand color and surface already matches the site **by value** (only the names differ — dashboard prefixes with `--color-`). Verified in `src/app/globals.css:30-128`:

| Concept                    | Site token (`tokens.css`)                   | Dashboard token (`globals.css`) | Match        |
| -------------------------- | ------------------------------------------- | ------------------------------- | ------------ |
| primary                    | `--primary #e54d5e`                         | `--color-primary #e54d5e`       | ✅           |
| primary-hover              | `--primary-hover #c93d4e`                   | `--color-primary-hover #c93d4e` | ✅           |
| accent                     | `--accent #6366f1`                          | `--color-accent #6366f1`        | ✅           |
| accent-2                   | `--accent-2 #8b5cf6`                        | `--color-accent-hover #8b5cf6`  | ✅ (renamed) |
| accent-3                   | `--accent-3 #a855f7`                        | `--color-accent-light #a855f7`  | ✅ (renamed) |
| success / warning / error  | `#22c55e / #f59e0b / #ef4444`               | identical                       | ✅           |
| traffic lights             | `#ff5f56 / #ffbd2e / #27c93f`               | identical                       | ✅           |
| dark bg / surface / border | `#0b0e14 / #161b22 / rgba(255,255,255,.08)` | identical                       | ✅           |
| light bg / surface / text  | `#f9f9fb / #fff / #1a1a2e`                  | identical                       | ✅           |

**Conclusion:** there is no color migration to do. The identity is already shared; we are _finishing_ it, not rebuilding it.

### 3.2 Gaps — what the dashboard is missing

| Gap                     | Site has                                                                       | Dashboard                                                  | Action                 |
| ----------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------- | ---------------------- |
| **Grid wallpaper**      | `body::before` graph-paper, `--grid-line`, `--grid-size 46px`, `--section-alt` | none (flat `--color-bg`)                                   | **Part A**             |
| **Radius scale**        | `--radius 14px`, `--radius-sm 9px`                                             | none — primitives use ad-hoc `rounded-md/lg/xl` (6/8/12px) | **Part B**             |
| **Brand gradient**      | `--grad-brand 135deg primary→accent-3`                                         | none — only a one-off `.bg-hero-gradient`                  | **Part B**             |
| **Nested surface**      | `--surface-2 #1c2230`                                                          | none                                                       | **Part B**             |
| **Mono font**           | `--font-mono` (ui-monospace stack)                                             | none (code/terminal areas have no token)                   | **Part B**             |
| **`text-muted` (dark)** | `#8b8b9e`                                                                      | `#a1a1aa` (zinc-400)                                       | reconcile — **Part B** |

### 3.3 Theming mechanics (so we don't break anything)

- **Tailwind v4, CSS-first** (no `tailwind.config.*`). Tokens are defined in `:root`/`.dark` and exposed to utilities via `@theme inline` (`globals.css:130-179`).
- **Dark via `.dark` class** on `<html>` (`@custom-variant dark` at `globals.css:22`), toggled by a custom Zustand store (`src/store/themeStore.ts`), default theme = `system` (`src/shared/constants/appConfig.ts:11`). The site uses `html[data-theme="light"]` instead — **the mechanisms differ but never meet** (separate origins), so no conflict. We keep the dashboard's `.dark` mechanism.
- **Runtime primary override** exists (`themeStore.ts:85-97`, presets in `COLOR_THEMES`) — users can swap `--color-primary`. Any new token (gradient, etc.) that references `--color-primary` will inherit those overrides for free. ✅

---

## 4. Part A — The graph-paper grid background (headline ask)

### 4.1 What it is

The exact recipe from the site (`_mono_repo/birouterSite/css/base.css`): a **fixed, full-viewport pseudo-element** painting two 1px line gradients, sitting at `z-index:-1` behind all content.

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
}
```

**Why this works even though `body` has an opaque `background-color`:** a `::before` with `z-index:-1` paints _above_ the element's own background but _below_ its in-flow content. So `--color-bg` is the base fill, the grid is layered on top of it, and the app renders above the grid.

### 4.2 Precedent already in the codebase

`src/app/landing/page.tsx:16-26` **already implements this same grid per-page** — but with **red** lines (`#E54D5E`, opacity `0.06`) at **50px**, plus animated orbs. So the pattern is proven in the product; we are promoting it to a **global, theme-aware** wallpaper and (optionally) retiring the duplicate.

### 4.3 Tokens to add (in `globals.css`)

```css
:root {
  /* light */
  --grid-line: rgba(0, 0, 0, 0.045);
  --grid-size: 46px;
  --section-alt: rgba(0, 0, 0, 0.022);
}
.dark {
  /* dark */
  --grid-line: rgba(255, 255, 255, 0.035);
  --section-alt: rgba(255, 255, 255, 0.018);
}
```

### 4.4 The single blocker

The grid is global by construction (it covers the panel, `auth`/`login`, error pages — every route — at once). Exactly **one** element hides it inside the panel:

- `src/shared/components/layouts/DashboardLayout.tsx:62` — the outer wrapper paints an opaque `bg-bg`:

  ```jsx
  <div className="flex h-dvh min-h-0 w-full overflow-hidden bg-bg">
  ```

  Everything below it is already transparent — `<main>` (`:93`), the scroll container (`:102`), the `max-w-7xl` inner (`:103`). So **removing `bg-bg` from this one line** lets the body grid show through the entire content area (the body's `--color-bg` remains the base fill underneath the grid).

  ```diff
  - <div className="flex h-dvh min-h-0 w-full overflow-hidden bg-bg">
  + <div className="flex h-dvh min-h-0 w-full overflow-hidden">
  ```

### 4.5 Chrome interaction (sidebar / header)

- `Header` (`src/shared/components/Header.tsx:207`, `bg-bg`) and `Sidebar` (`src/shared/components/Sidebar.tsx:430`, `bg-sidebar`) stay **opaque** → the grid shows in the **content area only**, with solid chrome framing it. This is the recommended, calm default and matches how the site separates chrome from canvas.
- _Optional vibrancy variant:_ make the header translucent (`bg-bg/80 backdrop-blur`) so the grid runs behind it. A `.bg-vibrancy` helper already exists (`globals.css:370`). **Decision D3 below.**

### 4.6 Login / auth / error pages

These render directly under `<body>` (no panel chrome) and their page wrappers are mostly transparent — the global grid appears behind them automatically. One exception: `src/app/login/page.tsx:124,139` uses opaque `bg-bg` wrappers; soften the same way if we want the grid there too (minor, **D4**).

### 4.7 Landing page

`landing/page.tsx` keeps its richer animated background (orbs + vignette). Options: (a) leave it as-is (its own splash identity), or (b) align its grid to the global tokens (46px, neutral lines) for consistency. **Recommend (a)** — it's a marketing splash, not a panel screen. **Decision D5.**

---

## 5. Part B — Token unification

Add to `globals.css` (`:root` + `@theme inline`) so the dashboard gains the site's missing tokens. None of these change existing colors; they add the _missing_ primitives.

```css
:root {
  --surface-2: #f5f5fa; /* light: nested panels */
  --radius: 14px;
  --radius-sm: 9px;
  --grad-brand: linear-gradient(135deg, var(--color-primary), var(--color-accent-light));
  --font-mono: ui-monospace, "JetBrains Mono", "Fira Code", "SF Mono", monospace;
}
.dark {
  --surface-2: #1c2230;
}

@theme inline {
  --color-surface-2: var(--surface-2); /* enables bg-surface-2 */
  --radius-lg: var(--radius); /* enables rounded-lg = 14px */
  --radius-md: var(--radius-sm); /* enables rounded-md = 9px */
  --font-mono: var(--font-mono); /* enables font-mono */
}
```

| Token                      | Why                                                             | Consumers                                                   |
| -------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------- |
| `--radius` / `--radius-sm` | One radius scale (14/9) instead of 6/8/12 ad-hoc                | Button, Card, Modal, Input, Select                          |
| `--grad-brand`             | Brand gradient for primary CTAs (red→violet), matching the site | Button `primary`, hero/CTA surfaces                         |
| `--surface-2`              | Nested panels / table headers / inset rows                      | Card.Section, DataTable header, inputs                      |
| `--font-mono`              | Code blocks, terminal, IDs, endpoints                           | ConsoleLogViewer, code snippets, `localhost:20128/v1` chips |
| `--text-muted` reconcile   | Pick one value site↔panel                                       | global                                                      |

**Decision D2 (text-muted):** site `#8b8b9e` vs dashboard `#a1a1aa`. Recommend keeping the **dashboard's `#a1a1aa`** (it's the live product, slightly higher contrast) and updating the _site_ to match. Low priority, cosmetic.

---

## 6. Part C — Component standardization

The component layer is **custom** (no shadcn/Radix), Tailwind v4, semantic tokens **mostly** adopted (`bg-surface`, `border-white/10`, `ring-primary`) — good adoption (195 files import the shared barrel). The work is removing the **bypasses**. Home: `src/shared/components/`.

Ranked by impact × reach:

| #   | Item                                       | File(s)                                                                                                                                                                                       | Problem → Target                                                                                                                                                                                                                                 |
| --- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| C1  | **Radius alignment**                       | `Button.tsx:14-18`, `Card.tsx:39`, `Modal.tsx`, `Input.tsx`, `Select.tsx`                                                                                                                     | mixed 6/8/12px → repoint to `--radius`/`--radius-sm` (14/9)                                                                                                                                                                                      |
| C2  | **Button gradient + `accent` variant**     | `Button.tsx:5-12`                                                                                                                                                                             | primary is flat red→red (`from-primary to-primary-hover`); align to `--grad-brand` (red→violet) and add the missing `accent` variant (indigo `#6366f1` is unused by buttons) — **highest visibility, ~195 importers**. **Decision D1.**          |
| C3  | **Tables**                                 | `DataTable.tsx:122-176`, `logTableStyles.ts`, `globals.css:405-414` (Ant remnants)                                                                                                            | `DataTable` is 100% inline hardcoded rgba + references non-existent vars (`--text-secondary`, `--bg-table-header`); migrate to tokens, retire the 2 divergent table styles. Tables are everywhere (providers/connections/logs) — worst offender. |
| C4  | **Centralize status colors**               | `flow/edgeStyles.ts:7-12`, `TokenHealthBadge.tsx:14-19`, `DegradationBadge.tsx`, `ProviderCascadeNode.tsx`, `Badge.tsx`, +5 `statusColor` helpers                                             | 6+ copies of the same `#22c55e/#f59e0b/#ef4444` hex; create one `statusColors` module driven off `--color-success/warning/error`. Critical for circuit-breaker / cooldown / lockout badges to read consistently.                                 |
| C5  | **Card border**                            | `Card.tsx:39`                                                                                                                                                                                 | uses `border-white/5`; brand border is `/8` → align                                                                                                                                                                                              |
| C6  | **Focus ring reconcile**                   | `globals.css:183` vs component `ring-primary/30`                                                                                                                                              | global `:focus-visible` is indigo (`--color-accent`), components are red (`ring-primary`) — pick one (recommend **accent/indigo** globally, it reads as the "interactive" color)                                                                 |
| C7  | **Add `Checkbox` + `Textarea` primitives** | currently raw `<input>`/`<textarea>` with inline `accentColor:#6366f1` (e.g. `ColumnToggle.tsx:91`)                                                                                           | create token-driven primitives                                                                                                                                                                                                                   |
| C8  | **Hardcoded-hex sweep**                    | `ConsoleLogViewer.tsx:240` (`#161b22`/`#30363d`), `ComboLiveStudio.tsx:306` (`#6366f120`), Modal traffic dots `Modal.tsx:149-159`, ~14 chart/component files with literal `#6366f1`/`#a855f7` | replace literals with `bg-surface`/`border-border`/`text-accent` etc.                                                                                                                                                                            |
| C9  | **`cn()` → clsx + tailwind-merge**         | `src/shared/utils/cn.ts`                                                                                                                                                                      | current `cn` just joins; conflicting classes stack (a `className="rounded-2xl"` override won't replace a primitive's `rounded-lg`). Needed for C1 overrides to behave.                                                                           |

**Already on-brand (token-driven, only need radius):** `Badge`, `Toggle`, `SegmentedControl`, `Input`, `Select`.

---

## 7. Rollout plan (phased, each phase shippable + testable)

- **Phase 1 — Grid + tokens (low risk, high visibility).**
  1. Add grid + identity tokens to `globals.css` (Part A §4.3, Part B §5).
  2. Add `body::before` grid.
  3. Remove `bg-bg` from `DashboardLayout.tsx:62`.
  4. Verify across themes + key screens (dashboard, providers, logs, login, an error page). Confirm contrast unchanged.
     → _Delivers the headline ask. Reversible in one commit._

- **Phase 2 — Primitives radius + Button (C1, C2, C5, C9).** The visible "feel" pass. `cn()` upgrade first so overrides behave.

- **Phase 3 — Tables + status colors (C3, C4).** The largest consistency win; touch the data-heavy screens.

- **Phase 4 — Cleanup (C6, C7, C8).** Focus ring, new primitives, hardcoded-hex sweep.

Each phase: `npm run lint` + `npm run typecheck:core` + a visual pass. Per repo rule, production-code changes ship with tests where applicable (token/CSS changes are visual — validated by screenshots; component API changes get unit coverage).

---

## 8. Open decisions (need your call before/while implementing)

- **D1 — Button primary look.** Keep the current **red→red** gradient, or switch the product's primary buttons to the **red→violet `--grad-brand`** (matches the site CTAs)? _(Affects every primary button.)_ Recommend: **red→violet**, with `--grad-brand`.
- **D2 — Grid line color.** **Neutral** lines (site style: faint white/black, `rgba(255,255,255,0.035)`) — calm, content-first — **or** the landing's **brand-red** lines? Recommend: **neutral** (matches the site's interior pages; red is louder and can tint readability). Size **46px** (site) to retire the landing's 50px drift.
- **D3 — Chrome vibrancy.** Sidebar/header stay **solid** (grid in content area only), or go **translucent** so the grid runs behind them? Recommend: **solid** (calmer; less risk).
- **D4 — Auth/login grid.** Soften `login/page.tsx` wrappers so the grid shows there too? Recommend: **yes** (cheap, more cohesive).
- **D5 — Landing page.** Leave its animated splash bg as-is, or align it to the global grid? Recommend: **leave as-is**.
- **D6 — Radius value.** Adopt **14/9** everywhere (bigger, softer, site-matching) — confirm you want this product-wide shift. Recommend: **yes**, it's the single biggest "one identity" signal.
- **D7 — Scope of first PR.** Ship **Phase 1 only** first (grid + tokens), then iterate? Recommend: **yes** — validate the wallpaper live before the component waves.

---

## 9. Out of scope / risks

- **No palette change** — colors already match; we only add missing tokens. Zero risk of recoloring the product.
- **No theme-engine change** — keep `.dark` + Zustand store; don't migrate to `next-themes` or to the site's `data-theme`.
- **Radius shift is broad** (D6) — it touches every card/button/input; that's the point, but it's the one change worth eyeballing on busy screens (tables, modals) before merge.
- **Tables (C3)** carry the most hardcoded styling and the highest regression surface — isolate in its own PR with before/after screenshots.
- **Worktree isolation (repo hard-rule #19):** implementation runs in a dedicated worktree on a branch cut from the confirmed base (likely `release/v3.8.28`), never on the shared checkout. This doc is the only artifact written to the working tree so far.

---

## 10. Reference index

| Area                       | Path                                                                                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard tokens           | `src/app/globals.css:30-179` (`:root`, `.dark`, `@theme inline`), `body` `:206`                                                          |
| Theme store                | `src/store/themeStore.ts`, `src/shared/components/ThemeProvider.tsx`, `src/shared/constants/appConfig.ts:9-11`                           |
| Panel shell (grid blocker) | `src/shared/components/layouts/DashboardLayout.tsx:62`                                                                                   |
| Chrome                     | `src/shared/components/Header.tsx:207`, `src/shared/components/Sidebar.tsx:430`                                                          |
| Grid precedent             | `src/app/landing/page.tsx:16-26`                                                                                                         |
| Primitives                 | `src/shared/components/{Button,Card,Input,Select,Badge,Modal,Toggle,SegmentedControl,Loading,Tooltip,DataTable}.tsx`, barrel `index.tsx` |
| Status-color sources       | `flow/edgeStyles.ts`, `TokenHealthBadge.tsx`, `DegradationBadge.tsx`, `logTableStyles.ts`                                                |
| `cn` util                  | `src/shared/utils/cn.ts`                                                                                                                 |
| Site reference             | `_mono_repo/birouterSite/css/tokens.css`, `css/base.css` (grid `body::before`)                                                           |
