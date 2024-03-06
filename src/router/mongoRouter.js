const express = require("express");
const router = express.Router();
const mongoUtils = require("../database/mongodb");

router.get("/get-posts", async (req, res) => {
  let results = await mongoUtils.getPosts();
  res.status(200).json(results);
});

module.exports = router;
