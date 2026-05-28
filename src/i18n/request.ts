import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "./config";
import type { Locale } from "./config";

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

  // 4. Merge EN as namespace-level fallback for locales that are missing new namespaces.
  //    Only applied when the active locale is not EN (avoids a redundant import).
  //    Merging is shallow at the top-level namespace key — if a namespace is already
  //    present in the locale file it is kept as-is; missing namespaces fall back to EN.
  //    This ensures new namespaces (e.g. cliCode, cliAgents, acpAgents, cliCommon added
  //    in plan 14 F9) are displayed in English for the 39 non-EN/non-pt-BR locales until
  //    translations are shipped.
  let mergedMessages: Record<string, unknown> = messages as Record<string, unknown>;
  if (locale !== DEFAULT_LOCALE) {
    const enMessages = (
      await import(`./messages/${DEFAULT_LOCALE}.json`)
    ).default as Record<string, unknown>;
    mergedMessages = { ...enMessages, ...mergedMessages };
  }

  return {
    locale,
    messages: mergedMessages,
  };
});
