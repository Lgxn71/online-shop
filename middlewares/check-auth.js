checkAuthStatus = (req, res, next) => {
  const uid = req.session.uid;

  if (!uid) {
    return next();
  }
  res.locals.isAdmin = res.locals.uid = uid;
  res.locals.isAuth = req.session.isAdmin ;
  next();
};
// to make reusable everywhere
module.exports = checkAuthStatus;
