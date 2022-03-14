const { test, expect } = require('@playwright/test');
let radar;
let legendItem10;
let bubble;
let consoleLogMessage;
let ringsHeading;
let quadrantsHeading;
let ringsTextSection;
let quadrantsTextSection;
let quadrantsText;
let ringsText;

test.describe.configure({ mode: 'parallel' });

// User goes to webpage
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    radar = await page.locator('#radar');
    legendItem10 = await page.locator('#legendItem10');
    bubble = await page.locator("#bubble");
    ringsHeading = await page.locator("#rings-heading");
    quadrantsHeading = await page.locator('#quadrants-heading');
    ringsTextSection = await page.locator('#rings-text-section');
    quadrantsText = await page.locator('.quadrants-text');
    quadrantsTextSection = await page.locator('#quadrants-text-section');
    ringsText = await page.locator('.rings-text');
    consoleLogMessage = null;
    await page.on("console", (msg) => {
        consoleLogMessage = msg;
    });
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

test.describe('User wants to know what the rings and quadrants are referring to', () => {
    test('that there is a button for users who want to know what the rings are', async ({ page }) => {
        await expect(ringsHeading).toHaveText("What are the rings?", {useInnerText: true, timeout:20000});
    });
    test('that there is a button for users who want to know what the quadrants are', async ({ page }) => {
        await expect(quadrantsHeading).toHaveText("What are the quadrants?", {useInnerText: true, timeout:20000});
    });
    test('that the section of text explaining the rings is initially hidden', async ({ page }) => {
        await expect(ringsTextSection).toHaveCSS("color", "rgba(0, 0, 0, 0)");
    });
    test('that the section of text explaining the quadrants is initially hidden', async ({ page }) => {
        await expect(quadrantsTextSection).toHaveCSS("color", "rgba(0, 0, 0, 0)");
    });
    test('that a section of text explains the rings when the heading is clicked', async ({ page }) => {
        await page.click('#rings-heading');
        await expect(ringsTextSection).toHaveCSS("color", "rgb(0, 0, 0)");
        await expect(ringsText.first()).not.toBeEmpty();
    });
    test('that a section of text explains the quadrants when the heading is clicked', async ({ page }) => {
        await page.click('#quadrants-heading');
        await expect(quadrantsTextSection).toHaveCSS("color", "rgb(0, 0, 0)");
        await expect(quadrantsText.first()).not.toBeEmpty();
    });
});

test.afterEach(async ({ page }, testInfo) => {
    await expect(consoleLogMessage).toBeNull();
  });