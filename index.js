const express = require("express");
const authorRouter = require("./routes/author");
const blogRouter = require("./routes/blogs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/routes/author", authorRouter);
app.use("/routes/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
