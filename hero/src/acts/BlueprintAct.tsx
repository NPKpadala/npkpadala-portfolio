import { motion } from "framer-motion";
import { ease, palette } from "../theme";

/** A small service topology: edge → app → worker/cache → data. */
const NODES = [
  { x: -150, y: -30, label: "edge" },
  { x: -50, y: -70, label: "api" },
  { x: -50, y: 24, label: "auth" },
  { x: 60, y: -46, label: "queue" },
  { x: 60, y: 48, label: "cache" },
  { x: 160, y: 0, label: "data" },
] as const;

const EDGES: readonly (readonly [number, number])[] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [1, 2],
];

const GRID_X = [-180, -120, -60, 0, 60, 120, 180];
const GRID_Y = [-90, -45, 0, 45, 90];

/** Act 2 — the idea resolves into an architecture that draws itself. */
export function BlueprintAct() {
  return (
    <motion.g
      animate={{ rotate: [-3.5, 3.5, -2] }}
      transition={{ duration: 2.4, ease: ease.inOut }}
    >
      <g stroke={palette.grid} strokeWidth="1">
        {GRID_X.map((x, i) => (
          <motion.line
            key={`v${x}`}
            x1={x}
            y1={-90}
            x2={x}
            y2={90}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: ease.out }}
          />
        ))}
        {GRID_Y.map((y, i) => (
          <motion.line
            key={`h${y}`}
            x1={-180}
            y1={y}
            x2={180}
            y2={y}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.04, ease: ease.out }}
          />
        ))}
      </g>

      {EDGES.map(([from, to], i) => {
        const a = NODES[from];
        const b = NODES[to];
        if (!a || !b) return null;
        return (
          <motion.line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={palette.blue}
            strokeWidth="1.8"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 0.45, delay: 0.3 + i * 0.07, ease: ease.out }}
          />
        );
      })}

      {NODES.map((node, i) => (
        <motion.g
          key={node.label}
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.45 + i * 0.08, ease: ease.pop }}
        >
          <circle cx={node.x} cy={node.y} r="11" fill={palette.sunk} stroke={palette.blue} strokeWidth="2" />
          <circle cx={node.x} cy={node.y} r="4" fill={palette.cyan} />
          <text
            x={node.x}
            y={node.y + 26}
            textAnchor="middle"
            fill={palette.muted}
            fontSize="10"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            letterSpacing="1"
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </motion.g>
  );
}
