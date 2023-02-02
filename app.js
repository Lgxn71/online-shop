const path = require("path");

const express = require("express");
const app = express();

const db = require("./database/database");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("all-products");
});

db.connnectToDatabase().then(() => {
  app.listen(3000);
});
