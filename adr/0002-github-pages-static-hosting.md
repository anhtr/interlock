# 0002 — Host on GitHub Pages, fully static, no backend

- **Status**: Accepted
- **Date**: 2026-09-02
- **Decider**: atran (planning session, question round 1)

## Context

The spec (§5.4) sketched serverless functions for PDF export and save/share persistence. The app otherwise runs entirely client-side.

## Decision

GitHub Pages, fully static. No backend, no serverless functions, ever. Features the spec assigned to functions are reinterpreted client-side: PDF export in the browser (ADR 0005) and sharing via URL-encoded state (ADR 0004).

## Alternatives considered

- Cloudflare Pages + Workers / Vercel / Netlify — would allow server-side PDF assembly and short share links; declined as unnecessary.

## Consequences

- Zero hosting cost and operations; deploys tie directly to the existing repo.
- `vite.config.ts` needs `base: '/interlock/'`; routing uses URL hashes so deep links work on Pages.
- Short share URLs and server-side persistence are permanently out of scope.
