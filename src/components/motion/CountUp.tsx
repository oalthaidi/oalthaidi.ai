"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { formatNumber } from "@/lib/format";
import { prefersReducedMotion } from "@/lib/motion";

interface CountUpProps {
  value: number;
  locale: Locale;
  plus?: boolean;
}

/**
 * A number that counts up from zero when it scrolls into view.
 * Renders the final value first, so the page is correct without JS.
 */
export function CountUp({ value, locale, plus }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const [done, setDone] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen
    setShown(0);
    setDone(false);
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1400, 1);
          setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) raf = requestAnimationFrame(tick);
          else setDone(true);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="stat__value">
      {formatNumber(shown, locale)}
      {plus && done ? <span className="stat__plus">+</span> : null}
    </span>
  );
}
