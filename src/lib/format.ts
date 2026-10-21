import { intlTagOf, type Locale } from "@/i18n/config";

/** Formats a number with the locale's digits (Arabic-Indic for Arabic). */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlTagOf(locale), { maximumFractionDigits: 0 }).format(value);
}

/** Formats a whole percentage, e.g. 42 → "٤٢٪" / "42%". */
export function formatPercent(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlTagOf(locale), { style: "percent", maximumFractionDigits: 0 }).format(value / 100);
}

/** Formats a start–end time in Kuwait time, e.g. "٥:٠٠ م – ٨:٣٠ م" / "5:00 pm – 8:30 pm". */
export function formatTimeRange(startIso: string, endIso: string, locale: Locale): string {
  const time = new Intl.DateTimeFormat(intlTagOf(locale), { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kuwait" });
  return `${time.format(new Date(startIso))} – ${time.format(new Date(endIso))}`;
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
