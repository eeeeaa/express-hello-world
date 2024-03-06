// An example of a custom middleware function
const exampleMidware = function (req, res, next) {
  // Perform some operations
  console.log("example middleware operations");

  // Call next() so Express will call the next middleware function
  // in the chain.
  next();
};

const requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

module.exports = {
  exampleMidware,
  requestTime,
};
