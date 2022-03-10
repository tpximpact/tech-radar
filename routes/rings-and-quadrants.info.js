require('dotenv').config();
const { Client } = require('@notionhq/client');
var express = require('express');
var router = express.Router();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

/* GET home page. */
router.get('/', function (req, res, next) {
    const data = {dummyData: true};
    res.json(data);
});

module.exports = router;
