const getSignup = (req, res) => {
  res.render("customer/auth/signup");
};
const postSignup = (req, res) => {
  const userInput = req.body;
  const userEmail = userInput.email;
  const userConfirmEmail = userInput["confirm-email"];
  const userPassword = userInput.password;

  const userFullName = userInput["full-name"];
  const userStreet = userInput.street;
  const userPostalCode = userInput["postal-code"];
  const userCity = userInput.city;

  if (
    !userEmail ||
    !userConfirmEmail ||
    userEmail !== userConfirmEmail ||
    !userPassword ||
    !userFullName ||
    !userStreet ||
    !userPostalCode ||
    !userCity ||
    userPostalCode.length < 5 ||
    userPassword.length < 6
  ) {
  }
};
const getLogin = (req, res) => {
  res.render("customer/auth/login");
};

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  postSignup: postSignup,
};
