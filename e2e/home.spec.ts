import {test, expect} from '@playwright/test';

test('has title', async ({page}) => {
    await page.goto('http://localhost:5173');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Music diary/);
});

test('has a link to go to the diaries page', async ({page}) => {
    await page.goto('/')
    await expect(page.getByRole('link', {name: 'Create your diary'})).toBeVisible()
    await page.getByRole('link').click()
    await expect(page.getByRole('link', {name: 'Your diaries'})).toBeVisible()
})