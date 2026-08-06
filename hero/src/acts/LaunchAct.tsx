import { motion } from "framer-motion";
import { ease, palette } from "../theme";

const SMOKE = [
  { dx: -46, radius: 26, delay: 0 },
  { dx: 40, radius: 30, delay: 0.1 },
  { dx: -74, radius: 20, delay: 0.2 },
  { dx: 70, radius: 22, delay: 0.28 },
] as const;

const HOLD = 1.0; // seconds on the pad before the climb

/** Act 5 — countdown, ignition, and the climb out of frame. */
export function LaunchAct() {
  return (
    <g>
      <motion.ellipse
        cx="0"
        cy="118"
        rx="120"
        ry="24"
        fill="url(#hero-pad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.65, 0] }}
        transition={{ duration: 1.4, delay: HOLD - 0.35, ease: ease.out, times: [0, 0.35, 1] }}
      />

      {SMOKE.map(({ dx, radius, delay }) => (
        <motion.circle
          key={dx}
          cx="0"
          cy="112"
          r={radius}
          fill={palette.muted}
          filter="url(#hero-soft)"
          initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
          animate={{ opacity: [0, 0.18, 0], scale: [0.3, 1, 2.4], x: dx, y: -18 }}
          transition={{ duration: 1.4, delay: HOLD - 0.1 + delay, ease: ease.out }}
        />
      ))}

      {/* Trail is drawn behind the rocket and grows from the pad, so it reads
          as exhaust left behind rather than an object being dragged. */}
      <motion.rect
        x="-5"
        y="-30"
        width="10"
        height="150"
        rx="5"
        fill="url(#hero-trail)"
        style={{ transformOrigin: "50% 100%" }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: [0, 0.6, 0.2], scaleY: [0, 1, 1] }}
        transition={{ duration: 1.6, delay: HOLD, ease: ease.out }}
      />

      <motion.g
        initial={{ y: 0 }}
        animate={{ y: [0, 0, -520] }}
        transition={{ duration: 2.8, ease: ease.in, times: [0, HOLD / 2.8, 1] }}
      >
        {/* Shudder is a separate group so the launch translate stays a clean
            single transform the compositor can keep. */}
        <motion.g
          animate={{ x: [0, 1.6, -1.6, 1.2, -1.2, 0.6, 0] }}
          transition={{ duration: 0.5, delay: HOLD - 0.5, ease: "linear" }}
        >
          <path
            d="M 0 -78 C 26 -44, 30 8, 20 46 L -20 46 C -30 8, -26 -44, 0 -78 Z"
            fill={palette.panel}
            stroke={palette.text}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M -20 14 L -46 50 L -20 46 Z" fill={palette.blue} opacity="0.9" />
          <path d="M 20 14 L 46 50 L 20 46 Z" fill={palette.blue} opacity="0.9" />
          <circle cx="0" cy="-28" r="11" fill={palette.sunk} stroke={palette.cyan} strokeWidth="2.4" />

          <motion.path
            d="M -14 48 C -7 74, 7 74, 14 48 C 7 96, -7 96, -14 48 Z"
            fill="url(#hero-flame)"
            style={{ transformOrigin: "50% 0%" }}
            initial={{ opacity: 0, scaleY: 0.2 }}
            animate={{ opacity: [0, 1, 0.85, 1, 0.9, 1], scaleY: [0.2, 0.8, 1.3, 0.95, 1.4, 1.1] }}
            transition={{ duration: 1.6, delay: HOLD - 0.55, ease: ease.inOut }}
          />
        </motion.g>
      </motion.g>

      <rect x="-70" y="112" width="140" height="7" rx="3.5" fill={palette.border} />

      {["3", "2", "1"].map((glyph, i) => (
        <motion.text
          key={glyph}
          x="0"
          y="-96"
          textAnchor="middle"
          fill={palette.amber}
          fontSize="52"
          fontWeight="600"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          initial={{ opacity: 0, scale: 1.6 }}
          animate={{ opacity: [0, 0.95, 0], scale: [1.6, 1, 0.85] }}
          transition={{ duration: 0.3, delay: i * 0.28, ease: ease.out }}
        >
          {glyph}
        </motion.text>
      ))}

      <motion.text
        x="0"
        y="-96"
        textAnchor="middle"
        fill={palette.cyan}
        fontSize="22"
        fontWeight="600"
        letterSpacing="6"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.4, delay: HOLD - 0.15, ease: ease.out, times: [0, 0.2, 0.7, 1] }}
      >
        IGNITION
      </motion.text>
    </g>
  );
}
