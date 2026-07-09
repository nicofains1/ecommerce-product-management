import { expect, test } from '@playwright/test';

test('Store loads seeded active products', async ({ page }) => {
  await page.goto('/');

  const store = page.getByRole('region', { name: 'Store' });
  await expect(store.getByRole('heading', { name: 'Store', level: 2 })).toBeVisible();

  await expect(
    store.getByRole('heading', { name: 'Laser Tattoo Removal - Small Area' }),
  ).toBeVisible();
});
