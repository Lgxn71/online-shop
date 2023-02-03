const expressSession = require("express-session");

const mongoDbStore = require("connect-mongodb-session");
createSessionStore = () => {
  const MongoDbStore = mongoDbStore(expressSession);

  const store = new MongoDbStore({
    uri: "mongodb://localhost:27017",
    databaseName: "online-shop",
    collection: "sesion",
  });
  return store;
};
createSessionConfig = () => {
  return {
    secret: "super-secret-random-",
    resave: false,
    saveUnitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
};
module.exports = createSessionConfig;
