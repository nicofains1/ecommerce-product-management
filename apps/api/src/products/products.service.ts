import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { CreateProductInput, Product } from '@ecommerce/types';
import { Repository } from 'typeorm';
import { AttributeEntity } from './attribute.entity';
import { ProductEntity } from './product.entity';
import { toProduct } from './product.mapper';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly products: Repository<ProductEntity>,
  ) {}

  async findActive(): Promise<Product[]> {
    const rows = await this.products.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
    return rows.map(toProduct);
  }

  async findAll(): Promise<Product[]> {
    const rows = await this.products.find({ order: { createdAt: 'DESC' } });
    return rows.map(toProduct);
  }

  async create(input: CreateProductInput): Promise<Product> {
    const product = this.products.create({
      name: input.name,
      imageUrl: input.imageUrl,
      price: input.price.toString(),
      attributes: input.attributes.map((attr) => {
        const attribute = new AttributeEntity();
        attribute.name = attr.name;
        attribute.value = attr.value;
        return attribute;
      }),
    });
    const saved = await this.products.save(product);
    return toProduct(saved);
  }

  async setActive(id: string, isActive: boolean): Promise<Product> {
    const product = await this.products.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    if (product.isActive === isActive) {
      return toProduct(product);
    }

    product.isActive = isActive;
    const saved = await this.products.save(product);
    return toProduct(saved);
  }
}
