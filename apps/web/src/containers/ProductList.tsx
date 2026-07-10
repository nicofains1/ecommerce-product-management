import { useMemo, useState } from 'react';
import { ProductGrid } from '../components/ui/ProductGrid';
import { QueryState } from '../components/ui/QueryState';
import { Switch } from '../components/ui/Switch';
import { useProducts } from '../hooks/useProducts';

export function ProductList() {
  const [activeOnly, setActiveOnly] = useState(true);
  const { data: products, isPending, isError, error } = useProducts(!activeOnly);

  const activeProducts = useMemo(
    () => (products ?? []).filter((product) => product.isActive),
    [products],
  );
  const inactiveProducts = useMemo(
    () => (products ?? []).filter((product) => !product.isActive),
    [products],
  );

  return (
    <section aria-label="Store" className="flex flex-col gap-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
          Your fresh start, one session at a time.
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Gentle, proven laser treatments to fade what no longer fits. Browse what we offer and book
          when you feel ready.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
        <h2 className="font-display text-xl text-foreground">Treatments</h2>
        <div className="flex items-center gap-2.5">
          <span className="text-sm text-muted-foreground">Show hidden</span>
          <Switch
            checked={!activeOnly}
            onChange={(showAll) => setActiveOnly(!showAll)}
            label="Show hidden treatments"
          />
        </div>
      </div>

      <QueryState
        isPending={isPending}
        isError={isError}
        error={error}
        loadingLabel="Loading treatments…"
      >
        {activeOnly ? (
          <ProductGrid products={products ?? []} emptyMessage="No treatments available yet." />
        ) : (
          <div className="flex flex-col gap-8">
            <ProductGrid products={activeProducts} emptyMessage="No active treatments yet." />
            {inactiveProducts.length > 0 && (
              <div>
                <h3 className="mb-4 font-display text-lg text-muted-foreground">Hidden</h3>
                <ProductGrid products={inactiveProducts} />
              </div>
            )}
          </div>
        )}
      </QueryState>
    </section>
  );
}
