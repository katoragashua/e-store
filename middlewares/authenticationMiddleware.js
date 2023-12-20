const Token = require("../models/Token");
const utils = require("../utils");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  UnsupportedMediaError,
} = require("../errors/index");

const authenticationMiddleware = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = await utils.verifyJWT(
        accessToken,
        process.env.JWT_SECRET
      );
      req.user = payload;
      return next();
    }
    const payload = await utils.verifyJWT(
      refreshToken,
      process.env.JWT_SECRET
    );
    const token = await Token.findOne({
      refreshToken: payload.refreshToken,
      user: payload.user.id,
    });
    console.log(token);
    if (!token || !token?.isValid)
      throw new UnauthenticatedError("Authentication invalid.");
    req.user = payload.user;
    await utils.attachCookies(res, req.user, payload.refreshToken);
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid.");
  }
};

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if(roles.includes(req.user.role)) return next();
        throw new UnauthorizedError("Not authorized to access this route.")
    }
}

module.exports = { authenticationMiddleware, authorizePermissions };
