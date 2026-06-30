# Prestige Auto Rentals

Luxury, exotic & performance car rental — marketing site built with [Next.js](https://nextjs.org) (App Router) and deployed on [Vercel](https://vercel.com).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment — fully automatic

This repository is connected to Vercel via the **native Git integration**. There is nothing to run manually:

- **Every push to `main`** triggers a **Production** deployment.
- **Every push to any other branch / pull request** triggers a **Preview** deployment with its own URL.

No secrets or tokens live in this repo — the GitHub ↔ Vercel link is configured on the Vercel project itself. Build settings are auto-detected from `package.json` (`next build`); see `vercel.json` for the explicit framework pin.

## Project structure

```
app/
  layout.tsx     # Root layout + metadata
  page.tsx       # Landing page (hero, fleet, reserve)
  globals.css    # Styles
next.config.mjs
vercel.json      # Framework + git deployment config
```
