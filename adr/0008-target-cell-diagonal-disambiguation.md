# 0008 — One palette button per diagonal reach; target cell disambiguates the form

- **Status**: Accepted
- **Date**: 2026-09-02
- **Decider**: atran (planning session, question round 2)

## Context

The notation has two short diagonal forms (`Xn` forward, `pX` backward) and four long forms with distinct reach geometry: `Xnn→` (2 mesh ahead, same row), `Xnn↓` (1 column over, 1 row down), `pp←X` (2 mesh back), and `pp↓X` (1 column back, 1 row down) — §1.2. The design shell collapsed the long forms into 2 buttons, which cannot disambiguate same-row reach from row-down reach (§12.3).

## Decision

One DIAG button (2 valid targets) and one LONG DIAG button (4 valid targets). Diagonal placement is already a two-tap gesture that snaps to structurally valid targets only (§5.2); which valid target the user taps determines which form is authored.

## Alternatives considered

- **Four distinct long-diagonal buttons** — most explicit, but crowds the mobile palette and largely duplicates what target snapping already expresses.
- **Two buttons plus a direction toggle** — an extra control for information the target tap already carries.

## Consequences

- Storage carries explicit target coordinates, so the target delta itself identifies the form; no arrow glyphs are stored. The written-notation generator maps deltas back to the glyph forms.
- Target snapping must be correct for the gesture to be unambiguous, which makes the pass-coordinate mapping for all six reach forms a prerequisite: it is written down and validated against `ref/F003-UU.pdf` at the start of milestone M5, replacing the shell's unverified placeholder deltas (§12.6).
