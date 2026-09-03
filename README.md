# Interlock

A mobile-first, fully static web app for designing interlocking-crochet patterns: paint a stitch-type grid, then generate written instructions and charts from it.

## Repository layout

- [adr/](adr/) — architecture decision records, indexed in [adr/README.md](adr/README.md)
- [ref/interlocking_crochet_app_spec-2.md](ref/interlocking_crochet_app_spec-2.md) — the authoritative technical spec
- [ref/design/](ref/design/) — visual design shell (`Interlock.dc.html`), the Nocturne stylesheet, and the design handoff notes
- `ref/*.pdf` — source pattern material used for verification
- `src/engine/` — pure-TypeScript notation engine (lands in M1)
- `src/routing/`, `src/ui/` — app shell: hash routing and React components
- `src/styles/nocturne.css` — a verbatim copy of the design system stylesheet

## Development

Requires the Node version in [.nvmrc](.nvmrc).

```sh
npm ci
npm run dev          # local dev server
npm test             # unit tests (Vitest)
npm run typecheck    # tsc
npm run lint         # ESLint
npm run build        # production build into dist/
```

`src/engine/**` is pure TypeScript with no React and no DOM (ADR 0011); ESLint enforces the boundary.

## Build status

M0 is in place: toolchain, CI, and the deployed app shell. The remaining milestones M1–M13 are tracked by [epic issue #16](https://github.com/anhtr/interlock/issues/16), delivered one milestone per pull request.

The app deploys to <https://anhtr.github.io/interlock/> from `main`.
