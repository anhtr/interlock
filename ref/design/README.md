# Handoff: Interlock — Crochet Pattern Designer

## Overview
Interlock is a mobile-first web app for designing interlocking-crochet patterns on a grid and generating written instructions and charts from them. Two main screens — Design and Output — reachable via a bottom tab bar (mobile) or sidebar (desktop).

## About the Design Files
The bundled file (`Interlock.dc.html`) is a **design reference** built in this tool's own component format (inline-styled templates + a small runtime, `support.js`). It is not production code and will not run outside this tool as-is — treat it as a precise, interactive spec of layout, states, and copy. The task is to **recreate this design in the target codebase's environment** (React, Vue, native, etc. — pick the best fit if none exists yet) using real components and libraries.

## Fidelity
**Mixed.** The Design screen (grid canvas, stitch palette, settings sheet, pixel-art import) and the Output screen's Instructions tab are high-fidelity — build them pixel-precisely. The other four Output tabs (Full chart, Per-row chart, Wireframe, Mockup) are intentionally **low-fidelity placeholders**: dashed-border boxes with a centered label, standing in for illustrated chart/wireframe/mockup graphics that will be generated separately (a "fabric block" illustration style with cutout textures and connect-the-dot wireframes). Build their surrounding chrome (nav, tabs, toggles) pixel-precisely; leave the illustration area as a placeholder until that generative work exists.

## Screens / Views

### Design screen
- **Purpose**: paint a stitch-type grid that represents an interlocking crochet motif.
- **Layout**: header (title, save status, undo/redo, zoom, import, settings) → main area, flex row on desktop / column on mobile: grid canvas (flex:1, scrollable, zoomable) + stitch palette (right column on desktop, bottom strip on mobile, wraps to multiple rows instead of clipping).
- **Grid canvas**: uniform square cells (default 24–40px depending on zoom), one cell per stitch position. Cell fill = flat Colour A or Colour B (no gradients/shadows) depending on stitch type. Diagonal stitches (placed via a two-tap gesture) render an literal connecting line between the two cells' centers, colored by yarn color with a dark outline stroke for contrast, on top of the grid.
- **Palette**: 11 stitch types — Front (F, solid bar), Back (B, outlined bar), Through-both (T, capped bar), Fill (cluster of bars), Diagonal/Diagonal-back (short slash), Long diagonal/Long diagonal-back (steep slash), Combined (chevron), Knot (circle+dot modifier), Post (square modifier, secondary). Selecting one highlights it (persistent state, not hover). F/B/T/Fill/Combined/Knot/Post paint on a single tap; the four diagonal types use tap-start → tap-target, dimming invalid targets and showing a cancel affordance while pending.
- **Settings** (gear icon → bottom sheet on mobile / centered dialog on desktop): Colour A / Colour B pickers, grid width/height steppers with a left/right or top/bottom side toggle controlling which edge grows/shrinks, foundation method (segmented: Standard chain / Foundation sc, each with a one-line description), border style (6-item description list: No border, Single crochet edge, Pinstripe border, Picot edge, Blanket border, Fringe edge). Settings are per-pattern, not global — copy in the sheet says so.
- **Import pixel art**: an icon button (next to settings) opens a file picker; the uploaded image is downscaled to the grid's dimensions and thresholded into Colour A / Colour B fills.

### Output screen
- **Purpose**: view/export the generated pattern.
- **Layout**: header (Back to design, pattern title, Download PDF — always visible, not tab-scoped) → tab row (pinned, wraps if needed) → scrollable tab content.
- **Tabs**: Instructions (real: monospace row-by-row shorthand text generated from the grid, alternating direction per row, with a Copy button), Full chart (placeholder, square dashed card), Per-row chart (real prev/next + row jump control, placeholder card sized for one row), Wireframe (placeholder, square dashed card), Mockup (real Front/Back segmented toggle, placeholder square card).

## Interactions & Behavior
- Undo/redo: linear history stack of grid snapshots, cleared-forward on new edits.
- Autosave: any edit sets a "Saving…" label that reverts to "Saved" after ~600ms (simulate real autosave debounce in production).
- Responsive breakpoint: 900px — switches between sidebar+bottom-tab-less layout (desktop) and bottom tab bar (mobile).
- Diagonal placement: offsets are (−1,+1) diagonal-forward, (−1,−1) diagonal-back, (−2,+2)/(−2,−2) for the long variants; tapping the start cell again or an invalid cell cancels the pending placement.

## Design Tokens
Pulled from the bound **Nocturne** design system (dark ground, Inter, 8px radius, single accent as line/glow):
- `--color-bg #161826`, `--color-surface #232532`, `--color-text #e9e9ed`, `--color-accent #9184d9` (+ 100–900 ramps)
- `--font-heading` / `--font-body`: Inter
- `--radius-md: 8px`, `--radius-lg: 14px`
- `--shadow-sm/md/lg` for elevation (dialog only)
- User-set per-pattern: Colour A (default `#4f7fc9`), Colour B (default `#c94f4f`) — these are yarn colors, not part of the system palette, and vary per pattern.

## Assets
No external image assets. Stitch-type glyphs are built from plain divs (bars/rotated bars/circles), not icon files. Icons elsewhere are inline SVG line icons.

## Files
- `Interlock.dc.html` — the full design (Design + Output screens, all states above)
- `nocturne.css` — the design-system stylesheet the design links to
