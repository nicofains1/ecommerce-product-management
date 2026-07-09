import { useMemo, useState } from 'react';
import { ProductGrid } from '../components/ui/ProductGrid';
import { QueryState } from '../components/ui/QueryState';
import { useProducts } from '../hooks/useProducts';

export function ProductList() {
  const [activeOnly, setActiveOnly] = useState(true);
  const { data: products, isPending, isError, error } = useProducts(!activeOnly);

  const activeProducts = useMemo(() => (products ?? []).filter((product) => product.isActive), [products]);
  const inactiveProducts = useMemo(
    () => (products ?? []).filter((product) => !product.isActive),
    [products],
  );

  const toggle = (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
      <input
        type="checkbox"
        checked={activeOnly}
        onChange={(event) => setActiveOnly(event.target.checked)}
        className="h-4 w-4 rounded border-border text-success focus:ring-ring"
      />
      Active only
    </label>
  );

  const header = (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-base font-semibold text-foreground">Store</h2>
      {toggle}
    </div>
  );

  return (
    <section aria-label="Store">
      {header}
      <QueryState isPending={isPending} isError={isError} error={error} loadingLabel="Loading products…">
        {activeOnly ? (
          <ProductGrid products={products ?? []} emptyMessage="No products available yet." />
        ) : (
          <>
            <ProductGrid products={activeProducts} emptyMessage="No active products available yet." />
            {inactiveProducts.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Inactive</h3>
                <ProductGrid products={inactiveProducts} />
              </div>
            )}
          </>
        )}
      </QueryState>
    </section>
  );
}
