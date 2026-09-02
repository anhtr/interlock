# 0006 — Editor grid operates at pass resolution

- **Status**: Accepted
- **Date**: 2026-09-02
- **Decider**: atran (planning session, question round 2)

## Context

Interlocking crochet builds each visual design row from two passes, one per color. The spec's stored format holds one token string per pass, so a 5×5 design stores 10 token rows (§7.2, §10.2). The relationship between the editing grid and those rows was left unresolved (§12.6). The complementary rule (design color X at a position gives that pass F and the other pass B) applies only to F/B-only designs; once T, FILL, or diagonals appear, the two passes carry independent stitch choices (§10.5).

## Decision

The editor edits at pass resolution: each design row appears as two independently editable sub-rows (A-pass and B-pass), labeled in a gutter (1A, 1B, 2A, …). One grid cell is exactly one token, matching the canonical JSON one-to-one, with `rows.length = 2 × grid.height`. Complementary derivation survives only as a convenience for binary PNG import (populating both passes from one design-intent grid), not as the editing model.

## Alternatives considered

- **Design-row editing with defined derivation** — simpler interaction and half the vertical density, but structurally unable to express the independent per-pass stitch choices real published patterns use.
- **Design rows now, pass view later** — defers the harder model and risks reworking the editor and renderer once the pass view arrives.

## Consequences

- Any published Interlocking Patches pattern is reproducible; nothing in the notation is unreachable from the editor.
- The grid is twice as tall for a given design, and painting a plain F/B motif takes two strokes per row. A complementary-fill assist action is recorded in the backlog (issue #15) if this proves tedious in practice.
- Edge cells (first and last column of each pass) expose only a front/back choice; the model derives the concrete edge token — CH3 versus CH4 from the pass's color role, f/b from the paint, DCf/DCb at row end.
