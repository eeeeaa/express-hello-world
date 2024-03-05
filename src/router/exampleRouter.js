const express = require("express");
const router = express.Router();

//router
//-> modular, mountable route handlers
//->it's like a 'mini' version of the main app object
//-> use to group route handling for different parts of the site
//instead of handle it all with the main routing

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", (req, res) => {
  res.send("Example home page");
});
// define the about route
router.get("/about", (req, res) => {
  res.send("About this example");
});

module.exports = router;
