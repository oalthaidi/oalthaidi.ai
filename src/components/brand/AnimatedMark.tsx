import { MARK, MARK_TRANSFORM } from "./geometry";

const H = MARK.halfDiagonal;

/**
 * The hero version of the mark: construction guides draw first, then the
 * four pieces, then the core pops in and emits a signal halo.
 * Pure CSS animation (see styles/components/hero.css), so it works without JS.
 */
export function AnimatedMark({ caption, label }: { caption: string; label: string }) {
  return (
    <div className="mark-stage" role="img" aria-label={label}>
      <span className="mark-stage__corner" />
      <span className="mark-stage__corner" />
      <span className="mark-stage__corner" />
      <span className="mark-stage__corner" />
      <span className="mark-stage__caption mono" aria-hidden="true">
        {caption}
      </span>
      <svg className="mark-anim" viewBox="-280 -280 560 560" aria-hidden="true" focusable="false">
        <g className="mark-anim__orbit">
          <circle r={H + 22} fill="none" stroke="rgba(245,245,244,.07)" strokeDasharray="2 8" />
          <circle cx={H + 22} cy={0} r={3} fill="var(--c-signal)" />
        </g>
        <path className="mark-anim__guide" pathLength={1} d={`M${-H - 30} 0H${H + 30}`} />
        <path className="mark-anim__guide" pathLength={1} d={`M0 ${-H - 30}V${H + 30}`} />
        <path className="mark-anim__guide" pathLength={1} d={`M${-H} ${-H}L${H} ${H}`} />
        <path className="mark-anim__guide" pathLength={1} d={`M${H} ${-H}L${-H} ${H}`} />
        <path className="mark-anim__guide" pathLength={1} d={`M0 ${-H}L${H} 0L0 ${H}L${-H} 0Z`} />
        <g
          transform={MARK_TRANSFORM}
          fill="none"
          stroke="currentColor"
          strokeWidth={MARK.stroke}
          strokeLinejoin="miter"
          strokeLinecap="butt"
        >
          {MARK.pieces.map((d) => (
            <path key={d} className="mark-anim__piece" pathLength={1} d={d} />
          ))}
        </g>
        <circle className="mark-anim__halo" r={MARK.coreRadius} />
        <circle className="mark-anim__core" r={MARK.coreRadius} fill="currentColor" />
      </svg>
    </div>
  );
}
