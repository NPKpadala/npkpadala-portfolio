import { useEffect, useRef, useState } from "react";
import { ACTS } from "../acts";

interface TimelineState {
  /** Index into ACTS. */
  index: number;
  /** 0→1 through the current act, updated once per frame. */
  progress: number;
  /** How many full loops have completed — lets an act vary on repeat. */
  loop: number;
}

interface Options {
  /** Multiplier on every act duration. 1 = as authored. */
  speed?: number;
  /** When false the clock holds still (reduced motion, or off-screen). */
  running: boolean;
}

/**
 * Drives which act is on screen.
 *
 * Three things this does that a naive `setInterval` does not:
 *
 *  - Advances off `requestAnimationFrame` timestamps rather than accumulating
 *    interval drift, so act boundaries stay put over a long session.
 *  - Stops entirely when told to (tab hidden, hero scrolled out of view). An
 *    animation nobody is looking at should not be waking the compositor —
 *    this is the difference between a hero and a battery drain.
 *  - Clamps the delta. A backgrounded tab that misses frames would otherwise
 *    return with one enormous dt and skip several acts at once.
 */
export function useActTimeline({ speed = 1, running }: Options): TimelineState {
  const [state, setState] = useState<TimelineState>({ index: 0, progress: 0, loop: 0 });

  // Live values live in refs: the rAF loop must not re-subscribe every frame.
  const elapsed = useRef(0);
  const indexRef = useRef(0);
  const loopRef = useRef(0);
  const lastFrame = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      lastFrame.current = null;
      return;
    }

    let frame = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);

      const previous = lastFrame.current;
      lastFrame.current = now;
      if (previous === null) return;

      // 100ms ceiling: a tab that was throttled resumes where it paused
      // instead of teleporting through the story.
      const dt = Math.min((now - previous) / 1000, 0.1) * speed;
      elapsed.current += dt;

      const act = ACTS[indexRef.current];
      if (!act) return;

      if (elapsed.current >= act.duration) {
        elapsed.current -= act.duration;
        const next = (indexRef.current + 1) % ACTS.length;
        if (next === 0) loopRef.current += 1;
        indexRef.current = next;
      }

      const current = ACTS[indexRef.current];
      setState({
        index: indexRef.current,
        progress: current ? Math.min(elapsed.current / current.duration, 1) : 0,
        loop: loopRef.current,
      });
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, speed]);

  return state;
}
