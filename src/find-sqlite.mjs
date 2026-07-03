import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

function findFiles(dir, name, results = []) {
  try {
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of list) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Skip node_modules, .next, etc. to save time
        if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
          findFiles(fullPath, name, results);
        }
      } else if (entry.name === name) {
        results.push(fullPath);
      }
    }
  } catch (e) {
    // ignore permission errors
  }
  return results;
}

const pathsToSearch = [
  path.join(os.homedir(), 'AppData', 'Roaming', 'birouter'),
  'D:\\DataApp\\birouter',
  process.cwd()
];

console.log("Searching for data.sqlite in:", pathsToSearch);
const results = [];
for (const p of pathsToSearch) {
  if (fs.existsSync(p)) {
    findFiles(p, 'data.sqlite', results);
  }
}
console.log("Found databases:", results);
