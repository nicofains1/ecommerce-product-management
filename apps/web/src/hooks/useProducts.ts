import type { Product } from '@ecommerce/types';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { fetchProducts } from '../lib/api';

const productKeys = {
  all: ['products'] as const,
  list: (includeInactive: boolean) =>
    [...productKeys.all, { includeInactive }] as const,
};

export function useProducts(includeInactive = false): UseQueryResult<Product[]> {
  return useQuery({
    queryKey: productKeys.list(includeInactive),
    queryFn: () => fetchProducts(includeInactive),
  });
}
