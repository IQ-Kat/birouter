import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, "..", "..");

const localeFiles = [
  path.join(ROOT, "src", "i18n", "messages", "en.json"),
  path.join(ROOT, "src", "i18n", "messages", "id.json"),
];

for (const file of localeFiles) {
  if (fs.existsSync(file)) {
    console.log(`Processing branding replacement for ${path.basename(file)}...`);
    let content = fs.readFileSync(file, "utf8");

    // Replace user-facing brand names
    content = content.replace(/Birouter/g, "Birouter");
    content = content.replace(/Birouter/g, "Birouter");

    // Write back the modified content
    fs.writeFileSync(file, content, "utf8");
    console.log(`Successfully updated ${path.basename(file)}.`);
  } else {
    console.warn(`File not found: ${file}`);
  }
}
