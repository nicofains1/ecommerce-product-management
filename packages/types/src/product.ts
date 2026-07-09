import { z } from 'zod';

export const MAX_ATTRIBUTES = 10;

export const attributeSchema = z.object({
  name: z.string().trim().min(1).max(50),
  value: z.string().trim().min(1).max(100),
});

export const productSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  imageUrl: z.url(),
  price: z.number().nonnegative(),
  isActive: z.boolean(),
  attributes: z.array(attributeSchema),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const createProductSchema = z.object({
  name: z.string().trim().min(1).max(120),
  imageUrl: z.url(),
  price: z.number().positive().max(1_000_000),
  attributes: z.array(attributeSchema).max(MAX_ATTRIBUTES).default([]),
});

export const toggleActiveSchema = z.object({
  isActive: z.boolean(),
});

export type Attribute = z.infer<typeof attributeSchema>;
export type Product = z.infer<typeof productSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type ToggleActiveInput = z.infer<typeof toggleActiveSchema>;
