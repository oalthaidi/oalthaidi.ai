"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const ARABIC_POOL = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي01";
const LATIN_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01";

interface DecodeTextProps {
  text: string;
  /** Extra frames before this text settles, to stagger several lines. */
  delayFrames?: number;
}

/**
 * Text that resolves from random characters into its final value, left to
 * right in reading order. The server renders the final text, so search
 * engines and screen readers always get the real words.
 */
export function DecodeText({ text, delayFrames = 0 }: DecodeTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const pool = /[؀-ۿ]/.test(text) ? ARABIC_POOL : LATIN_POOL;
    const total = 28 + delayFrames;
    let frame = 0;
    const timer = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor((text.length * frame) / total);
      setDisplay(
        Array.from(text)
          .map((char, i) => (i < settled || char === " " ? char : pool[Math.floor(Math.random() * pool.length)]))
          .join(""),
      );
      if (frame >= total) {
        window.clearInterval(timer);
        setDisplay(text);
      }
    }, 38);
    return () => window.clearInterval(timer);
  }, [text, delayFrames]);

  return (
    <>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </>
  );
}
