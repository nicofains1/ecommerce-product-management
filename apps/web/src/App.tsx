import { useState } from 'react';
import { TabButton } from './components/ui/TabButton';
import { ManagementView } from './views/ManagementView';
import { ShowView } from './views/ShowView';

type Tab = 'store' | 'manage';

const TABS: { id: Tab; label: string }[] = [
  { id: 'store', label: 'Store' },
  { id: 'manage', label: 'Manage' },
];

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>('store');

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display text-2xl font-semibold tracking-tight text-primary">
              Removery
            </span>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Laser tattoo removal
            </span>
          </div>
          <nav
            aria-label="Primary"
            className="flex gap-1 self-start rounded-full bg-muted p-1 sm:self-auto"
          >
            {TABS.map((tab) => (
              <TabButton
                key={tab.id}
                label={tab.label}
                isActive={tab.id === activeTab}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        {activeTab === 'store' ? <ShowView /> : <ManagementView />}
      </main>
    </div>
  );
}
