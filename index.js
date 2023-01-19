require("dotenv").config();
const express = require("express");
const authorRouter = require("./routes/author");
const blogRouter = require("./routes/blogs");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(cors());

const database = require("./database/client");

app.use(morgan("tiny"));
app.use(express.static("public"));
const PORT = process.env.PORT || 3008;
app.use(express.json());
app.use("/routes/author", authorRouter);
app.use("/routes/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
