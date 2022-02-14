const express = require("express");
const notion = require("./index");
const getDatabase = notion.getDatabase;

const port = 8000;
const app = express();

app.use(express.static("public"));

app.get("/radar", async (req, res) => {
    const data = await getDatabase();
    res.json(data);
})

app.listen(port, console.log(`Server started on ${port}`));