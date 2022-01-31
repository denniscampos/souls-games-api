const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const router = express.Router();
const darkSouls1 = require("../games/darksouls1");
const darkSouls2 = require("../games/darksouls2");
const demonsSouls = require("../games/demonssouls");
const bloodBorne = require("../games/bloodborne");
const darkSouls3 = require("../games/darksouls3");
const sekiro = require("../games/sekiro");
const eldenRing = require("../games/eldenring");

router.get("/darksouls1", (req, res) => {
  const games = [];

  darkSouls1.forEach((game) => {
    axios
      .get(game.bossUrl)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $(".row .wiki_link", html).each(function () {
          const bossName = $(this).text();
          const url = $(this).attr("href");
          const bossImage = $(this).find("img").attr("src");

          games.push({
            game: game.name,
            boss: bossName,
            url: game.baseUrl + url,
            image: encodeURI(game.baseUrl + bossImage),
          });
        });
        res.json(games);
      })
      .catch((error) => console.log("Something went wrong: ", error));
  });
});

router.get("/darksouls2", (req, res) => {
  const games = [];

  darkSouls2.forEach((game) => {
    axios
      .get(game.bossUrl)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $(".row .col-sm-2", html).each(function () {
          const bossName = $(this).text().replace(/\n/g, "").trim();
          const url = $(this).attr("href");
          const bossImage = $(this).find("img").attr("src");
          games.push({
            game: game.name,
            boss: bossName,
            url: `${game.baseUrl}${url}`,
            image: `${game.baseUrl}${bossImage}`,
          });
        });

        res.json(games);
      })
      .catch((error) => console.log("Something went wrong: ", error));
  });
});

router.get("/demonssouls", (req, res) => {
  const games = [];

  demonsSouls.forEach((game) => {
    axios
      .get(game.bossUrl)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $(".row .col-sm-4", html).each(function () {
          const bossName = $(this).text().replace(/\n/g, "").trim();
          const url = $(".special .wiki_link", this).attr("href");
          const bossImage = $(this).find("img").attr("src");

          games.push({
            game: game.name,
            boss: bossName,
            url: `${game.baseUrl}${url}`,
            image: `${game.baseUrl}${bossImage}`,
          });
        });
        res.json(games);
      })
      .catch((error) => console.log("Something went wrong: ", error));
  });
});

router.get("/bloodborne", (req, res) => {
  const games = [];
  bloodBorne.forEach((game) => {
    axios
      .get(game.bossUrl)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $(".col-sm-4").each(function () {
          const bossName = $("h3 .wiki_link", this).text();
          const url = $("a", this).attr("href");
          const bossImage = $(this).find("img").attr("src");
          games.push({
            game: game.name,
            boss: bossName,
            url: `${game.baseUrl}${url}`,
            image: `${game.baseUrl}${bossImage}`,
          });
        });
        res.json(games);
      })
      .catch((error) => console.log("Something went wrong: ", error));
  });
});

router.get("/darksouls3", (req, res) => {
  const games = [];

  darkSouls3.forEach((game) => {
    axios
      .get(game.bossUrl)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $(".wiki_tooltip", html).each(function () {
          const bossName = $(this).text();
          const url = $(this).attr("href");
          const bossImage = $(this).find("img").attr("src");
          games.push({
            game: game.name,
            boss: bossName,
            url: `${game.baseUrl}${url}`,
            image: `${game.baseUrl}${bossImage}`,
          });
        });
        res.json(games);
      })
      .catch((error) => console.log("Something went wrong: ", error));
  });
});

router.get("/sekiro", (req, res) => {
  const games = [];

  sekiro.forEach((game) => {
    axios
      .get(game.bossUrl)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $(".col-sm-4").each(function () {
          const bossName = $(".special", this).text();
          const url = $("a", this).attr("href");
          console.log(bossName);
          games.push({
            game: game.name,
            boss: bossName,
            url: encodeURI(`${game.baseUrl}${url}`),
          });
        });
        res.json(games);
      })
      .catch((error) => console.log("Something went wrong: ", error));
  });
});

router.get("/eldenring", (req, res) => {
  const games = [];

  eldenRing.forEach((game) => {
    axios.get(game.bossUrl).then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(".col-sm-4").each(function () {
        const bossName = $("h4 > a", this).text();
        const url = $("a", this).attr("href");
        console.log("here", url);

        games.push({
          game: game.name,
          boss: bossName,
          url: encodeURI(`${game.baseUrl}${url}`),
        });
      });
      res.json(games);
    });
  });
});

router.get("/game/:gameId", (req, res) => {
  const gameId = req.params.gameId;

  const gameName = sekiro.filter((game) => game.gameId === gameId)[0].gameId;
});

module.exports = router;
