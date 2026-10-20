import { intlTagOf, type Locale } from "@/i18n/config";

/** Formats a number with the locale's digits (Arabic-Indic for Arabic). */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlTagOf(locale), { maximumFractionDigits: 0 }).format(value);
}

/** Formats a whole percentage, e.g. 42 → "٤٢٪" / "42%". */
export function formatPercent(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlTagOf(locale), { style: "percent", maximumFractionDigits: 0 }).format(value / 100);
}

/** Formats an ISO date in Kuwait time, e.g. "26 أكتوبر 2026" / "26 October 2026". */
export function formatDate(iso: string, locale: Locale, withYear = true): string {
  return new Intl.DateTimeFormat(intlTagOf(locale), {
    day: "numeric",
    month: "long",
    ...(withYear ? { year: "numeric" } : {}),
    timeZone: "Asia/Kuwait",
  }).format(new Date(iso));
}
