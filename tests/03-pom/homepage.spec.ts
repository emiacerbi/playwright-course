import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('the home page shows the main heading', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  await expect(homePage.heading).toBeVisible();
});

test('the toggle button reveals and hides the paragraph', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  await homePage.toggleParagraph();
  await expect(homePage.hiddenParagraph).toBeVisible();

  await homePage.toggleParagraph();
  await expect(homePage.hiddenParagraph).not.toBeVisible();
});
