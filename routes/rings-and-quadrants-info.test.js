import { findSectionIds } from './rq-info-helper.js';
import { mockResults } from './mock-results.js'

let pageObject;

describe('Correct section heading should be returned', () => {
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
        expect(findSectionIds(invalidObject, "quadrants")).toStrictEqual([]);
        expect(findSectionIds(invalidObject2, "quadrants")).toStrictEqual([]);
    })
});