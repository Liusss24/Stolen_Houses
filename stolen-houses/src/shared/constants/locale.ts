export const LOCALE_COOKIE_NAME = "sh_locale";
export const LOCALE_OPTIONS = ["es", "en"] as const;
export type Locale = (typeof LOCALE_OPTIONS)[number];
export const LOCALE_DEFAULT: Locale = "es";
