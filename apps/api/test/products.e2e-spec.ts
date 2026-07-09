import { INestApplication } from '@nestjs/common';
import type { Product } from '@ecommerce/types';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { createTestApp, resetDatabase } from './helpers/create-test-app';

describe('Products (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await resetDatabase(dataSource);
  });

  const validProduct = {
    name: 'Laser Removal - Small',
    imageUrl: 'https://example.com/laser.png',
    price: 99.5,
    attributes: [
      { name: 'area', value: 'wrist' },
      { name: 'sessions', value: '3' },
    ],
  };

  it('creates a product and returns 201 with the persisted data', async () => {
    const res = await request(app.getHttpServer()).post('/api/products').send(validProduct);

    expect(res.status).toBe(201);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.name).toBe(validProduct.name);
    expect(res.body.data.price).toBe(99.5);
    expect(res.body.data.isActive).toBe(true);
    expect(res.body.data.attributes).toHaveLength(2);
  });

  it('rejects a product with more than 10 attributes with 400', async () => {
    const tooMany = {
      ...validProduct,
      attributes: Array.from({ length: 11 }, (_, i) => ({ name: `a${i}`, value: `${i}` })),
    };

    const res = await request(app.getHttpServer()).post('/api/products').send(tooMany);

    expect(res.status).toBe(400);
  });

  it('lists only active products', async () => {
    const created = await request(app.getHttpServer()).post('/api/products').send(validProduct);
    const id = (created.body.data as Product).id;

    await request(app.getHttpServer())
      .patch(`/api/products/${id}/active`)
      .send({ isActive: false });

    const active = await request(app.getHttpServer()).get('/api/products');
    expect(active.body.data).toHaveLength(0);

    const all = await request(app.getHttpServer()).get('/api/products?includeInactive=true');
    expect(all.body.data).toHaveLength(1);
  });

  it('deactivates and re-activates a product', async () => {
    const created = await request(app.getHttpServer()).post('/api/products').send(validProduct);
    const id = (created.body.data as Product).id;

    const deactivated = await request(app.getHttpServer())
      .patch(`/api/products/${id}/active`)
      .send({ isActive: false });
    expect(deactivated.body.data.isActive).toBe(false);

    const reactivated = await request(app.getHttpServer())
      .patch(`/api/products/${id}/active`)
      .send({ isActive: true });
    expect(reactivated.body.data.isActive).toBe(true);

    const active = await request(app.getHttpServer()).get('/api/products');
    expect(active.body.data).toHaveLength(1);
  });

  it('returns 404 when toggling a non-existent product', async () => {
    const res = await request(app.getHttpServer())
      .patch('/api/products/00000000-0000-0000-0000-000000000000/active')
      .send({ isActive: false });

    expect(res.status).toBe(404);
  });
});
