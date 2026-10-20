import { ContactForm } from "@/components/sections/ContactForm";
import { CopyButton } from "@/components/ui/CopyButton";
import { site, whatsappLink } from "@/config/site";
import type { SiteContent } from "@/content/types";

export function Contact({ contact }: { contact: SiteContent["contact"] }) {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact">
        <div data-reveal="">
          <span className="mono">{contact.eyebrow}</span>
          <h2 className="contact__title" id="contact-title">
            {contact.title}
          </h2>
          <div className="contact-line">
            <span className="contact-line__value" id="contact-phone">
              {site.phoneDisplay}
            </span>
            <CopyButton targetId="contact-phone" label={contact.copy} done={contact.copied} fallback={contact.copyFallback} />
          </div>
          <div className="contact-line">
            <span className="contact-line__value" id="contact-email">
              {site.email}
            </span>
            <CopyButton targetId="contact-email" label={contact.copy} done={contact.copied} fallback={contact.copyFallback} />
          </div>
          <div className="contact-line">
            <a className="btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer" data-magnetic="">
              {contact.whatsappCta} ↗
            </a>
          </div>
        </div>
        <ContactForm form={contact.form} />
      </div>
    </section>
  );
}
