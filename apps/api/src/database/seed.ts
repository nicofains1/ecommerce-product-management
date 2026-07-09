import 'reflect-metadata';
import { AttributeEntity } from '../products/attribute.entity';
import { ProductEntity } from '../products/product.entity';
import { AppDataSource } from './data-source';

interface SeedProduct {
  name: string;
  imageUrl: string;
  price: string;
  isActive: boolean;
  attributes: Array<{ name: string; value: string }>;
}

const seedProducts: SeedProduct[] = [
  {
    name: 'Laser Tattoo Removal - Small Area',
    imageUrl: 'https://picsum.photos/seed/small-area/600/400',
    price: '99.00',
    isActive: true,
    attributes: [
      { name: 'area', value: 'wrist' },
      { name: 'size', value: 'small' },
      { name: 'sessions', value: '1' },
      { name: 'laser', value: 'PicoSure' },
    ],
  },
  {
    name: 'Full Sleeve Removal Package',
    imageUrl: 'https://picsum.photos/seed/full-sleeve/600/400',
    price: '1499.00',
    isActive: true,
    attributes: [
      { name: 'area', value: 'forearm' },
      { name: 'size', value: 'large' },
      { name: 'sessions', value: '8' },
      { name: 'ink', value: 'multicolor' },
    ],
  },
  {
    name: 'Consultation & Patch Test',
    imageUrl: 'https://picsum.photos/seed/consultation/600/400',
    price: '0.00',
    isActive: true,
    attributes: [
      { name: 'duration', value: '30min' },
      { name: 'type', value: 'in-person' },
    ],
  },
  {
    name: 'Legacy Cream Treatment',
    imageUrl: 'https://picsum.photos/seed/legacy-cream/600/400',
    price: '45.00',
    isActive: false,
    attributes: [{ name: 'type', value: 'topical' }],
  },
];

async function seed(): Promise<void> {
  await AppDataSource.initialize();
  const productRepo = AppDataSource.getRepository(ProductEntity);

  const existing = await productRepo.count();
  if (existing > 0) {
    console.log(`Skipping seed: ${existing} products already exist.`);
    await AppDataSource.destroy();
    return;
  }

  for (const item of seedProducts) {
    const product = productRepo.create({
      name: item.name,
      imageUrl: item.imageUrl,
      price: item.price,
      isActive: item.isActive,
      attributes: item.attributes.map((attr) => {
        const attribute = new AttributeEntity();
        attribute.name = attr.name;
        attribute.value = attr.value;
        return attribute;
      }),
    });
    await productRepo.save(product);
  }

  console.log(`Seeded ${seedProducts.length} products.`);
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
