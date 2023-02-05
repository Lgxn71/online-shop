isEmpty = (value) => {
  return !value || value.trim() === "";
};

userCredentialsAreValid = (email, password) => {
  return email && email.includes("@") && password && password.trim() >= 6;
};

userDetailsAreValid = (email, password, fullname, street, postal, city) => {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(fullname) &&
    !isEmpty(street) &&
    !isEmpty(city) &&
    !isEmpty(postal)
  );
};
emailIsConfirmed = (email, confirmemail) => {
  return email === confirmemail;
};
module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
