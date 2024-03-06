const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

async function connect() {
  let db = null;
  try {
    let connection = await client.connect();
    db = connection.db("sample_training");
  } catch (e) {
    console.error(e);
  }
  return db;
}

async function close() {
  client.close();
}

async function getPosts() {
  let db = await connect();
  let results = [];
  if (db !== null) {
    let collection = db.collection("posts");
    await collection
      .find({})
      .limit(1)
      .toArray((err, data) => {
        if (err) throw err;
        results = data;
        close();
      });
  }
  return results;
}

module.exports = {
  getPosts,
};
