# 0011 — Pure TypeScript engine, hard boundary from UI

- **Status**: Accepted
- **Date**: 2026-09-02
- **Decider**: planning session design pass (consistent with the spec's own architecture guidance)

## Context

Seven separate features consume the same notation logic: the editor, the output tabs, PNG import, reverse parsing, resize, share encoding, and PDF export. The spec establishes that generation is a pure function of the saved design state and that no output artifact is ever independently persisted (§7.3, §11.8).

## Decision

`src/engine/**` is pure TypeScript with no React and no DOM imports, enforced by an ESLint `no-restricted-imports` rule from milestone M0. React lives only in `src/render/`, `src/editor/`, `src/output/`, and `src/app/`. Modules: `tokens/`, `design/`, `generate/`, `parse-instructions/`, `chart/`, `resize/`, `share/`, `import/`.

The shared renderer follows the same split: `chart/layout.ts` holds the §10.6 geometry as named constants and `chart/state.ts` computes a view-model from `(design, uptoPassIndex)`; `src/render/FabricBlock.tsx` renders that view-model with `mirror` and `showFringe` props. The editor overlays interactivity in the same SVG coordinate space, taking its tap-target rectangles from the same layout module.

## Consequences

- The entire logic surface is unit-testable in Vitest without a DOM, which is what makes the spec's golden fixtures (§10) and parse/serialize round-trip properties practical.
- The renderer is built before the editor (milestone M2 before M3): the interactive layer must live in the renderer's coordinate space, so temporary flat-cell scaffolding would mean writing the interaction geometry twice.
- Editor cells and tap targets cannot drift apart, since both derive from one layout function.
