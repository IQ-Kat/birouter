export type AutoVariant = "coding" | "fast" | "cheap" | "offline" | "smart" | "lkgp";

export interface AutoPrefixParseResult {
  valid: boolean;
  variant?: AutoVariant;
  error?: string;
}

const VALID_VARIANTS: AutoVariant[] = ["coding", "fast", "cheap", "offline", "smart", "lkgp"];

/**
 * Parses a model name to determine if it's an auto-prefixed model and extracts the variant.
 *
 * Examples:
 * - "auto"         -> { valid: true, variant: undefined } (default)
 * - "auto/coding"  -> { valid: true, variant: "coding" }
 * - "auto/lkgp"    -> { valid: true, variant: "lkgp" }
 * - "auto/"        -> { valid: true, variant: undefined } (default)
 * - "autocoding"   -> { valid: false, error: "Invalid auto prefix format" }
 * - "otherModel"   -> { valid: false, error: "Not an auto-prefixed model" }
 */
export function parseAutoPrefix(model: string): AutoPrefixParseResult {
  if (!model.startsWith("auto")) {
    return { valid: false, error: "Not an auto-prefixed model" };
  }

  const parts = model.split("/");

  if (parts.length === 1) {
    if (parts[0] === "auto") {
      return { valid: true, variant: undefined }; // Default auto
    } else {
      return { valid: false, error: "Invalid auto prefix format" };
    }
  }

  if (parts.length === 2) {
    if (parts[0] !== "auto") {
      return { valid: false, error: "Invalid auto prefix format" };
    }
    const variant = parts[1] as AutoVariant;
    if (variant === "" || VALID_VARIANTS.includes(variant)) {
      return { valid: true, variant: variant === "" ? undefined : variant };
    } else {
      return { valid: false, error: `Invalid auto variant: ${variant}` };
    }
  }

  return { valid: false, error: "Invalid auto prefix format" };
}
