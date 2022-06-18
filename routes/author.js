const express = require("express");
const authorRouter = express.Router();

authorRouter.get("/", (req, res) => {
  res.send("here are authors");
});

module.exports = authorRouter;
