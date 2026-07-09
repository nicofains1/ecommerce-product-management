export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}

export type ApiResult<T> = { data: T } | { error: ApiError };
