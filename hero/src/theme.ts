/** Design tokens for the hero. Kept in one place so the acts never hard-code a hex. */

export const palette = {
  bg: "#0d1117",
  panel: "#161b22",
  sunk: "#0b0f15",
  border: "#30363d",
  grid: "#21262d",
  text: "#e6edf3",
  muted: "#8b949e",
  blue: "#3b82f6",
  cyan: "#22d3ee",
  green: "#3fb950",
  amber: "#d29922",
} as const;

/**
 * Easings as cubic-bezier tuples. `out` is the workhorse — fast departure,
 * long settle — which is what makes an entrance read as deliberate rather
 * than springy.
 */
export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  in: [0.55, 0, 1, 0.45],
  pop: [0.34, 1.56, 0.64, 1],
} as const;

/** The stage is drawn in a fixed viewBox and scaled by CSS — one coordinate
 *  system for every act, no responsive math inside the drawings. */
export const stage = {
  width: 760,
  height: 420,
} as const;
