import { zodResolver } from '@hookform/resolvers/zod';
import { createProductSchema, type Attribute, type CreateProductInput } from '@ecommerce/types';
import { useForm } from 'react-hook-form';
import { AttributeFields } from './AttributeFields.js';
import { Button } from './ui/Button.js';
import { TextField } from './ui/TextField.js';

export type ProductFormValues = Omit<CreateProductInput, 'attributes'> & {
  attributes?: Attribute[];
};

const emptyValues: ProductFormValues = {
  name: '',
  imageUrl: '',
  price: 0,
  attributes: [],
};

export interface ProductFormProps {
  onSubmit: (input: CreateProductInput) => Promise<void> | void;
  isSubmitting?: boolean;
}

export function ProductForm({ onSubmit, isSubmitting = false }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues, unknown, CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: emptyValues,
  });

  const submit = handleSubmit(async (values) => {
    await Promise.resolve(onSubmit(values)).then(() => reset(emptyValues));
  });

  return (
    <form
      onSubmit={submit}
      noValidate
      className="flex flex-col gap-5 rounded-[--radius-card] border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(80,50,30,0.04),0_10px_30px_-16px_rgba(120,70,40,0.16)] sm:p-7"
    >
      <TextField
        id="product-name"
        type="text"
        label="Treatment name"
        placeholder="Laser Removal - Small Area"
        error={errors.name?.message}
        {...register('name')}
      />

      <TextField
        id="product-image-url"
        type="url"
        label="Image URL"
        placeholder="https://…"
        error={errors.imageUrl?.message}
        {...register('imageUrl')}
      />

      <TextField
        id="product-price"
        type="number"
        step="0.01"
        min="0"
        label="Price (USD)"
        error={errors.price?.message}
        {...register('price', { valueAsNumber: true })}
      />

      <AttributeFields control={control} register={register} errors={errors} />

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Adding…' : 'Add treatment'}
      </Button>
    </form>
  );
}
