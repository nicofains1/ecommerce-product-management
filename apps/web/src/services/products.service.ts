import type { CreateProductInput, Product } from '@ecommerce/types';

import { request } from './api.service';

export function fetchProducts(includeInactive = false): Promise<Product[]> {
  const query = includeInactive ? '?includeInactive=true' : '';
  return request<Product[]>(`/products${query}`);
}

export function createProduct(input: CreateProductInput): Promise<Product> {
  return request<Product>('/products', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function toggleProductActive(id: string, isActive: boolean): Promise<Product> {
  return request<Product>(`/products/${id}/active`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  });
}
