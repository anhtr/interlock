import { useEffect } from 'react';
import { useRoute } from './routing/useRoute';
import { AppSidebar, AppTabBar } from './ui/AppNav';
import { DesignScreen } from './ui/DesignScreen';
import { OutputScreen } from './ui/OutputScreen';

// Until M1 gives the design model a real title field, the shell shows a fixed
// one so the header has its true dimensions.
const PATTERN_TITLE = 'Untitled pattern';

export function App() {
  const { route, goToScreen, goToOutputTab } = useRoute();

  // Land a bare URL on a canonical fragment, so the address bar always shows a
  // link that can be copied and reopened.
  useEffect(() => {
    if (window.location.hash === '') {
      window.location.replace(`${window.location.pathname}${window.location.search}#/design`);
    }
  }, []);

  return (
    <div className="app-root">
      <AppSidebar current={route.screen} onNavigate={goToScreen} />
      <div className="app-main">
        {route.screen === 'design' ? (
          <DesignScreen title={PATTERN_TITLE} />
        ) : (
          <OutputScreen
            title={PATTERN_TITLE}
            activeTab={route.outputTab}
            onSelectTab={goToOutputTab}
            onBack={() => goToScreen('design')}
          />
        )}
      </div>
      <AppTabBar current={route.screen} onNavigate={goToScreen} />
    </div>
  );
}
