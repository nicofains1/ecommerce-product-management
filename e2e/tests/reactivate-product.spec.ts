import { expect, test } from '@playwright/test';

const TOGGLE_TIMEOUT = 10_000;

test('reactivating a product brings it back to the Store', async ({ page }) => {
  const productName = `E2E Reactivate ${Date.now()}`;

  await page.goto('/');

  const storeTab = page.getByRole('button', { name: 'Store', exact: true });
  const manageTab = page.getByRole('button', { name: 'Manage', exact: true });
  const manageCard = page
    .getByRole('article')
    .filter({ has: page.getByRole('heading', { name: productName }) });
  const deactivateButton = manageCard.getByRole('button', { name: 'Deactivate', exact: true });
  const activateButton = manageCard.getByRole('button', { name: 'Activate', exact: true });
  const storeHeading = page.getByRole('heading', { name: 'Store' });
  const storeProduct = page.getByRole('heading', { name: productName });

  await manageTab.click();
  await page.getByLabel('Name').fill(productName);
  await page.getByLabel('Image URL').fill('https://example.com/reactivate.png');
  await page.getByLabel('Price').fill('42');
  await page.getByRole('button', { name: 'Create product' }).click();
  await expect(manageCard).toBeVisible();

  await deactivateButton.click();
  await expect(activateButton).toBeVisible({ timeout: TOGGLE_TIMEOUT });
  await storeTab.click();
  await expect(storeHeading).toBeVisible();
  await expect(storeProduct).toHaveCount(0);
  await manageTab.click();

  await activateButton.click({ force: true });

  await expect(deactivateButton).toBeVisible({ timeout: TOGGLE_TIMEOUT });
  await storeTab.click();
  await expect(storeProduct).toBeVisible({ timeout: TOGGLE_TIMEOUT });
});
