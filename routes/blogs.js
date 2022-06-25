const express = require("express");
const blogRouter = express.Router();
const database = require("../database/client");

blogRouter.get("/time", (req, res) => {
  database
    .query("SELECT NOW()")
    .then((data) => res.send(data.rows[0].now))
    .catch(() => res.status(500).send());
});

blogRouter.get("/", (req, res) => {
  // res.send("here are blogs");
  database
    .query("SELECT * FROM article")
    .then((data) => res.send(data.rows))
    .catch(() => res.status(500).send());
});
blogRouter.get("/:id", (req, res) => {
  // res.send("here are blogs");
  const { id } = req.params;
  const queryStr = {
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
      WHERE ar.id=$1
      `,
    values: [id],
  };
  database
    .query(queryStr)
    .then((data) => res.send(data.rows))
    .catch((e) => res.status(500).send(e.message));
});

blogRouter.post("/newarticle", (req, res) => {
  const { title, hero_img, summary, description, author_id } = req.body;
  const newArticle = {
    text: "INSERT INTO article(title, hero_img, summary, description, author_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
    values: [title, hero_img, summary, description, author_id],
  };

  database
    .query(newArticle)
    .then((data) => res.send(data.rows))
    .catch((error) => res.status(500).send(error.message));
});

module.exports = blogRouter;
