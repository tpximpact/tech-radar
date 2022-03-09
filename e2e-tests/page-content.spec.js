const { test, expect } = require('@playwright/test');
let radar;
let legendItem10;
let bubble;

// User goes to webpage
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    radar = await page.locator('#radar');
    legendItem10 = await page.locator('#legendItem10');
    bubble = await page.locator("#bubble");
  });

test.describe('Hovering over a label in the legend', () => {
    test('to check that item is not highlighted initially', async ({ page }) => {
        await expect(legendItem10).not.toHaveAttribute("fill","white", {timeout:20000});
    });
    test('to check that hovering over an item highlights it', async ({ page }) => {
        await page.hover("#legendItem10", {timeout: 20000});
        await expect(legendItem10).toHaveAttribute("fill","white", {timeout:20000});
    });
    test('to check that taking mouse away from item de-highlights it', async ({ page }) => {
        await page.hover("#legendItem10", {timeout: 20000});
        await page.hover("#legendItem20", {timeout: 20000});
        await expect(legendItem10).not.toHaveAttribute("fill","white", {timeout:20000});
    });
    test('to check that hovering over an item displays a label on the visualisation', async ({ page }) => {
        await page.hover("#legendItem10", {timeout: 20000});
        await expect(bubble).toBeVisible();
    });
});