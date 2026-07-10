import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/cn.js';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground font-semibold hover:bg-primary-hover shadow-sm',
  secondary: 'border border-border bg-surface text-foreground font-medium hover:bg-muted',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', type = 'button', className, ...buttonProps },
  ref,
) {
  const classes = cn(
    'rounded-full px-5 py-2.5 text-sm transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variantClasses[variant],
    className,
  );

  return <button {...buttonProps} ref={ref} type={type} className={classes} />;
});
