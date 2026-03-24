/**
 * API: OpenAPI Spec
 * GET — returns the parsed openapi.yaml as JSON
 */

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Simple YAML parser for OpenAPI spec (handles common YAML patterns)
function parseYamlLite(content: string): any {
  try {
    // Try JSON first (in case file is already JSON)
    return JSON.parse(content);
  } catch {
    // Fall through to YAML parsing
  }

  const lines = content.split("\n");
  const result: any = {};
  const stack: { indent: number; obj: any; key: string }[] = [{ indent: -1, obj: result, key: "" }];

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, "");
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const indent = line.search(/\S/);
    const trimmed = line.trim();

    // Pop stack to find parent
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }
    const parent = stack[stack.length - 1].obj;

    // Array item
    if (trimmed.startsWith("- ")) {
      const parentKey = stack[stack.length - 1].key;
      if (parentKey && !Array.isArray(parent[parentKey])) {
        parent[parentKey] = [];
      }
      const val = trimmed.slice(2).trim();
      if (val.includes(": ")) {
        const obj: any = {};
        const [k, ...v] = val.split(": ");
        obj[k.trim()] = parseYamlValue(v.join(": ").trim());
        const arr = parentKey ? parent[parentKey] : parent;
        if (Array.isArray(arr)) arr.push(obj);
      } else {
        const arr = parentKey ? parent[parentKey] : parent;
        if (Array.isArray(arr)) arr.push(parseYamlValue(val));
      }
      continue;
    }

    // Key-value pair
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx > 0) {
      const key = trimmed.slice(0, colonIdx).trim();
      const val = trimmed.slice(colonIdx + 1).trim();
      if (val) {
        parent[key] = parseYamlValue(val);
      } else {
        parent[key] = {};
        stack.push({ indent, obj: parent, key });
      }
    }
  }

  return result;
}

function parseYamlValue(val: string): any {
  if (val === "true") return true;
  if (val === "false") return false;
  if (val === "null") return null;
  if (/^\d+$/.test(val)) return parseInt(val, 10);
  if (/^\d+\.\d+$/.test(val)) return parseFloat(val);
  // Remove surrounding quotes
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1);
  }
  // JSON array inline
  if (val.startsWith("[") && val.endsWith("]")) {
    try {
      return JSON.parse(val);
    } catch {
      /* use as-is */
    }
  }
  return val;
}

let cachedSpec: { data: any; mtime: number } | null = null;

export async function GET() {
  try {
    // Try multiple locations for the spec file
    const candidates = [
      path.join(process.cwd(), "docs", "openapi.yaml"),
      path.join(process.cwd(), "app", "docs", "openapi.yaml"),
    ];

    let specPath = "";
    for (const p of candidates) {
      if (fs.existsSync(p)) {
        specPath = p;
        break;
      }
    }

    if (!specPath) {
      return NextResponse.json({ error: "openapi.yaml not found" }, { status: 404 });
    }

    const stat = fs.statSync(specPath);
    const mtime = stat.mtimeMs;

    // Use cache if file hasn't changed
    if (cachedSpec && cachedSpec.mtime === mtime) {
      return NextResponse.json(cachedSpec.data);
    }

    const content = fs.readFileSync(specPath, "utf-8");

    // Group endpoints by tag for the catalog
    const raw = parseYamlLite(content);

    // Build a structured catalog
    const catalog: any = {
      info: raw.info || {},
      servers: raw.servers || [],
      tags: raw.tags || [],
      endpoints: [] as any[],
      schemas: Object.keys(raw.components?.schemas || {}),
    };

    // Parse paths into flat endpoint list
    const paths = raw.paths || {};
    for (const [pathStr, methods] of Object.entries(paths as Record<string, any>)) {
      if (!methods || typeof methods !== "object") continue;
      for (const [method, spec] of Object.entries(methods as Record<string, any>)) {
        if (["get", "post", "put", "patch", "delete"].includes(method) && spec) {
          catalog.endpoints.push({
            method: method.toUpperCase(),
            path: pathStr,
            tags: spec.tags || [],
            summary: spec.summary || "",
            description: spec.description || "",
            security: spec.security ? true : false,
            parameters: spec.parameters || [],
            requestBody: spec.requestBody ? true : false,
            responses: Object.keys(spec.responses || {}),
          });
        }
      }
    }

    cachedSpec = { data: catalog, mtime };

    return NextResponse.json(catalog);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to parse OpenAPI spec" },
      { status: 500 }
    );
  }
}
