import type { CreateProductInput, Product } from '@ecommerce/types';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';
import { createProduct, fetchProducts, toggleProductActive } from '../lib/api';

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

export function useCreateProduct(): UseMutationResult<
  Product,
  Error,
  CreateProductInput
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

interface ToggleActiveVariables {
  id: string;
  isActive: boolean;
}

export function useToggleActive(): UseMutationResult<
  Product,
  Error,
  ToggleActiveVariables
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: ToggleActiveVariables) =>
      toggleProductActive(id, isActive),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}
