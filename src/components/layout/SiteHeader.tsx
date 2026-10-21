"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Mark } from "@/components/brand/Mark";
import { SocialLinks } from "@/components/ui/SocialLinks";
import type { Locale } from "@/i18n/config";
import { homeAnchor, localePath, splitPathname, switchLocalePath } from "@/i18n/paths";
import type { SiteContent } from "@/content/types";

/** Home-page sections linked from the header, in page order. */
const SECTION_IDS = ["about", "programs", "readiness", "research", "solutions"] as const;

interface SiteHeaderProps {
  locale: Locale;
  nav: SiteContent["nav"];
  brandName: string;
  social: SiteContent["social"];
}

/**
 * Sticky header: brand, section links with scroll-spy, language switch,
 * booking button and (in demo mode) the guided-tour button.
 * Also drives the thin scroll-progress bar at the top of the page.
 */
export function SiteHeader({ locale, nav, brandName, social }: SiteHeaderProps) {
  const pathname = usePathname();
  // splitPathname accepts both "/programs/x" (browser) and "/ar/programs/x" (internal), so
  // server and client renders agree across the middleware rewrite.
  const isHome = splitPathname(pathname).path === "";
  const home = localePath(locale);
  const [active, setActive] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  // Demo mode (guided tour) is enabled by opening the page with #tour, and
  // remembered for the browser tab so in-page links don't switch it off.
  useEffect(() => {
    const check = () => {
      const fromHash = window.location.hash === "#tour";
      if (fromHash) sessionStorageSet("demo", "1");
      setDemo((was) => was || fromHash || sessionStorageGet("demo") === "1");
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      if (!isHome) return;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top < window.innerHeight * 0.35) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const otherLocale: Locale = locale === "ar" ? "en" : "ar";
  const switchHref = switchLocalePath(pathname, otherLocale);
  const labels: Record<(typeof SECTION_IDS)[number], string> = {
    about: nav.about,
    programs: nav.programs,
    readiness: nav.readiness,
    research: nav.research,
    solutions: nav.solutions,
  };

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span className="scroll-progress__bar" ref={progressRef} />
      </div>
      <header className="site-header">
        <div className="wrap site-header__inner">
          <Link href={home} className="brand">
            <Mark className="brand__mark" />
            <span className="brand__name">{brandName}</span>
          </Link>
          <nav className="site-nav" aria-label={nav.sectionsLabel}>
            {SECTION_IDS.map((id) => (
              <a
                key={id}
                href={isHome ? `#${id}` : homeAnchor(locale, id)}
                className={`site-nav__link${active === id ? " is-active" : ""}`}
                aria-current={active === id ? "true" : undefined}
              >
                {labels[id]}
              </a>
            ))}
          </nav>
          <div className="site-header__actions">
            <SocialLinks labels={social} />
            <Link href={switchHref} className="lang-switch" hrefLang={otherLocale} lang={otherLocale} aria-label={nav.switchLanguageLabel}>
              {nav.switchLanguage}
            </Link>
            {demo && isHome ? (
              <button
                type="button"
                className="btn btn--sm"
                onClick={() => window.dispatchEvent(new CustomEvent("tour:open"))}
              >
                <span className="btn__dot" />
                {nav.tour}
              </button>
            ) : null}
            <a className="btn btn--sm btn--primary site-header__book" href={isHome ? "#contact" : homeAnchor(locale, "contact")} data-magnetic="">
              {nav.book}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

function sessionStorageGet(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function sessionStorageSet(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Storage blocked (private mode): demo mode then lasts until the hash changes.
  }
}
