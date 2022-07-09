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

authorRouter.get("/:auth_id", (req, res) => {
  const { auth_id } = req.params;
  const querySrt = {
    text: `
    SELECT
      ar.id AS article_id,
      ar.title,
      ar.hero_img,
      ar.summary,
      ar.description,
      ar.created_at,
      au.id AS author_id,
      au.name
    FROM article ar
    JOIN author au
    ON ar.author_id = au.id
    WHERE au.id = $1`,
    values: [auth_id],
  };
  database
    .query(querySrt)
    .then((data) => res.send(data.rows))
    .catch((e) => res.status(500).send(e.message));
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
