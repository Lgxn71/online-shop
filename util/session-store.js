getSessionData = (req) => {
  const sessionData = req.session.flashedData;

  req.session.flashedData = null;

  return sessionData;
};

flashDataToSession = (req, data, action) => {
  req.session.flashedData = data;
  req.session.save(action);
  // save active function after succeed
};

module.exports = {
  getSessionData: getSessionData,
  flashDataToSession: flashDataToSession,
};
