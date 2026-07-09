import { describe, expect, it } from 'vitest';
import { AttributeEntity } from './attribute.entity';
import { ProductEntity } from './product.entity';
import { toProduct } from './product.mapper';

function buildEntity(overrides: Partial<ProductEntity> = {}): ProductEntity {
  const entity = new ProductEntity();
  entity.id = '11111111-1111-1111-1111-111111111111';
  entity.name = 'Laser Removal';
  entity.imageUrl = 'https://example.com/a.png';
  entity.price = '99.90';
  entity.isActive = true;
  entity.attributes = [];
  entity.createdAt = new Date('2024-01-01T00:00:00.000Z');
  entity.updatedAt = new Date('2024-01-02T00:00:00.000Z');
  return Object.assign(entity, overrides);
}

describe('toProduct', () => {
  it('converts the numeric price string into a number', () => {
    const result = toProduct(buildEntity({ price: '1499.00' }));
    expect(result.price).toBe(1499);
    expect(typeof result.price).toBe('number');
  });

  it('serializes dates to ISO strings', () => {
    const result = toProduct(buildEntity());
    expect(result.createdAt).toBe('2024-01-01T00:00:00.000Z');
    expect(result.updatedAt).toBe('2024-01-02T00:00:00.000Z');
  });

  it('maps attributes to name/value pairs only', () => {
    const attr = new AttributeEntity();
    attr.id = 'attr-id';
    attr.name = 'area';
    attr.value = 'wrist';
    attr.productId = 'product-id';
    const result = toProduct(buildEntity({ attributes: [attr] }));
    expect(result.attributes).toEqual([{ name: 'area', value: 'wrist' }]);
  });

  it('returns an empty attributes array when the relation is missing', () => {
    const entity = buildEntity();
    entity.attributes = undefined as unknown as AttributeEntity[];
    const result = toProduct(entity);
    expect(result.attributes).toEqual([]);
  });
});
