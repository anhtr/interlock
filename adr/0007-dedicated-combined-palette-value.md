# 0007 — Dedicated COMBINED palette value for pXn stitches

- **Status**: Accepted
- **Date**: 2026-09-02
- **Decider**: atran (planning session, question round 2)

## Context

`pXn` (§1.2) is a real notation feature: one stitch with diagonals reaching both backward and forward. The spec's formal palette (§4.3) never assigned it a value, while the design shell invented a "Combined" button — a gap the spec explicitly flags as an unmade decision (§12.2).

## Decision

Add a formal COMBINED palette value with its own button and a two-target placement gesture (backward target, then forward target), authoring a single pXn token.

## Alternatives considered

- **Compositional** — place a forward diagonal and a backward diagonal anchored at the same cell, and let the generator compose the pXn token. Smaller palette, but the combined stitch is less discoverable and the composition rule is invisible in the UI.

## Consequences

- The palette settles at 9 buttons: F, B, T, FILL, DIAG, LONG DIAG, COMBINED, plus KNOT and POST modifier toggles — replacing the shell's 11.
- Storage needs no new token kind: the existing diagonal token carries both a `before` and an `after` target, and their joint presence means pXn.
