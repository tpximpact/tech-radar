import { buildFormattedInnerHTMLFrom } from "./main-helper.js";
import { expectedOutput } from '../routes/mock-results.js'

const expectedCompleteDataOutput = `line 1 bulletedlistitem<b>line 2 bulletedlistitem</b>`;
const partiallyEmptyInput = [
    {
        annotations: {
            bold: false,
            code: false,
            color: "default",
            italic: false,
            strikethrough: false,
            underline: false,
            }
    },
    {
        text: "line 2 bulletedlistitem",
    }
];
const partiallyEmptyOutput = "line 2 bulletlistitem";

describe('Ensure formatted HTML built from Notion API data is correct', () => {
    test('that complete Notion API data gives expected output', () => {
        expect(buildFormattedInnerHTMLFrom(expectedOutput[1].textArray)).toBe(expectedCompleteDataOutput);
    });
    test('that empty input data gives empty output', () => {
        expect(buildFormattedInnerHTMLFrom([])).toBe("");
    });
    test('that partially empty input data gives partially empty output', () => {
        expect(buildFormattedInnerHTMLFrom(partiallyEmptyInput)).toBe(partiallyEmptyOutput);
    });
})