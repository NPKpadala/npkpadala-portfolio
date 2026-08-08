import { motion } from "framer-motion";
import { ease, palette } from "../theme";

const SUITES = [
  { name: "Unit tests", detail: "142 passed" },
  { name: "Integration tests", detail: "38 passed" },
  { name: "Security scan", detail: "0 findings" },
] as const;

const ROW_HEIGHT = 44;
const FIRST_ROW_Y = -34;
// The bar has to stop short of the count that follows it: at 13px monospace
// "142 passed" is ~64px wide, right-aligned at 216.
const BAR_START = 30;
const BAR_END = 140;

/** Act 4 — the code proves itself. Bars fill, checks draw, nothing is asserted
 *  before its bar finishes. */
export function TestAct() {
  return (
    <motion.g
      initial={{ scale: 0.94, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: ease.out }}
    >
      <rect x="-240" y="-108" width="480" height="216" rx="14" fill={palette.sunk} stroke={palette.border} />

      <motion.text
        x="-212"
        y="-72"
        fill={palette.green}
        fontSize="13"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: ease.out }}
        xmlSpace="preserve"
      >
        <tspan fill={palette.muted}>$ </tspan>
        npm test — running suites…
      </motion.text>

      {SUITES.map((suite, i) => {
        const y = FIRST_ROW_Y + i * ROW_HEIGHT;
        const barDelay = 0.35 + i * 0.42;
        return (
          <motion.g
            key={suite.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: barDelay - 0.15, ease: ease.out }}
          >
            <motion.path
              d="M -212 0 l 7 8 l 14 -18"
              transform={`translate(0 ${y})`}
              fill="none"
              stroke={palette.green}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              // Drawn only once the bar beside it has finished: a checkmark
              // that lands before its own progress bar undermines the point.
              transition={{ duration: 0.28, delay: barDelay + 0.38, ease: ease.out }}
            />
            <text
              x="-182"
              y={y + 5}
              fill={palette.text}
              fontSize="13"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {suite.name}
            </text>
            <line x1={BAR_START} y1={y} x2={BAR_END} y2={y} stroke={palette.grid} strokeWidth="6" strokeLinecap="round" />
            <motion.line
              x1={BAR_START}
              y1={y}
              x2={BAR_END}
              y2={y}
              stroke={palette.green}
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.42, delay: barDelay, ease: ease.inOut }}
            />
            <motion.text
              x="216"
              y={y + 4}
              textAnchor="end"
              fill={palette.muted}
              fontSize="11"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: barDelay + 0.42, ease: ease.out }}
            >
              {suite.detail}
            </motion.text>
          </motion.g>
        );
      })}

      <motion.text
        x="-212"
        y="86"
        fill={palette.green}
        fontSize="13"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 2.05, ease: ease.out }}
      >
        ✓ all checks passed — safe to deploy
      </motion.text>
    </motion.g>
  );
}
