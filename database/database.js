const mongodb = require("mongodb");
const mongodbClient = mongodb.MongoClient;

let database;

const connnectToDatabase = async () => {
  const client = await mongodbClient.connect("mongodb://localhost:27017");
  database = client.db("online-shop");
};
const getdb = async () => {
  if (!database) {
    throw new Error("DB is not connected");
  }
  return database;
};

module.exports = {
  connnectToDatabase: connnectToDatabase,
  getdb: getdb,
};
