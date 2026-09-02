# Interlocking Crochet Pattern App - Technical Spec (v2)

Source material:
- **Interlocking Patches notation**, from interlockingpatches.com: the *F003: U = U* pattern collection and the site's standalone, periodically-updated Documentation PDF (general reference, not tied to any single collection). Source of T, ff#, diagonals, and all rule/border/foundation content. Where the two differ in detail (e.g. border naming, Section 1.7), the standalone Documentation PDF is treated as most current.
- **A separate published pattern book's row-numbering/foundation conventions** (not a free-to-use source, and **not included in this repo**). Everything needed from it is reproduced in full below - Section 1.1's F/B/DCf/DCb/CH3f/CH3b/CH4f/CH4b term definitions, Section 2.1's row-numbering/RS-WS/turn rules, and Section 2.2's foundation method are complete, standalone descriptions that don't require consulting the original source. Referred to below only as "the book" for brevity, with no title/author citation, since the source text itself isn't reproduced verbatim anywhere in this document - only the underlying technique and terminology, described in this document's own words.
- These two are merged into **one combined vocabulary** (Section 1) rather than treated as separate systems needing translation - see Section 1.1 for how terms were chosen. The book's row-numbering/foundation contributions that aren't stitch vocabulary remain in Section 2.

This document specifies an app with four capabilities:
1. **Interactive design tab**: paint a stitch-type grid (F/B/T/Fill/diagonals/etc.) to build a pattern from scratch, or start from an imported binary pixel-art image. Per Section 4.1, this isn't just a data-entry step - the canvas renders live in the same fabric-block visual style as the finished chart output (Section 3.2), so a completed design in the editor already looks like, or very close to, the Full-design chart, rather than requiring translation between two different representations.
2. **Generate outputs from a design**: written instructions plus the five output artifacts in Section 8.2 (instructions, full chart, per-row chart, wireframe, mockup).
3. **Reverse direction**: existing written instructions -> tile art + chart.
4. **Resize** a pattern/chart to a target stitch count.

Bordering is included as reference material (Section 1.7), applied as a separate final step after body generation, not part of the core tile-editor/generation pipeline itself.

---

## 1. Combined Notation System (App Vocabulary)

### 1.1 Basic stitches

Same underlying technique as any interlocking/filet crochet: two mesh layers, one per color, built row by row, each DC worked into the corresponding stitch **2 rows below**. Term choices below are combined across the sources - the book's terms are kept wherever they exist, since they're more succinct and specific than the Interlocking Patches guide's own generic legend phrasing for the same stitches; terms with no book equivalent (T, ff#, diagonals - Section 1.2) come from Interlocking Patches, since it's the richer system.

- **mst** (mesh stitch): a vertical grid line, usually a DC. *(Interlocking Patches)*
- **msp** (mesh space): a gap/space made by a CH-1. *(Interlocking Patches)*
- **F**: a stitch worked to the front of the work, counts as 1 DC + 1 CH-1-sp. *(Book term, kept as the app's standard name over Interlocking Patches' equivalent generic "on front of work" phrasing.)*
- **B**: a stitch worked to the back of the work, counts as 1 DC + 1 CH-1-sp. *(Book term, same reasoning as F.)*
- **DCf**: a stitch worked to the front, counting as 1 DC only (no trailing CH-1) - used for row-edge stitches. *(Book term.)* Interlocking Patches doesn't name this distinctly - its own row-edge stitches are just a plain, unlabeled `dc` - so adopting DCf/DCb from the book also fills a small gap in the Interlocking Patches vocabulary by making edge-stitch front/back placement explicit rather than implicit.
- **DCb**: as DCf, but worked to the back. *(Book term; see DCf note.)*
- **CH3f / CH3b**: the row-starting/turning chain-3, worked to the front or back (MC-style row start, counts as 1 DC). *(Book term.)*
- **CH4f / CH4b**: the row-starting/turning chain-4, front or back (CC-style row start, counts as 1 DC + 1 CH-1-sp). *(Book term.)*
- **T**: a stitch worked through both meshes at once, visible on front and back simultaneously. *(Interlocking Patches only - no book equivalent.)*
- **ff#**: fill stitches. Work `#` DCs on front (unless noted), placed in mesh stitches *and* CH-1 spaces, with no chaining between them - i.e. a solid run with no open mesh. *(Interlocking Patches only - no book equivalent; this is how solid background/foreground areas get created.)*
- **X(k)**: knot stitch, optional, a 2 or 3-chain picot. *(Interlocking Patches only; see Section 1.6 for how it's worked into on the following row.)*

### 1.2 Diagonals (no equivalent in the book)

- **trF**: triple crochet (yarn over twice) worked to the front - a single-mesh diagonal.
- **prev** / **next**: shorthand for "the stitch just made" / "where the next mesh stitch would fall" - used to describe where a diagonal reaches to.
- **Xn**: `(st X, trF in next) together` - a regular stitch and a diagonal reaching one mesh ahead, worked as one combined stitch.
- **pX**: `(trF in prev, st X) together` - a diagonal reaching back one mesh, combined with the current stitch.
- **pXn**: `(trF in prev, st X, trF in next) together` - diagonals on both sides of one stitch.

**Long diagonals** (steeper angle, spans 2 mesh positions or 1 row + 1 mesh):
- **dtrF**: double-triple crochet (yarn over 3 times) to the front - a long diagonal.
- **Xnn→**: stitch combined with a dtrF reaching 2 mesh positions ahead.
- **Xnn↓**: stitch combined with a dtrF reaching into the next column, one row down.
- **pp←X** / **pp↓X**: same idea, reaching backward/upward instead of forward/down.

### 1.3 Global rules (apply to every row unless a specific row overrides them)

- `ch 1, sk 1` after every B/F/T/pX/pXn/Xn/X(k)/the last stitch of an ff-run.
- At the end of every row: `ch 3`, secure the loop, pick up the other color.
- CH-1s and the row-end CH-3 are normally omitted from the written notation (they're implied by the rules, not spelled out per-row) - the app should still track them internally for stitch-count validation.
- The turning CH-3 replaces the first mesh stitch and its CH-1 in row diagrams. If a row instead begins `[ch2]`, that means one turning chain has been removed from the usual CH-3/CH-4 (used when the row needs to start on an msp instead of an mst).
- Work in **both loops** of stitches and turning chains, *except* when working into a stitch that forms a visible outline (Colour A), in which case work in **back-loop-only** or **around the post** (this extends the post by 1 loop at its base) for a cleaner line.
- Work is turned **clockwise** for left-handed notation, **counter-clockwise** for right-handed notation - the pattern publishes both directions for every row (mirror images of each other).
- Carry Colour B's turning CH-3 on the **front** of the work unless a row specifically says otherwise.
- The **back** of the work faces the crocheter on even-numbered rows (front faces them on odd-numbered rows). Diagrams always show the front regardless of which row is being illustrated.
- Complete each row's stitches strictly in the order given in the notation - later positions can depend on where earlier stitches landed (this matters especially for diagonals, which reference `prev`/`next`).

### 1.4 Foundation and first rows

- **FA** (Foundation A) and **FB** (Foundation B): two separate starting chains, one per color, chained to slightly different lengths (FB is one msp shorter than FA, matching the "second layer has one fewer window" rule also present in the book).
- Foundation is worked in the **back bump** of the chain stitches.
- `1A` starts in FA's 5th chain from the hook; `1B` starts in FB's 5th chain **or** the 2nd msp of row 1A, depending on the specific pattern's layout.
- Patterns state `[N msps]` next to each foundation chain length as a sanity check - the app should compute and display this alongside any user-specified stitch count.
- **Not recommended as the app's default.** This dual-chain method requires chaining and tracking two separate foundations before the interlocking body even starts. Section 2.2's single-chain method achieves the same result more simply and is the recommended default (see note there) - this method is retained here as a documented alternative, e.g. for reproducing an existing Interlocking Patches pattern exactly as published.

### 1.4.1 Foundation start variants (within the FA/FB method)

These are named, selectable variants on how row 1B begins, not edge cases - the source collection tags each of its patterns with which variant it uses:

- **Standard start**: as described in Section 1.4 - FB is a normal alternating mesh chain, `1B` begins with regular F/B/T stitches.
- **Filled start**: FB's first row is worked entirely as a single `ff#` run rather than alternating mesh (e.g. `FB: ch 35 [15 msps, filled start] / Start in FB ch 4 only. / 1B: ff29[T#even]...`). Used when a design needs a solid block from the very first row - e.g. a solid-color background that starts at row 1 rather than being filled in later.
- **Woven start**: FB's starting tail is explicitly woven behind specific numbered stitches of row 1A before the row proper begins (e.g. `Weave FB tail behind 1A mst 1,6,18`), instead of simply starting at "the 2nd 1A msp." Used on wider or symmetric motifs, apparently to keep a long starting tail secure and evenly tensioned across a wide foundation rather than left loose at one edge.

The source collection tags each pattern with which of these (plus "no diagonals," "long diagonals," etc.) it uses, in a small icon key on its pattern index page - the app's settings (Section 8.1) should expose foundation start as a named choice among these three, not just a binary "book method vs. Interlocking Patches method" toggle.

### 1.5 Notation shorthand quirks worth encoding explicitly

- Fill-stitch runs that land awkwardly (start/end of a row, combined with other stitches, or appearing in row 1B before any "real" mesh exists) get bracketed sub-notation, e.g. `ff4[T#2,4]` (a 4-stitch fill run where stitches 2 and 4 of that run are worked as T instead of plain front DCs) or `pff9[T#3,7]n` (a fill run combined with diagonals on both ends, with specific positions worked as T). The app must be able to parse and generate these bracketed position-override lists, not just plain run-lengths.
- `(X Y)2` means repeat the parenthesized group twice - same bracket-repeat convention as the book, just with parentheses instead of square brackets as the primary grouping symbol.
- Both left-hand (`-L`) and right-hand (`-R`) notation are published per row for asymmetric designs; symmetric designs note "read diagrams in either direction" and skip the split.

### 1.6 Optional/advanced techniques (flag as optional in the app, not required for base functionality)

- **Yarn under** (instead of the usual yarn over) when drawing up the first loop of a long stitch (dc/tr/dtr), for more consistent gauge - purely a technique note, doesn't change notation.
- **Post stitches** (front post / back post versions of dc/tr/dtr): optional, used only when working into a stitch that forms a visible outline, to create smoother or embossed lines. All stitches except T and row-end DCs can be worked as post stitches. Specific guidance on which to use:
  - **Front-post** stitches extend **vertical outlines and diagonal outlines** - use these for smoother verticals/diagonals.
  - **Back-post** stitches (or back-loop-only, as a lighter-weight alternative) suit **horizontal outlines and knot stitches**.
  - Trade-offs worth surfacing in the app's UI copy if post stitches are offered as a setting: front-post stitches read as raised, back-post as recessed; post stitches generally create curved rather than sharp angles at joints, which may or may not suit a given design; and they can slightly disrupt alignment between the two mesh layers, giving outlines a "wobbly" look at high densities. To maintain gauge when using post stitches, extend dc and dtr post stitches by one loop in the base (optional for tr, i.e. regular single diagonals).
- **Knot stitch** `X(k)`: optional 2 or 3-chain picot, purely decorative. Worked around the post or in blo on the following row.

### 1.7 Bordering (Interlocking Patches system)

Six documented border options, from none to a full multi-round "blanket" border meant for seaming pieces together. Names below follow the standalone Documentation PDF, which is the most current source; individual pattern collections sometimes use older labels for the same techniques, noted per item where they differ:

1. **No borders** - break yarn, tie off, done.
2. **Classic Badge Border** - `hdcB` mesh round, then an `sc in blo` / back-and-third-loops round; gives a raised, vintage "merit-badge" edge. Best for badges and small patches at tight gauges. *(Older collections: "Classic Pinstripe.")*
3. **Quick Mesh Border** - a single `hdcT` mesh round through both meshes; fast, slightly rougher edge, gives small motifs room to "breathe." *(Older collections: "Quick 'Borderless'.")*
4. **Easy Floating Border** - `sc` worked directly into mesh spaces (skipping mesh stitches); most forgiving, best at hiding messy edges. *(Appears in some pattern collections but not in the standalone Documentation PDF's border section - may be a collection-specific extra rather than part of the general reference set. Verify against the current Documentation PDF before implementing.)*
5. **Blanket Border** - 3 rounds (`R1B` dcB mesh, `R1A` dcB mesh worked back-post, `R2B` scF/scT in back loop only), squared or rounded corners, adds 2 msps/4 sts to each dimension. The recommended choice when multiple motifs will be seamed together. *(Older collections: "Pinstripe Blanket Border.")*
6. **Mesh Blanket Border** - the same 3-round structure as item 5, but with `R1B` worked on the front (`dcF` stitches) and Colour B carried on the front throughout, giving a softer, non-pinstriped edge. *(Older collections: "'Borderless' Blanket Border.")*

The app should treat border selection as a separate, final step after all interlocking rows are generated, applied once the body's interlocking rows are complete.

**Body-instruction hooks**: each border style specifies up to three numbered insertion points that change how the *body's* final rows end (e.g. `[1] ch 3 to start border round (counts as a dcB + ch1)`, `[2] Carry Colour B on back`, `[3] ch 3 to start border round`), and these differ per border style - a Blanket Border's `[1]` is `ch 3`, while a Classic Badge Border's `[1]` is `ch 1` and doesn't count as a stitch. This means **border choice is not purely post-hoc**: the generator must know the selected border style before emitting the last two body rows, not only when generating the border rounds themselves.

### 1.8 Extending and combining motifs

- To add plain mesh rows around an existing motif (to enlarge it or attach a caption), work in rounds: begin in any corner stitch, `ch 3`, and work `dcX, ch 3, dcX, ch 1` at each corner to keep the piece square while extending equally on all sides.
- Grey grid lines (in their graph-paper charts) represent the Colour A mesh; light blue lines represent the Colour B mesh; thick blue lines mark the outer edge if a Blanket Border will be added. This convention is for their static graph-paper planning charts and is **not** the primary per-row chart style (see Section 3) - it's a "sizing/layout" reference view, not a "how to crochet this row" view.

---

## 2. Book-Sourced Row Logic and Foundation

With stitch vocabulary now unified in Section 1, everything below is what the book contributes that *isn't* stitch terminology: its row-numbering/RS-WS/turn logic, and its foundation method.

### 2.1 Row numbering, color alternation, RS/WS, turning

- Rows alternate color strictly: **Row 1 = CC, Row 2 = MC, Row 3 = CC, ...**
- Rows pair up (1-2, 3-4, 5-6, ...); both rows in a pair are worked on the same physical side without turning between them.
- Side alternates **WS, WS, RS, RS, WS, WS, RS, RS, ...** by pair.
- First row of each pair (CC): ends "Do not turn." Second row of each pair (MC): ends "Turn."
- Each row is labeled `Row N (Color-Side)`, e.g. `Row 1 (CC-WS)`.

This maps onto the Interlocking Patches system's own row-labeling (`1A`/`1B`, `2A`/`2B`, ...) but is **not identical** - the Interlocking Patches "back faces you on even-numbered rows" rule and its A/B-per-row-number convention should be treated as the authoritative structure; the book's WS/RS-by-pair language is a useful cross-check and an available presentation style, not a replacement. Since the stitch vocabulary is now fully unified (Section 1), offering this row-labeling style is purely a presentation choice, available for any design that doesn't use T, ff#, or diagonals (those simply have no place in this row-numbering style's origin, though the stitches themselves are always available regardless of which row-labeling style is displayed).

### 2.2 Set-up rows (recommended default foundation method)

The full method, described in this document's own words rather than quoted from the original source:

- Using MC (Colour A), chain the number of stitches the target design width calls for.
- **Set-up row 1 (MC, WS facing)**: working into the back bump of each foundation chain, single crochet in the second chain from the hook and in every chain across, then turn.
- **Set-up row 2 (MC, RS facing)**: chain 3 to start (this counts as the row's first DC throughout the rest of the pattern). Then, repeatedly: DC into the next single crochet from Set-up row 1, chain 1, skip the following single crochet - continuing this DC/chain-1/skip pattern across the row until 2 single crochets remain, at which point place a DC in each of those two remaining stitches (the very last one worked into its front-loop-only). Turn.

**This is the app's recommended default foundation method, regardless of row-labeling style.** Rather than chaining two separate foundations (Section 1.4's FA/FB), only **one** chain is made, in MC only. The second color then joins directly into that same foundation - via a slip stitch into the front-loop-only of the first single crochet made on Set-up row 1 - instead of requiring its own separately-counted starting chain. This is simpler to both design for and crochet: one chain length to compute, one chain to make, and the second color's starting point is always "the first stitch of what's already there" rather than a second chain that has to be counted out to land in the right place relative to the first.

Section 1.4's dual-chain (FA/FB) method remains available as a selectable alternative (e.g. for reproducing an existing Interlocking Patches pattern exactly as published), but is not the default. If the FA/FB method is selected, Section 1.4.1's three foundation-start variants (standard/filled/woven) apply; this single-chain method doesn't have an equivalent filled or woven variant in the source material and should be treated as its own distinct fourth option in any foundation-method setting, not a slot within the FA/FB variant list.

---

## 3. Chart Representation: Fabric-Block Method

The source material contains two distinct visual systems that are easy to conflate; Section 3.1 separates them, and Section 3.2 describes the one the chart outputs are actually built from. All of this is based on direct visual inspection of the source PDFs' chart pages, not on their extracted text alone.

### 3.1 Two distinct visual systems in the source material - don't conflate them

- **The Quick-Start Guide's icon strip** (a horizontal legend showing one glyph per stitch token - hollow bar for B, solid bar for F, capped bar for T, tight solid cluster for ff#, slashes for diagonals, chevrons for combined-diagonal stitches) is a **reference legend only**. It's the right visual basis for the app's **palette icons** (Section 5.2's stitch-selection buttons), not for the chart output itself.
- **The actual per-row and full-design charts** use a completely different, richer illustration style, detailed below. Section 8.2's "Full-design chart" and "Per-row chart" outputs should be built against 3.2, not against an icon-strip model.

### 3.2 The fabric-block chart (full-design and per-row charts)

Each chart (whether showing the finished design or a mid-progress row) is rendered as a single **rounded-rectangle "fabric block" card**:

- **Interior fill**: one solid color (whichever color's rows are established at that point), representing the accumulated fabric.
- **Cutout windows**: a grid of small squares removed from the solid fill wherever the design's other color/open mesh shows through - a waffle/brick-with-windows texture. The negative space these cutouts form is what actually draws the visible pattern (letters, shapes) - not a flat checkerboard of alternating colored cells. Cutout squares are noticeably smaller than a full cell (roughly 45-50% of cell width, centered in the cell) - they read as punched holes in a solid surface, not adjacent tiles.
- **In-progress fringe** (per-row chart only, omitted on the full/finished chart): a row of vertical bar "posts" in the contrasting color along the top edge, representing the row currently being added on top of the solid block - visually distinct from the cutout-textured established rows below it, since it hasn't been "absorbed" into the solid block yet.
- **Corner loop icons**: small hollow circles at the block's top-left and top-right corners, each labeled with a direction letter (R or L) indicating which side the working yarn sits on.
- **Turn-direction arrows**: small upward-pointing chevron/arrow icons beneath the block's bottom-left and bottom-right corners, each labeled with a direction letter, indicating which way the work turns.
- **Rounded corners** on the block itself (not sharp edges).
- **Soft drop shadow**: a flat, muted gray ellipse beneath the block (not a blurred box-shadow) - one of very few places in the whole app where a shadow should appear at all, reserved specifically for this fabric-block illustration to give it a "resting on a surface" feel that's deliberately distinct from the rest of the app's flat UI chrome.

A worked reference implementation (exact coordinates for a small test grid) exists as a proof-of-concept SVG built during this project's design discussion - see the "plus sign" worked example in Section 10 for the grid data it renders; the coordinate formulas (cutout size as a fraction of cell size, corner icon radius, shadow ellipse proportions) should be treated as the starting geometry for an actual renderer, not re-derived from scratch or approximated from a text description of the PDF pages.

**This rendering is shared with the live design canvas, not exclusive to the output tabs.** Per Section 4.1, the interactive editor should use this same visual treatment while a design is being built, not a simplified placeholder look that only converges on the chart style once exported. The "Full-design chart" and "Per-row chart" outputs (Section 8.2) are this same renderer, read-only, at a given completion state - the drop shadow, corner icons, and cutout texture should all be present and updating live as the user paints, not added only at generation time.

### 3.3 Wireframe

- A fine, light-gray graph-paper grid fills the background (much finer subdivision than the stitch grid used elsewhere in the app).
- The pattern's outline is a single continuous connect-the-dots path through mesh grid points, straight orthogonal segments (and 45-degree diagonal segments where the design has diagonal stitches) - a thin skeletal path through points, not a filled silhouette and not a thick border hugging cell edges (Section 8.2, item 4 has the full algorithm).
- A rounded-rectangle bounding box in a light accent color surrounds the whole design, with a black dashed rectangle inset just within it, marking the border/pinstripe reference line.

### 3.4 Left/right mirroring

Left-handed and right-handed versions of the same row are mirror images of each other - the renderer should support a single mirror-flip flag rather than authoring two separate versions of any chart.

---

## 4. Grid & Input Data Model

### 4.1 The canonical representation is the token sequence; the canvas should look like the chart

The notation itself (Section 1) is fully unambiguous - every token's meaning is completely determined by the fixed rules (default `ch 1, sk 1` after B/F/T, what `ff#` consumes, what `next`/`prev` resolve to for diagonals). A valid token sequence is therefore a **complete, lossless representation** of a row, with nothing left to infer. This means the token sequence (already what Section 7.2's JSON stores per row) is the **canonical design representation** - the grid is an editing surface over it, not an independent source of truth that then needs translating into tokens.

This reframes what "one grid cell" means: **one cell = one designed stitch (one token), not one physical slot of fabric.** Earlier drafts of this section considered modeling the grid at physical-slot resolution (separately representing each stitch's post and its trailing gap, since `ff#` stitches are physically narrower per-stitch than ordinary F/B stitches, having no gap) - that approach is **rejected**. It's unnecessary complexity solving a problem the canvas was never responsible for: cell *width* doesn't need to be dimensionally accurate to real fabric proportions, uniform cell sizing (one column width per designed stitch, regardless of stitch type) stays simpler and correct.

**Important refinement: uniform cell width does not mean a plain, disconnected schematic look.** The design canvas should be rendered using the same fabric-block visual language as the finished chart (Section 3.2) - cutout-window texture for open-mesh positions, solid fill for established color regions, the same diagonal-stroke rendering (Section 5.2), the same general visual grammar - live, as the design is built, not a separate flat-color grid that only resembles the chart once exported. **A completed design in the editor should look like the finished full-design chart, or very close to it** - not a different representation the user has to mentally translate. Practically, this means the editor and the "Full-design chart" / "Per-row chart" outputs (Section 8.2, items 2-3) should share one rendering implementation: the editor is that same renderer made interactive (tap targets, palette-selection highlighting, diagonal-placement affordances layered on top), not a separate, simpler stand-in for it. Binary pixel-art import (Section 4.4.1) remains a valid *input* path, but once imported, the design is edited and viewed in this same chart-matched rendering like any other design - it doesn't stay in a simplified "pixel art mode" visually.

Practical consequence for FILL specifically: painting a run of cells as FILL doesn't shrink cell width or otherwise try to look physically denser via sizing - it directly authors an `ff{n}` token for that run when painted or drag-painted, and renders with the chart's solid/cutout-free fill texture rather than a plain color swatch, the same way selecting F and tapping a cell directly authors an `F` token and renders as a chart-style front-stitch mark. No intermediate "gap slot" state is needed, and no separate "editor-only" visual style is needed either.

### 4.2 Why binary pixel art isn't sufficient on its own

As established in Section 1, T, ff#, and diagonal stitches aren't expressible as a single front/back color choice per cell:
- T is a third *kind* of stitch, not a color.
- ff# is a mesh-density toggle (solid vs. open), layered on top of color.
- trF/dtrF-family stitches reach between grid positions rather than living inside one.

### 4.3 The indexed-tile model (replaces plain pixel art as the primary input format)

Same grid-of-cells UI as pixel art, but each cell holds one value from a fixed palette instead of one of 2 colors. Per Section 4.1, painting a cell (or dragging across several, for FILL) is really authoring a token directly - the palette below should be read as "which token does this paint" rather than "which color/material does this cell contain":

```
F                 - front stitch (Colour A/B depending on row's active color)
B                 - back stitch
T                 - through-both stitch
FILL              - part of a fill run (ff#); consecutive FILL cells (including
                    drag-painted runs) author a single ff# token directly, not
                    a physically-narrower rendering
DIAG_FWD          - trF-style diagonal, reaching toward next column
DIAG_BACK         - pX-style diagonal, reaching toward previous column
LONG_DIAG_FWD     - dtrF-style long diagonal
LONG_DIAG_BACK    - pp-style long diagonal
KNOT (modifier)   - optional decorative flag on any of the above
POST (modifier)   - optional front-post/back-post flag on any of the above
```

### 4.4 Binary pixel art as a valid restricted subset (F/B-only designs)

If a user's grid only ever uses the F and B values, it *is* plain binary pixel art, and the app should recognize this automatically and additionally offer the book's row-numbering/RS-WS presentation style (Section 2.1) alongside the standard Interlocking Patches-style row labeling - both draw from the same unified vocabulary (Section 1), so this is purely a presentation choice, not a different notation system. No separate input path is needed - the option is simply offered when the palette usage is restricted, detected after the fact rather than chosen up front.

**Important clarification - binary pixel art never produces solid fabric, regardless of padding.** A common misconception: if a user pads the edges of a binary pixel-art image with a uniform solid color, the resulting crocheted region is **not** solid/continuous stitches - it's still open mesh (`dc, ch-1, dc, ch-1...`) throughout, just consistently one color. Every F/B cell always carries its own trailing chain-1 gap (Section 1.3); color uniformity across a region does not change the mesh's underlying open structure. A genuinely solid-looking block (like the thick outline strokes seen in the source pattern charts) requires the **FILL** value (Section 4.3, `ff#`), which is a structurally different, gapless run of stitches - not a color/padding effect. The app's UI and documentation should make this distinction explicit so users don't expect solid padding from binary-only input.

### 4.4.1 Binary pixel art import (first-pass input path)

For the app's first build pass, binary pixel art support is scoped narrowly and concretely:
- **Import**: a plain 2-color image (PNG), where each pixel maps to F or B via a user-defined or default color legend (e.g. black -> F, white -> B). On import, convert directly into the JSON design format (Section 7) - every pixel becomes one `F`/`B` token in the corresponding row string. No intermediate format is needed for this path.
- **Everything beyond binary F/B** (T, FILL, diagonals) is scoped to the **in-app interactive editor** (Section 5) for the first pass, not to external file import. A user designing a complex pattern uses the app's own grid editor rather than authoring a file elsewhere and importing it.
- External authoring formats for complex designs (spreadsheets, indexed-palette pixel art tools, tile-map editors, SVG) were explored as options but are **not** part of the first-pass scope - see Section 9 for that discussion, kept for future reference.

### 4.5 Grid <-> stitch mapping

Per Section 4.1, this is direct rather than a translation step: each cell's palette value **is** the token at that position (Section 4.1/4.3), using the compression and shorthand rules from Sections 1.5 and 3 only when rendering the final written notation (collapsing repeats, etc.) - the underlying per-cell data needs no separate mapping step. Diagonal-type cells additionally carry a resolved direction/target column, captured directly by the two-tap placement gesture (Section 5.2) rather than inferred from cell adjacency after the fact.

---

## 5. Interactive Mobile Web Editor (Serverless)

### 5.1 Feasibility

Moderate-to-high. Architecturally this is a tile-map/pixel-art editor's *interaction model* (tap-to-paint, palette selection, two-point gestures), which is a well-understood UI pattern - but per Section 4.1, its *rendering* needs to match the fabric-block chart style rather than simple flat-color cells, which is the harder part of the build. It's still a strong fit for a serverless app specifically:
- All grid-editing state and live notation/chart generation can run **entirely client-side** (JS, no round-trip per edit).
- Serverless functions are only needed for occasional heavier operations: PDF export, generating a shareable link, or persisting a saved design - each maps cleanly to a single on-demand function call rather than a persistent server process.

### 5.2 Core interaction model

Per Section 4.1/3.2, the canvas itself renders in the fabric-block chart style live - the interaction model below describes the tap/gesture layer on top of that shared rendering, not a separate simplified grid.

- **Single-tap-to-paint** for all non-diagonal palette values (F, B, T, FILL) - tap a cell, tap a palette icon, done. This covers the large majority of stitches in any real pattern. FILL additionally supports drag-painting across multiple cells to build up an `ff#` run in one gesture (Section 4.1).
- **Two-point placement for diagonals** - tap the starting cell, then tap or drag to the target cell (matching how line/diagonal tools work in any standard drawing app). The app should snap to only the target cells that are structurally valid for the diagonal type selected (one mesh ahead/back for trF-family, two ahead or one row down for dtrF-family), rather than allowing freeform placement, since diagonals in this notation only ever reach specific structural distances.
- **Diagonals must render as an actual connecting line once placed, not just two colored cells.** After a diagonal is committed, draw a literal line segment from the start cell's center to the target cell's center, styled like the slash icons from the stitch legend (Section 1.2's trF/dtrF visual language), layered on top of the normal cell grid. Two independently-styled cells with no visible connection between them is not sufficient - the point of the diagonal is the line itself, and the canvas should show it as such. This also previews what the eventual fabric-block chart (Section 3.2) needs to render for the same diagonal, so the two should share rendering logic where practical.
- **Palette as a bottom drawer or slide-out panel** on narrow/mobile viewports, rather than a persistent side panel - keeps the grid itself maximally visible on small screens.

### 5.3 Mobile-specific considerations

- Minimum ~40px tap targets per grid cell; zoom controls (pinch-to-zoom and/or +/- buttons) for grids larger than what fits legibly on a phone screen at that cell size.
- No hover state on touch devices - selected palette icon and active cell need clear persistent visual states (outline/highlight) instead of relying on hover feedback.
- Since diagonal placement is a two-tap gesture, provide a clear "cancel placement" affordance (tap elsewhere, or a visible in-progress indicator) so a user can back out of a diagonal placement without accidentally painting the wrong stitch.

### 5.4 Serverless architecture sketch

- **Client-side**: grid state (the indexed-tile array), live fabric-block chart rendering (Section 3.2), live notation generation (Section 1/2 pipelines), undo/redo history.
- **On-demand functions**: PDF/print export of the finished chart+instructions; optional save/share (persist the grid state under a short ID, e.g. in a lightweight key-value store, and regenerate everything from that state on load rather than storing pre-rendered output).
- No realtime/multiplayer requirement here, so there's no need for persistent server connections, websockets, or session state beyond what a normal static-hosted SPA with occasional function calls already provides.

---

## 6. Algorithms

### 6.1 Tile art -> instructions + chart

1. Walk the grid row by row. For each cell, resolve its palette value (and any diagonal target) into the correct notation token per Section 1.
2. Apply the global rules (Section 1.3) for chain/skip insertion and row-end chaining.
3. Run the compression/shorthand logic (Section 1.5) to collapse repeats and fill-runs into bracketed notation.
4. Detect whether the design is F/B-only (Section 4.4); if so, additionally offer the book-style row-numbering/RS-WS presentation (Section 2.1) alongside the standard output.
5. Generate the fabric-block chart (Section 3.2) alongside the written instructions, one card per progress state, in both left- and right-hand mirror orientations.

### 6.2 Instructions -> tile art + chart

1. Tokenize each row's notation, expanding repeat groups and bracketed position-overrides (Section 1.5).
2. Resolve each token to a palette value and, for diagonals, a target column, walking the row in order (order matters, per Section 1.3's "complete sts in order given" rule, since later diagonals reference `prev`/`next`).
3. Populate the tile grid from the resolved sequence.
4. Validate stitch counts against any `[N msps]`/`[N sts]` annotations present in the source pattern; flag mismatches rather than silently resolving them.

### 6.3 Resizing

Identify the pattern's repeat unit (width and row-block height), add/remove whole repeat units to hit a target stitch count, then re-run the full tile-grid -> instructions pipeline rather than patching text directly, since row numbering, color/side alternation, and compression all depend on exact position.

---

## 7. Data Format & Persistence

### 7.1 Format choice: JSON

The design needs one underlying, text-based, portable format that (a) holds everything the extended tile model requires, (b) round-trips cleanly through localStorage, and (c) is shareable/human-inspectable as plain text. **JSON** is the chosen format: native to JavaScript (no parser dependency), a zero-cost `JSON.stringify`/`JSON.parse` round trip to/from localStorage, and trivially versionable/diffable as plain text.

### 7.2 Design file shape

```json
{
  "formatVersion": "1.0",
  "meta": { "title": "...", "gauge": "...", "notes": "..." },
  "grid": { "width": 20, "height": 20 },
  "colors": { "A": "#...", "B": "#..." },
  "rows": [
    "F B B T ff3 DFn(2,5) ...",
    "..."
  ],
  "settings": { "rowLabeling": "interlocking-patches", "foundation": "single-chain-setup-rows", "foundationStart": "n/a", "border": "no-borders" }
}
```

- **`rows`**: each row is a space-separated string of short tokens (`F`, `B`, `T`, `ff3`, ...) rather than a raw 2D array of opaque codes. This keeps the stored format close to the actual crochet notation itself (compact, and roughly human-readable/hand-editable), matching the spirit of the source system's own compact notation style. **Tokens are stitch types, not colors** - a cell's rendered color is derived from which pass/row it belongs to (Section 2.1's alternation), not stored per cell. See Section 10.2's note on why the worked example's illustrative grid is not in this format.
- **Diagonal targets need an explicit coordinate**, since they aren't implied by simple adjacency - encoded as a token carrying a target position, e.g. `DFn(2,5)` for a forward diagonal placed at row 2, column 5. This disambiguates diagonal placement from the two-tap editor gesture (Section 5.2) once it's committed to the saved format.
- **`settings`** captures the choices from Sections 1.4/1.4.1/2.2 (foundation method and start variant), 1.7 (border style), and 2.1 (row-labeling presentation) so a saved design fully determines its own output without additional user input at generation time. Because border choice affects the body's final rows (Section 1.7's body-instruction hooks), it must be present in `settings` before generation, not applied afterward.

### 7.3 Persistence model

- **localStorage, in real time**: the design phase (Section 8.1) autosaves the current grid state to localStorage on every edit (or lightly debounced), so work persists across reloads/navigation without an explicit "save" action.
- **Generation is a pure function of the saved design state.** Instructions, charts (full and per-row), wireframe, and mockup (Section 8.2) are never separately stored - they're always recomputed on demand from the one saved JSON design. This keeps localStorage small, guarantees outputs never go stale relative to the design, and means "regenerate" is always cheap.
- **Sharing/portability**: since the format is plain JSON, a saved design can be exported as a downloadable file, or persisted server-side under a short ID (Section 5.4) for shareable links - both cases transport the exact same structure that localStorage already holds.

---

## 8. Output Generation

### 8.1 App phases

1. **Design phase**: the user either imports a binary pixel-art image (Section 4.4.1) or builds/edits a design directly in the interactive grid editor (Section 5). The design state autosaves to localStorage in real time (Section 7.3) throughout this phase.
2. **Generation phase**: triggered explicitly by a button click (not automatic/live), producing an in-app HTML view and a downloadable PDF, both derived from the same generation pipeline (Section 6) run against the current saved design state.

### 8.2 Output artifacts

Five distinct pieces, modeled on the structure of the source pattern PDFs:

1. **Written instructions** - plain text/HTML layout of the generated notation (Section 6.1). Straightforward text rendering; no special graphics pipeline needed.
2. **Full-design chart** - a single fabric-block card (Section 3.2) rendered with all rows' contributions absorbed into the solid fill (no in-progress fringe), matching the source PDFs' finished-motif images. Uses the same rendering logic as item 3 below at its final state; no separate rendering system required.
3. **Per-row charts** - the fabric-block card (Section 3.2) rendered at each successive row's progress state, including the in-progress fringe along the top edge for the row currently being added. This is the primitive the full-design chart (item 2) is already built from - its last state, with the fringe omitted.
4. **Wireframe** (matching the graph-paper outline pages at the end of the source PDFs) - **derived automatically**, not hand-drawn, but as a **connect-the-dots path through mesh grid points**, not a boundary contour. The source PDFs' wireframes draw a line running through the actual mesh stitch positions (grid point/dot centers) that make up the design's outline, snapping to straight orthogonal segments between adjacent "on" points - closer to a skeleton/graph line-drawing than a marching-squares trace around the edges of colored regions. The algorithm: place a point at every mesh grid position; for each pair of design-adjacent points that are both part of the outline, draw a straight connecting segment; render the full faint mesh point lattice underneath for reference, and offset a dashed pinstripe line / border rectangle from the connected path by a fixed amount. This should be a fully automatic feature built on the same tile-grid data as everything else, not a separate manual design step.
5. **Mockup** - **solid blocky color rendering only** (not photorealistic/illustrated). Same tile-grid data, rendered with actual chosen yarn colors (Section 7.2's `colors.A`/`colors.B`) as flat color swatches instead of stitch-type icons. Because interlocking crochet shows a genuinely different pattern on each face, generate **both an RS and a WS mockup** (derived via the front/back mirror-and-invert relationship established for the tile grid), rather than just one - matching how the source PDFs themselves show front/back photos side by side per design. A photorealistic mockup (yarn texture, pinned patches, shadows, etc., like a collection's cover artwork) is explicitly **out of scope** - that's illustration/image-generation work layered on top of pattern data, not something derivable from the grid, and is excluded from this pipeline entirely.

### 8.3 PDF assembly

Since the app is serverless, PDF assembly (laying out all five artifacts into pages, matching the source PDFs' overall structure) is a good fit for an on-demand function: render everything to SVG/HTML (client-side or within the function), then flatten to PDF there, rather than requiring a persistent rendering server. This pairs naturally with the "generation is a pure function of saved state" principle (Section 7.3) - the function needs only the JSON design as input to produce the complete PDF.

---

## 9. Alternative/Future External Authoring Formats (not in first-pass scope)

Explored as options for locally authoring complex designs (T/FILL/diagonals) outside the app, kept here for future reference. **None of these are part of the first-pass build** (Section 4.4.1) - the first pass relies on binary pixel-art import plus the in-app interactive editor only.

- **Indexed-palette pixel art tools** (e.g. Piskel, free/browser-based; or Aseprite): a small fixed color palette where each color is assigned a stitch meaning (e.g. black = F, white = B, red = T, gray = FILL, plus colors for diagonal directions). Exported as PNG; the app would read pixel color -> stitch type via a user-defined legend. Lowest-friction option since it's still literally "draw pixel art," just with an extended palette. Limitation: diagonals must be encoded as a color living inside one cell rather than a drawn line, which works but is somewhat unintuitive to author.
- **Spreadsheets** (Excel/Google Sheets): fill each cell with a background color for F/B/T/FILL, and use Excel's native **diagonal cell borders** (a literal corner-to-corner line within a cell, either direction) to encode single-mesh diagonals (trF/pX-style) - a strong structural match. Exportable as `.xlsx` and readable via a library like `openpyxl`, picking up both cell fill color and diagonal border direction programmatically. Possibly the most precise match to the notation's structure of the options considered, and needs no new software.
- **Tiled** (free, open-source tile-map editor, tiled.wf / mapeditor.org): define a small tileset (icons for F/B/T/FILL/each diagonal direction), paint a grid with them, export clean structured JSON (a literal 2D array of tile IDs) - no image-parsing or color-legend guessing needed. Purpose-built for exactly this "grid of typed tiles" problem, at the cost of being a less familiar tool to most users.
- **SVG via Illustrator/Inkscape**: the most flexible (true vector lines, freeform placement), and reportedly what the Interlocking Patches designer actually uses, but also the most work to parse reliably - the app would need to snap arbitrary line endpoints back onto a grid and classify each line's start/end offset as a stitch type. More power than likely needed, more parsing complexity than the other options.

If external authoring import is added in a later pass, the spreadsheet approach is the most promising starting point given the diagonal-border structural match and minimal new tooling required.

---

## 10. Worked Example: 5x5 Plus Sign

A minimal end-to-end trace through the whole pipeline, useful as a smoke test for an implementation. Binary F/B design, 5x5 grid, Colour A (black) background with a Colour B (light gray) plus sign through the center row and center column.

### 10.1 Input grid

```
A A B A A
A A B A A
B B B B B
A A B A A
A A B A A
```

### 10.2 Design intent vs. stored format

The grid above is written in **A/B color terms** to describe the *design intent* (which yarn color shows at each position on the right side) - this is how a user thinks about a binary pixel-art design, and how an imported PNG arrives (Section 4.4.1).

**This is not the stored format.** Per Section 7.2, `rows` holds stitch-type tokens, not colors, and there is one stored row per *pass* (two passes per visual design row, per Section 2.1's alternation) - so this 5-row design intent becomes 10 stored token rows. Converting design intent to stored tokens is exactly the complementary-pass rule described in Section 10.5, and it applies only to F/B-only designs. The stored file for this example therefore looks like:

```json
{
  "formatVersion": "1.0",
  "meta": { "title": "Plus Sign Test", "gauge": "", "notes": "5x5 binary F/B test pattern" },
  "grid": { "width": 5, "height": 5 },
  "colors": { "A": "#000000", "B": "#C0C0C0" },
  "rows": [
    "CH4b B F B DCb",
    "CH3f F B F DCf",
    "CH4b B F B DCb",
    "CH3f F B F DCf",
    "CH4f F F F DCf",
    "CH3b B B B DCb",
    "CH4b B F B DCb",
    "CH3f F B F DCf",
    "CH4b B F B DCb",
    "CH3f F B F DCf"
  ],
  "settings": { "rowLabeling": "book-rs-ws", "foundation": "single-chain-setup-rows", "foundationStart": "n/a", "border": "no-borders" }
}
```

Note `grid.height` is 5 (the design's visual row count, matching what the user painted) while `rows` has 10 entries (one per pass). An implementation must decide and document whether `grid.height` counts design rows or stored passes - this spec treats it as **design rows**, with pass count always being `2 × height`.

### 10.3 Generated instructions

Since this is F/B-only, Section 4.4 offers book-style row labeling. Each physical grid row becomes two passes (CC then MC per Section 2.1), with each pass's F/B values set by the complementary rule described in Section 10.5 below, edges collapsed into the CH3/CH4-f/b start and a closing DCf/DCb:

```
Foundation: Using MC (Colour A), CH 6. [Set-up rows per Section 2.2]

Row 1 (CC-WS): CH4b. B F B. DCb.        [Do not turn]
Row 2 (MC-WS): CH3f. F B F. DCf.        [Turn]
Row 3 (CC-RS): CH4b. B F B. DCb.        [Do not turn]
Row 4 (MC-RS): CH3f. F B F. DCf.        [Turn]
Row 5 (CC-WS): CH4f. F F F. DCf.        [Do not turn]
Row 6 (MC-WS): CH3b. B B B. DCb.        [Turn]
Row 7 (CC-RS): CH4b. B F B. DCb.        [Do not turn]
Row 8 (MC-RS): CH3f. F B F. DCf.        [Turn]
Row 9 (CC-WS): CH4b. B F B. DCb.        [Do not turn]
Row 10 (MC-WS): CH3f. F B F. DCf.       [Turn]
```

Notice rows 1/3/7/9 are identical and rows 2/4/8/10 are identical, since the design is symmetric - only rows 5-6 (the solid CC/MC row through the horizontal arm) are unique. A real implementation's compression pass (Section 1.5) should collapse this repetition rather than spelling out all 10 lines.

### 10.4 Output artifacts

- **RS mockup**: the input grid rendered in the chosen yarn colors - matches Section 10.1 directly.
- **WS mockup**: color-inverted (Colour A and B swapped) and left-right mirrored per the technique's front/back relationship; mirroring is a no-op here since the shape is symmetric on both axes, so the WS mockup is the same plus shape with colors swapped.
- **Wireframe**: per the corrected algorithm in Section 8.2 item 4 - **not** a boundary trace around the colored region, but a connect-the-dots path through mesh point positions. For this design, the two center-line mesh points (the full middle row and full middle column of grid intersections) are connected by two straight segments crossing at the center, drawn over the faint full mesh point lattice - producing a thin plus-shaped skeleton line, not a thick outline hugging cell edges.

### 10.5 Note on the complementary-pass rule

This example's instructions were generated using the simple complementary rule (if the design's target color at a position is X, the X-colored pass gets F there and the other pass gets B) - this is correct and matches Section 2's book logic exactly, but it **only applies to F/B-only designs**. Once T, FILL, or diagonals are in use, Section 4.3's palette gives each pass independent stitch choices rather than deriving them from one target color per cell (matching how the real Interlocking Patches rows work - e.g. a design's A-pass and B-pass notation for the same row are not simple complements of each other once T/fill/diagonals are involved). The spec should be read as: complementary-derivation is the F/B-only special case, not the general rule.

### 10.6 Reference geometry for the fabric-block chart (Section 3.2)

A proof-of-concept renderer was built for this design during the project's design discussion, confirming the approach against the actual PDF pages. Starting coordinates for a `cellSize`-based implementation:

- Card: rounded rect, corner radius ~14% of card width.
- Cutout windows: squares sized ~45-50% of one grid cell's width, centered within the cell, placed at every grid position that isn't part of the established solid-fill color.
- Corner loop icons: hollow circles, radius roughly 20% of cell size, positioned just outside the card's top corners, each with an adjacent single-letter (R/L) label.
- Turn arrows: small chevron/arrow shapes just outside the card's bottom corners, each with an adjacent single-letter (L/R) label.
- Drop shadow: a flat ellipse beneath the card, roughly matching the card's width, low opacity, no blur.
- In-progress fringe (per-row charts only): a row of narrow vertical bars along the top edge of the card, in the row's active contrasting color, one per column.

This should be treated as a starting point to implement precisely in code, not re-derived by prompting a visual-generation tool from a text description of the source PDF - see Section 11's note on build workflow.

---

## 11. Open Assumptions to Flag to the User

1. **Book-style row-numbering presentation (Section 2.1) is only offered for F/B-only designs** - since that presentation convention originates from patterns that never used T, ff#, or diagonals, it's offered conditionally (Section 4.4), not applied by substituting or dropping those stitches from a more complex design.
2. **Diagonal placement UI constrains targets to structurally valid cells** (Section 5.2) rather than allowing arbitrary freeform diagonals - this matches what the notation can actually express, but is a real constraint on design freedom worth surfacing in the UI copy.
3. **Foundation style defaults to the book's single-chain method** (Section 2.2) rather than the Interlocking Patches dual FA/FB chains (Section 1.4), since joining the second color directly into the back stitches/FLO of the first foundation is simpler to design for and crochet than tracking two separately-counted starting chains. The dual-chain method remains selectable when reproducing a published Interlocking Patches pattern exactly. Foundation style is independent of row-numbering presentation - a user can pair either foundation with either presentation style.
4. **Border style is selected before the body's final rows are generated, not purely afterward** (Section 1.7) - six named options, each of which specifies its own body-instruction hooks that change how the last two body rows end. The generator therefore needs the border choice up front, even though the border rounds themselves are emitted last.
5. **Binary pixel art never implies solid fill, regardless of padding** (Section 4.4) - solid-looking regions require the FILL value explicitly; this should be clearly communicated in the UI so imported binary designs behave as users expect.
6. **First-pass input scope is binary import + in-app editing only** (Section 4.4.1) - external complex-design file formats (Section 9) are documented for future reference but are not built in the first pass.
7. **Mockup output is solid flat color only, not photorealistic** (Section 8.2, item 5) - illustrated/textured/photoreal renders are explicitly excluded from the generation pipeline.
8. **Generation is always a pure function of the saved JSON design state** (Section 7.3) - no output artifact is ever independently persisted or hand-edited; regenerating from the same design always produces the same result.
9. **Recommended build workflow splits shell from renderers, but the design canvas IS a renderer, not shell chrome.** App navigation/tabs/settings/palette layout (Sections 5.3, 8.1) is well suited to prompt-based UI generation (e.g. Claude Design) - it's conventional, compositional UI. The fabric-block canvas rendering itself (Section 3.2/4.1, used live in the editor and for the Full-design/Per-row chart outputs) and the wireframe/mockup outputs (Section 8.2) are not - they need exact, repeatable geometry and should be built as real rendering code (e.g. in Claude Code), using Section 3.2's reference geometry as a starting point, not approximated through iterative prompting against a description or reference image of the source PDFs. When using a UI-generation tool for the surrounding shell, have it build clearly-marked placeholder containers (correct size/position/surrounding chrome, including the design canvas area itself) rather than attempting the illustrated rendering, so the real shared renderer can be dropped into both the editor and the output tabs without reworking the surrounding layout.
10. **Cell width stays uniform/non-proportional; cell rendering matches the chart.** (Section 4.1) The canvas does not attempt to render FILL runs as narrower than F/B stitches or otherwise reflect real fabric proportions in cell *sizing*. A slot-resolution grid model (separately representing each stitch's post and trailing gap) was considered and explicitly rejected in favor of one-cell-per-token. This is distinct from visual *styling*: cell rendering (cutout-window texture, solid fill, diagonal strokes, corner icons, drop shadow) should match the fabric-block chart as closely as practical, live during editing - see Section 4.1's refinement. Uniform sizing and chart-matched styling are not in tension; the first is about layout math, the second is about what each cell looks like once sized.

---

## 12. Known Discrepancies: Claude Design Shell vs. This Spec

A shell build (`Interlock.dc.html` + `nocturne.css` + its README) exists and is intended as the starting point for real implementation. It was built at an earlier point in this spec's evolution and predates several later decisions, plus it independently invented some concrete details (exact numbers, names) the spec had only described structurally. None of these are implementation bugs in the shell - it's a design reference, not the generator - but each needs reconciling before or during the real build, and none should be assumed correct just because they're already built.

1. **Canvas renders flat colors; spec now requires fabric-block styling, shared with the chart outputs.** The shell's README states plainly: "Cell fill = flat Colour A or Colour B (no gradients/shadows) depending on stitch type," with Full chart/Per-row chart/Wireframe/Mockup as separate low-fidelity placeholders. This was correct against the spec version current when the shell was built. Per Section 4.1 (added afterward), the canvas needs to render in the same fabric-block style as the chart outputs, live, as one shared renderer - not a flat grid that only starts looking like a chart once exported. **This is the biggest gap and the main reason the shell can't be treated as visually final for the Design screen**, despite the README calling that screen "high-fidelity."

2. **The palette's "Combined" stitch (chevron icon) has no corresponding value in Section 4.3's formal tile-model palette.** The shell's 11-item palette includes a "Combined" type alongside the 8 core values + 2 modifiers that Section 4.3 documents. This traces back to Section 1.2's `pXn`-style stitches (a regular stitch with a diagonal reaching backward *and* forward at once) - a real notation feature - but Section 4.3 never assigned it an explicit palette value or said whether it should be its own paintable type versus something composed by placing two diagonals that share an endpoint at one cell. Resolve this explicitly before building the real palette/generator - either add a formal `COMBINED` value to Section 4.3, or specify the compositional rule, but don't let the shell's presence of a "Combined" button silently stand in for a decision that was never actually made.

3. **The shell's 2 "long diagonal" buttons don't cover the 4 long-diagonal forms in the notation.** Section 1.2 documents four distinct long-diagonal stitches with different reach geometry: `Xnn→` (2 mesh positions ahead, same row), `Xnn↓` (1 column over + 1 row down), `pp←X` (2 mesh back), and `pp↓X` (1 column back + 1 row down). The shell collapses these into "Long diagonal / Long diagonal-back" - 2 buttons, not 4 - which can't disambiguate the same-row-reach forms from the row-down forms. This needs either 4 distinct palette entries or a secondary control (e.g. a direction toggle after selecting "long diagonal") - decide which before implementation, since the README's 2-button model under-specifies what the real generator needs to know.

4. **Border style names in the shell don't match the spec's actual border techniques.** The shell's settings list reads "No border, Single crochet edge, Pinstripe border, Picot edge, Blanket border, Fringe edge." Section 1.7's actual six are No borders, Classic Badge Border, Quick Mesh Border, Easy Floating Border, Blanket Border, and Mesh Blanket Border - different names, different techniques, and no "Picot edge" or "Fringe edge" exists in the source material at all. This happened because the Claude Design prompt only gave illustrative example names ("e.g. 'no border,' 'pinstripe,' 'blanket border'"), not the real list - **the shell's border names and descriptions must be replaced with Section 1.7's actual six, not treated as a naming variant to reconcile.** Note also that Section 1.7's body-instruction hooks make border choice affect the last two body rows, so this is a functional dependency in the generator, not just a settings-menu label swap.

5. **Foundation method setting is under-scoped: 2 options shown, 4 documented.** The shell offers "Standard chain / Foundation sc" as a segmented pair. Section 2.2 (book's single-chain method, the default) plus Section 1.4.1's three FA/FB start variants (standard/filled/woven) make 4 total selectable foundation approaches. Expand this control accordingly rather than treating the shell's 2-option version as complete.

6. **Diagonal placement's stated grid-offset coordinates are unverified.** The README gives concrete deltas - `(−1,+1)` for diagonal-forward, `(−1,−1)` for diagonal-back, `(−2,±2)` for the long variants - to make the two-tap gesture concrete for the mockup. The spec never formally pinned down how canvas rows correspond to notation rows (i.e. whether one canvas row = one physical crochet row, one A-pass or B-pass sub-row, or something else), so these specific numbers were necessarily invented for interaction purposes, not derived from Section 1.2's actual `next`/`prev`/2-rows-below semantics. Treat them as a placeholder convention to validate (or replace) once the canvas-to-notation row mapping is properly defined during real generator implementation - don't assume they're geometrically correct as-is.

7. **Resize UI is a simple edge-grow stepper; the spec's resize algorithm is repeat-unit-based.** The shell's width/height steppers grow or shrink from a chosen edge - reasonable for freeform, non-repeating pixel art, but it doesn't implement Section 6.3's actual approach (identify the pattern's repeat unit, add/remove whole repeat blocks to preserve the motif rather than cropping into it). For designs built from a repeating unit, a naive edge-crop will cut through the pattern rather than resizing it correctly. Decide whether the real app needs repeat-aware resizing as a distinct mode, or whether freeform edge-growth is an accepted limitation for v1 - either way, this should be a stated decision, not something inherited silently from the shell.

8. **Nocturne's shadow convention will need a deliberate, documented exception.** `nocturne.css`'s own comments scope elevation shadows to dialogs only ("Elevation — derived from the ground... `.elev-sm/md/lg`," used on `.card`/`.dialog` in the shell). Section 3.2 requires a soft drop shadow specifically beneath the fabric-block chart card - a second, deliberate exception to Nocturne's stated convention, not a Nocturne violation to "fix" by removing it. Flag this explicitly in implementation notes so a developer following Nocturne's documented pattern literally doesn't strip the chart's shadow out as an inconsistency.


