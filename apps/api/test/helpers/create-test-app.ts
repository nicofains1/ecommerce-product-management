import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AttributeEntity } from '../../src/products/attribute.entity';
import { ProductEntity } from '../../src/products/product.entity';
import { ProductsModule } from '../../src/products/products.module';

export interface TestApp {
  app: INestApplication;
  dataSource: DataSource;
}

export async function createTestApp(): Promise<TestApp> {
  const moduleRef = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5433),
        username: 'postgres',
        password: 'postgres',
        database: 'ecommerce_test',
        entities: [ProductEntity, AttributeEntity],
        synchronize: true,
        dropSchema: true,
      }),
      ProductsModule,
    ],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.setGlobalPrefix('api');
  await app.init();

  return { app, dataSource: moduleRef.get(DataSource) };
}

export async function resetDatabase(dataSource: DataSource): Promise<void> {
  await dataSource.query('TRUNCATE TABLE "attributes", "products" CASCADE');
}
