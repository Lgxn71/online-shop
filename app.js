//git push -u origin main

const path = require("path");

const csrf = require("csurf");
const expressSession = require("express-session");
const express = require("express");

const app = express();

const createSessionConfig = require("./config/session");

const db = require("./database/database");

const addCsrfToken = require("./middlewares/csrf-token");
const errorHandler = require("./middlewares/error-handler");
const checkAuthStatusMiddle = require("./middlewares/check-auth");
const protectRoutesMiddleware = require("./middlewares/protect-routes");
const cartMiddleware = require("./middlewares/cart");
const updateCartPricesMiddleware = require("./middlewares/update-cart-prices");
const notFoundMiddleware = require("./middlewares/not-found");

const baseRouter = require("./routes/base-routes");
const productRouter = require("./routes/products-routes");
const authRouter = require("./routes/auth-routes");
const adminRouter = require("./routes/admin-routes");
const cartRouter = require("./routes/cart-routes");
const orderRouter = require("./routes/orders-routes");

// . to look in current folder

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
//to extract data from requests from form submissions
app.use(express.json());
// need to accept JSON data from cart-management
app.use(express.static(__dirname + "/public"));
app.use(
  "/products/assest", //filtering directory
  //check consturctoir in product-models
  express.static("product-data")
);

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(csrf());
app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);
app.use(addCsrfToken);

app.use(checkAuthStatusMiddle);
app.use(baseRouter);
app.use(authRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(protectRoutesMiddleware, orderRouter);
app.use(protectRoutesMiddleware, adminRouter);
//check only for admin roles
app.use(notFoundMiddleware);

app.use(errorHandler);

db.connnectToDatabase()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log("Failed to connect to db");
    console.log(error);
  });
