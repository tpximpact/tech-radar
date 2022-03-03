require('dotenv').config();
const { Client } = require('@notionhq/client');
const excludeInvalidDatapoints = require('../bin/data-validation');
var express = require('express');
var router = express.Router();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

/* GET radar */
router.get('/', async (req, res, next) => {
    const response = await notion.databases.query({ database_id: databaseId });
    const getRingIndex = (ring) => {
        const rings = ['Adopt', 'Trial', 'Assess', 'Hold'];
        const indexOfRing = rings.indexOf(ring);

        // Return null value if ring is not known
        if (indexOfRing < 0) {
            return null;
        }
        return indexOfRing;
    };
    const getQuadrantIndex = (quadrant) => {
        const quadrants = [
            'Techniques',
            'Platforms',
            'Tools',
            'Languages & Frameworks',
        ];

        const indexOfQuadrant = quadrants.indexOf(quadrant);
        // Return null value if quadrant is not known
        if (indexOfQuadrant < 0) {
            return null;
        }
        return indexOfQuadrant;
    };
    const result = response.results.map((page) => {
        return {
            id: page.id,
            label: page.properties.Name.title[0]?.plain_text,
            ring: getRingIndex(page.properties.Ring.select?.name),
            quadrant: getQuadrantIndex(page.properties.Quadrant.select?.name),
            active: page.properties.New.checkbox,
            description: page.properties.Description.rich_text[0]?.plain_text,
        };
    });

    const excludedData = excludeInvalidDatapoints(result);

    const data = {
        includedData: result,
        excludedData: excludedData,
    }
    res.json(data);
});

module.exports = router;

