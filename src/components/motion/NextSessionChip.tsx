"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { formatNumber } from "@/lib/format";
import { countdownParts, nextUpcoming } from "@/lib/sessions";

export interface ChipSession {
  startsAt: string;
  courseTitle: string;
  mode: string;
  /** Date already formatted on the server, shown before the countdown starts. */
  dateLabel: string;
}

interface NextSessionChipProps {
  sessions: readonly ChipSession[];
  locale: Locale;
  label: string;
  text: { in: string; days: string; hours: string; minutes: string };
}

/**
 * "Next programme" chip in the hero with a live countdown.
 * The server renders the date; the countdown replaces it after mount, which
 * keeps the static HTML correct even when it is cached for days.
 */
export function NextSessionChip({ sessions, locale, label, text }: NextSessionChipProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  // Before mount, assume every listed session is upcoming (the server already filtered past ones).
  const next = nextUpcoming(sessions, now ?? new Date(0));
  if (!next) return null;

  const n = (value: number) => formatNumber(value, locale);
  let value = next.item.dateLabel;
  if (now) {
    const parts = countdownParts(next.startsAt.getTime() - now.getTime());
    value = `${text.in} ${n(parts.days)} ${text.days} ${n(parts.hours)} ${text.hours} ${n(parts.minutes)} ${text.minutes}`;
  }

  return (
    <p className="chip">
      <span>
        {label}: {next.item.courseTitle} · {next.item.mode}
      </span>
      <time className="chip__value" dateTime={next.item.startsAt}>
        {value}
      </time>
    </p>
  );
}
