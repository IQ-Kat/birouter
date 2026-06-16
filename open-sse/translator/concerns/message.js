import { OPENAI_BLOCK } from "../schema/index.js";

// Collapse an OpenAI content-part array: if all parts are text, collapse to string joined by \n.
// Otherwise return parts as-is.
export function collapseTextParts(parts) {
  if (!Array.isArray(parts) || parts.length === 0) return "";
  const allText = parts.every(p => p.type === OPENAI_BLOCK.TEXT);
  if (allText) {
    return parts.map(p => p.text).join("\n");
  }
  return parts;
}
