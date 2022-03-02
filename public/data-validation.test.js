const excludeInvalidDatapoints = require('./data-validation');
let data;
let excludedData;

describe('Check that invalid datapoints are excluded', () => {
    beforeAll(() => {
        data = new Array();
        data.push({
            id: 0,
            label: "Correctly labelled item",
            ring: 1,
            quadrant: 2,
            active: 0,
            description: "Well written description",
        });
        data.push({
            id: 1,
            label: "Item with invalid ring value",
            ring: null,
            quadrant: 2,
            active: 0,
            description: "Another well written description",
        });
        data.push({
            id: 2,
            label: "",
            ring: 1,
            quadrant: 2,
            active: 0,
            description: "Item with an empty label",
        });
        data.push({
            id: 3,
            label: "Item with null quadrant",
            ring: 1,
            quadrant: null,
            active: 0,
            description: "Well written description for item with null quadrant",
        });
        excludedData = excludeInvalidDatapoints(data);
    });

    test('Valid datapoint still in original array', () => {
        expect(data).toContainEqual({
            id: 0,
            label: "Correctly labelled item",
            ring: 1,
            quadrant: 2,
            active: 0,
            description: "Well written description",
        });
    });

    test('Null ring value gets excluded from the original array', () => {
        expect(data).not.toContainEqual({
            id: 1,
            label: "Item with invalid ring value",
            ring: null,
            quadrant: 2,
            active: 0,
            description: "Another well written description",
        });
    });

    test('Null ring value gets included in the excludedData array', () => {
        expect(excludedData).toContainEqual({
            id: 1,
            label: "Item with invalid ring value",
            ring: null,
            quadrant: 2,
            active: 0,
            description: "Another well written description",
        });
    });

    test('Datapoint without a label has been removed from the original array', () => {
        expect(data).not.toContainEqual({
            id: 2,
            label: "",
            ring: 1,
            quadrant: 2,
            active: 0,
            description: "Item with an empty label",
        });
    });

    test('Datapoint without a label has not been included in the excludedData array', () => {
        expect(excludedData).not.toContainEqual({
            id: 2,
            label: "",
            ring: 1,
            quadrant: 2,
            active: 0,
            description: "Item with an empty label",
        });
    });

    test('Null quadrant value gets excluded from the original array', () => {
        expect(data).not.toContainEqual({
            id: 3,
            label: "Item with null quadrant",
            ring: 1,
            quadrant: null,
            active: 0,
            description: "Well written description for item with null quadrant",
        });
    });

    test('Null quadrant value gets included in the excludedData array', () => {
        expect(excludedData).toContainEqual({
            id: 3,
            label: "Item with null quadrant",
            ring: 1,
            quadrant: null,
            active: 0,
            description: "Well written description for item with null quadrant",
        });
    });
})