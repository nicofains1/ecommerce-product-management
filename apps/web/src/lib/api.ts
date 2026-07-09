import type { Product } from '@ecommerce/types';

const BASE_URL: string =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

interface Envelope<T> {
  data: T;
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(response.statusText || 'Request failed');
  }

  const body = (await response.json()) as Envelope<T>;
  return body.data;
}

export function fetchProducts(includeInactive = false): Promise<Product[]> {
  const query = includeInactive ? '?includeInactive=true' : '';
  return request<Product[]>(`/products${query}`);
}
