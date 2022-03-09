const { test, expect } = require('@playwright/test');
let radar;
let legendItem100;

// User goes to webpage
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    radar = await page.locator('#radar');
    legendItem100 = await page.locator('#legendItem100');
  });

test.describe('Hovering over a label in the label', () => {
    test('to check that item is not highlighted initially', async ({ page }) => {
        await expect(legendItem100).not.toHaveAttribute("fill","white", {timeout:20000});
    });
    test('to check that hovering over an item highlights it', async ({ page }) => {
        await page.hover("#legendItem100", {timeout: 10000});
        await expect(legendItem100).toHaveAttribute("fill","white", {timeout:20000});
    });
    test('to check that taking mouse away from item de-highlights it', async ({ page }) => {
        fail("Not yet implemented");
    });
    test('to check that hovering over an item displays a label on the visualisation', async ({ page }) => {
        fail("Not yet implemented");
    });
});