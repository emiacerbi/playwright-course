import { test, expect } from '@playwright/test';

test('the home page shows the main heading', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Playwright practice' })
  ).toBeVisible();
});

test('the home page shows the main paragraph', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('paragraph', { name: 'Tiny sandbox for learning locators. I\'ll grow this page as we cover more topics.' })
  ).toBeVisible();
});

test('the home page shows the main button', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('button', { name: 'Click me' })
  ).toBeVisible();
});