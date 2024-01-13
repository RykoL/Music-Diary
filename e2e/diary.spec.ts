import {test, expect} from '@playwright/test';

test("create a diary", async ({page}) => {
    const random = Math.random()
    const title = `Test diary ${random}`
    const description = `Diary used for testing ${random}`
    await page.goto("/diaries")

    await page.getByRole('button', {name: 'Start new diary'}).click()

    await page.getByLabel('Title').fill(title);
    await page.getByLabel('Description').fill(description);
    await page.getByRole('button', {name: 'Create'}).click()

    await expect(page.getByText(title)).toBeVisible({timeout: 5000})
    await expect(page.getByText(description)).toBeVisible()

    await page.getByRole('button', {name: title}).click()
})