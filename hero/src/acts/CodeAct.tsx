import { motion } from "framer-motion";
import { useTypewriter } from "../hooks/useTypewriter";
import { ease, palette } from "../theme";

type TokenKind = "keyword" | "fn" | "type" | "value" | "punct" | "comment";

const COLOURS: Record<TokenKind, string> = {
  keyword: palette.blue,
  fn: palette.green,
  type: palette.cyan,
  value: palette.text,
  punct: palette.muted,
  comment: palette.muted,
};

type Token = readonly [text: string, kind: TokenKind];

/**
 * Real TypeScript — the health probe this site's own monitoring runs, not
 * lorem ipsum. A hiring manager who pauses the animation should find code
 * that would compile.
 */
const LINES: readonly (readonly Token[])[] = [
  [["export ", "keyword"], ["async ", "keyword"], ["function ", "keyword"], ["probe", "fn"], ["(", "punct"], ["target", "value"], [": ", "punct"], ["Target", "type"], [") {", "punct"]],
  [["  const ", "keyword"], ["started ", "value"], ["= ", "punct"], ["performance", "fn"], [".", "punct"], ["now", "fn"], ["()", "punct"]],
  [["  const ", "keyword"], ["res ", "value"], ["= ", "punct"], ["await ", "keyword"], ["fetch", "fn"], ["(target.url, { signal })", "punct"]],
  [["  const ", "keyword"], ["ms ", "value"], ["= ", "punct"], ["Math", "fn"], [".", "punct"], ["round", "fn"], ["(", "punct"], ["performance", "fn"], [".", "punct"], ["now", "fn"], ["() - started)", "punct"]],
  [["  return ", "keyword"], ["{ ok", "value"], [": res.ok, ", "punct"], ["status", "value"], [": res.status, ms }", "punct"]],
  [["}", "punct"]],
];

const CHAR_WIDTH = 7.55; // 13px monospace advances 0.58em
const LINE_HEIGHT = 22;
const FIRST_LINE_Y = -52;
const TEXT_X = -212;

const LINE_LENGTHS = LINES.map((line) => line.reduce((n, [text]) => n + text.length, 0));
const TOTAL_CHARS = LINE_LENGTHS.reduce((a, b) => a + b, 0);

/** Act 3 — the blueprint becomes code, typed a character at a time. */
export function CodeAct() {
  const typed = useTypewriter(TOTAL_CHARS, 44, true);

  // Where the caret sits right now, in (line, column).
  let remaining = typed;
  let caretLine = 0;
  let caretColumn = 0;
  for (let i = 0; i < LINE_LENGTHS.length; i += 1) {
    const length = LINE_LENGTHS[i] ?? 0;
    if (remaining <= length) {
      caretLine = i;
      caretColumn = remaining;
      break;
    }
    remaining -= length;
    caretLine = i;
    caretColumn = length;
  }

  return (
    <motion.g
      initial={{ scale: 0.94, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: ease.out }}
    >
      <rect x="-240" y="-108" width="480" height="216" rx="14" fill={palette.sunk} stroke={palette.border} />
      <line x1="-240" y1="-74" x2="240" y2="-74" stroke={palette.border} />
      <circle cx="-218" cy="-91" r="4.5" fill={palette.muted} opacity="0.55" />
      <circle cx="-202" cy="-91" r="4.5" fill={palette.muted} opacity="0.4" />
      <circle cx="-186" cy="-91" r="4.5" fill={palette.muted} opacity="0.25" />
      <text
        x="-166"
        y="-87"
        fill={palette.muted}
        fontSize="12"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        probe.ts
      </text>

      <g fontSize="13" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
        {LINES.map((line, lineIndex) => {
          const before = LINE_LENGTHS.slice(0, lineIndex).reduce((a, b) => a + b, 0);
          const visible = Math.max(0, Math.min(typed - before, LINE_LENGTHS[lineIndex] ?? 0));
          if (visible === 0) return null;

          let consumed = 0;
          return (
            <text key={lineIndex} x={TEXT_X} y={FIRST_LINE_Y + lineIndex * LINE_HEIGHT} xmlSpace="preserve">
              {line.map(([text, kind], tokenIndex) => {
                const start = consumed;
                consumed += text.length;
                if (start >= visible) return null;
                // Slicing the token, not the rendered string, is what keeps
                // the highlighting intact mid-word.
                const slice = text.slice(0, Math.max(0, visible - start));
                return (
                  <tspan key={tokenIndex} fill={COLOURS[kind]}>
                    {slice}
                  </tspan>
                );
              })}
            </text>
          );
        })}

        <motion.rect
          x={TEXT_X + caretColumn * CHAR_WIDTH}
          y={FIRST_LINE_Y + caretLine * LINE_HEIGHT - 11}
          width="8"
          height="15"
          fill={palette.cyan}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, ease: "linear", repeat: Infinity, times: [0, 0.49, 0.5, 1] }}
        />
      </g>
    </motion.g>
  );
}
