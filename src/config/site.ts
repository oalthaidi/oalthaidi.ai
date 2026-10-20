/**
 * Site-wide constants that are not translated.
 * Change contact details here once; every page picks them up.
 */
export const site = {
  /** Public base URL. Set NEXT_PUBLIC_SITE_URL in Vercel once the domain is chosen. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  phoneDisplay: "+965 9998 2354",
  phoneE164: "+96599982354",
  whatsappNumber: "96599982354",
  // TODO(content): replace with an address on the custom domain once email is set up.
  email: "oakalthaidi@gmail.com",
  portrait: { src: "/images/omar-aldhaidi.jpg", width: 672, height: 672 },
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
