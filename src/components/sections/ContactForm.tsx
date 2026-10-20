"use client";

import { useState, type FormEvent } from "react";
import { whatsappLink } from "@/config/site";
import type { SiteContent } from "@/content/types";
import { composeLeadMessage } from "@/lib/leads";

/**
 * Request form. On submit it validates the name, composes a WhatsApp message
 * from the fields and opens WhatsApp; nothing is stored by the site.
 */
export function ContactForm({ form }: { form: SiteContent["contact"]["form"] }) {
  const [nameError, setNameError] = useState(false);
  const [opened, setOpened] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    if (!name.trim()) {
      setNameError(true);
      document.getElementById("lead-name")?.focus();
      return;
    }
    setNameError(false);
    const message = composeLeadMessage(form.messageTemplate, {
      name,
      org: String(data.get("org") ?? ""),
      type: String(data.get("type") ?? ""),
      details: String(data.get("details") ?? ""),
    });
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setOpened(true);
  };

  return (
    <form className="form" onSubmit={onSubmit} noValidate data-reveal="">
      <div className="field">
        <label className="field__label" htmlFor="lead-name">
          {form.name}
        </label>
        <input
          className="field__control"
          id="lead-name"
          name="name"
          autoComplete="name"
          placeholder={form.namePlaceholder}
          aria-invalid={nameError}
          aria-describedby={nameError ? "lead-name-error" : undefined}
          onChange={() => nameError && setNameError(false)}
        />
        {nameError ? (
          <span className="field__error" id="lead-name-error">
            {form.nameRequired}
          </span>
        ) : null}
      </div>
      <div className="field">
        <label className="field__label" htmlFor="lead-org">
          {form.org}
        </label>
        <input className="field__control" id="lead-org" name="org" autoComplete="organization" placeholder={form.orgPlaceholder} />
      </div>
      <div className="field">
        <label className="field__label" htmlFor="lead-type">
          {form.type}
        </label>
        <select className="field__control" id="lead-type" name="type" defaultValue={form.types[0]}>
          {form.types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label className="field__label" htmlFor="lead-details">
          {form.details}
        </label>
        <textarea className="field__control" id="lead-details" name="details" placeholder={form.detailsPlaceholder} />
      </div>
      <button className="btn btn--primary" type="submit">
        {form.submit}
      </button>
      <p className="form__note">{form.privacyNote}</p>
      {opened ? (
        <p className="form__status" role="status">
          {form.opened}
        </p>
      ) : null}
    </form>
  );
}
