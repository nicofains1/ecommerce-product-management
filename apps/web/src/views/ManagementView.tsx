import type { CreateProductInput, Product } from '@ecommerce/types';
import { ProductForm } from '../components/ProductForm';
import { ProductGrid } from '../components/ProductGrid';
import {
  useCreateProduct,
  useProducts,
  useToggleActive,
} from '../hooks/useProducts';

export function ManagementView() {
  const products = useProducts(true);
  const createProduct = useCreateProduct();
  const toggleActive = useToggleActive();

  const handleCreate = (input: CreateProductInput) => {
    createProduct.mutate(input);
  };

  const renderActions = (product: Product) => (
    <ToggleActiveButton
      product={product}
      onToggle={() =>
        toggleActive.mutate({ id: product.id, isActive: !product.isActive })
      }
      isPending={
        toggleActive.isPending && toggleActive.variables?.id === product.id
      }
    />
  );

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            Add a product
          </h2>
          <p className="text-sm text-neutral-500">
            New products show up in the catalog right away.
          </p>
        </div>

        <ProductForm
          onSubmit={handleCreate}
          isSubmitting={createProduct.isPending}
        />

        {createProduct.isError && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            Couldn&apos;t create the product. {createProduct.error.message}
          </p>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-neutral-900">All products</h2>

        {products.isLoading && <ProductGridSkeleton />}

        {products.isError && (
          <div
            role="alert"
            className="flex flex-col items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-6"
          >
            <p className="text-sm text-red-700">
              Couldn&apos;t load products. {products.error.message}
            </p>
            <button
              type="button"
              onClick={() => void products.refetch()}
              className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
            >
              Try again
            </button>
          </div>
        )}

        {products.isSuccess && (
          <ProductGrid
            products={products.data}
            renderActions={renderActions}
            emptyMessage="No products yet. Create the first one above."
          />
        )}
      </section>
    </div>
  );
}

interface ToggleActiveButtonProps {
  product: Product;
  onToggle: () => void;
  isPending: boolean;
}

function ToggleActiveButton({
  product,
  onToggle,
  isPending,
}: ToggleActiveButtonProps) {
  const label = product.isActive ? 'Deactivate' : 'Activate';
  const styles = product.isActive
    ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
    : 'border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800';

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={isPending}
      className={`w-full rounded-lg border px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60 ${styles}`}
    >
      {isPending ? 'Saving…' : label}
    </button>
  );
}

function ProductGridSkeleton() {
  return (
    <ul
      aria-hidden
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <li
          key={index}
          className="h-72 animate-pulse rounded-xl border border-neutral-200 bg-neutral-100"
        />
      ))}
    </ul>
  );
}
