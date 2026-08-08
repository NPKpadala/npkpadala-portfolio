import { useEffect, useState, type RefObject } from "react";

/** True when the OS asks for less movement. Re-evaluates if the user flips it. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof matchMedia === "function" ? matchMedia("(prefers-reduced-motion: reduce)").matches : false,
  );

  useEffect(() => {
    if (typeof matchMedia !== "function") return;
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** True for touch/pen input, where a pointer-parallax effect has nothing to track. */
export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(() =>
    typeof matchMedia === "function" ? matchMedia("(pointer: coarse)").matches : false,
  );

  useEffect(() => {
    if (typeof matchMedia !== "function") return;
    const query = matchMedia("(pointer: coarse)");
    const onChange = (event: MediaQueryListEvent) => setCoarse(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return coarse;
}

/**
 * True while the element is on screen *and* the tab is visible.
 *
 * The hero is the top of a scrolling page, so it spends most of a session out
 * of view. Animating through that is wasted battery on a laptop and visible
 * jank on a phone — everything downstream keys off this flag.
 */
export function useIsActive(ref: RefObject<Element | null>): boolean {
  const [onScreen, setOnScreen] = useState(true);
  const [visible, setVisible] = useState(() =>
    typeof document === "undefined" ? true : !document.hidden,
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver !== "function") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setOnScreen(entry.isIntersecting);
      },
      // A sliver on screen still counts: pausing the moment the last pixel
      // leaves looks like a bug when you scroll back a hair.
      { threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return onScreen && visible;
}
