const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

const notFound = (req, _res, next) => {
  next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, _req, res, _next) => {
  console.log("Ошибка", {
    message: err.message,
    stack: err.stack,
  });
  res.status(err.code || 500).json({
    message: err.message,
  });
};
const requireToken = async (req, _res, next) => {
  //console.log(req.header);
  let tokenControl = req.header("tokenAccess");
  if (!tokenControl) throw new ErrorResponse("Token doesn't exist", 404);
  let tokenAccess = await Token.findOne({
    where: {
      value: tokenControl,
    },
  });
  if (!tokenAccess) throw new ErrorResponse("Invalid token", 404);
  req.userId = tokenAccess.userId;
  next();
};

module.exports = {
  asyncHandler,
  syncHandler,
  notFound,
  errorHandler,
  requireToken,
};