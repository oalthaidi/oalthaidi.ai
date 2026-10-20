import { NextResponse, type NextRequest } from "next/server";
import { isLocale, pickLocale } from "@/i18n/config";

/**
 * Locale routing: every page lives under /ar or /en.
 * A request without a locale prefix is redirected to the visitor's
 * preferred language (from the browser), defaulting to Arabic.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  if (isLocale(firstSegment)) return NextResponse.next();

  const locale = pickLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, icons, robots.txt…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
