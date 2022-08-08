const { test, expect } = require('@playwright/test');
let legendItem10;
let bubble;
let consoleLogMessage;
let ringsHeading;
let quadrantsHeading;
let quadrantsText;
let ringsText;

let page;

test.describe.configure({ mode: 'parallel' });

test.beforeAll(async ({ browser }) => {
    // Reuse page as these tests don't require a fresh page every time
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
});

test.afterAll(async () => {
    await page.close();
});

// User goes to webpage
test.beforeEach(async () => {
    radar = await page.locator('#radar');
    legendItem10 = await page.locator('#legendItem10');
    bubble = await page.locator('#bubble');
    ringsHeading = await page.locator('#rings-heading');
    quadrantsHeading = await page.locator('#quadrants-heading');
    ringsText = await page.locator('#rings-text-section > li');
    ringsTextSection = await page.locator('#rings-text-section');
    quadrantsText = await page.locator('#quadrants-text-section > li');
    quadrantsTextSection = await page.locator('#quadrants-text-section');
    consoleLogMessage = null;
    await page.on('console', (msg) => {
        consoleLogMessage = msg;
    });
});

test.describe('Hovering over a label in the legend', () => {
    test('to check that item is not highlighted initially', async () => {
        await expect(legendItem10).not.toHaveAttribute('fill', 'white', {
            timeout: 20000,
        });
    });
    test('to check that hovering over an item highlights it', async () => {
        await page.hover('#legendItem10', { timeout: 20000 });
        await expect(legendItem10).toHaveAttribute('fill', 'white', {
            timeout: 20000,
        });
    });
    test('to check that taking mouse away from item de-highlights it', async () => {
        await page.hover('#legendItem10', { timeout: 20000 });
        await page.hover('#legendItem20', { timeout: 20000 });
        await expect(legendItem10).not.toHaveAttribute('fill', 'white', {
            timeout: 20000,
        });
    });
    test('to check that hovering over an item displays a label on the visualisation', async () => {
        await page.hover('#legendItem10', { timeout: 20000 });
        await expect(bubble).toBeVisible();
    });
});

test.describe(
    'User wants to know what the rings and quadrants are referring to',
    () => {
        test('that there is a title for users who want to know what the rings are', async () => {
            await expect(ringsHeading).not.toBeEmpty();
        });
        test('that there is a title for users who want to know what the quadrants are', async () => {
            await expect(quadrantsHeading).not.toBeEmpty();
        });
        test('that a section of text explains the rings', async () => {
            await expect(ringsText).toHaveCount(4);
        });
        test('that a section of text explains the quadrants', async () => {
            await expect(quadrantsText).toHaveCount(4);
        });
    }
);

test.afterEach(async () => {
    await expect(consoleLogMessage).toBeNull();
});
