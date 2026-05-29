import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "./config";
import type { Locale } from "./config";

// Deep-merge fallback messages so locales that lack newer keys (e.g. memory.*
// added by plan 21) silently fall back to EN instead of rendering the key path.
function mergeMessages(
  fallback: Record<string, unknown>,
  override: Record<string, unknown>
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...fallback };
  for (const [k, v] of Object.entries(override)) {
    const baseVal = out[k];
    if (
      v !== null &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      baseVal !== null &&
      typeof baseVal === "object" &&
      !Array.isArray(baseVal)
    ) {
      out[k] = mergeMessages(
        baseVal as Record<string, unknown>,
        v as Record<string, unknown>
      );
    } else {
      out[k] = v;
    }
  }
  return out;
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

  const enMessages = (await import("./messages/en.json"))
    .default as Record<string, unknown>;
  if (locale === "en") {
    return { locale, messages: enMessages };
  }
  const localeMessages = (await import(`./messages/${locale}.json`))
    .default as Record<string, unknown>;

  return {
    locale,
    messages: mergeMessages(enMessages, localeMessages),
  };
});
