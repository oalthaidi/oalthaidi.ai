/**
 * Shared social-preview metadata (Open Graph and Twitter cards).
 *
 * Next.js replaces a parent's openGraph object entirely when a page sets its
 * own, so every page builds its preview through this helper to keep the
 * image, site name and locale consistent.
 */
import type { Locale } from "@/i18n/config";

/** 1200×630 card used by WhatsApp, LinkedIn, X and others. */
export const SOCIAL_IMAGE = { url: "/images/og-card.jpg", width: 1200, height: 630 } as const;

interface SocialInput {
  locale: Locale;
  siteName: string;
  title: string;
  description: string;
  /** Path after the domain, e.g. "/programs/successful-teacher" or "/en/privacy". */
  path: string;
}

export function socialMetadata({ locale, siteName, title, description, path }: SocialInput) {
  const image = { ...SOCIAL_IMAGE, alt: siteName };
  return {
    openGraph: {
      type: "website" as const,
      url: path,
      locale: locale === "ar" ? "ar_KW" : "en_GB",
      siteName,
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image" as const, title, description, images: [image] },
  };
}
