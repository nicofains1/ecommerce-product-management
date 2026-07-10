import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn.js';

export interface TextFieldProps extends ComponentPropsWithoutRef<'input'> {
  label?: ReactNode;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, id, className, ...inputProps },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

  const inputClasses = cn(
    'rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground',
    'placeholder:text-muted-foreground/60',
    'focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40',
    error && 'border-error focus:border-error focus:ring-error/30',
    className,
  );

  return (
    <div className="flex flex-col gap-1.5">
      {!!label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        {...inputProps}
        id={inputId}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={inputClasses}
      />
      {error && (
        <p id={errorId} className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
});
