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
  const { name, imageUrl, price, isActive, attributes } = product;

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md ${
        isActive ? '' : 'opacity-60'
      }`}
      aria-disabled={!isActive}
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

        {attributes.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {attributes.map((attribute) => (
              <li
                key={`${attribute.name}:${attribute.value}`}
                className="rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700"
              >
                <span className="font-medium text-neutral-500">
                  {attribute.name}:
                </span>{' '}
                {attribute.value}
              </li>
            ))}
          </ul>
        )}

        {actions && <div className="mt-auto pt-2">{actions}</div>}
      </div>
    </article>
  );
}
