import { ACTS } from "../acts";
import { palette } from "../theme";

/**
 * What `prefers-reduced-motion` gets.
 *
 * Not a frozen frame of the animation — a frozen frame tells the story of one
 * act and drops the other seven. This states the whole pipeline as a static
 * diagram, so the reduced-motion path carries the same message rather than a
 * degraded eighth of it.
 */
export function StaticPoster() {
  return (
    <div className="hero-poster">
      <svg viewBox="-140 -140 280 280" className="hero-poster__mark" aria-hidden="true" role="presentation">
        <circle r="80" fill="url(#hero-idea-glow)" />
        <path
          d="M 0 -54 a 39 39 0 0 1 23 70 v 12 h -46 v -12 a 39 39 0 0 1 23 -70 z"
          fill={palette.sunk}
          stroke={palette.cyan}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M -15 12 C -10 -12, -4 -12, 0 4 C 4 -12, 10 -12, 15 12"
          fill="none"
          stroke={palette.green}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <rect x="-17" y="30" width="34" height="7" rx="2.5" fill={palette.muted} />
        <rect x="-13" y="41" width="26" height="6" rx="2.5" fill={palette.muted} opacity="0.7" />
      </svg>

      <ol className="hero-poster__steps">
        {ACTS.map((act, i) => (
          <li key={act.id} className="hero-poster__step">
            <span className="hero-poster__index">{String(i + 1).padStart(2, "0")}</span>
            <span className="hero-poster__label">{act.label}</span>
            <span className="hero-poster__caption">{act.caption}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
