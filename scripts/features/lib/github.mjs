/**
 * Thin wrappers around `gh` and `git` CLIs.
 * Functions return parsed JSON or strings. They throw on non-zero exit.
 * Tests inject fakes via the `deps` parameter pattern (see classify.mjs etc.).
 */
import { execFileSync } from "node:child_process";

function runJson(cmd, args) {
  const out = execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  return JSON.parse(out);
}

function runText(cmd, args) {
  return execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

export function ghIssueListNumbers(owner, repo, label) {
  return runJson("gh", [
    "issue",
    "list",
    "--repo",
    `${owner}/${repo}`,
    "--state",
    "open",
    "-l",
    label,
    "--limit",
    "500",
    "--json",
    "number",
  ]).map((x) => x.number);
}

export function ghIssueListFeatureTitled(owner, repo) {
  const items = runJson("gh", [
    "issue",
    "list",
    "--repo",
    `${owner}/${repo}`,
    "--state",
    "open",
    "--limit",
    "500",
    "--json",
    "number,title",
  ]);
  return items.filter((i) => /\[feature\]|feature request/i.test(i.title)).map((i) => i.number);
}

export function ghIssueView(owner, repo, number) {
  return runJson("gh", [
    "issue",
    "view",
    String(number),
    "--repo",
    `${owner}/${repo}`,
    "--json",
    "number,title,url,body,state,stateReason,labels,author,assignees,createdAt,closedAt,comments,reactionGroups,timelineItems",
  ]);
}

export function ghPrSearchMerged(owner, repo, issueNumber) {
  return runJson("gh", [
    "pr",
    "list",
    "--repo",
    `${owner}/${repo}`,
    "--state",
    "merged",
    "--search",
    `#${issueNumber}`,
    "--json",
    "number,title,body,mergedAt,mergeCommit",
    "--limit",
    "20",
  ]);
}

export function gitTagsByDate() {
  const out = runText("git", [
    "tag",
    "--sort=creatordate",
    "--format=%(creatordate:iso8601)|%(refname:short)",
  ]);
  return out
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [date, name] = line.split("|");
      return { date: new Date(date), name };
    })
    .filter((t) => /^v\d+\.\d+\.\d+$/.test(t.name));
}

export function gitLogGrep(pattern) {
  try {
    const out = runText("git", [
      "log",
      "--all",
      `--grep=${pattern}`,
      "--format=%H|%cI|%s",
      "--regexp-ignore-case",
    ]);
    if (!out) return [];
    return out.split("\n").map((line) => {
      const [hash, date, ...rest] = line.split("|");
      return { hash, date: new Date(date), subject: rest.join("|") };
    });
  } catch {
    return [];
  }
}

export function gitIsAncestor(hash, ref) {
  try {
    execFileSync("git", ["merge-base", "--is-ancestor", hash, ref], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

export function gitCurrentReleaseBranch() {
  try {
    const out = runText("git", ["branch", "--format=%(refname:short)"]);
    const found = out.split("\n").find((b) => /^release\/v\d+\.\d+\.\d+$/.test(b));
    return found || null;
  } catch {
    return null;
  }
}

export const defaultDeps = {
  ghIssueListNumbers,
  ghIssueListFeatureTitled,
  ghIssueView,
  ghPrSearchMerged,
  gitTagsByDate,
  gitLogGrep,
  gitIsAncestor,
  gitCurrentReleaseBranch,
};
