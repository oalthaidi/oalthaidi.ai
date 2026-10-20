"use client";

import { useCallback, useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { SiteContent } from "@/content/types";
import { formatNumber } from "@/lib/format";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Investor demo tour. Hidden for normal visitors; opens when the page is
 * loaded with #tour, or when the header's tour button fires "tour:open".
 * Each step scrolls to a section and outlines it.
 */
export function GuidedTour({ locale, tour }: { locale: Locale; tour: SiteContent["tour"] }) {
  const [step, setStep] = useState<number | null>(null);
  const total = tour.steps.length;

  const close = useCallback(() => setStep(null), []);

  useEffect(() => {
    const open = () => setStep(0);
    if (window.location.hash === "#tour") open();
    window.addEventListener("tour:open", open);
    return () => window.removeEventListener("tour:open", open);
  }, []);

  // Highlight and scroll to the current step's section.
  useEffect(() => {
    if (step === null) return;
    const target = document.getElementById(tour.steps[step].target);
    if (!target) return;
    target.classList.add("is-tour-target");
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    return () => target.classList.remove("is-tour-target");
  }, [step, tour.steps]);

  // Keyboard: Esc closes; arrow keys follow the reading direction.
  useEffect(() => {
    if (step === null) return;
    const forward = locale === "ar" ? "ArrowLeft" : "ArrowRight";
    const back = locale === "ar" ? "ArrowRight" : "ArrowLeft";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === forward) setStep((s) => (s === null ? s : Math.min(total - 1, s + 1)));
      if (event.key === back) setStep((s) => (s === null ? s : Math.max(0, s - 1)));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, total, locale, close]);

  if (step === null) return null;
  const current = tour.steps[step];
  const last = step === total - 1;

  return (
    <aside className="tour" aria-live="polite" aria-label={current.title}>
      <div className="tour__bar">
        <span className="tour__bar-fill" style={{ width: `${((step + 1) / total) * 100}%` }} />
      </div>
      <div className="tour__row">
        <span className="mono">
          {formatNumber(step + 1, locale)} {tour.of} {formatNumber(total, locale)}
        </span>
        <button type="button" className="tour__close" onClick={close}>
          {tour.close} ✕
        </button>
      </div>
      <h2 className="tour__title">{current.title}</h2>
      <p className="tour__body">{current.body}</p>
      <div className="tour__row">
        <button type="button" className="btn btn--sm" disabled={step === 0} onClick={() => setStep(step - 1)}>
          {tour.prev}
        </button>
        <button type="button" className="btn btn--sm btn--primary" onClick={() => (last ? close() : setStep(step + 1))}>
          {last ? tour.finish : tour.next}
        </button>
      </div>
    </aside>
  );
}
