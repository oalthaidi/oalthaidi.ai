"use client";

import { useEffect, useRef } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import type { SiteContent } from "@/content/types";

/**
 * Research and memberships timeline. A blue rail fills and the markers light
 * up as the reader scrolls past them (pure progressive enhancement).
 */
export function Research({ research }: { research: SiteContent["research"] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    const events = Array.from(list.querySelectorAll<HTMLElement>(".event"));
    const onScroll = () => {
      const rect = list.getBoundingClientRect();
      const line = window.innerHeight * 0.6;
      const progress = Math.max(0, Math.min(1, (line - rect.top) / rect.height));
      fill.style.transform = `scaleY(${progress})`;
      events.forEach((event) => event.classList.toggle("is-lit", event.getBoundingClientRect().top + 30 < line));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section" id="research" aria-labelledby="research-title">
      <div className="wrap">
        <SectionHead id="research-title" eyebrow={research.eyebrow} title={research.title} />
        <div className="timeline">
          <span className="timeline__fill" ref={fillRef} aria-hidden="true" />
          <ol className="timeline__list" ref={listRef}>
          {research.events.map((event) => (
            <li className="event" key={event.title}>
              <span className="event__year">{event.year}</span>
              <div>
                <h3 className="event__title">{event.title}</h3>
                <p className="event__body">{event.body}</p>
                {event.badge ? <span className="event__badge">{event.badge}</span> : null}
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
