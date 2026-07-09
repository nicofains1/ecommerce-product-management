import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  createProductSchema,
  toggleActiveSchema,
  type CreateProductInput,
  type Product,
  type ToggleActiveInput,
} from '@ecommerce/types';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query('includeInactive') includeInactive?: string): Promise<{ data: Product[] }> {
    const data =
      includeInactive === 'true'
        ? await this.productsService.findAll()
        : await this.productsService.findActive();
    return { data };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ZodValidationPipe(createProductSchema)) body: CreateProductInput,
  ): Promise<{ data: Product }> {
    const data = await this.productsService.create(body);
    return { data };
  }

  @Patch(':id/active')
  async setActive(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(toggleActiveSchema)) body: ToggleActiveInput,
  ): Promise<{ data: Product }> {
    const data = await this.productsService.setActive(id, body.isActive);
    return { data };
  }
}
