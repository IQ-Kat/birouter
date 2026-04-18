# Feature: Filter for Custom Model (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/notfit/1191-filter-custom-model.md) · 🇪🇸 [es](../../../es/_ideia/notfit/1191-filter-custom-model.md) · 🇫🇷 [fr](../../../fr/_ideia/notfit/1191-filter-custom-model.md) · 🇩🇪 [de](../../../de/_ideia/notfit/1191-filter-custom-model.md) · 🇮🇹 [it](../../../it/_ideia/notfit/1191-filter-custom-model.md) · 🇷🇺 [ru](../../../ru/_ideia/notfit/1191-filter-custom-model.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/notfit/1191-filter-custom-model.md) · 🇯🇵 [ja](../../../ja/_ideia/notfit/1191-filter-custom-model.md) · 🇰🇷 [ko](../../../ko/_ideia/notfit/1191-filter-custom-model.md) · 🇸🇦 [ar](../../../ar/_ideia/notfit/1191-filter-custom-model.md) · 🇮🇳 [hi](../../../hi/_ideia/notfit/1191-filter-custom-model.md) · 🇮🇳 [in](../../../in/_ideia/notfit/1191-filter-custom-model.md) · 🇹🇭 [th](../../../th/_ideia/notfit/1191-filter-custom-model.md) · 🇻🇳 [vi](../../../vi/_ideia/notfit/1191-filter-custom-model.md) · 🇮🇩 [id](../../../id/_ideia/notfit/1191-filter-custom-model.md) · 🇲🇾 [ms](../../../ms/_ideia/notfit/1191-filter-custom-model.md) · 🇳🇱 [nl](../../../nl/_ideia/notfit/1191-filter-custom-model.md) · 🇵🇱 [pl](../../../pl/_ideia/notfit/1191-filter-custom-model.md) · 🇸🇪 [sv](../../../sv/_ideia/notfit/1191-filter-custom-model.md) · 🇳🇴 [no](../../../no/_ideia/notfit/1191-filter-custom-model.md) · 🇩🇰 [da](../../../da/_ideia/notfit/1191-filter-custom-model.md) · 🇫🇮 [fi](../../../fi/_ideia/notfit/1191-filter-custom-model.md) · 🇵🇹 [pt](../../../pt/_ideia/notfit/1191-filter-custom-model.md) · 🇷🇴 [ro](../../../ro/_ideia/notfit/1191-filter-custom-model.md) · 🇭🇺 [hu](../../../hu/_ideia/notfit/1191-filter-custom-model.md) · 🇧🇬 [bg](../../../bg/_ideia/notfit/1191-filter-custom-model.md) · 🇸🇰 [sk](../../../sk/_ideia/notfit/1191-filter-custom-model.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/notfit/1191-filter-custom-model.md) · 🇮🇱 [he](../../../he/_ideia/notfit/1191-filter-custom-model.md) · 🇵🇭 [phi](../../../phi/_ideia/notfit/1191-filter-custom-model.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/notfit/1191-filter-custom-model.md) · 🇨🇿 [cs](../../../cs/_ideia/notfit/1191-filter-custom-model.md) · 🇹🇷 [tr](../../../tr/_ideia/notfit/1191-filter-custom-model.md)

---

> GitHub Issue: #1191 — opened by @tjengbudi on 2026-04-13
> Status: 🔁 ALREADY EXISTS

## 📝 Original Request

The user requests a filter/search functionality for custom models in the provider detail page, to help find specific models in large catalogs.

## 💬 Community Discussion

### Participants

- @tjengbudi — Original requester
- 2 comments in discussion thread

### Key Points

- User may not have discovered the existing filter functionality
- The model filter bar may not be sufficiently visible on the page

## 🎯 Resolution

This functionality **already exists** in OmniRoute:

**Location:** Provider Detail Page (`/dashboard/providers/<id>`) → Models section

**How it works:**

1. Navigate to Dashboard → Providers → click on any provider
2. Scroll down to the Models section
3. The search/filter input at the top of the model list filters by name, ID, and aliases
4. Implementation: `modelFilter` state (line 989 in `page.tsx`) with `matchesModelCatalogQuery()` function

The filter supports searching by model name, model ID, and configured aliases. It works for both built-in and custom models.
