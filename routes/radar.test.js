describe('Check that environment variables are set', () => {
    beforeAll(() => {
        require('dotenv').config();
    });
    test('is NOTION_API_KEY set?', () => {
        expect(typeof process.env.NOTION_API_KEY).toBe('string');
    });
    test('is NOTION_DATABASE_ID set?', () => {
        expect(typeof process.env.NOTION_DATABASE_ID).toBe('string');
    });
});