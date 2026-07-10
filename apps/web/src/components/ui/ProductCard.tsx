import type { Attribute, Product } from '@ecommerce/types';
import type { ReactNode } from 'react';
import { SessionFade } from './SessionFade';

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface ProductCardProps {
  product: Product;
  actions?: ReactNode;
}

function splitSessions(attributes: Attribute[]): {
  sessions: number | null;
  rest: Attribute[];
} {
  const sessionsAttr = attributes.find((attr) => attr.name.toLowerCase() === 'sessions');
  const parsed = sessionsAttr ? Number(sessionsAttr.value) : NaN;
  return {
    sessions: Number.isFinite(parsed) ? parsed : null,
    rest: attributes.filter((attr) => attr.name.toLowerCase() !== 'sessions'),
  };
}

export function ProductCard({ product, actions }: ProductCardProps) {
  const { name, imageUrl, price, isActive, attributes } = product;
  const { sessions, rest } = splitSessions(attributes);
  const priceLabel = price === 0 ? 'Free' : priceFormatter.format(price);

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-[--radius-card] border border-border bg-surface shadow-[0_1px_2px_rgba(80,50,30,0.04),0_8px_24px_-12px_rgba(120,70,40,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(80,50,30,0.05),0_16px_36px_-14px_rgba(120,70,40,0.2)] ${
        isActive ? '' : 'opacity-70'
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {!isActive && (
          <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
            Hidden
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-snug text-foreground" title={name}>
            {name}
          </h3>
          <p className="shrink-0 font-display text-lg font-semibold text-primary">{priceLabel}</p>
        </div>

        {sessions !== null && <SessionFade count={sessions} />}

        {rest.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {rest.map((attribute) => (
              <li
                key={`${attribute.name}:${attribute.value}`}
                className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
              >
                <span className="font-medium capitalize">{attribute.name}</span> {attribute.value}
              </li>
            ))}
          </ul>
        )}

        {actions && <div className="mt-auto pt-2">{actions}</div>}
      </div>
    </article>
  );
}
