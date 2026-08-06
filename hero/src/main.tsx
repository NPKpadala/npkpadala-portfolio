import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { HeroAnimation, type HeroAnimationProps } from "./HeroAnimation";

/**
 * Entry point for the static site.
 *
 * npkpadala.com has no bundler, so the build emits one IIFE that exposes a
 * single global. The page mounts the hero with:
 *
 *   <div id="hero-root"></div>
 *   <link rel="stylesheet" href="/assets/hero/hero.css">
 *   <script src="/assets/hero/hero.js" defer></script>
 *
 * Auto-mounting when #hero-root exists keeps the host page down to markup,
 * and `NPKHero.mount()` stays available for anything that needs to control
 * placement or options itself.
 */

const roots = new WeakMap<Element, Root>();

function mount(target: string | Element = "#hero-root", props: HeroAnimationProps = {}): void {
  const element = typeof target === "string" ? document.querySelector(target) : target;
  if (!element) {
    console.warn(`[npk-hero] mount target not found: ${String(target)}`);
    return;
  }

  // Remounting the same node would otherwise leak a detached root and leave
  // two rAF loops running against one container.
  let root = roots.get(element);
  if (!root) {
    root = createRoot(element);
    roots.set(element, root);
  }

  root.render(
    <StrictMode>
      <HeroAnimation {...props} />
    </StrictMode>,
  );
}

function unmount(target: string | Element = "#hero-root"): void {
  const element = typeof target === "string" ? document.querySelector(target) : target;
  if (!element) return;
  const root = roots.get(element);
  if (!root) return;
  root.unmount();
  roots.delete(element);
}

declare global {
  interface Window {
    NPKHero: { mount: typeof mount; unmount: typeof unmount };
  }
}

window.NPKHero = { mount, unmount };

// `defer` guarantees a parsed DOM, but a dynamically injected tag has no such
// promise — hence the readyState check rather than a bare call.
function autoMount() {
  if (document.querySelector("#hero-root")) mount();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", autoMount, { once: true });
} else {
  autoMount();
}

export { HeroAnimation, mount, unmount };
