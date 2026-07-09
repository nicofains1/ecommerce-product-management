import { expect, test } from '@playwright/test';

test('deactivating a product removes it from the Store', async ({ page }) => {
  const productName = `E2E Deactivate ${Date.now()}`;

  await page.goto('/');
  await page.getByRole('button', { name: 'Manage' }).click();
  await page.getByLabel('Name').fill(productName);
  await page.getByLabel('Image URL').fill('https://picsum.photos/seed/e2e-deactivate/400');
  await page.getByLabel('Price').fill('42.5');
  await page.getByRole('button', { name: 'Create product' }).click();

  const managedCard = page.getByRole('article').filter({
    has: page.getByRole('heading', { name: productName }),
  });
  await expect(managedCard).toBeVisible({ timeout: 10_000 });

  await managedCard.getByRole('button', { name: 'Deactivate' }).click();

  const activateButton = managedCard.getByRole('button', { name: 'Activate' });
  await expect(activateButton).toBeVisible({ timeout: 10_000 });

  await page.getByRole('button', { name: 'Store' }).click();

  const activeOnlyFilter = page.getByRole('checkbox', { name: 'Active only' });
  const storeHeading = page.getByRole('heading', { name: productName });
  await expect(activeOnlyFilter).toBeChecked();
  await expect(storeHeading).toBeHidden({ timeout: 10_000 });

  await page.getByRole('button', { name: 'Manage' }).click();

  const manageHeading = page.getByRole('heading', { name: productName });
  await expect(manageHeading).toBeVisible({ timeout: 10_000 });
});
