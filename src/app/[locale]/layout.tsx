import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Enhancements } from "@/components/motion/Enhancements";
import { site } from "@/config/site";
import { getContent } from "@/content";
import { directionOf, isLocale, locales } from "@/i18n/config";
import { alternateLanguages, localePath } from "@/i18n/paths";
import { socialMetadata } from "@/lib/seo";

// Styles: tokens first, then base, then components (order matters for the cascade).
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/components/layout.css";
import "@/styles/components/hero.css";
import "@/styles/components/marquee.css";
import "@/styles/components/about.css";
import "@/styles/components/programs.css";
import "@/styles/components/readiness.css";
import "@/styles/components/research.css";
import "@/styles/components/solutions.css";
import "@/styles/components/contact.css";
import "@/styles/components/tour.css";
import "@/styles/components/pages.css";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
});
const readex = Readex_Pro({ subsets: ["arabic", "latin"], variable: "--font-readex", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

type LayoutProps = { children: ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  viewportFit: "cover",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getContent(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: meta.title, template: `%s | ${meta.personName}` },
    description: meta.description,
    alternates: {
      canonical: localePath(locale),
      languages: alternateLanguages(),
    },
    ...socialMetadata({
      locale,
      siteName: meta.personName,
      title: meta.title,
      description: meta.description,
      path: localePath(locale),
    }),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);

  return (
    <html
      lang={locale}
      dir={directionOf(locale)}
      className={`${plexArabic.variable} ${readex.variable} ${plexMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          {content.nav.skipToContent}
        </a>
        <Enhancements />
        <SiteHeader locale={locale} nav={content.nav} brandName={content.hero.name} social={content.social} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} brandName={content.meta.personName} footer={content.footer} social={content.social} />
      </body>
    </html>
  );
}
