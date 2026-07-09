import type { ReactNode } from 'react';

interface QueryStateProps {
  isPending: boolean;
  isError: boolean;
  error?: Error | null;
  children: ReactNode;
  loadingLabel?: string;
}

export function QueryState({
  isPending,
  isError,
  error,
  children,
  loadingLabel = 'Loading…',
}: QueryStateProps) {
  if (isPending) {
    return <p className="text-sm text-muted-foreground">{loadingLabel}</p>;
  }

  if (isError) {
    return (
      <p role="alert" className="text-sm text-error">
        Could not load. {error?.message}
      </p>
    );
  }

  return <>{children}</>;
}
