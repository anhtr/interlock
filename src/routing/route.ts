/**
 * Hash routing for the app shell.
 *
 * The app is a static site on GitHub Pages (ADR 0002), so there is no server to
 * rewrite deep links — the route lives entirely in the URL fragment.
 *
 * Grammar: `#/<screen>[/<detail>]`. Today the only screens are `design` and
 * `output`, and the only detail segment is the output tab. M10's share links
 * take a third screen under the same grammar (`#/s/1.<payload>`, ADR 0004).
 *
 * Nothing else is encoded in the fragment. An unrecognized screen (or empty fragment) falls back
 * to the design screen rather than rendering blank. On the output screen, an unrecognized tab
 * falls back to the default tab (Instructions), so truncated or not-yet-implemented links still land somewhere usable.
 */

export const SCREENS = ['design', 'output'] as const;
export type Screen = (typeof SCREENS)[number];

export const OUTPUT_TABS = [
  'instructions',
  'full-chart',
  'per-row-chart',
  'wireframe',
  'mockup',
] as const;
export type OutputTab = (typeof OUTPUT_TABS)[number];

export const DEFAULT_SCREEN: Screen = 'design';
export const DEFAULT_OUTPUT_TAB: OutputTab = 'instructions';

export interface Route {
  screen: Screen;
  /** Only meaningful on the output screen; defaults to `instructions`. */
  outputTab: OutputTab;
}

export const DEFAULT_ROUTE: Route = {
  screen: DEFAULT_SCREEN,
  outputTab: DEFAULT_OUTPUT_TAB,
};

function isScreen(value: string): value is Screen {
  return (SCREENS as readonly string[]).includes(value);
}

function isOutputTab(value: string): value is OutputTab {
  return (OUTPUT_TABS as readonly string[]).includes(value);
}

/** Parse a location fragment into a route. Never throws. */
export function parseRoute(hash: string): Route {
  const path = hash.startsWith('#') ? hash.slice(1) : hash;
  const segments = path.split('/').filter((segment) => segment.length > 0);
  const [screenSegment, detailSegment] = segments;

  if (screenSegment === undefined || !isScreen(screenSegment)) {
    return DEFAULT_ROUTE;
  }

  const outputTab =
    screenSegment === 'output' && detailSegment !== undefined && isOutputTab(detailSegment)
      ? detailSegment
      : DEFAULT_OUTPUT_TAB;

  return { screen: screenSegment, outputTab };
}

/** Serialize a route back to a fragment, including the leading `#`. */
export function formatRoute(route: Route): string {
  if (route.screen === 'output' && route.outputTab !== DEFAULT_OUTPUT_TAB) {
    return `#/output/${route.outputTab}`;
  }
  return `#/${route.screen}`;
}
