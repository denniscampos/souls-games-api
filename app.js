const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const soulsGames = [
  {
    name: "Demons Souls",
    baseUrl: "https://demonssouls.wiki.fextralife.com",
    bossUrl: "https://demonssouls.wiki.fextralife.com/Bosses",
  },
  {
    name: "Bloodborne",
    baseUrl: "https://demonssouls.wiki.fextralife.com",
    bossUrl: "https://demonssouls.wiki.fextralife.com/Bosses",
  },
  {
    name: "Dark Souls I",
    baseUrl: "https://darksouls.wiki.fextralife.com",
    bossUrl: "https://darksouls.wiki.fextralife.com/Bosses",
  },
  {
    name: "Dark Souls II",
    baseUrl: "https://darksouls2.wiki.fextralife.com",
    bossUrl: "https://darksouls2.wiki.fextralife.com/Bosses",
  },
  {
    //dark souls 3 does not use .row class.
    name: "Dark Souls III",
    baseUrl: "https://darksouls3.wiki.fextralife.com",
    bossUrl: "https://darksouls3.wiki.fextralife.com/Bosses",
  },
];

const games = [];

// boss image not consistent on website

soulsGames.forEach((game) => {
  axios
    .get(game.bossUrl)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(".row .wiki_link", html).each(function () {
        const bossName = $(this).text();
        const url = $(this).attr("href");
        // let bossImage = $(this).find("img").attr("src");

        games.push({
          game: game.name,
          boss: bossName,
          url: game.baseUrl + url,
          //   image: encodeURI(game.baseUrl + bossImage),
        });
      });
    })
    .catch((error) => console.log("Something went wrong: ", error));
});

app.get("/", (req, res) => {
  res.json(games);
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
