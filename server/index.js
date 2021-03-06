const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.get("/search", async (req, res) => {
  const { term, entity, offset } = req.query;

  const url = `https://itunes.apple.com/search?term=${term}&offset=${offset}&limit=10&media=music&entity=${entity}`;

  try {
    const response = await axios.get(url);
    return res.status(200).send(JSON.stringify(response.data.results));
  } catch (e) {
    return res.status(400).send({ error: e });
  }
});

app.listen(process.env.PORT || 8080);
