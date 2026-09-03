import { OUTPUT_TABS, type OutputTab } from '../routing/route';
import { BackIcon } from './icons';
import { Placeholder } from './Placeholder';

const TAB_LABELS: Record<OutputTab, string> = {
  instructions: 'Instructions',
  'full-chart': 'Full chart',
  'per-row-chart': 'Per-row chart',
  wireframe: 'Wireframe',
  mockup: 'Mockup',
};

// Spec §8.2's five output artifacts. Each gets its real implementation in a
// later milestone; here each is a reserved container of the right shape.
const TAB_PLACEHOLDER_SHAPE: Record<OutputTab, 'square' | 'row'> = {
  instructions: 'square',
  'full-chart': 'square',
  'per-row-chart': 'row',
  wireframe: 'square',
  mockup: 'square',
};

interface OutputScreenProps {
  title: string;
  activeTab: OutputTab;
  onSelectTab: (tab: OutputTab) => void;
  onBack: () => void;
}

export function OutputScreen({ title, activeTab, onSelectTab, onBack }: OutputScreenProps) {
  return (
    <>
      {/* Header actions are screen-scoped, not tab-scoped: Download PDF stays
          visible whichever tab is open (design handoff, Output screen). */}
      <header className="app-header">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          <BackIcon size={15} />
          Back to design
        </button>
        <div className="app-header-title">
          <h1>{title}</h1>
        </div>
        <button type="button" className="btn btn-primary" disabled>
          Download PDF
        </button>
      </header>

      <div className="output-tabs" role="tablist" aria-label="Output artifacts">
        {OUTPUT_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            id={`output-tab-${tab}`}
            aria-selected={tab === activeTab}
            aria-controls={`output-panel-${tab}`}
            onClick={() => onSelectTab(tab)}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      <div
        className="app-scroll"
        role="tabpanel"
        id={`output-panel-${activeTab}`}
        aria-labelledby={`output-tab-${activeTab}`}
      >
        <div className="stack-narrow">
          <Placeholder label={TAB_LABELS[activeTab]} shape={TAB_PLACEHOLDER_SHAPE[activeTab]} />
        </div>
      </div>
    </>
  );
}
