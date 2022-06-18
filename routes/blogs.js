const express = require("express");
const blogRouter = express.Router();

blogRouter.get("/", (req, res) => {
  res.send("here are blogs");
});

module.exports = blogRouter;
