import { zodResolver } from '@hookform/resolvers/zod';
import {
  createProductSchema,
  type Attribute,
  type CreateProductInput,
} from '@ecommerce/types';
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
    <form onSubmit={submit} noValidate className="flex flex-col gap-6 bg-surface">
      <TextField
        id="product-name"
        type="text"
        label="Name"
        error={errors.name?.message}
        {...register('name')}
      />

      <TextField
        id="product-image-url"
        type="url"
        label="Image URL"
        error={errors.imageUrl?.message}
        {...register('imageUrl')}
      />

      <TextField
        id="product-price"
        type="number"
        step="0.01"
        min="0"
        label="Price"
        error={errors.price?.message}
        {...register('price', { valueAsNumber: true })}
      />

      <AttributeFields control={control} register={register} errors={errors} />

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Create product'}
      </Button>
    </form>
  );
}
