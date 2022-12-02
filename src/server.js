const express = require("express");
const { resolve } = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.use("/", express.static(resolve(__dirname, "..", "build")));

app.listen(port, (error) => {
  if (error) {
    return console.error(error);
  }
  console.log("Front rodando");
});
