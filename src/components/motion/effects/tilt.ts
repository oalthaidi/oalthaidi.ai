/** Cards with [data-tilt] tilt in 3D and move a glow to follow the pointer. */
export function setupTilt(maxDegrees = 8): () => void {
  const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
  const cleanups = cards.map((card) => {
    const move = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      card.style.setProperty("--ry", `${(x - 0.5) * maxDegrees}deg`);
      card.style.setProperty("--rx", `${(0.5 - y) * maxDegrees}deg`);
    };
    const leave = () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    };
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", leave);
      leave();
    };
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}
