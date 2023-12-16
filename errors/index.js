const NotFoundError = require("./NotFoundError")
const BadRequestError = require("./BadRequestError")
const UnauthenticatedError = require("./UnauthenticatedError")
const UnauthorizedError = require("./UnauthorizedError")
const UnsupportedMediaError = require("./UnsupportedMediaError")

module.exports = {
    NotFoundError,
    BadRequestError,
    UnauthenticatedError,
    UnauthorizedError,
    UnsupportedMediaError
}