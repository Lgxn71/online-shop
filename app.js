//git push -u origin main
const path = require("path");

const express = require("express");
const app = express();

const db = require("./database/database");
const authRouter = require("./routes/auth-routes");
// . to look in current folder

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
//to extract data from requests
app.use(express.static(__dirname + "/public"));

app.use(authRouter);

db.connnectToDatabase()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log("Failed to connect to db");
    console.log(error);
  });
