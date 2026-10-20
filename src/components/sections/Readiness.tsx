"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { SiteContent } from "@/content/types";
import { formatNumber, formatPercent } from "@/lib/format";
import { prefersReducedMotion } from "@/lib/motion";
import { readinessLevel, readinessScore } from "@/lib/readiness";

const RING_LENGTH = 264; // circumference of r=42, rounded

interface ReadinessProps {
  locale: Locale;
  readiness: SiteContent["readiness"];
}

/**
 * Four-question readiness self-assessment with an instant score.
 * Opens with sample answers (marked as an example in the intro) so the
 * first view already shows how the result looks.
 */
export function Readiness({ locale, readiness }: ReadinessProps) {
  const [answers, setAnswers] = useState<number[]>(() => [...readiness.sampleAnswers]);
  const score = readinessScore(answers);
  const level = readiness.levels[readinessLevel(score)];
  const shownScore = useAnimatedNumber(score);
  const recommendationHref = level.courseSlug ? `/${locale}/programs/${level.courseSlug}` : "#contact";

  const choose = (question: number, option: number) =>
    setAnswers((current) => current.map((value, index) => (index === question ? option : value)));

  return (
    <section className="section section--alt" id="readiness" aria-labelledby="readiness-title">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <span className="section-head__eyebrow mono">{readiness.eyebrow}</span>
          <h2 className="section-head__title" id="readiness-title">
            {readiness.title}
          </h2>
          <p className="section-head__intro">{readiness.intro}</p>
        </div>
        <div className="readiness" data-reveal="">
          <div className="readiness__questions">
            {readiness.questions.map((question, qi) => (
              <div className="question" key={question.prompt} role="group" aria-labelledby={`q${qi}-label`}>
                <p className="question__prompt" id={`q${qi}-label`}>
                  {formatNumber(qi + 1, locale)}. {question.prompt}
                </p>
                <div className="segmented">
                  {question.options.map((option, oi) => (
                    <button
                      key={option}
                      id={`q${qi}-o${oi}`}
                      type="button"
                      className="segmented__option"
                      aria-pressed={answers[qi] === oi}
                      onClick={() => choose(qi, oi)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="result" aria-live="polite">
            <div className="ring">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle className="ring__track" cx="50" cy="50" r="42" />
                <circle
                  className="ring__value"
                  cx="50"
                  cy="50"
                  r="42"
                  strokeDasharray={RING_LENGTH}
                  strokeDashoffset={RING_LENGTH - (RING_LENGTH * score) / 100}
                />
              </svg>
              <span className="ring__score" role="img" aria-label={`${readiness.resultLabel}: ${formatPercent(score, locale)}`}>
                {formatPercent(shownScore, locale)}
              </span>
            </div>
            <h3 className="result__title">{level.title}</h3>
            <p className="result__body">{level.body}</p>
            <Link className="result__rec" href={recommendationHref}>
              <span className="mono">{readiness.startHere}</span>
              {level.recommendation}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Eases the displayed number toward the target over ~700 ms. */
function useAnimatedNumber(target: number): number {
  const [shown, setShown] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(target);
      fromRef.current = target;
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 700, 1);
      const value = Math.round(from + (target - from) * progress);
      setShown(value);
      fromRef.current = value;
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return shown;
}
