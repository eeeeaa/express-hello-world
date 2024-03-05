const express = require("express");
const exampleRouter = require("./router/exampleRouter");
const midware = require("./utils/examplemidware");
const logger = require("morgan");

const app = express();
const port = 3000;

// Function added with use() for all routes and verbs
app.use(logger("dev"));
app.use(midware.exampleMidware);

// Function added with use() for a specific route
//app.use("/someroute", a_middleware_function);
app.use("/example-router", exampleRouter);

// A middleware function added for a specific HTTP verb and route
//app.get("/", a_middleware_function);

app.get("/", (req, res) => {
  res.status(200).json({
    data: "hello world!",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
