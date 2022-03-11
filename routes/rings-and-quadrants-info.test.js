import { findSectionIds, getTextFrom } from './rq-info-helper.js';
import { mockResults, expectedOutput } from './mock-results.js'

let pageObject;
let indexesArray;
let invalidObject = {
    isThisObjectInvalid: true,
    object: 'list',
    results: [
        {definitelyInvalid: "yes"},
    ]
}
let invalidObject2 = {
    completelyInvalid: "1"
}

describe('Correct section indexes should be returned', () => {
    beforeAll(() => {
        pageObject = {
            object: 'list',
            results: mockResults,
        };
    });
    test('is correct rings heading given?', () => {
        expect(findSectionIds(pageObject, "rings")).toStrictEqual([2,3,4]);
    });
    test('is correct quadrants heading given?', () => {
        expect(findSectionIds(pageObject, "quadrants")).toStrictEqual([5,6,7]);
    });
    test('does it handle an invalid object correctly?', () => {
        expect(findSectionIds(invalidObject, "quadrants")).toStrictEqual([]);
        expect(findSectionIds(invalidObject2, "quadrants")).toStrictEqual([]);
    })
});

describe('Correct text object should be returned', () => {
    beforeAll(() => {
        pageObject = {
            object: 'list',
            results: mockResults,
        };
        indexesArray = [2,3];
    });
    test('that invalid input is handled correctly', () => {
        expect(getTextFrom(invalidObject, indexesArray)).toBeNull();
        expect(getTextFrom(pageObject, [])).toBeNull();
        expect(getTextFrom(pageObject, [73,74])).toBeNull();
    });
    test('that expected output is given for valid data', () => {
        expect(getTextFrom(pageObject, indexesArray)).toStrictEqual(expectedOutput);
    })
});