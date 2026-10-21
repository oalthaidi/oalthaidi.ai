import Link from "next/link";
import { Mark } from "@/components/brand/Mark";
import { SocialLinks } from "@/components/ui/SocialLinks";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/paths";
import type { SiteContent } from "@/content/types";

interface SiteFooterProps {
  locale: Locale;
  brandName: string;
  social: SiteContent["social"];
  footer: SiteContent["footer"];
}

export function SiteFooter({ locale, brandName, footer, social }: SiteFooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <span className="brand">
          <Mark className="brand__mark" />
          {brandName}
        </span>
        <span>{footer.tagline}</span>
        <SocialLinks labels={social} />
        <span>
          <Link href={localePath(locale, "/privacy")}>{footer.privacy}</Link> · © {year} {footer.rights}
        </span>
      </div>
    </footer>
  );
}
