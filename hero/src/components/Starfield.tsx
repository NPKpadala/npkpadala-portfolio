import { motion, useTransform, type MotionValue } from "framer-motion";
import { useMemo } from "react";
import { palette } from "../theme";

interface Props {
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  animate: boolean;
}

interface Star {
  x: number;
  y: number;
  r: number;
  o: number;
  delay: number;
}

/** Deterministic PRNG: a fixed field beats Math.random, which would reshuffle
 *  the sky on every re-render and flicker under React strict mode. */
function makeStars(count: number, seed: number): Star[] {
  let state = seed;
  const next = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    x: next() * 100,
    y: next() * 100,
    r: 0.6 + next() * 1.5,
    o: 0.25 + next() * 0.5,
    delay: next() * 4,
  }));
}

const LAYERS = [
  { count: 40, seed: 12345, depth: 8, size: 0.7 },
  { count: 26, seed: 67890, depth: 18, size: 1 },
  { count: 14, seed: 24680, depth: 34, size: 1.35 },
] as const;

/**
 * Three depth layers that shift by different amounts under the pointer. The
 * differential is the whole effect — matched movement would just be a pan.
 */
export function Starfield({ pointer, animate }: Props) {
  const layers = useMemo(
    () => LAYERS.map((layer) => ({ ...layer, stars: makeStars(layer.count, layer.seed) })),
    [],
  );

  return (
    <div className="hero-starfield" aria-hidden="true">
      {layers.map((layer) => (
        <Layer key={layer.seed} layer={layer} pointer={pointer} animate={animate} />
      ))}
    </div>
  );
}

function Layer({
  layer,
  pointer,
  animate,
}: {
  layer: { stars: Star[]; depth: number; size: number; seed: number };
  pointer: Props["pointer"];
  animate: boolean;
}) {
  const x = useTransform(pointer.x, (value) => value * -layer.depth);
  const y = useTransform(pointer.y, (value) => value * -layer.depth);

  return (
    <motion.div className="hero-star-layer" style={{ x, y }}>
      {layer.stars.map((star, i) => (
        <motion.span
          key={i}
          className="hero-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.r * layer.size * 2,
            height: star.r * layer.size * 2,
            background: palette.text,
            opacity: star.o,
          }}
          {...(animate
            ? {
                animate: { opacity: [star.o, star.o * 0.3, star.o] },
                transition: {
                  duration: 3 + (i % 5),
                  delay: star.delay,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                },
              }
            : {})}
        />
      ))}
    </motion.div>
  );
}
