const User = require("../models/user-model");

const authUtil = require("../util/authentification");
const validation = require("../util/validation/validation");
const sessionFlash = require("../util/session-store");

getSignup = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
      confirm: "",
      fullname: "",
      street: "",
      postalcode: "",
      city: "",
    };
  }
  res.render("customer/auth/signup", { inputData: sessionData });
};

postSignup = async (req, res, next) => {

  const enteredData = {
    email: req.body.email,
    confirm: req.body.confirmemail,
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postalcode: req.body.postalcode,
    city: req.body.city,
  };
  console.log(enteredData);

  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postalcode,
      req.body.city
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body.confirmemail)
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Please check your input. Password must be at least 6 characters long, postal code must be 5 characters longs",
        ...enteredData,
      },
      () => {
        res.redirect("/signup");
      }
    );
    return;
  }
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postalcode,
    req.body.city
  );

  try {
    const existAlready = await user.existsAlready();
    if (existAlready) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: "User exist already! Try logging in instead",
          ...enteredData,
        },
        () => {
          res.redirect("/signup");
        }
      );
      return;
    }
    await user.signup();
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }

  res.redirect("/login");
};

getLogin = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }
  res.render("customer/auth/login", { inputData: sessionData });
};

postLogin = async (req, res, next) => {
  let existingUser;
  const user = new User(req.body.email, req.body.password);
  try {
    existingUser = await user.getUserWithSameEmail();
    // takind email and password from db
  } catch (error) {
    next(error);
    return;
  }
  const sessionErrorData = {
    errorMessage: "Invalid input, please check your credentials",
    email: user.email,
    password: user.password,
  };
  if (!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorData, () => {
      res.redirect("/login");
    });

    return;
  }
  const passwordIsCorrect = await user.comparePassword(existingUser.password);
  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, () => {
      res.redirect("/login");
    });
    return;
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
};

postLogout = async (req, res) => {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
};

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  postSignup: postSignup,
  postLogin: postLogin,
  postLogout: postLogout,
};
