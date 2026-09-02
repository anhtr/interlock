# 0001 — Build with React + TypeScript + Vite

- **Status**: Accepted
- **Date**: 2026-09-02
- **Decider**: atran (planning session, question round 1)

## Context

The spec (§5) calls for a serverless SPA with heavy client-side logic: a notation engine, an interactive grid editor, and shared SVG rendering. The repo was greenfield with no stack chosen; the design shell's handoff README leaves the target framework open.

## Decision

React + TypeScript + Vite. Vitest for unit tests.

## Alternatives considered

- Svelte + TS + Vite — lighter runtime, smaller ecosystem familiarity.
- Vanilla TS + Vite — fewer dependencies, more manual wiring for tabs/dialogs/state.
- No-build vanilla JS — avoids installing Node, but the weakest testing story for the notation engine, which is the part that most needs tests.

## Consequences

- Node.js must be installed on the dev machine (Homebrew; milestone M0).
- The notation engine remains framework-independent (see ADR 0011); React is confined to the UI layer.
