require("dotenv").config();
const {Client} = require("@notionhq/client");

const notion = new Client({auth: process.env.NOTION_API_KEY});
const databaseId = process.env.NOTION_DATABASE_ID;

exports.getDatabase = async function() {
    const response = await notion.databases.query({database_id: databaseId});
    const result = response.results.map((page) => {
        return {
            id: page.id,
            name: page.properties.Name.title[0]?.plain_text,
            ring: page.properties.Ring.select.name,
            quadrant: page.properties.Quadrant.select.name,
            new: page.properties.New.checkbox,
            description: page.properties.Description.rich_text[0]?.plain_text
        }
    });
    return result;
}