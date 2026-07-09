import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { loadDatabaseConfig } from '../config/database.config';
import { AttributeEntity } from '../products/attribute.entity';
import { ProductEntity } from '../products/product.entity';

const config = loadDatabaseConfig();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  entities: [ProductEntity, AttributeEntity],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
  logging: false,
});
