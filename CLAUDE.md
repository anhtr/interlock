# Interlock — working instructions

## Sources of truth

- `ref/interlocking_crochet_app_spec-2.md` is the authoritative spec. Cite it by section (for example §3.2) in issues, ADRs, and code comments. Where the spec and the design shell disagree, the spec wins — its §12 lists the known discrepancies.
- `ref/design/` holds the visual spec (`Interlock.dc.html`), the Nocturne stylesheet, and handoff notes. It is a design reference, not production code.
- The plus-sign worked example (spec §10) is the golden end-to-end fixture. Keep `src/fixtures/plus-sign.json` byte-for-byte per §10.2.

## Architecture decision records — ongoing

`adr/` holds this project's decision records, indexed in `adr/README.md`.

**Record a new ADR whenever a design decision is made or changed, at the moment it happens** — not at the end of a session, and not only when asked. This includes decisions reached while implementing, not just during planning: choosing between real alternatives on the data model, rendering approach, algorithm, dependency, or any departure from the spec or the design shell.

- Follow the existing format: numbered `NNNN-kebab-title.md` with Status, Date, Decider, Context, Decision, Alternatives considered, Consequences.
- Add a row to the table in `adr/README.md` for every new record.
- Records are immutable once accepted. If a decision changes, add a new record that supersedes the old one and mark the old one's status accordingly; do not edit the original.
- Reference the ADR ID in the commit or pull request that implements it.
- Skip routine implementation details — an ADR is for choices that shape later work and would be costly to reverse.

Several ADRs name work deferred to a specific milestone (for example the diagonal pass-coordinate mapping in ADR 0008, resolved in M5). When that milestone lands, record the resolved outcome.

## Build workflow

The build runs as milestones M0–M13, tracked by [epic issue #16](https://github.com/anhtr/interlock/issues/16), one milestone per pull request. Each milestone issue is self-contained: goal, scope, out-of-scope notes, acceptance criteria, spec references, dependencies. Before starting one, re-read its issue — the user steers by editing or commenting on it.

## Engineering constraints

- `src/engine/**` stays pure TypeScript: no React, no DOM. Enforced by ESLint (ADR 0011). All notation logic lives there and is unit-tested without a DOM.
- The fabric-block renderer uses plain SVG primitives with explicit fills — no masks, clip paths, or filters — so client-side PDF conversion works (ADR 0005).
- The fabric-block card's drop shadow is a deliberate exception to Nocturne's dialogs-only elevation convention (spec §3.2, §12.8). Keep it; do not "fix" it as an inconsistency.
- Generation is a pure function of the saved design JSON. No output artifact is ever separately persisted or hand-edited (spec §7.3).
