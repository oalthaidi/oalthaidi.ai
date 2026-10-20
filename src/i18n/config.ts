/**
 * Locale configuration — the single source of truth for supported languages.
 * Arabic is the default because the primary audience is in Kuwait.
 */
export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function directionOf(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** BCP 47 tag used for Intl formatting (Arabic-Indic digits for Arabic). */
export function intlTagOf(locale: Locale): string {
  return locale === "ar" ? "ar-KW-u-nu-arab" : "en-GB";
}
