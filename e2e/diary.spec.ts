import {test, expect, type Page} from '@playwright/test';

const goToDiary = async (page: Page, title: string) => {
    await page.goto('/app/diaries')
    await page.getByRole('link', {name: `Open ${title}`}).click()
}

test.describe.serial("Diary journey", () => {
    const random = Math.floor(Math.random() * 20)
    const diaryUrlRegex = /\/app\/diary\/[\w\d]{8}-([\w\d]{4}-){3}[\w\d]{12}/
    const title = `Test diary ${random}`
    const entryTitle = 'Vacation in Vienna'

    test("create a diary", async ({page}) => {
        await page.goto("/app/diaries")
        const description = `Diary used for testing ${random}`

        await page.getByRole('button', {name: 'Start new diary'}).click()

        await page.getByLabel('Title').fill(title);
        await page.getByLabel('Description').fill(description);
        await page.getByRole('button', {name: 'Create'}).click()

        await expect(page.getByText(title)).toBeVisible({timeout: 5000})
        await expect(page.getByText(description)).toBeVisible()

    })

    test("create an entry", async ({page}) => {
        await page.goto('/app/diaries')
        await page.getByRole('link', {name: `Open ${title}`}).click()
        await expect(page).toHaveURL(diaryUrlRegex)
        await page.getByRole('button', {name: 'Write new entry'}).click()

        await page.getByLabel('Title').fill(entryTitle)
        await page.getByLabel('Song').fill('https://open.spotify.com/track/7mCI9JBW0FJAaMk3H3TFyo?si=d3fc294d50cc467f')
        await page.getByLabel('Content').fill('This is my first entry and i really remember this song.')
        await page.getByLabel('Date').fill(new Date().toISOString().substring(0, 10))
        await page.getByRole('button', {name: 'Create'}).click()

        await expect(page.getByText(entryTitle)).toBeVisible()
        await expect(page.getByText('This is my first entry and i really remember this song.')).toBeVisible()
    })

    test("goto entry detail page", async ({page}) => {
        await goToDiary(page, title)
        await page.getByRole('heading', {name: entryTitle}).click()
    })

    test("delete diary", async ({page}) => {
        await page.goto("/app/diaries")
        await page.getByRole('button', {name: title}).click()
        await expect(page.getByText(title)).not.toBeVisible()
    })
})