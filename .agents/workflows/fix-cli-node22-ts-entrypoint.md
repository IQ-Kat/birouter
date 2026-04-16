# Workflow: Fix CLI Node 22 TS Entrypoint Issue

## Issue Description

In OmniRoute >= 3.6.6, the `package.json` declares the main CLI binary as `bin/omniroute.ts`. While Node 22 introduced experimental support for executing TypeScript files natively via the `--experimental-strip-types` flag (and `--experimental-transform-types`), Node.js explicitly disables this feature for any files loaded from inside a `node_modules` directory.

When users install `omniroute` globally (or locally) via npm, the CLI shim points to `bin/omniroute.ts` inside `node_modules`. Running `omniroute` on Node 22 results in:
`Error [ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING]: Stripping types is currently unsupported for files under node_modules`

This makes the CLI completely unusable out-of-the-box on Node 22, despite the `engines` field claiming support for `>=22.22.2`.

## Proposed Solution

The CLI entrypoint distributed in the NPM package must be a JavaScript file, not a TypeScript file.

1. Restore `bin/omniroute.mjs` as the actual CLI entrypoint, or implement a build step during `npm run build:cli` that compiles `bin/omniroute.ts` to `bin/omniroute.mjs` before publishing.
2. Update `package.json` to point the `bin` field back to the compiled `.js`/`.mjs` file:
   ```json
   "bin": {
     "omniroute": "bin/omniroute.mjs"
   }
   ```
3. Ensure `scripts/prepublish.ts` handles the compilation or validation of the binary entrypoint correctly so this regression doesn't happen again.

## Task

Please implement this fix, ensure the tests pass, and create a Pull Request against the main branch.
