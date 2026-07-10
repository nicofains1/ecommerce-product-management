import { cn } from '../../lib/cn';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

export function Switch({ checked, onChange, label, disabled }: SwitchProps) {
  const trackClasses = cn(
    'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    checked ? 'bg-success' : 'bg-muted',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
  );

  const knobClasses = cn(
    'inline-block h-5 w-5 transform rounded-full bg-surface shadow-sm transition-transform duration-200',
    checked ? 'translate-x-5' : 'translate-x-0.5',
  );

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={trackClasses}
    >
      <span className={knobClasses} />
    </button>
  );
}
