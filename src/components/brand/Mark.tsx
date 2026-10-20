import { MARK, MARK_TRANSFORM } from "./geometry";

interface MarkProps {
  className?: string;
  /** Accessible name; omit when the mark sits next to the written name. */
  title?: string;
}

/** Static brand mark. Inherits its colour from `color` (currentColor). */
export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      className={className}
      viewBox="-250 -250 500 500"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <g
        transform={MARK_TRANSFORM}
        fill="none"
        stroke="currentColor"
        strokeWidth={MARK.stroke}
        strokeLinejoin="miter"
        strokeLinecap="butt"
      >
        {MARK.pieces.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <circle r={MARK.coreRadius} fill="currentColor" />
    </svg>
  );
}
