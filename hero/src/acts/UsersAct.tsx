import { motion } from "framer-motion";
import { ease, palette } from "../theme";

/** Users on a ring around the service. Positions are hand-placed rather than
 *  evenly spaced — a perfect ring reads as a diagram, a scattered one as people. */
const USERS = [
  { x: -260, y: -66 },
  { x: -180, y: 56 },
  { x: -96, y: -104 },
  { x: 20, y: -118 },
  { x: 132, y: -74 },
  { x: 246, y: -44 },
  { x: 196, y: 62 },
  { x: 74, y: 104 },
  { x: -66, y: 108 },
  { x: 268, y: 10 },
] as const;

/** Act 7 — the thing that launched is being used by actual people. */
export function UsersAct() {
  return (
    <g>
      {USERS.map((user, i) => (
        <motion.line
          key={`link-${user.x}-${user.y}`}
          x1={user.x}
          y1={user.y}
          x2={0}
          y2={0}
          stroke={palette.blue}
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.06, ease: ease.out }}
        />
      ))}

      {/* Requests travelling inward. Animated on x/y (a transform) rather than
          cx/cy (a layout attribute) so each one stays on the compositor. */}
      {USERS.map((user, i) => (
        <motion.circle
          key={`packet-${user.x}-${user.y}`}
          r="3"
          fill={palette.green}
          initial={{ x: user.x, y: user.y, opacity: 0 }}
          animate={{ x: [user.x, 0], y: [user.y, 0], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.5,
            delay: 0.5 + i * 0.12,
            ease: ease.inOut,
            repeat: Infinity,
            repeatDelay: 0.3,
            times: [0, 0.15, 0.85, 1],
          }}
        />
      ))}

      {[0, 0.9].map((delay) => (
        <motion.circle
          key={delay}
          r="36"
          fill="none"
          stroke={palette.green}
          strokeWidth="1.6"
          initial={{ scale: 0.6, opacity: 0.55 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 1.8, delay, ease: ease.out, repeat: Infinity }}
        />
      ))}

      <motion.g
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: ease.pop }}
      >
        <circle r="34" fill={palette.sunk} stroke={palette.green} strokeWidth="2.4" />
        <circle r="15" fill="none" stroke={palette.green} strokeWidth="2" opacity="0.8" />
        <path d="M -19 -7 h 38 M -19 7 h 38" stroke={palette.green} strokeWidth="2" opacity="0.8" />
      </motion.g>

      {USERS.map((user, i) => (
        <motion.g
          key={`user-${user.x}-${user.y}`}
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.15 + i * 0.06, ease: ease.pop }}
          style={{ transformOrigin: `${user.x}px ${user.y}px` }}
        >
          <g transform={`translate(${user.x} ${user.y})`}>
            <circle r="22" fill={palette.sunk} stroke={palette.cyan} strokeWidth="1.2" opacity="0.28" />
            <circle cy="-6" r="7" fill={palette.cyan} />
            <path d="M -12 10 a 12 12 0 0 1 24 0 z" fill={palette.cyan} opacity="0.85" />
          </g>
        </motion.g>
      ))}
    </g>
  );
}
