const express = require("express");
const authorRouter = express.Router();
const database = require("../database/client");

authorRouter.get("/time", (req, res) => {
  database
    .query("SELECT NOW()")
    .then((data) => res.send(data.rows[0].now))
    .catch(() => res.status(500).send());
});

authorRouter.get("/", (req, res) => {
  database
    .query("SELECT * FROM author")
    .then((data) => res.send(data.rows))
    .catch((error) => res.status(500).send());
  // res.send("here are authors");
});

authorRouter.post("/newauthor", (req, res) => {
  const { name, avatar, email } = req.body;
  const newAuthor = {
    text: "INSERT INTO author(name, avatar, email) VALUES($1, $2, $3) RETURNING *",
    values: [name, avatar, email],
  };
  database
    .query(newAuthor)
    .then((data) => res.json(data.rows))
    .catch(() => res.status(500).send());
});

module.exports = authorRouter;
