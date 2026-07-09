import { useMemo, useState } from 'react';
import { ProductGrid } from '../components/ui/ProductGrid';
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

  if (isPending) {
    return (
      <section aria-label="Store">
        {header}
        <p className="text-sm text-muted-foreground">Loading products…</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section aria-label="Store">
        {header}
        <p role="alert" className="text-sm text-error">
          Could not load products. {error.message}
        </p>
      </section>
    );
  }

  if (activeOnly) {
    return (
      <section aria-label="Store">
        {header}
        <ProductGrid products={products} emptyMessage="No products available yet." />
      </section>
    );
  }

  return (
    <section aria-label="Store">
      {header}
      <ProductGrid products={activeProducts} emptyMessage="No active products available yet." />
      {inactiveProducts.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Inactive</h3>
          <ProductGrid products={inactiveProducts} />
        </div>
      )}
    </section>
  );
}
