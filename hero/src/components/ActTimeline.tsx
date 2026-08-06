import { AnimatePresence, motion } from "framer-motion";
import { ACTS } from "../acts";
import { ease } from "../theme";

interface Props {
  index: number;
  progress: number;
}

/** The rail under the stage: which act, how far through, and what it means. */
export function ActTimeline({ index, progress }: Props) {
  const act = ACTS[index];
  if (!act) return null;

  return (
    <div className="hero-timeline">
      <div className="hero-timeline__head">
        <AnimatePresence mode="wait">
          <motion.div
            key={act.id}
            className="hero-timeline__labels"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: ease.out }}
          >
            <span className="hero-timeline__label">{act.label}</span>
            <span className="hero-timeline__caption">{act.caption}</span>
          </motion.div>
        </AnimatePresence>
        <span className="hero-timeline__count">
          {String(index + 1).padStart(2, "0")} / {String(ACTS.length).padStart(2, "0")}
        </span>
      </div>

      <div className="hero-timeline__rail">
        {ACTS.map((step, i) => (
          <div
            key={step.id}
            className={
              "hero-timeline__segment" +
              (i < index ? " is-done" : "") +
              (i === index ? " is-current" : "")
            }
          >
            {/* Only the current segment is transformed each frame; the rest are
                static, so the rail costs one composited layer, not eight. */}
            <span
              className="hero-timeline__fill"
              style={i === index ? { transform: `scaleX(${progress})` } : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
