import { execSync } from "node:child_process";

try {
  const output = execSync("npm pack --dry-run --json --ignore-scripts", {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
  });
  const parsed = JSON.parse(output);
  const files = parsed[0]?.files || [];

  const counts = {};
  for (const f of files) {
    const parts = f.path.split("/");
    const top = parts[0] || "";
    const second = parts[1] || "";
    const key = top + (second ? "/" + second : "");
    counts[key] = (counts[key] || 0) + 1;
  }

  console.log("Top-level file counts in packaged tarball:");
  console.log(JSON.stringify(counts, null, 2));
} catch (err) {
  console.error("Error:", err.message);
}
