import { test, expect } from '@playwright/test';

const POST = 'https://www.reddit.com/r/cats/comments/1tkf6ai/little_ginger_cat_turned_into_a_grumpy_cat_uncle/';

test('gallery post - click through all images and open each in full view', async ({ page }) => {
    const img = page.getByRole('img', { name: 'r/cats - Little ginger cat' }).first();
    const nextBtn = page.getByRole('button', { name: 'Next page' });

    await page.goto(POST);

    await expect(nextBtn).toBeVisible();
    await expect(img).toBeVisible();

    await img.click();
    await expect(img).toBeVisible();

    const checkNextSlide = async (expectedSlide: number) => {
        const currentSrc = await img.getAttribute('src');
        await nextBtn.click();
        await expect(img).not.toHaveAttribute('src', currentSrc!);
        await expect(img).toBeVisible();
        if (expectedSlide < 5) {
            await expect(nextBtn).toBeVisible();
        }
    };

    await checkNextSlide(2);
    await checkNextSlide(3);
    await checkNextSlide(4);
    await checkNextSlide(5);
});

test('search comments - search for "cat" and "car" and verify the results', async ({ page }) => {
    await page.goto(POST);
    await page.getByRole('button', { name: 'Search Comments Expand' }).click();
    await page.locator('#pdp-comment-search-form').getByLabel('', { exact: true }).fill('cat');
    await page.locator('#pdp-comment-search-form').getByLabel('', { exact: true }).press('Enter');
    await expect(page.getByRole('link', { name: 'ginger kitten grew up into a' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'He lost the cat tree in the' })).toBeVisible();
    await page.getByRole('button', { name: 'Clear search' }).click();
    await page.locator('#pdp-comment-search-form').getByLabel('', { exact: true }).fill('car');
    await page.locator('#pdp-comment-search-form').getByLabel('', { exact: true }).press('Enter');
    await expect(page.getByText('Hm... we couldn’t find any')).toBeVisible();
});

