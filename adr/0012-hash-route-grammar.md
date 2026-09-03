# 0012 — Hash route grammar `#/<screen>[/<detail>]`, output tab included

- **Status**: Accepted
- **Date**: 2026-09-03
- **Decider**: atran (M0 implementation, issue #1)

## Context

M0 (issue #1) calls for "hash-based routing with `#/design` and `#/output` routes". ADR 0002 puts the app on GitHub Pages with no server, so deep links cannot be rewritten server-side and the whole route must live in the fragment. ADR 0004 already committed to one specific fragment shape for share links: `#/s/1.<payload>`.

That leaves two things unstated. First, whether the fragment carries anything beyond the screen — the output screen has five tabs (spec §8.2) and the per-row chart has a row selector, all of which are candidates for the URL. Second, what happens on a fragment the app does not recognize, which matters immediately: a v1 app will receive `#/s/…` links from a later version, and vice versa.

## Decision

One grammar for every route: `#/<screen>[/<detail>]`, with the leading segment naming the screen and at most one detail segment beneath it. ADR 0004's `#/s/1.<payload>` is read as an instance of it (screen `s`, detail the payload) rather than a special case.

The output tab is that detail segment for the output screen: `#/output/wireframe`. `#/output` alone means the default tab, Instructions, and the default tab is omitted when serializing so each route has exactly one spelling. The tab therefore lives in the URL, not in component state.

Nothing else goes in the fragment: no query string, no per-tab state such as the per-row chart's current row.

Parsing never throws and never renders blank. An unrecognized screen, an unrecognized detail segment, or an empty fragment all fall back to the design screen.

## Alternatives considered

- **Output tab in component state, `#/output` only.** Exactly what the milestone asked for, and less code. Rejected because the five output artifacts are the app's deliverables: being unable to link someone to the wireframe is a real loss, and duplicating the tab into state invites the state and the URL to disagree.
- **A query string in the fragment (`#/output?tab=wireframe`).** More extensible, and the conventional place for optional parameters. Rejected because ADR 0004 already spends the fragment on a path-shaped share link; two competing sub-grammars in one fragment is worse than one grammar that both uses fit.
- **Serializing every route with its tab (`#/output/instructions`).** Rejected: two spellings of the default route means share links and browser history entries differ over the same view for no benefit.

## Consequences

- Output tabs are deep-linkable and survive reload; the back button steps through them.
- Any state that should not be linkable — the per-row chart's row, zoom level, palette selection — stays in component state by default. Adding it later means extending the grammar, which is a decision worth making explicitly rather than by accident.
- M10 adds an `s` screen to the parser rather than a parallel routing path. Until it does, a share link from a newer deploy lands on the design screen with the payload dropped. That is the intended degradation, but it does mean M10 must move the payload out of the fragment and into state on load, or the first navigation after opening a share link discards it.
- Parsing is a pure function of a string, so the routing rules are unit-tested without a DOM even though `src/routing/` sits outside the engine boundary of ADR 0011.
