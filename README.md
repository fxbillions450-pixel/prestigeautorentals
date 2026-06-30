# Prestige Auto Rentals

Cinematic car-rental website showcase built with Next.js, Tailwind CSS, GSAP, Lenis, and React Three Fiber.

The page uses the monolith-style scroll experience: a pinned WebGL hero, a 360-degree orbit around the Porsche Cayenne model, editorial slide reveals, fleet photography, and direct contact paths. The goal is to showcase a rentable website concept, not to run a full booking flow.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
```

## Deployment

This repository is connected to Vercel through the native Git integration:

- Every push to `main` triggers a production deployment.
- Every push to another branch or pull request triggers a preview deployment.

No secrets or tokens live in this repo. The GitHub to Vercel link is configured on the Vercel project itself.
