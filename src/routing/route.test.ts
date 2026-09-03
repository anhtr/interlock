import { describe, expect, it } from 'vitest';
import { DEFAULT_ROUTE, formatRoute, parseRoute } from './route';

describe('parseRoute', () => {
  it('reads the two screen routes', () => {
    expect(parseRoute('#/design').screen).toBe('design');
    expect(parseRoute('#/output').screen).toBe('output');
  });

  it('tolerates a missing leading hash and trailing slashes', () => {
    expect(parseRoute('/output').screen).toBe('output');
    expect(parseRoute('#/output/').screen).toBe('output');
  });

  it('falls back to the default route for anything unrecognized', () => {
    expect(parseRoute('')).toEqual(DEFAULT_ROUTE);
    expect(parseRoute('#/nope')).toEqual(DEFAULT_ROUTE);
    expect(parseRoute('#')).toEqual(DEFAULT_ROUTE);
  });

  it('reads an output tab and defaults unknown ones to instructions', () => {
    expect(parseRoute('#/output/wireframe').outputTab).toBe('wireframe');
    expect(parseRoute('#/output/not-a-tab').outputTab).toBe('instructions');
    expect(parseRoute('#/output').outputTab).toBe('instructions');
  });

  // M10 adds `#/s/1.<payload>` under the same grammar (ADR 0004). Until then an
  // unimplemented share link must land on the design screen, not a blank page.
  it('falls back for a share link whose screen does not exist yet', () => {
    expect(parseRoute('#/s/1.N4IgLg')).toEqual(DEFAULT_ROUTE);
  });
});

describe('formatRoute', () => {
  it('round-trips every route it can produce', () => {
    for (const hash of ['#/design', '#/output', '#/output/mockup', '#/output/full-chart']) {
      expect(formatRoute(parseRoute(hash))).toBe(hash);
    }
  });

  it('omits the default output tab from the path', () => {
    expect(formatRoute({ screen: 'output', outputTab: 'instructions' })).toBe('#/output');
  });

  // The output tab is meaningless on the design screen and must not leak into
  // its fragment.
  it('ignores the output tab on the design screen', () => {
    expect(formatRoute({ screen: 'design', outputTab: 'mockup' })).toBe('#/design');
  });
});
