# 0004 — Share links carry the design JSON in the URL (lz-string)

- **Status**: Accepted
- **Date**: 2026-09-02
- **Decider**: atran (planning session, question round 1)

## Context

The spec (§5.4, §7.3) proposed persisting a design server-side under a short ID for shareable links. ADR 0002 removes the backend, and the design JSON is already small and portable (§7.1).

## Decision

Compress the same design JSON that localStorage holds and encode it into the URL hash. Route shape `#/s/1.<payload>`, where the leading `1.` is a codec-version byte allowing a future codec swap; the JSON's own `formatVersion` travels inside the payload. Codec: lz-string `compressToEncodedURIComponent` — synchronous, roughly 4 KB, URI-safe output, and effective on the repetitive token text. JSON file export/import ships alongside as the companion path for oversized designs.

## Alternatives considered

- `CompressionStream` + base64url — compresses marginally better, but asynchronous and requires manual base64url plumbing for little gain at these sizes.
- Short URLs with a key-value store — requires the backend that ADR 0002 excludes.

## Consequences

- Sharing works with no infrastructure; a link is fully self-contained.
- Link length grows with design size: a 30×30 design compresses to roughly 1–1.5 KB. Past 8,000 characters the app warns and offers file export instead.
- Links cannot be revoked or updated after sharing, since no server holds the state.
