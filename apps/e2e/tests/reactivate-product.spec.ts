import { expect, test } from '@playwright/test';

test('reactivating a product brings it back to the Store', async ({ page }) => {
  const productName = `E2E Reactivate ${Date.now()}`;

  await page.goto('/');

  const storeTab = page.getByRole('button', { name: 'Store', exact: true });
  const manageTab = page.getByRole('button', { name: 'Manage', exact: true });

  await manageTab.click();

  await page.getByLabel('Name').fill(productName);
  await page.getByLabel('Image URL').fill('https://example.com/reactivate.png');
  await page.getByLabel('Price').fill('42');
  await page.getByRole('button', { name: 'Create product' }).click();

  const manageCard = page
    .getByRole('article')
    .filter({ has: page.getByRole('heading', { name: productName }) });
  await expect(manageCard).toBeVisible();

  await manageCard.getByRole('button', { name: 'Deactivate', exact: true }).click();
  await expect(
    manageCard.getByRole('button', { name: 'Activate', exact: true }),
  ).toBeVisible();

  await storeTab.click();
  await expect(page.getByRole('heading', { name: 'Store' })).toBeVisible();
  await expect(page.getByRole('heading', { name: productName })).toHaveCount(0);

  await manageTab.click();
  const activateButton = manageCard.getByRole('button', { name: 'Activate', exact: true });
  await expect(activateButton).toBeVisible();
  // The inactive card is aria-disabled, so Playwright's actionability check
  // treats the enclosed button as disabled even though it has no disabled attribute.
  await activateButton.click({ force: true });
  await expect(
    manageCard.getByRole('button', { name: 'Deactivate', exact: true }),
  ).toBeVisible();

  await storeTab.click();
  await expect(page.getByRole('heading', { name: productName })).toBeVisible();
});
