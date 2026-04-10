# Fix CI Workflow

Look up the latest GitHub Actions CI run for the current release branch, diagnose all failures, fix them locally, push, and wait for the new CI run to go green before notifying the user.

---

## Phase 1: Identify the Failing CI Run

### 1. Determine the current release version and branch

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
VERSION=$(node -p "require('./package.json').version")
BRANCH=$(git branch --show-current)
echo "Version: $VERSION"
echo "Branch: $BRANCH"
```

### 2. Find the latest CI run for the release PR

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
# Find the PR number for the release branch
PR_NUMBER=$(gh pr list --repo diegosouzapw/OmniRoute --head "$BRANCH" --json number --jq '.[0].number')
echo "PR: #$PR_NUMBER"

# Get the latest CI run
RUN_ID=$(gh run list --repo diegosouzapw/OmniRoute --branch "$BRANCH" --workflow ci.yml --limit 1 --json databaseId --jq '.[0].databaseId')
echo "Latest CI Run: $RUN_ID"
echo "URL: https://github.com/diegosouzapw/OmniRoute/actions/runs/$RUN_ID"
```

---

## Phase 2: Diagnose Failures

### 3. List all failing jobs

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
RUN_ID=$(gh run list --repo diegosouzapw/OmniRoute --branch "$(git branch --show-current)" --workflow ci.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run view "$RUN_ID" --repo diegosouzapw/OmniRoute --json jobs --jq '.jobs[] | select(.conclusion == "failure") | {name: .name, conclusion: .conclusion, steps: [.steps[] | select(.conclusion == "failure") | .name]}'
```

### 4. Download and analyze failure logs

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
RUN_ID=$(gh run list --repo diegosouzapw/OmniRoute --branch "$(git branch --show-current)" --workflow ci.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run view "$RUN_ID" --repo diegosouzapw/OmniRoute --log-failed 2>&1 | grep -aE "not ok|FAIL|Error:|error:|AssertionError|expected|actual" | grep -v "node_modules\|runner\|git version" | head -50
```

### 5. Classify each failure

For each failing job, determine the root cause category:

| Category           | Pattern                            | Fix Strategy                               |
| ------------------ | ---------------------------------- | ------------------------------------------ |
| **docs-sync**      | OpenAPI/CHANGELOG version mismatch | Run `/version-bump` step 7-8               |
| **Test assertion** | `not ok` + `AssertionError`        | Update test expectations to match new code |
| **E2E flaky**      | Auth-related 401/403/307           | Make tests tolerate auth states            |
| **Coverage gate**  | `below threshold`                  | Add more tests or adjust threshold         |
| **Lint**           | ESLint errors                      | Fix code or update rules                   |
| **Build**          | Compilation errors                 | Fix TypeScript issues                      |

---

## Phase 3: Apply Fixes

### 6. Fix each failure

For each classified failure:

1. **Read the failing test file** to understand the assertion
2. **Read the production source** to understand the new behavior
3. **Update the test** to match the current behavior
4. **Run the test locally** to verify the fix

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
# Run the specific failing test file(s) to confirm fixes
# Example: node --import tsx/esm --test tests/unit/FAILING_FILE.test.mjs
```

### 7. Run the full local test suite

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
npm test
```

### 8. Run docs-sync check

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
npm run check:docs-sync
```

---

## Phase 4: Push and Monitor

### 9. Commit and push fixes

// turbo-all

```bash
cd /home/diegosouzapw/dev/proxys/9router
git add -A
git commit -m "fix(tests): align CI tests with release changes"
git push origin "$(git branch --show-current)"
```

### 10. Wait for CI to trigger and find the new run

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
sleep 15
BRANCH=$(git branch --show-current)
NEW_RUN_ID=$(gh run list --repo diegosouzapw/OmniRoute --branch "$BRANCH" --workflow ci.yml --limit 1 --json databaseId --jq '.[0].databaseId')
echo "New CI Run: $NEW_RUN_ID"
echo "URL: https://github.com/diegosouzapw/OmniRoute/actions/runs/$NEW_RUN_ID"
```

### 11. Monitor the CI run

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/9router
BRANCH=$(git branch --show-current)
NEW_RUN_ID=$(gh run list --repo diegosouzapw/OmniRoute --branch "$BRANCH" --workflow ci.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$NEW_RUN_ID" --repo diegosouzapw/OmniRoute --exit-status
```

If `gh run watch` exits with 0, the CI is green. If it exits with non-zero, go back to Phase 2 and repeat.

### 12. 🛑 STOP — Notify User

Present a summary to the user:

- **Previous CI run**: URL, list of failures
- **Root causes**: What broke and why
- **Fixes applied**: What tests were changed
- **New CI run**: URL, all-green status
- **PR status**: Ready for review/merge

---

## Common CI Failure Patterns

| Failure                                    | Root Cause                             | Fix                           |
| ------------------------------------------ | -------------------------------------- | ----------------------------- |
| `docs-sync FAIL - OpenAPI version differs` | Version not synced after bump          | `sed -i` openapi.yaml         |
| `docs-sync FAIL - CHANGELOG first section` | Missing `## [Unreleased]` header       | Add unreleased section        |
| `not ok - cleanupExpiredLogs`              | Return shape changed (new fields)      | Update `assert.deepEqual`     |
| `not ok - email masking`                   | Email now masked in call logs          | Assert masked pattern instead |
| `E2E /api/providers` returns non-200       | Auth enabled in CI, endpoint protected | Accept 401/403 as valid       |
| `coverage below 60%`                       | New untested code                      | Add unit tests                |

## Notes

- This workflow is **iterative**: if the first fix attempt doesn't clear all failures, repeat Phases 2-4.
- Always run tests **locally** before pushing to avoid wasting CI minutes.
- The CI is triggered automatically on push to branches with open PRs to `main`.
- Use `gh run watch` to monitor in real-time instead of polling.
