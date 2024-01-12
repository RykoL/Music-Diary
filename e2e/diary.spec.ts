import {test, expect} from '@playwright/test';

test("create a diary", async ( {page}) => {
    await page.goto("/diaries")

    await page.getByRole('button', {name: 'Start new diary'}).click()

    await page.getByLabel('Title').fill('Test diary');
    await page.getByLabel('Description').fill('Diary used for testing');
    await page.getByRole('button', {name: 'Create'}).click()

    await expect(page.getByText('Test diary')).toBeVisible()
    await expect(page.getByText('Diary used for testing')).toBeVisible()
})