/**
 * Site-wide constants that are not translated.
 * Change contact details here once; every page picks them up.
 */
/**
 * Public base URL, used for canonical links, the sitemap and social cards.
 * Order: NEXT_PUBLIC_SITE_URL (set once the custom domain exists), then the
 * production URL Vercel provides automatically, then localhost for development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  url: resolveSiteUrl(),
  phoneDisplay: "+965 9998 2354",
  phoneE164: "+96599982354",
  whatsappNumber: "96599982354",
  // TODO(content): replace with an address on the custom domain once email is set up.
  email: "oakalthaidi@gmail.com",
  portrait: { src: "/images/omar-althaidi.jpg", width: 672, height: 672 },
} as const;

/** Social profiles, in display order. Change a handle here and both header and footer update. */
export const socialProfiles = [
  { id: "whatsapp", href: `https://wa.me/${site.whatsappNumber}` },
  { id: "email", href: `mailto:${site.email}` },
  { id: "instagram", href: "https://www.instagram.com/oalthaidi.ai" },
  { id: "tiktok", href: "https://www.tiktok.com/@oalthaidi.ai" },
  { id: "youtube", href: "https://www.youtube.com/@oalthaidi" },
] as const;

export type SocialId = (typeof socialProfiles)[number]["id"];

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
