/** Buttons with [data-magnetic] lean toward the pointer while it is over them. */
export function setupMagnetic(): () => void {
  const buttons = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
  const cleanups = buttons.map((button) => {
    const move = (event: PointerEvent) => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty("--bx", `${(event.clientX - rect.left - rect.width / 2) * 0.25}px`);
      button.style.setProperty("--by", `${(event.clientY - rect.top - rect.height / 2) * 0.35}px`);
    };
    const leave = () => {
      button.style.setProperty("--bx", "0px");
      button.style.setProperty("--by", "0px");
    };
    button.addEventListener("pointermove", move);
    button.addEventListener("pointerleave", leave);
    return () => {
      button.removeEventListener("pointermove", move);
      button.removeEventListener("pointerleave", leave);
      leave();
    };
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}
