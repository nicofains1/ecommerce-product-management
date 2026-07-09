import { cn } from '../../lib/cn.js';

export interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({ label, isActive, onClick }: TabButtonProps) {
  const classes = cn(
    'flex-1 rounded-md px-4 py-1.5 text-sm font-medium transition-colors sm:flex-none',
    isActive
      ? 'bg-surface text-foreground shadow-sm'
      : 'text-muted-foreground hover:text-foreground',
  );

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={classes}
    >
      {label}
    </button>
  );
}
