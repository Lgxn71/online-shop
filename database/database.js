const mongodb = require("mongodb");
const mongodbClient = mongodb.MongoClient;

let database;

const connnectToDatabase = async () => {
  const client = await mongodbClient.connect(
    "mongodb://localhost:27017/animals"
  );
  database = client.db("online-shop");
};
const getdb = async () => {
  if (!database) {
    throw { message: "Something went wrong with db" };
  }
  return database;
};

module.exports = {
  connnectToDatabase: connnectToDatabase,
  getdb: getdb,
};
