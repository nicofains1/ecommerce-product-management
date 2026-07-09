import type { Product } from '@ecommerce/types';
import { ProductForm } from '../components/ProductForm';
import { ProductGrid } from '../components/ui/ProductGrid';
import { useCreateProduct, useProducts, useToggleActive } from '../hooks/useProducts';
import { cn } from '../lib/cn';

export function ProductManager() {
  const { data: products, isPending, isError, error } = useProducts(true);
  const createProduct = useCreateProduct();
  const toggleActive = useToggleActive();

  const renderActions = (product: Product) => {
    const actionClasses = cn(
      'rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60',
      product.isActive
        ? 'bg-muted text-foreground hover:opacity-90'
        : 'bg-success text-success-foreground hover:opacity-90',
    );

    return (
      <button
        type="button"
        onClick={() => toggleActive.mutate({ id: product.id, isActive: !product.isActive })}
        disabled={toggleActive.isPending}
        className={actionClasses}
      >
        {product.isActive ? 'Deactivate' : 'Activate'}
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <section aria-label="Create product">
        <h2 className="mb-3 text-base font-semibold text-foreground">New product</h2>
        <ProductForm
          onSubmit={async (input) => {
            await createProduct.mutateAsync(input);
          }}
          isSubmitting={createProduct.isPending}
        />
      </section>

      <section aria-label="Manage products">
        <h2 className="mb-3 text-base font-semibold text-foreground">Products</h2>
        {isPending ? (
          <p className="text-sm text-muted-foreground">Loading products…</p>
        ) : isError ? (
          <p role="alert" className="text-sm text-error">
            Could not load products. {error.message}
          </p>
        ) : (
          <ProductGrid
            products={products}
            renderActions={renderActions}
            emptyMessage="No products yet. Create one above."
          />
        )}
      </section>
    </div>
  );
}
