import { motion } from "framer-motion";
import { ease, palette } from "../theme";

const ORBITS = [
  { radius: 92, tilt: -18, duration: 6.5, colour: palette.cyan, size: 3.2 },
  { radius: 70, tilt: 24, duration: 4.8, colour: palette.blue, size: 2.6 },
  { radius: 112, tilt: 8, duration: 8.2, colour: palette.green, size: 2.2 },
] as const;

/**
 * Act 1 — a glowing bulb, particles in orbit, and two energy pulses.
 *
 * The orbits are a rotating group scaled on one axis: cheaper than animating a
 * path, and the squash reads as perspective rather than a flat circle.
 */
export function IdeaAct() {
  return (
    <g>
      <motion.circle
        r="80"
        fill="url(#hero-idea-glow)"
        animate={{ scale: [0.85, 1.08, 0.9, 1.04, 0.88], opacity: [0.25, 0.6, 0.3, 0.55, 0.28] }}
        transition={{ duration: 2.2, ease: ease.inOut, repeat: Infinity }}
      />

      {[0, 0.75].map((delay) => (
        <motion.circle
          key={delay}
          r="42"
          fill="none"
          stroke={palette.cyan}
          strokeWidth="1.5"
          initial={{ scale: 0.5, opacity: 0.6 }}
          animate={{ scale: 2.3, opacity: 0 }}
          transition={{ duration: 1.5, delay, ease: ease.out, repeat: Infinity, repeatDelay: 0.3 }}
        />
      ))}

      <motion.g
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: ease.pop }}
      >
        <path
          d="M 0 -54 a 39 39 0 0 1 23 70 v 12 h -46 v -12 a 39 39 0 0 1 23 -70 z"
          fill={palette.sunk}
          stroke={palette.cyan}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <motion.path
          d="M -15 12 C -10 -12, -4 -12, 0 4 C 4 -12, 10 -12, 15 12"
          fill="none"
          stroke={palette.green}
          strokeWidth="2.6"
          strokeLinecap="round"
          animate={{ opacity: [0.4, 1, 0.55, 1, 0.5] }}
          transition={{ duration: 1.6, ease: ease.inOut, repeat: Infinity }}
        />
        <rect x="-17" y="30" width="34" height="7" rx="2.5" fill={palette.muted} />
        <rect x="-13" y="41" width="26" height="6" rx="2.5" fill={palette.muted} opacity="0.7" />
      </motion.g>

      {ORBITS.map(({ radius, tilt, duration, colour, size }) => (
        <g key={radius} transform={`rotate(${tilt})`}>
          {/* The orbit is a circle squashed on one axis, which is cheaper than
              animating along a path and reads as perspective. The particle
              itself is counter-scaled by the inverse, or the squash turns each
              dot into a dash. */}
          <g transform="scale(1, 0.42)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration, ease: "linear", repeat: Infinity }}
              style={{ transformOrigin: "0px 0px" }}
            >
              <g transform={`translate(${radius} 0) scale(1, ${1 / 0.42})`}>
                <circle r={size} fill={colour} />
              </g>
            </motion.g>
          </g>
        </g>
      ))}
    </g>
  );
}
