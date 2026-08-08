import { AnimatePresence, motion, useTransform } from "framer-motion";
import { useRef, useState, type JSX } from "react";
import { ACTS } from "./acts";
import { BlueprintAct } from "./acts/BlueprintAct";
import { CodeAct } from "./acts/CodeAct";
import { GrowthAct } from "./acts/GrowthAct";
import { IdeaAct } from "./acts/IdeaAct";
import { LaunchAct } from "./acts/LaunchAct";
import { OrbitAct } from "./acts/OrbitAct";
import { TestAct } from "./acts/TestAct";
import { UsersAct } from "./acts/UsersAct";
import { ActTimeline } from "./components/ActTimeline";
import { Defs } from "./components/Defs";
import { Starfield } from "./components/Starfield";
import { StaticPoster } from "./components/StaticPoster";
import { useActTimeline } from "./hooks/useActTimeline";
import { useCoarsePointer, useIsActive, useReducedMotion } from "./hooks/useEnvironment";
import { usePointerParallax } from "./hooks/usePointerParallax";
import { ease, stage } from "./theme";
import "./hero.css";

const ACT_COMPONENTS: Record<string, () => JSX.Element> = {
  idea: IdeaAct,
  blueprint: BlueprintAct,
  code: CodeAct,
  test: TestAct,
  launch: LaunchAct,
  orbit: OrbitAct,
  users: UsersAct,
  growth: GrowthAct,
};

export interface HeroAnimationProps {
  /** Multiplier on every act duration. */
  speed?: number;
  /** Optional eyebrow/heading rendered above the stage. */
  title?: string;
  subtitle?: string;
}

/**
 * "From Idea to Orbit" — an eight-act loop, told once every ~22 seconds.
 *
 * The animation runs only when it is on screen, the tab is visible, the user
 * has not paused it, and the OS has not asked for reduced motion. Everything
 * moving is a transform or an opacity, so the work stays on the compositor.
 */
export function HeroAnimation({ speed = 1, title, subtitle }: HeroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const coarsePointer = useCoarsePointer();
  const isActive = useIsActive(containerRef);
  const [paused, setPaused] = useState(false);

  const running = isActive && !paused && !reducedMotion;
  const pointer = usePointerParallax(running && !coarsePointer);

  const { index, progress } = useActTimeline({ speed, running });
  const act = ACTS[index];
  const Act = act ? ACT_COMPONENTS[act.id] : undefined;

  // The stage drifts a little less than the stars, which is what sells the
  // depth: identical movement would read as the whole scene sliding.
  const stageX = useTransform(pointer.x, (value) => value * 14);
  const stageY = useTransform(pointer.y, (value) => value * 10);

  return (
    <div className="hero" ref={containerRef} data-paused={paused || undefined}>
      <div className="hero__backdrop" aria-hidden="true" />
      <Starfield pointer={pointer} animate={running} />

      {(title || subtitle) && (
        <header className="hero__heading">
          {title && <h1 className="hero__title">{title}</h1>}
          {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        </header>
      )}

      {reducedMotion ? (
        <>
          {/* Defs still have to exist for the poster's gradient reference. */}
          <svg width="0" height="0" aria-hidden="true" focusable="false">
            <Defs />
          </svg>
          <StaticPoster />
        </>
      ) : (
        <>
          <motion.div className="hero__stage" style={{ x: stageX, y: stageY }}>
            <svg
              viewBox={`0 0 ${stage.width} ${stage.height}`}
              className="hero__svg"
              role="img"
              aria-label={
                "An eight-act loop showing how software gets built and run: " +
                ACTS.map((step) => step.label.toLowerCase()).join(", ") + "."
              }
            >
              <Defs />
              <g transform={`translate(${stage.width / 2} ${stage.height / 2})`}>
                <AnimatePresence>
                  {act && Act && (
                    <motion.g
                      key={act.id}
                      initial={{ opacity: 0, y: 18, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -18, scale: 1.06 }}
                      transition={{ duration: 0.42, ease: ease.out }}
                    >
                      <Act />
                    </motion.g>
                  )}
                </AnimatePresence>
              </g>
            </svg>
          </motion.div>

          <ActTimeline index={index} progress={progress} />

          {/* WCAG 2.2.2: anything that moves for more than five seconds needs a
              way to stop it. */}
          <button
            type="button"
            className="hero__pause"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
            aria-label={paused ? "Play the hero animation" : "Pause the hero animation"}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
            <span>{paused ? "Play" : "Pause"}</span>
          </button>
        </>
      )}
    </div>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true" focusable="false">
      <rect x="2" y="1.5" width="3" height="9" rx="1" fill="currentColor" />
      <rect x="7" y="1.5" width="3" height="9" rx="1" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true" focusable="false">
      <path d="M3 1.5 L10.5 6 L3 10.5 Z" fill="currentColor" />
    </svg>
  );
}
