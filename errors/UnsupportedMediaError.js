const customError = require("./CustomError");
const { StatusCodes } = require("http-status-codes");

class UnsupportedMediaError extends customError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNSUPPORTED_MEDIA_TYPE;
  }
}

module.exports = UnsupportedMediaError;