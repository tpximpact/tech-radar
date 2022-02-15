require("dotenv").config();
const {Client} = require("@notionhq/client");

const notion = new Client({auth: process.env.NOTION_API_KEY});
const databaseId = process.env.NOTION_DATABASE_ID;

exports.getDatabase = async function() {
    const response = await notion.databases.query({database_id: databaseId});
    const getRingIndex = (ring) => {
        const rings = ["Adopt", "Trial", "Assess", "Hold"];
        return rings.indexOf(ring);
    };
    const getQuadrantIndex = (quadrant) => {
        const quadrants = ["Techniques", "Platforms", "Tools", "Languages & Frameworks"];
        return quadrants.indexOf(quadrant);
    };
    const result = response.results.map((page) => {
        return {
            id: page.id,
            label: page.properties.Name.title[0]?.plain_text,
            ring: getRingIndex(page.properties.Ring.select.name),
            quadrant: getQuadrantIndex(page.properties.Quadrant.select.name),
            active: page.properties.New.checkbox,
            description: page.properties.Description.rich_text[0]?.plain_text
        }
    });
    return result;
}