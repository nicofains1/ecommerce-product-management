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
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
            eCommerce Product Management
          </h1>
          <nav aria-label="Primary" className="flex gap-1 rounded-lg bg-muted p-1">
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

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        {activeTab === 'store' ? <ShowView /> : <ManagementView />}
      </main>
    </div>
  );
}
