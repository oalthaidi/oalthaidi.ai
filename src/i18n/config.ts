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

/**
 * Picks the best supported locale from an Accept-Language header.
 * Falls back to the default locale when nothing matches.
 *
 * @example pickLocale("en-US,en;q=0.9,ar;q=0.8") // "en"
 */
export function pickLocale(header: string | null | undefined): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const quality = q ? Number(q.trim().slice(2)) : 1;
      return { lang: tag.toLowerCase().split("-")[0], quality: Number.isFinite(quality) ? quality : 0, index };
    })
    .filter((entry) => entry.lang && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  const match = ranked.find((entry) => isLocale(entry.lang));
  return match ? (match.lang as Locale) : defaultLocale;
}
