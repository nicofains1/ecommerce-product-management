import type { CreateProductInput, Product, ToggleActiveInput } from '@ecommerce/types';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query';
import { createProduct, fetchProducts, toggleProductActive } from '../services/products.service';

const productKeys = {
  all: ['products'] as const,
  list: (includeInactive: boolean) => [...productKeys.all, { includeInactive }] as const,
};

export function useProducts(includeInactive = false): UseQueryResult<Product[]> {
  return useQuery({
    queryKey: productKeys.list(includeInactive),
    queryFn: () => fetchProducts(includeInactive),
  });
}

export function useCreateProduct(): UseMutationResult<Product, Error, CreateProductInput> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}

type ToggleActiveVariables = ToggleActiveInput & { id: string };

interface ToggleContext {
  previous: [readonly unknown[], Product[] | undefined][];
}

export function useToggleActive(): UseMutationResult<
  Product,
  Error,
  ToggleActiveVariables,
  ToggleContext
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: ToggleActiveVariables) => toggleProductActive(id, isActive),
    onMutate: async ({ id, isActive }) => {
      await queryClient.cancelQueries({ queryKey: productKeys.all });
      const previous = queryClient.getQueriesData<Product[]>({ queryKey: productKeys.all });
      queryClient.setQueriesData<Product[]>({ queryKey: productKeys.all }, (list) =>
        list?.map((product) => (product.id === id ? { ...product, isActive } : product)),
      );
      return { previous };
    },
    onError: (_error, _variables, context) => {
      context?.previous.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
}
