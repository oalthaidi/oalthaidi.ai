import Link from "next/link";
import { Mark } from "@/components/brand/Mark";
import type { Locale } from "@/i18n/config";
import type { SiteContent } from "@/content/types";

interface SiteFooterProps {
  locale: Locale;
  brandName: string;
  footer: SiteContent["footer"];
}

export function SiteFooter({ locale, brandName, footer }: SiteFooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <span className="brand">
          <Mark className="brand__mark" />
          {brandName}
        </span>
        <span>{footer.tagline}</span>
        <span>
          <Link href={`/${locale}/privacy`}>{footer.privacy}</Link> · © {year} {footer.rights}
        </span>
      </div>
    </footer>
  );
}
