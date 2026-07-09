import type { Product } from '@ecommerce/types';
import type { ReactNode } from 'react';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  renderActions?: (product: Product) => ReactNode;
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  renderActions,
  emptyMessage = 'No products to show.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-10 text-center text-sm text-neutral-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} actions={renderActions?.(product)} />
        </li>
      ))}
    </ul>
  );
}
