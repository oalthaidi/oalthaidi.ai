/**
 * Lead messages from the contact form.
 *
 * Until the backend phase adds a database, the form composes a WhatsApp
 * message instead of posting to a server (docs/decisions/0004-contact-via-whatsapp.md).
 */
export interface LeadInput {
  name: string;
  org: string;
  type: string;
  details: string;
}

/** Fills {name} {org} {type} {details} in the template; empty fields become "—". */
export function composeLeadMessage(template: string, lead: LeadInput): string {
  const values: Record<keyof LeadInput, string> = {
    name: lead.name.trim() || "—",
    org: lead.org.trim() || "—",
    type: lead.type.trim() || "—",
    details: lead.details.trim() || "—",
  };
  return template.replace(/\{(name|org|type|details)\}/g, (_, key: keyof LeadInput) => values[key]);
}
