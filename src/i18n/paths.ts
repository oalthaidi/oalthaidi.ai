/**
 * URL scheme: Arabic lives at the root, English under /en.
 *
 *   /                          Arabic home
 *   /programs/creative-teacher Arabic programme page
 *   /en                        English home
 *   /en/programs/…             English programme page
 *
 * Internally every page is still rendered under src/app/[locale], so the
 * middleware rewrites root paths to /ar/… and permanently redirects old /ar
 * links to the root. Build every internal link with localePath() so no
 * component writes "/ar" by hand. See docs/decisions/0008-arabic-at-root.md.
 */
import { defaultLocale, isLocale, locales, type Locale } from "./config";

/** Public URL path for a page, e.g. localePath("en", "/privacy") → "/en/privacy". */
export function localePath(locale: Locale, path = ""): string {
  const clean = path === "/" ? "" : path;
  if (locale === defaultLocale) return clean || "/";
  return `/${locale}${clean}`;
}

/** hreflang alternates for a page, ready for Next.js metadata. */
export function alternateLanguages(path = ""): Record<string, string> {
  const entries: Array<[string, string]> = locales.map((locale) => [locale, localePath(locale, path)]);
  entries.push(["x-default", localePath(defaultLocale, path)]);
  return Object.fromEntries(entries);
}

/**
 * Splits a browser or internal pathname into its locale and the page path.
 * Accepts both public ("/programs/x") and internal ("/ar/programs/x") forms,
 * so server and client renders agree even across middleware rewrites.
 */
export function splitPathname(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first)) {
    const path = rest.length && rest.join("/") ? `/${rest.join("/")}` : "";
    return { locale: first, path };
  }
  return { locale: defaultLocale, path: pathname === "/" ? "" : pathname };
}

/** The same page in another language. */
export function switchLocalePath(pathname: string, to: Locale): string {
  return localePath(to, splitPathname(pathname).path);
}

export type RouteDecision =
  | { action: "next" }
  | { action: "rewrite"; pathname: string }
  | { action: "redirect"; pathname: string };

/** What the middleware does with an incoming pathname. */
export function routeRequest(pathname: string): RouteDecision {
  const first = pathname.split("/")[1];
  if (first === defaultLocale) {
    // Old /ar links: send them permanently to the root form.
    return { action: "redirect", pathname: splitPathname(pathname).path || "/" };
  }
  if (isLocale(first)) return { action: "next" };
  return { action: "rewrite", pathname: `/${defaultLocale}${pathname === "/" ? "" : pathname}` };
}

/** Link to a section of a locale's home page: "/#contact" (Arabic), "/en#contact" (English). */
export function homeAnchor(locale: Locale, sectionId: string): string {
  return `${localePath(locale)}#${sectionId}`;
}
