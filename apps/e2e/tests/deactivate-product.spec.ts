import { expect, test } from '@playwright/test';

test('deactivating a product removes it from the Store', async ({ page }) => {
  const productName = `E2E Deactivate ${Date.now()}`;

  await page.goto('/');

  // Create the product from the Manage view so this test owns it.
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByLabel('Name').fill(productName);
  await page.getByLabel('Image URL').fill('https://picsum.photos/seed/e2e-deactivate/400');
  await page.getByLabel('Price').fill('42.5');
  await page.getByRole('button', { name: 'Create product' }).click();

  // The new product appears in the Manage list as an active card.
  const managedCard = page.getByRole('article').filter({
    has: page.getByRole('heading', { name: productName }),
  });
  await expect(managedCard).toBeVisible();

  // Deactivate it.
  await managedCard.getByRole('button', { name: 'Deactivate' }).click();
  await expect(managedCard.getByRole('button', { name: 'Activate' })).toBeVisible();

  // Store with the default "Active only" filter must not show it.
  await page.getByRole('button', { name: 'Store' }).click();
  await expect(page.getByRole('checkbox', { name: 'Active only' })).toBeChecked();
  await expect(page.getByRole('heading', { name: productName })).toBeHidden();

  // But it is still there in Manage.
  await page.getByRole('button', { name: 'Manage' }).click();
  await expect(page.getByRole('heading', { name: productName })).toBeVisible();
});
