import { useCallback, useSyncExternalStore } from 'react';
import { DEFAULT_ROUTE, formatRoute, parseRoute } from './route';
import type { OutputTab, Route, Screen } from './route';

function subscribe(onChange: () => void): () => void {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
}

// useSyncExternalStore compares snapshots by identity, so parsing on every read
// would loop forever. Cache the parsed route and only rebuild it when the raw
// fragment actually changes.
let cachedHash: string | null = null;
let cachedRoute: Route = DEFAULT_ROUTE;

function getSnapshot(): Route {
  const hash = window.location.hash;
  if (hash !== cachedHash) {
    cachedHash = hash;
    cachedRoute = parseRoute(hash);
  }
  return cachedRoute;
}

function getServerSnapshot(): Route {
  return DEFAULT_ROUTE;
}

export interface RouteApi {
  route: Route;
  goToScreen: (screen: Screen) => void;
  goToOutputTab: (tab: OutputTab) => void;
}

export function useRoute(): RouteApi {
  const route = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const navigate = useCallback((next: Route) => {
    window.location.hash = formatRoute(next);
  }, []);

  const goToScreen = useCallback(
    (screen: Screen) => navigate({ ...route, screen }),
    [navigate, route],
  );

  const goToOutputTab = useCallback(
    (outputTab: OutputTab) => navigate({ screen: 'output', outputTab }),
    [navigate],
  );

  return { route, goToScreen, goToOutputTab };
}
