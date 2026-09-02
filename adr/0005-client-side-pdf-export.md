# 0005 — Client-side PDF export via jsPDF + svg2pdf.js

- **Status**: Accepted
- **Date**: 2026-09-02
- **Decider**: atran (planning session, question round 3)

## Context

The spec (§8.3) assigned PDF assembly to an on-demand serverless function. ADR 0002 removes the backend, so PDF generation must happen in the browser. The document must lay out all five output artifacts (§8.2).

## Decision

Assemble the PDF client-side with jsPDF plus svg2pdf.js. Pages: cover/meta, paginated written instructions, full-design chart, per-row chart cards, wireframe, and RS/WS mockups side by side. The shared SVG renderers draw into a hidden DOM node, which svg2pdf converts.

## Alternatives considered

- A print stylesheet plus browser print-to-PDF — far less code and better text quality, but weak page-layout control and a print-dialog experience rather than a direct download.
- Ship print first, add the library later — rejected as duplicated effort.

## Consequences

- **Constraint on the renderer, adopted from milestone M2**: the SVG uses plain primitives only (rects, circles, ellipses, paths, text) with explicit fills — no masks, clip paths, filters, or CSS-dependent styling. Cutout windows are painted in the background color rather than left transparent, which also makes charts print correctly on white paper.
- A day-one spike in M11 pushes the plus-sign chart through svg2pdf to surface primitive gaps early; canvas rasterization is the documented fallback for any artifact that resists vector conversion.
- Fonts must be embedded (Inter, with a Helvetica fallback).
