const { StatusCodes } = require("http-status-codes");

exports.errorHandlerMiddleware = (error, req, res, next) => {
  // console.log('An ERROR: ', error);
  const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message;
  const data = error.data;

  res.status(status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: message,
    data: data,
  });
}