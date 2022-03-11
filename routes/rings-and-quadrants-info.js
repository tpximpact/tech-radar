const helperFuncs = require('./rq-info-helper');
require('dotenv').config();
const { Client } = require('@notionhq/client');
var express = require('express');
var router = express.Router();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const pageId = process.env.NOTION_PAGE_ID;

/* GET home page. */
router.get('/', async function (req, res, next) {
    const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 50,
      });
    const data = response;
    const ringsSectionIds = helperFuncs.findSectionIds(response, "rings");
    const quadrantsSectionIds = helperFuncs.findSectionIds(response, "quadrants");
    res.json(data);
});

module.exports = router;
