import { motion } from "framer-motion";
import { ease, palette } from "../theme";

const EARTH_Y = 250;
const EARTH_R = 190;
const ORBIT_PATH = "M -250 60 A 250 118 0 1 1 250 60 A 250 118 0 1 1 -250 60";

/** Act 6 — the service is up, watched, and going round. */
export function OrbitAct() {
  return (
    <g>
      <motion.path
        d={ORBIT_PATH}
        fill="none"
        stroke={palette.cyan}
        strokeWidth="1.5"
        strokeDasharray="6 8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.45 }}
        transition={{ duration: 0.9, ease: ease.out }}
      />

      <clipPath id="hero-earth-clip">
        <circle cx="0" cy={EARTH_Y} r={EARTH_R} />
      </clipPath>

      <motion.g
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: ease.out }}
      >
        <circle cx="0" cy={EARTH_Y} r={EARTH_R} fill="url(#hero-earth)" />
        <g clipPath="url(#hero-earth-clip)" opacity="0.5">
          {/* Two copies of the landmasses, one screen apart, translating as a
              pair — the seam never enters frame, so it reads as rotation
              without the cost of an actual sphere projection. */}
          <motion.g
            fill={palette.green}
            animate={{ x: [0, -380] }}
            transition={{ duration: 14, ease: "linear", repeat: Infinity }}
          >
            {[0, 380].map((offset) => (
              <g key={offset} transform={`translate(${offset} 0)`}>
                <path d="M -150 190 q 48 -34 102 -14 q 40 18 20 56 q -34 40 -88 20 q -48 -20 -34 -62 z" />
                <path d="M 30 236 q 62 -28 102 14 q 28 34 -14 54 q -54 20 -88 -14 q -28 -28 0 -54 z" />
                <path d="M -60 300 q 40 -16 66 14 q 20 26 -14 40 q -40 14 -58 -16 q -14 -22 6 -38 z" />
              </g>
            ))}
          </motion.g>
        </g>
        <circle
          cx="0"
          cy={EARTH_Y}
          r={EARTH_R + 3}
          fill="none"
          stroke={palette.cyan}
          strokeWidth="6"
          opacity="0.35"
          filter="url(#hero-soft)"
        />
      </motion.g>

      {/* offset-path walks the satellite round the ellipse; offsetRotate keeps
          its solar panels facing the direction of travel. */}
      <motion.g
        style={{ offsetPath: `path("${ORBIT_PATH}")`, offsetRotate: "auto" }}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{ duration: 9, ease: "linear", repeat: Infinity }}
      >
        <rect x="-9" y="-8" width="18" height="16" rx="3" fill={palette.panel} stroke={palette.text} strokeWidth="1.6" />
        <rect x="-25" y="-5" width="14" height="10" rx="2" fill={palette.blue} />
        <rect x="11" y="-5" width="14" height="10" rx="2" fill={palette.blue} />
        <circle cx="0" cy="0" r="3" fill={palette.cyan} />
      </motion.g>

      <motion.text
        x="0"
        y="-120"
        textAnchor="middle"
        fill={palette.cyan}
        fontSize="14"
        letterSpacing="5"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        initial={{ opacity: 0, y: -112 }}
        animate={{ opacity: 1, y: -120 }}
        transition={{ duration: 0.5, delay: 0.5, ease: ease.out }}
      >
        MISSION COMPLETE
      </motion.text>
      <motion.text
        x="0"
        y="-96"
        textAnchor="middle"
        fill={palette.muted}
        fontSize="12"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.75, ease: ease.out }}
      >
        production ready ✓
      </motion.text>
    </g>
  );
}
