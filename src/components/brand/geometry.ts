/**
 * Geometry of the brand mark, traced from the original logo artwork.
 *
 * The mark is drawn on a 348-unit square, then rotated 45° into a diamond.
 * Four stroked pieces (two hooked corners, two plain corners) surround a
 * solid core circle. public/brand/mark.svg uses the same numbers.
 */
export const MARK = {
  /** Side of the construction square, in units. */
  square: 348,
  /** Stroke width of each piece. */
  stroke: 38,
  /** Radius of the core circle. */
  coreRadius: 65,
  /** Piece centre-lines in square coordinates, in drawing order. */
  pieces: [
    "M85 147H19V19H147V90", // top: hooked corner
    "M187 19H329V166", // right: plain corner
    "M263 201H329V329H201V258", // bottom: hooked corner
    "M161 329H19V182", // left: plain corner
  ],
  /** Half of the diamond's diagonal (square * √2 / 2), for guides. */
  halfDiagonal: 246,
} as const;

/** SVG transform that turns square coordinates into the centred diamond. */
export const MARK_TRANSFORM = `rotate(45) translate(${-MARK.square / 2} ${-MARK.square / 2})`;
