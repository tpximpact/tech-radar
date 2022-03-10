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
    res.json(data);
});

module.exports = router;
