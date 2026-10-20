/**
 * Scroll reveal for every element with [data-reveal].
 * Only elements that start below the fold are hidden, so the first screen is
 * complete immediately. Siblings are staggered by 90 ms.
 */
export function setupReveal(): () => void {
  const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  const waiting = elements.filter((el) => el.getBoundingClientRect().top > window.innerHeight);
  waiting.forEach((el) => el.classList.add("is-waiting"));

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const siblings = el.parentElement
          ? Array.from(el.parentElement.children).filter((child) => child.hasAttribute("data-reveal"))
          : [el];
        el.style.transitionDelay = `${Math.max(0, siblings.indexOf(el)) * 90}ms`;
        el.classList.remove("is-waiting");
        observer.unobserve(el);
      }
    },
    { threshold: 0.12 },
  );
  waiting.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
    waiting.forEach((el) => el.classList.remove("is-waiting"));
  };
}
