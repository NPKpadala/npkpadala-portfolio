import { useEffect, useRef, useState } from "react";

/**
 * Character count for a typing effect, advanced on rAF.
 *
 * Returns a number rather than a string so the caller can keep its syntax
 * highlighting: slicing a pre-highlighted token list by character count keeps
 * the colours, where slicing a plain string would throw them away.
 *
 * The cadence is deliberately uneven — a fixed characters-per-second reads as
 * a machine, and the brief asked for a cursor that behaves naturally.
 */
export function useTypewriter(total: number, charsPerSecond: number, active: boolean): number {
  const [typed, setTyped] = useState(0);
  const progress = useRef(0);
  const last = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      progress.current = 0;
      last.current = null;
      setTyped(0);
      return;
    }

    let frame = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const previous = last.current;
      last.current = now;
      if (previous === null) return;

      const dt = Math.min((now - previous) / 1000, 0.1);
      // ±25% jitter around the target rate.
      const jitter = 0.75 + Math.random() * 0.5;
      progress.current = Math.min(progress.current + dt * charsPerSecond * jitter, total);

      const next = Math.floor(progress.current);
      setTyped((current) => (current === next ? current : next));

      if (progress.current >= total) cancelAnimationFrame(frame);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [total, charsPerSecond, active]);

  return typed;
}
