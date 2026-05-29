import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "./config";
import type { Locale } from "./config";

/**
 * Walk a nested messages object by a dot-separated path (namespace + key).
 * Returns the found value as string, or undefined when the path does not exist.
 */
function getNestedValue(obj: Record<string, unknown>, namespace: string, key: string): string | undefined {
  const ns = obj[namespace];
  if (ns && typeof ns === "object" && !Array.isArray(ns)) {
    const val = (ns as Record<string, unknown>)[key];
    if (typeof val === "string") return val;
  }
  return undefined;
}

export default getRequestConfig(async () => {
  // 1. Try cookie
  const cookieStore = await cookies();
  let locale: string = cookieStore.get(LOCALE_COOKIE)?.value || "";

  // 2. Try custom header (set by middleware)
  if (!locale) {
    const headerStore = await headers();
    locale = headerStore.get("x-locale") || "";
  }

  // 3. Validate & fallback
  if (!LOCALES.includes(locale as Locale)) {
    locale = DEFAULT_LOCALE;
  }

  const messages = (await import(`./messages/${locale}.json`)).default;

  // Always load EN so we can fall back to it when the active locale lacks a key.
  // For EN itself the fallback is a no-op (same object), but the overhead is
  // negligible since JSON imports are cached by the module loader.
  const enMessages =
    locale === DEFAULT_LOCALE
      ? messages
      : (await import(`./messages/${DEFAULT_LOCALE}.json`)).default;

  return {
    locale,
    messages,
    getMessageFallback({
      namespace,
      key,
    }: {
      namespace: string | undefined;
      key: string;
      error: Error;
    }): string {
      // Try EN messages first.
      if (namespace) {
        const enValue = getNestedValue(
          enMessages as Record<string, unknown>,
          namespace,
          key,
        );
        if (enValue !== undefined) return enValue;
        // Return visible sentinel so QA notices missing keys.
        return `${namespace}.${key}`;
      }
      // Top-level key (no namespace).
      const topLevel = (enMessages as Record<string, unknown>)[key];
      if (typeof topLevel === "string") return topLevel;
      return key;
    },
  };
});
