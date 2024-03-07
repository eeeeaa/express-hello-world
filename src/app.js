const express = require("express");
const exampleRouter = require("./router/exampleRouter");
const mongoRouter = require("./router/mongoRouter");
const midware = require("./utils/examplemidware");
const logger = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.set("json spaces", 2);

// Function added with use() for all routes and verbs
//Note: the order of middleware is important
//usually use/middleware -> routing -> error handling
app.use(logger("dev"));
app.use(midware.exampleMidware);
app.use(midware.requestTime);

// Function added with use() for a specific route
//app.use("/someroute", a_middleware_function);
app.use("/example-router", exampleRouter);
app.use("/mongo", mongoRouter);

//built-in middleware for static files
//get file with url path + filename
//i.e. http://localhost:3000/assets/cyberpunk.gif
app.use("/assets", express.static("assets"));

// A middleware function added for a specific HTTP verb and route
//app.get("/", a_middleware_function);
app.get("/", (req, res) => {
  res.status(200).json({
    data: "hello world!",
    time: `${req.requestTime}`, //from middleware
  });
});

//some status i.e. 404 status are not treat as error,
//use regular middleware function for this instead
app.use((req, res, next) => {
  res.status(404).send("not found!");
});

//custom error handler with 4 arguments middleware
//if not create this, express will call default error handler
//call last, after all use and route calls
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
