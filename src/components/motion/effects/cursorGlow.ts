/** A soft blue glow that follows the pointer across the page. */
export function setupCursorGlow(glow: HTMLElement): () => void {
  let frame = 0;
  const move = (event: PointerEvent) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      glow.style.opacity = "1";
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    });
  };
  window.addEventListener("pointermove", move, { passive: true });
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", move);
  };
}
