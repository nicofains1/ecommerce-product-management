import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/cn.js';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground font-semibold hover:bg-primary/90',
  secondary:
    'border border-border bg-muted text-foreground font-medium hover:bg-muted/80',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', type = 'button', className, ...buttonProps },
  ref,
) {
  const classes = cn(
    'rounded-md px-4 py-2 text-sm transition-colors',
    'disabled:cursor-not-allowed disabled:opacity-50',
    variantClasses[variant],
    className,
  );

  return <button {...buttonProps} ref={ref} type={type} className={classes} />;
});
