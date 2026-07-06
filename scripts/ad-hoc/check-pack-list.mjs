import { execSync } from "node:child_process";

try {
  console.log("Running npm pack...");
  const output = execSync("npm pack --dry-run --json --ignore-scripts", {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024, // 128MB buffer
  });
  console.log("Parsing JSON...");
  const parsed = JSON.parse(output);
  const files = parsed[0]?.files || [];

  const readme = files.find((f) => f.path.toLowerCase() === "readme.md");
  const license = files.find((f) => f.path.toLowerCase() === "license");

  console.log("README in tarball:", readme);
  console.log("LICENSE in tarball:", license);

  console.log("Total files in tarball:", files.length);
} catch (err) {
  console.error("Error:", err.message);
}
