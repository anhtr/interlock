# 0010 — Follow the design shell faithfully; reuse nocturne.css

- **Status**: Accepted
- **Date**: 2026-09-02
- **Decider**: atran (planning session, question round 3)

## Context

`ref/design/Interlock.dc.html` plus `ref/design/nocturne.css` and their handoff README form a precise interactive visual spec, marked high-fidelity for the Design screen and the Instructions tab and explicitly placeholder for the four illustrated output tabs. The shell predates several spec decisions and independently invented some concrete details (§12).

## Decision

Treat the shell as the visual specification: recreate layout, states, and copy pixel-precisely where marked high-fidelity, and import `nocturne.css` as-is rather than reimplementing its tokens. Apply the spec §12 corrections rather than inheriting the shell's versions of them.

## Corrections applied to the shell

| Shell as built | Corrected to | Spec |
|---|---|---|
| Flat-color canvas cells | Fabric-block styling, live in the editor, one shared renderer with the chart outputs | §4.1, §12.1 |
| Border names: Single crochet edge, Pinstripe, Picot edge, Fringe edge | The real six: No borders, Classic Badge, Quick Mesh, Easy Floating, Blanket, Mesh Blanket — and border choice affects the last two body rows | §1.7, §12.4 |
| 2 foundation options | 4: single-chain set-up rows (default) plus FA/FB standard, filled, and woven starts | §1.4.1, §2.2, §12.5 |
| 11-button palette incl. 2 long-diagonal buttons | 9 buttons; see ADR 0007 and ADR 0008 | §12.2, §12.3 |
| Stated diagonal grid offsets | Re-derived and validated against `ref/F003-UU.pdf` in milestone M5 | §12.6 |
| Edge-stepper resize only | Both modes; see ADR 0009 | §12.7 |

## Consequences

- The fabric-block card keeps a soft drop shadow, a deliberate second exception to Nocturne's dialogs-only elevation convention (§3.2, §12.8). Code comments must record this so it is preserved rather than "fixed" as an inconsistency.
- Yarn colors (Colour A and Colour B) are per-pattern user data, deliberately outside the design system's palette.
