import { legendLabelWrap } from './build-radar.js';

function buildSegmentedFrom(inputLabel) {
    return [{label: inputLabel}];
}

describe('Ensure text wrapping works as expected for legend, assuming maxChars is 17', () => {
    test('that labels containing words longer than one line are hyphenated correctly', () => {
        const inputLabel = 'Noninstitutionalised';
        expect(legendLabelWrap(buildSegmentedFrom(inputLabel), true)[0].label).toBe('Noninstitutional-\nised');
    });
    test('that labels containing multiple words that sum to greater than 18 characters are split across lines', () => {
        const inputLabel = 'This is a very long label that should be split up';
        expect(legendLabelWrap(buildSegmentedFrom(inputLabel), true)[0].label).toBe('This is a very\nlong label that\nshould be split\nup');
    });
    test('that labels containing both multiple words and a word longer than one line are wrapped correctly', () => {
        const inputLabel = 'This is a very long label that contains noninstitutionalised for some reason';
        expect(legendLabelWrap(buildSegmentedFrom(inputLabel), true)[0].label).toBe('This is a very\nlong label that\ncontains\nnoninstitutional-\nised for some\nreason');
    });
})