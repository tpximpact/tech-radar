import { findSectionHeading } from './rq-info-helper.js';
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
        expect(findSectionHeading(pageObject, "rings")).toBe(2);
    });
    test('is correct quadrants heading given?', () => {
        expect(findSectionHeading(pageObject, "quadrants")).toBe(5);
    });
    test('does it handle an invalid object correctly?', () => {
        let invalidObject = {
            isThisObjectInvalid: true,
            object: 'list',
            results: [
                {definitelyInvalid: "yes"},
            ]
        }
        expect(findSectionHeading(invalidObject, "quadrants")).toBe(-1);
    })
});