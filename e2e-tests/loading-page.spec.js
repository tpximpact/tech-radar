const { test, expect } = require('@playwright/test');

// User goes to webpage
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});

test.describe('Loading main page', () => {
    // User knows that data loading is in progress with a loading icon
    test("if loading icon is displayed when items haven't yet loaded", async ({
        page,
    }) => {
        const radarInnerHTML = await page.locator('#radar').textContent();
        if (radarInnerHTML === '') {
            await expect(page.locator('#loader-container div')).toBeVisible();
        }
    });
});
