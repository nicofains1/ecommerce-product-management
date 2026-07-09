import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { loadDatabaseConfig } from './config/database.config';
import { AttributeEntity } from './products/attribute.entity';
import { ProductEntity } from './products/product.entity';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const config = loadDatabaseConfig();
        return {
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          entities: [ProductEntity, AttributeEntity],
          synchronize: false,
        };
      },
    }),
    ProductsModule,
  ],
})
export class AppModule {}
