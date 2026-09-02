# 0003 — CI and Pages deployment from the first milestone

- **Status**: Accepted
- **Date**: 2026-09-02
- **Decider**: atran (planning session, question round 3)

## Context

The build is deliberately incremental (one milestone issue per session, epic #16) so the user can steer between increments. Steering requires seeing each merged increment running.

## Decision

From milestone M0: GitHub Actions run typecheck, lint, and tests on every push and pull request, and auto-deploy to GitHub Pages from `main`.

## Alternatives considered

- Tests-only CI with deployment added later; no CI at all — both weaken the review-each-increment workflow.

## Consequences

- Every merged milestone is immediately viewable at https://anhtr.github.io/interlock/.
- CI must stay green as a merge condition from the very first PR.
