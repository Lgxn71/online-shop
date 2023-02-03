userCredentialsAreValid = (email, password) => {
  return email && email.includes("@") && password && password.trim() >= 6;
};
isEmpty = (value) => {
  return !value || value.trim() === "";
};

userDetailsAreValid = (
  email,
  password,
  fullname,
  street,
  postalcode,
  city
) => {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(fullname) &&
    !isEmpty(street) &&
    !isEmpty(city) &&
    postalcode &&
    postalcode.trim() >= 6 &&
    city
  );
};
emailIsConfirmed = (email, confirmemail) => {
  return email === confirmemail;
};
module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
