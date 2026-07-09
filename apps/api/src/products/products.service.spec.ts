import { NotFoundException } from '@nestjs/common';
import type { Repository } from 'typeorm';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProductEntity } from './product.entity';
import { ProductsService } from './products.service';

function buildEntity(overrides: Partial<ProductEntity> = {}): ProductEntity {
  const entity = new ProductEntity();
  entity.id = '11111111-1111-1111-1111-111111111111';
  entity.name = 'Laser Removal';
  entity.imageUrl = 'https://example.com/a.png';
  entity.price = '99.00';
  entity.isActive = true;
  entity.attributes = [];
  entity.createdAt = new Date('2024-01-01T00:00:00.000Z');
  entity.updatedAt = new Date('2024-01-01T00:00:00.000Z');
  return Object.assign(entity, overrides);
}

function createRepoMock() {
  return {
    find: vi.fn(),
    findOne: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
  };
}

describe('ProductsService', () => {
  let repo: ReturnType<typeof createRepoMock>;
  let service: ProductsService;

  beforeEach(() => {
    repo = createRepoMock();
    service = new ProductsService(repo as unknown as Repository<ProductEntity>);
  });

  describe('findActive', () => {
    it('queries only active products ordered by creation date', async () => {
      repo.find.mockResolvedValue([buildEntity()]);
      const result = await service.findActive();
      expect(repo.find).toHaveBeenCalledWith({
        where: { isActive: true },
        order: { createdAt: 'DESC' },
      });
      expect(result).toHaveLength(1);
    });
  });

  describe('setActive', () => {
    it('throws NotFound when the product does not exist', async () => {
      repo.findOne.mockResolvedValue(null);
      await expect(service.setActive('missing-id', false)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('does not write when the product is already in the requested state', async () => {
      repo.findOne.mockResolvedValue(buildEntity({ isActive: true }));
      const result = await service.setActive('11111111-1111-1111-1111-111111111111', true);
      expect(repo.save).not.toHaveBeenCalled();
      expect(result.isActive).toBe(true);
    });

    it('persists the new state when it changes', async () => {
      const entity = buildEntity({ isActive: true });
      repo.findOne.mockResolvedValue(entity);
      repo.save.mockImplementation(async (e: ProductEntity) => e);
      const result = await service.setActive('11111111-1111-1111-1111-111111111111', false);
      expect(repo.save).toHaveBeenCalledOnce();
      expect(result.isActive).toBe(false);
    });
  });

  describe('create', () => {
    it('builds the entity from the input and returns the mapped product', async () => {
      repo.create.mockImplementation((data: Partial<ProductEntity>) => Object.assign(buildEntity(), data));
      repo.save.mockImplementation(async (e: ProductEntity) => e);
      const result = await service.create({
        name: 'Full Sleeve',
        imageUrl: 'https://example.com/sleeve.png',
        price: 1499,
        attributes: [{ name: 'area', value: 'forearm' }],
      });
      expect(repo.save).toHaveBeenCalledOnce();
      expect(result.name).toBe('Full Sleeve');
      expect(result.price).toBe(1499);
    });
  });
});
