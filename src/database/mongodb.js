const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.ATLAS_URI || "";

const postSchema = new mongoose.Schema({
  body: String,
  permalink: String,
  author: String,
  title: String,
  tags: [String],
  comments: [{ body: String, email: String, author: String }],
  date: Date,
});

async function getPosts() {
  try {
    await mongoose.connect(connectionString, { dbName: "sample_training" });
  } catch (error) {
    console.log(error);
  }
  const PostModel = mongoose.model("posts", postSchema);
  const result = await PostModel.findOne({});
  return result;
}

module.exports = {
  getPosts,
};
