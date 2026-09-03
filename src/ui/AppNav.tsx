import type { Screen } from '../routing/route';
import { DocumentIcon, GridIcon } from './icons';

const ITEMS: ReadonlyArray<{ screen: Screen; label: string }> = [
  { screen: 'design', label: 'Design' },
  { screen: 'output', label: 'Output' },
];

function NavIcon({ screen, size }: { screen: Screen; size: number }) {
  return screen === 'design' ? <GridIcon size={size} /> : <DocumentIcon size={size} />;
}

interface NavProps {
  current: Screen;
  onNavigate: (screen: Screen) => void;
}

/**
 * The two navigation surfaces are rendered together and shown one at a time by
 * the 900 px media query in `app.css`, rather than swapped by a JS media-query
 * listener. CSS alone means no flash of the wrong chrome on first paint and no
 * resize-driven re-render.
 */
export function AppSidebar({ current, onNavigate }: NavProps) {
  return (
    <nav className="app-sidebar" aria-label="Primary">
      <div className="app-brand" aria-hidden="true">
        I
      </div>
      {ITEMS.map(({ screen, label }) => (
        <button
          key={screen}
          type="button"
          onClick={() => onNavigate(screen)}
          className={current === screen ? 'app-nav-current' : undefined}
          aria-current={current === screen ? 'page' : undefined}
        >
          <NavIcon screen={screen} size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export function AppTabBar({ current, onNavigate }: NavProps) {
  return (
    <nav className="app-tabbar" aria-label="Primary">
      {ITEMS.map(({ screen, label }) => (
        <button
          key={screen}
          type="button"
          onClick={() => onNavigate(screen)}
          className={current === screen ? 'app-nav-current' : undefined}
          aria-current={current === screen ? 'page' : undefined}
        >
          <NavIcon screen={screen} size={19} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
