import { test, expect } from '@playwright/test';

const BASE = 'https://www.reddit.com/';

test('find searchbar and navigate to /cats', async ({ page }) => {
  await page.goto(BASE);

  const input = page.getByRole('textbox', { name: 'Ask' });
  await expect(input).toBeVisible();
  await expect(input).toBeEmpty();
  await input.fill('cats');
  await expect(input).toHaveValue('cats');

  const button = page.getByRole('menuitem', { name: 'r/cats 3.7M weekly visitors' })
  await expect(button).toBeVisible();
  await button.click();
  await expect(page).toHaveURL(`https://www.reddit.com/r/cats/`);

  const heading = page.getByRole('heading', { name: 'r/cats Community status:' })
  await expect(heading).toBeVisible();

  const icon = page.locator('#subreddit-icon-img-desktop img');
  await expect(icon).toBeVisible();
});
