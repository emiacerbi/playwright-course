import { test, expect } from '@playwright/test';

test('the home page button toggles the paragraph visibility', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Toggle paragraph visibility' }).click();

  await expect(
    page.getByText('Hidden paragraph', { exact: true })
  ).toBeVisible();

  await page.getByRole('button', { name: 'Toggle paragraph visibility' }).click();

  await expect(
    page.getByText('Hidden paragraph', { exact: true })
  ).not.toBeVisible();
});