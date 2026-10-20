"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { setupCursorGlow } from "./effects/cursorGlow";
import { setupMagnetic } from "./effects/magnetic";
import { setupReveal } from "./effects/reveal";
import { setupTilt } from "./effects/tilt";

/**
 * Mounts the page-wide motion effects once. Sections stay server components
 * and opt in with data attributes: data-reveal, data-magnetic, data-tilt.
 * Everything is skipped when the visitor prefers reduced motion.
 */
export function Enhancements() {
  const glowRef = useRef<HTMLDivElement>(null);
  // Re-run on client-side navigation so the new page's elements are wired up.
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const cleanups = [setupReveal()];
    if (hasFinePointer()) {
      cleanups.push(setupMagnetic(), setupTilt());
      if (glowRef.current) cleanups.push(setupCursorGlow(glowRef.current));
    }
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />
    </>
  );
}
