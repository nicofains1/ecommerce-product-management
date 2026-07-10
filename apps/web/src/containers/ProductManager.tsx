import type { Product } from '@ecommerce/types';
import { ProductForm } from '../components/ProductForm';
import { ProductGrid } from '../components/ui/ProductGrid';
import { QueryState } from '../components/ui/QueryState';
import { Switch } from '../components/ui/Switch';
import { useCreateProduct, useProducts, useToggleActive } from '../hooks/useProducts';

export function ProductManager() {
  const { data: products, isPending, isError, error } = useProducts(true);
  const createProduct = useCreateProduct();
  const toggleActive = useToggleActive();

  const renderActions = (product: Product) => {
    const isToggling = toggleActive.isPending && toggleActive.variables?.id === product.id;

    return (
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-muted-foreground">
          {product.isActive ? 'Visible in store' : 'Hidden from store'}
        </span>
        <Switch
          checked={product.isActive}
          onChange={(isActive) => toggleActive.mutate({ id: product.id, isActive })}
          disabled={isToggling}
          label={`Toggle ${product.name}`}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
      <section aria-label="Add treatment" className="lg:sticky lg:top-24 lg:w-[26rem] lg:shrink-0">
        <h2 className="mb-1 font-display text-2xl text-foreground">Add a treatment</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          New treatments show up in the store right away.
        </p>
        <ProductForm
          onSubmit={async (input) => {
            await createProduct.mutateAsync(input);
          }}
          isSubmitting={createProduct.isPending}
        />
      </section>

      <section aria-label="Manage treatments" className="min-w-0 flex-1">
        <h2 className="mb-5 font-display text-2xl text-foreground">Your treatments</h2>
        <QueryState
          isPending={isPending}
          isError={isError}
          error={error}
          loadingLabel="Loading treatments…"
        >
          <ProductGrid
            products={products ?? []}
            renderActions={renderActions}
            emptyMessage="No treatments yet. Add your first one to get started."
          />
        </QueryState>
      </section>
    </div>
  );
}
