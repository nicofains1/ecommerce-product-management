import type {
  ApiError as ApiErrorBody,
  CreateProductInput,
  Product,
} from '@ecommerce/types';

const BASE_URL: string =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

export class ApiError extends Error {
  readonly statusCode: number;
  readonly errors?: Record<string, string[]>;

  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof (value as { message: unknown }).message === 'string'
  );
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.body !== undefined
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...init?.headers,
    },
  });

  const body: unknown = await response.json().catch(() => undefined);

  if (!response.ok) {
    if (isApiErrorBody(body)) {
      throw new ApiError(response.status, body.message, body.errors);
    }
    throw new ApiError(response.status, response.statusText || 'Request failed');
  }

  return (body as { data: T }).data;
}

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

export function toggleProductActive(
  id: string,
  isActive: boolean,
): Promise<Product> {
  return request<Product>(`/products/${id}/active`, {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  });
}
