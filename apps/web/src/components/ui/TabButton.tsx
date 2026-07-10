import { cn } from '../../lib/cn.js';

export interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({ label, isActive, onClick }: TabButtonProps) {
  const classes = cn(
    'rounded-full px-5 py-1.5 text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
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
