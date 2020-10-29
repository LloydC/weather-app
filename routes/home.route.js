const request = require("request");
const { Router } = require("express");
const { apiKey, urlOneApiKey, urlOneCityQuery } = require("../configs");

const router = Router();

const nullValue = null;

router.get("/", (_, res) =>
  res.render("index", { weather: nullValue, error: nullValue })
);

router.post("/", (req, res) => {
  const { city } = req.body;
  const url = `${urlOneCityQuery}${city}${urlOneApiKey}${apiKey}`;

  request(url, function (err, _, body) {
    if (err) {
      res.render("index", {
        weather: nullValue,
        error: "Error, please try again",
      });
    } else {
      const weatherResponse = JSON.parse(body);
      const { main, name } = weatherResponse;
      const { temp } = main;
      const weather = `It's ${Math.floor(temp)} degrees in ${name}!`;

      main == undefined
        ? res.render("index", {
            weather: nullValue,
            error: "Error, please try again",
          })
        : res.render("index", { weather, error: nullValue });
    }
  });
});

module.exports = router;
