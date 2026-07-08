# About Birouter

**Created by [Ikbal-Kat](https://github.com/IQ-Kat)**

Birouter is a unified AI proxy/router — route any LLM through one endpoint with multi-provider support, MCP Server, A2A Protocol, and Electron desktop app.

---

## Latest Updates

### v3.8.51 — Latest

- **Linter & Type Alignment**: Resolved type-casting mismatch for `translatedResponse` in `chatCore.ts` using type assertion (`as typeof translatedResponse`) without introducing `any` keyword to adhere to the strict `t11` budget.
- **ESLint Bulk Suppressions Update**: Formally registered `chatCore.ts` into `eslint-suppressions.json` to lock legacy warnings and enable seamless integration with the master branch.
- **Next.js Client Components Props**: Fixed compilation error regarding Next.js serializable props on Client React components by renaming handlers callback `onSuccess` to server action compliant `onSuccessAction`.
- **SQLite Auto-Recovery & WAL Safety**: Solidified WAL-recovery database handlers to prevent corruption during sudden shutdown (like Ctrl+C) on Android/Termux devices.

### v3.8.50

- **Console Log Clearance**: Added a manual logs truncate/clear option directly in the Console Log Viewer, backed by a dynamic confirmation modal.
- **Amazon Q Model Listing Support**: Resolved the model listing issue for the Amazon Q provider by enabling dynamic model mapping to Kiro.
- **Mac-Style Modal Controls**: Refactored modal header exit buttons into interactive macOS window control styles (dots) with interactive hover and proper styling.
- **CLI & UI Layout Adjustments**: Raised z-index of the dashboard header to fix language dropdown overlap issues, and corrected backslash alignment in the CLI launch banner.

---

_Stay up to date by pulling the latest changes from [github.com/IQ-Kat/birouter](https://github.com/IQ-Kat/birouter)_
