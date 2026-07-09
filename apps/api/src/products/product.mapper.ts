import type { Product } from '@ecommerce/types';
import { ProductEntity } from './product.entity';

export function toProduct(entity: ProductEntity): Product {
  return {
    id: entity.id,
    name: entity.name,
    imageUrl: entity.imageUrl,
    price: Number(entity.price),
    isActive: entity.isActive,
    attributes: (entity.attributes ?? []).map((attr) => ({
      name: attr.name,
      value: attr.value,
    })),
    createdAt: entity.createdAt.toISOString(),
    updatedAt: entity.updatedAt.toISOString(),
  };
}
