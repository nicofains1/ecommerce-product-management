import type { ReactNode } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { useProducts } from '../hooks/useProducts';

function StatusPanel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-10 text-center text-sm text-neutral-500">
      {children}
    </div>
  );
}

export function ShowView() {
  const { data: products, isPending, isError, error, refetch } = useProducts();

  return (
    <section className="flex flex-col gap-6">
      <header>
        <h2 className="text-xl font-semibold text-neutral-900">Products</h2>
        <p className="text-sm text-neutral-500">Browse the active catalog.</p>
      </header>

      {isPending ? (
        <StatusPanel>Loading products…</StatusPanel>
      ) : isError ? (
        <StatusPanel>
          <p className="text-red-600">Could not load products: {error.message}</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-3 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            Try again
          </button>
        </StatusPanel>
      ) : (
        <ProductGrid products={products} emptyMessage="No products available yet." />
      )}
    </section>
  );
}
