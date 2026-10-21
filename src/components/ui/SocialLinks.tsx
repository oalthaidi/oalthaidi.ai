import type { IconType } from "react-icons";
import { FaEnvelope, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { socialProfiles, type SocialId } from "@/config/site";
import type { SiteContent } from "@/content/types";

/** Brand icons come from react-icons (Font Awesome 6 brands), not hand-drawn. */
const ICONS: Record<SocialId, IconType> = {
  whatsapp: FaWhatsapp,
  email: FaEnvelope,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
};

interface SocialLinksProps {
  labels: SiteContent["social"];
  className?: string;
}

/**
 * Row of round monochrome icons (white on black, inverting on hover).
 * Used in the header and the footer; profiles live in src/config/site.ts.
 */
export function SocialLinks({ labels, className }: SocialLinksProps) {
  return (
    <ul className={`social-links${className ? ` ${className}` : ""}`} aria-label={labels.label}>
      {socialProfiles.map(({ id, href }) => {
        const Icon = ICONS[id];
        const external = !href.startsWith("mailto:");
        return (
          <li key={id}>
            <a
              className="social-links__link"
              href={href}
              aria-label={labels[id]}
              title={labels[id]}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon aria-hidden="true" focusable="false" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
