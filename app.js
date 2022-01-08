const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const routes = require("./routes/")
const soulsGames = require("./games/darksouls1")

const app = express();

app.use("/", routes)

app.get("/", (req, res) => {
  res.send("games");
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
