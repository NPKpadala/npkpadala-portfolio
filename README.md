# npkpadala — Portfolio

Personal engineering portfolio for **Praveen Padala** — a full-stack engineer who
designs, builds and operates production SaaS end to end.

**Live:** https://npkpadala.com

## About

A fast, self-hosted **multi-page** portfolio — no build step, no runtime
dependencies, no CDNs. Four pages:

- **Home** (`index.html`) — a rotating 3D point-sphere hero over a custom CI/CD pipeline animation
- **Systems** (`systems.html`) — capability cube, the deploy pipeline, and a capability timeline
- **Projects** (`projects.html`) — three production systems (PDFWala, RotatePro, a self-built ops monitor)
- **Contact** (`contact.html`) — project intake + infrastructure "mission control"

This repository is a snapshot of the live site (links made relative so it also
runs on GitHub Pages or by opening `index.html` locally).

## Stack

- Static HTML + a pre-compiled Tailwind CSS utility set (inlined)
- [GSAP](https://gsap.com/) + ScrollTrigger for kinetic typography and scroll effects
- HTML5 Canvas for the 3D sphere and CI/CD pipeline animations
- Self-hosted Inter + JetBrains Mono (woff2)

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## License

© 2026 Praveen Padala. All rights reserved.
