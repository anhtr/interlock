# 0009 — Edge grow/shrink resize first; repeat-unit resize later

- **Status**: Accepted
- **Date**: 2026-09-02
- **Decider**: atran (planning session, question round 2)

## Context

The spec's resize algorithm identifies the pattern's repeat unit and adds or removes whole units (§6.3), while the design shell offers simple grow/shrink-from-an-edge steppers. A naive edge crop cuts through a repeating motif (§12.7).

## Decision

Ship simple edge grow/shrink early, in the editor's settings sheet (milestone M3), because it is useful for any design regardless of repetition. Build repeat-unit detection and whole-unit resize as its own later milestone (M13), falling back to edge resize when no repeat is detected.

## Alternatives considered

- **Repeat-unit resize only** — correct for repeating motifs, but leaves the editor with no canvas resize at all until that milestone lands.
- **Edge grow only for v1** — accepts motif-cutting as a permanent limitation.

## Consequences

- Both resize modes coexist; the app chooses based on whether a repeat is detected and says which it used.
- Repeat-unit resize re-runs the full grid-to-instructions pipeline rather than patching text, since row numbering, color and side alternation, and compression all depend on exact position.
