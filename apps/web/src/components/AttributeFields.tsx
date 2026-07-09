import { MAX_ATTRIBUTES } from '@ecommerce/types';
import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';
import type { ProductFormValues } from './ProductForm.js';
import { Button } from './ui/Button.js';
import { TextField } from './ui/TextField.js';

export interface AttributeFieldsProps {
  control: Control<ProductFormValues>;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}

export function AttributeFields({ control, register, errors }: AttributeFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributes',
  });

  const canAddAttribute = fields.length < MAX_ATTRIBUTES;

  return (
    <fieldset className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <legend className="text-sm font-medium text-foreground">Attributes</legend>
        <span className="text-xs text-muted-foreground">
          {fields.length} / {MAX_ATTRIBUTES}
        </span>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground">No attributes added yet.</p>
      )}

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-2 sm:flex-row sm:items-start">
            <div className="flex-1">
              <TextField
                type="text"
                placeholder="Name"
                aria-label={`Attribute ${index + 1} name`}
                error={errors.attributes?.[index]?.name?.message}
                {...register(`attributes.${index}.name`)}
              />
            </div>

            <div className="flex-1">
              <TextField
                type="text"
                placeholder="Value"
                aria-label={`Attribute ${index + 1} value`}
                error={errors.attributes?.[index]?.value?.message}
                {...register(`attributes.${index}.value`)}
              />
            </div>

            <Button variant="secondary" onClick={() => remove(index)} className="shrink-0">
              Remove
            </Button>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={() => append({ name: '', value: '' })}
        disabled={!canAddAttribute}
        className="self-start"
      >
        Add attribute
      </Button>
    </fieldset>
  );
}
