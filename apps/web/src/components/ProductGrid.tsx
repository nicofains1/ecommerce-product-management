import type { Product } from '@ecommerce/types';

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
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
        <li
          key={product.id}
          className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
        >
          <div className="aspect-square w-full overflow-hidden bg-neutral-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1 p-4">
            <h3 className="font-medium text-neutral-900" title={product.name}>
              {product.name}
            </h3>
            <p className="text-lg font-semibold text-neutral-900">
              {priceFormatter.format(product.price)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
