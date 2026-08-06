import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

interface Parallax {
  /** −1 → 1, relative to the centre of the tracked element. */
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Pointer parallax, spring-smoothed.
 *
 * Deliberately built on MotionValues rather than React state: a `setState` per
 * pointermove would re-render the whole act tree at the pointer's sample rate.
 * These values are written straight to the compositor and never touch React's
 * render cycle at all.
 *
 * Listening on window rather than the element keeps the effect alive while the
 * pointer travels across the page, which reads as depth instead of the layers
 * snapping back the instant the cursor leaves the stage.
 */
export function usePointerParallax(enabled: boolean): Parallax {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 60, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!enabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMove = (event: PointerEvent) => {
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;
      if (halfWidth === 0 || halfHeight === 0) return;
      rawX.set(clamp((event.clientX - halfWidth) / halfWidth));
      rawY.set(clamp((event.clientY - halfHeight) / halfHeight));
    };

    // passive: this listener never calls preventDefault, and saying so keeps
    // it off the main thread's scroll-blocking path.
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

function clamp(value: number): number {
  return Math.max(-1, Math.min(1, value));
}
