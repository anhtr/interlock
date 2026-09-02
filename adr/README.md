# Architecture Decision Records

Decisions for the Interlock app, made during build planning (epic: [#16](https://github.com/anhtr/interlock/issues/16)). Each record is immutable once accepted; supersede with a new record rather than editing. The authoritative technical spec is `ref/interlocking_crochet_app_spec-2.md`.

| ID | Date | Status | Decision |
|----|------|--------|----------|
| [0001](0001-react-typescript-vite.md) | 2026-09-02 | Accepted | Build with React + TypeScript + Vite |
| [0002](0002-github-pages-static-hosting.md) | 2026-09-02 | Accepted | Host on GitHub Pages, fully static, no backend |
| [0003](0003-ci-cd-from-first-milestone.md) | 2026-09-02 | Accepted | CI and Pages deployment from the first milestone |
| [0004](0004-url-encoded-share-links.md) | 2026-09-02 | Accepted | Share links carry the design JSON in the URL (lz-string) |
| [0005](0005-client-side-pdf-export.md) | 2026-09-02 | Accepted | Client-side PDF export via jsPDF + svg2pdf.js |
| [0006](0006-pass-resolution-editing.md) | 2026-09-02 | Accepted | Editor grid operates at pass resolution |
| [0007](0007-dedicated-combined-palette-value.md) | 2026-09-02 | Accepted | Dedicated COMBINED palette value for pXn stitches |
| [0008](0008-target-cell-diagonal-disambiguation.md) | 2026-09-02 | Accepted | One palette button per diagonal reach; target cell disambiguates the form |
| [0009](0009-resize-edge-grow-then-repeat-unit.md) | 2026-09-02 | Accepted | Edge grow/shrink resize first; repeat-unit resize later |
| [0010](0010-faithful-to-design-shell-nocturne.md) | 2026-09-02 | Accepted | Follow the design shell faithfully; reuse nocturne.css |
| [0011](0011-pure-engine-ui-boundary.md) | 2026-09-02 | Accepted | Pure TypeScript engine, hard boundary from UI |
