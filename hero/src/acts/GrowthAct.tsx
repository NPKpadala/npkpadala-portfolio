import { motion } from "framer-motion";
import { ease, palette } from "../theme";

const BARS = [30, 46, 62, 56, 88, 112, 140] as const;
const BAR_WIDTH = 34;
const BAR_GAP = 22;
const BASE_Y = 96;

const totalWidth = BARS.length * BAR_WIDTH + (BARS.length - 1) * BAR_GAP;
const startX = -totalWidth / 2 + BAR_WIDTH / 2;

const tops = BARS.map((height, i) => ({
  x: startX + i * (BAR_WIDTH + BAR_GAP),
  y: BASE_Y - height,
}));

const trendPath = `M ${tops.map(({ x, y }) => `${x} ${y - 22}`).join(" L ")}`;
const last = tops[tops.length - 1] ?? { x: 0, y: 0 };

/**
 * Act 8 — growth, and the hand-off back to the start.
 *
 * The trend line's head detaches, flies to the centre and shrinks into where
 * the next bulb appears, so the loop closes on purpose instead of cutting.
 */
export function GrowthAct() {
  return (
    <g>
      <motion.line
        x1="-300"
        y1={BASE_Y + 16}
        x2="300"
        y2={BASE_Y + 16}
        stroke={palette.border}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: ease.out }}
      />

      {BARS.map((height, i) => {
        const x = startX + i * (BAR_WIDTH + BAR_GAP);
        return (
          <motion.rect
            key={x}
            x={x - BAR_WIDTH / 2}
            y={BASE_Y - height}
            width={BAR_WIDTH}
            height={height}
            rx="6"
            fill="url(#hero-bar)"
            style={{ transformOrigin: `${x}px ${BASE_Y}px` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.09, ease: ease.out }}
          />
        );
      })}

      <motion.path
        d={trendPath}
        fill="none"
        stroke={palette.cyan}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.75, ease: ease.inOut }}
      />

      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.5, ease: ease.out }}
      >
        <text
          x={last.x + 34}
          y={last.y - 34}
          textAnchor="end"
          fill={palette.cyan}
          fontSize="15"
          fontWeight="600"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          ↑ compounding
        </text>
      </motion.g>

      <motion.text
        x="0"
        y="-118"
        textAnchor="middle"
        fill={palette.muted}
        fontSize="13"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.2, ease: ease.out }}
      >
        software that reaches people, and keeps earning its keep
      </motion.text>

      <motion.circle
        r="7"
        fill={palette.cyan}
        filter="url(#hero-soft)"
        initial={{ x: last.x, y: last.y - 22, opacity: 0, scale: 0.4 }}
        animate={{
          x: [last.x, last.x, 0],
          y: [last.y - 22, last.y - 22, -6],
          opacity: [0, 1, 0],
          scale: [0.4, 1.4, 0.5],
        }}
        transition={{ duration: 1.2, delay: 1.55, ease: ease.inOut, times: [0, 0.25, 1] }}
      />
    </g>
  );
}
