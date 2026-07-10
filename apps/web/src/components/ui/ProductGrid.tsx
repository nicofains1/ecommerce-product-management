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
      <div className="rounded-[--radius-card] border border-dashed border-border bg-surface/60 px-6 py-16 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} actions={renderActions?.(product)} />
        </li>
      ))}
    </ul>
  );
}
