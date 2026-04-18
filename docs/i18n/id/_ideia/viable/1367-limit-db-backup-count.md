# Feature: Limit Database Backup Count (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../../_ideia/viable/1367-limit-db-backup-count.md) · 🇪🇸 [es](../../../es/_ideia/viable/1367-limit-db-backup-count.md) · 🇫🇷 [fr](../../../fr/_ideia/viable/1367-limit-db-backup-count.md) · 🇩🇪 [de](../../../de/_ideia/viable/1367-limit-db-backup-count.md) · 🇮🇹 [it](../../../it/_ideia/viable/1367-limit-db-backup-count.md) · 🇷🇺 [ru](../../../ru/_ideia/viable/1367-limit-db-backup-count.md) · 🇨🇳 [zh-CN](../../../zh-CN/_ideia/viable/1367-limit-db-backup-count.md) · 🇯🇵 [ja](../../../ja/_ideia/viable/1367-limit-db-backup-count.md) · 🇰🇷 [ko](../../../ko/_ideia/viable/1367-limit-db-backup-count.md) · 🇸🇦 [ar](../../../ar/_ideia/viable/1367-limit-db-backup-count.md) · 🇮🇳 [hi](../../../hi/_ideia/viable/1367-limit-db-backup-count.md) · 🇮🇳 [in](../../../in/_ideia/viable/1367-limit-db-backup-count.md) · 🇹🇭 [th](../../../th/_ideia/viable/1367-limit-db-backup-count.md) · 🇻🇳 [vi](../../../vi/_ideia/viable/1367-limit-db-backup-count.md) · 🇮🇩 [id](../../../id/_ideia/viable/1367-limit-db-backup-count.md) · 🇲🇾 [ms](../../../ms/_ideia/viable/1367-limit-db-backup-count.md) · 🇳🇱 [nl](../../../nl/_ideia/viable/1367-limit-db-backup-count.md) · 🇵🇱 [pl](../../../pl/_ideia/viable/1367-limit-db-backup-count.md) · 🇸🇪 [sv](../../../sv/_ideia/viable/1367-limit-db-backup-count.md) · 🇳🇴 [no](../../../no/_ideia/viable/1367-limit-db-backup-count.md) · 🇩🇰 [da](../../../da/_ideia/viable/1367-limit-db-backup-count.md) · 🇫🇮 [fi](../../../fi/_ideia/viable/1367-limit-db-backup-count.md) · 🇵🇹 [pt](../../../pt/_ideia/viable/1367-limit-db-backup-count.md) · 🇷🇴 [ro](../../../ro/_ideia/viable/1367-limit-db-backup-count.md) · 🇭🇺 [hu](../../../hu/_ideia/viable/1367-limit-db-backup-count.md) · 🇧🇬 [bg](../../../bg/_ideia/viable/1367-limit-db-backup-count.md) · 🇸🇰 [sk](../../../sk/_ideia/viable/1367-limit-db-backup-count.md) · 🇺🇦 [uk-UA](../../../uk-UA/_ideia/viable/1367-limit-db-backup-count.md) · 🇮🇱 [he](../../../he/_ideia/viable/1367-limit-db-backup-count.md) · 🇵🇭 [phi](../../../phi/_ideia/viable/1367-limit-db-backup-count.md) · 🇧🇷 [pt-BR](../../../pt-BR/_ideia/viable/1367-limit-db-backup-count.md) · 🇨🇿 [cs](../../../cs/_ideia/viable/1367-limit-db-backup-count.md) · 🇹🇷 [tr](../../../tr/_ideia/viable/1367-limit-db-backup-count.md)

---

> GitHub Issue: #1367 — opened by @gmonchain on 2026-04-17
> Status: ✅ VIABLE | Priority: MEDIUM

## 📝 Original Request

The application currently generates too many database backup files without an option to limit the number of backups stored. This leads to unnecessary storage usage and complicates backup management. The user requests a feature that allows setting a maximum number of backups retained, with automatic deletion of older backups when the limit is reached.

**Acceptance Criteria (from author):**

- Users can set a maximum backup count in the settings
- When the backup count exceeds the limit, the system automatically deletes older backups
- The user interface notifies users when a backup has been deleted
- No errors occur during the backup storage and deletion process

## 💬 Community Discussion

### Participants

- @gmonchain — Original requester, provided screenshot of excessive backups and clear acceptance criteria

### Key Points

- User showed a screenshot with many accumulated backup files
- The request is straightforward: add a configurable cap and auto-prune
- No objections or alternative proposals
- User also suggested a notification when pruning occurs

## 🎯 Refined Feature Description

Add a configurable maximum backup count setting to the OmniRoute dashboard. When the number of stored backups exceeds this limit, the system should automatically delete the oldest backups to free storage space.

### What it solves

- Unbounded growth of backup files consuming disk space
- Manual cleanup burden on users running OmniRoute for extended periods
- Storage issues on Docker deployments with limited volume sizes

### How it should work (high level)

1. Add a `maxBackupCount` setting to the `key_value` table (namespace: `settings`, key: `maxBackupCount`)
2. Provide a UI control in Dashboard → Settings → Backup section for configuring the limit (default: unlimited / 0)
3. After every successful backup creation, count existing backups
4. If count exceeds `maxBackupCount`, delete the oldest backups until the count is within the limit
5. Log a message when backups are pruned (visible in the console and optionally in the dashboard notification area)
6. Expose the setting via the MCP server and API for programmatic access

### Affected areas

- `src/lib/db/backup.ts` — add pruning logic after backup creation
- `src/lib/db/settings.ts` — add `maxBackupCount` setting with default
- `src/app/api/settings/` — expose new setting via API
- `src/app/(dashboard)/dashboard/settings/` — add UI control for backup limit
- i18n — new translation keys for backup limit UI labels

## 📎 Attachments & References

- Screenshot showing excessive backup files: https://github.com/user-attachments/assets/a0529f40-37d9-45db-a925-a5491f98671a

## 🔗 Related Ideas

- No directly related ideas in the backlog
