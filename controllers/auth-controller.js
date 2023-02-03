const User = require("../models/user-model");

const getSignup = (req, res) => {
  res.render("customer/auth/signup");
};
const postSignup = async (req, res) => {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postalcode,
    req.body.city
  );
  await user.signup();

  res.redirect("/login");
};
const getLogin = (req, res) => {
  res.render("customer/auth/login");
};

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  postSignup: postSignup,
};
