import type { Product } from '@ecommerce/types';
import type { ReactNode } from 'react';

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface ProductCardProps {
  product: Product;
  actions?: ReactNode;
}

export function ProductCard({ product, actions }: ProductCardProps) {
  const { name, imageUrl, price, isActive } = product;

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm ${
        isActive ? '' : 'opacity-60'
      }`}
    >
      <div className="aspect-square w-full overflow-hidden bg-neutral-100">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 font-medium text-neutral-900" title={name}>
            {name}
          </h3>
          {!isActive && (
            <span className="shrink-0 rounded-full bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-600">
              Inactive
            </span>
          )}
        </div>

        <p className="text-lg font-semibold text-neutral-900">
          {priceFormatter.format(price)}
        </p>

        {actions && <div className="mt-auto pt-2">{actions}</div>}
      </div>
    </article>
  );
}
