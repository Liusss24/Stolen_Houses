import { cookies } from "next/headers";

import {
  LOCALE_COOKIE_NAME,
  LOCALE_DEFAULT,
  type Locale,
} from "@/shared/constants/locale";

/**
 * getLocale
 * Needs: nothing (reads the sh_locale cookie from the incoming request).
 * Does: resolves the active locale from the cookie; falls back to the default.
 * Returns: "es" | "en".
 */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE_NAME)?.value;
  return value === "en" ? "en" : LOCALE_DEFAULT;
}
