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
  //Mongoose automatically looks for the plural, lowercased version of your model name
  //i.e. Post --> look for collection named "posts"
  const PostModel = mongoose.model("Post", postSchema);
  const result = await PostModel.findOne({});
  return result;
}

module.exports = {
  getPosts,
};
