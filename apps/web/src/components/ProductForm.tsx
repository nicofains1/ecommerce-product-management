import type { CreateProductInput } from '@ecommerce/types';
import { createProductSchema } from '@ecommerce/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface ProductFormProps {
  onSubmit: (input: CreateProductInput) => void;
  isSubmitting?: boolean;
}

const inputClasses =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 disabled:cursor-not-allowed disabled:bg-neutral-100';

export function ProductForm({
  onSubmit,
  isSubmitting = false,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: { name: '', imageUrl: '', price: 0, attributes: [] },
  });

  const submit = handleSubmit((input) => {
    onSubmit(input);
    reset();
  });

  return (
    <form
      onSubmit={submit}
      noValidate
      className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="product-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="product-name"
          type="text"
          className={inputClasses}
          disabled={isSubmitting}
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="product-image-url" className="text-sm font-medium">
          Image URL
        </label>
        <input
          id="product-image-url"
          type="url"
          className={inputClasses}
          disabled={isSubmitting}
          {...register('imageUrl')}
        />
        {errors.imageUrl && (
          <p className="text-xs text-red-600">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="product-price" className="text-sm font-medium">
          Price
        </label>
        <input
          id="product-price"
          type="number"
          min={0}
          step="0.01"
          className={inputClasses}
          disabled={isSubmitting}
          {...register('price', { valueAsNumber: true })}
        />
        {errors.price && (
          <p className="text-xs text-red-600">{errors.price.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Creating…' : 'Create product'}
      </button>
    </form>
  );
}
