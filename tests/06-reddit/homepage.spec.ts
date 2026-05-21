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

  const href = await button.getAttribute('href');
  expect(href).toContain('/r/cats');
  await page.goto(new URL(href!, BASE).toString());

  const heading = page.getByRole('heading', { name: 'r/cats Community status:' })
  await expect(heading).toBeVisible();

  const icon = page.locator('#subreddit-icon-img-desktop img');
  await expect(icon).toBeVisible();
});

test.describe('r/cats sort dropdown', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}r/cats/`);
  });

  test('default sort is Best', async ({ page }) => {
    await expect(page.getByRole('button', { name: "Sort by: Best" })).toBeVisible();

    await page.getByRole('button', { name: "Sort by:" }).click();

    const selected = page.locator('li[rpl-selected]').getByRole('link');
    await expect(selected).toHaveText('Best');
  });

  test('clicking each sort option navigates correctly', async ({ page }) => {
    const sortTrigger = page.getByRole('button', { name: /^Sort by:/ });

    await sortTrigger.click();
    const bestHref = await page.getByRole('link', { name: 'Best', exact: true }).getAttribute('href');
    await page.goto(new URL(bestHref!, BASE).toString());
    await expect(page).toHaveURL(`${BASE}r/cats/best/`);
    await expect(sortTrigger).toHaveText(/Best/);

    await sortTrigger.click();
    const hotHref = await page.getByRole('link', { name: 'Hot', exact: true }).getAttribute('href');
    await page.goto(new URL(hotHref!, BASE).toString());
    await expect(page).toHaveURL(`${BASE}r/cats/hot/`);
    await expect(sortTrigger).toHaveText(/Hot/);

    await sortTrigger.click();
    const newHref = await page.getByRole('link', { name: 'New', exact: true }).getAttribute('href');
    await page.goto(new URL(newHref!, BASE).toString());
    await expect(page).toHaveURL(`${BASE}r/cats/new/`);
    await expect(sortTrigger).toHaveText(/New/);

    // await sortTrigger.click();
    // const topHref = await page.getByRole('link', { name: 'Top', exact: true }).getAttribute('href');
    // await page.goto(new URL(topHref!, BASE).toString());
    // await expect(page).toHaveURL(`${BASE}r/cats/top/`);
    // await expect(sortTrigger).toHaveText(/Top/);

    await sortTrigger.click();
    const risingHref = await page.getByRole('link', { name: 'Rising', exact: true }).getAttribute('href');
    await page.goto(new URL(risingHref!, BASE).toString());
    await expect(page).toHaveURL(`${BASE}r/cats/rising/`);
    await expect(sortTrigger).toHaveText(/Rising/);
  });
});

test('login form shows browser validation error for invalid email', async ({ page }) => {
  await page.goto(BASE);

  await page.getByRole('link', { name: 'Log In' }).click()

  const userInput = page.getByRole('textbox', { name: /email|username/i });
  const passwordInput = page.getByRole('textbox', { name: /password/i });

  await userInput.fill('ferferfref');
  await passwordInput.fill('any-password');

  await page.getByRole('button', { name: /^Log In$/ }).click();

  await page.locator('#login').getByText('Sign Up').click()


  const emailInput = page.locator('input[name="email"], input[type="email"]').first();
  await expect(emailInput).toBeVisible();
  await expect(emailInput).toBeEditable();
  await emailInput.fill('ferferfref');
  await expect(emailInput).toHaveValue('ferferfref');
  await page.locator('#register').getByRole('link', { name: 'Log In' }).click()
  await expect(page.getByText('Please include an \'@\' in the email address.')).toBeVisible();
});
