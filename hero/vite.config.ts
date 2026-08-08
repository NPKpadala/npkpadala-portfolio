import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Two build targets, one source.
 *
 * npkpadala.com is static HTML with no bundler, so the default build emits a
 * self-contained IIFE that the page mounts with two tags — React and Framer
 * Motion are bundled in rather than pulled from a CDN, because a third-party
 * script tag is one more thing that can rate-limit or vanish on the one page
 * that has to work.
 *
 * The components themselves import nothing framework-specific, so the same
 * `src/` drops into a Next.js 15 app (mark the entry `"use client"`) without
 * edits if the site ever grows a build step.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2020",
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Stable filenames: the host page references them directly, so a
        // content hash would mean editing index.html on every rebuild.
        entryFileNames: "hero.js",
        assetFileNames: "hero.[ext]",
        format: "iife",
        inlineDynamicImports: true,
      },
    },
  },
});
