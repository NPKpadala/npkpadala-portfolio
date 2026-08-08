# NPK Hero — "From Idea to Orbit"

An eight-act looping hero animation: **idea → blueprint → code → test → launch → orbit → real users → growth**, then the trend line's head flies back to the centre and becomes the next bulb, so the loop closes on purpose instead of cutting.

React 19 · TypeScript (strict) · Framer Motion · Vite · SVG only — no video, no Lottie, no runtime CDN.

```bash
npm install
npm run dev        # playground at :5173, with a tall spacer for testing the pause-off-screen behaviour
npm run build      # typecheck, then emit dist/hero.js + dist/hero.css
npm run typecheck
```

## Mounting it

npkpadala.com is static HTML with no bundler, so the build emits one self-contained IIFE:

```html
<link rel="stylesheet" href="/assets/hero/hero.css">
<div id="hero-root"></div>
<script src="/assets/hero/hero.js" defer></script>
```

That is the whole integration. The script auto-mounts into `#hero-root` if it finds one; `window.NPKHero.mount(target, props)` and `.unmount(target)` are there for anything that needs to control placement or pass options (`speed`, `title`, `subtitle`).

React and Framer Motion are bundled rather than loaded from a CDN. A third-party script tag is one more thing that can rate-limit, change, or vanish on the one page that has to work.

## Moving it to Next.js later

Nothing in `src/` imports anything framework-specific. To use it in a Next.js 15 app, copy `src/`, add `"use client"` at the top of `HeroAnimation.tsx`, and render `<HeroAnimation />`. Delete `main.tsx` — that file exists only to bridge into a page with no build step.

## Decisions worth knowing about

**Why not GSAP.** The brief said "GSAP where needed". Framer Motion covers every transition here — orchestration, `pathLength` stroke drawing, `AnimatePresence` exits, spring-smoothed pointer values. Adding a second animation library to check a box would have cost ~25 KB gzip and bought nothing, so it is not here.

**Why the animation stops.** It runs only when the hero is on screen (`IntersectionObserver`), the tab is visible (`visibilitychange`), the user has not paused it, and the OS has not asked for reduced motion. A hero at the top of a scrolling page spends most of a session out of view; animating through that is wasted battery on a laptop and visible jank on a phone.

**Why the timeline is a rAF loop and not `setInterval`.** Act boundaries are derived from frame timestamps, so they do not accumulate drift over a long session, and the per-frame delta is clamped at 100 ms — otherwise a backgrounded tab returns with one enormous delta and skips several acts at once.

**Why pointer parallax uses MotionValues.** A `setState` per `pointermove` would re-render the entire act tree at the pointer's sample rate. MotionValues are written straight to the compositor and never enter React's render cycle.

**Why reduced motion gets a different render, not a frozen frame.** A still of one act tells an eighth of the story. `StaticPoster` states the whole pipeline as a static diagram, so the reduced-motion path carries the same message.

**Why there is a pause button.** WCAG 2.2.2: anything that moves for more than five seconds needs a mechanism to stop it.

**Bundle size.** 345 KB raw / ~109 KB gzipped, almost all of it React (~45 KB gz) and Framer Motion (~34 KB gz). If that ever needs to come down, the order is: `LazyMotion` + `m` components (≈ −18 KB), then aliasing `preact/compat` (≈ −40 KB). Neither is worth the risk until the number actually matters, and the animation is `defer`-loaded below the fold-critical path.

## Verified

Rendered in headless Chromium at 1280×760 and 390×844, screenshotting mid-act for all eight acts plus the reduced-motion and mobile paths, with the console asserted clean. That pass caught four real bugs: orbiting particles squashed into dashes by an un-counter-scaled ellipse transform, the test-suite counts overlapping their progress bars, a missing `box-sizing` that pushed the act counter and pause control off-screen on a phone, and sampling drift in the harness itself.

Not verified here: real-device GPU behaviour, and Safari's handling of `offset-path` on the orbiting satellite (it is spec-supported, but this box has no Safari to prove it on).
