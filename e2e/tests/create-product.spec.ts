import { expect, test } from '@playwright/test';

test('creating a product makes it show up in the Store', async ({ page }) => {
  const productName = `E2E Create Serum ${Date.now().toString(36)}`;

  await page.goto('/');
  await page.getByRole('button', { name: 'Manage' }).click();

  await page.getByLabel('Name').fill(productName);
  await page.getByLabel('Image URL').fill('https://picsum.photos/seed/e2e/300/200');
  await page.getByLabel('Price').fill('120');
  await page.getByRole('button', { name: 'Add attribute' }).click();
  await page.getByLabel('Attribute 1 name').fill('area');
  await page.getByLabel('Attribute 1 value').fill('arm');
  await page.getByRole('button', { name: 'Create product' }).click();

  const managedProducts = page.getByRole('region', { name: 'Manage products' });
  const managedHeading = managedProducts.getByRole('heading', { name: productName });
  await expect(managedHeading).toBeVisible({ timeout: 10_000 });

  await page.getByRole('button', { name: 'Store' }).click();

  const store = page.getByRole('region', { name: 'Store' });
  const storeHeading = store.getByRole('heading', { name: productName });
  await expect(storeHeading).toBeVisible({ timeout: 10_000 });
});
