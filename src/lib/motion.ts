/** True when the visitor asked the OS to reduce motion. Safe to call on the server. */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True on devices with a precise pointer (mouse/trackpad), where hover effects make sense. */
export function hasFinePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
}
