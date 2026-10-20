import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, pickLocale } from "@/i18n/config";
import { isLinkPreviewBot } from "@/lib/bots";

/**
 * Locale routing: every page lives under /ar or /en.
 *
 * - Visitors on a path without a locale are redirected to their preferred
 *   language (from the browser), defaulting to Arabic.
 * - Link-preview crawlers (WhatsApp, LinkedIn, X…) get the Arabic page
 *   served directly at the same URL, because some of them do not follow
 *   redirects and would show no preview card.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  if (isLocale(firstSegment)) return NextResponse.next();

  const url = request.nextUrl.clone();
  const rest = pathname === "/" ? "" : pathname;

  if (isLinkPreviewBot(request.headers.get("user-agent"))) {
    url.pathname = `/${defaultLocale}${rest}`;
    return NextResponse.rewrite(url);
  }

  url.pathname = `/${pickLocale(request.headers.get("accept-language"))}${rest}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, icons, robots.txt…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
