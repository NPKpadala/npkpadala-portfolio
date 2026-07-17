# npkpadala — Portfolio

Personal engineering portfolio for **Praveen Padala** — a full-stack engineer who
designs, builds and operates production SaaS end to end.

**Live:** https://npkpadala.com

## About

A single-page, self-hosted portfolio built for speed and craft — no build step,
no runtime dependencies, no CDNs. Highlights three production systems (PDFWala,
RotatePro and a self-built ops monitor) all running on one Oracle Cloud ARM VM.

## Stack

- Static HTML + a pre-compiled Tailwind CSS utility set (inlined)
- [GSAP](https://gsap.com/) + ScrollTrigger for kinetic typography, a pinned
  horizontal pipeline, scroll-drawn timeline and magnetic hover
- Self-hosted Inter + JetBrains Mono (woff2)
- Canvas particle-network + CSS ambient mesh backgrounds

## Run locally

Any static server works, e.g.:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## License

© 2026 Praveen Padala. All rights reserved.
