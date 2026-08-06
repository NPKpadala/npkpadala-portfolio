import { palette } from "../theme";

/** Gradients and filters shared by the acts. Mounted once, outside AnimatePresence. */
export function Defs() {
  return (
    <defs>
      <radialGradient id="hero-idea-glow">
        <stop offset="0%" stopColor={palette.cyan} stopOpacity="0.55" />
        <stop offset="55%" stopColor={palette.blue} stopOpacity="0.18" />
        <stop offset="100%" stopColor={palette.blue} stopOpacity="0" />
      </radialGradient>

      <linearGradient id="hero-flame" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={palette.cyan} />
        <stop offset="45%" stopColor={palette.amber} />
        <stop offset="100%" stopColor={palette.amber} stopOpacity="0" />
      </linearGradient>

      <linearGradient id="hero-trail" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={palette.cyan} stopOpacity="0" />
        <stop offset="100%" stopColor={palette.cyan} stopOpacity="0.85" />
      </linearGradient>

      <linearGradient id="hero-bar" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor={palette.blue} stopOpacity="0.45" />
        <stop offset="100%" stopColor={palette.cyan} />
      </linearGradient>

      <radialGradient id="hero-earth" cx="0.38" cy="0.28">
        <stop offset="0%" stopColor="#7dd3fc" />
        <stop offset="65%" stopColor={palette.blue} />
        <stop offset="100%" stopColor="#1e3a8a" />
      </radialGradient>

      <radialGradient id="hero-pad">
        <stop offset="0%" stopColor={palette.amber} stopOpacity="0.7" />
        <stop offset="100%" stopColor={palette.amber} stopOpacity="0" />
      </radialGradient>

      {/* One blur, reused. Filters are the expensive primitive here, so the
          acts share a single instance rather than each defining their own. */}
      <filter id="hero-soft" x="-70%" y="-70%" width="240%" height="240%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
  );
}
